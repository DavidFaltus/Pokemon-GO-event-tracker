export interface LineupPokemon {
  name: string;
  types: string[];
  image: string;
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
    slot1: LineupPokemon[];
    slot2: LineupPokemon[];
    slot3: LineupPokemon[];
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
