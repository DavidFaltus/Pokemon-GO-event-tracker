'use client';

import React, { useState, useMemo } from 'react';
import type { Language } from '../data/translations';
import { 
  Sparkles, 
  CloudRain, 
  Sun, 
  Cloud, 
  Wind, 
  Copy, 
  Check, 
  Calculator, 
  Award,
  Zap,
  TrendingUp,
  Filter
} from 'lucide-react';
import { getPokemonIconUrl, handlePokemonImageError } from '../utils/imageResolver';
import { getPokemonName } from '../utils/pokemonTranslator';
import './ExtraStardustInteractiveWidget.css';

interface ExtraStardustInteractiveWidgetProps {
  lang: Language;
}

type WeatherKey = 'all' | 'partly-cloudy' | 'rainy' | 'snow' | 'windy' | 'fog' | 'cloudy' | 'sunny';

const WEATHER_LABELS: Record<WeatherKey, { icon: string; label: Record<Language, string> }> = {
  'all': {
    icon: '✨',
    label: { cs: 'Všechna počasí', en: 'All Weather', ja: '全天候', ru: 'Вся погода' }
  },
  'partly-cloudy': {
    icon: '⛅',
    label: { cs: 'Polojasno', en: 'Partly Cloudy', ja: 'ときどき曇り', ru: 'Переменная облачность' }
  },
  'rainy': {
    icon: '🌧️',
    label: { cs: 'Déšť', en: 'Rainy', ja: '雨', ru: 'Дождь' }
  },
  'snow': {
    icon: '❄️',
    label: { cs: 'Sníh', en: 'Snow', ja: '雪', ru: 'Снег' }
  },
  'windy': {
    icon: '🌬️',
    label: { cs: 'Větrno', en: 'Windy', ja: '強風', ru: 'Ветрено' }
  },
  'fog': {
    icon: '🌫️',
    label: { cs: 'Mlha', en: 'Fog', ja: '霧', ru: 'Туман' }
  },
  'cloudy': {
    icon: '☁️',
    label: { cs: 'Zataženo', en: 'Cloudy', ja: '曇り', ru: 'Облачно' }
  },
  'sunny': {
    icon: '☀️',
    label: { cs: 'Slunečno', en: 'Sunny / Clear', ja: '晴天', ru: 'Солнечно / Ясно' }
  }
};

