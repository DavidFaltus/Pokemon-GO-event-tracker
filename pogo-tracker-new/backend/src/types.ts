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

export interface SpecialEventDetails {
  eventID: string;
  bonuses?: {
    text: {
      cs: string;
      en: string;
    };
    icon: string;
  }[];
  debuts?: {
    name: string;
    image: string;
    description: {
      cs: string;
      en: string;
    };
  }[];
  spawns?: {
    name: string;
    image: string;
    isShinyAvailable: boolean;
    isHighPriority: boolean;
  }[];
  eggs?: {
    distance: string;
    contents: {
      name: string;
      image: string;
      isShinyAvailable: boolean;
    }[];
  }[];
  research?: {
    task: {
      cs: string;
      en: string;
    };
    reward: string;
    image: string;
    isShinyAvailable: boolean;
  }[];
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
  };
  lineup: {
    slot1: string[];
    slot2: string[];
    slot3: string[];
  };
  counters: {
    bossPokemon: string;
    bestCounters: string[];
    details: string;
  }[];
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
