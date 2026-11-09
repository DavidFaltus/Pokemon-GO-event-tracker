import { describe, it, expect } from 'vitest';
import { buildEventIntelligence, localizeTypeName, matchFeaturedPokemonForEvent } from './eventIntelligenceHelper';
import { isAdSenseEligiblePath } from '../components/AdSenseScript';

describe('eventIntelligenceHelper & AdSense route guard', () => {
  it('localizes elemental type names across cs, en, ja, and ru without leaking English', () => {
    expect(localizeTypeName('Fighting', 'cs')).toBe('Bojový');
    expect(localizeTypeName('Fighting', 'ja')).toBe('かくとう');
    expect(localizeTypeName('Fighting', 'ru')).toBe('Боевой');
    expect(localizeTypeName('Fighting', 'en')).toBe('Fighting');
  });

  it('synthesizes raid intelligence, counters, and FAQs for Raid events', () => {
    const sampleEvent = {
      eventID: 'raid-hour-mewtwo-test',
      name: 'Mewtwo Raid Hour',
      eventType: 'raid-hour',
      heading: 'Raid Hour',
      link: 'https://leekduck.com/events/raid-hour-mewtwo-test/',
      image: 'https://example.com/mewtwo.png',
      start: '2026-05-01T18:00:00.000',
      end: '2026-05-01T19:00:00.000',
      extraData: {
        raidbattles: {
          bosses: [{ name: 'Mewtwo', image: '', canBeShiny: true }],
        },
      },
    };

    const intel = buildEventIntelligence(sampleEvent, sampleEvent.extraData, 'cs');
    expect(intel.bossBreakdowns.length).toBeGreaterThan(0);
    expect(intel.bossBreakdowns[0].counters.length).toBeGreaterThan(0);
    expect(intel.editorialSections.length).toBeGreaterThanOrEqual(2);
    expect(intel.faqs.length).toBeGreaterThanOrEqual(3);
  });

  it('synthesizes spawn intelligence, Mega recommendations, and search strings for Community Day events', () => {
    const sampleEvent = {
      eventID: 'community-day-charmander-test',
      name: 'Charmander Community Day Classic',
      eventType: 'community-day',
      heading: 'Community Day',
      link: 'https://leekduck.com/events/community-day-charmander-test/',
      image: 'https://example.com/charmander.png',
      start: '2026-05-10T14:00:00.000',
      end: '2026-05-10T17:00:00.000',
      extraData: {
        generic: {
          hasSpawns: true,
          hasFieldResearchTasks: false,
        },
      },
    };

    const rawDetails = {
      spawns: ['Charmander', 'Charizard'],
      bonuses: ['3x Catch Stardust'],
    };

    const matched = matchFeaturedPokemonForEvent(sampleEvent, rawDetails);
    expect(matched.some((p) => p.slug === 'charmander')).toBe(true);

    const intel = buildEventIntelligence(sampleEvent, rawDetails, 'en');
    expect(intel.spawnBreakdowns.length).toBeGreaterThan(0);
    expect(intel.spawnBreakdowns[0].recommendedMegas.length).toBeGreaterThan(0);
    expect(intel.spawnBreakdowns[0].hundoFilterString).toContain('&4*');
    expect(intel.spawnBreakdowns[0].pvpFilterString).toContain('0-1attack');
  });

  it('blocks AdSense script on utility, admin, and redirect routes while allowing content routes', () => {
    expect(isAdSenseEligiblePath('/cs')).toBe(true);
    expect(isAdSenseEligiblePath('/en/events/tinkatink-community-day')).toBe(true);
    expect(isAdSenseEligiblePath('/cs/pokedex/mewtwo')).toBe(true);
    expect(isAdSenseEligiblePath('/cs/raids/mewtwo-counters')).toBe(true);
    expect(isAdSenseEligiblePath('/cs/settings')).toBe(false);
    expect(isAdSenseEligiblePath('/en/admin')).toBe(false);
    expect(isAdSenseEligiblePath('/cs/download')).toBe(false);
    expect(isAdSenseEligiblePath('/cs/pokemon/1')).toBe(false);
  });
});
