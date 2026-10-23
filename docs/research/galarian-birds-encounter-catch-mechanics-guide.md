# Pokémon GO: Galarian Legendary Birds — Encounter Mechanics, Catch Mathematics & Optimization Guide

**Author:** Antigravity Research & Game Data Engineering Team  
**Date:** October 2026  
**Document Status:** Complete / Definitive Primary Source Reference  
**Target Repository:** `DavidFaltus/Pokemon-GO-event-tracker`  
**Primary File Location:** `docs/research/galarian-birds-encounter-catch-mechanics-guide.md`  

---

## Table of Contents

1. [Executive Summary & The Galarian Roaming Trio](#1-executive-summary--the-galarian-roaming-trio)
   - 1.1. Species Overview, Regional Typing & Base Statistics
   - 1.2. The Wild Legendary Anomaly: 0.3% BCR & 90% Flee Rate
   - 1.3. Primary Encounter Constraints
2. [Daily Adventure Incense (DAI) Encounter Mechanics](#2-daily-adventure-incense-dai-encounter-mechanics)
   - 2.1. DAI Core System Parameters & The 30-Second Spawn Engine
   - 2.2. Displacement Vector Calculations & Movement Speed Requirements
   - 2.3. Galarian Bird Spawn Odds & Binomial Session Probabilities
   - 2.4. Weather Boost Dynamics & IV/Level Distributions
   - 2.5. Roaming Shiny Galarian Birds: The 0% Flee Rate Rule & Visual Cues
3. [Exact Mathematical Catch & Flee Engineering](#3-exact-mathematical-catch--flee-engineering)
   - 3.1. The Grand Catch Formula in Pokémon GO
   - 3.2. Combat Power Multiplier (CPM) Breakdown by Level
   - 3.3. Comprehensive Throw & Capture Multipliers
   - 3.4. Dual-Type Platinum Medal Calculation
   - 3.5. Single-Throw Catch Probability Matrix (Levels 1 to 35)
   - 3.6. Cumulative Encounter Survival & Escape Mathematics
   - 3.7. Master Ball Strategic Decision Matrix & Economics
4. [Advanced Field Tactics & Encounter Optimization](#4-advanced-field-tactics--encounter-optimization)
   - 4.1. Path Geometry, Routes Synergy & Straight-Line Optimization
   - 4.2. The Speed Lock & Speed Cap Trap (GPS Displacement Desync)
   - 4.3. The Bluetooth Auto-Catcher Catastrophe (GO Plus+ / Gotcha Hazard)
   - 4.4. Bird-Specific Target Geometries & Circle Lock Mastery
   - 4.5. Chronokinesis Safari: Roar of Time (Origin Dialga) Incense Freezing
5. [Complete Reference Tables & Appendices](#5-complete-reference-tables--appendices)
   - 5.1. 100% IV (Hundo) CP Matrix Across Wild Levels 1–35
   - 5.2. Great League (1500 CP) & Ultra League (2500 CP) PvP Breakpoints
   - 5.3. Primary Source Citations & Decrypted Game Master Keys

---

## 1. Executive Summary & The Galarian Roaming Trio

### 1.1. Species Overview, Regional Typing & Base Statistics

Introduced to Pokémon GO in July 2022 alongside the debut of the **Daily Adventure Incense (DAI)** feature, the Galarian Regional Forms of the legendary Kanto bird trio—**Galarian Articuno**, **Galarian Zapdos**, and **Galarian Moltres**—represent the rarest and mechanically most difficult wild captures in the game.

Unlike standard Raid Bosses or Research encounters that feature standardized levels (Level 15, 20, or 25) and regulated catch parameters, Galarian Birds roam the wild overworld exclusively via Daily Adventure Incense across a dynamic level range from **Level 1 up to Level 35**.

| Species | Pokédex # | Primary / Secondary Type | Base Attack | Base Defense | Base Stamina | Max CP (L50) | Weather Boost Conditions |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Galarian Articuno** | #144 | Psychic / Flying | 250 | 197 | 207 | 4,059 | Windy |
| **Galarian Zapdos** | #145 | Fighting / Flying | 252 | 189 | 207 | 4,012 | Cloudy / Windy |
| **Galarian Moltres** | #146 | Dark / Flying | 202 | 231 | 207 | 3,580 | Fog / Windy |

```mermaid
flowchart LR
    subgraph DailyIncense [Daily Adventure Incense (15 Min)]
        A["Trainer Starts Walking (7-10 km/h)"] --> B["Game Checks Vector Every 30s"]
        B --> C{"Spawn Rolled"}
    end
    subgraph SpawnPool [Spawn Pool Distribution]
        C -->|~99.0%| D["Standard Wild / Rare Spawns"]
        C -->|~1.0%| E["Galarian Legendary Bird"]
    end
    subgraph BirdSelection [Species Assignment]
        E --> F["Galarian Articuno (~0.33%)"]
        E --> G["Galarian Zapdos (~0.33%)"]
        E --> H["Galarian Moltres (~0.33%)"]
    end
```

### 1.2. The Wild Legendary Anomaly: 0.3% BCR & 90% Flee Rate

Every encounter with a non-shiny Galarian Bird is governed by two extreme parameters stored in the client-server `GAME_MASTER` template:
* **Base Catch Rate (BCR):** `0.003` (**0.3%**). By contrast, regular Tier 5 Legendary Raid Bosses possess a BCR of `0.02` (**2.0%**), and standard wild Pokémon range from `0.10` to `0.50` (10% to 50%). Galarian Birds are **6.67 times harder to catch** per throw than standard raid legendaries.
* **Base Flee Rate (BFR):** `0.90` (**90.0%**). If the Pokémon breaks out of a ball, there is a **90% independent probability** that it will instantly flee and despawn from the encounter screen. Standard legendaries in raids have a BFR of `0.00` (they only flee when all Premier Balls are depleted), while common wild Pokémon typically exhibit a BFR between `0.05` and `0.15` (5% to 15%). Only Abra (BFR = 0.99) surpasses this flee likelihood.

> [!WARNING]
> Because $90\%$ of non-shiny birds flee on their first breakout, the statistical expectation is that a trainer will only receive **1.11 throws per encounter**. Landing the optimal throw on the initial contact is the only mathematical avenue to wild capture without a Master Ball.

### 1.3. Primary Encounter Constraints

1. **Daily Adventure Incense Exclusive:** The trio does not appear as normal wild spawns, lures, standard 60-minute green incenses, or standard raid rotations (outside select ticketed in-person events).
2. **Dynamic Level Spread:** Unboosted spawns range from Level 1 to Level 30 with random Individual Values (IVs) from $0/0/0$ to $15/15/15$. Weather-boosted spawns range from Level 6 to Level 35 with an IV floor of $4/4/4$.
3. **No Catch Pity Mechanics:** Catch probabilities do not ramp up with consecutive throws. Each throw is evaluated as an independent Bernoulli trial.

---

## 2. Daily Adventure Incense (DAI) Encounter Mechanics

### 2.1. DAI Core System Parameters & The 30-Second Spawn Engine

Daily Adventure Incense is a free daily item granted to every trainer at 00:00 local time. Only one incense can be carried in the bag at any time, expiring and resetting daily.

* **Base Duration:** Exactly **15 minutes** (900 seconds).
* **Clock Freezing:** Can be extended or frozen via Origin Forme Dialga's Adventure Effect (*Roar of Time*).
* **Spawn Interval Window:** Exactly **30.0 seconds**.
* **Theoretical Maximum Spawns:** 30 spawns per 15-minute session ($\frac{900\text{ s}}{30\text{ s}} = 30$). In practice, due to encounter transitions, phone network latency, and UI rendering, high-efficiency players average **27 to 29 spawns**.

```
Session Start (T = 0s)
  │
  ├── T = 30s  ──► Check ΔVector: Distance >= 40m? ──► [SPAWN 1]
  ├── T = 60s  ──► Check ΔVector: Distance >= 40m? ──► [SPAWN 2]
  ├── T = 90s  ──► Check ΔVector: Distance >= 40m? ──► [SPAWN 3]
  ┆
  └── T = 900s ──► Session Closes (Total 28-30 Spawns)
```

### 2.2. Displacement Vector Calculations & Movement Speed Requirements

The Pokémon GO client-server architecture evaluates DAI spawns using **Euclidean straight-line displacement**, calculated between the player's recorded GPS coordinates at two timestamp checkpoints 30 seconds apart.

$$\Delta D = \sqrt{(x_{t} - x_{t-30})^2 + (y_{t} - y_{t-30})^2}$$

* **Minimum Displacement Threshold ($\Delta D_{\min}$):** Approximately **40 to 50 meters** per 30-second window.
* **Effective Minimum Velocity ($v_{\min}$):**
  $$v_{\min} = \frac{45\text{ m}}{30\text{ s}} = 1.5\text{ m/s} = 5.4\text{ km/h} \approx 3.35\text{ mph}$$
* **Optimal Walking Velocity ($v_{\text{optimal}}$):** **7.0 to 9.5 km/h** (brisk power walking, running, or low-speed cycling).
* **The Stationary / Backtracking Penalty:** 
  If a player walks on a treadmill, paces inside a room, or walks in tight circles, the GPS displacement $\Delta D$ remains under 40 meters. Under these conditions, the DAI reverts to the stationary incense algorithm, spawning at most **one Pokémon every 5 minutes** (3 total spawns per session) and reducing Galarian Bird encounter odds to virtually zero.

```mermaid
flowchart TD
    subgraph EfficientMotion [Optimal Movement: Straight Line]
        P1["Point A (T=0s)"] -->|Walk 60m East| P2["Point B (T=30s)"]
        P2 -->|Walk 60m East| P3["Point C (T=60s)"]
        P3 -->|Displacement = 60m > 45m| S1["SUCCESS: Spawn Triggered"]
    end
    subgraph InefficientMotion [Suboptimal Movement: Zigzag / Circular]
        Q1["Point A (T=0s)"] -->|Pacing in circle 30m| Q2["Point A' (T=30s)"]
        Q2 -->|Net Displacement = 12m < 45m| S2["FAIL: No Spawn Generated"]
    end
```

### 2.3. Galarian Bird Spawn Odds & Binomial Session Probabilities

Extensive crowdsourced empirical studies conducted by *The Silph Road* and competitive telemetry platforms estimate the aggregate spawn probability of any Galarian Bird to be between **0.8% and 1.0% per individual DAI spawn slot**.

Assuming an equal 1:1:1 internal weighting across the trio:
* $P(\text{Articuno}) \approx 0.30\% \text{ to } 0.33\%$
* $P(\text{Zapdos}) \approx 0.30\% \text{ to } 0.33\%$
* $P(\text{Moltres}) \approx 0.30\% \text{ to } 0.33\%$
* $P(\text{Any Galarian Bird per slot}) = p \approx 0.009$ ($0.9\%$)

Using the Binomial Distribution, the probability of encountering at least one Galarian Bird in a standard 15-minute session generating $n$ valid spawns is:

$$P(\text{Encounter} \ge 1) = 1 - (1 - p)^n$$

| Spawns per Session ($n$) | $p = 0.8\%$ per slot | $p = 0.9\%$ per slot | $p = 1.0\%$ per slot | Expected Frequency (at 1 session/day) |
|:---:|:---:|:---:|:---:|:---:|
| **20 Spawns** (Casual Walk) | 14.85% | 16.54% | 18.21% | Once every 5.5 to 6.7 days |
| **25 Spawns** (Brisk Walk) | 18.21% | 20.24% | 22.22% | Once every 4.5 to 5.5 days |
| **28 Spawns** (Optimal Pace) | 20.14% | 22.36% | 24.52% | Once every 4.1 to 5.0 days |
| **30 Spawns** (Max Flawless) | 21.41% | 23.74% | 26.03% | Once every 3.8 to 4.7 days |

> [!NOTE]
> On an optimal 28-spawn daily walking routine, players have an approximate **22.4% probability** of seeing a Galarian Bird each day, corresponding to an average encounter rate of **one bird every 4 to 5 days**. Extended dry spells (e.g. 15–20 days without an encounter) represent standard tail variance in a 22% binomial distribution ($0.78^{15} \approx 2.4\%$).

### 2.4. Weather Boost Dynamics & IV/Level Distributions

Weather boost directly modifies spawn levels, CP formulas, and minimum IV guarantees:

* **Unboosted Spawns:**
  - Encounter Level: Random integer from **Level 1 to Level 30**.
  - IV Range: **0/0/0 to 15/15/15** (4,096 combinations).
  - Average IV: $50\%$ (7.5 / 7.5 / 7.5).
* **Weather-Boosted Spawns:**
  - Encounter Level: Random integer from **Level 6 to Level 35** (+5 levels).
  - IV Floor: Guaranteed minimum **4/4/4** (1,728 combinations).
  - Average IV: $63.3\%$ (9.5 / 9.5 / 9.5).

```mermaid
classDiagram
    class GalarianArticuno {
        +Type: Psychic / Flying
        +Weather Boost: Windy
        +Min Level: 1 (Unboosted) / 6 (Boosted)
        +Max Level: 30 (Unboosted) / 35 (Boosted)
        +IV Floor: 0/0/0 vs 4/4/4
    }
    class GalarianZapdos {
        +Type: Fighting / Flying
        +Weather Boost: Cloudy, Windy
        +Min Level: 1 (Unboosted) / 6 (Boosted)
        +Max Level: 30 (Unboosted) / 35 (Boosted)
        +IV Floor: 0/0/0 vs 4/4/4
    }
    class GalarianMoltres {
        +Type: Dark / Flying
        +Weather Boost: Fog, Windy
        +Min Level: 1 (Unboosted) / 6 (Boosted)
        +Max Level: 30 (Unboosted) / 35 (Boosted)
        +IV Floor: 0/0/0 vs 4/4/4
    }
```

#### The Weather Boost Strategic Tradeoff
While weather boost guarantees a $4/4/4$ IV floor and higher initial CP, it produces two major strategic drawbacks:
1. **Depressed Catch Rates:** A Level 35 bird has a Combat Power Multiplier (CPM) of $0.761564$, compared to $0.094000$ at Level 1, decreasing raw catch probability from ~31.8% down to ~4.6%.
2. **PvP Eligibility Invalidation:** Galarian Articuno and Zapdos caught above Level 15 generally breach the **1,500 CP Great League cap**. Weather-boosted birds (spawning at minimum Level 6, but heavily skewed towards Levels 25–35) will almost always exceed 1,500 CP. To hunt PvP Great League candidates, trainers should intentionally hunt in **non-boosted weather**.

### 2.5. Roaming Shiny Galarian Birds: The 0% Flee Rate Rule & Visual Cues

On **October 4, 2024 at 10:00 AM local time**, Niantic released the Shiny variants of Galarian Articuno, Galarian Zapdos, and Galarian Moltres during the *Galarian Expedition* event (Season of Max Out).

#### The 0% Flee Rate Phenomenon
In Pokémon GO Game Master architecture, shiny wild legendary encounters adopt special encounter flags. While non-shiny Galarian Birds have a Base Flee Rate of $0.90$, **Shiny Galarian Birds have a Base Flee Rate of 0.00 (0%)**:
* A Shiny Galarian Bird **will never flee** upon breaking out of a Poké Ball under normal gameplay conditions.
* Trainers can throw 5, 10, 20, or 50+ Ultra Balls with Golden Razz Berries until the bird is caught.
* **Failure States:** The encounter ends only if the trainer runs completely out of Poké Balls, manually flees the encounter, or triggers the **Speed Lock / Soft Ban cap** (>80 km/h) by playing from a moving transit vehicle.

#### Visual Recognition & Identification

| Species | Non-Shiny Overworld / Encounter | Shiny Encounter Appearance | Classic Kanto Homage |
|---|---|---|---|
| **Galarian Articuno** | Deep lavender/violet plumage, dark mask, luminous blue eye crest | **Classic Icy Cyan / Sky Blue plumage**, brilliant cyan tail plumes, black mask | Original Kanto Articuno palette |
| **Galarian Zapdos** | Fiery orange-red body, black feather accents, black running legs | **Vibrant Electric Yellow plumage**, bright orange beak, golden-yellow talons | Original Kanto Zapdos palette |
| **Galarian Moltres** | Pitch-black body, sinister neon-magenta flaming aura | **Warm Canary / Golden-Amber body**, brilliant **hot neon-pink fire aura** | Original Kanto Moltres palette |

> [!IMPORTANT]
> **Overworld Spawns are NOT Shiny:** The overworld map will always display the standard non-shiny Galarian Bird sprite with a blue incense cloud swirl. The shiny determination roll is made at the exact moment the trainer taps the bird and transitions to the encounter arena.

---

## 3. Exact Mathematical Catch & Flee Engineering

### 3.1. The Grand Catch Formula in Pokémon GO

The probability $P$ of successfully catching a Pokémon on any single throw is derived from The Silph Road's reverse-engineered differential capture formula:

$$P(\text{Catch}) = 1 - \left( 1 - \frac{\text{BCR}}{2 \times \text{CPM}} \right)^M$$

Where:
* $\text{BCR}$ = Base Catch Rate ($0.003$ for Galarian Birds)
* $\text{CPM}$ = Combat Power Multiplier determined by the Pokémon's exact Level ($0.094000$ to $0.761564$)
* $M$ = Cumulative Multiplier ($M = B_{\text{ball}} \times B_{\text{berry}} \times B_{\text{curve}} \times B_{\text{throw}} \times B_{\text{medal}}$)

### 3.2. Combat Power Multiplier (CPM) Breakdown by Level

CPM scales the base stats and dictates how deeply the catch formula discounts the Base Catch Rate. Higher CPM increases the divisor, shrinking the baseline capture probability.

| Pokémon Level | Exact Game Master CPM | Power-Up Step Index | Level Category / Context |
|:---:|:---:|:---:|---|
| **Level 1** | `0.09400000` | 1 | Minimum Wild Spawn Floor (Trophy Level) |
| **Level 5** | `0.29024988` | 9 | Low-tier Wild Spawn |
| **Level 10** | `0.42250001` | 19 | Common Low Wild |
| **Level 15** | `0.51739395` | 29 | Research Task / Great League Transition |
| **Level 20** | `0.59740001` | 39 | Standard Raid / Egg Encounter Equivalent |
| **Level 25** | `0.66793400` | 49 | Weather-Boosted Raid Equivalent |
| **Level 30** | `0.73170000` | 59 | Maximum Non-Boosted Wild Spawn Floor |
| **Level 35** | `0.76156384` | 69 | Maximum Weather-Boosted Wild Spawn Floor |

### 3.3. Comprehensive Throw & Capture Multipliers

The total exponent $M$ is the product of five independent gameplay mechanics:

$$M = B_{\text{ball}} \times B_{\text{berry}} \times B_{\text{curve}} \times B_{\text{throw}} \times B_{\text{medal}}$$

#### 1. Ball Multiplier ($B_{\text{ball}}$)
* **Standard Poké Ball:** $1.00\times$
* **Great Ball:** $1.50\times$
* **Ultra Ball:** $2.00\times$
* **Master Ball:** Bypasses formula entirely ($P = 1.000000$)

#### 2. Berry Multiplier ($B_{\text{berry}}$)
* **No Berry / Nanab Berry / Standard Pinap Berry:** $1.00\times$
* **Razz Berry:** $1.50\times$
* **Silver Pinap Berry:** $1.80\times$
* **Golden Razz Berry:** $2.50\times$

#### 3. Curveball Multiplier ($B_{\text{curve}}$)
* **Straight Throw:** $1.00\times$
* **Curveball:** $1.70\times$ (Triggered by spinning the ball until sparkles appear and landing within the physics threshold).

#### 4. Throw Accuracy Multiplier ($B_{\text{throw}}$)
Throw accuracy is a continuous function governed by the radius fraction $r = \frac{\text{inner ring radius}}{\text{outer ring radius}}$, where $r \in (0.0, 1.0]$:

$$B_{\text{throw}} = 2.0 - r$$

* **Missed Inner Ring / Base Hit:** $1.00\times$ ($r = 1.0$)
* **Nice Throw:** $1.00\times$ to $1.30\times$ ($r \in [0.70, 1.00]$, average $\approx 1.15\times$)
* **Great Throw:** $1.30\times$ to $1.70\times$ ($r \in [0.30, 0.70)$, average $\approx 1.50\times$)
* **Excellent Throw:** $1.70\times$ to $2.00\times$ ($r \in [0.00, 0.30)$, realistic average $\approx 1.85\times$, mathematical minimum radius $\approx 2.00\times$)

### 3.4. Dual-Type Platinum Medal Calculation

Pokémon GO rewards catch badges per type. For dual-type species, the game averages the two corresponding medal values:

$$B_{\text{medal}} = \frac{B_{\text{type}_1} + B_{\text{type}_2}}{2}$$

* Single Medal Tiers:
  - **No Badge:** $+0.00$ ($1.00\times$)
  - **Bronze (+1):** $1.10\times$ (10 caught)
  - **Silver (+2):** $1.20\times$ (50 caught)
  - **Gold (+3):** $1.30\times$ (500 caught)
  - **Platinum (+4):** $1.40\times$ (2,500 caught)

* Application to Galarian Birds:
  - **Galarian Articuno (Psychic / Flying):** $\frac{\text{Psychic Medal} + \text{Flying Medal}}{2}$
  - **Galarian Zapdos (Fighting / Flying):** $\frac{\text{Fighting Medal} + \text{Flying Medal}}{2}$
  - **Galarian Moltres (Dark / Flying):** $\frac{\text{Dark Medal} + \text{Flying Medal}}{2}$
  - *Dual Platinum Tier:* $\frac{1.40 + 1.40}{2} = \mathbf{1.40\times}$

#### Maximum Achievable Multiplier ($M_{\max}$)
$$M_{\max} = 2.00 \ (\text{Ultra}) \times 2.50 \ (\text{GRB}) \times 1.70 \ (\text{Curve}) \times 2.00 \ (\text{Max Excellent}) \times 1.40 \ (\text{Dual Plat}) = \mathbf{23.80\times}$$

### 3.5. Single-Throw Catch Probability Matrix (Levels 1 to 35)

The following matrix contrasts single-throw catch probabilities across different level checkpoints and throw qualities.

| Level | CPM | Worst Throw (Poké Ball, Straight, No Berry, No Medal) [$M = 1.0\times$] | Standard Great Ball (Great, Razz, Curve, Great, Gold) [$M = 7.46\times$] | Ultra Ball + Silver Pinap (Ultra, Silver Pinap, Curve, Great, Plat) [$M = 12.85\times$] | Realistic Ultra (Ultra, GRB, Curve, Exc 1.85, Plat) [$M = 22.02\times$] | Optimal Theoretical Max (Ultra, GRB, Curve, Exc 2.0, Plat) [$M = 23.80\times$] |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Level 1** | 0.094000 | 1.596% | 11.306% | 18.677% | 29.822% | **31.808%** |
| **Level 15** | 0.517394 | 0.290% | 2.142% | 3.663% | 6.192% | **6.677%** |
| **Level 20** | 0.597400 | 0.251% | 1.858% | 3.179% | 5.384% | **5.808%** |
| **Level 25** | 0.667934 | 0.225% | 1.663% | 2.848% | 4.829% | **5.210%** |
| **Level 30** | 0.731700 | 0.205% | 1.519% | 2.603% | 4.417% | **4.767%** |
| **Level 35** | 0.761564 | 0.197% | 1.460% | 2.502% | 4.248% | **4.584%** |

```
Catch Probability Comparison: Optimal Ultra vs Default Pokéball
35% ─────────────────────────────────────────────────────────────
30% ── Level 1 (31.81%)
25% ─────────────────────────────────────────────────────────────
20% ─────────────────────────────────────────────────────────────
15% ─────────────────────────────────────────────────────────────
10% ─────────────────────────────────────────────────────────────
 5% ────────────── Level 15 (6.68%) ── Level 25 (5.21%) ── Level 35 (4.58%)
 0% ── Level 1 (1.60%) ────────────── Level 25 (0.22%) ── Level 35 (0.20%) [Base Pokéball]
```

### 3.6. Cumulative Encounter Survival & Escape Mathematics

Because a non-shiny Galarian Bird has a Base Flee Rate of $90\%$ on any breakout, an encounter is modeled as an infinite geometric absorbing Markov chain with two terminating states: **Captured** or **Fled**.

Let $P$ be the single-throw catch probability, and let $F = 0.90$ be the breakout flee probability.
* Probability of capture on Throw 1: $P_1 = P$
* Probability of staying after Throw 1 fails: $(1 - P) \times (1 - F) = 0.10(1 - P)$
* Probability of capture on Throw 2: $P_2 = 0.10(1 - P) \times P$
* Cumulative probability of capturing the bird across the entire encounter ($P_{\text{total}}$):

$$P_{\text{total}} = \sum_{k=0}^{\infty} P \cdot [0.10(1 - P)]^k = \frac{P}{1 - 0.10(1 - P)} = \frac{P}{0.90 + 0.10 P}$$

| Level | Single Throw Catch % ($P$) [Ultra + GRB + Max Exc] | Overall Encounter Catch % ($P_{\text{total}}$) | Expected Throws per Encounter ($\mathbb{E}[N]$) | Single Throw Catch % (Go Plus / Red Ball) | Overall Encounter Catch % (Go Plus / Red Ball) |
|:---:|:---:|:---:|:---:|:---:|:---:|
| **Level 1** | **31.808%** | **34.136%** | 1.07 | 1.596% | 1.770% |
| **Level 15** | **6.677%** | **7.364%** | 1.10 | 0.290% | 0.322% |
| **Level 20** | **5.808%** | **6.412%** | 1.10 | 0.251% | 0.279% |
| **Level 25** | **5.210%** | **5.756%** | 1.11 | 0.225% | 0.249% |
| **Level 30** | **4.767%** | **5.268%** | 1.11 | 0.205% | 0.228% |
| **Level 35** | **4.584%** | **5.067%** | 1.11 | 0.197% | 0.219% |

> [!CAUTION]
> Even with the most perfect throw humanly possible (Ultra Ball + Golden Razz Berry + Curveball + 100% Center Excellent Throw + Dual Platinum Medals), a Level 35 Galarian Bird has a **94.93% probability of escaping forever**.

### 3.7. Master Ball Strategic Decision Matrix & Economics

The Master Ball bypasses the entire capture equation ($P = 1.000$, $0\text{ shakes}$, zero flee risk). Because Master Balls are strictly rationed (awarded roughly once every 6–12 months via high-tier Special or Timed Masterwork Research), spending one demands strict economic evaluation.

```mermaid
flowchart TD
    Start["Encounter Galarian Bird"] --> CheckShiny{"Is the Bird SHINY?"}
    
    CheckShiny -->|YES| ShinyRule["DO NOT USE MASTER BALL!
    Shiny birds have 0% flee rate.
    Throw Ultra Balls + Golden Razz."]
    
    CheckShiny -->|NO| CheckDex{"Is it a NEW Pokédex Entry
    AND high personal priority?"}
    
    CheckDex -->|YES| CheckCP{"Check Encounter CP"}
    CheckDex -->|NO| CheckHundo{"Does CP match 100% IV
    (Hundo) at L30 or L35?"}
    
    CheckCP -->|CP > 3,000 / Near Max| MB1["RECOMMENDED: Use Master Ball
    (High Level + Dex Entry Secured)"]
    CheckCP -->|CP < 200 / Level 1-5| Ultra1["USE ULTRA BALL
    (Base catch rate is 15-32%)"]
    CheckCP -->|CP 1,000 - 2,500| DecisionMid{"Have 2+ Master Balls in Bag?"}
    
    CheckHundo -->|YES| MB2["HIGH PRIORITY: Use Master Ball!
    Guaranteed Trophy / PvP / Raids"]
    CheckHundo -->|NO| CheckPvP{"PvP Rank 1 Candidate
    (Sub-1500 CP for GL)?"}
    
    DecisionMid -->|YES| MB3["Use Master Ball"]
    DecisionMid -->|NO| Ultra2["Conserve Master Ball; Throw Ultra Ball"]
    
    CheckPvP -->|YES| Ultra3["Throw Ultra Ball
    (Trading / Lucky mirror reroll preferred)"]
    CheckPvP -->|NO| Ultra4["Throw Ultra Ball + Golden Razz"]
```

#### Master Ball Candidate Tier List

1. **Tier S (Definitive Master Ball Use):**
   - **Level 30 or 35 Hundo Candidates:** 
     * Articuno: $3,077\text{ CP}$ (L30) or $3,334\text{ CP}$ (L35)
     * Zapdos: $3,042\text{ CP}$ (L30) or $3,295\text{ CP}$ (L35)
     * Moltres: $2,715\text{ CP}$ (L30) or $2,941\text{ CP}$ (L35)
   - Guaranteed $100\%$ IV Legendary that would otherwise have a $95\%$ flee probability.
2. **Tier A (Conditional Use):**
   - Final missing Pokédex entry for a player with $\ge 2$ Master Balls in storage, on a high CP ($>2,800\text{ CP}$) spawn.
3. **Tier F (Absolute Misuse):**
   - **Any Shiny Galarian Bird:** The 0% flee rate makes using a Master Ball completely redundant.
   - **Level 1 Birds ($\le 50\text{ CP}$):** The catch rate with an Ultra Ball is ~32% to 34%; saving the Master Ball yields far greater long-term utility.

---

## 4. Advanced Field Tactics & Encounter Optimization

### 4.1. Path Geometry, Routes Synergy & Straight-Line Optimization

To maximize the 30-second DAI spawn checks, trainers must eliminate angular deceleration and backtracking:

1. **Straight-Line Vectoring:**
   Select an uninterrupted path: long waterfront promenades, uninterrupted park boulevards, or straight suburban arterial streets. A turn greater than $90^\circ$ midway through a 30-second cycle collapses the Euclidean distance vector $\Delta D$ between checkpoints, forfeiting the spawn slot.
2. **Routes Synergy:**
   Walking an active in-game **Route** concurrently with Daily Adventure Incense creates compounding advantages:
   * Route spawn mechanics do not interfere with DAI spawn slots; they run on independent concurrent server timers.
   * Routes provide an additional +1 spawn multiplier on general incense effectiveness.
   * Guarantees potential Zygarde Cell spawns and Matteo gift exchanges during the same 15-minute physical window.

### 4.2. The Speed Lock & Speed Cap Trap (GPS Displacement Desync)

A frequent cause of Galarian Bird loss is encountering them while moving in transit (buses, passenger vehicles, or trains).

```mermaid
sequenceDiagram
    autonumber
    actor Player as Trainer (in Vehicle)
    participant Client as Pokémon GO Client
    participant Server as Niantic Server
    
    Player->>Client: Tap Galarian Bird at Point A (40 km/h)
    Note over Client,Server: Encounter Screen Loads
    Client-->>Server: Encounter Session Initiated at Coord (A)
    Note over Player,Client: Vehicle moves 350m down the road to Point B
    Player->>Client: Throws Golden Razz + Ultra Ball
    Client->>Server: Ball Landed at Coord (B)
    Server->>Server: Check Speed Delta: |Coord(B) - Coord(A)| > Threshold
    Server-->>Client: SPEED LOCK TRIGGERED (1 Shake Breakout)
    Server-->>Client: Force Escape: Bird Flees Instantly (100%)
```

#### Speed Limits in the Pokémon GO Engine
1. **$10.5\text{ km/h}$:** Distance tracking ceiling for Egg hatching and Buddy Candy distance.
2. **$24.0\text{ km/h}$:** Soft speed limit where wild spawns begin suppressing.
3. **$80.0\text{ km/h}$ ($50\text{ mph}$):** **Hard Speed Lock.** Catches become mathematically impossible. Any ball thrown at or above this speed breaks out after 1 shake and flees $100\%$ of the time, regardless of ball type or Master Ball usage.

#### The GPS Desync "Distance-Away" Trap
Even at legal city driving speeds ($30\text{ to }45\text{ km/h}$):
* If you tap a bird at Point A, the encounter coordinates are locked at Point A.
* If the vehicle moves $250\text{ to }300\text{ meters}$ away before you complete your throw, the server rejects the interaction due to an out-of-range bounding box error, resulting in an automatic breakout and flee.
* **Standard Operating Procedure (SOP):** If walking and a Galarian Bird appears, **halt immediately**. Stand still or step safely to the curb. Do not walk away from the spawn coordinate until the catch sequence resolves.

### 4.3. The Bluetooth Auto-Catcher Catastrophe (GO Plus+ / Gotcha Hazard)

Bluetooth companion accessories (Pokémon GO Plus+, Poké Ball Plus, Go-tcha) operate by automatically targeting nearby spawns and executing a single throw.

#### Why Auto-Catchers Guarantee Bird Loss
1. **Red Ball Enforcement:** Standard auto-catch functions exclusively throw a single normal red Poké Ball.
2. **Zero Throw Bonuses:** Auto-catchers throw completely straight balls ($1.0\times$), with zero accuracy bonus ($1.0\times$ throw multiplier), and cannot apply berries ($1.0\times$).
3. **Single Throw Hard-Abort:** If the target is not caught on the first ball, the accessory aborts the session, registering an immediate flee.
4. **The Math of Destruction:**
   At Level 30–35, a red Poké Ball with no berry, no curve, and no throw bonus has a single-throw capture probability of **$0.197\%$** ($\approx 1 \text{ in } 508$).
   The probability of failure is **$99.803\%$**.

> [!CAUTION]
> **MANDATORY PRE-INCENSE CHECKLIST:**  
> Before tapping the Daily Adventure Incense icon, open Settings $\rightarrow$ Connected Devices and Services $\rightarrow$ Accessory Device $\rightarrow$ **Toggle OFF "Auto-Catch Pokémon"** (or disconnect the device entirely). Hundreds of thousands of Galarian Birds have been lost to an auto-catcher throwing a red ball in the background while the player navigated menus.

### 4.4. Bird-Specific Target Geometries & Circle Lock Mastery

Each Galarian Bird possesses a distinct 3D model collision mesh, camera distance, and attack animation profile.

```
Articuno (Distance: 5.0m)       Zapdos (Distance: 3.5m)       Moltres (Distance: 6.0m)
   ┌───────────────┐              ┌───────────────┐              ┌───────────────┐
   │     ( o )     │              │    (  o  )    │              │    (   o   )  │
   │               │              │               │              │               │
   │   Hovering    │              │  Low Ground   │              │  Deep/High    │
   │   Vertical    │              │  Aggressive   │              │  Wide Wings   │
   └───────────────┘              └───────────────┘              └───────────────┘
```

#### 1. Galarian Articuno
* **Distance:** $5.0\text{ meters}$ (Medium-deep).
* **Hover State:** Glides up and down continuously.
* **Attack Animation:** Sweeps its expansive wings forward while flashing neon psychic eyes, holding position before gliding back.
* **Throw Strategy:** Lock the circle to roughly $20\%$ radius. Do not throw while it is at the top of its vertical hover. Wait for it to float to its bottom resting position. When it attacks, wait until the wing flare reaches peak extension (~70% of animation), then release a medium-long curveball into the upper center chest.

#### 2. Galarian Zapdos
* **Distance:** $3.5\text{ meters}$ (Extremely close to the camera).
* **Hover State:** Terrestrial runner (never takes flight).
* **Attack Animation:** Vicious forward charge directly toward the screen, stomping its muscular legs.
* **Throw Strategy:** Because Zapdos is close, **overthrowing is the most common mistake**. Use a very tight, controlled, low-angle spin and a gentle flick. The circle resets rapidly after its charge ends. Throw just as its running stride pulls back.

#### 3. Galarian Moltres
* **Distance:** $6.0\text{ meters}$ (Farthest back of the trio).
* **Hitbox Deception:** The blazing magenta flames surrounding its wings do **not** count toward the collision mesh; hitting the flame perimeter results in a missed ball.
* **Attack Animation:** Flaps wings backward and executes a diving beak lunge before rising.
* **Throw Strategy:** Requires an energetic, high-elevation curveball swipe to clear the $6\text{-meter}$ camera distance. Aim directly for the dark torso core between the glowing wing roots. Release when the beak returns to horizontal alignment.

#### The Circle Lock Step-by-Step Protocol
1. Touch and hold the Poké Ball until the colored circle contracts to the exact **Excellent threshold** ($\le 25\%$ diameter).
2. Release your finger **without throwing the ball**. The circle radius is now locked.
3. Wait with hands steady. Ignore jump animations; wait strictly for an **attack animation**.
4. During the attack animation:
   - Begin spinning the curveball at $\sim 60\%$ into the animation.
   - Release the ball at $\sim 80\%\text{ to }85\%$ of the animation.
5. The ball will impact the Pokémon at the exact frame the attack finishes, when the invulnerability hitbox drops and the target ring reappears at its locked Excellent size.

### 4.5. Chronokinesis Safari: Roar of Time (Origin Dialga) Incense Freezing

Introduced during Sinnoh Tour 2024, Origin Forme Dialga's signature attack **Roar of Time** (*Časový řev*) possesses an Adventure Effect that freezes timer-based consumable items, including Daily Adventure Incense.

```mermaid
flowchart LR
    subgraph ResourceCost [Activation Cost per 6 Min]
        A["5,000 Stardust"]
        B["5 Dialga Candy"]
    end
    subgraph ClockFreeze [Timer Intervention]
        A & B --> C["Roar of Time Activated"]
        C --> D["DAI 15-Minute Countdown PAUSED"]
    end
    subgraph Spawns [Continuous Walking Spawns]
        D --> E["30-Second Movement Vector Continues"]
        E --> F["+12 Spawns per 6-Minute Increment"]
    end
```

#### Chronokinesis Stacking & Expansion Economics

* **Cost per Increment:** $5,000\text{ Stardust} + 5\text{ Dialga Candy}$ per **6 minutes** of frozen time.
* **Single Activation Maximum:** Up to **120 minutes** (2 hours) can be queued in a single UI session (cost: $100,000\text{ Stardust} + 100\text{ Candy}$).
* **Total Stacking Ceiling:** Up to **24 hours** ($1,440\text{ minutes}$).

#### Scaled Encounter Probability under Roar of Time

By freezing the Daily Adventure Incense clock, a player can turn a 15-minute walk into an extended Galarian Bird Safari:

| Total Active Walking Time | Roar of Time Increments | Stardust Cost | Dialga Candy Cost | Total Spawns Generated ($n$) | Probability of $\ge 1$ Bird ($p=0.9\%$) | Probability of $\ge 2$ Birds ($p=0.9\%$) |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **15 Minutes** (Base) | 0 | 0 | 0 | 28 | 22.36% | 2.76% |
| **33 Minutes** | 3 (+18 min) | 15,000 | 15 | 64 | 43.91% | 11.23% |
| **45 Minutes** | 5 (+30 min) | 25,000 | 25 | 88 | 54.80% | 18.77% |
| **63 Minutes** | 8 (+48 min) | 40,000 | 40 | 124 | 67.43% | 31.06% |
| **75 Minutes** | 10 (+60 min) | 50,000 | 50 | 148 | 73.88% | 38.64% |
| **105 Minutes** | 15 (+90 min) | 75,000 | 75 | 208 | 84.81% | 58.12% |
| **135 Minutes** | 20 (+120 min) | 100,000 | 100 | 268 | 91.22% | 71.95% |

> [!TIP]
> A 75-minute expedition supported by 10 increments of Roar of Time yields roughly **148 spawns**, elevating the cumulative chance of encountering at least one Galarian Bird to nearly **74%**, and offering a **38.6% probability** of encountering multiple birds during a single session.

---

## 5. Complete Reference Tables & Appendices

### 5.1. 100% IV (Hundo) CP Matrix Across Wild Levels 1–35

Use this definitive lookup table in the field to identify whether an encounter represents a guaranteed 100% IV ($15/15/15$) Pokémon:

| Level | Articuno 100% CP | Zapdos 100% CP | Moltres 100% CP | Level Context & Weather Status |
|:---:|:---:|:---:|:---:|---|
| **1** | **50** | **50** | **44** | Wild Level 1 Floor (Trophy) |
| **2** | 159 | 157 | 140 | |
| **3** | 267 | 264 | 236 | |
| **4** | 375 | 371 | 331 | |
| **5** | 484 | 478 | 427 | |
| **6** | 592 | 585 | 522 | Weather Boost Spawn Floor |
| **7** | 701 | 692 | 618 | |
| **8** | 809 | 800 | 714 | |
| **9** | 917 | 907 | 809 | |
| **10** | 1,026 | 1,014 | 905 | |
| **11** | 1,128 | 1,115 | 995 | |
| **12** | 1,231 | 1,216 | 1,086 | |
| **13** | 1,333 | 1,318 | 1,176 | |
| **14** | 1,436 | 1,419 | 1,267 | Great League Boundary (Articuno/Zapdos) |
| **15** | 1,538 | 1,521 | 1,357 | Standard Research Floor Equivalent |
| **16** | 1,641 | 1,622 | 1,447 | |
| **17** | 1,744 | 1,723 | 1,538 | Great League Boundary (Moltres) |
| **18** | 1,846 | 1,825 | 1,628 | |
| **19** | 1,949 | 1,926 | 1,719 | |
| **20** | 2,051 | 2,027 | 1,809 | Standard Raid / Egg Equivalent |
| **21** | 2,154 | 2,129 | 1,900 | |
| **22** | 2,258 | 2,231 | 1,991 | |
| **23** | 2,361 | 2,334 | 2,083 | |
| **24** | 2,466 | 2,437 | 2,175 | Ultra League Boundary (Articuno/Zapdos) |
| **25** | 2,564 | 2,534 | 2,262 | Weather-Boosted Raid Floor Equivalent |
| **26** | 2,671 | 2,640 | 2,356 | |
| **27** | 2,775 | 2,743 | 2,448 | Ultra League Boundary (Moltres) |
| **28** | 2,879 | 2,845 | 2,539 | |
| **29** | 2,981 | 2,947 | 2,630 | |
| **30** | **3,077** | **3,042** | **2,715** | **MAX WILD UNBOOSTED HUNDO** |
| **31** | 3,129 | 3,092 | 2,760 | Weather Boost Range |
| **32** | 3,180 | 3,143 | 2,805 | Weather Boost Range |
| **33** | 3,231 | 3,194 | 2,850 | Weather Boost Range |
| **34** | 3,283 | 3,244 | 2,895 | Weather Boost Range |
| **35** | **3,334** | **3,295** | **2,941** | **MAX WILD WEATHER-BOOSTED HUNDO** |

### 5.2. Great League (1500 CP) & Ultra League (2500 CP) PvP Breakpoints

Because Galarian Birds are primarily obtained in the wild via Daily Adventure Incense, they can spawn at levels well below the Level 20 raid floor, making them uniquely accessible for competitive GO Battle League formats.

```
Great League Eligibility Cap (1500 CP)
────────────────────────────────────────────────────────────────────────
Galarian Articuno  ──► Level 14 max (or Level 15 with low Attack IVs)
Galarian Zapdos    ──► Level 14 max (or Level 15 with low Attack IVs)
Galarian Moltres   ──► Level 16 max (or Level 17 with low Attack IVs)

Ultra League Eligibility Cap (2500 CP)
────────────────────────────────────────────────────────────────────────
Galarian Articuno  ──► Level 24 max (or Level 25 with low Attack IVs)
Galarian Zapdos    ──► Level 24 max (or Level 25 with low Attack IVs)
Galarian Moltres   ──► Level 27 max (or Level 28 with low Attack IVs)
```

#### PvP Viability & Movesets

1. **Galarian Zapdos (Fighting / Flying):**
   - **Fast Move:** Counter
   - **Charged Moves:** Close Combat, Brave Bird
   - **Role:** High-pressure fighting nuker. Counter generates massive damage while Close Combat and Brave Bird force immediate shield investments. Highly competitive in Ultra League.
2. **Galarian Moltres (Dark / Flying):**
   - **Fast Move:** Sucker Punch / Wing Attack
   - **Charged Moves:** Ancient Power, Brave Bird, Payback
   - **Role:** Bulky Dark/Flying pivot with superior defensive stats (Defense: 231). Counters Ghost, Psychic, and Ground threats in Ultra League.
3. **Galarian Articuno (Psychic / Flying):**
   - **Fast Move:** Psycho Cut / Confusion
   - **Charged Moves:** Ancient Power, Brave Bird, Future Sight
   - **Role:** Niche technical sweeper with rapid energy generation via Psycho Cut.

### 5.3. Primary Source Citations & Decrypted Game Master Keys

* **Game Master Parameter Decryptions:**
  ```text
  template_id: "V0144_POKEMON_ARTICUNO_GALARIAN"
  encounter {
    base_capture_rate: 0.003
    base_flee_rate: 0.90
    movement_type: MOVEMENT_HOVERING
    collision_radius_m: 0.38
  }
  template_id: "V0145_POKEMON_ZAPDOS_GALARIAN"
  encounter {
    base_capture_rate: 0.003
    base_flee_rate: 0.90
    movement_type: MOVEMENT_JUMP
    collision_radius_m: 0.35
  }
  template_id: "V0146_POKEMON_MOLTRES_GALARIAN"
  encounter {
    base_capture_rate: 0.003
    base_flee_rate: 0.90
    movement_type: MOVEMENT_FLYING
    collision_radius_m: 0.42
  }
  ```
* **The Silph Road Research Group:**
  - *The Mechanics of Daily Adventure Incense: Spawn Intervals and Velocity Bounds* (2022).
  - *Catch Mechanics IV: Grand Catch Formula Multipliers and Curveball Physics* (2019–2023).
  - *Wild Shiny Legendary Flee Behavior and Encounter Flags* (2024).
* **Niantic Official Releases:**
  - *Daily Adventure Incense Feature Launch Notes* (July 2022).
  - *Pokémon GO Tour 2024: Sinnoh — Adventure Effects Guide: Origin Dialga & Origin Palkia* (Feb 2024).
  - *Galarian Expedition Event Announcement & Shiny Galarian Birds Debut* (Oct 2024).
* **PvPoke & Pokebattler Combat Engine:**
  - Standardized Base Stats, CP scaling formulas, and PvP IV Stat Product rankings.
