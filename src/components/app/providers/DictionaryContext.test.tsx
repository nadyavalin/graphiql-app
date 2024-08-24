import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DictionaryProvider, useDictionary } from "./DictionaryContext";

const MockComponent = () => {
  const { dictionary } = useDictionary();
  return (
    <div>
      <button>{dictionary.buttons.login}</button>
      <button>{dictionary.buttons.registration}</button>
      <button>{dictionary.buttons.logout}</button>
      <button>{dictionary.buttons.welcome}</button>
    </div>
  );
};

describe("DictionaryContext", () => {
  const mockDictionary = {
    buttons: {
      login: "Sing In",
      registration: "Sing Up",
      logout: "Sing Out",
      welcome: "Welcome page",
    },
  };

  it("should provide the dictionary values correctly", () => {
    render(
      <DictionaryProvider value={{ dictionary: mockDictionary }}>
        <MockComponent />
      </DictionaryProvider>,
    );
    expect(screen.getByRole("button", { name: /sing in/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sing up/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sing out/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /welcome page/i })).toBeInTheDocument();
  });
});
