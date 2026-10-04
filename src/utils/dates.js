const DAY_MS = 86400000;

/** Data locale in formato yyyy-mm-dd (valore per <input type="date">). */
export function toInputDate(date) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

export const addDays = (date, days) => new Date(date.getTime() + days * DAY_MS);

/** Notti tra due stringhe yyyy-mm-dd; 0 se l'intervallo non è valido. */
export function nightsBetween(from, to) {
  if (!from || !to) return 0;
  const diff = Math.round((new Date(to) - new Date(from)) / DAY_MS);
  return diff > 0 ? diff : 0;
}

export function formatDate(value, lang) {
  return new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value));
}
