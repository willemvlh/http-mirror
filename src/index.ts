#!/usr/bin/env node
import Server from "./Server";
import chalk from "chalk";
const version = require("../package.json")["version"];
const s = new Server();
s.port = 3000;
s.start(
  chalk.yellow(
    `HTTP Request Inspector version ${version}.\nListening on port ${s.port}.`
  )
);
