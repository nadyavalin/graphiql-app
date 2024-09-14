import { describe, it, expect, vi, afterEach } from "vitest";
import { serverGraphiqlShemaResponse } from ".";
import { Methods } from "@shared/store/model";
import INTROSPECTION_QUERY from "./IntrospectionQuery";

// Мокаем глобальный fetch
const mockFetch = vi.fn();

globalThis.fetch = mockFetch;

describe("serverGraphiqlShemaResponse", () => {
  afterEach(() => {
    vi.clearAllMocks(); // Очистка моков после каждого теста
  });

  it("should return true for successful response", async () => {
    // Мокаем успешный ответ
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      statusText: "OK",
    } as Response);

    const result = await serverGraphiqlShemaResponse("http://test-url.com");

    expect(result).toBe(true);
    expect(mockFetch).toHaveBeenCalledWith("http://test-url.com", {
      method: Methods.post,
      body: JSON.stringify({
        operationName: "IntrospectionQuery",
        query: INTROSPECTION_QUERY,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

  it("should return false for non-ok response", async () => {
    // Мокаем неудачный ответ
    mockFetch.mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    } as Response);

    const result = await serverGraphiqlShemaResponse("http://test-url.com");

    expect(result).toBe(false);
    expect(mockFetch).toHaveBeenCalledWith("http://test-url.com", {
      method: Methods.post,
      body: JSON.stringify({
        operationName: "IntrospectionQuery",
        query: INTROSPECTION_QUERY,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

  it("should return false for fetch error", async () => {
    // Мокаем ошибку fetch
    mockFetch.mockRejectedValue(new Error("Network error"));

    const result = await serverGraphiqlShemaResponse("http://test-url.com");

    expect(result).toBe(false);
  });
});
