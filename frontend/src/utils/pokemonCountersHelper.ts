import { pokemonRankings } from '../data/pokemonRankings';
import type { PokemonRankData, MoveData } from '../data/pokemonRankings';
import { findRaidCounters } from '../data/raidCounters';
import { isPokemonReleasedInGo } from './pokemonReleaseHelper';

// ─── LEGACY / ELITE TM MOVES ────────────────────────────────────────────────
export const LEGACY_MOVES = new Set<string>([
  // Fast moves (Elite Fast TM / Event / Signature Legacy)
  "Thunder Shock", "Wing Attack", "Vine Whip", "Lick", "Shadow Claw", "Ice Shard", "Dragon Breath",
  "Smack Down", "Counter", "Bullet Punch", "Poison Jab", "Incinerate", "Water Gun",
  "Quick Attack", "Lock-On", "Gust", "Present", "Karate Chop", "Rollout", "Magical Leaf",
  "Force Palm", "Water Shuriken", "Geomancy",

  // Charged moves (Elite Charged TM / Event / Signature Legacy)
  "Psystrike", "Frenzy Plant", "Blast Burn", "Hydro Cannon", "Rock Wrecker", "Meteor Mash",
  "Roar of Time", "Spacial Rend", "Dragon Ascent", "Sacred Sword", "Aeroblast", "Sacred Fire",
  "Doom Desire", "Mist Ball", "Luster Purge", "Origin Pulse", "Precipice Blades", "Sunsteel Strike",
  "Moongeist Beam", "Behemoth Blade", "Behemoth Bash", "Dark Void", "Oblivion Wing",
  "Magma Storm", "Aura Sphere", "High Horsepower", "Rage Fist", "Volt Tackle", "Draco Meteor",
  "Shadow Bone", "Supercell Slam", "Brutal Swing", "Poltergeist", "Tri Attack", "Boomburst",
  "Icicle Spear", "Zap Cannon", "Flying Press", "Scorching Sands", "Night Slash",
  "Fusion Flare", "Fusion Bolt", "Earth Power", "Breaking Swipe", "Shadow Force", "Secret Sword",
  "Double Iron Bash", "Nature's Madness", "Bleakwind Storm", "Sandsear Storm", "Wildbolt Storm",
  "Glaciate", "Freeze Shock", "Ice Burn", "Dynamax Cannon"
]);

export function isLegacyMove(moveName: string): boolean {
  if (!moveName) return false;
  const cleanName = moveName.replace(/\*$/, '').trim();
  return LEGACY_MOVES.has(cleanName) || moveName.includes('*');
}

// ─── POKEMON GO TYPE EFFECTIVENESS MATRIX ───────────────────────────────────
// Attacker Type -> Defender Type -> Multiplier
// 1.6 = Super Effective (SE)
// 0.625 = Not Very Effective (NVE)
// 0.39 = Double Resistance / Immunity (NVE 2x)
export const TYPE_CHART: Record<string, Record<string, number>> = {
  Normal:   { Rock: 0.625, Ghost: 0.39, Steel: 0.625 },
  Fire:     { Fire: 0.625, Water: 0.625, Grass: 1.6, Ice: 1.6, Bug: 1.6, Rock: 0.625, Dragon: 0.625, Steel: 1.6 },
  Water:    { Fire: 1.6, Water: 0.625, Grass: 0.625, Ground: 1.6, Rock: 1.6, Dragon: 0.625 },
  Grass:    { Fire: 0.625, Water: 1.6, Grass: 0.625, Poison: 0.625, Ground: 1.6, Flying: 0.625, Bug: 0.625, Rock: 1.6, Dragon: 0.625, Steel: 0.625 },
  Electric: { Water: 1.6, Grass: 0.625, Electric: 0.625, Ground: 0.39, Flying: 1.6, Dragon: 0.625 },
  Ice:      { Fire: 0.625, Water: 0.625, Grass: 1.6, Ice: 0.625, Ground: 1.6, Flying: 1.6, Dragon: 1.6, Steel: 0.625 },
  Fighting: { Normal: 1.6, Ice: 1.6, Poison: 0.625, Flying: 0.625, Psychic: 0.625, Bug: 0.625, Rock: 1.6, Ghost: 0.39, Dark: 1.6, Steel: 1.6, Fairy: 0.625 },
  Poison:   { Grass: 1.6, Poison: 0.625, Ground: 0.625, Rock: 0.625, Ghost: 0.625, Steel: 0.39, Fairy: 1.6 },
  Ground:   { Fire: 1.6, Electric: 1.6, Grass: 0.625, Poison: 1.6, Flying: 0.39, Bug: 0.625, Rock: 1.6, Steel: 1.6 },
  Flying:   { Grass: 1.6, Electric: 0.625, Fighting: 1.6, Bug: 1.6, Rock: 0.625, Steel: 0.625 },
  Psychic:  { Fighting: 1.6, Poison: 1.6, Psychic: 0.625, Dark: 0.39, Steel: 0.625 },
  Bug:      { Fire: 0.625, Grass: 1.6, Fighting: 0.625, Poison: 0.625, Flying: 0.625, Psychic: 1.6, Ghost: 0.625, Dark: 1.6, Steel: 0.625, Fairy: 0.625 },
  Rock:     { Fire: 1.6, Ice: 1.6, Fighting: 0.625, Ground: 0.625, Flying: 1.6, Bug: 1.6, Steel: 0.625 },
  Ghost:    { Normal: 0.39, Psychic: 1.6, Ghost: 1.6, Dark: 0.625 },
  Dragon:   { Dragon: 1.6, Steel: 0.625, Fairy: 0.39 },
  Dark:     { Fighting: 0.625, Psychic: 1.6, Ghost: 1.6, Dark: 0.625, Fairy: 0.625 },
  Steel:    { Fire: 0.625, Water: 0.625, Electric: 0.625, Ice: 1.6, Rock: 1.6, Steel: 0.625, Fairy: 1.6 },
  Fairy:    { Fire: 0.625, Fighting: 1.6, Poison: 0.625, Dragon: 1.6, Dark: 1.6, Steel: 0.625 }
};

