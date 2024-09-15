import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { Languages } from "@shared/types";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import DictionaryProvider from "@shared/providers/DictionaryProvider";
import { ClientProvider } from "@shared/providers/ClientProvider";
import { LangSwitcher } from ".";
import dictionaryData from "@public/dictionaries/en.json";

const mockStore = configureStore([]);
const usePathnameMock = vi.fn();

describe("LangSwitcher Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      language: {
        lang: Languages.EN,
      },
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test("does not handle language change if the same language is clicked", () => {
    usePathnameMock.mockReturnValue("/en/some/path");

    const dispatch = vi.fn();
    store = mockStore({
      language: {
        lang: Languages.EN,
      },
      dispatch,
    });

    render(
      <Provider store={store}>
        <DictionaryProvider dictionary={dictionaryData}>
          <ClientProvider>
            <LangSwitcher />
          </ClientProvider>
        </DictionaryProvider>
      </Provider>,
    );

    fireEvent.click(screen.getByText(/EN/i));

    expect(dispatch).not.toHaveBeenCalled();
  });
});
