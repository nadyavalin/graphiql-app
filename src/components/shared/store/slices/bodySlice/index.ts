import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { BodyState } from "../../model";

const initialState: BodyState = {
  body: "",
};

const bodySlice = createSlice({
  name: "body",
  initialState,
  reducers: {
    updateBody: (state, action: PayloadAction<string>) => {
      state.body = action.payload;
    },
  },
});

export const { updateBody } = bodySlice.actions;
export const bodyReducer = bodySlice.reducer;
