import Table from "../src/Table";

const testObject = { key: "value", key2: "value2" };

describe("Table", () => {
  it("should output a table", () => {
    console.log(Table(testObject));
    expect(true).toBe(true);
  });
});
