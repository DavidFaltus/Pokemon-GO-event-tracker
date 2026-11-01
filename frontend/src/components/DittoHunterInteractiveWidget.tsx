'use client';

import React, { useState } from 'react';
import type { Language } from '../data/translations';
import { 
  Sparkles, 
  HelpCircle, 
  Copy, 
  Check, 
  Search, 
  ShieldAlert, 
  Zap, 
  RefreshCw,
  Info
} from 'lucide-react';
import './DittoHunterInteractiveWidget.css';

interface DittoHunterInteractiveWidgetProps {
  lang: Language;
}

interface DisguiseSpecies {
  name: string;
  dexId: number;
  types: string[];
  normalBcr: number; // e.g. 60%
  dittoBcr: number; // always 16%
}

const CURRENT_DISGUISES: DisguiseSpecies[] = [
  { name: 'Oddish', dexId: 43, types: ['Grass', 'Poison'], normalBcr: 60, dittoBcr: 16 },
  { name: 'Koffing', dexId: 109, types: ['Poison'], normalBcr: 50, dittoBcr: 16 },
  { name: 'Goldeen', dexId: 118, types: ['Water'], normalBcr: 50, dittoBcr: 16 },
  { name: 'Spinarak', dexId: 167, types: ['Bug', 'Poison'], normalBcr: 50, dittoBcr: 16 },
  { name: 'Numel', dexId: 322, types: ['Fire', 'Ground'], normalBcr: 50, dittoBcr: 16 },
  { name: 'Bidoof', dexId: 399, types: ['Normal'], normalBcr: 50, dittoBcr: 16 },
  { name: 'Roggenrola', dexId: 524, types: ['Rock'], normalBcr: 50, dittoBcr: 16 },
  { name: 'Bergmite', dexId: 712, types: ['Ice'], normalBcr: 50, dittoBcr: 16 },
  { name: 'Stufful', dexId: 759, types: ['Normal', 'Fighting'], normalBcr: 40, dittoBcr: 16 }
];

