import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { EndpointState } from "../../model";

const initialState: EndpointState = {
  endpoint: "",
};

const endpointSlice = createSlice({
  name: "endpoint",
  initialState,
  reducers: {
    updateEndpoint: (state, action: PayloadAction<string>) => {
      state.endpoint = action.payload;
    },
  },
});

export const { updateEndpoint } = endpointSlice.actions;
export const endpointReducer = endpointSlice.reducer;
