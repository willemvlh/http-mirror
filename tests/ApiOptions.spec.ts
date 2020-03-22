import axios from "axios";
import TestApi from "./TestApi";

describe("Options", () => {
  it("options", async done => {
    const _api = new TestApi();
    _api.port = 2134;
    _api.noReply = true;
    await _api.start();
    const url = `http://localhost:${_api.port}/something`;
    let res = await axios.post(url, "bla");
    expect(res.data).not.toBe("bla");
    _api.stop();
    done();
  });
});
