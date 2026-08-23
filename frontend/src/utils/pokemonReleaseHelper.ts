import type { PokemonRankData } from '../data/pokemonRankings';

// Explicit set of unreleased Pokemon IDs from Gens 1-7 (National Dex #1 to #809)
const UNRELEASED_GEN_1_TO_7_IDS = new Set<number>([
  489, // Phione
  490, // Manaphy
  493, // Arceus
  746, // Wishiwashi
  771, // Pyukumuku
  772, 773, // Type: Null, Silvally
  774, // Minior
  778, // Mimikyu (Costume only, base species unreleased)
  801, // Magearna
]);

// Explicit set of ACTUALLY RELEASED Pokemon IDs in Gen 8 (Galar & Hisui) in Pokemon GO
const RELEASED_GEN_8_IDS = new Set<number>([
  810, 811, 812, // Grookey, Thwackey, Rillaboom
  813, 814, 815, // Scorbunny, Raboot, Cinderace
  816, 817, 818, // Sobble, Drizzile, Inteleon
  819, 820,      // Skwovet, Greedent
  821, 822, 823, // Rookidee, Corvisquire, Corviknight
  824, 825, 826, // Blipbug, Dottler, Orbeetle
  827, 828,      // Nickit, Thievul
  829, 830,      // Gossifleur, Eldegoss
  831, 832,      // Wooloo, Dubwool
  833, 834,      // Chewtle, Drednaw
  835, 836,      // Yamper, Boltund
  837, 838, 839, // Rolycoly, Carkol, Coalossal
  840, 841, 842, // Applin, Flapple, Appletun
  843, 844,      // Silicobra, Sandaconda
  845,           // Cramorant
  846, 847,      // Arrokuda, Barraskewda
  848, 849,      // Toxel, Toxtricity
  850, 851,      // Sizzlipede, Centiskorch
  852, 853,      // Clobbopus, Grapploct
  854, 855,      // Sinistea, Polteageist
  856, 857, 858, // Hatenna, Hattrem, Hatterene
  859, 860, 861, // Impidimp, Morgrem, Grimmsnarl
  862,           // Obstagoon
  863,           // Perrserker
  864,           // Cursola
  865,           // Sirfetch'd
  866,           // Mr. Rime
  867,           // Runerigus
  870,           // Falinks
  872, 873,      // Snom, Frosmoth
  874,           // Stonjourner
  876,           // Indeedee
  877,           // Morpeko
  884,           // Duraludon
  885, 886, 887, // Dreepy, Drakloak, Dragapult
  888, 889,      // Zacian, Zamazenta (Hero & Crowned forms)
  890,           // Eternatus
  891, 892,      // Kubfu, Urshifu
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
  917, 918,      // Tarountula, Spidops
  919, 920,      // Nymble, Lokix
  921, 922, 923, // Pawmi, Pawmo, Pawmot
  924, 925,      // Tandemaus, Maushold
  926, 927,      // Fidough, Dachsbun
  928, 929, 930, // Smoliv, Dolliv, Arboliva
  935, 936, 937, // Charcadet, Armarouge, Ceruledge
  938, 939,      // Tadbulb, Bellibolt
  944, 945,      // Shroodle, Grafaiai
  953, 954,      // Rellor, Rabsca
  955, 956,      // Flittle, Espathra
  957, 958, 959, // Tinkatink, Tinkatuff, Tinkaton
  960, 961,      // Wiglett, Wugtrio
  962,           // Bombirdier
  965, 966,      // Varoom, Revavroom
  968,           // Orthworm
  971, 972,      // Greavard, Houndstone
  974, 975,      // Cetoddle, Cetitan
  978,           // Tatsugiri
  979,           // Annihilape
  980,           // Clodsire
  982,           // Dudunsparce
  983,           // Kingambit
  996, 997, 998, // Frigibax, Arctibax, Baxcalibur
  999, 1000,     // Gimmighoul, Gholdengo
  1011,          // Dipplin
  1012, 1013,    // Poltchageist, Sinistcha
  1019,          // Hydrapple
]);

// Unreleased Megas in Pokemon GO (All 48 official Megas are now released)
const UNRELEASED_MEGA_NAMES = new Set<string>([]);

// Unreleased special alternate forms and Paradox species in Pokemon GO
const UNRELEASED_FORM_NAMES = [
  'zen mode',
  'ultra necrozma',
  'eternamax',
  'ash greninja',
  'calyrex',
  'koraidon',
  'miraidon',
  'terapagos',
  'pecharunt',
  'flutter mane',
  'roaring moon',
  'great tusk',
  'iron valiant',
  'iron bundle',
  'iron hands',
  'iron moth',
  'iron jugulis',
  'iron treads',
  'iron thorns',
  'scream tail',
  'brute bonnet',
  'slither wing',
  'sandy shocks',
  'walking wake',
  'iron leaves',
  'gouging fire',
  'raging bolt',
  'iron boulder',
  'iron crown'
];

