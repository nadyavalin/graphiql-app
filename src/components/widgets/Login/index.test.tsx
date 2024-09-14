import { describe, expect, it, vi } from "vitest";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@config/firebaseConfig";

vi.mock("firebase/auth", () => {
  return {
    signInWithEmailAndPassword: vi.fn(),
  };
});
vi.mock("firebase/app");
vi.mock("firebase/auth");
describe("Firebase Authentication", () => {
  it("should call signInWithEmailAndPassword with the correct parameters", async () => {
    const email = "example@gmail.com";
    const password = "123";

    await signInWithEmailAndPassword(auth, email, password);

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password);
  });
});
