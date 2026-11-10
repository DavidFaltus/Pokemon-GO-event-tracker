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

  it('retrieves Rotom (#479) with all alternate appliance forms and respective typings', () => {
    const rotom = getPokedexEntryById(479);
    expect(rotom).toBeDefined();
    expect(rotom?.hasAlternateForms).toBe(true);

    const forms = rotom?.variants.filter((v) => v.category === 'alternate_form');
    expect(forms?.length).toBeGreaterThanOrEqual(5);

    const heat = rotom?.variants.find((v) => v.id === 'ROTOM_HEAT');
    expect(heat?.types).toEqual(['Electric', 'Fire']);

    const wash = rotom?.variants.find((v) => v.id === 'ROTOM_WASH');
    expect(wash?.types).toEqual(['Electric', 'Water']);

    const frost = rotom?.variants.find((v) => v.id === 'ROTOM_FROST');
    expect(frost?.types).toEqual(['Electric', 'Ice']);

    const fan = rotom?.variants.find((v) => v.id === 'ROTOM_FAN');
    expect(fan?.types).toEqual(['Electric', 'Flying']);

    const mow = rotom?.variants.find((v) => v.id === 'ROTOM_MOW');
    expect(mow?.types).toEqual(['Electric', 'Grass']);
  });

  it('retrieves Necrozma (#800) with Dusk Mane & Dawn Wings fusions, partner data, and adventure effects', () => {
    const necrozma = getPokedexEntryById(800);
    expect(necrozma).toBeDefined();
    expect(necrozma?.hasFusions).toBe(true);

    const duskMane = necrozma?.variants.find((v) => v.id === 'NECROZMA_DUSK_MANE');
    expect(duskMane).toBeDefined();
    expect(duskMane?.types).toEqual(['Psychic', 'Steel']);
    expect(duskMane?.fusionPartner).toBe('Solgaleo');
    expect(duskMane?.signatureMove?.name).toBe('Sunsteel Strike');
    expect(duskMane?.adventureEffect?.cs).toContain('denní');

    const dawnWings = necrozma?.variants.find((v) => v.id === 'NECROZMA_DAWN_WINGS');
    expect(dawnWings).toBeDefined();
    expect(dawnWings?.types).toEqual(['Psychic', 'Ghost']);
    expect(dawnWings?.fusionPartner).toBe('Lunala');
    expect(dawnWings?.signatureMove?.name).toBe('Moongeist Beam');
    expect(dawnWings?.adventureEffect?.cs).toContain('noční');
  });

  it('retrieves Zacian (#888) with pure Fairy base and Crowned Sword Fairy/Steel form with max CP 5629', () => {
    const zacian = getPokedexEntryById(888);
    expect(zacian).toBeDefined();
    expect(zacian?.types).toEqual(['Fairy']);
    expect(zacian?.hasBattleForms).toBe(true);

    const crowned = zacian?.variants.find((v) => v.id === 'ZACIAN_CROWNED_SWORD');
    expect(crowned).toBeDefined();
    expect(crowned?.types).toEqual(['Fairy', 'Steel']);
    expect(crowned?.stats.attack).toBe(332);
    expect(crowned?.maxCp).toBe(5629);
  });

  it('retrieves Kyurem (#646) and Calyrex (#898) fusion forms', () => {
    const kyurem = getPokedexEntryById(646);
    expect(kyurem?.hasFusions).toBe(true);
    expect(kyurem?.variants.some((v) => v.id === 'KYUREM_BLACK' && v.fusionPartner === 'Zekrom')).toBe(true);
    expect(kyurem?.variants.some((v) => v.id === 'KYUREM_WHITE' && v.fusionPartner === 'Reshiram')).toBe(true);

    const calyrex = getPokedexEntryById(898);
    expect(calyrex?.hasFusions).toBe(true);
    expect(calyrex?.variants.some((v) => v.id === 'CALYREX_ICE_RIDER' && v.fusionPartner === 'Glastrier')).toBe(true);
    expect(calyrex?.variants.some((v) => v.id === 'CALYREX_SHADOW_RIDER' && v.fusionPartner === 'Spectrier')).toBe(true);
  });
});
