import { defineConfig } from 'vite';

// Domaine personnalisé (www.laurexa.be) : `base` doit rester './'.
// Ne PAS remettre '/laurexa_editions/' — cela casse les assets sur le domaine.
// Dépôt : https://github.com/presti013/laurexa_editions

// ─── Content-Security-Policy ───
// GitHub Pages ne permet pas de poser d'en-têtes HTTP : la CSP passe par une balise <meta>, injectée
// uniquement au BUILD (en `npm run dev`, Vite injecte des <style> et un client HMR que cette CSP bloquerait).
// Politique « tout interdit sauf soi-même » : aucun script, style ou police externe, aucun style inline.
// `frame-ancestors` est ignoré en balise <meta> : l'anti-clickjacking reste impossible sur GitHub Pages.
//
// ⚠ Pour ajouter une ressource externe (police, script, image, formulaire vers un service de newsletter…),
// l'autoriser ICI, sinon le navigateur la bloque. Les liens <a> vers d'autres sites ne sont pas concernés.
const CSP = [
  "default-src 'none'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self'",
  "font-src 'self'",
  "connect-src 'self'",
  "base-uri 'none'",
  "form-action 'none'",
  'upgrade-insecure-requests',
].join('; ');

const cspMeta = () => ({
  name: 'laurexa-csp',
  apply: 'build',
  transformIndexHtml: () => [
    {
      tag: 'meta',
      attrs: { 'http-equiv': 'Content-Security-Policy', content: CSP },
      injectTo: 'head-prepend',
    },
  ],
});

export default defineConfig({
  base: './',
  plugins: [cspMeta()],
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
