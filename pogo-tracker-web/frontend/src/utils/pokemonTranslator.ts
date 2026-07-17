import type { Language } from '../data/translations';

const pokemonNameTranslations: Record<string, string> = {
  // Ditto Disguises
  "Mankey": "マンキー",
  "Growlithe": "ガーディ",
  "Magnemite": "コイル",
  "Voltorb": "ビリリダマ",
  "Sentret": "オタチ",
  "Teddiursa": "ヒメグマ",
  "Seedot": "タネボー",
  "Surskit": "アメタマ",
  "Slakoth": "ナマケロ",
  "Whismur": "ゴニョニョ",
  "Duskull": "ヨマワル",
  "Bulbasaur": "フシギダネ",
  "Charmander": "ヒトカゲ",
  "Squirtle": "ゼニガメ",
  "Pikachu": "ピカチュウ",
  "Hitmonchan": "エビワラー",
  "Marill": "マリル",
  "Drilbur": "モグリュー",
  "Goomy": "ヌメラ",
  "Combee": "ミツハニー",
  "Scyther": "ストライク",
  "Sudowoodo": "ウソッキー",
  "Timburr": "ドッコラー",

  // Rocket Leaders
  "Giovanni": "サカキ",
  "Sierra": "シエラ",
  "Cliff": "クリフ",
  "Arlo": "アルロ",

  // Current Raid Bosses / Special
  "Kyurem": "キュレム",
  "Solgaleo": "ソルガレオ",
  "Lunala": "ルナアーラ",
  "Necrozma": "ネクロズマ",
  "Starmie": "スターミー",
  "Thievul": "フォクスライ",
  "Nickit": "クスネ",
  "Squawkabilly": "イキリンコ",

  // Gen 1 Starters & Icons
  "Ivysaur": "フシギソウ",
  "Venusaur": "フシギバナ",
  "Charmeleon": "リザード",
  "Charizard": "リザードン",
  "Wartortle": "カメール",
  "Blastoise": "カメックス",

  // Top Legendaries & Beasts
  "Mewtwo": "ミュウツー",
  "Mew": "ミュウ",
  "Raikou": "ライコウ",
  "Entei": "エンテイ",
  "Suicune": "スイクン",
  "Lugia": "ルギア",
  "Ho-Oh": "ホウオウ",
  "Celebi": "セレビィ",
  "Regirock": "レジロック",
  "Regice": "レジアイス",
  "Registeel": "レジスチル",
  "Latias": "ラティアス",
  "Latios": "ラティオス",
  "Kyogre": "カイオーガ",
  "Groudon": "グラードン",
  "Rayquaza": "レックウザ",
  "Jirachi": "ジラーチ",
  "Deoxys": "デオキシス",
  "Uxie": "ユクシー",
  "Mesprit": "エムリット",
  "Azelf": "アグノム",
  "Dialga": "ディアルガ",
  "Palkia": "パルキア",
  "Heatran": "ヒードラン",
  "Regigigas": "レジギガス",
  "Giratina": "ギラティナ",
  "Cresselia": "クレセリア",
  "Arceus": "アルセウス",
  "Victini": "ビクティニ",
  "Cobalion": "コバルオン",
  "Terrakion": "テラキオン",
  "Virizion": "ビリジオン",
  "Tornadus": "トルネロス",
  "Thundurus": "ボルトロス",
  "Landorus": "ランドロス",
  "Reshiram": "レシラム",
  "Zekrom": "ゼクロム",
  "Kyurem-Black": "ブラックキュレム",
  "Kyurem-White": "ホワイトキュレム",
  "Keldeo": "ケルディオ",
  "Meloetta": "メロエッタ",
  "Genesect": "ゲノセクト",
  "Xerneas": "ゼルネアス",
  "Yveltal": "イベルタル",
  "Zygarde": "ジガルデ",
  "Diancie": "ディアンシー",
  "Hoopa": "フーパ",
  "Volcanion": "ボルケニオン",
  "Tapu Koko": "カプ・コケコ",
  "Tapu Lele": "カプ・テテフ",
  "Tapu Bulu": "カプ・ブルル",
  "Tapu Fini": "カプ・レヒレ",
  "Cosmog": "コスモッグ",
  "Cosmoem": "コスモウム",
  "Nihilego": "ウツロイド",
  "Buzzwole": "マッシブーン",
  "Pheromosa": "フェローチェ",
  "Xurkitree": "デンジュモク",
  "Celesteela": "テッカグヤ",
  "Kartana": "カミツルギ",
  "Guzzlord": "アクジキング",
  "Magearna": "マギアナ",
  "Marshadow": "マーシャドー",
  "Poipole": "ベベノム",
  "Naganadel": "アーゴヨン",
  "Stakataka": "ツンデツンデ",
  "Blacephalon": "ズガドーン",
  "Zeraora": "ゼラオラ",
  "Meltan": "メルタン",
  "Melmetal": "メルメタル",
  "Zacian": "ザシアン",
  "Zamazenta": "ザマゼンタ",
  "Eternatus": "ムゲンダイナ",
  "Zarude": "ザルード",
  "Regieleki": "レジエレキ",
  "Regidrago": "レジドラゴ",
  "Calyrex": "バドレックス",
  "Enamorus": "ラブトロス",
  "Koraidon": "コライドン",
  "Miraidon": "ミライドン",

  // Common Top PvE attackers
  "Tyranitar": "バンギラス",
  "Metagross": "メタグロス",
  "Machamp": "カイリキー",
  "Conkeldurr": "ローブシン",
  "Lucario": "ルカリオ",
  "Rhyperior": "ドサイドン",
  "Rampardos": "ラムパルド",
  "Mamoswine": "マンムー",
  "Chandelure": "シャンデラ",
  "Volcarona": "ウルガモス",
  "Garchomp": "ガブリアス",
  "Salamence": "ボーマンダ",
  "Dragonite": "カイリュー",
  "Hydreigon": "サザンドラ",
  "Darkrai": "ダークライ",
  "Gardevoir": "サーナイト",
  "Togekiss": "トゲキッス",
  "Roserade": "ロズレイド",
  "Electivire": "エレキブル",
  "Magnezone": "ジバコイル",
  "Kingler": "キングラー",
  "Swampert": "ラグラージ",
  "Blaziken": "バシャーモ",
  "Sceptile": "ジュカイン",
  "Greninja": "ゲッコウガ",
  "Lopunny": "ミミロップ",
  "Aerodactyl": "プテラ",
  "Pinsir": "カイロス",
  "Scizor": "ハッサム",
  "Heracross": "ヘラクロス",
  "Ursaluna": "ガチグマ",
  "Slaking": "ケッキング",
  "Baxcalibur": "セグレイブ",
  "Haxorus": "オノノクス",
  "Gholdengo": "サーフゴー",
  "Excadrill": "ドリュウズ",
  "Nihilego-Shadow": "シャドウウツロイド",
  "Overqwil": "ハリーマン",
  "Sneasler": "オオニューラ",
  "Toxicroak": "ドクロッグ",
  "Weavile": "マニューラ",
  "Archeops": "アーケオス"
};

