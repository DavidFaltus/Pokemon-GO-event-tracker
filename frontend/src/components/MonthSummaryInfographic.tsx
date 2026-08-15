import React, { useRef, useState, useEffect, useCallback } from 'react';
import { toPng } from 'html-to-image';
import { Download, Calendar, ArrowLeft, ArrowRight, Check, Copy, RefreshCw, FileText } from 'lucide-react';
import type { EventData } from './EventCard';
import type { Language } from '../data/translations';
import { resolveImage, handlePokemonImageError, fetchImageAsBase64 } from '../utils/imageResolver';
import { API_BASE_URL } from '../config';
import { getFontEmbedCSS, disableTextClipping } from '../utils/exportPoster';
import { useInfographicEditor } from '../hooks/useInfographicEditor';
import { EditableText, EditableImage, EditToolbar } from './InfographicEditable';
import {
  filterEventsForMonth,
  categorizeMonthlyEvents,
  generateWeeklyTimeline,
  cleanEventName,
  getSpotlightBonus,
  getWeekMondayToSundayRange
} from '../utils/infographics';
import './MonthSummaryInfographic.css';

interface MonthSummaryInfographicProps {
  events: EventData[];
  lang: Language;
  targetDate?: Date;
  initialOffset?: number;
  onClose?: () => void;
  showCaption?: boolean;
  isAdmin?: boolean;
}

const MONTH_NAMES_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/**
 * Extracts a clean Pokemon name from various event titles.
 */
const extractPokemonNameFromTitle = (title: string): string | null => {
  const clean = title.toLowerCase();
  const words = clean
    .replace(/spotlight hour/g, '')
    .replace(/community day/g, '')
    .replace(/raid hour/g, '')
    .replace(/raid day/g, '')
    .replace(/max monday/g, '')
    .replace(/dynamax/g, '')
    .replace(/gigantamax/g, '')
    .replace(/mega/g, '')
    .replace(/shadow/g, '')
    .replace(/rotation/g, '')
    .replace(/raids/g, '')
    .replace(/raid/g, '')
    .replace(/ticket/g, '')
    .replace(/bounty/g, '')
    .replace(/[^a-z\s-]/g, '')
    .trim()
    .split(/\s+/);

  const candidate = words.find(w => w.length > 2);
  return candidate || null;
};

/**
 * Generates uniform 3D render image URL from PokemonDB
 */
const getPokemonDbUrl = (name: string, isShiny = false): string => {
  const cleanName = name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
    
  return `https://img.pokemondb.net/sprites/home/${isShiny ? 'shiny' : 'normal'}/${cleanName}.png`;
};

