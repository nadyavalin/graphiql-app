import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "@shared/store/slices/languageSlice";
import { headersReducer } from "./slices/headersSlice";
import { variablesReducer } from "./slices/variablesSlice";
import { methodReducer } from "./slices/methodSlice";
import { endpointReducer } from "./slices/endpointSlice";

const store = configureStore({
  reducer: {
    language: languageReducer,
    headers: headersReducer,
    variables: variablesReducer,
    method: methodReducer,
    endpoint: endpointReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
