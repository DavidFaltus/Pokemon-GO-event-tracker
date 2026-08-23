import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import {
  loadEggPoolCache,
  saveEggPoolCache,
  loadResearchCache,
  saveResearchCache,
  loadRaidBossesCache,
  saveRaidBossesCache
} from './storage';
import { dataStore } from './dataStore';
import { EnrichedEggGroup, EnrichedResearchTask, ScrapedRaidBoss } from './types';

describe('Storage & Disk Cache Persistence', () => {
  const CACHE_DIR = path.join(__dirname, '..', '.cache');
  const EGGS_FILE = path.join(CACHE_DIR, 'eggs_cache.json');
  const RESEARCH_FILE = path.join(CACHE_DIR, 'research_cache.json');
  const RAIDS_FILE = path.join(CACHE_DIR, 'raids_cache.json');

  afterEach(async () => {
    // Cleanup temporary test files and memory cache
    await dataStore.delete('eggs_cache');
    await dataStore.delete('research_cache');
    await dataStore.delete('raids_cache');
  });

  it('saves and loads egg pool cache accurately', async () => {
    const mockEggs: EnrichedEggGroup[] = [
      {
        distance: '2 km',
        title: { cs: '2 km Vajíčka', en: '2 km Eggs' },
        eggs: [
          { name: 'Bulbasaur', image: 'url', canBeShiny: true, minCp: 637, maxCp: 637 }
        ]
      }
    ];

    const saved = await saveEggPoolCache(mockEggs);
    expect(saved).toBe(true);

    const loaded = await loadEggPoolCache();
    expect(loaded).toEqual(mockEggs);
  });

  it('saves and loads field research cache accurately', async () => {
    const mockResearch: EnrichedResearchTask[] = [
      {
        task: { cs: 'Chyť 10 Pokémonů', en: 'Catch 10 Pokémon' },
        category: 'catch',
        rewards: [
          { name: 'Ducklett', image: 'url', canBeShiny: true, minCp: 335, maxCp: 367 }
        ]
      }
    ];

    const saved = await saveResearchCache(mockResearch);
    expect(saved).toBe(true);

    const loaded = await loadResearchCache();
    expect(loaded).toEqual(mockResearch);
  });

  it('saves and loads raid bosses cache accurately', async () => {
    const mockRaids: ScrapedRaidBoss[] = [
      {
        name: 'Necrozma',
        tier: '5',
        image: 'url',
        canBeShiny: true,
        cpRange: '2007 - 2104'
      }
    ];

    const saved = await saveRaidBossesCache(mockRaids);
    expect(saved).toBe(true);

    const loaded = await loadRaidBossesCache();
    expect(loaded).toEqual(mockRaids);
  });

  it('returns empty array when cache file is missing or invalid', async () => {
    await dataStore.delete('eggs_cache');
    const eggs = await loadEggPoolCache();
    expect(eggs).toEqual([]);

    await dataStore.delete('research_cache');
    const research = await loadResearchCache();
    expect(research).toEqual([]);

    await dataStore.delete('raids_cache');
    const raids = await loadRaidBossesCache();
    expect(raids).toEqual([]);
  });
});
