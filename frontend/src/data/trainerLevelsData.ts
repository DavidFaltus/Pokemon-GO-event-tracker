// Master Trainer Levels 1–80 & Platinum Medals Strategy Dataset
// Generated automatically from official Pokémon GO 2025/2026 Level 80 rebalance data

export interface LevelTask {
  text: { cs: string; en: string; ja: string; ru: string };
  tip?: { cs: string; en: string; ja: string; ru: string };
  xpReward?: number;
}

export interface LevelReward {
  name: { cs: string; en: string; ja: string; ru: string };
  quantity: number;
  type: string;
  iconUrl?: string;
}

export interface LevelUnlock {
  title: { cs: string; en: string; ja: string; ru: string };
  description: { cs: string; en: string; ja: string; ru: string };
  iconUrl?: string;
}

export interface TrainerLevelItem {
  level: number;
  xpRequired: number;
  totalXp: number;
  tier: 'tier1' | 'tier2' | 'tier3'; // tier1: Level 1-40, tier2: Level 41-70, tier3: Level 71-80
  unlocks?: LevelUnlock[];
  rewards: LevelReward[];
  tasks?: LevelTask[];
}

export interface PlatinumMedalStrategyItem {
  name: { cs: string; en: string; ja: string; ru: string };
  speed: string;
  description: { cs: string; en: string; ja: string; ru: string };
}

export interface PlatinumMedalsGuide {
  tierS: PlatinumMedalStrategyItem[];
  tierA: PlatinumMedalStrategyItem[];
  tierAvoid: PlatinumMedalStrategyItem[];
}