export function getSingleTypeMultiplier(attackType: string, defenderType: string): number {
  if (!attackType || !defenderType) return 1.0;
  const map = TYPE_CHART[attackType];
  if (!map) return 1.0;
  return map[defenderType] ?? 1.0;
}

export function getCombinedDamageMultiplier(attackType: string, defenderTypes: string[]): number {
  if (!defenderTypes || defenderTypes.length === 0) return 1.0;
  let mult = 1.0;
  defenderTypes.forEach(dType => {
    mult *= getSingleTypeMultiplier(attackType, dType);
  });
  return mult;
}

// ─── TYPE WEAKNESS CHART ───────────────────────────────────────────────────
// Type -> Array of types that deal Super Effective damage to it (1.6x)
const TYPE_WEAKNESSES: Record<string, string[]> = {
  Normal: ["Fighting"],
  Fire: ["Water", "Ground", "Rock"],
  Water: ["Grass", "Electric"],
  Grass: ["Fire", "Ice", "Poison", "Flying", "Bug"],
  Electric: ["Ground"],
  Ice: ["Fire", "Fighting", "Rock", "Steel"],
  Fighting: ["Flying", "Psychic", "Fairy"],
  Poison: ["Ground", "Psychic"],
  Ground: ["Water", "Grass", "Ice"],
  Flying: ["Electric", "Ice", "Rock"],
  Psychic: ["Bug", "Ghost", "Dark"],
  Bug: ["Fire", "Flying", "Rock"],
  Rock: ["Water", "Grass", "Fighting", "Ground", "Steel"],
  Ghost: ["Ghost", "Dark"],
  Dragon: ["Ice", "Dragon", "Fairy"],
  Dark: ["Fighting", "Bug", "Fairy"],
  Steel: ["Fire", "Fighting", "Ground"],
  Fairy: ["Poison", "Steel"]
};

export interface CounterTypeInfo {
  type: string;
  multiplier: number; // 2.56 for double weakness, 1.6 for single weakness
  label: string;
}

export function getCounterTypes(types: string[]): CounterTypeInfo[] {
  if (!types || types.length === 0) return [];
  const typeCounts: Record<string, number> = {};

  types.forEach(t => {
    const weaknesses = TYPE_WEAKNESSES[t] || [];
    weaknesses.forEach(w => {
      typeCounts[w] = (typeCounts[w] || 0) + 1;
    });
  });

  const result: CounterTypeInfo[] = [];
  Object.keys(typeCounts).forEach(type => {
    const count = typeCounts[type];
    const multiplier = count >= 2 ? 2.56 : 1.6;
    const label = count >= 2 ? '2.56× (Double)' : '1.6×';
    result.push({ type, multiplier, label });
  });

  // Sort double weaknesses first, then single weaknesses
  return result.sort((a, b) => b.multiplier - a.multiplier);
}

// ─── DEFENSIVE MATCHUP SCORING ──────────────────────────────────────────────
export function calculateDefensiveMatchup(
  attackerTypes: string[],
  bossTypes: string[]
): { defensiveMultiplier: number; defensiveRating: 'resistant' | 'neutral' | 'vulnerable'; defensiveLabel: string } {
  if (!attackerTypes || attackerTypes.length === 0 || !bossTypes || bossTypes.length === 0) {
    return { defensiveMultiplier: 1.0, defensiveRating: 'neutral', defensiveLabel: '⚔️ Neutral' };
  }

  const damageFromBoss = bossTypes.map(bType => getCombinedDamageMultiplier(bType, attackerTypes));
  const maxDamageFromBoss = Math.max(...damageFromBoss);
  const minDamageFromBoss = Math.min(...damageFromBoss);

  // 1. Excellent Defensive Matchup (Attacker RESISTS or IMMUNIZES boss attacks, NVE <= 0.65x)
  if (minDamageFromBoss <= 0.65 || maxDamageFromBoss <= 0.65) {
    return {
      defensiveMultiplier: 1.35, // 35% score boost for resistant tank counters!
      defensiveRating: 'resistant',
      defensiveLabel: '🛡️ Odolný vůči bossu (NVE)'
    };
  }

  // 2. Vulnerable / Glass Matchup (Boss deals Super Effective damage back to attacker, SE >= 1.5x)
  if (maxDamageFromBoss >= 1.5) {
    return {
      defensiveMultiplier: 0.40, // Significant penalty for glass cannons!
      defensiveRating: 'vulnerable',
      defensiveLabel: '⚠️ Glass Cannon / Zranitelný'
    };
  }

  // 3. Neutral Matchup
  return {
    defensiveMultiplier: 1.0,
    defensiveRating: 'neutral',
    defensiveLabel: '⚔️ Neutrální obrana'
  };
}

// ─── TOP COUNTERS FOR A POKEMON ─────────────────────────────────────────────
export interface CounterPokemonInfo {
  pokemon: PokemonRankData;
  counterRating: number;
  effectiveType: string;
  defensiveRating: 'resistant' | 'neutral' | 'vulnerable';
  defensiveLabel: string;
}

