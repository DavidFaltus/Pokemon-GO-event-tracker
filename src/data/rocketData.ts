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

export const rocketData: { giovanni: RocketMember; leaders: RocketMember[] } = {
  giovanni: {
    name: "Giovanni",
    avatar: "👑",
    reward: {
      name: "Shadow Landorus",
      pveRating: "A",
      pvpRating: "B",
      worthGrinding: false,
      reason: "Shadow Landorus (Incarnate Forme) je velmi silný Ground útočník, ale zaostává za svou Therian formou a ostatními top stíny (jako Shadow Groudon). Pokud nutně nepotřebujete Ground/Flying útočníka, doporučuje se ušetřit Super Rocket Radar na lepší stíny v budoucnu."
    },
    lineup: {
      slot1: ["Persian"],
      slot2: ["Rhyperior", "Kangaskhan", "Nidoking"],
      slot3: ["Landorus"]
    },
    counters: [
      {
        bossPokemon: "Persian",
        bestCounters: ["Lucario (Counter/Aura Sphere)", "Terrakion (Double Kick/Sacred Sword)", "Machamp (Counter/Cross Chop)"],
        details: "Persian dává velké rychlé poškození. Bojový typ s rychlým nabíjením charged útoků je nutností pro zničení Giovanniho štítů."
      },
      {
        bossPokemon: "Rhyperior",
        bestCounters: ["Kyogre (Waterfall/Surf)", "Kartana (Razor Leaf/Leaf Blade)", "Zarude (Vine Whip/Power Whip)"],
        details: "Rhyperior má dvojitou slabost na travní a vodní útoky. Kartana nebo Kyogre ho zničí během pár sekund."
      },
      {
        bossPokemon: "Kangaskhan",
        bestCounters: ["Lucario (Counter/Aura Sphere)", "Terrakion (Double Kick/Sacred Sword)", "Machamp (Counter/Dynamic Punch)"],
        details: "Kangaskhan je čistě normální typ a má slabost pouze na bojové (Fighting) útoky. Lucario s Power-Up Punch nebo Aura Sphere ho zničí snadno."
      },
      {
        bossPokemon: "Nidoking",
        bestCounters: ["Kyogre (Waterfall/Surf)", "Mamoswine (Powder Snow/Avalanche)", "Mewtwo (Confusion/Psystrike)"],
        details: "Nidoking má slabost vůči vodě, ledu, zemi a psychickým útokům. Mamoswine nebo Kyogre ho vyřadí bez potíží."
      },
      {
        bossPokemon: "Shadow Landorus",
        bestCounters: ["Mamoswine (Powder Snow/Avalanche)", "Glaceon (Frost Breath/Avalanche)", "Kyogre (Waterfall/Surf)"],
        details: "Finální Shadow Landorus je Ground/Flying typ, což znamená dvojitou slabost na led (Ice). Ledový Mamoswine nebo Glaceon ho vyřadí extrémně rychle."
      }
    ]
  },
  leaders: [
    {
      name: "Cliff",
      avatar: "💪",
      reward: {
        name: "Shadow Machop",
        pveRating: "S",
        pvpRating: "A",
        worthGrinding: true,
        reason: "Shadow Machamp je jedním z nejlepších a nejužitečnějších bojových útočníků ve hře. Rozhodně se vyplatí lovit dobré IV a farmit bonbóny."
      },
      lineup: {
        slot1: ["Machop"],
        slot2: ["Gallade", "Aerodactyl", "Kingler"],
        slot3: ["Tyranitar", "Cradily", "Crobat"]
      },
      counters: [
        {
          bossPokemon: "Machop",
          bestCounters: ["Mewtwo (Confusion/Psystrike)", "Gardevoir (Charm/Psychic)", "Alakazam (Counter/Psychic)"],
          details: "Snadný start. Mewtwo nebo jakýkoliv silný psychický/vílí typ ho zničí a nabije si energii."
        },
        {
          bossPokemon: "Aerodactyl",
          bestCounters: ["Metagross (Bullet Punch/Meteor Mash)", "Kyogre (Waterfall/Surf)", "Mamoswine (Powder Snow/Avalanche)"],
          details: "Aerodactyl útočí extrémně rychle. Metagross je nejlepší counter díky ocelové odolnosti."
        },
        {
          bossPokemon: "Tyranitar",
          bestCounters: ["Machamp (Counter/Dynamic Punch)", "Lucario (Counter/Aura Sphere)", "Terrakion (Double Kick/Sacred Sword)"],
          details: "Má dvojitou slabost na bojové útoky (Fighting). Libovolný bojový pokémon ho zničí extrémně rychle."
        }
      ]
    },
    {
      name: "Arlo",
      avatar: "👓",
      reward: {
        name: "Shadow Bagon",
        pveRating: "S",
        pvpRating: "B",
        worthGrinding: true,
        reason: "Shadow Salamence má obrovské poškození (DPS) jako dračí útočník. Skvělý do raidů."
      },
      lineup: {
        slot1: ["Bagon"],
        slot2: ["Charizard", "Hypno", "Golurk"],
        slot3: ["Dragonite", "Scizor", "Salamence"]
      },
      counters: [
        {
          bossPokemon: "Bagon",
          bestCounters: ["Mamoswine (Powder Snow/Avalanche)", "Togekiss (Charm/Ancient Power)", "Sylveon (Charm/Moonblast)"],
          details: "Dračí slabost vůči ledu a vílám. Mamoswine je skvělý counter."
        },
        {
          bossPokemon: "Scizor",
          bestCounters: ["Reshiram (Fire Fang/Overheat)", "Charizard (Fire Spin/Blast Burn)", "Chandelure (Fire Spin/Overheat)"],
          details: "Má dvojitou slabost na oheň. Jakýkoliv ohnivý útok ho roztaví okamžitě."
        },
        {
          bossPokemon: "Dragonite / Salamence",
          bestCounters: ["Mamoswine (Powder Snow/Avalanche)", "Glaceon (Frost Breath/Avalanche)", "Togekiss (Charm/Dazzling Gleam)"],
          details: "Dvojitá slabost na led. Mamoswine je jasný vítěz."
        }
      ]
    },
    {
      name: "Sierra",
      avatar: "🧣",
      reward: {
        name: "Shadow Beldum",
        pveRating: "S",
        pvpRating: "A",
        worthGrinding: true,
        reason: "Shadow Metagross je absolutní monstrum a nejlepší ocelový pokémon ve hře. Hledání Shadow Hunda je hlavním cílem mnoha hráčů."
      },
      lineup: {
        slot1: ["Beldum"],
        slot2: ["Sableye", "Sharpedo", "Milotic"],
        slot3: ["Houndoom", "Gardevoir", "Flygon"]
      },
      counters: [
        {
          bossPokemon: "Beldum",
          bestCounters: ["Chandelure (Fire Spin/Shadow Ball)", "Charizard (Fire Spin/Blast Burn)", "Gengar (Lick/Shadow Ball)"],
          details: "Slabost vůči ohni a duchům. Chandelure ho vyřadí velmi rychle bez ztráty HP."
        },
        {
          bossPokemon: "Sableye",
          bestCounters: ["Togekiss (Charm/Dazzling Gleam)", "Gardevoir (Charm/Dazzling Gleam)", "Granbull (Charm/Play Rough)"],
          details: "Sableye je zranitelný pouze vůči vílím (Fairy) útokům. Charm ho zničí na pár ran."
        },
        {
          bossPokemon: "Sharpedo",
          bestCounters: ["Kartana (Razor Leaf/Leaf Blade)", "Machamp (Counter/Cross Chop)", "Lucario (Counter/Aura Sphere)"],
          details: "Sharpedo má extrémně nízkou obranu. Travní nebo bojový pokémon ho zničí dřív, než stihne nabít útok."
        }
      ]
    }
  ]
};

