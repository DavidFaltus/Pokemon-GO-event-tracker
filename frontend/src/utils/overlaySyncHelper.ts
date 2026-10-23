import { Capacitor } from '@capacitor/core';
import OverlayPlugin, { type SyncedRaidBossItem } from './overlayPlugin';
import { 
  getTopCountersFilterString, 
  generateRaidSearchString,
  getWeaknessesForPokemon, 
  getPokemonTypesByName 
} from './pokemonCountersHelper';
import { getBasePokemonName } from './imageResolver';
import { raidCountersDb } from '../data/raidCounters';
import { pokemonRankings } from '../data/pokemonRankings';
import type { Language } from '../data/translations';

export interface RawRaidApiItem {
  name: string;
  tier?: string;
  types?: string[];
  [key: string]: any;
}

/**
 * Synchronizes complete, precomputed raid counters and metagame filters
 * (Universal, Budget, Hardcore) for active raid bosses and all known Pokémon species
 * into native storage (SharedPreferences).
 */
export async function syncRaidDataToNativeOverlay(
  raidList: RawRaidApiItem[] = [],
  lang: Language = 'cs'
): Promise<boolean> {
  if (typeof window === 'undefined' || !Capacitor.isNativePlatform()) {
    return false;
  }

  try {
    const syncedBosses: SyncedRaidBossItem[] = [];
    const addedNames = new Set<string>();

    const createBossEntry = (name: string, tier: string, initialTypes?: string[]) => {
      const cleanName = getBasePokemonName(name);
      if (!cleanName || addedNames.has(cleanName.toLowerCase())) return;
      addedNames.add(cleanName.toLowerCase());

      const weaknesses = getWeaknessesForPokemon(cleanName);
      const types = initialTypes && initialTypes.length > 0 ? initialTypes : getPokemonTypesByName(cleanName);

      const universal = generateRaidSearchString(cleanName, {
        tierMode: 'universal',
        includeFrustrationExclusion: true,
        dualMoveCheck: true
      });

      const budget = generateRaidSearchString(cleanName, {
        tierMode: 'budget',
        includeFrustrationExclusion: true,
        dualMoveCheck: true
      });

      const hardcore = generateRaidSearchString(cleanName, {
        tierMode: 'hardcore',
        includeFrustrationExclusion: true,
        dualMoveCheck: true,
        ivFilter: '3*,4*'
      });

      syncedBosses.push({
        name: cleanName,
        tier: tier || '5',
        types: types || [],
        weaknesses: weaknesses || [],
        filterString: universal || '',
        universalFilter: universal || '',
        budgetFilter: budget || '',
        hardcoreFilter: hardcore || ''
      });
    };

    // 1. First add live active 5* and Mega raid bosses from /api/raids
    if (Array.isArray(raidList) && raidList.length > 0) {
      raidList.forEach(item => {
        if (!item || !item.name) return;
        const tierStr = (item.tier || '').toLowerCase();
        const nameStr = item.name.toLowerCase();
        const is5Star = tierStr === '5' || tierStr.includes('5') || tierStr.includes('legendary');
        const isMega = tierStr.includes('mega') || tierStr.includes('primal') || nameStr.startsWith('mega ') || nameStr.startsWith('primal ');

        if (is5Star || isMega) {
          let clean = item.name.trim().replace(/\s+in\s+.*raids?/gi, '').replace(/\s+raids?/gi, '').trim();
          if (isMega && !clean.toLowerCase().startsWith('mega ') && !clean.toLowerCase().startsWith('primal ')) {
            clean = `Mega ${clean}`;
          }
          createBossEntry(clean, isMega ? 'mega' : '5', item.types);
        }
      });
    }

    // 2. Add all raid bosses from raidCountersDb
    Object.values(raidCountersDb).forEach(b => {
      if (b && b.bossName) {
        const isMega = b.bossName.toLowerCase().includes('mega') || b.bossName.toLowerCase().includes('primal');
        createBossEntry(b.bossName, isMega ? 'mega' : '5');
      }
    });

    // 3. Add top PvE species and popular Pokémon from pokemonRankings
    pokemonRankings.slice(0, 150).forEach(p => {
      if (p && p.name) {
        const clean = p.name.replace(/shadow/gi, '').trim();
        createBossEntry(clean, p.isMega || p.isPrimal ? 'mega' : 'other');
      }
    });

    // Fallbacks if list was empty
    if (syncedBosses.length === 0) {
      ['Kyurem', 'Mega Aggron', 'Palkia', 'Dialga', 'Rayquaza', 'Groudon', 'Kyogre', 'Lucario', 'Tyranitar', 'Metagross'].forEach(name => {
        createBossEntry(name, name.includes('Mega') ? 'mega' : '5');
      });
    }

    await OverlayPlugin.syncRaidData({ bosses: syncedBosses, lang });
    return true;
  } catch (err) {
    console.debug('[OverlaySync] Failed to sync raid data to native overlay:', err);
    return false;
  }
}
