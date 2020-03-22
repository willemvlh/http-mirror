import TestApi from "./TestApi";
import axios from "axios";
import Api from "../src/Server";

let initialPort = 3001;

function newAPI(method?: string): Api {
  initialPort++;
  let api = new TestApi();
  if (method) {
    api.httpMethod = method;
  }
  api.port = initialPort;
  return api;
}

describe("API testing", () => {
  it("Should not crash", async done => {
    const api = newAPI("GET");
    api.endpoint = "/test";
    await api.start();
    expect(api.isRunning).toBe(true);
    await api.stop();
    expect(api.isRunning).toBe(false);
    done();
  });

  it("The method should be configurable", async done => {
    const api = newAPI("POST");
    await api.start();
    const url = `http://localhost:${api.port}/something`;
    expect(axios.get(url)).rejects.toThrow();
    expect(axios.delete(url)).rejects.toThrow();
    expect(axios.put(url)).rejects.toThrow();
    let response = await axios.post(url);
    expect(response.status).toBe(200);
    await api.stop();
    done();
  });

  it("all methods should work", async done => {
    let map: Map<string, Function> = new Map();
    map.set("DELETE", axios.delete);
    map.set("PATCH", axios.put);
    map.set("HEAD", axios.head);
    map.set("PUT", axios.put);
    2;
    map.forEach(async (v, k) => {
      const api = newAPI(k);
      await api.start();
      let url = `http://localhost:${api.port}`;
      let result = await v(url);
      expect(result.status).toBe(200);
      api.stop();
    });
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
    await api.stop();
    done();
  });

  it("Should stop when told to", async done => {
    const api = newAPI();
    await api.start(() => console.log("Starting"));
    const url = `http://localhost:${api.port}/something`;
    await api.stop();
    try {
      await axios.get(url, { timeout: 1000 });
      fail();
    } catch {
      done();
    }
    done();
  });

  it("API should keep running even if callback throws error", async done => {
    const api = newAPI();
    try {
      await api.start(() => {
        throw new Error("error");
      });
    } catch (e) {
      expect(api.isRunning).toBe(true);
      await api.stop();
      expect(e.message).toBe("error");
      done();
    }
  });

  it("A server can't be stopped when it's not running", async done => {
    const api = newAPI();
    expect(api.isRunning).toBe(false);
    try {
      await api.stop();
      fail();
    } catch {
      //succeed
    } finally {
      done();
    }
  });
});
