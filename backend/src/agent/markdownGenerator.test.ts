import { describe, it, expect } from 'vitest';
import {
  generateEventsMarkdown,
  generateRaidsMarkdown,
  generateResearchMarkdown,
  generateSummaryMarkdown
} from './markdownGenerator';
import { EventData, ScrapedRaidBoss, EnrichedResearchTask, EnrichedEggGroup, SpecialEventDetails } from '../types';

describe('AI Agent Markdown Generator', () => {
  it('formats active and upcoming events into structured markdown', () => {
    const mockEvents: EventData[] = [
      {
        eventID: 'community-day-test',
        name: 'Testovací Community Day',
        eventType: 'Community Day',
        heading: 'Catch many Pokémon',
        start: '2020-01-01T14:00:00.000Z',
        end: '2030-01-01T17:00:00.000Z',
        image: 'https://example.com/banner.png',
        link: 'https://example.com'
      }
    ];

    const mockDetails: Record<string, SpecialEventDetails> = {
      'community-day-test': {
        eventID: 'community-day-test',
        bonuses: [{ text: { cs: '3× Stardust za chycení', en: '3× Catch Stardust' }, icon: '' }]
      }
    };

    const mdCs = generateEventsMarkdown(mockEvents, 'cs', (id) => mockDetails[id] || null);
    expect(mdCs).toContain('# Pokémon GO — Přehled Událostí');
    expect(mdCs).toContain('Testovací Community Day');
    expect(mdCs).toContain('3× Stardust za chycení');
    expect(mdCs).toContain('https://pogoevents.app/cs/events/community-day-test');

    const mdEn = generateEventsMarkdown(mockEvents, 'en', (id) => mockDetails[id] || null);
    expect(mdEn).toContain('# Pokémon GO — Events Overview');
    expect(mdEn).toContain('Testovací Community Day');
    expect(mdEn).toContain('3× Catch Stardust');
  });

  it('formats raid bosses and battle counters with tier groupings', () => {
    const mockRaids: ScrapedRaidBoss[] = [
      {
        name: 'Mewtwo',
        tier: '5',
        image: 'https://example.com/mewtwo.png',
        types: ['Psychic'],
        canBeShiny: true,
        cpRange: '2311 - 2387',
        boostedCpRange: '2889 - 2984',
        weatherBoosts: ['Windy'],
        playersRecommended: '3-4',
        difficultyTier: 'trio',
        counters: {
          bossName: 'Mewtwo',
          weaknesses: ['Dark', 'Ghost', 'Bug'],
          megaCounters: ['Mega Tyranitar'],
          advancedCounters: ['Tyranitar', 'Hydreigon'],
          budgetCounters: ['Gengar'],
          minCp: 2311,
          maxCp: 2387,
          minBoostedCp: 2889,
          maxBoostedCp: 2984,
          weatherBoosts: ['Windy']
        }
      }
    ];

    const md = generateRaidsMarkdown(mockRaids, 'cs');
    expect(md).toContain('Tier 5 (Legendary Raids)');
    expect(md).toContain('Mewtwo ✨ (Shiny Available)');
    expect(md).toContain('2311 - 2387 CP');
    expect(md).toContain('**Tyranitar**');
  });

  it('formats field research tasks by categories with rewards', () => {
    const mockTasks: EnrichedResearchTask[] = [
      {
        task: { cs: 'Chyť 5 Pokémonů', en: 'Catch 5 Pokémon' },
        category: 'catch',
        rewards: [
          { name: 'Bulbasaur', image: 'https://example.com/bulba.png', canBeShiny: true, minCp: 432, maxCp: 477 }
        ]
      }
    ];

    const md = generateResearchMarkdown(mockTasks, 'cs');
    expect(md).toContain('# Pokémon GO — Polní Výzkumy & Odměny');
    expect(md).toContain('Chytání Pokémonů');
    expect(md).toContain('Chyť 5 Pokémonů');
    expect(md).toContain('Bulbasaur ✨ (432-477 CP)');
  });

  it('generates a full live summary of the game state for LLMs', () => {
    const mockEvents: EventData[] = [
      {
        eventID: 'test-event',
        name: 'Aktivní Event',
        eventType: 'Event',
        heading: 'Double XP',
        start: '2020-01-01T00:00:00Z',
        end: '2030-01-01T00:00:00Z',
        image: '',
        link: ''
      }
    ];

    const mockRaids: ScrapedRaidBoss[] = [
      { name: 'Rayquaza', tier: '5', image: '', types: ['Dragon', 'Flying'], canBeShiny: true, cpRange: '2191' }
    ];

    const mockRocket = {
      giovanni: {
        reward: { name: 'Shadow Groudon' }
      }
    };

    const mockEggs: EnrichedEggGroup[] = [
      {
        distance: '2 km',
        title: { cs: '2 km Vejce', en: '2 km Eggs' },
        eggs: [{ name: 'Pichu', image: '', canBeShiny: true, rarity: 1 }]
      }
    ];

    const md = generateSummaryMarkdown(mockEvents, mockRaids, mockRocket, mockEggs, [], 'cs');
    expect(md).toContain('Pokémon GO — Aktuální Stav & Souhrn');
    expect(md).toContain('Aktivní Event');
    expect(md).toContain('**Rayquaza** [Tier 5] ✨');
    expect(md).toContain('Shadow Groudon');
    expect(md).toContain('2 km');
  });
});
