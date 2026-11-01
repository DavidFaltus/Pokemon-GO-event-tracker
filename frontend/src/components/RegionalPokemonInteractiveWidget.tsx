'use client';

import React, { useState, useMemo } from 'react';
import type { Language } from '../data/translations';
import { 
  Globe, 
  Search, 
  MapPin, 
  Compass, 
  Copy, 
  Check, 
  Layers, 
  Sparkles,
  Zap,
  Info
} from 'lucide-react';
import { getPokemonIconUrl, handlePokemonImageError } from '../utils/imageResolver';
import './RegionalPokemonInteractiveWidget.css';

interface RegionalPokemonInteractiveWidgetProps {
  lang: Language;
}

const REGIONAL_POKEMON_DATA = [
        // EUROPE & UK
        {
          name: 'Mr-Mime',
          region: 'europe',
          gen: 'Gen 1',
          area: { cs: 'Celá Evropa', en: 'Entire Europe', ja: 'ヨーロッパ全域', ru: 'Вся Европа' },
          note: { cs: 'Běžný ve volné přírodě napříč celou Evropou včetně ČR a Slovenska.', en: 'Common wild spawn across entire Europe including UK and Scandinavia.', ja: 'イギリスや北欧を含むヨーロッパ全域で出現。', ru: 'Обычный дикий спавн по всей Европе.' },
          emoji: '🇪🇺',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },
        {
          name: 'Mime-Jr',
          region: 'europe',
          gen: 'Gen 4',
          area: { cs: 'Evropa (5km Vejce)', en: 'Europe (5km Eggs)', ja: 'ヨーロッパ（5kmタマゴ）', ru: 'Европа (5 км яйца)' },
          note: { cs: 'Líhne se výhradně z 5km vajec získaných z evropských Pokéstopů.', en: 'Hatches exclusively from 5km eggs obtained from European PokéStops.', ja: 'ヨーロッパのポケストップから入手した5kmタマゴからのみ孵化。', ru: 'Вылупляется только из 5 км яиц с европейских покестопов.' },
          emoji: '🥚',
          method: { cs: '5km Vejce', en: '5km Eggs', ja: '5kmタマゴ', ru: '5 км яйца' }
        },
        {
          name: 'Klefki',
          region: 'europe',
          gen: 'Gen 6',
          area: { cs: 'Francie & Příhraničí', en: 'France & Border Regions', ja: 'フランスおよび国境周辺', ru: 'Франция и приграничье' },
          note: { cs: 'Francie, Monako, jih Anglie, část Belgie, Švýcarska a severního Španělska.', en: 'France, Monaco, southern UK coast, parts of Belgium, Switzerland, and northern Spain.', ja: 'フランス、モナコ、英国南部沿岸、ベルギー・スイスの一部など。', ru: 'Франция, Монако, юг Англии, части Бельгии и Швейцарии.' },
          emoji: '🇫🇷',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },
        {
          name: 'Stonjourner',
          region: 'europe',
          gen: 'Gen 8',
          area: { cs: 'Velká Británie & Irsko', en: 'United Kingdom & Ireland', ja: 'イギリス・アイルランド', ru: 'Великобритания и Ирландия' },
          note: { cs: 'Exkluzivně na Britských ostrovech (Anglie, Skotsko, Wales, Severní Irsko, Irsko).', en: 'Exclusively found on the British Isles (England, Scotland, Wales, Ireland).', ja: 'ブリテン諸島（イングランド、スコットランド、ウェールズ、アイルランド）限定。', ru: 'Эксклюзив Британских островов (Англия, Шотландия, Уэльс, Ирландия).' },
          emoji: '🇬🇧',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },

        // NORTH AMERICA
        {
          name: 'Tauros',
          region: 'north-america',
          gen: 'Gen 1',
          area: { cs: 'USA & Jižní Kanada', en: 'USA & Southern Canada', ja: 'アメリカ・カナダ南部', ru: 'США и Южная Канада' },
          note: { cs: 'Běžný divoký spawn v kontinentálních USA a jižní Kanadě.', en: 'Common wild spawn across continental USA and southern Canada.', ja: 'アメリカ本土およびカナダ南部で野生出現。', ru: 'Обычный дикий спавн в США и на юге Канады.' },
          emoji: '🇺🇸',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },
        {
          name: 'Bouffalant',
          region: 'north-america',
          gen: 'Gen 5',
          area: { cs: 'Oblast New York City', en: 'New York City Tri-State', ja: 'ニューヨーク都市圏周辺', ru: 'Окрестности Нью-Йорка' },
          note: { cs: 'New York, New Jersey, Connecticut, východní Pennsylvania, Maryland, DC.', en: 'New York, New Jersey, Connecticut, Eastern PA, Maryland, Delaware, DC.', ja: 'ニューヨーク、ニュージャージー、コネチカットなど東海岸中部に限定。', ru: 'Нью-Йорк, Нью-Джерси, Коннектикут, Мэриленд, Вашингтон.' },
          emoji: '🗽',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },
        {
          name: 'Carnivine',
          region: 'north-america',
          gen: 'Gen 4',
          area: { cs: 'Jihovýchod USA', en: 'US Southeast', ja: 'アメリカ南東部', ru: 'Юго-восток США' },
          note: { cs: 'Florida, Georgia, Severní a Jižní Karolína, Alabama.', en: 'Florida, Georgia, North/South Carolina, Alabama.', ja: 'フロリダ州、ジョージア州、カロライナ州、アラバマ州など。', ru: 'Флорида, Джорджия, Каролина, Алабама.' },
          emoji: '🌴',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },
        {
          name: 'Pachirisu',
          region: 'north-america',
          gen: 'Gen 4',
          area: { cs: 'Aljaška, Severní Kanada & Sibiř', en: 'Alaska, North Canada & Siberia', ja: 'アラスカ・カナダ北部・シベリア', ru: 'Аляска, Северная Канада и Сибирь' },
          note: { cs: 'Vysoké severní zeměpisné šířky (nad ~52° s.š.).', en: 'High northern latitudes above ~52°N.', ja: '北緯52度以上の高緯度地域に出現。', ru: 'Северные широты выше 52° с.ш.' },
          emoji: '❄️',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },
        {
          name: 'Comfey',
          region: 'north-america',
          gen: 'Gen 7',
          area: { cs: 'Havajské ostrovy', en: 'Hawaiian Islands', ja: 'ハワイ諸島', ru: 'Гавайские острова' },
          note: { cs: 'Exkluzivně na Havaji (Oahu, Maui, Big Island, Kauai).', en: 'Exclusive to the state of Hawaii.', ja: 'ハワイ諸島限定で出現。', ru: 'Эксклюзивно на Гавайских островах.' },
          emoji: '🌺',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },
        {
          name: 'Hawlucha',
          region: 'north-america',
          gen: 'Gen 6',
          area: { cs: 'Mexiko & Jihovýchod USA', en: 'Mexico & US Border', ja: 'メキシコおよび国境地帯', ru: 'Мексика и приграничье США' },
          note: { cs: 'Celé Mexiko s mírným přesahem do jižního Texasu a Kalifornie.', en: 'Throughout Mexico with slight bleed into southern Texas and SoCal.', ja: 'メキシコ全域およびテキサス・南カリフォルニアの境界部。', ru: 'Вся Мексика и юг Техаса/Калифорнии.' },
          emoji: '🇲🇽',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },

        // LATIN AMERICA & CARIBBEAN
        {
          name: 'Heracross',
          region: 'latin-america',
          gen: 'Gen 2',
          area: { cs: 'Střední & Jižní Amerika', en: 'Central & South America', ja: '中南米全域', ru: 'Центральная и Южная Amerika' },
          note: { cs: 'Jižní Florida (pod 29° s.š.), jižní Texas, Mexiko a celá Jižní Amerika.', en: 'South Florida (below 29°N), South Texas, Mexico, and South America.', ja: '南フロリダ、南テキサス、メキシコ、中南米全域に出現。', ru: 'Южная Флорида, Южный Техас, Мексика и вся Южная Америка.' },
          emoji: '🇧🇷',
          method: { cs: 'Divočina & Mega Raidy', en: 'Wild & Mega Raids', ja: '野生＆メガレイド', ru: 'Дикий спавн и Мега-рейды' }
        },
        {
          name: 'Corsola',
          region: 'latin-america',
          gen: 'Gen 2',
          area: { cs: 'Tropické pobřeží & Karibik', en: 'Tropical Coasts & Caribbean', ja: '熱帯沿岸部・カリブ海', ru: 'Тропические побережья и Карибы' },
          note: { cs: 'Pobřežní oblasti mezi 31° s.š. a 26° j.š. (Florida, Karibik, Bali atd.).', en: 'Coasts between 31°N and 26°S latitudes.', ja: '北緯31度〜南緯26度の熱帯沿岸地域。', ru: 'Прибрежные зоны между 31° с.ш. и 26° ю.ш.' },
          emoji: '🏖️',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },
        {
          name: 'Maractus',
          region: 'latin-america',
          gen: 'Gen 5',
          area: { cs: 'Střední Amerika & Karibik', en: 'Central America & Caribbean', ja: '中米・カリブ海・南米北部', ru: 'Центральная Amerika и Карибы' },
          note: { cs: 'Mexiko, Karibské ostrovy, Střední Amerika a sever Jižní Ameriky.', en: 'Mexico, Caribbean, Central America, and northern South America.', ja: 'メキシコ、中米、カリブ海諸島、南米北部。', ru: 'Мексика, Карибы, Центральная Америка.' },
          emoji: '🌵',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },
        {
          name: 'Flamigo',
          region: 'latin-america',
          gen: 'Gen 9',
          area: { cs: 'Karibik, Latinská Amerika & Florida', en: 'Caribbean, Latin America & Florida', ja: 'カリブ海・中南米・フロリダ', ru: 'Карибы, Латинская Америка и Флорида' },
          note: { cs: 'Karibik, jižní Florida a tropické zóny Jižní Ameriky.', en: 'Caribbean, South Florida, and tropical South America.', ja: 'カリブ海、南フロリダ、南米の熱帯エリア。', ru: 'Карибы, Южная Флорида и тропики Южной Америки.' },
          emoji: '🦩',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },

        // ASIA & OCEANIA
        {
          name: 'Farfetchd',
          region: 'asia-oceania',
          gen: 'Gen 1',
          area: { cs: 'Východní Asie', en: 'East Asia', ja: '東アジア', ru: 'Восточная Азия' },
          note: { cs: 'Japonsko, Jižní Korea, Tchaj-wan a Hongkong.', en: 'Japan, South Korea, Taiwan, and Hong Kong.', ja: '日本、韓国、台湾、香港で野生出現。', ru: 'Япония, Южная Корея, Тайвань и Гонконг.' },
          emoji: '🇯🇵',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },
        {
          name: 'Kangaskhan',
          region: 'asia-oceania',
          gen: 'Gen 1',
          area: { cs: 'Austrálie', en: 'Australia', ja: 'オーストラリア', ru: 'Австралия' },
          note: { cs: 'Běžný ve městech a parcích napříč Austrálií.', en: 'Common in parks and cities across Australia.', ja: 'オーストラリア全土の都市部や公園で出現。', ru: 'Обычен в городах и парках Австралии.' },
          emoji: '🇦🇺',
          method: { cs: 'Divočina & Mega Raidy', en: 'Wild & Mega Raids', ja: '野生＆メガレイド', ru: 'Дикий спавн и Мега-рейды' }
        },
        {
          name: 'Torkoal',
          region: 'asia-oceania',
          gen: 'Gen 3',
          area: { cs: 'Indie & Jihovýchodní Asie', en: 'India & Southeast Asia', ja: 'インド・東南アジア', ru: 'Индия и Юго-Восточная Азия' },
          note: { cs: 'Indie, Pákistán, Thajsko, Vietnam, Malajsie a SAE/Omán.', en: 'India, Pakistan, Thailand, Vietnam, Malaysia, UAE, Oman.', ja: 'インド、パキスタン、タイ、ベトナム、マレーシア、UAEなど。', ru: 'Индия, Пакистан, Таиланд, Вьетнам, Малайзия, ОАЭ.' },
          emoji: '🇮🇳',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },
        {
          name: 'Relicanth',
          region: 'asia-oceania',
          gen: 'Gen 3',
          area: { cs: 'Nový Zéland & Pacifické ostrovy', en: 'New Zealand & Pacific Islands', ja: 'ニュージーランド・太平洋諸島', ru: 'Новая Зеландия и острова' },
          note: { cs: 'Nový Zéland, Fidži, Samoa, Vanuatu a Cookovy ostrovy.', en: 'New Zealand, Fiji, Samoa, Vanuatu, and Cook Islands.', ja: 'ニュージーランド、フィジー、サモア、バヌアツなど。', ru: 'Новая Зеландия, Фиджи, Самоа, Вануату.' },
          emoji: '🇳🇿',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },
        {
          name: 'Chatot',
          region: 'asia-oceania',
          gen: 'Gen 4',
          area: { cs: 'Jižní polokoule', en: 'Southern Hemisphere', ja: '南半球全域', ru: 'Южное полушарие' },
          note: { cs: 'Všude pod rovníkem (Austrálie, Nový Zéland, jižní Afrika, Jižní Amerika).', en: 'Anywhere below the equator (Australia, NZ, South Africa, South America).', ja: '赤道以南の地域（豪州、NZ、南アフリカ、南米など）。', ru: 'Ниже экватора (Австралия, Южная Африка, Южная Америка).' },
          emoji: '🦜',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },

        // AFRICA & MEDITERRANEAN
        {
          name: 'Tropius',
          region: 'africa',
          gen: 'Gen 3',
          area: { cs: 'Afrika & Středomoří', en: 'Africa & Mediterranean', ja: 'アフリカ・地中海沿岸', ru: 'Африка и Средиземноморье' },
          note: { cs: 'Afrika, Blízký Východ, jih Španělska (Malaga, Gibraltar), Kréta a Kypr.', en: 'Africa, Middle East, southern Spain (Malaga/Gibraltar), Crete, Cyprus.', ja: 'アフリカ、中東、南スペイン（マラガ・ジブラルタル）、キプロスなど。', ru: 'Африка, Ближний Восток, юг Испании (Малага), Кипр.' },
          emoji: '🌍',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },
        {
          name: 'Sigilyph',
          region: 'africa',
          gen: 'Gen 5',
          area: { cs: 'Egypt, Řecko & Izrael', en: 'Egypt, Greece & Israel', ja: 'エジプト・ギリシャ・イスラエル', ru: 'Египет, Греция и Израиль' },
          note: { cs: 'Východní Středomoří: Egypt, Řecko, Kypr, Izrael a Jordánsko.', en: 'Eastern Mediterranean: Egypt, Greece, Cyprus, Israel, Jordan.', ja: '東地中海地域（エジプト、ギリシャ、キプロス、イスラエルなど）。', ru: 'Восточное Средиземноморье: Египет, Греция, Кипр, Израиль.' },
          emoji: '🏛️',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },

        // HEMISPHERE & PAIRS
        {
          name: 'Zangoose',
          region: 'hemisphere',
          gen: 'Gen 3',
          area: { cs: 'Evropa, Asie & Austrálie', en: 'Europe, Asia & Australia', ja: '欧州・アジア・豪州', ru: 'Европа, Азия и Австралия' },
          note: { cs: 'Východní polokoule. Rotuje v páru se Seviperem během eventů.', en: 'Eastern Hemisphere. Swaps with Seviper during special events.', ja: '東半球限定。イベント時にハブネークと入れ替わりあり。', ru: 'Восточное полушарие. Ротируется с Севипером.' },
          emoji: '⚔️',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },
        {
          name: 'Seviper',
          region: 'hemisphere',
          gen: 'Gen 3',
          area: { cs: 'Severní & Jižní Amerika, Afrika', en: 'Americas & Africa', ja: '南北アメリカ・アフリカ', ru: 'Америка и Африка' },
          note: { cs: 'Západní polokoule. Rotuje v páru se Zangoosem.', en: 'Western Hemisphere. Swaps with Zangoose.', ja: '西半球限定。ザングースと対になる存在。', ru: 'Западное полушарие. Ротируется с Зангусом.' },
          emoji: '🐍',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },
        {
          name: 'Heatmor',
          region: 'hemisphere',
          gen: 'Gen 5',
          area: { cs: 'Severní & Jižní Amerika', en: 'Western Hemisphere', ja: '西半球（南北アメリカ）', ru: 'Западное полушарие' },
          note: { cs: 'Americký kontinent. V páru s Durantem (Evropa/Asie/Austrálie).', en: 'Western Hemisphere. Paired with Durant (Eastern Hemisphere).', ja: '西半球限定。アイアントと対になる。', ru: 'Западное полушарие. В паре с Дюрантом.' },
          emoji: '🔥',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },
        {
          name: 'Durant',
          region: 'hemisphere',
          gen: 'Gen 5',
          area: { cs: 'Evropa, Asie & Austrálie', en: 'Eastern Hemisphere', ja: '東半球（欧州・アジア・豪州）', ru: 'Восточное полушарие' },
          note: { cs: 'Východní polokoule včetně ČR. V páru s Heatmorem.', en: 'Eastern Hemisphere including Europe. Paired with Heatmor.', ja: '東半球限定。ヨーロッパ・アジア・豪州で出現。', ru: 'Восточное полушарие включая Европу.' },
          emoji: '🐜',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },
        {
          name: 'Sawk',
          region: 'hemisphere',
          gen: 'Gen 5',
          area: { cs: 'Evropa, Asie & Austrálie', en: 'Europe, Asia & Australia', ja: '欧州・アジア・豪州', ru: 'Европа, Азия и Австралия' },
          note: { cs: 'Východní polokoule. V páru s Throhem (Ameriky/Afrika).', en: 'Eastern Hemisphere. Paired with Throh (Americas/Africa).', ja: '東半球限定。ナゲキと対になる。', ru: 'Восточное полушарие. В паре с Троу.' },
          emoji: '🥋',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },
        {
          name: 'Throh',
          region: 'hemisphere',
          gen: 'Gen 5',
          area: { cs: 'Severní & Jižní Amerika, Afrika', en: 'Americas & Africa', ja: '南北アメリカ・アフリカ', ru: 'Америка и Африка' },
          note: { cs: 'Západní polokoule. V páru se Sawkem.', en: 'Western Hemisphere. Paired with Sawk.', ja: '西半球限定。ダゲキと対になる。', ru: 'Западное полушарие. В паре с Соуком.' },
          emoji: '🥋',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },
      ];

