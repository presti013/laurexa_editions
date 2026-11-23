import { defineConfig } from 'vite';
import { readFileSync, writeFileSync } from 'node:fs';

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
  // GoatCounter (mesure d'audience sans cookie) : script gc.zgo.at, envoi vers presti013.goatcounter.com
  "script-src 'self' https://gc.zgo.at",
  "style-src 'self'",
  "img-src 'self' https://presti013.goatcounter.com",
  "font-src 'self'",
  "connect-src 'self' https://presti013.goatcounter.com",
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

// 404.html est servie par GitHub Pages à n'importe quelle profondeur d'URL (/a/b/c) :
// ses chemins doivent être absolus, alors que `base: './'` les rend relatifs.
const absolute404 = () => ({
  name: 'laurexa-404-absolute',
  apply: 'build',
  closeBundle() {
    const file = 'dist/404.html';
    try { writeFileSync(file, readFileSync(file, 'utf8').replaceAll('"./', '"/')); } catch { /* pas de 404 */ }
  },
});

export default defineConfig({
  base: './',
  plugins: [cspMeta(), absolute404()],
  css: {
    preprocessorOptions: {
      scss: { api: 'modern-compiler' }
    }
  },
  build: {
    outDir: 'dist',
    // Plusieurs pages : accueil, mentions légales, page 404 (GitHub Pages sert 404.html pour toute URL inconnue)
    rollupOptions: {
      input: {
        main: 'index.html',
        legal: 'mentions-legales.html',
        notfound: '404.html',
      },
    },
    assetsInlineLimit: 4096,
    cssCodeSplit: false
  }
});
