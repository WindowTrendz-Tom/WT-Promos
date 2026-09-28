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

**Placeholders** — add a Code Block wherever promos should appear:

| What | Code |
|---|---|
| Full /offers page | `<div data-wt-promos="page"></div>` |
| Just the offer cards | `<div data-wt-promos="offers"></div>` |
| Slim banner linking to /offers | `<div data-wt-promos="banner"></div>` |
| One specific offer | `<div data-wt-promos="card" data-offer="finance"></div>` |

`data-offer` matches the `id` in offers.js. A card or banner hides itself when its offer ends.

## Files

- `offers.js` — the promo content. Edit this.
- `promos.js` — the design and logic. Leave alone.
- `index.html` — preview page: open the Vercel URL to check changes before looking at the live site.
- `vercel.json` — caching so updates show within minutes.
