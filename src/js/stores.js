// ─── Boutiques Amazon ───
// Catalogue de TOUTES les boutiques connues du site ; quelles boutiques proposer pour quelle édition
// se règle dans editions.js. Ordre d'affichage = ordre de cette liste (celui du menu KDP, puis les
// boutiques Kindle sans broché : BR, MX, IN). Les noms de pays vivent dans i18n.js (clés `store.<CODE>`).
//
// URL = https://www.<domain>/dp/<ASIN>. L'ASIN d'un broché est l'ISBN-10 (identique partout) ;
// celui d'un ebook (B0…) ne vaut que dans les boutiques Kindle (voir editions.js).

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
  { code: 'BR', domain: 'amazon.com.br' },
  { code: 'MX', domain: 'amazon.com.mx' },
  { code: 'IN', domain: 'amazon.in' },
];

const ASIN_RE = /^[A-Z0-9]{10}$/;

export const isValidAsin = (asin) => ASIN_RE.test(asin || '');

export const storeUrl = (domain, asin) => `https://www.${domain}/dp/${asin}`;
