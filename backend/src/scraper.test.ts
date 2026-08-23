import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import {
  parseLeekDuckHtml,
  parseComplexEventHtml,
  generateEventHighlights,
  translateTextToCs,
  resolvePokemonAsset,
  parseNianticNewsHtml,
  matchEventToArticle,
  matchSlugToTitle,
  scrapeEggPool,
  scrapeFieldResearch,
  scrapeRaidBosses,
  scrapeRocketLineups
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

    it('parses complex event sections including featured attacks, habitats, showcases, and paid ticket bonuses', () => {
      const complexHtml = `
        <html>
          <body>
            <h2>Featured Attacks</h2>
            <p>Evolve Metang during the event to get a Metagross that knows the Charged Attack Meteor Mash.</p>
            <p>Evolve Shelgon to get a Salamence that knows Outrage.</p>

            <h2>Habitat: Meadow</h2>
            <ul class="pkmn-list-flex">
              <li class="pkmn-list-item">
                <span class="pkmn-name">Ralts</span>
              </li>
            </ul>

            <h2>Habitat: Mountain</h2>
            <ul class="pkmn-list-flex">
              <li class="pkmn-list-item">
                <span class="pkmn-name">Larvitar</span>
              </li>
            </ul>

            <h2>PokéStop Showcases</h2>
            <ul class="pkmn-list-flex">
              <li class="pkmn-list-item">
                <span class="pkmn-name">Beldum</span>
              </li>
            </ul>

            <div class="ticket-details">
              <h3>Event Ticket Exclusive Bonuses</h3>
              <div class="bonus-item">
                <span class="bonus-text">1/2 Hatch Distance with Incubators</span>
              </div>
            </div>
          </body>
        </html>
      `;

      const result = parseComplexEventHtml(complexHtml, 'test-complex-event');

      // 1. Verify Featured Attacks
      expect(result.featuredAttacks).toBeDefined();
      expect(result.featuredAttacks?.length).toBe(2);
      expect(result.featuredAttacks?.[0].pokemonName).toBe('Metagross');
      expect(result.featuredAttacks?.[0].moveName).toBe('Meteor Mash');
      expect(result.featuredAttacks?.[1].pokemonName).toBe('Salamence');
      expect(result.featuredAttacks?.[1].moveName).toBe('Outrage');

      // 2. Verify Habitats
      expect(result.spawns).toBeDefined();
      const ralts = result.spawns?.find(s => s.name === 'Ralts');
      const larvitar = result.spawns?.find(s => s.name === 'Larvitar');
      expect(ralts?.habitat?.en).toBe('Meadow');
      expect(larvitar?.habitat?.en).toBe('Mountain');

      // 3. Verify PokéStop Showcases
      expect(result.showcases).toBeDefined();
      expect(result.showcases?.some(s => s.pokemonName === 'Beldum')).toBe(true);

      // 4. Verify Paid Ticket Bonuses
      expect(result.paidTicket).toBeDefined();
      expect(result.paidTicket?.bonuses?.length).toBeGreaterThan(0);
      expect(result.paidTicket?.bonuses?.[0].icon).toBe('🥚');
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

  describe('generateEventHighlights', () => {
    it('analyzes event meta relevancy, bonuses and generates digest with top picks and grind score', () => {
      const mockDetails = {
        eventID: 'beldum-community-day',
        bonuses: [
          { text: { cs: '3x Hvězdný prach za chytání', en: '3x Catch Stardust' }, icon: '✨' },
          { text: { cs: 'Až 2 bezplatné Raid Passy denně', en: 'Up to 2 free Raid Passes daily' }, icon: '🎟️' }
        ],
        spawns: [
          { name: 'Beldum', image: 'url', isShinyAvailable: true, isHighPriority: true },
          { name: 'Pidgey', image: 'url', isShinyAvailable: true, isHighPriority: false }
        ],
        featuredAttacks: [
          {
            pokemonName: 'Metagross',
            moveName: 'Meteor Mash',
            isEliteMove: true
          }
        ]
      };

      const highlights = generateEventHighlights(mockDetails, 'Beldum Community Day');

      expect(highlights).toBeDefined();
      expect(highlights.pveTopPicks.length).toBeGreaterThan(0);
      expect(highlights.pveTopPicks.some(p => p.includes('Beldum') || p.includes('Metagross'))).toBe(true);
      expect(highlights.mustDoBonuses.length).toBeGreaterThan(0);
      expect(highlights.mustDoBonuses.some(b => b.includes('Stardust') || b.includes('prach'))).toBe(true);
      expect(highlights.grindScore).toBe('S');
    });
  });

  describe('translateTextToCs', () => {
    it('accurately translates complex Pokémon GO game mechanics, research tasks, and habitats to Czech', () => {
      expect(translateTextToCs('Spin 10 PokéStops')).toBe('Protoč 10 Pokéstopů');
      expect(translateTextToCs('Win 3 Raids')).toBe('Vyhraj 3 Raidy');
      expect(translateTextToCs('Catch 15 Pokémon')).toBe('Chyť 15 Pokémonů');
      expect(translateTextToCs('Meadow')).toContain('Louka');
      expect(translateTextToCs('PokéStop Showcases')).toContain('PokéStop');
    });
  });

  describe('resolvePokemonAsset', () => {
    it('generates accurate sprite URLs for standard, shiny, regional, and mega forms', () => {
      expect(resolvePokemonAsset('Beldum')).toBe('https://img.pokemondb.net/sprites/home/normal/beldum.png');
      expect(resolvePokemonAsset('Beldum', true)).toBe('https://img.pokemondb.net/sprites/home/shiny/beldum.png');
      expect(resolvePokemonAsset('Alolan Raichu')).toBe('https://img.pokemondb.net/sprites/home/normal/raichu-alolan.png');
      expect(resolvePokemonAsset('Hisuian Growlithe')).toBe('https://img.pokemondb.net/sprites/home/normal/growlithe-hisuian.png');
      expect(resolvePokemonAsset('Mega Gengar')).toBe('https://img.pokemondb.net/sprites/home/normal/gengar-mega.png');
      expect(resolvePokemonAsset('Shadow Metagross')).toBe('https://img.pokemondb.net/sprites/home/normal/metagross.png');
    });
  });

  describe('Modular Sub-Parsers & Classifiers', () => {
    it('parses GO Pass battle pass container with ranks and point pills', () => {
      const goPassHtml = `
        <div class="battle-pass-container">
          <h2 id="go-pass">GO Pass: Flying Taxi</h2>
          <div class="rank-item">
            <span class="rank-num">Rank 1</span>
            <span class="bp-points-pill">100 PTS</span>
            <div class="basic-track"><span class="reward-name">Poké Ball x20</span></div>
            <div class="deluxe-track"><span class="reward-name">Super Incubator</span></div>
          </div>
          <div class="rank-item">
            <span class="rank-num">Rank 100</span>
            <span class="bp-points-pill">10000 PTS</span>
            <div class="basic-track"><span class="reward-name">Lugia Encounter</span></div>
            <div class="deluxe-track"><span class="reward-name">Shiny Lugia Encounter</span></div>
          </div>
          <p>Deluxe Pass includes a Timed Incubator with unlimited uses</p>
        </div>
      `;

      const parsed = parseComplexEventHtml(goPassHtml, 'go-pass-test');
      expect(parsed.goPass).toBeDefined();
      expect(parsed.goPass?.ranks).toHaveLength(2);
      expect(parsed.goPass?.ranks?.[0].rank).toBe(1);
      expect(parsed.goPass?.ranks?.[0].pointsRequired).toBe(100);
      expect(parsed.goPass?.ranks?.[0].freeReward?.name).toBe('Poké Ball x20');
      expect(parsed.goPass?.ranks?.[1].rank).toBe(100);
      expect(parsed.goPass?.milestones?.some(m => m.text.en.includes('Timed Incubator'))).toBe(true);
    });

    it('parses Team GO Rocket mechanics such as Frustration removal and balloon schedules', () => {
      const rocketHtml = `
        <h2>Team GO Rocket Takeover</h2>
        <p>You can use a Charged TM to help a Shadow Pokémon forget the Charged Attack Frustration.</p>
        <p>Team GO Rocket balloons will appear every 2 hours.</p>
        <p>Defeat Giovanni to rescue Shadow Reshiram!</p>
      `;

      const parsed = parseComplexEventHtml(rocketHtml, 'rocket-takeover-test');
      expect(parsed.bonuses).toBeDefined();
      expect(parsed.bonuses?.some(b => b.icon === '🟣')).toBe(true);
      expect(parsed.bonuses?.some(b => b.icon === '🎈')).toBe(true);
      expect(parsed.debuts?.some(d => d.name === 'Shadow Reshiram')).toBe(true);
    });
  });

  describe('ScrapedDuck Live Data Feed Integration', () => {
    it('scrapeEggPool fetches, enriches, and caches live egg pools', async () => {
      const mockRawEggs = [
        {
          name: 'Pichu',
          eggType: '2 km',
          canBeShiny: true,
          combatPower: { min: 240, max: 270 }
        }
      ];

      vi.spyOn(axios, 'get').mockResolvedValueOnce({ status: 200, data: mockRawEggs });

      const eggs = await scrapeEggPool();
      expect(eggs.length).toBeGreaterThan(0);
      expect(eggs[0].distance).toBe('2 km');
      expect(eggs[0].eggs[0].name).toBe('Pichu');
    });

    it('scrapeFieldResearch fetches, enriches, and categorizes live research tasks', async () => {
      const mockRawResearch = [
        {
          text: '<span>Catch 5 Grass-type Pokémon</span>',
          type: 'catch',
          rewards: [
            { name: 'Bulbasaur', canBeShiny: true }
          ]
        }
      ];

      vi.spyOn(axios, 'get').mockResolvedValueOnce({ status: 200, data: mockRawResearch });

      const tasks = await scrapeFieldResearch();
      expect(tasks.length).toBeGreaterThan(0);
      expect(tasks[0].task.en).toBe('Catch 5 Grass-type Pokémon');
      expect(tasks[0].task.cs).toContain('Chyť');
      expect(tasks[0].category).toBe('catch');
    });

    it('scrapeRaidBosses prioritizes ScrapedDuck feed before fallback to HTML scrapers', async () => {
      const mockRawRaids = [
        {
          name: 'Rayquaza',
          tier: '5-Star Raids',
          canBeShiny: true,
          types: [{ name: 'dragon' }, { name: 'flying' }],
          combatPower: { normal: { min: 2100, max: 2191 } }
        },
        { name: 'Dialga', tier: '5-Star Raids', canBeShiny: true },
        { name: 'Palkia', tier: '5-Star Raids', canBeShiny: true },
        { name: 'Giratina', tier: '5-Star Raids', canBeShiny: true },
        { name: 'Mega Charizard Y', tier: 'Mega Raids', canBeShiny: true }
      ];

      vi.spyOn(axios, 'get').mockResolvedValueOnce({ status: 200, data: mockRawRaids });

      const bosses = await scrapeRaidBosses();
      expect(bosses.length).toBeGreaterThanOrEqual(5);
      expect(bosses.some(b => b.name === 'Rayquaza' && b.tier === '5')).toBe(true);
    });
  });
});

