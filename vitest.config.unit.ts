import { defineConfig } from "vitest/config";
import path from "node:path";

const src = path.resolve(process.cwd(), "src");

export default defineConfig({
  resolve: {
    alias: {
      "@": src,
      "@core": path.join(src, "core"),
      "@ui": path.join(src, "ui"),
      "@pattern": path.join(src, "pattern"),
      "@features": path.join(src, "features"),
      "@layouts": path.join(src, "layouts"),
      "@routes": path.join(src, "routes"),
      "@mocks": path.join(src, "mocks"),
    },
  },
  test: {
    environment: "node",
    include: ["src/core/__specs__/**/*.spec.ts"],
    exclude: ["**/node_modules/**", "**/dist/**"],
    globals: true,
  },
});
