import React from "react";
import { render, screen } from "@testing-library/react";
import { Methods } from "@shared/store/model";
import { useDictionary } from "@shared/providers/DictionaryProvider";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MethodsBlock } from ".";

vi.mock("@shared/providers/DictionaryProvider");
vi.mock("@shared/store/model", () => ({
  Methods: {
    GET: "GET",
    PUT: "PUT",
    POST: "POST",
    DELETE: "DELETE",
  },
}));

describe("MethodsBlock", () => {
  const mockOnChange = vi.fn();
  const mockDictionary = {
    labels: {
      method: "Method",
    },
  };

  beforeEach(() => {
    (useDictionary as vi.Mock).mockReturnValue(mockDictionary);
  });

  it("renders the component and displays the label", () => {
    render(<MethodsBlock method={Methods.get} onChange={mockOnChange} />);

    expect(screen.getByText(/Method/i)).toBeInTheDocument();
  });
});
