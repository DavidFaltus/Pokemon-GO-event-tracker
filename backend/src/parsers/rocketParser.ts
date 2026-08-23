import * as cheerio from 'cheerio';
import { ClassifiedSection } from './semanticClassifier';
import { SpecialEventBonus, SpecialEventDebut } from '../types';

export const ROCKET_FRUSTRATION_REGEX =
  /(?:charged\s+tm|tm).*(?:forget|remove|replace)\s+(?:the\s+charged\s+attack\s+)?frustration/i;

export const ROCKET_BALLOON_REGEX =
  /(?:balloon|balón).*(?:appear\s+every|každé)\s*(\d+)\s*(?:hour|hodin)/i;

export function parseRocketMechanicsFromSections(
  sections: ClassifiedSection[],
  $: cheerio.CheerioAPI,
  translateFn: (text: string) => string = (t) => t
): { bonuses: SpecialEventBonus[]; shadowDebuts: SpecialEventDebut[] } {
  const bonuses: SpecialEventBonus[] = [];
  const shadowDebuts: SpecialEventDebut[] = [];
  const seenTexts = new Set<string>();

  for (const section of sections) {
    const allTextElements: string[] = [];
    const allTextEls = section.elements.filter('p, li, .bonus-text').add(section.elements.find('p, li, .bonus-text'));
    allTextEls.each((_, el) => {
      const t = $(el).text().trim();
      if (t) allTextElements.push(t);
    });

    for (const text of allTextElements) {
      if (ROCKET_FRUSTRATION_REGEX.test(text)) {
        const key = 'frustration_removal';
        if (!seenTexts.has(key)) {
          seenTexts.add(key);
          bonuses.push({
            text: {
              cs: 'Lze použít Charged TM k zapomenutí útočného útoku Frustration u Shadow Pokémonů',
              en: text
            },
            icon: '🟣'
          });
        }
      }

      if (ROCKET_BALLOON_REGEX.test(text)) {
        const key = 'balloon_frequency';
        if (!seenTexts.has(key)) {
          seenTexts.add(key);
          bonuses.push({
            text: {
              cs: translateFn(text),
              en: text
            },
            icon: '🎈'
          });
        }
      }

      if (text.toLowerCase().includes('shadow') && (text.toLowerCase().includes('debut') || text.toLowerCase().includes('rescue') || text.toLowerCase().includes('giovanni'))) {
        const shadowMatch = text.match(/Shadow\s+([A-Za-z0-9'-]+)/i);
        if (shadowMatch) {
          const shadowName = `Shadow ${shadowMatch[1]}`;
          if (!seenTexts.has(shadowName.toLowerCase())) {
            seenTexts.add(shadowName.toLowerCase());
            shadowDebuts.push({
              name: shadowName,
              image: '',
              description: {
                cs: translateFn(text),
                en: text
              }
            });
          }
        }
      }
    }
  }

  return { bonuses, shadowDebuts };
}
