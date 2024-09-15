import { describe, it, expect, vi, beforeEach } from "vitest";
import { serverResponse, IServerResponse } from ".";
import isValidJson from "@shared/utils/checkIsValidJson";
import fixInvalidJson from "@shared/utils/formatToValidJson";
import replaceVariables from "@shared/utils/replaceVariables";

vi.mock("@shared/utils/checkIsValidJson");
vi.mock("@shared/utils/formatToValidJson");
vi.mock("@shared/utils/replaceVariables");

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("serverResponse", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should make a fetch request with correct parameters and return data when response is ok", async () => {
    const mockData = { key: "value" };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockData,
    });

    const params: IServerResponse = {
      endpoint: "https://api.example.com",
      method: "POST",
      body: '{"name":"test"}',
      headers: [{ key: "Content-Type", value: "application/json" }],
      variables: [],
    };

    const response = await serverResponse(params);

    expect(mockFetch).toHaveBeenCalledWith("https://api.example.com", {
      method: "POST",
      body: undefined,
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    expect(response).toEqual({ status: 200, data: mockData });
  });

  it("should handle fetch errors and return appropriate data", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    const params: IServerResponse = {
      endpoint: "https://api.example.com",
      method: "GET",
      body: "",
      headers: [],
      variables: [],
    };

    const response = await serverResponse(params);

    expect(mockFetch).toHaveBeenCalledWith("https://api.example.com", {
      method: "GET",
      body: undefined,
      headers: new Headers(),
    });
    expect(response).toEqual({ status: null, data: "Failed to fetch" });
  });

  it("should handle non-ok responses correctly", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });

    const params: IServerResponse = {
      endpoint: "https://api.example.com",
      method: "GET",
      body: "",
      headers: [],
      variables: [],
    };

    const response = await serverResponse(params);

    expect(mockFetch).toHaveBeenCalledWith("https://api.example.com", {
      method: "GET",
      body: undefined,
      headers: new Headers(),
    });
    expect(response).toEqual({ status: 404, data: "Not Found" });
  });

  it("should fix invalid JSON and replace variables in body", async () => {
    (isValidJson as ReturnType<typeof vi.fn>).mockReturnValueOnce(false);
    (fixInvalidJson as ReturnType<typeof vi.fn>).mockReturnValueOnce('{"fixed":"json"}');
    (replaceVariables as ReturnType<typeof vi.fn>).mockReturnValueOnce(
      '{"fixed":"json with variables"}',
    );

    const params: IServerResponse = {
      endpoint: "https://api.example.com",
      method: "POST",
      body: '{"name":"test"',
      headers: [],
      variables: [{ key: "variable", value: "value" }],
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ success: true }),
    });

    const response = await serverResponse(params);

    expect(isValidJson).toHaveBeenCalledWith('{"name":"test"');
    expect(fixInvalidJson).toHaveBeenCalledWith('{"name":"test"');
    expect(replaceVariables).toHaveBeenCalledWith('{"fixed":"json"}', [
      { key: "variable", value: "value" },
    ]);
    expect(mockFetch).toHaveBeenCalledWith("https://api.example.com", {
      method: "POST",
      body: '{"fixed":"json with variables"}',
      headers: new Headers(),
    });
    expect(response).toEqual({ status: 200, data: { success: true } });
  });
});
