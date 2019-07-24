import { IncomingHttpHeaders } from "http";

interface LogObject {
  body: Buffer | object;
  headers: IncomingHttpHeaders;
  time: string;
  params: any;
}

export default LogObject;