// Explicit set of Legendary / Mythical / Ultra Beast IDs
const LEGENDARY_MYTHICAL_UB_IDS = new Set<number>([
  144, 145, 146, 150, 151, // Articuno, Zapdos, Moltres, Mewtwo, Mew
  243, 244, 245, 249, 250, 251, // Raikou, Entei, Suicune, Lugia, Ho-Oh, Celebi
  377, 378, 379, 380, 381, 382, 383, 384, 385, 386, // Regi trio, Latios, Latias, Kyogre, Groudon, Rayquaza, Jirachi, Deoxys
  480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, // Lake trio, Dialga, Palkia, Heatran, Regigigas, Giratina, Cresselia, Phione, Manaphy, Darkrai, Shaymin, Arceus
  494, 638, 639, 640, 641, 642, 643, 644, 645, 646, 647, 648, 649, // Victini, Swords of Justice, Forces of Nature, Reshiram, Zekrom, Kyurem, Keldeo, Meloetta, Genesect
  716, 717, 718, 719, 720, 721, // Xerneas, Yveltal, Zygarde, Diancie, Hoopa, Volcanion
  785, 786, 787, 788, 789, 790, 791, 792, 793, 794, 795, 796, 797, 798, 799, 800, 801, 802, 803, 804, 805, 806, 807, 808, 809, // Tapus, Cosmog line, UBs, Necrozma, Magearna, Marshadow, Poipole, Naganadel, Stakataka, Blacephalon, Zeraora, Meltan, Melmetal
  888, 889, 890, 891, 892, 893, 894, 895, 896, 897, 898, 905, // Zacian, Zamazenta, Eternatus, Kubfu, Urshifu, Zarude, Regieleki, Regidrago, Glastrier, Spectrier, Calyrex, Enamorus
  1001, 1002, 1003, 1004, 1007, 1008, 1014, 1015, 1016, 1017, 1024, 1025 // Treasures of Ruin, Koraidon, Miraidon, Loyal Three, Ogerpon, Terapagos, Pecharunt
]);

// Actually released Shadow Legendary IDs in Pokemon GO
const RELEASED_SHADOW_LEGENDARY_IDS = new Set<number>([
  144, 145, 146, // Shadow Articuno, Zapdos, Moltres (Kanto)
  150,           // Shadow Mewtwo
  243, 244, 245, // Shadow Raikou, Entei, Suicune
  249, 250,      // Shadow Lugia, Ho-Oh (including Apex)
  377, 378, 379, // Shadow Regirock, Regice, Registeel
  380, 381,      // Shadow Latias, Latios
  382, 383,      // Shadow Kyogre, Groudon
  483,           // Shadow Dialga
  484,           // Shadow Palkia
  485,           // Shadow Heatran
  486,           // Shadow Regigigas
  487,           // Shadow Giratina
  488,           // Shadow Cresselia
  643,           // Shadow Reshiram
  645,           // Shadow Landorus
]);

// Unreleased Shadow Gen 8 & 9 species IDs in Pokemon GO
const UNRELEASED_SHADOW_GEN8_9_IDS = new Set<number>([
  // Gen 8 starters & pure Gen 8 families
  810, 811, 812, 813, 814, 815, 816, 817, 818, // Starters
  819, 820, 821, 822, 823, 824, 825, 826, 827, 828, 829, 830, 831, 832, 833, 834, 835, 836, 837, 838, 839, 840, 841, 842, 843, 844, 845, 846, 847, 848, 849,
  850, 851, 852, 853, 854, 855, 856, 857, 858, 859, 860, 861, 868, 869, 870,
  871, 872, 873, 874, 875, 876, 877, 878, 879, 880, 881, 882, 883, 884,
  885, 886, 887, // Dreepy line (Dragapult)
  888, 889, 890, 891, 892, 893, 894, 895, 896, 897, 898,
  // Gen 9 starters & pure Gen 9 families
  906, 907, 908, 909, 910, 911, 912, 913, 914, // Starters
  915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 930,
  935, 936, 937, // Charcadet line (Armarouge, Ceruledge)
  938, 939, 944, 945, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 965, 966, 968, 971, 972,
  974, 975, 978, 982,
  996, 997, 998, // Frigibax line (Baxcalibur)
  999, 1000,     // Gimmighoul line (Gholdengo)
  1011, 1012, 1013, 1019
]);

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

  // Check unreleased special forms (Zen Mode, Eternamax, Ultra Necrozma, Paradox, etc.)
  if (UNRELEASED_FORM_NAMES.some(form => nameLower.includes(form))) {
    return false;
  }

  // Check shadow releases
  if (poke.isShadow) {
    // Shadow Galarian forms (e.g. Shadow Galarian Articuno/Zapdos/Moltres) are unreleased
    if (nameLower.includes('galarian')) {
      return false;
    }
    // Legendary / Mythical / Ultra Beast shadows
    if (LEGENDARY_MYTHICAL_UB_IDS.has(id)) {
      return RELEASED_SHADOW_LEGENDARY_IDS.has(id);
    }
    // Gen 8 and Gen 9 unreleased shadow species
    if (UNRELEASED_SHADOW_GEN8_9_IDS.has(id)) {
      return false;
    }
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
