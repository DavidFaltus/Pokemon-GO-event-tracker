export interface DittoDisguise {
  name: string;
  image: string;
  types: string[];
  isShiny: boolean;
}

export interface EggHatch {
  name: string;
  image: string;
  isShinyAvailable: boolean;
  rarityTier: number; // 1 to 5
  cpMax?: number;
}

export interface EggPool {
  distance: string; // e.g. "2 km", "5 km", "7 km", "10 km", "12 km"
  color: string; // Hex color for styling
  contents: EggHatch[];
}

export const dittoDisguises: DittoDisguise[] = [
  // Original / Season disguises
  { name: "Mankey", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_056_00.png", types: ["fighting"], isShiny: true },
  { name: "Growlithe", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_058_00.png", types: ["fire"], isShiny: true },
  { name: "Magnemite", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_081_00.png", types: ["electric"], isShiny: true },
  { name: "Voltorb", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_100_00.png", types: ["electric"], isShiny: true },
  { name: "Sentret", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_161_00.png", types: ["normal"], isShiny: true },
  { name: "Teddiursa", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_216_00.png", types: ["normal"], isShiny: true },
  { name: "Seedot", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_273_00.png", types: ["grass"], isShiny: true },
  { name: "Surskit", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_283_00.png", types: ["bug", "water"], isShiny: true },
  { name: "Slakoth", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_287_00.png", types: ["normal"], isShiny: true },
  { name: "Whismur", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_293_00.png", types: ["normal"], isShiny: true },
  { name: "Duskull", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_355_00.png", types: ["ghost"], isShiny: true },
  // Pokopia Event additions
  { name: "Bulbasaur", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_001_00.png", types: ["grass", "poison"], isShiny: true },
  { name: "Charmander", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_004_00.png", types: ["fire"], isShiny: true },
  { name: "Squirtle", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_007_00.png", types: ["water"], isShiny: true },
  { name: "Pikachu", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_025_00.png", types: ["electric"], isShiny: true },
  { name: "Hitmonchan", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_107_00.png", types: ["fighting"], isShiny: true },
  { name: "Marill", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_183_00.png", types: ["water", "fairy"], isShiny: true },
  { name: "Drilbur", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_529_00.png", types: ["ground"], isShiny: true },
  { name: "Goomy", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_704_00.png", types: ["dragon"], isShiny: true },
  { name: "Combee", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_415_00.png", types: ["bug", "flying"], isShiny: true },
  { name: "Scyther", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_123_00.png", types: ["bug", "flying"], isShiny: true },
  { name: "Sudowoodo", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_185_00.png", types: ["rock"], isShiny: true },
  { name: "Timburr", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_532_00.png", types: ["fighting"], isShiny: true }
];

export const eggPools: EggPool[] = [
  {
    distance: "2 km",
    color: "#4ade80", // Light Green
    contents: [
      { name: "Exeggcute", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_102_00.png", isShinyAvailable: true, rarityTier: 1, cpMax: 671 },
      { name: "Pichu", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_172_00.png", isShinyAvailable: true, rarityTier: 1, cpMax: 270 },
      { name: "Cleffa", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_173_00.png", isShinyAvailable: true, rarityTier: 1, cpMax: 383 },
      { name: "Togepi", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_175_00.png", isShinyAvailable: true, rarityTier: 1, cpMax: 375 },
      { name: "Corphish", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_341_00.png", isShinyAvailable: true, rarityTier: 1, cpMax: 703 },
      { name: "Wynaut", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_360_00.png", isShinyAvailable: true, rarityTier: 1, cpMax: 305 },
      { name: "Larvesta", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_636_00.png", isShinyAvailable: true, rarityTier: 4, cpMax: 855 }
    ]
  },
  {
    distance: "5 km",
    color: "#facc15", // Yellow
    contents: [
      { name: "Riolu", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_447_00.png", isShinyAvailable: true, rarityTier: 1, cpMax: 567 },
      { name: "Mantyke", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_458_00.png", isShinyAvailable: true, rarityTier: 1, cpMax: 713 },
      { name: "Snom", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_872_00.png", isShinyAvailable: false, rarityTier: 1, cpMax: 302 },
      { name: "Indeedee (Male)", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_876_00.png", isShinyAvailable: true, rarityTier: 1, cpMax: 1396 },
      { name: "Indeedee (Female)", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_876_01.png", isShinyAvailable: true, rarityTier: 1, cpMax: 1370 },
      { name: "Flittle", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_955_00.png", isShinyAvailable: false, rarityTier: 1, cpMax: 401 },
      { name: "Larvesta", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_636_00.png", isShinyAvailable: true, rarityTier: 3, cpMax: 855 }
    ]
  },
  {
    distance: "5 km (Adventure Sync)",
    color: "#eab308", // Golden Yellow
    contents: [
      { name: "Budew", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_406_00.png", isShinyAvailable: true, rarityTier: 1, cpMax: 489 },
      { name: "Chingling", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_433_00.png", isShinyAvailable: true, rarityTier: 1, cpMax: 574 },
      { name: "Sableye", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_302_00.png", isShinyAvailable: true, rarityTier: 1, cpMax: 843 },
      { name: "Tyrogue", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_236_00.png", isShinyAvailable: true, rarityTier: 1, cpMax: 281 },
      { name: "Happiny", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_440_00.png", isShinyAvailable: true, rarityTier: 1, cpMax: 212 }
    ]
  },
  {
    distance: "7 km",
    color: "#f472b6", // Pink
    contents: [
      { name: "Galarian Meowth", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_052_31.png", isShinyAvailable: true, rarityTier: 1, cpMax: 591 },
      { name: "Galarian Corsola", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_222_31.png", isShinyAvailable: true, rarityTier: 1, cpMax: 855 },
      { name: "Galarian Zigzagoon", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_263_31.png", isShinyAvailable: true, rarityTier: 1, cpMax: 290 },
      { name: "Galarian Darumaka", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_554_31.png", isShinyAvailable: true, rarityTier: 1, cpMax: 823 },
      { name: "Galarian Stunfisk", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_618_31.png", isShinyAvailable: true, rarityTier: 1, cpMax: 1235 },
      { name: "Alolan Geodude", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_074_61.png", isShinyAvailable: true, rarityTier: 1, cpMax: 739 },
      { name: "Alolan Diglett", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_050_61.png", isShinyAvailable: true, rarityTier: 1, cpMax: 389 }
    ]
  },
  {
    distance: "7 km ( Mateo Route )",
    color: "#ec4899", // Deep Pink
    contents: [
      { name: "Galarian Corsola", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_222_31.png", isShinyAvailable: true, rarityTier: 1, cpMax: 855 },
      { name: "Galarian Slowpoke", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_079_31.png", isShinyAvailable: true, rarityTier: 1, cpMax: 700 },
      { name: "Hisuian Sneasel", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_215_41.png", isShinyAvailable: true, rarityTier: 1, cpMax: 1172 },
      { name: "Hisuian Growlithe", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_058_41.png", isShinyAvailable: true, rarityTier: 1, cpMax: 755 },
      { name: "Basculin (White Striped)", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_550_12.png", isShinyAvailable: true, rarityTier: 1, cpMax: 1194 }
    ]
  },
  {
    distance: "10 km",
    color: "#c084fc", // Purple
    contents: [
      { name: "Mawile", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_303_00.png", isShinyAvailable: true, rarityTier: 1, cpMax: 934 },
      { name: "Absol", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_359_00.png", isShinyAvailable: true, rarityTier: 1, cpMax: 1443 },
      { name: "Honedge", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_679_00.png", isShinyAvailable: true, rarityTier: 1, cpMax: 794 },
      { name: "Charcadet", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_935_00.png", isShinyAvailable: true, rarityTier: 1, cpMax: 418 },
      { name: "Tinkatink", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_957_00.png", isShinyAvailable: true, rarityTier: 1, cpMax: 491 },
      { name: "Frigibax", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_996_00.png", isShinyAvailable: true, rarityTier: 1, cpMax: 712 },
      { name: "Larvesta", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_636_00.png", isShinyAvailable: true, rarityTier: 3, cpMax: 855 }
    ]
  },
  {
    distance: "10 km (Adventure Sync)",
    color: "#a855f7", // Deep Purple
    contents: [
      { name: "Druddigon", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_621_00.png", isShinyAvailable: true, rarityTier: 1, cpMax: 1561 },
      { name: "Toxel", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_848_00.png", isShinyAvailable: true, rarityTier: 1, cpMax: 415 },
      { name: "Bagon", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_371_00.png", isShinyAvailable: true, rarityTier: 1, cpMax: 660 },
      { name: "Drampa", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_780_00.png", isShinyAvailable: true, rarityTier: 1, cpMax: 1665 },
      { name: "Gible", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_443_00.png", isShinyAvailable: true, rarityTier: 1, cpMax: 635 }
    ]
  },
  {
    distance: "12 km",
    color: "#f87171", // Red (Strange Egg)
    contents: [
      { name: "Sandile", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_551_00.png", isShinyAvailable: true, rarityTier: 1, cpMax: 592 },
      { name: "Vullaby", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_629_00.png", isShinyAvailable: true, rarityTier: 1, cpMax: 726 },
      { name: "Shroodle", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_944_00.png", isShinyAvailable: false, rarityTier: 1, cpMax: 531 },
      { name: "Pancham", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_674_00.png", isShinyAvailable: true, rarityTier: 1, cpMax: 850 },
      { name: "Salandit", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_757_00.png", isShinyAvailable: true, rarityTier: 1, cpMax: 641 },
      { name: "Varoom", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_965_00.png", isShinyAvailable: true, rarityTier: 1, cpMax: 650 }
    ]
  }
];
