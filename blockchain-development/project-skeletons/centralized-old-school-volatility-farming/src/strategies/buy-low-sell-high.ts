import { Action, EDirection, InvestmentAdvice } from "../../mod.ts"
import { FinancialCalculator } from "../utilities/financial-calculator.ts"
import { VFLogger } from "../utilities/logger.ts";
import { VoFarmStrategy } from "./vofarm-strategy.ts";
import { BollingerBandsService, IBollingerBands } from "https://deno.land/x/bollinger_bands@v0.2.0/mod.ts"
import { initialPositionInsights } from "../constants/initial-position-insights.ts";
import { IPositionInsights } from "../interfaces/insights.ts";



export enum EOpinionatedMode {
    bullish = 1,
    bearish = -1,
    relaxed = 0
}

export class BuyLowSellHigh extends VoFarmStrategy {

    protected historyLength = 50
    protected positionInsights: IPositionInsights[] = []
    protected spreadFactor = 0
    protected minPNL = 0
    protected bearishBullishIndicator = 0

    public constructor(logger: VFLogger) {
        super(logger)
        this.positionInsights = initialPositionInsights
    }



    public async getInvestmentAdvices(input: any): Promise<InvestmentAdvice[]> {

        this.currentInvestmentAdvices = []

        await this.collectFundamentals(input.exchangeConnector)

        this.enrichPortfolioInsights()

        const date = new Date()
        if (((date.getDay() === 0 && date.getHours() > 17) || date.getDay() === 1 && date.getHours() < 18) && this.liquidityLevel > 11) {
            console.log("we're in a pretty bullish state of mind :)")
            this.bearishBullishIndicator = EOpinionatedMode.bullish
        } else if ((date.getDay() === 5 && date.getHours() > 17) || date.getDay() === 6 || date.getDay() === 0 && date.getHours() < 16) {
            console.log("we're in a pretty bearish state of mind :)")
            this.bearishBullishIndicator = EOpinionatedMode.bearish
        } else {
            this.bearishBullishIndicator = EOpinionatedMode.relaxed
        }
        if (this.positionInsights[0].sma.length === this.historyLength) {
            this.executeBuyLowSellHigh()
        } else {
            console.log(this.positionInsights[0].sma.length)
        }

        this.tidyUpPortfolio()



        return this.currentInvestmentAdvices

    }

    private tidyUpPortfolio() {

        const magicTrigger = Math.round(Math.random() * (24 - 7) + 7)
        console.log(`magicTrigger: ${magicTrigger}`)

        for (const p of this.fundamentals.positions) {

            const pnl = FinancialCalculator.getPNLOfPositionInPercent(p)
            if (p.data.side === 'Sell' && pnl > magicTrigger) {
                this.addInvestmentAdvice(Action.REDUCESHORT, p.data.size, p.data.symbol, 'inflation of fiat money suggests not to short crypto too much')
            }

            const i = this.positionInsights.filter((e: IPositionInsights) => e.tradingPair === p.data.symbol)[0]

            if (i === undefined) {
                if (p.data.side === 'Buy') {
                    this.addInvestmentAdvice(Action.REDUCELONG, p.data.size, p.data.symbol, 'tidy up')
                } else {
                    this.addInvestmentAdvice(Action.REDUCESHORT, p.data.size, p.data.symbol, 'tidy up')
                }

            }
        }
    }
    private enrichPortfolioInsights() {

        if (this.liquidityLevel === 0) {
            this.spreadFactor = 111
        } else {
            this.spreadFactor = Number(((111 / this.liquidityLevel) + 3).toFixed(0))
        }

        this.minPNL = 20 - this.spreadFactor
        if (this.bearishBullishIndicator === EOpinionatedMode.bearish) this.minPNL = this.minPNL - 1
        if (this.bearishBullishIndicator === EOpinionatedMode.bullish) this.minPNL = this.minPNL + 1

        console.log('spreadFactor:', this.spreadFactor, ' / minPNL:', this.minPNL)

        for (const positionInsightsEntry of this.positionInsights) {
            const position = this.fundamentals.positions.filter((e: any) => e.data.symbol === positionInsightsEntry.tradingPair && e.data.side === 'Buy')[0]
            if (position === undefined && this.liquidityLevel > 1) {
                const text = `we enhance our ${positionInsightsEntry.tradingPair} ${positionInsightsEntry.direction} position to play the game`
                this.addInvestmentAdvice(Action.BUY, positionInsightsEntry.tradingUnit, positionInsightsEntry.tradingPair, text)
            }

            const pnl = FinancialCalculator.getPNLOfPositionInPercent(position)

            if (this.positionInsights[0].sma.length === this.historyLength) {
                positionInsightsEntry.pnlHistory.splice(0, 1)
            }

            positionInsightsEntry.pnlHistory.push(pnl)
            const bollingerBands: IBollingerBands = BollingerBandsService.getBollingerBands(positionInsightsEntry.pnlHistory, this.spreadFactor)

            positionInsightsEntry.sma = bollingerBands.sma

            positionInsightsEntry.lowerBand = bollingerBands.lower
            positionInsightsEntry.upperBand = bollingerBands.upper

        }

    }


