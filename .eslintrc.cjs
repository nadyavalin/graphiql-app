module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "eslint-config-prettier",
    "prettier",
    "next/core-web-vitals",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "react-compiler", "@typescript-eslint"],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "react/jsx-uses-vars": "error",
    "react-compiler/react-compiler": "error",
    "@typescript-eslint/no-explicit-any": "error",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
    project: ["tsconfig.json"],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
