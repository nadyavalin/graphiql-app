import { renderHook, cleanup } from "@testing-library/react";
import { onAuthStateChanged } from "firebase/auth";
import useFirebaseAuth from ".";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("firebase/auth", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    onAuthStateChanged: vi.fn(),
    getAuth: vi.fn(),
  };
});

describe("useFirebaseAuth", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("should return null user when auth state is not set", () => {
    (onAuthStateChanged as unknown as vi.Mock).mockImplementation(
      (_, callback: (user: unknown) => void) => {
        callback(null);
        return vi.fn();
      },
    );

    const { result } = renderHook(() => useFirebaseAuth());

    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("should return a user when auth state is set", () => {
    const mockUser = { uid: "123", email: "test@example.com" };

    (onAuthStateChanged as unknown as vi.Mock).mockImplementation(
      (_, callback: (user: unknown) => void) => {
        callback(mockUser);
        return vi.fn();
      },
    );

    const { result } = renderHook(() => useFirebaseAuth());

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.loading).toBe(false);
  });

  it("should call unsubscribe on unmount", () => {
    const unsubscribeMock = vi.fn();

    (onAuthStateChanged as unknown as vi.Mock).mockImplementation(
      (_, callback: (user: unknown) => void) => {
        callback(null);
        return unsubscribeMock;
      },
    );

    const { unmount } = renderHook(() => useFirebaseAuth());
    unmount();

    expect(unsubscribeMock).toHaveBeenCalled();
  });
});
