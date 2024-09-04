import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { headersState, Item } from "../../model";

const initialState: headersState = {
  headers: [],
};

const headersSlice = createSlice({
  name: "headers",
  initialState,
  reducers: {
    updateHeaders: (state, action: PayloadAction<Item[]>) => {
      state.headers = action.payload;
    },
  },
});

export const { updateHeaders } = headersSlice.actions;
export const headersReducer = headersSlice.reducer;
