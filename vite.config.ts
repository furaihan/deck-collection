import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { excludePrivateDecks } from "./build/exclude-private-decks";
import { pdfManifest } from "./build/pdf-manifest";

export default defineConfig({
  plugins: [
    // Runs first so private decks are dropped before Vite compiles the glob.
    excludePrivateDecks(),
    // Publishes exports/*.pdf to the app and, on a build, copies the public ones.
    pdfManifest(),
    // The router plugin must run before React so generated routes exist for JSX.
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
