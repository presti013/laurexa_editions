// ─── Boutiques Amazon (KDP) ───
// Ordre = celui du menu « Afficher sur Amazon » de KDP. Réordonner / retirer une ligne ici
// suffit : le sélecteur (main.js §6) se reconstruit tout seul.
// Les noms de pays vivent dans i18n.js (clés `store.<CODE>`), pas ici.
//
// Un même ASIN est valable sur toutes les boutiques : l'URL est donc https://www.<domain>/dp/<ASIN>.
// Si une boutique ne distribue pas encore le titre, Amazon y affiche « page introuvable » :
// dans ce cas, retirer la ligne correspondante ci-dessous.

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
