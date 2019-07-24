import app from "../src/App";
import supertest from "supertest";
import { ILogger } from "../src/Logger";
import RequestHandler from "../src/RequestHandler";
import { AssertionError } from "assert";

class TestRequestHandler extends RequestHandler {
  logObject: any = {};
  logTime = (time: string) => (this.logObject.time = time);
  logBody = (body: Buffer) => (this.logObject.body = body);
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
  it("should return 200 and no body", done => {
    agent
      .get("/random")
      .expect(200)
      .then(r => {
        expect(testHandler.logObject.body).toEqual({});
        done();
      });
  });
});

describe("POST", () => {
  let agent = supertest.agent(app);
  let body = { beer: "honing" };
  it("The body should be present", done => {
    agent
      .post("/bla")
      .send(body)
      .then(r => {
        expect(r.body).toBeTruthy();
        expect(testHandler.logObject.body).toEqual(JSON.stringify(body));
        done();
      });
  });
});
