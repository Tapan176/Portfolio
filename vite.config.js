import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' makes the build work from any URL path
// (GitHub Pages project site, Cloudflare Pages, Netlify, Docker/nginx, ...).
// The 3D scenes are lazy-loaded in App.jsx, so they already land in separate chunks.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1200,
  },
})
