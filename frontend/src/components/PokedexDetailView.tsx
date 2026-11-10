'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Shield,
  Zap,
  Flame,
  SlidersHorizontal,
  Swords,
  Sword,
  ShieldAlert,
  Heart,
  Star,
  Trophy,
  CheckCircle2,
  Clock,
  Layers,
  HelpCircle
} from 'lucide-react';

import {
  POKEDEX_MAP,
  type PokedexCatalogEntry,
  type PokedexVariant,
  type PokemonType
} from '../data/pokedexCatalog';
import { translations, type Language } from '../data/translations';
import { getPokemonName, getStatusTagName } from '../utils/pokemonTranslator';
import { UnifiedTypeBadge, TYPE_COLORS } from '../utils/typeBadgeHelper';
import { TYPE_CHART, getTopCountersForPokemon } from '../utils/pokemonCountersHelper';
import { pokemonRankings, type PokemonRankData } from '../data/pokemonRankings';
import { analyzeGreatLeague, analyzeUltraLeague, generatePokedexEditorialAnalysis } from '../utils/pokedexSeoHelper';
import { PokemonMetaRankingBadges } from './PokemonMetaRankingBadges';
import './PokedexDetailView.css';

const GENERATION_NAMES: Record<number, { cs: string; en: string; ja: string; ru: string; region: string }> = {
  1: { cs: 'Gen 1: Kanto', en: 'Gen 1: Kanto', ja: '第1世代: カントー', ru: 'Ген 1: Канто', region: 'Kanto' },
  2: { cs: 'Gen 2: Johto', en: 'Gen 2: Johto', ja: '第2世代: ジョウト', ru: 'Ген 2: Джото', region: 'Johto' },
  3: { cs: 'Gen 3: Hoenn', en: 'Gen 3: Hoenn', ja: '第3世代: ホウエン', ru: 'Ген 3: Хоэнн', region: 'Hoenn' },
  4: { cs: 'Gen 4: Sinnoh', en: 'Gen 4: Sinnoh', ja: '第4世代: シンオウ', ru: 'Ген 4: Синно', region: 'Sinnoh' },
  5: { cs: 'Gen 5: Unova', en: 'Gen 5: Unova', ja: '第5世代: イッシュ', ru: 'Ген 5: Юнова', region: 'Unova' },
  6: { cs: 'Gen 6: Kalos', en: 'Gen 6: Kalos', ja: '第6世代: カロス', ru: 'Ген 6: Калос', region: 'Kalos' },
  7: { cs: 'Gen 7: Alola', en: 'Gen 7: Alola', ja: '第7世代: アローラ', ru: 'Ген 7: Алола', region: 'Alola' },
  8: { cs: 'Gen 8: Galar & Hisui', en: 'Gen 8: Galar & Hisui', ja: '第8世代: ガラル・ヒスイ', ru: 'Ген 8: Галар и Хисуи', region: 'Galar' },
  9: { cs: 'Gen 9: Paldea', en: 'Gen 9: Paldea', ja: '第9世代: パルデア', ru: 'Ген 9: Палдея', region: 'Paldea' }
};

const ALL_TYPES: PokemonType[] = [
  'Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Ice',
  'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug',
  'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'
];

interface PokedexDetailViewProps {
  entry: PokedexCatalogEntry;
  lang: Language;
}

