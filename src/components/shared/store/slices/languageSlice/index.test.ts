import { describe, expect, it } from "vitest";
import languageReducer, { setLanguage } from "./";
import { loadDictionary } from "@shared/utils/loadDictionary";
import { Languages } from "@shared/types";

const initialState = {
  lang: "en",
  dictionary: loadDictionary("en"),
};

const unknownAction = { type: "unknown" };

describe("languageSlice", () => {
  it("should return the initial state", () => {
    expect(languageReducer(undefined, unknownAction)).toEqual(initialState);
  });

  it("should handle setLanguage - switching to 'ru'", () => {
    const previousState = { ...initialState };
    const nextState = languageReducer(previousState, setLanguage(Languages.RU));

    const expectedDictionary = loadDictionary("ru");
    const expectedState = {
      lang: "ru",
      dictionary: expectedDictionary,
    };

    expect(nextState).toEqual(expectedState);
  });

  it("should handle setLanguage - switching back to 'en'", () => {
    const previousState = {
      lang: "ru",
      dictionary: loadDictionary("ru"),
    };
    const nextState = languageReducer(previousState, setLanguage(Languages.EN));

    const expectedDictionary = loadDictionary("en");
    const expectedState = {
      lang: "en",
      dictionary: expectedDictionary,
    };

    expect(nextState).toEqual(expectedState);
  });
});
