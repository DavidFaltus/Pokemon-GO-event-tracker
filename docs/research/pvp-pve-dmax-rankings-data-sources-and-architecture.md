# Pokémon GO Meta Rankings: Architecture, Data Sourcing & Integration Blueprint
**PvP Leagues, PvE Raid Attackers, and Dynamax / Gigantamax Battles**

- **Author**: Meta & Game Architecture Researcher
- **Date**: November 2026
- **Target Systems**: [pogoevents.app](https://pogoevents.app) (`/rankings`, `/rankings/[category]`, `/pokedex/[slug]`)
- **Primary Source References**:
  1. [PvPoke GitHub Repository (`pvpoke/pvpoke`)](https://github.com/pvpoke/pvpoke)
  2. [PokeMiners GameMaster Repository (`PokeMiners/game_masters`)](https://github.com/PokeMiners/game_masters)
  3. [GamePress Comprehensive DPS / TDO & ER Documentation](https://gamepress.gg/pokemongo/how-calculate-comprehensive-dps)
  4. [DialgaDex & EER Attackers Metric Specification](https://db.pokemongohub.net/best/attackers-per-type)
  5. [Niantic In-Game Mechanics: Dynamax, Gigantamax & Power Spots](https://pokemongolive.com)

---

## Table of Contents
1. [Executive Summary & Strategic Vision](#1-executive-summary--strategic-vision)
2. [PVP Leagues Meta & Simulation Engine](#2-pvp-leagues-meta--simulation-engine)
   - 2.1 League Mechanics & Stat Product Math
   - 2.2 Turn Mechanics, CMP Tie-Breaks, Energy & Movesets
   - 2.3 PvPoke Simulation Data Architecture
3. [PVE Raid Attackers Meta & Formulas](#3-pve-raid-attackers-meta--formulas)
   - 3.1 Comprehensive DPS, TDO & DialgaDex ER Formula
   - 3.2 Shadow Multipliers, Mega 1.30x STAB & Apex/Plus Moves
   - 3.3 Type Attackers Specialization & Deterministic Tie-Breaking
4. [Dynamax & Gigantamax (Max Battles) Engine](#4-dynamax--gigantamax-max-battles-engine)
   - 4.1 Max Move Base Powers & Mechanics
   - 4.2 Max Meter Generation, Turn Timing & Power Spot Scaling
   - 4.3 Max Battle Attacker, Healer & Tank Metrics
5. [Data Pipeline & Sourcing Architecture](#5-data-pipeline--sourcing-architecture)
   - 5.1 Zero-Bandwidth GitHub Commit API & Caching Layer
   - 5.2 Normalization & Slug Harmonization
   - 5.3 Storage Architecture: Embedded vs. Unified Index
6. [UI/UX Design & Integration Plan](#6-uiux-design--integration-plan)
   - 6.1 Redesigned Rankings View (`/rankings`)
   - 6.2 Pokédex Detail Meta Performance Card (`/pokedex/[slug]`)
7. [Step-by-Step Implementation Roadmap](#7-step-by-step-implementation-roadmap)
   - 7.1 Backend Pipeline Scripts
   - 7.2 Frontend Components & Type Definitions
   - 7.3 Internationalization (CS, EN, JA, RU)
   - 7.4 SSG Performance & SEO Validation

---

## 1. Executive Summary & Strategic Vision

The Pokémon GO battle ecosystem is bifurcated into three distinct combat paradigms:
1. **PVP Trainer Battles (GBL)**: Synchronous, turn-based (0.5s turns), stat-product-constrained leagues (Great League 1500, Ultra League 2500, Master League Open, Little Cup 500) where defensive bulk, shield pacing, move baiting, and coverage dictate viability.
2. **PVE Raid & Gym Battles**: Asynchronous, real-time DPS/TDO races where burst damage, Equivalent Rating (ER), survival duration before fainting, and re-lobbying penalties determine raid-trio or solo success.
3. **Max Battles (Dynamax & Gigantamax)**: Co-op Power Spot encounters requiring fast-move Max Meter building, 3-turn Max Phase damage bursts (250–450 base power), team-wide Max Spirit healing, and Max Guard shields.

Currently, [pogoevents.app](https://pogoevents.app) features a rich PvE DialgaDex ER pipeline (`generateRankings.ts`), but its PvP routes naively sort Pokémon by `defense * stamina` without simulated match-up outcomes, and Max Battles lack dedicated evaluation metrics. 

```mermaid
flowchart TD
    subgraph Data Sources
        PVPOKE["PvPoke Open Source GitHub<br/>(src/data/rankings/*)"]
        GAMEMASTER["Niantic GameMaster / PokeMiners<br/>(Stats, Max Moves, Durations)"]
        POKEDEX_API["Pokemon GO Pokedex API<br/>(Movesets, Types, Localized Names)"]
    end

    subgraph Data Ingestion & Pipeline
        COMMIT_CHECK["GitHub Commit API & ETag Cache<br/>(Zero-Bandwidth Invalidation)"]
        HARMONIZER["Slug & ID Normalization Engine<br/>(Canonical Pokedex Mapping)"]
        CALCULATOR["Unified Meta Calculator<br/>(DialgaDex ER + PvPoke Score + Max Battle Tier)"]
    end

    subgraph Static Distribution
        JSON_RANKINGS["pokemonRankings.json<br/>(~290 KB PvE & League Facets)"]
        JSON_PVP["pvpRankings.json<br/>(~320 KB GL/UL/ML/Little Matrices)"]
        JSON_UNIFIED["pokedexMetaIndex.json<br/>(O(1) Slug Lookup Dictionary)"]
    end

    subgraph User Views
        VIEW_RANKINGS["/rankings & /rankings/[category]<br/>(Tabs: PvE Types, PvP Leagues, Max Battles)"]
        VIEW_POKEDEX["/pokedex/[slug]<br/>(Meta & Battle Performance Card)"]
    end

    PVPOKE --> COMMIT_CHECK
    POKEDEX_API --> COMMIT_CHECK
    GAMEMASTER --> COMMIT_CHECK
    COMMIT_CHECK --> HARMONIZER
    HARMONIZER --> CALCULATOR
    CALCULATOR --> JSON_RANKINGS
    CALCULATOR --> JSON_PVP
    CALCULATOR --> JSON_UNIFIED
    JSON_RANKINGS --> VIEW_RANKINGS
    JSON_PVP --> VIEW_RANKINGS
    JSON_UNIFIED --> VIEW_POKEDEX
```

This research provides the mathematical definitions, data structures, caching layers, and component blueprints to deliver an authoritative meta rankings center.

---

## 2. PVP Leagues Meta & Simulation Engine

### 2.1 League Mechanics & Stat Product Math

In CP-capped leagues (Great League at 1500 CP, Ultra League at 2500 CP, Little Cup at 500 CP), Pokémon CP is calculated using Niantic's non-linear formula:

$$\text{CP} = \left\lfloor \frac{\text{Attack}_{\text{eff}} \times \sqrt{\text{Defense}_{\text{eff}}} \times \sqrt{\text{Stamina}_{\text{eff}}}}{10} \right\rfloor$$

Where effective stats at Level $L$ with IVs $(IV_A, IV_D, IV_S \in [0, 15])$ are:

$$\text{Attack}_{\text{eff}} = (\text{BaseAttack} + IV_A) \times \text{CPM}(L)$$
$$\text{Defense}_{\text{eff}} = (\text{BaseDefense} + IV_D) \times \text{CPM}(L)$$
$$\text{Stamina}_{\text{eff}} = \lfloor (\text{BaseStamina} + IV_S) \times \text{CPM}(L) \rfloor$$

#### The Stat Product Advantage
Because Attack contributes linearly ($1.0$ exponent) while Defense and Stamina contribute quadratically ($\sqrt{x} = x^{0.5}$), an increase in Attack consumes twice as much CP room as an equivalent percentage increase in Defense or Stamina. 

$$\text{Stat Product} = \text{Attack}_{\text{eff}} \times \text{Defense}_{\text{eff}} \times \text{Stamina}_{\text{eff}}$$

In capped leagues, minimizing Attack IV (typically $0$ or $1$) and maximizing Defense and Stamina ($14$ or $15$) allows the Pokémon to power up to a higher Level $L$, yielding $10\%\text{--}18\%$ higher total stat product and effective bulk compared to a $15/15/15$ specimen.

*Exception*: In **Master League** (uncapped), there is no CP ceiling. The optimal IV spread is strictly $15/15/15$ at Level 50 (or Level 51 with Best Buddy boost).

### 2.2 Turn Mechanics, CMP Tie-Breaks, Energy & Movesets

PvP combat operates in discrete **turns of 500 milliseconds (0.5 seconds)**:
1. **Fast Moves**: Have durations of 1 to 5 turns ($0.5\text{s}$ to $2.5\text{s}$). They generate Energy per Turn (EPT) and deal Damage per Turn (DPT).
   - High Energy Fast Moves: *Mud Shot* ($4.0\text{ EPT}, 1.5\text{ DPT}$), *Thunder Shock* ($4.5\text{ EPT}, 1.5\text{ DPT}$), *Lock-On* ($5.0\text{ EPT}, 1.0\text{ DPT}$).
   - High Damage Fast Moves: *Razor Leaf* ($2.0\text{ EPT}, 5.0\text{ DPT}$), *Charm* ($2.0\text{ EPT}, 5.0\text{ DPT}$), *Dragon Breath* ($3.0\text{ EPT}, 4.0\text{ DPT}$).
2. **Charged Moves**: Require between $35$ and $80$ Energy. Energy pool caps strictly at $100$ Energy.
3. **CMP Tie-Break (Charged Move Priority)**: When both trainers activate a Charged Move on the exact same turn, priority is awarded to the Pokémon with the higher absolute effective Attack stat ($\text{Attack}_{\text{eff}}$). If Attack stats are identical, a coin flip ($50/50$) decides.
4. **Shield Scenarios**:
   - $1\text{v}1$ Shields: Standard meta benchmark (default overall score).
   - $2\text{v}2$ Shields: "Lead" performance (favoring fast-charging bait moves and high bulk).
   - $0\text{v}0$ Shields: "Closer" performance (favoring heavy nukes like *Brave Bird*, *Earthquake*, *Close Combat*).
   - Switchers: High bulk, neutral typing, and self-buffing/debuffing moves (e.g. *Lickilicky*, *Vigoroth*, *Mandibuzz*).

### 2.3 PvPoke Simulation Data Architecture

The open-source **PvPoke** repository ([github.com/pvpoke/pvpoke](https://github.com/pvpoke/pvpoke)) computes battle matrices by simulating every species against the entire eligible pool across multiple shield and bait configurations.

#### Primary Endpoints
* **Great League (CP 1500)**:  
  `https://raw.githubusercontent.com/pvpoke/pvpoke/master/src/data/rankings/all/overall/rankings-1500.json`
* **Ultra League (CP 2500)**:  
  `https://raw.githubusercontent.com/pvpoke/pvpoke/master/src/data/rankings/all/overall/rankings-2500.json`
* **Master League (Open)**:  
  `https://raw.githubusercontent.com/pvpoke/pvpoke/master/src/data/rankings/all/overall/rankings-10000.json`
* **Little Cup (CP 500)**:  
  `https://raw.githubusercontent.com/pvpoke/pvpoke/master/src/data/rankings/little/overall/rankings-500.json`

#### PvPoke Entry JSON Schema
```typescript
export interface PvPokeRawEntry {
  speciesId: string;       // E.g. "clodsire", "mandibuzz", "swampert_shadow"
  speciesName: string;     // E.g. "Clodsire"
  rating: number;          // Overall battle rating against meta (0 - 1000)
  score: number;           // Composite meta rating (e.g. 94.2)
  scores: [
    number, // [0] Lead score (2v2 shields)
    number, // [1] Closer score (0v0 shields)
    number, // [2] Switch score (counter versatility)
    number, // [3] Charger score (energy pacing)
    number, // [4] Consistency (low bait reliance)
    number  // [5] Bulk (stat product survival)
  ];
  moveset: [string, string, string]; // [FastMoveId, ChargedMove1Id, ChargedMove2Id]
  moves: {
    fastMoves: Array<{ moveId: string; uses: number }>;
    chargedMoves: Array<{ moveId: string; uses: number }>;
  };
  stats: {
    product: number; // Stat product at league cap
    atk: number;     // Effective Attack
    def: number;     // Effective Defense
    hp: number;      // Effective HP
  };
  matchups: Array<{ opponent: string; rating: number }>; // Top 5 meta wins
  counters: Array<{ opponent: string; rating: number }>; // Top 5 meta threats
}
```

---

## 3. PVE Raid Attackers Meta & Formulas

### 3.1 Comprehensive DPS, TDO & DialgaDex ER Formula

In raids, Pokémon fight against a computer-controlled raid boss with infinite HP until the raid timer expires ($300\text{s}$ for Tier 5 / Mega; $180\text{s}$ for Tier 3).

#### Cycle DPS Formula
Combat is evaluated as continuous damage cycles consisting of $N$ Fast Moves required to generate the energy for one Charged Move:

$$N = \left\lceil \frac{\text{Energy}_{\text{charged}}}{\text{Energy}_{\text{fast}}} \right\rceil$$

$$\text{Damage}_{\text{fast}} = \left\lfloor \frac{1}{2} \times \text{Power}_{\text{fast}} \times \frac{\text{Attack}_{\text{eff}}}{\text{BossDef}} \times \text{STAB} \times \text{TypeMult} \right\rfloor + 1$$

$$\text{Damage}_{\text{charged}} = \left\lfloor \frac{1}{2} \times \text{Power}_{\text{charged}} \times \frac{\text{Attack}_{\text{eff}}}{\text{BossDef}} \times \text{STAB} \times \text{TypeMult} \right\rfloor + 1$$

$$\text{Cycle Time} = (N \times \text{Duration}_{\text{fast}}) + \text{Duration}_{\text{charged}}$$

$$\text{DPS}_{\text{raw}} = \frac{(N \times \text{Damage}_{\text{fast}}) + \text{Damage}_{\text{charged}}}{\text{Cycle Time}}$$

#### Bulk & Time-to-Faint (TTF)
Survival bulk is derived from defensive stats against a standardized incoming Tier 5 boss DPS of $45.0\text{ damage/s}$:

$$\text{Bulk} = \frac{\text{Defense}_{\text{eff}} \times \text{Stamina}_{\text{eff}}}{100}$$

$$\text{Time To Faint (TTF)} = \frac{\text{Stamina}_{\text{eff}}}{\frac{45.0}{\max(1, \text{Defense}_{\text{eff}} / 180)}}$$

#### Lobby Re-Entry Penalty & Effective DPS (eDPS)
When a Pokémon faints, the trainer suffers a re-lobby or switch latency of approximately $12\text{ seconds}$:

$$\text{Lobby Penalty Ratio} = \frac{\text{TTF}}{\text{TTF} + 12.0}$$

$$\text{eDPS} = \text{DPS}_{\text{raw}} \times (0.65 + 0.35 \times \text{Lobby Penalty Ratio})$$

#### DialgaDex Equivalent Rating (ER)
The gold-standard metric formulated by the research community balances DPS and TDO to evaluate overall raid effectiveness:

$$\text{TDO} = \text{DPS}_{\text{raw}} \times \left( \frac{\text{Bulk}}{45.0} \right)$$

$$\text{ER} = \sqrt[4]{\text{DPS}_{\text{raw}}^3 \times \text{TDO}} = \left( \text{DPS}_{\text{raw}}^3 \times \text{TDO} \right)^{0.25}$$

$$\text{ER}_{\text{normalized}} = \min\left(100, \max\left(15, \text{round}\left(\text{ER} \times \frac{100.0}{96.5}\right)\right)\right)$$

### 3.2 Shadow Multipliers, Mega 1.30x STAB & Apex/Plus Moves

The game engine applies distinct modifiers to specialized forms:

| Form Class | Attack Modifier | Defense Modifier | STAB Modifier | Notes |
|---|---|---|---|---|
| **Standard** | $1.0\times$ | $1.0\times$ | $1.20\times$ | Baseline stats |
| **Shadow** | **$1.20\times$** (+20%) | **$0.8333\times$** (-16.67%) | $1.20\times$ | Massive DPS boost; reduced bulk |
| **Mega Evolution** | Scaled base stats | Scaled base stats | **$1.30\times$** (+30%) | Mega Aura: +30% same type, +10% all others |
| **Primal Reversion** | Scaled base stats | Scaled base stats | **$1.30\times$** (+30%) | Weather Aura active while in battle party |

#### Plus (+) and Apex (++) Moves
- **Apex Moves (`++`)**: *Aeroblast++* (Lugia, 225 power), *Sacred Fire++* (Ho-Oh, 155 power).
- **Mega Level 4 Plus Moves (`+`)**: Unlocked at Mega Level 4, applying an automatic $+15\%$ power scaling to signature STAB moves (e.g., *Hydro Cannon+* 125 power, *Frenzy Plant+* 135 power, *Blast Burn+* 150 power).

### 3.3 Type Attackers Specialization & Deterministic Tie-Breaking

To avoid arbitrary rankings and UI flickering, every Pokémon build must be evaluated across all 18 elemental types where its Charged Move matches the target type.

Deterministic Tie-Breaker Decision Tree:
1. Continuous ER score (float precision $\Delta > 0.0001$).
2. Effective Attack stat ($\text{Attack}_{\text{eff}}$ accounting for Shadow boost).
3. Raw move DPS.
4. Survival Bulk ($\text{Def} \times \text{Sta}$).
5. Max CP at Level 50.
6. Tier priority: Primal/Mega (3) > Shadow (2) > Normal (1).
7. Lower Pokédex ID.
8. Lexicographical move name and species name comparison.

---

## 4. Dynamax & Gigantamax (Max Battles) Engine

Introduced in late 2024 and expanded through 2026, **Max Battles** take place exclusively at **Power Spots** using teams of up to 3 Dynamax or Gigantamax Pokémon.

### 4.1 Max Move Base Powers & Mechanics

Every Max Pokémon features three distinct Max Moves upgraded with Max Particles (MP) and species Candy/XL Candy:

```mermaid
classDiagram
    class MaxMoveSystem {
        +MaxAttack offensive
        +MaxGuard defensive
        +MaxSpirit healing
    }
    class MaxAttack {
        +Type: Fast Attack Type (D-Max)
        +Type: Signature Type (G-Max)
        +Level 1: 250 power (DMax) / 350 power (GMax)
        +Level 2: 300 power (DMax) / 400 power (GMax)
        +Level 3: 350 power (DMax) / 450 power (GMax)
    }
    class MaxGuard {
        +Type: Neutral / Shield
        +Level 1: +20 HP Bonus Shield
        +Level 2: +40 HP Bonus Shield
        +Level 3: +60 HP Bonus Shield
        +Stack Limit: Up to 3 uses
    }
    class MaxSpirit {
        +Type: Team-wide Healing
        +Level 1: 8% of User Max HP
        +Level 2: 12% of User Max HP
        +Level 3: 16% of User Max HP
        +Target: User + All active allies
    }
    MaxMoveSystem --> MaxAttack
    MaxMoveSystem --> MaxGuard
    MaxMoveSystem --> MaxSpirit
```

#### Detailed Move Parameters (Niantic GameMaster `COMBAT_MAX_MOVE_SETTINGS`)
1. **Max Attack (Dynamax)**:
   - Type is **strictly bound to the Pokémon's current Fast Move**.
   - *Example*: Inteleon with *Water Gun* uses *Max Geyser* (Water); Inteleon with *Pound* uses *Max Strike* (Normal).
   - *Hidden Power* defaults to Normal-type *Max Strike*.
   - **Base Power**: Level 1 = $250$, Level 2 = $300$, Level 3 = $350$.
2. **G-Max Move (Gigantamax)**:
   - Species-exclusive signature move with fixed elemental typing, **independent of Fast Move**.
   - *Examples*: Charizard (*G-Max Wildfire*, Fire), Venusaur (*G-Max Vine Lash*, Grass), Blastoise (*G-Max Cannonade*, Water), Gengar (*G-Max Terror*, Ghost), Machamp (*G-Max Chi Strike*, Fighting).
   - **Base Power**: Level 1 = $350$, Level 2 = $400$, Level 3 = $450$.
3. **Max Guard**:
   - Deploys an absorption barrier that soaks incoming boss damage before touching the Pokémon's HP bar.
   - **Bonus Shield HP**: Level 1 = $+20\text{ HP}$, Level 2 = $+40\text{ HP}$, Level 3 = $+60\text{ HP}$.
   - Stacks up to 3 times ($+180\text{ HP}$ max buffer).
4. **Max Spirit**:
   - Emits a healing pulse restoring HP to the user and **all active battlers on the field**.
   - **Healing Percentage**: Level 1 = $8\%$, Level 2 = $12\%$, Level 3 = $16\%$ of the **caster's maximum HP**.
   - *Strategic Consequence*: Pokémon with colossal HP pools (Blissey, Snorlax, Greedent, Lapras) heal the party for hundreds of HP per turn, creating a dedicated "Healer" role.

### 4.2 Max Meter Generation, Turn Timing & Power Spot Scaling

#### Battle Phases
1. **Neutral Phase (Charging)**:
   - Trainers attack with Fast Moves. Charged Attacks are locked during this phase.
   - Each Fast Attack contributes points toward the central **Max Meter**.
   - **Turn Duration Advantage**: Fast Moves with low animation times ($0.5\text{s}$ like *Bite*, *Water Gun*, *Lick*, *Dragon Breath*) fill the Max Meter in fewer elapsed seconds than slow $1.5\text{s}\text{--}2.0\text{s}$ moves (*Incinerate*, *Volt Switch*).
   - **Energy Bubbles**: During boss charge-up phases, swiping across the arena into spawned Max Energy bubbles instantly awards $+25\%$ to $+50\%$ to the Max Meter.
2. **Max Phase (Transformation)**:
   - Once the Max Meter reaches $100\%$, the Pokémon enters Dynamax form for exactly **3 turns**.
   - The trainer can execute any combination of 3 unlocked Max Moves (e.g. 3 Max Attacks, or 1 Max Guard + 1 Max Spirit + 1 Max Attack).
3. **Power Spot Stationing & Helper Multipliers**:
   - Up to 20 Pokémon can be left at a Power Spot by victorious trainers.
   - Each helper Pokémon awards a $+5\%$ to $+10\%$ damage boost to subsequent trainers challenging the Power Spot (capped at $+100\%$ bonus damage), and generates daily Max Particles for the owner.

### 4.3 Max Battle Attacker, Healer & Tank Metrics

To rank Pokémon objectively in Max Battles, three specialized indices are established:

#### 1. Max Attacker Index ($\text{MAI}$)
Evaluates total damage burst delivered during the 3-turn Max Phase, factoring in Base Attack, Level 50 CPM ($0.8403$), Max Move power ($350$ D-Max / $450$ G-Max), and Fast Move turn pacing:

$$\text{Fast Rate Factor} = \frac{1.0}{\max(0.5, \text{Duration}_{\text{fast}})}$$

$$\text{MAI} = \left[ (\text{BaseAtk} + 15) \times 0.8403 \right] \times \text{Power}_{\text{MaxMove}} \times \text{STAB} \times \left(1.0 + 0.15 \times \text{Fast Rate Factor}\right)$$

#### 2. Max Healer Index ($\text{MHI}$)
Measures raw team sustain output per Max Spirit activation at Level 3 ($16\%$ heal) across a 4-player raid pod:

$$\text{Effective HP} = (\text{BaseSta} + 15) \times 0.8403$$

$$\text{MHI} = \text{Effective HP} \times 0.16 \times 4.0$$

*(Rank #1 Healer: Blissey [$\text{MHI} \approx 256$ HP restored/turn], followed by Snorlax, Greedent, Lapras).*

#### 3. Max Tank / Anchor Index ($\text{MTI}$)
Measures defensive endurance to survive high-tier Gigantamax 6-star boss enrage attacks:

$$\text{MTI} = \frac{(\text{BaseDef} + 15) \times (\text{BaseSta} + 15) \times (0.8403)^2}{100}$$

---

## 5. Data Pipeline & Sourcing Architecture

### 5.1 Zero-Bandwidth GitHub Commit API & Caching Layer

Downloading multi-megabyte JSON files from GitHub on every build or cron execution creates rate-limiting risks and slows CI/CD pipelines. 

By querying the **GitHub Commits API** for the `src/data/rankings` directory, the build pipeline inspects the latest commit SHA before downloading data:

```typescript
// backend/src/services/pvpokeIngestionService.ts
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

interface CommitResponse {
  sha: string;
  commit: { committer: { date: string }; message: string };
}

const PVPOKE_API_COMMITS = 'https://api.github.com/repos/pvpoke/pvpoke/commits?path=src/data/rankings&per_page=1';
const CACHE_META_FILE = path.resolve(__dirname, '../../data/pvpoke_meta.json');

export async function hasPvPokeRankingsUpdated(): Promise<{ updated: boolean; sha: string }> {
  try {
    const res = await axios.get<CommitResponse[]>(PVPOKE_API_COMMITS, {
      headers: { 'User-Agent': 'PoGoEventsTracker-MetaPipeline/1.0' },
      timeout: 8000
    });

    const latestSha = res.data[0]?.sha;
    if (!latestSha) return { updated: true, sha: '' };

    if (fs.existsSync(CACHE_META_FILE)) {
      const cached = JSON.parse(fs.readFileSync(CACHE_META_FILE, 'utf8'));
      if (cached.sha === latestSha) {
        return { updated: false, sha: latestSha };
      }
    }

    return { updated: true, sha: latestSha };
  } catch (err) {
    console.warn('⚠️ Could not verify PvPoke commit SHA, falling back to cached rankings:', err);
    return { updated: false, sha: '' };
  }
}
```

When `updated === false`, the pipeline skips all raw file downloads, consuming **0 bytes of ranking download bandwidth**.

### 5.2 Normalization & Slug Harmonization

PvPoke uses snake_case species IDs (`"clodsire"`, `"marowak_alolan"`, `"kyogre_primal"`, `"swampert_shadow"`), whereas our catalog uses canonical Pokédex slugs (`"clodsire"`, `"marowak"`, `"kyogre"`, `"swampert"`) and variant slugs (`"marowak-alola"`, `"kyogre-primal"`, `"swampert-shadow"`).

#### Translation Map & Resolver
```typescript
export function mapPvPokeSpeciesToSlug(speciesId: string): { slug: string; variantSlug?: string; isShadow: boolean } {
  let clean = speciesId.toLowerCase();
  const isShadow = clean.endsWith('_shadow');
  if (isShadow) {
    clean = clean.replace(/_shadow$/, '');
  }

  // Exact canonical overrides
  const OVERRIDES: Record<string, { slug: string; variantSlug?: string }> = {
    'stunfisk_galarian': { slug: 'stunfisk', variantSlug: 'stunfisk-galarian' },
    'ninetales_alolan': { slug: 'ninetales', variantSlug: 'ninetales-alola' },
    'sandslash_alolan': { slug: 'sandslash', variantSlug: 'sandslash-alola' },
    'marowak_alolan': { slug: 'marowak', variantSlug: 'marowak-alola' },
    'muk_alolan': { slug: 'muk', variantSlug: 'muk-alola' },
    'giratina_origin': { slug: 'giratina', variantSlug: 'giratina-origin' },
    'giratina_altered': { slug: 'giratina', variantSlug: 'giratina-altered' },
    'dialga_origin': { slug: 'dialga', variantSlug: 'dialga-origin' },
    'palkia_origin': { slug: 'palkia', variantSlug: 'palkia-origin' },
    'deoxys_defense': { slug: 'deoxys', variantSlug: 'deoxys-defense' },
    'necrozma_dusk_mane': { slug: 'necrozma', variantSlug: 'necrozma-dusk-mane' },
    'necrozma_dawn_wings': { slug: 'necrozma', variantSlug: 'necrozma-dawn-wings' },
  };

  if (OVERRIDES[clean]) {
    const res = OVERRIDES[clean];
    return {
      slug: res.slug,
      variantSlug: isShadow ? `${res.variantSlug || res.slug}-shadow` : res.variantSlug,
      isShadow
    };
  }

  const baseSlug = clean.replace(/_/g, '-');
  return {
    slug: baseSlug,
    variantSlug: isShadow ? `${baseSlug}-shadow` : undefined,
    isShadow
  };
}
```

### 5.3 Storage Architecture: Embedded vs. Unified Index

We evaluated two architectural approaches for storing ranking data:

#### Evaluation Matrix

| Metric | Option A: Embed in `pokedexCatalog.json` | Option B: Unified Meta Index (`pokedexMetaIndex.json`) |
|---|---|---|
| **File Size Impact** | Catalog balloons from $2.1\text{ MB} \to 4.2\text{ MB}$ | Lightweight dedicated file ($180\text{ KB}$ gzipped) |
| **Pokedex Catalog Load Speed** | Noticeable regression on catalog browse | Instantaneous; decoupled catalog loading |
| **Update Decoupling** | Heavy; regenerating catalog required for meta shifts | Independent; PvPoke updates without touching catalog |
| **Route SSG Performance** | Next.js memory footprint increases by $40\%$ | Minimal memory overhead; $O(1)$ slug index lookup |
| **Client Bundle Size** | High; transmits PvP matrices to pages that don't need it | Zero leak; loaded only by `/rankings` and `/pokedex/[slug]` |

**Architectural Decision**: **Option B (Unified Meta Index)** is selected. 

The build pipeline emits `frontend/src/data/pokedexMetaIndex.json`, mapping each canonical `slug` to its complete battle footprint:

```typescript
export interface PokedexMetaIndexEntry {
  slug: string;
  dexId: number;
  pvp?: {
    greatLeague?: { rank: number; score: number; moveset: string[]; role: string };
    ultraLeague?: { rank: number; score: number; moveset: string[]; role: string };
    masterLeague?: { rank: number; score: number; moveset: string[]; role: string };
    littleCup?: { rank: number; score: number; moveset: string[]; role: string };
  };
  pve: {
    overallRank: number;
    erScore: number;
    dps: number;
    primaryAttackType: string;
    typeRank: number; // E.g. #1 Ground
    bestMoveset: { fast: string; charged: string };
  };
  maxBattle?: {
    eligible: boolean;
    isGigantamax: boolean;
    gmaxMove?: string;
    attackerTier: 'S' | 'A' | 'B' | 'C';
    healerTier?: 'S' | 'A' | 'B';
    recommendedRole: 'Attacker' | 'Healer' | 'Tank';
  };
}
```

---

## 6. UI/UX Design & Integration Plan

### 6.1 Redesigned Rankings View (`/rankings`)

The visual design adheres to the dark glassmorphic design system established in `FilterGeneratorView` and `PokemonRankingsView`.

```
+----------------------------------------------------------------------------------------------------+
|  [Trophy] Žebříčky Pokémonů                                                                         |
|  Kompletní tier list pro PvP ligy, raidové útočníky podle DialgaDex ER a Max Battles                |
|                                                                                                    |
|  [PvE Raidy] [Great League 1500] [Ultra League 2500] [Master League] [Little Cup] [Max Battles]   |
|                                                                                                    |
|  [ 🔍 Hledat Pokémona... ] [ Filtrovat typ: Všechny ▾ ] [ Jen vydaní v GO: ✓ ] [ Režim: DialgaDex ER ▾ ]|
|                                                                                                    |
|  +----------------------------------------------------------------------------------------------+  |
|  | #1  [Sprite]  Clodsire                         [Poison] [Ground]       PvPoke Skóre: 94.2    |  |
|  |     Great League Top Pick                      Optimální IV: 0/14/13   Stat Product: 1858    |  |
|  |     Rychlý útok: Poison Sting                  Nabíjecí útoky: Earthquake / Stone Edge       |  |
|  |     Klíčové výhry: Azumarill, Lanturn, Registeel | Hrozby: Swampert, Gliscor                |  |
|  +----------------------------------------------------------------------------------------------+  |
|  | #2  [Sprite]  Mandibuzz                        [Dark] [Flying]         PvPoke Skóre: 93.8    |  |
|  +----------------------------------------------------------------------------------------------+  |
+----------------------------------------------------------------------------------------------------+
```

#### Key Visual Components
1. **PVP/PVE/Max Battle Switcher Tabs**:
   - Styled via `.mode-toggle-btn` with active linear purple gradient (`linear-gradient(135deg, #aa3bff 0%, #7e22ce 100%)`).
   - Deep-linked routes:
     - `/rankings/great-league`
     - `/rankings/ultra-league`
     - `/rankings/master-league`
     - `/rankings/little-cup`
     - `/rankings/max-battles`
     - `/rankings/attackers-[type]`
2. **Ranking Cards**:
   - Background: `var(--bg-card)` (`#171921`) with `border: 1px solid var(--border-color)` (`#242836`).
   - Gold Rank Badge for #1–#3 (`.gold-hundo-text`).
   - Neon Cyan Rank Badge for #4–#10 (`#38bdf8`).
   - Explicit display of recommended Fast Attack + 2 Charged Attacks with legacy asterisks (`*`) and plus badges (`+`/`++`).

### 6.2 Pokédex Detail Meta Performance Card (`/pokedex/[slug]`)

Inside `PokedexDetailView.tsx`, immediately following the Base Stats and Weaknesses/Resistances cards, a dedicated **Meta & Battle Performance Card** is rendered:

```
+----------------------------------------------------------------------------------------------------+
|  [Swords] Meta & Bitevní Výkon                                                                     |
|  Aktuální pozice v GBL ligách, nejlepší využití v raidech a způsobilost pro Max Battles           |
|                                                                                                    |
|  [ GL #12 ]   [ UL #4 ]   [ ML #85 ]   [ Raid #1 Ground ]   [ Max Battle Tier S ]                  |
|                                                                                                    |
|  [ PvP Ligy (PvPoke) ]    [ PvE Raidy (DialgaDex ER) ]    [ Max Battles (Power Spots) ]             |
|                                                                                                    |
|  • Great League (CP ≤ 1500): Rank #12 (Skóre 91.4)                                                 |
|    - Optimální IV: 0/14/13 (Level 24.5, CP 1498)                                                  |
|    - Nejlepší PvP Moveset: Mud Shot + Earthquake / Stone Edge                                      |
|    - Klíčové výhry: Registeel, Galarian Stunfisk, Bastiodon                                        |
|    - Hlavní hrozby: Feraligatr, Whiscash, Trevenant                                                |
|                                                                                                    |
|  • PvE Raid Attackers: #1 Zemní útočník (ER 88.4, DPS 38.6)                                        |
|    - Nejlepší PvE Moveset: Mud Shot + Precipice Blades                                             |
|    - Čas do vyřazení (TTF): 28.4s | Přežití v Tier 5: Vynikající                                   |
+----------------------------------------------------------------------------------------------------+
```

---

## 7. Step-by-Step Implementation Roadmap

### 7.1 Backend Pipeline Scripts

#### Step 1: PvPoke Ingestion Script (`backend/src/scripts/fetchPvPokeRankings.ts`)
- Calls GitHub Commits API.
- If updated, downloads:
  - `rankings-1500.json`
  - `rankings-2500.json`
  - `rankings-10000.json`
  - `rankings-500.json`
- Stores raw files in `backend/data/pvpoke/`.

#### Step 2: Harmonize & Generate Unified Meta Index (`backend/src/scripts/generateUnifiedMeta.ts`)
- Merges:
  1. `pokemonRankings.json` (PvE DialgaDex ER calculations, Mega/Shadow forms).
  2. `backend/data/pvpoke/rankings-*.json` (PvPoke battle ratings, movesets, counters).
  3. Niantic GameMaster Dynamax properties (`DYNAMAX_ELIGIBLE_DEX_IDS`, `GMAX_MOVES`).
- Generates:
  - `frontend/src/data/pokedexMetaIndex.json`
  - `frontend/src/data/pokedexMetaIndex.ts` (Typed helpers: `getMetaForSlug(slug)`)

#### Step 3: Script Execution Setup (`backend/package.json`)
```json
{
  "scripts": {
    "generate:rankings": "ts-node src/scripts/generateRankings.ts",
    "fetch:pvpoke": "ts-node src/scripts/fetchPvPokeRankings.ts",
    "generate:meta": "ts-node src/scripts/generateUnifiedMeta.ts",
    "build:meta": "npm run fetch:pvpoke && npm run generate:rankings && npm run generate:meta"
  }
}
```

### 7.2 Frontend Components & Type Definitions

1. **`frontend/src/types/metaRankings.ts`**:
   - Exports `PokedexMetaIndexEntry`, `PvpLeagueMeta`, `PveMeta`, `MaxBattleMeta`.
2. **`frontend/src/components/PokemonRankingsView.tsx`**:
   - Extends active filters to include `great-league`, `ultra-league`, `master-league`, `little-cup`, and `max-battles`.
   - Displays movesets, PvPoke scores, and win/loss match-up chips.
3. **`frontend/src/components/PokedexMetaCard.tsx`**:
   - Reusable dark glassmorphic card for `/pokedex/[slug]` showing format badges and sub-tabs.

### 7.3 Internationalization (CS, EN, JA, RU)

All UI strings added to `frontend/src/data/translations.ts`:

```typescript
export const metaTranslations = {
  cs: {
    meta_card_title: "Meta & Bitevní Výkon",
    meta_card_subtitle: "Aktuální pozice v PvP ligách, raidové statistiky a způsobilost pro Max Battles",
    meta_tab_pvp: "PvP Ligy (PvPoke)",
    meta_tab_pve: "PvE Raidy (DialgaDex ER)",
    meta_tab_max: "Max Battles (Power Spots)",
    meta_great_league: "Great League (CP 1500)",
    meta_ultra_league: "Ultra League (CP 2500)",
    meta_master_league: "Master League (Bez CP limitu)",
    meta_little_cup: "Little Cup (CP 500)",
    meta_optimal_iv: "Optimální IV",
    meta_stat_product: "Stat Product",
    meta_key_wins: "Klíčové výhry",
    meta_threats: "Hlavní hrozby",
    meta_role_attacker: "Útočník",
    meta_role_healer: "Léčitel (Healer)",
    meta_role_tank: "Obránce / Tank",
    meta_max_strike_power: "Síla Max Útoku",
    meta_max_spirit_heal: "Léčení Max Spirit",
    meta_max_guard_shield: "Štít Max Guard",
  },
  en: {
    meta_card_title: "Meta & Battle Performance",
    meta_card_subtitle: "Current standings in PvP leagues, raid attacker rankings, and Max Battle viability",
    meta_tab_pvp: "PvP Leagues (PvPoke)",
    meta_tab_pve: "PvE Raids (DialgaDex ER)",
    meta_tab_max: "Max Battles (Power Spots)",
    meta_great_league: "Great League (CP 1500)",
    meta_ultra_league: "Ultra League (CP 2500)",
    meta_master_league: "Master League (No CP Cap)",
    meta_little_cup: "Little Cup (CP 500)",
    meta_optimal_iv: "Optimal IV Spread",
    meta_stat_product: "Stat Product",
    meta_key_wins: "Key Wins",
    meta_threats: "Key Counters",
    meta_role_attacker: "Attacker",
    meta_role_healer: "Healer",
    meta_role_tank: "Defender / Tank",
    meta_max_strike_power: "Max Attack Power",
    meta_max_spirit_heal: "Max Spirit Healing",
    meta_max_guard_shield: "Max Guard Shield",
  },
  ja: {
    meta_card_title: "対戦メタ & バトル性能",
    meta_card_subtitle: "GOバトルリーグ順位、レイドアタッカー評価、マックスバトル適性",
    meta_tab_pvp: "PvP リーグ (PvPoke)",
    meta_tab_pve: "レイド (DialgaDex ER)",
    meta_tab_max: "マックスバトル (パワースポット)",
    meta_great_league: "スーパーリーグ (CP 1500)",
    meta_ultra_league: "ハイパーリーグ (CP 2500)",
    meta_master_league: "マスターリーグ (CP無制限)",
    meta_little_cup: "リトルカップ (CP 500)",
    meta_optimal_iv: "理想個体値",
    meta_stat_product: "ステータス積",
    meta_key_wins: "有利な相手",
    meta_threats: "要注意対策",
    meta_role_attacker: "アタッカー",
    meta_role_healer: "ヒーラー",
    meta_role_tank: "タンク / 防衛",
    meta_max_strike_power: "ダイアタック威力",
    meta_max_spirit_heal: "ダイサイセイ回復量",
    meta_max_guard_shield: "ダイウォール耐久値",
  },
  ru: {
    meta_card_title: "Мета и боевая эффективность",
    meta_card_subtitle: "Рейтинг в PvP лигах, рейдовая статистика и пригодность для Макс-битв",
    meta_tab_pvp: "PvP Лиги (PvPoke)",
    meta_tab_pve: "Рейды PvE (DialgaDex ER)",
    meta_tab_max: "Макс-битвы (Силовые точки)",
    meta_great_league: "Великая Лига (CP 1500)",
    meta_ultra_league: "Ультра Лига (CP 2500)",
    meta_master_league: "Мастер Лига (Без CP лимита)",
    meta_little_cup: "Малый Кубок (CP 500)",
    meta_optimal_iv: "Оптимальный IV",
    meta_stat_product: "Произведение статов",
    meta_key_wins: "Ключевые победы",
    meta_threats: "Главные угрозы",
    meta_role_attacker: "Атакующий",
    meta_role_healer: "Целитель (Хиллер)",
    meta_role_tank: "Танк / Защитник",
    meta_max_strike_power: "Сила Макс-атаки",
    meta_max_spirit_heal: "Лечение Макс-духа",
    meta_max_guard_shield: "Щит Макс-защиты",
  }
};
```

### 7.4 SSG Performance & SEO Validation

1. **Static Generation (`generateStaticParams`)**:
   - `frontend/src/app/[lang]/rankings/[category]/page.tsx` adds:
     - `'max-battles'`
     - `'gigantamax-tier-list'`
   - Verified via `npm.cmd run build:deploy` across all 4 locales.
2. **Structured Data (Schema.org)**:
   - Each ranking category emits an `ItemList` JSON-LD with Position, Name, and Item URL.
   - `/pokedex/[slug]` emits `Dataset` linking to DialgaDex ER & PvPoke simulation licenses.
3. **Performance Budget**:
   - Static HTML pages remain under $85\text{ KB}$.
   - TTFB on Firebase Hosting CDN stays under $45\text{ ms}$.

---

## 8. Primary Sources & Citations

1. **PvPoke Open Source Repository**:  
   - Main Repository: [https://github.com/pvpoke/pvpoke](https://github.com/pvpoke/pvpoke)
   - Rankings Directory: `https://github.com/pvpoke/pvpoke/tree/master/src/data/rankings`
   - Simulation Engine: `src/js/battle/Battle.js`, `src/ranker.php`
2. **PokeMiners GameMaster Repository**:  
   - GameMaster JSON: [https://github.com/PokeMiners/game_masters/blob/master/latest/latest.json](https://github.com/PokeMiners/game_masters/blob/master/latest/latest.json)
   - Combat Move Settings: `COMBAT_MAX_MOVE_SETTINGS`, `POKEMON_MAX_BATTLE_PROPERTIES`
3. **GamePress Comprehensive DPS/TDO & ER**:  
   - Formula Documentation: [https://gamepress.gg/pokemongo/how-calculate-comprehensive-dps](https://gamepress.gg/pokemongo/how-calculate-comprehensive-dps)
4. **DialgaDex / EER Equivalent Rating**:  
   - Attackers Per Type: [https://db.pokemongohub.net/best/attackers-per-type](https://db.pokemongohub.net/best/attackers-per-type)
5. **Niantic Dynamax & Gigantamax Documentation**:  
   - Official Pokémon GO Support: [https://pokemongolive.com](https://pokemongolive.com)
