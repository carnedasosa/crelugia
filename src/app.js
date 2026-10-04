import { t, getLang, onLangChange } from './core/i18n.js';
import { observeReveals } from './core/motion.js';

import header from './components/header.js';
import hero from './components/hero.js';
import intro from './components/intro.js';
import story from './components/story.js';
import sleeping from './components/sleeping.js';
import amenities from './components/amenities.js';
import gallery from './components/gallery.js';
import neighbourhood from './components/neighbourhood.js';
import reviews from './components/reviews.js';
import info from './components/info.js';
import booking from './components/booking.js';
import footer from './components/footer.js';

/**
 * Ordine delle sezioni nella pagina. Per aggiungerne una basta creare
 * un modulo con `render()` (e opzionalmente `mount(root)`) e inserirlo qui.
 */
const pageSections = [hero, intro, story, sleeping, amenities, gallery, neighbourhood, reviews, info, booking];
const allComponents = [header, ...pageSections, footer];

let cleanups = [];

function updateDocumentMeta() {
  document.documentElement.lang = getLang();
  document.title = t('meta.title');
  document.querySelector('meta[name="description"]')?.setAttribute('content', t('meta.description'));
}

function render(root) {
  cleanups.forEach((fn) => fn?.());
  root.innerHTML = `${header.render()}<main id="main">${pageSections.map((s) => s.render()).join('')}</main>${footer.render()}`;

  cleanups = allComponents.map((component) => component.mount?.(root));
  cleanups.push(observeReveals(root));
  updateDocumentMeta();
}

export function createApp(root) {
  render(root);

  onLangChange(() => {
    // Rirenderizza mantenendo la posizione di lettura.
    const y = window.scrollY;
    render(root);
    window.scrollTo({ top: y, behavior: 'instant' });
  });
}
