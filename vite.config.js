import { defineConfig } from "vite";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig({
  build: {
    target:
      process.env.TAURI_PLATFORM === "windows"
        ? "chrome105"
        : process.env.TAURI_PLATFORM === "android"
        ? "chrome90"
        : "safari13",
  },
  // for tauri android
  // server: {
  //   host: "0.0.0.0",
  //   port: 5173,
  // },
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
});
