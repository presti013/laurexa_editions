// ─── Éditions vendues sur Amazon, par livre ───
// Clé = valeur de data-store-picker sur les liens de la fiche (index.html).
// Pour chaque édition :
//   format : 'print' | 'ebook'      (libellés FR/EN : i18n.js, clés store.print / store.ebook)
//   asin   : broché = ISBN-10 (978-2-931222-07-2 → 2931222070) ; ebook = ASIN KDP (B0…)
//   stores : codes de stores.js où CETTE édition est vendue
// Une seule édition → le panneau affiche son format ; plusieurs → bascule de format
// (la première de la liste s'ouvre d'abord).
//
// Liste des boutiques = liens contrôlés à la main par l'auteur le 12/10/2026. Un ebook (B0…) n'existe
// que dans les boutiques Kindle : l'ajouter ailleurs donne « page introuvable » (cas de BE et SE).
// À mettre à jour ici quand une édition paraît (ex. broché de « Slaves of Time ») ou arrive dans
// une nouvelle boutique.

export const BOOKS = {
  'esclaves-du-temps': [
    { format: 'print', asin: '2931222070',
      stores: ['US', 'UK', 'DE', 'FR', 'ES', 'IT', 'NL', 'PL', 'SE', 'BE', 'IE', 'JP', 'CA', 'AU'] },
    { format: 'ebook', asin: 'B0HFBQVB1B',
      stores: ['US', 'UK', 'DE', 'FR', 'ES', 'IT', 'NL', 'JP', 'BR', 'CA', 'MX', 'AU', 'IN'] },
  ],
  'slaves-of-time': [
    { format: 'ebook', asin: 'B0HDD1VV7J',
      stores: ['US', 'UK', 'DE', 'FR', 'IT', 'NL', 'JP', 'BR', 'CA', 'MX', 'AU', 'IN'] },
  ],
};
