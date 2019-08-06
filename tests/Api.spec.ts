import Api from "../src/Server";
import axios from "axios";

describe("API testing", () => {
  it("Should not crash", () => {
    const api = new Api();
    api.logger = () => {};
    api.tableLogger = () => {};
    api.port = 4000;
    api.httpMethod = "GET";
    api.endpoint = "/test";
    api.start();
    api.stop();
  });

  it("Should not crash with default values", async done => {
    const api = new Api();
    expect(api.endpoint).not.toBeNull();
    expect(api.logger).not.toBeNull();
    expect(api.tableLogger).not.toBeNull();
    expect(api.port).not.toBeNull();
    api.logger = null;
    api.tableLogger = null;
    api.start();
    const url = `http://localhost:${api.port}/something`;
    const result = await axios.get(url);
    expect(result.status).toBe(200);
    api.stop();
    done();
  });

  it("Should stop when told to", async done => {
    const api = new Api();
    api.port = 9999;
    api.start().stop();
    const url = `http://localhost:${api.port}/something`;
    try {
      await axios.get(url, { timeout: 1000 });
      fail();
      done();
    } catch {
      done();
    }
  });
});
