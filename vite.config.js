import { defineConfig } from 'vite';

// `base` doit correspondre au nom du dépôt GitHub pour GitHub Pages.
// Dépôt : https://github.com/presti013/laurexa_editions
export default defineConfig({
  base: '/laurexa_editions/',
  css: {
    preprocessorOptions: {
      scss: { api: 'modern-compiler' }
    }
  },
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096,
    cssCodeSplit: false
  }
});
