export interface GuideSection {
  id: string;
  heading: {
    cs: string;
    en: string;
    ja: string;
    ru: string;
  };
  content: {
    cs: string;
    en: string;
    ja: string;
    ru: string;
  };
  tips?: {
    cs: string[];
    en: string[];
    ja: string[];
    ru: string[];
  };
}

export interface GuideArticle {
  id: string;
  slug: string;
  title: {
    cs: string;
    en: string;
    ja: string;
    ru: string;
  };
  subtitle: {
    cs: string;
    en: string;
    ja: string;
    ru: string;
  };
  category: {
    cs: string;
    en: string;
    ja: string;
    ru: string;
  };
  author: string;
  readTime: string;
  updatedAt: string;
  iconName: string;
  imageUrl: string;
  featured?: boolean;
  sections: GuideSection[];
}

export const GUIDES_DATA: GuideArticle[] = [
  {
    id: "rocket-leaders-giovanni-guide",
    slug: "rocket-leaders-giovanni-guide",
    iconName: "Shield",
    imageUrl: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?q=80&w=800&auto=format&fit=crop",
    featured: true,
    author: "PoGo Events Team",
    readTime: "8 min",
    updatedAt: "2026-08-10",
    category: {
      cs: "Team GO Rocket",
      en: "Team GO Rocket",
      ja: "GOロケット団",
      ru: "Команда GO Ракета"
    },
    title: {
      cs: "Kompletní průvodce Team GO Rocket: Jak porazit Lídry a Giovanniho",
      en: "Ultimate Team GO Rocket Guide: How to Beat Leaders & Giovanni",
      ja: "GOロケット団完全攻略：リーダーとサカキを倒す ne strategii",
      ru: "Полный гайд по Команде GO Ракета: Как победить Лидеров и Джованни"
    },
    subtitle: {
      cs: "Detailní návod na sestavení nejlepších counterů proti Sierra, Arlo, Cliffovi a šéfovi Giovanni. Získejte stínové legendární Pokémony.",
      en: "Detailed counters guide against Sierra, Arlo, Cliff, and boss Giovanni. Catch legendary Shadow Pokémon with optimal counter teams.",
      ja: "シエラ、アルロ、クリフ、サカキを撃破するための最適なカウンター編成とシャドウ伝説ポケモンの入手方法。",
      ru: "Подробный гайд по выбору контеров против Сиерры, Арло, Клиффа и босса Джованни. Забирайте теневых легендарных покемонов."
    },
    sections: [
      {
        id: "intro",
        heading: {
          cs: "Úvod do bojů s Team GO Rocket",
          en: "Introduction to Team GO Rocket Battles",
          ja: "GOロケット団バトルへの招待",
          ru: "Введение в битвы с Командой GO Ракета"
        },
        content: {
          cs: "Team GO Rocket obsazuje PokéStopy a létá v horkovzdušných balónech po celém světě. Porážkou řadových členů (Grunts) získáváte Mysterious Components. Shromážděním 6 komponent sestavíte Rocket Radar, který vám umožní lokalizovat lídry – Arla, Cliffa a Sierru.",
          en: "Team GO Rocket invades PokéStops and operates hot air balloons worldwide. Defeating Rocket Grunts awards Mysterious Components. Assembling 6 components creates a Rocket Radar, allowing you to locate Rocket Leaders Sierra, Cliff, and Arlo.",
          ja: "GOロケット団はポケストップを占拠し、気球で出現します。下っ端（Grunts）を倒して「ふしぎなパーツ」を6個集めると「ロケットレーダー」が完成し、リーダー（アルロ、クリフ、シエラ）の位置を特定できます。",
          ru: "Команда GO Ракета захватывает покестопы и летает на воздушных шарах. За победу над пешками (Grunts) вы получаете Mysterious Components. Собрав 6 деталей, вы создаете Rocket Radar для поиска лидеров."
        },
        tips: {
          cs: [
            "První dva útoky Pokémona po výměně nebo po nabitém útoku (Charged Move) se soupeř na 2 sekundy zastaví a neútočí.",
            "Lídři a Giovanni vždy využijí své 2 štíty na vaše první 2 nabité útoky. Používejte spamovací útoky s rychlým nabíjením!"
          ],
          en: [
            "Rocket AI pauses for ~2 seconds after every charged move or Pokémon swap. Use this stun window effectively!",
            "Leaders and Giovanni always shield your first 2 charged attacks. Lead with spammy, fast-charging moves to burn their shields early!"
          ],
          ja: [
            "スペシャルアタック発動後やポケモン交代後、敵の攻撃が約2秒間停止します。この隙を最大限に活用しましょう。",
            "リーダーとサカキは最初の2回のスペシャルアタックに必ずシールドを使用します。発動が早い技でシールドを早急に消費させましょう。"
          ],
          ru: [
            "ИИ Ракеты замирает на 2 секунды после каждой заряжаемой атаки или смены покемона.",
            "Лидеры и Джованни всегда тратит 2 щита на первые ваши заряжаемые атаки. Начинайте бой с быстрых атак для снятия щитов!"
          ]
        }
      },
      {
        id: "leaders",
        heading: {
          cs: "Strategie na Lídry (Sierra, Cliff, Arlo)",
          en: "Leader Battle Strategies (Sierra, Cliff, Arlo)",
          ja: "リーダー攻略法（シエラ、クリフ、アルロ）",
          ru: "Стратегии победы над Лидерами"
        },
        content: {
          cs: "Každý lídr má unikátní sestavu 3 Pokémonů. První Pokémon je vždy stálý a po výhře ho můžete chytit v jeho Shiny Shadow variantě. Klíčem k vítězství je zvolit na první pozici Pokémona s velmi rychlým Charged Move (např. Lucario s Power-Up Punch, Machamp s Cross Chop nebo Swampert s Hydro Cannon).",
          en: "Each Leader uses a set pool of 3 Pokémon. The first Pokémon is fixed and can be caught in Shiny Shadow form upon victory. The winning formula is starting with a fast shield-breaker equipped with rapid Charged Moves (e.g. Lucario with Power-Up Punch, Machamp with Cross Chop, or Swampert with Hydro Cannon).",
          ja: "各リーダーは3体の固定プールから編成してきます。1体目を倒すと色違いシャドウの可能性のあるポケモンを入手できます。最初のポジションにはカウンター技が早いポケモン（ルカリオのグロウパンチやカイリキーのクロスチョップ）を配置するのが鉄則です。",
          ru: "У каждого лидера есть фиксированный набор покемонов. Первый покемон может быть пойман в сияющей (Shiny Shadow) форме. Главный секрет — поставить первым покемона с мгновенной заряжаемой атакой."
        }
      },
      {
        id: "giovanni",
        heading: {
          cs: "Jak porazit Šéfa Giovanniho",
          en: "How to Defeat Boss Giovanni",
          ja: "ボス・サカキの倒し方",
          ru: "Как победить Босса Джованни"
        },
        content: {
          cs: "K vyhledání Giovanniho potřebujete Super Rocket Radar, který získáváte ze speciálního výzkumu (Special Research). Giovanni vždy zahajuje boj s Persianem. Druhý Pokémon se mění mezi 3 možnými variantami a třetí je aktuální stínová legendární stvůra (např. Shadow Rayquaza, Shadow Mewtwo, Shadow Groudon). Proti Persianovi použijte Bojový typ (Machamp, Terrakion, Lucario), který okamžitě strhne obě složky štítu.",
          en: "Locating Giovanni requires a Super Rocket Radar obtained from Special Research quests. Giovanni always leads with Persian. His second slot rotates among 3 potential heavy hitters, and his final slot is the current Shadow Legendary feature. Use Fighting-type counters (Machamp, Terrakion, Lucario) against Persian to quickly strip away both shields.",
          ja: "サカキの追跡にはスペシャルリサーチ報酬の「スーパーロケットレーダー」が必要です。サカキの1体目は常にペルシアンです。2体目は3種類の強力なポケモンのいずれか、3体目は期間限定のシャドウ伝説ポケモンとなります。ペルシアンにはかくとうタイプをぶつけて速やかにシールドを割ってください。",
          ru: "Для поиска Джованни нужен Super Rocket Radar из спецквестов. Джованни всегда начинает с Persian. Второй покемон меняется, а третий — текущий Теневой Легендарный покемон. Против Персиана используйте боевой тип (Machamp, Terrakion)."
        }
      }
    ]
  },
  {
    id: "raid-battles-counter-guide",
    slug: "raid-battles-counter-guide",
    iconName: "Swords",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
    featured: true,
    author: "PoGo Events Team",
    readTime: "7 min",
    updatedAt: "2026-08-08",
    category: {
      cs: "Raid Battles",
      en: "Raid Battles",
      ja: "レイドバトル",
      ru: "Рейдовые Битвы"
    },
    title: {
      cs: "Průvodce Raid Battles: Výběr nejlepších counterů a výpočet CP 100% IV",
      en: "Raid Battles Master Guide: Optimal Counter Selection & 100% IV CP",
      ja: "レイドバトルマスターガイド：最適カウンター選定と100% IV CP計算",
      ru: "Мастер-гайд по Рейдам: Выбор лучших контеров и CP 100% IV"
    },
    subtitle: {
      cs: "Naučte se správně využívat typové výhody, počítat DPS a zjišťovat ideální sílu (CP) při chytání legendárních a Mega Raid bossů.",
      en: "Master type effectiveness, calculate move DPS, and identify 100% IV Perfect Combat Power when catching Legendary and Mega Bosses.",
      ja: "タイプ相性の活用、DPS計算、伝説・メガレイドボス捕獲時の100% IV（個体値100%）CP判別法を徹底解説。",
      ru: "Освойте уязвимости типов, расчёт DPS и научитесь определять 100% IV покемонов при поимке легендарных боссов."
    },
    sections: [
      {
        id: "raid-types",
        heading: {
          cs: "Úrovně Raidů a Počasí (Weather Boost)",
          en: "Raid Tiers & Weather Boost Mechanics",
          ja: "レイドランクと天候ブーストの仕組み",
          ru: "Уровни Рейдов и Погодный Буст"
        },
        content: {
          cs: "Raidy se dělí na 1-Star, 3-Star, 5-Star (Legendary), Mega a Shadow Raidy. Při chytání po vyhraném raidu má Pokémon standardně Level 20. Pokud je však aktivní odpovídající počasí (Weather Boost), chycený Pokémon má Level 25, vyšší CP a garantované vyšší minimální IV statistiky!",
          en: "Raids are categorized into 1-Star, 3-Star, 5-Star (Legendary), Mega, and Shadow Raids. Bosses are caught at Level 20 under normal conditions. However, when boosted by current in-game weather, the caught Pokémon appears at Level 25 with higher CP and guaranteed floor stats!",
          ja: "レイドには1つ星、3つ星、5つ星（伝説）、メガレイド、シャドウレイドが存在します。通常時のゲットチャレンジはレベル20ですが、天候ブースト発生時はレベル25となり、より高いCPと個体値保証で入手できます。",
          ru: "Рейды делятся на 1*, 3*, 5* (Легендарные), Мега и Теневые. Обычные боссы ловятся на 20 уровне. При подходящей погоде (Weather Boost) покемон будет 25 уровня с повышенным CP!"
        },
        tips: {
          cs: [
            "Sledujte ikonu počasí v pravém horním rohu obrazovky během raidu.",
            "Weather Boost zvyšuje útočnou sílu útoků daného typu o +20%!"
          ],
          en: [
            "Always keep an eye on the top-right weather icon prior to entering the raid lobby.",
            "Weather Boost increases damage output of matching move types by +20% during battles!"
          ],
          ja: [
            "ロビーに入る前に画面右上の天候アイコンを確認しましょう。",
            "天候ブースト適用中の技は、バトル中に威力（ダメージ）が+20%アップします！"
          ],
          ru: [
            "Следите за иконкой погоды в правом верхнем углу перед входом в лобби.",
            "Погодный буст увеличивает урон атак соответствующего типа на +20%!"
          ]
        }
      },
      {
        id: "counter-selection",
        heading: {
          cs: "Jak vybrat nejlepší tým (DPS vs ER)",
          en: "How to Build High-Performance Raid Teams (DPS vs ER)",
          ja: "最強パーティ編成術（DPSとER評価）",
          ru: "Сборка эффективной команды (DPS против ER)"
        },
        content: {
          cs: "Při výběru counterů záleží nejen na samotném útočném čísle (Attack), ale především na kombinaci útoků. Stejný Pokémon může mít s různými movesety až o 40 % odlišný výkon! V naší sekci 'Ranking' najdete přesný výpočet eDPS (Effective DPS) a ER (Equivalent Rating), které zohledňují jak poškození za sekundu, tak výdrž Pokémona v boji.",
          en: "Building top-tier teams requires evaluating move set synergy rather than raw Attack stats alone. The same Pokémon can perform up to 40% differently depending on its Fast and Charged moves! Check our 'Ranking' tab for accurate eDPS (Effective DPS) and ER (Equivalent Rating) calculations.",
          ja: "レイド用パーティの構築では、単なる攻撃力数値だけでなく技の組み合わせが最も重要です。同じポケモンでも技構成によってダメージ効率が最大40%変動します。当サイトの「Ranking」タブでeDPSとER数値を事前に確認してください。",
          ru: "При выборе команды важно сочетание Fast и Charged атак. Один и тот же покемон с разными атаками может выдавать разницу в уроне до 40%. Пользуйтесь разделом 'Ranking' для оценки eDPS и ER."
        }
      }
    ]
  },
  {
    id: "spotlight-community-day-guide",
    slug: "spotlight-community-day-guide",
    iconName: "Calendar",
    imageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop",
    featured: false,
    author: "PoGo Events Team",
    readTime: "6 min",
    updatedAt: "2026-08-05",
    category: {
      cs: "Události & Eventy",
      en: "Events & Festivals",
      ja: "イベントガイド",
      ru: "События и Ивенты"
    },
    title: {
      cs: "Spotlight Hour a Community Day: Jak vytěžit maximum z herních bonusů",
      en: "Spotlight Hour & Community Day Master Strategy",
      ja: "スポットライトアワー＆コミュニティ・デイ攻略：ボーナス最大活用法",
      ru: "Spotlight Hour и Community Day: Максимизация бонусов"
    },
    subtitle: {
      cs: "Příprava před eventem, spravování Mega Evolucí pro bonusové Candy a strategie rychlého chytání (Quick Catch).",
      en: "Pre-event preparation, managing Mega Evolutions for bonus Candy, and mastering the Fast Catch technique.",
      ja: "事前準備、メガシンカによるキャンディ増量テクニック、ファストキャッチ（高速捕獲）の実践ガイド。",
      ru: "Подготовка к ивенту, Мега-Эволюции для бонуса Candy и техника быстрого лова (Fast Catch)."
    },
    sections: [
      {
        id: "spotlight-basics",
        heading: {
          cs: "Co je to Spotlight Hour a jaké přináší bonusy",
          en: "What is Spotlight Hour and Available Bonuses",
          ja: "スポットライトアワーの概要と発生ボーナス",
          ru: "Что такое Spotlight Hour и его бонусы"
        },
        content: {
          cs: "Spotlight Hour probíhá každé úterý od 18:00 do 19:00 lokálního času. Vybraný Pokémon se masivně objevuje v divočině a je doprovázen jedním z 5 rotujících bonusů: 2x Catch XP, 2x Catch Stardust, 2x Catch Candy, 2x Transfer Candy nebo 2x Evolve XP.",
          en: "Spotlight Hour takes place every Tuesday from 6:00 PM to 7:00 PM local time. A featured Pokémon spawns in massive numbers alongside one of 5 rotating bonuses: 2x Catch XP, 2x Catch Stardust, 2x Catch Candy, 2x Transfer Candy, or 2x Evolve XP.",
          ja: "スポットライトアワーは毎週火曜日の18:00〜19:00に開催されます。特定ポケモンが大量発生し、2倍XP、2倍ほしのすな、2倍アメなどの特典が適応されます。",
          ru: "Spotlight Hour проходит каждый вторник с 18:00 до 19:00 local time. Выбранный покемон спавнится повсюду с одним из бонусов (2x XP, 2x Stardust, 2x Candy и т.д.)."
        },
        tips: {
          cs: [
            "Při bonusu 2x Stardust zapněte Star Piece na celou hodinu a získejte 3x Stardust za každý úlovek!",
            "Při bonusu 2x XP použijte Lucky Egg a provádějte Excellent Hody."
          ],
          en: [
            "During 2x Stardust bonus, activate a Star Piece to stack your earnings to 3x Stardust per catch!",
            "During 2x XP bonus, pop a Lucky Egg and aim consistently for Excellent Throws."
          ],
          ja: [
            "ほしのすな2倍ボーナス時は「ほしのかけら」を使って、獲得量を通常の3倍に増やしましょう！",
            "XP2倍ボーナス時は「しあわせタマゴ」を使い、エクセレントスローを狙いましょう。"
          ],
          ru: [
            "При бонусе 2x Stardust включите Star Piece для получения 3x Stardust за поимку!",
            "При 2x XP активируйте Lucky Egg и старайтесь делать Excellent броски."
          ]
        }
      }
    ]
  },
  {
    id: "pokemon-iv-cp-appraise-guide",
    slug: "pokemon-iv-cp-appraise-guide",
    iconName: "Sparkles",
    imageUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=800&auto=format&fit=crop",
    featured: false,
    author: "PoGo Events Team",
    readTime: "5 min",
    updatedAt: "2026-08-01",
    category: {
      cs: "Základy & Mechaniky",
      en: "Game Mechanics",
      ja: "ゲームメカニクス",
      ru: "Механика игры"
    },
    title: {
      cs: "Rozbor IV, CP a Hodnocení (Appraise): Jak poznat perfektního 100% IV Pokémona",
      en: "Understanding IVs, CP & Appraisal: How to Spot Perfect 100% IV Pokémon",
      ja: "IV（個体値）、CP、評価システムの解説：個体値100%の判別法",
      ru: "Понимание IV, CP и Appraise: Как узнать 100% IV покемона"
    },
    subtitle: {
      cs: "Vše o skrytých statistikách Attack, Defense, Stamina a rozdílu mezi PvE 100% IV a PvP ideálními statistikami.",
      en: "Deep dive into hidden stats (Attack, Defense, Stamina) and the key difference between PvE 100% IVs vs PvP ideal IV spreads.",
      ja: "隠しステータス（攻撃・防御・HP）の仕組みと、PvE向け100%個体値とPvP向け理想個体値の違い。",
      ru: "Разбор скрытых характеристик (Attack, Defense, Stamina) и разницы между PvE 100% IV и PvP IV распределением."
    },
    sections: [
      {
        id: "iv-explained",
        heading: {
          cs: "Co jsou to IV statistiky (Individual Values)",
          en: "What are IV Stats (Individual Values)",
          ja: "IV（個体値）とは何か",
          ru: "Что такое IV (Individual Values)"
        },
        content: {
          cs: "Každý Pokémon v Pokémon GO má 3 skryté IV vlastnosti: Attack (0–15), Defense (0–15) a Stamina (0–15). Tyto hodnoty se přičítají k základním statům druhu (Base Stats). Pokémon s hodnotami 15/15/15 se označuje jako 4* neboli 100% IV (Hundo).",
          en: "Every Pokémon possesses 3 hidden IV values: Attack (0–15), Defense (0–15), and Stamina (0–15). These values are added on top of the species' base stats. A Pokémon rated 15/15/15 is known as a 4-Star or 100% IV (Hundo).",
          ja: "全てのポケモンには攻撃・防御・HPの3つの隠し個体値（各0〜15）が存在します。15/15/15の最大値を持つ個体は4つ星（個体値100%／Hundo）と呼ばれます。",
          ru: "У каждого покемона есть 3 скрытых параметра IV: Attack (0–15), Defense (0–15) и Stamina (0–15). Покемон с 15/15/15 называются 4* или 100% IV (Hundo)."
        }
      }
    ]
  },
  {
    id: "mega-dynamax-mechanics-guide",
    slug: "mega-dynamax-mechanics-guide",
    iconName: "Trophy",
    imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop",
    featured: false,
    author: "PoGo Events Team",
    readTime: "7 min",
    updatedAt: "2026-07-28",
    category: {
      cs: "Mega & Max Battles",
      en: "Mega & Max Battles",
      ja: "メガ＆マックスバトル",
      ru: "Мега и Макс Битвы"
    },
    title: {
      cs: "Mega Evoluce a Max Battles: Kompletní průvodce bonusy a mechanikami",
      en: "Mega Evolution & Max Battles: Comprehensive Mechanics Guide",
      ja: "メガシンカ＆マックスバトル：ボーナスとシステム完全攻略",
      ru: "Мега-Эволюции и Max Battles: Гайд по бонусам и механике"
    },
    subtitle: {
      cs: "Jak zvýšit Mega Úroveň (Mega Level), získat více Candy XL a ovládnout Max Battles v Power Spoty.",
      en: "How to level up Mega Levels, farm bonus Candy XL, and dominate Max Battles at Power Spots.",
      ja: "メガレベルの上げ方、アメXLドロップ率アップ、パワースポットでのマックスバトル攻略。",
      ru: "Как прокачивать Mega Level, фармить Candy XL и побеждать в Max Battles на Power Spot."
    },
    sections: [
      {
        id: "mega-levels",
        heading: {
          cs: "Mega Úrovně (Base, High, Max Mega Level)",
          en: "Mega Levels Breakdown (Base, High, Max Level)",
          ja: "メガレベル（ベース・ハイ・マックス）の解説",
          ru: "Уровни Мега-Эволюций (Base, High, Max)"
        },
        content: {
          cs: "Opakovanou Mega Evolucí Pokémona zvyšujete jeho Mega Úroveň. Na nejvyšší úrovni (Max Mega Level) získáte obrovské bonusy: +2 bonusové Candy při chycení Pokémona stejného typu, zásadně zvýšenou šanci na Candy XL a snížený cooldown Mega Evoluce zdarma na pouhé 3 dny!",
          en: "Repeatedly Mega Evolving a Pokémon raises its Mega Level. Achieving Max Mega Level unlocks massive perks: +2 bonus Candy per matching catch, significantly higher Candy XL drop rates, and reduces the free Mega Evolution cooldown to just 3 days!",
          ja: "同じポケモンを何度もメガシンカさせることでメガレベルが上昇します。マックスレベルに達すると、同タイプ捕獲時のアメ+2個、アメXLドロップ確率の大幅アップ、無料再メガシンカの冷却期間が3日間に短縮されます。",
          ru: "Повторная Мега-Эволюция повышает Mega Level. На уровне Max Mega Level вы получаете +2 Candy за поимку покемонов того же типа, повышенный шансов Candy XL и бесплатный кд в 3 дня!"
        }
      }
    ]
  }
];
