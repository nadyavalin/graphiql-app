import { RootState } from "./";

export const selectHeaders = (state: RootState) => state.headers.headers;

export const selectVariables = (state: RootState) => state.variables.variables;

export const selectMethod = (state: RootState) => state.method.method;

export const selectEndpoint = (state: RootState) => state.endpoint.endpoint;

export const selectBody = (state: RootState) => state.body.body;
