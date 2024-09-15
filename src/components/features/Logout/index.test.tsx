import { beforeEach, describe, expect, it, vi } from "vitest";
import React from "react";
import { signOut } from "firebase/auth";
import { render, screen, fireEvent } from "@testing-library/react";
import { Logout } from ".";
import DictionaryProvider, * as useDictionary from "@shared/providers/DictionaryProvider";
import dictionaryData from "@public/dictionaries/en.json";
import { ClientProvider } from "@shared/providers/ClientProvider";

vi.mock("firebase/auth", () => ({
  signOut: vi.fn(),
}));

vi.mock("firebase/app");
vi.mock("firebase/auth");

const useDictionaryMock = vi.fn().mockReturnValue(dictionaryData);
vi.spyOn(useDictionary, "useDictionary").mockImplementation(useDictionaryMock);

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

const mockDictionary = {
  logout: {
    success: "Logout successful!",
    failed: "Logout failed!",
  },
  buttons: {
    logout: "Logout",
  },
};

describe("Logout Component", async () => {
  beforeEach(() => {
    useDictionaryMock.mockReturnValue(mockDictionary);
    vi.clearAllMocks();
  });

  it("should successfully log out", async () => {
    render(
      <DictionaryProvider dictionary={dictionaryData}>
        <ClientProvider>
          <Logout />
        </ClientProvider>
      </DictionaryProvider>,
    );

    fireEvent.click(screen.getByTestId("LogoutIcon"));

    expect(signOut).toHaveBeenCalledTimes(1);
  });
});