export function getTopCountersForPokemonDetailed(
  targetPokemon: PokemonRankData,
  allRankings: PokemonRankData[],
  limit: number = 20,
  filterStrategy: 'resistant' | 'max_dps' = 'resistant'
): CounterPokemonInfo[] {
  const counterTypes = getCounterTypes(targetPokemon.types);
  const primaryCounterTypeNames = new Set(counterTypes.map(c => c.type));

  const candidates = allRankings.filter(p => {
    if (p.pokedexId === targetPokemon.pokedexId) return false;
    return primaryCounterTypeNames.has(p.bestChargedMove.type);
  });

  const scored = candidates.map(poke => {
    const counterInfo = counterTypes.find(c => c.type === poke.bestChargedMove.type);
    const offensiveMult = counterInfo ? counterInfo.multiplier : 1.6;

    const defMatchup = calculateDefensiveMatchup(poke.types, targetPokemon.types);

    const counterRating = filterStrategy === 'resistant'
      ? Math.round(poke.pveScore * (offensiveMult / 1.6) * defMatchup.defensiveMultiplier)
      : Math.round(poke.pveScore * (offensiveMult / 1.6));

    return {
      pokemon: poke,
      counterRating,
      effectiveType: poke.bestChargedMove.type,
      defensiveRating: defMatchup.defensiveRating,
      defensiveLabel: defMatchup.defensiveLabel
    };
  });

  scored.sort((a, b) => b.counterRating - a.counterRating);

  // In 'resistant' mode, strictly exclude glass cannons (vulnerable) so they don't appear in the search string!
  let candidatesToUse = scored;
  if (filterStrategy === 'resistant') {
    const nonGlass = scored.filter(c => c.defensiveRating !== 'vulnerable');
    if (nonGlass.length >= 4) {
      candidatesToUse = nonGlass;
    }
  }

  const topList: CounterPokemonInfo[] = [];
  const usedNames = new Set<string>();

  for (const item of candidatesToUse) {
    const cleanName = item.pokemon.name.replace(/^(shadow|mega|primal)\s+/i, '').trim();
    if (!usedNames.has(cleanName)) {
      usedNames.add(cleanName);
      topList.push(item);
      if (topList.length >= limit) break;
    }
  }

  // If still less than limit, add from scored allowing variants
  if (topList.length < limit) {
    for (const item of scored) {
      if (!topList.some(existing => existing.pokemon.name === item.pokemon.name)) {
        topList.push(item);
        if (topList.length >= limit) break;
      }
    }
  }

  // If still less than limit, fallback to all rankings sorted by PVE score with matching weakness types
  if (topList.length < limit) {
    const weaknesses = getWeaknessesForPokemon(targetPokemon.name).map(w => w.toLowerCase().replace(/\s*\([^)]+\)/g, '').trim());
    const remaining = allRankings
      .filter(p => {
        const typeMatch = p.types.some(t => weaknesses.includes(t.toLowerCase()));
        const moveMatch = weaknesses.includes(p.bestChargedMove?.type?.toLowerCase() || '');
        return (typeMatch || moveMatch) && !topList.some(existing => existing.pokemon.name === p.name);
      })
      .sort((a, b) => (b.pveScore || b.dps || 0) - (a.pveScore || a.dps || 0));

    for (const p of remaining) {
      topList.push({
        pokemon: p,
        counterRating: Math.round(p.pveScore * 1.6),
        effectiveType: p.bestChargedMove?.type || p.types[0] || 'Normal',
        defensiveRating: 'neutral',
        defensiveLabel: '⚔️ Neutrální'
      });
      if (topList.length >= limit) break;
    }
  }

  return topList;
}

export function getTopCountersForPokemon(
  targetPokemon: PokemonRankData,
  allRankings: PokemonRankData[],
  limit: number = 20
): CounterPokemonInfo[] {
  return getTopCountersForPokemonDetailed(targetPokemon, allRankings, limit, 'resistant');
}

// ─── TOP 5 MOVESETS FOR A POKEMON ───────────────────────────────────────────
export interface MovesetOption {
  fastMove: MoveData & { isLegacy?: boolean };
  chargedMove: MoveData & { isLegacy?: boolean };
  dps: number;
  pctOfBest: string;
}

export function getTopMovesetsForPokemon(poke: PokemonRankData): MovesetOption[] {
  const baseDps = poke.dps || 25.0;

  const fastPrimary = poke.bestFastMove;
  const chargedPrimary = poke.bestChargedMove;

  const secondaryType = poke.types[1] || poke.types[0];
  
  const fastOptions: MoveData[] = [
    fastPrimary,
    { name: getAltFastMoveName(poke), type: secondaryType }
  ];

  const chargedOptions: MoveData[] = [
    chargedPrimary,
    { name: getAltChargedMoveName(poke, 1), type: primaryOrSecondaryType(poke, 1) },
    { name: getAltChargedMoveName(poke, 2), type: primaryOrSecondaryType(poke, 2) },
    { name: getAltChargedMoveName(poke, 3), type: "Normal" }
  ];

  const result: MovesetOption[] = [];
  const multipliers = [1.0, 0.95, 0.91, 0.86, 0.82];
  let idx = 0;

  for (const fast of fastOptions) {
    for (const charged of chargedOptions) {
      if (result.length >= 5) break;
      const mult = multipliers[idx] || 0.80;
      const dpsVal = Number((baseDps * mult).toFixed(1));
      const pct = idx === 0 ? "100%" : `${Math.round(mult * 100)}%`;

      result.push({
        fastMove: { ...fast, isLegacy: isLegacyMove(fast.name) },
        chargedMove: { ...charged, isLegacy: isLegacyMove(charged.name) },
        dps: dpsVal,
        pctOfBest: pct
      });
      idx++;
    }
  }

  return result;
}

function primaryOrSecondaryType(poke: PokemonRankData, index: number): string {
  if (index === 1 && poke.types[1]) return poke.types[1];
  if (index === 2 && poke.types[0]) return poke.types[0];
  return "Normal";
}

function getAltFastMoveName(poke: PokemonRankData): string {
  const type = poke.types[1] || poke.types[0];
  const defaults: Record<string, string> = {
    Fire: "Fire Spin", Water: "Waterfall", Grass: "Vine Whip*", Electric: "Thunder Shock*",
    Ice: "Ice Shard*", Fighting: "Counter", Poison: "Poison Jab", Ground: "Mud-Shot",
    Flying: "Wing Attack*", Psychic: "Confusion", Bug: "Bug Bite*", Rock: "Smack Down*",
    Ghost: "Shadow Claw", Dragon: "Dragon Tail", Dark: "Snarl", Steel: "Bullet Punch",
    Fairy: "Charm", Normal: "Quick Attack*"
  };
  return defaults[type] || "Tackle";
}

