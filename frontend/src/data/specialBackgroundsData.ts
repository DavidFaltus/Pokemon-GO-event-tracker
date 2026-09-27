export interface PokelidPrefectureItem {
  id: string;
  prefecture: { cs: string; en: string; ja: string; ru: string };
  region: { cs: string; en: string; ja: string; ru: string };
  ambassadorPokemon: string;
  ambassadorName: { cs: string; en: string; ja: string; ru: string };
  culturalRationale: { cs: string; en: string; ja: string; ru: string };
  manholeCount: number;
  hasFullCoverage: boolean; // 100% municipal coverage
  rewardPokemon: string;
  backgroundTheme: { cs: string; en: string; ja: string; ru: string };
  locationCardUrl?: string;
  manholeImageUrl?: string;
}

export interface SpecialBackgroundItem {
  id: string;
  title: { cs: string; en: string; ja: string; ru: string };
  event: { cs: string; en: string; ja: string; ru: string };
  year: number;
  category: 'global' | 'go-tour' | 'go-fest' | 'city-safari' | 'heritage';
  location: { cs: string; en: string; ja: string; ru: string };
  featuredPokemon: string[];
  backgroundArtwork: { cs: string; en: string; ja: string; ru: string };
  acquisitionMethod: { cs: string; en: string; ja: string; ru: string };
  isGlobal: boolean;
  preservesOnTrade: boolean;
  cardImageUrl?: string;
}

