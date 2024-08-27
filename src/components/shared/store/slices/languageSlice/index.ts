import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadDictionary } from "../../../utils/loadDictionary";

interface LanguageState {
  lang: string;
  dictionary: Record<string, any>;
}

const initialState: LanguageState = {
  lang: "en",
  dictionary: loadDictionary("en"),
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<string>) {
      state.lang = action.payload;
      state.dictionary = loadDictionary(action.payload);
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