function getAltChargedMoveName(poke: PokemonRankData, altIndex: number): string {
  const type = (altIndex === 1 && poke.types[1]) ? poke.types[1] : poke.types[0];
  const defaults1: Record<string, string> = {
    Fire: "Overheat", Water: "Hydro Pump", Grass: "Solar Beam", Electric: "Wild Charge*",
    Ice: "Ice Beam*", Fighting: "Close Combat", Poison: "Sludge Wave", Ground: "Earth Power*",
    Flying: "Brave Bird*", Psychic: "Psychic*", Bug: "X-Scissor", Rock: "Stone Edge",
    Ghost: "Shadow Ball*", Dragon: "Outrage*", Dark: "Foul Play", Steel: "Flash Cannon",
    Fairy: "Dazzling Gleam", Normal: "Hyper Beam*"
  };
  const defaults2: Record<string, string> = {
    Fire: "Flamethrower*", Water: "Surf", Grass: "Energy Ball", Electric: "Thunder",
    Ice: "Avalanche", Fighting: "Focus Blast", Poison: "Cross Poison", Ground: "Earthquake",
    Flying: "Sky Attack*", Psychic: "Psyshock", Bug: "Lunge", Rock: "Rock Slide",
    Ghost: "Ominous Wind", Dragon: "Dragon Pulse*", Dark: "Dark Pulse", Steel: "Iron Head",
    Fairy: "Play Rough", Normal: "Body Slam*"
  };
  return altIndex === 1 ? (defaults1[type] || "Hyper Beam*") : (defaults2[type] || "Return");
}

// ─── POKEMON TYPE DATABASE FOR RAID BOSSES & SPECIES ───────────────────────
export const POKEMON_TYPE_DB: Record<string, string[]> = {
  // Lake Guardians & Psychic Legendaries
  'mesprit': ['Psychic'],
  'uxie': ['Psychic'],
  'azelf': ['Psychic'],
  'mewtwo': ['Psychic'],
  'mew': ['Psychic'],
  'cresselia': ['Psychic'],
  'deoxys': ['Psychic'],
  'necrozma': ['Psychic'],
  'dusk mane necrozma': ['Psychic', 'Steel'],
  'dawn wings necrozma': ['Psychic', 'Ghost'],
  'ultra necrozma': ['Psychic', 'Dragon'],
  'solgaleo': ['Psychic', 'Steel'],
  'lunala': ['Psychic', 'Ghost'],
  
  // Kanto / Johto / Hoenn / Sinnoh / Unova / Kalos / Alola / Galar / Paldea Raid Bosses
  'articuno': ['Ice', 'Flying'],
  'zapdos': ['Electric', 'Flying'],
  'moltres': ['Fire', 'Flying'],
  'raikou': ['Electric'],
  'entei': ['Fire'],
  'suicune': ['Water'],
  'lugia': ['Psychic', 'Flying'],
  'ho-oh': ['Fire', 'Flying'],
  'celebi': ['Psychic', 'Grass'],
  'regirock': ['Rock'],
  'regice': ['Ice'],
  'registeel': ['Steel'],
  'latias': ['Dragon', 'Psychic'],
  'latios': ['Dragon', 'Psychic'],
  'kyogre': ['Water'],
  'groudon': ['Ground'],
  'rayquaza': ['Dragon', 'Flying'],
  'jirachi': ['Steel', 'Psychic'],
  'dialga': ['Steel', 'Dragon'],
  'palkia': ['Water', 'Dragon'],
  'heatran': ['Fire', 'Steel'],
  'regigigas': ['Normal'],
  'giratina': ['Ghost', 'Dragon'],
  'darkrai': ['Dark'],
  'shaymin': ['Grass'],
  'arceus': ['Normal'],
  'victini': ['Psychic', 'Fire'],
  'cobalion': ['Steel', 'Fighting'],
  'terrakion': ['Rock', 'Fighting'],
  'virizion': ['Grass', 'Fighting'],
  'tornadus': ['Flying'],
  'thundurus': ['Electric', 'Flying'],
  'reshiram': ['Dragon', 'Fire'],
  'zekrom': ['Dragon', 'Electric'],
  'landorus': ['Ground', 'Flying'],
  'kyurem': ['Dragon', 'Ice'],
  'keldeo': ['Water', 'Fighting'],
  'meloetta': ['Normal', 'Psychic'],
  'genesect': ['Bug', 'Steel'],
  'xerneas': ['Fairy'],
  'yveltal': ['Dark', 'Flying'],
  'zygarde': ['Dragon', 'Ground'],
  'diancie': ['Rock', 'Fairy'],
  'hoopa': ['Psychic', 'Ghost'],
  'volcanion': ['Fire', 'Water'],
  'tapu koko': ['Electric', 'Fairy'],
  'tapu lele': ['Psychic', 'Fairy'],
  'tapu bulu': ['Grass', 'Fairy'],
  'tapu fini': ['Water', 'Fairy'],
  'nihilego': ['Rock', 'Poison'],
  'buzzwole': ['Bug', 'Fighting'],
  'pheromosa': ['Bug', 'Fighting'],
  'xurkitree': ['Electric'],
  'celesteela': ['Steel', 'Flying'],
  'kartana': ['Grass', 'Steel'],
  'guzzlord': ['Dark', 'Dragon'],
  'poipole': ['Poison'],
  'naganadel': ['Poison', 'Dragon'],
  'stakataka': ['Rock', 'Steel'],
  'blacephalon': ['Fire', 'Ghost'],
  'meltan': ['Steel'],
  'melmetal': ['Steel'],
  'zacian': ['Fairy'],
  'zamazenta': ['Fighting'],
  'eternatus': ['Poison', 'Dragon'],
  'urshifu': ['Fighting', 'Dark'],
  'zarude': ['Grass', 'Dark'],
  'regieleki': ['Electric'],
  'regidrago': ['Dragon'],
  'glastrier': ['Ice'],
  'spectrier': ['Ghost'],
  'calyrex': ['Psychic', 'Grass'],
  'enamorus': ['Fairy', 'Flying'],
  'great tusk': ['Ground', 'Fighting'],
  'iron treads': ['Ground', 'Steel'],
  'iron bundle': ['Ice', 'Water'],
  'iron hands': ['Fighting', 'Electric'],
  'iron jugulis': ['Dark', 'Flying'],
  'iron moth': ['Fire', 'Poison'],
  'iron thorns': ['Rock', 'Electric'],
  'frigibax': ['Dragon', 'Ice'],
  'baxcalibur': ['Dragon', 'Ice'],
  'gholdengo': ['Steel', 'Ghost'],
  'wo-chien': ['Dark', 'Grass'],
  'chien-pao': ['Dark', 'Ice'],
  'ting-lu': ['Dark', 'Ground'],
  'chi-yu': ['Dark', 'Fire'],
  'roaring moon': ['Dragon', 'Dark'],
  'iron valiant': ['Fairy', 'Fighting'],
  'koraidon': ['Fighting', 'Dragon'],
  'miraidon': ['Electric', 'Dragon'],
  'walking wake': ['Water', 'Dragon'],
  'iron leaves': ['Grass', 'Psychic'],
  'archaludon': ['Steel', 'Dragon'],
  'gouging fire': ['Fire', 'Dragon'],
  'raging bolt': ['Electric', 'Dragon'],
  'iron boulder': ['Rock', 'Psychic'],
  'iron crown': ['Steel', 'Psychic'],
  'terapagos': ['Normal']
};

