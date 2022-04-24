import { LogLevel } from "../../mod.ts";

export interface IVFLogger {
    log(message: string, level: LogLevel): Promise<void> | void
}