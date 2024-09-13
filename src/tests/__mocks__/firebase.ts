import { vi } from "vitest";

export const getAuth = vi.fn();
export const initializeApp = vi.fn();
export const signInWithEmailAndPassword = vi.fn(() => {
  return Promise.resolve({ user: { email: "test@example.com" } });
});