export const DittoHunterInteractiveWidget: React.FC<DittoHunterInteractiveWidgetProps> = ({ lang }) => {
  const [selectedSpecies, setSelectedSpecies] = useState<DisguiseSpecies>(CURRENT_DISGUISES[0]);
  const [isCatching, setIsCatching] = useState<boolean>(false);
  const [transformResult, setTransformResult] = useState<'regular' | 'shiny' | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleSimulateCatch = () => {
    setIsCatching(true);
    setTransformResult(null);
    setTimeout(() => {
      // 1 in 64 shiny chance
      const isShiny = Math.random() < 0.25; // Boosted in simulator for fun engagement
      setTransformResult(isShiny ? 'shiny' : 'regular');
      setIsCatching(false);
    }, 1200);
  };

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

  const searchDisguisesAll = CURRENT_DISGUISES.map(d => d.name).join(',');

  return (
    <div className="ditto-hunter-widget-container">
      {/* Hero Header */}
      <div className="ditto-widget-hero-header">
        <div className="ditto-hero-title-group">
          <div className="ditto-badge-pill">
            <Sparkles size={16} />
            <span>DITTO ENCOUNTER RADAR & SIMULATOR</span>
          </div>
          <h2>
            {lang === 'cs' ? 'Ditto Lovecký Radar: BCR Analýza & Simulátor Proměny' :
             lang === 'ja' ? 'メタモン捕獲シミュレータ＆捕獲率（BCR）解析' :
             lang === 'ru' ? 'Радар Дитто: Анализ BCR и симулятор превращения' :
             'Ditto Hunting Radar: BCR Circle Tell & Transformation Simulator'}
          </h2>
          <p>
            {lang === 'cs' ? 'Odhalte Ditta ještě před hodem díky anomálii v obtížnosti kruhu (BCR 16 % namísto 50–60 %) a otestujte simulátor proměny.' :
             lang === 'ja' ? '捕獲サークルの色変化（通常50〜60%がメタモン時は16%に急落）による見分け方と変身演出シミュレータ。' :
             lang === 'ru' ? 'Как распознать Дитто до броска по аномалии круга поимки (BCR 16% вместо 50-60%) и симулятор превращения.' :
             'Detect disguised Dittos before throwing via the 16% Base Catch Rate ring color tell and test the live transformation simulator.'}
          </p>
        </div>

        {/* Golden Rule Callout Banner */}
        <div className="ditto-golden-rule-banner">
          <ShieldAlert size={20} color="#facc15" />
          <div className="banner-text">
            <strong>
              {lang === 'cs' ? 'ZLATÉ PRAVIDLO SHINY DITTA:' :
               lang === 'ja' ? '色違いメタモンの絶対ルール：' :
               lang === 'ru' ? 'ЗОЛОТОЕ ПРАВИЛО SHINY ДИТТО:' :
               'THE GOLDEN SHINY DITTO RULE:'}
            </strong>
            <span>
              {lang === 'cs' 
                ? 'Pokud je divoký Pokémon na mapě sám o sobě Shiny (např. třpytivý Koffing), NIKDY se z něj nestane Ditto! Ditto se promění POUZE z běžného netřpytivého pokémona.'
                : 'If a wild disguise sparkles as Shiny itself (e.g. a shiny Koffing), it will NEVER be Ditto! Shiny Ditto only hatches from standard non-shiny disguises.'}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive BCR & Catch Simulator Card */}
      <div className="ditto-card-panel">
        <div className="panel-title-bar">
          <Zap size={20} color="#aa3bff" />
          <h3>
            {lang === 'cs' ? 'Kruhový Paradox: Jak poznat Ditta před hodem míčku' :
             lang === 'ja' ? '捕獲リングのパラドックス：ボールを投げる前の見分け方' :
             lang === 'ru' ? 'Парадокс кольца: Как распознать Дитто до броска' :
             'The Catch Ring Paradox: Detecting Ditto Prior to Throwing'}
          </h3>
        </div>

        <p className="panel-desc">
          {lang === 'cs' 
            ? 'Vyberte přestrojeného Pokémona a sledujte rozdíl v obtížnosti odchytu. Zatímco běžný Pokémon má zelený kruh (50–60 % šance), Ditto přebírá svou pevnou nízkou šanci 16 % (oranžový až červený kruh)!'
            : 'Select a disguise species to inspect the ring color anomaly. While the normal species yields a comfortable green ring (50–60% BCR), a disguised Ditto retains its strict 16% BCR (dark orange/red ring)!'}
        </p>

        {/* Species Selector Chips */}
        <div className="species-chips-row">
          {CURRENT_DISGUISES.map((sp) => (
            <button
              key={sp.name}
              type="button"
              className={`species-chip-btn ${selectedSpecies.name === sp.name ? 'selected' : ''}`}
              onClick={() => { setSelectedSpecies(sp); setTransformResult(null); }}
            >
              <img 
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${sp.dexId}.png`}
                alt={sp.name}
                className="chip-artwork"
              />
              <span>{sp.name}</span>
            </button>
          ))}
        </div>

        {/* Ring Color Comparison Display */}
        <div className="ring-comparison-container">
          <div className="ring-side normal">
            <span className="ring-side-title">{lang === 'cs' ? `Běžný ${selectedSpecies.name}` : `Standard ${selectedSpecies.name}`}</span>
            <div className="catch-circle-visual green">
              <span className="ring-percent">{selectedSpecies.normalBcr}% BCR</span>
              <span className="ring-color-tag green">{lang === 'cs' ? 'ZELENÝ KRUH' : 'GREEN RING'}</span>
            </div>
            <p>{lang === 'cs' ? 'Běžný snadný odchyt s Poké Ballem.' : 'Normal easy catch with standard Poké Ball.'}</p>
          </div>

          <div className="versus-pill">VS</div>

          <div className="ring-side ditto">
            <span className="ring-side-title">{lang === 'cs' ? `Zamaskovaný DITTO!` : `Disguised DITTO!`}</span>
            <div className="catch-circle-visual orange-red">
              <span className="ring-percent">16% BCR</span>
              <span className="ring-color-tag red">{lang === 'cs' ? 'ORANŽOVO-ČERVENÝ!' : 'ORANGE / RED!'}</span>
            </div>
            <p>{lang === 'cs' ? 'Podezřele tvrdý odpor u slabého Pokémona!' : 'Suspiciously dark ring on a low CP spawn!'}</p>
          </div>
        </div>

        {/* Catch Test Simulator */}
        <div className="simulator-action-strip">
          <button
            type="button"
            className="simulate-throw-btn"
            onClick={handleSimulateCatch}
            disabled={isCatching}
          >
            {isCatching ? (
              <>
                <RefreshCw size={18} className="spinner-icon" />
                <span>{lang === 'cs' ? 'Míček se třese... (Gotcha!)' : 'Ball rocking... (Gotcha!)'}</span>
              </>
            ) : (
              <>
                <Zap size={18} />
                <span>{lang === 'cs' ? `Chytit ${selectedSpecies.name} a otestovat Ditta!` : `Catch ${selectedSpecies.name} & Test for Ditto!`}</span>
              </>
            )}
          </button>

          {transformResult && (
            <div className={`transform-reveal-box ${transformResult}`}>
              <div className="reveal-header">
                <strong>Oh?</strong>
                <span>{transformResult === 'shiny' ? '✨ SHINY DITTO CHYCEN! ✨' : '🎉 DITTO ODHALEN! 🎉'}</span>
              </div>
              <div className="ditto-reveal-visual">
                <img 
                  src={transformResult === 'shiny'
                    ? 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/132.png'
                    : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png'}
                  alt="Ditto Reveal"
                  className="ditto-artwork-img"
                />
                <div className="reveal-stats">
                  <h4>{transformResult === 'shiny' ? 'Shiny Ditto (Modrý)' : 'Ditto (Fialový)'}</h4>
                  <p>
                    {transformResult === 'shiny' 
                      ? (lang === 'cs' ? 'Gratulace! Váš netřpytivý disguise se proměnil ve vzácného modrého Shiny Ditta!' : 'Jackpot! Your standard non-shiny disguise blossomed into a radiant blue Shiny Ditto!')
                      : (lang === 'cs' ? 'Úspěch! Podezřelý oranžový kruh nezklamal a Pokémon se proměnil v Ditta!' : 'Success! The suspicious catch ring confirmed a genuine Ditto transformation!')}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Disguises Catalog Grid */}
      <div className="ditto-card-panel">
        <div className="panel-title-bar">
          <Search size={20} color="#38bdf8" />
          <h3>
            {lang === 'cs' ? 'Aktuální Seznam Všech Masek Ditta v Této Sezóně' :
             lang === 'ja' ? '今シーズンのメタモン擬態対象ポケモン一覧' :
             lang === 'ru' ? 'Актуальный список маскировок Дитто в этом сезоне' :
             'Current Active Ditto Disguise Roster'}
          </h3>
        </div>

        <div className="disguises-catalog-grid">
          {CURRENT_DISGUISES.map((d) => (
            <div key={d.name} className="disguise-item-card">
              <img 
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${d.dexId}.png`}
                alt={d.name}
                className="disguise-item-img"
                loading="lazy"
              />
              <div className="disguise-item-details">
                <strong>{d.name}</strong>
                <div className="disguise-types-row">
                  {d.types.map(t => (
                    <span key={t} className="disguise-type-tag">{t}</span>
                  ))}
                </div>
                <span className="ditto-bcr-sub">BCR: 16% Ditto tell</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 1-Click Search Operators */}
      <div className="ditto-card-panel">
        <div className="panel-title-bar">
          <Copy size={20} color="#facc15" />
          <h3>
            {lang === 'cs' ? 'Vyhledávací Řetězce pro Okamžitou Kontrolu Masek' :
             lang === 'ja' ? '全擬態ポケモン一括検索コマンド' :
             lang === 'ru' ? 'Поисковые строки для всех маскировок' :
             'One-Click Ditto Hunting Search Strings'}
          </h3>
        </div>

        <div className="ditto-searches-grid">
          <div className="search-code-card">
            <div className="search-meta">
              <strong>{searchDisguisesAll}</strong>
              <span>{lang === 'cs' ? 'Zobrazí všechny aktuální maskované druhy na mapě / v batohu' : 'Filters every active Ditto disguise species in one query'}</span>
            </div>
            <button 
              type="button" 
              className="copy-chip-btn"
              onClick={() => handleCopy(searchDisguisesAll, 'all')}
            >
              {copiedKey === 'all' ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
              <span>{copiedKey === 'all' ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
            </button>
          </div>

          <div className="search-code-card">
            <div className="search-meta">
              <strong>ditto & shiny</strong>
              <span>{lang === 'cs' ? 'Všichni vaši chycení Shiny Dittové' : 'Filter all brilliant blue Shiny Dittos'}</span>
            </div>
            <button 
              type="button" 
              className="copy-chip-btn"
              onClick={() => handleCopy('ditto & shiny', 'shinyditto')}
            >
              {copiedKey === 'shinyditto' ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
              <span>{copiedKey === 'shinyditto' ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
