import { LogLevel } from "../../mod.ts";
import { IVFLogger } from "../interfaces/logger.ts"

export class VFLogger implements IVFLogger {

    public constructor(private apiKey: string, private logLevel: LogLevel) {
    }

    public log(message: string, level: LogLevel): void {
        if (level >= this.logLevel) {
            console.log(message)
        }
    }
}