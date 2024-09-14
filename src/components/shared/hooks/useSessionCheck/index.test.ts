import { renderHook } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useSessionCheck from "./";
import * as tokenUtil from "@shared/utils/tokenDateCheck";

const mockDictionary = {
  logout: {
    tokenExpired: "Your session has expired. Please log in again.",
  },
  titles: {
    variable: "Some Variable Title",
  },
};

vi.mock("@shared/providers/DictionaryProvider", () => ({
  useDictionary: () => mockDictionary,
}));

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("firebase/auth", () => ({
  signOut: vi.fn().mockResolvedValue({}),
}));
vi.mock("firebase/app");
vi.mock("firebase/auth");
vi.mock("react-redux", () => {
  const mockDispatch = vi.fn();
  const mockUseSelector = (selector) => {
    const state = {
      user: { dateToken: "fake-token" },
      language: { lang: "en" },
    };
    return selector(state);
  };

  return {
    useDispatch: () => mockDispatch,
    useSelector: mockUseSelector,
  };
});

vi.mock("react-hot-toast", () => ({
  toast: { error: vi.fn() },
}));

vi.mock("@shared/utils/tokenDateCheck", () => ({
  isTokenValid: vi.fn(),
}));

describe("useSessionCheck", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should not call signOut if token is valid", async () => {
    (tokenUtil.isTokenValid as vi.Mock).mockReturnValue(true);

    renderHook(() => useSessionCheck());

    await Promise.resolve();

    expect(signOut).not.toHaveBeenCalled();
    expect(useDispatch()).not.toHaveBeenCalled();
  });
});
