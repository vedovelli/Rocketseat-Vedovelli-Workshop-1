# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev                  # Start dev server (MSW enabled by default)
pnpm build                # Type-check + production build
pnpm lint                 # ESLint
pnpm lint:oxlint          # Fast Rust-based linter (oxlint)

# Tests (three separate configs)
pnpm test                 # Run all suites sequentially
pnpm test:unit            # src/core/__specs__/**/*.spec.ts  (node env)
pnpm test:browser         # src/ui|pattern/**/__specs__/**/*.spec.tsx  (jsdom)
pnpm test:integration     # src/routes/__specs__/**/*.spec.tsx  (jsdom + MSW)

# Run a single test file
pnpm vitest run --config vitest.config.unit.ts src/core/__specs__/utils.spec.ts
```

## Architecture

The codebase is a React 19 SPA with strict layer boundaries enforced by `eslint-plugin-boundaries`.

### Layers (dependency order — lower layers cannot import higher ones)

| Layer | Path | Purpose |
|---|---|---|
| `core` | `src/core/` | HTTP client, auth, query keys/options, Zustand stores, constants. No UI. |
| `ui` | `src/ui/` | Design system primitives. No domain or feature logic. |
| `pattern` | `src/pattern/` | Mid-level composed components (form infra, data grid, error boundaries) built on `ui/` + `core/`. |
| `layouts` | `src/layouts/` | Visual shells that receive `children` (auth, main, onboarding). |
| `features` | `src/features/` | Self-contained feature modules grouping components, hooks, schemas. |
| `routes` | `src/routes/` | Thin layer: guards, prefetch, layout wiring. No business logic. |
| `mocks` | `src/mocks/` | MSW handlers and test setup. |

Allowed imports per layer:
- `core` → core, mocks
- `ui` → ui
- `layouts` → core, ui, layouts
- `pattern` → core, ui, pattern
- `features` → core, ui, pattern, features
- `routes` → core, ui, pattern, layouts, features
- `mocks` → core, mocks, features

### Routing

TanStack Router with file-based routing. Route groups (underscore prefix) share a layout without adding to the URL:

- `_auth` group → `AuthLayout` — public routes (`/login`, `/register`)
- `_main` group → `MainLayout` — authenticated routes (`/dashboard`, `/items`, `/items/$itemId`, `/settings`)
- `routes/index.tsx` redirects `/` → `/dashboard`

The route tree is auto-generated into `src/routeTree.gen.ts` by the Vite plugin — do not edit it manually.

### State

- **Server state** — TanStack Query. Query keys in `core/keys.ts`, query options in `core/queries.ts`.
- **Global client state** — Zustand (`core/session-store.ts` for auth token, `core/app-store.ts` for app prefs).
- **Local UI state** — `useState` / `useReducer`.
- **URL state** — TanStack Router search params.
- Do not use `useEffect` for data fetching, mutations, or derived state.

### Auth

`AuthProvider` (`core/auth-provider.tsx`) wraps the app in `__root.tsx`. It checks `core/session-store.ts` (localStorage-persisted) on mount to restore sessions. The `auth.login()` call sets a mock token; swap this for a real API call when a backend exists. No route-level guards are implemented yet.

### Forms

TanStack React Form + Valibot schemas. Use the `FormFieldWrapper` pattern from `src/pattern/form.tsx` for consistent field rendering.

### API / Mocking

`httpResource` (`core/http-resource.ts`) is the HTTP utility. It injects the Bearer token and parses RFC 7807 errors. MSW handlers in `src/mocks/handlers.ts` intercept requests in dev; disabled in production or when `VITE_USE_MOCK=false`.

## Conventions

- No barrel exports (`index.ts` re-exports are forbidden).
- Prefer `type` over `interface`.
- Use path aliases (`@core/*`, `@ui/*`, `@features/*`, etc.) for cross-layer imports — no relative `../` across layers.
- Centralize query keys in `core/keys.ts` and query options in `core/queries.ts`.
- Avoid type casts; fix types at the source.
- Component variants use CVA (`class-variance-authority`) — see `ui/*.variants.ts` files for the pattern.
- Tests live in `__specs__/` subdirectories next to the code they test.
