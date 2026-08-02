import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { Download, Sparkles, Clock, Calendar, Zap, Check, ShieldCheck, Flame } from 'lucide-react';
import type { EventData } from './EventCard';
import type { Language } from '../data/translations';
import { resolveImage, handlePokemonImageError } from '../utils/imageResolver';
import { getSpecialEventDetails, getPokemonImage } from '../data/specialEvents';
import { findPokemonMeta } from '../data/pokemonMeta';
import { getPokemonName } from '../utils/pokemonTranslator';
import { API_BASE_URL } from '../config';
import './CommunityDayInfographic.css';

interface CommunityDayInfographicProps {
  event: EventData;
  lang: Language;
  timezone?: string;
}

// Vector SVG Pokémon GO Bonus Icons
const BonusIcon: React.FC<{ type: string; color: string }> = ({ type, color }) => {
  switch (type) {
    case 'stardust':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
          <path d="M12 2L14.4 8.6L21 9.6L16.2 14.3L17.3 21L12 17.8L6.7 21L7.8 14.3L3 9.6L9.6 8.6L12 2Z" fill="#f39c12" stroke="#f1c40f" strokeWidth="1"/>
          <circle cx="6" cy="5" r="1.5" fill="#f1c40f" />
          <circle cx="18" cy="5" r="1.5" fill="#f1c40f" />
          <circle cx="19" cy="18" r="1" fill="#f1c40f" />
        </svg>
      );
    case 'candy':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
          <circle cx="12" cy="12" r="7" fill="#e67e22" stroke="#d35400" strokeWidth="1.5" />
          <path d="M12 5C8.1 5 5 8.1 5 12" stroke="#f39c12" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M4 4L7 7M20 20L17 17M20 4L17 7M4 20L7 17" stroke="#e67e22" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    case 'xlcandy':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
          <path d="M12 2L16 6L12 10L8 6L12 2Z" fill="#9b59b6" />
          <circle cx="12" cy="14" r="6" fill="#8e44ad" stroke="#9b59b6" strokeWidth="1.5"/>
          <path d="M12 9C9.2 9 7 11.2 7 14" stroke="#d6a2e8" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );
    case 'lure':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
          <rect x="4" y="6" width="16" height="12" rx="3" fill="#3498db" stroke="#2980b9" strokeWidth="1.5"/>
          <path d="M8 10H16M8 14H13" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="17" cy="14" r="1.5" fill="#f1c40f"/>
        </svg>
      );
    case 'incense':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
          <ellipse cx="12" cy="16" rx="8" ry="5" fill="#1abc9c" stroke="#16a085" strokeWidth="1.5"/>
          <ellipse cx="12" cy="14" rx="4" ry="2" fill="#a3e4d7"/>
          <path d="M10 10C10 8 11 7 11 5M14 10C14 8 13 7 13 5" stroke="#1abc9c" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );
    case 'photobomb':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
          <path d="M4 8C4 6.9 4.9 6 6 6H8L9.5 4H14.5L16 6H18C19.1 6 20 6.9 20 8V17C20 18.1 19.1 19 18 19H6C4.9 19 4 18.1 4 17V8Z" fill="#e74c3c" stroke="#c0392b" strokeWidth="1.5"/>
          <circle cx="12" cy="12.5" r="3.5" fill="#ffffff" stroke="#c0392b" strokeWidth="1.5"/>
          <circle cx="17" cy="9" r="1" fill="#f1c40f"/>
        </svg>
      );
    case 'trade':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
          <path d="M7 10L4 7L7 4M4 7H16C18.2 7 20 8.8 20 11" stroke="#2ecc71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17 14L20 17L17 20M20 17H8C5.8 17 4 15.2 4 13" stroke="#2ecc71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'discount':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
          <path d="M12 2L14.4 8.6L21 9.6L16.2 14.3L17.3 21L12 17.8L6.7 21L7.8 14.3L3 9.6L9.6 8.6L12 2Z" fill="#f1c40f"/>
          <path d="M9 15L15 9M9.5 9.5H9.51M14.5 14.5H14.51" stroke="#0d1117" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    default:
      return <span>🎁</span>;
  }
};

