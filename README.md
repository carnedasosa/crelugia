# Crelugia Home — sito ufficiale

Sito della casa vacanze **Crelugia Home — Style & Comfort near Bari Vecchia**
Via Giambattista Bonazzi 57, 70122 Bari · CIN IT072006C200105355

## Concept

L'identità nasce dalla casa stessa:

- **L'arco** — le volte a botte del palazzo storico e il logo (casa con arco interno)
  diventano il filo conduttore: foto, card, form e marker sono tutti "ad arco".
- **La palette** — calce delle pareti, terracotta/mattone di bagno e ingresso, salvia dei
  cuscini, rovere dei pavimenti, grafite della cucina (`src/styles/tokens.css`).
- **Il motto** — _"It's a good day to have a good day"_, scritto sulla parete della camera,
  torna nel badge rotante dell'hero, nella fascia scorrevole e nel footer.

Momenti chiave: intro col logo che si disegna, hero in cui l'arco si apre a tutto schermo
durante lo scroll, racconto "stanza per stanza" con immagine fissa, planimetria interattiva
dei posti letto, mappa con tempi a piedi calcolati e itinerario di una giornata a Bari,
modulo di richiesta diretta (WhatsApp / email / Airbnb).

## Avvio

```bash
npm install
npm run dev       # sviluppo su http://localhost:5173
npm run build     # build statica in dist/
npm run preview   # anteprima della build
```

La cartella `dist/` è statica: si pubblica su Netlify, Vercel, GitHub Pages o qualunque hosting.

## Da completare prima della pubblicazione

In `src/config/site.js`:

| Campo                  | Note                                                         |
| ---------------------- | ------------------------------------------------------------ |
| `contact.whatsapp`     | Numero internazionale senza `+` (es. `393331234567`)         |
| `contact.phone`        | Mostrato nel footer                                          |
| `contact.email`        | Usato dal modulo se manca WhatsApp                           |
| `contact.instagram`    | Facoltativo                                                  |
| `url`                  | Dominio definitivo                                           |

I campi vuoti vengono nascosti. Il modulo di prenotazione sceglie da solo il canale:
**WhatsApp → email → Airbnb** (con date e ospiti precompilati).

Da verificare col proprietario: metratura (65 m², dato Booking), nomi degli host nella firma
(`intro.signature` nei file di lingua), eventuale tassa di soggiorno.

## Architettura

```
├── index.html                 # shell, meta SEO, JSON-LD VacationRental
├── public/
│   ├── images/home/           # 22 foto della casa (dall'annuncio ufficiale)
│   ├── favicon.svg
│   ├── robots.txt
│   └── site.webmanifest
└── src/
    ├── main.js                # entry: stili + intro + app
    ├── app.js                 # composizione sezioni, mount/cleanup, cambio lingua
    ├── config/
    │   └── site.js            # anagrafica, contatti, piattaforme, valutazioni
    ├── data/                  # contenuti strutturati (senza testo)
    │   ├── rooms.js           # stanze del racconto
    │   ├── gallery.js         # foto + categorie
    │   ├── amenities.js       # servizi per gruppo
    │   ├── sleeping.js        # zone e letti per la planimetria
    │   ├── places.js          # luoghi + coordinate, itinerario della giornata
    │   └── faq.js
    ├── i18n/                  # tutti i testi visibili
    │   ├── it.js
    │   └── en.js
    ├── core/                  # infrastruttura, nessuna conoscenza del dominio
    │   ├── dom.js             # template `html`, selettori, path immagini
    │   ├── i18n.js            # t(), lingua corrente, eventi di cambio
    │   └── motion.js          # reveal on scroll, progressione di scroll
    ├── services/
    │   └── booking.js         # canale di contatto e messaggio precompilato
    ├── utils/
    │   ├── geo.js             # distanze e minuti a piedi
    │   └── dates.js
    ├── components/            # una sezione = un modulo
    │   ├── header.js  hero.js  intro.js  story.js  sleeping.js
    │   ├── amenities.js  gallery.js  lightbox.js  neighbourhood.js
    │   ├── reviews.js  info.js  booking.js  footer.js
    │   ├── loader.js          # intro animata (una volta per sessione)
    │   └── icons.js           # icone SVG e marchio
    └── styles/
        ├── main.css           # ordine degli import
        ├── tokens.css         # colori, font, spazi, easing
        ├── base.css  layout.css
        └── components/        # un file CSS per componente
```

### Convenzioni

- **Componente** = modulo con `render()` → stringa HTML e, se serve, `mount(root)` che
  aggancia il comportamento e **restituisce una funzione di cleanup**. `app.js` li
  compone; al cambio lingua tutto viene ri-renderizzato e ripulito.
- **Separazione contenuti/codice**: i dati strutturati stanno in `data/`, i testi in
  `i18n/`, i dati della struttura in `config/`. Per aggiungere una foto, un luogo o una
  FAQ si tocca solo un array + la traduzione.
- **Nuova lingua**: copiare `i18n/en.js` → `i18n/de.js`, tradurre e registrarla in
  `core/i18n.js`. Il selettore nell'header si aggiorna da solo.
- **Nuova sezione**: creare `components/x.js` + `styles/components/x.css`, aggiungerla
  a `pageSections` in `app.js` e all'import in `main.css`.
- **Performance**: nessun framework; Leaflet (mappa) viene caricato con `import()` solo
  quando la mappa si avvicina al viewport. Immagini `loading="lazy"` tranne l'hero.
- **Accessibilità**: skip link, `<dialog>` nativo per la lightbox (Esc e focus gestiti dal
  browser), planimetria navigabile da tastiera, `prefers-reduced-motion` rispettato ovunque.

## Fonti dei dati

- Annuncio Airbnb [#1369445565210356850](https://www.airbnb.it/rooms/1369445565210356850): descrizione, foto, regole, valutazioni (4,68 · 31 recensioni)
- [Booking.com](https://www.booking.com/hotel/it/crelugia-home-bari-central-apt.html): metratura, posizione 9,4
- OpenStreetMap: geocodifica dell'indirizzo; tempi a piedi stimati (linea d'aria × 1,3 a 80 m/min)
