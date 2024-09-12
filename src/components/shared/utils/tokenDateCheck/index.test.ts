import { describe, it, expect } from "vitest";
import { isTokenValid } from ".";

describe("isTokenValid", () => {
  it("should return true for a valid token", () => {
    const validTokenDate = new Date(Date.now() - 1000 * 60 * 30).toISOString();
    expect(isTokenValid(validTokenDate)).toBe(true);
  });

  it("should return false for an expired token", () => {
    const expiredTokenDate = new Date(Date.now() - 1000 * 60 * 70).toISOString();
    expect(isTokenValid(expiredTokenDate)).toBe(false);
  });

  it("should return false for a future token", () => {
    const futureTokenDate = new Date(Date.now() + 1000 * 60 * 10).toISOString();
    expect(isTokenValid(futureTokenDate)).toBe(false);
  });

  it("should return false for an invalid date", () => {
    const invalidTokenDate = "invalid-date-string";
    expect(isTokenValid(invalidTokenDate)).toBe(false);
  });

  it("should return false if no date is provided", () => {
    expect(isTokenValid("")).toBe(false);
  });
});
