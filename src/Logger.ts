interface ILogger {
  log(subject: any): void;
  logTable(subject: any): void;
  clear(): void;
}

class Logger implements ILogger {
  logger: ((subject: any) => void) | null;
  tableLogger: ((subject: any) => void) | null;
  constructor(
    logger: ((subject: any) => void) | null,
    tableLogger: ((subject: any) => void) | null
  ) {
    this.logger = logger;
    if (tableLogger === null) {
      this.tableLogger = logger;
    } else {
      this.tableLogger = tableLogger;
    }
  }
  logTable(subject: any) {
    if (this.tableLogger) {
      this.tableLogger(subject);
    }
  }
  log(subject: any) {
    if (this.logger) {
      this.logger(subject);
    }
  }
  clear() {}
}

export { Logger, ILogger };
export default Logger;
