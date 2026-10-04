import { html, img } from '../core/dom.js';
import { t } from '../core/i18n.js';

/** Fascia scorrevole con il motto + paragrafo di benvenuto. */
export default {
  render: () => {
    const motto = html`<span>${t('motto')}</span><span class="marquee__dot" aria-hidden="true">✦</span>`;
    return html`
      <div class="marquee" aria-hidden="true">
        <div class="marquee__track">${Array(8).fill(motto)}</div>
      </div>

      <section class="intro section container">
        <div class="intro__text">
          <p class="eyebrow" data-reveal>${t('intro.eyebrow')}</p>
          <h2 class="display" data-reveal data-reveal-delay="80">${t('intro.title')}</h2>
          <p class="intro__body" data-reveal data-reveal-delay="160">${t('intro.body')}</p>
          <p class="intro__signature" data-reveal data-reveal-delay="240">— ${t('intro.signature')}</p>
        </div>
        <div class="intro__media" data-reveal data-reveal-delay="120">
          <img class="intro__img intro__img--main arch" src="${img('entrance-01')}" alt="" loading="lazy" />
          <img class="intro__img intro__img--sign" src="${img('sign-01')}" alt="Crelugia Home" loading="lazy" />
        </div>
      </section>
    `;
  },
};
