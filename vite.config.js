import { defineConfig } from "vite";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig({
  // prevent vite from obscuring rust errors
  clearScreen: false,
  // Tauri expects a fixed port, fail if that port is not available
  server: {
    strictPort: true,
    host: "0.0.0.0",
    port: 5173,
  },
  // to access the Tauri environment variables set by the CLI with information about the current target
  envPrefix: [
    "VITE_",
    "TAURI_PLATFORM",
    "TAURI_ARCH",
    "TAURI_FAMILY",
    "TAURI_PLATFORM_VERSION",
    "TAURI_PLATFORM_TYPE",
    "TAURI_DEBUG",
  ],

  build: {
    target:
      process.env.TAURI_PLATFORM === "windows"
        ? "chrome105"
        : process.env.TAURI_PLATFORM === "android"
        ? "chrome90"
        : "safari13",
  },

  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
});
