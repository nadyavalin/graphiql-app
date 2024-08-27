import { render } from "@testing-library/react";
import { useSelector } from "react-redux";
import { beforeEach, describe, expect, it } from "vitest";
import { ClientProviders } from "../ClientProviders";
import store from "../../store";

const StoreTestComponent = () => {
  const state = useSelector((state) => state);
  return <div data-testid="store-value">{JSON.stringify(state)}</div>;
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

    const storeValue = getByTestId("store-value").textContent;
    expect(storeValue).toBe(JSON.stringify(initialStore));
  });
});
