import { useState, useEffect } from 'react';
import type { SpecialEventDetails } from '../data/specialEvents';
import { findPokemonMeta } from '../data/pokemonMeta';

function isMetaRelevant(pokemonName: string): boolean {
  if (!pokemonName) return false;
  const meta = findPokemonMeta(pokemonName);
  if (!meta) return false;
  return (meta.pveRating === 'S' || meta.pveRating === 'A' || meta.pvpRating === 'S' || meta.pvpRating === 'A');
}

function translateTextToCs(text: string): string {
  let translated = text;
  // Common replacements
  const dict: Record<string, string> = {
    "1/2 Hatch Distance": "1/2 vzdálenost na líhnutí vajec",
    "1/4 Hatch Distance": "1/4 vzdálenost na líhnutí vajec",
    "2x Catch Candy": "2× bonbóny (Candy) za chytání",
    "2x Catch XP": "2× zkušenosti (XP) za chytání",
    "3x Catch XP": "3× zkušenosti (XP) za chytání",
    "2x Catch Stardust": "2× Stardust za chycení",
    "3x Catch Stardust": "3× Stardust za chycení",
    "2x Transfer Candy": "2× Candy za posílání (Transfer)",
    "2x Evolution XP": "2× XP za evoluci",
    "Increased Spawns": "Zvýšený výskyt pokémonů",
    "Increased Shiny rate": "Zvýšená šance na Shiny Pokémony",
    "Increased chance of encountering Shiny": "Zvýšená šance na setkání se Shiny",
    "Up to 9 free Raid Passes": "Až 9 bezplatných Raid Passů",
    "Up to 6 free Raid Passes": "Až 6 bezplatných Raid Passů",
    "Remote Raid Pass limit increased to 20": "Limit na Remote Raidy navýšen na 20",
    "Remove Frustration with a Charged TM": "Lze odebrat útok Frustration pomocí Charged TM",
    "Team GO Rocket will appear more frequently at PokéStops and in balloons": "Team GO Rocket se objevuje častěji u Pokéstopů a v balónech",
    "Team GO Rocket Balloons are expected to appear every 2 hours": "Baloony Team GO Rocket se objevují každé 2 hodiny",
    "Trades made will require 50% less Stardust": "O 50 % méně Stardustu za tradování",
    "One additional Special Trade": "1 dodatečný Special Trade",
    "3-hour Incense": "Incense trvá 3 hodiny",
    "3-hour Lure": "Lure moduly trvají 3 hodiny",
    "1-hour Lures": "Lure moduly trvají 1 hodinu",
    "5x surprise encounters from snapshots": "5× překvapení z Snapshotu",
    "Wild Encounters": "Výskyt v divočině",
    "Wild Spawns": "Výskyt v divočině",
    "Field Research Tasks": "Úkoly v terénním výzkumu",
    "Event Bonuses": "Eventové bonusy",
    "Shiny Family": "Shiny rodina",
    "Exclusive Move": "Exkluzivní útok",
    "Special Research": "Speciální výzkum",
    "Raid Battles": "Raidové souboje",
    "Raid Rotation": "Raidová rotace",
    "Active Bonus": "Aktivní bonus"
  };

  // Replace substrings
  for (const [key, value] of Object.entries(dict)) {
    const regex = new RegExp(key, 'gi');
    translated = translated.replace(regex, value);
  }

  return translated;
}

