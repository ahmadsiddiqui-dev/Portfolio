import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Base path is `/Portfolio/` because the repo is served at
// ahmadsiddiqui-dev.github.io/Portfolio/ on GitHub Pages. Without this all
// asset URLs (main.js, fonts, favicon, images) 404 against the domain root.
export default defineConfig({
  plugins: [react()],
  base: '/Portfolio/',
  server: {
    port: 5173,
    open: true
  }
});
