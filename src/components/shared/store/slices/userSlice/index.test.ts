import { setDateToken, setUserName } from ".";
import { describe, expect, test } from "vitest";
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
import storage from "redux-persist/lib/storage";
import languageSlice from "@shared/store/slices/languageSlice";
import userSlice from "@shared/store/slices/userSlice";

const rootReducer = combineReducers({
  language: languageSlice,
  user: userSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
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

describe("userSlice", () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

  test("should return the initial state", () => {
    const state = store.getState().user;
    expect(state).toEqual({
      dateToken: "",
      userName: "",
    });
  });

  test("should handle setDateToken", () => {
    const newDateToken = "2023-10-18T00:00:00Z";
    store.dispatch(setDateToken(newDateToken));

    const state = store.getState().user;
    expect(state.dateToken).toBe(newDateToken);
  });

  test("should handle setUserName", () => {
    const newUserName = "John Doe";
    store.dispatch(setUserName(newUserName));

    const state = store.getState().user;
    expect(state.userName).toBe(newUserName);
  });

  test("should correctly update state when multiple actions are dispatched", () => {
    const newDateToken = "2023-10-18T00:00:00Z";
    const newUserName = "Jane Smith";

    store.dispatch(setDateToken(newDateToken));
    store.dispatch(setUserName(newUserName));

    const state = store.getState().user;
    expect(state.dateToken).toBe(newDateToken);
    expect(state.userName).toBe(newUserName);
  });
});
