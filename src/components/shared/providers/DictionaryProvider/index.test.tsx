import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DictionaryProvider, { useDictionary } from ".";
import dictionaryData from "@public/dictionaries/en.json";

describe("DictionaryProvider", () => {
  it("provides the dictionary through context", () => {
    const TestComponent = () => {
      const dictionary = useDictionary();
      return <div>{dictionary.buttons.login}</div>;
    };

    render(
      <DictionaryProvider dictionary={dictionaryData}>
        <TestComponent />
      </DictionaryProvider>,
    );

    expect(screen.getByText("Sing In")).toBeInTheDocument();
  });
});
