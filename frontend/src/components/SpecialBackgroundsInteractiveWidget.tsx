'use client';

import React, { useState, useMemo } from 'react';
import type { Language } from '../data/translations';
import { 
  MapPin, 
  ChevronRight, 
  Shield, 
  Search, 
  ZoomIn, 
  Zap, 
  CheckCircle2, 
  RotateCw,
  Copy,
  Check,
  X,
  Sparkles,
  Layers,
  Globe
} from 'lucide-react';
import { SPECIAL_BACKGROUNDS_CATALOG, type SpecialBackgroundItem } from '../data/specialBackgroundsData';
import { getPokemonIconUrl, handlePokemonImageError } from '../utils/imageResolver';
import { getPokemonName } from '../utils/pokemonTranslator';
import './SpecialBackgroundsInteractiveWidget.css';

interface SpecialBackgroundsInteractiveWidgetProps {
  lang: Language;
  onNavigateArticle?: (slug: string) => void;
}

export const SpecialBackgroundsInteractiveWidget: React.FC<SpecialBackgroundsInteractiveWidgetProps> = ({ 
  lang,
  onNavigateArticle
}) => {
  const [specialBgFilter, setSpecialBgFilter] = useState<string>('all');
  const [specialBgSearch, setSpecialBgSearch] = useState<string>('');
  const [previewModalImg, setPreviewModalImg] = useState<{ url: string; title: string } | null>(null);
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

  const handleArticleClick = (slug: string) => {
    if (onNavigateArticle) {
      onNavigateArticle(slug);
    } else {
      window.location.href = `/${lang}/guides/${slug}`;
    }
  };

  const renderPokemonChip = (name: string, isShadow = false, isShiny = false) => {
    const iconUrl = getPokemonIconUrl(name, isShiny);
    const displayName = getPokemonName(name, lang);
    return (
      <div key={name} className="special-bg-chip">
        <img 
          src={iconUrl} 
          alt={displayName} 
          onError={(e) => handlePokemonImageError(e.currentTarget, name, isShiny)}
          loading="lazy"
        />
        <span>{displayName}</span>
      </div>
    );
  };

  const specialBgFilterTabs = [
        { id: 'all', label: { cs: '🌐 Všechna pozadí', en: '🌐 All Backgrounds', ja: '🌐 全ての背景', ru: '🌐 Все фоны' } },
        { id: 'global', label: { cs: '🌌 Globální (Ultra, Týmy)', en: '🌌 Global (Ultra, Teams)', ja: '🌌 グローバル背景', ru: '🌌 Глобальные' } },
        { id: 'go-fest', label: { cs: '🎪 GO Fest (Města)', en: '🎪 GO Fest (Cities)', ja: '🎪 GO Fest（都市）', ru: '🎪 GO Fest (Города)' } },
        { id: 'city-safari', label: { cs: '🧭 City Safari (Eevee)', en: '🧭 City Safari (Eevee)', ja: '🧭 City Safari', ru: '🧭 City Safari' } },
        { id: 'go-tour', label: { cs: '⏳ GO Tour (Legendy)', en: '⏳ GO Tour', ja: '⏳ GO Tour', ru: '⏳ GO Tour' } },
        { id: 'heritage', label: { cs: '🏛️ Partnerství & WCS', en: '🏛️ Heritage & WCS', ja: '🏛️ 提携史跡・WCS', ru: '🏛️ Партнеры и WCS' } }
      ];

      const filteredBackgrounds = SPECIAL_BACKGROUNDS_CATALOG.filter(item => {
        if (specialBgFilter !== 'all' && item.category !== specialBgFilter) return false;

        if (specialBgSearch.trim()) {
          const q = specialBgSearch.toLowerCase();
          const matchTitle = (item.title[lang] || item.title.en).toLowerCase().includes(q);
          const matchEvent = (item.event[lang] || item.event.en).toLowerCase().includes(q);
          const matchLoc = (item.location[lang] || item.location.en).toLowerCase().includes(q);
          const matchArt = (item.backgroundArtwork[lang] || item.backgroundArtwork.en).toLowerCase().includes(q);
          const matchPkm = item.featuredPokemon.some(p => p.toLowerCase().includes(q));
          if (!matchTitle && !matchEvent && !matchLoc && !matchArt && !matchPkm) return false;
        }
        return true;
      });

      return (
        <div className="guide-special-bg-widget">
          {/* Prominent Pokélid Link Banner */}
          <div className="special-bg-pokelid-callout">
            <div className="callout-flag-col">
              <span className="callout-flag-icon">🗾</span>
            </div>
            <div className="callout-main-col">
              <div className="callout-badge">
                <MapPin size={14} />
                <span>{lang === 'cs' ? 'Hledáte Poké Lids v Japonsku?' : lang === 'ja' ? '日本のポケふたをお探しの方へ' : lang === 'ru' ? 'Ищете Poké Lids в Японии?' : 'Looking for Poké Lids in Japan?'}</span>
              </div>
              <h4>{lang === 'cs' ? 'Pokélid Stamp Rally v Japonsku má samostatného průvodce!' : lang === 'ja' ? '全国41都道府県のポケふたスタンプラリーは専用ガイドで徹底解説！' : lang === 'ru' ? 'Для Poké Lid Stamp Rally в Японии есть отдельный гайд!' : 'Poké Lid Stamp Rally in Japan has its own dedicated master guide!'}</h4>
              <p>
                {lang === 'cs' 
                  ? 'Všechny litinové manhole poklopy, razítka, 100% pokryté prefektury a postup zisku Pikachu s lokačním pozadím naleznete v samostatném článku.' 
                  : lang === 'ja' 
                  ? '全国の推しポケモン、各都道府県の限定背景ピカチュウ入手方法は専用ページをご覧ください。' 
                  : lang === 'ru' 
                  ? 'Все о японских люках, штампах и получении Пикачу с фоном префектуры читайте в отдельном руководстве.' 
                  : 'All cast-iron manhole covers, stamps, and prefecture-specific Pikachu encounter mechanics are detailed in our specialized guide.'}
              </p>
            </div>
            <div className="callout-action-col">
              <button 
                className="callout-nav-btn"
                onClick={() => handleArticleClick('pokelid-stamp-rally-japan-guide')}
              >
                <span>{lang === 'cs' ? 'Otevřít Pokélid Průvodce' : lang === 'ja' ? 'ポケふたガイドを見る' : lang === 'ru' ? 'Открыть гайд Pokélid' : 'Open Poké Lid Guide'}</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Core Rules Quick Summary Bar */}
          <div className="special-bg-rules-banner">
            <div className="rules-header">
              <Shield size={16} color="#38bdf8" />
              <strong>{lang === 'cs' ? '4 Zlatá pravidla Lokačních karet a Speciálních pozadí:' : lang === 'ja' ? '記念背景システムの4大重要ルール：' : lang === 'ru' ? '4 главных правила карточек локаций и фонов:' : '4 Golden Rules of Location & Special Backgrounds:'}</strong>
            </div>
            <div className="rules-grid">
              <div className="rule-item">
                <span className="rule-badge">1. {lang === 'cs' ? 'Special Trade' : 'Special Trade'}</span>
                <p>{lang === 'cs' ? 'Každá výměna Pokémona s pozadím VŽDY spotřebuje 1 denní Special Trade slot!' : 'Always consumes a daily Special Trade slot!'}</p>
              </div>
              <div className="rule-item">
                <span className="rule-badge">2. {lang === 'cs' ? '100% Trvalost' : '100% Permanent'}</span>
                <p>{lang === 'cs' ? 'Pozadí se NIKDY nesmaže při výměně ani při evoluci na vyšší vývojové stádium.' : 'Background is 100% preserved upon trading and evolution.'}</p>
              </div>
              <div className="rule-item">
                <span className="rule-badge">3. {lang === 'cs' ? 'Pouze Na Místě' : 'In-Person Only'}</span>
                <p>{lang === 'cs' ? 'Lokační karty měst padají POUZE z osobních raidů na místě (Remote Raid Passy je NIKDY nedají!).' : 'City cards drop ONLY from in-person raids. Never Remote!'}</p>
              </div>
              <div className="rule-item">
                <span className="rule-badge danger-badge">4. ⚠️ Pokémon HOME</span>
                <p>{lang === 'cs' ? 'Převod do Pokémon HOME pozadí NAVŽDY A NENÁVRATNĚ SMAŽE!' : 'Transferring to Pokémon HOME permanently DELETES the background!'}</p>
              </div>
            </div>
          </div>

          {/* Filter Controls & Search */}
          <div className="special-bg-controls">
            <div className="special-bg-filter-tabs">
              {specialBgFilterTabs.map(tab => (
                <button
                  key={tab.id}
                  className={`special-bg-tab-btn ${specialBgFilter === tab.id ? 'active' : ''}`}
                  onClick={() => setSpecialBgFilter(tab.id as any)}
                >
                  {tab.label[lang] || tab.label.en}
                </button>
              ))}
            </div>

            <div className="special-bg-search-box">
              <Search size={15} color="#94a3b8" />
              <input
                type="text"
                placeholder={lang === 'cs' ? 'Hledat město, Pokémona, událost, rok...' : lang === 'ja' ? '都市名、ポケモン名、イベント、年号を検索...' : lang === 'ru' ? 'Поиск города, покемона, ивента...' : 'Search city, Pokémon, event, year...'}
                value={specialBgSearch}
                onChange={e => setSpecialBgSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Backgrounds Grid */}
          <div className="special-bg-grid">
            {filteredBackgrounds.map(item => (
              <div key={item.id} className="special-bg-card">
                <div className="special-bg-card-top">
                  <span className="special-bg-year-tag">{item.year}</span>
                  <span className={`special-bg-category-badge cat-${item.category}`}>
                    {item.isGlobal ? '🌌 Global' : '📍 In-Person'}
                  </span>
                  <span className="special-bg-loc-pill">
                    {item.location[lang] || item.location.en}
                  </span>
                </div>

                {item.cardImageUrl && (
                  <div 
                    className="special-bg-preview-banner"
                    title={lang === 'cs' ? 'Kliknutím zvětšit pozadí' : 'Click to enlarge background'}
                    onClick={() => setPreviewModalImg({
                      url: item.cardImageUrl!,
                      title: `${item.title[lang] || item.title.en} (${item.year})`
                    })}
                  >
                    <img 
                      src={item.cardImageUrl} 
                      alt={item.title[lang] || item.title.en} 
                      className="special-bg-banner-img" 
                      loading="lazy" 
                    />
                    <div className="special-bg-banner-overlay" />
                    <span className="special-bg-banner-tag">
                      {item.isGlobal ? '🌌 Special Background' : '📍 Location Card'}
                    </span>
                    <span className="special-bg-zoom-badge">
                      <ZoomIn size={13} />
                      <span>{lang === 'cs' ? 'Zvětšit' : 'Enlarge'}</span>
                    </span>
                  </div>
                )}

                <h4 className="special-bg-title">{item.title[lang] || item.title.en}</h4>
                <p className="special-bg-event">{item.event[lang] || item.event.en}</p>

                <div className="special-bg-featured-row">
                  <span className="featured-label">{lang === 'cs' ? 'Dostupní Pokémoni:' : lang === 'ja' ? '対象ポケモン：' : lang === 'ru' ? 'Покемоны:' : 'Featured Pokémon:'}</span>
                  <div className="special-bg-pokemon-chips">
                    {item.featuredPokemon.map(p => renderPokemonChip(p))}
                  </div>
                </div>

                <div className="special-bg-artwork-box">
                  <span className="art-label">{lang === 'cs' ? 'Vizuální motiv pozadí:' : lang === 'ja' ? '背景アート内容：' : lang === 'ru' ? 'Мотив фона:' : 'Background Visual Motif:'}</span>
                  <p className="art-desc">{item.backgroundArtwork[lang] || item.backgroundArtwork.en}</p>
                </div>

                <div className="special-bg-card-bottom">
                  <div className="special-bg-acq-pill">
                    <Zap size={13} color="#38bdf8" />
                    <span>{item.acquisitionMethod[lang] || item.acquisitionMethod.en}</span>
                  </div>
                  <div className="special-bg-trade-pill">
                    <CheckCircle2 size={13} color="#22c55e" />
                    <span>100% {lang === 'cs' ? 'Zachováno při Trade' : lang === 'ja' ? 'トレード維持' : lang === 'ru' ? 'Сохраняется при обмене' : 'Trade Permanent'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Fusion Rules Explainer Card */}
          <div className="fusion-genetics-card">
            <div className="fusion-card-header">
              <RotateCw size={18} color="#aa3bff" />
              <h4>{lang === 'cs' ? 'Pravidla fúze pozadí: Dusk Mane / Dawn Wings Necrozma & Kyurem' : lang === 'ja' ? '合体ポケモンの背景遺伝ルール（ネクロズマ＆キュレム）' : lang === 'ru' ? 'Генетика фонов при слиянии: Necrozma и Kyurem' : 'Fusion Background Genetics: Necrozma & Kyurem'}</h4>
            </div>
            <div className="fusion-scenarios-grid">
              <div className="fusion-scenario">
                <span className="scenario-badge badge-resonance">🌌 {lang === 'cs' ? 'Fúzní Rezonance' : 'Fusion Resonance'}</span>
                <strong>Wormhole Necrozma + Sun / Moon Partner</strong>
                <p>{lang === 'cs' ? 'Vzniká exkluzivní pozadí Solar Eclipse (Zatmění Slunce) nebo Lunar Eclipse (Zatmění Měsíce)!' : 'Produces exclusive Solar Eclipse or Lunar Eclipse fusion background!'}</p>
              </div>
              <div className="fusion-scenario">
                <span className="scenario-badge badge-city">🏙️ {lang === 'cs' ? 'Priorita Města' : 'City Card Priority'}</span>
                <strong>Městská Karta Necrozmy (Sendai/Madrid/NYC)</strong>
                <p>{lang === 'cs' ? 'Městská lokační karta má přednost a fúzní forma si zachová panorama města.' : 'The City Location Card takes priority, preserving the host city skyline.'}</p>
              </div>
              <div className="fusion-scenario">
                <span className="scenario-badge badge-safe">🛡️ {lang === 'cs' ? '100% Bezpečné Rozpojení' : 'Safe Unfuse'}</span>
                <strong>Rozpojení fúze (Unfuse)</strong>
                <p>{lang === 'cs' ? 'Kdykoliv zdarma. Oba Pokémoni se vrátí do boxu se svými původními pozadími!' : 'Completely free. Both Pokémon return to storage with original backgrounds!'}</p>
              </div>
            </div>
          </div>
        

          {/* Modal Lightbox for enlarged card viewing */}
          {previewModalImg && (
            <div className="special-bg-modal-overlay" onClick={() => setPreviewModalImg(null)}>
              <div className="special-bg-modal-window" onClick={e => e.stopPropagation()}>
                <div className="modal-top-bar">
                  <h4>{previewModalImg.title}</h4>
                  <button 
                    type="button" 
                    className="modal-close-btn" 
                    onClick={() => setPreviewModalImg(null)}
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="modal-img-wrap">
                  <img src={previewModalImg.url} alt={previewModalImg.title} />
                </div>
              </div>
            </div>
          )}

          {/* 1-Click Search Operators Panel */}
          <div className="special-bg-search-panel">
            <div className="panel-title-row">
              <Copy size={18} color="#facc15" />
              <h3>
                {lang === 'cs' ? '1-Click Vyhledávací Filtry pro Batoh (Speciální Pozadí & Lokační Karty)' :
                 lang === 'ja' ? 'ロケーションカード・スペシャル背景用検索コマンド' :
                 lang === 'ru' ? 'Быстрые поисковые фильтры для карточек локаций' :
                 '1-Click In-Game Search Filters for Backgrounds & Location Cards'}
              </h3>
            </div>

            <div className="search-cards-grid">
              <div className="search-action-card">
                <div className="search-info">
                  <code>specialbackground</code>
                  <span>{lang === 'cs' ? 'Všechna globální speciální pozadí (Ultra Wormhole, Team Leaders, Fúze)' : 'All global special backgrounds (Ultra Wormhole, Leaders, Fusions)'}</span>
                </div>
                <button 
                  type="button" 
                  className="copy-chip-btn"
                  onClick={() => handleCopy('specialbackground', 'specialbg')}
                >
                  {copiedKey === 'specialbg' ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
                  <span>{copiedKey === 'specialbg' ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
                </button>
              </div>

              <div className="search-action-card">
                <div className="search-info">
                  <code>locationbackground</code>
                  <span>{lang === 'cs' ? 'Všechny městské lokační karty z akcí GO Fest, Safari a Poké Lids' : 'All in-person city location cards from GO Fest, Safari & Poké Lids'}</span>
                </div>
                <button 
                  type="button" 
                  className="copy-chip-btn"
                  onClick={() => handleCopy('locationbackground', 'locationbg')}
                >
                  {copiedKey === 'locationbg' ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
                  <span>{copiedKey === 'locationbg' ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
                </button>
              </div>

              <div className="search-action-card">
                <div className="search-info">
                  <code>locationbackground&necrozma,kyurem</code>
                  <span>{lang === 'cs' ? 'Fúzní monstra s prestižními městskými panoramaty' : 'Fused monsters with host city skylines'}</span>
                </div>
                <button 
                  type="button" 
                  className="copy-chip-btn"
                  onClick={() => handleCopy('locationbackground&necrozma,kyurem', 'fused_cities')}
                >
                  {copiedKey === 'fused_cities' ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
                  <span>{copiedKey === 'fused_cities' ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    };
