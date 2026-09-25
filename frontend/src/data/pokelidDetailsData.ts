// Auto-generated Pokélids detailed data with official GPS coordinates
export interface PokelidDetailItem {
  id: string;
  descId: string;
  city: string;
  cityEn: string;
  prefectureId: string;
  smallImage: string;
  largeImage: string;
  lat: number;
  lng: number;
}

export interface JapanRegionInfo {
  id: string;
  name: { cs: string; en: string; ja: string; ru: string };
  prefectures: string[];
  center: { x: number; y: number };
}

export const JAPAN_REGIONS: JapanRegionInfo[] = [
  {
    "id": "hokkaido",
    "name": {
      "cs": "Hokkaidó",
      "en": "Hokkaido",
      "ja": "北海道",
      "ru": "Хоккайдо"
    },
    "prefectures": [
      "hokkaido"
    ],
    "center": {
      "x": 80,
      "y": 18
    }
  },
  {
    "id": "tohoku",
    "name": {
      "cs": "Tóhoku",
      "en": "Tohoku",
      "ja": "東北地方",
      "ru": "Тохоку"
    },
    "prefectures": [
      "aomori",
      "iwate",
      "miyagi",
      "akita",
      "yamagata",
      "fukushima"
    ],
    "center": {
      "x": 74,
      "y": 44
    }
  },
  {
    "id": "kanto",
    "name": {
      "cs": "Kanto",
      "en": "Kanto",
      "ja": "関東地方",
      "ru": "Канто"
    },
    "prefectures": [
      "ibaraki",
      "tochigi",
      "saitama",
      "chiba",
      "tokyo",
      "kanagawa"
    ],
    "center": {
      "x": 67,
      "y": 58
    }
  },
  {
    "id": "chubu",
    "name": {
      "cs": "Čúbu / Hokuriku",
      "en": "Chubu / Hokuriku",
      "ja": "中部・北陸地方",
      "ru": "Тюбу / Хокурику"
    },
    "prefectures": [
      "niigata",
      "toyama",
      "ishikawa",
      "fukui",
      "nagano",
      "gifu",
      "shizuoka",
      "aichi"
    ],
    "center": {
      "x": 55,
      "y": 55
    }
  },
  {
    "id": "kansai",
    "name": {
      "cs": "Kansai",
      "en": "Kansai",
      "ja": "近畿地方",
      "ru": "Кансай"
    },
    "prefectures": [
      "mie",
      "shiga",
      "kyoto",
      "osaka",
      "hyogo",
      "nara",
      "wakayama"
    ],
    "center": {
      "x": 52,
      "y": 64
    }
  },
  {
    "id": "chugoku",
    "name": {
      "cs": "Čúgoku",
      "en": "Chugoku",
      "ja": "中国地方",
      "ru": "Тюгоку"
    },
    "prefectures": [
      "tottori",
      "shimane",
      "okayama",
      "yamaguchi"
    ],
    "center": {
      "x": 40,
      "y": 62
    }
  },
  {
    "id": "shikoku",
    "name": {
      "cs": "Šikoku",
      "en": "Shikoku",
      "ja": "四国地方",
      "ru": "Сикоку"
    },
    "prefectures": [
      "tokushima",
      "kagawa",
      "ehime",
      "kochi"
    ],
    "center": {
      "x": 42,
      "y": 73
    }
  },
  {
    "id": "kyushu",
    "name": {
      "cs": "Kjúšú",
      "en": "Kyushu",
      "ja": "九州地方",
      "ru": "Кюсю"
    },
    "prefectures": [
      "fukuoka",
      "saga",
      "nagasaki",
      "miyazaki",
      "kagoshima"
    ],
    "center": {
      "x": 26,
      "y": 75
    }
  },
  {
    "id": "okinawa",
    "name": {
      "cs": "Okinawa",
      "en": "Okinawa",
      "ja": "沖縄地方",
      "ru": "Окинава"
    },
    "prefectures": [
      "okinawa"
    ],
    "center": {
      "x": 18,
      "y": 92
    }
  }
];

