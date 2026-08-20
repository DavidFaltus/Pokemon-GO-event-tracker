export interface MoveData {
  name: string;
  type: string;
}

export interface PokemonRankData {
  name: string;
  pokedexId: number;
  slug?: string;
  types: string[];
  attack: number;
  defense: number;
  stamina: number;
  maxCp: number;
  maxCp40?: number;
  cpRaid100?: number;
  cpWeather100?: number;
  cpResearch100?: number;
  pveScore: number;
  dps: number;
  bestFastMove: MoveData;
  bestChargedMove: MoveData;
  isShadow?: boolean;
  isMega?: boolean;
  isPrimal?: boolean;
  generation?: number;
}

export const pokemonRankings: PokemonRankData[] = [
  {
    "name": "Dawn Wings Necrozma",
    "pokedexId": 800,
    "types": [
      "Psychic",
      "Ghost"
    ],
    "attack": 277,
    "defense": 198,
    "stamina": 201,
    "maxCp": 4683,
    "pveScore": 85,
    "dps": 47.47,
    "bestFastMove": {
      "name": "Shadow Claw",
      "type": "Ghost"
    },
    "bestChargedMove": {
      "name": "Moongeist Beam",
      "type": "Ghost"
    },
    "isShadow": false,
    "isMega": false,
    "isPrimal": false,
    "generation": 7
  },
  {
    "name": "Mega Gengar",
    "pokedexId": 94,
    "types": [
      "Ghost",
      "Poison"
    ],
    "attack": 349,
    "defense": 199,
    "stamina": 155,
    "maxCp": 4902,
    "pveScore": 76,
    "dps": 45.28,
    "bestFastMove": {
      "name": "Shadow Claw",
      "type": "Ghost"
    },
    "bestChargedMove": {
      "name": "Shadow Ball",
      "type": "Ghost"
    },
    "isShadow": false,
    "isMega": true,
    "isPrimal": false,
    "generation": 1
  },
  {
    "name": "Mega Banette",
    "pokedexId": 354,
    "types": [
      "Ghost"
    ],
    "attack": 312,
    "defense": 160,
    "stamina": 162,
    "maxCp": 4434,
    "pveScore": 65,
    "dps": 40.48,
    "bestFastMove": {
      "name": "Shadow Claw",
      "type": "Ghost"
    },
    "bestChargedMove": {
      "name": "Shadow Ball",
      "type": "Ghost"
    },
    "isShadow": false,
    "isMega": true,
    "isPrimal": false,
    "generation": 3
  },
  {
    "name": "Shadow Chandelure",
    "pokedexId": 609,
    "types": [
      "Ghost",
      "Fire"
    ],
    "attack": 271,
    "defense": 182,
    "stamina": 155,
    "maxCp": 3695,
    "pveScore": 61,
    "dps": 38.89,
    "bestFastMove": {
      "name": "Hex",
      "type": "Ghost"
    },
    "bestChargedMove": {
      "name": "Shadow Ball",
      "type": "Ghost"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 5
  },
  {
    "name": "Shadow Gengar",
    "pokedexId": 94,
    "types": [
      "Ghost",
      "Poison"
    ],
    "attack": 261,
    "defense": 149,
    "stamina": 155,
    "maxCp": 3254,
    "pveScore": 61,
    "dps": 40.61,
    "bestFastMove": {
      "name": "Shadow Claw",
      "type": "Ghost"
    },
    "bestChargedMove": {
      "name": "Shadow Ball",
      "type": "Ghost"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 1
  },
  {
    "name": "Blacephalon",
    "pokedexId": 806,
    "types": [
      "Fire",
      "Ghost"
    ],
    "attack": 315,
    "defense": 149,
    "stamina": 142,
    "maxCp": 3704,
    "pveScore": 59,
    "dps": 38.59,
    "bestFastMove": {
      "name": "Astonish",
      "type": "Ghost"
    },
    "bestChargedMove": {
      "name": "Shadow Ball",
      "type": "Ghost"
    },
    "isShadow": false,
    "isMega": false,
    "isPrimal": false,
    "generation": 7
  },
  {
    "name": "Giratina (Origin)",
    "pokedexId": 487,
    "types": [
      "Ghost",
      "Dragon"
    ],
    "attack": 225,
    "defense": 187,
    "stamina": 284,
    "maxCp": 4180,
    "pveScore": 61,
    "dps": 31.85,
    "bestFastMove": {
      "name": "Shadow Claw",
      "type": "Ghost"
    },
    "bestChargedMove": {
      "name": "Shadow Force",
      "type": "Ghost"
    },
    "isShadow": false,
    "isMega": false,
    "isPrimal": false,
    "generation": 4
  },
  {
    "name": "Dusk Mane Necrozma",
    "pokedexId": 800,
    "types": [
      "Psychic",
      "Steel"
    ],
    "attack": 277,
    "defense": 198,
    "stamina": 201,
    "maxCp": 4683,
    "pveScore": 86,
    "dps": 47.88,
    "bestFastMove": {
      "name": "Metal Claw",
      "type": "Steel"
    },
    "bestChargedMove": {
      "name": "Sunsteel Strike",
      "type": "Steel"
    },
    "isShadow": false,
    "isMega": false,
    "isPrimal": false,
    "generation": 7
  },
  {
    "name": "Mega Metagross",
    "pokedexId": 376,
    "types": [
      "Steel",
      "Psychic"
    ],
    "attack": 300,
    "defense": 289,
    "stamina": 190,
    "maxCp": 5652,
    "pveScore": 68,
    "dps": 35.1,
    "bestFastMove": {
      "name": "Bullet Punch",
      "type": "Steel"
    },
    "bestChargedMove": {
      "name": "Meteor Mash",
      "type": "Steel"
    },
    "isShadow": false,
    "isMega": true,
    "isPrimal": false,
    "generation": 3
  },
  {
    "name": "Shadow Metagross",
    "pokedexId": 376,
    "types": [
      "Steel",
      "Psychic"
    ],
    "attack": 257,
    "defense": 228,
    "stamina": 190,
    "maxCp": 4286,
    "pveScore": 63,
    "dps": 36.04,
    "bestFastMove": {
      "name": "Bullet Punch",
      "type": "Steel"
    },
    "bestChargedMove": {
      "name": "Meteor Mash",
      "type": "Steel"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 3
  },
  {
    "name": "Metagross",
    "pokedexId": 376,
    "types": [
      "Steel",
      "Psychic"
    ],
    "attack": 257,
    "defense": 228,
    "stamina": 190,
    "maxCp": 4286,
    "pveScore": 55,
    "dps": 30.07,
    "bestFastMove": {
      "name": "Bullet Punch",
      "type": "Steel"
    },
    "bestChargedMove": {
      "name": "Meteor Mash",
      "type": "Steel"
    },
    "isShadow": false,
    "isMega": false,
    "isPrimal": false,
    "generation": 3
  },
  {
    "name": "Dialga (Origin)",
    "pokedexId": 483,
    "types": [
      "Steel",
      "Dragon"
    ],
    "attack": 270,
    "defense": 225,
    "stamina": 205,
    "maxCp": 4624,
    "pveScore": 55,
    "dps": 29.76,
    "bestFastMove": {
      "name": "Metal Claw",
      "type": "Steel"
    },
    "bestChargedMove": {
      "name": "Iron Head",
      "type": "Steel"
    },
    "isShadow": false,
    "isMega": false,
    "isPrimal": false,
    "generation": 4
  },
  {
    "name": "Shadow Excadrill (Steel)",
    "pokedexId": 530,
    "types": [
      "Ground",
      "Steel"
    ],
    "attack": 255,
    "defense": 129,
    "stamina": 242,
    "maxCp": 3667,
    "pveScore": 54,
    "dps": 33.73,
    "bestFastMove": {
      "name": "Metal Claw",
      "type": "Steel"
    },
    "bestChargedMove": {
      "name": "Iron Head",
      "type": "Steel"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 5
  },
  {
    "name": "Mega Rayquaza",
    "pokedexId": 384,
    "types": [
      "Dragon",
      "Flying"
    ],
    "attack": 377,
    "defense": 210,
    "stamina": 227,
    "maxCp": 6492,
    "pveScore": 86,
    "dps": 45.92,
    "bestFastMove": {
      "name": "Dragon Tail",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Breaking Swipe",
      "type": "Dragon"
    },
    "isShadow": false,
    "isMega": true,
    "isPrimal": false,
    "generation": 3
  },
  {
    "name": "Mega Rayquaza (Flying)",
    "pokedexId": 384,
    "types": [
      "Dragon",
      "Flying"
    ],
    "attack": 377,
    "defense": 210,
    "stamina": 227,
    "maxCp": 6492,
    "pveScore": 100,
    "dps": 55.56,
    "bestFastMove": {
      "name": "Air Slash",
      "type": "Flying"
    },
    "bestChargedMove": {
      "name": "Dragon Ascent",
      "type": "Flying"
    },
    "isShadow": false,
    "isMega": true,
    "isPrimal": false,
    "generation": 3
  },
  {
    "name": "Rayquaza (Dragon Ascent)",
    "pokedexId": 384,
    "types": [
      "Dragon",
      "Flying"
    ],
    "attack": 284,
    "defense": 170,
    "stamina": 213,
    "maxCp": 4335,
    "pveScore": 73,
    "dps": 41.85,
    "bestFastMove": {
      "name": "Air Slash",
      "type": "Flying"
    },
    "bestChargedMove": {
      "name": "Dragon Ascent",
      "type": "Flying"
    },
    "isShadow": false,
    "isMega": false,
    "isPrimal": false,
    "generation": 3
  },
  {
    "name": "Mega Garchomp",
    "pokedexId": 445,
    "types": [
      "Dragon",
      "Ground"
    ],
    "attack": 339,
    "defense": 222,
    "stamina": 239,
    "maxCp": 6132,
    "pveScore": 83,
    "dps": 43.05,
    "bestFastMove": {
      "name": "Dragon Tail",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Outrage",
      "type": "Dragon"
    },
    "isShadow": false,
    "isMega": true,
    "isPrimal": false,
    "generation": 4
  },
  {
    "name": "Mega Salamence",
    "pokedexId": 373,
    "types": [
      "Dragon",
      "Flying"
    ],
    "attack": 310,
    "defense": 251,
    "stamina": 216,
    "maxCp": 5688,
    "pveScore": 76,
    "dps": 39.37,
    "bestFastMove": {
      "name": "Dragon Tail",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Outrage",
      "type": "Dragon"
    },
    "isShadow": false,
    "isMega": true,
    "isPrimal": false,
    "generation": 3
  },
  {
    "name": "Shadow Salamence",
    "pokedexId": 373,
    "types": [
      "Dragon",
      "Flying"
    ],
    "attack": 277,
    "defense": 168,
    "stamina": 216,
    "maxCp": 4239,
    "pveScore": 70,
    "dps": 42.16,
    "bestFastMove": {
      "name": "Dragon Tail",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Outrage",
      "type": "Dragon"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 3
  },
  {
    "name": "Shadow Dragonite",
    "pokedexId": 149,
    "types": [
      "Dragon",
      "Flying"
    ],
    "attack": 263,
    "defense": 198,
    "stamina": 209,
    "maxCp": 4287,
    "pveScore": 69,
    "dps": 40.13,
    "bestFastMove": {
      "name": "Dragon Tail",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Outrage",
      "type": "Dragon"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 1
  },
  {
    "name": "Shadow Garchomp",
    "pokedexId": 445,
    "types": [
      "Dragon",
      "Ground"
    ],
    "attack": 261,
    "defense": 193,
    "stamina": 239,
    "maxCp": 4479,
    "pveScore": 70,
    "dps": 39.75,
    "bestFastMove": {
      "name": "Dragon Tail",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Outrage",
      "type": "Dragon"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 4
  },
  {
    "name": "Palkia (Origin)",
    "pokedexId": 484,
    "types": [
      "Water",
      "Dragon"
    ],
    "attack": 286,
    "defense": 223,
    "stamina": 189,
    "maxCp": 4683,
    "pveScore": 73,
    "dps": 40.21,
    "bestFastMove": {
      "name": "Dragon Breath",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Spacial Rend",
      "type": "Dragon"
    },
    "isShadow": false,
    "isMega": false,
    "isPrimal": false,
    "generation": 4
  },
  {
    "name": "Dialga (Origin)",
    "pokedexId": 483,
    "types": [
      "Steel",
      "Dragon"
    ],
    "attack": 270,
    "defense": 225,
    "stamina": 205,
    "maxCp": 4624,
    "pveScore": 70,
    "dps": 37.96,
    "bestFastMove": {
      "name": "Dragon Breath",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Roar of Time",
      "type": "Dragon"
    },
    "isShadow": false,
    "isMega": false,
    "isPrimal": false,
    "generation": 4
  },
  {
    "name": "Shadow Latios",
    "pokedexId": 381,
    "types": [
      "Dragon",
      "Psychic"
    ],
    "attack": 268,
    "defense": 212,
    "stamina": 190,
    "maxCp": 4310,
    "pveScore": 62,
    "dps": 36.01,
    "bestFastMove": {
      "name": "Dragon Breath",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Dragon Claw",
      "type": "Dragon"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 3
  },
  {
    "name": "Mega Lucario",
    "pokedexId": 448,
    "types": [
      "Fighting",
      "Steel"
    ],
    "attack": 310,
    "defense": 175,
    "stamina": 172,
    "maxCp": 4325,
    "pveScore": 80,
    "dps": 48.22,
    "bestFastMove": {
      "name": "Force Palm",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Aura Sphere",
      "type": "Fighting"
    },
    "isShadow": false,
    "isMega": true,
    "isPrimal": false,
    "generation": 4
  },
  {
    "name": "Mega Heracross",
    "pokedexId": 214,
    "types": [
      "Bug",
      "Fighting"
    ],
    "attack": 334,
    "defense": 223,
    "stamina": 190,
    "maxCp": 5443,
    "pveScore": 74,
    "dps": 40.72,
    "bestFastMove": {
      "name": "Counter",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Close Combat",
      "type": "Fighting"
    },
    "isShadow": false,
    "isMega": true,
    "isPrimal": false,
    "generation": 2
  },
  {
    "name": "Mega Blaziken (Fighting)",
    "pokedexId": 257,
    "types": [
      "Fire",
      "Fighting"
    ],
    "attack": 329,
    "defense": 168,
    "stamina": 190,
    "maxCp": 4704,
    "pveScore": 72,
    "dps": 42.71,
    "bestFastMove": {
      "name": "Counter",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Focus Blast",
      "type": "Fighting"
    },
    "isShadow": false,
    "isMega": true,
    "isPrimal": false,
    "generation": 3
  },
  {
    "name": "Terrakion",
    "pokedexId": 639,
    "types": [
      "Rock",
      "Fighting"
    ],
    "attack": 260,
    "defense": 192,
    "stamina": 209,
    "maxCp": 4181,
    "pveScore": 63,
    "dps": 35.08,
    "bestFastMove": {
      "name": "Double Kick",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Sacred Sword",
      "type": "Fighting"
    },
    "isShadow": false,
    "isMega": false,
    "isPrimal": false,
    "generation": 5
  },
  {
    "name": "Shadow Machamp",
    "pokedexId": 68,
    "types": [
      "Fighting"
    ],
    "attack": 234,
    "defense": 159,
    "stamina": 207,
    "maxCp": 3455,
    "pveScore": 59,
    "dps": 36.22,
    "bestFastMove": {
      "name": "Counter",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Dynamic Punch",
      "type": "Fighting"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 1
  },
  {
    "name": "Shadow Conkeldurr",
    "pokedexId": 534,
    "types": [
      "Fighting"
    ],
    "attack": 243,
    "defense": 158,
    "stamina": 233,
    "maxCp": 3773,
    "pveScore": 63,
    "dps": 37.64,
    "bestFastMove": {
      "name": "Counter",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Dynamic Punch",
      "type": "Fighting"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 5
  },
  {
    "name": "Keldeo",
    "pokedexId": 647,
    "types": [
      "Water",
      "Fighting"
    ],
    "attack": 260,
    "defense": 192,
    "stamina": 209,
    "maxCp": 4181,
    "pveScore": 59,
    "dps": 32.86,
    "bestFastMove": {
      "name": "Low Kick",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Sacred Sword",
      "type": "Fighting"
    },
    "isShadow": false,
    "isMega": false,
    "isPrimal": false,
    "generation": 5
  },
  {
    "name": "Mega Charizard Y",
    "pokedexId": 6,
    "types": [
      "Fire",
      "Flying"
    ],
    "attack": 319,
    "defense": 212,
    "stamina": 186,
    "maxCp": 5037,
    "pveScore": 78,
    "dps": 43.5,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Blast Burn",
      "type": "Fire"
    },
    "isShadow": false,
    "isMega": true,
    "isPrimal": false,
    "generation": 1
  },
  {
    "name": "Mega Blaziken",
    "pokedexId": 257,
    "types": [
      "Fire",
      "Fighting"
    ],
    "attack": 329,
    "defense": 168,
    "stamina": 190,
    "maxCp": 4704,
    "pveScore": 76,
    "dps": 44.86,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Blast Burn",
      "type": "Fire"
    },
    "isShadow": false,
    "isMega": true,
    "isPrimal": false,
    "generation": 3
  },
  {
    "name": "Primal Groudon (Fire)",
    "pokedexId": 383,
    "types": [
      "Ground",
      "Fire"
    ],
    "attack": 353,
    "defense": 268,
    "stamina": 218,
    "maxCp": 6672,
    "pveScore": 75,
    "dps": 38.37,
    "bestFastMove": {
      "name": "Mud Shot",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Fire Punch",
      "type": "Fire"
    },
    "isShadow": false,
    "isMega": false,
    "isPrimal": true,
    "generation": 3
  },
  {
    "name": "Reshiram",
    "pokedexId": 643,
    "types": [
      "Dragon",
      "Fire"
    ],
    "attack": 275,
    "defense": 211,
    "stamina": 205,
    "maxCp": 4565,
    "pveScore": 71,
    "dps": 39.04,
    "bestFastMove": {
      "name": "Fire Fang",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Fusion Flare",
      "type": "Fire"
    },
    "isShadow": false,
    "isMega": false,
    "isPrimal": false,
    "generation": 5
  },
  {
    "name": "Shadow Chandelure (Fire)",
    "pokedexId": 609,
    "types": [
      "Ghost",
      "Fire"
    ],
    "attack": 271,
    "defense": 182,
    "stamina": 155,
    "maxCp": 3695,
    "pveScore": 68,
    "dps": 43.33,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 5
  },
  {
    "name": "Shadow Blaziken",
    "pokedexId": 257,
    "types": [
      "Fire",
      "Fighting"
    ],
    "attack": 240,
    "defense": 141,
    "stamina": 190,
    "maxCp": 3215,
    "pveScore": 61,
    "dps": 39.27,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Blast Burn",
      "type": "Fire"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 3
  },
  {
    "name": "Shadow Entei",
    "pokedexId": 244,
    "types": [
      "Fire"
    ],
    "attack": 235,
    "defense": 171,
    "stamina": 251,
    "maxCp": 3926,
    "pveScore": 66,
    "dps": 37.84,
    "bestFastMove": {
      "name": "Fire Fang",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 2
  },
  {
    "name": "Shadow Moltres",
    "pokedexId": 146,
    "types": [
      "Fire",
      "Flying"
    ],
    "attack": 251,
    "defense": 181,
    "stamina": 207,
    "maxCp": 3917,
    "pveScore": 68,
    "dps": 40.13,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 1
  },
  {
    "name": "Shadow Heatran",
    "pokedexId": 485,
    "types": [
      "Fire",
      "Steel"
    ],
    "attack": 251,
    "defense": 213,
    "stamina": 209,
    "maxCp": 4244,
    "pveScore": 72,
    "dps": 41.07,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Magma Storm",
      "type": "Fire"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 4
  },
  {
    "name": "Primal Kyogre",
    "pokedexId": 382,
    "types": [
      "Water"
    ],
    "attack": 353,
    "defense": 268,
    "stamina": 218,
    "maxCp": 6672,
    "pveScore": 90,
    "dps": 45.98,
    "bestFastMove": {
      "name": "Waterfall",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Origin Pulse",
      "type": "Water"
    },
    "isShadow": false,
    "isMega": false,
    "isPrimal": true,
    "generation": 3
  },
  {
    "name": "Mega Swampert",
    "pokedexId": 260,
    "types": [
      "Water",
      "Ground"
    ],
    "attack": 283,
    "defense": 218,
    "stamina": 225,
    "maxCp": 4975,
    "pveScore": 78,
    "dps": 41.57,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Hydro Cannon",
      "type": "Water"
    },
    "isShadow": false,
    "isMega": true,
    "isPrimal": false,
    "generation": 3
  },
  {
    "name": "Mega Blastoise",
    "pokedexId": 9,
    "types": [
      "Water"
    ],
    "attack": 264,
    "defense": 237,
    "stamina": 188,
    "maxCp": 4455,
    "pveScore": 71,
    "dps": 38.78,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Hydro Cannon",
      "type": "Water"
    },
    "isShadow": false,
    "isMega": true,
    "isPrimal": false,
    "generation": 1
  },
  {
    "name": "Shadow Kyogre",
    "pokedexId": 382,
    "types": [
      "Water"
    ],
    "attack": 270,
    "defense": 228,
    "stamina": 205,
    "maxCp": 4652,
    "pveScore": 75,
    "dps": 42.2,
    "bestFastMove": {
      "name": "Waterfall",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Origin Pulse",
      "type": "Water"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 3
  },
  {
    "name": "Shadow Swampert",
    "pokedexId": 260,
    "types": [
      "Water",
      "Ground"
    ],
    "attack": 208,
    "defense": 175,
    "stamina": 225,
    "maxCp": 3362,
    "pveScore": 63,
    "dps": 36.72,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Hydro Cannon",
      "type": "Water"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 3
  },
  {
    "name": "Shadow Feraligatr",
    "pokedexId": 160,
    "types": [
      "Water"
    ],
    "attack": 205,
    "defense": 188,
    "stamina": 198,
    "maxCp": 3260,
    "pveScore": 59,
    "dps": 35.29,
    "bestFastMove": {
      "name": "Waterfall",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Hydro Cannon",
      "type": "Water"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 2
  },
  {
    "name": "Greninja",
    "pokedexId": 658,
    "types": [
      "Water",
      "Dark"
    ],
    "attack": 223,
    "defense": 152,
    "stamina": 176,
    "maxCp": 3001,
    "pveScore": 59,
    "dps": 36.41,
    "bestFastMove": {
      "name": "Water Shuriken",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Hydro Cannon",
      "type": "Water"
    },
    "isShadow": false,
    "isMega": false,
    "isPrimal": false,
    "generation": 6
  },
  {
    "name": "Primal Groudon",
    "pokedexId": 383,
    "types": [
      "Ground",
      "Fire"
    ],
    "attack": 353,
    "defense": 268,
    "stamina": 218,
    "maxCp": 6672,
    "pveScore": 99,
    "dps": 50.24,
    "bestFastMove": {
      "name": "Mud Shot",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Precipice Blades",
      "type": "Ground"
    },
    "isShadow": false,
    "isMega": false,
    "isPrimal": true,
    "generation": 3
  },
  {
    "name": "Mega Garchomp (Ground)",
    "pokedexId": 445,
    "types": [
      "Dragon",
      "Ground"
    ],
    "attack": 339,
    "defense": 222,
    "stamina": 239,
    "maxCp": 6132,
    "pveScore": 78,
    "dps": 40.81,
    "bestFastMove": {
      "name": "Mud Shot",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Earth Power",
      "type": "Ground"
    },
    "isShadow": false,
    "isMega": true,
    "isPrimal": false,
    "generation": 4
  },
  {
    "name": "Shadow Groudon",
    "pokedexId": 383,
    "types": [
      "Ground"
    ],
    "attack": 270,
    "defense": 228,
    "stamina": 205,
    "maxCp": 4652,
    "pveScore": 82,
    "dps": 46.11,
    "bestFastMove": {
      "name": "Mud Shot",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Precipice Blades",
      "type": "Ground"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 3
  },
  {
    "name": "Shadow Excadrill",
    "pokedexId": 530,
    "types": [
      "Ground",
      "Steel"
    ],
    "attack": 255,
    "defense": 129,
    "stamina": 242,
    "maxCp": 3667,
    "pveScore": 64,
    "dps": 39.73,
    "bestFastMove": {
      "name": "Mud-Slap",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Scorching Sands",
      "type": "Ground"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 5
  },
  {
    "name": "Shadow Garchomp (Ground)",
    "pokedexId": 445,
    "types": [
      "Dragon",
      "Ground"
    ],
    "attack": 261,
    "defense": 193,
    "stamina": 239,
    "maxCp": 4479,
    "pveScore": 67,
    "dps": 37.68,
    "bestFastMove": {
      "name": "Mud Shot",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Earth Power",
      "type": "Ground"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 4
  },
  {
    "name": "Shadow Rhyperior (Ground)",
    "pokedexId": 464,
    "types": [
      "Ground",
      "Rock"
    ],
    "attack": 241,
    "defense": 190,
    "stamina": 251,
    "maxCp": 4221,
    "pveScore": 64,
    "dps": 35.92,
    "bestFastMove": {
      "name": "Mud-Slap",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Earthquake",
      "type": "Ground"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 4
  },
  {
    "name": "Landorus (Therian)",
    "pokedexId": 645,
    "types": [
      "Ground",
      "Flying"
    ],
    "attack": 289,
    "defense": 179,
    "stamina": 205,
    "maxCp": 4434,
    "pveScore": 71,
    "dps": 40.56,
    "bestFastMove": {
      "name": "Mud Shot",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Sandsear Storm",
      "type": "Ground"
    },
    "isShadow": false,
    "isMega": false,
    "isPrimal": false,
    "generation": 5
  },
  {
    "name": "Groudon",
    "pokedexId": 383,
    "types": [
      "Ground"
    ],
    "attack": 270,
    "defense": 228,
    "stamina": 205,
    "maxCp": 4652,
    "pveScore": 71,
    "dps": 38.43,
    "bestFastMove": {
      "name": "Mud Shot",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Precipice Blades",
      "type": "Ground"
    },
    "isShadow": false,
    "isMega": false,
    "isPrimal": false,
    "generation": 3
  },
  {
    "name": "Shadow Mamoswine (Ground)",
    "pokedexId": 473,
    "types": [
      "Ice",
      "Ground"
    ],
    "attack": 247,
    "defense": 146,
    "stamina": 242,
    "maxCp": 3763,
    "pveScore": 60,
    "dps": 36.41,
    "bestFastMove": {
      "name": "Mud-Slap",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "High Horsepower",
      "type": "Ground"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 4
  },
  {
    "name": "Mega Diancie",
    "pokedexId": 719,
    "types": [
      "Rock",
      "Fairy"
    ],
    "attack": 342,
    "defense": 235,
    "stamina": 137,
    "maxCp": 4913,
    "pveScore": 69,
    "dps": 40.53,
    "bestFastMove": {
      "name": "Rock Throw",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "isShadow": false,
    "isMega": true,
    "isPrimal": false,
    "generation": 6
  },
  {
    "name": "Mega Tyranitar (Rock)",
    "pokedexId": 248,
    "types": [
      "Rock",
      "Dark"
    ],
    "attack": 309,
    "defense": 276,
    "stamina": 225,
    "maxCp": 6008,
    "pveScore": 71,
    "dps": 35.45,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Stone Edge",
      "type": "Rock"
    },
    "isShadow": false,
    "isMega": true,
    "isPrimal": false,
    "generation": 2
  },
  {
    "name": "Shadow Rampardos",
    "pokedexId": 409,
    "types": [
      "Rock"
    ],
    "attack": 295,
    "defense": 109,
    "stamina": 219,
    "maxCp": 3728,
    "pveScore": 61,
    "dps": 40.82,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 4
  },
  {
    "name": "Shadow Rhyperior",
    "pokedexId": 464,
    "types": [
      "Ground",
      "Rock"
    ],
    "attack": 241,
    "defense": 190,
    "stamina": 251,
    "maxCp": 4221,
    "pveScore": 64,
    "dps": 35.64,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Wrecker",
      "type": "Rock"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 4
  },
  {
    "name": "Rampardos",
    "pokedexId": 409,
    "types": [
      "Rock"
    ],
    "attack": 295,
    "defense": 109,
    "stamina": 219,
    "maxCp": 3728,
    "pveScore": 53,
    "dps": 34.02,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "isShadow": false,
    "isMega": false,
    "isPrimal": false,
    "generation": 4
  },
  {
    "name": "Shadow Tyranitar (Rock)",
    "pokedexId": 248,
    "types": [
      "Rock",
      "Dark"
    ],
    "attack": 251,
    "defense": 207,
    "stamina": 225,
    "maxCp": 4335,
    "pveScore": 61,
    "dps": 34.53,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Stone Edge",
      "type": "Rock"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 2
  },
  {
    "name": "Rhyperior",
    "pokedexId": 464,
    "types": [
      "Ground",
      "Rock"
    ],
    "attack": 241,
    "defense": 190,
    "stamina": 251,
    "maxCp": 4221,
    "pveScore": 56,
    "dps": 29.72,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Wrecker",
      "type": "Rock"
    },
    "isShadow": false,
    "isMega": false,
    "isPrimal": false,
    "generation": 4
  },
  {
    "name": "Tyrantrum",
    "pokedexId": 697,
    "types": [
      "Rock",
      "Dragon"
    ],
    "attack": 227,
    "defense": 191,
    "stamina": 193,
    "maxCp": 3530,
    "pveScore": 55,
    "dps": 31.45,
    "bestFastMove": {
      "name": "Rock Throw",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Meteor Beam",
      "type": "Rock"
    },
    "isShadow": false,
    "isMega": false,
    "isPrimal": false,
    "generation": 6
  },
  {
    "name": "Terrakion (Rock)",
    "pokedexId": 639,
    "types": [
      "Rock",
      "Fighting"
    ],
    "attack": 260,
    "defense": 192,
    "stamina": 209,
    "maxCp": 4181,
    "pveScore": 54,
    "dps": 29.98,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "isShadow": false,
    "isMega": false,
    "isPrimal": false,
    "generation": 5
  },
  {
    "name": "Mega Tyranitar",
    "pokedexId": 248,
    "types": [
      "Rock",
      "Dark"
    ],
    "attack": 309,
    "defense": 276,
    "stamina": 225,
    "maxCp": 6008,
    "pveScore": 77,
    "dps": 38.3,
    "bestFastMove": {
      "name": "Bite",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Brutal Swing",
      "type": "Dark"
    },
    "isShadow": false,
    "isMega": true,
    "isPrimal": false,
    "generation": 2
  },
  {
    "name": "Mega Houndoom",
    "pokedexId": 229,
    "types": [
      "Dark",
      "Fire"
    ],
    "attack": 289,
    "defense": 194,
    "stamina": 181,
    "maxCp": 4379,
    "pveScore": 62,
    "dps": 35.52,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Foul Play",
      "type": "Dark"
    },
    "isShadow": false,
    "isMega": true,
    "isPrimal": false,
    "generation": 2
  },
  {
    "name": "Shadow Tyranitar",
    "pokedexId": 248,
    "types": [
      "Rock",
      "Dark"
    ],
    "attack": 251,
    "defense": 207,
    "stamina": 225,
    "maxCp": 4335,
    "pveScore": 66,
    "dps": 37.31,
    "bestFastMove": {
      "name": "Bite",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Brutal Swing",
      "type": "Dark"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 2
  },
  {
    "name": "Shadow Darkrai",
    "pokedexId": 491,
    "types": [
      "Dark"
    ],
    "attack": 285,
    "defense": 198,
    "stamina": 172,
    "maxCp": 4268,
    "pveScore": 65,
    "dps": 39.44,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 4
  },
  {
    "name": "Hydreigon",
    "pokedexId": 635,
    "types": [
      "Dark",
      "Dragon"
    ],
    "attack": 256,
    "defense": 188,
    "stamina": 211,
    "maxCp": 4149,
    "pveScore": 57,
    "dps": 31.73,
    "bestFastMove": {
      "name": "Bite",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Brutal Swing",
      "type": "Dark"
    },
    "isShadow": false,
    "isMega": false,
    "isPrimal": false,
    "generation": 5
  },
  {
    "name": "Darkrai",
    "pokedexId": 491,
    "types": [
      "Dark"
    ],
    "attack": 285,
    "defense": 198,
    "stamina": 172,
    "maxCp": 4268,
    "pveScore": 56,
    "dps": 32.86,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "isShadow": false,
    "isMega": false,
    "isPrimal": false,
    "generation": 4
  },
  {
    "name": "Shadow Weavile (Dark)",
    "pokedexId": 461,
    "types": [
      "Dark",
      "Ice"
    ],
    "attack": 243,
    "defense": 171,
    "stamina": 172,
    "maxCp": 3397,
    "pveScore": 57,
    "dps": 35.89,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Foul Play",
      "type": "Dark"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 4
  },
  {
    "name": "Shadow Honchkrow (Dark)",
    "pokedexId": 430,
    "types": [
      "Dark",
      "Flying"
    ],
    "attack": 243,
    "defense": 103,
    "stamina": 225,
    "maxCp": 3065,
    "pveScore": 50,
    "dps": 33.67,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 4
  },
  {
    "name": "Tyranitar",
    "pokedexId": 248,
    "types": [
      "Rock",
      "Dark"
    ],
    "attack": 251,
    "defense": 207,
    "stamina": 225,
    "maxCp": 4335,
    "pveScore": 58,
    "dps": 31.11,
    "bestFastMove": {
      "name": "Bite",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Brutal Swing",
      "type": "Dark"
    },
    "isShadow": false,
    "isMega": false,
    "isPrimal": false,
    "generation": 2
  },
  {
    "name": "Yveltal",
    "pokedexId": 717,
    "types": [
      "Dark",
      "Flying"
    ],
    "attack": 250,
    "defense": 185,
    "stamina": 246,
    "maxCp": 4275,
    "pveScore": 53,
    "dps": 28.83,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "isShadow": false,
    "isMega": false,
    "isPrimal": false,
    "generation": 6
  },
  {
    "name": "Mega Mewtwo Y",
    "pokedexId": 150,
    "types": [
      "Psychic"
    ],
    "attack": 398,
    "defense": 207,
    "stamina": 214,
    "maxCp": 7581,
    "pveScore": 95,
    "dps": 51.85,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psystrike",
      "type": "Psychic"
    },
    "isShadow": false,
    "isMega": true,
    "isPrimal": false,
    "generation": 1
  },
  {
    "name": "Mega Mewtwo X",
    "pokedexId": 150,
    "types": [
      "Psychic",
      "Fighting"
    ],
    "attack": 396,
    "defense": 228,
    "stamina": 214,
    "maxCp": 7581,
    "pveScore": 97,
    "dps": 51.59,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psystrike",
      "type": "Psychic"
    },
    "isShadow": false,
    "isMega": true,
    "isPrimal": false,
    "generation": 1
  },
  {
    "name": "Shadow Mewtwo",
    "pokedexId": 150,
    "types": [
      "Psychic"
    ],
    "attack": 300,
    "defense": 182,
    "stamina": 214,
    "maxCp": 4724,
    "pveScore": 83,
    "dps": 48.81,
    "bestFastMove": {
      "name": "Psycho Cut",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psystrike",
      "type": "Psychic"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 1
  },
  {
    "name": "Mega Alakazam",
    "pokedexId": 65,
    "types": [
      "Psychic"
    ],
    "attack": 367,
    "defense": 193,
    "stamina": 146,
    "maxCp": 5092,
    "pveScore": 74,
    "dps": 45.21,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "isShadow": false,
    "isMega": true,
    "isPrimal": false,
    "generation": 1
  },
  {
    "name": "Mega Gardevoir",
    "pokedexId": 282,
    "types": [
      "Psychic",
      "Fairy"
    ],
    "attack": 326,
    "defense": 229,
    "stamina": 169,
    "maxCp": 5101,
    "pveScore": 71,
    "dps": 40.16,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "isShadow": false,
    "isMega": true,
    "isPrimal": false,
    "generation": 3
  },
  {
    "name": "Mega Latios",
    "pokedexId": 381,
    "types": [
      "Dragon",
      "Psychic"
    ],
    "attack": 335,
    "defense": 241,
    "stamina": 190,
    "maxCp": 5661,
    "pveScore": 75,
    "dps": 40.36,
    "bestFastMove": {
      "name": "Zen Headbutt",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "isShadow": false,
    "isMega": true,
    "isPrimal": false,
    "generation": 3
  },
  {
    "name": "Mewtwo",
    "pokedexId": 150,
    "types": [
      "Psychic"
    ],
    "attack": 300,
    "defense": 182,
    "stamina": 214,
    "maxCp": 4724,
    "pveScore": 72,
    "dps": 40.68,
    "bestFastMove": {
      "name": "Psycho Cut",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psystrike",
      "type": "Psychic"
    },
    "isShadow": false,
    "isMega": false,
    "isPrimal": false,
    "generation": 1
  },
  {
    "name": "Galarian Darmanitan",
    "pokedexId": 555,
    "types": [
      "Ice"
    ],
    "attack": 263,
    "defense": 114,
    "stamina": 233,
    "maxCp": 3514,
    "pveScore": 55,
    "dps": 33.9,
    "bestFastMove": {
      "name": "Ice Fang",
      "type": "Ice"
    },
    "bestChargedMove": {
      "name": "Avalanche",
      "type": "Ice"
    },
    "isShadow": false,
    "isMega": false,
    "isPrimal": false,
    "generation": 5
  },
  {
    "name": "Shadow Mamoswine",
    "pokedexId": 473,
    "types": [
      "Ice",
      "Ground"
    ],
    "attack": 247,
    "defense": 146,
    "stamina": 242,
    "maxCp": 3763,
    "pveScore": 56,
    "dps": 33.58,
    "bestFastMove": {
      "name": "Powder Snow",
      "type": "Ice"
    },
    "bestChargedMove": {
      "name": "Avalanche",
      "type": "Ice"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 4
  },
  {
    "name": "Baxcalibur",
    "pokedexId": 998,
    "types": [
      "Dragon",
      "Ice"
    ],
    "attack": 254,
    "defense": 168,
    "stamina": 233,
    "maxCp": 4070,
    "pveScore": 58,
    "dps": 32.74,
    "bestFastMove": {
      "name": "Ice Fang",
      "type": "Ice"
    },
    "bestChargedMove": {
      "name": "Avalanche",
      "type": "Ice"
    },
    "isShadow": false,
    "isMega": false,
    "isPrimal": false,
    "generation": 9
  },
  {
    "name": "Mega Glalie",
    "pokedexId": 362,
    "types": [
      "Ice"
    ],
    "attack": 252,
    "defense": 173,
    "stamina": 190,
    "maxCp": 3650,
    "pveScore": 49,
    "dps": 28.59,
    "bestFastMove": {
      "name": "Powder Snow",
      "type": "Ice"
    },
    "bestChargedMove": {
      "name": "Avalanche",
      "type": "Ice"
    },
    "isShadow": false,
    "isMega": true,
    "isPrimal": false,
    "generation": 3
  },
  {
    "name": "Mega Abomasnow",
    "pokedexId": 460,
    "types": [
      "Grass",
      "Ice"
    ],
    "attack": 240,
    "defense": 191,
    "stamina": 207,
    "maxCp": 3870,
    "pveScore": 45,
    "dps": 25.39,
    "bestFastMove": {
      "name": "Powder Snow",
      "type": "Ice"
    },
    "bestChargedMove": {
      "name": "Weather Ball",
      "type": "Ice"
    },
    "isShadow": false,
    "isMega": true,
    "isPrimal": false,
    "generation": 4
  },
  {
    "name": "Shadow Weavile",
    "pokedexId": 461,
    "types": [
      "Dark",
      "Ice"
    ],
    "attack": 243,
    "defense": 171,
    "stamina": 172,
    "maxCp": 3397,
    "pveScore": 53,
    "dps": 33.56,
    "bestFastMove": {
      "name": "Ice Shard",
      "type": "Ice"
    },
    "bestChargedMove": {
      "name": "Avalanche",
      "type": "Ice"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 4
  },
  {
    "name": "Kyurem",
    "pokedexId": 646,
    "types": [
      "Dragon",
      "Ice"
    ],
    "attack": 246,
    "defense": 170,
    "stamina": 245,
    "maxCp": 4041,
    "pveScore": 61,
    "dps": 33.67,
    "bestFastMove": {
      "name": "Dragon Breath",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Glaciate",
      "type": "Ice"
    },
    "isShadow": false,
    "isMega": false,
    "isPrimal": false,
    "generation": 5
  },
  {
    "name": "Mamoswine",
    "pokedexId": 473,
    "types": [
      "Ice",
      "Ground"
    ],
    "attack": 247,
    "defense": 146,
    "stamina": 242,
    "maxCp": 3763,
    "pveScore": 49,
    "dps": 28.02,
    "bestFastMove": {
      "name": "Powder Snow",
      "type": "Ice"
    },
    "bestChargedMove": {
      "name": "Avalanche",
      "type": "Ice"
    },
    "isShadow": false,
    "isMega": false,
    "isPrimal": false,
    "generation": 4
  },
  {
    "name": "Xurkitree",
    "pokedexId": 796,
    "types": [
      "Electric"
    ],
    "attack": 330,
    "defense": 144,
    "stamina": 195,
    "maxCp": 4451,
    "pveScore": 59,
    "dps": 36.0,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Discharge",
      "type": "Electric"
    },
    "isShadow": false,
    "isMega": false,
    "isPrimal": false,
    "generation": 7
  },
  {
    "name": "Mega Manectric",
    "pokedexId": 310,
    "types": [
      "Electric"
    ],
    "attack": 286,
    "defense": 179,
    "stamina": 172,
    "maxCp": 4048,
    "pveScore": 62,
    "dps": 37.28,
    "bestFastMove": {
      "name": "Thunder Fang",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Wild Charge",
      "type": "Electric"
    },
    "isShadow": false,
    "isMega": true,
    "isPrimal": false,
    "generation": 3
  },
  {
    "name": "Shadow Raikou",
    "pokedexId": 243,
    "types": [
      "Electric"
    ],
    "attack": 241,
    "defense": 195,
    "stamina": 207,
    "maxCp": 3902,
    "pveScore": 61,
    "dps": 35.42,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Wild Charge",
      "type": "Electric"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 2
  },
  {
    "name": "Shadow Electivire",
    "pokedexId": 466,
    "types": [
      "Electric"
    ],
    "attack": 249,
    "defense": 163,
    "stamina": 181,
    "maxCp": 3530,
    "pveScore": 58,
    "dps": 36.64,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Wild Charge",
      "type": "Electric"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 4
  },
  {
    "name": "Shadow Zapdos",
    "pokedexId": 145,
    "types": [
      "Electric",
      "Flying"
    ],
    "attack": 253,
    "defense": 185,
    "stamina": 207,
    "maxCp": 3987,
    "pveScore": 59,
    "dps": 34.79,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 1
  },
  {
    "name": "Shadow Magnezone",
    "pokedexId": 462,
    "types": [
      "Electric",
      "Steel"
    ],
    "attack": 238,
    "defense": 205,
    "stamina": 172,
    "maxCp": 3623,
    "pveScore": 59,
    "dps": 35.33,
    "bestFastMove": {
      "name": "Spark",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Wild Charge",
      "type": "Electric"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 4
  },
  {
    "name": "Zekrom",
    "pokedexId": 644,
    "types": [
      "Dragon",
      "Electric"
    ],
    "attack": 275,
    "defense": 211,
    "stamina": 205,
    "maxCp": 4565,
    "pveScore": 66,
    "dps": 36.3,
    "bestFastMove": {
      "name": "Charge Beam",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Fusion Bolt",
      "type": "Electric"
    },
    "isShadow": false,
    "isMega": false,
    "isPrimal": false,
    "generation": 5
  },
  {
    "name": "Thundurus (Therian)",
    "pokedexId": 642,
    "types": [
      "Electric",
      "Flying"
    ],
    "attack": 295,
    "defense": 161,
    "stamina": 188,
    "maxCp": 4137,
    "pveScore": 67,
    "dps": 40.1,
    "bestFastMove": {
      "name": "Volt Switch",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Wildbolt Storm",
      "type": "Electric"
    },
    "isShadow": false,
    "isMega": false,
    "isPrimal": false,
    "generation": 5
  },
  {
    "name": "Mega Sceptile",
    "pokedexId": 254,
    "types": [
      "Grass",
      "Dragon"
    ],
    "attack": 320,
    "defense": 186,
    "stamina": 172,
    "maxCp": 4585,
    "pveScore": 68,
    "dps": 40.23,
    "bestFastMove": {
      "name": "Bullet Seed",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Frenzy Plant",
      "type": "Grass"
    },
    "isShadow": false,
    "isMega": true,
    "isPrimal": false,
    "generation": 3
  },
  {
    "name": "Mega Venusaur",
    "pokedexId": 3,
    "types": [
      "Grass",
      "Poison"
    ],
    "attack": 241,
    "defense": 246,
    "stamina": 190,
    "maxCp": 4181,
    "pveScore": 63,
    "dps": 33.87,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Frenzy Plant",
      "type": "Grass"
    },
    "isShadow": false,
    "isMega": true,
    "isPrimal": false,
    "generation": 1
  },
  {
    "name": "Kartana",
    "pokedexId": 798,
    "types": [
      "Grass",
      "Steel"
    ],
    "attack": 323,
    "defense": 182,
    "stamina": 139,
    "maxCp": 4156,
    "pveScore": 63,
    "dps": 39.28,
    "bestFastMove": {
      "name": "Razor Leaf",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Leaf Blade",
      "type": "Grass"
    },
    "isShadow": false,
    "isMega": false,
    "isPrimal": false,
    "generation": 7
  },
  {
    "name": "Shadow Sceptile",
    "pokedexId": 254,
    "types": [
      "Grass"
    ],
    "attack": 223,
    "defense": 169,
    "stamina": 172,
    "maxCp": 3117,
    "pveScore": 53,
    "dps": 33.69,
    "bestFastMove": {
      "name": "Bullet Seed",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Frenzy Plant",
      "type": "Grass"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 3
  },
  {
    "name": "Shaymin (Sky)",
    "pokedexId": 492,
    "types": [
      "Grass",
      "Flying"
    ],
    "attack": 261,
    "defense": 166,
    "stamina": 225,
    "maxCp": 4087,
    "pveScore": 57,
    "dps": 32.68,
    "bestFastMove": {
      "name": "Magical Leaf",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "isShadow": false,
    "isMega": false,
    "isPrimal": false,
    "generation": 4
  },
  {
    "name": "Shadow Tangrowth",
    "pokedexId": 465,
    "types": [
      "Grass"
    ],
    "attack": 207,
    "defense": 169,
    "stamina": 225,
    "maxCp": 3431,
    "pveScore": 53,
    "dps": 31.62,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Power Whip",
      "type": "Grass"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 4
  },
  {
    "name": "Zarude",
    "pokedexId": 893,
    "types": [
      "Dark",
      "Grass"
    ],
    "attack": 242,
    "defense": 215,
    "stamina": 233,
    "maxCp": 4334,
    "pveScore": 58,
    "dps": 30.86,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Power Whip",
      "type": "Grass"
    },
    "isShadow": false,
    "isMega": false,
    "isPrimal": false,
    "generation": 8
  },
  {
    "name": "Mega Gardevoir (Fairy)",
    "pokedexId": 282,
    "types": [
      "Psychic",
      "Fairy"
    ],
    "attack": 326,
    "defense": 229,
    "stamina": 169,
    "maxCp": 5101,
    "pveScore": 70,
    "dps": 39.52,
    "bestFastMove": {
      "name": "Charm",
      "type": "Fairy"
    },
    "bestChargedMove": {
      "name": "Dazzling Gleam",
      "type": "Fairy"
    },
    "isShadow": false,
    "isMega": true,
    "isPrimal": false,
    "generation": 3
  },
  {
    "name": "Shadow Gardevoir (Fairy)",
    "pokedexId": 282,
    "types": [
      "Psychic",
      "Fairy"
    ],
    "attack": 237,
    "defense": 195,
    "stamina": 169,
    "maxCp": 3497,
    "pveScore": 56,
    "dps": 34.42,
    "bestFastMove": {
      "name": "Charm",
      "type": "Fairy"
    },
    "bestChargedMove": {
      "name": "Dazzling Gleam",
      "type": "Fairy"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 3
  },
  {
    "name": "Enamorus (Incarnate)",
    "pokedexId": 905,
    "types": [
      "Fairy",
      "Flying"
    ],
    "attack": 281,
    "defense": 162,
    "stamina": 179,
    "maxCp": 3899,
    "pveScore": 56,
    "dps": 33.97,
    "bestFastMove": {
      "name": "Fairy Wind",
      "type": "Fairy"
    },
    "bestChargedMove": {
      "name": "Dazzling Gleam",
      "type": "Fairy"
    },
    "isShadow": false,
    "isMega": false,
    "isPrimal": false,
    "generation": 8
  },
  {
    "name": "Xerneas",
    "pokedexId": 716,
    "types": [
      "Fairy"
    ],
    "attack": 250,
    "defense": 185,
    "stamina": 246,
    "maxCp": 4275,
    "pveScore": 56,
    "dps": 30.4,
    "bestFastMove": {
      "name": "Geomancy",
      "type": "Fairy"
    },
    "bestChargedMove": {
      "name": "Moonblast",
      "type": "Fairy"
    },
    "isShadow": false,
    "isMega": false,
    "isPrimal": false,
    "generation": 6
  },
  {
    "name": "Shadow Granbull",
    "pokedexId": 210,
    "types": [
      "Fairy"
    ],
    "attack": 212,
    "defense": 131,
    "stamina": 207,
    "maxCp": 2885,
    "pveScore": 48,
    "dps": 30.94,
    "bestFastMove": {
      "name": "Charm",
      "type": "Fairy"
    },
    "bestChargedMove": {
      "name": "Play Rough",
      "type": "Fairy"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 2
  },
  {
    "name": "Mega Beedrill",
    "pokedexId": 15,
    "types": [
      "Bug",
      "Poison"
    ],
    "attack": 303,
    "defense": 148,
    "stamina": 163,
    "maxCp": 3830,
    "pveScore": 59,
    "dps": 37.15,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "isShadow": false,
    "isMega": true,
    "isPrimal": false,
    "generation": 1
  },
  {
    "name": "Mega Gengar (Poison)",
    "pokedexId": 94,
    "types": [
      "Ghost",
      "Poison"
    ],
    "attack": 349,
    "defense": 199,
    "stamina": 155,
    "maxCp": 4902,
    "pveScore": 66,
    "dps": 39.32,
    "bestFastMove": {
      "name": "Hex",
      "type": "Ghost"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "isShadow": false,
    "isMega": true,
    "isPrimal": false,
    "generation": 1
  },
  {
    "name": "Nihilego",
    "pokedexId": 793,
    "types": [
      "Rock",
      "Poison"
    ],
    "attack": 249,
    "defense": 210,
    "stamina": 240,
    "maxCp": 4465,
    "pveScore": 58,
    "dps": 30.53,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "isShadow": false,
    "isMega": false,
    "isPrimal": false,
    "generation": 7
  },
  {
    "name": "Shadow Victreebel",
    "pokedexId": 71,
    "types": [
      "Grass",
      "Poison"
    ],
    "attack": 207,
    "defense": 138,
    "stamina": 190,
    "maxCp": 2748,
    "pveScore": 46,
    "dps": 29.93,
    "bestFastMove": {
      "name": "Acid",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 1
  },
  {
    "name": "Shadow Vileplume",
    "pokedexId": 45,
    "types": [
      "Grass",
      "Poison"
    ],
    "attack": 202,
    "defense": 167,
    "stamina": 181,
    "maxCp": 2893,
    "pveScore": 47,
    "dps": 29.2,
    "bestFastMove": {
      "name": "Acid",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 1
  },
  {
    "name": "Roserade",
    "pokedexId": 407,
    "types": [
      "Grass",
      "Poison"
    ],
    "attack": 243,
    "defense": 185,
    "stamina": 155,
    "maxCp": 3359,
    "pveScore": 49,
    "dps": 29.79,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "isShadow": false,
    "isMega": false,
    "isPrimal": false,
    "generation": 4
  },
  {
    "name": "Mega Pinsir",
    "pokedexId": 127,
    "types": [
      "Bug",
      "Flying"
    ],
    "attack": 305,
    "defense": 231,
    "stamina": 163,
    "maxCp": 4699,
    "pveScore": 58,
    "dps": 33.15,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "isShadow": false,
    "isMega": true,
    "isPrimal": false,
    "generation": 1
  },
  {
    "name": "Mega Scizor",
    "pokedexId": 212,
    "types": [
      "Bug",
      "Steel"
    ],
    "attack": 279,
    "defense": 250,
    "stamina": 172,
    "maxCp": 4621,
    "pveScore": 53,
    "dps": 29.29,
    "bestFastMove": {
      "name": "Fury Cutter",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "isShadow": false,
    "isMega": true,
    "isPrimal": false,
    "generation": 2
  },
  {
    "name": "Volcarona",
    "pokedexId": 637,
    "types": [
      "Bug",
      "Fire"
    ],
    "attack": 264,
    "defense": 189,
    "stamina": 198,
    "maxCp": 4106,
    "pveScore": 55,
    "dps": 31.12,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "Bug Buzz",
      "type": "Bug"
    },
    "isShadow": false,
    "isMega": false,
    "isPrimal": false,
    "generation": 5
  },
  {
    "name": "Shadow Pinsir",
    "pokedexId": 127,
    "types": [
      "Bug"
    ],
    "attack": 238,
    "defense": 182,
    "stamina": 163,
    "maxCp": 3345,
    "pveScore": 49,
    "dps": 31.09,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 1
  },
  {
    "name": "Shadow Scizor",
    "pokedexId": 212,
    "types": [
      "Bug",
      "Steel"
    ],
    "attack": 236,
    "defense": 181,
    "stamina": 172,
    "maxCp": 3393,
    "pveScore": 48,
    "dps": 29.71,
    "bestFastMove": {
      "name": "Fury Cutter",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "isShadow": true,
    "isMega": false,
    "isPrimal": false,
    "generation": 2
  },
  {
    "name": "Genesect",
    "pokedexId": 649,
    "types": [
      "Bug",
      "Steel"
    ],
    "attack": 252,
    "defense": 199,
    "stamina": 174,
    "maxCp": 3816,
    "pveScore": 46,
    "dps": 26.46,
    "bestFastMove": {
      "name": "Fury Cutter",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "isShadow": false,
    "isMega": false,
    "isPrimal": false,
    "generation": 5
  },
  {
    "name": "Bulbasaur",
    "pokedexId": 1,
    "slug": "bulbasaur",
    "types": [
      "Grass",
      "Poison"
    ],
    "attack": 118,
    "defense": 111,
    "stamina": 128,
    "maxCp": 1260,
    "maxCp40": 1115,
    "cpRaid100": 637,
    "cpWeather100": 796,
    "cpResearch100": 477,
    "pveScore": 21,
    "dps": 15.04,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 1
  },
  {
    "name": "Ivysaur",
    "pokedexId": 2,
    "slug": "ivysaur",
    "types": [
      "Grass",
      "Poison"
    ],
    "attack": 151,
    "defense": 143,
    "stamina": 155,
    "maxCp": 1921,
    "maxCp40": 1699,
    "cpRaid100": 970,
    "cpWeather100": 1213,
    "cpResearch100": 728,
    "pveScore": 30,
    "dps": 19.25,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 1
  },
  {
    "name": "Venusaur",
    "pokedexId": 3,
    "slug": "venusaur",
    "types": [
      "Grass",
      "Poison"
    ],
    "attack": 197,
    "defense": 189,
    "stamina": 190,
    "maxCp": 3061,
    "maxCp40": 2707,
    "cpRaid100": 1547,
    "cpWeather100": 1934,
    "cpResearch100": 1160,
    "pveScore": 48,
    "dps": 27.69,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Frenzy Plant",
      "type": "Grass"
    },
    "generation": 1
  },
  {
    "name": "Charmander",
    "pokedexId": 4,
    "slug": "charmander",
    "types": [
      "Fire"
    ],
    "attack": 116,
    "defense": 93,
    "stamina": 118,
    "maxCp": 1108,
    "maxCp40": 980,
    "cpRaid100": 560,
    "cpWeather100": 700,
    "cpResearch100": 420,
    "pveScore": 20,
    "dps": 15.47,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 1
  },
  {
    "name": "Charmeleon",
    "pokedexId": 5,
    "slug": "charmeleon",
    "types": [
      "Fire"
    ],
    "attack": 158,
    "defense": 126,
    "stamina": 151,
    "maxCp": 1868,
    "maxCp40": 1653,
    "cpRaid100": 944,
    "cpWeather100": 1180,
    "cpResearch100": 708,
    "pveScore": 31,
    "dps": 21.07,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 1
  },
  {
    "name": "Charizard",
    "pokedexId": 6,
    "slug": "charizard",
    "types": [
      "Fire",
      "Flying"
    ],
    "attack": 222,
    "defense": 173,
    "stamina": 186,
    "maxCp": 3253,
    "maxCp40": 2877,
    "cpRaid100": 1644,
    "cpWeather100": 2055,
    "cpResearch100": 1233,
    "pveScore": 51,
    "dps": 30.27,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Blast Burn",
      "type": "Fire"
    },
    "generation": 1
  },
  {
    "name": "Squirtle",
    "pokedexId": 7,
    "slug": "squirtle",
    "types": [
      "Water"
    ],
    "attack": 93,
    "defense": 121,
    "stamina": 127,
    "maxCp": 1059,
    "maxCp40": 937,
    "cpRaid100": 535,
    "cpWeather100": 669,
    "cpResearch100": 401,
    "pveScore": 15,
    "dps": 10.64,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 1
  },
  {
    "name": "Wartortle",
    "pokedexId": 8,
    "slug": "wartortle",
    "types": [
      "Water"
    ],
    "attack": 125,
    "defense": 155,
    "stamina": 153,
    "maxCp": 1670,
    "maxCp40": 1477,
    "cpRaid100": 844,
    "cpWeather100": 1055,
    "cpResearch100": 633,
    "pveScore": 22,
    "dps": 14.3,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 1
  },
  {
    "name": "Blastoise",
    "pokedexId": 9,
    "slug": "blastoise",
    "types": [
      "Water"
    ],
    "attack": 171,
    "defense": 207,
    "stamina": 188,
    "maxCp": 2788,
    "maxCp40": 2466,
    "cpRaid100": 1409,
    "cpWeather100": 1761,
    "cpResearch100": 1057,
    "pveScore": 45,
    "dps": 25.12,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Hydro Cannon",
      "type": "Water"
    },
    "generation": 1
  },
  {
    "name": "Caterpie",
    "pokedexId": 10,
    "slug": "caterpie",
    "types": [
      "Bug"
    ],
    "attack": 54,
    "defense": 55,
    "stamina": 128,
    "maxCp": 487,
    "maxCp40": 431,
    "cpRaid100": 246,
    "cpWeather100": 307,
    "cpResearch100": 184,
    "pveScore": 15,
    "dps": 5.87,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 1
  },
  {
    "name": "Metapod",
    "pokedexId": 11,
    "slug": "metapod",
    "types": [
      "Bug"
    ],
    "attack": 44,
    "defense": 80,
    "stamina": 137,
    "maxCp": 500,
    "maxCp40": 442,
    "cpRaid100": 253,
    "cpWeather100": 316,
    "cpResearch100": 189,
    "pveScore": 15,
    "dps": 4.78,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 1
  },
  {
    "name": "Butterfree",
    "pokedexId": 12,
    "slug": "butterfree",
    "types": [
      "Bug",
      "Flying"
    ],
    "attack": 167,
    "defense": 136,
    "stamina": 155,
    "maxCp": 2058,
    "maxCp40": 1821,
    "cpRaid100": 1040,
    "cpWeather100": 1300,
    "cpResearch100": 780,
    "pveScore": 28,
    "dps": 18.15,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 1
  },
  {
    "name": "Weedle",
    "pokedexId": 13,
    "slug": "weedle",
    "types": [
      "Bug",
      "Poison"
    ],
    "attack": 63,
    "defense": 50,
    "stamina": 120,
    "maxCp": 515,
    "maxCp40": 456,
    "cpRaid100": 260,
    "cpWeather100": 325,
    "cpResearch100": 195,
    "pveScore": 15,
    "dps": 6.85,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 1
  },
  {
    "name": "Kakuna",
    "pokedexId": 14,
    "slug": "kakuna",
    "types": [
      "Bug",
      "Poison"
    ],
    "attack": 46,
    "defense": 75,
    "stamina": 128,
    "maxCp": 488,
    "maxCp40": 432,
    "cpRaid100": 246,
    "cpWeather100": 308,
    "cpResearch100": 185,
    "pveScore": 15,
    "dps": 5.0,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 1
  },
  {
    "name": "Beedrill",
    "pokedexId": 15,
    "slug": "beedrill",
    "types": [
      "Bug",
      "Poison"
    ],
    "attack": 169,
    "defense": 130,
    "stamina": 163,
    "maxCp": 2087,
    "maxCp40": 1846,
    "cpRaid100": 1054,
    "cpWeather100": 1318,
    "cpResearch100": 791,
    "pveScore": 28,
    "dps": 18.37,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 1
  },
  {
    "name": "Pidgey",
    "pokedexId": 16,
    "slug": "pidgey",
    "types": [
      "Normal",
      "Flying"
    ],
    "attack": 84,
    "defense": 73,
    "stamina": 120,
    "maxCp": 761,
    "maxCp40": 673,
    "cpRaid100": 385,
    "cpWeather100": 481,
    "cpResearch100": 288,
    "pveScore": 15,
    "dps": 10.14,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 1
  },
  {
    "name": "Pidgeotto",
    "pokedexId": 17,
    "slug": "pidgeotto",
    "types": [
      "Normal",
      "Flying"
    ],
    "attack": 117,
    "defense": 105,
    "stamina": 160,
    "maxCp": 1350,
    "maxCp40": 1194,
    "cpRaid100": 682,
    "cpWeather100": 853,
    "cpResearch100": 512,
    "pveScore": 20,
    "dps": 14.13,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 1
  },
  {
    "name": "Pidgeot",
    "pokedexId": 18,
    "slug": "pidgeot",
    "types": [
      "Normal",
      "Flying"
    ],
    "attack": 166,
    "defense": 154,
    "stamina": 195,
    "maxCp": 2407,
    "maxCp40": 2129,
    "cpRaid100": 1216,
    "cpWeather100": 1521,
    "cpResearch100": 912,
    "pveScore": 33,
    "dps": 20.05,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 1
  },
  {
    "name": "Rattata",
    "pokedexId": 19,
    "slug": "rattata",
    "types": [
      "Normal"
    ],
    "attack": 104,
    "defense": 70,
    "stamina": 102,
    "maxCp": 837,
    "maxCp40": 741,
    "cpRaid100": 423,
    "cpWeather100": 529,
    "cpResearch100": 317,
    "pveScore": 15,
    "dps": 12.56,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 1
  },
  {
    "name": "Raticate",
    "pokedexId": 20,
    "slug": "raticate",
    "types": [
      "Normal"
    ],
    "attack": 161,
    "defense": 138,
    "stamina": 146,
    "maxCp": 1950,
    "maxCp40": 1725,
    "cpRaid100": 985,
    "cpWeather100": 1232,
    "cpResearch100": 739,
    "pveScore": 29,
    "dps": 19.44,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 1
  },
  {
    "name": "Spearow",
    "pokedexId": 21,
    "slug": "spearow",
    "types": [
      "Normal",
      "Flying"
    ],
    "attack": 112,
    "defense": 61,
    "stamina": 120,
    "maxCp": 908,
    "maxCp40": 803,
    "cpRaid100": 459,
    "cpWeather100": 573,
    "cpResearch100": 344,
    "pveScore": 16,
    "dps": 13.53,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 1
  },
  {
    "name": "Fearow",
    "pokedexId": 22,
    "slug": "fearow",
    "types": [
      "Normal",
      "Flying"
    ],
    "attack": 181,
    "defense": 133,
    "stamina": 163,
    "maxCp": 2246,
    "maxCp40": 1986,
    "cpRaid100": 1135,
    "cpWeather100": 1419,
    "cpResearch100": 851,
    "pveScore": 34,
    "dps": 21.86,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 1
  },
  {
    "name": "Ekans",
    "pokedexId": 23,
    "slug": "ekans",
    "types": [
      "Poison"
    ],
    "attack": 110,
    "defense": 96,
    "stamina": 111,
    "maxCp": 1043,
    "maxCp40": 923,
    "cpRaid100": 527,
    "cpWeather100": 659,
    "cpResearch100": 395,
    "pveScore": 17,
    "dps": 13.49,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "generation": 1
  },
  {
    "name": "Arbok",
    "pokedexId": 24,
    "slug": "arbok",
    "types": [
      "Poison"
    ],
    "attack": 184,
    "defense": 152,
    "stamina": 155,
    "maxCp": 2367,
    "maxCp40": 2094,
    "cpRaid100": 1196,
    "cpWeather100": 1495,
    "cpResearch100": 897,
    "pveScore": 35,
    "dps": 22.56,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "generation": 1
  },
  {
    "name": "Pikachu",
    "pokedexId": 25,
    "slug": "pikachu",
    "types": [
      "Electric"
    ],
    "attack": 112,
    "defense": 95,
    "stamina": 111,
    "maxCp": 1055,
    "maxCp40": 933,
    "cpRaid100": 533,
    "cpWeather100": 667,
    "cpResearch100": 400,
    "pveScore": 16,
    "dps": 12.82,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 1
  },
  {
    "name": "Raichu",
    "pokedexId": 26,
    "slug": "raichu",
    "types": [
      "Electric"
    ],
    "attack": 193,
    "defense": 151,
    "stamina": 155,
    "maxCp": 2467,
    "maxCp40": 2182,
    "cpRaid100": 1247,
    "cpWeather100": 1558,
    "cpResearch100": 935,
    "pveScore": 35,
    "dps": 22.08,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 1
  },
  {
    "name": "Sandshrew",
    "pokedexId": 27,
    "slug": "sandshrew",
    "types": [
      "Ground"
    ],
    "attack": 127,
    "defense": 120,
    "stamina": 137,
    "maxCp": 1436,
    "maxCp40": 1270,
    "cpRaid100": 725,
    "cpWeather100": 907,
    "cpResearch100": 544,
    "pveScore": 23,
    "dps": 15.78,
    "bestFastMove": {
      "name": "Mud-Slap",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Earthquake",
      "type": "Ground"
    },
    "generation": 1
  },
  {
    "name": "Sandslash",
    "pokedexId": 28,
    "slug": "sandslash",
    "types": [
      "Ground"
    ],
    "attack": 183,
    "defense": 175,
    "stamina": 181,
    "maxCp": 2697,
    "maxCp40": 2386,
    "cpRaid100": 1363,
    "cpWeather100": 1704,
    "cpResearch100": 1022,
    "pveScore": 38,
    "dps": 22.74,
    "bestFastMove": {
      "name": "Mud-Slap",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Earthquake",
      "type": "Ground"
    },
    "generation": 1
  },
  {
    "name": "Nidoran♀",
    "pokedexId": 29,
    "slug": "nidoran",
    "types": [
      "Poison"
    ],
    "attack": 86,
    "defense": 89,
    "stamina": 146,
    "maxCp": 922,
    "maxCp40": 816,
    "cpRaid100": 466,
    "cpWeather100": 583,
    "cpResearch100": 349,
    "pveScore": 15,
    "dps": 10.54,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "generation": 1
  },
  {
    "name": "Nidorina",
    "pokedexId": 30,
    "slug": "nidorina",
    "types": [
      "Poison"
    ],
    "attack": 118,
    "defense": 120,
    "stamina": 172,
    "maxCp": 1492,
    "maxCp40": 1319,
    "cpRaid100": 754,
    "cpWeather100": 942,
    "cpResearch100": 565,
    "pveScore": 22,
    "dps": 14.47,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "generation": 1
  },
  {
    "name": "Nidoqueen",
    "pokedexId": 31,
    "slug": "nidoqueen",
    "types": [
      "Poison",
      "Ground"
    ],
    "attack": 180,
    "defense": 173,
    "stamina": 207,
    "maxCp": 2812,
    "maxCp40": 2488,
    "cpRaid100": 1421,
    "cpWeather100": 1777,
    "cpResearch100": 1066,
    "pveScore": 38,
    "dps": 22.07,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "generation": 1
  },
  {
    "name": "Nidoran♂",
    "pokedexId": 32,
    "slug": "nidoran",
    "types": [
      "Poison"
    ],
    "attack": 104,
    "defense": 76,
    "stamina": 130,
    "maxCp": 965,
    "maxCp40": 853,
    "cpRaid100": 487,
    "cpWeather100": 609,
    "cpResearch100": 365,
    "pveScore": 16,
    "dps": 12.75,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "generation": 1
  },
  {
    "name": "Nidorino",
    "pokedexId": 33,
    "slug": "nidorino",
    "types": [
      "Poison"
    ],
    "attack": 137,
    "defense": 110,
    "stamina": 156,
    "maxCp": 1569,
    "maxCp40": 1387,
    "cpRaid100": 793,
    "cpWeather100": 991,
    "cpResearch100": 594,
    "pveScore": 24,
    "dps": 16.8,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "generation": 1
  },
  {
    "name": "Nidoking",
    "pokedexId": 34,
    "slug": "nidoking",
    "types": [
      "Poison",
      "Ground"
    ],
    "attack": 204,
    "defense": 156,
    "stamina": 191,
    "maxCp": 2902,
    "maxCp40": 2567,
    "cpRaid100": 1466,
    "cpWeather100": 1833,
    "cpResearch100": 1100,
    "pveScore": 42,
    "dps": 25.01,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "generation": 1
  },
  {
    "name": "Clefairy",
    "pokedexId": 35,
    "slug": "clefairy",
    "types": [
      "Fairy"
    ],
    "attack": 107,
    "defense": 108,
    "stamina": 172,
    "maxCp": 1306,
    "maxCp40": 1155,
    "cpRaid100": 660,
    "cpWeather100": 825,
    "cpResearch100": 495,
    "pveScore": 19,
    "dps": 12.97,
    "bestFastMove": {
      "name": "Charm",
      "type": "Fairy"
    },
    "bestChargedMove": {
      "name": "Dazzling Gleam",
      "type": "Fairy"
    },
    "generation": 1
  },
  {
    "name": "Clefable",
    "pokedexId": 36,
    "slug": "clefable",
    "types": [
      "Fairy"
    ],
    "attack": 178,
    "defense": 162,
    "stamina": 216,
    "maxCp": 2755,
    "maxCp40": 2437,
    "cpRaid100": 1392,
    "cpWeather100": 1741,
    "cpResearch100": 1044,
    "pveScore": 37,
    "dps": 21.58,
    "bestFastMove": {
      "name": "Charm",
      "type": "Fairy"
    },
    "bestChargedMove": {
      "name": "Dazzling Gleam",
      "type": "Fairy"
    },
    "generation": 1
  },
  {
    "name": "Vulpix",
    "pokedexId": 37,
    "slug": "vulpix",
    "types": [
      "Fire"
    ],
    "attack": 96,
    "defense": 109,
    "stamina": 116,
    "maxCp": 998,
    "maxCp40": 883,
    "cpRaid100": 504,
    "cpWeather100": 631,
    "cpResearch100": 378,
    "pveScore": 17,
    "dps": 12.8,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 1
  },
  {
    "name": "Ninetales",
    "pokedexId": 38,
    "slug": "ninetales",
    "types": [
      "Fire"
    ],
    "attack": 169,
    "defense": 190,
    "stamina": 177,
    "maxCp": 2577,
    "maxCp40": 2279,
    "cpRaid100": 1302,
    "cpWeather100": 1628,
    "cpResearch100": 977,
    "pveScore": 39,
    "dps": 22.53,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 1
  },
  {
    "name": "Jigglypuff",
    "pokedexId": 39,
    "slug": "jigglypuff",
    "types": [
      "Normal",
      "Fairy"
    ],
    "attack": 80,
    "defense": 41,
    "stamina": 251,
    "maxCp": 818,
    "maxCp40": 724,
    "cpRaid100": 413,
    "cpWeather100": 517,
    "cpResearch100": 310,
    "pveScore": 15,
    "dps": 9.66,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 1
  },
  {
    "name": "Wigglytuff",
    "pokedexId": 40,
    "slug": "wigglytuff",
    "types": [
      "Normal",
      "Fairy"
    ],
    "attack": 156,
    "defense": 90,
    "stamina": 295,
    "maxCp": 2178,
    "maxCp40": 1926,
    "cpRaid100": 1101,
    "cpWeather100": 1376,
    "cpResearch100": 825,
    "pveScore": 30,
    "dps": 18.84,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 1
  },
  {
    "name": "Zubat",
    "pokedexId": 41,
    "slug": "zubat",
    "types": [
      "Poison",
      "Flying"
    ],
    "attack": 83,
    "defense": 73,
    "stamina": 120,
    "maxCp": 754,
    "maxCp40": 667,
    "cpRaid100": 381,
    "cpWeather100": 476,
    "cpResearch100": 285,
    "pveScore": 15,
    "dps": 10.18,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "generation": 1
  },
  {
    "name": "Golbat",
    "pokedexId": 42,
    "slug": "golbat",
    "types": [
      "Poison",
      "Flying"
    ],
    "attack": 161,
    "defense": 151,
    "stamina": 181,
    "maxCp": 2241,
    "maxCp40": 1982,
    "cpRaid100": 1132,
    "cpWeather100": 1416,
    "cpResearch100": 849,
    "pveScore": 32,
    "dps": 19.74,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "generation": 1
  },
  {
    "name": "Oddish",
    "pokedexId": 43,
    "slug": "oddish",
    "types": [
      "Grass",
      "Poison"
    ],
    "attack": 131,
    "defense": 111,
    "stamina": 128,
    "maxCp": 1383,
    "maxCp40": 1224,
    "cpRaid100": 699,
    "cpWeather100": 874,
    "cpResearch100": 524,
    "pveScore": 23,
    "dps": 16.7,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 1
  },
  {
    "name": "Gloom",
    "pokedexId": 44,
    "slug": "gloom",
    "types": [
      "Grass",
      "Poison"
    ],
    "attack": 153,
    "defense": 136,
    "stamina": 155,
    "maxCp": 1900,
    "maxCp40": 1681,
    "cpRaid100": 960,
    "cpWeather100": 1200,
    "cpResearch100": 720,
    "pveScore": 30,
    "dps": 19.51,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 1
  },
  {
    "name": "Vileplume",
    "pokedexId": 45,
    "slug": "vileplume",
    "types": [
      "Grass",
      "Poison"
    ],
    "attack": 202,
    "defense": 167,
    "stamina": 181,
    "maxCp": 2893,
    "maxCp40": 2559,
    "cpRaid100": 1462,
    "cpWeather100": 1828,
    "cpResearch100": 1097,
    "pveScore": 43,
    "dps": 25.75,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 1
  },
  {
    "name": "Paras",
    "pokedexId": 46,
    "slug": "paras",
    "types": [
      "Bug",
      "Grass"
    ],
    "attack": 120,
    "defense": 99,
    "stamina": 111,
    "maxCp": 1142,
    "maxCp40": 1010,
    "cpRaid100": 577,
    "cpWeather100": 721,
    "cpResearch100": 433,
    "pveScore": 17,
    "dps": 13.04,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 1
  },
  {
    "name": "Parasect",
    "pokedexId": 47,
    "slug": "parasect",
    "types": [
      "Bug",
      "Grass"
    ],
    "attack": 165,
    "defense": 146,
    "stamina": 155,
    "maxCp": 2102,
    "maxCp40": 1859,
    "cpRaid100": 1062,
    "cpWeather100": 1328,
    "cpResearch100": 797,
    "pveScore": 28,
    "dps": 17.93,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 1
  },
  {
    "name": "Venonat",
    "pokedexId": 48,
    "slug": "venonat",
    "types": [
      "Bug",
      "Poison"
    ],
    "attack": 100,
    "defense": 100,
    "stamina": 155,
    "maxCp": 1135,
    "maxCp40": 1004,
    "cpRaid100": 573,
    "cpWeather100": 717,
    "cpResearch100": 430,
    "pveScore": 15,
    "dps": 10.87,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 1
  },
  {
    "name": "Venomoth",
    "pokedexId": 49,
    "slug": "venomoth",
    "types": [
      "Bug",
      "Poison"
    ],
    "attack": 179,
    "defense": 143,
    "stamina": 172,
    "maxCp": 2354,
    "maxCp40": 2082,
    "cpRaid100": 1190,
    "cpWeather100": 1487,
    "cpResearch100": 892,
    "pveScore": 31,
    "dps": 19.46,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 1
  },
  {
    "name": "Diglett",
    "pokedexId": 50,
    "slug": "diglett",
    "types": [
      "Ground"
    ],
    "attack": 109,
    "defense": 78,
    "stamina": 67,
    "maxCp": 764,
    "maxCp40": 676,
    "cpRaid100": 386,
    "cpWeather100": 483,
    "cpResearch100": 289,
    "pveScore": 15,
    "dps": 13.55,
    "bestFastMove": {
      "name": "Mud-Slap",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Earthquake",
      "type": "Ground"
    },
    "generation": 1
  },
  {
    "name": "Dugtrio",
    "pokedexId": 51,
    "slug": "dugtrio",
    "types": [
      "Ground"
    ],
    "attack": 204,
    "defense": 136,
    "stamina": 111,
    "maxCp": 2132,
    "maxCp40": 1886,
    "cpRaid100": 1078,
    "cpWeather100": 1347,
    "cpResearch100": 808,
    "pveScore": 36,
    "dps": 25.35,
    "bestFastMove": {
      "name": "Mud-Slap",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Earthquake",
      "type": "Ground"
    },
    "generation": 1
  },
  {
    "name": "Meowth",
    "pokedexId": 52,
    "slug": "meowth",
    "types": [
      "Normal"
    ],
    "attack": 91,
    "defense": 79,
    "stamina": 120,
    "maxCp": 843,
    "maxCp40": 745,
    "cpRaid100": 426,
    "cpWeather100": 532,
    "cpResearch100": 319,
    "pveScore": 15,
    "dps": 10.99,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 1
  },
  {
    "name": "Persian",
    "pokedexId": 53,
    "slug": "persian",
    "types": [
      "Normal"
    ],
    "attack": 150,
    "defense": 136,
    "stamina": 163,
    "maxCp": 1910,
    "maxCp40": 1689,
    "cpRaid100": 965,
    "cpWeather100": 1206,
    "cpResearch100": 724,
    "pveScore": 28,
    "dps": 18.12,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 1
  },
  {
    "name": "Psyduck",
    "pokedexId": 54,
    "slug": "psyduck",
    "types": [
      "Water"
    ],
    "attack": 122,
    "defense": 95,
    "stamina": 137,
    "maxCp": 1250,
    "maxCp40": 1106,
    "cpRaid100": 632,
    "cpWeather100": 790,
    "cpResearch100": 474,
    "pveScore": 19,
    "dps": 13.96,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 1
  },
  {
    "name": "Golduck",
    "pokedexId": 55,
    "slug": "golduck",
    "types": [
      "Water"
    ],
    "attack": 190,
    "defense": 162,
    "stamina": 190,
    "maxCp": 2757,
    "maxCp40": 2438,
    "cpRaid100": 1393,
    "cpWeather100": 1742,
    "cpResearch100": 1045,
    "pveScore": 36,
    "dps": 21.74,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 1
  },
  {
    "name": "Mankey",
    "pokedexId": 56,
    "slug": "mankey",
    "types": [
      "Fighting"
    ],
    "attack": 147,
    "defense": 82,
    "stamina": 120,
    "maxCp": 1308,
    "maxCp40": 1157,
    "cpRaid100": 661,
    "cpWeather100": 827,
    "cpResearch100": 496,
    "pveScore": 24,
    "dps": 18.95,
    "bestFastMove": {
      "name": "Counter",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Dynamic Punch",
      "type": "Fighting"
    },
    "generation": 1
  },
  {
    "name": "Primeape",
    "pokedexId": 57,
    "slug": "primeape",
    "types": [
      "Fighting"
    ],
    "attack": 207,
    "defense": 138,
    "stamina": 163,
    "maxCp": 2586,
    "maxCp40": 2288,
    "cpRaid100": 1307,
    "cpWeather100": 1634,
    "cpResearch100": 980,
    "pveScore": 41,
    "dps": 26.68,
    "bestFastMove": {
      "name": "Counter",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Dynamic Punch",
      "type": "Fighting"
    },
    "generation": 1
  },
  {
    "name": "Growlithe",
    "pokedexId": 58,
    "slug": "growlithe",
    "types": [
      "Fire"
    ],
    "attack": 136,
    "defense": 93,
    "stamina": 146,
    "maxCp": 1405,
    "maxCp40": 1243,
    "cpRaid100": 710,
    "cpWeather100": 888,
    "cpResearch100": 533,
    "pveScore": 25,
    "dps": 18.13,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 1
  },
  {
    "name": "Arcanine",
    "pokedexId": 59,
    "slug": "arcanine",
    "types": [
      "Fire"
    ],
    "attack": 226,
    "defense": 166,
    "stamina": 207,
    "maxCp": 3411,
    "maxCp40": 3017,
    "cpRaid100": 1724,
    "cpWeather100": 2155,
    "cpResearch100": 1293,
    "pveScore": 52,
    "dps": 30.13,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 1
  },
  {
    "name": "Poliwag",
    "pokedexId": 60,
    "slug": "poliwag",
    "types": [
      "Water"
    ],
    "attack": 100,
    "defense": 82,
    "stamina": 120,
    "maxCp": 929,
    "maxCp40": 821,
    "cpRaid100": 469,
    "cpWeather100": 587,
    "cpResearch100": 352,
    "pveScore": 15,
    "dps": 11.44,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 1
  },
  {
    "name": "Poliwhirl",
    "pokedexId": 61,
    "slug": "poliwhirl",
    "types": [
      "Water"
    ],
    "attack": 130,
    "defense": 122,
    "stamina": 163,
    "maxCp": 1598,
    "maxCp40": 1414,
    "cpRaid100": 808,
    "cpWeather100": 1010,
    "cpResearch100": 606,
    "pveScore": 22,
    "dps": 14.88,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 1
  },
  {
    "name": "Poliwrath",
    "pokedexId": 62,
    "slug": "poliwrath",
    "types": [
      "Water",
      "Fighting"
    ],
    "attack": 182,
    "defense": 184,
    "stamina": 207,
    "maxCp": 2923,
    "maxCp40": 2586,
    "cpRaid100": 1477,
    "cpWeather100": 1847,
    "cpResearch100": 1108,
    "pveScore": 37,
    "dps": 20.83,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 1
  },
  {
    "name": "Abra",
    "pokedexId": 63,
    "slug": "abra",
    "types": [
      "Psychic"
    ],
    "attack": 194,
    "defense": 82,
    "stamina": 93,
    "maxCp": 1510,
    "maxCp40": 1336,
    "cpRaid100": 763,
    "cpWeather100": 954,
    "cpResearch100": 572,
    "pveScore": 28,
    "dps": 23.9,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 1
  },
  {
    "name": "Kadabra",
    "pokedexId": 64,
    "slug": "kadabra",
    "types": [
      "Psychic"
    ],
    "attack": 232,
    "defense": 117,
    "stamina": 120,
    "maxCp": 2328,
    "maxCp40": 2059,
    "cpRaid100": 1176,
    "cpWeather100": 1471,
    "cpResearch100": 882,
    "pveScore": 39,
    "dps": 28.58,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 1
  },
  {
    "name": "Alakazam",
    "pokedexId": 65,
    "slug": "alakazam",
    "types": [
      "Psychic"
    ],
    "attack": 271,
    "defense": 166,
    "stamina": 146,
    "maxCp": 3447,
    "maxCp40": 3049,
    "cpRaid100": 1742,
    "cpWeather100": 2178,
    "cpResearch100": 1306,
    "pveScore": 53,
    "dps": 33.38,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 1
  },
  {
    "name": "Machop",
    "pokedexId": 66,
    "slug": "machop",
    "types": [
      "Fighting"
    ],
    "attack": 137,
    "defense": 82,
    "stamina": 172,
    "maxCp": 1445,
    "maxCp40": 1278,
    "cpRaid100": 730,
    "cpWeather100": 913,
    "cpResearch100": 548,
    "pveScore": 24,
    "dps": 17.66,
    "bestFastMove": {
      "name": "Counter",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Dynamic Punch",
      "type": "Fighting"
    },
    "generation": 1
  },
  {
    "name": "Machoke",
    "pokedexId": 67,
    "slug": "machoke",
    "types": [
      "Fighting"
    ],
    "attack": 176,
    "defense": 125,
    "stamina": 190,
    "maxCp": 2284,
    "maxCp40": 2020,
    "cpRaid100": 1154,
    "cpWeather100": 1443,
    "cpResearch100": 866,
    "pveScore": 36,
    "dps": 22.68,
    "bestFastMove": {
      "name": "Counter",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Dynamic Punch",
      "type": "Fighting"
    },
    "generation": 1
  },
  {
    "name": "Machamp",
    "pokedexId": 68,
    "slug": "machamp",
    "types": [
      "Fighting"
    ],
    "attack": 234,
    "defense": 160,
    "stamina": 207,
    "maxCp": 3465,
    "maxCp40": 3065,
    "cpRaid100": 1751,
    "cpWeather100": 2189,
    "cpResearch100": 1313,
    "pveScore": 51,
    "dps": 30.16,
    "bestFastMove": {
      "name": "Counter",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Dynamic Punch",
      "type": "Fighting"
    },
    "generation": 1
  },
  {
    "name": "Bellsprout",
    "pokedexId": 69,
    "slug": "bellsprout",
    "types": [
      "Grass",
      "Poison"
    ],
    "attack": 138,
    "defense": 62,
    "stamina": 137,
    "maxCp": 1168,
    "maxCp40": 1033,
    "cpRaid100": 590,
    "cpWeather100": 738,
    "cpResearch100": 443,
    "pveScore": 21,
    "dps": 17.6,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 1
  },
  {
    "name": "Weepinbell",
    "pokedexId": 70,
    "slug": "weepinbell",
    "types": [
      "Grass",
      "Poison"
    ],
    "attack": 172,
    "defense": 92,
    "stamina": 163,
    "maxCp": 1822,
    "maxCp40": 1611,
    "cpRaid100": 921,
    "cpWeather100": 1151,
    "cpResearch100": 690,
    "pveScore": 31,
    "dps": 21.93,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 1
  },
  {
    "name": "Victreebel",
    "pokedexId": 71,
    "slug": "victreebel",
    "types": [
      "Grass",
      "Poison"
    ],
    "attack": 207,
    "defense": 135,
    "stamina": 190,
    "maxCp": 2748,
    "maxCp40": 2431,
    "cpRaid100": 1389,
    "cpWeather100": 1736,
    "cpResearch100": 1042,
    "pveScore": 42,
    "dps": 26.39,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 1
  },
  {
    "name": "Tentacool",
    "pokedexId": 72,
    "slug": "tentacool",
    "types": [
      "Water",
      "Poison"
    ],
    "attack": 97,
    "defense": 150,
    "stamina": 120,
    "maxCp": 1180,
    "maxCp40": 1044,
    "cpRaid100": 596,
    "cpWeather100": 745,
    "cpResearch100": 447,
    "pveScore": 16,
    "dps": 11.1,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 1
  },
  {
    "name": "Tentacruel",
    "pokedexId": 73,
    "slug": "tentacruel",
    "types": [
      "Water",
      "Poison"
    ],
    "attack": 165,
    "defense": 209,
    "stamina": 190,
    "maxCp": 2723,
    "maxCp40": 2409,
    "cpRaid100": 1376,
    "cpWeather100": 1720,
    "cpResearch100": 1032,
    "pveScore": 34,
    "dps": 18.88,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 1
  },
  {
    "name": "Geodude",
    "pokedexId": 74,
    "slug": "geodude",
    "types": [
      "Rock",
      "Ground"
    ],
    "attack": 131,
    "defense": 131,
    "stamina": 120,
    "maxCp": 1447,
    "maxCp40": 1280,
    "cpRaid100": 731,
    "cpWeather100": 914,
    "cpResearch100": 548,
    "pveScore": 21,
    "dps": 15.11,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 1
  },
  {
    "name": "Graveler",
    "pokedexId": 75,
    "slug": "graveler",
    "types": [
      "Rock",
      "Ground"
    ],
    "attack": 163,
    "defense": 163,
    "stamina": 146,
    "maxCp": 2127,
    "maxCp40": 1882,
    "cpRaid100": 1075,
    "cpWeather100": 1344,
    "cpResearch100": 806,
    "pveScore": 30,
    "dps": 18.8,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 1
  },
  {
    "name": "Golem",
    "pokedexId": 76,
    "slug": "golem",
    "types": [
      "Rock",
      "Ground"
    ],
    "attack": 210,
    "defense": 199,
    "stamina": 190,
    "maxCp": 3327,
    "maxCp40": 2943,
    "cpRaid100": 1681,
    "cpWeather100": 2102,
    "cpResearch100": 1261,
    "pveScore": 43,
    "dps": 24.22,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 1
  },
  {
    "name": "Ponyta",
    "pokedexId": 77,
    "slug": "ponyta",
    "types": [
      "Fire"
    ],
    "attack": 170,
    "defense": 126,
    "stamina": 137,
    "maxCp": 1912,
    "maxCp40": 1691,
    "cpRaid100": 966,
    "cpWeather100": 1208,
    "cpResearch100": 725,
    "pveScore": 33,
    "dps": 22.67,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 1
  },
  {
    "name": "Rapidash",
    "pokedexId": 78,
    "slug": "rapidash",
    "types": [
      "Fire"
    ],
    "attack": 207,
    "defense": 162,
    "stamina": 163,
    "maxCp": 2782,
    "maxCp40": 2461,
    "cpRaid100": 1406,
    "cpWeather100": 1757,
    "cpResearch100": 1054,
    "pveScore": 45,
    "dps": 27.6,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 1
  },
  {
    "name": "Slowpoke",
    "pokedexId": 79,
    "slug": "slowpoke",
    "types": [
      "Water",
      "Psychic"
    ],
    "attack": 109,
    "defense": 98,
    "stamina": 207,
    "maxCp": 1386,
    "maxCp40": 1226,
    "cpRaid100": 700,
    "cpWeather100": 876,
    "cpResearch100": 525,
    "pveScore": 19,
    "dps": 12.47,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 1
  },
  {
    "name": "Slowbro",
    "pokedexId": 80,
    "slug": "slowbro",
    "types": [
      "Water",
      "Psychic"
    ],
    "attack": 176,
    "defense": 180,
    "stamina": 216,
    "maxCp": 2862,
    "maxCp40": 2531,
    "cpRaid100": 1446,
    "cpWeather100": 1808,
    "cpResearch100": 1085,
    "pveScore": 36,
    "dps": 20.14,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 1
  },
  {
    "name": "Magnemite",
    "pokedexId": 81,
    "slug": "magnemite",
    "types": [
      "Electric",
      "Steel"
    ],
    "attack": 164,
    "defense": 121,
    "stamina": 93,
    "maxCp": 1531,
    "maxCp40": 1354,
    "cpRaid100": 774,
    "cpWeather100": 967,
    "cpResearch100": 580,
    "pveScore": 24,
    "dps": 18.77,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 1
  },
  {
    "name": "Magneton",
    "pokedexId": 82,
    "slug": "magneton",
    "types": [
      "Electric",
      "Steel"
    ],
    "attack": 223,
    "defense": 170,
    "stamina": 137,
    "maxCp": 2818,
    "maxCp40": 2492,
    "cpRaid100": 1424,
    "cpWeather100": 1780,
    "cpResearch100": 1068,
    "pveScore": 40,
    "dps": 25.52,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 1
  },
  {
    "name": "Farfetchd",
    "pokedexId": 83,
    "slug": "farfetchd",
    "types": [
      "Normal",
      "Flying"
    ],
    "attack": 167,
    "defense": 115,
    "stamina": 141,
    "maxCp": 1830,
    "maxCp40": 1618,
    "cpRaid100": 924,
    "cpWeather100": 1156,
    "cpResearch100": 693,
    "pveScore": 29,
    "dps": 20.17,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 1
  },
  {
    "name": "Doduo",
    "pokedexId": 84,
    "slug": "doduo",
    "types": [
      "Normal",
      "Flying"
    ],
    "attack": 158,
    "defense": 82,
    "stamina": 111,
    "maxCp": 1350,
    "maxCp40": 1194,
    "cpRaid100": 682,
    "cpWeather100": 853,
    "cpResearch100": 511,
    "pveScore": 24,
    "dps": 19.08,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 1
  },
  {
    "name": "Dodrio",
    "pokedexId": 85,
    "slug": "dodrio",
    "types": [
      "Normal",
      "Flying"
    ],
    "attack": 222,
    "defense": 142,
    "stamina": 155,
    "maxCp": 2733,
    "maxCp40": 2418,
    "cpRaid100": 1381,
    "cpWeather100": 1727,
    "cpResearch100": 1036,
    "pveScore": 41,
    "dps": 26.81,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 1
  },
  {
    "name": "Seel",
    "pokedexId": 86,
    "slug": "seel",
    "types": [
      "Water"
    ],
    "attack": 85,
    "defense": 121,
    "stamina": 163,
    "maxCp": 1098,
    "maxCp40": 971,
    "cpRaid100": 555,
    "cpWeather100": 694,
    "cpResearch100": 416,
    "pveScore": 15,
    "dps": 9.73,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 1
  },
  {
    "name": "Dewgong",
    "pokedexId": 87,
    "slug": "dewgong",
    "types": [
      "Water",
      "Ice"
    ],
    "attack": 139,
    "defense": 177,
    "stamina": 207,
    "maxCp": 2245,
    "maxCp40": 1985,
    "cpRaid100": 1134,
    "cpWeather100": 1418,
    "cpResearch100": 851,
    "pveScore": 28,
    "dps": 15.91,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 1
  },
  {
    "name": "Grimer",
    "pokedexId": 88,
    "slug": "grimer",
    "types": [
      "Poison"
    ],
    "attack": 135,
    "defense": 90,
    "stamina": 190,
    "maxCp": 1553,
    "maxCp40": 1374,
    "cpRaid100": 785,
    "cpWeather100": 981,
    "cpResearch100": 589,
    "pveScore": 24,
    "dps": 16.55,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "generation": 1
  },
  {
    "name": "Muk",
    "pokedexId": 89,
    "slug": "muk",
    "types": [
      "Poison"
    ],
    "attack": 190,
    "defense": 172,
    "stamina": 233,
    "maxCp": 3117,
    "maxCp40": 2757,
    "cpRaid100": 1575,
    "cpWeather100": 1969,
    "cpResearch100": 1181,
    "pveScore": 42,
    "dps": 23.3,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "generation": 1
  },
  {
    "name": "Shellder",
    "pokedexId": 90,
    "slug": "shellder",
    "types": [
      "Water"
    ],
    "attack": 116,
    "defense": 134,
    "stamina": 102,
    "maxCp": 1221,
    "maxCp40": 1080,
    "cpRaid100": 617,
    "cpWeather100": 771,
    "cpResearch100": 463,
    "pveScore": 18,
    "dps": 13.27,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 1
  },
  {
    "name": "Cloyster",
    "pokedexId": 91,
    "slug": "cloyster",
    "types": [
      "Water",
      "Ice"
    ],
    "attack": 186,
    "defense": 256,
    "stamina": 137,
    "maxCp": 2880,
    "maxCp40": 2547,
    "cpRaid100": 1455,
    "cpWeather100": 1819,
    "cpResearch100": 1092,
    "pveScore": 37,
    "dps": 21.28,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 1
  },
  {
    "name": "Gastly",
    "pokedexId": 92,
    "slug": "gastly",
    "types": [
      "Ghost",
      "Poison"
    ],
    "attack": 186,
    "defense": 67,
    "stamina": 102,
    "maxCp": 1390,
    "maxCp40": 1229,
    "cpRaid100": 702,
    "cpWeather100": 878,
    "cpResearch100": 527,
    "pveScore": 28,
    "dps": 24.13,
    "bestFastMove": {
      "name": "Shadow Claw",
      "type": "Ghost"
    },
    "bestChargedMove": {
      "name": "Shadow Ball",
      "type": "Ghost"
    },
    "generation": 1
  },
  {
    "name": "Haunter",
    "pokedexId": 93,
    "slug": "haunter",
    "types": [
      "Ghost",
      "Poison"
    ],
    "attack": 222,
    "defense": 107,
    "stamina": 128,
    "maxCp": 2210,
    "maxCp40": 1955,
    "cpRaid100": 1117,
    "cpWeather100": 1396,
    "cpResearch100": 837,
    "pveScore": 39,
    "dps": 28.8,
    "bestFastMove": {
      "name": "Shadow Claw",
      "type": "Ghost"
    },
    "bestChargedMove": {
      "name": "Shadow Ball",
      "type": "Ghost"
    },
    "generation": 1
  },
  {
    "name": "Gengar",
    "pokedexId": 94,
    "slug": "gengar",
    "types": [
      "Ghost",
      "Poison"
    ],
    "attack": 261,
    "defense": 148,
    "stamina": 155,
    "maxCp": 3244,
    "maxCp40": 2869,
    "cpRaid100": 1639,
    "cpWeather100": 2049,
    "cpResearch100": 1229,
    "pveScore": 53,
    "dps": 33.86,
    "bestFastMove": {
      "name": "Shadow Claw",
      "type": "Ghost"
    },
    "bestChargedMove": {
      "name": "Shadow Ball",
      "type": "Ghost"
    },
    "generation": 1
  },
  {
    "name": "Onix",
    "pokedexId": 95,
    "slug": "onix",
    "types": [
      "Rock",
      "Ground"
    ],
    "attack": 85,
    "defense": 231,
    "stamina": 111,
    "maxCp": 1243,
    "maxCp40": 1099,
    "cpRaid100": 628,
    "cpWeather100": 785,
    "cpResearch100": 471,
    "pveScore": 16,
    "dps": 9.8,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 1
  },
  {
    "name": "Drowzee",
    "pokedexId": 96,
    "slug": "drowzee",
    "types": [
      "Psychic"
    ],
    "attack": 88,
    "defense": 137,
    "stamina": 155,
    "maxCp": 1169,
    "maxCp40": 1034,
    "cpRaid100": 590,
    "cpWeather100": 738,
    "cpResearch100": 443,
    "pveScore": 17,
    "dps": 10.84,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 1
  },
  {
    "name": "Hypno",
    "pokedexId": 97,
    "slug": "hypno",
    "types": [
      "Psychic"
    ],
    "attack": 144,
    "defense": 193,
    "stamina": 198,
    "maxCp": 2363,
    "maxCp40": 2090,
    "cpRaid100": 1194,
    "cpWeather100": 1493,
    "cpResearch100": 895,
    "pveScore": 31,
    "dps": 17.74,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 1
  },
  {
    "name": "Krabby",
    "pokedexId": 98,
    "slug": "krabby",
    "types": [
      "Water"
    ],
    "attack": 180,
    "defense": 125,
    "stamina": 102,
    "maxCp": 1762,
    "maxCp40": 1558,
    "cpRaid100": 890,
    "cpWeather100": 1113,
    "cpResearch100": 668,
    "pveScore": 28,
    "dps": 20.6,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 1
  },
  {
    "name": "Kingler",
    "pokedexId": 99,
    "slug": "kingler",
    "types": [
      "Water"
    ],
    "attack": 240,
    "defense": 181,
    "stamina": 146,
    "maxCp": 3198,
    "maxCp40": 2829,
    "cpRaid100": 1616,
    "cpWeather100": 2020,
    "cpResearch100": 1212,
    "pveScore": 44,
    "dps": 27.46,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 1
  },
  {
    "name": "Voltorb",
    "pokedexId": 100,
    "slug": "voltorb",
    "types": [
      "Electric"
    ],
    "attack": 109,
    "defense": 112,
    "stamina": 120,
    "maxCp": 1146,
    "maxCp40": 1014,
    "cpRaid100": 579,
    "cpWeather100": 724,
    "cpResearch100": 434,
    "pveScore": 17,
    "dps": 12.47,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 1
  },
  {
    "name": "Electrode",
    "pokedexId": 101,
    "slug": "electrode",
    "types": [
      "Electric"
    ],
    "attack": 175,
    "defense": 175,
    "stamina": 155,
    "maxCp": 2411,
    "maxCp40": 2132,
    "cpRaid100": 1218,
    "cpWeather100": 1523,
    "cpResearch100": 914,
    "pveScore": 33,
    "dps": 20.02,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 1
  },
  {
    "name": "Exeggcute",
    "pokedexId": 102,
    "slug": "exeggcute",
    "types": [
      "Grass",
      "Psychic"
    ],
    "attack": 107,
    "defense": 124,
    "stamina": 155,
    "maxCp": 1324,
    "maxCp40": 1171,
    "cpRaid100": 669,
    "cpWeather100": 836,
    "cpResearch100": 502,
    "pveScore": 20,
    "dps": 13.64,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 1
  },
  {
    "name": "Exeggutor",
    "pokedexId": 103,
    "slug": "exeggutor",
    "types": [
      "Grass",
      "Psychic"
    ],
    "attack": 233,
    "defense": 156,
    "stamina": 216,
    "maxCp": 3480,
    "maxCp40": 3078,
    "cpRaid100": 1759,
    "cpWeather100": 2198,
    "cpResearch100": 1319,
    "pveScore": 51,
    "dps": 29.71,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 1
  },
  {
    "name": "Cubone",
    "pokedexId": 104,
    "slug": "cubone",
    "types": [
      "Ground"
    ],
    "attack": 90,
    "defense": 144,
    "stamina": 137,
    "maxCp": 1152,
    "maxCp40": 1019,
    "cpRaid100": 582,
    "cpWeather100": 728,
    "cpResearch100": 436,
    "pveScore": 17,
    "dps": 11.19,
    "bestFastMove": {
      "name": "Mud-Slap",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Earthquake",
      "type": "Ground"
    },
    "generation": 1
  },
  {
    "name": "Marowak",
    "pokedexId": 105,
    "slug": "marowak",
    "types": [
      "Ground"
    ],
    "attack": 143,
    "defense": 186,
    "stamina": 155,
    "maxCp": 2062,
    "maxCp40": 1824,
    "cpRaid100": 1042,
    "cpWeather100": 1303,
    "cpResearch100": 781,
    "pveScore": 29,
    "dps": 17.77,
    "bestFastMove": {
      "name": "Mud-Slap",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Earthquake",
      "type": "Ground"
    },
    "generation": 1
  },
  {
    "name": "Hitmonlee",
    "pokedexId": 106,
    "slug": "hitmonlee",
    "types": [
      "Fighting"
    ],
    "attack": 224,
    "defense": 182,
    "stamina": 137,
    "maxCp": 2920,
    "maxCp40": 2583,
    "cpRaid100": 1475,
    "cpWeather100": 1845,
    "cpResearch100": 1107,
    "pveScore": 46,
    "dps": 28.87,
    "bestFastMove": {
      "name": "Counter",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Dynamic Punch",
      "type": "Fighting"
    },
    "generation": 1
  },
  {
    "name": "Hitmonchan",
    "pokedexId": 107,
    "slug": "hitmonchan",
    "types": [
      "Fighting"
    ],
    "attack": 193,
    "defense": 197,
    "stamina": 137,
    "maxCp": 2636,
    "maxCp40": 2332,
    "cpRaid100": 1332,
    "cpWeather100": 1665,
    "cpResearch100": 999,
    "pveScore": 40,
    "dps": 24.88,
    "bestFastMove": {
      "name": "Counter",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Dynamic Punch",
      "type": "Fighting"
    },
    "generation": 1
  },
  {
    "name": "Lickitung",
    "pokedexId": 108,
    "slug": "lickitung",
    "types": [
      "Normal"
    ],
    "attack": 108,
    "defense": 136,
    "stamina": 207,
    "maxCp": 1590,
    "maxCp40": 1406,
    "cpRaid100": 803,
    "cpWeather100": 1004,
    "cpResearch100": 602,
    "pveScore": 21,
    "dps": 13.04,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 1
  },
  {
    "name": "Koffing",
    "pokedexId": 109,
    "slug": "koffing",
    "types": [
      "Poison"
    ],
    "attack": 118,
    "defense": 140,
    "stamina": 120,
    "maxCp": 1358,
    "maxCp40": 1201,
    "cpRaid100": 686,
    "cpWeather100": 858,
    "cpResearch100": 515,
    "pveScore": 21,
    "dps": 14.47,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "generation": 1
  },
  {
    "name": "Weezing",
    "pokedexId": 110,
    "slug": "weezing",
    "types": [
      "Poison"
    ],
    "attack": 173,
    "defense": 196,
    "stamina": 163,
    "maxCp": 2572,
    "maxCp40": 2275,
    "cpRaid100": 1300,
    "cpWeather100": 1625,
    "cpResearch100": 975,
    "pveScore": 36,
    "dps": 21.21,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "generation": 1
  },
  {
    "name": "Rhyhorn",
    "pokedexId": 111,
    "slug": "rhyhorn",
    "types": [
      "Ground",
      "Rock"
    ],
    "attack": 141,
    "defense": 127,
    "stamina": 190,
    "maxCp": 1879,
    "maxCp40": 1662,
    "cpRaid100": 949,
    "cpWeather100": 1187,
    "cpResearch100": 712,
    "pveScore": 28,
    "dps": 17.52,
    "bestFastMove": {
      "name": "Mud-Slap",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Earthquake",
      "type": "Ground"
    },
    "generation": 1
  },
  {
    "name": "Rhydon",
    "pokedexId": 112,
    "slug": "rhydon",
    "types": [
      "Ground",
      "Rock"
    ],
    "attack": 222,
    "defense": 171,
    "stamina": 233,
    "maxCp": 3594,
    "maxCp40": 3179,
    "cpRaid100": 1816,
    "cpWeather100": 2270,
    "cpResearch100": 1362,
    "pveScore": 49,
    "dps": 27.59,
    "bestFastMove": {
      "name": "Mud-Slap",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Earthquake",
      "type": "Ground"
    },
    "generation": 1
  },
  {
    "name": "Chansey",
    "pokedexId": 113,
    "slug": "chansey",
    "types": [
      "Normal"
    ],
    "attack": 59,
    "defense": 128,
    "stamina": 487,
    "maxCp": 1399,
    "maxCp40": 1238,
    "cpRaid100": 707,
    "cpWeather100": 884,
    "cpResearch100": 530,
    "pveScore": 15,
    "dps": 7.13,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 1
  },
  {
    "name": "Tangela",
    "pokedexId": 114,
    "slug": "tangela",
    "types": [
      "Grass"
    ],
    "attack": 183,
    "defense": 169,
    "stamina": 163,
    "maxCp": 2530,
    "maxCp40": 2238,
    "cpRaid100": 1278,
    "cpWeather100": 1598,
    "cpResearch100": 959,
    "pveScore": 38,
    "dps": 23.33,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 1
  },
  {
    "name": "Kangaskhan",
    "pokedexId": 115,
    "slug": "kangaskhan",
    "types": [
      "Normal"
    ],
    "attack": 182,
    "defense": 165,
    "stamina": 233,
    "maxCp": 2938,
    "maxCp40": 2599,
    "cpRaid100": 1485,
    "cpWeather100": 1856,
    "cpResearch100": 1114,
    "pveScore": 39,
    "dps": 21.98,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 1
  },
  {
    "name": "Horsea",
    "pokedexId": 116,
    "slug": "horsea",
    "types": [
      "Water"
    ],
    "attack": 129,
    "defense": 103,
    "stamina": 102,
    "maxCp": 1194,
    "maxCp40": 1056,
    "cpRaid100": 603,
    "cpWeather100": 754,
    "cpResearch100": 452,
    "pveScore": 19,
    "dps": 14.76,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 1
  },
  {
    "name": "Seadra",
    "pokedexId": 117,
    "slug": "seadra",
    "types": [
      "Water"
    ],
    "attack": 186,
    "defense": 156,
    "stamina": 146,
    "maxCp": 2354,
    "maxCp40": 2083,
    "cpRaid100": 1190,
    "cpWeather100": 1487,
    "cpResearch100": 892,
    "pveScore": 33,
    "dps": 21.28,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 1
  },
  {
    "name": "Goldeen",
    "pokedexId": 118,
    "slug": "goldeen",
    "types": [
      "Water"
    ],
    "attack": 123,
    "defense": 110,
    "stamina": 128,
    "maxCp": 1302,
    "maxCp40": 1152,
    "cpRaid100": 658,
    "cpWeather100": 823,
    "cpResearch100": 493,
    "pveScore": 19,
    "dps": 14.07,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 1
  },
  {
    "name": "Seaking",
    "pokedexId": 119,
    "slug": "seaking",
    "types": [
      "Water"
    ],
    "attack": 175,
    "defense": 147,
    "stamina": 190,
    "maxCp": 2444,
    "maxCp40": 2162,
    "cpRaid100": 1235,
    "cpWeather100": 1544,
    "cpResearch100": 926,
    "pveScore": 33,
    "dps": 20.02,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 1
  },
  {
    "name": "Staryu",
    "pokedexId": 120,
    "slug": "staryu",
    "types": [
      "Water"
    ],
    "attack": 136,
    "defense": 112,
    "stamina": 102,
    "maxCp": 1299,
    "maxCp40": 1149,
    "cpRaid100": 656,
    "cpWeather100": 821,
    "cpResearch100": 492,
    "pveScore": 20,
    "dps": 15.56,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 1
  },
  {
    "name": "Starmie",
    "pokedexId": 121,
    "slug": "starmie",
    "types": [
      "Water",
      "Psychic"
    ],
    "attack": 209,
    "defense": 184,
    "stamina": 155,
    "maxCp": 2909,
    "maxCp40": 2573,
    "cpRaid100": 1470,
    "cpWeather100": 1838,
    "cpResearch100": 1102,
    "pveScore": 39,
    "dps": 23.92,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 1
  },
  {
    "name": "Mr. Mime",
    "pokedexId": 122,
    "slug": "mr-mime",
    "types": [
      "Psychic",
      "Fairy"
    ],
    "attack": 192,
    "defense": 205,
    "stamina": 120,
    "maxCp": 2518,
    "maxCp40": 2228,
    "cpRaid100": 1273,
    "cpWeather100": 1591,
    "cpResearch100": 954,
    "pveScore": 37,
    "dps": 23.65,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 1
  },
  {
    "name": "Scyther",
    "pokedexId": 123,
    "slug": "scyther",
    "types": [
      "Bug",
      "Flying"
    ],
    "attack": 219,
    "defense": 170,
    "stamina": 172,
    "maxCp": 3073,
    "maxCp40": 2718,
    "cpRaid100": 1553,
    "cpWeather100": 1941,
    "cpResearch100": 1165,
    "pveScore": 39,
    "dps": 23.8,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 1
  },
  {
    "name": "Jynx",
    "pokedexId": 124,
    "slug": "jynx",
    "types": [
      "Ice",
      "Psychic"
    ],
    "attack": 222,
    "defense": 151,
    "stamina": 163,
    "maxCp": 2876,
    "maxCp40": 2544,
    "cpRaid100": 1453,
    "cpWeather100": 1817,
    "cpResearch100": 1090,
    "pveScore": 40,
    "dps": 25.18,
    "bestFastMove": {
      "name": "Powder Snow",
      "type": "Ice"
    },
    "bestChargedMove": {
      "name": "Avalanche",
      "type": "Ice"
    },
    "generation": 1
  },
  {
    "name": "Electabuzz",
    "pokedexId": 125,
    "slug": "electabuzz",
    "types": [
      "Electric"
    ],
    "attack": 198,
    "defense": 158,
    "stamina": 163,
    "maxCp": 2639,
    "maxCp40": 2334,
    "cpRaid100": 1333,
    "cpWeather100": 1667,
    "cpResearch100": 1000,
    "pveScore": 36,
    "dps": 22.66,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 1
  },
  {
    "name": "Magmar",
    "pokedexId": 126,
    "slug": "magmar",
    "types": [
      "Fire"
    ],
    "attack": 206,
    "defense": 154,
    "stamina": 163,
    "maxCp": 2706,
    "maxCp40": 2394,
    "cpRaid100": 1367,
    "cpWeather100": 1710,
    "cpResearch100": 1026,
    "pveScore": 44,
    "dps": 27.47,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 1
  },
  {
    "name": "Pinsir",
    "pokedexId": 127,
    "slug": "pinsir",
    "types": [
      "Bug"
    ],
    "attack": 237,
    "defense": 181,
    "stamina": 163,
    "maxCp": 3323,
    "maxCp40": 2939,
    "cpRaid100": 1679,
    "cpWeather100": 2099,
    "cpResearch100": 1260,
    "pveScore": 43,
    "dps": 25.76,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 1
  },
  {
    "name": "Tauros",
    "pokedexId": 128,
    "slug": "tauros",
    "types": [
      "Normal"
    ],
    "attack": 198,
    "defense": 183,
    "stamina": 181,
    "maxCp": 2962,
    "maxCp40": 2620,
    "cpRaid100": 1497,
    "cpWeather100": 1872,
    "cpResearch100": 1123,
    "pveScore": 41,
    "dps": 23.91,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 1
  },
  {
    "name": "Magikarp",
    "pokedexId": 129,
    "slug": "magikarp",
    "types": [
      "Water"
    ],
    "attack": 29,
    "defense": 85,
    "stamina": 85,
    "maxCp": 310,
    "maxCp40": 274,
    "cpRaid100": 157,
    "cpWeather100": 196,
    "cpResearch100": 117,
    "pveScore": 15,
    "dps": 3.32,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 1
  },
  {
    "name": "Gyarados",
    "pokedexId": 130,
    "slug": "gyarados",
    "types": [
      "Water",
      "Flying"
    ],
    "attack": 237,
    "defense": 186,
    "stamina": 216,
    "maxCp": 3834,
    "maxCp40": 3391,
    "cpRaid100": 1937,
    "cpWeather100": 2422,
    "cpResearch100": 1453,
    "pveScore": 51,
    "dps": 28.26,
    "bestFastMove": {
      "name": "Waterfall",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Hydro Pump",
      "type": "Water"
    },
    "generation": 1
  },
  {
    "name": "Lapras",
    "pokedexId": 131,
    "slug": "lapras",
    "types": [
      "Water",
      "Ice"
    ],
    "attack": 165,
    "defense": 173,
    "stamina": 277,
    "maxCp": 2977,
    "maxCp40": 2634,
    "cpRaid100": 1505,
    "cpWeather100": 1881,
    "cpResearch100": 1128,
    "pveScore": 35,
    "dps": 18.88,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 1
  },
  {
    "name": "Ditto",
    "pokedexId": 132,
    "slug": "ditto",
    "types": [
      "Normal"
    ],
    "attack": 91,
    "defense": 91,
    "stamina": 134,
    "maxCp": 940,
    "maxCp40": 832,
    "cpRaid100": 475,
    "cpWeather100": 594,
    "cpResearch100": 356,
    "pveScore": 15,
    "dps": 10.99,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 1
  },
  {
    "name": "Eevee",
    "pokedexId": 133,
    "slug": "eevee",
    "types": [
      "Normal"
    ],
    "attack": 103,
    "defense": 114,
    "stamina": 146,
    "maxCp": 1200,
    "maxCp40": 1062,
    "cpRaid100": 606,
    "cpWeather100": 758,
    "cpResearch100": 455,
    "pveScore": 18,
    "dps": 12.44,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 1
  },
  {
    "name": "Vaporeon",
    "pokedexId": 134,
    "slug": "vaporeon",
    "types": [
      "Water"
    ],
    "attack": 205,
    "defense": 160,
    "stamina": 277,
    "maxCp": 3511,
    "maxCp40": 3106,
    "cpRaid100": 1774,
    "cpWeather100": 2218,
    "cpResearch100": 1331,
    "pveScore": 43,
    "dps": 23.46,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 1
  },
  {
    "name": "Jolteon",
    "pokedexId": 135,
    "slug": "jolteon",
    "types": [
      "Electric"
    ],
    "attack": 232,
    "defense": 182,
    "stamina": 163,
    "maxCp": 3265,
    "maxCp40": 2888,
    "cpRaid100": 1650,
    "cpWeather100": 2063,
    "cpResearch100": 1238,
    "pveScore": 44,
    "dps": 26.55,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 1
  },
  {
    "name": "Flareon",
    "pokedexId": 136,
    "slug": "flareon",
    "types": [
      "Fire"
    ],
    "attack": 246,
    "defense": 179,
    "stamina": 163,
    "maxCp": 3424,
    "maxCp40": 3029,
    "cpRaid100": 1730,
    "cpWeather100": 2163,
    "cpResearch100": 1298,
    "pveScore": 54,
    "dps": 32.8,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 1
  },
  {
    "name": "Porygon",
    "pokedexId": 137,
    "slug": "porygon",
    "types": [
      "Normal"
    ],
    "attack": 152,
    "defense": 136,
    "stamina": 163,
    "maxCp": 1933,
    "maxCp40": 1710,
    "cpRaid100": 977,
    "cpWeather100": 1221,
    "cpResearch100": 732,
    "pveScore": 28,
    "dps": 18.36,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 1
  },
  {
    "name": "Omanyte",
    "pokedexId": 138,
    "slug": "omanyte",
    "types": [
      "Rock",
      "Water"
    ],
    "attack": 154,
    "defense": 153,
    "stamina": 111,
    "maxCp": 1736,
    "maxCp40": 1535,
    "cpRaid100": 877,
    "cpWeather100": 1096,
    "cpResearch100": 658,
    "pveScore": 26,
    "dps": 17.76,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 1
  },
  {
    "name": "Omastar",
    "pokedexId": 139,
    "slug": "omastar",
    "types": [
      "Rock",
      "Water"
    ],
    "attack": 208,
    "defense": 200,
    "stamina": 172,
    "maxCp": 3157,
    "maxCp40": 2792,
    "cpRaid100": 1595,
    "cpWeather100": 1994,
    "cpResearch100": 1196,
    "pveScore": 41,
    "dps": 23.99,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 1
  },
  {
    "name": "Kabuto",
    "pokedexId": 140,
    "slug": "kabuto",
    "types": [
      "Rock",
      "Water"
    ],
    "attack": 148,
    "defense": 140,
    "stamina": 102,
    "maxCp": 1549,
    "maxCp40": 1370,
    "cpRaid100": 783,
    "cpWeather100": 979,
    "cpResearch100": 587,
    "pveScore": 24,
    "dps": 17.07,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 1
  },
  {
    "name": "Kabutops",
    "pokedexId": 141,
    "slug": "kabutops",
    "types": [
      "Rock",
      "Water"
    ],
    "attack": 220,
    "defense": 186,
    "stamina": 155,
    "maxCp": 3067,
    "maxCp40": 2713,
    "cpRaid100": 1550,
    "cpWeather100": 1938,
    "cpResearch100": 1162,
    "pveScore": 42,
    "dps": 25.37,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 1
  },
  {
    "name": "Aerodactyl",
    "pokedexId": 142,
    "slug": "aerodactyl",
    "types": [
      "Rock",
      "Flying"
    ],
    "attack": 221,
    "defense": 158,
    "stamina": 190,
    "maxCp": 3138,
    "maxCp40": 2775,
    "cpRaid100": 1586,
    "cpWeather100": 1982,
    "cpResearch100": 1189,
    "pveScore": 42,
    "dps": 25.48,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 1
  },
  {
    "name": "Snorlax",
    "pokedexId": 143,
    "slug": "snorlax",
    "types": [
      "Normal"
    ],
    "attack": 190,
    "defense": 169,
    "stamina": 330,
    "maxCp": 3647,
    "maxCp40": 3225,
    "cpRaid100": 1843,
    "cpWeather100": 2304,
    "cpResearch100": 1382,
    "pveScore": 45,
    "dps": 22.95,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 1
  },
  {
    "name": "Articuno",
    "pokedexId": 144,
    "slug": "articuno",
    "types": [
      "Ice",
      "Flying"
    ],
    "attack": 191,
    "defense": 236,
    "stamina": 207,
    "maxCp": 3433,
    "maxCp40": 3037,
    "cpRaid100": 1735,
    "cpWeather100": 2169,
    "cpResearch100": 1301,
    "pveScore": 41,
    "dps": 21.67,
    "bestFastMove": {
      "name": "Powder Snow",
      "type": "Ice"
    },
    "bestChargedMove": {
      "name": "Avalanche",
      "type": "Ice"
    },
    "generation": 1
  },
  {
    "name": "Zapdos",
    "pokedexId": 145,
    "slug": "zapdos",
    "types": [
      "Electric",
      "Flying"
    ],
    "attack": 253,
    "defense": 185,
    "stamina": 207,
    "maxCp": 3987,
    "maxCp40": 3527,
    "cpRaid100": 2015,
    "cpWeather100": 2519,
    "cpResearch100": 1511,
    "pveScore": 51,
    "dps": 28.95,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 1
  },
  {
    "name": "Moltres",
    "pokedexId": 146,
    "slug": "moltres",
    "types": [
      "Fire",
      "Flying"
    ],
    "attack": 251,
    "defense": 182,
    "stamina": 207,
    "maxCp": 3927,
    "maxCp40": 3474,
    "cpRaid100": 1985,
    "cpWeather100": 2481,
    "cpResearch100": 1489,
    "pveScore": 59,
    "dps": 33.47,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 1
  },
  {
    "name": "Dratini",
    "pokedexId": 147,
    "slug": "dratini",
    "types": [
      "Dragon"
    ],
    "attack": 118,
    "defense": 91,
    "stamina": 121,
    "maxCp": 1127,
    "maxCp40": 997,
    "cpRaid100": 569,
    "cpWeather100": 712,
    "cpResearch100": 427,
    "pveScore": 19,
    "dps": 14.98,
    "bestFastMove": {
      "name": "Dragon Tail",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Outrage",
      "type": "Dragon"
    },
    "generation": 1
  },
  {
    "name": "Dragonair",
    "pokedexId": 148,
    "slug": "dragonair",
    "types": [
      "Dragon"
    ],
    "attack": 163,
    "defense": 135,
    "stamina": 156,
    "maxCp": 2012,
    "maxCp40": 1780,
    "cpRaid100": 1017,
    "cpWeather100": 1271,
    "cpResearch100": 763,
    "pveScore": 32,
    "dps": 20.7,
    "bestFastMove": {
      "name": "Dragon Tail",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Outrage",
      "type": "Dragon"
    },
    "generation": 1
  },
  {
    "name": "Dragonite",
    "pokedexId": 149,
    "slug": "dragonite",
    "types": [
      "Dragon",
      "Flying"
    ],
    "attack": 262,
    "defense": 198,
    "stamina": 209,
    "maxCp": 4272,
    "maxCp40": 3779,
    "cpRaid100": 2159,
    "cpWeather100": 2699,
    "cpResearch100": 1619,
    "pveScore": 60,
    "dps": 33.27,
    "bestFastMove": {
      "name": "Dragon Tail",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Outrage",
      "type": "Dragon"
    },
    "generation": 1
  },
  {
    "name": "Mew",
    "pokedexId": 151,
    "slug": "mew",
    "types": [
      "Psychic"
    ],
    "attack": 210,
    "defense": 210,
    "stamina": 225,
    "maxCp": 3691,
    "maxCp40": 3265,
    "cpRaid100": 1865,
    "cpWeather100": 2332,
    "cpResearch100": 1399,
    "pveScore": 48,
    "dps": 25.87,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 1
  },
  {
    "name": "Chikorita",
    "pokedexId": 152,
    "slug": "chikorita",
    "types": [
      "Grass"
    ],
    "attack": 92,
    "defense": 122,
    "stamina": 128,
    "maxCp": 1057,
    "maxCp40": 935,
    "cpRaid100": 534,
    "cpWeather100": 668,
    "cpResearch100": 400,
    "pveScore": 17,
    "dps": 11.73,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 2
  },
  {
    "name": "Bayleef",
    "pokedexId": 153,
    "slug": "bayleef",
    "types": [
      "Grass"
    ],
    "attack": 122,
    "defense": 155,
    "stamina": 155,
    "maxCp": 1644,
    "maxCp40": 1454,
    "cpRaid100": 831,
    "cpWeather100": 1039,
    "cpResearch100": 623,
    "pveScore": 25,
    "dps": 15.55,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 2
  },
  {
    "name": "Meganium",
    "pokedexId": 154,
    "slug": "meganium",
    "types": [
      "Grass"
    ],
    "attack": 167,
    "defense": 202,
    "stamina": 190,
    "maxCp": 2710,
    "maxCp40": 2397,
    "cpRaid100": 1369,
    "cpWeather100": 1712,
    "cpResearch100": 1027,
    "pveScore": 38,
    "dps": 21.29,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 2
  },
  {
    "name": "Cyndaquil",
    "pokedexId": 155,
    "slug": "cyndaquil",
    "types": [
      "Fire"
    ],
    "attack": 116,
    "defense": 93,
    "stamina": 118,
    "maxCp": 1108,
    "maxCp40": 980,
    "cpRaid100": 560,
    "cpWeather100": 700,
    "cpResearch100": 420,
    "pveScore": 20,
    "dps": 15.47,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 2
  },
  {
    "name": "Quilava",
    "pokedexId": 156,
    "slug": "quilava",
    "types": [
      "Fire"
    ],
    "attack": 158,
    "defense": 126,
    "stamina": 151,
    "maxCp": 1868,
    "maxCp40": 1653,
    "cpRaid100": 944,
    "cpWeather100": 1180,
    "cpResearch100": 708,
    "pveScore": 31,
    "dps": 21.07,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 2
  },
  {
    "name": "Typhlosion",
    "pokedexId": 157,
    "slug": "typhlosion",
    "types": [
      "Fire"
    ],
    "attack": 222,
    "defense": 173,
    "stamina": 186,
    "maxCp": 3253,
    "maxCp40": 2877,
    "cpRaid100": 1644,
    "cpWeather100": 2055,
    "cpResearch100": 1233,
    "pveScore": 50,
    "dps": 29.6,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 2
  },
  {
    "name": "Totodile",
    "pokedexId": 158,
    "slug": "totodile",
    "types": [
      "Water"
    ],
    "attack": 117,
    "defense": 109,
    "stamina": 137,
    "maxCp": 1279,
    "maxCp40": 1131,
    "cpRaid100": 646,
    "cpWeather100": 808,
    "cpResearch100": 485,
    "pveScore": 19,
    "dps": 13.39,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 2
  },
  {
    "name": "Croconaw",
    "pokedexId": 159,
    "slug": "croconaw",
    "types": [
      "Water"
    ],
    "attack": 149,
    "defense": 142,
    "stamina": 163,
    "maxCp": 1935,
    "maxCp40": 1712,
    "cpRaid100": 978,
    "cpWeather100": 1223,
    "cpResearch100": 733,
    "pveScore": 27,
    "dps": 17.05,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 2
  },
  {
    "name": "Feraligatr",
    "pokedexId": 160,
    "slug": "feraligatr",
    "types": [
      "Water"
    ],
    "attack": 205,
    "defense": 188,
    "stamina": 198,
    "maxCp": 3230,
    "maxCp40": 2857,
    "cpRaid100": 1632,
    "cpWeather100": 2040,
    "cpResearch100": 1224,
    "pveScore": 41,
    "dps": 23.46,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 2
  },
  {
    "name": "Sentret",
    "pokedexId": 161,
    "slug": "sentret",
    "types": [
      "Normal"
    ],
    "attack": 79,
    "defense": 73,
    "stamina": 111,
    "maxCp": 698,
    "maxCp40": 618,
    "cpRaid100": 353,
    "cpWeather100": 441,
    "cpResearch100": 264,
    "pveScore": 15,
    "dps": 9.54,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 2
  },
  {
    "name": "Furret",
    "pokedexId": 162,
    "slug": "furret",
    "types": [
      "Normal"
    ],
    "attack": 149,
    "defense": 125,
    "stamina": 198,
    "maxCp": 1999,
    "maxCp40": 1768,
    "cpRaid100": 1010,
    "cpWeather100": 1263,
    "cpResearch100": 758,
    "pveScore": 29,
    "dps": 18.0,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 2
  },
  {
    "name": "Hoothoot",
    "pokedexId": 163,
    "slug": "hoothoot",
    "types": [
      "Normal",
      "Flying"
    ],
    "attack": 67,
    "defense": 88,
    "stamina": 155,
    "maxCp": 766,
    "maxCp40": 677,
    "cpRaid100": 387,
    "cpWeather100": 484,
    "cpResearch100": 290,
    "pveScore": 15,
    "dps": 8.09,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 2
  },
  {
    "name": "Noctowl",
    "pokedexId": 164,
    "slug": "noctowl",
    "types": [
      "Normal",
      "Flying"
    ],
    "attack": 161,
    "defense": 156,
    "stamina": 225,
    "maxCp": 2517,
    "maxCp40": 2226,
    "cpRaid100": 1272,
    "cpWeather100": 1590,
    "cpResearch100": 954,
    "pveScore": 34,
    "dps": 19.44,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 2
  },
  {
    "name": "Ledyba",
    "pokedexId": 165,
    "slug": "ledyba",
    "types": [
      "Bug",
      "Flying"
    ],
    "attack": 72,
    "defense": 118,
    "stamina": 120,
    "maxCp": 823,
    "maxCp40": 728,
    "cpRaid100": 416,
    "cpWeather100": 520,
    "cpResearch100": 312,
    "pveScore": 15,
    "dps": 7.83,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 2
  },
  {
    "name": "Ledian",
    "pokedexId": 166,
    "slug": "ledian",
    "types": [
      "Bug",
      "Flying"
    ],
    "attack": 107,
    "defense": 178,
    "stamina": 146,
    "maxCp": 1518,
    "maxCp40": 1343,
    "cpRaid100": 767,
    "cpWeather100": 959,
    "cpResearch100": 575,
    "pveScore": 19,
    "dps": 11.63,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 2
  },
  {
    "name": "Spinarak",
    "pokedexId": 167,
    "slug": "spinarak",
    "types": [
      "Bug",
      "Poison"
    ],
    "attack": 105,
    "defense": 73,
    "stamina": 120,
    "maxCp": 923,
    "maxCp40": 816,
    "cpRaid100": 466,
    "cpWeather100": 583,
    "cpResearch100": 350,
    "pveScore": 15,
    "dps": 11.41,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 2
  },
  {
    "name": "Ariados",
    "pokedexId": 168,
    "slug": "ariados",
    "types": [
      "Bug",
      "Poison"
    ],
    "attack": 160,
    "defense": 130,
    "stamina": 172,
    "maxCp": 2034,
    "maxCp40": 1799,
    "cpRaid100": 1028,
    "cpWeather100": 1285,
    "cpResearch100": 771,
    "pveScore": 27,
    "dps": 17.39,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 2
  },
  {
    "name": "Crobat",
    "pokedexId": 169,
    "slug": "crobat",
    "types": [
      "Poison",
      "Flying"
    ],
    "attack": 194,
    "defense": 178,
    "stamina": 198,
    "maxCp": 2992,
    "maxCp40": 2646,
    "cpRaid100": 1512,
    "cpWeather100": 1890,
    "cpResearch100": 1134,
    "pveScore": 41,
    "dps": 23.79,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "generation": 2
  },
  {
    "name": "Chinchou",
    "pokedexId": 170,
    "slug": "chinchou",
    "types": [
      "Water",
      "Electric"
    ],
    "attack": 106,
    "defense": 97,
    "stamina": 181,
    "maxCp": 1265,
    "maxCp40": 1119,
    "cpRaid100": 639,
    "cpWeather100": 799,
    "cpResearch100": 479,
    "pveScore": 18,
    "dps": 12.13,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 2
  },
  {
    "name": "Lanturn",
    "pokedexId": 171,
    "slug": "lanturn",
    "types": [
      "Water",
      "Electric"
    ],
    "attack": 145,
    "defense": 136,
    "stamina": 268,
    "maxCp": 2335,
    "maxCp40": 2065,
    "cpRaid100": 1180,
    "cpWeather100": 1475,
    "cpResearch100": 885,
    "pveScore": 29,
    "dps": 16.59,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 2
  },
  {
    "name": "Pichu",
    "pokedexId": 172,
    "slug": "pichu",
    "types": [
      "Electric"
    ],
    "attack": 76,
    "defense": 53,
    "stamina": 85,
    "maxCp": 529,
    "maxCp40": 468,
    "cpRaid100": 267,
    "cpWeather100": 334,
    "cpResearch100": 200,
    "pveScore": 15,
    "dps": 8.7,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 2
  },
  {
    "name": "Cleffa",
    "pokedexId": 173,
    "slug": "cleffa",
    "types": [
      "Fairy"
    ],
    "attack": 75,
    "defense": 79,
    "stamina": 137,
    "maxCp": 759,
    "maxCp40": 671,
    "cpRaid100": 383,
    "cpWeather100": 479,
    "cpResearch100": 287,
    "pveScore": 15,
    "dps": 9.09,
    "bestFastMove": {
      "name": "Charm",
      "type": "Fairy"
    },
    "bestChargedMove": {
      "name": "Dazzling Gleam",
      "type": "Fairy"
    },
    "generation": 2
  },
  {
    "name": "Igglybuff",
    "pokedexId": 174,
    "slug": "igglybuff",
    "types": [
      "Normal",
      "Fairy"
    ],
    "attack": 68,
    "defense": 32,
    "stamina": 207,
    "maxCp": 598,
    "maxCp40": 529,
    "cpRaid100": 302,
    "cpWeather100": 378,
    "cpResearch100": 226,
    "pveScore": 15,
    "dps": 8.21,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 2
  },
  {
    "name": "Togepi",
    "pokedexId": 175,
    "slug": "togepi",
    "types": [
      "Fairy"
    ],
    "attack": 67,
    "defense": 116,
    "stamina": 111,
    "maxCp": 743,
    "maxCp40": 657,
    "cpRaid100": 375,
    "cpWeather100": 470,
    "cpResearch100": 282,
    "pveScore": 15,
    "dps": 8.12,
    "bestFastMove": {
      "name": "Charm",
      "type": "Fairy"
    },
    "bestChargedMove": {
      "name": "Dazzling Gleam",
      "type": "Fairy"
    },
    "generation": 2
  },
  {
    "name": "Togetic",
    "pokedexId": 176,
    "slug": "togetic",
    "types": [
      "Fairy",
      "Flying"
    ],
    "attack": 140,
    "defense": 181,
    "stamina": 146,
    "maxCp": 1944,
    "maxCp40": 1719,
    "cpRaid100": 982,
    "cpWeather100": 1228,
    "cpResearch100": 737,
    "pveScore": 27,
    "dps": 16.97,
    "bestFastMove": {
      "name": "Charm",
      "type": "Fairy"
    },
    "bestChargedMove": {
      "name": "Dazzling Gleam",
      "type": "Fairy"
    },
    "generation": 2
  },
  {
    "name": "Natu",
    "pokedexId": 177,
    "slug": "natu",
    "types": [
      "Psychic",
      "Flying"
    ],
    "attack": 134,
    "defense": 89,
    "stamina": 120,
    "maxCp": 1246,
    "maxCp40": 1102,
    "cpRaid100": 630,
    "cpWeather100": 787,
    "cpResearch100": 472,
    "pveScore": 21,
    "dps": 16.51,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 2
  },
  {
    "name": "Xatu",
    "pokedexId": 178,
    "slug": "xatu",
    "types": [
      "Psychic",
      "Flying"
    ],
    "attack": 192,
    "defense": 146,
    "stamina": 163,
    "maxCp": 2474,
    "maxCp40": 2188,
    "cpRaid100": 1250,
    "cpWeather100": 1563,
    "cpResearch100": 938,
    "pveScore": 37,
    "dps": 23.65,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 2
  },
  {
    "name": "Mareep",
    "pokedexId": 179,
    "slug": "mareep",
    "types": [
      "Electric"
    ],
    "attack": 114,
    "defense": 79,
    "stamina": 146,
    "maxCp": 1120,
    "maxCp40": 991,
    "cpRaid100": 566,
    "cpWeather100": 708,
    "cpResearch100": 424,
    "pveScore": 17,
    "dps": 13.04,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 2
  },
  {
    "name": "Flaaffy",
    "pokedexId": 180,
    "slug": "flaaffy",
    "types": [
      "Electric"
    ],
    "attack": 145,
    "defense": 109,
    "stamina": 172,
    "maxCp": 1720,
    "maxCp40": 1521,
    "cpRaid100": 869,
    "cpWeather100": 1086,
    "cpResearch100": 652,
    "pveScore": 25,
    "dps": 16.59,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 2
  },
  {
    "name": "Ampharos",
    "pokedexId": 181,
    "slug": "ampharos",
    "types": [
      "Electric"
    ],
    "attack": 211,
    "defense": 169,
    "stamina": 207,
    "maxCp": 3225,
    "maxCp40": 2852,
    "cpRaid100": 1630,
    "cpWeather100": 2037,
    "cpResearch100": 1222,
    "pveScore": 42,
    "dps": 24.14,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 2
  },
  {
    "name": "Bellossom",
    "pokedexId": 182,
    "slug": "bellossom",
    "types": [
      "Grass"
    ],
    "attack": 169,
    "defense": 186,
    "stamina": 181,
    "maxCp": 2578,
    "maxCp40": 2281,
    "cpRaid100": 1303,
    "cpWeather100": 1629,
    "cpResearch100": 977,
    "pveScore": 37,
    "dps": 21.55,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 2
  },
  {
    "name": "Marill",
    "pokedexId": 183,
    "slug": "marill",
    "types": [
      "Water",
      "Fairy"
    ],
    "attack": 37,
    "defense": 93,
    "stamina": 172,
    "maxCp": 521,
    "maxCp40": 461,
    "cpRaid100": 263,
    "cpWeather100": 329,
    "cpResearch100": 197,
    "pveScore": 15,
    "dps": 4.23,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 2
  },
  {
    "name": "Azumarill",
    "pokedexId": 184,
    "slug": "azumarill",
    "types": [
      "Water",
      "Fairy"
    ],
    "attack": 112,
    "defense": 152,
    "stamina": 225,
    "maxCp": 1795,
    "maxCp40": 1588,
    "cpRaid100": 907,
    "cpWeather100": 1134,
    "cpResearch100": 680,
    "pveScore": 22,
    "dps": 12.82,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 2
  },
  {
    "name": "Sudowoodo",
    "pokedexId": 185,
    "slug": "sudowoodo",
    "types": [
      "Rock"
    ],
    "attack": 166,
    "defense": 175,
    "stamina": 172,
    "maxCp": 2409,
    "maxCp40": 2130,
    "cpRaid100": 1217,
    "cpWeather100": 1522,
    "cpResearch100": 913,
    "pveScore": 32,
    "dps": 19.14,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 2
  },
  {
    "name": "Politoed",
    "pokedexId": 186,
    "slug": "politoed",
    "types": [
      "Water"
    ],
    "attack": 174,
    "defense": 179,
    "stamina": 207,
    "maxCp": 2769,
    "maxCp40": 2449,
    "cpRaid100": 1399,
    "cpWeather100": 1749,
    "cpResearch100": 1049,
    "pveScore": 35,
    "dps": 19.91,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 2
  },
  {
    "name": "Hoppip",
    "pokedexId": 187,
    "slug": "hoppip",
    "types": [
      "Grass",
      "Flying"
    ],
    "attack": 66,
    "defense": 94,
    "stamina": 111,
    "maxCp": 670,
    "maxCp40": 592,
    "cpRaid100": 338,
    "cpWeather100": 423,
    "cpResearch100": 254,
    "pveScore": 15,
    "dps": 8.41,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 2
  },
  {
    "name": "Skiploom",
    "pokedexId": 188,
    "slug": "skiploom",
    "types": [
      "Grass",
      "Flying"
    ],
    "attack": 91,
    "defense": 120,
    "stamina": 146,
    "maxCp": 1103,
    "maxCp40": 976,
    "cpRaid100": 557,
    "cpWeather100": 697,
    "cpResearch100": 418,
    "pveScore": 17,
    "dps": 11.6,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 2
  },
  {
    "name": "Jumpluff",
    "pokedexId": 189,
    "slug": "jumpluff",
    "types": [
      "Grass",
      "Flying"
    ],
    "attack": 118,
    "defense": 183,
    "stamina": 181,
    "maxCp": 1850,
    "maxCp40": 1636,
    "cpRaid100": 935,
    "cpWeather100": 1168,
    "cpResearch100": 701,
    "pveScore": 26,
    "dps": 15.04,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 2
  },
  {
    "name": "Aipom",
    "pokedexId": 190,
    "slug": "aipom",
    "types": [
      "Normal"
    ],
    "attack": 135,
    "defense": 112,
    "stamina": 146,
    "maxCp": 1514,
    "maxCp40": 1339,
    "cpRaid100": 765,
    "cpWeather100": 956,
    "cpResearch100": 574,
    "pveScore": 23,
    "dps": 16.3,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 2
  },
  {
    "name": "Sunkern",
    "pokedexId": 191,
    "slug": "sunkern",
    "types": [
      "Grass"
    ],
    "attack": 55,
    "defense": 55,
    "stamina": 102,
    "maxCp": 447,
    "maxCp40": 395,
    "cpRaid100": 226,
    "cpWeather100": 282,
    "cpResearch100": 169,
    "pveScore": 15,
    "dps": 7.01,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 2
  },
  {
    "name": "Sunflora",
    "pokedexId": 192,
    "slug": "sunflora",
    "types": [
      "Grass"
    ],
    "attack": 184,
    "defense": 134,
    "stamina": 181,
    "maxCp": 2401,
    "maxCp40": 2124,
    "cpRaid100": 1213,
    "cpWeather100": 1517,
    "cpResearch100": 910,
    "pveScore": 37,
    "dps": 23.46,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 2
  },
  {
    "name": "Yanma",
    "pokedexId": 193,
    "slug": "yanma",
    "types": [
      "Bug",
      "Flying"
    ],
    "attack": 153,
    "defense": 94,
    "stamina": 163,
    "maxCp": 1652,
    "maxCp40": 1461,
    "cpRaid100": 835,
    "cpWeather100": 1043,
    "cpResearch100": 626,
    "pveScore": 23,
    "dps": 16.63,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 2
  },
  {
    "name": "Wooper",
    "pokedexId": 194,
    "slug": "wooper",
    "types": [
      "Water",
      "Ground"
    ],
    "attack": 75,
    "defense": 66,
    "stamina": 146,
    "maxCp": 725,
    "maxCp40": 641,
    "cpRaid100": 366,
    "cpWeather100": 458,
    "cpResearch100": 275,
    "pveScore": 15,
    "dps": 8.58,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 2
  },
  {
    "name": "Quagsire",
    "pokedexId": 195,
    "slug": "quagsire",
    "types": [
      "Water",
      "Ground"
    ],
    "attack": 152,
    "defense": 143,
    "stamina": 216,
    "maxCp": 2252,
    "maxCp40": 1992,
    "cpRaid100": 1138,
    "cpWeather100": 1423,
    "cpResearch100": 854,
    "pveScore": 29,
    "dps": 17.39,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 2
  },
  {
    "name": "Espeon",
    "pokedexId": 196,
    "slug": "espeon",
    "types": [
      "Psychic"
    ],
    "attack": 261,
    "defense": 175,
    "stamina": 163,
    "maxCp": 3583,
    "maxCp40": 3170,
    "cpRaid100": 1811,
    "cpWeather100": 2264,
    "cpResearch100": 1358,
    "pveScore": 53,
    "dps": 32.15,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 2
  },
  {
    "name": "Umbreon",
    "pokedexId": 197,
    "slug": "umbreon",
    "types": [
      "Dark"
    ],
    "attack": 126,
    "defense": 240,
    "stamina": 216,
    "maxCp": 2416,
    "maxCp40": 2137,
    "cpRaid100": 1221,
    "cpWeather100": 1526,
    "cpResearch100": 916,
    "pveScore": 28,
    "dps": 14.53,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "generation": 2
  },
  {
    "name": "Murkrow",
    "pokedexId": 198,
    "slug": "murkrow",
    "types": [
      "Dark",
      "Flying"
    ],
    "attack": 175,
    "defense": 87,
    "stamina": 155,
    "maxCp": 1766,
    "maxCp40": 1562,
    "cpRaid100": 892,
    "cpWeather100": 1116,
    "cpResearch100": 669,
    "pveScore": 28,
    "dps": 20.18,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "generation": 2
  },
  {
    "name": "Slowking",
    "pokedexId": 199,
    "slug": "slowking",
    "types": [
      "Water",
      "Psychic"
    ],
    "attack": 176,
    "defense": 180,
    "stamina": 216,
    "maxCp": 2862,
    "maxCp40": 2531,
    "cpRaid100": 1446,
    "cpWeather100": 1808,
    "cpResearch100": 1085,
    "pveScore": 36,
    "dps": 20.14,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 2
  },
  {
    "name": "Misdreavus",
    "pokedexId": 200,
    "slug": "misdreavus",
    "types": [
      "Ghost"
    ],
    "attack": 167,
    "defense": 154,
    "stamina": 155,
    "maxCp": 2178,
    "maxCp40": 1926,
    "cpRaid100": 1100,
    "cpWeather100": 1376,
    "cpResearch100": 825,
    "pveScore": 34,
    "dps": 21.67,
    "bestFastMove": {
      "name": "Shadow Claw",
      "type": "Ghost"
    },
    "bestChargedMove": {
      "name": "Shadow Ball",
      "type": "Ghost"
    },
    "generation": 2
  },
  {
    "name": "Unown",
    "pokedexId": 201,
    "slug": "unown",
    "types": [
      "Psychic"
    ],
    "attack": 136,
    "defense": 91,
    "stamina": 134,
    "maxCp": 1339,
    "maxCp40": 1185,
    "cpRaid100": 677,
    "cpWeather100": 846,
    "cpResearch100": 508,
    "pveScore": 22,
    "dps": 16.75,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 2
  },
  {
    "name": "Wobbuffet",
    "pokedexId": 202,
    "slug": "wobbuffet",
    "types": [
      "Psychic"
    ],
    "attack": 60,
    "defense": 106,
    "stamina": 382,
    "maxCp": 1160,
    "maxCp40": 1026,
    "cpRaid100": 586,
    "cpWeather100": 733,
    "cpResearch100": 440,
    "pveScore": 15,
    "dps": 7.39,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 2
  },
  {
    "name": "Girafarig",
    "pokedexId": 203,
    "slug": "girafarig",
    "types": [
      "Normal",
      "Psychic"
    ],
    "attack": 181,
    "defense": 133,
    "stamina": 172,
    "maxCp": 2302,
    "maxCp40": 2036,
    "cpRaid100": 1163,
    "cpWeather100": 1454,
    "cpResearch100": 872,
    "pveScore": 34,
    "dps": 21.86,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 2
  },
  {
    "name": "Pineco",
    "pokedexId": 204,
    "slug": "pineco",
    "types": [
      "Bug"
    ],
    "attack": 108,
    "defense": 122,
    "stamina": 137,
    "maxCp": 1253,
    "maxCp40": 1108,
    "cpRaid100": 633,
    "cpWeather100": 791,
    "cpResearch100": 475,
    "pveScore": 17,
    "dps": 11.74,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 2
  },
  {
    "name": "Forretress",
    "pokedexId": 205,
    "slug": "forretress",
    "types": [
      "Bug",
      "Steel"
    ],
    "attack": 160,
    "defense": 205,
    "stamina": 181,
    "maxCp": 2565,
    "maxCp40": 2269,
    "cpRaid100": 1296,
    "cpWeather100": 1621,
    "cpResearch100": 972,
    "pveScore": 31,
    "dps": 17.39,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 2
  },
  {
    "name": "Dunsparce",
    "pokedexId": 206,
    "slug": "dunsparce",
    "types": [
      "Normal"
    ],
    "attack": 130,
    "defense": 128,
    "stamina": 225,
    "maxCp": 1896,
    "maxCp40": 1677,
    "cpRaid100": 958,
    "cpWeather100": 1198,
    "cpResearch100": 719,
    "pveScore": 26,
    "dps": 15.7,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 2
  },
  {
    "name": "Gligar",
    "pokedexId": 207,
    "slug": "gligar",
    "types": [
      "Ground",
      "Flying"
    ],
    "attack": 143,
    "defense": 184,
    "stamina": 163,
    "maxCp": 2099,
    "maxCp40": 1857,
    "cpRaid100": 1061,
    "cpWeather100": 1326,
    "cpResearch100": 796,
    "pveScore": 30,
    "dps": 17.77,
    "bestFastMove": {
      "name": "Mud-Slap",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Earthquake",
      "type": "Ground"
    },
    "generation": 2
  },
  {
    "name": "Steelix",
    "pokedexId": 208,
    "slug": "steelix",
    "types": [
      "Steel",
      "Ground"
    ],
    "attack": 148,
    "defense": 272,
    "stamina": 181,
    "maxCp": 2729,
    "maxCp40": 2414,
    "cpRaid100": 1379,
    "cpWeather100": 1724,
    "cpResearch100": 1034,
    "pveScore": 31,
    "dps": 16.31,
    "bestFastMove": {
      "name": "Metal Claw",
      "type": "Steel"
    },
    "bestChargedMove": {
      "name": "Iron Head",
      "type": "Steel"
    },
    "generation": 2
  },
  {
    "name": "Snubbull",
    "pokedexId": 209,
    "slug": "snubbull",
    "types": [
      "Fairy"
    ],
    "attack": 136,
    "defense": 84,
    "stamina": 155,
    "maxCp": 1383,
    "maxCp40": 1223,
    "cpRaid100": 699,
    "cpWeather100": 873,
    "cpResearch100": 524,
    "pveScore": 22,
    "dps": 16.48,
    "bestFastMove": {
      "name": "Charm",
      "type": "Fairy"
    },
    "bestChargedMove": {
      "name": "Dazzling Gleam",
      "type": "Fairy"
    },
    "generation": 2
  },
  {
    "name": "Granbull",
    "pokedexId": 210,
    "slug": "granbull",
    "types": [
      "Fairy"
    ],
    "attack": 212,
    "defense": 130,
    "stamina": 207,
    "maxCp": 2875,
    "maxCp40": 2543,
    "cpRaid100": 1453,
    "cpWeather100": 1816,
    "cpResearch100": 1090,
    "pveScore": 42,
    "dps": 25.7,
    "bestFastMove": {
      "name": "Charm",
      "type": "Fairy"
    },
    "bestChargedMove": {
      "name": "Dazzling Gleam",
      "type": "Fairy"
    },
    "generation": 2
  },
  {
    "name": "Qwilfish",
    "pokedexId": 211,
    "slug": "qwilfish",
    "types": [
      "Water",
      "Poison"
    ],
    "attack": 184,
    "defense": 150,
    "stamina": 163,
    "maxCp": 2408,
    "maxCp40": 2130,
    "cpRaid100": 1217,
    "cpWeather100": 1521,
    "cpResearch100": 912,
    "pveScore": 33,
    "dps": 21.05,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 2
  },
  {
    "name": "Scizor",
    "pokedexId": 212,
    "slug": "scizor",
    "types": [
      "Bug",
      "Steel"
    ],
    "attack": 236,
    "defense": 181,
    "stamina": 172,
    "maxCp": 3393,
    "maxCp40": 3001,
    "cpRaid100": 1714,
    "cpWeather100": 2143,
    "cpResearch100": 1286,
    "pveScore": 43,
    "dps": 25.65,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 2
  },
  {
    "name": "Shuckle",
    "pokedexId": 213,
    "slug": "shuckle",
    "types": [
      "Bug",
      "Rock"
    ],
    "attack": 17,
    "defense": 396,
    "stamina": 85,
    "maxCp": 458,
    "maxCp40": 405,
    "cpRaid100": 231,
    "cpWeather100": 289,
    "cpResearch100": 173,
    "pveScore": 15,
    "dps": 1.85,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 2
  },
  {
    "name": "Heracross",
    "pokedexId": 214,
    "slug": "heracross",
    "types": [
      "Bug",
      "Fighting"
    ],
    "attack": 233,
    "defense": 178,
    "stamina": 190,
    "maxCp": 3483,
    "maxCp40": 3080,
    "cpRaid100": 1760,
    "cpWeather100": 2200,
    "cpResearch100": 1320,
    "pveScore": 43,
    "dps": 25.33,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 2
  },
  {
    "name": "Sneasel",
    "pokedexId": 215,
    "slug": "sneasel",
    "types": [
      "Dark",
      "Ice"
    ],
    "attack": 189,
    "defense": 146,
    "stamina": 146,
    "maxCp": 2319,
    "maxCp40": 2051,
    "cpRaid100": 1172,
    "cpWeather100": 1465,
    "cpResearch100": 879,
    "pveScore": 33,
    "dps": 21.79,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "generation": 2
  },
  {
    "name": "Teddiursa",
    "pokedexId": 216,
    "slug": "teddiursa",
    "types": [
      "Normal"
    ],
    "attack": 142,
    "defense": 93,
    "stamina": 155,
    "maxCp": 1502,
    "maxCp40": 1328,
    "cpRaid100": 759,
    "cpWeather100": 949,
    "cpResearch100": 569,
    "pveScore": 24,
    "dps": 17.15,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 2
  },
  {
    "name": "Ursaring",
    "pokedexId": 217,
    "slug": "ursaring",
    "types": [
      "Normal"
    ],
    "attack": 236,
    "defense": 144,
    "stamina": 207,
    "maxCp": 3329,
    "maxCp40": 2945,
    "cpRaid100": 1682,
    "cpWeather100": 2103,
    "cpResearch100": 1262,
    "pveScore": 47,
    "dps": 28.5,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 2
  },
  {
    "name": "Slugma",
    "pokedexId": 218,
    "slug": "slugma",
    "types": [
      "Fire"
    ],
    "attack": 118,
    "defense": 71,
    "stamina": 120,
    "maxCp": 1011,
    "maxCp40": 895,
    "cpRaid100": 511,
    "cpWeather100": 639,
    "cpResearch100": 383,
    "pveScore": 19,
    "dps": 15.73,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 2
  },
  {
    "name": "Magcargo",
    "pokedexId": 219,
    "slug": "magcargo",
    "types": [
      "Fire",
      "Rock"
    ],
    "attack": 155,
    "defense": 191,
    "stamina": 155,
    "maxCp": 2246,
    "maxCp40": 1986,
    "cpRaid100": 1135,
    "cpWeather100": 1419,
    "cpResearch100": 851,
    "pveScore": 34,
    "dps": 20.67,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 2
  },
  {
    "name": "Swinub",
    "pokedexId": 220,
    "slug": "swinub",
    "types": [
      "Ice",
      "Ground"
    ],
    "attack": 90,
    "defense": 69,
    "stamina": 137,
    "maxCp": 837,
    "maxCp40": 741,
    "cpRaid100": 423,
    "cpWeather100": 529,
    "cpResearch100": 317,
    "pveScore": 15,
    "dps": 10.21,
    "bestFastMove": {
      "name": "Powder Snow",
      "type": "Ice"
    },
    "bestChargedMove": {
      "name": "Avalanche",
      "type": "Ice"
    },
    "generation": 2
  },
  {
    "name": "Piloswine",
    "pokedexId": 221,
    "slug": "piloswine",
    "types": [
      "Ice",
      "Ground"
    ],
    "attack": 180,
    "defense": 138,
    "stamina": 225,
    "maxCp": 2638,
    "maxCp40": 2333,
    "cpRaid100": 1333,
    "cpWeather100": 1667,
    "cpResearch100": 1000,
    "pveScore": 34,
    "dps": 20.42,
    "bestFastMove": {
      "name": "Powder Snow",
      "type": "Ice"
    },
    "bestChargedMove": {
      "name": "Avalanche",
      "type": "Ice"
    },
    "generation": 2
  },
  {
    "name": "Corsola",
    "pokedexId": 222,
    "slug": "corsola",
    "types": [
      "Water",
      "Rock"
    ],
    "attack": 117,
    "defense": 175,
    "stamina": 163,
    "maxCp": 1714,
    "maxCp40": 1516,
    "cpRaid100": 866,
    "cpWeather100": 1082,
    "cpResearch100": 649,
    "pveScore": 22,
    "dps": 13.39,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 2
  },
  {
    "name": "Remoraid",
    "pokedexId": 223,
    "slug": "remoraid",
    "types": [
      "Water"
    ],
    "attack": 127,
    "defense": 69,
    "stamina": 111,
    "maxCp": 1031,
    "maxCp40": 912,
    "cpRaid100": 521,
    "cpWeather100": 651,
    "cpResearch100": 391,
    "pveScore": 17,
    "dps": 14.53,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 2
  },
  {
    "name": "Octillery",
    "pokedexId": 224,
    "slug": "octillery",
    "types": [
      "Water"
    ],
    "attack": 197,
    "defense": 141,
    "stamina": 181,
    "maxCp": 2617,
    "maxCp40": 2315,
    "cpRaid100": 1322,
    "cpWeather100": 1653,
    "cpResearch100": 992,
    "pveScore": 36,
    "dps": 22.54,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 2
  },
  {
    "name": "Delibird",
    "pokedexId": 225,
    "slug": "delibird",
    "types": [
      "Ice",
      "Flying"
    ],
    "attack": 128,
    "defense": 90,
    "stamina": 128,
    "maxCp": 1237,
    "maxCp40": 1094,
    "cpRaid100": 625,
    "cpWeather100": 781,
    "cpResearch100": 469,
    "pveScore": 19,
    "dps": 14.52,
    "bestFastMove": {
      "name": "Powder Snow",
      "type": "Ice"
    },
    "bestChargedMove": {
      "name": "Avalanche",
      "type": "Ice"
    },
    "generation": 2
  },
  {
    "name": "Mantine",
    "pokedexId": 226,
    "slug": "mantine",
    "types": [
      "Water",
      "Flying"
    ],
    "attack": 148,
    "defense": 225,
    "stamina": 198,
    "maxCp": 2602,
    "maxCp40": 2301,
    "cpRaid100": 1315,
    "cpWeather100": 1644,
    "cpResearch100": 986,
    "pveScore": 31,
    "dps": 16.94,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 2
  },
  {
    "name": "Skarmory",
    "pokedexId": 227,
    "slug": "skarmory",
    "types": [
      "Steel",
      "Flying"
    ],
    "attack": 148,
    "defense": 225,
    "stamina": 163,
    "maxCp": 2378,
    "maxCp40": 2104,
    "cpRaid100": 1202,
    "cpWeather100": 1503,
    "cpResearch100": 901,
    "pveScore": 29,
    "dps": 16.31,
    "bestFastMove": {
      "name": "Metal Claw",
      "type": "Steel"
    },
    "bestChargedMove": {
      "name": "Iron Head",
      "type": "Steel"
    },
    "generation": 2
  },
  {
    "name": "Houndour",
    "pokedexId": 228,
    "slug": "houndour",
    "types": [
      "Dark",
      "Fire"
    ],
    "attack": 152,
    "defense": 83,
    "stamina": 128,
    "maxCp": 1395,
    "maxCp40": 1234,
    "cpRaid100": 705,
    "cpWeather100": 881,
    "cpResearch100": 529,
    "pveScore": 23,
    "dps": 17.53,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "generation": 2
  },
  {
    "name": "Houndoom",
    "pokedexId": 229,
    "slug": "houndoom",
    "types": [
      "Dark",
      "Fire"
    ],
    "attack": 224,
    "defense": 143,
    "stamina": 181,
    "maxCp": 2969,
    "maxCp40": 2626,
    "cpRaid100": 1501,
    "cpWeather100": 1876,
    "cpResearch100": 1125,
    "pveScore": 41,
    "dps": 25.83,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "generation": 2
  },
  {
    "name": "Kingdra",
    "pokedexId": 230,
    "slug": "kingdra",
    "types": [
      "Water",
      "Dragon"
    ],
    "attack": 194,
    "defense": 194,
    "stamina": 181,
    "maxCp": 2986,
    "maxCp40": 2641,
    "cpRaid100": 1509,
    "cpWeather100": 1887,
    "cpResearch100": 1132,
    "pveScore": 38,
    "dps": 22.2,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 2
  },
  {
    "name": "Phanpy",
    "pokedexId": 231,
    "slug": "phanpy",
    "types": [
      "Ground"
    ],
    "attack": 107,
    "defense": 98,
    "stamina": 207,
    "maxCp": 1364,
    "maxCp40": 1206,
    "cpRaid100": 689,
    "cpWeather100": 862,
    "cpResearch100": 517,
    "pveScore": 20,
    "dps": 13.3,
    "bestFastMove": {
      "name": "Mud-Slap",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Earthquake",
      "type": "Ground"
    },
    "generation": 2
  },
  {
    "name": "Donphan",
    "pokedexId": 232,
    "slug": "donphan",
    "types": [
      "Ground"
    ],
    "attack": 214,
    "defense": 185,
    "stamina": 207,
    "maxCp": 3407,
    "maxCp40": 3013,
    "cpRaid100": 1722,
    "cpWeather100": 2152,
    "cpResearch100": 1291,
    "pveScore": 47,
    "dps": 26.6,
    "bestFastMove": {
      "name": "Mud-Slap",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Earthquake",
      "type": "Ground"
    },
    "generation": 2
  },
  {
    "name": "Porygon2",
    "pokedexId": 233,
    "slug": "porygon2",
    "types": [
      "Normal"
    ],
    "attack": 198,
    "defense": 181,
    "stamina": 198,
    "maxCp": 3073,
    "maxCp40": 2718,
    "cpRaid100": 1553,
    "cpWeather100": 1941,
    "cpResearch100": 1165,
    "pveScore": 42,
    "dps": 23.91,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 2
  },
  {
    "name": "Stantler",
    "pokedexId": 234,
    "slug": "stantler",
    "types": [
      "Normal"
    ],
    "attack": 191,
    "defense": 130,
    "stamina": 177,
    "maxCp": 2427,
    "maxCp40": 2146,
    "cpRaid100": 1226,
    "cpWeather100": 1533,
    "cpResearch100": 920,
    "pveScore": 36,
    "dps": 23.07,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 2
  },
  {
    "name": "Smeargle",
    "pokedexId": 235,
    "slug": "smeargle",
    "types": [
      "Normal"
    ],
    "attack": 40,
    "defense": 82,
    "stamina": 146,
    "maxCp": 485,
    "maxCp40": 429,
    "cpRaid100": 245,
    "cpWeather100": 306,
    "cpResearch100": 183,
    "pveScore": 15,
    "dps": 4.83,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 2
  },
  {
    "name": "Tyrogue",
    "pokedexId": 236,
    "slug": "tyrogue",
    "types": [
      "Fighting"
    ],
    "attack": 64,
    "defense": 64,
    "stamina": 111,
    "maxCp": 556,
    "maxCp40": 492,
    "cpRaid100": 281,
    "cpWeather100": 351,
    "cpResearch100": 210,
    "pveScore": 15,
    "dps": 8.25,
    "bestFastMove": {
      "name": "Counter",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Dynamic Punch",
      "type": "Fighting"
    },
    "generation": 2
  },
  {
    "name": "Hitmontop",
    "pokedexId": 237,
    "slug": "hitmontop",
    "types": [
      "Fighting"
    ],
    "attack": 173,
    "defense": 207,
    "stamina": 137,
    "maxCp": 2438,
    "maxCp40": 2156,
    "cpRaid100": 1232,
    "cpWeather100": 1540,
    "cpResearch100": 924,
    "pveScore": 37,
    "dps": 22.3,
    "bestFastMove": {
      "name": "Counter",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Dynamic Punch",
      "type": "Fighting"
    },
    "generation": 2
  },
  {
    "name": "Smoochum",
    "pokedexId": 238,
    "slug": "smoochum",
    "types": [
      "Ice",
      "Psychic"
    ],
    "attack": 153,
    "defense": 91,
    "stamina": 128,
    "maxCp": 1460,
    "maxCp40": 1291,
    "cpRaid100": 738,
    "cpWeather100": 922,
    "cpResearch100": 553,
    "pveScore": 23,
    "dps": 17.36,
    "bestFastMove": {
      "name": "Powder Snow",
      "type": "Ice"
    },
    "bestChargedMove": {
      "name": "Avalanche",
      "type": "Ice"
    },
    "generation": 2
  },
  {
    "name": "Elekid",
    "pokedexId": 239,
    "slug": "elekid",
    "types": [
      "Electric"
    ],
    "attack": 135,
    "defense": 100,
    "stamina": 128,
    "maxCp": 1358,
    "maxCp40": 1201,
    "cpRaid100": 686,
    "cpWeather100": 858,
    "cpResearch100": 514,
    "pveScore": 21,
    "dps": 15.45,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 2
  },
  {
    "name": "Magby",
    "pokedexId": 240,
    "slug": "magby",
    "types": [
      "Fire"
    ],
    "attack": 151,
    "defense": 98,
    "stamina": 128,
    "maxCp": 1489,
    "maxCp40": 1317,
    "cpRaid100": 753,
    "cpWeather100": 941,
    "cpResearch100": 564,
    "pveScore": 27,
    "dps": 20.13,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 2
  },
  {
    "name": "Miltank",
    "pokedexId": 241,
    "slug": "miltank",
    "types": [
      "Normal"
    ],
    "attack": 158,
    "defense": 193,
    "stamina": 216,
    "maxCp": 2677,
    "maxCp40": 2368,
    "cpRaid100": 1353,
    "cpWeather100": 1691,
    "cpResearch100": 1015,
    "pveScore": 34,
    "dps": 19.08,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 2
  },
  {
    "name": "Blissey",
    "pokedexId": 242,
    "slug": "blissey",
    "types": [
      "Normal"
    ],
    "attack": 128,
    "defense": 169,
    "stamina": 496,
    "maxCp": 3096,
    "maxCp40": 2738,
    "cpRaid100": 1564,
    "cpWeather100": 1956,
    "cpResearch100": 1173,
    "pveScore": 33,
    "dps": 15.46,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 2
  },
  {
    "name": "Raikou",
    "pokedexId": 243,
    "slug": "raikou",
    "types": [
      "Electric"
    ],
    "attack": 240,
    "defense": 196,
    "stamina": 207,
    "maxCp": 3896,
    "maxCp40": 3447,
    "cpRaid100": 1969,
    "cpWeather100": 2462,
    "cpResearch100": 1477,
    "pveScore": 49,
    "dps": 27.46,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 2
  },
  {
    "name": "Entei",
    "pokedexId": 244,
    "slug": "entei",
    "types": [
      "Fire"
    ],
    "attack": 235,
    "defense": 171,
    "stamina": 251,
    "maxCp": 3926,
    "maxCp40": 3473,
    "cpRaid100": 1984,
    "cpWeather100": 2480,
    "cpResearch100": 1488,
    "pveScore": 57,
    "dps": 31.33,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 2
  },
  {
    "name": "Suicune",
    "pokedexId": 245,
    "slug": "suicune",
    "types": [
      "Water"
    ],
    "attack": 180,
    "defense": 235,
    "stamina": 225,
    "maxCp": 3372,
    "maxCp40": 2983,
    "cpRaid100": 1704,
    "cpWeather100": 2130,
    "cpResearch100": 1278,
    "pveScore": 40,
    "dps": 20.6,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 2
  },
  {
    "name": "Larvitar",
    "pokedexId": 246,
    "slug": "larvitar",
    "types": [
      "Rock",
      "Ground"
    ],
    "attack": 115,
    "defense": 93,
    "stamina": 137,
    "maxCp": 1176,
    "maxCp40": 1040,
    "cpRaid100": 594,
    "cpWeather100": 743,
    "cpResearch100": 445,
    "pveScore": 18,
    "dps": 13.26,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 2
  },
  {
    "name": "Pupitar",
    "pokedexId": 247,
    "slug": "pupitar",
    "types": [
      "Rock",
      "Ground"
    ],
    "attack": 155,
    "defense": 133,
    "stamina": 172,
    "maxCp": 1996,
    "maxCp40": 1766,
    "cpRaid100": 1009,
    "cpWeather100": 1261,
    "cpResearch100": 757,
    "pveScore": 28,
    "dps": 17.87,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 2
  },
  {
    "name": "Lugia",
    "pokedexId": 249,
    "slug": "lugia",
    "types": [
      "Psychic",
      "Flying"
    ],
    "attack": 193,
    "defense": 310,
    "stamina": 235,
    "maxCp": 4186,
    "maxCp40": 3703,
    "cpRaid100": 2115,
    "cpWeather100": 2645,
    "cpResearch100": 1587,
    "pveScore": 49,
    "dps": 23.78,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 2
  },
  {
    "name": "Ho-Oh",
    "pokedexId": 250,
    "slug": "ho-oh",
    "types": [
      "Fire",
      "Flying"
    ],
    "attack": 239,
    "defense": 244,
    "stamina": 213,
    "maxCp": 4358,
    "maxCp40": 3855,
    "cpRaid100": 2202,
    "cpWeather100": 2753,
    "cpResearch100": 1652,
    "pveScore": 61,
    "dps": 31.87,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 2
  },
  {
    "name": "Celebi",
    "pokedexId": 251,
    "slug": "celebi",
    "types": [
      "Psychic",
      "Grass"
    ],
    "attack": 210,
    "defense": 210,
    "stamina": 225,
    "maxCp": 3691,
    "maxCp40": 3265,
    "cpRaid100": 1865,
    "cpWeather100": 2332,
    "cpResearch100": 1399,
    "pveScore": 48,
    "dps": 25.87,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 2
  },
  {
    "name": "Treecko",
    "pokedexId": 252,
    "slug": "treecko",
    "types": [
      "Grass"
    ],
    "attack": 124,
    "defense": 94,
    "stamina": 120,
    "maxCp": 1190,
    "maxCp40": 1053,
    "cpRaid100": 601,
    "cpWeather100": 752,
    "cpResearch100": 451,
    "pveScore": 21,
    "dps": 15.81,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 3
  },
  {
    "name": "Grovyle",
    "pokedexId": 253,
    "slug": "grovyle",
    "types": [
      "Grass"
    ],
    "attack": 172,
    "defense": 120,
    "stamina": 137,
    "maxCp": 1891,
    "maxCp40": 1673,
    "cpRaid100": 956,
    "cpWeather100": 1195,
    "cpResearch100": 717,
    "pveScore": 31,
    "dps": 21.93,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 3
  },
  {
    "name": "Sceptile",
    "pokedexId": 254,
    "slug": "sceptile",
    "types": [
      "Grass"
    ],
    "attack": 223,
    "defense": 169,
    "stamina": 172,
    "maxCp": 3117,
    "maxCp40": 2757,
    "cpRaid100": 1575,
    "cpWeather100": 1969,
    "cpResearch100": 1181,
    "pveScore": 46,
    "dps": 28.03,
    "bestFastMove": {
      "name": "Bullet Seed",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Frenzy Plant",
      "type": "Grass"
    },
    "generation": 3
  },
  {
    "name": "Torchic",
    "pokedexId": 255,
    "slug": "torchic",
    "types": [
      "Fire"
    ],
    "attack": 129,
    "defense": 87,
    "stamina": 128,
    "maxCp": 1228,
    "maxCp40": 1086,
    "cpRaid100": 620,
    "cpWeather100": 775,
    "cpResearch100": 465,
    "pveScore": 22,
    "dps": 17.2,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 3
  },
  {
    "name": "Combusken",
    "pokedexId": 256,
    "slug": "combusken",
    "types": [
      "Fire",
      "Fighting"
    ],
    "attack": 163,
    "defense": 115,
    "stamina": 155,
    "maxCp": 1868,
    "maxCp40": 1652,
    "cpRaid100": 944,
    "cpWeather100": 1180,
    "cpResearch100": 708,
    "pveScore": 32,
    "dps": 21.73,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 3
  },
  {
    "name": "Blaziken",
    "pokedexId": 257,
    "slug": "blaziken",
    "types": [
      "Fire",
      "Fighting"
    ],
    "attack": 240,
    "defense": 141,
    "stamina": 190,
    "maxCp": 3219,
    "maxCp40": 2848,
    "cpRaid100": 1627,
    "cpWeather100": 2034,
    "cpResearch100": 1220,
    "pveScore": 53,
    "dps": 32.73,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Blast Burn",
      "type": "Fire"
    },
    "generation": 3
  },
  {
    "name": "Mudkip",
    "pokedexId": 258,
    "slug": "mudkip",
    "types": [
      "Water"
    ],
    "attack": 126,
    "defense": 93,
    "stamina": 137,
    "maxCp": 1275,
    "maxCp40": 1128,
    "cpRaid100": 644,
    "cpWeather100": 805,
    "cpResearch100": 483,
    "pveScore": 19,
    "dps": 14.42,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 3
  },
  {
    "name": "Marshtomp",
    "pokedexId": 259,
    "slug": "marshtomp",
    "types": [
      "Water",
      "Ground"
    ],
    "attack": 156,
    "defense": 133,
    "stamina": 172,
    "maxCp": 2008,
    "maxCp40": 1776,
    "cpRaid100": 1015,
    "cpWeather100": 1269,
    "cpResearch100": 761,
    "pveScore": 28,
    "dps": 17.85,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 3
  },
  {
    "name": "Swampert",
    "pokedexId": 260,
    "slug": "swampert",
    "types": [
      "Water",
      "Ground"
    ],
    "attack": 207,
    "defense": 175,
    "stamina": 225,
    "maxCp": 3347,
    "maxCp40": 2960,
    "cpRaid100": 1691,
    "cpWeather100": 2114,
    "cpResearch100": 1269,
    "pveScore": 54,
    "dps": 30.41,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Hydro Cannon",
      "type": "Water"
    },
    "generation": 3
  },
  {
    "name": "Poochyena",
    "pokedexId": 261,
    "slug": "poochyena",
    "types": [
      "Dark"
    ],
    "attack": 95,
    "defense": 61,
    "stamina": 111,
    "maxCp": 760,
    "maxCp40": 672,
    "cpRaid100": 384,
    "cpWeather100": 480,
    "cpResearch100": 288,
    "pveScore": 15,
    "dps": 10.95,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "generation": 3
  },
  {
    "name": "Mightyena",
    "pokedexId": 262,
    "slug": "mightyena",
    "types": [
      "Dark"
    ],
    "attack": 171,
    "defense": 131,
    "stamina": 172,
    "maxCp": 2170,
    "maxCp40": 1919,
    "cpRaid100": 1096,
    "cpWeather100": 1371,
    "cpResearch100": 822,
    "pveScore": 31,
    "dps": 19.72,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "generation": 3
  },
  {
    "name": "Zigzagoon",
    "pokedexId": 263,
    "slug": "zigzagoon",
    "types": [
      "Normal"
    ],
    "attack": 58,
    "defense": 80,
    "stamina": 116,
    "maxCp": 575,
    "maxCp40": 508,
    "cpRaid100": 290,
    "cpWeather100": 363,
    "cpResearch100": 218,
    "pveScore": 15,
    "dps": 7.0,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 3
  },
  {
    "name": "Linoone",
    "pokedexId": 264,
    "slug": "linoone",
    "types": [
      "Normal"
    ],
    "attack": 142,
    "defense": 128,
    "stamina": 186,
    "maxCp": 1879,
    "maxCp40": 1662,
    "cpRaid100": 949,
    "cpWeather100": 1187,
    "cpResearch100": 712,
    "pveScore": 27,
    "dps": 17.15,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 3
  },
  {
    "name": "Wurmple",
    "pokedexId": 265,
    "slug": "wurmple",
    "types": [
      "Bug"
    ],
    "attack": 75,
    "defense": 59,
    "stamina": 128,
    "maxCp": 653,
    "maxCp40": 578,
    "cpRaid100": 330,
    "cpWeather100": 413,
    "cpResearch100": 247,
    "pveScore": 15,
    "dps": 8.15,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 3
  },
  {
    "name": "Silcoon",
    "pokedexId": 266,
    "slug": "silcoon",
    "types": [
      "Bug"
    ],
    "attack": 59,
    "defense": 77,
    "stamina": 137,
    "maxCp": 617,
    "maxCp40": 546,
    "cpRaid100": 312,
    "cpWeather100": 390,
    "cpResearch100": 234,
    "pveScore": 15,
    "dps": 6.41,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 3
  },
  {
    "name": "Beautifly",
    "pokedexId": 267,
    "slug": "beautifly",
    "types": [
      "Bug",
      "Flying"
    ],
    "attack": 189,
    "defense": 98,
    "stamina": 155,
    "maxCp": 1996,
    "maxCp40": 1765,
    "cpRaid100": 1009,
    "cpWeather100": 1261,
    "cpResearch100": 756,
    "pveScore": 29,
    "dps": 20.54,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 3
  },
  {
    "name": "Cascoon",
    "pokedexId": 268,
    "slug": "cascoon",
    "types": [
      "Bug"
    ],
    "attack": 59,
    "defense": 77,
    "stamina": 137,
    "maxCp": 617,
    "maxCp40": 546,
    "cpRaid100": 312,
    "cpWeather100": 390,
    "cpResearch100": 234,
    "pveScore": 15,
    "dps": 6.41,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 3
  },
  {
    "name": "Dustox",
    "pokedexId": 269,
    "slug": "dustox",
    "types": [
      "Bug",
      "Poison"
    ],
    "attack": 98,
    "defense": 162,
    "stamina": 155,
    "maxCp": 1384,
    "maxCp40": 1224,
    "cpRaid100": 699,
    "cpWeather100": 874,
    "cpResearch100": 524,
    "pveScore": 17,
    "dps": 10.65,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 3
  },
  {
    "name": "Lotad",
    "pokedexId": 270,
    "slug": "lotad",
    "types": [
      "Water",
      "Grass"
    ],
    "attack": 71,
    "defense": 77,
    "stamina": 120,
    "maxCp": 676,
    "maxCp40": 598,
    "cpRaid100": 342,
    "cpWeather100": 427,
    "cpResearch100": 256,
    "pveScore": 15,
    "dps": 8.12,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 3
  },
  {
    "name": "Lombre",
    "pokedexId": 271,
    "slug": "lombre",
    "types": [
      "Water",
      "Grass"
    ],
    "attack": 112,
    "defense": 119,
    "stamina": 155,
    "maxCp": 1353,
    "maxCp40": 1197,
    "cpRaid100": 684,
    "cpWeather100": 855,
    "cpResearch100": 513,
    "pveScore": 19,
    "dps": 12.82,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 3
  },
  {
    "name": "Ludicolo",
    "pokedexId": 272,
    "slug": "ludicolo",
    "types": [
      "Water",
      "Grass"
    ],
    "attack": 173,
    "defense": 176,
    "stamina": 190,
    "maxCp": 2626,
    "maxCp40": 2323,
    "cpRaid100": 1327,
    "cpWeather100": 1659,
    "cpResearch100": 995,
    "pveScore": 34,
    "dps": 19.8,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 3
  },
  {
    "name": "Seedot",
    "pokedexId": 273,
    "slug": "seedot",
    "types": [
      "Grass"
    ],
    "attack": 71,
    "defense": 77,
    "stamina": 120,
    "maxCp": 676,
    "maxCp40": 598,
    "cpRaid100": 342,
    "cpWeather100": 427,
    "cpResearch100": 256,
    "pveScore": 15,
    "dps": 9.05,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 3
  },
  {
    "name": "Nuzleaf",
    "pokedexId": 274,
    "slug": "nuzleaf",
    "types": [
      "Grass",
      "Dark"
    ],
    "attack": 133,
    "defense": 78,
    "stamina": 172,
    "maxCp": 1378,
    "maxCp40": 1219,
    "cpRaid100": 696,
    "cpWeather100": 870,
    "cpResearch100": 522,
    "pveScore": 23,
    "dps": 16.96,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 3
  },
  {
    "name": "Shiftry",
    "pokedexId": 275,
    "slug": "shiftry",
    "types": [
      "Grass",
      "Dark"
    ],
    "attack": 199,
    "defense": 121,
    "stamina": 207,
    "maxCp": 2625,
    "maxCp40": 2322,
    "cpRaid100": 1327,
    "cpWeather100": 1658,
    "cpResearch100": 995,
    "pveScore": 40,
    "dps": 25.37,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 3
  },
  {
    "name": "Taillow",
    "pokedexId": 276,
    "slug": "taillow",
    "types": [
      "Normal",
      "Flying"
    ],
    "attack": 106,
    "defense": 61,
    "stamina": 120,
    "maxCp": 865,
    "maxCp40": 765,
    "cpRaid100": 437,
    "cpWeather100": 546,
    "cpResearch100": 328,
    "pveScore": 15,
    "dps": 12.8,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 3
  },
  {
    "name": "Swellow",
    "pokedexId": 277,
    "slug": "swellow",
    "types": [
      "Normal",
      "Flying"
    ],
    "attack": 184,
    "defense": 124,
    "stamina": 155,
    "maxCp": 2159,
    "maxCp40": 1910,
    "cpRaid100": 1091,
    "cpWeather100": 1364,
    "cpResearch100": 818,
    "pveScore": 33,
    "dps": 22.22,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 3
  },
  {
    "name": "Wingull",
    "pokedexId": 278,
    "slug": "wingull",
    "types": [
      "Water",
      "Flying"
    ],
    "attack": 106,
    "defense": 61,
    "stamina": 120,
    "maxCp": 865,
    "maxCp40": 765,
    "cpRaid100": 437,
    "cpWeather100": 546,
    "cpResearch100": 328,
    "pveScore": 15,
    "dps": 12.13,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 3
  },
  {
    "name": "Pelipper",
    "pokedexId": 279,
    "slug": "pelipper",
    "types": [
      "Water",
      "Flying"
    ],
    "attack": 175,
    "defense": 174,
    "stamina": 155,
    "maxCp": 2404,
    "maxCp40": 2127,
    "cpRaid100": 1215,
    "cpWeather100": 1519,
    "cpResearch100": 911,
    "pveScore": 32,
    "dps": 20.02,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 3
  },
  {
    "name": "Ralts",
    "pokedexId": 280,
    "slug": "ralts",
    "types": [
      "Psychic",
      "Fairy"
    ],
    "attack": 79,
    "defense": 58,
    "stamina": 99,
    "maxCp": 605,
    "maxCp40": 535,
    "cpRaid100": 306,
    "cpWeather100": 382,
    "cpResearch100": 229,
    "pveScore": 15,
    "dps": 9.73,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 3
  },
  {
    "name": "Kirlia",
    "pokedexId": 281,
    "slug": "kirlia",
    "types": [
      "Psychic",
      "Fairy"
    ],
    "attack": 116,
    "defense": 90,
    "stamina": 116,
    "maxCp": 1084,
    "maxCp40": 959,
    "cpRaid100": 548,
    "cpWeather100": 685,
    "cpResearch100": 411,
    "pveScore": 18,
    "dps": 14.29,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 3
  },
  {
    "name": "Gardevoir",
    "pokedexId": 282,
    "slug": "gardevoir",
    "types": [
      "Psychic",
      "Fairy"
    ],
    "attack": 237,
    "defense": 194,
    "stamina": 169,
    "maxCp": 3489,
    "maxCp40": 3086,
    "cpRaid100": 1763,
    "cpWeather100": 2204,
    "cpResearch100": 1322,
    "pveScore": 49,
    "dps": 28.73,
    "bestFastMove": {
      "name": "Charm",
      "type": "Fairy"
    },
    "bestChargedMove": {
      "name": "Dazzling Gleam",
      "type": "Fairy"
    },
    "generation": 3
  },
  {
    "name": "Surskit",
    "pokedexId": 283,
    "slug": "surskit",
    "types": [
      "Bug",
      "Water"
    ],
    "attack": 93,
    "defense": 87,
    "stamina": 120,
    "maxCp": 894,
    "maxCp40": 791,
    "cpRaid100": 452,
    "cpWeather100": 565,
    "cpResearch100": 339,
    "pveScore": 15,
    "dps": 10.11,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 3
  },
  {
    "name": "Masquerain",
    "pokedexId": 284,
    "slug": "masquerain",
    "types": [
      "Bug",
      "Flying"
    ],
    "attack": 192,
    "defense": 150,
    "stamina": 172,
    "maxCp": 2567,
    "maxCp40": 2271,
    "cpRaid100": 1297,
    "cpWeather100": 1622,
    "cpResearch100": 973,
    "pveScore": 33,
    "dps": 20.87,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 3
  },
  {
    "name": "Shroomish",
    "pokedexId": 285,
    "slug": "shroomish",
    "types": [
      "Grass"
    ],
    "attack": 74,
    "defense": 110,
    "stamina": 155,
    "maxCp": 916,
    "maxCp40": 810,
    "cpRaid100": 463,
    "cpWeather100": 578,
    "cpResearch100": 347,
    "pveScore": 15,
    "dps": 9.43,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 3
  },
  {
    "name": "Breloom",
    "pokedexId": 286,
    "slug": "breloom",
    "types": [
      "Grass",
      "Fighting"
    ],
    "attack": 240,
    "defense": 144,
    "stamina": 155,
    "maxCp": 2960,
    "maxCp40": 2618,
    "cpRaid100": 1496,
    "cpWeather100": 1870,
    "cpResearch100": 1122,
    "pveScore": 47,
    "dps": 30.6,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 3
  },
  {
    "name": "Slakoth",
    "pokedexId": 287,
    "slug": "slakoth",
    "types": [
      "Normal"
    ],
    "attack": 104,
    "defense": 92,
    "stamina": 155,
    "maxCp": 1133,
    "maxCp40": 1002,
    "cpRaid100": 572,
    "cpWeather100": 716,
    "cpResearch100": 429,
    "pveScore": 17,
    "dps": 12.56,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 3
  },
  {
    "name": "Vigoroth",
    "pokedexId": 288,
    "slug": "vigoroth",
    "types": [
      "Normal"
    ],
    "attack": 158,
    "defense": 145,
    "stamina": 190,
    "maxCp": 2212,
    "maxCp40": 1956,
    "cpRaid100": 1118,
    "cpWeather100": 1397,
    "cpResearch100": 838,
    "pveScore": 31,
    "dps": 19.08,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 3
  },
  {
    "name": "Slaking",
    "pokedexId": 289,
    "slug": "slaking",
    "types": [
      "Normal"
    ],
    "attack": 290,
    "defense": 166,
    "stamina": 283,
    "maxCp": 5001,
    "maxCp40": 4424,
    "cpRaid100": 2528,
    "cpWeather100": 3160,
    "cpResearch100": 1896,
    "pveScore": 34,
    "dps": 18.47,
    "bestFastMove": {
      "name": "Yawn",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 3
  },
  {
    "name": "Nincada",
    "pokedexId": 290,
    "slug": "nincada",
    "types": [
      "Bug",
      "Ground"
    ],
    "attack": 80,
    "defense": 126,
    "stamina": 104,
    "maxCp": 868,
    "maxCp40": 768,
    "cpRaid100": 439,
    "cpWeather100": 549,
    "cpResearch100": 329,
    "pveScore": 15,
    "dps": 8.7,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 3
  },
  {
    "name": "Ninjask",
    "pokedexId": 291,
    "slug": "ninjask",
    "types": [
      "Bug",
      "Flying"
    ],
    "attack": 199,
    "defense": 113,
    "stamina": 156,
    "maxCp": 2235,
    "maxCp40": 1977,
    "cpRaid100": 1129,
    "cpWeather100": 1412,
    "cpResearch100": 847,
    "pveScore": 32,
    "dps": 21.63,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 3
  },
  {
    "name": "Shedinja",
    "pokedexId": 292,
    "slug": "shedinja",
    "types": [
      "Bug",
      "Ghost"
    ],
    "attack": 153,
    "defense": 73,
    "stamina": 51,
    "maxCp": 904,
    "maxCp40": 799,
    "cpRaid100": 456,
    "cpWeather100": 571,
    "cpResearch100": 342,
    "pveScore": 16,
    "dps": 16.63,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 3
  },
  {
    "name": "Whismur",
    "pokedexId": 293,
    "slug": "whismur",
    "types": [
      "Normal"
    ],
    "attack": 92,
    "defense": 42,
    "stamina": 162,
    "maxCp": 758,
    "maxCp40": 671,
    "cpRaid100": 383,
    "cpWeather100": 479,
    "cpResearch100": 287,
    "pveScore": 15,
    "dps": 11.11,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 3
  },
  {
    "name": "Loudred",
    "pokedexId": 294,
    "slug": "loudred",
    "types": [
      "Normal"
    ],
    "attack": 134,
    "defense": 81,
    "stamina": 197,
    "maxCp": 1500,
    "maxCp40": 1327,
    "cpRaid100": 758,
    "cpWeather100": 948,
    "cpResearch100": 569,
    "pveScore": 23,
    "dps": 16.18,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 3
  },
  {
    "name": "Exploud",
    "pokedexId": 295,
    "slug": "exploud",
    "types": [
      "Normal"
    ],
    "attack": 179,
    "defense": 137,
    "stamina": 232,
    "maxCp": 2654,
    "maxCp40": 2347,
    "cpRaid100": 1341,
    "cpWeather100": 1677,
    "cpResearch100": 1006,
    "pveScore": 37,
    "dps": 21.62,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 3
  },
  {
    "name": "Makuhita",
    "pokedexId": 296,
    "slug": "makuhita",
    "types": [
      "Fighting"
    ],
    "attack": 99,
    "defense": 54,
    "stamina": 176,
    "maxCp": 924,
    "maxCp40": 817,
    "cpRaid100": 467,
    "cpWeather100": 583,
    "cpResearch100": 350,
    "pveScore": 16,
    "dps": 12.76,
    "bestFastMove": {
      "name": "Counter",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Dynamic Punch",
      "type": "Fighting"
    },
    "generation": 3
  },
  {
    "name": "Hariyama",
    "pokedexId": 297,
    "slug": "hariyama",
    "types": [
      "Fighting"
    ],
    "attack": 209,
    "defense": 114,
    "stamina": 302,
    "maxCp": 3198,
    "maxCp40": 2829,
    "cpRaid100": 1616,
    "cpWeather100": 2020,
    "cpResearch100": 1212,
    "pveScore": 46,
    "dps": 26.94,
    "bestFastMove": {
      "name": "Counter",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Dynamic Punch",
      "type": "Fighting"
    },
    "generation": 3
  },
  {
    "name": "Azurill",
    "pokedexId": 298,
    "slug": "azurill",
    "types": [
      "Normal",
      "Fairy"
    ],
    "attack": 36,
    "defense": 71,
    "stamina": 137,
    "maxCp": 411,
    "maxCp40": 364,
    "cpRaid100": 208,
    "cpWeather100": 260,
    "cpResearch100": 156,
    "pveScore": 15,
    "dps": 4.35,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 3
  },
  {
    "name": "Nosepass",
    "pokedexId": 299,
    "slug": "nosepass",
    "types": [
      "Rock"
    ],
    "attack": 82,
    "defense": 215,
    "stamina": 102,
    "maxCp": 1123,
    "maxCp40": 993,
    "cpRaid100": 567,
    "cpWeather100": 709,
    "cpResearch100": 425,
    "pveScore": 15,
    "dps": 9.46,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 3
  },
  {
    "name": "Skitty",
    "pokedexId": 300,
    "slug": "skitty",
    "types": [
      "Normal"
    ],
    "attack": 83,
    "defense": 78,
    "stamina": 137,
    "maxCp": 822,
    "maxCp40": 727,
    "cpRaid100": 415,
    "cpWeather100": 519,
    "cpResearch100": 311,
    "pveScore": 15,
    "dps": 10.02,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 3
  },
  {
    "name": "Delcatty",
    "pokedexId": 301,
    "slug": "delcatty",
    "types": [
      "Normal"
    ],
    "attack": 131,
    "defense": 126,
    "stamina": 172,
    "maxCp": 1673,
    "maxCp40": 1480,
    "cpRaid100": 846,
    "cpWeather100": 1057,
    "cpResearch100": 634,
    "pveScore": 24,
    "dps": 15.82,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 3
  },
  {
    "name": "Sableye",
    "pokedexId": 302,
    "slug": "sableye",
    "types": [
      "Dark",
      "Ghost"
    ],
    "attack": 140,
    "defense": 135,
    "stamina": 137,
    "maxCp": 1652,
    "maxCp40": 1461,
    "cpRaid100": 835,
    "cpWeather100": 1044,
    "cpResearch100": 626,
    "pveScore": 24,
    "dps": 16.14,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "generation": 3
  },
  {
    "name": "Mawile",
    "pokedexId": 303,
    "slug": "mawile",
    "types": [
      "Steel",
      "Fairy"
    ],
    "attack": 154,
    "defense": 140,
    "stamina": 137,
    "maxCp": 1831,
    "maxCp40": 1620,
    "cpRaid100": 925,
    "cpWeather100": 1157,
    "cpResearch100": 694,
    "pveScore": 25,
    "dps": 16.97,
    "bestFastMove": {
      "name": "Metal Claw",
      "type": "Steel"
    },
    "bestChargedMove": {
      "name": "Iron Head",
      "type": "Steel"
    },
    "generation": 3
  },
  {
    "name": "Aron",
    "pokedexId": 304,
    "slug": "aron",
    "types": [
      "Steel",
      "Rock"
    ],
    "attack": 121,
    "defense": 141,
    "stamina": 137,
    "maxCp": 1478,
    "maxCp40": 1307,
    "cpRaid100": 747,
    "cpWeather100": 934,
    "cpResearch100": 560,
    "pveScore": 20,
    "dps": 13.34,
    "bestFastMove": {
      "name": "Metal Claw",
      "type": "Steel"
    },
    "bestChargedMove": {
      "name": "Iron Head",
      "type": "Steel"
    },
    "generation": 3
  },
  {
    "name": "Lairon",
    "pokedexId": 305,
    "slug": "lairon",
    "types": [
      "Steel",
      "Rock"
    ],
    "attack": 158,
    "defense": 198,
    "stamina": 155,
    "maxCp": 2324,
    "maxCp40": 2056,
    "cpRaid100": 1174,
    "cpWeather100": 1468,
    "cpResearch100": 881,
    "pveScore": 29,
    "dps": 17.42,
    "bestFastMove": {
      "name": "Metal Claw",
      "type": "Steel"
    },
    "bestChargedMove": {
      "name": "Iron Head",
      "type": "Steel"
    },
    "generation": 3
  },
  {
    "name": "Aggron",
    "pokedexId": 306,
    "slug": "aggron",
    "types": [
      "Steel",
      "Rock"
    ],
    "attack": 197,
    "defense": 256,
    "stamina": 172,
    "maxCp": 3369,
    "maxCp40": 2980,
    "cpRaid100": 1703,
    "cpWeather100": 2129,
    "cpResearch100": 1277,
    "pveScore": 40,
    "dps": 21.71,
    "bestFastMove": {
      "name": "Metal Claw",
      "type": "Steel"
    },
    "bestChargedMove": {
      "name": "Iron Head",
      "type": "Steel"
    },
    "generation": 3
  },
  {
    "name": "Meditite",
    "pokedexId": 307,
    "slug": "meditite",
    "types": [
      "Fighting",
      "Psychic"
    ],
    "attack": 78,
    "defense": 107,
    "stamina": 102,
    "maxCp": 784,
    "maxCp40": 693,
    "cpRaid100": 396,
    "cpWeather100": 495,
    "cpResearch100": 297,
    "pveScore": 15,
    "dps": 10.05,
    "bestFastMove": {
      "name": "Counter",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Dynamic Punch",
      "type": "Fighting"
    },
    "generation": 3
  },
  {
    "name": "Medicham",
    "pokedexId": 308,
    "slug": "medicham",
    "types": [
      "Fighting",
      "Psychic"
    ],
    "attack": 121,
    "defense": 152,
    "stamina": 155,
    "maxCp": 1618,
    "maxCp40": 1431,
    "cpRaid100": 817,
    "cpWeather100": 1022,
    "cpResearch100": 613,
    "pveScore": 24,
    "dps": 15.6,
    "bestFastMove": {
      "name": "Counter",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Dynamic Punch",
      "type": "Fighting"
    },
    "generation": 3
  },
  {
    "name": "Electrike",
    "pokedexId": 309,
    "slug": "electrike",
    "types": [
      "Electric"
    ],
    "attack": 122,
    "defense": 78,
    "stamina": 120,
    "maxCp": 1083,
    "maxCp40": 958,
    "cpRaid100": 547,
    "cpWeather100": 684,
    "cpResearch100": 410,
    "pveScore": 17,
    "dps": 13.96,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 3
  },
  {
    "name": "Manectric",
    "pokedexId": 310,
    "slug": "manectric",
    "types": [
      "Electric"
    ],
    "attack": 215,
    "defense": 127,
    "stamina": 172,
    "maxCp": 2646,
    "maxCp40": 2340,
    "cpRaid100": 1337,
    "cpWeather100": 1672,
    "cpResearch100": 1003,
    "pveScore": 38,
    "dps": 24.6,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 3
  },
  {
    "name": "Plusle",
    "pokedexId": 311,
    "slug": "plusle",
    "types": [
      "Electric"
    ],
    "attack": 168,
    "defense": 129,
    "stamina": 155,
    "maxCp": 2021,
    "maxCp40": 1788,
    "cpRaid100": 1021,
    "cpWeather100": 1277,
    "cpResearch100": 766,
    "pveScore": 29,
    "dps": 19.22,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 3
  },
  {
    "name": "Minun",
    "pokedexId": 312,
    "slug": "minun",
    "types": [
      "Electric"
    ],
    "attack": 147,
    "defense": 150,
    "stamina": 155,
    "maxCp": 1915,
    "maxCp40": 1694,
    "cpRaid100": 968,
    "cpWeather100": 1210,
    "cpResearch100": 726,
    "pveScore": 26,
    "dps": 16.82,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 3
  },
  {
    "name": "Volbeat",
    "pokedexId": 313,
    "slug": "volbeat",
    "types": [
      "Bug"
    ],
    "attack": 142,
    "defense": 166,
    "stamina": 163,
    "maxCp": 1989,
    "maxCp40": 1760,
    "cpRaid100": 1005,
    "cpWeather100": 1257,
    "cpResearch100": 754,
    "pveScore": 25,
    "dps": 15.43,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 3
  },
  {
    "name": "Illumise",
    "pokedexId": 314,
    "slug": "illumise",
    "types": [
      "Bug"
    ],
    "attack": 142,
    "defense": 166,
    "stamina": 163,
    "maxCp": 1989,
    "maxCp40": 1760,
    "cpRaid100": 1005,
    "cpWeather100": 1257,
    "cpResearch100": 754,
    "pveScore": 25,
    "dps": 15.43,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 3
  },
  {
    "name": "Roselia",
    "pokedexId": 315,
    "slug": "roselia",
    "types": [
      "Grass",
      "Poison"
    ],
    "attack": 186,
    "defense": 131,
    "stamina": 137,
    "maxCp": 2114,
    "maxCp40": 1870,
    "cpRaid100": 1068,
    "cpWeather100": 1335,
    "cpResearch100": 801,
    "pveScore": 35,
    "dps": 23.72,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 3
  },
  {
    "name": "Gulpin",
    "pokedexId": 316,
    "slug": "gulpin",
    "types": [
      "Poison"
    ],
    "attack": 80,
    "defense": 99,
    "stamina": 172,
    "maxCp": 979,
    "maxCp40": 866,
    "cpRaid100": 495,
    "cpWeather100": 618,
    "cpResearch100": 371,
    "pveScore": 15,
    "dps": 9.81,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "generation": 3
  },
  {
    "name": "Swalot",
    "pokedexId": 317,
    "slug": "swalot",
    "types": [
      "Poison"
    ],
    "attack": 140,
    "defense": 159,
    "stamina": 225,
    "maxCp": 2236,
    "maxCp40": 1978,
    "cpRaid100": 1130,
    "cpWeather100": 1413,
    "cpResearch100": 847,
    "pveScore": 30,
    "dps": 17.16,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "generation": 3
  },
  {
    "name": "Carvanha",
    "pokedexId": 318,
    "slug": "carvanha",
    "types": [
      "Water",
      "Dark"
    ],
    "attack": 170,
    "defense": 39,
    "stamina": 128,
    "maxCp": 1147,
    "maxCp40": 1015,
    "cpRaid100": 580,
    "cpWeather100": 725,
    "cpResearch100": 435,
    "pveScore": 21,
    "dps": 19.45,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 3
  },
  {
    "name": "Sharpedo",
    "pokedexId": 319,
    "slug": "sharpedo",
    "types": [
      "Water",
      "Dark"
    ],
    "attack": 243,
    "defense": 83,
    "stamina": 172,
    "maxCp": 2466,
    "maxCp40": 2181,
    "cpRaid100": 1246,
    "cpWeather100": 1558,
    "cpResearch100": 934,
    "pveScore": 38,
    "dps": 27.81,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 3
  },
  {
    "name": "Wailmer",
    "pokedexId": 320,
    "slug": "wailmer",
    "types": [
      "Water"
    ],
    "attack": 136,
    "defense": 68,
    "stamina": 277,
    "maxCp": 1659,
    "maxCp40": 1468,
    "cpRaid100": 838,
    "cpWeather100": 1048,
    "cpResearch100": 629,
    "pveScore": 23,
    "dps": 15.56,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 3
  },
  {
    "name": "Wailord",
    "pokedexId": 321,
    "slug": "wailord",
    "types": [
      "Water"
    ],
    "attack": 175,
    "defense": 87,
    "stamina": 347,
    "maxCp": 2577,
    "maxCp40": 2280,
    "cpRaid100": 1302,
    "cpWeather100": 1628,
    "cpResearch100": 977,
    "pveScore": 33,
    "dps": 20.02,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 3
  },
  {
    "name": "Numel",
    "pokedexId": 322,
    "slug": "numel",
    "types": [
      "Fire",
      "Ground"
    ],
    "attack": 118,
    "defense": 79,
    "stamina": 155,
    "maxCp": 1187,
    "maxCp40": 1050,
    "cpRaid100": 600,
    "cpWeather100": 750,
    "cpResearch100": 450,
    "pveScore": 21,
    "dps": 15.73,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 3
  },
  {
    "name": "Camerupt",
    "pokedexId": 323,
    "slug": "camerupt",
    "types": [
      "Fire",
      "Ground"
    ],
    "attack": 194,
    "defense": 136,
    "stamina": 172,
    "maxCp": 2479,
    "maxCp40": 2193,
    "cpRaid100": 1253,
    "cpWeather100": 1566,
    "cpResearch100": 940,
    "pveScore": 40,
    "dps": 25.87,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 3
  },
  {
    "name": "Torkoal",
    "pokedexId": 324,
    "slug": "torkoal",
    "types": [
      "Fire"
    ],
    "attack": 151,
    "defense": 202,
    "stamina": 172,
    "maxCp": 2361,
    "maxCp40": 2088,
    "cpRaid100": 1193,
    "cpWeather100": 1491,
    "cpResearch100": 895,
    "pveScore": 35,
    "dps": 20.13,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 3
  },
  {
    "name": "Spoink",
    "pokedexId": 325,
    "slug": "spoink",
    "types": [
      "Psychic"
    ],
    "attack": 125,
    "defense": 122,
    "stamina": 155,
    "maxCp": 1508,
    "maxCp40": 1334,
    "cpRaid100": 762,
    "cpWeather100": 953,
    "cpResearch100": 571,
    "pveScore": 23,
    "dps": 15.4,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 3
  },
  {
    "name": "Grumpig",
    "pokedexId": 326,
    "slug": "grumpig",
    "types": [
      "Psychic"
    ],
    "attack": 170,
    "defense": 188,
    "stamina": 190,
    "maxCp": 2664,
    "maxCp40": 2357,
    "cpRaid100": 1346,
    "cpWeather100": 1683,
    "cpResearch100": 1010,
    "pveScore": 36,
    "dps": 20.94,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 3
  },
  {
    "name": "Spinda",
    "pokedexId": 327,
    "slug": "spinda",
    "types": [
      "Normal"
    ],
    "attack": 116,
    "defense": 116,
    "stamina": 155,
    "maxCp": 1380,
    "maxCp40": 1220,
    "cpRaid100": 697,
    "cpWeather100": 872,
    "cpResearch100": 523,
    "pveScore": 21,
    "dps": 14.01,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 3
  },
  {
    "name": "Trapinch",
    "pokedexId": 328,
    "slug": "trapinch",
    "types": [
      "Ground"
    ],
    "attack": 162,
    "defense": 78,
    "stamina": 128,
    "maxCp": 1441,
    "maxCp40": 1274,
    "cpRaid100": 728,
    "cpWeather100": 910,
    "cpResearch100": 546,
    "pveScore": 25,
    "dps": 20.13,
    "bestFastMove": {
      "name": "Mud-Slap",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Earthquake",
      "type": "Ground"
    },
    "generation": 3
  },
  {
    "name": "Vibrava",
    "pokedexId": 329,
    "slug": "vibrava",
    "types": [
      "Ground",
      "Dragon"
    ],
    "attack": 134,
    "defense": 99,
    "stamina": 137,
    "maxCp": 1384,
    "maxCp40": 1225,
    "cpRaid100": 699,
    "cpWeather100": 875,
    "cpResearch100": 525,
    "pveScore": 23,
    "dps": 16.65,
    "bestFastMove": {
      "name": "Mud-Slap",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Earthquake",
      "type": "Ground"
    },
    "generation": 3
  },
  {
    "name": "Flygon",
    "pokedexId": 330,
    "slug": "flygon",
    "types": [
      "Ground",
      "Dragon"
    ],
    "attack": 205,
    "defense": 168,
    "stamina": 190,
    "maxCp": 3008,
    "maxCp40": 2661,
    "cpRaid100": 1520,
    "cpWeather100": 1901,
    "cpResearch100": 1140,
    "pveScore": 43,
    "dps": 25.48,
    "bestFastMove": {
      "name": "Mud-Slap",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Earthquake",
      "type": "Ground"
    },
    "generation": 3
  },
  {
    "name": "Cacnea",
    "pokedexId": 331,
    "slug": "cacnea",
    "types": [
      "Grass"
    ],
    "attack": 156,
    "defense": 74,
    "stamina": 137,
    "maxCp": 1404,
    "maxCp40": 1242,
    "cpRaid100": 709,
    "cpWeather100": 887,
    "cpResearch100": 532,
    "pveScore": 25,
    "dps": 19.89,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 3
  },
  {
    "name": "Cacturne",
    "pokedexId": 332,
    "slug": "cacturne",
    "types": [
      "Grass",
      "Dark"
    ],
    "attack": 221,
    "defense": 115,
    "stamina": 172,
    "maxCp": 2598,
    "maxCp40": 2298,
    "cpRaid100": 1313,
    "cpWeather100": 1641,
    "cpResearch100": 985,
    "pveScore": 42,
    "dps": 28.18,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 3
  },
  {
    "name": "Swablu",
    "pokedexId": 333,
    "slug": "swablu",
    "types": [
      "Normal",
      "Flying"
    ],
    "attack": 76,
    "defense": 132,
    "stamina": 128,
    "maxCp": 931,
    "maxCp40": 824,
    "cpRaid100": 470,
    "cpWeather100": 588,
    "cpResearch100": 353,
    "pveScore": 15,
    "dps": 9.18,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 3
  },
  {
    "name": "Altaria",
    "pokedexId": 334,
    "slug": "altaria",
    "types": [
      "Dragon",
      "Flying"
    ],
    "attack": 141,
    "defense": 201,
    "stamina": 181,
    "maxCp": 2266,
    "maxCp40": 2004,
    "cpRaid100": 1145,
    "cpWeather100": 1432,
    "cpResearch100": 859,
    "pveScore": 31,
    "dps": 17.9,
    "bestFastMove": {
      "name": "Dragon Tail",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Outrage",
      "type": "Dragon"
    },
    "generation": 3
  },
  {
    "name": "Zangoose",
    "pokedexId": 335,
    "slug": "zangoose",
    "types": [
      "Normal"
    ],
    "attack": 223,
    "defense": 124,
    "stamina": 177,
    "maxCp": 2745,
    "maxCp40": 2428,
    "cpRaid100": 1387,
    "cpWeather100": 1734,
    "cpResearch100": 1040,
    "pveScore": 41,
    "dps": 26.93,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 3
  },
  {
    "name": "Seviper",
    "pokedexId": 336,
    "slug": "seviper",
    "types": [
      "Poison"
    ],
    "attack": 196,
    "defense": 118,
    "stamina": 177,
    "maxCp": 2380,
    "maxCp40": 2105,
    "cpRaid100": 1203,
    "cpWeather100": 1504,
    "cpResearch100": 902,
    "pveScore": 37,
    "dps": 24.03,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "generation": 3
  },
  {
    "name": "Lunatone",
    "pokedexId": 337,
    "slug": "lunatone",
    "types": [
      "Rock",
      "Psychic"
    ],
    "attack": 178,
    "defense": 153,
    "stamina": 207,
    "maxCp": 2631,
    "maxCp40": 2327,
    "cpRaid100": 1330,
    "cpWeather100": 1662,
    "cpResearch100": 997,
    "pveScore": 35,
    "dps": 20.53,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 3
  },
  {
    "name": "Solrock",
    "pokedexId": 338,
    "slug": "solrock",
    "types": [
      "Rock",
      "Psychic"
    ],
    "attack": 178,
    "defense": 153,
    "stamina": 207,
    "maxCp": 2631,
    "maxCp40": 2327,
    "cpRaid100": 1330,
    "cpWeather100": 1662,
    "cpResearch100": 997,
    "pveScore": 35,
    "dps": 20.53,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 3
  },
  {
    "name": "Barboach",
    "pokedexId": 339,
    "slug": "barboach",
    "types": [
      "Water",
      "Ground"
    ],
    "attack": 93,
    "defense": 82,
    "stamina": 137,
    "maxCp": 925,
    "maxCp40": 819,
    "cpRaid100": 468,
    "cpWeather100": 585,
    "cpResearch100": 351,
    "pveScore": 15,
    "dps": 10.64,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 3
  },
  {
    "name": "Whiscash",
    "pokedexId": 340,
    "slug": "whiscash",
    "types": [
      "Water",
      "Ground"
    ],
    "attack": 151,
    "defense": 140,
    "stamina": 242,
    "maxCp": 2339,
    "maxCp40": 2069,
    "cpRaid100": 1182,
    "cpWeather100": 1478,
    "cpResearch100": 886,
    "pveScore": 30,
    "dps": 17.28,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 3
  },
  {
    "name": "Corphish",
    "pokedexId": 341,
    "slug": "corphish",
    "types": [
      "Water"
    ],
    "attack": 140,
    "defense": 99,
    "stamina": 125,
    "maxCp": 1382,
    "maxCp40": 1223,
    "cpRaid100": 698,
    "cpWeather100": 873,
    "cpResearch100": 524,
    "pveScore": 21,
    "dps": 16.02,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 3
  },
  {
    "name": "Crawdaunt",
    "pokedexId": 342,
    "slug": "crawdaunt",
    "types": [
      "Water",
      "Dark"
    ],
    "attack": 223,
    "defense": 142,
    "stamina": 160,
    "maxCp": 2785,
    "maxCp40": 2463,
    "cpRaid100": 1407,
    "cpWeather100": 1760,
    "cpResearch100": 1056,
    "pveScore": 40,
    "dps": 25.52,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 3
  },
  {
    "name": "Baltoy",
    "pokedexId": 343,
    "slug": "baltoy",
    "types": [
      "Ground",
      "Psychic"
    ],
    "attack": 77,
    "defense": 124,
    "stamina": 120,
    "maxCp": 889,
    "maxCp40": 787,
    "cpRaid100": 449,
    "cpWeather100": 562,
    "cpResearch100": 337,
    "pveScore": 15,
    "dps": 9.57,
    "bestFastMove": {
      "name": "Mud-Slap",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Earthquake",
      "type": "Ground"
    },
    "generation": 3
  },
  {
    "name": "Claydol",
    "pokedexId": 344,
    "slug": "claydol",
    "types": [
      "Ground",
      "Psychic"
    ],
    "attack": 140,
    "defense": 229,
    "stamina": 155,
    "maxCp": 2229,
    "maxCp40": 1971,
    "cpRaid100": 1126,
    "cpWeather100": 1408,
    "cpResearch100": 845,
    "pveScore": 30,
    "dps": 17.4,
    "bestFastMove": {
      "name": "Mud-Slap",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Earthquake",
      "type": "Ground"
    },
    "generation": 3
  },
  {
    "name": "Lileep",
    "pokedexId": 345,
    "slug": "lileep",
    "types": [
      "Rock",
      "Grass"
    ],
    "attack": 105,
    "defense": 149,
    "stamina": 165,
    "maxCp": 1455,
    "maxCp40": 1287,
    "cpRaid100": 735,
    "cpWeather100": 919,
    "cpResearch100": 551,
    "pveScore": 19,
    "dps": 12.11,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 3
  },
  {
    "name": "Cradily",
    "pokedexId": 346,
    "slug": "cradily",
    "types": [
      "Rock",
      "Grass"
    ],
    "attack": 152,
    "defense": 193,
    "stamina": 200,
    "maxCp": 2493,
    "maxCp40": 2205,
    "cpRaid100": 1260,
    "cpWeather100": 1575,
    "cpResearch100": 945,
    "pveScore": 31,
    "dps": 17.53,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 3
  },
  {
    "name": "Anorith",
    "pokedexId": 347,
    "slug": "anorith",
    "types": [
      "Rock",
      "Bug"
    ],
    "attack": 176,
    "defense": 100,
    "stamina": 128,
    "maxCp": 1729,
    "maxCp40": 1529,
    "cpRaid100": 874,
    "cpWeather100": 1092,
    "cpResearch100": 655,
    "pveScore": 27,
    "dps": 20.3,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 3
  },
  {
    "name": "Armaldo",
    "pokedexId": 348,
    "slug": "armaldo",
    "types": [
      "Rock",
      "Bug"
    ],
    "attack": 222,
    "defense": 174,
    "stamina": 181,
    "maxCp": 3220,
    "maxCp40": 2848,
    "cpRaid100": 1627,
    "cpWeather100": 2035,
    "cpResearch100": 1221,
    "pveScore": 43,
    "dps": 25.6,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 3
  },
  {
    "name": "Feebas",
    "pokedexId": 349,
    "slug": "feebas",
    "types": [
      "Water"
    ],
    "attack": 29,
    "defense": 85,
    "stamina": 85,
    "maxCp": 310,
    "maxCp40": 274,
    "cpRaid100": 157,
    "cpWeather100": 196,
    "cpResearch100": 117,
    "pveScore": 15,
    "dps": 3.32,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 3
  },
  {
    "name": "Milotic",
    "pokedexId": 350,
    "slug": "milotic",
    "types": [
      "Water"
    ],
    "attack": 192,
    "defense": 218,
    "stamina": 216,
    "maxCp": 3390,
    "maxCp40": 2999,
    "cpRaid100": 1713,
    "cpWeather100": 2142,
    "cpResearch100": 1285,
    "pveScore": 41,
    "dps": 21.97,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 3
  },
  {
    "name": "Castform",
    "pokedexId": 351,
    "slug": "castform",
    "types": [
      "Normal"
    ],
    "attack": 139,
    "defense": 139,
    "stamina": 172,
    "maxCp": 1845,
    "maxCp40": 1632,
    "cpRaid100": 932,
    "cpWeather100": 1165,
    "cpResearch100": 699,
    "pveScore": 26,
    "dps": 16.79,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 3
  },
  {
    "name": "Kecleon",
    "pokedexId": 352,
    "slug": "kecleon",
    "types": [
      "Normal"
    ],
    "attack": 160,
    "defense": 188,
    "stamina": 155,
    "maxCp": 2295,
    "maxCp40": 2030,
    "cpRaid100": 1160,
    "cpWeather100": 1450,
    "cpResearch100": 870,
    "pveScore": 32,
    "dps": 19.32,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 3
  },
  {
    "name": "Shuppet",
    "pokedexId": 353,
    "slug": "shuppet",
    "types": [
      "Ghost"
    ],
    "attack": 138,
    "defense": 64,
    "stamina": 127,
    "maxCp": 1144,
    "maxCp40": 1012,
    "cpRaid100": 578,
    "cpWeather100": 722,
    "cpResearch100": 433,
    "pveScore": 22,
    "dps": 17.91,
    "bestFastMove": {
      "name": "Shadow Claw",
      "type": "Ghost"
    },
    "bestChargedMove": {
      "name": "Shadow Ball",
      "type": "Ghost"
    },
    "generation": 3
  },
  {
    "name": "Banette",
    "pokedexId": 354,
    "slug": "banette",
    "types": [
      "Ghost"
    ],
    "attack": 218,
    "defense": 126,
    "stamina": 162,
    "maxCp": 2599,
    "maxCp40": 2298,
    "cpRaid100": 1313,
    "cpWeather100": 1642,
    "cpResearch100": 985,
    "pveScore": 43,
    "dps": 28.29,
    "bestFastMove": {
      "name": "Shadow Claw",
      "type": "Ghost"
    },
    "bestChargedMove": {
      "name": "Shadow Ball",
      "type": "Ghost"
    },
    "generation": 3
  },
  {
    "name": "Duskull",
    "pokedexId": 355,
    "slug": "duskull",
    "types": [
      "Ghost"
    ],
    "attack": 70,
    "defense": 162,
    "stamina": 85,
    "maxCp": 798,
    "maxCp40": 706,
    "cpRaid100": 403,
    "cpWeather100": 504,
    "cpResearch100": 302,
    "pveScore": 15,
    "dps": 9.08,
    "bestFastMove": {
      "name": "Shadow Claw",
      "type": "Ghost"
    },
    "bestChargedMove": {
      "name": "Shadow Ball",
      "type": "Ghost"
    },
    "generation": 3
  },
  {
    "name": "Dusclops",
    "pokedexId": 356,
    "slug": "dusclops",
    "types": [
      "Ghost"
    ],
    "attack": 124,
    "defense": 234,
    "stamina": 120,
    "maxCp": 1799,
    "maxCp40": 1591,
    "cpRaid100": 909,
    "cpWeather100": 1136,
    "cpResearch100": 682,
    "pveScore": 26,
    "dps": 16.09,
    "bestFastMove": {
      "name": "Shadow Claw",
      "type": "Ghost"
    },
    "bestChargedMove": {
      "name": "Shadow Ball",
      "type": "Ghost"
    },
    "generation": 3
  },
  {
    "name": "Tropius",
    "pokedexId": 357,
    "slug": "tropius",
    "types": [
      "Grass",
      "Flying"
    ],
    "attack": 136,
    "defense": 163,
    "stamina": 223,
    "maxCp": 2194,
    "maxCp40": 1941,
    "cpRaid100": 1109,
    "cpWeather100": 1386,
    "cpResearch100": 831,
    "pveScore": 30,
    "dps": 17.34,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 3
  },
  {
    "name": "Chimecho",
    "pokedexId": 358,
    "slug": "chimecho",
    "types": [
      "Psychic"
    ],
    "attack": 175,
    "defense": 169,
    "stamina": 181,
    "maxCp": 2547,
    "maxCp40": 2253,
    "cpRaid100": 1287,
    "cpWeather100": 1609,
    "cpResearch100": 965,
    "pveScore": 36,
    "dps": 21.56,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 3
  },
  {
    "name": "Absol",
    "pokedexId": 359,
    "slug": "absol",
    "types": [
      "Dark"
    ],
    "attack": 246,
    "defense": 120,
    "stamina": 163,
    "maxCp": 2856,
    "maxCp40": 2526,
    "cpRaid100": 1443,
    "cpWeather100": 1805,
    "cpResearch100": 1083,
    "pveScore": 42,
    "dps": 28.37,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "generation": 3
  },
  {
    "name": "Wynaut",
    "pokedexId": 360,
    "slug": "wynaut",
    "types": [
      "Psychic"
    ],
    "attack": 41,
    "defense": 86,
    "stamina": 216,
    "maxCp": 603,
    "maxCp40": 534,
    "cpRaid100": 305,
    "cpWeather100": 381,
    "cpResearch100": 228,
    "pveScore": 15,
    "dps": 5.05,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 3
  },
  {
    "name": "Snorunt",
    "pokedexId": 361,
    "slug": "snorunt",
    "types": [
      "Ice"
    ],
    "attack": 95,
    "defense": 95,
    "stamina": 137,
    "maxCp": 1004,
    "maxCp40": 888,
    "cpRaid100": 507,
    "cpWeather100": 634,
    "cpResearch100": 380,
    "pveScore": 15,
    "dps": 10.78,
    "bestFastMove": {
      "name": "Powder Snow",
      "type": "Ice"
    },
    "bestChargedMove": {
      "name": "Avalanche",
      "type": "Ice"
    },
    "generation": 3
  },
  {
    "name": "Glalie",
    "pokedexId": 362,
    "slug": "glalie",
    "types": [
      "Ice"
    ],
    "attack": 162,
    "defense": 162,
    "stamina": 190,
    "maxCp": 2380,
    "maxCp40": 2105,
    "cpRaid100": 1203,
    "cpWeather100": 1504,
    "cpResearch100": 902,
    "pveScore": 31,
    "dps": 18.38,
    "bestFastMove": {
      "name": "Powder Snow",
      "type": "Ice"
    },
    "bestChargedMove": {
      "name": "Avalanche",
      "type": "Ice"
    },
    "generation": 3
  },
  {
    "name": "Spheal",
    "pokedexId": 363,
    "slug": "spheal",
    "types": [
      "Ice",
      "Water"
    ],
    "attack": 96,
    "defense": 90,
    "stamina": 172,
    "maxCp": 1098,
    "maxCp40": 971,
    "cpRaid100": 555,
    "cpWeather100": 693,
    "cpResearch100": 416,
    "pveScore": 15,
    "dps": 10.89,
    "bestFastMove": {
      "name": "Powder Snow",
      "type": "Ice"
    },
    "bestChargedMove": {
      "name": "Avalanche",
      "type": "Ice"
    },
    "generation": 3
  },
  {
    "name": "Sealeo",
    "pokedexId": 364,
    "slug": "sealeo",
    "types": [
      "Ice",
      "Water"
    ],
    "attack": 137,
    "defense": 132,
    "stamina": 207,
    "maxCp": 1938,
    "maxCp40": 1714,
    "cpRaid100": 979,
    "cpWeather100": 1225,
    "cpResearch100": 735,
    "pveScore": 25,
    "dps": 15.54,
    "bestFastMove": {
      "name": "Powder Snow",
      "type": "Ice"
    },
    "bestChargedMove": {
      "name": "Avalanche",
      "type": "Ice"
    },
    "generation": 3
  },
  {
    "name": "Walrein",
    "pokedexId": 365,
    "slug": "walrein",
    "types": [
      "Ice",
      "Water"
    ],
    "attack": 183,
    "defense": 176,
    "stamina": 242,
    "maxCp": 3097,
    "maxCp40": 2739,
    "cpRaid100": 1565,
    "cpWeather100": 1957,
    "cpResearch100": 1174,
    "pveScore": 38,
    "dps": 20.76,
    "bestFastMove": {
      "name": "Powder Snow",
      "type": "Ice"
    },
    "bestChargedMove": {
      "name": "Avalanche",
      "type": "Ice"
    },
    "generation": 3
  },
  {
    "name": "Clamperl",
    "pokedexId": 366,
    "slug": "clamperl",
    "types": [
      "Water"
    ],
    "attack": 133,
    "defense": 135,
    "stamina": 111,
    "maxCp": 1436,
    "maxCp40": 1270,
    "cpRaid100": 726,
    "cpWeather100": 907,
    "cpResearch100": 544,
    "pveScore": 21,
    "dps": 15.22,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 3
  },
  {
    "name": "Huntail",
    "pokedexId": 367,
    "slug": "huntail",
    "types": [
      "Water"
    ],
    "attack": 196,
    "defense": 179,
    "stamina": 146,
    "maxCp": 2633,
    "maxCp40": 2329,
    "cpRaid100": 1330,
    "cpWeather100": 1663,
    "cpResearch100": 998,
    "pveScore": 36,
    "dps": 22.43,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 3
  },
  {
    "name": "Gorebyss",
    "pokedexId": 368,
    "slug": "gorebyss",
    "types": [
      "Water"
    ],
    "attack": 210,
    "defense": 179,
    "stamina": 146,
    "maxCp": 2807,
    "maxCp40": 2483,
    "cpRaid100": 1419,
    "cpWeather100": 1774,
    "cpResearch100": 1064,
    "pveScore": 39,
    "dps": 24.03,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 3
  },
  {
    "name": "Relicanth",
    "pokedexId": 369,
    "slug": "relicanth",
    "types": [
      "Water",
      "Rock"
    ],
    "attack": 162,
    "defense": 203,
    "stamina": 225,
    "maxCp": 2858,
    "maxCp40": 2528,
    "cpRaid100": 1444,
    "cpWeather100": 1806,
    "cpResearch100": 1083,
    "pveScore": 34,
    "dps": 18.54,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 3
  },
  {
    "name": "Luvdisc",
    "pokedexId": 370,
    "slug": "luvdisc",
    "types": [
      "Water"
    ],
    "attack": 81,
    "defense": 128,
    "stamina": 125,
    "maxCp": 959,
    "maxCp40": 848,
    "cpRaid100": 484,
    "cpWeather100": 605,
    "cpResearch100": 363,
    "pveScore": 15,
    "dps": 9.27,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 3
  },
  {
    "name": "Bagon",
    "pokedexId": 371,
    "slug": "bagon",
    "types": [
      "Dragon"
    ],
    "attack": 134,
    "defense": 93,
    "stamina": 128,
    "maxCp": 1307,
    "maxCp40": 1156,
    "cpRaid100": 660,
    "cpWeather100": 826,
    "cpResearch100": 495,
    "pveScore": 22,
    "dps": 17.02,
    "bestFastMove": {
      "name": "Dragon Tail",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Outrage",
      "type": "Dragon"
    },
    "generation": 3
  },
  {
    "name": "Shelgon",
    "pokedexId": 372,
    "slug": "shelgon",
    "types": [
      "Dragon"
    ],
    "attack": 172,
    "defense": 154,
    "stamina": 163,
    "maxCp": 2290,
    "maxCp40": 2025,
    "cpRaid100": 1157,
    "cpWeather100": 1446,
    "cpResearch100": 868,
    "pveScore": 35,
    "dps": 21.84,
    "bestFastMove": {
      "name": "Dragon Tail",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Outrage",
      "type": "Dragon"
    },
    "generation": 3
  },
  {
    "name": "Salamence",
    "pokedexId": 373,
    "slug": "salamence",
    "types": [
      "Dragon",
      "Flying"
    ],
    "attack": 277,
    "defense": 168,
    "stamina": 216,
    "maxCp": 4239,
    "maxCp40": 3749,
    "cpRaid100": 2142,
    "cpWeather100": 2678,
    "cpResearch100": 1607,
    "pveScore": 61,
    "dps": 35.17,
    "bestFastMove": {
      "name": "Dragon Tail",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Outrage",
      "type": "Dragon"
    },
    "generation": 3
  },
  {
    "name": "Beldum",
    "pokedexId": 374,
    "slug": "beldum",
    "types": [
      "Steel",
      "Psychic"
    ],
    "attack": 96,
    "defense": 132,
    "stamina": 120,
    "maxCp": 1104,
    "maxCp40": 976,
    "cpRaid100": 558,
    "cpWeather100": 697,
    "cpResearch100": 418,
    "pveScore": 15,
    "dps": 10.58,
    "bestFastMove": {
      "name": "Metal Claw",
      "type": "Steel"
    },
    "bestChargedMove": {
      "name": "Iron Head",
      "type": "Steel"
    },
    "generation": 3
  },
  {
    "name": "Metang",
    "pokedexId": 375,
    "slug": "metang",
    "types": [
      "Steel",
      "Psychic"
    ],
    "attack": 138,
    "defense": 176,
    "stamina": 155,
    "maxCp": 1946,
    "maxCp40": 1721,
    "cpRaid100": 983,
    "cpWeather100": 1229,
    "cpResearch100": 738,
    "pveScore": 25,
    "dps": 15.21,
    "bestFastMove": {
      "name": "Metal Claw",
      "type": "Steel"
    },
    "bestChargedMove": {
      "name": "Iron Head",
      "type": "Steel"
    },
    "generation": 3
  },
  {
    "name": "Regirock",
    "pokedexId": 377,
    "slug": "regirock",
    "types": [
      "Rock"
    ],
    "attack": 178,
    "defense": 309,
    "stamina": 190,
    "maxCp": 3512,
    "maxCp40": 3106,
    "cpRaid100": 1775,
    "cpWeather100": 2219,
    "cpResearch100": 1331,
    "pveScore": 40,
    "dps": 20.53,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 3
  },
  {
    "name": "Regice",
    "pokedexId": 378,
    "slug": "regice",
    "types": [
      "Ice"
    ],
    "attack": 178,
    "defense": 309,
    "stamina": 190,
    "maxCp": 3512,
    "maxCp40": 3106,
    "cpRaid100": 1775,
    "cpWeather100": 2219,
    "cpResearch100": 1331,
    "pveScore": 40,
    "dps": 20.19,
    "bestFastMove": {
      "name": "Powder Snow",
      "type": "Ice"
    },
    "bestChargedMove": {
      "name": "Avalanche",
      "type": "Ice"
    },
    "generation": 3
  },
  {
    "name": "Registeel",
    "pokedexId": 379,
    "slug": "registeel",
    "types": [
      "Steel"
    ],
    "attack": 142,
    "defense": 285,
    "stamina": 190,
    "maxCp": 2749,
    "maxCp40": 2431,
    "cpRaid100": 1389,
    "cpWeather100": 1737,
    "cpResearch100": 1042,
    "pveScore": 30,
    "dps": 15.65,
    "bestFastMove": {
      "name": "Metal Claw",
      "type": "Steel"
    },
    "bestChargedMove": {
      "name": "Iron Head",
      "type": "Steel"
    },
    "generation": 3
  },
  {
    "name": "Latias",
    "pokedexId": 380,
    "slug": "latias",
    "types": [
      "Dragon",
      "Psychic"
    ],
    "attack": 227,
    "defense": 246,
    "stamina": 190,
    "maxCp": 3952,
    "maxCp40": 3496,
    "cpRaid100": 1997,
    "cpWeather100": 2497,
    "cpResearch100": 1498,
    "pveScore": 54,
    "dps": 28.83,
    "bestFastMove": {
      "name": "Dragon Tail",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Outrage",
      "type": "Dragon"
    },
    "generation": 3
  },
  {
    "name": "Latios",
    "pokedexId": 381,
    "slug": "latios",
    "types": [
      "Dragon",
      "Psychic"
    ],
    "attack": 268,
    "defense": 211,
    "stamina": 190,
    "maxCp": 4301,
    "maxCp40": 3804,
    "cpRaid100": 2173,
    "cpWeather100": 2717,
    "cpResearch100": 1630,
    "pveScore": 61,
    "dps": 34.03,
    "bestFastMove": {
      "name": "Dragon Tail",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Outrage",
      "type": "Dragon"
    },
    "generation": 3
  },
  {
    "name": "Kyogre",
    "pokedexId": 382,
    "slug": "kyogre",
    "types": [
      "Water"
    ],
    "attack": 269,
    "defense": 228,
    "stamina": 204,
    "maxCp": 4626,
    "maxCp40": 4091,
    "cpRaid100": 2338,
    "cpWeather100": 2922,
    "cpResearch100": 1753,
    "pveScore": 65,
    "dps": 35.04,
    "bestFastMove": {
      "name": "Waterfall",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Origin Pulse",
      "type": "Water"
    },
    "generation": 3
  },
  {
    "name": "Rayquaza",
    "pokedexId": 384,
    "slug": "rayquaza",
    "types": [
      "Dragon",
      "Flying"
    ],
    "attack": 284,
    "defense": 170,
    "stamina": 212,
    "maxCp": 4326,
    "maxCp40": 3826,
    "cpRaid100": 2186,
    "cpWeather100": 2733,
    "cpResearch100": 1640,
    "pveScore": 63,
    "dps": 36.06,
    "bestFastMove": {
      "name": "Dragon Tail",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Outrage",
      "type": "Dragon"
    },
    "generation": 3
  },
  {
    "name": "Jirachi",
    "pokedexId": 385,
    "slug": "jirachi",
    "types": [
      "Steel",
      "Psychic"
    ],
    "attack": 210,
    "defense": 210,
    "stamina": 225,
    "maxCp": 3691,
    "maxCp40": 3265,
    "cpRaid100": 1865,
    "cpWeather100": 2332,
    "cpResearch100": 1399,
    "pveScore": 43,
    "dps": 23.15,
    "bestFastMove": {
      "name": "Metal Claw",
      "type": "Steel"
    },
    "bestChargedMove": {
      "name": "Iron Head",
      "type": "Steel"
    },
    "generation": 3
  },
  {
    "name": "Deoxys Normal",
    "pokedexId": 386,
    "slug": "deoxys-normal",
    "types": [
      "Psychic"
    ],
    "attack": 345,
    "defense": 115,
    "stamina": 137,
    "maxCp": 3573,
    "maxCp40": 3160,
    "cpRaid100": 1806,
    "cpWeather100": 2257,
    "cpResearch100": 1354,
    "pveScore": 60,
    "dps": 42.5,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 3
  },
  {
    "name": "Turtwig",
    "pokedexId": 387,
    "slug": "turtwig",
    "types": [
      "Grass"
    ],
    "attack": 119,
    "defense": 111,
    "stamina": 146,
    "maxCp": 1347,
    "maxCp40": 1192,
    "cpRaid100": 681,
    "cpWeather100": 851,
    "cpResearch100": 510,
    "pveScore": 22,
    "dps": 15.17,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 4
  },
  {
    "name": "Grotle",
    "pokedexId": 388,
    "slug": "grotle",
    "types": [
      "Grass"
    ],
    "attack": 156,
    "defense": 143,
    "stamina": 181,
    "maxCp": 2124,
    "maxCp40": 1879,
    "cpRaid100": 1073,
    "cpWeather100": 1342,
    "cpResearch100": 805,
    "pveScore": 32,
    "dps": 19.89,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 4
  },
  {
    "name": "Torterra",
    "pokedexId": 389,
    "slug": "torterra",
    "types": [
      "Grass",
      "Ground"
    ],
    "attack": 202,
    "defense": 188,
    "stamina": 216,
    "maxCp": 3318,
    "maxCp40": 2934,
    "cpRaid100": 1677,
    "cpWeather100": 2096,
    "cpResearch100": 1257,
    "pveScore": 46,
    "dps": 25.75,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 4
  },
  {
    "name": "Chimchar",
    "pokedexId": 390,
    "slug": "chimchar",
    "types": [
      "Fire"
    ],
    "attack": 113,
    "defense": 86,
    "stamina": 127,
    "maxCp": 1082,
    "maxCp40": 957,
    "cpRaid100": 547,
    "cpWeather100": 683,
    "cpResearch100": 410,
    "pveScore": 19,
    "dps": 15.07,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 4
  },
  {
    "name": "Monferno",
    "pokedexId": 391,
    "slug": "monferno",
    "types": [
      "Fire",
      "Fighting"
    ],
    "attack": 158,
    "defense": 105,
    "stamina": 162,
    "maxCp": 1780,
    "maxCp40": 1574,
    "cpRaid100": 899,
    "cpWeather100": 1124,
    "cpResearch100": 674,
    "pveScore": 30,
    "dps": 21.07,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 4
  },
  {
    "name": "Infernape",
    "pokedexId": 392,
    "slug": "infernape",
    "types": [
      "Fire",
      "Fighting"
    ],
    "attack": 222,
    "defense": 151,
    "stamina": 183,
    "maxCp": 3033,
    "maxCp40": 2683,
    "cpRaid100": 1533,
    "cpWeather100": 1916,
    "cpResearch100": 1150,
    "pveScore": 48,
    "dps": 29.6,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 4
  },
  {
    "name": "Piplup",
    "pokedexId": 393,
    "slug": "piplup",
    "types": [
      "Water"
    ],
    "attack": 111,
    "defense": 102,
    "stamina": 142,
    "maxCp": 1205,
    "maxCp40": 1066,
    "cpRaid100": 609,
    "cpWeather100": 761,
    "cpResearch100": 457,
    "pveScore": 18,
    "dps": 12.7,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 4
  },
  {
    "name": "Prinplup",
    "pokedexId": 394,
    "slug": "prinplup",
    "types": [
      "Water"
    ],
    "attack": 150,
    "defense": 139,
    "stamina": 162,
    "maxCp": 1923,
    "maxCp40": 1701,
    "cpRaid100": 972,
    "cpWeather100": 1215,
    "cpResearch100": 729,
    "pveScore": 27,
    "dps": 17.16,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 4
  },
  {
    "name": "Empoleon",
    "pokedexId": 395,
    "slug": "empoleon",
    "types": [
      "Water",
      "Steel"
    ],
    "attack": 209,
    "defense": 186,
    "stamina": 197,
    "maxCp": 3264,
    "maxCp40": 2888,
    "cpRaid100": 1650,
    "cpWeather100": 2062,
    "cpResearch100": 1237,
    "pveScore": 42,
    "dps": 23.92,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 4
  },
  {
    "name": "Starly",
    "pokedexId": 396,
    "slug": "starly",
    "types": [
      "Normal",
      "Flying"
    ],
    "attack": 101,
    "defense": 58,
    "stamina": 120,
    "maxCp": 813,
    "maxCp40": 719,
    "cpRaid100": 410,
    "cpWeather100": 513,
    "cpResearch100": 308,
    "pveScore": 15,
    "dps": 12.2,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 4
  },
  {
    "name": "Staravia",
    "pokedexId": 397,
    "slug": "staravia",
    "types": [
      "Normal",
      "Flying"
    ],
    "attack": 143,
    "defense": 93,
    "stamina": 146,
    "maxCp": 1471,
    "maxCp40": 1301,
    "cpRaid100": 743,
    "cpWeather100": 929,
    "cpResearch100": 557,
    "pveScore": 24,
    "dps": 17.27,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 4
  },
  {
    "name": "Staraptor",
    "pokedexId": 398,
    "slug": "staraptor",
    "types": [
      "Normal",
      "Flying"
    ],
    "attack": 234,
    "defense": 139,
    "stamina": 198,
    "maxCp": 3184,
    "maxCp40": 2816,
    "cpRaid100": 1609,
    "cpWeather100": 2011,
    "cpResearch100": 1207,
    "pveScore": 46,
    "dps": 28.26,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 4
  },
  {
    "name": "Bidoof",
    "pokedexId": 399,
    "slug": "bidoof",
    "types": [
      "Normal"
    ],
    "attack": 80,
    "defense": 73,
    "stamina": 153,
    "maxCp": 815,
    "maxCp40": 721,
    "cpRaid100": 412,
    "cpWeather100": 515,
    "cpResearch100": 309,
    "pveScore": 15,
    "dps": 9.66,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 4
  },
  {
    "name": "Bibarel",
    "pokedexId": 400,
    "slug": "bibarel",
    "types": [
      "Normal",
      "Water"
    ],
    "attack": 161,
    "defense": 119,
    "stamina": 188,
    "maxCp": 2049,
    "maxCp40": 1812,
    "cpRaid100": 1035,
    "cpWeather100": 1295,
    "cpResearch100": 777,
    "pveScore": 30,
    "dps": 19.44,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 4
  },
  {
    "name": "Kricketot",
    "pokedexId": 401,
    "slug": "kricketot",
    "types": [
      "Bug"
    ],
    "attack": 45,
    "defense": 74,
    "stamina": 114,
    "maxCp": 453,
    "maxCp40": 401,
    "cpRaid100": 229,
    "cpWeather100": 286,
    "cpResearch100": 172,
    "pveScore": 15,
    "dps": 4.89,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 4
  },
  {
    "name": "Kricketune",
    "pokedexId": 402,
    "slug": "kricketune",
    "types": [
      "Bug"
    ],
    "attack": 159,
    "defense": 100,
    "stamina": 184,
    "maxCp": 1858,
    "maxCp40": 1644,
    "cpRaid100": 939,
    "cpWeather100": 1174,
    "cpResearch100": 704,
    "pveScore": 25,
    "dps": 17.28,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 4
  },
  {
    "name": "Shinx",
    "pokedexId": 403,
    "slug": "shinx",
    "types": [
      "Electric"
    ],
    "attack": 116,
    "defense": 64,
    "stamina": 128,
    "maxCp": 983,
    "maxCp40": 869,
    "cpRaid100": 496,
    "cpWeather100": 621,
    "cpResearch100": 372,
    "pveScore": 16,
    "dps": 13.27,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 4
  },
  {
    "name": "Luxio",
    "pokedexId": 404,
    "slug": "luxio",
    "types": [
      "Electric"
    ],
    "attack": 159,
    "defense": 95,
    "stamina": 155,
    "maxCp": 1680,
    "maxCp40": 1486,
    "cpRaid100": 849,
    "cpWeather100": 1061,
    "cpResearch100": 636,
    "pveScore": 25,
    "dps": 18.19,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 4
  },
  {
    "name": "Luxray",
    "pokedexId": 405,
    "slug": "luxray",
    "types": [
      "Electric"
    ],
    "attack": 231,
    "defense": 156,
    "stamina": 190,
    "maxCp": 3252,
    "maxCp40": 2876,
    "cpRaid100": 1643,
    "cpWeather100": 2054,
    "cpResearch100": 1232,
    "pveScore": 44,
    "dps": 26.43,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 4
  },
  {
    "name": "Budew",
    "pokedexId": 406,
    "slug": "budew",
    "types": [
      "Grass",
      "Poison"
    ],
    "attack": 91,
    "defense": 109,
    "stamina": 120,
    "maxCp": 968,
    "maxCp40": 856,
    "cpRaid100": 489,
    "cpWeather100": 611,
    "cpResearch100": 367,
    "pveScore": 16,
    "dps": 11.6,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 4
  },
  {
    "name": "Roserade",
    "pokedexId": 407,
    "slug": "roserade",
    "types": [
      "Grass",
      "Poison"
    ],
    "attack": 243,
    "defense": 185,
    "stamina": 155,
    "maxCp": 3359,
    "maxCp40": 2971,
    "cpRaid100": 1697,
    "cpWeather100": 2122,
    "cpResearch100": 1273,
    "pveScore": 51,
    "dps": 30.98,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 4
  },
  {
    "name": "Cranidos",
    "pokedexId": 408,
    "slug": "cranidos",
    "types": [
      "Rock"
    ],
    "attack": 219,
    "defense": 70,
    "stamina": 167,
    "maxCp": 2055,
    "maxCp40": 1817,
    "cpRaid100": 1038,
    "cpWeather100": 1298,
    "cpResearch100": 779,
    "pveScore": 33,
    "dps": 25.25,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 4
  },
  {
    "name": "Shieldon",
    "pokedexId": 410,
    "slug": "shieldon",
    "types": [
      "Rock",
      "Steel"
    ],
    "attack": 76,
    "defense": 194,
    "stamina": 102,
    "maxCp": 1004,
    "maxCp40": 888,
    "cpRaid100": 507,
    "cpWeather100": 634,
    "cpResearch100": 380,
    "pveScore": 15,
    "dps": 8.76,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 4
  },
  {
    "name": "Bastiodon",
    "pokedexId": 411,
    "slug": "bastiodon",
    "types": [
      "Rock",
      "Steel"
    ],
    "attack": 94,
    "defense": 285,
    "stamina": 155,
    "maxCp": 1738,
    "maxCp40": 1537,
    "cpRaid100": 878,
    "cpWeather100": 1098,
    "cpResearch100": 658,
    "pveScore": 20,
    "dps": 10.84,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 4
  },
  {
    "name": "Burmy",
    "pokedexId": 412,
    "slug": "burmy",
    "types": [
      "Bug"
    ],
    "attack": 53,
    "defense": 83,
    "stamina": 120,
    "maxCp": 552,
    "maxCp40": 488,
    "cpRaid100": 279,
    "cpWeather100": 348,
    "cpResearch100": 209,
    "pveScore": 15,
    "dps": 5.76,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 4
  },
  {
    "name": "Wormadam Plant",
    "pokedexId": 413,
    "slug": "wormadam-plant",
    "types": [
      "Bug",
      "Grass"
    ],
    "attack": 141,
    "defense": 180,
    "stamina": 155,
    "maxCp": 2005,
    "maxCp40": 1773,
    "cpRaid100": 1013,
    "cpWeather100": 1267,
    "cpResearch100": 760,
    "pveScore": 25,
    "dps": 15.33,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 4
  },
  {
    "name": "Mothim",
    "pokedexId": 414,
    "slug": "mothim",
    "types": [
      "Bug",
      "Flying"
    ],
    "attack": 185,
    "defense": 98,
    "stamina": 172,
    "maxCp": 2052,
    "maxCp40": 1815,
    "cpRaid100": 1037,
    "cpWeather100": 1297,
    "cpResearch100": 778,
    "pveScore": 29,
    "dps": 20.11,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 4
  },
  {
    "name": "Combee",
    "pokedexId": 415,
    "slug": "combee",
    "types": [
      "Bug",
      "Flying"
    ],
    "attack": 59,
    "defense": 83,
    "stamina": 102,
    "maxCp": 559,
    "maxCp40": 494,
    "cpRaid100": 282,
    "cpWeather100": 353,
    "cpResearch100": 212,
    "pveScore": 15,
    "dps": 6.41,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 4
  },
  {
    "name": "Vespiquen",
    "pokedexId": 416,
    "slug": "vespiquen",
    "types": [
      "Bug",
      "Flying"
    ],
    "attack": 149,
    "defense": 190,
    "stamina": 172,
    "maxCp": 2267,
    "maxCp40": 2005,
    "cpRaid100": 1145,
    "cpWeather100": 1432,
    "cpResearch100": 859,
    "pveScore": 28,
    "dps": 16.2,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 4
  },
  {
    "name": "Pachirisu",
    "pokedexId": 417,
    "slug": "pachirisu",
    "types": [
      "Electric"
    ],
    "attack": 94,
    "defense": 172,
    "stamina": 155,
    "maxCp": 1372,
    "maxCp40": 1213,
    "cpRaid100": 693,
    "cpWeather100": 867,
    "cpResearch100": 520,
    "pveScore": 17,
    "dps": 10.76,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 4
  },
  {
    "name": "Buizel",
    "pokedexId": 418,
    "slug": "buizel",
    "types": [
      "Water"
    ],
    "attack": 131,
    "defense": 68,
    "stamina": 146,
    "maxCp": 1191,
    "maxCp40": 1054,
    "cpRaid100": 602,
    "cpWeather100": 752,
    "cpResearch100": 451,
    "pveScore": 19,
    "dps": 14.99,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 4
  },
  {
    "name": "Floatzel",
    "pokedexId": 419,
    "slug": "floatzel",
    "types": [
      "Water"
    ],
    "attack": 221,
    "defense": 115,
    "stamina": 198,
    "maxCp": 2772,
    "maxCp40": 2452,
    "cpRaid100": 1401,
    "cpWeather100": 1752,
    "cpResearch100": 1051,
    "pveScore": 39,
    "dps": 25.29,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 4
  },
  {
    "name": "Cherubi",
    "pokedexId": 420,
    "slug": "cherubi",
    "types": [
      "Grass"
    ],
    "attack": 108,
    "defense": 92,
    "stamina": 128,
    "maxCp": 1074,
    "maxCp40": 950,
    "cpRaid100": 542,
    "cpWeather100": 678,
    "cpResearch100": 407,
    "pveScore": 18,
    "dps": 13.77,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 4
  },
  {
    "name": "Cherrim",
    "pokedexId": 421,
    "slug": "cherrim",
    "types": [
      "Grass"
    ],
    "attack": 171,
    "defense": 153,
    "stamina": 172,
    "maxCp": 2327,
    "maxCp40": 2059,
    "cpRaid100": 1176,
    "cpWeather100": 1470,
    "cpResearch100": 882,
    "pveScore": 35,
    "dps": 21.8,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 4
  },
  {
    "name": "Shellos",
    "pokedexId": 422,
    "slug": "shellos",
    "types": [
      "Water"
    ],
    "attack": 103,
    "defense": 104,
    "stamina": 183,
    "maxCp": 1278,
    "maxCp40": 1131,
    "cpRaid100": 646,
    "cpWeather100": 808,
    "cpResearch100": 484,
    "pveScore": 18,
    "dps": 11.79,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 4
  },
  {
    "name": "Gastrodon",
    "pokedexId": 423,
    "slug": "gastrodon",
    "types": [
      "Water",
      "Ground"
    ],
    "attack": 169,
    "defense": 142,
    "stamina": 244,
    "maxCp": 2619,
    "maxCp40": 2317,
    "cpRaid100": 1324,
    "cpWeather100": 1655,
    "cpResearch100": 993,
    "pveScore": 33,
    "dps": 19.34,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 4
  },
  {
    "name": "Ambipom",
    "pokedexId": 424,
    "slug": "ambipom",
    "types": [
      "Normal"
    ],
    "attack": 205,
    "defense": 143,
    "stamina": 181,
    "maxCp": 2733,
    "maxCp40": 2418,
    "cpRaid100": 1381,
    "cpWeather100": 1727,
    "cpResearch100": 1036,
    "pveScore": 40,
    "dps": 24.76,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 4
  },
  {
    "name": "Drifloon",
    "pokedexId": 425,
    "slug": "drifloon",
    "types": [
      "Ghost",
      "Flying"
    ],
    "attack": 116,
    "defense": 80,
    "stamina": 207,
    "maxCp": 1343,
    "maxCp40": 1188,
    "cpRaid100": 678,
    "cpWeather100": 848,
    "cpResearch100": 509,
    "pveScore": 22,
    "dps": 15.05,
    "bestFastMove": {
      "name": "Shadow Claw",
      "type": "Ghost"
    },
    "bestChargedMove": {
      "name": "Shadow Ball",
      "type": "Ghost"
    },
    "generation": 4
  },
  {
    "name": "Drifblim",
    "pokedexId": 426,
    "slug": "drifblim",
    "types": [
      "Ghost",
      "Flying"
    ],
    "attack": 179,
    "defense": 102,
    "stamina": 312,
    "maxCp": 2679,
    "maxCp40": 2370,
    "cpRaid100": 1354,
    "cpWeather100": 1692,
    "cpResearch100": 1015,
    "pveScore": 39,
    "dps": 23.23,
    "bestFastMove": {
      "name": "Shadow Claw",
      "type": "Ghost"
    },
    "bestChargedMove": {
      "name": "Shadow Ball",
      "type": "Ghost"
    },
    "generation": 4
  },
  {
    "name": "Buneary",
    "pokedexId": 427,
    "slug": "buneary",
    "types": [
      "Normal"
    ],
    "attack": 129,
    "defense": 105,
    "stamina": 146,
    "maxCp": 1413,
    "maxCp40": 1250,
    "cpRaid100": 714,
    "cpWeather100": 892,
    "cpResearch100": 535,
    "pveScore": 22,
    "dps": 15.58,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 4
  },
  {
    "name": "Lopunny",
    "pokedexId": 428,
    "slug": "lopunny",
    "types": [
      "Normal"
    ],
    "attack": 155,
    "defense": 194,
    "stamina": 163,
    "maxCp": 2315,
    "maxCp40": 2047,
    "cpRaid100": 1170,
    "cpWeather100": 1462,
    "cpResearch100": 877,
    "pveScore": 32,
    "dps": 18.72,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 4
  },
  {
    "name": "Mismagius",
    "pokedexId": 429,
    "slug": "mismagius",
    "types": [
      "Ghost"
    ],
    "attack": 211,
    "defense": 187,
    "stamina": 155,
    "maxCp": 2957,
    "maxCp40": 2615,
    "cpRaid100": 1494,
    "cpWeather100": 1868,
    "cpResearch100": 1121,
    "pveScore": 45,
    "dps": 27.38,
    "bestFastMove": {
      "name": "Shadow Claw",
      "type": "Ghost"
    },
    "bestChargedMove": {
      "name": "Shadow Ball",
      "type": "Ghost"
    },
    "generation": 4
  },
  {
    "name": "Honchkrow",
    "pokedexId": 430,
    "slug": "honchkrow",
    "types": [
      "Dark",
      "Flying"
    ],
    "attack": 243,
    "defense": 103,
    "stamina": 225,
    "maxCp": 3065,
    "maxCp40": 2711,
    "cpRaid100": 1549,
    "cpWeather100": 1937,
    "cpResearch100": 1162,
    "pveScore": 44,
    "dps": 28.02,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "generation": 4
  },
  {
    "name": "Glameow",
    "pokedexId": 431,
    "slug": "glameow",
    "types": [
      "Normal"
    ],
    "attack": 109,
    "defense": 82,
    "stamina": 135,
    "maxCp": 1056,
    "maxCp40": 934,
    "cpRaid100": 533,
    "cpWeather100": 667,
    "cpResearch100": 400,
    "pveScore": 17,
    "dps": 13.16,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 4
  },
  {
    "name": "Purugly",
    "pokedexId": 432,
    "slug": "purugly",
    "types": [
      "Normal"
    ],
    "attack": 171,
    "defense": 133,
    "stamina": 174,
    "maxCp": 2196,
    "maxCp40": 1942,
    "cpRaid100": 1110,
    "cpWeather100": 1387,
    "cpResearch100": 832,
    "pveScore": 32,
    "dps": 20.65,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 4
  },
  {
    "name": "Chingling",
    "pokedexId": 433,
    "slug": "chingling",
    "types": [
      "Psychic"
    ],
    "attack": 114,
    "defense": 94,
    "stamina": 128,
    "maxCp": 1137,
    "maxCp40": 1005,
    "cpRaid100": 574,
    "cpWeather100": 718,
    "cpResearch100": 431,
    "pveScore": 19,
    "dps": 14.04,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 4
  },
  {
    "name": "Stunky",
    "pokedexId": 434,
    "slug": "stunky",
    "types": [
      "Poison",
      "Dark"
    ],
    "attack": 120,
    "defense": 89,
    "stamina": 160,
    "maxCp": 1285,
    "maxCp40": 1137,
    "cpRaid100": 649,
    "cpWeather100": 812,
    "cpResearch100": 487,
    "pveScore": 20,
    "dps": 14.71,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "generation": 4
  },
  {
    "name": "Skuntank",
    "pokedexId": 435,
    "slug": "skuntank",
    "types": [
      "Poison",
      "Dark"
    ],
    "attack": 184,
    "defense": 132,
    "stamina": 230,
    "maxCp": 2666,
    "maxCp40": 2358,
    "cpRaid100": 1347,
    "cpWeather100": 1684,
    "cpResearch100": 1010,
    "pveScore": 38,
    "dps": 22.56,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "generation": 4
  },
  {
    "name": "Bronzor",
    "pokedexId": 436,
    "slug": "bronzor",
    "types": [
      "Steel",
      "Psychic"
    ],
    "attack": 43,
    "defense": 154,
    "stamina": 149,
    "maxCp": 681,
    "maxCp40": 603,
    "cpRaid100": 344,
    "cpWeather100": 430,
    "cpResearch100": 258,
    "pveScore": 15,
    "dps": 4.74,
    "bestFastMove": {
      "name": "Metal Claw",
      "type": "Steel"
    },
    "bestChargedMove": {
      "name": "Iron Head",
      "type": "Steel"
    },
    "generation": 4
  },
  {
    "name": "Bronzong",
    "pokedexId": 437,
    "slug": "bronzong",
    "types": [
      "Steel",
      "Psychic"
    ],
    "attack": 161,
    "defense": 213,
    "stamina": 167,
    "maxCp": 2531,
    "maxCp40": 2239,
    "cpRaid100": 1279,
    "cpWeather100": 1599,
    "cpResearch100": 959,
    "pveScore": 31,
    "dps": 17.75,
    "bestFastMove": {
      "name": "Metal Claw",
      "type": "Steel"
    },
    "bestChargedMove": {
      "name": "Iron Head",
      "type": "Steel"
    },
    "generation": 4
  },
  {
    "name": "Bonsly",
    "pokedexId": 438,
    "slug": "bonsly",
    "types": [
      "Rock"
    ],
    "attack": 124,
    "defense": 133,
    "stamina": 137,
    "maxCp": 1472,
    "maxCp40": 1302,
    "cpRaid100": 744,
    "cpWeather100": 930,
    "cpResearch100": 558,
    "pveScore": 21,
    "dps": 14.3,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 4
  },
  {
    "name": "Mime Jr.",
    "pokedexId": 439,
    "slug": "mime-jr",
    "types": [
      "Psychic",
      "Fairy"
    ],
    "attack": 125,
    "defense": 142,
    "stamina": 85,
    "maxCp": 1238,
    "maxCp40": 1095,
    "cpRaid100": 626,
    "cpWeather100": 782,
    "cpResearch100": 469,
    "pveScore": 20,
    "dps": 15.4,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 4
  },
  {
    "name": "Happiny",
    "pokedexId": 440,
    "slug": "happiny",
    "types": [
      "Normal"
    ],
    "attack": 25,
    "defense": 77,
    "stamina": 225,
    "maxCp": 419,
    "maxCp40": 371,
    "cpRaid100": 212,
    "cpWeather100": 265,
    "cpResearch100": 159,
    "pveScore": 15,
    "dps": 3.02,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 4
  },
  {
    "name": "Chatot",
    "pokedexId": 441,
    "slug": "chatot",
    "types": [
      "Normal",
      "Flying"
    ],
    "attack": 183,
    "defense": 91,
    "stamina": 183,
    "maxCp": 2025,
    "maxCp40": 1791,
    "cpRaid100": 1023,
    "cpWeather100": 1279,
    "cpResearch100": 767,
    "pveScore": 32,
    "dps": 22.1,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 4
  },
  {
    "name": "Spiritomb",
    "pokedexId": 442,
    "slug": "spiritomb",
    "types": [
      "Ghost",
      "Dark"
    ],
    "attack": 169,
    "defense": 199,
    "stamina": 137,
    "maxCp": 2343,
    "maxCp40": 2072,
    "cpRaid100": 1184,
    "cpWeather100": 1480,
    "cpResearch100": 888,
    "pveScore": 36,
    "dps": 21.93,
    "bestFastMove": {
      "name": "Shadow Claw",
      "type": "Ghost"
    },
    "bestChargedMove": {
      "name": "Shadow Ball",
      "type": "Ghost"
    },
    "generation": 4
  },
  {
    "name": "Gible",
    "pokedexId": 443,
    "slug": "gible",
    "types": [
      "Dragon",
      "Ground"
    ],
    "attack": 124,
    "defense": 84,
    "stamina": 151,
    "maxCp": 1258,
    "maxCp40": 1112,
    "cpRaid100": 635,
    "cpWeather100": 794,
    "cpResearch100": 477,
    "pveScore": 21,
    "dps": 15.75,
    "bestFastMove": {
      "name": "Dragon Tail",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Outrage",
      "type": "Dragon"
    },
    "generation": 4
  },
  {
    "name": "Gabite",
    "pokedexId": 444,
    "slug": "gabite",
    "types": [
      "Dragon",
      "Ground"
    ],
    "attack": 172,
    "defense": 124,
    "stamina": 169,
    "maxCp": 2111,
    "maxCp40": 1867,
    "cpRaid100": 1067,
    "cpWeather100": 1334,
    "cpResearch100": 800,
    "pveScore": 33,
    "dps": 21.84,
    "bestFastMove": {
      "name": "Dragon Tail",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Outrage",
      "type": "Dragon"
    },
    "generation": 4
  },
  {
    "name": "Garchomp",
    "pokedexId": 445,
    "slug": "garchomp",
    "types": [
      "Dragon",
      "Ground"
    ],
    "attack": 261,
    "defense": 192,
    "stamina": 239,
    "maxCp": 4468,
    "maxCp40": 3952,
    "cpRaid100": 2258,
    "cpWeather100": 2823,
    "cpResearch100": 1694,
    "pveScore": 61,
    "dps": 33.14,
    "bestFastMove": {
      "name": "Dragon Tail",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Outrage",
      "type": "Dragon"
    },
    "generation": 4
  },
  {
    "name": "Munchlax",
    "pokedexId": 446,
    "slug": "munchlax",
    "types": [
      "Normal"
    ],
    "attack": 137,
    "defense": 117,
    "stamina": 286,
    "maxCp": 2139,
    "maxCp40": 1892,
    "cpRaid100": 1081,
    "cpWeather100": 1351,
    "cpResearch100": 811,
    "pveScore": 28,
    "dps": 16.55,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 4
  },
  {
    "name": "Riolu",
    "pokedexId": 447,
    "slug": "riolu",
    "types": [
      "Fighting"
    ],
    "attack": 127,
    "defense": 78,
    "stamina": 120,
    "maxCp": 1123,
    "maxCp40": 993,
    "cpRaid100": 567,
    "cpWeather100": 709,
    "cpResearch100": 425,
    "pveScore": 20,
    "dps": 16.37,
    "bestFastMove": {
      "name": "Counter",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Dynamic Punch",
      "type": "Fighting"
    },
    "generation": 4
  },
  {
    "name": "Lucario",
    "pokedexId": 448,
    "slug": "lucario",
    "types": [
      "Fighting",
      "Steel"
    ],
    "attack": 236,
    "defense": 144,
    "stamina": 172,
    "maxCp": 3056,
    "maxCp40": 2703,
    "cpRaid100": 1544,
    "cpWeather100": 1930,
    "cpResearch100": 1158,
    "pveScore": 54,
    "dps": 33.8,
    "bestFastMove": {
      "name": "Counter",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Aura Sphere",
      "type": "Fighting"
    },
    "generation": 4
  },
  {
    "name": "Hippopotas",
    "pokedexId": 449,
    "slug": "hippopotas",
    "types": [
      "Ground"
    ],
    "attack": 124,
    "defense": 118,
    "stamina": 169,
    "maxCp": 1535,
    "maxCp40": 1358,
    "cpRaid100": 776,
    "cpWeather100": 970,
    "cpResearch100": 582,
    "pveScore": 23,
    "dps": 15.41,
    "bestFastMove": {
      "name": "Mud-Slap",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Earthquake",
      "type": "Ground"
    },
    "generation": 4
  },
  {
    "name": "Hippowdon",
    "pokedexId": 450,
    "slug": "hippowdon",
    "types": [
      "Ground"
    ],
    "attack": 201,
    "defense": 190,
    "stamina": 239,
    "maxCp": 3480,
    "maxCp40": 3078,
    "cpRaid100": 1759,
    "cpWeather100": 2198,
    "cpResearch100": 1319,
    "pveScore": 46,
    "dps": 24.98,
    "bestFastMove": {
      "name": "Mud-Slap",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Earthquake",
      "type": "Ground"
    },
    "generation": 4
  },
  {
    "name": "Skorupi",
    "pokedexId": 451,
    "slug": "skorupi",
    "types": [
      "Poison",
      "Bug"
    ],
    "attack": 93,
    "defense": 151,
    "stamina": 120,
    "maxCp": 1141,
    "maxCp40": 1009,
    "cpRaid100": 576,
    "cpWeather100": 721,
    "cpResearch100": 432,
    "pveScore": 17,
    "dps": 11.4,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "generation": 4
  },
  {
    "name": "Drapion",
    "pokedexId": 452,
    "slug": "drapion",
    "types": [
      "Poison",
      "Dark"
    ],
    "attack": 179,
    "defense": 202,
    "stamina": 172,
    "maxCp": 2759,
    "maxCp40": 2440,
    "cpRaid100": 1394,
    "cpWeather100": 1743,
    "cpResearch100": 1046,
    "pveScore": 38,
    "dps": 21.95,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "generation": 4
  },
  {
    "name": "Croagunk",
    "pokedexId": 453,
    "slug": "croagunk",
    "types": [
      "Poison",
      "Fighting"
    ],
    "attack": 116,
    "defense": 76,
    "stamina": 134,
    "maxCp": 1077,
    "maxCp40": 952,
    "cpRaid100": 544,
    "cpWeather100": 680,
    "cpResearch100": 408,
    "pveScore": 18,
    "dps": 14.22,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "generation": 4
  },
  {
    "name": "Toxicroak",
    "pokedexId": 454,
    "slug": "toxicroak",
    "types": [
      "Poison",
      "Fighting"
    ],
    "attack": 211,
    "defense": 133,
    "stamina": 195,
    "maxCp": 2813,
    "maxCp40": 2488,
    "cpRaid100": 1421,
    "cpWeather100": 1777,
    "cpResearch100": 1066,
    "pveScore": 42,
    "dps": 25.87,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "generation": 4
  },
  {
    "name": "Carnivine",
    "pokedexId": 455,
    "slug": "carnivine",
    "types": [
      "Grass"
    ],
    "attack": 186,
    "defense": 136,
    "stamina": 179,
    "maxCp": 2429,
    "maxCp40": 2148,
    "cpRaid100": 1227,
    "cpWeather100": 1534,
    "cpResearch100": 920,
    "pveScore": 37,
    "dps": 23.72,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 4
  },
  {
    "name": "Finneon",
    "pokedexId": 456,
    "slug": "finneon",
    "types": [
      "Water"
    ],
    "attack": 96,
    "defense": 116,
    "stamina": 135,
    "maxCp": 1098,
    "maxCp40": 971,
    "cpRaid100": 555,
    "cpWeather100": 694,
    "cpResearch100": 416,
    "pveScore": 16,
    "dps": 10.99,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 4
  },
  {
    "name": "Lumineon",
    "pokedexId": 457,
    "slug": "lumineon",
    "types": [
      "Water"
    ],
    "attack": 142,
    "defense": 170,
    "stamina": 170,
    "maxCp": 2050,
    "maxCp40": 1814,
    "cpRaid100": 1036,
    "cpWeather100": 1295,
    "cpResearch100": 777,
    "pveScore": 27,
    "dps": 16.25,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 4
  },
  {
    "name": "Mantyke",
    "pokedexId": 458,
    "slug": "mantyke",
    "types": [
      "Water",
      "Flying"
    ],
    "attack": 104,
    "defense": 178,
    "stamina": 128,
    "maxCp": 1395,
    "maxCp40": 1234,
    "cpRaid100": 705,
    "cpWeather100": 881,
    "cpResearch100": 529,
    "pveScore": 18,
    "dps": 11.9,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 4
  },
  {
    "name": "Snover",
    "pokedexId": 459,
    "slug": "snover",
    "types": [
      "Grass",
      "Ice"
    ],
    "attack": 115,
    "defense": 105,
    "stamina": 155,
    "maxCp": 1311,
    "maxCp40": 1159,
    "cpRaid100": 662,
    "cpWeather100": 828,
    "cpResearch100": 497,
    "pveScore": 21,
    "dps": 14.66,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 4
  },
  {
    "name": "Abomasnow",
    "pokedexId": 460,
    "slug": "abomasnow",
    "types": [
      "Grass",
      "Ice"
    ],
    "attack": 178,
    "defense": 158,
    "stamina": 207,
    "maxCp": 2670,
    "maxCp40": 2362,
    "cpRaid100": 1349,
    "cpWeather100": 1687,
    "cpResearch100": 1012,
    "pveScore": 39,
    "dps": 22.7,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 4
  },
  {
    "name": "Weavile",
    "pokedexId": 461,
    "slug": "weavile",
    "types": [
      "Dark",
      "Ice"
    ],
    "attack": 243,
    "defense": 170,
    "stamina": 172,
    "maxCp": 3388,
    "maxCp40": 2997,
    "cpRaid100": 1712,
    "cpWeather100": 2140,
    "cpResearch100": 1284,
    "pveScore": 46,
    "dps": 28.02,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "generation": 4
  },
  {
    "name": "Magnezone",
    "pokedexId": 462,
    "slug": "magnezone",
    "types": [
      "Electric",
      "Steel"
    ],
    "attack": 238,
    "defense": 205,
    "stamina": 172,
    "maxCp": 3623,
    "maxCp40": 3205,
    "cpRaid100": 1831,
    "cpWeather100": 2289,
    "cpResearch100": 1373,
    "pveScore": 47,
    "dps": 27.23,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 4
  },
  {
    "name": "Lickilicky",
    "pokedexId": 463,
    "slug": "lickilicky",
    "types": [
      "Normal"
    ],
    "attack": 160,
    "defense": 180,
    "stamina": 242,
    "maxCp": 2766,
    "maxCp40": 2446,
    "cpRaid100": 1398,
    "cpWeather100": 1747,
    "cpResearch100": 1048,
    "pveScore": 35,
    "dps": 19.32,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 4
  },
  {
    "name": "Tangrowth",
    "pokedexId": 465,
    "slug": "tangrowth",
    "types": [
      "Grass"
    ],
    "attack": 207,
    "defense": 184,
    "stamina": 225,
    "maxCp": 3425,
    "maxCp40": 3030,
    "cpRaid100": 1731,
    "cpWeather100": 2164,
    "cpResearch100": 1298,
    "pveScore": 48,
    "dps": 26.39,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 4
  },
  {
    "name": "Electivire",
    "pokedexId": 466,
    "slug": "electivire",
    "types": [
      "Electric"
    ],
    "attack": 249,
    "defense": 163,
    "stamina": 181,
    "maxCp": 3481,
    "maxCp40": 3079,
    "cpRaid100": 1759,
    "cpWeather100": 2199,
    "cpResearch100": 1320,
    "pveScore": 47,
    "dps": 28.49,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 4
  },
  {
    "name": "Magmortar",
    "pokedexId": 467,
    "slug": "magmortar",
    "types": [
      "Fire"
    ],
    "attack": 246,
    "defense": 172,
    "stamina": 181,
    "maxCp": 3528,
    "maxCp40": 3120,
    "cpRaid100": 1783,
    "cpWeather100": 2229,
    "cpResearch100": 1337,
    "pveScore": 55,
    "dps": 32.8,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 4
  },
  {
    "name": "Togekiss",
    "pokedexId": 468,
    "slug": "togekiss",
    "types": [
      "Fairy",
      "Flying"
    ],
    "attack": 225,
    "defense": 217,
    "stamina": 198,
    "maxCp": 3767,
    "maxCp40": 3332,
    "cpRaid100": 1904,
    "cpWeather100": 2380,
    "cpResearch100": 1428,
    "pveScore": 50,
    "dps": 27.27,
    "bestFastMove": {
      "name": "Charm",
      "type": "Fairy"
    },
    "bestChargedMove": {
      "name": "Dazzling Gleam",
      "type": "Fairy"
    },
    "generation": 4
  },
  {
    "name": "Yanmega",
    "pokedexId": 469,
    "slug": "yanmega",
    "types": [
      "Bug",
      "Flying"
    ],
    "attack": 231,
    "defense": 155,
    "stamina": 200,
    "maxCp": 3320,
    "maxCp40": 2937,
    "cpRaid100": 1678,
    "cpWeather100": 2098,
    "cpResearch100": 1258,
    "pveScore": 42,
    "dps": 25.11,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 4
  },
  {
    "name": "Leafeon",
    "pokedexId": 470,
    "slug": "leafeon",
    "types": [
      "Grass"
    ],
    "attack": 216,
    "defense": 220,
    "stamina": 163,
    "maxCp": 3335,
    "maxCp40": 2950,
    "cpRaid100": 1686,
    "cpWeather100": 2107,
    "cpResearch100": 1264,
    "pveScore": 48,
    "dps": 27.54,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 4
  },
  {
    "name": "Glaceon",
    "pokedexId": 471,
    "slug": "glaceon",
    "types": [
      "Ice"
    ],
    "attack": 238,
    "defense": 205,
    "stamina": 163,
    "maxCp": 3535,
    "maxCp40": 3126,
    "cpRaid100": 1786,
    "cpWeather100": 2233,
    "cpResearch100": 1340,
    "pveScore": 46,
    "dps": 27.0,
    "bestFastMove": {
      "name": "Powder Snow",
      "type": "Ice"
    },
    "bestChargedMove": {
      "name": "Avalanche",
      "type": "Ice"
    },
    "generation": 4
  },
  {
    "name": "Gliscor",
    "pokedexId": 472,
    "slug": "gliscor",
    "types": [
      "Ground",
      "Flying"
    ],
    "attack": 185,
    "defense": 221,
    "stamina": 181,
    "maxCp": 3037,
    "maxCp40": 2686,
    "cpRaid100": 1535,
    "cpWeather100": 1919,
    "cpResearch100": 1151,
    "pveScore": 41,
    "dps": 22.99,
    "bestFastMove": {
      "name": "Mud-Slap",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Earthquake",
      "type": "Ground"
    },
    "generation": 4
  },
  {
    "name": "Porygon-Z",
    "pokedexId": 474,
    "slug": "porygon-z",
    "types": [
      "Normal"
    ],
    "attack": 264,
    "defense": 151,
    "stamina": 198,
    "maxCp": 3704,
    "maxCp40": 3276,
    "cpRaid100": 1872,
    "cpWeather100": 2340,
    "cpResearch100": 1404,
    "pveScore": 53,
    "dps": 31.88,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 4
  },
  {
    "name": "Gallade",
    "pokedexId": 475,
    "slug": "gallade",
    "types": [
      "Psychic",
      "Fighting"
    ],
    "attack": 237,
    "defense": 194,
    "stamina": 169,
    "maxCp": 3489,
    "maxCp40": 3086,
    "cpRaid100": 1763,
    "cpWeather100": 2204,
    "cpResearch100": 1322,
    "pveScore": 50,
    "dps": 29.2,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 4
  },
  {
    "name": "Probopass",
    "pokedexId": 476,
    "slug": "probopass",
    "types": [
      "Rock",
      "Steel"
    ],
    "attack": 135,
    "defense": 276,
    "stamina": 155,
    "maxCp": 2355,
    "maxCp40": 2083,
    "cpRaid100": 1190,
    "cpWeather100": 1488,
    "cpResearch100": 893,
    "pveScore": 28,
    "dps": 15.57,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 4
  },
  {
    "name": "Dusknoir",
    "pokedexId": 477,
    "slug": "dusknoir",
    "types": [
      "Ghost"
    ],
    "attack": 180,
    "defense": 254,
    "stamina": 128,
    "maxCp": 2700,
    "maxCp40": 2388,
    "cpRaid100": 1364,
    "cpWeather100": 1706,
    "cpResearch100": 1023,
    "pveScore": 40,
    "dps": 23.35,
    "bestFastMove": {
      "name": "Shadow Claw",
      "type": "Ghost"
    },
    "bestChargedMove": {
      "name": "Shadow Ball",
      "type": "Ghost"
    },
    "generation": 4
  },
  {
    "name": "Froslass",
    "pokedexId": 478,
    "slug": "froslass",
    "types": [
      "Ice",
      "Ghost"
    ],
    "attack": 171,
    "defense": 150,
    "stamina": 172,
    "maxCp": 2306,
    "maxCp40": 2040,
    "cpRaid100": 1166,
    "cpWeather100": 1457,
    "cpResearch100": 874,
    "pveScore": 31,
    "dps": 19.4,
    "bestFastMove": {
      "name": "Powder Snow",
      "type": "Ice"
    },
    "bestChargedMove": {
      "name": "Avalanche",
      "type": "Ice"
    },
    "generation": 4
  },
  {
    "name": "Rotom",
    "pokedexId": 479,
    "slug": "rotom",
    "types": [
      "Electric",
      "Ghost"
    ],
    "attack": 184,
    "defense": 159,
    "stamina": 137,
    "maxCp": 2285,
    "maxCp40": 2021,
    "cpRaid100": 1154,
    "cpWeather100": 1443,
    "cpResearch100": 866,
    "pveScore": 32,
    "dps": 21.05,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 4
  },
  {
    "name": "Uxie",
    "pokedexId": 480,
    "slug": "uxie",
    "types": [
      "Psychic"
    ],
    "attack": 156,
    "defense": 270,
    "stamina": 181,
    "maxCp": 2853,
    "maxCp40": 2524,
    "cpRaid100": 1442,
    "cpWeather100": 1803,
    "cpResearch100": 1081,
    "pveScore": 36,
    "dps": 19.22,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 4
  },
  {
    "name": "Mesprit",
    "pokedexId": 481,
    "slug": "mesprit",
    "types": [
      "Psychic"
    ],
    "attack": 212,
    "defense": 212,
    "stamina": 190,
    "maxCp": 3457,
    "maxCp40": 3058,
    "cpRaid100": 1747,
    "cpWeather100": 2184,
    "cpResearch100": 1310,
    "pveScore": 47,
    "dps": 26.12,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 4
  },
  {
    "name": "Azelf",
    "pokedexId": 482,
    "slug": "azelf",
    "types": [
      "Psychic"
    ],
    "attack": 270,
    "defense": 151,
    "stamina": 181,
    "maxCp": 3629,
    "maxCp40": 3210,
    "cpRaid100": 1834,
    "cpWeather100": 2293,
    "cpResearch100": 1376,
    "pveScore": 54,
    "dps": 33.26,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 4
  },
  {
    "name": "Dialga",
    "pokedexId": 483,
    "slug": "dialga",
    "types": [
      "Steel",
      "Dragon"
    ],
    "attack": 274,
    "defense": 211,
    "stamina": 204,
    "maxCp": 4539,
    "maxCp40": 4015,
    "cpRaid100": 2294,
    "cpWeather100": 2868,
    "cpResearch100": 1721,
    "pveScore": 62,
    "dps": 34.04,
    "bestFastMove": {
      "name": "Dragon Breath",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Draco Meteor",
      "type": "Dragon"
    },
    "generation": 4
  },
  {
    "name": "Palkia",
    "pokedexId": 484,
    "slug": "palkia",
    "types": [
      "Water",
      "Dragon"
    ],
    "attack": 279,
    "defense": 215,
    "stamina": 188,
    "maxCp": 4485,
    "maxCp40": 3967,
    "cpRaid100": 2267,
    "cpWeather100": 2834,
    "cpResearch100": 1700,
    "pveScore": 54,
    "dps": 30.23,
    "bestFastMove": {
      "name": "Dragon Breath",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Aqua Tail",
      "type": "Water"
    },
    "generation": 4
  },
  {
    "name": "Heatran",
    "pokedexId": 485,
    "slug": "heatran",
    "types": [
      "Fire",
      "Steel"
    ],
    "attack": 251,
    "defense": 213,
    "stamina": 209,
    "maxCp": 4244,
    "maxCp40": 3754,
    "cpRaid100": 2145,
    "cpWeather100": 2681,
    "cpResearch100": 1609,
    "pveScore": 62,
    "dps": 33.47,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 4
  },
  {
    "name": "Regigigas",
    "pokedexId": 486,
    "slug": "regigigas",
    "types": [
      "Normal"
    ],
    "attack": 287,
    "defense": 210,
    "stamina": 220,
    "maxCp": 4903,
    "maxCp40": 4337,
    "cpRaid100": 2478,
    "cpWeather100": 3098,
    "cpResearch100": 1858,
    "pveScore": 71,
    "dps": 38.39,
    "bestFastMove": {
      "name": "Hidden Power",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Giga Impact",
      "type": "Normal"
    },
    "generation": 4
  },
  {
    "name": "Giratina Altered",
    "pokedexId": 487,
    "slug": "giratina-altered",
    "types": [
      "Ghost",
      "Dragon"
    ],
    "attack": 187,
    "defense": 225,
    "stamina": 283,
    "maxCp": 3814,
    "maxCp40": 3374,
    "cpRaid100": 1927,
    "cpWeather100": 2410,
    "cpResearch100": 1446,
    "pveScore": 49,
    "dps": 24.26,
    "bestFastMove": {
      "name": "Shadow Claw",
      "type": "Ghost"
    },
    "bestChargedMove": {
      "name": "Shadow Ball",
      "type": "Ghost"
    },
    "generation": 4
  },
  {
    "name": "Cresselia",
    "pokedexId": 488,
    "slug": "cresselia",
    "types": [
      "Psychic"
    ],
    "attack": 152,
    "defense": 237,
    "stamina": 260,
    "maxCp": 3104,
    "maxCp40": 2745,
    "cpRaid100": 1568,
    "cpWeather100": 1961,
    "cpResearch100": 1176,
    "pveScore": 37,
    "dps": 18.72,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 4
  },
  {
    "name": "Phione",
    "pokedexId": 489,
    "slug": "phione",
    "types": [
      "Water"
    ],
    "attack": 162,
    "defense": 162,
    "stamina": 190,
    "maxCp": 2380,
    "maxCp40": 2105,
    "cpRaid100": 1203,
    "cpWeather100": 1504,
    "cpResearch100": 902,
    "pveScore": 31,
    "dps": 18.54,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 4
  },
  {
    "name": "Manaphy",
    "pokedexId": 490,
    "slug": "manaphy",
    "types": [
      "Water"
    ],
    "attack": 210,
    "defense": 210,
    "stamina": 225,
    "maxCp": 3691,
    "maxCp40": 3265,
    "cpRaid100": 1865,
    "cpWeather100": 2332,
    "cpResearch100": 1399,
    "pveScore": 45,
    "dps": 24.03,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 4
  },
  {
    "name": "Shaymin Land",
    "pokedexId": 492,
    "slug": "shaymin-land",
    "types": [
      "Grass"
    ],
    "attack": 210,
    "defense": 210,
    "stamina": 225,
    "maxCp": 3691,
    "maxCp40": 3265,
    "cpRaid100": 1865,
    "cpWeather100": 2332,
    "cpResearch100": 1399,
    "pveScore": 50,
    "dps": 26.78,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 4
  },
  {
    "name": "Arceus",
    "pokedexId": 493,
    "slug": "arceus",
    "types": [
      "Normal"
    ],
    "attack": 238,
    "defense": 238,
    "stamina": 236,
    "maxCp": 4501,
    "maxCp40": 3982,
    "cpRaid100": 2275,
    "cpWeather100": 2844,
    "cpResearch100": 1706,
    "pveScore": 56,
    "dps": 28.74,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 4
  },
  {
    "name": "Victini",
    "pokedexId": 494,
    "slug": "victini",
    "types": [
      "Psychic",
      "Fire"
    ],
    "attack": 210,
    "defense": 210,
    "stamina": 225,
    "maxCp": 3691,
    "maxCp40": 3265,
    "cpRaid100": 1865,
    "cpWeather100": 2332,
    "cpResearch100": 1399,
    "pveScore": 48,
    "dps": 25.87,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 5
  },
  {
    "name": "Snivy",
    "pokedexId": 495,
    "slug": "snivy",
    "types": [
      "Grass"
    ],
    "attack": 88,
    "defense": 107,
    "stamina": 128,
    "maxCp": 960,
    "maxCp40": 849,
    "cpRaid100": 485,
    "cpWeather100": 606,
    "cpResearch100": 364,
    "pveScore": 15,
    "dps": 11.22,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 5
  },
  {
    "name": "Servine",
    "pokedexId": 496,
    "slug": "servine",
    "types": [
      "Grass"
    ],
    "attack": 122,
    "defense": 152,
    "stamina": 155,
    "maxCp": 1629,
    "maxCp40": 1441,
    "cpRaid100": 823,
    "cpWeather100": 1029,
    "cpResearch100": 617,
    "pveScore": 24,
    "dps": 15.55,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 5
  },
  {
    "name": "Serperior",
    "pokedexId": 497,
    "slug": "serperior",
    "types": [
      "Grass"
    ],
    "attack": 161,
    "defense": 204,
    "stamina": 181,
    "maxCp": 2574,
    "maxCp40": 2277,
    "cpRaid100": 1301,
    "cpWeather100": 1626,
    "cpResearch100": 976,
    "pveScore": 36,
    "dps": 20.53,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 5
  },
  {
    "name": "Tepig",
    "pokedexId": 498,
    "slug": "tepig",
    "types": [
      "Fire"
    ],
    "attack": 114,
    "defense": 85,
    "stamina": 163,
    "maxCp": 1215,
    "maxCp40": 1074,
    "cpRaid100": 614,
    "cpWeather100": 767,
    "cpResearch100": 460,
    "pveScore": 21,
    "dps": 15.2,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 5
  },
  {
    "name": "Pignite",
    "pokedexId": 499,
    "slug": "pignite",
    "types": [
      "Fire",
      "Fighting"
    ],
    "attack": 173,
    "defense": 106,
    "stamina": 207,
    "maxCp": 2175,
    "maxCp40": 1924,
    "cpRaid100": 1099,
    "cpWeather100": 1374,
    "cpResearch100": 824,
    "pveScore": 36,
    "dps": 23.07,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 5
  },
  {
    "name": "Emboar",
    "pokedexId": 500,
    "slug": "emboar",
    "types": [
      "Fire",
      "Fighting"
    ],
    "attack": 235,
    "defense": 127,
    "stamina": 242,
    "maxCp": 3372,
    "maxCp40": 2982,
    "cpRaid100": 1704,
    "cpWeather100": 2130,
    "cpResearch100": 1278,
    "pveScore": 52,
    "dps": 31.33,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 5
  },
  {
    "name": "Oshawott",
    "pokedexId": 501,
    "slug": "oshawott",
    "types": [
      "Water"
    ],
    "attack": 117,
    "defense": 85,
    "stamina": 146,
    "maxCp": 1182,
    "maxCp40": 1046,
    "cpRaid100": 597,
    "cpWeather100": 747,
    "cpResearch100": 448,
    "pveScore": 18,
    "dps": 13.39,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 5
  },
  {
    "name": "Dewott",
    "pokedexId": 502,
    "slug": "dewott",
    "types": [
      "Water"
    ],
    "attack": 159,
    "defense": 116,
    "stamina": 181,
    "maxCp": 1968,
    "maxCp40": 1741,
    "cpRaid100": 995,
    "cpWeather100": 1243,
    "cpResearch100": 746,
    "pveScore": 28,
    "dps": 18.19,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 5
  },
  {
    "name": "Samurott",
    "pokedexId": 503,
    "slug": "samurott",
    "types": [
      "Water"
    ],
    "attack": 212,
    "defense": 157,
    "stamina": 216,
    "maxCp": 3194,
    "maxCp40": 2826,
    "cpRaid100": 1614,
    "cpWeather100": 2018,
    "cpResearch100": 1211,
    "pveScore": 42,
    "dps": 24.26,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 5
  },
  {
    "name": "Patrat",
    "pokedexId": 504,
    "slug": "patrat",
    "types": [
      "Normal"
    ],
    "attack": 98,
    "defense": 73,
    "stamina": 128,
    "maxCp": 895,
    "maxCp40": 791,
    "cpRaid100": 452,
    "cpWeather100": 565,
    "cpResearch100": 339,
    "pveScore": 15,
    "dps": 11.84,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 5
  },
  {
    "name": "Watchog",
    "pokedexId": 505,
    "slug": "watchog",
    "types": [
      "Normal"
    ],
    "attack": 164,
    "defense": 139,
    "stamina": 155,
    "maxCp": 2045,
    "maxCp40": 1808,
    "cpRaid100": 1033,
    "cpWeather100": 1292,
    "cpResearch100": 775,
    "pveScore": 30,
    "dps": 19.81,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 5
  },
  {
    "name": "Lillipup",
    "pokedexId": 506,
    "slug": "lillipup",
    "types": [
      "Normal"
    ],
    "attack": 107,
    "defense": 86,
    "stamina": 128,
    "maxCp": 1035,
    "maxCp40": 915,
    "cpRaid100": 523,
    "cpWeather100": 654,
    "cpResearch100": 392,
    "pveScore": 17,
    "dps": 12.92,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 5
  },
  {
    "name": "Herdier",
    "pokedexId": 507,
    "slug": "herdier",
    "types": [
      "Normal"
    ],
    "attack": 144,
    "defense": 126,
    "stamina": 163,
    "maxCp": 1778,
    "maxCp40": 1573,
    "cpRaid100": 898,
    "cpWeather100": 1123,
    "cpResearch100": 674,
    "pveScore": 26,
    "dps": 17.39,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 5
  },
  {
    "name": "Stoutland",
    "pokedexId": 508,
    "slug": "stoutland",
    "types": [
      "Normal"
    ],
    "attack": 206,
    "defense": 182,
    "stamina": 198,
    "maxCp": 3196,
    "maxCp40": 2827,
    "cpRaid100": 1615,
    "cpWeather100": 2019,
    "cpResearch100": 1211,
    "pveScore": 43,
    "dps": 24.88,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 5
  },
  {
    "name": "Purrloin",
    "pokedexId": 509,
    "slug": "purrloin",
    "types": [
      "Dark"
    ],
    "attack": 98,
    "defense": 73,
    "stamina": 121,
    "maxCp": 872,
    "maxCp40": 772,
    "cpRaid100": 441,
    "cpWeather100": 551,
    "cpResearch100": 330,
    "pveScore": 15,
    "dps": 11.3,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "generation": 5
  },
  {
    "name": "Liepard",
    "pokedexId": 510,
    "slug": "liepard",
    "types": [
      "Dark"
    ],
    "attack": 187,
    "defense": 106,
    "stamina": 162,
    "maxCp": 2087,
    "maxCp40": 1846,
    "cpRaid100": 1055,
    "cpWeather100": 1318,
    "cpResearch100": 791,
    "pveScore": 31,
    "dps": 21.56,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "generation": 5
  },
  {
    "name": "Pansage",
    "pokedexId": 511,
    "slug": "pansage",
    "types": [
      "Grass"
    ],
    "attack": 104,
    "defense": 94,
    "stamina": 137,
    "maxCp": 1081,
    "maxCp40": 956,
    "cpRaid100": 546,
    "cpWeather100": 683,
    "cpResearch100": 410,
    "pveScore": 18,
    "dps": 13.26,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 5
  },
  {
    "name": "Simisage",
    "pokedexId": 512,
    "slug": "simisage",
    "types": [
      "Grass"
    ],
    "attack": 206,
    "defense": 133,
    "stamina": 181,
    "maxCp": 2657,
    "maxCp40": 2350,
    "cpRaid100": 1343,
    "cpWeather100": 1679,
    "cpResearch100": 1007,
    "pveScore": 41,
    "dps": 26.26,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 5
  },
  {
    "name": "Pansear",
    "pokedexId": 513,
    "slug": "pansear",
    "types": [
      "Fire"
    ],
    "attack": 104,
    "defense": 94,
    "stamina": 137,
    "maxCp": 1081,
    "maxCp40": 956,
    "cpRaid100": 546,
    "cpWeather100": 683,
    "cpResearch100": 410,
    "pveScore": 19,
    "dps": 13.87,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 5
  },
  {
    "name": "Simisear",
    "pokedexId": 514,
    "slug": "simisear",
    "types": [
      "Fire"
    ],
    "attack": 206,
    "defense": 133,
    "stamina": 181,
    "maxCp": 2657,
    "maxCp40": 2350,
    "cpRaid100": 1343,
    "cpWeather100": 1679,
    "cpResearch100": 1007,
    "pveScore": 43,
    "dps": 27.47,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 5
  },
  {
    "name": "Panpour",
    "pokedexId": 515,
    "slug": "panpour",
    "types": [
      "Water"
    ],
    "attack": 104,
    "defense": 94,
    "stamina": 137,
    "maxCp": 1081,
    "maxCp40": 956,
    "cpRaid100": 546,
    "cpWeather100": 683,
    "cpResearch100": 410,
    "pveScore": 16,
    "dps": 11.9,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 5
  },
  {
    "name": "Simipour",
    "pokedexId": 516,
    "slug": "simipour",
    "types": [
      "Water"
    ],
    "attack": 206,
    "defense": 133,
    "stamina": 181,
    "maxCp": 2657,
    "maxCp40": 2350,
    "cpRaid100": 1343,
    "cpWeather100": 1679,
    "cpResearch100": 1007,
    "pveScore": 37,
    "dps": 23.57,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 5
  },
  {
    "name": "Munna",
    "pokedexId": 517,
    "slug": "munna",
    "types": [
      "Psychic"
    ],
    "attack": 111,
    "defense": 92,
    "stamina": 183,
    "maxCp": 1294,
    "maxCp40": 1145,
    "cpRaid100": 654,
    "cpWeather100": 818,
    "cpResearch100": 490,
    "pveScore": 20,
    "dps": 13.67,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 5
  },
  {
    "name": "Musharna",
    "pokedexId": 518,
    "slug": "musharna",
    "types": [
      "Psychic"
    ],
    "attack": 183,
    "defense": 166,
    "stamina": 253,
    "maxCp": 3079,
    "maxCp40": 2723,
    "cpRaid100": 1556,
    "cpWeather100": 1945,
    "cpResearch100": 1167,
    "pveScore": 41,
    "dps": 22.54,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 5
  },
  {
    "name": "Pidove",
    "pokedexId": 519,
    "slug": "pidove",
    "types": [
      "Normal",
      "Flying"
    ],
    "attack": 99,
    "defense": 80,
    "stamina": 137,
    "maxCp": 967,
    "maxCp40": 855,
    "cpRaid100": 488,
    "cpWeather100": 611,
    "cpResearch100": 366,
    "pveScore": 15,
    "dps": 11.96,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 5
  },
  {
    "name": "Tranquill",
    "pokedexId": 520,
    "slug": "tranquill",
    "types": [
      "Normal",
      "Flying"
    ],
    "attack": 144,
    "defense": 107,
    "stamina": 158,
    "maxCp": 1631,
    "maxCp40": 1442,
    "cpRaid100": 824,
    "cpWeather100": 1030,
    "cpResearch100": 618,
    "pveScore": 25,
    "dps": 17.39,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 5
  },
  {
    "name": "Unfezant",
    "pokedexId": 521,
    "slug": "unfezant",
    "types": [
      "Normal",
      "Flying"
    ],
    "attack": 225,
    "defense": 146,
    "stamina": 190,
    "maxCp": 3078,
    "maxCp40": 2723,
    "cpRaid100": 1556,
    "cpWeather100": 1945,
    "cpResearch100": 1167,
    "pveScore": 44,
    "dps": 27.17,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 5
  },
  {
    "name": "Blitzle",
    "pokedexId": 522,
    "slug": "blitzle",
    "types": [
      "Electric"
    ],
    "attack": 118,
    "defense": 64,
    "stamina": 128,
    "maxCp": 998,
    "maxCp40": 882,
    "cpRaid100": 504,
    "cpWeather100": 630,
    "cpResearch100": 378,
    "pveScore": 16,
    "dps": 13.5,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 5
  },
  {
    "name": "Zebstrika",
    "pokedexId": 523,
    "slug": "zebstrika",
    "types": [
      "Electric"
    ],
    "attack": 211,
    "defense": 136,
    "stamina": 181,
    "maxCp": 2745,
    "maxCp40": 2428,
    "cpRaid100": 1387,
    "cpWeather100": 1734,
    "cpResearch100": 1040,
    "pveScore": 38,
    "dps": 24.14,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 5
  },
  {
    "name": "Roggenrola",
    "pokedexId": 524,
    "slug": "roggenrola",
    "types": [
      "Rock"
    ],
    "attack": 121,
    "defense": 110,
    "stamina": 146,
    "maxCp": 1362,
    "maxCp40": 1205,
    "cpRaid100": 688,
    "cpWeather100": 860,
    "cpResearch100": 516,
    "pveScore": 20,
    "dps": 13.95,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 5
  },
  {
    "name": "Boldore",
    "pokedexId": 525,
    "slug": "boldore",
    "types": [
      "Rock"
    ],
    "attack": 175,
    "defense": 144,
    "stamina": 172,
    "maxCp": 2313,
    "maxCp40": 2046,
    "cpRaid100": 1169,
    "cpWeather100": 1461,
    "cpResearch100": 877,
    "pveScore": 32,
    "dps": 20.18,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 5
  },
  {
    "name": "Gigalith",
    "pokedexId": 526,
    "slug": "gigalith",
    "types": [
      "Rock"
    ],
    "attack": 226,
    "defense": 200,
    "stamina": 198,
    "maxCp": 3641,
    "maxCp40": 3221,
    "cpRaid100": 1840,
    "cpWeather100": 2300,
    "cpResearch100": 1380,
    "pveScore": 47,
    "dps": 26.06,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 5
  },
  {
    "name": "Woobat",
    "pokedexId": 527,
    "slug": "woobat",
    "types": [
      "Psychic",
      "Flying"
    ],
    "attack": 107,
    "defense": 85,
    "stamina": 163,
    "maxCp": 1149,
    "maxCp40": 1016,
    "cpRaid100": 580,
    "cpWeather100": 726,
    "cpResearch100": 435,
    "pveScore": 18,
    "dps": 13.18,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 5
  },
  {
    "name": "Swoobat",
    "pokedexId": 528,
    "slug": "swoobat",
    "types": [
      "Psychic",
      "Flying"
    ],
    "attack": 161,
    "defense": 119,
    "stamina": 167,
    "maxCp": 1940,
    "maxCp40": 1716,
    "cpRaid100": 980,
    "cpWeather100": 1226,
    "cpResearch100": 735,
    "pveScore": 30,
    "dps": 19.83,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 5
  },
  {
    "name": "Drilbur",
    "pokedexId": 529,
    "slug": "drilbur",
    "types": [
      "Ground"
    ],
    "attack": 154,
    "defense": 85,
    "stamina": 155,
    "maxCp": 1555,
    "maxCp40": 1376,
    "cpRaid100": 786,
    "cpWeather100": 983,
    "cpResearch100": 589,
    "pveScore": 26,
    "dps": 19.14,
    "bestFastMove": {
      "name": "Mud-Slap",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Earthquake",
      "type": "Ground"
    },
    "generation": 5
  },
  {
    "name": "Excadrill",
    "pokedexId": 530,
    "slug": "excadrill",
    "types": [
      "Ground",
      "Steel"
    ],
    "attack": 255,
    "defense": 130,
    "stamina": 242,
    "maxCp": 3680,
    "maxCp40": 3255,
    "cpRaid100": 1860,
    "cpWeather100": 2325,
    "cpResearch100": 1395,
    "pveScore": 53,
    "dps": 31.69,
    "bestFastMove": {
      "name": "Mud-Slap",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Earthquake",
      "type": "Ground"
    },
    "generation": 5
  },
  {
    "name": "Audino",
    "pokedexId": 531,
    "slug": "audino",
    "types": [
      "Normal"
    ],
    "attack": 114,
    "defense": 163,
    "stamina": 230,
    "maxCp": 1902,
    "maxCp40": 1682,
    "cpRaid100": 961,
    "cpWeather100": 1201,
    "cpResearch100": 721,
    "pveScore": 24,
    "dps": 13.77,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 5
  },
  {
    "name": "Timburr",
    "pokedexId": 532,
    "slug": "timburr",
    "types": [
      "Fighting"
    ],
    "attack": 135,
    "defense": 87,
    "stamina": 181,
    "maxCp": 1497,
    "maxCp40": 1324,
    "cpRaid100": 756,
    "cpWeather100": 946,
    "cpResearch100": 567,
    "pveScore": 25,
    "dps": 17.4,
    "bestFastMove": {
      "name": "Counter",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Dynamic Punch",
      "type": "Fighting"
    },
    "generation": 5
  },
  {
    "name": "Gurdurr",
    "pokedexId": 533,
    "slug": "gurdurr",
    "types": [
      "Fighting"
    ],
    "attack": 180,
    "defense": 134,
    "stamina": 198,
    "maxCp": 2452,
    "maxCp40": 2169,
    "cpRaid100": 1239,
    "cpWeather100": 1549,
    "cpResearch100": 929,
    "pveScore": 37,
    "dps": 23.2,
    "bestFastMove": {
      "name": "Counter",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Dynamic Punch",
      "type": "Fighting"
    },
    "generation": 5
  },
  {
    "name": "Conkeldurr",
    "pokedexId": 534,
    "slug": "conkeldurr",
    "types": [
      "Fighting"
    ],
    "attack": 243,
    "defense": 157,
    "stamina": 233,
    "maxCp": 3762,
    "maxCp40": 3328,
    "cpRaid100": 1901,
    "cpWeather100": 2377,
    "cpResearch100": 1426,
    "pveScore": 55,
    "dps": 31.32,
    "bestFastMove": {
      "name": "Counter",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Dynamic Punch",
      "type": "Fighting"
    },
    "generation": 5
  },
  {
    "name": "Tympole",
    "pokedexId": 535,
    "slug": "tympole",
    "types": [
      "Water"
    ],
    "attack": 98,
    "defense": 78,
    "stamina": 137,
    "maxCp": 948,
    "maxCp40": 839,
    "cpRaid100": 479,
    "cpWeather100": 599,
    "cpResearch100": 359,
    "pveScore": 15,
    "dps": 11.21,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 5
  },
  {
    "name": "Palpitoad",
    "pokedexId": 536,
    "slug": "palpitoad",
    "types": [
      "Water",
      "Ground"
    ],
    "attack": 128,
    "defense": 109,
    "stamina": 181,
    "maxCp": 1574,
    "maxCp40": 1392,
    "cpRaid100": 795,
    "cpWeather100": 994,
    "cpResearch100": 596,
    "pveScore": 22,
    "dps": 14.65,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 5
  },
  {
    "name": "Seismitoad",
    "pokedexId": 537,
    "slug": "seismitoad",
    "types": [
      "Water",
      "Ground"
    ],
    "attack": 187,
    "defense": 150,
    "stamina": 233,
    "maxCp": 2885,
    "maxCp40": 2552,
    "cpRaid100": 1458,
    "cpWeather100": 1822,
    "cpResearch100": 1093,
    "pveScore": 37,
    "dps": 21.4,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 5
  },
  {
    "name": "Throh",
    "pokedexId": 538,
    "slug": "throh",
    "types": [
      "Fighting"
    ],
    "attack": 172,
    "defense": 160,
    "stamina": 260,
    "maxCp": 2896,
    "maxCp40": 2562,
    "cpRaid100": 1464,
    "cpWeather100": 1830,
    "cpResearch100": 1098,
    "pveScore": 40,
    "dps": 22.17,
    "bestFastMove": {
      "name": "Counter",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Dynamic Punch",
      "type": "Fighting"
    },
    "generation": 5
  },
  {
    "name": "Sawk",
    "pokedexId": 539,
    "slug": "sawk",
    "types": [
      "Fighting"
    ],
    "attack": 231,
    "defense": 153,
    "stamina": 181,
    "maxCp": 3152,
    "maxCp40": 2788,
    "cpRaid100": 1593,
    "cpWeather100": 1991,
    "cpResearch100": 1194,
    "pveScore": 49,
    "dps": 29.77,
    "bestFastMove": {
      "name": "Counter",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Dynamic Punch",
      "type": "Fighting"
    },
    "generation": 5
  },
  {
    "name": "Sewaddle",
    "pokedexId": 540,
    "slug": "sewaddle",
    "types": [
      "Bug",
      "Grass"
    ],
    "attack": 96,
    "defense": 124,
    "stamina": 128,
    "maxCp": 1105,
    "maxCp40": 977,
    "cpRaid100": 558,
    "cpWeather100": 698,
    "cpResearch100": 418,
    "pveScore": 15,
    "dps": 10.43,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 5
  },
  {
    "name": "Swadloon",
    "pokedexId": 541,
    "slug": "swadloon",
    "types": [
      "Bug",
      "Grass"
    ],
    "attack": 115,
    "defense": 161,
    "stamina": 146,
    "maxCp": 1545,
    "maxCp40": 1366,
    "cpRaid100": 780,
    "cpWeather100": 976,
    "cpResearch100": 585,
    "pveScore": 20,
    "dps": 12.5,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 5
  },
  {
    "name": "Leavanny",
    "pokedexId": 542,
    "slug": "leavanny",
    "types": [
      "Bug",
      "Grass"
    ],
    "attack": 204,
    "defense": 165,
    "stamina": 181,
    "maxCp": 2904,
    "maxCp40": 2569,
    "cpRaid100": 1468,
    "cpWeather100": 1835,
    "cpResearch100": 1101,
    "pveScore": 37,
    "dps": 22.17,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 5
  },
  {
    "name": "Venipede",
    "pokedexId": 543,
    "slug": "venipede",
    "types": [
      "Bug",
      "Poison"
    ],
    "attack": 83,
    "defense": 99,
    "stamina": 102,
    "maxCp": 799,
    "maxCp40": 706,
    "cpRaid100": 403,
    "cpWeather100": 504,
    "cpResearch100": 302,
    "pveScore": 15,
    "dps": 9.02,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 5
  },
  {
    "name": "Whirlipede",
    "pokedexId": 544,
    "slug": "whirlipede",
    "types": [
      "Bug",
      "Poison"
    ],
    "attack": 100,
    "defense": 173,
    "stamina": 120,
    "maxCp": 1293,
    "maxCp40": 1144,
    "cpRaid100": 653,
    "cpWeather100": 817,
    "cpResearch100": 490,
    "pveScore": 17,
    "dps": 10.87,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 5
  },
  {
    "name": "Scolipede",
    "pokedexId": 545,
    "slug": "scolipede",
    "types": [
      "Bug",
      "Poison"
    ],
    "attack": 203,
    "defense": 175,
    "stamina": 155,
    "maxCp": 2766,
    "maxCp40": 2447,
    "cpRaid100": 1398,
    "cpWeather100": 1747,
    "cpResearch100": 1048,
    "pveScore": 36,
    "dps": 22.07,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 5
  },
  {
    "name": "Cottonee",
    "pokedexId": 546,
    "slug": "cottonee",
    "types": [
      "Grass",
      "Fairy"
    ],
    "attack": 70,
    "defense": 110,
    "stamina": 120,
    "maxCp": 779,
    "maxCp40": 689,
    "cpRaid100": 394,
    "cpWeather100": 492,
    "cpResearch100": 295,
    "pveScore": 15,
    "dps": 8.93,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 5
  },
  {
    "name": "Whimsicott",
    "pokedexId": 547,
    "slug": "whimsicott",
    "types": [
      "Grass",
      "Fairy"
    ],
    "attack": 164,
    "defense": 176,
    "stamina": 155,
    "maxCp": 2277,
    "maxCp40": 2014,
    "cpRaid100": 1151,
    "cpWeather100": 1439,
    "cpResearch100": 863,
    "pveScore": 34,
    "dps": 20.91,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 5
  },
  {
    "name": "Petilil",
    "pokedexId": 548,
    "slug": "petilil",
    "types": [
      "Grass"
    ],
    "attack": 119,
    "defense": 91,
    "stamina": 128,
    "maxCp": 1164,
    "maxCp40": 1030,
    "cpRaid100": 588,
    "cpWeather100": 736,
    "cpResearch100": 441,
    "pveScore": 20,
    "dps": 15.17,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 5
  },
  {
    "name": "Lilligant",
    "pokedexId": 549,
    "slug": "lilligant",
    "types": [
      "Grass"
    ],
    "attack": 214,
    "defense": 154,
    "stamina": 172,
    "maxCp": 2874,
    "maxCp40": 2542,
    "cpRaid100": 1452,
    "cpWeather100": 1816,
    "cpResearch100": 1089,
    "pveScore": 44,
    "dps": 27.29,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 5
  },
  {
    "name": "Basculin Red Striped",
    "pokedexId": 550,
    "slug": "basculin-red-striped",
    "types": [
      "Water"
    ],
    "attack": 189,
    "defense": 128,
    "stamina": 172,
    "maxCp": 2355,
    "maxCp40": 2083,
    "cpRaid100": 1190,
    "cpWeather100": 1488,
    "cpResearch100": 893,
    "pveScore": 33,
    "dps": 21.63,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 5
  },
  {
    "name": "Sandile",
    "pokedexId": 551,
    "slug": "sandile",
    "types": [
      "Ground",
      "Dark"
    ],
    "attack": 132,
    "defense": 69,
    "stamina": 137,
    "maxCp": 1172,
    "maxCp40": 1037,
    "cpRaid100": 592,
    "cpWeather100": 741,
    "cpResearch100": 444,
    "pveScore": 20,
    "dps": 16.4,
    "bestFastMove": {
      "name": "Mud-Slap",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Earthquake",
      "type": "Ground"
    },
    "generation": 5
  },
  {
    "name": "Krokorok",
    "pokedexId": 552,
    "slug": "krokorok",
    "types": [
      "Ground",
      "Dark"
    ],
    "attack": 154,
    "defense": 90,
    "stamina": 155,
    "maxCp": 1594,
    "maxCp40": 1410,
    "cpRaid100": 805,
    "cpWeather100": 1007,
    "cpResearch100": 604,
    "pveScore": 26,
    "dps": 19.14,
    "bestFastMove": {
      "name": "Mud-Slap",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Earthquake",
      "type": "Ground"
    },
    "generation": 5
  },
  {
    "name": "Krookodile",
    "pokedexId": 553,
    "slug": "krookodile",
    "types": [
      "Ground",
      "Dark"
    ],
    "attack": 229,
    "defense": 158,
    "stamina": 216,
    "maxCp": 3444,
    "maxCp40": 3046,
    "cpRaid100": 1740,
    "cpWeather100": 2176,
    "cpResearch100": 1305,
    "pveScore": 49,
    "dps": 28.46,
    "bestFastMove": {
      "name": "Mud-Slap",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Earthquake",
      "type": "Ground"
    },
    "generation": 5
  },
  {
    "name": "Darumaka",
    "pokedexId": 554,
    "slug": "darumaka",
    "types": [
      "Fire"
    ],
    "attack": 153,
    "defense": 86,
    "stamina": 172,
    "maxCp": 1630,
    "maxCp40": 1442,
    "cpRaid100": 823,
    "cpWeather100": 1030,
    "cpResearch100": 618,
    "pveScore": 28,
    "dps": 20.4,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 5
  },
  {
    "name": "Darmanitan Standard",
    "pokedexId": 555,
    "slug": "darmanitan-standard",
    "types": [
      "Fire"
    ],
    "attack": 263,
    "defense": 114,
    "stamina": 233,
    "maxCp": 3511,
    "maxCp40": 3105,
    "cpRaid100": 1774,
    "cpWeather100": 2218,
    "cpResearch100": 1331,
    "pveScore": 57,
    "dps": 35.07,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 5
  },
  {
    "name": "Maractus",
    "pokedexId": 556,
    "slug": "maractus",
    "types": [
      "Grass"
    ],
    "attack": 201,
    "defense": 130,
    "stamina": 181,
    "maxCp": 2571,
    "maxCp40": 2274,
    "cpRaid100": 1299,
    "cpWeather100": 1624,
    "cpResearch100": 974,
    "pveScore": 40,
    "dps": 25.63,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 5
  },
  {
    "name": "Dwebble",
    "pokedexId": 557,
    "slug": "dwebble",
    "types": [
      "Bug",
      "Rock"
    ],
    "attack": 118,
    "defense": 127,
    "stamina": 137,
    "maxCp": 1379,
    "maxCp40": 1220,
    "cpRaid100": 697,
    "cpWeather100": 871,
    "cpResearch100": 523,
    "pveScore": 19,
    "dps": 12.83,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 5
  },
  {
    "name": "Crustle",
    "pokedexId": 558,
    "slug": "crustle",
    "types": [
      "Bug",
      "Rock"
    ],
    "attack": 188,
    "defense": 200,
    "stamina": 172,
    "maxCp": 2874,
    "maxCp40": 2542,
    "cpRaid100": 1452,
    "cpWeather100": 1815,
    "cpResearch100": 1089,
    "pveScore": 35,
    "dps": 20.43,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 5
  },
  {
    "name": "Scraggy",
    "pokedexId": 559,
    "slug": "scraggy",
    "types": [
      "Dark",
      "Fighting"
    ],
    "attack": 132,
    "defense": 132,
    "stamina": 137,
    "maxCp": 1551,
    "maxCp40": 1372,
    "cpRaid100": 784,
    "cpWeather100": 980,
    "cpResearch100": 588,
    "pveScore": 22,
    "dps": 15.22,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "generation": 5
  },
  {
    "name": "Scrafty",
    "pokedexId": 560,
    "slug": "scrafty",
    "types": [
      "Dark",
      "Fighting"
    ],
    "attack": 163,
    "defense": 222,
    "stamina": 163,
    "maxCp": 2581,
    "maxCp40": 2283,
    "cpRaid100": 1304,
    "cpWeather100": 1631,
    "cpResearch100": 978,
    "pveScore": 33,
    "dps": 18.8,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "generation": 5
  },
  {
    "name": "Sigilyph",
    "pokedexId": 561,
    "slug": "sigilyph",
    "types": [
      "Psychic",
      "Flying"
    ],
    "attack": 203,
    "defense": 167,
    "stamina": 176,
    "maxCp": 2869,
    "maxCp40": 2538,
    "cpRaid100": 1450,
    "cpWeather100": 1813,
    "cpResearch100": 1088,
    "pveScore": 41,
    "dps": 25.01,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 5
  },
  {
    "name": "Yamask",
    "pokedexId": 562,
    "slug": "yamask",
    "types": [
      "Ghost"
    ],
    "attack": 94,
    "defense": 141,
    "stamina": 116,
    "maxCp": 1100,
    "maxCp40": 973,
    "cpRaid100": 556,
    "cpWeather100": 695,
    "cpResearch100": 417,
    "pveScore": 17,
    "dps": 12.2,
    "bestFastMove": {
      "name": "Shadow Claw",
      "type": "Ghost"
    },
    "bestChargedMove": {
      "name": "Shadow Ball",
      "type": "Ghost"
    },
    "generation": 5
  },
  {
    "name": "Cofagrigus",
    "pokedexId": 563,
    "slug": "cofagrigus",
    "types": [
      "Ghost"
    ],
    "attack": 163,
    "defense": 237,
    "stamina": 151,
    "maxCp": 2570,
    "maxCp40": 2273,
    "cpRaid100": 1299,
    "cpWeather100": 1624,
    "cpResearch100": 974,
    "pveScore": 37,
    "dps": 21.15,
    "bestFastMove": {
      "name": "Shadow Claw",
      "type": "Ghost"
    },
    "bestChargedMove": {
      "name": "Shadow Ball",
      "type": "Ghost"
    },
    "generation": 5
  },
  {
    "name": "Tirtouga",
    "pokedexId": 564,
    "slug": "tirtouga",
    "types": [
      "Water",
      "Rock"
    ],
    "attack": 134,
    "defense": 145,
    "stamina": 144,
    "maxCp": 1678,
    "maxCp40": 1484,
    "cpRaid100": 848,
    "cpWeather100": 1060,
    "cpResearch100": 636,
    "pveScore": 23,
    "dps": 15.33,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 5
  },
  {
    "name": "Carracosta",
    "pokedexId": 565,
    "slug": "carracosta",
    "types": [
      "Water",
      "Rock"
    ],
    "attack": 192,
    "defense": 197,
    "stamina": 179,
    "maxCp": 2964,
    "maxCp40": 2621,
    "cpRaid100": 1498,
    "cpWeather100": 1872,
    "cpResearch100": 1123,
    "pveScore": 38,
    "dps": 21.97,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 5
  },
  {
    "name": "Archen",
    "pokedexId": 566,
    "slug": "archen",
    "types": [
      "Rock",
      "Flying"
    ],
    "attack": 212,
    "defense": 89,
    "stamina": 146,
    "maxCp": 2074,
    "maxCp40": 1834,
    "cpRaid100": 1048,
    "cpWeather100": 1310,
    "cpResearch100": 786,
    "pveScore": 33,
    "dps": 24.45,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 5
  },
  {
    "name": "Archeops",
    "pokedexId": 567,
    "slug": "archeops",
    "types": [
      "Rock",
      "Flying"
    ],
    "attack": 292,
    "defense": 139,
    "stamina": 181,
    "maxCp": 3766,
    "maxCp40": 3331,
    "cpRaid100": 1903,
    "cpWeather100": 2379,
    "cpResearch100": 1427,
    "pveScore": 54,
    "dps": 33.67,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 5
  },
  {
    "name": "Trubbish",
    "pokedexId": 568,
    "slug": "trubbish",
    "types": [
      "Poison"
    ],
    "attack": 96,
    "defense": 122,
    "stamina": 137,
    "maxCp": 1131,
    "maxCp40": 1000,
    "cpRaid100": 571,
    "cpWeather100": 714,
    "cpResearch100": 428,
    "pveScore": 17,
    "dps": 11.77,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "generation": 5
  },
  {
    "name": "Garbodor",
    "pokedexId": 569,
    "slug": "garbodor",
    "types": [
      "Poison"
    ],
    "attack": 181,
    "defense": 164,
    "stamina": 190,
    "maxCp": 2651,
    "maxCp40": 2345,
    "cpRaid100": 1339,
    "cpWeather100": 1675,
    "cpResearch100": 1005,
    "pveScore": 37,
    "dps": 22.19,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "generation": 5
  },
  {
    "name": "Zorua",
    "pokedexId": 570,
    "slug": "zorua",
    "types": [
      "Dark"
    ],
    "attack": 153,
    "defense": 78,
    "stamina": 120,
    "maxCp": 1329,
    "maxCp40": 1175,
    "cpRaid100": 671,
    "cpWeather100": 839,
    "cpResearch100": 503,
    "pveScore": 22,
    "dps": 17.64,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "generation": 5
  },
  {
    "name": "Zoroark",
    "pokedexId": 571,
    "slug": "zoroark",
    "types": [
      "Dark"
    ],
    "attack": 250,
    "defense": 127,
    "stamina": 155,
    "maxCp": 2907,
    "maxCp40": 2571,
    "cpRaid100": 1469,
    "cpWeather100": 1836,
    "cpResearch100": 1102,
    "pveScore": 43,
    "dps": 28.83,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "generation": 5
  },
  {
    "name": "Minccino",
    "pokedexId": 572,
    "slug": "minccino",
    "types": [
      "Normal"
    ],
    "attack": 98,
    "defense": 80,
    "stamina": 146,
    "maxCp": 986,
    "maxCp40": 872,
    "cpRaid100": 498,
    "cpWeather100": 623,
    "cpResearch100": 374,
    "pveScore": 16,
    "dps": 11.84,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 5
  },
  {
    "name": "Cinccino",
    "pokedexId": 573,
    "slug": "cinccino",
    "types": [
      "Normal"
    ],
    "attack": 197,
    "defense": 130,
    "stamina": 181,
    "maxCp": 2523,
    "maxCp40": 2232,
    "cpRaid100": 1275,
    "cpWeather100": 1594,
    "cpResearch100": 956,
    "pveScore": 37,
    "dps": 23.79,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 5
  },
  {
    "name": "Gothita",
    "pokedexId": 574,
    "slug": "gothita",
    "types": [
      "Psychic"
    ],
    "attack": 98,
    "defense": 112,
    "stamina": 128,
    "maxCp": 1075,
    "maxCp40": 951,
    "cpRaid100": 543,
    "cpWeather100": 679,
    "cpResearch100": 407,
    "pveScore": 17,
    "dps": 12.07,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 5
  },
  {
    "name": "Gothorita",
    "pokedexId": 575,
    "slug": "gothorita",
    "types": [
      "Psychic"
    ],
    "attack": 137,
    "defense": 152,
    "stamina": 155,
    "maxCp": 1808,
    "maxCp40": 1599,
    "cpRaid100": 914,
    "cpWeather100": 1142,
    "cpResearch100": 685,
    "pveScore": 26,
    "dps": 16.88,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 5
  },
  {
    "name": "Gothitelle",
    "pokedexId": 576,
    "slug": "gothitelle",
    "types": [
      "Psychic"
    ],
    "attack": 176,
    "defense": 205,
    "stamina": 172,
    "maxCp": 2735,
    "maxCp40": 2419,
    "cpRaid100": 1382,
    "cpWeather100": 1728,
    "cpResearch100": 1037,
    "pveScore": 38,
    "dps": 21.68,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 5
  },
  {
    "name": "Solosis",
    "pokedexId": 577,
    "slug": "solosis",
    "types": [
      "Psychic"
    ],
    "attack": 170,
    "defense": 82,
    "stamina": 128,
    "maxCp": 1538,
    "maxCp40": 1360,
    "cpRaid100": 777,
    "cpWeather100": 972,
    "cpResearch100": 583,
    "pveScore": 27,
    "dps": 20.94,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 5
  },
  {
    "name": "Duosion",
    "pokedexId": 578,
    "slug": "duosion",
    "types": [
      "Psychic"
    ],
    "attack": 208,
    "defense": 102,
    "stamina": 163,
    "maxCp": 2272,
    "maxCp40": 2009,
    "cpRaid100": 1148,
    "cpWeather100": 1435,
    "cpResearch100": 861,
    "pveScore": 37,
    "dps": 25.62,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 5
  },
  {
    "name": "Reuniclus",
    "pokedexId": 579,
    "slug": "reuniclus",
    "types": [
      "Psychic"
    ],
    "attack": 214,
    "defense": 148,
    "stamina": 242,
    "maxCp": 3309,
    "maxCp40": 2927,
    "cpRaid100": 1672,
    "cpWeather100": 2091,
    "cpResearch100": 1254,
    "pveScore": 46,
    "dps": 26.36,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 5
  },
  {
    "name": "Ducklett",
    "pokedexId": 580,
    "slug": "ducklett",
    "types": [
      "Water",
      "Flying"
    ],
    "attack": 84,
    "defense": 96,
    "stamina": 158,
    "maxCp": 968,
    "maxCp40": 856,
    "cpRaid100": 489,
    "cpWeather100": 612,
    "cpResearch100": 367,
    "pveScore": 15,
    "dps": 9.61,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 5
  },
  {
    "name": "Swanna",
    "pokedexId": 581,
    "slug": "swanna",
    "types": [
      "Water",
      "Flying"
    ],
    "attack": 182,
    "defense": 132,
    "stamina": 181,
    "maxCp": 2361,
    "maxCp40": 2088,
    "cpRaid100": 1193,
    "cpWeather100": 1491,
    "cpResearch100": 895,
    "pveScore": 33,
    "dps": 20.83,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 5
  },
  {
    "name": "Vanillite",
    "pokedexId": 582,
    "slug": "vanillite",
    "types": [
      "Ice"
    ],
    "attack": 118,
    "defense": 106,
    "stamina": 113,
    "maxCp": 1168,
    "maxCp40": 1033,
    "cpRaid100": 590,
    "cpWeather100": 738,
    "cpResearch100": 443,
    "pveScore": 18,
    "dps": 13.39,
    "bestFastMove": {
      "name": "Powder Snow",
      "type": "Ice"
    },
    "bestChargedMove": {
      "name": "Avalanche",
      "type": "Ice"
    },
    "generation": 5
  },
  {
    "name": "Vanillish",
    "pokedexId": 583,
    "slug": "vanillish",
    "types": [
      "Ice"
    ],
    "attack": 151,
    "defense": 138,
    "stamina": 139,
    "maxCp": 1799,
    "maxCp40": 1591,
    "cpRaid100": 909,
    "cpWeather100": 1136,
    "cpResearch100": 682,
    "pveScore": 26,
    "dps": 17.13,
    "bestFastMove": {
      "name": "Powder Snow",
      "type": "Ice"
    },
    "bestChargedMove": {
      "name": "Avalanche",
      "type": "Ice"
    },
    "generation": 5
  },
  {
    "name": "Vanilluxe",
    "pokedexId": 584,
    "slug": "vanilluxe",
    "types": [
      "Ice"
    ],
    "attack": 218,
    "defense": 184,
    "stamina": 174,
    "maxCp": 3190,
    "maxCp40": 2822,
    "cpRaid100": 1612,
    "cpWeather100": 2015,
    "cpResearch100": 1209,
    "pveScore": 42,
    "dps": 24.73,
    "bestFastMove": {
      "name": "Powder Snow",
      "type": "Ice"
    },
    "bestChargedMove": {
      "name": "Avalanche",
      "type": "Ice"
    },
    "generation": 5
  },
  {
    "name": "Deerling",
    "pokedexId": 585,
    "slug": "deerling",
    "types": [
      "Normal",
      "Grass"
    ],
    "attack": 115,
    "defense": 100,
    "stamina": 155,
    "maxCp": 1283,
    "maxCp40": 1135,
    "cpRaid100": 648,
    "cpWeather100": 810,
    "cpResearch100": 486,
    "pveScore": 20,
    "dps": 13.89,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 5
  },
  {
    "name": "Sawsbuck",
    "pokedexId": 586,
    "slug": "sawsbuck",
    "types": [
      "Normal",
      "Grass"
    ],
    "attack": 198,
    "defense": 146,
    "stamina": 190,
    "maxCp": 2732,
    "maxCp40": 2416,
    "cpRaid100": 1381,
    "cpWeather100": 1726,
    "cpResearch100": 1035,
    "pveScore": 39,
    "dps": 23.91,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 5
  },
  {
    "name": "Emolga",
    "pokedexId": 587,
    "slug": "emolga",
    "types": [
      "Electric",
      "Flying"
    ],
    "attack": 158,
    "defense": 127,
    "stamina": 146,
    "maxCp": 1847,
    "maxCp40": 1633,
    "cpRaid100": 933,
    "cpWeather100": 1166,
    "cpResearch100": 700,
    "pveScore": 27,
    "dps": 18.08,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 5
  },
  {
    "name": "Karrablast",
    "pokedexId": 588,
    "slug": "karrablast",
    "types": [
      "Bug"
    ],
    "attack": 137,
    "defense": 87,
    "stamina": 137,
    "maxCp": 1336,
    "maxCp40": 1182,
    "cpRaid100": 675,
    "cpWeather100": 844,
    "cpResearch100": 506,
    "pveScore": 20,
    "dps": 14.89,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 5
  },
  {
    "name": "Escavalier",
    "pokedexId": 589,
    "slug": "escavalier",
    "types": [
      "Bug",
      "Steel"
    ],
    "attack": 224,
    "defense": 187,
    "stamina": 172,
    "maxCp": 3279,
    "maxCp40": 2901,
    "cpRaid100": 1657,
    "cpWeather100": 2072,
    "cpResearch100": 1243,
    "pveScore": 41,
    "dps": 24.35,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 5
  },
  {
    "name": "Foongus",
    "pokedexId": 590,
    "slug": "foongus",
    "types": [
      "Grass",
      "Poison"
    ],
    "attack": 97,
    "defense": 90,
    "stamina": 170,
    "maxCp": 1102,
    "maxCp40": 974,
    "cpRaid100": 557,
    "cpWeather100": 696,
    "cpResearch100": 417,
    "pveScore": 17,
    "dps": 12.37,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 5
  },
  {
    "name": "Amoonguss",
    "pokedexId": 591,
    "slug": "amoonguss",
    "types": [
      "Grass",
      "Poison"
    ],
    "attack": 155,
    "defense": 139,
    "stamina": 249,
    "maxCp": 2420,
    "maxCp40": 2140,
    "cpRaid100": 1223,
    "cpWeather100": 1529,
    "cpResearch100": 917,
    "pveScore": 34,
    "dps": 19.76,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 5
  },
  {
    "name": "Frillish Male",
    "pokedexId": 592,
    "slug": "frillish-male",
    "types": [
      "Water",
      "Ghost"
    ],
    "attack": 115,
    "defense": 134,
    "stamina": 146,
    "maxCp": 1421,
    "maxCp40": 1257,
    "cpRaid100": 718,
    "cpWeather100": 898,
    "cpResearch100": 539,
    "pveScore": 20,
    "dps": 13.16,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 5
  },
  {
    "name": "Jellicent Male",
    "pokedexId": 593,
    "slug": "jellicent-male",
    "types": [
      "Water",
      "Ghost"
    ],
    "attack": 159,
    "defense": 178,
    "stamina": 225,
    "maxCp": 2644,
    "maxCp40": 2338,
    "cpRaid100": 1336,
    "cpWeather100": 1670,
    "cpResearch100": 1002,
    "pveScore": 33,
    "dps": 18.19,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 5
  },
  {
    "name": "Alomomola",
    "pokedexId": 594,
    "slug": "alomomola",
    "types": [
      "Water"
    ],
    "attack": 138,
    "defense": 131,
    "stamina": 338,
    "maxCp": 2452,
    "maxCp40": 2169,
    "cpRaid100": 1239,
    "cpWeather100": 1549,
    "cpResearch100": 929,
    "pveScore": 29,
    "dps": 15.79,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 5
  },
  {
    "name": "Joltik",
    "pokedexId": 595,
    "slug": "joltik",
    "types": [
      "Bug",
      "Electric"
    ],
    "attack": 109,
    "defense": 98,
    "stamina": 137,
    "maxCp": 1147,
    "maxCp40": 1015,
    "cpRaid100": 579,
    "cpWeather100": 725,
    "cpResearch100": 435,
    "pveScore": 16,
    "dps": 11.85,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 5
  },
  {
    "name": "Galvantula",
    "pokedexId": 596,
    "slug": "galvantula",
    "types": [
      "Bug",
      "Electric"
    ],
    "attack": 201,
    "defense": 128,
    "stamina": 172,
    "maxCp": 2494,
    "maxCp40": 2206,
    "cpRaid100": 1260,
    "cpWeather100": 1575,
    "cpResearch100": 945,
    "pveScore": 34,
    "dps": 21.85,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 5
  },
  {
    "name": "Ferroseed",
    "pokedexId": 597,
    "slug": "ferroseed",
    "types": [
      "Grass",
      "Steel"
    ],
    "attack": 81,
    "defense": 155,
    "stamina": 127,
    "maxCp": 1053,
    "maxCp40": 931,
    "cpRaid100": 532,
    "cpWeather100": 665,
    "cpResearch100": 399,
    "pveScore": 15,
    "dps": 10.33,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 5
  },
  {
    "name": "Ferrothorn",
    "pokedexId": 598,
    "slug": "ferrothorn",
    "types": [
      "Grass",
      "Steel"
    ],
    "attack": 158,
    "defense": 223,
    "stamina": 179,
    "maxCp": 2624,
    "maxCp40": 2321,
    "cpRaid100": 1326,
    "cpWeather100": 1658,
    "cpResearch100": 995,
    "pveScore": 36,
    "dps": 20.14,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 5
  },
  {
    "name": "Klink",
    "pokedexId": 599,
    "slug": "klink",
    "types": [
      "Steel"
    ],
    "attack": 98,
    "defense": 121,
    "stamina": 120,
    "maxCp": 1081,
    "maxCp40": 956,
    "cpRaid100": 546,
    "cpWeather100": 683,
    "cpResearch100": 409,
    "pveScore": 15,
    "dps": 10.8,
    "bestFastMove": {
      "name": "Metal Claw",
      "type": "Steel"
    },
    "bestChargedMove": {
      "name": "Iron Head",
      "type": "Steel"
    },
    "generation": 5
  },
  {
    "name": "Klang",
    "pokedexId": 600,
    "slug": "klang",
    "types": [
      "Steel"
    ],
    "attack": 150,
    "defense": 173,
    "stamina": 155,
    "maxCp": 2082,
    "maxCp40": 1842,
    "cpRaid100": 1052,
    "cpWeather100": 1315,
    "cpResearch100": 789,
    "pveScore": 27,
    "dps": 16.53,
    "bestFastMove": {
      "name": "Metal Claw",
      "type": "Steel"
    },
    "bestChargedMove": {
      "name": "Iron Head",
      "type": "Steel"
    },
    "generation": 5
  },
  {
    "name": "Klinklang",
    "pokedexId": 601,
    "slug": "klinklang",
    "types": [
      "Steel"
    ],
    "attack": 198,
    "defense": 214,
    "stamina": 155,
    "maxCp": 2967,
    "maxCp40": 2624,
    "cpRaid100": 1499,
    "cpWeather100": 1874,
    "cpResearch100": 1125,
    "pveScore": 37,
    "dps": 21.82,
    "bestFastMove": {
      "name": "Metal Claw",
      "type": "Steel"
    },
    "bestChargedMove": {
      "name": "Iron Head",
      "type": "Steel"
    },
    "generation": 5
  },
  {
    "name": "Tynamo",
    "pokedexId": 602,
    "slug": "tynamo",
    "types": [
      "Electric"
    ],
    "attack": 104,
    "defense": 78,
    "stamina": 111,
    "maxCp": 909,
    "maxCp40": 804,
    "cpRaid100": 459,
    "cpWeather100": 574,
    "cpResearch100": 344,
    "pveScore": 15,
    "dps": 11.9,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 5
  },
  {
    "name": "Eelektrik",
    "pokedexId": 603,
    "slug": "eelektrik",
    "types": [
      "Electric"
    ],
    "attack": 156,
    "defense": 130,
    "stamina": 163,
    "maxCp": 1939,
    "maxCp40": 1715,
    "cpRaid100": 980,
    "cpWeather100": 1225,
    "cpResearch100": 735,
    "pveScore": 27,
    "dps": 17.85,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 5
  },
  {
    "name": "Eelektross",
    "pokedexId": 604,
    "slug": "eelektross",
    "types": [
      "Electric"
    ],
    "attack": 216,
    "defense": 152,
    "stamina": 198,
    "maxCp": 3076,
    "maxCp40": 2721,
    "cpRaid100": 1554,
    "cpWeather100": 1943,
    "cpResearch100": 1166,
    "pveScore": 41,
    "dps": 24.72,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 5
  },
  {
    "name": "Elgyem",
    "pokedexId": 605,
    "slug": "elgyem",
    "types": [
      "Psychic"
    ],
    "attack": 148,
    "defense": 100,
    "stamina": 146,
    "maxCp": 1566,
    "maxCp40": 1385,
    "cpRaid100": 791,
    "cpWeather100": 989,
    "cpResearch100": 593,
    "pveScore": 25,
    "dps": 18.23,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 5
  },
  {
    "name": "Beheeyem",
    "pokedexId": 606,
    "slug": "beheeyem",
    "types": [
      "Psychic"
    ],
    "attack": 221,
    "defense": 163,
    "stamina": 181,
    "maxCp": 3112,
    "maxCp40": 2753,
    "cpRaid100": 1573,
    "cpWeather100": 1966,
    "cpResearch100": 1180,
    "pveScore": 45,
    "dps": 27.22,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 5
  },
  {
    "name": "Litwick",
    "pokedexId": 607,
    "slug": "litwick",
    "types": [
      "Ghost",
      "Fire"
    ],
    "attack": 108,
    "defense": 98,
    "stamina": 137,
    "maxCp": 1138,
    "maxCp40": 1006,
    "cpRaid100": 575,
    "cpWeather100": 719,
    "cpResearch100": 431,
    "pveScore": 19,
    "dps": 14.01,
    "bestFastMove": {
      "name": "Shadow Claw",
      "type": "Ghost"
    },
    "bestChargedMove": {
      "name": "Shadow Ball",
      "type": "Ghost"
    },
    "generation": 5
  },
  {
    "name": "Lampent",
    "pokedexId": 608,
    "slug": "lampent",
    "types": [
      "Ghost",
      "Fire"
    ],
    "attack": 169,
    "defense": 115,
    "stamina": 155,
    "maxCp": 1931,
    "maxCp40": 1708,
    "cpRaid100": 976,
    "cpWeather100": 1220,
    "cpResearch100": 732,
    "pveScore": 32,
    "dps": 21.93,
    "bestFastMove": {
      "name": "Shadow Claw",
      "type": "Ghost"
    },
    "bestChargedMove": {
      "name": "Shadow Ball",
      "type": "Ghost"
    },
    "generation": 5
  },
  {
    "name": "Chandelure",
    "pokedexId": 609,
    "slug": "chandelure",
    "types": [
      "Ghost",
      "Fire"
    ],
    "attack": 270,
    "defense": 182,
    "stamina": 155,
    "maxCp": 3682,
    "maxCp40": 3257,
    "cpRaid100": 1861,
    "cpWeather100": 2326,
    "cpResearch100": 1396,
    "pveScore": 53,
    "dps": 32.31,
    "bestFastMove": {
      "name": "Hex",
      "type": "Ghost"
    },
    "bestChargedMove": {
      "name": "Shadow Ball",
      "type": "Ghost"
    },
    "generation": 5
  },
  {
    "name": "Axew",
    "pokedexId": 610,
    "slug": "axew",
    "types": [
      "Dragon"
    ],
    "attack": 154,
    "defense": 101,
    "stamina": 130,
    "maxCp": 1547,
    "maxCp40": 1368,
    "cpRaid100": 782,
    "cpWeather100": 977,
    "cpResearch100": 586,
    "pveScore": 26,
    "dps": 19.56,
    "bestFastMove": {
      "name": "Dragon Tail",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Outrage",
      "type": "Dragon"
    },
    "generation": 5
  },
  {
    "name": "Fraxure",
    "pokedexId": 611,
    "slug": "fraxure",
    "types": [
      "Dragon"
    ],
    "attack": 211,
    "defense": 123,
    "stamina": 165,
    "maxCp": 2515,
    "maxCp40": 2224,
    "cpRaid100": 1271,
    "cpWeather100": 1589,
    "cpResearch100": 953,
    "pveScore": 40,
    "dps": 26.79,
    "bestFastMove": {
      "name": "Dragon Tail",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Outrage",
      "type": "Dragon"
    },
    "generation": 5
  },
  {
    "name": "Haxorus",
    "pokedexId": 612,
    "slug": "haxorus",
    "types": [
      "Dragon"
    ],
    "attack": 284,
    "defense": 172,
    "stamina": 183,
    "maxCp": 4062,
    "maxCp40": 3593,
    "cpRaid100": 2053,
    "cpWeather100": 2566,
    "cpResearch100": 1540,
    "pveScore": 61,
    "dps": 36.06,
    "bestFastMove": {
      "name": "Dragon Tail",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Outrage",
      "type": "Dragon"
    },
    "generation": 5
  },
  {
    "name": "Cubchoo",
    "pokedexId": 613,
    "slug": "cubchoo",
    "types": [
      "Ice"
    ],
    "attack": 128,
    "defense": 74,
    "stamina": 146,
    "maxCp": 1208,
    "maxCp40": 1069,
    "cpRaid100": 610,
    "cpWeather100": 763,
    "cpResearch100": 458,
    "pveScore": 19,
    "dps": 14.52,
    "bestFastMove": {
      "name": "Powder Snow",
      "type": "Ice"
    },
    "bestChargedMove": {
      "name": "Avalanche",
      "type": "Ice"
    },
    "generation": 5
  },
  {
    "name": "Beartic",
    "pokedexId": 614,
    "slug": "beartic",
    "types": [
      "Ice"
    ],
    "attack": 233,
    "defense": 152,
    "stamina": 216,
    "maxCp": 3439,
    "maxCp40": 3042,
    "cpRaid100": 1738,
    "cpWeather100": 2173,
    "cpResearch100": 1303,
    "pveScore": 45,
    "dps": 26.43,
    "bestFastMove": {
      "name": "Powder Snow",
      "type": "Ice"
    },
    "bestChargedMove": {
      "name": "Avalanche",
      "type": "Ice"
    },
    "generation": 5
  },
  {
    "name": "Cryogonal",
    "pokedexId": 615,
    "slug": "cryogonal",
    "types": [
      "Ice"
    ],
    "attack": 189,
    "defense": 219,
    "stamina": 190,
    "maxCp": 3154,
    "maxCp40": 2790,
    "cpRaid100": 1594,
    "cpWeather100": 1993,
    "cpResearch100": 1196,
    "pveScore": 39,
    "dps": 21.44,
    "bestFastMove": {
      "name": "Powder Snow",
      "type": "Ice"
    },
    "bestChargedMove": {
      "name": "Avalanche",
      "type": "Ice"
    },
    "generation": 5
  },
  {
    "name": "Shelmet",
    "pokedexId": 616,
    "slug": "shelmet",
    "types": [
      "Bug"
    ],
    "attack": 72,
    "defense": 140,
    "stamina": 137,
    "maxCp": 942,
    "maxCp40": 834,
    "cpRaid100": 476,
    "cpWeather100": 595,
    "cpResearch100": 357,
    "pveScore": 15,
    "dps": 7.83,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 5
  },
  {
    "name": "Accelgor",
    "pokedexId": 617,
    "slug": "accelgor",
    "types": [
      "Bug"
    ],
    "attack": 219,
    "defense": 120,
    "stamina": 190,
    "maxCp": 2748,
    "maxCp40": 2431,
    "cpRaid100": 1389,
    "cpWeather100": 1736,
    "cpResearch100": 1042,
    "pveScore": 37,
    "dps": 23.8,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 5
  },
  {
    "name": "Stunfisk",
    "pokedexId": 618,
    "slug": "stunfisk",
    "types": [
      "Ground",
      "Electric"
    ],
    "attack": 145,
    "defense": 171,
    "stamina": 240,
    "maxCp": 2460,
    "maxCp40": 2176,
    "cpRaid100": 1243,
    "cpWeather100": 1554,
    "cpResearch100": 932,
    "pveScore": 32,
    "dps": 18.02,
    "bestFastMove": {
      "name": "Mud-Slap",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Earthquake",
      "type": "Ground"
    },
    "generation": 5
  },
  {
    "name": "Mienfoo",
    "pokedexId": 619,
    "slug": "mienfoo",
    "types": [
      "Fighting"
    ],
    "attack": 159,
    "defense": 98,
    "stamina": 128,
    "maxCp": 1561,
    "maxCp40": 1381,
    "cpRaid100": 789,
    "cpWeather100": 986,
    "cpResearch100": 592,
    "pveScore": 27,
    "dps": 20.49,
    "bestFastMove": {
      "name": "Counter",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Dynamic Punch",
      "type": "Fighting"
    },
    "generation": 5
  },
  {
    "name": "Mienshao",
    "pokedexId": 620,
    "slug": "mienshao",
    "types": [
      "Fighting"
    ],
    "attack": 257,
    "defense": 127,
    "stamina": 163,
    "maxCp": 3053,
    "maxCp40": 2700,
    "cpRaid100": 1543,
    "cpWeather100": 1929,
    "cpResearch100": 1157,
    "pveScore": 50,
    "dps": 33.12,
    "bestFastMove": {
      "name": "Counter",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Dynamic Punch",
      "type": "Fighting"
    },
    "generation": 5
  },
  {
    "name": "Druddigon",
    "pokedexId": 621,
    "slug": "druddigon",
    "types": [
      "Dragon"
    ],
    "attack": 213,
    "defense": 170,
    "stamina": 184,
    "maxCp": 3088,
    "maxCp40": 2732,
    "cpRaid100": 1561,
    "cpWeather100": 1951,
    "cpResearch100": 1171,
    "pveScore": 46,
    "dps": 27.05,
    "bestFastMove": {
      "name": "Dragon Tail",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Outrage",
      "type": "Dragon"
    },
    "generation": 5
  },
  {
    "name": "Golett",
    "pokedexId": 622,
    "slug": "golett",
    "types": [
      "Ground",
      "Ghost"
    ],
    "attack": 127,
    "defense": 92,
    "stamina": 153,
    "maxCp": 1344,
    "maxCp40": 1189,
    "cpRaid100": 679,
    "cpWeather100": 849,
    "cpResearch100": 509,
    "pveScore": 22,
    "dps": 15.78,
    "bestFastMove": {
      "name": "Mud-Slap",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Earthquake",
      "type": "Ground"
    },
    "generation": 5
  },
  {
    "name": "Golurk",
    "pokedexId": 623,
    "slug": "golurk",
    "types": [
      "Ground",
      "Ghost"
    ],
    "attack": 222,
    "defense": 154,
    "stamina": 205,
    "maxCp": 3226,
    "maxCp40": 2854,
    "cpRaid100": 1630,
    "cpWeather100": 2038,
    "cpResearch100": 1223,
    "pveScore": 47,
    "dps": 27.59,
    "bestFastMove": {
      "name": "Mud-Slap",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Earthquake",
      "type": "Ground"
    },
    "generation": 5
  },
  {
    "name": "Pawniard",
    "pokedexId": 624,
    "slug": "pawniard",
    "types": [
      "Dark",
      "Steel"
    ],
    "attack": 154,
    "defense": 114,
    "stamina": 128,
    "maxCp": 1620,
    "maxCp40": 1433,
    "cpRaid100": 819,
    "cpWeather100": 1024,
    "cpResearch100": 614,
    "pveScore": 25,
    "dps": 17.76,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "generation": 5
  },
  {
    "name": "Bisharp",
    "pokedexId": 625,
    "slug": "bisharp",
    "types": [
      "Dark",
      "Steel"
    ],
    "attack": 231,
    "defense": 176,
    "stamina": 163,
    "maxCp": 3202,
    "maxCp40": 2832,
    "cpRaid100": 1618,
    "cpWeather100": 2023,
    "cpResearch100": 1214,
    "pveScore": 44,
    "dps": 26.64,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "generation": 5
  },
  {
    "name": "Bouffalant",
    "pokedexId": 626,
    "slug": "bouffalant",
    "types": [
      "Normal"
    ],
    "attack": 194,
    "defense": 182,
    "stamina": 216,
    "maxCp": 3148,
    "maxCp40": 2784,
    "cpRaid100": 1591,
    "cpWeather100": 1989,
    "cpResearch100": 1193,
    "pveScore": 42,
    "dps": 23.43,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 5
  },
  {
    "name": "Rufflet",
    "pokedexId": 627,
    "slug": "rufflet",
    "types": [
      "Normal",
      "Flying"
    ],
    "attack": 150,
    "defense": 97,
    "stamina": 172,
    "maxCp": 1686,
    "maxCp40": 1491,
    "cpRaid100": 852,
    "cpWeather100": 1065,
    "cpResearch100": 639,
    "pveScore": 26,
    "dps": 18.12,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 5
  },
  {
    "name": "Braviary",
    "pokedexId": 628,
    "slug": "braviary",
    "types": [
      "Normal",
      "Flying"
    ],
    "attack": 232,
    "defense": 152,
    "stamina": 225,
    "maxCp": 3491,
    "maxCp40": 3088,
    "cpRaid100": 1764,
    "cpWeather100": 2206,
    "cpResearch100": 1323,
    "pveScore": 48,
    "dps": 28.02,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 5
  },
  {
    "name": "Vullaby",
    "pokedexId": 629,
    "slug": "vullaby",
    "types": [
      "Dark",
      "Flying"
    ],
    "attack": 104,
    "defense": 138,
    "stamina": 172,
    "maxCp": 1421,
    "maxCp40": 1257,
    "cpRaid100": 718,
    "cpWeather100": 898,
    "cpResearch100": 538,
    "pveScore": 19,
    "dps": 11.99,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "generation": 5
  },
  {
    "name": "Mandibuzz",
    "pokedexId": 630,
    "slug": "mandibuzz",
    "types": [
      "Dark",
      "Flying"
    ],
    "attack": 129,
    "defense": 205,
    "stamina": 242,
    "maxCp": 2417,
    "maxCp40": 2138,
    "cpRaid100": 1221,
    "cpWeather100": 1527,
    "cpResearch100": 916,
    "pveScore": 28,
    "dps": 14.88,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "generation": 5
  },
  {
    "name": "Heatmor",
    "pokedexId": 631,
    "slug": "heatmor",
    "types": [
      "Fire"
    ],
    "attack": 204,
    "defense": 129,
    "stamina": 198,
    "maxCp": 2708,
    "maxCp40": 2395,
    "cpRaid100": 1368,
    "cpWeather100": 1711,
    "cpResearch100": 1026,
    "pveScore": 44,
    "dps": 27.2,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 5
  },
  {
    "name": "Durant",
    "pokedexId": 632,
    "slug": "durant",
    "types": [
      "Bug",
      "Steel"
    ],
    "attack": 217,
    "defense": 188,
    "stamina": 151,
    "maxCp": 3007,
    "maxCp40": 2659,
    "cpRaid100": 1519,
    "cpWeather100": 1900,
    "cpResearch100": 1140,
    "pveScore": 39,
    "dps": 23.59,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 5
  },
  {
    "name": "Deino",
    "pokedexId": 633,
    "slug": "deino",
    "types": [
      "Dark",
      "Dragon"
    ],
    "attack": 116,
    "defense": 93,
    "stamina": 141,
    "maxCp": 1200,
    "maxCp40": 1062,
    "cpRaid100": 606,
    "cpWeather100": 758,
    "cpResearch100": 455,
    "pveScore": 18,
    "dps": 13.38,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "generation": 5
  },
  {
    "name": "Zweilous",
    "pokedexId": 634,
    "slug": "zweilous",
    "types": [
      "Dark",
      "Dragon"
    ],
    "attack": 159,
    "defense": 135,
    "stamina": 176,
    "maxCp": 2079,
    "maxCp40": 1839,
    "cpRaid100": 1051,
    "cpWeather100": 1313,
    "cpResearch100": 788,
    "pveScore": 29,
    "dps": 18.34,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "generation": 5
  },
  {
    "name": "Larvesta",
    "pokedexId": 636,
    "slug": "larvesta",
    "types": [
      "Bug",
      "Fire"
    ],
    "attack": 156,
    "defense": 107,
    "stamina": 146,
    "maxCp": 1692,
    "maxCp40": 1496,
    "cpRaid100": 855,
    "cpWeather100": 1069,
    "cpResearch100": 641,
    "pveScore": 24,
    "dps": 16.96,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 5
  },
  {
    "name": "Volcarona",
    "pokedexId": 637,
    "slug": "volcarona",
    "types": [
      "Bug",
      "Fire"
    ],
    "attack": 264,
    "defense": 189,
    "stamina": 198,
    "maxCp": 4106,
    "maxCp40": 3632,
    "cpRaid100": 2075,
    "cpWeather100": 2594,
    "cpResearch100": 1556,
    "pveScore": 62,
    "dps": 35.2,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 5
  },
  {
    "name": "Cobalion",
    "pokedexId": 638,
    "slug": "cobalion",
    "types": [
      "Steel",
      "Fighting"
    ],
    "attack": 192,
    "defense": 229,
    "stamina": 209,
    "maxCp": 3417,
    "maxCp40": 3022,
    "cpRaid100": 1727,
    "cpWeather100": 2159,
    "cpResearch100": 1295,
    "pveScore": 40,
    "dps": 21.16,
    "bestFastMove": {
      "name": "Metal Claw",
      "type": "Steel"
    },
    "bestChargedMove": {
      "name": "Iron Head",
      "type": "Steel"
    },
    "generation": 5
  },
  {
    "name": "Terrakion",
    "pokedexId": 639,
    "slug": "terrakion",
    "types": [
      "Rock",
      "Fighting"
    ],
    "attack": 260,
    "defense": 192,
    "stamina": 209,
    "maxCp": 4181,
    "maxCp40": 3698,
    "cpRaid100": 2113,
    "cpWeather100": 2641,
    "cpResearch100": 1585,
    "pveScore": 54,
    "dps": 29.98,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 5
  },
  {
    "name": "Virizion",
    "pokedexId": 640,
    "slug": "virizion",
    "types": [
      "Grass",
      "Fighting"
    ],
    "attack": 192,
    "defense": 229,
    "stamina": 209,
    "maxCp": 3417,
    "maxCp40": 3022,
    "cpRaid100": 1727,
    "cpWeather100": 2159,
    "cpResearch100": 1295,
    "pveScore": 46,
    "dps": 24.48,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 5
  },
  {
    "name": "Tornadus Incarnate",
    "pokedexId": 641,
    "slug": "tornadus-incarnate",
    "types": [
      "Flying"
    ],
    "attack": 265,
    "defense": 163,
    "stamina": 188,
    "maxCp": 3758,
    "maxCp40": 3324,
    "cpRaid100": 1899,
    "cpWeather100": 2374,
    "cpResearch100": 1424,
    "pveScore": 55,
    "dps": 33.12,
    "bestFastMove": {
      "name": "Air Slash",
      "type": "Flying"
    },
    "bestChargedMove": {
      "name": "Sky Attack",
      "type": "Flying"
    },
    "generation": 5
  },
  {
    "name": "Thundurus Incarnate",
    "pokedexId": 642,
    "slug": "thundurus-incarnate",
    "types": [
      "Electric",
      "Flying"
    ],
    "attack": 265,
    "defense": 163,
    "stamina": 188,
    "maxCp": 3758,
    "maxCp40": 3324,
    "cpRaid100": 1899,
    "cpWeather100": 2374,
    "cpResearch100": 1424,
    "pveScore": 51,
    "dps": 30.32,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 5
  },
  {
    "name": "Landorus Incarnate",
    "pokedexId": 645,
    "slug": "landorus-incarnate",
    "types": [
      "Ground",
      "Flying"
    ],
    "attack": 260,
    "defense": 181,
    "stamina": 205,
    "maxCp": 4032,
    "maxCp40": 3566,
    "cpRaid100": 2037,
    "cpWeather100": 2547,
    "cpResearch100": 1528,
    "pveScore": 57,
    "dps": 32.31,
    "bestFastMove": {
      "name": "Mud-Slap",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Earthquake",
      "type": "Ground"
    },
    "generation": 5
  },
  {
    "name": "Keldeo Ordinary",
    "pokedexId": 647,
    "slug": "keldeo-ordinary",
    "types": [
      "Water",
      "Fighting"
    ],
    "attack": 260,
    "defense": 192,
    "stamina": 209,
    "maxCp": 4181,
    "maxCp40": 3698,
    "cpRaid100": 2113,
    "cpWeather100": 2641,
    "cpResearch100": 1585,
    "pveScore": 53,
    "dps": 29.75,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 5
  },
  {
    "name": "Meloetta Aria",
    "pokedexId": 648,
    "slug": "meloetta-aria",
    "types": [
      "Normal",
      "Psychic"
    ],
    "attack": 251,
    "defense": 224,
    "stamina": 225,
    "maxCp": 4498,
    "maxCp40": 3978,
    "cpRaid100": 2273,
    "cpWeather100": 2842,
    "cpResearch100": 1705,
    "pveScore": 57,
    "dps": 30.31,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 5
  },
  {
    "name": "Chespin",
    "pokedexId": 650,
    "slug": "chespin",
    "types": [
      "Grass"
    ],
    "attack": 110,
    "defense": 106,
    "stamina": 148,
    "maxCp": 1239,
    "maxCp40": 1096,
    "cpRaid100": 626,
    "cpWeather100": 783,
    "cpResearch100": 469,
    "pveScore": 20,
    "dps": 14.03,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 6
  },
  {
    "name": "Quilladin",
    "pokedexId": 651,
    "slug": "quilladin",
    "types": [
      "Grass"
    ],
    "attack": 145,
    "defense": 156,
    "stamina": 156,
    "maxCp": 1931,
    "maxCp40": 1708,
    "cpRaid100": 976,
    "cpWeather100": 1220,
    "cpResearch100": 732,
    "pveScore": 29,
    "dps": 18.49,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 6
  },
  {
    "name": "Chesnaught",
    "pokedexId": 652,
    "slug": "chesnaught",
    "types": [
      "Grass",
      "Fighting"
    ],
    "attack": 201,
    "defense": 204,
    "stamina": 204,
    "maxCp": 3340,
    "maxCp40": 2954,
    "cpRaid100": 1688,
    "cpWeather100": 2110,
    "cpResearch100": 1266,
    "pveScore": 46,
    "dps": 25.63,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 6
  },
  {
    "name": "Fennekin",
    "pokedexId": 653,
    "slug": "fennekin",
    "types": [
      "Fire"
    ],
    "attack": 116,
    "defense": 102,
    "stamina": 120,
    "maxCp": 1162,
    "maxCp40": 1028,
    "cpRaid100": 587,
    "cpWeather100": 734,
    "cpResearch100": 440,
    "pveScore": 21,
    "dps": 15.47,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 6
  },
  {
    "name": "Braixen",
    "pokedexId": 654,
    "slug": "braixen",
    "types": [
      "Fire"
    ],
    "attack": 172,
    "defense": 130,
    "stamina": 153,
    "maxCp": 2060,
    "maxCp40": 1822,
    "cpRaid100": 1041,
    "cpWeather100": 1302,
    "cpResearch100": 781,
    "pveScore": 34,
    "dps": 22.93,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 6
  },
  {
    "name": "Delphox",
    "pokedexId": 655,
    "slug": "delphox",
    "types": [
      "Fire",
      "Psychic"
    ],
    "attack": 229,
    "defense": 189,
    "stamina": 181,
    "maxCp": 3445,
    "maxCp40": 3047,
    "cpRaid100": 1741,
    "cpWeather100": 2176,
    "cpResearch100": 1306,
    "pveScore": 53,
    "dps": 30.53,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 6
  },
  {
    "name": "Froakie",
    "pokedexId": 656,
    "slug": "froakie",
    "types": [
      "Water"
    ],
    "attack": 122,
    "defense": 84,
    "stamina": 121,
    "maxCp": 1122,
    "maxCp40": 992,
    "cpRaid100": 567,
    "cpWeather100": 709,
    "cpResearch100": 425,
    "pveScore": 18,
    "dps": 13.96,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 6
  },
  {
    "name": "Frogadier",
    "pokedexId": 657,
    "slug": "frogadier",
    "types": [
      "Water"
    ],
    "attack": 168,
    "defense": 114,
    "stamina": 144,
    "maxCp": 1850,
    "maxCp40": 1636,
    "cpRaid100": 935,
    "cpWeather100": 1169,
    "cpResearch100": 701,
    "pveScore": 28,
    "dps": 19.22,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 6
  },
  {
    "name": "Greninja",
    "pokedexId": 658,
    "slug": "greninja",
    "types": [
      "Water",
      "Dark"
    ],
    "attack": 223,
    "defense": 152,
    "stamina": 176,
    "maxCp": 3001,
    "maxCp40": 2654,
    "cpRaid100": 1516,
    "cpWeather100": 1896,
    "cpResearch100": 1137,
    "pveScore": 41,
    "dps": 25.52,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 6
  },
  {
    "name": "Bunnelby",
    "pokedexId": 659,
    "slug": "bunnelby",
    "types": [
      "Normal"
    ],
    "attack": 68,
    "defense": 72,
    "stamina": 116,
    "maxCp": 625,
    "maxCp40": 553,
    "cpRaid100": 316,
    "cpWeather100": 395,
    "cpResearch100": 237,
    "pveScore": 15,
    "dps": 8.21,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 6
  },
  {
    "name": "Diggersby",
    "pokedexId": 660,
    "slug": "diggersby",
    "types": [
      "Normal",
      "Ground"
    ],
    "attack": 111,
    "defense": 155,
    "stamina": 198,
    "maxCp": 1692,
    "maxCp40": 1497,
    "cpRaid100": 855,
    "cpWeather100": 1069,
    "cpResearch100": 641,
    "pveScore": 22,
    "dps": 13.41,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 6
  },
  {
    "name": "Fletchling",
    "pokedexId": 661,
    "slug": "fletchling",
    "types": [
      "Normal",
      "Flying"
    ],
    "attack": 95,
    "defense": 80,
    "stamina": 128,
    "maxCp": 905,
    "maxCp40": 800,
    "cpRaid100": 457,
    "cpWeather100": 571,
    "cpResearch100": 343,
    "pveScore": 15,
    "dps": 11.47,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 6
  },
  {
    "name": "Fletchinder",
    "pokedexId": 662,
    "slug": "fletchinder",
    "types": [
      "Fire",
      "Flying"
    ],
    "attack": 144,
    "defense": 110,
    "stamina": 158,
    "maxCp": 1650,
    "maxCp40": 1460,
    "cpRaid100": 834,
    "cpWeather100": 1043,
    "cpResearch100": 625,
    "pveScore": 28,
    "dps": 19.2,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 6
  },
  {
    "name": "Talonflame",
    "pokedexId": 663,
    "slug": "talonflame",
    "types": [
      "Fire",
      "Flying"
    ],
    "attack": 177,
    "defense": 155,
    "stamina": 186,
    "maxCp": 2506,
    "maxCp40": 2216,
    "cpRaid100": 1266,
    "cpWeather100": 1583,
    "cpResearch100": 950,
    "pveScore": 39,
    "dps": 23.6,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 6
  },
  {
    "name": "Scatterbug",
    "pokedexId": 664,
    "slug": "scatterbug",
    "types": [
      "Bug"
    ],
    "attack": 63,
    "defense": 63,
    "stamina": 116,
    "maxCp": 556,
    "maxCp40": 492,
    "cpRaid100": 281,
    "cpWeather100": 351,
    "cpResearch100": 211,
    "pveScore": 15,
    "dps": 6.85,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 6
  },
  {
    "name": "Spewpa",
    "pokedexId": 665,
    "slug": "spewpa",
    "types": [
      "Bug"
    ],
    "attack": 48,
    "defense": 89,
    "stamina": 128,
    "maxCp": 542,
    "maxCp40": 479,
    "cpRaid100": 274,
    "cpWeather100": 342,
    "cpResearch100": 205,
    "pveScore": 15,
    "dps": 5.22,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 6
  },
  {
    "name": "Vivillon",
    "pokedexId": 666,
    "slug": "vivillon",
    "types": [
      "Bug",
      "Flying"
    ],
    "attack": 175,
    "defense": 103,
    "stamina": 190,
    "maxCp": 2086,
    "maxCp40": 1845,
    "cpRaid100": 1054,
    "cpWeather100": 1318,
    "cpResearch100": 791,
    "pveScore": 28,
    "dps": 19.02,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 6
  },
  {
    "name": "Litleo",
    "pokedexId": 667,
    "slug": "litleo",
    "types": [
      "Fire",
      "Normal"
    ],
    "attack": 139,
    "defense": 112,
    "stamina": 158,
    "maxCp": 1611,
    "maxCp40": 1425,
    "cpRaid100": 814,
    "cpWeather100": 1018,
    "cpResearch100": 611,
    "pveScore": 27,
    "dps": 18.53,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 6
  },
  {
    "name": "Pyroar Male",
    "pokedexId": 668,
    "slug": "pyroar-male",
    "types": [
      "Fire",
      "Normal"
    ],
    "attack": 221,
    "defense": 148,
    "stamina": 200,
    "maxCp": 3119,
    "maxCp40": 2759,
    "cpRaid100": 1576,
    "cpWeather100": 1971,
    "cpResearch100": 1182,
    "pveScore": 49,
    "dps": 29.47,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 6
  },
  {
    "name": "Flabebe",
    "pokedexId": 669,
    "slug": "flabebe",
    "types": [
      "Fairy"
    ],
    "attack": 109,
    "defense": 120,
    "stamina": 127,
    "maxCp": 1212,
    "maxCp40": 1072,
    "cpRaid100": 612,
    "cpWeather100": 765,
    "cpResearch100": 459,
    "pveScore": 19,
    "dps": 13.21,
    "bestFastMove": {
      "name": "Charm",
      "type": "Fairy"
    },
    "bestChargedMove": {
      "name": "Dazzling Gleam",
      "type": "Fairy"
    },
    "generation": 6
  },
  {
    "name": "Floette",
    "pokedexId": 670,
    "slug": "floette",
    "types": [
      "Fairy"
    ],
    "attack": 136,
    "defense": 150,
    "stamina": 144,
    "maxCp": 1726,
    "maxCp40": 1527,
    "cpRaid100": 872,
    "cpWeather100": 1091,
    "cpResearch100": 654,
    "pveScore": 25,
    "dps": 16.48,
    "bestFastMove": {
      "name": "Charm",
      "type": "Fairy"
    },
    "bestChargedMove": {
      "name": "Dazzling Gleam",
      "type": "Fairy"
    },
    "generation": 6
  },
  {
    "name": "Florges",
    "pokedexId": 671,
    "slug": "florges",
    "types": [
      "Fairy"
    ],
    "attack": 212,
    "defense": 244,
    "stamina": 186,
    "maxCp": 3657,
    "maxCp40": 3234,
    "cpRaid100": 1848,
    "cpWeather100": 2310,
    "cpResearch100": 1386,
    "pveScore": 47,
    "dps": 25.7,
    "bestFastMove": {
      "name": "Charm",
      "type": "Fairy"
    },
    "bestChargedMove": {
      "name": "Dazzling Gleam",
      "type": "Fairy"
    },
    "generation": 6
  },
  {
    "name": "Skiddo",
    "pokedexId": 672,
    "slug": "skiddo",
    "types": [
      "Grass"
    ],
    "attack": 123,
    "defense": 102,
    "stamina": 165,
    "maxCp": 1414,
    "maxCp40": 1250,
    "cpRaid100": 714,
    "cpWeather100": 893,
    "cpResearch100": 536,
    "pveScore": 23,
    "dps": 15.68,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 6
  },
  {
    "name": "Gogoat",
    "pokedexId": 673,
    "slug": "gogoat",
    "types": [
      "Grass"
    ],
    "attack": 196,
    "defense": 146,
    "stamina": 265,
    "maxCp": 3163,
    "maxCp40": 2798,
    "cpRaid100": 1598,
    "cpWeather100": 1998,
    "cpResearch100": 1199,
    "pveScore": 44,
    "dps": 24.99,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 6
  },
  {
    "name": "Pancham",
    "pokedexId": 674,
    "slug": "pancham",
    "types": [
      "Fighting"
    ],
    "attack": 145,
    "defense": 106,
    "stamina": 167,
    "maxCp": 1676,
    "maxCp40": 1482,
    "cpRaid100": 847,
    "cpWeather100": 1059,
    "cpResearch100": 635,
    "pveScore": 27,
    "dps": 18.69,
    "bestFastMove": {
      "name": "Counter",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Dynamic Punch",
      "type": "Fighting"
    },
    "generation": 6
  },
  {
    "name": "Pangoro",
    "pokedexId": 675,
    "slug": "pangoro",
    "types": [
      "Fighting",
      "Dark"
    ],
    "attack": 226,
    "defense": 146,
    "stamina": 216,
    "maxCp": 3281,
    "maxCp40": 2902,
    "cpRaid100": 1658,
    "cpWeather100": 2073,
    "cpResearch100": 1244,
    "pveScore": 49,
    "dps": 29.13,
    "bestFastMove": {
      "name": "Counter",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Dynamic Punch",
      "type": "Fighting"
    },
    "generation": 6
  },
  {
    "name": "Furfrou",
    "pokedexId": 676,
    "slug": "furfrou",
    "types": [
      "Normal"
    ],
    "attack": 165,
    "defense": 166,
    "stamina": 181,
    "maxCp": 2393,
    "maxCp40": 2117,
    "cpRaid100": 1209,
    "cpWeather100": 1512,
    "cpResearch100": 907,
    "pveScore": 33,
    "dps": 19.93,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 6
  },
  {
    "name": "Espurr",
    "pokedexId": 677,
    "slug": "espurr",
    "types": [
      "Psychic"
    ],
    "attack": 121,
    "defense": 114,
    "stamina": 158,
    "maxCp": 1434,
    "maxCp40": 1268,
    "cpRaid100": 725,
    "cpWeather100": 906,
    "cpResearch100": 543,
    "pveScore": 22,
    "dps": 14.91,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 6
  },
  {
    "name": "Meowstic Male",
    "pokedexId": 678,
    "slug": "meowstic-male",
    "types": [
      "Psychic"
    ],
    "attack": 166,
    "defense": 167,
    "stamina": 179,
    "maxCp": 2401,
    "maxCp40": 2124,
    "cpRaid100": 1213,
    "cpWeather100": 1517,
    "cpResearch100": 910,
    "pveScore": 34,
    "dps": 20.45,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 6
  },
  {
    "name": "Honedge",
    "pokedexId": 679,
    "slug": "honedge",
    "types": [
      "Steel",
      "Ghost"
    ],
    "attack": 135,
    "defense": 138,
    "stamina": 128,
    "maxCp": 1566,
    "maxCp40": 1385,
    "cpRaid100": 791,
    "cpWeather100": 989,
    "cpResearch100": 593,
    "pveScore": 22,
    "dps": 14.88,
    "bestFastMove": {
      "name": "Metal Claw",
      "type": "Steel"
    },
    "bestChargedMove": {
      "name": "Iron Head",
      "type": "Steel"
    },
    "generation": 6
  },
  {
    "name": "Doublade",
    "pokedexId": 680,
    "slug": "doublade",
    "types": [
      "Steel",
      "Ghost"
    ],
    "attack": 187,
    "defense": 206,
    "stamina": 153,
    "maxCp": 2748,
    "maxCp40": 2431,
    "cpRaid100": 1389,
    "cpWeather100": 1736,
    "cpResearch100": 1041,
    "pveScore": 35,
    "dps": 20.61,
    "bestFastMove": {
      "name": "Metal Claw",
      "type": "Steel"
    },
    "bestChargedMove": {
      "name": "Iron Head",
      "type": "Steel"
    },
    "generation": 6
  },
  {
    "name": "Aegislash Shield",
    "pokedexId": 681,
    "slug": "aegislash-shield",
    "types": [
      "Steel",
      "Ghost"
    ],
    "attack": 97,
    "defense": 272,
    "stamina": 155,
    "maxCp": 1746,
    "maxCp40": 1545,
    "cpRaid100": 882,
    "cpWeather100": 1103,
    "cpResearch100": 662,
    "pveScore": 19,
    "dps": 10.69,
    "bestFastMove": {
      "name": "Metal Claw",
      "type": "Steel"
    },
    "bestChargedMove": {
      "name": "Iron Head",
      "type": "Steel"
    },
    "generation": 6
  },
  {
    "name": "Spritzee",
    "pokedexId": 682,
    "slug": "spritzee",
    "types": [
      "Fairy"
    ],
    "attack": 110,
    "defense": 113,
    "stamina": 186,
    "maxCp": 1415,
    "maxCp40": 1252,
    "cpRaid100": 715,
    "cpWeather100": 894,
    "cpResearch100": 536,
    "pveScore": 20,
    "dps": 13.33,
    "bestFastMove": {
      "name": "Charm",
      "type": "Fairy"
    },
    "bestChargedMove": {
      "name": "Dazzling Gleam",
      "type": "Fairy"
    },
    "generation": 6
  },
  {
    "name": "Aromatisse",
    "pokedexId": 683,
    "slug": "aromatisse",
    "types": [
      "Fairy"
    ],
    "attack": 174,
    "defense": 150,
    "stamina": 226,
    "maxCp": 2661,
    "maxCp40": 2353,
    "cpRaid100": 1345,
    "cpWeather100": 1681,
    "cpResearch100": 1008,
    "pveScore": 36,
    "dps": 21.09,
    "bestFastMove": {
      "name": "Charm",
      "type": "Fairy"
    },
    "bestChargedMove": {
      "name": "Dazzling Gleam",
      "type": "Fairy"
    },
    "generation": 6
  },
  {
    "name": "Swirlix",
    "pokedexId": 684,
    "slug": "swirlix",
    "types": [
      "Fairy"
    ],
    "attack": 109,
    "defense": 119,
    "stamina": 158,
    "maxCp": 1333,
    "maxCp40": 1179,
    "cpRaid100": 673,
    "cpWeather100": 842,
    "cpResearch100": 505,
    "pveScore": 20,
    "dps": 13.21,
    "bestFastMove": {
      "name": "Charm",
      "type": "Fairy"
    },
    "bestChargedMove": {
      "name": "Dazzling Gleam",
      "type": "Fairy"
    },
    "generation": 6
  },
  {
    "name": "Slurpuff",
    "pokedexId": 685,
    "slug": "slurpuff",
    "types": [
      "Fairy"
    ],
    "attack": 168,
    "defense": 163,
    "stamina": 193,
    "maxCp": 2486,
    "maxCp40": 2199,
    "cpRaid100": 1256,
    "cpWeather100": 1570,
    "cpResearch100": 942,
    "pveScore": 34,
    "dps": 20.36,
    "bestFastMove": {
      "name": "Charm",
      "type": "Fairy"
    },
    "bestChargedMove": {
      "name": "Dazzling Gleam",
      "type": "Fairy"
    },
    "generation": 6
  },
  {
    "name": "Inkay",
    "pokedexId": 686,
    "slug": "inkay",
    "types": [
      "Dark",
      "Psychic"
    ],
    "attack": 98,
    "defense": 95,
    "stamina": 142,
    "maxCp": 1048,
    "maxCp40": 927,
    "cpRaid100": 529,
    "cpWeather100": 662,
    "cpResearch100": 397,
    "pveScore": 15,
    "dps": 11.3,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "generation": 6
  },
  {
    "name": "Malamar",
    "pokedexId": 687,
    "slug": "malamar",
    "types": [
      "Dark",
      "Psychic"
    ],
    "attack": 177,
    "defense": 166,
    "stamina": 200,
    "maxCp": 2674,
    "maxCp40": 2365,
    "cpRaid100": 1351,
    "cpWeather100": 1689,
    "cpResearch100": 1013,
    "pveScore": 35,
    "dps": 20.41,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "generation": 6
  },
  {
    "name": "Binacle",
    "pokedexId": 688,
    "slug": "binacle",
    "types": [
      "Rock",
      "Water"
    ],
    "attack": 96,
    "defense": 119,
    "stamina": 123,
    "maxCp": 1065,
    "maxCp40": 942,
    "cpRaid100": 538,
    "cpWeather100": 673,
    "cpResearch100": 404,
    "pveScore": 15,
    "dps": 11.07,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 6
  },
  {
    "name": "Barbaracle",
    "pokedexId": 689,
    "slug": "barbaracle",
    "types": [
      "Rock",
      "Water"
    ],
    "attack": 194,
    "defense": 205,
    "stamina": 176,
    "maxCp": 3025,
    "maxCp40": 2675,
    "cpRaid100": 1528,
    "cpWeather100": 1911,
    "cpResearch100": 1146,
    "pveScore": 39,
    "dps": 22.37,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 6
  },
  {
    "name": "Skrelp",
    "pokedexId": 690,
    "slug": "skrelp",
    "types": [
      "Poison",
      "Water"
    ],
    "attack": 109,
    "defense": 109,
    "stamina": 137,
    "maxCp": 1202,
    "maxCp40": 1063,
    "cpRaid100": 607,
    "cpWeather100": 759,
    "cpResearch100": 455,
    "pveScore": 19,
    "dps": 13.36,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "generation": 6
  },
  {
    "name": "Dragalge",
    "pokedexId": 691,
    "slug": "dragalge",
    "types": [
      "Poison",
      "Dragon"
    ],
    "attack": 177,
    "defense": 208,
    "stamina": 163,
    "maxCp": 2701,
    "maxCp40": 2389,
    "cpRaid100": 1365,
    "cpWeather100": 1706,
    "cpResearch100": 1024,
    "pveScore": 37,
    "dps": 21.7,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "generation": 6
  },
  {
    "name": "Clauncher",
    "pokedexId": 692,
    "slug": "clauncher",
    "types": [
      "Water"
    ],
    "attack": 108,
    "defense": 117,
    "stamina": 137,
    "maxCp": 1230,
    "maxCp40": 1088,
    "cpRaid100": 621,
    "cpWeather100": 777,
    "cpResearch100": 466,
    "pveScore": 18,
    "dps": 12.36,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 6
  },
  {
    "name": "Clawitzer",
    "pokedexId": 693,
    "slug": "clawitzer",
    "types": [
      "Water"
    ],
    "attack": 221,
    "defense": 172,
    "stamina": 174,
    "maxCp": 3132,
    "maxCp40": 2771,
    "cpRaid100": 1583,
    "cpWeather100": 1979,
    "cpResearch100": 1187,
    "pveScore": 42,
    "dps": 25.29,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 6
  },
  {
    "name": "Helioptile",
    "pokedexId": 694,
    "slug": "helioptile",
    "types": [
      "Electric",
      "Normal"
    ],
    "attack": 115,
    "defense": 78,
    "stamina": 127,
    "maxCp": 1054,
    "maxCp40": 933,
    "cpRaid100": 533,
    "cpWeather100": 666,
    "cpResearch100": 399,
    "pveScore": 17,
    "dps": 13.16,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 6
  },
  {
    "name": "Heliolisk",
    "pokedexId": 695,
    "slug": "heliolisk",
    "types": [
      "Electric",
      "Normal"
    ],
    "attack": 218,
    "defense": 167,
    "stamina": 158,
    "maxCp": 2919,
    "maxCp40": 2582,
    "cpRaid100": 1475,
    "cpWeather100": 1844,
    "cpResearch100": 1106,
    "pveScore": 40,
    "dps": 24.95,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 6
  },
  {
    "name": "Tyrunt",
    "pokedexId": 696,
    "slug": "tyrunt",
    "types": [
      "Rock",
      "Dragon"
    ],
    "attack": 158,
    "defense": 123,
    "stamina": 151,
    "maxCp": 1848,
    "maxCp40": 1635,
    "cpRaid100": 934,
    "cpWeather100": 1168,
    "cpResearch100": 700,
    "pveScore": 27,
    "dps": 18.22,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 6
  },
  {
    "name": "Tyrantrum",
    "pokedexId": 697,
    "slug": "tyrantrum",
    "types": [
      "Rock",
      "Dragon"
    ],
    "attack": 227,
    "defense": 191,
    "stamina": 193,
    "maxCp": 3537,
    "maxCp40": 3128,
    "cpRaid100": 1787,
    "cpWeather100": 2234,
    "cpResearch100": 1340,
    "pveScore": 46,
    "dps": 26.18,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 6
  },
  {
    "name": "Amaura",
    "pokedexId": 698,
    "slug": "amaura",
    "types": [
      "Rock",
      "Ice"
    ],
    "attack": 124,
    "defense": 110,
    "stamina": 184,
    "maxCp": 1547,
    "maxCp40": 1369,
    "cpRaid100": 782,
    "cpWeather100": 978,
    "cpResearch100": 586,
    "pveScore": 22,
    "dps": 14.3,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 6
  },
  {
    "name": "Aurorus",
    "pokedexId": 699,
    "slug": "aurorus",
    "types": [
      "Rock",
      "Ice"
    ],
    "attack": 186,
    "defense": 163,
    "stamina": 265,
    "maxCp": 3168,
    "maxCp40": 2802,
    "cpRaid100": 1601,
    "cpWeather100": 2001,
    "cpResearch100": 1201,
    "pveScore": 39,
    "dps": 21.45,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 6
  },
  {
    "name": "Sylveon",
    "pokedexId": 700,
    "slug": "sylveon",
    "types": [
      "Fairy"
    ],
    "attack": 202,
    "defense": 205,
    "stamina": 216,
    "maxCp": 3454,
    "maxCp40": 3055,
    "cpRaid100": 1745,
    "cpWeather100": 2182,
    "cpResearch100": 1309,
    "pveScore": 45,
    "dps": 24.48,
    "bestFastMove": {
      "name": "Charm",
      "type": "Fairy"
    },
    "bestChargedMove": {
      "name": "Dazzling Gleam",
      "type": "Fairy"
    },
    "generation": 6
  },
  {
    "name": "Hawlucha",
    "pokedexId": 701,
    "slug": "hawlucha",
    "types": [
      "Fighting",
      "Flying"
    ],
    "attack": 195,
    "defense": 153,
    "stamina": 186,
    "maxCp": 2724,
    "maxCp40": 2410,
    "cpRaid100": 1377,
    "cpWeather100": 1721,
    "cpResearch100": 1033,
    "pveScore": 41,
    "dps": 25.13,
    "bestFastMove": {
      "name": "Counter",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Dynamic Punch",
      "type": "Fighting"
    },
    "generation": 6
  },
  {
    "name": "Dedenne",
    "pokedexId": 702,
    "slug": "dedenne",
    "types": [
      "Electric",
      "Fairy"
    ],
    "attack": 164,
    "defense": 133,
    "stamina": 167,
    "maxCp": 2074,
    "maxCp40": 1834,
    "cpRaid100": 1048,
    "cpWeather100": 1310,
    "cpResearch100": 786,
    "pveScore": 29,
    "dps": 18.77,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 6
  },
  {
    "name": "Carbink",
    "pokedexId": 703,
    "slug": "carbink",
    "types": [
      "Rock",
      "Fairy"
    ],
    "attack": 95,
    "defense": 285,
    "stamina": 137,
    "maxCp": 1658,
    "maxCp40": 1467,
    "cpRaid100": 838,
    "cpWeather100": 1047,
    "cpResearch100": 628,
    "pveScore": 19,
    "dps": 10.95,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 6
  },
  {
    "name": "Goomy",
    "pokedexId": 704,
    "slug": "goomy",
    "types": [
      "Dragon"
    ],
    "attack": 101,
    "defense": 112,
    "stamina": 128,
    "maxCp": 1103,
    "maxCp40": 976,
    "cpRaid100": 557,
    "cpWeather100": 697,
    "cpResearch100": 418,
    "pveScore": 18,
    "dps": 12.83,
    "bestFastMove": {
      "name": "Dragon Tail",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Outrage",
      "type": "Dragon"
    },
    "generation": 6
  },
  {
    "name": "Sliggoo",
    "pokedexId": 705,
    "slug": "sliggoo",
    "types": [
      "Dragon"
    ],
    "attack": 159,
    "defense": 176,
    "stamina": 169,
    "maxCp": 2303,
    "maxCp40": 2037,
    "cpRaid100": 1164,
    "cpWeather100": 1455,
    "cpResearch100": 873,
    "pveScore": 34,
    "dps": 20.19,
    "bestFastMove": {
      "name": "Dragon Tail",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Outrage",
      "type": "Dragon"
    },
    "generation": 6
  },
  {
    "name": "Goodra",
    "pokedexId": 706,
    "slug": "goodra",
    "types": [
      "Dragon"
    ],
    "attack": 220,
    "defense": 242,
    "stamina": 207,
    "maxCp": 3963,
    "maxCp40": 3505,
    "cpRaid100": 2003,
    "cpWeather100": 2504,
    "cpResearch100": 1502,
    "pveScore": 53,
    "dps": 27.94,
    "bestFastMove": {
      "name": "Dragon Tail",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Outrage",
      "type": "Dragon"
    },
    "generation": 6
  },
  {
    "name": "Klefki",
    "pokedexId": 707,
    "slug": "klefki",
    "types": [
      "Steel",
      "Fairy"
    ],
    "attack": 160,
    "defense": 179,
    "stamina": 149,
    "maxCp": 2204,
    "maxCp40": 1949,
    "cpRaid100": 1114,
    "cpWeather100": 1392,
    "cpResearch100": 835,
    "pveScore": 29,
    "dps": 17.64,
    "bestFastMove": {
      "name": "Metal Claw",
      "type": "Steel"
    },
    "bestChargedMove": {
      "name": "Iron Head",
      "type": "Steel"
    },
    "generation": 6
  },
  {
    "name": "Phantump",
    "pokedexId": 708,
    "slug": "phantump",
    "types": [
      "Ghost",
      "Grass"
    ],
    "attack": 125,
    "defense": 103,
    "stamina": 125,
    "maxCp": 1270,
    "maxCp40": 1123,
    "cpRaid100": 642,
    "cpWeather100": 802,
    "cpResearch100": 481,
    "pveScore": 22,
    "dps": 16.22,
    "bestFastMove": {
      "name": "Shadow Claw",
      "type": "Ghost"
    },
    "bestChargedMove": {
      "name": "Shadow Ball",
      "type": "Ghost"
    },
    "generation": 6
  },
  {
    "name": "Trevenant",
    "pokedexId": 709,
    "slug": "trevenant",
    "types": [
      "Ghost",
      "Grass"
    ],
    "attack": 201,
    "defense": 153,
    "stamina": 198,
    "maxCp": 2885,
    "maxCp40": 2552,
    "cpRaid100": 1458,
    "cpWeather100": 1822,
    "cpResearch100": 1093,
    "pveScore": 44,
    "dps": 26.08,
    "bestFastMove": {
      "name": "Shadow Claw",
      "type": "Ghost"
    },
    "bestChargedMove": {
      "name": "Shadow Ball",
      "type": "Ghost"
    },
    "generation": 6
  },
  {
    "name": "Pumpkaboo Average",
    "pokedexId": 710,
    "slug": "pumpkaboo-average",
    "types": [
      "Ghost",
      "Grass"
    ],
    "attack": 120,
    "defense": 123,
    "stamina": 135,
    "maxCp": 1371,
    "maxCp40": 1213,
    "cpRaid100": 693,
    "cpWeather100": 866,
    "cpResearch100": 519,
    "pveScore": 22,
    "dps": 15.57,
    "bestFastMove": {
      "name": "Shadow Claw",
      "type": "Ghost"
    },
    "bestChargedMove": {
      "name": "Shadow Ball",
      "type": "Ghost"
    },
    "generation": 6
  },
  {
    "name": "Gourgeist Average",
    "pokedexId": 711,
    "slug": "gourgeist-average",
    "types": [
      "Ghost",
      "Grass"
    ],
    "attack": 175,
    "defense": 213,
    "stamina": 163,
    "maxCp": 2702,
    "maxCp40": 2390,
    "cpRaid100": 1366,
    "cpWeather100": 1707,
    "cpResearch100": 1024,
    "pveScore": 39,
    "dps": 22.71,
    "bestFastMove": {
      "name": "Shadow Claw",
      "type": "Ghost"
    },
    "bestChargedMove": {
      "name": "Shadow Ball",
      "type": "Ghost"
    },
    "generation": 6
  },
  {
    "name": "Bergmite",
    "pokedexId": 712,
    "slug": "bergmite",
    "types": [
      "Ice"
    ],
    "attack": 117,
    "defense": 120,
    "stamina": 146,
    "maxCp": 1374,
    "maxCp40": 1215,
    "cpRaid100": 694,
    "cpWeather100": 868,
    "cpResearch100": 520,
    "pveScore": 19,
    "dps": 13.27,
    "bestFastMove": {
      "name": "Powder Snow",
      "type": "Ice"
    },
    "bestChargedMove": {
      "name": "Avalanche",
      "type": "Ice"
    },
    "generation": 6
  },
  {
    "name": "Avalugg",
    "pokedexId": 713,
    "slug": "avalugg",
    "types": [
      "Ice"
    ],
    "attack": 195,
    "defense": 240,
    "stamina": 216,
    "maxCp": 3598,
    "maxCp40": 3183,
    "cpRaid100": 1818,
    "cpWeather100": 2273,
    "cpResearch100": 1364,
    "pveScore": 42,
    "dps": 22.12,
    "bestFastMove": {
      "name": "Powder Snow",
      "type": "Ice"
    },
    "bestChargedMove": {
      "name": "Avalanche",
      "type": "Ice"
    },
    "generation": 6
  },
  {
    "name": "Noibat",
    "pokedexId": 714,
    "slug": "noibat",
    "types": [
      "Flying",
      "Dragon"
    ],
    "attack": 83,
    "defense": 73,
    "stamina": 120,
    "maxCp": 754,
    "maxCp40": 667,
    "cpRaid100": 381,
    "cpWeather100": 476,
    "cpResearch100": 285,
    "pveScore": 15,
    "dps": 10.38,
    "bestFastMove": {
      "name": "Air Slash",
      "type": "Flying"
    },
    "bestChargedMove": {
      "name": "Sky Attack",
      "type": "Flying"
    },
    "generation": 6
  },
  {
    "name": "Noivern",
    "pokedexId": 715,
    "slug": "noivern",
    "types": [
      "Flying",
      "Dragon"
    ],
    "attack": 205,
    "defense": 175,
    "stamina": 198,
    "maxCp": 3125,
    "maxCp40": 2764,
    "cpRaid100": 1579,
    "cpWeather100": 1974,
    "cpResearch100": 1184,
    "pveScore": 44,
    "dps": 25.62,
    "bestFastMove": {
      "name": "Air Slash",
      "type": "Flying"
    },
    "bestChargedMove": {
      "name": "Sky Attack",
      "type": "Flying"
    },
    "generation": 6
  },
  {
    "name": "Yveltal",
    "pokedexId": 717,
    "slug": "yveltal",
    "types": [
      "Dark",
      "Flying"
    ],
    "attack": 250,
    "defense": 185,
    "stamina": 245,
    "maxCp": 4266,
    "maxCp40": 3774,
    "cpRaid100": 2156,
    "cpWeather100": 2695,
    "cpResearch100": 1617,
    "pveScore": 62,
    "dps": 33.33,
    "bestFastMove": {
      "name": "Gust",
      "type": "Flying"
    },
    "bestChargedMove": {
      "name": "Oblivion Wing",
      "type": "Flying"
    },
    "generation": 6
  },
  {
    "name": "Zygarde 50",
    "pokedexId": 718,
    "slug": "zygarde-50",
    "types": [
      "Dragon",
      "Ground"
    ],
    "attack": 203,
    "defense": 231,
    "stamina": 239,
    "maxCp": 3847,
    "maxCp40": 3403,
    "cpRaid100": 1944,
    "cpWeather100": 2431,
    "cpResearch100": 1458,
    "pveScore": 50,
    "dps": 25.78,
    "bestFastMove": {
      "name": "Dragon Tail",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Outrage",
      "type": "Dragon"
    },
    "generation": 6
  },
  {
    "name": "Diancie",
    "pokedexId": 719,
    "slug": "diancie",
    "types": [
      "Rock",
      "Fairy"
    ],
    "attack": 190,
    "defense": 285,
    "stamina": 137,
    "maxCp": 3091,
    "maxCp40": 2734,
    "cpRaid100": 1562,
    "cpWeather100": 1953,
    "cpResearch100": 1171,
    "pveScore": 39,
    "dps": 21.91,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 6
  },
  {
    "name": "Hoopa",
    "pokedexId": 720,
    "slug": "hoopa",
    "types": [
      "Psychic",
      "Ghost"
    ],
    "attack": 261,
    "defense": 187,
    "stamina": 172,
    "maxCp": 3787,
    "maxCp40": 3350,
    "cpRaid100": 1914,
    "cpWeather100": 2393,
    "cpResearch100": 1435,
    "pveScore": 54,
    "dps": 32.15,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 6
  },
  {
    "name": "Volcanion",
    "pokedexId": 721,
    "slug": "volcanion",
    "types": [
      "Fire",
      "Water"
    ],
    "attack": 252,
    "defense": 215,
    "stamina": 190,
    "maxCp": 4093,
    "maxCp40": 3621,
    "cpRaid100": 2069,
    "cpWeather100": 2586,
    "cpResearch100": 1552,
    "pveScore": 60,
    "dps": 33.6,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 6
  },
  {
    "name": "Rowlet",
    "pokedexId": 722,
    "slug": "rowlet",
    "types": [
      "Grass",
      "Flying"
    ],
    "attack": 102,
    "defense": 99,
    "stamina": 169,
    "maxCp": 1196,
    "maxCp40": 1058,
    "cpRaid100": 604,
    "cpWeather100": 755,
    "cpResearch100": 453,
    "pveScore": 19,
    "dps": 13.0,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 7
  },
  {
    "name": "Dartrix",
    "pokedexId": 723,
    "slug": "dartrix",
    "types": [
      "Grass",
      "Flying"
    ],
    "attack": 142,
    "defense": 140,
    "stamina": 186,
    "maxCp": 1956,
    "maxCp40": 1730,
    "cpRaid100": 988,
    "cpWeather100": 1236,
    "cpResearch100": 741,
    "pveScore": 29,
    "dps": 18.11,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 7
  },
  {
    "name": "Decidueye",
    "pokedexId": 724,
    "slug": "decidueye",
    "types": [
      "Grass",
      "Ghost"
    ],
    "attack": 210,
    "defense": 179,
    "stamina": 186,
    "maxCp": 3137,
    "maxCp40": 2775,
    "cpRaid100": 1585,
    "cpWeather100": 1982,
    "cpResearch100": 1189,
    "pveScore": 46,
    "dps": 26.78,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 7
  },
  {
    "name": "Litten",
    "pokedexId": 725,
    "slug": "litten",
    "types": [
      "Fire"
    ],
    "attack": 127,
    "defense": 79,
    "stamina": 128,
    "maxCp": 1162,
    "maxCp40": 1028,
    "cpRaid100": 587,
    "cpWeather100": 734,
    "cpResearch100": 440,
    "pveScore": 21,
    "dps": 16.93,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 7
  },
  {
    "name": "Torracat",
    "pokedexId": 726,
    "slug": "torracat",
    "types": [
      "Fire"
    ],
    "attack": 174,
    "defense": 103,
    "stamina": 163,
    "maxCp": 1934,
    "maxCp40": 1710,
    "cpRaid100": 977,
    "cpWeather100": 1222,
    "cpResearch100": 733,
    "pveScore": 33,
    "dps": 23.2,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 7
  },
  {
    "name": "Incineroar",
    "pokedexId": 727,
    "slug": "incineroar",
    "types": [
      "Fire",
      "Dark"
    ],
    "attack": 215,
    "defense": 175,
    "stamina": 216,
    "maxCp": 3402,
    "maxCp40": 3009,
    "cpRaid100": 1719,
    "cpWeather100": 2149,
    "cpResearch100": 1289,
    "pveScore": 51,
    "dps": 28.67,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 7
  },
  {
    "name": "Popplio",
    "pokedexId": 728,
    "slug": "popplio",
    "types": [
      "Water"
    ],
    "attack": 120,
    "defense": 103,
    "stamina": 137,
    "maxCp": 1276,
    "maxCp40": 1129,
    "cpRaid100": 645,
    "cpWeather100": 806,
    "cpResearch100": 483,
    "pveScore": 19,
    "dps": 13.73,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 7
  },
  {
    "name": "Brionne",
    "pokedexId": 729,
    "slug": "brionne",
    "types": [
      "Water"
    ],
    "attack": 168,
    "defense": 145,
    "stamina": 155,
    "maxCp": 2131,
    "maxCp40": 1885,
    "cpRaid100": 1077,
    "cpWeather100": 1346,
    "cpResearch100": 807,
    "pveScore": 30,
    "dps": 19.22,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 7
  },
  {
    "name": "Primarina",
    "pokedexId": 730,
    "slug": "primarina",
    "types": [
      "Water",
      "Fairy"
    ],
    "attack": 232,
    "defense": 194,
    "stamina": 190,
    "maxCp": 3610,
    "maxCp40": 3193,
    "cpRaid100": 1824,
    "cpWeather100": 2280,
    "cpResearch100": 1368,
    "pveScore": 47,
    "dps": 26.55,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 7
  },
  {
    "name": "Pikipek",
    "pokedexId": 731,
    "slug": "pikipek",
    "types": [
      "Normal",
      "Flying"
    ],
    "attack": 136,
    "defense": 59,
    "stamina": 111,
    "maxCp": 1029,
    "maxCp40": 910,
    "cpRaid100": 520,
    "cpWeather100": 650,
    "cpResearch100": 390,
    "pveScore": 19,
    "dps": 16.43,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 7
  },
  {
    "name": "Trumbeak",
    "pokedexId": 732,
    "slug": "trumbeak",
    "types": [
      "Normal",
      "Flying"
    ],
    "attack": 159,
    "defense": 100,
    "stamina": 146,
    "maxCp": 1671,
    "maxCp40": 1478,
    "cpRaid100": 844,
    "cpWeather100": 1056,
    "cpResearch100": 633,
    "pveScore": 27,
    "dps": 19.2,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 7
  },
  {
    "name": "Toucannon",
    "pokedexId": 733,
    "slug": "toucannon",
    "types": [
      "Normal",
      "Flying"
    ],
    "attack": 222,
    "defense": 146,
    "stamina": 190,
    "maxCp": 3040,
    "maxCp40": 2689,
    "cpRaid100": 1536,
    "cpWeather100": 1920,
    "cpResearch100": 1152,
    "pveScore": 44,
    "dps": 26.81,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 7
  },
  {
    "name": "Yungoos",
    "pokedexId": 734,
    "slug": "yungoos",
    "types": [
      "Normal"
    ],
    "attack": 122,
    "defense": 56,
    "stamina": 134,
    "maxCp": 994,
    "maxCp40": 880,
    "cpRaid100": 502,
    "cpWeather100": 628,
    "cpResearch100": 377,
    "pveScore": 17,
    "dps": 14.73,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 7
  },
  {
    "name": "Gumshoos",
    "pokedexId": 735,
    "slug": "gumshoos",
    "types": [
      "Normal"
    ],
    "attack": 194,
    "defense": 113,
    "stamina": 204,
    "maxCp": 2470,
    "maxCp40": 2185,
    "cpRaid100": 1248,
    "cpWeather100": 1561,
    "cpResearch100": 936,
    "pveScore": 37,
    "dps": 23.43,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 7
  },
  {
    "name": "Grubbin",
    "pokedexId": 736,
    "slug": "grubbin",
    "types": [
      "Bug"
    ],
    "attack": 115,
    "defense": 85,
    "stamina": 132,
    "maxCp": 1112,
    "maxCp40": 984,
    "cpRaid100": 562,
    "cpWeather100": 703,
    "cpResearch100": 421,
    "pveScore": 16,
    "dps": 12.5,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 7
  },
  {
    "name": "Charjabug",
    "pokedexId": 737,
    "slug": "charjabug",
    "types": [
      "Bug",
      "Electric"
    ],
    "attack": 145,
    "defense": 161,
    "stamina": 149,
    "maxCp": 1919,
    "maxCp40": 1697,
    "cpRaid100": 970,
    "cpWeather100": 1212,
    "cpResearch100": 727,
    "pveScore": 25,
    "dps": 15.76,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 7
  },
  {
    "name": "Vikavolt",
    "pokedexId": 738,
    "slug": "vikavolt",
    "types": [
      "Bug",
      "Electric"
    ],
    "attack": 254,
    "defense": 158,
    "stamina": 184,
    "maxCp": 3524,
    "maxCp40": 3117,
    "cpRaid100": 1781,
    "cpWeather100": 2226,
    "cpResearch100": 1336,
    "pveScore": 46,
    "dps": 27.61,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 7
  },
  {
    "name": "Crabrawler",
    "pokedexId": 739,
    "slug": "crabrawler",
    "types": [
      "Fighting"
    ],
    "attack": 150,
    "defense": 104,
    "stamina": 132,
    "maxCp": 1540,
    "maxCp40": 1363,
    "cpRaid100": 778,
    "cpWeather100": 973,
    "cpResearch100": 584,
    "pveScore": 26,
    "dps": 19.33,
    "bestFastMove": {
      "name": "Counter",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Dynamic Punch",
      "type": "Fighting"
    },
    "generation": 7
  },
  {
    "name": "Crabominable",
    "pokedexId": 740,
    "slug": "crabominable",
    "types": [
      "Fighting",
      "Ice"
    ],
    "attack": 231,
    "defense": 137,
    "stamina": 219,
    "maxCp": 3275,
    "maxCp40": 2897,
    "cpRaid100": 1655,
    "cpWeather100": 2069,
    "cpResearch100": 1241,
    "pveScore": 50,
    "dps": 29.77,
    "bestFastMove": {
      "name": "Counter",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Dynamic Punch",
      "type": "Fighting"
    },
    "generation": 7
  },
  {
    "name": "Oricorio Baile",
    "pokedexId": 741,
    "slug": "oricorio-baile",
    "types": [
      "Fire",
      "Flying"
    ],
    "attack": 196,
    "defense": 145,
    "stamina": 181,
    "maxCp": 2638,
    "maxCp40": 2333,
    "cpRaid100": 1333,
    "cpWeather100": 1667,
    "cpResearch100": 1000,
    "pveScore": 42,
    "dps": 26.13,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 7
  },
  {
    "name": "Cutiefly",
    "pokedexId": 742,
    "slug": "cutiefly",
    "types": [
      "Bug",
      "Fairy"
    ],
    "attack": 109,
    "defense": 81,
    "stamina": 120,
    "maxCp": 996,
    "maxCp40": 881,
    "cpRaid100": 503,
    "cpWeather100": 629,
    "cpResearch100": 377,
    "pveScore": 15,
    "dps": 11.85,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 7
  },
  {
    "name": "Ribombee",
    "pokedexId": 743,
    "slug": "ribombee",
    "types": [
      "Bug",
      "Fairy"
    ],
    "attack": 198,
    "defense": 145,
    "stamina": 155,
    "maxCp": 2480,
    "maxCp40": 2194,
    "cpRaid100": 1253,
    "cpWeather100": 1567,
    "cpResearch100": 940,
    "pveScore": 33,
    "dps": 21.52,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 7
  },
  {
    "name": "Rockruff",
    "pokedexId": 744,
    "slug": "rockruff",
    "types": [
      "Rock"
    ],
    "attack": 118,
    "defense": 78,
    "stamina": 128,
    "maxCp": 1083,
    "maxCp40": 957,
    "cpRaid100": 547,
    "cpWeather100": 684,
    "cpResearch100": 410,
    "pveScore": 17,
    "dps": 13.61,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 7
  },
  {
    "name": "Lycanroc Midday",
    "pokedexId": 745,
    "slug": "lycanroc-midday",
    "types": [
      "Rock"
    ],
    "attack": 231,
    "defense": 140,
    "stamina": 181,
    "maxCp": 3027,
    "maxCp40": 2678,
    "cpRaid100": 1530,
    "cpWeather100": 1912,
    "cpResearch100": 1147,
    "pveScore": 43,
    "dps": 26.64,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 7
  },
  {
    "name": "Wishiwashi Solo",
    "pokedexId": 746,
    "slug": "wishiwashi-solo",
    "types": [
      "Water"
    ],
    "attack": 45,
    "defense": 43,
    "stamina": 128,
    "maxCp": 385,
    "maxCp40": 341,
    "cpRaid100": 195,
    "cpWeather100": 243,
    "cpResearch100": 146,
    "pveScore": 15,
    "dps": 5.15,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 7
  },
  {
    "name": "Mareanie",
    "pokedexId": 747,
    "slug": "mareanie",
    "types": [
      "Poison",
      "Water"
    ],
    "attack": 97,
    "defense": 110,
    "stamina": 137,
    "maxCp": 1090,
    "maxCp40": 964,
    "cpRaid100": 550,
    "cpWeather100": 688,
    "cpResearch100": 413,
    "pveScore": 17,
    "dps": 11.89,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "generation": 7
  },
  {
    "name": "Toxapex",
    "pokedexId": 748,
    "slug": "toxapex",
    "types": [
      "Poison",
      "Water"
    ],
    "attack": 114,
    "defense": 273,
    "stamina": 137,
    "maxCp": 1905,
    "maxCp40": 1685,
    "cpRaid100": 963,
    "cpWeather100": 1204,
    "cpResearch100": 722,
    "pveScore": 25,
    "dps": 13.98,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "generation": 7
  },
  {
    "name": "Mudbray",
    "pokedexId": 749,
    "slug": "mudbray",
    "types": [
      "Ground"
    ],
    "attack": 175,
    "defense": 121,
    "stamina": 172,
    "maxCp": 2139,
    "maxCp40": 1892,
    "cpRaid100": 1081,
    "cpWeather100": 1351,
    "cpResearch100": 811,
    "pveScore": 33,
    "dps": 21.75,
    "bestFastMove": {
      "name": "Mud-Slap",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Earthquake",
      "type": "Ground"
    },
    "generation": 7
  },
  {
    "name": "Mudsdale",
    "pokedexId": 750,
    "slug": "mudsdale",
    "types": [
      "Ground"
    ],
    "attack": 214,
    "defense": 174,
    "stamina": 225,
    "maxCp": 3443,
    "maxCp40": 3046,
    "cpRaid100": 1740,
    "cpWeather100": 2175,
    "cpResearch100": 1305,
    "pveScore": 47,
    "dps": 26.6,
    "bestFastMove": {
      "name": "Mud-Slap",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Earthquake",
      "type": "Ground"
    },
    "generation": 7
  },
  {
    "name": "Dewpider",
    "pokedexId": 751,
    "slug": "dewpider",
    "types": [
      "Water",
      "Bug"
    ],
    "attack": 72,
    "defense": 117,
    "stamina": 116,
    "maxCp": 807,
    "maxCp40": 714,
    "cpRaid100": 408,
    "cpWeather100": 510,
    "cpResearch100": 306,
    "pveScore": 15,
    "dps": 8.24,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 7
  },
  {
    "name": "Araquanid",
    "pokedexId": 752,
    "slug": "araquanid",
    "types": [
      "Water",
      "Bug"
    ],
    "attack": 126,
    "defense": 219,
    "stamina": 169,
    "maxCp": 2065,
    "maxCp40": 1827,
    "cpRaid100": 1044,
    "cpWeather100": 1305,
    "cpResearch100": 783,
    "pveScore": 25,
    "dps": 14.42,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 7
  },
  {
    "name": "Fomantis",
    "pokedexId": 753,
    "slug": "fomantis",
    "types": [
      "Grass"
    ],
    "attack": 100,
    "defense": 64,
    "stamina": 120,
    "maxCp": 838,
    "maxCp40": 741,
    "cpRaid100": 423,
    "cpWeather100": 529,
    "cpResearch100": 317,
    "pveScore": 15,
    "dps": 12.75,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 7
  },
  {
    "name": "Lurantis",
    "pokedexId": 754,
    "slug": "lurantis",
    "types": [
      "Grass"
    ],
    "attack": 192,
    "defense": 169,
    "stamina": 172,
    "maxCp": 2711,
    "maxCp40": 2398,
    "cpRaid100": 1370,
    "cpWeather100": 1713,
    "cpResearch100": 1027,
    "pveScore": 40,
    "dps": 24.48,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 7
  },
  {
    "name": "Morelull",
    "pokedexId": 755,
    "slug": "morelull",
    "types": [
      "Grass",
      "Fairy"
    ],
    "attack": 108,
    "defense": 119,
    "stamina": 120,
    "maxCp": 1168,
    "maxCp40": 1033,
    "cpRaid100": 590,
    "cpWeather100": 738,
    "cpResearch100": 442,
    "pveScore": 19,
    "dps": 13.77,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 7
  },
  {
    "name": "Shiinotic",
    "pokedexId": 756,
    "slug": "shiinotic",
    "types": [
      "Grass",
      "Fairy"
    ],
    "attack": 154,
    "defense": 168,
    "stamina": 155,
    "maxCp": 2104,
    "maxCp40": 1861,
    "cpRaid100": 1063,
    "cpWeather100": 1329,
    "cpResearch100": 797,
    "pveScore": 32,
    "dps": 19.63,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 7
  },
  {
    "name": "Salandit",
    "pokedexId": 757,
    "slug": "salandit",
    "types": [
      "Poison",
      "Fire"
    ],
    "attack": 136,
    "defense": 80,
    "stamina": 134,
    "maxCp": 1268,
    "maxCp40": 1122,
    "cpRaid100": 641,
    "cpWeather100": 801,
    "cpResearch100": 480,
    "pveScore": 21,
    "dps": 16.67,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "generation": 7
  },
  {
    "name": "Salazzle",
    "pokedexId": 758,
    "slug": "salazzle",
    "types": [
      "Poison",
      "Fire"
    ],
    "attack": 228,
    "defense": 130,
    "stamina": 169,
    "maxCp": 2802,
    "maxCp40": 2479,
    "cpRaid100": 1416,
    "cpWeather100": 1770,
    "cpResearch100": 1062,
    "pveScore": 43,
    "dps": 27.95,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "generation": 7
  },
  {
    "name": "Stufful",
    "pokedexId": 759,
    "slug": "stufful",
    "types": [
      "Normal",
      "Fighting"
    ],
    "attack": 135,
    "defense": 95,
    "stamina": 172,
    "maxCp": 1519,
    "maxCp40": 1343,
    "cpRaid100": 767,
    "cpWeather100": 959,
    "cpResearch100": 575,
    "pveScore": 23,
    "dps": 16.3,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 7
  },
  {
    "name": "Bewear",
    "pokedexId": 760,
    "slug": "bewear",
    "types": [
      "Normal",
      "Fighting"
    ],
    "attack": 226,
    "defense": 141,
    "stamina": 260,
    "maxCp": 3524,
    "maxCp40": 3117,
    "cpRaid100": 1781,
    "cpWeather100": 2226,
    "cpResearch100": 1336,
    "pveScore": 48,
    "dps": 27.29,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 7
  },
  {
    "name": "Bounsweet",
    "pokedexId": 761,
    "slug": "bounsweet",
    "types": [
      "Grass"
    ],
    "attack": 55,
    "defense": 69,
    "stamina": 123,
    "maxCp": 532,
    "maxCp40": 470,
    "cpRaid100": 268,
    "cpWeather100": 336,
    "cpResearch100": 201,
    "pveScore": 15,
    "dps": 7.01,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 7
  },
  {
    "name": "Steenee",
    "pokedexId": 762,
    "slug": "steenee",
    "types": [
      "Grass"
    ],
    "attack": 78,
    "defense": 94,
    "stamina": 141,
    "maxCp": 856,
    "maxCp40": 757,
    "cpRaid100": 432,
    "cpWeather100": 541,
    "cpResearch100": 324,
    "pveScore": 15,
    "dps": 9.95,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 7
  },
  {
    "name": "Tsareena",
    "pokedexId": 763,
    "slug": "tsareena",
    "types": [
      "Grass"
    ],
    "attack": 221,
    "defense": 195,
    "stamina": 176,
    "maxCp": 3337,
    "maxCp40": 2952,
    "cpRaid100": 1686,
    "cpWeather100": 2108,
    "cpResearch100": 1265,
    "pveScore": 49,
    "dps": 28.18,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 7
  },
  {
    "name": "Comfey",
    "pokedexId": 764,
    "slug": "comfey",
    "types": [
      "Fairy"
    ],
    "attack": 164,
    "defense": 215,
    "stamina": 139,
    "maxCp": 2378,
    "maxCp40": 2104,
    "cpRaid100": 1202,
    "cpWeather100": 1502,
    "cpResearch100": 901,
    "pveScore": 33,
    "dps": 19.88,
    "bestFastMove": {
      "name": "Charm",
      "type": "Fairy"
    },
    "bestChargedMove": {
      "name": "Dazzling Gleam",
      "type": "Fairy"
    },
    "generation": 7
  },
  {
    "name": "Oranguru",
    "pokedexId": 765,
    "slug": "oranguru",
    "types": [
      "Normal",
      "Psychic"
    ],
    "attack": 167,
    "defense": 192,
    "stamina": 207,
    "maxCp": 2754,
    "maxCp40": 2436,
    "cpRaid100": 1392,
    "cpWeather100": 1740,
    "cpResearch100": 1044,
    "pveScore": 36,
    "dps": 20.17,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 7
  },
  {
    "name": "Passimian",
    "pokedexId": 766,
    "slug": "passimian",
    "types": [
      "Fighting"
    ],
    "attack": 222,
    "defense": 159,
    "stamina": 225,
    "maxCp": 3419,
    "maxCp40": 3024,
    "cpRaid100": 1728,
    "cpWeather100": 2160,
    "cpResearch100": 1296,
    "pveScore": 50,
    "dps": 28.61,
    "bestFastMove": {
      "name": "Counter",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Dynamic Punch",
      "type": "Fighting"
    },
    "generation": 7
  },
  {
    "name": "Wimpod",
    "pokedexId": 767,
    "slug": "wimpod",
    "types": [
      "Bug",
      "Water"
    ],
    "attack": 67,
    "defense": 73,
    "stamina": 93,
    "maxCp": 564,
    "maxCp40": 499,
    "cpRaid100": 285,
    "cpWeather100": 356,
    "cpResearch100": 213,
    "pveScore": 15,
    "dps": 7.28,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 7
  },
  {
    "name": "Golisopod",
    "pokedexId": 768,
    "slug": "golisopod",
    "types": [
      "Bug",
      "Water"
    ],
    "attack": 217,
    "defense": 226,
    "stamina": 181,
    "maxCp": 3560,
    "maxCp40": 3149,
    "cpRaid100": 1799,
    "cpWeather100": 2249,
    "cpResearch100": 1349,
    "pveScore": 42,
    "dps": 23.59,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 7
  },
  {
    "name": "Sandygast",
    "pokedexId": 769,
    "slug": "sandygast",
    "types": [
      "Ghost",
      "Ground"
    ],
    "attack": 120,
    "defense": 118,
    "stamina": 146,
    "maxCp": 1394,
    "maxCp40": 1233,
    "cpRaid100": 705,
    "cpWeather100": 881,
    "cpResearch100": 528,
    "pveScore": 23,
    "dps": 15.57,
    "bestFastMove": {
      "name": "Shadow Claw",
      "type": "Ghost"
    },
    "bestChargedMove": {
      "name": "Shadow Ball",
      "type": "Ghost"
    },
    "generation": 7
  },
  {
    "name": "Palossand",
    "pokedexId": 770,
    "slug": "palossand",
    "types": [
      "Ghost",
      "Ground"
    ],
    "attack": 178,
    "defense": 178,
    "stamina": 198,
    "maxCp": 2763,
    "maxCp40": 2444,
    "cpRaid100": 1396,
    "cpWeather100": 1745,
    "cpResearch100": 1047,
    "pveScore": 40,
    "dps": 23.1,
    "bestFastMove": {
      "name": "Shadow Claw",
      "type": "Ghost"
    },
    "bestChargedMove": {
      "name": "Shadow Ball",
      "type": "Ghost"
    },
    "generation": 7
  },
  {
    "name": "Pyukumuku",
    "pokedexId": 771,
    "slug": "pyukumuku",
    "types": [
      "Water"
    ],
    "attack": 97,
    "defense": 224,
    "stamina": 146,
    "maxCp": 1551,
    "maxCp40": 1372,
    "cpRaid100": 784,
    "cpWeather100": 980,
    "cpResearch100": 588,
    "pveScore": 19,
    "dps": 11.1,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 7
  },
  {
    "name": "Type: Null",
    "pokedexId": 772,
    "slug": "type-null",
    "types": [
      "Normal"
    ],
    "attack": 184,
    "defense": 184,
    "stamina": 216,
    "maxCp": 3012,
    "maxCp40": 2664,
    "cpRaid100": 1522,
    "cpWeather100": 1903,
    "cpResearch100": 1142,
    "pveScore": 40,
    "dps": 22.22,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 7
  },
  {
    "name": "Silvally",
    "pokedexId": 773,
    "slug": "silvally",
    "types": [
      "Normal"
    ],
    "attack": 198,
    "defense": 198,
    "stamina": 216,
    "maxCp": 3336,
    "maxCp40": 2950,
    "cpRaid100": 1686,
    "cpWeather100": 2107,
    "cpResearch100": 1264,
    "pveScore": 44,
    "dps": 23.91,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 7
  },
  {
    "name": "Minior Red Meteor",
    "pokedexId": 774,
    "slug": "minior-red-meteor",
    "types": [
      "Rock",
      "Flying"
    ],
    "attack": 116,
    "defense": 194,
    "stamina": 155,
    "maxCp": 1743,
    "maxCp40": 1542,
    "cpRaid100": 881,
    "cpWeather100": 1101,
    "cpResearch100": 661,
    "pveScore": 22,
    "dps": 13.38,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 7
  },
  {
    "name": "Komala",
    "pokedexId": 775,
    "slug": "komala",
    "types": [
      "Normal"
    ],
    "attack": 216,
    "defense": 164,
    "stamina": 163,
    "maxCp": 2911,
    "maxCp40": 2575,
    "cpRaid100": 1471,
    "cpWeather100": 1839,
    "cpResearch100": 1103,
    "pveScore": 42,
    "dps": 26.09,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 7
  },
  {
    "name": "Turtonator",
    "pokedexId": 776,
    "slug": "turtonator",
    "types": [
      "Fire",
      "Dragon"
    ],
    "attack": 165,
    "defense": 214,
    "stamina": 155,
    "maxCp": 2507,
    "maxCp40": 2218,
    "cpRaid100": 1267,
    "cpWeather100": 1584,
    "cpResearch100": 950,
    "pveScore": 38,
    "dps": 22.0,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 7
  },
  {
    "name": "Togedemaru",
    "pokedexId": 777,
    "slug": "togedemaru",
    "types": [
      "Electric",
      "Steel"
    ],
    "attack": 189,
    "defense": 144,
    "stamina": 163,
    "maxCp": 2423,
    "maxCp40": 2143,
    "cpRaid100": 1224,
    "cpWeather100": 1531,
    "cpResearch100": 918,
    "pveScore": 34,
    "dps": 21.63,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 7
  },
  {
    "name": "Mimikyu Disguised",
    "pokedexId": 778,
    "slug": "mimikyu-disguised",
    "types": [
      "Ghost",
      "Fairy"
    ],
    "attack": 177,
    "defense": 199,
    "stamina": 146,
    "maxCp": 2516,
    "maxCp40": 2225,
    "cpRaid100": 1271,
    "cpWeather100": 1589,
    "cpResearch100": 954,
    "pveScore": 38,
    "dps": 22.97,
    "bestFastMove": {
      "name": "Shadow Claw",
      "type": "Ghost"
    },
    "bestChargedMove": {
      "name": "Shadow Ball",
      "type": "Ghost"
    },
    "generation": 7
  },
  {
    "name": "Bruxish",
    "pokedexId": 779,
    "slug": "bruxish",
    "types": [
      "Water",
      "Psychic"
    ],
    "attack": 208,
    "defense": 145,
    "stamina": 169,
    "maxCp": 2701,
    "maxCp40": 2389,
    "cpRaid100": 1365,
    "cpWeather100": 1707,
    "cpResearch100": 1024,
    "pveScore": 38,
    "dps": 23.8,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 7
  },
  {
    "name": "Drampa",
    "pokedexId": 780,
    "slug": "drampa",
    "types": [
      "Normal",
      "Dragon"
    ],
    "attack": 232,
    "defense": 164,
    "stamina": 186,
    "maxCp": 3308,
    "maxCp40": 2926,
    "cpRaid100": 1672,
    "cpWeather100": 2090,
    "cpResearch100": 1254,
    "pveScore": 47,
    "dps": 28.02,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 7
  },
  {
    "name": "Dhelmise",
    "pokedexId": 781,
    "slug": "dhelmise",
    "types": [
      "Ghost",
      "Grass"
    ],
    "attack": 233,
    "defense": 179,
    "stamina": 172,
    "maxCp": 3335,
    "maxCp40": 2950,
    "cpRaid100": 1685,
    "cpWeather100": 2107,
    "cpResearch100": 1264,
    "pveScore": 51,
    "dps": 30.23,
    "bestFastMove": {
      "name": "Shadow Claw",
      "type": "Ghost"
    },
    "bestChargedMove": {
      "name": "Shadow Ball",
      "type": "Ghost"
    },
    "generation": 7
  },
  {
    "name": "Jangmo-o",
    "pokedexId": 782,
    "slug": "jangmo-o",
    "types": [
      "Dragon"
    ],
    "attack": 101,
    "defense": 108,
    "stamina": 128,
    "maxCp": 1086,
    "maxCp40": 960,
    "cpRaid100": 549,
    "cpWeather100": 686,
    "cpResearch100": 411,
    "pveScore": 18,
    "dps": 12.83,
    "bestFastMove": {
      "name": "Dragon Tail",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Outrage",
      "type": "Dragon"
    },
    "generation": 7
  },
  {
    "name": "Hakamo-o",
    "pokedexId": 783,
    "slug": "hakamo-o",
    "types": [
      "Dragon",
      "Fighting"
    ],
    "attack": 145,
    "defense": 162,
    "stamina": 146,
    "maxCp": 1907,
    "maxCp40": 1686,
    "cpRaid100": 963,
    "cpWeather100": 1204,
    "cpResearch100": 723,
    "pveScore": 29,
    "dps": 18.41,
    "bestFastMove": {
      "name": "Dragon Tail",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Outrage",
      "type": "Dragon"
    },
    "generation": 7
  },
  {
    "name": "Kommo-o",
    "pokedexId": 784,
    "slug": "kommo-o",
    "types": [
      "Dragon",
      "Fighting"
    ],
    "attack": 222,
    "defense": 240,
    "stamina": 181,
    "maxCp": 3741,
    "maxCp40": 3309,
    "cpRaid100": 1890,
    "cpWeather100": 2363,
    "cpResearch100": 1418,
    "pveScore": 51,
    "dps": 28.19,
    "bestFastMove": {
      "name": "Dragon Tail",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Outrage",
      "type": "Dragon"
    },
    "generation": 7
  },
  {
    "name": "Tapu Koko",
    "pokedexId": 785,
    "slug": "tapu-koko",
    "types": [
      "Electric",
      "Fairy"
    ],
    "attack": 250,
    "defense": 180,
    "stamina": 172,
    "maxCp": 3573,
    "maxCp40": 3160,
    "cpRaid100": 1805,
    "cpWeather100": 2257,
    "cpResearch100": 1354,
    "pveScore": 48,
    "dps": 28.61,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 7
  },
  {
    "name": "Tapu Lele",
    "pokedexId": 786,
    "slug": "tapu-lele",
    "types": [
      "Psychic",
      "Fairy"
    ],
    "attack": 259,
    "defense": 208,
    "stamina": 172,
    "maxCp": 3950,
    "maxCp40": 3494,
    "cpRaid100": 1996,
    "cpWeather100": 2496,
    "cpResearch100": 1497,
    "pveScore": 56,
    "dps": 31.91,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 7
  },
  {
    "name": "Tapu Bulu",
    "pokedexId": 787,
    "slug": "tapu-bulu",
    "types": [
      "Grass",
      "Fairy"
    ],
    "attack": 249,
    "defense": 215,
    "stamina": 172,
    "maxCp": 3865,
    "maxCp40": 3419,
    "cpRaid100": 1953,
    "cpWeather100": 2442,
    "cpResearch100": 1465,
    "pveScore": 56,
    "dps": 31.75,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 7
  },
  {
    "name": "Tapu Fini",
    "pokedexId": 788,
    "slug": "tapu-fini",
    "types": [
      "Water",
      "Fairy"
    ],
    "attack": 189,
    "defense": 254,
    "stamina": 172,
    "maxCp": 3230,
    "maxCp40": 2857,
    "cpRaid100": 1632,
    "cpWeather100": 2041,
    "cpResearch100": 1224,
    "pveScore": 40,
    "dps": 21.63,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 7
  },
  {
    "name": "Cosmog",
    "pokedexId": 789,
    "slug": "cosmog",
    "types": [
      "Psychic"
    ],
    "attack": 54,
    "defense": 57,
    "stamina": 125,
    "maxCp": 489,
    "maxCp40": 432,
    "cpRaid100": 247,
    "cpWeather100": 309,
    "cpResearch100": 185,
    "pveScore": 15,
    "dps": 6.65,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 7
  },
  {
    "name": "Cosmoem",
    "pokedexId": 790,
    "slug": "cosmoem",
    "types": [
      "Psychic"
    ],
    "attack": 54,
    "defense": 242,
    "stamina": 125,
    "maxCp": 924,
    "maxCp40": 817,
    "cpRaid100": 467,
    "cpWeather100": 583,
    "cpResearch100": 350,
    "pveScore": 15,
    "dps": 6.65,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 7
  },
  {
    "name": "Solgaleo",
    "pokedexId": 791,
    "slug": "solgaleo",
    "types": [
      "Psychic",
      "Steel"
    ],
    "attack": 255,
    "defense": 190,
    "stamina": 262,
    "maxCp": 4543,
    "maxCp40": 4018,
    "cpRaid100": 2296,
    "cpWeather100": 2870,
    "cpResearch100": 1722,
    "pveScore": 59,
    "dps": 31.17,
    "bestFastMove": {
      "name": "Metal Claw",
      "type": "Steel"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 7
  },
  {
    "name": "Lunala",
    "pokedexId": 792,
    "slug": "lunala",
    "types": [
      "Psychic",
      "Ghost"
    ],
    "attack": 255,
    "defense": 190,
    "stamina": 262,
    "maxCp": 4543,
    "maxCp40": 4018,
    "cpRaid100": 2296,
    "cpWeather100": 2870,
    "cpResearch100": 1722,
    "pveScore": 57,
    "dps": 29.91,
    "bestFastMove": {
      "name": "Air Slash",
      "type": "Flying"
    },
    "bestChargedMove": {
      "name": "Shadow Ball",
      "type": "Ghost"
    },
    "generation": 7
  },
  {
    "name": "Buzzwole",
    "pokedexId": 794,
    "slug": "buzzwole",
    "types": [
      "Bug",
      "Fighting"
    ],
    "attack": 236,
    "defense": 196,
    "stamina": 215,
    "maxCp": 3904,
    "maxCp40": 3453,
    "cpRaid100": 1973,
    "cpWeather100": 2466,
    "cpResearch100": 1480,
    "pveScore": 47,
    "dps": 25.65,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 7
  },
  {
    "name": "Pheromosa",
    "pokedexId": 795,
    "slug": "pheromosa",
    "types": [
      "Bug",
      "Fighting"
    ],
    "attack": 316,
    "defense": 85,
    "stamina": 174,
    "maxCp": 3213,
    "maxCp40": 2842,
    "cpRaid100": 1624,
    "cpWeather100": 2030,
    "cpResearch100": 1218,
    "pveScore": 48,
    "dps": 34.35,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 7
  },
  {
    "name": "Celesteela",
    "pokedexId": 797,
    "slug": "celesteela",
    "types": [
      "Steel",
      "Flying"
    ],
    "attack": 207,
    "defense": 199,
    "stamina": 219,
    "maxCp": 3507,
    "maxCp40": 3102,
    "cpRaid100": 1772,
    "cpWeather100": 2216,
    "cpResearch100": 1329,
    "pveScore": 42,
    "dps": 22.82,
    "bestFastMove": {
      "name": "Metal Claw",
      "type": "Steel"
    },
    "bestChargedMove": {
      "name": "Iron Head",
      "type": "Steel"
    },
    "generation": 7
  },
  {
    "name": "Guzzlord",
    "pokedexId": 799,
    "slug": "guzzlord",
    "types": [
      "Dark",
      "Dragon"
    ],
    "attack": 188,
    "defense": 99,
    "stamina": 440,
    "maxCp": 3264,
    "maxCp40": 2887,
    "cpRaid100": 1650,
    "cpWeather100": 2062,
    "cpResearch100": 1237,
    "pveScore": 40,
    "dps": 21.68,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "generation": 7
  },
  {
    "name": "Necrozma",
    "pokedexId": 800,
    "slug": "necrozma",
    "types": [
      "Psychic"
    ],
    "attack": 251,
    "defense": 195,
    "stamina": 219,
    "maxCp": 4163,
    "maxCp40": 3682,
    "cpRaid100": 2104,
    "cpWeather100": 2630,
    "cpResearch100": 1578,
    "pveScore": 56,
    "dps": 30.92,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 7
  },
  {
    "name": "Magearna",
    "pokedexId": 801,
    "slug": "magearna",
    "types": [
      "Steel",
      "Fairy"
    ],
    "attack": 246,
    "defense": 225,
    "stamina": 190,
    "maxCp": 4087,
    "maxCp40": 3615,
    "cpRaid100": 2066,
    "cpWeather100": 2582,
    "cpResearch100": 1549,
    "pveScore": 49,
    "dps": 27.11,
    "bestFastMove": {
      "name": "Metal Claw",
      "type": "Steel"
    },
    "bestChargedMove": {
      "name": "Iron Head",
      "type": "Steel"
    },
    "generation": 7
  },
  {
    "name": "Marshadow",
    "pokedexId": 802,
    "slug": "marshadow",
    "types": [
      "Fighting",
      "Ghost"
    ],
    "attack": 265,
    "defense": 190,
    "stamina": 207,
    "maxCp": 4217,
    "maxCp40": 3730,
    "cpRaid100": 2131,
    "cpWeather100": 2664,
    "cpResearch100": 1599,
    "pveScore": 61,
    "dps": 34.16,
    "bestFastMove": {
      "name": "Counter",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Dynamic Punch",
      "type": "Fighting"
    },
    "generation": 7
  },
  {
    "name": "Poipole",
    "pokedexId": 803,
    "slug": "poipole",
    "types": [
      "Poison"
    ],
    "attack": 145,
    "defense": 133,
    "stamina": 167,
    "maxCp": 1854,
    "maxCp40": 1640,
    "cpRaid100": 937,
    "cpWeather100": 1171,
    "cpResearch100": 702,
    "pveScore": 27,
    "dps": 17.78,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "generation": 7
  },
  {
    "name": "Naganadel",
    "pokedexId": 804,
    "slug": "naganadel",
    "types": [
      "Poison",
      "Dragon"
    ],
    "attack": 263,
    "defense": 159,
    "stamina": 177,
    "maxCp": 3587,
    "maxCp40": 3173,
    "cpRaid100": 1813,
    "cpWeather100": 2266,
    "cpResearch100": 1360,
    "pveScore": 53,
    "dps": 32.25,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "generation": 7
  },
  {
    "name": "Stakataka",
    "pokedexId": 805,
    "slug": "stakataka",
    "types": [
      "Rock",
      "Steel"
    ],
    "attack": 212,
    "defense": 297,
    "stamina": 156,
    "maxCp": 3702,
    "maxCp40": 3274,
    "cpRaid100": 1871,
    "cpWeather100": 2339,
    "cpResearch100": 1403,
    "pveScore": 45,
    "dps": 24.45,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 7
  },
  {
    "name": "Zeraora",
    "pokedexId": 807,
    "slug": "zeraora",
    "types": [
      "Electric"
    ],
    "attack": 252,
    "defense": 178,
    "stamina": 204,
    "maxCp": 3875,
    "maxCp40": 3428,
    "cpRaid100": 1959,
    "cpWeather100": 2448,
    "cpResearch100": 1469,
    "pveScore": 50,
    "dps": 28.84,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 7
  },
  {
    "name": "Meltan",
    "pokedexId": 808,
    "slug": "meltan",
    "types": [
      "Steel"
    ],
    "attack": 117,
    "defense": 99,
    "stamina": 130,
    "maxCp": 1198,
    "maxCp40": 1059,
    "cpRaid100": 605,
    "cpWeather100": 757,
    "cpResearch100": 454,
    "pveScore": 17,
    "dps": 12.9,
    "bestFastMove": {
      "name": "Metal Claw",
      "type": "Steel"
    },
    "bestChargedMove": {
      "name": "Iron Head",
      "type": "Steel"
    },
    "generation": 7
  },
  {
    "name": "Melmetal",
    "pokedexId": 809,
    "slug": "melmetal",
    "types": [
      "Steel"
    ],
    "attack": 226,
    "defense": 190,
    "stamina": 260,
    "maxCp": 4040,
    "maxCp40": 3573,
    "cpRaid100": 2042,
    "cpWeather100": 2552,
    "cpResearch100": 1531,
    "pveScore": 47,
    "dps": 24.91,
    "bestFastMove": {
      "name": "Metal Claw",
      "type": "Steel"
    },
    "bestChargedMove": {
      "name": "Iron Head",
      "type": "Steel"
    },
    "generation": 7
  },
  {
    "name": "Grookey",
    "pokedexId": 810,
    "slug": "grookey",
    "types": [
      "Grass"
    ],
    "attack": 121,
    "defense": 91,
    "stamina": 137,
    "maxCp": 1218,
    "maxCp40": 1078,
    "cpRaid100": 616,
    "cpWeather100": 770,
    "cpResearch100": 462,
    "pveScore": 21,
    "dps": 15.43,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 8
  },
  {
    "name": "Thwackey",
    "pokedexId": 811,
    "slug": "thwackey",
    "types": [
      "Grass"
    ],
    "attack": 164,
    "defense": 134,
    "stamina": 172,
    "maxCp": 2109,
    "maxCp40": 1866,
    "cpRaid100": 1066,
    "cpWeather100": 1333,
    "cpResearch100": 799,
    "pveScore": 33,
    "dps": 20.91,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 8
  },
  {
    "name": "Rillaboom",
    "pokedexId": 812,
    "slug": "rillaboom",
    "types": [
      "Grass"
    ],
    "attack": 238,
    "defense": 168,
    "stamina": 225,
    "maxCp": 3743,
    "maxCp40": 3311,
    "cpRaid100": 1892,
    "cpWeather100": 2365,
    "cpResearch100": 1419,
    "pveScore": 54,
    "dps": 30.34,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 8
  },
  {
    "name": "Scorbunny",
    "pokedexId": 813,
    "slug": "scorbunny",
    "types": [
      "Fire"
    ],
    "attack": 133,
    "defense": 79,
    "stamina": 137,
    "maxCp": 1249,
    "maxCp40": 1104,
    "cpRaid100": 631,
    "cpWeather100": 789,
    "cpResearch100": 473,
    "pveScore": 23,
    "dps": 17.73,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 8
  },
  {
    "name": "Raboot",
    "pokedexId": 814,
    "slug": "raboot",
    "types": [
      "Fire"
    ],
    "attack": 170,
    "defense": 125,
    "stamina": 163,
    "maxCp": 2062,
    "maxCp40": 1824,
    "cpRaid100": 1042,
    "cpWeather100": 1302,
    "cpResearch100": 781,
    "pveScore": 34,
    "dps": 22.67,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 8
  },
  {
    "name": "Cinderace",
    "pokedexId": 815,
    "slug": "cinderace",
    "types": [
      "Fire"
    ],
    "attack": 239,
    "defense": 163,
    "stamina": 190,
    "maxCp": 3426,
    "maxCp40": 3030,
    "cpRaid100": 1731,
    "cpWeather100": 2164,
    "cpResearch100": 1298,
    "pveScore": 53,
    "dps": 31.87,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 8
  },
  {
    "name": "Sobble",
    "pokedexId": 816,
    "slug": "sobble",
    "types": [
      "Water"
    ],
    "attack": 131,
    "defense": 79,
    "stamina": 137,
    "maxCp": 1232,
    "maxCp40": 1089,
    "cpRaid100": 622,
    "cpWeather100": 778,
    "cpResearch100": 467,
    "pveScore": 19,
    "dps": 14.99,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 8
  },
  {
    "name": "Drizzile",
    "pokedexId": 817,
    "slug": "drizzile",
    "types": [
      "Water"
    ],
    "attack": 187,
    "defense": 113,
    "stamina": 163,
    "maxCp": 2152,
    "maxCp40": 1904,
    "cpRaid100": 1088,
    "cpWeather100": 1360,
    "cpResearch100": 816,
    "pveScore": 32,
    "dps": 21.4,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 8
  },
  {
    "name": "Inteleon",
    "pokedexId": 818,
    "slug": "inteleon",
    "types": [
      "Water"
    ],
    "attack": 262,
    "defense": 142,
    "stamina": 172,
    "maxCp": 3351,
    "maxCp40": 2964,
    "cpRaid100": 1693,
    "cpWeather100": 2117,
    "cpResearch100": 1270,
    "pveScore": 47,
    "dps": 29.98,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 8
  },
  {
    "name": "Skwovet",
    "pokedexId": 819,
    "slug": "skwovet",
    "types": [
      "Normal"
    ],
    "attack": 94,
    "defense": 86,
    "stamina": 172,
    "maxCp": 1057,
    "maxCp40": 935,
    "cpRaid100": 534,
    "cpWeather100": 668,
    "cpResearch100": 401,
    "pveScore": 16,
    "dps": 11.35,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 8
  },
  {
    "name": "Greedent",
    "pokedexId": 820,
    "slug": "greedent",
    "types": [
      "Normal"
    ],
    "attack": 160,
    "defense": 156,
    "stamina": 260,
    "maxCp": 2679,
    "maxCp40": 2370,
    "cpRaid100": 1354,
    "cpWeather100": 1693,
    "cpResearch100": 1015,
    "pveScore": 35,
    "dps": 19.32,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 8
  },
  {
    "name": "Rookidee",
    "pokedexId": 821,
    "slug": "rookidee",
    "types": [
      "Flying"
    ],
    "attack": 87,
    "defense": 67,
    "stamina": 116,
    "maxCp": 746,
    "maxCp40": 660,
    "cpRaid100": 377,
    "cpWeather100": 471,
    "cpResearch100": 282,
    "pveScore": 15,
    "dps": 10.88,
    "bestFastMove": {
      "name": "Air Slash",
      "type": "Flying"
    },
    "bestChargedMove": {
      "name": "Sky Attack",
      "type": "Flying"
    },
    "generation": 8
  },
  {
    "name": "Corvisquire",
    "pokedexId": 822,
    "slug": "corvisquire",
    "types": [
      "Flying"
    ],
    "attack": 129,
    "defense": 110,
    "stamina": 169,
    "maxCp": 1542,
    "maxCp40": 1363,
    "cpRaid100": 779,
    "cpWeather100": 974,
    "cpResearch100": 584,
    "pveScore": 24,
    "dps": 16.12,
    "bestFastMove": {
      "name": "Air Slash",
      "type": "Flying"
    },
    "bestChargedMove": {
      "name": "Sky Attack",
      "type": "Flying"
    },
    "generation": 8
  },
  {
    "name": "Corviknight",
    "pokedexId": 823,
    "slug": "corviknight",
    "types": [
      "Flying",
      "Steel"
    ],
    "attack": 163,
    "defense": 192,
    "stamina": 221,
    "maxCp": 2777,
    "maxCp40": 2457,
    "cpRaid100": 1404,
    "cpWeather100": 1755,
    "cpResearch100": 1053,
    "pveScore": 37,
    "dps": 20.38,
    "bestFastMove": {
      "name": "Air Slash",
      "type": "Flying"
    },
    "bestChargedMove": {
      "name": "Sky Attack",
      "type": "Flying"
    },
    "generation": 8
  },
  {
    "name": "Blipbug",
    "pokedexId": 824,
    "slug": "blipbug",
    "types": [
      "Bug"
    ],
    "attack": 46,
    "defense": 67,
    "stamina": 93,
    "maxCp": 405,
    "maxCp40": 358,
    "cpRaid100": 204,
    "cpWeather100": 256,
    "cpResearch100": 153,
    "pveScore": 15,
    "dps": 5.0,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 8
  },
  {
    "name": "Dottler",
    "pokedexId": 825,
    "slug": "dottler",
    "types": [
      "Bug",
      "Psychic"
    ],
    "attack": 88,
    "defense": 157,
    "stamina": 137,
    "maxCp": 1175,
    "maxCp40": 1040,
    "cpRaid100": 594,
    "cpWeather100": 743,
    "cpResearch100": 445,
    "pveScore": 15,
    "dps": 9.57,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 8
  },
  {
    "name": "Orbeetle",
    "pokedexId": 826,
    "slug": "orbeetle",
    "types": [
      "Bug",
      "Psychic"
    ],
    "attack": 156,
    "defense": 239,
    "stamina": 155,
    "maxCp": 2509,
    "maxCp40": 2219,
    "cpRaid100": 1268,
    "cpWeather100": 1585,
    "cpResearch100": 951,
    "pveScore": 30,
    "dps": 16.96,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 8
  },
  {
    "name": "Nickit",
    "pokedexId": 827,
    "slug": "nickit",
    "types": [
      "Dark"
    ],
    "attack": 85,
    "defense": 82,
    "stamina": 120,
    "maxCp": 808,
    "maxCp40": 714,
    "cpRaid100": 408,
    "cpWeather100": 510,
    "cpResearch100": 306,
    "pveScore": 15,
    "dps": 9.8,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "generation": 8
  },
  {
    "name": "Thievul",
    "pokedexId": 828,
    "slug": "thievul",
    "types": [
      "Dark"
    ],
    "attack": 172,
    "defense": 163,
    "stamina": 172,
    "maxCp": 2409,
    "maxCp40": 2130,
    "cpRaid100": 1217,
    "cpWeather100": 1522,
    "cpResearch100": 913,
    "pveScore": 32,
    "dps": 19.83,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "generation": 8
  },
  {
    "name": "Gossifleur",
    "pokedexId": 829,
    "slug": "gossifleur",
    "types": [
      "Grass"
    ],
    "attack": 70,
    "defense": 104,
    "stamina": 120,
    "maxCp": 760,
    "maxCp40": 672,
    "cpRaid100": 384,
    "cpWeather100": 480,
    "cpResearch100": 288,
    "pveScore": 15,
    "dps": 8.93,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 8
  },
  {
    "name": "Eldegoss",
    "pokedexId": 830,
    "slug": "eldegoss",
    "types": [
      "Grass"
    ],
    "attack": 148,
    "defense": 211,
    "stamina": 155,
    "maxCp": 2255,
    "maxCp40": 1995,
    "cpRaid100": 1140,
    "cpWeather100": 1425,
    "cpResearch100": 855,
    "pveScore": 32,
    "dps": 18.87,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 8
  },
  {
    "name": "Wooloo",
    "pokedexId": 831,
    "slug": "wooloo",
    "types": [
      "Normal"
    ],
    "attack": 76,
    "defense": 97,
    "stamina": 123,
    "maxCp": 798,
    "maxCp40": 706,
    "cpRaid100": 403,
    "cpWeather100": 504,
    "cpResearch100": 302,
    "pveScore": 15,
    "dps": 9.18,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 8
  },
  {
    "name": "Dubwool",
    "pokedexId": 832,
    "slug": "dubwool",
    "types": [
      "Normal"
    ],
    "attack": 159,
    "defense": 198,
    "stamina": 176,
    "maxCp": 2478,
    "maxCp40": 2191,
    "cpRaid100": 1252,
    "cpWeather100": 1565,
    "cpResearch100": 939,
    "pveScore": 33,
    "dps": 19.2,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 8
  },
  {
    "name": "Chewtle",
    "pokedexId": 833,
    "slug": "chewtle",
    "types": [
      "Water"
    ],
    "attack": 114,
    "defense": 85,
    "stamina": 137,
    "maxCp": 1123,
    "maxCp40": 993,
    "cpRaid100": 567,
    "cpWeather100": 709,
    "cpResearch100": 425,
    "pveScore": 17,
    "dps": 13.04,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 8
  },
  {
    "name": "Drednaw",
    "pokedexId": 834,
    "slug": "drednaw",
    "types": [
      "Water",
      "Rock"
    ],
    "attack": 213,
    "defense": 163,
    "stamina": 207,
    "maxCp": 3200,
    "maxCp40": 2830,
    "cpRaid100": 1617,
    "cpWeather100": 2022,
    "cpResearch100": 1213,
    "pveScore": 42,
    "dps": 24.37,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 8
  },
  {
    "name": "Yamper",
    "pokedexId": 835,
    "slug": "yamper",
    "types": [
      "Electric"
    ],
    "attack": 80,
    "defense": 90,
    "stamina": 153,
    "maxCp": 890,
    "maxCp40": 788,
    "cpRaid100": 450,
    "cpWeather100": 562,
    "cpResearch100": 337,
    "pveScore": 15,
    "dps": 9.15,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 8
  },
  {
    "name": "Boltund",
    "pokedexId": 836,
    "slug": "boltund",
    "types": [
      "Electric"
    ],
    "attack": 197,
    "defense": 131,
    "stamina": 170,
    "maxCp": 2460,
    "maxCp40": 2176,
    "cpRaid100": 1243,
    "cpWeather100": 1554,
    "cpResearch100": 932,
    "pveScore": 35,
    "dps": 22.54,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 8
  },
  {
    "name": "Rolycoly",
    "pokedexId": 837,
    "slug": "rolycoly",
    "types": [
      "Rock"
    ],
    "attack": 73,
    "defense": 91,
    "stamina": 102,
    "maxCp": 691,
    "maxCp40": 612,
    "cpRaid100": 349,
    "cpWeather100": 437,
    "cpResearch100": 262,
    "pveScore": 15,
    "dps": 8.42,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 8
  },
  {
    "name": "Carkol",
    "pokedexId": 838,
    "slug": "carkol",
    "types": [
      "Rock",
      "Fire"
    ],
    "attack": 114,
    "defense": 157,
    "stamina": 190,
    "maxCp": 1710,
    "maxCp40": 1512,
    "cpRaid100": 864,
    "cpWeather100": 1080,
    "cpResearch100": 648,
    "pveScore": 22,
    "dps": 13.15,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 8
  },
  {
    "name": "Coalossal",
    "pokedexId": 839,
    "slug": "coalossal",
    "types": [
      "Rock",
      "Fire"
    ],
    "attack": 146,
    "defense": 198,
    "stamina": 242,
    "maxCp": 2659,
    "maxCp40": 2352,
    "cpRaid100": 1344,
    "cpWeather100": 1680,
    "cpResearch100": 1008,
    "pveScore": 32,
    "dps": 16.84,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 8
  },
  {
    "name": "Applin",
    "pokedexId": 840,
    "slug": "applin",
    "types": [
      "Grass",
      "Dragon"
    ],
    "attack": 71,
    "defense": 116,
    "stamina": 120,
    "maxCp": 807,
    "maxCp40": 714,
    "cpRaid100": 408,
    "cpWeather100": 510,
    "cpResearch100": 306,
    "pveScore": 15,
    "dps": 9.05,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 8
  },
  {
    "name": "Flapple",
    "pokedexId": 841,
    "slug": "flapple",
    "types": [
      "Grass",
      "Dragon"
    ],
    "attack": 214,
    "defense": 144,
    "stamina": 172,
    "maxCp": 2788,
    "maxCp40": 2466,
    "cpRaid100": 1409,
    "cpWeather100": 1761,
    "cpResearch100": 1057,
    "pveScore": 43,
    "dps": 27.29,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 8
  },
  {
    "name": "Appletun",
    "pokedexId": 842,
    "slug": "appletun",
    "types": [
      "Grass",
      "Dragon"
    ],
    "attack": 179,
    "defense": 146,
    "stamina": 242,
    "maxCp": 2786,
    "maxCp40": 2464,
    "cpRaid100": 1408,
    "cpWeather100": 1760,
    "cpResearch100": 1056,
    "pveScore": 40,
    "dps": 22.82,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 8
  },
  {
    "name": "Silicobra",
    "pokedexId": 843,
    "slug": "silicobra",
    "types": [
      "Ground"
    ],
    "attack": 102,
    "defense": 124,
    "stamina": 141,
    "maxCp": 1216,
    "maxCp40": 1076,
    "cpRaid100": 614,
    "cpWeather100": 768,
    "cpResearch100": 461,
    "pveScore": 18,
    "dps": 12.68,
    "bestFastMove": {
      "name": "Mud-Slap",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Earthquake",
      "type": "Ground"
    },
    "generation": 8
  },
  {
    "name": "Sandaconda",
    "pokedexId": 844,
    "slug": "sandaconda",
    "types": [
      "Ground"
    ],
    "attack": 202,
    "defense": 207,
    "stamina": 176,
    "maxCp": 3155,
    "maxCp40": 2790,
    "cpRaid100": 1594,
    "cpWeather100": 1993,
    "cpResearch100": 1196,
    "pveScore": 44,
    "dps": 25.1,
    "bestFastMove": {
      "name": "Mud-Slap",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Earthquake",
      "type": "Ground"
    },
    "generation": 8
  },
  {
    "name": "Cramorant",
    "pokedexId": 845,
    "slug": "cramorant",
    "types": [
      "Flying",
      "Water"
    ],
    "attack": 173,
    "defense": 163,
    "stamina": 172,
    "maxCp": 2421,
    "maxCp40": 2142,
    "cpRaid100": 1224,
    "cpWeather100": 1530,
    "cpResearch100": 918,
    "pveScore": 35,
    "dps": 21.62,
    "bestFastMove": {
      "name": "Air Slash",
      "type": "Flying"
    },
    "bestChargedMove": {
      "name": "Sky Attack",
      "type": "Flying"
    },
    "generation": 8
  },
  {
    "name": "Arrokuda",
    "pokedexId": 846,
    "slug": "arrokuda",
    "types": [
      "Water"
    ],
    "attack": 118,
    "defense": 71,
    "stamina": 121,
    "maxCp": 1015,
    "maxCp40": 898,
    "cpRaid100": 513,
    "cpWeather100": 641,
    "cpResearch100": 385,
    "pveScore": 16,
    "dps": 13.5,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 8
  },
  {
    "name": "Barraskewda",
    "pokedexId": 847,
    "slug": "barraskewda",
    "types": [
      "Water"
    ],
    "attack": 258,
    "defense": 126,
    "stamina": 156,
    "maxCp": 2993,
    "maxCp40": 2647,
    "cpRaid100": 1512,
    "cpWeather100": 1891,
    "cpResearch100": 1134,
    "pveScore": 44,
    "dps": 29.52,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 8
  },
  {
    "name": "Toxel",
    "pokedexId": 848,
    "slug": "toxel",
    "types": [
      "Electric",
      "Poison"
    ],
    "attack": 97,
    "defense": 65,
    "stamina": 120,
    "maxCp": 821,
    "maxCp40": 726,
    "cpRaid100": 415,
    "cpWeather100": 519,
    "cpResearch100": 311,
    "pveScore": 15,
    "dps": 11.1,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 8
  },
  {
    "name": "Toxtricity Amped",
    "pokedexId": 849,
    "slug": "toxtricity-amped",
    "types": [
      "Electric",
      "Poison"
    ],
    "attack": 224,
    "defense": 140,
    "stamina": 181,
    "maxCp": 2941,
    "maxCp40": 2601,
    "cpRaid100": 1486,
    "cpWeather100": 1858,
    "cpResearch100": 1115,
    "pveScore": 41,
    "dps": 25.63,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 8
  },
  {
    "name": "Sizzlipede",
    "pokedexId": 850,
    "slug": "sizzlipede",
    "types": [
      "Fire",
      "Bug"
    ],
    "attack": 119,
    "defense": 90,
    "stamina": 137,
    "maxCp": 1195,
    "maxCp40": 1057,
    "cpRaid100": 604,
    "cpWeather100": 755,
    "cpResearch100": 453,
    "pveScore": 21,
    "dps": 15.87,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 8
  },
  {
    "name": "Centiskorch",
    "pokedexId": 851,
    "slug": "centiskorch",
    "types": [
      "Fire",
      "Bug"
    ],
    "attack": 219,
    "defense": 158,
    "stamina": 225,
    "maxCp": 3366,
    "maxCp40": 2978,
    "cpRaid100": 1701,
    "cpWeather100": 2127,
    "cpResearch100": 1276,
    "pveScore": 51,
    "dps": 29.2,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 8
  },
  {
    "name": "Clobbopus",
    "pokedexId": 852,
    "slug": "clobbopus",
    "types": [
      "Fighting"
    ],
    "attack": 120,
    "defense": 103,
    "stamina": 137,
    "maxCp": 1276,
    "maxCp40": 1129,
    "cpRaid100": 645,
    "cpWeather100": 806,
    "cpResearch100": 483,
    "pveScore": 21,
    "dps": 15.47,
    "bestFastMove": {
      "name": "Counter",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Dynamic Punch",
      "type": "Fighting"
    },
    "generation": 8
  },
  {
    "name": "Grapploct",
    "pokedexId": 853,
    "slug": "grapploct",
    "types": [
      "Fighting"
    ],
    "attack": 209,
    "defense": 161,
    "stamina": 190,
    "maxCp": 3004,
    "maxCp40": 2657,
    "cpRaid100": 1518,
    "cpWeather100": 1898,
    "cpResearch100": 1139,
    "pveScore": 45,
    "dps": 26.94,
    "bestFastMove": {
      "name": "Counter",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Dynamic Punch",
      "type": "Fighting"
    },
    "generation": 8
  },
  {
    "name": "Sinistea",
    "pokedexId": 854,
    "slug": "sinistea",
    "types": [
      "Ghost"
    ],
    "attack": 134,
    "defense": 96,
    "stamina": 120,
    "maxCp": 1287,
    "maxCp40": 1139,
    "cpRaid100": 650,
    "cpWeather100": 813,
    "cpResearch100": 488,
    "pveScore": 23,
    "dps": 17.39,
    "bestFastMove": {
      "name": "Shadow Claw",
      "type": "Ghost"
    },
    "bestChargedMove": {
      "name": "Shadow Ball",
      "type": "Ghost"
    },
    "generation": 8
  },
  {
    "name": "Polteageist",
    "pokedexId": 855,
    "slug": "polteageist",
    "types": [
      "Ghost"
    ],
    "attack": 248,
    "defense": 189,
    "stamina": 155,
    "maxCp": 3458,
    "maxCp40": 3058,
    "cpRaid100": 1747,
    "cpWeather100": 2185,
    "cpResearch100": 1311,
    "pveScore": 53,
    "dps": 32.18,
    "bestFastMove": {
      "name": "Shadow Claw",
      "type": "Ghost"
    },
    "bestChargedMove": {
      "name": "Shadow Ball",
      "type": "Ghost"
    },
    "generation": 8
  },
  {
    "name": "Hatenna",
    "pokedexId": 856,
    "slug": "hatenna",
    "types": [
      "Psychic"
    ],
    "attack": 98,
    "defense": 93,
    "stamina": 123,
    "maxCp": 974,
    "maxCp40": 861,
    "cpRaid100": 492,
    "cpWeather100": 615,
    "cpResearch100": 369,
    "pveScore": 16,
    "dps": 12.07,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 8
  },
  {
    "name": "Hattrem",
    "pokedexId": 857,
    "slug": "hattrem",
    "types": [
      "Psychic"
    ],
    "attack": 152,
    "defense": 133,
    "stamina": 149,
    "maxCp": 1837,
    "maxCp40": 1624,
    "cpRaid100": 928,
    "cpWeather100": 1160,
    "cpResearch100": 696,
    "pveScore": 28,
    "dps": 18.72,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 8
  },
  {
    "name": "Hatterene",
    "pokedexId": 858,
    "slug": "hatterene",
    "types": [
      "Psychic",
      "Fairy"
    ],
    "attack": 237,
    "defense": 182,
    "stamina": 149,
    "maxCp": 3198,
    "maxCp40": 2829,
    "cpRaid100": 1616,
    "cpWeather100": 2020,
    "cpResearch100": 1212,
    "pveScore": 47,
    "dps": 29.2,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 8
  },
  {
    "name": "Impidimp",
    "pokedexId": 859,
    "slug": "impidimp",
    "types": [
      "Dark",
      "Fairy"
    ],
    "attack": 102,
    "defense": 69,
    "stamina": 128,
    "maxCp": 905,
    "maxCp40": 800,
    "cpRaid100": 457,
    "cpWeather100": 572,
    "cpResearch100": 343,
    "pveScore": 15,
    "dps": 11.76,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "generation": 8
  },
  {
    "name": "Morgrem",
    "pokedexId": 860,
    "slug": "morgrem",
    "types": [
      "Dark",
      "Fairy"
    ],
    "attack": 145,
    "defense": 101,
    "stamina": 163,
    "maxCp": 1623,
    "maxCp40": 1435,
    "cpRaid100": 820,
    "cpWeather100": 1025,
    "cpResearch100": 615,
    "pveScore": 24,
    "dps": 16.72,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "generation": 8
  },
  {
    "name": "Grimmsnarl",
    "pokedexId": 861,
    "slug": "grimmsnarl",
    "types": [
      "Dark",
      "Fairy"
    ],
    "attack": 227,
    "defense": 138,
    "stamina": 216,
    "maxCp": 3212,
    "maxCp40": 2841,
    "cpRaid100": 1623,
    "cpWeather100": 2029,
    "cpResearch100": 1217,
    "pveScore": 44,
    "dps": 26.18,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "generation": 8
  },
  {
    "name": "Obstagoon",
    "pokedexId": 862,
    "slug": "obstagoon",
    "types": [
      "Dark",
      "Normal"
    ],
    "attack": 179,
    "defense": 194,
    "stamina": 212,
    "maxCp": 2983,
    "maxCp40": 2639,
    "cpRaid100": 1508,
    "cpWeather100": 1885,
    "cpResearch100": 1131,
    "pveScore": 37,
    "dps": 20.64,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "generation": 8
  },
  {
    "name": "Perrserker",
    "pokedexId": 863,
    "slug": "perrserker",
    "types": [
      "Steel"
    ],
    "attack": 195,
    "defense": 162,
    "stamina": 172,
    "maxCp": 2697,
    "maxCp40": 2386,
    "cpRaid100": 1363,
    "cpWeather100": 1704,
    "cpResearch100": 1022,
    "pveScore": 35,
    "dps": 21.49,
    "bestFastMove": {
      "name": "Metal Claw",
      "type": "Steel"
    },
    "bestChargedMove": {
      "name": "Iron Head",
      "type": "Steel"
    },
    "generation": 8
  },
  {
    "name": "Cursola",
    "pokedexId": 864,
    "slug": "cursola",
    "types": [
      "Ghost"
    ],
    "attack": 253,
    "defense": 182,
    "stamina": 155,
    "maxCp": 3463,
    "maxCp40": 3063,
    "cpRaid100": 1750,
    "cpWeather100": 2188,
    "cpResearch100": 1312,
    "pveScore": 54,
    "dps": 32.83,
    "bestFastMove": {
      "name": "Shadow Claw",
      "type": "Ghost"
    },
    "bestChargedMove": {
      "name": "Shadow Ball",
      "type": "Ghost"
    },
    "generation": 8
  },
  {
    "name": "Sirfetchd",
    "pokedexId": 865,
    "slug": "sirfetchd",
    "types": [
      "Fighting"
    ],
    "attack": 248,
    "defense": 177,
    "stamina": 158,
    "maxCp": 3384,
    "maxCp40": 2993,
    "cpRaid100": 1710,
    "cpWeather100": 2138,
    "cpResearch100": 1283,
    "pveScore": 52,
    "dps": 31.96,
    "bestFastMove": {
      "name": "Counter",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Dynamic Punch",
      "type": "Fighting"
    },
    "generation": 8
  },
  {
    "name": "Mr Rime",
    "pokedexId": 866,
    "slug": "mr-rime",
    "types": [
      "Ice",
      "Psychic"
    ],
    "attack": 212,
    "defense": 179,
    "stamina": 190,
    "maxCp": 3196,
    "maxCp40": 2827,
    "cpRaid100": 1615,
    "cpWeather100": 2019,
    "cpResearch100": 1211,
    "pveScore": 41,
    "dps": 24.05,
    "bestFastMove": {
      "name": "Powder Snow",
      "type": "Ice"
    },
    "bestChargedMove": {
      "name": "Avalanche",
      "type": "Ice"
    },
    "generation": 8
  },
  {
    "name": "Runerigus",
    "pokedexId": 867,
    "slug": "runerigus",
    "types": [
      "Ground",
      "Ghost"
    ],
    "attack": 163,
    "defense": 237,
    "stamina": 151,
    "maxCp": 2570,
    "maxCp40": 2273,
    "cpRaid100": 1299,
    "cpWeather100": 1624,
    "cpResearch100": 974,
    "pveScore": 35,
    "dps": 20.26,
    "bestFastMove": {
      "name": "Mud-Slap",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Earthquake",
      "type": "Ground"
    },
    "generation": 8
  },
  {
    "name": "Milcery",
    "pokedexId": 868,
    "slug": "milcery",
    "types": [
      "Fairy"
    ],
    "attack": 90,
    "defense": 98,
    "stamina": 128,
    "maxCp": 942,
    "maxCp40": 833,
    "cpRaid100": 476,
    "cpWeather100": 595,
    "cpResearch100": 357,
    "pveScore": 15,
    "dps": 10.91,
    "bestFastMove": {
      "name": "Charm",
      "type": "Fairy"
    },
    "bestChargedMove": {
      "name": "Dazzling Gleam",
      "type": "Fairy"
    },
    "generation": 8
  },
  {
    "name": "Alcremie",
    "pokedexId": 869,
    "slug": "alcremie",
    "types": [
      "Fairy"
    ],
    "attack": 203,
    "defense": 203,
    "stamina": 163,
    "maxCp": 3032,
    "maxCp40": 2682,
    "cpRaid100": 1532,
    "cpWeather100": 1915,
    "cpResearch100": 1149,
    "pveScore": 42,
    "dps": 24.61,
    "bestFastMove": {
      "name": "Charm",
      "type": "Fairy"
    },
    "bestChargedMove": {
      "name": "Dazzling Gleam",
      "type": "Fairy"
    },
    "generation": 8
  },
  {
    "name": "Falinks",
    "pokedexId": 870,
    "slug": "falinks",
    "types": [
      "Fighting"
    ],
    "attack": 192,
    "defense": 170,
    "stamina": 163,
    "maxCp": 2652,
    "maxCp40": 2346,
    "cpRaid100": 1340,
    "cpWeather100": 1675,
    "cpResearch100": 1005,
    "pveScore": 40,
    "dps": 24.75,
    "bestFastMove": {
      "name": "Counter",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Dynamic Punch",
      "type": "Fighting"
    },
    "generation": 8
  },
  {
    "name": "Pincurchin",
    "pokedexId": 871,
    "slug": "pincurchin",
    "types": [
      "Electric"
    ],
    "attack": 176,
    "defense": 161,
    "stamina": 134,
    "maxCp": 2183,
    "maxCp40": 1931,
    "cpRaid100": 1103,
    "cpWeather100": 1379,
    "cpResearch100": 827,
    "pveScore": 31,
    "dps": 20.14,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 8
  },
  {
    "name": "Snom",
    "pokedexId": 872,
    "slug": "snom",
    "types": [
      "Ice",
      "Bug"
    ],
    "attack": 76,
    "defense": 59,
    "stamina": 102,
    "maxCp": 597,
    "maxCp40": 528,
    "cpRaid100": 302,
    "cpWeather100": 377,
    "cpResearch100": 226,
    "pveScore": 15,
    "dps": 8.62,
    "bestFastMove": {
      "name": "Powder Snow",
      "type": "Ice"
    },
    "bestChargedMove": {
      "name": "Avalanche",
      "type": "Ice"
    },
    "generation": 8
  },
  {
    "name": "Frosmoth",
    "pokedexId": 873,
    "slug": "frosmoth",
    "types": [
      "Ice",
      "Bug"
    ],
    "attack": 230,
    "defense": 154,
    "stamina": 172,
    "maxCp": 3075,
    "maxCp40": 2720,
    "cpRaid100": 1554,
    "cpWeather100": 1943,
    "cpResearch100": 1165,
    "pveScore": 42,
    "dps": 26.09,
    "bestFastMove": {
      "name": "Powder Snow",
      "type": "Ice"
    },
    "bestChargedMove": {
      "name": "Avalanche",
      "type": "Ice"
    },
    "generation": 8
  },
  {
    "name": "Stonjourner",
    "pokedexId": 874,
    "slug": "stonjourner",
    "types": [
      "Rock"
    ],
    "attack": 222,
    "defense": 182,
    "stamina": 225,
    "maxCp": 3638,
    "maxCp40": 3218,
    "cpRaid100": 1839,
    "cpWeather100": 2299,
    "cpResearch100": 1379,
    "pveScore": 46,
    "dps": 25.6,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 8
  },
  {
    "name": "Eiscue Ice",
    "pokedexId": 875,
    "slug": "eiscue-ice",
    "types": [
      "Ice"
    ],
    "attack": 148,
    "defense": 195,
    "stamina": 181,
    "maxCp": 2335,
    "maxCp40": 2065,
    "cpRaid100": 1180,
    "cpWeather100": 1475,
    "cpResearch100": 885,
    "pveScore": 29,
    "dps": 16.79,
    "bestFastMove": {
      "name": "Powder Snow",
      "type": "Ice"
    },
    "bestChargedMove": {
      "name": "Avalanche",
      "type": "Ice"
    },
    "generation": 8
  },
  {
    "name": "Indeedee Male",
    "pokedexId": 876,
    "slug": "indeedee-male",
    "types": [
      "Psychic",
      "Normal"
    ],
    "attack": 208,
    "defense": 166,
    "stamina": 155,
    "maxCp": 2762,
    "maxCp40": 2443,
    "cpRaid100": 1396,
    "cpWeather100": 1745,
    "cpResearch100": 1047,
    "pveScore": 41,
    "dps": 25.62,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 8
  },
  {
    "name": "Morpeko Full Belly",
    "pokedexId": 877,
    "slug": "morpeko-full-belly",
    "types": [
      "Electric",
      "Dark"
    ],
    "attack": 192,
    "defense": 121,
    "stamina": 151,
    "maxCp": 2196,
    "maxCp40": 1942,
    "cpRaid100": 1110,
    "cpWeather100": 1387,
    "cpResearch100": 832,
    "pveScore": 32,
    "dps": 21.97,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 8
  },
  {
    "name": "Cufant",
    "pokedexId": 878,
    "slug": "cufant",
    "types": [
      "Steel"
    ],
    "attack": 140,
    "defense": 91,
    "stamina": 176,
    "maxCp": 1557,
    "maxCp40": 1377,
    "cpRaid100": 787,
    "cpWeather100": 983,
    "cpResearch100": 590,
    "pveScore": 22,
    "dps": 15.43,
    "bestFastMove": {
      "name": "Metal Claw",
      "type": "Steel"
    },
    "bestChargedMove": {
      "name": "Iron Head",
      "type": "Steel"
    },
    "generation": 8
  },
  {
    "name": "Copperajah",
    "pokedexId": 879,
    "slug": "copperajah",
    "types": [
      "Steel"
    ],
    "attack": 225,
    "defense": 126,
    "stamina": 263,
    "maxCp": 3355,
    "maxCp40": 2967,
    "cpRaid100": 1695,
    "cpWeather100": 2119,
    "cpResearch100": 1271,
    "pveScore": 42,
    "dps": 24.8,
    "bestFastMove": {
      "name": "Metal Claw",
      "type": "Steel"
    },
    "bestChargedMove": {
      "name": "Iron Head",
      "type": "Steel"
    },
    "generation": 8
  },
  {
    "name": "Dracozolt",
    "pokedexId": 880,
    "slug": "dracozolt",
    "types": [
      "Electric",
      "Dragon"
    ],
    "attack": 195,
    "defense": 165,
    "stamina": 207,
    "maxCp": 2964,
    "maxCp40": 2621,
    "cpRaid100": 1498,
    "cpWeather100": 1872,
    "cpResearch100": 1123,
    "pveScore": 38,
    "dps": 22.31,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 8
  },
  {
    "name": "Arctozolt",
    "pokedexId": 881,
    "slug": "arctozolt",
    "types": [
      "Electric",
      "Ice"
    ],
    "attack": 190,
    "defense": 166,
    "stamina": 207,
    "maxCp": 2901,
    "maxCp40": 2566,
    "cpRaid100": 1466,
    "cpWeather100": 1833,
    "cpResearch100": 1100,
    "pveScore": 37,
    "dps": 21.74,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 8
  },
  {
    "name": "Dracovish",
    "pokedexId": 882,
    "slug": "dracovish",
    "types": [
      "Water",
      "Dragon"
    ],
    "attack": 175,
    "defense": 185,
    "stamina": 207,
    "maxCp": 2826,
    "maxCp40": 2500,
    "cpRaid100": 1428,
    "cpWeather100": 1786,
    "cpResearch100": 1071,
    "pveScore": 35,
    "dps": 20.02,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 8
  },
  {
    "name": "Arctovish",
    "pokedexId": 883,
    "slug": "arctovish",
    "types": [
      "Water",
      "Ice"
    ],
    "attack": 170,
    "defense": 185,
    "stamina": 207,
    "maxCp": 2752,
    "maxCp40": 2434,
    "cpRaid100": 1391,
    "cpWeather100": 1739,
    "cpResearch100": 1043,
    "pveScore": 34,
    "dps": 19.45,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 8
  },
  {
    "name": "Duraludon",
    "pokedexId": 884,
    "slug": "duraludon",
    "types": [
      "Steel",
      "Dragon"
    ],
    "attack": 238,
    "defense": 185,
    "stamina": 172,
    "maxCp": 3454,
    "maxCp40": 3055,
    "cpRaid100": 1746,
    "cpWeather100": 2182,
    "cpResearch100": 1309,
    "pveScore": 44,
    "dps": 26.23,
    "bestFastMove": {
      "name": "Metal Claw",
      "type": "Steel"
    },
    "bestChargedMove": {
      "name": "Iron Head",
      "type": "Steel"
    },
    "generation": 8
  },
  {
    "name": "Dreepy",
    "pokedexId": 885,
    "slug": "dreepy",
    "types": [
      "Dragon",
      "Ghost"
    ],
    "attack": 117,
    "defense": 61,
    "stamina": 99,
    "maxCp": 867,
    "maxCp40": 767,
    "cpRaid100": 438,
    "cpWeather100": 548,
    "cpResearch100": 328,
    "pveScore": 17,
    "dps": 14.86,
    "bestFastMove": {
      "name": "Dragon Tail",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Outrage",
      "type": "Dragon"
    },
    "generation": 8
  },
  {
    "name": "Drakloak",
    "pokedexId": 886,
    "slug": "drakloak",
    "types": [
      "Dragon",
      "Ghost"
    ],
    "attack": 163,
    "defense": 105,
    "stamina": 169,
    "maxCp": 1867,
    "maxCp40": 1651,
    "cpRaid100": 943,
    "cpWeather100": 1180,
    "cpResearch100": 708,
    "pveScore": 30,
    "dps": 20.7,
    "bestFastMove": {
      "name": "Dragon Tail",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Outrage",
      "type": "Dragon"
    },
    "generation": 8
  },
  {
    "name": "Dragapult",
    "pokedexId": 887,
    "slug": "dragapult",
    "types": [
      "Dragon",
      "Ghost"
    ],
    "attack": 266,
    "defense": 170,
    "stamina": 204,
    "maxCp": 3993,
    "maxCp40": 3532,
    "cpRaid100": 2018,
    "cpWeather100": 2523,
    "cpResearch100": 1514,
    "pveScore": 58,
    "dps": 33.78,
    "bestFastMove": {
      "name": "Dragon Tail",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Outrage",
      "type": "Dragon"
    },
    "generation": 8
  },
  {
    "name": "Zacian",
    "pokedexId": 888,
    "slug": "zacian",
    "types": [
      "Fairy"
    ],
    "attack": 236,
    "defense": 236,
    "stamina": 192,
    "maxCp": 4039,
    "maxCp40": 3573,
    "cpRaid100": 2041,
    "cpWeather100": 2552,
    "cpResearch100": 1531,
    "pveScore": 49,
    "dps": 26.53,
    "bestFastMove": {
      "name": "Metal Claw",
      "type": "Steel"
    },
    "bestChargedMove": {
      "name": "Play Rough",
      "type": "Fairy"
    },
    "generation": 8
  },
  {
    "name": "Zamazenta",
    "pokedexId": 889,
    "slug": "zamazenta",
    "types": [
      "Fighting"
    ],
    "attack": 236,
    "defense": 236,
    "stamina": 192,
    "maxCp": 4039,
    "maxCp40": 3573,
    "cpRaid100": 2041,
    "cpWeather100": 2552,
    "cpResearch100": 1531,
    "pveScore": 45,
    "dps": 24.58,
    "bestFastMove": {
      "name": "Metal Claw",
      "type": "Steel"
    },
    "bestChargedMove": {
      "name": "Close Combat",
      "type": "Fighting"
    },
    "generation": 8
  },
  {
    "name": "Eternatus",
    "pokedexId": 890,
    "slug": "eternatus",
    "types": [
      "Poison",
      "Dragon"
    ],
    "attack": 278,
    "defense": 192,
    "stamina": 268,
    "maxCp": 5007,
    "maxCp40": 4429,
    "cpRaid100": 2530,
    "cpWeather100": 3163,
    "cpResearch100": 1898,
    "pveScore": 65,
    "dps": 34.08,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "generation": 8
  },
  {
    "name": "Kubfu",
    "pokedexId": 891,
    "slug": "kubfu",
    "types": [
      "Fighting"
    ],
    "attack": 170,
    "defense": 112,
    "stamina": 155,
    "maxCp": 1919,
    "maxCp40": 1697,
    "cpRaid100": 970,
    "cpWeather100": 1212,
    "cpResearch100": 727,
    "pveScore": 32,
    "dps": 21.91,
    "bestFastMove": {
      "name": "Counter",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Dynamic Punch",
      "type": "Fighting"
    },
    "generation": 8
  },
  {
    "name": "Urshifu Single Strike",
    "pokedexId": 892,
    "slug": "urshifu-single-strike",
    "types": [
      "Fighting",
      "Dark"
    ],
    "attack": 254,
    "defense": 177,
    "stamina": 225,
    "maxCp": 4077,
    "maxCp40": 3606,
    "cpRaid100": 2060,
    "cpWeather100": 2576,
    "cpResearch100": 1545,
    "pveScore": 59,
    "dps": 32.74,
    "bestFastMove": {
      "name": "Counter",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Dynamic Punch",
      "type": "Fighting"
    },
    "generation": 8
  },
  {
    "name": "Zarude",
    "pokedexId": 893,
    "slug": "zarude",
    "types": [
      "Dark",
      "Grass"
    ],
    "attack": 241,
    "defense": 215,
    "stamina": 233,
    "maxCp": 4317,
    "maxCp40": 3818,
    "cpRaid100": 2182,
    "cpWeather100": 2727,
    "cpResearch100": 1636,
    "pveScore": 53,
    "dps": 27.79,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "generation": 8
  },
  {
    "name": "Regieleki",
    "pokedexId": 894,
    "slug": "regieleki",
    "types": [
      "Electric"
    ],
    "attack": 250,
    "defense": 125,
    "stamina": 190,
    "maxCp": 3169,
    "maxCp40": 2803,
    "cpRaid100": 1602,
    "cpWeather100": 2002,
    "cpResearch100": 1201,
    "pveScore": 45,
    "dps": 28.61,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 8
  },
  {
    "name": "Regidrago",
    "pokedexId": 895,
    "slug": "regidrago",
    "types": [
      "Dragon"
    ],
    "attack": 202,
    "defense": 101,
    "stamina": 400,
    "maxCp": 3361,
    "maxCp40": 2973,
    "cpRaid100": 1699,
    "cpWeather100": 2124,
    "cpResearch100": 1274,
    "pveScore": 46,
    "dps": 25.65,
    "bestFastMove": {
      "name": "Dragon Tail",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Outrage",
      "type": "Dragon"
    },
    "generation": 8
  },
  {
    "name": "Glastrier",
    "pokedexId": 896,
    "slug": "glastrier",
    "types": [
      "Ice"
    ],
    "attack": 246,
    "defense": 223,
    "stamina": 225,
    "maxCp": 4404,
    "maxCp40": 3895,
    "cpRaid100": 2226,
    "cpWeather100": 2782,
    "cpResearch100": 1669,
    "pveScore": 53,
    "dps": 27.9,
    "bestFastMove": {
      "name": "Powder Snow",
      "type": "Ice"
    },
    "bestChargedMove": {
      "name": "Avalanche",
      "type": "Ice"
    },
    "generation": 8
  },
  {
    "name": "Spectrier",
    "pokedexId": 897,
    "slug": "spectrier",
    "types": [
      "Ghost"
    ],
    "attack": 273,
    "defense": 147,
    "stamina": 204,
    "maxCp": 3830,
    "maxCp40": 3388,
    "cpRaid100": 1935,
    "cpWeather100": 2420,
    "cpResearch100": 1452,
    "pveScore": 59,
    "dps": 35.42,
    "bestFastMove": {
      "name": "Shadow Claw",
      "type": "Ghost"
    },
    "bestChargedMove": {
      "name": "Shadow Ball",
      "type": "Ghost"
    },
    "generation": 8
  },
  {
    "name": "Calyrex",
    "pokedexId": 898,
    "slug": "calyrex",
    "types": [
      "Psychic",
      "Grass"
    ],
    "attack": 162,
    "defense": 162,
    "stamina": 225,
    "maxCp": 2575,
    "maxCp40": 2278,
    "cpRaid100": 1301,
    "cpWeather100": 1627,
    "cpResearch100": 976,
    "pveScore": 35,
    "dps": 19.96,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 8
  },
  {
    "name": "Wyrdeer",
    "pokedexId": 899,
    "slug": "wyrdeer",
    "types": [
      "Normal",
      "Psychic"
    ],
    "attack": 206,
    "defense": 145,
    "stamina": 230,
    "maxCp": 3089,
    "maxCp40": 2732,
    "cpRaid100": 1561,
    "cpWeather100": 1952,
    "cpResearch100": 1171,
    "pveScore": 43,
    "dps": 24.88,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 8
  },
  {
    "name": "Kleavor",
    "pokedexId": 900,
    "slug": "kleavor",
    "types": [
      "Bug",
      "Rock"
    ],
    "attack": 252,
    "defense": 175,
    "stamina": 172,
    "maxCp": 3553,
    "maxCp40": 3143,
    "cpRaid100": 1796,
    "cpWeather100": 2245,
    "cpResearch100": 1347,
    "pveScore": 46,
    "dps": 27.39,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 8
  },
  {
    "name": "Ursaluna",
    "pokedexId": 901,
    "slug": "ursaluna",
    "types": [
      "Ground",
      "Normal"
    ],
    "attack": 243,
    "defense": 182,
    "stamina": 277,
    "maxCp": 4369,
    "maxCp40": 3864,
    "cpRaid100": 2208,
    "cpWeather100": 2760,
    "cpResearch100": 1656,
    "pveScore": 57,
    "dps": 30.2,
    "bestFastMove": {
      "name": "Mud-Slap",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Earthquake",
      "type": "Ground"
    },
    "generation": 8
  },
  {
    "name": "Basculegion Male",
    "pokedexId": 902,
    "slug": "basculegion-male",
    "types": [
      "Water",
      "Ghost"
    ],
    "attack": 217,
    "defense": 143,
    "stamina": 260,
    "maxCp": 3414,
    "maxCp40": 3020,
    "cpRaid100": 1725,
    "cpWeather100": 2157,
    "cpResearch100": 1294,
    "pveScore": 44,
    "dps": 24.83,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 8
  },
  {
    "name": "Sneasler",
    "pokedexId": 903,
    "slug": "sneasler",
    "types": [
      "Fighting",
      "Poison"
    ],
    "attack": 259,
    "defense": 158,
    "stamina": 190,
    "maxCp": 3643,
    "maxCp40": 3222,
    "cpRaid100": 1841,
    "cpWeather100": 2302,
    "cpResearch100": 1381,
    "pveScore": 56,
    "dps": 33.38,
    "bestFastMove": {
      "name": "Counter",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Dynamic Punch",
      "type": "Fighting"
    },
    "generation": 8
  },
  {
    "name": "Overqwil",
    "pokedexId": 904,
    "slug": "overqwil",
    "types": [
      "Dark",
      "Poison"
    ],
    "attack": 222,
    "defense": 171,
    "stamina": 198,
    "maxCp": 3330,
    "maxCp40": 2946,
    "cpRaid100": 1683,
    "cpWeather100": 2104,
    "cpResearch100": 1262,
    "pveScore": 44,
    "dps": 25.6,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "generation": 8
  },
  {
    "name": "Enamorus Incarnate",
    "pokedexId": 905,
    "slug": "enamorus-incarnate",
    "types": [
      "Fairy",
      "Flying"
    ],
    "attack": 281,
    "defense": 162,
    "stamina": 179,
    "maxCp": 3873,
    "maxCp40": 3425,
    "cpRaid100": 1957,
    "cpWeather100": 2447,
    "cpResearch100": 1468,
    "pveScore": 56,
    "dps": 34.06,
    "bestFastMove": {
      "name": "Charm",
      "type": "Fairy"
    },
    "bestChargedMove": {
      "name": "Dazzling Gleam",
      "type": "Fairy"
    },
    "generation": 8
  },
  {
    "name": "Sprigatito",
    "pokedexId": 906,
    "slug": "sprigatito",
    "types": [
      "Grass"
    ],
    "attack": 116,
    "defense": 99,
    "stamina": 120,
    "maxCp": 1147,
    "maxCp40": 1015,
    "cpRaid100": 579,
    "cpWeather100": 725,
    "cpResearch100": 435,
    "pveScore": 20,
    "dps": 14.79,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 9
  },
  {
    "name": "Floragato",
    "pokedexId": 907,
    "slug": "floragato",
    "types": [
      "Grass"
    ],
    "attack": 157,
    "defense": 128,
    "stamina": 156,
    "maxCp": 1899,
    "maxCp40": 1679,
    "cpRaid100": 959,
    "cpWeather100": 1199,
    "cpResearch100": 720,
    "pveScore": 30,
    "dps": 20.02,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 9
  },
  {
    "name": "Meowscarada",
    "pokedexId": 908,
    "slug": "meowscarada",
    "types": [
      "Grass",
      "Dark"
    ],
    "attack": 233,
    "defense": 153,
    "stamina": 183,
    "maxCp": 3193,
    "maxCp40": 2825,
    "cpRaid100": 1614,
    "cpWeather100": 2017,
    "cpResearch100": 1210,
    "pveScore": 49,
    "dps": 29.71,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 9
  },
  {
    "name": "Fuecoco",
    "pokedexId": 909,
    "slug": "fuecoco",
    "types": [
      "Fire"
    ],
    "attack": 112,
    "defense": 96,
    "stamina": 167,
    "maxCp": 1274,
    "maxCp40": 1127,
    "cpRaid100": 644,
    "cpWeather100": 805,
    "cpResearch100": 483,
    "pveScore": 21,
    "dps": 14.93,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 9
  },
  {
    "name": "Crocalor",
    "pokedexId": 910,
    "slug": "crocalor",
    "types": [
      "Fire"
    ],
    "attack": 162,
    "defense": 134,
    "stamina": 191,
    "maxCp": 2189,
    "maxCp40": 1936,
    "cpRaid100": 1106,
    "cpWeather100": 1383,
    "cpResearch100": 830,
    "pveScore": 35,
    "dps": 21.6,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 9
  },
  {
    "name": "Skeledirge",
    "pokedexId": 911,
    "slug": "skeledirge",
    "types": [
      "Fire",
      "Ghost"
    ],
    "attack": 207,
    "defense": 178,
    "stamina": 232,
    "maxCp": 3422,
    "maxCp40": 3027,
    "cpRaid100": 1729,
    "cpWeather100": 2162,
    "cpResearch100": 1297,
    "pveScore": 50,
    "dps": 27.6,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 9
  },
  {
    "name": "Quaxly",
    "pokedexId": 912,
    "slug": "quaxly",
    "types": [
      "Water"
    ],
    "attack": 120,
    "defense": 86,
    "stamina": 146,
    "maxCp": 1215,
    "maxCp40": 1075,
    "cpRaid100": 614,
    "cpWeather100": 768,
    "cpResearch100": 460,
    "pveScore": 18,
    "dps": 13.73,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 9
  },
  {
    "name": "Quaxwell",
    "pokedexId": 913,
    "slug": "quaxwell",
    "types": [
      "Water"
    ],
    "attack": 162,
    "defense": 124,
    "stamina": 172,
    "maxCp": 2014,
    "maxCp40": 1782,
    "cpRaid100": 1018,
    "cpWeather100": 1273,
    "cpResearch100": 763,
    "pveScore": 28,
    "dps": 18.54,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 9
  },
  {
    "name": "Quaquaval",
    "pokedexId": 914,
    "slug": "quaquaval",
    "types": [
      "Water",
      "Fighting"
    ],
    "attack": 236,
    "defense": 159,
    "stamina": 198,
    "maxCp": 3411,
    "maxCp40": 3018,
    "cpRaid100": 1724,
    "cpWeather100": 2155,
    "cpResearch100": 1293,
    "pveScore": 46,
    "dps": 27.0,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 9
  },
  {
    "name": "Lechonk",
    "pokedexId": 915,
    "slug": "lechonk",
    "types": [
      "Normal"
    ],
    "attack": 80,
    "defense": 79,
    "stamina": 144,
    "maxCp": 820,
    "maxCp40": 725,
    "cpRaid100": 414,
    "cpWeather100": 518,
    "cpResearch100": 310,
    "pveScore": 15,
    "dps": 9.66,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 9
  },
  {
    "name": "Oinkologne Male",
    "pokedexId": 916,
    "slug": "oinkologne-male",
    "types": [
      "Normal"
    ],
    "attack": 186,
    "defense": 153,
    "stamina": 242,
    "maxCp": 2949,
    "maxCp40": 2608,
    "cpRaid100": 1490,
    "cpWeather100": 1863,
    "cpResearch100": 1118,
    "pveScore": 39,
    "dps": 22.46,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 9
  },
  {
    "name": "Tarountula",
    "pokedexId": 917,
    "slug": "tarountula",
    "types": [
      "Bug"
    ],
    "attack": 70,
    "defense": 77,
    "stamina": 111,
    "maxCp": 646,
    "maxCp40": 571,
    "cpRaid100": 326,
    "cpWeather100": 408,
    "cpResearch100": 244,
    "pveScore": 15,
    "dps": 7.61,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 9
  },
  {
    "name": "Spidops",
    "pokedexId": 918,
    "slug": "spidops",
    "types": [
      "Bug"
    ],
    "attack": 139,
    "defense": 165,
    "stamina": 155,
    "maxCp": 1902,
    "maxCp40": 1682,
    "cpRaid100": 961,
    "cpWeather100": 1201,
    "cpResearch100": 721,
    "pveScore": 24,
    "dps": 15.11,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 9
  },
  {
    "name": "Nymble",
    "pokedexId": 919,
    "slug": "nymble",
    "types": [
      "Bug"
    ],
    "attack": 81,
    "defense": 65,
    "stamina": 107,
    "maxCp": 669,
    "maxCp40": 592,
    "cpRaid100": 338,
    "cpWeather100": 423,
    "cpResearch100": 253,
    "pveScore": 15,
    "dps": 8.8,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 9
  },
  {
    "name": "Lokix",
    "pokedexId": 920,
    "slug": "lokix",
    "types": [
      "Bug",
      "Dark"
    ],
    "attack": 198,
    "defense": 143,
    "stamina": 174,
    "maxCp": 2599,
    "maxCp40": 2298,
    "cpRaid100": 1313,
    "cpWeather100": 1642,
    "cpResearch100": 985,
    "pveScore": 34,
    "dps": 21.52,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 9
  },
  {
    "name": "Pawmi",
    "pokedexId": 921,
    "slug": "pawmi",
    "types": [
      "Electric"
    ],
    "attack": 95,
    "defense": 45,
    "stamina": 128,
    "maxCp": 719,
    "maxCp40": 636,
    "cpRaid100": 363,
    "cpWeather100": 454,
    "cpResearch100": 272,
    "pveScore": 15,
    "dps": 10.87,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 9
  },
  {
    "name": "Pawmo",
    "pokedexId": 922,
    "slug": "pawmo",
    "types": [
      "Electric",
      "Fighting"
    ],
    "attack": 147,
    "defense": 82,
    "stamina": 155,
    "maxCp": 1468,
    "maxCp40": 1299,
    "cpRaid100": 742,
    "cpWeather100": 928,
    "cpResearch100": 556,
    "pveScore": 23,
    "dps": 16.82,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 9
  },
  {
    "name": "Pawmot",
    "pokedexId": 923,
    "slug": "pawmot",
    "types": [
      "Electric",
      "Fighting"
    ],
    "attack": 232,
    "defense": 140,
    "stamina": 172,
    "maxCp": 2969,
    "maxCp40": 2626,
    "cpRaid100": 1500,
    "cpWeather100": 1876,
    "cpResearch100": 1125,
    "pveScore": 42,
    "dps": 26.55,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 9
  },
  {
    "name": "Tandemaus",
    "pokedexId": 924,
    "slug": "tandemaus",
    "types": [
      "Normal"
    ],
    "attack": 98,
    "defense": 90,
    "stamina": 137,
    "maxCp": 1008,
    "maxCp40": 891,
    "cpRaid100": 509,
    "cpWeather100": 636,
    "cpResearch100": 382,
    "pveScore": 16,
    "dps": 11.84,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 9
  },
  {
    "name": "Maushold Family Of Four",
    "pokedexId": 925,
    "slug": "maushold-family-of-four",
    "types": [
      "Normal"
    ],
    "attack": 158,
    "defense": 157,
    "stamina": 179,
    "maxCp": 2231,
    "maxCp40": 1973,
    "cpRaid100": 1127,
    "cpWeather100": 1409,
    "cpResearch100": 845,
    "pveScore": 31,
    "dps": 19.08,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 9
  },
  {
    "name": "Fidough",
    "pokedexId": 926,
    "slug": "fidough",
    "types": [
      "Fairy"
    ],
    "attack": 102,
    "defense": 126,
    "stamina": 114,
    "maxCp": 1114,
    "maxCp40": 985,
    "cpRaid100": 563,
    "cpWeather100": 703,
    "cpResearch100": 422,
    "pveScore": 17,
    "dps": 12.36,
    "bestFastMove": {
      "name": "Charm",
      "type": "Fairy"
    },
    "bestChargedMove": {
      "name": "Dazzling Gleam",
      "type": "Fairy"
    },
    "generation": 9
  },
  {
    "name": "Dachsbun",
    "pokedexId": 927,
    "slug": "dachsbun",
    "types": [
      "Fairy"
    ],
    "attack": 159,
    "defense": 212,
    "stamina": 149,
    "maxCp": 2370,
    "maxCp40": 2096,
    "cpRaid100": 1198,
    "cpWeather100": 1497,
    "cpResearch100": 898,
    "pveScore": 33,
    "dps": 19.27,
    "bestFastMove": {
      "name": "Charm",
      "type": "Fairy"
    },
    "bestChargedMove": {
      "name": "Dazzling Gleam",
      "type": "Fairy"
    },
    "generation": 9
  },
  {
    "name": "Smoliv",
    "pokedexId": 928,
    "slug": "smoliv",
    "types": [
      "Grass",
      "Normal"
    ],
    "attack": 100,
    "defense": 89,
    "stamina": 121,
    "maxCp": 965,
    "maxCp40": 854,
    "cpRaid100": 488,
    "cpWeather100": 610,
    "cpResearch100": 366,
    "pveScore": 16,
    "dps": 12.75,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 9
  },
  {
    "name": "Dolliv",
    "pokedexId": 929,
    "slug": "dolliv",
    "types": [
      "Grass",
      "Normal"
    ],
    "attack": 137,
    "defense": 131,
    "stamina": 141,
    "maxCp": 1619,
    "maxCp40": 1432,
    "cpRaid100": 818,
    "cpWeather100": 1023,
    "cpResearch100": 614,
    "pveScore": 26,
    "dps": 17.47,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 9
  },
  {
    "name": "Arboliva",
    "pokedexId": 930,
    "slug": "arboliva",
    "types": [
      "Grass",
      "Normal"
    ],
    "attack": 219,
    "defense": 189,
    "stamina": 186,
    "maxCp": 3345,
    "maxCp40": 2959,
    "cpRaid100": 1691,
    "cpWeather100": 2113,
    "cpResearch100": 1268,
    "pveScore": 48,
    "dps": 27.92,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 9
  },
  {
    "name": "Squawkabilly Green Plumage",
    "pokedexId": 931,
    "slug": "squawkabilly-green-plumage",
    "types": [
      "Normal",
      "Flying"
    ],
    "attack": 185,
    "defense": 105,
    "stamina": 193,
    "maxCp": 2231,
    "maxCp40": 1973,
    "cpRaid100": 1127,
    "cpWeather100": 1409,
    "cpResearch100": 845,
    "pveScore": 34,
    "dps": 22.34,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 9
  },
  {
    "name": "Nacli",
    "pokedexId": 932,
    "slug": "nacli",
    "types": [
      "Rock"
    ],
    "attack": 94,
    "defense": 108,
    "stamina": 146,
    "maxCp": 1083,
    "maxCp40": 958,
    "cpRaid100": 547,
    "cpWeather100": 684,
    "cpResearch100": 410,
    "pveScore": 15,
    "dps": 10.84,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 9
  },
  {
    "name": "Naclstack",
    "pokedexId": 933,
    "slug": "naclstack",
    "types": [
      "Rock"
    ],
    "attack": 105,
    "defense": 160,
    "stamina": 155,
    "maxCp": 1461,
    "maxCp40": 1292,
    "cpRaid100": 738,
    "cpWeather100": 923,
    "cpResearch100": 554,
    "pveScore": 19,
    "dps": 12.11,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 9
  },
  {
    "name": "Garganacl",
    "pokedexId": 934,
    "slug": "garganacl",
    "types": [
      "Rock"
    ],
    "attack": 171,
    "defense": 212,
    "stamina": 225,
    "maxCp": 3065,
    "maxCp40": 2711,
    "cpRaid100": 1549,
    "cpWeather100": 1936,
    "cpResearch100": 1162,
    "pveScore": 37,
    "dps": 19.72,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 9
  },
  {
    "name": "Charcadet",
    "pokedexId": 935,
    "slug": "charcadet",
    "types": [
      "Fire"
    ],
    "attack": 92,
    "defense": 74,
    "stamina": 120,
    "maxCp": 828,
    "maxCp40": 732,
    "cpRaid100": 418,
    "cpWeather100": 523,
    "cpResearch100": 313,
    "pveScore": 15,
    "dps": 12.27,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 9
  },
  {
    "name": "Armarouge",
    "pokedexId": 936,
    "slug": "armarouge",
    "types": [
      "Fire",
      "Psychic"
    ],
    "attack": 234,
    "defense": 185,
    "stamina": 198,
    "maxCp": 3628,
    "maxCp40": 3209,
    "cpRaid100": 1834,
    "cpWeather100": 2292,
    "cpResearch100": 1375,
    "pveScore": 55,
    "dps": 31.2,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 9
  },
  {
    "name": "Ceruledge",
    "pokedexId": 937,
    "slug": "ceruledge",
    "types": [
      "Fire",
      "Ghost"
    ],
    "attack": 238,
    "defense": 189,
    "stamina": 181,
    "maxCp": 3572,
    "maxCp40": 3159,
    "cpRaid100": 1805,
    "cpWeather100": 2256,
    "cpResearch100": 1354,
    "pveScore": 55,
    "dps": 31.73,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 9
  },
  {
    "name": "Tadbulb",
    "pokedexId": 938,
    "slug": "tadbulb",
    "types": [
      "Electric"
    ],
    "attack": 104,
    "defense": 73,
    "stamina": 156,
    "maxCp": 1030,
    "maxCp40": 911,
    "cpRaid100": 520,
    "cpWeather100": 651,
    "cpResearch100": 390,
    "pveScore": 16,
    "dps": 11.9,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 9
  },
  {
    "name": "Bellibolt",
    "pokedexId": 939,
    "slug": "bellibolt",
    "types": [
      "Electric"
    ],
    "attack": 184,
    "defense": 165,
    "stamina": 240,
    "maxCp": 3010,
    "maxCp40": 2662,
    "cpRaid100": 1521,
    "cpWeather100": 1902,
    "cpResearch100": 1141,
    "pveScore": 38,
    "dps": 21.05,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 9
  },
  {
    "name": "Wattrel",
    "pokedexId": 940,
    "slug": "wattrel",
    "types": [
      "Electric",
      "Flying"
    ],
    "attack": 105,
    "defense": 75,
    "stamina": 120,
    "maxCp": 933,
    "maxCp40": 826,
    "cpRaid100": 472,
    "cpWeather100": 590,
    "cpResearch100": 354,
    "pveScore": 15,
    "dps": 12.01,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 9
  },
  {
    "name": "Kilowattrel",
    "pokedexId": 941,
    "slug": "kilowattrel",
    "types": [
      "Electric",
      "Flying"
    ],
    "attack": 221,
    "defense": 132,
    "stamina": 172,
    "maxCp": 2762,
    "maxCp40": 2443,
    "cpRaid100": 1396,
    "cpWeather100": 1745,
    "cpResearch100": 1047,
    "pveScore": 39,
    "dps": 25.29,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 9
  },
  {
    "name": "Maschiff",
    "pokedexId": 942,
    "slug": "maschiff",
    "types": [
      "Dark"
    ],
    "attack": 139,
    "defense": 108,
    "stamina": 155,
    "maxCp": 1572,
    "maxCp40": 1390,
    "cpRaid100": 794,
    "cpWeather100": 993,
    "cpResearch100": 596,
    "pveScore": 23,
    "dps": 16.03,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "generation": 9
  },
  {
    "name": "Mabosstiff",
    "pokedexId": 943,
    "slug": "mabosstiff",
    "types": [
      "Dark"
    ],
    "attack": 230,
    "defense": 168,
    "stamina": 190,
    "maxCp": 3350,
    "maxCp40": 2963,
    "cpRaid100": 1693,
    "cpWeather100": 2117,
    "cpResearch100": 1270,
    "pveScore": 45,
    "dps": 26.52,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "generation": 9
  },
  {
    "name": "Shroodle",
    "pokedexId": 944,
    "slug": "shroodle",
    "types": [
      "Poison",
      "Normal"
    ],
    "attack": 124,
    "defense": 70,
    "stamina": 120,
    "maxCp": 1051,
    "maxCp40": 929,
    "cpRaid100": 531,
    "cpWeather100": 664,
    "cpResearch100": 398,
    "pveScore": 18,
    "dps": 15.2,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "generation": 9
  },
  {
    "name": "Grafaiai",
    "pokedexId": 945,
    "slug": "grafaiai",
    "types": [
      "Poison",
      "Normal"
    ],
    "attack": 199,
    "defense": 148,
    "stamina": 160,
    "maxCp": 2552,
    "maxCp40": 2257,
    "cpRaid100": 1289,
    "cpWeather100": 1612,
    "cpResearch100": 967,
    "pveScore": 38,
    "dps": 24.4,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "generation": 9
  },
  {
    "name": "Bramblin",
    "pokedexId": 946,
    "slug": "bramblin",
    "types": [
      "Grass",
      "Ghost"
    ],
    "attack": 121,
    "defense": 64,
    "stamina": 120,
    "maxCp": 991,
    "maxCp40": 877,
    "cpRaid100": 501,
    "cpWeather100": 626,
    "cpResearch100": 375,
    "pveScore": 18,
    "dps": 15.43,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 9
  },
  {
    "name": "Brambleghast",
    "pokedexId": 947,
    "slug": "brambleghast",
    "types": [
      "Grass",
      "Ghost"
    ],
    "attack": 228,
    "defense": 144,
    "stamina": 146,
    "maxCp": 2745,
    "maxCp40": 2428,
    "cpRaid100": 1387,
    "cpWeather100": 1734,
    "cpResearch100": 1040,
    "pveScore": 44,
    "dps": 29.07,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 9
  },
  {
    "name": "Toedscool",
    "pokedexId": 948,
    "slug": "toedscool",
    "types": [
      "Ground",
      "Grass"
    ],
    "attack": 97,
    "defense": 150,
    "stamina": 120,
    "maxCp": 1180,
    "maxCp40": 1044,
    "cpRaid100": 596,
    "cpWeather100": 745,
    "cpResearch100": 447,
    "pveScore": 18,
    "dps": 12.06,
    "bestFastMove": {
      "name": "Mud-Slap",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Earthquake",
      "type": "Ground"
    },
    "generation": 9
  },
  {
    "name": "Toedscruel",
    "pokedexId": 949,
    "slug": "toedscruel",
    "types": [
      "Ground",
      "Grass"
    ],
    "attack": 165,
    "defense": 209,
    "stamina": 190,
    "maxCp": 2723,
    "maxCp40": 2409,
    "cpRaid100": 1376,
    "cpWeather100": 1720,
    "cpResearch100": 1032,
    "pveScore": 37,
    "dps": 20.51,
    "bestFastMove": {
      "name": "Mud-Slap",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Earthquake",
      "type": "Ground"
    },
    "generation": 9
  },
  {
    "name": "Klawf",
    "pokedexId": 950,
    "slug": "klawf",
    "types": [
      "Rock"
    ],
    "attack": 184,
    "defense": 185,
    "stamina": 172,
    "maxCp": 2717,
    "maxCp40": 2403,
    "cpRaid100": 1373,
    "cpWeather100": 1716,
    "cpResearch100": 1030,
    "pveScore": 36,
    "dps": 21.22,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 9
  },
  {
    "name": "Capsakid",
    "pokedexId": 951,
    "slug": "capsakid",
    "types": [
      "Grass"
    ],
    "attack": 118,
    "defense": 76,
    "stamina": 137,
    "maxCp": 1104,
    "maxCp40": 976,
    "cpRaid100": 558,
    "cpWeather100": 697,
    "cpResearch100": 418,
    "pveScore": 19,
    "dps": 15.04,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 9
  },
  {
    "name": "Scovillain",
    "pokedexId": 952,
    "slug": "scovillain",
    "types": [
      "Grass",
      "Fire"
    ],
    "attack": 216,
    "defense": 130,
    "stamina": 163,
    "maxCp": 2620,
    "maxCp40": 2317,
    "cpRaid100": 1324,
    "cpWeather100": 1655,
    "cpResearch100": 993,
    "pveScore": 42,
    "dps": 27.54,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 9
  },
  {
    "name": "Rellor",
    "pokedexId": 953,
    "slug": "rellor",
    "types": [
      "Bug"
    ],
    "attack": 87,
    "defense": 108,
    "stamina": 121,
    "maxCp": 931,
    "maxCp40": 823,
    "cpRaid100": 470,
    "cpWeather100": 588,
    "cpResearch100": 353,
    "pveScore": 15,
    "dps": 9.46,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 9
  },
  {
    "name": "Rabsca",
    "pokedexId": 954,
    "slug": "rabsca",
    "types": [
      "Bug",
      "Psychic"
    ],
    "attack": 201,
    "defense": 177,
    "stamina": 181,
    "maxCp": 2958,
    "maxCp40": 2617,
    "cpRaid100": 1495,
    "cpWeather100": 1869,
    "cpResearch100": 1121,
    "pveScore": 37,
    "dps": 21.85,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 9
  },
  {
    "name": "Flittle",
    "pokedexId": 955,
    "slug": "flittle",
    "types": [
      "Psychic"
    ],
    "attack": 105,
    "defense": 60,
    "stamina": 102,
    "maxCp": 793,
    "maxCp40": 702,
    "cpRaid100": 401,
    "cpWeather100": 501,
    "cpResearch100": 300,
    "pveScore": 15,
    "dps": 12.93,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 9
  },
  {
    "name": "Espathra",
    "pokedexId": 956,
    "slug": "espathra",
    "types": [
      "Psychic"
    ],
    "attack": 203,
    "defense": 127,
    "stamina": 216,
    "maxCp": 2787,
    "maxCp40": 2465,
    "cpRaid100": 1409,
    "cpWeather100": 1761,
    "cpResearch100": 1056,
    "pveScore": 41,
    "dps": 25.01,
    "bestFastMove": {
      "name": "Confusion",
      "type": "Psychic"
    },
    "bestChargedMove": {
      "name": "Psychic",
      "type": "Psychic"
    },
    "generation": 9
  },
  {
    "name": "Tinkatink",
    "pokedexId": 957,
    "slug": "tinkatink",
    "types": [
      "Fairy",
      "Steel"
    ],
    "attack": 85,
    "defense": 110,
    "stamina": 137,
    "maxCp": 973,
    "maxCp40": 860,
    "cpRaid100": 491,
    "cpWeather100": 614,
    "cpResearch100": 368,
    "pveScore": 15,
    "dps": 10.3,
    "bestFastMove": {
      "name": "Charm",
      "type": "Fairy"
    },
    "bestChargedMove": {
      "name": "Dazzling Gleam",
      "type": "Fairy"
    },
    "generation": 9
  },
  {
    "name": "Tinkatuff",
    "pokedexId": 958,
    "slug": "tinkatuff",
    "types": [
      "Fairy",
      "Steel"
    ],
    "attack": 108,
    "defense": 145,
    "stamina": 163,
    "maxCp": 1465,
    "maxCp40": 1296,
    "cpRaid100": 740,
    "cpWeather100": 926,
    "cpResearch100": 555,
    "pveScore": 21,
    "dps": 13.09,
    "bestFastMove": {
      "name": "Charm",
      "type": "Fairy"
    },
    "bestChargedMove": {
      "name": "Dazzling Gleam",
      "type": "Fairy"
    },
    "generation": 9
  },
  {
    "name": "Tinkaton",
    "pokedexId": 959,
    "slug": "tinkaton",
    "types": [
      "Fairy",
      "Steel"
    ],
    "attack": 154,
    "defense": 196,
    "stamina": 198,
    "maxCp": 2529,
    "maxCp40": 2237,
    "cpRaid100": 1278,
    "cpWeather100": 1598,
    "cpResearch100": 959,
    "pveScore": 33,
    "dps": 18.67,
    "bestFastMove": {
      "name": "Charm",
      "type": "Fairy"
    },
    "bestChargedMove": {
      "name": "Dazzling Gleam",
      "type": "Fairy"
    },
    "generation": 9
  },
  {
    "name": "Wiglett",
    "pokedexId": 960,
    "slug": "wiglett",
    "types": [
      "Water"
    ],
    "attack": 109,
    "defense": 52,
    "stamina": 67,
    "maxCp": 648,
    "maxCp40": 574,
    "cpRaid100": 328,
    "cpWeather100": 410,
    "cpResearch100": 246,
    "pveScore": 15,
    "dps": 12.47,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 9
  },
  {
    "name": "Wugtrio",
    "pokedexId": 961,
    "slug": "wugtrio",
    "types": [
      "Water"
    ],
    "attack": 204,
    "defense": 136,
    "stamina": 111,
    "maxCp": 2132,
    "maxCp40": 1886,
    "cpRaid100": 1078,
    "cpWeather100": 1347,
    "cpResearch100": 808,
    "pveScore": 33,
    "dps": 23.34,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 9
  },
  {
    "name": "Bombirdier",
    "pokedexId": 962,
    "slug": "bombirdier",
    "types": [
      "Flying",
      "Dark"
    ],
    "attack": 198,
    "defense": 172,
    "stamina": 172,
    "maxCp": 2812,
    "maxCp40": 2487,
    "cpRaid100": 1421,
    "cpWeather100": 1777,
    "cpResearch100": 1066,
    "pveScore": 41,
    "dps": 24.75,
    "bestFastMove": {
      "name": "Air Slash",
      "type": "Flying"
    },
    "bestChargedMove": {
      "name": "Sky Attack",
      "type": "Flying"
    },
    "generation": 9
  },
  {
    "name": "Finizen",
    "pokedexId": 963,
    "slug": "finizen",
    "types": [
      "Water"
    ],
    "attack": 90,
    "defense": 80,
    "stamina": 172,
    "maxCp": 988,
    "maxCp40": 874,
    "cpRaid100": 499,
    "cpWeather100": 624,
    "cpResearch100": 374,
    "pveScore": 15,
    "dps": 10.3,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 9
  },
  {
    "name": "Palafin Zero",
    "pokedexId": 964,
    "slug": "palafin-zero",
    "types": [
      "Water"
    ],
    "attack": 143,
    "defense": 143,
    "stamina": 225,
    "maxCp": 2172,
    "maxCp40": 1921,
    "cpRaid100": 1098,
    "cpWeather100": 1372,
    "cpResearch100": 823,
    "pveScore": 28,
    "dps": 16.36,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 9
  },
  {
    "name": "Varoom",
    "pokedexId": 965,
    "slug": "varoom",
    "types": [
      "Steel",
      "Poison"
    ],
    "attack": 123,
    "defense": 106,
    "stamina": 128,
    "maxCp": 1281,
    "maxCp40": 1133,
    "cpRaid100": 647,
    "cpWeather100": 809,
    "cpResearch100": 485,
    "pveScore": 19,
    "dps": 13.56,
    "bestFastMove": {
      "name": "Metal Claw",
      "type": "Steel"
    },
    "bestChargedMove": {
      "name": "Iron Head",
      "type": "Steel"
    },
    "generation": 9
  },
  {
    "name": "Revavroom",
    "pokedexId": 966,
    "slug": "revavroom",
    "types": [
      "Steel",
      "Poison"
    ],
    "attack": 228,
    "defense": 168,
    "stamina": 190,
    "maxCp": 3323,
    "maxCp40": 2939,
    "cpRaid100": 1679,
    "cpWeather100": 2099,
    "cpResearch100": 1259,
    "pveScore": 43,
    "dps": 25.13,
    "bestFastMove": {
      "name": "Metal Claw",
      "type": "Steel"
    },
    "bestChargedMove": {
      "name": "Iron Head",
      "type": "Steel"
    },
    "generation": 9
  },
  {
    "name": "Cyclizar",
    "pokedexId": 967,
    "slug": "cyclizar",
    "types": [
      "Dragon",
      "Normal"
    ],
    "attack": 205,
    "defense": 142,
    "stamina": 172,
    "maxCp": 2661,
    "maxCp40": 2354,
    "cpRaid100": 1345,
    "cpWeather100": 1681,
    "cpResearch100": 1009,
    "pveScore": 41,
    "dps": 26.03,
    "bestFastMove": {
      "name": "Dragon Tail",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Outrage",
      "type": "Dragon"
    },
    "generation": 9
  },
  {
    "name": "Orthworm",
    "pokedexId": 968,
    "slug": "orthworm",
    "types": [
      "Steel"
    ],
    "attack": 160,
    "defense": 218,
    "stamina": 172,
    "maxCp": 2579,
    "maxCp40": 2281,
    "cpRaid100": 1303,
    "cpWeather100": 1629,
    "cpResearch100": 977,
    "pveScore": 31,
    "dps": 17.64,
    "bestFastMove": {
      "name": "Metal Claw",
      "type": "Steel"
    },
    "bestChargedMove": {
      "name": "Iron Head",
      "type": "Steel"
    },
    "generation": 9
  },
  {
    "name": "Glimmet",
    "pokedexId": 969,
    "slug": "glimmet",
    "types": [
      "Rock",
      "Poison"
    ],
    "attack": 187,
    "defense": 103,
    "stamina": 134,
    "maxCp": 1891,
    "maxCp40": 1672,
    "cpRaid100": 955,
    "cpWeather100": 1194,
    "cpResearch100": 717,
    "pveScore": 30,
    "dps": 21.56,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 9
  },
  {
    "name": "Glimmora",
    "pokedexId": 970,
    "slug": "glimmora",
    "types": [
      "Rock",
      "Poison"
    ],
    "attack": 247,
    "defense": 177,
    "stamina": 195,
    "maxCp": 3714,
    "maxCp40": 3285,
    "cpRaid100": 1877,
    "cpWeather100": 2347,
    "cpResearch100": 1408,
    "pveScore": 49,
    "dps": 28.48,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 9
  },
  {
    "name": "Greavard",
    "pokedexId": 971,
    "slug": "greavard",
    "types": [
      "Ghost"
    ],
    "attack": 105,
    "defense": 107,
    "stamina": 137,
    "maxCp": 1153,
    "maxCp40": 1020,
    "cpRaid100": 583,
    "cpWeather100": 729,
    "cpResearch100": 437,
    "pveScore": 19,
    "dps": 13.62,
    "bestFastMove": {
      "name": "Shadow Claw",
      "type": "Ghost"
    },
    "bestChargedMove": {
      "name": "Shadow Ball",
      "type": "Ghost"
    },
    "generation": 9
  },
  {
    "name": "Houndstone",
    "pokedexId": 972,
    "slug": "houndstone",
    "types": [
      "Ghost"
    ],
    "attack": 187,
    "defense": 195,
    "stamina": 176,
    "maxCp": 2856,
    "maxCp40": 2526,
    "cpRaid100": 1443,
    "cpWeather100": 1804,
    "cpResearch100": 1082,
    "pveScore": 42,
    "dps": 24.26,
    "bestFastMove": {
      "name": "Shadow Claw",
      "type": "Ghost"
    },
    "bestChargedMove": {
      "name": "Shadow Ball",
      "type": "Ghost"
    },
    "generation": 9
  },
  {
    "name": "Flamigo",
    "pokedexId": 973,
    "slug": "flamigo",
    "types": [
      "Flying",
      "Fighting"
    ],
    "attack": 227,
    "defense": 145,
    "stamina": 193,
    "maxCp": 3117,
    "maxCp40": 2757,
    "cpRaid100": 1575,
    "cpWeather100": 1969,
    "cpResearch100": 1181,
    "pveScore": 46,
    "dps": 28.38,
    "bestFastMove": {
      "name": "Air Slash",
      "type": "Flying"
    },
    "bestChargedMove": {
      "name": "Sky Attack",
      "type": "Flying"
    },
    "generation": 9
  },
  {
    "name": "Cetoddle",
    "pokedexId": 974,
    "slug": "cetoddle",
    "types": [
      "Ice"
    ],
    "attack": 118,
    "defense": 81,
    "stamina": 239,
    "maxCp": 1466,
    "maxCp40": 1297,
    "cpRaid100": 741,
    "cpWeather100": 926,
    "cpResearch100": 555,
    "pveScore": 20,
    "dps": 13.39,
    "bestFastMove": {
      "name": "Powder Snow",
      "type": "Ice"
    },
    "bestChargedMove": {
      "name": "Avalanche",
      "type": "Ice"
    },
    "generation": 9
  },
  {
    "name": "Cetitan",
    "pokedexId": 975,
    "slug": "cetitan",
    "types": [
      "Ice"
    ],
    "attack": 208,
    "defense": 122,
    "stamina": 347,
    "maxCp": 3506,
    "maxCp40": 3101,
    "cpRaid100": 1772,
    "cpWeather100": 2215,
    "cpResearch100": 1329,
    "pveScore": 43,
    "dps": 23.59,
    "bestFastMove": {
      "name": "Powder Snow",
      "type": "Ice"
    },
    "bestChargedMove": {
      "name": "Avalanche",
      "type": "Ice"
    },
    "generation": 9
  },
  {
    "name": "Veluza",
    "pokedexId": 976,
    "slug": "veluza",
    "types": [
      "Water",
      "Psychic"
    ],
    "attack": 196,
    "defense": 139,
    "stamina": 207,
    "maxCp": 2754,
    "maxCp40": 2436,
    "cpRaid100": 1392,
    "cpWeather100": 1740,
    "cpResearch100": 1044,
    "pveScore": 37,
    "dps": 22.43,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 9
  },
  {
    "name": "Dondozo",
    "pokedexId": 977,
    "slug": "dondozo",
    "types": [
      "Water"
    ],
    "attack": 176,
    "defense": 177,
    "stamina": 312,
    "maxCp": 3379,
    "maxCp40": 2989,
    "cpRaid100": 1708,
    "cpWeather100": 2135,
    "cpResearch100": 1281,
    "pveScore": 39,
    "dps": 20.14,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 9
  },
  {
    "name": "Tatsugiri Curly",
    "pokedexId": 978,
    "slug": "tatsugiri-curly",
    "types": [
      "Dragon",
      "Water"
    ],
    "attack": 226,
    "defense": 166,
    "stamina": 169,
    "maxCp": 3105,
    "maxCp40": 2746,
    "cpRaid100": 1569,
    "cpWeather100": 1962,
    "cpResearch100": 1177,
    "pveScore": 47,
    "dps": 28.7,
    "bestFastMove": {
      "name": "Dragon Tail",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Outrage",
      "type": "Dragon"
    },
    "generation": 9
  },
  {
    "name": "Annihilape",
    "pokedexId": 979,
    "slug": "annihilape",
    "types": [
      "Fighting",
      "Ghost"
    ],
    "attack": 220,
    "defense": 178,
    "stamina": 242,
    "maxCp": 3695,
    "maxCp40": 3268,
    "cpRaid100": 1867,
    "cpWeather100": 2334,
    "cpResearch100": 1401,
    "pveScore": 53,
    "dps": 29.02,
    "bestFastMove": {
      "name": "Counter",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Shadow Ball",
      "type": "Ghost"
    },
    "generation": 9
  },
  {
    "name": "Clodsire",
    "pokedexId": 980,
    "slug": "clodsire",
    "types": [
      "Poison",
      "Ground"
    ],
    "attack": 127,
    "defense": 151,
    "stamina": 277,
    "maxCp": 2207,
    "maxCp40": 1952,
    "cpRaid100": 1115,
    "cpWeather100": 1394,
    "cpResearch100": 836,
    "pveScore": 28,
    "dps": 15.57,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "generation": 9
  },
  {
    "name": "Farigiraf",
    "pokedexId": 981,
    "slug": "farigiraf",
    "types": [
      "Normal",
      "Psychic"
    ],
    "attack": 209,
    "defense": 136,
    "stamina": 260,
    "maxCp": 3223,
    "maxCp40": 2850,
    "cpRaid100": 1629,
    "cpWeather100": 2036,
    "cpResearch100": 1221,
    "pveScore": 44,
    "dps": 25.24,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 9
  },
  {
    "name": "Dudunsparce Two Segment",
    "pokedexId": 982,
    "slug": "dudunsparce-two-segment",
    "types": [
      "Normal"
    ],
    "attack": 188,
    "defense": 150,
    "stamina": 268,
    "maxCp": 3097,
    "maxCp40": 2739,
    "cpRaid100": 1565,
    "cpWeather100": 1957,
    "cpResearch100": 1174,
    "pveScore": 41,
    "dps": 22.71,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 9
  },
  {
    "name": "Kingambit",
    "pokedexId": 983,
    "slug": "kingambit",
    "types": [
      "Dark",
      "Steel"
    ],
    "attack": 239,
    "defense": 203,
    "stamina": 225,
    "maxCp": 4102,
    "maxCp40": 3628,
    "cpRaid100": 2073,
    "cpWeather100": 2591,
    "cpResearch100": 1555,
    "pveScore": 51,
    "dps": 27.56,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "generation": 9
  },
  {
    "name": "Great Tusk",
    "pokedexId": 984,
    "slug": "great-tusk",
    "types": [
      "Ground",
      "Fighting"
    ],
    "attack": 248,
    "defense": 208,
    "stamina": 251,
    "maxCp": 4522,
    "maxCp40": 4000,
    "cpRaid100": 2286,
    "cpWeather100": 2857,
    "cpResearch100": 1714,
    "pveScore": 59,
    "dps": 30.82,
    "bestFastMove": {
      "name": "Mud-Slap",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Earthquake",
      "type": "Ground"
    },
    "generation": 9
  },
  {
    "name": "Scream Tail",
    "pokedexId": 985,
    "slug": "scream-tail",
    "types": [
      "Fairy",
      "Psychic"
    ],
    "attack": 139,
    "defense": 234,
    "stamina": 251,
    "maxCp": 2798,
    "maxCp40": 2475,
    "cpRaid100": 1414,
    "cpWeather100": 1768,
    "cpResearch100": 1060,
    "pveScore": 33,
    "dps": 16.85,
    "bestFastMove": {
      "name": "Charm",
      "type": "Fairy"
    },
    "bestChargedMove": {
      "name": "Dazzling Gleam",
      "type": "Fairy"
    },
    "generation": 9
  },
  {
    "name": "Brute Bonnet",
    "pokedexId": 986,
    "slug": "brute-bonnet",
    "types": [
      "Grass",
      "Dark"
    ],
    "attack": 232,
    "defense": 190,
    "stamina": 244,
    "maxCp": 4018,
    "maxCp40": 3554,
    "cpRaid100": 2031,
    "cpWeather100": 2539,
    "cpResearch100": 1523,
    "pveScore": 55,
    "dps": 29.58,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 9
  },
  {
    "name": "Flutter Mane",
    "pokedexId": 987,
    "slug": "flutter-mane",
    "types": [
      "Ghost",
      "Fairy"
    ],
    "attack": 280,
    "defense": 235,
    "stamina": 146,
    "maxCp": 4179,
    "maxCp40": 3696,
    "cpRaid100": 2112,
    "cpWeather100": 2640,
    "cpResearch100": 1584,
    "pveScore": 63,
    "dps": 36.33,
    "bestFastMove": {
      "name": "Shadow Claw",
      "type": "Ghost"
    },
    "bestChargedMove": {
      "name": "Shadow Ball",
      "type": "Ghost"
    },
    "generation": 9
  },
  {
    "name": "Slither Wing",
    "pokedexId": 988,
    "slug": "slither-wing",
    "types": [
      "Bug",
      "Fighting"
    ],
    "attack": 261,
    "defense": 193,
    "stamina": 198,
    "maxCp": 4102,
    "maxCp40": 3628,
    "cpRaid100": 2073,
    "cpWeather100": 2591,
    "cpResearch100": 1555,
    "pveScore": 50,
    "dps": 28.37,
    "bestFastMove": {
      "name": "Bug Bite",
      "type": "Bug"
    },
    "bestChargedMove": {
      "name": "X-Scissor",
      "type": "Bug"
    },
    "generation": 9
  },
  {
    "name": "Sandy Shocks",
    "pokedexId": 989,
    "slug": "sandy-shocks",
    "types": [
      "Electric",
      "Ground"
    ],
    "attack": 244,
    "defense": 195,
    "stamina": 198,
    "maxCp": 3867,
    "maxCp40": 3421,
    "cpRaid100": 1954,
    "cpWeather100": 2443,
    "cpResearch100": 1466,
    "pveScore": 50,
    "dps": 27.92,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 9
  },
  {
    "name": "Iron Treads",
    "pokedexId": 990,
    "slug": "iron-treads",
    "types": [
      "Ground",
      "Steel"
    ],
    "attack": 227,
    "defense": 215,
    "stamina": 207,
    "maxCp": 3861,
    "maxCp40": 3415,
    "cpRaid100": 1951,
    "cpWeather100": 2439,
    "cpResearch100": 1463,
    "pveScore": 52,
    "dps": 28.21,
    "bestFastMove": {
      "name": "Mud-Slap",
      "type": "Ground"
    },
    "bestChargedMove": {
      "name": "Earthquake",
      "type": "Ground"
    },
    "generation": 9
  },
  {
    "name": "Iron Bundle",
    "pokedexId": 991,
    "slug": "iron-bundle",
    "types": [
      "Ice",
      "Water"
    ],
    "attack": 266,
    "defense": 210,
    "stamina": 148,
    "maxCp": 3799,
    "maxCp40": 3361,
    "cpRaid100": 1920,
    "cpWeather100": 2400,
    "cpResearch100": 1440,
    "pveScore": 51,
    "dps": 30.17,
    "bestFastMove": {
      "name": "Powder Snow",
      "type": "Ice"
    },
    "bestChargedMove": {
      "name": "Avalanche",
      "type": "Ice"
    },
    "generation": 9
  },
  {
    "name": "Iron Hands",
    "pokedexId": 992,
    "slug": "iron-hands",
    "types": [
      "Fighting",
      "Electric"
    ],
    "attack": 223,
    "defense": 161,
    "stamina": 290,
    "maxCp": 3893,
    "maxCp40": 3444,
    "cpRaid100": 1967,
    "cpWeather100": 2460,
    "cpResearch100": 1476,
    "pveScore": 53,
    "dps": 28.74,
    "bestFastMove": {
      "name": "Counter",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Dynamic Punch",
      "type": "Fighting"
    },
    "generation": 9
  },
  {
    "name": "Iron Jugulis",
    "pokedexId": 993,
    "slug": "iron-jugulis",
    "types": [
      "Dark",
      "Flying"
    ],
    "attack": 249,
    "defense": 179,
    "stamina": 214,
    "maxCp": 3929,
    "maxCp40": 3475,
    "cpRaid100": 1985,
    "cpWeather100": 2482,
    "cpResearch100": 1489,
    "pveScore": 51,
    "dps": 28.71,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "generation": 9
  },
  {
    "name": "Iron Moth",
    "pokedexId": 994,
    "slug": "iron-moth",
    "types": [
      "Fire",
      "Poison"
    ],
    "attack": 281,
    "defense": 195,
    "stamina": 190,
    "maxCp": 4336,
    "maxCp40": 3835,
    "cpRaid100": 2191,
    "cpWeather100": 2739,
    "cpResearch100": 1644,
    "pveScore": 66,
    "dps": 37.47,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 9
  },
  {
    "name": "Iron Thorns",
    "pokedexId": 995,
    "slug": "iron-thorns",
    "types": [
      "Rock",
      "Electric"
    ],
    "attack": 250,
    "defense": 199,
    "stamina": 225,
    "maxCp": 4240,
    "maxCp40": 3750,
    "cpRaid100": 2143,
    "cpWeather100": 2679,
    "cpResearch100": 1607,
    "pveScore": 53,
    "dps": 28.83,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 9
  },
  {
    "name": "Frigibax",
    "pokedexId": 996,
    "slug": "frigibax",
    "types": [
      "Dragon",
      "Ice"
    ],
    "attack": 134,
    "defense": 86,
    "stamina": 163,
    "maxCp": 1410,
    "maxCp40": 1247,
    "cpRaid100": 712,
    "cpWeather100": 891,
    "cpResearch100": 534,
    "pveScore": 23,
    "dps": 17.02,
    "bestFastMove": {
      "name": "Dragon Tail",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Outrage",
      "type": "Dragon"
    },
    "generation": 9
  },
  {
    "name": "Arctibax",
    "pokedexId": 997,
    "slug": "arctibax",
    "types": [
      "Dragon",
      "Ice"
    ],
    "attack": 173,
    "defense": 128,
    "stamina": 207,
    "maxCp": 2365,
    "maxCp40": 2092,
    "cpRaid100": 1195,
    "cpWeather100": 1494,
    "cpResearch100": 896,
    "pveScore": 35,
    "dps": 21.97,
    "bestFastMove": {
      "name": "Dragon Tail",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Outrage",
      "type": "Dragon"
    },
    "generation": 9
  },
  {
    "name": "Gimmighoul",
    "pokedexId": 999,
    "slug": "gimmighoul",
    "types": [
      "Ghost"
    ],
    "attack": 121,
    "defense": 122,
    "stamina": 128,
    "maxCp": 1344,
    "maxCp40": 1188,
    "cpRaid100": 679,
    "cpWeather100": 849,
    "cpResearch100": 509,
    "pveScore": 22,
    "dps": 15.7,
    "bestFastMove": {
      "name": "Shadow Claw",
      "type": "Ghost"
    },
    "bestChargedMove": {
      "name": "Shadow Ball",
      "type": "Ghost"
    },
    "generation": 9
  },
  {
    "name": "Gholdengo",
    "pokedexId": 1000,
    "slug": "gholdengo",
    "types": [
      "Steel",
      "Ghost"
    ],
    "attack": 252,
    "defense": 190,
    "stamina": 202,
    "maxCp": 3976,
    "maxCp40": 3517,
    "cpRaid100": 2009,
    "cpWeather100": 2512,
    "cpResearch100": 1507,
    "pveScore": 53,
    "dps": 30.15,
    "bestFastMove": {
      "name": "Hex",
      "type": "Ghost"
    },
    "bestChargedMove": {
      "name": "Shadow Ball",
      "type": "Ghost"
    },
    "generation": 9
  },
  {
    "name": "Wo Chien",
    "pokedexId": 1001,
    "slug": "wo-chien",
    "types": [
      "Dark",
      "Grass"
    ],
    "attack": 186,
    "defense": 241,
    "stamina": 198,
    "maxCp": 3314,
    "maxCp40": 2931,
    "cpRaid100": 1675,
    "cpWeather100": 2093,
    "cpResearch100": 1256,
    "pveScore": 40,
    "dps": 21.45,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "generation": 9
  },
  {
    "name": "Chien Pao",
    "pokedexId": 1002,
    "slug": "chien-pao",
    "types": [
      "Dark",
      "Ice"
    ],
    "attack": 260,
    "defense": 167,
    "stamina": 190,
    "maxCp": 3750,
    "maxCp40": 3317,
    "cpRaid100": 1895,
    "cpWeather100": 2369,
    "cpResearch100": 1421,
    "pveScore": 51,
    "dps": 29.98,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "generation": 9
  },
  {
    "name": "Ting Lu",
    "pokedexId": 1003,
    "slug": "ting-lu",
    "types": [
      "Dark",
      "Ground"
    ],
    "attack": 194,
    "defense": 203,
    "stamina": 321,
    "maxCp": 3994,
    "maxCp40": 3532,
    "cpRaid100": 2018,
    "cpWeather100": 2523,
    "cpResearch100": 1514,
    "pveScore": 45,
    "dps": 22.37,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "generation": 9
  },
  {
    "name": "Chi Yu",
    "pokedexId": 1004,
    "slug": "chi-yu",
    "types": [
      "Dark",
      "Fire"
    ],
    "attack": 269,
    "defense": 220,
    "stamina": 146,
    "maxCp": 3900,
    "maxCp40": 3450,
    "cpRaid100": 1971,
    "cpWeather100": 2464,
    "cpResearch100": 1478,
    "pveScore": 53,
    "dps": 31.02,
    "bestFastMove": {
      "name": "Snarl",
      "type": "Dark"
    },
    "bestChargedMove": {
      "name": "Dark Pulse",
      "type": "Dark"
    },
    "generation": 9
  },
  {
    "name": "Roaring Moon",
    "pokedexId": 1005,
    "slug": "roaring-moon",
    "types": [
      "Dragon",
      "Dark"
    ],
    "attack": 255,
    "defense": 177,
    "stamina": 212,
    "maxCp": 3980,
    "maxCp40": 3520,
    "cpRaid100": 2011,
    "cpWeather100": 2514,
    "cpResearch100": 1508,
    "pveScore": 57,
    "dps": 32.38,
    "bestFastMove": {
      "name": "Dragon Tail",
      "type": "Dragon"
    },
    "bestChargedMove": {
      "name": "Outrage",
      "type": "Dragon"
    },
    "generation": 9
  },
  {
    "name": "Iron Valiant",
    "pokedexId": 1006,
    "slug": "iron-valiant",
    "types": [
      "Fairy",
      "Fighting"
    ],
    "attack": 279,
    "defense": 170,
    "stamina": 179,
    "maxCp": 3932,
    "maxCp40": 3478,
    "cpRaid100": 1987,
    "cpWeather100": 2484,
    "cpResearch100": 1490,
    "pveScore": 57,
    "dps": 33.82,
    "bestFastMove": {
      "name": "Charm",
      "type": "Fairy"
    },
    "bestChargedMove": {
      "name": "Dazzling Gleam",
      "type": "Fairy"
    },
    "generation": 9
  },
  {
    "name": "Koraidon",
    "pokedexId": 1007,
    "slug": "koraidon",
    "types": [
      "Fighting",
      "Dragon"
    ],
    "attack": 262,
    "defense": 223,
    "stamina": 204,
    "maxCp": 4465,
    "maxCp40": 3949,
    "cpRaid100": 2256,
    "cpWeather100": 2821,
    "cpResearch100": 1692,
    "pveScore": 62,
    "dps": 33.77,
    "bestFastMove": {
      "name": "Counter",
      "type": "Fighting"
    },
    "bestChargedMove": {
      "name": "Dynamic Punch",
      "type": "Fighting"
    },
    "generation": 9
  },
  {
    "name": "Miraidon",
    "pokedexId": 1008,
    "slug": "miraidon",
    "types": [
      "Electric",
      "Dragon"
    ],
    "attack": 262,
    "defense": 223,
    "stamina": 204,
    "maxCp": 4465,
    "maxCp40": 3949,
    "cpRaid100": 2256,
    "cpWeather100": 2821,
    "cpResearch100": 1692,
    "pveScore": 55,
    "dps": 29.98,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 9
  },
  {
    "name": "Walking Wake",
    "pokedexId": 1009,
    "slug": "walking-wake",
    "types": [
      "Water",
      "Dragon"
    ],
    "attack": 256,
    "defense": 188,
    "stamina": 223,
    "maxCp": 4206,
    "maxCp40": 3720,
    "cpRaid100": 2125,
    "cpWeather100": 2657,
    "cpResearch100": 1594,
    "pveScore": 53,
    "dps": 29.29,
    "bestFastMove": {
      "name": "Water Gun",
      "type": "Water"
    },
    "bestChargedMove": {
      "name": "Surf",
      "type": "Water"
    },
    "generation": 9
  },
  {
    "name": "Iron Leaves",
    "pokedexId": 1010,
    "slug": "iron-leaves",
    "types": [
      "Grass",
      "Psychic"
    ],
    "attack": 259,
    "defense": 213,
    "stamina": 207,
    "maxCp": 4352,
    "maxCp40": 3850,
    "cpRaid100": 2200,
    "cpWeather100": 2750,
    "cpResearch100": 1650,
    "pveScore": 61,
    "dps": 33.02,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 9
  },
  {
    "name": "Dipplin",
    "pokedexId": 1011,
    "slug": "dipplin",
    "types": [
      "Grass",
      "Dragon"
    ],
    "attack": 173,
    "defense": 184,
    "stamina": 190,
    "maxCp": 2681,
    "maxCp40": 2371,
    "cpRaid100": 1355,
    "cpWeather100": 1694,
    "cpResearch100": 1016,
    "pveScore": 38,
    "dps": 22.06,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 9
  },
  {
    "name": "Poltchageist",
    "pokedexId": 1012,
    "slug": "poltchageist",
    "types": [
      "Grass",
      "Ghost"
    ],
    "attack": 134,
    "defense": 96,
    "stamina": 120,
    "maxCp": 1287,
    "maxCp40": 1139,
    "cpRaid100": 650,
    "cpWeather100": 813,
    "cpResearch100": 488,
    "pveScore": 22,
    "dps": 17.09,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 9
  },
  {
    "name": "Sinistcha",
    "pokedexId": 1013,
    "slug": "sinistcha",
    "types": [
      "Grass",
      "Ghost"
    ],
    "attack": 224,
    "defense": 191,
    "stamina": 174,
    "maxCp": 3329,
    "maxCp40": 2945,
    "cpRaid100": 1683,
    "cpWeather100": 2103,
    "cpResearch100": 1262,
    "pveScore": 49,
    "dps": 28.56,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 9
  },
  {
    "name": "Okidogi",
    "pokedexId": 1014,
    "slug": "okidogi",
    "types": [
      "Poison",
      "Fighting"
    ],
    "attack": 241,
    "defense": 210,
    "stamina": 204,
    "maxCp": 4012,
    "maxCp40": 3549,
    "cpRaid100": 2028,
    "cpWeather100": 2535,
    "cpResearch100": 1521,
    "pveScore": 54,
    "dps": 29.55,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "generation": 9
  },
  {
    "name": "Munkidori",
    "pokedexId": 1015,
    "slug": "munkidori",
    "types": [
      "Poison",
      "Psychic"
    ],
    "attack": 262,
    "defense": 172,
    "stamina": 204,
    "maxCp": 3958,
    "maxCp40": 3501,
    "cpRaid100": 2000,
    "cpWeather100": 2500,
    "cpResearch100": 1500,
    "pveScore": 56,
    "dps": 32.12,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "generation": 9
  },
  {
    "name": "Fezandipiti",
    "pokedexId": 1016,
    "slug": "fezandipiti",
    "types": [
      "Poison",
      "Fairy"
    ],
    "attack": 185,
    "defense": 228,
    "stamina": 204,
    "maxCp": 3257,
    "maxCp40": 2881,
    "cpRaid100": 1646,
    "cpWeather100": 2058,
    "cpResearch100": 1235,
    "pveScore": 42,
    "dps": 22.68,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "generation": 9
  },
  {
    "name": "Ogerpon",
    "pokedexId": 1017,
    "slug": "ogerpon",
    "types": [
      "Grass"
    ],
    "attack": 241,
    "defense": 196,
    "stamina": 190,
    "maxCp": 3759,
    "maxCp40": 3325,
    "cpRaid100": 1900,
    "cpWeather100": 2375,
    "cpResearch100": 1425,
    "pveScore": 54,
    "dps": 30.73,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 9
  },
  {
    "name": "Archaludon",
    "pokedexId": 1018,
    "slug": "archaludon",
    "types": [
      "Steel",
      "Dragon"
    ],
    "attack": 250,
    "defense": 215,
    "stamina": 207,
    "maxCp": 4228,
    "maxCp40": 3739,
    "cpRaid100": 2137,
    "cpWeather100": 2671,
    "cpResearch100": 1602,
    "pveScore": 51,
    "dps": 27.56,
    "bestFastMove": {
      "name": "Metal Claw",
      "type": "Steel"
    },
    "bestChargedMove": {
      "name": "Iron Head",
      "type": "Steel"
    },
    "generation": 9
  },
  {
    "name": "Hydrapple",
    "pokedexId": 1019,
    "slug": "hydrapple",
    "types": [
      "Grass",
      "Dragon"
    ],
    "attack": 216,
    "defense": 185,
    "stamina": 235,
    "maxCp": 3647,
    "maxCp40": 3226,
    "cpRaid100": 1843,
    "cpWeather100": 2304,
    "cpResearch100": 1382,
    "pveScore": 50,
    "dps": 27.54,
    "bestFastMove": {
      "name": "Vine Whip",
      "type": "Grass"
    },
    "bestChargedMove": {
      "name": "Grass Knot",
      "type": "Grass"
    },
    "generation": 9
  },
  {
    "name": "Gouging Fire",
    "pokedexId": 1020,
    "slug": "gouging-fire",
    "types": [
      "Fire",
      "Dragon"
    ],
    "attack": 224,
    "defense": 228,
    "stamina": 233,
    "maxCp": 4142,
    "maxCp40": 3664,
    "cpRaid100": 2093,
    "cpWeather100": 2617,
    "cpResearch100": 1570,
    "pveScore": 57,
    "dps": 29.87,
    "bestFastMove": {
      "name": "Fire Spin",
      "type": "Fire"
    },
    "bestChargedMove": {
      "name": "Overheat",
      "type": "Fire"
    },
    "generation": 9
  },
  {
    "name": "Raging Bolt",
    "pokedexId": 1021,
    "slug": "raging-bolt",
    "types": [
      "Electric",
      "Dragon"
    ],
    "attack": 235,
    "defense": 164,
    "stamina": 243,
    "maxCp": 3793,
    "maxCp40": 3355,
    "cpRaid100": 1917,
    "cpWeather100": 2396,
    "cpResearch100": 1438,
    "pveScore": 48,
    "dps": 26.89,
    "bestFastMove": {
      "name": "Thunder Shock",
      "type": "Electric"
    },
    "bestChargedMove": {
      "name": "Thunderbolt",
      "type": "Electric"
    },
    "generation": 9
  },
  {
    "name": "Iron Boulder",
    "pokedexId": 1022,
    "slug": "iron-boulder",
    "types": [
      "Rock",
      "Psychic"
    ],
    "attack": 249,
    "defense": 214,
    "stamina": 207,
    "maxCp": 4203,
    "maxCp40": 3717,
    "cpRaid100": 2124,
    "cpWeather100": 2655,
    "cpResearch100": 1593,
    "pveScore": 53,
    "dps": 28.71,
    "bestFastMove": {
      "name": "Smack Down",
      "type": "Rock"
    },
    "bestChargedMove": {
      "name": "Rock Slide",
      "type": "Rock"
    },
    "generation": 9
  },
  {
    "name": "Iron Crown",
    "pokedexId": 1023,
    "slug": "iron-crown",
    "types": [
      "Steel",
      "Psychic"
    ],
    "attack": 242,
    "defense": 220,
    "stamina": 207,
    "maxCp": 4144,
    "maxCp40": 3666,
    "cpRaid100": 2094,
    "cpWeather100": 2618,
    "cpResearch100": 1571,
    "pveScore": 49,
    "dps": 26.67,
    "bestFastMove": {
      "name": "Metal Claw",
      "type": "Steel"
    },
    "bestChargedMove": {
      "name": "Iron Head",
      "type": "Steel"
    },
    "generation": 9
  },
  {
    "name": "Terapagos",
    "pokedexId": 1024,
    "slug": "terapagos",
    "types": [
      "Normal"
    ],
    "attack": 126,
    "defense": 165,
    "stamina": 207,
    "maxCp": 1990,
    "maxCp40": 1760,
    "cpRaid100": 1005,
    "cpWeather100": 1257,
    "cpResearch100": 754,
    "pveScore": 26,
    "dps": 15.22,
    "bestFastMove": {
      "name": "Tackle",
      "type": "Normal"
    },
    "bestChargedMove": {
      "name": "Hyper Beam",
      "type": "Normal"
    },
    "generation": 9
  },
  {
    "name": "Pecharunt",
    "pokedexId": 1025,
    "slug": "pecharunt",
    "types": [
      "Poison",
      "Ghost"
    ],
    "attack": 181,
    "defense": 273,
    "stamina": 204,
    "maxCp": 3475,
    "maxCp40": 3074,
    "cpRaid100": 1756,
    "cpWeather100": 2196,
    "cpResearch100": 1317,
    "pveScore": 43,
    "dps": 22.19,
    "bestFastMove": {
      "name": "Poison Jab",
      "type": "Poison"
    },
    "bestChargedMove": {
      "name": "Sludge Bomb",
      "type": "Poison"
    },
    "generation": 9
  }
];

export function getPokemonByIdOrSlug(idOrSlug: string | number): PokemonRankData | undefined {
  const str = String(idOrSlug).toLowerCase().trim();
  const num = parseInt(str, 10);
  if (!isNaN(num)) {
    return pokemonRankings.find(p => p.pokedexId === num);
  }
  return pokemonRankings.find(p => p.slug === str || p.name.toLowerCase() === str);
}

export function isValidPokemonId(id: number | string): boolean {
  const num = typeof id === 'number' ? id : parseInt(id, 10);
  return !isNaN(num) && num >= 1 && num <= 1025;
}

export const ALL_POKEDEX_IDS: number[] = Array.from({ length: 1025 }, (_, i) => i + 1);
