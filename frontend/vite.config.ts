import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: "/circling",
  build: {
    outDir: "../backend/src/main/resources/static",
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        // target: "https://circling.cmhvscode.dev/circling",
        target: "http://localhost:8080/circling",
        changeOrigin: true,
        secure: false,
      },
      "/ws": {
        // target: "wss://circling.cmhvscode.dev/circling",
        target: "ws://localhost:8080/circling",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
