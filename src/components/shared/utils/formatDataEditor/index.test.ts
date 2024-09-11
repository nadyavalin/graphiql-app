import { describe, it, expect } from "vitest";
import { formatDataEditor } from ".";

describe("formatDataEditor", () => {
  it("should return formatted code when there are no empty lines", () => {
    const input = `const a = 1; const b = 2; function test() { console.log(a + b); }`;
    const expectedOutput = `const a = 1;
const b = 2;

function test() {
    console.log(a + b);
}`;

    const result = formatDataEditor(input);
    expect(result).toBe(expectedOutput);
  });

  it("should return an empty string if input is empty", () => {
    const input = "";
    const expectedOutput = "";

    const result = formatDataEditor(input);
    expect(result).toBe(expectedOutput);
  });
});
