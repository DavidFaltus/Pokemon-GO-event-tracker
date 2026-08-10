import { describe, it, expect } from 'vitest';
import type { EventData } from '../components/EventCard';
import {
  filterEventsForMonth,
  categorizeMonthlyEvents,
  generateWeeklyTimeline,
  cleanEventName,
  getSpotlightBonus,
  getWeekMondayToSundayRange
} from './infographics';

// Mock data helper
const createMockEvent = (id: string, name: string, type: string, start: string, end: string, extraData?: any): EventData => ({
  eventID: id,
  name,
  eventType: type,
  heading: name,
  link: 'https://pogoevents.app',
  start,
  end,
  image: 'https://example.com/image.png',
  extraData
});

describe('Infographics Utilities', () => {
  describe('cleanEventName', () => {
    it('removes redundant suffix texts from event names based on type', () => {
      expect(cleanEventName('Xerneas in 5-Star Raid Battles')).toBe('Xerneas');
      expect(cleanEventName('Mega Gyarados in Mega Raids')).toBe('Mega Gyarados');
      expect(cleanEventName('Shadow Mewtwo in Shadow Raids')).toBe('Shadow Mewtwo');
      expect(cleanEventName('Beldum during Max Monday')).toBe('Beldum');
      expect(cleanEventName('Bulbasaur Spotlight Hour')).toBe('Bulbasaur');
      expect(cleanEventName('Necrozma Raid Hour')).toBe('Necrozma');
    });
  });

  describe('getSpotlightBonus', () => {
    it('extracts bonus text from extraData or event properties', () => {
      const eventWithExtra = createMockEvent('1', 'Bulbasaur Spotlight Hour', 'pokemon-spotlight-hour', '2026-08-11T18:00:00Z', '2026-08-11T19:00:00Z', {
        spotlight: { bonus: '2× Catch XP' }
      });
      expect(getSpotlightBonus(eventWithExtra)).toBe('2× Catch XP');

      const eventInTitle = createMockEvent('2', 'Pikachu Spotlight Hour (2x Catch Stardust)', 'pokemon-spotlight-hour', '2026-08-18T18:00:00Z', '2026-08-18T19:00:00Z');
      expect(getSpotlightBonus(eventInTitle)).toBe('2× Catch Stardust');
    });
  });

  describe('getWeekMondayToSundayRange', () => {
    it('calculates full Monday to Sunday calendar week range for given week number', () => {
      // August 2026: Aug 1 is Saturday, Aug 3 is Monday (Week 1 Monday = Aug 3, or Monday of Week 1)
      const rangeWeek2 = getWeekMondayToSundayRange(2, 7, 2026); // August (monthIndex = 7)
      expect(rangeWeek2.monday.getDay()).toBe(1); // Monday
      expect(rangeWeek2.sunday.getDay()).toBe(0); // Sunday
    });
  });

  describe('filterEventsForMonth', () => {
    it('filters events falling within the given month and excludes Ultra League', () => {
      const events = [
        createMockEvent('1', 'Spotlight Hour', 'pokemon-spotlight-hour', '2026-08-05T18:00:00Z', '2026-08-05T19:00:00Z'),
        createMockEvent('2', 'September Event', 'pokemon-spotlight-hour', '2026-09-01T18:00:00Z', '2026-09-01T19:00:00Z'),
        createMockEvent('3', 'Ultra League PvP', 'raid-battles', '2026-08-10T10:00:00Z', '2026-08-17T10:00:00Z', { isPvP: true }),
        createMockEvent('4', 'August Showdown', 'pokemon-spotlight-hour', '2026-08-10T10:00:00Z', '2026-08-17T10:00:00Z')
      ];

      events[2].name = 'Ultra League Fantasy Cup';
      
      const result = filterEventsForMonth(events, 7, 2026);
      
      expect(result.map(e => e.eventID)).toContain('1');
      expect(result.map(e => e.eventID)).toContain('4');
      expect(result.map(e => e.eventID)).not.toContain('2');
      expect(result.map(e => e.eventID)).not.toContain('3');
    });
  });

  describe('categorizeMonthlyEvents', () => {
    it('correctly categorizes events and splits spotlight and raid hours', () => {
      const events = [
        createMockEvent('1', 'Beldum Community Day', 'community-day', '2026-08-10T14:00:00Z', '2026-08-10T17:00:00Z'),
        createMockEvent('2', 'Xerneas Raids', 'raid-battles', '2026-08-11T10:00:00Z', '2026-08-21T10:00:00Z'),
        createMockEvent('3', 'Bulbasaur Spotlight Hour', 'pokemon-spotlight-hour', '2026-08-12T18:00:00Z', '2026-08-12T19:00:00Z'),
        createMockEvent('4', 'Max Monday', 'max-mondays', '2026-08-17T18:00:00Z', '2026-08-17T19:00:00Z'),
        createMockEvent('5', 'Daily PokeCoin Bounty Part 1 (Ticket)', 'ticket-event', '2026-08-01T10:00:00Z', '2026-08-31T20:00:00Z'),
        createMockEvent('6', 'Necrozma Raid Hour', 'raid-hour', '2026-08-19T18:00:00Z', '2026-08-19T19:00:00Z')
      ];

      const categories = categorizeMonthlyEvents(events);

      expect(categories.communityDays.events.map(e => e.eventID)).toContain('1');
      expect(categories.raids.events.map(e => e.eventID)).toContain('2');
      expect(categories.spotlights.events.map(e => e.eventID)).toContain('3');
      expect(categories.raidHours.events.map(e => e.eventID)).toContain('6');
      expect(categories.dynamax.events.map(e => e.eventID)).toContain('4');
      expect(categories.goPass.events.map(e => e.eventID)).toContain('5');

      expect(categories.spotlights.colorTheme).toBe('orange');
      expect(categories.raidHours.colorTheme).toBe('blue');
    });
  });

  describe('generateWeeklyTimeline', () => {
    it('only shows long-term events on their start date and skips days with no events', () => {
      const events = [
        createMockEvent('1', 'Xerneas Raids Rotation', 'raid-battles', '2026-08-11T10:00:00Z', '2026-08-18T10:00:00Z'),
        createMockEvent('2', 'Bulbasaur Spotlight Hour', 'pokemon-spotlight-hour', '2026-08-12T18:00:00Z', '2026-08-12T19:00:00Z'),
      ];

      const timeline = generateWeeklyTimeline(events, 2, 7, 2026);

      const tuesday = timeline.find(day => day.date.getDate() === 11);
      expect(tuesday?.event?.eventID).toBe('1');

      const wednesday = timeline.find(day => day.date.getDate() === 12);
      expect(wednesday?.event?.eventID).toBe('2');

      const thursday = timeline.find(day => day.date.getDate() === 13);
      expect(thursday).toBeUndefined();
    });
  });
});