export const MonthSummaryInfographic: React.FC<MonthSummaryInfographicProps> = ({
  events,
  lang,
  targetDate = new Date(),
  initialOffset = 1,
  onClose,
  showCaption = true,
  isAdmin = false
}) => {
  const posterRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [generatedCaption, setGeneratedCaption] = useState<string>('');
  const [captionCopied, setCaptionCopied] = useState<boolean>(false);

  const [summaryMode, setSummaryMode] = useState<'weekly' | 'monthly'>('weekly');
  const [selectedWeekNum, setSelectedWeekNum] = useState<number>(1);
  const [monthlySlideIndex, setMonthlySlideIndex] = useState<number>(0);
  const [selectedMonthOffset, setSelectedMonthOffset] = useState<number>(initialOffset);

  const activeDate = new Date(targetDate.getFullYear(), targetDate.getMonth() + selectedMonthOffset, 1);
  const monthIndex = activeDate.getMonth();
  const yearNum = activeDate.getFullYear();
  const monthName = MONTH_NAMES_EN[monthIndex];

  const editorKey = `${summaryMode}_${monthName}_${yearNum}_${summaryMode === 'weekly' ? `w${selectedWeekNum}` : `s${monthlySlideIndex}`}`;
  const editor = useInfographicEditor(editorKey, 'monthSummary');

  const isEditing = isAdmin && editor.isEditing;

  const EdText = ({ fKey, children, inline }: { fKey: string; children: string; inline?: boolean }) => (
    <EditableText 
      value={editor.getTextOverride(fKey, children || '')} 
      onChange={(v) => editor.setTextOverride(fKey, v)} 
      isEditing={isEditing} 
      as={inline ? 'span' : undefined}
    />
  );
  
  const EdImg = ({ fKey, src, alt, className, onError }: any) => (
    <EditableImage
      src={editor.getImageOverride(fKey, src)}
      alt={alt}
      onChange={(v) => editor.setImageOverride(fKey, v)}
      isEditing={isEditing}
      className={className}
      onError={onError}
    />
  );

  const currentMonthIndex = targetDate.getMonth();
  const nextMonthIndex = (currentMonthIndex + 1) % 12;

  const monthlyFilteredEvents = filterEventsForMonth(events, monthIndex, yearNum);
  const categorized = categorizeMonthlyEvents(monthlyFilteredEvents);

  const slides = [
    { key: 'communityDays', data: categorized.communityDays, theme: 'green', title: 'Community Days & Major Events' },
    { key: 'raids', data: categorized.raids, theme: 'blue', title: 'Legendary & Mega Raids' },
    { key: 'spotlights', data: categorized.spotlights, theme: 'orange', title: 'Spotlight Hours' },
    { key: 'raidHours', data: categorized.raidHours, theme: 'blue', title: 'Raid Hours' },
    { key: 'dynamax', data: categorized.dynamax, theme: 'red', title: 'Dynamax Battles' }
  ].filter(slide => slide.data.events.length > 0);

  const weeklyTimeline = generateWeeklyTimeline(monthlyFilteredEvents, selectedWeekNum, monthIndex, yearNum);

  const getWeeklyDateRangeString = () => {
    const { monday, sunday } = getWeekMondayToSundayRange(selectedWeekNum, monthIndex, yearNum);
    const startMonth = MONTH_NAMES_EN[monday.getMonth()];
    const endMonth = MONTH_NAMES_EN[sunday.getMonth()];
    
    if (startMonth === endMonth) {
      return `${startMonth} ${monday.getDate()} – ${sunday.getDate()}, ${yearNum}`;
    }
    return `${startMonth} ${monday.getDate()} – ${endMonth} ${sunday.getDate()}, ${yearNum}`;
  };

  const formatDateShort = (dateObj: Date) => {
    return `${MONTH_NAMES_EN[dateObj.getMonth()].slice(0, 3)} ${dateObj.getDate()}`;
  };

  const formatEventTime = (startStr: string, endStr: string) => {
    const s = new Date(startStr);
    const e = new Date(endStr);
    
    const durationMs = e.getTime() - s.getTime();
    const isSingleDay = durationMs < (24 * 60 * 60 * 1000);
    
    if (isSingleDay) {
      const formatTimePart = (d: Date) => {
        let hrs = d.getHours();
        const mins = d.getMinutes().toString().padStart(2, '0');
        const ampm = hrs >= 12 ? 'PM' : 'AM';
        hrs = hrs % 12;
        hrs = hrs ? hrs : 12;
        return `${hrs}:${mins} ${ampm}`;
      };
      return `${formatTimePart(s)} – ${formatTimePart(e)}`;
    }
    return null;
  };

  const getEventVisualSrc = (item: EventData) => {
    const pokemonName = extractPokemonNameFromTitle(item.name);
    if (pokemonName) {
      return getPokemonDbUrl(pokemonName);
    }
    return resolveImage(item.image, item.eventType, item.name);
  };

  const buildCaption = useCallback((): string => {
    if (summaryMode === 'weekly') {
      const dateRangeStr = getWeeklyDateRangeString();
      const activeEventsList = weeklyTimeline
        .filter(day => day.event)
        .map(day => {
          const dStr = `${day.dayName.slice(0, 3)} (${day.date.getDate()}.${day.date.getMonth() + 1}.)`;
          const evName = cleanEventName(day.event!.name);
          const bonus = getSpotlightBonus(day.event!);
          const bonusStr = bonus ? ` [${bonus}]` : '';
          const time = formatEventTime(day.event!.start, day.event!.end);
          const timeStr = time ? ` • ${time}` : '';
          return `🗓️ ${dStr}: ${evName}${timeStr}${bonusStr}`;
        });

      const eventsFormatted = activeEventsList.length > 0
        ? activeEventsList.join('\n')
        : (lang === 'cs' ? 'Žádné potvrzené speciální události pro tento týden.' : 'No confirmed special events for this week.');

      if (lang === 'cs') {
        return `📅 Pokémon GO: Týdenní přehled událostí (${dateRangeStr}) 📱\n\n` +
          `${eventsFormatted}\n\n` +
          `✨ Živé odpočty, IV CP tabulky, slabosti a doporučené counters najdeš na našem webu!\n` +
          `👉 https://pogoevents.app\n\n` +
          `#PokemonGO #PogoEvents #Pokemon #PokemonGOEvents #WeeklySummary #PogoWeekly #GottaCatchEmAll #PokemonGOCzech #PogoCS`;
      }

      return `📅 Pokémon GO: Weekly Events Overview (${dateRangeStr}) 📱\n\n` +
        `${eventsFormatted}\n\n` +
        `✨ Check live timers, 100% IV CP ranges, weaknesses, and top raid counters in our app!\n` +
        `👉 https://pogoevents.app\n\n` +
        `#PokemonGO #PogoEvents #Pokemon #PokemonGOEvents #WeeklySummary #PogoWeekly #GottaCatchEmAll`;
    } else {
      // Monthly summary
      const categoryHighlights: string[] = [];

      if (categorized.communityDays.events.length > 0) {
        const names = categorized.communityDays.events.map(e => `• ${cleanEventName(e.name)} (${formatDateShort(new Date(e.start))})`).join('\n');
        categoryHighlights.push(lang === 'cs' ? `🌟 Community Days & Speciální dny:\n${names}` : `🌟 Community Days & Special Events:\n${names}`);
      }
      if (categorized.raids.events.length > 0) {
        const names = categorized.raids.events.map(e => `• ${cleanEventName(e.name)} (${formatDateShort(new Date(e.start))} – ${formatDateShort(new Date(e.end))})`).join('\n');
        categoryHighlights.push(lang === 'cs' ? `⚔️ Legendární & Mega Raidy:\n${names}` : `⚔️ Legendary & Mega Raids:\n${names}`);
      }
      if (categorized.spotlights.events.length > 0) {
        const names = categorized.spotlights.events.map(e => {
          const b = getSpotlightBonus(e);
          return `• ${cleanEventName(e.name)} (${formatDateShort(new Date(e.start))})${b ? ` [${b}]` : ''}`;
        }).join('\n');
        categoryHighlights.push(lang === 'cs' ? `⭐ Spotlight Hours:\n${names}` : `⭐ Spotlight Hours:\n${names}`);
      }
      if (categorized.dynamax.events.length > 0) {
        const names = categorized.dynamax.events.map(e => `• ${cleanEventName(e.name)} (${formatDateShort(new Date(e.start))})`).join('\n');
        categoryHighlights.push(lang === 'cs' ? `🔴 Dynamax & Gigantamax:\n${names}` : `🔴 Dynamax & Gigantamax:\n${names}`);
      }

      const highlightsStr = categoryHighlights.length > 0
        ? categoryHighlights.join('\n\n')
        : (lang === 'cs' ? 'Brzy doplníme přehled nadcházejících událostí.' : 'Upcoming events will be updated soon.');

      if (lang === 'cs') {
        return `🗓️ Pokémon GO: Přehled událostí na ${monthName} ${yearNum}! 📱\n\n` +
          `${highlightsStr}\n\n` +
          `📱 Kompletní přehled, živé odpočty a doporučené counters najdete v naší aplikaci:\n` +
          `👉 https://pogoevents.app\n\n` +
          `#PokemonGO #PogoEvents #Pokemon #${monthName}${yearNum} #PokemonGOMonthly #GottaCatchEmAll #PokemonGOCzech #PogoCS`;
      }

      return `🗓️ Pokémon GO: ${monthName} ${yearNum} Events Overview! 📱\n\n` +
        `${highlightsStr}\n\n` +
        `📱 Full guides, live countdowns, and raid counters available in our web app:\n` +
        `👉 https://pogoevents.app\n\n` +
        `#PokemonGO #PogoEvents #Pokemon #${monthName}${yearNum} #PokemonGOMonthly #GottaCatchEmAll`;
    }
  }, [summaryMode, selectedWeekNum, monthIndex, yearNum, monthlyFilteredEvents, categorized, weeklyTimeline, lang, monthName]);

  useEffect(() => {
    setGeneratedCaption(buildCaption());
  }, [buildCaption]);

  const renderSpotlightBonusSubline = (item: EventData, fieldPrefix: string) => {
    const bonus = getSpotlightBonus(item);
    if (!bonus) return null;

    let icon = '🎁';
    const lower = bonus.toLowerCase();
    if (lower.includes('stardust')) icon = '✨';
    else if (lower.includes('xp')) icon = '⭐';
    else if (lower.includes('candy')) icon = '🍬';

    return (
      <div className="spotlight-bonus-subline">
        <span className="bonus-icon">{icon}</span>
        <span className="bonus-text"><EdText fKey={`${fieldPrefix}_bonus`}>{bonus}</EdText></span>
      </div>
    );
  };

  const getEventCategoryClass = (item: EventData): string => {
    const type = item.eventType;
    const nameLower = item.name.toLowerCase();

    if (type === 'max-mondays' || type === 'max-monday' || type.includes('max') || nameLower.includes('max monday') || nameLower.includes('dynamax') || nameLower.includes('gigantamax')) {
      return 'event-max-mondays event-dynamax';
    }
    if (type === 'raid-hour' || nameLower.includes('raid hour')) {
      return 'event-raid-hour';
    }
    if (type === 'pokemon-spotlight-hour' || nameLower.includes('spotlight hour')) {
      return 'event-pokemon-spotlight-hour';
    }
    if (type === 'community-day' || nameLower.includes('community day')) {
      return 'event-community-day';
    }
    if (type.includes('raid') || nameLower.includes('raid')) {
      return 'event-raid-battles';
    }
    return `event-${type}`;
  };

  const getEventBadgeLabel = (item: EventData): string => {
    const type = item.eventType;
    const nameLower = item.name.toLowerCase();

    if (type === 'max-mondays' || type === 'max-monday' || nameLower.includes('max monday') || nameLower.includes('dynamax') || nameLower.includes('gigantamax')) {
      return 'DYNAMAX MONDAY';
    }
    if (type === 'raid-hour' || nameLower.includes('raid hour')) {
      return 'RAID HOUR';
    }
    if (type === 'pokemon-spotlight-hour' || nameLower.includes('spotlight hour')) {
      return 'SPOTLIGHT HOUR';
    }
    if (type === 'community-day' || nameLower.includes('community day')) {
      return 'COMMUNITY DAY';
    }
    if (type.includes('raid')) {
      return 'RAID BATTLES';
    }
    return type.replace(/-/g, ' ').toUpperCase();
  };

  const handleDownload = async () => {
    if (!posterRef.current || downloading) return;
    editor.setIsExporting(true);
    setDownloading(true);
    await new Promise(r => setTimeout(r, 100));
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
        backgroundColor: '#090d16',
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
      const filenameSuffix = summaryMode === 'weekly' 
        ? `week_${selectedWeekNum}` 
        : slides[monthlySlideIndex]?.key || 'overview';
      
      link.download = `pogo_${summaryMode}_${filenameSuffix}_${monthName.toLowerCase()}_${yearNum}.png`;
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
      console.error('Failed to generate infographic:', err);
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

  const currentSlide = slides[monthlySlideIndex];

  const renderSingleEventDetail = (item: EventData, key: string) => {
    const pokemonName = extractPokemonNameFromTitle(item.name);
    const normalUrl = pokemonName ? getPokemonDbUrl(pokemonName, false) : resolveImage(item.image, item.eventType, item.name);
    const shinyUrl = pokemonName ? getPokemonDbUrl(pokemonName, true) : null;
    const cleanedName = cleanEventName(item.name);
    const dateRangeStr = `${formatDateShort(new Date(item.start))} - ${formatDateShort(new Date(item.end))}`;
    const eventTime = formatEventTime(item.start, item.end);

    if (key === 'goPass') {
      return (
        <div className="single-event-detail go-pass-detail">
          <div className="detail-badge-header"><EdText fKey="go_pass_badge">MONTHLY GO PASS</EdText></div>
          <h3 className="detail-title"><EdText fKey="go_pass_title">{item.name}</EdText></h3>
          <span className="detail-date-pill"><EdText fKey="go_pass_date">{dateRangeStr}</EdText></span>

          <div className="go-pass-perks-grid">
            <div className="perk-card">
              <span className="perk-icon">🪙</span>
              <div className="perk-text">
                <strong>Daily PokéCoin Bounty</strong>
                <span>Daily login bonus coins</span>
              </div>
            </div>
            <div className="perk-card">
              <span className="perk-icon">🎟️</span>
              <div className="perk-text">
                <strong>Timed Research Access</strong>
                <span>Exclusive season encounters</span>
              </div>
            </div>
            <div className="perk-card">
              <span className="perk-icon">⚡</span>
              <div className="perk-text">
                <strong>Extra Raid & XP Perks</strong>
                <span>Boosted friendship & raid XP</span>
              </div>
            </div>
            <div className="perk-card">
              <span className="perk-icon">🎁</span>
              <div className="perk-text">
                <strong>Incubator & Item Bundles</strong>
                <span>Weekly delivery of supplies</span>
              </div>
            </div>
          </div>

          <div className="detail-pokemon-center">
            <EdImg fKey="go_pass_img" src={normalUrl} alt={item.name} className="detail-pokemon-img" onError={(e: any) => handlePokemonImageError(e.target as HTMLImageElement, item.name)} />
          </div>
        </div>
      );
    }

    return (
      <div className="single-event-detail">
        <div className="detail-badge-header"><EdText fKey={`single_${key}_badge`}>{currentSlide?.title.toUpperCase() || 'SPECIAL EVENT'}</EdText></div>
        <h3 className="detail-title"><EdText fKey={`single_${key}_title`}>{cleanedName}</EdText></h3>
        <span className="detail-date-pill">
          <EdText fKey={`single_${key}_date`}>{dateRangeStr}</EdText>
          {eventTime && <span className="detail-event-time"> {' • '} <EdText fKey={`single_${key}_time`} inline>{eventTime}</EdText></span>}
        </span>

        <div className="detail-pokemon-center">
          <EdImg fKey={`single_${key}_img`} src={normalUrl} alt={item.name} className="detail-pokemon-img" onError={(e: any) => handlePokemonImageError(e.target as HTMLImageElement, item.name)} />
          {shinyUrl && (
            <div className="shiny-badge-pill">
              <span>✨ Shiny Available</span>
            </div>
          )}
        </div>

        {renderSpotlightBonusSubline(item, `single_${key}`)}
      </div>
    );
  };

  return (
    <div className="month-summary-container-inline">
      <div className="month-summary-controls-wrapper">
        <div className="infographic-toolbar">
          <div className="toolbar-group">
            <button
              type="button"
              className={`month-select-btn ${summaryMode === 'weekly' ? 'active' : ''}`}
              onClick={() => setSummaryMode('weekly')}
            >
              📅 {lang === 'cs' ? 'Týdenní (1 Slide)' : 'Weekly (1 Slide)'}
            </button>
            <button
              type="button"
              className={`month-select-btn ${summaryMode === 'monthly' ? 'active' : ''}`}
              onClick={() => {
                setSummaryMode('monthly');
                setMonthlySlideIndex(0);
              }}
            >
              🗓️ {lang === 'cs' ? 'Měsíční Slidy' : 'Monthly Slides'}
            </button>
          </div>

          <div className="toolbar-group">
            <button
              className={`month-select-btn ${selectedMonthOffset === 0 ? 'active' : ''}`}
              onClick={() => setSelectedMonthOffset(0)}
            >
              {MONTH_NAMES_EN[currentMonthIndex]}
            </button>
            <button
              className={`month-select-btn ${selectedMonthOffset === 1 ? 'active' : ''}`}
              onClick={() => setSelectedMonthOffset(1)}
            >
              ✨ {MONTH_NAMES_EN[nextMonthIndex]}
            </button>
          </div>
        </div>

        {summaryMode === 'weekly' ? (
          <div className="weekly-week-selector">
            <span className="selector-label">
              {lang === 'cs' ? 'Týden:' : 'Week:'}
            </span>
            {[1, 2, 3, 4, 5].map((w) => (
              <button
                key={w}
                type="button"
                className={`month-select-btn ${selectedWeekNum === w ? 'active' : ''}`}
                onClick={() => setSelectedWeekNum(w)}
              >
                W{w}
              </button>
            ))}
          </div>
        ) : (
          slides.length > 1 && (
            <div className="monthly-carousel-controls">
              <button
                type="button"
                className="month-select-btn"
                disabled={monthlySlideIndex === 0}
                onClick={() => setMonthlySlideIndex(prev => Math.max(0, prev - 1))}
              >
                <ArrowLeft size={16} />
              </button>
              <span className="carousel-indicator">
                {currentSlide?.title} ({monthlySlideIndex + 1} / {slides.length})
              </span>
              <button
                type="button"
                className="month-select-btn"
                disabled={monthlySlideIndex === slides.length - 1}
                onClick={() => setMonthlySlideIndex(prev => Math.min(slides.length - 1, prev + 1))}
              >
                <ArrowRight size={16} />
              </button>
            </div>
          )
        )}
      </div>

      {showCaption && generatedCaption && (
        <div className="summary-caption-box">
          <div className="summary-caption-header">
            <span className="caption-label">
              <FileText size={15} />
              {summaryMode === 'weekly' 
                ? (lang === 'cs' ? 'Návrh popisku pro Týdenní příspěvek' : 'Suggested Weekly Post Caption')
                : (lang === 'cs' ? `Návrh popisku pro Měsíční slide (${currentSlide?.title})` : `Suggested Monthly Caption (${currentSlide?.title})`)}
            </span>
            <button 
              type="button" 
              className="copy-caption-btn"
              onClick={() => {
                navigator.clipboard.writeText(generatedCaption);
                setCaptionCopied(true);
                setTimeout(() => setCaptionCopied(false), 2000);
              }}
            >
              {captionCopied ? <Check size={14} className="copied-icon" /> : <Copy size={14} />}
              <span>{captionCopied ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat popisek' : 'Copy Caption')}</span>
            </button>
          </div>
        </div>
      )}

      <div className="month-summary-modal-body">
        <div 
          className={`month-summary-poster aspect-4-5 mode-${summaryMode} theme-${summaryMode === 'monthly' ? currentSlide?.theme : 'weekly'} ${editor.isExporting ? 'is-exporting' : ''}`} 
          ref={posterRef}
        >
          {isAdmin && (
            <EditToolbar isEditing={editor.isEditing} onToggleEdit={() => editor.setIsEditing(!editor.isEditing)} hasOverrides={editor.hasOverrides} onReset={editor.resetAll} lang={lang} />
          )}
          {/* Header */}
          <div className="poster-header">
            <div className="brand-logo"><EdText fKey="brand_logo">POKEMON GO</EdText></div>
            <div className="poster-title-area">
              {summaryMode === 'weekly' ? (
                <>
                  <span className="poster-header-badge"><EdText fKey="header_badge">WEEKLY SUMMARY</EdText></span>
                  <h2><EdText fKey="header_title">{getWeeklyDateRangeString()}</EdText></h2>
                </>
              ) : (
                <>
                  <span className="poster-header-badge"><EdText fKey="header_badge">{currentSlide?.title.toUpperCase()}</EdText></span>
                  <h2><EdText fKey="header_title">{monthName.toUpperCase()}</EdText></h2>
                </>
              )}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="poster-content">
            {summaryMode === 'weekly' ? (
              <div className={`weekly-timeline-grid days-count-${weeklyTimeline.length}`}>
                {weeklyTimeline.map((day, idx) => {
                  const eventTime = formatEventTime(day.event!.start, day.event!.end);
                  return (
                    <div 
                      key={idx} 
                      className={`weekly-day-row ${getEventCategoryClass(day.event!)}`}
                    >
                      <div className="day-info">
                        <span className="day-name"><EdText fKey={`day_${idx}_name`}>{day.dayName.slice(0, 3)}</EdText></span>
                        <span className="day-date"><EdText fKey={`day_${idx}_date`}>{formatDateShort(day.date)}</EdText></span>
                      </div>
                      
                      <div className="event-info">
                        <div className="event-badge-type">
                          <EdText fKey={`day_${idx}_badge`}>{getEventBadgeLabel(day.event!)}</EdText>
                          {eventTime && <span className="event-hours-range"> {' • '} <EdText fKey={`day_${idx}_time`} inline>{eventTime}</EdText></span>}
                        </div>
                        <span className="event-title-text"><EdText fKey={`day_${idx}_event_name`}>{cleanEventName(day.event!.name)}</EdText></span>
                        {renderSpotlightBonusSubline(day.event!, `day_${idx}`)}
                      </div>

                      <div className="event-visual">
                        <EdImg fKey={`day_${idx}_img`} src={getEventVisualSrc(day.event!)} alt={day.event!.name} className="event-visual-icon" onError={(e: any) => handlePokemonImageError(e.target as HTMLImageElement, day.event!.name)} />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              currentSlide ? (
                currentSlide.data.events.length === 1 ? (
                  renderSingleEventDetail(currentSlide.data.events[0], currentSlide.key)
                ) : (
                  <div className="monthly-slide-events">
                    <div className={`slide-list events-count-${Math.min(currentSlide.data.events.length, 6)}`}>
                      {currentSlide.data.events.slice(0, 6).map((item) => {
                        const dateRangeStr = `${formatDateShort(new Date(item.start))} - ${formatDateShort(new Date(item.end))}`;
                        const eventTime = formatEventTime(item.start, item.end);
                        return (
                          <div key={item.eventID} className="monthly-event-card">
                            <div className="card-image-holder">
                              <EdImg fKey={`slide_event_${item.eventID}_img`} src={getEventVisualSrc(item)} alt={item.name} className="card-main-image" onError={(e: any) => handlePokemonImageError(e.target as HTMLImageElement, item.name)} />
                            </div>
                            <div className="card-text-holder">
                              <span className="card-date-badge">
                                <EdText fKey={`slide_event_${item.eventID}_date`}>{dateRangeStr}</EdText>
                                {eventTime && <span className="event-hours-range"> {' • '} <EdText fKey={`slide_event_${item.eventID}_time`} inline>{eventTime}</EdText></span>}
                              </span>
                              <h4 className="card-event-name"><EdText fKey={`slide_event_${item.eventID}_name`}>{cleanEventName(item.name)}</EdText></h4>
                              {renderSpotlightBonusSubline(item, `slide_event_${item.eventID}`)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )
              ) : (
                <div className="poster-empty-state">
                  <Calendar size={32} style={{ color: 'var(--text-muted)', marginBottom: 8 }} />
                  <p>No confirmed events in this category yet.</p>
                </div>
              )
            )}
          </div>

          {/* Footer */}
          <div className="poster-footer">
            <span className="brand-url"><EdText fKey="footer_brand">pogoevents.app</EdText></span>
            <span className="credits"><EdText fKey="footer_credits">Not affiliated with Niantic or Nintendo</EdText></span>
          </div>
        </div>

        {/* Download Action Button */}
        <button className="download-poster-btn" onClick={handleDownload} disabled={downloading}>
          {downloadSuccess ? (
            <>
              <Check size={20} />
              Saved to Downloads!
            </>
          ) : downloading ? (
            <>
              <div className="spinner"></div>
              Exporting 1080x1350 PNG...
            </>
          ) : (
            <>
              <Download size={20} />
              {summaryMode === 'weekly' ? 'Download Weekly Poster (PNG)' : `Download ${currentSlide?.title || 'Slide'} (PNG)`}
            </>
          )}
        </button>

        {/* Social Media Caption Box */}
        {showCaption && (
          <div className="summary-caption-box">
            <div className="summary-caption-header">
              <div className="summary-caption-title">
                <FileText size={16} />
                <span>{lang === 'cs' ? '📝 Popisek pro Instagram / TikTok:' : '📝 IG / TikTok Post Caption:'}</span>
              </div>
              <div className="summary-caption-actions">
                <button
                  type="button"
                  className="caption-btn"
                  onClick={() => setGeneratedCaption(buildCaption())}
                  title={lang === 'cs' ? 'Obnovit výchozí popisek' : 'Reset caption to default'}
                >
                  <RefreshCw size={13} />
                  {lang === 'cs' ? 'Obnovit' : 'Regenerate'}
                </button>
                <button
                  type="button"
                  className={`caption-btn copy-btn ${captionCopied ? 'copied' : ''}`}
                  onClick={() => {
                    navigator.clipboard.writeText(generatedCaption);
                    setCaptionCopied(true);
                    setTimeout(() => setCaptionCopied(false), 2000);
                  }}
                >
                  {captionCopied ? <Check size={13} /> : <Copy size={13} />}
                  {captionCopied
                    ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!')
                    : (lang === 'cs' ? 'Zkopírovat popisek' : 'Copy Caption')}
                </button>
              </div>
            </div>
            <textarea
              rows={8}
              value={generatedCaption}
              onChange={(e) => setGeneratedCaption(e.target.value)}
              className="summary-caption-textarea"
            />
          </div>
        )}
      </div>
    </div>
  );
};