export const PokedexDetailView: React.FC<PokedexDetailViewProps> = ({ entry, lang }) => {
  const t = translations[lang] || translations.en;

  const [activeVariantId, setActiveVariantId] = useState<string | null>(null);
  const [isShiny, setIsShiny] = useState<boolean>(false);

  // Synchronize shiny state and variant from localStorage and URL query param
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const isParamShiny = urlParams.get('shiny') === '1' || urlParams.get('shiny') === 'true';
      const isStoredShiny = localStorage.getItem('pogo_pokedex_shiny') === 'true';
      if (isParamShiny || isStoredShiny) {
        setIsShiny(true);
      }

      const variantParam = urlParams.get('variant');
      if (variantParam && entry.variants && entry.variants.length > 0) {
        const lowerParam = variantParam.toLowerCase();
        const found = entry.variants.find(
          (v) =>
            v.id.toLowerCase() === lowerParam ||
            v.category.toLowerCase() === lowerParam ||
            v.name.en.toLowerCase() === lowerParam ||
            v.id.toLowerCase().replace(/_/g, '-') === lowerParam
        );
        if (found) {
          setActiveVariantId(found.id);
        }
      }
    }
  }, [entry.variants]);

  const handleToggleShiny = () => {
    setIsShiny((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('pogo_pokedex_shiny', next ? 'true' : 'false');
      }
      return next;
    });
  };

  const shinyQuery = isShiny ? '?shiny=1' : '';

  // Active Variant Data
  const activeVariant = useMemo(() => {
    if (!activeVariantId) return null;
    return entry.variants.find((v) => v.id === activeVariantId) || null;
  }, [entry.variants, activeVariantId]);

  const currentTypes = activeVariant ? activeVariant.types : entry.types;
  const currentStats = activeVariant ? activeVariant.stats : entry.stats;
  const currentCp = activeVariant ? activeVariant.maxCp : entry.maxCp.lv50;
  const currentQuickMoves = activeVariant?.quickMoves && activeVariant.quickMoves.length > 0 ? activeVariant.quickMoves : entry.quickMoves;
  const currentCinematicMoves = activeVariant?.cinematicMoves && activeVariant.cinematicMoves.length > 0 ? activeVariant.cinematicMoves : entry.cinematicMoves;

  // Prev & Next Pokémon
  const prevEntry = POKEDEX_MAP[entry.dexId - 1] || null;
  const nextEntry = POKEDEX_MAP[entry.dexId + 1] || null;

  // Localized Name Formatter
  const getPokeTitle = useCallback(
    (poke: PokedexCatalogEntry, variant?: PokedexVariant | null) => {
      if (variant) {
        if (lang === 'ja') return variant.name.ja;
        if (lang === 'cs' && variant.name.cs) return variant.name.cs;
        if (lang === 'ru' && variant.name.ru) return variant.name.ru;
        return variant.name.en;
      }
      if (lang === 'ja') return poke.names.ja;
      return getPokemonName(poke.names.en, lang);
    },
    [lang]
  );

  // Sprite Resolver
  const resolveArtwork = useCallback(
    (poke: PokedexCatalogEntry, variant?: PokedexVariant | null, shiny = false) => {
      if (variant?.spriteOverrides) {
        if (shiny && variant.spriteOverrides.shinyArtwork) return variant.spriteOverrides.shinyArtwork;
        if (variant.spriteOverrides.officialArtwork) return variant.spriteOverrides.officialArtwork;
        if (variant.spriteOverrides.goAsset) return variant.spriteOverrides.goAsset;
      }
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${shiny ? 'shiny/' : ''}${poke.dexId}.png`;
    },
    []
  );

  const handleImageError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement, Event>, poke: PokedexCatalogEntry, shiny = false) => {
      const target = e.currentTarget;
      const currentSrc = target.src;
      const variantFolder = shiny ? 'shiny' : 'normal';
      const cleanSlug = poke.slug?.toLowerCase().replace(/[^a-z0-9-]/g, '') || String(poke.dexId);

      // Fallback 1: PokemonDB Home high-res sprite
      if (currentSrc.includes('official-artwork')) {
        target.src = `https://img.pokemondb.net/sprites/home/${variantFolder}/${cleanSlug}.png`;
        return;
      }
      // Fallback 2: PokeAPI Home 3D sprite
      if (currentSrc.includes('pokemondb.net')) {
        target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${shiny ? 'shiny/' : ''}${poke.dexId}.png`;
        return;
      }
      // Fallback 3: PokeMiners official asset
      if (currentSrc.includes('/home/')) {
        target.src = `https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm${poke.dexId}.icon.png`;
        return;
      }
      // Fallback 4: Universal Pokeball
      target.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';
    },
    []
  );

  // Type Weaknesses and Resistances
  const { weaknesses, resistances } = useMemo(() => {
    const multipliers: Record<string, number> = {};
    ALL_TYPES.forEach((atkType) => {
      let mult = 1.0;
      currentTypes.forEach((defType) => {
        const attackMap = TYPE_CHART[atkType];
        if (attackMap && attackMap[defType] !== undefined) {
          mult *= attackMap[defType];
        }
      });
      multipliers[atkType] = mult;
    });

    const weak = Object.entries(multipliers)
      .filter(([_, m]) => m > 1.0)
      .sort((a, b) => b[1] - a[1])
      .map(([tName, m]) => ({ type: tName as PokemonType, mult: m }));

    const res = Object.entries(multipliers)
      .filter(([_, m]) => m < 1.0)
      .sort((a, b) => a[1] - b[1])
      .map(([tName, m]) => ({ type: tName as PokemonType, mult: m }));

    return { weaknesses: weak, resistances: res };
  }, [currentTypes]);

  // Evolution Chain Nodes
  const familyNodes = useMemo(() => {
    return entry.evolutionChainIds
      .map((id) => POKEDEX_MAP[id])
      .filter(Boolean);
  }, [entry.evolutionChainIds]);

  // Cross-reference with pokemonRankings
  const rankMatch = useMemo(() => {
    return (
      pokemonRankings.find((p) => p.pokedexId === entry.dexId && !p.isShadow && !p.isMega && !p.isPrimal) ||
      pokemonRankings.find((p) => p.pokedexId === entry.dexId) ||
      null
    );
  }, [entry.dexId]);

  const pvpGreatLeague = useMemo(() => {
    if (!rankMatch) return null;
    return analyzeGreatLeague(rankMatch);
  }, [rankMatch]);

  const pvpUltraLeague = useMemo(() => {
    if (!rankMatch) return null;
    return analyzeUltraLeague(rankMatch);
  }, [rankMatch]);

  const topCounters = useMemo(() => {
    if (!rankMatch) return [];
    return getTopCountersForPokemon(rankMatch, pokemonRankings).slice(0, 6);
  }, [rankMatch]);

  const totalBaseStats = currentStats.attack + currentStats.defense + currentStats.stamina;
  const editorialReport = useMemo(() => generatePokedexEditorialAnalysis(entry, lang), [entry, lang]);

  return (
    <div className="pokedex-detail-container">
      {/* ─── Breadcrumb & Prev / Next Bar ──────────────────────────────────────── */}
      <nav className="pokedex-detail-top-nav" aria-label="Pokédex navigace">
        <Link href={`/${lang}/pokedex`} className="pokedex-detail-back-btn">
          <ArrowLeft size={16} />
          <span>{t.pokedex_back_to_catalog || '← Zpět do Pokédexu'}</span>
        </Link>

        <div className="pokedex-detail-prev-next-group">
          {prevEntry ? (
            <Link
              href={`/${lang}/pokedex/${prevEntry.slug}${shinyQuery}`}
              className="pokedex-detail-nav-link prev"
              title={`#${prevEntry.dexId} ${getPokeTitle(prevEntry)}`}
            >
              <ChevronLeft size={16} />
              <span className="pokedex-nav-num">#{prevEntry.dexId}</span>
              <span className="pokedex-nav-name">{getPokeTitle(prevEntry)}</span>
            </Link>
          ) : (
            <div className="pokedex-detail-nav-placeholder" />
          )}

          {nextEntry ? (
            <Link
              href={`/${lang}/pokedex/${nextEntry.slug}${shinyQuery}`}
              className="pokedex-detail-nav-link next"
              title={`#${nextEntry.dexId} ${getPokeTitle(nextEntry)}`}
            >
              <span className="pokedex-nav-name">{getPokeTitle(nextEntry)}</span>
              <span className="pokedex-nav-num">#{nextEntry.dexId}</span>
              <ChevronRight size={16} />
            </Link>
          ) : (
            <div className="pokedex-detail-nav-placeholder" />
          )}
        </div>
      </nav>

      {/* ─── Hero Card ───────────────────────────────────────────────────────── */}
      <header className="pokedex-detail-hero-card">
        {/* Left: Sprite & Shiny Toggle */}
        <div className="pokedex-detail-sprite-box">
          <div className="pokedex-detail-sprite-container">
            <img
              src={resolveArtwork(entry, activeVariant, isShiny)}
              alt={entry.names.en}
              className="pokedex-detail-sprite"
              onError={(e) => handleImageError(e, entry, isShiny)}
            />
          </div>

          <button
            type="button"
            className={`pokedex-detail-shiny-btn ${isShiny ? 'active' : ''}`}
            onClick={handleToggleShiny}
            aria-pressed={isShiny}
          >
            <Sparkles size={16} />
            <span>{isShiny ? (t.pokedex_shiny_active || 'Shiny') : (t.pokedex_shiny_normal || 'Normální')}</span>
          </button>
        </div>

        {/* Right: Metadata & Form Picker */}
        <div className="pokedex-detail-hero-info">
          {/* Top Badges Row */}
          <div className="pokedex-detail-badge-strip">
            <span className="pokedex-detail-dex-pill">
              #{String(entry.dexId).padStart(3, '0')}
            </span>
            <span className="pokedex-detail-gen-pill">
              {GENERATION_NAMES[entry.generation]?.[lang] || GENERATION_NAMES[entry.generation]?.en}
            </span>
            {entry.rarityClass !== 'standard' && (
              <span className={`pokedex-detail-rarity-pill ${entry.rarityClass}`}>
                {entry.rarityClass.replace('_', ' ')}
              </span>
            )}
            {entry.isReleasedInGo ? (
              <span className="pokedex-detail-status-pill released">
                <CheckCircle2 size={12} />
                <span>{t.pokedex_status_released || 'Pokémon GO'}</span>
              </span>
            ) : (
              <span className="pokedex-detail-status-pill unreleased">
                <Clock size={12} />
                <span>{t.pokedex_status_unreleased || 'Dosud nevydán'}</span>
              </span>
            )}
          </div>

          {/* Names Row: User specified rule:
              In JA: Katakana is primary, English subtitle.
              In CS, EN, RU: Localized primary, NO Japanese Katakana subtitle! */}
          <div className="pokedex-detail-title-row">
            <h1 className="pokedex-detail-main-title">
              {getPokeTitle(entry, activeVariant)}
            </h1>
            {lang === 'ja' && (
              <span className="pokedex-detail-en-subtitle">{entry.names.en}</span>
            )}
            <PokemonMetaRankingBadges
              slug={entry.slug}
              lang={lang}
              size="md"
              className="pokedex-title-meta-badges"
              maxItems={8}
            />
          </div>

          {/* Types Badges with Soft Colors and SVG Icons */}
          <div className="pokedex-detail-types-strip">
            {currentTypes.map((tName) => (
              <UnifiedTypeBadge
                key={tName}
                type={tName}
                lang={lang}
                size="md"
                showIcon={true}
              />
            ))}
          </div>

          {/* Form / Variant Switcher Pills */}
          {entry.variants.length > 0 && (
            <div className="pokedex-detail-variant-box">
              <span className="pokedex-variant-box-label">
                <Layers size={14} />
                <span>{t.pokedex_detail_variants_title || 'Dostupné formy & varianty'}:</span>
              </span>
              <div className="pokedex-detail-variant-chips">
                <button
                  type="button"
                  className={`pokedex-variant-chip ${!activeVariantId ? 'active' : ''}`}
                  onClick={() => setActiveVariantId(null)}
                >
                  {t.pokedex_base_form || 'Základní forma'}
                </button>
                {entry.variants.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    className={`pokedex-variant-chip ${activeVariantId === v.id ? 'active' : ''}`}
                    onClick={() => setActiveVariantId(v.id)}
                  >
                    {v.name[lang] || v.name.en}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Key Stat Highlights Strip */}
          <div className="pokedex-detail-stats-strip">
            <div className="pokedex-stat-pill-item cp">
              <span className="label">
                <Star size={12} style={{ color: '#fbbf24', marginRight: 4, verticalAlign: 'middle' }} />
                {t.pokedex_stat_max_cp || 'Max CP (Lv 50)'}
              </span>
              <span className="val">{currentCp}</span>
            </div>
            <div className="pokedex-stat-pill-item">
              <span className="label">
                <Sword size={12} style={{ color: '#f87171', marginRight: 4, verticalAlign: 'middle' }} />
                {t.pokedex_stat_atk_short || 'Útok (ATK)'}
              </span>
              <span className="val">{currentStats.attack}</span>
            </div>
            <div className="pokedex-stat-pill-item">
              <span className="label">
                <ShieldAlert size={12} style={{ color: '#60a5fa', marginRight: 4, verticalAlign: 'middle' }} />
                {t.pokedex_stat_def_short || 'Obrana (DEF)'}
              </span>
              <span className="val">{currentStats.defense}</span>
            </div>
            <div className="pokedex-stat-pill-item">
              <span className="label">
                <Heart size={12} style={{ color: '#4ade80', marginRight: 4, verticalAlign: 'middle' }} />
                {t.pokedex_stat_sta_short || 'Výdrž (HP)'}
              </span>
              <span className="val">{currentStats.stamina}</span>
            </div>
            <div className="pokedex-stat-pill-item total">
              <span className="label">
                <Trophy size={12} style={{ color: 'var(--accent-color)', marginRight: 4, verticalAlign: 'middle' }} />
                {t.pokedex_stat_total || 'Celkem'}
              </span>
              <span className="val">{totalBaseStats}</span>
            </div>
          </div>
        </div>
      </header>

      {/* ─── Fusion & Signature Form Infobox ─────────────────────────────────── */}
      {activeVariant &&
        (activeVariant.category === 'fusion' ||
          Boolean(activeVariant.signatureMove) ||
          Boolean(activeVariant.adventureEffect)) && (
          <section className="pokedex-detail-card pokedex-fusion-hero-card" aria-label="Fusion Mechanics">
            <h2 className="pokedex-detail-card-title">
              <Sparkles size={18} style={{ color: '#fbbf24' }} />
              <span>{t.pokedex_fusion_title || 'Fúzní mechanika & Adventure Effect'}</span>
            </h2>

            <div className="pokedex-fusion-content-grid">
              {/* Fusion Partner & Requirements */}
              {activeVariant.fusionPartner && (
                <div className="pokedex-fusion-box-col">
                  <div className="pokedex-fusion-metric-row">
                    <span className="pokedex-fusion-metric-label">
                      <Layers size={14} style={{ color: 'var(--accent-color)', marginRight: 6, verticalAlign: 'middle' }} />
                      {t.pokedex_fusion_partner || 'Fúzní partner'}:
                    </span>
                    <span className="pokedex-fusion-metric-val highlight">{activeVariant.fusionPartner}</span>
                  </div>

                  {activeVariant.fusionEnergyCost && (
                    <div className="pokedex-fusion-metric-row">
                      <span className="pokedex-fusion-metric-label">
                        <Zap size={14} style={{ color: '#fbbf24', marginRight: 6, verticalAlign: 'middle' }} />
                        {t.pokedex_fusion_cost || 'Požadavky na fúzi'}:
                      </span>
                      <span className="pokedex-fusion-metric-val pills">
                        {activeVariant.fusionEnergyCost.energyAmount > 0 && (
                          <span className="cost-pill energy">
                            {activeVariant.fusionEnergyCost.energyAmount}× {activeVariant.fusionEnergyCost.energyType}
                          </span>
                        )}
                        <span className="cost-pill candy">
                          {activeVariant.fusionEnergyCost.candy1Amount}× {activeVariant.fusionEnergyCost.candy1}
                        </span>
                        {activeVariant.fusionEnergyCost.candy2 && (
                          <span className="cost-pill candy">
                            {activeVariant.fusionEnergyCost.candy2Amount}× {activeVariant.fusionEnergyCost.candy2}
                          </span>
                        )}
                      </span>
                    </div>
                  )}

                  <p className="pokedex-fusion-unfuse-note">
                    <CheckCircle2 size={13} style={{ color: '#22c55e', flexShrink: 0 }} />
                    <span>
                      {t.pokedex_fusion_unfuse ||
                        'Oddělení (Unfuse): 0 Stardust / 0 Candy – partner se vrátí v původním stavu'}
                    </span>
                  </p>
                </div>
              )}

              {/* Signature Move & Adventure Effect */}
              {(activeVariant.signatureMove || activeVariant.adventureEffect) && (
                <div className="pokedex-fusion-box-col">
                  {activeVariant.signatureMove && (
                    <div className="pokedex-fusion-metric-row">
                      <span className="pokedex-fusion-metric-label">
                        <Swords size={14} style={{ color: '#f87171', marginRight: 6, verticalAlign: 'middle' }} />
                        {t.pokedex_signature_move || 'Charakteristický útok'}:
                      </span>
                      <div className="pokedex-signature-move-badge">
                        <UnifiedTypeBadge type={activeVariant.signatureMove.type} lang={lang} size="xs" showIcon={true} />
                        <span className="pokedex-sig-name">{activeVariant.signatureMove.name}</span>
                        {activeVariant.signatureMove.pvePower && (
                          <span className="pokedex-sig-power">
                            PvE: {activeVariant.signatureMove.pvePower} | PvP: {activeVariant.signatureMove.pvpPower}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {activeVariant.adventureEffect && (
                    <div className="pokedex-adventure-effect-box">
                      <div className="pokedex-adventure-header">
                        <Clock size={14} style={{ color: '#38bdf8' }} />
                        <span className="pokedex-adventure-title">
                          {t.pokedex_adventure_effect || 'Adventure Effect'}:
                        </span>
                      </div>
                      <p className="pokedex-adventure-desc">
                        {activeVariant.adventureEffect[lang] || activeVariant.adventureEffect.en}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

      {/* ─── Two-Column Analytical Layout ────────────────────────────────────── */}
      <div className="pokedex-detail-columns-grid">
        {/* Left Column: Type Effectiveness & 100% IV CP Table */}
        <div className="pokedex-detail-col">
          {/* Type Effectiveness (Weaknesses & Resistances) */}
          <section className="pokedex-detail-card" aria-label="Type Effectiveness">
            <h2 className="pokedex-detail-card-title">
              <Flame size={18} style={{ color: '#ef4444' }} />
              <span>{t.pokedex_detail_effectiveness_title || 'Typová efektivita & Slabosti'}</span>
            </h2>

            <div className="pokedex-effectiveness-group">
              <h3 className="pokedex-effectiveness-subheading">
                {t.pokedex_weaknesses_label || 'Slabosti (Zvýšené poškození)'}:
              </h3>
              {weaknesses.length === 0 ? (
                <p className="pokedex-effectiveness-empty">{t.pokedex_weaknesses_none || 'Žádné slabosti.'}</p>
              ) : (
                <div className="pokedex-effectiveness-chips">
                  {weaknesses.map((w) => (
                    <div key={w.type} className="pokedex-effectiveness-badge weak">
                      <UnifiedTypeBadge type={w.type} lang={lang} size="xs" showIcon={true} />
                      <span className="mult">{w.mult.toFixed(2)}×</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pokedex-effectiveness-group" style={{ marginTop: '16px' }}>
              <h3 className="pokedex-effectiveness-subheading">
                {t.pokedex_resistances_label || 'Rezistence (Snížené poškození)'}:
              </h3>
              {resistances.length === 0 ? (
                <p className="pokedex-effectiveness-empty">{t.pokedex_resistances_none || 'Žádné odolnosti.'}</p>
              ) : (
                <div className="pokedex-effectiveness-chips">
                  {resistances.map((r) => (
                    <div key={r.type} className="pokedex-effectiveness-badge res">
                      <UnifiedTypeBadge type={r.type} lang={lang} size="xs" showIcon={true} />
                      <span className="mult">{r.mult.toFixed(2)}×</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* 100% IV (Hundo) CP Tiers Table */}
          <section className="pokedex-detail-card" aria-label="100% IV Max CP">
            <h2 className="pokedex-detail-card-title">
              <Zap size={18} style={{ color: 'var(--gold-hundo)' }} />
              <span>{t.pokedex_detail_cp_title || '100% IV (Hundo) Max CP podle úrovně'}</span>
            </h2>

            <table className="pokedex-cp-table">
              <thead>
                <tr>
                  <th>{t.pokedex_table_level || 'Úroveň'}</th>
                  <th>{t.pokedex_table_source || 'Encounter / Zdroj'}</th>
                  <th>{t.pokedex_table_hundo_cp || '100% IV CP'}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Level 15</td>
                  <td>{t.pokedex_tier_research || 'Field Research / Quest floor'}</td>
                  <td className="gold-cp">{entry.maxCp.lv15} CP</td>
                </tr>
                <tr>
                  <td>Level 20</td>
                  <td>{t.pokedex_tier_raid_egg || 'Raid / Vejce (Egg) / GBL reward'}</td>
                  <td className="gold-cp">{entry.maxCp.lv20} CP</td>
                </tr>
                <tr>
                  <td>Level 25</td>
                  <td>{t.pokedex_tier_weather || 'Weather Boosted Raid encounter'}</td>
                  <td className="gold-cp">{entry.maxCp.lv25} CP</td>
                </tr>
                <tr>
                  <td>Level 40</td>
                  <td>{t.pokedex_tier_lv40 || 'Standard Max (Normal Candy)'}</td>
                  <td className="gold-cp">{entry.maxCp.lv40} CP</td>
                </tr>
                <tr>
                  <td>Level 50</td>
                  <td>{t.pokedex_tier_lv50 || 'XL Candy Ultimate Max Cap'}</td>
                  <td className="gold-cp-lv50">{currentCp} CP</td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>

        {/* Right Column: Movesets, Evolution Tree, PvP & Raid Counters */}
        <div className="pokedex-detail-col">
          {/* Movesets Grid */}
          <section className="pokedex-detail-card" aria-label="Movesets">
            <h2 className="pokedex-detail-card-title">
              <SlidersHorizontal size={18} style={{ color: 'var(--accent-color)' }} />
              <span>{t.pokedex_detail_moves_title || 'Útoky & Doporučený Moveset'}</span>
            </h2>

            <div className="pokedex-moves-split">
              {/* Fast Moves */}
              <div className="pokedex-moves-column">
                <h3 className="pokedex-moves-col-title">{t.pokedex_moves_fast || 'Rychlé útoky (Fast Moves)'}</h3>
                <div className="pokedex-move-list">
                  {currentQuickMoves.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{t.pokedex_moves_fast_none || 'Žádné známé rychlé útoky.'}</p>
                  ) : (
                    currentQuickMoves.map((m) => (
                      <div key={m.name} className="pokedex-move-card-item">
                        <div className="pokedex-move-main-row">
                          <UnifiedTypeBadge type={m.type} lang={lang} size="xs" showIcon={true} />
                          <span className="pokedex-move-name-txt">{m.name}</span>
                        </div>
                        {m.isElite && (
                          <span className="pokedex-elite-tag">
                            {t.pokedex_elite_move || 'Elite TM'}
                          </span>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Charged Moves */}
              <div className="pokedex-moves-column">
                <h3 className="pokedex-moves-col-title">{t.pokedex_moves_charged || 'Nabíjecí útoky (Charged Moves)'}</h3>
                <div className="pokedex-move-list">
                  {currentCinematicMoves.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{t.pokedex_moves_charged_none || 'Žádné známé nabíjecí útoky.'}</p>
                  ) : (
                    currentCinematicMoves.map((m) => (
                      <div key={m.name} className="pokedex-move-card-item">
                        <div className="pokedex-move-main-row">
                          <UnifiedTypeBadge type={m.type} lang={lang} size="xs" showIcon={true} />
                          <span className="pokedex-move-name-txt">{m.name}</span>
                        </div>
                        {m.isElite && (
                          <span className="pokedex-elite-tag">
                            {t.pokedex_elite_move || 'Elite TM'}
                          </span>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Evolution Family Tree */}
          {familyNodes.length > 1 && (
            <section className="pokedex-detail-card" aria-label="Evolution Family">
              <h2 className="pokedex-detail-card-title">
                <ChevronRight size={18} style={{ color: 'var(--cyan-accent)' }} />
                <span>{t.pokedex_detail_evolution_title || 'Vývojová linie (Evolution Family)'}</span>
              </h2>

              <div className="pokedex-detail-evo-tree">
                {familyNodes.map((fam, idx) => {
                  const isCurrent = fam.dexId === entry.dexId;
                  return (
                    <React.Fragment key={fam.dexId}>
                      {idx > 0 && <span className="pokedex-evo-flow-arrow">➔</span>}
                      <Link
                        href={`/${lang}/pokedex/${fam.slug}${shinyQuery}`}
                        className={`pokedex-detail-evo-node ${isCurrent ? 'current' : ''}`}
                      >
                        <div className="pokedex-evo-img-wrap">
                          <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${fam.dexId}.png`}
                            alt={fam.names.en}
                            onError={(e) => handleImageError(e, fam, false)}
                          />
                        </div>
                        <span className="pokedex-evo-title">{getPokeTitle(fam)}</span>
                        <span className="pokedex-evo-dex-id">#{fam.dexId}</span>
                      </Link>
                    </React.Fragment>
                  );
                })}
              </div>
            </section>
          )}

          {/* PvP GO Battle League Viability */}
          {rankMatch && (pvpGreatLeague || pvpUltraLeague) && (
            <section className="pokedex-detail-card" aria-label="PvP Viability">
              <h2 className="pokedex-detail-card-title">
                <Trophy size={18} style={{ color: '#facc15' }} />
                <span>{t.pokedex_detail_pvp_title || 'PvP GO Battle League hodnocení'}</span>
              </h2>

              <div className="pokedex-pvp-cards-grid">
                {pvpGreatLeague && (
                  <div className={`pokedex-pvp-tier-box ${pvpGreatLeague.eligible ? 'eligible' : 'ineligible'}`}>
                    <div className="pokedex-pvp-tier-header">
                      <span className="league-title">Great League (CP ≤ 1500)</span>
                      <span className={`status-tag ${pvpGreatLeague.eligible ? 'ok' : 'no'}`}>
                        {pvpGreatLeague.eligible ? (t.pokedex_pvp_competitive || 'Konkurenceschopný') : (t.pokedex_pvp_low_cp || 'Nízké CP')}
                      </span>
                    </div>
                    <div className="pokedex-pvp-stat-line">
                      <span>{t.pokedex_pvp_max_cp || 'Max CP v lize:'}</span>
                      <strong>{pvpGreatLeague.maxCpInLeague} CP (Lv {pvpGreatLeague.bestLevel})</strong>
                    </div>
                    <div className="pokedex-pvp-stat-line">
                      <span>{t.pokedex_pvp_optimal_iv || 'Optimální IV:'}</span>
                      <strong>{pvpGreatLeague.optimalIvSpread}</strong>
                    </div>
                    <p className="pokedex-pvp-note">{pvpGreatLeague.notes[lang] || pvpGreatLeague.notes.en}</p>
                  </div>
                )}

                {pvpUltraLeague && (
                  <div className={`pokedex-pvp-tier-box ${pvpUltraLeague.eligible ? 'eligible' : 'ineligible'}`}>
                    <div className="pokedex-pvp-tier-header">
                      <span className="league-title">Ultra League (CP ≤ 2500)</span>
                      <span className={`status-tag ${pvpUltraLeague.eligible ? 'ok' : 'no'}`}>
                        {pvpUltraLeague.eligible ? (t.pokedex_pvp_competitive || 'Konkurenceschopný') : (t.pokedex_pvp_low_cp || 'Nízké CP')}
                      </span>
                    </div>
                    <div className="pokedex-pvp-stat-line">
                      <span>Max CP v lize:</span>
                      <strong>{pvpUltraLeague.maxCpInLeague} CP (Lv {pvpUltraLeague.bestLevel})</strong>
                    </div>
                    <div className="pokedex-pvp-stat-line">
                      <span>Optimální IV rozložení:</span>
                      <strong>{pvpUltraLeague.optimalIvSpread}</strong>
                    </div>
                    <p className="pokedex-pvp-note">{pvpUltraLeague.notes[lang] || pvpUltraLeague.notes.en}</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Top Raid Counters */}
          {topCounters.length > 0 && (
            <section className="pokedex-detail-card" aria-label="Raid Counters">
              <h2 className="pokedex-detail-card-title">
                <Swords size={18} style={{ color: '#ef4444' }} />
                <span>{t.pokedex_detail_counters_title || 'Nejlepší Raid Counters & Protiútoky'}</span>
              </h2>

              <div className="pokedex-counters-mini-grid">
                {topCounters.map((c) => {
                  const poke = c.pokemon;
                  const counterEntry = POKEDEX_MAP[poke.pokedexId];
                  const counterSlug = counterEntry?.slug || poke.pokedexId.toString();
                  return (
                    <Link
                      key={poke.name}
                      href={`/${lang}/pokedex/${counterSlug}${shinyQuery}`}
                      className="pokedex-counter-mini-card"
                    >
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.pokedexId}.png`}
                        alt={poke.name}
                        className="counter-img"
                        onError={(e) => handleImageError(e, { dexId: poke.pokedexId } as any, false)}
                      />
                      <div className="counter-info">
                        <span className="counter-name">{getPokemonName(poke.name, lang)}</span>
                        <span className="counter-moves">
                          {poke.bestFastMove.name} / {poke.bestChargedMove.name}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* Deep Editorial Meta Analysis & FAQ */}
          <section className="pokedex-detail-card" aria-label="Editorial Analysis & FAQ">
            <h2 className="pokedex-detail-card-title">
              <Sparkles size={18} style={{ color: 'var(--accent-color)' }} />
              <span>
                {lang === 'cs'
                  ? `Hloubkový rozbor a herní strategie: ${getPokeTitle(entry)}`
                  : lang === 'ja'
                    ? `${getPokeTitle(entry)} の詳細攻略・メタ分析・よくある質問`
                    : lang === 'ru'
                      ? `Подробный разбор и стратегия: ${getPokeTitle(entry)}`
                      : `In-Depth Meta Analysis & Strategy Guide: ${getPokeTitle(entry)}`}
              </span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {editorialReport.paragraphs.map((p, idx) => (
                <div key={idx} style={{ lineHeight: 1.65 }}>
                  <h3 style={{ fontSize: '0.96rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px 0' }}>
                    {p.heading}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0 }}>
                    {p.text}
                  </p>
                </div>
              ))}
            </div>

            {editorialReport.faqs.length > 0 && (
              <div style={{ marginTop: '18px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '0.96rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <HelpCircle size={16} style={{ color: 'var(--cyan-accent)' }} />
                  <span>
                    {lang === 'cs'
                      ? 'Často kladené otázky (FAQ)'
                      : lang === 'ja'
                        ? 'よくある質問 (FAQ)'
                        : lang === 'ru'
                          ? 'Часто задаваемые вопросы (FAQ)'
                          : 'Frequently Asked Questions (FAQ)'}
                  </span>
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {editorialReport.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '12px',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'rgba(255, 255, 255, 0.02)',
                      }}
                    >
                      <h4 style={{ fontSize: '0.88rem', fontWeight: 750, color: 'var(--text-primary)', margin: '0 0 4px 0' }}>
                        {faq.question}
                      </h4>
                      <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.55 }}>
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};
