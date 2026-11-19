'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Gamepad2,
  RefreshCw,
  Trash2,
  Trophy,
  BookOpen,
  Eye,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Flame,
} from 'lucide-react';
import { apiFetch } from '../config';
import type { Language } from '../data/translations';
import { POKEDLE_BY_ID, getPokedleLocalizedName, type PokedleAttemptBucket } from '../utils/pokedleEngine';

interface ModeSummary {
  ready: boolean;
  played: number;
  won: number;
  winRate: number;
  avgAttempts: number;
  attemptBuckets: Record<PokedleAttemptBucket, number>;
}

interface PokemonRankItem {
  pokemonId: number;
  played: number;
  won: number;
  gaveUp: number;
  winRate: number;
  avgAttempts: number;
}

interface AdminPokedleStats {
  updatedAt: string;
  minSampleThreshold: number;
  totals: {
    played: number;
    won: number;
    gaveUp: number;
    winRate: number;
    avgAttempts: number;
  };
  daily: ModeSummary;
  endless: ModeSummary;
  byMode: {
    classic: ModeSummary;
    lore: ModeSummary;
    silhouette: ModeSummary;
  };
  recentDays: Array<{
    dateKey: string;
    played: number;
    won: number;
    gaveUp: number;
    winRate: number;
    avgAttempts: number;
    byMode: {
      classic: { played: number; won: number; avgAttempts: number };
      lore: { played: number; won: number; avgAttempts: number };
      silhouette: { played: number; won: number; avgAttempts: number };
    };
  }>;
  hardestPokemon: PokemonRankItem[];
  easiestPokemon: PokemonRankItem[];
  topFirstGuesses: Array<{ pokemonId: number; count: number; sharePct: number }>;
}

interface AdminPokedleStatsTabProps {
  token: string;
  lang: Language;
}

const BUCKETS: PokedleAttemptBucket[] = ['1', '2', '3', '4', '5', '6', '7+'];

