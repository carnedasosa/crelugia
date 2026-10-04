import { html, $, $$ } from '../core/dom.js';
import { t, getLang, setLang, languages } from '../core/i18n.js';
import { logoMark } from './icons.js';

const links = ['story', 'sleep', 'gallery', 'around', 'reviews', 'info'];

export default {
  render: () => html`
    <header class="header" data-header>
      <div class="header__inner container">
        <a class="brand" href="#top" aria-label="Crelugia Home">
          ${logoMark({ size: 34 })}
          <span class="brand__divider" aria-hidden="true"></span>
          <span class="brand__name">Crelugia<small>Home</small></span>
        </a>

        <nav class="nav" id="site-nav" aria-label="Menu">
          <ul class="nav__list">
            ${links.map((id) => html`<li><a class="nav__link" href="#${id}">${t(`nav.${id}`)}</a></li>`)}
          </ul>
          <div class="lang" role="group" aria-label="${t('nav.lang')}">
            ${languages.map(
              (lang) => html`
                <button class="lang__btn" type="button" data-lang="${lang}" aria-pressed="${lang === getLang()}">
                  ${lang.toUpperCase()}
                </button>`,
            )}
          </div>
        </nav>

        <a class="btn btn--small btn--solid header__cta" href="#book">${t('nav.book')}</a>

        <button class="burger" type="button" aria-controls="site-nav" aria-expanded="false" aria-label="${t('nav.menu')}">
          <span></span><span></span>
        </button>
      </div>
    </header>
  `,

  mount(root) {
    const header = $('[data-header]', root);
    const burger = $('.burger', header);

    const setOpen = (open) => {
      header.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', t(open ? 'nav.close' : 'nav.menu'));
      document.body.classList.toggle('no-scroll', open);
    };

    burger.addEventListener('click', () => setOpen(!header.classList.contains('is-open')));
    $$('.nav__link', header).forEach((a) => a.addEventListener('click', () => setOpen(false)));
    $$('[data-lang]', header).forEach((btn) => btn.addEventListener('click', () => setLang(btn.dataset.lang)));

    // Esc chiude il menu; passando al layout desktop (es. rotazione del tablet)
    // il menu va chiuso, altrimenti il body resterebbe bloccato.
    const onKey = (e) => {
      if (e.key === 'Escape' && header.classList.contains('is-open')) {
        setOpen(false);
        burger.focus();
      }
    };
    const desktop = window.matchMedia('(min-width: 1081px)');
    const onBreakpoint = (e) => e.matches && setOpen(false);
    document.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onBreakpoint);

    // Header compatto dopo l'hero + evidenziazione della sezione corrente.
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const navLinks = new Map($$('.nav__link', header).map((a) => [a.hash.slice(1), a]));
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const link = navLinks.get(entry.target.id);
          if (link) link.classList.toggle('is-active', entry.isIntersecting);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    navLinks.forEach((_, id) => {
      const section = document.getElementById(id);
      if (section) spy.observe(section);
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onBreakpoint);
      spy.disconnect();
      document.body.classList.remove('no-scroll');
    };
  },
};
