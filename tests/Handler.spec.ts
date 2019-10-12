import app from "../src/App";
import supertest from "supertest";
import { TestRequestHandler } from "./TestRequestHandler";
import { NoLogger } from "./NoLogger";
import HandlerOptions from "../src/HandlerOptions";

const testHandler = new TestRequestHandler(
  new NoLogger(),
  new HandlerOptions()
);
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
  it("The parameters should be logged", async done => {
    await agent.put("/someOtherPath?code=400");
    expect(testHandler.logObject.params).toHaveProperty("code", "400");
    done();
  });
});

describe("No-reply option", () => {
  let options = new HandlerOptions();
  options.noReply = true;
  let handler = new TestRequestHandler(new NoLogger(), options);
  expect(handler.options.noReply).toBe(true);
});
