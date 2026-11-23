// Pages secondaires : langue (même mémoire que l'accueil) + mesure d'audience.
import './js/stats.js';

let lang = 'fr';
try { const s = localStorage.getItem('laurexa-lang'); if (s === 'fr' || s === 'en') lang = s; else if (navigator.language?.startsWith('en')) lang = 'en'; } catch { /* ignore */ }
const q = new URLSearchParams(location.search).get('lang');
if (q === 'fr' || q === 'en') lang = q;

document.documentElement.classList.add('js');
document.documentElement.lang = lang;
document.querySelectorAll('[data-lang-block]').forEach((el) => el.classList.toggle('is-active', el.dataset.langBlock === lang));
document.querySelectorAll('[data-lang-link]').forEach((a) => a.addEventListener('click', () => {
  try { localStorage.setItem('laurexa-lang', a.dataset.langLink); } catch { /* ignore */ }
}));
const titles = { fr: document.body.dataset.titleFr, en: document.body.dataset.titleEn };
if (titles[lang]) document.title = titles[lang];
