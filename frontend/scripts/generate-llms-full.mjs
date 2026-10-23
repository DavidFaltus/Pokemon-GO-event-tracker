import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootFrontend = path.resolve(__dirname, '..');
const targetPublicPath = path.join(rootFrontend, 'public', 'llms-full.txt');
const distDir = path.join(rootFrontend, 'dist');

console.log('[generate-llms-full] Generating comprehensive /llms-full.txt knowledge base...');

let content = `# Pokémon GO Event Tracker — Complete Knowledge Reference for LLMs & AI Agents (\`llms-full.txt\`)

> Comprehensive technical & gameplay reference for Pokémon GO Event Tracker (https://pogoevents.app). Designed for AI Search Engines (ChatGPT Search, Perplexity, Claude Search, Google AI Overviews) and autonomous agents.

- **Canonical Domain**: https://pogoevents.app
- **Supported Languages**: Czech (\`cs\`), English (\`en\`), Japanese (\`ja\`), Russian (\`ru\`)
- **Primary Data Sources**: Niantic Official Live Feeds, ScrapedDuck CDN, DialgaDex (Effective Rating \`ER\`), GamePress PvE DPS/TDO simulations, Pokebattler.

---

## 1. Programmatic Markdown & JSON API Endpoints

Every endpoint below is publicly accessible without authentication. Send \`Accept: text/markdown\` or append \`.md\` / \`?format=md&lang=en|cs|ja|ru\` to receive token-efficient Markdown instead of JSON.

| Domain Area | Markdown Endpoint | JSON Endpoint | Content Summary |
|---|---|---|---|
| **Executive Summary** | \`https://pogoevents.app/api/agent/summary.md\` | — | Single-request snapshot of active events, Tier 5/Mega raids, Giovanni's Shadow Legendary, and egg pools |
| **Events & Bonuses** | \`https://pogoevents.app/api/agent/events.md\` | \`https://pogoevents.app/api/events\` | All active and upcoming Pokémon GO events with start/end ISO timestamps, bonuses, and wild spawns |
| **Single Event Detail** | \`https://pogoevents.app/api/agent/events/{slug}.md\` | \`https://pogoevents.app/api/events/{slug}\` | Full breakdown of a specific event (bonuses, wild spawns, event eggs, event field research) |
| **Raid Bosses & Counters** | \`https://pogoevents.app/api/agent/raids.md\` | \`https://pogoevents.app/api/raids\` | Active 1★, 3★, 5★, Mega, and Shadow Raid Bosses with 100% IV CP (Lv 20 & Lv 25) and top counters |
| **Team GO Rocket** | \`https://pogoevents.app/api/agent/rocket.md\` | \`https://pogoevents.app/api/rocket\` | Boss Giovanni, Leaders Cliff/Sierra/Arlo, and Grunt taunts, lineups, and Shadow rewards |
| **Egg Hatch Pools** | \`https://pogoevents.app/api/agent/eggs.md\` | \`https://pogoevents.app/api/eggs\` | Current 2km, 5km, 7km, 10km, and 12km Strange Egg hatch pools with CP ranges and shiny flags |
| **Field Research** | \`https://pogoevents.app/api/agent/research.md\` | \`https://pogoevents.app/api/research\` | Current PokéStop Field Research tasks grouped by category with encounter rewards |

---

## 2. Pokémon That Give Extra Stardust on Catch (29 Species Cheat-Sheet)

Standard wild Pokémon award **100 Stardust** per catch (**125** with Weather Boost). The following 29 species permanently grant bonus Stardust on catch (multiply by **1.5×** when a Star Piece is active):

| Tier (Base Stardust) | Weather Boost | Star Piece (1.5×) | Star Piece + Weather | Pokémon Species |
|---|---|---|---|---|
| **2,100 Stardust** | 2,625 | 3,150 | 3,937 | **Audino** (#531, Normal — boosted in Partly Cloudy) |
| **1,000 Stardust** | 1,250 | 1,500 | 1,875 | **Chimecho** (#358), **Parasect** (#47), **Persian** (#53), **Alolan Persian** (#53), **Amoonguss** (#591), **Garbodor** (#569), **Staryu / Starmie** (#121, 950 Dust), **Combee / Vespiquen** (#416, 950 Dust), **Breloom** (#286, 700 Dust), **Sableye** (#302, 750 Dust), **Morelull / Shiinotic** (#756, 700 Dust) |
| **750 Stardust** | 938 | 1,125 | 1,406 | **Alolan Meowth** (#52), **Galarian Meowth** (#52), **Combee** (#415), **Staryu** (#120), **Trubbish** (#568), **Sableye** (#302) |
| **500 Stardust** | 625 | 750 | 938 | **Meowth** (#52), **Paras** (#46), **Shroomish** (#285), **Shellder** (#90), **Cloyster** (#91, 700 Dust), **Delibird** (#225), **Foongus** (#590), **Morelull** (#755), **Furfrou** (#676, 500 Dust) |

---

## 3. Core Pokémon GO Mechanics & Formulas Reference

1. **Type Effectiveness Multipliers in Pokémon GO**:
   - **Double Weakness (2× Super Effective)**: \`2.56×\` damage (\`1.6 × 1.6\`).
   - **Single Weakness (Super Effective)**: \`1.6×\` damage.
   - **Neutral**: \`1.0×\` damage.
   - **Single Resistance (Not Very Effective)**: \`0.625×\` damage.
   - **Double Resistance / Immunity**: \`0.390625×\` damage (\`0.625 × 0.625\`).
   - **STAB (Same-Type Attack Bonus)**: \`1.2×\` damage when move type matches one of the attacker's types.
   - **Shadow Bonus**: \`+20%\` Attack (\`1.2×\` damage dealt) and \`-16.7%\` Defense (\`1.2×\` damage taken). A \`0/0/0\` Shadow Pokémon deals more DPS in raids than a \`15/15/15\` regular form of the same species.
2. **100% IV (Hundo) Encounter Floors**:
   - **Wild (Non-Boosted)**: \`0/0/0\` (1 in 4,096 Hundo odds, max Level 30).
   - **Wild (Weather Boosted)**: \`4/4/4\` (1 in 1,728 Hundo odds, max Level 35).
   - **Raids, Eggs & Field Research**: \`10/10/10\` (1 in 216 Hundo odds; Level 20 for Raids/Eggs, Level 25 for Weather-Boosted Raids, Level 15 for Research).
   - **Shadow Raids**: \`6/6/6\` floor (1 in 1,000 Hundo odds; purifying adds \`+2/+2/+2\` to each IV stat).
   - **Lucky Trades**: \`12/12/12\` floor (1 in 64 Hundo odds, \`-50%\` Stardust power-up cost).
3. **Team GO Rocket Battle Mechanics**:
   - **Stun Lock**: After any Charged Attack or switch, the AI pauses all fast attacks for **2 full seconds** (approx. 4–5 free fast turns).
   - **Shield Burning**: Leaders and Giovanni always use shields on your first two Charged Attacks. Always lead with low-energy spam moves (Power-Up Punch, Cross Chop, Surf, Aqua Tail).
   - **Purification**: Purifying adds \`+2\` to Attack, Defense, and Stamina IVs, promotes the Pokémon directly to Level 25, and reduces candy evolution and power-up costs by 10–20%.

---

## 4. Top PvE Raid Attackers by Type (2026 Meta Cheat-Sheet)

| Attack Type | Top Mega / Primal | Top Shadow / Legendary | Top Non-Shadow / Accessible |
|---|---|---|---|
| **Dragon** | Mega Rayquaza | Origin Palkia, Origin Dialga, Shadow Salamence | Rayquaza, Garchomp, Baxcalibur |
| **Fire** | Mega Blaziken, Mega Charizard Y | Shadow Heatran, Reshiram (Fusion Flare) | Volcarona, Chandelure, Darmanitan |
| **Water** | Primal Kyogre, Mega Swampert | Kyogre (Origin Pulse), Shadow Kyogre | Kingler, Greninja (Hydro Cannon) |
| **Grass** | Mega Sceptile | Kartana, Shaymin (Sky), Shadow Tangrowth | Roserade, Zarude, Chesnaught |
| **Electric** | Mega Manectric | Xurkitree, Shadow Raikou, Zekrom | Thundurus (Therian), Electivire, Magnezone |
| **Ice** | Mega Gardevoir / Mega Abomasnow | Kyurem (Black/White), Shadow Mamoswine | Baxcalibur, Mamoswine, Glaceon |
| **Fighting** | Mega Lucario, Mega Heracross | Terrakion (Sacred Sword), Shadow Conkeldurr | Keldeo, Lucario (Force Palm), Machamp |
| **Rock** | Mega Diancie, Mega Tyranitar | Shadow Rhyperior, Shadow Rampardos | Rhyperior (Rock Wrecker), Tyrantrum |
| **Ground** | Primal Groudon, Mega Garchomp | Groudon (Precipice Blades), Shadow Excadrill | Landorus (Therian), Garchomp, Excadrill |
| **Ghost / Dark** | Mega Tyranitar, Mega Gengar | Dawn Wings Necrozma, Shadow Tyranitar | Hydreigon (Brutal Swing), Giratina-Origin |
| **Steel** | — | Dusk Mane Necrozma (Sunsteel Strike), Shadow Metagross | Metagross (Meteor Mash), Dialga-Origin |
| **Fairy** | Mega Gardevoir | Shadow Gardevoir, Enamorus | Xerneas (Geomancy), Togekiss, Sylveon |
| **Flying** | Mega Rayquaza (Dragon Ascent) | Rayquaza (Dragon Ascent), Shadow Moltres | Yveltal (Oblivion Wing), Staraptor |
| **Psychic** | Mega Alakazam, Mega Gardevoir | Shadow Mewtwo (Psystrike), Mewtwo | Hoopa Unbound, Lunala |

---

## 5. Strategy Guides Index & Summary (18 Core Guides)

1. **Team GO Rocket Leaders & Giovanni Guide** (\`https://pogoevents.app/en/guides/rocket-leaders-giovanni-guide\`)
   - Complete stun-lock exploit guide, shield burning techniques, and counter lineups for Giovanni (Persian + Kangaskhan/Rhyperior/Nidoking + Shadow Legendary), Cliff, Sierra, and Arlo.
2. **Raid Battles & Optimal Counter Guide** (\`https://pogoevents.app/en/guides/raid-battles-counter-guide\`)
   - Weather boost mechanics, Mega bonus damage (+30% same type / +10% other types), Party Power 2x damage multipliers, and duo/trio raid requirements.
3. **Field Research Tasks & Rewards Guide** (\`https://pogoevents.app/en/guides/field-research-tasks-guide\`)
   - Active PokéStop tasks, 10/10/10 IV floor encounters, and stacking research encounters up to 100 Pokémon.
4. **Egg Hatching & Distance Pools Guide** (\`https://pogoevents.app/en/guides/egg-hatching-guide\`)
   - 2km, 5km, 7km (7km Gift eggs), 10km, 12km (Strange Rocket eggs), and Adventure Sync weekly bonus pools (25km & 50km).
5. **Ditto Disguises & Shiny Hunting Guide** (\`https://pogoevents.app/en/guides/ditto-disguises-guide\`)
   - All currently active wild Pokémon disguises. If a disguise species appears as Shiny in the wild, it will NOT transform into Ditto.
6. **Extra Stardust Pokémon Guide** (\`https://pogoevents.app/en/guides/extra-stardust-pokemon-guide\`)
   - Full 29 species breakdown including Audino (2,100 Dust), Chimecho, Shellder, and Star Piece timing for Community Days.
7. **IV Appraisal, Hundos & PvP Stat Product Guide** (\`https://pogoevents.app/en/guides/iv-appraisal-hundo-pvp-guide\`)
   - Why 0/15/15 IVs maximize Great and Ultra League bulk, whereas 15/15/15 (Hundo) is optimal for Master League and PvE Raids.
8. **Mega Evolutions & Primal Reversion Guide** (\`https://pogoevents.app/en/guides/mega-evolutions-bonus-guide\`)
   - Mega Levels 1–3, Mega Energy costs, XL Candy catch probability bonuses, and cooldown reduction.
9. **Community Day & Spotlight Hour Prep Guide** (\`https://pogoevents.app/en/guides/community-day-event-prep-guide\`)
   - Fast Catch technique, custom storage search strings, and maximizing 3x XP/Stardust multipliers.
10. **Routes, Zygarde Cells & Mateo Guide** (\`https://pogoevents.app/en/guides/routes-zygarde-cells-guide\`)
    - How to locate and collect Zygarde Cells (daily cap: 3), upgrade Zygarde 10% -> 50% -> Complete Forme, and exchange postcards with Mateo.
11. **Daily Adventure Incense & Galarian Birds Guide** (\`https://pogoevents.app/en/guides/daily-adventure-incense-galarian-birds\`)
    - 15-minute daily incense mechanics, movement tracking (must walk in straight line), and catching Galarian Articuno, Zapdos, and Moltres (0.3% base catch rate, 90% flee rate).
12. **Lucky Pokémon & Lucky Trading Guide** (\`https://pogoevents.app/en/guides/lucky-pokemon-trading-guide\`)
    - Guaranteed Lucky trade thresholds (Pokémon from 2016–2020, up to 35 guaranteed trades), 12/12/12 IV floor, and 50% power-up Stardust discount.
13. **Vivillon Patterns & Postcard Regions Map** (\`https://pogoevents.app/en/guides/vivillon-patterns-regions-map-guide\`)
    - All 18 Vivillon wing patterns mapped to geographic continents, postcard pinning rules (3 pins = 1 Scatterbug), and friend exchange strategies.
14. **Fast Leveling & XP Grind Guide (Level 1 to 50)** (\`https://pogoevents.app/en/guides/xp-leveling-fast-grind-guide\`)
    - Friendship XP timing with Lucky Eggs (100k -> 200k for Best Friends), Excellent throw mastery (1,000 XP base), and Level 41–50 milestone tasks.
15. **Best Buddy & Excited Mood Without Poffin** (\`https://pogoevents.app/en/guides/buddy-system-excited-poffin-guide\`)
    - Earning 32 Emotion Points in 90 minutes using 30-minute interaction timers, half candy walking distance, and +1 Level CP Boost.
16. **Dynamax & Gigantamax Power Spots Guide** (\`https://pogoevents.app/en/guides/dynamax-gigantamax-max-battles-guide\`)
    - Max Particles (MP) collecting (800 MP daily cap), Max Moves (Max Attack, Max Spirit healing, Max Guard shielding), and 4-trainer Gigantamax battles.
17. **Adventure Effects Guide** (\`https://pogoevents.app/en/guides/adventure-effects-dialga-palkia-necrozma-guide\`)
    - Origin Dialga (Roar of Time — pause timers on Incense/Lucky Egg/Star Piece), Origin Palkia (Spacial Rend — expanded wild spawn radius), Dusk Mane Necrozma (Sunsteel Strike — daytime attraction), Dawn Wings Necrozma (Moongeist Beam — nighttime attraction).
18. **Shadow vs. Purified Pokémon & Frustration Guide** (\`https://pogoevents.app/en/guides/shadow-vs-purified-pokemon-frustration-guide\`)
    - Why +20% Attack makes Shadow Pokémon superior in raids despite taking 20% more damage, and how to remove Frustration during Team GO Rocket Takeover events.

---

## 6. Complete Directory of Canonical URLs

- **Homepage & Calendar**: \`https://pogoevents.app/{cs|en|ja|ru}\`
- **Active Raid Bosses**: \`https://pogoevents.app/{lang}/raids\`
- **Raid Boss Counter Guides**: \`https://pogoevents.app/{lang}/raids/{boss-slug}-counters\`
- **Team GO Rocket Hub**: \`https://pogoevents.app/{lang}/rocket\`
- **Rocket Leader Guides**: \`https://pogoevents.app/{lang}/rocket/{giovanni|cliff|sierra|arlo|grunts}\`
- **PvE & PvP Rankings**: \`https://pogoevents.app/{lang}/rankings\` and \`https://pogoevents.app/{lang}/rankings/{category}\`
- **National Pokédex (#1–#1025)**: \`https://pogoevents.app/{lang}/pokemon/{1..1025}\`
- **Type Matchup Charts (18 Types)**: \`https://pogoevents.app/{lang}/types/{type}\`
- **Trainer Friend Codes & Vivillon Matchmaker**: \`https://pogoevents.app/{lang}/friends\`
- **In-Game Search String Generator**: \`https://pogoevents.app/{lang}/filter\`
`;

fs.writeFileSync(targetPublicPath, content, 'utf8');

if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, 'llms-full.txt'), content, 'utf8');
}

console.log(`[generate-llms-full] Successfully wrote ${Buffer.byteLength(content, 'utf8')} bytes to llms-full.txt`);
