import app from "./App";
import Logger, { NoLogger } from "./Logger";
import RequestHandler from "./RequestHandler";
import { Server as httpServer } from "http";
import HandlerOptions from "./HandlerOptions";

class Server {
  //properties
  public port: Number = 3000;
  public endpoint: string = "/*";
  public server?: httpServer = undefined;
  public httpMethod: string = "";
  public logger: ((subject: any) => void) | null = console.log;
  public tableLogger: ((subject: any) => void) | null = console.table;
  public isRunning: boolean = false;
  public onRequest: (req: Express.Request) => void = () => {};
  public silent: boolean = false; // do not log requests
  public noReply: boolean = false; //do not send an answer
  public statusCode: number = 200;

  private setup() {
    //setup handler
    const logger = this.silent
      ? new NoLogger()
      : new Logger(this.logger, this.tableLogger);
    let options = this.initializeHandlerOptions();
    let handler = new RequestHandler(logger, options);
    //get correct Express handler based on the selected or default HTTP method.
    switch (this.httpMethod.toUpperCase()) {
      case "GET":
        return app.get(this.endpoint, handler.handle);
      case "POST":
        return app.post(this.endpoint, handler.handle);
      case "PUT":
        return app.put(this.endpoint, handler.handle);
      case "DELETE":
        return app.delete(this.endpoint, handler.handle);
      case "PATCH":
        return app.patch(this.endpoint, handler.handle);
      case "HEAD":
        return app.head(this.endpoint, handler.handle);
      default:
        return app.all(this.endpoint, handler.handle);
    }
  }
  initializeHandlerOptions(): HandlerOptions {
    let options = new HandlerOptions();
    options.noReply = this.noReply;
    options.onRequest = this.onRequest;
    options.statusCode = this.statusCode;

    return options;
  }
  log(message: string): Server {
    console.log(message);
    return this;
  }

  start(callback?: Function): Promise<Server> {
    let port = this.port;
    let self: Server = this;
    this.setup();
    return new Promise<Server>(function(resolve, reject) {
      try {
        self.server = app.listen(port, () => {
          if (callback != null && callback != undefined) {
            try {
              callback();
            } catch (e) {
              reject(e);
            }
          }
          self.isRunning = true;
          resolve(self);
        });
      } catch (e) {
        reject(e);
      }
    });
  }
  stop(
    callback?: ((err: Error | undefined) => void) | undefined
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this.isRunning) {
        reject("A server must have started before it can be stopped.");
      } else {
        this.server ? this.server.close(callback) : null;
        this.isRunning = false;
        resolve();
      }
    });
  }
}

export default Server;
