import { render } from "@testing-library/react";
import { useSelector } from "react-redux";
import { beforeEach, describe, expect, it } from "vitest";
import { ClientProvider } from "@shared/providers/ClientProvider";
import store, { RootState } from "@shared/store";

const StoreTestComponent = () => {
  const languageState = useSelector((state: RootState) => state.language);
  return <div data-testid="store-value">{JSON.stringify(languageState)}</div>;
};

describe("ClientProviders", () => {
  let initialStore: ReturnType<typeof store.getState>;

  beforeEach(() => {
    initialStore = store.getState();
  });

  it("should render children components", () => {
    const { getByTestId } = render(
      <ClientProvider>
        <div data-testid="child">Test Child</div>
      </ClientProvider>,
    );

    expect(getByTestId("child")).toBeInTheDocument();
    expect(getByTestId("child").textContent).toBe("Test Child");
  });

  it("should wrap children with the Redux Provider", () => {
    const { container } = render(
      <ClientProvider>
        <div data-testid="child">Test Child</div>
      </ClientProvider>,
    );

    expect(container.querySelector('div[data-testid="child"]')).not.toBeNull();
  });

  it("should use the correct store", () => {
    const { getByTestId } = render(
      <ClientProvider>
        <StoreTestComponent />
      </ClientProvider>,
    );

    const storeValue = JSON.parse(getByTestId("store-value").textContent || "");
    expect(storeValue).toEqual(initialStore.language);
  });
});
