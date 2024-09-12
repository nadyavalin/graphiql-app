import React from "react";
import { render, screen } from "@testing-library/react";
import { Loader } from ".";
import styles from "./styles.module.css";
import { describe, expect, it } from "vitest";

describe("Loader Component", () => {
  it("renders loader component correctly", () => {
    render(<Loader />);
    const loaderElement = screen.getByTestId("loader");
    expect(loaderElement).toBeInTheDocument();
    expect(loaderElement).toHaveClass(styles.loader);
  });
});
