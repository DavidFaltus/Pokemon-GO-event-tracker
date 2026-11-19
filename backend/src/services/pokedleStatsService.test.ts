import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  POKEDLE_MIN_PUBLIC_SAMPLE,
  validateRecordInput,
  recordPokedleRound,
  getPublicPokedleStats,
  getAdminPokedleStats,
  resetPokedleStats,
} from './pokedleStatsService';

// Mock dataStore in-memory so tests never mutate local disk files
const memStore = new Map<string, any>();
vi.mock('../dataStore', () => ({
  dataStore: {
    get: vi.fn(async (key: string, opts?: { defaultValue?: any }) => {
      if (memStore.has(key)) return JSON.parse(JSON.stringify(memStore.get(key)));
      return opts?.defaultValue;
    }),
    set: vi.fn(async (key: string, val: any) => {
      memStore.set(key, JSON.parse(JSON.stringify(val)));
      return true;
    }),
  },
}));

describe('pokedleStatsService', () => {
  beforeEach(async () => {
    memStore.clear();
    await resetPokedleStats();
  });

  it('validates input payloads strictly', () => {
    expect(
      validateRecordInput({
        dateKey: '2026-11-19',
        mode: 'classic',
        playType: 'daily',
        won: true,
        attempts: 3,
        pokemonId: 25,
        firstGuessId: 6,
      }).valid
    ).toBe(true);

    expect(
      validateRecordInput({
        dateKey: 'bad-date',
        mode: 'classic',
        playType: 'daily',
        won: true,
        attempts: 3,
        pokemonId: 25,
      }).valid
    ).toBe(false);

    expect(
      validateRecordInput({
        dateKey: '2026-11-19',
        mode: 'unknown',
        playType: 'daily',
        won: true,
        attempts: 3,
        pokemonId: 25,
      }).valid
    ).toBe(false);
  });

  it('hides public community stats until at least 10 Pokémon are guessed, while exposing live admin stats immediately', async () => {
    // Record 9 wins -> still below threshold (10)
    for (let i = 0; i < POKEDLE_MIN_PUBLIC_SAMPLE - 1; i++) {
      await recordPokedleRound({
        dateKey: '2026-11-19',
        mode: 'classic',
        playType: 'daily',
        won: true,
        attempts: 3,
        pokemonId: 25,
        firstGuessId: 6,
      });
    }

    const publicBelow = await getPublicPokedleStats('2026-11-19');
    expect(publicBelow.globalReady).toBe(false);
    expect(publicBelow.global).toBeNull();
    expect(publicBelow.today.classic).toBeNull();

    // Admin ALWAYS sees live numbers immediately
    const adminBelow = await getAdminPokedleStats();
    expect(adminBelow.totals.won).toBe(9);
    expect(adminBelow.topFirstGuesses[0]).toEqual({ pokemonId: 6, count: 9, sharePct: 100 });

    // Record 10th win -> public threshold unlocked!
    const afterTenth = await recordPokedleRound({
      dateKey: '2026-11-19',
      mode: 'classic',
      playType: 'daily',
      won: true,
      attempts: 5,
      pokemonId: 25,
      firstGuessId: 6,
    });
    expect(afterTenth.globalReady).toBe(true);
    expect(afterTenth.global?.won).toBe(10);
    expect(afterTenth.today.classic?.ready).toBe(true);
    expect(afterTenth.today.classic?.won).toBe(10);
    expect(afterTenth.today.classic?.avgAttempts).toBe(3.2);
    expect(afterTenth.today.classic?.attemptBuckets['3']).toBe(9);
    expect(afterTenth.today.classic?.attemptBuckets['5']).toBe(1);
  });

  it('computes hardest/easiest Pokémon and resets cleanly', async () => {
    await recordPokedleRound({
      dateKey: '2026-11-19',
      mode: 'lore',
      playType: 'endless',
      won: false,
      attempts: 8,
      pokemonId: 150,
    });
    await recordPokedleRound({
      dateKey: '2026-11-19',
      mode: 'lore',
      playType: 'endless',
      won: true,
      attempts: 1,
      pokemonId: 1,
    });

    const admin = await getAdminPokedleStats();
    expect(admin.totals.played).toBe(2);
    expect(admin.totals.winRate).toBe(50);
    expect(admin.hardestPokemon[0].pokemonId).toBe(150);
    expect(admin.easiestPokemon[0].pokemonId).toBe(1);

    await resetPokedleStats();
    const afterReset = await getAdminPokedleStats();
    expect(afterReset.totals.played).toBe(0);
  });
});
