import { render, screen } from "@testing-library/react";
import { formatDataEditor } from "@shared/utils/formatDataEditor";
import { describe, expect, it, vi } from "vitest";
import { ResponseBlock } from ".";

const mockDictionary = {
  titles: {
    response: "Response",
    status: "Status:",
  },
};

vi.mock("@shared/providers/DictionaryProvider", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useDictionary: () => mockDictionary,
  };
});

describe("ResponseBlock", () => {
  it("renders correctly with status and data", () => {
    const status = 200;
    const data = "Test response data";

    render(<ResponseBlock status={status} data={data} />);

    expect(screen.getByText(mockDictionary.titles.response)).toBeInTheDocument();
    expect(screen.getByText(`${mockDictionary.titles.status} ${status}`)).toBeInTheDocument();
    expect(screen.getByText(formatDataEditor(data))).toBeInTheDocument();
  });

  it("renders correctly without status", () => {
    const data = "Test response data";

    render(<ResponseBlock status={null} data={data} />);
    expect(screen.getByText(mockDictionary.titles.response)).toBeInTheDocument();
    expect(screen.getByText(mockDictionary.titles.status)).toBeInTheDocument();
    expect(screen.getByText(formatDataEditor(data))).toBeInTheDocument();
  });
});
