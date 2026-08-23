export interface EventData {
  eventID: string;
  name: string;
  eventType: string;
  heading: string;
  link: string;
  image: string;
  start: string;
  end: string;
  extraData?: {
    raidbattles?: {
      bosses: {
        name: string;
        image: string;
        canBeShiny: boolean;
      }[];
    };
  };
}

export interface SpecialEventBonus {
  text: {
    cs: string;
    en: string;
  };
  icon: string;
}

export interface SpecialEventDebut {
  name: string;
  image: string;
  description: {
    cs: string;
    en: string;
  };
}

export interface SpecialEventSpawn {
  name: string;
  image: string;
  isShinyAvailable: boolean;
  isHighPriority: boolean;
  habitat?: {
    cs: string;
    en: string;
  };
}

export interface SpecialEventEgg {
  distance: string;
  contents: {
    name: string;
    image: string;
    isShinyAvailable: boolean;
  }[];
}

export interface SpecialEventResearch {
  task: {
    cs: string;
    en: string;
  };
  reward: string;
  image: string;
  isShinyAvailable: boolean;
}

export interface SpecialEventAttack {
  pokemonName: string;
  moveName: string;
  isEliteMove?: boolean;
  description?: {
    cs: string;
    en: string;
  };
}

export interface SpecialEventShowcase {
  pokemonName: string;
  pokemonImage?: string;
  description?: {
    cs: string;
    en: string;
  };
}

export interface SpecialEventPaidTicket {
  name?: {
    cs: string;
    en: string;
  };
  price?: string;
  bonuses?: SpecialEventBonus[];
}

export interface EventHighlights {
  pveTopPicks: string[];
  pvpTopPicks: string[];
  mustDoBonuses: string[];
  grindScore: 'S' | 'A' | 'B' | 'C';
}

export interface SpecialEventGoPass {
  ranks?: {
    rank: number;
    pointsRequired?: number;
    freeReward?: { name: string; image?: string };
    deluxeReward?: { name: string; image?: string };
  }[];
  milestones?: SpecialEventBonus[];
}

export interface SpecialEventDetails {
  eventID: string;
  officialLink?: string;
  bonuses?: SpecialEventBonus[];
  debuts?: SpecialEventDebut[];
  spawns?: SpecialEventSpawn[];
  eggs?: SpecialEventEgg[];
  research?: SpecialEventResearch[];
  raids?: {
    tier: string;
    list: {
      name: string;
      image: string;
      canBeShiny: boolean;
    }[];
  }[];
  featuredAttacks?: SpecialEventAttack[];
  showcases?: SpecialEventShowcase[];
  paidTicket?: SpecialEventPaidTicket;
  goPass?: SpecialEventGoPass;
  highlights?: EventHighlights;
  sourcesMerged?: string[];
}

export interface RaidCounters {
  bossName: string;
  weaknesses: string[];
  megaCounters: string[];
  advancedCounters: string[];
  budgetCounters: string[];
  minCp: number;
  maxCp: number;
  minBoostedCp: number;
  maxBoostedCp: number;
  weatherBoosts: string[];
  playersRecommended?: string;
  difficultyTier?: 'solo' | 'duo' | 'trio' | 'group' | 'hard-group';
  difficultyNotes?: { cs: string; en: string };
  pokebattlerUrl?: string;
}

export interface ScrapedRaidBoss {
  name: string;
  tier: '1' | '3' | '5' | 'mega' | 'shadow-1' | 'shadow-3' | 'shadow-5';
  image: string;
  canBeShiny: boolean;
  cpRange?: string;
  boostedCpRange?: string;
  weatherBoosts?: string[];
  types?: string[];
  counters?: RaidCounters | null;
  playersRecommended?: string;
  difficultyTier?: 'solo' | 'duo' | 'trio' | 'group' | 'hard-group';
  difficultyNotes?: { cs: string; en: string };
  pokebattlerUrl?: string;
}

export interface RocketMember {
  name: string;
  avatar: string;
  reward: {
    name: string;
    pveRating: 'S' | 'A' | 'B' | 'C' | 'None';
    pvpRating: 'S' | 'A' | 'B' | 'C' | 'None';
    worthGrinding: boolean;
    reason: string;
    hubRating: string;
  };
  lineup: {
    slot1: { name: string; types: string[]; image: string }[];
    slot2: { name: string; types: string[]; image: string }[];
    slot3: { name: string; types: string[]; image: string }[];
  };
  counters: {
    megaCounters: string[];
    advancedCounters: string[];
    budgetCounters: string[];
  };
}

export interface GruntData {
  phraseCs: string;
  phraseEn: string;
  type: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  worthFighting: boolean;
  shadowPokemon: string[];
  counters: string[];
}

export interface ScrapedDuckRaidItem {
  name: string;
  tier: string;
  canBeShiny: boolean;
  types?: { name: string; image?: string }[];
  combatPower?: {
    normal?: { min: number; max: number };
    boosted?: { min: number; max: number };
  };
  boostedWeather?: { name: string; image?: string }[];
  image: string;
}

export interface ScrapedDuckEggItem {
  name: string;
  eggType: string;
  isAdventureSync?: boolean;
  image: string;
  canBeShiny: boolean;
  combatPower?: { min: number; max: number };
  isRegional?: boolean;
  isGiftExchange?: boolean;
  rarity?: number;
}

export interface EnrichedEgg {
  name: string;
  image: string;
  canBeShiny: boolean;
  minCp?: number;
  maxCp?: number;
  rarity?: number;
  isAdventureSync?: boolean;
  isRegional?: boolean;
  isGiftExchange?: boolean;
}

export interface EnrichedEggGroup {
  distance: string;
  title: { cs: string; en: string };
  eggs: EnrichedEgg[];
}

export interface ScrapedDuckResearchItem {
  text: string;
  type?: string;
  rewards: {
    name: string;
    image: string;
    canBeShiny: boolean;
    combatPower?: { min: number; max: number };
    amount?: number;
  }[];
}

export interface EnrichedResearchTask {
  task: { cs: string; en: string };
  category: 'catch' | 'throw' | 'raid' | 'buddy' | 'power_up' | 'spin' | 'misc';
  rewards: {
    name: string;
    image: string;
    canBeShiny: boolean;
    minCp?: number;
    maxCp?: number;
    amount?: number;
  }[];
}

export interface ScrapedDuckRocketPokemon {
  name: string;
  image: string;
  types?: string[];
  isEncounter?: boolean;
  canBeShiny?: boolean;
}

export interface ScrapedDuckRocketItem {
  name: string;
  title: string;
  type: string;
  quote?: string;
  firstPokemon?: ScrapedDuckRocketPokemon[];
  secondPokemon?: ScrapedDuckRocketPokemon[];
  thirdPokemon?: ScrapedDuckRocketPokemon[];
}

