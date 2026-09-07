# CookThis

A lazy-cook-friendly meal planner that takes its cues from your blood test. It picks fast, cheap,
nutritionally balanced recipes and weighs them against the markers you choose to work on: cholesterol
and LDL, triglycerides, uric acid, liver enzymes, fasting glucose and thyroid. Italian supermarket
ingredients, Italian names on the shopping list, grams and euros throughout.

You enter your own lab values on first run; nothing personal is stored in this repository.

No backend, no build tooling beyond Node. One codebase, two outputs:

| Output | Where it runs | Claude features | Data |
| --- | --- | --- | --- |
| `dist/artifact.html` | Published as a claude.ai Artifact with the `sample` and `db` capabilities | Yes (uses your Claude account): ask the dietician, **change the plan by asking**, invent recipes, analyse a meal or a plate photo, weekly review, explain results | Synced across your devices through the artifact's database |
| `docs/index.html` (+ `sw.js`, manifest, icons) | Any static host, e.g. GitHub Pages; installable as a PWA on Android and desktop; works offline | No (shows a link to the claude.ai version) | Stored in the browser; export/import a backup to move it |

Nothing personal is committed. A local `personal.json` (gitignored) holds the lab seed values and the
artifact URL, and only the private artifact build receives them. The public `docs/` build starts with
empty labs and generic focus text; you enter your results once under Health, or import a backup
exported from the claude.ai version.

## Develop

```bash
node build.mjs            # writes docs/ and dist/artifact.html
python -m http.server 8765 --directory docs   # then open http://localhost:8765
```

Source lives in `src/`:

- `data/ingredients.js` — 113 ingredients with per-100 g nutrition, €/kg, Italian names, allergen flags, purine load, omega-3
- `data/recipes-cold.js` — cene fredde: dinners you assemble in three to five minutes with no heat.
  Deliberately not all sandwiches, since bread is a main source of sodium in an Italian day.
- `data/recipes-it-*.js` — the Italian method text and notes for every recipe, keyed by id. Recipe
  names live on each recipe as `it`. The app shows recipes in Italian by default, offline, with
  English as the fallback and as a switch under Settings, Appearance.
- `data/recipes-*.js` — 119 recipes (ingredients in grams; nutrition, cost and health scores are
  computed). `recipes-italian.js` holds the Italian classics; older recipes are classified by the
  `CT.ITALIAN` set in `content.js`, and the "Italian first" preference weights the planner towards them.
- `data/content.js` — meal slot defaults (name, clock time, share of the day; the user overrides each
  in Settings, and the day is planned in clock order with times before 05:00 belonging to the night
  before), preference groups, health focus texts, lab panel, tips, swap guide, achievements
- `js/nutrition.js` — totals, targets (Mifflin-St Jeor), benefit scoring
- `js/planner.js` — candidate filtering (including a per-meal hands-on limit, where a slot can be set
  to assemble-only), scoring, day assembly, weekly rhythm (fish ×2, purine-rich ×1,
  red meat ×1), and portion fitting. Every meal carries a portion multiplier, ×1 by default: you set
  it per meal, or turn on "Size portions to my calorie target" in Settings and the planner fits each
  plate so the day adds up. Today flags a day that falls short and offers a one-tap fit.
- `js/store.js` — state, localStorage, optional db sync
- `js/ai.js` — Claude features through `claude.use("sample")`
- Claude also writes a detailed walkthrough of any recipe on demand (Expand, saved per recipe) and
  suggests a food with its nutrition as you type in the "log what you ate" box.
- `js/ai-tools.js` — the page functions Claude may call in the chat: read the plan and a recipe,
  search recipes, put a recipe in a slot, save an adapted recipe and plan it, read the shopping list.
  The two writers record what they changed so the chat can offer an undo.
- `js/palettes.js` — the five colour palettes (light + dark token sets) and the brand mark
- `js/views-*.js`, `js/app.js`, `styles.css`, `markup.html` — UI

Design: a printed kitchen sheet rather than a dashboard. Flat surfaces, hairline and dotted rules
instead of floating rounded cards, squared corners, Bodoni Moda for display against Archivo for the
interface, and colour spent almost entirely on status. Phone first: controls are sized for a thumb
and the desktop media query tightens them, never the other way round.

Colour: `styles.css` holds the default palette (Carbone) so the first paint is right; picking another
in Settings writes the same custom properties inline on `:root` from `js/palettes.js`. Brand accents
are always a different hue from the good / warning / bad colours, so status never reads as branding.
Adding a palette means adding one entry with a full `light` and `dark` token set.

Icons: the mark is a margherita on black, drawn in `js/palettes.js` for the app and by
`pwa/make-icons.ps1` for the PNGs. Change both together.

## Deploy the PWA to GitHub Pages

Live at **https://romanpix.github.io/CookThis/**, served from `/docs` on `main`. On Android, open it
in Chrome and choose *Install app* (or *Add to Home screen*).

To ship a change:

```bash
node build.mjs && git add -A && git commit -m "..." && git push
```

Pages rebuilds in about a minute. The service worker serves the cached shell first, so an open tab
offers a "CookThis was updated, tap to reload" toast once the new build is fetched.

## Publish the Artifact

The Artifact is published from `dist/artifact.html` with capabilities `{ sample: {}, db: {} }`. Only the
account that published it (and anyone it is shared with) can open it; the db capability keeps it
organisation-internal.

## Not medical advice

Nutrition values are averages from standard food tables, costs are 2026 Italian supermarket estimates,
reference ranges are the ones printed on the report. Diagnosis, medication and follow-up timing are for
the doctor.
