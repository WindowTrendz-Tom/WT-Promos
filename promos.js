/* =====================================================================
   WINDOW TRENDZ PROMOTIONS ENGINE  —  you normally never edit this file.
   Monthly changes go in offers.js.

   Squarespace: load this once (Settings > Advanced > Code Injection > Footer)
     <script src="https://wt-promos.vercel.app/promos.js" defer></script>

   Then drop a placeholder in a Code Block wherever promos should show:
     <div data-wt-promos="page"></div>      full /offers page
     <div data-wt-promos="offers"></div>    just the offer cards
     <div data-wt-promos="banner"></div>    slim strip, links to /offers
     <div data-wt-promos="card"></div>                        the main promo
     <div data-wt-promos="card" data-offer="finance"></div>   one offer by id
     <div data-wt-promos="double"></div>                      main promo + finance, side by side
     <div data-wt-promos="double" data-offer="motorisation,finance"></div>   pick both by id
   ===================================================================== */
(function () {
  'use strict';

  var me = document.currentScript;
  var BASE = me && me.src ? me.src.replace(/[^\/]*$/, '') : 'https://wt-promos.vercel.app/';
  var OFFERS_PAGE = '/offers';
  var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  /* ---------- styles (copied from the original /offers code block) ---------- */
  var CSS = [
    ".wto{--teal:#00a3b1;--teal-dark:#00808c;--teal-lt:#eaf8fa;--ink:#22282a;--dark:#2b2d2e;--muted:#5f6a6d;--line:#e6eaeb;--sand:#f7f6f3;--amber:#b8710a;font-family:'Alan Sans',-apple-system,'Segoe UI',sans-serif;color:var(--ink);font-size:17px;line-height:1.62;container-type:inline-size;display:flex;flex-direction:column;gap:clamp(16px,2.2vw,26px)}",
    ".wto,.wto *{box-sizing:border-box}",
    ".wto img{max-width:100%!important;display:block}",
    ".wto h1,.wto h2,.wto h3{font-family:'Alan Sans',sans-serif!important;letter-spacing:-.02em;line-height:1.14;margin:0!important}",
    ".wto h1{font-size:clamp(31px,4.2vw,52px)!important;font-weight:700!important;color:var(--ink)!important}",
    ".wto h2{font-size:clamp(24px,3vw,36px)!important;font-weight:700!important;color:var(--ink)!important}",
    ".wto h3{font-size:21px!important;font-weight:700!important;color:var(--ink)!important}",
    ".wto p{font-family:'Alan Sans',sans-serif!important;margin:0!important}",
    ".wto .eyebrow{font-size:11.5px!important;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:var(--teal-dark)!important;margin:0 0 10px!important}",
    ".wto .lede{font-size:clamp(16.5px,1.8vw,19.5px)!important;color:var(--muted)!important;margin:16px 0 0!important;line-height:1.58}",
    ".wto .panel{background:#fff;border:1px solid var(--line);border-radius:22px;padding:clamp(26px,4vw,54px)}",
    ".wto .panel.sand{background:var(--sand)}",
    ".wto .head{max-width:660px}",
    ".wto .btn{display:inline-block;font-family:'Alan Sans',sans-serif!important;font-size:16px!important;font-weight:600!important;line-height:1.25!important;text-decoration:none!important;text-align:center;border-radius:999px!important;padding:15px 28px!important;background:var(--teal)!important;color:#fff!important;border:2px solid var(--teal)!important;box-shadow:0 10px 24px rgba(0,163,177,.26);cursor:pointer;transition:transform .18s,background .18s}",
    ".wto .btn:hover{transform:translateY(-2px);background:var(--teal-dark)!important;border-color:var(--teal-dark)!important}",
    ".wto .btn:focus-visible{outline:3px solid var(--teal-dark);outline-offset:3px}",
    ".wto .btn.white{background:#fff!important;color:var(--teal-dark)!important;border-color:#fff!important;box-shadow:0 10px 26px rgba(0,0,0,.16)}",
    ".wto .btn.ghostw{background:transparent!important;color:#fff!important;border-color:rgba(255,255,255,.55)!important;box-shadow:none}",
    ".wto .btn.ghostw:hover{background:rgba(255,255,255,.12)!important;border-color:#fff!important}",
    "@media(prefers-reduced-motion:reduce){.wto .btn{transition:none}.wto .btn:hover{transform:none}}",
    ".wto .offers{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin:0;padding:0;list-style:none}",
    ".wto .offers.single{grid-template-columns:1fr}",
    ".wto .offers.double{gap:14px}",
    ".wto .offers.double .offer{padding:18px 20px;border-radius:16px}",
    ".wto .offers.double .offer .ph{height:120px;margin:-2px 0 12px;border-radius:12px}",
    ".wto .offers.double .offer .tagrow{margin-bottom:10px}",
    ".wto .offers.double .offer h2{font-size:clamp(18px,1.8vw,22px)!important;margin-bottom:6px!important}",
    ".wto .offers.double .offer .what{font-size:14.5px!important;line-height:1.5}",
    ".wto .offers.double .offer .worth{font-size:14px!important;margin-top:10px!important}",
    ".wto .offers.double .offer .act{padding-top:14px}",
    ".wto .offers.double .offer .btn{font-size:14.5px!important;padding:11px 20px!important}",
    ".wto .offers.double .offer .mention{font-size:12px!important;margin-top:8px!important}",
    ".wto .offers.double details.terms{margin-top:10px;padding-top:8px}",
    ".wto .offer{display:flex;flex-direction:column;background:#fff;border:2px solid var(--line);border-radius:20px;padding:clamp(22px,2.6vw,32px)}",
    ".wto .offer.feature{grid-column:1/-1;border-color:var(--teal);background:var(--teal-lt);display:grid;grid-template-columns:1.02fr 1fr;gap:clamp(22px,3vw,42px);align-items:stretch}",
    ".wto .offer.feature.noimg{grid-template-columns:1fr}",
    ".wto .offer.feature .body{display:flex;flex-direction:column;justify-content:center}",
    ".wto .offer.feature .act{margin-top:0}",
    ".wto .offer.feature .ph{height:100%;min-height:300px;margin:0}",
    ".wto .offer.feature .act .btn{width:auto;min-width:290px}",
    ".wto .offer.feature .mention{text-align:left}",
    ".wto .offer.accent{border-color:var(--teal)}",
    ".wto .offer .body{display:flex;flex-direction:column;flex:1}",
    ".wto .offer .tagrow{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px}",
    ".wto .tag{font-family:'Alan Sans',sans-serif!important;font-size:11.5px!important;font-weight:700;letter-spacing:1px;text-transform:uppercase;border-radius:999px;padding:5px 12px;background:var(--teal)!important;color:#fff!important}",
    ".wto .tag.soft{background:#fff!important;color:var(--teal-dark)!important;border:1px solid var(--teal)}",
    ".wto .tag.warn{background:#fdf0dd!important;color:var(--amber)!important;border:1px solid #f0d3a4}",
    ".wto .tag.gone{background:#eceeef!important;color:var(--muted)!important;border:1px solid var(--line)}",
    ".wto .offer .ph{position:relative;height:180px;border-radius:14px;overflow:hidden;margin:-4px 0 18px;background-color:#20282a}",
    ".wto .offer .ph img{height:100%!important;width:100%!important;object-fit:cover}",
    ".wto .offer h2{margin-bottom:8px!important}",
    ".wto .offer .what{font-size:16.5px!important;color:var(--muted)!important;line-height:1.58}",
    ".wto .offer .worth{font-size:15.5px!important;font-weight:700;color:var(--teal-dark)!important;margin:14px 0 0!important}",
    ".wto .offer .act{margin-top:auto;padding-top:20px}",
    ".wto .offer .act .btn{width:100%}",
    ".wto .offer .mention{font-size:13px!important;color:var(--muted)!important;margin:10px 0 0!important;text-align:center}",
    ".wto details.terms{margin-top:14px;border-top:1px solid var(--line);padding-top:12px}",
    ".wto details.terms summary{cursor:pointer;list-style:none;font-family:'Alan Sans',sans-serif!important;font-size:13.5px!important;font-weight:700;color:var(--muted)!important}",
    ".wto details.terms summary::-webkit-details-marker{display:none}",
    ".wto details.terms summary::after{content:' +';color:var(--teal-dark)}",
    ".wto details.terms[open] summary::after{content:' \\2013'}",
    ".wto details.terms p{font-size:12.5px!important;color:var(--muted)!important;margin:10px 0 0!important;line-height:1.55}",
    ".wto .offer.expired{opacity:.62}",
    ".wto .offer.expired .act{display:none}",
    ".wto .why{display:grid;grid-template-columns:1fr 1fr;gap:clamp(24px,4vw,48px);align-items:start}",
    ".wto .why p+p{margin-top:14px!important}",
    ".wto .why p{font-size:16.5px!important;color:var(--muted)!important;line-height:1.6}",
    ".wto .strip{background:var(--dark);border-radius:22px;padding:22px clamp(18px,3vw,34px)}",
    ".wto .strip .row{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;text-align:center;margin:0;padding:0;list-style:none}",
    ".wto .strip .n{font-size:24px;font-weight:700;color:#7fe4ee!important;line-height:1.1;font-family:'Alan Sans',sans-serif!important}",
    ".wto .strip .l{font-size:13.5px!important;color:#cfd5d6!important;margin-top:3px!important;line-height:1.4}",
    ".wto .testi{background:var(--dark);border-radius:22px;padding:clamp(26px,4vw,52px);color:#fff}",
    ".wto .testi .row{display:grid;grid-template-columns:1.25fr .75fr;gap:clamp(24px,4vw,50px);align-items:center}",
    ".wto .testi .eyebrow{color:#7fe4ee!important}",
    ".wto .stars{color:#ffc94d;font-size:19px;letter-spacing:3px;margin-bottom:12px}",
    ".wto blockquote{margin:0!important;font-family:'Alan Sans',sans-serif!important;font-size:clamp(19px,2.1vw,26px)!important;line-height:1.42;font-weight:600;letter-spacing:-.01em;color:#fff!important}",
    ".wto .who{color:#b9c1c2!important;margin:16px 0 0!important;font-size:15.5px!important}",
    ".wto .testi img{border-radius:18px!important;height:270px!important;width:100%!important;object-fit:cover;border:none!important}",
    ".wto .final{background:var(--teal);border-radius:22px;text-align:center;padding:clamp(40px,5vw,70px) clamp(20px,4vw,40px)}",
    ".wto .final h2{color:#fff!important}",
    ".wto .final p{max-width:54ch;margin:14px auto 0!important;color:#e2f7f9!important;font-size:17.5px!important}",
    ".wto .final .row{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-top:26px}",
    ".wto .below{content-visibility:auto;contain-intrinsic-size:auto 420px}",
    /* banner (new) */
    ".wto-banner{display:flex;align-items:center;justify-content:center;gap:10px 16px;flex-wrap:wrap;background:#00a3b1;color:#fff!important;border-radius:14px;padding:14px 20px;font-family:'Alan Sans',-apple-system,'Segoe UI',sans-serif;font-size:16px;line-height:1.35;text-align:center;text-decoration:none!important}",
    ".wto-banner:hover{background:#00808c}",
    ".wto-banner:focus-visible{outline:3px solid #00808c;outline-offset:3px}",
    ".wto-banner strong{font-weight:700;color:#fff!important}",
    ".wto-banner .when{font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;background:#fff;color:#00808c;border-radius:999px;padding:4px 10px}",
    ".wto-banner .go{font-weight:600;text-decoration:underline;text-underline-offset:3px;color:#fff!important}",
    /* feature card stacks (image on top) whenever its container is narrow, e.g. a single card in a column */
    "@container (max-width:700px){.wto .offer.feature{grid-template-columns:1fr;gap:0}.wto .offer.feature .ph{min-height:0;height:200px;margin:-4px 0 18px}.wto .offer.feature .act .btn{width:100%;min-width:0}}",
    "@media(max-width:900px){.wto .offers{grid-template-columns:1fr}.wto .offer.feature{grid-template-columns:1fr;gap:0}.wto .offer.feature .ph{min-height:0;height:200px;margin:-4px 0 18px}.wto .offer.feature .act .btn{width:100%;min-width:0}.wto .why{grid-template-columns:1fr}.wto .testi .row{grid-template-columns:1fr}.wto .testi .shot{order:-1}.wto .strip .row{grid-template-columns:1fr 1fr}}",
    "@media(max-width:560px){.wto .panel{padding:24px 18px;border-radius:16px}.wto .offer{padding:22px 18px;border-radius:16px}.wto .btn{width:100%}}"
  ].join('\n');

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function toDate(str) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(str || '').trim());
    return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null;
  }
  function today() { var n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); }
  function daysLeft(o) { var e = toDate(o.ends); return e ? Math.round((e - today()) / 86400000) : null; }
  function started(o) { var s = toDate(o.starts); return !s || s <= today(); }
  function expired(o) { var d = daysLeft(o); return d !== null && d < 0; }
  function live(o) { return started(o) && !expired(o); }

  function countdown(o) {
    var d = daysLeft(o), e = toDate(o.ends);
    if (d === null) return null;
    if (d < 0) return { text: 'This offer has finished', cls: 'gone' };
    if (d === 0) return { text: 'Last day', cls: 'warn' };
    if (d <= 14) return { text: d + ' day' + (d === 1 ? '' : 's') + ' left', cls: 'warn' };
    return { text: 'Ends ' + e.getDate() + ' ' + MONTHS[e.getMonth()], cls: '' };
  }

  function track(name, data) {
    data = data || {};
    if (window.dataLayer) window.dataLayer.push(Object.assign({ event: name }, data));
    if (window.gtag) window.gtag('event', name, data);
    if (window.fbq) window.fbq('trackCustom', name, data);
  }

  /* ---------- building blocks ---------- */
  function cardHTML(o, eager) {
    var cd = countdown(o);
    var tags = (cd ? '<span class="tag ' + cd.cls + '">' + esc(cd.text) + '</span>' : '') +
      (o.tags || []).map(function (t) {
        return '<span class="tag' + (t.soft ? ' soft' : '') + '">' + esc(t.text) + '</span>';
      }).join('');
    var img = o.image ? '<div class="ph"><img src="' + esc(o.image) + '" alt="' + esc(o.imageAlt) +
      '" width="1000" height="667" decoding="async"' +
      (o.imagePosition ? ' style="object-position:' + esc(o.imagePosition) + '"' : '') + (eager ? ' fetchpriority="high"' : ' loading="lazy"') + '></div>' : '';
    var cls = ['offer'];
    if (o.style) cls.push(o.style);
    if (o.style === 'feature' && !o.image) cls.push('noimg');
    if (expired(o)) cls.push('expired');

    var body =
      (tags ? '<div class="tagrow">' + tags + '</div>' : '') +
      '<h2>' + esc(o.title) + '</h2>' +
      (o.description ? '<p class="what">' + esc(o.description) + '</p>' : '') +
      (o.worth ? '<p class="worth">' + esc(o.worth) + '</p>' : '') +
      (o.buttonText ? '<div class="act"><a class="btn" href="' + esc(o.buttonLink || '/free-quote') + '">' +
        esc(o.buttonText) + '</a>' + (o.mention ? '<p class="mention">' + esc(o.mention) + '</p>' : '') + '</div>' : '') +
      (o.terms ? '<details class="terms"><summary>' + esc(o.termsTitle || 'Terms apply') +
        '</summary><p>' + esc(o.terms) + '</p></details>' : '');

    return '<li class="' + cls.join(' ') + '" data-offer="' + esc(o.id) + '">' + img +
      '<div class="body">' + body + '</div></li>';
  }

  // the main promo = first live 'feature' offer, else first live offer
  function mainOffer(offers) {
    var active = offers.filter(live);
    return active.filter(function (x) { return x.style === 'feature'; })[0] || active[0];
  }

  function listHTML(offers) {
    // live offers first (in file order), finished ones at the bottom
    var shown = offers.filter(started);
    var sorted = shown.filter(function (o) { return !expired(o); })
      .concat(shown.filter(expired));
    if (!sorted.length) return '<p class="lede">No promotions running right now. Check back soon.</p>';
    return '<ul class="offers" aria-label="Current promotions">' +
      sorted.map(function (o, i) { return cardHTML(o, i === 0); }).join('') + '</ul>';
  }

  function schema(offers) {
    var items = offers.filter(live).map(function (o, i) {
      var item = {
        '@type': 'Offer', name: o.title, description: o.description,
        url: 'https://www.windowtrendz.co.nz/offers',
        availability: 'https://schema.org/InStock',
        areaServed: 'Manawatu and Lower North Island, New Zealand',
        seller: { '@type': 'LocalBusiness', name: 'Window Trendz', telephone: '+64800437620' }
      };
      if (o.ends) item.validThrough = o.ends;
      return { '@type': 'ListItem', position: i + 1, item: item };
    });
    var s = document.createElement('script');
    s.type = 'application/ld+json';
    s.id = 'wt-promos-schema';
    s.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'ItemList',
      name: 'Window Trendz current promotions', itemListElement: items });
    var old = document.getElementById('wt-promos-schema');
    if (old) old.remove();
    document.head.appendChild(s);
  }

  /* ---------- the four placeholder types ---------- */
  var RENDER = {
    page: function (el, offers) {
      el.innerHTML = '<div class="wto">' +
        '<section class="panel"><div class="head"><p class="eyebrow">What\'s on</p>' +
        '<h1>Current Promotions</h1><p class="lede">We don\'t run a sale every week. When we do, it\'s a real saving and it has an end date on it.</p></div></section>' +
        listHTML(offers) +
        '<section class="strip below" aria-label="Why people choose Window Trendz"><ul class="row">' +
        '<li><div class="n">150+</div><div class="l">Five-star reviews</div></li>' +
        '<li><div class="n">1000+</div><div class="l">Fabrics to choose from</div></li>' +
        '<li><div class="n">15%</div><div class="l">Under any written quote</div></li>' +
        '<li><div class="n">Local</div><div class="l">Made &amp; installed by us</div></li></ul></section>' +
        '<section class="panel sand below"><div class="why"><div><p class="eyebrow">Straight up</p><h2>Why our offers have end dates</h2></div><div>' +
        '<p>You\'ll see plenty of "50 to 60 percent off" out there, and "free making" that somehow never stops. After 35 years in the industry we know how that works. Big discounts usually start with big margins.</p>' +
        '<p>We\'d rather price it properly all year and run something real occasionally. That\'s why these have dates on them, and why the page tells you how long is left rather than saying "limited time" forever.</p>' +
        '<p>If you\'re comparing quotes and want a second opinion, bring them in. We\'ll give you a straight answer, and if ours isn\'t the best one we\'ll say so.</p>' +
        '</div></div></section>' +
        '<section class="testi below" aria-label="Customer review"><div class="row"><div>' +
        '<p class="eyebrow">Rated 5 stars by over 150 locals</p><div class="stars" aria-label="Five out of five stars">★★★★★</div>' +
        '<blockquote>"Finn quickly understood what I was wanting, was quick and efficient with a quote and explained everything well. The installation team and everyone involved were a real pleasure to deal with."</blockquote>' +
        '<p class="who">— Susan Woolnough, Palmerston North</p></div>' +
        '<div class="shot"><img loading="lazy" decoding="async" width="1000" height="667" alt="The Window Trendz team in Palmerston North" src="https://images.squarespace-cdn.com/content/v1/5f12259b5fdfd353a85c5f79/fbca16af-0054-4e5b-80cc-0b0586453524/Team.webp?format=1000w"></div>' +
        '</div></section>' +
        '<section class="final below"><h2>Take one of these while it\'s on</h2>' +
        '<p>Book a free measure and quote and we\'ll sort out which offer works best for your job. Or ring and ask — that\'s fine too.</p>' +
        '<div class="row"><a class="btn white" href="/free-quote">Book my free measure &amp; quote</a>' +
        '<a class="btn ghostw" href="tel:0800437620">Call 0800 437 620</a></div></section>' +
        '</div>';
      schema(offers);
    },

    offers: function (el, offers) {
      el.innerHTML = '<div class="wto">' + listHTML(offers) + '</div>';
    },

    card: function (el, offers) {
      var id = el.getAttribute('data-offer');
      var o = id ? offers.filter(function (x) { return x.id === id; })[0] : mainOffer(offers);
      if (!o || !live(o)) { el.innerHTML = ''; el.hidden = true; return; }
      el.innerHTML = '<div class="wto"><ul class="offers single">' +
        cardHTML(Object.assign({}, o, { style: o.style === 'feature' ? 'feature' : 'accent' }), false) + '</ul></div>';
    },

    double: function (el, offers) {
      var active = offers.filter(live);
      var main = mainOffer(offers);
      var ids = (el.getAttribute('data-offer') || '').split(',').map(function (x) { return x.trim(); }).filter(Boolean);
      var picks = ids.length
        ? ids.map(function (id) { return active.filter(function (x) { return x.id === id; })[0]; })
        : [main, active.filter(function (x) { return x.id === 'finance'; })[0] ||
            active.filter(function (x) { return x !== main; })[0]];
      picks = picks.filter(Boolean).slice(0, 2);
      if (!picks.length) { el.innerHTML = ''; el.hidden = true; return; }
      el.innerHTML = '<div class="wto"><ul class="offers double' + (picks.length === 1 ? ' single' : '') + '">' +
        picks.map(function (o) { return cardHTML(Object.assign({}, o, { style: 'accent' }), false); }).join('') + '</ul></div>';
    },

    banner: function (el, offers) {
      var active = offers.filter(live);
      var id = el.getAttribute('data-offer');
      var o = id ? active.filter(function (x) { return x.id === id; })[0]
        : (active.filter(function (x) { return x.style === 'feature'; })[0] || active[0]);
      if (!o) { el.innerHTML = ''; el.hidden = true; return; }
      var cd = countdown(o);
      el.innerHTML = '<a class="wto-banner" data-offer="' + esc(o.id) + '" href="' + OFFERS_PAGE + '">' +
        (cd ? '<span class="when">' + esc(cd.text) + '</span>' : '') +
        '<strong>' + esc(o.banner || o.title) + '</strong><span class="go">See current offers</span></a>';
    }
  };

  /* ---------- boot ---------- */
  function addStyles() {
    if (document.getElementById('wt-promos-css')) return;
    var f = document.createElement('link');
    f.rel = 'stylesheet';
    f.href = 'https://fonts.googleapis.com/css2?family=Alan+Sans:wght@400;600;700&display=swap';
    document.head.appendChild(f);
    var s = document.createElement('style');
    s.id = 'wt-promos-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function nameFor(node) {
    var card = node.closest('[data-offer]');
    var h = card && card.querySelector('h2, strong');
    return ((h ? h.textContent : 'page CTA') || '').trim().slice(0, 60);
  }

  function renderAll() {
    var data = window.WT_PROMOS;
    var slots = document.querySelectorAll('[data-wt-promos]');
    if (!slots.length || !data || !data.offers) return;
    addStyles();
    slots.forEach(function (el) {
      var fn = RENDER[el.getAttribute('data-wt-promos')];
      if (!fn) return;
      fn(el, data.offers);
      if (el.dataset.wtBound) return;
      el.dataset.wtBound = '1';
      el.addEventListener('click', function (e) {
        var a = e.target.closest && e.target.closest('a[href]');
        if (a) track('offer_click', { offer: nameFor(a), placement: el.getAttribute('data-wt-promos') });
      }, { passive: true });
      el.addEventListener('toggle', function (e) {
        var d = e.target;
        if (d && d.tagName === 'DETAILS' && d.open) track('offer_terms_opened', { offer: nameFor(d) });
      }, true);
    });
  }

  function loadData(cb) {
    if (window.WT_PROMOS) return cb();
    var s = document.createElement('script');
    s.src = BASE + 'offers.js';
    s.onload = cb;
    s.onerror = function () { console.warn('WT promos: could not load offers.js'); };
    document.head.appendChild(s);
  }

  function start() { loadData(renderAll); }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
  // Squarespace AJAX page changes
  window.addEventListener('mercury:load', function () { setTimeout(renderAll, 200); });
})();
