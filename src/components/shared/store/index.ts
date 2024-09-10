import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "@shared/store/slices/languageSlice";
import { restClientReducer } from "./slices/restClientSlice";

const store = configureStore({
  reducer: {
    language: languageReducer,
    restClient: restClientReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
