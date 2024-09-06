import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import dts from "vite-plugin-dts";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), libInjectCss(), dts({ rollupTypes: true })],
  build: {
    lib: {
      entry: resolve(__dirname, "src/lib/index.ts"),
      name: "LMDialog",
      formats: ["es"],
      fileName: "lm-vue3-dialog",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
