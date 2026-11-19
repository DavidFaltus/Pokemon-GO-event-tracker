import { describe, it, expect } from 'vitest';
import { POKEDEX_CATALOG } from './pokedexCatalog';
import { getPokedexDescription, getAllPokedexDescriptions } from './pokedexDescriptions';
import type { Language } from './translations';

describe('Pokédex Official Descriptions Dataset', () => {
  const languages: Language[] = ['cs', 'en', 'ja', 'ru'];

  it('provides a non-empty official description for every catalog species across all 4 languages', () => {
    for (const lang of languages) {
      const map = getAllPokedexDescriptions(lang);
      for (const entry of POKEDEX_CATALOG) {
        const desc = map[String(entry.dexId)];
        expect(desc, `Missing ${lang} description for #${entry.dexId} (${entry.names.en})`).toBeDefined();
        expect(desc.text.trim().length, `Empty ${lang} text for #${entry.dexId}`).toBeGreaterThan(10);
        expect(desc.source.trim().length, `Empty ${lang} source for #${entry.dexId}`).toBeGreaterThan(2);
        // No raw game control characters or newlines
        expect(desc.text).not.toMatch(/[\f\r\n]/);
      }
    }
  });

  it('enforces language purity (RU uses Cyrillic, JA uses Japanese script, CS is translated from EN)', () => {
    const sampleIds = [1, 2, 6, 25, 150, 384, 800, 906, 1024];
    for (const id of sampleIds) {
      const en = getPokedexDescription(id, 'en');
      const cs = getPokedexDescription(id, 'cs');
      const ja = getPokedexDescription(id, 'ja');
      const ru = getPokedexDescription(id, 'ru');

      expect(en && cs && ja && ru).toBeTruthy();
      // Guardrail against upstream Russian.txt Spanish bug
      expect(ru!.text).toMatch(/[А-Яа-яЁё]/);
      expect(ja!.text).toMatch(/[\u3040-\u30ff\u4e00-\u9faf]/);
      expect(cs!.text).not.toBe(en!.text);
    }
  });

  it('provides form-specific descriptions for Mega, Primal, Gigantamax, Regional, and Fusion forms', () => {
    for (const lang of languages) {
      const charizard = getPokedexDescription(6, lang);
      expect(charizard?.variants?.CHARIZARD_MEGA_X?.text).toBeTruthy();
      expect(charizard?.variants?.CHARIZARD_MEGA_Y?.text).toBeTruthy();
      expect(charizard?.variants?.CHARIZARD_GMAX?.text).toBeTruthy();

      const raichu = getPokedexDescription(26, lang);
      expect(raichu?.variants?.RAICHU_ALOLA?.text).toBeTruthy();

      const articuno = getPokedexDescription(144, lang);
      expect(articuno?.variants?.ARTICUNO_GALARIAN?.text).toBeTruthy();

      const gengar = getPokedexDescription(94, lang);
      expect(gengar?.variants?.GENGAR_MEGA?.text).toBeTruthy();
      expect(gengar?.variants?.GENGAR_GMAX?.text).toBeTruthy();

      const necrozma = getPokedexDescription(800, lang);
      expect(necrozma?.variants?.NECROZMA_DUSK_MANE?.text).toBeTruthy();
      expect(necrozma?.variants?.NECROZMA_DAWN_WINGS?.text).toBeTruthy();
    }
  });

  it('uses PokéAPI mainline source attribution for unreleased Gen 9 DLC fallback species', () => {
    const terapagos = getPokedexDescription(1024, 'en');
    expect(terapagos).toBeDefined();
    expect(terapagos?.source).not.toBe('Pokémon GO');
    expect(terapagos?.source).toContain('Pokémon');
  });
});
