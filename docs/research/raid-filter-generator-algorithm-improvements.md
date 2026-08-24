# Algorithmic Improvements & Multi-Tier Accessibility Architecture for Pokémon GO Raid Search Filters

**Document Version:** 2.0.0  
**Status:** Architectural Blueprint & Research Specification  
**Target Module:** Filter Generator (FilterGeneratorView, DirectRaidFilterBox, pokemonCountersHelper)  
**Author:** Antigravity Engineering & Pokémon GO PvE Intelligence Team  
**Date:** August 24, 2026  

---

## 1. Executive Summary & Architecture Overview

The Pokémon GO Raid Filter Generator in pogoevents.app generates in-game search strings that players copy and paste into the Pokémon GO storage search bar to instantly assemble optimal 6-Pokémon raid battle parties.

### Current Implementation Assessment
The existing generator formats queries such as:
`	ext
3*,4*&@ghost,@dark,@bug&150,94,229,491,635,717,609,461,212,1000
`
While concise, this approach exhibits four critical failure modes:
1. **The Empty Storage Failure for Casual Players**: Restricting to 3*,4* and ~10 rare Legendaries/Megas causes 0 results for players without high-IV meta legendaries.
2. **The Shadow Frustration Trap**: Any Shadow Pokémon with a matching fast move and Frustration matches @dark or @ghost, bringing a deadweight attacker into a 5-Star or Mega raid.
3. **Mismatched / Split Movesets**: @type matches a Pokémon if *either* its fast or charged move matches. A Gengar with Sucker Punch / Focus Blast matches @ghost against Mesprit even though Focus Blast deals resisted 0.625× damage.
4. **Lack of Player Tier Customization**: No toggle between hardcore minimum-time-to-win (TTW) counters, weather-boosted counters, and high-level wild budget counters.

---

## 2. In-Depth Pokémon GO Search Engine Specification

### 2.1. Grammar & Operator Precedence

| Operator | Function | Example | Precedence / Evaluation Behavior |
| :--- | :--- | :--- | :--- |
| , or : or ; | **Logical OR** | @fire,@ground | Evaluates tokens within the comma-separated group first. |
| & | **Logical AND** | ground&@ground | Intersects sets resulting from OR-expressions. |
| ! | **Logical NOT** | !@frustration | Inverts matching criterion. |
| @ | **Move Prefix** | @1fighting | Specifies attack types, slots, or move names. |

> [!IMPORTANT]
> Pokémon GO's query parser does **not** support explicit nested parentheses (...). However, it evaluates comma-delimited OR blocks within ampersand-delimited AND stages.
> Therefore: A,B & C,D is parsed strictly as (A OR B) AND (C OR D).

### 2.2. Move Slot Filtering Tokens (@)

- @<type>: Matches Pokémon with at least one move (Fast OR Charged) of <type>.
- @1<type>: Matches Pokémon whose **Fast Move** is of <type> (e.g. @1ghost, @1fighting).
- @2<type>: Matches Pokémon whose **1st Charged Move** is of <type> (e.g. @2ghost).
- @3<type>: Matches Pokémon whose **2nd Charged Move** (unlocked move) is of <type> (e.g. @3ghost).
- @special / @legacy: Matches Pokémon with legacy, event, or signature moves (e.g., Blast Burn, Psystrike).
- @weather: Matches Pokémon having moves currently boosted by active in-game weather.
- @frustration: Matches unpurified Shadow Pokémon that possess Frustration.
- !@frustration: **Excludes** any Shadow Pokémon holding Frustration.

### 2.3. Dual-STAB / Optimal Moveset Formula

To guarantee a Pokémon has both a Super Effective Fast move and a Super Effective Charged move without requiring a single hardcoded move name:
`	ext
@1ghost,@1dark,@1bug&@2ghost,@2dark,@2bug,@3ghost,@3dark,@3bug&!@frustration
`

---

## 3. Multi-Tier Player Spectrum Counter Selection Model

### 3.1. 4-Tier PvE Counter Classification

| Tier | Category Name | Selection Criteria & PvE Metrics | Representative Species Examples (Psychic Boss) |
| :--- | :--- | :--- | :--- |
| **Tier S** | **Apex & Mega Counters** | Megas/Primals, Top Shadow DPS (ER >= 45.0, DPS >= 22.0). | Mega Gengar, Mega Tyranitar, Mega Houndoom, Shadow Chandelure, Shadow Tyranitar |
| **Tier A** | **Elite Meta Legendaries** | Top Legendaries with optimal movesets (ER >= 38.0). | Hydreigon, Darkrai, Giratina (Origin), Dawn Wings Necrozma, Yveltal |
| **Tier B** | **Standard PvE Meta** | Readily accessible top non-legendaries, standard shadows, Community Day evolutions (ER >= 32.0). | Tyranitar, Gengar, Weavile, Chandelure, Gholdengo, Scizor |
| **Tier C** | **Budget Wild / Accessible** | Common wild spawns, Eeveelutions, low-candy evolutions (ER >= 26.0, easy wild catch at Level 30-35). | Houndoom, Honchkrow, Banette, Yanmega, Pinsir, Vikavolt, Trevenant |

---

## 4. Concrete Search String Templates

### Template 1: Universal All-in-One String (Recommended Default)
`	ext
94,229,609,248,635,491,487,792,461,212,430,354,469,127,738,709&@1ghost,@1dark,@1bug&@2ghost,@2dark,@2bug,@3ghost,@3dark,@3bug&!@frustration
`

### Template 2: Hardcore / Apex Meta String
`	ext
3*,4*&cp2500-&94,229,609,248,635,491,487,792&@1ghost,@1dark,@1bug&@2ghost,@2dark,@2bug,@3ghost,@3dark,@3bug&!@frustration
`

### Template 3: Budget & Wild Accessible String
`	ext
cp1800-&229,461,212,430,354,469,127,738,709,134,136&@1ghost,@1dark,@1bug&@2ghost,@2dark,@2bug,@3ghost,@3dark,@3bug&!@frustration
`

---

## 5. Primary Source Citations & References

1. **Niantic Official Pokémon GO Search Syntax Guide**: https://niantic.helpshift.com/hc/en/6-pokemon-go/faq/1486-searching-and-filtering-your-pokemon-inventory/
2. **GamePress Comprehensive PvE DPS / TDO & Equivalent Rating (ER)**: https://gamepress.gg/pokemongo/comprehensive-dps-spreadsheet
3. **Pokebattler PvE Battle Simulator & Time-to-Win (TTW) Algorithm**: https://www.pokebattler.com/raids
4. **PokéMiners In-Game Masterfile Data Feed**: https://github.com/PokeMiners/game_masters