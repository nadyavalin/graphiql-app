import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DictionaryProvider, useDictionary } from "./DictionaryContext";

const MockComponent = () => {
  const { dictionary } = useDictionary();
  return (
    <div>
      <p>{dictionary.buttons.welcome}</p>
      <button>{dictionary.buttons.login}</button>
      <button>{dictionary.buttons.registration}</button>
      <button>{dictionary.buttons.logout}</button>
    </div>
  );
};

describe("DictionaryContext", () => {
  const mockDictionary = {
    buttons: {
      login: "Войти",
      registration: "Регистрация",
      logout: "Выйти",
      welcome: "Добро пожаловать",
    },
  };

  it("should provide the dictionary values correctly", () => {
    render(
      <DictionaryProvider value={{ dictionary: mockDictionary }}>
        <MockComponent />
      </DictionaryProvider>,
    );

    expect(screen.getByText("Добро пожаловать")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /войти/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /регистрация/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /выйти/i })).toBeInTheDocument();
  });
});
