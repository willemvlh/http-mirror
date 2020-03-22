import RequestHandler from "../src/RequestHandler";
import LogObject from "./LogObject";
import HandlerOptions from "../src/HandlerOptions";
import { NoLogger } from "../src/Logger";
export class TestRequestHandler extends RequestHandler {
  logObject: LogObject = {
    time: "",
    headers: {},
    body: Buffer.from(""),
    params: {}
  };
  logTime = (time: string) => (this.logObject.time = time);
  logBody = (body: Buffer | object) => (this.logObject.body = body);
  logHeaders = (headers: any) => (this.logObject.headers = headers);
  logParams = (params: any) => (this.logObject.params = params);
  color = (method: string) => {
    return function(str: any) {
      return str;
    };
  };
  constructor(options: HandlerOptions) {
    super(new NoLogger(), options);
  }
}
