/* Mesure d'audience GoatCounter (sans cookie, aucune donnée personnelle conservée).
   Le compte presti013 suit aussi www.esclavesdutemps.be : on préfixe donc le chemin par le domaine
   pour séparer les deux sites dans le même tableau de bord (ex. « laurexa.be/ »).
   count.js est chargé en async avec no_onload ; on attend qu'il soit prêt (10 s max). */
const PREFIX = 'laurexa.be';
let tries = 0;
const timer = setInterval(() => {
  const gc = window.goatcounter;
  if (gc && typeof gc.count === 'function') {
    clearInterval(timer);
    gc.count({ path: PREFIX + location.pathname });
  } else if (++tries > 50) {
    clearInterval(timer); // bloqueur de publicité ou réseau : on abandonne silencieusement
  }
}, 200);
