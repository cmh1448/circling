import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: "/circling",
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8080/circling",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
