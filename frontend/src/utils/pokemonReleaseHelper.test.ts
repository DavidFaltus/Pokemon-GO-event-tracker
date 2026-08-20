import { describe, it, expect } from 'vitest';
import { isPokemonReleasedInGo } from './pokemonReleaseHelper';
import type { PokemonRankData } from '../data/pokemonRankings';

describe('pokemonReleaseHelper', () => {
  it('correctly identifies released Pokemon in Pokemon GO', () => {
    const bulbasaur = { pokedexId: 1, name: 'Bulbasaur', isMega: false } as PokemonRankData;
    const mewtwo = { pokedexId: 150, name: 'Mewtwo', isMega: false } as PokemonRankData;
    const grookey = { pokedexId: 810, name: 'Grookey', isMega: false } as PokemonRankData;
    const sprigatito = { pokedexId: 906, name: 'Sprigatito', isMega: false } as PokemonRankData;
    const baxcalibur = { pokedexId: 998, name: 'Baxcalibur', isMega: false } as PokemonRankData;
    const gholdengo = { pokedexId: 1000, name: 'Gholdengo', isMega: false } as PokemonRankData;

    expect(isPokemonReleasedInGo(bulbasaur)).toBe(true);
    expect(isPokemonReleasedInGo(mewtwo)).toBe(true);
    expect(isPokemonReleasedInGo(grookey)).toBe(true);
    expect(isPokemonReleasedInGo(sprigatito)).toBe(true);
    expect(isPokemonReleasedInGo(baxcalibur)).toBe(true);
    expect(isPokemonReleasedInGo(gholdengo)).toBe(true);
  });

  it('correctly identifies unreleased Pokemon in Pokemon GO', () => {
    const arceus = { pokedexId: 493, name: 'Arceus', isMega: false } as PokemonRankData;
    const volcanion = { pokedexId: 721, name: 'Volcanion', isMega: false } as PokemonRankData;
    const honedge = { pokedexId: 679, name: 'Honedge', isMega: false } as PokemonRankData;
    const yamper = { pokedexId: 835, name: 'Yamper', isMega: false } as PokemonRankData;
    const tinkaton = { pokedexId: 959, name: 'Tinkaton', isMega: false } as PokemonRankData;
    const terapagos = { pokedexId: 1024, name: 'Terapagos', isMega: false } as PokemonRankData;
    const megaMewtwoX = { pokedexId: 150, name: 'Mega Mewtwo X', isMega: true } as PokemonRankData;

    expect(isPokemonReleasedInGo(arceus)).toBe(false);
    expect(isPokemonReleasedInGo(volcanion)).toBe(false);
    expect(isPokemonReleasedInGo(honedge)).toBe(false);
    expect(isPokemonReleasedInGo(yamper)).toBe(false);
    expect(isPokemonReleasedInGo(tinkaton)).toBe(false);
    expect(isPokemonReleasedInGo(terapagos)).toBe(false);
    expect(isPokemonReleasedInGo(megaMewtwoX)).toBe(false);
  });
});
