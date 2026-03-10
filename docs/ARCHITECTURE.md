# SPA Blueprint – Architecture

## Layers and responsibilities

- **core/** – Technical foundation: HTTP client, API routes, query keys/options, global stores, auth, utilities, constants, shared schemas. No UI.
- **ui/** – Design system and reusable primitives. No domain or feature logic.
- **pattern/** – Mid-level composed components and shared patterns built on `ui/` and `core/` (e.g. form infra, data grid, error boundaries). No feature-specific logic.
- **layouts/** – Structural shells. Receive `children` and define the visual layout (auth, main, onboarding).
- **features/** – Self-contained feature modules. Each feature groups its components, hooks, schemas, and utilities.
- **routes/** – Thin route layer. Handle guards, prefetch, layout composition, and wiring to feature components.
- **mocks/** – MSW handlers and setup for development and tests.

## Dependency rules

- **core** → core, mocks only
- **ui** → ui only
- **layouts** → core, ui, layouts
- **pattern** → core, ui, pattern
- **features** → core, ui, pattern, features
- **routes** → core, ui, pattern, layouts, features
- **mocks** → core, mocks, features

Enforced via `eslint-plugin-boundaries`.

## Conventions

- No barrel exports (no `index.ts` re-exports).
- Prefer `type` over `interface`.
- Prefer pure functions over classes.
- Use path aliases (`@core/*`, `@ui/*`, etc.) instead of relative imports across layers.
- Avoid type casts; fix types at the source.
- Centralize query keys in `core/keys.ts` and query options in `core/queries.ts`.
- Routes stay thin; business logic lives in features or core.
- `ui/` must not depend on domain; `pattern/` must not depend on a specific feature.
- Form validation is schema-driven (Valibot).

## State

- **Server state** – TanStack Query.
- **Local UI state** – `useState` / `useReducer`.
- **Global client state** – Zustand (small, focused stores).
- **Compound components** – React Context.
- **URL state** – TanStack Router search params.

Avoid using `useEffect` for data fetching, mutations, or derived state.

## Bootstrap order

1. In dev with mock mode enabled: start MSW before render.
2. Initialize auth before React render (if needed).
3. Create query client and router (with context).
4. Render with StrictMode, QueryClientProvider, RouterProvider.

## Path aliases

- `@/*` → `src/*`
- `@core/*` → `src/core/*`
- `@ui/*` → `src/ui/*`
- `@pattern/*` → `src/pattern/*`
- `@features/*` → `src/features/*`
- `@layouts/*` → `src/layouts/*`
- `@routes/*` → `src/routes/*`
- `@mocks/*` → `src/mocks/*`
