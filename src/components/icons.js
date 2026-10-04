/**
 * Icone lineari 24×24, disegnate a mano per coerenza di tratto.
 * Uso: icon('wifi') → stringa SVG.
 */
const paths = {
  wifi: '<path d="M2 9a15 15 0 0 1 20 0"/><path d="M5 12.5a10 10 0 0 1 14 0"/><path d="M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',
  snow: '<path d="M12 2v20M4.9 6.5l14.2 11M4.9 17.5l14.2-11"/><path d="m9 4 3 2 3-2M9 20l3-2 3 2"/>',
  tv: '<rect x="2.5" y="5" width="19" height="12.5" rx="1.5"/><path d="M8 21h8M12 17.5V21"/>',
  desk: '<path d="M3 9h18M5 9v11M19 9v11M14 9v5h5"/><path d="M8 9V5h4v4"/>',
  flame: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>',
  oven: '<rect x="3" y="3" width="18" height="18" rx="1.5"/><path d="M3 8h18"/><rect x="6.5" y="11" width="11" height="7" rx="1"/><path d="M7 5.5h1M11 5.5h1"/>',
  fridge: '<rect x="5" y="2.5" width="14" height="19" rx="1.5"/><path d="M5 10h14M8.5 6v2M8.5 13v3"/>',
  washer: '<rect x="3.5" y="2.5" width="17" height="19" rx="1.5"/><circle cx="12" cy="13.5" r="5"/><path d="M3.5 6.5h17M7 4.5h1"/><path d="M9 14.5c1-1 2-1 3 0s2 1 3 0"/>',
  bed: '<path d="M2.5 19v-8.5h19V19M2.5 16h19M2.5 10.5V5"/><rect x="5" y="7.5" width="5" height="3" rx="1"/>',
  towel: '<path d="M6 3h12v15H6z"/><path d="M6 18v3h12v-3M9 3v15"/>',
  drop: '<path d="M12 2.5s6.5 7 6.5 11.5a6.5 6.5 0 0 1-13 0C5.5 9.5 12 2.5 12 2.5Z"/><path d="M9 14a3 3 0 0 0 3 3"/>',
  wind: '<path d="M3 8h11a3 3 0 1 0-3-3M3 12h16a3 3 0 1 1-3 3M3 16h7"/>',
  key: '<circle cx="7.5" cy="15.5" r="4.5"/><path d="m11 12 9.5-9.5M17 6l3 3M14.5 8.5l2 2"/>',
  door: '<path d="M5 21V8a7 7 0 0 1 14 0v13M3 21h18"/><circle cx="15" cy="14" r=".8"/>',
  paw: '<circle cx="5.5" cy="10" r="2"/><circle cx="9.5" cy="5.5" r="2"/><circle cx="14.5" cy="5.5" r="2"/><circle cx="18.5" cy="10" r="2"/><path d="M12 11c-3 0-6 4.5-6 7a2.5 2.5 0 0 0 3.5 2.3 6 6 0 0 1 5 0A2.5 2.5 0 0 0 18 18c0-2.5-3-7-6-7Z"/>',
  car: '<path d="M4 16.5V12l2-5.5h12l2 5.5v4.5M3 12h18"/><rect x="3" y="16.5" width="18" height="2.5" rx="1"/><circle cx="7.5" cy="14.5" r=".8"/><circle cx="16.5" cy="14.5" r=".8"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
  pin: '<path d="M12 21.5s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12Z"/><circle cx="12" cy="9.5" r="2.5"/>',
  plane: '<path d="M21 15.5 13.5 11V5a1.5 1.5 0 0 0-3 0v6L3 15.5V17l7.5-2.5V19L8 20.5V22l4-1 4 1v-1.5L13.5 19v-4.5L21 17z"/>',
  train: '<rect x="5" y="2.5" width="14" height="15" rx="3"/><path d="M5 11h14M8.5 21l2-3.5M15.5 21l-2-3.5"/><circle cx="9" cy="14.5" r=".8"/><circle cx="15" cy="14.5" r=".8"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowLeft: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
  whatsapp: '<path d="M3.5 20.5 5 16a8.5 8.5 0 1 1 3.2 3.1z"/><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .8c-1-.4-2.4-1.8-2.8-2.8l.8-1-1-2z"/>',
  mail: '<rect x="2.5" y="5" width="19" height="14" rx="1.5"/><path d="m3 6 9 7 9-7"/>',
  phone: '<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".8"/>',
  external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
};

export function icon(name, { size = 24, label } = {}) {
  const a11y = label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"';
  return `<svg class="icon icon--${name}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" ${a11y}>${paths[name] ?? ''}</svg>`;
}

/** Marchio Crelugia: casa con arco interno, come sull'insegna all'ingresso. */
export function logoMark({ size = 40, animated = false } = {}) {
  return `<svg class="logo-mark${animated ? ' logo-mark--draw' : ''}" width="${size}" height="${size}" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path pathLength="1" d="M6 44V18L24 5l18 13v26"/>
    <path pathLength="1" d="M15 44V27a9 9 0 0 1 18 0v17"/>
  </svg>`;
}
