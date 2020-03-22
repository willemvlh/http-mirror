import Table from "../src/Table";

const testObject = { key: "value", key2: "value2" };

describe("Table", () => {
  it("should output a table", () => {
    let tableStrings = Table(testObject).split("\n");
    expect(tableStrings[0].match("^═{16}$").length).toBe(1);
    expect(tableStrings[3].match("^═{16}$").length).toBe(1);
    expect(
      tableStrings[1].includes("key") && tableStrings[1].includes("value")
    );
    expect(
      tableStrings[2].includes("key2") && tableStrings[1].includes("value2")
    );
  });
});
