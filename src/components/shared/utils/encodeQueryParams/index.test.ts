import { describe, it, expect } from "vitest";
import encodeQueryParams from ".";

describe("encodeQueryParams", () => {
  it("should correctly encode an object into a query string", () => {
    const headers = {
      name: "John",
      age: "30",
      city: "New York",
    };

    const expectedOutput = "name=John&age=30&city=New York";

    const result = encodeQueryParams(headers);
    expect(result).toBe(expectedOutput);
  });

  it("should return an empty string when given an empty object", () => {
    const headers = {};
    const result = encodeQueryParams(headers);
    expect(result).toBe("");
  });

  it("should handle special characters in the values", () => {
    const headers = {
      search: "John Doe",
      filter: "age>=30",
    };

    const expectedOutput = "search=John Doe&filter=age>=30";

    const result = encodeQueryParams(headers);
    expect(result).toBe(expectedOutput);
  });
});
