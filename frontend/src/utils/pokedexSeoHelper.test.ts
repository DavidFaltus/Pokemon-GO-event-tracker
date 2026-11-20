import { describe, it, expect } from 'vitest';
import {
  analyzeGreatLeague,
  analyzeUltraLeague,
  getEvolutionFamily,
  isTopMetaPokedexEntry,
  generatePokedexEditorialAnalysis,
} from './pokedexSeoHelper';
import { getPokemonByIdOrSlug } from '../data/pokemonRankings';
import { getPokedexEntryBySlug } from '../data/pokedexCatalog';

describe('pokedexSeoHelper', () => {
  it('analyzes Great League eligibility correctly for low and high CP Pokémon', () => {
    const caterpie = getPokemonByIdOrSlug('10'); // Caterpie, low CP
    if (caterpie) {
      const gl = analyzeGreatLeague(caterpie);
      expect(gl.eligible).toBe(false);
      expect(gl.notes.en).toContain('too low');
    }

    const swamping = getPokemonByIdOrSlug('260'); // Swampert, meta pick
    if (swamping) {
      const gl = analyzeGreatLeague(swamping);
      expect(gl.eligible).toBe(true);
      expect(gl.maxCpInLeague).toBeLessThanOrEqual(1500);
      expect(gl.optimalIvSpread).toContain('0/15/14');
    }
  });

  it('analyzes Ultra League eligibility correctly', () => {
    const pidgey = getPokemonByIdOrSlug('16'); // Pidgey, under 2100 CP
    if (pidgey) {
      const ul = analyzeUltraLeague(pidgey);
      expect(ul.eligible).toBe(false);
    }

    const giratina = getPokemonByIdOrSlug('487'); // Giratina, high CP
    if (giratina) {
      const ul = analyzeUltraLeague(giratina);
      expect(ul.eligible).toBe(true);
      expect(ul.maxCpInLeague).toBeLessThanOrEqual(2500);
    }
  });

  it('retrieves neighboring Pokédex entries and Mega forms', () => {
    const ivysaur = getPokemonByIdOrSlug('2'); // #2 Ivysaur
    if (ivysaur) {
      const fam = getEvolutionFamily(ivysaur);
      expect(fam.prev?.pokedexId).toBe(1); // Bulbasaur
      expect(fam.next?.pokedexId).toBe(3); // Venusaur
    }

    const venusaur = getPokemonByIdOrSlug('3'); // #3 Venusaur has Mega
    if (venusaur) {
      const fam = getEvolutionFamily(venusaur);
      expect(fam.megaVariants.length).toBeGreaterThan(0);
      expect(fam.megaVariants[0].name.toLowerCase()).toContain('mega');
    }
  });

  it('curates top meta Pokédex entries and generates localized editorial analysis + FAQs', () => {
    const mewtwo = getPokedexEntryBySlug('mewtwo');
    const caterpie = getPokedexEntryBySlug('caterpie');
    const pecharunt = getPokedexEntryBySlug('pecharunt');

    expect(mewtwo).toBeDefined();
    expect(caterpie).toBeDefined();
    expect(pecharunt).toBeDefined();

    if (mewtwo) {
      expect(isTopMetaPokedexEntry(mewtwo)).toBe(true);
      const editorial = generatePokedexEditorialAnalysis(mewtwo, 'cs');
      expect(editorial.paragraphs.length).toBeGreaterThanOrEqual(3);
      expect(editorial.faqs.length).toBeGreaterThanOrEqual(3);
    }
    if (caterpie) {
      expect(isTopMetaPokedexEntry(caterpie)).toBe(false);
    }
    if (pecharunt) {
      expect(isTopMetaPokedexEntry(pecharunt)).toBe(false);
    }
  });

  it('never leaks Czech "skóre", Polish typos, or untranslated types across locales', () => {
    const venusaur = getPokedexEntryBySlug('venusaur');
    expect(venusaur).toBeDefined();
    if (!venusaur) return;

    const csReport = generatePokedexEditorialAnalysis(venusaur, 'cs');
    const csText = [...csReport.paragraphs.map((p) => p.text), ...csReport.faqs.map((f) => f.answer)].join(' ');
    expect(csText).not.toContain('zadań');
    expect(csText).toContain('Z úkolů Field Research');
    expect(csText).toContain('Travní');

    for (const lang of ['en', 'ja', 'ru'] as const) {
      const report = generatePokedexEditorialAnalysis(venusaur, lang);
      const fullText = report.paragraphs.map((p) => p.text).join(' ');
      expect(fullText).not.toContain('skóre');
    }

    const jaReport = generatePokedexEditorialAnalysis(venusaur, 'ja');
    expect(jaReport.paragraphs[0].text).toContain('くさ');
    expect(jaReport.paragraphs[2].text).not.toContain('Grass');
  });

  it('resolves exact base forms for kyurem and zekrom instead of Black Kyurem or Shadow Zekrom', () => {
    const kyurem = getPokemonByIdOrSlug('kyurem');
    expect(kyurem?.name).toBe('Kyurem');
    expect(kyurem?.maxCp).toBe(4041);

    const zekrom = getPokemonByIdOrSlug('zekrom');
    expect(zekrom?.name).toBe('Zekrom');
    expect(zekrom?.isShadow).toBeFalsy();

    const blackKyurem = getPokemonByIdOrSlug('black-kyurem');
    expect(blackKyurem?.name).toBe('Black Kyurem');
  });
});