const STARDUST_TIERS = [
  {
    base: 2100,
    weatherBoost: 2625,
    starPiece: 3150,
    both: 3938,
    accentClass: 'tier-2100',
    pokemon: [
      { name: 'Audino', weather: ['partly-cloudy'] as WeatherKey[] }
    ]
  },
  {
    base: 1200,
    weatherBoost: 1500,
    starPiece: 1800,
    both: 2250,
    accentClass: 'tier-1200',
    pokemon: [
      { name: 'Cloyster', weather: ['rainy', 'snow'] as WeatherKey[] }
    ]
  },
  {
    base: 1000,
    weatherBoost: 1250,
    starPiece: 1500,
    both: 1875,
    accentClass: 'tier-1000',
    pokemon: [
      { name: 'Shellder', weather: ['rainy'] as WeatherKey[] },
      { name: 'Chimecho', weather: ['windy'] as WeatherKey[] }
    ]
  },
  {
    base: 950,
    weatherBoost: 1188,
    starPiece: 1425,
    both: 1781,
    accentClass: 'tier-950',
    pokemon: [
      { name: 'Alolan Persian', weather: ['fog'] as WeatherKey[] },
      { name: 'Starmie', weather: ['rainy', 'windy'] as WeatherKey[] },
      { name: 'Vespiquen', weather: ['rainy', 'windy'] as WeatherKey[] },
      { name: 'Garbodor', weather: ['cloudy'] as WeatherKey[] }
    ]
  },
  {
    base: 750,
    weatherBoost: 938,
    starPiece: 1125,
    both: 1406,
    accentClass: 'tier-750',
    pokemon: [
      { name: 'Alolan Meowth', weather: ['fog'] as WeatherKey[] },
      { name: 'Staryu', weather: ['rainy'] as WeatherKey[] },
      { name: 'Sableye', weather: ['fog'] as WeatherKey[] },
      { name: 'Combee', weather: ['rainy', 'windy'] as WeatherKey[] },
      { name: 'Trubbish', weather: ['cloudy'] as WeatherKey[] }
    ]
  },
  {
    base: 700,
    weatherBoost: 875,
    starPiece: 1050,
    both: 1312,
    accentClass: 'tier-700',
    pokemon: [
      { name: 'Parasect', weather: ['sunny', 'rainy'] as WeatherKey[] },
      { name: 'Persian', weather: ['partly-cloudy'] as WeatherKey[] },
      { name: 'Breloom', weather: ['sunny', 'cloudy'] as WeatherKey[] },
      { name: 'Amoonguss', weather: ['sunny', 'cloudy'] as WeatherKey[] },
      { name: 'Shiinotic', weather: ['sunny', 'cloudy'] as WeatherKey[] }
    ]
  },
  {
    base: 500,
    weatherBoost: 625,
    starPiece: 750,
    both: 938,
    accentClass: 'tier-500',
    pokemon: [
      { name: 'Paras', weather: ['sunny', 'rainy'] as WeatherKey[] },
      { name: 'Meowth', weather: ['partly-cloudy'] as WeatherKey[] },
      { name: 'Delibird', weather: ['snow', 'windy'] as WeatherKey[] },
      { name: 'Shroomish', weather: ['sunny'] as WeatherKey[] },
      { name: 'Foongus', weather: ['sunny', 'cloudy'] as WeatherKey[] },
      { name: 'Morelull', weather: ['sunny', 'cloudy'] as WeatherKey[] }
    ]
  }
];

