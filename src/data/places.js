/**
 * Luoghi di interesse intorno alla casa. I tempi a piedi vengono calcolati
 * a runtime da utils/geo.js partendo dalle coordinate in config/site.js.
 */
export const places = [
  { id: 'castello', lat: 41.12855, lng: 16.86648, kind: 'history' },
  { id: 'cattedrale', lat: 41.12815, lng: 16.86955, kind: 'history' },
  { id: 'arcobasso', lat: 41.12905, lng: 16.86805, kind: 'food' },
  { id: 'sannicola', lat: 41.13032, lng: 16.87013, kind: 'history' },
  { id: 'mercantile', lat: 41.12775, lng: 16.87185, kind: 'night' },
  { id: 'ferrarese', lat: 41.12685, lng: 16.87225, kind: 'night' },
  { id: 'lanze', lat: 41.12545, lng: 16.87395, kind: 'food' },
  { id: 'petruzzelli', lat: 41.12355, lng: 16.87255, kind: 'culture' },
  { id: 'sparano', lat: 41.12065, lng: 16.86995, kind: 'shopping' },
  { id: 'stazione', lat: 41.11775, lng: 16.86935, kind: 'transport' },
];

/** Itinerario consigliato "Una giornata a Bari": orari + id di testo. */
export const dayPlan = [
  { time: '08:30', id: 'breakfast' },
  { time: '10:00', id: 'basilica' },
  { time: '12:00', id: 'orecchiette' },
  { time: '13:30', id: 'lunch' },
  { time: '17:00', id: 'shopping' },
  { time: '19:30', id: 'sunset' },
  { time: '21:30', id: 'night' },
];
