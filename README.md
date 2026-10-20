# Laurexa Editions — Site vitrine

Page d'accueil de la maison d'édition **Laurexa Editions**, thème cyberpunk conforme à la charte graphique (Deep Cyber Noir `#0B0F14`, Electric Cyan `#00E5FF`, Neon Magenta `#BA55D3`, Light Steel Slate `#B0C4DE`).

Stack : **Vite + SCSS + JavaScript vanilla**. Aucun framework.

## Démarrage

```bash
npm install
npm run dev        # serveur de développement → http://localhost:5173
npm run build      # build de production dans /dist
npm run preview    # prévisualiser le build
```

## Pousser sur le dépôt GitHub

Depuis le dossier du projet :

```bash
git init
git remote add origin https://github.com/presti013/laurexa_editions.git
git checkout -b feat/site-vitrine
git add .
git commit -m "feat: page vitrine Laurexa Editions (Vite + SCSS + monogramme LX animé)"
git push -u origin feat/site-vitrine
```

Puis ouvrez une **pull request** `feat/site-vitrine → main` sur GitHub.

## Déploiement GitHub Pages

Deux options :

**Option A — gh-pages (rapide)**

```bash
npm run deploy
```

Puis dans *Settings → Pages* du dépôt : source = branche `gh-pages`.
Le site sera servi sur `https://presti013.github.io/laurexa_editions/`.

**Option B — GitHub Actions (recommandé)** : *Settings → Pages → Source : GitHub Actions*, puis ajoutez le workflow officiel « Deploy static content » en pointant l'étape upload vers `./dist` et en ajoutant `npm ci && npm run build` avant.

> ⚠️ `vite.config.js` contient `base: './'` (domaine personnalisé www.laurexa.be). `public/CNAME` doit exister : `npm run deploy` vide la branche `gh-pages` avant de la remplir, et sans ce fichier GitHub perd le domaine à chaque publication.

## Catalogue — ajouter une couverture

Déposer la vignette dans `public/covers/` (600 × 836 px, `.webp` + repli `.jpg`), puis dans `index.html` remplacer le `<div class="card__cover">` de la fiche par un `<a class="card__cover" href="…">` contenant `<picture>`, et ajouter le bouton `<a class="btn btn--ghost card__cta" data-i18n="cat.buy">`. Les libellés visibles viennent de `src/js/i18n.js`, pas du HTML.

## Catalogue — choix de la boutique Amazon

Un lien d'achat ouvre un panneau « Choisissez votre boutique » au lieu de partir sur amazon.fr. Deux endroits à connaître :

1. **`index.html`** — sur le lien de couverture et le bouton de la fiche, ajouter la clé du livre (le `href` reste le repli sans JS) :

```html
<a class="btn btn--ghost card__cta" href="https://www.amazon.fr/dp/ASIN" target="_blank" rel="noopener noreferrer"
   data-i18n="cat.buy" data-store-picker="esclaves-du-temps">Commander sur Amazon</a>
```

2. **`src/js/editions.js`** — pour chaque clé, la liste des éditions : `format` (`print` ou `ebook`), `asin` et les `stores` où **cette édition** est vendue. Plusieurs éditions = bascule « Livre broché / Ebook Kindle » dans le panneau (la première s'ouvre d'abord) ; une seule = pastille de format.

