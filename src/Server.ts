import app from "./App";
import Logger from "./Logger";
import RequestHandler from "./RequestHandler";

const version = require("../package.json")["version"];

class Server {
  port: Number = 3000;
  log: (subject: any) => void = console.log;
  tableLog: (subject: any) => void = console.table;
  endpoint: string = "/*";
  private setup() {
    const logger = new Logger(this.log, console.table);
    let handler = new RequestHandler(logger);
    app.all(this.endpoint, handler.handle);
  }
  start(message: string) {
    this.setup();
    app.listen(this.port, () => {
      console.log(message);
    });
  }
}

const server = new Server();
console.log(`HTTP Request Inspector ${version}`);
server.start(`Listening for HTTP requests on port ${server.port}`);

export default server;
export { Server };
