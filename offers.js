/* =====================================================================
   WINDOW TRENDZ PROMOTIONS  —  THE ONLY FILE YOU EDIT EACH MONTH
   ---------------------------------------------------------------------
   Rules:
   - Keep the quote marks '...' around every piece of text.
   - Keep the comma at the end of each line.
   - Dates are 'YYYY-MM-DD'. Leave ends: '' for an offer with no end date.
   - starts: lets you load next month's offer early. It stays hidden
     until that date. Leave '' to show it straight away.
   - Order on the page = order in this list. First "feature" offer is
     the big one at the top and the one shown in site-wide banners.
   ===================================================================== */

window.WT_PROMOS = {

  offers: [

    {
      id: 'motorisation',
      style: 'feature',            // 'feature' = big hero card, 'accent' = teal outline, '' = plain
      starts: '',
      ends: '2026-09-30',
      tags: [],                    // countdown tag is added automatically when there's an end date
      title: 'Free motorisation upgrade on blinds',
      description: 'Get the motorisation upgrade free on Windoware Honeycomb, Mikronwood Venetian and Windoware Roller Blinds. One button instead of a cord, a cleaner finish, and no chains for small children to get tangled in.',
      worth: 'Worth around $210 a blind',
      image: 'https://images.squarespace-cdn.com/content/v1/5f12259b5fdfd353a85c5f79/56f4c0b2-d649-4204-97ae-bb2f4bd6e70b/26-112+Churcher+Street-73.jpg?format=1000w',
      imageAlt: 'Motorised blinds in a Palmerston North living room',
      imagePosition: 'center 35%',  // which part of the photo stays visible when cropped: 'center top', 'center 30%', 'center bottom'...
      buttonText: 'Book a free measure & quote',
      buttonLink: '/free-quote',
      mention: 'Mention the motorisation offer when we visit.',
      termsTitle: 'Terms apply',
      terms: 'Available until 30 September 2026. Not available on existing orders, and cannot be used in conjunction with another offer on the same product.',
      banner: 'Free motorisation upgrade on blinds — worth around $210 a blind'
    },

    {
      id: 'beat-quote',
      style: 'accent',
      starts: '',
      ends: '',
      tags: [ { text: 'Always on' }, { text: 'No end date', soft: true } ],
      title: "Bring us a written quote and we'll beat it by 15%",
      description: "Same product, same specs, same setup. Show us the written quote and we'll come in fifteen percent under it. No loopholes and no small print — just a better price, from a team that turns up, measures properly and gets it right.",
      worth: "Worth 15% of whatever you've been quoted",
      image: '',
      imageAlt: '',
      buttonText: 'Book a free measure & quote',
      buttonLink: '/free-quote',
      mention: 'Bring the quote with you, or email it over before we visit.',
      termsTitle: '',
      terms: '',
      banner: "Bring us a written quote and we'll beat it by 15%"
    },

    {
      id: 'finance',
      style: '',
      starts: '',
      ends: '',
      tags: [ { text: 'Finance', soft: true } ],
      title: '48 months interest free',
      description: "Spread the cost over four years with nothing added on top. Handy if you're doing the whole house at once rather than a room at a time, or if the windows need sorting now and the budget would rather it was later.",
      worth: 'Minimum spend $1,000 · Q Mastercard',
      image: '',
      imageAlt: '',
      buttonText: 'Book a free measure & quote',
      buttonLink: '/free-quote',
      mention: "We'll walk you through it on the day. No pressure either way.",
      termsTitle: 'Lending criteria, fees and terms apply',
      terms: '48 months interest free is available on Long Term Finance (LTF). Min spend $1000. Lending criteria, $50 annual Account Fee, fees, Ts&Cs apply. $55 Establishment Fee applies to your first LTF transaction, $35 Advance Fee applies to subsequent LTF transactions. Min payments of 3% of the monthly closing balance or $10 (whichever is greater) are required throughout interest free period. Paying only the minimum monthly payments will not fully repay the loan before the end of the interest free period. Standard Interest Rate of 28.95% p.a. applies to outstanding balance at the end of LTF Interest Free Period. Rates and fees subject to change. New customers need to apply and be approved for a Q Mastercard credit card. Columbus Financial Services Limited and Consumer Finance Limited reserve the right to amend, suspend or terminate the offer and these T&Cs at any time without notice.',
      banner: '48 months interest free · min spend $1,000'
    }

  ]
};
