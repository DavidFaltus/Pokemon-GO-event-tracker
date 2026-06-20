import React, { useState } from 'react';
import { pokemonMetaDb } from '../data/pokemonMeta';

export const MetaExplorer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pveFilter, setPveFilter] = useState<string>('All');
  const [pvpFilter, setPvpFilter] = useState<string>('All');

  const metaList = Object.values(pokemonMetaDb);

  const filteredPokemon = metaList.filter(pokemon => {
    const matchesSearch =
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon.evolution.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon.notes.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPve = pveFilter === 'All' || pokemon.pveRating === pveFilter;
    const matchesPvp = pvpFilter === 'All' || pokemon.pvpRating === pvpFilter;

    return matchesSearch && matchesPve && matchesPvp;
  });

  return (
    <div className="meta-explorer">
      <div className="explorer-header">
        <h2>Průvodce PvE & PvP Metou</h2>
        <p className="subtitle">
          Vyhledávejte hodnocení a nejlepší útoky pro Pokémonní rodiny.
        </p>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <input
          type="text"
          placeholder="Vyhledat pokémona (např. Swinub, Machamp)..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <div className="dropdowns-group">
          <div className="filter-dropdown">
            <label>PvE Hodnocení:</label>
            <select value={pveFilter} onChange={(e) => setPveFilter(e.target.value)}>
              <option value="All">Vše</option>
              <option value="S">S-Tier</option>
              <option value="A">A-Tier</option>
              <option value="B">B-Tier</option>
              <option value="None">Žádné</option>
            </select>
          </div>

          <div className="filter-dropdown">
            <label>PvP Hodnocení:</label>
            <select value={pvpFilter} onChange={(e) => setPvpFilter(e.target.value)}>
              <option value="All">Vše</option>
              <option value="S">S-Tier</option>
              <option value="A">A-Tier</option>
              <option value="B">B-Tier</option>
              <option value="None">Žádné</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="results-count">
        Nalezeno: {filteredPokemon.length} Pokémonů
      </div>

      {/* Pokemon Grid */}
      <div className="pokemon-meta-grid">
        {filteredPokemon.length === 0 ? (
          <div className="no-results-card">
            <p>Žádný pokémon neodpovídá vyhledávání.</p>
          </div>
        ) : (
          filteredPokemon.map(pokemon => (
            <div key={pokemon.name} className="pokemon-meta-card">
              <div className="card-header">
                <div>
                  <h3>{pokemon.name}</h3>
                  <span className="evolution-chain">→ Vývoj: {pokemon.evolution}</span>
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
                {/* Movesets */}
                <div className="moveset-section">
                  <div className="move-item">
                    <span className="move-label">Fast Move:</span>
                    <span className="move-value">{pokemon.bestFastMove}</span>
                  </div>
                  <div className="move-item">
                    <span className="move-label">Charged Move:</span>
                    <span className="move-value">{pokemon.bestChargedMove}</span>
                  </div>
                </div>

                {/* Summaries */}
                <div className="role-summaries">
                  {pokemon.pveRating !== 'None' && (
                    <div className="role-summary">
                      <span className="label pve">PvE:</span> {pokemon.pveRankText}
                    </div>
                  )}
                  {pokemon.pvpRating !== 'None' && (
                    <div className="role-summary">
                      <span className="label pvp">PvP:</span> {pokemon.pvpRankText}
                    </div>
                  )}
                </div>

                <div className="meta-notes">
                  <strong>💡 Tip k lovu:</strong>
                  <p>{pokemon.notes}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
