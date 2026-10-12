// ─── Boutiques Amazon (KDP) ───
// Ordre = celui du menu « Afficher sur Amazon » de KDP. Réordonner / retirer une ligne ici
// suffit : le sélecteur (main.js §6) se reconstruit tout seul.
// Les noms de pays vivent dans i18n.js (clés `store.<CODE>`), pas ici.
//
// URL = https://www.<domain>/dp/<ASIN>. L'ASIN à utiliser est celui du BROCHÉ : pour un ISBN en 978,
// c'est l'ISBN-10 (978-2-931222-07-2 → 2931222070), identique dans toutes les boutiques.
// Ne pas mettre l'ASIN d'un ebook (B0…) : il ne vaut que dans les boutiques Kindle et donne
// « page introuvable » ailleurs (Belgique et Suède signalées en erreur le 12/10/2026 avec l'ASIN ebook).
// Si une boutique ne distribue pas encore le titre, retirer sa ligne ci-dessous.

export const STORES = [
  { code: 'US', domain: 'amazon.com' },
  { code: 'UK', domain: 'amazon.co.uk' },
  { code: 'DE', domain: 'amazon.de' },
  { code: 'FR', domain: 'amazon.fr' },
  { code: 'ES', domain: 'amazon.es' },
  { code: 'IT', domain: 'amazon.it' },
  { code: 'NL', domain: 'amazon.nl' },
  { code: 'PL', domain: 'amazon.pl' },
  { code: 'SE', domain: 'amazon.se' },
  { code: 'BE', domain: 'amazon.com.be' },
  { code: 'IE', domain: 'amazon.ie' },
  { code: 'JP', domain: 'amazon.co.jp' },
  { code: 'CA', domain: 'amazon.ca' },
  { code: 'AU', domain: 'amazon.com.au' },
];

const ASIN_RE = /^[A-Z0-9]{10}$/;

export const isValidAsin = (asin) => ASIN_RE.test(asin || '');

export const storeUrl = (domain, asin) => `https://www.${domain}/dp/${asin}`;
