import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Item, GraphiqlState } from "../../model";

const initialState: GraphiqlState = {
  endpoint: "",
  body: "",
  headers: [],
  variables: [],
  response: "",
  responseStatus: null,
  sdlUrl: "",
};

const graphiqlClientSlice = createSlice({
  name: "graphiql",
  initialState,
  reducers: {
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
    updateSdlUrl: (state, action: PayloadAction<string>) => {
      state.sdlUrl = action.payload;
    },
  },
});

export const {
  updateEndpoint,
  updateBody,
  updateHeaders,
  updateVariables,
  updateResponse,
  updateResponseStatus,
  updateSdlUrl,
} = graphiqlClientSlice.actions;

export default graphiqlClientSlice.reducer;
