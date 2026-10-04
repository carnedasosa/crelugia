import { html, $$, img } from '../core/dom.js';
import { t } from '../core/i18n.js';
import { rooms } from '../data/rooms.js';

/**
 * Racconto "stanza per stanza": i testi scorrono, l'immagine resta
 * incorniciata in un arco fisso e cambia con la stanza attiva.
 */
const pad = (n) => String(n).padStart(2, '0');

export default {
  render: () => html`
    <section class="story section" id="story">
      <div class="container">
        <header class="section-head">
          <p class="eyebrow" data-reveal>${t('story.eyebrow')}</p>
          <h2 class="display" data-reveal data-reveal-delay="80">${t('story.title')}</h2>
        </header>

        <div class="story__grid">
          <ol class="story__steps">
            ${rooms.map(
              (room, i) => html`
                <li class="story__step${i === 0 ? ' is-active' : ''}" data-step="${i}">
                  <img class="story__inline arch" src="${img(room.image)}" alt="" loading="lazy" />
                  <span class="story__index">${pad(i + 1)} / ${pad(rooms.length)}</span>
                  <p class="story__name">${t(`rooms.${room.id}.name`)}</p>
                  <h3 class="story__title">${t(`rooms.${room.id}.title`)}</h3>
                  <p class="story__text">${t(`rooms.${room.id}.text`)}</p>
                  <ul class="chips">
                    ${room.facts.map((fact) => html`<li class="chip">${t(`facts.${fact}`)}</li>`)}
                  </ul>
                </li>`,
            )}
          </ol>

          <div class="story__media" aria-hidden="true">
            <div class="story__frame arch">
              ${rooms.map(
                (room, i) => html`<img class="story__img${i === 0 ? ' is-active' : ''}" data-img="${i}" src="${img(room.image)}" alt="" loading="lazy" />`,
              )}
            </div>
            <ol class="story__dots">
              ${rooms.map((room, i) => html`<li class="${i === 0 ? 'is-active' : ''}" data-dot="${i}">${t(`rooms.${room.id}.name`)}</li>`)}
            </ol>
          </div>
        </div>
      </div>
    </section>
  `,

  mount(root) {
    const steps = $$('[data-step]', root);
    const groups = [$$('[data-step]', root), $$('[data-img]', root), $$('[data-dot]', root)];

    const activate = (index) => {
      groups.forEach((list) => list.forEach((el, i) => el.classList.toggle('is-active', i === index)));
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) activate(Number(entry.target.dataset.step));
        });
      },
      { rootMargin: '-50% 0px -50% 0px' },
    );
    steps.forEach((step) => io.observe(step));
    return () => io.disconnect();
  },
};
