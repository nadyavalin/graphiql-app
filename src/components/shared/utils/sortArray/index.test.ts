import { describe, it, expect } from "vitest";

import { HistoryRequest } from "@shared/store/slices/historySlice";
import { sortArrayDate } from ".";

describe("sortArrayDate", () => {
  it("should sort an array of HistoryRequest objects by date in descending order", () => {
    const inputArray: HistoryRequest[] = [
      {
        date: "2023-10-06T14:00:00Z",
        url: "",
        encodeUrl: "",
      },
      {
        date: "2022-01-01T09:00:00Z",
        url: "",
        encodeUrl: "",
      },
      {
        date: "2023-09-15T10:30:00Z",
        url: "",
        encodeUrl: "",
      },
      {
        date: "2024-05-21T08:45:00Z",
        url: "",
        encodeUrl: "",
      },
    ];

    const expectedOutput: HistoryRequest[] = [
      {
        date: "2024-05-21T08:45:00Z",
        url: "",
        encodeUrl: "",
      },
      {
        date: "2023-10-06T14:00:00Z",
        url: "",
        encodeUrl: "",
      },
      {
        date: "2023-09-15T10:30:00Z",
        url: "",
        encodeUrl: "",
      },
      {
        date: "2022-01-01T09:00:00Z",
        url: "",
        encodeUrl: "",
      },
    ];

    const sortedArray = sortArrayDate(inputArray);

    expect(sortedArray).toEqual(expectedOutput);
  });

  it("should return an empty array if input is an empty array", () => {
    const inputArray: HistoryRequest[] = [];
    const sortedArray = sortArrayDate(inputArray);
    expect(sortedArray).toEqual([]);
  });

  it("should handle an array with a single item", () => {
    const inputArray: HistoryRequest[] = [
      {
        date: "2023-09-01T12:00:00Z",
        url: "",
        encodeUrl: "",
      },
    ];
    const sortedArray = sortArrayDate(inputArray);
    expect(sortedArray).toEqual(inputArray);
  });
});