/**
 * Resolves the accurate elemental types for any Pokemon name.
 */
export function getPokemonTypesByName(bossName: string): string[] {
  if (!bossName) return ['Normal'];
  const clean = bossName.toLowerCase().replace(/^(shadow|mega|primal|apex)\s+/, '').trim();
  const baseClean = clean.replace(/\s*\([^)]+\)/g, '').trim();

  // 1. Check direct match in pokemonRankings
  const rankMatch = pokemonRankings.find(p => p.name.toLowerCase().includes(clean) || p.name.toLowerCase().includes(baseClean));
  if (rankMatch) return rankMatch.types;

  // 2. Check direct match in POKEMON_TYPE_DB
  if (POKEMON_TYPE_DB[clean]) return POKEMON_TYPE_DB[clean];
  if (POKEMON_TYPE_DB[baseClean]) return POKEMON_TYPE_DB[baseClean];

  // 3. Substring match in POKEMON_TYPE_DB
  for (const key of Object.keys(POKEMON_TYPE_DB)) {
    if (clean.includes(key) || key.includes(clean) || baseClean.includes(key)) {
      return POKEMON_TYPE_DB[key];
    }
  }

  // Fallback to Normal (neutral) instead of Dialga's Dragon/Steel
  return ['Normal'];
}

export interface RaidFilterOptions {
  tierMode?: 'universal' | 'hardcore' | 'budget' | 'weather';
  includeFrustrationExclusion?: boolean; // default true: !@frustration
  ivFilter?: '3*,4*' | '4*' | 'all';     // default 'all' for universal/budget, '3*,4*' for hardcore
  minCp?: number;                         // e.g. 2000 or 2500
  dualMoveCheck?: boolean;                // default true: @1type & @2type,@3type
  weatherBoosted?: boolean;               // default false: @weather
  filterStrategy?: 'resistant' | 'max_dps';
  maxCountersCount?: number;             // default 25
}

export interface TieredCountersResult {
  tierS: PokemonRankData[];
  tierA: PokemonRankData[];
  tierB: PokemonRankData[];
  tierC: PokemonRankData[];
  allPokedexIds: number[];
}

export function getTopCountersByName(bossName: string, limit: number = 20): PokemonRankData[] {
  const clean = bossName.toLowerCase().replace(/^(shadow|mega|primal)\s+/, '').trim();
  const resolvedTypes = getPokemonTypesByName(bossName);
  
  const targetPoke = pokemonRankings.find(p => p.name.toLowerCase().includes(clean)) || {
    name: bossName,
    pokedexId: 9999,
    types: resolvedTypes,
    attack: 250, defense: 200, stamina: 200, maxCp: 3800, pveScore: 90, dps: 25,
    bestFastMove: { name: 'Tackle', type: resolvedTypes[0] || 'Normal' },
    bestChargedMove: { name: 'Body Slam', type: resolvedTypes[0] || 'Normal' }
  };

  const counters = getTopCountersForPokemon(targetPoke, pokemonRankings, limit);
  return counters.map(c => c.pokemon);
}

export function getCounterTypesForName(bossName: string): string[] {
  const types = getPokemonTypesByName(bossName);
  const counterInfos = getCounterTypes(types);
  return counterInfos.map(c => c.type);
}

/**
 * Categorizes PvE counters into 4 tiers (Tier S: Megas/Shadows, Tier A: Legendaries, Tier B: Standard Meta, Tier C: Budget)
 */
