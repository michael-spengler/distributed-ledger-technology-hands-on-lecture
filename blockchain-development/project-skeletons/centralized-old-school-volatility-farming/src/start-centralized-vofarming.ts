import { IVoFarmStrategy } from "./interfaces/vofarm-strategy.ts"
import { VolatilityFarmer } from "./vofarmer.ts"
import { BybitConnector, IExchangeConnector, Registry } from "../deps.ts"
import { IVFLogger } from "./interfaces/logger.ts"
import { VFLogger } from "./utilities/logger.ts"
import { BuyLowSellHigh } from "./strategies/buy-low-sell-high.ts";

const apiKey = Deno.args[0]
const apiSecret = Deno.args[1]

const exchangeConnectorClassName = (Deno.args[2] === undefined) ? "BybitConnector" : Deno.args[2]
const voFarmStrategyClassName = (Deno.args[3] === undefined) ? "LongShortClassics" : Deno.args[3]
const loggerClassName = (Deno.args[4] === undefined) ? 'VFLogger' : Deno.args[4]
const logLevel = (Deno.args[5] === undefined) ? 1 : Number(Deno.args[5])
const intervalLengthInSeconds = (Deno.args[6] === undefined) ? 11 : Number(Deno.args[6])

const registryVoFarmStrategies = new Registry()
const registryExchangeConnectors = new Registry()
const registryLoggerServices = new Registry()

registryVoFarmStrategies.register(BuyLowSellHigh)
registryExchangeConnectors.register(BybitConnector)
registryLoggerServices.register(VFLogger)

const exchangeConnector: IExchangeConnector = new (registryExchangeConnectors.get(exchangeConnectorClassName))(apiKey, apiSecret)
const vfLogger: IVFLogger = new (registryLoggerServices.get(loggerClassName))(apiKey, logLevel)
const voFarmStrategy: IVoFarmStrategy = new (registryVoFarmStrategies.get(voFarmStrategyClassName))(vfLogger)

const volatilityFarmer: VolatilityFarmer = new VolatilityFarmer(exchangeConnector, voFarmStrategy, vfLogger)

volatilityFarmer.farm(intervalLengthInSeconds)

