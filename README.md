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

> ⚠️ `vite.config.js` contient `base: '/laurexa_editions/'`. Si le nom du dépôt change, mettez cette valeur à jour, sinon les assets ne chargeront pas sur Pages.

## Structure

```
├── index.html               # page unique, HTML sémantique, monogramme SVG inline
├── public/
│   ├── favicon.svg          # favicon vectoriel (source)
│   ├── favicon-32.png       # généré depuis le SVG
│   └── apple-touch-icon.png # 180×180
├── src/
│   ├── main.js              # animations, nav mobile, i18n, newsletter
│   ├── js/i18n.js           # dictionnaire FR/EN
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
- **Newsletter** : validation front uniquement — brancher un service (Buttondown, Mailchimp, Brevo…) sur le `submit` quand vous serez prêt.

## Contact

contact@laurexa.be
