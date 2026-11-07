# Storefront

E-commerce store built with Next.js (App Router), TypeScript (strict), Tailwind CSS and Zustand.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
```

## Structure

```
src/
  app/                    Routes, layout, error/not-found boundaries
  components/
    layout/               Header, Footer
    providers/            StoreProvider (persisted store rehydration)
    ui/                   Button, Skeleton, EmptyState, ErrorBoundary, icons
  features/
    cart/                 store (Zustand + persist), selectors, useCart, CartDrawer
    products/             mock api, useProducts, URL-synced filters, ProductGrid
    checkout/             types + Zod schemas (UI flow is the next milestone)
  hooks/                  useDebounce, useFocusTrap
  lib/                    cn, formatPrice, Luhn check
  store/                  ui.store (cart drawer state)
  types/                  shared domain types (User)
```

## Notes

- Money is stored in minor units (cents) and formatted with `Intl.NumberFormat`.
- The cart persists to localStorage under `storefront-cart`. Hydration is manual
  (`skipHydration`) and `useCart` reports an empty cart until hydrated, so there
  are no SSR mismatches.
- Filters (`q`, `category`, `sort`) live in the URL; the search box is debounced.
- Products come from `features/products/api.ts` (mock, 700ms delay). Swap in a
  real fetch there.
