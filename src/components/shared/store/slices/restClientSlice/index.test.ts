import { describe, it, expect } from "vitest";
import reducer, {
  updateMethod,
  updateEndpoint,
  updateBody,
  updateHeaders,
  updateVariables,
  updateResponse,
  updateResponseStatus,
} from ".";
import { Item, Methods, RestClientState } from "../../model";

describe("restClientSlice", () => {
  const initialState: RestClientState = {
    method: Methods.get,
    endpoint: "",
    body: "",
    headers: [],
    variables: [],
    response: "",
    responseStatus: null,
  };

  it("should handle updateMethod", () => {
    const state = reducer(initialState, updateMethod(Methods.post));
    expect(state.method).toBe(Methods.post);
  });

  it("should handle updateEndpoint", () => {
    const state = reducer(initialState, updateEndpoint("http://test.com"));
    expect(state.endpoint).toBe("http://test.com");
  });

  it("should handle updateBody", () => {
    const state = reducer(initialState, updateBody('{"key": "value"}'));
    expect(state.body).toBe('{"key": "value"}');
  });

  it("should handle updateHeaders", () => {
    const headers: Item[] = [{ key: "Authorization", value: "Bearer token" }];
    const state = reducer(initialState, updateHeaders(headers));
    expect(state.headers).toEqual(headers);
  });

  it("should handle updateVariables", () => {
    const variables: Item[] = [{ key: "var1", value: "value1" }];
    const state = reducer(initialState, updateVariables(variables));
    expect(state.variables).toEqual(variables);
  });

  it("should handle updateResponse", () => {
    const state = reducer(initialState, updateResponse("Success"));
    expect(state.response).toBe("Success");
  });

  it("should handle updateResponseStatus", () => {
    const state = reducer(initialState, updateResponseStatus(200));
    expect(state.responseStatus).toBe(200);
  });
});
