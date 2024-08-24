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
    exclude: [...configDefaults.exclude, "node_modules", "dist", ".idea", ".git", ".cache"],
    coverage: {
      exclude: [
        "src/components/widgets/**",
        "src/components/shared/**",
        "src/**/*.test.ts",
        "src/**/*.test.tsx",
        "src/tests/*.test.ts",
        "src/tests/*.test.mjs",
        "src/config/setupTests.ts",
      ],
    },
  },
});
