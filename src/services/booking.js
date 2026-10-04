import { site } from '../config/site.js';
import { t, getLang } from '../core/i18n.js';
import { formatDate, nightsBetween } from '../utils/dates.js';

/**
 * Canale con cui inviare la richiesta di prenotazione diretta,
 * in ordine di preferenza: WhatsApp → email → piattaforma.
 */
export function bookingChannel() {
  const { whatsapp, email } = site.contact;
  if (whatsapp) return 'whatsapp';
  if (email) return 'email';
  return 'platform';
}

export function nightsLabel(nights) {
  return nights === 1 ? t('book.night') : t('book.nights', { n: nights });
}

/** Testo precompilato della richiesta. */
export function composeMessage({ checkin, checkout, guests, name, message }) {
  const lang = getLang();
  return t('book.template', {
    from: formatDate(checkin, lang),
    to: formatDate(checkout, lang),
    nights: nightsLabel(nightsBetween(checkin, checkout)),
    guests,
    name: name ? t('book.templateName', { name }) : '',
    message: message ? t('book.templateMessage', { message }) : '',
  });
}

/** URL di destinazione per il canale scelto. */
export function bookingUrl(request) {
  const text = composeMessage(request);
  switch (bookingChannel()) {
    case 'whatsapp':
      return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(text)}`;
    case 'email':
      return `mailto:${site.contact.email}?subject=${encodeURIComponent(t('book.subject'))}&body=${encodeURIComponent(text)}`;
    default: {
      const url = new URL(site.platforms.airbnb);
      url.searchParams.set('check_in', request.checkin);
      url.searchParams.set('check_out', request.checkout);
      url.searchParams.set('adults', request.guests);
      return url.toString();
    }
  }
}
