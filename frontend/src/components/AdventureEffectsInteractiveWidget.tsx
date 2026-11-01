'use client';

import React, { useState, useMemo } from 'react';
import type { Language } from '../data/translations';
import { 
  Sparkles, 
  Clock, 
  Hourglass, 
  Compass, 
  Swords, 
  Copy, 
  Check, 
  Zap, 
  ShieldAlert, 
  Coins, 
  Flame, 
  Search,
  Layers,
  ChevronRight
} from 'lucide-react';
import { ADVENTURE_EFFECT_ITEMS, type AdventureEffectItem } from '../data/adventureEffectsData';
import { getPokemonIconUrl, handlePokemonImageError } from '../utils/imageResolver';
import './AdventureEffectsInteractiveWidget.css';

interface AdventureEffectsInteractiveWidgetProps {
  lang: Language;
}

export const AdventureEffectsInteractiveWidget: React.FC<AdventureEffectsInteractiveWidgetProps> = ({ lang }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'time-space' | 'sun-moon' | 'combat'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [calcDurationMin, setCalcDurationMin] = useState<number>(60); // 10, 30, 60, 120, 1440 (24h)
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

  const filteredEffects = useMemo(() => {
    return ADVENTURE_EFFECT_ITEMS.filter(item => {
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const nameMatch = (item.name[lang] || item.name.en || '').toLowerCase().includes(q);
      const moveMatch = (item.move.name[lang] || item.move.name.en || '').toLowerCase().includes(q);
      const effectMatch = (item.effect[lang] || item.effect.en || '').toLowerCase().includes(q);

      return nameMatch || moveMatch || effectMatch;
    });
  }, [activeCategory, searchQuery, lang]);

  // Standard multiplier based on 10 min base increment (e.g. 60 min = 6x base cost)
  const multiplier = Math.max(1, Math.round(calcDurationMin / 10));

  return (
    <div className="adventure-effects-widget-container">
      {/* Hero Header */}
      <div className="adventure-hero-header">
        <div className="adventure-badge-pill">
          <Sparkles size={16} />
          <span>FIELD-ALTERING ADVENTURE EFFECTS MASTER ROSTER</span>
        </div>
        <h2>
          {lang === 'cs' ? 'Dobrodružné Efekty (Adventure Effects): Interaktivní Roster & Kalkulačka' :
           lang === 'ja' ? 'アドベンチャーエフェクト完全図鑑＆発動コストシミュレーター' :
           lang === 'ru' ? 'Adventure Effects: Интерактивный ростер и калькулятор' :
           'Adventure Effects: Interactive Roster & Duration Cost Calculator'}
        </h2>
        <p>
          {lang === 'cs' ? 'Kompletní přehled všech 11 Pokémonů se schopnostmi na mapě: Zmrazení časovačů předmětů (Roar of Time), 4× větší dosah (Spacial Rend), denní/noční evoluce a raid buffy.' :
           lang === 'ja' ? '全11匹のフィールド能力完全網羅：おこう・ほしのかけら時間停止（ときのほうこう）、捕獲サークル4倍（あくうせつだん）、昼夜進化解放、レイド強化。' :
           lang === 'ru' ? 'Полный обзор 11 покемонов с эффектами на карте: Заморозка таймеров (Roar of Time), 4x радиус (Spacial Rend), день/ночь эволюции и рейдовые усиления.' :
           'Exhaustive guide to all 11 field-altering signature moves: Item timer freezing (Roar of Time), 4x catch radius (Spacial Rend), day/night manipulation, and raid damage boosts.'}
        </p>

        {/* Interactive Duration Cost Calculator */}
        <div className="adventure-cost-calculator-card">
          <div className="calc-header-row">
            <Hourglass size={18} color="#facc15" />
            <strong>
              {lang === 'cs' ? 'Kalkulačka nákladů aktivace (Stohování až na 24 hodin):' :
               lang === 'ja' ? '発動時間＆必要コスト計算機（最大24時間スタック可能）：' :
               lang === 'ru' ? 'Калькулятор стоимости активации (стак до 24 часов):' :
               'Adventure Effect Duration & Resource Cost Calculator (Up to 24h Cap):'}
            </strong>
          </div>

          <div className="duration-selector-row">
            <span className="duration-label">{lang === 'cs' ? 'Požadovaná doba:' : 'Target Duration:'}</span>
            <div className="duration-chips">
              {[10, 30, 60, 120, 1440].map(mins => (
                <button
                  key={mins}
                  type="button"
                  className={`duration-chip ${calcDurationMin === mins ? 'active' : ''}`}
                  onClick={() => setCalcDurationMin(mins)}
                >
                  {mins === 1440 ? (lang === 'cs' ? '24 Hodin (Max)' : '24 Hours (Cap)') : `${mins} min`}
                </button>
              ))}
            </div>
          </div>

          <div className="calc-metrics-grid">
            <div className="calc-metric-box">
              <span className="metric-label">{lang === 'cs' ? 'Dialga (Roar of Time)' : 'Dialga (Roar of Time)'}</span>
              <strong className="metric-val">{5000 * multiplier} Stardust + {5 * multiplier} Candy</strong>
              <span className="metric-desc">{lang === 'cs' ? `Zmrazí Incense & Star Piece na ${calcDurationMin} minut` : `Freezes Incense & Star Piece for ${calcDurationMin} mins`}</span>
            </div>
            <div className="calc-metric-box">
              <span className="metric-label">{lang === 'cs' ? 'Palkia (Spacial Rend)' : 'Palkia (Spacial Rend)'}</span>
              <strong className="metric-val">{5000 * multiplier} Stardust + {5 * multiplier} Candy</strong>
              <span className="metric-desc">{lang === 'cs' ? `Zvětší spawn rádius na 80 metrů (${calcDurationMin} min)` : `Expands wild spawn radius to 80m (${calcDurationMin} mins)`}</span>
            </div>
            <div className="calc-metric-box highlight">
              <span className="metric-label">{lang === 'cs' ? 'Zacian (Behemoth Blade)' : 'Zacian (Behemoth Blade)'}</span>
              <strong className="metric-val">{5000 * multiplier} Stardust + {5 * multiplier} Candy</strong>
              <span className="metric-desc">{lang === 'cs' ? `+10% Party Attack v Raidech po celých ${calcDurationMin} minut` : `+10% Party Attack in Raids for ${calcDurationMin} mins`}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls & Filter Panel */}
      <div className="adventure-controls-card">
        <div className="adventure-search-row">
          <div className="adventure-search-wrap">
            <Search size={18} color="#94a3b8" />
            <input 
              type="text" 
              placeholder={lang === 'cs' ? 'Hledat Pokémona, útok nebo efekt (např. Dialga, Roar of Time, Zacian, Necrozma)...' : 'Search Pokémon, move, or effect (e.g. Dialga, Roar of Time, Zacian, Necrozma)...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="adventure-search-input"
            />
          </div>

          <div className="category-filter-tabs">
            <button 
              type="button" 
              className={`cat-tab-btn ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              {lang === 'cs' ? 'Všech 11 Pokémonů' : 'All 11 Pokémon'}
            </button>
            <button 
              type="button" 
              className={`cat-tab-btn ${activeCategory === 'time-space' ? 'active' : ''}`}
              onClick={() => setActiveCategory('time-space')}
            >
              <Hourglass size={14} color="#38bdf8" />
              <span>{lang === 'cs' ? '⏳ Čas & Prostor (4)' : '⏳ Time & Space (4)'}</span>
            </button>
            <button 
              type="button" 
              className={`cat-tab-btn ${activeCategory === 'sun-moon' ? 'active' : ''}`}
              onClick={() => setActiveCategory('sun-moon')}
            >
              <Sparkles size={14} color="#facc15" />
              <span>{lang === 'cs' ? '☀️ Slunce & Měsíc (2)' : '☀️ Sun & Moon (2)'}</span>
            </button>
            <button 
              type="button" 
              className={`cat-tab-btn ${activeCategory === 'combat' ? 'active' : ''}`}
              onClick={() => setActiveCategory('combat')}
            >
              <Swords size={14} color="#ef4444" />
              <span>{lang === 'cs' ? '⚔️ Boj & Max (5)' : '⚔️ Combat & Max (5)'}</span>
            </button>
          </div>
        </div>

        <div className="results-count-bar">
          <span>{lang === 'cs' ? `Zobrazeno ${filteredEffects.length} Pokémonů s Adventure Effectem` : `Showing ${filteredEffects.length} Pokémon with Adventure Effects`}</span>
        </div>
      </div>

      {/* Roster Cards Grid */}
      <div className="adventure-cards-grid">
        {filteredEffects.map(item => (
          <div key={item.id} className="adventure-card">
            <div className="card-top-header">
              <div className="pokemon-avatar-box">
                <img 
                  src={getPokemonIconUrl(item.pokemonSprite || item.id)} 
                  alt={item.name[lang] || item.name.en} 
                  onError={(e) => handlePokemonImageError(e.currentTarget, item.pokemonSprite || item.id)}
                  loading="lazy"
                />
              </div>
              <div className="pokemon-meta-box">
                <div className="name-form-row">
                  <h4>{item.name[lang] || item.name.en}</h4>
                  <span className="form-tag">{item.form[lang] || item.form.en}</span>
                </div>
                <div className="move-badge-row">
                  <span className={`move-badge type-${item.move.type.toLowerCase()}`}>
                    ⚡ {item.move.name[lang] || item.move.name.en}
                  </span>
                  <span className="cost-pill">
                    {item.cost.stardust} Dust • {item.cost.candy} Candy
                  </span>
                </div>
              </div>
            </div>

            <div className="card-effect-body">
              <div className="effect-desc-box">
                <strong className="effect-title">{lang === 'cs' ? 'Efekt na mapě:' : 'Field Effect:'}</strong>
                <p>{item.effect[lang] || item.effect.en}</p>
              </div>

              <div className="protip-box">
                <Zap size={14} color="#facc15" />
                <div className="protip-text">
                  <strong>PRO-TIP:</strong>
                  <span>{item.proTip[lang] || item.proTip.en}</span>
                </div>
              </div>
            </div>

            <div className="card-footer-strip">
              <span className="duration-tag"><Clock size={12} /> {item.cost.duration} / run</span>
              <span className="stack-tag"><Layers size={12} /> {item.maxStack[lang] || item.maxStack.en}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 1-Click Search Operators Panel */}
      <div className="adventure-search-panel">
        <div className="panel-title-row">
          <Copy size={18} color="#facc15" />
          <h3>
            {lang === 'cs' ? '1-Click Vyhledávací Filtry pro Batoh (Adventure Effects)' :
             lang === 'ja' ? 'アドベンチャーエフェクト所持ポケモン検索コマンド' :
             lang === 'ru' ? 'Быстрые поисковые фильтры для хранилища' :
             '1-Click In-Game Search Filters for Adventure Effect Species'}
          </h3>
        </div>

        <div className="search-buttons-grid">
          <div className="search-action-card">
            <div className="search-info">
              <code>dialga&@roar of time</code>
              <span>{lang === 'cs' ? 'Všichni Dialgové s aktivním efektem Roar of Time' : 'All Dialgas with signature Roar of Time move'}</span>
            </div>
            <button 
              type="button" 
              className="copy-chip-btn"
              onClick={() => handleCopy('dialga&@roar of time', 'dialga_rot')}
            >
              {copiedKey === 'dialga_rot' ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
              <span>{copiedKey === 'dialga_rot' ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
            </button>
          </div>

          <div className="search-action-card">
            <div className="search-info">
              <code>palkia&@spacial rend</code>
              <span>{lang === 'cs' ? 'Všichni Palkiové se schopností zvětšit mapový dosah' : 'All Palkias with field expansion Spacial Rend'}</span>
            </div>
            <button 
              type="button" 
              className="copy-chip-btn"
              onClick={() => handleCopy('palkia&@spacial rend', 'palkia_sr')}
            >
              {copiedKey === 'palkia_sr' ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
              <span>{copiedKey === 'palkia_sr' ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
            </button>
          </div>

          <div className="search-action-card">
            <div className="search-info">
              <code>necrozma,zacian,zamazenta,kyurem</code>
              <span>{lang === 'cs' ? 'Bojové a solární/lunární legendy s Adventure Effecty' : 'Combat & Sun/Moon signature legends'}</span>
            </div>
            <button 
              type="button" 
              className="copy-chip-btn"
              onClick={() => handleCopy('necrozma,zacian,zamazenta,kyurem', 'combat_legends')}
            >
              {copiedKey === 'combat_legends' ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
              <span>{copiedKey === 'combat_legends' ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
