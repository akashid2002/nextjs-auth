import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Base Next.js + TypeScript config
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Professional rule overrides
  {
    rules: {
      // --- TypeScript ---
      "@typescript-eslint/no-explicit-any": "warn", // Use 'warn' instead of 'off' for visibility
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-inferrable-types": "warn",

      // --- Code Quality ---
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "warn",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],

      // --- React ---
      "react/react-in-jsx-scope": "off", // Not needed in Next.js
      "react/prop-types": "off", // You're using TypeScript
      "react/jsx-uses-react": "off",

      // --- Best Practices ---
      "eqeqeq": ["error", "always"],
      "curly": ["error", "all"],
      "no-duplicate-imports": "error",
      "prefer-const": "error",
      "object-shorthand": ["error", "always"],
      "arrow-body-style": ["error", "as-needed"],
    },
  },
];

export default eslintConfig;