function getSprite(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export const AdminPokedleStatsTab: React.FC<AdminPokedleStatsTabProps> = ({ token, lang }) => {
  const [stats, setStats] = useState<AdminPokedleStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [resetting, setResetting] = useState(false);

  const isCs = lang === 'cs';

  const fetchStats = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch('/api/admin/pokedle/stats', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setStats(json.stats || null);
    } catch (err: any) {
      setError(err?.message || 'Failed to load PoGoDle analytics');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const handleReset = async () => {
    if (!token || resetting) return;
    setResetting(true);
    setError(null);
    try {
      const res = await apiFetch('/api/admin/pokedle/stats', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setStats(json.stats || null);
      setConfirmReset(false);
    } catch (err: any) {
      setError(err?.message || 'Reset failed');
    } finally {
      setResetting(false);
    }
  };

  const renderPokeLabel = (id: number) => {
    const p = POKEDLE_BY_ID[id];
    return p ? getPokedleLocalizedName(p, lang) : `#${id}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {/* Header Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '18px 20px',
          borderRadius: '16px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 850, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Gamepad2 size={20} style={{ color: '#a855f7' }} />
            <span>{isCs ? 'PoGoDle – Analytika & Úspěšnost hráčů' : 'PoGoDle – Player Analytics & Win Rates'}</span>
          </h2>
          {stats && (
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {stats.totals.won >= stats.minSampleThreshold ? (
                <span style={{ color: '#4ade80', fontWeight: 700 }}>
                  ✓ {isCs ? `Veřejné komunitní statistiky aktivní (${stats.totals.won} výher)` : `Public community stats unlocked (${stats.totals.won} wins)`}
                </span>
              ) : (
                <span style={{ color: '#fbbf24', fontWeight: 700 }}>
                  ⏳ {isCs
                    ? `Veřejné statistiky pro hráče zatím skryté (${stats.totals.won} / ${stats.minSampleThreshold} uhodnutých Pokémonů)`
                    : `Public stats hidden for players until ${stats.minSampleThreshold} wins (${stats.totals.won} / ${stats.minSampleThreshold})`}
                </span>
              )}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="admin-nav-btn"
            onClick={fetchStats}
            disabled={loading}
          >
            <RefreshCw size={14} />
            <span>{loading ? (isCs ? 'Načítám...' : 'Loading...') : (isCs ? 'Obnovit' : 'Refresh')}</span>
          </button>

          {!confirmReset ? (
            <button
              type="button"
              className="admin-nav-btn"
              onClick={() => setConfirmReset(true)}
              style={{ borderColor: 'rgba(239, 68, 68, 0.4)', color: '#f87171' }}
            >
              <Trash2 size={14} />
              <span>{isCs ? 'Resetovat data' : 'Reset Stats'}</span>
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <button
                type="button"
                className="admin-nav-btn"
                onClick={handleReset}
                disabled={resetting}
                style={{ background: '#ef4444', color: '#ffffff', borderColor: '#ef4444' }}
              >
                <AlertTriangle size={14} />
                <span>{resetting ? '...' : (isCs ? 'Potvrdit smazání' : 'Confirm Reset')}</span>
              </button>
              <button
                type="button"
                className="admin-nav-btn"
                onClick={() => setConfirmReset(false)}
              >
                {isCs ? 'Zrušit' : 'Cancel'}
              </button>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div style={{ padding: '12px 16px', borderRadius: '12px', background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.4)', color: '#fca5a5', fontSize: '0.86rem' }}>
          {error}
        </div>
      )}

      {stats && (
        <>
          {/* Top KPI Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', alignItems: 'start' }}>
            {[
              { label: isCs ? 'Celkem odehráno' : 'Total Played', val: stats.totals.played, color: '#e2e8f0' },
              { label: isCs ? 'Uhodnuto' : 'Guessed (Won)', val: stats.totals.won, color: '#4ade80' },
              { label: isCs ? 'Vzdáno' : 'Gave Up', val: stats.totals.gaveUp, color: '#f87171' },
              { label: isCs ? 'Úspěšnost' : 'Win Rate', val: `${stats.totals.winRate}%`, color: '#38bdf8' },
              { label: isCs ? 'Průměr pokusů' : 'Avg Attempts', val: stats.totals.avgAttempts || '—', color: '#facc15' },
            ].map((kpi) => (
              <div
                key={kpi.label}
                style={{
                  padding: '16px',
                  borderRadius: '14px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  {kpi.label}
                </span>
                <strong style={{ fontSize: '1.65rem', fontWeight: 850, color: kpi.color }}>
                  {kpi.val}
                </strong>
              </div>
            ))}
          </div>

          {/* Daily vs Endless + Mode Breakdown with Histograms */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', alignItems: 'start' }}>
            {(
              [
                { key: 'classic', title: isCs ? 'Klasický režim' : 'Classic', icon: <Trophy size={15} />, data: stats.byMode.classic },
                { key: 'lore', title: isCs ? 'Pokédex Hláška' : 'Pokédex Entry', icon: <BookOpen size={15} />, data: stats.byMode.lore },
                { key: 'silhouette', title: isCs ? 'Silueta' : 'Silhouette', icon: <Eye size={15} />, data: stats.byMode.silhouette },
                { key: 'daily', title: isCs ? 'Denní výzva (celkem)' : 'Daily Challenge', icon: <Flame size={15} />, data: stats.daily },
                { key: 'endless', title: isCs ? 'Nekonečný režim (∞)' : 'Endless Mode (∞)', icon: <Sparkles size={15} />, data: stats.endless },
              ] as const
            ).map((card) => {
              const maxBucket = Math.max(1, ...BUCKETS.map((b) => card.data.attemptBuckets[b] || 0));
              return (
                <div
                  key={card.key}
                  style={{
                    padding: '16px',
                    borderRadius: '14px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.92rem' }}>
                      {card.icon}
                      {card.title}
                    </strong>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#38bdf8' }}>
                      {card.data.winRate}% ({card.data.won}/{card.data.played})
                    </span>
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    {isCs ? 'Průměr pokusů při výhře:' : 'Avg win attempts:'}{' '}
                    <strong style={{ color: 'var(--text-primary)' }}>{card.data.avgAttempts || '—'}</strong>
                  </div>

                  {/* Histogram */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {BUCKETS.map((b) => {
                      const val = card.data.attemptBuckets[b] || 0;
                      const pct = Math.round((val / maxBucket) * 100);
                      return (
                        <div key={b} style={{ display: 'grid', gridTemplateColumns: '26px 1fr 30px', alignItems: 'center', gap: '8px', fontSize: '0.72rem' }}>
                          <span style={{ color: 'var(--text-muted)', fontWeight: 700 }}>{b}</span>
                          <div style={{ height: '10px', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                            <div
                              style={{
                                width: `${val > 0 ? Math.max(6, pct) : 0}%`,
                                height: '100%',
                                borderRadius: '6px',
                                background: 'linear-gradient(90deg, #a855f7, #38bdf8)',
                              }}
                            />
                          </div>
                          <span style={{ textAlign: 'right', fontWeight: 700, color: 'var(--text-secondary)' }}>{val}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Leaderboards: Hardest, Easiest, Top First Guesses */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '14px', alignItems: 'start' }}>
            {/* Hardest */}
            <div style={{ padding: '16px', borderRadius: '14px', background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '0.94rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px', color: '#f87171' }}>
                <AlertTriangle size={15} />
                {isCs ? 'Nejtěžší Pokémoni' : 'Hardest Pokémon'}
              </h3>
              {stats.hardestPokemon.length === 0 ? (
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>—</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {stats.hardestPokemon.map((p) => (
                    <div key={p.pokemonId} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', padding: '6px 8px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)' }}>
                      <img src={getSprite(p.pokemonId)} alt="" width={26} height={26} style={{ objectFit: 'contain' }} />
                      <strong style={{ flexGrow: 1 }}>{renderPokeLabel(p.pokemonId)}</strong>
                      <span style={{ color: '#f87171', fontWeight: 800 }}>{p.winRate}%</span>
                      <span style={{ color: 'var(--text-muted)' }}>({p.won}/{p.played})</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Easiest */}
            <div style={{ padding: '16px', borderRadius: '14px', background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '0.94rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px', color: '#4ade80' }}>
                <CheckCircle2 size={15} />
                {isCs ? 'Nejlehčí Pokémoni' : 'Easiest Pokémon'}
              </h3>
              {stats.easiestPokemon.length === 0 ? (
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>—</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {stats.easiestPokemon.map((p) => (
                    <div key={p.pokemonId} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', padding: '6px 8px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)' }}>
                      <img src={getSprite(p.pokemonId)} alt="" width={26} height={26} style={{ objectFit: 'contain' }} />
                      <strong style={{ flexGrow: 1 }}>{renderPokeLabel(p.pokemonId)}</strong>
                      <span style={{ color: '#4ade80', fontWeight: 800 }}>{p.winRate}%</span>
                      <span style={{ color: 'var(--text-muted)' }}>⌀ {p.avgAttempts}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Top Opening Guesses */}
            <div style={{ padding: '16px', borderRadius: '14px', background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '0.94rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px', color: '#38bdf8' }}>
                <TrendingUp size={15} />
                {isCs ? 'Nejčastější 1. tipy' : 'Top 1st Guesses'}
              </h3>
              {stats.topFirstGuesses.length === 0 ? (
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>—</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {stats.topFirstGuesses.map((fg) => (
                    <div key={fg.pokemonId} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', padding: '6px 8px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)' }}>
                      <img src={getSprite(fg.pokemonId)} alt="" width={26} height={26} style={{ objectFit: 'contain' }} />
                      <strong style={{ flexGrow: 1 }}>{renderPokeLabel(fg.pokemonId)}</strong>
                      <span style={{ color: '#38bdf8', fontWeight: 800 }}>{fg.count}×</span>
                      <span style={{ color: 'var(--text-muted)' }}>({fg.sharePct}%)</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Daily History Table */}
          <div style={{ padding: '16px', borderRadius: '14px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', overflowX: 'auto' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '0.95rem', fontWeight: 800 }}>
              {isCs ? 'Denní historie (posledních 14 dní – Denní výzva)' : 'Daily History (Last 14 Days – Daily Challenge)'}
            </h3>
            {stats.recentDays.length === 0 ? (
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                {isCs ? 'Zatím nebyly zaznamenány žádné denní hry.' : 'No daily games recorded yet.'}
              </p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '7px 8px' }}>{isCs ? 'Datum (UTC)' : 'Date (UTC)'}</th>
                    <th style={{ padding: '7px 8px' }}>{isCs ? 'Odehráno' : 'Played'}</th>
                    <th style={{ padding: '7px 8px' }}>{isCs ? 'Uhodnuto' : 'Won'}</th>
                    <th style={{ padding: '7px 8px' }}>{isCs ? 'Úspěšnost' : 'Win Rate'}</th>
                    <th style={{ padding: '7px 8px' }}>{isCs ? 'Průměr' : 'Avg'}</th>
                    <th style={{ padding: '7px 8px' }}>{isCs ? 'Klasický' : 'Classic'}</th>
                    <th style={{ padding: '7px 8px' }}>{isCs ? 'Hláška' : 'Lore'}</th>
                    <th style={{ padding: '7px 8px' }}>{isCs ? 'Silueta' : 'Silhouette'}</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentDays.map((day) => (
                    <tr key={day.dateKey} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '7px 8px', fontFamily: 'monospace', fontWeight: 700 }}>{day.dateKey}</td>
                      <td style={{ padding: '7px 8px' }}>{day.played}</td>
                      <td style={{ padding: '7px 8px', color: '#4ade80', fontWeight: 700 }}>{day.won}</td>
                      <td style={{ padding: '7px 8px', color: '#38bdf8', fontWeight: 700 }}>{day.winRate}%</td>
                      <td style={{ padding: '7px 8px' }}>{day.avgAttempts || '—'}</td>
                      <td style={{ padding: '7px 8px' }}>{day.byMode.classic.won}/{day.byMode.classic.played}</td>
                      <td style={{ padding: '7px 8px' }}>{day.byMode.lore.won}/{day.byMode.lore.played}</td>
                      <td style={{ padding: '7px 8px' }}>{day.byMode.silhouette.won}/{day.byMode.silhouette.played}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
};
