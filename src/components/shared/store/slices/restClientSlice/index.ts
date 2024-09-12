import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Item, Methods, RestClientState } from "../../model";

const initialState: RestClientState = {
  method: Methods.get,
  endpoint: "",
  body: "",
  headers: [],
  variables: [],
  response: "",
  responseStatus: null,
};

const restClientSlice = createSlice({
  name: "restClient",
  initialState,
  reducers: {
    updateMethod: (state, action: PayloadAction<Methods>) => {
      state.method = action.payload;
    },
    updateEndpoint: (state, action: PayloadAction<string>) => {
      state.endpoint = action.payload;
    },
    updateBody: (state, action: PayloadAction<string>) => {
      state.body = action.payload;
    },
    updateHeaders: (state, action: PayloadAction<Item[]>) => {
      state.headers = action.payload;
    },
    updateVariables: (state, action: PayloadAction<Item[]>) => {
      state.variables = action.payload;
    },
    updateResponse: (state, action: PayloadAction<string>) => {
      state.response = action.payload;
    },
    updateResponseStatus: (state, action: PayloadAction<number | null>) => {
      state.responseStatus = action.payload;
    },
  },
});

export const {
  updateMethod,
  updateEndpoint,
  updateBody,
  updateHeaders,
  updateVariables,
  updateResponse,
  updateResponseStatus,
} = restClientSlice.actions;

export default restClientSlice.reducer;
