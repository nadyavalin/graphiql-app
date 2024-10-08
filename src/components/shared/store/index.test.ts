import { describe, expect, it } from "vitest";
import { RootState, AppDispatch, store } from "@shared/store";
import { setLanguage } from "@shared/store/slices/languageSlice";
import en from "@public/dictionaries/en.json";
import ru from "@public/dictionaries/ru.json";
import { Languages } from "@shared/types";

describe("Redux Store", () => {
  it("should initialize the store with language slice", () => {
    const currentState: RootState = store.getState();
    expect(currentState).toHaveProperty("language");
    expect(currentState.language).toEqual({
      lang: "en",
      dictionary: en,
    });
  });

  it("should handle setting a new language", () => {
    const dispatch: AppDispatch = store.dispatch;

    dispatch(setLanguage(Languages.RU));

    const currentState: RootState = store.getState();
    expect(currentState.language).toEqual({
      lang: "ru",
      dictionary: ru,
    });
  });
});
