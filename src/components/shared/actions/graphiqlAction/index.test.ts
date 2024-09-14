import { describe, it, expect, vi, afterEach } from "vitest";
import { serverGraphiqlResponse } from ".";

// Мокаем глобальный fetch
const mockFetch = vi.fn();

globalThis.fetch = mockFetch;

describe("serverGraphiqlResponse", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return data and status for successful response", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ data: "test" }),
    } as Response);

    const data = {
      endpoint: "http://test-url.com",
      body: "query TestQuery { test }",
      headers: [{ key: "Authorization", value: "Bearer token" }],
      variables: [{ key: "testVar", value: "testValue" }],
    };

    const result = await serverGraphiqlResponse(data);

    expect(result).toEqual({ status: 200, data: { data: "test" } });
    expect(mockFetch).toHaveBeenCalledWith("http://test-url.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer token",
      },
      body: JSON.stringify({
        query: "query TestQuery { test }",
        variables: { testVar: "testValue" },
      }),
    });
  });

  it("should return error status and message for non-ok response", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    } as Response);

    const data = {
      endpoint: "http://test-url.com",
      body: "query TestQuery { test }",
      headers: [{ key: "Authorization", value: "Bearer token" }],
      variables: [{ key: "testVar", value: "testValue" }],
    };

    const result = await serverGraphiqlResponse(data);

    expect(result).toEqual({ status: 500, data: "Internal Server Error" });
    expect(mockFetch).toHaveBeenCalledWith("http://test-url.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer token",
      },
      body: JSON.stringify({
        query: "query TestQuery { test }",
        variables: { testVar: "testValue" },
      }),
    });
  });

  it("should return error message for fetch errors", async () => {
    mockFetch.mockRejectedValue(new Error("Network error"));

    const data = {
      endpoint: "http://test-url.com",
      body: "query TestQuery { test }",
      headers: [{ key: "Authorization", value: "Bearer token" }],
      variables: [{ key: "testVar", value: "testValue" }],
    };

    const result = await serverGraphiqlResponse(data);

    expect(result).toEqual({ status: null, data: "Failed to fetch" });
  });
});
