import { describe, it, expect } from "vitest";
import reducer, {
  updateEndpoint,
  updateBody,
  updateHeaders,
  updateVariables,
  updateResponse,
  updateResponseStatus,
  updateUserSdl,
  updateSdlUrl,
  updateIsSdlExists,
} from ".";
import { GraphiqlState, Item } from "../../model";

describe("graphiqlClientSlice", () => {
  const initialState: GraphiqlState = {
    endpoint: "",
    body: "",
    headers: [],
    variables: [],
    response: "",
    responseStatus: null,
    isUserSdl: false,
    isSdlExists: false,
    sdlUrl: "",
  };

  it("should handle updateEndpoint", () => {
    const state = reducer(initialState, updateEndpoint("http://test.com"));
    expect(state.endpoint).toBe("http://test.com");
  });

  it("should handle updateBody", () => {
    const state = reducer(initialState, updateBody("query { test }"));
    expect(state.body).toBe("query { test }");
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

  it("should handle updateUserSdl", () => {
    const state = reducer(initialState, updateUserSdl(true));
    expect(state.isUserSdl).toBe(true);
  });

  it("should handle updateSdlUrl", () => {
    const state = reducer(initialState, updateSdlUrl("http://sdl-url.com"));
    expect(state.sdlUrl).toBe("http://sdl-url.com");
  });

  it("should handle updateIsSdlExists", () => {
    const state = reducer(initialState, updateIsSdlExists(true));
    expect(state.isSdlExists).toBe(true);
  });
});
