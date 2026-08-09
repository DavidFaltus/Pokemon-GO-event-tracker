import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { Download, Sparkles, Clock, Calendar, Check, ShieldCheck, Swords, Shield, Trophy, Layers, Zap } from 'lucide-react';
import type { EventData } from './EventCard';
import type { Language } from '../data/translations';
import { resolveImage, handlePokemonImageError, getBasePokemonNames } from '../utils/imageResolver';
import { getPokemonImage } from '../data/specialEvents';
import { getPokemonName } from '../utils/pokemonTranslator';
import { getRegionalInfo } from '../utils/regionalHelper';
import { findRaidCounters } from '../data/raidCounters';
import { TypeBadge } from './EventCard';
import { WeatherIcon } from './CounterItem';
import { pokemonRankings } from '../data/pokemonRankings';
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

// Helper component to display purely the type icon (NO text label like "Fire" or "Fighting")
export const TypeIconOnly: React.FC<{ typeStr: string }> = ({ typeStr }) => {
  const lower = typeStr.toLowerCase();
  let typeClass = 'normal';

  if (lower.includes('ghost')) { typeClass = 'ghost'; }
  else if (lower.includes('dark')) { typeClass = 'dark'; }
  else if (lower.includes('bug')) { typeClass = 'bug'; }
  else if (lower.includes('fire')) { typeClass = 'fire'; }
  else if (lower.includes('ground')) { typeClass = 'ground'; }
  else if (lower.includes('dragon')) { typeClass = 'dragon'; }
  else if (lower.includes('ice')) { typeClass = 'ice'; }
  else if (lower.includes('fairy')) { typeClass = 'fairy'; }
  else if (lower.includes('fighting')) { typeClass = 'fighting'; }
  else if (lower.includes('psychic')) { typeClass = 'psychic'; }
  else if (lower.includes('flying') || lower.includes('fly')) { typeClass = 'flying'; }
  else if (lower.includes('poison')) { typeClass = 'poison'; }
  else if (lower.includes('steel')) { typeClass = 'steel'; }
  else if (lower.includes('water')) { typeClass = 'water'; }
  else if (lower.includes('grass')) { typeClass = 'grass'; }
  else if (lower.includes('rock')) { typeClass = 'rock'; }
  else if (lower.includes('electric')) { typeClass = 'electric'; }
  else if (lower.includes('normal')) { typeClass = 'normal'; }

  return (
    <span className={`type-badge icon-only-badge pogo-type-${typeClass}`} title={typeStr}>
      <img
        src={`https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${typeClass}.svg`}
        alt={typeStr}
        className="type-badge-icon"
      />
    </span>
  );
};

// Helper to find Pokemon types by name for counter type badges
const getPokemonTypesByName = (name: string): string[] => {
  const clean = name.replace(/^(Mega|Shadow|Primal)\s+/i, '').replace(/\s*\([^)]*\)/g, '').trim().toLowerCase();
  const found = pokemonRankings.find(p => p.name.toLowerCase() === clean || p.name.toLowerCase().includes(clean));
  if (found && found.types && found.types.length > 0) return found.types;

  if (name.includes('Gengar') || name.includes('Banette') || name.includes('Giratina') || name.includes('Chandelure') || name.includes('Gholdengo')) return ['Ghost'];
  if (name.includes('Tyranitar') || name.includes('Darkrai') || name.includes('Hydreigon') || name.includes('Weavile') || name.includes('Houndoom') || name.includes('Yveltal')) return ['Dark'];
  if (name.includes('Mewtwo') || name.includes('Alakazam') || name.includes('Gardevoir')) return ['Psychic'];
  if (name.includes('Rayquaza') || name.includes('Garchomp') || name.includes('Salamence') || name.includes('Dragonite')) return ['Dragon'];
  if (name.includes('Charizard') || name.includes('Reshiram') || name.includes('Moltres') || name.includes('Heatran')) return ['Fire'];
  if (name.includes('Kyogre') || name.includes('Swampert') || name.includes('Gyarados')) return ['Water'];
  if (name.includes('Lucario') || name.includes('Conkeldurr') || name.includes('Machamp') || name.includes('Terrakion')) return ['Fighting'];
  return ['Normal'];
};

