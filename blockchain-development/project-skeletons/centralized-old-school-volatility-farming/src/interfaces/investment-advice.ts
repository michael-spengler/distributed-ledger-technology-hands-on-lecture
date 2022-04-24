
import { Action } from "../constants/enums.ts"

export interface InvestmentAdvice {
    action: Action,
    amount: number
    pair: string,
    reason: string
}
