const EARTH_RADIUS_M = 6371000;
/** Le strade non sono in linea d'aria: fattore medio di tortuosità urbana. */
const DETOUR_FACTOR = 1.3;
const WALK_SPEED_M_PER_MIN = 80;

const toRad = (deg) => (deg * Math.PI) / 180;

/** Distanza in metri tra due punti {lat, lng} (formula dell'emisenoverso). */
export function distance(a, b) {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_M * Math.asin(Math.sqrt(h));
}

/** Stima dei minuti a piedi, arrotondata per eccesso. */
export function walkMinutes(from, to) {
  return Math.max(1, Math.ceil((distance(from, to) * DETOUR_FACTOR) / WALK_SPEED_M_PER_MIN));
}
