import { pokemonRankings } from '../data/pokemonRankings';
import type { PokemonRankData, MoveData } from '../data/pokemonRankings';

// ─── LEGACY / ELITE TM MOVES ────────────────────────────────────────────────
export const LEGACY_MOVES = new Set<string>([
  // Fast moves (Elite TM / Event Legacy)
  "Thunder Shock", "Wing Attack", "Vine Whip", "Lick", "Shadow Claw", "Ice Shard", "Dragon Breath",
  "Smack Down", "Counter", "Bullet Punch", "Poison Jab", "Incinerate", "Water Gun",
  "Quick Attack", "Lock-On", "Gust", "Present", "Karate Chop", "Rollout", "Magical Leaf",

  // Charged moves (Elite TM / Event / Signature Legacy)
  "Psystrike", "Frenzy Plant", "Blast Burn", "Hydro Cannon", "Rock Wrecker", "Meteor Mash",
  "Roar of Time", "Spacial Rend", "Dragon Ascent", "Sacred Sword", "Aeroblast", "Sacred Fire",
  "Doom Desire", "Mist Ball", "Luster Purge", "Origin Pulse", "Precipice Blades", "Sunsteel Strike",
  "Moongeist Beam", "Behemoth Blade", "Behemoth Bash", "Dark Void", "Oblivion Wing", "Geomancy",
  "Magma Storm", "Aura Sphere", "High Horsepower", "Rage Fist", "Volt Tackle", "Draco Meteor",
  "Shadow Bone", "Supercell Slam", "Brutal Swing", "Poltergeist", "Tri Attack", "Boomburst",
  "Icicle Spear", "Zap Cannon", "Flying Press", "Scorching Sands", "Night Slash"
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
  const usedDex = new Set<number>();

  for (const item of candidatesToUse) {
    if (!usedDex.has(item.pokemon.pokedexId)) {
      usedDex.add(item.pokemon.pokedexId);
      topList.push(item);
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

export function getTopCountersByName(bossName: string, limit: number = 20): PokemonRankData[] {
  const clean = bossName.toLowerCase().replace(/^(shadow|mega|primal)\s+/, '').trim();
  const targetPoke = pokemonRankings.find(p => p.name.toLowerCase().includes(clean)) || {
    name: bossName, pokedexId: 483, types: ['Dragon', 'Steel'], attack: 275, defense: 211, stamina: 205, maxCp: 4565, pveScore: 90, dps: 25,
    bestFastMove: { name: 'Dragon Breath', type: 'Dragon' }, bestChargedMove: { name: 'Draco Meteor', type: 'Dragon' }
  };

  const counters = getTopCountersForPokemon(targetPoke, pokemonRankings, limit);
  return counters.map(c => c.pokemon);
}

export function getCounterTypesForName(bossName: string): string[] {
  const clean = bossName.toLowerCase().replace(/^(shadow|mega|primal)\s+/, '').trim();
  const targetPoke = pokemonRankings.find(p => p.name.toLowerCase().includes(clean));
  const types = targetPoke ? targetPoke.types : ['Dragon', 'Steel'];
  const counterInfos = getCounterTypes(types);
  return counterInfos.map(c => c.type);
}

export function getTopCountersFilterString(bossName: string, includeMoves: boolean = true, includeStars: boolean = true): string {
  const topCounters = getTopCountersByName(bossName, 20);
  if (topCounters.length === 0) return '';
  
  const uniqueIds = Array.from(new Set(topCounters.map(c => c.pokedexId)));
  const counterTypes = getCounterTypesForName(bossName);
  
  const parts: string[] = [];

  if (includeStars) {
    parts.push('3*,4*');
  }

  if (includeMoves && counterTypes.length > 0) {
    const moveTypesStr = counterTypes.map(t => `@${t.toLowerCase()}`).join(',');
    parts.push(moveTypesStr);
  }

  parts.push(uniqueIds.join(','));

  return parts.join('&');
}
