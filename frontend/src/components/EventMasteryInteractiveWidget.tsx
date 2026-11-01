'use client';

import React, { useState, useMemo } from 'react';
import type { Language } from '../data/translations';
import { 
  Calendar, 
  Sparkles, 
  Zap, 
  Target, 
  Trash2, 
  Repeat, 
  CheckSquare, 
  Square, 
  Clock, 
  Copy, 
  Check, 
  ArrowRight,
  TrendingUp,
  Sliders,
  Award
} from 'lucide-react';
import './EventMasteryInteractiveWidget.css';

interface EventMasteryInteractiveWidgetProps {
  lang: Language;
}

type BonusType = 'stardust' | 'xp' | 'candy' | 'transfer' | 'evolve';

export const EventMasteryInteractiveWidget: React.FC<EventMasteryInteractiveWidgetProps> = ({ lang }) => {
  const [activeBonus, setActiveBonus] = useState<BonusType>('stardust');
  const [starPieceActive, setStarPieceActive] = useState<boolean>(true);
  const [luckyEggActive, setLuckyEggActive] = useState<boolean>(true);
  const [isExtraDustSpecies, setIsExtraDustSpecies] = useState<boolean>(false); // Paras/Shellder base 500/1000
  const [hourlyCatches, setHourlyCatches] = useState<number>(300); // 100 to 500
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Pre-event checklist state
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    storage: true,
    balls: true,
    mega: true,
    items: false,
    tags: false
  });

  const toggleChecklist = (key: string) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Yield Calculations
  const calculatedYield = useMemo(() => {
    // Stardust
    const baseDust = isExtraDustSpecies ? 1000 : 100;
    const eventDustMultiplier = activeBonus === 'stardust' ? 2 : 1;
    const itemDustMultiplier = starPieceActive ? 1.5 : 1;
    const dustPerCatch = Math.floor(baseDust * eventDustMultiplier * itemDustMultiplier);
    const totalDust = dustPerCatch * hourlyCatches;

    // XP
    const baseCatchXp = 1170; // 1000 (Excellent) + 100 (Catch) + 50 (Curveball) + 20 (First Throw)
    const eventXpMultiplier = activeBonus === 'xp' ? 2 : 1;
    const itemXpMultiplier = luckyEggActive ? 2 : 1;
    const xpPerCatch = Math.floor(baseCatchXp * eventXpMultiplier * itemXpMultiplier);
    const totalXp = xpPerCatch * hourlyCatches;

    // Candy
    const baseCandy = 3;
    const eventCandy = activeBonus === 'candy' ? baseCandy * 2 : baseCandy;
    const megaBonus = 2; // Mega Lv 3
    const pinapBonus = 3; // Pinap doubles base
    const totalCandyPerCatch = eventCandy + megaBonus + (activeBonus === 'candy' ? pinapBonus : 0);

    return {
      dustPerCatch,
      totalDust,
      xpPerCatch,
      totalXp,
      totalCandyPerCatch
    };
  }, [activeBonus, starPieceActive, luckyEggActive, isExtraDustSpecies, hourlyCatches]);

  const handleCopySearch = async (query: string, key: string) => {
    try {
      await navigator.clipboard.writeText(query);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    } catch {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

  return (
    <div className="event-mastery-widget-container">
      {/* Hero Header */}
      <div className="event-widget-hero-header">
        <div className="event-hero-title-group">
          <div className="event-badge-pill">
            <Calendar size={16} />
            <span>COMMUNITY DAY & SPOTLIGHT SIMULATOR</span>
          </div>
          <h2>
            {lang === 'cs' ? 'Spotlight Hour & Community Day: Bonus Multiplier & Fast Catch' :
             lang === 'ja' ? 'スポットライトアワー＆コミュデイ攻略：倍率計算機＆高速捕獲' :
             lang === 'ru' ? 'Spotlight Hour и Community Day: Калькулятор бонусов и Fast Catch' :
             'Spotlight Hour & Community Day: Bonus Stacking & Fast Catch Engine'}
          </h2>
          <p>
            {lang === 'cs' ? 'Optimalizace rotujících bonusů, kalkulačka zisku Stardustu a XP, interaktivní návod na techniku Fast Catch a před-eventový checklist.' :
             lang === 'ja' ? '5大ボーナスの重ねがけシミュレータ、ほしのすな・XP試算、ファストキャッチ（高速捕獲）実践手順と事前チェックリスト。' :
             lang === 'ru' ? 'Оптимизация ротирующихся бонусов, калькулятор пыли и XP, интерактивная инструкция Fast Catch и чек-лист подготовки.' :
             'Rotational bonus stacking simulator, Stardust/XP yield projections, step-by-step Fast Catch guide, and pre-event readiness checklist.'}
          </p>
        </div>

        {/* Bonus Selector Row */}
        <div className="bonus-selector-tabs">
          <button
            type="button"
            className={`bonus-tab-btn ${activeBonus === 'stardust' ? 'active stardust' : ''}`}
            onClick={() => setActiveBonus('stardust')}
          >
            <Sparkles size={16} />
            <span>2× Catch Stardust</span>
          </button>
          <button
            type="button"
            className={`bonus-tab-btn ${activeBonus === 'xp' ? 'active xp' : ''}`}
            onClick={() => setActiveBonus('xp')}
          >
            <Zap size={16} />
            <span>2× Catch XP</span>
          </button>
          <button
            type="button"
            className={`bonus-tab-btn ${activeBonus === 'candy' ? 'active candy' : ''}`}
            onClick={() => setActiveBonus('candy')}
          >
            <Target size={16} />
            <span>2× Catch Candy</span>
          </button>
          <button
            type="button"
            className={`bonus-tab-btn ${activeBonus === 'transfer' ? 'active transfer' : ''}`}
            onClick={() => setActiveBonus('transfer')}
          >
            <Trash2 size={16} />
            <span>2× Transfer Candy</span>
          </button>
          <button
            type="button"
            className={`bonus-tab-btn ${activeBonus === 'evolve' ? 'active evolve' : ''}`}
            onClick={() => setActiveBonus('evolve')}
          >
            <Repeat size={16} />
            <span>2× Evolve XP</span>
          </button>
        </div>
      </div>

      {/* Bonus Yield Calculator Card */}
      <div className="event-card-panel">
        <div className="panel-title-bar">
          <TrendingUp size={20} color="#aa3bff" />
          <h3>
            {lang === 'cs' ? 'Kalkulačka Výnosů & Multiplikátorů Předmětů' :
             lang === 'ja' ? 'アイテム重複ボーナス＆1時間あたりの獲得試算' :
             lang === 'ru' ? 'Калькулятор наград и умножения предметов' :
             'Item Multiplier Stacking & Hourly Yield Projector'}
          </h3>
        </div>

        {/* Item Toggles Row */}
        <div className="item-toggles-grid">
          <button
            type="button"
            className={`item-toggle-pill ${starPieceActive ? 'active starpiece' : ''}`}
            onClick={() => setStarPieceActive(!starPieceActive)}
          >
            <Sparkles size={16} />
            <span>Star Piece (+50% Stardust)</span>
            <strong>{starPieceActive ? 'AKTIVNÍ' : 'VYPNUTO'}</strong>
          </button>

          <button
            type="button"
            className={`item-toggle-pill ${luckyEggActive ? 'active luckyegg' : ''}`}
            onClick={() => setLuckyEggActive(!luckyEggActive)}
          >
            <Zap size={16} />
            <span>Lucky Egg (2× XP)</span>
            <strong>{luckyEggActive ? 'AKTIVNÍ' : 'VYPNUTO'}</strong>
          </button>

          <button
            type="button"
            className={`item-toggle-pill ${isExtraDustSpecies ? 'active paradust' : ''}`}
            onClick={() => setIsExtraDustSpecies(!isExtraDustSpecies)}
          >
            <Award size={16} />
            <span>Extra Dust druh (Paras/Shellder/Foongus)</span>
            <strong>{isExtraDustSpecies ? '1 000 Base' : '100 Base'}</strong>
          </button>
        </div>

        {/* Projected Catches Slider */}
        <div className="hourly-catches-slider-box">
          <div className="slider-header-row">
            <span>{lang === 'cs' ? 'Odhadovaný počet odchytů za 1 hodinu (s Fast Catch):' : 'Estimated Catches per Hour (using Fast Catch):'}</span>
            <strong className="catches-count">{hourlyCatches} Pokémonů</strong>
          </div>
          <input
            type="range"
            min="50"
            max="500"
            step="25"
            value={hourlyCatches}
            onChange={(e) => setHourlyCatches(parseInt(e.target.value, 10))}
            className="event-range-input"
          />
          <div className="slider-ticks-row">
            <span>50 (Pomalé)</span>
            <span>200 (Běžné)</span>
            <span>350 (Fast Catch)</span>
            <span>500 (Pro Master)</span>
          </div>
        </div>

        {/* Live Projected Results Display */}
        <div className="projected-results-grid">
          <div className="result-metric-box stardust">
            <span className="metric-title">{lang === 'cs' ? 'Zisk Stardustu / Odchyt:' : 'Stardust / Catch:'}</span>
            <span className="metric-val">+{calculatedYield.dustPerCatch.toLocaleString()} Dust</span>
            <div className="metric-total-pill">
              <span>{lang === 'cs' ? 'Celkem za hodinu:' : '1-Hour Total:'}</span>
              <strong>{calculatedYield.totalDust.toLocaleString()} Stardust</strong>
            </div>
          </div>

          <div className="result-metric-box xp">
            <span className="metric-title">{lang === 'cs' ? 'Zisk XP / Excellent odchyt:' : 'XP / Excellent Catch:'}</span>
            <span className="metric-val">+{calculatedYield.xpPerCatch.toLocaleString()} XP</span>
            <div className="metric-total-pill">
              <span>{lang === 'cs' ? 'Celkem za hodinu:' : '1-Hour Total:'}</span>
              <strong>{calculatedYield.totalXp.toLocaleString()} XP</strong>
            </div>
          </div>

          <div className="result-metric-box candy">
            <span className="metric-title">{lang === 'cs' ? 'Candy / Odchyt (Mega Lv 3):' : 'Candy / Catch (Mega Lv 3):'}</span>
            <span className="metric-val">+{calculatedYield.totalCandyPerCatch} Candy</span>
            <div className="metric-total-pill">
              <span>{lang === 'cs' ? 'Celkem za hodinu:' : '1-Hour Total:'}</span>
              <strong>{(calculatedYield.totalCandyPerCatch * hourlyCatches).toLocaleString()} Candy</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Fast Catch Execution Guide Card */}
      <div className="event-card-panel">
        <div className="panel-title-bar">
          <Target size={20} color="#38bdf8" />
          <h3>
            {lang === 'cs' ? 'Technika Fast Catch (Zrychlené Chytání): 4-Krokový Postup' :
             lang === 'ja' ? 'ファストキャッチ（高速捕獲）：4ステップ完全マニュアル' :
             lang === 'ru' ? 'Техника Fast Catch: Пошаговое руководство из 4 действий' :
             'Fast Catch Mastery: 4-Step High-Velocity Catch Technique'}
          </h3>
        </div>

        <div className="speed-comparison-strip">
          <div className="speed-metric standard">
            <Clock size={16} />
            <span>{lang === 'cs' ? 'Běžné chytání s animací:' : 'Standard Catch Animation:'}</span>
            <strong>~16,5 s / odchyt (max 120/h)</strong>
          </div>
          <ArrowRight size={20} color="#aa3bff" />
          <div className="speed-metric fastcatch">
            <Zap size={16} />
            <span>{lang === 'cs' ? 'Fast Catch technika:' : 'Fast Catch Technique:'}</span>
            <strong>~3,2 s / odchyt (až 500+/h!)</strong>
          </div>
        </div>

        <div className="fast-catch-steps-grid">
          <div className="fc-step-card">
            <div className="step-num-badge">1</div>
            <h4>{lang === 'cs' ? 'Podržet lištu míčků' : 'Hold & Drag Ball Drawer'}</h4>
            <p>
              {lang === 'cs' 
                ? 'Levým palcem stiskněte ikonu Poké Ballu (vpravo dole) a táhněte ji mírně doleva. Prst NESMÍTE pustit!'
                : 'Using your left thumb, tap and slide the Poké Ball tray icon slightly to the left. DO NOT RELEASE your thumb!'}
            </p>
          </div>

          <div className="fc-step-card">
            <div className="step-num-badge">2</div>
            <h4>{lang === 'cs' ? 'Házet pravou rukou' : 'Throw with Right Hand'}</h4>
            <p>
              {lang === 'cs' 
                ? 'Zatímco levý palec stále drží lištu, pravým ukazováčkem hoďte Curveball Excellent hod na Pokémona.'
                : 'While your left thumb maintains its drag hold, throw your normal Curveball Excellent throw with your right finger.'}
            </p>
          </div>

          <div className="fc-step-card">
            <div className="step-num-badge">3</div>
            <h4>{lang === 'cs' ? 'Pustit levý palec' : 'Release Left Thumb'}</h4>
            <p>
              {lang === 'cs' 
                ? 'Jakmile míček zasáhne Pokémona, pusťte levý palec. V levém horním rohu okamžitě naskočí ikona Útěku (Run)!'
                : 'The millisecond the ball impacts the Pokémon, release your left thumb. The Run/Escape door icon instantly appears in the top left!'}
            </p>
          </div>

          <div className="fc-step-card">
            <div className="step-num-badge">4</div>
            <h4>{lang === 'cs' ? 'Okamžitý Útěk' : 'Tap Escape & Continue'}</h4>
            <p>
              {lang === 'cs' 
                ? 'Klepněte na ikonu Útěku vlevo nahoře. Animace se přeskočí a Pokémon je již v batohu (nebo na mapě, pokud vyskočil)!'
                : 'Tap the Run door icon immediately to exit. The 15s animation is bypassed entirely, catching 500+ Pokémon an hour!'}
            </p>
          </div>
        </div>
      </div>

      {/* Pre-Event Readiness Checklist */}
      <div className="event-card-panel">
        <div className="panel-title-bar">
          <CheckSquare size={20} color="#22c55e" />
          <h3>
            {lang === 'cs' ? 'Před-eventový Checklist pro Community Day' :
             lang === 'ja' ? 'コミュニティ・デイ事前準備チェックリスト' :
             lang === 'ru' ? 'Чек-лист готовности к Community Day' :
             'Community Day Pre-Event Readiness Checklist'}
          </h3>
        </div>

        <div className="checklist-items-grid">
          <div 
            className={`checklist-item-card ${checklist.storage ? 'done' : ''}`}
            onClick={() => toggleChecklist('storage')}
          >
            {checklist.storage ? <CheckSquare size={20} color="#22c55e" /> : <Square size={20} />}
            <div className="item-text">
              <strong>{lang === 'cs' ? 'Vyčištěný Pokémon Storage' : 'Cleaned Pokémon Storage'}</strong>
              <span>{lang === 'cs' ? 'Alespoň 300–500 volných míst v batohu před startem.' : 'At least 300–500 free inventory slots prior to event start.'}</span>
            </div>
          </div>

          <div 
            className={`checklist-item-card ${checklist.balls ? 'done' : ''}`}
            onClick={() => toggleChecklist('balls')}
          >
            {checklist.balls ? <CheckSquare size={20} color="#22c55e" /> : <Square size={20} />}
            <div className="item-text">
              <strong>{lang === 'cs' ? 'Zásoba 200+ Ultra Ballů' : '200+ Ultra Balls Stockpiled'}</strong>
              <span>{lang === 'cs' ? 'Zaručuje 1-hodový odchyt bez zdlouhavého vyskakování.' : 'Guarantees 1-throw catches with Fast Catch without runaways.'}</span>
            </div>
          </div>

          <div 
            className={`checklist-item-card ${checklist.mega ? 'done' : ''}`}
            onClick={() => toggleChecklist('mega')}
          >
            {checklist.mega ? <CheckSquare size={20} color="#22c55e" /> : <Square size={20} />}
            <div className="item-text">
              <strong>{lang === 'cs' ? 'Aktivní Mega Level 3 Pokémon' : 'Matching Mega Level 3 Active'}</strong>
              <span>{lang === 'cs' ? 'Stejný typ jako eventový Pokémon pro +25 % Candy XL šanci.' : 'Matching elemental typing for the +25% Candy XL boost.'}</span>
            </div>
          </div>

          <div 
            className={`checklist-item-card ${checklist.items ? 'done' : ''}`}
            onClick={() => toggleChecklist('items')}
          >
            {checklist.items ? <CheckSquare size={20} color="#22c55e" /> : <Square size={20} />}
            <div className="item-text">
              <strong>{lang === 'cs' ? 'Připravené Star Pieces & Lucky Eggs' : 'Star Pieces & Lucky Eggs Ready'}</strong>
              <span>{lang === 'cs' ? 'Alespoň 6 kusů na celou dobu 3hodinového eventu.' : 'At least 6 items to cover the entire 3-hour duration.'}</span>
            </div>
          </div>

          <div 
            className={`checklist-item-card ${checklist.tags ? 'done' : ''}`}
            onClick={() => toggleChecklist('tags')}
          >
            {checklist.tags ? <CheckSquare size={20} color="#22c55e" /> : <Square size={20} />}
            <div className="item-text">
              <strong>{lang === 'cs' ? 'Označené Pokémony pro 2× Transfer' : 'Pre-Tagged Species for 2× Transfer'}</strong>
              <span>{lang === 'cs' ? 'Předpřipravený tag na promazání legend a vzácných druhů.' : 'Pre-tagged junk legendaries and rare species for transfer hour.'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Storage Cleanup Pro Search Strings */}
      <div className="event-card-panel">
        <div className="panel-title-bar">
          <Copy size={20} color="#facc15" />
          <h3>
            {lang === 'cs' ? 'Vyhledávací Filtry pro Rychlý Úklid po Eventu' :
             lang === 'ja' ? 'イベント後の一括整理用プロ検索コマンド' :
             lang === 'ru' ? 'Поисковые фильтры для чистки после ивента' :
             'Post-Event Storage Cleanup Search Strings'}
          </h3>
        </div>

        <div className="event-searches-grid">
          <div className="search-code-card">
            <div className="search-meta">
              <strong>age0 & !shiny & !4*</strong>
              <span>{lang === 'cs' ? 'Chyceno dnes, vyloučí Shiny a 100% IV Hundo' : 'Caught today, excludes shinies and 100% IV Hundos'}</span>
            </div>
            <button 
              type="button" 
              className="copy-chip-btn"
              onClick={() => handleCopySearch('age0 & !shiny & !4*', 'age0')}
            >
              {copiedKey === 'age0' ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
              <span>{copiedKey === 'age0' ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
            </button>
          </div>

          <div className="search-code-card">
            <div className="search-meta">
              <strong>0*,1*,2* & !shiny & !favorite</strong>
              <span>{lang === 'cs' ? 'Bezpečný filtr pro hromadný přesun smetí k profesorovi' : 'Safe bulk trash transfer to Professor Willow'}</span>
            </div>
            <button 
              type="button" 
              className="copy-chip-btn"
              onClick={() => handleCopySearch('0*,1*,2* & !shiny & !favorite', 'trash')}
            >
              {copiedKey === 'trash' ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
              <span>{copiedKey === 'trash' ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
            </button>
          </div>

          <div className="search-code-card">
            <div className="search-meta">
              <strong>0-1attack & 3-4defense & 3-4hp</strong>
              <span>{lang === 'cs' ? 'Kandidáti s ideálními PvP staty do Great a Ultra League' : 'Prime Great & Ultra League PvP candidates'}</span>
            </div>
            <button 
              type="button" 
              className="copy-chip-btn"
              onClick={() => handleCopySearch('0-1attack & 3-4defense & 3-4hp', 'pvp')}
            >
              {copiedKey === 'pvp' ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
              <span>{copiedKey === 'pvp' ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
            </button>
          </div>

          <div className="search-code-card">
            <div className="search-meta">
              <strong>evolvenew & 2*</strong>
              <span>{lang === 'cs' ? 'Nové položky do Pokédexu pro 2× Evolve XP bonus' : 'New Pokédex entries for 2× Evolve XP bonus'}</span>
            </div>
            <button 
              type="button" 
              className="copy-chip-btn"
              onClick={() => handleCopySearch('evolvenew & 2*', 'evolve')}
            >
              {copiedKey === 'evolve' ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
              <span>{copiedKey === 'evolve' ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
