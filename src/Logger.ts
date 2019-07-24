interface ILogger {
  log(subject: any): void;
  logTable(subject: any): void;
  clear(): void;
}

class Logger implements ILogger {
  logger: (subject: any) => void;
  tableLogger: (subject: any) => void;
  constructor(
    logger: (subject: any) => void,
    tableLogger: (subject: any) => void
  ) {
    this.logger = logger;
    if (tableLogger === null) {
      this.tableLogger = logger;
    } else {
      this.tableLogger = tableLogger;
    }
  }
  logTable(subject: any) {
    this.tableLogger(subject);
  }
  log(subject: any) {
    this.logger(subject);
  }
  clear() {}
}

export { Logger, ILogger };
export default Logger;