// Check if all featured bosses share the same primary type & weaknesses (e.g. Uxie, Mesprit, Azelf)
const areBossesSimilar = (bosses: { name: string }[]): boolean => {
  if (bosses.length <= 1) return true;
  const firstTypes = getPokemonTypesByName(bosses[0].name).sort().join(',');
  const firstWeaknesses = (findRaidCounters(bosses[0].name)?.weaknesses || []).sort().join(',');

  return bosses.every(b => {
    const bTypes = getPokemonTypesByName(b.name).sort().join(',');
    const bWeaknesses = (findRaidCounters(b.name)?.weaknesses || []).sort().join(',');
    return bTypes === firstTypes && bWeaknesses === firstWeaknesses;
  });
};

export const RaidInfographic: React.FC<RaidInfographicProps> = ({ event, lang }) => {
  const posterRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState<number>(1); // 1 = Raid Rotation, 2 = Raid Hour, 3 = Top Counters
  const [selectedBossIndex, setSelectedBossIndex] = useState<number>(0);
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Extract Bosses List
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

  // Determine if bosses should be COMBINED (same type/counters e.g. Uxie/Mesprit/Azelf) or SEPARATE (different types e.g. Kyogre/Groudon)
  const isCombined = areBossesSimilar(bossesList);

  // Current active boss or all bosses
  const activeBoss = isCombined ? bossesList[0] : bossesList[selectedBossIndex] || bossesList[0];
  const primaryBossName = activeBoss.name;

  // Retrieve counter data & stats from raidCounters DB
  const countersData = findRaidCounters(primaryBossName);
  const weaknessesList = countersData?.weaknesses || ['Ghost', 'Dark', 'Bug'];
  const minCp = countersData?.minCp || 1669;
  const maxCp = countersData?.maxCp || 1747;
  const minBoostedCp = countersData?.minBoostedCp || 2087;
  const maxBoostedCp = countersData?.maxBoostedCp || 2184;
  const weatherBoostsList = countersData?.weatherBoosts || ['Windy'];

  // Primary Boss Element Types for Title Badges
  const primaryBossTypes = getPokemonTypesByName(primaryBossName);

  // Assemble Top 7 Counters
  const getTopCounters = () => {
    const rawList = [
      ...(countersData?.megaCounters || []),
      ...(countersData?.advancedCounters || []),
      ...(countersData?.budgetCounters || [])
    ];

    const unique = Array.from(new Set(rawList));
    const parsed = unique.map((item) => {
      const match = item.match(/^([^(]+)(?:\(([^)]+)\))?/);
      const name = match ? match[1].trim() : item;
      const move = match && match[2] ? match[2].trim() : '';
      const types = getPokemonTypesByName(name);
      return {
        raw: item,
        name,
        move,
        types,
        image: getPokemonImage(name)
      };
    });

    if (parsed.length >= 7) {
      return parsed.slice(0, 7);
    }

    const weaknessesLower = weaknessesList.map(w => w.toLowerCase().replace(/\s*\(\d+x\)/g, '').trim());

    const rankedCandidates = pokemonRankings
      .filter(p => {
        const fastMatch = weaknessesLower.includes(p.bestFastMove?.type?.toLowerCase() || '');
        const chargedMatch = weaknessesLower.includes(p.bestChargedMove?.type?.toLowerCase() || '');
        const typeMatch = p.types.some(t => weaknessesLower.includes(t.toLowerCase()));
        return fastMatch || chargedMatch || typeMatch;
      })
      .sort((a, b) => (b.pveScore || b.dps || 0) - (a.pveScore || a.dps || 0));

    for (const p of rankedCandidates) {
      if (parsed.length >= 7) break;
      if (!parsed.some(existing => existing.name.toLowerCase() === p.name.toLowerCase())) {
        parsed.push({
          raw: p.name,
          name: p.name,
          move: `${p.bestFastMove?.name || ''} / ${p.bestChargedMove?.name || ''}`,
          types: p.types || ['Normal'],
          image: getPokemonImage(p.name)
        });
      }
    }

    return parsed.slice(0, 7);
  };

  const topCountersList = getTopCounters();

  // Format dates for Slide 1 (Raid Rotation)
  const { dateStr, timeStr } = formatEventDateRange(event.start, event.end, 'en');

  // Exact Raid Hour Date Calculation for Slide 2 (Raid Hour)
  const getRaidHourInfo = () => {
    if ((event.extraData as any)?.raidHourDate) {
      const { dateStr: rhDate, timeStr: rhTime } = formatEventDateRange(
        (event.extraData as any).raidHourDate,
        (event.extraData as any).raidHourEnd || (event.extraData as any).raidHourDate,
        'en'
      );
      return { dateStr: rhDate, timeStr: rhTime || '18:00 - 19:00' };
    }

    if (event.eventType === 'raid-hour') {
      return { dateStr, timeStr: timeStr || '18:00 - 19:00' };
    }

    // For multi-day raid rotation, calculate Wednesday 18:00 - 19:00
    const start = new Date(event.start);
    const end = new Date(event.end);
    let wednesday = new Date(start);
    while (wednesday <= end && wednesday.getDay() !== 3) {
      wednesday.setDate(wednesday.getDate() + 1);
    }
    if (wednesday > end) wednesday = new Date(start);

    const rhFormatted = formatEventDateRange(wednesday.toISOString(), wednesday.toISOString(), 'en').dateStr;
    return { dateStr: rhFormatted, timeStr: '18:00 - 19:00' };
  };

  const raidHourInfo = getRaidHourInfo();

  // Single Slide Download Helper
  const downloadSingleElement = async (slideNumber: number) => {
    if (!posterRef.current) return;
    const originalSrcs: { img: HTMLImageElement; origSrc: string }[] = [];

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
    link.download = `pogo_raid_${primaryBossName.toLowerCase()}_slide${slideNumber}_4x5.png`;
    link.href = dataUrl;
    link.click();

    originalSrcs.forEach(({ img, origSrc }) => {
      img.src = origSrc;
    });
  };

  // Download Current Slide
  const handleDownloadCurrent = async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      await downloadSingleElement(activeSlide);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to generate slide image:", err);
    } finally {
      setDownloading(false);
    }
  };

  // Bulk Download All 3 Slides
  const handleDownloadAll = async () => {
    if (downloading) return;
    setDownloading(true);
    const prevSlide = activeSlide;

    try {
      for (let s = 1; s <= 3; s++) {
        setActiveSlide(s);
        await new Promise(r => setTimeout(r, 250));
        await downloadSingleElement(s);
      }
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error("Failed bulk download:", err);
    } finally {
      setActiveSlide(prevSlide);
      setDownloading(false);
    }
  };

  return (
    <div className="raid-infographic-wrapper">
      {/* Slide Navigation & Boss Selector Toolbar */}
      <div className="raid-carousel-toolbar">
        {!isCombined && bossesList.length > 1 && (
          <div className="boss-switcher-tabs flex-row">
            <span className="boss-switcher-label">Select Pokémon:</span>
            {bossesList.map((b, idx) => (
              <button
                key={idx}
                type="button"
                className={`boss-tab-btn ${selectedBossIndex === idx ? 'active' : ''}`}
                onClick={() => setSelectedBossIndex(idx)}
              >
                {getPokemonName(b.name, 'en')}
              </button>
            ))}
          </div>
        )}

        <div className="slide-tabs flex-row">
          <button
            type="button"
            className={`slide-tab-btn ${activeSlide === 1 ? 'active' : ''}`}
            onClick={() => setActiveSlide(1)}
          >
            1. Raid Rotation
          </button>
          <button
            type="button"
            className={`slide-tab-btn ${activeSlide === 2 ? 'active' : ''}`}
            onClick={() => setActiveSlide(2)}
          >
            2. Raid Hour
          </button>
          <button
            type="button"
            className={`slide-tab-btn ${activeSlide === 3 ? 'active' : ''}`}
            onClick={() => setActiveSlide(3)}
          >
            3. Top Counters
          </button>
        </div>

        <div className="download-actions-flex">
          <button 
            className={`raid-download-btn ${downloadSuccess ? 'success' : ''}`}
            onClick={handleDownloadCurrent}
            disabled={downloading}
          >
            <Download size={15} />
            {downloadSuccess ? 'Saved PNG!' : `Download Infographic ${activeSlide} (4:5)`}
          </button>

          <button 
            className="raid-download-btn bulk"
            onClick={handleDownloadAll}
            disabled={downloading}
          >
            <Layers size={15} />
            Download All 3 Infographics (PNG Package)
          </button>
        </div>
      </div>

      {/* 4:5 Aspect Ratio Poster Element */}
      <div className="raid-poster-container-4x5" ref={posterRef}>
        <div className="raid-poster-glow-top"></div>

        {/* Poster Header (With ICON-ONLY type badges in the main title) */}
        <div className="raid-poster-header">
          <div className="raid-poster-badge">
            <Swords size={14} className="raid-swords-icon" />
            <span>
              {activeSlide === 1 ? 'RAID ROTATION' :
               activeSlide === 2 ? 'RAID HOUR' :
               'TOP COUNTERS'}
            </span>
          </div>

          <h2 className="raid-poster-title flex-title-row">
            <span className="boss-title-text">
              {isCombined && bossesList.length > 1 
                ? bossesList.map(b => getPokemonName(b.name, 'en')).join(' • ')
                : getPokemonName(primaryBossName, 'en')}
            </span>
            <span className="title-type-badges">
              {primaryBossTypes.map((t) => (
                <TypeIconOnly key={t} typeStr={t} />
              ))}
            </span>
          </h2>
          
          {/* Date & Time Bar: Slide 1 = Rotation Date, Slide 2 = Raid Hour Date, Slide 3 = Removed */}
          {activeSlide === 1 && (
            <div className="raid-poster-time-bar">
              <div className="raid-time-item">
                <Calendar size={13} />
                <span>{dateStr}</span>
              </div>
              {timeStr && (
                <>
                  <div className="raid-time-divider">•</div>
                  <div className="raid-time-item">
                    <Clock size={13} />
                    <span>{timeStr}</span>
                  </div>
                </>
              )}
            </div>
          )}

          {activeSlide === 2 && (
            <div className="raid-poster-time-bar">
              <div className="raid-time-item">
                <Calendar size={13} />
                <span>{raidHourInfo.dateStr}</span>
              </div>
              {raidHourInfo.timeStr && (
                <>
                  <div className="raid-time-divider">•</div>
                  <div className="raid-time-item">
                    <Clock size={13} />
                    <span>{raidHourInfo.timeStr}</span>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* SLIDE 1: RAID ROTATION (Displays 2 top, 1 bottom for 3 bosses with names above sprites) */}
        {activeSlide === 1 && (
          <div className="slide-content-block slide1">
            <div className={`slide1-bosses-expanded ${isCombined && bossesList.length === 3 ? 'multi-3-grid' : isCombined && bossesList.length === 2 ? 'multi-2-grid' : ''}`}>
              {(isCombined ? bossesList : [activeBoss]).map((boss, idx) => {
                const count = isCombined ? bossesList.length : 1;
                const spriteClass = count >= 3 ? 'boss-sprite-grid-3' : count === 2 ? 'boss-sprite-combined-2' : 'boss-sprite-giant-max';

                return (
                  <div key={idx} className="slide1-expanded-card">
                    {/* Name ABOVE the sprite pair */}
                    {count > 1 && (
                      <span className="boss-individual-name">
                        {getPokemonName(boss.name, 'en')}
                      </span>
                    )}

                    <div className="sprites-large-pair">
                      <div className="sprite-large-box">
                        <img 
                          src={resolveImage(boss.image, event.eventType, boss.name, false)} 
                          alt={boss.name} 
                          className={spriteClass}
                          onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, boss.name, false)}
                        />
                        <span className="sprite-label">Normal</span>
                      </div>
                      {boss.canBeShiny && (
                        <div className="sprite-large-box">
                          <img 
                            src={resolveImage(boss.image, event.eventType, boss.name, true)} 
                            alt={`${boss.name} Shiny`} 
                            className={`${spriteClass} shiny-glow`}
                            onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, boss.name, true)}
                          />
                          <span className="sprite-label shiny">✨ Shiny</span>
                        </div>
                      )}
                    </div>

                    {(() => {
                      const regInfo = getRegionalInfo(boss.name);
                      if (!regInfo) return null;
                      return (
                        <div className="boss-meta-row">
                          <span className="regional-tag">
                            {regInfo.shortLabel.en || regInfo.shortLabel.cs}
                          </span>
                        </div>
                      );
                    })()}
                  </div>
                );
              })}
            </div>

            {/* Type Weaknesses Centered Box */}
            <div className="slide1-weakness-card centered">
              <div className="weakness-header centered">
                <Zap size={14} style={{ color: '#f87171' }} />
                <span>TYPE WEAKNESSES</span>
              </div>
              <div className="type-badges-row centered">
                {weaknessesList.map((w) => (
                  <TypeBadge key={w} typeStr={w} lang="en" />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 2: RAID HOUR (2 top, 1 bottom for 3 bosses with names above sprites) */}
        {activeSlide === 2 && (
          <div className="slide-content-block slide2">
            <div className="slide2-boss-maximized">
              <div className={`max-sprites-grid ${isCombined && bossesList.length === 3 ? 'multi-3-grid' : isCombined && bossesList.length === 2 ? 'multi-2-grid' : ''}`}>
                {(isCombined ? bossesList : [activeBoss]).map((boss, idx) => {
                  const count = isCombined ? bossesList.length : 1;
                  const spriteClass = count >= 3 ? 'boss-sprite-grid-3' : count === 2 ? 'boss-sprite-combined-2' : 'boss-max-sprite-giant';

                  return (
                    <div key={idx} className="max-sprite-card-item">
                      {count > 1 && (
                        <span className="boss-individual-name">
                          {getPokemonName(boss.name, 'en')}
                        </span>
                      )}
                      <div className="max-sprite-pair-flex">
                        <img
                          src={resolveImage(boss.image, event.eventType, boss.name, false)}
                          alt={boss.name}
                          className={spriteClass}
                          onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, boss.name, false)}
                        />
                        {boss.canBeShiny && (
                          <img
                            src={resolveImage(boss.image, event.eventType, boss.name, true)}
                            alt={`${boss.name} Shiny`}
                            className={`${spriteClass} shiny-glow`}
                            onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, boss.name, true)}
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Unified CP Box */}
            <div className="unified-cp-box">
              <div className="cp-box-title">
                <Shield size={14} />
                <span>ENCOUNTER CP RANGES</span>
              </div>

              <div className="cp-unified-rows">
                <div className="cp-line-item">
                  <span className="cp-line-label">Normal Encounter (Lvl 20):</span>
                  <div className="cp-line-val">
                    CP {minCp.toLocaleString()} – <strong className="gold-hundo-glow">{maxCp.toLocaleString()} CP 👑</strong>
                  </div>
                </div>

                <div className="cp-line-item boost">
                  <span className="cp-line-label boost">Weather Boosted (Lvl 25):</span>
                  <div className="cp-line-val">
                    CP {minBoostedCp.toLocaleString()} – <strong className="gold-hundo-glow">{maxBoostedCp.toLocaleString()} CP 👑</strong>
                  </div>
                </div>

                <div className="cp-line-item weather-row">
                  <span className="cp-line-label">Boosted by:</span>
                  <div className="weather-icons-flex">
                    {weatherBoostsList.map((w, idx) => (
                      <WeatherIcon key={idx} weatherStr={w} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="slide2-shiny-rate-card">
              <Sparkles size={16} style={{ color: '#fbbf24' }} />
              <div>
                <span className="shiny-card-label">CHANCE FOR SHINY ENCOUNTER</span>
                <div className="shiny-card-val">~1 in 20 (5% Shiny Rate) ✨</div>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 3: TOP COUNTERS (Perfect Fit 7-Counter Grid, No Overflow) */}
        {activeSlide === 3 && (
          <div className="slide-content-block slide3">
            <div className="slide3-counters-grid-7">
              {topCountersList.map((counter, idx) => (
                <div key={idx} className={`slide3-counter-card ${idx === 0 ? 'top-1-winner' : ''}`}>
                  {idx === 0 && (
                    <div className="top-1-ribbon">
                      <Trophy size={11} /> TOP 1 COUNTER
                    </div>
                  )}

                  <div className="counter-img-wrapper">
                    <img
                      src={counter.image}
                      alt={counter.name}
                      className="counter-img"
                      onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, counter.name)}
                    />
                  </div>

                  <div className="counter-body">
                    <span className="counter-title">{counter.name}</span>
                    {counter.move && <span className="counter-attack">{counter.move}</span>}
                    <div className="counter-element-badges">
                      {counter.types.map((t) => (
                        <TypeBadge key={t} typeStr={t} lang="en" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Poster Footer */}
        <div className="raid-poster-footer">
          <div className="raid-footer-left">
            <ShieldCheck size={14} className="raid-shield-icon" />
            <span>pogoevents.app</span>
          </div>
          <span>Pokémon GO Event Tracker</span>
        </div>
      </div>
    </div>
  );
};
