import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { Download, Sparkles, Clock, Calendar, Zap, Check, ShieldCheck, Star } from 'lucide-react';
import type { EventData } from './EventCard';
import type { Language } from '../data/translations';
import { resolveImage, handlePokemonImageError, fetchImageAsBase64 } from '../utils/imageResolver';
import { getFontEmbedCSS, disableTextClipping } from '../utils/exportPoster';
import { getPokemonImage } from '../data/specialEvents';
import { getPokemonName } from '../utils/pokemonTranslator';
import { formatEventDateRange } from './MaxInfographic';
import { useInfographicEditor } from '../hooks/useInfographicEditor';
import { EditableText, EditableImage, EditToolbar } from './InfographicEditable';
import './SpotlightInfographic.css';

interface SpotlightInfographicProps {
  event: EventData;
  lang: Language;
  timezone?: string;
  isAdmin?: boolean;
}

export const SpotlightInfographic: React.FC<SpotlightInfographicProps> = ({ event, lang = 'en', isAdmin = false }) => {
  const editor = useInfographicEditor(event.eventID, 'spotlight');
  const posterRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const isEditing = isAdmin && editor.isEditing;

  const spotlightData = event.extraData?.spotlight;
  const pokeName = spotlightData?.name || event.name.replace(/spotlight\s*hour/gi, '').trim();
  const pokemonImg = spotlightData?.image || getPokemonImage(pokeName);
  const canBeShiny = spotlightData?.canBeShiny ?? true;
  const rawBonus = spotlightData?.bonus || '';

  // Format dates & times cleanly
  const { dateStr, timeStr, isMultiDay } = formatEventDateRange(event.start, event.end, lang);

  // Translate bonus details
  const getBonusText = (b: string) => {
    const lower = b.toLowerCase();
    if (lower.includes('stardust')) {
      return {
        title: lang === 'cs' ? '2× Stardust za chycení' : '2× Catch Stardust',
        iconUrl: 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Today%20View/TodayView_Icon_Stardust.png',
        iconEmoji: '🧪',
        color: '#f39c12'
      };
    }
    if (lower.includes('xp') && lower.includes('evolve')) {
      return {
        title: lang === 'cs' ? '2× XP za vývoj' : '2× Evolve XP',
        iconUrl: 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Today%20View/TodayView_Icon_Evolve.png',
        iconEmoji: '⚡',
        color: '#9b59b6'
      };
    }
    if (lower.includes('xp')) {
      return {
        title: lang === 'cs' ? '2× XP za chycení' : '2× Catch XP',
        iconUrl: 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Today%20View/TodayView_Icon_XP.png',
        iconEmoji: '⭐',
        color: '#3498db'
      };
    }
    if (lower.includes('candy') && lower.includes('transfer')) {
      return {
        title: lang === 'cs' ? '2× Candy za přenos' : '2× Transfer Candy',
        iconUrl: '',
        iconEmoji: '🍬',
        color: '#e67e22'
      };
    }
    if (lower.includes('candy')) {
      return {
        title: lang === 'cs' ? '2× Candy za chycení' : '2× Catch Candy',
        iconUrl: '',
        iconEmoji: '🍬',
        color: '#e67e22'
      };
    }
    return {
      title: b || (lang === 'cs' ? '2× Bonus za chycení' : '2× Catch Bonus'),
      iconUrl: '',
      iconEmoji: '🎁',
      color: '#f1c40f'
    };
  };

  const bonusInfo = getBonusText(rawBonus);

  // Download handler
  const handleDownload = async () => {
    if (!posterRef.current || downloading) return;
    setDownloading(true);
    editor.setIsExporting(true);
    await new Promise(r => setTimeout(r, 120));
    if (!posterRef.current) return;

    const originalSrcs: { img: HTMLImageElement; origSrc: string }[] = [];

    let restoreClipping: (() => void) | null = null;
    try {
      const imgs = Array.from(posterRef.current.querySelectorAll('img'));

      await Promise.all(
        imgs.map(async (img) => {
          const origSrc = img.src;
          if (origSrc && !origSrc.startsWith('data:')) {
            originalSrcs.push({ img, origSrc });
            try {
              const base64 = await fetchImageAsBase64(origSrc, img);
              if (base64 && base64.startsWith('data:')) {
                img.src = base64;
              } else {
                img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
              }
            } catch {
              img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
            }
          }
        })
      );
      if (typeof document !== 'undefined' && (document as any).fonts) {
        await (document as any).fonts.ready;
      }
      if (!posterRef.current) return;

      if (posterRef.current) {
        restoreClipping = disableTextClipping(posterRef.current);
      }
      const fontEmbedCSS = await getFontEmbedCSS();
      const rect = posterRef.current.getBoundingClientRect();
      const w = Math.round(rect.width) || posterRef.current.offsetWidth || 480;
      const h = Math.round(w * 1.25);
      const dataUrl = await toPng(posterRef.current, { 
        cacheBust: false,
        skipFonts: !fontEmbedCSS,
        fontEmbedCSS: fontEmbedCSS || undefined,
        width: w,
        height: h,
        canvasWidth: 1080,
        canvasHeight: 1350,
        pixelRatio: 1080 / w,
        backgroundColor: '#0d1117',
        style: {
          width: `${w}px`,
          height: `${h}px`,
          maxWidth: `${w}px`,
          minWidth: `${w}px`,
          fontFamily: "'Outfit', 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          margin: '0',
          transform: 'none',
        }
      });

      const link = document.createElement('a');
      link.download = `pogo_spotlight_${pokeName.toLowerCase()}_4x5.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      }, 500);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to generate spotlight image:", err);
    } finally {
      originalSrcs.forEach(({ img, origSrc }) => {
        img.src = origSrc;
      });
      if (restoreClipping) {
        restoreClipping();
      }
      editor.setIsExporting(false);
      setDownloading(false);
    }
  };

  return (
    <div className="spotlight-infographic-wrapper">
      <div className={`spotlight-poster-container ${editor.isExporting ? 'is-exporting' : ''}`} ref={posterRef}>
        {isAdmin && (
          <EditToolbar isEditing={editor.isEditing} onToggleEdit={() => editor.setIsEditing(!editor.isEditing)} hasOverrides={editor.hasOverrides} onReset={editor.resetAll} lang={lang} />
        )}
        <div className="spotlight-poster-glow-top"></div>

        {/* Header */}
        <div className="spotlight-poster-header">
          <div className="spotlight-header-top-row">
            <div className="spotlight-poster-badge">
              <Star size={13} className="spotlight-star-icon" fill="currentColor" />
              <EditableText value={editor.getTextOverride('badge', 'SPOTLIGHT HOUR')} onChange={(v) => editor.setTextOverride('badge', v)} isEditing={isEditing} />
            </div>
            <div className="spotlight-poster-time-pill">
              <div className="spotlight-time-item">
                <Calendar size={13} />
                <EditableText value={editor.getTextOverride('date', dateStr)} onChange={(v) => editor.setTextOverride('date', v)} isEditing={editor.isEditing} />
              </div>
              {!isMultiDay && timeStr && (
                <>
                  <div className="spotlight-time-divider">•</div>
                  <div className="spotlight-time-item">
                    <Clock size={13} />
                    <EditableText value={editor.getTextOverride('time', timeStr)} onChange={(v) => editor.setTextOverride('time', v)} isEditing={editor.isEditing} />
                  </div>
                </>
              )}
            </div>
          </div>
          <EditableText value={editor.getTextOverride('title', getPokemonName(pokeName, lang))} onChange={(v) => editor.setTextOverride('title', v)} isEditing={isEditing} as="h2" className="spotlight-poster-title" />
        </div>

        {/* Main Section */}
        <div className="spotlight-poster-main">
          {/* 1. Featured Pokemon Showcase (Normal & Shiny Sprites Side-by-Side, exact same sizes) */}
          <div className="spotlight-poke-showcase">
            <div className="spotlight-sprites-pair">
              <div className="spotlight-sprite-box">
                <EditableImage 
                  src={editor.getImageOverride('normalSprite', resolveImage(pokemonImg, event.eventType, pokeName, false))}
                  alt={pokeName}
                  onChange={(url) => editor.setImageOverride('normalSprite', url)}
                  isEditing={editor.isEditing}
                  className="spotlight-poke-sprite"
                  onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, pokeName, false)}
                  pokemonName={pokeName}
                />
                <EditableText value={editor.getTextOverride('normalTag', 'Normal')} onChange={(v) => editor.setTextOverride('normalTag', v)} isEditing={editor.isEditing} as="span" className="sprite-tag" />
              </div>
              {canBeShiny && (
                <div className="spotlight-sprite-box">
                  <EditableImage
                    src={editor.getImageOverride('shinySprite', resolveImage(pokemonImg, event.eventType, pokeName, true))}
                    alt={`${pokeName} Shiny`}
                    onChange={(url) => editor.setImageOverride('shinySprite', url)}
                    isEditing={editor.isEditing}
                    className="spotlight-poke-sprite shiny-glow"
                    onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, pokeName, true)}
                    pokemonName={pokeName}
                  />
                  <EditableText value={editor.getTextOverride('shinyTag', '✨ Shiny')} onChange={(v) => editor.setTextOverride('shinyTag', v)} isEditing={editor.isEditing} as="span" className="sprite-tag shiny" />
                </div>
              )}
            </div>
          </div>

          {/* 2. Active Hour Bonus Card */}
          <div className="spotlight-bonus-card" style={{ borderColor: bonusInfo.color }}>
            <div className="spotlight-bonus-header">
              <Zap size={16} style={{ color: bonusInfo.color }} />
              <span>
                <EditableText 
                  value={editor.getTextOverride('bonusHeader', lang === 'cs' ? 'BONUS AKTIVNÍ HODINY' : 'ACTIVE HOUR BONUS')} 
                  onChange={(v) => editor.setTextOverride('bonusHeader', v)} 
                  isEditing={editor.isEditing} 
                />
              </span>
            </div>
            <div className="spotlight-bonus-val-box" style={{ backgroundColor: `${bonusInfo.color}18` }}>
              {bonusInfo.iconUrl ? (
                <img src={bonusInfo.iconUrl} alt={bonusInfo.title} className="spotlight-bonus-img" />
              ) : (
                <span className="spotlight-bonus-emoji">{bonusInfo.iconEmoji}</span>
              )}
              <EditableText value={editor.getTextOverride('bonusTitle', bonusInfo.title)} onChange={(v) => editor.setTextOverride('bonusTitle', v)} isEditing={editor.isEditing} as="div" className="spotlight-bonus-title" style={{ color: bonusInfo.color }} />
            </div>
            <EditableText 
              value={editor.getTextOverride('bonusDesc', lang === 'cs' ? 'Platí po celou hodinu pro všechny chycené Pokémony.' : 'Applies during the entire hour for all caught Pokémon.')} 
              onChange={(v) => editor.setTextOverride('bonusDesc', v)} 
              isEditing={editor.isEditing} 
              as="div" 
              className="spotlight-bonus-desc" 
            />
          </div>

          {/* 3. Shiny Rate Card */}
          <div className="spotlight-shiny-rate-card">
            <Sparkles size={15} style={{ color: '#fbbf24' }} />
            <EditableText 
              value={editor.getTextOverride('shinyRate', canBeShiny 
                ? (lang === 'cs' ? 'ŠANCE NA SHINY: ~1 z 500 (0,2% šance) ✨' : 'SHINY RATE: ~1 in 500 (0.2% Chance) ✨')
                : (lang === 'cs' ? 'SHINY: Není k dispozici 🚫' : 'SHINY RATE: Not Available 🚫'))} 
              onChange={(v) => editor.setTextOverride('shinyRate', v)} 
              isEditing={editor.isEditing} 
              as="span" 
            />
          </div>
        </div>

        {/* Footer */}
        <div className="spotlight-poster-footer">
          <div className="spotlight-footer-left">
            <ShieldCheck size={16} className="spotlight-shield-icon" />
            <EditableText value={editor.getTextOverride('footerBrand', 'pogoevents.app')} onChange={(v) => editor.setTextOverride('footerBrand', v)} isEditing={editor.isEditing} />
          </div>
          <EditableText value={editor.getTextOverride('footerRight', 'Pokémon GO Event Tracker')} onChange={(v) => editor.setTextOverride('footerRight', v)} isEditing={editor.isEditing} />
        </div>
      </div>

      <div className="spotlight-infographic-actions" style={{ marginTop: '12px' }}>
        <button 
          className={`spotlight-download-btn ${downloadSuccess ? 'success' : ''}`}
          onClick={handleDownload}
          disabled={downloading}
        >
          {downloadSuccess ? (
            <>
              <Check size={18} />
              Saved PNG!
            </>
          ) : downloading ? (
            <>
              <div className="btn-spinner"></div>
              Generating Image (4:5)...
            </>
          ) : (
            <>
              <Download size={18} />
              Download Infographic (4:5)
            </>
          )}
        </button>
      </div>
    </div>
  );
};
