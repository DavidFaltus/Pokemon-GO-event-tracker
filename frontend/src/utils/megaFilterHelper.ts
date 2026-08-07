import type { EventData } from '../components/EventCard';

export interface RecommendedMegaInfo {
  types: string[];
  megas: string[];
  filterString: string;
  reasonCs: string;
  reasonEn: string;
}

export function getRecommendedMegaForEvents(events: EventData[] = []): RecommendedMegaInfo {
  const combinedText = events.map(e => `${e.name} ${e.heading || ''} ${e.eventType}`).join(' ').toLowerCase();

  let types = ['dragon', 'ice'];
  let megas = ['Mega Rayquaza', 'Mega Garchomp', 'Mega Abomasnow'];
  let reasonCs = 'Bonus +1 Candy & XL Candy ze Dragon & Ice spawnů a raidů.';
  let reasonEn = '+1 Candy & XL Candy bonus from Dragon & Ice spawns and raids.';

  if (combinedText.includes('rocket') || combinedText.includes('shadow')) {
    types = ['dark', 'fighting'];
    megas = ['Mega Tyranitar', 'Mega Lucario', 'Mega Houndoom'];
    reasonCs = 'Bonus +1 Candy z Dark & Fighting Rakeťáků.';
    reasonEn = '+1 Candy bonus from Dark & Fighting Rocket grunts.';
  } else if (combinedText.includes('community') || combinedText.includes('spotlight')) {
    types = ['fire', 'flying', 'grass'];
    megas = ['Mega Charizard Y', 'Mega Sceptile', 'Mega Blaziken'];
    reasonCs = 'Bonus +1 Candy & XP z hlavních divokých spawnů události.';
    reasonEn = '+1 Candy & XP bonus from main wild event spawns.';
  } else if (combinedText.includes('palkia') || combinedText.includes('dialga') || combinedText.includes('rayquaza') || combinedText.includes('kyurem')) {
    types = ['dragon', 'fairy', 'steel'];
    megas = ['Mega Rayquaza', 'Mega Gardevoir', 'Mega Metagross', 'Mega Lucario'];
    reasonCs = 'Bonus +1 Candy & XL Candy z aktivních legendárních raidů.';
    reasonEn = '+1 Candy & XL Candy bonus from active legendary raids.';
  }

  const filterString = `megaevolve&${types.join(',')}`;

  return {
    types,
    megas,
    filterString,
    reasonCs,
    reasonEn
  };
}
