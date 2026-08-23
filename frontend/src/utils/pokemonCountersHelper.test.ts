import { describe, it, expect } from 'vitest';
import { getPokemonRankingInfo, isLegacyMove } from './pokemonCountersHelper';
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

  it('correctly reports Lunala as lower tier ghost attacker and Dawn Wings as #1 Ghost', () => {
    const lunalaInfo = getPokemonRankingInfo('Lunala');
    const dawnWingsInfo = getPokemonRankingInfo('Dawn Wings Necrozma');

    expect(dawnWingsInfo.typeRank).toBe(1);
    expect(dawnWingsInfo.typeName).toBe('Ghost');

    expect(lunalaInfo.typeRank).toBeGreaterThan(1); // Lunala is definitely NOT #1 Ghost attacker!
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

  it('correctly identifies legacy, elite TM, and signature moves', () => {
    // Signature & Elite TM moves
    expect(isLegacyMove('Sunsteel Strike')).toBe(true);
    expect(isLegacyMove('Moongeist Beam')).toBe(true);
    expect(isLegacyMove('Dragon Ascent')).toBe(true);
    expect(isLegacyMove('Precipice Blades')).toBe(true);
    expect(isLegacyMove('Origin Pulse')).toBe(true);
    expect(isLegacyMove('Roar of Time')).toBe(true);
    expect(isLegacyMove('Spacial Rend')).toBe(true);
    expect(isLegacyMove('Force Palm')).toBe(true);
    expect(isLegacyMove('Fusion Flare')).toBe(true);
    expect(isLegacyMove('Fusion Bolt')).toBe(true);
    expect(isLegacyMove('Psystrike')).toBe(true);
    expect(isLegacyMove('Meteor Mash')).toBe(true);
    expect(isLegacyMove('Rock Wrecker')).toBe(true);
    expect(isLegacyMove('Brutal Swing')).toBe(true);
    expect(isLegacyMove('Magma Storm')).toBe(true);
    expect(isLegacyMove('Geomancy')).toBe(true);
    expect(isLegacyMove('Oblivion Wing')).toBe(true);
    expect(isLegacyMove('Hydro Cannon')).toBe(true);
    expect(isLegacyMove('Frenzy Plant')).toBe(true);
    expect(isLegacyMove('Blast Burn')).toBe(true);
    expect(isLegacyMove('Hydro Cannon*')).toBe(true);

    // Standard regular TM moves
    expect(isLegacyMove('Shadow Ball')).toBe(false);
    expect(isLegacyMove('Thunderbolt')).toBe(false);
    expect(isLegacyMove('Flamethrower')).toBe(false);
    expect(isLegacyMove('Surf')).toBe(false);
    expect(isLegacyMove('Earthquake')).toBe(false);
    expect(isLegacyMove('Avalanche')).toBe(false);
    expect(isLegacyMove('Wild Charge')).toBe(false);
  });

  it('contains complete dataset for all Megas, Primals, and top Shadow variants', () => {
    // Megas & Primals
    const expectedMegas = [
      'Mega Charizard X', 'Mega Charizard Y', 'Mega Mewtwo X', 'Mega Mewtwo Y', 'Mega Rayquaza',
      'Primal Groudon', 'Primal Kyogre', 'Mega Lucario', 'Mega Garchomp', 'Mega Tyranitar',
      'Mega Salamence', 'Mega Metagross', 'Mega Gardevoir', 'Mega Gallade', 'Mega Heracross',
      'Mega Pinsir', 'Mega Scizor', 'Mega Blaziken', 'Mega Sceptile', 'Mega Swampert',
      'Mega Venusaur', 'Mega Blastoise', 'Mega Gengar', 'Mega Banette', 'Mega Alakazam',
      'Mega Houndoom', 'Mega Aggron', 'Mega Gyarados', 'Mega Aerodactyl', 'Mega Ampharos',
      'Mega Manectric', 'Mega Glalie', 'Mega Abomasnow', 'Mega Beedrill', 'Mega Pidgeot',
      'Mega Kangaskhan', 'Mega Lopunny', 'Mega Altaria', 'Mega Latios', 'Mega Latias',
      'Mega Diancie', 'Mega Sableye', 'Mega Mawile', 'Mega Medicham', 'Mega Sharpedo',
      'Mega Camerupt', 'Mega Audino', 'Mega Slowbro', 'Mega Steelix', 'Mega Absol'
    ];

    for (const megaName of expectedMegas) {
      const found = pokemonRankings.find(p => p.name === megaName);
      expect(found, `Expected ${megaName} to be in pokemonRankings`).toBeDefined();
      expect(found!.isMega || found!.isPrimal).toBe(true);
      expect(found!.attack).toBeGreaterThan(140);
      expect(found!.maxCp).toBeGreaterThan(1500);
    }

    // Top Shadow Raid Attackers
    const expectedShadows = [
      'Shadow Mewtwo', 'Shadow Kyogre', 'Shadow Groudon', 'Shadow Rayquaza', 'Shadow Dialga',
      'Shadow Palkia', 'Shadow Giratina (Origin)', 'Shadow Heatran', 'Shadow Darkrai',
      'Shadow Raikou', 'Shadow Entei', 'Shadow Moltres', 'Shadow Zapdos', 'Shadow Articuno',
      'Shadow Tyranitar', 'Shadow Metagross', 'Shadow Salamence', 'Shadow Dragonite',
      'Shadow Garchomp', 'Shadow Rhyperior', 'Shadow Rampardos', 'Shadow Excadrill',
      'Shadow Mamoswine', 'Shadow Chandelure', 'Shadow Blaziken', 'Shadow Sceptile',
      'Shadow Swampert', 'Shadow Machamp', 'Shadow Conkeldurr', 'Shadow Gardevoir',
      'Shadow Hydreigon', 'Shadow Weavile', 'Shadow Honchkrow', 'Shadow Staraptor'
    ];

    for (const shadowName of expectedShadows) {
      const found = pokemonRankings.find(p => p.name === shadowName);
      expect(found, `Expected ${shadowName} to be in pokemonRankings`).toBeDefined();
      expect(found!.isShadow).toBe(true);
      expect(found!.attack).toBeGreaterThan(150);
    }

    // Key Legends
    const zacian = pokemonRankings.find(p => p.name === 'Zacian' || p.name === 'Zacian (Hero of Many Battles)');
    const zamazenta = pokemonRankings.find(p => p.name === 'Zamazenta' || p.name === 'Zamazenta (Hero of Many Battles)');
    const mewtwo = pokemonRankings.find(p => p.name === 'Mewtwo');

    expect(zacian).toBeDefined();
    expect(zamazenta).toBeDefined();
    expect(mewtwo).toBeDefined();
    expect(mewtwo!.attack).toBe(300);
    expect(mewtwo!.dps).toBeGreaterThan(35);
  });
});