const FILTER_TABS = [
  { id: 'all', label: { cs: '🌐 Všechny', en: '🌐 All', ja: '🌐 すべて', ru: '🌐 Все' } },
  { id: 'europe', label: { cs: '🇪🇺 Evropa & UK', en: '🇪🇺 Europe & UK', ja: '🇪🇺 ヨーロッパ', ru: '🇪🇺 Европа' } },
  { id: 'north-america', label: { cs: '🇺🇸 Severní Amerika', en: '🇺🇸 North America', ja: '🇺🇸 北米', ru: '🇺🇸 Сев. Америка' } },
  { id: 'latin-america', label: { cs: '🇧🇷 Latinská Amerika', en: '🇧🇷 Latin America', ja: '🇧🇷 中南米', ru: '🇧🇷 Лат. Америка' } },
  { id: 'asia-oceania', label: { cs: '🇯🇵 Asie & Austrálie', en: '🇯🇵 Asia & Oceania', ja: '🇯🇵 アジア・豪州', ru: '🇯🇵 Азия и Океания' } },
  { id: 'africa', label: { cs: '🌍 Afrika & Středomoří', en: '🌍 Africa & Med', ja: '🌍 アフリカ・地中海', ru: '🌍 Африка' } },
  { id: 'hemisphere', label: { cs: '🔄 Polokoule & Páry', en: '🔄 Hemisphere Pairs', ja: '🔄 半球ローテーション', ru: '🔄 Полушария' } },
];

