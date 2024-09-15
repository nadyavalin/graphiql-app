import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useDictionary } from "@shared/providers/DictionaryProvider";
import { updateBody } from "@shared/store/slices/restClientSlice";
import { Methods } from "@shared/store/model";
import { RestFullRequestSection } from ".";

vi.mock("@shared/providers/DictionaryProvider", () => ({
  useDictionary: vi.fn(),
}));

const mockStore = configureMockStore([]);

describe("RestfullRequestSection", () => {
  let store: ReturnType<typeof mockStore>;
  const mockOnPlay = vi.fn();
  const mockOnUrlChange = vi.fn();

  beforeEach(() => {
    store = mockStore({
      restClient: {
        endpoint: "",
        body: "",
        headers: [],
        variables: [],
        method: Methods.get,
      },
    });

    (useDictionary as ReturnType<typeof vi.fn>).mockReturnValue({
      labels: { endpoint: "Endpoint" },
      titles: {
        query: "Prettify",
        sendRequest: "Send Request",
        addHeader: "Add Header",
        header: "Header",
        addVariable: "Add Variable",
        variable: "Variable",
        body: "Body",
      },
    });
  });

  it("renders correctly", () => {
    render(
      <Provider store={store}>
        <RestFullRequestSection onPlay={mockOnPlay} onUrlChange={mockOnUrlChange} />
      </Provider>,
    );

    expect(screen.getByLabelText("Endpoint")).toBeInTheDocument();
    expect(screen.getByTitle("Prettify")).toBeInTheDocument();
    expect(screen.getByTitle("Send Request")).toBeInTheDocument();
    expect(screen.getByText("REST Client")).toBeInTheDocument();
  });

  it("calls onUrlChange when endpoint, method, or body changes", () => {
    render(
      <Provider store={store}>
        <RestFullRequestSection onPlay={mockOnPlay} onUrlChange={mockOnUrlChange} />
      </Provider>,
    );

    fireEvent.change(screen.getByLabelText("Endpoint"), { target: { value: "http://localhost" } });

    expect(mockOnUrlChange).toHaveBeenCalled();
  });

  it("prettifies body when Prettify button is clicked", () => {
    render(
      <Provider store={store}>
        <RestFullRequestSection onPlay={mockOnPlay} onUrlChange={mockOnUrlChange} />
      </Provider>,
    );

    fireEvent.click(screen.getByTitle("Prettify"));

    const actions = store.getActions();
    expect(actions).toContainEqual(updateBody(""));
  });

  it("calls onPlay when Send Request button is clicked", () => {
    render(
      <Provider store={store}>
        <RestFullRequestSection onPlay={mockOnPlay} onUrlChange={mockOnUrlChange} />
      </Provider>,
    );

    fireEvent.click(screen.getByTitle("Send Request"));

    expect(mockOnPlay).toHaveBeenCalledWith({
      endpoint: "",
      method: Methods.get,
      body: "",
      headers: [],
      variables: [],
    });
  });
});
