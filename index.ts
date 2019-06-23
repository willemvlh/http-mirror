const port = process.argv[2] || 3000;
import express from "express";
import bodyParser from "body-parser";
import chalk from "chalk";
import { IncomingHttpHeaders } from "http";

var app = express();
app.use(bodyParser.raw({type: '*/*'}));
const colorMap : {[s: string]: Function} = {
  "POST": chalk.bgGreen,
  "GET": chalk.bgBlue,
  "PUT": chalk.bgYellow.black,
  "DELETE": chalk.bgRed
}
const color : Function = (httpMethod : string) => {
  let f = colorMap[httpMethod];
  return f ? f(httpMethod) : chalk.bgCyan(httpMethod);
}

const logBody = (body: Buffer) : void => {
  console.log("Body:\n");
  console.log(body.length ? body.toString("utf-8") : "[empty]");
}

const logHeaders = (headers: IncomingHttpHeaders) : void => {
  console.log("Headers:\n");
  console.table(headers);
}

const logTime = () : void => {
  console.log(`[${(new Date()).toLocaleTimeString()}]`);
}

const handleRequest = (req: express.Request, res: express.Response) => {
  logTime();
  console.log(`Received ${color(req.method)} request from ${req.ip} at ${req.path}.\n`);
  logHeaders(req.headers);
  logBody(req.body);
  console.log("------------")
  res.status(200);
  res.send(req.body);
};

app.all("/*", handleRequest)

app.listen(port);
console.log(
  "Listening for HTTP requests on all endpoints on port " + port
);
