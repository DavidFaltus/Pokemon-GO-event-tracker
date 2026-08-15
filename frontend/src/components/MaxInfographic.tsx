import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { Download, Sparkles, Clock, Calendar, Zap, Check, ShieldCheck, Activity } from 'lucide-react';
import type { EventData } from './EventCard';
import type { Language } from '../data/translations';
import { resolveImage, handlePokemonImageError, getBasePokemonNames, fetchImageAsBase64 } from '../utils/imageResolver';
import { getPokemonImage } from '../data/specialEvents';
import { getPokemonName } from '../utils/pokemonTranslator';
import { useInfographicEditor } from '../hooks/useInfographicEditor';
import { EditableText, EditableImage, EditToolbar } from './InfographicEditable';
import { getFontEmbedCSS, disableTextClipping } from '../utils/exportPoster';
import './MaxInfographic.css';

interface MaxInfographicProps {
  event: EventData;
  lang: Language;
  timezone?: string;
  isAdmin?: boolean;
}

// Formats date & time range for single day and multi-day events
export function formatEventDateRange(startInput: string | Date, endInput: string | Date, lang: Language) {
  const start = new Date(startInput);
  const end = new Date(endInput);

  const isSameDay = start.getFullYear() === end.getFullYear() &&
                    start.getMonth() === end.getMonth() &&
                    start.getDate() === end.getDate();

  const isMultiDay = !isSameDay;

  const monthNamesEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthNamesCs = ['led', 'úno', 'bře', 'dub', 'kvě', 'čvn', 'čvc', 'srp', 'zář', 'říj', 'lis', 'pro'];
  const months = lang === 'cs' ? monthNamesCs : monthNamesEn;

  const startDay = start.getDate();
  const startMonth = months[start.getMonth()];
  const endDay = end.getDate();
  const endMonth = months[end.getMonth()];

  let dateStr = "";
  if (isSameDay) {
    const dayOfWeekEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][start.getDay()];
    const dayOfWeekCs = ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'][start.getDay()];
    const dow = lang === 'cs' ? dayOfWeekCs : dayOfWeekEn;
    dateStr = `${dow}, ${startDay} ${startMonth} ${start.getFullYear()}`;
  } else {
    if (start.getMonth() === end.getMonth()) {
      dateStr = `${startDay} – ${endDay} ${startMonth} ${start.getFullYear()}`;
    } else {
      dateStr = `${startDay} ${startMonth} – ${endDay} ${endMonth} ${start.getFullYear()}`;
    }
  }

  // Format Hours cleanly (e.g., 6:00 PM – 7:00 PM)
  const formatTimePart = (d: Date) => {
    let hrs = d.getHours();
    const mins = d.getMinutes().toString().padStart(2, '0');
    const ampm = hrs >= 12 ? 'PM' : 'AM';
    hrs = hrs % 12;
    hrs = hrs ? hrs : 12;
    return `${hrs}:${mins} ${ampm}`;
  };

  const timeStr = `${formatTimePart(start)} – ${formatTimePart(end)}`;

  return { dateStr, timeStr, isMultiDay };
}

// Calculate Max Particle (MP) Costs by Tier based on exact user specification:
// 1-Star: 250 MP, 2-Star: 400 MP, 3-Star: 400 MP, 5-Star (Legendary): 800 MP, 6-Star (Gigantamax): 800 MP
export function getMaxBattleMpCost(eventName: string, isGigantamax: boolean): string {
  const lower = eventName.toLowerCase();
  if (lower.includes('eternatus') || lower.includes('eternamax')) return '800 MP';
  if (isGigantamax || lower.includes('6-star') || lower.includes('5-star') || lower.includes('legendary')) return '800 MP';
  if (lower.includes('2-star') || lower.includes('3-star') || lower.includes('4-star')) return '400 MP';
  if (lower.includes('1-star')) return '250 MP';
  return '400 MP';
}

// Calculate Max Battle XP Scaling by Tier based on exact user specification:
// 1-Star: 5,000 XP, 2-Star: 6,000 XP, 3-Star: 7,500 XP, 4-Star: 10,000 XP, 5-Star: 15,000 XP, 6-Star (Gigantamax): 25,000 XP, 6-Star (Eternamax Eternatus): 50,000 XP
export function getMaxBattleXpReward(eventName: string, isGigantamax: boolean): string {
  const lower = eventName.toLowerCase();
  if (lower.includes('eternatus') || lower.includes('eternamax')) return '50,000 XP';
  if (isGigantamax || lower.includes('6-star')) return '25,000 XP';
  if (lower.includes('5-star') || lower.includes('legendary')) return '15,000 XP';
  if (lower.includes('4-star')) return '10,000 XP';
  if (lower.includes('3-star')) return '7,500 XP';
  if (lower.includes('2-star')) return '6,000 XP';
  if (lower.includes('1-star')) return '5,000 XP';
  return '10,000 XP';
}