export const gruntsData: GruntData[] = [
  {
    phraseCs: "Boj je předem vyhraný! / Tady se nespálíš!",
    phraseEn: "Don't bother, I've already won! / You're gonna get burned!",
    type: "Dragon",
    difficulty: "Hard",
    worthFighting: true,
    shadowPokemon: ["Dratini", "Bagon", "Gible"],
    counters: ["Mamoswine", "Togekiss", "Gardevoir"]
  },
  {
    phraseCs: "Tyto vody jsou zrádné!",
    phraseEn: "These waters are treacherous!",
    type: "Water",
    difficulty: "Medium",
    worthFighting: true,
    shadowPokemon: ["Mudkip", "Totodile", "Shellder"],
    counters: ["Kartana", "Xurkitree", "Zarude"]
  },
  {
    phraseCs: "Zašlapu tě do země!",
    phraseEn: "You'll be defeated into the ground!",
    type: "Ground",
    difficulty: "Easy",
    worthFighting: true,
    shadowPokemon: ["Swinub", "Hippopotas", "Phanpy"],
    counters: ["Kyogre", "Kartana", "Mamoswine"]
  },
  {
    phraseCs: "Ke-he-he-he-he!",
    phraseEn: "Ke-he-he-he-he!",
    type: "Ghost",
    difficulty: "Easy",
    worthFighting: true,
    shadowPokemon: ["Gastly", "Misdreavus", "Duskull"],
    counters: ["Hydreigon", "Tyranitar", "Darkrai"]
  },
  {
    phraseCs: "Podívej se na mé roztomilé Pokémony!",
    phraseEn: "Check out my cute Pokémon!",
    type: "Fairy",
    difficulty: "Medium",
    worthFighting: true,
    shadowPokemon: ["Ralts", "Mawile"],
    counters: ["Metagross", "Nihilego", "Roselia"]
  },
  {
    phraseCs: "Normální neznamená slabý!",
    phraseEn: "Normal does not mean weak!",
    type: "Normal",
    difficulty: "Easy",
    worthFighting: false,
    shadowPokemon: ["Teddiursa", "Bidoof", "Starly"],
    counters: ["Machamp", "Lucario", "Terrakion"]
  },
  {
    phraseCs: "Checkni mé travní Pokémony!",
    phraseEn: "Check out my grass Pokémon!",
    type: "Grass",
    difficulty: "Easy",
    worthFighting: false,
    shadowPokemon: ["Bellsprout", "Oddish", "Cacnea"],
    counters: ["Charizard", "Reshiram", "Mamoswine"]
  }
];
