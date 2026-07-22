# Hannah's First Fruits 🍦

Landing page for **Hannah's First Fruits** — small-batch, plant-based fruit ice
cream, made by hand in Bukit Panjang / Cashew, Singapore.
Instagram: [@hannahsfirstfruits](https://www.instagram.com/hannahsfirstfruits/)

This is **v1**: a simple, clear, mobile-first landing page. Orders are taken over
WhatsApp / Instagram DM and paid via PayNow. The fuller online-ordering + admin
roadmap lives in [`docs/REQUIREMENTS.md`](docs/REQUIREMENTS.md).

## Structure

```
index.html      the whole page
styles.css      styling (warm cream + berry/banana palette, mobile-first)
script.js       mobile nav + WhatsApp order links (edit CONFIG at the top)
assets/         logo + photos go here (see assets/README.md)
docs/           full website requirements / roadmap
```

## Editing the essentials (no coding needed)

- **WhatsApp number** — open `script.js`, set `whatsapp` in `CONFIG` to your number
  in international format (e.g. `"6581234567"`). Until it's set, order buttons point
  to Instagram.
- **Photos & logo** — drop files into `assets/` using the filenames in
  [`assets/README.md`](assets/README.md).
- **Prices / flavours / stock** — edit the menu section in `index.html`. To mark a
  flavour sold out, change `data-stock="in"` to `data-stock="out"` on its
  `<article class="flavour">` and update the "In stock" badge text.
- **Collection hours, ingredients, allergens** — search `index.html` for the
  `editable` / "to be confirmed" spots and fill them in.

## Running it

It's a static site — no build step. Just open `index.html`, or serve locally:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Publishing

Works on any static host — GitHub Pages, Netlify, Cloudflare Pages, Vercel.
For GitHub Pages: repo **Settings → Pages → Deploy from branch**.
