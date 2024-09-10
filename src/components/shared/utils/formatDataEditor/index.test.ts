import { describe, it, expect } from "vitest";
import { formatDataEditor } from ".";

describe("formatDataEditor", () => {
  it("should format valid JSON string correctly", () => {
    const input = '{"name":"John","age":30,"city":"New York"}';
    const expectedOutput = `{
    "name": "John",
    "age": 30,
    "city": "New York"
}`;

    const result = formatDataEditor(input);
    expect(result).toBe(expectedOutput);
  });

  it("should return an empty string on invalid JSON string", () => {
    const input = '{"name": "John", "age": 30, "city": "New York"';
    const result = formatDataEditor(input);
    expect(result).toBe("");
  });

  it("should return an empty string on non-JSON input", () => {
    const input = "This is not a JSON string";
    const result = formatDataEditor(input);
    expect(result).toBe("");
  });

  it("should handle empty string input", () => {
    const input = "";
    const result = formatDataEditor(input);
    expect(result).toBe("");
  });
});