export const ExtraStardustInteractiveWidget: React.FC<ExtraStardustInteractiveWidgetProps> = ({ lang }) => {
  const [selectedWeather, setSelectedWeather] = useState<WeatherKey>('all');
  const [starPieceActive, setStarPieceActive] = useState<boolean>(true);
  const [targetCatches, setTargetCatches] = useState<number>(50);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const colLabels = {
    base: { cs: 'Základ', en: 'Base', ja: '基本', ru: 'База' },
    weather: { cs: 'Počasí (+25 %)', en: 'Weather (+25%)', ja: '天候 (+25%)', ru: 'Погода (+25%)' },
    starPiece: { cs: 'Star Piece (+50 %)', en: 'Star Piece (+50%)', ja: 'かけら (+50%)', ru: 'Star Piece (+50%)' },
    both: { cs: 'Počasí + Star Piece', en: 'Weather + Star Piece', ja: '天候＋かけら', ru: 'Погода + Star Piece' }
  };

  // Filter tiers based on selected weather
  const filteredTiers = useMemo(() => {
    if (selectedWeather === 'all') return STARDUST_TIERS;
    return STARDUST_TIERS.map(t => ({
      ...t,
      pokemon: t.pokemon.filter(p => p.weather.includes(selectedWeather))
    })).filter(t => t.pokemon.length > 0);
  }, [selectedWeather]);

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

  const allDustSearchQuery = 'Audino,Shellder,Cloyster,Paras,Parasect,Meowth,Persian,Staryu,Starmie,Foongus,Amoonguss,Shroomish,Breloom,Delibird,Sableye,Combee,Vespiquen,Chimecho,Trubbish,Garbodor,Morelull,Shiinotic';

  return (
    <div className="extra-stardust-widget-container">
      {/* Hero Header */}
      <div className="dust-widget-hero-header">
        <div className="dust-hero-title-group">
          <div className="dust-badge-pill">
            <Sparkles size={16} />
            <span>STARDUST FARMING COMPENDIUM</span>
          </div>
          <h2>
            {lang === 'cs' ? 'Extra Stardust Pokémoni: Kompletní Tabulka & Počasí' :
             lang === 'ja' ? 'ほしのすな増量ポケモン完全名鑑：天候ブースト＆倍率一覧' :
             lang === 'ru' ? 'Покемоны с повышенной пылью: База наград и Weather Boost' :
             'Extra Stardust Pokémon Compendium: Weather Boosts & Multipliers'}
          </h2>
          <p>
            {lang === 'cs' ? 'Kompletní přehled všech 23 druhů s přirozeně zvýšenou odměnou Stardustu (až 3 938 Dustu za 1 Audina se Star Piece) a interaktivní filtr počasí.' :
             lang === 'ja' ? '捕獲時すな増量対象（タブンネ1匹最大3,938砂）の全23種網羅、天候別絞り込みフィルター＆獲得試算。' :
             lang === 'ru' ? 'Полный список всех 23 видов с повышенной пылью (до 3 938 за одного Audino со Star Piece) и фильтр по погоде.' :
             'Complete database of all 23 bonus Stardust species (up to 3,938 Dust per Audino with Star Piece) and interactive weather filters.'}
          </p>
        </div>

        {/* Weather Filter Buttons Row */}
        <div className="weather-filter-buttons-row">
          {(Object.keys(WEATHER_LABELS) as WeatherKey[]).map((wKey) => {
            const w = WEATHER_LABELS[wKey];
            return (
              <button
                key={wKey}
                type="button"
                className={`weather-filter-btn ${selectedWeather === wKey ? 'selected' : ''}`}
                onClick={() => setSelectedWeather(wKey)}
              >
                <span className="weather-btn-icon">{w.icon}</span>
                <span>{w.label[lang]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Grinding Calculator Card */}
      <div className="dust-card-panel">
        <div className="panel-title-bar">
          <Calculator size={20} color="#aa3bff" />
          <h3>
            {lang === 'cs' ? 'Kalkulačka Výnosu ze Sbíraného Hnízda / Grindovací Relace' :
             lang === 'ja' ? '巣・グラインドセッション獲得すな計算機' :
             lang === 'ru' ? 'Калькулятор фарма в гнездах и спотах' :
             'Nest Grinding & Farming Yield Calculator'}
          </h3>
        </div>

        <div className="calculator-controls-grid">
          <div className="calc-slider-box">
            <div className="slider-header-row">
              <span>{lang === 'cs' ? 'Počet chycených Extra Dust pokémonů:' : 'Number of Extra Dust Catches:'}</span>
              <strong className="dust-count-hl">{targetCatches} Pokémonů</strong>
            </div>
            <input 
              type="range"
              min="10"
              max="200"
              step="10"
              value={targetCatches}
              onChange={(e) => setTargetCatches(parseInt(e.target.value, 10))}
              className="dust-range-input"
            />
            <div className="slider-ticks-row">
              <span>10</span>
              <span>50</span>
              <span>100 (Hodinový grind)</span>
              <span>200</span>
            </div>
          </div>

          <div className="calc-yield-results">
            <div className="calc-result-box shellder">
              <span className="res-title">500 Dust (Paras/Meowth)</span>
              <strong className="res-val">{(targetCatches * (starPieceActive ? 750 : 500)).toLocaleString()} Dust</strong>
            </div>
            <div className="calc-result-box cloyster">
              <span className="res-title">1 000 Dust (Shellder)</span>
              <strong className="res-val">{(targetCatches * (starPieceActive ? 1500 : 1000)).toLocaleString()} Dust</strong>
            </div>
            <div className="calc-result-box audino">
              <span className="res-title">2 100 Dust (Audino) 💎</span>
              <strong className="res-val gold">{(targetCatches * (starPieceActive ? 3150 : 2100)).toLocaleString()} Dust!</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Tier Breakdown Cards */}
      <div className="stardust-tiers-stack">
        {filteredTiers.map((tier) => (
          <div key={tier.base} className={`stardust-tier-card ${tier.accentClass}`}>
            <div className="stardust-tier-header">
              <div className="stardust-tier-title-badge">
                <Sparkles size={18} />
                <span>{tier.base.toLocaleString()} Stardust</span>
              </div>
              <div className="stardust-tier-summary-pills">
                <div className="stardust-stat-pill">
                  <span className="pill-label">{colLabels.base[lang]}</span>
                  <strong className="pill-value">{tier.base.toLocaleString()}</strong>
                </div>
                <div className="stardust-stat-pill">
                  <span className="pill-label">{colLabels.weather[lang]}</span>
                  <strong className="pill-value cyan-val">{tier.weatherBoost.toLocaleString()}</strong>
                </div>
                <div className="stardust-stat-pill">
                  <span className="pill-label">{colLabels.starPiece[lang]}</span>
                  <strong className="pill-value purple-val">{tier.starPiece.toLocaleString()}</strong>
                </div>
                <div className="stardust-stat-pill highlight-both">
                  <span className="pill-label">{colLabels.both[lang]}</span>
                  <strong className="pill-value gold-hundo-text">{tier.both.toLocaleString()}</strong>
                </div>
              </div>
            </div>

            <div className="stardust-pokemon-grid">
              {tier.pokemon.map((pkm) => (
                <div key={pkm.name} className="stardust-pokemon-item-card">
                  <div className="stardust-pkm-top">
                    <div className="stardust-pkm-avatar-wrap">
                      <img
                        src={getPokemonIconUrl(pkm.name)}
                        alt={getPokemonName(pkm.name, lang)}
                        className="stardust-pkm-avatar"
                        onError={(e) => handlePokemonImageError(e.currentTarget, pkm.name)}
                        loading="lazy"
                      />
                    </div>
                    <div className="stardust-pkm-identity">
                      <strong className="stardust-pkm-name">{getPokemonName(pkm.name, lang)}</strong>
                      <div className="stardust-weather-badges">
                        {pkm.weather.map((wKey) => (
                          <span key={wKey} className={`stardust-weather-chip weather-${wKey}`}>
                            <span className="weather-emoji">{WEATHER_LABELS[wKey]?.icon}</span>
                            <span>{WEATHER_LABELS[wKey]?.label[lang]}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="stardust-pkm-payout-row">
                    <div className="payout-cell">
                      <span className="payout-label">{colLabels.base[lang]}</span>
                      <span className="payout-val">{tier.base.toLocaleString()}</span>
                    </div>
                    <div className="payout-cell">
                      <span className="payout-label">{colLabels.weather[lang]}</span>
                      <span className="payout-val cyan-val">{tier.weatherBoost.toLocaleString()}</span>
                    </div>
                    <div className="payout-cell">
                      <span className="payout-label">{colLabels.starPiece[lang]}</span>
                      <span className="payout-val purple-val">{tier.starPiece.toLocaleString()}</span>
                    </div>
                    <div className="payout-cell best-cell">
                      <span className="payout-label">{colLabels.both[lang]}</span>
                      <span className="payout-val gold-hundo-text">{tier.both.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 1-Click Search Operators */}
      <div className="dust-card-panel">
        <div className="panel-title-bar">
          <Copy size={20} color="#facc15" />
          <h3>
            {lang === 'cs' ? 'Vyhledávací Řetězce pro Všechny Extra Stardust Druhy' :
             lang === 'ja' ? 'ほしのすな増量ポケモン全種一括検索コマンド' :
             lang === 'ru' ? 'Поисковые строки для всех покемонов с пылью' :
             'All Extra Stardust Species Search Operators'}
          </h3>
        </div>

        <div className="dust-searches-grid">
          <div className="search-code-card">
            <div className="search-meta">
              <strong>{allDustSearchQuery}</strong>
              <span>{lang === 'cs' ? 'Filtruje všech 23 druhů se zvýšeným Stardustem' : 'Filters all 23 bonus Stardust species in storage'}</span>
            </div>
            <button 
              type="button" 
              className="copy-chip-btn"
              onClick={() => handleCopy(allDustSearchQuery, 'alldust')}
            >
              {copiedKey === 'alldust' ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
              <span>{copiedKey === 'alldust' ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