export const ALL_POKELIDS: Record<string, PokelidDetailItem[]> = {
  "hokkaido": [
    {
      "id": "hokkaido-445",
      "descId": "445",
      "city": "別海町",
      "cityEn": "Betsukai",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/63d1b0ab4923f1c3cd03a928dd57d7b5_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/63d1b0ab4923f1c3cd03a928dd57d7b5_l.png",
      "lat": 43.533265,
      "lng": 145.23697
    },
    {
      "id": "hokkaido-444",
      "descId": "444",
      "city": "湧別町",
      "cityEn": "Yubetsu",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/80d67fcbafef57060bff53c8de34985b_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/80d67fcbafef57060bff53c8de34985b_l.png",
      "lat": 44.18466,
      "lng": 143.594848
    },
    {
      "id": "hokkaido-443",
      "descId": "443",
      "city": "津別町",
      "cityEn": "Tsubetsu",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/fa60bb5908c2b1825c3022acdc8aac53_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/fa60bb5908c2b1825c3022acdc8aac53_l.png",
      "lat": 43.69494344,
      "lng": 144.029683
    },
    {
      "id": "hokkaido-442",
      "descId": "442",
      "city": "幌延町",
      "cityEn": "Horonobe",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/c109d6f01a11e1abe9df06af4196d73c_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/c109d6f01a11e1abe9df06af4196d73c_l.png",
      "lat": 45.040817,
      "lng": 141.8612
    },
    {
      "id": "hokkaido-441",
      "descId": "441",
      "city": "厚沢部町",
      "cityEn": "Assabu",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/00de3645760fd45cc9adfdb0967ac056_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/00de3645760fd45cc9adfdb0967ac056_l.png",
      "lat": 41.916775,
      "lng": 140.216556
    },
    {
      "id": "hokkaido-440",
      "descId": "440",
      "city": "由仁町",
      "cityEn": "Yuni",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/7dd1c2ca558b28c070cf52b3cf98f68d_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/7dd1c2ca558b28c070cf52b3cf98f68d_l.png",
      "lat": 43.01186,
      "lng": 141.78697
    },
    {
      "id": "hokkaido-439",
      "descId": "439",
      "city": "砂川市",
      "cityEn": "Sunagawa",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/d6b485b2485506fb3022e809a4c2876c_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/d6b485b2485506fb3022e809a4c2876c_l.png",
      "lat": 43.493037,
      "lng": 141.907367
    },
    {
      "id": "hokkaido-438",
      "descId": "438",
      "city": "札幌市",
      "cityEn": "Sapporo",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/531b4a4ba848285085f50bb59b5a7a61_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/531b4a4ba848285085f50bb59b5a7a61_l.png",
      "lat": 42.96615624,
      "lng": 141.1669585
    },
    {
      "id": "hokkaido-324",
      "descId": "324",
      "city": "美瑛町",
      "cityEn": "Biei",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/de1fad5b97b1302c551d9589cad60c01_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/de1fad5b97b1302c551d9589cad60c01_l.png",
      "lat": 43.59198,
      "lng": 142.46372
    },
    {
      "id": "hokkaido-307",
      "descId": "307",
      "city": "美幌町",
      "cityEn": "Bihoro",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/8ec01130d0c20e3a3957f36e64315883_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/8ec01130d0c20e3a3957f36e64315883_l.png",
      "lat": 43.836455,
      "lng": 144.105878
    },
    {
      "id": "hokkaido-306",
      "descId": "306",
      "city": "猿払村",
      "cityEn": "Sarufutsu",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/e37f84100e487f76745f084394ae7d07_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/e37f84100e487f76745f084394ae7d07_l.png",
      "lat": 45.329186,
      "lng": 142.177267
    },
    {
      "id": "hokkaido-305",
      "descId": "305",
      "city": "木古内町",
      "cityEn": "Kikonai",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/9c50492829220e1aa07a60b268ddfa1e_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/9c50492829220e1aa07a60b268ddfa1e_l.png",
      "lat": 41.678024,
      "lng": 140.43558
    },
    {
      "id": "hokkaido-304",
      "descId": "304",
      "city": "歌志内市",
      "cityEn": "Utashinai",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/9e92a35e490e653f3cdbc4836a94263e_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/9e92a35e490e653f3cdbc4836a94263e_l.png",
      "lat": 43.503206,
      "lng": 142.005914
    },
    {
      "id": "hokkaido-303",
      "descId": "303",
      "city": "北見市",
      "cityEn": "Kitami",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/5d4acfcb12a887332d63082b2bfcae8a_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/5d4acfcb12a887332d63082b2bfcae8a_l.png",
      "lat": 43.75359,
      "lng": 143.500587
    },
    {
      "id": "hokkaido-302",
      "descId": "302",
      "city": "室蘭市",
      "cityEn": "Muroran",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/8926749b6373a6631574db18ea39adf7_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/8926749b6373a6631574db18ea39adf7_l.png",
      "lat": 42.313837,
      "lng": 140.973986
    },
    {
      "id": "hokkaido-278",
      "descId": "278",
      "city": "当別町",
      "cityEn": "Tobetsu",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/b156dff51cd08f5fedd446271f2af5cb_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/b156dff51cd08f5fedd446271f2af5cb_l.png",
      "lat": 43.17716187047716,
      "lng": 141.4485234
    },
    {
      "id": "hokkaido-221",
      "descId": "221",
      "city": "えりも町",
      "cityEn": "Erimo",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/d6112e741a398a77436b6a4eca00b2cf_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/d6112e741a398a77436b6a4eca00b2cf_l.png",
      "lat": 42.01782,
      "lng": 143.14619
    },
    {
      "id": "hokkaido-220",
      "descId": "220",
      "city": "斜里町",
      "cityEn": "Shari",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/1c18c9f749dced78800c3893890d0fbc_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/1c18c9f749dced78800c3893890d0fbc_l.png",
      "lat": 44.06884,
      "lng": 144.99062
    },
    {
      "id": "hokkaido-219",
      "descId": "219",
      "city": "東川町",
      "cityEn": "Higashikawa",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/97cab8cd9571ac26cba4a7a16bb12770_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/97cab8cd9571ac26cba4a7a16bb12770_l.png",
      "lat": 43.698404,
      "lng": 142.507039
    },
    {
      "id": "hokkaido-218",
      "descId": "218",
      "city": "赤井川村",
      "cityEn": "Akaigawa",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/f141860f843e06b962fcbd5c4d699d6e_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/f141860f843e06b962fcbd5c4d699d6e_l.png",
      "lat": 43.05125,
      "lng": 140.844262
    },
    {
      "id": "hokkaido-217",
      "descId": "217",
      "city": "網走市",
      "cityEn": "Abashiri",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/7f513d0f647dc5adfe2e0576aedaf871_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/7f513d0f647dc5adfe2e0576aedaf871_l.png",
      "lat": 44.021949,
      "lng": 144.274423
    },
    {
      "id": "hokkaido-216",
      "descId": "216",
      "city": "帯広市",
      "cityEn": "Obihiro",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/978d53fbb05f1fc405e8f52a26325b90_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/978d53fbb05f1fc405e8f52a26325b90_l.png",
      "lat": 42.918205,
      "lng": 143.202563
    },
    {
      "id": "hokkaido-215",
      "descId": "215",
      "city": "釧路市",
      "cityEn": "Kushiro",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/a3d69726d4c689718117f62c9aef41e7_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/a3d69726d4c689718117f62c9aef41e7_l.png",
      "lat": 43.144027,
      "lng": 144.14549
    },
    {
      "id": "hokkaido-214",
      "descId": "214",
      "city": "旭川市",
      "cityEn": "Asahikawa",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/98f049601f822ae15722cb1f18b781b0_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/98f049601f822ae15722cb1f18b781b0_l.png",
      "lat": 43.7595958,
      "lng": 142.3485094
    },
    {
      "id": "hokkaido-193",
      "descId": "193",
      "city": "中標津町",
      "cityEn": "Nakashibetsu",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/690d084c832f1c94f9c765c47fb5d3b4_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/690d084c832f1c94f9c765c47fb5d3b4_l.png",
      "lat": 43.554566,
      "lng": 144.969609
    },
    {
      "id": "hokkaido-192",
      "descId": "192",
      "city": "陸別町",
      "cityEn": "Rikubetsu",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/3085ebc53a5477aed032335bdc1c5d7e_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/3085ebc53a5477aed032335bdc1c5d7e_l.png",
      "lat": 43.467701,
      "lng": 143.742721
    },
    {
      "id": "hokkaido-191",
      "descId": "191",
      "city": "本別町",
      "cityEn": "Honbetsu",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/c196a6a082f5b38bd76fb1a6acb8b999_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/c196a6a082f5b38bd76fb1a6acb8b999_l.png",
      "lat": 43.125781,
      "lng": 143.613441
    },
    {
      "id": "hokkaido-190",
      "descId": "190",
      "city": "登別市",
      "cityEn": "Noboribetsu",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/171f0782befe20c0ce34ea9cf2a069ef_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/171f0782befe20c0ce34ea9cf2a069ef_l.png",
      "lat": 42.452786,
      "lng": 141.180999
    },
    {
      "id": "hokkaido-189",
      "descId": "189",
      "city": "根室市",
      "cityEn": "Nemuro",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/ef06fc22ce5dae9e3683d8fec4a9f68e_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/ef06fc22ce5dae9e3683d8fec4a9f68e_l.png",
      "lat": 43.335936,
      "lng": 145.598194
    },
    {
      "id": "hokkaido-188",
      "descId": "188",
      "city": "小樽市",
      "cityEn": "Otaru",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/5a324c4217960388cb12d0c412bb2ae5_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/5a324c4217960388cb12d0c412bb2ae5_l.png",
      "lat": 43.195544,
      "lng": 140.998285
    },
    {
      "id": "hokkaido-187",
      "descId": "187",
      "city": "函館市",
      "cityEn": "Hakodate",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/acac72c0b33b4df7f2a735443fc8eacf_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/acac72c0b33b4df7f2a735443fc8eacf_l.png",
      "lat": 41.755926,
      "lng": 140.715684
    },
    {
      "id": "hokkaido-143",
      "descId": "143",
      "city": "剣淵町",
      "cityEn": "Kembuchi",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/130ae2f0d814df1b0a14c36032523a85_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/130ae2f0d814df1b0a14c36032523a85_l.png",
      "lat": 44.1000303,
      "lng": 142.3593096
    },
    {
      "id": "hokkaido-142",
      "descId": "142",
      "city": "上富良野町",
      "cityEn": "Kamifurano",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/333446f14d9d7487fd1051ed1a5564d8_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/333446f14d9d7487fd1051ed1a5564d8_l.png",
      "lat": 43.462246,
      "lng": 142.479068
    },
    {
      "id": "hokkaido-141",
      "descId": "141",
      "city": "三笠市",
      "cityEn": "Mikasa",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/37eb2bacbb680049ab0ce47cd56cb080_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/37eb2bacbb680049ab0ce47cd56cb080_l.png",
      "lat": 43.2613165,
      "lng": 141.9626673
    },
    {
      "id": "hokkaido-140",
      "descId": "140",
      "city": "苫小牧市",
      "cityEn": "Tomakomai",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/d0fd3269d1c6446d47a5d73e39c3273c_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/d0fd3269d1c6446d47a5d73e39c3273c_l.png",
      "lat": 42.635755,
      "lng": 141.61009
    },
    {
      "id": "hokkaido-73",
      "descId": "73",
      "city": "足寄町",
      "cityEn": "Ashoro",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/18709c0795ab510b4759d0a7d51bd645_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/18709c0795ab510b4759d0a7d51bd645_l.png",
      "lat": 43.244229,
      "lng": 143.546753
    },
    {
      "id": "hokkaido-72",
      "descId": "72",
      "city": "新得町",
      "cityEn": "Shintoku",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/0ae31f4e9e07a44469e899c4f8a7c0d1_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/0ae31f4e9e07a44469e899c4f8a7c0d1_l.png",
      "lat": 43.082684,
      "lng": 142.832927
    },
    {
      "id": "hokkaido-71",
      "descId": "71",
      "city": "大空町",
      "cityEn": "Ohzora",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/fdf28d6a85b570757b1a6a6045c05ace_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/fdf28d6a85b570757b1a6a6045c05ace_l.png",
      "lat": 43.915555,
      "lng": 144.17137
    },
    {
      "id": "hokkaido-70",
      "descId": "70",
      "city": "遠軽町",
      "cityEn": "Engaru",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/ea59f21d2187fb600591f5b4843bf63d_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/ea59f21d2187fb600591f5b4843bf63d_l.png",
      "lat": 44.021878,
      "lng": 143.497131
    },
    {
      "id": "hokkaido-69",
      "descId": "69",
      "city": "紋別市",
      "cityEn": "Mombetsu",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/708b89a16446446c4f4b67b89afb40b2_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/708b89a16446446c4f4b67b89afb40b2_l.png",
      "lat": 44.334641,
      "lng": 143.372211
    },
    {
      "id": "hokkaido-68",
      "descId": "68",
      "city": "豊富町",
      "cityEn": "Toyotomi",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/d4e4eb2b9d3e88657aec298b6778c90d_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/d4e4eb2b9d3e88657aec298b6778c90d_l.png",
      "lat": 45.103245,
      "lng": 141.778643
    },
    {
      "id": "hokkaido-67",
      "descId": "67",
      "city": "稚内市",
      "cityEn": "Wakkanai",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/92f6a149a9614bf12a606d2c691f4def_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/92f6a149a9614bf12a606d2c691f4def_l.png",
      "lat": 45.417236,
      "lng": 141.677095
    },
    {
      "id": "hokkaido-66",
      "descId": "66",
      "city": "天塩町",
      "cityEn": "Teshio",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/ad2274e40919a0301047f6e809a040fd_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/ad2274e40919a0301047f6e809a040fd_l.png",
      "lat": 44.88452,
      "lng": 141.74797
    },
    {
      "id": "hokkaido-65",
      "descId": "65",
      "city": "比布町",
      "cityEn": "Pippu",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/f5e2dff8844d9a78c1baca3405a0737b_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/f5e2dff8844d9a78c1baca3405a0737b_l.png",
      "lat": 43.875033,
      "lng": 142.471699
    },
    {
      "id": "hokkaido-64",
      "descId": "64",
      "city": "士別市",
      "cityEn": "Shibetsu",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/c5ca9b484bde47acd0cd18e4c115eb74_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/c5ca9b484bde47acd0cd18e4c115eb74_l.png",
      "lat": 44.175974,
      "lng": 142.392417
    },
    {
      "id": "hokkaido-63",
      "descId": "63",
      "city": "上ノ国町",
      "cityEn": "Kaminokuni",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/835ef4993bfa0a192e0f0fe4a51c13a3_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/835ef4993bfa0a192e0f0fe4a51c13a3_l.png",
      "lat": 41.808398,
      "lng": 140.095409
    },
    {
      "id": "hokkaido-62",
      "descId": "62",
      "city": "森町",
      "cityEn": "Mori",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/7304ef666e025271c5f04399faf2bc07_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/7304ef666e025271c5f04399faf2bc07_l.png",
      "lat": 42.108855,
      "lng": 140.572941
    },
    {
      "id": "hokkaido-61",
      "descId": "61",
      "city": "洞爺湖町",
      "cityEn": "Toyako",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/c9b1ca1743f22f22ec0cc61d901b5dad_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/c9b1ca1743f22f22ec0cc61d901b5dad_l.png",
      "lat": 42.566111,
      "lng": 140.819072
    },
    {
      "id": "hokkaido-60",
      "descId": "60",
      "city": "恵庭市",
      "cityEn": "Eniwa",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/0ade724150fd22b8e25d72508fdfbc91_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/0ade724150fd22b8e25d72508fdfbc91_l.png",
      "lat": 42.897132,
      "lng": 141.585789
    },
    {
      "id": "hokkaido-59",
      "descId": "59",
      "city": "石狩市",
      "cityEn": "Ishikari",
      "prefectureId": "hokkaido",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/9a5bcd8fc9acb25f4bd0f7ad5ed029ee_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/9a5bcd8fc9acb25f4bd0f7ad5ed029ee_l.png",
      "lat": 43.585848,
      "lng": 141.423898
    }
  ],
  "aomori": [
    {
      "id": "aomori-158",
      "descId": "158",
      "city": "階上町",
      "cityEn": "Hashikami",
      "prefectureId": "aomori",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/1723f48f98735fe88693db2547152835_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/1723f48f98735fe88693db2547152835_l.png",
      "lat": 40.458437,
      "lng": 141.608335
    },
    {
      "id": "aomori-157",
      "descId": "157",
      "city": "八戸市",
      "cityEn": "Hachinohe",
      "prefectureId": "aomori",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/980e5418dbdef7582b162d577ad77cf7_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/980e5418dbdef7582b162d577ad77cf7_l.png",
      "lat": 40.537937,
      "lng": 141.558034
    }
  ],
  "iwate": [
    {
      "id": "iwate-467",
      "descId": "467",
      "city": "盛岡市",
      "cityEn": "Morioka",
      "prefectureId": "iwate",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/950280bab6a52375f60a30456007e6e9_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/950280bab6a52375f60a30456007e6e9_l.png",
      "lat": 39.694005,
      "lng": 141.128421
    },
    {
      "id": "iwate-466",
      "descId": "466",
      "city": "金ケ崎町",
      "cityEn": "Kanegasaki",
      "prefectureId": "iwate",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/bc9b6ce686085c3e074bd69dc23dee60_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/bc9b6ce686085c3e074bd69dc23dee60_l.png",
      "lat": 39.200006,
      "lng": 141.112971
    },
    {
      "id": "iwate-465",
      "descId": "465",
      "city": "矢巾町",
      "cityEn": "Yahaba",
      "prefectureId": "iwate",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/28333d9283ea549934e01301b4fe5b97_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/28333d9283ea549934e01301b4fe5b97_l.png",
      "lat": 39.6135292,
      "lng": 141.1498184
    },
    {
      "id": "iwate-464",
      "descId": "464",
      "city": "雫石町",
      "cityEn": "Shizukuishi",
      "prefectureId": "iwate",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/05aa91a5c54fced8bdf19152189ccd66_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/05aa91a5c54fced8bdf19152189ccd66_l.png",
      "lat": 39.706964,
      "lng": 140.874287
    },
    {
      "id": "iwate-463",
      "descId": "463",
      "city": "奥州市",
      "cityEn": "Oshu",
      "prefectureId": "iwate",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/d769d590f73bfec332de82f0a5dd7d06_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/d769d590f73bfec332de82f0a5dd7d06_l.png",
      "lat": 39.138288,
      "lng": 141.137353
    },
    {
      "id": "iwate-426",
      "descId": "426",
      "city": "葛巻町",
      "cityEn": "Kuzumaki",
      "prefectureId": "iwate",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/e0af9a218a104af4f32e4c65f047155a_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/e0af9a218a104af4f32e4c65f047155a_l.png",
      "lat": 39.984472,
      "lng": 141.339917
    },
    {
      "id": "iwate-398",
      "descId": "398",
      "city": "盛岡市",
      "cityEn": "Morioka",
      "prefectureId": "iwate",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/d0ba56dc0960526c6c25a5e6bfaf3d09_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/d0ba56dc0960526c6c25a5e6bfaf3d09_l.png",
      "lat": 39.846667,
      "lng": 141.173111
    },
    {
      "id": "iwate-397",
      "descId": "397",
      "city": "北上市",
      "cityEn": "Kitakami",
      "prefectureId": "iwate",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/74be692413e89b4fec7143be21b89187_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/74be692413e89b4fec7143be21b89187_l.png",
      "lat": 39.27362,
      "lng": 141.1282
    },
    {
      "id": "iwate-323",
      "descId": "323",
      "city": "北上市",
      "cityEn": "Kitakami",
      "prefectureId": "iwate",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/078ccb34c03eff812d8749fed35e679a_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/078ccb34c03eff812d8749fed35e679a_l.png",
      "lat": 39.281115,
      "lng": 141.122747
    },
    {
      "id": "iwate-299",
      "descId": "299",
      "city": "久慈市",
      "cityEn": "Kuji",
      "prefectureId": "iwate",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/2542a462ffbb774db2a3a9c72fc44239_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/2542a462ffbb774db2a3a9c72fc44239_l.png",
      "lat": 40.225538,
      "lng": 141.781703
    },
    {
      "id": "iwate-270",
      "descId": "270",
      "city": "一戸町",
      "cityEn": "Ichinohe",
      "prefectureId": "iwate",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/f13194f5bef52f5ccefbec9e2a63045d_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/f13194f5bef52f5ccefbec9e2a63045d_l.png",
      "lat": 40.20885,
      "lng": 141.30468
    },
    {
      "id": "iwate-269",
      "descId": "269",
      "city": "九戸村",
      "cityEn": "Kunohe",
      "prefectureId": "iwate",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/4cabd14c034857349d2f7dbfe2c962c8_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/4cabd14c034857349d2f7dbfe2c962c8_l.png",
      "lat": 40.24854,
      "lng": 141.416759
    },
    {
      "id": "iwate-268",
      "descId": "268",
      "city": "軽米町",
      "cityEn": "Karumai",
      "prefectureId": "iwate",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/c1d89eb9977a98ddc9928fcc01679954_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/c1d89eb9977a98ddc9928fcc01679954_l.png",
      "lat": 40.322649,
      "lng": 141.381779
    },
    {
      "id": "iwate-267",
      "descId": "267",
      "city": "平泉町",
      "cityEn": "Hiraizumi",
      "prefectureId": "iwate",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/8836400faac2d8e8a399cbb3d4486759_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/8836400faac2d8e8a399cbb3d4486759_l.png",
      "lat": 38.986635,
      "lng": 141.108167
    },
    {
      "id": "iwate-266",
      "descId": "266",
      "city": "西和賀町",
      "cityEn": "Nishiwaga",
      "prefectureId": "iwate",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/ad2314607356eb76b53f042d0d0c789e_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/ad2314607356eb76b53f042d0d0c789e_l.png",
      "lat": 39.31446,
      "lng": 140.77649
    },
    {
      "id": "iwate-265",
      "descId": "265",
      "city": "紫波町",
      "cityEn": "Shiwa",
      "prefectureId": "iwate",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/a6b1f66c93b0ccde014798e169a62ab7_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/a6b1f66c93b0ccde014798e169a62ab7_l.png",
      "lat": 39.554641,
      "lng": 141.158293
    },
    {
      "id": "iwate-264",
      "descId": "264",
      "city": "岩手町",
      "cityEn": "Iwate",
      "prefectureId": "iwate",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/ae475fe4a3bc02e9f2c71b5b530bdec9_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/ae475fe4a3bc02e9f2c71b5b530bdec9_l.png",
      "lat": 39.968579,
      "lng": 141.213736
    },
    {
      "id": "iwate-263",
      "descId": "263",
      "city": "滝沢市",
      "cityEn": "Takizawa",
      "prefectureId": "iwate",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/2490baa3ed8a260be964d24128fd0154_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/2490baa3ed8a260be964d24128fd0154_l.png",
      "lat": 39.734,
      "lng": 141.07829
    },
    {
      "id": "iwate-262",
      "descId": "262",
      "city": "八幡平市",
      "cityEn": "Hachimantai",
      "prefectureId": "iwate",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/ceed9f9a751f47fe1f935b99da1e094e_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/ceed9f9a751f47fe1f935b99da1e094e_l.png",
      "lat": 39.87958,
      "lng": 141.099388
    },
    {
      "id": "iwate-261",
      "descId": "261",
      "city": "二戸市",
      "cityEn": "Ninohe",
      "prefectureId": "iwate",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/ea457a9ac12cd61461471430fa04872e_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/ea457a9ac12cd61461471430fa04872e_l.png",
      "lat": 40.320335,
      "lng": 141.318849
    },
    {
      "id": "iwate-260",
      "descId": "260",
      "city": "一関市",
      "cityEn": "Ichinoseki",
      "prefectureId": "iwate",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/453d04268259621cd2081a81428b81d8_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/453d04268259621cd2081a81428b81d8_l.png",
      "lat": 38.98958,
      "lng": 141.25527
    },
    {
      "id": "iwate-259",
      "descId": "259",
      "city": "遠野市",
      "cityEn": "Tono",
      "prefectureId": "iwate",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/863f98fb33b3066069009fc1ca95df3a_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/863f98fb33b3066069009fc1ca95df3a_l.png",
      "lat": 39.330638,
      "lng": 141.528872
    },
    {
      "id": "iwate-258",
      "descId": "258",
      "city": "花巻市",
      "cityEn": "Hanamaki",
      "prefectureId": "iwate",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/17c410916387ddddbd7f807b04947683_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/17c410916387ddddbd7f807b04947683_l.png",
      "lat": 39.392034,
      "lng": 141.11169
    },
    {
      "id": "iwate-22",
      "descId": "22",
      "city": "住田町",
      "cityEn": "Sumita",
      "prefectureId": "iwate",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/83d5c100e0ee6372bd16490dbc67fa5d_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/83d5c100e0ee6372bd16490dbc67fa5d_l.png",
      "lat": 39.242903,
      "lng": 141.68432
    },
    {
      "id": "iwate-21",
      "descId": "21",
      "city": "陸前高田市",
      "cityEn": "Rikuzentakata",
      "prefectureId": "iwate",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/b48f36c2ea4948e57d737a055d5fe47d_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/b48f36c2ea4948e57d737a055d5fe47d_l.png",
      "lat": 39.01675,
      "lng": 141.628694
    },
    {
      "id": "iwate-20",
      "descId": "20",
      "city": "大船渡市",
      "cityEn": "Ofunato",
      "prefectureId": "iwate",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/f7c29ccbcee1c86abe67c6c5df162231_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/f7c29ccbcee1c86abe67c6c5df162231_l.png",
      "lat": 39.085906,
      "lng": 141.710256
    },
    {
      "id": "iwate-19",
      "descId": "19",
      "city": "釜石市",
      "cityEn": "Kamaishi",
      "prefectureId": "iwate",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/ef0d3f35693fea34981a2a6c5e14104f_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/ef0d3f35693fea34981a2a6c5e14104f_l.png",
      "lat": 39.326865,
      "lng": 141.887862
    },
    {
      "id": "iwate-18",
      "descId": "18",
      "city": "大槌町",
      "cityEn": "Otsuchi",
      "prefectureId": "iwate",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/1500f5e64d9158b2504bff2a8b9874da_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/1500f5e64d9158b2504bff2a8b9874da_l.png",
      "lat": 39.357255,
      "lng": 141.90316
    },
    {
      "id": "iwate-17",
      "descId": "17",
      "city": "山田町",
      "cityEn": "Yamada",
      "prefectureId": "iwate",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/54a462f0357b55fb5dfcac3067901572_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/54a462f0357b55fb5dfcac3067901572_l.png",
      "lat": 39.464186,
      "lng": 141.951043
    },
    {
      "id": "iwate-16",
      "descId": "16",
      "city": "宮古市",
      "cityEn": "Miyako",
      "prefectureId": "iwate",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/3de728b1129d289ee8a8cfdc453d1beb_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/3de728b1129d289ee8a8cfdc453d1beb_l.png",
      "lat": 39.639471,
      "lng": 141.969701
    },
    {
      "id": "iwate-15",
      "descId": "15",
      "city": "田野畑村",
      "cityEn": "Tanohata",
      "prefectureId": "iwate",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/9a02cf6fca246847485b2f0e17e2088a_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/9a02cf6fca246847485b2f0e17e2088a_l.png",
      "lat": 39.916682,
      "lng": 141.938688
    },
    {
      "id": "iwate-14",
      "descId": "14",
      "city": "岩泉町",
      "cityEn": "Iwaizumi",
      "prefectureId": "iwate",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/fd8ca30f4138a318860f226d8c6c99fc_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/fd8ca30f4138a318860f226d8c6c99fc_l.png",
      "lat": 39.86044,
      "lng": 141.796532
    },
    {
      "id": "iwate-13",
      "descId": "13",
      "city": "普代村",
      "cityEn": "Fudai",
      "prefectureId": "iwate",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/20fa066c221649e42e0aaf974678c05c_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/20fa066c221649e42e0aaf974678c05c_l.png",
      "lat": 40.002821,
      "lng": 141.885736
    },
    {
      "id": "iwate-12",
      "descId": "12",
      "city": "野田村",
      "cityEn": "Noda",
      "prefectureId": "iwate",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/b30c30e0cdf7b450379ca2f43faa3aac_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/b30c30e0cdf7b450379ca2f43faa3aac_l.png",
      "lat": 40.082726,
      "lng": 141.828678
    },
    {
      "id": "iwate-11",
      "descId": "11",
      "city": "久慈市",
      "cityEn": "Kuji",
      "prefectureId": "iwate",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/ce6927c9ff939ee9cb4936e6480b8333_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/ce6927c9ff939ee9cb4936e6480b8333_l.png",
      "lat": 40.189742,
      "lng": 141.765832
    },
    {
      "id": "iwate-10",
      "descId": "10",
      "city": "洋野町",
      "cityEn": "Hirono",
      "prefectureId": "iwate",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/03c8da68d0400d4eaf0d9bf03d274f98_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/03c8da68d0400d4eaf0d9bf03d274f98_l.png",
      "lat": 40.406101,
      "lng": 141.719531
    }
  ],
  "miyagi": [
    {
      "id": "miyagi-474",
      "descId": "474",
      "city": "仙台市",
      "cityEn": "Sendai",
      "prefectureId": "miyagi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/0dfe96c54ef7f6271d17c9ea3fb43e65_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/0dfe96c54ef7f6271d17c9ea3fb43e65_l.png",
      "lat": 38.182602,
      "lng": 140.956528
    },
    {
      "id": "miyagi-447",
      "descId": "447",
      "city": "加瀬沼公園",
      "cityEn": "Kasenuma Park",
      "prefectureId": "miyagi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/416bb8faf8d814dec25f300d3bf43db9_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/416bb8faf8d814dec25f300d3bf43db9_l.png",
      "lat": 38.311641,
      "lng": 140.983236
    },
    {
      "id": "miyagi-139",
      "descId": "139",
      "city": "美里町",
      "cityEn": "Misato",
      "prefectureId": "miyagi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/e491789809d4a47d823bfe69df54712c_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/e491789809d4a47d823bfe69df54712c_l.png",
      "lat": 38.489061,
      "lng": 141.133053
    },
    {
      "id": "miyagi-138",
      "descId": "138",
      "city": "涌谷町",
      "cityEn": "Wakuya",
      "prefectureId": "miyagi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/f1eb53fbcfe726de54e319a9741feed6_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/f1eb53fbcfe726de54e319a9741feed6_l.png",
      "lat": 38.5392702,
      "lng": 141.1267433
    },
    {
      "id": "miyagi-137",
      "descId": "137",
      "city": "加美町",
      "cityEn": "Kami",
      "prefectureId": "miyagi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/122780b137abcc24c9987cd2842f4e9e_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/122780b137abcc24c9987cd2842f4e9e_l.png",
      "lat": 38.57215,
      "lng": 140.72859
    },
    {
      "id": "miyagi-136",
      "descId": "136",
      "city": "色麻町",
      "cityEn": "shikam",
      "prefectureId": "miyagi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/f153fccd4c39fd161721923ee9a1b1db_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/f153fccd4c39fd161721923ee9a1b1db_l.png",
      "lat": 38.530136,
      "lng": 140.86142
    },
    {
      "id": "miyagi-135",
      "descId": "135",
      "city": "大衡村",
      "cityEn": "Ohira",
      "prefectureId": "miyagi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/a6650f6580df0e0e5debb154e1d26824_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/a6650f6580df0e0e5debb154e1d26824_l.png",
      "lat": 38.46943814,
      "lng": 140.8902292
    },
    {
      "id": "miyagi-134",
      "descId": "134",
      "city": "大郷町",
      "cityEn": "Osato",
      "prefectureId": "miyagi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/e4d64849c631f1c55792c162210f83ca_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/e4d64849c631f1c55792c162210f83ca_l.png",
      "lat": 38.424016,
      "lng": 140.992673
    },
    {
      "id": "miyagi-133",
      "descId": "133",
      "city": "大和町",
      "cityEn": "Taiwa",
      "prefectureId": "miyagi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/6de105f2caa9cb35a27919fff3c43711_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/6de105f2caa9cb35a27919fff3c43711_l.png",
      "lat": 38.437364,
      "lng": 140.885648
    },
    {
      "id": "miyagi-132",
      "descId": "132",
      "city": "丸森町",
      "cityEn": "Marumori",
      "prefectureId": "miyagi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/08419931d6fb8bc4d905064bbf5ac63f_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/08419931d6fb8bc4d905064bbf5ac63f_l.png",
      "lat": 37.913873,
      "lng": 140.762531
    },
    {
      "id": "miyagi-131",
      "descId": "131",
      "city": "川崎町",
      "cityEn": "Kawasaki",
      "prefectureId": "miyagi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/8d71ae197fd04fb3260e7d1a0696b39d_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/8d71ae197fd04fb3260e7d1a0696b39d_l.png",
      "lat": 38.177534,
      "lng": 140.643653
    },
    {
      "id": "miyagi-130",
      "descId": "130",
      "city": "柴田町",
      "cityEn": "Shibata",
      "prefectureId": "miyagi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/db51e7b93287a6d4f02f087a430671d5_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/db51e7b93287a6d4f02f087a430671d5_l.png",
      "lat": 38.059143,
      "lng": 140.768239
    },
    {
      "id": "miyagi-129",
      "descId": "129",
      "city": "村田町",
      "cityEn": "Murata",
      "prefectureId": "miyagi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/a7f0559fbfff47ad99d14e2013f91d5c_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/a7f0559fbfff47ad99d14e2013f91d5c_l.png",
      "lat": 38.119071,
      "lng": 140.717821
    },
    {
      "id": "miyagi-128",
      "descId": "128",
      "city": "大河原町",
      "cityEn": "Ogawara",
      "prefectureId": "miyagi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/b842dfc9874d2e09445e1fc3f38ad9ac_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/b842dfc9874d2e09445e1fc3f38ad9ac_l.png",
      "lat": 38.0485032,
      "lng": 140.738089
    },
    {
      "id": "miyagi-127",
      "descId": "127",
      "city": "七ヶ宿町",
      "cityEn": "Shichikashuku",
      "prefectureId": "miyagi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/e57d517a9ceb4985880cf3dc6d58b304_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/e57d517a9ceb4985880cf3dc6d58b304_l.png",
      "lat": 37.982523,
      "lng": 140.46662
    },
    {
      "id": "miyagi-126",
      "descId": "126",
      "city": "蔵王町",
      "cityEn": "Zao",
      "prefectureId": "miyagi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/e293e09c17892a05563f1b2726ed2877_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/e293e09c17892a05563f1b2726ed2877_l.png",
      "lat": 38.123663,
      "lng": 140.577192
    },
    {
      "id": "miyagi-125",
      "descId": "125",
      "city": "富谷市",
      "cityEn": "Tomiya",
      "prefectureId": "miyagi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/eb65307347f95b410b10f6de91169728_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/eb65307347f95b410b10f6de91169728_l.png",
      "lat": 38.398336,
      "lng": 140.8875
    },
    {
      "id": "miyagi-124",
      "descId": "124",
      "city": "大崎市",
      "cityEn": "Osaki",
      "prefectureId": "miyagi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/60a517309907d70d3227450081b4ca08_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/60a517309907d70d3227450081b4ca08_l.png",
      "lat": 38.571356,
      "lng": 140.967465
    },
    {
      "id": "miyagi-123",
      "descId": "123",
      "city": "栗原市",
      "cityEn": "Kurihara",
      "prefectureId": "miyagi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/495aa4a82e4831df7c4df483ec3818a8_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/495aa4a82e4831df7c4df483ec3818a8_l.png",
      "lat": 38.794479,
      "lng": 140.844403
    },
    {
      "id": "miyagi-122",
      "descId": "122",
      "city": "登米市",
      "cityEn": "Tome",
      "prefectureId": "miyagi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/0276a1166ecab2b87231d3556c765167_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/0276a1166ecab2b87231d3556c765167_l.png",
      "lat": 38.616649,
      "lng": 141.235491
    },
    {
      "id": "miyagi-121",
      "descId": "121",
      "city": "角田市",
      "cityEn": "Kakuda",
      "prefectureId": "miyagi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/8773aebd30abe08aa9ad070610b62d93_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/8773aebd30abe08aa9ad070610b62d93_l.png",
      "lat": 37.968694,
      "lng": 140.807077
    },
    {
      "id": "miyagi-120",
      "descId": "120",
      "city": "白石市",
      "cityEn": "Shiroishi",
      "prefectureId": "miyagi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/d86f9fbdc323ccf8a44a1cc61f14cf5a_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/d86f9fbdc323ccf8a44a1cc61f14cf5a_l.png",
      "lat": 38.002511,
      "lng": 140.61735
    },
    {
      "id": "miyagi-58",
      "descId": "58",
      "city": "山元町",
      "cityEn": "Yamamoto",
      "prefectureId": "miyagi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/da648e1b955aa58ff9d29764c3b14098_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/da648e1b955aa58ff9d29764c3b14098_l.png",
      "lat": 37.923988,
      "lng": 140.900996
    },
    {
      "id": "miyagi-57",
      "descId": "57",
      "city": "亘理町",
      "cityEn": "Watari",
      "prefectureId": "miyagi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/31b568509d0a74bdd6d418b9107da7ea_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/31b568509d0a74bdd6d418b9107da7ea_l.png",
      "lat": 38.04217,
      "lng": 140.915724
    },
    {
      "id": "miyagi-56",
      "descId": "56",
      "city": "岩沼市",
      "cityEn": "Iwanuma",
      "prefectureId": "miyagi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/122c918889a88df0101103652da66ffc_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/122c918889a88df0101103652da66ffc_l.png",
      "lat": 38.105296,
      "lng": 140.866325
    },
    {
      "id": "miyagi-55",
      "descId": "55",
      "city": "名取市",
      "cityEn": "Natori",
      "prefectureId": "miyagi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/b66498501b206eb2ec6a710f114c44bd_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/b66498501b206eb2ec6a710f114c44bd_l.png",
      "lat": 38.17213,
      "lng": 140.954044
    },
    {
      "id": "miyagi-54",
      "descId": "54",
      "city": "仙台市",
      "cityEn": "Sendai",
      "prefectureId": "miyagi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/6e116f60e1990858c1709d0ad7168ed0_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/6e116f60e1990858c1709d0ad7168ed0_l.png",
      "lat": 38.258587,
      "lng": 140.872666
    },
    {
      "id": "miyagi-53",
      "descId": "53",
      "city": "多賀城市",
      "cityEn": "Tagajo",
      "prefectureId": "miyagi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/cf7ba94b9548c4c34a1904f0a45ffd48_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/cf7ba94b9548c4c34a1904f0a45ffd48_l.png",
      "lat": 38.291943,
      "lng": 141.007158
    },
    {
      "id": "miyagi-52",
      "descId": "52",
      "city": "七ヶ浜町",
      "cityEn": "Shichigahama",
      "prefectureId": "miyagi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/75e862975740feba88601a636fc95395_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/75e862975740feba88601a636fc95395_l.png",
      "lat": 38.304315,
      "lng": 141.083342
    },
    {
      "id": "miyagi-51",
      "descId": "51",
      "city": "利府町",
      "cityEn": "Rifu",
      "prefectureId": "miyagi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/c696ccb7c089d73174b41ab9fca770c8_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/c696ccb7c089d73174b41ab9fca770c8_l.png",
      "lat": 38.329512,
      "lng": 140.975248
    },
    {
      "id": "miyagi-50",
      "descId": "50",
      "city": "塩竈市",
      "cityEn": "Shiogama",
      "prefectureId": "miyagi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/879f9a0774db8f5a92918b55779f41de_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/879f9a0774db8f5a92918b55779f41de_l.png",
      "lat": 38.318226,
      "lng": 141.023075
    },
    {
      "id": "miyagi-49",
      "descId": "49",
      "city": "松島町",
      "cityEn": "Matsushima",
      "prefectureId": "miyagi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/21ee5b603bbc503949a5160aac6211c9_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/21ee5b603bbc503949a5160aac6211c9_l.png",
      "lat": 38.368987,
      "lng": 141.061207
    },
    {
      "id": "miyagi-48",
      "descId": "48",
      "city": "東松島市",
      "cityEn": "Higashimatsushima",
      "prefectureId": "miyagi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/c90a0f605f37f87cfefb496c80e8a0dc_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/c90a0f605f37f87cfefb496c80e8a0dc_l.png",
      "lat": 38.379414,
      "lng": 141.15671
    },
    {
      "id": "miyagi-47",
      "descId": "47",
      "city": "石巻市",
      "cityEn": "Ishinomaki",
      "prefectureId": "miyagi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/a6ba2f448a32de55a112c963c72589aa_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/a6ba2f448a32de55a112c963c72589aa_l.png",
      "lat": 38.433844,
      "lng": 141.303041
    },
    {
      "id": "miyagi-46",
      "descId": "46",
      "city": "女川町",
      "cityEn": "Onagawa",
      "prefectureId": "miyagi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/bba07094c6513abf7611f18f842b4c11_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/bba07094c6513abf7611f18f842b4c11_l.png",
      "lat": 38.445695,
      "lng": 141.44623
    },
    {
      "id": "miyagi-45",
      "descId": "45",
      "city": "南三陸町",
      "cityEn": "Minamisanriku",
      "prefectureId": "miyagi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/21dc0ec65a1eb468c86d336ad90ea120_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/21dc0ec65a1eb468c86d336ad90ea120_l.png",
      "lat": 38.717061,
      "lng": 141.52115
    },
    {
      "id": "miyagi-44",
      "descId": "44",
      "city": "気仙沼市",
      "cityEn": "Kesennuma",
      "prefectureId": "miyagi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/196cb20d603ee6eae87932a61344e7e3_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/196cb20d603ee6eae87932a61344e7e3_l.png",
      "lat": 38.905694,
      "lng": 141.574667
    }
  ],
  "akita": [
    {
      "id": "akita-322",
      "descId": "322",
      "city": "仙北市",
      "cityEn": "Senboku",
      "prefectureId": "akita",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/e2e2f0492f0c7751a975073c6ec29d61_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/e2e2f0492f0c7751a975073c6ec29d61_l.png",
      "lat": 39.699992,
      "lng": 140.662631
    },
    {
      "id": "akita-321",
      "descId": "321",
      "city": "鹿角市",
      "cityEn": "Kazuno",
      "prefectureId": "akita",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/01e7a194efa8ccf1f402fd3748124ea6_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/01e7a194efa8ccf1f402fd3748124ea6_l.png",
      "lat": 40.181213,
      "lng": 140.785474
    },
    {
      "id": "akita-320",
      "descId": "320",
      "city": "男鹿市",
      "cityEn": "Oga",
      "prefectureId": "akita",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/f472a2f36f3ef6d95fc671aa272be760_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/f472a2f36f3ef6d95fc671aa272be760_l.png",
      "lat": 39.88201,
      "lng": 139.84772
    },
    {
      "id": "akita-319",
      "descId": "319",
      "city": "横手市",
      "cityEn": "Yokote",
      "prefectureId": "akita",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/77213c59ad91f8db66797f0066bc9b6e_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/77213c59ad91f8db66797f0066bc9b6e_l.png",
      "lat": 39.293561,
      "lng": 140.545941
    },
    {
      "id": "akita-318",
      "descId": "318",
      "city": "秋田市",
      "cityEn": "Akita",
      "prefectureId": "akita",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/75d7b8121f07fb3655b214e5bc97fd10_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/75d7b8121f07fb3655b214e5bc97fd10_l.png",
      "lat": 39.752642,
      "lng": 140.061295
    }
  ],
  "yamagata": [
    {
      "id": "yamagata-403",
      "descId": "403",
      "city": "鶴岡市",
      "cityEn": "Tsuruoka",
      "prefectureId": "yamagata",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/682832fc77641227f5f45a0ba883c392_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/682832fc77641227f5f45a0ba883c392_l.png",
      "lat": 38.721151,
      "lng": 139.684635
    },
    {
      "id": "yamagata-402",
      "descId": "402",
      "city": "小国町",
      "cityEn": "Oguni",
      "prefectureId": "yamagata",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/af8622d0fb9c0dcd8ae7662c09346e5f_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/af8622d0fb9c0dcd8ae7662c09346e5f_l.png",
      "lat": 38.072713,
      "lng": 139.73128
    },
    {
      "id": "yamagata-401",
      "descId": "401",
      "city": "大蔵村",
      "cityEn": "Okura",
      "prefectureId": "yamagata",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/756596314ba4cb80fcddec5aacd40fa7_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/756596314ba4cb80fcddec5aacd40fa7_l.png",
      "lat": 38.611083,
      "lng": 140.169653
    },
    {
      "id": "yamagata-400",
      "descId": "400",
      "city": "寒河江市",
      "cityEn": "Sagae",
      "prefectureId": "yamagata",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/c09268e65f3623546d6818d5ad41f872_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/c09268e65f3623546d6818d5ad41f872_l.png",
      "lat": 38.363842,
      "lng": 140.26637
    },
    {
      "id": "yamagata-399",
      "descId": "399",
      "city": "山形市",
      "cityEn": "Yamagata",
      "prefectureId": "yamagata",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/d83e17697e33d9ed20040ea92890fa38_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/d83e17697e33d9ed20040ea92890fa38_l.png",
      "lat": 38.248477,
      "lng": 140.325854
    }
  ],
  "fukushima": [
    {
      "id": "fukushima-462",
      "descId": "462",
      "city": "大熊町",
      "cityEn": "Okuma",
      "prefectureId": "fukushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/80d89bd52e1edb0d93f1a0cdc06d4757_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/80d89bd52e1edb0d93f1a0cdc06d4757_l.png",
      "lat": 37.4099576,
      "lng": 140.983206
    },
    {
      "id": "fukushima-461",
      "descId": "461",
      "city": "小野町",
      "cityEn": "Ono",
      "prefectureId": "fukushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/8c6ff25fd14baba503e78e26654edac2_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/8c6ff25fd14baba503e78e26654edac2_l.png",
      "lat": 37.279216,
      "lng": 140.633912
    },
    {
      "id": "fukushima-460",
      "descId": "460",
      "city": "浅川町",
      "cityEn": "Asakawa",
      "prefectureId": "fukushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/e2e9702c4eaa677732ff81abb89aa1c7_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/e2e9702c4eaa677732ff81abb89aa1c7_l.png",
      "lat": 37.0802942,
      "lng": 140.4146001
    },
    {
      "id": "fukushima-459",
      "descId": "459",
      "city": "鮫川村",
      "cityEn": "Samegawa",
      "prefectureId": "fukushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/b530a464344989e265f4a1013337ab42_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/b530a464344989e265f4a1013337ab42_l.png",
      "lat": 37.040242,
      "lng": 140.50677
    },
    {
      "id": "fukushima-458",
      "descId": "458",
      "city": "泉崎村",
      "cityEn": "Izumizaki",
      "prefectureId": "fukushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/24d020c935a2ad0492a860df592cb9f2_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/24d020c935a2ad0492a860df592cb9f2_l.png",
      "lat": 37.157384,
      "lng": 140.314605
    },
    {
      "id": "fukushima-457",
      "descId": "457",
      "city": "西会津町",
      "cityEn": "Nishiaizu",
      "prefectureId": "fukushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/e7dc3b5a9cbd1d327172ad540f6c6b08_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/e7dc3b5a9cbd1d327172ad540f6c6b08_l.png",
      "lat": 37.585568,
      "lng": 139.642677
    },
    {
      "id": "fukushima-456",
      "descId": "456",
      "city": "下郷町",
      "cityEn": "Shimogo",
      "prefectureId": "fukushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/5d9b7729ce8952e05c6fdedcbf82dcce_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/5d9b7729ce8952e05c6fdedcbf82dcce_l.png",
      "lat": 37.203534,
      "lng": 139.916146
    },
    {
      "id": "fukushima-455",
      "descId": "455",
      "city": "天栄村",
      "cityEn": "Tenei",
      "prefectureId": "fukushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/fc5fefcde24d0eaf98672ed0dc0e7abd_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/fc5fefcde24d0eaf98672ed0dc0e7abd_l.png",
      "lat": 37.243406,
      "lng": 140.243722
    },
    {
      "id": "fukushima-454",
      "descId": "454",
      "city": "須賀川市",
      "cityEn": "Sukagawa",
      "prefectureId": "fukushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/31610e9bff9bfc8fdc64683e1e1bc75f_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/31610e9bff9bfc8fdc64683e1e1bc75f_l.png",
      "lat": 37.291536,
      "lng": 140.382947
    },
    {
      "id": "fukushima-376",
      "descId": "376",
      "city": "白河市",
      "cityEn": "Shirakawa",
      "prefectureId": "fukushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/9f523b52954278d31137611b04cae08f_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/9f523b52954278d31137611b04cae08f_l.png",
      "lat": 37.1296,
      "lng": 140.212974
    },
    {
      "id": "fukushima-375",
      "descId": "375",
      "city": "平田村",
      "cityEn": "Hirata",
      "prefectureId": "fukushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/1e873a3be5ea9c32be9dc36e0e501f99_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/1e873a3be5ea9c32be9dc36e0e501f99_l.png",
      "lat": 37.262128,
      "lng": 140.547538
    },
    {
      "id": "fukushima-374",
      "descId": "374",
      "city": "広野町",
      "cityEn": "Hirono",
      "prefectureId": "fukushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/472d481f4f93133c377f8e220abc5dca_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/472d481f4f93133c377f8e220abc5dca_l.png",
      "lat": 37.23297,
      "lng": 141.0018
    },
    {
      "id": "fukushima-373",
      "descId": "373",
      "city": "国見町",
      "cityEn": "Kunimi",
      "prefectureId": "fukushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/be6d25642a21e17dac465e21aa08372c_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/be6d25642a21e17dac465e21aa08372c_l.png",
      "lat": 37.872639,
      "lng": 140.546861
    },
    {
      "id": "fukushima-372",
      "descId": "372",
      "city": "湯川村",
      "cityEn": "Yugawa",
      "prefectureId": "fukushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/8365c7bd00bdd8d2c9a777fde01d9a6d_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/8365c7bd00bdd8d2c9a777fde01d9a6d_l.png",
      "lat": 37.55742,
      "lng": 139.862167
    },
    {
      "id": "fukushima-371",
      "descId": "371",
      "city": "棚倉町",
      "cityEn": "Tanagura",
      "prefectureId": "fukushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/72eb2c8e38d7e27e9a4df0d1b68f7458_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/72eb2c8e38d7e27e9a4df0d1b68f7458_l.png",
      "lat": 37.029237,
      "lng": 140.387151
    },
    {
      "id": "fukushima-370",
      "descId": "370",
      "city": "鏡石町",
      "cityEn": "Kagamiishi",
      "prefectureId": "fukushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/80227c9271b9281cb486741200d56324_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/80227c9271b9281cb486741200d56324_l.png",
      "lat": 37.251117,
      "lng": 140.347153
    },
    {
      "id": "fukushima-369",
      "descId": "369",
      "city": "会津坂下町",
      "cityEn": "Aizubange",
      "prefectureId": "fukushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/0f579224c6b8b65ba3e6230a35d0401d_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/0f579224c6b8b65ba3e6230a35d0401d_l.png",
      "lat": 37.56046,
      "lng": 139.821186
    },
    {
      "id": "fukushima-287",
      "descId": "287",
      "city": "三春町",
      "cityEn": "Miharu",
      "prefectureId": "fukushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/726c846d91cf52f7516cf1e6401637b7_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/726c846d91cf52f7516cf1e6401637b7_l.png",
      "lat": 37.4433,
      "lng": 140.49124
    },
    {
      "id": "fukushima-286",
      "descId": "286",
      "city": "古殿町",
      "cityEn": "Furudono",
      "prefectureId": "fukushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/2b62ebefd99578ba22804a9f3d8cbd5e_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/2b62ebefd99578ba22804a9f3d8cbd5e_l.png",
      "lat": 37.092891,
      "lng": 140.529308
    },
    {
      "id": "fukushima-285",
      "descId": "285",
      "city": "矢吹町",
      "cityEn": "Yabuki",
      "prefectureId": "fukushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/2602675c5b001db979a74bfda76749aa_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/2602675c5b001db979a74bfda76749aa_l.png",
      "lat": 37.21842,
      "lng": 140.335635
    },
    {
      "id": "fukushima-284",
      "descId": "284",
      "city": "西郷村",
      "cityEn": "Nishigo",
      "prefectureId": "fukushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/1177578c6fc8b006e9b2e53ac8ea99cd_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/1177578c6fc8b006e9b2e53ac8ea99cd_l.png",
      "lat": 37.1399,
      "lng": 140.15467
    },
    {
      "id": "fukushima-283",
      "descId": "283",
      "city": "会津美里町",
      "cityEn": "Aizumisato",
      "prefectureId": "fukushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/0f281a785f667a4ee9bac0d93500476a_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/0f281a785f667a4ee9bac0d93500476a_l.png",
      "lat": 37.455169,
      "lng": 139.840297
    },
    {
      "id": "fukushima-282",
      "descId": "282",
      "city": "猪苗代町",
      "cityEn": "Iwanashiro",
      "prefectureId": "fukushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/2472c4c2415ec4c71ca043ba35fbbd1b_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/2472c4c2415ec4c71ca043ba35fbbd1b_l.png",
      "lat": 37.538088,
      "lng": 140.107569
    },
    {
      "id": "fukushima-281",
      "descId": "281",
      "city": "北塩原村",
      "cityEn": "Kitashiobara",
      "prefectureId": "fukushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/79e3301122aa9216bddd37f23732abff_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/79e3301122aa9216bddd37f23732abff_l.png",
      "lat": 37.656148,
      "lng": 140.089446
    },
    {
      "id": "fukushima-280",
      "descId": "280",
      "city": "伊達市",
      "cityEn": "Date",
      "prefectureId": "fukushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/1e3c96c981ef34d92e733c0ecf2590cb_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/1e3c96c981ef34d92e733c0ecf2590cb_l.png",
      "lat": 37.760799,
      "lng": 140.691402
    },
    {
      "id": "fukushima-279",
      "descId": "279",
      "city": "二本松市",
      "cityEn": "Nihonmatsu",
      "prefectureId": "fukushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/0d3e282f7e5ed43a671c095bc963353b_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/0d3e282f7e5ed43a671c095bc963353b_l.png",
      "lat": 37.593347,
      "lng": 140.464001
    },
    {
      "id": "fukushima-254",
      "descId": "254",
      "city": "飯舘村",
      "cityEn": "Iitate",
      "prefectureId": "fukushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/3260540897d76440bd153d443780999d_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/3260540897d76440bd153d443780999d_l.png",
      "lat": 37.698145,
      "lng": 140.735552
    },
    {
      "id": "fukushima-253",
      "descId": "253",
      "city": "双葉町",
      "cityEn": "Futaba",
      "prefectureId": "fukushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/8d9e484d1f4e4ded757f196708543042_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/8d9e484d1f4e4ded757f196708543042_l.png",
      "lat": 37.45745,
      "lng": 141.02692
    },
    {
      "id": "fukushima-252",
      "descId": "252",
      "city": "昭和村",
      "cityEn": "Showa",
      "prefectureId": "fukushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/6b321ff06f50ac051b7f30760a91a093_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/6b321ff06f50ac051b7f30760a91a093_l.png",
      "lat": 37.325691,
      "lng": 139.630641
    },
    {
      "id": "fukushima-251",
      "descId": "251",
      "city": "柳津町",
      "cityEn": "Yanaizu",
      "prefectureId": "fukushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/d2bf4080f4238cfa64011f8329c35fd1_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/d2bf4080f4238cfa64011f8329c35fd1_l.png",
      "lat": 37.528189,
      "lng": 139.722662
    },
    {
      "id": "fukushima-250",
      "descId": "250",
      "city": "南会津町",
      "cityEn": "Minamiaizu",
      "prefectureId": "fukushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/50c29ca481ea4d2f804361c903447b30_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/50c29ca481ea4d2f804361c903447b30_l.png",
      "lat": 37.2057204,
      "lng": 139.7778739
    },
    {
      "id": "fukushima-249",
      "descId": "249",
      "city": "郡山市",
      "cityEn": "Koriyama",
      "prefectureId": "fukushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/ca3e03abbe191764b6fde926eed1a5da_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/ca3e03abbe191764b6fde926eed1a5da_l.png",
      "lat": 37.396784,
      "lng": 140.35612
    },
    {
      "id": "fukushima-248",
      "descId": "248",
      "city": "会津若松市",
      "cityEn": "Aizuwakamatsu",
      "prefectureId": "fukushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/1adfd8a3e9e1b10828f4e0deefa93853_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/1adfd8a3e9e1b10828f4e0deefa93853_l.png",
      "lat": 37.461098,
      "lng": 139.927545
    },
    {
      "id": "fukushima-247",
      "descId": "247",
      "city": "福島市",
      "cityEn": "Fukushima",
      "prefectureId": "fukushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/51ecc24c889978ded00d42af017a2958_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/51ecc24c889978ded00d42af017a2958_l.png",
      "lat": 37.80441,
      "lng": 140.41091
    },
    {
      "id": "fukushima-96",
      "descId": "96",
      "city": "川内村",
      "cityEn": "Kawauchi",
      "prefectureId": "fukushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/c846e8317054bcfad601d9de4ed1bddb_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/c846e8317054bcfad601d9de4ed1bddb_l.png",
      "lat": 37.329458,
      "lng": 140.82162
    },
    {
      "id": "fukushima-95",
      "descId": "95",
      "city": "田村市",
      "cityEn": "Tamura",
      "prefectureId": "fukushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/482de2cc901ee6970a9196ef63fcc05b_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/482de2cc901ee6970a9196ef63fcc05b_l.png",
      "lat": 37.344423,
      "lng": 140.674289
    },
    {
      "id": "fukushima-94",
      "descId": "94",
      "city": "川俣町",
      "cityEn": "Kawamata",
      "prefectureId": "fukushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/b65e0102732f5ec6a2473bd0372bb6c3_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/b65e0102732f5ec6a2473bd0372bb6c3_l.png",
      "lat": 37.667671,
      "lng": 140.57675
    },
    {
      "id": "fukushima-93",
      "descId": "93",
      "city": "いわき市",
      "cityEn": "Iwaki",
      "prefectureId": "fukushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/8f4823eaabb4acedd31afc1be79c0bd8_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/8f4823eaabb4acedd31afc1be79c0bd8_l.png",
      "lat": 37.1073084,
      "lng": 140.9932743
    },
    {
      "id": "fukushima-92",
      "descId": "92",
      "city": "楢葉町",
      "cityEn": "Naraha",
      "prefectureId": "fukushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/912960b2605434d5780a92ab51dd92b9_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/912960b2605434d5780a92ab51dd92b9_l.png",
      "lat": 37.2501442,
      "lng": 140.9975789
    },
    {
      "id": "fukushima-91",
      "descId": "91",
      "city": "浪江町",
      "cityEn": "Namie",
      "prefectureId": "fukushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/e0030b2398b3c23c69eeb288202d02bb_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/e0030b2398b3c23c69eeb288202d02bb_l.png",
      "lat": 37.496395,
      "lng": 141.000919
    },
    {
      "id": "fukushima-90",
      "descId": "90",
      "city": "南相馬市",
      "cityEn": "Minamisoma",
      "prefectureId": "fukushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/438cf3fd7fda58f2fb64fe9a8cae6d5f_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/438cf3fd7fda58f2fb64fe9a8cae6d5f_l.png",
      "lat": 37.63577,
      "lng": 140.983041
    },
    {
      "id": "fukushima-89",
      "descId": "89",
      "city": "相馬市",
      "cityEn": "Soma",
      "prefectureId": "fukushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/4b56f3842cbe9066c7d01f0c9df96c92_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/4b56f3842cbe9066c7d01f0c9df96c92_l.png",
      "lat": 37.827708,
      "lng": 140.963244
    },
    {
      "id": "fukushima-88",
      "descId": "88",
      "city": "新地町",
      "cityEn": "Shinchi",
      "prefectureId": "fukushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/3551920549897ca17bd2d417b3461b56_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/3551920549897ca17bd2d417b3461b56_l.png",
      "lat": 37.878748,
      "lng": 140.925027
    }
  ],
  "ibaraki": [
    {
      "id": "ibaraki-413",
      "descId": "413",
      "city": "水戸市",
      "cityEn": "Mito",
      "prefectureId": "ibaraki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/223f1b131033a42ab2891fecab366ef0_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/223f1b131033a42ab2891fecab366ef0_l.png",
      "lat": 36.372273,
      "lng": 140.452358
    },
    {
      "id": "ibaraki-412",
      "descId": "412",
      "city": "常陸太田市",
      "cityEn": "Hitachiota",
      "prefectureId": "ibaraki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/22efba09e43fc13bf4834b0f6157cde5_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/22efba09e43fc13bf4834b0f6157cde5_l.png",
      "lat": 36.510672,
      "lng": 140.525632
    },
    {
      "id": "ibaraki-411",
      "descId": "411",
      "city": "つくば市",
      "cityEn": "Tsukuba",
      "prefectureId": "ibaraki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/9849d1409331da248994adbdfce3509b_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/9849d1409331da248994adbdfce3509b_l.png",
      "lat": 36.08581,
      "lng": 140.110839
    },
    {
      "id": "ibaraki-410",
      "descId": "410",
      "city": "筑西市",
      "cityEn": "Chikusei",
      "prefectureId": "ibaraki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/077e657dad03480b92569da298fdd44b_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/077e657dad03480b92569da298fdd44b_l.png",
      "lat": 36.322445,
      "lng": 139.994116
    },
    {
      "id": "ibaraki-409",
      "descId": "409",
      "city": "神栖市",
      "cityEn": "Kamisu",
      "prefectureId": "ibaraki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/b7ce2257a00adad91661a580d6305fd4_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/b7ce2257a00adad91661a580d6305fd4_l.png",
      "lat": 35.897341,
      "lng": 140.649095
    }
  ],
  "tochigi": [
    {
      "id": "tochigi-228",
      "descId": "228",
      "city": "宇都宮市",
      "cityEn": "Utsunomiya",
      "prefectureId": "tochigi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/614ba5f80e044574e4f5fa79677fa37f_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/614ba5f80e044574e4f5fa79677fa37f_l.png",
      "lat": 36.57228,
      "lng": 139.88722
    },
    {
      "id": "tochigi-227",
      "descId": "227",
      "city": "宇都宮市",
      "cityEn": "Utsunomiya",
      "prefectureId": "tochigi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/e3b4858f5d9d3e0dc78c355976453448_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/e3b4858f5d9d3e0dc78c355976453448_l.png",
      "lat": 36.63422,
      "lng": 139.83102
    },
    {
      "id": "tochigi-226",
      "descId": "226",
      "city": "宇都宮市",
      "cityEn": "Utsunomiya",
      "prefectureId": "tochigi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/52fdbecd02d60456608847e86f3e8964_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/52fdbecd02d60456608847e86f3e8964_l.png",
      "lat": 36.56077,
      "lng": 139.909489
    }
  ],
  "saitama": [
    {
      "id": "saitama-213",
      "descId": "213",
      "city": "所沢市",
      "cityEn": "Tokorozawa",
      "prefectureId": "saitama",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/aeaf1d2fff879ae33fca2eb1ba4a69e8_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/aeaf1d2fff879ae33fca2eb1ba4a69e8_l.png",
      "lat": 35.798734,
      "lng": 139.471991
    },
    {
      "id": "saitama-212",
      "descId": "212",
      "city": "所沢市",
      "cityEn": "Tokorozawa",
      "prefectureId": "saitama",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/5296fd3ea597bbc66ac66444cd22cbf3_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/5296fd3ea597bbc66ac66444cd22cbf3_l.png",
      "lat": 35.786887,
      "lng": 139.472881
    },
    {
      "id": "saitama-211",
      "descId": "211",
      "city": "所沢市",
      "cityEn": "Tokorozawa",
      "prefectureId": "saitama",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/f2dfd29ec753fb46d12d81af9736e548_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/f2dfd29ec753fb46d12d81af9736e548_l.png",
      "lat": 35.797482,
      "lng": 139.505528
    }
  ],
  "chiba": [
    {
      "id": "chiba-225",
      "descId": "225",
      "city": "香取市",
      "cityEn": "Katori",
      "prefectureId": "chiba",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/23d6d594e7a3c463148f8a6122377134_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/23d6d594e7a3c463148f8a6122377134_l.png",
      "lat": 35.896204,
      "lng": 140.506419
    },
    {
      "id": "chiba-224",
      "descId": "224",
      "city": "香取市",
      "cityEn": "Katori",
      "prefectureId": "chiba",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/0ca06ae099f30906d35f7061ac70f433_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/0ca06ae099f30906d35f7061ac70f433_l.png",
      "lat": 35.928206,
      "lng": 140.523401
    },
    {
      "id": "chiba-223",
      "descId": "223",
      "city": "香取市",
      "cityEn": "Katori",
      "prefectureId": "chiba",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/e20be7f7c65fda5d7808a88ca8ed6d78_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/e20be7f7c65fda5d7808a88ca8ed6d78_l.png",
      "lat": 35.888376,
      "lng": 140.497568
    },
    {
      "id": "chiba-222",
      "descId": "222",
      "city": "香取市",
      "cityEn": "Katori",
      "prefectureId": "chiba",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/c9284e72a57917ac1347408c2c48b8a7_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/c9284e72a57917ac1347408c2c48b8a7_l.png",
      "lat": 35.894417,
      "lng": 140.493902
    }
  ],
  "tokyo": [
    {
      "id": "tokyo-448",
      "descId": "448",
      "city": "ポケパーク カントー",
      "cityEn": "PokéPark KANTO",
      "prefectureId": "tokyo",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/174a9314ce4371b180c70d3f43232c4e_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/174a9314ce4371b180c70d3f43232c4e_l.png",
      "lat": 35.62637,
      "lng": 139.521513
    },
    {
      "id": "tokyo-173",
      "descId": "173",
      "city": "台東区上野",
      "cityEn": "Ueno",
      "prefectureId": "tokyo",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/eb25062c31cfbbbf2e120451b3b76492_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/eb25062c31cfbbbf2e120451b3b76492_l.png",
      "lat": 35.717715,
      "lng": 139.775397
    },
    {
      "id": "tokyo-172",
      "descId": "172",
      "city": "台東区上野",
      "cityEn": "Ueno",
      "prefectureId": "tokyo",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/461c1ae602ab3848aaa395fd03e5fa00_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/461c1ae602ab3848aaa395fd03e5fa00_l.png",
      "lat": 35.71681,
      "lng": 139.776399
    },
    {
      "id": "tokyo-156",
      "descId": "156",
      "city": "小笠原村",
      "cityEn": "Ogasawara",
      "prefectureId": "tokyo",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/e7ddf7adbf8b01ad1e4c6ffd6c931352_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/e7ddf7adbf8b01ad1e4c6ffd6c931352_l.png",
      "lat": 27.09448,
      "lng": 142.19235
    },
    {
      "id": "tokyo-155",
      "descId": "155",
      "city": "小笠原村",
      "cityEn": "Ogasawara",
      "prefectureId": "tokyo",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/a0a9f2d7186f56fedadabc010c395e83_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/a0a9f2d7186f56fedadabc010c395e83_l.png",
      "lat": 27.094596,
      "lng": 142.192781
    },
    {
      "id": "tokyo-154",
      "descId": "154",
      "city": "小笠原村",
      "cityEn": "Ogasawara",
      "prefectureId": "tokyo",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/12cfb1b31e8a73d64c0467c702e420f7_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/12cfb1b31e8a73d64c0467c702e420f7_l.png",
      "lat": 27.094708,
      "lng": 142.193279
    },
    {
      "id": "tokyo-153",
      "descId": "153",
      "city": "小笠原村",
      "cityEn": "Ogasawara",
      "prefectureId": "tokyo",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/f8bada1702ac9b24058746e324095bac_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/f8bada1702ac9b24058746e324095bac_l.png",
      "lat": 27.094863,
      "lng": 142.194033
    },
    {
      "id": "tokyo-103",
      "descId": "103",
      "city": "町田市",
      "cityEn": "Machida",
      "prefectureId": "tokyo",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/5ad8fe31b6a39f7b0d1dcbc4d366b54b_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/5ad8fe31b6a39f7b0d1dcbc4d366b54b_l.png",
      "lat": 35.546713,
      "lng": 139.45398
    },
    {
      "id": "tokyo-102",
      "descId": "102",
      "city": "町田市",
      "cityEn": "Machida",
      "prefectureId": "tokyo",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/0a991953b4543cb86f11bc3581aae7d1_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/0a991953b4543cb86f11bc3581aae7d1_l.png",
      "lat": 35.545645,
      "lng": 139.45488
    },
    {
      "id": "tokyo-101",
      "descId": "101",
      "city": "町田市",
      "cityEn": "Machida",
      "prefectureId": "tokyo",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/f440e59f4dc8e8eb3d6dbc063c121101_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/f440e59f4dc8e8eb3d6dbc063c121101_l.png",
      "lat": 35.546111,
      "lng": 139.45436
    },
    {
      "id": "tokyo-100",
      "descId": "100",
      "city": "町田市",
      "cityEn": "Machida",
      "prefectureId": "tokyo",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/6f89f0fea8421c663d939f07d9d3e170_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/6f89f0fea8421c663d939f07d9d3e170_l.png",
      "lat": 35.545302,
      "lng": 139.45501
    },
    {
      "id": "tokyo-99",
      "descId": "99",
      "city": "町田市",
      "cityEn": "Machida",
      "prefectureId": "tokyo",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/5a62f4b93b6a63de11a8f9ff794e48ca_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/5a62f4b93b6a63de11a8f9ff794e48ca_l.png",
      "lat": 35.548171,
      "lng": 139.4513
    },
    {
      "id": "tokyo-98",
      "descId": "98",
      "city": "町田市",
      "cityEn": "Machida",
      "prefectureId": "tokyo",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/4c77c6c7e731ed37ef071ab402d5c1bd_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/4c77c6c7e731ed37ef071ab402d5c1bd_l.png",
      "lat": 35.548108,
      "lng": 139.45034
    }
  ],
  "kanagawa": [
    {
      "id": "kanagawa-314",
      "descId": "314",
      "city": "横浜市",
      "cityEn": "Yokohama",
      "prefectureId": "kanagawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/ac4ed4c5f7ff0704cd3e3bc890c7a217_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/ac4ed4c5f7ff0704cd3e3bc890c7a217_l.png",
      "lat": 35.453319,
      "lng": 139.631688
    },
    {
      "id": "kanagawa-313",
      "descId": "313",
      "city": "横浜市",
      "cityEn": "Yokohama",
      "prefectureId": "kanagawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/3a15037b379ab433f3c857ef5d2535eb_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/3a15037b379ab433f3c857ef5d2535eb_l.png",
      "lat": 35.458698,
      "lng": 139.638331
    },
    {
      "id": "kanagawa-312",
      "descId": "312",
      "city": "横浜市",
      "cityEn": "Yokohama",
      "prefectureId": "kanagawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/680c8828351a0c325e338868e99f0a0a_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/680c8828351a0c325e338868e99f0a0a_l.png",
      "lat": 35.443707,
      "lng": 139.650904
    },
    {
      "id": "kanagawa-311",
      "descId": "311",
      "city": "横浜市",
      "cityEn": "Yokohama",
      "prefectureId": "kanagawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/022cc45747413f97e8b5bf0873da6695_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/022cc45747413f97e8b5bf0873da6695_l.png",
      "lat": 35.451037,
      "lng": 139.644154
    },
    {
      "id": "kanagawa-23",
      "descId": "23",
      "city": "横浜市",
      "cityEn": "Yokohama",
      "prefectureId": "kanagawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/dd60987af1dda49a37486a2cbcb4d407_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/dd60987af1dda49a37486a2cbcb4d407_l.png",
      "lat": 35.451167,
      "lng": 139.631501
    }
  ],
  "niigata": [
    {
      "id": "niigata-147",
      "descId": "147",
      "city": "小千谷市",
      "cityEn": "Ojiya",
      "prefectureId": "niigata",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/1779749989a248a4d80438774bd31c5c_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/1779749989a248a4d80438774bd31c5c_l.png",
      "lat": 37.314301,
      "lng": 138.7835
    },
    {
      "id": "niigata-146",
      "descId": "146",
      "city": "小千谷市",
      "cityEn": "Ojiya",
      "prefectureId": "niigata",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/1eb3ac5b96b69515307e7b8d461b83b7_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/1eb3ac5b96b69515307e7b8d461b83b7_l.png",
      "lat": 37.311028,
      "lng": 138.795653
    },
    {
      "id": "niigata-145",
      "descId": "145",
      "city": "小千谷市",
      "cityEn": "Ojiya",
      "prefectureId": "niigata",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/b8e14abca7704ade92d80850c539bfa8_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/b8e14abca7704ade92d80850c539bfa8_l.png",
      "lat": 37.309883,
      "lng": 138.812939
    },
    {
      "id": "niigata-144",
      "descId": "144",
      "city": "小千谷市",
      "cityEn": "Ojiya",
      "prefectureId": "niigata",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/cb0b83a72c4a02d3828408438fe69c79_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/cb0b83a72c4a02d3828408438fe69c79_l.png",
      "lat": 37.314216,
      "lng": 138.794792
    }
  ],
  "toyama": [
    {
      "id": "toyama-277",
      "descId": "277",
      "city": "富山市",
      "cityEn": "Toyama",
      "prefectureId": "toyama",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/6c44395065c204322fb25c9d622810f6_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/6c44395065c204322fb25c9d622810f6_l.png",
      "lat": 36.692325,
      "lng": 137.210281
    },
    {
      "id": "toyama-276",
      "descId": "276",
      "city": "富山市",
      "cityEn": "Toyama",
      "prefectureId": "toyama",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/63bb2eadb08b4706570c5bee8384d345_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/63bb2eadb08b4706570c5bee8384d345_l.png",
      "lat": 36.70987,
      "lng": 137.213161
    },
    {
      "id": "toyama-275",
      "descId": "275",
      "city": "富山市",
      "cityEn": "Toyama",
      "prefectureId": "toyama",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/3d9b3d56b93482869a6a2c7474c4be35_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/3d9b3d56b93482869a6a2c7474c4be35_l.png",
      "lat": 36.715615,
      "lng": 137.164366
    }
  ],
  "ishikawa": [
    {
      "id": "ishikawa-475",
      "descId": "475",
      "city": "輪島市・のと里山空港",
      "cityEn": "Wajima",
      "prefectureId": "ishikawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/ebbdbee7f35498be1af93b5dc2f8e6c2_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/ebbdbee7f35498be1af93b5dc2f8e6c2_l.png",
      "lat": 37.295752,
      "lng": 136.957244
    },
    {
      "id": "ishikawa-473",
      "descId": "473",
      "city": "能登町",
      "cityEn": "Noto",
      "prefectureId": "ishikawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/e839dd22163b193f2e7d8c3db59ee6ec_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/e839dd22163b193f2e7d8c3db59ee6ec_l.png",
      "lat": 37.333975,
      "lng": 137.138718
    },
    {
      "id": "ishikawa-472",
      "descId": "472",
      "city": "穴水町",
      "cityEn": "Anamizu",
      "prefectureId": "ishikawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/87a3fd9365e386e00d23128242ee50b4_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/87a3fd9365e386e00d23128242ee50b4_l.png",
      "lat": 37.228298,
      "lng": 136.905007
    },
    {
      "id": "ishikawa-471",
      "descId": "471",
      "city": "志賀町",
      "cityEn": "Shika",
      "prefectureId": "ishikawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/5a893a52dcdef186d0629ca2c52a7546_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/5a893a52dcdef186d0629ca2c52a7546_l.png",
      "lat": 37.139152,
      "lng": 136.724847
    },
    {
      "id": "ishikawa-470",
      "descId": "470",
      "city": "珠洲市",
      "cityEn": "Suzu",
      "prefectureId": "ishikawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/13e5c3a4028ded1bfa96f4b816bfe631_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/13e5c3a4028ded1bfa96f4b816bfe631_l.png",
      "lat": 37.39454,
      "lng": 137.240367
    },
    {
      "id": "ishikawa-469",
      "descId": "469",
      "city": "輪島市",
      "cityEn": "Wajima",
      "prefectureId": "ishikawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/5bde37f1ca046581e26582ecfca9bdcd_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/5bde37f1ca046581e26582ecfca9bdcd_l.png",
      "lat": 37.388972,
      "lng": 136.90625
    },
    {
      "id": "ishikawa-468",
      "descId": "468",
      "city": "七尾市",
      "cityEn": "Nanao",
      "prefectureId": "ishikawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/f1da1d7cec53987ff936da3fbd11f18f_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/f1da1d7cec53987ff936da3fbd11f18f_l.png",
      "lat": 37.087801,
      "lng": 136.923564
    },
    {
      "id": "ishikawa-301",
      "descId": "301",
      "city": "金沢市",
      "cityEn": "Kanazawa",
      "prefectureId": "ishikawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/c940415d26bf0831bbc369b7616083e1_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/c940415d26bf0831bbc369b7616083e1_l.png",
      "lat": 36.559162,
      "lng": 136.661926
    }
  ],
  "fukui": [
    {
      "id": "fukui-421",
      "descId": "421",
      "city": "越前町",
      "cityEn": "Echizen-cho",
      "prefectureId": "fukui",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/a4b9ed8fd6f982a51e508d614e8bc9c7_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/a4b9ed8fd6f982a51e508d614e8bc9c7_l.png",
      "lat": 35.93468,
      "lng": 136.05872
    },
    {
      "id": "fukui-420",
      "descId": "420",
      "city": "若狭町",
      "cityEn": "Wakasa",
      "prefectureId": "fukui",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/a24ce3b6e6ded0b78634c88d850a1f93_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/a24ce3b6e6ded0b78634c88d850a1f93_l.png",
      "lat": 35.461441,
      "lng": 135.860204
    },
    {
      "id": "fukui-419",
      "descId": "419",
      "city": "鯖江市",
      "cityEn": "Sabae",
      "prefectureId": "fukui",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/602c4f607f16ab68a51dda3da2b63bac_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/602c4f607f16ab68a51dda3da2b63bac_l.png",
      "lat": 35.950098,
      "lng": 136.181116
    },
    {
      "id": "fukui-418",
      "descId": "418",
      "city": "おおい町",
      "cityEn": "Ohi",
      "prefectureId": "fukui",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/bc3a6278d1b847a6c3ee8d6a320303c8_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/bc3a6278d1b847a6c3ee8d6a320303c8_l.png",
      "lat": 35.48179,
      "lng": 135.62838
    },
    {
      "id": "fukui-417",
      "descId": "417",
      "city": "福井市",
      "cityEn": "Fukui",
      "prefectureId": "fukui",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/01f288197426c4ecd10018babaf52ce1_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/01f288197426c4ecd10018babaf52ce1_l.png",
      "lat": 36.061483,
      "lng": 136.223635
    },
    {
      "id": "fukui-416",
      "descId": "416",
      "city": "坂井市",
      "cityEn": "Sakai",
      "prefectureId": "fukui",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/292964dec0cb7ddb638e94dcd4388ad1_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/292964dec0cb7ddb638e94dcd4388ad1_l.png",
      "lat": 36.161806,
      "lng": 136.333313
    },
    {
      "id": "fukui-368",
      "descId": "368",
      "city": "池田町",
      "cityEn": "Ikeda",
      "prefectureId": "fukui",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/9144ea3aa592e063e8c206726ea9a5a1_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/9144ea3aa592e063e8c206726ea9a5a1_l.png",
      "lat": 35.890505,
      "lng": 136.339213
    },
    {
      "id": "fukui-367",
      "descId": "367",
      "city": "小浜市",
      "cityEn": "Obama",
      "prefectureId": "fukui",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/4d9f218970b4bfd3c8d6020a4f155050_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/4d9f218970b4bfd3c8d6020a4f155050_l.png",
      "lat": 35.494981,
      "lng": 135.741761
    },
    {
      "id": "fukui-366",
      "descId": "366",
      "city": "南越前町",
      "cityEn": "Minami Echizen",
      "prefectureId": "fukui",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/9dcb25b385c233d8d26af0040a30d329_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/9dcb25b385c233d8d26af0040a30d329_l.png",
      "lat": 35.831454,
      "lng": 136.201365
    },
    {
      "id": "fukui-365",
      "descId": "365",
      "city": "敦賀市",
      "cityEn": "Tsuruga",
      "prefectureId": "fukui",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/f25d208e515596f3044c613f8c221a7d_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/f25d208e515596f3044c613f8c221a7d_l.png",
      "lat": 35.661865,
      "lng": 136.074281
    },
    {
      "id": "fukui-364",
      "descId": "364",
      "city": "大野市",
      "cityEn": "Ono",
      "prefectureId": "fukui",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/4004f0ce0f42a5ef7a83d3a2e31c2849_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/4004f0ce0f42a5ef7a83d3a2e31c2849_l.png",
      "lat": 35.9845016,
      "lng": 136.4859314
    },
    {
      "id": "fukui-341",
      "descId": "341",
      "city": "美浜町",
      "cityEn": "Mihama",
      "prefectureId": "fukui",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/aa96cff87252e9d15d1050c3dfdb32b9_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/aa96cff87252e9d15d1050c3dfdb32b9_l.png",
      "lat": 35.604507,
      "lng": 135.936876
    },
    {
      "id": "fukui-340",
      "descId": "340",
      "city": "高浜町",
      "cityEn": "Takahama",
      "prefectureId": "fukui",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/40a7836c54804faf50d4fec9edf7b2cf_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/40a7836c54804faf50d4fec9edf7b2cf_l.png",
      "lat": 35.492951,
      "lng": 135.54556
    },
    {
      "id": "fukui-339",
      "descId": "339",
      "city": "永平寺町",
      "cityEn": "Eiheiji-cho",
      "prefectureId": "fukui",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/82eb8843dce5a6e807c44b4d02cac7f4_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/82eb8843dce5a6e807c44b4d02cac7f4_l.png",
      "lat": 36.079891,
      "lng": 136.399312
    },
    {
      "id": "fukui-338",
      "descId": "338",
      "city": "越前市",
      "cityEn": "Echizen-shi",
      "prefectureId": "fukui",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/ae37578bd4f8d92f43b00865ff9a4592_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/ae37578bd4f8d92f43b00865ff9a4592_l.png",
      "lat": 35.895286,
      "lng": 136.198727
    },
    {
      "id": "fukui-337",
      "descId": "337",
      "city": "あわら市",
      "cityEn": "Awara",
      "prefectureId": "fukui",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/6a7679a424968fb14c2d9d0de5761ac7_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/6a7679a424968fb14c2d9d0de5761ac7_l.png",
      "lat": 36.215613,
      "lng": 136.234226
    },
    {
      "id": "fukui-336",
      "descId": "336",
      "city": "勝山市",
      "cityEn": "Katsuyama",
      "prefectureId": "fukui",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/8911ceb39e882e398c2d3ce2c706e4cd_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/8911ceb39e882e398c2d3ce2c706e4cd_l.png",
      "lat": 36.056787,
      "lng": 136.492007
    }
  ],
  "nagano": [
    {
      "id": "nagano-486",
      "descId": "486",
      "city": "山ノ内町",
      "cityEn": "Yamanouchi",
      "prefectureId": "nagano",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/7fe9b42164a7f9fbaeb73ef90a2790ea_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/7fe9b42164a7f9fbaeb73ef90a2790ea_l.png",
      "lat": 36.74156,
      "lng": 138.41505
    },
    {
      "id": "nagano-485",
      "descId": "485",
      "city": "木祖村",
      "cityEn": "Kiso",
      "prefectureId": "nagano",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/391c9a8f8b3ef650a85d3b05d39e1fd5_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/391c9a8f8b3ef650a85d3b05d39e1fd5_l.png",
      "lat": 35.935271,
      "lng": 137.784559
    },
    {
      "id": "nagano-484",
      "descId": "484",
      "city": "南牧村",
      "cityEn": "Minamimaki",
      "prefectureId": "nagano",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/34adefec6db50af8befe1d98435efa6c_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/34adefec6db50af8befe1d98435efa6c_l.png",
      "lat": 35.955351,
      "lng": 138.474215
    },
    {
      "id": "nagano-483",
      "descId": "483",
      "city": "大町市",
      "cityEn": "Omachi",
      "prefectureId": "nagano",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/b04877fef931bfc2dd4b85cee9758ede_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/b04877fef931bfc2dd4b85cee9758ede_l.png",
      "lat": 36.506032,
      "lng": 137.859702
    },
    {
      "id": "nagano-482",
      "descId": "482",
      "city": "伊那市",
      "cityEn": "Ina",
      "prefectureId": "nagano",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/1cd7407c636a3fdfb846915335153d04_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/1cd7407c636a3fdfb846915335153d04_l.png",
      "lat": 35.882479,
      "lng": 137.919057
    },
    {
      "id": "nagano-481",
      "descId": "481",
      "city": "岡谷市",
      "cityEn": "Okaya",
      "prefectureId": "nagano",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/38dbfc1d6e8a42120c2fd6136f511a97_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/38dbfc1d6e8a42120c2fd6136f511a97_l.png",
      "lat": 36.06648,
      "lng": 138.0511
    }
  ],
  "gifu": [
    {
      "id": "gifu-363",
      "descId": "363",
      "city": "高山市",
      "cityEn": "Takayama",
      "prefectureId": "gifu",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/1a58002d4c3745b11517f8eeae645f82_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/1a58002d4c3745b11517f8eeae645f82_l.png",
      "lat": 36.144911,
      "lng": 137.257235
    },
    {
      "id": "gifu-362",
      "descId": "362",
      "city": "関ケ原町",
      "cityEn": "Sekigahara",
      "prefectureId": "gifu",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/e417eecf891ba9e041c137c544a8b57a_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/e417eecf891ba9e041c137c544a8b57a_l.png",
      "lat": 35.36402,
      "lng": 136.46842
    },
    {
      "id": "gifu-361",
      "descId": "361",
      "city": "関市",
      "cityEn": "Seki",
      "prefectureId": "gifu",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/e2886e52fc662f5a6a64616a5355b250_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/e2886e52fc662f5a6a64616a5355b250_l.png",
      "lat": 35.490472,
      "lng": 136.91225
    },
    {
      "id": "gifu-360",
      "descId": "360",
      "city": "下呂市",
      "cityEn": "Gero",
      "prefectureId": "gifu",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/61f691b88819240129496347dde2c36b_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/61f691b88819240129496347dde2c36b_l.png",
      "lat": 35.807771,
      "lng": 137.242963
    },
    {
      "id": "gifu-359",
      "descId": "359",
      "city": "各務原市",
      "cityEn": "Kakamigahara",
      "prefectureId": "gifu",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/9b3860d131b58b6066c6d4237d0cdb6b_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/9b3860d131b58b6066c6d4237d0cdb6b_l.png",
      "lat": 35.37067,
      "lng": 136.807773
    }
  ],
  "shizuoka": [
    {
      "id": "shizuoka-351",
      "descId": "351",
      "city": "伊豆市",
      "cityEn": "Izu",
      "prefectureId": "shizuoka",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/54b23fd2424c86f488e780a6dd137276_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/54b23fd2424c86f488e780a6dd137276_l.png",
      "lat": 34.970285,
      "lng": 138.92774
    },
    {
      "id": "shizuoka-350",
      "descId": "350",
      "city": "富士市",
      "cityEn": "Fuji",
      "prefectureId": "shizuoka",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/dd4782c37fab19b0621283b4e8253ffa_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/dd4782c37fab19b0621283b4e8253ffa_l.png",
      "lat": 35.161532,
      "lng": 138.617705
    },
    {
      "id": "shizuoka-349",
      "descId": "349",
      "city": "沼津市",
      "cityEn": "Numazu",
      "prefectureId": "shizuoka",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/69a0c3234cff806f768ffdd1db611679_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/69a0c3234cff806f768ffdd1db611679_l.png",
      "lat": 35.081579,
      "lng": 138.854731
    },
    {
      "id": "shizuoka-348",
      "descId": "348",
      "city": "浜松市",
      "cityEn": "Hamamatsu",
      "prefectureId": "shizuoka",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/e7918b84cc982219422e8d442611a8fe_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/e7918b84cc982219422e8d442611a8fe_l.png",
      "lat": 34.704017,
      "lng": 137.732587
    },
    {
      "id": "shizuoka-347",
      "descId": "347",
      "city": "静岡市",
      "cityEn": "Shizuoka",
      "prefectureId": "shizuoka",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/2b3b0900b7cdfb28b04ebb960c115ec9_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/2b3b0900b7cdfb28b04ebb960c115ec9_l.png",
      "lat": 34.977499,
      "lng": 138.382564
    }
  ],
  "aichi": [
    {
      "id": "aichi-408",
      "descId": "408",
      "city": "西尾市",
      "cityEn": "Nishio",
      "prefectureId": "aichi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/b8558e0a74714d9f0519a90cbffb2bd8_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/b8558e0a74714d9f0519a90cbffb2bd8_l.png",
      "lat": 34.867221,
      "lng": 137.048298
    },
    {
      "id": "aichi-407",
      "descId": "407",
      "city": "刈谷市",
      "cityEn": "Kariya",
      "prefectureId": "aichi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/b74fd1d13c5402743ee665a0b7b52adc_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/b74fd1d13c5402743ee665a0b7b52adc_l.png",
      "lat": 35.04095,
      "lng": 137.0481
    },
    {
      "id": "aichi-406",
      "descId": "406",
      "city": "常滑市",
      "cityEn": "Tokoname",
      "prefectureId": "aichi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/9e73d3dac08706213606acfa5508d3f2_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/9e73d3dac08706213606acfa5508d3f2_l.png",
      "lat": 34.88566,
      "lng": 136.8231592
    },
    {
      "id": "aichi-405",
      "descId": "405",
      "city": "瀬戸市",
      "cityEn": "Seto",
      "prefectureId": "aichi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/f11b36b1639166804131d9e464fac8d9_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/f11b36b1639166804131d9e464fac8d9_l.png",
      "lat": 35.2257073,
      "lng": 137.1008385
    },
    {
      "id": "aichi-404",
      "descId": "404",
      "city": "名古屋市",
      "cityEn": "Nagoya",
      "prefectureId": "aichi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/1e8ca4125f1e840c139362bef0854ae6_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/1e8ca4125f1e840c139362bef0854ae6_l.png",
      "lat": 35.1831277,
      "lng": 136.9045981
    },
    {
      "id": "aichi-274",
      "descId": "274",
      "city": "豊橋市",
      "cityEn": "Toyohashi",
      "prefectureId": "aichi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/e42f805cec6afc6610bf3fb60fa1302e_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/e42f805cec6afc6610bf3fb60fa1302e_l.png",
      "lat": 34.72096,
      "lng": 137.429448
    },
    {
      "id": "aichi-273",
      "descId": "273",
      "city": "豊橋市",
      "cityEn": "Toyohashi",
      "prefectureId": "aichi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/81a26e93499f4f7b7646f134dceaf98e_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/81a26e93499f4f7b7646f134dceaf98e_l.png",
      "lat": 34.695901,
      "lng": 137.413953
    },
    {
      "id": "aichi-272",
      "descId": "272",
      "city": "豊橋市",
      "cityEn": "Toyohashi",
      "prefectureId": "aichi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/149f024197e1e9af562412f1f861e87b_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/149f024197e1e9af562412f1f861e87b_l.png",
      "lat": 34.762599,
      "lng": 137.382958
    },
    {
      "id": "aichi-271",
      "descId": "271",
      "city": "豊橋市",
      "cityEn": "Toyohashi",
      "prefectureId": "aichi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/2b38fff3956d1bef47f96d05ce465f6f_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/2b38fff3956d1bef47f96d05ce465f6f_l.png",
      "lat": 34.768863,
      "lng": 137.393843
    }
  ],
  "mie": [
    {
      "id": "mie-415",
      "descId": "415",
      "city": "鈴鹿市",
      "cityEn": "Suzuka",
      "prefectureId": "mie",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/7f1168d3590ddc36c4964cd276776c02_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/7f1168d3590ddc36c4964cd276776c02_l.png",
      "lat": 34.852227,
      "lng": 136.538663
    },
    {
      "id": "mie-414",
      "descId": "414",
      "city": "鳥羽市",
      "cityEn": "Toba",
      "prefectureId": "mie",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/a874515ca910cf36ecbd58a130bbb89d_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/a874515ca910cf36ecbd58a130bbb89d_l.png",
      "lat": 34.490787,
      "lng": 136.844965
    },
    {
      "id": "mie-389",
      "descId": "389",
      "city": "御浜町",
      "cityEn": "Mihama",
      "prefectureId": "mie",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/598c154d6772e0df2a69b8aa78f442ef_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/598c154d6772e0df2a69b8aa78f442ef_l.png",
      "lat": 33.80391,
      "lng": 136.04345
    },
    {
      "id": "mie-388",
      "descId": "388",
      "city": "紀北町",
      "cityEn": "Kihoku",
      "prefectureId": "mie",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/de7b40100ef8846319095eeda71c4089_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/de7b40100ef8846319095eeda71c4089_l.png",
      "lat": 34.216869,
      "lng": 136.346376
    },
    {
      "id": "mie-387",
      "descId": "387",
      "city": "大紀町",
      "cityEn": "Taiki",
      "prefectureId": "mie",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/f435d5251cfe91fa5532d1ab26ca47e4_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/f435d5251cfe91fa5532d1ab26ca47e4_l.png",
      "lat": 34.297193,
      "lng": 136.399061
    },
    {
      "id": "mie-386",
      "descId": "386",
      "city": "菰野町",
      "cityEn": "Komono",
      "prefectureId": "mie",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/db40a95379113f5cdffb84dc02a956e7_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/db40a95379113f5cdffb84dc02a956e7_l.png",
      "lat": 35.019585,
      "lng": 136.506542
    },
    {
      "id": "mie-385",
      "descId": "385",
      "city": "いなべ市",
      "cityEn": "Inabe",
      "prefectureId": "mie",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/17c4234b2ec1619a5801f73f87742e27_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/17c4234b2ec1619a5801f73f87742e27_l.png",
      "lat": 35.15788,
      "lng": 136.51618
    },
    {
      "id": "mie-384",
      "descId": "384",
      "city": "尾鷲市",
      "cityEn": "Owase",
      "prefectureId": "mie",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/a9212a2a3b6d5b9347985b9ccd1beb0e_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/a9212a2a3b6d5b9347985b9ccd1beb0e_l.png",
      "lat": 34.06078,
      "lng": 136.216025
    },
    {
      "id": "mie-383",
      "descId": "383",
      "city": "桑名市",
      "cityEn": "Kuwana",
      "prefectureId": "mie",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/34f38b612591f542f7cde91c92431fe1_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/34f38b612591f542f7cde91c92431fe1_l.png",
      "lat": 35.08304,
      "lng": 136.703006
    },
    {
      "id": "mie-335",
      "descId": "335",
      "city": "南伊勢町",
      "cityEn": "Minamiise",
      "prefectureId": "mie",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/43f237d285100171554ac6f1a0b3d5ae_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/43f237d285100171554ac6f1a0b3d5ae_l.png",
      "lat": 34.268997,
      "lng": 136.54891
    },
    {
      "id": "mie-334",
      "descId": "334",
      "city": "玉城町",
      "cityEn": "Tamashiro",
      "prefectureId": "mie",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/44742a17501610a31bcbed2c84e725ff_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/44742a17501610a31bcbed2c84e725ff_l.png",
      "lat": 34.4678411,
      "lng": 136.5876056
    },
    {
      "id": "mie-333",
      "descId": "333",
      "city": "松阪市",
      "cityEn": "Matsusaka",
      "prefectureId": "mie",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/5fd9256575a991a946731d58af9d9177_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/5fd9256575a991a946731d58af9d9177_l.png",
      "lat": 34.578655,
      "lng": 136.519839
    },
    {
      "id": "mie-332",
      "descId": "332",
      "city": "多気町",
      "cityEn": "Taki",
      "prefectureId": "mie",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/3079076ac9d1bd591d3d9fed6d5490bf_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/3079076ac9d1bd591d3d9fed6d5490bf_l.png",
      "lat": 34.466166,
      "lng": 136.5537339
    },
    {
      "id": "mie-331",
      "descId": "331",
      "city": "川越町",
      "cityEn": "Kawagoe",
      "prefectureId": "mie",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/54d0f6d4443b068cf2328ea975e6f54a_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/54d0f6d4443b068cf2328ea975e6f54a_l.png",
      "lat": 35.01731,
      "lng": 136.659834
    },
    {
      "id": "mie-330",
      "descId": "330",
      "city": "鈴鹿市",
      "cityEn": "Suzuka",
      "prefectureId": "mie",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/5e7b0f7a590d610047c48864ebaa692f_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/5e7b0f7a590d610047c48864ebaa692f_l.png",
      "lat": 34.823065,
      "lng": 136.584609
    },
    {
      "id": "mie-310",
      "descId": "310",
      "city": "東員町",
      "cityEn": "Toin",
      "prefectureId": "mie",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/73080cfd2979568b56409864ffb75c41_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/73080cfd2979568b56409864ffb75c41_l.png",
      "lat": 35.073792,
      "lng": 136.581108
    },
    {
      "id": "mie-309",
      "descId": "309",
      "city": "木曽岬町",
      "cityEn": "Kisosaki",
      "prefectureId": "mie",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/063983c387a9eb6bb1ca4748018fb7df_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/063983c387a9eb6bb1ca4748018fb7df_l.png",
      "lat": 35.0755751,
      "lng": 136.7318048
    },
    {
      "id": "mie-308",
      "descId": "308",
      "city": "名張市",
      "cityEn": "Nabari",
      "prefectureId": "mie",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/be9daa94605e7406128c8aef5c159b77_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/be9daa94605e7406128c8aef5c159b77_l.png",
      "lat": 34.626212,
      "lng": 136.088911
    },
    {
      "id": "mie-297",
      "descId": "297",
      "city": "紀宝町",
      "cityEn": "Kiho",
      "prefectureId": "mie",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/11b856a2714d8732b97c4de3a3eb54b3_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/11b856a2714d8732b97c4de3a3eb54b3_l.png",
      "lat": 33.769742,
      "lng": 136.028632
    },
    {
      "id": "mie-296",
      "descId": "296",
      "city": "度会町",
      "cityEn": "Watarai",
      "prefectureId": "mie",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/08fd5108b2fa7f649a3b4288b51dbb81_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/08fd5108b2fa7f649a3b4288b51dbb81_l.png",
      "lat": 34.4320615,
      "lng": 136.6313249
    },
    {
      "id": "mie-295",
      "descId": "295",
      "city": "大台町",
      "cityEn": "Odai",
      "prefectureId": "mie",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/3d94649159a7193785e0d718e9419ae4_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/3d94649159a7193785e0d718e9419ae4_l.png",
      "lat": 34.356007,
      "lng": 136.34766
    },
    {
      "id": "mie-294",
      "descId": "294",
      "city": "明和町",
      "cityEn": "Meiwa",
      "prefectureId": "mie",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/5d34514d91c421e7eb38d33dd3aa4d5e_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/5d34514d91c421e7eb38d33dd3aa4d5e_l.png",
      "lat": 34.5399661,
      "lng": 136.6184925
    },
    {
      "id": "mie-293",
      "descId": "293",
      "city": "朝日町",
      "cityEn": "Asahi",
      "prefectureId": "mie",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/13bc40cf9c71d3585a1d7250ec072043_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/13bc40cf9c71d3585a1d7250ec072043_l.png",
      "lat": 35.037263,
      "lng": 136.658857
    },
    {
      "id": "mie-292",
      "descId": "292",
      "city": "亀山市",
      "cityEn": "Kameyama",
      "prefectureId": "mie",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/e576fe03cd6caedf734295b94e40b1d3_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/e576fe03cd6caedf734295b94e40b1d3_l.png",
      "lat": 34.8594415,
      "lng": 136.4474608
    },
    {
      "id": "mie-246",
      "descId": "246",
      "city": "伊賀市",
      "cityEn": "Iga",
      "prefectureId": "mie",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/871d23d6e3da74231cd6d0c402b2ec3e_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/871d23d6e3da74231cd6d0c402b2ec3e_l.png",
      "lat": 34.767543,
      "lng": 136.130081
    },
    {
      "id": "mie-245",
      "descId": "245",
      "city": "志摩市",
      "cityEn": "Shima",
      "prefectureId": "mie",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/2ff24b4155bf1e32a81d809c7e8fa0c4_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/2ff24b4155bf1e32a81d809c7e8fa0c4_l.png",
      "lat": 34.275988,
      "lng": 136.898317
    },
    {
      "id": "mie-244",
      "descId": "244",
      "city": "熊野市",
      "cityEn": "Kumano",
      "prefectureId": "mie",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/642d73fc0560c98d9bb2123d61fe178a_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/642d73fc0560c98d9bb2123d61fe178a_l.png",
      "lat": 33.891753,
      "lng": 136.116125
    },
    {
      "id": "mie-243",
      "descId": "243",
      "city": "鳥羽市",
      "cityEn": "Toba",
      "prefectureId": "mie",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/c59edcc8c3f844e2d4b2d50b5b63f70e_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/c59edcc8c3f844e2d4b2d50b5b63f70e_l.png",
      "lat": 34.48691,
      "lng": 136.844825
    },
    {
      "id": "mie-242",
      "descId": "242",
      "city": "伊勢市",
      "cityEn": "Ise",
      "prefectureId": "mie",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/a61f60d4ef8ae9a401cc322fe9953951_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/a61f60d4ef8ae9a401cc322fe9953951_l.png",
      "lat": 34.487787,
      "lng": 136.707097
    },
    {
      "id": "mie-241",
      "descId": "241",
      "city": "四日市市",
      "cityEn": "Yokkaichi",
      "prefectureId": "mie",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/38c81224354dc5eded2c52057638d817_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/38c81224354dc5eded2c52057638d817_l.png",
      "lat": 34.952407,
      "lng": 136.611964
    },
    {
      "id": "mie-240",
      "descId": "240",
      "city": "津市",
      "cityEn": "Tsu",
      "prefectureId": "mie",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/ff1d441d552b5c89cd7254c986834349_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/ff1d441d552b5c89cd7254c986834349_l.png",
      "lat": 34.718493,
      "lng": 136.5108
    }
  ],
  "shiga": [
    {
      "id": "shiga-239",
      "descId": "239",
      "city": "甲賀市",
      "cityEn": "Koka",
      "prefectureId": "shiga",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/723d14bb4afb1187b258976aa5094e0a_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/723d14bb4afb1187b258976aa5094e0a_l.png",
      "lat": 34.900437,
      "lng": 136.229399
    },
    {
      "id": "shiga-238",
      "descId": "238",
      "city": "甲賀市",
      "cityEn": "Koka",
      "prefectureId": "shiga",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/696baacc3630dbd8654850d1fb764e25_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/696baacc3630dbd8654850d1fb764e25_l.png",
      "lat": 34.960528,
      "lng": 136.165168
    },
    {
      "id": "shiga-237",
      "descId": "237",
      "city": "甲賀市",
      "cityEn": "Koka",
      "prefectureId": "shiga",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/675edfc1e37d6a294429a9e35ed48504_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/675edfc1e37d6a294429a9e35ed48504_l.png",
      "lat": 34.919591,
      "lng": 136.170196
    },
    {
      "id": "shiga-105",
      "descId": "105",
      "city": "大津市",
      "cityEn": "Otsu",
      "prefectureId": "shiga",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/d457b0b0d22eb88c9ef87d755c435ee0_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/d457b0b0d22eb88c9ef87d755c435ee0_l.png",
      "lat": 34.9981,
      "lng": 135.8946
    },
    {
      "id": "shiga-104",
      "descId": "104",
      "city": "大津市",
      "cityEn": "Otsu",
      "prefectureId": "shiga",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/e70ea99b7ee9eedea0e19e6cebe5d895_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/e70ea99b7ee9eedea0e19e6cebe5d895_l.png",
      "lat": 35.0102,
      "lng": 135.8699
    }
  ],
  "kyoto": [
    {
      "id": "kyoto-382",
      "descId": "382",
      "city": "ニンテンドーミュージアム",
      "cityEn": "Uji",
      "prefectureId": "kyoto",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/47baa8ef80858e014f938cb01f16ab7b_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/47baa8ef80858e014f938cb01f16ab7b_l.png",
      "lat": 34.892561,
      "lng": 135.784525
    },
    {
      "id": "kyoto-353",
      "descId": "353",
      "city": "宇治市",
      "cityEn": "Uji",
      "prefectureId": "kyoto",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/11fd9be6e92dc0be962656f7c238bef0_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/11fd9be6e92dc0be962656f7c238bef0_l.png",
      "lat": 34.895547,
      "lng": 135.805962
    },
    {
      "id": "kyoto-352",
      "descId": "352",
      "city": "宇治市",
      "cityEn": "Uji",
      "prefectureId": "kyoto",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/ba4d976110fe6bb12c1e0b7c0a312f7b_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/ba4d976110fe6bb12c1e0b7c0a312f7b_l.png",
      "lat": 34.890627,
      "lng": 135.809787
    },
    {
      "id": "kyoto-163",
      "descId": "163",
      "city": "京都市",
      "cityEn": "Kyoto",
      "prefectureId": "kyoto",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/e923d93de75da9471bc1eb6b2504b721_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/e923d93de75da9471bc1eb6b2504b721_l.png",
      "lat": 34.987804,
      "lng": 135.743538
    },
    {
      "id": "kyoto-162",
      "descId": "162",
      "city": "京都市",
      "cityEn": "Kyoto",
      "prefectureId": "kyoto",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/6e0c231cc1175791b00694844dc42904_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/6e0c231cc1175791b00694844dc42904_l.png",
      "lat": 35.014858,
      "lng": 135.782013
    },
    {
      "id": "kyoto-161",
      "descId": "161",
      "city": "京都市",
      "cityEn": "Kyoto",
      "prefectureId": "kyoto",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/b6f13ec6de50c92ec0733c3a0a052095_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/b6f13ec6de50c92ec0733c3a0a052095_l.png",
      "lat": 34.994784,
      "lng": 135.714323
    },
    {
      "id": "kyoto-160",
      "descId": "160",
      "city": "京都市",
      "cityEn": "Kyoto",
      "prefectureId": "kyoto",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/61ed5a9f280a92b6a49269897c80870c_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/61ed5a9f280a92b6a49269897c80870c_l.png",
      "lat": 35.00337,
      "lng": 135.780573
    },
    {
      "id": "kyoto-159",
      "descId": "159",
      "city": "京都市",
      "cityEn": "Kyoto",
      "prefectureId": "kyoto",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/dadd75c86a5e66bf5392ba13716c2dfe_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/dadd75c86a5e66bf5392ba13716c2dfe_l.png",
      "lat": 35.011863,
      "lng": 135.678745
    }
  ],
  "osaka": [
    {
      "id": "osaka-210",
      "descId": "210",
      "city": "東大阪市",
      "cityEn": "Higashiosaka",
      "prefectureId": "osaka",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/c5b049a0ebabbe4653c901d1d7d285a5_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/c5b049a0ebabbe4653c901d1d7d285a5_l.png",
      "lat": 34.669486,
      "lng": 135.630586
    },
    {
      "id": "osaka-209",
      "descId": "209",
      "city": "東大阪市",
      "cityEn": "Higashiosaka",
      "prefectureId": "osaka",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/d39830afa4791086bcb803f16950c7a2_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/d39830afa4791086bcb803f16950c7a2_l.png",
      "lat": 34.667678,
      "lng": 135.626309
    },
    {
      "id": "osaka-208",
      "descId": "208",
      "city": "東大阪市",
      "cityEn": "Higashiosaka",
      "prefectureId": "osaka",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/82bcc43d44a0c0ce158820a770ea8abb_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/82bcc43d44a0c0ce158820a770ea8abb_l.png",
      "lat": 34.680678,
      "lng": 135.650788
    },
    {
      "id": "osaka-207",
      "descId": "207",
      "city": "東大阪市",
      "cityEn": "Higashiosaka",
      "prefectureId": "osaka",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/cd700d469950e929688fda7b763b46b9_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/cd700d469950e929688fda7b763b46b9_l.png",
      "lat": 34.66771,
      "lng": 135.63989
    },
    {
      "id": "osaka-206",
      "descId": "206",
      "city": "東大阪市",
      "cityEn": "Higashiosaka",
      "prefectureId": "osaka",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/8b79e350ab1d04a38f8dffc6baed16e5_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/8b79e350ab1d04a38f8dffc6baed16e5_l.png",
      "lat": 34.679788,
      "lng": 135.601221
    }
  ],
  "hyogo": [
    {
      "id": "hyogo-205",
      "descId": "205",
      "city": "淡路市",
      "cityEn": "Awaji",
      "prefectureId": "hyogo",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/8e5813792f66a65c189ff519bafd76e8_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/8e5813792f66a65c189ff519bafd76e8_l.png",
      "lat": 34.482151,
      "lng": 134.873103
    },
    {
      "id": "hyogo-204",
      "descId": "204",
      "city": "淡路市",
      "cityEn": "Awaji",
      "prefectureId": "hyogo",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/521884db6e67a711689a534f225e5555_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/521884db6e67a711689a534f225e5555_l.png",
      "lat": 34.550436,
      "lng": 134.938094
    },
    {
      "id": "hyogo-203",
      "descId": "203",
      "city": "淡路市",
      "cityEn": "Awaji",
      "prefectureId": "hyogo",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/3b9a7a603fe46a8c9ca44daa6d465c4e_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/3b9a7a603fe46a8c9ca44daa6d465c4e_l.png",
      "lat": 34.601828,
      "lng": 135.009441
    }
  ],
  "nara": [
    {
      "id": "nara-152",
      "descId": "152",
      "city": "斑鳩町",
      "cityEn": "Ikaruga",
      "prefectureId": "nara",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/cf516896b4b7eb0cad8e8e3eeebbc99f_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/cf516896b4b7eb0cad8e8e3eeebbc99f_l.png",
      "lat": 34.60983,
      "lng": 135.73529
    },
    {
      "id": "nara-151",
      "descId": "151",
      "city": "斑鳩町",
      "cityEn": "Ikaruga",
      "prefectureId": "nara",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/d0bfb7bbc2a06d730b47b017a3e77cf7_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/d0bfb7bbc2a06d730b47b017a3e77cf7_l.png",
      "lat": 34.60826,
      "lng": 135.73755
    },
    {
      "id": "nara-150",
      "descId": "150",
      "city": "斑鳩町",
      "cityEn": "Ikaruga",
      "prefectureId": "nara",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/138c801dc7696711d46521e013d6d7c3_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/138c801dc7696711d46521e013d6d7c3_l.png",
      "lat": 34.60827,
      "lng": 135.73769
    },
    {
      "id": "nara-149",
      "descId": "149",
      "city": "斑鳩町",
      "cityEn": "Ikaruga",
      "prefectureId": "nara",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/d3e08e12b17d3ff3befcd5225d3af30d_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/d3e08e12b17d3ff3befcd5225d3af30d_l.png",
      "lat": 34.60474,
      "lng": 135.7376
    },
    {
      "id": "nara-148",
      "descId": "148",
      "city": "斑鳩町",
      "cityEn": "Ikaruga",
      "prefectureId": "nara",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/8c606a972fea1746e45dea9cf3f87c9e_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/8c606a972fea1746e45dea9cf3f87c9e_l.png",
      "lat": 34.60189,
      "lng": 135.73917
    }
  ],
  "wakayama": [
    {
      "id": "wakayama-346",
      "descId": "346",
      "city": "那智勝浦町",
      "cityEn": "Nachikatsuura",
      "prefectureId": "wakayama",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/0647823671ac088cf1c2812389b1b5c9_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/0647823671ac088cf1c2812389b1b5c9_l.png",
      "lat": 33.668973,
      "lng": 135.902917
    },
    {
      "id": "wakayama-345",
      "descId": "345",
      "city": "串本町",
      "cityEn": "Kushimoto",
      "prefectureId": "wakayama",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/5f390e91fa19495f13ca11ded3be39a0_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/5f390e91fa19495f13ca11ded3be39a0_l.png",
      "lat": 33.517997,
      "lng": 135.823074
    },
    {
      "id": "wakayama-344",
      "descId": "344",
      "city": "白浜町",
      "cityEn": "Shirahama",
      "prefectureId": "wakayama",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/03e9a0983c54cc918c63b4db3a0fcc5e_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/03e9a0983c54cc918c63b4db3a0fcc5e_l.png",
      "lat": 33.675779,
      "lng": 135.387056
    },
    {
      "id": "wakayama-343",
      "descId": "343",
      "city": "高野町",
      "cityEn": "Koya",
      "prefectureId": "wakayama",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/1361a905da2d83b5309cd04822de4f32_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/1361a905da2d83b5309cd04822de4f32_l.png",
      "lat": 34.212091,
      "lng": 135.583052
    },
    {
      "id": "wakayama-342",
      "descId": "342",
      "city": "和歌山市",
      "cityEn": "Wakayama",
      "prefectureId": "wakayama",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/e5ee70fdd320e4d6792e7ee9890b2ace_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/e5ee70fdd320e4d6792e7ee9890b2ace_l.png",
      "lat": 34.2300173,
      "lng": 135.171405
    }
  ],
  "tottori": [
    {
      "id": "tottori-300",
      "descId": "300",
      "city": "鳥取市",
      "cityEn": "Tottori",
      "prefectureId": "tottori",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/4ed2700dca6b81175e2041b6015883ad_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/4ed2700dca6b81175e2041b6015883ad_l.png",
      "lat": 35.53395,
      "lng": 134.224478
    },
    {
      "id": "tottori-110",
      "descId": "110",
      "city": "江府町",
      "cityEn": "Kofu",
      "prefectureId": "tottori",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/14cce541fd36605c5e7663e88d87aaa7_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/14cce541fd36605c5e7663e88d87aaa7_l.png",
      "lat": 35.295841,
      "lng": 133.474089
    },
    {
      "id": "tottori-109",
      "descId": "109",
      "city": "日吉津村",
      "cityEn": "Hiezu",
      "prefectureId": "tottori",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/3af8acc5e98898f553ef0a9d3472dd75_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/3af8acc5e98898f553ef0a9d3472dd75_l.png",
      "lat": 35.441126,
      "lng": 133.379578
    },
    {
      "id": "tottori-108",
      "descId": "108",
      "city": "北栄町",
      "cityEn": "Hokuei",
      "prefectureId": "tottori",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/15da1d7d96977b140743c9ceb0c19a56_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/15da1d7d96977b140743c9ceb0c19a56_l.png",
      "lat": 35.49924,
      "lng": 133.81794
    },
    {
      "id": "tottori-107",
      "descId": "107",
      "city": "八頭町",
      "cityEn": "Yazu",
      "prefectureId": "tottori",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/e4cc762f5c45d2e3b1c89fe016cad306_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/e4cc762f5c45d2e3b1c89fe016cad306_l.png",
      "lat": 35.366456,
      "lng": 134.339426
    },
    {
      "id": "tottori-106",
      "descId": "106",
      "city": "智頭町",
      "cityEn": "Chizu",
      "prefectureId": "tottori",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/9124edb433debfc805f8e3dcf81142ef_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/9124edb433debfc805f8e3dcf81142ef_l.png",
      "lat": 35.265428,
      "lng": 134.226103
    },
    {
      "id": "tottori-87",
      "descId": "87",
      "city": "日野町",
      "cityEn": "Hino",
      "prefectureId": "tottori",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/699a59ecb60c1f784eb89c546316a66c_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/699a59ecb60c1f784eb89c546316a66c_l.png",
      "lat": 35.24192,
      "lng": 133.441049
    },
    {
      "id": "tottori-86",
      "descId": "86",
      "city": "日南町",
      "cityEn": "Nichinan",
      "prefectureId": "tottori",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/93d997a517ea711ef84cf02652df9b5d_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/93d997a517ea711ef84cf02652df9b5d_l.png",
      "lat": 35.170524,
      "lng": 133.31094
    },
    {
      "id": "tottori-85",
      "descId": "85",
      "city": "伯耆町",
      "cityEn": "Houki",
      "prefectureId": "tottori",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/c2c30a5636c8110a39aa6c37a46833a9_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/c2c30a5636c8110a39aa6c37a46833a9_l.png",
      "lat": 35.383395,
      "lng": 133.458512
    },
    {
      "id": "tottori-84",
      "descId": "84",
      "city": "南部町",
      "cityEn": "Nanbu",
      "prefectureId": "tottori",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/d3e1aa315a234beed33b5fdf0e57273f_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/d3e1aa315a234beed33b5fdf0e57273f_l.png",
      "lat": 35.347474,
      "lng": 133.423398
    },
    {
      "id": "tottori-83",
      "descId": "83",
      "city": "大山町",
      "cityEn": "Daisen",
      "prefectureId": "tottori",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/9dbcf5bd5c6c3fe0923fbe26eb38b5fd_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/9dbcf5bd5c6c3fe0923fbe26eb38b5fd_l.png",
      "lat": 35.504584,
      "lng": 133.502093
    },
    {
      "id": "tottori-82",
      "descId": "82",
      "city": "琴浦町",
      "cityEn": "Kotoura",
      "prefectureId": "tottori",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/b895c47d2aa420b0ee4f6de752d0b52b_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/b895c47d2aa420b0ee4f6de752d0b52b_l.png",
      "lat": 35.506942,
      "lng": 133.661612
    },
    {
      "id": "tottori-81",
      "descId": "81",
      "city": "湯梨浜町",
      "cityEn": "Yurihama",
      "prefectureId": "tottori",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/97b31d2afb1854865151081ffff89c13_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/97b31d2afb1854865151081ffff89c13_l.png",
      "lat": 35.478166,
      "lng": 133.88401
    },
    {
      "id": "tottori-80",
      "descId": "80",
      "city": "三朝町",
      "cityEn": "Misasa",
      "prefectureId": "tottori",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/fa7745d9d2cf27532ece0df7ae94cdef_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/fa7745d9d2cf27532ece0df7ae94cdef_l.png",
      "lat": 35.409324,
      "lng": 133.894397
    },
    {
      "id": "tottori-79",
      "descId": "79",
      "city": "若桜町",
      "cityEn": "Wakasa",
      "prefectureId": "tottori",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/89266fc70148e3988d2505b8bebec5e7_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/89266fc70148e3988d2505b8bebec5e7_l.png",
      "lat": 35.343951,
      "lng": 134.400345
    },
    {
      "id": "tottori-78",
      "descId": "78",
      "city": "岩美町",
      "cityEn": "Iwami",
      "prefectureId": "tottori",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/abf9db7af4414278a820045649dd91b9_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/abf9db7af4414278a820045649dd91b9_l.png",
      "lat": 35.590938,
      "lng": 134.321556
    },
    {
      "id": "tottori-77",
      "descId": "77",
      "city": "境港市",
      "cityEn": "Sakaiminato",
      "prefectureId": "tottori",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/f6da3dcbdb1a5e3805efeae1aed62a31_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/f6da3dcbdb1a5e3805efeae1aed62a31_l.png",
      "lat": 35.521481,
      "lng": 133.258356
    },
    {
      "id": "tottori-76",
      "descId": "76",
      "city": "倉吉市",
      "cityEn": "Kurayoshi",
      "prefectureId": "tottori",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/5eab25e1ec94bbda4e016964c1e4c0c2_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/5eab25e1ec94bbda4e016964c1e4c0c2_l.png",
      "lat": 35.454272,
      "lng": 133.850116
    },
    {
      "id": "tottori-75",
      "descId": "75",
      "city": "米子市",
      "cityEn": "Yonago",
      "prefectureId": "tottori",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/d41137bea205741d5a7f4cb7e5646494_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/d41137bea205741d5a7f4cb7e5646494_l.png",
      "lat": 35.456258,
      "lng": 133.361525
    },
    {
      "id": "tottori-74",
      "descId": "74",
      "city": "鳥取市",
      "cityEn": "Tottori",
      "prefectureId": "tottori",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/ff3da633c56590b1692d2cc729807dd8_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/ff3da633c56590b1692d2cc729807dd8_l.png",
      "lat": 35.539668,
      "lng": 134.237266
    }
  ],
  "shimane": [
    {
      "id": "shimane-381",
      "descId": "381",
      "city": "隠岐の島町",
      "cityEn": "Okinoshima",
      "prefectureId": "shimane",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/b9231fe3c20c2f21aa3b59fa2e15d2c9_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/b9231fe3c20c2f21aa3b59fa2e15d2c9_l.png",
      "lat": 36.17725248,
      "lng": 133.3302467
    },
    {
      "id": "shimane-380",
      "descId": "380",
      "city": "安来市",
      "cityEn": "Yasugi",
      "prefectureId": "shimane",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/626d7178748566491c9757ab1611d4b6_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/626d7178748566491c9757ab1611d4b6_l.png",
      "lat": 35.428407,
      "lng": 133.259012
    },
    {
      "id": "shimane-379",
      "descId": "379",
      "city": "大田市",
      "cityEn": "Oda",
      "prefectureId": "shimane",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/24ee50a876d722099a40bd736aa424d0_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/24ee50a876d722099a40bd736aa424d0_l.png",
      "lat": 35.145782,
      "lng": 132.413128
    },
    {
      "id": "shimane-378",
      "descId": "378",
      "city": "出雲市",
      "cityEn": "Izumo",
      "prefectureId": "shimane",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/3c9c0b472e5a716415b65f5fd222035c_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/3c9c0b472e5a716415b65f5fd222035c_l.png",
      "lat": 35.4330088,
      "lng": 132.629353
    },
    {
      "id": "shimane-377",
      "descId": "377",
      "city": "浜田市",
      "cityEn": "Hamada",
      "prefectureId": "shimane",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/b394f41c1a92270caadde96879540675_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/b394f41c1a92270caadde96879540675_l.png",
      "lat": 34.88924,
      "lng": 132.07129
    }
  ],
  "okayama": [
    {
      "id": "okayama-197",
      "descId": "197",
      "city": "倉敷市",
      "cityEn": "Kurashiki",
      "prefectureId": "okayama",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/57b32929e283717a3c17bf5694ee5331_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/57b32929e283717a3c17bf5694ee5331_l.png",
      "lat": 34.59829,
      "lng": 133.77029
    },
    {
      "id": "okayama-196",
      "descId": "196",
      "city": "倉敷市",
      "cityEn": "Kurashiki",
      "prefectureId": "okayama",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/bc3943f41c55662b08fff143d35e6001_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/bc3943f41c55662b08fff143d35e6001_l.png",
      "lat": 34.59274,
      "lng": 133.77046
    },
    {
      "id": "okayama-195",
      "descId": "195",
      "city": "倉敷市",
      "cityEn": "Kurashiki",
      "prefectureId": "okayama",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/0fece4439cad84d032b8b5b1abe4bfbe_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/0fece4439cad84d032b8b5b1abe4bfbe_l.png",
      "lat": 34.59556,
      "lng": 133.76888
    },
    {
      "id": "okayama-194",
      "descId": "194",
      "city": "倉敷市",
      "cityEn": "Kurashiki",
      "prefectureId": "okayama",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/12a7f3eb91387a2de15ce4a4d07b76d9_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/12a7f3eb91387a2de15ce4a4d07b76d9_l.png",
      "lat": 34.43427,
      "lng": 133.81388
    }
  ],
  "yamaguchi": [
    {
      "id": "yamaguchi-291",
      "descId": "291",
      "city": "下関市",
      "cityEn": "Shimonoseki",
      "prefectureId": "yamaguchi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/1bf730cea4b0376a673d2aedefc19ce6_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/1bf730cea4b0376a673d2aedefc19ce6_l.png",
      "lat": 33.935457,
      "lng": 130.929705
    },
    {
      "id": "yamaguchi-290",
      "descId": "290",
      "city": "下関市",
      "cityEn": "Shimonoseki",
      "prefectureId": "yamaguchi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/19e9d673ad1d496efdf895ddf8b2dd9e_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/19e9d673ad1d496efdf895ddf8b2dd9e_l.png",
      "lat": 33.934094,
      "lng": 130.930909
    },
    {
      "id": "yamaguchi-289",
      "descId": "289",
      "city": "下関市",
      "cityEn": "Shimonoseki",
      "prefectureId": "yamaguchi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/639984e012e0fb49cb6697784322f5a6_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/639984e012e0fb49cb6697784322f5a6_l.png",
      "lat": 33.954627,
      "lng": 130.9416769
    },
    {
      "id": "yamaguchi-288",
      "descId": "288",
      "city": "下関市",
      "cityEn": "Shimonoseki",
      "prefectureId": "yamaguchi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/45b93f3bf2e0617781b54d098c85e938_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/45b93f3bf2e0617781b54d098c85e938_l.png",
      "lat": 33.958211,
      "lng": 130.948691
    }
  ],
  "tokushima": [
    {
      "id": "tokushima-329",
      "descId": "329",
      "city": "鳴門市",
      "cityEn": "Naruto",
      "prefectureId": "tokushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/b7feef9605334785b629220d93968bd0_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/b7feef9605334785b629220d93968bd0_l.png",
      "lat": 34.168084,
      "lng": 134.616371
    },
    {
      "id": "tokushima-328",
      "descId": "328",
      "city": "鳴門市",
      "cityEn": "Naruto",
      "prefectureId": "tokushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/ec4704ac964ad623fcdc8e707c4cab98_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/ec4704ac964ad623fcdc8e707c4cab98_l.png",
      "lat": 34.181955,
      "lng": 134.601709
    },
    {
      "id": "tokushima-327",
      "descId": "327",
      "city": "鳴門市",
      "cityEn": "Naruto",
      "prefectureId": "tokushima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/db86984d919f6b77c13d3595895d4033_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/db86984d919f6b77c13d3595895d4033_l.png",
      "lat": 34.224106,
      "lng": 134.636196
    }
  ],
  "kagawa": [
    {
      "id": "kagawa-298",
      "descId": "298",
      "city": "綾川町",
      "cityEn": "Ayagawa",
      "prefectureId": "kagawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/1ec34abda217efe011cff081f744466e_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/1ec34abda217efe011cff081f744466e_l.png",
      "lat": 34.247395,
      "lng": 133.9327735
    },
    {
      "id": "kagawa-97",
      "descId": "97",
      "city": "宇多津町",
      "cityEn": "Utazu",
      "prefectureId": "kagawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/46149907aafef8ebbb532d3adedfc0a6_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/46149907aafef8ebbb532d3adedfc0a6_l.png",
      "lat": 34.3134259,
      "lng": 133.8075257
    },
    {
      "id": "kagawa-43",
      "descId": "43",
      "city": "まんのう町",
      "cityEn": "Manno",
      "prefectureId": "kagawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/f7183a39726aa627e14ad95fbeaf881f_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/f7183a39726aa627e14ad95fbeaf881f_l.png",
      "lat": 34.173339,
      "lng": 133.871387
    },
    {
      "id": "kagawa-42",
      "descId": "42",
      "city": "多度津町",
      "cityEn": "Tadotsu",
      "prefectureId": "kagawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/2eeafabec505047777390acd55805848_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/2eeafabec505047777390acd55805848_l.png",
      "lat": 34.272282,
      "lng": 133.757247
    },
    {
      "id": "kagawa-41",
      "descId": "41",
      "city": "琴平町",
      "cityEn": "Kotohira",
      "prefectureId": "kagawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/a657921a86223c0d151c52658fad232b_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/a657921a86223c0d151c52658fad232b_l.png",
      "lat": 34.187735,
      "lng": 133.819896
    },
    {
      "id": "kagawa-40",
      "descId": "40",
      "city": "綾川町",
      "cityEn": "Ayagawa",
      "prefectureId": "kagawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/97364ac57cfec00bae3532e5b86993e1_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/97364ac57cfec00bae3532e5b86993e1_l.png",
      "lat": 34.250399,
      "lng": 133.917073
    },
    {
      "id": "kagawa-39",
      "descId": "39",
      "city": "直島町",
      "cityEn": "Naoshima",
      "prefectureId": "kagawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/a110919f47d4cf2b904ebc498d449df2_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/a110919f47d4cf2b904ebc498d449df2_l.png",
      "lat": 34.455827,
      "lng": 133.975492
    },
    {
      "id": "kagawa-38",
      "descId": "38",
      "city": "三木町",
      "cityEn": "Miki",
      "prefectureId": "kagawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/5b76f33d2939d085b7b8877e4843b710_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/5b76f33d2939d085b7b8877e4843b710_l.png",
      "lat": 34.268586,
      "lng": 134.134567
    },
    {
      "id": "kagawa-37",
      "descId": "37",
      "city": "小豆島町",
      "cityEn": "Shodoshima",
      "prefectureId": "kagawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/e898687780632f41f88293185dc187f9_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/e898687780632f41f88293185dc187f9_l.png",
      "lat": 34.4708542,
      "lng": 134.2358695
    },
    {
      "id": "kagawa-36",
      "descId": "36",
      "city": "土庄町",
      "cityEn": "Tonosho",
      "prefectureId": "kagawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/4ce0a7a8695de3b57c977499c004ae68_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/4ce0a7a8695de3b57c977499c004ae68_l.png",
      "lat": 34.482694,
      "lng": 134.187512
    },
    {
      "id": "kagawa-35",
      "descId": "35",
      "city": "三豊市",
      "cityEn": "Mitoyo",
      "prefectureId": "kagawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/b28655a215e13414ed57362a65800eef_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/b28655a215e13414ed57362a65800eef_l.png",
      "lat": 34.2687992,
      "lng": 133.6322219
    },
    {
      "id": "kagawa-34",
      "descId": "34",
      "city": "東かがわ市",
      "cityEn": "Higashikagawa",
      "prefectureId": "kagawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/55cd911fc9c25e0e8012891daa24946c_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/55cd911fc9c25e0e8012891daa24946c_l.png",
      "lat": 34.251174,
      "lng": 134.333457
    },
    {
      "id": "kagawa-33",
      "descId": "33",
      "city": "さぬき市",
      "cityEn": "Sanuki",
      "prefectureId": "kagawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/2f6edaf36ce1857f7f8942cf0bac2b2c_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/2f6edaf36ce1857f7f8942cf0bac2b2c_l.png",
      "lat": 34.321305,
      "lng": 134.173241
    },
    {
      "id": "kagawa-32",
      "descId": "32",
      "city": "観音寺市",
      "cityEn": "KAN-ONJI",
      "prefectureId": "kagawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/30dbde7fe8d7f8d0cae358eecebfe44b_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/30dbde7fe8d7f8d0cae358eecebfe44b_l.png",
      "lat": 34.125275,
      "lng": 133.655211
    },
    {
      "id": "kagawa-31",
      "descId": "31",
      "city": "善通寺市",
      "cityEn": "Zentsuji",
      "prefectureId": "kagawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/c119928b9d5eaad8001359861af7ccad_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/c119928b9d5eaad8001359861af7ccad_l.png",
      "lat": 34.22531,
      "lng": 133.7773
    },
    {
      "id": "kagawa-30",
      "descId": "30",
      "city": "坂出市",
      "cityEn": "Sakaide",
      "prefectureId": "kagawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/c76924a522f5f4c6be3f7495f67175a3_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/c76924a522f5f4c6be3f7495f67175a3_l.png",
      "lat": 34.312992,
      "lng": 133.856292
    },
    {
      "id": "kagawa-29",
      "descId": "29",
      "city": "丸亀市",
      "cityEn": "Marugame",
      "prefectureId": "kagawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/80456987ca2775b7af3dffce1efbf964_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/80456987ca2775b7af3dffce1efbf964_l.png",
      "lat": 34.292014,
      "lng": 133.793951
    },
    {
      "id": "kagawa-28",
      "descId": "28",
      "city": "高松市",
      "cityEn": "Takamatsu",
      "prefectureId": "kagawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/3f8606c250a83239f508571b1484d584_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/3f8606c250a83239f508571b1484d584_l.png",
      "lat": 34.338888,
      "lng": 134.049052
    }
  ],
  "ehime": [
    {
      "id": "ehime-326",
      "descId": "326",
      "city": "松山市",
      "cityEn": "Matsuyama",
      "prefectureId": "ehime",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/5cfd8d62b32230e7062a428e6a8d5314_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/5cfd8d62b32230e7062a428e6a8d5314_l.png",
      "lat": 33.84426,
      "lng": 132.74078
    },
    {
      "id": "ehime-325",
      "descId": "325",
      "city": "松山市",
      "cityEn": "Matsuyama",
      "prefectureId": "ehime",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/2c463a2dd4f605a830d338c012f560f1_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/2c463a2dd4f605a830d338c012f560f1_l.png",
      "lat": 33.84106,
      "lng": 132.77024
    }
  ],
  "kochi": [
    {
      "id": "kochi-453",
      "descId": "453",
      "city": "仁淀川町",
      "cityEn": "Niyodogawa",
      "prefectureId": "kochi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/3dda90802522e2534fe7342352ec6681_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/3dda90802522e2534fe7342352ec6681_l.png",
      "lat": 33.561104,
      "lng": 133.129433
    },
    {
      "id": "kochi-452",
      "descId": "452",
      "city": "本山町",
      "cityEn": "Motoyama",
      "prefectureId": "kochi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/e877c3d67547cbef003359f4e595c2ed_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/e877c3d67547cbef003359f4e595c2ed_l.png",
      "lat": 33.75877,
      "lng": 133.59448
    },
    {
      "id": "kochi-451",
      "descId": "451",
      "city": "安田町",
      "cityEn": "Yasuda",
      "prefectureId": "kochi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/da28cb8d917d2b68003b00b5e3e7af47_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/da28cb8d917d2b68003b00b5e3e7af47_l.png",
      "lat": 33.47986,
      "lng": 133.99983
    },
    {
      "id": "kochi-450",
      "descId": "450",
      "city": "土佐清水市",
      "cityEn": "Tosashimizu",
      "prefectureId": "kochi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/7132cbb8ec49ce09caf657bdcd671cb7_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/7132cbb8ec49ce09caf657bdcd671cb7_l.png",
      "lat": 32.791142,
      "lng": 132.862367
    },
    {
      "id": "kochi-449",
      "descId": "449",
      "city": "高知市",
      "cityEn": "Kochi",
      "prefectureId": "kochi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/135ebfca7dbcfd5ee42f882ac1a40c00_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/135ebfca7dbcfd5ee42f882ac1a40c00_l.png",
      "lat": 33.56701662,
      "lng": 133.5431367
    },
    {
      "id": "kochi-437",
      "descId": "437",
      "city": "東洋町",
      "cityEn": "Toyo",
      "prefectureId": "kochi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/299ea9629aaed7f41bf1554d2a09b05a_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/299ea9629aaed7f41bf1554d2a09b05a_l.png",
      "lat": 33.543168839356774,
      "lng": 134.29495896722574
    },
    {
      "id": "kochi-436",
      "descId": "436",
      "city": "香南市",
      "cityEn": "Konan",
      "prefectureId": "kochi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/c1359eed647d0b370136b487d0854b70_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/c1359eed647d0b370136b487d0854b70_l.png",
      "lat": 33.534367,
      "lng": 133.75346
    },
    {
      "id": "kochi-435",
      "descId": "435",
      "city": "宿毛市",
      "cityEn": "Sukumo",
      "prefectureId": "kochi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/d0827223105f6648da72d7595907c786_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/d0827223105f6648da72d7595907c786_l.png",
      "lat": 32.915754,
      "lng": 132.712575
    },
    {
      "id": "kochi-434",
      "descId": "434",
      "city": "須崎市",
      "cityEn": "Susaki",
      "prefectureId": "kochi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/c4bd71337c16e241b3b9203a89f970e8_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/c4bd71337c16e241b3b9203a89f970e8_l.png",
      "lat": 33.39238098,
      "lng": 133.2926446
    },
    {
      "id": "kochi-433",
      "descId": "433",
      "city": "安芸市",
      "cityEn": "Aki",
      "prefectureId": "kochi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/551bad185b3f9a9d17c5f6f40d7febfc_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/551bad185b3f9a9d17c5f6f40d7febfc_l.png",
      "lat": 33.5043207,
      "lng": 133.9065445
    },
    {
      "id": "kochi-432",
      "descId": "432",
      "city": "室戸市",
      "cityEn": "Muroto",
      "prefectureId": "kochi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/d9bd03a57b3501b93226b157abadbb2d_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/d9bd03a57b3501b93226b157abadbb2d_l.png",
      "lat": 33.325698,
      "lng": 134.195181
    },
    {
      "id": "kochi-396",
      "descId": "396",
      "city": "三原村",
      "cityEn": "Mihara",
      "prefectureId": "kochi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/207a12127b5a99f94f0fa04d69543a4a_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/207a12127b5a99f94f0fa04d69543a4a_l.png",
      "lat": 32.922536,
      "lng": 132.83982
    },
    {
      "id": "kochi-395",
      "descId": "395",
      "city": "大月町",
      "cityEn": "Otsuki",
      "prefectureId": "kochi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/31ea84ec8f10061d987ef8d7fc15c1da_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/31ea84ec8f10061d987ef8d7fc15c1da_l.png",
      "lat": 32.767739,
      "lng": 132.627259
    },
    {
      "id": "kochi-394",
      "descId": "394",
      "city": "津野町",
      "cityEn": "Tsuno",
      "prefectureId": "kochi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/7fc86d8a52fce05b93042fe1a127342a_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/7fc86d8a52fce05b93042fe1a127342a_l.png",
      "lat": 33.476856,
      "lng": 133.004184
    },
    {
      "id": "kochi-393",
      "descId": "393",
      "city": "日高村",
      "cityEn": "Hidaka",
      "prefectureId": "kochi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/4ac408636042cae5deaff75207b9bf30_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/4ac408636042cae5deaff75207b9bf30_l.png",
      "lat": 33.5335561,
      "lng": 133.3712561
    },
    {
      "id": "kochi-392",
      "descId": "392",
      "city": "大豊町",
      "cityEn": "Otoyo",
      "prefectureId": "kochi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/05938aa1104a2226b71dbc2b1e6de194_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/05938aa1104a2226b71dbc2b1e6de194_l.png",
      "lat": 33.749067,
      "lng": 133.684166
    },
    {
      "id": "kochi-391",
      "descId": "391",
      "city": "奈半利町",
      "cityEn": "Nahari",
      "prefectureId": "kochi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/9326f1ab7b66840ba918c10e7c8478b2_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/9326f1ab7b66840ba918c10e7c8478b2_l.png",
      "lat": 33.425249,
      "lng": 134.017781
    },
    {
      "id": "kochi-390",
      "descId": "390",
      "city": "香美市",
      "cityEn": "Kami",
      "prefectureId": "kochi",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/9b80e14141a8c41fc519beaa1bde69f8_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/9b80e14141a8c41fc519beaa1bde69f8_l.png",
      "lat": 33.695608,
      "lng": 133.874784
    }
  ],
  "fukuoka": [
    {
      "id": "fukuoka-317",
      "descId": "317",
      "city": "太宰府市",
      "cityEn": "Dazaifu",
      "prefectureId": "fukuoka",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/9f18ef1fb249c26b80202eabfd32d469_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/9f18ef1fb249c26b80202eabfd32d469_l.png",
      "lat": 33.505199,
      "lng": 130.516571
    },
    {
      "id": "fukuoka-316",
      "descId": "316",
      "city": "太宰府市",
      "cityEn": "Dazaifu",
      "prefectureId": "fukuoka",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/5cd7a8385c92d8774ca9fcf6577d93eb_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/5cd7a8385c92d8774ca9fcf6577d93eb_l.png",
      "lat": 33.519356,
      "lng": 130.531372
    },
    {
      "id": "fukuoka-315",
      "descId": "315",
      "city": "太宰府市",
      "cityEn": "Dazaifu",
      "prefectureId": "fukuoka",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/82a8e4547e0d8ae6938fc9ca802c90e0_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/82a8e4547e0d8ae6938fc9ca802c90e0_l.png",
      "lat": 33.513335,
      "lng": 130.515174
    },
    {
      "id": "fukuoka-202",
      "descId": "202",
      "city": "北九州市",
      "cityEn": "Kitakyushu",
      "prefectureId": "fukuoka",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/8bc29983cee8593f888c394b13b50b06_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/8bc29983cee8593f888c394b13b50b06_l.png",
      "lat": 33.957206,
      "lng": 130.96161
    },
    {
      "id": "fukuoka-201",
      "descId": "201",
      "city": "北九州市",
      "cityEn": "Kitakyushu",
      "prefectureId": "fukuoka",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/c61b90c00e7cc84c950a7c030240fc4f_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/c61b90c00e7cc84c950a7c030240fc4f_l.png",
      "lat": 33.946285,
      "lng": 130.964119
    },
    {
      "id": "fukuoka-200",
      "descId": "200",
      "city": "北九州市",
      "cityEn": "Kitakyushu",
      "prefectureId": "fukuoka",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/ffa7e3a05b778ee19eb7e1c648fab1d3_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/ffa7e3a05b778ee19eb7e1c648fab1d3_l.png",
      "lat": 33.87192,
      "lng": 130.807892
    },
    {
      "id": "fukuoka-199",
      "descId": "199",
      "city": "北九州市",
      "cityEn": "Kitakyushu",
      "prefectureId": "fukuoka",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/19ddba7b284e5f5bc16a8ac6b62776d1_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/19ddba7b284e5f5bc16a8ac6b62776d1_l.png",
      "lat": 33.890528,
      "lng": 130.884609
    },
    {
      "id": "fukuoka-198",
      "descId": "198",
      "city": "北九州市",
      "cityEn": "Kitakyushu",
      "prefectureId": "fukuoka",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/b13f6216991b853d40f37921b7b1a75c_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/b13f6216991b853d40f37921b7b1a75c_l.png",
      "lat": 33.884982,
      "lng": 130.876213
    }
  ],
  "saga": [
    {
      "id": "saga-257",
      "descId": "257",
      "city": "佐賀市",
      "cityEn": "Saga",
      "prefectureId": "saga",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/64eddebc32fe29d163ab826aea4181c1_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/64eddebc32fe29d163ab826aea4181c1_l.png",
      "lat": 33.24900974,
      "lng": 130.3003128
    },
    {
      "id": "saga-256",
      "descId": "256",
      "city": "佐賀市",
      "cityEn": "Saga",
      "prefectureId": "saga",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/aa70252404971db18df4f2bc527a951c_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/aa70252404971db18df4f2bc527a951c_l.png",
      "lat": 33.24833583,
      "lng": 130.3089011
    },
    {
      "id": "saga-255",
      "descId": "255",
      "city": "佐賀市",
      "cityEn": "Saga",
      "prefectureId": "saga",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/f7760dab549440c477f8b489e1add1ed_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/f7760dab549440c477f8b489e1add1ed_l.png",
      "lat": 33.25075645,
      "lng": 130.2989299
    }
  ],
  "nagasaki": [
    {
      "id": "nagasaki-480",
      "descId": "480",
      "city": "波佐見町",
      "cityEn": "Hasami",
      "prefectureId": "nagasaki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/273a40e9db77b08bc4a8aadd8d8f5d6d_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/273a40e9db77b08bc4a8aadd8d8f5d6d_l.png",
      "lat": 33.141048,
      "lng": 129.910858
    },
    {
      "id": "nagasaki-479",
      "descId": "479",
      "city": "西海市",
      "cityEn": "Saikai",
      "prefectureId": "nagasaki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/4543d040f87f6f6edbc37f69e73abde7_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/4543d040f87f6f6edbc37f69e73abde7_l.png",
      "lat": 33.036768,
      "lng": 129.637485
    },
    {
      "id": "nagasaki-478",
      "descId": "478",
      "city": "五島市",
      "cityEn": "Goto",
      "prefectureId": "nagasaki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/1fd094dccc46d6d5a016ab6fc88a5ebf_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/1fd094dccc46d6d5a016ab6fc88a5ebf_l.png",
      "lat": 32.641898,
      "lng": 128.847861
    },
    {
      "id": "nagasaki-477",
      "descId": "477",
      "city": "対馬市",
      "cityEn": "Tsushima",
      "prefectureId": "nagasaki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/7cab4fbef67520a2aa892e78044ba411_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/7cab4fbef67520a2aa892e78044ba411_l.png",
      "lat": 34.202685,
      "lng": 129.289139
    },
    {
      "id": "nagasaki-476",
      "descId": "476",
      "city": "諫早市",
      "cityEn": "Isahaya",
      "prefectureId": "nagasaki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/9ad3148fd75c57b00c5e66503d73af38_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/9ad3148fd75c57b00c5e66503d73af38_l.png",
      "lat": 32.851951,
      "lng": 130.042015
    },
    {
      "id": "nagasaki-431",
      "descId": "431",
      "city": "佐々町",
      "cityEn": "Saza",
      "prefectureId": "nagasaki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/41ee5c22850c88cabf369c70302bd777_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/41ee5c22850c88cabf369c70302bd777_l.png",
      "lat": 33.254897,
      "lng": 129.6589353
    },
    {
      "id": "nagasaki-430",
      "descId": "430",
      "city": "東彼杵町",
      "cityEn": "Higashisonogi",
      "prefectureId": "nagasaki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/7e0358daa2f0bd5c89903de1a57cecf8_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/7e0358daa2f0bd5c89903de1a57cecf8_l.png",
      "lat": 33.0357304,
      "lng": 129.9194868
    },
    {
      "id": "nagasaki-429",
      "descId": "429",
      "city": "時津町",
      "cityEn": "Togitsu",
      "prefectureId": "nagasaki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/fcac6f042fa67019abd2dca48d815440_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/fcac6f042fa67019abd2dca48d815440_l.png",
      "lat": 32.831977,
      "lng": 129.849052
    },
    {
      "id": "nagasaki-428",
      "descId": "428",
      "city": "壱岐市",
      "cityEn": "Iki",
      "prefectureId": "nagasaki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/e126c5112eda03d677eff9b92cab10cc_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/e126c5112eda03d677eff9b92cab10cc_l.png",
      "lat": 33.81196878,
      "lng": 129.6557033
    },
    {
      "id": "nagasaki-427",
      "descId": "427",
      "city": "島原市",
      "cityEn": "Shimabara",
      "prefectureId": "nagasaki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/9bc84a22210b01d1330da1a3d459e5d8_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/9bc84a22210b01d1330da1a3d459e5d8_l.png",
      "lat": 32.790222,
      "lng": 130.370593
    },
    {
      "id": "nagasaki-358",
      "descId": "358",
      "city": "新上五島町",
      "cityEn": "Shinkamigoto",
      "prefectureId": "nagasaki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/2f09d6ddf8f545c9a622b7365735839f_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/2f09d6ddf8f545c9a622b7365735839f_l.png",
      "lat": 32.986402,
      "lng": 129.112745
    },
    {
      "id": "nagasaki-357",
      "descId": "357",
      "city": "雲仙市",
      "cityEn": "Unzen",
      "prefectureId": "nagasaki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/5b656d359478392214ecfa0fdfbd1cb6_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/5b656d359478392214ecfa0fdfbd1cb6_l.png",
      "lat": 32.74085,
      "lng": 130.261106
    },
    {
      "id": "nagasaki-356",
      "descId": "356",
      "city": "大村市",
      "cityEn": "Omura",
      "prefectureId": "nagasaki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/fd830fce9e6898daa219f632addce1a8_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/fd830fce9e6898daa219f632addce1a8_l.png",
      "lat": 32.933111,
      "lng": 129.958278
    },
    {
      "id": "nagasaki-355",
      "descId": "355",
      "city": "佐世保市",
      "cityEn": "Sasebo",
      "prefectureId": "nagasaki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/6440346e37eff89ad1803987d49c5289_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/6440346e37eff89ad1803987d49c5289_l.png",
      "lat": 33.163987,
      "lng": 129.724169
    },
    {
      "id": "nagasaki-354",
      "descId": "354",
      "city": "長崎市",
      "cityEn": "Nagasaki",
      "prefectureId": "nagasaki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/8a66b9b0f3d34972338794fc1b07dacd_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/8a66b9b0f3d34972338794fc1b07dacd_l.png",
      "lat": 32.753712,
      "lng": 129.86735
    }
  ],
  "miyazaki": [
    {
      "id": "miyazaki-186",
      "descId": "186",
      "city": "五ヶ瀬町",
      "cityEn": "Gokase",
      "prefectureId": "miyazaki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/aa92f7d136b868b5252b1fc6994ce947_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/aa92f7d136b868b5252b1fc6994ce947_l.png",
      "lat": 32.679051,
      "lng": 131.210041
    },
    {
      "id": "miyazaki-185",
      "descId": "185",
      "city": "日之影町",
      "cityEn": "Hinokage",
      "prefectureId": "miyazaki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/dbe8fa0ecdf59974cf1c01b55f7f089b_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/dbe8fa0ecdf59974cf1c01b55f7f089b_l.png",
      "lat": 32.660643,
      "lng": 131.388639
    },
    {
      "id": "miyazaki-184",
      "descId": "184",
      "city": "高千穂町",
      "cityEn": "Takachiho",
      "prefectureId": "miyazaki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/ba1ab8ae9af98b080f9ed1d867cb75c9_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/ba1ab8ae9af98b080f9ed1d867cb75c9_l.png",
      "lat": 32.707748,
      "lng": 131.305889
    },
    {
      "id": "miyazaki-183",
      "descId": "183",
      "city": "椎葉村",
      "cityEn": "Shiiba",
      "prefectureId": "miyazaki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/a612a2a3e3d6d9a6cb7641ce25cfcdb7_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/a612a2a3e3d6d9a6cb7641ce25cfcdb7_l.png",
      "lat": 32.458153,
      "lng": 131.153831
    },
    {
      "id": "miyazaki-182",
      "descId": "182",
      "city": "諸塚村",
      "cityEn": "Morotsuka",
      "prefectureId": "miyazaki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/4214e59f59260308035a93441400b6fa_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/4214e59f59260308035a93441400b6fa_l.png",
      "lat": 32.509811,
      "lng": 131.331498
    },
    {
      "id": "miyazaki-181",
      "descId": "181",
      "city": "西米良村",
      "cityEn": "Nishimera",
      "prefectureId": "miyazaki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/d8eb6198c178641e316d0936fccd06e0_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/d8eb6198c178641e316d0936fccd06e0_l.png",
      "lat": 32.223238,
      "lng": 131.16329
    },
    {
      "id": "miyazaki-180",
      "descId": "180",
      "city": "綾町",
      "cityEn": "Aya",
      "prefectureId": "miyazaki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/ec206a3b8bd4d61296485b207d204370_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/ec206a3b8bd4d61296485b207d204370_l.png",
      "lat": 31.9989753,
      "lng": 131.2537536
    },
    {
      "id": "miyazaki-179",
      "descId": "179",
      "city": "国富町",
      "cityEn": "Kunitomi",
      "prefectureId": "miyazaki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/73fdb713c9cec2bed36f015248b51725_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/73fdb713c9cec2bed36f015248b51725_l.png",
      "lat": 31.988591,
      "lng": 131.321916
    },
    {
      "id": "miyazaki-178",
      "descId": "178",
      "city": "高原町",
      "cityEn": "Takaharu",
      "prefectureId": "miyazaki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/916517348882e6d81c6fd8e163ac8352_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/916517348882e6d81c6fd8e163ac8352_l.png",
      "lat": 31.907234,
      "lng": 130.960187
    },
    {
      "id": "miyazaki-171",
      "descId": "171",
      "city": "美郷町",
      "cityEn": "Misato",
      "prefectureId": "miyazaki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/338c34ed7b70c9a65755b2894a04ecc1_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/338c34ed7b70c9a65755b2894a04ecc1_l.png",
      "lat": 32.431976,
      "lng": 131.467551
    },
    {
      "id": "miyazaki-170",
      "descId": "170",
      "city": "門川町",
      "cityEn": "Kadogawa",
      "prefectureId": "miyazaki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/1d1261134ec64c046aacae63dba74c6f_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/1d1261134ec64c046aacae63dba74c6f_l.png",
      "lat": 32.487021,
      "lng": 131.676733
    },
    {
      "id": "miyazaki-169",
      "descId": "169",
      "city": "都農町",
      "cityEn": "Tsuno",
      "prefectureId": "miyazaki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/249dfc49428f58aff38f37c46131982e_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/249dfc49428f58aff38f37c46131982e_l.png",
      "lat": 32.2609016,
      "lng": 131.5575768
    },
    {
      "id": "miyazaki-168",
      "descId": "168",
      "city": "川南町",
      "cityEn": "Kawaminami",
      "prefectureId": "miyazaki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/3da8c4d33f82dbd65c7092f4080c88ab_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/3da8c4d33f82dbd65c7092f4080c88ab_l.png",
      "lat": 32.191491,
      "lng": 131.528984
    },
    {
      "id": "miyazaki-167",
      "descId": "167",
      "city": "木城町",
      "cityEn": "Kijo",
      "prefectureId": "miyazaki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/dd75e9254b02cf00906b22ece20ed6a2_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/dd75e9254b02cf00906b22ece20ed6a2_l.png",
      "lat": 32.168382,
      "lng": 131.478378
    },
    {
      "id": "miyazaki-166",
      "descId": "166",
      "city": "新富町",
      "cityEn": "Shintomi",
      "prefectureId": "miyazaki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/73c6c49f8aa194dcb52da6808758de16_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/73c6c49f8aa194dcb52da6808758de16_l.png",
      "lat": 32.073902,
      "lng": 131.495719
    },
    {
      "id": "miyazaki-165",
      "descId": "165",
      "city": "高鍋町",
      "cityEn": "Takanabe",
      "prefectureId": "miyazaki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/7020590767375a1d51a3bb6af9b37edf_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/7020590767375a1d51a3bb6af9b37edf_l.png",
      "lat": 32.115956,
      "lng": 131.532841
    },
    {
      "id": "miyazaki-164",
      "descId": "164",
      "city": "三股町",
      "cityEn": "Mimata",
      "prefectureId": "miyazaki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/7e8cdc1e3864f6802fe5c7c531f68074_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/7e8cdc1e3864f6802fe5c7c531f68074_l.png",
      "lat": 31.73375,
      "lng": 131.120309
    },
    {
      "id": "miyazaki-119",
      "descId": "119",
      "city": "えびの市",
      "cityEn": "ebino",
      "prefectureId": "miyazaki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/c66068946bb57f85df1cc9221816f761_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/c66068946bb57f85df1cc9221816f761_l.png",
      "lat": 32.050305,
      "lng": 130.80595
    },
    {
      "id": "miyazaki-118",
      "descId": "118",
      "city": "西都市",
      "cityEn": "Saito",
      "prefectureId": "miyazaki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/40deb7e698a707b7ae456f46634f6a14_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/40deb7e698a707b7ae456f46634f6a14_l.png",
      "lat": 32.106625,
      "lng": 131.404508
    },
    {
      "id": "miyazaki-117",
      "descId": "117",
      "city": "串間市",
      "cityEn": "Kushima",
      "prefectureId": "miyazaki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/eb72ab472d06b001ae7e522937fda3b7_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/eb72ab472d06b001ae7e522937fda3b7_l.png",
      "lat": 31.36627,
      "lng": 131.332809
    },
    {
      "id": "miyazaki-116",
      "descId": "116",
      "city": "日向市",
      "cityEn": "Hyuga",
      "prefectureId": "miyazaki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/cce5f8178d3186bff628ad5efe8e9962_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/cce5f8178d3186bff628ad5efe8e9962_l.png",
      "lat": 32.4253924,
      "lng": 131.6277364
    },
    {
      "id": "miyazaki-115",
      "descId": "115",
      "city": "小林市",
      "cityEn": "Kobayashi",
      "prefectureId": "miyazaki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/0dc396d7b4e206b302245cb286cb828c_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/0dc396d7b4e206b302245cb286cb828c_l.png",
      "lat": 31.95742,
      "lng": 131.12641
    },
    {
      "id": "miyazaki-114",
      "descId": "114",
      "city": "日南市",
      "cityEn": "Nichinan",
      "prefectureId": "miyazaki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/8ce155eced18eb9355d00e77741e924b_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/8ce155eced18eb9355d00e77741e924b_l.png",
      "lat": 31.58793,
      "lng": 131.4017058
    },
    {
      "id": "miyazaki-113",
      "descId": "113",
      "city": "延岡市",
      "cityEn": "Nobeoka",
      "prefectureId": "miyazaki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/3a5e9189da60b8c54d2ccdbd184dc9dd_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/3a5e9189da60b8c54d2ccdbd184dc9dd_l.png",
      "lat": 32.684711,
      "lng": 131.801103
    },
    {
      "id": "miyazaki-112",
      "descId": "112",
      "city": "都城市",
      "cityEn": "Miyakonojo",
      "prefectureId": "miyazaki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/669e4e9f0164e147c365f0fa159d5186_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/669e4e9f0164e147c365f0fa159d5186_l.png",
      "lat": 31.725213,
      "lng": 131.0661894
    },
    {
      "id": "miyazaki-111",
      "descId": "111",
      "city": "宮崎市",
      "cityEn": "Miyazaki",
      "prefectureId": "miyazaki",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/4df805be8a64d2c988d992788be19a9b_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/4df805be8a64d2c988d992788be19a9b_l.png",
      "lat": 31.807505,
      "lng": 131.457839
    }
  ],
  "kagoshima": [
    {
      "id": "kagoshima-9",
      "descId": "9",
      "city": "指宿市",
      "cityEn": "Ibusuki",
      "prefectureId": "kagoshima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/5953fdc915091e1bfb6a059b8de5a086_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/5953fdc915091e1bfb6a059b8de5a086_l.png",
      "lat": 31.235444,
      "lng": 130.641389
    },
    {
      "id": "kagoshima-8",
      "descId": "8",
      "city": "指宿市",
      "cityEn": "Ibusuki",
      "prefectureId": "kagoshima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/580f382c51079d1d67edbb02d23462f4_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/580f382c51079d1d67edbb02d23462f4_l.png",
      "lat": 31.231056,
      "lng": 130.644611
    },
    {
      "id": "kagoshima-7",
      "descId": "7",
      "city": "指宿市",
      "cityEn": "Ibusuki",
      "prefectureId": "kagoshima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/079877ac0df6af8da9edc55ca9a06ae8_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/079877ac0df6af8da9edc55ca9a06ae8_l.png",
      "lat": 31.263889,
      "lng": 130.662917
    },
    {
      "id": "kagoshima-6",
      "descId": "6",
      "city": "指宿市",
      "cityEn": "Ibusuki",
      "prefectureId": "kagoshima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/2662aede3a093feb445970ca2e077f85_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/2662aede3a093feb445970ca2e077f85_l.png",
      "lat": 31.236833,
      "lng": 130.642188
    },
    {
      "id": "kagoshima-5",
      "descId": "5",
      "city": "指宿市",
      "cityEn": "Ibusuki",
      "prefectureId": "kagoshima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/80a6b07026c38a97c89436f59e3c5cc2_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/80a6b07026c38a97c89436f59e3c5cc2_l.png",
      "lat": 31.238278,
      "lng": 130.645
    },
    {
      "id": "kagoshima-4",
      "descId": "4",
      "city": "指宿市",
      "cityEn": "Ibusuki",
      "prefectureId": "kagoshima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/3b15f5b988170e1ac987781317e3e6c4_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/3b15f5b988170e1ac987781317e3e6c4_l.png",
      "lat": 31.229417,
      "lng": 130.651972
    },
    {
      "id": "kagoshima-3",
      "descId": "3",
      "city": "指宿市",
      "cityEn": "Ibusuki",
      "prefectureId": "kagoshima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/5c4e9fb2f499dee2fd8206c9a0926294_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/5c4e9fb2f499dee2fd8206c9a0926294_l.png",
      "lat": 31.255278,
      "lng": 130.647639
    },
    {
      "id": "kagoshima-2",
      "descId": "2",
      "city": "指宿市",
      "cityEn": "Ibusuki",
      "prefectureId": "kagoshima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/79b15b766a24880ed19bda2ec4863ab2_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/79b15b766a24880ed19bda2ec4863ab2_l.png",
      "lat": 31.228,
      "lng": 130.653028
    },
    {
      "id": "kagoshima-1",
      "descId": "1",
      "city": "指宿市",
      "cityEn": "Ibusuki",
      "prefectureId": "kagoshima",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/1a0d76db2fb9b2cd5857ad3ee233e054_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/1a0d76db2fb9b2cd5857ad3ee233e054_l.png",
      "lat": 31.237194,
      "lng": 130.642861
    }
  ],
  "okinawa": [
    {
      "id": "okinawa-446",
      "descId": "446",
      "city": "那覇市",
      "cityEn": "Naha",
      "prefectureId": "okinawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/6ea8d929a518be32eb78754371390526_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/6ea8d929a518be32eb78754371390526_l.png",
      "lat": 26.22005,
      "lng": 127.71657
    },
    {
      "id": "okinawa-425",
      "descId": "425",
      "city": "久米島町",
      "cityEn": "Kumejima",
      "prefectureId": "okinawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/e4ee32e72e4e30c41254652f0b1383bf_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/e4ee32e72e4e30c41254652f0b1383bf_l.png",
      "lat": 26.373985,
      "lng": 126.788928
    },
    {
      "id": "okinawa-424",
      "descId": "424",
      "city": "座間味村",
      "cityEn": "Zamami",
      "prefectureId": "okinawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/ad1c1aa56457a1e78f7b08da82f89868_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/ad1c1aa56457a1e78f7b08da82f89868_l.png",
      "lat": 26.227878,
      "lng": 127.301424
    },
    {
      "id": "okinawa-423",
      "descId": "423",
      "city": "渡嘉敷村",
      "cityEn": "Tokashiki",
      "prefectureId": "okinawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/623f50d4f0f1212ad2d8e5bebf791b51_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/623f50d4f0f1212ad2d8e5bebf791b51_l.png",
      "lat": 26.14914,
      "lng": 127.34735
    },
    {
      "id": "okinawa-422",
      "descId": "422",
      "city": "北谷町",
      "cityEn": "Chatan",
      "prefectureId": "okinawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/5607d35bb32e267fd37f06948e578902_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/5607d35bb32e267fd37f06948e578902_l.png",
      "lat": 26.315733,
      "lng": 127.753613
    },
    {
      "id": "okinawa-236",
      "descId": "236",
      "city": "宮古島市",
      "cityEn": "Miyakojima",
      "prefectureId": "okinawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/088f26f6fd18af3f64cc8d3e05af29ba_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/088f26f6fd18af3f64cc8d3e05af29ba_l.png",
      "lat": 24.734962,
      "lng": 125.263088
    },
    {
      "id": "okinawa-235",
      "descId": "235",
      "city": "石垣市",
      "cityEn": "Ishigaki",
      "prefectureId": "okinawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/070b79a26c3156a55e5f6b29b4780493_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/070b79a26c3156a55e5f6b29b4780493_l.png",
      "lat": 24.337418,
      "lng": 124.156947
    },
    {
      "id": "okinawa-234",
      "descId": "234",
      "city": "南城市",
      "cityEn": "Nanjo",
      "prefectureId": "okinawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/037ab104126f6843a4d1264f42926ab5_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/037ab104126f6843a4d1264f42926ab5_l.png",
      "lat": 26.169111,
      "lng": 127.827083
    },
    {
      "id": "okinawa-233",
      "descId": "233",
      "city": "豊見城市",
      "cityEn": "Tomigusuku",
      "prefectureId": "okinawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/07ed34f46b856337cea843d294287933_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/07ed34f46b856337cea843d294287933_l.png",
      "lat": 26.15755646,
      "lng": 127.656121
    },
    {
      "id": "okinawa-232",
      "descId": "232",
      "city": "本部町",
      "cityEn": "Motobu",
      "prefectureId": "okinawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/ace6dd945ee55438d6cc274d7d64dce2_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/ace6dd945ee55438d6cc274d7d64dce2_l.png",
      "lat": 26.691694,
      "lng": 127.877972
    },
    {
      "id": "okinawa-231",
      "descId": "231",
      "city": "糸満市",
      "cityEn": "Itoman",
      "prefectureId": "okinawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/e3d0f526cfd0d3725b9814853efd7932_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/e3d0f526cfd0d3725b9814853efd7932_l.png",
      "lat": 26.13828,
      "lng": 127.661336
    },
    {
      "id": "okinawa-230",
      "descId": "230",
      "city": "名護市",
      "cityEn": "Nago",
      "prefectureId": "okinawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/73c010eaa7438086463ffc02641320d9_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/73c010eaa7438086463ffc02641320d9_l.png",
      "lat": 26.587352,
      "lng": 127.985744
    },
    {
      "id": "okinawa-229",
      "descId": "229",
      "city": "浦添市",
      "cityEn": "Urasoe",
      "prefectureId": "okinawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/f845741c04f2845bd5ca99241c714706_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/f845741c04f2845bd5ca99241c714706_l.png",
      "lat": 26.245559,
      "lng": 127.687899
    },
    {
      "id": "okinawa-177",
      "descId": "177",
      "city": "うるま市",
      "cityEn": "Uruma",
      "prefectureId": "okinawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/1a8c0a85ed3586e6076dac22272185d7_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/1a8c0a85ed3586e6076dac22272185d7_l.png",
      "lat": 26.436181,
      "lng": 127.826113
    },
    {
      "id": "okinawa-176",
      "descId": "176",
      "city": "沖縄市",
      "cityEn": "Okinawa",
      "prefectureId": "okinawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/b084912808574bde91de683704e1503d_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/b084912808574bde91de683704e1503d_l.png",
      "lat": 26.32766,
      "lng": 127.803001
    },
    {
      "id": "okinawa-175",
      "descId": "175",
      "city": "宜野湾市",
      "cityEn": "Ginowan",
      "prefectureId": "okinawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/130f21e980593ce7e537a81a804a1bc3_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/130f21e980593ce7e537a81a804a1bc3_l.png",
      "lat": 26.28139,
      "lng": 127.732215
    },
    {
      "id": "okinawa-174",
      "descId": "174",
      "city": "那覇市",
      "cityEn": "Naha",
      "prefectureId": "okinawa",
      "smallImage": "https://local.pokemon.jp/img/p/manhole/38ee8e633d933570a2506d1ceba9290b_m.png",
      "largeImage": "https://local.pokemon.jp/img/p/manhole/38ee8e633d933570a2506d1ceba9290b_l.png",
      "lat": 26.21641,
      "lng": 127.68942
    }
  ]
};

export function getAllPokelidsList(): PokelidDetailItem[] {
  return Object.values(ALL_POKELIDS).flat();
}

export function getPokelidsByPrefecture(prefId: string): PokelidDetailItem[] {
  return ALL_POKELIDS[prefId] || [];
}

export function getPokelidsByRegion(regionPrefectures: string[]): PokelidDetailItem[] {
  return regionPrefectures.flatMap(pref => ALL_POKELIDS[pref] || []);
}
