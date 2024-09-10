import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SessionState {
  dateToken: string;
}

const initialState: SessionState = {
  dateToken: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setDateToken(state, action: PayloadAction<string>) {
      state.dateToken = action.payload;
    },
  },
});

export const { setDateToken } = userSlice.actions;
export default userSlice.reducer;
