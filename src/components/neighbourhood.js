import { html, $, $$ } from '../core/dom.js';
import { t } from '../core/i18n.js';
import { site } from '../config/site.js';
import { places, dayPlan } from '../data/places.js';
import { walkMinutes } from '../utils/geo.js';
import { logoMark } from './icons.js';

const sortedPlaces = () =>
  places.map((place) => ({ ...place, minutes: walkMinutes(site.geo, place) })).sort((a, b) => a.minutes - b.minutes);

/**
 * Carica Leaflet solo quando la mappa sta per entrare nel viewport:
 * nessun costo sul caricamento iniziale della pagina.
 */
async function createMap(container, list) {
  const [{ default: L }] = await Promise.all([import('leaflet'), import('leaflet/dist/leaflet.css')]);

  const map = L.map(container, { scrollWheelZoom: false, zoomControl: false, attributionControl: true }).setView(
    [site.geo.lat, site.geo.lng],
    16,
  );

  // In alto a sinistra i controlli finirebbero sotto la curva dell'arco.
  L.control.zoom({ position: 'bottomleft' }).addTo(map);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  L.marker([site.geo.lat, site.geo.lng], {
    icon: L.divIcon({ className: 'map-home', html: logoMark({ size: 26 }), iconSize: [48, 48], iconAnchor: [24, 24] }),
    title: site.name,
    zIndexOffset: 1000,
  }).addTo(map);

  const markers = new Map(
    list.map((place, i) => [
      place.id,
      L.marker([place.lat, place.lng], {
        icon: L.divIcon({ className: 'map-pin', html: `<span>${i + 1}</span>`, iconSize: [30, 30], iconAnchor: [15, 15] }),
        title: t(`around.places.${place.id}.name`),
      })
        .bindTooltip(t(`around.places.${place.id}.name`), { direction: 'top', offset: [0, -14] })
        .addTo(map),
    ]),
  );

  map.fitBounds(L.latLngBounds([[site.geo.lat, site.geo.lng], ...list.map((p) => [p.lat, p.lng])]), { padding: [30, 30] });

  return {
    focus(id) {
      const marker = markers.get(id);
      if (!marker) return;
      map.flyTo(marker.getLatLng(), 17, { duration: 0.8 });
      marker.openTooltip();
    },
    destroy: () => map.remove(),
  };
}

export default {
  render: () => {
    const list = sortedPlaces();
    return html`
      <section class="around section section--dark" id="around">
        <div class="container">
          <header class="section-head">
            <p class="eyebrow" data-reveal>${t('around.eyebrow')}</p>
            <h2 class="display" data-reveal data-reveal-delay="80">${t('around.title')}</h2>
            <p class="lead" data-reveal data-reveal-delay="160">${t('around.lead')}</p>
          </header>

          <div class="around__grid">
            <ol class="places" data-reveal>
              ${list.map(
                (place, i) => html`
                  <li>
                    <button class="place" type="button" data-place="${place.id}">
                      <span class="place__num">${i + 1}</span>
                      <span class="place__body">
                        <span class="place__name">${t(`around.places.${place.id}.name`)}</span>
                        <span class="place__text">${t(`around.places.${place.id}.text`)}</span>
                      </span>
                      <span class="place__time">
                        <strong>${t('around.minutes', { n: place.minutes })}</strong>
                        <small>${t(`around.kinds.${place.kind}`)}</small>
                      </span>
                    </button>
                  </li>`,
              )}
            </ol>
            <div class="map arch-soft" data-map role="region" aria-label="${t('around.mapLabel')}" data-reveal data-reveal-delay="120"></div>
          </div>

          <div class="day">
            <h3 class="day__title" data-reveal>${t('around.dayTitle')}</h3>
            <ol class="day__line">
              ${dayPlan.map(
                (step, i) => html`
                  <li class="day__step" data-reveal data-reveal-delay="${i * 70}">
                    <time class="day__time">${step.time}</time>
                    <p class="day__name">${t(`around.day.${step.id}.title`)}</p>
                    <p class="day__text">${t(`around.day.${step.id}.text`)}</p>
                  </li>`,
              )}
            </ol>
          </div>
        </div>
      </section>
    `;
  },

  mount(root) {
    const container = $('[data-map]', root);
    const list = sortedPlaces();
    let map = null;
    let disposed = false;

    const io = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const instance = await createMap(container, list);
        if (disposed) instance.destroy();
        else map = instance;
      },
      { rootMargin: '300px' },
    );
    io.observe(container);

    $$('[data-place]', root).forEach((btn) =>
      btn.addEventListener('click', () => {
        $$('[data-place]', root).forEach((b) => b.classList.toggle('is-active', b === btn));
        map?.focus(btn.dataset.place);
      }),
    );

    return () => {
      disposed = true;
      io.disconnect();
      map?.destroy();
    };
  },
};
