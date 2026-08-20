import { describe, it, expect } from 'vitest';
import { getPokemonRankingInfo } from './pokemonCountersHelper';
import { pokemonRankings } from '../data/pokemonRankings';

describe('getPokemonRankingInfo & Metas', () => {
  it('returns up to 3 top 10 type ranks with type icons/slugs for multi-type bosses', () => {
    // Rayquaza is top tier in both Dragon and Flying
    const rayquaza = getPokemonRankingInfo('Rayquaza');
    expect(rayquaza).toBeDefined();
    expect(rayquaza.topTypeRanks.length).toBeGreaterThanOrEqual(1);
    expect(rayquaza.topTypeRanks.length).toBeLessThanOrEqual(3);
    expect(rayquaza.topTypeRanks[0].typeRank).toBeLessThanOrEqual(10);
    expect(rayquaza.topTypeRanks[0].typeSlug).toBeDefined();
  });

  it('returns type icon information for single type attackers like Kyurem', () => {
    const kyurem = getPokemonRankingInfo('Kyurem');
    expect(kyurem).toBeDefined();
    expect(kyurem.topTypeRanks.length).toBeGreaterThanOrEqual(1);
    expect(kyurem.topTypeRanks.some(r => r.typeSlug === 'ice' || r.typeSlug === 'dragon')).toBe(true);
  });

  it('correctly ranks Slaking with low DPS due to Yawn fast move', () => {
    const slaking = pokemonRankings.find(p => p.name === 'Slaking');
    expect(slaking).toBeDefined();
    expect(slaking!.bestFastMove.name).toBe('Yawn');
    expect(slaking!.dps).toBeLessThan(25); // Slaking cycle DPS is ~18.47
  });

  it('correctly orders top Ghost attackers above Lunala', () => {
    const dawnWings = pokemonRankings.find(p => p.name === 'Dawn Wings Necrozma');
    const megaGengar = pokemonRankings.find(p => p.name === 'Mega Gengar');
    const shadowChandelure = pokemonRankings.find(p => p.name === 'Shadow Chandelure');
    const lunala = pokemonRankings.find(p => p.name === 'Lunala');

    expect(dawnWings).toBeDefined();
    expect(megaGengar).toBeDefined();
    expect(shadowChandelure).toBeDefined();
    expect(lunala).toBeDefined();

    expect(dawnWings!.pveScore).toBeGreaterThan(lunala!.pveScore);
    expect(megaGengar!.pveScore).toBeGreaterThan(lunala!.pveScore);
    expect(shadowChandelure!.pveScore).toBeGreaterThan(lunala!.pveScore);
  });

  it('correctly reports Lunala infographic rank as #9 (not #1) and Dawn Wings as #1 Ghost', () => {
    const lunalaInfo = getPokemonRankingInfo('Lunala');
    const dawnWingsInfo = getPokemonRankingInfo('Dawn Wings Necrozma');

    expect(dawnWingsInfo.typeRank).toBe(1);
    expect(dawnWingsInfo.typeName).toBe('Ghost');

    expect(lunalaInfo.typeRank).toBeGreaterThan(1); // Lunala is #8 Ghost, definitely NOT #1!
    expect(lunalaInfo.typeRank).toBe(8);
    expect(lunalaInfo.typeName).toBe('Ghost');
  });

  it('correctly maps Galarian Darmanitan to pokedex ID 555 and Darumaka to 554 with Fire type', () => {
    const darmanitan = pokemonRankings.find(p => p.name === 'Galarian Darmanitan');
    const darumaka = pokemonRankings.find(p => p.name === 'Darumaka');

    expect(darmanitan).toBeDefined();
    expect(darmanitan!.pokedexId).toBe(555);
    expect(darmanitan!.types).toContain('Ice');

    expect(darumaka).toBeDefined();
    expect(darumaka!.pokedexId).toBe(554);
    expect(darumaka!.types).toContain('Fire');
    expect(darumaka!.types).not.toContain('Ice');
  });
});
