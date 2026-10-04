/**
 * Distribuzione dei posti letto, usata dalla planimetria interattiva.
 * Le coordinate `area` sono in unità del viewBox SVG (0 0 600 260).
 */
export const sleepingZones = [
  {
    id: 'bedroom',
    area: { x: 380, y: 20, w: 200, h: 150 },
    beds: [
      { id: 'king', guests: 2 },
      { id: 'single', guests: 1 },
    ],
  },
  {
    id: 'living',
    area: { x: 140, y: 20, w: 230, h: 220 },
    beds: [{ id: 'sofabed', guests: 3 }],
  },
];

/** Zone non dedicate al riposo, disegnate per completezza. */
export const otherZones = [
  { id: 'kitchen', area: { x: 20, y: 20, w: 110, h: 220 } },
  { id: 'bath', area: { x: 380, y: 180, w: 200, h: 60 } },
];
