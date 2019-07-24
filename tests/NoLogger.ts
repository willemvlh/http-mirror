import { ILogger } from "../src/Logger";
export class NoLogger implements ILogger {
  log(subject: any) {}
  logTable(subject: any) {}
  clear() {}
}
