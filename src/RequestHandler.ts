import express = require("express");
import chalk from "chalk";
import { IncomingHttpHeaders } from "http";
import { ILogger } from "./Logger";
import HandlerOptions from "./HandlerOptions";

class RequestHandler {
  options: HandlerOptions;
  logger: ILogger;
  colorMap: { [s: string]: Function } = {
    POST: chalk.bgGreen,
    GET: chalk.bgBlue,
    PUT: chalk.bgYellow.black,
    DELETE: chalk.bgRed
  };
  constructor(logger: ILogger, handlerOptions: HandlerOptions) {
    this.logger = logger;
    this.options = handlerOptions;
  }
  handle = (req: express.Request, res: express.Response) => {
    res.status(this.options.statusCode);
    if (!this.options.noReply) {
      res.send(req.body);
    } else {
      res.end();
    }
    this.onRequest(req);
    this.clearLog();
  };

  onRequest = (req: express.Request) => {
    this.log("___________________");
    this.log(
      `[${new Date().toLocaleTimeString()}] Received ${this.color(
        req.method
      )} request from ${req.ip} at ${req.path}.\n`
    );
    this.logParams(req.query);
    this.logHeaders(req.headers);
    this.logBody(req.body);
    this.log("___________________");
  };

  log = (subject: any) => {
    this.logger.log(subject);
  };

  clearLog = () => this.logger.clear();

  color = (httpMethod: string) => {
    let f = this.colorMap[httpMethod];
    return f ? f(httpMethod) : chalk.bgCyan(httpMethod);
  };

  logParams = (params: any) => {
    if (Object.keys(params).length > 0) {
      this.logger.log("Parameters:\n");
      this.logger.logTable(params);
    }
  };

  logBody = (body: Buffer): void => {
    if (body) {
      this.logger.log("Body:\n");
      this.logger.log(body.length ? body.toString("utf-8") : "");
    } else {
      this.logger.log("No body attached to request");
    }
  };

  logHeaders = (headers: IncomingHttpHeaders): void => {
    this.logger.log("Headers:\n");
    this.logger.logTable(headers);
  };
}

export default RequestHandler;
