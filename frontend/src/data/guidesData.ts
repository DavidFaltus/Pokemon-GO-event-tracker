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
    id: "weekly-hidden-mini-events-guide",
    slug: "weekly-hidden-mini-events-guide",
    iconName: "Calendar",
    imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop",
    featured: true,
    author: "PoGo Events Team",
    readTime: "9 min",
    updatedAt: "2026-08-15",
    category: {
      cs: "Týdenní rutiny & Minieventy",
      en: "Weekly Habits & Mini-Events",
      ja: "週間ルーティン＆ミニイベント",
      ru: "Еженедельные Рутины и Мини-Ивенты"
    },
    title: {
      cs: "Skryté týdenní minieventy & trenérské rutiny: Kompletní rozpis (Max Mondays, Friendship Friday a další)",
      en: "Hidden Weekly Mini-Events & Trainer Routines: Master Guide (Max Mondays, Friendship Friday & More)",
      ja: "隠れた週間ミニイベント＆トレーナールーティン完全攻略：マックスマンデー、フレンドシップフライデー他",
      ru: "Скрытые еженедельные мини-ивенты и рутины тренера: Полный гайд (Max Mondays, Friendship Friday и др.)"
    },
    subtitle: {
      cs: "Pravidelný týdenní harmonogram od pondělního Adventure Sync resetu přes Spotlight & Raid Hour, Friendship Friday dárky až po víkendové Showcases a Lucky trady.",
      en: "Master weekly schedule from Monday Adventure Sync reset to Spotlight & Raid Hour, Friendship Friday gift interactions, weekend Showcases, and Lucky trade strategies.",
      ja: "月曜日のアドベンチャーシンクリセットからスポットライト＆レイドアワー、フレンドギフト交換、週末のおひろめ（Showcase）まで完全網羅。",
      ru: "Полный еженедельный цикл: от сброса Adventure Sync в понедельник до Spotlight & Raid Hour, пятницы подарков и викенд-шоукейсов."
    },
    sections: [
      {
        id: "weekly-cycle-overview",
        heading: {
          cs: "1. Přehled týdenního cyklu a pondělní reset (Adventure Sync v 9:00)",
          en: "1. Weekly Cycle Overview & Monday Reset (Adventure Sync 9:00 AM)",
          ja: "1. 週間サイクルの概要と月曜リセット（アドベンチャーシンク 9:00）",
          ru: "1. Обзор недельного цикла и сброс в понедельник (Adventure Sync в 9:00)"
        },
        content: {
          cs: "Každé pondělí přesně v 9:00 lokálního času probíhá týdenní vyhodnocení Adventure Sync. Pokud za týden nachodíte 25 km, 50 km nebo 100 km, získáte štědré odměny včetně vzácných 10km a 5km vajíček se speciálním drop poolem, Rare Candy a až 16 000+ Stardustu! Zapnutím Star Piece před 9:00 v pondělí můžete Stardust odměnu navýšit na 24 000+.",
          en: "Every Monday at 9:00 AM local time, Adventure Sync tallies your weekly walking distance. Hitting 25 km, 50 km, or 100 km milestones unlocks massive rewards including exclusive 10km/5km eggs with high-tier hatch pools, Rare Candies, and 16,000+ Stardust! Activating a Star Piece right before 9:00 AM boosts the Stardust reward to 24,000+.",
          ja: "毎週月曜日午前9:00にアドベンチャーシンクの週間リワードが付与されます。25km、50km、100kmの目標を達成すると、特別なタマゴ（10km/5km）、ふしぎなアメ、そして最大16,000以上のほしのすなが手に入ります。受取直前に「ほしのかけら」を使うと24,000以上に増量可能です。",
          ru: "Каждый понедельник в 9:00 утра происходит сброс дистанции Adventure Sync. За 25 км, 50 км и 100 км вы получаете редкие яйца 10км/5км, Rare Candy и до 16 000+ пыли. Включите Star Piece до 9:00 для получения 24 000+ пыли!"
        },
        tips: {
          cs: [
            "Zkontrolujte v neděli večer svůj týdenní nájezd km v profilu trenéra — chybějící 2–3 km do 50 km se vyplatí dochodit!",
            "Před 9:00 v pondělí mějte v inventáři 2 volné sloty na vajíčka, jinak přijdete o speciální Adventure Sync 10km vejce!"
          ],
          en: [
            "Check your profile on Sunday evening — walking an extra 2–3 km to hit the 50 km tier is always worth the bonus rewards!",
            "Ensure you have at least 2 free egg slots in your storage before 9:00 AM Monday to receive the exclusive Adventure Sync 10km egg."
          ],
          ja: [
            "日曜日の夜に歩行距離を確認し、50kmに届きそうなら少し歩いて達成しておきましょう。",
            "月曜日の朝9:00前にタマゴの空き枠を最低2つ確保しておかないと、限定10kmタマゴを受け取れません！"
          ],
          ru: [
            "Проверяйте дистанцию в воскресенье вечером — добить 50 км всегда выгодно!",
            "Оставьте 2 свободных слота под яйца до 9:00 понедельника, чтобы не потерять спец-яйцо 10км!"
          ]
        }
      },
      {
        id: "combat-mini-events",
        heading: {
          cs: "2. Bojové týdenní eventy (Max Mondays, Raid Hour & PvP Battle Days)",
          en: "2. Weekly Combat Mini-Events (Max Mondays, Raid Hour & PvP Battle Days)",
          ja: "2. バトル系ミニイベント（マックスマンデー、レイドアワー、GBLバトルデイ）",
          ru: "2. Боевые еженедельные ивенты (Max Mondays, Raid Hour и PvP Battle Days)"
        },
        content: {
          cs: "Během týdne probíhají 3 klíčové bojové události:\n• Max Mondays (Pondělí 18:00–19:00): Vybraný Dynamax Pokémon přebírá téměř všechny Power Spoty ve městě. Vynikající příležitost nasbírat Max Particles a vyzkoušet Max Moves.\n• Raid Hour (Středa 18:00–19:00): Téměř všechny tělocvičny obsadí aktuální 5★ Legendární boss. V lokálních komunitách se schází party hráčů a dělají 5 až 8 raidů za hodinu.\n• GO Battle Days / PvP Nights: Několikrát za sezónu nabízí 4× Stardust z vítězství v PvP a navýšení denního limitu na 20 sad (100 zápasů).",
          en: "Three essential combat events recur regularly:\n• Max Mondays (Mondays 6:00–7:00 PM): A featured Dynamax Pokémon takes over nearly every Power Spot with boosted particle bonuses.\n• Raid Hour (Wednesdays 6:00–7:00 PM): Active 5★ Legendary/Mega raid boss appears simultaneously at virtually all Gyms. Local raid trains chain 5–8 raids in one hour.\n• GO Battle Days / PvP Nights: Seasonal events offering 4x Stardust win rewards and an increased cap of 20 battle sets (100 matches).",
          ja: "週間で3つの重要バトルイベントがあります：\n• マックスマンデー（月曜18:00〜19:00）：特定のダイマックスポケモンがパワースポットに一斉出現。\n• レイドアワー（水曜18:00〜19:00）：ほぼ全てのジムに伝説レイドボスが降臨。1時間で5〜8戦連続討伐可能。\n• GOバトルデイ／ナイト：勝利時ほしのすな4倍、1日最大20セット（100戦）対戦可能。",
          ru: "Три главных боевых события недели:\n• Max Mondays (Пн 18:00–19:00): Массовые Dynamax рейды на Power Spots.\n• Raid Hour (Ср 18:00–19:00): 5★ Легендарный босс на всех гимах одновременно.\n• GO Battle Days: 4x пыли за победы и лимит в 20 сетов (100 боев)."
        },
        tips: {
          cs: [
            "Během Raid Hour hrajte v režimu Party Play — získáte Party Power (dvojnásobné poškození Charged Move) a stihnete více raidů!",
            "V Max Mondays si předem vyčistěte Max Particles úložiště, abyste mohli sbírat energii z každého vyhraného Power Spotu."
          ],
          en: [
            "Always activate Party Play during Raid Hour to double your Charged Move output via Party Power and clear raids twice as fast!",
            "Spend Max Particles on move upgrades before Max Mondays to avoid hitting the 1,000 MP storage limit during battles."
          ],
          ja: [
            "レイドアワー中は「チームコラボ（Party Play）」を組み、パーティパワー（技2倍ダメージ）を発動させましょう！",
            "マックスマンデー前にマックス粒子の所持上限（1,000 MP）に達しないよう技強化等で消費しておきましょう。"
          ],
          ru: [
            "В Raid Hour играйте в Party Play для бонуса 2x урона Charged атак!",
            "Потратьте Max Particles до начала Max Mondays, чтобы не упираться в лимит 1,000 MP."
          ]
        }
      },
      {
        id: "social-community-habits",
        heading: {
          cs: "3. Sociální zvyky: Friendship Friday, Trade Weekends a Lucky Trades",
          en: "3. Social Traditions: Friendship Friday, Trade Weekends & Lucky Trades",
          ja: "3. ソーシャル習慣：フレンドシップフライデー、トレードウィークエンド、キラフレンド",
          ru: "3. Социальные традиции: Friendship Friday, Trade Weekends и Lucky Trades"
        },
        content: {
          cs: "V komunitě Pokémon GO se vžily pravidelné týdenní tradice:\n• Friendship Friday (Páteční dárky): Trenéři si v pátek hromadně otevírají a posílají dárky na maximum denního limitu (30–40 otevření), což urychluje postup na Best Friends (100 000 XP) a spouští Lucky Friends status.\n• Trade Weekend (Výměnný víkend): Výměny Pokémonů chycených více než 100 km od sebe (garantuje 1× Candy XL pro oba hráče!). Ideální pro likvidaci nechtěných raid bossů a Pokémonů ze Spotlight Hour.\n• Lucky Friend Special Trades: Výměna Shiny a legendárních Pokémonů s garantovaným Lucky statem (minimální IV 12/12/12 a -50% sleva na Stardust při levelování).",
          en: "Global community traditions maximize trainer progression:\n• Friendship Friday: Trainers maximize gift opens (30–40 per day) and sends, accelerating progress toward Best Friends (100,000 XP) and triggering Lucky Friends interactions.\n• Trade Weekends: Swapping Pokémon caught 100+ km apart awards 1 guaranteed Candy XL to both players! Perfect for clearing raid bosses and Spotlight catches.\n• Lucky Friend Special Trades: Trading Legendary and Shiny Pokémon with Lucky status guarantees high minimum IV floors (12/12/12) and a permanent 50% Stardust power-up discount.",
          ja: "世界中のトレーナーが実践するソーシャルルーティン：\n• フレンドシップフライデー：金曜日に上限（30〜40個）までギフトを開封・送付し、大親友（100,000 XP）やキラフレンドを目指す。\n• トレードウィークエンド：100km以上離れた場所のポケモンを交換し、アメXLを確定で1個入手。\n• キラフレンド確定交換：伝説や色違いを交換し、個体値12/12/12以上＆強化すな50%割引を狙う。",
          ru: "Популярные социальные традиции тренеров:\n• Friendship Friday: Массовый обмен подарками (до 30–40 в день) для прокачки Best Friends (100,000 XP) и Lucky Friends.\n• Trade Weekends: Обмен покемонами с дистанцией 100+ км дает гарантированную 1 Candy XL обоим игрокам!\n• Lucky Friend Trades: Обмен легендарных и шайни покемонов с гарантией минимум 12/12/12 IV и скидкой 50% на пыль."
        },
        tips: {
          cs: [
            "Pro nalezení Pokémonů pro distance trade zadejte do vyhledávání: 'distance100-'",
            "Při levelování na Ultra Friends (50k XP) a Best Friends (100k XP) se s kamarádem domluvte a zapněte Lucky Egg na dvojnásobek XP!"
          ],
          en: [
            "Use search filter 'distance100-' in your Pokémon storage to instantly find eligible long-distance trades for guaranteed Candy XL.",
            "Coordinate with friends before hitting Ultra (50k XP) or Best Friends (100k XP) to pop a Lucky Egg for 100k/200k XP bursts!"
          ],
          ja: [
            "距離100km以上のポケモンを抽出するには検索欄に「距離100-」と入力してください。",
            "親友（5万XP）や大親友（10万XP）になる直前に「しあわせタマゴ」を使い、XPを2倍獲得しましょう！"
          ],
          ru: [
            "Используйте фильтр 'distance100-' для поиска покемонов с гарантированной Candy XL при трейде.",
            "Договаривайтесь с друзьями и включайте Lucky Egg перед повышением уровня дружбы (до 200k XP)."
          ]
        }
      },
      {
        id: "collector-showcase-events",
        heading: {
          cs: "4. Sběratelské eventy: Spotlight Hour a PokéStop Showcases (Čt–Ne)",
          en: "4. Collector Events: Spotlight Hour & PokéStop Showcases (Thu–Sun)",
          ja: "4. コレクション系：スポットライトアワー＆ポケストップおひろめ（木〜日）",
          ru: "4. Коллекционные ивенты: Spotlight Hour и PokéStop Showcases (Чт–Вс)"
        },
        content: {
          cs: "Dvě hlavní týdenní sběratelské disciplíny:\n• Spotlight Hour (Úterý 18:00–19:00): Přesně 60 minut masivních spawnů jednoho Pokémona s 1 z 5 rotujících bonusů (2x Stardust, 2x XP, 2x Catch Candy, 2x Transfer Candy, 2x Evolve XP). Při bonusu 2x Stardust na Pokémonech se základním vysokým Stardustem (např. Paras, Meowth, Shellder, Foongus) lze s Star Piece vydělat až 300 000+ Stardustu za hodinu!\n• PokéStop Showcases (Čtvrtek až Neděle/Pondělí): Soutěže o největší a nejtěžší exempláře (XXL) u vybraných PokéStopů. Výhra 1. místa garantuje prémiové odměny: Incubators, Star Pieces, Lucky Eggs, Lure Moduly a 10 000 XP!",
          en: "Two primary collector opportunities each week:\n• Spotlight Hour (Tuesdays 6:00–7:00 PM): 60 minutes of intensive spawns featuring 1 of 5 rotating bonuses. Stardust-rich species (Paras, Meowth, Shellder, Foongus, Staryu) combined with Star Piece yield over 300,000+ Stardust in a single hour!\n• PokéStop Showcases (Thursday to Sunday/Monday): Size competitions (XXL/XXS) hosted at PokéStops. Placing 1st awards premium rewards: Incubators, Star Pieces, Lucky Eggs, Lure Modules, and 10,000 XP!",
          ja: "毎週の2大コレクションイベント：\n• スポットライトアワー（火曜18:00〜19:00）：特定ポケモンの大量発生と5種のローテーションボーナス。すな増加ポケモン（パラス、ニャース、シェルダー、タマゲタケ等）なら1時間で30万以上のすなを獲得可能。\n• ポケストップおひろめ（木曜〜日・月曜）：XXLサイズの大きさを競うコンテスト。1位になるとふかそうち、ほしのかけら、しあわせタマゴ等の豪華報酬を獲得。",
          ru: "Два ключевых коллекционных события:\n• Spotlight Hour (Вт 18:00–19:00): 60 минут массового спавна с бонусом. На покемонах с базовой повышенной пылью (Paras, Meowth, Foongus) можно собрать 300k+ пыли за час!\n• PokéStop Showcases (Чт–Вс/Пн): Соревнования на размер XXL. 1-е место дает инкубаторы, Star Piece, Lucky Egg и 10,000 XP!"
        },
        tips: {
          cs: [
            "Před Spotlight Hour si vyčistěte batoh na Pokémony a naučte se Fast Catch techniku pro chytání 400–600 kusů za hodinu.",
            "Nikdy neposílejte pryč XXL Pokémony — uložte si je do tagu 'Showcase' pro budoucí soutěže!"
          ],
          en: [
            "Clear storage space before Spotlight Hour and master the Fast Catch trick to catch 400–600 Pokémon per hour.",
            "Tag all caught XXL Pokémon under a dedicated 'Showcase' tag instead of transferring them for future competitions."
          ],
          ja: [
            "スポットライトアワー前にボックスを空け、ファストキャッチを使って1時間で400〜600匹捕獲しましょう。",
            "XXLポケモンは博士に送らず「おひろめ用」タグをつけて保存しておきましょう。"
          ],
          ru: [
            "Очистите хранилище перед Spotlight Hour и используйте Fast Catch для поимки 400–600 покемонов в час.",
            "Сохраняйте всех XXL покемонов под тегом 'Showcase' для будущих побед!"
          ]
        }
      },
      {
        id: "daily-trainer-habits",
        heading: {
          cs: "5. Každodenní trenérské mikro-rutiny (Daily Incense, 50 PokéCoins a Streaks)",
          en: "5. Daily Trainer Micro-Routines (Daily Incense, 50 PokéCoins & Streaks)",
          ja: "5. 毎日のトレーナールーティン（おさんぽおこう、50ポケコイン、デイリーストリーク）",
          ru: "5. Ежедневные рутины тренера (Daily Incense, 50 монет и серии дней)"
        },
        content: {
          cs: "Pro maximální herní zisk provádějte každý den tyto 4 základní rutiny:\n1. Daily Adventure Incense (15 minut): Denní bezplatné kadidlo fungující při chůzi v přímém směru. Šance na setkání s legendárními Galarian Birds (Articuno, Zapdos, Moltres) a vzácnými divokými evolucemi.\n2. 50 PokéCoins denní limit: Umístěte obránce do 2–3 Gymů (ideálně večer). 50 coinů denně = 1 500 coinů měsíčně zdarma pro nákup Storage Upgrade a Remote Raid Passů.\n3. 7denní Catch & Spin Streaks: První chycený Pokémon a první protočený PokéStop každý den. Na 7. den získáte obrovský bonus XP, Stardustu a garantovaný Evolution Item (Sinnoh Stone, King's Rock, Dragon Scale atd.).\n4. Team GO Rocket balóny: Přilétají každých 6 hodin (00:00, 06:00, 12:00, 18:00 lokálního času).",
          en: "Four essential daily habits for consistent progress:\n1. Daily Adventure Incense (15 mins): Free daily incense requiring active walking. Features rare wild spawns and exclusive Galarian Birds (Articuno, Zapdos, Moltres).\n2. 50 Daily PokéCoins: Defend Gyms daily (best placed in the evening). 50 coins/day = 1,500 free monthly coins for Storage upgrades and Raid Passes.\n3. 7-Day Catch & Spin Streaks: Daily first catch and first PokéStop spin. Day 7 streak grants massive XP/Stardust and a guaranteed Evolution Item.\n4. Team GO Rocket Balloons: Spawn every 6 hours (00:00, 06:00, 12:00, 18:00 local time).",
          ja: "毎日行うべき4つの基本習慣：\n1. おさんぽおこう（15分）：歩行時にガラルフリーザー・サンダー・ファイヤー等の激レアが出現。\n2. 1日50ポケコイン：ジム防衛で月間最大1,500コイン（ボックス拡張やパス購入用）獲得。\n3. 7日間デイリーストリーク：7日目に大量XP、すな、確定しんかのいしを入手。\n4. ロケット団気球：6時間おき（00:00、06:00、12:00、18:00）に出現。",
          ru: "Четыре обязательных ежедневных действия:\n1. Daily Adventure Incense (15 мин): Бесплатный ладан при ходьбе с шансом на Galarian Birds.\n2. 50 монет в день: Защита гимов дает до 1,500 монет в месяц на слоты и пассы.\n3. Серия из 7 дней (Catch & Spin): На 7-й день дается куча XP, пыли и гарантированный Evolution Item.\n4. Шары Ракеты: Прилетают каждые 6 часов (00:00, 06:00, 12:00, 18:00)."
        },
        tips: {
          cs: [
            "Při spuštěném Daily Adventure Incense jděte svižnou chůzí po přímce — Pokémon se objeví přibližně každých 30 sekund / 50 metrů.",
            "U Galarian Birds použijte Golden Razz Berry + Ultra Ball + točený Excellent hod. Pokud máte Master Ball, Galarian Birds jsou jedním z nejlepších cílů!"
          ],
          en: [
            "Walk rapidly in a straight line during Daily Incense — a new Pokémon spawns roughly every 30 seconds / 50 meters.",
            "For Galarian Birds, use Golden Razz Berry + Ultra Ball + curved Excellent throw. They are also premier targets for your Master Ball!"
          ],
          ja: [
            "おさんぽおこう使用中は直線方向に素早く歩くと、約30秒（50m）ごとにポケモンが出現します。",
            "ガラル三鳥遭遇時は「きんのズリのみ」＋「ハイパーボール」＋「エクセレントカーブスロー」か「マスターボール」を使いましょう。"
          ],
          ru: [
            "Идите прямо и бодро при Daily Incense — спавн каждые 30 секунд (50 метров).",
            "На Galarian Birds бросайте Golden Razz + Ultra Ball + Excellent или используйте Master Ball!"
          ]
        }
      },
      {
        id: "pro-search-strings",
        heading: {
          cs: "6. Pro Search Strings: Oficiální vyhledávací zkratky pro rychlé třídění",
          en: "6. Pro Search Strings: Official Quick-Filter Shortcuts for Storage Sorting",
          ja: "6. プロ用検索コマンド：ボックス整理のための公式ショートカット集",
          ru: "6. Pro Search Strings: Официальные поисковые строки для быстрой сортировки"
        },
        content: {
          cs: "Ušetřete hodiny ručního klikání pomocí oficiálních vyhledávacích řetězců v inventáři Pokémonů:\n• 4* – Zobrazí všechny 100% IV perfektní Pokémony (Hundo).\n• 0attack&3-4defense&3-4hp – Najde ideální PvP kandidáty pro Great League a Ultra League.\n• distance100- – Zobrazí Pokémony pro trade s garantovaným Candy XL.\n• tradeevolve – Pokémoni s bezplatnou evolucí po výměně (Machamp, Gengar, Alakazam, Gigalith atd.).\n• xxl,xxs – Všichni extrémní velikostní kandidáti pro PokéStop Showcases.\n• !3*&!4*&!shiny&!legendary&!shadow – Zkratka pro hromadný bezpečný transfer po Community Day / Spotlight Hour.\n• mega1-3 – Všichni Pokémoni s aktivovanou Mega Úrovní.",
          en: "Save hours of manual management using official Pokémon storage search strings:\n• 4* – Displays all 100% IV perfect Pokémon (Hundos).\n• 0attack&3-4defense&3-4hp – Locates prime PvP candidates for Great and Ultra League.\n• distance100- – Shows Pokémon caught 100+ km away for guaranteed Candy XL trading.\n• tradeevolve – Free evolution Pokémon when traded (Machoke, Haunter, Kadabra, Boldore, etc.).\n• xxl,xxs – Extreme size Pokémon for PokéStop Showcases.\n• !3*&!4*&!shiny&!legendary&!shadow – Safe bulk-transfer shortcut after Community Day / Spotlight Hour.\n• mega1-3 – All Pokémon with an unlocked Mega Level.",
          ja: "ボックス整理を劇的に効率化する公式検索コマンド集：\n• 4* – 個体値100%（Hundo）を全表示。\n• 0attack&3-4defense&3-4hp – スーパー／ハイパーリーグ用のPvP理想個体を抽出。\n• 距離100- – アメXL確定交換用の長距離捕獲ポケモン。\n• 交換進化 – トレード後にアメ0個で進化可能なポケモン（ゴーリキー、ゴースト等）。\n• xxl,xxs – ポケストップおひろめ用サイズ。\n• !3*&!4*&!色違い&!伝説&!シャドウ – イベント後の安全な一括博士送りフィルター。\n• メガ1-3 – メガレベルが解放されているポケモン。",
          ru: "Поисковые строки для быстрой сортировки хранилища:\n• 4* – Все 100% IV покемоны (Hundo).\n• 0attack&3-4defense&3-4hp – Топовые кандидаты для Great и Ultra PvP лиг.\n• distance100- – Покемоны для гарантированной Candy XL при трейде.\n• tradeevolve – Покемоны с бесплатной эволюцией после обмена.\n• xxl,xxs – Кандидаты для PokéStop Showcases.\n• !3*&!4*&!shiny&!legendary&!shadow – Безопасный фильтр для массовой отправки профессору.\n• mega1-3 – Все покемоны с прокачанным Mega Level."
        },
        tips: {
          cs: [
            "Vyhledávací řetězce si můžete v Pokémon GO uložit jako oblíbené zkratky (Favorite Searches) kliknutím na 'See More' -> podržte prst na vyhledávání!",
            "Zkombinujte 'age0&!4*&!shiny' pro zobrazení všech dnešních běžných úlovků určených ke smazání."
          ],
          en: [
            "Save these strings under 'Favorite Searches' in Pokémon GO by tapping Search -> 'See More' -> long-press recent search!",
            "Use 'age0&!4*&!shiny' to instantly display all of today's non-rare catches ready for bulk transfer."
          ],
          ja: [
            "検索欄の「その他」から長押しでお気に入り検索に保存できます。",
            "「本日&!4*&!色違い」で本日の不要な捕獲分を一発表示できます。"
          ],
          ru: [
            "Сохраняйте строки в Favorite Searches через долгое нажатие в поиске.",
            "Используйте 'age0&!4*&!shiny' для быстрой чистки сегодняшних уловов."
          ]
        }
      }
    ]
  },
  {
    id: "rocket-leaders-giovanni-guide",
    slug: "rocket-leaders-giovanni-guide",
    iconName: "Shield",
    imageUrl: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?q=80&w=800&auto=format&fit=crop",
    featured: false,
    author: "PoGo Events Team",
    readTime: "8 min",
    updatedAt: "2026-08-15",
    category: {
      cs: "Team GO Rocket",
      en: "Team GO Rocket",
      ja: "GOロケット団",
      ru: "Команда GO Ракета"
    },
    title: {
      cs: "Kompletní průvodce Team GO Rocket: Jak porazit Lídry a Giovanniho",
      en: "Ultimate Team GO Rocket Guide: How to Beat Leaders & Giovanni",
      ja: "GOロケット団完全攻略：リーダーとサカキを倒す戦略",
      ru: "Полный гайд по Команде GO Ракета: Как победить Лидеров и Джованни"
    },
    subtitle: {
      cs: "Detailní návod na sestavení nejlepších counterů proti Sierra, Arlo, Cliffovi a šéfovi Giovanni. Získejte stínové legendární Pokémony a odstraňte útok Frustration.",
      en: "Detailed counters guide against Sierra, Arlo, Cliff, and boss Giovanni. Catch legendary Shadow Pokémon, master stun mechanics, and remove Frustration.",
      ja: "シエラ、アルロ、クリフ、サカキを撃破するための最適なカウンター編成とシャドウ伝説ポケモンの入手方法および「やつあたり」消去法。",
      ru: "Подробный гайд по выбору контеров против Сиерры, Арло, Клиффа и босса Джованни. Забирайте теневых легенд и снимайте атаку Frustration."
    },
    sections: [
      {
        id: "intro",
        heading: {
          cs: "Úvod do bojů s Team GO Rocket a 'Stun' mechanika",
          en: "Introduction to Team GO Rocket Battles & The Stun Window",
          ja: "GOロケット団バトルへの招待と硬直時間（スタン）",
          ru: "Введение в битвы с Командой GO Ракета и механика оглушения"
        },
        content: {
          cs: "Team GO Rocket obsazuje PokéStopy a každých 6 hodin přilétá v horkovzdušných balónech (00:00, 06:00, 12:00, 18:00). Porážkou 6 řadových členů (Grunts) sestavíte Rocket Radar pro nalezení lídrů Sierry, Cliffa a Arla.\nKlíčová mechanika: Po každém nabitém útoku (Charged Move) a po každé výměně Pokémona se soupeřův Pokémon na 2–2.5 sekundy zastaví a vůbec neútočí! Tento čas využijte k bezpečnému nabití dalšího útoku.",
          en: "Team GO Rocket invades PokéStops and operates balloons every 6 hours (00:00, 06:00, 12:00, 18:00). Defeating 6 Grunts creates a Rocket Radar to track Leaders Sierra, Cliff, and Arlo.\nCrucial Mechanic: After every Charged Attack or Pokémon switch, the Rocket AI pauses for 2–2.5 seconds without attacking! Use this stun window to farm fast energy safely.",
          ja: "GOロケット団はポケストップを占拠し、6時間おき（0:00、6:00、12:00、18:00）に気球で出現します。下っ端（Grunts）を6体倒すとロケットレーダーが完成し、リーダー（シエラ、クリフ、アルロ）と戦えます。\n重要テクニック：スペシャルアタック発動後およびポケモン交代後、敵の攻撃が約2〜2.5秒間完全に停止します。この硬直時間を利用して通常技エネルギーを安全に溜めましょう。",
          ru: "Команда GO Ракета захватывает покестопы и прилетает на шарах каждые 6 часов. Победа над 6 пешками дает Rocket Radar для поиска лидеров.\nГлавная механика: После каждого Charged Move или смены покемона бот замирает на 2–2.5 секунды. Используйте это для зарядки энергии!"
        },
        tips: {
          cs: [
            "Nikdy nezačínejte boj se svým hlavním útočníkem na 1. pozici — dejte ho na 2. pozici a okamžitě na začátku bitvy ho vyměňte do hry pro aktivaci 2sekundového stunu!",
            "Lídři a Giovanni vždy spotřebují své 2 štíty na vaše první 2 Charged útoky. Používejte spamovací útoky jako Power-Up Punch, Cross Chop, Dragon Claw nebo Aqua Tail!"
          ],
          en: [
            "Never start with your main carry in slot 1 — put it in slot 2 and instantly swap to it at the start of battle to trigger a free 2-second stun!",
            "Leaders and Giovanni always shield your first 2 charged attacks. Lead with rapid shield-breakers like Power-Up Punch, Cross Chop, Dragon Claw, or Aqua Tail!"
          ],
          ja: [
            "主力ポケモンを1番目に置かず、2番目に配置してバトル開始直後に即交代することで、開幕2秒の硬直時間を発動させましょう！",
            "リーダーとサカキは最初の2回の技に必ずシールドを使います。グロウパンチ、クロスチョップ、ドラゴンクロー等で早急に割ってください。"
          ],
          ru: [
            "Ставьте главного бойца во 2-й слот и делайте мгновенную смену в начале боя для получения 2 сек стана!",
            "Лидеры всегда тратят оба щита на первые 2 атаки. Сбивайте их быстрыми Power-Up Punch, Cross Chop или Aqua Tail!"
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
          cs: "Každý lídr má stálého 1. Pokémona, kterého po výhře můžete chytit v Shiny Shadow formě. Doporučení:\n• Sierra: Vynikající bojový typ (Lucario s Counter + Power-Up Punch nebo Machamp s Cross Chop) pro okamžité stržení štítů a Ghost/Dark counter (Tyranitar, Hydreigon).\n• Cliff: Využijte Grass/Water (Swampert s Mud Shot + Hydro Cannon, Kartana, Zarude) a Fighting/Ground pro jeho těžké tanky.\n• Arlo: Skvěle fungují Fire a Rock typy (Rhyperior s Smack Down, Reshiram, Heatran, Charizard).",
          en: "Each leader features a fixed lead that can be caught in Shiny Shadow form. Recommended setups:\n• Sierra: Fighting-type (Lucario with Counter + Power-Up Punch or Machamp with Cross Chop) to burn shields, backed by Dark/Ghost (Tyranitar, Hydreigon).\n• Cliff: Grass/Water specialist (Swampert with Mud Shot + Hydro Cannon, Kartana) plus Ground/Fighting for heavy coverage.\n• Arlo: Fire and Rock powerhouses (Rhyperior with Smack Down + Rock Wrecker, Reshiram, Heatran, Tyranitar).",
          ja: "各リーダーの攻略編成：\n• シエラ：かくとう枠（カウンター＋グロウパンチのルカリオ、カイリキー）でシールドを剥がし、あく・ゴースト（バンギラス、サザンドラ）で追撃。\n• クリフ：みず・くさ枠（ラグラージ、カミツルギ）およびじめん・かくとうで高耐久ポケモンを撃破。\n• アルロ：ほのお・いわ枠（ドサイドン、レシラム、ヒードラン）が最適。",
          ru: "Сетапы против Лидеров:\n• Sierra: Lucario (Counter + Power-Up Punch) или Machamp для сбития щитов, затем Tyranitar или Hydreigon.\n• Cliff: Swampert (Hydro Cannon), Kartana и бойцы земляного/боевого типа.\n• Arlo: Огненные и каменные покемоны (Rhyperior, Reshiram, Heatran)."
        }
      },
      {
        id: "giovanni",
        heading: {
          cs: "Jak porazit Šéfa Giovanniho & Odstranění Frustration",
          en: "How to Defeat Boss Giovanni & Removing Frustration",
          ja: "ボス・サカキの倒し方＆「やつあたり」の消去法",
          ru: "Как победить Босса Джованни и убрать атаку Frustration"
        },
        content: {
          cs: "Giovanniho vyhledáte pomocí Super Rocket Radaru. Vždy začíná s Persianem s extrémně rychlým normálním útokem (Scratch/Feint Attack). Na 1. pozici nasaďte Lucaria s Power-Up Punch, který Persianovi strhne oba štíty a díky stunu ho zničí dřív, než vám ublíží. Třetí slot je aktuální Shadow Legendary (např. Shadow Rayquaza, Shadow Mewtwo, Shadow Groudon).\nOdstranění Frustration: Shadow Pokémoni mají zablokovaný útok Frustration, který nelze přepsat běžným TM. Lze ho změnit pouze během speciálních 'Team GO Rocket Takeover' eventů pomocí Charged TM!",
          en: "Locating Giovanni requires a Super Rocket Radar. He always leads with Persian equipped with high-damage Fast Attacks (Scratch/Feint Attack). Use Lucario with Counter + Power-Up Punch to strip both shields while locking Persian in stun frames. His final slot is the featured Shadow Legendary.\nRemoving Frustration: Shadow Pokémon spawn with the unviable Charged Move Frustration. It can ONLY be unlearned during official 'Team GO Rocket Takeover' events using a standard Charged TM!",
          ja: "サカキはスーパーロケットレーダーで追跡します。1体目のペルシアンは「ひっかく」のダメージが高いため、ルカリオ（カウンター＋グロウパンチ）で即座にシールドを割りつつスタンループで倒しましょう。3体目は期間限定のシャドウ伝説です。\n「やつあたり」の消去：シャドウポケモンが覚えている「やつあたり」は、定期開催される「ロケット団占拠イベント」期間中のみ「わざマシンスペシャル」で変更可能です！",
          ru: "Джованни отслеживается через Super Rocket Radar. Первый покемон — Persian. Используйте Lucario с Power-Up Punch для быстрого сбития щитов и стана. В 3 слоте — Теневой Легендарный босс.\nСнятие Frustration: Атаку Frustration у теневых покемонов можно стереть обычным Charged TM ТОЛЬКО во время ивентов Team GO Rocket Takeover!"
        },
        tips: {
          cs: [
            "Během Rocket Takeover eventu zadejte do vyhledávání: 'shadow&@frustration' a změňte útok všem svým nejlepším Shadow Pokémonům!",
            "Shadow Pokémoni mají +20% Attack bonus (a -20% Defense). Jsou to nejsilnější útočníci do raidů ve hře!"
          ],
          en: [
            "During Rocket Takeover events, filter by 'shadow&@frustration' and use Charged TMs on all top-tier Shadow attackers!",
            "Shadow Pokémon receive a permanent +20% Attack bonus (at cost of -20% Defense), making them the premier DPS monsters in PvE raids!"
          ],
          ja: [
            "占拠イベント開始時に「シャドウ&@やつあたり」で検索し、主力ポケモンの技を全て変更しましょう！",
            "シャドウポケモンは攻撃力が+20%（防御-20%）されるため、レイドバトルで最強のアタッカーになります。"
          ],
          ru: [
            "Во время Takeover введите 'shadow&@frustration' и смените атаку всем лучшим теневым покемонам!",
            "Теневые покемоны имеют +20% к Атаке, что делает их лучшими дамагерами для рейдов!"
          ]
        }
      }
    ]
  },
  {
    id: "raid-battles-counter-guide",
    slug: "raid-battles-counter-guide",
    iconName: "Swords",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
    featured: false,
    author: "PoGo Events Team",
    readTime: "8 min",
    updatedAt: "2026-08-15",
    category: {
      cs: "Raid Battles",
      en: "Raid Battles",
      ja: "レイドバトル",
      ru: "Рейдовые Битвы"
    },
    title: {
      cs: "Průvodce Raid Battles: Výběr nejlepších counterů, Party Power a výpočet CP 100% IV",
      en: "Raid Battles Master Guide: Optimal Counters, Party Power & 100% IV CP",
      ja: "レイドバトルマスターガイド：最適カウンター、パーティパワー、100% IV判別",
      ru: "Мастер-гайд по Рейдам: Контеры, Party Power и CP 100% IV"
    },
    subtitle: {
      cs: "Kompletní mechaniky typových slabostí, Weather Boost, Party Play 2× bonusu na Charged útoky a jak okamžitě poznat 100% IV bosse při chytání.",
      en: "Master type matchups, Weather Boost multipliers, Party Play 2x Charged Move bonuses, and identify 100% IV Perfect Combat Power at the catch screen.",
      ja: "タイプ相性、天候ブースト倍率、チームコラボの2倍技威力ボーナス、ゲットチャレンジ時の100% IV個体値判別法を徹底解説。",
      ru: "Механика уязвимостей, Weather Boost, удвоенный урон Party Play и мгновенное определение 100% IV босса при поимке."
    },
    sections: [
      {
        id: "raid-types",
        heading: {
          cs: "Úrovně Raidů, Weather Boost a Catch CP",
          en: "Raid Tiers, Weather Boost & Catch CP Calculation",
          ja: "レイドランク、天候ブースト、捕獲時CPの仕組み",
          ru: "Уровни Рейдов, Погодный Буст и CP при поимке"
        },
        content: {
          cs: "Raidy se dělí na 1★, 3★, 5★ (Legendary), Mega, Ultra Beasts a Shadow Raidy. Boss má při chytání standardně Level 20. Pokud je však aktivní odpovídající počasí (Weather Boost), chycený Pokémon má Level 25, vyšší CP a garantované minimální IV statistiky (10/10/10 v raidech, Weather Boost zaručuje vyšší základ). V naší sekci 'Raids' vidíte přesné minimální a maximální (100% IV) CP pro obě úrovně.",
          en: "Raid tiers span 1★, 3★, 5★ (Legendary), Mega, Ultra Beasts, and Shadow Raids. Bosses are caught at Level 20 under standard conditions. Under matching Weather Boost, bosses appear at Level 25 with elevated CP and IV floors (10/10/10 minimum). Check our 'Raids' tab for exact non-boosted (Lvl 20) and boosted (Lvl 25) 100% IV CP ranges.",
          ja: "レイドには1★、3★、5★（伝説）、メガレイド、ウルトラビースト、シャドウレイドが存在します。通常時はレベル20で出現しますが、天候ブースト時はレベル25となり高CPで捕獲可能です。当サイトの「Raids」タブで通常時・ブースト時の個体値100% CPを確認してください。",
          ru: "Рейды делятся на 1★, 3★, 5★ (Легендарные), Мега и Теневые. Обычный босс ловится на 20 уровне, а с Weather Boost — на 25 уровне с повышенным CP. Проверяйте диапазоны CP 100% IV в разделе 'Raids'."
        },
        tips: {
          cs: [
            "Weather Boost navíc zvyšuje útočnou sílu útoků daného typu o +20% během samotného boje!",
            "Při chytání házejte Circle Lock technikou (točený Excellent hod do uzamčeného kruhu) + Golden Razz Berry pro maximální šanci na chycení."
          ],
          en: [
            "Weather Boost additionally increases matching attack damage output by +20% during the raid battle!",
            "Use the Circle Lock technique with Golden Razz Berry and Curved Excellent Throws to achieve 90%+ catch rates on legendaries."
          ],
          ja: [
            "天候ブースト適用中の技は、バトル中に威力が+20%上昇します！",
            "サークル固定投法（Circle Lock）ときんのズリのみでエクセレントカーブを狙い、捕獲率を最大化しましょう。"
          ],
          ru: [
            "Погодный буст увеличивает урон атак соответствующего типа на +20% в бою!",
            "Используйте технику Circle Lock + Golden Razz Berry + Excellent бросок для поимки босса."
          ]
        }
      },
      {
        id: "party-play-boost",
        heading: {
          cs: "Party Play & Friendship Damage Multipliery",
          en: "Party Play & Friendship Damage Multipliers",
          ja: "チームコラボ（Party Play）とフレンドダメージ倍率",
          ru: "Party Play и Множители Урона от Друзей"
        },
        content: {
          cs: "V moderním Pokémon GO lze útočnou sílu týmu dramaticky znásobit pomocí dvou mechanik:\n1. Party Play (Party Power): Když v raidu bojujete v partě (2–4 trenéři), každým rychlým útokem nabíjíte spodní Party Power kruh. Po jeho stisknutí váš další Charged Move udělí masivní 2× (DVOJNÁSOBNÉ) poškození! To umožňuje porazit i nejtěžší 5★ bosse ve 2 lidech.\n2. Friendship Attack Bonus: Boj s přáteli dává trvalý bonus k poškození: Good Friend (+3%), Great Friend (+5%), Ultra Friend (+7%), Best Friends (+10% poškození!).",
          en: "Modern raid DPS can be massively amplified through two synergistic mechanics:\n1. Party Play (Party Power): Raiding in a party (2–4 players) charges the Party Power gauge with fast attacks. Tapping it makes your next Charged Move deal 2x (DOUBLE) damage! This allows duos to defeat even 5★ legendaries.\n2. Friendship Attack Boost: Raiding alongside friends grants permanent damage boosts: Good (+3%), Great (+5%), Ultra (+7%), Best Friends (+10% bonus damage!).",
          ja: "レイドの討伐速度を極限まで高める2大システム：\n1. チームコラボ（Party Power）：2〜4人でパーティを組んでレイドに入ると、通常技でゲージが溜まり、ボタンタップで次のスペシャルアタックが【2倍ダメージ】になります！2人での伝説討伐も容易になります。\n2. フレンドアタックボーナス：フレンドと一緒に戦うと与ダメージが増加（大親友で+10%！）。",
          ru: "Два способа кардинально повысить урон в рейдах:\n1. Party Play (Party Power): В группе из 2–4 игроков заряжается Party Power, дающий 2x УРОН на следующий Charged Move!\n2. Бонус Дружбы: Best Friends дают +10% к урону на протяжении всего боя."
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
    readTime: "7 min",
    updatedAt: "2026-08-15",
    category: {
      cs: "Události & Eventy",
      en: "Events & Festivals",
      ja: "イベントガイド",
      ru: "События и Ивенты"
    },
    title: {
      cs: "Spotlight Hour a Community Day: Jak vytěžit maximum z herních bonusů a Fast Catch",
      en: "Spotlight Hour & Community Day Master Strategy: Maximum Bonuses & Fast Catch",
      ja: "スポットライトアワー＆コミュニティ・デイ攻略：ボーナス最大化とファストキャッチ",
      ru: "Spotlight Hour и Community Day: Максимизация бонусов и техника Fast Catch"
    },
    subtitle: {
      cs: "Příprava před eventem, spravování Mega Evolucí pro bonusové Candy XL, zvládnutí techniky Fast Catch a oficiální vyhledávací filtry.",
      en: "Pre-event preparation, Mega Evolution Candy XL farming, mastering the Fast Catch technique, and post-event inventory cleanup filters.",
      ja: "事前準備、メガシンカによるアメXLドロップ率アップ、ファストキャッチ（高速捕獲）実践、イベント後の一括整理フィルター。",
      ru: "Подготовка к ивенту, Мега-Эволюции для фарминга Candy XL, техника Fast Catch и фильтры для быстрой сортировки."
    },
    sections: [
      {
        id: "spotlight-basics",
        heading: {
          cs: "5 rotujících bonusů ve Spotlight Hour a jejich kombinace",
          en: "5 Rotating Spotlight Bonuses & Optimal Stacking",
          ja: "スポットライトアワーの5大ローテーションボーナスと重ねがけ",
          ru: "5 ротирующихся бонусов Spotlight Hour и их умножение"
        },
        content: {
          cs: "Spotlight Hour (každé úterý 18:00–19:00) rotuje 5 typů bonusů:\n1. 2× Catch Stardust: Nejhodnotnější bonus! V kombinaci se Star Piece získáte 3× Stardust (např. 1 500+ Stardustu za 1 chyceného Shelldera/Parase!).\n2. 2× Catch XP: Zapněte Lucky Egg a házejte Excellent Throws pro 4 000+ XP za každého chyceného Pokémona.\n3. 2× Catch Candy: Aktivujte Mega Pokémona stejného typu na Max Mega Levelu pro zisk až 7–8 Candy a bonusových Candy XL z každého úlovku.\n4. 2× Transfer Candy: Ideální pro hromadné promazání nechtěných legendárních bossů a vzácných Pokémonů.\n5. 2× Evolve XP: V kombinaci s Lucky Egg dává 4 000 XP za každou evoluci (vhodné pro evoluce Pidgey/Wurmple/Caterpie).",
          en: "Spotlight Hour (Tuesdays 6:00–7:00 PM) cycles through 5 major bonuses:\n1. 2x Catch Stardust: Top tier! Stack with Star Piece for 3x Stardust earnings (1,500+ Stardust per Shellder/Paras/Foongus catch!).\n2. 2x Catch XP: Stack with Lucky Egg + Excellent Throws for 4,000+ XP per catch.\n3. 2x Catch Candy: Pair with a Max Level Mega Evolution of matching type for 7–8 Candy and high Candy XL drops.\n4. 2x Transfer Candy: Perfect for clearing out stored legendary raid bosses and rare species.\n5. 2x Evolve XP: Stacks with Lucky Egg for 4,000 XP per evolution (great for mass evolving 12-candy species).",
          ja: "スポットライトアワー（毎週火曜18:00〜19:00）の5大ボーナス：\n1. 捕獲時ほしのすな2倍：ほしのかけらと併用で3倍（パラスやシェルダーなら1匹1,500以上！）。\n2. 捕獲時XP2倍：しあわせタマゴ＋エクセレントスローで1匹4,000 XP。\n3. 捕獲時アメ2倍：同タイプのメガシンカ併用でアメ大量獲得。\n4. 博士送り時アメ2倍：伝説やレアポケモンの一括整理に最適。\n5. 進化時XP2倍：しあわせタマゴ併用で1進化4,000 XP獲得。",
          ru: "5 бонусов Spotlight Hour (каждый вторник 18:00–19:00):\n1. 2x Catch Stardust: Со Star Piece дает 3x пыли (1,500+ за Shellder/Paras).\n2. 2x Catch XP: С Lucky Egg и Excellent броском дает 4,000+ XP.\n3. 2x Catch Candy: Включайте Мега покемона того же типа для максимума Candy XL.\n4. 2x Transfer Candy: Для чистки легендарных и редких покемонов.\n5. 2x Evolve XP: С Lucky Egg дает 4,000 XP за каждую эволюцию."
        }
      },
      {
        id: "fast-catch-guide",
        heading: {
          cs: "Technika Fast Catch (Zrychlené chytání): Jak chytat 500+ za hodinu",
          en: "Fast Catch Technique: Catch 500+ Pokémon Per Hour",
          ja: "ファストキャッチ（高速捕獲法）：1時間500匹捕獲の技術",
          ru: "Техника Fast Catch: Ловите 500+ покемонов в час"
        },
        content: {
          cs: "Fast Catch přeskočí 10sekundovou animaci chytání a umožní chytat Pokémona za 2 sekundy:\n1. Jedním prstem potáhněte ikonu Pokéballu (nebo Berry) mírně doleva a DRŽTE prst na displeji.\n2. Druhým prstem roztočte a hoďte Pokéball na Pokémona.\n3. Jakmile Pokéball zasáhne Pokémona, pusťte první prst a okamžitě klikněte na ikonu 'Útěk' (Run away v levém horním rohu).\n4. Pokémon je buď okamžitě chycen v inventáři, nebo vyskočil a můžete ho zkusit znovu!",
          en: "Fast Catch skips the 10-second catch animation, enabling 2-second capture cycles:\n1. With one finger, drag the Pokéball (or Berry) icon slightly to the left and HOLD your finger down on screen.\n2. With another finger, spin and throw your Pokéball at the Pokémon.\n3. The moment the ball connects, release the first finger and immediately tap the 'Run' (Escape) button in the top-left corner.\n4. You exit instantly to the map; the Pokémon is already caught in your storage!",
          ja: "ファストキャッチは捕獲演出（約10秒）をスキップし、2秒で捕獲を完了するテクニックです：\n1. 片方の指でボールアイコン（またはきのみアイコン）を左側に引っ張ったまま画面を押さえ続けます。\n2. もう片方の指でボールを投げてポケモンに当てます。\n3. ボールが当たった瞬間に指を離し、左上の「逃げる」ボタンをタップします。\n4. マップ画面に即復帰し、ボックス内にポケモンが捕獲されています！",
          ru: "Fast Catch пропускает 10-секундную анимацию поимки:\n1. Одним пальцем оттяните и удерживайте иконку покебола влево.\n2. Вторым пальцем бросайте покебол в покемона.\n3. Как только покебол попал, отпустите палец и жмите 'Сбежать' (кнопка в левом верхнем углу).\n4. Вы выходите на карту, а покемон уже в хранилище!"
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
    readTime: "6 min",
    updatedAt: "2026-08-15",
    category: {
      cs: "Základy & Mechaniky",
      en: "Game Mechanics",
      ja: "ゲームメカニクス",
      ru: "Механика игры"
    },
    title: {
      cs: "Rozbor IV, CP a Hodnocení (Appraise): PvE 100% vs PvP ideální IV",
      en: "Understanding IVs, CP & Appraisal: PvE 100% vs PvP Ideal IV Spreads",
      ja: "IV（個体値）、CP、評価システム：PvE用100%とPvP用理想個体値の違い",
      ru: "Разбор IV, CP и Appraise: PvE 100% против идеальных PvP характеристик"
    },
    subtitle: {
      cs: "Vše o skrytých statistikách Attack, Defense, Stamina a proč je v Great/Ultra League nejlepší mít 0 Attack a 15 Defense/HP.",
      en: "Deep dive into hidden stats (Attack, Defense, Stamina) and why low Attack (0/15/15) is mathematically superior in Great and Ultra PvP leagues.",
      ja: "攻撃・防御・HPの隠しステータス解説と、スーパー／ハイパーリーグで低攻撃（0/15/15）が最強とされる数学的理由。",
      ru: "Все о параметрах Attack, Defense, Stamina и почему в Great и Ultra лигах идеален низкий Attack (0/15/15)."
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
          cs: "Každý Pokémon má 3 skryté IV vlastnosti v rozmezí 0–15: Attack, Defense a Stamina (HP). Tyto hodnoty se přičítají k základním statům druhu (Base Stats). Pokémon s hodnotami 15/15/15 se označuje jako 4★ neboli 100% IV (Hundo).\nPro PvE (Raidy, Gymy, Team Rocket) je VŽDY nejlepší mít 100% IV (15/15/15) nebo 15 Attack, protože v raidech není žádný CP limit.",
          en: "Every Pokémon possesses 3 hidden IV values (0–15): Attack, Defense, and Stamina (HP), added on top of species base stats. A 15/15/15 Pokémon is a 4-Star 100% IV (Hundo).\nFor PvE (Raids, Gyms, Team GO Rocket), 100% IV (15/15/15) is ALWAYS optimal because there is no CP cap in raids.",
          ja: "全てのポケモンには0〜15の隠し個体値（攻撃・防御・HP）が存在します。15/15/15は個体値100%（Hundo）と呼ばれます。\nPvE（レイド、ジム、ロケット団）ではCP制限がないため、常に個体値100%（または攻撃15）が最強です。",
          ru: "У каждого покемона есть 3 скрытых IV параметра (0–15): Attack, Defense, Stamina. 15/15/15 — это 4* 100% IV (Hundo).\nДля PvE (Рейды, Гимы, Ракета) ВСЕГДА идеален 100% IV, так как в рейдах нет лимита CP."
        }
      },
      {
        id: "pvp-iv-mechanics",
        heading: {
          cs: "Proč je v PvP Great/Ultra League nejlepší 0/15/15 IV?",
          en: "Why is 0/15/15 Optimal for Great & Ultra PvP Leagues?",
          ja: "PvP（スーパー／ハイパーリーグ）で0/15/15が最強な理由",
          ru: "Почему в PvP Great/Ultra League лучший IV — 0/15/15?"
        },
        content: {
          cs: "Ve formulaci CP má hodnota Attack dvakrát větší vliv na růst CP než Defense a HP. Pokud má Pokémon nízký Attack (např. 0–2), jeho CP roste pomaleji, což mu umožňuje dosáhnout podstatně vyššího Levelu (a tím pádem mít obrovské množství HP a obrany) před dosažením limitu 1500 CP (Great League) nebo 2500 CP (Ultra League).\nVýjimka: Master League (bez CP limitu) vyžaduje vždy 100% IV (15/15/15).",
          en: "In the CP formula, Attack is weighted twice as heavily as Defense and HP. A low Attack stat (0–2) keeps CP lower per level, allowing the Pokémon to power up to a significantly higher Level—granting massive extra bulk and total Stat Product under the 1,500 CP (Great League) or 2,500 CP (Ultra League) caps!\nException: Master League (no CP cap) strictly requires 100% IV (15/15/15).",
          ja: "CP計算式において、攻撃力は防御やHPの約2倍CPを跳ね上げる重み付けがされています。攻撃個体値を低く（0〜2）抑えるとCPの上昇が緩やかになり、CP 1500や2500の制限内でより高いレベルまで強化でき、結果として耐久力（Stat Product）が最大化されます。\n※マスターリーグ（無制限）では100%個体値（15/15/15）が必須です。",
          ru: "В формуле CP параметр Attack влияет на CP в 2 раза сильнее, чем Defense и HP. Низкий Attack (0–2) позволяет прокачать покемона до более высокого уровня под лимит 1500 CP (Great League) или 2500 CP (Ultra League), что дает максимальную живучесть!\nИсключение: В Master League нужен только 100% IV."
        }
      }
    ]
  },
  {
    id: "mega-dynamax-mechanics-guide",
    slug: "mega-dynamax-mechanics-guide",
    iconName: "Trophy",
    imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop",
    featured: false,
    author: "PoGo Events Team",
    readTime: "8 min",
    updatedAt: "2026-08-15",
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
      cs: "Jak zvýšit Mega Úroveň (Mega Level 3), maximalizovat Candy XL a ovládnout Max Battles u Power Spotů.",
      en: "How to reach Mega Level 3, maximize Candy XL drop rates, and master Max Moves and Dynamax battles at Power Spots.",
      ja: "メガレベル3の育成法、アメXLドロップ率最大化、パワースポットでのマックス技強化とダイマックス攻略。",
      ru: "Как прокачать Mega Level 3, максимизировать Candy XL и побеждать в Max Battles на Power Spot."
    },
    sections: [
      {
        id: "mega-levels",
        heading: {
          cs: "Mega Úrovně (Base, High, Max Level 3) a Candy XL",
          en: "Mega Levels Breakdown (Level 1, 2, 3) & Candy XL Yields",
          ja: "メガレベル（レベル1、2、3）とアメXL獲得率",
          ru: "Уровни Мега-Эволюций (Level 1, 2, 3) и фарминг Candy XL"
        },
        content: {
          cs: "Opakovanou Mega Evolucí jednou denně zvyšujete Mega Úroveň Pokémona:\n• Base Mega Level (1 evoluce): +1 Catch Candy, +50 Catch XP, 7 dní cooldown zdarma.\n• High Mega Level (7 evolucí): +1 Catch Candy, +100 Catch XP, +10% šance na Candy XL, 5 dní cooldown zdarma.\n• Max Mega Level (30 evolucí): +2 Catch Candy, +200 Catch XP, +25% VYNIKAJÍCÍ šance na Candy XL, cooldown zdarma pouhé 3 dny!\nPři Raid Day nebo Community Day mějte VŽDY aktivního Mega Pokémona s Max Mega Level stejného typu pro zisk 40–80+ Candy XL!",
          en: "Mega Evolving once per day levels up your Mega Pokémon:\n• Base Level (1 evolution): +1 Catch Candy, +50 Catch XP, 7-day free cooldown.\n• High Level (7 evolutions): +1 Catch Candy, +100 Catch XP, +10% Candy XL chance, 5-day free cooldown.\n• Max Level (30 evolutions): +2 Catch Candy, +200 Catch XP, +25% MASSIVE Candy XL chance, 3-day free cooldown!\nDuring Raid Days or Community Days, ALWAYS activate a Max Level Mega of matching type to farm 40–80+ bonus Candy XL!",
          ja: "1日1回メガシンカさせることでメガレベルが上昇します：\n• ベースレベル（1回）：捕獲時アメ+1個、XP+50、無料再進化クールダウン7日。\n• ハイレベル（7回）：捕獲時アメ+1個、XP+100、アメXL確率+10%、クールダウン5日。\n• マックスレベル（30回）：捕獲時アメ+2個、XP+200、アメXL確率+25%、クールダウンわずか3日！\nレイドデイやコミュデイでは必ず同タイプのマックスレベルメガを起動し、アメXLを大量確保しましょう！",
          ru: "Повышение Mega Level (1 раз в день):\n• Base Level (1 раз): +1 Candy, +50 XP, бесплатный кд 7 дней.\n• High Level (7 раз): +1 Candy, +100 XP, +10% к шансу Candy XL, кд 5 дней.\n• Max Level (30 раз): +2 Candy, +200 XP, +25% К ШАНСУ CANDY XL, кд 3 дня!\nНа Raid Day и Community Day ВСЕГДА включайте Mega Level 3 того же типа для фарма Candy XL!"
        }
      },
      {
        id: "dynamax-power-spots",
        heading: {
          cs: "Dynamax, Gigantamax a Power Spoty",
          en: "Dynamax, Gigantamax & Power Spot Combat",
          ja: "ダイマックス、キョダイマックス、パワースポット攻略",
          ru: "Dynamax, Gigantamax и бои на Power Spot"
        },
        content: {
          cs: "Dynamax a Gigantamax probíhají na Power Spotech pomocí Max Particles (MP):\n• Denní limit: Můžete nasbírat až 800 MP denně (protočením Power Spotů nebo nachozením 2 km).\n• Max Moves: Každý Dynamax Pokémon má 3 Max útoky: Max Strike/Attack (útok), Max Guard (ochrana celého týmu před poškozením) a Max Spirit (léčení HP celého týmu!). Vylepšování Max Spirit a Max Guard je klíčem k sólování těžkých 3★ a 6★ Gigantamax bossů.",
          en: "Dynamax and Gigantamax battles occur at Power Spots using Max Particles (MP):\n• Daily MP Cap: Collect up to 800 MP daily by visiting Power Spots and walking 2 km intervals.\n• Max Moves: Each Dynamax Pokémon features 3 Max Moves: Max Attack, Max Guard (reduces incoming damage for the entire team), and Max Spirit (heals entire team HP!). Upgrading Max Spirit and Max Guard is essential for conquering heavy 3★ and 6★ Gigantamax bosses.",
          ja: "パワースポットでのダイマックスバトルはマックス粒子（MP）を使用します：\n• 1日の上限：パワースポット巡回や2km歩行で1日最大800 MP収集可能。\n• マックス技：ダイアタック（攻撃）、ダイウォール（チーム全体の被ダメージ軽減）、ダイリカバリー（チーム全体のHP回復）の3種。ダイリカバリーとダイウォールをレベルアップすることが高難度キョダイマックス撃破の鍵です。",
          ru: "Бои Dynamax и Gigantamax на Power Spots требуют Max Particles (MP):\n• Дневной лимит: до 800 MP в день.\n• Max Moves: Max Attack, Max Guard (защита команды) и Max Spirit (лечение всей команды!). Прокачка Max Spirit критически важна для сложных 3★ и 6★ Gigantamax рейдов."
        }
      }
    ]
  }
];
