import { IExchangeConnector, sleep } from "../deps.ts"
import { InvestmentAdvice } from "./interfaces/investment-advice.ts"
import { IVFLogger } from "./interfaces/logger.ts"
import { Action, IVoFarmStrategy, LogLevel } from "../mod.ts"


export class VolatilityFarmer {

    public constructor(private exchangeConnector: IExchangeConnector, private voFarmStrategy: IVoFarmStrategy, private logger: IVFLogger) { }

    public async farm(intervalLengthInSeconds: number): Promise<void> {

        this.checkParameters(intervalLengthInSeconds)

        setInterval(async () => {

            try {
                await this.playTheGame()
            } catch (error) {
                this.logger.log(error.message, 2)
            }

        }, intervalLengthInSeconds * 1000)

    }

    protected async playTheGame(): Promise<void> {

        let inputForStrategy = { exchangeConnector: this.exchangeConnector }

        const investmentAdvices = await this.voFarmStrategy.getInvestmentAdvices(inputForStrategy)
        await this.applyInvestmentAdvices(investmentAdvices)

    }





    protected async applyInvestmentAdvices(investmentAdvices: InvestmentAdvice[]): Promise<void> {

        const message = `applying ${investmentAdvices.length} investment advices`
        if (investmentAdvices.length > 0) {
            await this.logger.log(message, LogLevel.INFO)
            await this.logger.log(JSON.stringify(investmentAdvices), LogLevel.INFO)
        }

        for (const investmentAdvice of investmentAdvices) {
            await sleep(Math.round(Math.random() * (200 - 50) + 50) / 1000)

            let r

            if (investmentAdvice.action === Action.BUY) {

                r = await this.exchangeConnector.buyFuture(investmentAdvice.pair, investmentAdvice.amount, false)

            } else if (investmentAdvice.action === Action.SELL) {

                r = await this.exchangeConnector.sellFuture(investmentAdvice.pair, investmentAdvice.amount, false)

            } else if (investmentAdvice.action === Action.REDUCELONG) {

                r = await this.exchangeConnector.sellFuture(investmentAdvice.pair, investmentAdvice.amount, true)

            } else if (investmentAdvice.action === Action.REDUCESHORT) {

                r = await this.exchangeConnector.buyFuture(investmentAdvice.pair, investmentAdvice.amount, true)

            }

            if (r.ret_code !== 0) {
                console.log(r)
            }
        }

    }



    protected checkParameters(intervalLengthInSeconds: number): void {

        if (intervalLengthInSeconds < 2) {
            throw new Error(`Are you sure you want me to do this each ${intervalLengthInSeconds} seconds?`)
        }

    }

}

