#!/usr/bin/env node
import Server from "./Server";
import Table from "./Table";
import chalk from "chalk";
import { AddressInfo } from "net";

const version = require("../package.json")["version"];
const defaultPort = Number(process.argv[2]) || 3000;
const s = new Server();
if (!Number.isInteger(defaultPort)) {
  throw new Error("The supplied port should be an integer");
}
s.port = defaultPort;
s.tableLogger = Table;
s.start(() => {
  let address: string = "";
  if (s.server != null) {
    let a = <AddressInfo>s.server.address();
    address = a.address + ":" + a.port;
  }
  console.log(
    chalk.yellow(
      `HTTP Request Inspector version ${version}.\nListening on port ${
        s.port
      }. ${address}`
    )
  );
});
