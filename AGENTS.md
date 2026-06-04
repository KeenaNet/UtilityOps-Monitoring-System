# AGENTS.md — UtilityOps Monitoring System

Actionable guide for AI agents working in this repository. For deep UI/token rules, read **`docs/design-system.md`**. For product scope, read **`docs/prd_utilityops_monitoring_system.md`**. For system structure and target platform, read **`docs/architecture.md`**.

---

## Project snapshot

- **What:** Industrial utility monitoring SPA (electricity, compressor air, water) — dashboards, alarms, manual input, reporting, analytics. Mostly **mock data** in `src/data/`; no backend API in-repo yet.
- **Deploy:** GitHub Pages at `/UtilityOps-Monitoring-System/` (`vite.config.ts` `base`, `npm run deploy`).
- **Auth:** Client-only `useState` gate in `App.tsx` (demo login, not production auth).

---

## Tech stack

| Layer | Choice |
|-------|--------|
| UI | React 18 + TypeScript |
| Build | Vite 5 |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"` in `src/index.css`) |
| Components | shadcn/ui **new-york** (`components.json`) + Radix primitives |
| Variants | CVA + `cn()` (`src/lib/utils.ts`) |
| Charts | Recharts + `useChartTheme()` (`src/components/charts/chartTheme.ts`) |
| Icons | **Target:** `@tabler/icons-react` per PRD; **current:** mixed with `lucide-react` — migrate incrementally, match existing page style |
| Export | jspdf, xlsx (`src/lib/export.ts`) |

---

## Directory layout

```
AGENTS.md                # Agent playbook (repo root — cross-IDE discovery)
docs/                    # PRD, design-system.md, architecture.md
public/                  # Static assets (logo)
src/
  App.tsx                # Auth shell + page switch (no react-router)
  main.tsx               # Theme bootstrap before render
  index.css              # Design tokens, @theme, [data-theme]
  pages/                 # One file per screen (Executive, Dashboard, …)
  components/
    ui/                  # shadcn primitives — extend via CVA, don't fork blindly
    common/              # KpiCard, PageShell, PageIntro, PageDescription, tables
    layout/              # Sidebar, TopBar, ThemeLanguageToggles
    charts/              # chartTheme, ChartTooltip
    filters/             # FilterBar
  context/               # AppState (nav + filters), SettingsContext (theme, i18n)
  data/                  # mock*.ts fixtures
  lib/                   # i18n, settingsStorage, format, export, table utils
```

**Import alias:** `@/` → `src/` (see `vite.config.ts`, `tsconfig` paths).

---

## Key commands

```bash
npm install
npm run dev      # local dev server
npm run build    # tsc -b && vite build — run before claiming UI work done
npm run lint     # eslint
npm run preview  # preview production build
npm run deploy   # gh-pages (after build)
```

---

## Navigation & state

- **Routing:** No React Router. `AppStateProvider` holds `activePage` (`AppPage` union in `src/context/AppState.tsx`); `App.tsx` `switch` renders the page component.
- **Filters:** Shared `AppFilters` on context (`utilityType`, `area`, `status`, `severity`, `pic`, `period`, `dateRange`). Reset via `defaultFilters`.
- **Settings:** `SettingsProvider` wraps the app — `theme`, `language`, `defaultView`, and `t(key)` for i18n.

---

## i18n

- **Languages:** `en` | `id` (`AppLanguage` in `src/lib/settingsStorage.ts`).
- **Keys:** `TranslationKey` + `translate()` in `src/lib/i18n.ts`. Add keys in **both** language maps when adding UI strings.
- **Usage:** `const { t } = useSettings()` — never hardcode nav labels, theme names, or page titles in components.
- **Page copy:** Use `PageDescription` / `PageIntro` with `messageKey` (and optional `values`), not raw PRD requirement IDs (`FR-xxx`) or spec paste in the UI.
- **Toggles:** `ThemeLanguageToggles` on Login and TopBar — keep layout/behavior consistent when changing either.

---

## Theming & design system

**Authoritative doc:** `docs/design-system.md` (keep in sync with code changes).

**Rules agents must follow:**

