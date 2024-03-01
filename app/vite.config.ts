import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsConfigPaths()],
  server: {
    host: true,
    port: 3000,
    watch: {
      usePolling: true,
    },
  },
});
