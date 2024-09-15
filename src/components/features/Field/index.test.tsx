import { describe, it, expect, vitest } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Field } from ".";

const mockOnChange = vitest.fn();

describe("Field Component", () => {
  it("renders with initial value", () => {
    render(<Field label="Test Label" value="Initial Value" onChange={mockOnChange} />);
    expect(screen.getByLabelText(/test label/i)).toHaveValue("Initial Value");
  });

  it("calls onChange when value is changed", () => {
    render(<Field label="Test Label" value="Initial Value" onChange={mockOnChange} />);

    const input = screen.getByLabelText(/test label/i);
    fireEvent.change(input, { target: { value: "New Value" } });

    fireEvent.blur(input);

    expect(mockOnChange).toHaveBeenCalledWith("New Value");
  });

  it("does not include Cyrillic characters", () => {
    render(<Field label="Test Label" value="Текст с кириллицей" onChange={mockOnChange} />);

    const input = screen.getByLabelText(/test label/i);
    fireEvent.change(input, { target: { value: "Text without Cyrillic" } });

    expect(input).toHaveValue("Text without Cyrillic");
  });
});
