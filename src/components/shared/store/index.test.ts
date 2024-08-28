import { describe, expect, it } from "vitest";
import store, { RootState, AppDispatch } from "@shared/store";
import { setLanguage } from "@shared/store/slices/languageSlice";
import enDictionary from "@public/dictionaries/en.json";
import ruDictionary from "@public/dictionaries/ru.json";

describe("Redux Store", () => {
  it("should initialize the store with language slice", () => {
    const currentState: RootState = store.getState();
    expect(currentState).toHaveProperty("language");
    expect(currentState.language).toEqual({
      lang: "en",
      dictionary: enDictionary,
    });
  });

  it("should handle setting a new language", () => {
    const dispatch: AppDispatch = store.dispatch;

    dispatch(setLanguage("ru"));

    const currentState: RootState = store.getState();
    expect(currentState.language).toEqual({
      lang: "ru",
      dictionary: ruDictionary,
    });
  });
});
