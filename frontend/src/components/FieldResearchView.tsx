'use client';

import React, { useState, useEffect, useMemo } from 'react';
import './FieldResearchView.css';
import { translations, type Language } from '../data/translations';
import { resolveImage, handlePokemonImageError } from '../utils/imageResolver';
import { getPokemonName } from '../utils/pokemonTranslator';
import { Sparkles, Search, CheckCircle2 } from 'lucide-react';
import { API_BASE_URL } from '../config';

interface ResearchReward {
  name: string;
  image: string;
  canBeShiny: boolean;
  minCp?: number;
  maxCp?: number;
  amount?: number;
}

interface ResearchTask {
  task: {
    cs: string;
    en: string;
  };
  category: 'catch' | 'throw' | 'raid' | 'buddy' | 'power_up' | 'spin' | 'misc';
  rewards: ResearchReward[];
}

interface FieldResearchViewProps {
  lang: Language;
}

export const FieldResearchView: React.FC<FieldResearchViewProps> = ({ lang }) => {
  const t = translations[lang] || translations.en;
  const [tasks, setTasks] = useState<ResearchTask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    fetch(`${API_BASE_URL}/api/research`)
      .then(res => res.json())
      .then((data: ResearchTask[]) => {
        if (isMounted && Array.isArray(data)) {
          setTasks(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const categories = [
    { key: 'all', label: t.research_cat_all || 'All Tasks' },
    { key: 'catch', label: t.research_cat_catch || 'Catch' },
    { key: 'throw', label: t.research_cat_throw || 'Throws' },
    { key: 'raid', label: t.research_cat_raid || 'Raids & Battles' },
    { key: 'buddy', label: t.research_cat_buddy || 'Buddy' },
    { key: 'power_up', label: t.research_cat_power_up || 'Power Up' },
    { key: 'spin', label: t.research_cat_spin || 'PokéStops' },
  ];

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      // Category filter
      if (selectedCategory !== 'all' && task.category !== selectedCategory) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const taskText = (lang === 'cs' ? (task.task.cs || task.task.en) : task.task.en).toLowerCase();
        const rewardsMatch = (task.rewards || []).some(r =>
          r.name.toLowerCase().includes(q) ||
          getPokemonName(r.name, lang).toLowerCase().includes(q)
        );
        return taskText.includes(q) || rewardsMatch;
      }

      return true;
    });
  }, [tasks, selectedCategory, searchQuery, lang]);

  return (
    <div className="field-research-view-container">
      <div className="research-header">
        <h1 className="tab-seo-title">{t.research_title || 'Field Research Tasks & Rewards'}</h1>
        <p className="tab-seo-description">{t.research_subtitle || 'Complete database of current PokéStop tasks and encounter rewards.'}</p>
      </div>

      <div className="research-controls">
        <div className="research-search-bar">
          <Search size={18} color="#94a3b8" />
          <input
            type="text"
            className="research-search-input"
            placeholder={t.research_search_placeholder || 'Search task or Pokémon...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="research-categories-pills">
          {categories.map(cat => (
            <button
              key={cat.key}
              className={`research-pill ${selectedCategory === cat.key ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="research-loading">Načítám aktuální polní výzkumy...</div>
      ) : filteredTasks.length === 0 ? (
        <div className="research-empty">Žádné úkoly neodpovídají zvolenému filtru.</div>
      ) : (
        <div className="research-tasks-grid">
          {filteredTasks.map((taskItem, idx) => {
            const displayTask = lang === 'cs' ? (taskItem.task.cs || taskItem.task.en) : taskItem.task.en;
            return (
              <div key={`${displayTask}-${idx}`} className="research-task-card">
                <div className="task-card-header">
                  <span className="task-text">{displayTask}</span>
                  <span className="task-category-badge">{taskItem.category}</span>
                </div>

                <div className="task-rewards-list">
                  {taskItem.rewards.map((reward, rIdx) => (
                    <div key={`${reward.name}-${rIdx}`} className="reward-item">
                      <div className="reward-img-container">
                        <img
                          src={resolveImage(reward.image, 'research-reward', reward.name)}
                          alt={getPokemonName(reward.name, lang)}
                          className="reward-img"
                          onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, reward.name)}
                        />
                        {reward.canBeShiny && (
                          <span className="shiny-badge-absolute" title="Shiny available">
                            <Sparkles size={12} fill="currentColor" stroke="none" style={{ color: '#fbbf24' }} />
                          </span>
                        )}
                      </div>
                      <div className="reward-info">
                        <span className="reward-name">
                          {reward.amount ? `${reward.name} ×${reward.amount}` : getPokemonName(reward.name, lang)}
                        </span>
                        {reward.minCp && reward.maxCp && (
                          <span className="reward-cp">
                            CP {reward.minCp === reward.maxCp ? reward.minCp : `${reward.minCp} - ${reward.maxCp}`}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
