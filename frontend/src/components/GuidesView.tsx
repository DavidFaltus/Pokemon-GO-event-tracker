import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import './GuidesView.css';
import { GUIDES_DATA, type GuideArticle } from '../data/guidesData';
import { apiFetch } from '../config';
import { ADVENTURE_EFFECT_ITEMS } from '../data/adventureEffectsData';
import type { Language } from '../data/translations';
import { 
  getPokemonIconUrl, 
  handlePokemonImageError, 
  SHADOW_ICON_URL, 
  handleShadowIconError,
  MEGA_ICON_URL,
  handleMegaIconError
} from '../utils/imageResolver';
import { getPokemonName } from '../utils/pokemonTranslator';
import { DittoEggsView } from './DittoEggsView';
import { FieldResearchView } from './FieldResearchView';
import { GalarianBirdsInteractiveWidget } from './GalarianBirdsInteractiveWidget';
import { ReferralProgramInteractiveWidget } from './ReferralProgramInteractiveWidget';
import { RocketLeadersInteractiveWidget } from './RocketLeadersInteractiveWidget';
import { RaidCountersInteractiveWidget } from './RaidCountersInteractiveWidget';
import { IvAppraisalInteractiveWidget } from './IvAppraisalInteractiveWidget';
import { MegaDynamaxInteractiveWidget } from './MegaDynamaxInteractiveWidget';
import { EventMasteryInteractiveWidget } from './EventMasteryInteractiveWidget';
import { DittoHunterInteractiveWidget } from './DittoHunterInteractiveWidget';
import { EggHatchingInteractiveWidget } from './EggHatchingInteractiveWidget';
import { FieldResearchInteractiveWidget } from './FieldResearchInteractiveWidget';
import { ExtraStardustInteractiveWidget } from './ExtraStardustInteractiveWidget';
import { EvolutionQuestsInteractiveWidget } from './EvolutionQuestsInteractiveWidget';
import { VivillonPatternsInteractiveWidget } from './VivillonPatternsInteractiveWidget';
import { WeeklyMiniEventsInteractiveWidget } from './WeeklyMiniEventsInteractiveWidget';
import { RegionalPokemonInteractiveWidget } from './RegionalPokemonInteractiveWidget';
import { AdventureEffectsInteractiveWidget } from './AdventureEffectsInteractiveWidget';
import { PokelidStampRallyInteractiveWidget } from './PokelidStampRallyInteractiveWidget';
import { SpecialBackgroundsInteractiveWidget } from './SpecialBackgroundsInteractiveWidget';
import { TrainerLevelsInteractiveWidget } from './TrainerLevelsInteractiveWidget';
import { 
  BookOpen, 
  Search, 
  Clock, 
  ArrowLeft, 
  Lightbulb, 
  Shield, 
  Swords, 
  Calendar, 
  Sparkles, 
  Trophy, 
  ChevronRight,
  ChevronLeft,
  User,
  Zap,
  Target,
  Flame,
  Award,
  Globe,
  Star,
  CheckCircle2,
  Footprints,
  Compass,
  Moon,
  CloudRain,
  RotateCw,
  MapPin,
  X,
  ZoomIn,
  CheckSquare,
  Square,
  ListChecks,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Gift,
  Share2,
  Check,
  Copy
} from 'lucide-react';

interface GuidesViewProps {
  lang: Language;
  initialArticleSlug?: string;
  onSelectArticle?: (slug: string) => void;
}

