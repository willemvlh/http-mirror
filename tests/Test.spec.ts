import app from "../src/App";
import supertest from "supertest";
import { ILogger } from "../src/Logger";
import RequestHandler from "../src/RequestHandler";
import { IncomingHttpHeaders } from "http2";

interface LogObject {
  body: Buffer | object;
  headers: IncomingHttpHeaders;
  time: string;
}

class TestRequestHandler extends RequestHandler {
  logObject: LogObject = { time: "", headers: {}, body: Buffer.from("") };
  logTime = (time: string) => (this.logObject.time = time);
  logBody = (body: Buffer | object) => (this.logObject.body = body);
  logHeaders = (headers: any) => (this.logObject.headers = headers);
  color = (method: string) => {
    return function(str: any) {
      return str;
    };
  };
}

class NoLogger implements ILogger {
  log(subject: any) {}
  logTable(subject: any) {}
  clear() {}
}

const testHandler = new TestRequestHandler(new NoLogger());
app.all("*/*", testHandler.handle);

describe("GET", () => {
  let agent = supertest.agent(app);
  it("should return 200 and no body", async done => {
    await agent.get("/random").expect(200);
    expect(testHandler.logObject.body).toEqual({});
    done();
  });
});

describe("POST", () => {
  let agent = supertest.agent(app);
  let body = { beer: "honing" };
  let textBody = "glas";
  it("The JSON should be returned", async done => {
    await agent.post("/bla").send(body);
    expect(testHandler.logObject.body.toString()).toEqual(JSON.stringify(body));
    done();
  });

  it("The text should be returned as well", async done => {
    await agent.put("/alb").send(textBody);
    expect(testHandler.logObject.body.toString()).toEqual(textBody);
    done();
  });
});

describe("PUT", () => {
  let agent = supertest.agent(app);
  let header = { some: "header" };
  it("The header should be returned", async done => {
    await agent.put("/put").set(header);
    expect(testHandler.logObject.headers).toHaveProperty("some", "header");
    done();
  });
});
