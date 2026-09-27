import { describe, it, expect } from 'vitest';
import { resolveEventThematicBackground, THEMATIC_BACKGROUNDS } from './thematicBackgroundResolver';

describe('thematicBackgroundResolver', () => {
  it('returns null when event is undefined', () => {
    expect(resolveEventThematicBackground(undefined)).toBeNull();
  });

  it('detects Might and Mastery season background from event name', () => {
    const bg = resolveEventThematicBackground({
      name: 'Season of Might & Mastery',
      eventID: 'might-and-mastery-season',
      eventType: 'season'
    });
    expect(bg).toBe('/backgrounds/might-and-mastery-season.png');
  });

  it('detects Delightful Days season background from eventID', () => {
    const bg = resolveEventThematicBackground({
      name: 'Delightful Days',
      eventID: 'delightful-days-season-2026',
      eventType: 'season'
    });
    expect(bg).toBe('/backgrounds/delightful-days-season.png');
  });

  it('detects Wild Area global background from event name', () => {
    const bg = resolveEventThematicBackground({
      name: 'Wild Area Global 2026',
      eventID: 'wild-area-global',
      eventType: 'wild-area'
    });
    expect(bg).toBe('/backgrounds/wild-area-global-soundwave.png');
  });

  it('detects Community Day backgrounds', () => {
    const bg = resolveEventThematicBackground({
      name: 'Tepig Community Day Classic',
      eventID: 'tepig-community-day',
      eventType: 'community-day'
    });
    expect(bg).toBe('/backgrounds/community-days-2026.png');
  });

  it('provides a list of thematic backgrounds for UI picker', () => {
    expect(THEMATIC_BACKGROUNDS.length).toBeGreaterThan(5);
    expect(THEMATIC_BACKGROUNDS.some(b => b.id === 'might-and-mastery-season')).toBe(true);
  });
});
