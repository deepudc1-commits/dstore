# DStore

DStore is a furniture and home decor storefront built with React and TypeScript. Visitors can browse and filter the catalogue, view product details, manage a cart, sign up or log in, place orders and see their order history.

Product, auth and order data come from a REST API (`https://strapi-store-server.onrender.com/api`).

## Features

- Landing page with a hero slideshow, shop-by-category, offers, featured products and brand sections
- Product catalogue with search, category, company, price and free-shipping filters, sorting, pagination, and grid or list views
- Product detail page with colour and quantity selection
- Cart with quantity changes, removal and live totals (subtotal, shipping, tax, order total), saved across reloads
- Register, log in, or log in as a guest user
- Protected checkout and order history for logged-in users
- Responsive layout with a mobile menu, a 404 page and a fallback error page

## Tech stack

| Area | Library |
| --- | --- |
| UI | React 18, TypeScript 5 (strict mode) |
| Build tool | Vite 5 |
| Routing and data loading | React Router 7 (`createBrowserRouter`, loaders, actions, `lazy`) |
| Server state | TanStack Query 4 |
| Client state | Redux Toolkit, React Redux |
| HTTP | Axios |
| Styling | Tailwind CSS 3, daisyUI 4, `@tailwindcss/typography` |
| Icons and notifications | react-icons, react-toastify |
| Linting | ESLint with `@typescript-eslint`, `eslint-plugin-react`, `eslint-plugin-react-hooks` |

## Getting started

Requirements: Node.js 18 or newer.

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`. Use the **Guest user** button on the login page to try checkout and orders without creating an account.

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Type-check with `tsc`, then build for production into `dist/` |
| `npm run typecheck` | Type-check only |
| `npm run lint` | Run ESLint |
| `npm run preview` | Serve the production build locally |

## Project structure

```
src/
├── App.tsx              Router and QueryClient setup, lazy route definitions
├── main.tsx             Entry point: Redux Provider, App, toast container
├── store.ts             Redux store plus RootState, AppDispatch and AppStore types
├── queries.ts           Shared TanStack Query definitions and hooks
├── features/
│   ├── cart/cartSlice.ts    Cart items and totals, persisted to localStorage
│   └── user/userSlice.ts    Logged-in user and JWT, persisted to localStorage
├── pages/               One file per route, each with its own loader or action
├── components/          Reusable UI: product grid and list, filters, form inputs, cart, layout pieces
├── types/index.ts       Types for API responses, cart items, users and loader data
├── utils/index.ts       Axios instance and price formatting
└── assets/              Images used by the landing, about and auth pages
```

## Architecture

### Routing

All routes are defined in `App.tsx` with `createBrowserRouter`. `HomeLayout` wraps the main pages with the navbar, footer and an `<Outlet />`. Login and Register are top-level routes with their own split-screen layout.

Every page is loaded with React Router's `lazy` option. Each route returns its component together with its loader and action, so all three live in one chunk that downloads the first time someone visits that page.

### Dependency injection for loaders and actions

Loaders and actions run outside React, so they can't use hooks. Each page therefore exports a factory that receives what it needs:

```ts
export const loader = (queryClient: QueryClient) => async ({ request }: LoaderFunctionArgs) => { ... }
export const action = (store: AppStore, queryClient: QueryClient) => async ({ request }: ActionFunctionArgs) => { ... }
```

`App.tsx` creates the Redux store and the `QueryClient` once and passes them in. This keeps pages decoupled from global singletons and easier to test.

### Server state: TanStack Query in the loader and the component

Each query is defined once in `src/queries.ts` (key plus fetch function) and used in two places:

1. **In the loader**, `queryClient.ensureQueryData(query)` makes sure the data is in the cache before the page renders. Pages never flash a loading spinner, and there are no request waterfalls.
2. **In the component**, `useQuery(query)` subscribes to the same cache entry. It renders straight from the cache, then refetches in the background when the data goes stale or when the user returns to the tab.

Because both sides use the same definition, the query keys can't drift apart and each page makes a single request on load. The global `staleTime` is 60 seconds.

Cache invalidation:

- A successful checkout invalidates the `orders` query, so the new order appears straight away.
- Logging out removes cached orders from memory.

### Client state: Redux Toolkit

- **`cart` slice:** items, item count, subtotal, tax (10%), shipping and grand total. Totals are recalculated in one reducer, and the whole slice is saved to `localStorage`.
- **`userState` slice:** the logged-in user and their JWT, also saved to `localStorage`.

Loaders and actions read the store directly. For example, the checkout loader redirects to `/` when nobody is logged in, and the checkout action reads the cart and token to place the order.

### Forms and mutations

Login, register, checkout and the product filters use React Router's `<Form>`. Submitting a form calls the route action, or updates the URL for the filters. The product filters live entirely in the URL query string, so filtered views can be shared and bookmarked, and the browser's back button works as expected.

### Type safety

- TypeScript runs in `strict` mode, and the build fails on type errors.
- API responses (products, orders, auth), cart items and loader data all have explicit types in `src/types`.
- Loader data is read with typed `useLoaderData<T>()`, and Redux selectors use `RootState`.
- There are no `any` types. The few non-null assertions (`!`) mark places where a value is guaranteed by the app's flow, for example a user on a protected route.

## Performance optimizations

- **Route-based code splitting.** Each page is its own chunk of roughly 1 to 11 kB, loaded only when needed. axios and the query layer sit in a shared chunk that only data-fetching pages load.
- **No barrel files.** Every module is imported directly from its own file, which keeps the dependency graph explicit and lets the bundler tree-shake and split code cleanly.
- **Request deduplication and caching.** TanStack Query shares one request between the loader and the component, and serves repeat visits from the cache within the stale time.
- **No component loading waterfalls.** Data is fetched in route loaders before the page renders, instead of in `useEffect` after each component mounts.
- **Fonts.** Google Fonts are loaded with `preconnect` and `display=swap`, so text shows immediately.
- **CSS.** Tailwind generates only the classes the app uses.
- **Tree-shaken icons.** Icons are imported one by one from `react-icons`, so only the icons used end up in the bundle.

## Design system

- A custom daisyUI theme (`dstore`) in `tailwind.config.cjs`: terracotta primary, deep green secondary, warm cream backgrounds and charcoal text.
- Fraunces for headings and Inter for body text.
- Shared building blocks: `.align-element` for page width, `.eyebrow` and `.section-title` for section headings, `PageHeader` for page banners with breadcrumbs, and `AuthLayout` for the login and register screens.
- Mobile-first responsive layouts, with a dropdown menu replacing the desktop nav on small screens.

## Deployment

`npm run build` outputs a static site to `dist/`. The `_redirects` file (`/* /index.html 200`) sends every path to `index.html` on Netlify-style hosts, so client-side routes work on refresh.

## Deployed link

- https://app-dstore.netlify.app/
