import axios from 'axios';
import * as cheerio from 'cheerio';
import { EventData, SpecialEventDetails, ScrapedRaidBoss, RocketMember, GruntData, RaidCounters } from './types';

// ==========================================
// 1. Static Databases (Meta & Counters)
// ==========================================

export interface PokemonMetaInfo {
  name: string;
  evolution: string;
  pveRating: 'S' | 'A' | 'B' | 'C' | 'None';
  pvpRating: 'S' | 'A' | 'B' | 'C' | 'None';
  pveRankText: string;
  pvpRankText: string;
  bestFastMove: string;
  bestChargedMove: string;
  notes: string;
}

export const pokemonMetaDb: Record<string, PokemonMetaInfo> = {
  swinub: {
    name: "Swinub",
    evolution: "Mamoswine",
    pveRating: "S",
    pvpRating: "A",
    pveRankText: "Nejlepší ledový a špičkový zemní útočník",
    pvpRankText: "Vynikající v Master League a Premier Cupu",
    bestFastMove: "Powder Snow (Ledový) / Mud-Slap (Zemní)",
    bestChargedMove: "Avalanche (Ledový) & High Horsepower (Zemní)",
    notes: "Absolutní nutnost pro raidy. Shadow Mamoswine je vůbec nejlepší ne-Mega ledový útočník ve hře. Vyplatí se chytat s vysokým útokem (PvE) i dobrým PvP IV."
  },
  frigibax: {
    name: "Frigibax",
    evolution: "Baxcalibur",
    pveRating: "A",
    pvpRating: "A",
    pveRankText: "Skvělý ledový a dračí útočník",
    pvpRankText: "Velmi silný v Master League",
    bestFastMove: "Dragon Breath (Dračí) / Ice Fang (Ledový)",
    bestChargedMove: "Avalanche (Ledový) & Outrage (Dračí)",
    notes: "Vzácný drak. Baxcalibur je vynikající v Master League a velmi užitečný v raidech jako ledový útočník. Hledejte 100% IV (Hundo) pro Master League."
  },
  necrozma: {
    name: "Necrozma",
    evolution: "Dusk Mane / Dawn Wings",
    pveRating: "S",
    pvpRating: "S",
    pveRankText: "Absolutní král ocelových a duchových útočníků",
    pvpRankText: "Dominantní meta v Master League",
    bestFastMove: "Shadow Claw (Duchový) / Metal Claw (Ocelový)",
    bestChargedMove: "Sunsteel Strike (Ocelový) / Moongeist Beam (Duchový)",
    notes: "Fúze s Solgaleo (Dusk Mane) and Lunala (Dawn Wings) jsou jedny z nejsilnějších forem v celé historii Pokémon GO. Dusk Mane vládne ocelovému typu, Dawn Wings duchovému. Hundo je prioritou."
  },
  zekrom: {
    name: "Zekrom",
    evolution: "Zekrom",
    pveRating: "S",
    pvpRating: "A",
    pveRankText: "Špičkový elektrický a dračí útočník",
    pvpRankText: "Skvělý v Master League",
    bestFastMove: "Charge Beam (Elektrický) / Dragon Breath (Dračí)",
    bestChargedMove: "Fusion Bolt* (Elektrický) & Outrage (Dračí)",
    notes: "Fusion Bolt je Signature move (vyžaduje Elite TM, pokud není chycen během speciálního eventu). Velmi silný univerzál do raidů a dobrý do Master League."
  },
  machop: {
    name: "Machop",
    evolution: "Machamp",
    pveRating: "A",
    pvpRating: "A",
    pveRankText: "Dostupný a velmi silný bojový útočník",
    pvpRankText: "Stálice v Great a Ultra League",
    bestFastMove: "Counter (Bojový)",
    bestChargedMove: "Cross Chop (Bojový) & Rock Slide (Kamenný)",
    notes: "Machamp je nestárnoucí klasik. Shadow Machamp je ještě silnější (S-Tier PvE). Chytat s nízkým útokem a vysokou obranou/HP pro PvP (Great/Ultra) a vysoké IV pro PvE."
  },
  beldum: {
    name: "Beldum",
    evolution: "Metagross",
    pveRating: "S",
    pvpRating: "A",
    pveRankText: "Nejlepší ne-Mega ocelový útočník",
    pvpRankText: "Nepřehlédnutelný v Master League",
    bestFastMove: "Bullet Punch (Ocelový)",
    bestChargedMove: "Meteor Mash* (Ocelový) & Earthquake (Zemní)",
    notes: "Klíčový je útok Meteor Mash (vyžaduje Elite TM nebo evoluci během eventu). Metagross je králem ocelového typu a skvěle si vede i v Master League. Shadow verze je extrémní monstrum."
  },
  larvitar: {
    name: "Larvitar",
    evolution: "Tyranitar",
    pveRating: "S",
    pvpRating: "B",
    pveRankText: "Nejlepší temný a skvělý kamenný útočník",
    pvpRankText: "Využitelný v Master League / Premier Cupu",
    bestFastMove: "Bite (Temný) / Smack Down* (Kamenný)",
    bestChargedMove: "Brutal Swing (Temný) / Stone Edge (Kamenný)",
    notes: "Mega Tyranitar a Shadow Tyranitar s Brutal Swing naprosto dominují temnému typu v raidech. Smack Down vyžaduje Elite Fast TM. Určitě grindovat sladkosti (Candy)!"
  },
  gible: {
    name: "Gible",
    evolution: "Garchomp",
    pveRating: "S",
    pvpRating: "A",
    pveRankText: "Špičkový zemní a dračí útočník",
    pvpRankText: "Silný v Master League",
    bestFastMove: "Mud-Shot (Zemní) / Dragon Tail (Dračí)",
    bestChargedMove: "Earth Power* (Zemní) & Outrage (Dračí)",
    notes: "Mega Garchomp a Shadow Garchomp jsou elitní zemní útočníci. Earth Power vyžaduje Elite TM. Skvělý cíl pro grind."
  },
  bagon: {
    name: "Bagon",
    evolution: "Salamence",
    pveRating: "S",
    pvpRating: "B",
    pveRankText: "Elitní dračí útočník",
    pvpRankText: "Průměrný v PvP",
    bestFastMove: "Dragon Tail (Dračí)",
    bestChargedMove: "Outrage* (Dračí)",
    notes: "Outrage je nezbytný (Elite TM / event). Mega Salamence a Shadow Salamence jsou v raidech monstrózní. Pro PvP se moc nehodí, ale pro PvE je to top volba."
  },
  gastly: {
    name: "Gastly",
    evolution: "Gengar",
    pveRating: "A",
    pvpRating: "B",
    pveRankText: "Vysoké poškození duchovým/jedovým typem",
    pvpRankText: "Niche v Great/Ultra League",
    bestFastMove: "Shadow Claw (Duchový)",
    bestChargedMove: "Shadow Ball (Duchový) & Sludge Bomb (Jedový)",
    notes: "Mega Gengar má nejvyšší DPS mezi duchy, ale je velmi křehký. Shadow Gengar rozdává obrovské rány, ale rychle umírá."
  },
  riolu: {
    name: "Riolu",
    evolution: "Lucario",
    pveRating: "S",
    pvpRating: "A",
    pveRankText: "Nejlepší bojový útočník",
    pvpRankText: "Velmi agresivní v PvP",
    bestFastMove: "Counter (Bojový)",
    bestChargedMove: "Aura Sphere (Bojový) & Shadow Ball (Duchový)",
    notes: "Mega Lucario a standardní Lucario s Aura Sphere mají neuvěřitelné poškození. V PvP je křehký, ale s Power-Up Punch dokáže bleskově navyšovat útok."
  },
  ralts: {
    name: "Ralts",
    evolution: "Gardevoir / Gallade",
    pveRating: "S",
    pvpRating: "A",
    pveRankText: "Nejlepší vílí útočník (Gardevoir)",
    pvpRankText: "Velmi silný v PvP Premier pohárech",
    bestFastMove: "Charm (Vílí)",
    bestChargedMove: "Dazzling Gleam (Vílí) / Psychic (Psychický)",
    notes: "Mega Gardevoir je nejsilnější vílí pokémon pro raidy. Shadow Gardevoir s Charmem dokáže v PvP bleskově zničit draky a bojové typy."
  },
  kyogre: {
    name: "Kyogre",
    evolution: "Kyogre",
    pveRating: "S",
    pvpRating: "S",
    pveRankText: "Král vodních útočníků (Primal form)",
    pvpRankText: "Jeden z nejlepších v Master League",
    bestFastMove: "Waterfall (Vodní)",
    bestChargedMove: "Origin Pulse* (Vodní) & Surf (Vodní)",
    notes: "Primal Kyogre je absolutním vrcholem vodních pokémonů. Origin Pulse vyžaduje Elite TM. V Master League je stálou hrozbou."
  },
  groudon: {
    name: "Groudon",
    evolution: "Groudon",
    pveRating: "S",
    pvpRating: "S",
    pveRankText: "Král zemních útočníků (Primal form)",
    pvpRankText: "Dominantní síla v Master League",
    bestFastMove: "Mud-Shot (Zemní)",
    bestChargedMove: "Precipice Blades* (Zemní) & Fire Punch*",
    notes: "Primal Groudon s Precipice Blades je nejlepším zemním útočníkem ve hře. Shadow Groudon (z Giovanniho) je rovněž špička. Vyžaduje Elite TM."
  },
  rayquaza: {
    name: "Rayquaza",
    evolution: "Rayquaza",
    pveRating: "S",
    pvpRating: "S",
    pveRankText: "Nejsilnější Pokémon ve hře vůbec (Mega form)",
    pvpRankText: "Skvělý v Master League",
    bestFastMove: "Dragon Tail (Dračí)",
    bestChargedMove: "Dragon Ascent* (Létající) & Outrage (Dračí)",
    notes: "Mega Rayquaza s útokem Dragon Ascent je nejsilnějším útočníkem v historii hry. Rozhodně chytat a maxovat!"
  },
  kartana: {
    name: "Kartana",
    evolution: "Kartana",
    pveRating: "S",
    pvpRating: "C",
    pveRankText: "Nejlepší travní útočník s obrovským DPS",
    pvpRankText: "Příliš křehký pro PvP",
    bestFastMove: "Razor Leaf (Travní)",
    bestChargedMove: "Leaf Blade (Travní)",
    notes: "V raidech jako travní útočník naprosto dominuje a překonává i mnohé Shadow formy. Hledejte vysoké IV pro raidy."
  },
  xurkitree: {
    name: "Xurkitree",
    evolution: "Xurkitree",
    pveRating: "S",
    pvpRating: "C",
    pveRankText: "Nejlepší ne-stínový elektrický útočník",
    pvpRankText: "Špatný v PvP kvůli slabé obraně",
    bestFastMove: "Thunder Shock (Elektrický)",
    bestChargedMove: "Discharge (Elektrický) & Power Whip (Travní)",
    notes: "Má fantastický útok a skvělý moveset. Power Whip jako pokrytí proti zemním typům je skvělý bonus."
  },
  terrakion: {
    name: "Terrakion",
    evolution: "Terrakion",
    pveRating: "S",
    pvpRating: "A",
    pveRankText: "Elitní bojový a kamenný útočník",
    pvpRankText: "Velmi použitelný v Master League",
    bestFastMove: "Double Kick (Bojový)",
    bestChargedMove: "Sacred Sword* (Bojový) & Rock Slide (Kamenný)",
    notes: "Sacred Sword vyžaduje Elite TM. Jeden z nejkonzistentnějších bojových útočníků ve hře, překonávající i většinu stínových bojových pokémonů."
  }
};

