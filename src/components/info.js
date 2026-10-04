import { html, $$ } from '../core/dom.js';
import { t } from '../core/i18n.js';
import { site } from '../config/site.js';
import { faq } from '../data/faq.js';
import { icon } from './icons.js';

const { stay, address } = site;
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${address.street}, ${address.postalCode} ${address.city}`,
)}`;

const card = (iconName, title, body, delay) => html`
  <article class="info-card" data-reveal data-reveal-delay="${delay}">
    <span class="info-card__icon">${icon(iconName)}</span>
    <h3 class="info-card__title">${title}</h3>
    <div class="info-card__body">${body}</div>
  </article>
`;

export default {
  render: () => html`
    <section class="info section section--tinted" id="info">
      <div class="container">
        <header class="section-head">
          <p class="eyebrow" data-reveal>${t('info.eyebrow')}</p>
          <h2 class="display" data-reveal data-reveal-delay="80">${t('info.title')}</h2>
        </header>

        <div class="info__grid">
          ${card('clock', t('info.checkin.title'), html`<p class="info-card__big">${stay.checkIn.from}–${stay.checkIn.to}</p><p>${t('info.checkin.text', stay.checkIn)}</p>`, 0)}
          ${card('clock', t('info.checkout.title'), html`<p class="info-card__big">${stay.checkOut}</p><p>${t('info.checkout.text', { time: stay.checkOut })}</p>`, 80)}
          ${card('key', t('info.selfcheckin.title'), html`<p>${t('info.selfcheckin.text')}</p>`, 160)}
          ${stay.petsAllowed ? card('paw', t('info.pets.title'), html`<p>${t('info.pets.text')}</p>`, 240) : ''}

          <article class="info-card info-card--wide" data-reveal>
            <span class="info-card__icon">${icon('pin')}</span>
            <h3 class="info-card__title">${t('info.arrive.title')}</h3>
            <address class="info-card__address">${address.street}<br />${address.postalCode} ${address.city} (BA)</address>
            <ul class="arrive">
              <li>${icon('plane', { size: 20 })}<span>${t('info.arrive.airport')}</span></li>
              <li>${icon('train', { size: 20 })}<span>${t('info.arrive.train')}</span></li>
              <li>${icon('car', { size: 20 })}<span>${t('info.arrive.car')}</span></li>
            </ul>
            <a class="btn btn--ghost btn--small" href="${directionsUrl}" target="_blank" rel="noopener">
              ${t('info.directions')} ${icon('external', { size: 16 })}
            </a>
          </article>

          <div class="faq info-card--wide" data-reveal>
            <h3 class="faq__title">${t('faq.title')}</h3>
            ${faq.map(
              (id) => html`
                <details class="faq__item" name="faq">
                  <summary>${t(`faq.items.${id}.q`)}<span class="faq__icon">${icon('plus', { size: 18 })}</span></summary>
                  <p>${t(`faq.items.${id}.a`)}</p>
                </details>`,
            )}
          </div>
        </div>
      </div>
    </section>
  `,

  /** Accordion esclusivo: aprendo una domanda si chiudono le altre
   *  (fallback per i browser che non supportano `<details name>`). */
  mount(root) {
    const items = $$('.faq__item', root);
    const onToggle = (event) => {
      if (!event.target.open) return;
      items.forEach((item) => {
        if (item !== event.target) item.open = false;
      });
    };
    items.forEach((item) => item.addEventListener('toggle', onToggle));
    return () => items.forEach((item) => item.removeEventListener('toggle', onToggle));
  },
};
