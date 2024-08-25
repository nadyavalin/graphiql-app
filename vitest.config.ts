import { configDefaults, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/config/setupTests.ts",
    css: true,
    mockReset: true,
    clearMocks: true,
    coverage: {
      include: ["src/app/**/*.{ts,tsx}", "src/components/**/*.{ts,tsx}"],
    },
  },
});
