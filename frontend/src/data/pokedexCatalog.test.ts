import { describe, it, expect } from 'vitest';
import {
  POKEDEX_CATALOG,
  POKEDEX_MAP,
  getPokedexEntryById,
  getPokedexEntryBySlug
} from './pokedexCatalog';

describe('Pokedex Catalog Engine', () => {
  it('loads all 1,024+ National Pokédex species', () => {
    expect(POKEDEX_CATALOG.length).toBeGreaterThanOrEqual(1024);
    expect(Object.keys(POKEDEX_MAP).length).toBeGreaterThanOrEqual(1024);
  });

  it('retrieves Charizard (#6) with canonical variants (Mega X, Mega Y, G-Max, Shadow)', () => {
    const charizard = getPokedexEntryById(6);
    expect(charizard).toBeDefined();
    expect(charizard?.dexId).toBe(6);
    expect(charizard?.names.en).toBe('Charizard');
    expect(charizard?.names.ja).toBe('リザードン');
    expect(charizard?.types).toEqual(['Fire', 'Flying']);

    // Check variants
    const variantCategories = charizard?.variants.map((v) => v.category);
    expect(variantCategories).toContain('mega');
    expect(variantCategories).toContain('gigantamax');
    expect(variantCategories).toContain('shadow');

    // Check Gigantamax signature move
    const gmaxVariant = charizard?.variants.find((v) => v.category === 'gigantamax');
    expect(gmaxVariant).toBeDefined();
    expect(gmaxVariant?.gmaxMoveName).toBe('G-Max Wildfire');
    expect(gmaxVariant?.spriteOverrides?.officialArtwork).toContain('10196.png');
  });

  it('retrieves Meowth (#52) with Regional forms (Alola & Galar)', () => {
    const meowth = getPokedexEntryById(52);
    expect(meowth).toBeDefined();

    const regionalVariants = meowth?.variants.filter((v) => v.category === 'regional');
    expect(regionalVariants?.length).toBeGreaterThanOrEqual(2);

    const alola = regionalVariants?.find((v) => v.regionalRegion === 'alola');
    expect(alola).toBeDefined();
    expect(alola?.types).toContain('Dark');

    const galar = regionalVariants?.find((v) => v.regionalRegion === 'galar');
    expect(galar).toBeDefined();
    expect(galar?.types).toContain('Steel');
  });

  it('retrieves Kyogre (#382) with Primal Reversion', () => {
    const kyogre = getPokedexEntryById(382);
    expect(kyogre).toBeDefined();

    const primal = kyogre?.variants.find((v) => v.category === 'primal');
    expect(primal).toBeDefined();
    expect(primal?.name.ja).toContain('ゲンシ');
    expect(primal?.spriteOverrides?.officialArtwork).toContain('10075.png');
  });

  it('retrieves species by slug correctly', () => {
    const pikachu = getPokedexEntryBySlug('pikachu');
    expect(pikachu).toBeDefined();
    expect(pikachu?.dexId).toBe(25);

    const ironValiant = getPokedexEntryBySlug('iron-valiant');
    expect(ironValiant).toBeDefined();
    expect(ironValiant?.dexId).toBe(1006);
  });

  it('validates 100% IV CP tiers ascending order', () => {
    const mewtwo = getPokedexEntryById(150);
    expect(mewtwo).toBeDefined();
    if (!mewtwo) return;

    expect(mewtwo.maxCp.lv15).toBeLessThan(mewtwo.maxCp.lv20);
    expect(mewtwo.maxCp.lv20).toBeLessThan(mewtwo.maxCp.lv25);
    expect(mewtwo.maxCp.lv25).toBeLessThan(mewtwo.maxCp.lv40);
    expect(mewtwo.maxCp.lv40).toBeLessThan(mewtwo.maxCp.lv50);
    expect(mewtwo.maxCp.lv50).toBeGreaterThanOrEqual(4000);
  });

  it('verifies evolution families connectivity', () => {
    const bulbasaur = getPokedexEntryById(1);
    expect(bulbasaur?.evolutionChainIds).toEqual([1, 2, 3]);

    const eevee = getPokedexEntryById(133);
    expect(eevee?.evolutionChainIds.length).toBe(9); // Eevee + 8 evolutions
    expect(eevee?.evolutionChainIds).toContain(134); // Vaporeon
    expect(eevee?.evolutionChainIds).toContain(196); // Espeon
    expect(eevee?.evolutionChainIds).toContain(700); // Sylveon
  });
});
