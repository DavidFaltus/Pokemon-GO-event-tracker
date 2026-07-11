export interface MoveData {
  name: string;
  type: string;
}

export interface PokemonRankData {
  name: string;
  pokedexId: number;
  types: string[];
  attack: number;
  defense: number;
  stamina: number;
  maxCp: number;
  pveScore: number;
  dps: number;
  bestFastMove: MoveData;
  bestChargedMove: MoveData;
  isShadow?: boolean;
  isMega?: boolean;
  isPrimal?: boolean;
}

export const pokemonRankings: PokemonRankData[] = [
  // ─── NORMAL ───────────────────────────────────────────────────────────────
  {
    name: "Shadow Regigigas",
    pokedexId: 486,
    types: ["Normal"],
    attack: 287, defense: 210, stamina: 221, maxCp: 4913, pveScore: 100, dps: 35.77,
    bestFastMove: { name: "Hidden Power", type: "Normal" },
    bestChargedMove: { name: "Crush Grip", type: "Normal" },
    isShadow: true
  },
  {
    name: "Regigigas",
    pokedexId: 486,
    types: ["Normal"],
    attack: 287, defense: 210, stamina: 221, maxCp: 4913, pveScore: 99, dps: 30.44,
    bestFastMove: { name: "Hidden Power", type: "Normal" },
    bestChargedMove: { name: "Crush Grip", type: "Normal" }
  },
  {
    name: "Mega Mewtwo Y",
    pokedexId: 150,
    types: ["Psychic"],
    attack: 398, defense: 207, stamina: 214, maxCp: 7581, pveScore: 97, dps: 26.84,
    bestFastMove: { name: "Psycho Cut", type: "Psychic" },
    bestChargedMove: { name: "Hyper Beam", type: "Normal" },
    isMega: true
  },
  {
    name: "Mega Mewtwo X",
    pokedexId: 150,
    types: ["Psychic","Fighting"],
    attack: 396, defense: 228, stamina: 214, maxCp: 7581, pveScore: 96, dps: 25.95,
    bestFastMove: { name: "Psycho Cut", type: "Psychic" },
    bestChargedMove: { name: "Hyper Beam", type: "Normal" },
    isMega: true
  },
  {
    name: "Crowned Sword Zacian",
    pokedexId: 888,
    types: ["Fairy"],
    attack: 254, defense: 236, stamina: 192, maxCp: 4329, pveScore: 94, dps: 24.88,
    bestFastMove: { name: "Metal Claw", type: "Steel" },
    bestChargedMove: { name: "Giga Impact", type: "Normal" }
  },
  {
    name: "Mega Lopunny",
    pokedexId: 428,
    types: ["Normal","Fighting"],
    attack: 282, defense: 214, stamina: 163, maxCp: 4233, pveScore: 93, dps: 24.06,
    bestFastMove: { name: "Pound", type: "Normal" },
    bestChargedMove: { name: "Hyper Beam", type: "Normal" },
    isMega: true
  },
  {
    name: "Shadow Porygon-Z",
    pokedexId: 474,
    types: ["Normal"],
    attack: 264, defense: 150, stamina: 198, maxCp: 3692, pveScore: 91, dps: 24.89,
    bestFastMove: { name: "Lock-On", type: "Normal" },
    bestChargedMove: { name: "Hyper Beam", type: "Normal" },
    isShadow: true
  },
  {
    name: "Shadow Mewtwo",
    pokedexId: 150,
    types: ["Psychic"],
    attack: 300, defense: 182, stamina: 214, maxCp: 4724, pveScore: 90, dps: 22.84,
    bestFastMove: { name: "Psycho Cut", type: "Psychic" },
    bestChargedMove: { name: "Hyper Beam", type: "Normal" },
    isShadow: true
  },
  {
    name: "Aria Forme Meloetta",
    pokedexId: 648,
    types: ["Normal","Psychic"],
    attack: 250, defense: 225, stamina: 225, maxCp: 4490, pveScore: 88, dps: 21.83,
    bestFastMove: { name: "Quick Attack", type: "Normal" },
    bestChargedMove: { name: "Hyper Beam", type: "Normal" }
  },
  {
    name: "Porygon-Z",
    pokedexId: 474,
    types: ["Normal"],
    attack: 264, defense: 150, stamina: 198, maxCp: 3728, pveScore: 87, dps: 21.56,
    bestFastMove: { name: "Lock-On", type: "Normal" },
    bestChargedMove: { name: "Hyper Beam", type: "Normal" }
  },
  {
    name: "Xerneas",
    pokedexId: 716,
    types: ["Fairy"],
    attack: 250, defense: 185, stamina: 246, maxCp: 4275, pveScore: 85, dps: 20.35,
    bestFastMove: { name: "Tackle", type: "Normal" },
    bestChargedMove: { name: "Giga Impact", type: "Normal" }
  },
  {
    name: "Shadow Ursaluna",
    pokedexId: 901,
    types: ["Ground","Normal"],
    attack: 243, defense: 181, stamina: 277, maxCp: 4357, pveScore: 84, dps: 20.48,
    bestFastMove: { name: "Tackle", type: "Normal" },
    bestChargedMove: { name: "Swift", type: "Normal" },
    isShadow: true
  },
  {
    name: "Shadow Bewear",
    pokedexId: 760,
    types: ["Normal","Fighting"],
    attack: 226, defense: 141, stamina: 260, maxCp: 3524, pveScore: 82, dps: 20.53,
    bestFastMove: { name: "Tackle", type: "Normal" },
    bestChargedMove: { name: "Stomp", type: "Normal" },
    isShadow: true
  },
  {
    name: "Crowned Shield Zamazenta",
    pokedexId: 889,
    types: ["Fighting","Steel"],
    attack: 250, defense: 292, stamina: 192, maxCp: 4716, pveScore: 81, dps: 19.34,
    bestFastMove: { name: "Metal Claw", type: "Steel" },
    bestChargedMove: { name: "Giga Impact", type: "Normal" }
  },
  {
    name: "Mega Dragonite",
    pokedexId: 149,
    types: ["Dragon","Flying"],
    attack: 263, defense: 198, stamina: 209, maxCp: 4287, pveScore: 79, dps: 19.22,
    bestFastMove: { name: "Dragon Tail", type: "Dragon" },
    bestChargedMove: { name: "Hyper Beam", type: "Normal" },
    isMega: true
  },
  {
    name: "Shadow Dragonite",
    pokedexId: 149,
    types: ["Dragon","Flying"],
    attack: 263, defense: 198, stamina: 209, maxCp: 4287, pveScore: 78, dps: 19.81,
    bestFastMove: { name: "Dragon Tail", type: "Dragon" },
    bestChargedMove: { name: "Hyper Beam", type: "Normal" },
    isShadow: true
  },
  {
    name: "Mewtwo",
    pokedexId: 150,
    types: ["Psychic"],
    attack: 300, defense: 182, stamina: 214, maxCp: 4724, pveScore: 76, dps: 19.53,
    bestFastMove: { name: "Psycho Cut", type: "Psychic" },
    bestChargedMove: { name: "Hyper Beam", type: "Normal" }
  },
  {
    name: "Shadow Staraptor",
    pokedexId: 398,
    types: ["Normal","Flying"],
    attack: 234, defense: 140, stamina: 198, maxCp: 3194, pveScore: 75, dps: 20.6,
    bestFastMove: { name: "Quick Attack", type: "Normal" },
    bestChargedMove: { name: "Fly", type: "Flying" },
    isShadow: true
  },
  {
    name: "Shadow Porygon2",
    pokedexId: 233,
    types: ["Normal"],
    attack: 198, defense: 180, stamina: 198, maxCp: 3064, pveScore: 73, dps: 19.76,
    bestFastMove: { name: "Lock-On", type: "Normal" },
    bestChargedMove: { name: "Hyper Beam", type: "Normal" },
    isShadow: true
  },
  {
    name: "Shadow Snorlax",
    pokedexId: 143,
    types: ["Normal"],
    attack: 190, defense: 169, stamina: 330, maxCp: 3647, pveScore: 72, dps: 17.99,
    bestFastMove: { name: "Lick", type: "Ghost" },
    bestChargedMove: { name: "Hyper Beam", type: "Normal" },
    isShadow: true
  },
  // ─── FIGHTING ───────────────────────────────────────────────────────────────
  {
    name: "Mega Lucario",
    pokedexId: 448,
    types: ["Fighting","Steel"],
    attack: 310, defense: 175, stamina: 172, maxCp: 4595, pveScore: 100, dps: 37.08,
    bestFastMove: { name: "Force Palm", type: "Fighting" },
    bestChargedMove: { name: "Aura Sphere", type: "Fighting" },
    isMega: true
  },
  {
    name: "Mega Blaziken",
    pokedexId: 257,
    types: ["Fire","Fighting"],
    attack: 329, defense: 168, stamina: 190, maxCp: 5199, pveScore: 99, dps: 35.62,
    bestFastMove: { name: "Counter", type: "Fighting" },
    bestChargedMove: { name: "Aura Sphere", type: "Fighting" },
    isMega: true
  },
  {
    name: "Keldeo (Resolute Forme)",
    pokedexId: 647,
    types: ["Water","Fighting"],
    attack: 260, defense: 192, stamina: 225, maxCp: 4300, pveScore: 97, dps: 32.19,
    bestFastMove: { name: "Low Kick", type: "Fighting" },
    bestChargedMove: { name: "Secret Sword", type: "Fighting" }
  },
  {
    name: "Mega Mewtwo X (Fighting)",
    pokedexId: 150,
    types: ["Psychic","Fighting"],
    attack: 396, defense: 228, stamina: 214, maxCp: 7581, pveScore: 96, dps: 29.27,
    bestFastMove: { name: "Psycho Cut", type: "Psychic" },
    bestChargedMove: { name: "Focus Blast", type: "Fighting" },
    isMega: true
  },
  {
    name: "Mega Heracross",
    pokedexId: 214,
    types: ["Bug","Fighting"],
    attack: 304, defense: 203, stamina: 173, maxCp: 5410, pveScore: 94, dps: 27.79,
    bestFastMove: { name: "Counter", type: "Fighting" },
    bestChargedMove: { name: "Close Combat", type: "Fighting" },
    isMega: true
  },
  {
    name: "Shadow Conkeldurr",
    pokedexId: 534,
    types: ["Fighting"],
    attack: 243, defense: 158, stamina: 233, maxCp: 3773, pveScore: 93, dps: 28.87,
    bestFastMove: { name: "Force Palm", type: "Fighting" },
    bestChargedMove: { name: "Dynamic Punch", type: "Fighting" },
    isShadow: true
  },
  {
    name: "Shadow Blaziken",
    pokedexId: 257,
    types: ["Fire","Fighting"],
    attack: 240, defense: 141, stamina: 190, maxCp: 3219, pveScore: 91, dps: 29.56,
    bestFastMove: { name: "Counter", type: "Fighting" },
    bestChargedMove: { name: "Aura Sphere", type: "Fighting" },
    isShadow: true
  },
  {
    name: "Terrakion",
    pokedexId: 639,
    types: ["Rock","Fighting"],
    attack: 260, defense: 192, stamina: 209, maxCp: 4227, pveScore: 90, dps: 27.52,
    bestFastMove: { name: "Double Kick", type: "Fighting" },
    bestChargedMove: { name: "Sacred Sword", type: "Fighting" }
  },
  {
    name: "Lucario",
    pokedexId: 448,
    types: ["Fighting","Steel"],
    attack: 236, defense: 144, stamina: 172, maxCp: 3056, pveScore: 88, dps: 28.14,
    bestFastMove: { name: "Force Palm", type: "Fighting" },
    bestChargedMove: { name: "Aura Sphere", type: "Fighting" }
  },
  {
    name: "Mega Mewtwo Y (Fighting)",
    pokedexId: 150,
    types: ["Psychic"],
    attack: 398, defense: 207, stamina: 214, maxCp: 7581, pveScore: 87, dps: 26.08,
    bestFastMove: { name: "Psycho Cut", type: "Psychic" },
    bestChargedMove: { name: "Focus Blast", type: "Fighting" },
    isMega: true
  },
  {
    name: "Keldeo (Ordinary Forme)",
    pokedexId: 647,
    types: ["Water","Fighting"],
    attack: 260, defense: 192, stamina: 225, maxCp: 4300, pveScore: 85, dps: 26.02,
    bestFastMove: { name: "Low Kick", type: "Fighting" },
    bestChargedMove: { name: "Sacred Sword", type: "Fighting" }
  },
  {
    name: "Mega Latios",
    pokedexId: 381,
    types: ["Dragon","Psychic"],
    attack: 335, defense: 241, stamina: 188, maxCp: 5661, pveScore: 84, dps: 26.02,
    bestFastMove: { name: "Dragon Breath", type: "Dragon" },
    bestChargedMove: { name: "Aura Sphere", type: "Fighting" },
    isMega: true
  },
  {
    name: "Shadow Raikou",
    pokedexId: 243,
    types: ["Electric"],
    attack: 241, defense: 195, stamina: 207, maxCp: 4073, pveScore: 82, dps: 25.87,
    bestFastMove: { name: "Thunder Shock", type: "Electric" },
    bestChargedMove: { name: "Aura Sphere", type: "Fighting" },
    isShadow: true
  },
  {
    name: "Urshifu (Rapid Strike Style)",
    pokedexId: 892,
    types: ["Fighting","Dark"],
    attack: 261, defense: 157, stamina: 200, maxCp: 3914, pveScore: 81, dps: 24.54,
    bestFastMove: { name: "Counter", type: "Fighting" },
    bestChargedMove: { name: "Dynamic Punch", type: "Fighting" }
  },
  {
    name: "Blaziken",
    pokedexId: 257,
    types: ["Fire","Fighting"],
    attack: 240, defense: 141, stamina: 190, maxCp: 3219, pveScore: 79, dps: 25.89,
    bestFastMove: { name: "Counter", type: "Fighting" },
    bestChargedMove: { name: "Aura Sphere", type: "Fighting" }
  },
  {
    name: "Shadow Machamp",
    pokedexId: 68,
    types: ["Fighting"],
    attack: 234, defense: 159, stamina: 207, maxCp: 3455, pveScore: 78, dps: 26.02,
    bestFastMove: { name: "Counter", type: "Fighting" },
    bestChargedMove: { name: "Dynamic Punch", type: "Fighting" },
    isShadow: true
  },
  {
    name: "Shadow Hariyama",
    pokedexId: 297,
    types: ["Fighting"],
    attack: 209, defense: 114, stamina: 302, maxCp: 3187, pveScore: 76, dps: 25.6,
    bestFastMove: { name: "Force Palm", type: "Fighting" },
    bestChargedMove: { name: "Dynamic Punch", type: "Fighting" },
    isShadow: true
  },
  {
    name: "Mega Gallade",
    pokedexId: 475,
    types: ["Psychic","Fighting"],
    attack: 297, defense: 209, stamina: 154, maxCp: 4285, pveScore: 75, dps: 24.42,
    bestFastMove: { name: "Low Kick", type: "Fighting" },
    bestChargedMove: { name: "Close Combat", type: "Fighting" },
    isMega: true
  },
  {
    name: "Urshifu (Single Strike Style)",
    pokedexId: 892,
    types: ["Fighting","Dark"],
    attack: 261, defense: 157, stamina: 200, maxCp: 3914, pveScore: 73, dps: 24.4,
    bestFastMove: { name: "Counter", type: "Fighting" },
    bestChargedMove: { name: "Dynamic Punch", type: "Fighting" }
  },
  {
    name: "Conkeldurr",
    pokedexId: 534,
    types: ["Fighting"],
    attack: 243, defense: 158, stamina: 233, maxCp: 3776, pveScore: 72, dps: 24.49,
    bestFastMove: { name: "Force Palm", type: "Fighting" },
    bestChargedMove: { name: "Dynamic Punch", type: "Fighting" }
  },
  // ─── FLYING ───────────────────────────────────────────────────────────────
  {
    name: "Mega Rayquaza",
    pokedexId: 384,
    types: ["Dragon","Flying"],
    attack: 354, defense: 196, stamina: 213, maxCp: 6452, pveScore: 100, dps: 44.95,
    bestFastMove: { name: "Air Slash", type: "Flying" },
    bestChargedMove: { name: "Dragon Ascent", type: "Flying" },
    isMega: true
  },
  {
    name: "Rayquaza",
    pokedexId: 384,
    types: ["Dragon","Flying"],
    attack: 284, defense: 170, stamina: 213, maxCp: 4336, pveScore: 99, dps: 34.05,
    bestFastMove: { name: "Air Slash", type: "Flying" },
    bestChargedMove: { name: "Dragon Ascent", type: "Flying" }
  },
  {
    name: "Shadow Moltres",
    pokedexId: 146,
    types: ["Fire","Flying"],
    attack: 251, defense: 181, stamina: 207, maxCp: 3854, pveScore: 97, dps: 33.47,
    bestFastMove: { name: "Wing Attack", type: "Flying" },
    bestChargedMove: { name: "Fly", type: "Flying" },
    isShadow: true
  },
  {
    name: "Shadow Salamence",
    pokedexId: 373,
    types: ["Dragon","Flying"],
    attack: 277, defense: 168, stamina: 216, maxCp: 4239, pveScore: 96, dps: 32.14,
    bestFastMove: { name: "Fire Fang", type: "Fire" },
    bestChargedMove: { name: "Fly", type: "Flying" },
    isShadow: true
  },
  {
    name: "Mega Salamence",
    pokedexId: 373,
    types: ["Dragon","Flying"],
    attack: 282, defense: 228, stamina: 197, maxCp: 4759, pveScore: 94, dps: 30.15,
    bestFastMove: { name: "Fire Fang", type: "Fire" },
    bestChargedMove: { name: "Fly", type: "Flying" },
    isMega: true
  },
  {
    name: "Enamorus (Incarnate Forme)",
    pokedexId: 905,
    types: ["Fairy","Flying"],
    attack: 250, defense: 201, stamina: 179, maxCp: 3811, pveScore: 93, dps: 29.6,
    bestFastMove: { name: "Fairy Wind", type: "Fairy" },
    bestChargedMove: { name: "Fly", type: "Flying" }
  },
  {
    name: "Mega Charizard Y",
    pokedexId: 6,
    types: ["Fire","Flying"],
    attack: 319, defense: 212, stamina: 186, maxCp: 5037, pveScore: 91, dps: 28.07,
    bestFastMove: { name: "Air Slash", type: "Flying" },
    bestChargedMove: { name: "Blast Burn", type: "Fire" },
    isMega: true
  },
  {
    name: "Yveltal",
    pokedexId: 717,
    types: ["Dark","Flying"],
    attack: 250, defense: 185, stamina: 246, maxCp: 4290, pveScore: 90, dps: 28.35,
    bestFastMove: { name: "Gust", type: "Flying" },
    bestChargedMove: { name: "Oblivion Wing", type: "Flying" }
  },
  {
    name: "Moltres",
    pokedexId: 146,
    types: ["Fire","Flying"],
    attack: 251, defense: 181, stamina: 207, maxCp: 3854, pveScore: 88, dps: 28.1,
    bestFastMove: { name: "Wing Attack", type: "Flying" },
    bestChargedMove: { name: "Fly", type: "Flying" }
  },
  {
    name: "Galarian Articuno",
    pokedexId: 144,
    types: ["Ice","Flying"],
    attack: 192, defense: 236, stamina: 207, maxCp: 3537, pveScore: 87, dps: 27.58,
    bestFastMove: { name: "Psycho Cut", type: "Psychic" },
    bestChargedMove: { name: "Fly", type: "Flying" }
  },
  {
    name: "Shadow Toucannon",
    pokedexId: 733,
    types: ["Normal","Flying"],
    attack: 222, defense: 146, stamina: 190, maxCp: 3039, pveScore: 85, dps: 30.43,
    bestFastMove: { name: "Peck", type: "Flying" },
    bestChargedMove: { name: "Beak Blast", type: "Flying" },
    isShadow: true
  },
  {
    name: "Apex Shadow Lugia",
    pokedexId: 249,
    types: ["Psychic","Flying"],
    attack: 193, defense: 310, stamina: 235, maxCp: 4186, pveScore: 84, dps: 26.67,
    bestFastMove: { name: "Extrasensory", type: "Psychic" },
    bestChargedMove: { name: "Aeroblast+", type: "Flying" }
  },
  {
    name: "Shadow Zapdos",
    pokedexId: 145,
    types: ["Electric","Flying"],
    attack: 253, defense: 185, stamina: 207, maxCp: 3987, pveScore: 82, dps: 27.93,
    bestFastMove: { name: "Thunder Shock", type: "Electric" },
    bestChargedMove: { name: "Drill Peck", type: "Flying" },
    isShadow: true
  },
  {
    name: "Salamence",
    pokedexId: 373,
    types: ["Dragon","Flying"],
    attack: 277, defense: 168, stamina: 216, maxCp: 4239, pveScore: 81, dps: 27.13,
    bestFastMove: { name: "Fire Fang", type: "Fire" },
    bestChargedMove: { name: "Fly", type: "Flying" }
  },
  {
    name: "Mega Skarmory",
    pokedexId: 227,
    types: ["Steel","Flying"],
    attack: 148, defense: 226, stamina: 163, maxCp: 2383, pveScore: 79, dps: 27,
    bestFastMove: { name: "Air Slash", type: "Flying" },
    bestChargedMove: { name: "Sky Attack", type: "Flying" },
    isMega: true
  },
  {
    name: "Shadow Staraptor (Flying)",
    pokedexId: 398,
    types: ["Normal","Flying"],
    attack: 234, defense: 140, stamina: 198, maxCp: 3194, pveScore: 78, dps: 29.57,
    bestFastMove: { name: "Gust", type: "Flying" },
    bestChargedMove: { name: "Fly", type: "Flying" },
    isShadow: true
  },
  {
    name: "Enamorus (Therian Forme)",
    pokedexId: 905,
    types: ["Fairy","Flying"],
    attack: 250, defense: 201, stamina: 179, maxCp: 3811, pveScore: 76, dps: 26.89,
    bestFastMove: { name: "Fairy Wind", type: "Fairy" },
    bestChargedMove: { name: "Fly", type: "Flying" }
  },
  {
    name: "Mega Pidgeot",
    pokedexId: 18,
    types: ["Normal","Flying"],
    attack: 280, defense: 175, stamina: 195, maxCp: 4323, pveScore: 75, dps: 27.71,
    bestFastMove: { name: "Gust", type: "Flying" },
    bestChargedMove: { name: "Brave Bird", type: "Flying" },
    isMega: true
  },
  {
    name: "Shadow Lugia",
    pokedexId: 249,
    types: ["Psychic","Flying"],
    attack: 193, defense: 310, stamina: 235, maxCp: 4185, pveScore: 73, dps: 25.37,
    bestFastMove: { name: "Extrasensory", type: "Psychic" },
    bestChargedMove: { name: "Fly", type: "Flying" },
    isShadow: true
  },
  {
    name: "Crowned Sword Zacian (Flying)",
    pokedexId: 888,
    types: ["Fairy"],
    attack: 254, defense: 236, stamina: 192, maxCp: 4329, pveScore: 72, dps: 25.79,
    bestFastMove: { name: "Air Slash", type: "Flying" },
    bestChargedMove: { name: "Play Rough", type: "Fairy" }
  },
  // ─── POISON ───────────────────────────────────────────────────────────────
  {
    name: "Eternatus",
    pokedexId: 890,
    types: ["Dragon","Poison"],
    attack: 278, defense: 192, stamina: 255, maxCp: 5020, pveScore: 100, dps: 28.21,
    bestFastMove: { name: "Poison Jab", type: "Poison" },
    bestChargedMove: { name: "Sludge Bomb", type: "Poison" }
  },
  {
    name: "Mega Gengar",
    pokedexId: 94,
    types: ["Ghost","Poison"],
    attack: 349, defense: 199, stamina: 155, maxCp: 4902, pveScore: 99, dps: 28.4,
    bestFastMove: { name: "Lick", type: "Ghost" },
    bestChargedMove: { name: "Sludge Bomb", type: "Poison" },
    isMega: true
  },
  {
    name: "Mega Beedrill",
    pokedexId: 15,
    types: ["Bug","Poison"],
    attack: 303, defense: 148, stamina: 163, maxCp: 3770, pveScore: 97, dps: 28.3,
    bestFastMove: { name: "Poison Jab", type: "Poison" },
    bestChargedMove: { name: "Sludge Bomb", type: "Poison" },
    isMega: true
  },
  {
    name: "Nihilego",
    pokedexId: 793,
    types: ["Rock","Poison"],
    attack: 249, defense: 210, stamina: 240, maxCp: 4465, pveScore: 96, dps: 25.12,
    bestFastMove: { name: "Poison Jab", type: "Poison" },
    bestChargedMove: { name: "Sludge Bomb", type: "Poison" }
  },
  {
    name: "Mega Victreebel",
    pokedexId: 71,
    types: ["Grass","Poison"],
    attack: 207, defense: 135, stamina: 190, maxCp: 2748, pveScore: 94, dps: 24.94,
    bestFastMove: { name: "Acid", type: "Poison" },
    bestChargedMove: { name: "Sludge Bomb", type: "Poison" },
    isMega: true
  },
  {
    name: "Shadow Overqwil",
    pokedexId: 904,
    types: ["Dark","Poison"],
    attack: 222, defense: 171, stamina: 198, maxCp: 3330, pveScore: 93, dps: 25.63,
    bestFastMove: { name: "Poison Jab", type: "Poison" },
    bestChargedMove: { name: "Sludge Bomb", type: "Poison" },
    isShadow: true
  },
  {
    name: "Naganadel",
    pokedexId: 804,
    types: ["Poison","Dragon"],
    attack: 263, defense: 159, stamina: 177, maxCp: 3587, pveScore: 91, dps: 25.01,
    bestFastMove: { name: "Poison Jab", type: "Poison" },
    bestChargedMove: { name: "Sludge Bomb", type: "Poison" }
  },
  {
    name: "Roserade",
    pokedexId: 407,
    types: ["Grass","Poison"],
    attack: 243, defense: 185, stamina: 155, maxCp: 3354, pveScore: 90, dps: 23.36,
    bestFastMove: { name: "Poison Jab", type: "Poison" },
    bestChargedMove: { name: "Sludge Bomb", type: "Poison" }
  },
  {
    name: "Revavroom",
    pokedexId: 966,
    types: ["Steel","Poison"],
    attack: 224, defense: 174, stamina: 190, maxCp: 3266, pveScore: 88, dps: 21.51,
    bestFastMove: { name: "Poison Jab", type: "Poison" },
    bestChargedMove: { name: "Gunk Shot", type: "Poison" }
  },
  {
    name: "Shadow Scolipede",
    pokedexId: 545,
    types: ["Bug","Poison"],
    attack: 203, defense: 175, stamina: 155, maxCp: 2766, pveScore: 87, dps: 23.02,
    bestFastMove: { name: "Poison Jab", type: "Poison" },
    bestChargedMove: { name: "Sludge Bomb", type: "Poison" },
    isShadow: true
  },
  {
    name: "Overqwil",
    pokedexId: 904,
    types: ["Dark","Poison"],
    attack: 222, defense: 171, stamina: 200, maxCp: 3326, pveScore: 85, dps: 21.9,
    bestFastMove: { name: "Poison Jab", type: "Poison" },
    bestChargedMove: { name: "Sludge Bomb", type: "Poison" }
  },
  {
    name: "Shadow Vileplume",
    pokedexId: 45,
    types: ["Grass","Poison"],
    attack: 202, defense: 167, stamina: 181, maxCp: 2901, pveScore: 84, dps: 22.4,
    bestFastMove: { name: "Acid", type: "Poison" },
    bestChargedMove: { name: "Sludge Bomb", type: "Poison" },
    isShadow: true
  },
  {
    name: "Shadow Muk",
    pokedexId: 89,
    types: ["Poison"],
    attack: 190, defense: 172, stamina: 233, maxCp: 3116, pveScore: 82, dps: 21.53,
    bestFastMove: { name: "Poison Jab", type: "Poison" },
    bestChargedMove: { name: "Gunk Shot", type: "Poison" },
    isShadow: true
  },
  {
    name: "Shadow Alolan Muk",
    pokedexId: 89,
    types: ["Poison"],
    attack: 190, defense: 172, stamina: 233, maxCp: 3116, pveScore: 81, dps: 21.36,
    bestFastMove: { name: "Poison Jab", type: "Poison" },
    bestChargedMove: { name: "Gunk Shot", type: "Poison" },
    isShadow: true
  },
  {
    name: "Shadow Victreebel",
    pokedexId: 71,
    types: ["Grass","Poison"],
    attack: 222, defense: 143, stamina: 190, maxCp: 2748, pveScore: 79, dps: 22.35,
    bestFastMove: { name: "Acid", type: "Poison" },
    bestChargedMove: { name: "Sludge Bomb", type: "Poison" },
    isShadow: true
  },
  {
    name: "Shadow Gengar",
    pokedexId: 94,
    types: ["Ghost","Poison"],
    attack: 261, defense: 149, stamina: 155, maxCp: 3254, pveScore: 78, dps: 22.76,
    bestFastMove: { name: "Lick", type: "Ghost" },
    bestChargedMove: { name: "Sludge Bomb", type: "Poison" },
    isShadow: true
  },
  {
    name: "Shadow Skuntank",
    pokedexId: 435,
    types: ["Poison","Dark"],
    attack: 184, defense: 132, stamina: 230, maxCp: 2666, pveScore: 76, dps: 21.44,
    bestFastMove: { name: "Poison Jab", type: "Poison" },
    bestChargedMove: { name: "Sludge Bomb", type: "Poison" },
    isShadow: true
  },
  {
    name: "Mega Venusaur",
    pokedexId: 3,
    types: ["Grass","Poison"],
    attack: 241, defense: 246, stamina: 190, maxCp: 4285, pveScore: 75, dps: 19.39,
    bestFastMove: { name: "Vine Whip", type: "Grass" },
    bestChargedMove: { name: "Sludge Bomb", type: "Poison" },
    isMega: true
  },
  {
    name: "Shadow Toxicroak",
    pokedexId: 454,
    types: ["Poison","Fighting"],
    attack: 211, defense: 125, stamina: 195, maxCp: 2813, pveScore: 73, dps: 22.24,
    bestFastMove: { name: "Poison Jab", type: "Poison" },
    bestChargedMove: { name: "Sludge Bomb", type: "Poison" },
    isShadow: true
  },
  {
    name: "Shadow Sneasler",
    pokedexId: 903,
    types: ["Fighting","Poison"],
    attack: 259, defense: 158, stamina: 190, maxCp: 3643, pveScore: 72, dps: 21.5,
    bestFastMove: { name: "Poison Jab", type: "Poison" },
    bestChargedMove: { name: "X-Scissor", type: "Bug" },
    isShadow: true
  },
  // ─── GROUND ───────────────────────────────────────────────────────────────
  {
    name: "Primal Groudon",
    pokedexId: 383,
    types: ["Ground","Fire"],
    attack: 353, defense: 268, stamina: 205, maxCp: 6439, pveScore: 100, dps: 32.33,
    bestFastMove: { name: "Mud Shot", type: "Ground" },
    bestChargedMove: { name: "Precipice Blades", type: "Ground" },
    isPrimal: true
  },
  {
    name: "Mega Garchomp",
    pokedexId: 445,
    types: ["Dragon","Ground"],
    attack: 339, defense: 222, stamina: 239, maxCp: 6132, pveScore: 99, dps: 30.11,
    bestFastMove: { name: "Mud Shot", type: "Ground" },
    bestChargedMove: { name: "Earth Power", type: "Ground" },
    isMega: true
  },
  {
    name: "Shadow Groudon",
    pokedexId: 383,
    types: ["Ground"],
    attack: 270, defense: 228, stamina: 205, maxCp: 4652, pveScore: 97, dps: 28.89,
    bestFastMove: { name: "Mud Shot", type: "Ground" },
    bestChargedMove: { name: "Precipice Blades", type: "Ground" },
    isShadow: true
  },
  {
    name: "Shadow Garchomp",
    pokedexId: 445,
    types: ["Dragon","Ground"],
    attack: 261, defense: 193, stamina: 239, maxCp: 4478, pveScore: 96, dps: 28.06,
    bestFastMove: { name: "Mud Shot", type: "Ground" },
    bestChargedMove: { name: "Earth Power", type: "Ground" },
    isShadow: true
  },
  {
    name: "Landorus (Therian Forme)",
    pokedexId: 645,
    types: ["Ground","Flying"],
    attack: 289, defense: 179, stamina: 205, maxCp: 4434, pveScore: 94, dps: 26.84,
    bestFastMove: { name: "Mud Shot", type: "Ground" },
    bestChargedMove: { name: "Sandsear Storm", type: "Ground" }
  },
  {
    name: "Shadow Landorus (Incarnate Forme)",
    pokedexId: 645,
    types: ["Ground","Flying"],
    attack: 261, defense: 182, stamina: 205, maxCp: 4056, pveScore: 93, dps: 26.96,
    bestFastMove: { name: "Mud Shot", type: "Ground" },
    bestChargedMove: { name: "Earth Power", type: "Ground" },
    isShadow: true
  },
  {
    name: "Shadow Excadrill",
    pokedexId: 530,
    types: ["Ground","Steel"],
    attack: 255, defense: 129, stamina: 242, maxCp: 3741, pveScore: 91, dps: 27.31,
    bestFastMove: { name: "Mud-Slap", type: "Ground" },
    bestChargedMove: { name: "Scorching Sands", type: "Ground" },
    isShadow: true
  },
  {
    name: "Shadow Rhyperior",
    pokedexId: 464,
    types: ["Ground","Rock"],
    attack: 241, defense: 190, stamina: 251, maxCp: 4220, pveScore: 90, dps: 26.1,
    bestFastMove: { name: "Mud-Slap", type: "Ground" },
    bestChargedMove: { name: "Drill Run", type: "Ground" },
    isShadow: true
  },
  {
    name: "Groudon",
    pokedexId: 383,
    types: ["Ground"],
    attack: 270, defense: 228, stamina: 205, maxCp: 4652, pveScore: 88, dps: 24.71,
    bestFastMove: { name: "Mud Shot", type: "Ground" },
    bestChargedMove: { name: "Precipice Blades", type: "Ground" }
  },
  {
    name: "Mega Swampert",
    pokedexId: 260,
    types: ["Water","Ground"],
    attack: 283, defense: 218, stamina: 225, maxCp: 4826, pveScore: 87, dps: 24.16,
    bestFastMove: { name: "Mud Shot", type: "Ground" },
    bestChargedMove: { name: "Earthquake", type: "Ground" },
    isMega: true
  },
  {
    name: "Garchomp",
    pokedexId: 445,
    types: ["Dragon","Ground"],
    attack: 261, defense: 193, stamina: 239, maxCp: 4479, pveScore: 85, dps: 23.59,
    bestFastMove: { name: "Mud Shot", type: "Ground" },
    bestChargedMove: { name: "Earth Power", type: "Ground" }
  },
  {
    name: "Excadrill",
    pokedexId: 530,
    types: ["Ground","Steel"],
    attack: 255, defense: 129, stamina: 242, maxCp: 3741, pveScore: 84, dps: 23.46,
    bestFastMove: { name: "Mud-Slap", type: "Ground" },
    bestChargedMove: { name: "Scorching Sands", type: "Ground" }
  },
  {
    name: "Landorus (Incarnate Forme)",
    pokedexId: 645,
    types: ["Ground","Flying"],
    attack: 289, defense: 179, stamina: 205, maxCp: 4434, pveScore: 82, dps: 22.99,
    bestFastMove: { name: "Mud Shot", type: "Ground" },
    bestChargedMove: { name: "Earth Power", type: "Ground" }
  },
  {
    name: "Shadow Golurk",
    pokedexId: 623,
    types: ["Ground","Ghost"],
    attack: 222, defense: 154, stamina: 205, maxCp: 3226, pveScore: 81, dps: 23.88,
    bestFastMove: { name: "Mud-Slap", type: "Ground" },
    bestChargedMove: { name: "Earth Power", type: "Ground" },
    isShadow: true
  },
  {
    name: "Shadow Hippowdon",
    pokedexId: 450,
    types: ["Ground"],
    attack: 201, defense: 191, stamina: 239, maxCp: 3488, pveScore: 79, dps: 22.77,
    bestFastMove: { name: "Sand Attack", type: "Ground" },
    bestChargedMove: { name: "Earth Power", type: "Ground" },
    isShadow: true
  },
  {
    name: "Rhyperior",
    pokedexId: 464,
    types: ["Ground","Rock"],
    attack: 241, defense: 190, stamina: 251, maxCp: 3733, pveScore: 78, dps: 21.99,
    bestFastMove: { name: "Mud-Slap", type: "Ground" },
    bestChargedMove: { name: "Drill Run", type: "Ground" }
  },
  {
    name: "Shadow Rhydon",
    pokedexId: 112,
    types: ["Ground","Rock"],
    attack: 222, defense: 171, stamina: 233, maxCp: 3593, pveScore: 76, dps: 22.9,
    bestFastMove: { name: "Mud-Slap", type: "Ground" },
    bestChargedMove: { name: "Earthquake", type: "Ground" },
    isShadow: true
  },
  {
    name: "Mega Heracross (Ground)",
    pokedexId: 214,
    types: ["Bug","Fighting"],
    attack: 304, defense: 203, stamina: 173, maxCp: 5410, pveScore: 75, dps: 22.13,
    bestFastMove: { name: "Counter", type: "Fighting" },
    bestChargedMove: { name: "Earthquake", type: "Ground" },
    isMega: true
  },
  {
    name: "Shadow Mamoswine",
    pokedexId: 473,
    types: ["Ice","Ground"],
    attack: 247, defense: 146, stamina: 242, maxCp: 3763, pveScore: 73, dps: 23.51,
    bestFastMove: { name: "Mud-Slap", type: "Ground" },
    bestChargedMove: { name: "High Horsepower", type: "Ground" },
    isShadow: true
  },
  {
    name: "Shadow Donphan",
    pokedexId: 232,
    types: ["Ground"],
    attack: 214, defense: 185, stamina: 207, maxCp: 3406, pveScore: 72, dps: 22.12,
    bestFastMove: { name: "Mud-Slap", type: "Ground" },
    bestChargedMove: { name: "Earthquake", type: "Ground" },
    isShadow: true
  },
  // ─── ROCK ───────────────────────────────────────────────────────────────
  {
    name: "Mega Diancie",
    pokedexId: 719,
    types: ["Rock","Fairy"],
    attack: 342, defense: 235, stamina: 137, maxCp: 4913, pveScore: 100, dps: 31.84,
    bestFastMove: { name: "Rock Throw", type: "Rock" },
    bestChargedMove: { name: "Rock Slide", type: "Rock" },
    isMega: true
  },
  {
    name: "Shadow Rhyperior (Rock)",
    pokedexId: 464,
    types: ["Ground","Rock"],
    attack: 241, defense: 190, stamina: 251, maxCp: 4220, pveScore: 99, dps: 31.16,
    bestFastMove: { name: "Smack Down", type: "Rock" },
    bestChargedMove: { name: "Rock Wrecker", type: "Rock" },
    isShadow: true
  },
  {
    name: "Mega Tyranitar",
    pokedexId: 248,
    types: ["Rock","Dark"],
    attack: 309, defense: 276, stamina: 225, maxCp: 5765, pveScore: 97, dps: 28.42,
    bestFastMove: { name: "Smack Down", type: "Rock" },
    bestChargedMove: { name: "Stone Edge", type: "Rock" },
    isMega: true
  },
  {
    name: "Mega Aerodactyl",
    pokedexId: 142,
    types: ["Rock","Flying"],
    attack: 266, defense: 191, stamina: 173, maxCp: 3904, pveScore: 96, dps: 28.13,
    bestFastMove: { name: "Rock Throw", type: "Rock" },
    bestChargedMove: { name: "Rock Slide", type: "Rock" },
    isMega: true
  },
  {
    name: "Shadow Gigalith",
    pokedexId: 526,
    types: ["Rock"],
    attack: 226, defense: 201, stamina: 198, maxCp: 3649, pveScore: 94, dps: 28.51,
    bestFastMove: { name: "Lock-On", type: "Normal" },
    bestChargedMove: { name: "Meteor Beam", type: "Rock" },
    isShadow: true
  },
  {
    name: "Shadow Tyranitar",
    pokedexId: 248,
    types: ["Rock","Dark"],
    attack: 251, defense: 207, stamina: 225, maxCp: 4335, pveScore: 93, dps: 27.26,
    bestFastMove: { name: "Smack Down", type: "Rock" },
    bestChargedMove: { name: "Stone Edge", type: "Rock" },
    isShadow: true
  },
  {
    name: "Shadow Tyrantrum",
    pokedexId: 697,
    types: ["Rock","Dragon"],
    attack: 227, defense: 191, stamina: 193, maxCp: 3536, pveScore: 91, dps: 27.8,
    bestFastMove: { name: "Rock Throw", type: "Rock" },
    bestChargedMove: { name: "Meteor Beam", type: "Rock" },
    isShadow: true
  },
  {
    name: "Shadow Rampardos",
    pokedexId: 409,
    types: ["Rock"],
    attack: 295, defense: 109, stamina: 219, maxCp: 3820, pveScore: 90, dps: 29.82,
    bestFastMove: { name: "Smack Down", type: "Rock" },
    bestChargedMove: { name: "Rock Slide", type: "Rock" },
    isShadow: true
  },
  {
    name: "Rhyperior (Rock)",
    pokedexId: 464,
    types: ["Ground","Rock"],
    attack: 241, defense: 190, stamina: 251, maxCp: 3733, pveScore: 88, dps: 26.27,
    bestFastMove: { name: "Smack Down", type: "Rock" },
    bestChargedMove: { name: "Rock Wrecker", type: "Rock" }
  },
  {
    name: "Mega Rayquaza (Rock)",
    pokedexId: 384,
    types: ["Dragon","Flying"],
    attack: 354, defense: 196, stamina: 213, maxCp: 6452, pveScore: 87, dps: 25.5,
    bestFastMove: { name: "Dragon Tail", type: "Dragon" },
    bestChargedMove: { name: "Ancient Power", type: "Rock" },
    isMega: true
  },
  {
    name: "Terrakion (Rock)",
    pokedexId: 639,
    types: ["Rock","Fighting"],
    attack: 260, defense: 192, stamina: 209, maxCp: 4227, pveScore: 85, dps: 24.91,
    bestFastMove: { name: "Smack Down", type: "Rock" },
    bestChargedMove: { name: "Rock Slide", type: "Rock" }
  },
  {
    name: "Rampardos",
    pokedexId: 409,
    types: ["Rock"],
    attack: 295, defense: 109, stamina: 219, maxCp: 3820, pveScore: 84, dps: 26.53,
    bestFastMove: { name: "Smack Down", type: "Rock" },
    bestChargedMove: { name: "Rock Slide", type: "Rock" }
  },
  {
    name: "Gigalith",
    pokedexId: 526,
    types: ["Rock"],
    attack: 226, defense: 201, stamina: 198, maxCp: 3374, pveScore: 82, dps: 24.66,
    bestFastMove: { name: "Lock-On", type: "Normal" },
    bestChargedMove: { name: "Meteor Beam", type: "Rock" }
  },
  {
    name: "Shadow Aggron",
    pokedexId: 306,
    types: ["Steel","Rock"],
    attack: 198, defense: 257, stamina: 172, maxCp: 3391, pveScore: 81, dps: 24.27,
    bestFastMove: { name: "Smack Down", type: "Rock" },
    bestChargedMove: { name: "Meteor Beam", type: "Rock" },
    isShadow: true
  },
  {
    name: "Tyrantrum",
    pokedexId: 697,
    types: ["Rock","Dragon"],
    attack: 227, defense: 191, stamina: 193, maxCp: 3536, pveScore: 79, dps: 24.15,
    bestFastMove: { name: "Rock Throw", type: "Rock" },
    bestChargedMove: { name: "Meteor Beam", type: "Rock" }
  },
  {
    name: "Tyranitar",
    pokedexId: 248,
    types: ["Rock","Dark"],
    attack: 251, defense: 207, stamina: 225, maxCp: 4335, pveScore: 78, dps: 23.15,
    bestFastMove: { name: "Smack Down", type: "Rock" },
    bestChargedMove: { name: "Stone Edge", type: "Rock" }
  },
  {
    name: "Shadow Aurorus",
    pokedexId: 699,
    types: ["Rock","Ice"],
    attack: 186, defense: 163, stamina: 265, maxCp: 3168, pveScore: 76, dps: 24.11,
    bestFastMove: { name: "Rock Throw", type: "Rock" },
    bestChargedMove: { name: "Meteor Beam", type: "Rock" },
    isShadow: true
  },
  {
    name: "Shadow Alolan Golem",
    pokedexId: 76,
    types: ["Rock","Ground"],
    attack: 211, defense: 198, stamina: 190, maxCp: 3334, pveScore: 75, dps: 23.74,
    bestFastMove: { name: "Rock Throw", type: "Rock" },
    bestChargedMove: { name: "Rock Blast", type: "Rock" },
    isShadow: true
  },
  {
    name: "Shadow Omastar",
    pokedexId: 139,
    types: ["Rock","Water"],
    attack: 207, defense: 201, stamina: 172, maxCp: 3150, pveScore: 73, dps: 23.9,
    bestFastMove: { name: "Rock Throw", type: "Rock" },
    bestChargedMove: { name: "Rock Slide", type: "Rock" },
    isShadow: true
  },
  {
    name: "Shadow Golem",
    pokedexId: 76,
    types: ["Rock","Ground"],
    attack: 211, defense: 198, stamina: 190, maxCp: 3334, pveScore: 72, dps: 23.56,
    bestFastMove: { name: "Rock Throw", type: "Rock" },
    bestChargedMove: { name: "Rock Blast", type: "Rock" },
    isShadow: true
  },
  // ─── BUG ───────────────────────────────────────────────────────────────
  {
    name: "Mega Heracross (Bug)",
    pokedexId: 214,
    types: ["Bug","Fighting"],
    attack: 304, defense: 203, stamina: 173, maxCp: 5410, pveScore: 100, dps: 30.42,
    bestFastMove: { name: "Fury Cutter", type: "Bug" },
    bestChargedMove: { name: "Megahorn", type: "Bug" },
    isMega: true
  },
  {
    name: "Mega Pinsir",
    pokedexId: 127,
    types: ["Bug","Flying"],
    attack: 278, defense: 210, stamina: 148, maxCp: 3961, pveScore: 99, dps: 27.36,
    bestFastMove: { name: "Fury Cutter", type: "Bug" },
    bestChargedMove: { name: "X-Scissor", type: "Bug" },
    isMega: true
  },
  {
    name: "Mega Scizor",
    pokedexId: 212,
    types: ["Bug","Steel"],
    attack: 279, defense: 277, stamina: 172, maxCp: 4889, pveScore: 97, dps: 25.25,
    bestFastMove: { name: "Fury Cutter", type: "Bug" },
    bestChargedMove: { name: "X-Scissor", type: "Bug" },
    isMega: true
  },
  {
    name: "Shadow Vikavolt",
    pokedexId: 738,
    types: ["Bug","Electric"],
    attack: 254, defense: 158, stamina: 184, maxCp: 3523, pveScore: 96, dps: 27.08,
    bestFastMove: { name: "Bug Bite", type: "Bug" },
    bestChargedMove: { name: "X-Scissor", type: "Bug" },
    isShadow: true
  },
  {
    name: "Shadow Scizor",
    pokedexId: 212,
    types: ["Bug","Steel"],
    attack: 236, defense: 181, stamina: 172, maxCp: 3001, pveScore: 94, dps: 25.79,
    bestFastMove: { name: "Fury Cutter", type: "Bug" },
    bestChargedMove: { name: "X-Scissor", type: "Bug" },
    isShadow: true
  },
  {
    name: "Volcarona",
    pokedexId: 637,
    types: ["Bug","Fire"],
    attack: 214, defense: 207, stamina: 172, maxCp: 3499, pveScore: 93, dps: 24.71,
    bestFastMove: { name: "Bug Bite", type: "Bug" },
    bestChargedMove: { name: "Bug Buzz", type: "Bug" }
  },
  {
    name: "Mega Beedrill (Bug)",
    pokedexId: 15,
    types: ["Bug","Poison"],
    attack: 303, defense: 148, stamina: 163, maxCp: 3770, pveScore: 91, dps: 26.24,
    bestFastMove: { name: "Bug Bite", type: "Bug" },
    bestChargedMove: { name: "X-Scissor", type: "Bug" },
    isMega: true
  },
  {
    name: "Shadow Pinsir",
    pokedexId: 127,
    types: ["Bug"],
    attack: 238, defense: 182, stamina: 163, maxCp: 3344, pveScore: 90, dps: 25.47,
    bestFastMove: { name: "Fury Cutter", type: "Bug" },
    bestChargedMove: { name: "X-Scissor", type: "Bug" },
    isShadow: true
  },
  {
    name: "Shadow Escavalier",
    pokedexId: 589,
    types: ["Bug","Steel"],
    attack: 223, defense: 187, stamina: 172, maxCp: 3265, pveScore: 88, dps: 24.19,
    bestFastMove: { name: "Bug Bite", type: "Bug" },
    bestChargedMove: { name: "Megahorn", type: "Bug" },
    isShadow: true
  },
  {
    name: "Shadow Metagross",
    pokedexId: 376,
    types: ["Steel","Psychic"],
    attack: 257, defense: 228, stamina: 190, maxCp: 4286, pveScore: 87, dps: 23.38,
    bestFastMove: { name: "Fury Cutter", type: "Bug" },
    bestChargedMove: { name: "Meteor Mash", type: "Steel" },
    isShadow: true
  },
  {
    name: "Mega Metagross",
    pokedexId: 376,
    types: ["Steel","Psychic"],
    attack: 257, defense: 247, stamina: 190, maxCp: 4671, pveScore: 85, dps: 22.57,
    bestFastMove: { name: "Fury Cutter", type: "Bug" },
    bestChargedMove: { name: "Meteor Mash", type: "Steel" },
    isMega: true
  },
  {
    name: "Genesect (Shock Drive)",
    pokedexId: 649,
    types: ["Bug","Steel"],
    attack: 252, defense: 199, stamina: 181, maxCp: 3913, pveScore: 84, dps: 23.05,
    bestFastMove: { name: "Fury Cutter", type: "Bug" },
    bestChargedMove: { name: "X-Scissor", type: "Bug" }
  },
  {
    name: "Genesect",
    pokedexId: 649,
    types: ["Bug","Steel"],
    attack: 252, defense: 199, stamina: 181, maxCp: 3913, pveScore: 82, dps: 23.05,
    bestFastMove: { name: "Fury Cutter", type: "Bug" },
    bestChargedMove: { name: "X-Scissor", type: "Bug" }
  },
  {
    name: "Genesect (Douse Drive)",
    pokedexId: 649,
    types: ["Bug","Steel"],
    attack: 252, defense: 199, stamina: 181, maxCp: 3913, pveScore: 81, dps: 23.05,
    bestFastMove: { name: "Fury Cutter", type: "Bug" },
    bestChargedMove: { name: "X-Scissor", type: "Bug" }
  },
  {
    name: "Genesect (Chill Drive)",
    pokedexId: 649,
    types: ["Bug","Steel"],
    attack: 252, defense: 199, stamina: 181, maxCp: 3913, pveScore: 79, dps: 23.05,
    bestFastMove: { name: "Fury Cutter", type: "Bug" },
    bestChargedMove: { name: "X-Scissor", type: "Bug" }
  },
  {
    name: "Genesect (Burn Drive)",
    pokedexId: 649,
    types: ["Bug","Steel"],
    attack: 252, defense: 199, stamina: 181, maxCp: 3913, pveScore: 78, dps: 23.05,
    bestFastMove: { name: "Fury Cutter", type: "Bug" },
    bestChargedMove: { name: "X-Scissor", type: "Bug" }
  },
  {
    name: "Kartana",
    pokedexId: 798,
    types: ["Grass","Steel"],
    attack: 323, defense: 241, stamina: 139, maxCp: 4768, pveScore: 76, dps: 23.84,
    bestFastMove: { name: "Fury Cutter", type: "Bug" },
    bestChargedMove: { name: "X-Scissor", type: "Bug" }
  },
  {
    name: "Mega Sceptile",
    pokedexId: 254,
    types: ["Grass","Dragon"],
    attack: 320, defense: 186, stamina: 172, maxCp: 5116, pveScore: 75, dps: 24.05,
    bestFastMove: { name: "Fury Cutter", type: "Bug" },
    bestChargedMove: { name: "Breaking Swipe", type: "Dragon" },
    isMega: true
  },
  {
    name: "Shadow Scyther",
    pokedexId: 123,
    types: ["Bug","Flying"],
    attack: 218, defense: 170, stamina: 172, maxCp: 3059, pveScore: 73, dps: 23.99,
    bestFastMove: { name: "Fury Cutter", type: "Bug" },
    bestChargedMove: { name: "Bug Buzz", type: "Bug" },
    isShadow: true
  },
  {
    name: "Vikavolt",
    pokedexId: 738,
    types: ["Bug","Electric"],
    attack: 254, defense: 201, stamina: 163, maxCp: 3803, pveScore: 72, dps: 22.99,
    bestFastMove: { name: "Bug Bite", type: "Bug" },
    bestChargedMove: { name: "X-Scissor", type: "Bug" }
  },
  // ─── GHOST ───────────────────────────────────────────────────────────────
  {
    name: "Dawn Wings Necrozma",
    pokedexId: 800,
    types: ["Psychic"],
    attack: 251, defense: 195, stamina: 219, maxCp: 4163, pveScore: 100, dps: 31.75,
    bestFastMove: { name: "Psycho Cut", type: "Psychic" },
    bestChargedMove: { name: "Moongeist Beam", type: "Ghost" }
  },
  {
    name: "Mega Mewtwo Y (Ghost)",
    pokedexId: 150,
    types: ["Psychic"],
    attack: 398, defense: 207, stamina: 214, maxCp: 7581, pveScore: 99, dps: 30.29,
    bestFastMove: { name: "Psycho Cut", type: "Psychic" },
    bestChargedMove: { name: "Shadow Ball", type: "Ghost" },
    isMega: true
  },
  {
    name: "Mega Gengar (Ghost)",
    pokedexId: 94,
    types: ["Ghost","Poison"],
    attack: 349, defense: 199, stamina: 155, maxCp: 4902, pveScore: 97, dps: 31.84,
    bestFastMove: { name: "Lick", type: "Ghost" },
    bestChargedMove: { name: "Shadow Ball", type: "Ghost" },
    isMega: true
  },
  {
    name: "Mega Mewtwo X (Ghost)",
    pokedexId: 150,
    types: ["Psychic","Fighting"],
    attack: 396, defense: 228, stamina: 214, maxCp: 7581, pveScore: 96, dps: 29.25,
    bestFastMove: { name: "Psycho Cut", type: "Psychic" },
    bestChargedMove: { name: "Shadow Ball", type: "Ghost" },
    isMega: true
  },
  {
    name: "Shadow Darkrai",
    pokedexId: 491,
    types: ["Dark"],
    attack: 285, defense: 198, stamina: 172, maxCp: 4227, pveScore: 94, dps: 29.36,
    bestFastMove: { name: "Snarl", type: "Dark" },
    bestChargedMove: { name: "Shadow Ball", type: "Ghost" },
    isShadow: true
  },
  {
    name: "Shadow Chandelure",
    pokedexId: 609,
    types: ["Ghost","Fire"],
    attack: 271, defense: 182, stamina: 155, maxCp: 3695, pveScore: 93, dps: 27.77,
    bestFastMove: { name: "Hex", type: "Ghost" },
    bestChargedMove: { name: "Shadow Ball", type: "Ghost" },
    isShadow: true
  },
  {
    name: "Mega Banette",
    pokedexId: 354,
    types: ["Ghost"],
    attack: 312, defense: 160, stamina: 162, maxCp: 4434, pveScore: 91, dps: 27.39,
    bestFastMove: { name: "Shadow Claw", type: "Ghost" },
    bestChargedMove: { name: "Shadow Ball", type: "Ghost" },
    isMega: true
  },
  {
    name: "Lunala",
    pokedexId: 792,
    types: ["Psychic","Ghost"],
    attack: 255, defense: 198, stamina: 264, maxCp: 4683, pveScore: 90, dps: 25.17,
    bestFastMove: { name: "Shadow Claw", type: "Ghost" },
    bestChargedMove: { name: "Shadow Ball", type: "Ghost" }
  },
  {
    name: "Shadow Mewtwo (Ghost)",
    pokedexId: 150,
    types: ["Psychic"],
    attack: 300, defense: 182, stamina: 214, maxCp: 4724, pveScore: 88, dps: 26.03,
    bestFastMove: { name: "Psycho Cut", type: "Psychic" },
    bestChargedMove: { name: "Shadow Ball", type: "Ghost" },
    isShadow: true
  },
  {
    name: "Black Kyurem",
    pokedexId: 646,
    types: ["Dragon","Ice"],
    attack: 246, defense: 170, stamina: 245, maxCp: 4041, pveScore: 87, dps: 25.15,
    bestFastMove: { name: "Shadow Claw", type: "Ghost" },
    bestChargedMove: { name: "Freeze Shock", type: "Ice" }
  },
  {
    name: "Darkrai",
    pokedexId: 491,
    types: ["Dark"],
    attack: 285, defense: 198, stamina: 172, maxCp: 4151, pveScore: 85, dps: 24.76,
    bestFastMove: { name: "Snarl", type: "Dark" },
    bestChargedMove: { name: "Shadow Ball", type: "Ghost" }
  },
  {
    name: "Mega Alakazam",
    pokedexId: 65,
    types: ["Psychic"],
    attack: 367, defense: 193, stamina: 146, maxCp: 5765, pveScore: 84, dps: 25.1,
    bestFastMove: { name: "Psycho Cut", type: "Psychic" },
    bestChargedMove: { name: "Shadow Ball", type: "Ghost" },
    isMega: true
  },
  {
    name: "Gholdengo",
    pokedexId: 1000,
    types: ["Steel","Ghost"],
    attack: 252, defense: 190, stamina: 202, maxCp: 3975, pveScore: 82, dps: 23.82,
    bestFastMove: { name: "Hex", type: "Ghost" },
    bestChargedMove: { name: "Shadow Ball", type: "Ghost" }
  },
  {
    name: "Dusk Mane Necrozma",
    pokedexId: 800,
    types: ["Psychic"],
    attack: 251, defense: 195, stamina: 219, maxCp: 4163, pveScore: 81, dps: 22.93,
    bestFastMove: { name: "Shadow Claw", type: "Ghost" },
    bestChargedMove: { name: "Sunsteel Strike", type: "Steel" }
  },
  {
    name: "Shadow Giratina (Altered Forme)",
    pokedexId: 487,
    types: ["Ghost","Dragon"],
    attack: 187, defense: 225, stamina: 284, maxCp: 3820, pveScore: 79, dps: 23.19,
    bestFastMove: { name: "Shadow Claw", type: "Ghost" },
    bestChargedMove: { name: "Shadow Force", type: "Ghost" },
    isShadow: true
  },
  {
    name: "Giratina (Origin Forme)",
    pokedexId: 487,
    types: ["Ghost","Dragon"],
    attack: 225, defense: 187, stamina: 284, maxCp: 4186, pveScore: 78, dps: 22.98,
    bestFastMove: { name: "Shadow Claw", type: "Ghost" },
    bestChargedMove: { name: "Shadow Force", type: "Ghost" }
  },
  {
    name: "Hoopa Unbound",
    pokedexId: 720,
    types: ["Psychic","Dark"],
    attack: 311, defense: 191, stamina: 200, maxCp: 4989, pveScore: 76, dps: 23.08,
    bestFastMove: { name: "Astonish", type: "Ghost" },
    bestChargedMove: { name: "Shadow Ball", type: "Ghost" }
  },
  {
    name: "Dragapult",
    pokedexId: 887,
    types: ["Dragon","Ghost"],
    attack: 236, defense: 179, stamina: 197, maxCp: 3665, pveScore: 75, dps: 23.85,
    bestFastMove: { name: "Astonish", type: "Ghost" },
    bestChargedMove: { name: "Shadow Ball", type: "Ghost" }
  },
  {
    name: "Mega Gardevoir",
    pokedexId: 282,
    types: ["Psychic","Fairy"],
    attack: 326, defense: 229, stamina: 168, maxCp: 5101, pveScore: 73, dps: 22.91,
    bestFastMove: { name: "Charm", type: "Fairy" },
    bestChargedMove: { name: "Shadow Ball", type: "Ghost" },
    isMega: true
  },
  {
    name: "Chandelure",
    pokedexId: 609,
    types: ["Ghost","Fire"],
    attack: 271, defense: 182, stamina: 155, maxCp: 3728, pveScore: 72, dps: 24.06,
    bestFastMove: { name: "Hex", type: "Ghost" },
    bestChargedMove: { name: "Shadow Ball", type: "Ghost" }
  },
  // ─── STEEL ───────────────────────────────────────────────────────────────
  {
    name: "Crowned Sword Zacian (Steel)",
    pokedexId: 888,
    types: ["Fairy"],
    attack: 254, defense: 236, stamina: 192, maxCp: 4329, pveScore: 100, dps: 34.93,
    bestFastMove: { name: "Metal Claw", type: "Steel" },
    bestChargedMove: { name: "Behemoth Blade", type: "Steel" }
  },
  {
    name: "Crowned Shield Zamazenta (Steel)",
    pokedexId: 889,
    types: ["Fighting","Steel"],
    attack: 250, defense: 292, stamina: 192, maxCp: 4716, pveScore: 99, dps: 34.09,
    bestFastMove: { name: "Metal Claw", type: "Steel" },
    bestChargedMove: { name: "Behemoth Bash", type: "Steel" }
  },
  {
    name: "Dusk Mane Necrozma (Steel)",
    pokedexId: 800,
    types: ["Psychic"],
    attack: 251, defense: 195, stamina: 219, maxCp: 4163, pveScore: 97, dps: 33.29,
    bestFastMove: { name: "Metal Claw", type: "Steel" },
    bestChargedMove: { name: "Sunsteel Strike", type: "Steel" }
  },
  {
    name: "Mega Metagross (Steel)",
    pokedexId: 376,
    types: ["Steel","Psychic"],
    attack: 257, defense: 247, stamina: 190, maxCp: 4671, pveScore: 96, dps: 28.61,
    bestFastMove: { name: "Bullet Punch", type: "Steel" },
    bestChargedMove: { name: "Meteor Mash", type: "Steel" },
    isMega: true
  },
  {
    name: "Shadow Metagross (Steel)",
    pokedexId: 376,
    types: ["Steel","Psychic"],
    attack: 257, defense: 228, stamina: 190, maxCp: 4286, pveScore: 94, dps: 29.46,
    bestFastMove: { name: "Bullet Punch", type: "Steel" },
    bestChargedMove: { name: "Meteor Mash", type: "Steel" },
    isShadow: true
  },
  {
    name: "Mega Lucario (Steel)",
    pokedexId: 448,
    types: ["Fighting","Steel"],
    attack: 310, defense: 175, stamina: 172, maxCp: 4595, pveScore: 93, dps: 29.71,
    bestFastMove: { name: "Force Palm", type: "Fighting" },
    bestChargedMove: { name: "Meteor Mash", type: "Steel" },
    isMega: true
  },
  {
    name: "Shadow Dialga",
    pokedexId: 483,
    types: ["Steel","Dragon"],
    attack: 275, defense: 211, stamina: 205, maxCp: 4565, pveScore: 91, dps: 26.27,
    bestFastMove: { name: "Metal Claw", type: "Steel" },
    bestChargedMove: { name: "Iron Head", type: "Steel" },
    isShadow: true
  },
  {
    name: "Metagross",
    pokedexId: 376,
    types: ["Steel","Psychic"],
    attack: 257, defense: 228, stamina: 190, maxCp: 4286, pveScore: 90, dps: 24.74,
    bestFastMove: { name: "Bullet Punch", type: "Steel" },
    bestChargedMove: { name: "Meteor Mash", type: "Steel" }
  },
  {
    name: "Shadow Excadrill (Steel)",
    pokedexId: 530,
    types: ["Ground","Steel"],
    attack: 255, defense: 129, stamina: 242, maxCp: 3741, pveScore: 88, dps: 24.49,
    bestFastMove: { name: "Metal Claw", type: "Steel" },
    bestChargedMove: { name: "Iron Head", type: "Steel" },
    isShadow: true
  },
  {
    name: "Dawn Wings Necrozma (Steel)",
    pokedexId: 800,
    types: ["Psychic"],
    attack: 251, defense: 195, stamina: 219, maxCp: 4163, pveScore: 87, dps: 23.28,
    bestFastMove: { name: "Metal Claw", type: "Steel" },
    bestChargedMove: { name: "Moongeist Beam", type: "Ghost" }
  },
  {
    name: "Tinkaton",
    pokedexId: 959,
    types: ["Fairy","Steel"],
    attack: 155, defense: 196, stamina: 198, maxCp: 2544, pveScore: 85, dps: 22.41,
    bestFastMove: { name: "Fairy Wind", type: "Fairy" },
    bestChargedMove: { name: "Gigaton Hammer", type: "Steel" }
  },
  {
    name: "Dialga",
    pokedexId: 483,
    types: ["Dragon","Steel"],
    attack: 275, defense: 211, stamina: 205, maxCp: 4565, pveScore: 84, dps: 22.14,
    bestFastMove: { name: "Metal Claw", type: "Steel" },
    bestChargedMove: { name: "Iron Head", type: "Steel" }
  },
  {
    name: "Origin Forme Dialga",
    pokedexId: 483,
    types: ["Dragon","Steel"],
    attack: 275, defense: 211, stamina: 205, maxCp: 4565, pveScore: 82, dps: 21.79,
    bestFastMove: { name: "Metal Claw", type: "Steel" },
    bestChargedMove: { name: "Iron Head", type: "Steel" }
  },
  {
    name: "Mega Skarmory (Steel)",
    pokedexId: 227,
    types: ["Steel","Flying"],
    attack: 148, defense: 226, stamina: 163, maxCp: 2383, pveScore: 81, dps: 21.82,
    bestFastMove: { name: "Steel Wing", type: "Steel" },
    bestChargedMove: { name: "Flash Cannon", type: "Steel" },
    isMega: true
  },
  {
    name: "Melmetal",
    pokedexId: 809,
    types: ["Steel"],
    attack: 226, defense: 190, stamina: 264, maxCp: 4069, pveScore: 79, dps: 21.08,
    bestFastMove: { name: "Thunder Shock", type: "Electric" },
    bestChargedMove: { name: "Double Iron Bash", type: "Steel" }
  },
  {
    name: "White Kyurem",
    pokedexId: 646,
    types: ["Dragon","Ice"],
    attack: 246, defense: 170, stamina: 245, maxCp: 4041, pveScore: 78, dps: 22.37,
    bestFastMove: { name: "Steel Wing", type: "Steel" },
    bestChargedMove: { name: "Ice Burn", type: "Ice" }
  },
  {
    name: "Mega Aggron",
    pokedexId: 306,
    types: ["Steel"],
    attack: 225, defense: 301, stamina: 157, maxCp: 3950, pveScore: 76, dps: 20.73,
    bestFastMove: { name: "Iron Tail", type: "Steel" },
    bestChargedMove: { name: "Heavy Slam", type: "Steel" },
    isMega: true
  },
  {
    name: "Genesect (Shock Drive) (Steel)",
    pokedexId: 649,
    types: ["Bug","Steel"],
    attack: 252, defense: 199, stamina: 181, maxCp: 3913, pveScore: 75, dps: 21.59,
    bestFastMove: { name: "Metal Claw", type: "Steel" },
    bestChargedMove: { name: "Magnet Bomb", type: "Steel" }
  },
  {
    name: "Genesect (Steel)",
    pokedexId: 649,
    types: ["Bug","Steel"],
    attack: 252, defense: 199, stamina: 181, maxCp: 3913, pveScore: 73, dps: 21.59,
    bestFastMove: { name: "Metal Claw", type: "Steel" },
    bestChargedMove: { name: "Magnet Bomb", type: "Steel" }
  },
  {
    name: "Genesect (Douse Drive) (Steel)",
    pokedexId: 649,
    types: ["Bug","Steel"],
    attack: 252, defense: 199, stamina: 181, maxCp: 3913, pveScore: 72, dps: 21.59,
    bestFastMove: { name: "Metal Claw", type: "Steel" },
    bestChargedMove: { name: "Magnet Bomb", type: "Steel" }
  },
  // ─── FIRE ───────────────────────────────────────────────────────────────
  {
    name: "Mega Charizard Y (Fire)",
    pokedexId: 6,
    types: ["Fire","Flying"],
    attack: 319, defense: 212, stamina: 186, maxCp: 5037, pveScore: 100, dps: 31.64,
    bestFastMove: { name: "Fire Spin", type: "Fire" },
    bestChargedMove: { name: "Blast Burn", type: "Fire" },
    isMega: true
  },
  {
    name: "Shadow Reshiram",
    pokedexId: 643,
    types: ["Dragon","Fire"],
    attack: 275, defense: 211, stamina: 205, maxCp: 4565, pveScore: 99, dps: 31.68,
    bestFastMove: { name: "Fire Fang", type: "Fire" },
    bestChargedMove: { name: "Fusion Flare", type: "Fire" },
    isShadow: true
  },
  {
    name: "Mega Blaziken (Fire)",
    pokedexId: 257,
    types: ["Fire","Fighting"],
    attack: 329, defense: 168, stamina: 190, maxCp: 5199, pveScore: 97, dps: 32.26,
    bestFastMove: { name: "Fire Spin", type: "Fire" },
    bestChargedMove: { name: "Blast Burn", type: "Fire" },
    isMega: true
  },
  {
    name: "Blacephalon",
    pokedexId: 806,
    types: ["Fire","Ghost"],
    attack: 307, defense: 128, stamina: 163, maxCp: 4292, pveScore: 96, dps: 31.95,
    bestFastMove: { name: "Incinerate", type: "Fire" },
    bestChargedMove: { name: "Mind Blown", type: "Fire" }
  },
  {
    name: "Shadow Heatran",
    pokedexId: 485,
    types: ["Fire","Steel"],
    attack: 251, defense: 213, stamina: 209, maxCp: 4244, pveScore: 94, dps: 28.92,
    bestFastMove: { name: "Fire Spin", type: "Fire" },
    bestChargedMove: { name: "Magma Storm", type: "Fire" },
    isShadow: true
  },
  {
    name: "Mega Charizard X",
    pokedexId: 6,
    types: ["Fire","Flying"],
    attack: 290, defense: 193, stamina: 169, maxCp: 5037, pveScore: 93, dps: 27.29,
    bestFastMove: { name: "Fire Spin", type: "Fire" },
    bestChargedMove: { name: "Blast Burn", type: "Fire" },
    isMega: true
  },
  {
    name: "Reshiram",
    pokedexId: 643,
    types: ["Dragon","Fire"],
    attack: 275, defense: 211, stamina: 205, maxCp: 4565, pveScore: 91, dps: 26.83,
    bestFastMove: { name: "Fire Fang", type: "Fire" },
    bestChargedMove: { name: "Fusion Flare", type: "Fire" }
  },
  {
    name: "Shadow Moltres (Fire)",
    pokedexId: 146,
    types: ["Fire","Flying"],
    attack: 251, defense: 181, stamina: 207, maxCp: 3854, pveScore: 90, dps: 27.04,
    bestFastMove: { name: "Fire Spin", type: "Fire" },
    bestChargedMove: { name: "Overheat", type: "Fire" },
    isShadow: true
  },
  {
    name: "Shadow Delphox",
    pokedexId: 655,
    types: ["Fire","Psychic"],
    attack: 230, defense: 189, stamina: 181, maxCp: 3458, pveScore: 88, dps: 27.34,
    bestFastMove: { name: "Fire Spin", type: "Fire" },
    bestChargedMove: { name: "Blast Burn", type: "Fire" },
    isShadow: true
  },
  {
    name: "Shadow Chandelure (Fire)",
    pokedexId: 609,
    types: ["Ghost","Fire"],
    attack: 271, defense: 182, stamina: 155, maxCp: 3695, pveScore: 87, dps: 27.54,
    bestFastMove: { name: "Fire Spin", type: "Fire" },
    bestChargedMove: { name: "Overheat", type: "Fire" },
    isShadow: true
  },
  {
    name: "Apex Shadow Ho-Oh",
    pokedexId: 250,
    types: ["Fire","Flying"],
    attack: 239, defense: 244, stamina: 214, maxCp: 4367, pveScore: 85, dps: 25.54,
    bestFastMove: { name: "Incinerate", type: "Fire" },
    bestChargedMove: { name: "Sacred Fire+", type: "Fire" }
  },
  {
    name: "Shadow Charizard",
    pokedexId: 6,
    types: ["Fire","Flying"],
    attack: 223, defense: 173, stamina: 186, maxCp: 3266, pveScore: 84, dps: 26.7,
    bestFastMove: { name: "Fire Spin", type: "Fire" },
    bestChargedMove: { name: "Blast Burn", type: "Fire" },
    isShadow: true
  },
  {
    name: "Shadow Entei",
    pokedexId: 244,
    types: ["Fire"],
    attack: 235, defense: 176, stamina: 230, maxCp: 3859, pveScore: 82, dps: 26.04,
    bestFastMove: { name: "Fire Spin", type: "Fire" },
    bestChargedMove: { name: "Overheat", type: "Fire" },
    isShadow: true
  },
  {
    name: "Shadow Blaziken (Fire)",
    pokedexId: 257,
    types: ["Fire","Fighting"],
    attack: 240, defense: 141, stamina: 190, maxCp: 3219, pveScore: 81, dps: 27.44,
    bestFastMove: { name: "Fire Spin", type: "Fire" },
    bestChargedMove: { name: "Blast Burn", type: "Fire" },
    isShadow: true
  },
  {
    name: "Shadow Emboar",
    pokedexId: 500,
    types: ["Fire","Fighting"],
    attack: 235, defense: 127, stamina: 242, maxCp: 3371, pveScore: 79, dps: 26.72,
    bestFastMove: { name: "Ember", type: "Fire" },
    bestChargedMove: { name: "Blast Burn", type: "Fire" },
    isShadow: true
  },
  {
    name: "Mega Mewtwo Y (Fire)",
    pokedexId: 150,
    types: ["Psychic"],
    attack: 398, defense: 207, stamina: 214, maxCp: 7581, pveScore: 78, dps: 24.98,
    bestFastMove: { name: "Psycho Cut", type: "Psychic" },
    bestChargedMove: { name: "Flamethrower", type: "Fire" },
    isMega: true
  },
  {
    name: "Standard Mode Shadow Darmanitan",
    pokedexId: 555,
    types: ["Fire"],
    attack: 263, defense: 114, stamina: 233, maxCp: 3562, pveScore: 76, dps: 26.69,
    bestFastMove: { name: "Fire Fang", type: "Fire" },
    bestChargedMove: { name: "Overheat", type: "Fire" }
  },
  {
    name: "Heatran",
    pokedexId: 485,
    types: ["Fire","Steel"],
    attack: 251, defense: 213, stamina: 209, maxCp: 4077, pveScore: 75, dps: 24.09,
    bestFastMove: { name: "Fire Spin", type: "Fire" },
    bestChargedMove: { name: "Magma Storm", type: "Fire" }
  },
  {
    name: "Shadow Ho-Oh",
    pokedexId: 250,
    types: ["Fire","Flying"],
    attack: 239, defense: 244, stamina: 214, maxCp: 4367, pveScore: 73, dps: 24.26,
    bestFastMove: { name: "Incinerate", type: "Fire" },
    bestChargedMove: { name: "Sacred Fire", type: "Fire" },
    isShadow: true
  },
  {
    name: "Mega Salamence (Fire)",
    pokedexId: 373,
    types: ["Dragon","Flying"],
    attack: 282, defense: 228, stamina: 197, maxCp: 4759, pveScore: 72, dps: 24.22,
    bestFastMove: { name: "Fire Fang", type: "Fire" },
    bestChargedMove: { name: "Fly", type: "Flying" },
    isMega: true
  },
  // ─── WATER ───────────────────────────────────────────────────────────────
  {
    name: "Primal Kyogre",
    pokedexId: 382,
    types: ["Water"],
    attack: 353, defense: 268, stamina: 205, maxCp: 6439, pveScore: 100, dps: 32.39,
    bestFastMove: { name: "Waterfall", type: "Water" },
    bestChargedMove: { name: "Origin Pulse", type: "Water" },
    isPrimal: true
  },
  {
    name: "Mega Swampert (Water)",
    pokedexId: 260,
    types: ["Water","Ground"],
    attack: 283, defense: 218, stamina: 225, maxCp: 4826, pveScore: 99, dps: 29.15,
    bestFastMove: { name: "Water Gun", type: "Water" },
    bestChargedMove: { name: "Hydro Cannon", type: "Water" },
    isMega: true
  },
  {
    name: "Shadow Kyogre",
    pokedexId: 382,
    types: ["Water"],
    attack: 270, defense: 228, stamina: 205, maxCp: 4652, pveScore: 97, dps: 28.97,
    bestFastMove: { name: "Waterfall", type: "Water" },
    bestChargedMove: { name: "Origin Pulse", type: "Water" },
    isShadow: true
  },
  {
    name: "Mega Blastoise",
    pokedexId: 9,
    types: ["Water"],
    attack: 264, defense: 237, stamina: 188, maxCp: 4594, pveScore: 96, dps: 26.79,
    bestFastMove: { name: "Water Gun", type: "Water" },
    bestChargedMove: { name: "Hydro Cannon", type: "Water" },
    isMega: true
  },
  {
    name: "Mega Gyarados",
    pokedexId: 130,
    types: ["Water","Dark"],
    attack: 292, defense: 247, stamina: 216, maxCp: 5332, pveScore: 94, dps: 25.09,
    bestFastMove: { name: "Waterfall", type: "Water" },
    bestChargedMove: { name: "Hydro Pump", type: "Water" },
    isMega: true
  },
  {
    name: "Shadow Swampert",
    pokedexId: 260,
    types: ["Water","Ground"],
    attack: 208, defense: 175, stamina: 225, maxCp: 3362, pveScore: 93, dps: 25.69,
    bestFastMove: { name: "Water Gun", type: "Water" },
    bestChargedMove: { name: "Hydro Cannon", type: "Water" },
    isShadow: true
  },
  {
    name: "Kyogre",
    pokedexId: 382,
    types: ["Water"],
    attack: 270, defense: 228, stamina: 205, maxCp: 4652, pveScore: 91, dps: 24.71,
    bestFastMove: { name: "Waterfall", type: "Water" },
    bestChargedMove: { name: "Origin Pulse", type: "Water" }
  },
  {
    name: "Shadow Feraligatr",
    pokedexId: 160,
    types: ["Water"],
    attack: 205, defense: 188, stamina: 198, maxCp: 3230, pveScore: 90, dps: 24.79,
    bestFastMove: { name: "Water Gun", type: "Water" },
    bestChargedMove: { name: "Hydro Cannon", type: "Water" },
    isShadow: true
  },
  {
    name: "Shadow Kingler",
    pokedexId: 99,
    types: ["Water"],
    attack: 240, defense: 181, stamina: 146, maxCp: 3198, pveScore: 88, dps: 26.07,
    bestFastMove: { name: "Bubble", type: "Water" },
    bestChargedMove: { name: "Crabhammer", type: "Water" },
    isShadow: true
  },
  {
    name: "Shadow Samurott",
    pokedexId: 503,
    types: ["Water"],
    attack: 212, defense: 157, stamina: 216, maxCp: 3194, pveScore: 87, dps: 24.96,
    bestFastMove: { name: "Waterfall", type: "Water" },
    bestChargedMove: { name: "Hydro Cannon", type: "Water" },
    isShadow: true
  },
  {
    name: "Shadow Greninja",
    pokedexId: 658,
    types: ["Water","Dark"],
    attack: 223, defense: 152, stamina: 176, maxCp: 3001, pveScore: 85, dps: 26.02,
    bestFastMove: { name: "Water Shuriken", type: "Water" },
    bestChargedMove: { name: "Hydro Cannon", type: "Water" },
    isShadow: true
  },
  {
    name: "Shadow Gyarados",
    pokedexId: 130,
    types: ["Water","Flying"],
    attack: 237, defense: 186, stamina: 216, maxCp: 3833, pveScore: 84, dps: 23.9,
    bestFastMove: { name: "Waterfall", type: "Water" },
    bestChargedMove: { name: "Hydro Pump", type: "Water" },
    isShadow: true
  },
  {
    name: "Primarina",
    pokedexId: 730,
    types: ["Water","Fairy"],
    attack: 232, defense: 195, stamina: 190, maxCp: 3618, pveScore: 82, dps: 23.25,
    bestFastMove: { name: "Waterfall", type: "Water" },
    bestChargedMove: { name: "Hydro Cannon", type: "Water" }
  },
  {
    name: "Quaquaval",
    pokedexId: 914,
    types: ["Water","Fighting"],
    attack: 236, defense: 159, stamina: 198, maxCp: 3411, pveScore: 81, dps: 23.74,
    bestFastMove: { name: "Water Gun", type: "Water" },
    bestChargedMove: { name: "Hydro Cannon", type: "Water" }
  },
  {
    name: "Shadow Palkia",
    pokedexId: 484,
    types: ["Water","Dragon"],
    attack: 280, defense: 215, stamina: 189, maxCp: 4511, pveScore: 79, dps: 23.13,
    bestFastMove: { name: "Dragon Tail", type: "Dragon" },
    bestChargedMove: { name: "Aqua Tail", type: "Water" },
    isShadow: true
  },
  {
    name: "Inteleon",
    pokedexId: 818,
    types: ["Water"],
    attack: 226, defense: 148, stamina: 176, maxCp: 3002, pveScore: 78, dps: 24.67,
    bestFastMove: { name: "Water Gun", type: "Water" },
    bestChargedMove: { name: "Snipe Shot", type: "Water" }
  },
  {
    name: "Shadow Empoleon",
    pokedexId: 395,
    types: ["Water","Steel"],
    attack: 210, defense: 186, stamina: 197, maxCp: 3279, pveScore: 76, dps: 23.99,
    bestFastMove: { name: "Waterfall", type: "Water" },
    bestChargedMove: { name: "Hydro Cannon", type: "Water" },
    isShadow: true
  },
  {
    name: "Swampert",
    pokedexId: 260,
    types: ["Water","Ground"],
    attack: 208, defense: 175, stamina: 225, maxCp: 3362, pveScore: 75, dps: 21.87,
    bestFastMove: { name: "Water Gun", type: "Water" },
    bestChargedMove: { name: "Hydro Cannon", type: "Water" }
  },
  {
    name: "Shadow Rhyperior (Water)",
    pokedexId: 464,
    types: ["Ground","Rock"],
    attack: 241, defense: 190, stamina: 251, maxCp: 4220, pveScore: 73, dps: 22.04,
    bestFastMove: { name: "Mud-Slap", type: "Ground" },
    bestChargedMove: { name: "Surf", type: "Water" },
    isShadow: true
  },
  {
    name: "Greninja",
    pokedexId: 658,
    types: ["Water","Dark"],
    attack: 223, defense: 152, stamina: 176, maxCp: 3081, pveScore: 72, dps: 22.91,
    bestFastMove: { name: "Water Shuriken", type: "Water" },
    bestChargedMove: { name: "Hydro Cannon", type: "Water" }
  },
  // ─── GRASS ───────────────────────────────────────────────────────────────
  {
    name: "Mega Sceptile (Grass)",
    pokedexId: 254,
    types: ["Grass","Dragon"],
    attack: 320, defense: 186, stamina: 172, maxCp: 5116, pveScore: 100, dps: 30.07,
    bestFastMove: { name: "Fury Cutter", type: "Bug" },
    bestChargedMove: { name: "Frenzy Plant", type: "Grass" },
    isMega: true
  },
  {
    name: "Mega Venusaur (Grass)",
    pokedexId: 3,
    types: ["Grass","Poison"],
    attack: 241, defense: 246, stamina: 190, maxCp: 4285, pveScore: 99, dps: 25.38,
    bestFastMove: { name: "Vine Whip", type: "Grass" },
    bestChargedMove: { name: "Frenzy Plant", type: "Grass" },
    isMega: true
  },
  {
    name: "Kartana (Grass)",
    pokedexId: 798,
    types: ["Grass","Steel"],
    attack: 323, defense: 241, stamina: 139, maxCp: 4768, pveScore: 97, dps: 27.03,
    bestFastMove: { name: "Razor Leaf", type: "Grass" },
    bestChargedMove: { name: "Leaf Blade", type: "Grass" }
  },
  {
    name: "Shadow Chesnaught",
    pokedexId: 652,
    types: ["Grass","Fighting"],
    attack: 201, defense: 204, stamina: 204, maxCp: 3339, pveScore: 96, dps: 25.47,
    bestFastMove: { name: "Vine Whip", type: "Grass" },
    bestChargedMove: { name: "Frenzy Plant", type: "Grass" },
    isShadow: true
  },
  {
    name: "Zarude",
    pokedexId: 893,
    types: ["Dark","Grass"],
    attack: 242, defense: 188, stamina: 223, maxCp: 3844, pveScore: 94, dps: 24.25,
    bestFastMove: { name: "Vine Whip", type: "Grass" },
    bestChargedMove: { name: "Power Whip", type: "Grass" }
  },
  {
    name: "Shaymin (Sky Forme)",
    pokedexId: 492,
    types: ["Grass","Flying"],
    attack: 261, defense: 166, stamina: 225, maxCp: 3827, pveScore: 93, dps: 25,
    bestFastMove: { name: "Magical Leaf", type: "Grass" },
    bestChargedMove: { name: "Grass Knot", type: "Grass" }
  },
  {
    name: "Shadow Tangrowth",
    pokedexId: 465,
    types: ["Grass"],
    attack: 207, defense: 184, stamina: 270, maxCp: 3586, pveScore: 91, dps: 24.69,
    bestFastMove: { name: "Vine Whip", type: "Grass" },
    bestChargedMove: { name: "Power Whip", type: "Grass" },
    isShadow: true
  },
  {
    name: "Shadow Venusaur",
    pokedexId: 3,
    types: ["Grass","Poison"],
    attack: 198, defense: 189, stamina: 190, maxCp: 3075, pveScore: 90, dps: 24.58,
    bestFastMove: { name: "Vine Whip", type: "Grass" },
    bestChargedMove: { name: "Frenzy Plant", type: "Grass" },
    isShadow: true
  },
  {
    name: "Mega Victreebel (Grass)",
    pokedexId: 71,
    types: ["Grass","Poison"],
    attack: 207, defense: 135, stamina: 190, maxCp: 2748, pveScore: 88, dps: 23.99,
    bestFastMove: { name: "Magical Leaf", type: "Grass" },
    bestChargedMove: { name: "Leaf Blade", type: "Grass" },
    isMega: true
  },
  {
    name: "Rillaboom",
    pokedexId: 812,
    types: ["Grass"],
    attack: 239, defense: 168, stamina: 225, maxCp: 3758, pveScore: 87, dps: 23.65,
    bestFastMove: { name: "Razor Leaf", type: "Grass" },
    bestChargedMove: { name: "Frenzy Plant", type: "Grass" }
  },
  {
    name: "Shadow Sceptile",
    pokedexId: 254,
    types: ["Grass"],
    attack: 223, defense: 169, stamina: 172, maxCp: 3116, pveScore: 85, dps: 24.28,
    bestFastMove: { name: "Fury Cutter", type: "Bug" },
    bestChargedMove: { name: "Frenzy Plant", type: "Grass" },
    isShadow: true
  },
  {
    name: "Mega Gallade (Grass)",
    pokedexId: 475,
    types: ["Psychic","Fighting"],
    attack: 297, defense: 209, stamina: 154, maxCp: 4285, pveScore: 84, dps: 22.39,
    bestFastMove: { name: "Low Kick", type: "Fighting" },
    bestChargedMove: { name: "Leaf Blade", type: "Grass" },
    isMega: true
  },
  {
    name: "Xurkitree",
    pokedexId: 796,
    types: ["Electric"],
    attack: 330, defense: 144, stamina: 195, maxCp: 4897, pveScore: 82, dps: 23.57,
    bestFastMove: { name: "Thunder Shock", type: "Electric" },
    bestChargedMove: { name: "Power Whip", type: "Grass" }
  },
  {
    name: "Chesnaught",
    pokedexId: 652,
    types: ["Grass","Fighting"],
    attack: 201, defense: 204, stamina: 239, maxCp: 3616, pveScore: 81, dps: 21.58,
    bestFastMove: { name: "Vine Whip", type: "Grass" },
    bestChargedMove: { name: "Frenzy Plant", type: "Grass" }
  },
  {
    name: "Tapu Bulu",
    pokedexId: 787,
    types: ["Grass","Fairy"],
    attack: 249, defense: 215, stamina: 172, maxCp: 3865, pveScore: 79, dps: 21.76,
    bestFastMove: { name: "Bullet Seed", type: "Grass" },
    bestChargedMove: { name: "Grass Knot", type: "Grass" }
  },
  {
    name: "Shadow Torterra",
    pokedexId: 389,
    types: ["Grass","Ground"],
    attack: 202, defense: 188, stamina: 216, maxCp: 3317, pveScore: 78, dps: 22.71,
    bestFastMove: { name: "Razor Leaf", type: "Grass" },
    bestChargedMove: { name: "Frenzy Plant", type: "Grass" },
    isShadow: true
  },
  {
    name: "Roserade (Grass)",
    pokedexId: 407,
    types: ["Grass","Poison"],
    attack: 243, defense: 185, stamina: 155, maxCp: 3354, pveScore: 76, dps: 22.27,
    bestFastMove: { name: "Magical Leaf", type: "Grass" },
    bestChargedMove: { name: "Grass Knot", type: "Grass" }
  },
  {
    name: "Decidueye",
    pokedexId: 724,
    types: ["Grass","Ghost"],
    attack: 210, defense: 179, stamina: 186, maxCp: 3149, pveScore: 75, dps: 21.6,
    bestFastMove: { name: "Magical Leaf", type: "Grass" },
    bestChargedMove: { name: "Frenzy Plant", type: "Grass" }
  },
  {
    name: "Meowscarada",
    pokedexId: 908,
    types: ["Grass","Dark"],
    attack: 233, defense: 153, stamina: 183, maxCp: 3193, pveScore: 73, dps: 22.12,
    bestFastMove: { name: "Leafage", type: "Grass" },
    bestChargedMove: { name: "Frenzy Plant", type: "Grass" }
  },
  {
    name: "Mega Latios (Grass)",
    pokedexId: 381,
    types: ["Dragon","Psychic"],
    attack: 335, defense: 241, stamina: 188, maxCp: 5661, pveScore: 72, dps: 20.74,
    bestFastMove: { name: "Dragon Breath", type: "Dragon" },
    bestChargedMove: { name: "Solar Beam", type: "Grass" },
    isMega: true
  },
  // ─── ELECTRIC ───────────────────────────────────────────────────────────────
  {
    name: "Mega Mewtwo Y (Electric)",
    pokedexId: 150,
    types: ["Psychic"],
    attack: 398, defense: 207, stamina: 214, maxCp: 7581, pveScore: 100, dps: 27.75,
    bestFastMove: { name: "Psycho Cut", type: "Psychic" },
    bestChargedMove: { name: "Thunderbolt", type: "Electric" },
    isMega: true
  },
  {
    name: "Zeraora",
    pokedexId: 807,
    types: ["Electric"],
    attack: 252, defense: 177, stamina: 204, maxCp: 3865, pveScore: 99, dps: 27.23,
    bestFastMove: { name: "Volt Switch", type: "Electric" },
    bestChargedMove: { name: "Plasma Fists", type: "Electric" }
  },
  {
    name: "Mega Mewtwo X (Electric)",
    pokedexId: 150,
    types: ["Psychic","Fighting"],
    attack: 396, defense: 228, stamina: 214, maxCp: 7581, pveScore: 97, dps: 26.65,
    bestFastMove: { name: "Psycho Cut", type: "Psychic" },
    bestChargedMove: { name: "Thunderbolt", type: "Electric" },
    isMega: true
  },
  {
    name: "Shadow Raikou (Electric)",
    pokedexId: 243,
    types: ["Electric"],
    attack: 241, defense: 195, stamina: 207, maxCp: 4073, pveScore: 96, dps: 27.13,
    bestFastMove: { name: "Thunder Shock", type: "Electric" },
    bestChargedMove: { name: "Wild Charge", type: "Electric" },
    isShadow: true
  },
  {
    name: "Zekrom",
    pokedexId: 644,
    types: ["Dragon","Electric"],
    attack: 275, defense: 211, stamina: 205, maxCp: 4565, pveScore: 94, dps: 25.16,
    bestFastMove: { name: "Charge Beam", type: "Electric" },
    bestChargedMove: { name: "Wild Charge", type: "Electric" }
  },
  {
    name: "Xurkitree (Electric)",
    pokedexId: 796,
    types: ["Electric"],
    attack: 330, defense: 144, stamina: 195, maxCp: 4897, pveScore: 93, dps: 26.72,
    bestFastMove: { name: "Thunder Shock", type: "Electric" },
    bestChargedMove: { name: "Discharge", type: "Electric" }
  },
  {
    name: "Mega Manectric",
    pokedexId: 310,
    types: ["Electric"],
    attack: 300, defense: 179, stamina: 163, maxCp: 4048, pveScore: 91, dps: 26.29,
    bestFastMove: { name: "Thunder Fang", type: "Electric" },
    bestChargedMove: { name: "Wild Charge", type: "Electric" },
    isMega: true
  },
  {
    name: "Shadow Thundurus (Therian Forme)",
    pokedexId: 642,
    types: ["Electric","Flying"],
    attack: 266, defense: 164, stamina: 188, maxCp: 3781, pveScore: 90, dps: 27,
    bestFastMove: { name: "Volt Switch", type: "Electric" },
    bestChargedMove: { name: "Thunderbolt", type: "Electric" },
    isShadow: true
  },
  {
    name: "Shadow Zapdos (Electric)",
    pokedexId: 145,
    types: ["Electric","Flying"],
    attack: 253, defense: 185, stamina: 207, maxCp: 3987, pveScore: 88, dps: 25.72,
    bestFastMove: { name: "Thunder Shock", type: "Electric" },
    bestChargedMove: { name: "Thunderbolt", type: "Electric" },
    isShadow: true
  },
  {
    name: "Shadow Magnezone",
    pokedexId: 462,
    types: ["Electric","Steel"],
    attack: 238, defense: 205, stamina: 172, maxCp: 3623, pveScore: 87, dps: 25.24,
    bestFastMove: { name: "Volt Switch", type: "Electric" },
    bestChargedMove: { name: "Wild Charge", type: "Electric" },
    isShadow: true
  },
  {
    name: "Mega Ampharos",
    pokedexId: 181,
    types: ["Electric","Dragon"],
    attack: 268, defense: 185, stamina: 188, maxCp: 4025, pveScore: 85, dps: 23.79,
    bestFastMove: { name: "Volt Switch", type: "Electric" },
    bestChargedMove: { name: "Zap Cannon", type: "Electric" },
    isMega: true
  },
  {
    name: "Shadow Electivire",
    pokedexId: 466,
    types: ["Electric"],
    attack: 249, defense: 163, stamina: 181, maxCp: 3492, pveScore: 84, dps: 25.85,
    bestFastMove: { name: "Thunder Shock", type: "Electric" },
    bestChargedMove: { name: "Wild Charge", type: "Electric" },
    isShadow: true
  },
  {
    name: "Thundurus (Therian Forme)",
    pokedexId: 642,
    types: ["Electric","Flying"],
    attack: 295, defense: 161, stamina: 188, maxCp: 4304, pveScore: 82, dps: 24.53,
    bestFastMove: { name: "Volt Switch", type: "Electric" },
    bestChargedMove: { name: "Wildbolt Storm", type: "Electric" }
  },
  {
    name: "Regieleki",
    pokedexId: 894,
    types: ["Electric"],
    attack: 250, defense: 125, stamina: 190, maxCp: 3169, pveScore: 81, dps: 25.18,
    bestFastMove: { name: "Lock-On", type: "Normal" },
    bestChargedMove: { name: "Thunder Cage", type: "Electric" }
  },
  {
    name: "Raikou",
    pokedexId: 243,
    types: ["Electric"],
    attack: 241, defense: 195, stamina: 207, maxCp: 4073, pveScore: 79, dps: 23.16,
    bestFastMove: { name: "Thunder Shock", type: "Electric" },
    bestChargedMove: { name: "Wild Charge", type: "Electric" }
  },
  {
    name: "Shadow Mewtwo (Electric)",
    pokedexId: 150,
    types: ["Psychic"],
    attack: 300, defense: 182, stamina: 214, maxCp: 4724, pveScore: 78, dps: 23.13,
    bestFastMove: { name: "Psycho Cut", type: "Psychic" },
    bestChargedMove: { name: "Thunderbolt", type: "Electric" },
    isShadow: true
  },
  {
    name: "Zapdos",
    pokedexId: 145,
    types: ["Electric","Flying"],
    attack: 253, defense: 185, stamina: 207, maxCp: 3987, pveScore: 76, dps: 22.05,
    bestFastMove: { name: "Thunder Shock", type: "Electric" },
    bestChargedMove: { name: "Thunderbolt", type: "Electric" }
  },
  {
    name: "Electivire",
    pokedexId: 466,
    types: ["Electric"],
    attack: 249, defense: 163, stamina: 181, maxCp: 3492, pveScore: 75, dps: 22.71,
    bestFastMove: { name: "Thunder Shock", type: "Electric" },
    bestChargedMove: { name: "Wild Charge", type: "Electric" }
  },
  {
    name: "Black Kyurem (Electric)",
    pokedexId: 646,
    types: ["Dragon","Ice"],
    attack: 246, defense: 170, stamina: 245, maxCp: 4041, pveScore: 73, dps: 21.44,
    bestFastMove: { name: "Dragon Tail", type: "Dragon" },
    bestChargedMove: { name: "Fusion Bolt", type: "Electric" }
  },
  {
    name: "Magnezone",
    pokedexId: 462,
    types: ["Electric","Steel"],
    attack: 238, defense: 205, stamina: 172, maxCp: 3576, pveScore: 72, dps: 21.69,
    bestFastMove: { name: "Volt Switch", type: "Electric" },
    bestChargedMove: { name: "Wild Charge", type: "Electric" }
  },
  // ─── PSYCHIC ───────────────────────────────────────────────────────────────
  {
    name: "Mega Mewtwo Y (Psychic)",
    pokedexId: 150,
    types: ["Psychic"],
    attack: 398, defense: 207, stamina: 214, maxCp: 7581, pveScore: 100, dps: 42.04,
    bestFastMove: { name: "Confusion", type: "Psychic" },
    bestChargedMove: { name: "Psystrike", type: "Psychic" },
    isMega: true
  },
  {
    name: "Mega Mewtwo X (Psychic)",
    pokedexId: 150,
    types: ["Psychic","Fighting"],
    attack: 396, defense: 228, stamina: 214, maxCp: 7581, pveScore: 99, dps: 40.63,
    bestFastMove: { name: "Confusion", type: "Psychic" },
    bestChargedMove: { name: "Psystrike", type: "Psychic" },
    isMega: true
  },
  {
    name: "Shadow Mewtwo (Psychic)",
    pokedexId: 150,
    types: ["Psychic"],
    attack: 300, defense: 182, stamina: 214, maxCp: 4724, pveScore: 97, dps: 35.64,
    bestFastMove: { name: "Psycho Cut", type: "Psychic" },
    bestChargedMove: { name: "Psystrike", type: "Psychic" },
    isShadow: true
  },
  {
    name: "Mega Alakazam (Psychic)",
    pokedexId: 65,
    types: ["Psychic"],
    attack: 367, defense: 193, stamina: 146, maxCp: 5765, pveScore: 96, dps: 32.5,
    bestFastMove: { name: "Confusion", type: "Psychic" },
    bestChargedMove: { name: "Psychic", type: "Psychic" },
    isMega: true
  },
  {
    name: "Mega Latios (Psychic)",
    pokedexId: 381,
    types: ["Dragon","Psychic"],
    attack: 335, defense: 241, stamina: 188, maxCp: 5661, pveScore: 94, dps: 30.05,
    bestFastMove: { name: "Zen Headbutt", type: "Psychic" },
    bestChargedMove: { name: "Psychic", type: "Psychic" },
    isMega: true
  },
  {
    name: "Mewtwo (Psychic)",
    pokedexId: 150,
    types: ["Psychic"],
    attack: 300, defense: 182, stamina: 214, maxCp: 4724, pveScore: 93, dps: 30.48,
    bestFastMove: { name: "Psycho Cut", type: "Psychic" },
    bestChargedMove: { name: "Psystrike", type: "Psychic" }
  },
  {
    name: "Mega Gardevoir (Psychic)",
    pokedexId: 282,
    types: ["Psychic","Fairy"],
    attack: 326, defense: 229, stamina: 168, maxCp: 5101, pveScore: 91, dps: 30.24,
    bestFastMove: { name: "Confusion", type: "Psychic" },
    bestChargedMove: { name: "Psychic", type: "Psychic" },
    isMega: true
  },
  {
    name: "Mega Gallade (Psychic)",
    pokedexId: 475,
    types: ["Psychic","Fighting"],
    attack: 297, defense: 209, stamina: 154, maxCp: 4285, pveScore: 90, dps: 30.18,
    bestFastMove: { name: "Confusion", type: "Psychic" },
    bestChargedMove: { name: "Psychic", type: "Psychic" },
    isMega: true
  },
  {
    name: "Mega Metagross (Psychic)",
    pokedexId: 376,
    types: ["Steel","Psychic"],
    attack: 257, defense: 247, stamina: 190, maxCp: 4671, pveScore: 88, dps: 27.22,
    bestFastMove: { name: "Zen Headbutt", type: "Psychic" },
    bestChargedMove: { name: "Psychic", type: "Psychic" },
    isMega: true
  },
  {
    name: "Shadow Latios",
    pokedexId: 381,
    types: ["Dragon","Psychic"],
    attack: 268, defense: 212, stamina: 190, maxCp: 4310, pveScore: 87, dps: 28.47,
    bestFastMove: { name: "Zen Headbutt", type: "Psychic" },
    bestChargedMove: { name: "Psychic", type: "Psychic" },
    isShadow: true
  },
  {
    name: "Shadow Metagross (Psychic)",
    pokedexId: 376,
    types: ["Steel","Psychic"],
    attack: 257, defense: 228, stamina: 190, maxCp: 4286, pveScore: 85, dps: 27.81,
    bestFastMove: { name: "Zen Headbutt", type: "Psychic" },
    bestChargedMove: { name: "Psychic", type: "Psychic" },
    isShadow: true
  },
  {
    name: "Mega Latias",
    pokedexId: 380,
    types: ["Dragon","Psychic"],
    attack: 289, defense: 297, stamina: 188, maxCp: 5428, pveScore: 84, dps: 26.28,
    bestFastMove: { name: "Zen Headbutt", type: "Psychic" },
    bestChargedMove: { name: "Psychic", type: "Psychic" },
    isMega: true
  },
  {
    name: "Dusk Mane Necrozma (Psychic)",
    pokedexId: 800,
    types: ["Psychic"],
    attack: 251, defense: 195, stamina: 219, maxCp: 4163, pveScore: 82, dps: 26.25,
    bestFastMove: { name: "Psycho Cut", type: "Psychic" },
    bestChargedMove: { name: "Sunsteel Strike", type: "Steel" }
  },
  {
    name: "Hoopa Unbound (Psychic)",
    pokedexId: 720,
    types: ["Psychic","Dark"],
    attack: 311, defense: 191, stamina: 200, maxCp: 4989, pveScore: 81, dps: 28.06,
    bestFastMove: { name: "Confusion", type: "Psychic" },
    bestChargedMove: { name: "Psychic", type: "Psychic" }
  },
  {
    name: "Apex Shadow Lugia (Psychic)",
    pokedexId: 249,
    types: ["Psychic","Flying"],
    attack: 193, defense: 310, stamina: 235, maxCp: 4186, pveScore: 79, dps: 25.51,
    bestFastMove: { name: "Extrasensory", type: "Psychic" },
    bestChargedMove: { name: "Aeroblast+", type: "Flying" }
  },
  {
    name: "Dawn Wings Necrozma (Psychic)",
    pokedexId: 800,
    types: ["Psychic"],
    attack: 251, defense: 195, stamina: 219, maxCp: 4163, pveScore: 78, dps: 25.99,
    bestFastMove: { name: "Psycho Cut", type: "Psychic" },
    bestChargedMove: { name: "Moongeist Beam", type: "Ghost" }
  },
  {
    name: "Lunala (Psychic)",
    pokedexId: 792,
    types: ["Psychic","Ghost"],
    attack: 255, defense: 198, stamina: 264, maxCp: 4683, pveScore: 76, dps: 25.29,
    bestFastMove: { name: "Confusion", type: "Psychic" },
    bestChargedMove: { name: "Psychic", type: "Psychic" }
  },
  {
    name: "Galarian Articuno (Psychic)",
    pokedexId: 144,
    types: ["Ice","Flying"],
    attack: 192, defense: 236, stamina: 207, maxCp: 3537, pveScore: 75, dps: 25.38,
    bestFastMove: { name: "Psycho Cut", type: "Psychic" },
    bestChargedMove: { name: "Fly", type: "Flying" }
  },
  {
    name: "Shadow Lugia (Psychic)",
    pokedexId: 249,
    types: ["Psychic","Flying"],
    attack: 193, defense: 310, stamina: 235, maxCp: 4185, pveScore: 73, dps: 24.37,
    bestFastMove: { name: "Extrasensory", type: "Psychic" },
    bestChargedMove: { name: "Fly", type: "Flying" },
    isShadow: true
  },
  {
    name: "Shadow Regigigas (Psychic)",
    pokedexId: 486,
    types: ["Normal"],
    attack: 287, defense: 210, stamina: 221, maxCp: 4913, pveScore: 72, dps: 26.11,
    bestFastMove: { name: "Zen Headbutt", type: "Psychic" },
    bestChargedMove: { name: "Crush Grip", type: "Normal" },
    isShadow: true
  },
  // ─── ICE ───────────────────────────────────────────────────────────────
  {
    name: "White Kyurem (Ice)",
    pokedexId: 646,
    types: ["Dragon","Ice"],
    attack: 246, defense: 170, stamina: 245, maxCp: 4041, pveScore: 100, dps: 35.54,
    bestFastMove: { name: "Ice Fang", type: "Ice" },
    bestChargedMove: { name: "Ice Burn", type: "Ice" }
  },
  {
    name: "Black Kyurem (Ice)",
    pokedexId: 646,
    types: ["Dragon","Ice"],
    attack: 246, defense: 170, stamina: 245, maxCp: 4041, pveScore: 99, dps: 32.26,
    bestFastMove: { name: "Dragon Tail", type: "Dragon" },
    bestChargedMove: { name: "Freeze Shock", type: "Ice" }
  },
  {
    name: "Mega Mewtwo Y (Ice)",
    pokedexId: 150,
    types: ["Psychic"],
    attack: 398, defense: 207, stamina: 214, maxCp: 7581, pveScore: 97, dps: 30.79,
    bestFastMove: { name: "Psycho Cut", type: "Psychic" },
    bestChargedMove: { name: "Ice Beam", type: "Ice" },
    isMega: true
  },
  {
    name: "Mega Mewtwo X (Ice)",
    pokedexId: 150,
    types: ["Psychic","Fighting"],
    attack: 396, defense: 228, stamina: 214, maxCp: 7581, pveScore: 96, dps: 29.76,
    bestFastMove: { name: "Psycho Cut", type: "Psychic" },
    bestChargedMove: { name: "Ice Beam", type: "Ice" },
    isMega: true
  },
  {
    name: "Shadow Mamoswine (Ice)",
    pokedexId: 473,
    types: ["Ice","Ground"],
    attack: 247, defense: 146, stamina: 242, maxCp: 3763, pveScore: 94, dps: 27.86,
    bestFastMove: { name: "Powder Snow", type: "Ice" },
    bestChargedMove: { name: "Avalanche", type: "Ice" },
    isShadow: true
  },
  {
    name: "Mega Gardevoir (Ice)",
    pokedexId: 282,
    types: ["Psychic","Fairy"],
    attack: 326, defense: 229, stamina: 168, maxCp: 5101, pveScore: 93, dps: 25.83,
    bestFastMove: { name: "Charm", type: "Fairy" },
    bestChargedMove: { name: "Triple Axel", type: "Ice" },
    isMega: true
  },
  {
    name: "Crowned Shield Zamazenta (Ice)",
    pokedexId: 889,
    types: ["Fighting","Steel"],
    attack: 250, defense: 292, stamina: 192, maxCp: 4716, pveScore: 91, dps: 24.83,
    bestFastMove: { name: "Ice Fang", type: "Ice" },
    bestChargedMove: { name: "Behemoth Bash", type: "Steel" }
  },
  {
    name: "Shadow Mewtwo (Ice)",
    pokedexId: 150,
    types: ["Psychic"],
    attack: 300, defense: 182, stamina: 214, maxCp: 4724, pveScore: 90, dps: 26.34,
    bestFastMove: { name: "Psycho Cut", type: "Psychic" },
    bestChargedMove: { name: "Ice Beam", type: "Ice" },
    isShadow: true
  },
  {
    name: "Baxcalibur",
    pokedexId: 998,
    types: ["Dragon","Ice"],
    attack: 254, defense: 168, stamina: 251, maxCp: 4082, pveScore: 88, dps: 25.39,
    bestFastMove: { name: "Ice Fang", type: "Ice" },
    bestChargedMove: { name: "Avalanche", type: "Ice" }
  },
  {
    name: "Primal Kyogre (Ice)",
    pokedexId: 382,
    types: ["Water"],
    attack: 353, defense: 268, stamina: 205, maxCp: 6439, pveScore: 87, dps: 24.14,
    bestFastMove: { name: "Waterfall", type: "Water" },
    bestChargedMove: { name: "Avalanche", type: "Ice" },
    isPrimal: true
  },
  {
    name: "Mega Abomasnow",
    pokedexId: 460,
    types: ["Grass","Ice"],
    attack: 240, defense: 191, stamina: 207, maxCp: 4061, pveScore: 85, dps: 24.79,
    bestFastMove: { name: "Powder Snow", type: "Ice" },
    bestChargedMove: { name: "Weather Ball", type: "Ice" },
    isMega: true
  },
  {
    name: "Shadow Weavile",
    pokedexId: 461,
    types: ["Dark","Ice"],
    attack: 243, defense: 171, stamina: 172, maxCp: 3365, pveScore: 84, dps: 26.03,
    bestFastMove: { name: "Ice Shard", type: "Ice" },
    bestChargedMove: { name: "Triple Axel", type: "Ice" },
    isShadow: true
  },
  {
    name: "Mamoswine",
    pokedexId: 473,
    types: ["Ice","Ground"],
    attack: 247, defense: 146, stamina: 242, maxCp: 3763, pveScore: 82, dps: 24.22,
    bestFastMove: { name: "Powder Snow", type: "Ice" },
    bestChargedMove: { name: "Avalanche", type: "Ice" }
  },
  {
    name: "Shadow Articuno",
    pokedexId: 144,
    types: ["Ice","Flying"],
    attack: 192, defense: 236, stamina: 207, maxCp: 3537, pveScore: 81, dps: 23.39,
    bestFastMove: { name: "Frost Breath", type: "Ice" },
    bestChargedMove: { name: "Triple Axel", type: "Ice" },
    isShadow: true
  },
  {
    name: "Mega Glalie",
    pokedexId: 362,
    types: ["Ice"],
    attack: 252, defense: 168, stamina: 190, maxCp: 3651, pveScore: 79, dps: 24.3,
    bestFastMove: { name: "Frost Breath", type: "Ice" },
    bestChargedMove: { name: "Avalanche", type: "Ice" },
    isMega: true
  },
  {
    name: "Kyurem",
    pokedexId: 646,
    types: ["Dragon","Ice"],
    attack: 246, defense: 170, stamina: 245, maxCp: 4041, pveScore: 78, dps: 23.35,
    bestFastMove: { name: "Dragon Breath", type: "Dragon" },
    bestChargedMove: { name: "Glaciate", type: "Ice" }
  },
  {
    name: "Galarian Standard Mode Darmanitan",
    pokedexId: 555,
    types: ["Fire"],
    attack: 263, defense: 114, stamina: 233, maxCp: 3562, pveScore: 76, dps: 24.56,
    bestFastMove: { name: "Ice Fang", type: "Ice" },
    bestChargedMove: { name: "Avalanche", type: "Ice" }
  },
  {
    name: "Shadow Mr. Rime",
    pokedexId: 866,
    types: ["Ice","Psychic"],
    attack: 212, defense: 179, stamina: 190, maxCp: 3196, pveScore: 75, dps: 24.19,
    bestFastMove: { name: "Ice Shard", type: "Ice" },
    bestChargedMove: { name: "Triple Axel", type: "Ice" },
    isShadow: true
  },
  {
    name: "Shadow Aurorus (Ice)",
    pokedexId: 699,
    types: ["Rock","Ice"],
    attack: 186, defense: 163, stamina: 265, maxCp: 3168, pveScore: 73, dps: 23.74,
    bestFastMove: { name: "Frost Breath", type: "Ice" },
    bestChargedMove: { name: "Weather Ball", type: "Ice" },
    isShadow: true
  },
  {
    name: "Cetitan",
    pokedexId: 975,
    types: ["Ice"],
    attack: 208, defense: 123, stamina: 347, maxCp: 3519, pveScore: 72, dps: 22.44,
    bestFastMove: { name: "Ice Shard", type: "Ice" },
    bestChargedMove: { name: "Avalanche", type: "Ice" }
  },
  // ─── DRAGON ───────────────────────────────────────────────────────────────
  {
    name: "Mega Rayquaza (Dragon)",
    pokedexId: 384,
    types: ["Dragon","Flying"],
    attack: 354, defense: 196, stamina: 213, maxCp: 6452, pveScore: 100, dps: 36.7,
    bestFastMove: { name: "Dragon Tail", type: "Dragon" },
    bestChargedMove: { name: "Breaking Swipe", type: "Dragon" },
    isMega: true
  },
  {
    name: "Eternatus (Dragon)",
    pokedexId: 890,
    types: ["Dragon","Poison"],
    attack: 278, defense: 192, stamina: 255, maxCp: 5020, pveScore: 99, dps: 36.26,
    bestFastMove: { name: "Dragon Tail", type: "Dragon" },
    bestChargedMove: { name: "Dynamax Cannon", type: "Dragon" }
  },
  {
    name: "Black Kyurem (Dragon)",
    pokedexId: 646,
    types: ["Dragon","Ice"],
    attack: 246, defense: 170, stamina: 245, maxCp: 4041, pveScore: 97, dps: 33.96,
    bestFastMove: { name: "Dragon Tail", type: "Dragon" },
    bestChargedMove: { name: "Freeze Shock", type: "Ice" }
  },
  {
    name: "Mega Garchomp (Dragon)",
    pokedexId: 445,
    types: ["Dragon","Ground"],
    attack: 339, defense: 222, stamina: 239, maxCp: 6132, pveScore: 96, dps: 33.33,
    bestFastMove: { name: "Dragon Tail", type: "Dragon" },
    bestChargedMove: { name: "Breaking Swipe", type: "Dragon" },
    isMega: true
  },
  {
    name: "White Kyurem (Dragon)",
    pokedexId: 646,
    types: ["Dragon","Ice"],
    attack: 246, defense: 170, stamina: 245, maxCp: 4041, pveScore: 94, dps: 31.63,
    bestFastMove: { name: "Dragon Breath", type: "Dragon" },
    bestChargedMove: { name: "Ice Burn", type: "Ice" }
  },
  {
    name: "Shadow Garchomp (Dragon)",
    pokedexId: 445,
    types: ["Dragon","Ground"],
    attack: 261, defense: 193, stamina: 239, maxCp: 4478, pveScore: 93, dps: 30.76,
    bestFastMove: { name: "Dragon Tail", type: "Dragon" },
    bestChargedMove: { name: "Breaking Swipe", type: "Dragon" },
    isShadow: true
  },
  {
    name: "Mega Salamence (Dragon)",
    pokedexId: 373,
    types: ["Dragon","Flying"],
    attack: 282, defense: 228, stamina: 197, maxCp: 4759, pveScore: 91, dps: 28.69,
    bestFastMove: { name: "Dragon Tail", type: "Dragon" },
    bestChargedMove: { name: "Draco Meteor", type: "Dragon" },
    isMega: true
  },
  {
    name: "Shadow Haxorus",
    pokedexId: 612,
    types: ["Dragon"],
    attack: 284, defense: 172, stamina: 183, maxCp: 4062, pveScore: 90, dps: 31.17,
    bestFastMove: { name: "Dragon Tail", type: "Dragon" },
    bestChargedMove: { name: "Breaking Swipe", type: "Dragon" },
    isShadow: true
  },
  {
    name: "Shadow Dialga (Dragon)",
    pokedexId: 483,
    types: ["Steel","Dragon"],
    attack: 275, defense: 211, stamina: 205, maxCp: 4565, pveScore: 88, dps: 28.44,
    bestFastMove: { name: "Dragon Breath", type: "Dragon" },
    bestChargedMove: { name: "Draco Meteor", type: "Dragon" },
    isShadow: true
  },
  {
    name: "Mega Dragonite (Dragon)",
    pokedexId: 149,
    types: ["Dragon","Flying"],
    attack: 263, defense: 198, stamina: 209, maxCp: 4287, pveScore: 87, dps: 27.64,
    bestFastMove: { name: "Dragon Tail", type: "Dragon" },
    bestChargedMove: { name: "Draco Meteor", type: "Dragon" },
    isMega: true
  },
  {
    name: "Origin Forme Dialga (Dragon)",
    pokedexId: 483,
    types: ["Dragon","Steel"],
    attack: 275, defense: 211, stamina: 205, maxCp: 4565, pveScore: 85, dps: 27.17,
    bestFastMove: { name: "Dragon Breath", type: "Dragon" },
    bestChargedMove: { name: "Roar of Time", type: "Dragon" }
  },
  {
    name: "Shadow Palkia (Dragon)",
    pokedexId: 484,
    types: ["Water","Dragon"],
    attack: 280, defense: 215, stamina: 189, maxCp: 4511, pveScore: 84, dps: 29.13,
    bestFastMove: { name: "Dragon Tail", type: "Dragon" },
    bestChargedMove: { name: "Draco Meteor", type: "Dragon" },
    isShadow: true
  },
  {
    name: "Shadow Salamence (Dragon)",
    pokedexId: 373,
    types: ["Dragon","Flying"],
    attack: 277, defense: 168, stamina: 216, maxCp: 4239, pveScore: 82, dps: 29.52,
    bestFastMove: { name: "Dragon Tail", type: "Dragon" },
    bestChargedMove: { name: "Outrage", type: "Dragon" },
    isShadow: true
  },
  {
    name: "Origin Forme Palkia",
    pokedexId: 484,
    types: ["Dragon","Water"],
    attack: 280, defense: 215, stamina: 189, maxCp: 4438, pveScore: 81, dps: 28.03,
    bestFastMove: { name: "Dragon Tail", type: "Dragon" },
    bestChargedMove: { name: "Spacial Rend", type: "Dragon" }
  },
  {
    name: "Baxcalibur (Dragon)",
    pokedexId: 998,
    types: ["Dragon","Ice"],
    attack: 254, defense: 168, stamina: 251, maxCp: 4082, pveScore: 79, dps: 28.44,
    bestFastMove: { name: "Ice Fang", type: "Ice" },
    bestChargedMove: { name: "Glaive Rush", type: "Dragon" }
  },
  {
    name: "Shadow Dragonite (Dragon)",
    pokedexId: 149,
    types: ["Dragon","Flying"],
    attack: 263, defense: 198, stamina: 209, maxCp: 4287, pveScore: 78, dps: 28.53,
    bestFastMove: { name: "Dragon Tail", type: "Dragon" },
    bestChargedMove: { name: "Outrage", type: "Dragon" },
    isShadow: true
  },
  {
    name: "Mega Latios (Dragon)",
    pokedexId: 381,
    types: ["Dragon","Psychic"],
    attack: 335, defense: 241, stamina: 188, maxCp: 5661, pveScore: 76, dps: 27.45,
    bestFastMove: { name: "Dragon Breath", type: "Dragon" },
    bestChargedMove: { name: "Dragon Claw", type: "Dragon" },
    isMega: true
  },
  {
    name: "Regidrago",
    pokedexId: 895,
    types: ["Dragon"],
    attack: 202, defense: 101, stamina: 400, maxCp: 3361, pveScore: 75, dps: 27.31,
    bestFastMove: { name: "Dragon Breath", type: "Dragon" },
    bestChargedMove: { name: "Dragon Energy", type: "Dragon" }
  },
  {
    name: "Rayquaza (Dragon)",
    pokedexId: 384,
    types: ["Dragon","Flying"],
    attack: 284, defense: 170, stamina: 213, maxCp: 4336, pveScore: 73, dps: 27.64,
    bestFastMove: { name: "Dragon Tail", type: "Dragon" },
    bestChargedMove: { name: "Breaking Swipe", type: "Dragon" }
  },
  {
    name: "Primal Groudon (Dragon)",
    pokedexId: 383,
    types: ["Ground","Fire"],
    attack: 353, defense: 268, stamina: 205, maxCp: 6439, pveScore: 72, dps: 26.02,
    bestFastMove: { name: "Dragon Tail", type: "Dragon" },
    bestChargedMove: { name: "Precipice Blades", type: "Ground" },
    isPrimal: true
  },
  // ─── DARK ───────────────────────────────────────────────────────────────
  {
    name: "Mega Tyranitar (Dark)",
    pokedexId: 248,
    types: ["Rock","Dark"],
    attack: 309, defense: 276, stamina: 225, maxCp: 5765, pveScore: 100, dps: 29.34,
    bestFastMove: { name: "Bite", type: "Dark" },
    bestChargedMove: { name: "Brutal Swing", type: "Dark" },
    isMega: true
  },
  {
    name: "Shadow Tyranitar (Dark)",
    pokedexId: 248,
    types: ["Rock","Dark"],
    attack: 251, defense: 207, stamina: 225, maxCp: 4335, pveScore: 99, dps: 29.25,
    bestFastMove: { name: "Bite", type: "Dark" },
    bestChargedMove: { name: "Brutal Swing", type: "Dark" },
    isShadow: true
  },
  {
    name: "Shadow Hydreigon",
    pokedexId: 635,
    types: ["Dark","Dragon"],
    attack: 256, defense: 188, stamina: 211, maxCp: 4098, pveScore: 97, dps: 29.64,
    bestFastMove: { name: "Bite", type: "Dark" },
    bestChargedMove: { name: "Brutal Swing", type: "Dark" },
    isShadow: true
  },
  {
    name: "Shadow Darkrai (Dark)",
    pokedexId: 491,
    types: ["Dark"],
    attack: 285, defense: 198, stamina: 172, maxCp: 4227, pveScore: 96, dps: 29.93,
    bestFastMove: { name: "Snarl", type: "Dark" },
    bestChargedMove: { name: "Shadow Ball", type: "Ghost" },
    isShadow: true
  },
  {
    name: "Mega Absol",
    pokedexId: 359,
    types: ["Dark"],
    attack: 314, defense: 130, stamina: 163, maxCp: 3731, pveScore: 94, dps: 30.49,
    bestFastMove: { name: "Snarl", type: "Dark" },
    bestChargedMove: { name: "Brutal Swing", type: "Dark" },
    isMega: true
  },
  {
    name: "Mega Gengar (Dark)",
    pokedexId: 94,
    types: ["Ghost","Poison"],
    attack: 349, defense: 199, stamina: 155, maxCp: 4902, pveScore: 93, dps: 30.35,
    bestFastMove: { name: "Sucker Punch", type: "Dark" },
    bestChargedMove: { name: "Shadow Ball", type: "Ghost" },
    isMega: true
  },
  {
    name: "Mega Houndoom",
    pokedexId: 229,
    types: ["Dark","Fire"],
    attack: 289, defense: 194, stamina: 181, maxCp: 4344, pveScore: 91, dps: 26.9,
    bestFastMove: { name: "Snarl", type: "Dark" },
    bestChargedMove: { name: "Foul Play", type: "Dark" },
    isMega: true
  },
  {
    name: "Shadow Absol",
    pokedexId: 359,
    types: ["Dark"],
    attack: 246, defense: 120, stamina: 163, maxCp: 2856, pveScore: 90, dps: 27.92,
    bestFastMove: { name: "Snarl", type: "Dark" },
    bestChargedMove: { name: "Brutal Swing", type: "Dark" },
    isShadow: true
  },
  {
    name: "Mega Salamence (Dark)",
    pokedexId: 373,
    types: ["Dragon","Flying"],
    attack: 282, defense: 228, stamina: 197, maxCp: 4759, pveScore: 88, dps: 24.87,
    bestFastMove: { name: "Bite", type: "Dark" },
    bestChargedMove: { name: "Brutal Swing", type: "Dark" },
    isMega: true
  },
  {
    name: "Darkrai (Dark)",
    pokedexId: 491,
    types: ["Dark"],
    attack: 285, defense: 198, stamina: 172, maxCp: 4151, pveScore: 87, dps: 25.16,
    bestFastMove: { name: "Snarl", type: "Dark" },
    bestChargedMove: { name: "Shadow Ball", type: "Ghost" }
  },
  {
    name: "Shadow Weavile (Dark)",
    pokedexId: 461,
    types: ["Dark","Ice"],
    attack: 243, defense: 171, stamina: 172, maxCp: 3365, pveScore: 85, dps: 26.55,
    bestFastMove: { name: "Snarl", type: "Dark" },
    bestChargedMove: { name: "Foul Play", type: "Dark" },
    isShadow: true
  },
  {
    name: "Hydreigon",
    pokedexId: 635,
    types: ["Dragon","Dark"],
    attack: 256, defense: 188, stamina: 211, maxCp: 4098, pveScore: 84, dps: 24.82,
    bestFastMove: { name: "Bite", type: "Dark" },
    bestChargedMove: { name: "Brutal Swing", type: "Dark" }
  },
  {
    name: "Tyranitar (Dark)",
    pokedexId: 248,
    types: ["Rock","Dark"],
    attack: 251, defense: 207, stamina: 225, maxCp: 4335, pveScore: 82, dps: 24.41,
    bestFastMove: { name: "Bite", type: "Dark" },
    bestChargedMove: { name: "Brutal Swing", type: "Dark" }
  },
  {
    name: "Shadow Salamence (Dark)",
    pokedexId: 373,
    types: ["Dragon","Flying"],
    attack: 277, defense: 168, stamina: 216, maxCp: 4239, pveScore: 81, dps: 26.38,
    bestFastMove: { name: "Bite", type: "Dark" },
    bestChargedMove: { name: "Brutal Swing", type: "Dark" },
    isShadow: true
  },
  {
    name: "Mega Gyarados (Dark)",
    pokedexId: 130,
    types: ["Water","Dark"],
    attack: 292, defense: 247, stamina: 216, maxCp: 5332, pveScore: 79, dps: 23.47,
    bestFastMove: { name: "Bite", type: "Dark" },
    bestChargedMove: { name: "Crunch", type: "Dark" },
    isMega: true
  },
  {
    name: "Shadow Houndoom",
    pokedexId: 229,
    types: ["Dark","Fire"],
    attack: 224, defense: 144, stamina: 181, maxCp: 2978, pveScore: 78, dps: 24.85,
    bestFastMove: { name: "Snarl", type: "Dark" },
    bestChargedMove: { name: "Foul Play", type: "Dark" },
    isShadow: true
  },
  {
    name: "Kingambit",
    pokedexId: 983,
    types: ["Dark","Steel"],
    attack: 238, defense: 196, stamina: 200, maxCp: 3736, pveScore: 76, dps: 22.76,
    bestFastMove: { name: "Snarl", type: "Dark" },
    bestChargedMove: { name: "Foul Play", type: "Dark" }
  },
  {
    name: "Shadow Honchkrow",
    pokedexId: 430,
    types: ["Dark","Flying"],
    attack: 243, defense: 103, stamina: 225, maxCp: 3065, pveScore: 75, dps: 24.78,
    bestFastMove: { name: "Snarl", type: "Dark" },
    bestChargedMove: { name: "Dark Pulse", type: "Dark" },
    isShadow: true
  },
  {
    name: "Incineroar",
    pokedexId: 727,
    types: ["Fire","Dark"],
    attack: 207, defense: 175, stamina: 216, maxCp: 3320, pveScore: 73, dps: 22.51,
    bestFastMove: { name: "Snarl", type: "Dark" },
    bestChargedMove: { name: "Darkest Lariat", type: "Dark" }
  },
  {
    name: "Yveltal (Dark)",
    pokedexId: 717,
    types: ["Dark","Flying"],
    attack: 250, defense: 185, stamina: 246, maxCp: 4290, pveScore: 72, dps: 22.19,
    bestFastMove: { name: "Snarl", type: "Dark" },
    bestChargedMove: { name: "Dark Pulse", type: "Dark" }
  },
  // ─── FAIRY ───────────────────────────────────────────────────────────────
  {
    name: "Mega Gardevoir (Fairy)",
    pokedexId: 282,
    types: ["Psychic","Fairy"],
    attack: 326, defense: 229, stamina: 168, maxCp: 5101, pveScore: 100, dps: 30.09,
    bestFastMove: { name: "Charm", type: "Fairy" },
    bestChargedMove: { name: "Dazzling Gleam", type: "Fairy" },
    isMega: true
  },
  {
    name: "Crowned Sword Zacian (Fairy)",
    pokedexId: 888,
    types: ["Fairy"],
    attack: 254, defense: 236, stamina: 192, maxCp: 4329, pveScore: 99, dps: 27.26,
    bestFastMove: { name: "Metal Claw", type: "Steel" },
    bestChargedMove: { name: "Play Rough", type: "Fairy" }
  },
  {
    name: "Enamorus (Incarnate Forme) (Fairy)",
    pokedexId: 905,
    types: ["Fairy","Flying"],
    attack: 250, defense: 201, stamina: 179, maxCp: 3811, pveScore: 97, dps: 25.85,
    bestFastMove: { name: "Fairy Wind", type: "Fairy" },
    bestChargedMove: { name: "Dazzling Gleam", type: "Fairy" }
  },
  {
    name: "Shadow Gardevoir",
    pokedexId: 282,
    types: ["Psychic","Fairy"],
    attack: 237, defense: 195, stamina: 168, maxCp: 3497, pveScore: 96, dps: 26.27,
    bestFastMove: { name: "Charm", type: "Fairy" },
    bestChargedMove: { name: "Dazzling Gleam", type: "Fairy" },
    isShadow: true
  },
  {
    name: "Mega Alakazam (Fairy)",
    pokedexId: 65,
    types: ["Psychic"],
    attack: 367, defense: 193, stamina: 146, maxCp: 5765, pveScore: 94, dps: 25.18,
    bestFastMove: { name: "Psycho Cut", type: "Psychic" },
    bestChargedMove: { name: "Dazzling Gleam", type: "Fairy" },
    isMega: true
  },
  {
    name: "Tapu Lele",
    pokedexId: 786,
    types: ["Psychic","Fairy"],
    attack: 259, defense: 208, stamina: 172, maxCp: 4038, pveScore: 93, dps: 23.61,
    bestFastMove: { name: "Astonish", type: "Ghost" },
    bestChargedMove: { name: "Nature's Madness", type: "Fairy" }
  },
  {
    name: "Xerneas (Fairy)",
    pokedexId: 716,
    types: ["Fairy"],
    attack: 250, defense: 185, stamina: 246, maxCp: 4275, pveScore: 91, dps: 22.94,
    bestFastMove: { name: "Geomancy", type: "Fairy" },
    bestChargedMove: { name: "Moonblast", type: "Fairy" }
  },
  {
    name: "Tapu Koko",
    pokedexId: 785,
    types: ["Electric","Fairy"],
    attack: 250, defense: 181, stamina: 172, maxCp: 3912, pveScore: 90, dps: 23.68,
    bestFastMove: { name: "Quick Attack", type: "Normal" },
    bestChargedMove: { name: "Nature's Madness", type: "Fairy" }
  },
  {
    name: "Tapu Bulu (Fairy)",
    pokedexId: 787,
    types: ["Grass","Fairy"],
    attack: 249, defense: 215, stamina: 172, maxCp: 3865, pveScore: 88, dps: 22.82,
    bestFastMove: { name: "Bullet Seed", type: "Grass" },
    bestChargedMove: { name: "Nature's Madness", type: "Fairy" }
  },
  {
    name: "Mega Latias (Fairy)",
    pokedexId: 380,
    types: ["Dragon","Psychic"],
    attack: 289, defense: 297, stamina: 188, maxCp: 5428, pveScore: 87, dps: 22.03,
    bestFastMove: { name: "Charm", type: "Fairy" },
    bestChargedMove: { name: "Outrage", type: "Dragon" },
    isMega: true
  },
  {
    name: "Shadow Granbull",
    pokedexId: 210,
    types: ["Fairy"],
    attack: 212, defense: 131, stamina: 207, maxCp: 2885, pveScore: 85, dps: 23.54,
    bestFastMove: { name: "Charm", type: "Fairy" },
    bestChargedMove: { name: "Play Rough", type: "Fairy" },
    isShadow: true
  },
  {
    name: "Enamorus (Therian Forme) (Fairy)",
    pokedexId: 905,
    types: ["Fairy","Flying"],
    attack: 250, defense: 201, stamina: 179, maxCp: 3811, pveScore: 84, dps: 21.97,
    bestFastMove: { name: "Fairy Wind", type: "Fairy" },
    bestChargedMove: { name: "Fly", type: "Flying" }
  },
  {
    name: "Togekiss",
    pokedexId: 468,
    types: ["Fairy","Flying"],
    attack: 225, defense: 217, stamina: 198, maxCp: 3767, pveScore: 82, dps: 21.55,
    bestFastMove: { name: "Charm", type: "Fairy" },
    bestChargedMove: { name: "Dazzling Gleam", type: "Fairy" }
  },
  {
    name: "Gardevoir",
    pokedexId: 282,
    types: ["Psychic","Fairy"],
    attack: 237, defense: 195, stamina: 168, maxCp: 3497, pveScore: 81, dps: 22.19,
    bestFastMove: { name: "Charm", type: "Fairy" },
    bestChargedMove: { name: "Dazzling Gleam", type: "Fairy" }
  },
  {
    name: "Zacian (Hero of Many Battles)",
    pokedexId: 888,
    types: ["Fairy"],
    attack: 254, defense: 236, stamina: 192, maxCp: 4329, pveScore: 79, dps: 21.12,
    bestFastMove: { name: "Snarl", type: "Dark" },
    bestChargedMove: { name: "Play Rough", type: "Fairy" }
  },
  {
    name: "Xurkitree (Fairy)",
    pokedexId: 796,
    types: ["Electric"],
    attack: 330, defense: 144, stamina: 195, maxCp: 4897, pveScore: 78, dps: 22.83,
    bestFastMove: { name: "Thunder Shock", type: "Electric" },
    bestChargedMove: { name: "Dazzling Gleam", type: "Fairy" }
  },
  {
    name: "Hatterene",
    pokedexId: 858,
    types: ["Psychic","Fairy"],
    attack: 237, defense: 182, stamina: 149, maxCp: 3198, pveScore: 76, dps: 21.74,
    bestFastMove: { name: "Charm", type: "Fairy" },
    bestChargedMove: { name: "Dazzling Gleam", type: "Fairy" }
  },
  {
    name: "Mega Gallade (Fairy)",
    pokedexId: 475,
    types: ["Psychic","Fighting"],
    attack: 297, defense: 209, stamina: 154, maxCp: 4285, pveScore: 75, dps: 21.38,
    bestFastMove: { name: "Charm", type: "Fairy" },
    bestChargedMove: { name: "Psychic", type: "Psychic" },
    isMega: true
  },
  {
    name: "Shadow Ursaluna (Fairy)",
    pokedexId: 901,
    types: ["Ground","Normal"],
    attack: 243, defense: 181, stamina: 277, maxCp: 4357, pveScore: 73, dps: 21.05,
    bestFastMove: { name: "Tackle", type: "Normal" },
    bestChargedMove: { name: "Play Rough", type: "Fairy" },
    isShadow: true
  },
  {
    name: "Shadow Latias",
    pokedexId: 380,
    types: ["Dragon","Psychic"],
    attack: 228, defense: 246, stamina: 190, maxCp: 3968, pveScore: 72, dps: 20.9,
    bestFastMove: { name: "Charm", type: "Fairy" },
    bestChargedMove: { name: "Outrage", type: "Dragon" },
    isShadow: true
  }
];
