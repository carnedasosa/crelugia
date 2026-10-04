import { html, $$ } from '../core/dom.js';
import { t } from '../core/i18n.js';
import { sleepingZones, otherZones } from '../data/sleeping.js';

/** Ingombro dei letti in unità del viewBox. */
const bedSize = {
  king: { w: 70, h: 84 },
  single: { w: 36, h: 84 },
  sofabed: { w: 130, h: 40 },
};

const guestsOf = (zone) => zone.beds.reduce((sum, bed) => sum + bed.guests, 0);
const total = sleepingZones.reduce((sum, zone) => sum + guestsOf(zone), 0);
const guestLabel = (n) => t(n === 1 ? 'sleep.guest' : 'sleep.guests', { n });

/** Dispone i letti affiancati in basso a sinistra della zona. */
function bedsSvg(zone) {
  let x = zone.area.x + 20;
  return zone.beds.map((bed) => {
    const { w, h } = bedSize[bed.id];
    const y = zone.area.y + zone.area.h - h - 18;
    const shape = html`
      <g class="plan__bed">
        <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" />
        ${bed.id !== 'sofabed' ? html`<rect class="plan__pillow" x="${x + 6}" y="${y + 6}" width="${w - 12}" height="14" rx="3" />` : ''}
      </g>`;
    x += w + 12;
    return shape;
  });
}

function zoneSvg(zone, interactive) {
  const { x, y, w, h } = zone.area;
  const label = t(`sleep.zones.${zone.id}`);
  const attrs = interactive
    ? `class="plan__zone plan__zone--sleep" data-zone="${zone.id}" tabindex="0" role="button" aria-label="${label}: ${guestLabel(guestsOf(zone))}"`
    : 'class="plan__zone"';
  return html`
    <g ${attrs}>
      <rect class="plan__room" x="${x}" y="${y}" width="${w}" height="${h}" rx="6" />
      <text class="plan__label" x="${x + 14}" y="${y + 26}">${label}</text>
      ${interactive ? bedsSvg(zone) : ''}
    </g>`;
}

export default {
  render: () => {
    let dotIndex = 0;
    return html`
      <section class="sleeping section section--tinted" id="sleep">
        <div class="container sleeping__grid">
          <header class="section-head">
            <p class="eyebrow" data-reveal>${t('sleep.eyebrow')}</p>
            <h2 class="display" data-reveal data-reveal-delay="80">${t('sleep.title')}</h2>
            <p class="lead" data-reveal data-reveal-delay="160">${t('sleep.lead')}</p>

            <div class="guests" data-reveal data-reveal-delay="200">
              <p class="guests__label">${t('sleep.total')}: <strong>${guestLabel(total)}</strong></p>
              <div class="guests__dots">
                ${sleepingZones.map((zone) =>
                  Array.from({ length: guestsOf(zone) }, () => html`<span class="guests__dot" data-dot-zone="${zone.id}" style="--d:${dotIndex++}"></span>`),
                )}
              </div>
            </div>

            <ul class="zones" data-reveal data-reveal-delay="240">
              ${sleepingZones.map(
                (zone) => html`
                  <li class="zones__item" data-zone-item="${zone.id}">
                    <p class="zones__name">${t(`sleep.zones.${zone.id}`)} <span>${guestLabel(guestsOf(zone))}</span></p>
                    <p class="zones__beds">${zone.beds.map((bed) => t(`sleep.beds.${bed.id}`)).join(' + ')}</p>
                  </li>`,
              )}
            </ul>
          </header>

          <figure class="plan" data-reveal data-reveal-delay="120">
            <svg viewBox="0 0 600 260" role="group" aria-label="${t('sleep.eyebrow')}">
              <rect class="plan__walls" x="10" y="10" width="580" height="240" rx="10" />
              ${otherZones.map((zone) => zoneSvg(zone, false))}
              ${sleepingZones.map((zone) => zoneSvg(zone, true))}
              <g class="plan__furniture">
                <rect x="28" y="60" width="26" height="110" rx="3" />
                <circle cx="95" cy="120" r="20" />
                <rect x="520" y="190" width="50" height="40" rx="3" />
              </g>
              <path class="plan__door" d="M30 250 A40 40 0 0 1 70 210 M30 250 L30 210" />
              <text class="plan__entrance" x="36" y="200">${t('sleep.zones.entrance')}</text>
            </svg>
            <figcaption>${t('sleep.note')}</figcaption>
          </figure>
        </div>
      </section>
    `;
  },

  mount(root) {
    const zones = $$('[data-zone]', root);
    const items = $$('[data-zone-item]', root);
    const dots = $$('[data-dot-zone]', root);

    const highlight = (id) => {
      zones.forEach((el) => el.classList.toggle('is-active', el.dataset.zone === id));
      items.forEach((el) => el.classList.toggle('is-active', el.dataset.zoneItem === id));
      dots.forEach((el) => el.classList.toggle('is-active', el.dataset.dotZone === id));
    };

    [...zones, ...items].forEach((el) => {
      const id = el.dataset.zone || el.dataset.zoneItem;
      el.addEventListener('mouseenter', () => highlight(id));
      el.addEventListener('mouseleave', () => highlight(null));
      el.addEventListener('focus', () => highlight(id));
      el.addEventListener('blur', () => highlight(null));
      el.addEventListener('click', () => highlight(id));
    });
  },
};