1. **Semantic tokens only** — `bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `text-destructive`, `bg-warning`, etc. No ad-hoc `text-red-500`, `bg-blue-600`, or hex in `className` unless documented exception.
2. **Two themes:** `dark` (Sleek Dark Mode) and `light` (High Contrast Light). Applied via `document.documentElement.dataset.theme` (`applyThemeToDocument` in `settingsStorage.ts`).
3. **Charts:** Always `useChartTheme()` in chart components. Severity donut/pie: `getSeverityChartColors()` — one distinct chart token per level (never map two severities to the same token).
4. **Touch targets:** ~44×44px on nav, filters, pagination (see design-system checklist).
5. **New UI primitives:** Prefer `src/components/ui/` + CVA; domain pieces in `common/` or `layout/`.

After visual or token changes, update **`docs/design-system.md`** (user expectation from prior sessions).

---

## Coding conventions (observed)

- Functional components, hooks, explicit TypeScript types for page/filter unions.
- `cn()` for conditional classes; `class-variance-authority` for button/badge variants.
- Page layout: `PageShell` + title via `t(pageTitleKeyByPage[page])` or equivalent; lead text via `PageIntro` / `PageDescription`.
- Mock data stays in `src/data/`; pages compose presentation + filters, not embedded magic strings for enums.
- `pageTitles` in `AppState.tsx` is **deprecated** — use i18n keys.
- Simulated loading: `useSimulatedLoading` where skeletons are shown.

---

## Pages map

| `AppPage` | Component |
|-----------|-----------|
| `executive` | `ExecutiveDashboard` |
| `dashboard` | `Dashboard` |
| `shift` | `ShiftDashboard` |
| `analytics` | `Analytics` |
| `anomaly` | `AnomalyDashboard` |
| `manual-input` | `ManualInput` |
| `alarm-center` | `AlarmCenter` |
| `reporting` | `Reporting` |
| `master-data` | `MasterData` |
| `settings` | `Settings` |

---

## What NOT to do

- Do not add a backend or real auth without an explicit user request.
- Do not introduce React Router unless the user asks to refactor navigation.
- Do not hardcode colors that break theme switching (audit pattern: fixed Tailwind palette classes).
- Do not paste PRD requirement codes or internal spec jargon into user-visible copy.
- Do not treat `design-system-gemini.docx` or other external drafts as source of truth — **code + `docs/design-system.md`** win.
- Do not edit attached **plan** files when executing a plan; implement in source only.
- Do not create git commits or push unless the user asks.
- Do not add unrelated dependencies, tests, or docs files unless requested.
- Do not duplicate theme/language toggles with one-off implementations — reuse `ThemeLanguageToggles`.

---

## Verification checklist

- `npm run build` passes after TS/UI changes.
- Theme switch: spot-check dark and light on the touched screen.
- If i18n touched: both `en` and `id` strings present.
- If charts touched: colors react to theme via `useChartTheme()`.

---

## Learned User Preferences

- Prefer **codebase-accurate** design docs; reconcile `docs/design-system.md` against `src/`, not third-party exports alone.
- When fixing UI issues (charts, copy, toggles), keep **Login and app shell** styling consistent.
- User-visible descriptions should read like product copy (sentence case, concise), not PRD traceability strings.
- Icon policy: align with PRD (**Tabler**); large migrations are OK **staged by area** when asked.
- Product docs belong under **`docs/`** (`architecture.md`, `design-system.md`, PRD); the **agent playbook** is **`AGENTS.md`** at repo root for cross-IDE discovery.
- Communicates in **Bahasa Indonesia** and English; match the language of the user’s message for explanations.

---

## Learned Workspace Facts

- Vite `base` is `/UtilityOps-Monitoring-System/` for GitHub Pages.
- Default theme when storage is empty aligns with **dark** (`:root` / `[data-theme='dark']` in `index.css`).
- Chart colors are CSS variables (`--chart-*`) read at runtime through `getChartColors()`.
- Offline UX: `OfflineBanner` in authenticated shell.
- n8n automation is described in PRD/README but **not implemented** in this frontend repo.
- Continual-learning memory for agents is **`AGENTS.md`** at repo root (`agentsMdPath` in `.cursor/hooks/state/continual-learning-index.json`).

---

## Related docs

| Document | Use when |
|----------|----------|
| `docs/architecture.md` | System context, layers, state, mock vs target backend, deploy |
| `docs/design-system.md` | Tokens, components, charts, a11y, maintenance |
| `docs/prd_utilityops_monitoring_system.md` | Features, FR IDs, business rules (not for UI paste) |
| `README.md` | Quick start, high-level feature list |

---

*Last updated from codebase + agent transcripts (Jun 2026). Refresh via continual-learning / `agents-memory-updater` when project conventions change.*