// Converts image URL to Base64 Data URL via Express backend proxy to bypass browser CORS restrictions
const fetchImageAsBase64 = async (url: string): Promise<string> => {
  if (!url || url.startsWith('data:')) return url;
  try {
    const proxyUrl = `${API_BASE_URL}/api/proxy-image?url=${encodeURIComponent(url)}`;
    const res = await fetch(proxyUrl);
    if (!res.ok) return url;
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve((reader.result as string) || url);
      reader.onerror = () => resolve(url);
      reader.readAsDataURL(blob);
    });
  } catch {
    return url;
  }
};

export const CommunityDayInfographic: React.FC<CommunityDayInfographicProps> = ({ event, lang }) => {
  const posterRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Extract featured Pokemon & details
  const eventName = event.name;

  let featuredPokemon = "Featured Pokémon";
  const cdMatch = eventName.match(/([A-Za-z-'\s]+?)\s+(?:Community\s+Day|Classic)/i);
  if (cdMatch) {
    featuredPokemon = cdMatch[1].trim();
  } else {
    featuredPokemon = eventName.replace(/community\s*day/gi, "").replace(/classic/gi, "").trim();
  }

  const cdData = event.extraData?.communityday;
  const staticDetails = getSpecialEventDetails(event.eventID, event.name);
  const meta = findPokemonMeta(featuredPokemon);

  const mainPokemonName = cdData?.spawns?.[0]?.name || featuredPokemon;
  const pokemonImg = cdData?.spawns?.[0]?.image || getPokemonImage(mainPokemonName);
  const finalEvolution = meta ? meta.evolution : mainPokemonName;

  // Extract special move
  let specialMove = "";
  if (staticDetails?.bonuses) {
    const moveBonus = staticDetails.bonuses.find((b: any) => b.icon === '⚔️');
    if (moveBonus) {
      const text = typeof moveBonus.text === 'object' ? moveBonus.text[lang] || moveBonus.text.en : moveBonus.text;
      const match = text.match(/(?:exkluzivní útok|featured move):\s*([^\.]+)/i) || text.match(/útok:\s*([^\.]+)/i);
      if (match) {
        specialMove = match[1].trim();
      } else {
        specialMove = text;
      }
    }
  }

  // Format dates & times
  const startDate = new Date(event.start);
  const endDate = new Date(event.end);

  const dateStr = startDate.toLocaleDateString(lang === 'cs' ? 'cs-CZ' : lang === 'ja' ? 'ja-JP' : 'en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const timeStr = `${startDate.toLocaleTimeString(lang === 'cs' ? 'cs-CZ' : 'en-US', { hour: '2-digit', minute: '2-digit' })} - ${endDate.toLocaleTimeString(lang === 'cs' ? 'cs-CZ' : 'en-US', { hour: '2-digit', minute: '2-digit' })}`;

  // Bonuses list with authentic vector icons
  const bonusItems = [
    {
      type: "stardust",
      title: lang === 'cs' ? "3× Stardust" : "3× Catch Stardust",
      subtitle: lang === 'cs' ? "za chycení Pokémona" : "per caught Pokémon",
      color: "#f39c12"
    },
    {
      type: "candy",
      title: lang === 'cs' ? "2× Candy" : "2× Catch Candy",
      subtitle: lang === 'cs' ? "za chycení Pokémona" : "per caught Pokémon",
      color: "#e67e22"
    },
    {
      type: "xlcandy",
      title: lang === 'cs' ? "2× XL Candy" : "2× XL Candy Chance",
      subtitle: lang === 'cs' ? "šance pro Trénery od Lvl 31+" : "for Trainers Lvl 31+",
      color: "#9b59b6"
    },
    {
      type: "lure",
      title: lang === 'cs' ? "3h Lure Moduly" : "3h Lure Modules",
      subtitle: lang === 'cs' ? "aktivní během eventu" : "active during event",
      color: "#3498db"
    },
    {
      type: "incense",
      title: lang === 'cs' ? "3h Incense" : "3h Incense",
      subtitle: lang === 'cs' ? "aktivní během eventu" : "active during event",
      color: "#1abc9c"
    },
    {
      type: "photobomb",
      title: lang === 'cs' ? "5× Photobomb" : "5× Photobombs",
      subtitle: lang === 'cs' ? "překvapení z fotky" : "snapshot encounters",
      color: "#e74c3c"
    },
    {
      type: "trade",
      title: lang === 'cs' ? "2× Special Trade" : "2× Special Trades",
      subtitle: lang === 'cs' ? "1 dodatečný trade/den" : "1 extra trade per day",
      color: "#2ecc71"
    },
    {
      type: "discount",
      title: lang === 'cs' ? "-50% Stardust Trade" : "50% Stardust Discount",
      subtitle: lang === 'cs' ? "sleva na tradování" : "for all trades",
      color: "#f1c40f"
    }
  ];

  // Download handler: Pre-converts all img elements to Base64 to ensure 100% reliable image rendering
  const handleDownload = async () => {
    if (!posterRef.current || downloading) return;
    setDownloading(true);

    const originalSrcs: { img: HTMLImageElement; origSrc: string }[] = [];

    try {
      const imgs = Array.from(posterRef.current.querySelectorAll('img'));

      // Convert all images to Base64 in parallel
      await Promise.all(
        imgs.map(async (img) => {
          const origSrc = img.src;
          if (origSrc && !origSrc.startsWith('data:')) {
            originalSrcs.push({ img, origSrc });
            try {
              const base64 = await fetchImageAsBase64(origSrc);
              if (base64 && base64.startsWith('data:')) {
                img.src = base64;
              }
            } catch (e) {
              /* ignore and keep original */
            }
          }
        })
      );

      const dataUrl = await toPng(posterRef.current, { 
        cacheBust: false,
        skipFonts: true,
        pixelRatio: 2,
        backgroundColor: '#0d1117'
      });

      const link = document.createElement('a');
      link.download = `pogo_infographic_${mainPokemonName.toLowerCase()}_cd.png`;
      link.href = dataUrl;
      link.click();

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to generate infographic image:", err);
    } finally {
      // Restore original src attributes
      originalSrcs.forEach(({ img, origSrc }) => {
        img.src = origSrc;
      });
      setDownloading(false);
    }
  };

  return (
    <div className="cd-infographic-wrapper">
      {/* Top Action Bar */}
      <div className="cd-infographic-actions">
        <button 
          className={`cd-download-btn ${downloadSuccess ? 'success' : ''}`}
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

      {/* Main Infographic Poster (Canvas Target) */}
      <div className="cd-poster-container" ref={posterRef}>
        {/* Background Decorative Glows */}
        <div className="cd-poster-glow-top"></div>
        <div className="cd-poster-glow-bottom"></div>

        {/* Header Section */}
        <div className="cd-poster-header">
          <div className="cd-poster-badge">
            <Sparkles size={14} className="cd-sparkle-icon" />
            <span>COMMUNITY DAY</span>
          </div>
          <h2 className="cd-poster-title">{eventName}</h2>
          
          <div className="cd-poster-time-bar">
            <div className="cd-time-item">
              <Calendar size={15} />
              <span>{dateStr}</span>
            </div>
            <div className="cd-time-divider">•</div>
            <div className="cd-time-item">
              <Clock size={15} />
              <span>{timeStr}</span>
            </div>
          </div>
        </div>

        {/* Featured Pokemon Showcase */}
        <div className="cd-poster-showcase">
          <div className="cd-showcase-left">
            <div className="cd-featured-label">{lang === 'cs' ? 'HLAVNÍ POKÉMON' : 'FEATURED POKÉMON'}</div>
            <h3 className="cd-pokemon-title">{getPokemonName(mainPokemonName, lang)}</h3>
            
            <div className="cd-shiny-rate-chip">
              <Sparkles size={13} />
              <span>Shiny Rate ~1 : 25</span>
            </div>

            {/* Featured Special Attack */}
            <div className="cd-attack-box">
              <div className="cd-attack-header">
                <Flame size={14} />
                <span>{lang === 'cs' ? 'EXKLUZIVNÍ ÚTOK (EVOLUCE)' : 'EXCLUSIVE FEATURED MOVE'}</span>
              </div>
              <div className="cd-attack-name">
                {specialMove || (lang === 'cs' ? `Vyviňte na ${finalEvolution}` : `Evolve into ${finalEvolution}`)}
              </div>
              <div className="cd-attack-note">
                {lang === 'cs' ? `Během eventu + 5h po skončení` : `During event + up to 5 hours after`}
              </div>
            </div>
          </div>

          <div className="cd-showcase-right">
            <div className="cd-image-halo"></div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', zIndex: 2, position: 'relative' }}>
              <img 
                src={resolveImage(pokemonImg, event.eventType, mainPokemonName, false)} 
                alt={mainPokemonName} 
                className="cd-featured-img"
                onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, mainPokemonName, false)}
              />
              <img 
                src={resolveImage(pokemonImg, event.eventType, mainPokemonName, true)} 
                alt={`${mainPokemonName} Shiny`} 
                className="cd-featured-img shiny-sprite"
                style={{ filter: 'drop-shadow(0 0 12px rgba(251, 191, 36, 0.65))' }}
                onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, mainPokemonName, true)}
              />
            </div>
          </div>
        </div>

        {/* Shiny Evolutionary Family Row */}
        {cdData?.shinies && cdData.shinies.length > 0 && (
          <div className="cd-shiny-family-card">
            <div className="cd-card-section-title">
              <Sparkles size={15} />
              <span>{lang === 'cs' ? 'SHINY PREVIEW & EVOLUCE' : 'SHINY PREVIEW & EVOLUTIONS'}</span>
            </div>
            <div className="cd-shiny-grid">
              {cdData.shinies.map((s: any) => (
                <div key={s.name} className="cd-shiny-item">
                  <div className="cd-shiny-sprite-container">
                    <div className="cd-shiny-sparkle-overlay">✨</div>
                    <img 
                      src={resolveImage(s.image, event.eventType, s.name)} 
                      alt={getPokemonName(s.name, lang)}
                      onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, s.name)}
                    />
                  </div>
                  <span className="cd-shiny-name">{getPokemonName(s.name, lang)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Event Bonuses Grid */}
        <div className="cd-bonuses-container">
          <div className="cd-card-section-title">
            <Zap size={15} />
            <span>{lang === 'cs' ? 'BONUSY EVENTU' : 'EVENT BONUSES'}</span>
          </div>
          
          <div className="cd-bonuses-grid">
            {bonusItems.map((item, idx) => (
              <div key={idx} className="cd-bonus-tile">
                <div className="cd-bonus-tile-icon" style={{ borderColor: item.color, backgroundColor: `${item.color}15` }}>
                  <BonusIcon type={item.type} color={item.color} />
                </div>
                <div className="cd-bonus-tile-info">
                  <div className="cd-bonus-tile-title">{item.title}</div>
                  <div className="cd-bonus-tile-subtitle">{item.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Poster Footer Branding */}
        <div className="cd-poster-footer">
          <div className="cd-footer-left">
            <ShieldCheck size={16} className="cd-shield-icon" />
            <span>pogoevents.app</span>
          </div>
          <div className="cd-footer-right">
          </div>
        </div>
      </div>
    </div>
  );
};
