import { describe, it, expect } from 'vitest';
import { normalizePokemonName, resolvePokemonSprite, getSpriteSrcSet } from './spriteResolver';

describe('spriteResolver', () => {
  describe('normalizePokemonName', () => {
    it('normalizes Alolan Vulpix', () => {
      const res = normalizePokemonName('Alolan Vulpix');
      expect(res).toEqual({ baseName: 'vulpix', form: 'alolan', isShadow: false, isShiny: false });
    });

    it('normalizes Shadow Mewtwo', () => {
      const res = normalizePokemonName('Shadow Mewtwo');
      expect(res).toEqual({ baseName: 'mewtwo', form: null, isShadow: true, isShiny: false });
    });

    it('normalizes Mega Charizard X', () => {
      const res = normalizePokemonName('Mega Charizard X');
      expect(res).toEqual({ baseName: 'charizard', form: 'mega-x', isShadow: false, isShiny: false });
    });

    it('normalizes Shiny Hisuian Growlithe', () => {
      const res = normalizePokemonName('Shiny Hisuian Growlithe');
      expect(res).toEqual({ baseName: 'growlithe', form: 'hisuian', isShadow: false, isShiny: true });
    });
  });

  describe('resolvePokemonSprite', () => {
    it('returns descriptor for Necrozma', () => {
      const res = resolvePokemonSprite('Necrozma');
      expect(res.canonicalName).toBe('necrozma');
      expect(res.isShiny).toBe(false);
      expect(res.primaryUrl).toContain('pm800'); // Necrozma is 800
      expect(res.fallbackUrls.length).toBeGreaterThan(0);
      expect(res.fallbackUrls[res.fallbackUrls.length - 1]).toContain('poke-ball.png');
    });

    it('returns shiny URLs for shiny option', () => {
      const res = resolvePokemonSprite('Necrozma', { shiny: true });
      expect(res.isShiny).toBe(true);
      expect(res.primaryUrl).toContain('pm800.s.icon.png');
      expect(res.fallbackUrls.some(u => u.includes('shiny/necrozma.png'))).toBe(true);
    });

    it('detects alolan form in URLs', () => {
      const res = resolvePokemonSprite('Alolan Raichu');
      expect(res.detectedForm).toBe('alolan');
      // For special forms, primary is official-artwork 10100 and fallback is PokemonDB raichu-alola
      expect(res.primaryUrl).toContain('10100.png');
      expect(res.fallbackUrls.some(u => u.includes('raichu-alola.png'))).toBe(true);
    });

    it('generates mega form URLs', () => {
      const res = resolvePokemonSprite('Mega Gengar');
      expect(res.detectedForm).toBe('mega');
      expect(res.primaryUrl).toContain('10038.png');
      expect(res.fallbackUrls.some(u => u.includes('gengar-mega.png'))).toBe(true);
    });

    it('correctly resolves Dusk Mane and Dawn Wings Necrozma artworks', () => {
      const duskMane = resolvePokemonSprite('Dusk Mane Necrozma');
      const dawnWings = resolvePokemonSprite('Dawn Wings Necrozma');

      expect(duskMane.primaryUrl).toContain('10155.png');
      expect(duskMane.fallbackUrls.some(u => u.includes('necrozma-dusk-mane.png'))).toBe(true);

      expect(dawnWings.primaryUrl).toContain('10156.png');
      expect(dawnWings.fallbackUrls.some(u => u.includes('necrozma-dawn-wings.png'))).toBe(true);
    });

    it('correctly resolves Primal Kyogre and Primal Groudon without swapped IDs', () => {
      const primalKyogre = resolvePokemonSprite('Primal Kyogre');
      const primalGroudon = resolvePokemonSprite('Primal Groudon');

      expect(primalKyogre.primaryUrl).toContain('10077.png');
      expect(primalKyogre.fallbackUrls.some(u => u.includes('kyogre-primal.png'))).toBe(true);

      expect(primalGroudon.primaryUrl).toContain('10078.png');
      expect(primalGroudon.fallbackUrls.some(u => u.includes('groudon-primal.png'))).toBe(true);
    });

    it('ensures fallback URLs end with pokeball', () => {
      const res = resolvePokemonSprite('Pikachu');
      const lastFallback = res.fallbackUrls[res.fallbackUrls.length - 1];
      expect(lastFallback).toContain('poke-ball.png');
    });
  });

  describe('getSpriteSrcSet', () => {
    it('returns valid srcset string', () => {
      const res = getSpriteSrcSet('Pikachu');
      expect(res).toContain('1x');
      expect(res).toContain('2x');
    });
  });
});