- L'ASIN du **broché** est l'ISBN-10 (978-2-931222-07-2 → `2931222070`), valable dans toutes les boutiques. L'ASIN d'un **ebook** (`B0…`) n'existe que dans les boutiques Kindle : ne pas l'utiliser ailleurs (page introuvable).
- Quand un broché paraît (ex. *Slaves of Time*) : ajouter une ligne `print` dans `editions.js`, rien d'autre.
- `src/js/stores.js` : catalogue des boutiques (domaines, ordre d'affichage) ; noms de pays et libellés FR/EN dans `src/js/i18n.js` (clés `store.*`).
- Le panneau est un unique `<dialog>` en bas de `index.html`.

## Structure

```
├── index.html               # page unique, HTML sémantique, monogramme SVG inline
├── public/
│   ├── favicon.svg          # favicon vectoriel (source)
│   ├── favicon-32.png       # généré depuis le SVG
│   └── apple-touch-icon.png # 180×180
├── src/
│   ├── main.js              # animations, nav mobile, i18n, newsletter, sélecteur de boutique
│   ├── js/i18n.js           # dictionnaire FR/EN
│   ├── js/stores.js         # catalogue des boutiques Amazon (domaines) + construction des URL
│   ├── js/editions.js       # éditions par livre : format, ASIN, boutiques où elle est vendue
│   └── styles/
│       ├── _tokens.scss     # ← palette, typo, TIMINGS d'animation
│       └── main.scss        # tous les composants
```

## Ajuster couleurs et timings

Tout est centralisé dans `src/styles/_tokens.scss` :

| Variable | Rôle | Défaut |
|---|---|---|
| `--color-cyan` / `--color-magenta` | accents néon | `#00E5FF` / `#BA55D3` |
| `--trace-duration` | durée d'illumination d'une trace du monogramme | `650ms` |
| `--trace-stagger` | délai entre chaque trace | `140ms` |
| `--letter-delay` | apparition des lettres LX | `900ms` |

L'intensité du glitch au survol se règle dans `src/main.js` (fonction `setupGlitch`, valeurs `f` et `scale`).

## Choix d'implémentation

- **Monogramme animé** : `stroke-dasharray/dashoffset` calculés en JS (`getTotalLength()`), transitions CSS décalées — performant (compositeur), pas de layout thrashing, un seul double `requestAnimationFrame` pour garantir le premier paint.
- **Glitch au survol** : filtre SVG `feTurbulence + feDisplacementMap`, fréquence/échelle animées par `requestAnimationFrame` uniquement pendant le survol ; coupe automatiquement à la sortie du pointeur (zéro coût au repos). Se déclenche aussi au focus clavier.
- **Glassmorphism nav** : `backdrop-filter: blur(10px)` sur fond `#0B0F14` à 85 %, avec fallback dégradé semi-transparent via `@supports` pour les navigateurs sans support ; `safe-area-inset` pour les encoches mobiles.
- **Accessibilité** : `prefers-reduced-motion` respecté (monogramme affiché statique, transitions coupées), skip-link, landmarks sémantiques (`header/nav/main/footer`), `aria-expanded` sur le menu mobile, `role="status"` sur le message newsletter, `title/desc` sur les SVG, focus visible partout. Contrastes : `#B0C4DE` sur `#0B0F14` ≈ 10.9:1, `#00E5FF` sur `#0B0F14` ≈ 12.5:1 (AA/AAA).
- **i18n FR/EN** : dictionnaire simple + attributs `data-i18n`, choix mémorisé en `localStorage`, `lang` mis à jour sur `<html>`.
- **Newsletter** : validation front uniquement — brancher un service (Buttondown, Mailchimp, Brevo…) sur le `submit` quand vous serez prêt. ⚠ La CSP (voir ci-dessous) interdit tout envoi vers un autre site : il faudra y autoriser le service (`connect-src` et/ou `form-action`).

## Sécurité — polices locales et CSP

GitHub Pages ne permet pas de configurer d'en-têtes HTTP. Le site applique donc ce qui est possible côté code :

- **Polices auto-hébergées** (`src/styles/_fonts.scss`, paquets `@fontsource/*`, licence OFL-1.1) : plus aucune requête vers Google Fonts, donc aucune IP de visiteur transmise à un tiers. Sous-ensemble latin seul, 8 fichiers `.woff2` (≈ 155 Ko). Ajouter une graisse = ajouter une ligne `@include face(...)`.
- **Content-Security-Policy en balise `<meta>`** (`vite.config.js`, constante `CSP`), injectée **au build uniquement** (en `npm run dev` elle bloquerait les styles et le HMR de Vite). Politique : `default-src 'none'`, puis `script-src`, `style-src`, `img-src`, `font-src` et `connect-src` limités à `'self'` ; `base-uri 'none'`, `form-action 'none'`, `upgrade-insecure-requests`.
- **Conséquence** : toute ressource externe (police, script, image, service de newsletter, statistiques…) est bloquée tant qu'elle n'est pas autorisée dans `CSP`. Pas de `style="…"` ni de `<script>` inline dans `index.html`. Les liens `<a>` vers d'autres sites ne sont pas concernés.
- **Limites** : `frame-ancestors` (anti-clickjacking) et HSTS sont ignorés ou impossibles en balise `<meta>` ; ils exigent de vrais en-têtes (par exemple un proxy comme Cloudflare devant GitHub Pages).
- **Vérifier après un changement** : `npm run build && npm run preview`, ouvrir la console du navigateur et chercher « Refused to … because it violates the following Content Security Policy directive ».

## Contact

contact@laurexa.be
