import { describe, it, expect } from "vitest";
import { encodeBase64, decodeBase64 } from ".";

describe("Base64 Encoding/Decoding", () => {
  it("should correctly encode a string to Base64", () => {
    const input = "Hello, world!";
    const expectedOutput = "SGVsbG8sIHdvcmxkIQ==";

    const result = encodeBase64(input);
    expect(result).toBe(expectedOutput);
  });

  it("should correctly decode a Base64 string", () => {
    const input = "SGVsbG8sIHdvcmxkIQ==";
    const expectedOutput = "Hello, world!";

    const result = decodeBase64(input);
    expect(result).toBe(expectedOutput);
  });

  it("should return an empty string when encoding/decoding an empty string", () => {
    const input = "";

    const encodedResult = encodeBase64(input);
    const decodedResult = decodeBase64(input);

    expect(encodedResult).toBe("");
    expect(decodedResult).toBe("");
  });
});
