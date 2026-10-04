import { html, $, img } from '../core/dom.js';
import { t } from '../core/i18n.js';
import { onScrollProgress, reducedMotion } from '../core/motion.js';
import { site } from '../config/site.js';
import { places } from '../data/places.js';
import { walkMinutes } from '../utils/geo.js';
import { icon } from './icons.js';

/** Divide un testo in parole animabili singolarmente. */
const words = (text, offset = 0) =>
  text
    .split(' ')
    .map((word, i) => html`<span class="word"><span style="--i:${i + offset}">${word}</span></span>`)
    .join(' ');

const toOldTown = () => walkMinutes(site.geo, places.find((p) => p.id === 'castello'));

/** Badge circolare con il motto scritto sulla parete della camera. */
const mottoBadge = () => html`
  <svg class="badge" viewBox="0 0 200 200" aria-hidden="true">
    <defs><path id="badge-circle" d="M100 100m-76 0a76 76 0 1 1 152 0a76 76 0 1 1-152 0"/></defs>
    <text><textPath href="#badge-circle" textLength="474">${t('motto')} ✦</textPath></text>
    <path class="badge__mark" d="M80 128V96l20-14 20 14v32M89 128v-18a11 11 0 0 1 22 0v18"/>
  </svg>
`;

export default {
  render: () => {
    const top = t('hero.titleTop');
    return html`
      <section class="hero" id="top" data-hero>
        <div class="hero__sticky">
          <div class="hero__copy container">
            <p class="eyebrow hero__kicker">${t('hero.kicker')}</p>
            <h1 class="hero__title">
              <span class="hero__line">${words(top)}</span>
              <span class="hero__line hero__line--italic">${words(t('hero.titleBottom'), top.split(' ').length)}</span>
            </h1>
            <p class="hero__lead">${t('hero.lead')}</p>
            <div class="hero__actions">
              <a class="btn btn--solid" href="#book">${t('hero.ctaBook')} ${icon('arrow', { size: 18 })}</a>
              <a class="btn btn--ghost" href="#story">${t('hero.ctaTour')}</a>
            </div>
            <ul class="hero__stats">
              <li><strong>${site.capacity.guests}</strong><span>${t('hero.stats.guests')}</span></li>
              <li><strong>${site.capacity.sizeSqm}</strong><span>${t('hero.stats.sqm')}</span></li>
              <li><strong>${toOldTown()}</strong><span>${t('hero.stats.walk')}</span></li>
            </ul>
          </div>

          <div class="hero__visual">
            <figure class="hero__arch">
              <img src="${img('living-01')}" alt="${t('rooms.living.title')}" fetchpriority="high" />
            </figure>
            ${mottoBadge()}
          </div>

          <span class="hero__scroll" aria-hidden="true">${t('hero.scroll')}</span>
        </div>
      </section>
    `;
  },

  mount(root) {
    const hero = $('[data-hero]', root);
    requestAnimationFrame(() => hero.classList.add('is-ready'));
    if (reducedMotion()) return undefined;
    return onScrollProgress(hero, (p) => hero.style.setProperty('--p', p.toFixed(4)));
  },
};
