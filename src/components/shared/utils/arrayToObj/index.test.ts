import { describe, it, expect } from "vitest";
import { Item } from "@shared/store/model";
import arrayToObj from ".";

describe("arrayToObj", () => {
  it("should convert an array of items into an object with key-value pairs", () => {
    const items: Item[] = [
      { key: "name", value: "Ivan" },
      { key: "day", value: "monday" },
      { key: "greeting", value: "hay" },
    ];

    const expectedResult = {
      name: "Ivan",
      day: "monday",
      greeting: "hay",
    };

    const result = arrayToObj(items);
    expect(result).toEqual(expectedResult);
  });

  it("should return an empty object when given an empty array", () => {
    const items: Item[] = [];
    const expectedResult = {};

    const result = arrayToObj(items);
    expect(result).toEqual(expectedResult);
  });

  it("should handle items with duplicate keys, keeping the last one", () => {
    const items: Item[] = [
      { key: "name", value: "Ivan" },
      { key: "name", value: "Anna" },
    ];

    const expectedResult = {
      name: "Anna",
    };

    const result = arrayToObj(items);
    expect(result).toEqual(expectedResult);
  });
});
