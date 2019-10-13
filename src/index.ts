#!/usr/bin/env node
import Server from "./Server";
import { consoleTable } from "./Table";
import chalk from "chalk";

const version = require("../package.json")["version"];
const defaultPort = Number(process.argv[2]) || 3000;
const s = new Server();
if (!Number.isInteger(defaultPort)) {
  throw new Error("The supplied port should be an integer");
}
s.port = defaultPort;
s.tableLogger = consoleTable;
s.start(() => {
  console.log(
    chalk.yellow(
      `HTTP Request Inspector version ${version}.\nListening on port ${s.port}.`
    )
  );
});
