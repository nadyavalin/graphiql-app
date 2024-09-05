import { RootState } from "./";

export const selectHeaders = (state: RootState) => state.headers.headers;

export const selectVariables = (state: RootState) => state.variables.variables;
