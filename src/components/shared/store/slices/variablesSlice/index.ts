import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { VariablesState, Item } from "../../model";

const initialState: VariablesState = {
  variables: [],
};

const variablesSlice = createSlice({
  name: "variables",
  initialState,
  reducers: {
    updateVariables: (state, action: PayloadAction<Item[]>) => {
      state.variables = action.payload;
    },
  },
});

export const { updateVariables } = variablesSlice.actions;
export const variablesReducer = variablesSlice.reducer;