export function getTieredCountersForBoss(
  bossName: string,
  filterStrategy: 'resistant' | 'max_dps' = 'resistant'
): TieredCountersResult {
  const clean = bossName.toLowerCase().replace(/^(shadow|mega|primal)\s+/, '').trim();
  const resolvedTypes = getPokemonTypesByName(bossName);
  
  const targetPoke = pokemonRankings.find(p => p.name.toLowerCase().includes(clean)) || {
    name: bossName,
    pokedexId: 9999,
    types: resolvedTypes,
    attack: 250, defense: 200, stamina: 200, maxCp: 3800, pveScore: 90, dps: 25,
    bestFastMove: { name: 'Tackle', type: resolvedTypes[0] || 'Normal' },
    bestChargedMove: { name: 'Body Slam', type: resolvedTypes[0] || 'Normal' }
  };

  const detailed = getTopCountersForPokemonDetailed(targetPoke, pokemonRankings, 40, filterStrategy);
  const counterTypes = getCounterTypesForName(bossName).map(t => t.toLowerCase());
  const counterTypeSet = new Set(counterTypes);

  // Group into tiers
  const tierS: PokemonRankData[] = [];
  const tierA: PokemonRankData[] = [];
  const tierB: PokemonRankData[] = [];
  const tierC: PokemonRankData[] = [];

  const seenIdsS = new Set<number>();
  const seenIdsA = new Set<number>();
  const seenIdsB = new Set<number>();
  const seenIdsC = new Set<number>();

  for (const item of detailed) {
    const p = item.pokemon;
    const isMegaPrimal = p.isMega || p.isPrimal;
    const isShadow = p.isShadow;
    const score = item.counterRating;

    if (isMegaPrimal || (isShadow && score >= 130)) {
      if (!seenIdsS.has(p.pokedexId) && tierS.length < 8) {
        seenIdsS.add(p.pokedexId);
        tierS.push(p);
      }
    } else if (score >= 120 || (isShadow && score >= 110)) {
      if (!seenIdsA.has(p.pokedexId) && tierA.length < 8) {
        seenIdsA.add(p.pokedexId);
        tierA.push(p);
      }
    } else if (score >= 95) {
      if (!seenIdsB.has(p.pokedexId) && tierB.length < 10) {
        seenIdsB.add(p.pokedexId);
        tierB.push(p);
      }
    } else {
      if (!seenIdsC.has(p.pokedexId) && tierC.length < 10) {
        seenIdsC.add(p.pokedexId);
        tierC.push(p);
      }
    }
  }

  // Also supplement Tier C (budget wild spawns & common evolutions) if weak to boss
  const budgetCandidates = pokemonRankings.filter(p => 
    !p.isMega && !p.isPrimal && !p.isShadow &&
    p.pokedexId <= 900 &&
    counterTypeSet.has((p.bestChargedMove?.type || '').toLowerCase()) &&
    !seenIdsS.has(p.pokedexId) && !seenIdsA.has(p.pokedexId) && !seenIdsB.has(p.pokedexId) && !seenIdsC.has(p.pokedexId)
  ).sort((a, b) => b.pveScore - a.pveScore).slice(0, 8);

  budgetCandidates.forEach(p => {
    if (tierC.length < 12) {
      seenIdsC.add(p.pokedexId);
      tierC.push(p);
    }
  });

  const allIds = Array.from(new Set([
    ...tierS.map(p => p.pokedexId),
    ...tierA.map(p => p.pokedexId),
    ...tierB.map(p => p.pokedexId),
    ...tierC.map(p => p.pokedexId),
  ])).filter(id => id > 0 && id < 9999);

  return { tierS, tierA, tierB, tierC, allPokedexIds: allIds };
}

/**
 * Generates an advanced, player-friendly Pokémon GO search filter string.
 * Supports: Universal (all players), Hardcore (top IV/CP), Budget, Weather Boost,
 * with dual Fast+Charged move validation (@1type & @2type,@3type) and !@frustration exclusion.
 */
export function generateRaidSearchString(bossName: string, options: RaidFilterOptions = {}): string {
  const {
    tierMode = 'universal',
    includeFrustrationExclusion = true,
    ivFilter,
    minCp,
    dualMoveCheck = true,
    weatherBoosted = false,
    filterStrategy = 'resistant',
    maxCountersCount = 25
  } = options;

  const tiered = getTieredCountersForBoss(bossName, filterStrategy);
  const counterTypes = getCounterTypesForName(bossName).map(t => t.toLowerCase());

  if (tiered.allPokedexIds.length === 0 && counterTypes.length === 0) return '';

  const parts: string[] = [];

  // 1. IV Filter (3*, 4*)
  if (ivFilter && ivFilter !== 'all') {
    parts.push(ivFilter);
  } else if (tierMode === 'hardcore') {
    parts.push('3*,4*');
  }

  // 2. CP Threshold
  if (minCp && minCp > 0) {
    parts.push(`cp${minCp}-`);
  } else if (tierMode === 'hardcore') {
    parts.push('cp2500-');
  } else if (tierMode === 'budget') {
    parts.push('cp1800-');
  }

  // 3. Weather Boost
  if (weatherBoosted || tierMode === 'weather') {
    parts.push('@weather');
  }

  // 4. Selected Pokedex IDs based on Tier
  let selectedIds: number[] = [];
  if (tierMode === 'hardcore') {
    selectedIds = Array.from(new Set([
      ...tiered.tierS.map(p => p.pokedexId),
      ...tiered.tierA.map(p => p.pokedexId)
    ]));
  } else if (tierMode === 'budget') {
    selectedIds = Array.from(new Set([
      ...tiered.tierB.map(p => p.pokedexId),
      ...tiered.tierC.map(p => p.pokedexId)
    ]));
  } else {
    // Universal: Include S, A, B, C to ensure all players find effective counters
    selectedIds = tiered.allPokedexIds.slice(0, maxCountersCount);
  }

  if (selectedIds.length > 0) {
    parts.push(selectedIds.join(','));
  }

  // 5. Dual Moveset Validation: Fast Move (@1type) AND Charged Move (@2type, @3type)
  if (counterTypes.length > 0) {
    if (dualMoveCheck) {
      const fastMoves = counterTypes.map(t => `@1${t}`).join(',');
      const chargedMoves = counterTypes.flatMap(t => [`@2${t}`, `@3${t}`]).join(',');
      parts.push(fastMoves);
      parts.push(chargedMoves);
    } else {
      parts.push(counterTypes.map(t => `@${t}`).join(','));
    }
  }

  // 6. Anti-Frustration Filter: Excludes Shadow Pokemon with un-TM'd Frustration
  if (includeFrustrationExclusion) {
    parts.push('!@frustration');
  }

  return parts.join('&');
}

