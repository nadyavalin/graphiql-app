import { combineReducers, configureStore } from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/es/storage";
import languageSlice from "./slices/languageSlice";
import userSlice from "./slices/userSlice";
import historySlice from "./slices/historySlice";
import restClientSlice from "./slices/restClientSlice";
import graphiqlSlice from "./slices/graphiqlSlice";

const rootReducer = combineReducers({
  language: languageSlice,
  user: userSlice,
  history: historySlice,
  restClient: restClientSlice,
  graphiql: graphiqlSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "history"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
