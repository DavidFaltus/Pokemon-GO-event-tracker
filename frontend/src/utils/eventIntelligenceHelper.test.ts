import { describe, it, expect } from 'vitest';
import {
  buildEventIntelligence,
  isCanceledEvent,
  isSitemapWorthyEvent,
  localizeEventBonus,
  localizeTypeName,
  matchFeaturedPokemonForEvent,
} from './eventIntelligenceHelper';
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

  it('filters canceled and micro events from sitemap while localizing and paraphrasing event bonuses', () => {
    expect(isCanceledEvent({ name: '[Canceled] Max Monday', eventID: 'max-mondays-2026-11-16' })).toBe(true);
    expect(isSitemapWorthyEvent({ name: '[Canceled] Max Monday', eventID: 'max-mondays-2026-11-16' })).toBe(false);
    expect(isSitemapWorthyEvent({ name: 'GBL Great League', eventID: 'gbl-twilight-trails_great-league' })).toBe(false);
    expect(isSitemapWorthyEvent({ name: 'Twilight Trails Season', eventID: 'season-24-twilight-trails' })).toBe(true);

    const rawBonus = 'One guaranteed Candy XL when trading Pokémon for Trainers level 31 and above';
    expect(localizeEventBonus(rawBonus, 'cs')).toContain('Garantovaný');
    expect(localizeEventBonus(rawBonus, 'ja')).toContain('アメXL');
    expect(localizeEventBonus(rawBonus, 'ru')).toContain('Гарантированная');
    expect(localizeEventBonus(rawBonus, 'en')).not.toBe(rawBonus);

    // Unmatched raw English bonus must not leak onto non-EN pages
    expect(localizeEventBonus('Some completely arbitrary unrecognized English promo sentence', 'ja')).toBeNull();
    expect(localizeEventBonus('Some completely arbitrary unrecognized English promo sentence', 'ru')).toBeNull();
    expect(localizeEventBonus('Some completely arbitrary unrecognized English promo sentence', 'cs')).toBeNull();
  });

  it('uses strict editorial whitelist for AdSense script and blocks game/utility/noindex routes', () => {
    expect(isAdSenseEligiblePath('/cs')).toBe(true);
    expect(isAdSenseEligiblePath('/en/guides')).toBe(true);
    expect(isAdSenseEligiblePath('/cs/guides/galarian-birds-encounter-catch-guide')).toBe(true);
    expect(isAdSenseEligiblePath('/en/events/tinkatink-community-day')).toBe(true);
    expect(isAdSenseEligiblePath('/cs/raids/mewtwo-counters')).toBe(true);
    expect(isAdSenseEligiblePath('/en/rocket/giovanni')).toBe(true);
    expect(isAdSenseEligiblePath('/cs/rankings/great-league')).toBe(true);

    // Explicitly blocked utility, game, noindex, legal, and micro-event paths
    expect(isAdSenseEligiblePath('/cs/pokedle')).toBe(false);
    expect(isAdSenseEligiblePath('/en/filter')).toBe(false);
    expect(isAdSenseEligiblePath('/cs/friends')).toBe(false);
    expect(isAdSenseEligiblePath('/cs/pokedex/mewtwo')).toBe(false);
    expect(isAdSenseEligiblePath('/cs/types/fire')).toBe(false);
    expect(isAdSenseEligiblePath('/cs/events/max-mondays-2026-11-16')).toBe(false);
    expect(isAdSenseEligiblePath('/en/events/gbl-twilight-trails')).toBe(false);
    expect(isAdSenseEligiblePath('/cs/privacy')).toBe(false);
    expect(isAdSenseEligiblePath('/cs/settings')).toBe(false);
    expect(isAdSenseEligiblePath('/en/admin')).toBe(false);
    expect(isAdSenseEligiblePath('/cs/download')).toBe(false);
    expect(isAdSenseEligiblePath('/cs/pokemon/1')).toBe(false);
  });
});
