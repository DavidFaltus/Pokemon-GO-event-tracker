'use client';

import React, { useState, useEffect } from 'react';
import './DittoEggsView.css';
import { translations } from '../data/translations';
import type { Language } from '../data/translations';
import { dittoDisguises, eggPools, type EggPool } from '../data/dittoEggs';
import { resolveImage, handlePokemonImageError } from '../utils/imageResolver';
import { TypeBadge } from './EventCard';
import { Sparkles } from 'lucide-react';
import { getPokemonName } from '../utils/pokemonTranslator';
import { API_BASE_URL } from '../config';

interface DittoEggsViewProps {
  lang: Language;
  mode: 'ditto' | 'eggs';
}

function getEggColor(distance: string): string {
  const d = distance.toLowerCase();
  if (d.startsWith('2')) return '#4ade80';
  if (d.startsWith('5') && !d.includes('adventure')) return '#facc15';
  if (d.includes('adventure')) return '#eab308';
  if (d.startsWith('7')) return '#f472b6';
  if (d.startsWith('10')) return '#c084fc';
  if (d.startsWith('12')) return '#ef4444';
  return '#38bdf8';
}

// Egg icon matching Pokemon GO design
export const EggIcon = ({ size = 24, color = '#4ade80' }: { size?: number; color?: string }) => (
  <svg viewBox="0 0 100 120" width={size} height={size} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M50 10 C20 10, 10 60, 10 85 C10 105, 30 115, 50 115 C70 115, 90 105, 90 85 C90 60, 80 10, 50 10 Z" fill={color} stroke="#1f2937" strokeWidth="4"/>
    {/* Spots on egg */}
    <ellipse cx="35" cy="50" rx="8" ry="12" fill="white" opacity="0.6" transform="rotate(-15 35 50)"/>
    <ellipse cx="65" cy="45" rx="7" ry="10" fill="white" opacity="0.6" transform="rotate(15 65 45)"/>
    <ellipse cx="45" cy="85" rx="9" ry="14" fill="white" opacity="0.6" transform="rotate(5 45 85)"/>
    <ellipse cx="25" cy="75" rx="6" ry="8" fill="white" opacity="0.6" transform="rotate(-30 25 75)"/>
    <ellipse cx="75" cy="75" rx="6" ry="8" fill="white" opacity="0.6" transform="rotate(30 75 75)"/>
  </svg>
);

