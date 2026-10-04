/**
 * Dati anagrafici e di contatto della struttura.
 * Unica fonte di verità: ogni componente legge da qui.
 *
 * Fonti: annuncio Airbnb #1369445565210356850, scheda Booking.com
 * "crelugia-home-bari-central-apt", OpenStreetMap (geocoding).
 */
export const site = {
  name: 'Crelugia Home',
  tagline: 'Style & Comfort near Bari Vecchia',
  url: 'https://www.crelugiahome.it', // TODO: dominio definitivo

  address: {
    street: 'Via Giambattista Bonazzi, 57',
    postalCode: '70122',
    city: 'Bari',
    region: 'Puglia',
    country: 'IT',
  },

  geo: { lat: 41.12785, lng: 16.86266 },

  /** Codice Identificativo Nazionale (obbligatorio per legge negli annunci). */
  cin: 'IT072006C200105355',

  host: {
    name: 'Gianvito',
    cohosts: ['Michele'],
    responseTime: '1h',
  },

  capacity: { guests: 6, bedrooms: 1, bathrooms: 1, sizeSqm: 65 },

  stay: {
    checkIn: { from: '16:00', to: '00:00' },
    checkOut: '10:00',
    selfCheckIn: true,
    petsAllowed: true,
  },

  /**
   * Canali di contatto. I campi vuoti vengono nascosti automaticamente
   * e il modulo di prenotazione ripiega sul primo canale disponibile.
   */
  contact: {
    whatsapp: '', // TODO: formato internazionale senza "+", es. 393331234567
    phone: '', // TODO: es. +39 333 123 4567
    email: '', // TODO: es. info@crelugiahome.it
    instagram: '', // TODO: es. https://instagram.com/crelugiahome
  },

  platforms: {
    airbnb: 'https://www.airbnb.it/rooms/1369445565210356850',
    booking: 'https://www.booking.com/hotel/it/crelugia-home-bari-central-apt.html',
  },

  ratings: {
    airbnb: {
      overall: 4.68,
      count: 31,
      categories: {
        cleanliness: 4.68,
        accuracy: 4.6,
        checkin: 4.97,
        communication: 4.61,
        location: 4.81,
        value: 4.55,
      },
      mentions: { location: 17, hospitality: 13, walkability: 8, cleanliness: 8 },
    },
    booking: { location: 9.4, count: 17 },
  },
};
