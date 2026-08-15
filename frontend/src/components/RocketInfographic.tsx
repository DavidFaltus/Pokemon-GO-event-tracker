import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { Download, Clock, Calendar, Check, ShieldCheck, Flame, Skull, AlertTriangle } from 'lucide-react';
import type { EventData } from './EventCard';
import type { Language } from '../data/translations';
import { resolveImage, handlePokemonImageError, fetchImageAsBase64 } from '../utils/imageResolver';
import { getPokemonImage } from '../data/specialEvents';
import { getPokemonName } from '../utils/pokemonTranslator';
import { formatEventDateRange } from './MaxInfographic';
import { useInfographicEditor } from '../hooks/useInfographicEditor';
import { EditableText, EditableImage, EditToolbar } from './InfographicEditable';
import { getFontEmbedCSS, disableTextClipping } from '../utils/exportPoster';
import './RocketInfographic.css';

interface RocketInfographicProps {
  event: EventData;
  lang: Language;
  timezone?: string;
  isAdmin?: boolean;
}

export const RocketInfographic: React.FC<RocketInfographicProps> = ({ event, lang, isAdmin = false }) => {
  const posterRef = useRef<HTMLDivElement>(null);
  const editor = useInfographicEditor(event.eventID, 'rocket');
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const isEditing = isAdmin && editor.isEditing;

  // Extract Rocket Boss details
  let mainBoss = "Shadow Legendary";
  const match = event.name.match(/(?:shadow|takeover):\s*([^\.]+)/i) || event.name.match(/shadow\s+([A-Za-z-'\s]+)/i);
  if (match) {
    mainBoss = match[1].trim();
  } else {
    mainBoss = event.name.replace(/team\s*go\s*rocket/gi, "").replace(/takeover/gi, "").trim() || "Shadow Raid";
  }

  const pokemonImg = getPokemonImage(mainBoss);

  // Format dates & times cleanly supporting multi-day range
  const { dateStr, timeStr, isMultiDay } = formatEventDateRange(event.start, event.end, lang);

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
      const h = Math.round(rect.height) || posterRef.current.offsetHeight || 600;
      const dataUrl = await toPng(posterRef.current, { 
        cacheBust: false,
        skipFonts: !fontEmbedCSS,
        fontEmbedCSS: fontEmbedCSS || undefined,
        width: w,
        height: h,
        canvasWidth: w * 2,
        canvasHeight: h * 2,
        pixelRatio: 2,
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
      link.download = `pogo_rocket_${mainBoss.toLowerCase()}.png`;
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
      console.error("Failed to generate rocket image:", err);
    } finally {
      originalSrcs.forEach(({ img, origSrc }) => {
        img.src = origSrc;
      });
      if (restoreClipping) {
        restoreClipping();
      }
      setDownloading(false);
      editor.setIsExporting(false);
    }
  };

  return (
    <div className="rocket-infographic-wrapper">
      <div className={`rocket-poster-container ${editor.isExporting ? 'is-exporting' : ''}`} ref={posterRef}>
        {isAdmin && (
          <EditToolbar isEditing={editor.isEditing} onToggleEdit={() => editor.setIsEditing(!editor.isEditing)} hasOverrides={editor.hasOverrides} onReset={editor.resetAll} lang={lang} />
        )}
        <div className="rocket-poster-glow-top"></div>

        {/* Header */}
        <div className="rocket-poster-header">
          <div className="rocket-poster-badge">
            <Skull size={14} className="rocket-skull-icon" />
            <EditableText value={editor.getTextOverride('badge', 'TEAM GO ROCKET TAKEOVER')} onChange={(v) => editor.setTextOverride('badge', v)} isEditing={isEditing} />
          </div>
          <EditableText value={editor.getTextOverride('title', event.name)} onChange={(v) => editor.setTextOverride('title', v)} isEditing={isEditing} as="h2" className="rocket-poster-title" />
          
          <div className="rocket-poster-time-bar">
            <div className="rocket-time-item">
              <Calendar size={15} />
              <EditableText value={editor.getTextOverride('date', dateStr)} onChange={(v) => editor.setTextOverride('date', v)} isEditing={isEditing} />
            </div>
            {!isMultiDay && timeStr && (
              <>
                <div className="rocket-time-divider">•</div>
                <div className="rocket-time-item">
                  <Clock size={15} />
                  <EditableText value={editor.getTextOverride('time', timeStr)} onChange={(v) => editor.setTextOverride('time', v)} isEditing={editor.isEditing} />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Main Section */}
        <div className="rocket-poster-main">
          {/* Giovanni & Shadow Boss Showcase */}
          <div className="rocket-poke-card">
            <div className="rocket-image-halo"></div>
            <EditableImage 
              src={editor.getImageOverride('bossImg', resolveImage(pokemonImg, event.eventType, mainBoss))}
              alt={mainBoss}
              onChange={(url) => editor.setImageOverride('bossImg', url)}
              isEditing={editor.isEditing}
              className="rocket-poke-img"
              onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, mainBoss)}
              pokemonName={mainBoss}
            />
            <EditableText value={editor.getTextOverride('bossName', getPokemonName(mainBoss, lang))} onChange={(v) => editor.setTextOverride('bossName', v)} isEditing={editor.isEditing} as="h3" className="rocket-poke-name" />
            
            <div className="rocket-shadow-chip">
              <Flame size={13} />
              <EditableText value={editor.getTextOverride('shadowChip', '🔮 Shadow Boss')} onChange={(v) => editor.setTextOverride('shadowChip', v)} isEditing={editor.isEditing} />
            </div>
          </div>

          {/* Frustration TM Highlight Box */}
          <div className="rocket-tm-box">
            <div className="rocket-tm-header">
              <AlertTriangle size={16} />
              <EditableText 
                value={editor.getTextOverride('tmHeader', lang === 'cs' ? 'KLÍČOVÝ BONUS EVENTU' : 'KEY EVENT BONUS')} 
                onChange={(v) => editor.setTextOverride('tmHeader', v)} 
                isEditing={editor.isEditing} 
              />
            </div>

            <div className="rocket-tm-content">
              <EditableText 
                value={editor.getTextOverride('tmTitle', lang === 'cs' ? '⚡ Odnaučte Frustration!' : '⚡ Forget Frustration!')} 
                onChange={(v) => editor.setTextOverride('tmTitle', v)} 
                isEditing={editor.isEditing} 
                as="div" 
                className="rocket-tm-title" 
              />
              <EditableText 
                value={editor.getTextOverride('tmDesc', lang === 'cs' 
                  ? 'Použijte Charged TM k odnaučení Frustration u Shadow Pokémonů během tohoto eventu!' 
                  : 'Use a Charged TM to help Shadow Pokémon forget the Charged Attack Frustration!')} 
                onChange={(v) => editor.setTextOverride('tmDesc', v)} 
                isEditing={editor.isEditing} 
                as="div" 
                className="rocket-tm-desc" 
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="rocket-poster-footer">
          <div className="rocket-footer-left">
            <ShieldCheck size={16} className="rocket-shield-icon" />
            <EditableText value={editor.getTextOverride('footerBrand', 'pogoevents.app')} onChange={(v) => editor.setTextOverride('footerBrand', v)} isEditing={editor.isEditing} />
          </div>
        </div>
      </div>

      <div className="rocket-infographic-actions" style={{ marginTop: '12px' }}>
        <button 
          className={`rocket-download-btn ${downloadSuccess ? 'success' : ''}`}
          onClick={handleDownload}
          disabled={downloading}
        >
          {downloadSuccess ? (
            <>
              <Check size={18} />
              {lang === 'cs' ? 'Uloženo!' : 'Saved!'}
            </>
          ) : downloading ? (
            <>
              <div className="btn-spinner"></div>
              {lang === 'cs' ? 'Generuji obrázek...' : 'Generating image...'}
            </>
          ) : (
            <>
              <Download size={18} />
              {lang === 'cs' ? 'Stáhnout Infografiku' : 'Download Infographic'}
            </>
          )}
        </button>
      </div>
    </div>
  );
};
