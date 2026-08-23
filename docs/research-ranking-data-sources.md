# Research: Pokémon GO Rankings Data Sources

**Date**: 2026-08-23
**Question**: Where does db.pokemongohub.net get its data, and why is our ranking section missing many Pokémon?

---

## 1. db.pokemongohub.net Analysis

### Data Origin
- Stats derived from **PokeMiners GameMaster** files (Niantic server config files decoded by the community).
- Rankings use **EER/TER** formulas (Elastic_Space / Reddit) — modification of DPS³×TDO.
- Credits DialgaDex for DPS/eDPS formulas and PvPoke for PvP data.
- Page is **client-side rendered** — SSR HTML only has loading placeholders, actual Pokemon data loaded via JS.
- **No public API** — internal endpoints only, scraping discouraged.

### Scope
The site covers **every Pokemon in the GameMaster** including all forms (Normal, Shadow, Mega, Primal, Dynamax), all generations through Gen 9.

---

## 2. Our Current Data Source

### File: frontend/src/data/pokemonRankings.ts
- **~1,186 entries** (32,377 lines) — static hardcoded TypeScript array.
- Each entry: name, pokedexId, types, attack, defense, stamina, maxCp, pveScore, dps, bestFastMove, bestChargedMove, isShadow, isMega, isPrimal, generation.
- **No dynamic data fetching** — entirely static, manually curated.
- The pokemonReleaseHelper.ts filters unreleased Pokemon for display.

### Gap Analysis
pokemongohub.net lists potentially **2,000+** Pokemon forms as attackers (normal + shadow + mega + each moveset combo), while we have ~1,186 entries. Many mid-tier and lower-tier Pokemon are missing entirely, not just niche forms.

---

## 3. Available Public APIs

### A. PoGoAPI.net (pogoapi.net/api/v1/pokemon_stats.json)
- **Free, no auth required**, JSON endpoints.
- Provides: base_attack, base_defense, base_stamina, form, pokemon_id, pokemon_name.
- Covers all released + unreleased Pokemon from GameMaster.
- **Missing**: Move data (separate endpoints), DPS calculations.

### B. Pokemon GO Pokedex API (pokemon-go-api.github.io/pokemon-go-api/api/pokedex.json)
- **Free, no auth**, GitHub Pages hosted.
- **Complete data**: stats, types, quickMoves, cinematicMoves with power/energy/duration, names in multiple languages (EN, JA, etc.).
- Covers all forms including Mega, regional variants.
- **Best fit** — includes everything needed to calculate DPS/TDO/ER ourselves.

### C. PokeMiners GameMaster (github.com/PokeMiners/game_masters)
- Raw latest.json — the ultimate source of truth.
- Requires heavy parsing, obfuscated field names.
- All APIs above derive from this.

---

## 4. Recommendation

Use the **Pokemon GO Pokedex API** as the primary data source:
1. Fetch pokedex.json at build time (or via backend scraper on schedule).
2. Calculate DPS/TDO/ER metrics from the move data + base stats.
3. Generate pokemonRankings.ts automatically instead of maintaining it manually.
4. This would give us **complete coverage** matching pokemongohub.net.
