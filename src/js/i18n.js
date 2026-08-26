// ─── i18n FR / EN ───
// Ajouter une clé ici + attribut data-i18n dans le HTML pour tout nouveau texte.

export const translations = {
  fr: {
    skip: 'Aller au contenu',
    'nav.catalogue': 'Catalogue',
    'nav.about': 'La maison',
    'nav.contact': 'Contact',
    'hero.eyebrow': "// maison d'édition indépendante — Liège",
    'hero.title': "Des livres pour<br />l'ère numérique",
    'hero.lead':
      "Laurexa Editions publie des fictions et des essais pensés pour l'écran comme pour le papier : typographie soignée, éditions numériques augmentées, objets-livres singuliers.",
    'hero.cta1': 'Découvrir le catalogue',
    'hero.cta2': 'Proposer un manuscrit',
    'cat.title': 'Catalogue',
    'cat.meta': '/ parutions — 2026',
    'cat.b1.author': 'Roman — à paraître · édition spéciale Canada',
    'cat.b2.author': "Roman — édition anglaise d'« Esclaves du Temps »",
    'cat.b3.author': "Roman — édition italienne d'« Esclaves du Temps »",
    'about.title': 'La maison',
    'about.meta': '/ à propos',
    'about.p1':
      "Fondée en 2026, Laurexa Editions est une maison indépendante installée en Belgique. Nous croyons que le livre numérique mérite le même soin qu'un beau livre imprimé : une maquette précise, une typographie lisible, une identité forte.",
    'about.p2':
      "Chaque titre paraît simultanément en EPUB soigné et en édition papier à tirage limité, avec une attention particulière portée aux couvertures, aux ornements de chapitre et à l'accessibilité de lecture.",
    'about.f1': 'Fictions & essais',
    'about.f2': 'EPUB + papier',
    'about.f3': 'Liège, BE',
    'contact.title': 'Contact',
    'contact.meta': "/ écrire · s'abonner",
    'contact.write': 'Nous écrire',
    'contact.writeDesc': 'Manuscrits, presse, libraires — une seule adresse :',
    'nl.title': 'Newsletter',
    'nl.desc': 'Nos parutions et coulisses, une fois par mois. Pas de spam.',
    'nl.label': 'Adresse e-mail',
    'nl.placeholder': 'vous@exemple.be',
    'nl.cta': "S'abonner",
    'nl.ok': '> inscription enregistrée. merci !',
    'nl.err': '> adresse invalide — vérifiez le format.',
  },

  en: {
    skip: 'Skip to content',
    'nav.catalogue': 'Catalogue',
    'nav.about': 'About us',
    'nav.contact': 'Contact',
    'hero.eyebrow': '// independent publishing house — Liège',
    'hero.title': 'Books for<br />the digital age',
    'hero.lead':
      'Laurexa Editions publishes fiction and essays designed for screens and paper alike: refined typography, augmented digital editions, singular book objects.',
    'hero.cta1': 'Browse the catalogue',
    'hero.cta2': 'Submit a manuscript',
    'cat.title': 'Catalogue',
    'cat.meta': '/ releases — 2026',
    'cat.b1.author': 'Novel — forthcoming · special Canadian edition',
    'cat.b2.author': 'Novel — English edition of “Esclaves du Temps”',
    'cat.b3.author': 'Novel — Italian edition of “Esclaves du Temps”',
    'about.title': 'About us',
    'about.meta': '/ the house',
    'about.p1':
      'Founded in 2026, Laurexa Editions is an independent house based in Belgium. We believe digital books deserve the same care as fine print: precise layouts, legible typography, a strong identity.',
    'about.p2':
      'Every title is released simultaneously as a refined EPUB and a limited print edition, with particular attention to covers, chapter ornaments and reading accessibility.',
    'about.f1': 'Fiction & essays',
    'about.f2': 'EPUB + print',
    'about.f3': 'Liège, BE',
    'contact.title': 'Contact',
    'contact.meta': '/ write · subscribe',
    'contact.write': 'Write to us',
    'contact.writeDesc': 'Manuscripts, press, booksellers — one address:',
    'nl.title': 'Newsletter',
    'nl.desc': 'Our releases and behind-the-scenes, once a month. No spam.',
    'nl.label': 'Email address',
    'nl.placeholder': 'you@example.com',
    'nl.cta': 'Subscribe',
    'nl.ok': '> subscription saved. thank you!',
    'nl.err': '> invalid address — check the format.',
  },
};

const HTML_KEYS = new Set(['hero.title']); // clés contenant du HTML (<br/>)

export function applyLang(lang) {
  const dict = translations[lang] || translations.fr;
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (!(key in dict)) return;
    if (HTML_KEYS.has(key)) el.innerHTML = dict[key];
    else el.textContent = dict[key];
  });

  document.querySelectorAll('[data-i18n-ph]').forEach((el) => {
    const key = el.dataset.i18nPh;
    if (key in dict) el.placeholder = dict[key];
  });

  const switchBtn = document.getElementById('lang-switch');
  if (switchBtn) {
    const other = lang === 'fr' ? 'EN' : 'FR';
    switchBtn.querySelector('[data-lang-label]').textContent = other;
    switchBtn.setAttribute(
      'aria-label',
      lang === 'fr' ? 'Switch language to English' : 'Passer le site en français'
    );
  }

  try { localStorage.setItem('laurexa-lang', lang); } catch { /* mode privé */ }
  return dict;
}

export function getSavedLang() {
  try {
    const saved = localStorage.getItem('laurexa-lang');
    if (saved === 'fr' || saved === 'en') return saved;
  } catch { /* ignore */ }
  return navigator.language?.startsWith('en') ? 'en' : 'fr';
}
