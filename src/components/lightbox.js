import { html, $ } from '../core/dom.js';
import { t } from '../core/i18n.js';
import { icon } from './icons.js';

/**
 * Visualizzatore a schermo intero basato su <dialog> nativo:
 * focus trap ed Esc sono gestiti dal browser.
 * items: [{ src, alt }]
 */
export function openLightbox(items, startIndex = 0) {
  let index = startIndex;

  const dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.innerHTML = html`
    <figure class="lightbox__figure">
      <img class="lightbox__img" alt="" />
      <figcaption class="lightbox__caption"></figcaption>
    </figure>
    <button class="lightbox__btn lightbox__btn--close" type="button" data-action="close" aria-label="${t('gallery.close')}">${icon('close')}</button>
    <button class="lightbox__btn lightbox__btn--prev" type="button" data-action="prev" aria-label="${t('gallery.prev')}">${icon('arrowLeft')}</button>
    <button class="lightbox__btn lightbox__btn--next" type="button" data-action="next" aria-label="${t('gallery.next')}">${icon('arrow')}</button>
  `;
  document.body.append(dialog);

  const image = $('.lightbox__img', dialog);
  const caption = $('.lightbox__caption', dialog);

  const show = (next) => {
    index = (next + items.length) % items.length;
    const item = items[index];
    image.classList.remove('is-loaded');
    image.onload = () => image.classList.add('is-loaded');
    image.src = item.src;
    image.alt = item.alt;
    caption.textContent = `${index + 1} / ${items.length} · ${item.alt}`;
  };

  const actions = {
    close: () => dialog.close(),
    prev: () => show(index - 1),
    next: () => show(index + 1),
  };

  dialog.addEventListener('click', (event) => {
    const action = event.target.closest('[data-action]')?.dataset.action;
    if (action) actions[action]();
    else if (event.target === dialog) dialog.close();
  });

  const onKey = (event) => {
    if (event.key === 'ArrowLeft') actions.prev();
    if (event.key === 'ArrowRight') actions.next();
  };
  dialog.addEventListener('keydown', onKey);

  // Swipe orizzontale su touch.
  let startX = null;
  dialog.addEventListener('pointerdown', (event) => (startX = event.clientX));
  dialog.addEventListener('pointerup', (event) => {
    if (startX === null) return;
    const delta = event.clientX - startX;
    startX = null;
    if (Math.abs(delta) > 50) (delta > 0 ? actions.prev : actions.next)();
  });

  dialog.addEventListener('close', () => {
    document.body.classList.remove('no-scroll');
    dialog.remove();
  });

  show(index);
  document.body.classList.add('no-scroll');
  dialog.showModal();
}
