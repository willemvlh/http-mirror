import app from "./App";
import Logger from "./Logger";
import RequestHandler from "./RequestHandler";
import { Server as httpServer } from "http";

class Api {
  //properties
  public port: Number = 3000;
  public endpoint: string = "/*";
  public server: httpServer | null = null;
  public httpMethod: string = "";
  public logger: ((subject: any) => void) | null = console.log;
  public tableLogger: ((subject: any) => void) | null = console.table;
  public isRunning: boolean = false;

  private setup() {
    //setup handler
    const logger = new Logger(this.logger, this.tableLogger);
    let handler = new RequestHandler(logger);
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
  log(message: string): Api {
    console.log(message);
    return this;
  }

  start(callback?: Function): Promise<Api> {
    let port = this.port;
    let self: Api = this;
    this.setup();
    return new Promise<Api>(function(resolve, reject) {
      try {
        self.server = app.listen(port, () => {
          if (callback != null || callback != undefined) {
            callback();
          }
          self.isRunning = true;
          resolve(self);
        });
      } catch (e) {
        reject(e);
      }
    });
  }
  stop(callback?: ((err: Error | undefined) => void) | undefined): void {
    if (!this.server) {
      throw new Error("A server must have started before it can be stopped.");
    }
    this.server.close(callback);
    this.server = null;
    this.isRunning = false;
  }
}

export default Api;
