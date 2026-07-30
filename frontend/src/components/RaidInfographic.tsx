import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { Download, Sparkles, Clock, Calendar, Zap, Check, ShieldCheck, Swords, Shield, CloudRain } from 'lucide-react';
import type { EventData } from './EventCard';
import type { Language } from '../data/translations';
import { resolveImage, handlePokemonImageError } from '../utils/imageResolver';
import { getPokemonImage } from '../data/specialEvents';
import { findPokemonMeta } from '../data/pokemonMeta';
import { getPokemonName } from '../utils/pokemonTranslator';
import { API_BASE_URL } from '../config';
import './RaidInfographic.css';

interface RaidInfographicProps {
  event: EventData;
  lang: Language;
  timezone?: string;
}

// Converts image URL to Base64 Data URL via Express backend proxy
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

export const RaidInfographic: React.FC<RaidInfographicProps> = ({ event, lang }) => {
  const posterRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Extract Boss Name & details
  const raidData = event.extraData?.raidbattles;
  const mainBoss = raidData?.bosses?.[0];
  
  let bossName = mainBoss?.name || "";
  if (!bossName) {
    const match = event.name.match(/([A-Za-z-'\s]+?)\s+(?:in\s+5-Star\s+Raids|in\s+Raid\s+Hours|Raid\s+Hour|Raid\s+Day)/i);
    if (match) {
      bossName = match[1].trim();
    } else {
      bossName = event.name.replace(/raid\s*(hour|battles|rotation|day)/gi, "").trim();
    }
  }

  const pokemonImg = mainBoss?.image || getPokemonImage(bossName);
  const canBeShiny = mainBoss?.canBeShiny ?? true;

  const meta = findPokemonMeta(bossName);

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

  // Download handler
  const handleDownload = async () => {
    if (!posterRef.current || downloading) return;
    setDownloading(true);

    const originalSrcs: { img: HTMLImageElement; origSrc: string }[] = [];

    try {
      const imgs = Array.from(posterRef.current.querySelectorAll('img'));

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
            } catch (e) {}
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
      link.download = `pogo_raid_${bossName.toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to generate raid image:", err);
    } finally {
      originalSrcs.forEach(({ img, origSrc }) => {
        img.src = origSrc;
      });
      setDownloading(false);
    }
  };

  return (
    <div className="raid-infographic-wrapper">
      <div className="raid-infographic-actions">
        <button 
          className={`raid-download-btn ${downloadSuccess ? 'success' : ''}`}
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

      <div className="raid-poster-container" ref={posterRef}>
        <div className="raid-poster-glow-top"></div>

        {/* Header */}
        <div className="raid-poster-header">
          <div className="raid-poster-badge">
            <Swords size={14} className="raid-swords-icon" />
            <span>{event.eventType === 'raid-hour' ? 'RAID HOUR (5★)' : 'RAID BATTLES'}</span>
          </div>
          <h2 className="raid-poster-title">{getPokemonName(bossName, lang)}</h2>
          
          <div className="raid-poster-time-bar">
            <div className="raid-time-item">
              <Calendar size={15} />
              <span>{dateStr}</span>
            </div>
            <div className="raid-time-divider">•</div>
            <div className="raid-time-item">
              <Clock size={15} />
              <span>{timeStr}</span>
            </div>
          </div>
        </div>

        {/* Main Section */}
        <div className="raid-poster-main">
          {/* Featured Raid Boss Showcase */}
          <div className="raid-poke-card">
            <div className="raid-image-halo"></div>
            <img 
              src={resolveImage(pokemonImg, event.eventType, bossName)} 
              alt={bossName} 
              className="raid-poke-img"
              onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, bossName)}
            />
            <h3 className="raid-poke-name">{getPokemonName(bossName, lang)}</h3>
            
            {canBeShiny && (
              <div className="raid-shiny-chip">
                <Sparkles size={13} />
                <span>✨ Shiny Rate ~1 : 20</span>
              </div>
            )}
          </div>

          {/* 100% IV & Catch CP Box */}
          <div className="raid-cp-box">
            <div className="raid-cp-header">
              <Shield size={16} />
              <span>{lang === 'cs' ? '100% IV CATCH CP ROZSAH' : '100% IV CATCH CP RANGE'}</span>
            </div>

            <div className="raid-cp-row">
              <div className="raid-cp-item">
                <span className="raid-cp-label">Lvl 20 (Normal):</span>
                <span className="raid-cp-val">CP 2,250 - 2,350</span>
              </div>
              <div className="raid-cp-item boost">
                <div className="raid-cp-label-boost">
                  <CloudRain size={14} />
                  <span>Lvl 25 (Weather Boost):</span>
                </div>
                <span className="raid-cp-val boost">CP 2,812 - 2,937</span>
              </div>
            </div>

            {meta && (
              <div className="raid-moves-box">
                <span className="raid-moves-title">{lang === 'cs' ? 'Nejlepší PvP/PvE útoky:' : 'Best Moveset:'}</span>
                <span className="raid-moves-code">{meta.bestFastMove} + {meta.bestChargedMove}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="raid-poster-footer">
          <div className="raid-footer-left">
            <ShieldCheck size={16} className="raid-shield-icon" />
            <span>pogoevents.app</span>
          </div>
        </div>
      </div>
    </div>
  );
};
