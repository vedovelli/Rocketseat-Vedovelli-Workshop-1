import js from "@eslint/js";
import tseslint from "typescript-eslint";
import boundaries from "eslint-plugin-boundaries";
import oxlint from "eslint-plugin-oxlint";
import { resolve } from "node:path";

const src = resolve(process.cwd(), "src");

export default [
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    plugins: { boundaries },
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: process.cwd(),
      },
      globals: {
        __DEVTOOLS__: "readonly",
      },
    },
    settings: {
      "boundaries/root-path": process.cwd(),
      "boundaries/elements": [
        { type: "core", pattern: "src/core/**", mode: "full" },
        { type: "ui", pattern: "src/ui/**", mode: "full" },
        { type: "pattern", pattern: "src/pattern/**", mode: "full" },
        { type: "layouts", pattern: "src/layouts/**", mode: "full" },
        { type: "features", pattern: "src/features/**", mode: "full" },
        { type: "routes", pattern: "src/routes/**", mode: "full" },
        { type: "mocks", pattern: "src/mocks/**", mode: "full" },
        { type: "root", pattern: "src/*.ts", mode: "full" },
        { type: "root", pattern: "src/*.tsx", mode: "full" },
      ],
      "boundaries/ignore": [
        "**/__specs__/**",
        "**/*.spec.ts",
        "**/*.spec.tsx",
        "**/routeTree.gen.ts",
      ],
    },
    rules: {
      "boundaries/element-types": [
        2,
        {
          default: "disallow",
          message:
            "${file.type} cannot import ${dependency.type}. Check architecture boundaries.",
          rules: [
            { from: ["core"], allow: ["core", "mocks"] },
            { from: ["ui"], allow: ["ui"] },
            {
              from: ["layouts"],
              allow: ["core", "ui", "layouts"],
            },
            {
              from: ["pattern"],
              allow: ["core", "ui", "pattern"],
            },
            {
              from: ["features"],
              allow: ["core", "ui", "pattern", "features"],
            },
            {
              from: ["routes"],
              allow: ["core", "ui", "pattern", "layouts", "features"],
            },
            { from: ["mocks"], allow: ["core", "mocks", "features"] },
            {
              from: ["root"],
              allow: ["core", "ui", "pattern", "layouts", "features", "routes", "mocks"],
            },
          ],
        },
      ],
    },
  },
  ...oxlint.configs["flat/recommended"],
];
