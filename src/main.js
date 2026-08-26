import { translations, applyLang, getSavedLang } from './js/i18n.js';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/* ═══ 1. Monogramme LX : illumination séquentielle des traces ═══
   Technique : stroke-dasharray = longueur du path, puis transition
   du dashoffset vers 0, décalée trace par trace (stagger).
   Timings ajustables via --trace-duration / --trace-stagger (tokens.scss). */
function animateMonogram() {
  const svg = document.getElementById('lx-monogram');
  if (!svg) return;

  if (prefersReducedMotion.matches) {
    svg.classList.add('no-anim'); // tout visible, aucune animation
    return;
  }

  const styles = getComputedStyle(document.documentElement);
  const duration = parseFloat(styles.getPropertyValue('--trace-duration')) || 650;
  const stagger = parseFloat(styles.getPropertyValue('--trace-stagger')) || 140;

  const traces = svg.querySelectorAll('.trace');
  const nodes = svg.querySelectorAll('.node');

  traces.forEach((path, i) => {
    const len = path.getTotalLength();
    path.style.strokeDasharray = String(len);
    path.style.strokeDashoffset = String(len);
    path.style.opacity = '1';
    path.style.transition = `stroke-dashoffset ${duration}ms ease-out ${i * stagger}ms`;
  });

  nodes.forEach((node, i) => {
    node.style.transition = `opacity 250ms ease ${i * stagger + duration * 0.7}ms`;
  });

  // Double rAF : garantit que les styles initiaux sont peints avant la transition
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      traces.forEach((p) => { p.style.strokeDashoffset = '0'; });
      nodes.forEach((n) => { n.style.opacity = '1'; });
      svg.classList.add('is-lit'); // déclenche l'apparition des lettres (CSS)
    });
  });
}

/* ═══ 2. Glitch chromatique au survol (feTurbulence + feDisplacementMap) ═══
   La fréquence du bruit et l'échelle de déplacement oscillent via rAF
   tant que le pointeur est sur le monogramme. */
function setupGlitch() {
  const wrap = document.getElementById('monogram-wrap');
  const target = document.getElementById('glitch-target');
  const noise = document.getElementById('glitch-noise');
  const disp = document.getElementById('glitch-disp');
  if (!wrap || !target || !noise || !disp) return;

  let rafId = null;
  let start = 0;

  const tick = (now) => {
    const t = (now - start) / 1000;
    // Oscillation nerveuse : fréquence + échelle varient de façon pseudo-aléatoire
    const f = 0.02 + Math.abs(Math.sin(t * 9)) * 0.06;
    const scale = 4 + Math.abs(Math.sin(t * 13)) * 10;
    noise.setAttribute('baseFrequency', `${f.toFixed(3)} ${(f * 1.6).toFixed(3)}`);
    disp.setAttribute('scale', scale.toFixed(1));
    rafId = requestAnimationFrame(tick);
  };

  const startGlitch = () => {
    if (prefersReducedMotion.matches || rafId) return;
    target.setAttribute('filter', 'url(#glitch)');
    start = performance.now();
    rafId = requestAnimationFrame(tick);
  };

  const stopGlitch = () => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
    disp.setAttribute('scale', '0');
    noise.setAttribute('baseFrequency', '0 0');
    target.removeAttribute('filter');
  };

  wrap.addEventListener('pointerenter', startGlitch);
  wrap.addEventListener('pointerleave', stopGlitch);
  wrap.addEventListener('focusin', startGlitch);
  wrap.addEventListener('focusout', stopGlitch);
}

/* ═══ 3. Menu mobile ═══ */
function setupNav() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  // Ferme le menu après clic sur un lien (mobile)
  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ═══ 4. Bascule FR / EN ═══ */
function setupI18n() {
  let lang = getSavedLang();
  applyLang(lang);

  document.getElementById('lang-switch')?.addEventListener('click', () => {
    lang = lang === 'fr' ? 'en' : 'fr';
    applyLang(lang);
  });

  return () => lang;
}

/* ═══ 5. Newsletter (front uniquement : brancher un service plus tard) ═══ */
function setupNewsletter(getLang) {
  const form = document.getElementById('newsletter');
  const input = document.getElementById('nl-email');
  const msg = document.getElementById('nl-msg');
  if (!form || !input || !msg) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const dict = translations[getLang()];
    if (input.checkValidity() && input.value.includes('@')) {
      msg.textContent = dict['nl.ok'];
      input.value = '';
    } else {
      msg.textContent = dict['nl.err'];
    }
  });
}

/* ═══ Init ═══ */
const getLang = setupI18n();
setupNav();
setupNewsletter(getLang);
setupGlitch();

if (document.readyState === 'complete') animateMonogram();
else window.addEventListener('load', animateMonogram, { once: true });