export const POKELID_PREFECTURES: PokelidPrefectureItem[] = [
  {
    "id": "hokkaido",
    "locationCardUrl": "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/LocationCards/lc_pokelid_hokkaido.png",
    "manholeImageUrl": "https://local.pokemon.jp/img/p/manhole/63d1b0ab4923f1c3cd03a928dd57d7b5_l.png",
    "prefecture": {
      "cs": "Hokkaidó (北海道)",
      "en": "Hokkaido",
      "ja": "北海道",
      "ru": "Хоккайдо"
    },
    "region": {
      "cs": "Hokkaidó",
      "en": "Hokkaido",
      "ja": "北海道地方",
      "ru": "Хоккайдо"
    },
    "ambassadorPokemon": "Vulpix-Alolan",
    "ambassadorName": {
      "cs": "Alolan Vulpix & Vulpix",
      "en": "Alolan Vulpix & Vulpix",
      "ja": "アローラロコン＆ロコン",
      "ru": "Alolan Vulpix и Vulpix"
    },
    "culturalRationale": {
      "cs": "Ambasadoři sněžných plání Hokkaidó; symbolizují subarktické klima a zasněžené hory.",
      "en": "Leaders of the Hokkaido Aficionado Expedition; celebrates subarctic snowy landscapes.",
      "ja": "「北海道だいすき発見隊」隊長。雪深い大自然とパウダースノーのシンボル。",
      "ru": "Лидеры экспедиции Хоккайдо; символизируют снежные субарктические пейзажи."
    },
    "manholeCount": 50,
    "hasFullCoverage": false,
    "rewardPokemon": "Pikachu",
    "backgroundTheme": {
      "cs": "Zasněžené vrcholky Hokkaidó a ledové krystaly",
      "en": "Snowy Hokkaido peaks and ice crystals",
      "ja": "北海道の雪山と氷の結晶",
      "ru": "Снежные вершины Хоккайдо и ледяные кристаллы"
    }
  },
  {
    "id": "aomori",
    "manholeImageUrl": "https://local.pokemon.jp/img/p/manhole/1723f48f98735fe88693db2547152835_l.png",
    "prefecture": {
      "cs": "Aomori (青森県)",
      "en": "Aomori",
      "ja": "青森県",
      "ru": "Аомори"
    },
    "region": {
      "cs": "Tóhoku",
      "en": "Tohoku",
      "ja": "東北地方",
      "ru": "Тохоку"
    },
    "ambassadorPokemon": "Pyukumuku",
    "ambassadorName": {
      "cs": "Pyukumuku & Wingull",
      "en": "Pyukumuku & Wingull",
      "ja": "ナマコブシ＆キャモメ",
      "ru": "Pyukumuku и Wingull"
    },
    "culturalRationale": {
      "cs": "Poklopy v Hačinohe a Hašikami oslavují mořské pobřeží Sanriku a racky černé z ostrova Kabušima.",
      "en": "Lids in Hachinohe and Hashikami celebrate the Sanriku coast and black-tailed gulls of Kabushima.",
      "ja": "蕪島のウミネコや三陸沿岸の豊かな海の幸を表現。",
      "ru": "Люки в Хатинохэ и Хасиками прославляют побережье Санрику."
    },
    "manholeCount": 2,
    "hasFullCoverage": false,
    "rewardPokemon": "Pikachu",
    "backgroundTheme": {
      "cs": "Severní pobřeží Tóhoku a průliv Cugaru",
      "en": "Northern Tohoku coastline and Tsugaru Strait",
      "ja": "本州最北の津軽海峡と三陸海岸",
      "ru": "Северное побережье Тохоку и пролив Цугару"
    }
  },
  {
    "id": "iwate",
    "locationCardUrl": "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/LocationCards/lc_pokelid_iwate.png",
    "manholeImageUrl": "https://local.pokemon.jp/img/p/manhole/950280bab6a52375f60a30456007e6e9_l.png",
    "prefecture": {
      "cs": "Iwate (岩手県)",
      "en": "Iwate",
      "ja": "岩手県",
      "ru": "Иватэ"
    },
    "region": {
      "cs": "Tóhoku",
      "en": "Tohoku",
      "ja": "東北地方",
      "ru": "Тохоку"
    },
    "ambassadorPokemon": "Geodude",
    "ambassadorName": {
      "cs": "Geodude (Ishitsubute)",
      "en": "Geodude (Ishitsubute)",
      "ja": "イシツブテ",
      "ru": "Geodude (Ishitsubute)"
    },
    "culturalRationale": {
      "cs": "Vynikající slovní hříčka: Iwa (kámen/skála) + Te (ruka) = Pokémon se skálou a rukama! 100% pokrytí všech 33 obcí.",
      "en": "Iconic visual pun: Iwa (Rock) + Te (Hand) = a Rock with Hands! 100% coverage across all 33 municipalities.",
      "ja": "「いわて応援ポケモン」。「岩」から「手」が出ているイシツブテが県内全33市町村を応援。",
      "ru": "Игра слов: Ива (скала) + Тэ (рука) = Покемон-скала с руками! 100% покрытие всех 33 муниципалитетов."
    },
    "manholeCount": 36,
    "hasFullCoverage": true,
    "rewardPokemon": "Pikachu",
    "backgroundTheme": {
      "cs": "Drsné skály Sanriku a drahokamy Iwate",
      "en": "Rugged Sanriku rocks and Iwate gemstones",
      "ja": "三陸ジオパークの奇岩と豊かな大地",
      "ru": "Скалистое побережье Санрику и драгоценные камни Иватэ"
    }
  },
  {
    "id": "miyagi",
    "locationCardUrl": "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/LocationCards/lc_pokelid_miyagi.png",
    "manholeImageUrl": "https://local.pokemon.jp/img/p/manhole/0dfe96c54ef7f6271d17c9ea3fb43e65_l.png",
    "prefecture": {
      "cs": "Mijagi (宮城県)",
      "en": "Miyagi",
      "ja": "宮城県",
      "ru": "Мияги"
    },
    "region": {
      "cs": "Tóhoku",
      "en": "Tohoku",
      "ja": "東北地方",
      "ru": "Тохоку"
    },
    "ambassadorPokemon": "Lapras",
    "ambassadorName": {
      "cs": "Lapras",
      "en": "Lapras",
      "ja": "ラプラス",
      "ru": "Lapras"
    },
    "culturalRationale": {
      "cs": "Jmenován na podporu obnovy pobřeží po tsunami; reprezentuje malebný záliv Macušima. 100% pokrytí všech 35 obcí.",
      "en": "Appointed for coastal tsunami recovery; represents scenic Matsushima Bay. 100% municipal coverage across all 35 municipalities.",
      "ja": "「宮城巡り応援ポケモン」。松島湾の絶景と豊かな三陸の海を象徴。全35市町村設置達成。",
      "ru": "Назначен для восстановления побережья после цунами; символизирует залив Мацусима. 100% покрытие всех 35 муниципалитетов."
    },
    "manholeCount": 37,
    "hasFullCoverage": true,
    "rewardPokemon": "Pikachu",
    "backgroundTheme": {
      "cs": "Záliv Macušima a vlny Tichého oceánu",
      "en": "Matsushima Bay and Pacific Ocean swells",
      "ja": "日本三景・松島湾と太平洋の青い波",
      "ru": "Залив Мацусима и волны Тихого океана"
    }
  },
  {
    "id": "akita",
    "manholeImageUrl": "https://local.pokemon.jp/img/p/manhole/e2e2f0492f0c7751a975073c6ec29d61_l.png",
    "prefecture": {
      "cs": "Akita (秋田県)",
      "en": "Akita",
      "ja": "秋田県",
      "ru": "Акита"
    },
    "region": {
      "cs": "Tóhoku",
      "en": "Tohoku",
      "ja": "東北地方",
      "ru": "Тохоку"
    },
    "ambassadorPokemon": "Growlithe",
    "ambassadorName": {
      "cs": "Growlithe & Dachsbun",
      "en": "Growlithe & Dachsbun",
      "ja": "ガーディ＆バウッツェル",
      "ru": "Growlithe и Dachsbun"
    },
    "culturalRationale": {
      "cs": "Oslavuje slavné psí plemeno Akita-Inu (Growlithe, Dachsbun, Rockruff) a mystické jezero Tazawa (Dragonair).",
      "en": "Honors the world-famous Akita-Inu dog breed (Growlithe, Dachsbun) and mythical Lake Tazawa (Dragonair).",
      "ja": "世界的に有名な秋田犬にちなんだ犬ポケモンたちや、田沢湖の辰子姫伝説を表現。",
      "ru": "Посвящено породе собак Акита-ину и священному озеру Тадзава."
    },
    "manholeCount": 5,
    "hasFullCoverage": false,
    "rewardPokemon": "Pikachu",
    "backgroundTheme": {
      "cs": "Jezero Tazawa a věrní psí společníci Akita-Inu",
      "en": "Lake Tazawa and faithful Akita-Inu companions",
      "ja": "田沢湖の神秘と秋田犬のふるさと",
      "ru": "Озеро Тадзава и верные собаки Акита-ину"
    }
  },
  {
    "id": "yamagata",
    "manholeImageUrl": "https://local.pokemon.jp/img/p/manhole/682832fc77641227f5f45a0ba883c392_l.png",
    "prefecture": {
      "cs": "Jamagata (山形県)",
      "en": "Yamagata",
      "ja": "山形県",
      "ru": "Ямагата"
    },
    "region": {
      "cs": "Tóhoku",
      "en": "Tohoku",
      "ja": "東北地方",
      "ru": "Тохоку"
    },
    "ambassadorPokemon": "Cetoddle",
    "ambassadorName": {
      "cs": "Cetoddle & Cubchoo",
      "en": "Cetoddle & Cubchoo",
      "ja": "アルクジラ＆クマシュン",
      "ru": "Cetoddle и Cubchoo"
    },
    "culturalRationale": {
      "cs": "Zimní sněžná monstra na hoře Zaó a třešňová království v údolí řeky Mogami.",
      "en": "Celebrates Mount Zao snow monsters and premium cherry orchards of Yamagata.",
      "ja": "蔵王の樹氷や最上川の清流、山形の豊かな大自然を表現。",
      "ru": "Снежные монстры горы Дзао и вишневые сады реки Могами."
    },
    "manholeCount": 5,
    "hasFullCoverage": false,
    "rewardPokemon": "Pikachu",
    "backgroundTheme": {
      "cs": "Posvátné hory Dewa Sanzan a třešňové sady",
      "en": "Sacred Dewa Sanzan peaks and cherry orchards",
      "ja": "出羽三山と日本一のさくらんぼ王国",
      "ru": "Священные горы Дэва Сандзан и вишневые сады"
    }
  },
  {
    "id": "fukushima",
    "locationCardUrl": "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/LocationCards/lc_pokelid_fukushima.png",
    "manholeImageUrl": "https://local.pokemon.jp/img/p/manhole/80d89bd52e1edb0d93f1a0cdc06d4757_l.png",
    "prefecture": {
      "cs": "Fukušima (福島県)",
      "en": "Fukushima",
      "ja": "福島県",
      "ru": "Фукусима"
    },
    "region": {
      "cs": "Tóhoku",
      "en": "Tohoku",
      "ja": "東北地方",
      "ru": "Тохоку"
    },
    "ambassadorPokemon": "Chansey",
    "ambassadorName": {
      "cs": "Chansey (Lucky)",
      "en": "Chansey (Lucky)",
      "ja": "ラッキー",
      "ru": "Chansey (Lucky)"
    },
    "culturalRationale": {
      "cs": "Slovní hříčka: Chansey (Lucky) odpovídá \"Fuku\" (štěstí) v názvu Fukušima. V prefektuře vznikla 4 tematická dětská hřiště Lucky Park.",
      "en": "Linguistic pun: Chansey's Japanese name Lucky corresponds to \"Fuku\" (Good Fortune). Features 4 official Lucky Parks.",
      "ja": "「ふくしま応援ポケモン」。「福」を運ぶラッキーが県内各地に幸せをお届け。4箇所のラッキー公園も大人気。",
      "ru": "Игра слов: Лаки соответствует \"Фуку\" (счастье) в Фукусиме. Открыты 4 парка Lucky Park."
    },
    "manholeCount": 43,
    "hasFullCoverage": false,
    "rewardPokemon": "Pikachu",
    "backgroundTheme": {
      "cs": "Kvetoucí parky štěstí a ovocné sady Fukušimy",
      "en": "Blossoming Lucky Parks and Fukushima orchards",
      "ja": "ふくしまの花々とラッキー公園",
      "ru": "Цветущие парки счастья и фруктовые сады Фукусимы"
    }
  },
  {
    "id": "ibaraki",
    "manholeImageUrl": "https://local.pokemon.jp/img/p/manhole/223f1b131033a42ab2891fecab366ef0_l.png",
    "prefecture": {
      "cs": "Ibaraki (茨城県)",
      "en": "Ibaraki",
      "ja": "茨城県",
      "ru": "Ибараки"
    },
    "region": {
      "cs": "Kanto",
      "en": "Kanto",
      "ja": "関東地方",
      "ru": "Канто"
    },
    "ambassadorPokemon": "Rayquaza",
    "ambassadorName": {
      "cs": "Rayquaza & Serperior",
      "en": "Rayquaza & Serperior",
      "ja": "レックウザ＆ジャローダ",
      "ru": "Rayquaza и Serperior"
    },
    "culturalRationale": {
      "cs": "Představeno v říjnu 2025; vesmírný drak Rayquaza v Cukubě symbolizuje vesmírnou agenturu JAXA.",
      "en": "Debuted October 2025; Legendary Rayquaza in Tsukuba honors the JAXA Space Center.",
      "ja": "2025年10月設置。JAXA筑波宇宙センターのレックウザや名園・偕楽園のジャローダが彩る。",
      "ru": "Установлены в октябре 2025 года; космический дракон Rayquaza в Цукубе символизирует JAXA."
    },
    "manholeCount": 5,
    "hasFullCoverage": false,
    "rewardPokemon": "Pikachu",
    "backgroundTheme": {
      "cs": "Vesmírné vědecké město Cukuba a zahrady Kairaku-en",
      "en": "Tsukuba Space Center and Kairakuen gardens",
      "ja": "筑波研究学園都市と水戸偕楽園",
      "ru": "Наукоград Цукуба и сады Кайраку-эн"
    }
  },
  {
    "id": "tochigi",
    "manholeImageUrl": "https://local.pokemon.jp/img/p/manhole/614ba5f80e044574e4f5fa79677fa37f_l.png",
    "prefecture": {
      "cs": "Točigi (栃木県)",
      "en": "Tochigi",
      "ja": "栃木県",
      "ru": "Тотиги"
    },
    "region": {
      "cs": "Kanto",
      "en": "Kanto",
      "ja": "関東地方",
      "ru": "Канто"
    },
    "ambassadorPokemon": "Thundurus",
    "ambassadorName": {
      "cs": "Thundurus & Electabuzz",
      "en": "Thundurus & Electabuzz",
      "ja": "ボルトロス＆エレブー",
      "ru": "Thundurus и Electabuzz"
    },
    "culturalRationale": {
      "cs": "Ucumonija je v Japonsku proslulá jako \"Město hromů\" (Raito), proto zde vládnou elektrický Thundurus a Electabuzz.",
      "en": "Utsunomiya is known as Japan's \"Thunder Capital\", fittingly hosting Electric-type Thundurus and Electabuzz.",
      "ja": "「雷都」と呼ばれる宇都宮市にちなみ、でんき・ひこうタイプのボルトロスたちが登場。",
      "ru": "Уцуномия известна как \"Столица гроз\", поэтому здесь установлены Thundurus и Electabuzz."
    },
    "manholeCount": 3,
    "hasFullCoverage": false,
    "rewardPokemon": "Pikachu",
    "backgroundTheme": {
      "cs": "Město hromů Ucumonija a cedrové aleje v Nikkó",
      "en": "Thunder Capital Utsunomiya and Nikko cedar avenues",
      "ja": "雷都・宇都宮と世界遺産・日光の社寺",
      "ru": "Город громов Уцуномия и кедровые аллеи Никко"
    }
  },
  {
    "id": "saitama",
    "manholeImageUrl": "https://local.pokemon.jp/img/p/manhole/aeaf1d2fff879ae33fca2eb1ba4a69e8_l.png",
    "prefecture": {
      "cs": "Saitama (埼玉県)",
      "en": "Saitama",
      "ja": "埼玉県",
      "ru": "Сайтама"
    },
    "region": {
      "cs": "Kanto",
      "en": "Kanto",
      "ja": "関東地方",
      "ru": "Канто"
    },
    "ambassadorPokemon": "Dragonite",
    "ambassadorName": {
      "cs": "Dragonite & Corviknight",
      "en": "Dragonite & Corviknight",
      "ja": "カイリュー＆アーマーガア",
      "ru": "Dragonite и Corviknight"
    },
    "culturalRationale": {
      "cs": "Tokorozawa je kolébkou japonského letectví; létající pokémoni Dragonite, Skarmory a Corviknight střeží památník letectví.",
      "en": "Tokorozawa is the birthplace of Japanese aviation, celebrated by flying Pokémon Dragonite and Corviknight.",
      "ja": "日本航空発祥の地・所沢航空記念公園周辺に、空を飛ぶドラゴン・ひこうポケモンが集結。",
      "ru": "Токородзава — колыбель авиации Японии, представленная летающими покемонами."
    },
    "manholeCount": 3,
    "hasFullCoverage": false,
    "rewardPokemon": "Pikachu",
    "backgroundTheme": {
      "cs": "Kolébka letectví v Tokorozawě a čajové kopce Sajama",
      "en": "Cradle of Japanese aviation in Tokorozawa",
      "ja": "日本の航空発祥の地・所沢と狭山丘陵",
      "ru": "Колыбель японской авиации в Токородзаве"
    }
  },
  {
    "id": "chiba",
    "manholeImageUrl": "https://local.pokemon.jp/img/p/manhole/23d6d594e7a3c463148f8a6122377134_l.png",
    "prefecture": {
      "cs": "Čiba (千葉県)",
      "en": "Chiba",
      "ja": "千葉県",
      "ru": "Тиба"
    },
    "region": {
      "cs": "Kanto",
      "en": "Kanto",
      "ja": "関東地方",
      "ru": "Канто"
    },
    "ambassadorPokemon": "Falinks",
    "ambassadorName": {
      "cs": "Falinks & Florges",
      "en": "Falinks & Florges",
      "ja": "タイレーツ＆フラージェス",
      "ru": "Falinks и Florges"
    },
    "culturalRationale": {
      "cs": "Historická čtvrť Sawara v Katori podél řeky Tone a květinové louky poloostrova Bósó.",
      "en": "Celebrates the historic canal town of Sawara in Katori and flora along the Tone River.",
      "ja": "重要伝統的建造物群保存地区の佐原の町並みと利根川の豊かな自然を表現。",
      "ru": "Исторический район каналов Савара в Катори."
    },
    "manholeCount": 4,
    "hasFullCoverage": false,
    "rewardPokemon": "Pikachu",
    "backgroundTheme": {
      "cs": "Historické město Katori a pobřeží poloostrova Bósó",
      "en": "Historic merchant town Katori and Boso coast",
      "ja": "水郷の町・香取と房総半島の豊かな自然",
      "ru": "Исторический торговый город Катори"
    }
  },
  {
    "id": "tokyo",
    "manholeImageUrl": "https://local.pokemon.jp/img/p/manhole/174a9314ce4371b180c70d3f43232c4e_l.png",
    "prefecture": {
      "cs": "Tokio (東京都)",
      "en": "Tokyo",
      "ja": "東京都",
      "ru": "Токио"
    },
    "region": {
      "cs": "Kanto",
      "en": "Kanto",
      "ja": "関東地方",
      "ru": "Канто"
    },
    "ambassadorPokemon": "Pikachu",
    "ambassadorName": {
      "cs": "Pikachu & Kanto Starters",
      "en": "Pikachu & Kanto Starters",
      "ja": "ピカチュウ＆カントー御三家",
      "ru": "Pikachu и Стартовики Канто"
    },
    "culturalRationale": {
      "cs": "Park Serigaja v Mačidě je rodištěm tvůrce Pokémonů Satošiho Tadžiriho; poklopy jsou také v muzeu v Uenu a na tropických ostrovech Ogasawara.",
      "en": "Machida's Serigaya Park is the childhood stomping ground of Satoshi Tajiri; covers also in Ueno and subtropical Ogasawara.",
      "ja": "ポケモンの生みの親・田尻智氏の少年時代の思い出の地・町田市芹ヶ谷公園や小笠原諸島に設置。",
      "ru": "Парк Сэригая в Матиде — родина создателя покемонов Сатоси Тадзири."
    },
    "manholeCount": 13,
    "hasFullCoverage": false,
    "rewardPokemon": "Pikachu",
    "backgroundTheme": {
      "cs": "Rodiště Pokémonů v Mačidě, Národní muzeum v Uenu a ostrovy Ogasawara",
      "en": "Birthplace of Pokémon in Machida, Ueno & Ogasawara",
      "ja": "田尻智の故郷・町田、上野恩賜公園、小笠原諸島",
      "ru": "Родина покемонов в Матиде, Уэно и Огасавара"
    }
  },
  {
    "id": "kanagawa",
    "manholeImageUrl": "https://local.pokemon.jp/img/p/manhole/ac4ed4c5f7ff0704cd3e3bc890c7a217_l.png",
    "prefecture": {
      "cs": "Kanagawa (神奈川県)",
      "en": "Kanagawa",
      "ja": "神奈川県",
      "ru": "Канагава"
    },
    "region": {
      "cs": "Kanto",
      "en": "Kanto",
      "ja": "関東地方",
      "ru": "Канто"
    },
    "ambassadorPokemon": "Pikachu",
    "ambassadorName": {
      "cs": "Pikachu (Yokohama Harbor)",
      "en": "Pikachu (Yokohama Harbor)",
      "ja": "ピカチュウ（横浜港）",
      "ru": "Pikachu (Порт Иокогама)"
    },
    "culturalRationale": {
      "cs": "5 exkluzivních poklopů Pikachu podél nábřeží Jokohamy (nádraží Sakuragičó, Red Brick Warehouse, Marine Tower).",
      "en": "5 exclusive Pikachu lids along Yokohama's scenic waterfront (Sakuragicho, Red Brick, Marine Tower).",
      "ja": "横浜市みなとみらいエリアの桜木町駅前や赤レンガ倉庫にピカチュウマンホールが勢揃い。",
      "ru": "5 эксклюзивных люков Пикачу вдоль набережной Иокогамы."
    },
    "manholeCount": 5,
    "hasFullCoverage": false,
    "rewardPokemon": "Pikachu",
    "backgroundTheme": {
      "cs": "Moderní přístav Minato Mirai a festivaly Pikachu v Jokohamě",
      "en": "Minato Mirai skyline and Yokohama Pikachu Outbreak",
      "ja": "横浜みなとみらい21とピカチュウの港町",
      "ru": "Порт Минато Мирай и фестивали Пикачу в Иокогаме"
    }
  },
  {
    "id": "niigata",
    "manholeImageUrl": "https://local.pokemon.jp/img/p/manhole/1779749989a248a4d80438774bd31c5c_l.png",
    "prefecture": {
      "cs": "Niigata (新潟県)",
      "en": "Niigata",
      "ja": "新潟県",
      "ru": "Ниигата"
    },
    "region": {
      "cs": "Čúbu",
      "en": "Chubu",
      "ja": "中部地方",
      "ru": "Тюбу"
    },
    "ambassadorPokemon": "Magikarp",
    "ambassadorName": {
      "cs": "Magikarp (Koiking)",
      "en": "Magikarp (Koiking)",
      "ja": "コイキング",
      "ru": "Magikarp (Koiking)"
    },
    "culturalRationale": {
      "cs": "Město Odžija je světovou kolébkou chovu okrasných kaprů Nišikigoi, kterým vzdávají hold 4 unikátní poklopy Magikarpa.",
      "en": "Ojiya City is the historical birthplace of Nishikigoi koi carp, commemorated by 4 unique Magikarp lids.",
      "ja": "錦鯉の里・小千谷市に設置された4枚のポケふたは、すべて色鮮やかなコイキング尽くし。",
      "ru": "Город Одзия — родина парчовых карпов кои, прославленная 4 люками Маджикарпа."
    },
    "manholeCount": 4,
    "hasFullCoverage": false,
    "rewardPokemon": "Pikachu",
    "backgroundTheme": {
      "cs": "Světová kolébka okrasných kaprů Nišikigoi v Odžiji",
      "en": "World capital of Nishikigoi ornamental koi in Ojiya",
      "ja": "錦鯉発祥の地・小千谷のコイキング",
      "ru": "Мировая столица карпов Нисикигои в Одзии"
    }
  },
  {
    "id": "toyama",
    "manholeImageUrl": "https://local.pokemon.jp/img/p/manhole/6c44395065c204322fb25c9d622810f6_l.png",
    "prefecture": {
      "cs": "Tojama (富山県)",
      "en": "Toyama",
      "ja": "富山県",
      "ru": "Тояма"
    },
    "region": {
      "cs": "Čúbu",
      "en": "Chubu",
      "ja": "中部地方",
      "ru": "Тюбу"
    },
    "ambassadorPokemon": "Inkay",
    "ambassadorName": {
      "cs": "Inkay & Absol",
      "en": "Inkay & Absol",
      "ja": "マーイーカ＆アブソル",
      "ru": "Inkay и Absol"
    },
    "culturalRationale": {
      "cs": "Inkay zrcadlí světélkující kalmary v zálivu Tojama; Absol a Ledyba symbolizují zasněžené vrcholky pohoří Tatejama.",
      "en": "Inkay reflects Toyama Bay's bioluminescent firefly squids; Absol honors the rugged Tateyama mountain range.",
      "ja": "富山湾の神秘ホタルイカにちなんだマーイーカや、立山連峰を望むアブソルが描かれる。",
      "ru": "Inkay отражает биолюминесцентных кальмаров залива Тояма."
    },
    "manholeCount": 3,
    "hasFullCoverage": false,
    "rewardPokemon": "Pikachu",
    "backgroundTheme": {
      "cs": "Záliv Tojama s bioluminiscenčními kalmary a přehrada Kurobe",
      "en": "Toyama Bay firefly squid and Kurobe Dam",
      "ja": "富山湾の神秘・ホタルイカと立山連峰",
      "ru": "Залив Тояма со светящимися кальмарами"
    }
  },
  {
    "id": "ishikawa",
    "manholeImageUrl": "https://local.pokemon.jp/img/p/manhole/ebbdbee7f35498be1af93b5dc2f8e6c2_l.png",
    "prefecture": {
      "cs": "Išikawa (石川県)",
      "en": "Ishikawa",
      "ja": "石川県",
      "ru": "Исикава"
    },
    "region": {
      "cs": "Čúbu",
      "en": "Chubu",
      "ja": "中部地方",
      "ru": "Тюбу"
    },
    "ambassadorPokemon": "Milotic",
    "ambassadorName": {
      "cs": "Milotic & Salamence",
      "en": "Milotic & Salamence",
      "ja": "ミロカロス＆ボーマンダ",
      "ru": "Milotic и Salamence"
    },
    "culturalRationale": {
      "cs": "Duben 2026: 6 nových poklopů věnovaných obnově zemětřesením zasaženého poloostrova Noto (Wadžima, Suzu, Nanao).",
      "en": "April 2026: 6 new commemorative lids installed to support reconstruction across quake-affected Noto municipalities.",
      "ja": "2026年4月に能登半島地震復興支援として輪島市・珠洲市・七尾市などに6枚のポケふたを寄贈。",
      "ru": "Апрель 2026: 6 новых люков в поддержку восстановления полуострова Ното."
    },
    "manholeCount": 8,
    "hasFullCoverage": false,
    "rewardPokemon": "Pikachu",
    "backgroundTheme": {
      "cs": "Obnova poloostrova Noto po zemětřesení a zahrada Kenroku-en",
      "en": "Noto Peninsula earthquake reconstruction & Kanazawa",
      "ja": "能登半島地震復興応援と加賀百万石の金沢",
      "ru": "Восстановление полуострова Ното и замок Канадзава"
    }
  },
  {
    "id": "fukui",
    "locationCardUrl": "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/LocationCards/lc_pokelid_fukui.png",
    "manholeImageUrl": "https://local.pokemon.jp/img/p/manhole/a4b9ed8fd6f982a51e508d614e8bc9c7_l.png",
    "prefecture": {
      "cs": "Fukui (福井県)",
      "en": "Fukui",
      "ja": "福井県",
      "ru": "Фукуи"
    },
    "region": {
      "cs": "Čúbu",
      "en": "Chubu",
      "ja": "中部地方",
      "ru": "Тюбу"
    },
    "ambassadorPokemon": "Dragonite",
    "ambassadorName": {
      "cs": "Dragonite (Kairyu)",
      "en": "Dragonite (Kairyu)",
      "ja": "カイリュー",
      "ru": "Dragonite (Kairyu)"
    },
    "culturalRationale": {
      "cs": "Fukui je centrem vykopávek dinosaurů v Japonsku; \"Rjú\" znamená drak i dinosaurus. 100% pokrytí všech 17 obcí.",
      "en": "Fukui is Japan's dinosaur capital (\"Ryu\" = dragon/dinosaur). 100% coverage across all 17 municipalities.",
      "ja": "「ふくい応援ポケモン」。恐竜王国・福井のカイリューが県内全17市町すべてに設置完了。",
      "ru": "Фукуи — столица динозавров Японии (\"Рю\" = дракон/динозавр). 100% покрытие всех 17 муниципалитетов."
    },
    "manholeCount": 17,
    "hasFullCoverage": true,
    "rewardPokemon": "Pikachu",
    "backgroundTheme": {
      "cs": "Království dinosaurů a útesy Tódžinbó",
      "en": "Dinosaur fossil kingdom and Tojinbo cliffs",
      "ja": "恐竜王国ふくいと東尋坊の奇勝",
      "ru": "Королевство динозавров и скалы Тодзинбо"
    }
  },
  {
    "id": "nagano",
    "manholeImageUrl": "https://local.pokemon.jp/img/p/manhole/7fe9b42164a7f9fbaeb73ef90a2790ea_l.png",
    "prefecture": {
      "cs": "Nagano (長野県)",
      "en": "Nagano",
      "ja": "長野県",
      "ru": "Нагано"
    },
    "region": {
      "cs": "Čúbu",
      "en": "Chubu",
      "ja": "中部地方",
      "ru": "Тюбу"
    },
    "ambassadorPokemon": "Kleavor",
    "ambassadorName": {
      "cs": "Kleavor & Snom",
      "en": "Kleavor & Snom",
      "ja": "バサギリ＆ユキハミ",
      "ru": "Kleavor и Snom"
    },
    "culturalRationale": {
      "cs": "Premiéra v červenci 2026 jako 42. prefektura! 6 horských obcí (Ina, Kiso, Okaya, Omachi, Minamimaki, Yamanouchi).",
      "en": "Debuted July 2026 as Japan's 42nd Poké Lid prefecture, spanning 6 alpine municipalities.",
      "ja": "2026年7月に初設置（42番目の都道府県）。湯田中温泉や木曽谷など信州の山と歴史を表現。",
      "ru": "Дебют в июле 2026 года в качестве 42-й префектуры в 6 альпийских муниципалитетах."
    },
    "manholeCount": 6,
    "hasFullCoverage": false,
    "rewardPokemon": "Pikachu",
    "backgroundTheme": {
      "cs": "Japonské Alpy, lázně sněžných opic a historické stezky Kiso",
      "en": "Japanese Alps, Snow Monkey Park and Kiso trails",
      "ja": "日本の屋根・信州アルプスと地獄谷スノーモンキー",
      "ru": "Японские Альпы и парк снежных обезьян"
    }
  },
  {
    "id": "gifu",
    "manholeImageUrl": "https://local.pokemon.jp/img/p/manhole/1a58002d4c3745b11517f8eeae645f82_l.png",
    "prefecture": {
      "cs": "Gifu (岐阜県)",
      "en": "Gifu",
      "ja": "岐阜県",
      "ru": "Гифу"
    },
    "region": {
      "cs": "Čúbu",
      "en": "Chubu",
      "ja": "中部地方",
      "ru": "Тюбу"
    },
    "ambassadorPokemon": "Kingambit",
    "ambassadorName": {
      "cs": "Kingambit & Pawniard",
      "en": "Kingambit & Pawniard",
      "ja": "ドドゲザン＆コマタナ",
      "ru": "Kingambit и Pawniard"
    },
    "culturalRationale": {
      "cs": "Červenec 2024: Kingambit a Pawniard na bojišti Sekigahara, kovářské umění mečířů v Seki a prameny Gero Onsen.",
      "en": "Debuted July 2024; Kingambit at the Sekigahara battlefield, traditional bladesmiths in Seki and Gero Onsen.",
      "ja": "2024年7月設置。関ケ原古戦場のドドゲザンや刃物の町・関市、下呂温泉など歴史豊かな地を巡る。",
      "ru": "Июль 2024: Kingambit на поле битвы Сэкигахара и кузнечное ремесло Сэки."
    },
    "manholeCount": 5,
    "hasFullCoverage": false,
    "rewardPokemon": "Pikachu",
    "backgroundTheme": {
      "cs": "Historické bojiště Sekigahara a mečířské město Seki",
      "en": "Historic Sekigahara battlefield and Seki swordcraft",
      "ja": "天下分け目の関ケ原と刃物の町・関",
      "ru": "Историческое поле битвы Сэкигахара"
    }
  },
  {
    "id": "shizuoka",
    "manholeImageUrl": "https://local.pokemon.jp/img/p/manhole/54b23fd2424c86f488e780a6dd137276_l.png",
    "prefecture": {
      "cs": "Šizuoka (静岡県)",
      "en": "Shizuoka",
      "ja": "静岡県",
      "ru": "Сидзуока"
    },
    "region": {
      "cs": "Čúbu",
      "en": "Chubu",
      "ja": "中部地方",
      "ru": "Тюбу"
    },
    "ambassadorPokemon": "Moltres",
    "ambassadorName": {
      "cs": "Moltres & Pancham",
      "en": "Moltres & Pancham",
      "ja": "ファイヤー＆ヤンチャム",
      "ru": "Moltres и Pancham"
    },
    "culturalRationale": {
      "cs": "Legendární pták Moltres střeží město Fudži přímo pod horou Fudži; hlubokomořské ryby v Numazu.",
      "en": "Legendary firebird Moltres guards Fuji City under Mount Fuji; deep-sea fish featured in Numazu.",
      "ja": "富士市に設置された伝説の鳥ポケモン・ファイヤーが雄大な富士山を背景に堂々降臨。",
      "ru": "Легендарная птица Moltres под горой Фудзи и глубоководные покемоны Нумадзу."
    },
    "manholeCount": 5,
    "hasFullCoverage": false,
    "rewardPokemon": "Pikachu",
    "backgroundTheme": {
      "cs": "Posvátná hora Fudži a hlubokomořský záliv Suruga",
      "en": "Sacred Mount Fuji and deep Suruga Bay",
      "ja": "霊峰富士の絶景と駿河湾の深海生物",
      "ru": "Священная гора Фудзи и глубоководный залив Суруга"
    }
  },
  {
    "id": "aichi",
    "manholeImageUrl": "https://local.pokemon.jp/img/p/manhole/b8558e0a74714d9f0519a90cbffb2bd8_l.png",
    "prefecture": {
      "cs": "Aiči (愛知県)",
      "en": "Aichi",
      "ja": "愛知県",
      "ru": "Айти"
    },
    "region": {
      "cs": "Čúbu",
      "en": "Chubu",
      "ja": "中部地方",
      "ru": "Тюбу"
    },
    "ambassadorPokemon": "Sceptile",
    "ambassadorName": {
      "cs": "Sceptile & Alcremie",
      "en": "Sceptile & Alcremie",
      "ja": "ジュカイン＆マホイップ",
      "ru": "Sceptile и Alcremie"
    },
    "culturalRationale": {
      "cs": "Nagoja Kinšači Jokočó, keramické tradice v Seto a Tokoname a čajové zahrady Nišio.",
      "en": "Features Nagoya Castle's Kinshachi Yokocho, ceramic craftsmanship in Seto & Tokoname, and matcha in Nishio.",
      "ja": "名古屋市の金シャチ横丁や常滑焼・瀬戸焼のふるさとなど、愛知の産業と文化を凝縮。",
      "ru": "Замок Нагоя и древние центры гончарного искусства Сэто и Токонаме."
    },
    "manholeCount": 9,
    "hasFullCoverage": false,
    "rewardPokemon": "Pikachu",
    "backgroundTheme": {
      "cs": "Zlatý hrad Nagoja a tradiční keramika Seto a Tokoname",
      "en": "Nagoya Castle golden shachihoko and pottery capitals",
      "ja": "名古屋城の金シャチと瀬戸・常滑の窯業文化",
      "ru": "Золотой замок Нагоя и центры керамики"
    }
  },
  {
    "id": "mie",
    "locationCardUrl": "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/LocationCards/lc_pokelid_mie.png",
    "manholeImageUrl": "https://local.pokemon.jp/img/p/manhole/7f1168d3590ddc36c4964cd276776c02_l.png",
    "prefecture": {
      "cs": "Mie (三重県)",
      "en": "Mie",
      "ja": "三重県",
      "ru": "Миэ"
    },
    "region": {
      "cs": "Kansai",
      "en": "Kansai",
      "ja": "近畿地方",
      "ru": "Кансай"
    },
    "ambassadorPokemon": "Oshawott",
    "ambassadorName": {
      "cs": "Oshawott (Mijumaru)",
      "en": "Oshawott (Mijumaru)",
      "ja": "ミジュマル",
      "ru": "Oshawott (Mijumaru)"
    },
    "culturalRationale": {
      "cs": "Slovní hříčka: Mie se čte Mijú, což zní jako Mijumaru. V březnu 2025 dosáhla 100% pokrytí všech 29 obcí.",
      "en": "Phonetic pun: Mie can be vocalized as Miju. Achieved 100% municipal coverage across all 29 municipalities in March 2025.",
      "ja": "「みえ応援ポケモン」。「三重」と「ミジュ」の響きが縁。2025年3月に県内全29市町設置を達成。",
      "ru": "Игра слов: Миэ звучит как Мидзюмару. В марте 2025 года достигнуто 100% покрытие всех 29 муниципалитетов."
    },
    "manholeCount": 31,
    "hasFullCoverage": true,
    "rewardPokemon": "Pikachu",
    "backgroundTheme": {
      "cs": "Perly Mikimoto, posvátná svatyně Ise a pobřeží Šima",
      "en": "Mikimoto pearls, sacred Ise Jingu and Shima coast",
      "ja": "伊勢志摩国立公園と真珠の海",
      "ru": "Жемчуг Микимото, святилище Исэ и побережье Сима"
    }
  },
  {
    "id": "shiga",
    "manholeImageUrl": "https://local.pokemon.jp/img/p/manhole/723d14bb4afb1187b258976aa5094e0a_l.png",
    "prefecture": {
      "cs": "Šiga (滋賀県)",
      "en": "Shiga",
      "ja": "滋賀県",
      "ru": "Сига"
    },
    "region": {
      "cs": "Kansai",
      "en": "Kansai",
      "ja": "近畿地方",
      "ru": "Кансай"
    },
    "ambassadorPokemon": "Gyarados",
    "ambassadorName": {
      "cs": "Gyarados & Greninja",
      "en": "Gyarados & Greninja",
      "ja": "ギャラドス＆ゲッコウガ",
      "ru": "Gyarados и Greninja"
    },
    "culturalRationale": {
      "cs": "Majestátní Gyarados vládne jezeru Biwa v Ócu; nindža Greninja a Frogadier střeží hrad nindžů v Kóce.",
      "en": "Mighty Gyarados commands Lake Biwa in Otsu; ninja Pokémon Greninja represents the Koka ninja clan.",
      "ja": "大津市の琵琶湖畔に佇むギャラドスと、忍者の里・甲賀市に潜むゲッコウガが圧倒的人気。",
      "ru": "Могучий Gyarados на озере Бива и ниндзя Greninja в Коке."
    },
    "manholeCount": 5,
    "hasFullCoverage": false,
    "rewardPokemon": "Pikachu",
    "backgroundTheme": {
      "cs": "Největší jezero Biwa a nindžové z Kóky",
      "en": "Lake Biwa freshwater sea and Koka Ninja homeland",
      "ja": "マザーレイク琵琶湖と甲賀流忍者の里",
      "ru": "Озеро Бива и родина ниндзя Кока"
    }
  },
  {
    "id": "kyoto",
    "manholeImageUrl": "https://local.pokemon.jp/img/p/manhole/47baa8ef80858e014f938cb01f16ab7b_l.png",
    "prefecture": {
      "cs": "Kjóto (京都府)",
      "en": "Kyoto",
      "ja": "京都府",
      "ru": "Киото"
    },
    "region": {
      "cs": "Kansai",
      "en": "Kansai",
      "ja": "近畿地方",
      "ru": "Кансай"
    },
    "ambassadorPokemon": "Ho-Oh",
    "ambassadorName": {
      "cs": "Ho-Oh & Johto Starters",
      "en": "Ho-Oh & Johto Starters",
      "ja": "ホウオウ＆ジョウト御三家",
      "ru": "Ho-Oh и Стартовики Джото"
    },
    "culturalRationale": {
      "cs": "Fénix Ho-Oh symbolizuje zlatého fénixe na střeše Kinkaku-dži a Byodoinu; čaj Poltchageist/Sinistcha v Udži blízko Nintendo Musea.",
      "en": "Legendary Ho-Oh mirrors the golden phoenix atop Kinkaku-ji; matcha tea Pokémon in Uji near the Nintendo Museum.",
      "ja": "金閣寺や平等院鳳凰堂の鳳凰を彷彿とさせるホウオウや、宇治市の抹茶にちなむチャデスが登場。",
      "ru": "Легендарный Ho-Oh символизирует золотого феникса Кинкаку-дзи, чайные покемоны в Удзи."
    },
    "manholeCount": 8,
    "hasFullCoverage": false,
    "rewardPokemon": "Pikachu",
    "backgroundTheme": {
      "cs": "Zlatý Fénix Hó-ó, chrámové zahrady a čaj matcha v Udži",
      "en": "Golden Phoenix Ho-Oh, ancient temples and Uji matcha",
      "ja": "古都・京都のホウオウと宇治茶のふるさと",
      "ru": "Золотой Феникс Ho-Oh, храмы и чай матча в Удзи"
    }
  },
  {
    "id": "osaka",
    "manholeImageUrl": "https://local.pokemon.jp/img/p/manhole/c5b049a0ebabbe4653c901d1d7d285a5_l.png",
    "prefecture": {
      "cs": "Ósaka (大阪府)",
      "en": "Osaka",
      "ja": "大阪府",
      "ru": "Осака"
    },
    "region": {
      "cs": "Kansai",
      "en": "Kansai",
      "ja": "近畿地方",
      "ru": "Кансай"
    },
    "ambassadorPokemon": "Raikou",
    "ambassadorName": {
      "cs": "Raikou & Yamper",
      "en": "Raikou & Yamper",
      "ja": "ライコウ＆ワンパチ",
      "ru": "Raikou и Yamper"
    },
    "culturalRationale": {
      "cs": "Město technologie a ragby Higašiósaka oslavují elektrický bleskový tygr Raikou, Yamper a Elekid.",
      "en": "Celebrates the technology and rugby heritage of Higashiosaka with Thunder Pokémon Raikou and Yamper.",
      "ja": "花園ラグビー場やモノづくりの高い技術を誇る東大阪市にライコウやでんきタイプが集結。",
      "ru": "Город технологий и регби Хигасиосака с электрическим Raikou."
    },
    "manholeCount": 5,
    "hasFullCoverage": false,
    "rewardPokemon": "Pikachu",
    "backgroundTheme": {
      "cs": "Průmyslová a technologická metropole Higašiósaka",
      "en": "Manufacturing capital Higashiosaka and rugby spirit",
      "ja": "モノづくりの街・東大阪と花園ラグビー",
      "ru": "Промышленная столица Хигасиосака"
    }
  },
  {
    "id": "hyogo",
    "manholeImageUrl": "https://local.pokemon.jp/img/p/manhole/8e5813792f66a65c189ff519bafd76e8_l.png",
    "prefecture": {
      "cs": "Hjógo (兵庫県)",
      "en": "Hyogo",
      "ja": "兵庫県",
      "ru": "Хёго"
    },
    "region": {
      "cs": "Kansai",
      "en": "Kansai",
      "ja": "近畿地方",
      "ru": "Кансай"
    },
    "ambassadorPokemon": "Lugia",
    "ambassadorName": {
      "cs": "Lugia & Cloyster",
      "en": "Lugia & Cloyster",
      "ja": "ルギア＆パルシェン",
      "ru": "Lugia и Cloyster"
    },
    "culturalRationale": {
      "cs": "Mořský strážce Lugia chrání ostrov Awadži v Ósackém zálivu pod obřím visutým mostem Akaši-Kaikjó.",
      "en": "Sea guardian Lugia watches over Awaji Island in Osaka Bay beneath the Akashi Kaikyo Bridge.",
      "ja": "国生み神話の淡路島に、海の守り神である伝説のポケモン・ルギアのポケふたが鎮座。",
      "ru": "Хранитель морей Lugia на острове Авадзи под мостом Акаси-Кайкё."
    },
    "manholeCount": 3,
    "hasFullCoverage": false,
    "rewardPokemon": "Pikachu",
    "backgroundTheme": {
      "cs": "Mytický ostrov Awadži a most Akaši-Kaikjó",
      "en": "Mythical Awaji Island and Akashi Kaikyo Bridge",
      "ja": "国生みの島・淡路島と明石海峡大橋",
      "ru": "Мифический остров Авадзи и мост Акаси-Кайкё"
    }
  },
  {
    "id": "nara",
    "manholeImageUrl": "https://local.pokemon.jp/img/p/manhole/cf516896b4b7eb0cad8e8e3eeebbc99f_l.png",
    "prefecture": {
      "cs": "Nara (奈良県)",
      "en": "Nara",
      "ja": "奈良県",
      "ru": "Нара"
    },
    "region": {
      "cs": "Kansai",
      "en": "Kansai",
      "ja": "近畿地方",
      "ru": "Кансай"
    },
    "ambassadorPokemon": "Entei",
    "ambassadorName": {
      "cs": "Entei & Deerling",
      "en": "Entei & Deerling",
      "ja": "エンテイ＆シキジカ",
      "ru": "Entei и Deerling"
    },
    "culturalRationale": {
      "cs": "Městečko Ikaruga ukrývá nejstarší dřevěný buddhistický chrám na světě Hórjú-dži; jelínek Deerling zrcadlí slavné jeleny z Nary.",
      "en": "Ikaruga hosts Horyu-ji, the world's oldest wooden temple; Deerling honors Nara's sacred deer.",
      "ja": "世界遺産・法隆寺のある斑鳩町に、エンテイや奈良の鹿を思わせるシキジカたちが佇む。",
      "ru": "Городок Икаруга с древнейшим храмом Хорю-дзи и оленями Deerling."
    },
    "manholeCount": 5,
    "hasFullCoverage": false,
    "rewardPokemon": "Pikachu",
    "backgroundTheme": {
      "cs": "Starobylý chrám Hórjú-dži a posvátní jelínci v Ikaruze",
      "en": "Ancient Horyu-ji Temple and sacred deer of Ikaruga",
      "ja": "世界最古の木造建築・法隆寺と斑鳩の里",
      "ru": "Древний храм Хорю-дзи и священные олени"
    }
  },
  {
    "id": "wakayama",
    "manholeImageUrl": "https://local.pokemon.jp/img/p/manhole/0647823671ac088cf1c2812389b1b5c9_l.png",
    "prefecture": {
      "cs": "Wakajama (和歌山県)",
      "en": "Wakayama",
      "ja": "和歌山県",
      "ru": "Вакаяма"
    },
    "region": {
      "cs": "Kansai",
      "en": "Kansai",
      "ja": "近畿地方",
      "ru": "Кансай"
    },
    "ambassadorPokemon": "Celebi",
    "ambassadorName": {
      "cs": "Celebi & Finizen",
      "en": "Celebi & Finizen",
      "ja": "セレビィ＆ナミイルカ",
      "ru": "Celebi и Finizen"
    },
    "culturalRationale": {
      "cs": "Lesní strážce času Celebi u vodopádu Nači podél Kumano Kodó; delfínek Finizen a Pancham v lázeňské Širahamě.",
      "en": "Time-traveling Celebi guards the sacred cedar forests of Kumano Kodo; Finizen & Pancham in coastal Shirahama.",
      "ja": "熊野古道の聖地・那智勝浦にセレビィが降り立ち、白浜温泉ではナミイルカやパンダにちなむヤンチャムが歓迎。",
      "ru": "Celebi на священных тропах Кумано Кодо и Finizen в Сирахаме."
    },
    "manholeCount": 5,
    "hasFullCoverage": false,
    "rewardPokemon": "Pikachu",
    "backgroundTheme": {
      "cs": "Posvátné poutní stezky Kumano Kodó a lázně Širahama",
      "en": "Sacred Kumano Kodo pilgrimage trails & Shirahama onsen",
      "ja": "世界遺産・熊野古道と南紀白浜の碧い海",
      "ru": "Священные тропы Кумано Кодо и онсэн Сирахама"
    }
  },
  {
    "id": "tottori",
    "locationCardUrl": "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/LocationCards/lc_pokelid_tottori.png",
    "manholeImageUrl": "https://local.pokemon.jp/img/p/manhole/4ed2700dca6b81175e2041b6015883ad_l.png",
    "prefecture": {
      "cs": "Tottori (鳥取県)",
      "en": "Tottori",
      "ja": "鳥取県",
      "ru": "Тоттори"
    },
    "region": {
      "cs": "Čúgoku",
      "en": "Chugoku",
      "ja": "中国地方",
      "ru": "Тюгоку"
    },
    "ambassadorPokemon": "Sandshrew",
    "ambassadorName": {
      "cs": "Sandshrew & Alolan Sandshrew",
      "en": "Sandshrew & Alolan Sandshrew",
      "ja": "サンド＆アローラサンド",
      "ru": "Sandshrew и Alolan Sandshrew"
    },
    "culturalRationale": {
      "cs": "Píseční Pokémoni oslavují písečné duny Tottori Sakjú; Alolan Sandshrew zimní sněhy hory Daisen. 100% pokrytí všech 19 obcí.",
      "en": "Ground dwellers celebrate Tottori Sand Dunes; Alolan Sandshrew honors Mt. Daisen snows. 100% coverage across all 19 municipalities.",
      "ja": "「とっとりふるさと大使」。広大な鳥取砂丘と雪の大山を象徴。全19市町村設置達成。",
      "ru": "Песчаные покемоны празднуют дюны Тоттори. 100% покрытие всех 19 муниципалитетов."
    },
    "manholeCount": 20,
    "hasFullCoverage": true,
    "rewardPokemon": "Pikachu",
    "backgroundTheme": {
      "cs": "Písečné duny Tottori Sakjú a hora Daisen",
      "en": "Tottori Sand Dunes and snow-covered Mt. Daisen",
      "ja": "日本最大級の鳥取砂丘と名峰大山",
      "ru": "Песчаные дюны Тоттори Сакю и гора Дайсен"
    }
  },
  {
    "id": "shimane",
    "manholeImageUrl": "https://local.pokemon.jp/img/p/manhole/b9231fe3c20c2f21aa3b59fa2e15d2c9_l.png",
    "prefecture": {
      "cs": "Šimane (島根県)",
      "en": "Shimane",
      "ja": "島根県",
      "ru": "Симане"
    },
    "region": {
      "cs": "Čúgoku",
      "en": "Chugoku",
      "ja": "中国地方",
      "ru": "Тюгоку"
    },
    "ambassadorPokemon": "Gallade",
    "ambassadorName": {
      "cs": "Gallade & Dedenne",
      "en": "Gallade & Dedenne",
      "ja": "エルレイド＆デデンネ",
      "ru": "Gallade и Dedenne"
    },
    "culturalRationale": {
      "cs": "Mytologická svatyně Izumo Taiša, stříbrný důl Iwami Ginzan a ostrovy Oki (kde Dedenne a Lopunny zdobí poklop).",
      "en": "Mythological cradle Izumo Taisha, Iwami Ginzan silver mine, and remote Oki Islands (featuring Dedenne & Lopunny).",
      "ja": "出雲大社の神話や、ジオパーク隠岐の島町に設置されたデデンネ＆ミミロップが魅力。",
      "ru": "Мифологическое святилище Идзумо Тайся и острова Оки."
    },
    "manholeCount": 5,
    "hasFullCoverage": false,
    "rewardPokemon": "Pikachu",
    "backgroundTheme": {
      "cs": "Svatyně bohů Izumo Taiša a stříbrné doly Iwami Ginzan",
      "en": "Grand Shrine of Izumo Taisha and Oki Islands Geopark",
      "ja": "神話の国・出雲大社とユネスコ世界ジオパーク隠岐",
      "ru": "Святилище Идзумо Тайся и острова Оки"
    }
  },
  {
    "id": "okayama",
    "manholeImageUrl": "https://local.pokemon.jp/img/p/manhole/57b32929e283717a3c17bf5694ee5331_l.png",
    "prefecture": {
      "cs": "Okajama (岡山県)",
      "en": "Okayama",
      "ja": "岡山県",
      "ru": "Окаяма"
    },
    "region": {
      "cs": "Čúgoku",
      "en": "Chugoku",
      "ja": "中国地方",
      "ru": "Тюгоку"
    },
    "ambassadorPokemon": "Lucario",
    "ambassadorName": {
      "cs": "Lucario & Grookey",
      "en": "Lucario & Grookey",
      "ja": "ルカリオ＆サルノリ",
      "ru": "Lucario и Grookey"
    },
    "culturalRationale": {
      "cs": "Kurašiki Bikan s historickými kanály, bílými sýpkami a vrbami, kolébka legendy o chlapci z broskve Momotaróvi.",
      "en": "Celebrates Kurashiki Bikan canal district with whitewashed storehouses and the Momotaro legend.",
      "ja": "倉敷美観地区の白壁と柳並木を背景に、ルカリオやサルノリが描かれた情緒あるポケふた。",
      "ru": "Район каналов Курасики Бикан и родина легенды о Момотаро."
    },
    "manholeCount": 4,
    "hasFullCoverage": false,
    "rewardPokemon": "Pikachu",
    "backgroundTheme": {
      "cs": "Historická čtvrť Bikan v Kurašiki a země Momotara",
      "en": "Historic Kurashiki Bikan canal district & Momotaro",
      "ja": "白壁の倉敷美観地区と桃太郎伝説の地",
      "ru": "Исторический район каналов Курасики"
    }
  },
  {
    "id": "yamaguchi",
    "manholeImageUrl": "https://local.pokemon.jp/img/p/manhole/1bf730cea4b0376a673d2aedefc19ce6_l.png",
    "prefecture": {
      "cs": "Jamaguči (山口県)",
      "en": "Yamaguchi",
      "ja": "山口県",
      "ru": "Ямагути"
    },
    "region": {
      "cs": "Čúgoku",
      "en": "Chugoku",
      "ja": "中国地方",
      "ru": "Тюгоку"
    },
    "ambassadorPokemon": "Qwilfish",
    "ambassadorName": {
      "cs": "Qwilfish & Chinchou",
      "en": "Qwilfish & Chinchou",
      "ja": "ハリーセン＆チョンチー",
      "ru": "Qwilfish и Chinchou"
    },
    "culturalRationale": {
      "cs": "Šimonoseki je proslulé jako japonská metropole jedovatých čtverzubců Fugu; poklopy zdobí pichlavý Qwilfish a duel Ekans vs Koffing na ostrově Ganrjúdžima.",
      "en": "Shimonoseki is Japan's pufferfish (fugu) capital, represented by prickly Qwilfish and Ganryujima duel lid.",
      "ja": "下関名物の「ふく（フグ）」にちなんだハリーセンや、巌流島の決闘を模したアーボvsドガース。",
      "ru": "Симоносэки — японская столица рыбы фугу, представленная Qwilfish."
    },
    "manholeCount": 4,
    "hasFullCoverage": false,
    "rewardPokemon": "Pikachu",
    "backgroundTheme": {
      "cs": "Průliv Kanmon a světové hlavní město ryb Fugu v Šimonoseki",
      "en": "Kanmon Strait and Fugu pufferfish capital Shimonoseki",
      "ja": "関門海峡と下関のふく（フグ）文化",
      "ru": "Пролив Канмон и столица рыбы фугу Симоносэки"
    }
  },
  {
    "id": "tokushima",
    "manholeImageUrl": "https://local.pokemon.jp/img/p/manhole/b7feef9605334785b629220d93968bd0_l.png",
    "prefecture": {
      "cs": "Tokušima (徳島県)",
      "en": "Tokushima",
      "ja": "徳島県",
      "ru": "Токусима"
    },
    "region": {
      "cs": "Šikoku",
      "en": "Shikoku",
      "ja": "四国地方",
      "ru": "Сикоку"
    },
    "ambassadorPokemon": "Suicune",
    "ambassadorName": {
      "cs": "Suicune & Kingdra",
      "en": "Suicune & Kingdra",
      "ja": "スイクン＆キングドラ",
      "ru": "Suicune и Kingdra"
    },
    "culturalRationale": {
      "cs": "Město Naruto je světoznámé divokými přílivovými víry; vodní legendární Suicune a Kingdra vládnou vlnám pod mostem Ónaruto.",
      "en": "Naruto City is renowned for its roaring tidal whirlpools, presided over by Legendary Suicune and Kingdra.",
      "ja": "激しい潮流が生み出す「鳴門の渦潮」の上に、水の名神スイクンが威風堂々と君臨。",
      "ru": "Водовороты Наруто, над которыми царствует легендарный водный покемон Suicune."
    },
    "manholeCount": 3,
    "hasFullCoverage": false,
    "rewardPokemon": "Pikachu",
    "backgroundTheme": {
      "cs": "Hřmící mořské víry Naruto a tanec Awa Odori",
      "en": "Roaring Naruto Whirlpools and Onaruto Bridge",
      "ja": "世界三大潮流・鳴門の渦潮と阿波おどり",
      "ru": "Грохочущие водовороты Наруто и мост Онаруто"
    }
  },
  {
    "id": "kagawa",
    "locationCardUrl": "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/LocationCards/lc_pokelid_kagawa.png",
    "manholeImageUrl": "https://local.pokemon.jp/img/p/manhole/1ec34abda217efe011cff081f744466e_l.png",
    "prefecture": {
      "cs": "Kagawa (香川県)",
      "en": "Kagawa",
      "ja": "香川県",
      "ru": "Кагава"
    },
    "region": {
      "cs": "Šikoku",
      "en": "Shikoku",
      "ja": "四国地方",
      "ru": "Сикоку"
    },
    "ambassadorPokemon": "Slowpoke",
    "ambassadorName": {
      "cs": "Slowpoke (Yadon)",
      "en": "Slowpoke (Yadon)",
      "ja": "ヤドン",
      "ru": "Slowpoke (Yadon)"
    },
    "culturalRationale": {
      "cs": "Slavná slovní hříčka: Yadon zní jako nudle Sanuki Udon! Kagawa se oficiálně nazývá \"Prefektura Slowpoke\". 100% pokrytí všech 17 obcí.",
      "en": "World-famous pun: Yadon sounds like Sanuki Udon noodles! Official \"Slowpoke Prefecture\". 100% coverage across all 17 municipalities.",
      "ja": "「うどん県PR団」。「讃岐うどん」と「ヤドン」の語呂合わせから任命。全17市町設置達成。",
      "ru": "Игра слов: Ядон звучит как Сануки Удон! Официальная \"Префектура Слоупока\". 100% покрытие всех 17 муниципалитетов."
    },
    "manholeCount": 18,
    "hasFullCoverage": true,
    "rewardPokemon": "Pikachu",
    "backgroundTheme": {
      "cs": "Mísa Sanuki Udon, most Seto Óhaši a park Yadon",
      "en": "Sanuki Udon bowl, Seto Ohashi Bridge and Yadon Park",
      "ja": "讃岐うどんのどんぶりと瀬戸大橋",
      "ru": "Чаша лапши Сануки Удон и мост Сэто Охаси"
    }
  },
  {
    "id": "ehime",
    "manholeImageUrl": "https://local.pokemon.jp/img/p/manhole/5cfd8d62b32230e7062a428e6a8d5314_l.png",
    "prefecture": {
      "cs": "Ehime (愛媛県)",
      "en": "Ehime",
      "ja": "愛媛県",
      "ru": "Эхиме"
    },
    "region": {
      "cs": "Šikoku",
      "en": "Shikoku",
      "ja": "四国地方",
      "ru": "Сикоку"
    },
    "ambassadorPokemon": "Sirfetchd",
    "ambassadorName": {
      "cs": "Sirfetch'd & Tsareena",
      "en": "Sirfetch'd & Tsareena",
      "ja": "ネギガナイト＆アマージョ",
      "ru": "Sirfetch'd и Tsareena"
    },
    "culturalRationale": {
      "cs": "Rytířský Sirfetch'd a Tsareena zdobí město Macujama s hradem a 3000 let starými lázněmi Dógo Onsen.",
      "en": "Sirfetch'd and Tsareena adorn historic Matsuyama City, home to Matsuyama Castle and 3,000-year-old Dogo Onsen.",
      "ja": "日本最古の名湯・道後温泉や松山城のある松山市に、気品あるネギガナイトたちが鎮座。",
      "ru": "Sirfetch'd и Tsareena в историческом городе Мацуяма с замком и онсэном Дого."
    },
    "manholeCount": 2,
    "hasFullCoverage": false,
    "rewardPokemon": "Pikachu",
    "backgroundTheme": {
      "cs": "Nejstarší lázně Dógo Onsen a hrad Macujama",
      "en": "Historic Dogo Onsen and Matsuyama Castle",
      "ja": "日本最古の温泉・道後温泉と松山城",
      "ru": "Древнейший онсэн Дого и замок Мацуяма"
    }
  },
  {
    "id": "kochi",
    "locationCardUrl": "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/LocationCards/lc_pokelid_kochi.png",
    "manholeImageUrl": "https://local.pokemon.jp/img/p/manhole/3dda90802522e2534fe7342352ec6681_l.png",
    "prefecture": {
      "cs": "Kóči (高知県)",
      "en": "Kochi",
      "ja": "高知県",
      "ru": "Коти"
    },
    "region": {
      "cs": "Šikoku",
      "en": "Shikoku",
      "ja": "四国地方",
      "ru": "Сикоку"
    },
    "ambassadorPokemon": "Quagsire",
    "ambassadorName": {
      "cs": "Quagsire (Nuo)",
      "en": "Quagsire (Nuo)",
      "ja": "ヌオー",
      "ru": "Quagsire (Nuo)"
    },
    "culturalRationale": {
      "cs": "Listopad 2024: Jmenován \"Kóči Aficionado Pokémon\". Klidný vodní Quagsire ztělesňuje nejčistší řeky Japonska Šimanto a Nijodo.",
      "en": "Appointed November 2024 as \"Kochi Aficionado Pokémon\". Peaceful Quagsire represents pristine freshwater rivers Shimanto & Niyodo.",
      "ja": "「高知だいすきポケモン」（2024年11月就任）。清流・四万十川や奇跡の清流「仁淀ブルー」を象徴。",
      "ru": "Назначен в ноябре 2024 года. Спокойный Quagsire символизирует чистейшие реки Японии Симанто и Ниёдо."
    },
    "manholeCount": 18,
    "hasFullCoverage": false,
    "rewardPokemon": "Pikachu",
    "backgroundTheme": {
      "cs": "Průzračné řeky Šimanto a Nijodo a Tichý oceán",
      "en": "Crystal-clear Shimanto & Niyodo rivers and Pacific coast",
      "ja": "清流四万十川・仁淀ブルーと太平洋の黒潮",
      "ru": "Кристальные реки Симанто и Ниёдо"
    }
  },
  {
    "id": "fukuoka",
    "manholeImageUrl": "https://local.pokemon.jp/img/p/manhole/9f18ef1fb249c26b80202eabfd32d469_l.png",
    "prefecture": {
      "cs": "Fukuoka (福岡県)",
      "en": "Fukuoka",
      "ja": "福岡県",
      "ru": "Фукуока"
    },
    "region": {
      "cs": "Kjúšú",
      "en": "Kyushu",
      "ja": "九州地方",
      "ru": "Кюсю"
    },
    "ambassadorPokemon": "Duraludon",
    "ambassadorName": {
      "cs": "Duraludon & Aegislash",
      "en": "Duraludon & Aegislash",
      "ja": "ジュラルドン＆ギルガルド",
      "ru": "Duraludon и Aegislash"
    },
    "culturalRationale": {
      "cs": "Posvátná svatyně Dazaifu (Aegislash, Alakazam - moudrost) a ocelové průmyslové město Kitakjúšú (Duraludon).",
      "en": "Wisdom Pokémon in academic Dazaifu (Alakazam, Aegislash) and steel titan Duraludon in industrial Kitakyushu.",
      "ja": "学問の聖地・太宰府天満宮（フーディン等）や鉄鋼の街・北九州市（ジュラルドン等）を巡る。",
      "ru": "Святилище Дадзайфу (покемоны мудрости) и индустриальный Китакюсю (Duraludon)."
    },
    "manholeCount": 8,
    "hasFullCoverage": false,
    "rewardPokemon": "Pikachu",
    "backgroundTheme": {
      "cs": "Historická svatyně Dazaifu Tenmangú a přístav Kitakjúšú",
      "en": "Historic Dazaifu Tenmangu Shrine and Mojiko Retro port",
      "ja": "学問の神様・太宰府天満宮と北九州門司港レトロ",
      "ru": "Святилище Дадзайфу Тэнмангу и порт Китакюсю"
    }
  },
  {
    "id": "saga",
    "manholeImageUrl": "https://local.pokemon.jp/img/p/manhole/64eddebc32fe29d163ab826aea4181c1_l.png",
    "prefecture": {
      "cs": "Saga (佐賀県)",
      "en": "Saga",
      "ja": "佐賀県",
      "ru": "Сага"
    },
    "region": {
      "cs": "Kjúšú",
      "en": "Kyushu",
      "ja": "九州地方",
      "ru": "Кюсю"
    },
    "ambassadorPokemon": "Meowth",
    "ambassadorName": {
      "cs": "Meowth Trio (Classic, Alolan, Galarian)",
      "en": "Meowth Trio (Classic, Alolan, Galarian)",
      "ja": "ニャーストリオ（原種・アローラ・ガラル）",
      "ru": "Трио Meowth"
    },
    "culturalRationale": {
      "cs": "Město Saga hostí největší festival horkovzdušných balónů v Asii; Rakeťácký balón Meowtha inspiroval trojici poklopů Meowtha.",
      "en": "Saga hosts Asia's largest hot air balloon festival, celebrated by the Team Rocket Meowth Balloon trio lids.",
      "ja": "アジア最大級の熱気球大会にちなみ、ロケット団の気球でおなじみのニャース3種が佐賀市に集結。",
      "ru": "Сага проводит крупнейший фестиваль воздушных шаров, вдохновивший трио люков Meowth."
    },
    "manholeCount": 3,
    "hasFullCoverage": false,
    "rewardPokemon": "Pikachu",
    "backgroundTheme": {
      "cs": "Mezinárodní festival horkovzdušných balónů v Saze",
      "en": "Saga International Balloon Fiesta",
      "ja": "佐賀インターナショナルバルーンフェスタと気球の街",
      "ru": "Международный фестиваль воздушных шаров в Саге"
    }
  },
  {
    "id": "nagasaki",
    "locationCardUrl": "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/LocationCards/lc_pokelid_nagasaki.png",
    "manholeImageUrl": "https://local.pokemon.jp/img/p/manhole/273a40e9db77b08bc4a8aadd8d8f5d6d_l.png",
    "prefecture": {
      "cs": "Nagasaki (長崎県)",
      "en": "Nagasaki",
      "ja": "長崎県",
      "ru": "Нагасаки"
    },
    "region": {
      "cs": "Kjúšú",
      "en": "Kyushu",
      "ja": "九州地方",
      "ru": "Кюсю"
    },
    "ambassadorPokemon": "Ampharos",
    "ambassadorName": {
      "cs": "Ampharos (Denryu)",
      "en": "Ampharos (Denryu)",
      "ja": "デンリュウ",
      "ru": "Ampharos (Denryu)"
    },
    "culturalRationale": {
      "cs": "Červen 2024: Jmenován \"Nagasaki Future Support Pokémon\". Světelný maják Ampharos symbolizuje historické námořní přístavy Nagasaki.",
      "en": "Appointed June 2024 as \"Nagasaki Future Support Pokémon\". Light Pokémon Ampharos reflects port lighthouses and maritime trade.",
      "ja": "「ながさき未来応援ポケモン」（2024年6月就任）。光の灯台デンリュウが港町・長崎の未来を照らす。",
      "ru": "Назначен в июне 2024 года. Ampharos освещает путь кораблям в историческом порту Нагасаки."
    },
    "manholeCount": 15,
    "hasFullCoverage": false,
    "rewardPokemon": "Pikachu",
    "backgroundTheme": {
      "cs": "Historické námořní majáky a ostrovy Gotó",
      "en": "Historic ocean lighthouses and Goto Islands",
      "ja": "世界遺産の大浦天主堂と長崎の灯台の光",
      "ru": "Исторические морские маяки и острова Гото"
    }
  },
  {
    "id": "miyazaki",
    "locationCardUrl": "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/LocationCards/lc_pokelid_miyazaki.png",
    "manholeImageUrl": "https://local.pokemon.jp/img/p/manhole/aa92f7d136b868b5252b1fc6994ce947_l.png",
    "prefecture": {
      "cs": "Mijazaki (宮崎県)",
      "en": "Miyazaki",
      "ja": "宮崎県",
      "ru": "Миядзаки"
    },
    "region": {
      "cs": "Kjúšú",
      "en": "Kyushu",
      "ja": "九州地方",
      "ru": "Кюсю"
    },
    "ambassadorPokemon": "Exeggutor-Alolan",
    "ambassadorName": {
      "cs": "Exeggutor & Alolan Exeggutor",
      "en": "Exeggutor & Alolan Exeggutor",
      "ja": "ナッシー＆アローラナッシー",
      "ru": "Exeggutor и Alolan Exeggutor"
    },
    "culturalRationale": {
      "cs": "Oficiální strom prefektury je datlová palma Phoenix, kterou Alolan Exeggutor dokonale ztělesňuje. 100% pokrytí všech 26 obcí.",
      "en": "Prefecture tree is the Phoenix palm, perfectly mirrored by towering Alolan Exeggutor. 100% coverage across all 26 municipalities.",
      "ja": "「宮崎だいすきポケモン」。県の木フェニックスにそっくりなナッシーたちが全26市町村すべてを応援。",
      "ru": "Официальное дерево префектуры — финиковая пальма, идеально воплощенная Alolan Exeggutor. 100% покрытие всех 26 муниципалитетов."
    },
    "manholeCount": 26,
    "hasFullCoverage": true,
    "rewardPokemon": "Pikachu",
    "backgroundTheme": {
      "cs": "Slunečné pobřeží Ničinan a palmy Phoenix",
      "en": "Tropical Nichinan coastline and Phoenix palm trees",
      "ja": "南国宮崎の日南海岸とフェニックスの並木",
      "ru": "Солнечное побережье Нитинан и финиковые пальмы"
    }
  },
  {
    "id": "kagoshima",
    "locationCardUrl": "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/LocationCards/lc_pokelid_kagoshima.png",
    "manholeImageUrl": "https://local.pokemon.jp/img/p/manhole/5953fdc915091e1bfb6a059b8de5a086_l.png",
    "prefecture": {
      "cs": "Kagošima (鹿児島県)",
      "en": "Kagoshima",
      "ja": "鹿児島県",
      "ru": "Кагосима"
    },
    "region": {
      "cs": "Kjúšú",
      "en": "Kyushu",
      "ja": "九州地方",
      "ru": "Кюсю"
    },
    "ambassadorPokemon": "Eevee",
    "ambassadorName": {
      "cs": "Eevee & Evolutions (Ibusuki)",
      "en": "Eevee & Evolutions (Ibusuki)",
      "ja": "イーブイとその進化形（指宿市）",
      "ru": "Eevee и эволюции (Ибусуки)"
    },
    "culturalRationale": {
      "cs": "Městský ambasador Ibusuki: \"I love Suki\" zní jako Eevee (Ībui)! Zde byl 20. prosince 2018 instalován vůbec 1. poklop na světě.",
      "en": "City-level ambassador for Ibusuki: \"I love Suki\" sounds like Eevee. World's very first Poké Lid installed here Dec 20, 2018.",
      "ja": "指宿市スポーツ・文化交流大使。「イーブイ好き→いぶすき」の縁で、2018年12月に世界初のポケふたが誕生。",
      "ru": "Городской посол Ибусуки: \"I love Suki\" звучит как Eevee! 20 декабря 2018 года здесь был установлен первый в мире люк."
    },
    "manholeCount": 9,
    "hasFullCoverage": false,
    "rewardPokemon": "Pikachu",
    "backgroundTheme": {
      "cs": "Horké vulkanické písky Ibusuki Onsen",
      "en": "Volcanic sand baths of Ibusuki Onsen and Mt. Kaimon",
      "ja": "指宿温泉の天然砂むし温泉と開聞岳",
      "ru": "Вулканические песчаные ванны онсэна Ибусуки"
    }
  },
  {
    "id": "okinawa",
    "locationCardUrl": "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/LocationCards/lc_pokelid_okinawa.png",
    "manholeImageUrl": "https://local.pokemon.jp/img/p/manhole/6ea8d929a518be32eb78754371390526_l.png",
    "prefecture": {
      "cs": "Okinawa (沖縄県)",
      "en": "Okinawa",
      "ja": "沖縄県",
      "ru": "Окинава"
    },
    "region": {
      "cs": "Okinawa",
      "en": "Okinawa",
      "ja": "沖縄地方",
      "ru": "Окинава"
    },
    "ambassadorPokemon": "Growlithe",
    "ambassadorName": {
      "cs": "Growlithe (Ryukyuan Shisa)",
      "en": "Growlithe (Ryukyuan Shisa)",
      "ja": "ガーディ（琉球シーサー）",
      "ru": "Growlithe (Рюкюский Сиса)"
    },
    "culturalRationale": {
      "cs": "Únor 2024: Jmenován \"Okinawa Support Pokémon\". Vychází z mýtických ochranných lvů Šíša na tradičních střechách Okinawy.",
      "en": "Appointed Feb 2024 as \"Okinawa Support Pokémon\", inspired by traditional Ryukyuan Shisa guardian lion-dogs.",
      "ja": "「おきなわ応援ポケモン」（2024年2月就任）。屋根の上から魔を払う琉球の守り神「シーサー」のモデル。",
      "ru": "Назначен в феврале 2024 года. Вдохновлен традиционными рюкюскими львами-стражами Сиса."
    },
    "manholeCount": 17,
    "hasFullCoverage": false,
    "rewardPokemon": "Pikachu",
    "backgroundTheme": {
      "cs": "Rjúkjúské strážné sochy Šíša a korálové útesy",
      "en": "Ryukyuan Shisa roof guardians and coral reefs",
      "ja": "琉球の守り神シーサーとエメラルドの海",
      "ru": "Рюкюские стражи Сиса и коралловые рифы"
    }
  }
];

