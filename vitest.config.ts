import { configDefaults, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    exclude: [...configDefaults.exclude],
    coverage: {
      exclude: ["./src/components/widgets/**", "./src/components/shared/**"],
    },
  },
});