export const raidCountersDb: Record<string, RaidCounters> = {
  // Necrozma forms
  "necrozma": {
    bossName: "Necrozma",
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
    maxCp: 2104,
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
    maxCp: 2104,
    minBoostedCp: 2511,
    maxBoostedCp: 2630,
    weatherBoosts: ["Větrno (Windy)", "Mlha (Fog)"]
  },
  // Kanto Legendaries
  "mewtwo": {
    bossName: "Mewtwo",
    weaknesses: ["Bug", "Ghost", "Dark"],
    megaCounters: ["Mega Gengar", "Mega Tyranitar", "Mega Houndoom"],
    advancedCounters: ["Hydreigon (Brutal Swing)", "Giratina Origin (Shadow Ball)", "Darkrai (Dark Pulse)", "Chandelure (Shadow Ball)"],
    budgetCounters: ["Tyranitar (Crunch)", "Weavile (Foul Play)", "Gengar (Shadow Ball)", "Houndoom (Foul Play)"],
    minCp: 2294,
    maxCp: 2387,
    minBoostedCp: 2868,
    maxBoostedCp: 2984,
    weatherBoosts: ["Větrno (Windy)"]
  },
  "articuno": {
    bossName: "Articuno",
    weaknesses: ["Rock (2x)", "Fire", "Electric", "Steel"],
    megaCounters: ["Mega Diancie", "Mega Aerodactyl", "Mega Tyranitar"],
    advancedCounters: ["Rhyperior (Rock Wrecker)", "Rampardos (Rock Slide)", "Terrakion (Rock Slide)", "Tyrantrum (Meteor Beam)"],
    budgetCounters: ["Tyranitar (Stone Edge)", "Gigalith (Meteor Beam)", "Aerodactyl (Rock Slide)", "Aggron (Meteor Beam)"],
    minCp: 1665,
    maxCp: 1743,
    minBoostedCp: 2081,
    maxBoostedCp: 2179,
    weatherBoosts: ["Sněžení (Snow)", "Větrno (Windy)"]
  },
  "zapdos": {
    bossName: "Zapdos",
    weaknesses: ["Ice", "Rock"],
    megaCounters: ["Mega Diancie", "Mega Tyranitar", "Mega Glalie"],
    advancedCounters: ["Rhyperior (Rock Wrecker)", "Rampardos (Rock Slide)", "Mamoswine (Avalanche)", "Terrakion (Rock Slide)"],
    budgetCounters: ["Glaceon (Avalanche)", "Tyranitar (Stone Edge)", "Gigalith (Meteor Beam)", "Weavile (Avalanche)"],
    minCp: 1930,
    maxCp: 2015,
    minBoostedCp: 2413,
    maxBoostedCp: 2519,
    weatherBoosts: ["Deštivo (Rainy)", "Větrno (Windy)"]
  },
  "moltres": {
    bossName: "Moltres",
    weaknesses: ["Rock (2x)", "Water", "Electric"],
    megaCounters: ["Mega Diancie", "Mega Aerodactyl", "Mega Tyranitar"],
    advancedCounters: ["Rhyperior (Rock Wrecker)", "Rampardos (Rock Slide)", "Terrakion (Rock Slide)", "Tyrantrum (Meteor Beam)"],
    budgetCounters: ["Tyranitar (Stone Edge)", "Gigalith (Meteor Beam)", "Aerodactyl (Rock Slide)", "Omastar (Rock Slide)"],
    minCp: 1896,
    maxCp: 1980,
    minBoostedCp: 2370,
    maxBoostedCp: 2475,
    weatherBoosts: ["Slunečno (Sunny)", "Větrno (Windy)"]
  },
  // Johto Legendaries
  "lugia": {
    bossName: "Lugia",
    weaknesses: ["Rock", "Ice", "Ghost", "Electric", "Dark"],
    megaCounters: ["Mega Tyranitar", "Mega Gengar", "Mega Manectric"],
    advancedCounters: ["Xurkitree (Discharge)", "Zekrom (Fusion Bolt)", "Hydreigon (Brutal Swing)", "Gholdengo (Shadow Ball)"],
    budgetCounters: ["Tyranitar (Crunch)", "Electivire (Wild Charge)", "Glaceon (Avalanche)", "Chandelure (Shadow Ball)"],
    minCp: 2028,
    maxCp: 2115,
    minBoostedCp: 2535,
    maxBoostedCp: 2645,
    weatherBoosts: ["Větrno (Windy)"]
  },
  "ho-oh": {
    bossName: "Ho-Oh",
    weaknesses: ["Rock (2x)", "Water", "Electric"],
    megaCounters: ["Mega Diancie", "Mega Aerodactyl", "Mega Tyranitar"],
    advancedCounters: ["Rhyperior (Rock Wrecker)", "Rampardos (Rock Slide)", "Terrakion (Rock Slide)", "Tyrantrum (Meteor Beam)"],
    budgetCounters: ["Tyranitar (Stone Edge)", "Gigalith (Meteor Beam)", "Aerodactyl (Rock Slide)", "Kyogre (Surf)"],
    minCp: 2130,
    maxCp: 2207,
    minBoostedCp: 2663,
    maxBoostedCp: 2759,
    weatherBoosts: ["Slunečno (Sunny)", "Větrno (Windy)"]
  },
  // Hoenn Weather Trio & Eon Duo
  "kyogre": {
    bossName: "Kyogre / Primal Kyogre",
    weaknesses: ["Grass", "Electric"],
    megaCounters: ["Mega Sceptile", "Mega Venusaur", "Mega Manectric"],
    advancedCounters: ["Kartana (Leaf Blade)", "Xurkitree (Discharge)", "Zekrom (Fusion Bolt)", "Zarude (Power Whip)"],
    budgetCounters: ["Sceptile (Frenzy Plant)", "Venusaur (Frenzy Plant)", "Electivire (Wild Charge)", "Magnezone (Wild Charge)"],
    minCp: 2260,
    maxCp: 2351,
    minBoostedCp: 2825,
    maxBoostedCp: 2939,
    weatherBoosts: ["Deštivo (Rainy)"]
  },
  "groudon": {
    bossName: "Groudon / Primal Groudon",
    weaknesses: ["Water", "Grass", "Ice"],
    megaCounters: ["Primal Kyogre", "Mega Swampert", "Mega Sceptile"],
    advancedCounters: ["Kyogre (Origin Pulse)", "Kartana (Leaf Blade)", "Zarude (Power Whip)", "Baxcalibur (Avalanche)"],
    budgetCounters: ["Swampert (Hydro Cannon)", "Gyarados (Hydro Pump)", "Glaceon (Avalanche)", "Mamoswine (Avalanche)"],
    minCp: 2260,
    maxCp: 2351,
    minBoostedCp: 2825,
    maxBoostedCp: 2939,
    weatherBoosts: ["Slunečno (Sunny)"]
  },
  "rayquaza": {
    bossName: "Rayquaza",
    weaknesses: ["Ice (2x)", "Dragon", "Rock", "Fairy"],
    megaCounters: ["Mega Glalie", "Mega Gardevoir", "Mega Abomasnow"],
    advancedCounters: ["Mamoswine (Avalanche)", "Baxcalibur (Avalanche)", "Galarian Darmanitan (Avalanche)", "Kyurem (Glaciate)"],
    budgetCounters: ["Glaceon (Avalanche)", "Weavile (Avalanche)", "Dragonite (Outrage)", "Sylveon (Dazzling Gleam)"],
    minCp: 2102,
    maxCp: 2191,
    minBoostedCp: 2627,
    maxBoostedCp: 2739,
    weatherBoosts: ["Větrno (Windy)"]
  },
  "latias": {
    bossName: "Latias",
    weaknesses: ["Dragon", "Ice", "Bug", "Ghost", "Dark", "Fairy"],
    megaCounters: ["Mega Rayquaza", "Mega Garchomp", "Mega Gardevoir", "Mega Tyranitar"],
    advancedCounters: ["Rayquaza (Outrage)", "Salamence (Outrage)", "Hydreigon (Brutal Swing)", "Dialga (Draco Meteor)"],
    budgetCounters: ["Dragonite (Outrage)", "Garchomp (Outrage)", "Glaceon (Avalanche)", "Gardevoir (Dazzling Gleam)"],
    minCp: 1921,
    maxCp: 2006,
    minBoostedCp: 2402,
    maxBoostedCp: 2507,
    weatherBoosts: ["Větrno (Windy)"]
  },
  "latios": {
    bossName: "Latios",
    weaknesses: ["Dragon", "Ice", "Bug", "Ghost", "Dark", "Fairy"],
    megaCounters: ["Mega Rayquaza", "Mega Garchomp", "Mega Gengar", "Mega Tyranitar"],
    advancedCounters: ["Rayquaza (Outrage)", "Hydreigon (Brutal Swing)", "Giratina Origin (Shadow Ball)", "Salamence (Outrage)"],
    budgetCounters: ["Dragonite (Outrage)", "Garchomp (Outrage)", "Glaceon (Avalanche)", "Chandelure (Shadow Ball)"],
    minCp: 2096,
    maxCp: 2178,
    minBoostedCp: 2620,
    maxBoostedCp: 2723,
    weatherBoosts: ["Větrno (Windy)"]
  },
  // Sinnoh Weather/Creation Trio
  "dialga": {
    bossName: "Dialga (regular & Shadow)",
    weaknesses: ["Fighting", "Ground"],
    megaCounters: ["Mega Lucario", "Mega Blaziken", "Mega Lopunny"],
    advancedCounters: ["Terrakion (Sacred Sword)", "Lucario (Aura Sphere)", "Conkeldurr (Dynamic Punch)", "Groudon (Precipice Blades)"],
    budgetCounters: ["Machamp (Dynamic Punch)", "Hariyama (Dynamic Punch)", "Excadrill (Drill Run)", "Breloom (Dynamic Punch)"],
    minCp: 2045,
    maxCp: 2307,
    minBoostedCp: 2682,
    maxBoostedCp: 2884,
    weatherBoosts: ["Sněžení (Snow)", "Větrno (Windy)"]
  },
  "palkia": {
    bossName: "Palkia (regular & Origin)",
    weaknesses: ["Dragon", "Fairy"],
    megaCounters: ["Mega Rayquaza", "Mega Gardevoir", "Mega Garchomp"],
    advancedCounters: ["Rayquaza (Outrage)", "Palkia Origin (Spacial Rend)", "Dialga Origin (Roar of Time)", "Haxorus (Breaking Swipe)"],
    budgetCounters: ["Dragonite (Outrage)", "Gardevoir (Dazzling Gleam)", "Garchomp (Outrage)", "Sylveon (Dazzling Gleam)"],
    minCp: 2190,
    maxCp: 2280,
    minBoostedCp: 2737,
    maxBoostedCp: 2850,
    weatherBoosts: ["Větrno (Windy)", "Deštivo (Rainy)"]
  },
  "giratina": {
    bossName: "Giratina (Altered & Origin)",
    weaknesses: ["Ghost", "Dark", "Dragon", "Ice", "Fairy"],
    megaCounters: ["Mega Rayquaza", "Mega Garchomp", "Mega Gengar", "Mega Tyranitar"],
    advancedCounters: ["Hydreigon (Brutal Swing)", "Rayquaza (Outrage)", "Giratina Origin (Shadow Ball)", "Darkrai (Dark Pulse)"],
    budgetCounters: ["Dragonite (Outrage)", "Garchomp (Outrage)", "Tyranitar (Crunch)", "Chandelure (Shadow Ball)"],
    minCp: 1848,
    maxCp: 2105,
    minBoostedCp: 2310,
    maxBoostedCp: 2631,
    weatherBoosts: ["Větrno (Windy)", "Mlha (Fog)"]
  },
  // Unova Tao Trio
  "reshiram": {
    bossName: "Reshiram",
    weaknesses: ["Dragon", "Ground", "Rock"],
    megaCounters: ["Mega Rayquaza", "Mega Garchomp", "Mega Diancie"],
    advancedCounters: ["Groudon (Precipice Blades)", "Palkia Origin (Spacial Rend)", "Rayquaza (Outrage)", "Rhyperior (Rock Wrecker)"],
    budgetCounters: ["Dragonite (Outrage)", "Mamoswine (High Horsepower)", "Rampardos (Rock Slide)", "Excadrill (Drill Run)"],
    minCp: 2217,
    maxCp: 2307,
    minBoostedCp: 2771,
    maxBoostedCp: 2884,
    weatherBoosts: ["Slunečno (Sunny)", "Větrno (Windy)"]
  },
  "zekrom": {
    bossName: "Zekrom",
    weaknesses: ["Dragon", "Ground", "Ice", "Fairy"],
    megaCounters: ["Mega Rayquaza", "Mega Garchomp", "Mega Gardevoir"],
    advancedCounters: ["Rayquaza (Outrage)", "Garchomp (Outrage)", "Groudon (Precipice Blades)", "Palkia Origin (Spacial Rend)"],
    budgetCounters: ["Dragonite (Outrage)", "Mamoswine (Avalanche)", "Gardevoir (Dazzling Gleam)", "Excadrill (Drill Run)"],
    minCp: 2217,
    maxCp: 2307,
    minBoostedCp: 2771,
    maxBoostedCp: 2884,
    weatherBoosts: ["Větrno (Windy)", "Deštivo (Rainy)"]
  },
  "kyurem": {
    bossName: "Kyurem",
    weaknesses: ["Fighting", "Rock", "Steel", "Dragon", "Fairy"],
    megaCounters: ["Mega Lucario", "Mega Diancie", "Mega Rayquaza"],
    advancedCounters: ["Terrakion (Sacred Sword)", "Metagross (Meteor Mash)", "Lucario (Aura Sphere)", "Shadow Metagross"],
    budgetCounters: ["Machamp (Dynamic Punch)", "Conkeldurr (Dynamic Punch)", "Excadrill (Iron Head)", "Rampardos (Rock Slide)"],
    minCp: 1957,
    maxCp: 2042,
    minBoostedCp: 2446,
    maxBoostedCp: 2553,
    weatherBoosts: ["Slunečno (Sunny)", "Sněžení (Snow)"]
  },
  // Kalos Aura Trio
  "xerneas": {
    bossName: "Xerneas",
    weaknesses: ["Poison", "Steel"],
    megaCounters: ["Mega Gengar", "Mega Beedrill"],
    advancedCounters: ["Metagross (Meteor Mash)", "Nihilego (Sludge Bomb)", "Shadow Metagross", "Shadow Excadrill"],
    budgetCounters: ["Excadrill (Iron Head)", "Gengar (Sludge Bomb)", "Roserade (Sludge Bomb)", "Melmetal (Double Iron Bash)"],
    minCp: 2073,
    maxCp: 2160,
    minBoostedCp: 2591,
    maxBoostedCp: 2701,
    weatherBoosts: ["Zataženo (Cloudy)"]
  },
  "yveltal": {
    bossName: "Yveltal",
    weaknesses: ["Electric", "Ice", "Rock", "Fairy"],
    megaCounters: ["Mega Diancie", "Mega Manectric", "Mega Gardevoir"],
    advancedCounters: ["Xurkitree (Discharge)", "Zekrom (Fusion Bolt)", "Rhyperior (Rock Wrecker)", "Mamoswine (Avalanche)"],
    budgetCounters: ["Electivire (Wild Charge)", "Glaceon (Avalanche)", "Tyranitar (Stone Edge)", "Sylveon (Dazzling Gleam)"],
    minCp: 2073,
    maxCp: 2160,
    minBoostedCp: 2591,
    maxBoostedCp: 2701,
    weatherBoosts: ["Větrno (Windy)", "Mlha (Fog)"]
  },
  // Ultra Beasts
  "celesteela": {
    bossName: "Celesteela",
    weaknesses: ["Fire", "Electric"],
    megaCounters: ["Mega Charizard Y", "Mega Blaziken", "Mega Manectric"],
    advancedCounters: ["Reshiram (Fusion Flare)", "Zekrom (Fusion Bolt)", "Xurkitree (Discharge)", "Raikou (Wild Charge)"],
    budgetCounters: ["Chandelure (Overheat)", "Charizard (Blast Burn)", "Electivire (Wild Charge)", "Magnezone (Wild Charge)"],
    minCp: 1694,
    maxCp: 1772,
    minBoostedCp: 2117,
    maxBoostedCp: 2216,
    weatherBoosts: ["Sněžení (Snow)", "Větrno (Windy)"]
  },
  "kartana": {
    bossName: "Kartana",
    weaknesses: ["Fire (2x)", "Fighting"],
    megaCounters: ["Mega Blaziken", "Mega Charizard Y", "Mega Houndoom"],
    advancedCounters: ["Reshiram (Overheat)", "Chandelure (Overheat)", "Darmanitan (Overheat)", "Heatran (Magma Storm)"],
    budgetCounters: ["Charizard (Blast Burn)", "Flareon (Overheat)", "Blaziken (Blast Burn)", "Entei (Overheat)"],
    minCp: 2010,
    maxCp: 2101,
    minBoostedCp: 2512,
    maxBoostedCp: 2626,
    weatherBoosts: ["Slunečno (Sunny)", "Sněžení (Snow)"]
  },
  "xurkitree": {
    bossName: "Xurkitree",
    weaknesses: ["Ground"],
    megaCounters: ["Primal Groudon", "Mega Garchomp"],
    advancedCounters: ["Groudon (Precipice Blades)", "Shadow Mamoswine", "Landorus Therian (Sandsear Storm)", "Garchomp (Earth Power)"],
    budgetCounters: ["Excadrill (Drill Run)", "Rhyperior (Earthquake)", "Mamoswine (High Horsepower)", "Krookodile (Earthquake)"],
    minCp: 2163,
    maxCp: 2249,
    minBoostedCp: 2704,
    maxBoostedCp: 2812,
    weatherBoosts: ["Deštivo (Rainy)"]
  },
  "nihilego": {
    bossName: "Nihilego",
    weaknesses: ["Ground (2x)", "Water", "Psychic", "Steel"],
    megaCounters: ["Primal Groudon", "Mega Garchomp", "Mega Alakazam"],
    advancedCounters: ["Groudon (Precipice Blades)", "Mewtwo (Psystrike)", "Shadow Mamoswine", "Excadrill (Drill Run)"],
    budgetCounters: ["Rhyperior (Earthquake)", "Mamoswine (High Horsepower)", "Espeon (Psychic)", "Alakazam (Psychic)"],
    minCp: 2165,
    maxCp: 2256,
    minBoostedCp: 2707,
    maxBoostedCp: 2821,
    weatherBoosts: ["Zataženo (Cloudy)", "Slunečno (Sunny)"]
  },
  "guzzlord": {
    bossName: "Guzzlord",
    weaknesses: ["Fairy (2x)", "Fighting", "Bug", "Ice", "Dragon"],
    megaCounters: ["Mega Gardevoir", "Mega Alakazam"],
    advancedCounters: ["Gardevoir (Dazzling Gleam)", "Shadow Gardevoir", "Granbull (Play Rough)", "Xerneas (Geomancy)"],
    budgetCounters: ["Sylveon (Dazzling Gleam)", "Togekiss (Dazzling Gleam)", "Clefable (Dazzling Gleam)", "Primarina (Moonblast)"],
    minCp: 1565,
    maxCp: 1650,
    minBoostedCp: 1956,
    maxBoostedCp: 2062,
    weatherBoosts: ["Mlha (Fog)", "Zataženo (Cloudy)"]
  },
  // Key Megas / Primals
  "mega charizard y": {
    bossName: "Mega Charizard Y",
    weaknesses: ["Rock (2x)", "Water", "Electric"],
    megaCounters: ["Mega Diancie", "Mega Aerodactyl", "Mega Tyranitar"],
    advancedCounters: ["Rhyperior (Rock Wrecker)", "Rampardos (Rock Slide)", "Terrakion (Rock Slide)", "Tyrantrum (Meteor Beam)"],
    budgetCounters: ["Tyranitar (Stone Edge)", "Gigalith (Meteor Beam)", "Aerodactyl (Rock Slide)", "Kyogre (Surf)"],
    minCp: 1578,
    maxCp: 1655,
    minBoostedCp: 1972,
    maxBoostedCp: 2069,
    weatherBoosts: ["Slunečno (Sunny)", "Větrno (Windy)"]
  },
  "mega charizard x": {
    bossName: "Mega Charizard X",
    weaknesses: ["Dragon", "Ground", "Rock"],
    megaCounters: ["Mega Rayquaza", "Mega Garchomp", "Mega Diancie"],
    advancedCounters: ["Rayquaza (Outrage)", "Groudon (Precipice Blades)", "Palkia Origin (Spacial Rend)", "Rhyperior (Rock Wrecker)"],
    budgetCounters: ["Dragonite (Outrage)", "Garchomp (Outrage)", "Tyranitar (Stone Edge)", "Excadrill (Drill Run)"],
    minCp: 1578,
    maxCp: 1655,
    minBoostedCp: 1972,
    maxBoostedCp: 2069,
    weatherBoosts: ["Slunečno (Sunny)", "Větrno (Windy)"]
  },
  "mega swampert": {
    bossName: "Mega Swampert",
    weaknesses: ["Grass (2x)"],
    megaCounters: ["Mega Sceptile", "Mega Venusaur"],
    advancedCounters: ["Kartana (Leaf Blade)", "Zarude (Power Whip)", "Shadow Tangrowth", "Shadow Venusaur"],
    budgetCounters: ["Sceptile (Frenzy Plant)", "Venusaur (Frenzy Plant)", "Tangrowth (Power Whip)", "Roserade (Grass Knot)"],
    minCp: 1697,
    maxCp: 1777,
    minBoostedCp: 2121,
    maxBoostedCp: 2221,
    weatherBoosts: ["Deštivo (Rainy)", "Slunečno (Sunny)"]
  },
  "mega sceptile": {
    bossName: "Mega Sceptile",
    weaknesses: ["Ice (2x)", "Dragon", "Fairy", "Flying", "Poison", "Bug"],
    megaCounters: ["Mega Glalie", "Mega Gardevoir", "Mega Rayquaza"],
    advancedCounters: ["Mamoswine (Avalanche)", "Baxcalibur (Avalanche)", "Rayquaza (Outrage)", "Shadow Mamoswine"],
    budgetCounters: ["Glaceon (Avalanche)", "Weavile (Avalanche)", "Dragonite (Outrage)", "Sylveon (Dazzling Gleam)"],
    minCp: 1517,
    maxCp: 1593,
    minBoostedCp: 1897,
    maxBoostedCp: 1992,
    weatherBoosts: ["Slunečno (Sunny)", "Větrno (Windy)"]
  },
  "mega blaziken": {
    bossName: "Mega Blaziken",
    weaknesses: ["Flying", "Ground", "Water", "Psychic"],
    megaCounters: ["Mega Rayquaza", "Primal Kyogre", "Mega Alakazam"],
    advancedCounters: ["Mewtwo (Psystrike)", "Kyogre (Origin Pulse)", "Groudon (Precipice Blades)", "Rayquaza (Dragon Ascent)"],
    budgetCounters: ["Swampert (Hydro Cannon)", "Espeon (Psychic)", "Alakazam (Psychic)", "Excadrill (Drill Run)"],
    minCp: 1548,
    maxCp: 1625,
    minBoostedCp: 1935,
    maxBoostedCp: 2031,
    weatherBoosts: ["Slunečno (Sunny)", "Zataženo (Cloudy)"]
  },
  "mega gardevoir": {
    bossName: "Mega Gardevoir",
    weaknesses: ["Poison", "Ghost", "Steel"],
    megaCounters: ["Mega Gengar", "Mega Banette", "Mega Scizor"],
    advancedCounters: ["Metagross (Meteor Mash)", "Nihilego (Sludge Bomb)", "Gholdengo (Shadow Ball)", "Shadow Metagross"],
    budgetCounters: ["Excadrill (Iron Head)", "Chandelure (Shadow Ball)", "Gengar (Shadow Ball)", "Roserade (Sludge Bomb)"],
    minCp: 1924,
    maxCp: 2012,
    minBoostedCp: 2405,
    maxBoostedCp: 2515,
    weatherBoosts: ["Zataženo (Cloudy)", "Větrno (Windy)"]
  },
  "mega gengar": {
    bossName: "Mega Gengar",
    weaknesses: ["Ghost", "Dark", "Ground", "Psychic"],
    megaCounters: ["Mega Tyranitar", "Primal Groudon", "Mega Alakazam"],
    advancedCounters: ["Mewtwo (Psystrike)", "Groudon (Precipice Blades)", "Hydreigon (Brutal Swing)", "Shadow Mewtwo"],
    budgetCounters: ["Tyranitar (Crunch)", "Excadrill (Drill Run)", "Espeon (Psychic)", "Chandelure (Shadow Ball)"],
    minCp: 1554,
    maxCp: 1629,
    minBoostedCp: 1942,
    maxBoostedCp: 2037,
    weatherBoosts: ["Mlha (Fog)", "Zataženo (Cloudy)"]
  },
  "mega garchomp": {
    bossName: "Mega Garchomp",
    weaknesses: ["Ice (2x)", "Dragon", "Fairy"],
    megaCounters: ["Mega Glalie", "Mega Gardevoir", "Mega Rayquaza"],
    advancedCounters: ["Mamoswine (Avalanche)", "Baxcalibur (Avalanche)", "Rayquaza (Outrage)", "Kyurem (Glaciate)"],
    budgetCounters: ["Glaceon (Avalanche)", "Weavile (Avalanche)", "Dragonite (Outrage)", "Sylveon (Dazzling Gleam)"],
    minCp: 2174,
    maxCp: 2264,
    minBoostedCp: 2718,
    maxBoostedCp: 2830,
    weatherBoosts: ["Slunečno (Sunny)", "Větrno (Windy)"]
  },
  "mega tyranitar": {
    bossName: "Mega Tyranitar",
    weaknesses: ["Fighting (2x)", "Water", "Grass", "Ground", "Bug", "Steel", "Fairy"],
    megaCounters: ["Mega Blaziken", "Mega Lopunny"],
    advancedCounters: ["Terrakion (Sacred Sword)", "Keldeo (Sacred Sword)", "Lucario (Aura Sphere)", "Conkeldurr (Dynamic Punch)"],
    budgetCounters: ["Machamp (Dynamic Punch)", "Hariyama (Dynamic Punch)", "Breloom (Dynamic Punch)", "Sirfetch'd (Close Combat)"],
    minCp: 2114,
    maxCp: 2199,
    minBoostedCp: 2643,
    maxBoostedCp: 2749,
    weatherBoosts: ["Mlha (Fog)", "Částečně zataženo (Partly Cloudy)"]
  },
  "mega lucario": {
    bossName: "Mega Lucario",
    weaknesses: ["Fighting", "Ground", "Fire"],
    megaCounters: ["Mega Blaziken", "Primal Groudon", "Mega Charizard Y"],
    advancedCounters: ["Terrakion (Sacred Sword)", "Reshiram (Fusion Flare)", "Groudon (Precipice Blades)", "Mewtwo (Psystrike)"],
    budgetCounters: ["Machamp (Dynamic Punch)", "Excadrill (Drill Run)", "Chandelure (Overheat)", "Flareon (Overheat)"],
    minCp: 1750,
    maxCp: 1840,
    minBoostedCp: 2187,
    maxBoostedCp: 2300,
    weatherBoosts: ["Zataženo (Cloudy)", "Sněžení (Snow)"]
  },
  "primal kyogre": {
    bossName: "Primal Kyogre",
    weaknesses: ["Grass", "Electric"],
    megaCounters: ["Mega Sceptile", "Mega Venusaur", "Mega Manectric"],
    advancedCounters: ["Kartana (Leaf Blade)", "Xurkitree (Discharge)", "Zekrom (Fusion Bolt)", "Zarude (Power Whip)"],
    budgetCounters: ["Sceptile (Frenzy Plant)", "Venusaur (Frenzy Plant)", "Electivire (Wild Charge)", "Magnezone (Wild Charge)"],
    minCp: 2260,
    maxCp: 2351,
    minBoostedCp: 2825,
    maxBoostedCp: 2939,
    weatherBoosts: ["Deštivo (Rainy)"]
  },
  "primal groudon": {
    bossName: "Primal Groudon",
    weaknesses: ["Water (2x)", "Ground"],
    megaCounters: ["Primal Kyogre", "Mega Swampert", "Mega Blastoise"],
    advancedCounters: ["Kyogre (Origin Pulse)", "Shadow Swampert", "Shadow Feraligatr", "Shadow Gyarados"],
    budgetCounters: ["Swampert (Hydro Cannon)", "Gyarados (Hydro Pump)", "Feraligatr (Hydro Cannon)", "Samurott (Hydro Cannon)"],
    minCp: 2260,
    maxCp: 2351,
    minBoostedCp: 2825,
    maxBoostedCp: 2939,
    weatherBoosts: ["Slunečno (Sunny)", "Mlha (Fog)"]
  },
  "mega pidgeot": {
    bossName: "Mega Pidgeot",
    weaknesses: ["Electric", "Ice", "Rock"],
    megaCounters: ["Mega Manectric", "Mega Aerodactyl", "Mega Abomasnow"],
    advancedCounters: ["Xurkitree (Discharge)", "Zekrom (Fusion Bolt)", "Raikou (Wild Charge)", "Mamoswine (Avalanche)"],
    budgetCounters: ["Electivire (Wild Charge)", "Magnezone (Wild Charge)", "Glaceon (Avalanche)", "Rhyperior (Rock Wrecker)"],
    minCp: 1151,
    maxCp: 1216,
    minBoostedCp: 1439,
    maxBoostedCp: 1521,
    weatherBoosts: ["Částečně zataženo (Partly Cloudy)", "Větrno (Windy)"]
  },
  "mega lopunny": {
    bossName: "Mega Lopunny",
    weaknesses: ["Fighting", "Psychic", "Flying", "Fairy"],
    megaCounters: ["Mega Alakazam", "Mega Gardevoir", "Mega Rayquaza"],
    advancedCounters: ["Mewtwo (Psystrike)", "Terrakion (Sacred Sword)", "Lucario (Aura Sphere)", "Conkeldurr (Dynamic Punch)"],
    budgetCounters: ["Machamp (Dynamic Punch)", "Gardevoir (Psychic)", "Alakazam (Psychic)", "Gallade (Psychic)"],
    minCp: 1112,
    maxCp: 1177,
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
    maxCp: 2191,
    minBoostedCp: 2627,
    maxBoostedCp: 2739,
    weatherBoosts: ["Větrno (Windy)"]
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
  "hisuian braviary": {
    bossName: "Hisuian Braviary",
    weaknesses: ["Rock", "Ice", "Ghost", "Electric", "Dark"],
    megaCounters: ["Mega Tyranitar", "Mega Gengar", "Mega Manectric"],
    advancedCounters: ["Xurkitree (Discharge)", "Zekrom (Fusion Bolt)", "Hydreigon (Brutal Swing)", "Mamoswine (Avalanche)"],
    budgetCounters: ["Tyranitar (Crunch)", "Electivire (Wild Charge)", "Glaceon (Avalanche)", "Chandelure (Shadow Ball)"],
    minCp: 1531,
    maxCp: 1608,
    minBoostedCp: 1914,
    maxBoostedCp: 2010,
    weatherBoosts: ["Větrno (Windy)"]
  },
  "bombirdier": {
    bossName: "Bombirdier",
    weaknesses: ["Electric", "Ice", "Rock", "Fairy"],
    megaCounters: ["Mega Manectric", "Mega Diancie", "Mega Gardevoir"],
    advancedCounters: ["Xurkitree (Discharge)", "Zekrom (Fusion Bolt)", "Rampardos (Rock Wrecker)", "Mamoswine (Avalanche)"],
    budgetCounters: ["Electivire (Wild Charge)", "Glaceon (Avalanche)", "Rhyperior (Rock Wrecker)", "Sylveon (Dazzling Gleam)"],
    minCp: 1351,
    maxCp: 1421,
    minBoostedCp: 1688,
    maxBoostedCp: 1777,
    weatherBoosts: ["Větrno (Windy)", "Mlha (Fog)"]
  }
};

export const typeAttackersDb: Record<string, { mega: string[]; advanced: string[]; budget: string[] }> = {
  normal: {
    mega: ["Mega Lopunny"],
    advanced: ["Regigigas (Giga Impact)", "Ursaluna (High Horsepower)", "Shadow Staraptor"],
    budget: ["Ursaring (Hyper Beam)", "Staraptor (Fly)", "Snorlax (Body Slam)"]
  },
  fire: {
    mega: ["Mega Blaziken", "Mega Charizard Y", "Mega Houndoom"],
    advanced: ["Reshiram (Fusion Flare)", "Shadow Chandelure", "Shadow Entei", "Shadow Moltres", "Heatran (Magma Storm)"],
    budget: ["Chandelure (Overheat)", "Charizard (Blast Burn)", "Flareon (Overheat)", "Darmanitan (Overheat)", "Blaziken (Blast Burn)"]
  },
  water: {
    mega: ["Primal Kyogre", "Mega Swampert", "Mega Blastoise"],
    advanced: ["Kyogre (Origin Pulse)", "Shadow Swampert", "Shadow Feraligatr", "Shadow Gyarados", "Greninja (Hydro Cannon)"],
    budget: ["Swampert (Hydro Cannon)", "Gyarados (Hydro Pump)", "Feraligatr (Hydro Cannon)", "Samurott (Hydro Cannon)"]
  },
  electric: {
    mega: ["Mega Manectric", "Mega Ampharos"],
    advanced: ["Xurkitree (Discharge)", "Zekrom (Fusion Bolt)", "Shadow Raikou", "Shadow Electivire", "Therian Thundurus"],
    budget: ["Electivire (Wild Charge)", "Magnezone (Wild Charge)", "Jolteon (Discharge)", "Luxray (Wild Charge)"]
  },
  grass: {
    mega: ["Mega Sceptile", "Mega Venusaur"],
    advanced: ["Kartana (Leaf Blade)", "Shadow Tangrowth", "Shadow Venusaur", "Zarude (Power Whip)", "Shaymin Sky"],
    budget: ["Sceptile (Frenzy Plant)", "Venusaur (Frenzy Plant)", "Tangrowth (Power Whip)", "Roserade (Grass Knot)"]
  },
  ice: {
    mega: ["Mega Abomasnow", "Mega Glalie"],
    advanced: ["Shadow Mamoswine", "Baxcalibur (Avalanche)", "Mamoswine (Avalanche)", "Shadow Weavile"],
    budget: ["Glaceon (Avalanche)", "Weavile (Avalanche)", "Beartic (Ice Punch)", "Aurorus (Weather Ball)"]
  },
  fighting: {
    mega: ["Mega Blaziken", "Mega Lopunny"],
    advanced: ["Terrakion (Sacred Sword)", "Keldeo (Sacred Sword)", "Lucario (Aura Sphere)", "Shadow Machamp", "Shadow Hariyama"],
    budget: ["Machamp (Dynamic Punch)", "Hariyama (Dynamic Punch)", "Conkeldurr (Dynamic Punch)", "Sirfetch'd (Close Combat)"]
  },
  poison: {
    mega: ["Mega Beedrill", "Mega Gengar"],
    advanced: ["Nihilego (Sludge Bomb)", "Shadow Victreebel", "Shadow Skuntank", "Overqwil (Gunk Shot)"],
    budget: ["Roserade (Sludge Bomb)", "Gengar (Sludge Bomb)", "Victreebel (Sludge Bomb)", "Toxicroak (Sludge Bomb)"]
  },
  ground: {
    mega: ["Primal Groudon", "Mega Garchomp"],
    advanced: ["Groudon (Precipice Blades)", "Shadow Mamoswine", "Shadow Garchomp", "Landorus Therian (Sandsear Storm)"],
    budget: ["Excadrill (Drill Run)", "Mamoswine (High Horsepower)", "Rhyperior (Earthquake)", "Krookodile (Earthquake)"]
  },
  flying: {
    mega: ["Mega Rayquaza", "Mega Pidgeot"],
    advanced: ["Rayquaza (Dragon Ascent)", "Shadow Moltres", "Shadow Staraptor", "Yveltal (Oblivion Wing)"],
    budget: ["Staraptor (Fly)", "Honchkrow (Sky Attack)", "Unfezant (Sky Attack)", "Togekiss (Air Slash)"]
  },
  psychic: {
    mega: ["Mega Alakazam", "Mega Latios", "Mega Gardevoir"],
    advanced: ["Mewtwo (Psystrike)", "Shadow Mewtwo", "Shadow Alakazam", "Shadow Metagross"],
    budget: ["Espeon (Psychic)", "Alakazam (Psychic)", "Gardevoir (Psychic)", "Metagross (Psychic)"]
  },
  bug: {
    mega: ["Mega Pinsir", "Mega Scizor"],
    advanced: ["Volcarona (Bug Buzz)", "Pheromosa (Bug Buzz)", "Shadow Scizor", "Vikavolt (X-Scissor)"],
    budget: ["Pinsir (X-Scissor)", "Scizor (X-Scissor)", "Yanmega (Bug Buzz)", "Accelgor (Bug Buzz)"]
  },
  rock: {
    mega: ["Mega Diancie", "Mega Tyranitar", "Mega Aerodactyl"],
    advanced: ["Shadow Tyranitar", "Shadow Rhyperior", "Rhyperior (Rock Wrecker)", "Terrakion (Rock Slide)", "Rampardos (Rock Slide)"],
    budget: ["Tyranitar (Stone Edge)", "Gigalith (Meteor Beam)", "Aerodactyl (Rock Slide)", "Archeops (Ancient Power)"]
  },
  ghost: {
    mega: ["Mega Gengar", "Mega Banette"],
    advanced: ["Giratina Origin (Shadow Ball)", "Shadow Gengar", "Shadow Chandelure", "Gholdengo (Shadow Ball)"],
    budget: ["Chandelure (Shadow Ball)", "Gengar (Shadow Ball)", "Banette (Shadow Ball)", "Drifblim (Shadow Ball)"]
  },
  dragon: {
    mega: ["Mega Rayquaza", "Mega Garchomp", "Mega Salamence", "Mega Latios"],
    advanced: ["Rayquaza (Outrage)", "Palkia Origin (Spacial Rend)", "Dialga Origin (Roar of Time)", "Shadow Salamence", "Shadow Garchomp"],
    budget: ["Dragonite (Outrage)", "Salamence (Outrage)", "Haxorus (Breaking Swipe)", "Garchomp (Outrage)"]
  },
  dark: {
    mega: ["Mega Tyranitar", "Mega Houndoom", "Mega Gyarados"],
    advanced: ["Tyranitar (Brutal Swing)", "Hydreigon (Brutal Swing)", "Shadow Tyranitar", "Darkrai (Dark Pulse)", "Yveltal (Dark Pulse)"],
    budget: ["Houndoom (Foul Play)", "Weavile (Foul Play)", "Honchkrow (Dark Pulse)", "Krookodile (Foul Play)"]
  },
  steel: {
    mega: ["Mega Scizor"],
    advanced: ["Dusk Mane Necrozma (Sunsteel Strike)", "Shadow Metagross", "Metagross (Meteor Mash)", "Shadow Scizor"],
    budget: ["Excadrill (Iron Head)", "Dialga (Iron Head)", "Melmetal (Double Iron Bash)", "Scizor (Iron Head)"]
  },
  fairy: {
    mega: ["Mega Gardevoir"],
    advanced: ["Gardevoir (Dazzling Gleam)", "Shadow Gardevoir", "Shadow Granbull", "Xerneas (Geomancy)"],
    budget: ["Sylveon (Dazzling Gleam)", "Togekiss (Dazzling Gleam)", "Granbull (Play Rough)", "Florges (Moonblast)"]
  }
};

const typeChart: Record<string, Record<string, number>> = {
  normal: { rock: 0.5, ghost: 0, steel: 0.5 },
  fire: { fire: 0.5, water: 0.5, grass: 2, ice: 2, bug: 2, rock: 0.5, dragon: 0.5, steel: 2 },
  water: { fire: 2, water: 0.5, grass: 0.5, ground: 2, rock: 2, dragon: 0.5 },
  electric: { water: 2, electric: 0.5, grass: 0.5, ground: 0, flying: 2, dragon: 0.5 },
  grass: { fire: 0.5, water: 2, grass: 0.5, poison: 0.5, ground: 2, flying: 0.5, bug: 0.5, rock: 2, dragon: 0.5, steel: 0.5 },
  ice: { fire: 0.5, water: 0.5, grass: 2, ice: 0.5, ground: 2, flying: 2, dragon: 2, steel: 0.5 },
  fighting: { normal: 2, ice: 2, poison: 0.5, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 2, ghost: 0, dark: 2, steel: 2, fairy: 0.5 },
  poison: { grass: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0, fairy: 2 },
  ground: { fire: 2, electric: 2, grass: 0.5, poison: 2, flying: 0, bug: 0.5, rock: 2, steel: 2 },
  flying: { electric: 0.5, grass: 2, fighting: 2, bug: 2, rock: 0.5, steel: 0.5 },
  psychic: { fighting: 2, poison: 2, psychic: 0.5, dark: 0, steel: 0.5 },
  bug: { fire: 0.5, fighting: 0.5, poison: 0.5, flying: 0.5, ghost: 0.5, steel: 0.5, grass: 2, psychic: 2, dark: 2, fairy: 0.5 },
  rock: { fire: 2, ice: 2, fighting: 0.5, ground: 0.5, flying: 2, bug: 2, steel: 0.5 },
  ghost: { normal: 0, psychic: 2, ghost: 2, dark: 0.5 },
  dragon: { dragon: 2, steel: 0.5, fairy: 0 },
  dark: { fighting: 0.5, psychic: 2, ghost: 2, dark: 0.5, fairy: 0.5 },
  steel: { fire: 0.5, water: 0.5, electric: 0.5, ice: 2, rock: 2, steel: 0.5, fairy: 2 },
  fairy: { fire: 0.5, fighting: 2, poison: 0.5, dragon: 2, dark: 2, steel: 0.5 }
};

function parseCpString(cpStr?: string): { min: number; max: number } {
  if (!cpStr) return { min: 0, max: 0 };
  const parts = cpStr.split(/[–-]/).map(p => parseInt(p.replace(/[^\d]/g, ''), 10));
  if (parts.length === 2) {
    return { min: parts[0] || 0, max: parts[1] || 0 };
  }
  if (parts.length === 1) {
    return { min: 0, max: parts[0] || 0 };
  }
  return { min: 0, max: 0 };
}

export function generateDynamicCounters(
  bossName: string, 
  bossTypes: string[], 
  scrapedCpRange?: string, 
  scrapedBoostedCpRange?: string, 
  scrapedWeatherBoosts?: string[]
): RaidCounters {
  const vulnerabilities: { type: string; multiplier: number }[] = [];
  const cleanBossTypes = bossTypes.map(t => t.toLowerCase());

  for (const attackingType of Object.keys(typeChart)) {
    let multiplier = 1.0;
    for (const defenderType of cleanBossTypes) {
      const effect = typeChart[attackingType][defenderType];
      if (effect !== undefined) {
        multiplier *= effect;
      }
    }
    if (multiplier > 1.0) {
      vulnerabilities.push({ type: attackingType, multiplier });
    }
  }

  vulnerabilities.sort((a, b) => b.multiplier - a.multiplier);

  const weaknesses = vulnerabilities.map(v => {
    const capType = v.type.charAt(0).toUpperCase() + v.type.slice(1);
    return v.multiplier > 2.0 ? `${capType} (2x)` : capType;
  });

  const megaCounters: string[] = [];
  const advancedCounters: string[] = [];
  const budgetCounters: string[] = [];

  for (const vuln of vulnerabilities) {
    const attackers = typeAttackersDb[vuln.type];
    if (attackers) {
      attackers.mega.forEach(c => { if (!megaCounters.includes(c)) megaCounters.push(c); });
      attackers.advanced.forEach(c => { if (!advancedCounters.includes(c)) advancedCounters.push(c); });
      attackers.budget.forEach(c => { if (!budgetCounters.includes(c)) budgetCounters.push(c); });
    }
  }

  const regularCp = parseCpString(scrapedCpRange);
  const boostedCp = parseCpString(scrapedBoostedCpRange);

  return {
    bossName,
    weaknesses,
    megaCounters: megaCounters.slice(0, 3),
    advancedCounters: advancedCounters.slice(0, 4),
    budgetCounters: budgetCounters.slice(0, 4),
    minCp: regularCp.min,
    maxCp: regularCp.max,
    minBoostedCp: boostedCp.min,
    maxBoostedCp: boostedCp.max,
    weatherBoosts: scrapedWeatherBoosts || []
  };
}

const BOSS_COUNTERS_DB: Record<string, { bestCounters: string[]; details: string }> = {
  "persian": {
    bestCounters: ["Lucario (Counter/Aura Sphere)", "Terrakion (Double Kick/Sacred Sword)", "Machamp (Counter/Cross Chop)"],
    details: "Persian dává velké rychlé poškození. Bojový typ s rychlým nabíjením charged útoků je nutností pro zničení Giovanniho štítů."
  },
  "rhyperior": {
    bestCounters: ["Kyogre (Waterfall/Surf)", "Kartana (Razor Leaf/Leaf Blade)", "Zarude (Vine Whip/Power Whip)"],
    details: "Rhyperior má dvojitou slabost na travní a vodní útoky. Kartana nebo Kyogre ho zničí během pár sekund."
  },
  "kangaskhan": {
    bestCounters: ["Lucario (Counter/Aura Sphere)", "Terrakion (Double Kick/Sacred Sword)", "Machamp (Counter/Dynamic Punch)"],
    details: "Kangaskhan je čistě normální typ a má slabost pouze na bojové (Fighting) útoky. Lucario s Power-Up Punch ho zničí snadno."
  },
  "nidoking": {
    bestCounters: ["Kyogre (Waterfall/Surf)", "Mamoswine (Powder Snow/Avalanche)", "Mewtwo (Confusion/Psystrike)"],
    details: "Nidoking má slabost vůči vodě, ledu, zemi a psychickým útokům. Mamoswine nebo Kyogre ho vyřadí bez potíží."
  },
  "reshiram": {
    bestCounters: ["Primal Groudon (Mud-Shot/Precipice Blades)", "Mega Garchomp (Dragon Tail/Outrage)", "Rayquaza (Dragon Tail/Outrage)"],
    details: "Reshiram má slabost vůči drakům, zemi a kamenným útokům. Pozor na jeho silné ohnivé útoky."
  },
  "landorus": {
    bestCounters: ["Mamoswine (Powder Snow/Avalanche)", "Glaceon (Frost Breath/Avalanche)", "Kyogre (Waterfall/Surf)"],
    details: "Shadow Landorus je Ground/Flying typ, což znamená dvojitou slabost na led (Ice). Ledový Mamoswine ho zničí extrémně rychle."
  },
  "axew": {
    bestCounters: ["Mamoswine (Powder Snow/Avalanche)", "Togekiss (Charm/Ancient Power)", "Gardevoir (Charm/Dazzling Gleam)"],
    details: "Dračí slabost vůči ledu a vílím pokémonům. Mamoswine nebo vílí Charm ho vyřadí rychle."
  },
  "snorlax": {
    bestCounters: ["Machamp (Counter/Dynamic Punch)", "Lucario (Counter/Aura Sphere)", "Terrakion (Double Kick/Sacred Sword)"],
    details: "Snorlax je velmi tanky. Bojové typy jsou nutností. Pozor na útok Zen Headbutt, který ubližuje bojovým pokémonům."
  },
  "camerupt": {
    bestCounters: ["Kyogre (Waterfall/Surf)", "Swampert (Mud-Shot/Hydro Cannon)", "Gyarados (Waterfall/Hydro Pump)"],
    details: "Camerupt má dvojitou slabost na vodu. Jakýkoliv vodní útok ho vyřadí bleskově."
  },
  "gallade": {
    bestCounters: ["Mewtwo (Confusion/Psystrike)", "Togekiss (Charm/Dazzling Gleam)", "Gengar (Shadow Claw/Shadow Ball)"],
    details: "Psychic/Fighting typ. Má slabost vůči Flying, Ghost a Fairy. Togekiss nebo Gardevoir jsou ideální volbou."
  },
  "tyranitar": {
    bestCounters: ["Machamp (Counter/Dynamic Punch)", "Lucario (Counter/Aura Sphere)", "Terrakion (Double Kick/Sacred Sword)"],
    details: "Má dvojitou slabost na bojové útoky (Fighting). Libovolný bojový pokémon ho zničí extrémně rychle."
  },
  "tyrunt": {
    bestCounters: ["Mamoswine (Powder Snow/Avalanche)", "Metagross (Bullet Punch/Meteor Mash)", "Lucario (Counter/Aura Sphere)"],
    details: "Rock/Dragon typ. Má slabost na bojové, zemní, ledové, ocelové, dračí a vílí útoky. Velmi zranitelný."
  },
  "steelix": {
    bestCounters: ["Reshiram (Fire Fang/Overheat)", "Chandelure (Fire Spin/Overheat)", "Kyogre (Waterfall/Surf)", "Groudon (Precipice Blades)"],
    details: "Velmi vysoká obrana. Má slabost na oheň, vodu, boj a zemi. Ohniví nebo vodní útočníci jsou nejlepší."
  },
  "golurk": {
    bestCounters: ["Kyogre (Waterfall/Surf)", "Mamoswine (Powder Snow/Avalanche)", "Hydreigon (Bite/Brutal Swing)"],
    details: "Ground/Ghost typ. Slabosti: voda, tráva, led, duch, tma. Kyogre ho spláchne velmi rychle."
  },
  "slowbro": {
    bestCounters: ["Xurkitree (Thunder Shock/Discharge)", "Kartana (Razor Leaf/Leaf Blade)", "Hydreigon (Bite/Brutal Swing)"],
    details: "Water/Psychic typ. Slabý vůči elektrice, trávě, hmyzu, duchům a tmě. Kartana nebo Xurkitree ho vyřadí snadno."
  },
  "alakazam": {
    bestCounters: ["Tyranitar (Bite/Brutal Swing)", "Hydreigon (Bite/Brutal Swing)", "Chandelure (Fire Spin/Shadow Ball)"],
    details: "Čistě psychický typ s vysokým útokem, ale slabou obranou. Temní pokémoni (Tyranitar) ho zničí dřív, než nabije útok."
  },
  "charizard": {
    bestCounters: ["Rhyperior (Smack Down/Rock Wrecker)", "Rampardos (Smack Down/Rock Slide)", "Terrakion (Double Kick/Rock Slide)"],
    details: "Dvojitá slabost na kamenné (Rock) útoky. Smack Down od Rhyperiora ho sestřelí během okamžiku."
  },
  "scizor": {
    bestCounters: ["Reshiram (Fire Fang/Overheat)", "Charizard (Fire Spin/Blast Burn)", "Chandelure (Fire Spin/Overheat)"],
    details: "Má dvojitou slabost na oheň. Jakýkoliv ohnivý útok ho roztaví okamžitě."
  },
  "amaura": {
    bestCounters: ["Lucario (Counter/Aura Sphere)", "Machamp (Counter/Dynamic Punch)", "Metagross (Bullet Punch/Meteor Mash)"],
    details: "Rock/Ice typ. Má dvojitou slabost na ocel (Steel) a boj (Fighting). Metagross nebo Lucario ho zničí bleskově."
  },
  "blastoise": {
    bestCounters: ["Kartana (Razor Leaf/Leaf Blade)", "Xurkitree (Thunder Shock/Discharge)", "Zekrom (Charge Beam/Fusion Bolt)"],
    details: "Čistě vodní typ s dobrou obranou. Travní Kartana ho porazí bez potíží."
  },
  "flygon": {
    bestCounters: ["Mamoswine (Powder Snow/Avalanche)", "Glaceon (Frost Breath/Avalanche)", "Weavile (Snarl/Avalanche)"],
    details: "Ground/Dragon typ. Má dvojitou slabost na led (Ice). Ledový Mamoswine ho zničí na dvě rány."
  },
  "ferrothorn": {
    bestCounters: ["Reshiram (Fire Fang/Overheat)", "Charizard (Fire Spin/Blast Burn)", "Chandelure (Fire Spin/Overheat)"],
    details: "Grass/Steel typ. Má dvojitou slabost na oheň (Fire). Ohnivé útoky ho vyřadí extrémně rychle."
  },
  "milotic": {
    bestCounters: ["Kartana (Razor Leaf/Leaf Blade)", "Xurkitree (Thunder Shock/Discharge)", "Raikou (Thunder Shock/Wild Charge)"],
    details: "Velmi odolný vodní pokémon. Použijte silné travní (Kartana) nebo elektrické (Xurkitree) counters."
  },
  "houndoom": {
    bestCounters: ["Kyogre (Waterfall/Surf)", "Terrakion (Double Kick/Sacred Sword)", "Machamp (Counter/Dynamic Punch)"],
    details: "Dark/Fire typ. Má slabost vůči vodě, boji, zemi a kameni. Terrakion nebo Kyogre ho zničí bez problémů."
  }
};

const GRUNT_MAP: Record<string, {
  phraseCs: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  worthFighting: boolean;
  counters: string[];
}> = {
  "normal": {
    phraseCs: "Normální neznamená slabý!",
    difficulty: "Easy",
    worthFighting: false,
    counters: ["Lucario", "Terrakion", "Machamp"]
  },
  "fire": {
    phraseCs: "Víš, jak horký může být pokémoní dech?",
    difficulty: "Easy",
    worthFighting: true,
    counters: ["Kyogre", "Rhyperior", "Terrakion"]
  },
  "water": {
    phraseCs: "Tyto vody jsou zrádné!",
    difficulty: "Medium",
    worthFighting: true,
    counters: ["Kartana", "Xurkitree", "Zarude"]
  },
  "grass": {
    phraseCs: "Checkni mé travní Pokémony!",
    difficulty: "Easy",
    worthFighting: false,
    counters: ["Charizard", "Reshiram", "Mamoswine"]
  },
  "electric": {
    phraseCs: "Připrav se na pořádný šok!",
    difficulty: "Easy",
    worthFighting: true,
    counters: ["Groudon", "Landorus", "Garchomp"]
  },
  "ice": {
    phraseCs: "Zamrzneš na místě!",
    difficulty: "Medium",
    worthFighting: true,
    counters: ["Metagross", "Terrakion", "Reshiram"]
  },
  "fighting": {
    phraseCs: "Tahle vypracovaná postava není jen na ozdobu!",
    difficulty: "Medium",
    worthFighting: true,
    counters: ["Mewtwo", "Togekiss", "Gardevoir"]
  },
  "poison": {
    phraseCs: "Svinutý a připravený k úderu!",
    difficulty: "Easy",
    worthFighting: false,
    counters: ["Mewtwo", "Groudon", "Rhyperior"]
  },
  "ground": {
    phraseCs: "Zašlapu tě do země!",
    difficulty: "Easy",
    worthFighting: true,
    counters: ["Kyogre", "Kartana", "Mamoswine"]
  },
  "flying": {
    phraseCs: "Bojuj proti mým létajícím Pokémonům!",
    difficulty: "Easy",
    worthFighting: true,
    counters: ["Rampardos", "Rhyperior", "Mamoswine"]
  },
  "psychic": {
    phraseCs: "Bojíš se neviditelné psychické síly?",
    difficulty: "Easy",
    worthFighting: false,
    counters: ["Tyranitar", "Hydreigon", "Gengar"]
  },
  "bug": {
    phraseCs: "Vpřed, moji super hmyzí Pokémoni!",
    difficulty: "Easy",
    worthFighting: false,
    counters: ["Reshiram", "Charizard", "Chandelure"]
  },
  "rock": {
    phraseCs: "Rozbalíme to!",
    difficulty: "Easy",
    worthFighting: true,
    counters: ["Machamp", "Lucario", "Kyogre"]
  },
  "ghost": {
    phraseCs: "Ke-he-he-he-he!",
    difficulty: "Easy",
    worthFighting: true,
    counters: ["Hydreigon", "Tyranitar", "Darkrai"]
  },
  "dragon": {
    phraseCs: "Boj je předem vyhraný!",
    difficulty: "Hard",
    worthFighting: true,
    counters: ["Mamoswine", "Togekiss", "Gardevoir"]
  },
  "steel": {
    phraseCs: "Proti mé železné vůli nemáš šanci!",
    difficulty: "Medium",
    worthFighting: true,
    counters: ["Reshiram", "Terrakion", "Groudon"]
  },
  "fairy": {
    phraseCs: "Podívej se na mé roztomilé Pokémony!",
    difficulty: "Medium",
    worthFighting: true,
    counters: ["Metagross", "Nihilego", "Roselia"]
  },
  "dark": {
    phraseCs: "Kde je světlo, tam je i stín.",
    difficulty: "Medium",
    worthFighting: true,
    counters: ["Terrakion", "Machamp", "Togekiss"]
  }
};

// ==========================================
// 2. Translation & Helper Functions
// ==========================================

function translateTextToCs(text: string): string {
  if (!text) return '';
  let translated = text;
  const dict: Record<string, string> = {
    "1/2 Hatch Distance": "1/2 vzdálenost na líhnutí vajec",
    "1/4 Hatch Distance": "1/4 vzdálenost na líhnutí vajec",
    "2x Catch Candy": "2× bonbóny (Candy) za chytání",
    "2x Catch XP": "2× zkušenosti (XP) za chytání",
    "3x Catch XP": "3× zkušenosti (XP) za chytání",
    "2x Catch Stardust": "2× Stardust za chycení",
    "3x Catch Stardust": "3× Stardust za chycení",
    "2x Transfer Candy": "2× Candy za posílání (Transfer)",
    "2x Evolution XP": "2× XP za evoluci",
    "Increased Spawns": "Zvýšený výskyt pokémonů",
    "Increased Shiny rate": "Zvýšená šance na Shiny Pokémony",
    "Increased chance of encountering Shiny": "Zvýšená šance na setkání se Shiny",
    "Up to 9 free Raid Passes": "Až 9 bezplatných Raid Passů",
    "Up to 6 free Raid Passes": "Až 6 bezplatných Raid Passů",
    "Remote Raid Pass limit increased to 20": "Limit na Remote Raidy navýšen na 20",
    "Remove Frustration with a Charged TM": "Lze odebrat útok Frustration pomocí Charged TM",
    "Team GO Rocket will appear more frequently at PokéStops and in balloons": "Team GO Rocket se objevuje častěji u Pokéstopů a v balónech",
    "Team GO Rocket Balloons are expected to appear every 2 hours": "Baloony Team GO Rocket se objevují každé 2 hodiny",
    "Trades made will require 50% less Stardust": "O 50 % méně Stardustu za tradování",
    "One additional Special Trade": "1 dodatečný Special Trade",
    "3-hour Incense": "Incense trvá 3 hodiny",
    "3-hour Lure": "Lure moduly trvají 3 hodiny",
    "1-hour Lures": "Lure moduly trvají 1 hodinu",
    "5x surprise encounters from snapshots": "5× překvapení z Snapshotu",
    "Wild Encounters": "Výskyt v divočině",
    "Wild Spawns": "Výskyt v divočině",
    "Field Research Tasks": "Úkoly v terénním výzkumu",
    "Event Bonuses": "Eventové bonusy",
    "Shiny Family": "Shiny rodina",
    "Exclusive Move": "Exkluzivní útok",
    "Special Research": "Speciální výzkum",
    "Raid Battles": "Raidové souboje",
    "Raid Rotation": "Raidová rotace",
    "Active Bonus": "Aktivní bonus"
  };

  for (const [key, value] of Object.entries(dict)) {
    const regex = new RegExp(key, 'gi');
    translated = translated.replace(regex, value);
  }
  return translated;
}

function findPokemonMeta(pokemonName: string) {
  if (!pokemonName) return null;
  const key = pokemonName.toLowerCase();
  if (pokemonMetaDb[key]) return pokemonMetaDb[key];
  
  // Fuzzy match
  for (const dbKey of Object.keys(pokemonMetaDb)) {
    if (key.includes(dbKey) || dbKey.includes(key)) {
      return pokemonMetaDb[dbKey];
    }
  }
  return null;
}

function isMetaRelevant(pokemonName: string): boolean {
  const meta = findPokemonMeta(pokemonName);
  if (!meta) return false;
  return (meta.pveRating === 'S' || meta.pveRating === 'A' || meta.pvpRating === 'S' || meta.pvpRating === 'A');
}

function findRaidCounters(
  bossName: string, 
  bossTypes?: string[], 
  scrapedCpRange?: string, 
  scrapedBoostedCpRange?: string, 
  scrapedWeatherBoosts?: string[]
): RaidCounters | null {
  if (!bossName) return null;
  const cleanName = bossName.toLowerCase();
  
  for (const key of Object.keys(raidCountersDb)) {
    if (cleanName.includes(key) || key.includes(cleanName)) {
      return raidCountersDb[key];
    }
  }

  if (bossTypes && bossTypes.length > 0) {
    return generateDynamicCounters(
      bossName, 
      bossTypes, 
      scrapedCpRange, 
      scrapedBoostedCpRange, 
      scrapedWeatherBoosts
    );
  }

  return null;
}

// ==========================================
// 3. Scraping Functions
// ==========================================

export async function scrapeEvents(): Promise<EventData[]> {
  const url = 'https://raw.githubusercontent.com/bigfoott/ScrapedDuck/data/events.min.json';
  const response = await axios.get(url);
  return response.data;
}

export async function scrapeEventDetails(eventID: string, link: string): Promise<SpecialEventDetails | null> {
  const response = await axios.get(link, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  
  const html = response.data;
  const $ = cheerio.load(html);
  
  const bonuses: any[] = [];
  const debuts: any[] = [];
  const spawns: any[] = [];
  const eggs: any[] = [];
  const research: any[] = [];

  // Parse Bonuses
  $('.bonus-item').each((_, item) => {
    const textEl = $(item).find('.bonus-text');
    const text = textEl.length ? textEl.text().trim() : $(item).text().trim();
    if (!text) return;

    const img = $(item).find('img');
    const imgSrc = img.attr('src');
    const imgAlt = img.attr('alt') || '';

    let icon = '🎁';
    if (imgSrc) {
      if (imgSrc.includes('candy')) icon = '🍬';
      else if (imgSrc.includes('stardust')) icon = '✨';
      else if (imgSrc.includes('egg') || imgSrc.includes('hatch')) icon = '🥚';
      else if (imgSrc.includes('xp') || imgSrc.includes('experience')) icon = '⚡';
      else if (imgSrc.includes('raid') || imgSrc.includes('pass')) icon = '🎟️';
      else if (imgSrc.includes('rocket')) icon = '🎈';
      else if (imgSrc.includes('trade')) icon = '🤝';
      else if (imgSrc.includes('tm') || imgSrc.includes('charge')) icon = '🟣';
    } else if (imgAlt) {
      const altLower = imgAlt.toLowerCase();
      if (altLower.includes('candy')) icon = '🍬';
      else if (altLower.includes('stardust')) icon = '✨';
      else if (altLower.includes('hatch') || altLower.includes('egg')) icon = '🥚';
      else if (altLower.includes('xp') || altLower.includes('experience')) icon = '⚡';
      else if (altLower.includes('raid') || altLower.includes('pass')) icon = '🎟️';
      else if (altLower.includes('rocket')) icon = '🎈';
      else if (altLower.includes('trade')) icon = '🤝';
    }

    bonuses.push({
      text: {
        cs: translateTextToCs(text),
        en: text
      },
      icon
    });
  });

  // Parse Headings and Lists
  $('h2, h3').each((_, heading) => {
    const title = $(heading).text().toLowerCase() || '';
    let sibling = $(heading).next();
    let description = '';

    while (sibling.length && sibling[0].tagName !== 'UL' && !['H2', 'H3'].includes(sibling[0].tagName)) {
      if (sibling[0].tagName === 'P') {
        description += sibling.text().trim() + ' ';
      }
      sibling = sibling.next();
    }

    if (sibling.length && sibling[0].tagName === 'UL' && sibling.hasClass('pkmn-list-flex')) {
      const contents: any[] = [];
      sibling.find('.pkmn-list-item').each((_, item) => {
        const name = $(item).find('.pkmn-name').text().trim();
        const img = $(item).find('img');
        const imgEl = $(item).find('.pkmn-list-img img').length ? $(item).find('.pkmn-list-img img') : img;
        const image = imgEl.attr('src') || '';
        const isShinyAvailable = $(item).find('.shiny-icon').length > 0;

        if (name) {
          contents.push({ name, image, isShinyAvailable });
        }
      });

      if (contents.length > 0) {
        if (title.includes('debut') || title.includes('new shiny') || title.includes('save shadow') || title.includes('featured')) {
          contents.forEach(c => {
            debuts.push({
              name: c.name,
              image: c.image,
              description: {
                cs: translateTextToCs(description.trim() || `${c.name} debutuje v Pokémon GO!`),
                en: description.trim() || `${c.name} debuts in Pokémon GO!`
              }
            });
          });
        } else if (title.includes('egg') || title.includes('hatch')) {
          let distance = '7km';
          const distMatch = title.match(/(\d+)\s*km/);
          if (distMatch) {
            distance = distMatch[0];
          }
          eggs.push({
            distance,
            contents
          });
        } else if (title.includes('spawn') || title.includes('encounter') || title.includes('wild')) {
          contents.forEach(c => {
            spawns.push({
              name: c.name,
              image: c.image,
              isShinyAvailable: c.isShinyAvailable,
              isHighPriority: isMetaRelevant(c.name)
            });
          });
        }
      }
    }
  });

  // Parse Field Research
  $('.event-field-research-list li').each((_, li) => {
    const taskEl = $(li).find('.task');
    const taskText = taskEl.length ? taskEl.text().replace(/\s+/g, ' ').trim() : '???';

    const rewardEl = $(li).find('.reward-label').length ? $(li).find('.reward-label') : $(li).find('.reward');
    const rewardText = rewardEl.length ? rewardEl.text().replace(/\s+/g, ' ').trim() : '';

    const img = $(li).find('.reward-image').length ? $(li).find('.reward-image') : $(li).find('img');
    const image = img.attr('src') || '';
    const isShinyAvailable = $(li).find('.shiny-icon').length > 0;

    if (rewardText) {
      research.push({
        task: {
          cs: translateTextToCs(taskText),
          en: taskText
        },
        reward: rewardText,
        image,
        isShinyAvailable
      });
    }
  });

  if (bonuses.length > 0 || debuts.length > 0 || spawns.length > 0 || eggs.length > 0 || research.length > 0) {
    return {
      eventID,
      bonuses: bonuses.length > 0 ? bonuses : undefined,
      debuts: debuts.length > 0 ? debuts : undefined,
      spawns: spawns.length > 0 ? spawns : undefined,
      eggs: eggs.length > 0 ? eggs : undefined,
      research: research.length > 0 ? research : undefined
    };
  }
  return null;
}

export async function scrapeRaidBosses(): Promise<ScrapedRaidBoss[]> {
  const url = 'https://leekduck.com/raid-bosses/';
  const response = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  
  const html = response.data;
  const $ = cheerio.load(html);
  const bosses: ScrapedRaidBoss[] = [];

  // Helper to parse card
  const parseCard = (cardEl: any, tier: ScrapedRaidBoss['tier']) => {
    const card = $(cardEl);
    const name = card.find('.identity .name').text().trim();
    if (!name) return;

    const image = card.find('.boss-img img').attr('src') || '';
    const canBeShiny = card.find('.shiny-icon').length > 0;
    
    // CP range (CP 429 - 470)
    let cpRange = card.find('.cp-range').text().replace(/CP\s*/i, '').trim();
    
    // Boosted CP range
    let boostedCpRange = card.find('.boosted-cp-row .boosted-cp').text().replace(/CP\s*/i, '').trim();
    
    // Weather Boosts
    const weatherBoosts: string[] = [];
    card.find('.weather-boosted span.weather-pill .label').each((_, label) => {
      weatherBoosts.push($(label).text().trim());
    });
    
    // Types
    const types: string[] = [];
    card.find('.boss-type span').each((_, typeSpan) => {
      const typeText = $(typeSpan).find('.type-label').text().trim();
      if (typeText) types.push(typeText);
    });

    const matchedCounters = findRaidCounters(name, types, cpRange, boostedCpRange, weatherBoosts);

    bosses.push({
      name,
      tier,
      image,
      canBeShiny,
      cpRange: cpRange || undefined,
      boostedCpRange: boostedCpRange || undefined,
      weatherBoosts: weatherBoosts.length ? weatherBoosts : undefined,
      types: types.length ? types : undefined,
      counters: matchedCounters
    });
  };

  // 1. Parse Regular Raids
  $('.raid-bosses .tier').each((_, tierEl) => {
    const tierHeader = $(tierEl).find('h2.header').text().trim().toLowerCase();
    let tier: ScrapedRaidBoss['tier'] = '1';
    if (tierHeader.includes('5-star')) tier = '5';
    else if (tierHeader.includes('mega')) tier = 'mega';
    else if (tierHeader.includes('3-star')) tier = '3';
    else if (tierHeader.includes('1-star')) tier = '1';

    $(tierEl).find('.card').each((_, cardEl) => {
      parseCard(cardEl, tier);
    });
  });

  // 2. Parse Shadow Raids
  $('.shadow-raid-bosses .tier').each((_, tierEl) => {
    const tierHeader = $(tierEl).find('h2.header').text().trim().toLowerCase();
    let tier: ScrapedRaidBoss['tier'] = 'shadow-1';
    if (tierHeader.includes('5-star')) tier = 'shadow-5';
    else if (tierHeader.includes('3-star')) tier = 'shadow-3';
    else if (tierHeader.includes('1-star')) tier = 'shadow-1';

    $(tierEl).find('.card').each((_, cardEl) => {
      parseCard(cardEl, tier);
    });
  });

  return bosses;
}

export async function scrapeRocketLineups(): Promise<{
  giovanni: RocketMember;
  leaders: RocketMember[];
  grunts: GruntData[];
}> {
  const url = 'https://leekduck.com/rocket-lineups/';
  const response = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });

  const html = response.data;
  const $ = cheerio.load(html);

  let giovanni: RocketMember | null = null;
  const leaders: RocketMember[] = [];
  const grunts: GruntData[] = [];

  $('.rocket-profile').each((_, profileEl) => {
    const profile = $(profileEl);
    const name = profile.find('.employee-info .name').text().replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
    const quote = profile.find('.employee-info .quote-text').text().trim();
    
    // Find avatar
    let avatar = '👤';
    if (name.includes('Giovanni')) avatar = '👑';
    else if (name.includes('Cliff')) avatar = '💪';
    else if (name.includes('Arlo')) avatar = '👓';
    else if (name.includes('Sierra')) avatar = '🧣';

    // Parse lineup slots
    const slot1: string[] = [];
    const slot2: string[] = [];
    const slot3: string[] = [];
    let encounterPokemonName = '';

    profile.find('.lineup-info .slot').each((_, slotEl) => {
      const slot = $(slotEl);
      const isEncounter = slot.hasClass('encounter');
      const num = parseInt(slot.find('.number').text().trim(), 10);
      const targetSlot = num === 1 ? slot1 : num === 2 ? slot2 : slot3;

      slot.find('.shadow-pokemon').each((_, pkmnEl) => {
        const pkmn = $(pkmnEl);
        const pkmnName = pkmn.attr('data-pokemon') || '';
        if (pkmnName && pkmnName !== 'Placeholder') {
          targetSlot.push(pkmnName);
          if (isEncounter && !encounterPokemonName) {
            encounterPokemonName = pkmnName;
          }
        }
      });
    });

    // If it's a boss/leader
    const isLeader = ['Cliff', 'Arlo', 'Sierra'].includes(name);
    const isGiovanni = name.includes('Giovanni');

    if (isGiovanni || isLeader) {
      // Reward definition
      const rewardName = encounterPokemonName || (isGiovanni ? slot3[0] : slot1[0]) || '???';
      const meta = findPokemonMeta(rewardName);
      
      const member: RocketMember = {
        name: isGiovanni ? 'Giovanni' : name,
        avatar,
        reward: {
          name: rewardName,
          pveRating: meta?.pveRating || 'None',
          pvpRating: meta?.pvpRating || 'None',
          worthGrinding: meta ? (meta.pveRating === 'S' || meta.pveRating === 'A' || meta.pvpRating === 'S' || meta.pvpRating === 'A') : false,
          reason: meta?.notes || `Shadow ${rewardName} je užitečný pokémon do hry.`
        },
        lineup: { slot1, slot2, slot3 },
        counters: []
      };

      // Assemble counters for lineup
      const uniqueLineupPkmn = Array.from(new Set([...slot1, ...slot2, ...slot3]));
      uniqueLineupPkmn.forEach(pkmnName => {
        const counterInfo = BOSS_COUNTERS_DB[pkmnName.toLowerCase()];
        if (counterInfo) {
          member.counters.push({
            bossPokemon: pkmnName,
            bestCounters: counterInfo.bestCounters,
            details: counterInfo.details
          });
        } else {
          // Default fallback counter if not in DB
          member.counters.push({
            bossPokemon: pkmnName,
            bestCounters: ["Lucario (Counter/Aura Sphere)", "Mamoswine (Powder Snow/Avalanche)", "Kyogre (Waterfall/Surf)"],
            details: `Proti ${pkmnName} použijte jeho typové slabosti a nejlepší stínové či mega pokémony.`
          });
        }
      });

      if (isGiovanni) {
        giovanni = member;
      } else {
        leaders.push(member);
      }
    } else {
      // It's a grunt
      // Get type from name or type symbol
      const typeImg = profile.find('.employee-info .type img').attr('src') || '';
      let type = 'Normal';
      const typeMatch = typeImg.match(/\/type_symbols\/([a-z]+)\.png/i);
      if (typeMatch) {
        type = typeMatch[1].charAt(0).toUpperCase() + typeMatch[1].slice(1).toLowerCase();
      } else {
        // Try parsing type from name like "Fire-type Male Grunt"
        const nameTypeMatch = name.match(/([a-zA-Z]+)-type/);
        if (nameTypeMatch) {
          type = nameTypeMatch[1].charAt(0).toUpperCase() + nameTypeMatch[1].slice(1).toLowerCase();
        }
      }

      const typeKey = type.toLowerCase();
      const mappedGrunt = GRUNT_MAP[typeKey] || {
        phraseCs: `Bojuj s mým ${type} typem!`,
        difficulty: "Easy" as const,
        worthFighting: false,
        counters: ["Machamp", "Mamoswine", "Kyogre"]
      };

      grunts.push({
        phraseCs: mappedGrunt.phraseCs,
        phraseEn: quote || "Don't bother, I've already won!",
        type,
        difficulty: mappedGrunt.difficulty,
        worthFighting: mappedGrunt.worthFighting,
        shadowPokemon: slot1.length ? slot1 : [encounterPokemonName],
        counters: mappedGrunt.counters
      });
    }
  });

  // Fallback if scraping failed to find Giovanni or leaders
  if (!giovanni) {
    giovanni = {
      name: "Giovanni",
      avatar: "👑",
      reward: {
        name: "Shadow Landorus",
        pveRating: "A",
        pvpRating: "B",
        worthGrinding: false,
        reason: "Shadow Landorus (Incarnate Forme) je silný Ground útočník, ale zaostává za Therian formou."
      },
      lineup: {
        slot1: ["Persian"],
        slot2: ["Rhyperior", "Kangaskhan", "Nidoking"],
        slot3: ["Landorus"]
      },
      counters: [
        { bossPokemon: "Persian", bestCounters: ["Lucario", "Terrakion"], details: "Persian má slabost na bojové útoky." },
        { bossPokemon: "Shadow Landorus", bestCounters: ["Mamoswine", "Glaceon"], details: "Dvojitá slabost na led." }
      ]
    };
  }

  return {
    giovanni,
    leaders: leaders.length ? leaders : [
      {
        name: "Cliff", avatar: "💪",
        reward: { name: "Shadow Machop", pveRating: "S", pvpRating: "A", worthGrinding: true, reason: "Shadow Machamp je špičkový bojový útočník." },
        lineup: { slot1: ["Machop"], slot2: ["Aerodactyl", "Gallade"], slot3: ["Tyranitar"] },
        counters: [{ bossPokemon: "Machop", bestCounters: ["Mewtwo"], details: "Slabost na psychic." }]
      }
    ],
    grunts: grunts.length ? grunts : [
      { phraseCs: "Normální neznamená slabý!", phraseEn: "Normal does not mean weak.", type: "Normal", difficulty: "Easy", worthFighting: false, shadowPokemon: ["Teddiursa"], counters: ["Machamp"] }
    ]
  };
}
