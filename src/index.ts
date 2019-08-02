#!/usr/bin/env node
import Server from "./Server";
import { Api } from "./Server";

Server.start(
  `Listening for HTTP requests on port ${Server.port} / endpoint: ${
    Server.endpoint
  }`
);

export default Api;
