import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SessionState {
  dateToken: string;
  userName: string;
}

const initialState: SessionState = {
  dateToken: "",
  userName: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setDateToken(state, action: PayloadAction<string>) {
      state.dateToken = action.payload;
    },
    setUserName(state, action: PayloadAction<string>) {
      state.userName = action.payload;
    },
  },
});

export const { setDateToken, setUserName } = userSlice.actions;
export default userSlice.reducer;
