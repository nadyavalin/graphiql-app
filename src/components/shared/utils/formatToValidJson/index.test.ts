import { describe, it, expect } from "vitest";
import fixInvalidJson from ".";

describe("fixInvalidJson", () => {
  it("should correctly add quotes around keys and wrap with braces if needed", () => {
    const input = "key: value, anotherKey: 123";
    const expectedOutput = '{"key":"value", "anotherKey":"123"}';

    const result = fixInvalidJson(input);
    expect(result).toBe(expectedOutput);
  });

  it("should not modify already valid JSON", () => {
    const input = '{"key": "value", "anotherKey":"123"}';
    const expectedOutput = input;

    const result = fixInvalidJson(input);
    expect(result).toBe(expectedOutput);
  });

  it("should wrap the input in braces if it lacks them", () => {
    const input = "key: value";
    const expectedOutput = '{"key":"value"}';

    const result = fixInvalidJson(input);
    expect(result).toBe(expectedOutput);
  });

  it("should handle empty input", () => {
    const input = "";
    const expectedOutput = "{}";

    const result = fixInvalidJson(input);
    expect(result).toBe(expectedOutput);
  });

  it("should not modify input if it starts and ends with braces but has invalid format", () => {
    const input = "{key: value}";
    const expectedOutput = '{"key":"value"}';

    const result = fixInvalidJson(input);
    expect(result).toBe(expectedOutput);
  });
});
