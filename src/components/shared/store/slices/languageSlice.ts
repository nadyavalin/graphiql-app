import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LanguageState {
  lang: string;
  dictionary: {
    buttons: {
      login: string;
      registration: string;
      logout: string;
      welcome: string;
    };
  };
}

const initialState: LanguageState = {
  lang: "en",
  dictionary: {
    buttons: {
      login: "Login",
      registration: "Registration",
      logout: "Logout",
      welcome: "Welcome",
    },
  },
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<string>) {
      state.lang = action.payload;

      if (action.payload === "ru") {
        state.dictionary.buttons = {
          login: "Вход",
          registration: "Регистрация",
          logout: "Выход",
          welcome: "Добро пожаловать",
        };
      } else if (action.payload === "en") {
        state.dictionary.buttons = {
          login: "Login",
          registration: "Registration",
          logout: "Logout",
          welcome: "Welcome",
        };
      }
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
