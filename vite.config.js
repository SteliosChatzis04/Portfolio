import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Enables JSX transform, Fast Refresh (hot reload), and React-specific optimisations.
  plugins: [react()],

  // Sets the root URL that all asset paths are relative to.
  // In production the site lives at username.github.io/Portfolio/, so assets
  // must be prefixed with /Portfolio/ or links will 404 on GitHub Pages.
  // In dev the root is /, so local navigation works without a sub-path.
  base: process.env.NODE_ENV === "production" ? "/Portfolio/" : "/",
});
