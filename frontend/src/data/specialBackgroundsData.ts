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
  // Global Special Backgrounds
  {
    id: 'ultra-space-wormhole',
    title: { cs: 'Ultra Space (Červí díra)', en: 'Ultra Space (Wormhole)', ja: 'ウルトラホール（ウルトラスペース）', ru: 'Ultra Space (Червоточина)' },
    event: { cs: 'GO Fest 2024: Global & Inbound from Ultra Space', en: 'GO Fest 2024: Global & Inbound from Ultra Space', ja: 'GO Fest 2024 グローバル＆ウルトラスペース', ru: 'GO Fest 2024 Global' },
    year: 2024,
    category: 'global',
    location: { cs: 'Celosvětově (Global Raidy)', en: 'Worldwide (Global Raids)', ja: '全世界（グローバルレイド）', ru: 'Весь мир (Глобальные рейды)' },
    featuredPokemon: ['Necrozma', 'Nihilego', 'Buzzwole', 'Pheromosa', 'Xurkitree', 'Celesteela', 'Kartana', 'Guzzlord', 'Blacephalon', 'Stakataka'],
    backgroundArtwork: { cs: 'Rotující multidimenzionální červí díra Ultra Space s temně fialovými a azurovými paprsky', en: 'Swirling multidimensional Ultra Space wormhole with dark purple and cyan cosmic vortexes', ja: '紫とシアンの光が渦巻くウルトラホールの次元の裂け目', ru: 'Вращающаяся червоточина Ultra Space с фиолетово-лазурными космическими вихрями' },
    acquisitionMethod: { cs: 'Náhodný drop z 5★ raidů Ultra Beasts a Necrozmy (šance cca 1 z 10 raidů)', en: 'Random drop from 5-Star Ultra Beast and Necrozma raids (~1 in 10 chance)', ja: 'ウルトラビーストおよびネクロズマの星5レイド勝利時に確率（約1/10）で付与', ru: 'Случайный шанс в 5-звездочных рейдах на Ultra Beasts и Necrozma (~1 из 10)' },
    isGlobal: true,
    preservesOnTrade: true
  },
  {
    id: 'solgaleo-sunburst',
    title: { cs: 'Zářivé Slunce (Radiant Sunburst)', en: 'Radiant Sunburst (Solar)', ja: '日輪の輝き（ソーラー）', ru: 'Radiant Sunburst' },
    event: { cs: 'GO Fest 2024: Global Special Research', en: 'GO Fest 2024: Global Special Research', ja: 'GO Fest 2024 スペシャルリサーチ', ru: 'GO Fest 2024 Special Research' },
    year: 2024,
    category: 'global',
    location: { cs: 'Celosvětově (Special Research odměna)', en: 'Worldwide (Special Research Reward)', ja: '全世界（スペシャルリサーチ報酬）', ru: 'Весь мир (Награда за квест)' },
    featuredPokemon: ['Solgaleo'],
    backgroundArtwork: { cs: 'Zlatá sluneční koróna s pulzujícími solárními erupcemi', en: 'Golden solar corona with pulsing solar flare arcs', ja: '黄金の太陽フレアと燃え盛るコロナ', ru: 'Золотая солнечная корона с пульсирующими протуберанцами' },
    acquisitionMethod: { cs: 'Garantovaná odměna za dokončení příběhového výzkumu GO Fest 2024', en: 'Guaranteed reward for completing the GO Fest 2024 ticketed storyline', ja: 'GO Fest 2024限定スペシャルリサーチ完遂時に確定入手', ru: 'Гарантированная награда за прохождение специального квеста GO Fest 2024' },
    isGlobal: true,
    preservesOnTrade: true
  },
  {
    id: 'lunala-crescent',
    title: { cs: 'Měsíční Srpek (Luminescent Moon)', en: 'Luminescent Moon (Lunar)', ja: '月輪の残光（ルナ）', ru: 'Luminescent Moon' },
    event: { cs: 'GO Fest 2024: Global Special Research', en: 'GO Fest 2024: Global Special Research', ja: 'GO Fest 2024 スペシャルリサーチ', ru: 'GO Fest 2024 Special Research' },
    year: 2024,
    category: 'global',
    location: { cs: 'Celosvětově (Special Research odměna)', en: 'Worldwide (Special Research Reward)', ja: '全世界（スペシャルリサーチ報酬）', ru: 'Весь мир (Награда за квест)' },
    featuredPokemon: ['Lunala'],
    backgroundArtwork: { cs: 'Zářící měsíční srpek uprostřed hlubokého nočního vesmíru a mlhovin', en: 'Glowing crescent moon amidst deep cosmic nebulae and stars', ja: '深淵の宇宙に浮かぶ神秘的な三日月と星雲', ru: 'Светящийся полумесяц среди глубоких туманностей и звезд' },
    acquisitionMethod: { cs: 'Garantovaná odměna za dokončení příběhového výzkumu GO Fest 2024', en: 'Guaranteed reward for completing the GO Fest 2024 ticketed storyline', ja: 'GO Fest 2024限定スペシャルリサーチ完遂時に確定入手', ru: 'Гарантированная награда за прохождение специального квеста GO Fest 2024' },
    isGlobal: true,
    preservesOnTrade: true
  },
  {
    id: 'necrozma-solar-lunar-fusion',
    title: { cs: 'Fúzní Zatmění (Solar / Lunar Eclipse)', en: 'Fusion Eclipse (Solar & Lunar)', ja: '合体エクリプス（日食／月食フュージョン）', ru: 'Fusion Eclipse' },
    event: { cs: 'Fúze Necrozmy se Solgaleo / Lunala', en: 'Necrozma Fusion with Solgaleo / Lunala', ja: 'ネクロズマ合体ギミック', ru: 'Слияние Некрозмы' },
    year: 2024,
    category: 'global',
    location: { cs: 'Celosvětově (Mechanika Fúze)', en: 'Worldwide (Fusion Mechanics)', ja: '全世界（合体実行時）', ru: 'Весь мир (Механика слияния)' },
    featuredPokemon: ['Necrozma-Dusk-Mane', 'Necrozma-Dawn-Wings'],
    backgroundArtwork: { cs: 'Kombinované pozadí spojující Červí díru s motivem Slunce nebo Měsíce', en: 'Blended background fusing the Ultra Space wormhole with Sunburst or Moon aesthetic', ja: 'ウルトラホールと日輪・月輪の光が融合した複合背景', ru: 'Комбинированный фон червоточины Ultra Space с солнечным или лунным диском' },
    acquisitionMethod: { cs: 'Spojení Necrozmy s Wormhole pozadím a Solgalea/Lunaly se Sun/Moon pozadím!', en: 'Fusing a Wormhole Necrozma with a Sunburst Solgaleo or Moon Lunala!', ja: '背景付きネクロズマと背景付きソルガレオ／ルナアーラを合体させると自動発現！', ru: 'Слияние Некрозмы с фоном Wormhole и Солгалео/Луналы с фоном Sun/Moon!' },
    isGlobal: true,
    preservesOnTrade: true
  },
  {
    id: 'triumph-together-leaders',
    title: { cs: 'Triumf Týmů (Valor, Mystic, Instinct)', en: 'Triumph Together (Team Leaders)', ja: 'チームリーダーの鼓舞（ヴァーラー・ミスティック・インスティンクト）', ru: 'Triumph Together' },
    event: { cs: 'Triumph Together Global Challenge (Srpen 2024)', en: 'Triumph Together Global Challenge (August 2024)', ja: 'チームコラボ・グローバルチャレンジ（2024年8月）', ru: 'Triumph Together (Август 2024)' },
    year: 2024,
    category: 'global',
    location: { cs: 'Celosvětově (Timed Research)', en: 'Worldwide (Timed Research)', ja: '全世界（タイムチャレンジ）', ru: 'Весь мир (Timed Research)' },
    featuredPokemon: ['Ponyta', 'Lapras', 'Elekid'],
    backgroundArtwork: { cs: 'Plameny Candely (Valor), ledové krystaly Blanche (Mystic) a blesky Sparka (Instinct)', en: 'Candela\'s Valor embers, Blanche\'s Mystic frost crystals, and Spark\'s Instinct lightning', ja: '赤の業火（キャンデラ）、青の氷晶（ブランシェ）、黄の雷撃（スパーク）', ru: 'Пламя Кандели (Valor), морозные кристаллы Бланш (Mystic) и молнии Спарка (Instinct)' },
    acquisitionMethod: { cs: 'Odměna za splnění globálních výzev trenérů v srpnu 2024', en: 'Reward for clearing community milestones in the August 2024 global challenge', ja: '全世界トレーナー協力のグローバルチャレンジ達成報酬', ru: 'Награда за выполнение глобального испытания в августе 2024' },
    isGlobal: true,
    preservesOnTrade: true
  },
  {
    id: 'wild-area-global-soundwave',
    title: { cs: 'Wild Area Global (Neonová Zvuková Vlna)', en: 'Wild Area Global (Neon Soundwave)', ja: 'ワイルドエリア・グローバル（ネオン音波）', ru: 'Wild Area Global' },
    event: { cs: 'Pokémon GO Wild Area Global (Listopad 2024)', en: 'Pokémon GO Wild Area Global (November 2024)', ja: 'GO ワイルドエリア：グローバル（2024年11月）', ru: 'Wild Area Global (Ноябрь 2024)' },
    year: 2024,
    category: 'global',
    location: { cs: 'Celosvětově (Max Battles a Raidy)', en: 'Worldwide (Max Battles & Raids)', ja: '全世界（マックスバトル＆レイド）', ru: 'Весь мир (Max Battles и рейды)' },
    featuredPokemon: ['Toxtricity', 'Kyogre-Primal', 'Groudon-Primal', 'Dialga-Origin', 'Palkia-Origin'],
    backgroundArtwork: { cs: 'Elektrická neonová zvuková vlna v punkovém fialovo-žlutém stylu', en: 'Electrifying neon audio soundwave graphics with purple-yellow punk styling', ja: '紫と黄色のパンクロック調ネオンイコライザー音波', ru: 'Неоновые звуковые волны в фиолетово-желтом панк-стиле' },
    acquisitionMethod: { cs: 'Náhodná odměna z Max Battles a 5★ raidů během globálního víkendu Wild Area', en: 'Random encounter drop from Max Battles and 5-Star raids during Wild Area Global', ja: 'ワイルドエリア期間中のマックスバトルおよび星5レイド勝利時に確率ドロップ', ru: 'Случайный дроп из Max Battles и 5★ рейдов во время Wild Area Global' },
    isGlobal: true,
    preservesOnTrade: true
  },

  // In-Person Location Cards
  {
    id: 'las-vegas-hoenn-tour',
    title: { cs: 'Las Vegas (GO Tour Hoenn 2023)', en: 'Las Vegas (GO Tour Hoenn 2023)', ja: 'ラスベガス（ホウエンツアー 2023）', ru: 'Лас-Вегас (GO Tour Hoenn 2023)' },
    event: { cs: 'Pokémon GO Tour: Hoenn – Las Vegas (Únor 2023)', en: 'Pokémon GO Tour: Hoenn – Las Vegas (February 2023)', ja: 'GO Tour ホウエン：ラスベガス（2023年2月）', ru: 'GO Tour Hoenn Las Vegas' },
    year: 2023,
    category: 'go-tour',
    location: { cs: 'Sunset Park, Las Vegas, USA', en: 'Sunset Park, Las Vegas, NV, USA', ja: 'アメリカ・ネバダ州ラスベガス（サンセットパーク）', ru: 'Лас-Вегас, Невада, США' },
    featuredPokemon: ['Kyogre-Primal', 'Groudon-Primal'],
    backgroundArtwork: { cs: 'Silueta Las Vegas Strip, kasinové neony a pouštní kaňon Red Rock', en: 'Las Vegas Strip skyline with casino neon silhouettes and Red Rock Canyon', ja: 'カジノのネオン輝くラスベガスのスカイラインとレッドロックキャニオン', ru: 'Неоновый силуэт Лас-Вегас Стрип и каньон Ред-Рок' },
    acquisitionMethod: { cs: 'Vítězství v prezenčních Primal Raidech v Sunset Parku pro majitele vstupenky', en: 'Clear in-person Primal Raids at Sunset Park with an active event ticket', ja: 'サンセットパーク現地でのゲンシレイド勝利時にチケット保持者へドロップ', ru: 'Победа в Primal рейдах в Sunset Park с билетом на ивент' },
    isGlobal: false,
    preservesOnTrade: true
  },
  {
    id: 'london-osaka-nyc-gofest-2023',
    title: { cs: 'Londýn / Ósaka / New York (GO Fest 2023)', en: 'London / Osaka / NYC (GO Fest 2023)', ja: 'ロンドン／大阪／ニューヨーク（GO Fest 2023）', ru: 'Лондон / Осака / Нью-Йорк (GO Fest 2023)' },
    event: { cs: 'Pokémon GO Fest 2023 (Srpen 2023)', en: 'Pokémon GO Fest 2023 (August 2023)', ja: 'GO Fest 2023 現地イベント', ru: 'GO Fest 2023 In-Person' },
    year: 2023,
    category: 'go-fest',
    location: { cs: 'Brockwell Park (Londýn), Expo\'70 (Ósaka), Randall\'s Island (NYC)', en: 'Brockwell Park (London), Expo \'70 (Osaka), Randall\'s Island (NYC)', ja: 'ロンドン、大阪、ニューヨーク各会場', ru: 'Лондон, Осака, Нью-Йорк' },
    featuredPokemon: ['Rayquaza-Mega', 'Xerneas', 'Yveltal', 'Cresselia'],
    backgroundArtwork: { cs: 'Ikonická panoramata měst: Big Ben a Tower Bridge, Tower of the Sun, Empire State Building', en: 'Iconic cityscapes: Big Ben & Tower Bridge, Tower of the Sun, and Empire State Building', ja: 'ビッグベン、万博記念公園・太陽の塔、エンパイアステートビルの街並み', ru: 'Панорамы городов: Биг-Бен, Башня Солнца, Эмпайр-стейт-билдинг' },
    acquisitionMethod: { cs: 'In-person raidy v daných městech pro držitele vstupenek', en: 'Clear in-person Raids in host cities with an active ticket', ja: '各都市の現地レイド勝利時にチケット所持者へ付与', ru: 'Победа в рейдах в городе проведения с билетом' },
    isGlobal: false,
    preservesOnTrade: true
  },
  {
    id: 'los-angeles-sinnoh-tour',
    title: { cs: 'Los Angeles (GO Tour Sinnoh 2024)', en: 'Los Angeles (GO Tour Sinnoh 2024)', ja: 'ロサンゼルス（シンオウツアー 2024）', ru: 'Лос-Анджелес (GO Tour Sinnoh 2024)' },
    event: { cs: 'Pokémon GO Tour: Sinnoh – Los Angeles (Únor 2024)', en: 'Pokémon GO Tour: Sinnoh – Los Angeles (February 2024)', ja: 'GO Tour シンオウ：ロサンゼルス（2024年2月）', ru: 'GO Tour Sinnoh Los Angeles' },
    year: 2024,
    category: 'go-tour',
    location: { cs: 'Rose Bowl Stadium, Pasadena / LA, USA', en: 'Rose Bowl Stadium, Pasadena, CA, USA', ja: 'アメリカ・カリフォルニア州ローズボウル・スタジアム', ru: 'Роуз Боул, Пасадена, США' },
    featuredPokemon: ['Dialga-Origin', 'Palkia-Origin'],
    backgroundArtwork: { cs: 'Slavný stadion Rose Bowl, kalifornské palmy a pohoří San Gabriel', en: 'Historic Rose Bowl stadium arches, California palm trees, and San Gabriel Mountains', ja: 'ローズボウルのアーチ、カリフォルニアのヤシ並木、サンガブリエル山脈', ru: 'Арки стадиона Роуз Боул, калифорнийские пальмы и горы Сан-Габриэль' },
    acquisitionMethod: { cs: 'Vítězství v Origin Forme raidech na stadionu Rose Bowl s platnou vstupenkou', en: 'Clear Origin Forme Raids at Rose Bowl with an active event ticket', ja: 'ローズボウル現地でのオリジンレイド勝利時にチケット保持者へ確定付与', ru: 'Победа в Origin рейдах на стадионе Роуз Боул с билетом' },
    isGlobal: false,
    preservesOnTrade: true
  },
  {
    id: 'sendai-madrid-nyc-gofest-2024',
    title: { cs: 'Sendai / Madrid / New York (GO Fest 2024)', en: 'Sendai / Madrid / NYC (GO Fest 2024)', ja: '仙台／マドリード／ニューヨーク（GO Fest 2024）', ru: 'Сэндай / Мадрид / Нью-Йорк (GO Fest 2024)' },
    event: { cs: 'Pokémon GO Fest 2024 (Květen–Červenec 2024)', en: 'Pokémon GO Fest 2024 (May–July 2024)', ja: 'GO Fest 2024 現地開催都市', ru: 'GO Fest 2024 In-Person' },
    year: 2024,
    category: 'go-fest',
    location: { cs: 'Nanakita Park (Sendai), Parque Juan Carlos I (Madrid), Randall\'s Island (NYC)', en: 'Nanakita Park (Sendai), Parque Juan Carlos I (Madrid), Randall\'s Island (NYC)', ja: '七北田公園（仙台）、フアン・カルロス1世公園（マドリード）、ランドールズ島（NYC）', ru: 'Сэндай, Мадрид, Нью-Йорк' },
    featuredPokemon: ['Necrozma', 'Xurkitree', 'Pheromosa', 'Buzzwole', 'Marshadow'],
    backgroundArtwork: { cs: 'Hrad Aoba a socha Masamuneho (Sendai), brána Puerta de Alcalá (Madrid), Manhattan skyline (NYC)', en: 'Aoba Castle & Date Masamune (Sendai), Puerta de Alcalá (Madrid), Manhattan Skyline (NYC)', ja: '青葉城址・伊達政宗公騎馬像（仙台）、アルカラ門（マドリード）、マンハッタン摩天楼（NYC）', ru: 'Замок Аоба (Сэндай), Ворота Алькала (Мадрид), Манхэттен (NYC)' },
    acquisitionMethod: { cs: 'Prezenční 5★ raidy na Necrozmu a Ultra Beasts v hostitelských městech', en: 'In-person 5-Star Raids for Necrozma & Ultra Beasts with event ticket', ja: '各開催都市での現地星5レイド勝利時にチケット保持者へ付与', ru: 'Победа в рейдах на Necrozma и Ultra Beasts в городе проведения' },
    isGlobal: false,
    preservesOnTrade: true
  },
  {
    id: 'fukuoka-wild-area-2024',
    title: { cs: 'Fukuoka (Wild Area 2024)', en: 'Fukuoka (Wild Area 2024)', ja: '福岡（ワイルドエリア 2024）', ru: 'Фукуока (Wild Area 2024)' },
    event: { cs: 'Pokémon GO Wild Area: Fukuoka (Listopad 2024)', en: 'Pokémon GO Wild Area: Fukuoka (November 2024)', ja: 'GO ワイルドエリア：福岡（2024年11月）', ru: 'Wild Area Fukuoka' },
    year: 2024,
    category: 'heritage',
    location: { cs: 'Maizuru Park, Fukuoka, Japonsko', en: 'Maizuru Park, Fukuoka, Japan', ja: '日本・福岡県福岡市（舞鶴公園）', ru: 'Парк Майдзуру, Фукуока, Япония' },
    featuredPokemon: ['Toxtricity', 'Dialga-Origin', 'Palkia-Origin'],
    backgroundArtwork: { cs: 'Věž Fukuoka Tower, záliv Hakata a zářící elektrické blesky', en: 'Fukuoka Tower, Hakata Bay coastline, and electric punk lightning', ja: '福岡タワー、博多湾の夜景、エレキパンクな稲妻', ru: 'Башня Фукуока, залив Хаката и электрические разряды' },
    acquisitionMethod: { cs: 'In-person Max Battles a Raidy v parku Maizuru s platným lístkem', en: 'In-person Max Battles & Raids in Maizuru Park with event ticket', ja: '舞鶴公園現地でのマックスバトルおよびレイド勝利時にチケット保持者へ付与', ru: 'Победа в Max Battles и рейдах в парке Майдзуру с билетом' },
    isGlobal: false,
    preservesOnTrade: true
  },
  {
    id: 'city-safari-series',
    title: { cs: 'City Safari (Soul, Barcelona, Mexico City, Tainan, Incheon, São Paulo)', en: 'City Safari Series (Global Cities)', ja: 'シティサファリ（ソウル、バルセロナ、台南、サンパウロ他）', ru: 'City Safari Series' },
    event: { cs: 'Pokémon GO City Safari Tour (2023–2026)', en: 'Pokémon GO City Safari Tour (2023–2026)', ja: 'GO シティサファリ シリーズ（2023〜2026年）', ru: 'City Safari Series' },
    year: 2024,
    category: 'city-safari',
    location: { cs: 'Metropole po celém světě', en: 'Host metropolitan cities worldwide', ja: '世界各国の提携開催都市', ru: 'Города проведения по всему миру' },
    featuredPokemon: ['Eevee', 'Pikachu', 'Skiddo'],
    backgroundArtwork: { cs: 'Specifické dominanty měst: Sagrada Família (Barcelona), N Seoul Tower (Soul), Katedrála v São Paulu atd.', en: 'City-specific monuments: Sagrada Família (Barcelona), N Seoul Tower (Seoul), São Paulo Cathedral, etc.', ja: 'サグラダファミリア、Nソウルタワー、奇美博物館など各都市のシンボル', ru: 'Достопримечательности: Саграда Фамилия, N Seoul Tower и др.' },
    acquisitionMethod: { cs: 'Dokončení exkluzivního výzkumu City Safari Special Research v daném městě', en: 'Completing ticketed City Safari Special Research tasks in host cities', ja: '開催都市でのシティサファリ限定スペシャルリサーチ達成報酬', ru: 'Выполнение заданий City Safari Special Research в городе проведения' },
    isGlobal: false,
    preservesOnTrade: true
  }
];
