'use client';

import React, { useState, useMemo } from 'react';
import type { Language } from '../data/translations';
import { 
  Trophy, 
  RefreshCw, 
  Award, 
  ChevronUp, 
  ChevronDown, 
  Search, 
  Sparkles, 
  Target, 
  CheckSquare, 
  Square, 
  Lightbulb, 
  Gift,
  Copy,
  Check,
  Zap,
  Layers,
  ChevronRight,
  X
} from 'lucide-react';
import { 
  TRAINER_LEVELS_DATA, 
  PLATINUM_MEDALS_GUIDE, 
  type TrainerLevelItem, 
  type PlatinumMedalStrategyItem 
} from '../data/trainerLevelsData';
import './TrainerLevelsInteractiveWidget.css';

interface TrainerLevelsInteractiveWidgetProps {
  lang: Language;
}

export const TrainerLevelsInteractiveWidget: React.FC<TrainerLevelsInteractiveWidgetProps> = ({ lang }) => {
  const [trainerTierFilter, setTrainerTierFilter] = useState<'all' | 'tier1' | 'tier2' | 'tier3'>('all');
  const [trainerSearch, setTrainerSearch] = useState<string>('');
  const [showPlatinumGuide, setShowPlatinumGuide] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Local state for checking tasks
  const [checkedLevelTasks, setCheckedLevelTasks] = useState<Record<string, boolean>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('pogo_level_tasks_checked');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return {};
  });

  const toggleLevelTask = (taskKey: string) => {
    setCheckedLevelTasks(prev => {
      const next = { ...prev, [taskKey]: !prev[taskKey] };
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('pogo_level_tasks_checked', JSON.stringify(next));
        } catch (e) {
          // ignore
        }
      }
      return next;
    });
  };

  const clearCheckedLevelTasks = () => {
    setCheckedLevelTasks({});
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('pogo_level_tasks_checked');
      } catch (e) {
        // ignore
      }
    }
  };
  const clearCheckedTasks = clearCheckedLevelTasks;

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

  const tierTabs = [
        { id: 'all', label: { cs: 'Všechny úrovně 1–80', en: 'All Levels 1–80', ja: '全レベル 1〜80', ru: 'Все уровни 1–80' } },
        { id: 'tier1', label: { cs: 'Level 1–40', en: 'Level 1–40', ja: 'レベル 1〜40', ru: 'Уровни 1–40' } },
        { id: 'tier2', label: { cs: 'Level 41–70', en: 'Level 41–70', ja: 'レベル 41〜70', ru: 'Уровни 41–70' } },
        { id: 'tier3', label: { cs: 'Level 71–80', en: 'Level 71–80', ja: 'レベル 71〜80', ru: 'Уровни 71–80' } },
      ];

      // Filter levels
      const filteredLevels = TRAINER_LEVELS_DATA.filter(lvl => {
        if (trainerTierFilter !== 'all' && lvl.tier !== trainerTierFilter) {
          return false;
        }

        if (trainerSearch.trim()) {
          const q = trainerSearch.toLowerCase().trim();
          const matchLvl = lvl.level.toString() === q || lvl.level.toString().includes(q);
          const matchXp = lvl.xpRequired.toString().includes(q) || lvl.totalXp.toString().includes(q);
          
          const matchRewards = lvl.rewards.some(r => {
            const nameCur = (r.name[lang] || r.name.en).toLowerCase();
            return nameCur.includes(q) || r.type.toLowerCase().includes(q);
          });

          const matchUnlocks = lvl.unlocks?.some(u => {
            const titleCur = (u.title[lang] || u.title.en).toLowerCase();
            const descCur = (u.description[lang] || u.description.en).toLowerCase();
            return titleCur.includes(q) || descCur.includes(q);
          });

          const matchTasks = lvl.tasks?.some(t => {
            const textCur = (t.text[lang] || t.text.en).toLowerCase();
            const tipCur = t.tip ? (t.tip[lang] || t.tip.en).toLowerCase() : '';
            return textCur.includes(q) || tipCur.includes(q);
          });

          if (!matchLvl && !matchXp && !matchRewards && !matchUnlocks && !matchTasks) {
            return false;
          }
        }

        return true;
      });

      // Calculate task statistics
      let totalTasksCount = 0;
      let completedTasksCount = 0;
      TRAINER_LEVELS_DATA.forEach(lvl => {
        if (lvl.tasks) {
          lvl.tasks.forEach((_, tIdx) => {
            totalTasksCount++;
            const tKey = `lvl_${lvl.level}_task_${tIdx}`;
            if (checkedLevelTasks[tKey]) {
              completedTasksCount++;
            }
          });
        }
      });

      const getMilestoneBadge = (lvlNum: number) => {
        if (lvlNum === 40) return { label: { cs: 'První vrchol', en: 'First Cap', ja: '第一の頂点', ru: 'Первый рубеж' }, color: 'milestone-40' };
        if (lvlNum === 50) return { label: { cs: 'Dřívější maximum', en: 'Legacy Cap', ja: '旧カンスト', ru: 'Старый максимум' }, color: 'milestone-50' };
        if (lvlNum === 70) return { label: { cs: 'Práh úkolů', en: 'Task Threshold', ja: 'タスク解禁', ru: 'Порог квестов' }, color: 'milestone-70' };
        if (lvlNum === 80) return { label: { cs: 'Maximální level hry', en: 'Ultimate Master Cap', ja: '究極カンスト', ru: 'Абсолютный максимум' }, color: 'milestone-80' };
        return null;
      };

      return (
        <div className="guide-visual-widget guide-trainer-levels-widget">
          {/* Top Hero Stats Banner */}
          <div className="trainer-levels-hero-banner">
            <div className="trainer-hero-left">
              <div className="trainer-hero-badge">
                <Trophy size={20} color="#facc15" />
                <span>{lang === 'cs' ? 'Oficiální systém úrovní 1–80' : lang === 'ja' ? '公式トレーナーレベル1〜80データ' : lang === 'ru' ? 'Официальная система уровней 1–80' : 'Official Level 1–80 Progression'}</span>
              </div>
              <h3 className="trainer-hero-title">
                {lang === 'cs' ? 'Kompletní přehled XP, odměn a Level-Up úkolů' : lang === 'ja' ? '必要XP・アンロック報酬・昇格タスク完全一覧' : lang === 'ru' ? 'Полный справочник XP, наград и заданий повышения' : 'Complete XP, Rewards & Level-Up Tasks Overview'}
              </h3>
              <p className="trainer-hero-desc">
                {lang === 'cs' 
                  ? 'Od levelu 1 do 70 postupujete čistě sběrem zkušeností. Závěrečných deset úrovní 71 až 80 vyžaduje kromě XP také splnění 4 náročných úkolů a celkem 50 platinových medailí.'
                  : lang === 'ja'
                  ? 'レベル1から70までは純粋な獲得XPのみで進行。最後の壁となるレベル71〜80ではXPに加え各4つの高難度タスクとプラチナメダル50個が必須となります。'
                  : lang === 'ru'
                  ? 'С 1 по 70 уровень прокачка идет чисто за счет опыта. Финальные уровни 71–80 требуют выполнения 4 испытаний на каждом шагу и 50 платиновых медалей.'
                  : 'Levels 1 through 70 progress strictly via cumulative XP. The final ten tiers (71–80) demand 4 rigorous Level-Up tasks each and 50 Platinum medals.'}
              </p>
            </div>

            <div className="trainer-hero-stats-grid">
              <div className="trainer-hero-stat-card">
                <span className="stat-label">{lang === 'cs' ? 'Celkem na Level 80' : lang === 'ja' ? 'Lv80到達累計XP' : lang === 'ru' ? 'Всего до 80 уровня' : 'Total XP to Level 80'}</span>
                <span className="stat-value gold-text">203 353 000 XP</span>
              </div>
              <div className="trainer-hero-stat-card">
                <span className="stat-label">{lang === 'cs' ? 'Level-Up úkoly' : lang === 'ja' ? '昇格タスク総数' : lang === 'ru' ? 'Квесты 71–80' : 'Endgame Tasks'}</span>
                <span className="stat-value cyan-text">40 {lang === 'cs' ? 'úkolů' : lang === 'ja' ? '個' : lang === 'ru' ? 'заданий' : 'tasks'}</span>
              </div>
              <div className="trainer-hero-stat-card">
                <div className="stat-label-row">
                  <span className="stat-label">{lang === 'cs' ? 'Váš checklist' : lang === 'ja' ? '達成状況' : lang === 'ru' ? 'Ваш прогресс' : 'Checklist Progress'}</span>
                  {completedTasksCount > 0 && (
                    <button 
                      type="button"
                      className="trainer-reset-btn"
                      onClick={clearCheckedTasks}
                      title={lang === 'cs' ? 'Resetovat všechny odškrtnuté úkoly' : 'Reset checklist'}
                    >
                      <RefreshCw size={12} />
                      <span>{lang === 'cs' ? 'Reset' : 'Reset'}</span>
                    </button>
                  )}
                </div>
                <div className="stat-progress-row">
                  <span className="stat-value green-text">{completedTasksCount} / {totalTasksCount}</span>
                  <div className="trainer-progress-bar-bg">
                    <div 
                      className="trainer-progress-bar-fill" 
                      style={{ width: `${(completedTasksCount / (totalTasksCount || 1)) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Platinum Medals Strategy Card */}
          <div className="platinum-blueprint-card">
            <div className="platinum-card-header" onClick={() => setShowPlatinumGuide(!showPlatinumGuide)}>
              <div className="platinum-header-left">
                <div className="platinum-icon-badge">
                  <Award size={22} color="#a855f7" />
                </div>
                <div>
                  <h4 className="platinum-title">
                    {lang === 'cs' ? 'Blueprint pro 50 Platinových medailí' : lang === 'ja' ? 'プラチナメダル50個最速攻略ブループリント' : lang === 'ru' ? 'План получения 50 платиновых медалей' : '50 Platinum Medals Master Blueprint'}
                  </h4>
                  <p className="platinum-subtitle">
                    {lang === 'cs' ? 'Doporučené priority a strategie pro splnění nejtěžší podmínky pro Level 80' : lang === 'ja' ? 'レベル80到達タスクを満たすための最速メダル獲得優先度' : lang === 'ru' ? 'Рекомендуемые приоритеты и тактики для выполнения требования 80 уровня' : 'Recommended priorities and fastest badges for Level 80'}
                  </p>
                </div>
              </div>

              <button type="button" className="platinum-toggle-btn">
                {showPlatinumGuide ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                <span>{showPlatinumGuide ? (lang === 'cs' ? 'Skrýt přehled' : 'Hide') : (lang === 'cs' ? 'Zobrazit přehled' : 'Expand')}</span>
              </button>
            </div>

            {showPlatinumGuide && (
              <div className="platinum-content-grid">
                {/* Tier S: Doporučené */}
                <div className="platinum-tier-column tier-recommended">
                  <div className="tier-column-header">
                    <span className="tier-tag tag-s">{lang === 'cs' ? '⚡ Doporučené a rychlé medaile' : lang === 'ja' ? '⚡ 最優先・最速達成メダル' : lang === 'ru' ? '⚡ Рекомендуемые быстрые медали' : '⚡ Recommended Fast Medals'}</span>
                    <span className="tier-count">6 {lang === 'cs' ? 'kategorií' : 'categories'}</span>
                  </div>
                  <div className="medal-items-list">
                    {PLATINUM_MEDALS_GUIDE.tierS.map((item, idx) => (
                      <div key={idx} className="medal-item-card">
                        <div className="medal-item-top">
                          <strong className="medal-name">{item.name[lang] || item.name.en}</strong>
                          <span className="medal-speed-chip speed-fast">{item.speed}</span>
                        </div>
                        <p className="medal-desc">{item.description[lang] || item.description.en}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tier A: Aktivní grinding */}
                <div className="platinum-tier-column tier-grind">
                  <div className="tier-column-header">
                    <span className="tier-tag tag-a">{lang === 'cs' ? '⚖️ Aktivní grinding medaile' : lang === 'ja' ? '⚖️ 周回推奨アクティブメダル' : lang === 'ru' ? '⚖️ Медали для активного фарма' : '⚖️ Active Grinding Medals'}</span>
                    <span className="tier-count">5 {lang === 'cs' ? 'kategorií' : 'categories'}</span>
                  </div>
                  <div className="medal-items-list">
                    {PLATINUM_MEDALS_GUIDE.tierA.map((item, idx) => (
                      <div key={idx} className="medal-item-card">
                        <div className="medal-item-top">
                          <strong className="medal-name">{item.name[lang] || item.name.en}</strong>
                          <span className="medal-speed-chip speed-medium">{item.speed}</span>
                        </div>
                        <p className="medal-desc">{item.description[lang] || item.description.en}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tier Avoid: Vyhnout se */}
                <div className="platinum-tier-column tier-avoid">
                  <div className="tier-column-header">
                    <span className="tier-tag tag-avoid">{lang === 'cs' ? '⛔ Medaile, kterým se vyhnout' : lang === 'ja' ? '⛔ 目標除外推奨メダル' : lang === 'ru' ? '⛔ Медали, которых лучше избегать' : '⛔ Medals to Avoid as Goals'}</span>
                    <span className="tier-count">5 {lang === 'cs' ? 'kategorií' : 'categories'}</span>
                  </div>
                  <div className="medal-items-list">
                    {PLATINUM_MEDALS_GUIDE.tierAvoid.map((item, idx) => (
                      <div key={idx} className="medal-item-card">
                        <div className="medal-item-top">
                          <strong className="medal-name">{item.name[lang] || item.name.en}</strong>
                          <span className="medal-speed-chip speed-avoid">{item.speed}</span>
                        </div>
                        <p className="medal-desc">{item.description[lang] || item.description.en}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Controls Bar: Tier Tabs & Search */}
          <div className="trainer-levels-controls-bar">
            <div className="trainer-tier-tabs">
              {tierTabs.map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  className={`trainer-tier-btn ${trainerTierFilter === tab.id ? 'active' : ''}`}
                  onClick={() => setTrainerTierFilter(tab.id as any)}
                >
                  {tab.label[lang] || tab.label.en}
                  {tab.id === 'tier3' && <span className="tier-task-indicator">{lang === 'cs' ? '40 úkolů' : '40 tasks'}</span>}
                </button>
              ))}
            </div>

            <div className="trainer-search-wrapper">
              <Search size={15} color="#94a3b8" />
              <input
                type="text"
                placeholder={lang === 'cs' ? 'Hledat úroveň, odměnu, Master Ball, úkol...' : lang === 'ja' ? 'レベル、報酬、マスターボール、タスクを検索...' : lang === 'ru' ? 'Поиск уровня, награды, Master Ball, квеста...' : 'Search level, reward, Master Ball, task...'}
                value={trainerSearch}
                onChange={e => setTrainerSearch(e.target.value)}
              />
              {trainerSearch && (
                <button type="button" className="trainer-clear-search" onClick={() => setTrainerSearch('')}>
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Filter results info */}
          <div className="trainer-results-summary">
            <span>
              {lang === 'cs' 
                ? `Zobrazeno ${filteredLevels.length} z ${TRAINER_LEVELS_DATA.length} úrovní`
                : lang === 'ja'
                ? `全${TRAINER_LEVELS_DATA.length}レベル中 ${filteredLevels.length}レベルを表示中`
                : lang === 'ru'
                ? `Показано ${filteredLevels.length} из ${TRAINER_LEVELS_DATA.length} уровней`
                : `Displaying ${filteredLevels.length} of ${TRAINER_LEVELS_DATA.length} levels`}
            </span>
          </div>

          {/* Levels Grid List */}
          <div className="trainer-levels-list">
            {filteredLevels.map(lvl => {
              const milestone = getMilestoneBadge(lvl.level);
              const isEndgame = lvl.level >= 71;

              return (
                <div 
                  key={lvl.level} 
                  id={`trainer-level-${lvl.level}`} 
                  className={`trainer-level-card ${milestone ? `is-milestone ${milestone.color}` : ''} ${isEndgame ? 'is-endgame-level' : ''}`}
                >
                  {/* Card Header */}
                  <div className="level-card-header">
                    <div className="level-badge-box">
                      <span className="level-number-badge">
                        <span className="lvl-prefix">Lv</span>
                        <span className="lvl-num">{lvl.level}</span>
                      </span>
                      {milestone && (
                        <span className={`milestone-tag ${milestone.color}`}>
                          <Sparkles size={12} />
                          {milestone.label[lang] || milestone.label.en}
                        </span>
                      )}
                    </div>

                    <div className="level-xp-metrics">
                      <div className="xp-metric-item">
                        <span className="xp-metric-label">{lang === 'cs' ? 'XP pro level' : lang === 'ja' ? '必要XP' : lang === 'ru' ? 'XP для уровня' : 'XP Required'}</span>
                        <strong className="xp-metric-val">
                          {lvl.xpRequired === 0 ? (lang === 'cs' ? 'Základní level' : 'Start') : `+${lvl.xpRequired.toLocaleString()} XP`}
                        </strong>
                      </div>
                      <div className="xp-metric-item">
                        <span className="xp-metric-label">{lang === 'cs' ? 'Celkové kumulativní XP' : lang === 'ja' ? '累計獲得XP' : lang === 'ru' ? 'Всего XP' : 'Total XP'}</span>
                        <span className="xp-metric-total">{lvl.totalXp.toLocaleString()} XP</span>
                      </div>
                    </div>
                  </div>

                  {/* Unlocked Features (if any) */}
                  {lvl.unlocks && lvl.unlocks.length > 0 && (
                    <div className="level-section level-unlocks-section">
                      <div className="section-label-row">
                        <Sparkles size={14} color="#38bdf8" />
                        <span className="section-title-label">
                          {lang === 'cs' ? 'Odemčené herní funkce a předměty' : lang === 'ja' ? '解放される機能・新アイテム' : lang === 'ru' ? 'Открываемые возможности и предметы' : 'Unlocked Features & Items'}
                        </span>
                      </div>
                      <div className="unlocks-chips-grid">
                        {lvl.unlocks.map((u, uIdx) => (
                          <div key={uIdx} className="unlock-feature-card">
                            {u.iconUrl && (
                              <img src={u.iconUrl} alt={u.title[lang] || u.title.en} className="unlock-feature-icon" loading="lazy" />
                            )}
                            <div className="unlock-feature-text">
                              <strong className="unlock-feature-title">{u.title[lang] || u.title.en}</strong>
                              <p className="unlock-feature-desc">{u.description[lang] || u.description.en}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Level-Up Tasks (Levels 71–80) */}
                  {lvl.tasks && lvl.tasks.length > 0 && (
                    <div className="level-section level-tasks-section">
                      <div className="section-label-row">
                        <Target size={14} color="#f59e0b" />
                        <span className="section-title-label highlight-tasks-title">
                          {lang === 'cs' ? 'Level-Up úkoly pro postup (Interaktivní checklist)' : lang === 'ja' ? '昇格タスク（タップしてチェック可能）' : lang === 'ru' ? 'Квесты для повышения уровня (Чек-лист)' : 'Level-Up Tasks (Interactive Checklist)'}
                        </span>
                      </div>
                      <div className="tasks-checklist-grid">
                        {lvl.tasks.map((task, tIdx) => {
                          const tKey = `lvl_${lvl.level}_task_${tIdx}`;
                          const isDone = !!checkedLevelTasks[tKey];

                          return (
                            <div key={tIdx} className={`task-item-card ${isDone ? 'is-completed' : ''}`}>
                              <div 
                                className="task-interactive-row"
                                onClick={() => toggleLevelTask(tKey)}
                                role="button"
                                tabIndex={0}
                              >
                                <span className={`task-checkbox-icon ${isDone ? 'checked' : ''}`}>
                                  {isDone ? <CheckSquare size={18} color="#22c55e" /> : <Square size={18} color="#94a3b8" />}
                                </span>
                                <span className={`task-text-body ${isDone ? 'done-text' : ''}`}>
                                  {task.text[lang] || task.text.en}
                                </span>
                              </div>

                              {task.tip && (
                                <div className="task-tip-box">
                                  <Lightbulb size={13} color="#f59e0b" />
                                  <span>{task.tip[lang] || task.tip.en}</span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Level Rewards */}
                  {lvl.rewards && lvl.rewards.length > 0 && (
                    <div className="level-section level-rewards-section">
                      <div className="section-label-row">
                        <Gift size={14} color="#aa3bff" />
                        <span className="section-title-label">
                          {lang === 'cs' ? 'Odměny za dosažení úrovně' : lang === 'ja' ? 'レベル到達報酬' : lang === 'ru' ? 'Награды за уровень' : 'Level-Up Rewards'}
                        </span>
                      </div>
                      <div className="rewards-chips-grid">
                        {lvl.rewards.map((rw, rwIdx) => (
                          <div key={rwIdx} className="reward-chip-item">
                            {rw.iconUrl && (
                              <img src={rw.iconUrl} alt={rw.name[lang] || rw.name.en} className="reward-chip-img" loading="lazy" />
                            )}
                            <span className="reward-qty-badge">×{rw.quantity}</span>
                            <span className="reward-item-name">{rw.name[lang] || rw.name.en}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        

          {/* 1-Click Search Operators Panel */}
          <div className="trainer-search-panel">
            <div className="panel-title-row">
              <Copy size={18} color="#facc15" />
              <h3>
                {lang === 'cs' ? '1-Click Vyhledávací Filtry pro Level-Up Úkoly a Platinové Medaile' :
                 lang === 'ja' ? 'レベルアップタスク・メダル達成用ワンタップ検索' :
                 lang === 'ru' ? 'Поисковые фильтры для левелапа и платиновых медалей' :
                 '1-Click In-Game Search Filters for Level-Up Tasks & Medals'}
              </h3>
            </div>

            <div className="search-cards-grid">
              <div className="search-action-card">
                <div className="search-info">
                  <code>4*&candyxl</code>
                  <span>{lang === 'cs' ? 'Kandidáti na Level 50 power-up (úkoly Level 71–80)' : 'Perfect 100% IV species to power up to Level 50'}</span>
                </div>
                <button 
                  type="button" 
                  className="copy-chip-btn"
                  onClick={() => handleCopy('4*&candyxl', '4*candyxl')}
                >
                  {copiedKey === '4*candyxl' ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
                  <span>{copiedKey === '4*candyxl' ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
                </button>
              </div>

              <div className="search-action-card">
                <div className="search-info">
                  <code>mega3</code>
                  <span>{lang === 'cs' ? 'Všichni Pokémoni na max Mega Levelu (úkoly na platinové medaile)' : 'All Pokémon at max Mega Level 3 for Successor medal'}</span>
                </div>
                <button 
                  type="button" 
                  className="copy-chip-btn"
                  onClick={() => handleCopy('mega3', 'mega3')}
                >
                  {copiedKey === 'mega3' ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
                  <span>{copiedKey === 'mega3' ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
                </button>
              </div>

              <div className="search-action-card">
                <div className="search-info">
                  <code>distance100-</code>
                  <span>{lang === 'cs' ? 'Výměny pro garantovanou Candy XL a Pilot medaili (10 000 000 km)' : 'Trades for guaranteed Candy XL and Pilot medal grinding'}</span>
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
                  <code>buddy5</code>
                  <span>{lang === 'cs' ? 'Všichni Best Buddies pro platinovou medaili Best Buddy' : 'All Best Buddies for Best Buddy Platinum medal progress'}</span>
                </div>
                <button 
                  type="button" 
                  className="copy-chip-btn"
                  onClick={() => handleCopy('buddy5', 'buddy5')}
                >
                  {copiedKey === 'buddy5' ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
                  <span>{copiedKey === 'buddy5' ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    };
