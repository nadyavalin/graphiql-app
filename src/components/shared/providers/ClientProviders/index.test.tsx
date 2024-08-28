import { render } from "@testing-library/react";
import { useSelector } from "react-redux";
import { beforeEach, describe, expect, it } from "vitest";
import { ClientProviders } from "@shared/providers/ClientProviders";
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
      <ClientProviders>
        <div data-testid="child">Test Child</div>
      </ClientProviders>,
    );

    expect(getByTestId("child")).toBeInTheDocument();
    expect(getByTestId("child").textContent).toBe("Test Child");
  });

  it("should wrap children with the Redux Provider", () => {
    const { container } = render(
      <ClientProviders>
        <div data-testid="child">Test Child</div>
      </ClientProviders>,
    );

    expect(container.querySelector('div[data-testid="child"]')).not.toBeNull();
  });

  it("should use the correct store", () => {
    const { getByTestId } = render(
      <ClientProviders>
        <StoreTestComponent />
      </ClientProviders>,
    );

    const storeValue = JSON.parse(getByTestId("store-value").textContent || "");
    expect(storeValue).toEqual(initialStore.language);
  });
});
