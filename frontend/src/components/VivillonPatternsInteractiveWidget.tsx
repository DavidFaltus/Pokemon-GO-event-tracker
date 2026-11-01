'use client';

import React, { useState, useMemo } from 'react';
import type { Language } from '../data/translations';
import { 
  Globe, 
  Sparkles, 
  Search, 
  Star, 
  Check, 
  Copy, 
  MapPin, 
  Info, 
  HelpCircle,
  Award,
  Layers,
  Flame,
  ArrowRight
} from 'lucide-react';
import { VIVILLON_PATTERNS, getVivillonSpriteUrl } from './FriendFinderView';
import './VivillonPatternsInteractiveWidget.css';

interface VivillonPatternsInteractiveWidgetProps {
  lang: Language;
}

// Country & region mapping for comprehensive search and card tags
const PATTERN_REGIONS_MAP: Record<string, {
  countries: Record<Language, string[]>;
  tier: 'ultra-rare' | 'rare' | 'common';
}> = {
  sandstorm: {
    tier: 'ultra-rare',
    countries: {
      cs: ['Spojené arabské emiráty (Dubaj)', 'Saúdská Arábie', 'Katar', 'Izrael', 'Omán', 'Kuvajt'],
      en: ['United Arab Emirates (Dubai)', 'Saudi Arabia', 'Qatar', 'Israel', 'Oman', 'Kuwait'],
      ja: ['アラブ首長国連邦（ドバイ）', 'サウジアラビア', 'カタール', 'イスラエル', 'オマーン'],
      ru: ['ОАЭ (Дубай)', 'Саудовская Аравия', 'Катар', 'Израиль', 'Оман', 'Кувейт']
    }
  },
  sun: {
    tier: 'ultra-rare',
    countries: {
      cs: ['Mexiko', 'Madagaskar', 'Severní Austrálie (Darwin)', 'Guatemala'],
      en: ['Mexico', 'Madagascar', 'Northern Australia (Darwin)', 'Guatemala'],
      ja: ['メキシコ', 'マダガスカル', 'オーストラリア北部（ダーウィン）', 'グアテマラ'],
      ru: ['Мексика', 'Мадагаскар', 'Северная Австралия', 'Гватемала']
    }
  },
  ocean: {
    tier: 'ultra-rare',
    countries: {
      cs: ['Havaj (USA)', 'Galapágy (Ekvádor)', 'Réunion'],
      en: ['Hawaii (USA)', 'Galapagos Islands', 'Réunion'],
      ja: ['ハワイ（米国）', 'ガラパゴス諸島', 'レユニオン島'],
      ru: ['Гавайи (США)', 'Галапагосские о-ва', 'Реюньон']
    }
  },
  tundra: {
    tier: 'ultra-rare',
    countries: {
      cs: ['Island', 'Severní Norsko (Tromsø)', 'Hokkaidó (Japonsko)'],
      en: ['Iceland', 'Northern Norway (Tromsø)', 'Hokkaido (Japan)'],
      ja: ['アイスランド', 'ノルウェー北部（トロムソ）', '北海道（日本）'],
      ru: ['Исландия', 'Северная Норвегия', 'Хоккайдо (Япония)']
    }
  },
  'icy-snow': {
    tier: 'ultra-rare',
    countries: {
      cs: ['Grónsko', 'Severní Finsko / Švédsko', 'Severní Kanada (Nunavut)'],
      en: ['Greenland', 'Northern Finland / Sweden', 'Northern Canada (Nunavut)'],
      ja: ['グリーンランド', 'フィンランド・スウェーデン北部', 'カナダ北部'],
      ru: ['Гренландия', 'Северная Финляндия / Швеция', 'Северная Канада']
    }
  },
  savanna: {
    tier: 'rare',
    countries: {
      cs: ['Brazílie', 'Paraguay'],
      en: ['Brazil', 'Paraguay'],
      ja: ['ブラジル', 'パラグアイ'],
      ru: ['Бразилия', 'Парагвай']
    }
  },
  archipelago: {
    tier: 'rare',
    countries: {
      cs: ['Karibské ostrovy', 'Portoriko', 'Dominikánská republika'],
      en: ['Caribbean Islands', 'Puerto Rico', 'Dominican Republic'],
      ja: ['カリブ海諸島', 'プエルトリコ', 'ドミニカ共和国'],
      ru: ['Карибские о-ва', 'Пуэрто-Рико', 'Доминиканская Респ.']
    }
  },
  river: {
    tier: 'rare',
    countries: {
      cs: ['Jižní Austrálie', 'Nový Jižní Wales', 'Jihoafrická republika', 'Egypt'],
      en: ['Southern Australia', 'New South Wales', 'South Africa', 'Egypt'],
      ja: ['オーストラリア南部', 'ニューサウスウェールズ', '南アフリカ', 'エジプト'],
      ru: ['Южная Австралия', 'ЮАР', 'Египет']
    }
  },
  monsoon: {
    tier: 'rare',
    countries: {
      cs: ['Tchaj-wan', 'Hongkong', 'Thajsko', 'Vietnam', 'Indie'],
      en: ['Taiwan', 'Hong Kong', 'Thailand', 'Vietnam', 'India'],
      ja: ['台湾', '香港', 'タイ', 'ベトナム', 'インド'],
      ru: ['Тайвань', 'Гонконг', 'Таиланд', 'Вьетнам', 'Индия']
    }
  },
  continental: {
    tier: 'common',
    countries: {
      cs: ['Česká republika', 'Slovensko', 'Polsko', 'Německo', 'Rakousko', 'Argentina'],
      en: ['Czech Republic', 'Slovakia', 'Poland', 'Germany', 'Austria', 'Argentina'],
      ja: ['チェコ', 'スロバキア', 'ポーランド', 'ドイツ', 'オーストリア', 'アルゼンチン'],
      ru: ['Чехия', 'Словакия', 'Польша', 'Германия', 'Австрия', 'Аргентина']
    }
  },
  meadow: {
    tier: 'common',
    countries: {
      cs: ['Francie', 'Itálie', 'Švýcarsko'],
      en: ['France', 'Italy', 'Switzerland'],
      ja: ['フランス', 'イタリア', 'スイス'],
      ru: ['Франция', 'Италия', 'Швейцария']
    }
  },
  garden: {
    tier: 'common',
    countries: {
      cs: ['Velká Británie', 'Irsko', 'Nový Zéland'],
      en: ['United Kingdom', 'Ireland', 'New Zealand'],
      ja: ['イギリス', 'アイルランド', 'ニュージーランド'],
      ru: ['Великобритания', 'Ирландия', 'Новая Зеландия']
    }
  },
  marine: {
    tier: 'common',
    countries: {
      cs: ['Španělsko', 'Portugalsko', 'Řecko', 'Chile'],
      en: ['Spain', 'Portugal', 'Greece', 'Chile'],
      ja: ['スペイン', 'ポルトガル', 'ギリシャ', 'チリ'],
      ru: ['Испания', 'Португалия', 'Греция', 'Чили']
    }
  },
  'high-plains': {
    tier: 'common',
    countries: {
      cs: ['Západ USA (Kalifornie, Nevada)', 'Mexiko (vnitrozemí)', 'Východní Evropa'],
      en: ['Western USA (California, Nevada)', 'Inland Mexico', 'Eastern Europe'],
      ja: ['米国西部（カリフォルニア、ネバダ等）', '東欧'],
      ru: ['Запад США (Калифорния, Невада)', 'Восточная Европа']
    }
  },
  modern: {
    tier: 'common',
    countries: {
      cs: ['Východ a jih USA (Texas, Florida, New York)'],
      en: ['Eastern & Southern USA (Texas, Florida, New York)'],
      ja: ['米国東部・南部（テキサス、フロリダ、NY等）'],
      ru: ['Восток и Юг США (Техас, Флорида, Нью-Йорк)']
    }
  },
  polar: {
    tier: 'common',
    countries: {
      cs: ['Kanada', 'Aljaška (USA)', 'Švédsko', 'Norsko'],
      en: ['Canada', 'Alaska (USA)', 'Sweden', 'Norway'],
      ja: ['カナダ', 'アラスカ（米国）', 'スウェーデン', 'ノルウェー'],
      ru: ['Канада', 'Аляска (США)', 'Швеция', 'Норвегия']
    }
  },
  elegant: {
    tier: 'common',
    countries: {
      cs: ['Japonsko (Honšú, Šikoku, Kjúšú)'],
      en: ['Japan (Honshu, Shikoku, Kyushu)'],
      ja: ['日本（本州・四国・九州）'],
      ru: ['Япония']
    }
  },
  jungle: {
    tier: 'common',
    countries: {
      cs: ['Singapur', 'Malajsie', 'Indonésie', 'Kolumbie', 'Kostarika'],
      en: ['Singapore', 'Malaysia', 'Indonesia', 'Colombia', 'Costa Rica'],
      ja: ['シンガポール', 'マレーシア', 'インドネシア', 'コロンビア'],
      ru: ['Сингапур', 'Малайзия', 'Индонезия', 'Колумбия']
    }
  }
};

