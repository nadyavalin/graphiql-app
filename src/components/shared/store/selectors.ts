import { RootState } from "./";

export const selectHeaders = (state: RootState) => state.restClient.headers;

export const selectVariables = (state: RootState) => state.restClient.variables;

export const selectMethod = (state: RootState) => state.restClient.method;

export const selectEndpoint = (state: RootState) => state.restClient.endpoint;

export const selectBody = (state: RootState) => state.restClient.body;

export const selectResponse = (state: RootState) => state.restClient.response;
