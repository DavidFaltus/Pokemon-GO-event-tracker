# PoGo Events Tracker — Agent & Developer Standards

Authoritative architecture, design system, and development guidelines for Pokémon GO Event Tracker ([pogoevents.app](https://pogoevents.app)).

---

## 1. Project Overview & Architecture

- **Frontend**: Next.js 16 (App Router + Turbopack), React 19, TypeScript.
  - Generates 4,900+ Static Site Generated (SSG) pages under `out/` synced to `dist/`.
  - Hosted on **Firebase Hosting Edge CDN** with instant sub-50ms TTFB responses.
- **Backend**: Node.js, Express, TypeScript.
  - Multi-CDN ingestion pipeline for ScrapedDuck data (`eggs`, `raids`, `research`, `rocket`).
  - Web scraper with caching layers in `backend/data/`.
  - Token-efficient Markdown endpoints for AI bots and LLMs (`/api/agent/*.md`).
- **Platform / OS Environment**:
  - **OS**: Windows.
  - **Execution Policy**: Always execute `npm.cmd` (e.g., `npm.cmd test`, `npm.cmd run build`) rather than `npm` or `npm.ps1`.

---

## 2. Design System & Visual Standards

The visual design is modeled on the dark glassmorphic UI of **Generátor filtrů** (`FilterGeneratorView`) and **Žebříčky** (`PokemonRankingsView`).

### A. Color Palette & CSS Variables

| Token / Variable | Value | Purpose / Usage |
|---|---|---|
| `--bg-body` | `#060709` | Deep obsidian background for entire viewport |
| `--bg-card` | `#171921` (or `rgba(22, 27, 44, 0.8)`) | Primary card background with blur backdrop |
| `--bg-card-hover` | `#1e212b` | Card hover and active container states |
| `--border-color` | `#242836` (or `rgba(255, 255, 255, 0.1)`) | Crisp card and element borders |
| `--text-primary` | `#f8fafc` | Main headings, Pokémon names, high contrast |
| `--text-secondary` | `#e2e8f0` | Subtitles, descriptions, secondary stats |
| `--text-muted` | `#cbd5e1` (dark) / `#475569` (light) | Metadata, timestamps, placeholders |
| `--accent-color` | `#aa3bff` / `#a855f7` | Neon purple brand accent |
| `--accent-gradient` | `linear-gradient(135deg, #aa3bff 0%, #7e22ce 100%)` | Active tabs, hero buttons, high-priority cards |
| `--cyan-accent` | `#38bdf8` / `#60a5fa` | Secondary interactive highlights and badges |
| `--gold-hundo` | `#facc15` / `#f59e0b` / `#fbbf24` | 100% IV values, trophies, shiny badges |
| `--green-status` | `#22c55e` / `#4ade80` | Active filters, resistances, success pills |
| `--red-status` | `#ef4444` / `#f87171` | DPS filters, Rocket threats, Raid timers |

### B. Layout & Responsive Breakpoints

All page content MUST be wrapped inside `.app-page-content-wrapper` (managed globally in `AppShell.tsx` and `index.css`).

```css
/* Responsive Viewport Spacing Standard */
.app-page-content-wrapper {
  width: 100%;
  max-width: 100%;
  padding: 16px 14px calc(80px + var(--safe-bottom)) 14px; /* Mobile */
  box-sizing: border-box;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .app-page-content-wrapper {
    padding: 22px 20px calc(80px + var(--safe-bottom)) 20px; /* Tablet */
  }
}

@media (min-width: 1024px) {
  .app-page-content-wrapper {
    padding: 28px 36px 48px 36px; /* Desktop with comfortable edge margin */
    max-width: 1440px;
    margin: 0 auto;
    width: 100%;
  }
}

@media (min-width: 1440px) {
  .app-page-content-wrapper {
    padding: 32px 48px 56px 48px; /* Wide screens */
    max-width: 1560px;
    margin: 0 auto;
  }
}
```

- **Avoid Edge Bleeding**: Individual page components must NEVER define hard `margin: 0 auto; max-width: ...` with outer padding that conflicts with `.app-page-content-wrapper`.
- **Top Alignment Rule in Grids**: Always add `align-items: start;` to CSS Grid containers (`display: grid`) so shorter cards do NOT artificially stretch or push content to the bottom.

### C. Component Standards

1. **Cards (`.card`, `.mode-info-card`, `.research-task-card`, `.rankings-header-card`)**:
   - `background-color: var(--bg-card);`
   - `border: 1px solid var(--border-color);`
   - `border-radius: 16px;` (or `14px` for sub-cards)
   - `box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);`
   - `transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;`
   - Hover: `transform: translateY(-2px); border-color: rgba(168, 85, 247, 0.35);`

2. **Pill & Filter Buttons (`.research-pill`, `.mode-toggle-btn`, `.egg-tier-btn`)**:
   - `background-color: var(--bg-card);`
   - `border: 1px solid var(--border-color);`
   - `border-radius: 20px;` (or `100px`)
   - `font-weight: 700; font-size: 0.82rem - 0.88rem;`
   - Active: `background: var(--accent-color)` or `var(--accent-gradient)` with `color: #ffffff` and glowing drop-shadow.

3. **Search Inputs (`.research-search-bar`, `.search-bar-wrapper`)**:
   - Icon on the left (`Search` from `lucide-react`).
   - `background-color: var(--bg-card);`
   - `border: 1px solid var(--border-color);`
   - `border-radius: 12px;`
   - Focus: `border-color: var(--accent-color); box-shadow: 0 0 12px rgba(168, 85, 247, 0.2);`

4. **Typography Hierarchy**:
   - Primary Font: `var(--font-sans)` (`'Outfit', 'Inter', -apple-system, sans-serif`).
   - Page Titles (`.tab-seo-title`): `font-size: 1.5rem - 1.75rem; font-weight: 850; letter-spacing: -0.02em;`.
   - Subtitles (`.tab-seo-description`): `font-size: 0.85rem - 0.9rem; color: var(--text-muted);`.
   - Section Headers: `font-size: 1.15rem - 1.25rem; font-weight: 800;`.
   - Pokemon / Boss Names: `font-size: 0.85rem - 0.95rem; font-weight: 750;`.
   - 100% IV / Hundo Labels: `.gold-hundo-text` (gold gradient with subtle amber drop-shadow).

5. **Light Mode Support (`body.light-mode`)**:
   - All custom components must include explicit light mode overrides:
     - `background-color: #ffffff !important;`
     - `border-color: rgba(15, 23, 42, 0.14) !important;`
     - Text colors: `--text-primary: #0f172a`, `--text-secondary: #1e293b`, `--text-muted: #475569`.

---

## 3. Localization & Multi-Language Support

The application supports 4 languages:
- `cs` (Čeština — Primary / Default)
- `en` (English)
- `ja` (日本語)
- `ru` (Русский)

- Translations live in `frontend/src/data/translations.ts`.
- Pokémon names and forms are translated via `getPokemonName(name, lang)` in `frontend/src/utils/pokemonTranslator.ts`.
- When adding any UI string, always add translations for all 4 languages.

---

## 4. Verification & Testing Commands

Always run and verify these commands before committing changes:

```powershell
# 1. Run Frontend Unit Tests
cd frontend
npm.cmd test

# 2. Run Backend Unit Tests & TypeScript Build
cd ../backend
npm.cmd test
npm.cmd run build

# 3. Verify Next.js Production Static Site Generation
cd ../frontend
npm.cmd run build:deploy
```
