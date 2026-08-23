import { describe, it, expect, vi } from 'vitest';
import { getRaidBossProfile, getTopCountersForBoss } from './raidCombatIntelligence';

describe('raidCombatIntelligence', () => {
  it('getRaidBossProfile() returns complete profile for a known boss', () => {
    const profile = getRaidBossProfile('Necrozma', ['Psychic'], 'Tier 5');
    
    expect(profile.name).toBe('Necrozma');
    expect(profile.types).toEqual(['Psychic']);
    expect(profile.tier).toBe('Tier 5');
    
    expect(profile.counterTypes.length).toBeGreaterThan(0);
    expect(profile.topCounters.length).toBeGreaterThan(0);
    expect(profile.difficulty).toBeDefined();
    
    // Necrozma has static data
    expect(profile.difficulty.tier).toBeDefined();
    expect(profile.cpRange).toBeDefined();
    expect(profile.boostedCpRange).toBeDefined();
    expect(profile.hundoCp).toBe(2104);
  });
  
  it('getRaidBossProfile() returns valid counter types based on boss types', () => {
    const profile = getRaidBossProfile('UnknownBoss', ['Fire', 'Flying'], 'Tier 3');
    
    const counterTypes = profile.counterTypes.map(c => c.type);
    expect(counterTypes).toContain('Rock'); // Double weakness
    expect(counterTypes).toContain('Water');
    expect(counterTypes).toContain('Electric');
    
    const rock = profile.counterTypes.find(c => c.type === 'Rock');
    expect(rock?.multiplier).toBe(2.56);
  });
  
  it('getTopCountersForBoss() returns ranked counters', () => {
    const counters = getTopCountersForBoss('Pikachu', ['Electric']);
    
    expect(counters.length).toBeGreaterThan(0);
    expect(counters[0].name).toBeDefined();
    expect(counters[0].types).toBeDefined();
    expect(counters[0].fastMove).toBeDefined();
    expect(counters[0].chargedMove).toBeDefined();
    
    // Should be ground types mostly
    const hasGroundType = counters.some(c => c.types.includes('Ground') || c.chargedMove === 'Earthquake' || c.chargedMove === 'Precipice Blades');
    expect(hasGroundType).toBe(true);
  });
  
  it('getTopCountersForBoss() respects the limit parameter', () => {
    const limit5 = getTopCountersForBoss('Pikachu', ['Electric'], 5);
    expect(limit5.length).toBe(5);
    
    const limit2 = getTopCountersForBoss('Pikachu', ['Electric'], 2);
    expect(limit2.length).toBe(2);
  });
  
  it('Counter types are correct for dual-type bosses', () => {
    const profile = getRaidBossProfile('Charizard', ['Fire', 'Flying']);
    const rock = profile.counterTypes.find(c => c.type === 'Rock');
    
    expect(rock).toBeDefined();
    expect(rock?.multiplier).toBe(2.56);
    expect(rock?.label).toContain('2.56');
    
    const water = profile.counterTypes.find(c => c.type === 'Water');
    expect(water).toBeDefined();
    expect(water?.multiplier).toBe(1.6);
  });
});
