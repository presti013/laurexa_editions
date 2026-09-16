import { defineConfig } from 'vite';

// Domaine personnalisé (www.laurexa.be) : `base` doit rester './'.
// Ne PAS remettre '/laurexa_editions/' — cela casse les assets sur le domaine.
// Dépôt : https://github.com/presti013/laurexa_editions
export default defineConfig({
  base: './',
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
