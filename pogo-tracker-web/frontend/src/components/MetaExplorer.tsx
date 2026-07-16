import React, { useState } from 'react';
import { pokemonMetaDb } from '../data/pokemonMeta';
import { translations, getLocalizedString } from '../data/translations';
import type { Language } from '../data/translations';

interface MetaExplorerProps {
  lang?: string;
}

export const MetaExplorer: React.FC<MetaExplorerProps> = ({ lang = 'cs' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pveFilter, setPveFilter] = useState<string>('All');
  const [pvpFilter, setPvpFilter] = useState<string>('All');

  const currentLang = lang as Language;
  const metaList = Object.values(pokemonMetaDb);

  const filteredPokemon = metaList.filter(pokemon => {
    const notesStr = getLocalizedString(pokemon.notes, currentLang);
    const matchesSearch =
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon.evolution.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notesStr.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPve = pveFilter === 'All' || pokemon.pveRating === pveFilter;
    const matchesPvp = pvpFilter === 'All' || pokemon.pvpRating === pvpFilter;

    return matchesSearch && matchesPve && matchesPvp;
  });

  return (
    <div className="meta-explorer">
      <div className="explorer-header">
        <h2>{currentLang === 'ja' ? 'PvE & PvP メタガイド' : currentLang === 'cs' ? 'Průvodce PvE & PvP Metou' : 'PvE & PvP Meta Guide'}</h2>
        <p className="subtitle">
          {currentLang === 'ja' ? 'ポケモンごとの評価やおすすめわざを検索できます。' : currentLang === 'cs' ? 'Vyhledávejte hodnocení a nejlepší útoky pro Pokémonní rodiny.' : 'Search rankings and ideal movesets for Pokémon families.'}
        </p>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <input
          type="text"
          placeholder={currentLang === 'ja' ? "ポケモンを検索 (例: ウリムー、カイリキー)..." : currentLang === 'cs' ? "Vyhledat pokémona (např. Swinub, Machamp)..." : "Search Pokémon (e.g. Swinub, Machamp)..."}
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <div className="dropdowns-group">
          <div className="filter-dropdown">
            <label>{currentLang === 'ja' ? 'PvE評価:' : currentLang === 'cs' ? 'PvE Hodnocení:' : 'PvE Rating:'}</label>
            <select value={pveFilter} onChange={(e) => setPveFilter(e.target.value)}>
              <option value="All">{currentLang === 'ja' ? 'すべて' : currentLang === 'cs' ? 'Vše' : 'All'}</option>
              <option value="S">S-Tier</option>
              <option value="A">A-Tier</option>
              <option value="B">B-Tier</option>
              <option value="None">{currentLang === 'ja' ? 'なし' : currentLang === 'cs' ? 'Žádné' : 'None'}</option>
            </select>
          </div>

          <div className="filter-dropdown">
            <label>{currentLang === 'ja' ? 'PvP評価:' : currentLang === 'cs' ? 'PvP Hodnocení:' : 'PvP Rating:'}</label>
            <select value={pvpFilter} onChange={(e) => setPvpFilter(e.target.value)}>
              <option value="All">{currentLang === 'ja' ? 'すべて' : currentLang === 'cs' ? 'Vše' : 'All'}</option>
              <option value="S">S-Tier</option>
              <option value="A">A-Tier</option>
              <option value="B">B-Tier</option>
              <option value="None">{currentLang === 'ja' ? 'なし' : currentLang === 'cs' ? 'Žádné' : 'None'}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="results-count">
        {currentLang === 'ja' ? `見つかった数: ${filteredPokemon.length} 匹` : currentLang === 'cs' ? `Nalezeno: ${filteredPokemon.length} Pokémonů` : `Found: ${filteredPokemon.length} Pokémon`}
      </div>

      {/* Pokemon Grid */}
      <div className="pokemon-meta-grid">
        {filteredPokemon.length === 0 ? (
          <div className="no-results-card">
            <p>{currentLang === 'ja' ? '検索条件に合うポケモンが見つかりませんでした。' : currentLang === 'cs' ? 'Žádný pokémon neodpovídá vyhledávání.' : 'No Pokémon matches search query.'}</p>
          </div>
        ) : (
          filteredPokemon.map(pokemon => (
            <div key={pokemon.name} className="pokemon-meta-card">
              <div className="card-header">
                <div>
                  <h3>{pokemon.name}</h3>
                  <span className="evolution-chain">
                    {currentLang === 'ja' ? `→ 進化: ${pokemon.evolution}` : currentLang === 'cs' ? `→ Vývoj: ${pokemon.evolution}` : `→ Evolution: ${pokemon.evolution}`}
                  </span>
                </div>
                <div className="rating-pill-container">
                  <div className={`rating-pill pve rating-${pokemon.pveRating.toLowerCase()}`}>
                    PvE: {pokemon.pveRating}
                  </div>
                  <div className={`rating-pill pvp rating-${pokemon.pvpRating.toLowerCase()}`}>
                    PvP: {pokemon.pvpRating}
                  </div>
                </div>
              </div>

              <div className="card-body">
                <div className="moveset-section">
                  <div className="move-item">
                    <span className="move-label">{currentLang === 'ja' ? 'わざ1:' : 'Fast Move:'}</span>
                    <span className="move-value">{pokemon.bestFastMove}</span>
                  </div>
                  <div className="move-item">
                    <span className="move-label">{currentLang === 'ja' ? 'わざ2:' : 'Charged Move:'}</span>
                    <span className="move-value">{pokemon.bestChargedMove}</span>
                  </div>
                </div>

                <div className="role-summaries">
                  {pokemon.pveRating !== 'None' && (
                    <div className="role-summary">
                      <span className="label pve">PvE:</span> {getLocalizedString(pokemon.pveRankText, currentLang)}
                    </div>
                  )}
                  {pokemon.pvpRating !== 'None' && (
                    <div className="role-summary">
                      <span className="label pvp">PvP:</span> {getLocalizedString(pokemon.pvpRankText, currentLang)}
                    </div>
                  )}
                </div>

                <div className="meta-notes">
                  <strong>{currentLang === 'ja' ? '💡 捕獲のヒント:' : currentLang === 'cs' ? '💡 Tip k lovu:' : '💡 Hunting Tip:'}</strong>
                  <p>{getLocalizedString(pokemon.notes, currentLang)}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
