import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import {
  POKEDLE_ALL,
  POKEDLE_GO_POOL,
  POKEDLE_BY_ID,
  getDailyTargetPokemon,
  evaluateClassicGuess,
  buildShareText,
  getSilhouetteZoomScale,
  getDailyPuzzleNumber,
  computeBetterThanPercentile,
} from './pokedleEngine';

describe('PoGoDle Core Engine & Data Integrity', () => {
  it('loads all 1,024 species with valid colors, evolution stages, and GO pool', () => {
    expect(POKEDLE_ALL.length).toBeGreaterThanOrEqual(1024);
    expect(POKEDLE_GO_POOL.length).toBeGreaterThan(900);

    const ivysaur = POKEDLE_BY_ID[2];
    expect(ivysaur.names.en).toBe('Ivysaur');
    expect(ivysaur.names.ru).toBe('Айвизавр');
    expect(ivysaur.evo).toBe(2);
    expect(ivysaur.col).toBe('green');
    expect(ivysaur.t1).toBe('Grass');
    expect(ivysaur.t2).toBe('Poison');
  });

  it('picks deterministic and distinct daily Pokémon across all 3 modes', () => {
    const date = '2026-11-19';
    const c1 = getDailyTargetPokemon(date, 'classic');
    const c2 = getDailyTargetPokemon(date, 'classic');
    const lore = getDailyTargetPokemon(date, 'lore');
    const sil = getDailyTargetPokemon(date, 'silhouette');

    expect(c1.id).toBe(c2.id);
    expect(new Set([c1.id, lore.id, sil.id]).size).toBe(3);
    expect(c1.go && lore.go && sil.go).toBe(true);
    expect(getDailyPuzzleNumber(date)).toBe(1);
  });

  it('evaluates Classic guesses with exact, partial (swapped types), and directional arrows', () => {
    // Bulbasaur (Grass/Poison, Gen 1, Evo 1, CP 1260, green) vs Venusaur (Grass/Poison, Gen 1, Evo 3, CP 3075, green)
    const bulba = POKEDLE_BY_ID[1];
    const venu = POKEDLE_BY_ID[3];
    const eval1 = evaluateClassicGuess(bulba, venu);

    expect(eval1.isWin).toBe(false);
    expect(eval1.type1).toBe('exact');
    expect(eval1.type2).toBe('exact');
    expect(eval1.gen).toBe('exact');
    expect(eval1.evo).toBe('higher');
    expect(eval1.cp).toBe('higher');
    expect(eval1.col).toBe('exact');

    // Swapped types test: Gengar (Ghost/Poison) vs Bulbasaur (Grass/Poison) -> t2 exact
    // Gastly (Ghost/Poison) vs Zubat (Poison/Flying) -> Poison is swapped -> partial
    const gastly = POKEDLE_BY_ID[92];
    const zubat = POKEDLE_BY_ID[41];
    const evalSwap = evaluateClassicGuess(gastly, zubat);
    expect(evalSwap.type1).toBe('wrong');
    expect(evalSwap.type2).toBe('partial');

    // Exact win
    const evalWin = evaluateClassicGuess(venu, venu);
    expect(evalWin.isWin).toBe(true);
    expect(evalWin.cp).toBe('exact');
  });

  it('generates spoiler-free Wordle share text without leaking target name', () => {
    const bulba = POKEDLE_BY_ID[1];
    const venu = POKEDLE_BY_ID[3];
    const text = buildShareText({
      mode: 'classic',
      dayNumber: 1,
      guesses: [bulba, venu],
      target: venu,
      won: true,
      streak: 3,
      lang: 'cs',
      isEndless: false,
    });

    expect(text).toContain('PoGoDle #1');
    expect(text).toContain('🔥 3');
    expect(text).toContain('🟩🟩🟩🟩🟩🟩');
    expect(text).toContain('https://pogoevents.app/cs/pokedle');
    expect(text.toLowerCase()).not.toContain('venusaur');
  });

  it('scales silhouette zoom progressively from zoomed-in to full reveal', () => {
    expect(getSilhouetteZoomScale(0, false)).toBeGreaterThan(2.0);
    expect(getSilhouetteZoomScale(2, false)).toBeLessThan(getSilhouetteZoomScale(0, false));
    expect(getSilhouetteZoomScale(5, false)).toBe(1.0);
    expect(getSilhouetteZoomScale(0, true)).toBe(1.0);
  });

  it('verifies all 4 public masked lore files exist and have zero own-name leaks', () => {
    const publicDir = path.resolve(__dirname, '../../public/data/pokedle');
    for (const lang of ['cs', 'en', 'ja', 'ru'] as const) {
      const file = path.join(publicDir, `lore-${lang}.json`);
      expect(fs.existsSync(file)).toBe(true);
      const data = JSON.parse(fs.readFileSync(file, 'utf-8')) as Record<
        string,
        { text: string; source: string }
      >;
      expect(Object.keys(data).length).toBeGreaterThanOrEqual(1024);

      // Spot-check Ivysaur & Charizard have masked names and no unmasked leaks
      expect(data['2'].text).not.toMatch(/ivysaur|айвизавр|フシギソウ/i);
      expect(data['6'].text).not.toMatch(/charizard|чаризард|リザードン/i);
    }
  });

  it('computes community percentile only when sample >= 10', () => {
    expect(
      computeBetterThanPercentile(2, { '1': 1, '2': 2, '3': 3, '4': 2, '5': 1, '6': 0, '7+': 0 })
    ).toBeNull(); // total = 9

    // total = 20, strictly > 2 is 3+4+5+6+7+ = 6+5+3+2+1 = 17 -> 85%
    expect(
      computeBetterThanPercentile(2, { '1': 1, '2': 2, '3': 6, '4': 5, '5': 3, '6': 2, '7+': 1 })
    ).toBe(85);
  });
});
