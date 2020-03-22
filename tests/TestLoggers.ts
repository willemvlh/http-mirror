import { ILogger } from "../src/Logger";
export class NoLogger implements ILogger {
  log(subject: any) {}
  logTable(subject: any) {}
  clear() {}
}

export class TestLogger implements ILogger {
  buffer: string = "";
  log = (subject: any) => (this.buffer = subject);
  logTable = (subject: any) => (this.buffer = subject);
  clear = () => (this.buffer = "");
}
