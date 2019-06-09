const port = process.argv[2] || 3000;
import express from "express";
import bodyParser from "body-parser";
import chalk from "chalk";

var app = express();
app.use(bodyParser.raw({type: '*/*'}));
const colorMap : {[s: string]: Function} = {
  "POST": chalk.bgRed,
  "GET": chalk.bgGreen,
  "PUT": chalk.bgBlue
}
const color : Function = (httpMethod : string) => {
  let f = colorMap[httpMethod];
  return f(httpMethod);
}

const logBody : Function = (body: Buffer) => {
  console.log("Body:\n");
  console.log(body.toString("utf-8"))
}

const logHeaders : Function = (headers: string[]) => {
  console.log("Headers:\n");
  console.table(headers);
}
const handleRequest = (req: express.Request, res: express.Response) => {
  console.log("------------")
  console.log(`Received ${color(req.method)} request from ${req.ip}.\n`);
  logHeaders(req.headers);
  logBody(req.body);
  console.log("------------")
  res.status(200);
  res.end();
};

app.post("/*", handleRequest);
app.put("/*", handleRequest);
app.get("/*", handleRequest);

app.listen(port);
console.log(
  "Listening for PUT/POST/GET requests on all endpoints on port " + port
);