export function getTopCountersFilterString(
  bossName: string,
  includeMoves: boolean = true,
  includeStars: boolean = false,
  options?: RaidFilterOptions
): string {
  return generateRaidSearchString(bossName, {
    tierMode: 'universal',
    includeFrustrationExclusion: true,
    dualMoveCheck: includeMoves,
    ivFilter: includeStars ? '3*,4*' : 'all',
    ...options
  });
}

/**
 * Resolves accurate type weaknesses for any raid boss or Pokemon name.
 * Uses raidCountersDb if present, otherwise calculates weaknesses dynamically from the Pokemon's types.
 */
export function getWeaknessesForPokemon(bossName: string): string[] {
  if (!bossName) return ['Ghost', 'Dark', 'Bug'];
  const matched = findRaidCounters(bossName);
  if (matched && matched.weaknesses && matched.weaknesses.length > 0) {
    return matched.weaknesses;
  }
  const types = getPokemonTypesByName(bossName);
  const counterInfos = getCounterTypes(types);
  if (counterInfos && counterInfos.length > 0) {
    return counterInfos.map(c => c.multiplier >= 2 ? `${c.type} (2x)` : c.type);
  }
  return ['Ghost', 'Dark', 'Bug'];
}

export interface BossTypeRankItem {
  typeRank: number;
  typeName: string;
  typeSlug: string;
  badgeLabelEn: string;
  badgeLabelCs: string;
}

export interface BossRankingInfo {
  typeRank: number;
  typeName: string;
  typeSlug: string;
  overallRank: number;
  pveScore: number;
  badgeLabelEn: string;
  badgeLabelCs: string;
  topTypeRanks: BossTypeRankItem[];
}

const ALL_POKEMON_TYPES = [
  'Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Ice',
  'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug',
  'Rock', 'Ghost', 'Dragon', 'Steel', 'Dark', 'Fairy'
];

const TYPE_TRANSLATIONS: Record<string, { en: string; cs: string }> = {
  Dragon: { en: 'Dragon', cs: 'Dračí' },
  Fire: { en: 'Fire', cs: 'Ohnivý' },
  Water: { en: 'Water', cs: 'Vodní' },
  Grass: { en: 'Grass', cs: 'Travní' },
  Electric: { en: 'Electric', cs: 'Elektrický' },
  Ice: { en: 'Ice', cs: 'Ledový' },
  Fighting: { en: 'Fighting', cs: 'Bojový' },
  Poison: { en: 'Poison', cs: 'Jedový' },
  Ground: { en: 'Ground', cs: 'Zemní' },
  Flying: { en: 'Flying', cs: 'Létající' },
  Psychic: { en: 'Psychic', cs: 'Psychický' },
  Bug: { en: 'Bug', cs: 'Hmyzí' },
  Rock: { en: 'Rock', cs: 'Kamenný' },
  Ghost: { en: 'Ghost', cs: 'Duchový' },
  Dark: { en: 'Dark', cs: 'Temný' },
  Steel: { en: 'Steel', cs: 'Ocelový' },
  Fairy: { en: 'Fairy', cs: 'Vílí' },
  Normal: { en: 'Normal', cs: 'Normální' }
};

import { calculateDialgaDexMetrics } from './dialgaDexCalculator';

/**
 * Returns accurate attacker tier ranking for any Pokemon (e.g. #1 DRAGON ATTACKER)
 * derived directly from pokemonRankings as single source of truth.
 * Supports returning multiple top-10 ranks (max 3).
 */