export const GuidesView: React.FC<GuidesViewProps> = ({ 
  lang, 
  initialArticleSlug,
  onSelectArticle 
}) => {
  const [articles, setArticles] = useState<GuideArticle[]>(GUIDES_DATA);
  const [copiedLink, setCopiedLink] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let isMounted = true;
    const fetchGuides = async () => {
      try {
        const res = await apiFetch('/api/guides');
        if (res.ok) {
          const contentType = res.headers.get('content-type') || '';
          if (contentType.includes('application/json')) {
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0 && isMounted) {
              setArticles(data);
              return;
            }
          }
        }
        if (typeof window !== 'undefined' && isMounted) {
          try {
            const cached = localStorage.getItem('pogo_admin_guides_cache');
            if (cached) {
              const parsed = JSON.parse(cached);
              if (Array.isArray(parsed) && parsed.length > 0) {
                setArticles(parsed.filter((g) => !g.isHidden && !g.isDeleted));
                return;
              }
            }
          } catch {}
        }
      } catch {
        // Fallback to GUIDES_DATA
      }
    };
    fetchGuides();

    const onGuidesUpdated = () => {
      fetchGuides();
    };
    window.addEventListener('pogo_guides_updated', onGuidesUpdated);
    return () => {
      isMounted = false;
      window.removeEventListener('pogo_guides_updated', onGuidesUpdated);
    };
  }, []);
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(initialArticleSlug || null);
  const [evolutionCategoryFilter, setEvolutionCategoryFilter] = useState<'all' | 'buddy' | 'combat' | 'walk' | 'special' | 'trade'>('all');
            const [selectedPrefectureId, setSelectedPrefectureId] = useState<string>('all');
  const [pokelidSearch, setPokelidSearch] = useState('');
  const [pokelidLidSearch, setPokelidLidSearch] = useState('');
        
  // Trainer Levels Widget State
          useEffect(() => {
    if (initialArticleSlug) {
      setSelectedArticleSlug(initialArticleSlug);
    }
  }, [initialArticleSlug]);

  // Upgraded Lightbox Gallery with Prev/Next and Miniature Thumbnails
  const [lightboxGallery, setLightboxGallery] = useState<{
    items: {
      url: string;
      thumb?: string;
      title: string;
      subtitle?: string;
      badge?: string;
      city?: string;
      prefecture?: string;
      descId?: string;
      lat?: number;
      lng?: number;
    }[];
    currentIndex: number;
  } | null>(null);

  // Backward compatible helper for single-image previews
  const setPreviewModalImg = (data: { url: string; title: string } | null) => {
    if (!data) {
      setLightboxGallery(null);
    } else {
      setLightboxGallery({
        items: [{ url: data.url, thumb: data.url, title: data.title }],
        currentIndex: 0
      });
    }
  };

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Lightbox loaded URLs cache & refs
  const [loadedLightboxUrls, setLoadedLightboxUrls] = useState<Set<string>>(() => new Set());
  const thumbStripRef = useRef<HTMLDivElement | null>(null);
  const activeThumbBtnRef = useRef<HTMLButtonElement | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  const markLightboxUrlLoaded = useCallback((url: string) => {
    setLoadedLightboxUrls(prev => {
      if (prev.has(url)) return prev;
      const next = new Set(prev);
      next.add(url);
      return next;
    });
  }, []);

  // Keyboard navigation & body scroll lock support for gallery
  useEffect(() => {
    if (!lightboxGallery) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxGallery(null);
      } else if (e.key === 'ArrowRight' && lightboxGallery.items.length > 1) {
        setLightboxGallery(prev => prev ? {
          ...prev,
          currentIndex: (prev.currentIndex + 1) % prev.items.length
        } : null);
      } else if (e.key === 'ArrowLeft' && lightboxGallery.items.length > 1) {
        setLightboxGallery(prev => prev ? {
          ...prev,
          currentIndex: (prev.currentIndex - 1 + prev.items.length) % prev.items.length
        } : null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [lightboxGallery]);

  // Proactively preload current and adjacent images (±1, ±2) for instant switching
  useEffect(() => {
    if (!lightboxGallery || lightboxGallery.items.length === 0) return;
    const items = lightboxGallery.items;
    const cur = lightboxGallery.currentIndex;
    const indicesToPreload = items.length === 1 ? [0] : [
      cur,
      (cur + 1) % items.length,
      (cur - 1 + items.length) % items.length,
      (cur + 2) % items.length,
      (cur - 2 + items.length) % items.length,
    ];

    indicesToPreload.forEach(idx => {
      const url = items[idx]?.url;
      if (url) {
        const img = new Image();
        img.src = url;
        if (img.complete && img.naturalWidth > 0) {
          markLightboxUrlLoaded(url);
        } else {
          img.onload = () => markLightboxUrlLoaded(url);
        }
      }
    });
  }, [lightboxGallery?.currentIndex, lightboxGallery?.items, markLightboxUrlLoaded]);

  // Background gallery warmup: progressively prefetch all lids in the active prefecture during idle time
  useEffect(() => {
    if (!lightboxGallery || lightboxGallery.items.length <= 1) return;
    const timer = setTimeout(() => {
      lightboxGallery.items.forEach(item => {
        if (item.url) {
          const img = new Image();
          img.src = item.url;
          if (img.complete && img.naturalWidth > 0) {
            markLightboxUrlLoaded(item.url);
          } else {
            img.onload = () => markLightboxUrlLoaded(item.url);
          }
        }
      });
    }, 250);
    return () => clearTimeout(timer);
  }, [lightboxGallery?.items, markLightboxUrlLoaded]);

  // Synchronize active thumbnail in bottom strip to center smoothly
  useEffect(() => {
    if (activeThumbBtnRef.current && thumbStripRef.current) {
      const container = thumbStripRef.current;
      const btn = activeThumbBtnRef.current;
      const btnLeft = btn.offsetLeft;
      const btnWidth = btn.offsetWidth;
      const containerWidth = container.offsetWidth;
      const scrollTarget = btnLeft - (containerWidth / 2) + (btnWidth / 2);
      container.scrollTo({
        left: Math.max(0, scrollTarget),
        behavior: 'smooth'
      });
    }
  }, [lightboxGallery?.currentIndex]);

  // Touch handlers for mobile swipe navigation
  const handleLightboxTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleLightboxTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || !lightboxGallery || lightboxGallery.items.length <= 1) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartXRef.current;
    if (diff > 45) {
      // Swipe right -> Previous
      setLightboxGallery(prev => prev ? {
        ...prev,
        currentIndex: (prev.currentIndex - 1 + prev.items.length) % prev.items.length
      } : null);
    } else if (diff < -45) {
      // Swipe left -> Next
      setLightboxGallery(prev => prev ? {
        ...prev,
        currentIndex: (prev.currentIndex + 1) % prev.items.length
      } : null);
    }
    touchStartXRef.current = null;
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield': return <Shield size={16} />;
      case 'Swords': return <Swords size={16} />;
      case 'Calendar': return <Calendar size={16} />;
      case 'Sparkles': return <Sparkles size={16} />;
      case 'Trophy': return <Trophy size={16} />;
      case 'Globe': return <Globe size={16} />;
      case 'MapPin': return <MapPin size={16} />;
      case 'Clock': return <Clock size={16} />;
      case 'Target': return <Target size={16} />;
      case 'Award': return <Award size={16} />;
      default: return <BookOpen size={16} />;
    }
  };

  const selectedArticle = articles.find(a => a.slug === selectedArticleSlug);

  const filteredArticles = articles.filter(article => {
    const titleText = article.title[lang] || article.title.en;
    const subtitleText = article.subtitle[lang] || article.subtitle.en;
    const categoryText = article.category[lang] || article.category.en;
    const q = searchQuery.toLowerCase();
    return titleText.toLowerCase().includes(q) || subtitleText.toLowerCase().includes(q) || categoryText.toLowerCase().includes(q);
  });

  const handleArticleClick = (slug: string) => {
    setSelectedArticleSlug(slug);
    if (typeof window !== 'undefined') {
      const targetPath = `/${lang}/guides/${slug}`;
      if (window.location.pathname !== targetPath) {
        window.history.pushState(null, '', targetPath);
      }
    }
    if (onSelectArticle) {
      onSelectArticle(slug);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderBoldText = (text: string): React.ReactNode => {
    const boldParts = text.split(/(\*\*[^*]+\*\*)/g);
    return boldParts.map((chunk, i) => {
      if (chunk.startsWith('**') && chunk.endsWith('**')) {
        return <strong key={i}>{chunk.slice(2, -2)}</strong>;
      }
      return chunk;
    });
  };

  const renderFormattedText = (text: string): React.ReactNode => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(renderBoldText(text.slice(lastIndex, match.index)));
      }
      const label = match[1];
      const url = match[2];
      if (url.startsWith('/guides/')) {
        const targetSlug = url.replace('/guides/', '');
        parts.push(
          <button
            key={match.index}
            type="button"
            className="guide-inline-article-link"
            onClick={() => handleArticleClick(targetSlug)}
          >
            {label}
          </button>
        );
      } else {
        parts.push(
          <a
            key={match.index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="guide-inline-link"
          >
            {label}
          </a>
        );
      }
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push(renderBoldText(text.slice(lastIndex)));
    }

    return parts;
  };

  const renderPokemonChip = (name: string, isShadow = false, isShiny = false) => {
    const iconUrl = getPokemonIconUrl(name, isShiny);
    const displayName = getPokemonName(name, lang);
    return (
      <div key={name} className="guide-pokemon-chip">
        <img 
          src={iconUrl} 
          alt={displayName} 
          onError={(e) => handlePokemonImageError(e.currentTarget, name, isShiny)}
          loading="lazy"
        />
        <span>{displayName}</span>
        {isShadow && (
          <img 
            src={SHADOW_ICON_URL} 
            alt="Shadow" 
            style={{ width: 14, height: 14, marginLeft: 2 }}
            onError={(e) => handleShadowIconError(e.currentTarget)}
          />
        )}
      </div>
    );
  };

  const renderVisualArticleWidget = (slug: string) => {
    if (slug === 'galarian-birds-encounter-catch-guide') {
      return <GalarianBirdsInteractiveWidget lang={lang} />;
    }
    if (slug === 'pokemon-go-referral-program-guide') {
      return <ReferralProgramInteractiveWidget lang={lang} />;
    }
    // 1. All Evolution Quests Master Widget
    if (slug === 'pokemon-evolution-quests-guide') {
      return <EvolutionQuestsInteractiveWidget lang={lang} />;
    }

    // 2. Vivillon 18 Patterns Showcase Widget
    if (slug === 'vivillon-patterns-postcard-guide') {
      return <VivillonPatternsInteractiveWidget lang={lang} />;
    }

    // 3. Weekly Mini-Events Widget
    if (slug === 'weekly-hidden-mini-events-guide') {
      return <WeeklyMiniEventsInteractiveWidget lang={lang} />;
    }

    // 4. Rocket Leaders & Giovanni Widget
    if (slug === 'rocket-leaders-giovanni-guide') {
      return <RocketLeadersInteractiveWidget lang={lang} />;
    }

    // 5. Raid Battles Guide Widget
    if (slug === 'raid-battles-counter-guide') {
      return <RaidCountersInteractiveWidget lang={lang} />;
    }

    // 6. Spotlight & Community Day Widget (Interactive Tier S Multiplier & Fast Catch Guide)
    if (slug === 'spotlight-community-day-guide') {
      return <EventMasteryInteractiveWidget lang={lang} />;
    }

    // 7. IV & Appraisal Widget (Interactive Tier S Gauge & Simulator)
    if (slug === 'pokemon-iv-cp-appraise-guide') {
      return <IvAppraisalInteractiveWidget lang={lang} />;
    }

    // 8. Mega & Dynamax Widget (Interactive Tier S Calculator & Simulator)
    if (slug === 'mega-dynamax-mechanics-guide') {
      return <MegaDynamaxInteractiveWidget lang={lang} />;
    }

    if (slug === 'regional-pokemon-world-guide') {
      return <RegionalPokemonInteractiveWidget lang={lang} />;
    }

    // 5. Adventure Effects Master Interactive Widget
    if (slug === 'adventure-effects-master-guide') {
      return <AdventureEffectsInteractiveWidget lang={lang} />;
    }

    // 6. PokéLid Stamp Rally Interactive Widget
    if (slug === 'pokelid-stamp-rally-japan-guide') {
      return (
        <PokelidStampRallyInteractiveWidget 
          lang={lang} 
          onOpenLightbox={setLightboxGallery as any} 
          onNavigateArticle={handleArticleClick}
        />
      );
    }

    // 7. Special Backgrounds & Location Cards Master Widget
    if (slug === 'special-backgrounds-location-cards-guide') {
      return (
        <SpecialBackgroundsInteractiveWidget 
          lang={lang} 
          onNavigateArticle={handleArticleClick}
        />
      );
    }

    // 8. Trainer Levels & Tasks Master Widget
    if (slug === 'trainer-level-rewards-tasks-guide') {
      return <TrainerLevelsInteractiveWidget lang={lang} />;
    }

    // Ditto Disguises Live Tracker Widget (Interactive Tier S Radar & Simulator)
    if (slug === 'ditto-disguises-guide') {
      return <DittoHunterInteractiveWidget lang={lang} />;
    }

    // Egg Hatching Pools Live Tracker Widget (Interactive Tier S Distance Calculator & Salandit Chase)
    if (slug === 'egg-hatching-guide') {
      return <EggHatchingInteractiveWidget lang={lang} />;
    }

    // Field Research Live Tasks & Rewards Matrix Widget (Interactive Tier S Stack Bank & Hundo Lookup)
    if (slug === 'field-research-tasks-guide') {
      return <FieldResearchInteractiveWidget lang={lang} />;
    }

    // Extra Stardust Pokémon Tier Overview Widget (Interactive Tier S Table & Weather Filter)
    if (slug === 'extra-stardust-pokemon-guide') {
      return <ExtraStardustInteractiveWidget lang={lang} />;
    }

    return null;
  };

  const getTranslation = (key: string) => {
    const labels: Record<string, Record<Language, string>> = {
      headerBadge: {
        cs: "Průvodce & Tipy",
        en: "Guides & Tips",
        ja: "ガイド & ヒント",
        ru: "Гайды и Советы"
      },
      headerTitle: {
        cs: "Pokémon GO Strategické Průvodce a Návody",
        en: "Pokémon GO Strategy Guides & Tutorials",
        ja: "Pokémon GO 戦略ガイド & チュートリアル",
        ru: "Стратегические гайды и инструкции Pokémon GO"
      },
      headerDesc: {
        cs: "Kompletní návody na poražení lídrů Team GO Rocket, nejlepší countery na Raidy, rozbor 100% IV hodnot a jak maximálně využít bonusy v Community Days a Spotlight Hours.",
        en: "In-depth guides for beating Team GO Rocket Leaders, best Raid counters, 100% IV appraisal deep dives, and maximizing Community Day & Spotlight Hour bonuses.",
        ja: "GOロケット団リーダー攻略、レイドカウンター最適化、個体値100%判別法、コミュニティ・デイ＆スポットライトアワーの活用テクニックを徹底解説。",
        ru: "Подробные инструкции по победам над Лидерами Ракеты, контерам на Райды, 100% IV значениям и максимизации бонусов на ивентах."
      },
      searchPlaceholder: {
        cs: "Hledat v průvodcích...",
        en: "Search guides...",
        ja: "ガイドを検索...",
        ru: "Поиск в гайдах..."
      },
      backToList: {
        cs: "Zpět na seznam průvodců",
        en: "Back to all guides",
        ja: "ガイド一覧に戻る",
        ru: "Назад к списку гайдов"
      },
      proTips: {
        cs: "Tipy pro maximální efektivitu:",
        en: "Pro Tips for Max Efficiency:",
        ja: "効率化のためのプロヒント：",
        ru: "Советы для максимальной эффективности:"
      },
      noResults: {
        cs: "Nenalezeny žádné průvodce odpovídající vašemu vyhledávání.",
        en: "No guides found matching your search.",
        ja: "該当するガイドが見つかりませんでした。",
        ru: "Гайдов по вашему запросу не найдено."
      }
    };

    return labels[key]?.[lang] || labels[key]?.en || '';
  };

  const handleBackToList = () => {
    setSelectedArticleSlug(null);
    if (typeof window !== 'undefined') {
      const targetPath = `/${lang}/guides`;
      if (window.location.pathname !== targetPath) {
        window.history.pushState(null, '', targetPath);
      }
    }
    if (onSelectArticle) {
      onSelectArticle(null as any);
    }
  };

  const handleCopyArticleLink = () => {
    if (typeof window === 'undefined' || !selectedArticle) return;
    const url = `${window.location.origin}/${lang}/guides/${selectedArticle.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      });
    }
  };

  if (selectedArticle) {
    return (
      <div className="guides-container">
        <div className="guide-article-reader">
          <div className="reader-top-actions" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <button className="back-btn" onClick={handleBackToList}>
              <ArrowLeft size={16} />
              {getTranslation('backToList')}
            </button>
            <button 
              type="button" 
              onClick={handleCopyArticleLink}
              className="share-guide-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                background: copiedLink ? 'rgba(34, 197, 94, 0.15)' : 'rgba(168, 85, 247, 0.15)',
                border: copiedLink ? '1px solid rgba(34, 197, 94, 0.4)' : '1px solid rgba(168, 85, 247, 0.3)',
                borderRadius: '8px',
                color: copiedLink ? '#4ade80' : '#c084fc',
                fontSize: '0.85rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              title={lang === 'cs' ? 'Zkopírovat odkaz na článek' : 'Copy link to article'}
            >
              {copiedLink ? <Check size={14} /> : <Share2 size={14} />}
              <span>{copiedLink ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Sdílet odkaz' : 'Share link')}</span>
            </button>
          </div>

          <header className="article-header">
            <div className="article-hero-deck">
              <div className="article-hero-info">
                <div className="guide-card-tag">
                  {getCategoryIcon(selectedArticle.iconName)}
                  {selectedArticle.category[lang] || selectedArticle.category.en}
                </div>

                <h1>{selectedArticle.title[lang] || selectedArticle.title.en}</h1>

                <p className="article-subtitle">
                  {selectedArticle.subtitle[lang] || selectedArticle.subtitle.en}
                </p>

                <div className="guide-card-meta">
                  <span><User size={14} /> {selectedArticle.author}</span>
                  <span><Clock size={14} /> {selectedArticle.readTime}</span>
                  <span>{selectedArticle.updatedAt}</span>
                </div>
              </div>

              {selectedArticle.imageUrl && (
                <div className="article-hero-art-frame">
                  <img 
                    src={selectedArticle.imageUrl} 
                    alt={selectedArticle.title[lang] || selectedArticle.title.en} 
                    className="article-hero-art-img"
                    loading="eager"
                  />
                </div>
              )}
            </div>
          </header>

          <main style={{ marginTop: '28px' }}>
            {renderVisualArticleWidget(selectedArticle.slug)}

            {selectedArticle.sections.map((section) => (
              <section key={section.id} className="article-section">
                <h2>{section.heading[lang] || section.heading.en}</h2>

                {section.pokemon && section.pokemon.length > 0 && (
                  <div className="guide-section-pokemon-deck">
                    <span className="deck-label">{lang === 'cs' ? 'Pokémoni v této sekci:' : 'Featured Pokémon in this section:'}</span>
                    <div className="guide-pokemon-chips">
                      {section.pokemon.map(p => renderPokemonChip(p))}
                    </div>
                  </div>
                )}

                <div className="article-text-flow">
                  {(section.content[lang] || section.content.en).split('\n').map((paragraph, pIdx) => {
                    if (!paragraph.trim()) return null;

                    const imgMatch = paragraph.match(/^!\[(.*?)\]\((.*?)\)$/);
                    if (imgMatch) {
                      const alt = imgMatch[1];
                      const url = imgMatch[2];
                      return (
                        <div
                          key={pIdx}
                          className="guide-inline-image-card"
                          onClick={() => setPreviewModalImg({ url, title: alt })}
                          title={lang === 'cs' ? 'Kliknutím zvětšit pozadí' : 'Click to enlarge background'}
                        >
                          <div className="guide-inline-image-frame">
                            <img src={url} alt={alt} loading="lazy" />
                            <div className="guide-inline-image-overlay">
                              <ZoomIn size={15} />
                              <span>{lang === 'cs' ? 'Zvětšit' : 'Enlarge'}</span>
                            </div>
                          </div>
                          {alt && <div className="guide-inline-image-caption">{alt}</div>}
                        </div>
                      );
                    }

                    if (paragraph.startsWith('### ')) {
                      return (
                        <h3 key={pIdx} className="guide-content-subheading">
                          {renderFormattedText(paragraph.replace(/^###\s*/, ''))}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith('## ')) {
                      return (
                        <h3 key={pIdx} className="guide-content-subheading">
                          {renderFormattedText(paragraph.replace(/^##\s*/, ''))}
                        </h3>
                      );
                    }

                    if (/^\s{2,}[•-]\s*/.test(paragraph)) {
                      const cleanText = paragraph.replace(/^\s+[•-]\s*/, '');
                      return (
                        <div key={pIdx} className="guide-bullet-point-row sub-bullet">
                          <span className="bullet-dot sub-dot" />
                          <span>{renderFormattedText(cleanText)}</span>
                        </div>
                      );
                    }

                    if (paragraph.startsWith('•') || paragraph.startsWith('-')) {
                      return (
                        <div key={pIdx} className="guide-bullet-point-row">
                          <span className="bullet-dot" />
                          <span>{renderFormattedText(paragraph.replace(/^[•-]\s*/, ''))}</span>
                        </div>
                      );
                    }
                    return <p key={pIdx}>{renderFormattedText(paragraph)}</p>;
                  })}
                </div>

                {section.tips && (
                  <div className="tips-box">
                    <h4><Lightbulb size={16} /> {getTranslation('proTips')}</h4>
                    <ul>
                      {(section.tips[lang] || section.tips.en).map((tip, idx) => (
                        <li key={idx}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            ))}
          </main>

          {/* Lightbox Image Preview Modal (Rendered via Portal directly to body for fixed viewport positioning) */}
          {isMounted && typeof document !== 'undefined' && lightboxGallery && createPortal(
            <div 
              className="guide-lightbox-backdrop"
              onClick={() => setLightboxGallery(null)}
            >
              <div 
                className="guide-lightbox-modal"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="lightbox-modal-header">
                  <div className="lightbox-header-titles">
                    <div className="lightbox-title-row">
                      {lightboxGallery.items[lightboxGallery.currentIndex]?.badge && (
                        <span className="lightbox-hero-id-badge">
                          {lightboxGallery.items[lightboxGallery.currentIndex].badge}
                        </span>
                      )}
                      <h4>{lightboxGallery.items[lightboxGallery.currentIndex]?.title}</h4>
                    </div>
                    <div className="lightbox-meta-row">
                      {lightboxGallery.items[lightboxGallery.currentIndex]?.subtitle && (
                        <span className="lightbox-counter-badge">
                          {lightboxGallery.items[lightboxGallery.currentIndex].subtitle}
                        </span>
                      )}
                      {lightboxGallery.items[lightboxGallery.currentIndex]?.lat && 
                       lightboxGallery.items[lightboxGallery.currentIndex]?.lng && (
                        <a
                          href={`https://maps.google.com/maps?q=${lightboxGallery.items[lightboxGallery.currentIndex].lat},${lightboxGallery.items[lightboxGallery.currentIndex].lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="lightbox-maps-action-btn"
                          title={lang === 'cs' ? 'Navigovat v Google Maps' : 'Open in Google Maps'}
                        >
                          <MapPin size={13} />
                          <span>{lang === 'cs' ? 'Navigovat v Google Maps' : lang === 'ja' ? 'Google マップでナビ' : lang === 'ru' ? 'Навигация в Google Maps' : 'Open in Google Maps'}</span>
                        </a>
                      )}
                    </div>
                  </div>
                  <button 
                    className="lightbox-close-btn"
                    onClick={() => setLightboxGallery(null)}
                    aria-label="Close image preview"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div 
                  className="lightbox-image-container"
                  onTouchStart={handleLightboxTouchStart}
                  onTouchEnd={handleLightboxTouchEnd}
                >
                  {lightboxGallery.items.length > 1 && (
                    <button 
                      className="lightbox-nav-btn lightbox-prev-btn"
                      onClick={() => setLightboxGallery(prev => prev ? {
                        ...prev,
                        currentIndex: (prev.currentIndex - 1 + prev.items.length) % prev.items.length
                      } : null)}
                      title={lang === 'cs' ? 'Předchozí (←)' : lang === 'ja' ? '前へ (←)' : lang === 'ru' ? 'Предыдущий (←)' : 'Previous (←)'}
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={28} />
                    </button>
                  )}

                  <div className="lightbox-image-stage">
                    {/* Instant 0ms cached thumbnail underlay while full image decodes */}
                    {lightboxGallery.items[lightboxGallery.currentIndex]?.thumb && 
                     lightboxGallery.items[lightboxGallery.currentIndex].thumb !== lightboxGallery.items[lightboxGallery.currentIndex].url && (
                      <img 
                        src={lightboxGallery.items[lightboxGallery.currentIndex].thumb} 
                        alt="" 
                        aria-hidden="true"
                        className={`lightbox-stage-thumb ${loadedLightboxUrls.has(lightboxGallery.items[lightboxGallery.currentIndex]?.url || '') ? 'is-covered' : 'is-visible'} ${lightboxGallery.items[lightboxGallery.currentIndex]?.descId || lightboxGallery.items[lightboxGallery.currentIndex]?.url?.includes('manhole') ? 'is-pokelid' : 'is-card'}`}
                      />
                    )}

                    <img 
                      key={lightboxGallery.items[lightboxGallery.currentIndex]?.url}
                      src={lightboxGallery.items[lightboxGallery.currentIndex]?.url} 
                      alt={lightboxGallery.items[lightboxGallery.currentIndex]?.title} 
                      decoding="async"
                      className={`lightbox-full-img ${loadedLightboxUrls.has(lightboxGallery.items[lightboxGallery.currentIndex]?.url || '') ? 'loaded' : 'loading'} ${lightboxGallery.items[lightboxGallery.currentIndex]?.descId || lightboxGallery.items[lightboxGallery.currentIndex]?.url?.includes('manhole') ? 'is-pokelid' : 'is-card'}`} 
                      onLoad={() => {
                        const url = lightboxGallery.items[lightboxGallery.currentIndex]?.url;
                        if (url) markLightboxUrlLoaded(url);
                      }}
                    />
                  </div>

                  {lightboxGallery.items.length > 1 && (
                    <button 
                      className="lightbox-nav-btn lightbox-next-btn"
                      onClick={() => setLightboxGallery(prev => prev ? {
                        ...prev,
                        currentIndex: (prev.currentIndex + 1) % prev.items.length
                      } : null)}
                      title={lang === 'cs' ? 'Další (→)' : lang === 'ja' ? '次へ (→)' : lang === 'ru' ? 'Следующий (→)' : 'Next (→)'}
                      aria-label="Next image"
                    >
                      <ChevronRight size={28} />
                    </button>
                  )}
                </div>

                {/* Navigation hint */}
                {lightboxGallery.items.length > 1 && (
                  <div className="lightbox-nav-hint">
                    <span>{lang === 'cs' ? 'Použijte šipky ← / →, tažení prstem nebo náhledy níže pro okamžité procházení' : lang === 'ja' ? '矢印キー（← / →）、スワイプ、下のサムネイルで即座に切り替え' : lang === 'ru' ? 'Стрелки ← / →, свайп или миниатюры внизу для быстрого просмотра' : 'Use ← / → arrow keys, swipe, or click thumbnails below'}</span>
                  </div>
                )}

                {/* Miniature Thumbnail Preview Strip */}
                {lightboxGallery.items.length > 1 && (
                  <div className="lightbox-thumbnail-strip" ref={thumbStripRef}>
                    {lightboxGallery.items.map((item, idx) => (
                      <button
                        key={`${item.badge || idx}-${item.url}`}
                        ref={idx === lightboxGallery.currentIndex ? activeThumbBtnRef : null}
                        className={`lightbox-thumb-btn ${idx === lightboxGallery.currentIndex ? 'active' : ''}`}
                        onClick={() => setLightboxGallery(prev => prev ? { ...prev, currentIndex: idx } : null)}
                        title={item.title}
                      >
                        <img src={item.thumb || item.url} alt={item.title} className="lightbox-thumb-img" />
                        {item.badge && <span className="lightbox-thumb-badge">{item.badge}</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>,
            document.body
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="guides-container">
      <header className="guides-header">
        <div className="guides-title-badge">
          <BookOpen size={16} />
          {getTranslation('headerBadge')}
        </div>

        <h1>{getTranslation('headerTitle')}</h1>
        <p>{getTranslation('headerDesc')}</p>

        <div className="guides-controls">
          <div className="guides-search">
            <Search size={18} color="#94a3b8" />
            <input 
              type="text" 
              placeholder={getTranslation('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      {filteredArticles.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
          <p>{getTranslation('noResults')}</p>
        </div>
      ) : (
        <div className="guides-grid">
          {filteredArticles.map((article, index) => {
            const isFeatured = index === 0 && !searchQuery;
            return (
              <Link 
                key={article.id || article.slug} 
                href={`/${lang}/guides/${article.slug}`}
                className={`guide-card ${isFeatured ? 'featured' : ''}`}
                onClick={(e) => {
                  if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) return;
                  handleArticleClick(article.slug);
                }}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {article.imageUrl && (
                  <div className="guide-card-image-wrapper">
                    <img 
                      src={article.imageUrl} 
                      alt={article.title[lang] || article.title.en} 
                      className="guide-card-art-img"
                      loading="lazy"
                    />
                    <div className="guide-card-image-overlay" />
                  </div>
                )}

                <div className="guide-card-content">
                  <div className="guide-card-tag">
                    {getCategoryIcon(article.iconName)}
                    {article.category[lang] || article.category.en}
                  </div>

                  <h2>{article.title[lang] || article.title.en}</h2>
                  <p>{article.subtitle[lang] || article.subtitle.en}</p>

                  <div className="guide-card-meta">
                    <span><Clock size={14} /> {article.readTime}</span>
                    <span><ChevronRight size={16} color="#38bdf8" style={{ marginLeft: 'auto' }} /></span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};
