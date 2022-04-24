import { InvestmentAdvice } from "./investment-advice.ts";

export interface IVoFarmStrategy {
    getInvestmentAdvices(investmentDecisionBase: any): Promise<InvestmentAdvice[]>
}