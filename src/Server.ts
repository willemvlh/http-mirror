import app from "./App";
import Logger from "./Logger";
import RequestHandler from "./RequestHandler";
import { Server as httpServer } from "http";

class Api {
  private _port: Number = 3000;
  private _endpoint: string = "/*";
  private _server: httpServer | null = null;
  private _setup() {
    const logger = new Logger(this._logger, this._tableLogger);
    let handler = new RequestHandler(logger);
    app.all(this._endpoint, handler.handle);
  }
  private _logger: (subject: any) => void = console.log;
  private _tableLogger: (subject: any) => void = console.table;

  public readonly port: Number = this._port;
  public readonly endpoint = this._endpoint;
  public readonly logger = this._logger;
  public readonly tableLogger = this._tableLogger;

  setPort(portNumber: Number) {
    this._port = portNumber;
    return this;
  }
  setEndPoint(endPoint: string) {
    this._endpoint = endPoint;
    return this;
  }
  setLogger(logFunction: (subject: any) => void) {
    this._logger = logFunction;
    return this;
  }
  setTableLogger(tableLogFunction: (subject: any) => void) {
    this._tableLogger = tableLogFunction;
    return this;
  }
  log(message: string) {
    console.log(message);
    return this;
  }

  start(message: string) {
    this._setup();
    this._server = app.listen(this._port, () => {
      console.log(message);
    });
    return this;
  }
  stop(callback?: ((err: Error | undefined) => void) | undefined) {
    if (!this._server) {
      throw new Error("A server must have started before it can be stopped.");
    }
    this._server.close(callback);
    this._server = null;
  }
}

export default Api;