export const DittoEggsView: React.FC<DittoEggsViewProps> = ({ lang, mode }) => {
  const t = translations[lang];
  const [pools, setPools] = useState<EggPool[]>(eggPools);
  const [selectedEgg, setSelectedEgg] = useState<string>("2 km");

  useEffect(() => {
    if (mode !== 'eggs') return;
    fetch(`${API_BASE_URL}/api/eggs`)
      .then(res => res.json())
      .then((data: any[]) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped: EggPool[] = data.map(group => ({
            distance: group.distance,
            color: getEggColor(group.distance),
            contents: (group.eggs || []).map((e: any) => ({
              name: e.name,
              image: e.image,
              isShinyAvailable: Boolean(e.canBeShiny),
              rarityTier: e.rarity || 1,
              cpMax: e.maxCp
            }))
          }));
          setPools(mapped);
        }
      })
      .catch(() => {});
  }, [mode]);

  return (
    <div className="ditto-eggs-view-container">
      {mode === 'ditto' ? (
        <div className="ditto-section">
          <header className="ditto-header-card guides-header">
            <div className="guides-title-badge">
              <Sparkles size={16} />
              {lang === 'cs' ? 'Ditto Přestrojení' : lang === 'ja' ? 'メタモンへんしんポケモン' : lang === 'ru' ? 'Маскировки Дитто' : 'Ditto Disguises'}
            </div>
            <h1>{t.ditto_disguises_title}</h1>
            <p>{t.ditto_disguises_desc}</p>
          </header>

          <div className="ditto-disguises-grid">
            {dittoDisguises.map(poke => (
              <div key={poke.name} className="disguise-card">
                <div className="disguise-img-container">
                  <img 
                    src={resolveImage(poke.image, 'ditto', poke.name)} 
                    alt={getPokemonName(poke.name, lang)} 
                    className="disguise-pokemon-img"
                    onError={(e) => {
                      handlePokemonImageError(e.target as HTMLImageElement, poke.name);
                    }}
                  />
                  {poke.isShiny && (
                    <span className="shiny-badge-absolute" title="Shiny available">
                      <Sparkles size={14} fill="currentColor" stroke="none" style={{ color: '#fbbf24' }} />
                    </span>
                  )}
                </div>
                <div className="disguise-info">
                  <span className="disguise-name">{getPokemonName(poke.name, lang)}</span>
                  <div className="disguise-types">
                    {poke.types.map(type => (
                      <TypeBadge key={type} typeStr={type} lang={lang} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="eggs-section">
          <header className="eggs-header-card guides-header">
            <div className="guides-title-badge">
              <Sparkles size={16} />
              {lang === 'cs' ? 'Aktuální Líhnutí Vajec' : lang === 'ja' ? 'タマゴ孵化ポケモン一覧' : lang === 'ru' ? 'Пул покемонов из яиц' : 'Egg Hatching Pools'}
            </div>
            <h1>{t.eggs_pool_title}</h1>
            <p>{t.eggs_pool_desc}</p>

            {/* Egg Tiers Selector */}
            <div className="egg-tiers-selector" style={{ marginTop: '8px' }}>
              {pools.map(pool => (
                <button
                  key={pool.distance}
                  className={`egg-tier-btn ${selectedEgg === pool.distance ? 'active' : ''}`}
                  onClick={() => setSelectedEgg(pool.distance)}
                  style={{ 
                    borderColor: selectedEgg === pool.distance ? pool.color : 'transparent',
                    boxShadow: selectedEgg === pool.distance ? `0 0 12px ${pool.color}40` : 'none'
                  }}
                >
                  <EggIcon size={36} color={pool.color} />
                  <span className="egg-tier-label">{pool.distance}</span>
                </button>
              ))}
            </div>
          </header>

          {/* Selected Egg content */}
          {(() => {
            const currentPool = pools.find(p => p.distance === selectedEgg) || pools[0];
            if (!currentPool) return null;
            return (
              <div className="egg-pool-details-card">
                <div className="egg-pool-details-header" style={{ borderLeftColor: currentPool.color }}>
                  <EggIcon size={48} color={currentPool.color} />
                  <div>
                    <h3>{currentPool.distance} {t.eggs_pool_title}</h3>
                    <span className="hatch-count-pill">
                      {lang === 'ja' ? `${currentPool.contents.length} 種類のポケモン` : `${currentPool.contents.length} Pokémon`}
                    </span>
                  </div>
                </div>

                <div className="egg-hatches-grid">
                  {currentPool.contents.map(pokemon => (
                    <div key={pokemon.name} className="egg-hatch-card">
                      <div className="hatch-img-container">
                        <img 
                          src={resolveImage(pokemon.image, 'egg-hatch', pokemon.name)} 
                          alt={getPokemonName(pokemon.name, lang)} 
                          className="hatch-pokemon-img"
                          onError={(e) => {
                            handlePokemonImageError(e.target as HTMLImageElement, pokemon.name);
                          }}
                        />
                        {pokemon.isShinyAvailable && (
                          <span className="shiny-badge-absolute" title="Shiny available">
                            <Sparkles size={14} fill="currentColor" stroke="none" style={{ color: '#fbbf24' }} />
                          </span>
                        )}
                      </div>
                      <div className="hatch-info">
                        <span className="hatch-name">{getPokemonName(pokemon.name, lang)}</span>
                        {pokemon.cpMax && (
                          <span className="hatch-cp">
                            <strong>CP:</strong> {pokemon.cpMax}
                          </span>
                        )}
                        <div className="hatch-rarity-row">
                          <span className="rarity-label">{t.rarity_level}:</span>
                          <div className="rarity-eggs-flex">
                            {Array.from({ length: pokemon.rarityTier }).map((_, i) => (
                              <EggIcon key={i} size={12} color={currentPool.color} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};
