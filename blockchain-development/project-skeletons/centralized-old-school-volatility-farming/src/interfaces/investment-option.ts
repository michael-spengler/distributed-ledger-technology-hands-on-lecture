export interface AssetInfo {
    pair: string
    minTradingAmount: number
    decimalPlaces: number
    minLSD: number
    maxLSD: number
    longHistory: number[]
    shortHistory: number[]
}