export const SPECIAL_BACKGROUNDS_CATALOG: SpecialBackgroundItem[] = [
  {
    "id": "ultra-space-wormhole",
    "title": {
      "cs": "Ultra Space (Červí díra)",
      "en": "Ultra Space (Wormhole)",
      "ja": "ウルトラホール（ウルトラスペース）",
      "ru": "Ultra Space (Червоточина)"
    },
    "event": {
      "cs": "GO Fest 2024: Global & Inbound from Ultra Space",
      "en": "GO Fest 2024: Global & Inbound from Ultra Space",
      "ja": "GO Fest 2024 グローバル＆ウルトラスペース",
      "ru": "GO Fest 2024 Global"
    },
    "year": 2024,
    "category": "global",
    "location": {
      "cs": "Celosvětově (5★ Raidy)",
      "en": "Worldwide (5★ Raids)",
      "ja": "全世界（星5レイド）",
      "ru": "Весь мир (5★ рейды)"
    },
    "featuredPokemon": [
      "Necrozma",
      "Nihilego",
      "Buzzwole",
      "Pheromosa",
      "Xurkitree",
      "Celesteela",
      "Kartana",
      "Guzzlord",
      "Blacephalon",
      "Stakataka"
    ],
    "backgroundArtwork": {
      "cs": "Rotující multidimenzionální červí díra Ultra Space s temně fialovými a azurovými paprsky",
      "en": "Swirling multidimensional Ultra Space wormhole with dark purple and cyan cosmic vortexes",
      "ja": "紫とシアンの光が渦巻くウルトラホールの次元の裂け目",
      "ru": "Вращающаяся червоточина Ultra Space с фиолетово-лазурными космическими вихрями"
    },
    "acquisitionMethod": {
      "cs": "Náhodný drop z 5★ raidů Ultra Beasts a Necrozmy (šance cca 1 z 5 raidů)",
      "en": "Random drop from 5-Star Ultra Beast and Necrozma raids (~1 in 5 chance)",
      "ja": "ウルトラビーストおよびネクロズマの星5レイド勝利時に確率で付与",
      "ru": "Случайный шанс в 5-звездочных рейдах на Ultra Beasts и Necrozma"
    },
    "isGlobal": true,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/hokkaido.png"
  },
  {
    "id": "solgaleo-sunburst",
    "title": {
      "cs": "Zářivé Slunce (Radiant Sunburst)",
      "en": "Radiant Sunburst (Solar)",
      "ja": "日輪の輝き（ソーラー）",
      "ru": "Radiant Sunburst"
    },
    "event": {
      "cs": "GO Fest 2024: Global Special Research",
      "en": "GO Fest 2024: Global Special Research",
      "ja": "GO Fest 2024 スペシャルリサーチ",
      "ru": "GO Fest 2024 Special Research"
    },
    "year": 2024,
    "category": "global",
    "location": {
      "cs": "Celosvětově (Special Research odměna)",
      "en": "Worldwide (Special Research Reward)",
      "ja": "全世界（スペシャルリサーチ報酬）",
      "ru": "Весь мир (Награда за квест)"
    },
    "featuredPokemon": [
      "Solgaleo"
    ],
    "backgroundArtwork": {
      "cs": "Zlatá sluneční koróna s pulzujícími solárními erupcemi",
      "en": "Golden solar corona with pulsing solar flare arcs",
      "ja": "黄金の太陽フレアと燃え盛るコロナ",
      "ru": "Золотая солнечная корона с пульсирующими протуберанцами"
    },
    "acquisitionMethod": {
      "cs": "Garantovaná odměna za dokončení příběhového výzkumu GO Fest 2024",
      "en": "Guaranteed reward for completing the GO Fest 2024 ticketed storyline",
      "ja": "GO Fest 2024限定スペシャルリサーチ完遂時に確定入手",
      "ru": "Гарантированная награда за прохождение специального квеста GO Fest 2024"
    },
    "isGlobal": true,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/solgaleo-sunburst.png"
  },
  {
    "id": "lunala-crescent",
    "title": {
      "cs": "Měsíční Srpek (Luminescent Moon)",
      "en": "Luminescent Moon (Lunar)",
      "ja": "月輪の残光（ルナ）",
      "ru": "Luminescent Moon"
    },
    "event": {
      "cs": "GO Fest 2024: Global Special Research",
      "en": "GO Fest 2024: Global Special Research",
      "ja": "GO Fest 2024 スペシャルリサーチ",
      "ru": "GO Fest 2024 Special Research"
    },
    "year": 2024,
    "category": "global",
    "location": {
      "cs": "Celosvětově (Special Research odměna)",
      "en": "Worldwide (Special Research Reward)",
      "ja": "全世界（スペシャルリサーチ報酬）",
      "ru": "Весь мир (Награда за квест)"
    },
    "featuredPokemon": [
      "Lunala"
    ],
    "backgroundArtwork": {
      "cs": "Zářící měsíční srpek uprostřed hlubokého nočního vesmíru a mlhovin",
      "en": "Glowing crescent moon amidst deep cosmic nebulae and stars",
      "ja": "深淵の宇宙に浮かぶ神秘的な三日月と星雲",
      "ru": "Светящийся полумесяц среди глубоких туманностей и звезд"
    },
    "acquisitionMethod": {
      "cs": "Garantovaná odměna za dokončení příběhového výzkumu GO Fest 2024",
      "en": "Guaranteed reward for completing the GO Fest 2024 ticketed storyline",
      "ja": "GO Fest 2024限定スペシャルリサーチ完遂時に確定入手",
      "ru": "Гарантированная награда за прохождение специального квеста GO Fest 2024"
    },
    "isGlobal": true,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/lunala-crescent.png"
  },
  {
    "id": "necrozma-solar-lunar-fusion",
    "title": {
      "cs": "Fúzní Zatmění (Solar / Lunar Eclipse)",
      "en": "Fusion Eclipse (Solar & Lunar)",
      "ja": "合体エクリプス（日食／月食フュージョン）",
      "ru": "Fusion Eclipse"
    },
    "event": {
      "cs": "Fúze Necrozmy se Solgaleo / Lunala",
      "en": "Necrozma Fusion with Solgaleo / Lunala",
      "ja": "ネクロズマ合体ギミック",
      "ru": "Слияние Некрозмы"
    },
    "year": 2024,
    "category": "global",
    "location": {
      "cs": "Celosvětově (Mechanika Fúze)",
      "en": "Worldwide (Fusion Mechanics)",
      "ja": "全世界（合体実行時）",
      "ru": "Весь мир (Механика слияния)"
    },
    "featuredPokemon": [
      "Necrozma-Dusk-Mane",
      "Necrozma-Dawn-Wings"
    ],
    "backgroundArtwork": {
      "cs": "Kombinované pozadí spojující Červí díru s motivem Slunce nebo Měsíce",
      "en": "Blended background fusing the Ultra Space wormhole with Sunburst or Moon aesthetic",
      "ja": "ウルトラホールと日輪・月輪の光が融合した複合背景",
      "ru": "Комбинированный фон червоточины Ultra Space с солнечным или лунным диском"
    },
    "acquisitionMethod": {
      "cs": "Spojení Necrozmy s Wormhole pozadím a Solgalea/Lunaly se Sun/Moon pozadím!",
      "en": "Fusing a Wormhole Necrozma with a Sunburst Solgaleo or Moon Lunala!",
      "ja": "背景付きネクロズマと背景付きソルガレオ／ルナアーラを合体させると自動発現！",
      "ru": "Слияние Некрозмы с фоном Wormhole и Солгалео/Луналы с фоном Sun/Moon!"
    },
    "isGlobal": true,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/necrozma-solar-lunar-fusion.png"
  },
  {
    "id": "team-valor-candela",
    "title": {
      "cs": "Team Valor (Plameny Candely)",
      "en": "Team Valor (Candela's Embers)",
      "ja": "チームヴァーラー（キャンデラの紅蓮）",
      "ru": "Team Valor (Пламя Кандели)"
    },
    "event": {
      "cs": "Triumph Together & Candela's Quest",
      "en": "Triumph Together & Candela's Quest",
      "ja": "チームコラボ＆キャンデラのリサーチ",
      "ru": "Triumph Together и Candela's Quest"
    },
    "year": 2024,
    "category": "global",
    "location": {
      "cs": "Celosvětově (Timed Research)",
      "en": "Worldwide (Timed Research)",
      "ja": "全世界（タイムチャレンジ）",
      "ru": "Весь мир (Timed Research)"
    },
    "featuredPokemon": [
      "Ponyta",
      "Moltres",
      "Charmander",
      "Cyndaquil",
      "Torchic",
      "Chimchar",
      "Tepig",
      "Fennekin",
      "Litten",
      "Scorbunny",
      "Fuecoco"
    ],
    "backgroundArtwork": {
      "cs": "Žhnoucí rudé plameny, žhavé uhlíky a dynamický znak Team Valor",
      "en": "Blazing red embers, rising heat waves, and dynamic Team Valor insignia",
      "ja": "燃え盛る紅蓮の業火とチームヴァーラーの紋章",
      "ru": "Пылающее пламя, угли и эмблема Team Valor"
    },
    "acquisitionMethod": {
      "cs": "Odměna za splnění globální výzvy Team Valor a tematických výzkumů",
      "en": "Reward for clearing Team Valor global milestones and quests",
      "ja": "チームヴァーラーのグローバルチャレンジ達成報酬",
      "ru": "Награда за глобальные испытания Team Valor"
    },
    "isGlobal": true,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/team-valor-candela.png"
  },
  {
    "id": "team-instinct-spark",
    "title": {
      "cs": "Team Instinct (Blesky Sparka)",
      "en": "Team Instinct (Spark's Lightning)",
      "ja": "チームインスティンクト（スパークの電撃）",
      "ru": "Team Instinct (Молнии Спарка)"
    },
    "event": {
      "cs": "Triumph Together & Spark's Quest",
      "en": "Triumph Together & Spark's Quest",
      "ja": "チームコラボ＆スパークのリサーチ",
      "ru": "Triumph Together и Spark's Quest"
    },
    "year": 2024,
    "category": "global",
    "location": {
      "cs": "Celosvětově (Timed Research)",
      "en": "Worldwide (Timed Research)",
      "ja": "全世界（タイムチャレンジ）",
      "ru": "Весь мир (Timed Research)"
    },
    "featuredPokemon": [
      "Elekid",
      "Zapdos",
      "Bulbasaur",
      "Chikorita",
      "Treecko",
      "Turtwig",
      "Snivy",
      "Chespin",
      "Rowlet",
      "Grookey",
      "Sprigatito"
    ],
    "backgroundArtwork": {
      "cs": "Klikaté zlaté blesky, elektrické výboje a emblém Team Instinct",
      "en": "Jagged golden electric lightning arcs and Team Instinct emblem",
      "ja": "炸裂する黄金の稲妻とチームインスティンクトの紋章",
      "ru": "Золотые молнии, электрические разряды и эмблема Team Instinct"
    },
    "acquisitionMethod": {
      "cs": "Odměna za splnění globální výzvy Team Instinct a tematických výzkumů",
      "en": "Reward for clearing Team Instinct global milestones and quests",
      "ja": "チームインスティンクトのグローバルチャレンジ達成報酬",
      "ru": "Награда за глобальные испытания Team Instinct"
    },
    "isGlobal": true,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/team-instinct-spark.png"
  },
  {
    "id": "team-mystic-blanche",
    "title": {
      "cs": "Team Mystic (Mrazivé Krystaly Blanche)",
      "en": "Team Mystic (Blanche's Frost)",
      "ja": "チームミスティック（ブランシェの氷晶）",
      "ru": "Team Mystic (Кристаллы Бланш)"
    },
    "event": {
      "cs": "Triumph Together & Blanche's Quest",
      "en": "Triumph Together & Blanche's Quest",
      "ja": "チームコラボ＆ブランシェのリサーチ",
      "ru": "Triumph Together и Blanche's Quest"
    },
    "year": 2024,
    "category": "global",
    "location": {
      "cs": "Celosvětově (Timed Research)",
      "en": "Worldwide (Timed Research)",
      "ja": "全世界（タイムチャレンジ）",
      "ru": "Весь мир (Timed Research)"
    },
    "featuredPokemon": [
      "Lapras",
      "Articuno",
      "Squirtle",
      "Totodile",
      "Mudkip",
      "Piplup",
      "Oshawott",
      "Froakie",
      "Popplio",
      "Sobble",
      "Quaxly"
    ],
    "backgroundArtwork": {
      "cs": "Čisté azurové ledové krystaly, třpytivá jinovatka a znak Team Mystic",
      "en": "Sharp azure ice crystal lattices, shimmering frost, and Team Mystic crest",
      "ja": "幾何学的な蒼氷の結晶とチームミスティックの紋章",
      "ru": "Лазурные ледяные кристаллы, морозный блеск и эмблема Team Mystic"
    },
    "acquisitionMethod": {
      "cs": "Odměna za splnění globální výzvy Team Mystic a tematických výzkumů",
      "en": "Reward for clearing Team Mystic global milestones and quests",
      "ja": "チームミスティックのグローバルチャレンジ達成報酬",
      "ru": "Награда за глобальные испытания Team Mystic"
    },
    "isGlobal": true,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/team-mystic-blanche.png"
  },
  {
    "id": "wild-area-global-soundwave",
    "title": {
      "cs": "Wild Area Global (Neonová Zvuková Vlna)",
      "en": "Wild Area Global (Neon Soundwave)",
      "ja": "ワイルドエリア・グローバル（ネオン音波）",
      "ru": "Wild Area Global"
    },
    "event": {
      "cs": "Pokémon GO Wild Area Global 2024",
      "en": "Pokémon GO Wild Area Global 2024",
      "ja": "GO ワイルドエリア：グローバル 2024",
      "ru": "Wild Area Global 2024"
    },
    "year": 2024,
    "category": "global",
    "location": {
      "cs": "Celosvětově (Max Battles a Raidy)",
      "en": "Worldwide (Max Battles & Raids)",
      "ja": "全世界（マックスバトル＆レイド）",
      "ru": "Весь мир (Max Battles и рейды)"
    },
    "featuredPokemon": [
      "Toxtricity",
      "Kyogre-Primal",
      "Groudon-Primal",
      "Dialga-Origin",
      "Palkia-Origin"
    ],
    "backgroundArtwork": {
      "cs": "Elektrická neonová zvuková vlna v punkovém fialovo-žlutém stylu",
      "en": "Electrifying neon audio soundwave graphics with purple-yellow punk styling",
      "ja": "紫と黄色のパンクロック調ネオンイコライザー音波",
      "ru": "Неоновые звуковые волны в фиолетово-желтом панк-стиле"
    },
    "acquisitionMethod": {
      "cs": "Náhodná odměna z Max Battles a 5★ raidů během globálního víkendu Wild Area",
      "en": "Random encounter drop from Max Battles and 5-Star raids during Wild Area Global",
      "ja": "ワイルドエリア期間中のマックスバトルおよび星5レイド勝利時に確率ドロップ",
      "ru": "Случайный дроп из Max Battles и 5★ рейдов во время Wild Area Global"
    },
    "isGlobal": true,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/wild-area-global-soundwave.png"
  },
  {
    "id": "december-2024-community-day",
    "title": {
      "cs": "December Community Day 2024 (Hvězdná Oslava)",
      "en": "December Community Day 2024 (All-Star)",
      "ja": "2024年12月 コミュニティ・デイ総決算",
      "ru": "December Community Day 2024"
    },
    "event": {
      "cs": "December 2024 Community Day Weekend",
      "en": "December 2024 Community Day Weekend",
      "ja": "2024年12月コミュニティ・デイ",
      "ru": "Декабрьский Community Day 2024"
    },
    "year": 2024,
    "category": "global",
    "location": {
      "cs": "Celosvětově (Special Research & Raidy)",
      "en": "Worldwide (Special Research & Raids)",
      "ja": "全世界（リサーチ＆レイド）",
      "ru": "Весь мир (Квесты и рейды)"
    },
    "featuredPokemon": [
      "Mankey",
      "Bellsprout",
      "Ponyta",
      "Chansey",
      "Porygon",
      "Cyndaquil",
      "Bagon",
      "Beldum",
      "Goomy",
      "Rowlet",
      "Litten",
      "Popplio"
    ],
    "backgroundArtwork": {
      "cs": "Barevné slavnostní konfety a diamantové jiskry rekapitulující rok 2024",
      "en": "Festive multicolored confetti and diamond sparkles celebrating the class of 2024",
      "ja": "2024年を総括する華やかな紙吹雪ときらめく光の結晶",
      "ru": "Праздничное конфетти и искры в честь покемонов 2024 года"
    },
    "acquisitionMethod": {
      "cs": "Dokončení placeného víkendového výzkumu December Community Day",
      "en": "Completing the ticketed December Community Day weekend storyline",
      "ja": "有料スペシャルリサーチ達成で確定入手",
      "ru": "Награда за праздничный спец-квест Community Day"
    },
    "isGlobal": true,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/december-2024-community-day.png"
  },
  {
    "id": "dual-destiny-season",
    "title": {
      "cs": "Dual Destiny (Dvojí Osud)",
      "en": "Dual Destiny Season",
      "ja": "デュアルデスティニー（運命の双対）",
      "ru": "Dual Destiny Season"
    },
    "event": {
      "cs": "Community Days: Zima 2025 (Sprigatito, Ralts, Karrablast)",
      "en": "Community Days: Winter 2025",
      "ja": "2025年冬 コミュニティ・デイ",
      "ru": "Dual Destiny Community Days 2025"
    },
    "year": 2025,
    "category": "global",
    "location": {
      "cs": "Celosvětově (Community Day Research)",
      "en": "Worldwide (Community Day Research)",
      "ja": "全世界（コミュニティ・デイ）",
      "ru": "Весь мир (Community Day)"
    },
    "featuredPokemon": [
      "Sprigatito",
      "Ralts",
      "Karrablast",
      "Shelmet"
    ],
    "backgroundArtwork": {
      "cs": "Prolínající se světelné linie osudu v modrých a fialových gradientních tónech",
      "en": "Intertwined cosmic threads of destiny in shifting blue-purple gradients",
      "ja": "青と紫のグラデーションで描かれる運命の交錯ライン",
      "ru": "Переплетенные нити судьбы в сине-фиолетовых градиентах"
    },
    "acquisitionMethod": {
      "cs": "Odměna ze Special Research během Community Days sezóny Dual Destiny",
      "en": "Special Research ticket reward during Dual Destiny season events",
      "ja": "デュアルデスティニー期コミュニティ・デイのリサーチ報酬",
      "ru": "Награда за платный квест Community Day сезона Dual Destiny"
    },
    "isGlobal": true,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/dual-destiny-season.png"
  },
  {
    "id": "unova-enigma",
    "title": {
      "cs": "Enigma (Záhady Unovy)",
      "en": "Unova Enigma",
      "ja": "イッシュ・エニグマ（古代の謎）",
      "ru": "Unova Enigma"
    },
    "event": {
      "cs": "Pokémon GO Tour: Unova – Road to Unova",
      "en": "Pokémon GO Tour: Unova – Road to Unova",
      "ja": "GO Tour イッシュへの道",
      "ru": "Road to Unova"
    },
    "year": 2025,
    "category": "global",
    "location": {
      "cs": "Celosvětově (Field Research & Spawny)",
      "en": "Worldwide (Field Research & Spawns)",
      "ja": "全世界（フィールドリサーチ）",
      "ru": "Весь мир (Полевые квесты)"
    },
    "featuredPokemon": [
      "Zorua",
      "Sandile",
      "Darumaka",
      "Darmanitan",
      "Timburr",
      "Woobat",
      "Sigilyph",
      "Klink",
      "Ferroseed"
    ],
    "backgroundArtwork": {
      "cs": "Fialová mlha Dream Mist s plovoucími starověkými glyfy a tajemnými runami",
      "en": "Eerie lavender Dream Mist haze filled with floating ancient Unovan glyphs",
      "ja": "浮遊するイッシュ文字と夢の煙（ドリームミスト）の幻想的な霧",
      "ru": "Лавандовый туман с плавающими древними рунами Иновы"
    },
    "acquisitionMethod": {
      "cs": "Plnění tematických Field Research úkolů během GO Tour Unova",
      "en": "Clear themed PokéStop Field Research during GO Tour Unova celebrations",
      "ja": "イベント限定フィールドリサーチタスク達成で入手",
      "ru": "Выполнение полевых квестов во время GO Tour Unova"
    },
    "isGlobal": true,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/unova-enigma.png"
  },
  {
    "id": "black-version-unova",
    "title": {
      "cs": "Černá Verze (Reshiram & Ideály)",
      "en": "Black Version (Reshiram & Ideals)",
      "ja": "ブラックバージョン（レシラムと理想）",
      "ru": "Black Version (Ресирам и идеалы)"
    },
    "event": {
      "cs": "Pokémon GO Tour: Unova – Global (Březen 2025)",
      "en": "Pokémon GO Tour: Unova – Global (March 2025)",
      "ja": "GO Tour イッシュ：グローバル（2025年3月）",
      "ru": "GO Tour Unova Global"
    },
    "year": 2025,
    "category": "global",
    "location": {
      "cs": "Celosvětově (5★ Raidy & Timed Research)",
      "en": "Worldwide (5★ Raids & Timed Research)",
      "ja": "全世界（星5レイド）",
      "ru": "Весь мир (5★ рейды)"
    },
    "featuredPokemon": [
      "Reshiram",
      "Kyurem",
      "Snivy",
      "Tepig",
      "Oshawott",
      "Cobalion",
      "Terrakion",
      "Virizion",
      "Tornadus",
      "Landorus",
      "Genesect",
      "Pikachu"
    ],
    "backgroundArtwork": {
      "cs": "Hluboké černé kosmické pozadí s žhnoucími plamennými víry turbíny Reshirama",
      "en": "Deep obsidian backdrop with blazing turbine fire swirls of Reshiram",
      "ja": "深淵の漆黒に浮かぶレシラムのタービン炎渦",
      "ru": "Глубокий черный фон с огненными вихрями турбины Ресирама"
    },
    "acquisitionMethod": {
      "cs": "Náhodný drop z 5★ raidů na Reshirama a Kyurema nebo volba Černé verze",
      "en": "Random drop from 5-Star Unova raids or picking Black Version badge",
      "ja": "星5レイド勝利時の確率ドロップまたはブラック選択時リサーチ報酬",
      "ru": "Шанс в 5★ рейдах или выбор Черной версии в квесте"
    },
    "isGlobal": true,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/black-version-unova.png"
  },
  {
    "id": "white-version-unova",
    "title": {
      "cs": "Bílá Verze (Zekrom & Pravda)",
      "en": "White Version (Zekrom & Truth)",
      "ja": "ホワイトバージョン（ゼクロムと真実）",
      "ru": "White Version (Зекром и правда)"
    },
    "event": {
      "cs": "Pokémon GO Tour: Unova – Global (Březen 2025)",
      "en": "Pokémon GO Tour: Unova – Global (March 2025)",
      "ja": "GO Tour イッシュ：グローバル（2025年3月）",
      "ru": "GO Tour Unova Global"
    },
    "year": 2025,
    "category": "global",
    "location": {
      "cs": "Celosvětově (5★ Raidy & Timed Research)",
      "en": "Worldwide (5★ Raids & Timed Research)",
      "ja": "全世界（星5レイド）",
      "ru": "Весь мир (5★ рейды)"
    },
    "featuredPokemon": [
      "Zekrom",
      "Kyurem",
      "Snivy",
      "Tepig",
      "Oshawott",
      "Cobalion",
      "Terrakion",
      "Virizion",
      "Thundurus",
      "Landorus",
      "Genesect",
      "Pikachu"
    ],
    "backgroundArtwork": {
      "cs": "Zářivě bílé pozadí s modrými elektrickými blesky generátoru Zekroma",
      "en": "Luminous white backdrop with crackling blue lightning generator rings of Zekrom",
      "ja": "純白の光原とゼクロムの青き雷撃ジェネレーター",
      "ru": "Сияющий белый фон с синими молниями генератора Зекрома"
    },
    "acquisitionMethod": {
      "cs": "Náhodný drop z 5★ raidů na Zekroma a Kyurema nebo volba Bílé verze",
      "en": "Random drop from 5-Star Unova raids or picking White Version badge",
      "ja": "星5レイド勝利時の確率ドロップまたはホワイト選択時リサーチ報酬",
      "ru": "Шанс в 5★ рейдах или выбор Белой версии в квесте"
    },
    "isGlobal": true,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/white-version-unova.png"
  },
  {
    "id": "kyurem-black-white-fusion",
    "title": {
      "cs": "Fúze Kyuremu (Black & White Kyurem)",
      "en": "Kyurem Resonance Fusion",
      "ja": "キュレム合体共鳴（ブラック＆ホワイト）",
      "ru": "Kyurem Resonance Fusion"
    },
    "event": {
      "cs": "Fúze Kyuremu s Reshiramem / Zekromem",
      "en": "Kyurem Fusion with Reshiram / Zekrom",
      "ja": "キュレム合体ギミック",
      "ru": "Слияние Кюрема"
    },
    "year": 2025,
    "category": "global",
    "location": {
      "cs": "Celosvětově (Mechanika Fúze)",
      "en": "Worldwide (Fusion Mechanics)",
      "ja": "全世界（合体実行時）",
      "ru": "Весь мир (Механика слияния)"
    },
    "featuredPokemon": [
      "Kyurem"
    ],
    "backgroundArtwork": {
      "cs": "Kombinace ledových ker s elektrickým overdrivem (Black) nebo plamenným turboblaze (White)",
      "en": "Fusion of glacial spires with Overdrive lightning (Black) or Turboblaze flames (White)",
      "ja": "氷柱と過充電雷撃（ブラック）または紅蓮ターボ（ホワイト）の融合背景",
      "ru": "Сочетание ледяных шпилей с молниями Овердрайва или пламенем Турбоблейза"
    },
    "acquisitionMethod": {
      "cs": "Fúze Kyuremu s pozadím s opačnou verzí Zekroma nebo Reshirama s pozadím!",
      "en": "Fusing a background Kyurem with an opposite-version background partner!",
      "ja": "背景付きキュレムに対極の背景付きゼクロム／レシラムを合体させて解放！",
      "ru": "Слияние Кюрема с фоном и противоположного покемона с фоном!"
    },
    "isGlobal": true,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/kyurem-black-white-fusion.png"
  },
  {
    "id": "might-and-mastery-season",
    "title": {
      "cs": "Might and Mastery (Síla a Mistrovství)",
      "en": "Might & Mastery Season",
      "ja": "マイト＆マスタリー（剛力と武技）",
      "ru": "Might and Mastery Season"
    },
    "event": {
      "cs": "Jaro 2025: Community Days & GO Battle Week",
      "en": "Spring 2025: Community Days & Battle Week",
      "ja": "2025年春 コミュニティ・デイ＆バトルウィーク",
      "ru": "Might and Mastery 2025"
    },
    "year": 2025,
    "category": "global",
    "location": {
      "cs": "Celosvětově (Special Research)",
      "en": "Worldwide (Special Research)",
      "ja": "全世界（リサーチ報酬）",
      "ru": "Весь мир (Спец-квесты)"
    },
    "featuredPokemon": [
      "Fuecoco",
      "Totodile",
      "Vanillite",
      "Pawmi",
      "Meditite",
      "Stunky",
      "Mareanie",
      "Charcadet",
      "Machop"
    ],
    "backgroundArtwork": {
      "cs": "Ohnivá energie a zlaté bojové aury reprezentující bojového ducha",
      "en": "Crackling crimson fighting aura and dynamic golden energy brushstrokes",
      "ja": "闘志を象徴する深紅のオーラと黄金のエネルギー筆跡",
      "ru": "Багровая боевая аура и золотые штрихи энергии"
    },
    "acquisitionMethod": {
      "cs": "Plnění milníků GO Battle Week a placených Community Day výzkumů",
      "en": "Completing GO Battle Week challenges and Community Day storylines",
      "ja": "GOバトルウィークおよびコミュニティ・デイリサーチ完遂で入手",
      "ru": "Награды за GO Battle Week и квесты Community Day"
    },
    "isGlobal": true,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/might-and-mastery-season.png"
  },
  {
    "id": "delightful-days-season",
    "title": {
      "cs": "Delightful Days (Slunečné Dny)",
      "en": "Delightful Days Season",
      "ja": "ディライトフルデイズ（輝く夏）",
      "ru": "Delightful Days Season"
    },
    "event": {
      "cs": "Léto 2025: Community Days, GO Pass & Water Festival",
      "en": "Summer 2025: Community Days & Water Festival",
      "ja": "2025年夏 コミュニティ・デイ＆ウォーターフェス",
      "ru": "Delightful Days 2025"
    },
    "year": 2025,
    "category": "global",
    "location": {
      "cs": "Celosvětově (GO Pass & Výzkumy)",
      "en": "Worldwide (GO Pass & Quests)",
      "ja": "全世界（GO Pass＆リサーチ）",
      "ru": "Весь мир (GO Pass)"
    },
    "featuredPokemon": [
      "Articuno",
      "Zapdos",
      "Moltres",
      "Jangmo-o",
      "Eevee",
      "Lapras",
      "Quaxly",
      "Rillaboom",
      "Cinderace",
      "Inteleon",
      "Rookidee"
    ],
    "backgroundArtwork": {
      "cs": "Paprsky letního slunce, kapky vody a teplé tropické barvy",
      "en": "Radiant tropical sunlight prism rays and splashing summer water droplets",
      "ja": "夏のプリズム光線と水しぶきが舞うトロピカルな背景",
      "ru": "Тропические солнечные лучи и брызги воды"
    },
    "acquisitionMethod": {
      "cs": "Postup v letním GO Passu a odměny za Water Festival 2025",
      "en": "Progressing through summer GO Pass tiers and Water Festival tasks",
      "ja": "GO Passのティア進行およびウォーターフェスティバル報酬",
      "ru": "Прогресс в летнем GO Pass и квестах Water Festival"
    },
    "isGlobal": true,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/delightful-days-season.png"
  },
  {
    "id": "ancients-recovered-regis",
    "title": {
      "cs": "Ancients Recovered (Probuzení Titáni)",
      "en": "Ancients Recovered (The Titans)",
      "ja": "目覚めし古代巨人（レジ系集結）",
      "ru": "Ancients Recovered"
    },
    "event": {
      "cs": "Ancients Recovered & GO Fest 2025 Warmup",
      "en": "Ancients Recovered & GO Fest 2025 Warmup",
      "ja": "古代の復活イベント（2025年6月）",
      "ru": "Ancients Recovered 2025"
    },
    "year": 2025,
    "category": "global",
    "location": {
      "cs": "Celosvětově (5★ Raidy na Regi Pokémony)",
      "en": "Worldwide (5★ Regi Raids)",
      "ja": "全世界（レジ系星5レイド）",
      "ru": "Весь мир (Рейды на Реджи)"
    },
    "featuredPokemon": [
      "Regirock",
      "Regice",
      "Registeel",
      "Regigigas",
      "Regieleki",
      "Regidrago"
    ],
    "backgroundArtwork": {
      "cs": "Antické kamenné runy a energetické body očí titánů vytesané do skály",
      "en": "Ancient braille stone carvings and glowing geometric eye dots etched into stone",
      "ja": "古代の点字石版と光り輝く巨人の瞳パターンが刻まれた岩壁",
      "ru": "Древние рельефы со шрифтом Брайля и светящимися точками глаз титанов"
    },
    "acquisitionMethod": {
      "cs": "Náhodná odměna z 5★ raidů na Regirocka, Regice, Registeela, Regigigase atd.",
      "en": "Random drop from 5-Star Legendary Titan raids during the event",
      "ja": "レジ系ポケモンの星5レイド勝利時に確率ドロップ",
      "ru": "Шанс в 5★ рейдах на легендарных титанов"
    },
    "isGlobal": true,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/ancients-recovered-regis.png"
  },
  {
    "id": "sword-version-zacian",
    "title": {
      "cs": "Meč Galaru (Crowned Zacian)",
      "en": "Sword Version (Crowned Zacian)",
      "ja": "ソードバージョン（けんのおうザシアン）",
      "ru": "Sword Version (Zacian)"
    },
    "event": {
      "cs": "Pokémon GO Fest 2025: Global",
      "en": "Pokémon GO Fest 2025: Global",
      "ja": "GO Fest 2025 グローバル",
      "ru": "GO Fest 2025 Global"
    },
    "year": 2025,
    "category": "global",
    "location": {
      "cs": "Celosvětově (5★ Crowned Raidy)",
      "en": "Worldwide (5★ Crowned Raids)",
      "ja": "全世界（王冠レイド）",
      "ru": "Весь мир (5★ рейды)"
    },
    "featuredPokemon": [
      "Zacian"
    ],
    "backgroundArtwork": {
      "cs": "Královská azurová a tyrkysová aura Slumbering Weald s rytířskými symboly meče",
      "en": "Royal cyan and magenta mist of Slumbering Weald with glowing sovereign sword crests",
      "ja": "まどろみの森の神秘的な青霧と光り輝く宝剣の紋章",
      "ru": "Туман Slumbering Weald с сияющими эмблемами королевского меча"
    },
    "acquisitionMethod": {
      "cs": "Náhodný drop z 5★ raidů na Crowned Sword Zaciana během GO Festu 2025",
      "en": "Random drop from Crowned Sword Zacian 5-Star raids at GO Fest 2025 Global",
      "ja": "GO Fest 2025グローバルでのザシアン星5レイド勝利時にドロップ",
      "ru": "Шанс в 5★ рейдах на Crowned Zacian во время GO Fest 2025"
    },
    "isGlobal": true,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/sword-version-zacian.png"
  },
  {
    "id": "max-finale-dark-skies",
    "title": {
      "cs": "Max Finale: Dark Skies (Gigantamax)",
      "en": "Max Finale: Dark Skies",
      "ja": "マックスフィナーレ：漆黒の空（キョダイマックス）",
      "ru": "Max Finale: Dark Skies"
    },
    "event": {
      "cs": "Pokémon GO Fest 2025: Max Finale (Srpen 2025)",
      "en": "Pokémon GO Fest 2025: Max Finale (August 2025)",
      "ja": "GO Fest 2025 マックスフィナーレ",
      "ru": "Max Finale 2025"
    },
    "year": 2025,
    "category": "global",
    "location": {
      "cs": "Celosvětově (Max Battles & Gigantamax Raidy)",
      "en": "Worldwide (Gigantamax Raids)",
      "ja": "全世界（キョダイマックスバトル）",
      "ru": "Весь мир (Gigantamax рейды)"
    },
    "featuredPokemon": [
      "Venusaur",
      "Charizard",
      "Blastoise",
      "Gengar",
      "Snorlax",
      "Machamp",
      "Kingler",
      "Lapras",
      "Toxtricity"
    ],
    "backgroundArtwork": {
      "cs": "Temná obloha s vířícími rudými Dynamax mraky a gigantickými sloupy energie",
      "en": "Stormy violet skies torn by crimson swirl Dynamax clouds and colossal energy pillars",
      "ja": "紅のダイマックス雲が渦巻く暗黒の空と巨大な光柱",
      "ru": "Грозовое фиолетовое небо с алыми вихрями Dynamax облаков"
    },
    "acquisitionMethod": {
      "cs": "Vítězství v 6★ Gigantamax bitvách během víkendu Max Finale 2025",
      "en": "Clear 6-Star Gigantamax Battles during the Max Finale weekend",
      "ja": "マックスフィナーレ期間中のキョダイマックスバトル勝利で確率入手",
      "ru": "Победа в 6★ Gigantamax битвах на фестивале Max Finale"
    },
    "isGlobal": true,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/max-finale-dark-skies.png"
  },
  {
    "id": "tales-of-transformation",
    "title": {
      "cs": "Tales of Transformation (Legendy Proměny)",
      "en": "Tales of Transformation",
      "ja": "変革の物語（レジェンズZ-A前夜）",
      "ru": "Tales of Transformation"
    },
    "event": {
      "cs": "Podzim 2025: Legends: Z-A Celebration & Community Days",
      "en": "Autumn 2025: Legends: Z-A Celebration",
      "ja": "2025年秋 レジェンズZ-A記念＆コミュデイ",
      "ru": "Tales of Transformation 2025"
    },
    "year": 2025,
    "category": "global",
    "location": {
      "cs": "Celosvětově (GO Pass & Výzkumy)",
      "en": "Worldwide (GO Pass & Quests)",
      "ja": "全世界（GO Pass）",
      "ru": "Весь мир (GO Pass)"
    },
    "featuredPokemon": [
      "Cobalion",
      "Terrakion",
      "Virizion",
      "Flabebe",
      "Solosis",
      "Chikorita",
      "Totodile",
      "Tepig",
      "Pikipek"
    ],
    "backgroundArtwork": {
      "cs": "Hranoly zářícího krystalického světla přecházející v geometrické buňky Zygarda",
      "en": "Prismatic crystal luminescence transitioning into emerald Zygarde cell hexagons",
      "ja": "エメラルドのジガルデ・セルと幾何学的クリスタルの煌めき",
      "ru": "Кристаллический призматический свет и изумрудные гексагоны Зайгарда"
    },
    "acquisitionMethod": {
      "cs": "Odměna za podzimní GO Pass a oslavný výzkum Pokémon Legends: Z-A",
      "en": "Reward from autumn GO Pass tiers and Pokémon Legends: Z-A event tasks",
      "ja": "秋のGO Pass達成およびZ-A記念リサーチ完遂で入手",
      "ru": "Награда за осенний GO Pass и квесты по мотивам Legends: Z-A"
    },
    "isGlobal": true,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/tales-of-transformation.png"
  },
  {
    "id": "wild-area-global-2025",
    "title": {
      "cs": "Wild Area Global 2025 (Strážci a Příroda)",
      "en": "Wild Area Global 2025",
      "ja": "ワイルドエリア・グローバル 2025",
      "ru": "Wild Area Global 2025"
    },
    "event": {
      "cs": "Pokémon GO Wild Area Global 2025 (Listopad 2025)",
      "en": "Pokémon GO Wild Area Global 2025",
      "ja": "GO ワイルドエリア 2025（2025年11月）",
      "ru": "Wild Area Global 2025"
    },
    "year": 2025,
    "category": "global",
    "location": {
      "cs": "Celosvětově (5★ Raidy & Max Battles)",
      "en": "Worldwide (5★ Raids & Max Battles)",
      "ja": "全世界（レイド＆マックスバトル）",
      "ru": "Весь мир (Рейды и битвы)"
    },
    "featuredPokemon": [
      "Lugia",
      "Ho-Oh",
      "Tapu Koko",
      "Tapu Lele",
      "Tapu Bulu",
      "Tapu Fini",
      "Darkrai",
      "Bewear",
      "Grimmsnarl"
    ],
    "backgroundArtwork": {
      "cs": "Divočina plná přírodní aury, bouřkových mraků a záře strážců ostrovů Tapu",
      "en": "Primal nature storms swirling with radiant totemic energy of the Tapu guardians",
      "ja": "守り神カプのトーテム光と荒れ狂う自然嵐が渦巻く野生背景",
      "ru": "Буря первозданной природы с сияющей тотемной энергией Тапу"
    },
    "acquisitionMethod": {
      "cs": "Náhodný drop z 5★ raidů na Lugii, Ho-Oh a strážce Tapu během Wild Area 2025",
      "en": "Random drop from 5-Star raids during Wild Area 2025 Global weekend",
      "ja": "ワイルドエリア2025期間中の星5レイド勝利時に確率ドロップ",
      "ru": "Шанс в рейдах на Лугию, Хо-Ох и Тапу на Wild Area 2025"
    },
    "isGlobal": true,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/wild-area-global-2025.png"
  },
  {
    "id": "community-days-2026",
    "title": {
      "cs": "Community Days 2026 (Moderní Hvězdy)",
      "en": "Community Days 2026",
      "ja": "2026年 コミュニティ・デイ",
      "ru": "Community Days 2026"
    },
    "event": {
      "cs": "Komunitní dny v roce 2026 (Piplup, Grookey, Scorbunny, Tinkatink)",
      "en": "2026 Community Day Calendar",
      "ja": "2026年コミュニティ・デイ シリーズ",
      "ru": "Community Days 2026"
    },
    "year": 2026,
    "category": "global",
    "location": {
      "cs": "Celosvětově (Special Research)",
      "en": "Worldwide (Special Research)",
      "ja": "全世界（リサーチ報酬）",
      "ru": "Весь мир (Спец-квесты)"
    },
    "featuredPokemon": [
      "Piplup",
      "Grookey",
      "Vulpix",
      "Scorbunny",
      "Tinkatink",
      "Lechonk",
      "Deino",
      "Frigibax",
      "Sobble",
      "Gible"
    ],
    "backgroundArtwork": {
      "cs": "Moderní geometrické hvězdné paprsky v odstínech roku 2026",
      "en": "Modern geometric stellar beams and celebratory particle streaks",
      "ja": "2026年を象徴する幾何学的な光条ときらめくスターダスト",
      "ru": "Геометрические звездные лучи и праздничные частицы"
    },
    "acquisitionMethod": {
      "cs": "Odměna za dokončení placených výzkumů Community Day v roce 2026",
      "en": "Completing official ticketed Community Day Special Research in 2026",
      "ja": "2026年コミュニティ・デイ限定スペシャルリサーチ達成報酬",
      "ru": "Награда за квесты Community Day в 2026 году"
    },
    "isGlobal": true,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/community-days-2026.png"
  },
  {
    "id": "mega-evolution-matrix",
    "title": {
      "cs": "Mega Evoluce (DNA Matice)",
      "en": "Mega Evolution DNA Matrix",
      "ja": "メガシンカ（DNAマトリックス）",
      "ru": "Mega Evolution DNA Matrix"
    },
    "event": {
      "cs": "Pokémon GO Tour: Kalos & GO Fest 2026 Mega Finale",
      "en": "GO Tour Kalos & GO Fest 2026 Mega Finale",
      "ja": "GO Tour カロス＆GO Fest 2026 メガフィナーレ",
      "ru": "GO Tour Kalos & Mega Finale 2026"
    },
    "year": 2026,
    "category": "global",
    "location": {
      "cs": "Celosvětově (Mega Raidy & Super Mega Boss)",
      "en": "Worldwide (Mega Raids & Super Mega)",
      "ja": "全世界（メガレイド＆スーパーメガ）",
      "ru": "Весь мир (Мега-рейды)"
    },
    "featuredPokemon": [
      "Mewtwo",
      "Rayquaza",
      "Lucario",
      "Garchomp",
      "Gardevoir",
      "Charizard",
      "Gengar",
      "Sceptile",
      "Blaziken",
      "Swampert",
      "Metagross"
    ],
    "backgroundArtwork": {
      "cs": "Zářící dvoušroubovice DNA s duhovými mega symboly a pulzující kosmickou aurou",
      "en": "Luminescent DNA double helix entwined with multicolored Mega Evolution crests and radiant energy",
      "ja": "虹色に脈動するメガシンカ紋章と二重らせんDNAのエネルギーフィールド",
      "ru": "Светящаяся двойная спираль ДНК с радужными символами Мега-эволюции"
    },
    "acquisitionMethod": {
      "cs": "Náhodný drop z Mega Raidů během GO Tour Kalos a GO Fest 2026 Mega Finale",
      "en": "Random drop from Mega Raids during GO Tour Kalos & GO Fest 2026 Mega Finale",
      "ja": "GO Tour カロスおよびメガフィナーレ期間中のメガレイド勝利時に確率付与",
      "ru": "Шанс в Мега-рейдах во время GO Tour Kalos и Mega Finale 2026"
    },
    "isGlobal": true,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/mega-evolution-matrix.png"
  },
  {
    "id": "kalos-x-version",
    "title": {
      "cs": "X Verze (Xerneas & Život)",
      "en": "X Version (Xerneas & Life)",
      "ja": "Xバージョン（ゼルネアスと生命）",
      "ru": "X Version (Xerneas)"
    },
    "event": {
      "cs": "Pokémon GO Tour: Kalos – Global (Únor 2026)",
      "en": "Pokémon GO Tour: Kalos – Global (Feb 2026)",
      "ja": "GO Tour カロス：グローバル（2026年2月）",
      "ru": "GO Tour Kalos Global"
    },
    "year": 2026,
    "category": "global",
    "location": {
      "cs": "Celosvětově (5★ Raidy & Special Research)",
      "en": "Worldwide (5★ Raids & Research)",
      "ja": "全世界（星5レイド＆リサーチ）",
      "ru": "Весь мир (5★ рейды и квесты)"
    },
    "featuredPokemon": [
      "Xerneas",
      "Chespin",
      "Fennekin",
      "Froakie",
      "Honedge",
      "Pikachu"
    ],
    "backgroundArtwork": {
      "cs": "Duhové parohy stromu života Xernease uprostřed posvátného hvozdu Kalosu",
      "en": "Seven-colored luminous antlers of Xerneas casting divine life rays over Kalosian trees",
      "ja": "カロス聖林に七色の命の光を放つゼルネアスの角と大樹",
      "ru": "Семицветные рога Ксернеаса, озаряющие священный лес Калоса"
    },
    "acquisitionMethod": {
      "cs": "Výběr X verze během GO Tour Kalos nebo výhra v 5★ raidu na Xernease",
      "en": "Selecting X Version during GO Tour Kalos or winning 5-Star Xerneas raids",
      "ja": "GO Tour カロスでXバージョン選択またはゼルネアス星5レイドで入手",
      "ru": "Выбор версии X на GO Tour Kalos или победа в рейде на Xerneas"
    },
    "isGlobal": true,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/kalos-x-version.png"
  },
  {
    "id": "gofest-2026-mewtwo-reactive",
    "title": {
      "cs": "Mega Mewtwo Reaktivní Aura (GO Fest 2026)",
      "en": "Mega Mewtwo Dynamic Reactive Aura",
      "ja": "メガミュウツー・リアクティブオーラ（GO Fest 2026）",
      "ru": "Mega Mewtwo Dynamic Aura"
    },
    "event": {
      "cs": "Pokémon GO Fest 2026: Mega Finale",
      "en": "Pokémon GO Fest 2026: Mega Finale",
      "ja": "GO Fest 2026 メガフィナーレ",
      "ru": "GO Fest 2026 Mega Finale"
    },
    "year": 2026,
    "category": "global",
    "location": {
      "cs": "Celosvětově (Super Mega Raidy na Mewtwo)",
      "en": "Worldwide (Super Mega Mewtwo Raids)",
      "ja": "全世界（スーパーメガレイド）",
      "ru": "Весь мир (Супер-мега рейды)"
    },
    "featuredPokemon": [
      "Mewtwo"
    ],
    "backgroundArtwork": {
      "cs": "První reaktivní pozadí v GO! Psychické vlny zrychlují rotaci a září fialově při Mega Evoluci",
      "en": "First dynamic reactive background in GO! Psychic vortex flares and accelerates upon Mega Evolution",
      "ja": "GO史上初の動的反応型背景！メガシンカ時にサイコオーラが加速回転し激変",
      "ru": "Первый реактивный фон! Психические волны ускоряются и меняют цвет при Мега-эволюции"
    },
    "acquisitionMethod": {
      "cs": "Vítězství v Super Mega Raidech na Mega Mewtwo X nebo Y na GO Fest 2026",
      "en": "Defeating Super Mega Mewtwo X or Y raids during GO Fest 2026",
      "ja": "GO Fest 2026現地およびグローバルでのメガミュウツー撃破時にドロップ",
      "ru": "Победа в рейдах на Mega Mewtwo X или Y на GO Fest 2026"
    },
    "isGlobal": true,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/gofest-2026-mewtwo-reactive.png"
  },
  {
    "id": "road-of-legends-2026",
    "title": {
      "cs": "Cesta Legend (Road of Legends)",
      "en": "Road of Legends Raid Card",
      "ja": "伝説の軌跡（ロード・オブ・レジェンズ）",
      "ru": "Road of Legends"
    },
    "event": {
      "cs": "Road of Legends & GO Fest 2026: Global",
      "en": "Road of Legends & GO Fest 2026: Global",
      "ja": "ロード・オブ・レジェンズ＆GO Fest 2026",
      "ru": "Road of Legends & GO Fest 2026"
    },
    "year": 2026,
    "category": "global",
    "location": {
      "cs": "Celosvětově (Legendární Raidy)",
      "en": "Worldwide (Legendary Raids)",
      "ja": "全世界（伝説レイド）",
      "ru": "Весь мир (Легендарные рейды)"
    },
    "featuredPokemon": [
      "Gengar",
      "Articuno",
      "Zapdos",
      "Moltres",
      "Raikou",
      "Entei",
      "Suicune",
      "Lugia",
      "Ho-Oh",
      "Kyogre",
      "Groudon",
      "Rayquaza",
      "Dialga",
      "Palkia",
      "Giratina",
      "Reshiram",
      "Zekrom",
      "Kyurem",
      "Zacian",
      "Zamazenta"
    ],
    "backgroundArtwork": {
      "cs": "Zlatý a stříbrný kosmický oblouk oslavující všech 9 generací legendárních bossů",
      "en": "Golden and silver celestial archway commemorating all 9 generations of legendary raid bosses",
      "ja": "全9世代の伝説のボスを讃える黄金と白銀の天界ゲート",
      "ru": "Золотая и серебряная небесная арка в честь 9 поколений легенд"
    },
    "acquisitionMethod": {
      "cs": "Náhodný drop z 5★ raidů během festivalu Road of Legends v červenci 2026",
      "en": "Random drop from 5-Star raids across the July 2026 Road of Legends marathon",
      "ja": "2026年7月のロード・オブ・レジェンズ期間中レイド勝利時に確率入手",
      "ru": "Шанс в 5★ рейдах во время марафона Road of Legends"
    },
    "isGlobal": true,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/road-of-legends-2026.png"
  },
  {
    "id": "las-vegas-hoenn-tour",
    "title": {
      "cs": "Las Vegas (GO Tour Hoenn 2023)",
      "en": "Las Vegas (GO Tour Hoenn 2023)",
      "ja": "ラスベガス（ホウエンツアー 2023）",
      "ru": "Лас-Вегас (GO Tour Hoenn 2023)"
    },
    "event": {
      "cs": "Pokémon GO Tour: Hoenn – Las Vegas (Únor 2023)",
      "en": "Pokémon GO Tour: Hoenn – Las Vegas (February 2023)",
      "ja": "GO Tour ホウエン：ラスベガス（2023年2月）",
      "ru": "GO Tour Hoenn Las Vegas"
    },
    "year": 2023,
    "category": "go-tour",
    "location": {
      "cs": "Sunset Park, Las Vegas, USA",
      "en": "Sunset Park, Las Vegas, NV, USA",
      "ja": "アメリカ・ネバダ州ラスベガス（サンセットパーク）",
      "ru": "Лас-Вегас, Невада, США"
    },
    "featuredPokemon": [
      "Kyogre-Primal",
      "Groudon-Primal"
    ],
    "backgroundArtwork": {
      "cs": "Silueta Las Vegas Strip, kasinové neony a pouštní kaňon Red Rock",
      "en": "Las Vegas Strip skyline with casino neon silhouettes and Red Rock Canyon",
      "ja": "カジノのネオン輝くラスベガスのスカイラインとレッドロックキャニオン",
      "ru": "Неоновый силуэт Лас-Вегас Стрип и каньон Ред-Рок"
    },
    "acquisitionMethod": {
      "cs": "Vítězství v prezenčních Primal Raidech v Sunset Parku pro majitele vstupenky",
      "en": "Clear in-person Primal Raids at Sunset Park with an active event ticket",
      "ja": "サンセットパーク現地でのゲンシレイド勝利時にチケット保持者へドロップ",
      "ru": "Победа в Primal рейдах в Sunset Park с билетом на ивент"
    },
    "isGlobal": false,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/las-vegas-hoenn-tour.png"
  },
  {
    "id": "london-gofest-2023",
    "title": {
      "cs": "Londýn (GO Fest 2023)",
      "en": "London (GO Fest 2023)",
      "ja": "ロンドン（GO Fest 2023）",
      "ru": "Лондон (GO Fest 2023)"
    },
    "event": {
      "cs": "Pokémon GO Fest 2023: London (Srpen 2023)",
      "en": "Pokémon GO Fest 2023: London (August 2023)",
      "ja": "GO Fest 2023：ロンドン（2023年8月）",
      "ru": "GO Fest 2023 London"
    },
    "year": 2023,
    "category": "go-fest",
    "location": {
      "cs": "Brockwell Park, Londýn, Velká Británie",
      "en": "Brockwell Park, London, UK",
      "ja": "イギリス・ロンドン（ブロックウェル・パーク）",
      "ru": "Броквелл Парк, Лондон, Великобритания"
    },
    "featuredPokemon": [
      "Rayquaza-Mega",
      "Xerneas",
      "Yveltal",
      "Cresselia"
    ],
    "backgroundArtwork": {
      "cs": "Zelené louky Brockwell Parku, řeka Temže, Big Ben a most Tower Bridge",
      "en": "Brockwell Park greenery, River Thames, Big Ben clocktower, and Tower Bridge",
      "ja": "ブロックウェル・パークの緑、テムズ川、ビッグベン、タワーブリッジ",
      "ru": "Зелень парка Броквелл, река Темза, Биг-Бен и Тауэрский мост"
    },
    "acquisitionMethod": {
      "cs": "Osobní účast v 5★ a Mega Raidech v Londýně pro držitele lístků",
      "en": "Clear in-person 5-Star & Mega Raids in London with active event ticket",
      "ja": "ロンドン現地での星5およびメガレイド勝利時にチケット保持者へ付与",
      "ru": "Победа в рейдах в Лондоне с билетом"
    },
    "isGlobal": false,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/london-gofest-2023.png"
  },
  {
    "id": "osaka-gofest-2023",
    "title": {
      "cs": "Ósaka (GO Fest 2023)",
      "en": "Osaka (GO Fest 2023)",
      "ja": "大阪（GO Fest 2023）",
      "ru": "Осака (GO Fest 2023)"
    },
    "event": {
      "cs": "Pokémon GO Fest 2023: Osaka (Srpen 2023)",
      "en": "Pokémon GO Fest 2023: Osaka (August 2023)",
      "ja": "GO Fest 2023：大阪（2023年8月）",
      "ru": "GO Fest 2023 Osaka"
    },
    "year": 2023,
    "category": "go-fest",
    "location": {
      "cs": "Expo '70 Commemorative Park, Ósaka, Japonsko",
      "en": "Expo '70 Park, Osaka, Japan",
      "ja": "日本・大阪府吹田市（万博記念公園）",
      "ru": "Экспо Парк, Осака, Япония"
    },
    "featuredPokemon": [
      "Rayquaza-Mega",
      "Xerneas",
      "Yveltal",
      "Cresselia"
    ],
    "backgroundArtwork": {
      "cs": "Ikonická Věž slunce (Tower of the Sun) a moderní panorama Ósaky",
      "en": "Historic Expo '70 Tower of the Sun monument with modern Osaka city skyline",
      "ja": "万博記念公園の「太陽の塔」と大阪のスカイライン",
      "ru": "Башня Солнца в Экспо Парке и панорама Осаки"
    },
    "acquisitionMethod": {
      "cs": "Osobní účast v 5★ a Mega Raidech v parku Expo '70 s platnou vstupenkou",
      "en": "Clear in-person 5-Star & Mega Raids in Osaka with active event ticket",
      "ja": "万博記念公園現地での星5およびメガレイド勝利時にチケット保持者へ付与",
      "ru": "Победа в рейдах в Осаке с билетом"
    },
    "isGlobal": false,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/osaka-gofest-2023.png"
  },
  {
    "id": "nyc-gofest-2023",
    "title": {
      "cs": "New York City (GO Fest 2023)",
      "en": "New York City (GO Fest 2023)",
      "ja": "ニューヨーク（GO Fest 2023）",
      "ru": "Нью-Йорк (GO Fest 2023)"
    },
    "event": {
      "cs": "Pokémon GO Fest 2023: New York City (Srpen 2023)",
      "en": "Pokémon GO Fest 2023: NYC (August 2023)",
      "ja": "GO Fest 2023：ニューヨーク（2023年8月）",
      "ru": "GO Fest 2023 NYC"
    },
    "year": 2023,
    "category": "go-fest",
    "location": {
      "cs": "Randall's Island Park, New York, USA",
      "en": "Randall's Island Park, New York, NY, USA",
      "ja": "アメリカ・ニューヨーク市（ランドールズ島）",
      "ru": "Рэндаллс-Айленд, Нью-Йорк, США"
    },
    "featuredPokemon": [
      "Rayquaza-Mega",
      "Xerneas",
      "Yveltal",
      "Cresselia"
    ],
    "backgroundArtwork": {
      "cs": "Most Triborough Bridge, Art Deco panorama Manhattanu a řeka East River",
      "en": "Randall's Island waterfront, suspension bridges, and Art Deco Manhattan high-rises",
      "ja": "ランドールズ島の岸辺、マンハッタンの高層ビル群と吊り橋",
      "ru": "Мосты Манхэттена, Ист-Ривер и силуэт небоскребов Нью-Йорка"
    },
    "acquisitionMethod": {
      "cs": "Prezenční 5★ a Mega raidy na ostrově Randall's Island s platným lístkem",
      "en": "Clear in-person 5-Star & Mega Raids on Randall's Island with ticket",
      "ja": "ランドールズ島現地での星5およびメガレイド勝利時にチケット保持者へ付与",
      "ru": "Победа в рейдах на Рэндаллс-Айленд с билетом"
    },
    "isGlobal": false,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/nyc-gofest-2023.png"
  },
  {
    "id": "city-safari-barcelona-2023",
    "title": {
      "cs": "Barcelona (City Safari 2023)",
      "en": "Barcelona (City Safari 2023)",
      "ja": "バルセロナ（シティサファリ 2023）",
      "ru": "Барселона (City Safari 2023)"
    },
    "event": {
      "cs": "Pokémon GO City Safari: Barcelona (Říjen 2023)",
      "en": "Pokémon GO City Safari: Barcelona (Oct 2023)",
      "ja": "GO シティサファリ：バルセロナ（2023年10月）",
      "ru": "City Safari Barcelona 2023"
    },
    "year": 2023,
    "category": "city-safari",
    "location": {
      "cs": "Barcelona, Katalánsko, Španělsko",
      "en": "Barcelona, Catalonia, Spain",
      "ja": "スペイン・バルセロナ",
      "ru": "Барселона, Испания"
    },
    "featuredPokemon": [
      "Eevee",
      "Skiddo"
    ],
    "backgroundArtwork": {
      "cs": "Věže chrámu Sagrada Família, mozaiky parku Güell a Středozemní moře",
      "en": "Sagrada Família spires, Park Güell mosaic styling, and Mediterranean coastline",
      "ja": "サグラダ・ファミリアの尖塔、グエル公園のモザイク、地中海",
      "ru": "Шпили Саграда Фамилия, мозаика парка Гуэль и Средиземное море"
    },
    "acquisitionMethod": {
      "cs": "Garantovaná odměna za dokončení Timed Research Eevee Explorers v Barceloně",
      "en": "100% guaranteed reward from Eevee Explorers Timed Research in Barcelona",
      "ja": "現地限定タイムチャレンジ「イーブイエクスプローラー」完遂で確定入手",
      "ru": "Гарантированная награда за квест Eevee Explorers в Барселоне"
    },
    "isGlobal": false,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/city-safari-barcelona-2023.png"
  },
  {
    "id": "city-safari-seoul-2023",
    "title": {
      "cs": "Soul (City Safari 2023)",
      "en": "Seoul (City Safari 2023)",
      "ja": "ソウル（シティサファリ 2023）",
      "ru": "Сеул (City Safari 2023)"
    },
    "event": {
      "cs": "Pokémon GO City Safari: Seoul (Říjen 2023)",
      "en": "Pokémon GO City Safari: Seoul (Oct 2023)",
      "ja": "GO シティサファリ：ソウル（2023年10月）",
      "ru": "City Safari Seoul 2023"
    },
    "year": 2023,
    "category": "city-safari",
    "location": {
      "cs": "Soul, Jižní Korea",
      "en": "Seoul, South Korea",
      "ja": "韓国・ソウル特別市",
      "ru": "Сеул, Южная Корея"
    },
    "featuredPokemon": [
      "Eevee",
      "Skiddo"
    ],
    "backgroundArtwork": {
      "cs": "Televizní věž N Seoul Tower, mosty přes řeku Han a tradiční palác Hanok",
      "en": "N Seoul Tower, Han River suspension bridges, and traditional Hanok palace roofs",
      "ja": "Nソウルタワー、漢江（ハンガン）の橋、伝統家屋韓屋（ハノク）の屋根",
      "ru": "Башня N Seoul Tower, мосты реки Хан и дворцовые крыши Ханок"
    },
    "acquisitionMethod": {
      "cs": "Dokončení výzkumu Eevee Explorers v ulicích Soulu pro majitele vstupenky",
      "en": "Clear Eevee Explorers Timed Research across Seoul with active ticket",
      "ja": "ソウル現地での限定タイムチャレンジ達成で100%入手",
      "ru": "Выполнение квеста Eevee Explorers в Сеуле"
    },
    "isGlobal": false,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/city-safari-seoul-2023.png"
  },
  {
    "id": "city-safari-mexico-city-2023",
    "title": {
      "cs": "Ciudad de México (City Safari 2023)",
      "en": "Mexico City (City Safari 2023)",
      "ja": "メキシコシティ（シティサファリ 2023）",
      "ru": "Мехико (City Safari 2023)"
    },
    "event": {
      "cs": "Pokémon GO City Safari: Mexico City (Listopad 2023)",
      "en": "Pokémon GO City Safari: Mexico City (Nov 2023)",
      "ja": "GO シティサファリ：メキシコシティ（2023年11月）",
      "ru": "City Safari Mexico City 2023"
    },
    "year": 2023,
    "category": "city-safari",
    "location": {
      "cs": "Ciudad de México, Mexiko",
      "en": "Mexico City, Mexico",
      "ja": "メキシコ・メキシコシティ",
      "ru": "Мехико, Мексика"
    },
    "featuredPokemon": [
      "Eevee",
      "Skiddo"
    ],
    "backgroundArtwork": {
      "cs": "Zlatý Anděl nezávislosti (Ángel de la Independencia) a kvetoucí žakarandy",
      "en": "Angel of Independence monument, Paseo de la Reforma, and blooming Jacarandas",
      "ja": "独立記念塔の黄金の天使像と満開のジャカランダの花並木",
      "ru": "Монумент Ангел независимости и цветущие жакаранды"
    },
    "acquisitionMethod": {
      "cs": "Dokončení výzkumu Eevee Explorers v Mexico City pro majitele vstupenky",
      "en": "Clear Eevee Explorers Timed Research across Mexico City with active ticket",
      "ja": "メキシコシティ現地での限定タイムチャレンジ達成で100%入手",
      "ru": "Выполнение квеста Eevee Explorers в Мехико"
    },
    "isGlobal": false,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/city-safari-mexico-city-2023.png"
  },
  {
    "id": "los-angeles-sinnoh-tour",
    "title": {
      "cs": "Los Angeles (GO Tour Sinnoh 2024)",
      "en": "Los Angeles (GO Tour Sinnoh 2024)",
      "ja": "ロサンゼルス（シンオウツアー 2024）",
      "ru": "Лос-Анджелес (GO Tour Sinnoh 2024)"
    },
    "event": {
      "cs": "Pokémon GO Tour: Sinnoh – Los Angeles (Únor 2024)",
      "en": "Pokémon GO Tour: Sinnoh – Los Angeles (February 2024)",
      "ja": "GO Tour シンオウ：ロサンゼルス（2024年2月）",
      "ru": "GO Tour Sinnoh Los Angeles"
    },
    "year": 2024,
    "category": "go-tour",
    "location": {
      "cs": "Rose Bowl Stadium, Pasadena / LA, USA",
      "en": "Rose Bowl Stadium, Pasadena, CA, USA",
      "ja": "アメリカ・カリフォルニア州ローズボウル・スタジアム",
      "ru": "Роуз Боул, Пасадена, США"
    },
    "featuredPokemon": [
      "Dialga-Origin",
      "Palkia-Origin"
    ],
    "backgroundArtwork": {
      "cs": "Slavný stadion Rose Bowl, kalifornské palmy a pohoří San Gabriel",
      "en": "Historic Rose Bowl stadium arches, California palm trees, and San Gabriel Mountains",
      "ja": "ローズボウルのアーチ、カリフォルニアのヤシ並木、サンガブリエル山脈",
      "ru": "Арки стадиона Роуз Боул, калифорнийские пальмы и горы Сан-Габриэль"
    },
    "acquisitionMethod": {
      "cs": "Vítězství v Origin Forme raidech na stadionu Rose Bowl s platnou vstupenkou",
      "en": "Clear Origin Forme Raids at Rose Bowl with an active event ticket",
      "ja": "ローズボウル現地でのオリジンレイド勝利時にチケット保持者へ確定付与",
      "ru": "Победа в Origin рейдах на стадионе Роуз Боул с билетом"
    },
    "isGlobal": false,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/los-angeles-sinnoh-tour.png"
  },
  {
    "id": "bali-air-adventures",
    "title": {
      "cs": "Bali (Air Adventures Indonesia 2024)",
      "en": "Bali (Pikachu's Indonesia Journey)",
      "ja": "バリ島（そらとぶピカチュウプロジェクト）",
      "ru": "Бали (Air Adventures Indonesia)"
    },
    "event": {
      "cs": "Pikachu's Indonesia Journey: Bali (Březen 2024)",
      "en": "Pikachu's Indonesia Journey: Bali (March 2024)",
      "ja": "ピカチュウのインドネシアの旅：バリ島（2024年3月）",
      "ru": "Pikachu's Indonesia Journey: Bali"
    },
    "year": 2024,
    "category": "heritage",
    "location": {
      "cs": "Denpasar & Nusa Dua, Bali, Indonésie",
      "en": "Denpasar & Nusa Dua, Bali, Indonesia",
      "ja": "インドネシア・バリ島",
      "ru": "Бали, Индонезия"
    },
    "featuredPokemon": [
      "Latios-Mega",
      "Latias-Mega"
    ],
    "backgroundArtwork": {
      "cs": "Tradiční balijská brána Candi Bentar, tropické pobřeží a sopka Gunung Agung",
      "en": "Balinese Candi Bentar split gates, tropical turquoise waters, and Mount Agung silhouette",
      "ja": "バリ島の割れ門（チャンディ・ベンタール）、南国の海、アグン山のシルエット",
      "ru": "Балийские ворота Чанди Бентар, тропический берег и вулкан Агунг"
    },
    "acquisitionMethod": {
      "cs": "Osobní účast v Mega Raidech na Latiose a Latias na Bali s platnou vstupenkou",
      "en": "In-person Mega Raids across Bali for active ticket holders",
      "ja": "バリ島現地でのメガラティオス・ラティアスレイド勝利時に確率付与",
      "ru": "Победа в Мега-рейдах на Бали с билетом"
    },
    "isGlobal": false,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/bali-air-adventures.png"
  },
  {
    "id": "sendai-gofest-2024",
    "title": {
      "cs": "Sendai (GO Fest 2024)",
      "en": "Sendai (GO Fest 2024)",
      "ja": "仙台（GO Fest 2024）",
      "ru": "Сэндай (GO Fest 2024)"
    },
    "event": {
      "cs": "Pokémon GO Fest 2024: Sendai (Květen–Červen 2024)",
      "en": "Pokémon GO Fest 2024: Sendai (May–June 2024)",
      "ja": "GO Fest 2024：仙台（2024年5〜6月）",
      "ru": "GO Fest 2024 Sendai"
    },
    "year": 2024,
    "category": "go-fest",
    "location": {
      "cs": "Nanakita Park & Sendai, Miyagi, Japonsko",
      "en": "Nanakita Park & Sendai, Miyagi, Japan",
      "ja": "日本・宮城県仙台市（七北田公園）",
      "ru": "Парк Нанакита, Сэндай, Япония"
    },
    "featuredPokemon": [
      "Necrozma",
      "Xurkitree",
      "Nihilego",
      "Kartana",
      "Guzzlord",
      "Stakataka",
      "Solgaleo",
      "Lunala"
    ],
    "backgroundArtwork": {
      "cs": "Zeleň parku Nanakita, jezdecká socha Date Masamuneho na hradě Aoba a fábory Tanabaty",
      "en": "Nanakita Park foliage, Aoba Castle equestrian statue of Date Masamune, and Tanabata streamers",
      "ja": "七北田公園の緑、青葉城址・伊達政宗公騎馬像、仙台七夕まつりの笹飾り",
      "ru": "Парк Нанакита, конная статуя Датэ Масамунэ в замке Аоба и ленты Танабата"
    },
    "acquisitionMethod": {
      "cs": "Prezenční 5★ raidy na Necrozmu a Ultra Beasts v Sendai s lístkem",
      "en": "In-person 5-Star Raids for Necrozma & Ultra Beasts in Sendai with event ticket",
      "ja": "仙台現地での星5レイド勝利時にチケット保持者へ付与",
      "ru": "Победа в рейдах на Necrozma и Ultra Beasts в Сэндае"
    },
    "isGlobal": false,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/sendai-gofest-2024.png"
  },
  {
    "id": "madrid-gofest-2024",
    "title": {
      "cs": "Madrid (GO Fest 2024)",
      "en": "Madrid (GO Fest 2024)",
      "ja": "マドリード（GO Fest 2024）",
      "ru": "Мадрид (GO Fest 2024)"
    },
    "event": {
      "cs": "Pokémon GO Fest 2024: Madrid (Červen 2024)",
      "en": "Pokémon GO Fest 2024: Madrid (June 2024)",
      "ja": "GO Fest 2024：マドリード（2024年6月）",
      "ru": "GO Fest 2024 Madrid"
    },
    "year": 2024,
    "category": "go-fest",
    "location": {
      "cs": "Parque Juan Carlos I, Madrid, Španělsko",
      "en": "Parque Juan Carlos I, Madrid, Spain",
      "ja": "スペイン・マドリード（フアン・カルロス1世公園）",
      "ru": "Парк Хуан Карлос I, Мадрид, Испания"
    },
    "featuredPokemon": [
      "Necrozma",
      "Pheromosa",
      "Nihilego",
      "Kartana",
      "Guzzlord"
    ],
    "backgroundArtwork": {
      "cs": "Neoklasicistní brána Puerta de Alcalá, fontána Cibeles a Křišťálový palác",
      "en": "Neoclassical Puerta de Alcalá monument, Cibeles fountain, and Parque Juan Carlos I vistas",
      "ja": "アルカラ門の凱旋門、シベーレス噴水、フアン・カルロス1世公園の景観",
      "ru": "Ворота Алькала, фонтан Сибелес и парк Хуан Карлос I"
    },
    "acquisitionMethod": {
      "cs": "Prezenční 5★ raidy v Madridu pro držitele platné vstupenky",
      "en": "In-person 5-Star Raids in Madrid for ticket holders",
      "ja": "マドリード現地での星5レイド勝利時にチケット保持者へ付与",
      "ru": "Победа в рейдах в Мадриде с билетом"
    },
    "isGlobal": false,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/madrid-gofest-2024.png"
  },
  {
    "id": "nyc-gofest-2024",
    "title": {
      "cs": "New York City (GO Fest 2024)",
      "en": "New York City (GO Fest 2024)",
      "ja": "ニューヨーク（GO Fest 2024）",
      "ru": "Нью-Йорк (GO Fest 2024)"
    },
    "event": {
      "cs": "Pokémon GO Fest 2024: New York City (Červenec 2024)",
      "en": "Pokémon GO Fest 2024: NYC (July 2024)",
      "ja": "GO Fest 2024：ニューヨーク（2024年7月）",
      "ru": "GO Fest 2024 NYC"
    },
    "year": 2024,
    "category": "go-fest",
    "location": {
      "cs": "Randall's Island Park, New York, NY, USA",
      "en": "Randall's Island Park, New York, NY, USA",
      "ja": "アメリカ・ニューヨーク市（ランドールズ島）",
      "ru": "Рэндаллс-Айленд, Нью-Йорк, США"
    },
    "featuredPokemon": [
      "Necrozma",
      "Buzzwole",
      "Nihilego",
      "Kartana",
      "Guzzlord"
    ],
    "backgroundArtwork": {
      "cs": "Mrakodrap Empire State Building, Chrysler Building a panorama Manhattanu",
      "en": "Empire State Building spire, Chrysler Building, and Manhattan waterfront skyline",
      "ja": "エンパイアステートビル、クライスラービル、マンハッタンの摩天楼",
      "ru": "Эмпайр-стейт-билдинг, Крайслер-билдинг и панорама Манхэттена"
    },
    "acquisitionMethod": {
      "cs": "Prezenční 5★ raidy na ostrově Randall's Island s platným lístkem",
      "en": "In-person 5-Star Raids on Randall's Island with event ticket",
      "ja": "ランドールズ島現地での星5レイド勝利時にチケット保持者へ付与",
      "ru": "Победа в рейдах на Рэндаллс-Айленд с билетом"
    },
    "isGlobal": false,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/nyc-gofest-2024.png"
  },
  {
    "id": "wcs-honolulu-2024",
    "title": {
      "cs": "Honolulu (WCS 2024 Scubachu)",
      "en": "Honolulu (WCS 2024)",
      "ja": "ホノルル（ポケモンWCS 2024）",
      "ru": "Гонолулу (WCS 2024)"
    },
    "event": {
      "cs": "Pokémon World Championships 2024 Honolulu (Srpen 2024)",
      "en": "2024 Pokémon World Championships (August 2024)",
      "ja": "ポケモン世界大会 WCS 2024 ホノルル",
      "ru": "WCS 2024 Honolulu"
    },
    "year": 2024,
    "category": "heritage",
    "location": {
      "cs": "Hawaii Convention Center, Honolulu, USA",
      "en": "Hawaii Convention Center, Honolulu, HI, USA",
      "ja": "アメリカ・ハワイ州ホノルル",
      "ru": "Гонолулу, Гавайи, США"
    },
    "featuredPokemon": [
      "Pikachu"
    ],
    "backgroundArtwork": {
      "cs": "Sopečný kráter Diamond Head, pláž Waikiki s vlnami Pacifiku a květy ibišku",
      "en": "Diamond Head volcanic crater, Waikiki Pacific surf, and vibrant Hawaiian Hibiscus flowers",
      "ja": "ダイヤモンドヘッドの噴火口、ワイキキの青い波、ハイビスカスの花壇",
      "ru": "Кратер Даймонд-Хед, серфинг на Вайкики и цветы гибискуса"
    },
    "acquisitionMethod": {
      "cs": "Odměna z prezenčních 1★ raidů a výzkumů v Honolulu během WCS 2024",
      "en": "Completing in-person 1-Star Raids & Field Research in Honolulu during WCS",
      "ja": "WCS 2024会場およびホノルル現地での限定タスク・レイドで入手",
      "ru": "Награда за 1★ рейды и полевые квесты в Гонолулу на WCS 2024"
    },
    "isGlobal": false,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/wcs-honolulu-2024.png"
  },
  {
    "id": "fukuoka-wild-area-2024",
    "title": {
      "cs": "Fukuoka (Wild Area 2024)",
      "en": "Fukuoka (Wild Area 2024)",
      "ja": "福岡（ワイルドエリア 2024）",
      "ru": "Фукуока (Wild Area 2024)"
    },
    "event": {
      "cs": "Pokémon GO Wild Area: Fukuoka (Listopad 2024)",
      "en": "Pokémon GO Wild Area: Fukuoka (November 2024)",
      "ja": "GO ワイルドエリア：福岡（2024年11月）",
      "ru": "Wild Area Fukuoka"
    },
    "year": 2024,
    "category": "heritage",
    "location": {
      "cs": "Maizuru Park, Fukuoka, Japonsko",
      "en": "Maizuru Park, Fukuoka, Japan",
      "ja": "日本・福岡県福岡市（舞鶴公園）",
      "ru": "Парк Майдзуру, Фукуока, Япония"
    },
    "featuredPokemon": [
      "Toxtricity",
      "Dialga-Origin",
      "Palkia-Origin"
    ],
    "backgroundArtwork": {
      "cs": "Věž Fukuoka Tower, záliv Hakata a zářící elektrické blesky",
      "en": "Fukuoka Tower, Hakata Bay coastline, and electric punk lightning",
      "ja": "福岡タワー、博多湾の夜景、エレキパンクな稲妻",
      "ru": "Башня Фукуока, залив Хаката и электрические разряды"
    },
    "acquisitionMethod": {
      "cs": "In-person Max Battles a Raidy v parku Maizuru s platným lístkem",
      "en": "In-person Max Battles & Raids in Maizuru Park with event ticket",
      "ja": "舞鶴公園現地でのマックスバトルおよびレイド勝利時にチケット保持者へ付与",
      "ru": "Победа в Max Battles и рейдах в парке Майдзуру с билетом"
    },
    "isGlobal": false,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/fukuoka-wild-area-2024.png"
  },
  {
    "id": "sao-paulo-city-safari-2024",
    "title": {
      "cs": "São Paulo (City Safari 2024)",
      "en": "São Paulo (City Safari 2024)",
      "ja": "サンパウロ（シティサファリ 2024）",
      "ru": "Сан-Паулу (City Safari 2024)"
    },
    "event": {
      "cs": "Pokémon GO City Safari: São Paulo (Prosinec 2024)",
      "en": "Pokémon GO City Safari: São Paulo (December 2024)",
      "ja": "GO シティサファリ：サンパウロ（2024年12月）",
      "ru": "City Safari São Paulo 2024"
    },
    "year": 2024,
    "category": "city-safari",
    "location": {
      "cs": "São Paulo, Brazílie",
      "en": "São Paulo, Brazil",
      "ja": "ブラジル・サンパウロ",
      "ru": "Сан-Паулу, Бразилия"
    },
    "featuredPokemon": [
      "Eevee",
      "Skiddo"
    ],
    "backgroundArtwork": {
      "cs": "Zavěšený most Octávio Frias de Oliveira, park Ibirapuera a brazilské street art",
      "en": "Octávio Frias de Oliveira cable-stayed bridge, Ibirapuera Park, and Paulistano street art",
      "ja": "オリベイラ橋のケーブル斜張橋、イビラプエラ公園、サンパウロのストリートアート",
      "ru": "Вантовый мост Октавио Фриас де Оливейра и парк Ибирапуэра"
    },
    "acquisitionMethod": {
      "cs": "Dokončení placeného výzkumu Eevee Explorers v ulicích São Paula",
      "en": "Completing ticketed Eevee Explorers Timed Research across São Paulo",
      "ja": "サンパウロ現地での限定タイムチャレンジ達成で100%入手",
      "ru": "Выполнение квеста Eevee Explorers в Сан-Паулу"
    },
    "isGlobal": false,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/sao-paulo-city-safari-2024.png"
  },
  {
    "id": "new-taipei-unova-tour",
    "title": {
      "cs": "Nová Tchaj-pej (GO Tour Unova 2025)",
      "en": "New Taipei City (GO Tour Unova 2025)",
      "ja": "新北（イッシュツアー 2025）",
      "ru": "Новый Тайбэй (GO Tour Unova 2025)"
    },
    "event": {
      "cs": "Pokémon GO Tour: Unova – New Taipei City (Únor 2025)",
      "en": "Pokémon GO Tour: Unova – New Taipei City (Feb 2025)",
      "ja": "GO Tour イッシュ：新北市（2025年2月）",
      "ru": "GO Tour Unova New Taipei City"
    },
    "year": 2025,
    "category": "go-tour",
    "location": {
      "cs": "New Taipei Metropolitan Park, Tchaj-wan",
      "en": "New Taipei Metropolitan Park, Taiwan",
      "ja": "台湾・新北市（新北大都会公園）",
      "ru": "Новый Тайбэй, Тайвань"
    },
    "featuredPokemon": [
      "Reshiram",
      "Zekrom",
      "Kyurem"
    ],
    "backgroundArtwork": {
      "cs": "Zavěšený most Danhai Light Rail, řeka Tamsui a pohoří Guanyinshan",
      "en": "Danhai Light Rail suspension bridge, Tamsui River waterfront, and Guanyinshan peak",
      "ja": "淡海ライトレールの景観、淡水河のウォーターフロント、観音山の峰",
      "ru": "Мост Даньхай, набережная реки Тамсуй и гора Гуаньинь"
    },
    "acquisitionMethod": {
      "cs": "Osobní účast v 5★ raidech na Reshirama, Zekroma a Kyurema v parku New Taipei",
      "en": "Clear in-person 5-Star Raids in New Taipei Metropolitan Park with event ticket",
      "ja": "新北大都会公園現地での星5レイド勝利時にチケット保持者へ付与",
      "ru": "Победа в рейдах на стадионе в Новом Тайбэе с билетом"
    },
    "isGlobal": false,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/new-taipei-unova-tour.png"
  },
  {
    "id": "los-angeles-unova-tour-2025",
    "title": {
      "cs": "Los Angeles (GO Tour Unova 2025)",
      "en": "Los Angeles (GO Tour Unova 2025)",
      "ja": "ロサンゼルス（イッシュツアー 2025）",
      "ru": "Лос-Анджелес (GO Tour Unova 2025)"
    },
    "event": {
      "cs": "Pokémon GO Tour: Unova – Los Angeles (Únor 2025)",
      "en": "Pokémon GO Tour: Unova – Los Angeles (Feb 2025)",
      "ja": "GO Tour イッシュ：ロサンゼルス（2025年2月）",
      "ru": "GO Tour Unova Los Angeles"
    },
    "year": 2025,
    "category": "go-tour",
    "location": {
      "cs": "Rose Bowl Stadium & Downtown LA, CA, USA",
      "en": "Rose Bowl Stadium & Downtown LA, CA, USA",
      "ja": "アメリカ・カリフォルニア州ローズボウル・スタジアム",
      "ru": "Роуз Боул, Лос-Анджелес, США"
    },
    "featuredPokemon": [
      "Reshiram",
      "Zekrom",
      "Kyurem"
    ],
    "backgroundArtwork": {
      "cs": "Moderní mrakodrapy Downtown LA a silueta stadionu Rose Bowl",
      "en": "Downtown Los Angeles skyscrapers framed by Rose Bowl Stadium arches",
      "ja": "ダウンタウン・ロサンゼルスの超高層ビル群とローズボウルのアーチ",
      "ru": "Небоскребы Даунтауна Лос-Анджелеса и арки Роуз Боул"
    },
    "acquisitionMethod": {
      "cs": "Vítězství v 5★ raidech na stadionu Rose Bowl s platnou vstupenkou",
      "en": "Clear in-person 5-Star Raids at Rose Bowl Stadium with active ticket",
      "ja": "ローズボウル現地での星5レイド勝利時にチケット保持者へ付与",
      "ru": "Победа в рейдах на Роуз Боул с билетом"
    },
    "isGlobal": false,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/los-angeles-unova-tour-2025.png"
  },
  {
    "id": "city-safari-singapore-2025",
    "title": {
      "cs": "Singapur (City Safari 2025)",
      "en": "Singapore (City Safari 2025)",
      "ja": "シンガポール（シティサファリ 2025）",
      "ru": "Сингапур (City Safari 2025)"
    },
    "event": {
      "cs": "Pokémon GO City Safari: Singapore (Březen 2025)",
      "en": "Pokémon GO City Safari: Singapore (March 2025)",
      "ja": "GO シティサファリ：シンガポール（2025年3月）",
      "ru": "City Safari Singapore 2025"
    },
    "year": 2025,
    "category": "city-safari",
    "location": {
      "cs": "Singapur (Marina Bay & Gardens by the Bay)",
      "en": "Singapore (Marina Bay & Gardens)",
      "ja": "シンガポール（マリーナベイ）",
      "ru": "Сингапур (Marina Bay)"
    },
    "featuredPokemon": [
      "Eevee",
      "Skiddo"
    ],
    "backgroundArtwork": {
      "cs": "Futuristické Superstromy v Gardens by the Bay, hotel Marina Bay Sands a socha Merliona",
      "en": "Gardens by the Bay Supertrees, Marina Bay Sands tri-towers, and Merlion fountain",
      "ja": "ガーデンズ・バイ・ザ・ベイのスーパーツリー、マリーナベイ・サンズ、マーライオン",
      "ru": "Супердеревья Gardens by the Bay, отель Marina Bay Sands и Мерлион"
    },
    "acquisitionMethod": {
      "cs": "Dokončení výzkumu Eevee Explorers v Singapuru pro majitele vstupenky",
      "en": "Completing Eevee Explorers Timed Research in Singapore with event ticket",
      "ja": "シンガポール現地での限定タイムチャレンジ達成で100%入手",
      "ru": "Выполнение квеста Eevee Explorers в Сингапуре"
    },
    "isGlobal": false,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/city-safari-singapore-2025.png"
  },
  {
    "id": "city-safari-milan-2025",
    "title": {
      "cs": "Milán (City Safari 2025)",
      "en": "Milan (City Safari 2025)",
      "ja": "ミラノ（シティサファリ 2025）",
      "ru": "Милан (City Safari 2025)"
    },
    "event": {
      "cs": "Pokémon GO City Safari: Milan (Březen 2025)",
      "en": "Pokémon GO City Safari: Milan (March 2025)",
      "ja": "GO シティサファリ：ミラノ（2025年3月）",
      "ru": "City Safari Milan 2025"
    },
    "year": 2025,
    "category": "city-safari",
    "location": {
      "cs": "Milán, Lombardie, Itálie",
      "en": "Milan, Lombardy, Italy",
      "ja": "イタリア・ミラノ",
      "ru": "Милан, Италия"
    },
    "featuredPokemon": [
      "Eevee",
      "Skiddo"
    ],
    "backgroundArtwork": {
      "cs": "Gotická katedrála Duomo di Milano, pasáž Galleria Vittorio Emanuele II a hrad Sforzesco",
      "en": "Gothic spires of Duomo di Milano, Galleria Vittorio Emanuele II arches, and Sforza Castle",
      "ja": "ドゥオーモ（ミラノ大聖堂）のゴシック尖塔、ガレリアのアーチ、スフォルツェスコ城",
      "ru": "Готический Миланский собор Duomo, Галерея Виктора Эммануила II и замок Сфорца"
    },
    "acquisitionMethod": {
      "cs": "Dokončení výzkumu Eevee Explorers v Miláně pro držitele platného lístku",
      "en": "Completing Eevee Explorers Timed Research across Milan with ticket",
      "ja": "ミラノ現地での限定タイムチャレンジ達成で100%入手",
      "ru": "Выполнение квеста Eevee Explorers в Милане"
    },
    "isGlobal": false,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/city-safari-milan-2025.png"
  },
  {
    "id": "city-safari-mumbai-2025",
    "title": {
      "cs": "Bombaj / Mumbai (City Safari 2025)",
      "en": "Mumbai (City Safari 2025)",
      "ja": "ムンバイ（シティサファリ 2025）",
      "ru": "Мумбаи (City Safari 2025)"
    },
    "event": {
      "cs": "Pokémon GO City Safari: Mumbai (Březen 2025)",
      "en": "Pokémon GO City Safari: Mumbai (March 2025)",
      "ja": "GO シティサファリ：ムンバイ（2025年3月）",
      "ru": "City Safari Mumbai 2025"
    },
    "year": 2025,
    "category": "city-safari",
    "location": {
      "cs": "Bombaj (Mumbai), Maháráštra, Indie",
      "en": "Mumbai, Maharashtra, India",
      "ja": "インド・ムンバイ",
      "ru": "Мумбаи, Индия"
    },
    "featuredPokemon": [
      "Eevee",
      "Skiddo"
    ],
    "backgroundArtwork": {
      "cs": "Monumentální Brána Indie (Gateway of India) a panorama nábřeží Marine Drive",
      "en": "Monumental Gateway of India basalt arch and scenic Marine Drive ocean curve",
      "ja": "インド門の玄武岩アーチとマリーンドライブの海岸線パノラマ",
      "ru": "Монумент Ворота Индии и дуга набережной Марин-Драйв"
    },
    "acquisitionMethod": {
      "cs": "Dokončení výzkumu Eevee Explorers v Bombaji pro majitele vstupenky",
      "en": "Completing Eevee Explorers Timed Research across Mumbai with ticket",
      "ja": "ムンバイ現地での限定タイムチャレンジ達成で100%入手",
      "ru": "Выполнение квеста Eevee Explorers в Мумбаи"
    },
    "isGlobal": false,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/city-safari-mumbai-2025.png"
  },
  {
    "id": "copenhagen-gofest-2026",
    "title": {
      "cs": "Kodaň (GO Fest 2026 & LEGO)",
      "en": "Copenhagen (GO Fest 2026)",
      "ja": "コペンハーゲン（GO Fest 2026）",
      "ru": "Копенгаген (GO Fest 2026)"
    },
    "event": {
      "cs": "Pokémon GO Fest 2026: Copenhagen (Červen 2026)",
      "en": "Pokémon GO Fest 2026: Copenhagen (June 2026)",
      "ja": "GO Fest 2026：コペンハーゲン（2026年6月）",
      "ru": "GO Fest 2026 Copenhagen"
    },
    "year": 2026,
    "category": "go-fest",
    "location": {
      "cs": "Kodaň, Dánsko (Nyhavn & Tivoli)",
      "en": "Copenhagen, Denmark (Nyhavn & Tivoli)",
      "ja": "デンマーク・コペンハーゲン（ニューハウン）",
      "ru": "Копенгаген, Дания (Нюхавн)"
    },
    "featuredPokemon": [
      "Mewtwo",
      "Pikachu"
    ],
    "backgroundArtwork": {
      "cs": "Barevné štíty domů v přístavu Nyhavn, dřevěné plachetnice a socha Malé mořské víly",
      "en": "Iconic colorful Nyhavn waterfront gables, historic wooden ships, and Little Mermaid vista",
      "ja": "ニューハウン運河沿いのカラフルな木造家屋と歴史ある帆船の街並み",
      "ru": "Разноцветные фасады гавани Нюхавн, исторические корабли и Русалочка"
    },
    "acquisitionMethod": {
      "cs": "Osobní účast v Super Mega Raidech na Mega Mewtwo v Kodani s platným lístkem",
      "en": "Clear in-person Super Mega Raids in Copenhagen with active event ticket",
      "ja": "コペンハーゲン現地でのスーパーメガレイド勝利時にチケット保持者へ付与",
      "ru": "Победа в супер-мега рейдах в Копенгагене с билетом"
    },
    "isGlobal": false,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/copenhagen-gofest-2026.png"
  },
  {
    "id": "national-trust-uk-heritage",
    "title": {
      "cs": "National Trust UK (Britské Historické Památky)",
      "en": "National Trust UK Heritage Series",
      "ja": "英国ナショナル・トラスト連携（歴史遺産シリーズ）",
      "ru": "National Trust UK Heritage"
    },
    "event": {
      "cs": "Partnerství Pokémon GO & National Trust UK (2026)",
      "en": "Pokémon GO & National Trust UK Collaboration (2026)",
      "ja": "ナショナル・トラスト提携イベント（2026年）",
      "ru": "National Trust UK Collaboration"
    },
    "year": 2026,
    "category": "heritage",
    "location": {
      "cs": "27 historických panství a klášterů ve Velké Británii",
      "en": "27 Historic Properties across England, Wales & N. Ireland",
      "ja": "イギリス国内27箇所の歴史的遺産・大庭園",
      "ru": "27 исторических поместий в Великобритании"
    },
    "featuredPokemon": [
      "Treecko",
      "Grovyle",
      "Sceptile"
    ],
    "backgroundArtwork": {
      "cs": "Historické kamenné zříceniny opatství Fountains Abbey, paláce Cliveden a lesní zahrady Gibside",
      "en": "Architectural stone etchings of historic abbeys (Fountains Abbey), palaces (Cliveden), and estates",
      "ja": "ファウンテンズ修道院の壮大な廃墟や歴史的庭園を描いた繊細な石造建築画",
      "ru": "Архитектурные каменные гравюры аббатства Фаунтинс и поместий National Trust"
    },
    "acquisitionMethod": {
      "cs": "Návštěva registrované památky National Trust a splnění lokálního výzkumu",
      "en": "In-person visits to registered National Trust sites and clearing on-site Field Tasks",
      "ja": "英国ナショナル・トラスト対象史跡現地での限定タスク達成で入手",
      "ru": "Посещение объектов National Trust и выполнение заданий на месте"
    },
    "isGlobal": false,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/national-trust-uk-heritage.png"
  },
  {
    "id": "pokemon-center-stores-japan",
    "title": {
      "cs": "Pokémon Center Obchody (Japonská Síť)",
      "en": "Pokémon Center Japan Flagships",
      "ja": "ポケモンセンター（全国旗艦店記念カード）",
      "ru": "Pokémon Center Japan Flagships"
    },
    "event": {
      "cs": "Prezenční návštěva Pokémon Center prodejen v Japonsku",
      "en": "In-person visits to Pokémon Center official stores",
      "ja": "全国のポケモンセンター店舗限定チェックイン",
      "ru": "Посещение магазинов Pokémon Center в Японии"
    },
    "year": 2026,
    "category": "heritage",
    "location": {
      "cs": "16 oficiálních obchodů (Tokyo Mega, Shibuya, Kyoto, Osaka atd.)",
      "en": "16 Flagship Stores (Mega Tokyo, Shibuya, Kyoto, Osaka, Tohoku, etc.)",
      "ja": "メガトウキョー、シブヤ、キョウト、オーサカなど全国16店舗",
      "ru": "16 флагманских магазинов в Японии"
    },
    "featuredPokemon": [
      "Pikachu"
    ],
    "backgroundArtwork": {
      "cs": "Moderní technologické interiéry Pokémon Center s futuristickými sochami a logem",
      "en": "Sleek futuristic Pokémon Center storefront interiors with cyber lighting and official seal",
      "ja": "最新鋭のサイバーイルミネーションと歴代のシンボル像が輝くポケセン店内",
      "ru": "Футуристический интерьер магазинов Pokémon Center с кибер-подсветкой"
    },
    "acquisitionMethod": {
      "cs": "Osobní protočení sponzorovaného disku Gymu/PokéStopu přímo v Pokémon Centru",
      "en": "Spinning the official sponsored Gym/PokéStop disc physically inside the Pokémon Center",
      "ja": "各ポケモンセンター店舗内の公式ポケストップ・ジムを現地でスピンして入手",
      "ru": "Спин диска спонсорского гима или покестопа внутри магазина"
    },
    "isGlobal": false,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/pokemon-center-stores-japan.png"
  },
  {
    "id": "lego-collaboration-2026",
    "title": {
      "cs": "LEGO Collaboration (LEGO Kostky)",
      "en": "LEGO Collaboration (Brick World)",
      "ja": "レゴ提携記念（ブロックワールド）",
      "ru": "LEGO Collaboration"
    },
    "event": {
      "cs": "GO Fest Copenhagen & LEGO Stores Global (Léto 2026)",
      "en": "GO Fest Copenhagen & LEGO Stores (Summer 2026)",
      "ja": "GO Fest コペンハーゲン＆レゴストア提携（2026年夏）",
      "ru": "LEGO Collaboration 2026"
    },
    "year": 2026,
    "category": "heritage",
    "location": {
      "cs": "Kodaň a vybrané LEGO Store prodejny",
      "en": "Copenhagen & Partner LEGO Stores Worldwide",
      "ja": "コペンハーゲンおよび世界のレゴストア",
      "ru": "Копенгаген и магазины LEGO по всему миру"
    },
    "featuredPokemon": [
      "Pikachu"
    ],
    "backgroundArtwork": {
      "cs": "Stylové barevné LEGO kostky tvořící Pokéball a slavnou architekturu",
      "en": "Stylized vibrant LEGO bricks assembling a giant Pokéball and playful city monuments",
      "ja": "カラフルなレゴブロックで組み上げられた巨大モンスターボールと街並み",
      "ru": "Яркие кубики LEGO, собирающиеся в покебол и памятники"
    },
    "acquisitionMethod": {
      "cs": "Speciální výzkum na GO Festu v Kodani nebo návštěva participujících LEGO Store",
      "en": "Special Research at GO Fest Copenhagen or checking in at participating LEGO Stores",
      "ja": "GO Festコペンハーゲン会場および対象レゴストア店頭タスクで入手",
      "ru": "Спец-квест на GO Fest в Копенгагене и в магазинах LEGO"
    },
    "isGlobal": false,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/lego-collaboration-2026.png"
  },
  {
    "id": "busan-fireworks-festival-2025",
    "title": {
      "cs": "Pusan Ohňostroj (Busan Fireworks)",
      "en": "Busan Fireworks Festival",
      "ja": "釜山花火大会（ダイヤモンドブリッジ）",
      "ru": "Busan Fireworks Festival"
    },
    "event": {
      "cs": "Busan Fireworks Festival 2025 (Podzim 2025)",
      "en": "Busan Fireworks Festival 2025 (Autumn 2025)",
      "ja": "釜山花火祭り 2025",
      "ru": "Busan Fireworks Festival 2025"
    },
    "year": 2025,
    "category": "heritage",
    "location": {
      "cs": "Gwangalli Beach, Pusan, Jižní Korea",
      "en": "Gwangalli Beach, Busan, South Korea",
      "ja": "韓国・釜山広域市（広安里ビーチ）",
      "ru": "Пляж Кваналли, Пусан, Южная Корея"
    },
    "featuredPokemon": [
      "Pikachu"
    ],
    "backgroundArtwork": {
      "cs": "Zářící visutý most Gwangan Bridge ozářený obrovským barevným ohňostrojem nad mořem",
      "en": "Illuminated Gwangan suspension bridge backlit by massive colorful fireworks over the bay",
      "ja": "広安大橋の夜景と夜空を埋め尽くす大迫力の海上花火パノラマ",
      "ru": "Мост Кванан, озаренный грандиозным морским салютом"
    },
    "acquisitionMethod": {
      "cs": "Prezenční výzkum na pláži Gwangalli během festivalu ohňostrojů",
      "en": "On-site Field Tasks at Gwangalli Beach during the fireworks festival",
      "ja": "広安里ビーチ現地での花火大会限定イベントタスク達成で入手",
      "ru": "Задания на пляже Кваналли во время фестиваля салютов"
    },
    "isGlobal": false,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/busan-fireworks-festival-2025.png"
  },
  {
    "id": "jeju-island-air-adventures",
    "title": {
      "cs": "Ostrov Čedžu (Air Adventures 2023)",
      "en": "Jeju Island (Air Adventures 2023)",
      "ja": "済州島（そらとぶピカチュウ 2023）",
      "ru": "Остров Чеджу (Air Adventures 2023)"
    },
    "event": {
      "cs": "Pokémon Air Adventures: Jeju (Červenec 2023)",
      "en": "Pokémon Air Adventures: Jeju (July 2023)",
      "ja": "そらとぶピカチュウ：済州島（2023年7月）",
      "ru": "Air Adventures Jeju 2023"
    },
    "year": 2023,
    "category": "heritage",
    "location": {
      "cs": "Ostrov Čedžu, Jižní Korea",
      "en": "Jeju Island, South Korea",
      "ja": "韓国・済州島",
      "ru": "Остров Чеджу, Южная Корея"
    },
    "featuredPokemon": [
      "Latios-Mega",
      "Latias-Mega",
      "Pikachu"
    ],
    "backgroundArtwork": {
      "cs": "Sopka Hallasan, kamenné sochy Dol hareubang a pobřeží ostrova Čedžu",
      "en": "Mount Hallasan volcano, iconic Dol hareubang stone statues, and basalt coastlines",
      "ja": "漢拏山（ハルラサン）、トルハルバン石像、済州の青い玄武岩海岸",
      "ru": "Вулкан Халласан, каменные статуи Дольхарубан и побережье Чеджу"
    },
    "acquisitionMethod": {
      "cs": "Osobní účast v Mega Raidech na Latiose a Latias na ostrově Čedžu",
      "en": "In-person Mega Raids across Jeju Island during the event",
      "ja": "済州島現地でのメガラティオス・ラティアスレイド勝利時に確率付与",
      "ru": "Победа в Мега-рейдах на Чеджу"
    },
    "isGlobal": false,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/jeju-island-air-adventures.png"
  },
  {
    "id": "city-safari-tainan-2024",
    "title": {
      "cs": "Tchaj-nan (City Safari 2024)",
      "en": "Tainan (City Safari 2024)",
      "ja": "台南（シティサファリ 2024）",
      "ru": "Тайнань (City Safari 2024)"
    },
    "event": {
      "cs": "Pokémon GO City Safari: Tainan (Březen 2024)",
      "en": "Pokémon GO City Safari: Tainan (March 2024)",
      "ja": "GO シティサファリ：台南（2024年3月）",
      "ru": "City Safari Tainan 2024"
    },
    "year": 2024,
    "category": "city-safari",
    "location": {
      "cs": "Tchaj-nan, Tchaj-wan",
      "en": "Tainan, Taiwan",
      "ja": "台湾・台南市",
      "ru": "Тайнань, Тайвань"
    },
    "featuredPokemon": [
      "Eevee",
      "Skiddo"
    ],
    "backgroundArtwork": {
      "cs": "Historická pevnost Chihkan Tower, Konfuciův chrám a tradiční lampionové uličky",
      "en": "Chihkan Tower fortress, Confucius temple eaves, and traditional lantern-lit alleys",
      "ja": "赤嵌楼（チーカンロウ）、孔子廟、伝統的なランタンが灯る古都の街並み",
      "ru": "Башня Чихкан, храм Конфуция и улочки с фонариками"
    },
    "acquisitionMethod": {
      "cs": "Dokončení výzkumu Eevee Explorers v ulicích Tchaj-nanu",
      "en": "Completing ticketed Eevee Explorers Timed Research across Tainan",
      "ja": "台南現地での限定タイムチャレンジ達成で100%入手",
      "ru": "Выполнение квеста Eevee Explorers в Тайнане"
    },
    "isGlobal": false,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/city-safari-tainan-2024.png"
  },
  {
    "id": "surabaya-air-adventures",
    "title": {
      "cs": "Surabaja (Air Adventures Indonesia 2024)",
      "en": "Surabaya (Pikachu's Indonesia Journey)",
      "ja": "スラバヤ（そらとぶピカチュウ 2024）",
      "ru": "Сурабая (Air Adventures Indonesia)"
    },
    "event": {
      "cs": "Pikachu's Indonesia Journey: Surabaya (Květen 2024)",
      "en": "Pikachu's Indonesia Journey: Surabaya (May 2024)",
      "ja": "ピカチュウのインドネシアの旅：スラバヤ（2024年5月）",
      "ru": "Pikachu's Indonesia Journey: Surabaya"
    },
    "year": 2024,
    "category": "heritage",
    "location": {
      "cs": "Surabaja, Východní Jáva, Indonésie",
      "en": "Surabaya, East Java, Indonesia",
      "ja": "インドネシア・スラバヤ",
      "ru": "Сурабая, Индонезия"
    },
    "featuredPokemon": [
      "Latios-Mega",
      "Latias-Mega"
    ],
    "backgroundArtwork": {
      "cs": "Ikonický památník Suroboyo (žralok a krokodýl) a visutý most Suramadu",
      "en": "Iconic Suroboyo monument (Shark & Crocodile) and Suramadu suspension bridge",
      "ja": "サメとワニが戦うスラバヤの象徴像とスラマドゥ大橋",
      "ru": "Монумент Суробойо (акула и крокодил) и мост Сурамаду"
    },
    "acquisitionMethod": {
      "cs": "Osobní účast v Mega Raidech na Latiose a Latias v Surabaji pro držitele lístků",
      "en": "Clear in-person Mega Raids across Surabaya with active ticket",
      "ja": "スラバヤ現地でのメガレイド勝利時にチケット保持者へ付与",
      "ru": "Победа в Мега-рейдах в Сурабае с билетом"
    },
    "isGlobal": false,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/surabaya-air-adventures.png"
  },
  {
    "id": "yogyakarta-air-adventures",
    "title": {
      "cs": "Yogyakarta (Air Adventures Indonesia 2024)",
      "en": "Yogyakarta (Pikachu's Indonesia Journey)",
      "ja": "ジョグジャカルタ（そらとぶピカチュウ 2024）",
      "ru": "Джокьякарта (Air Adventures Indonesia)"
    },
    "event": {
      "cs": "Pikachu's Indonesia Journey: Yogyakarta (Srpen 2024)",
      "en": "Pikachu's Indonesia Journey: Yogyakarta (August 2024)",
      "ja": "ピカチュウのインドネシアの旅：ジョグジャカルタ",
      "ru": "Pikachu's Indonesia Journey: Yogyakarta"
    },
    "year": 2024,
    "category": "heritage",
    "location": {
      "cs": "Yogyakarta, Jáva, Indonésie",
      "en": "Yogyakarta, Java, Indonesia",
      "ja": "インドネシア・ジョグジャカルタ",
      "ru": "Джокьякарта, Индонезия"
    },
    "featuredPokemon": [
      "Latios-Mega",
      "Latias-Mega"
    ],
    "backgroundArtwork": {
      "cs": "Chrámové věže Prambananu, sopka Merapi a tradiční batikový vzor",
      "en": "Prambanan Hindu temple spires, active Mount Merapi volcano, and batik filigree",
      "ja": "プランバナン寺院の石塔、ムラピ火山、伝統的なバティック文様",
      "ru": "Шпили храма Прамбанан, вулкан Мерапи и узоры батика"
    },
    "acquisitionMethod": {
      "cs": "Osobní účast v Mega Raidech v Yogyakartě s platnou vstupenkou",
      "en": "Clear in-person Mega Raids across Yogyakarta with active ticket",
      "ja": "ジョグジャカルタ現地でのメガレイド勝利時にチケット保持者へ付与",
      "ru": "Победа в Мега-рейдах в Джокьякарте с билетом"
    },
    "isGlobal": false,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/yogyakarta-air-adventures.png"
  },
  {
    "id": "city-safari-jakarta-2024",
    "title": {
      "cs": "Jakarta (City Safari & Air Adventures 2024)",
      "en": "Jakarta (City Safari 2024)",
      "ja": "ジャカルタ（シティサファリ 2024）",
      "ru": "Джакарта (City Safari 2024)"
    },
    "event": {
      "cs": "Pokémon GO City Safari: Jakarta (Září 2024)",
      "en": "Pokémon GO City Safari: Jakarta (Sept 2024)",
      "ja": "GO シティサファリ：ジャカルタ（2024年9月）",
      "ru": "City Safari Jakarta 2024"
    },
    "year": 2024,
    "category": "city-safari",
    "location": {
      "cs": "Jakarta, Indonésie",
      "en": "Jakarta, Indonesia",
      "ja": "インドネシア・ジャカルタ",
      "ru": "Джакарта, Индонезия"
    },
    "featuredPokemon": [
      "Eevee",
      "Skiddo",
      "Latios-Mega",
      "Latias-Mega"
    ],
    "backgroundArtwork": {
      "cs": "Národní památník Monas se zlatým plamenem a kruhové náměstí Bundaran HI",
      "en": "National Monument (Monas) obelisk topped with gold flame and Bundaran HI fountain circle",
      "ja": "モナス独立記念塔の黄金の炎とブンダランHIの近代都市景観",
      "ru": "Национальный монумент Монас с золотым пламенем и площадь Бундаран HI"
    },
    "acquisitionMethod": {
      "cs": "Výzkum Eevee Explorers a prezenční Mega Raidy v Jakartě",
      "en": "Eevee Explorers Timed Research and in-person Mega Raids in Jakarta",
      "ja": "ジャカルタ現地での限定タスク達成およびメガレイド勝利で入手",
      "ru": "Квесты Eevee Explorers и Мега-рейды в Джакарте"
    },
    "isGlobal": false,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/city-safari-jakarta-2024.png"
  },
  {
    "id": "city-safari-incheon-2024",
    "title": {
      "cs": "Inčchon (City Safari 2024)",
      "en": "Incheon (City Safari 2024)",
      "ja": "仁川（シティサファリ 2024）",
      "ru": "Инчхон (City Safari 2024)"
    },
    "event": {
      "cs": "Pokémon GO City Safari: Incheon (Září 2024)",
      "en": "Pokémon GO City Safari: Incheon (Sept 2024)",
      "ja": "GO シティサファリ：仁川（2024年9月）",
      "ru": "City Safari Incheon 2024"
    },
    "year": 2024,
    "category": "city-safari",
    "location": {
      "cs": "Songdo Central Park, Inčchon, Jižní Korea",
      "en": "Songdo Central Park, Incheon, South Korea",
      "ja": "韓国・仁川広域市（松島セントラルパーク）",
      "ru": "Сонгдо Централ Парк, Инчхон, Южная Корея"
    },
    "featuredPokemon": [
      "Eevee",
      "Skiddo",
      "Pikachu"
    ],
    "backgroundArtwork": {
      "cs": "Futuristické mrakodrapy v Songdo, vodní kanál a most Incheon Grand Bridge",
      "en": "Futuristic Songdo high-rises, central canal waters, and Incheon Grand Bridge",
      "ja": "松島（ソンド）の超高層ビル群、セントラルパークの運河、仁川大橋",
      "ru": "Небоскребы Сонгдо, каналы парка и мост Инчхон"
    },
    "acquisitionMethod": {
      "cs": "Dokončení výzkumu Eevee Explorers v Songdo Central Parku",
      "en": "Completing Eevee Explorers Timed Research across Incheon",
      "ja": "仁川現地での限定タイムチャレンジ達成で100%入手",
      "ru": "Выполнение квеста Eevee Explorers в Инчхоне"
    },
    "isGlobal": false,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/city-safari-incheon-2024.png"
  },
  {
    "id": "osaka-gofest-2025",
    "title": {
      "cs": "Ósaka (GO Fest 2025: Zacian & Zamazenta)",
      "en": "Osaka (GO Fest 2025)",
      "ja": "大阪（GO Fest 2025：剣盾王）",
      "ru": "Осака (GO Fest 2025)"
    },
    "event": {
      "cs": "Pokémon GO Fest 2025: Osaka (Léto 2025)",
      "en": "Pokémon GO Fest 2025: Osaka (Summer 2025)",
      "ja": "GO Fest 2025：大阪（2025年夏）",
      "ru": "GO Fest 2025 Osaka"
    },
    "year": 2025,
    "category": "go-fest",
    "location": {
      "cs": "Ósaka, Japonsko (Umeda & Dotonbori)",
      "en": "Osaka, Japan (Umeda & Dotonbori)",
      "ja": "日本・大阪府大阪市",
      "ru": "Осака, Япония"
    },
    "featuredPokemon": [
      "Zacian",
      "Zamazenta"
    ],
    "backgroundArtwork": {
      "cs": "Mrakodrap Umeda Sky Building, kanál Dotonbori a neonové odlesky noční Ósaky",
      "en": "Umeda Sky Building floating garden observatory, Dotonbori canal reflections, and Osaka neon",
      "ja": "梅田スカイビル空中庭園、道頓堀の水面反射、大阪の煌びやかなネオン街",
      "ru": "Небоскреб Umeda Sky Building, канал Дотонбори и огни Осаки"
    },
    "acquisitionMethod": {
      "cs": "Prezenční 5★ Crowned Raidy v Ósace pro držitele platné vstupenky",
      "en": "In-person 5-Star Crowned Raids in Osaka with active event ticket",
      "ja": "大阪現地での星5王冠レイド勝利時にチケット保持者へ付与",
      "ru": "Победа в 5★ рейдах в Осаке с билетом"
    },
    "isGlobal": false,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/osaka-gofest-2025.png"
  },
  {
    "id": "jersey-city-gofest-2025",
    "title": {
      "cs": "Jersey City (GO Fest 2025: Zacian & Zamazenta)",
      "en": "Jersey City (GO Fest 2025)",
      "ja": "ジャージーシティ（GO Fest 2025）",
      "ru": "Джерси-Сити (GO Fest 2025)"
    },
    "event": {
      "cs": "Pokémon GO Fest 2025: Jersey City (Léto 2025)",
      "en": "Pokémon GO Fest 2025: Jersey City (Summer 2025)",
      "ja": "GO Fest 2025：ジャージーシティ（2025年夏）",
      "ru": "GO Fest 2025 Jersey City"
    },
    "year": 2025,
    "category": "go-fest",
    "location": {
      "cs": "Liberty State Park, Jersey City, NJ, USA",
      "en": "Liberty State Park, Jersey City, NJ, USA",
      "ja": "アメリカ・ニュージャージー州（リバティ州立公園）",
      "ru": "Либерти Стейт Парк, Джерси-Сити, США"
    },
    "featuredPokemon": [
      "Zacian",
      "Zamazenta"
    ],
    "backgroundArtwork": {
      "cs": "Silueta Sochy Svobody, řeka Hudson a panorama Lower Manhattanu z Liberty Parku",
      "en": "Statue of Liberty silhouette, Hudson River, and Lower Manhattan skyline vista",
      "ja": "自由の女神像のシルエット、ハドソン川、リバティ州立公園からのマンハッタン展望",
      "ru": "Статуя Свободы, река Гудзон и панорама Манхэттена"
    },
    "acquisitionMethod": {
      "cs": "Prezenční 5★ raidy v Liberty State Parku pro držitele platné vstupenky",
      "en": "In-person 5-Star Raids in Liberty State Park with active event ticket",
      "ja": "リバティ州立公園現地での星5レイド勝利時にチケット保持者へ付与",
      "ru": "Победа в 5★ рейдах в Либерти Стейт Парке с билетом"
    },
    "isGlobal": false,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/jersey-city-gofest-2025.png"
  },
  {
    "id": "paris-gofest-2025",
    "title": {
      "cs": "Paříž (GO Fest 2025: Zacian & Zamazenta)",
      "en": "Paris (GO Fest 2025)",
      "ja": "パリ（GO Fest 2025）",
      "ru": "Париж (GO Fest 2025)"
    },
    "event": {
      "cs": "Pokémon GO Fest 2025: Paris (Léto 2025)",
      "en": "Pokémon GO Fest 2025: Paris (Summer 2025)",
      "ja": "GO Fest 2025：パリ（2025年夏）",
      "ru": "GO Fest 2025 Paris"
    },
    "year": 2025,
    "category": "go-fest",
    "location": {
      "cs": "Champ de Mars, Paříž, Francie",
      "en": "Champ de Mars, Paris, France",
      "ja": "フランス・パリ（シャン・ド・マルス公園）",
      "ru": "Марсово поле, Париж, Франция"
    },
    "featuredPokemon": [
      "Zacian",
      "Zamazenta"
    ],
    "backgroundArtwork": {
      "cs": "Kovová konstrukce Eiffelovy věže, nábřeží řeky Seiny a historické lucerny Paříže",
      "en": "Eiffel Tower iron lattice, Champ de Mars promenades, and Seine river embankments",
      "ja": "エッフェル塔の鉄骨美、シャン・ド・マルス公園、セーヌ川の歴史的街並み",
      "ru": "Эйфелева башня, Марсово поле и набережная Сены"
    },
    "acquisitionMethod": {
      "cs": "Prezenční 5★ Crowned Raidy v Paříži pro držitele vstupenek",
      "en": "In-person 5-Star Crowned Raids in Paris for ticket holders",
      "ja": "パリ現地での星5王冠レイド勝利時にチケット保持者へ付与",
      "ru": "Победа в 5★ рейдах в Париже с билетом"
    },
    "isGlobal": false,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/paris-gofest-2025.png"
  },
  {
    "id": "pokemon-concierge-celebration",
    "title": {
      "cs": "Pokémon Concierge (Resortní Psyduck)",
      "en": "Pokémon Concierge Celebration",
      "ja": "ポケモンコンシェルジュ（南国リゾート）",
      "ru": "Pokémon Concierge"
    },
    "event": {
      "cs": "Pokémon Concierge Celebration Event (Září 2025)",
      "en": "Pokémon Concierge Celebration (Sept 2025)",
      "ja": "ポケモンコンシェルジュ配信記念イベント",
      "ru": "Pokémon Concierge Celebration"
    },
    "year": 2025,
    "category": "global",
    "location": {
      "cs": "Celosvětově (Timed Research)",
      "en": "Worldwide (Timed Research)",
      "ja": "全世界（タイムチャレンジ）",
      "ru": "Весь мир (Timed Research)"
    },
    "featuredPokemon": [
      "Psyduck"
    ],
    "backgroundArtwork": {
      "cs": "Tropický resort s dřevěnými lehátky, monstery, ibišky a tyrkysovým bazénem",
      "en": "Stop-motion tropical island resort with rattan chairs, monsteras, and turquoise pool",
      "ja": "ストップモーション調の南国リゾート、ヤシの木、プルメリアとプールサイド",
      "ru": "Тропический островной курорт с шезлонгами и бирюзовым бассейном"
    },
    "acquisitionMethod": {
      "cs": "Plnění slavnostního výzkumu Pokémon Concierge na oslavu stop-motion seriálu",
      "en": "Completing the special Pokémon Concierge Timed Research questline",
      "ja": "ポケモンコンシェルジュ公開記念タイムチャレンジ完遂で確定入手",
      "ru": "Выполнение праздничного квеста Pokémon Concierge"
    },
    "isGlobal": true,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/pokemon-concierge-celebration.png"
  },
  {
    "id": "pokemon-horizons-series",
    "title": {
      "cs": "Pokémon Horizons (Vzducholoď Brave Asagi)",
      "en": "Pokémon Horizons: The Series",
      "ja": "ポケットモンスター（ブレイブアサギ号）",
      "ru": "Pokémon Horizons"
    },
    "event": {
      "cs": "Pokémon Horizons Celebration Event (Září 2026)",
      "en": "Pokémon Horizons Celebration Event (Sept 2026)",
      "ja": "アニポケ「リコとロイ」放映記念イベント",
      "ru": "Pokémon Horizons Celebration"
    },
    "year": 2026,
    "category": "global",
    "location": {
      "cs": "Celosvětově (Timed Research & Raidy)",
      "en": "Worldwide (Timed Research & Raids)",
      "ja": "全世界（タイムチャレンジ＆レイド）",
      "ru": "Весь мир (Квесты и рейды)"
    },
    "featuredPokemon": [
      "Pikachu",
      "Charmander",
      "Charizard",
      "Meowscarada",
      "Skeledirge",
      "Quaquaval"
    ],
    "backgroundArtwork": {
      "cs": "Paluba vzducholodi Brave Asagi vznášející se nad oblaky při západu slunce s logem Rising Volt Tacklers",
      "en": "Brave Asagi airship soaring above evening cloudscapes with Rising Volt Tacklers emblem",
      "ja": "夕焼け雲海を飛翔する飛行船「ブレイブアサギ号」とライジングボルテッカーズの紋章",
      "ru": "Дирижабль Храбрый Асаги над облаками с эмблемой Rising Volt Tacklers"
    },
    "acquisitionMethod": {
      "cs": "Speciální výzkum oslavující seriál Pokémon Horizons v září 2026",
      "en": "Special Research milestones celebrating the Pokémon Horizons animated series",
      "ja": "アニポケ記念スペシャルリサーチおよび限定レイドで入手",
      "ru": "Спец-квест к выходу аниме Pokémon Horizons"
    },
    "isGlobal": true,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/pokemon-horizons-series.png"
  },
  {
    "id": "10th-anniversary-celebration-2026",
    "title": {
      "cs": "10. Výročí Pokémon GO (10th Anniversary)",
      "en": "Pokémon GO 10th Anniversary",
      "ja": "Pokémon GO 10周年記念（グランドフェスティバル）",
      "ru": "Pokémon GO 10th Anniversary"
    },
    "event": {
      "cs": "Pokémon GO 10th Anniversary Party (Červenec–Srpen 2026)",
      "en": "Pokémon GO 10th Anniversary Party (July–Aug 2026)",
      "ja": "Pokémon GO 10周年記念イベント（2026年夏）",
      "ru": "10th Anniversary Party 2026"
    },
    "year": 2026,
    "category": "global",
    "location": {
      "cs": "Celosvětově (Jubilejní Výzkum)",
      "en": "Worldwide (Anniversary Research)",
      "ja": "全世界（10周年リサーチ）",
      "ru": "Весь мир (Юбилейный квест)"
    },
    "featuredPokemon": [
      "Gimmighoul",
      "Mewtwo",
      "Pikachu"
    ],
    "backgroundArtwork": {
      "cs": "Zlatá jubilejní číslice 10 složená z ikonických Pokéballů, ohňostrojů a diamantových jisker",
      "en": "Radiant golden anniversary emblem 10 encrusted with Pokéballs and celestial fireworks",
      "ja": "歴代モンスターボールと花火で彩られた黄金の「10周年」記念エンブレム",
      "ru": "Золотая цифра 10 из покеболов, салюта и алмазных искр"
    },
    "acquisitionMethod": {
      "cs": "Jubilejní globální výzkum k oslavě 10 let existence hry Pokémon GO",
      "en": "10th Anniversary Special Research celebrating a decade of Pokémon GO",
      "ja": "ゲームリリース10周年記念スペシャルリサーチ完遂で入手",
      "ru": "Специальный юбилейный квест к 10-летию Pokémon GO"
    },
    "isGlobal": true,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/10th-anniversary-celebration-2026.png"
  },
  {
    "id": "dancing-in-the-moonlight-2026",
    "title": {
      "cs": "Dancing in the Moonlight (Svátek Měsíce 2026)",
      "en": "Dancing in the Moonlight 2026",
      "ja": "月夜の宴（中秋の名月 2026）",
      "ru": "Dancing in the Moonlight 2026"
    },
    "event": {
      "cs": "Dancing in the Moonlight Event (Září 2026)",
      "en": "Dancing in the Moonlight (Sept 2026)",
      "ja": "お月見イベント：月夜の宴（2026年9月）",
      "ru": "Dancing in the Moonlight 2026"
    },
    "year": 2026,
    "category": "global",
    "location": {
      "cs": "Celosvětově (Timed Research)",
      "en": "Worldwide (Timed Research)",
      "ja": "全世界（タイムチャレンジ）",
      "ru": "Весь мир (Timed Research)"
    },
    "featuredPokemon": [
      "Clefairy"
    ],
    "backgroundArtwork": {
      "cs": "Zářící úplněk obklopený nočními lucernami, květy vonokvětky (Osmanthus) a padajícími hvězdami",
      "en": "Luminescent harvest full moon framed by paper festival lanterns, Osmanthus blossoms, and star dust",
      "ja": "満月の月光に照らされる提灯、金木犀の花びら、夜空に煌めく流れ星",
      "ru": "Полная луна, праздничные фонари, лепестки османтуса и звездная пыль"
    },
    "acquisitionMethod": {
      "cs": "Dokončení podzimního výzkumu při svátku sklizně a úplňku v září 2026",
      "en": "Completing Mid-Autumn harvest festival Timed Research across Asia-Pacific and globally",
      "ja": "中秋の名月を祝う限定タイムチャレンジ達成で100%入手",
      "ru": "Выполнение осеннего квеста к празднику полнолуния"
    },
    "isGlobal": true,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/dancing-in-the-moonlight-2026.png"
  },
  {
    "id": "pokemon-world-championships-2026",
    "title": {
      "cs": "WCS 2026 Mistrovství Světa (San Francisco)",
      "en": "Pokémon World Championships 2026",
      "ja": "ポケモンWCS 2026（世界選手権記念）",
      "ru": "WCS 2026 Championship"
    },
    "event": {
      "cs": "2026 Pokémon World Championships (Srpen 2026)",
      "en": "2026 Pokémon World Championships (August 2026)",
      "ja": "ポケモン世界大会 WCS 2026（2026年8月）",
      "ru": "WCS 2026 Championships"
    },
    "year": 2026,
    "category": "heritage",
    "location": {
      "cs": "San Francisco, CA, USA & Celosvětově",
      "en": "San Francisco, CA, USA & Worldwide",
      "ja": "アメリカ・サンフランシスコ＆全世界",
      "ru": "Сан-Франциско, США и весь мир"
    },
    "featuredPokemon": [
      "Tinkaton",
      "Pikachu"
    ],
    "backgroundArtwork": {
      "cs": "Oficiální modro-zlatý vizuální motiv mistrovství světa s trofejí šampionů a mostem Golden Gate",
      "en": "Official championship azure-and-gold battle stage with Golden Gate Bridge and champion trophy",
      "ja": "世界選手権公式の青と金の闘技場、ゴールデンゲートブリッジ、世界王者のトロフィー",
      "ru": "Официальная сине-золотая арена WCS, мост Золотые Ворота и кубок чемпионов"
    },
    "acquisitionMethod": {
      "cs": "Globální a prezenční Timed Research během víkendu mistrovství světa 2026",
      "en": "Global & on-site Timed Research during the 2026 World Championships weekend",
      "ja": "世界大会開催記念の全世界共通タイムチャレンジ達成で入手",
      "ru": "Глобальный квест во время чемпионата мира 2026"
    },
    "isGlobal": true,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/pokemon-world-championships-2026.png"
  },
  {
    "id": "pyeongchang-winter-festival-2026",
    "title": {
      "cs": "Pchjongčchang (Zimní Festival 2026)",
      "en": "Pyeongchang Winter Festival 2026",
      "ja": "平昌（ピョンチャン冬祭り 2026）",
      "ru": "Пхёнчхан (Winter Festival 2026)"
    },
    "event": {
      "cs": "Pyeongchang Winter Festival 2026 (Leden 2026)",
      "en": "Pyeongchang Winter Festival 2026 (January 2026)",
      "ja": "平昌マス祭り＆冬の祭典（2026年1月）",
      "ru": "Pyeongchang Winter Festival 2026"
    },
    "year": 2026,
    "category": "heritage",
    "location": {
      "cs": "Pchjongčchang, Gangwon, Jižní Korea",
      "en": "Pyeongchang, Gangwon, South Korea",
      "ja": "韓国・江原道平昌",
      "ru": "Пхёнчхан, Канвондо, Южная Корея"
    },
    "featuredPokemon": [
      "Pikachu",
      "Deerling"
    ],
    "backgroundArtwork": {
      "cs": "Zasněžené olympijské sjezdovky v pohoří Taebaek, ledové sochy a mrazivé borovice",
      "en": "Snowbound Taebaek Mountain ski slopes, ice sculptures, and frosty pine forests",
      "ja": "太白山脈の白銀のゲレンデ、氷の彫刻、樹氷輝く松林",
      "ru": "Заснеженные склоны гор Тхэбэк, ледяные скульптуры и морозный лес"
    },
    "acquisitionMethod": {
      "cs": "Prezenční výzkum v Pchjongčchangu během zimního festivalu pstruhů",
      "en": "On-site Field Tasks in Pyeongchang during the winter ice festival",
      "ja": "平昌現地での冬祭り限定タスク達成で入手",
      "ru": "Задания в Пхёнчхане во время зимнего фестиваля"
    },
    "isGlobal": false,
    "preservesOnTrade": true,
    "cardImageUrl": "/backgrounds/pyeongchang-winter-festival-2026.png"
  }
];
