import { html, $, img } from '../core/dom.js';
import { t } from '../core/i18n.js';
import { site } from '../config/site.js';
import { bookingChannel, bookingUrl, nightsLabel } from '../services/booking.js';
import { addDays, nightsBetween, toInputDate } from '../utils/dates.js';
import { icon, logoMark } from './icons.js';

const submitLabel = {
  whatsapp: () => html`${icon('whatsapp', { size: 20 })} ${t('book.submitWhatsapp')}`,
  email: () => html`${icon('mail', { size: 20 })} ${t('book.submitEmail')}`,
  platform: () => html`${t('book.submitPlatform')} ${icon('arrow', { size: 18 })}`,
};

export default {
  render: () => {
    const today = new Date();
    const min = toInputDate(today);
    return html`
      <section class="book section" id="book">
        <div class="book__bg" aria-hidden="true"><img src="${img('bedroom-02')}" alt="" loading="lazy" /></div>
        <div class="container book__grid">
          <header class="book__intro">
            <p class="eyebrow" data-reveal>${t('book.eyebrow')}</p>
            <h2 class="display" data-reveal data-reveal-delay="80">${t('book.title')}</h2>
            <p class="lead" data-reveal data-reveal-delay="160">${t('book.lead')}</p>
            <div class="book__platforms" data-reveal data-reveal-delay="220">
              <a class="btn btn--ghost-light" href="${site.platforms.airbnb}" target="_blank" rel="noopener">${t('book.airbnb')} ${icon('external', { size: 16 })}</a>
              <a class="btn btn--ghost-light" href="${site.platforms.booking}" target="_blank" rel="noopener">${t('book.booking')} ${icon('external', { size: 16 })}</a>
            </div>
          </header>

          <form class="book-form" data-booking novalidate data-reveal data-reveal-delay="120">
            <div class="book-form__crown" aria-hidden="true">
              ${logoMark({ size: 36 })}
              <p>${t('book.pickDates')}</p>
            </div>
            <div class="book-form__dates">
              <label class="field">
                <span class="field__label">${t('book.checkin')}</span>
                <input type="date" name="checkin" required min="${min}" value="${toInputDate(addDays(today, 7))}" />
              </label>
              <label class="field">
                <span class="field__label">${t('book.checkout')}</span>
                <input type="date" name="checkout" required min="${min}" value="${toInputDate(addDays(today, 10))}" />
              </label>
            </div>

            <div class="field">
              <span class="field__label" id="guests-label">${t('book.guests')}</span>
              <div class="stepper" role="group" aria-labelledby="guests-label">
                <button type="button" class="stepper__btn" data-step="-1" aria-label="-1">${icon('minus', { size: 18 })}</button>
                <output class="stepper__value" name="guestsOut">2</output>
                <input type="hidden" name="guests" value="2" />
                <button type="button" class="stepper__btn" data-step="1" aria-label="+1">${icon('plus', { size: 18 })}</button>
              </div>
            </div>

            <label class="field">
              <span class="field__label">${t('book.name')}</span>
              <input type="text" name="name" autocomplete="name" placeholder="${t('book.namePlaceholder')}" />
            </label>

            <label class="field">
              <span class="field__label">${t('book.message')}</span>
              <textarea name="message" rows="3" placeholder="${t('book.messagePlaceholder')}"></textarea>
            </label>

            <p class="book-form__summary" data-summary aria-live="polite"></p>

            <button class="btn btn--solid btn--block" type="submit">${submitLabel[bookingChannel()]()}</button>
          </form>
        </div>
      </section>
    `;
  },

  mount(root) {
    const form = $('[data-booking]', root);
    const { checkin, checkout, guests, guestsOut } = form.elements;
    const summary = $('[data-summary]', form);
    const maxGuests = site.capacity.guests;

    const update = () => {
      checkout.min = checkin.value;
      const nights = nightsBetween(checkin.value, checkout.value);
      summary.classList.toggle('is-error', !nights);
      summary.textContent = nights ? nightsLabel(nights) : t('book.errorDates');
      return nights;
    };

    checkin.addEventListener('change', () => {
      if (nightsBetween(checkin.value, checkout.value) < 1) {
        checkout.value = toInputDate(addDays(new Date(checkin.value), 1));
      }
      update();
    });
    checkout.addEventListener('change', update);

    form.addEventListener('click', (event) => {
      const btn = event.target.closest('[data-step]');
      if (!btn) return;
      const next = Math.min(Math.max(Number(guests.value) + Number(btn.dataset.step), 1), maxGuests);
      guests.value = next;
      guestsOut.value = next;
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!update()) return;
      const url = bookingUrl(Object.fromEntries(new FormData(form)));
      if (bookingChannel() === 'email') window.location.href = url;
      else window.open(url, '_blank', 'noopener');
    });

    update();
  },
};
