# WT Promos

One place to update Window Trendz promotions. Every Squarespace page that shows a promo reads from here.

## Monthly update (the only thing you normally do)

1. Open **offers.js** on GitHub and click the pencil icon.
2. Change, add or remove offers. Each offer is one `{ ... },` block.
3. Click **Commit changes**. Vercel publishes it. Live on the site within about 5 minutes.

Tips:
- `ends: '2026-10-31'` shows a countdown and greys the offer out after that date.
- `starts: '2026-11-01'` hides an offer until that date, so you can load next month early.
- The first offer with `style: 'feature'` is the big one and the one in site-wide banners.

## Squarespace setup (once)

**Site-wide script** — Settings > Advanced > Code Injection > Footer:

```html
<script src="https://wt-promos.vercel.app/promos.js" defer></script>
```

**Placeholders** — add a Code Block wherever promos should appear. None of these name a specific promo, so they never need changing when offers change:

| What | Code |
|---|---|
| Slim banner (main promo, links to /offers) | `<div data-wt-promos="banner"></div>` |
| Single card: main promo | `<div data-wt-promos="card"></div>` |
| Single card: second promo | `<div data-wt-promos="card" data-slot="secondary"></div>` |
| Double card: main + second, no images | `<div data-wt-promos="double"></div>` |
| Double card with "Current Promotions" title above | `<div data-wt-promos="double" data-heading="show"></div>` |
| Double card with images | `<div data-wt-promos="double" data-images="show"></div>` |
| All offers as cards | `<div data-wt-promos="offers"></div>` |
| Full /offers page | `<div data-wt-promos="page"></div>` |

Main promo = first live `style: 'feature'` offer. Second promo = first live offer with `secondary: true`, otherwise the next live offer.

Advanced: `data-offer="some-id"` pins a card to one offer by its `id` (e.g. `data-offer="finance"`), and `data-offer="id1,id2"` pins a double card. Avoid these on pages you don't want to revisit.

A card or banner hides itself when its offer ends. If one offer in a double card ends, the other shows on its own.

## Site-wide strip (automatic)

A slim strip is fixed to the top of every page and links to /offers. It shows the main promo and hides itself when nothing is live. No Code Block needed: the footer script adds it.

- Turn off: `strip: false` in offers.js.
- Skip pages: edit `stripHideOn` in offers.js (default `['/offers']`).
- If the site header is fixed or sticky, the script moves it down so the strip doesn't cover it. Check the header on desktop and mobile after going live.

## /offers page: search-friendly text

Put this text *inside* the page placeholder. Search engines that don't run JavaScript read it; visitors never see it because the script replaces it with the styled page. It has no dates, so it doesn't need updating monthly.

```html
<div data-wt-promos="page">
  <h1>Current Promotions</h1>
  <p>Current promotions on curtains, blinds and shutters from Window Trendz, plus finance options. Made and installed locally in Manawatu and the Lower North Island. Book a free measure and quote to find out which offer suits your home.</p>
</div>
```

Every block also reserves its space before it loads, so the page doesn't jump.

## Files

- `offers.js` — the promo content. Edit this.
- `promos.js` — the design and logic. Leave alone.
- `index.html` — preview page: open the Vercel URL to check changes before looking at the live site.
- `vercel.json` — caching so updates show within minutes.
