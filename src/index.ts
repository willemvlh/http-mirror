#!/usr/bin/env node
import Server from "./Server";
const version = require("../package.json")["version"];
const s = new Server();
s.setPort(3000);
s.setEndPoint("/*");
s.start(`HTTP Request Inspector version ${version}`);
