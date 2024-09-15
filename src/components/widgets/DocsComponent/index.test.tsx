import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DocsComponent } from ".";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useDictionary } from "@shared/providers/DictionaryProvider";
import { serverGraphiqlShemaResponse } from "@shared/actions/graphqlShemaAction";
import { updateIsSdlExists } from "@shared/store/slices/graphiqlSlice";

vi.mock("@shared/providers/DictionaryProvider", () => ({
  useDictionary: vi.fn(),
}));

vi.mock("@shared/actions/graphqlShemaAction", () => ({
  serverGraphiqlShemaResponse: vi.fn(),
}));

const mockStore = configureMockStore([]);

describe("DocsComponent", () => {
  let store: ReturnType<typeof mockStore>;
  const mockDictionary = {
    docs: { docs: "Documentation" },
  };

  beforeEach(() => {
    store = mockStore({
      graphiql: {
        isSdlExists: true,
        sdlUrl: "http://localhost/sdl",
        endpoint: "http://localhost/graphql",
      },
    });

    (useDictionary as ReturnType<typeof vi.fn>).mockReturnValue(mockDictionary);
    (serverGraphiqlShemaResponse as ReturnType<typeof vi.fn>).mockResolvedValue(true);
  });

  it("renders and toggles documentation visibility", async () => {
    render(
      <Provider store={store}>
        <DocsComponent />
      </Provider>,
    );

    expect(screen.getByAltText("Docs Icon")).toBeInTheDocument();

    fireEvent.click(screen.getByAltText("Docs Icon"));

    expect(screen.getByText(mockDictionary.docs.docs)).toBeInTheDocument();

    fireEvent.click(screen.getByAltText("Docs Icon"));

    await waitFor(() => {
      expect(screen.queryByText(mockDictionary.docs.docs)).toBeNull();
    });
  });

  it("sets the correct URL when SDL schema exists", async () => {
    render(
      <Provider store={store}>
        <DocsComponent />
      </Provider>,
    );

    expect(serverGraphiqlShemaResponse).toHaveBeenCalledWith("http://localhost/sdl");

    const actions = store.getActions();
    await waitFor(() => {
      expect(actions).toContainEqual(updateIsSdlExists(true));
    });
  });
});