export function useDynamicEventDetails(eventID: string, link: string, isExpanded: boolean) {
  const [details, setDetails] = useState<SpecialEventDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isExpanded) return;

    // 1. Check local storage cache
    const cacheKey = `pogo_scraped_details_${eventID}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        setDetails(JSON.parse(cached));
        return;
      } catch (e) {
        console.error("Failed to parse cached details", e);
      }
    }

    // 2. Fetch from Leek Duck
    const fetchAndParse = async () => {
      setLoading(true);
      setError(null);

      try {
        let htmlText = '';
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(link)}`;
        const res = await fetch(proxyUrl);
        if (!res.ok) throw new Error("CORS proxy request failed");
        htmlText = await res.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');

        const bonuses: any[] = [];
        const debuts: any[] = [];
        const spawns: any[] = [];
        const eggs: any[] = [];
        const research: any[] = [];

        // Parse Bonuses
        doc.querySelectorAll('.bonus-item').forEach(item => {
          const textEl = item.querySelector('.bonus-text');
          const text = textEl ? textEl.textContent?.trim() : item.textContent?.trim();
          if (!text) return;

          const img = item.querySelector('img');
          const imgSrc = img ? img.getAttribute('src') : null;
          const imgAlt = img ? img.getAttribute('alt') : '';

          let icon = '🎁';
          if (imgSrc) {
            if (imgSrc.includes('candy')) icon = '🍬';
            else if (imgSrc.includes('stardust')) icon = '✨';
            else if (imgSrc.includes('egg') || imgSrc.includes('hatch')) icon = '🥚';
            else if (imgSrc.includes('xp') || imgSrc.includes('experience')) icon = '⚡';
            else if (imgSrc.includes('raid') || imgSrc.includes('pass')) icon = '🎟️';
            else if (imgSrc.includes('rocket')) icon = '🎈';
            else if (imgSrc.includes('trade')) icon = '🤝';
            else if (imgSrc.includes('tm') || imgSrc.includes('charge')) icon = '🟣';
          } else if (imgAlt) {
            const altLower = imgAlt.toLowerCase();
            if (altLower.includes('candy')) icon = '🍬';
            else if (altLower.includes('stardust')) icon = '✨';
            else if (altLower.includes('hatch') || altLower.includes('egg')) icon = '🥚';
            else if (altLower.includes('xp') || altLower.includes('experience')) icon = '⚡';
            else if (altLower.includes('raid') || altLower.includes('pass')) icon = '🎟️';
            else if (altLower.includes('rocket')) icon = '🎈';
            else if (altLower.includes('trade')) icon = '🤝';
          }

          bonuses.push({
            text: {
              cs: translateTextToCs(text),
              en: text
            },
            icon
          });
        });

        // Parse sections with headers
        doc.querySelectorAll('h2, h3').forEach(heading => {
          const title = heading.textContent?.toLowerCase() || '';
          let sibling = heading.nextElementSibling;
          let description = '';

          while (sibling && sibling.tagName !== 'UL' && !sibling.tagName.startsWith('H')) {
            if (sibling.tagName === 'P') {
              description += sibling.textContent?.trim() + ' ';
            }
            sibling = sibling.nextElementSibling;
          }

          if (sibling && sibling.tagName === 'UL' && sibling.classList.contains('pkmn-list-flex')) {
            const contents: any[] = [];
            sibling.querySelectorAll('.pkmn-list-item').forEach(item => {
              const name = item.querySelector('.pkmn-name')?.textContent?.trim();
              const img = item.querySelector('img');
              const imgEl = item.querySelector('.pkmn-list-img img') || img;
              const image = imgEl ? imgEl.getAttribute('src') || '' : '';
              const isShinyAvailable = !!item.querySelector('.shiny-icon');

              if (name) {
                contents.push({ name, image, isShinyAvailable });
              }
            });

            if (contents.length > 0) {
              if (title.includes('debut') || title.includes('new shiny') || title.includes('save shadow') || title.includes('featured')) {
                contents.forEach(c => {
                  debuts.push({
                    name: c.name,
                    image: c.image,
                    description: {
                      cs: translateTextToCs(description.trim() || `${c.name} debutuje v Pokémon GO!`),
                      en: description.trim() || `${c.name} debuts in Pokémon GO!`
                    }
                  });
                });
              } else if (title.includes('egg') || title.includes('hatch')) {
                let distance = '7km';
                const distMatch = title.match(/(\d+)\s*km/);
                if (distMatch) {
                  distance = distMatch[0];
                }
                eggs.push({
                  distance,
                  contents
                });
              } else if (title.includes('spawn') || title.includes('encounter') || title.includes('wild')) {
                contents.forEach(c => {
                  spawns.push({
                    name: c.name,
                    image: c.image,
                    isShinyAvailable: c.isShinyAvailable,
                    isHighPriority: isMetaRelevant(c.name)
                  });
                });
              }
            }
          }
        });

        // Parse Field Research
        doc.querySelectorAll('.event-field-research-list li').forEach(li => {
          const taskEl = li.querySelector('.task');
          const taskText = taskEl ? taskEl.textContent?.replace(/\s+/g, ' ').trim() : '???';

          const rewardEl = li.querySelector('.reward-label') || li.querySelector('.reward');
          const rewardText = rewardEl ? rewardEl.textContent?.replace(/\s+/g, ' ').trim() : '';

          const img = li.querySelector('.reward-image') || li.querySelector('img');
          const image = img ? img.getAttribute('src') || '' : '';
          const isShinyAvailable = !!li.querySelector('.shiny-icon');

          if (rewardText) {
            research.push({
              task: {
                cs: translateTextToCs(taskText),
                en: taskText
              },
              reward: rewardText,
              image,
              isShinyAvailable
            });
          }
        });

        // If we found any details, compile and save them
        if (bonuses.length > 0 || debuts.length > 0 || spawns.length > 0 || eggs.length > 0 || research.length > 0) {
          const parsedDetails: SpecialEventDetails = {
            eventID,
            bonuses: bonuses.length > 0 ? bonuses : undefined,
            debuts: debuts.length > 0 ? debuts : undefined,
            spawns: spawns.length > 0 ? spawns : undefined,
            eggs: eggs.length > 0 ? eggs : undefined,
            research: research.length > 0 ? research : undefined
          };

          localStorage.setItem(cacheKey, JSON.stringify(parsedDetails));
          setDetails(parsedDetails);
        } else {
          setDetails(null);
        }
      } catch (err) {
        console.error("Failed to dynamically scrape details:", err);
        setError("Failed to fetch event details");
      } finally {
        setLoading(false);
      }
    };

    fetchAndParse();
  }, [eventID, link, isExpanded]);

  return { details, loading, error };
}
