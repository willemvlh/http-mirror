import express = require("express");
import chalk from "chalk";
import { IncomingHttpHeaders } from "http";
import { ILogger } from "./Logger";

class RequestHandler {
  logger: ILogger;
  colorMap: { [s: string]: Function } = {
    POST: chalk.bgGreen,
    GET: chalk.bgBlue,
    PUT: chalk.bgYellow.black,
    DELETE: chalk.bgRed
  };
  constructor(logger: ILogger) {
    this.logger = logger;
  }
  handle = (req: express.Request, res: express.Response) => {
    this.logTime(`[${new Date().toLocaleTimeString()}]`);
    this.log(
      `Received ${this.color(req.method)} request from ${req.ip} at ${
        req.path
      }.\n`
    );
    this.logParams(req.query);
    this.logHeaders(req.headers);
    this.logBody(req.body);
    this.log("------------");
    res.status(200);
    res.send(req.body);
    this.clearLog();
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
    if (params) {
      this.logger.log("Parameters:\n");
      this.logger.logTable(params);
    }
  };

  logBody = (body: Buffer): void => {
    if (body) {
      this.logger.log("Body:\n");
      this.logger.log(body.length ? body.toString("utf-8") : "[empty]");
    } else {
      this.logger.log("No body attached to request");
    }
  };

  logHeaders = (headers: IncomingHttpHeaders): void => {
    this.logger.log("Headers:\n");
    this.logger.logTable(headers);
  };

  logTime = (time: string): void => {
    this.logger.log(time);
  };
}

export default RequestHandler;
