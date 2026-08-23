import * as cheerio from 'cheerio';
import { ClassifiedSection } from './semanticClassifier';
import { SpecialEventAttack } from '../types';

export const FEATURED_ATTACK_EVOLVE_REGEX =
  /evolve\s+([A-Za-z0-9\s'-]+?)\s+(?:during\s+the\s+event\s+)?to\s+get\s+(?:a|an)?\s*([A-Za-z0-9\s'-]+?)\s+that\s+knows\s+(?:the\s+)?(?:featured\s+|charged\s+|fast\s+)?(?:attack\s+)?([A-Za-z0-9\s'-]+?)(?:\.|$)/i;

export const FEATURED_ATTACK_KNOWS_REGEX =
  /([A-Za-z0-9\s'-]+?)\s+(?:caught\s+during\s+the\s+event\s+)?(?:will\s+know|knows)\s+(?:the\s+)?(?:featured\s+|charged\s+|fast\s+)?(?:attack\s+)?([A-Za-z0-9\s'-]+?)(?:\.|$)/i;

export function parseFeaturedAttacksFromSections(
  sections: ClassifiedSection[],
  $: cheerio.CheerioAPI,
  translateFn: (text: string) => string = (t) => t
): SpecialEventAttack[] {
  const attacks: SpecialEventAttack[] = [];
  const seenKeys = new Set<string>();

  for (const section of sections) {
    if (section.type !== 'FEATURED_ATTACKS') continue;

    const paragraphs: string[] = [];
    section.elements.filter('p, li').each((_, el) => {
      const text = $(el).text().trim();
      if (text) paragraphs.push(text);
    });

    if (paragraphs.length === 0) {
      const fullText = section.elements.text().trim();
      if (fullText) paragraphs.push(fullText);
    }

    for (const text of paragraphs) {
      const evolveMatch = text.match(FEATURED_ATTACK_EVOLVE_REGEX);
      const knowsMatch = text.match(FEATURED_ATTACK_KNOWS_REGEX);

      if (evolveMatch) {
        const finalPokemon = evolveMatch[2].trim();
        const move = evolveMatch[3].trim().replace(/\.$/, '');
        const key = `${finalPokemon.toLowerCase()}__${move.toLowerCase()}`;
        if (!seenKeys.has(key)) {
          seenKeys.add(key);
          attacks.push({
            pokemonName: finalPokemon,
            moveName: move,
            isEliteMove: true,
            description: {
              cs: translateFn(text),
              en: text
            }
          });
        }
      } else if (knowsMatch) {
        const finalPokemon = knowsMatch[1].trim();
        const move = knowsMatch[2].trim().replace(/\.$/, '');
        const key = `${finalPokemon.toLowerCase()}__${move.toLowerCase()}`;
        if (!seenKeys.has(key)) {
          seenKeys.add(key);
          attacks.push({
            pokemonName: finalPokemon,
            moveName: move,
            isEliteMove: true,
            description: {
              cs: translateFn(text),
              en: text
            }
          });
        }
      }
    }
  }

  return attacks;
}
