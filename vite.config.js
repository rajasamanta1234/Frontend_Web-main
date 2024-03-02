import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

import * as path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    host: "localhost",
  },

  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "src"),
      // "./runtimeConfig": "./runtimeConfig.browser",
    },
  },
  build: {
    // sourcemap: true,
    commonjsOptions: {
      // include: [/node_modules/],
      extensions: [".js", ".cjs"],
      strictRequires: true,
      // https://stackoverflow.com/questions/62770883/how-to-include-both-import-and-require-statements-in-the-bundle-using-rollup
      // transformMixedEsModules: true,
    },
  },
});
