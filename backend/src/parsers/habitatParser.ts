import * as cheerio from 'cheerio';
import { ClassifiedSection } from './semanticClassifier';
import { SpecialEventSpawn } from '../types';

export function isMetaRelevantPokemon(name: string): boolean {
  if (!name) return false;
  const lower = name.toLowerCase().replace(/✨/g, '').trim();
  const highPrioritySpecies = [
    'beldum', 'metang', 'metagross',
    'larvitar', 'pupitar', 'tyranitar',
    'bagon', 'shelgon', 'salamence',
    'gible', 'gabite', 'garchomp',
    'swinub', 'piloswine', 'mamoswine',
    'riolu', 'lucario',
    'frigibax', 'arctibax', 'baxcalibur',
    'ralts', 'kirlia', 'gardevoir', 'gallade',
    'machop', 'machoke', 'machamp',
    'mudkip', 'marshtomp', 'swampert',
    'dreepy', 'drakloak', 'dragapult',
    'jangmo-o', 'hakamo-o', 'kommo-o',
    'necrozma', 'rayquaza', 'groudon', 'kyogre',
    'dialga', 'palkia', 'reshiram', 'zekrom', 'terrakion', 'kartana',
    'skarmory', 'carbink', 'clodsire', 'wooper', 'feraligatr', 'totodile',
    'talonflame', 'fletchling', 'charizard', 'charmander', 'annihilape', 'mankey',
    'mandibuzz', 'vullaby', 'quagsire', 'altaria', 'swablu', 'marill', 'azumarill'
  ];
  return highPrioritySpecies.some(hp => lower.includes(hp));
}

export function translateHabitatName(habitat: string): { cs: string; en: string } {
  const hLower = habitat.toLowerCase().trim();
  let cs = habitat;

  if (hLower.includes('meadow') || hLower.includes('louk')) cs = 'Louka (Meadow)';
  else if (hLower.includes('mountain') || hLower.includes('hor')) cs = 'Hory (Mountain)';
  else if (hLower.includes('forest') || hLower.includes('les')) cs = 'Les (Forest)';
  else if (hLower.includes('ocean') || hLower.includes('water') || hLower.includes('vod') || hLower.includes('moř')) cs = 'Voda / Pláž (Water/Beach)';
  else if (hLower.includes('city') || hLower.includes('měst') || hLower.includes('urban')) cs = 'Město (City)';
  else if (hLower.includes('night') || hLower.includes('dark') || hLower.includes('temn')) cs = 'Temný les / Noc (Dark / Night)';
  else if (hLower.includes('desert') || hLower.includes('poušť') || hLower.includes('poust')) cs = 'Poušť (Desert)';
  else if (hLower.includes('snow') || hLower.includes('ice') || hLower.includes('sníh') || hLower.includes('led')) cs = 'Zasněžená krajina (Snow/Ice)';
  else if (hLower.includes('cave') || hLower.includes('jeskyn')) cs = 'Jeskyně (Cave)';
  else if (hLower.includes('volcano') || hLower.includes('sopk')) cs = 'Sopka (Volcanic)';

  return {
    cs,
    en: habitat.charAt(0).toUpperCase() + habitat.slice(1)
  };
}

/**
 * Extracts spawns from classified SPAWNS_HABITAT and SPAWNS_WILD sections.
 */
export function parseSpawnsFromSections(
  sections: ClassifiedSection[],
  $: cheerio.CheerioAPI
): SpecialEventSpawn[] {
  const spawns: SpecialEventSpawn[] = [];
  const seenKeys = new Set<string>();

  for (const section of sections) {
    if (section.type !== 'SPAWNS_HABITAT' && section.type !== 'SPAWNS_WILD') {
      continue;
    }

    const habitatName = section.metadata?.habitatName;
    const habitatLocalized = habitatName ? translateHabitatName(habitatName) : undefined;

    let ulList = section.elements.filter('ul.pkmn-list-flex, ul');
    if (!ulList.length) {
      ulList = section.elements.find('ul.pkmn-list-flex, ul');
    }

    ulList.find('.pkmn-list-item, li').each((_, item) => {
      const nameEl = $(item).find('.pkmn-name');
      const rawName = nameEl.length ? nameEl.text().trim() : $(item).text().trim();
      const img = $(item).find('img');
      const imgEl = $(item).find('.pkmn-list-img img').length ? $(item).find('.pkmn-list-img img') : img;
      const image = imgEl.attr('src') || '';
      const isShinyAvailable =
        $(item).find('.shiny-icon, .sparkle').length > 0 ||
        $(item).text().includes('✨') ||
        image.includes('shiny');

      const cleanName = rawName.replace(/✨/g, '').trim();

      if (
        cleanName &&
        cleanName.length < 50 &&
        !cleanName.toLowerCase().includes('pokémon') &&
        !cleanName.toLowerCase().includes('habitats')
      ) {
        const dedupeKey = `${cleanName.toLowerCase()}__${habitatLocalized?.en || 'wild'}`;
        if (!seenKeys.has(dedupeKey)) {
          seenKeys.add(dedupeKey);
          spawns.push({
            name: cleanName,
            image,
            isShinyAvailable,
            isHighPriority: isMetaRelevantPokemon(cleanName),
            habitat: habitatLocalized
          });
        }
      }
    });
  }

  return spawns;
}
