import { describe, it, expect } from 'vitest';
import { SEED_COMMUNITY_FRIENDS } from './seedFriends';

describe('SEED_COMMUNITY_FRIENDS', () => {
  it('contains at least 18 verified community listings', () => {
    expect(SEED_COMMUNITY_FRIENDS.length).toBeGreaterThanOrEqual(18);
  });

  it('contains valid 12-digit trainer codes', () => {
    for (const friend of SEED_COMMUNITY_FRIENDS) {
      const cleanDigits = friend.trainerCode.replace(/\D/g, '');
      expect(cleanDigits.length).toBe(12);
      expect(friend.trainerCode).toMatch(/^\d{4} \d{4} \d{4}$/);
    }
  });

  it('covers all major Vivillon patterns', () => {
    const patterns = new Set(SEED_COMMUNITY_FRIENDS.map(f => f.vivillonPattern));
    expect(patterns.has('sandstorm')).toBe(true);
    expect(patterns.has('ocean')).toBe(true);
    expect(patterns.has('tundra')).toBe(true);
    expect(patterns.has('icy-snow')).toBe(true);
    expect(patterns.has('continental')).toBe(true);
    expect(patterns.has('sun')).toBe(true);
    expect(patterns.has('savanna')).toBe(true);
    expect(patterns.has('monsoon')).toBe(true);
  });

  it('sets permanent expiration (expiresAt: 0) on all seed listings', () => {
    for (const friend of SEED_COMMUNITY_FRIENDS) {
      expect(friend.expiresAt).toBe(0);
    }
  });
});
