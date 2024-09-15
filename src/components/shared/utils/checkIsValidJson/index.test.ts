import { describe, it, expect } from "vitest";
import isValidJson from ".";

describe("isValidJson", () => {
  it("should return true for valid JSON strings", () => {
    const validJsonStrings = [
      '{"key": "value"}',
      '{"key": 123, "array": [1, 2, 3]}',
      "[]",
      "{}",
      "true",
      "123",
      '"string"',
    ];

    validJsonStrings.forEach((jsonStr) => {
      expect(isValidJson(jsonStr)).toBe(true);
    });
  });

  it("should return false for invalid JSON strings", () => {
    const invalidJsonStrings = [
      '{key: "value"}',
      '{"key": value}',
      "{",
      "[1, 2, 3,]",
      "undefined",
      "NaN",
      "null null",
    ];

    invalidJsonStrings.forEach((jsonStr) => {
      expect(isValidJson(jsonStr)).toBe(false);
    });
  });

  it("should return false for empty or non-JSON strings", () => {
    const nonJsonStrings = ["", "Hello, world!"];

    nonJsonStrings.forEach((str) => {
      expect(isValidJson(str)).toBe(false);
    });
  });
});
