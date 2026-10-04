import { html, $, $$, img } from '../core/dom.js';
import { t } from '../core/i18n.js';
import { gallery, galleryCategories } from '../data/gallery.js';
import { openLightbox } from './lightbox.js';

const altFor = (photo) => t('gallery.alt', { category: t(`gallery.filters.${photo.category}`) });

export default {
  render: () => html`
    <section class="gallery section" id="gallery">
      <div class="container">
        <header class="section-head gallery__head">
          <div>
            <p class="eyebrow" data-reveal>${t('gallery.eyebrow')}</p>
            <h2 class="display" data-reveal data-reveal-delay="80">${t('gallery.title')}</h2>
          </div>
          <div class="filters" role="toolbar" aria-label="${t('gallery.eyebrow')}" data-reveal data-reveal-delay="160">
            ${galleryCategories.map(
              (cat) => html`
                <button class="filters__btn" type="button" data-filter="${cat}" aria-pressed="${cat === 'all'}">
                  ${t(`gallery.filters.${cat}`)}
                </button>`,
            )}
          </div>
        </header>

        <ul class="gallery__grid">
          ${gallery.map(
            (photo, i) => html`
              <li class="gallery__item gallery__item--${photo.shape}" data-category="${photo.category}">
                <button class="gallery__btn" type="button" data-index="${i}" aria-label="${t('gallery.open')}: ${altFor(photo)}">
                  <img src="${img(photo.src)}" alt="${altFor(photo)}" loading="lazy" decoding="async" />
                </button>
              </li>`,
          )}
        </ul>
      </div>
    </section>
  `,

  mount(root) {
    const section = $('#gallery', root);
    const buttons = $$('[data-filter]', section);
    const items = $$('.gallery__item', section);

    const visiblePhotos = () =>
      items
        .filter((item) => !item.hidden)
        .map((item) => {
          const image = $('img', item);
          return { src: image.src, alt: image.alt, index: Number($('[data-index]', item).dataset.index) };
        });

    buttons.forEach((btn) =>
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        items.forEach((item) => {
          item.hidden = filter !== 'all' && item.dataset.category !== filter;
        });
        section.classList.toggle('is-filtered', filter !== 'all');
      }),
    );

    section.addEventListener('click', (event) => {
      const trigger = event.target.closest('[data-index]');
      if (!trigger) return;
      const photos = visiblePhotos();
      const start = photos.findIndex((p) => p.index === Number(trigger.dataset.index));
      openLightbox(photos, Math.max(start, 0));
    });
  },
};
