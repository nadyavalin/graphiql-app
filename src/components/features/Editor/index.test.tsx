import { describe, it, expect } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Editor } from "."; // Импортируйте ваш компонент

describe("Editor Component", () => {
  it("Editor renders correctly", () => {
    const { container } = render(<Editor value="Initial Value" />);
    expect(container.querySelector("div")).toBeInTheDocument(); // Проверяем, что рендерится `div`, если он оборачивает CodeMirror
  });

  // it("Editor onChange updates value", async () => {
  //   const handleChange = vitest.fn();
  //   render(<Editor value="Initial Value" onChange={handleChange} isEditable={true} />);

  //   const editor = screen.getByRole("textbox");

  //   fireEvent.change(editor, { target: { textContent: "New Value" } });

  //   await waitFor(() => {
  //     expect(editor.textContent).toBe("New Value");
  //   });
  //   fireEvent.blur(editor);

  //   expect(handleChange).toHaveBeenCalledWith("New Value");
  // });

  it("Editor value is updated on prop change", () => {
    const { rerender } = render(<Editor value="Initial Value" onChange={() => {}} />);
    expect(screen.getByRole("textbox").textContent).toBe("Initial Value");
    rerender(<Editor value="Updated Value" onChange={() => {}} />);
    expect(screen.getByRole("textbox").textContent).toBe("Updated Value");
  });

  it("Editor editable property", () => {
    render(<Editor value="Some Value" isEditable={false} />);
    const editor = screen.getByRole("textbox");
    expect(editor).toHaveAttribute("contenteditable", "false");
  });
});