/**
 * Returns translated Pokemon name if language is Japanese ('ja').
 * Strips Shadow, Mega, or Primal prefixes, translates base name, and re-attaches prefix in simple Japanese.
 */
export function getPokemonName(englishName: string, lang: Language): string {
  if (lang !== 'ja') return englishName;

  let name = englishName.trim();
  let prefix = '';

  if (name.startsWith('Shadow ')) {
    prefix = 'シャドウ';
    name = name.slice(7);
  } else if (name.startsWith('Mega ')) {
    prefix = 'メガ';
    name = name.slice(5);
  } else if (name.startsWith('Primal ')) {
    prefix = 'ゲンシ';
    name = name.slice(7);
  }

  // Also handle trailing parenthesized versions like " (Meadow)" or " (Sun Crown)"
  const formMatch = name.match(/\s*\([^)]+\)$/);
  let suffix = '';
  if (formMatch) {
    suffix = formMatch[0];
    name = name.replace(suffix, '').trim();
    // Translate some common form suffixes
    if (suffix.toLowerCase().includes('sun crown')) suffix = '（太陽の王冠）';
    else if (suffix.toLowerCase().includes('moon crown')) suffix = '（月の王冠）';
    else if (suffix.toLowerCase().includes('normal')) suffix = '（ノーマル）';
    else if (suffix.toLowerCase().includes('alolan')) suffix = '（アローラ）';
    else if (suffix.toLowerCase().includes('galarian')) suffix = '（ガラル）';
    else if (suffix.toLowerCase().includes('hisuian')) suffix = '（ヒスイ）';
    else if (suffix.toLowerCase().includes('origin')) suffix = '（オリジン）';
  }

  const translated = pokemonNameTranslations[name];
  if (translated) {
    return prefix + translated + suffix;
  }

  return englishName;
}

/**
 * Translates Shadow/Mega/Primal status tags to Katakana.
 */
export function getStatusTagName(tag: 'Shadow' | 'Mega' | 'Primal', lang: Language): string {
  if (lang === 'ja') {
    if (tag === 'Shadow') return 'シャドウ';
    if (tag === 'Mega') return 'メガ';
    if (tag === 'Primal') return 'ゲンシカイキ';
  }
  return tag;
}
