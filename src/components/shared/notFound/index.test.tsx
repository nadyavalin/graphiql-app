import { render, screen } from "@testing-library/react";
import { NotFoundComponent } from ".";
import { describe, expect, it } from "vitest";

describe("NotFoundComponent", () => {
  it("renders the 404 message and image", () => {
    render(<NotFoundComponent />);

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Somethings missing.")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Sorry, we cant find that page. You will find lots to explore on the Home Page.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Back to Home Page/i })).toBeInTheDocument();
    expect(screen.getByText("Чего-то не хватает.")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Извините, мы не можем найти эту страницу. Вы найдете много интересного на главной странице.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Вернуться на главную страницу/i }),
    ).toBeInTheDocument();

    expect(screen.getByAltText("404")).toBeInTheDocument();
  });
});
