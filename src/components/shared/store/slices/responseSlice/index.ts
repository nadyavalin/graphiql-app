import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { ResponseState } from "../../model";

const initialState: ResponseState = {
  response: "",
};

const responseSlice = createSlice({
  name: "response",
  initialState,
  reducers: {
    updateResponse: (state, action: PayloadAction<string>) => {
      state.response = action.payload;
    },
  },
});

export const { updateResponse } = responseSlice.actions;
export const responseReducer = responseSlice.reducer;
