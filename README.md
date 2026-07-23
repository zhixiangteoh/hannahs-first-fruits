# Hannah's First Fruits 🍦

Landing page for **Hannah's First Fruits** — small-batch, plant-based fruit ice
cream, made by hand in Bukit Panjang / Cashew, Singapore.
Instagram: [@hannahsfirstfruits](https://www.instagram.com/hannahsfirstfruits/)

A simple, mobile-first landing page: brand, menu, collection & delivery, and FAQ.
Ordering is done by DM on Instagram. Live at
**https://zhixiangteoh.github.io/hannahs-first-fruits/** (auto-deploys on push to `main`).

## Structure

```
index.html   the whole page
styles.css   styling (cream paper + terracotta, mobile-first)
script.js    mobile nav + footer year
assets/      logo + product photos (see assets/README.md)
```

## Editing without code

- **Prices / flavours** — edit the `#menu` section in `index.html`.
- **Collection & delivery, FAQ** — edit the `#collection` and `#faq` sections.
- **Photos / logo** — replace the files in `assets/` (keep the same names — see
  `assets/README.md`).
- **Order link** — every "Order" button points to the Instagram profile; search
  `index.html` for `instagram.com/hannahsfirstfruits` to change it.
- **"Tubs left this week" counter** — edit `stock.json` (`"left"` / `"total"`) and
  commit; the site updates a minute later. For a version you can change *without*
  committing (e.g. from a Google Sheet), see the notes at the top of `script.js`.

## Running locally

Static site, no build step:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```
