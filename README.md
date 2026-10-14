# JYANA Personal Care — website

Next.js 16 (App Router), React 19 and plain CSS. Pages are prerendered as static HTML.

## Getting started
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Structure
```
app/
  layout.js                 fonts, header, footer, cart provider
  globals.css               the whole design system (colours, type, layout, motion)
  page.js                   homepage
  shop/ about/ contact/ checkout/
  products/[id]/page.js     product pages (/products/underarm-roll-on, /products/active-sweat-guard)
components/                 header, footer, cart drawer, gallery, buy box, accordion…
lib/data.js                 ← ALL editable content
lib/store.js                helpers (price formatting, product lookup)
public/images/              product photos
_legacy-static/             the previous plain-HTML version (reference only; safe to delete)
```

Old `.html` URLs (`/shop.html`, `/product.html?id=…`) redirect to the new routes.

## Editing content
**Almost everything lives in `lib/data.js`:** prices, product copy, benefits, ingredients,
how-to-use, caution text, announcement bar and contact details.
Search that file for `TODO` to find every placeholder that still needs real information.

- **Prices:** `price` (and an optional `compareAt` for a strike-through price).
- **Underarm Roll On ingredients:** fill in `keyIngredients` / `ingredientsFull`. Once `keyIngredients`
  has entries, the product page shows its ingredients section automatically.
- **Contact details:** `store.email`, `phone`, `instagram`, `address`. Empty values are hidden.
- **Editorial text** (hero, Why JYANA, statement, About story) is written directly in the page files under `app/`.

## Images
`public/images/underarm-roll-on.jpg` and `public/images/active-sweat-guard.jpg` are the supplied
product photos, served through `next/image`. Gallery thumbnails and the lifestyle grid are crops
of these same photos (set with `pos` / `zoom` in `lib/data.js`).

> The Active Sweat Guard photo is only 498×504 px, so it looks soft at large sizes.
> Replace it with a version at least 1500 px wide.

## Still to connect
- **Payments:** `onSubmit` in `components/CheckoutView.js` (Shopify, Razorpay, Stripe…).
- **Newsletter:** the `TODO` in `components/NewsletterForm.js` (Mailchimp, Klaviyo…).
- **Contact form:** `components/ContactForm.js` currently opens the visitor's email app.
  Swap it for Formspree or a Next.js route handler if you prefer.
- **Cart:** stored in the browser (`localStorage`) via `components/CartProvider.js`.
