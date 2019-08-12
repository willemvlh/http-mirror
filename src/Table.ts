class StringBuilder {
  private _lineSeparator = "\n";
  private _string: string;
  constructor() {
    this._string = "";
  }
  public appendLine(line: string) {
    if (this._string != "") {
      this.append(this._lineSeparator);
    }
    this.append(line);
  }
  public append(string: string) {
    this._string += string;
  }
  public appendAll(strings: string[]) {
    for (let str in strings) {
      this.append(str);
    }
  }
  public toString() {
    return this._string;
  }
}

function table(object: any) {
  const stringBuilder: StringBuilder = new StringBuilder();
  let longestKeyLength: number = Math.max(
    ...Object.keys(object).map(key => key.length)
  );
  let longestValueLength: number = Math.max(
    ...Object.values(object).map(value => String(value).length)
  );
  function lineLength(): number {
    return longestKeyLength + longestValueLength + 6;
  }

  function borderLine(amount: number) {
    const sb = new StringBuilder();
    for (let x = 0; x < amount; x++) {
      sb.append("═");
    }
    return sb.toString();
  }
  stringBuilder.appendLine(borderLine(lineLength()));

  for (let entry of Object.entries(object)) {
    stringBuilder.appendLine(
      `║ ${entry[0].padEnd(longestKeyLength)} ║ ${String(entry[1]).padEnd(
        longestValueLength
      )} ║`
    );
  }

  stringBuilder.appendLine(borderLine(lineLength()));
  console.log(stringBuilder.toString());
}

export default table;
