import { describe, it, expect, vitest, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { HeadersVariablesBlock } from ".";
import { Item } from "@shared/store/model";

const mockOnChange = vitest.fn();

const initialItems: Item[] = [
  { key: "key1", value: "value1" },
  { key: "key2", value: "value2" },
];

describe("HeadersVariablesBlock", () => {
  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it("renders with initial items", () => {
    render(
      <HeadersVariablesBlock
        title="Test Title"
        itemType="Test Item"
        value={initialItems}
        onChange={mockOnChange}
      />,
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    initialItems.forEach((item) => {
      expect(screen.getByDisplayValue(item.key)).toBeInTheDocument();
      expect(screen.getByDisplayValue(item.value)).toBeInTheDocument();
    });
  });

  it("adds a new item when the Add button is clicked", async () => {
    render(
      <HeadersVariablesBlock
        title="Test Title"
        itemType="Test Item"
        value={initialItems}
        onChange={mockOnChange}
      />,
    );

    const addButton = screen.getByTestId("AddIcon");
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.queryAllByText("")[0]).toBeInTheDocument();
      expect(screen.queryAllByText("")[1]).toBeInTheDocument();
    });
  });

  it("updates item value when input changes", async () => {
    render(
      <HeadersVariablesBlock
        title="Test Title"
        itemType="Test Item"
        value={initialItems}
        onChange={mockOnChange}
      />,
    );

    const keyInput = screen.getByDisplayValue("key1");
    fireEvent.change(keyInput, { target: { value: "updatedKey" } });
    fireEvent.blur(keyInput);

    const valueInput = screen.getByDisplayValue("value1");
    fireEvent.change(valueInput, { target: { value: "updatedValue" } });
    fireEvent.blur(valueInput);

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith([
        { key: "updatedKey", value: "updatedValue" },
        { key: "key2", value: "value2" },
      ]);
    });
  });

  it("removes an item when the Remove button is clicked", async () => {
    render(
      <HeadersVariablesBlock
        title="Test Title"
        itemType="Test Item"
        value={initialItems}
        onChange={mockOnChange}
      />,
    );

    const removeButtons = screen.getAllByTestId("RemoveIcon");
    fireEvent.click(removeButtons[0]);

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith([{ key: "key2", value: "value2" }]);
    });
  });
});
