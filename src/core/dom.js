/**
 * Tag template minimale: unisce gli array e ignora null/undefined/false,
 * così i componenti possono usare `.map()` e condizioni inline.
 */
export function html(strings, ...values) {
  return strings.reduce((out, str, i) => out + str + toString(values[i]), '');
}

function toString(value) {
  if (value == null || value === false) return '';
  if (Array.isArray(value)) return value.map(toString).join('');
  return String(value);
}

/** Escape per testo proveniente da input utente. */
export function escape(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export const $ = (selector, root = document) => root.querySelector(selector);
export const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

/** Percorso di un'immagine della casa. */
export const img = (name) => `${import.meta.env.BASE_URL}images/home/${name}.jpg`;
