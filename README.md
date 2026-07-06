# Akshaya Glow Naturals

A React + Vite storefront for Akshaya Glow Naturals, a homemade natural
skincare brand (rose water, beetroot powder, herbal face packs, lip balm)
that takes orders over WhatsApp.

## Features

- **Home, About, Products, Product Details, Combo Offer and Contact pages**,
  fully wired with React Router.
- **Working mobile navigation** with a hamburger menu (the original nav just
  wrapped links on small screens with no way to open/close them).
- **Real product detail pages** at `/product/:id` -- description, ingredients,
  how-to-use, and related products (previously a static placeholder page).
- **A functional contact form** with basic validation that opens WhatsApp
  with the filled-in message pre-composed (there's no backend, so this is
  the most useful thing a static form can do for a WhatsApp-first business).
- **A custom "ingredient stamp" icon set** (rose, beetroot, rice, herbal
  blend, lip balm) used instead of the broken `via.placeholder.com` images,
  so nothing depends on an external image host and nothing can 404.
- **A distinct visual identity**: Fraunces for display type, Inter for body
  text, and a rosewood / moss / turmeric palette instead of the generic
  bright-pink template look.
- 404 page, scroll-restoration on route change, and active-link highlighting
  in the nav.

## Tech stack

- React 19 + Vite
- React Router 7
- Framer Motion (used sparingly: hero entrance, mobile menu transition)
- Plain CSS with a small set of design tokens (`src/index.css`) -- no UI
  framework, kept intentionally simple for a project this size.

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build
npm run lint     # eslint
```

## Project structure

```
src/
  components/    Navbar, Hero, ProductCard, Footer, shared Icons, etc.
  data/          products.js (product catalogue) and business.js (contact info)
  pages/         one file per route
```

## Configuration

Business contact details (phone number, WhatsApp number, email) live in
`src/data/business.js` -- update them there rather than searching the
codebase for hardcoded numbers.
