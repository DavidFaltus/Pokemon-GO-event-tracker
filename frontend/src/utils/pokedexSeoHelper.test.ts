import { describe, it, expect } from 'vitest';
import { analyzeGreatLeague, analyzeUltraLeague, getEvolutionFamily } from './pokedexSeoHelper';
import { getPokemonByIdOrSlug } from '../data/pokemonRankings';

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
});
