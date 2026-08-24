class Logger {
    private static instance: Logger;

    private constructor() {}

    static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    log(message: string): void {
        console.log(`[LOG] ${message}`);
    }
}

const logger = Logger.getInstance();
const anotherLogger = Logger.getInstance();

logger.log("Application started");
console.log(`Same logger instance: ${logger === anotherLogger}`);
