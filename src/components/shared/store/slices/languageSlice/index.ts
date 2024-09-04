import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Languages } from "@shared/types/types";
import { loadDictionary } from "@shared/utils/loadDictionary";

interface LanguageState {
  lang: Languages;
  dictionary: Record<string, unknown>;
}

const initialState: LanguageState = {
  lang: Languages.EN,
  dictionary: loadDictionary(Languages.EN),
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<Languages>) {
      state.lang = action.payload;
      state.dictionary = loadDictionary(action.payload);
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
