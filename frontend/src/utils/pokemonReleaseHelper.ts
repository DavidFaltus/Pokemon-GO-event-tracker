import type { PokemonRankData } from '../data/pokemonRankings';

// Explicit set of unreleased Pokemon IDs from Gens 1-7 (National Dex #1 to #809)
const UNRELEASED_GEN_1_TO_7_IDS = new Set<number>([
  489, // Phione
  490, // Manaphy
  493, // Arceus
  679, 680, 681, // Honedge, Doublade, Aegislash
  721, // Volcanion
  772, 773, // Type: Null, Silvally
  774, // Minior
  778, // Mimikyu (Costume only, base species unreleased)
  801, // Magearna
  807, // Zeraora
]);

// Explicit set of ACTUALLY RELEASED Pokemon IDs in Gen 8 (Galar & Hisui) in Pokemon GO
const RELEASED_GEN_8_IDS = new Set<number>([
  810, 811, 812, // Grookey, Thwackey, Rillaboom
  813, 814, 815, // Scorbunny, Raboot, Cinderace
  816, 817, 818, // Sobble, Drizzile, Inteleon
  819, 820,      // Skwovet, Greedent
  821, 822, 823, // Rookidee, Corvisquire, Corviknight
  831, 832,      // Wooloo, Dubwool
  856, 857, 858, // Hatenna, Hattrem, Hatterene
  862,           // Obstagoon
  863,           // Perrserker
  865,           // Sirfetch'd
  866,           // Mr. Rime
  867,           // Runerigus
  870,           // Falinks
  874,           // Stonjourner
  877,           // Morpeko
  885, 886, 887, // Dreepy, Drakloak, Dragapult
  888, 889,      // Zacian, Zamazenta (Hero forms)
  893,           // Zarude
  894, 895,      // Regieleki, Regidrago
  899,           // Wyrdeer
  900,           // Kleavor
  901,           // Ursaluna
  903,           // Sneasler
  904,           // Overqwil
  905,           // Enamorus
]);

// Explicit set of ACTUALLY RELEASED Pokemon IDs in Gen 9 (Paldea) in Pokemon GO
const RELEASED_GEN_9_IDS = new Set<number>([
  906, 907, 908, // Sprigatito, Floragato, Meowscarada
  909, 910, 911, // Fuecoco, Crocalor, Skeledirge
  912, 913, 914, // Quaxly, Quaxwell, Quaquaval
  915, 916,      // Lechonk, Oinkologne
  919, 920,      // Nymble, Lokix
  921, 922, 923, // Pawmi, Pawmo, Pawmot
  924, 925,      // Tandemaus, Maushold
  928, 929, 930, // Smoliv, Dolliv, Arboliva
  935, 936, 937, // Charcadet, Armarouge, Ceruledge
  944, 945,      // Shroodle, Grafaiai
  960, 961,      // Wiglett, Wugtrio
  962,           // Bombirdier
  965, 966,      // Varoom, Revavroom
  971, 972,      // Greavard, Houndstone
  974, 975,      // Cetoddle, Cetitan
  979,           // Annihilape
  980,           // Clodsire
  996, 997, 998, // Frigibax, Arctibax, Baxcalibur
  999, 1000,     // Gimmighoul, Gholdengo
]);

// Unreleased Megas in Pokemon GO
const UNRELEASED_MEGA_NAMES = new Set<string>([
  'mega mewtwo x',
  'mega mewtwo y',
  'mega gallade',
  'mega audino',
  'mega sharpedo',
  'mega camerupt',
  'mega metagross',
]);

// Unreleased special alternate forms in Pokemon GO
const UNRELEASED_FORM_NAMES = [
  'crowned sword',
  'crowned shield',
  'black kyurem',
  'white kyurem',
  'ultra necrozma',
  'eternamax',
  'ash greninja',
  'calyrex',
  'koraidon',
  'miraidon',
  'terapagos',
  'pecharunt'
];

/**
 * Determines whether a Pokemon entry is currently released / playable in Pokemon GO.
 */
export function isPokemonReleasedInGo(poke: PokemonRankData): boolean {
  if (!poke) return false;

  const id = poke.pokedexId;
  const nameLower = poke.name.toLowerCase();

  // Check unreleased mega evolutions
  if (poke.isMega && UNRELEASED_MEGA_NAMES.has(nameLower)) {
    return false;
  }

  // Check unreleased special forms
  if (UNRELEASED_FORM_NAMES.some(form => nameLower.includes(form))) {
    return false;
  }

  // Gen 1 to 7 (IDs 1 to 809)
  if (id <= 809) {
    return !UNRELEASED_GEN_1_TO_7_IDS.has(id);
  }

  // Gen 8 (IDs 810 to 905)
  if (id <= 905) {
    return RELEASED_GEN_8_IDS.has(id);
  }

  // Gen 9 (IDs 906 to 1025)
  return RELEASED_GEN_9_IDS.has(id);
}
