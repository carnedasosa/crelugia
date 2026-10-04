import { $$ } from './dom.js';

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Rivela gli elementi `[data-reveal]` quando entrano nel viewport.
 * `data-reveal-delay` (ms) permette effetti a cascata.
 */
export function observeReveals(root = document) {
  const targets = $$('[data-reveal]:not(.is-visible)', root);
  if (reducedMotion() || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return () => {};
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.style.transitionDelay = `${el.dataset.revealDelay || 0}ms`;
        el.classList.add('is-visible');
        io.unobserve(el);
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
  );
  targets.forEach((el) => io.observe(el));
  return () => io.disconnect();
}

/**
 * Chiama `cb(progress)` con un valore 0→1 mentre `el` attraversa il viewport
 * (0 = top dell'elemento al top dello schermo, 1 = fine della sua altezza scrollabile).
 */
export function onScrollProgress(el, cb) {
  let frame = 0;
  const update = () => {
    frame = 0;
    const rect = el.getBoundingClientRect();
    const scrollable = rect.height - window.innerHeight;
    const progress = scrollable > 0 ? Math.min(Math.max(-rect.top / scrollable, 0), 1) : 0;
    cb(progress);
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };
  update();
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
  };
}
