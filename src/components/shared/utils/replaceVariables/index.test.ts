import { describe, it, expect } from "vitest";
import { Item } from "@shared/store/model";
import replaceVariables from ".";

describe("replaceVariables", () => {
  it("should replace variables in the text with their values", () => {
    const text = "Hello, {{name}}! Today is {{day}}.";
    const variables: Item[] = [
      { key: "name", value: "Alice" },
      { key: "day", value: "Monday" },
    ];
    const expectedOutput = 'Hello, "Alice"! Today is "Monday".';

    const result = replaceVariables(text, variables);
    expect(result).toBe(expectedOutput);
  });

  it("should not replace variables that are not in the array", () => {
    const text = "Hello, {{name}}! Today is {{day}}.";
    const variables: Item[] = [{ key: "name", value: "Alice" }];
    const expectedOutput = 'Hello, "Alice"! Today is {{day}}.';

    const result = replaceVariables(text, variables);
    expect(result).toBe(expectedOutput);
  });

  it("should handle cases with multiple occurrences of the same variable", () => {
    const text = "Hello, {{name}}! {{name}} is here.";
    const variables: Item[] = [{ key: "name", value: "Alice" }];
    const expectedOutput = 'Hello, "Alice"! "Alice" is here.';

    const result = replaceVariables(text, variables);
    expect(result).toBe(expectedOutput);
  });

  it("should handle empty text and variables", () => {
    const text = "";
    const variables: Item[] = [];
    const expectedOutput = "";

    const result = replaceVariables(text, variables);
    expect(result).toBe(expectedOutput);
  });

  it("should handle empty text with variables", () => {
    const text = "";
    const variables: Item[] = [{ key: "name", value: "Alice" }];
    const expectedOutput = "";

    const result = replaceVariables(text, variables);
    expect(result).toBe(expectedOutput);
  });
});
