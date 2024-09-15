import { loadDictionary } from ".";
import en from "@public/dictionaries/en.json";
import ru from "@public/dictionaries/ru.json";
import { describe, expect, it } from "vitest";

describe("loadDictionary", () => {
  it('should return English dictionary for "en"', () => {
    const result = loadDictionary("en");
    expect(result).toEqual(en);
  });

  it('should return Russian dictionary for "ru"', () => {
    const result = loadDictionary("ru");
    expect(result).toEqual(ru);
  });

  it("should return English dictionary by default", () => {
    const result = loadDictionary("other_language");
    expect(result).toEqual(en);
  });

  it("should return English dictionary if no argument is provided", () => {
    const result = loadDictionary("en");
    expect(result).toEqual(en);
  });
});
