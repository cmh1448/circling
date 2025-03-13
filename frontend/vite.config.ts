import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: "/circling",
  build: {
    outDir: "../backend/src/main/resources/static",
  },
  server: {
    proxy: {
      "/api": {
        target: "https://circling.myunghyun.me/circling",
        // target: "http://localhost:8080/circling",
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