    private executeBuyLowSellHigh(): void {

        for (const positionInsightsEntry of this.positionInsights) {

            const position = this.fundamentals.positions.filter((p: any) => p.data.side === 'Buy' && p.data.symbol === positionInsightsEntry.tradingPair)[0]

            if (position === undefined) continue

            const pnl = Number(positionInsightsEntry.pnlHistory[positionInsightsEntry.pnlHistory.length - 1].toFixed(0))

            const baseValue = position.data.position_value / position.data.leverage

            // console.log(this.fundamentals.accountInfo.result)
            const percentageOfEquity = Number((baseValue * 100 / this.fundamentals.accountInfo.result.USDT.equity).toFixed(2))

            let enhancePositionTrigger = Number(positionInsightsEntry.lowerBand[positionInsightsEntry.lowerBand.length - 2].toFixed(0)) - 3
            let reducePositionTrigger = enhancePositionTrigger + 20

            const sma = Number(positionInsightsEntry.sma[positionInsightsEntry.sma.length - 2].toFixed(2))

            if (reducePositionTrigger < sma) {
                reducePositionTrigger = Number(sma.toFixed(0))
            }

            if (reducePositionTrigger < this.minPNL) {
                reducePositionTrigger = this.minPNL

            }

            const positionValue = Number(position.data.position_value.toFixed(0))

            console.log(`${position.data.size} (${positionValue} - ${percentageOfEquity}%) ${positionInsightsEntry.tradingPair} ${pnl} ${enhancePositionTrigger} ${reducePositionTrigger}`)

            if (this.liquidityLevel > 14 && percentageOfEquity < 10) {
                if (pnl < enhancePositionTrigger) {
                    const text = `we enhance our ${positionInsightsEntry.tradingPair} ${positionInsightsEntry.direction} position at a pnl of ${pnl} to exploit manipulation`
                    this.addInvestmentAdvice(Action.BUY, positionInsightsEntry.tradingUnit, positionInsightsEntry.tradingPair, text)
                }
            }

            if ((pnl > reducePositionTrigger) && position.data.size > positionInsightsEntry.tradingUnit && percentageOfEquity > positionInsightsEntry.targetPercentageOfEquity) {
                const text = `we reduce our ${positionInsightsEntry.tradingPair} ${positionInsightsEntry.direction} position at a pnl of ${pnl} to take some profits`
                this.addInvestmentAdvice(Action.REDUCELONG, positionInsightsEntry.tradingUnit, positionInsightsEntry.tradingPair, text)

                if (this.riskEquityRatio > 0) {
                    const text = `we enhance our ${positionInsightsEntry.tradingPair} short position to temp hedge our portfolio`
                    this.addInvestmentAdvice(Action.SELL, positionInsightsEntry.tradingUnit, positionInsightsEntry.tradingPair, text)
                }
            }
        }
    }
}
