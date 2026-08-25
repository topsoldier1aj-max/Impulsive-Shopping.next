# Impulsive Shopping — Next.js Migration

Originally a team bootcamp project ("Life Choices E-Commerce Project": Vue 3 + Express + MySQL, built with a teammate). Rebuilding solo as a Next.js + React app — mapping React fundamentals onto the App Router and porting the original UI/data model across frameworks, not just following a tutorial.

The original Vue frontend and Express/MySQL backend are kept as read-only references in `archive/` (untracked — see `.gitignore`) to check real UI/behavior/data shape while porting, rather than guessing at it.

## Status

**Phase 1, scaffold stage.** Next.js App Router + TypeScript + Tailwind project is set up; UI/data porting hasn't started yet.

Plan:
- **Phase 1 (current):** Vue UI/UX ported into Next.js/React, backed by local TypeScript fixture data modeled on the original MySQL schema (products, categories, cart, orders). Cart is client-side only (persisted to `localStorage`), auth is a mocked/fake session — no backend required for a working, deployed demo.
- **Phase 2 (not planned):** this project is staying frontend-only by design. Real backend/auth/security work is already demonstrated elsewhere in the portfolio.

Scope carried over from the original 13 route groups: products (items/categories/variants), cart, orders, auth, and an admin CRUD surface for products/categories. `companies`, `banking_details`, `payment_methods`, `payments`, and `addresses` are explicitly out of scope; checkout is a stubbed confirmation step, not a real payment flow.

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Stack

Next.js (App Router) · React · TypeScript · Tailwind CSS
