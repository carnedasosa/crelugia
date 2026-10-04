import { logoMark } from './icons.js';
import { reducedMotion } from '../core/motion.js';

const MIN_DURATION = 1100;

/**
 * Intro animata: il marchio si disegna, poi il sipario si apre.
 * Mostrata una sola volta per sessione e mai con reduced-motion.
 */
export function playIntro() {
  let seen = false;
  try {
    seen = sessionStorage.getItem('crelugia:intro') === '1';
    sessionStorage.setItem('crelugia:intro', '1');
  } catch {
    /* storage non disponibile: mostriamo l'intro */
  }
  if (seen || reducedMotion()) return;

  const el = document.createElement('div');
  el.className = 'intro-curtain';
  el.setAttribute('aria-hidden', 'true');
  el.innerHTML = `${logoMark({ size: 72, animated: true })}<span class="intro-curtain__name">Crelugia</span>`;
  document.body.append(el);

  const start = performance.now();
  const leave = () => {
    const wait = Math.max(0, MIN_DURATION - (performance.now() - start));
    setTimeout(() => {
      el.classList.add('is-leaving');
      el.addEventListener('transitionend', () => el.remove(), { once: true });
      setTimeout(() => el.remove(), 1500); // rete di sicurezza
    }, wait);
  };

  if (document.readyState === 'complete') leave();
  else window.addEventListener('load', leave, { once: true });
}
