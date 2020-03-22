#!/usr/bin/env node
import Server from "./Server";
import { consoleTable } from "./Table";
import chalk from "chalk";

import yargs from "yargs";

let argv = yargs
  .scriptName("http-request-inspector")
  .usage("$0 <options>")
  .option("port", {
    default: 3000,
    describe: "Port to run on",
    type: "number"
  })
  .option("noReply", {
    default: false,
    describe: "Omit body from the response",
    type: "boolean"
  })
  .option("noLog", {
    default: false,
    describe: "Do not log anything",
    type: "boolean"
  })
  .option("statusCode", {
    default: 200,
    describe: "Status code of response",
    type: "number"
  }).argv;

const version = require("../package.json")["version"];
const s = new Server();

s.port = argv.port;
s.noReply = argv.noReply;
s.silent = argv.noLog;
s.tableLogger = consoleTable;
s.statusCode = argv.statusCode;
s.start(() => {
  console.log(
    chalk.yellow(
      `HTTP Request Inspector version ${version}.\nListening on port ${s.port}.`
    )
  );
});
