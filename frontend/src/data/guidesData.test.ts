import { describe, it, expect } from 'vitest';
import { GUIDES_DATA } from './guidesData';
import { resolveImage } from '../utils/imageResolver';

describe('GUIDES_DATA editorial quality & LeekDuck image isolation', () => {
  it('contains at least 30 unique 4-language strategy guides with real human authorship and zero LeekDuck hotlinks', () => {
    expect(GUIDES_DATA.length).toBeGreaterThanOrEqual(30);

    const slugs = new Set<string>();
    for (const guide of GUIDES_DATA) {
      expect(slugs.has(guide.slug)).toBe(false);
      slugs.add(guide.slug);

      expect(guide.author).toBe('David Faltus');
      expect(guide.imageUrl).not.toContain('cdn.leekduck.com');
      expect(guide.sections.length).toBeGreaterThanOrEqual(3);

      for (const lang of ['cs', 'en', 'ja', 'ru'] as const) {
        expect((guide.title[lang] || '').trim().length).toBeGreaterThan(5);
        expect((guide.subtitle[lang] || '').trim().length).toBeGreaterThan(10);
        expect((guide.category[lang] || '').trim().length).toBeGreaterThan(2);
      }
    }
  });

  it('never leaks cdn.leekduck.com URLs through resolveImage', () => {
    const samples = [
      'https://cdn.leekduck.com/assets/img/events/article-images/2026/2026-09-08-season-24-twilight-trails/season-24-twilight-trails.jpg',
      'https://cdn.leekduck.com/assets/img/events/max-battles-kanto.jpg',
      'https://cdn.leekduck.com/assets/img/items/Rare%20Candy%20XL.png',
    ];
    for (const url of samples) {
      const resolved = resolveImage(url, 'event', 'Season 24 Twilight Trails');
      expect(resolved).not.toContain('cdn.leekduck.com');
    }
  });
});
