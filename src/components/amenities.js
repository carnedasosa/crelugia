import { html } from '../core/dom.js';
import { t } from '../core/i18n.js';
import { amenityGroups } from '../data/amenities.js';
import { icon } from './icons.js';

export default {
  render: () => html`
    <section class="amenities section container" id="amenities">
      <header class="section-head section-head--center">
        <p class="eyebrow" data-reveal>${t('amenities.eyebrow')}</p>
        <h2 class="display" data-reveal data-reveal-delay="80">${t('amenities.title')}</h2>
      </header>

      <div class="amenities__grid">
        ${amenityGroups.map(
          (group, g) => html`
            <article class="amenity-card" data-reveal data-reveal-delay="${g * 90}">
              <h3 class="amenity-card__title">${t(`amenities.groups.${group.id}`)}</h3>
              <ul class="amenity-card__list">
                ${group.items.map(
                  (item) => html`<li>${icon(item.icon, { size: 22 })}<span>${t(`amenities.items.${item.id}`)}</span></li>`,
                )}
              </ul>
            </article>`,
        )}
      </div>
    </section>
  `,
};
