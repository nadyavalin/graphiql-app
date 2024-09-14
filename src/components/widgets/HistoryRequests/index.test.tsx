import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore, Store, UnknownAction } from "@reduxjs/toolkit";
import { expect, test, beforeEach, vi, describe } from "vitest";
import { RootState } from "@shared/store";
import HistoryRequest from ".";

vi.mock("@features/HistoryBlock", () => ({
  HistoryBlock: vi.fn(() => <div>Mocked HistoryBlock</div>),
}));

vi.mock("@shared/providers/DictionaryProvider", () => ({
  useDictionary: () => ({
    titles: { history: "History" },
    history: { noRequests: "No requests found" },
    buttons: { restClient: "Rest Client", graphQL: "GraphQL" },
  }),
}));

const initialMockState: Partial<RootState> = {
  history: {
    listRequestsGraphQL: [],
    listRequestsRestClient: [],
  },
  language: {
    lang: "en",
  },
};

const mockStore = (overrideState: Partial<RootState> = {}) => {
  return configureStore({
    reducer: (state = initialMockState) => ({
      ...state,
      ...overrideState,
    }),
  });
};

describe("HistoryRequest Component", () => {
  let store: Store<unknown, UnknownAction, unknown>;

  beforeEach(() => {
    store = mockStore();
  });

  test("renders history title", () => {
    render(
      <Provider store={store}>
        <HistoryRequest />
      </Provider>,
    );
    expect(screen.getByText("History")).toBeInTheDocument();
  });

  test("displays no requests message when history is empty", () => {
    render(
      <Provider store={store}>
        <HistoryRequest />
      </Provider>,
    );
    expect(screen.getByText("No requests found")).toBeInTheDocument();
  });

  test("renders links to rest client and graphQL when requests are empty", () => {
    render(
      <Provider store={store}>
        <HistoryRequest />
      </Provider>,
    );
    expect(screen.getByText("Rest Client")).toBeInTheDocument();
    expect(screen.getByText("GraphQL")).toBeInTheDocument();
  });
});