export const RegionalPokemonInteractiveWidget: React.FC<RegionalPokemonInteractiveWidgetProps> = ({ lang }) => {
  const [regionalFilter, setRegionalFilter] = useState<string>('all');
  const [regionalSearch, setRegionalSearch] = useState<string>('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    } catch {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

  const visiblePokemon = useMemo(() => {
    return REGIONAL_POKEMON_DATA.filter(p => {
      const matchesCategory = regionalFilter === 'all' || p.region === regionalFilter;
      if (!matchesCategory) return false;
      if (!regionalSearch.trim()) return true;
      const q = regionalSearch.toLowerCase().trim();
      const nameMatch = p.name.toLowerCase().includes(q);
      const areaMatch = (p.area[lang] || p.area.en || '').toLowerCase().includes(q);
      const noteMatch = (p.note[lang] || p.note.en || '').toLowerCase().includes(q);
      return nameMatch || areaMatch || noteMatch;
    });
  }, [regionalFilter, regionalSearch, lang]);

  return (
    <div className="regional-interactive-widget-container">
      {/* Hero Header */}
      <div className="regional-widget-hero">
        <div className="regional-hero-badge">
          <Globe size={16} />
          <span>WORLDWIDE REGIONAL ATLAS & TRAVEL DATABASE</span>
        </div>
        <h2>
          {lang === 'cs' ? 'Atlas Regionálních Pokémonů v Pokémon GO (2026)' :
           lang === 'ja' ? '地域限定ポケモン完全図鑑・生息地マップ (2026)' :
           lang === 'ru' ? 'Атлас региональных покемонов в Pokémon GO (2026)' :
           'Worldwide Regional Pokémon Atlas & Geographic Guide (2026)'}
        </h2>
        <p>
          {lang === 'cs' ? 'Kompletní přehled všech 26+ regionálních Pokémonů, přesné hranice výskytu, hemisférové rotace a tipy jak získat zahraniční druhy výměnami.' :
           lang === 'ja' ? '世界26体以上の地域限定ポケモンの正確な出現エリア、半球ローテーション、旅行時・トレードでの効率的入手方法。' :
           lang === 'ru' ? 'Полный список 26+ региональных покемонов, географические границы спавна, ротации полушарий и советы по трейдам.' :
           'Comprehensive index of all 26+ regional exclusive Pokémon, continental boundaries, hemisphere pair rotations, and trade tips.'}
        </p>

        {/* Travel & Trade Pro-Tip Banner */}
        <div className="regional-trade-banner">
          <Zap size={18} color="#facc15" />
          <div className="banner-text">
            <strong>
              {lang === 'cs' ? '✈️ PRAVIDLO PRO CESTOVATELE (DISTANCE TRADE XL):' :
               lang === 'ja' ? '✈️ 旅行者・長距離交換の黄金ルール（アメXL確定）：' :
               lang === 'ru' ? '✈️ ПРАВИЛО ДЛЯ ПУТЕШЕСТВЕННИКОВ (DISTANCE TRADE XL):' :
               '✈️ TRAVELER & AIRPORT PRO-TIP (DISTANCE TRADE CANDY XL):'}
            </strong>
            <span>
              {lang === 'cs' ? 'Kdykoliv letíte do zahraničí, chyťte desítky místních Pokémonů! Při výměně s přáteli doma (100+ km) obdržíte VY I VÁŠ PŘÍTEL garantované 1× Candy XL a 3× Candy za každý trade.' :
               'Whenever traveling 100+ km away, stock up on local common spawns! Trading them back home awards BOTH players 1 guaranteed Candy XL and 3 bonus Candies.'}
            </span>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="regional-controls-card">
        <div className="regional-search-bar">
          <Search size={18} className="regional-search-icon" />
          <input
            type="text"
            placeholder={lang === 'cs' ? 'Hledat Pokémona, stát nebo město (např. Tauros, Paříž, Japonsko, Klefki)...' :
                         lang === 'ja' ? 'ポケモン名、国、都市で検索（例：バリヤード、パリ、日本、クレッフィ）...' :
                         lang === 'ru' ? 'Поиск покемона, страны или города...' :
                         'Search Pokémon, country, or city (e.g. Tauros, Paris, Japan, Klefki)...'}
            value={regionalSearch}
            onChange={e => setRegionalSearch(e.target.value)}
            className="regional-search-input"
          />
          {regionalSearch && (
            <button
              type="button"
              className="regional-search-clear"
              onClick={() => setRegionalSearch('')}
            >
              ✕
            </button>
          )}
        </div>

        <div className="regional-filter-tabs">
          {FILTER_TABS.map(tab => (
            <button
              key={tab.id}
              className={`regional-tab-btn ${regionalFilter === tab.id ? 'active' : ''}`}
              onClick={() => setRegionalFilter(tab.id)}
            >
              {tab.label[lang] || tab.label.en}
            </button>
          ))}
        </div>

        <div className="regional-results-bar">
          <span>{lang === 'cs' ? `Zobrazeno ${visiblePokemon.length} regionálních Pokémonů` : `Showing ${visiblePokemon.length} regional Pokémon`}</span>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="regional-cards-grid">
        {visiblePokemon.map((p, idx) => (
          <div key={idx} className="regional-card">
            <div className="regional-card-header">
              <div className="regional-card-avatar">
                <img 
                  src={getPokemonIconUrl(p.name)} 
                  alt={p.name} 
                  onError={(e) => handlePokemonImageError(e.currentTarget, p.name)}
                  loading="lazy"
                />
              </div>
              <div className="regional-card-meta">
                <div className="regional-card-title-row">
                  <h4>{p.name.replace('-', ' ')}</h4>
                  <span className="regional-flag-pill" title={p.area[lang] || p.area.en}>{p.emoji}</span>
                </div>
                <div className="regional-badges-row">
                  <span className="regional-gen-pill">{p.gen}</span>
                  <span className="regional-method-pill">{p.method[lang] || p.method.en}</span>
                </div>
              </div>
            </div>

            <div className="regional-card-body">
              <div className="regional-card-location">
                <MapPin size={14} color="#38bdf8" />
                <span className="location-text">{p.area[lang] || p.area.en}</span>
              </div>
              <p className="regional-card-note">{p.note[lang] || p.note.en}</p>
            </div>
          </div>
        ))}
      </div>

      {visiblePokemon.length === 0 && (
        <div className="regional-empty-state">
          <span>🔍</span>
          <p>{lang === 'cs' ? 'Žádný regionální Pokémon neodpovídá zadanému filtru.' : 'No regional Pokémon matches your filter.'}</p>
        </div>
      )}

      {/* 1-Click Search Operators Panel */}
      <div className="regional-search-panel">
        <div className="panel-title-row">
          <Copy size={18} color="#facc15" />
          <h3>
            {lang === 'cs' ? '1-Click Vyhledávací Filtry pro Batoh & Výměny' :
             lang === 'ja' ? '地域限定・長距離トレード用検索コマンド' :
             lang === 'ru' ? 'Быстрые поисковые фильтры для трейдов' :
             '1-Click Regional & Distance Trade In-Game Search Strings'}
          </h3>
        </div>

        <div className="search-buttons-grid">
          <div className="search-action-card">
            <div className="search-info">
              <code>distance100-</code>
              <span>{lang === 'cs' ? 'Pokémoni chycení 100+ km daleko (garantovaná Candy XL při trade)' : 'Pokémon caught 100+ km away for guaranteed Candy XL trades'}</span>
            </div>
            <button 
              type="button" 
              className="copy-chip-btn"
              onClick={() => handleCopy('distance100-', 'dist100')}
            >
              {copiedKey === 'dist100' ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
              <span>{copiedKey === 'dist100' ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
            </button>
          </div>

          <div className="search-action-card">
            <div className="search-info">
              <code>mime-jr,klefki,tauros,heracross,corsola,relicanth</code>
              <span>{lang === 'cs' ? 'Rychlá kontrola nejžádanějších regionálů v batohu' : 'Quick check for top coveted regional trade specimens'}</span>
            </div>
            <button 
              type="button" 
              className="copy-chip-btn"
              onClick={() => handleCopy('mime-jr,klefki,tauros,heracross,corsola,relicanth', 'topregionals')}
            >
              {copiedKey === 'topregionals' ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
              <span>{copiedKey === 'topregionals' ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
