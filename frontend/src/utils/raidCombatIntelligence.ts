import { pokemonRankings, PokemonRankData } from '../data/pokemonRankings';
import { findRaidCounters, raidCountersDb, RaidCounters } from '../data/raidCounters';
import {
  TYPE_CHART,
  getCombinedDamageMultiplier,
  getCounterTypes,
  isLegacyMove,
  LEGACY_MOVES,
  getTopCountersForPokemonDetailed,
  CounterTypeInfo,
  CounterPokemonInfo
} from './pokemonCountersHelper';

export interface RaidBossProfile {
  name: string;
  types: string[];
  tier: string;
  counterTypes: CounterTypeInfo[];
  topCounters: RaidCounter[];
  difficulty: DifficultyAssessment;
  cpRange: { min: number; max: number } | null;
  boostedCpRange: { min: number; max: number } | null;
  hundoCp: number | null;
}

export interface DifficultyAssessment {
  tier: 'solo' | 'duo' | 'trio' | 'group' | 'hard-group';
  playersRecommended: string;
  notes?: { cs: string; en: string };
}

export interface RaidCounter {
  name: string;
  types: string[];
  fastMove: string;
  chargedMove: string;
  dps: number;
  er: number;
  isLegacy: boolean;
  isShadow: boolean;
  isMega: boolean;
}

// Keep existing detailed exports available for backward compat
export { TYPE_CHART, getCombinedDamageMultiplier, getCounterTypes, isLegacyMove, LEGACY_MOVES };

export function getTopCountersForBoss(bossName: string, bossTypes: string[], limit: number = 20): RaidCounter[] {
  const staticData = findRaidCounters(bossName);
  
  if (staticData) {
    const allStatic = [
      ...(staticData.megaCounters || []),
      ...(staticData.advancedCounters || []),
      ...(staticData.budgetCounters || [])
    ];
    
    const parsedStatic: RaidCounter[] = [];
    for (const str of allStatic) {
      const match = str.match(/^(.+?)(?:\s*\((.+)\))?$/);
      if (match) {
        const pName = match[1].trim();
        const cMove = match[2]?.trim() || '';
        
        // Find in rankings for details
        const pData = pokemonRankings.find(p => p.name.toLowerCase() === pName.toLowerCase()) ||
                      pokemonRankings.find(p => p.name.toLowerCase().includes(pName.toLowerCase()));
        
        if (pData) {
          if (!parsedStatic.some(r => r.name === pData.name)) {
            const actualMove = cMove || pData.bestChargedMove.name;
            parsedStatic.push({
              name: pData.name,
              types: pData.types,
              fastMove: pData.bestFastMove.name,
              chargedMove: actualMove,
              dps: pData.dps || 0,
              er: pData.pveScore || 0,
              isLegacy: isLegacyMove(actualMove),
              isShadow: !!pData.isShadow,
              isMega: !!pData.isMega
            });
          }
        } else {
          // Fallback if not in DB
          if (!parsedStatic.some(r => r.name === pName)) {
            parsedStatic.push({
              name: pName,
              types: [],
              fastMove: 'Unknown',
              chargedMove: cMove || 'Unknown',
              dps: 0,
              er: 0,
              isLegacy: isLegacyMove(cMove || ''),
              isShadow: pName.toLowerCase().includes('shadow'),
              isMega: pName.toLowerCase().includes('mega')
            });
          }
        }
      }
    }
    
    if (parsedStatic.length > 0) {
      return parsedStatic.slice(0, limit);
    }
  }

  // Dynamic fallback
  const bossTarget: PokemonRankData = pokemonRankings.find(p => p.name.toLowerCase() === bossName.toLowerCase()) || {
    name: bossName,
    pokedexId: 0,
    types: bossTypes,
    attack: 0, defense: 0, stamina: 0, maxCp: 0, pveScore: 0, dps: 0,
    bestFastMove: { name: '', type: '' },
    bestChargedMove: { name: '', type: '' }
  };
  
  const dynamicResults: CounterPokemonInfo[] = getTopCountersForPokemonDetailed(bossTarget, pokemonRankings, limit, 'resistant');
  
  return dynamicResults.map(res => ({
    name: res.pokemon.name,
    types: res.pokemon.types,
    fastMove: res.pokemon.bestFastMove.name,
    chargedMove: res.pokemon.bestChargedMove.name,
    dps: res.pokemon.dps || 0,
    er: res.pokemon.pveScore || 0,
    isLegacy: isLegacyMove(res.pokemon.bestChargedMove.name),
    isShadow: !!res.pokemon.isShadow,
    isMega: !!res.pokemon.isMega
  }));
}

export function getRaidBossProfile(bossName: string, bossTypes: string[], tier: string = ''): RaidBossProfile {
  const staticData = findRaidCounters(bossName);
  
  const counterTypes = getCounterTypes(bossTypes);
  const topCounters = getTopCountersForBoss(bossName, bossTypes, 10);
  
  let cpRange = null;
  let boostedCpRange = null;
  let hundoCp = null;

  if (staticData && staticData.minCp) {
    cpRange = { min: staticData.minCp, max: staticData.maxCp };
    boostedCpRange = { min: staticData.minBoostedCp, max: staticData.maxBoostedCp };
    hundoCp = staticData.maxCp;
  } else {
    // Attempt from pokemonRankings
    const pData = pokemonRankings.find(p => p.name.toLowerCase() === bossName.toLowerCase());
    if (pData && pData.cpRaid100) {
      hundoCp = pData.cpRaid100;
      cpRange = { min: Math.floor(pData.cpRaid100 * 0.88), max: pData.cpRaid100 }; // rough fallback
      if (pData.cpWeather100) {
        boostedCpRange = { min: Math.floor(pData.cpWeather100 * 0.88), max: pData.cpWeather100 };
      }
    }
  }

  let difficulty: DifficultyAssessment;
  if (staticData && staticData.difficultyTier) {
    let rec = staticData.playersRecommended;
    if (typeof rec === 'object' && rec !== null) {
      rec = (rec as any).cs;
    }
    difficulty = {
      tier: staticData.difficultyTier,
      playersRecommended: (rec as string) || 'Neznámé',
      notes: staticData.difficultyNotes
    };
  } else {
    let estTier: 'solo' | 'duo' | 'trio' | 'group' | 'hard-group' = 'group';
    let rec = '3-5';
    
    const t = tier.toLowerCase();
    if (t.includes('1') || t === 'tier 1') { estTier = 'solo'; rec = '1'; }
    else if (t.includes('3') || t === 'tier 3') { estTier = 'solo'; rec = '1-2'; }
    else if (t.includes('4') || (t.includes('mega') && !t.includes('legend'))) { estTier = 'duo'; rec = '2-3'; }
    else if (t.includes('5') || t.includes('legend')) { estTier = 'trio'; rec = '3-5'; }
    else if (t.includes('6') || t.includes('primal') || (t.includes('mega') && t.includes('legend'))) { estTier = 'hard-group'; rec = '5-8'; }
    
    difficulty = {
      tier: estTier,
      playersRecommended: rec
    };
  }

  return {
    name: bossName,
    types: bossTypes,
    tier,
    counterTypes,
    topCounters,
    difficulty,
    cpRange,
    boostedCpRange,
    hundoCp
  };
}
