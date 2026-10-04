import { html } from '../core/dom.js';
import { t } from '../core/i18n.js';
import { site } from '../config/site.js';
import { icon, logoMark } from './icons.js';

const { contact, address, platforms } = site;

/** Solo i canali effettivamente configurati in config/site.js. */
const contactLinks = () =>
  [
    contact.phone && { href: `tel:${contact.phone.replace(/\s/g, '')}`, icon: 'phone', label: contact.phone },
    contact.whatsapp && { href: `https://wa.me/${contact.whatsapp}`, icon: 'whatsapp', label: 'WhatsApp' },
    contact.email && { href: `mailto:${contact.email}`, icon: 'mail', label: contact.email },
    contact.instagram && { href: contact.instagram, icon: 'instagram', label: 'Instagram' },
    { href: platforms.airbnb, icon: 'external', label: 'Airbnb' },
    { href: platforms.booking, icon: 'external', label: 'Booking.com' },
  ].filter(Boolean);

export default {
  render: () => html`
    <footer class="footer">
      <div class="container">
        <p class="footer__motto" data-reveal>${t('motto')}.</p>

        <div class="footer__grid">
          <div class="footer__brand">
            ${logoMark({ size: 48 })}
            <p class="footer__name">Crelugia <em>Home</em></p>
            <p class="footer__tagline">${t('footer.tagline')}</p>
          </div>

          <div>
            <h3 class="footer__title">${t('footer.address')}</h3>
            <address>${address.street}<br />${address.postalCode} ${address.city}, ${address.region}</address>
          </div>

          <div>
            <h3 class="footer__title">${t('footer.contact')}</h3>
            <ul class="footer__links">
              ${contactLinks().map(
                (link) => html`<li><a href="${link.href}" target="_blank" rel="noopener">${icon(link.icon, { size: 16 })}${link.label}</a></li>`,
              )}
            </ul>
          </div>

          <div>
            <h3 class="footer__title">${t('footer.explore')}</h3>
            <ul class="footer__links">
              ${['story', 'gallery', 'around', 'info', 'book'].map((id) => html`<li><a href="#${id}">${t(`nav.${id}`)}</a></li>`)}
            </ul>
          </div>
        </div>

        <div class="footer__bottom">
          <p>© ${new Date().getFullYear()} ${site.name} · ${t('footer.rights')}</p>
          <p>${t('info.cin')}: ${site.cin}</p>
          <a href="#top">${t('footer.top')} ↑</a>
        </div>
      </div>
    </footer>
  `,
};
