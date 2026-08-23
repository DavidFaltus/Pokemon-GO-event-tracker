import { describe, it, expect } from 'vitest';
import {
  enrichScrapedDuckRaids,
  enrichScrapedDuckEggs,
  enrichScrapedDuckResearch,
  enrichScrapedDuckRocketLineups
} from './enrichmentPipelines';
import {
  ScrapedDuckRaidItem,
  ScrapedDuckEggItem,
  ScrapedDuckResearchItem,
  ScrapedDuckRocketItem
} from '../types';

describe('Domain Enrichment & Normalization Pipelines', () => {
  describe('enrichScrapedDuckRaids', () => {
    it('normalizes raid boss tiers, CP ranges, weather boosts, and calculates battle counters', () => {
      const mockRawRaids: ScrapedDuckRaidItem[] = [
        {
          name: 'Tatsugiri (Curly)',
          tier: '1-Star Raids',
          canBeShiny: true,
          types: [{ name: 'dragon' }, { name: 'water' }],
          combatPower: {
            normal: { min: 1494, max: 1569 },
            boosted: { min: 1868, max: 1962 }
          },
          boostedWeather: [{ name: 'windy' }, { name: 'rainy' }],
          image: 'https://cdn.leekduck.com/assets/img/pokemon_icons/pm978.fCURLY.icon.png'
        },
        {
          name: 'Necrozma',
          tier: '5-Star Raids',
          canBeShiny: true,
          types: [{ name: 'psychic' }],
          combatPower: {
            normal: { min: 2007, max: 2104 },
            boosted: { min: 2509, max: 2630 }
          },
          boostedWeather: [{ name: 'windy' }],
          image: 'https://cdn.leekduck.com/assets/img/pokemon_icons/pm800.icon.png'
        },
        {
          name: 'Mega Gengar',
          tier: 'Mega Raids',
          canBeShiny: true,
          types: [{ name: 'ghost' }, { name: 'poison' }],
          image: 'https://cdn.leekduck.com/assets/img/pokemon_icons/pm94.icon.png'
        },
        {
          name: 'Shadow Mewtwo',
          tier: 'Shadow 5-Star Raids',
          canBeShiny: true,
          types: [{ name: 'psychic' }],
          image: 'https://cdn.leekduck.com/assets/img/pokemon_icons/pm150.icon.png'
        }
      ];

      const enriched = enrichScrapedDuckRaids(mockRawRaids);

      expect(enriched).toHaveLength(4);

      // 1-Star Raid
      const tatsugiri = enriched.find(r => r.name.includes('Tatsugiri'));
      expect(tatsugiri).toBeDefined();
      expect(tatsugiri?.tier).toBe('1');
      expect(tatsugiri?.cpRange).toBe('1494 - 1569');
      expect(tatsugiri?.boostedCpRange).toBe('1868 - 1962');
      expect(tatsugiri?.types).toEqual(['Dragon', 'Water']);
      expect(tatsugiri?.weatherBoosts).toContain('Windy');
      expect(tatsugiri?.difficultyTier).toBe('solo');

      // 5-Star Raid
      const necrozma = enriched.find(r => r.name === 'Necrozma');
      expect(necrozma?.tier).toBe('5');
      expect(necrozma?.counters).toBeDefined();
      expect(necrozma?.counters?.weaknesses.length).toBeGreaterThan(0);

      // Mega & Shadow Raids
      const megaGengar = enriched.find(r => r.name === 'Mega Gengar');
      expect(megaGengar?.tier).toBe('mega');

      const shadowMewtwo = enriched.find(r => r.name === 'Shadow Mewtwo');
      expect(shadowMewtwo?.tier).toBe('shadow-5');
    });
  });

  describe('enrichScrapedDuckEggs', () => {
    it('groups raw eggs by distance, creates CS/EN titles, and resolves high-res sprites', () => {
      const mockRawEggs: ScrapedDuckEggItem[] = [
        {
          name: 'Bulbasaur',
          eggType: '2 km',
          isAdventureSync: false,
          image: 'https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm1.icon.png',
          canBeShiny: true,
          combatPower: { min: 637, max: 637 },
          rarity: 1
        },
        {
          name: 'Riolu',
          eggType: '10 km',
          isAdventureSync: true,
          image: 'https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm447.icon.png',
          canBeShiny: true,
          combatPower: { min: 535, max: 567 },
          rarity: 3
        },
        {
          name: 'Larvitar',
          eggType: '12 km',
          isAdventureSync: false,
          image: 'https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm246.icon.png',
          canBeShiny: true,
          combatPower: { min: 554, max: 594 },
          rarity: 2
        }
      ];

      const groups = enrichScrapedDuckEggs(mockRawEggs);

      expect(groups.length).toBeGreaterThanOrEqual(3);

      const twoKm = groups.find(g => g.distance === '2 km');
      expect(twoKm).toBeDefined();
      expect(twoKm?.title.cs).toContain('2 km');
      expect(twoKm?.title.en).toContain('2 km');
      expect(twoKm?.eggs.some(e => e.name === 'Bulbasaur')).toBe(true);

      const advSync = groups.find(g => g.distance.includes('Adventure Sync') || g.eggs.some(e => e.isAdventureSync));
      expect(advSync).toBeDefined();

      const twelveKm = groups.find(g => g.distance === '12 km');
      expect(twelveKm?.eggs.some(e => e.name === 'Larvitar')).toBe(true);
    });
  });

  describe('enrichScrapedDuckResearch', () => {
    it('strips HTML tags, categorizes task types, and translates tasks into Czech', () => {
      const mockRawResearch: ScrapedDuckResearchItem[] = [
        {
          text: '<span>Catch 10 Water-type Pokémon</span>',
          type: 'catch',
          rewards: [
            {
              name: 'Ducklett',
              image: 'https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm580.icon.png',
              canBeShiny: true,
              combatPower: { min: 335, max: 367 }
            }
          ]
        },
        {
          text: '<span>Win 3 Raids</span>',
          type: 'raid',
          rewards: [
            {
              name: 'Rare Candy',
              image: 'https://cdn.leekduck.com/assets/img/items/rare-candy.png',
              canBeShiny: false,
              amount: 3
            }
          ]
        },
        {
          text: '<span>Make 3 Great Throws</span>',
          type: 'throw',
          rewards: [
            {
              name: 'Gastly',
              image: 'https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm92.icon.png',
              canBeShiny: true
            }
          ]
        }
      ];

      const tasks = enrichScrapedDuckResearch(mockRawResearch);

      expect(tasks).toHaveLength(3);
      expect(tasks[0].task.en).toBe('Catch 10 Water-type Pokémon');
      expect(tasks[0].task.cs).toContain('Chyť');
      expect(tasks[0].category).toBe('catch');
      expect(tasks[0].rewards[0].name).toBe('Ducklett');
      expect(tasks[0].rewards[0].canBeShiny).toBe(true);

      expect(tasks[1].category).toBe('raid');
      expect(tasks[1].task.cs).toContain('Vyhraj 3 Raidy');

      expect(tasks[2].category).toBe('throw');
    });
  });

  describe('enrichScrapedDuckRocketLineups', () => {
    it('separates Team GO Rocket leaders and grunts with ratings and counters', () => {
      const mockRawRocket: ScrapedDuckRocketItem[] = [
        {
          name: 'Giovanni',
          title: 'Team GO Rocket Boss',
          type: '',
          firstPokemon: [{ name: 'Persian', image: '', types: ['normal'], isEncounter: false }],
          secondPokemon: [{ name: 'Rhyperior', image: '', types: ['ground', 'rock'], isEncounter: false }],
          thirdPokemon: [{ name: 'Reshiram', image: '', types: ['dragon', 'fire'], isEncounter: true, canBeShiny: true }]
        },
        {
          name: 'Cliff',
          title: 'Team GO Rocket Leader',
          type: '',
          firstPokemon: [{ name: 'Axew', image: '', types: ['dragon'], isEncounter: true, canBeShiny: true }],
          secondPokemon: [{ name: 'Snorlax', image: '', types: ['normal'], isEncounter: false }],
          thirdPokemon: [{ name: 'Tyranitar', image: '', types: ['rock', 'dark'], isEncounter: false }]
        },
        {
          name: 'Grunt (Dragon)',
          title: 'Team GO Rocket Grunt',
          type: 'Dragon',
          quote: 'ROAR!... How’d that sound?',
          firstPokemon: [{ name: 'Dratini', image: '', types: ['dragon'], isEncounter: true, canBeShiny: true }],
          secondPokemon: [{ name: 'Dragonair', image: '', types: ['dragon'], isEncounter: false }],
          thirdPokemon: [{ name: 'Dragonite', image: '', types: ['dragon', 'flying'], isEncounter: false }]
        }
      ];

      const result = enrichScrapedDuckRocketLineups(mockRawRocket);

      expect(result.leaders).toHaveLength(2);
      expect(result.grunts).toHaveLength(1);

      // Giovanni leader verification
      const giovanni = result.leaders.find(l => l.name === 'Giovanni');
      expect(giovanni).toBeDefined();
      expect(giovanni?.reward.name).toBe('Reshiram');
      expect(giovanni?.lineup.slot1[0].name).toBe('Persian');
      expect(giovanni?.counters.megaCounters.length).toBeGreaterThan(0);

      // Grunt verification
      const grunt = result.grunts[0];
      expect(grunt.type).toBe('Dragon');
      expect(grunt.phraseEn).toBe('ROAR!... How’d that sound?');
      expect(grunt.shadowPokemon).toContain('Dratini');
    });
  });
});
