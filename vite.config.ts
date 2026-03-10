import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

const src = path.resolve(process.cwd(), "src");

export default defineConfig({
  plugins: [
    TanStackRouterVite({
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routeTree.gen.ts",
      routeFileIgnorePrefix: "-",
    }),
    react(),
    tailwindcss(),
  ],
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
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["@tanstack/react-router"],
          query: ["@tanstack/react-query"],
        },
      },
    },
  },
  define: {
    __DEVTOOLS__: JSON.stringify(process.env.NODE_ENV === "development"),
  },
});
