import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { Download, Sparkles, Clock, Calendar, Check, ShieldCheck, Swords, Shield, CloudRain } from 'lucide-react';
import type { EventData } from './EventCard';
import type { Language } from '../data/translations';
import { resolveImage, handlePokemonImageError, getBasePokemonNames } from '../utils/imageResolver';
import { getPokemonImage } from '../data/specialEvents';
import { getPokemonName } from '../utils/pokemonTranslator';
import { API_BASE_URL } from '../config';
import { formatEventDateRange } from './MaxInfographic';
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

  // Extract Bosses List (handles single and multiple bosses like Uxie, Mesprit, Azelf)
  const raidData = event.extraData?.raidbattles;
  const bossesList: { name: string; image: string; canBeShiny?: boolean }[] = [];
  const nameSet = new Set<string>();

  if (raidData?.bosses && raidData.bosses.length > 0) {
    raidData.bosses.forEach((b: any) => {
      const bName = typeof b === 'string' ? b : b.name;
      if (bName && !nameSet.has(bName.toLowerCase())) {
        nameSet.add(bName.toLowerCase());
        bossesList.push({
          name: bName,
          image: (typeof b === 'object' && b.image) ? b.image : getPokemonImage(bName),
          canBeShiny: typeof b === 'object' ? b.canBeShiny : true
        });
      }
    });
  }

  if (bossesList.length === 0) {
    const knownNames = getBasePokemonNames();
    const eventNameLower = event.name.toLowerCase();
    knownNames.forEach(n => {
      if (eventNameLower.includes(n.toLowerCase()) && !nameSet.has(n.toLowerCase())) {
        nameSet.add(n.toLowerCase());
        bossesList.push({
          name: n,
          image: getPokemonImage(n),
          canBeShiny: true
        });
      }
    });
  }

  if (bossesList.length === 0) {
    let fallbackName = event.name.replace(/raid\s*(hour|battles|rotation|day)/gi, "").trim() || "Raid Boss";
    bossesList.push({
      name: fallbackName,
      image: getPokemonImage(fallbackName),
      canBeShiny: true
    });
  }

  const primaryBossName = bossesList[0].name;

  // Format dates & times cleanly supporting multi-day raid rotations
  const { dateStr, timeStr, isMultiDay } = formatEventDateRange(event.start, event.end, lang);

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
      link.download = `pogo_raid_${primaryBossName.toLowerCase()}.png`;
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
            <span>{event.eventType === 'raid-hour' ? 'RAID HOUR (5★)' : 'RAID BATTLES ROTATION'}</span>
          </div>
          <h2 className="raid-poster-title">
            {bossesList.length > 1 
              ? bossesList.map(b => getPokemonName(b.name, lang)).join(' • ')
              : getPokemonName(primaryBossName, lang)}
          </h2>
          
          <div className="raid-poster-time-bar">
            <div className="raid-time-item">
              <Calendar size={15} />
              <span>{dateStr}</span>
            </div>
            {!isMultiDay && timeStr && (
              <>
                <div className="raid-time-divider">•</div>
                <div className="raid-time-item">
                  <Clock size={15} />
                  <span>{timeStr}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Main Section */}
        <div className="raid-poster-main">
          {/* Featured Raid Bosses Showcase (Supports 1 or Multiple Bosses like Uxie, Mesprit, Azelf) */}
          <div className={`raid-poke-card ${bossesList.length > 1 ? 'multi-boss' : ''}`}>
            {bossesList.length > 1 ? (
              <div className="raid-multi-boss-grid">
                {bossesList.map((boss, idx) => (
                  <div key={idx} className="raid-multi-boss-item">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <img 
                        src={resolveImage(boss.image, event.eventType, boss.name, false)} 
                        alt={boss.name} 
                        className="raid-multi-boss-img"
                        onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, boss.name, false)}
                      />
                      {boss.canBeShiny && (
                        <img 
                          src={resolveImage(boss.image, event.eventType, boss.name, true)} 
                          alt={`${boss.name} Shiny`} 
                          className="raid-multi-boss-img shiny-sprite"
                          title="Shiny Form"
                          onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, boss.name, true)}
                        />
                      )}
                    </div>
                    <span className="raid-multi-boss-name">{getPokemonName(boss.name, lang)}</span>
                    {boss.canBeShiny && (
                      <span className="raid-multi-shiny-tag">✨ Shiny</span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="raid-image-halo"></div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', zIndex: 2, position: 'relative' }}>
                  <img 
                    src={resolveImage(bossesList[0].image, event.eventType, primaryBossName, false)} 
                    alt={primaryBossName} 
                    className="raid-poke-img"
                    onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, primaryBossName, false)}
                  />
                  {bossesList[0].canBeShiny && (
                    <img 
                      src={resolveImage(bossesList[0].image, event.eventType, primaryBossName, true)} 
                      alt={`${primaryBossName} Shiny`} 
                      className="raid-poke-img shiny-sprite"
                      style={{ filter: 'drop-shadow(0 0 12px rgba(251, 191, 36, 0.6))' }}
                      onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, primaryBossName, true)}
                    />
                  )}
                </div>
                <h3 className="raid-poke-name">{getPokemonName(primaryBossName, lang)}</h3>
                {bossesList[0].canBeShiny && (
                  <div className="raid-shiny-chip">
                    <Sparkles size={13} />
                    <span>✨ Shiny Rate ~1 : 20</span>
                  </div>
                )}
              </>
            )}
          </div>

          {/* 100% IV & Catch CP Box */}
          <div className="raid-cp-box">
            <div className="raid-cp-header">
              <Shield size={16} />
              <span>{lang === 'cs' ? 'CP ROZSAH' : 'CP RANGE'}</span>
            </div>

            <div className="raid-cp-row">
              <div className="raid-cp-item">
                <span className="raid-cp-label">Lvl 20 (Normal):</span>
                <span className="raid-cp-val">CP 2,250 – <strong className="gold-hundo-text">2,350</strong></span>
              </div>
              <div className="raid-cp-item boost">
                <div className="raid-cp-label-boost">
                  <CloudRain size={14} />
                  <span>Lvl 25 (Weather Boost):</span>
                </div>
                <span className="raid-cp-val boost">CP 2,812 – <strong className="gold-hundo-text">2,937</strong></span>
              </div>
            </div>
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