export const VivillonPatternsInteractiveWidget: React.FC<VivillonPatternsInteractiveWidgetProps> = ({ lang }) => {
  const [filterTier, setFilterTier] = useState<'all' | 'ultra-rare' | 'rare' | 'common'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
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

  const filteredPatterns = useMemo(() => {
    return VIVILLON_PATTERNS.filter(pat => {
      const meta = PATTERN_REGIONS_MAP[pat.id];
      const tier = meta?.tier || (pat.rare ? 'ultra-rare' : 'common');

      if (filterTier !== 'all' && tier !== filterTier) {
        return false;
      }

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const idMatch = pat.id.toLowerCase().includes(q);
      const nameMatch = (pat.name[lang] || pat.name.en || '').toLowerCase().includes(q);
      const countriesList = meta?.countries[lang] || meta?.countries.en || [];
      const countryMatch = countriesList.some(c => c.toLowerCase().includes(q));

      return idMatch || nameMatch || countryMatch;
    });
  }, [filterTier, searchQuery, lang]);

  return (
    <div className="vivillon-widget-container">
      {/* Hero Header */}
      <div className="vivillon-hero-header">
        <div className="vivillon-hero-badge">
          <Globe size={16} />
          <span>VIVILLON WORLD ATLAS & POSTCARD SCANNER</span>
        </div>
        <h2>
          {lang === 'cs' ? 'Všech 18 Vzorů Vivillona: Interaktivní Mapa & Postcard Triky' :
           lang === 'ja' ? 'ビビヨン全18模様の出現地域・ピン留め裏技・Hundoチェッカー' :
           lang === 'ru' ? 'Все 18 узоров Вивиллона: Интерактивная карта и открытки' :
           'All 18 Vivillon Wing Patterns: Interactive Atlas & Pinning Mastery'}
        </h2>
        <p>
          {lang === 'cs' ? 'Kompletní encyklopedie všech regionálních vzorů, trik Pin & Unpin proti přeplnění alba a kontrola 100% IV Hundo pro Scatterbuga (204 CP).' :
           lang === 'ja' ? '世界18種類のビビヨンの羽模様、ポストカード所持枠を圧迫しないピン留め裏技、100%個体値（204 CP）チェッカー。' :
           lang === 'ru' ? 'Полная энциклопедия всех 18 региональных узоров, трюк Pin & Unpin для сохранения памяти и проверка 100% IV сотки (204 CP).' :
           'Complete encyclopedia of all 18 worldwide patterns, the instant Pin & Unpin storage-saving trick, and 100% IV Hundo check (204 CP).'}
        </p>

        {/* Pin & Unpin Strategy Card */}
        <div className="pin-unpin-master-card">
          <div className="trick-title-row">
            <Sparkles size={18} color="#facc15" />
            <strong>
              {lang === 'cs' ? '⚡ TRIK: JAK PŘIPÍNAT BEZ PŘEPLNĚNÍ ALBA (PIN & UNPIN):' :
               lang === 'ja' ? '⚡ ポストカード枠を消費しない「即ピン留め解除」裏技：' :
               lang === 'ru' ? '⚡ ТРЮК: PIN & UNPIN БЕЗ ПЕРЕПОЛНЕНИЯ АЛЬБОМА:' :
               '⚡ MASTER TRICK: INSTANT PIN & UNPIN (NEVER OVERFLOW POSTCARDS):'}
            </strong>
          </div>
          <div className="pin-steps-grid">
            <div className="pin-step-item">
              <span className="step-number">1</span>
              <div className="step-text">
                <strong>{lang === 'cs' ? 'Otevřete dárek od přítele' : 'Open friend gift'}</strong>
                <span>{lang === 'cs' ? 'Před otevřením klikněte na ikonu špendlíku (📌 Pin).' : 'Tap the 📌 Pin button next to Open.'}</span>
              </div>
            </div>
            <div className="pin-step-item">
              <span className="step-number">2</span>
              <div className="step-text">
                <strong>{lang === 'cs' ? 'Zápočet proběhne ihned' : 'Instant Credit'}</strong>
                <span>{lang === 'cs' ? 'Medailový čítač Scatterbuga se okamžitě navýší o +1.' : 'Scatterbug medal instantly increments +1.'}</span>
              </div>
            </div>
            <div className="pin-step-item">
              <span className="step-number">3</span>
              <div className="step-text">
                <strong>{lang === 'cs' ? 'Ihned odepnout (Unpin)' : 'Immediately Unpin'}</strong>
                <span>{lang === 'cs' ? 'Klepněte na špendlík znovu – pohlednice se smaže z alba, ale postup zůstane!' : 'Tap the pin again to remove it from your book. Credit is kept forever!'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Postcard Milestone & Hundo Stats Bar */}
      <div className="vivillon-stats-bar">
        <div className="milestone-counter-card">
          <div className="milestone-title">
            <Award size={18} color="#38bdf8" />
            <strong>{lang === 'cs' ? 'Milníky pro Encounter Scatterbuga' : 'Scatterbug Encounter Milestones'}</strong>
          </div>
          <div className="milestone-chips-row">
            <div className="milestone-chip">
              <span className="chip-badge">1. Medaile</span>
              <span className="chip-val">3 {lang === 'cs' ? 'Pohlednice' : 'Cards'}</span>
            </div>
            <span className="chip-arrow">➔</span>
            <div className="milestone-chip">
              <span className="chip-badge">2. Medaile</span>
              <span className="chip-val">9 {lang === 'cs' ? 'Pohlednic' : 'Cards'}</span>
            </div>
            <span className="chip-arrow">➔</span>
            <div className="milestone-chip highlight">
              <span className="chip-badge">3.+ Medaile</span>
              <span className="chip-val">15 {lang === 'cs' ? 'Pohlednic' : 'Cards'}</span>
            </div>
          </div>
        </div>

        <div className="hundo-metric-card">
          <div className="hundo-header">
            <Star size={18} color="#facc15" fill="#facc15" />
            <strong>{lang === 'cs' ? 'Scatterbug 100% IV (Hundo)' : 'Scatterbug 100% IV Hundo'}</strong>
          </div>
          <div className="hundo-values">
            <div className="hundo-cp-box">
              <span className="hundo-cp-num">204 CP</span>
              <span className="hundo-cp-label">Level 15 (15/15/15)</span>
            </div>
            <div className="hundo-floor-box">
              <span className="hundo-floor-num">170 CP</span>
              <span className="hundo-floor-label">Min floor (10/10/10)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Atlas Card */}
      <div className="vivillon-atlas-panel">
        <div className="atlas-controls-row">
          <div className="vivillon-search-input-wrap">
            <Search size={18} color="#94a3b8" />
            <input 
              type="text" 
              placeholder={lang === 'cs' ? 'Hledat zemi nebo vzor (např. Dubaj, Island, Sandstorm, Japonsko...)' : 'Search country or pattern (e.g. Dubai, Iceland, Sandstorm, Japan...)'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="vivillon-search-input"
            />
          </div>

          <div className="tier-filter-tabs">
            <button 
              type="button" 
              className={`tier-tab-btn ${filterTier === 'all' ? 'active' : ''}`}
              onClick={() => setFilterTier('all')}
            >
              {lang === 'cs' ? 'Všech 18 Vzorů' : 'All 18 Patterns'}
            </button>
            <button 
              type="button" 
              className={`tier-tab-btn ${filterTier === 'ultra-rare' ? 'active' : ''}`}
              onClick={() => setFilterTier('ultra-rare')}
            >
              <Flame size={14} color="#f97316" />
              <span>{lang === 'cs' ? '👑 Ultra Vzácné (5)' : '👑 Ultra-Rare (5)'}</span>
            </button>
            <button 
              type="button" 
              className={`tier-tab-btn ${filterTier === 'rare' ? 'active' : ''}`}
              onClick={() => setFilterTier('rare')}
            >
              <Star size={14} color="#eab308" />
              <span>{lang === 'cs' ? '⭐ Vzácné (4)' : '⭐ Rare (4)'}</span>
            </button>
            <button 
              type="button" 
              className={`tier-tab-btn ${filterTier === 'common' ? 'active' : ''}`}
              onClick={() => setFilterTier('common')}
            >
              <span>{lang === 'cs' ? 'Běžné (9)' : 'Common (9)'}</span>
            </button>
          </div>
        </div>

        {/* Pattern Cards Grid */}
        <div className="vivillon-patterns-grid">
          {filteredPatterns.map(pat => {
            const meta = PATTERN_REGIONS_MAP[pat.id];
            const countries = meta?.countries[lang] || meta?.countries.en || [];
            const tier = meta?.tier || (pat.rare ? 'ultra-rare' : 'common');

            return (
              <div key={pat.id} className={`vivillon-pattern-card tier-${tier}`}>
                <div className="pattern-header-line">
                  <div className="pattern-title-wrap">
                    <span className="pattern-emoji">{pat.emoji}</span>
                    <strong className="pattern-name">{pat.name[lang] || pat.name.en}</strong>
                  </div>
                  <span className={`pattern-tier-tag ${tier}`}>
                    {tier === 'ultra-rare' ? (lang === 'cs' ? '👑 ULTRA VZÁCNÝ' : '👑 ULTRA RARE') :
                     tier === 'rare' ? (lang === 'cs' ? '⭐ VZÁCNÝ' : '⭐ RARE') :
                     (lang === 'cs' ? 'BĚŽNÝ' : 'COMMON')}
                  </span>
                </div>

                <div className="pattern-sprite-stage">
                  <img 
                    src={getVivillonSpriteUrl(pat.id)} 
                    alt={pat.id} 
                    className="vivillon-3d-model" 
                    loading="lazy" 
                  />
                  <span className="pattern-id-slug">{pat.id.toUpperCase()}</span>
                </div>

                <div className="pattern-countries-box">
                  <div className="countries-label">
                    <MapPin size={13} color="#38bdf8" />
                    <span>{lang === 'cs' ? 'Klíčové země a teritoria:' : 'Key territories:'}</span>
                  </div>
                  <div className="countries-chips">
                    {countries.slice(0, 4).map((c, i) => (
                      <span key={i} className="country-chip">{c}</span>
                    ))}
                    {countries.length > 4 && (
                      <span className="country-chip more">+{countries.length - 4}</span>
                    )}
                  </div>
                </div>

                <div className="pattern-evolution-strip">
                  <div className="evo-step">
                    <span>Scatterbug</span>
                  </div>
                  <ArrowRight size={13} color="#94a3b8" />
                  <div className="evo-step">
                    <span>Spewpa (25🍬)</span>
                  </div>
                  <ArrowRight size={13} color="#94a3b8" />
                  <div className="evo-step highlight">
                    <span>Vivillon (100🍬)</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 1-Click Search Operators Panel */}
      <div className="vivillon-search-panel">
        <div className="panel-header">
          <Copy size={18} color="#facc15" />
          <h3>
            {lang === 'cs' ? '1-Click Vyhledávací Filtry do Hry (Scatterbug & Vivillon)' :
             lang === 'ja' ? 'コフキムシ・ビビヨン用ワンタップ検索コマンド' :
             lang === 'ru' ? 'Быстрые поисковые фильтры для Scatterbug и Vivillon' :
             '1-Click Postcard & Vivillon In-Game Search Filters'}
          </h3>
        </div>

        <div className="search-buttons-grid">
          <div className="search-action-card">
            <div className="search-info">
              <code>scatterbug</code>
              <span>{lang === 'cs' ? 'Všichni chycení Scatterbugové čekající na vývoj' : 'All caught Scatterbugs awaiting evolution'}</span>
            </div>
            <button 
              type="button" 
              className="copy-filter-btn"
              onClick={() => handleCopy('scatterbug', 'scatterbug')}
            >
              {copiedKey === 'scatterbug' ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
              <span>{copiedKey === 'scatterbug' ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
            </button>
          </div>

          <div className="search-action-card">
            <div className="search-info">
              <code>evolve&scatterbug</code>
              <span>{lang === 'cs' ? 'Scatterbugové, které můžete ihned vyvinout (máte dostatek Candy)' : 'Scatterbugs ready to evolve right now'}</span>
            </div>
            <button 
              type="button" 
              className="copy-filter-btn"
              onClick={() => handleCopy('evolve&scatterbug', 'evolve&scatterbug')}
            >
              {copiedKey === 'evolve&scatterbug' ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
              <span>{copiedKey === 'evolve&scatterbug' ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
            </button>
          </div>

          <div className="search-action-card">
            <div className="search-info">
              <code>cp204&scatterbug</code>
              <span>{lang === 'cs' ? 'Garantovaný 100% IV Hundo z medailového encounteru' : 'Guaranteed 100% IV Hundo from medal encounter'}</span>
            </div>
            <button 
              type="button" 
              className="copy-filter-btn"
              onClick={() => handleCopy('cp204&scatterbug', 'cp204&scatterbug')}
            >
              {copiedKey === 'cp204&scatterbug' ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
              <span>{copiedKey === 'cp204&scatterbug' ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
            </button>
          </div>

          <div className="search-action-card">
            <div className="search-info">
              <code>4*&scatterbug,spewpa,vivillon</code>
              <span>{lang === 'cs' ? 'Všichni perfektní 4★ zástupci celé rodiny' : 'All perfect 4★ specimens of the entire family'}</span>
            </div>
            <button 
              type="button" 
              className="copy-filter-btn"
              onClick={() => handleCopy('4*&scatterbug,spewpa,vivillon', '4*family')}
            >
              {copiedKey === '4*family' ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
              <span>{copiedKey === '4*family' ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
