import TestApi from "./TestApi";

import axios from "axios";

describe("API testing", () => {
  it("Should not crash", async done => {
    const api = new TestApi();
    api.port = 4000;
    api.httpMethod = "GET";
    api.endpoint = "/test";
    await api.start();
    expect(api.isRunning).toBe(true);
    api.stop();
    expect(api.isRunning).toBe(false);
    done();
  });

  it("The method should be configurable", async done => {
    const api = new TestApi();
    api.httpMethod = "POST";
    api.port = 3102;
    await api.start();
    const url = `http://localhost:${api.port}/something`;
    expect(axios.get(url)).rejects.toThrow();
    expect(axios.delete(url)).rejects.toThrow();
    expect(axios.put(url)).rejects.toThrow();
    let response = await axios.post(url);
    expect(response.status).toBe(200);
    api.stop();
    done();
  });

  it("Should not crash with default values", async done => {
    const api = new TestApi();
    expect(api.endpoint).not.toBeNull();
    expect(api.port).not.toBeNull();
    await api.start();
    const url = `http://localhost:${api.port}/something`;
    const result = await axios.get(url);
    expect(result.status).toBe(200);
    api.stop();
    done();
  });

  it("Should stop when told to", async done => {
    const api = new TestApi();
    api.port = 9999;
    await api.start;
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
