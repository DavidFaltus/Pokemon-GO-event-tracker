export interface RaidCounters {
  bossName: string;
  weaknesses: string[];
  megaCounters: string[];
  advancedCounters: string[];
  budgetCounters: string[];
  minCp: number;
  maxCp: number; // 100% IV CP
  minBoostedCp: number;
  maxBoostedCp: number; // 100% IV boosted CP
  weatherBoosts: string[];
}

export const raidCountersDb: Record<string, RaidCounters> = {
  "mesprit": {
    bossName: "Mesprit",
    weaknesses: ["Ghost", "Dark", "Bug"],
    megaCounters: ["Mega Gengar", "Mega Tyranitar", "Mega Houndoom", "Mega Banette"],
    advancedCounters: ["Hydreigon (Brutal Swing)", "Darkrai (Dark Pulse)", "Giratina Origin (Shadow Ball)", "Tyranitar (Brutal Swing)", "Gengar (Shadow Ball)"],
    budgetCounters: ["Chandelure (Shadow Ball)", "Weavile (Foul Play)", "Houndoom (Foul Play)", "Gholdengo (Shadow Ball)", "Scizor (X-Scissor)"],
    minCp: 1669,
    maxCp: 1747,
    minBoostedCp: 2087,
    maxBoostedCp: 2184,
    weatherBoosts: ["Větrno (Windy)"]
  },
  "uxie": {
    bossName: "Uxie",
    weaknesses: ["Ghost", "Dark", "Bug"],
    megaCounters: ["Mega Gengar", "Mega Tyranitar", "Mega Houndoom", "Mega Banette"],
    advancedCounters: ["Hydreigon (Brutal Swing)", "Darkrai (Dark Pulse)", "Giratina Origin (Shadow Ball)", "Tyranitar (Brutal Swing)", "Gengar (Shadow Ball)"],
    budgetCounters: ["Chandelure (Shadow Ball)", "Weavile (Foul Play)", "Houndoom (Foul Play)", "Gholdengo (Shadow Ball)", "Scizor (X-Scissor)"],
    minCp: 1370,
    maxCp: 1442,
    minBoostedCp: 1713,
    maxBoostedCp: 1803,
    weatherBoosts: ["Větrno (Windy)"]
  },
  "azelf": {
    bossName: "Azelf",
    weaknesses: ["Ghost", "Dark", "Bug"],
    megaCounters: ["Mega Gengar", "Mega Tyranitar", "Mega Houndoom", "Mega Banette"],
    advancedCounters: ["Hydreigon (Brutal Swing)", "Darkrai (Dark Pulse)", "Giratina Origin (Shadow Ball)", "Tyranitar (Brutal Swing)", "Gengar (Shadow Ball)"],
    budgetCounters: ["Chandelure (Shadow Ball)", "Weavile (Foul Play)", "Houndoom (Foul Play)", "Gholdengo (Shadow Ball)", "Scizor (X-Scissor)"],
    minCp: 1752,
    maxCp: 1834,
    minBoostedCp: 2190,
    maxBoostedCp: 2293,
    weatherBoosts: ["Větrno (Windy)"]
  },
  "necrozma": {
    bossName: "Necrozma (Základní forma)",
    weaknesses: ["Ghost", "Dark", "Bug"],
    megaCounters: ["Mega Gengar", "Mega Tyranitar", "Mega Banette"],
    advancedCounters: ["Hydreigon (Brutal Swing)", "Darkrai (Dark Pulse)", "Giratina Origin (Shadow Ball)", "Gengar (Shadow Ball)"],
    budgetCounters: ["Chandelure (Shadow Ball)", "Tyranitar (Crunch)", "Houndoom (Foul Play)", "Weavile (Foul Play)"],
    minCp: 2009,
    maxCp: 2104,
    minBoostedCp: 2511,
    maxBoostedCp: 2630,
    weatherBoosts: ["Větrno (Windy)"]
  },
  "necrozma (dusk mane)": {
    bossName: "Necrozma (Dusk Mane)",
    weaknesses: ["Fire", "Ground", "Ghost", "Dark"],
    megaCounters: ["Mega Blaziken", "Mega Charizard Y", "Mega Houndoom", "Primal Groudon"],
    advancedCounters: ["Reshiram (Overheat)", "Chandelure (Overheat)", "Groudon (Precipice Blades)", "Darkrai (Dark Pulse)", "Shadow Chandelure"],
    budgetCounters: ["Charizard (Blast Burn)", "Flareon (Overheat)", "Excadrill (Earthquake)", "Darmanitan (Overheat)", "Tyranitar (Crunch)"],
    minCp: 2009,
    maxCp: 2104, // In raids, you catch base Necrozma after defeat
    minBoostedCp: 2511,
    maxBoostedCp: 2630,
    weatherBoosts: ["Větrno (Windy)", "Slunečno (Sunny)"]
  },
  "necrozma (dawn wings)": {
    bossName: "Necrozma (Dawn Wings)",
    weaknesses: ["Ghost (2x)", "Dark (2x)"],
    megaCounters: ["Mega Gengar", "Mega Tyranitar", "Mega Houndoom"],
    advancedCounters: ["Hydreigon (Brutal Swing)", "Tyranitar (Brutal Swing)", "Giratina Origin (Shadow Ball)", "Darkrai (Dark Pulse)"],
    budgetCounters: ["Chandelure (Shadow Ball)", "Weavile (Foul Play)", "Honchkrow (Dark Pulse)", "Houndoom (Foul Play)"],
    minCp: 2009,
    maxCp: 2104, // In raids, you catch base Necrozma after defeat
    minBoostedCp: 2511,
    maxBoostedCp: 2630,
    weatherBoosts: ["Větrno (Windy)", "Mlha (Fog)"]
  },
  "zekrom": {
    bossName: "Zekrom",
    weaknesses: ["Dragon", "Ground", "Ice", "Fairy"],
    megaCounters: ["Mega Rayquaza", "Mega Garchomp", "Mega Gardevoir", "Mega Latios"],
    advancedCounters: ["Rayquaza (Outrage)", "Salamence (Outrage)", "Garchomp (Outrage)", "Haxorus (Breaking Swipe)", "Palkia (Spacial Rend)"],
    budgetCounters: ["Dragonite (Outrage)", "Mamoswine (Avalanche)", "Gardevoir (Dazzling Gleam)", "Excadrill (Drill Run)"],
    minCp: 2217,
    maxCp: 2307,
    minBoostedCp: 2771,
    maxBoostedCp: 2884,
    weatherBoosts: ["Větrno (Windy)", "Deštivo (Rainy)"]
  },
  "mega lopunny": {
    bossName: "Mega Lopunny",
    weaknesses: ["Fighting", "Psychic", "Flying", "Fairy"],
    megaCounters: ["Mega Alakazam", "Mega Gardevoir", "Mega Rayquaza"],
    advancedCounters: ["Mewtwo (Psystrike)", "Terrakion (Sacred Sword)", "Lucario (Aura Sphere)", "Conkeldurr (Dynamic Punch)"],
    budgetCounters: ["Machamp (Dynamic Punch)", "Gardevoir (Psychic)", "Alakazam (Psychic)", "Gallade (Psychic)"],
    minCp: 1112,
    maxCp: 1177, // Catches regular Lopunny
    minBoostedCp: 1390,
    maxBoostedCp: 1471,
    weatherBoosts: ["Zataženo (Cloudy)", "Částečně zataženo (Partly Cloudy)"]
  },
  "mega rayquaza": {
    bossName: "Mega Rayquaza",
    weaknesses: ["Ice (2x)", "Dragon", "Rock", "Fairy"],
    megaCounters: ["Mega Gardevoir", "Mega Glalie", "Mega Latios"],
    advancedCounters: ["Mamoswine (Avalanche)", "Baxcalibur (Avalanche)", "Galarian Darmanitan (Avalanche)", "Kyurem (Glaciate)"],
    budgetCounters: ["Glaceon (Avalanche)", "Weavile (Avalanche)", "Dragonite (Outrage)", "Sylveon (Dazzling Gleam)"],
    minCp: 2102,
    maxCp: 2191, // Catches standard Rayquaza
    minBoostedCp: 2627,
    maxBoostedCp: 2739,
    weatherBoosts: ["Větrno (Windy)"]
  },
  "mega gardevoir": {
    bossName: "Mega Gardevoir",
    weaknesses: ["Poison", "Ghost", "Steel"],
    megaCounters: ["Mega Gengar", "Mega Beedrill", "Mega Scizor"],
    advancedCounters: ["Metagross (Meteor Mash)", "Nihilego (Poison Jab)", "Gengar (Shadow Ball)", "Giratina Origin (Shadow Ball)"],
    budgetCounters: ["Chandelure (Shadow Ball)", "Excadrill (Iron Head)", "Roserade (Sludge Bomb)", "Dialga (Iron Head)"],
    minCp: 1680,
    maxCp: 1767, // Catches regular Gardevoir
    minBoostedCp: 2100,
    maxBoostedCp: 2209,
    weatherBoosts: ["Zataženo (Cloudy)", "Větrno (Windy)"]
  },
  "mega tyranitar": {
    bossName: "Mega Tyranitar",
    weaknesses: ["Fighting (2x)", "Ground", "Bug", "Water", "Grass", "Steel", "Fairy"],
    megaCounters: ["Mega Heracross", "Mega Lopunny", "Mega Blaziken"],
    advancedCounters: ["Terrakion (Sacred Sword)", "Keldeo (Sacred Sword)", "Lucario (Aura Sphere)", "Conkeldurr (Dynamic Punch)"],
    budgetCounters: ["Machamp (Dynamic Punch)", "Hariyama (Dynamic Punch)", "Breloom (Dynamic Punch)", "Toxicroak (Dynamic Punch)"],
    minCp: 2111,
    maxCp: 2199, // Catches regular Tyranitar
    minBoostedCp: 2639,
    maxBoostedCp: 2749,
    weatherBoosts: ["Mlha (Fog)", "Částečně zataženo (Partly Cloudy)"]
  },
  "mega gengar": {
    bossName: "Mega Gengar",
    weaknesses: ["Ghost", "Dark", "Ground", "Psychic"],
    megaCounters: ["Mega Tyranitar", "Mega Houndoom", "Mega Alakazam"],
    advancedCounters: ["Mewtwo (Psystrike)", "Hydreigon (Brutal Swing)", "Garchomp (Earth Power)", "Giratina Origin (Shadow Ball)"],
    budgetCounters: ["Tyranitar (Crunch)", "Chandelure (Shadow Ball)", "Excadrill (Drill Run)", "Espeon (Psychic)"],
    minCp: 1564,
    maxCp: 1644,
    minBoostedCp: 1955,
    maxBoostedCp: 2055,
    weatherBoosts: ["Mlha (Fog)", "Zataženo (Cloudy)"]
  },
  "mega scizor": {
    bossName: "Mega Scizor",
    weaknesses: ["Fire (2x)"],
    megaCounters: ["Mega Blaziken", "Mega Charizard Y", "Mega Houndoom"],
    advancedCounters: ["Reshiram (Overheat)", "Chandelure (Overheat)", "Heatran (Magma Storm)", "Shadow Entei (Overheat)"],
    budgetCounters: ["Charizard (Blast Burn)", "Flareon (Overheat)", "Blaziken (Blast Burn)", "Arcanine (Flamethrower)"],
    minCp: 1636,
    maxCp: 1714,
    minBoostedCp: 2046,
    maxBoostedCp: 2143,
    weatherBoosts: ["Deštivo (Rainy)", "Sněžení (Snow)"]
  },
  "hisuian decidueye": {
    bossName: "Hisuian Decidueye",
    weaknesses: ["Flying (2x)", "Fire", "Ice", "Poison", "Psychic", "Fairy"],
    megaCounters: ["Mega Rayquaza", "Mega Pidgeot", "Mega Charizard Y"],
    advancedCounters: ["Rayquaza (Dragon Ascent)", "Yveltal (Oblivion Wing)", "Shadow Staraptor (Fly)", "Enamorus (Fly)"],
    budgetCounters: ["Staraptor (Fly)", "Honchkrow (Sky Attack)", "Unfezant (Sky Attack)", "Togekiss (Air Slash)"],
    minCp: 1579,
    maxCp: 1655,
    minBoostedCp: 1974,
    maxBoostedCp: 2069,
    weatherBoosts: ["Slunečno (Sunny)", "Zataženo (Cloudy)"]
  },
  "druddigon": {
    bossName: "Druddigon",
    weaknesses: ["Ice", "Dragon", "Fairy"],
    megaCounters: ["Mega Rayquaza", "Mega Garchomp", "Mega Gardevoir"],
    advancedCounters: ["Rayquaza (Outrage)", "Salamence (Outrage)", "Garchomp (Outrage)", "Palkia (Spacial Rend)"],
    budgetCounters: ["Dragonite (Outrage)", "Glaceon (Avalanche)", "Gardevoir (Dazzling Gleam)", "Sylveon (Moonblast)"],
    minCp: 1487,
    maxCp: 1561,
    minBoostedCp: 1859,
    maxBoostedCp: 1951,
    weatherBoosts: ["Větrno (Windy)"]
  },
  "aerodactyl": {
    bossName: "Aerodactyl",
    weaknesses: ["Water", "Electric", "Ice", "Rock", "Steel"],
    megaCounters: ["Mega Blastoise", "Mega Manectric", "Mega Swampert"],
    advancedCounters: ["Kyogre (Origin Pulse)", "Zekrom (Fusion Bolt)", "Metagross (Meteor Mash)", "Mamoswine (Avalanche)"],
    budgetCounters: ["Swampert (Hydro Cannon)", "Electivire (Wild Charge)", "Glaceon (Avalanche)", "Rhyperior (Rock Wrecker)"],
    minCp: 1514,
    maxCp: 1590,
    minBoostedCp: 1893,
    maxBoostedCp: 1988,
    weatherBoosts: ["Větrno (Windy)", "Částečně zataženo (Partly Cloudy)"]
  },
  "mega skarmory": {
    bossName: "Mega Skarmory",
    weaknesses: ["Fire", "Electric"],
    megaCounters: ["Mega Charizard Y", "Mega Blaziken", "Mega Manectric"],
    advancedCounters: ["Reshiram (Fusion Flare)", "Zekrom (Fusion Bolt)", "Thundurus Therian (Wild Charge)", "Xurkitree (Discharge)", "Shadow Raikou (Wild Charge)"],
    budgetCounters: ["Chandelure (Overheat)", "Electivire (Wild Charge)", "Magnezone (Wild Charge)", "Flareon (Overheat)"],
    minCp: 1139,
    maxCp: 1204,
    minBoostedCp: 1424,
    maxBoostedCp: 1506,
    weatherBoosts: ["Větrno (Windy)", "Sněžení (Snow)"]
  },
  "alolan marowak": {
    bossName: "Alolan Marowak",
    weaknesses: ["Water", "Ground", "Rock", "Ghost", "Dark"],
    megaCounters: ["Primal Kyogre", "Primal Groudon", "Mega Tyranitar", "Mega Swampert"],
    advancedCounters: ["Kyogre (Origin Pulse)", "Groudon (Precipice Blades)", "Hydreigon (Brutal Swing)", "Rhyperior (Rock Wrecker)"],
    budgetCounters: ["Swampert (Hydro Cannon)", "Tyranitar (Crunch)", "Excadrill (Drill Run)", "Gengar (Shadow Ball)"],
    minCp: 988,
    maxCp: 1048,
    minBoostedCp: 1235,
    maxBoostedCp: 1311,
    weatherBoosts: ["Slunečno (Sunny)", "Mlha (Fog)"]
  },
  "alolan raichu": {
    bossName: "Alolan Raichu",
    weaknesses: ["Ground", "Ghost", "Dark", "Bug"],
    megaCounters: ["Primal Groudon", "Mega Tyranitar", "Mega Gengar"],
    advancedCounters: ["Groudon (Precipice Blades)", "Hydreigon (Brutal Swing)", "Darkrai (Dark Pulse)", "Shadow Mamoswine"],
    budgetCounters: ["Excadrill (Drill Run)", "Tyranitar (Crunch)", "Chandelure (Shadow Ball)", "Gengar (Shadow Ball)"],
    minCp: 1238,
    maxCp: 1306,
    minBoostedCp: 1548,
    maxBoostedCp: 1633,
    weatherBoosts: ["Deštivo (Rainy)", "Větrno (Windy)"]
  },
  "alolan exeggutor": {
    bossName: "Alolan Exeggutor",
    weaknesses: ["Ice (2x)", "Flying", "Poison", "Bug", "Dragon", "Fairy"],
    megaCounters: ["Mega Rayquaza", "Mega Glalie", "Mega Abomasnow"],
    advancedCounters: ["Mamoswine (Avalanche)", "Rayquaza (Outrage)", "Weavile (Avalanche)", "Glaceon (Avalanche)"],
    budgetCounters: ["Darmanitan Galarian (Avalanche)", "Cloyster (Avalanche)", "Togekiss (Dazzling Gleam)", "Dragonite (Outrage)"],
    minCp: 1643,
    maxCp: 1722,
    minBoostedCp: 2055,
    maxBoostedCp: 2153,
    weatherBoosts: ["Slunečno (Sunny)", "Větrno (Windy)"]
  },
  "metagross": {
    bossName: "Metagross",
    weaknesses: ["Fire", "Ground", "Ghost", "Dark"],
    megaCounters: ["Mega Blaziken", "Primal Groudon", "Mega Charizard Y", "Mega Tyranitar"],
    advancedCounters: ["Reshiram (Fusion Flare)", "Groudon (Precipice Blades)", "Hydreigon (Brutal Swing)", "Darkrai (Dark Pulse)"],
    budgetCounters: ["Chandelure (Overheat)", "Charizard (Blast Burn)", "Excadrill (Earthquake)", "Tyranitar (Crunch)"],
    minCp: 2105,
    maxCp: 2186,
    minBoostedCp: 2631,
    maxBoostedCp: 2733,
    weatherBoosts: ["Sněžení (Snow)", "Větrno (Windy)"]
  },
  "machamp": {
    bossName: "Machamp",
    weaknesses: ["Psychic", "Flying", "Fairy"],
    megaCounters: ["Mega Rayquaza", "Mega Gardevoir", "Mega Alakazam"],
    advancedCounters: ["Mewtwo (Psystrike)", "Rayquaza (Dragon Ascent)", "Shadow Mewtwo", "Togekiss (Dazzling Gleam)"],
    budgetCounters: ["Espeon (Psychic)", "Alakazam (Psychic)", "Gardevoir (Dazzling Gleam)", "Staraptor (Fly)"],
    minCp: 1720,
    maxCp: 1802,
    minBoostedCp: 2150,
    maxBoostedCp: 2252,
    weatherBoosts: ["Zataženo (Cloudy)"]
  },
  "lapras": {
    bossName: "Lapras",
    weaknesses: ["Electric", "Grass", "Fighting", "Rock"],
    megaCounters: ["Mega Lucario", "Mega Manectric", "Mega Sceptile"],
    advancedCounters: ["Kartana (Razor Leaf)", "Terrakion (Sacred Sword)", "Zekrom (Fusion Bolt)", "Xurkitree (Discharge)"],
    budgetCounters: ["Machamp (Dynamic Punch)", "Electivire (Wild Charge)", "Roserade (Grass Knot)", "Rhyperior (Rock Wrecker)"],
    minCp: 1435,
    maxCp: 1509,
    minBoostedCp: 1794,
    maxBoostedCp: 1886,
    weatherBoosts: ["Deštivo (Rainy)", "Sněžení (Snow)"]
  },
  "togetic": {
    bossName: "Togetic",
    weaknesses: ["Electric", "Ice", "Poison", "Rock", "Steel"],
    megaCounters: ["Mega Metagross", "Mega Diancie", "Mega Manectric"],
    advancedCounters: ["Metagross (Meteor Mash)", "Mamoswine (Avalanche)", "Zekrom (Fusion Bolt)", "Nihilego (Sludge Bomb)"],
    budgetCounters: ["Excadrill (Iron Head)", "Glaceon (Avalanche)", "Electivire (Wild Charge)", "Rhyperior (Rock Wrecker)"],
    minCp: 914,
    maxCp: 976,
    minBoostedCp: 1143,
    maxBoostedCp: 1220,
    weatherBoosts: ["Zataženo (Cloudy)", "Větrno (Windy)"]
  },
  "bombirdier": {
    bossName: "Bombirdier",
    weaknesses: ["Electric", "Ice", "Rock", "Fairy"],
    megaCounters: ["Mega Diancie", "Mega Manectric", "Mega Rayquaza"],
    advancedCounters: ["Xurkitree (Discharge)", "Zekrom (Fusion Bolt)", "Mamoswine (Avalanche)", "Rhyperior (Rock Wrecker)"],
    budgetCounters: ["Electivire (Wild Charge)", "Glaceon (Avalanche)", "Togekiss (Dazzling Gleam)", "Tyranitar (Stone Edge)"],
    minCp: 1541,
    maxCp: 1614,
    minBoostedCp: 1926,
    maxBoostedCp: 2018,
    weatherBoosts: ["Větrno (Windy)", "Mlha (Fog)"]
  },
  "dhelmise": {
    bossName: "Dhelmise",
    weaknesses: ["Fire", "Ice", "Flying", "Ghost", "Dark"],
    megaCounters: ["Mega Charizard Y", "Mega Rayquaza", "Mega Tyranitar", "Mega Gengar"],
    advancedCounters: ["Reshiram (Fusion Flare)", "Rayquaza (Dragon Ascent)", "Hydreigon (Brutal Swing)", "Chandelure (Shadow Ball)"],
    budgetCounters: ["Charizard (Blast Burn)", "Staraptor (Fly)", "Houndoom (Foul Play)", "Gengar (Shadow Ball)"],
    minCp: 1563,
    maxCp: 1637,
    minBoostedCp: 1954,
    maxBoostedCp: 2046,
    weatherBoosts: ["Slunečno (Sunny)", "Mlha (Fog)"]
  },
  "turtonator": {
    bossName: "Turtonator",
    weaknesses: ["Ground", "Rock", "Dragon"],
    megaCounters: ["Primal Groudon", "Mega Rayquaza", "Mega Garchomp"],
    advancedCounters: ["Groudon (Precipice Blades)", "Rayquaza (Outrage)", "Palkia Origin (Spacial Rend)", "Rhyperior (Rock Wrecker)"],
    budgetCounters: ["Excadrill (Drill Run)", "Dragonite (Outrage)", "Garchomp (Earthquake)", "Rampardos (Rock Slide)"],
    minCp: 1208,
    maxCp: 1273,
    minBoostedCp: 1510,
    maxBoostedCp: 1591,
    weatherBoosts: ["Slunečno (Sunny)", "Větrno (Windy)"]
  },
  "hisuian typhlosion": {
    bossName: "Hisuian Typhlosion",
    weaknesses: ["Water", "Ground", "Rock", "Ghost", "Dark"],
    megaCounters: ["Primal Kyogre", "Primal Groudon", "Mega Tyranitar", "Mega Gengar"],
    advancedCounters: ["Kyogre (Origin Pulse)", "Groudon (Precipice Blades)", "Hydreigon (Brutal Swing)", "Shadow Tyranitar"],
    budgetCounters: ["Swampert (Hydro Cannon)", "Excadrill (Earthquake)", "Tyranitar (Crunch)", "Chandelure (Shadow Ball)"],
    minCp: 1446,
    maxCp: 1522,
    minBoostedCp: 1808,
    maxBoostedCp: 1903,
    weatherBoosts: ["Slunečno (Sunny)", "Mlha (Fog)"]
  },
  "hisuian braviary": {
    bossName: "Hisuian Braviary",
    weaknesses: ["Electric", "Ice", "Rock", "Ghost", "Dark"],
    megaCounters: ["Mega Manectric", "Mega Tyranitar", "Mega Gengar", "Mega Aerodactyl"],
    advancedCounters: ["Xurkitree (Discharge)", "Zekrom (Fusion Bolt)", "Hydreigon (Brutal Swing)", "Mamoswine (Avalanche)"],
    budgetCounters: ["Electivire (Wild Charge)", "Tyranitar (Crunch)", "Glaceon (Avalanche)", "Rhyperior (Rock Wrecker)"],
    minCp: 1531,
    maxCp: 1608,
    minBoostedCp: 1914,
    maxBoostedCp: 2010,
    weatherBoosts: ["Větrno (Windy)"]
  },
  "hisuian avalugg": {
    bossName: "Hisuian Avalugg",
    weaknesses: ["Fighting (2x)", "Steel (2x)", "Fire", "Water", "Grass", "Ground"],
    megaCounters: ["Mega Lucario", "Mega Metagross", "Mega Blaziken", "Primal Kyogre"],
    advancedCounters: ["Terrakion (Sacred Sword)", "Metagross (Meteor Mash)", "Lucario (Aura Sphere)", "Kyogre (Origin Pulse)"],
    budgetCounters: ["Machamp (Dynamic Punch)", "Excadrill (Iron Head)", "Conkeldurr (Dynamic Punch)", "Swampert (Hydro Cannon)"],
    minCp: 1845,
    maxCp: 1930,
    minBoostedCp: 2307,
    maxBoostedCp: 2413,
    weatherBoosts: ["Sněžení (Snow)", "Částečně zataženo (Partly Cloudy)"]
  },
  "dratini": {
    bossName: "Dratini",
    weaknesses: ["Ice", "Dragon", "Fairy"],
    megaCounters: ["Mega Rayquaza", "Mega Gardevoir"],
    advancedCounters: ["Mamoswine (Avalanche)", "Rayquaza (Outrage)", "Gardevoir (Dazzling Gleam)"],
    budgetCounters: ["Glaceon (Avalanche)", "Dragonite (Outrage)", "Sylveon (Moonblast)"],
    minCp: 529,
    maxCp: 574,
    minBoostedCp: 661,
    maxBoostedCp: 717,
    weatherBoosts: ["Větrno (Windy)"]
  },
  "deino": {
    bossName: "Deino",
    weaknesses: ["Fairy (2x)", "Fighting", "Bug", "Ice", "Dragon"],
    megaCounters: ["Mega Gardevoir", "Mega Lucario"],
    advancedCounters: ["Gardevoir (Dazzling Gleam)", "Togekiss (Dazzling Gleam)", "Terrakion (Sacred Sword)"],
    budgetCounters: ["Sylveon (Moonblast)", "Machamp (Dynamic Punch)", "Granbull (Play Rough)"],
    minCp: 554,
    maxCp: 606,
    minBoostedCp: 693,
    maxBoostedCp: 757,
    weatherBoosts: ["Mlha (Fog)", "Větrno (Windy)"]
  },
  "jangmo-o": {
    bossName: "Jangmo-o",
    weaknesses: ["Ice", "Dragon", "Fairy"],
    megaCounters: ["Mega Gardevoir", "Mega Rayquaza"],
    advancedCounters: ["Gardevoir (Dazzling Gleam)", "Rayquaza (Outrage)", "Mamoswine (Avalanche)"],
    budgetCounters: ["Sylveon (Moonblast)", "Dragonite (Outrage)", "Glaceon (Avalanche)"],
    minCp: 512,
    maxCp: 560,
    minBoostedCp: 640,
    maxBoostedCp: 700,
    weatherBoosts: ["Větrno (Windy)"]
  },
  "frigibax": {
    bossName: "Frigibax",
    weaknesses: ["Fighting", "Rock", "Steel", "Dragon", "Fairy"],
    megaCounters: ["Mega Lucario", "Mega Gardevoir", "Mega Rayquaza"],
    advancedCounters: ["Terrakion (Sacred Sword)", "Metagross (Meteor Mash)", "Gardevoir (Dazzling Gleam)"],
    budgetCounters: ["Machamp (Dynamic Punch)", "Excadrill (Iron Head)", "Sylveon (Moonblast)"],
    minCp: 518,
    maxCp: 568,
    minBoostedCp: 648,
    maxBoostedCp: 710,
    weatherBoosts: ["Sněžení (Snow)", "Větrno (Windy)"]
  },
  "rockruff": {
    bossName: "Rockruff",
    weaknesses: ["Water", "Grass", "Fighting", "Ground", "Steel"],
    megaCounters: ["Primal Kyogre", "Mega Lucario", "Mega Sceptile"],
    advancedCounters: ["Kyogre (Origin Pulse)", "Terrakion (Sacred Sword)", "Kartana (Razor Leaf)"],
    budgetCounters: ["Swampert (Hydro Cannon)", "Machamp (Dynamic Punch)", "Roserade (Grass Knot)"],
    minCp: 504,
    maxCp: 550,
    minBoostedCp: 630,
    maxBoostedCp: 687,
    weatherBoosts: ["Částečně zataženo (Partly Cloudy)"]
  },
  "shinx": {
    bossName: "Shinx",
    weaknesses: ["Ground"],
    megaCounters: ["Primal Groudon", "Mega Garchomp"],
    advancedCounters: ["Groudon (Precipice Blades)", "Shadow Mamoswine", "Landorus (Sandsear Storm)"],
    budgetCounters: ["Excadrill (Drill Run)", "Mamoswine (High Horsepower)", "Rhyperior (Earthquake)"],
    minCp: 472,
    maxCp: 514,
    minBoostedCp: 590,
    maxBoostedCp: 643,
    weatherBoosts: ["Deštivo (Rainy)"]
  },
  "timburr": {
    bossName: "Timburr",
    weaknesses: ["Psychic", "Flying", "Fairy"],
    megaCounters: ["Mega Rayquaza", "Mega Gardevoir"],
    advancedCounters: ["Mewtwo (Psystrike)", "Rayquaza (Dragon Ascent)", "Gardevoir (Dazzling Gleam)"],
    budgetCounters: ["Espeon (Psychic)", "Staraptor (Fly)", "Sylveon (Moonblast)"],
    minCp: 700,
    maxCp: 751,
    minBoostedCp: 875,
    maxBoostedCp: 939,
    weatherBoosts: ["Zataženo (Cloudy)"]
  },
  "klink": {
    bossName: "Klink",
    weaknesses: ["Fire", "Fighting", "Ground"],
    megaCounters: ["Mega Blaziken", "Mega Lucario", "Primal Groudon"],
    advancedCounters: ["Reshiram (Fusion Flare)", "Terrakion (Sacred Sword)", "Groudon (Precipice Blades)"],
    budgetCounters: ["Charizard (Blast Burn)", "Machamp (Dynamic Punch)", "Excadrill (Earthquake)"],
    minCp: 502,
    maxCp: 546,
    minBoostedCp: 628,
    maxBoostedCp: 683,
    weatherBoosts: ["Sněžení (Snow)"]
  },
  "espurr": {
    bossName: "Espurr",
    weaknesses: ["Bug", "Ghost", "Dark"],
    megaCounters: ["Mega Tyranitar", "Mega Gengar"],
    advancedCounters: ["Hydreigon (Brutal Swing)", "Darkrai (Dark Pulse)", "Giratina Origin (Shadow Ball)"],
    budgetCounters: ["Tyranitar (Crunch)", "Chandelure (Shadow Ball)", "Houndoom (Foul Play)"],
    minCp: 685,
    maxCp: 733,
    minBoostedCp: 857,
    maxBoostedCp: 917,
    weatherBoosts: ["Větrno (Windy)"]
  }
};

/**
 * Helper to match a boss name to counters
 */
export function findRaidCounters(bossName: string): RaidCounters | null {
  if (!bossName) return null;
  const cleanName = bossName.toLowerCase();
  
  for (const key of Object.keys(raidCountersDb)) {
    if (cleanName.includes(key)) {
      return raidCountersDb[key];
    }
  }
  return null;
}
