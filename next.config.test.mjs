import nextConfig from "./next.config";

describe("Next.js Configuration", () => {
  it("should have reactStrictMode set to true", () => {
    expect(nextConfig.reactStrictMode).toBe(true);
  });
});
