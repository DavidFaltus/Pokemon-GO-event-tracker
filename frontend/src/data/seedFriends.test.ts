import { describe, it, expect } from 'vitest';
import { SEED_COMMUNITY_FRIENDS } from './seedFriends';

describe('SEED_COMMUNITY_FRIENDS', () => {
  it('is an array initialized cleanly with no dummy codes', () => {
    expect(Array.isArray(SEED_COMMUNITY_FRIENDS)).toBe(true);
    expect(SEED_COMMUNITY_FRIENDS.length).toBe(0);
  });
});
