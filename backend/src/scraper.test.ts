import { describe, it, expect } from 'vitest';
import {
  parseLeekDuckHtml,
  parseNianticNewsHtml,
  matchEventToArticle,
  matchSlugToTitle
} from './scraper';

describe('Backend Scraper Utilities & Parsers', () => {
  describe('parseLeekDuckHtml', () => {
    it('extracts official links, bonuses with correct icons, and pokemon lists from HTML', () => {
      const mockHtml = `
        <html>
          <body>
            <div class="event-info">
              <a href="https://pokemongolive.com/post/beldum-community-day-2026">Official Niantic Post</a>
              <div class="bonus-item">
                <img src="/assets/img/bonus/stardust.png" alt="2x Stardust" />
                <span class="bonus-text">2x Catch Stardust</span>
              </div>
              <div class="bonus-item">
                <img src="/assets/img/bonus/xp.png" alt="3x XP" />
                <span class="bonus-text">3x Catch XP</span>
              </div>
            </div>
            <h2>Wild Spawns</h2>
            <ul class="pkmn-list-flex">
              <li class="pkmn-list-item">
                <span class="pkmn-name">Beldum</span>
              </li>
            </ul>
          </body>
        </html>
      `;

      const result = parseLeekDuckHtml(mockHtml);

      expect(result.officialLink).toBe('https://pokemongolive.com/post/beldum-community-day-2026');
      expect(result.bonuses).toHaveLength(2);
      expect(result.bonuses?.[0].icon).toBe('✨');
      expect(result.bonuses?.[1].icon).toBe('⚡');
      expect(result.spawns?.map(s => s.name)).toContain('Beldum');
    });
  });

  describe('parseNianticNewsHtml', () => {
    it('parses news articles from both pokemongolive.com and pokemongo.com news listings', () => {
      const mockHtml = `
        <html>
          <body>
            <div class="news-list">
              <a href="/en/news/august-2026-content-update/">
                <h3>August 2026 Content Update</h3>
              </a>
              <a href="https://pokemongo.com/en/news/beldum-community-day/">
                <h3>Community Day: Beldum</h3>
              </a>
            </div>
          </body>
        </html>
      `;

      const articles = parseNianticNewsHtml(mockHtml);

      expect(articles).toHaveLength(2);
      expect(articles[0].href).toBe('https://pokemongolive.com/en/news/august-2026-content-update/');
      expect(articles[0].title).toBe('August 2026 Content Update');
      expect(articles[1].href).toBe('https://pokemongo.com/en/news/beldum-community-day/');
      expect(articles[1].title).toBe('Community Day: Beldum');
    });
  });

  describe('matchEventToArticle', () => {
    it('matches event names to official news article titles accurately', () => {
      expect(matchEventToArticle('Beldum Community Day', 'Community Day: Beldum')).toBe(true);
      expect(matchEventToArticle('Xerneas Raid Hour', 'Raid Hour featuring Xerneas')).toBe(true);
      expect(matchEventToArticle('Unrelated Event', 'Max Monday: Dynamax Squirtle')).toBe(false);
    });
  });

  describe('matchSlugToTitle', () => {
    it('matches event slugs to news URLs or article titles', () => {
      expect(matchSlugToTitle('beldum-community-day-2026', 'Community Day: Beldum', 'https://pokemongolive.com/en/news/beldum-community-day-2026')).toBe(true);
      expect(matchSlugToTitle('xerneas-raid-hour', 'Raid Hour: Xerneas', 'https://pokemongolive.com/en/news/xerneas-raid-hour')).toBe(true);
    });
  });
});
