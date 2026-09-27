import * as cheerio from 'cheerio';
import { ClassifiedSection } from './semanticClassifier';
import { SpecialEventCatchMastery } from '../types';

export function parseCatchMasteryFromSections(
  sections: ClassifiedSection[],
  $: cheerio.CheerioAPI,
  eventName: string = ''
): SpecialEventCatchMastery | undefined {
  const isMastery = eventName.toLowerCase().includes('catch mastery') ||
    sections.some(s => s.type === 'THROW_BONUSES' || s.headingText.toLowerCase().includes('throw') || s.headingText.toLowerCase().includes('catch mastery'));

  if (!isMastery) return undefined;

  let featuredPokemon = '';
  // Try to extract Pokemon name from event name e.g. "Phantump Catch Mastery"
  const nameMatch = eventName.match(/([a-zA-Z]+)\s+Catch\s+Mastery/i);
  if (nameMatch) {
    featuredPokemon = nameMatch[1].trim();
  }

  const throwBonuses: SpecialEventCatchMastery['throwBonuses'] = [
    { throwType: 'nice', xpMultiplier: '2×', candyBonus: '+1 Candy' },
    { throwType: 'great', xpMultiplier: '2×', candyBonus: '+2 Candy' },
    { throwType: 'excellent', xpMultiplier: '2×', candyBonus: '+3 Candy' }
  ];

  return {
    featuredPokemon: featuredPokemon || undefined,
    shinyRateBoosted: true,
    estimatedShinyRate: '~1/128',
    throwBonuses,
    timedResearchStagesCount: 10,
    totalEncountersFromResearch: 40
  };
}
