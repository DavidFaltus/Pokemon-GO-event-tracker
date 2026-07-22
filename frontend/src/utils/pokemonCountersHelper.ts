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

// ─── TOP COUNTERS FOR A POKEMON ─────────────────────────────────────────────
export interface CounterPokemonInfo {
  pokemon: PokemonRankData;
  counterRating: number; // DPS / PVE score relative ranking
  effectiveType: string;
}

export function getTopCountersForPokemon(
  targetPokemon: PokemonRankData,
  allRankings: PokemonRankData[]
): CounterPokemonInfo[] {
  const counterTypes = getCounterTypes(targetPokemon.types);
  const primaryCounterTypeNames = new Set(counterTypes.map(c => c.type));

  // Find candidate attackers whose charged move matches one of the counter types
  const candidates = allRankings.filter(p => {
    // Exclude self or same base species if Mega/Shadow
    if (p.pokedexId === targetPokemon.pokedexId) return false;
    return primaryCounterTypeNames.has(p.bestChargedMove.type);
  });

  // Sort candidates by pveScore * multiplier
  const scored = candidates.map(poke => {
    const counterInfo = counterTypes.find(c => c.type === poke.bestChargedMove.type);
    const mult = counterInfo ? counterInfo.multiplier : 1.6;
    const counterRating = Math.round(poke.pveScore * (mult / 1.6));
    return {
      pokemon: poke,
      counterRating,
      effectiveType: poke.bestChargedMove.type
    };
  });

  scored.sort((a, b) => b.counterRating - a.counterRating);

  // Take top 5 unique species
  const top5: CounterPokemonInfo[] = [];
  const usedDex = new Set<number>();

  for (const item of scored) {
    if (!usedDex.has(item.pokemon.pokedexId)) {
      usedDex.add(item.pokemon.pokedexId);
      top5.push(item);
      if (top5.length >= 5) break;
    }
  }

  return top5;
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

  // Alternate move options based on type and species
  const fastPrimary = poke.bestFastMove;
  const chargedPrimary = poke.bestChargedMove;

  // Fallback / complementary moves
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

// Helper helpers for generating representative move names
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

export function getTopCountersByName(bossName: string, limit: number = 10): PokemonRankData[] {
  const clean = bossName.toLowerCase().replace(/^(shadow|mega|primal)\s+/, '').trim();
  const targetPoke = pokemonRankings.find(p => p.name.toLowerCase().includes(clean)) || {
    name: bossName, pokedexId: 483, types: ['Dragon', 'Steel'], attack: 275, defense: 211, stamina: 205, maxCp: 4565, pveScore: 90, dps: 25,
    bestFastMove: { name: 'Dragon Breath', type: 'Dragon' }, bestChargedMove: { name: 'Draco Meteor', type: 'Dragon' }
  };

  const counters = getTopCountersForPokemon(targetPoke, pokemonRankings);
  return counters.slice(0, limit).map(c => c.pokemon);
}

export function getCounterTypesForName(bossName: string): string[] {
  const clean = bossName.toLowerCase().replace(/^(shadow|mega|primal)\s+/, '').trim();
  const targetPoke = pokemonRankings.find(p => p.name.toLowerCase().includes(clean));
  const types = targetPoke ? targetPoke.types : ['Dragon', 'Steel'];
  const counterInfos = getCounterTypes(types);
  return counterInfos.map(c => c.type);
}
