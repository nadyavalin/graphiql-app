import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "@shared/store/slices/languageSlice";
import { headersReducer } from "./slices/headersSlice";
import { variablesReducer } from "./slices/variablesSlice";

const store = configureStore({
  reducer: {
    language: languageReducer,
    headers: headersReducer,
    variables: variablesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
