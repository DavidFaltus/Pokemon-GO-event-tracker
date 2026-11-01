'use client';

import React, { useState, useMemo } from 'react';
import type { Language } from '../data/translations';
import { 
  Target, 
  Sparkles, 
  Zap, 
  Layers, 
  Check, 
  Copy, 
  Award, 
  TrendingUp, 
  Plus, 
  Trash2,
  Calendar,
  Info
} from 'lucide-react';
import './FieldResearchInteractiveWidget.css';

interface FieldResearchInteractiveWidgetProps {
  lang: Language;
}

interface DustSpecies {
  name: string;
  dexId: number;
  baseDust: number;
}

const DUST_BANK_SPECIES: DustSpecies[] = [
  { name: 'Audino', dexId: 531, baseDust: 2100 },
  { name: 'Shellder', dexId: 90, baseDust: 1000 },
  { name: 'Sableye', dexId: 302, baseDust: 750 },
  { name: 'Combee', dexId: 415, baseDust: 750 },
  { name: 'Paras', dexId: 46, baseDust: 500 },
  { name: 'Meowth', dexId: 52, baseDust: 500 },
  { name: 'Foongus', dexId: 590, baseDust: 500 }
];

interface HundoResearchTarget {
  name: string;
  dexId: number;
  hundoCp: number;
  task: Record<Language, string>;
}

const HUNDO_RESEARCH_TARGETS: HundoResearchTarget[] = [
  {
    name: 'Beldum',
    dexId: 374,
    hundoCp: 417,
    task: { cs: '3× Curveball hod za sebou', en: 'Make 3 Curveball Throws in a row', ja: 'カーブボールを3回連続で投げる', ru: '3 крученых броска подряд' }
  },
  {
    name: 'Gible',
    dexId: 443,
    hundoCp: 477,
    task: { cs: 'Vyhraj 1 raid', en: 'Win 1 Raid', ja: 'レイドバトルで1回勝つ', ru: 'Победить в 1 рейде' }
  },
  {
    name: 'Larvitar',
    dexId: 246,
    hundoCp: 445,
    task: { cs: 'Chyť 3 Rock-type Pokémony', en: 'Catch 3 Rock-type Pokémon', ja: 'いわタイプのポケモンを3匹捕まえる', ru: 'Поймать 3 каменных покемона' }
  },
  {
    name: 'Dratini',
    dexId: 147,
    hundoCp: 430,
    task: { cs: 'Chyť Dragon-type Pokémona', en: 'Catch a Dragon-type Pokémon', ja: 'ドラゴンタイプのポケモンを1匹捕まえる', ru: 'Поймать драконьего покемона' }
  },
  {
    name: 'Magikarp',
    dexId: 129,
    hundoCp: 117,
    task: { cs: 'Chyť 7 Pokémonů', en: 'Catch 7 Pokémon', ja: 'ポケモンを7匹捕まえる', ru: 'Поймать 7 покемонов' }
  },
  {
    name: 'Spinda',
    dexId: 327,
    hundoCp: 523,
    task: { cs: '5× Great Curveball hod za sebou', en: 'Make 5 Great Curveball Throws in a row', ja: 'カーブボールのグレートスローを5回連続で投げる', ru: '5 Great крученых бросков подряд' }
  }
];

