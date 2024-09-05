import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Methods, MethodState } from "../../model";

const initialState: MethodState = {
  method: Methods["get"],
};

const methodSlice = createSlice({
  name: "method",
  initialState,
  reducers: {
    updateMethod: (state, action: PayloadAction<Methods>) => {
      state.method = action.payload;
    },
  },
});

export const { updateMethod } = methodSlice.actions;
export const methodReducer = methodSlice.reducer;
