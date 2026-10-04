import { html, $$ } from '../core/dom.js';
import { t, getLang } from '../core/i18n.js';
import { site } from '../config/site.js';

const { airbnb, booking } = site.ratings;
const number = (value, digits = 2) =>
  new Intl.NumberFormat(getLang(), { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value);

/** Arco di avanzamento: la valutazione riempie un semicerchio. */
const ratingArch = (value, max) => {
  const length = Math.PI * 90;
  return html`
    <svg class="score__arch" viewBox="0 0 200 110" aria-hidden="true">
      <path class="score__track" d="M10 100a90 90 0 0 1 180 0" />
      <path class="score__fill" d="M10 100a90 90 0 0 1 180 0" style="--len:${length};--val:${(value / max) * length}" />
    </svg>`;
};

export default {
  render: () => html`
    <section class="reviews section container" id="reviews">
      <header class="section-head section-head--center">
        <p class="eyebrow" data-reveal>${t('reviews.eyebrow')}</p>
        <h2 class="display" data-reveal data-reveal-delay="80">${t('reviews.title')}</h2>
        <p class="lead" data-reveal data-reveal-delay="160">${t('reviews.lead')}</p>
      </header>

      <div class="reviews__grid">
        <div class="score" data-reveal data-animate>
          ${ratingArch(airbnb.overall, 5)}
          <p class="score__value">${number(airbnb.overall)}<span>${t('reviews.outOf')}</span></p>
          <p class="score__meta">${t('reviews.basedOn', { n: airbnb.count })}</p>
        </div>

        <ul class="bars" data-reveal data-reveal-delay="120" data-animate>
          ${Object.entries(airbnb.categories).map(
            ([id, value]) => html`
              <li class="bar">
                <span class="bar__label">${t(`reviews.categories.${id}`)}</span>
                <span class="bar__track"><span class="bar__fill" style="--w:${(value / 5) * 100}%"></span></span>
                <span class="bar__value">${number(value, 1)}</span>
              </li>`,
          )}
        </ul>

        <div class="reviews__side" data-reveal data-reveal-delay="200">
          <h3 class="reviews__subtitle">${t('reviews.mentionsTitle')}</h3>
          <ul class="mentions">
            ${Object.entries(airbnb.mentions).map(
              ([id, n]) => html`<li><span>${t(`reviews.mentions.${id}`)}</span><small>${t('reviews.mentionCount', { n })}</small></li>`,
            )}
          </ul>
          <div class="booking-score">
            <strong>${number(booking.location, 1)}</strong>
            <span>${t('reviews.bookingLocation')}<small>${t('reviews.bookingCount', { n: booking.count })}</small></span>
          </div>
        </div>
      </div>
    </section>
  `,

  mount(root) {
    const targets = $$('[data-animate]', root);
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-animated');
          io.unobserve(entry.target);
        }),
      { threshold: 0.4 },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  },
};
