import app from "./App";
import Logger from "./Logger";
import RequestHandler from "./RequestHandler";

const port = process.argv[2] || 3000;
const version: string = require("../package.json")["version"];

const logger = new Logger(console.log, console.table);
let handler = new RequestHandler(logger);

app.all("/*", handler.handle);

app.listen(port, () => {
  console.log(`HTTP request inspector ${version}`);
  console.log("Listening for HTTP requests on all endpoints on port " + port);
});

export default app;
