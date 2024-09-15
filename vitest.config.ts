import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@config": path.resolve(__dirname, "./config"),
      "@public": path.resolve(__dirname, "./public"),
      "@app": path.resolve(__dirname, "./src/app"),
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
      include: ["src/components/**/*.{ts,tsx}"],
      exclude: [
        "src/components/shared/ui/index.ts",
        "src/**/*.{spec,test}.{ts,tsx}",
        "src/components/shared/utils/formatDataEditor/js-beautify.d.ts",
        "src/components/shared/protected/index.tsx",
        "src/components/shared/hooks/useAppDispatch/index.ts",
        "src/components/shared/hooks/useAppSelector/index.ts",
        "src/components/shared/hooks/useSessionCheck/index.ts",
        "src/components/shared/ui/Header/index.tsx",
        "src/components/shared/ui/Header/view/Menu/index.tsx",
        "src/components/shared/ui/Header/view/UserMenu/index.tsx",
        "src/components/shared/ui/Header/view/LangSwitcher/index.tsx",
        "src/components/widgets/WelcomePage/index.tsx",
      ],
    },
  },
});