export const MaxInfographic: React.FC<MaxInfographicProps> = ({ event, isAdmin = false }) => {
  const editor = useInfographicEditor(event.eventID, 'max');
  const posterRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const isEditing = isAdmin && editor.isEditing;

  // Extract Max Boss details
  let bossName = "";

  if (event.extraData?.raidbattles?.bosses?.[0]) {
    const b = event.extraData.raidbattles.bosses[0];
    bossName = typeof b === 'string' ? b : b.name;
  }

  if (!bossName) {
    const knownNames = getBasePokemonNames();
    const eventNameLower = event.name.toLowerCase();
    for (const p of knownNames) {
      if (eventNameLower.includes(p.toLowerCase())) {
        bossName = p;
        break;
      }
    }
  }

  if (!bossName) {
    bossName = event.name
      .replace(/during\s+max\s+monday/gi, '')
      .replace(/during/gi, '')
      .replace(/max\s*monday/gi, '')
      .replace(/max\s*battles?/gi, '')
      .replace(/dynamax/gi, '')
      .replace(/gigantamax/gi, '')
      .trim() || "Max Boss";
  }

  const pokemonImg = getPokemonImage(bossName);
  const isGigantamax = event.name.toLowerCase().includes('gigantamax');
  const canBeShiny = true;

  // Format dates & times cleanly
  const { dateStr, timeStr, isMultiDay } = formatEventDateRange(event.start, event.end, 'en');

  // Exact Tier MP & XP values
  const mpCost = getMaxBattleMpCost(event.name, isGigantamax);
  const xpReward = getMaxBattleXpReward(event.name, isGigantamax);

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
      link.download = `pogo_max_${bossName.toLowerCase()}_4x5.png`;
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
      console.error("Failed to generate max battle image:", err);
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
    <div className="max-infographic-wrapper">
      <div className={`max-poster-container ${editor.isExporting ? 'is-exporting' : ''}`} ref={posterRef}>
        {isAdmin && (
          <EditToolbar 
            isEditing={editor.isEditing} 
            onToggleEdit={() => editor.setIsEditing(!editor.isEditing)} 
            hasOverrides={editor.hasOverrides} 
            onReset={editor.resetAll} 
            lang={'en'} 
          />
        )}
        <div className="max-poster-glow-top"></div>

        {/* Header */}
        <div className="max-poster-header">
          <div className="max-poster-badge">
            <Activity size={14} className="max-icon-pulse" />
            <EditableText 
              value={editor.getTextOverride('badgeText', isGigantamax ? 'GIGANTAMAX BATTLE' : event.eventType === 'max-monday' || event.name.toLowerCase().includes('monday') ? 'MAX MONDAY' : 'DYNAMAX MAX BATTLE')} 
              onChange={(v) => editor.setTextOverride('badgeText', v)} 
              isEditing={isEditing} 
              as="span" 
            />
          </div>
          <EditableText 
            value={editor.getTextOverride('title', getPokemonName(bossName, 'en'))} 
            onChange={(v) => editor.setTextOverride('title', v)} 
            isEditing={isEditing} 
            as="h2" 
            className="max-poster-title" 
          />
          
          <div className="max-poster-time-bar">
            <div className="max-time-item">
              <Calendar size={14} />
              <EditableText 
                value={editor.getTextOverride('dateStr', dateStr)} 
                onChange={(v) => editor.setTextOverride('dateStr', v)} 
                isEditing={editor.isEditing} 
                as="span" 
              />
            </div>
            {!isMultiDay && timeStr && (
              <>
                <div className="max-time-divider">•</div>
                <div className="max-time-item">
                  <Clock size={14} />
                  <EditableText 
                    value={editor.getTextOverride('timeStr', timeStr)} 
                    onChange={(v) => editor.setTextOverride('timeStr', v)} 
                    isEditing={editor.isEditing} 
                    as="span" 
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Main Section */}
        <div className="max-poster-main">
          {/* 1. Max Boss Showcase (Normal & Shiny Sprites Side-by-Side at the top) */}
          <div className="max-poke-showcase">
            <div className="max-sprites-pair">
              <div className="max-sprite-box">
                <EditableImage 
                  src={editor.getImageOverride('normalSprite', resolveImage(pokemonImg, event.eventType, bossName, false))} 
                  alt={bossName} 
                  onChange={(url) => editor.setImageOverride('normalSprite', url)} 
                  isEditing={editor.isEditing} 
                  className="max-poke-sprite"
                  onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, bossName, false)}
                  pokemonName={bossName}
                />
                <EditableText 
                  value={editor.getTextOverride('normalTag', 'Normal')} 
                  onChange={(v) => editor.setTextOverride('normalTag', v)} 
                  isEditing={editor.isEditing} 
                  className="sprite-tag" 
                />
              </div>
              {canBeShiny && (
                <div className="max-sprite-box">
                  <EditableImage 
                    src={editor.getImageOverride('shinySprite', resolveImage(pokemonImg, event.eventType, bossName, true))} 
                    alt={`${bossName} Shiny`} 
                    onChange={(url) => editor.setImageOverride('shinySprite', url)} 
                    isEditing={editor.isEditing} 
                    className="max-poke-sprite shiny-glow"
                    onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, bossName, true)}
                    pokemonName={bossName}
                  />
                  <EditableText 
                    value={editor.getTextOverride('shinyTag', '✨ Shiny')} 
                    onChange={(v) => editor.setTextOverride('shinyTag', v)} 
                    isEditing={editor.isEditing} 
                    className="sprite-tag shiny" 
                  />
                </div>
              )}
            </div>
          </div>

          {/* 2. Event Info Box (Moved directly below Pokemon photos) */}
          <div className="max-details-box">
            <div className="max-details-header">
              <Zap size={16} />
              <EditableText 
                value={editor.getTextOverride('detailsHeader', 'POWER SPOT & MAX PARTICLES')} 
                onChange={(v) => editor.setTextOverride('detailsHeader', v)} 
                isEditing={editor.isEditing} 
                as="span" 
              />
            </div>

            <div className="max-details-row">
              <div className="max-detail-item">
                <EditableImage
                  src={editor.getImageOverride('mpPackImg', mpCost === '800 MP' ? 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Items/mp_pack_mulit.png' : 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Items/mp_pack.png')}
                  alt="MP Pack"
                  onChange={(url) => editor.setImageOverride('mpPackImg', url)}
                  isEditing={editor.isEditing}
                  className="max-mp-pack-img"
                />
                <div>
                  <EditableText 
                    value={editor.getTextOverride('mpCostLabel', 'MP COST:')} 
                    onChange={(v) => editor.setTextOverride('mpCostLabel', v)} 
                    isEditing={editor.isEditing} 
                    className="max-detail-label" 
                  />
                  <EditableText 
                    value={editor.getTextOverride('mpCostVal', mpCost)} 
                    onChange={(v) => editor.setTextOverride('mpCostVal', v)} 
                    isEditing={editor.isEditing} 
                    className="max-detail-val" 
                  />
                </div>
              </div>

              <div className="max-detail-item highlight">
                <div>
                  <EditableText 
                    value={editor.getTextOverride('xpRewardLabel', 'XP REWARD:')} 
                    onChange={(v) => editor.setTextOverride('xpRewardLabel', v)} 
                    isEditing={editor.isEditing} 
                    className="max-detail-label highlight" 
                  />
                  <EditableText 
                    value={editor.getTextOverride('xpRewardVal', xpReward)} 
                    onChange={(v) => editor.setTextOverride('xpRewardVal', v)} 
                    isEditing={editor.isEditing} 
                    className="max-detail-val highlight" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3. Shiny Rate Card (Single line horizontal box) */}
          <div className="max-shiny-rate-card">
            <Sparkles size={15} style={{ color: '#f472b6' }} />
            <EditableText 
              value={editor.getTextOverride('shinyRateText', canBeShiny ? 'SHINY RATE: ~1 in 500 (0.2% Chance) ✨' : 'SHINY RATE: Not Available 🚫')} 
              onChange={(v) => editor.setTextOverride('shinyRateText', v)} 
              isEditing={editor.isEditing} 
              as="span" 
            />
          </div>
        </div>

        {/* Footer */}
        <div className="max-poster-footer">
          <div className="max-footer-left">
            <ShieldCheck size={16} className="max-shield-icon" />
            <EditableText 
              value={editor.getTextOverride('footerLeft', 'pogoevents.app')} 
              onChange={(v) => editor.setTextOverride('footerLeft', v)} 
              isEditing={editor.isEditing} 
              as="span" 
            />
          </div>
          <EditableText 
            value={editor.getTextOverride('footerRight', 'Pokémon GO Event Tracker')} 
            onChange={(v) => editor.setTextOverride('footerRight', v)} 
            isEditing={editor.isEditing} 
            as="span" 
          />
        </div>
      </div>

      <div className="max-infographic-actions" style={{ marginTop: '12px' }}>
        <button 
          className={`max-download-btn ${downloadSuccess ? 'success' : ''}`}
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
