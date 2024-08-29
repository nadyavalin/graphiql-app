import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@public": path.resolve(__dirname, "./public"),
      "@app": path.resolve(__dirname, "./src/components/app"),
      "@pages": path.resolve(__dirname, "./src/components/pages"),
      "@widgets": path.resolve(__dirname, "./src/components/widgets"),
      "@features": path.resolve(__dirname, "./src/components/features"),
      "@entities": path.resolve(__dirname, "./src/components/entities"),
      "@shared": path.resolve(__dirname, "./src/components/shared"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/config/setupTests.ts",
    css: true,
    mockReset: true,
    clearMocks: true,
    coverage: {
      include: ["src/app/**/*.{ts,tsx}", "src/components/**/*.{ts,tsx}"],
      exclude: ["src/components/shared/ui/index.ts"],
    },
  },
});
