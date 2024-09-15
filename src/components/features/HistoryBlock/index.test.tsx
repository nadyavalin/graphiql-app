import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { describe, expect, test } from "vitest";
import { HistoryBlock } from ".";
import { formatDate } from "@shared/utils/formatDate";

const mockStore = configureStore([]);
const store = mockStore({
  language: {
    lang: "en",
  },
});

const mockRequests = [
  {
    date: "01:01:2023",
    url: "https://example.com/page1",
    encodeUrl: "https://encoded.com/page1",
  },
  {
    date: "02:01:2023",
    url: "https://example.com/page2",
    encodeUrl: "https://encoded.com/page2",
  },
];

describe("HistoryBlock Component", () => {
  test("renders title and list of requests", () => {
    render(
      <Provider store={store}>
        <HistoryBlock listRequests={mockRequests} title="History" />
      </Provider>,
    );

    expect(screen.getByText("History")).toBeInTheDocument();

    mockRequests.forEach((request) => {
      expect(screen.getByText(formatDate(request.date))).toBeInTheDocument();
      expect(screen.getByText(request.url)).toBeInTheDocument();
    });
  });

  test("displays the correct date format", () => {
    render(
      <Provider store={store}>
        <HistoryBlock listRequests={mockRequests} title="History" />
      </Provider>,
    );

    expect(screen.getByText(formatDate("01:01:2023"))).toBeInTheDocument();
    expect(screen.getByText(formatDate("02:01:2023"))).toBeInTheDocument();
  });
});
