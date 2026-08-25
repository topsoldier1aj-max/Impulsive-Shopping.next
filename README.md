# Impulsive Shopping — Next.js Migration

Originally a team bootcamp project ("Life Choices E-Commerce Project": Vue 3 + Express + MySQL, built with a teammate). Rebuilding solo as a Next.js + React app — mapping React fundamentals onto the App Router and porting the original UI/data model across frameworks, not just following a tutorial.

The original Vue frontend and Express/MySQL backend are kept as read-only references in `archive/` (untracked — see `.gitignore`) to check real UI/behavior/data shape while porting, rather than guessing at it.

## Status

**Phase 1 scope is complete.** Catalog, product detail, cart, mock order history, mocked auth, and an admin CRUD demo are all built on local TypeScript fixtures — no backend.

- **Phase 1 (current):** Vue UI/UX ported into Next.js/React, backed by local TypeScript fixture data modeled on the original MySQL schema (products, categories, cart, orders). Cart is client-side only (persisted to `localStorage`), auth is a mocked/fake session — no backend required for a working, deployed demo.
- **Phase 2 (not planned):** this project is staying frontend-only by design. Real backend/auth/security work is already demonstrated elsewhere in the portfolio.

Scope carried over from the original 13 route groups: products (items/categories/variants), cart, orders, auth, and an admin CRUD surface for products/categories. `companies`, `banking_details`, `payment_methods`, `payments`, and `addresses` are explicitly out of scope; checkout is a stubbed confirmation step, not a real payment flow.

## UI fidelity

The goal is a close visual port, not a redesign: layout, spacing, colors, and component structure are taken directly from `archive/original-frontend-vue` (Vue + Bootstrap) and translated into Tailwind utility classes — not a pixel-diff, since the two frameworks' class systems don't map 1:1. Notable carry-overs: the exact `#040404`/`#e7e7e7` palette and transparent floating nav from `Header.vue`, the top scroll-progress bar from `CustomerLayout.vue`, the Hero copy, and the two-column cart layout from `Cart.vue`. The admin section intentionally has no storefront header/footer, matching the original's separate `AdminLayout.vue`.

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Stack

Next.js (App Router) · React · TypeScript · Tailwind CSS
