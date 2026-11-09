import { describe, it, expect } from 'vitest';
import {
  escapeXml,
  formatIsoDate,
  buildSitemapAlternates,
  renderSitemapIndexXml,
  getSitemapIndexXml,
  getCoreSitemapXml,
  getPokedexSitemapXml,
  getRaidsRocketSitemapXml,
  getGuidesSitemapXml,
  getEventsSitemapXml,
} from './sitemapGenerator';

describe('sitemapGenerator', () => {
  it('escapes XML special characters correctly', () => {
    expect(escapeXml('Pikachu & Raichu <test> "quotes" \'apostrophe\'')).toBe(
      'Pikachu &amp; Raichu &lt;test&gt; &quot;quotes&quot; &apos;apostrophe&apos;'
    );
  });

  it('generates a valid XML Sitemap Index referencing all 5 sub-sitemaps', () => {
    const xml = getSitemapIndexXml(new Date('2026-11-01T12:00:00Z'));
    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(xml).toContain('<loc>https://pogoevents.app/sitemap-core.xml</loc>');
    expect(xml).toContain('<loc>https://pogoevents.app/sitemap-pokedex.xml</loc>');
    expect(xml).toContain('<loc>https://pogoevents.app/sitemap-guides.xml</loc>');
    expect(xml).toContain('<loc>https://pogoevents.app/sitemap-events.xml</loc>');
    expect(xml).toContain('<loc>https://pogoevents.app/sitemap-raids-rocket.xml</loc>');
    expect(xml).toContain('<lastmod>2026-11-01T12:00:00.000Z</lastmod>');
  });

  it('generates core sitemap with hreflang for all supported languages and x-default', () => {
    const xml = getCoreSitemapXml(new Date('2026-11-01T12:00:00.000Z'));
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">');
    expect(xml).toContain('<loc>https://pogoevents.app/cs</loc>');
    expect(xml).toContain('<loc>https://pogoevents.app/en</loc>');
    expect(xml).toContain('<loc>https://pogoevents.app/ja</loc>');
    expect(xml).toContain('<loc>https://pogoevents.app/ru</loc>');
    expect(xml).toContain('<xhtml:link rel="alternate" hreflang="cs" href="https://pogoevents.app/cs"/>');
    expect(xml).toContain('<xhtml:link rel="alternate" hreflang="en" href="https://pogoevents.app/en"/>');
    expect(xml).toContain('<xhtml:link rel="alternate" hreflang="x-default" href="https://pogoevents.app/en"/>');
  });

  it('generates curated pokedex sitemap containing top meta released pokemon and excluding unreleased entries', () => {
    const xml = getPokedexSitemapXml(new Date('2026-11-01T12:00:00.000Z'));
    expect(xml).toContain('<loc>https://pogoevents.app/cs/pokedex/venusaur</loc>');
    expect(xml).toContain('<loc>https://pogoevents.app/en/pokedex/venusaur</loc>');
    expect(xml).toContain('<loc>https://pogoevents.app/ja/pokedex/venusaur</loc>');
    expect(xml).toContain('<loc>https://pogoevents.app/ru/pokedex/venusaur</loc>');
    expect(xml).toContain('<xhtml:link rel="alternate" hreflang="cs" href="https://pogoevents.app/cs/pokedex/venusaur"/>');
    expect(xml).toContain('<xhtml:link rel="alternate" hreflang="x-default" href="https://pogoevents.app/en/pokedex/venusaur"/>');
    expect(xml).not.toContain('<loc>https://pogoevents.app/cs/pokedex/pecharunt</loc>');
  });

  it('generates raids and rocket sitemap with ranking categories, type matchups, and rocket leaders', () => {
    const xml = getRaidsRocketSitemapXml(new Date('2026-11-01T12:00:00.000Z'));
    expect(xml).toContain('rankings/great-league');
    expect(xml).toContain('types/fire');
    expect(xml).toContain('rocket/giovanni');
    expect(xml).toContain('raids/');
  });

  it('generates guides sitemap with valid entries', async () => {
    const xml = await getGuidesSitemapXml(new Date('2026-11-01T12:00:00.000Z'));
    expect(xml).toContain('/guides/');
    expect(xml).toContain('<urlset');
  });

  it('generates events sitemap structure', async () => {
    const xml = await getEventsSitemapXml(new Date('2026-11-01T12:00:00.000Z'));
    expect(xml).toContain('<urlset');
  });
});
