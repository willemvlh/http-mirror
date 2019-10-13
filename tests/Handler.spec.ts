import app from "../src/App";
import supertest from "supertest";
import { TestRequestHandler } from "./TestRequestHandler";
import { NoLogger } from "./NoLogger";
import HandlerOptions from "../src/HandlerOptions";

const testHandler = new TestRequestHandler(
  new NoLogger(),
  new HandlerOptions()
);

describe("GET", () => {
  app.get("/random", testHandler.handle);
  let agent = supertest.agent(app);
  it("should return 200 and no body", async done => {
    await agent.get("/random").expect(200);
    expect(testHandler.logObject.body).toEqual({});
    done();
  });
});

describe("POST", () => {
  app.post("/bla", testHandler.handle);
  let agent = supertest.agent(app);
  let body = { beer: "honing" };
  let textBody = "glas";
  it("The JSON should be returned", async done => {
    await agent.post("/bla").send(body);
    expect(testHandler.logObject.body.toString()).toEqual(JSON.stringify(body));
    done();
  });

  it("The text should be returned as well", async done => {
    await agent.post("/bla").send(textBody);
    expect(testHandler.logObject.body.toString()).toEqual(textBody);
    done();
  });
});

describe("PUT", () => {
  app.put("/put", testHandler.handle);
  let agent = supertest.agent(app);
  let header = { some: "header" };
  it("The header should be returned", async done => {
    await agent.put("/put").set(header);
    expect(testHandler.logObject.headers).toHaveProperty("some", "header");
    done();
  });
  it("The parameters should be logged", async done => {
    await agent.put("/put?code=400");
    expect(testHandler.logObject.params).toHaveProperty("code", "400");
    done();
  });
});

describe("No-reply option", () => {
  let options = new HandlerOptions();
  it("When no-reply is true, no reply should be sent", done => {
    options.noReply = true;
    let handler = new TestRequestHandler(new NoLogger(), options);
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
    let handler = new TestRequestHandler(new NoLogger(), options);
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
  let handler = new TestRequestHandler(new NoLogger(), options);
  it("the status code should be equal to the one set", done => {
    app.get("/status", handler.handle);
    let test = supertest(app)
      .get("/status")
      .expect(201)
      .then(_r => done());
  });
});
