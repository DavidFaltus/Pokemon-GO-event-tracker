'use client';

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  Search,
  X,
  Sparkles,
  ArrowUpDown,
  Info,
  RotateCcw
} from 'lucide-react';

import {
  POKEDEX_CATALOG,
  type PokedexCatalogEntry,
  type PokedexVariant,
  type PokemonType
} from '../data/pokedexCatalog';
import { translations, type Language } from '../data/translations';
import { getPokemonName } from '../utils/pokemonTranslator';
import { UnifiedTypeBadge } from '../utils/typeBadgeHelper';
import './PokedexView.css';

const ALL_TYPES: PokemonType[] = [
  'Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Ice',
  'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug',
  'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'
];

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

type SortOption = 'dex_asc' | 'dex_desc' | 'cp' | 'atk' | 'def' | 'sta' | 'name';
type VariantFilter = 'all' | 'gigantamax' | 'dynamax' | 'mega' | 'shadow' | 'regional';

interface PokedexViewProps {
  lang: Language;
}

export const PokedexView: React.FC<PokedexViewProps> = ({ lang }) => {
  const t = translations[lang] || translations.en;

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGen, setSelectedGen] = useState<number | 'all'>('all');
  const [selectedType, setSelectedType] = useState<PokemonType | 'all'>('all');
  const [selectedVariant, setSelectedVariant] = useState<VariantFilter>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'released'>('released');
  // Master shiny state with localStorage persistence
  const [isShinyMaster, setIsShinyMaster] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('pogo_pokedex_shiny');
      if (stored === 'true') {
        setIsShinyMaster(true);
      }
    }
  }, []);

  const handleToggleShinyMaster = () => {
    setIsShinyMaster((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('pogo_pokedex_shiny', next ? 'true' : 'false');
      }
      return next;
    });
  };
  const [sortBy, setSortBy] = useState<SortOption>('dex_asc');

  // Per-card active variant preview selection (dexId -> variantId)
  const [cardVariantOverrides, setCardVariantOverrides] = useState<Record<number, string>>({});

  // Virtual batch scroll
  const [visibleCount, setVisibleCount] = useState(48);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Reset infinite scroll on filter changes
  useEffect(() => {
    setVisibleCount(48);
  }, [searchQuery, selectedGen, selectedType, selectedVariant, selectedStatus, sortBy]);

  // Infinite Scroll Observer
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => prev + 48);
        }
      },
      { rootMargin: '300px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // Filter and Sort Pipeline
  const filteredPokemon = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const isNumSearch = q.startsWith('#') || /^\d+$/.test(q);
    const numQuery = isNumSearch ? parseInt(q.replace('#', ''), 10) : null;

    return POKEDEX_CATALOG.filter((poke) => {
      // 1. Search Query
      if (q) {
        if (numQuery !== null) {
          if (poke.dexId !== numQuery) return false;
        } else {
          const matchNameEn = poke.names.en.toLowerCase().includes(q);
          const matchNameJa = poke.names.ja.toLowerCase().includes(q);
          const matchNameCs = poke.names.cs ? poke.names.cs.toLowerCase().includes(q) : false;
          const matchNameRu = poke.names.ru ? poke.names.ru.toLowerCase().includes(q) : false;
          const matchSlug = poke.slug.includes(q);
          const matchType = poke.types.some((t) => t.toLowerCase() === q);
          if (!matchNameEn && !matchNameJa && !matchNameCs && !matchNameRu && !matchSlug && !matchType) return false;
        }
      }

      // 2. Generation Filter
      if (selectedGen !== 'all' && poke.generation !== selectedGen) {
        return false;
      }

      // 3. Status Filter (Released vs All)
      if (selectedStatus === 'released' && !poke.isReleasedInGo) {
        return false;
      }

      // 4. Type Filter
      if (selectedType !== 'all') {
        const hasBaseType = poke.types.includes(selectedType);
        const hasVariantType = poke.variants.some((v) => v.types.includes(selectedType));
        if (!hasBaseType && !hasVariantType) return false;
      }

      // 5. Variant Filter
      if (selectedVariant !== 'all') {
        switch (selectedVariant) {
          case 'gigantamax':
            if (!poke.hasGigantamax) return false;
            break;
          case 'dynamax':
            if (!poke.hasDynamax) return false;
            break;
          case 'mega':
            if (!poke.hasMega) return false;
            break;
          case 'shadow':
            if (!poke.hasShadow) return false;
            break;
          case 'regional':
            if (!poke.hasRegionalVariants) return false;
            break;
        }
      }

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'dex_desc':
          return b.dexId - a.dexId;
        case 'cp':
          return b.maxCp.lv50 - a.maxCp.lv50;
        case 'atk':
          return b.stats.attack - a.stats.attack;
        case 'def':
          return b.stats.defense - a.stats.defense;
        case 'sta':
          return b.stats.stamina - a.stats.stamina;
        case 'name':
          return a.names.en.localeCompare(b.names.en);
        case 'dex_asc':
        default:
          return a.dexId - b.dexId;
      }
    });
  }, [searchQuery, selectedGen, selectedType, selectedVariant, selectedStatus, sortBy]);

  // Display slice for virtual infinite scroll
  const displayedPokemon = useMemo(() => {
    return filteredPokemon.slice(0, visibleCount);
  }, [filteredPokemon, visibleCount]);

  // Localized name helper
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

  // Asset Sprite Resolver with Multi-tier Cascade
  const resolveArtwork = useCallback(
    (poke: PokedexCatalogEntry, variant?: PokedexVariant | null, shiny = false) => {
      if (variant?.spriteOverrides) {
        if (shiny && variant.spriteOverrides.shinyArtwork) {
          return variant.spriteOverrides.shinyArtwork;
        }
        if (variant.spriteOverrides.officialArtwork) {
          return variant.spriteOverrides.officialArtwork;
        }
        if (variant.spriteOverrides.goAsset) {
          return variant.spriteOverrides.goAsset;
        }
      }
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${shiny ? 'shiny/' : ''}${poke.dexId}.png`;
    },
    []
  );

  // Handle Sprite Fallback on Error
  const handleImageError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement, Event>, poke: PokedexCatalogEntry, shiny = false) => {
      const target = e.currentTarget;
      const currentSrc = target.src;

      // 1. If PokeAPI official artwork failed, try HOME 3D
      if (currentSrc.includes('official-artwork')) {
        target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${shiny ? 'shiny/' : ''}${poke.dexId}.png`;
        return;
      }

      // 2. If HOME 3D failed, try pokemon-go-api GO model
      if (currentSrc.includes('/home/')) {
        target.src = `https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm${poke.dexId}.icon.png`;
        return;
      }

      // 3. Last fallback
      target.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';
    },
    []
  );

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedGen('all');
    setSelectedType('all');
    setSelectedVariant('all');
    setSelectedStatus('released');
    setSortBy('dex_asc');
  };

  return (
    <div className="pokedex-container">
      {/* ─── Header & Hero ────────────────────────────────────────────────────── */}
      <header className="pokedex-header-card">
        <div className="pokedex-header-main">
          <div className="pokedex-title-badge-group">
            <div className="pokedex-title-row">
              <h1 className="pokedex-hero-title">
                {t.pokedex_title || 'Kompletní Pokédex Pokémon GO'}
              </h1>
              <span className="pokedex-total-badge">
                {filteredPokemon.length} / {POKEDEX_CATALOG.length}
              </span>
            </div>
            <p className="pokedex-hero-subtitle">
              {t.pokedex_subtitle || 'Všech 1 024+ Pokémonů, Dynamax, Gigantamax, Mega evoluce & Shiny varianty'}
            </p>
          </div>

          {/* Master 1-Click Shiny Toggle */}
          <button
            type="button"
            className={`pokedex-shiny-master-btn ${isShinyMaster ? 'active' : ''}`}
            onClick={handleToggleShinyMaster}
            title="1-Click Shiny Preview for all Pokémon"
          >
            <Sparkles size={18} />
            <span>{t.pokedex_shiny_toggle || 'Shiny režim'}</span>
          </button>
        </div>

        {/* ─── Search & Sort Bar ────────────────────────────────────────────── */}
        <div className="pokedex-controls-row">
          <div className="pokedex-search-wrapper">
            <Search size={18} className="pokedex-search-icon" />
            <input
              type="text"
              className="pokedex-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.pokedex_search_placeholder || 'Hledat Pokémona (jméno, #číslo nebo typ)...'}
              autoComplete="off"
            />
            {searchQuery && (
              <button
                type="button"
                className="pokedex-search-clear"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="pokedex-sort-wrapper">
            <ArrowUpDown size={15} style={{ color: 'var(--text-muted)' }} />
            <span className="pokedex-sort-label">{t.pokedex_sort_label || 'Řadit podle:'}</span>
            <select
              className="pokedex-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
            >
              <option value="dex_asc">{t.pokedex_sort_dex_asc || 'Číslo (#1 ➔ #1025)'}</option>
              <option value="dex_desc">{t.pokedex_sort_dex_desc || 'Číslo (#1025 ➔ #1)'}</option>
              <option value="cp">{t.pokedex_sort_cp || 'Max CP (Lv 50)'}</option>
              <option value="atk">{t.pokedex_sort_atk || 'Útok (ATK)'}</option>
              <option value="def">{t.pokedex_sort_def || 'Obrana (DEF)'}</option>
              <option value="sta">{t.pokedex_sort_sta || 'Výdrž (HP)'}</option>
              <option value="name">{t.pokedex_sort_name || 'Jméno (A ➔ Z)'}</option>
            </select>
          </div>
        </div>
      </header>

      {/* ─── Multi-Dimensional Filters Section ────────────────────────────────── */}
      <section className="pokedex-filters-section" aria-label="Pokédex filtry">
        {/* 1. Generation Row */}
        <div className="pokedex-filter-group">
          <span className="pokedex-filter-label">{t.pokedex_filter_gen_label || 'Gen'}</span>
          <button
            type="button"
            className={`pokedex-pill ${selectedGen === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedGen('all')}
          >
            {t.pokedex_filter_gen_all || 'Všechny generace'}
          </button>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((gen) => (
            <button
              key={gen}
              type="button"
              className={`pokedex-pill ${selectedGen === gen ? 'active' : ''}`}
              onClick={() => setSelectedGen(gen)}
            >
              {GENERATION_NAMES[gen]?.[lang] || GENERATION_NAMES[gen]?.en}
            </button>
          ))}
        </div>

        {/* 2. Variants & Form Matrix */}
        <div className="pokedex-filter-group">
          <span className="pokedex-filter-label">{t.pokedex_filter_form_label || 'Forma'}</span>
          <button
            type="button"
            className={`pokedex-pill ${selectedVariant === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedVariant('all')}
          >
            {t.pokedex_filter_variants_all || 'Všechny formy'}
          </button>
          <button
            type="button"
            className={`pokedex-pill variant-gmax ${selectedVariant === 'gigantamax' ? 'active' : ''}`}
            onClick={() => setSelectedVariant(selectedVariant === 'gigantamax' ? 'all' : 'gigantamax')}
          >
            {t.pokedex_filter_form_gmax || '🌋 Gigantamax'}
          </button>
          <button
            type="button"
            className={`pokedex-pill ${selectedVariant === 'dynamax' ? 'active' : ''}`}
            onClick={() => setSelectedVariant(selectedVariant === 'dynamax' ? 'all' : 'dynamax')}
          >
            {t.pokedex_filter_form_dmax || '⚡ Dynamax'}
          </button>
          <button
            type="button"
            className={`pokedex-pill variant-mega ${selectedVariant === 'mega' ? 'active' : ''}`}
            onClick={() => setSelectedVariant(selectedVariant === 'mega' ? 'all' : 'mega')}
          >
            {t.pokedex_filter_form_mega || '🧬 Mega & Primal'}
          </button>
          <button
            type="button"
            className={`pokedex-pill variant-shadow ${selectedVariant === 'shadow' ? 'active' : ''}`}
            onClick={() => setSelectedVariant(selectedVariant === 'shadow' ? 'all' : 'shadow')}
          >
            {t.pokedex_filter_form_shadow || '💜 Shadow'}
          </button>
          <button
            type="button"
            className={`pokedex-pill variant-regional ${selectedVariant === 'regional' ? 'active' : ''}`}
            onClick={() => setSelectedVariant(selectedVariant === 'regional' ? 'all' : 'regional')}
          >
            {t.pokedex_filter_form_regional || '🌍 Regionální'}
          </button>
        </div>

        {/* 3. Elemental Types Selector with Soft Glassmorphic Badges */}
        <div className="pokedex-filter-group">
          <span className="pokedex-filter-label">{t.pokedex_filter_type_label || 'Typ'}</span>
          <button
            type="button"
            className={`pokedex-pill ${selectedType === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedType('all')}
          >
            {t.pokedex_filter_types_all || 'Všechny typy'}
          </button>
          {ALL_TYPES.map((type) => (
            <UnifiedTypeBadge
              key={type}
              type={type}
              lang={lang}
              size="md"
              active={selectedType === type}
              onClick={() => setSelectedType(selectedType === type ? 'all' : type)}
              className="pokedex-filter-type-badge"
            />
          ))}
        </div>

        {/* 4. Release Status Toggle */}
        <div className="pokedex-filter-group" style={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span className="pokedex-filter-label">{t.pokedex_filter_status_label || 'Status'}</span>
            <button
              type="button"
              className={`pokedex-pill ${selectedStatus === 'released' ? 'active' : ''}`}
              onClick={() => setSelectedStatus('released')}
            >
              {t.pokedex_filter_released_only || 'Jen v Pokémon GO'}
            </button>
            <button
              type="button"
              className={`pokedex-pill ${selectedStatus === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedStatus('all')}
            >
              {t.pokedex_filter_all_status || 'Všichni Pokémoni'}
            </button>
          </div>

          {(searchQuery || selectedGen !== 'all' || selectedType !== 'all' || selectedVariant !== 'all' || selectedStatus !== 'released') && (
            <button
              type="button"
              className="pokedex-pill"
              onClick={handleResetFilters}
              style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
            >
              <RotateCcw size={13} />
              <span>{t.pokedex_reset_filters || 'Resetovat filtry'}</span>
            </button>
          )}
        </div>
      </section>

      {/* ─── Grid of Pokémon Cards ─────────────────────────────────────────── */}
      {displayedPokemon.length === 0 ? (
        <div className="pokedex-header-card" style={{ textAlign: 'center', padding: '48px 24px' }}>
          <Info size={40} style={{ color: 'var(--text-muted)', margin: '0 auto 12px auto' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 8px 0' }}>
            {t.pokedex_empty_title || 'Žádný Pokémon neodpovídá zadanému filtru'}
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '0 0 16px 0' }}>
            {t.pokedex_empty_desc || 'Zkuste upravit vyhledávací dotaz nebo vyresetovat filtry.'}
          </p>
          <button type="button" className="pokedex-pill active" onClick={handleResetFilters}>
            {t.pokedex_reset_filters || 'Resetovat filtry'}
          </button>
        </div>
      ) : (
        <div className="pokedex-grid">
          {displayedPokemon.map((poke) => {
            const activeVariantId = cardVariantOverrides[poke.dexId] || null;
            const activeVariant = poke.variants.find((v) => v.id === activeVariantId) || null;

            // Determine active attributes based on variant
            const currentTypes = activeVariant ? activeVariant.types : poke.types;
            const currentCp = activeVariant ? activeVariant.maxCp : poke.maxCp.lv50;
            const currentStats = activeVariant ? activeVariant.stats : poke.stats;
            const spriteUrl = resolveArtwork(poke, activeVariant, isShinyMaster);

            let variantClass = '';
            if (activeVariant?.category === 'shadow') variantClass = 'variant-shadow';
            else if (activeVariant?.category === 'dynamax') variantClass = 'variant-dynamax';
            else if (activeVariant?.category === 'gigantamax') variantClass = 'variant-gigantamax';

            return (
              <Link
                key={poke.dexId}
                href={`/${lang}/pokedex/${poke.slug}${isShinyMaster ? '?shiny=1' : ''}`}
                className={`pokedex-card ${variantClass}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {/* Card Header */}
                <div className="pokedex-card-header">
                  <span className="pokedex-card-dex-badge">
                    #{String(poke.dexId).padStart(3, '0')}
                  </span>
                  {poke.rarityClass !== 'standard' && (
                    <span className={`pokedex-card-rarity-pill ${poke.rarityClass}`}>
                      {poke.rarityClass.replace('_', ' ')}
                    </span>
                  )}
                </div>

                {/* Sprite Render */}
                <div className="pokedex-card-sprite-container">
                  <img
                    src={spriteUrl}
                    alt={poke.names.en}
                    className="pokedex-card-sprite"
                    loading="lazy"
                    onError={(e) => handleImageError(e, poke, isShinyMaster)}
                  />
                </div>

                {/* Card Info */}
                <div className="pokedex-card-info">
                  <div className="pokedex-card-name-row">
                    <h3 className="pokedex-card-name">{getPokeTitle(poke, activeVariant)}</h3>
                    {lang === 'ja' && (
                      <span className="pokedex-card-en-subname">{poke.names.en}</span>
                    )}
                  </div>

                  {/* Types Badges with Soft Colors and SVG Icons */}
                  <div className="pokedex-card-types">
                    {currentTypes.map((t) => (
                      <UnifiedTypeBadge
                        key={t}
                        type={t}
                        lang={lang}
                        size="xs"
                        showIcon={true}
                      />
                    ))}
                  </div>

                  {/* Inline Variant Selector Pills */}
                  {poke.variants.length > 0 && (
                    <div
                      className="pokedex-variant-selector"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    >
                      <button
                        type="button"
                        className={`pokedex-variant-chip ${!activeVariantId ? 'active' : ''}`}
                        onClick={() =>
                          setCardVariantOverrides((prev) => {
                            const copy = { ...prev };
                            delete copy[poke.dexId];
                            return copy;
                          })
                        }
                      >
                        Base
                      </button>
                      {poke.variants.map((v) => {
                        let shortLabel = v.category.toUpperCase();
                        if (v.category === 'mega') shortLabel = v.id.includes('MEGA_Y') ? 'MEGA Y' : (v.id.includes('MEGA_X') ? 'MEGA X' : 'MEGA');
                        else if (v.category === 'primal') shortLabel = 'PRIMAL';
                        else if (v.category === 'gigantamax') shortLabel = 'G-MAX';
                        else if (v.category === 'dynamax') shortLabel = 'D-MAX';
                        else if (v.category === 'shadow') shortLabel = 'SHADOW';
                        else if (v.category === 'regional') shortLabel = (v.regionalRegion || 'REG').toUpperCase();

                        return (
                          <button
                            key={v.id}
                            type="button"
                            className={`pokedex-variant-chip ${activeVariantId === v.id ? 'active' : ''}`}
                            onClick={() =>
                              setCardVariantOverrides((prev) => ({
                                ...prev,
                                [poke.dexId]: v.id
                              }))
                            }
                          >
                            {shortLabel}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Card Footer: Max CP & Base Stats */}
                <div className="pokedex-card-footer">
                  <span className="pokedex-card-max-cp">
                    Max CP <strong>{currentCp}</strong>
                  </span>
                  <div className="pokedex-card-stats-trio">
                    <span title={t.pokedex_sort_atk || 'Attack'}>⚔️ {currentStats.attack}</span>
                    <span title={t.pokedex_sort_def || 'Defense'}>🛡️ {currentStats.defense}</span>
                    <span title={t.pokedex_sort_sta || 'Stamina'}>❤️ {currentStats.stamina}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* ─── Sentinel Element for Infinite Scroll ──────────────────────────── */}
      {displayedPokemon.length < filteredPokemon.length && (
        <div ref={sentinelRef} className="pokedex-sentinel">
          {t.pokedex_loading_more || 'Načítám další Pokémony...'} ({displayedPokemon.length} / {filteredPokemon.length})
        </div>
      )}
    </div>
  );
};
