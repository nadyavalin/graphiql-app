import { describe, it, expect, beforeEach, vi, test } from "vitest";
import * as loadDictionaryUtils from "../../../utils/loadDictionary";
import languageSlice, { setLanguage } from ".";

import en from "../../../../../../public/dictionaries/en.json";
import ru from "../../../../../../public/dictionaries/ru.json";
import { loadDictionary } from "../../../utils/loadDictionary";
import store from "@shared/store";

const initialState = {
  lang: "en",
  dictionary: en,
};

beforeEach(() => {
  loadDictionaryMock.mockImplementation((lang: string) => {
    switch (lang) {
      case "ru":
        return Promise.resolve(ru);
      case "en":
      default:
        return Promise.resolve(en);
    }
  });
});

const loadDictionaryMock = vi.fn();
vi.spyOn(loadDictionaryUtils, "loadDictionary").mockImplementation(loadDictionaryMock);

describe("languageSlice", () => {
  const initialState = {
    lang: "en",
    dictionary: { hello: "Hello" },
  };

  beforeEach(() => {
    loadDictionaryMock.mockImplementation((lang: string) => {
      switch (lang) {
        case "ru":
          return { hello: "Привет" };
        case "en":
        default:
          return { hello: "Hello" };
      }
    });
  });

  it("must return to initial state", () => {
    expect(languageSlice(undefined, { type: undefined })).toEqual(initialState);
  });

  it("should process setLanguage and change the language to ru", () => {
    const nextState = languageSlice(initialState, setLanguage("ru"));

    expect(nextState.lang).toBe("ru");
    expect(nextState.dictionary).toEqual({ hello: "Привет" });
  });

  it("should process setLanguage and change the language back to en", () => {
    const nextState = languageSlice(
      {
        lang: "ru",
        dictionary: { hello: "Привет" },
      },
      setLanguage("en"),
    );

    expect(nextState.lang).toBe("en");
    expect(nextState.dictionary).toEqual({ hello: "Hello" });
  });

  test("should set state to Russian dictionary when loading Russian language", async () => {
    await store.dispatch(loadDictionary("ru"));

    const state = store.getState().i18n;
    expect(state.lang).toBe("ru");
    expect(state.dictionary).toEqual(ru);
  });

  test("should set state to English dictionary when loading English language", async () => {
    await store.dispatch(loadDictionary("en"));

    const state = store.getState().i18n;
    expect(state.lang).toBe("en");
    expect(state.dictionary).toEqual(en);
  });
});