export function getPokemonRankingInfo(pokemonName: string): BossRankingInfo {
  const fallbackType = 'Dragon';
  if (!pokemonName) {
    return {
      typeRank: 1,
      typeName: fallbackType,
      typeSlug: 'dragon',
      overallRank: 1,
      pveScore: 100,
      badgeLabelEn: '#1 DRAGON ATTACKER',
      badgeLabelCs: '#1 DRAČÍ ÚTOČNÍK',
      topTypeRanks: [{
        typeRank: 1,
        typeName: fallbackType,
        typeSlug: 'dragon',
        badgeLabelEn: '#1 DRAGON ATTACKER',
        badgeLabelCs: '#1 DRAČÍ ÚTOČNÍK'
      }]
    };
  }

  const clean = pokemonName.toLowerCase().replace(/^(shadow|mega|primal|apex)\s+/, '').trim();
  const baseClean = clean.replace(/\s*\([^)]+\)/g, '').trim();
  const resolvedTypes = getPokemonTypesByName(pokemonName);
  const primaryType = resolvedTypes[0] || 'Normal';

  const isShadow = /^shadow\b/i.test(pokemonName);
  const isMega = /^mega\b/i.test(pokemonName);
  const isPrimal = /^primal\b/i.test(pokemonName);

  // Find exact match first, then base match
  const found = pokemonRankings.find(p => p.name.toLowerCase() === pokemonName.toLowerCase())
    || (isShadow ? pokemonRankings.find(p => p.isShadow && (p.name.toLowerCase().includes(clean) || clean.includes(p.name.toLowerCase()))) : null)
    || (isMega ? pokemonRankings.find(p => p.isMega && (p.name.toLowerCase().includes(clean) || clean.includes(p.name.toLowerCase()))) : null)
    || (isPrimal ? pokemonRankings.find(p => p.isPrimal && (p.name.toLowerCase().includes(clean) || clean.includes(p.name.toLowerCase()))) : null)
    || pokemonRankings.find(p => p.name.toLowerCase() === clean)
    || pokemonRankings.find(p => p.name.toLowerCase() === baseClean)
    || pokemonRankings.find(p => p.name.toLowerCase().includes(clean) || clean.includes(p.name.toLowerCase()))
    || pokemonRankings.find(p => p.name.toLowerCase().includes(baseClean) || baseClean.includes(p.name.toLowerCase()));

  const foundPokedexId = found?.pokedexId;

  // Comparator for attacker ranking using official DialgaDex / Pokemon GO Hub ER metric
  const attackerComparator = (a: PokemonRankData, b: PokemonRankData) => {
    const scoreA = calculateDialgaDexMetrics(a).rawEr;
    const scoreB = calculateDialgaDexMetrics(b).rawEr;
    if (Math.abs(scoreB - scoreA) > 0.0001) return scoreB - scoreA;
    const effAtkA = a.isShadow ? Math.round(a.attack * 1.2) : a.attack;
    const effAtkB = b.isShadow ? Math.round(b.attack * 1.2) : b.attack;
    if (effAtkB !== effAtkA) return effAtkB - effAtkA;
    if (b.dps !== a.dps) return b.dps - a.dps;
    return b.maxCp - a.maxCp;
  };

  const candidateTypes: BossTypeRankItem[] = [];
  let bestAllTypeRank: BossTypeRankItem | null = null;

  // Check all 18 types
  ALL_POKEMON_TYPES.forEach(type => {
    const typeAttackers = pokemonRankings
      .filter(p => isPokemonReleasedInGo(p) && p.bestChargedMove?.type === type)
      .sort(attackerComparator);

    // Group by unique species/variant
    const seen = new Set<string>();
    const uniqueList: PokemonRankData[] = [];
    typeAttackers.forEach(p => {
      const key = `${p.name}-${p.pokedexId}-${p.isShadow ? '1' : '0'}-${p.isMega ? '1' : '0'}-${p.isPrimal ? '1' : '0'}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueList.push(p);
      }
    });

    const rankIdx = found
      ? uniqueList.findIndex(p =>
          p.name.toLowerCase() === found.name.toLowerCase() &&
          p.isShadow === found.isShadow &&
          p.isMega === found.isMega &&
          p.isPrimal === found.isPrimal
        )
      : -1;

    const rank = rankIdx >= 0 ? rankIdx + 1 : (foundPokedexId ? uniqueList.findIndex(p => p.pokedexId === foundPokedexId) + 1 : 0);

    if (rank > 0) {
      const trans = TYPE_TRANSLATIONS[type] || { en: type, cs: type };
      const item: BossTypeRankItem = {
        typeRank: rank,
        typeName: type,
        typeSlug: type.toLowerCase(),
        badgeLabelEn: `#${rank} ${type.toUpperCase()} ATTACKER`,
        badgeLabelCs: `#${rank} ${trans.cs.toUpperCase()} ÚTOČNÍK`
      };

      if (!bestAllTypeRank || rank < bestAllTypeRank.typeRank) {
        bestAllTypeRank = item;
      }

      if (rank <= 10) {
        candidateTypes.push(item);
      }
    }
  });

  // Sort candidate types by rank (1, 2, 3...)
  candidateTypes.sort((a, b) => a.typeRank - b.typeRank);

  // Take top up to 3
  let topTypeRanks = candidateTypes.slice(0, 3);

  // If no rank <= 10 found, use its true calculated best type rank
  if (topTypeRanks.length === 0) {
    if (bestAllTypeRank) {
      topTypeRanks = [bestAllTypeRank];
    } else {
      const primaryTypeName = found?.bestChargedMove?.type || found?.types[0] || primaryType;
      const trans = TYPE_TRANSLATIONS[primaryTypeName] || { en: primaryTypeName, cs: primaryTypeName };
      topTypeRanks = [{
        typeRank: 99,
        typeName: primaryTypeName,
        typeSlug: primaryTypeName.toLowerCase(),
        badgeLabelEn: `#99 ${primaryTypeName.toUpperCase()} ATTACKER`,
        badgeLabelCs: `#99 ${trans.cs.toUpperCase()} ÚTOČNÍK`
      }];
    }
  }

  const best = topTypeRanks[0];

  return {
    typeRank: best.typeRank,
    typeName: best.typeName,
    typeSlug: best.typeSlug,
    overallRank: 1,
    pveScore: found?.pveScore || 90,
    badgeLabelEn: best.badgeLabelEn,
    badgeLabelCs: best.badgeLabelCs,
    topTypeRanks
  };
}

export interface AccurateRaidCounter {
  name: string;
  move: string;
  types: string[];
  image: string;
  rank: number;
  dps: number;
  pveScore: number;
  isTop1?: boolean;
}

/**
 * Derives top raid counters directly from pokemonRankings matching boss type weaknesses.
 */
export function getAccurateRaidCounters(bossName: string, limit: number = 7): AccurateRaidCounter[] {
  const clean = bossName.toLowerCase().replace(/^(shadow|mega|primal)\s+/, '').trim();
  const baseClean = clean.replace(/\s*\([^)]+\)/g, '').trim();
  const resolvedTypes = getPokemonTypesByName(bossName);

  const targetPoke = pokemonRankings.find(p => p.name.toLowerCase() === clean || p.name.toLowerCase() === baseClean)
    || pokemonRankings.find(p => p.name.toLowerCase().includes(clean) || clean.includes(p.name.toLowerCase()))
    || {
      name: bossName,
      pokedexId: 9999,
      types: resolvedTypes,
      attack: 250, defense: 200, stamina: 200, maxCp: 3800, pveScore: 90, dps: 25,
      bestFastMove: { name: 'Tackle', type: resolvedTypes[0] || 'Normal' },
      bestChargedMove: { name: 'Body Slam', type: resolvedTypes[0] || 'Normal' }
    };

  const detailedCounters = getTopCountersForPokemonDetailed(targetPoke, pokemonRankings, limit, 'resistant');

  return detailedCounters.map((item, idx) => {
    const poke = item.pokemon;
    const fast = poke.bestFastMove?.name || '';
    const charged = poke.bestChargedMove?.name || '';
    const move = fast && charged ? `${fast} / ${charged}` : (charged || fast || '');

    return {
      name: poke.name,
      move,
      types: poke.types || [item.effectiveType],
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.pokedexId}.png`,
      rank: idx + 1,
      dps: poke.dps || 0,
      pveScore: poke.pveScore || 0,
      isTop1: idx === 0
    };
  });
}
