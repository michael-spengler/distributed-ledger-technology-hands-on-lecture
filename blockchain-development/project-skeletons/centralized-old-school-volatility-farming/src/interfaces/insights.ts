import { EDirection } from "../constants/enums.ts";

export interface IPositionInsights {
    tradingPair: string,
    direction: EDirection,
    pnlHistory: number[],
    sma: number[],
    lowerBand: number[],
    upperBand: number[],
    tradingUnit: number,
    stopLoss: number,
    targetPercentageOfEquity: number
}