export const TRAINER_LEVELS_DATA: TrainerLevelItem[] = [
  {
    "level": 1,
    "xpRequired": 0,
    "totalXp": 0,
    "tier": "tier1",
    "unlocks": [
      {
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Poke Ball.png",
        "title": {
          "cs": "Poké Ball",
          "en": "Poké Ball",
          "ja": "モンスターボール",
          "ru": "Poké Ball"
        },
        "description": {
          "cs": "Základní nástroj pro chytání divokých Pokémonů.",
          "en": "Standard device for catching wild Pokémon.",
          "ja": "野生のポケモンを捕獲するための標準的なボールです。",
          "ru": "Стандартный шар для ловли диких покемонов."
        }
      }
    ],
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Poke Ball.png",
        "quantity": 50,
        "name": {
          "cs": "Poké Ball",
          "en": "Poké Ball",
          "ja": "モンスターボール",
          "ru": "Poké Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Incense.png",
        "quantity": 2,
        "name": {
          "cs": "Incense kadidlo",
          "en": "Incense",
          "ja": "おこう",
          "ru": "Ладан Incense"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Camera.png",
        "quantity": 1,
        "name": {
          "cs": "Fotoaparát",
          "en": "Camera",
          "ja": "カメラ",
          "ru": "Камера"
        }
      }
    ]
  },
  {
    "level": 2,
    "xpRequired": 2500,
    "totalXp": 2500,
    "tier": "tier1",
    "unlocks": [
      {
        "iconUrl": "https://cdn.leekduck.com/assets/img/icons/hatch_egg_icon_colored.png",
        "title": {
          "cs": "Líhnutí vajec",
          "en": "Hatch Eggs",
          "ja": "タマゴ孵化",
          "ru": "Высиживание яиц"
        },
        "description": {
          "cs": "Vkládejte vejce do inkubátorů a líhněte vzácné Pokémony.",
          "en": "Incubate and hatch eggs by walking in the real world.",
          "ja": "歩いてタマゴを孵化させ、レアポケモンを手に入れましょう。",
          "ru": "Инкубируйте яйца на прогулках для вылупления редких покемонов."
        }
      },
      {
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Nanab Berry.png",
        "title": {
          "cs": "Nanab Berry",
          "en": "Nanab Berry",
          "ja": "ナナのみ",
          "ru": "Nanab Berry"
        },
        "description": {
          "cs": "Uklidní divokého Pokémona a zastaví jeho útočné i skákací pohyby.",
          "en": "Calms erratic Pokémon down, making them easier to target.",
          "ja": "ポケモンの激しい動きを落ち着かせ、狙いやすくします。",
          "ru": "Успокаивает дикого покемона, останавливая прыжки и атаки."
        }
      }
    ],
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Poke Ball.png",
        "quantity": 10,
        "name": {
          "cs": "Poké Ball",
          "en": "Poké Ball",
          "ja": "モンスターボール",
          "ru": "Poké Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Nanab Berry.png",
        "quantity": 5,
        "name": {
          "cs": "Nanab Berry",
          "en": "Nanab Berry",
          "ja": "ナナのみ",
          "ru": "Nanab Berry"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Incubator Infinity.png",
        "quantity": 1,
        "name": {
          "cs": "Nekonečný inkubátor",
          "en": "Incubator Infinity",
          "ja": "むげんふかそうち",
          "ru": "Бесконечный инкубатор"
        }
      }
    ]
  },
  {
    "level": 3,
    "xpRequired": 3000,
    "totalXp": 5500,
    "tier": "tier1",
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Poke Ball.png",
        "quantity": 10,
        "name": {
          "cs": "Poké Ball",
          "en": "Poké Ball",
          "ja": "モンスターボール",
          "ru": "Poké Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Nanab Berry.png",
        "quantity": 5,
        "name": {
          "cs": "Nanab Berry",
          "en": "Nanab Berry",
          "ja": "ナナのみ",
          "ru": "Nanab Berry"
        }
      }
    ]
  },
  {
    "level": 4,
    "xpRequired": 3500,
    "totalXp": 9000,
    "tier": "tier1",
    "unlocks": [
      {
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Daily Adventure Incense.png",
        "title": {
          "cs": "Denní dobrodružné kadidlo",
          "en": "Daily Adventure Incense",
          "ja": "おさんぽおこう",
          "ru": "Daily Adventure Incense"
        },
        "description": {
          "cs": "Denně zdarma 15minutové modré kadidlo lákající divoké Pokémony a Galarian ptáky při pohybu.",
          "en": "Free 15-minute daily incense attracting rare wild Pokémon and Galarian Legendary Birds.",
          "ja": "毎日1回15分間無料。移動中にガラル3鳥などのレアポケモンを呼び寄せます。",
          "ru": "Бесплатный ежедневный 15-минутный ладан, привлекающий редких покемонов и Галар-птиц."
        }
      }
    ],
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Poke Ball.png",
        "quantity": 10,
        "name": {
          "cs": "Poké Ball",
          "en": "Poké Ball",
          "ja": "モンスターボール",
          "ru": "Poké Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Nanab Berry.png",
        "quantity": 5,
        "name": {
          "cs": "Nanab Berry",
          "en": "Nanab Berry",
          "ja": "ナナのみ",
          "ru": "Nanab Berry"
        }
      }
    ]
  },
  {
    "level": 5,
    "xpRequired": 4000,
    "totalXp": 13000,
    "tier": "tier1",
    "unlocks": [
      {
        "iconUrl": "https://cdn.leekduck.com/assets/img/icons/gym_icon.png",
        "title": {
          "cs": "Tělocvičny a stadiony Gyms",
          "en": "Gyms",
          "ja": "ジムバトル＆防衛",
          "ru": "Гимы Gyms"
        },
        "description": {
          "cs": "Obsazujte Gymy pro svůj tým a získávejte až 50 PokéCoinů denně.",
          "en": "Claim Gyms for your team and earn up to 50 PokéCoins daily.",
          "ja": "所属チームでジムを防衛し、毎日最大50ポケコインを獲得できます。",
          "ru": "Захватывайте гимы и получайте до 50 PokéCoins в день."
        }
      },
      {
        "iconUrl": "https://cdn.leekduck.com/assets/img/icons/raid_icon_colored.png",
        "title": {
          "cs": "Raidové bitvy",
          "en": "Raids",
          "ja": "レイドバトル",
          "ru": "Рейдовые битвы"
        },
        "description": {
          "cs": "Bojujte v týmu proti mocným raid bossům a legendárním Pokémonům v tělocvičnách.",
          "en": "Team up with other trainers to defeat powerful raid bosses at Gyms.",
          "ja": "他のトレーナーと協力してジムに出現する強力なレイドボスに挑みます。",
          "ru": "Командные битвы против могущественных боссов в гимах."
        }
      },
      {
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Potion.png",
        "title": {
          "cs": "Potion",
          "en": "Potion",
          "ja": "キズぐすり",
          "ru": "Potion"
        },
        "description": {
          "cs": "Obnoví 20 HP zraněnému Pokémonovi.",
          "en": "Restores 20 HP to an injured Pokémon.",
          "ja": "ポケモンのHPを20回復します。",
          "ru": "Восстанавливает 20 HP покемону."
        }
      },
      {
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Revive.png",
        "title": {
          "cs": "Revive",
          "en": "Revive",
          "ja": "げんきのかけら",
          "ru": "Revive"
        },
        "description": {
          "cs": "Oživí omdlelého Pokémona a obnoví mu 50 % maximálního HP.",
          "en": "Revives a fainted Pokémon and restores half of its maximum HP.",
          "ja": "ひんし状態のポケモンを復活させ、HPの半分を回復します。",
          "ru": "Оживляет покемона и восстанавливает 50% HP."
        }
      }
    ],
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Incense.png",
        "quantity": 1,
        "name": {
          "cs": "Incense kadidlo",
          "en": "Incense",
          "ja": "おこう",
          "ru": "Ладан Incense"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Revive.png",
        "quantity": 5,
        "name": {
          "cs": "Revive",
          "en": "Revive",
          "ja": "げんきのかけら",
          "ru": "Revive"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Poke Ball.png",
        "quantity": 15,
        "name": {
          "cs": "Poké Ball",
          "en": "Poké Ball",
          "ja": "モンスターボール",
          "ru": "Poké Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Potion.png",
        "quantity": 10,
        "name": {
          "cs": "Potion",
          "en": "Potion",
          "ja": "キズぐすり",
          "ru": "Potion"
        }
      }
    ]
  },
  {
    "level": 6,
    "xpRequired": 5000,
    "totalXp": 18000,
    "tier": "tier1",
    "unlocks": [
      {
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Lure Module.png",
        "title": {
          "cs": "Lure Modul",
          "en": "Lure Module",
          "ja": "ルアーモジュール",
          "ru": "Lure-модуль"
        },
        "description": {
          "cs": "Přiláká Pokémony k PokéStopu na 30 minut pro všechny okolní hráče.",
          "en": "Attracts wild Pokémon to a PokéStop for 30 minutes for all trainers nearby.",
          "ja": "ポケストップに30分間ポケモンを引き寄せます（周囲の全プレイヤーに有効）。",
          "ru": "Привлекает диких покемонов к покестопу на 30 минут."
        }
      }
    ],
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Lure Module.png",
        "quantity": 1,
        "name": {
          "cs": "Lure Modul",
          "en": "Lure Module",
          "ja": "ルアーモジュール",
          "ru": "Lure-модуль"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Potion.png",
        "quantity": 5,
        "name": {
          "cs": "Potion",
          "en": "Potion",
          "ja": "キズぐすり",
          "ru": "Potion"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Poke Ball.png",
        "quantity": 10,
        "name": {
          "cs": "Poké Ball",
          "en": "Poké Ball",
          "ja": "モンスターボール",
          "ru": "Poké Ball"
        }
      }
    ]
  },
  {
    "level": 7,
    "xpRequired": 6000,
    "totalXp": 24000,
    "tier": "tier1",
    "unlocks": [
      {
        "iconUrl": "https://cdn.leekduck.com/assets/img/icons/route_icon.png",
        "title": {
          "cs": "Trasy a Zygarde buňky",
          "en": "Routes",
          "ja": "ルート機能",
          "ru": "Маршруты и клетки Зигарда"
        },
        "description": {
          "cs": "Procházejte komunitní trasy, sbírejte Zygarde Cells a získávejte extra odměny.",
          "en": "Follow curated neighborhood trails to collect Zygarde Cells and item rewards.",
          "ja": "設定されたルートを歩いてジガルデ・セルや豪華アイテムを獲得します。",
          "ru": "Проходите маршруты для сбора клеток Зигарда и наград."
        }
      }
    ],
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Poke Ball.png",
        "quantity": 10,
        "name": {
          "cs": "Poké Ball",
          "en": "Poké Ball",
          "ja": "モンスターボール",
          "ru": "Poké Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Nanab Berry.png",
        "quantity": 5,
        "name": {
          "cs": "Nanab Berry",
          "en": "Nanab Berry",
          "ja": "ナナのみ",
          "ru": "Nanab Berry"
        }
      }
    ]
  },
  {
    "level": 8,
    "xpRequired": 7000,
    "totalXp": 31000,
    "tier": "tier1",
    "unlocks": [
      {
        "iconUrl": "https://cdn.leekduck.com/assets/img/icons/rocket_icon_colored.png",
        "title": {
          "cs": "Team GO Rocket a Shadow Pokémoni",
          "en": "Team GO Rocket",
          "ja": "GOロケット団バトル",
          "ru": "Team GO Rocket"
        },
        "description": {
          "cs": "Bojujte proti Rakeťákům u černých PokéStopů a v horkovzdušných balónech a zachraňujte Shadow Pokémony.",
          "en": "Battle Rocket Grunts at hijacked PokéStops and balloons to rescue Shadow Pokémon.",
          "ja": "黒いポケストップや気球でロケット団したっぱを倒し、シャドウポケモンを救出します。",
          "ru": "Битвы с пешками Ракеты на покестопах и воздушных шарах."
        }
      }
    ],
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Poke Ball.png",
        "quantity": 10,
        "name": {
          "cs": "Poké Ball",
          "en": "Poké Ball",
          "ja": "モンスターボール",
          "ru": "Poké Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Revive.png",
        "quantity": 5,
        "name": {
          "cs": "Revive",
          "en": "Revive",
          "ja": "げんきのかけら",
          "ru": "Revive"
        }
      }
    ]
  },
  {
    "level": 9,
    "xpRequired": 8000,
    "totalXp": 39000,
    "tier": "tier1",
    "unlocks": [
      {
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Razz Berry.png",
        "title": {
          "cs": "Razz Berry",
          "en": "Razz Berry",
          "ja": "ズリのみ",
          "ru": "Razz Berry"
        },
        "description": {
          "cs": "Zvyšuje šanci na chycení divokého Pokémona.",
          "en": "Feeds a Pokémon to make it easier to catch.",
          "ja": "ポケモンにあげることで捕まえやすくします。",
          "ru": "Увеличивает шанс поимки дикого покемона."
        }
      }
    ],
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Poke Ball.png",
        "quantity": 10,
        "name": {
          "cs": "Poké Ball",
          "en": "Poké Ball",
          "ja": "モンスターボール",
          "ru": "Poké Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Razz Berry.png",
        "quantity": 5,
        "name": {
          "cs": "Razz Berry",
          "en": "Razz Berry",
          "ja": "ズリのみ",
          "ru": "Razz Berry"
        }
      }
    ]
  },
  {
    "level": 10,
    "xpRequired": 9000,
    "totalXp": 48000,
    "tier": "tier1",
    "unlocks": [
      {
        "iconUrl": "https://cdn.leekduck.com/assets/img/icons/go_battle_league_icon_colored.png",
        "title": {
          "cs": "GO Battle League PvP",
          "en": "GO Battle League",
          "ja": "GOバトルリーグ",
          "ru": "GO Battle League PvP"
        },
        "description": {
          "cs": "Souboje proti trenérům po celém světě v ligách Great, Ultra a Master.",
          "en": "Battle against Trainers worldwide across Great, Ultra, and Master Leagues.",
          "ja": "世界中のトレーナーと対戦しランクを競う対戦機能です。",
          "ru": "Сражения с тренерами со всего мира в лигах Great, Ultra и Master."
        }
      },
      {
        "iconUrl": "https://cdn.leekduck.com/assets/img/icons/trade_with_friends_icon_colored.png",
        "title": {
          "cs": "Výměny Pokémonů s přáteli",
          "en": "Trade with Friends",
          "ja": "フレンドトレード",
          "ru": "Обмен покемонами Trade"
        },
        "description": {
          "cs": "Vyměňujte Pokémony s přáteli v dosahu 100 metrů pro zisk Lucky Pokémonů a chybějících druhů.",
          "en": "Trade Pokémon with local friends within 100 meters to complete Pokédexes and trigger Lucky trades.",
          "ja": "近くのフレンドとポケモンを交換し、図鑑登録やキラポケモンを狙えます。",
          "ru": "Обмен покемонами с друзьями в радиусе 100 метров."
        }
      }
    ],
    "rewards": [
      {
        "type": "upgrade",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Item Storage.png",
        "quantity": 25,
        "name": {
          "cs": "Rozšíření batohu +50",
          "en": "Item Storage Upgrade +50",
          "ja": "バッグアップグレード +50",
          "ru": "Расширение рюкзака предметов +50"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Lucky Egg.png",
        "quantity": 1,
        "name": {
          "cs": "Šťastné vejce Lucky Egg",
          "en": "Lucky Egg",
          "ja": "しあわせタマゴ",
          "ru": "Lucky Egg"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Egg Incubator.png",
        "quantity": 1,
        "name": {
          "cs": "Inkubátor vajec",
          "en": "Egg Incubator",
          "ja": "ふかそうち",
          "ru": "Инкубатор яиц"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Revive.png",
        "quantity": 10,
        "name": {
          "cs": "Revive",
          "en": "Revive",
          "ja": "げんきのかけら",
          "ru": "Revive"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Potion.png",
        "quantity": 10,
        "name": {
          "cs": "Potion",
          "en": "Potion",
          "ja": "キズぐすり",
          "ru": "Potion"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Poke Ball.png",
        "quantity": 20,
        "name": {
          "cs": "Poké Ball",
          "en": "Poké Ball",
          "ja": "モンスターボール",
          "ru": "Poké Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Razz Berry.png",
        "quantity": 10,
        "name": {
          "cs": "Razz Berry",
          "en": "Razz Berry",
          "ja": "ズリのみ",
          "ru": "Razz Berry"
        }
      }
    ]
  },
  {
    "level": 11,
    "xpRequired": 10000,
    "totalXp": 58000,
    "tier": "tier1",
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Potion.png",
        "quantity": 5,
        "name": {
          "cs": "Potion",
          "en": "Potion",
          "ja": "キズぐすり",
          "ru": "Potion"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Poke Ball.png",
        "quantity": 10,
        "name": {
          "cs": "Poké Ball",
          "en": "Poké Ball",
          "ja": "モンスターボール",
          "ru": "Poké Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Nanab Berry.png",
        "quantity": 5,
        "name": {
          "cs": "Nanab Berry",
          "en": "Nanab Berry",
          "ja": "ナナのみ",
          "ru": "Nanab Berry"
        }
      }
    ]
  },
  {
    "level": 12,
    "xpRequired": 12000,
    "totalXp": 70000,
    "tier": "tier1",
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Revive.png",
        "quantity": 5,
        "name": {
          "cs": "Revive",
          "en": "Revive",
          "ja": "げんきのかけら",
          "ru": "Revive"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Poke Ball.png",
        "quantity": 10,
        "name": {
          "cs": "Poké Ball",
          "en": "Poké Ball",
          "ja": "モンスターボール",
          "ru": "Poké Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Razz Berry.png",
        "quantity": 5,
        "name": {
          "cs": "Razz Berry",
          "en": "Razz Berry",
          "ja": "ズリのみ",
          "ru": "Razz Berry"
        }
      }
    ]
  },
  {
    "level": 13,
    "xpRequired": 14000,
    "totalXp": 84000,
    "tier": "tier1",
    "unlocks": [
      {
        "iconUrl": "https://cdn.leekduck.com/assets/img/icons/weekly_challenge_icon.png",
        "title": {
          "cs": "Týdenní týmové výzvy",
          "en": "Weekly Challenges",
          "ja": "ウィークリーチャレンジ",
          "ru": "Еженедельные испытания"
        },
        "description": {
          "cs": "Plňte týdenní společné úkoly s přáteli pro exkluzivní odměny a Stardust.",
          "en": "Complete weekly collaborative goals with friends for bonus rewards and Stardust.",
          "ja": "フレンドと協力して毎週の目標を達成しボーナスを受け取ります。",
          "ru": "Выполняйте еженедельные совместные цели с друзьями."
        }
      },
      {
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Golden Razz Berry.png",
        "title": {
          "cs": "Zlatá Razz Berry",
          "en": "Golden Razz Berry",
          "ja": "きんのズリのみ",
          "ru": "Golden Razz Berry"
        },
        "description": {
          "cs": "Výrazně zvyšuje šanci na chycení a plně obnoví motivaci Pokémona v tělocvičně.",
          "en": "Drastically boosts catch rate and fully restores gym motivation.",
          "ja": "捕獲率を大幅にアップさせ、ジム防衛ポケモンのやる気を全回復させます。",
          "ru": "Резко повышает шанс поимки и полностью восстанавливает здоровье в гиме."
        }
      }
    ],
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Golden Razz Berry.png",
        "quantity": 1,
        "name": {
          "cs": "Zlatá Razz Berry",
          "en": "Golden Razz Berry",
          "ja": "きんのズリのみ",
          "ru": "Золотая Razz Berry"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Potion.png",
        "quantity": 5,
        "name": {
          "cs": "Potion",
          "en": "Potion",
          "ja": "キズぐすり",
          "ru": "Potion"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Poke Ball.png",
        "quantity": 10,
        "name": {
          "cs": "Poké Ball",
          "en": "Poké Ball",
          "ja": "モンスターボール",
          "ru": "Poké Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Nanab Berry.png",
        "quantity": 5,
        "name": {
          "cs": "Nanab Berry",
          "en": "Nanab Berry",
          "ja": "ナナのみ",
          "ru": "Nanab Berry"
        }
      }
    ]
  },
  {
    "level": 14,
    "xpRequired": 16000,
    "totalXp": 100000,
    "tier": "tier1",
    "unlocks": [
      {
        "iconUrl": "https://cdn.leekduck.com/assets/img/icons/tag_icon.png",
        "title": {
          "cs": "Štítky a organizace Pokémonů",
          "en": "Tag Pokémon",
          "ja": "タグ付け機能",
          "ru": "Теги для покемонов"
        },
        "description": {
          "cs": "Vytvářejte vlastní barevné štítky pro třídění a organizaci inventáře Pokémonů.",
          "en": "Create custom colorful tags to categorize and sort your Pokémon storage.",
          "ja": "独自のカラータグを作成してポケモンボックスを整理できます。",
          "ru": "Создавайте цветные теги для удобной сортировки инвентаря."
        }
      },
      {
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Great Ball.png",
        "title": {
          "cs": "Great Ball",
          "en": "Great Ball",
          "ja": "スーパーボール",
          "ru": "Great Ball"
        },
        "description": {
          "cs": "Vyšší šance na záchyt než u standardního Poké Ballu.",
          "en": "Offers a higher catch rate than standard Poké Balls.",
          "ja": "モンスターボールより捕獲率が高いボールです。",
          "ru": "Повышенный шанс поимки по сравнению с Poké Ball."
        }
      }
    ],
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Great Ball.png",
        "quantity": 10,
        "name": {
          "cs": "Great Ball",
          "en": "Great Ball",
          "ja": "スーパーボール",
          "ru": "Great Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Razz Berry.png",
        "quantity": 5,
        "name": {
          "cs": "Razz Berry",
          "en": "Razz Berry",
          "ja": "ズリのみ",
          "ru": "Razz Berry"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Revive.png",
        "quantity": 5,
        "name": {
          "cs": "Revive",
          "en": "Revive",
          "ja": "げんきのかけら",
          "ru": "Revive"
        }
      }
    ]
  },
  {
    "level": 15,
    "xpRequired": 18000,
    "totalXp": 118000,
    "tier": "tier1",
    "unlocks": [
      {
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Daily Adventure Egg.png",
        "title": {
          "cs": "Denní vejce dobrodružství",
          "en": "Daily Adventure Egg",
          "ja": "デイリーアドベンチャータマゴ",
          "ru": "Ежедневное яйцо приключений"
        },
        "description": {
          "cs": "Získejte speciální vejce při každodenní chůzi.",
          "en": "Obtain special eggs from routine exploration.",
          "ja": "毎日の探索から特別なタマゴを獲得できます。",
          "ru": "Получение особых яиц за ежедневные прогулки."
        }
      }
    ],
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Star Piece.png",
        "quantity": 1,
        "name": {
          "cs": "Star Piece hvězdný úlomek",
          "en": "Star Piece",
          "ja": "ほしのかけら",
          "ru": "Кусочек звезды Star Piece"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Lure Module.png",
        "quantity": 1,
        "name": {
          "cs": "Lure Modul",
          "en": "Lure Module",
          "ja": "ルアーモジュール",
          "ru": "Lure-модуль"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Egg Incubator.png",
        "quantity": 1,
        "name": {
          "cs": "Inkubátor vajec",
          "en": "Egg Incubator",
          "ja": "ふかそうち",
          "ru": "Инкубатор яиц"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Revive.png",
        "quantity": 5,
        "name": {
          "cs": "Revive",
          "en": "Revive",
          "ja": "げんきのかけら",
          "ru": "Revive"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Potion.png",
        "quantity": 10,
        "name": {
          "cs": "Potion",
          "en": "Potion",
          "ja": "キズぐすり",
          "ru": "Potion"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Great Ball.png",
        "quantity": 15,
        "name": {
          "cs": "Great Ball",
          "en": "Great Ball",
          "ja": "スーパーボール",
          "ru": "Great Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Razz Berry.png",
        "quantity": 5,
        "name": {
          "cs": "Razz Berry",
          "en": "Razz Berry",
          "ja": "ズリのみ",
          "ru": "Razz Berry"
        }
      }
    ]
  },
  {
    "level": 16,
    "xpRequired": 21000,
    "totalXp": 139000,
    "tier": "tier1",
    "unlocks": [
      {
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Super Potion.png",
        "title": {
          "cs": "Super Potion",
          "en": "Super Potion",
          "ja": "いいキズぐすり",
          "ru": "Super Potion"
        },
        "description": {
          "cs": "Obnoví 50 HP zraněnému Pokémonovi.",
          "en": "Restores 50 HP to an injured Pokémon.",
          "ja": "ポケモンのHPを50回復します。",
          "ru": "Восстанавливает 50 HP покемону."
        }
      }
    ],
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Super Potion.png",
        "quantity": 10,
        "name": {
          "cs": "Super Potion",
          "en": "Super Potion",
          "ja": "いいキズぐすり",
          "ru": "Super Potion"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Great Ball.png",
        "quantity": 10,
        "name": {
          "cs": "Great Ball",
          "en": "Great Ball",
          "ja": "スーパーボール",
          "ru": "Great Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Razz Berry.png",
        "quantity": 5,
        "name": {
          "cs": "Razz Berry",
          "en": "Razz Berry",
          "ja": "ズリのみ",
          "ru": "Razz Berry"
        }
      }
    ]
  },
  {
    "level": 17,
    "xpRequired": 24500,
    "totalXp": 163500,
    "tier": "tier1",
    "unlocks": [
      {
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Pinap Berry.png",
        "title": {
          "cs": "Pinap Berry",
          "en": "Pinap Berry",
          "ja": "パイルのみ",
          "ru": "Pinap Berry"
        },
        "description": {
          "cs": "Zdvojnásobí množství získaných Candy při úspěšném chycení Pokémona.",
          "en": "Doubles the amount of Candy earned upon a successful catch.",
          "ja": "捕獲時に獲得できるアメの数が2倍になります。",
          "ru": "Удваивает количество конфет при успешной поимке покемона."
        }
      }
    ],
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Revive.png",
        "quantity": 5,
        "name": {
          "cs": "Revive",
          "en": "Revive",
          "ja": "げんきのかけら",
          "ru": "Revive"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Great Ball.png",
        "quantity": 10,
        "name": {
          "cs": "Great Ball",
          "en": "Great Ball",
          "ja": "スーパーボール",
          "ru": "Great Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Pinap Berry.png",
        "quantity": 5,
        "name": {
          "cs": "Pinap Berry",
          "en": "Pinap Berry",
          "ja": "パイルのみ",
          "ru": "Pinap Berry"
        }
      }
    ]
  },
  {
    "level": 18,
    "xpRequired": 28000,
    "totalXp": 191500,
    "tier": "tier1",
    "unlocks": [
      {
        "iconUrl": "https://cdn.leekduck.com/assets/img/icons/mega_evolution_icon_colored.png",
        "title": {
          "cs": "Mega Evoluce",
          "en": "Mega Evolution",
          "ja": "メガシンカ",
          "ru": "Мега-эволюция"
        },
        "description": {
          "cs": "Možnost mega vyvíjet vybrané Pokémony pomocí Mega Energie pro masivní PvE bonusy.",
          "en": "Mega Evolve eligible Pokémon using Mega Energy for huge PvE and candy boosts.",
          "ja": "メガエナジーを使ってポケモンを一時的にメガシンカさせ大幅に強化します。",
          "ru": "Мега-эволюция подходящих покемонов с помощью Мега-энергии."
        }
      }
    ],
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Super Potion.png",
        "quantity": 10,
        "name": {
          "cs": "Super Potion",
          "en": "Super Potion",
          "ja": "いいキズぐすり",
          "ru": "Super Potion"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Great Ball.png",
        "quantity": 10,
        "name": {
          "cs": "Great Ball",
          "en": "Great Ball",
          "ja": "スーパーボール",
          "ru": "Great Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Nanab Berry.png",
        "quantity": 5,
        "name": {
          "cs": "Nanab Berry",
          "en": "Nanab Berry",
          "ja": "ナナのみ",
          "ru": "Nanab Berry"
        }
      }
    ]
  },
  {
    "level": 19,
    "xpRequired": 31500,
    "totalXp": 223000,
    "tier": "tier1",
    "unlocks": [
      {
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Fast TM.png",
        "title": {
          "cs": "Fast TM",
          "en": "Fast TM",
          "ja": "わざマシンノーマル",
          "ru": "Fast TM"
        },
        "description": {
          "cs": "Předmět umožňující změnit rychlý útok Pokémona.",
          "en": "Allows teaching your Pokémon a new Fast Attack.",
          "ja": "ポケモンのノーマルアタックを変更できます。",
          "ru": "Предмет для смены быстрой атаки покемона."
        }
      }
    ],
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Fast TM.png",
        "quantity": 1,
        "name": {
          "cs": "Fast TM",
          "en": "Fast TM",
          "ja": "わざマシンノーマル",
          "ru": "Fast TM"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Revive.png",
        "quantity": 5,
        "name": {
          "cs": "Revive",
          "en": "Revive",
          "ja": "げんきのかけら",
          "ru": "Revive"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Great Ball.png",
        "quantity": 10,
        "name": {
          "cs": "Great Ball",
          "en": "Great Ball",
          "ja": "スーパーボール",
          "ru": "Great Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Razz Berry.png",
        "quantity": 5,
        "name": {
          "cs": "Razz Berry",
          "en": "Razz Berry",
          "ja": "ズリのみ",
          "ru": "Razz Berry"
        }
      }
    ]
  },
  {
    "level": 20,
    "xpRequired": 35000,
    "totalXp": 258000,
    "tier": "tier1",
    "unlocks": [
      {
        "iconUrl": "https://cdn.leekduck.com/assets/img/icons/max_battles_icon_colored.png",
        "title": {
          "cs": "Max Battles a Dynamax",
          "en": "Max Battles & Dynamax",
          "ja": "マックスバトル（ダイマックス）",
          "ru": "Max Battles и Dynamax"
        },
        "description": {
          "cs": "Bojujte u Power Spotů s obřími Dynamax Pokémony a získávejte Max částice.",
          "en": "Participate in Dynamax battles at Power Spots using Max Particles.",
          "ja": "パワースポットでダイマックスポケモンとバトルして撃破・捕獲します。",
          "ru": "Битвы с гигантскими Dynamax-покемонами на Power Spots."
        }
      },
      {
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "title": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        },
        "description": {
          "cs": "Nejlepší standardní míč s nejvyšší šancí na chycení obtížných Pokémonů.",
          "en": "Highest performance standard ball with the best catch multiplier.",
          "ja": "野生の強力なポケモンを捕まえやすい最高峰の標準ボールです。",
          "ru": "Лучший стандартный шар с наивысшим шансом поимки."
        }
      }
    ],
    "rewards": [
      {
        "type": "upgrade",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Pokemon Storage.png",
        "quantity": 25,
        "name": {
          "cs": "Rozšíření úložiště Pokémonů +50",
          "en": "Pokémon Storage Upgrade +50",
          "ja": "ポケモンボックスアップグレード +50",
          "ru": "Расширение хранилища покемонов +50"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Lucky Egg.png",
        "quantity": 1,
        "name": {
          "cs": "Šťastné vejce Lucky Egg",
          "en": "Lucky Egg",
          "ja": "しあわせタマゴ",
          "ru": "Lucky Egg"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Incense.png",
        "quantity": 1,
        "name": {
          "cs": "Incense kadidlo",
          "en": "Incense",
          "ja": "おこう",
          "ru": "Ладан Incense"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Egg Incubator.png",
        "quantity": 1,
        "name": {
          "cs": "Inkubátor vajec",
          "en": "Egg Incubator",
          "ja": "ふかそうち",
          "ru": "Инкубатор яиц"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Revive.png",
        "quantity": 10,
        "name": {
          "cs": "Revive",
          "en": "Revive",
          "ja": "げんきのかけら",
          "ru": "Revive"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Super Potion.png",
        "quantity": 20,
        "name": {
          "cs": "Super Potion",
          "en": "Super Potion",
          "ja": "いいキズぐすり",
          "ru": "Super Potion"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 20,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Pinap Berry.png",
        "quantity": 10,
        "name": {
          "cs": "Pinap Berry",
          "en": "Pinap Berry",
          "ja": "パイルのみ",
          "ru": "Pinap Berry"
        }
      }
    ]
  },
  {
    "level": 21,
    "xpRequired": 42000,
    "totalXp": 300000,
    "tier": "tier1",
    "unlocks": [
      {
        "iconUrl": "https://cdn.leekduck.com/assets/img/icons/party_play_icon.png",
        "title": {
          "cs": "Party Play týmová hra",
          "en": "Party Play",
          "ja": "チームコラボ（Party Play）",
          "ru": "Party Play Командная игра"
        },
        "description": {
          "cs": "Spojte se až se 3 přáteli do party pro Party Power bonus v raidech a společné úkoly.",
          "en": "Group up with up to 3 nearby friends for Party Power raid boosts and team challenges.",
          "ja": "近くのフレンド最大4人でチームを組み、レイドで強力なチームパワーを発動できます。",
          "ru": "Объединение до 4 друзей для бонуса урона Party Power в рейдах."
        }
      }
    ],
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Revive.png",
        "quantity": 5,
        "name": {
          "cs": "Revive",
          "en": "Revive",
          "ja": "げんきのかけら",
          "ru": "Revive"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 10,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Nanab Berry.png",
        "quantity": 5,
        "name": {
          "cs": "Nanab Berry",
          "en": "Nanab Berry",
          "ja": "ナナのみ",
          "ru": "Nanab Berry"
        }
      }
    ]
  },
  {
    "level": 22,
    "xpRequired": 49000,
    "totalXp": 349000,
    "tier": "tier1",
    "unlocks": [
      {
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Hyper Potion.png",
        "title": {
          "cs": "Hyper Potion",
          "en": "Hyper Potion",
          "ja": "ハイパーキズぐすり",
          "ru": "Hyper Potion"
        },
        "description": {
          "cs": "Obnoví 200 HP zraněnému Pokémonovi.",
          "en": "Restores 200 HP to an injured Pokémon.",
          "ja": "ポケモンのHPを200回復します。",
          "ru": "Восстанавливает 200 HP раненому покемону."
        }
      }
    ],
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Hyper Potion.png",
        "quantity": 10,
        "name": {
          "cs": "Hyper Potion",
          "en": "Hyper Potion",
          "ja": "ハイパーキズぐすり",
          "ru": "Hyper Potion"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 10,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Razz Berry.png",
        "quantity": 5,
        "name": {
          "cs": "Razz Berry",
          "en": "Razz Berry",
          "ja": "ズリのみ",
          "ru": "Razz Berry"
        }
      }
    ]
  },
  {
    "level": 23,
    "xpRequired": 56000,
    "totalXp": 405000,
    "tier": "tier1",
    "unlocks": [
      {
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Charged TM.png",
        "title": {
          "cs": "Charged TM",
          "en": "Charged TM",
          "ja": "わざマシンスペシャル",
          "ru": "Charged TM"
        },
        "description": {
          "cs": "Předmět umožňující změnit nabitý útok Pokémona.",
          "en": "Allows teaching your Pokémon a new Charged Attack.",
          "ja": "ポケモンのスペシャルアタックを変更できるアイテムです。",
          "ru": "Предмет для смены заряжаемой атаки покемона."
        }
      }
    ],
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Revive.png",
        "quantity": 5,
        "name": {
          "cs": "Revive",
          "en": "Revive",
          "ja": "げんきのかけら",
          "ru": "Revive"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 10,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Pinap Berry.png",
        "quantity": 5,
        "name": {
          "cs": "Pinap Berry",
          "en": "Pinap Berry",
          "ja": "パイルのみ",
          "ru": "Pinap Berry"
        }
      }
    ]
  },
  {
    "level": 24,
    "xpRequired": 63000,
    "totalXp": 468000,
    "tier": "tier1",
    "unlocks": [
      {
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Silver Pinap Berry.png",
        "title": {
          "cs": "Stříbrná Pinap Berry",
          "en": "Silver Pinap Berry",
          "ja": "ぎんのパイルのみ",
          "ru": "Silver Pinap Berry"
        },
        "description": {
          "cs": "Kombinuje vyšší šanci na chycení jako Razz Berry s 2.33× násobkem získaných Candy.",
          "en": "Combines catch rate boost with 2.33× candy reward.",
          "ja": "捕獲率アップとアメ2.33倍ボーナスを同時に付与します。",
          "ru": "Сочетает бонус к поимке и умножение конфет на 2.33×."
        }
      }
    ],
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Hyper Potion.png",
        "quantity": 10,
        "name": {
          "cs": "Hyper Potion",
          "en": "Hyper Potion",
          "ja": "ハイパーキズぐすり",
          "ru": "Hyper Potion"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 10,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Nanab Berry.png",
        "quantity": 5,
        "name": {
          "cs": "Nanab Berry",
          "en": "Nanab Berry",
          "ja": "ナナのみ",
          "ru": "Nanab Berry"
        }
      }
    ]
  },
  {
    "level": 25,
    "xpRequired": 70000,
    "totalXp": 538000,
    "tier": "tier1",
    "unlocks": [
      {
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Potion.png",
        "title": {
          "cs": "Max Potion",
          "en": "Max Potion",
          "ja": "まんたんのくすり",
          "ru": "Max Potion"
        },
        "description": {
          "cs": "Plně obnoví všechno HP zraněnému Pokémonovi.",
          "en": "Fully restores all HP of a fainted or damaged Pokémon.",
          "ja": "ポケモンのHPを満タンまで完全回復します。",
          "ru": "Полностью восстанавливает HP покемона."
        }
      }
    ],
    "rewards": [
      {
        "type": "avatar",
        "iconUrl": "https://cdn.leekduck.com/assets/img/avatar_items/n_hat_pokeballitems-basic_0_icon.png",
        "quantity": 1,
        "name": {
          "cs": "Poké Ball Kšiltovka",
          "en": "Poké Ball Cap",
          "ja": "モンスターボールキャップ",
          "ru": "Кепка Poké Ball"
        }
      },
      {
        "type": "upgrade",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Item Storage.png",
        "quantity": 25,
        "name": {
          "cs": "Rozšíření batohu +50",
          "en": "Item Storage Upgrade +50",
          "ja": "バッグアップグレード +50",
          "ru": "Расширение рюкзака предметов +50"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Star Piece.png",
        "quantity": 1,
        "name": {
          "cs": "Star Piece hvězdný úlomek",
          "en": "Star Piece",
          "ja": "ほしのかけら",
          "ru": "Кусочек звезды Star Piece"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Lure Module.png",
        "quantity": 1,
        "name": {
          "cs": "Lure Modul",
          "en": "Lure Module",
          "ja": "ルアーモジュール",
          "ru": "Lure-модуль"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Egg Incubator.png",
        "quantity": 1,
        "name": {
          "cs": "Inkubátor vajec",
          "en": "Egg Incubator",
          "ja": "ふかそうち",
          "ru": "Инкубатор яиц"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Potion.png",
        "quantity": 20,
        "name": {
          "cs": "Max Potion",
          "en": "Max Potion",
          "ja": "まんたんのくすり",
          "ru": "Max Potion"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Revive.png",
        "quantity": 10,
        "name": {
          "cs": "Revive",
          "en": "Revive",
          "ja": "げんきのかけら",
          "ru": "Revive"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 15,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Razz Berry.png",
        "quantity": 10,
        "name": {
          "cs": "Razz Berry",
          "en": "Razz Berry",
          "ja": "ズリのみ",
          "ru": "Razz Berry"
        }
      }
    ]
  },
  {
    "level": 26,
    "xpRequired": 83000,
    "totalXp": 621000,
    "tier": "tier1",
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Potion.png",
        "quantity": 10,
        "name": {
          "cs": "Max Potion",
          "en": "Max Potion",
          "ja": "まんたんのくすり",
          "ru": "Max Potion"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 10,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Pinap Berry.png",
        "quantity": 5,
        "name": {
          "cs": "Pinap Berry",
          "en": "Pinap Berry",
          "ja": "パイルのみ",
          "ru": "Pinap Berry"
        }
      }
    ]
  },
  {
    "level": 27,
    "xpRequired": 96000,
    "totalXp": 717000,
    "tier": "tier1",
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Revive.png",
        "quantity": 5,
        "name": {
          "cs": "Revive",
          "en": "Revive",
          "ja": "げんきのかけら",
          "ru": "Revive"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 10,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Nanab Berry.png",
        "quantity": 5,
        "name": {
          "cs": "Nanab Berry",
          "en": "Nanab Berry",
          "ja": "ナナのみ",
          "ru": "Nanab Berry"
        }
      }
    ]
  },
  {
    "level": 28,
    "xpRequired": 109000,
    "totalXp": 826000,
    "tier": "tier1",
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Potion.png",
        "quantity": 10,
        "name": {
          "cs": "Max Potion",
          "en": "Max Potion",
          "ja": "まんたんのくすり",
          "ru": "Max Potion"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 10,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Razz Berry.png",
        "quantity": 5,
        "name": {
          "cs": "Razz Berry",
          "en": "Razz Berry",
          "ja": "ズリのみ",
          "ru": "Razz Berry"
        }
      }
    ]
  },
  {
    "level": 29,
    "xpRequired": 122000,
    "totalXp": 948000,
    "tier": "tier1",
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Revive.png",
        "quantity": 5,
        "name": {
          "cs": "Revive",
          "en": "Revive",
          "ja": "げんきのかけら",
          "ru": "Revive"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 10,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Pinap Berry.png",
        "quantity": 5,
        "name": {
          "cs": "Pinap Berry",
          "en": "Pinap Berry",
          "ja": "パイルのみ",
          "ru": "Pinap Berry"
        }
      }
    ]
  },
  {
    "level": 30,
    "xpRequired": 135000,
    "totalXp": 1083000,
    "tier": "tier1",
    "unlocks": [
      {
        "iconUrl": "https://cdn.leekduck.com/assets/img/icons/route_icon.png",
        "title": {
          "cs": "Vytváření vlastních Tras",
          "en": "Create Routes",
          "ja": "ルート作成機能",
          "ru": "Создание маршрутов Routes"
        },
        "description": {
          "cs": "Možnost mapovat a publikovat vlastní Trasy pro celou komunitu.",
          "en": "Ability to record and submit official community Routes in your area.",
          "ja": "コミュニティ向けに公式ルートを申請・作成できるようになります。",
          "ru": "Возможность создавать и публиковать маршруты для сообщества."
        }
      },
      {
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Revive.png",
        "title": {
          "cs": "Max Revive",
          "en": "Max Revive",
          "ja": "げんきのかたまり",
          "ru": "Max Revive"
        },
        "description": {
          "cs": "Oživí omdlelého Pokémona a rovnou mu plně vyléčí všechno HP.",
          "en": "Revives a fainted Pokémon and completely restores 100% of its HP.",
          "ja": "ひんし状態のポケモンを復活させ、HPを全快にします。",
          "ru": "Оживляет покемона и сразу восстанавливает 100% HP."
        }
      }
    ],
    "rewards": [
      {
        "type": "avatar",
        "iconUrl": "https://cdn.leekduck.com/assets/img/avatar_items/n_shoes_pokeballitems-basic_0_icon.png",
        "quantity": 1,
        "name": {
          "cs": "Poké Ball Boty",
          "en": "Poké Ball Shoes",
          "ja": "モンスターボールシューズ",
          "ru": "Обувь Poké Ball"
        }
      },
      {
        "type": "upgrade",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Item Storage.png",
        "quantity": 100,
        "name": {
          "cs": "Rozšíření batohu +50",
          "en": "Item Storage Upgrade +50",
          "ja": "バッグアップグレード +50",
          "ru": "Расширение рюкзака предметов +50"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Lucky Egg.png",
        "quantity": 2,
        "name": {
          "cs": "Šťastné vejce Lucky Egg",
          "en": "Lucky Egg",
          "ja": "しあわせタマゴ",
          "ru": "Lucky Egg"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Incense.png",
        "quantity": 2,
        "name": {
          "cs": "Incense kadidlo",
          "en": "Incense",
          "ja": "おこう",
          "ru": "Ладан Incense"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Egg Incubator.png",
        "quantity": 2,
        "name": {
          "cs": "Inkubátor vajec",
          "en": "Egg Incubator",
          "ja": "ふかそうち",
          "ru": "Инкубатор яиц"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Revive.png",
        "quantity": 15,
        "name": {
          "cs": "Max Revive",
          "en": "Max Revive",
          "ja": "げんきのかたまり",
          "ru": "Max Revive"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Potion.png",
        "quantity": 30,
        "name": {
          "cs": "Max Potion",
          "en": "Max Potion",
          "ja": "まんたんのくすり",
          "ru": "Max Potion"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 30,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Pinap Berry.png",
        "quantity": 20,
        "name": {
          "cs": "Pinap Berry",
          "en": "Pinap Berry",
          "ja": "パイルのみ",
          "ru": "Pinap Berry"
        }
      }
    ]
  },
  {
    "level": 31,
    "xpRequired": 158000,
    "totalXp": 1241000,
    "tier": "tier1",
    "unlocks": [
      {
        "iconUrl": "https://cdn.leekduck.com/assets/img/icons/candy_xl_icon_colored.png",
        "title": {
          "cs": "Candy XL systém",
          "en": "Candy XL System",
          "ja": "アメXL解放",
          "ru": "Система Candy XL"
        },
        "description": {
          "cs": "Odemčení sběru Candy XL pro posilování Pokémonů nad level 40 až na level 50.",
          "en": "Unlock Candy XL drops to power up Pokémon beyond level 40 up to level 50.",
          "ja": "ポケモンをレベル40超〜50まで強化できるアメXLがドロップするようになります。",
          "ru": "Открытие Candy XL для прокачки покемонов выше 40 уровня до 50."
        }
      }
    ],
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Potion.png",
        "quantity": 10,
        "name": {
          "cs": "Max Potion",
          "en": "Max Potion",
          "ja": "まんたんのくすり",
          "ru": "Max Potion"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 10,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Nanab Berry.png",
        "quantity": 5,
        "name": {
          "cs": "Nanab Berry",
          "en": "Nanab Berry",
          "ja": "ナナのみ",
          "ru": "Nanab Berry"
        }
      }
    ]
  },
  {
    "level": 32,
    "xpRequired": 181000,
    "totalXp": 1422000,
    "tier": "tier1",
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Revive.png",
        "quantity": 5,
        "name": {
          "cs": "Max Revive",
          "en": "Max Revive",
          "ja": "げんきのかたまり",
          "ru": "Max Revive"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 10,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Razz Berry.png",
        "quantity": 5,
        "name": {
          "cs": "Razz Berry",
          "en": "Razz Berry",
          "ja": "ズリのみ",
          "ru": "Razz Berry"
        }
      }
    ]
  },
  {
    "level": 33,
    "xpRequired": 204000,
    "totalXp": 1626000,
    "tier": "tier1",
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Potion.png",
        "quantity": 10,
        "name": {
          "cs": "Max Potion",
          "en": "Max Potion",
          "ja": "まんたんのくすり",
          "ru": "Max Potion"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 10,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Pinap Berry.png",
        "quantity": 5,
        "name": {
          "cs": "Pinap Berry",
          "en": "Pinap Berry",
          "ja": "パイルのみ",
          "ru": "Pinap Berry"
        }
      }
    ]
  },
  {
    "level": 34,
    "xpRequired": 227000,
    "totalXp": 1853000,
    "tier": "tier1",
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Revive.png",
        "quantity": 5,
        "name": {
          "cs": "Max Revive",
          "en": "Max Revive",
          "ja": "げんきのかたまり",
          "ru": "Max Revive"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 10,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Nanab Berry.png",
        "quantity": 5,
        "name": {
          "cs": "Nanab Berry",
          "en": "Nanab Berry",
          "ja": "ナナのみ",
          "ru": "Nanab Berry"
        }
      }
    ]
  },
  {
    "level": 35,
    "xpRequired": 250000,
    "totalXp": 2103000,
    "tier": "tier1",
    "unlocks": [
      {
        "iconUrl": "https://cdn.leekduck.com/assets/img/icons/pokestop_icon.png",
        "title": {
          "cs": "Nominace nových PokéStopů Wayfarer",
          "en": "Nominate PokéStops",
          "ja": "ポケストップ申請機能",
          "ru": "Номинация покестопов Wayfarer"
        },
        "description": {
          "cs": "Navrhujte nové reálné památky a zajímavosti v okolí jako oficiální PokéStopy.",
          "en": "Submit real-world landmarks in your community to become official PokéStops.",
          "ja": "実在する地域のスポットを公式ポケストップとして申請できます。",
          "ru": "Подача заявок на добавление новых покестопов в вашем городе."
        }
      }
    ],
    "rewards": [
      {
        "type": "avatar",
        "iconUrl": "https://cdn.leekduck.com/assets/img/avatar_items/n_shirt_pokeballitems-basic_0_icon.png",
        "quantity": 1,
        "name": {
          "cs": "Poké Ball Bunda",
          "en": "Poké Ball Jacket",
          "ja": "モンスターボールジャケット",
          "ru": "Куртка Poké Ball"
        }
      },
      {
        "type": "upgrade",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Item Storage.png",
        "quantity": 50,
        "name": {
          "cs": "Rozšíření batohu +50",
          "en": "Item Storage Upgrade +50",
          "ja": "バッグアップグレード +50",
          "ru": "Расширение рюкзака предметов +50"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Star Piece.png",
        "quantity": 1,
        "name": {
          "cs": "Star Piece hvězdný úlomek",
          "en": "Star Piece",
          "ja": "ほしのかけら",
          "ru": "Кусочек звезды Star Piece"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Lure Module.png",
        "quantity": 1,
        "name": {
          "cs": "Lure Modul",
          "en": "Lure Module",
          "ja": "ルアーモジュール",
          "ru": "Lure-модуль"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Egg Incubator.png",
        "quantity": 1,
        "name": {
          "cs": "Inkubátor vajec",
          "en": "Egg Incubator",
          "ja": "ふかそうち",
          "ru": "Инкубатор яиц"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Revive.png",
        "quantity": 10,
        "name": {
          "cs": "Max Revive",
          "en": "Max Revive",
          "ja": "げんきのかたまり",
          "ru": "Max Revive"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Potion.png",
        "quantity": 20,
        "name": {
          "cs": "Max Potion",
          "en": "Max Potion",
          "ja": "まんたんのくすり",
          "ru": "Max Potion"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 15,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Razz Berry.png",
        "quantity": 10,
        "name": {
          "cs": "Razz Berry",
          "en": "Razz Berry",
          "ja": "ズリのみ",
          "ru": "Razz Berry"
        }
      }
    ]
  },
  {
    "level": 36,
    "xpRequired": 290000,
    "totalXp": 2393000,
    "tier": "tier1",
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Potion.png",
        "quantity": 10,
        "name": {
          "cs": "Max Potion",
          "en": "Max Potion",
          "ja": "まんたんのくすり",
          "ru": "Max Potion"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 10,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Pinap Berry.png",
        "quantity": 5,
        "name": {
          "cs": "Pinap Berry",
          "en": "Pinap Berry",
          "ja": "パイルのみ",
          "ru": "Pinap Berry"
        }
      }
    ]
  },
  {
    "level": 37,
    "xpRequired": 330000,
    "totalXp": 2723000,
    "tier": "tier1",
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Revive.png",
        "quantity": 5,
        "name": {
          "cs": "Max Revive",
          "en": "Max Revive",
          "ja": "げんきのかたまり",
          "ru": "Max Revive"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 10,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Nanab Berry.png",
        "quantity": 5,
        "name": {
          "cs": "Nanab Berry",
          "en": "Nanab Berry",
          "ja": "ナナのみ",
          "ru": "Nanab Berry"
        }
      }
    ]
  },
  {
    "level": 38,
    "xpRequired": 370000,
    "totalXp": 3093000,
    "tier": "tier1",
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Potion.png",
        "quantity": 10,
        "name": {
          "cs": "Max Potion",
          "en": "Max Potion",
          "ja": "まんたんのくすり",
          "ru": "Max Potion"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 10,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Razz Berry.png",
        "quantity": 5,
        "name": {
          "cs": "Razz Berry",
          "en": "Razz Berry",
          "ja": "ズリのみ",
          "ru": "Razz Berry"
        }
      }
    ]
  },
  {
    "level": 39,
    "xpRequired": 410000,
    "totalXp": 3503000,
    "tier": "tier1",
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Revive.png",
        "quantity": 5,
        "name": {
          "cs": "Max Revive",
          "en": "Max Revive",
          "ja": "げんきのかたまり",
          "ru": "Max Revive"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 10,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Pinap Berry.png",
        "quantity": 5,
        "name": {
          "cs": "Pinap Berry",
          "en": "Pinap Berry",
          "ja": "パイルのみ",
          "ru": "Pinap Berry"
        }
      }
    ]
  },
  {
    "level": 40,
    "xpRequired": 450000,
    "totalXp": 3953000,
    "tier": "tier1",
    "rewards": [
      {
        "type": "avatar",
        "iconUrl": "https://cdn.leekduck.com/assets/img/avatar_items/n_hat_pokeballitems-great_0_icon.png",
        "quantity": 1,
        "name": {
          "cs": "Great Ball Kšiltovka",
          "en": "Great Ball Cap",
          "ja": "スーパーボールキャップ",
          "ru": "Кепка Great Ball"
        }
      },
      {
        "type": "upgrade",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Pokemon Storage.png",
        "quantity": 50,
        "name": {
          "cs": "Rozšíření úložiště Pokémonů +50",
          "en": "Pokémon Storage Upgrade +50",
          "ja": "ポケモンボックスアップグレード +50",
          "ru": "Расширение хранилища покемонов +50"
        }
      },
      {
        "type": "upgrade",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Item Storage.png",
        "quantity": 75,
        "name": {
          "cs": "Rozšíření batohu +50",
          "en": "Item Storage Upgrade +50",
          "ja": "バッグアップグレード +50",
          "ru": "Расширение рюкзака предметов +50"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Elite Fast TM.png",
        "quantity": 1,
        "name": {
          "cs": "Elitní Fast TM",
          "en": "Elite Fast TM",
          "ja": "すごいわざマシンノーマル",
          "ru": "Элитный Fast TM"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Lucky Egg.png",
        "quantity": 2,
        "name": {
          "cs": "Šťastné vejce Lucky Egg",
          "en": "Lucky Egg",
          "ja": "しあわせタマゴ",
          "ru": "Lucky Egg"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Incense.png",
        "quantity": 2,
        "name": {
          "cs": "Incense kadidlo",
          "en": "Incense",
          "ja": "おこう",
          "ru": "Ладан Incense"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Egg Incubator.png",
        "quantity": 2,
        "name": {
          "cs": "Inkubátor vajec",
          "en": "Egg Incubator",
          "ja": "ふかそうち",
          "ru": "Инкубатор яиц"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Revive.png",
        "quantity": 20,
        "name": {
          "cs": "Max Revive",
          "en": "Max Revive",
          "ja": "げんきのかたまり",
          "ru": "Max Revive"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Potion.png",
        "quantity": 40,
        "name": {
          "cs": "Max Potion",
          "en": "Max Potion",
          "ja": "まんたんのくすり",
          "ru": "Max Potion"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 40,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Pinap Berry.png",
        "quantity": 30,
        "name": {
          "cs": "Pinap Berry",
          "en": "Pinap Berry",
          "ja": "パイルのみ",
          "ru": "Pinap Berry"
        }
      }
    ]
  },
  {
    "level": 41,
    "xpRequired": 520000,
    "totalXp": 4473000,
    "tier": "tier2",
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Lucky Egg.png",
        "quantity": 1,
        "name": {
          "cs": "Šťastné vejce Lucky Egg",
          "en": "Lucky Egg",
          "ja": "しあわせタマゴ",
          "ru": "Lucky Egg"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Potion.png",
        "quantity": 20,
        "name": {
          "cs": "Max Potion",
          "en": "Max Potion",
          "ja": "まんたんのくすり",
          "ru": "Max Potion"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 15,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Nanab Berry.png",
        "quantity": 10,
        "name": {
          "cs": "Nanab Berry",
          "en": "Nanab Berry",
          "ja": "ナナのみ",
          "ru": "Nanab Berry"
        }
      }
    ]
  },
  {
    "level": 42,
    "xpRequired": 590000,
    "totalXp": 5063000,
    "tier": "tier2",
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Egg Incubator.png",
        "quantity": 1,
        "name": {
          "cs": "Inkubátor vajec",
          "en": "Egg Incubator",
          "ja": "ふかそうち",
          "ru": "Инкубатор яиц"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Revive.png",
        "quantity": 10,
        "name": {
          "cs": "Max Revive",
          "en": "Max Revive",
          "ja": "げんきのかたまり",
          "ru": "Max Revive"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 15,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Razz Berry.png",
        "quantity": 10,
        "name": {
          "cs": "Razz Berry",
          "en": "Razz Berry",
          "ja": "ズリのみ",
          "ru": "Razz Berry"
        }
      }
    ]
  },
  {
    "level": 43,
    "xpRequired": 660000,
    "totalXp": 5723000,
    "tier": "tier2",
    "rewards": [
      {
        "type": "upgrade",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Gift Storage.png",
        "quantity": 5,
        "name": {
          "cs": "Rozšíření dárků +5",
          "en": "Gift Storage Upgrade +5",
          "ja": "ギフト所持枠拡張 +5",
          "ru": "Расширение хранилища подарков +5"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Potion.png",
        "quantity": 20,
        "name": {
          "cs": "Max Potion",
          "en": "Max Potion",
          "ja": "まんたんのくすり",
          "ru": "Max Potion"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 15,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Pinap Berry.png",
        "quantity": 10,
        "name": {
          "cs": "Pinap Berry",
          "en": "Pinap Berry",
          "ja": "パイルのみ",
          "ru": "Pinap Berry"
        }
      }
    ]
  },
  {
    "level": 44,
    "xpRequired": 730000,
    "totalXp": 6453000,
    "tier": "tier2",
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Incense.png",
        "quantity": 1,
        "name": {
          "cs": "Incense kadidlo",
          "en": "Incense",
          "ja": "おこう",
          "ru": "Ладан Incense"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Revive.png",
        "quantity": 10,
        "name": {
          "cs": "Max Revive",
          "en": "Max Revive",
          "ja": "げんきのかたまり",
          "ru": "Max Revive"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 15,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Nanab Berry.png",
        "quantity": 10,
        "name": {
          "cs": "Nanab Berry",
          "en": "Nanab Berry",
          "ja": "ナナのみ",
          "ru": "Nanab Berry"
        }
      }
    ]
  },
  {
    "level": 45,
    "xpRequired": 800000,
    "totalXp": 7253000,
    "tier": "tier2",
    "rewards": [
      {
        "type": "avatar",
        "iconUrl": "https://cdn.leekduck.com/assets/img/avatar_items/n_shoes_pokeballitems-great_0_icon.png",
        "quantity": 1,
        "name": {
          "cs": "Great Ball Boty",
          "en": "Great Ball Shoes",
          "ja": "スーパーボールシューズ",
          "ru": "Обувь Great Ball"
        }
      },
      {
        "type": "upgrade",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Item Storage.png",
        "quantity": 50,
        "name": {
          "cs": "Rozšíření batohu +50",
          "en": "Item Storage Upgrade +50",
          "ja": "バッグアップグレード +50",
          "ru": "Расширение рюкзака предметов +50"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Star Piece.png",
        "quantity": 1,
        "name": {
          "cs": "Star Piece hvězdný úlomek",
          "en": "Star Piece",
          "ja": "ほしのかけら",
          "ru": "Кусочек звезды Star Piece"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Lure Module.png",
        "quantity": 1,
        "name": {
          "cs": "Lure Modul",
          "en": "Lure Module",
          "ja": "ルアーモジュール",
          "ru": "Lure-модуль"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Egg Incubator.png",
        "quantity": 1,
        "name": {
          "cs": "Inkubátor vajec",
          "en": "Egg Incubator",
          "ja": "ふかそうち",
          "ru": "Инкубатор яиц"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Revive.png",
        "quantity": 15,
        "name": {
          "cs": "Max Revive",
          "en": "Max Revive",
          "ja": "げんきのかたまり",
          "ru": "Max Revive"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Potion.png",
        "quantity": 30,
        "name": {
          "cs": "Max Potion",
          "en": "Max Potion",
          "ja": "まんたんのくすり",
          "ru": "Max Potion"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 25,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Razz Berry.png",
        "quantity": 15,
        "name": {
          "cs": "Razz Berry",
          "en": "Razz Berry",
          "ja": "ズリのみ",
          "ru": "Razz Berry"
        }
      }
    ]
  },
  {
    "level": 46,
    "xpRequired": 900000,
    "totalXp": 8153000,
    "tier": "tier2",
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Star Piece.png",
        "quantity": 1,
        "name": {
          "cs": "Star Piece hvězdný úlomek",
          "en": "Star Piece",
          "ja": "ほしのかけら",
          "ru": "Кусочек звезды Star Piece"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Potion.png",
        "quantity": 20,
        "name": {
          "cs": "Max Potion",
          "en": "Max Potion",
          "ja": "まんたんのくすり",
          "ru": "Max Potion"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 15,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Pinap Berry.png",
        "quantity": 10,
        "name": {
          "cs": "Pinap Berry",
          "en": "Pinap Berry",
          "ja": "パイルのみ",
          "ru": "Pinap Berry"
        }
      }
    ]
  },
  {
    "level": 47,
    "xpRequired": 1000000,
    "totalXp": 9153000,
    "tier": "tier2",
    "rewards": [
      {
        "type": "upgrade",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Postcard Storage.png",
        "quantity": 50,
        "name": {
          "cs": "Rozšíření alba pohlednic +50",
          "en": "Postcard Storage Upgrade +50",
          "ja": "ポストカード枠拡張 +50",
          "ru": "Расширение книги открыток +50"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Revive.png",
        "quantity": 10,
        "name": {
          "cs": "Max Revive",
          "en": "Max Revive",
          "ja": "げんきのかたまり",
          "ru": "Max Revive"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 15,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Nanab Berry.png",
        "quantity": 10,
        "name": {
          "cs": "Nanab Berry",
          "en": "Nanab Berry",
          "ja": "ナナのみ",
          "ru": "Nanab Berry"
        }
      }
    ]
  },
  {
    "level": 48,
    "xpRequired": 1100000,
    "totalXp": 10253000,
    "tier": "tier2",
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Egg Incubator.png",
        "quantity": 1,
        "name": {
          "cs": "Inkubátor vajec",
          "en": "Egg Incubator",
          "ja": "ふかそうち",
          "ru": "Инкубатор яиц"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Potion.png",
        "quantity": 20,
        "name": {
          "cs": "Max Potion",
          "en": "Max Potion",
          "ja": "まんたんのくすり",
          "ru": "Max Potion"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 15,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Razz Berry.png",
        "quantity": 10,
        "name": {
          "cs": "Razz Berry",
          "en": "Razz Berry",
          "ja": "ズリのみ",
          "ru": "Razz Berry"
        }
      }
    ]
  },
  {
    "level": 49,
    "xpRequired": 1200000,
    "totalXp": 11453000,
    "tier": "tier2",
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Lure Module.png",
        "quantity": 1,
        "name": {
          "cs": "Lure Modul",
          "en": "Lure Module",
          "ja": "ルアーモジュール",
          "ru": "Lure-модуль"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Revive.png",
        "quantity": 10,
        "name": {
          "cs": "Max Revive",
          "en": "Max Revive",
          "ja": "げんきのかたまり",
          "ru": "Max Revive"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 15,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Pinap Berry.png",
        "quantity": 10,
        "name": {
          "cs": "Pinap Berry",
          "en": "Pinap Berry",
          "ja": "パイルのみ",
          "ru": "Pinap Berry"
        }
      }
    ]
  },
  {
    "level": 50,
    "xpRequired": 1300000,
    "totalXp": 12753000,
    "tier": "tier2",
    "rewards": [
      {
        "type": "avatar",
        "iconUrl": "https://cdn.leekduck.com/assets/img/avatar_items/n_shirt_pokeballitems-great_0_icon.png",
        "quantity": 1,
        "name": {
          "cs": "Great Ball Bunda",
          "en": "Great Ball Jacket",
          "ja": "スーパーボールジャケット",
          "ru": "Куртка Great Ball"
        }
      },
      {
        "type": "upgrade",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Item Storage.png",
        "quantity": 75,
        "name": {
          "cs": "Rozšíření batohu +50",
          "en": "Item Storage Upgrade +50",
          "ja": "バッグアップグレード +50",
          "ru": "Расширение рюкзака предметов +50"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Elite Charged TM.png",
        "quantity": 1,
        "name": {
          "cs": "Elitní Charged TM",
          "en": "Elite Charged TM",
          "ja": "すごいわざマシンスペシャル",
          "ru": "Элитный Charged TM"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Lucky Egg.png",
        "quantity": 3,
        "name": {
          "cs": "Šťastné vejce Lucky Egg",
          "en": "Lucky Egg",
          "ja": "しあわせタマゴ",
          "ru": "Lucky Egg"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Incense.png",
        "quantity": 3,
        "name": {
          "cs": "Incense kadidlo",
          "en": "Incense",
          "ja": "おこう",
          "ru": "Ладан Incense"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Egg Incubator.png",
        "quantity": 3,
        "name": {
          "cs": "Inkubátor vajec",
          "en": "Egg Incubator",
          "ja": "ふかそうち",
          "ru": "Инкубатор яиц"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Revive.png",
        "quantity": 25,
        "name": {
          "cs": "Max Revive",
          "en": "Max Revive",
          "ja": "げんきのかたまり",
          "ru": "Max Revive"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Potion.png",
        "quantity": 50,
        "name": {
          "cs": "Max Potion",
          "en": "Max Potion",
          "ja": "まんたんのくすり",
          "ru": "Max Potion"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 50,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Pinap Berry.png",
        "quantity": 40,
        "name": {
          "cs": "Pinap Berry",
          "en": "Pinap Berry",
          "ja": "パイルのみ",
          "ru": "Pinap Berry"
        }
      }
    ]
  },
  {
    "level": 51,
    "xpRequired": 1440000,
    "totalXp": 14193000,
    "tier": "tier2",
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Lucky Egg.png",
        "quantity": 1,
        "name": {
          "cs": "Šťastné vejce Lucky Egg",
          "en": "Lucky Egg",
          "ja": "しあわせタマゴ",
          "ru": "Lucky Egg"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Potion.png",
        "quantity": 20,
        "name": {
          "cs": "Max Potion",
          "en": "Max Potion",
          "ja": "まんたんのくすり",
          "ru": "Max Potion"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 20,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Nanab Berry.png",
        "quantity": 15,
        "name": {
          "cs": "Nanab Berry",
          "en": "Nanab Berry",
          "ja": "ナナのみ",
          "ru": "Nanab Berry"
        }
      }
    ]
  },
  {
    "level": 52,
    "xpRequired": 1580000,
    "totalXp": 15773000,
    "tier": "tier2",
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Egg Incubator.png",
        "quantity": 1,
        "name": {
          "cs": "Inkubátor vajec",
          "en": "Egg Incubator",
          "ja": "ふかそうち",
          "ru": "Инкубатор яиц"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Revive.png",
        "quantity": 10,
        "name": {
          "cs": "Max Revive",
          "en": "Max Revive",
          "ja": "げんきのかたまり",
          "ru": "Max Revive"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 20,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Razz Berry.png",
        "quantity": 15,
        "name": {
          "cs": "Razz Berry",
          "en": "Razz Berry",
          "ja": "ズリのみ",
          "ru": "Razz Berry"
        }
      }
    ]
  },
  {
    "level": 53,
    "xpRequired": 1720000,
    "totalXp": 17493000,
    "tier": "tier2",
    "rewards": [
      {
        "type": "upgrade",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Gift Storage.png",
        "quantity": 5,
        "name": {
          "cs": "Rozšíření dárků +5",
          "en": "Gift Storage Upgrade +5",
          "ja": "ギフト所持枠拡張 +5",
          "ru": "Расширение хранилища подарков +5"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Potion.png",
        "quantity": 20,
        "name": {
          "cs": "Max Potion",
          "en": "Max Potion",
          "ja": "まんたんのくすり",
          "ru": "Max Potion"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 20,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Pinap Berry.png",
        "quantity": 15,
        "name": {
          "cs": "Pinap Berry",
          "en": "Pinap Berry",
          "ja": "パイルのみ",
          "ru": "Pinap Berry"
        }
      }
    ]
  },
  {
    "level": 54,
    "xpRequired": 1860000,
    "totalXp": 19353000,
    "tier": "tier2",
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Incense.png",
        "quantity": 1,
        "name": {
          "cs": "Incense kadidlo",
          "en": "Incense",
          "ja": "おこう",
          "ru": "Ладан Incense"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Revive.png",
        "quantity": 10,
        "name": {
          "cs": "Max Revive",
          "en": "Max Revive",
          "ja": "げんきのかたまり",
          "ru": "Max Revive"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 20,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Nanab Berry.png",
        "quantity": 15,
        "name": {
          "cs": "Nanab Berry",
          "en": "Nanab Berry",
          "ja": "ナナのみ",
          "ru": "Nanab Berry"
        }
      }
    ]
  },
  {
    "level": 55,
    "xpRequired": 2000000,
    "totalXp": 21353000,
    "tier": "tier2",
    "rewards": [
      {
        "type": "avatar",
        "iconUrl": "https://cdn.leekduck.com/assets/img/avatar_items/n_hat_pokeballitems-ultra_0_icon.png",
        "quantity": 1,
        "name": {
          "cs": "Ultra Ball Kšiltovka",
          "en": "Ultra Ball Cap",
          "ja": "ハイパーボールキャップ",
          "ru": "Кепка Ultra Ball"
        }
      },
      {
        "type": "upgrade",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Pokemon Storage.png",
        "quantity": 25,
        "name": {
          "cs": "Rozšíření úložiště Pokémonů +50",
          "en": "Pokémon Storage Upgrade +50",
          "ja": "ポケモンボックスアップグレード +50",
          "ru": "Расширение хранилища покемонов +50"
        }
      },
      {
        "type": "upgrade",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Item Storage.png",
        "quantity": 50,
        "name": {
          "cs": "Rozšíření batohu +50",
          "en": "Item Storage Upgrade +50",
          "ja": "バッグアップグレード +50",
          "ru": "Расширение рюкзака предметов +50"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Star Piece.png",
        "quantity": 2,
        "name": {
          "cs": "Star Piece hvězdný úlomek",
          "en": "Star Piece",
          "ja": "ほしのかけら",
          "ru": "Кусочек звезды Star Piece"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Lure Module.png",
        "quantity": 2,
        "name": {
          "cs": "Lure Modul",
          "en": "Lure Module",
          "ja": "ルアーモジュール",
          "ru": "Lure-модуль"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Egg Incubator.png",
        "quantity": 2,
        "name": {
          "cs": "Inkubátor vajec",
          "en": "Egg Incubator",
          "ja": "ふかそうち",
          "ru": "Инкубатор яиц"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Revive.png",
        "quantity": 15,
        "name": {
          "cs": "Max Revive",
          "en": "Max Revive",
          "ja": "げんきのかたまり",
          "ru": "Max Revive"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Potion.png",
        "quantity": 30,
        "name": {
          "cs": "Max Potion",
          "en": "Max Potion",
          "ja": "まんたんのくすり",
          "ru": "Max Potion"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 30,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Razz Berry.png",
        "quantity": 20,
        "name": {
          "cs": "Razz Berry",
          "en": "Razz Berry",
          "ja": "ズリのみ",
          "ru": "Razz Berry"
        }
      }
    ]
  },
  {
    "level": 56,
    "xpRequired": 2200000,
    "totalXp": 23553000,
    "tier": "tier2",
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Star Piece.png",
        "quantity": 1,
        "name": {
          "cs": "Star Piece hvězdný úlomek",
          "en": "Star Piece",
          "ja": "ほしのかけら",
          "ru": "Кусочек звезды Star Piece"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Potion.png",
        "quantity": 20,
        "name": {
          "cs": "Max Potion",
          "en": "Max Potion",
          "ja": "まんたんのくすり",
          "ru": "Max Potion"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 20,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Pinap Berry.png",
        "quantity": 15,
        "name": {
          "cs": "Pinap Berry",
          "en": "Pinap Berry",
          "ja": "パイルのみ",
          "ru": "Pinap Berry"
        }
      }
    ]
  },
  {
    "level": 57,
    "xpRequired": 2400000,
    "totalXp": 25953000,
    "tier": "tier2",
    "rewards": [
      {
        "type": "upgrade",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Postcard Storage.png",
        "quantity": 50,
        "name": {
          "cs": "Rozšíření alba pohlednic +50",
          "en": "Postcard Storage Upgrade +50",
          "ja": "ポストカード枠拡張 +50",
          "ru": "Расширение книги открыток +50"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Revive.png",
        "quantity": 10,
        "name": {
          "cs": "Max Revive",
          "en": "Max Revive",
          "ja": "げんきのかたまり",
          "ru": "Max Revive"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 20,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Nanab Berry.png",
        "quantity": 15,
        "name": {
          "cs": "Nanab Berry",
          "en": "Nanab Berry",
          "ja": "ナナのみ",
          "ru": "Nanab Berry"
        }
      }
    ]
  },
  {
    "level": 58,
    "xpRequired": 2600000,
    "totalXp": 28553000,
    "tier": "tier2",
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Egg Incubator.png",
        "quantity": 1,
        "name": {
          "cs": "Inkubátor vajec",
          "en": "Egg Incubator",
          "ja": "ふかそうち",
          "ru": "Инкубатор яиц"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Potion.png",
        "quantity": 20,
        "name": {
          "cs": "Max Potion",
          "en": "Max Potion",
          "ja": "まんたんのくすり",
          "ru": "Max Potion"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 20,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Razz Berry.png",
        "quantity": 15,
        "name": {
          "cs": "Razz Berry",
          "en": "Razz Berry",
          "ja": "ズリのみ",
          "ru": "Razz Berry"
        }
      }
    ]
  },
  {
    "level": 59,
    "xpRequired": 2800000,
    "totalXp": 31353000,
    "tier": "tier2",
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Lure Module.png",
        "quantity": 1,
        "name": {
          "cs": "Lure Modul",
          "en": "Lure Module",
          "ja": "ルアーモジュール",
          "ru": "Lure-модуль"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Revive.png",
        "quantity": 10,
        "name": {
          "cs": "Max Revive",
          "en": "Max Revive",
          "ja": "げんきのかたまり",
          "ru": "Max Revive"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 20,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Pinap Berry.png",
        "quantity": 15,
        "name": {
          "cs": "Pinap Berry",
          "en": "Pinap Berry",
          "ja": "パイルのみ",
          "ru": "Pinap Berry"
        }
      }
    ]
  },
  {
    "level": 60,
    "xpRequired": 3000000,
    "totalXp": 34353000,
    "tier": "tier2",
    "rewards": [
      {
        "type": "avatar",
        "iconUrl": "https://cdn.leekduck.com/assets/img/avatar_items/n_shoes_pokeballitems-ultra_0_icon.png",
        "quantity": 1,
        "name": {
          "cs": "Ultra Ball Boty",
          "en": "Ultra Ball Shoes",
          "ja": "ハイパーボールシューズ",
          "ru": "Обувь Ultra Ball"
        }
      },
      {
        "type": "upgrade",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Pokemon Storage.png",
        "quantity": 50,
        "name": {
          "cs": "Rozšíření úložiště Pokémonů +50",
          "en": "Pokémon Storage Upgrade +50",
          "ja": "ポケモンボックスアップグレード +50",
          "ru": "Расширение хранилища покемонов +50"
        }
      },
      {
        "type": "upgrade",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Item Storage.png",
        "quantity": 75,
        "name": {
          "cs": "Rozšíření batohu +50",
          "en": "Item Storage Upgrade +50",
          "ja": "バッグアップグレード +50",
          "ru": "Расширение рюкзака предметов +50"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Lucky Egg.png",
        "quantity": 4,
        "name": {
          "cs": "Šťastné vejce Lucky Egg",
          "en": "Lucky Egg",
          "ja": "しあわせタマゴ",
          "ru": "Lucky Egg"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Incense.png",
        "quantity": 4,
        "name": {
          "cs": "Incense kadidlo",
          "en": "Incense",
          "ja": "おこう",
          "ru": "Ладан Incense"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Egg Incubator.png",
        "quantity": 4,
        "name": {
          "cs": "Inkubátor vajec",
          "en": "Egg Incubator",
          "ja": "ふかそうち",
          "ru": "Инкубатор яиц"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Revive.png",
        "quantity": 25,
        "name": {
          "cs": "Max Revive",
          "en": "Max Revive",
          "ja": "げんきのかたまり",
          "ru": "Max Revive"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Potion.png",
        "quantity": 50,
        "name": {
          "cs": "Max Potion",
          "en": "Max Potion",
          "ja": "まんたんのくすり",
          "ru": "Max Potion"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 60,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Pinap Berry.png",
        "quantity": 50,
        "name": {
          "cs": "Pinap Berry",
          "en": "Pinap Berry",
          "ja": "パイルのみ",
          "ru": "Pinap Berry"
        }
      }
    ]
  },
  {
    "level": 61,
    "xpRequired": 3350000,
    "totalXp": 37703000,
    "tier": "tier2",
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Lucky Egg.png",
        "quantity": 1,
        "name": {
          "cs": "Šťastné vejce Lucky Egg",
          "en": "Lucky Egg",
          "ja": "しあわせタマゴ",
          "ru": "Lucky Egg"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Potion.png",
        "quantity": 20,
        "name": {
          "cs": "Max Potion",
          "en": "Max Potion",
          "ja": "まんたんのくすり",
          "ru": "Max Potion"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 20,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Nanab Berry.png",
        "quantity": 15,
        "name": {
          "cs": "Nanab Berry",
          "en": "Nanab Berry",
          "ja": "ナナのみ",
          "ru": "Nanab Berry"
        }
      }
    ]
  },
  {
    "level": 62,
    "xpRequired": 3700000,
    "totalXp": 41403000,
    "tier": "tier2",
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Egg Incubator.png",
        "quantity": 1,
        "name": {
          "cs": "Inkubátor vajec",
          "en": "Egg Incubator",
          "ja": "ふかそうち",
          "ru": "Инкубатор яиц"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Revive.png",
        "quantity": 10,
        "name": {
          "cs": "Max Revive",
          "en": "Max Revive",
          "ja": "げんきのかたまり",
          "ru": "Max Revive"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 20,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Razz Berry.png",
        "quantity": 15,
        "name": {
          "cs": "Razz Berry",
          "en": "Razz Berry",
          "ja": "ズリのみ",
          "ru": "Razz Berry"
        }
      }
    ]
  },
  {
    "level": 63,
    "xpRequired": 4050000,
    "totalXp": 45453000,
    "tier": "tier2",
    "rewards": [
      {
        "type": "upgrade",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Gift Storage.png",
        "quantity": 5,
        "name": {
          "cs": "Rozšíření dárků +5",
          "en": "Gift Storage Upgrade +5",
          "ja": "ギフト所持枠拡張 +5",
          "ru": "Расширение хранилища подарков +5"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Potion.png",
        "quantity": 20,
        "name": {
          "cs": "Max Potion",
          "en": "Max Potion",
          "ja": "まんたんのくすり",
          "ru": "Max Potion"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 20,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Pinap Berry.png",
        "quantity": 15,
        "name": {
          "cs": "Pinap Berry",
          "en": "Pinap Berry",
          "ja": "パイルのみ",
          "ru": "Pinap Berry"
        }
      }
    ]
  },
  {
    "level": 64,
    "xpRequired": 4400000,
    "totalXp": 49853000,
    "tier": "tier2",
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Incense.png",
        "quantity": 1,
        "name": {
          "cs": "Incense kadidlo",
          "en": "Incense",
          "ja": "おこう",
          "ru": "Ладан Incense"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Revive.png",
        "quantity": 10,
        "name": {
          "cs": "Max Revive",
          "en": "Max Revive",
          "ja": "げんきのかたまり",
          "ru": "Max Revive"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 20,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Nanab Berry.png",
        "quantity": 15,
        "name": {
          "cs": "Nanab Berry",
          "en": "Nanab Berry",
          "ja": "ナナのみ",
          "ru": "Nanab Berry"
        }
      }
    ]
  },
  {
    "level": 65,
    "xpRequired": 4750000,
    "totalXp": 54603000,
    "tier": "tier2",
    "rewards": [
      {
        "type": "avatar",
        "iconUrl": "https://cdn.leekduck.com/assets/img/avatar_items/n_shirt_pokeballitems-ultra_0_icon.png",
        "quantity": 1,
        "name": {
          "cs": "Ultra Ball Bunda",
          "en": "Ultra Ball Jacket",
          "ja": "ハイパーボールジャケット",
          "ru": "Куртка Ultra Ball"
        }
      },
      {
        "type": "upgrade",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Item Storage.png",
        "quantity": 50,
        "name": {
          "cs": "Rozšíření batohu +50",
          "en": "Item Storage Upgrade +50",
          "ja": "バッグアップグレード +50",
          "ru": "Расширение рюкзака предметов +50"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Star Piece.png",
        "quantity": 3,
        "name": {
          "cs": "Star Piece hvězdný úlomek",
          "en": "Star Piece",
          "ja": "ほしのかけら",
          "ru": "Кусочек звезды Star Piece"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Lure Module.png",
        "quantity": 3,
        "name": {
          "cs": "Lure Modul",
          "en": "Lure Module",
          "ja": "ルアーモジュール",
          "ru": "Lure-модуль"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Egg Incubator.png",
        "quantity": 3,
        "name": {
          "cs": "Inkubátor vajec",
          "en": "Egg Incubator",
          "ja": "ふかそうち",
          "ru": "Инкубатор яиц"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Revive.png",
        "quantity": 15,
        "name": {
          "cs": "Max Revive",
          "en": "Max Revive",
          "ja": "げんきのかたまり",
          "ru": "Max Revive"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Potion.png",
        "quantity": 30,
        "name": {
          "cs": "Max Potion",
          "en": "Max Potion",
          "ja": "まんたんのくすり",
          "ru": "Max Potion"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 30,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Razz Berry.png",
        "quantity": 15,
        "name": {
          "cs": "Razz Berry",
          "en": "Razz Berry",
          "ja": "ズリのみ",
          "ru": "Razz Berry"
        }
      }
    ]
  },
  {
    "level": 66,
    "xpRequired": 5250000,
    "totalXp": 59853000,
    "tier": "tier2",
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Star Piece.png",
        "quantity": 1,
        "name": {
          "cs": "Star Piece hvězdný úlomek",
          "en": "Star Piece",
          "ja": "ほしのかけら",
          "ru": "Кусочек звезды Star Piece"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Potion.png",
        "quantity": 20,
        "name": {
          "cs": "Max Potion",
          "en": "Max Potion",
          "ja": "まんたんのくすり",
          "ru": "Max Potion"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 20,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Pinap Berry.png",
        "quantity": 15,
        "name": {
          "cs": "Pinap Berry",
          "en": "Pinap Berry",
          "ja": "パイルのみ",
          "ru": "Pinap Berry"
        }
      }
    ]
  },
  {
    "level": 67,
    "xpRequired": 5750000,
    "totalXp": 65603000,
    "tier": "tier2",
    "rewards": [
      {
        "type": "upgrade",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Postcard Storage.png",
        "quantity": 50,
        "name": {
          "cs": "Rozšíření alba pohlednic +50",
          "en": "Postcard Storage Upgrade +50",
          "ja": "ポストカード枠拡張 +50",
          "ru": "Расширение книги открыток +50"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Revive.png",
        "quantity": 10,
        "name": {
          "cs": "Max Revive",
          "en": "Max Revive",
          "ja": "げんきのかたまり",
          "ru": "Max Revive"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 20,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Nanab Berry.png",
        "quantity": 15,
        "name": {
          "cs": "Nanab Berry",
          "en": "Nanab Berry",
          "ja": "ナナのみ",
          "ru": "Nanab Berry"
        }
      }
    ]
  },
  {
    "level": 68,
    "xpRequired": 6250000,
    "totalXp": 71853000,
    "tier": "tier2",
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Egg Incubator.png",
        "quantity": 1,
        "name": {
          "cs": "Inkubátor vajec",
          "en": "Egg Incubator",
          "ja": "ふかそうち",
          "ru": "Инкубатор яиц"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Potion.png",
        "quantity": 20,
        "name": {
          "cs": "Max Potion",
          "en": "Max Potion",
          "ja": "まんたんのくすり",
          "ru": "Max Potion"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 20,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Razz Berry.png",
        "quantity": 15,
        "name": {
          "cs": "Razz Berry",
          "en": "Razz Berry",
          "ja": "ズリのみ",
          "ru": "Razz Berry"
        }
      }
    ]
  },
  {
    "level": 69,
    "xpRequired": 6750000,
    "totalXp": 78603000,
    "tier": "tier2",
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Lure Module.png",
        "quantity": 1,
        "name": {
          "cs": "Lure Modul",
          "en": "Lure Module",
          "ja": "ルアーモジュール",
          "ru": "Lure-модуль"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Revive.png",
        "quantity": 10,
        "name": {
          "cs": "Max Revive",
          "en": "Max Revive",
          "ja": "げんきのかたまり",
          "ru": "Max Revive"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 20,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Pinap Berry.png",
        "quantity": 15,
        "name": {
          "cs": "Pinap Berry",
          "en": "Pinap Berry",
          "ja": "パイルのみ",
          "ru": "Pinap Berry"
        }
      }
    ]
  },
  {
    "level": 70,
    "xpRequired": 7250000,
    "totalXp": 85853000,
    "tier": "tier2",
    "unlocks": [
      {
        "iconUrl": "https://cdn.leekduck.com/assets/img/icons/lucky_friend_chance_increase_icon.png",
        "title": {
          "cs": "Zvýšená šance na Lucky Friends",
          "en": "Lucky Friend Chance Increase",
          "ja": "キラフレンド確率アップ",
          "ru": "Повышенный шанс на Lucky Friends"
        },
        "description": {
          "cs": "Vyšší šance stát se Lucky Friends při každodenní interakci s Best Friends.",
          "en": "Permanently increases the daily odds of triggering Lucky Friends status.",
          "ja": "大親友との毎日最初のインタラクションでキラフレンドになる確率が上昇します。",
          "ru": "Постоянно повышенный шанс стать Lucky Friends с Best Friends."
        }
      }
    ],
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Master Ball.png",
        "quantity": 1,
        "name": {
          "cs": "Master Ball",
          "en": "Master Ball",
          "ja": "マスターボール",
          "ru": "Master Ball"
        }
      },
      {
        "type": "upgrade",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Item Storage.png",
        "quantity": 75,
        "name": {
          "cs": "Rozšíření batohu +50",
          "en": "Item Storage Upgrade +50",
          "ja": "バッグアップグレード +50",
          "ru": "Расширение рюкзака предметов +50"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Lucky Egg.png",
        "quantity": 6,
        "name": {
          "cs": "Šťastné vejce Lucky Egg",
          "en": "Lucky Egg",
          "ja": "しあわせタマゴ",
          "ru": "Lucky Egg"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Incense.png",
        "quantity": 6,
        "name": {
          "cs": "Incense kadidlo",
          "en": "Incense",
          "ja": "おこう",
          "ru": "Ладан Incense"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Super Incubator.png",
        "quantity": 3,
        "name": {
          "cs": "Super Inkubátor",
          "en": "Super Incubator",
          "ja": "スーパーふかそうち",
          "ru": "Супер-инкубатор"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Revive.png",
        "quantity": 25,
        "name": {
          "cs": "Max Revive",
          "en": "Max Revive",
          "ja": "げんきのかたまり",
          "ru": "Max Revive"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Potion.png",
        "quantity": 50,
        "name": {
          "cs": "Max Potion",
          "en": "Max Potion",
          "ja": "まんたんのくすり",
          "ru": "Max Potion"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 70,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Pinap Berry.png",
        "quantity": 60,
        "name": {
          "cs": "Pinap Berry",
          "en": "Pinap Berry",
          "ja": "パイルのみ",
          "ru": "Pinap Berry"
        }
      }
    ]
  },
  {
    "level": 71,
    "xpRequired": 8000000,
    "totalXp": 93853000,
    "tier": "tier3",
    "rewards": [
      {
        "type": "avatar",
        "iconUrl": "https://cdn.leekduck.com/assets/img/avatar_items/n_shoes_lvl71-cyberkicks_0_icon.png",
        "quantity": 1,
        "name": {
          "cs": "Exkluzivní boty Level 71",
          "en": "Level 71 Shoes",
          "ja": "レベル71限定シューズ",
          "ru": "Обувь 71 уровня"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Rare Candy XL.png",
        "quantity": 1,
        "name": {
          "cs": "Vzácné Candy XL",
          "en": "Rare Candy XL",
          "ja": "ふしぎなアメXL",
          "ru": "Rare Candy XL"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Premium Battle Pass.png",
        "quantity": 1,
        "name": {
          "cs": "Prémiový Battle Pass",
          "en": "Premium Battle Pass",
          "ja": "プレミアムバトルパス",
          "ru": "Премиум боевой пропуск"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Potion.png",
        "quantity": 20,
        "name": {
          "cs": "Max Potion",
          "en": "Max Potion",
          "ja": "まんたんのくすり",
          "ru": "Max Potion"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 30,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Nanab Berry.png",
        "quantity": 25,
        "name": {
          "cs": "Nanab Berry",
          "en": "Nanab Berry",
          "ja": "ナナのみ",
          "ru": "Nanab Berry"
        }
      }
    ],
    "tasks": [
      {
        "text": {
          "cs": "Získat 15 Platinových medailí",
          "en": "Earn 15 Platinum medals",
          "ja": "プラチナメダルを15個獲得する",
          "ru": "Получить 15 платиновых медалей"
        },
        "tip": {
          "cs": "Zaměřte se na základní typové medaile jako Normal, Flying nebo Poison a dokončení generace Kanto i Johto Pokédexu.",
          "en": "Focus on primary type medals (Normal, Flying, Poison) and Kanto/Johto dex completion.",
          "ja": "ノーマル、ひこう、どく等のタイプメダルやカントー・ジョウト図鑑メダルを優先しましょう。",
          "ru": "Сосредоточьтесь на базовых медалях типов и покедексах Канто и Джото."
        }
      },
      {
        "text": {
          "cs": "Posílit Legendárního nebo Mythical Pokémona 20×",
          "en": "Power up Legendary or Mythical Pokémon 20 times",
          "ja": "伝説または幻のポケモンを20回強化する",
          "ru": "Прокачать легендарного или мифического покемона 20 раз"
        },
        "tip": {
          "cs": "Investujte do silných útočníků jako Necrozma, Rayquaza, Dialga, Terrakion nebo Kartana.",
          "en": "Invest into top PvE/PvP meta legendaries like Necrozma, Rayquaza, Dialga, Terrakion, or Kartana.",
          "ja": "ネクロズマ、レックウザ、ディアルガ、テラキオン等の実用性の高い伝説ポケモンを強化しましょう。",
          "ru": "Вкладывайте ресурсы в мету: Necrozma, Rayquaza, Dialga, Terrakion или Kartana."
        }
      },
      {
        "text": {
          "cs": "Hodit 999× Nice hodů",
          "en": "Make 999 Nice Throws",
          "ja": "ナイススローを999回投げる",
          "ru": "Сделать 999 Nice бросков"
        },
        "tip": {
          "cs": "Nice hod má největší toleranci kruhu. Splníte zcela přirozeně během každodenního chytání.",
          "en": "Nice throws have the largest circle. Complete naturally during routine daily catching.",
          "ja": "最もサークルが大きい判定です。日々の捕獲ルーティンで自然にカウントが進みます。",
          "ru": "У Nice бросков самый большой круг. Выполняется естественным путем во время ловли."
        }
      },
      {
        "text": {
          "cs": "Chytit 100 Pokémonů během jednoho dne",
          "en": "Catch 100 Pokémon in a single day",
          "ja": "1日でポケモンを100匹捕まえる",
          "ru": "Поймать 100 покемонов за один день"
        },
        "tip": {
          "cs": "Ideální splnit během úterní Spotlight Hour od šesti do sedmi večer, při Community Day nebo s Daily Incense.",
          "en": "Best done during Tuesday Spotlight Hour, Community Day, or using Daily Incense & auto-catchers.",
          "ja": "火曜スポットライトアワー（18:00〜19:00）やコミュニティ・デイの参加で即日達成可能です。",
          "ru": "Идеально выполнять во время Spotlight Hour во вторник, Community Day или с Daily Incense."
        }
      }
    ]
  },
  {
    "level": 72,
    "xpRequired": 8750000,
    "totalXp": 102603000,
    "tier": "tier3",
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Rare Candy XL.png",
        "quantity": 1,
        "name": {
          "cs": "Vzácné Candy XL",
          "en": "Rare Candy XL",
          "ja": "ふしぎなアメXL",
          "ru": "Rare Candy XL"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Premium Battle Pass.png",
        "quantity": 1,
        "name": {
          "cs": "Prémiový Battle Pass",
          "en": "Premium Battle Pass",
          "ja": "プレミアムバトルパス",
          "ru": "Премиум боевой пропуск"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Lucky Egg.png",
        "quantity": 1,
        "name": {
          "cs": "Šťastné vejce Lucky Egg",
          "en": "Lucky Egg",
          "ja": "しあわせタマゴ",
          "ru": "Lucky Egg"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Revive.png",
        "quantity": 10,
        "name": {
          "cs": "Max Revive",
          "en": "Max Revive",
          "ja": "げんきのかたまり",
          "ru": "Max Revive"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 30,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Razz Berry.png",
        "quantity": 25,
        "name": {
          "cs": "Razz Berry",
          "en": "Razz Berry",
          "ja": "ズリのみ",
          "ru": "Razz Berry"
        }
      }
    ],
    "tasks": [
      {
        "text": {
          "cs": "Získat 20 Platinových medailí",
          "en": "Earn 20 Platinum medals",
          "ja": "プラチナメダルを20個獲得する",
          "ru": "Получить 20 платиновых медалей"
        },
        "tip": {
          "cs": "Doplňte další typové medaile jako Water, Grass, Bug a medaili Scientist za 2 000 evolucí.",
          "en": "Complete Water, Grass, Bug medals and Scientist (2,000 evolutions).",
          "ja": "みず、くさ、むしタイプや、進化2000回の「けんきゅういん」メダルを進めましょう。",
          "ru": "Закройте медали Water, Grass, Bug и медаль Scientist за 2000 эволюций."
        }
      },
      {
        "text": {
          "cs": "Projít Trasu 7 dní po sobě",
          "en": "Follow a Route 7 days in a row",
          "ja": "7日連続でルートを探索する",
          "ru": "Пройти маршрут 7 дней подряд"
        },
        "tip": {
          "cs": "Najděte si krátkou 500m trasu poblíž domova nebo práce a projděte ji jednou denně bez přerušení série.",
          "en": "Pick a short 500m route near home or work and walk it once daily without breaking the streak.",
          "ja": "自宅や通勤路の近くにある最短500mのルートを決め、毎日の日課に組み込みましょう。",
          "ru": "Найдите короткий 500м маршрут рядом с домом и проходите его раз в день без пропусков."
        }
      },
      {
        "text": {
          "cs": "Použít 200× super-efektivní Charged útok",
          "en": "Use 200 supereffective Charged Attacks",
          "ja": "効果はばつぐんだ！のスペシャルアタックを200回使う",
          "ru": "Использовать 200 супер-эффективных Charged атак"
        },
        "tip": {
          "cs": "Bojujte v tělocvičnách s bojovými pokémony proti normálním obráncům jako Blissey a Snorlax, případně trénujte v Master League.",
          "en": "Fight Gym defenders using Fighting types against Normal walls or spam training battles.",
          "ja": "ジム防衛のハピナス/カビゴン等に対してかくとうタイプで攻撃するか、リーダー特訓で稼ぎましょう。",
          "ru": "Атакуйте покемонов в гимах боевыми типами или фармите на тренировках с лидерами."
        }
      },
      {
        "text": {
          "cs": "Získat 1 000 000 Stardustu",
          "en": "Earn 1,000,000 Stardust",
          "ja": "ほしのすなを1,000,000獲得する",
          "ru": "Заработать 1 000 000 Stardust"
        },
        "tip": {
          "cs": "Aktivujte Star Piece během eventů s násobkem Stardustu a vybírejte odměny ze zápasů v GO Battle League.",
          "en": "Pop Star Pieces during 2×/3× Catch Stardust events and claim GBL end-of-set rewards.",
          "ja": "ほしのすな倍増イベント時に「ほしのかけら」を使い、GBLのリワードも回収しましょう。",
          "ru": "Включайте Star Piece во время ивентов с умножением пыли и забирайте награды GBL."
        }
      }
    ]
  },
  {
    "level": 73,
    "xpRequired": 9500000,
    "totalXp": 112103000,
    "tier": "tier3",
    "rewards": [
      {
        "type": "avatar",
        "iconUrl": "https://cdn.leekduck.com/assets/img/avatar_items/n_glasses_lvl73-visorspecs_0_icon.png",
        "quantity": 1,
        "name": {
          "cs": "Sluneční brýle Level 73",
          "en": "Level 73 Shades",
          "ja": "レベル73限定サングラス",
          "ru": "Очки 73 уровня"
        }
      },
      {
        "type": "upgrade",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Gift Storage.png",
        "quantity": 5,
        "name": {
          "cs": "Rozšíření dárků +5",
          "en": "Gift Storage Upgrade +5",
          "ja": "ギフト所持枠拡張 +5",
          "ru": "Расширение хранилища подарков +5"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Rare Candy XL.png",
        "quantity": 1,
        "name": {
          "cs": "Vzácné Candy XL",
          "en": "Rare Candy XL",
          "ja": "ふしぎなアメXL",
          "ru": "Rare Candy XL"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Premium Battle Pass.png",
        "quantity": 1,
        "name": {
          "cs": "Prémiový Battle Pass",
          "en": "Premium Battle Pass",
          "ja": "プレミアムバトルパス",
          "ru": "Премиум боевой пропуск"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Potion.png",
        "quantity": 20,
        "name": {
          "cs": "Max Potion",
          "en": "Max Potion",
          "ja": "まんたんのくすり",
          "ru": "Max Potion"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 30,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Pinap Berry.png",
        "quantity": 25,
        "name": {
          "cs": "Pinap Berry",
          "en": "Pinap Berry",
          "ja": "パイルのみ",
          "ru": "Pinap Berry"
        }
      }
    ],
    "tasks": [
      {
        "text": {
          "cs": "Získat 25 Platinových medailí",
          "en": "Earn 25 Platinum medals",
          "ja": "プラチナメダルを25個獲得する",
          "ru": "Получить 25 платиновых медалей"
        },
        "tip": {
          "cs": "Zaměřte se na Collector za 50 tisíc chycených, Backpacker za 50 tisíc otočení PokéStopů a Sightseer za 2 tisíce unikátních stopů.",
          "en": "Target Collector (50k catches), Backpacker (50k spins), and Sightseer (2k unique stops).",
          "ja": "コレクター（捕獲5万）、バックパッカー（ポケストップ5万）、エクスプローラーを進めましょう。",
          "ru": "Качайте Collector (50k ловли), Backpacker (50k спинов) и Sightseer."
        }
      },
      {
        "text": {
          "cs": "Očistit 100 Shadow Pokémonů",
          "en": "Purify 100 Shadow Pokémon",
          "ja": "シャドウポケモンを100匹リトレーンする",
          "ru": "Очистить 100 Shadow покемонов"
        },
        "tip": {
          "cs": "Čistěte výhradně levné pokémony za 1 000 Stardustu jako Zubat, Rattata, Pidgey, Magikarp, Weedle a Foongus pro maximální úsporu.",
          "en": "Only purify budget 1,000 Stardust shadows (Zubat, Rattata, Pidgey, Magikarp, Weedle, Foongus)!",
          "ja": "必ずすな消費1,000の軽量シャドウ（ズバット、コラッタ、ポッポ、コイキング等）を選んで節約！",
          "ru": "Очищайте только дешевых покемонов за 1000 пыли (Zubat, Rattata, Pidgey, Magikarp, Weedle)!"
        }
      },
      {
        "text": {
          "cs": "Posílit 3 Pokémony na maximální CP na Level 50",
          "en": "Power up 3 Pokémon to their max CP",
          "ja": "ポケモン3匹をCP上限（Lv50）まで強化する",
          "ru": "Прокачать 3 покемонов до максимума на Level 50"
        },
        "tip": {
          "cs": "Melmetal je z Mystery Boxu téměř zdarma. Dále skvěle poslouží Community Day pokémoni s bohatou zásobou Candy XL.",
          "en": "Melmetal is virtually free via Mystery Box! Also use past Community Day mons with surplus Candy XL.",
          "ja": "「ふしぎなはこ」のメルメタルならアメXLが無料で集まります！コミュデイ産もおすすめ。",
          "ru": "Melmetal из Mystery Box практически бесплатен! Также используйте покемонов с Community Day."
        }
      },
      {
        "text": {
          "cs": "Vyhrát 30 Raidů",
          "en": "Win 30 raids",
          "ja": "レイドバトルで30回勝利する",
          "ru": "Выиграть 30 рейдов"
        },
        "tip": {
          "cs": "Využijte středeční Raid Hour nebo víkendové akce s volnými pasy. Počítají se i rychlé sólo raidy první a třetí úrovně.",
          "en": "Take advantage of Wednesday Raid Hours and bonus pass weekends. 1★ and 3★ raids count!",
          "ja": "水曜レイドアワーや週末レイドイベントを活用。ソロで倒せる1★〜3★レイドでもOKです。",
          "ru": "Используйте Raid Hour по средам и рейдовые дни. Считаются даже легкие рейды 1★ и 3★."
        }
      }
    ]
  },
  {
    "level": 74,
    "xpRequired": 10250000,
    "totalXp": 122353000,
    "tier": "tier3",
    "rewards": [
      {
        "type": "upgrade",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Postcard Storage.png",
        "quantity": 50,
        "name": {
          "cs": "Rozšíření alba pohlednic +50",
          "en": "Postcard Storage Upgrade +50",
          "ja": "ポストカード枠拡張 +50",
          "ru": "Расширение книги открыток +50"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Rare Candy XL.png",
        "quantity": 1,
        "name": {
          "cs": "Vzácné Candy XL",
          "en": "Rare Candy XL",
          "ja": "ふしぎなアメXL",
          "ru": "Rare Candy XL"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Premium Battle Pass.png",
        "quantity": 1,
        "name": {
          "cs": "Prémiový Battle Pass",
          "en": "Premium Battle Pass",
          "ja": "プレミアムバトルパス",
          "ru": "Премиум боевой пропуск"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Egg Incubator.png",
        "quantity": 1,
        "name": {
          "cs": "Inkubátor vajec",
          "en": "Egg Incubator",
          "ja": "ふかそうち",
          "ru": "Инкубатор яиц"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Revive.png",
        "quantity": 10,
        "name": {
          "cs": "Max Revive",
          "en": "Max Revive",
          "ja": "げんきのかたまり",
          "ru": "Max Revive"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 30,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Nanab Berry.png",
        "quantity": 25,
        "name": {
          "cs": "Nanab Berry",
          "en": "Nanab Berry",
          "ja": "ナナのみ",
          "ru": "Nanab Berry"
        }
      }
    ],
    "tasks": [
      {
        "text": {
          "cs": "Získat 30 Platinových medailí",
          "en": "Earn 30 Platinum medals",
          "ja": "プラチナメダルを30個獲得する",
          "ru": "Получить 30 платиновых медалей"
        },
        "tip": {
          "cs": "Dokončete medaile Cameraman za 400 fotobomb, Idol za 20 Best Friends a Picnicker za 2 500 úlovků z Lure Modulů.",
          "en": "Finish Cameraman (400 photobombs), Idol (20 Best Friends), and Picnicker (2.5k from Lures).",
          "ja": "カメラマン（400回）、アイドル（大親友20人）、ピクニックガール（ルアー2500匹）を達成。",
          "ru": "Закройте Cameraman (400 фотобомб), Idol (20 Best Friends) и Picnicker."
        }
      },
      {
        "text": {
          "cs": "Vylepšit Max Move útok 20×",
          "en": "Level up a Max Move 20 times",
          "ja": "マックスわざを20回レベルアップする",
          "ru": "Улучшить Max Move атаку 20 раз"
        },
        "tip": {
          "cs": "Vylepšujte útoky u běžných Dynamax Pokémonů jako Wooloo nebo Skwovet, kde stačí minimum částic a běžných Candy.",
          "en": "Upgrade moves on cheap Dynamax species (Wooloo, Skwovet) to minimize Max Particle and Candy costs.",
          "ja": "ウールーやホシガリスなどコストの低いダイマックスポケモンの技を優先して強化しましょう。",
          "ru": "Качайте атаки дешевых Dynamax покемонов (Wooloo, Skwovet), чтобы тратить меньше ресурсов."
        }
      },
      {
        "text": {
          "cs": "Nachoďte 200 km",
          "en": "Explore 200 km",
          "ja": "200 km探索する",
          "ru": "Пройти 200 км"
        },
        "tip": {
          "cs": "Ujistěte se, že máte v nastavení hry povolený Adventure Sync pro započtení každého kroku s telefonem v kapse.",
          "en": "Verify Adventure Sync is turned on in settings to register background walking all day.",
          "ja": "いつでも冒険モードをONにしておけば、アプリ起動外の通勤・通学でも着実に距離が伸びます。",
          "ru": "Включите Adventure Sync в настройках игры, чтобы километры засчитывались в фоне."
        }
      },
      {
        "text": {
          "cs": "Splnit 250 Field Research úkolů",
          "en": "Complete 250 Field Research tasks",
          "ja": "フィールドリサーチタスクを250回達成する",
          "ru": "Выполнить 250 заданий Field Research"
        },
        "tip": {
          "cs": "Mažte zdlouhavé úkoly a točte nové PokéStopy pro bleskové úkoly na házení míčků a krmení bobulí.",
          "en": "Trash tedious tasks and spin fresh stops. Target quick throw and berry feeding objectives.",
          "ja": "時間のかかるタスクは捨て、ナイススローやきのみ使用など数分で終わるタスクを集中的に回しましょう。",
          "ru": "Удаляйте долгие квесты и ищите быстрые задания на броски или кормление ягод."
        }
      }
    ]
  },
  {
    "level": 75,
    "xpRequired": 11000000,
    "totalXp": 133353000,
    "tier": "tier3",
    "rewards": [
      {
        "type": "avatar",
        "iconUrl": "https://cdn.leekduck.com/assets/img/avatar_items/n_pants_lvl75-techtrousers_0_icon.png",
        "quantity": 1,
        "name": {
          "cs": "Exkluzivní kalhoty Level 75",
          "en": "Level 75 Pants",
          "ja": "レベル75限定パンツ",
          "ru": "Штаны 75 уровня"
        }
      },
      {
        "type": "upgrade",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Pokemon Storage.png",
        "quantity": 25,
        "name": {
          "cs": "Rozšíření úložiště Pokémonů +50",
          "en": "Pokémon Storage Upgrade +50",
          "ja": "ポケモンボックスアップグレード +50",
          "ru": "Расширение хранилища покемонов +50"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Particle Pack.png",
        "quantity": 1,
        "name": {
          "cs": "Balíček Max částic",
          "en": "Max Particle Pack",
          "ja": "マックス粒子パック",
          "ru": "Пакет Макс-частиц"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Star Piece.png",
        "quantity": 5,
        "name": {
          "cs": "Star Piece hvězdný úlomek",
          "en": "Star Piece",
          "ja": "ほしのかけら",
          "ru": "Кусочек звезды Star Piece"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Lure Module.png",
        "quantity": 5,
        "name": {
          "cs": "Lure Modul",
          "en": "Lure Module",
          "ja": "ルアーモジュール",
          "ru": "Lure-модуль"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Super Incubator.png",
        "quantity": 2,
        "name": {
          "cs": "Super Inkubátor",
          "en": "Super Incubator",
          "ja": "スーパーふかそうち",
          "ru": "Супер-инкубатор"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Revive.png",
        "quantity": 15,
        "name": {
          "cs": "Max Revive",
          "en": "Max Revive",
          "ja": "げんきのかたまり",
          "ru": "Max Revive"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 50,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Potion.png",
        "quantity": 30,
        "name": {
          "cs": "Max Potion",
          "en": "Max Potion",
          "ja": "まんたんのくすり",
          "ru": "Max Potion"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Razz Berry.png",
        "quantity": 35,
        "name": {
          "cs": "Razz Berry",
          "en": "Razz Berry",
          "ja": "ズリのみ",
          "ru": "Razz Berry"
        }
      }
    ],
    "tasks": [
      {
        "text": {
          "cs": "Získat 34 Platinových medailí",
          "en": "Earn 34 Platinum medals",
          "ja": "プラチナメダルを34個獲得する",
          "ru": "Получить 34 платиновые медали"
        },
        "tip": {
          "cs": "Pracujte na medaili Jogger za 10 tisíc km, Battle Girl za 4 tisíce výher v tělocvičnách a Ace Trainer za 2 tisíce tréninků s lídry.",
          "en": "Work on Jogger (10k km), Battle Girl (4k gym wins), and Ace Trainer (2k leader trainings).",
          "ja": "ジョギング（1万km）、バトルガール（ジム4千勝）、エリートトレーナー（特訓2千回）を狙います。",
          "ru": "Прокачивайте Jogger, Battle Girl и Ace Trainer."
        }
      },
      {
        "text": {
          "cs": "Vylíhnout 75 vajec",
          "en": "Hatch 75 Eggs",
          "ja": "タマゴを75個孵化させる",
          "ru": "Высидеть 75 яиц"
        },
        "tip": {
          "cs": "Využijte eventy se sníženou vzdáleností líhnutí a přednostně líhněte zelená 2km vejce.",
          "en": "Prioritize green 2km eggs and hatch events with reduced incubation distance.",
          "ja": "孵化距離半減イベントや2kmタマゴを優先してスーパーふかそうちを活用しましょう。",
          "ru": "Ставьте зеленые яйца на 2 км и используйте ивенты с уполовиненной дистанцией."
        }
      },
      {
        "text": {
          "cs": "Hodit 999× Great hodů",
          "en": "Make 999 Great Throws",
          "ja": "グレートスローを999回投げる",
          "ru": "Сделать 999 Great бросков"
        },
        "tip": {
          "cs": "Házejte zakřivené Curve bally na Pokémony s velkým kruhem jako Slowpoke, Ponyta, Snorlax nebo Wailmer.",
          "en": "Throw Curveballs at species with large rings like Slowpoke, Ponyta, Snorlax, and Wailmer.",
          "ja": "ヤドン、ポニータ、カビゴン、ホエルコ等のサークルが大きいポケモンを重点的に狙いましょう。",
          "ru": "Бросайте Curveball в покемонов с большими кольцами: Slowpoke, Ponyta, Snorlax, Wailmer."
        }
      },
      {
        "text": {
          "cs": "Poslat 500 Dárků přátelům",
          "en": "Send 500 Gifts to friends",
          "ja": "フレンドにギフトを500個贈る",
          "ru": "Отправить 500 подарков друзьям"
        },
        "tip": {
          "cs": "Udržujte aktivní Friend list až se čtyřmi sty přáteli. Denně můžete odeslat přes 100 dárků při aktivních procházkách.",
          "en": "Maintain an active friend roster. You can send up to 100+ gifts daily by spinning stops.",
          "ja": "アクティブなフレンドを増やし、毎日ポケストップからギフトを回収して上限まで配りましょう。",
          "ru": "Держите активный список друзей. При прогулках можно отсылать 100+ подарков в день."
        }
      }
    ]
  },
  {
    "level": 76,
    "xpRequired": 12000000,
    "totalXp": 145353000,
    "tier": "tier3",
    "rewards": [
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Rare Candy XL.png",
        "quantity": 1,
        "name": {
          "cs": "Vzácné Candy XL",
          "en": "Rare Candy XL",
          "ja": "ふしぎなアメXL",
          "ru": "Rare Candy XL"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Premium Battle Pass.png",
        "quantity": 1,
        "name": {
          "cs": "Prémiový Battle Pass",
          "en": "Premium Battle Pass",
          "ja": "プレミアムバトルパス",
          "ru": "Премиум боевой пропуск"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Lucky Egg.png",
        "quantity": 1,
        "name": {
          "cs": "Šťastné vejce Lucky Egg",
          "en": "Lucky Egg",
          "ja": "しあわせタマゴ",
          "ru": "Lucky Egg"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Potion.png",
        "quantity": 20,
        "name": {
          "cs": "Max Potion",
          "en": "Max Potion",
          "ja": "まんたんのくすり",
          "ru": "Max Potion"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 30,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Pinap Berry.png",
        "quantity": 25,
        "name": {
          "cs": "Pinap Berry",
          "en": "Pinap Berry",
          "ja": "パイルのみ",
          "ru": "Pinap Berry"
        }
      }
    ],
    "tasks": [
      {
        "text": {
          "cs": "Získat 38 Platinových medailí",
          "en": "Earn 38 Platinum medals",
          "ja": "プラチナメダルを38個獲得する",
          "ru": "Получить 38 платиновых медалей"
        },
        "tip": {
          "cs": "Dokončete medaile Purifier za 1 000 očištěných, Hero za 2 000 Rocket Gruntů a Champion za 1 000 raidů.",
          "en": "Finish Purifier (1,000 purified), Hero (2,000 Grunts), and Champion (1,000 raids).",
          "ja": "リトレーナー（1千匹）、ヒーロー（したっぱ2千回）、チャンピオン（レイド1千勝）を進めましょう。",
          "ru": "Закройте Purifier (1000 очищений), Hero (2000 пешек Ракеты) и Champion (1000 рейдов)."
        }
      },
      {
        "text": {
          "cs": "Porazit 100 poskoků Team GO Rocket Gruntů",
          "en": "Defeat 100 Team GO Rocket Grunts",
          "ja": "GOロケット団したっぱに100回勝利する",
          "ru": "Победить 100 пешек Team GO Rocket"
        },
        "tip": {
          "cs": "Během akcí Rocket Takeover se balónky objevují každé dvě až tři hodiny. Rychlý bojový tým to zvládne za chvíli.",
          "en": "Take advantage of Rocket Takeover events where balloons spawn every 2-3 hours.",
          "ja": "ロケット団占拠イベント期間中なら気球が頻繁に出現するため数日で達成できます。",
          "ru": "Во время Rocket Takeover воздушные шары прилетают каждые 2-3 часа. Соберите быструю пачку."
        }
      },
      {
        "text": {
          "cs": "Nachoďte 300 km",
          "en": "Explore 300 km",
          "ja": "300 km探索する",
          "ru": "Пройти 300 км"
        },
        "tip": {
          "cs": "Průběžná chůze s aktivním Adventure Sync. Zabere zhruba 3 až 4 týdny aktivního pohybu při 75 až 100 km za týden.",
          "en": "Consistent walking with Adventure Sync. Takes approximately 3-4 weeks at 75-100 km/week.",
          "ja": "いつでも冒険モードで週75〜100kmをキープすれば3〜4週間で自然にクリアできます。",
          "ru": "Ходьба с включенным Adventure Sync. Занимает около 3-4 недель при 75-100 км в неделю."
        }
      },
      {
        "text": {
          "cs": "Chytit 200 Pokémonů během jednoho dne",
          "en": "Catch 200 Pokémon in a single day",
          "ja": "1日でポケモンを200匹捕まえる",
          "ru": "Поймать 200 покемонов за один день"
        },
        "tip": {
          "cs": "Naplánujte na tříhodinový víkendový Community Day a použijte techniku rychlého chytání Quick Catch nebo auto-catcher.",
          "en": "Schedule for Community Day (2-5 PM). Use Fast Catch technique or an auto-catcher device.",
          "ja": "3時間のコミュニティ・デイに参加し、「ファストキャッチ（捕獲スキップ）」を使えば余裕で達成！",
          "ru": "Запланируйте на 3-часовой Community Day. Используйте Fast Catch трюк или авто-кэтчер."
        }
      }
    ]
  },
  {
    "level": 77,
    "xpRequired": 13000000,
    "totalXp": 158353000,
    "tier": "tier3",
    "rewards": [
      {
        "type": "avatar",
        "iconUrl": "https://cdn.leekduck.com/assets/img/avatar_items/n_pose_lvl77_icon.png",
        "quantity": 1,
        "name": {
          "cs": "Exkluzivní póza avatara Level 77",
          "en": "Level 77 Pose",
          "ja": "レベル77限定ポーズ",
          "ru": "Поза аватара 77 уровня"
        }
      },
      {
        "type": "upgrade",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Postcard Storage.png",
        "quantity": 50,
        "name": {
          "cs": "Rozšíření alba pohlednic +50",
          "en": "Postcard Storage Upgrade +50",
          "ja": "ポストカード枠拡張 +50",
          "ru": "Расширение книги открыток +50"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Rare Candy XL.png",
        "quantity": 1,
        "name": {
          "cs": "Vzácné Candy XL",
          "en": "Rare Candy XL",
          "ja": "ふしぎなアメXL",
          "ru": "Rare Candy XL"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Premium Battle Pass.png",
        "quantity": 1,
        "name": {
          "cs": "Prémiový Battle Pass",
          "en": "Premium Battle Pass",
          "ja": "プレミアムバトルパス",
          "ru": "Премиум боевой пропуск"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Egg Incubator.png",
        "quantity": 1,
        "name": {
          "cs": "Inkubátor vajec",
          "en": "Egg Incubator",
          "ja": "ふかそうち",
          "ru": "Инкубатор яиц"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Revive.png",
        "quantity": 10,
        "name": {
          "cs": "Max Revive",
          "en": "Max Revive",
          "ja": "げんきのかたまり",
          "ru": "Max Revive"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 30,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Nanab Berry.png",
        "quantity": 25,
        "name": {
          "cs": "Nanab Berry",
          "en": "Nanab Berry",
          "ja": "ナナのみ",
          "ru": "Nanab Berry"
        }
      }
    ],
    "tasks": [
      {
        "text": {
          "cs": "Mít 41 Platinových medailí",
          "en": "Have 41 Platinum medals",
          "ja": "プラチナメダルを41個所持する",
          "ru": "Иметь 41 платиновую медаль"
        },
        "tip": {
          "cs": "Zaměřte se na Battle Legend za 1 000 legendárních raidů, Rising Star za 150 druhů bossů a Gym Leader za 15 tisíc hodin obrany.",
          "en": "Pursue Battle Legend (1k legendary raids), Rising Star (150 boss species), and Gym Leader (15k hours).",
          "ja": "バトルレジェンド（伝説1千勝）、ライジングスター（150種撃破）、ジムリーダーを推進。",
          "ru": "Качайте Battle Legend, Rising Star и Gym Leader."
        }
      },
      {
        "text": {
          "cs": "Posílit 7 Pokémonů na maximální CP na Level 50",
          "en": "Power up 7 Pokémon to their max CP",
          "ja": "ポケモン7匹をCP上限（Lv50）まで強化する",
          "ru": "Прокачать 7 покемонов до максимума на Level 50"
        },
        "tip": {
          "cs": "Využijte Pokémony z Community Day jako Machamp, Garchomp, Tyranitar nebo Rhyperior a také Melmetala pro levný Level 50.",
          "en": "Leverage Community Day staples with ample Candy XL along with free Melmetal Mystery Boxes.",
          "ja": "メルメタルに加え、ガブリアス、バンギラス、カイリキーなどアメXLが余っているポケモンをLv50に。",
          "ru": "Используйте покемонов с Community Day: Machamp, Garchomp, Tyranitar и Melmetal."
        }
      },
      {
        "text": {
          "cs": "Vyhrát 100 Max Battles",
          "en": "Win 100 Max Battles",
          "ja": "マックスバトルで100回勝利する",
          "ru": "Выиграть 100 Max Battles"
        },
        "tip": {
          "cs": "Bojujte v nenáročných 1★ Max Battles u Power Spotů. Stojí pouhých 250 Max částic a každá bitva zabere jen pár vteřin sólo.",
          "en": "Solo quick 1★ Max Battles at Power Spots costing only 250 Max Particles.",
          "ja": "粒子消費がわずか250でソロ討伐できる1★マックスバトル（ウールー等）を数多くこなしましょう。",
          "ru": "Проходите 1★ Max Battles на Power Spots: стоят всего 250 частиц и закрываются за секунды."
        }
      },
      {
        "text": {
          "cs": "Provést 10 výměn Pokémonů chycených alespoň 300 km od sebe",
          "en": "Make 10 trades with Pokémon caught at least 300 km apart",
          "ja": "300km以上離れた場所で捕まえたポケモンを10回交換する",
          "ru": "Совершить 10 обменов покемонами с дистанцией от 300 км"
        },
        "tip": {
          "cs": "Líhněte 7km vejce z dárků od zahraničních přátel z druhého konce světa a vyměňte je s místním kamarádem.",
          "en": "Hatch 7km gift eggs received from overseas international friends, then trade locally!",
          "ja": "海外のフレンドから貰ったギフトの7kmタマゴを孵化させ、地元のフレンドと交換すれば即完了！",
          "ru": "Высиживайте 7км яйца из подарков зарубежных друзей и обменивайте их с местным тренером!"
        }
      }
    ]
  },
  {
    "level": 78,
    "xpRequired": 14000000,
    "totalXp": 172353000,
    "tier": "tier3",
    "rewards": [
      {
        "type": "upgrade",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Pokemon Storage.png",
        "quantity": 75,
        "name": {
          "cs": "Rozšíření úložiště Pokémonů +50",
          "en": "Pokémon Storage Upgrade +50",
          "ja": "ポケモンボックスアップグレード +50",
          "ru": "Расширение хранилища покемонов +50"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Rare Candy XL.png",
        "quantity": 1,
        "name": {
          "cs": "Vzácné Candy XL",
          "en": "Rare Candy XL",
          "ja": "ふしぎなアメXL",
          "ru": "Rare Candy XL"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Premium Battle Pass.png",
        "quantity": 1,
        "name": {
          "cs": "Prémiový Battle Pass",
          "en": "Premium Battle Pass",
          "ja": "プレミアムバトルパス",
          "ru": "Премиум боевой пропуск"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Potion.png",
        "quantity": 20,
        "name": {
          "cs": "Max Potion",
          "en": "Max Potion",
          "ja": "まんたんのくすり",
          "ru": "Max Potion"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 30,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Razz Berry.png",
        "quantity": 25,
        "name": {
          "cs": "Razz Berry",
          "en": "Razz Berry",
          "ja": "ズリのみ",
          "ru": "Razz Berry"
        }
      }
    ],
    "tasks": [
      {
        "text": {
          "cs": "Mít 44 Platinových medailí",
          "en": "Have 44 Platinum medals",
          "ja": "プラチナメダルを44個所持する",
          "ru": "Иметь 44 платиновые медали"
        },
        "tip": {
          "cs": "Doplňte zbývající regionální Pokédexy jako Hoenn, Sinnoh nebo Unova a medaili Ultra Hero za 50 výher nad Giovannim.",
          "en": "Focus on regional Pokédexes (Hoenn, Sinnoh, Unova) and Ultra Hero (50 Giovanni defeats).",
          "ja": "ホウエン、シンオウ、イッシュ等の図鑑メダルや、サカキ討伐のウルトラヒーローを進めます。",
          "ru": "Добейте покедексы регионов Hoenn, Sinnoh, Unova и медаль Ultra Hero за победы над Джованни."
        }
      },
      {
        "text": {
          "cs": "Získat 400 srdíček s Buddy Pokémonem",
          "en": "Earn 400 hearts with your buddy",
          "ja": "相棒のハートポイントを400個獲得する",
          "ru": "Заработать 400 сердец с напарником"
        },
        "tip": {
          "cs": "Rychlý trik s rotací: Vyměňte až 20 různých buddies denně. Každého nakrmte třemi bobulemi, pohlaďte a vyfoťte. To dává 3 srdce × 20 buddies = 60 srdcí denně bez jediného kroku chůze.",
          "en": "⚡ Buddy Rotation Trick: Swap up to 20 buddies daily! Feed, pet, and photo each for 3 hearts = 60 hearts/day with zero walking!",
          "ja": "⚡ 相棒交代裏技：1日20回相棒を交代し、おやつ・撫でる・写真で各3個＝歩かずに1日60個のハートを量産可能！",
          "ru": "⚡ Трюк со сменой бадди: меняйте до 20 напарников в день! Еда, ласка и фото дают 3 сердца × 20 = 60 сердец в день без ходьбы!"
        }
      },
      {
        "text": {
          "cs": "Nachoďte 400 km",
          "en": "Explore 400 km",
          "ja": "400 km探索する",
          "ru": "Пройти 400 км"
        },
        "tip": {
          "cs": "Pravidelný pohyb s Adventure Sync. Synchronizujte kroky přes Apple Health nebo Google Fit před každým spuštěním hry.",
          "en": "Routine movement with Adventure Sync. Sync Google Fit / Apple Health before opening the app.",
          "ja": "日々の散歩とヘルスケア連携でいつでも冒険モードの歩数を確実にゲームへ反映させましょう。",
          "ru": "Регулярная ходьба с Adventure Sync. Синхронизируйте шаги через Apple Health / Google Fit."
        }
      },
      {
        "text": {
          "cs": "Splnit 500 Field Research úkolů",
          "en": "Complete 500 Field Research tasks",
          "ja": "フィールドリサーチタスクを500回達成する",
          "ru": "Выполнить 500 заданий Field Research"
        },
        "tip": {
          "cs": "Během velkých tematických akcí nabízejí PokéStopy velmi jednoduché eventové úkoly, které vyřídíte během pár minut.",
          "en": "Farm event-themed tasks during festivals which are designed to be completed in seconds.",
          "ja": "イベント限定のフィールドリサーチは「5匹捕獲」など達成が非常に簡単なものが多いため狙い目です。",
          "ru": "Во время ивентов берите тематические задания: они выполняются за пару минут."
        }
      }
    ]
  },
  {
    "level": 79,
    "xpRequired": 15000000,
    "totalXp": 187353000,
    "tier": "tier3",
    "rewards": [
      {
        "type": "avatar",
        "iconUrl": "https://cdn.leekduck.com/assets/img/avatar_items/n_hair_lvl79-synthfade_0_icon.png",
        "quantity": 1,
        "name": {
          "cs": "Krátký účes Level 79",
          "en": "Level 79 Hairstyle (Short)",
          "ja": "レベル79限定ヘアスタイル（ショート）",
          "ru": "Прическа (короткая) 79 уровня"
        }
      },
      {
        "type": "avatar",
        "iconUrl": "https://cdn.leekduck.com/assets/img/avatar_items/n_hair_lvl79-urbanphantom_0_icon.png",
        "quantity": 1,
        "name": {
          "cs": "Dlouhý účes Level 79",
          "en": "Level 79 Hairstyle (Long)",
          "ja": "レベル79限定ヘアスタイル（ロング）",
          "ru": "Прическа (длинная) 79 уровня"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Rare Candy XL.png",
        "quantity": 1,
        "name": {
          "cs": "Vzácné Candy XL",
          "en": "Rare Candy XL",
          "ja": "ふしぎなアメXL",
          "ru": "Rare Candy XL"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Premium Battle Pass.png",
        "quantity": 1,
        "name": {
          "cs": "Prémiový Battle Pass",
          "en": "Premium Battle Pass",
          "ja": "プレミアムバトルパス",
          "ru": "Премиум боевой пропуск"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Revive.png",
        "quantity": 10,
        "name": {
          "cs": "Max Revive",
          "en": "Max Revive",
          "ja": "げんきのかたまり",
          "ru": "Max Revive"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 30,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Pinap Berry.png",
        "quantity": 25,
        "name": {
          "cs": "Pinap Berry",
          "en": "Pinap Berry",
          "ja": "パイルのみ",
          "ru": "Pinap Berry"
        }
      }
    ],
    "tasks": [
      {
        "text": {
          "cs": "Mít 47 Platinových medailí",
          "en": "Have 47 Platinum medals",
          "ja": "プラチナメダルを47個所持する",
          "ru": "Иметь 47 платиновых медалей"
        },
        "tip": {
          "cs": "Předposlední milník před levelem 80. Zkontrolujte svůj seznam medailí a soustřeďte se na ty nejblíže zlatu či platině.",
          "en": "Penultimate tier before level 80! Review medal progress and prioritize whichever is closest to gold/platinum.",
          "ja": "レベル80目前の壁！手持ちのメダル一覧を確認し、最もプラチナに近いものを厳選して追い込みましょう。",
          "ru": "Предпоследний шаг до 80 уровня! Проверьте список медалей и закройте ближайшие к платине."
        }
      },
      {
        "text": {
          "cs": "Porazit lídra Team GO Rocket Cliffa, Sierru nebo Arla 30×",
          "en": "Defeat a Team GO Rocket Leader 30 times",
          "ja": "GOロケット団リーダー（クリフ/シエラ/アルロ）に30回勝利する",
          "ru": "Победить лидеров Team GO Rocket 30 раз"
        },
        "tip": {
          "cs": "Znamená to porazit 180 řadových poskoků, kde každých 6 poskoků sestaví Rocket Radar, nebo využít Radary ze speciálních výzkumů.",
          "en": "Requires defeating 180 Grunts (6 per Radar) or stockpiling Rocket Radars from special research.",
          "ja": "180人のしたっぱ撃破（レーダー30個分）が必要です。ロケット団占拠イベントで集中攻略しましょう。",
          "ru": "Требуется победить 180 пешек (по 6 на радар) или запастись радарами из спец-квестов."
        }
      },
      {
        "text": {
          "cs": "Vylíhnout 100 vajec",
          "en": "Hatch 100 Eggs",
          "ja": "タマゴを100個孵化させる",
          "ru": "Высидеть 100 яиц"
        },
        "tip": {
          "cs": "Nasaďte Super Inkubátory do všech volných slotů během Community Day s bonusem na čtvrtinovou líhnicí vzdálenost.",
          "en": "Run Super Incubators across all 9-12 slots during 1/4 Hatch Distance Community Days.",
          "ja": "孵化距離1/4ボーナスが付くコミュニティ・デイに合わせて一気にスーパー孵化装置を回しましょう。",
          "ru": "Используйте супер-инкубаторы на все слоты во время Community Day с дистанцией 1/4."
        }
      },
      {
        "text": {
          "cs": "Získat 50 Lucky Pokémonů při výměnách",
          "en": "Obtain 50 Lucky Pokémon in trades",
          "ja": "トレードでキラポケモンを50匹手に入れる",
          "ru": "Получить 50 Lucky покемонов при обмене"
        },
        "tip": {
          "cs": "Provádějte s kamarádem maximální denní limit 100 běžných výměn. Přirozená 5% šance přináší v průměru 5 Lucky Pokémonů denně. Starší odchyty z let 2016 až 2018 dávají garantovaný Lucky výsledek.",
          "en": "Trade the daily maximum of 100 regular Pokémon with a local friend (~5% random lucky rate = ~5 Lucky daily). 2016-2018 catches offer guaranteed Lucky status.",
          "ja": "毎日上限100匹の相互交換（自然キラ確率約5%＝1日平均5匹）を行えば10日程度で達成できます！2016〜2018年産なら確定キラ。",
          "ru": "Делайте по 100 обменов в день с другом (базовый шанс ~5% = ~5 Lucky в день). Покемоны 2016–2018 годов дают 100% гарантию Lucky!"
        }
      }
    ]
  },
  {
    "level": 80,
    "xpRequired": 16000000,
    "totalXp": 203353000,
    "tier": "tier3",
    "rewards": [
      {
        "type": "avatar",
        "iconUrl": "https://cdn.leekduck.com/assets/img/avatar_items/n_shirt_lvl80-circuitjacket_0_icon.png",
        "quantity": 1,
        "name": {
          "cs": "Bunda Level 80 Circuit Master",
          "en": "Level 80 Jacket",
          "ja": "レベル80限定ジャケット",
          "ru": "Куртка Мастера 80 уровня"
        }
      },
      {
        "type": "upgrade",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Pokemon Storage.png",
        "quantity": 100,
        "name": {
          "cs": "Rozšíření úložiště Pokémonů +50",
          "en": "Pokémon Storage Upgrade +50",
          "ja": "ポケモンボックスアップグレード +50",
          "ru": "Расширение хранилища покемонов +50"
        }
      },
      {
        "type": "upgrade",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Item Storage.png",
        "quantity": 100,
        "name": {
          "cs": "Rozšíření batohu +50",
          "en": "Item Storage Upgrade +50",
          "ja": "バッグアップグレード +50",
          "ru": "Расширение рюкзака предметов +50"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Mushroom.png",
        "quantity": 1,
        "name": {
          "cs": "Max Mushroom",
          "en": "Max Mushroom",
          "ja": "ダイキノコ",
          "ru": "Max Mushroom"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Lucky Egg.png",
        "quantity": 7,
        "name": {
          "cs": "Šťastné vejce Lucky Egg",
          "en": "Lucky Egg",
          "ja": "しあわせタマゴ",
          "ru": "Lucky Egg"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Incense.png",
        "quantity": 7,
        "name": {
          "cs": "Incense kadidlo",
          "en": "Incense",
          "ja": "おこう",
          "ru": "Ладан Incense"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Super Incubator.png",
        "quantity": 5,
        "name": {
          "cs": "Super Inkubátor",
          "en": "Super Incubator",
          "ja": "スーパーふかそうち",
          "ru": "Супер-инкубатор"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Revive.png",
        "quantity": 25,
        "name": {
          "cs": "Max Revive",
          "en": "Max Revive",
          "ja": "げんきのかたまり",
          "ru": "Max Revive"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Max Potion.png",
        "quantity": 50,
        "name": {
          "cs": "Max Potion",
          "en": "Max Potion",
          "ja": "まんたんのくすり",
          "ru": "Max Potion"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Ultra Ball.png",
        "quantity": 80,
        "name": {
          "cs": "Ultra Ball",
          "en": "Ultra Ball",
          "ja": "ハイパーボール",
          "ru": "Ultra Ball"
        }
      },
      {
        "type": "item",
        "iconUrl": "https://cdn.leekduck.com/assets/img/items/Pinap Berry.png",
        "quantity": 70,
        "name": {
          "cs": "Pinap Berry",
          "en": "Pinap Berry",
          "ja": "パイルのみ",
          "ru": "Pinap Berry"
        }
      }
    ],
    "tasks": [
      {
        "text": {
          "cs": "Získat 50 Platinových medailí pro finální milník",
          "en": "Earn 50 Platinum medals (Ultimate Milestone)",
          "ja": "プラチナメダルを50個獲得する（究極の到達点）",
          "ru": "Получить 50 платиновых медалей (Финальный рубеж)"
        },
        "tip": {
          "cs": "Největší zkouška v historii Pokémon GO. Prostudujte si náš přehled doporučených medailí a blueprint níže v článku.",
          "en": "The greatest badge challenge in Pokémon GO. Consult our curated fastest medals blueprint below.",
          "ja": "ポケモンGO史上最高峰の試練。本記事下部の「おすすめプラチナメダル攻略ガイド」を熟読してください。",
          "ru": "Главный вызов в Pokémon GO. Ознакомьтесь с нашим гайдом по быстрейшим медалям ниже."
        }
      },
      {
        "text": {
          "cs": "Vyhrát 80 zápasů v GO Battle League",
          "en": "Win 80 battles in the GO Battle League",
          "ja": "GOバトルリーグで80回勝利する",
          "ru": "Выиграть 80 битв в GO Battle League"
        },
        "tip": {
          "cs": "Hrajte během GO Battle víkendů s limitem až 20 setů za den. Při nižším hodnocení mezi Rank 1 až 15 jsou výhry velmi snadné.",
          "en": "Play during GO Battle Weekends (up to 20 sets/day). Battles are vastly easier at lower rating/ranks.",
          "ja": "GOバトルウィークエンド（1日最大20セット）や、ランク1〜15の比較的勝ちやすい帯で稼ぎましょう。",
          "ru": "Играйте во время GO Battle Weekend (до 20 сетов в день). На низких рангах побеждать намного легче."
        }
      },
      {
        "text": {
          "cs": "Hodit 999× Excellent hodů",
          "en": "Make 999 Excellent Throws",
          "ja": "エクセレントスローを999回投げる",
          "ru": "Сделать 999 Excellent бросков"
        },
        "tip": {
          "cs": "Používejte Nanab Berry na legendární raid bossy jako Groudon, Kyogre nebo Necrozma, kteří mají obrovský cílový kruh.",
          "en": "Use Nanab Berries on 5★ Legendary raid bosses with giant targets for guaranteed Excellent circles.",
          "ja": "サークルが巨大な5★伝説レイドボス（カイオーガ、グラードン等）にナナのみを使って確実に決めましょう。",
          "ru": "Используйте Nanab Berry на легендарных рейдовых боссах (Groudon, Kyogre, Necrozma) с огромным кольцом."
        }
      },
      {
        "text": {
          "cs": "Vyhrát 80 Raidů",
          "en": "Win 80 raids",
          "ja": "レイドバトルで80回勝利する",
          "ru": "Выиграть 80 рейдов"
        },
        "tip": {
          "cs": "Zapojte se do středečních Raid Hours a víkendových Raid Days s bezplatnými bonusovými raid passy pro rychlé splnění.",
          "en": "Participate in Wednesday Raid Hours and bonus pass weekend events to hit 80 clears rapidly.",
          "ja": "水曜レイドアワーやボーナスパスが配られるレイドデイに参加し、仲間と一気に周回しましょう。",
          "ru": "Участвуйте в Raid Hour по средам и рейдовых днях с бесплатными пропусками."
        }
      }
    ]
  }
];

export const PLATINUM_MEDALS_GUIDE: PlatinumMedalsGuide = {
  "tierS": [
    {
      "name": {
        "cs": "18 typových medailí za 2 500 úlovků",
        "en": "18 Type Catch Medals (2,500 catches)",
        "ja": "タイプ別捕獲メダル18種（各2,500匹）",
        "ru": "18 медалей по типам (по 2 500 покемонов)"
      },
      "speed": "⚡ 1 až 2 týdny, případně přirozený postup",
      "description": {
        "cs": "Zejména Normal, Flying, Poison, Water, Grass a Bug. Započítává se každý odchyt a dává trvalý bonus +4 k úspěšnosti chycení daného typu.",
        "en": "Particularly Normal, Flying, Poison, Water, Grass, Bug. Earns a permanent +4 catch bonus multiplier for that type.",
        "ja": "ノーマル、ひこう、どく、みず、くさ、むし等は極めて短期間で達成可能。対象タイプの捕獲率が永久に+4アップします。",
        "ru": "Особенно Normal, Flying, Poison, Water, Grass, Bug. Дает постоянный бонус +4 к шансу поимки покемонов этого типа."
      }
    },
    {
      "name": {
        "cs": "Kanto a Johto Pokédex za 151 a 100 Pokémonů",
        "en": "Kanto & Johto Pokédex (151 & 100 Pokémon)",
        "ja": "カントー＆ジョウト図鑑メダル（151匹・100匹）",
        "ru": "Покедексы Канто и Джото (151 и 100 покемонов)"
      },
      "speed": "⚡ Okamžitě nebo z probíhajících eventů",
      "description": {
        "cs": "Kompletní registrace první a druhé generace. Většina aktivních hráčů má tyto medaile splněné už dávno.",
        "en": "Complete registry of Gen 1 and Gen 2. Most active players already hold these medals.",
        "ja": "第1世代および第2世代の完全コンプリート。多くのアクティブプレイヤーが既に達成済みです。",
        "ru": "Полное заполнение 1 и 2 поколений. Большинство активных тренеров уже имеют эти медали."
      }
    },
    {
      "name": {
        "cs": "Scientist za 2 000 evolucí",
        "en": "Scientist (2,000 Evolutions)",
        "ja": "けんきゅういん（進化2,000回）",
        "ru": "Scientist (2 000 эволюций)"
      },
      "speed": "⚡ Zhruba 1 měsíc",
      "description": {
        "cs": "Sbírejte Pokémony za 12 Candy jako Pidgey, Wurmple, Caterpie, Weedle, Whismur a Pidove a vyvíjejte je hromadně během Spotlight Hour s bonusem 2× Evolution XP.",
        "en": "Hoard 12-candy species (Pidgey, Wurmple, Caterpie, Pidove) and mass-evolve during 2× Evolution XP Spotlight Hours.",
        "ja": "アメ12個で進化できるケムッソやポッポをため込み、進化XP2倍のスポットライトアワーで一気に消化しましょう。",
        "ru": "Собирайте покемонов за 12 конфет (Pidgey, Wurmple, Caterpie) и делайте массовую эволюцию во время 2× XP Spotlight Hour."
      }
    },
    {
      "name": {
        "cs": "Cameraman za 400 photobomb setkání",
        "en": "Cameraman (400 Photobombs)",
        "ja": "カメラマン（スナップショット400回）",
        "ru": "Cameraman (400 фотобомб)"
      },
      "speed": "⚡ 2 až 3 měsíce",
      "description": {
        "cs": "Udělejte jednu fotku buddyho denně se zaručeným Smearglem. Během Community Day a speciálních eventů můžete získat až 5 photobombů za odpoledne.",
        "en": "Take a snapshot daily for a guaranteed Smeargle photobomb. Event days provide up to 5 encounters daily.",
        "ja": "毎日の相棒スナップショットでドーブルが確定出現。コミュニティ・デイ中は1日5回まで出現枠が拡大されます。",
        "ru": "Делайте фото напарника каждый день для гарантированного Smeargle. Во время Community Day дают до 5 встреч за день."
      }
    },
    {
      "name": {
        "cs": "Idol za 20 Best Friends",
        "en": "Idol (20 Best Friends)",
        "ja": "アイドル（大親友20人）",
        "ru": "Idol (20 Best Friends)"
      },
      "speed": "⚡ 90 dní",
      "description": {
        "cs": "Vyžaduje 90 dní každodenní interakce formou posílání dárků nebo raidů. Přináší obrovské množství XP, konkrétně 200 tisíc XP se šťastným vejcem za každého Best Frienda.",
        "en": "90 days of daily gift/raid interaction. Delivers colossal XP (100k XP per friend with Lucky Egg!).",
        "ja": "毎日ギフトを送り合って90日で達成。しあわせタマゴを使えば1人あたり20万XPという膨大な経験値も同時に獲得できます。",
        "ru": "90 дней ежедневных подарков. Приносит колоссальное количество XP (по 200k XP с Lucky Egg на каждого Best Friend)."
      }
    },
    {
      "name": {
        "cs": "Collector za 50 000 úlovků a Backpacker za 50 000 otočení PokéStopů",
        "en": "Collector (50k Catches) & Backpacker (50k Spins)",
        "ja": "コレクター（5万匹捕獲）＆バックパッカー（5万回スピン）",
        "ru": "Collector (50k поимок) и Backpacker (50k спинов)"
      },
      "speed": "⚡ Přirozený postup při levelování",
      "description": {
        "cs": "K dosažení levelu 70 a více potřebujete desítky milionů XP, takže tyto dvě medaile dokončíte zcela přirozeně bez extra úsilí.",
        "en": "Accumulates naturally on the road to level 70+ given the massive XP requirements.",
        "ja": "レベル70超えを目指す過程で膨大な経験値が必要となるため、意識せずとも自然に達成されます。",
        "ru": "Накапливаются сами собой по мере продвижения к 70+ уровню из-за огромных требований к XP."
      }
    }
  ],
  "tierA": [
    {
      "name": {
        "cs": "Ace Trainer za 2 000 tréninků proti lídrům",
        "en": "Ace Trainer (2,000 Leader Trainings)",
        "ja": "エリートトレーナー（リーダー特訓2,000回）",
        "ru": "Ace Trainer (2 000 тренировок с лидерами)"
      },
      "speed": "⚖️ 10 až 14 dní rychlého farmení",
      "description": {
        "cs": "Rychlý trik: Zvolte lídryni Blanche v Master League se silným elektrickým pokémonem. Boj dokončíte za 15 sekund a výhra se okamžitě započítá.",
        "en": "⚡ Fast Trick: Battle Blanche in Master League with a high-DPS Electric/Fighting counter and farm rounds in 15 seconds.",
        "ja": "⚡ 最速特訓裏技：マスターリーグのブランシェを選び、高火力アタッカーで瞬殺を繰り返せば1戦15秒で周回可能です。",
        "ru": "⚡ Быстрый трюк: Сражайтесь с лидером Blanche в Master League сильным электрическим покемоном — бой занимает 15 секунд."
      }
    },
    {
      "name": {
        "cs": "Purifier za 1 000 očištěných Pokémonů",
        "en": "Purifier (1,000 Shadow Purifications)",
        "ja": "リトレーナー（1,000匹リトレーン）",
        "ru": "Purifier (1 000 очищений Shadow)"
      },
      "speed": "⚖️ Vyžaduje 1 milion Stardustu",
      "description": {
        "cs": "Čistěte výhradně pokémony s nákladem 1 000 Stardustu jako Zubat, Rattata, Pidgey, Magikarp, Aron nebo Foongus. Vyhněte se pokémonům za 3 000 a 5 000 Stardustu.",
        "en": "Strictly purify 1,000-stardust shadows to cap costs at 1M Stardust rather than burning 3M-5M.",
        "ja": "1,000すなの軽量シャドウのみに絞ることで、消費すなを最少の100万に抑えてプラチナを獲得できます。",
        "ru": "Очищайте строго покемонов за 1 000 пыли, чтобы ограничить затраты 1 млн пыли вместо 3–5 млн."
      }
    },
    {
      "name": {
        "cs": "Hero za 2 000 poražených Rocket Gruntů",
        "en": "Hero (2,000 Team Rocket Grunts)",
        "ja": "ヒーロー（ロケット団したっぱ2,000人撃破）",
        "ru": "Hero (2 000 пешек Ракеты)"
      },
      "speed": "⚖️ 2 až 4 měsíce",
      "description": {
        "cs": "Přímo navazuje na medaili Purifier. Využijte akce Rocket Takeover pro hustý výskyt balónků a černých PokéStopů.",
        "en": "Synergizes directly with Purifier medal. Abuse Rocket Takeover seasons for heavy density.",
        "ja": "リトレーンメダルと完全に連動。ロケット団占拠イベントでポケストップと気球を周回しましょう。",
        "ru": "Идеально сочетается с медалью Purifier. Фармите во время Rocket Takeover ивентов."
      }
    },
    {
      "name": {
        "cs": "Battle Girl za 4 000 vyhraných soubojů v tělocvičnách",
        "en": "Battle Girl (4,000 Gym Battles)",
        "ja": "バトルガール（ジムバトル4,000勝）",
        "ru": "Battle Girl (4 000 побед в гимах)"
      },
      "speed": "⚖️ 1 až 2 měsíce",
      "description": {
        "cs": "Čistěte nepřátelské gymy v hustě osídlených oblastech. Rychlý bojový tým jako Terrakion, Lucario a Machamp vyčistí plný gym za pouhé 2 minuty.",
        "en": "Take down active Gyms in town. A sweep team of Terrakion, Lucario, and Machamp clears towers in 2 minutes.",
        "ja": "テラキオンやルカリオなどの高火力かくとうパーティでジムを素早く落として勝利数を稼ぎましょう。",
        "ru": "Сбивайте вражеские гимы ударной пачкой (Terrakion, Lucario, Machamp) за пару минут."
      }
    },
    {
      "name": {
        "cs": "Champion za 1 000 raidů a Battle Legend za 1 000 legendárních raidů",
        "en": "Champion (1k Raids) & Battle Legend (1k Legendary)",
        "ja": "チャンピオン（レイド1千勝）＆バトルレジェンド（伝説1千勝）",
        "ru": "Champion (1 000 рейдов) и Battle Legend (1 000 легендарных)"
      },
      "speed": "⚖️ Průběžně během hraní",
      "description": {
        "cs": "Pravidelné raidování pomocí bezplatných denních pasů, středečních Raid Hours a víkendových speciálních akcí.",
        "en": "Steadily completed through daily free passes, Wednesday Raid Hours, and weekend events.",
        "ja": "毎日の無料パス、水曜レイドアワー、週末のレイドデイにコツコツ参加して積み上げます。",
        "ru": "Набираются регулярными рейдами с ежедневными бесплатными пасами и Raid Hour."
      }
    }
  ],
  "tierAvoid": [
    {
      "name": {
        "cs": "Triathlete za 100 sedmidenních sérií",
        "en": "Triathlete (100× 7-day Streaks)",
        "ja": "トライアスリート（7日連続記録100回）",
        "ru": "Triathlete (100× 7-дневных стриков)"
      },
      "speed": "⛔ Minimálně 700 dní bez vynechání dne",
      "description": {
        "cs": "Tuto medaili nelze nijak urychlit. Vyžaduje 100 týdnů soustavného hraní bez jediného přerušení. Neplánujte ji jako podmínku pro postup, přijde sama za dva roky.",
        "en": "Mathematically capped at 700 consecutive days minimum! Never count on this for quick level milestones.",
        "ja": "短縮が物理的に不可能な最長メダル。最低でも連続700日（約2年弱）が必要なため、目標からは除外推奨。",
        "ru": "Физически невозможно ускорить! Требует минимум 700 дней непрерывной игры. Не рассчитывайте на нее."
      }
    },
    {
      "name": {
        "cs": "Fisherman za 1 000 obřích Magikarpů a Youngster za 1 000 drobných krys Rattata",
        "en": "Fisherman (1k XL Magikarp) & Youngster (1k XS Rattata)",
        "ja": "つりびと（大物コイキング1千匹）＆たんぱんこぞう（極小コラッタ1千匹）",
        "ru": "Fisherman (1k больших Magikarp) и Youngster (1k мелких Rattata)"
      },
      "speed": "⛔ Roky závislé na náhodě",
      "description": {
        "cs": "Šance na správnou velikostní kategorii je pouhých 12 až 15 procent. K dokončení musíte chytit přes sedm až osm tisíc kusů od každého druhu.",
        "en": "Requires catching 7,000-8,000+ of each species due to the low 12-15% size bracket RNG.",
        "ja": "大物・極小の判定率はわずか12〜15%程度。それぞれ7,000〜8,000匹以上捕獲する必要があり超高難度です。",
        "ru": "Шанс на нужный вес всего 12-15%. Придется поймать более 7 000–8 000 каждого вида!"
      }
    },
    {
      "name": {
        "cs": "Unown za 28 unikátních forem abecedy",
        "en": "Unown (28 Unique Alphabet Forms)",
        "ja": "アンノーン（全28アルファベット収集）",
        "ru": "Unown (28 уникальных форм алфавита)"
      },
      "speed": "⛔ Závislé na placených cestovních akcích",
      "description": {
        "cs": "Unown v divočině téměř vůbec nevystupuje. Všech 28 písmen nelze zkompletovat bez účasti na GO Festech, Safari akcích nebo rozsáhlého vyměňování s cestovateli.",
        "en": "Unown almost never spawns in the wild. Virtually impossible without live GO Fests, Safari events, or extensive trading.",
        "ja": "野生出現がほぼ皆無。リアルイベント（GO Fest等）への遠征やフレンド交換なしではコンプ不可能です。",
        "ru": "В дикой природе почти не спавнится. Без посещения живых GO Fest или обменов закрыть невозможно."
      }
    },
    {
      "name": {
        "cs": "Best Buddy za 100 nejlepších parťáků",
        "en": "Best Buddy (100 Best Buddies)",
        "ja": "最高の相棒（100匹達成）",
        "ru": "Best Buddy (100 лучших напарников)"
      },
      "speed": "⛔ Měsíce náročné každodenní práce",
      "description": {
        "cs": "Každý parťák na status Best Buddy vyžaduje 300 srdíček. I při střídání 20 pokémonů denně zabere splnění stovky parťáků extrémní množství času.",
        "en": "Requires 300 hearts each. Demands months of grueling 20-buddy daily cycling and Poffin grinding.",
        "ja": "1匹あたりハート300個が必要。毎日20匹をローテーションしても数ヶ月の過酷な作業となります。",
        "ru": "Каждый требует 300 сердец. Месяцы изнурительной ежедневной рутины со сменой 20 покемонов."
      }
    },
    {
      "name": {
        "cs": "GBL veteránské medaile za 1 000 výher v jednotlivých ligách",
        "en": "GBL League Veterans (1,000 wins each)",
        "ja": "バトルリーグ各リーグメダル（各1,000勝）",
        "ru": "Ветераны лиг GBL (по 1 000 побед в каждой)"
      },
      "speed": "⛔ Vysoce časově i soutěžně náročné",
      "description": {
        "cs": "Vyžaduje špičkově postavené týmy pro Great, Ultra i Master League a stovky hodin v soubojích. Vhodné jen pro hráče zaměřené čistě na PvP scénu.",
        "en": "Demands deep meta rosters and hundreds of PvP hours. Leave for dedicated PvP competitors.",
        "ja": "各リーグ用の高個体値メタパーティと膨大な対戦時間が必要なため、PvP勢以外は非推奨。",
        "ru": "Требует прокачанных команд под каждую лигу и сотен часов в PvP. Только для фанатов PvP."
      }
    }
  ]
};