export const FieldResearchInteractiveWidget: React.FC<FieldResearchInteractiveWidgetProps> = ({ lang }) => {
  const [bankCount, setBankCount] = useState<number>(60); // 0 to 100
  const [bankAverageDust, setBankAverageDust] = useState<number>(1000); // 500 to 2100
  const [starPieceActive, setStarPieceActive] = useState<boolean>(true);
  const [eventDustMultiplier, setEventDustMultiplier] = useState<number>(3); // 1x, 2x, 3x (e.g. Community Day)
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Stack calculation
  const stackTotals = useMemo(() => {
    const starPieceMultiplier = starPieceActive ? 1.5 : 1;
    const dustPerCatch = Math.floor(bankAverageDust * eventDustMultiplier * starPieceMultiplier);
    const totalBankStardust = dustPerCatch * bankCount;
    return {
      dustPerCatch,
      totalBankStardust
    };
  }, [bankCount, bankAverageDust, eventDustMultiplier, starPieceActive]);

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

  return (
    <div className="field-research-widget-container">
      {/* Hero Header */}
      <div className="field-widget-hero-header">
        <div className="field-hero-title-group">
          <div className="field-badge-pill">
            <Target size={16} />
            <span>FIELD QUEST & STACK ENGINE</span>
          </div>
          <h2>
            {lang === 'cs' ? 'Polní Výzkum: Simulátor Bankování Odměn (Fronta 100) & Hundo CP' :
             lang === 'ja' ? 'フィールドリサーチ攻略：100匹ストック計算機＆個体値100% CP' :
             lang === 'ru' ? 'Полевые исследования: Симулятор банка квестов (100 слотов) и Hundo CP' :
             'Field Research Mastery: 100-Encounter Bank Simulator & 100% IV Lookup'}
          </h2>
          <p>
            {lang === 'cs' ? 'Využijte trik odložených odměn (až 100 pokémonů v zásobě pro masivní zisk Stardustu při 3× eventech) a ověřte si Level 15 Hundo hodnoty.' :
             lang === 'ja' ? 'リワードストック（最大100匹の捕獲保留）による砂大量獲得シミュレータ、タスク産PL15個体値100%（Hundo）確定CP一覧。' :
             lang === 'ru' ? 'Используйте трюк со стаком до 100 покемонов для фарма сотен тысяч пыли на ивентах х3 и сверяйте 100% CP 15 уровня.' :
             'Harness the 100-encounter stacking bank trick for massive Stardust windfalls during 3x events and check fixed Level 15 Hundo CPs.'}
          </p>
        </div>
      </div>

      {/* 100 Encounter Stacking Bank Simulator Card */}
      <div className="field-card-panel">
        <div className="panel-title-bar">
          <Layers size={20} color="#aa3bff" />
          <h3>
            {lang === 'cs' ? 'Kalkulačka Bankování Úkolů (Fronta 100 Odložených Pokémonů)' :
             lang === 'ja' ? 'タスクストック（最大100匹）ほしのすな獲得試算シミュレータ' :
             lang === 'ru' ? 'Калькулятор стака квестов (Очередь до 100 покемонов)' :
             'The 100-Encounter Stacking Bank & Stardust Multiplier Calculator'}
          </h3>
        </div>

        <p className="panel-desc">
          {lang === 'cs'
            ? 'Po splnění úkolu se setkáním klepněte na tlačítko Útěku vlevo nahoře. Pokémon nezmizí, ale uloží se do neviditelné fronty (banky) až pro 100 odchytů. Nastavte si parametry níže a spočítejte si okamžitý výnos!'
            : 'Upon completing an encounter task, tap the Run door icon. The encounter banks into an invisible first-in-first-out queue holding up to 100 Pokémon. Configure your stack below to view immediate cash-out yields!'}
        </p>

        {/* Stack Controls */}
        <div className="stack-controls-grid">
          <div className="stack-slider-box">
            <div className="slider-header-row">
              <span>{lang === 'cs' ? 'Počet pokémonů ve frontě (max 100):' : 'Banked Pokémon in Queue (max 100):'}</span>
              <strong className="count-highlight">{bankCount} / 100 slotů</strong>
            </div>
            <input 
              type="range"
              min="10"
              max="100"
              step="5"
              value={bankCount}
              onChange={(e) => setBankCount(parseInt(e.target.value, 10))}
              className="field-range-input"
            />
            <div className="slider-ticks-row">
              <span>10</span>
              <span>25</span>
              <span>50</span>
              <span>75</span>
              <span>100 (PLNO!)</span>
            </div>
          </div>

          <div className="stack-options-row">
            <div className="stack-option-box">
              <label>{lang === 'cs' ? 'Průměrný Stardust na kus:' : 'Average Base Stardust / Mon:'}</label>
              <select 
                value={bankAverageDust}
                onChange={(e) => setBankAverageDust(parseInt(e.target.value, 10))}
                className="dust-select"
              >
                <option value={100}>100 Dust (Běžní pokémoni)</option>
                <option value={500}>500 Dust (Paras / Meowth / Foongus)</option>
                <option value={750}>750 Dust (Sableye / Combee)</option>
                <option value={1000}>1 000 Dust (Shellder mix)</option>
                <option value={2100}>2 100 Dust (Čistě Audino banka! 💎)</option>
              </select>
            </div>

            <div className="stack-option-box">
              <label>{lang === 'cs' ? 'Eventový Multiplikátor Stardustu:' : 'Event Stardust Multiplier:'}</label>
              <div className="btn-toggle-row">
                <button
                  type="button"
                  className={`toggle-option ${eventDustMultiplier === 1 ? 'active' : ''}`}
                  onClick={() => setEventDustMultiplier(1)}
                >
                  <span>1×</span>
                </button>
                <button
                  type="button"
                  className={`toggle-option ${eventDustMultiplier === 2 ? 'active' : ''}`}
                  onClick={() => setEventDustMultiplier(2)}
                >
                  <span>2×</span>
                </button>
                <button
                  type="button"
                  className={`toggle-option discount ${eventDustMultiplier === 3 ? 'active' : ''}`}
                  onClick={() => setEventDustMultiplier(3)}
                >
                  <span>3× (Com Day)</span>
                </button>
              </div>
            </div>

            <div className="stack-option-box">
              <label>{lang === 'cs' ? 'Aktivní Star Piece (+50 %):' : 'Active Star Piece (+50%):'}</label>
              <button
                type="button"
                className={`toggle-option starpiece ${starPieceActive ? 'active' : ''}`}
                onClick={() => setStarPieceActive(!starPieceActive)}
              >
                <Sparkles size={16} />
                <span>{starPieceActive ? 'Star Piece ZAPNUT' : 'Star Piece VYPNUT'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Calculation Output Display */}
        <div className="stack-results-card">
          <div className="stack-metric-col">
            <span className="metric-sub">{lang === 'cs' ? 'Zisk Stardustu z 1 uloveného kusu z banky:' : 'Stardust per banked capture:'}</span>
            <strong className="metric-single">+{stackTotals.dustPerCatch.toLocaleString()} Dust / odchyt</strong>
          </div>
          <div className="stack-metric-col highlighted">
            <span className="metric-sub">{lang === 'cs' ? 'CELKOVÝ OKAMŽITÝ ZISK Z VYPRÁZDNĚNÍ BANKY:' : 'TOTAL INSTANT CASH-OUT WINDFALL:'}</span>
            <strong className="metric-grand">+{stackTotals.totalBankStardust.toLocaleString()} STARDUSTU!</strong>
          </div>
        </div>

        <div className="pro-tip-strip">
          <Zap size={16} />
          <span>
            {lang === 'cs' 
              ? 'PRO STRATEGIE: Ukládejte si úkoly s Audino (2 100 Dustu) nebo Shellderem (1 000 Dustu) do banky. Během 3× Stardust Community Day zapněte Star Piece a pomocí Fast Catch vyprázdněte všech 100 slotů za pouhých 15 minut pro zisk téměř 1 000 000 Stardustu!'
              : 'PRO STRATEGY: Bank high-value encounters like Audino (2,100 Dust) or Shellder (1,000 Dust). During a 3x Stardust Community Day, pop a Star Piece and catch the entire 100-bank queue with Fast Catch in 15 minutes for nearly 1,000,000 Stardust!'}
          </span>
        </div>
      </div>

      {/* 100% IV (Hundo) Level 15 CP Lookup Card */}
      <div className="field-card-panel">
        <div className="panel-title-bar">
          <Award size={20} color="#facc15" />
          <h3>
            {lang === 'cs' ? 'Přehled 100% IV (Hundo) CP Hodnot z Polního Výzkumu (Level 15)' :
             lang === 'ja' ? 'フィールドリサーチ産（PL15）個体値100%（Hundo）確定CP一覧' :
             lang === 'ru' ? 'Таблица 100% IV (Hundo) CP значений из квестов (Level 15)' :
             'Fixed Level 15 100% IV (Hundo) Encounter CP Lookup'}
          </h3>
        </div>

        <p className="panel-desc">
          {lang === 'cs' 
            ? 'Všichni Pokémoni z polního výzkumu se líhnou přesně na Levelu 15 s minimálním IV 10/10/10 (1 z 216 šance na Hundo). Pokud na obrazovce odchytu uvidíte tyto přesné CP hodnoty, máte garantovaného 100% Hunda!'
            : 'All Field Research encounters arrive strictly at Level 15 with a 10/10/10 IV floor (1 in 216 Hundo probability). Matching these exact CP values confirms a guaranteed 100% IV prior to throwing!'}
        </p>

        <div className="hundo-lookup-grid">
          {HUNDO_RESEARCH_TARGETS.map((target) => (
            <div key={target.name} className="hundo-target-card">
              <div className="hundo-visual-box">
                <img 
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${target.dexId}.png`}
                  alt={target.name}
                  className="hundo-artwork"
                  loading="lazy"
                />
                <span className="hundo-cp-pill">CP {target.hundoCp}</span>
              </div>
              <div className="hundo-details-col">
                <div className="hundo-title-row">
                  <h4>{target.name}</h4>
                  <span className="gold-tag">100% IV</span>
                </div>
                <p className="hundo-task-desc">{target.task[lang]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 1-Click Search Operators */}
      <div className="field-card-panel">
        <div className="panel-title-bar">
          <Copy size={20} color="#38bdf8" />
          <h3>
            {lang === 'cs' ? 'Vyhledávací Filtry pro Pokémony z Výzkumů' :
             lang === 'ja' ? 'リサーチ産ポケモン専用検索コマンド' :
             lang === 'ru' ? 'Поисковые фильтры для покемонов из квестов' :
             'One-Click Research Pokémon Search Operators'}
          </h3>
        </div>

        <div className="field-searches-grid">
          <div className="search-code-card">
            <div className="search-meta">
              <strong>research</strong>
              <span>{lang === 'cs' ? 'Všichni Pokémoni chycení z Field a Special Research úkolů' : 'All Pokémon captured via Field & Special Research'}</span>
            </div>
            <button 
              type="button" 
              className="copy-chip-btn"
              onClick={() => handleCopy('research', 'research')}
            >
              {copiedKey === 'research' ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
              <span>{copiedKey === 'research' ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
            </button>
          </div>

          <div className="search-code-card">
            <div className="search-meta">
              <strong>research & 4*</strong>
              <span>{lang === 'cs' ? '100% IV Hundo klenoty z výzkumů (1 z 216 šance)' : '100% IV Hundos earned through research (1 in 216 chance)'}</span>
            </div>
            <button 
              type="button" 
              className="copy-chip-btn"
              onClick={() => handleCopy('research & 4*', 'researchhundo')}
            >
              {copiedKey === 'researchhundo' ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
              <span>{copiedKey === 'researchhundo' ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
            </button>
          </div>

          <div className="search-code-card">
            <div className="search-meta">
              <strong>research & shiny</strong>
              <span>{lang === 'cs' ? 'Vzácné Shiny úlovky z polních úkolů' : 'Rare Shiny trophies hatched from field tasks'}</span>
            </div>
            <button 
              type="button" 
              className="copy-chip-btn"
              onClick={() => handleCopy('research & shiny', 'researchshiny')}
            >
              {copiedKey === 'researchshiny' ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
              <span>{copiedKey === 'researchshiny' ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
            </button>
          </div>

          <div className="search-code-card">
            <div className="search-meta">
              <strong>spinda</strong>
              <span>{lang === 'cs' ? 'Všech 9 forem Spindy z úkolu na 5 Great Curveballů' : 'All 9 Spinda patterns from 5 Great Curveball task'}</span>
            </div>
            <button 
              type="button" 
              className="copy-chip-btn"
              onClick={() => handleCopy('spinda', 'spinda')}
            >
              {copiedKey === 'spinda' ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
              <span>{copiedKey === 'spinda' ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
