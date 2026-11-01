'use client';

import React, { useState, useMemo } from 'react';
import type { Language } from '../data/translations';
import { 
  Sparkles, 
  Award, 
  Copy, 
  Check, 
  Sliders, 
  HelpCircle, 
  Shield, 
  Swords, 
  Trophy,
  Zap,
  Info
} from 'lucide-react';
import './IvAppraisalInteractiveWidget.css';

interface IvAppraisalInteractiveWidgetProps {
  lang: Language;
}

export const IvAppraisalInteractiveWidget: React.FC<IvAppraisalInteractiveWidgetProps> = ({ lang }) => {
  const [atk, setAtk] = useState<number>(15);
  const [def, setDef] = useState<number>(15);
  const [sta, setSta] = useState<number>(15);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Calculate IV percentage & Star Rating
  const totalIvPoints = atk + def + sta; // Max 45
  const ivPercent = ((totalIvPoints / 45) * 100).toFixed(1);

  const starRating = useMemo(() => {
    if (atk === 15 && def === 15 && sta === 15) return { stars: 4, badge: '4★ Hundo 🏆', color: '#facc15', bg: 'rgba(250, 204, 21, 0.2)' };
    if (totalIvPoints >= 37) return { stars: 3, badge: '3★ (82%–98%)', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.2)' };
    if (totalIvPoints >= 30) return { stars: 2, badge: '2★ (67%–80%)', color: '#4ade80', bg: 'rgba(74, 222, 128, 0.2)' };
    if (totalIvPoints >= 23) return { stars: 1, badge: '1★ (51%–64%)', color: '#fb923c', bg: 'rgba(251, 146, 60, 0.2)' };
    return { stars: 0, badge: '0★ (0%–49%)', color: '#94a3b8', bg: 'rgba(148, 163, 184, 0.2)' };
  }, [atk, def, sta, totalIvPoints]);

  // PvP Stat Product Analysis
  const isPvpIdeal = atk <= 2 && def >= 13 && sta >= 13;
  const isPveIdeal = atk === 15 && totalIvPoints >= 40;

  const handleApplyPreset = (a: number, d: number, s: number) => {
    setAtk(a);
    setDef(d);
    setSta(s);
  };

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
    <div className="appraise-interactive-widget">
      {/* 1. INTERACTIVE APPRAISAL SIMULATOR */}
      <div className="appraise-main-card">
        <div className="appraise-card-header">
          <Sparkles size={22} className="header-icon-sparkle" />
          <div>
            <h3>
              {lang === 'cs' ? 'Interaktivní simulátor hodnocení (Appraise) & IV kalkulačka' : 
               lang === 'ja' ? 'インタラクティブ個体値（IV）判定＆リーダー評価シミュレーター' : 
               lang === 'ru' ? 'Интерактивный симулятор Appraise и IV калькулятор' : 
               'Interactive Appraisal Simulator & IV Calculator'}
            </h3>
            <p className="header-desc">
              {lang === 'cs' ? 'Nastavte hodnoty Attack, Defense a HP. Sledujte herní hvězdičky, procenta a doporučení pro PvE i PvP:' : 
               'Adjust Attack, Defense, and HP sliders to inspect live in-game stars, IV percentage, and competitive verdict:'}
            </p>
          </div>
        </div>

        {/* Preset Quick Buttons */}
        <div className="presets-row">
          <button 
            type="button" 
            className={`preset-btn ${atk === 15 && def === 15 && sta === 15 ? 'active-hundo' : ''}`}
            onClick={() => handleApplyPreset(15, 15, 15)}
          >
            🏆 {lang === 'cs' ? '100% Hundo (15/15/15)' : '100% Hundo'}
          </button>
          <button 
            type="button" 
            className={`preset-btn ${atk === 0 && def === 15 && sta === 15 ? 'active-pvp' : ''}`}
            onClick={() => handleApplyPreset(0, 15, 15)}
          >
            ⚔️ {lang === 'cs' ? 'PvP Ideál (0/15/15)' : 'PvP Ideal (0/15/15)'}
          </button>
          <button 
            type="button" 
            className={`preset-btn ${atk === 10 && def === 10 && sta === 10 ? 'active' : ''}`}
            onClick={() => handleApplyPreset(10, 10, 10)}
          >
            🥚 {lang === 'cs' ? 'Raid/Vejce Floor (10/10/10)' : 'Raid Floor (10/10/10)'}
          </button>
          <button 
            type="button" 
            className={`preset-btn ${atk === 12 && def === 12 && sta === 12 ? 'active' : ''}`}
            onClick={() => handleApplyPreset(12, 12, 12)}
          >
            ✨ {lang === 'cs' ? 'Lucky Trade Floor (12/12/12)' : 'Lucky Floor (12/12/12)'}
          </button>
          <button 
            type="button" 
            className={`preset-btn ${atk === 0 && def === 0 && sta === 0 ? 'active' : ''}`}
            onClick={() => handleApplyPreset(0, 0, 0)}
          >
            🧹 {lang === 'cs' ? 'Nundo (0/0/0)' : 'Nundo (0/0/0)'}
          </button>
        </div>

        {/* Visual In-Game Style Appraisal Gauge Display */}
        <div className="appraisal-visual-deck">
          {/* Leaders Stamp & Stars */}
          <div className="appraisal-stamp-col">
            <div className="stamp-stars-row">
              {[1, 2, 3].map((starIdx) => (
                <span 
                  key={starIdx} 
                  className={`appraise-star ${starRating.stars >= starIdx ? 'star-lit' : ''} ${starRating.stars === 4 ? 'star-hundo' : ''}`}
                >
                  ★
                </span>
              ))}
            </div>
            <div className="star-badge-pill" style={{ color: starRating.color, backgroundColor: starRating.bg }}>
              {starRating.badge}
            </div>
            <div className="iv-big-percentage">
              <span className="percent-number">{ivPercent}%</span>
              <span className="points-ratio">{totalIvPoints} / 45 IV</span>
            </div>
          </div>

          {/* 3 Slider Bars */}
          <div className="appraisal-bars-col">
            {/* Attack Bar */}
            <div className="bar-control-item">
              <div className="bar-label-row">
                <span className="bar-title">{lang === 'cs' ? 'Útok (Attack)' : 'Attack'}</span>
                <span className="bar-val-badge">{atk} / 15</span>
              </div>
              <div className="gauge-slider-wrap">
                <input 
                  type="range" 
                  min="0" 
                  max="15" 
                  value={atk} 
                  onChange={(e) => setAtk(Number(e.target.value))}
                  className="iv-range-slider" 
                />
                <div className="gauge-segments">
                  <div className={`gauge-fill ${atk === 15 ? 'max-pink' : ''}`} style={{ width: `${(atk / 15) * 100}%` }}></div>
                  <span className="segment-mark mark-5"></span>
                  <span className="segment-mark mark-10"></span>
                </div>
              </div>
            </div>

            {/* Defense Bar */}
            <div className="bar-control-item">
              <div className="bar-label-row">
                <span className="bar-title">{lang === 'cs' ? 'Obrana (Defense)' : 'Defense'}</span>
                <span className="bar-val-badge">{def} / 15</span>
              </div>
              <div className="gauge-slider-wrap">
                <input 
                  type="range" 
                  min="0" 
                  max="15" 
                  value={def} 
                  onChange={(e) => setDef(Number(e.target.value))}
                  className="iv-range-slider" 
                />
                <div className="gauge-segments">
                  <div className={`gauge-fill ${def === 15 ? 'max-pink' : ''}`} style={{ width: `${(def / 15) * 100}%` }}></div>
                  <span className="segment-mark mark-5"></span>
                  <span className="segment-mark mark-10"></span>
                </div>
              </div>
            </div>

            {/* HP Bar */}
            <div className="bar-control-item">
              <div className="bar-label-row">
                <span className="bar-title">{lang === 'cs' ? 'Výdrž (HP / Stamina)' : 'HP / Stamina'}</span>
                <span className="bar-val-badge">{sta} / 15</span>
              </div>
              <div className="gauge-slider-wrap">
                <input 
                  type="range" 
                  min="0" 
                  max="15" 
                  value={sta} 
                  onChange={(e) => setSta(Number(e.target.value))}
                  className="iv-range-slider" 
                />
                <div className="gauge-segments">
                  <div className={`gauge-fill ${sta === 15 ? 'max-pink' : ''}`} style={{ width: `${(sta / 15) * 100}%` }}></div>
                  <span className="segment-mark mark-5"></span>
                  <span className="segment-mark mark-10"></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Strategic Analysis Output */}
        <div className="strategic-verdict-row">
          <div className={`verdict-card ${isPveIdeal ? 'verdict-highlight-gold' : ''}`}>
            <div className="verdict-header">
              <Trophy size={16} />
              <span>{lang === 'cs' ? 'PvE Raidy & Master League' : 'PvE Raids & Master League'}</span>
            </div>
            <p>
              {isPveIdeal ? (
                <strong className="verdict-good">
                  🏆 {lang === 'cs' ? 'Absolutní elita! Perfektní 15 Attack maximalizuje poškození za sekundu (DPS).' : 'Elite Tier! Perfect 15 Attack maximizes DPS in raid battles.'}
                </strong>
              ) : atk === 15 ? (
                <span>{lang === 'cs' ? 'Skvělý raidový útočník (15 Attack je klíčový parametr).' : 'Great raid attacker (15 Attack is the primary stat).'}</span>
              ) : (
                <span>{lang === 'cs' ? 'Pro raidy hledejte raději 15 Attack pro maximální poškození.' : 'For raids, prioritize 15 Attack for max damage.'}</span>
              )}
            </p>
          </div>

          <div className={`verdict-card ${isPvpIdeal ? 'verdict-highlight-cyan' : ''}`}>
            <div className="verdict-header">
              <Swords size={16} />
              <span>{lang === 'cs' ? 'PvP Great & Ultra League' : 'PvP Great & Ultra League'}</span>
            </div>
            <p>
              {isPvpIdeal ? (
                <strong className="verdict-good-cyan">
                  ⚡ {lang === 'cs' ? 'Špičkový PvP Rank! Nízký Attack a max obrana umožňují vyšší level pod CP limitem.' : 'Top PvP Rank! Low Attack and max defense allow higher levels under the CP cap.'}
                </strong>
              ) : atk >= 13 ? (
                <span>{lang === 'cs' ? 'Vysoký Attack příliš nafukuje CP, což v PvP ligách snižuje celkovou výdrž.' : 'High Attack inflates CP, lowering total stat product bulk in Great/Ultra.'}</span>
              ) : (
                <span>{lang === 'cs' ? 'Solidní rozložení pro ligy s CP limitem 1500 / 2500.' : 'Solid stat distribution for 1500/2500 CP capped leagues.'}</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* 2. THE MATHEMATICAL PARADOX (PVP STAT PRODUCT) */}
      <div className="pvp-math-explainer-card">
        <div className="math-explainer-header">
          <Zap size={20} className="math-icon" />
          <h3>
            {lang === 'cs' ? 'Proč je 0/15/15 lepší než 15/15/15 v Great a Ultra League?' : 
             lang === 'ja' ? 'なぜスーパー／ハイパーリーグでは「0/15/15」が「15/15/15」より強いのか？' : 
             lang === 'ru' ? 'Почему 0/15/15 лучше, чем 15/15/15 в Great и Ultra League?' : 
             'Why 0/15/15 Beats 15/15/15 in Great & Ultra PvP Leagues'}
          </h3>
        </div>
        <div className="math-steps-grid">
          <div className="math-step-item">
            <span className="step-badge">1</span>
            <strong>{lang === 'cs' ? 'Vzorec pro výpočet CP' : 'The CP Formula'}</strong>
            <p>{lang === 'cs' ? 'Statistika Attack má ve vzorci CP DVOJNÁSOBNÝ vliv (je umocněna, zatímco Defense a Stamina jsou pod odmocninou).' : 'Attack is heavily weighted in the CP equation; it increases CP twice as fast as Defense or HP.'}</p>
          </div>
          <div className="math-step-item">
            <span className="step-badge">2</span>
            <strong>{lang === 'cs' ? 'Více levelů pod limitem' : 'More Level Ups'}</strong>
            <p>{lang === 'cs' ? 'Když má Pokémon 0 Attack, jeho CP roste velmi pomalu. Díky tomu ho můžete vylepšit o 3 až 5 celých levelů výše pod hranicí 1500 CP!' : 'With 0 Attack, CP rises slowly. You can power up 3 to 5 extra levels before hitting the 1500 CP limit!'}</p>
          </div>
          <div className="math-step-item">
            <span className="step-badge">3</span>
            <strong>{lang === 'cs' ? 'Obří celková výdrž (Bulk)' : 'Massive Stat Product'}</strong>
            <p>{lang === 'cs' ? 'Vyšší level přinese o desítky bodů více Defense a HP. Přežijete o 1–2 Charged útoky soupeře navíc a vyhrajete souboj!' : 'Higher levels provide drastically higher Defense and HP, letting you survive extra enemy Charged Moves.'}</p>
          </div>
        </div>
      </div>

      {/* 3. ESSENTIAL SEARCH FILTERS FOR APPRAISAL */}
      <div className="appraise-filters-box">
        <div className="filters-title">
          <Copy size={16} />
          <span>{lang === 'cs' ? 'Oficiální vyhledávací filtry pro bleskové třídění inventáře:' : 'Official In-Game Inventory Search Strings:'}</span>
        </div>
        <div className="filters-grid">
          <div className="filter-item">
            <div className="filter-text-col">
              <span className="filter-name">{lang === 'cs' ? 'Perfektní 100% IV (Hundo)' : 'Perfect 100% IV (Hundo)'}</span>
              <code>4*</code>
            </div>
            <button 
              type="button" 
              className={`filter-copy-btn ${copiedKey === '4star' ? 'copied' : ''}`}
              onClick={() => handleCopySearch('4*', '4star')}
            >
              {copiedKey === '4star' ? <Check size={13} /> : <Copy size={13} />}
              <span>{copiedKey === '4star' ? (lang === 'cs' ? 'Zkopírováno' : 'Copied') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
            </button>
          </div>

          <div className="filter-item">
            <div className="filter-text-col">
              <span className="filter-name">{lang === 'cs' ? 'Vysoké IV pro raidy (82%–100%)' : 'Raid-Ready IVs (82%–100%)'}</span>
              <code>3*,4*</code>
            </div>
            <button 
              type="button" 
              className={`filter-copy-btn ${copiedKey === '34star' ? 'copied' : ''}`}
              onClick={() => handleCopySearch('3*,4*', '34star')}
            >
              {copiedKey === '34star' ? <Check size={13} /> : <Copy size={13} />}
              <span>{copiedKey === '34star' ? (lang === 'cs' ? 'Zkopírováno' : 'Copied') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
            </button>
          </div>

          <div className="filter-item">
            <div className="filter-text-col">
              <span className="filter-name">{lang === 'cs' ? 'PvP kandidáti (Nízký Attack, max obrana)' : 'PvP Candidates (0 Attack, high bulk)'}</span>
              <code>0attack&3defense,4defense&3hp,4hp</code>
            </div>
            <button 
              type="button" 
              className={`filter-copy-btn ${copiedKey === 'pvp' ? 'copied' : ''}`}
              onClick={() => handleCopySearch('0attack&3defense,4defense&3hp,4hp', 'pvp')}
            >
              {copiedKey === 'pvp' ? <Check size={13} /> : <Copy size={13} />}
              <span>{copiedKey === 'pvp' ? (lang === 'cs' ? 'Zkopírováno' : 'Copied') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
            </button>
          </div>

          <div className="filter-item">
            <div className="filter-text-col">
              <span className="filter-name">{lang === 'cs' ? 'Rychlé promazání odpadu (Trash cleanup)' : 'Safe Trash Cleanup'}</span>
              <code>0*,1*,2*&!shiny&!legendary&!mythical&!favorite</code>
            </div>
            <button 
              type="button" 
              className={`filter-copy-btn ${copiedKey === 'trash' ? 'copied' : ''}`}
              onClick={() => handleCopySearch('0*,1*,2*&!shiny&!legendary&!mythical&!favorite', 'trash')}
            >
              {copiedKey === 'trash' ? <Check size={13} /> : <Copy size={13} />}
              <span>{copiedKey === 'trash' ? (lang === 'cs' ? 'Zkopírováno' : 'Copied') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
