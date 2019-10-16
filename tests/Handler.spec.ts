import app from "../src/App";
import supertest from "supertest";
import { TestRequestHandler } from "./TestRequestHandler";
import { TestLogger } from "./TestLoggers";
import HandlerOptions from "../src/HandlerOptions";
import RequestHandler from "../src/RequestHandler";

const defaultHandler = new TestRequestHandler(new HandlerOptions());

describe("GET", () => {
  app.get("/random", defaultHandler.handle);
  let agent = supertest.agent(app);
  it("should return 200 and no body", async done => {
    await agent.get("/random").expect(200);
    expect(defaultHandler.logObject.body).toEqual({});
    done();
  });
});

describe("POST", () => {
  app.post("/bla", defaultHandler.handle);
  let agent = supertest.agent(app);
  let body = { beer: "honing" };
  let textBody = "glas";
  it("The JSON should be returned", async done => {
    await agent.post("/bla").send(body);
    expect(defaultHandler.logObject.body.toString()).toEqual(
      JSON.stringify(body)
    );
    done();
  });

  it("The text should be returned as well", async done => {
    await agent.post("/bla").send(textBody);
    expect(defaultHandler.logObject.body.toString()).toEqual(textBody);
    done();
  });
});

describe("PUT", () => {
  app.put("/put", defaultHandler.handle);
  let agent = supertest.agent(app);
  let header = { some: "header" };
  it("The header should be returned", async done => {
    await agent.put("/put").set(header);
    expect(defaultHandler.logObject.headers).toHaveProperty("some", "header");
    done();
  });
  it("The parameters should be logged", async done => {
    await agent.put("/put?code=400");
    expect(defaultHandler.logObject.params).toHaveProperty("code", "400");
    done();
  });
});

describe("No-reply option", () => {
  let options = new HandlerOptions();
  it("When no-reply is true, no reply should be sent", done => {
    options.noReply = true;
    let handler = new TestRequestHandler(options);
    app.post("/noreply", handler.handle);
    supertest(app)
      .post("/noreply")
      .send("bla")
      .then(r => {
        expect(r.body.toString()).not.toBe("bla");
        done();
      });
  });
  it("when no-reply is false, a reply should be sent", done => {
    options.noReply = false;
    let handler = new TestRequestHandler(options);
    app.post("/reply", handler.handle);
    supertest(app)
      .post("/reply")
      .send("bla")
      .then(r => {
        expect(r.body.toString()).toBe("bla");
        done();
      });
  });
});

describe("Status code option", () => {
  let options = new HandlerOptions();
  options.statusCode = 201;
  let handler = new TestRequestHandler(options);
  it("the status code should be equal to the one set", done => {
    app.get("/status", handler.handle);
    let test = supertest(app)
      .get("/status")
      .expect(201)
      .then(_r => done());
  });
});

describe("On request option", () => {
  let options = new HandlerOptions();
  let cb = jest.fn();
  options.onRequest = cb;
  let handler = new TestRequestHandler(options);
  it("the callback should be called", async done => {
    app.get("/request", handler.handle);
    supertest(app)
      .get("/request")
      .then(_ => {
        expect(cb).toBeCalled();
        done();
      });
  });
});

describe("The handler logging function", () => {
  let logger = new TestLogger();
  let handler = new RequestHandler(logger, new HandlerOptions());
  it("should correctly log the body", () => {
    handler.logBody(Buffer.from("biepboep"));
    expect(logger.buffer).toContain("biepboep");
  });
  it("should correctly log the headers", () => {
    handler.logHeaders({ accept: "application/xml" });
    expect(logger.buffer).toEqual({ accept: "application/xml" });
  });
  it("should correctly log the parameters", () => {
    handler.logParams("param");
    expect(logger.buffer).toContain("param");
  });
});
