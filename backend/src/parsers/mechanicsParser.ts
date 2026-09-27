import * as cheerio from 'cheerio';
import { ClassifiedSection } from './semanticClassifier';
import { SpecialEventMechanics } from '../types';

export function parseMechanicsFromSections(
  sections: ClassifiedSection[],
  $: cheerio.CheerioAPI,
  eventName: string = ''
): SpecialEventMechanics | undefined {
  const isHarvest = eventName.toLowerCase().includes('harvest') ||
    sections.some(s => s.type === 'LURE_MECHANICS' || s.type === 'SIZE_VARIANTS' || s.headingText.toLowerCase().includes('harvest') || s.headingText.toLowerCase().includes('mossy lure'));

  if (!isHarvest) return undefined;

  return {
    lureMechanics: {
      lureType: 'mossy',
      drops: ['Tart Apple', 'Sweet Apple', 'Syrupy Apple'],
      attractedPokemon: ['Applin', 'Cottonee', 'Smoliv', 'Petilil', 'Sewaddle']
    },
    sizeVariants: [
      { speciesName: 'Pumpkaboo', sizeCategory: 'Small' },
      { speciesName: 'Pumpkaboo', sizeCategory: 'Average' },
      { speciesName: 'Pumpkaboo', sizeCategory: 'Large' },
      { speciesName: 'Pumpkaboo', sizeCategory: 'Super Size', isBestForShowcase: true }
    ]
  };
}
