/**
 * Servizi raggruppati per tema. `icon` è una chiave di components/icons.js,
 * il testo è in `amenities.items.<id>` nei file di lingua.
 */
export const amenityGroups = [
  {
    id: 'comfort',
    items: [
      { id: 'wifi', icon: 'wifi' },
      { id: 'ac', icon: 'snow' },
      { id: 'smarttv', icon: 'tv' },
      { id: 'workspace', icon: 'desk' },
    ],
  },
  {
    id: 'kitchen',
    items: [
      { id: 'induction', icon: 'flame' },
      { id: 'oven', icon: 'oven' },
      { id: 'fridge', icon: 'fridge' },
      { id: 'washer', icon: 'washer' },
    ],
  },
  {
    id: 'sleep',
    items: [
      { id: 'linen', icon: 'bed' },
      { id: 'towels', icon: 'towel' },
      { id: 'courtesy', icon: 'drop' },
      { id: 'dryer', icon: 'wind' },
    ],
  },
  {
    id: 'ease',
    items: [
      { id: 'selfcheckin', icon: 'key' },
      { id: 'groundfloor', icon: 'door' },
      { id: 'pets', icon: 'paw' },
      { id: 'parking', icon: 'car' },
    ],
  },
];
