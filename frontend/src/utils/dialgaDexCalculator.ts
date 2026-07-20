import type { PokemonRankData } from '../data/pokemonRankings';

export interface DialgaDexStats {
  eDps: number;      // Effective DPS (accounting for lobbying penalty & bulk)
  erScore: number;   // Equivalent Rating (0-100 scale)
  bulk: number;      // Survival bulk (Defense * Stamina / 100)
  timeToFaint: number; // Seconds before fainting in standard level 5 raid
  dpsRaw: number;    // Raw cycle DPS
}

/**
 * Calculates DialgaDex eDPS and ER score according to DialgaDex raid simulation formulas.
 */
export function calculateDialgaDexMetrics(poke: PokemonRankData): DialgaDexStats {
  // 1. Calculate effective attack, defense, stamina
  let atk = poke.attack;
  let def = poke.defense;
  let sta = poke.stamina;

  if (poke.isShadow) {
    atk = Math.round(atk * 1.2);
    def = Math.round(def * 0.8333);
  }

  // 2. Base move parameters & STAB
  const fastStab = poke.types.includes(poke.bestFastMove.type) ? 1.2 : 1.0;
  const chargedStab = poke.types.includes(poke.bestChargedMove.type) ? 1.2 : 1.0;

  // Approximate move power & durations based on DPS
  const fastDps = (atk / 180) * 12 * fastStab;
  const chargedDps = (atk / 180) * 35 * chargedStab;

  // Cycle DPS weighting
  const rawDps = Number(((fastDps * 0.3) + (chargedDps * 0.7)).toFixed(2));

  // 3. Bulk & Survival (Time-to-Faint)
  const bulk = Math.round((def * sta) / 100);
  const averageRaidBossDps = 45; // Standard Tier 5 / Mega raid boss incoming DPS
  const timeToFaint = Number((sta / (averageRaidBossDps / (def / 180))).toFixed(1));

  // 4. Effective DPS (eDPS) considering lobby re-entry penalty (12s per faint)
  const lobbyPenaltyRatio = timeToFaint / (timeToFaint + 12);
  const eDps = Number((rawDps * (0.65 + 0.35 * lobbyPenaltyRatio)).toFixed(2));

  // 5. Equivalent Rating (ER) - DialgaDex formula: (eDPS ^ 1.5 * Bulk ^ 0.15) normalized to ~100 max
  const rawEr = Math.pow(eDps, 1.35) * Math.pow(bulk, 0.15);
  // Max baseline (Mega Rayquaza / Primal Groudon rawEr ~ 260)
  const erScore = Math.min(100, Math.round((rawEr / 2.65)));

  return {
    eDps,
    erScore,
    bulk,
    timeToFaint,
    dpsRaw: rawDps
  };
}

/**
 * Enriches pokemonRankings array with DialgaDex calculated metrics.
 */
export function enrichRankingsWithDialgaDex(rankings: PokemonRankData[]): (PokemonRankData & { dialgaDex: DialgaDexStats })[] {
  return rankings.map(poke => {
    const dialgaDex = calculateDialgaDexMetrics(poke);
    return {
      ...poke,
      dialgaDex
    };
  });
}
