'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Trophy,
  Sparkles,
  Calendar,
  Clock,
  Gift,
  CheckCircle2,
  ScrollText,
  ExternalLink,
  Users,
  Send,
  Archive,
  Award,
  Megaphone,
  Gamepad2,
  RefreshCw,
  AlertCircle,
  Lock,
  Upload,
  ScanLine,
  BarChart3,
  ShieldCheck,
  XCircle,
  Hourglass,
  Search,
} from 'lucide-react';
import { apiFetch } from '../config';
import {
  type ContestItem,
  type ContestHubSettings,
  type PublicContestsResponse,
  type ContestEntryStatus,
  cleanMetricLabel,
  getContestMotifImageUrl,
} from '../types/contest';
import './ContestHubView.css';

const DEFAULT_SETTINGS: ContestHubSettings = {
  groupName: 'Lokální Pokémon GO komunita',
  hubTitle: 'Komunitní soutěže',
  hubSubtitle:
    'Soukromý portál soutěží a akcí pro naši lokální Pokémon GO skupinu.',
};

const SUBMITTED_STORAGE_KEY = 'pogo_soutez_submitted_v2';

interface SavedSubmissionRecord {
  trainerName: string;
  status: ContestEntryStatus;
  statusReason?: string;
  statsPhase?: 'baseline_only' | 'completed';
  baselineValues?: Record<string, number>;
  deltas?: Record<string, number>;
  metMetrics?: string[];
  failedMetrics?: string[];
  matchedSequence?: string[];
}

function readSubmittedRecords(): Record<string, SavedSubmissionRecord> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(SUBMITTED_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveSubmittedRecord(contestId: string, record: SavedSubmissionRecord) {
  if (typeof window === 'undefined') return;
  try {
    const current = readSubmittedRecords();
    current[contestId] = record;
    localStorage.setItem(SUBMITTED_STORAGE_KEY, JSON.stringify(current));
  } catch {}
}

function formatCzDate(iso?: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleString('cs-CZ', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getCountdownLabel(endDate?: string, startDate?: string, status?: string): string | null {
  const now = Date.now();
  if (status === 'upcoming' && startDate) {
    const diff = Date.parse(startDate) - now;
    if (isNaN(diff) || diff <= 0) return 'Začíná každým okamžikem';
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    if (days > 0) return `Začíná za ${days} d ${hours} h`;
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    return `Začíná za ${hours} h ${mins} min`;
  }
  if (status === 'active' && endDate) {
    const diff = Date.parse(endDate) - now;
    if (isNaN(diff)) return null;
    if (diff <= 0) return 'Ukončování soutěže';
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    if (days > 0) return `Zbývá ${days} d ${hours} h`;
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    return `Zbývá ${hours} h ${mins} min`;
  }
  return null;
}

function compressScreenshotForOcr(file: File, maxWidth = 1080): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Nepodařilo se načíst soubor.'));
    reader.onload = () => {
      const img = new window.Image();
      img.onerror = () => reject(new Error('Vybraný soubor není platný obrázek.'));
      img.onload = () => {
        const scale = img.width > maxWidth ? maxWidth / img.width : 1;
        const w = Math.max(1, Math.round(img.width * scale));
        const h = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Chyba při zpracování obrázku.'));
          return;
        }
        ctx.drawImage(img, 0, 0, w, h);
        let dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        if (dataUrl.length > 650_000) {
          dataUrl = canvas.toDataURL('image/jpeg', 0.72);
        }
        if (dataUrl.length > 680_000) {
          reject(new Error('Screenshot je příliš velký i po kompresi. Zkus menší rozlišení.'));
          return;
        }
        resolve(dataUrl);
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

interface EntryFormState {
  trainerName: string;
  trainerCode: string;
  answer: string;
  contact: string;
  screenshotDataUrl: string;
  statsPhaseTab: 'phase1' | 'phase2';
  statsValues: Record<string, string>;
  lookedUpBaseline?: Record<string, number>;
  submitting: boolean;
  lookingUp: boolean;
  error: string | null;
}

export const ContestHubView: React.FC = () => {
  const [settings, setSettings] = useState<ContestHubSettings>(DEFAULT_SETTINGS);
  const [contests, setContests] = useState<ContestItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'current' | 'archive'>('current');
  const [submittedMap, setSubmittedMap] = useState<Record<string, SavedSubmissionRecord>>({});
  const [openFormId, setOpenFormId] = useState<string | null>(null);
  const [forms, setForms] = useState<Record<string, EntryFormState>>({});

  const fetchContests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch('/api/contests');
      if (!res.ok) {
        throw new Error('Nepodařilo se načíst aktuální soutěže.');
      }
      const data: PublicContestsResponse = await res.json();
      if (data.settings) setSettings(data.settings);
      setContests(Array.isArray(data.contests) ? data.contests : []);
    } catch (err: any) {
      setError(err?.message || 'Chyba při komunikaci se serverem.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setSubmittedMap(readSubmittedRecords());
    fetchContests();
  }, [fetchContests]);

  const currentContests = useMemo(
    () => contests.filter((c) => c.status === 'active' || c.status === 'upcoming'),
    [contests]
  );

  const archivedContests = useMemo(
    () => contests.filter((c) => c.status === 'finished'),
    [contests]
  );

  useEffect(() => {
    if (typeof window === 'undefined' || contests.length === 0) return;
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;
    const target = contests.find((c) => `soutez-${c.slug}` === hash);
    if (target) {
      if (target.status === 'finished') setActiveTab('archive');
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 200);
    }
  }, [contests]);

  const getForm = (contestId: string): EntryFormState =>
    forms[contestId] || {
      trainerName: submittedMap[contestId]?.trainerName || '',
      trainerCode: '',
      answer: '',
      contact: '',
      screenshotDataUrl: '',
      statsPhaseTab:
        submittedMap[contestId]?.statsPhase === 'baseline_only' ? 'phase2' : 'phase1',
      statsValues: {},
      lookedUpBaseline: submittedMap[contestId]?.baselineValues,
      submitting: false,
      lookingUp: false,
      error: null,
    };

  const updateForm = (contestId: string, patch: Partial<EntryFormState>) => {
    setForms((prev) => ({
      ...prev,
      [contestId]: { ...getForm(contestId), ...patch },
    }));
  };

  // Classic registration submit
  const handleClassicSubmit = async (e: React.FormEvent, contest: ContestItem) => {
    e.preventDefault();
    const form = getForm(contest.id);
    updateForm(contest.id, { submitting: true, error: null });

    try {
      const res = await apiFetch(`/api/contests/${encodeURIComponent(contest.id)}/entries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trainerName: form.trainerName,
          trainerCode: form.trainerCode || undefined,
          answer: form.answer || undefined,
          contact: form.contact || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Přihlášku se nepodařilo odeslat.');

      saveSubmittedRecord(contest.id, {
        trainerName: form.trainerName.trim(),
        status: data.entry?.status || 'approved',
        statusReason: data.entry?.statusReason || 'Přihláška byla přijata do slosování.',
      });
      setSubmittedMap(readSubmittedRecords());
      setOpenFormId(null);
      await fetchContests();
    } catch (err: any) {
      updateForm(contest.id, {
        submitting: false,
        error: err?.message || 'Chyba při odesílání přihlášky.',
      });
      return;
    }

    updateForm(contest.id, { submitting: false, error: null });
  };

  // Template 1: Inventory Combo screenshot upload & OCR verification
  const handleInventoryScreenshotPick = async (
    contestId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    updateForm(contestId, { error: null });
    try {
      const dataUrl = await compressScreenshotForOcr(file);
      updateForm(contestId, { screenshotDataUrl: dataUrl });
    } catch (err: any) {
      updateForm(contestId, { error: err?.message || 'Nepodařilo se zpracovat screenshot.' });
    }
  };

  const handleInventoryComboSubmit = async (e: React.FormEvent, contest: ContestItem) => {
    e.preventDefault();
    const form = getForm(contest.id);
    if (!form.screenshotDataUrl) {
      updateForm(contest.id, { error: 'Nahraj prosím screenshot svého inventáře.' });
      return;
    }

    updateForm(contest.id, { submitting: true, error: null });
    try {
      const res = await apiFetch(
        `/api/contests/${encodeURIComponent(contest.id)}/inventory-combo`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            trainerName: form.trainerName,
            trainerCode: form.trainerCode || undefined,
            contact: form.contact || undefined,
            screenshotDataUrl: form.screenshotDataUrl,
          }),
        }
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Odeslání screenshotu se nezdařilo.');

      saveSubmittedRecord(contest.id, {
        trainerName: data.entry?.trainerName || form.trainerName.trim(),
        status: data.entry?.status || 'pending_review',
        statusReason: data.entry?.statusReason,
        matchedSequence: data.entry?.ocrResult?.matchedSequence,
      });
      setSubmittedMap(readSubmittedRecords());
      setOpenFormId(null);
      await fetchContests();
    } catch (err: any) {
      updateForm(contest.id, {
        submitting: false,
        error: err?.message || 'Chyba při kontrole screenshotu.',
      });
      return;
    }

    updateForm(contest.id, { submitting: false, error: null });
  };

  // Template 2: Stats Delta lookup existing baseline by trainer name (case-insensitive)
  const handleLookupStatsBaseline = async (contest: ContestItem) => {
    const form = getForm(contest.id);
    if (!form.trainerName.trim()) {
      updateForm(contest.id, { error: 'Nejdřív zadej své trenérské jméno.' });
      return;
    }
    updateForm(contest.id, { lookingUp: true, error: null });
    try {
      const res = await apiFetch(
        `/api/contests/${encodeURIComponent(contest.id)}/my-status?trainerName=${encodeURIComponent(form.trainerName.trim())}`
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Nepodařilo se vyhledat startovní záznam.');
      if (!data.found) {
        updateForm(contest.id, {
          lookingUp: false,
          lookedUpBaseline: undefined,
          error: `Pro trenéra „${form.trainerName.trim()}“ zatím nebyl nalezen startovní záznam z 1. fáze.`,
        });
        return;
      }

      saveSubmittedRecord(contest.id, {
        trainerName: data.trainerName,
        status: data.status,
        statusReason: data.statusReason,
        statsPhase: data.statsPhase,
        baselineValues: data.baselineValues,
        deltas: data.deltas,
        metMetrics: data.metMetrics,
        failedMetrics: data.failedMetrics,
      });
      setSubmittedMap(readSubmittedRecords());
      updateForm(contest.id, {
        lookingUp: false,
        lookedUpBaseline: data.baselineValues,
        error: null,
      });
    } catch (err: any) {
      updateForm(contest.id, {
        lookingUp: false,
        error: err?.message || 'Vyhledání záznamu selhalo.',
      });
    }
  };

  // Template 2: Submit Phase 1 (Baseline) or Phase 2 (Final) — NO screenshot
  const handleStatsSubmit = async (e: React.FormEvent, contest: ContestItem) => {
    e.preventDefault();
    const form = getForm(contest.id);
    const isPhase2 = form.statsPhaseTab === 'phase2';

    updateForm(contest.id, { submitting: true, error: null });
    try {
      const endpoint = isPhase2
        ? `/api/contests/${encodeURIComponent(contest.id)}/stats-final`
        : `/api/contests/${encodeURIComponent(contest.id)}/stats-baseline`;

      const res = await apiFetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trainerName: form.trainerName,
          trainerCode: !isPhase2 ? form.trainerCode || undefined : undefined,
          contact: !isPhase2 ? form.contact || undefined : undefined,
          values: form.statsValues,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Uložení statistik se nezdařilo.');

      saveSubmittedRecord(contest.id, {
        trainerName: data.entry?.trainerName || form.trainerName.trim(),
        status: data.entry?.status || 'pending_review',
        statusReason: data.entry?.statusReason,
        statsPhase: data.entry?.statsPhase,
        baselineValues: data.entry?.baselineValues,
        deltas: data.entry?.deltas,
        metMetrics: data.entry?.metMetrics,
        failedMetrics: data.entry?.failedMetrics,
      });
      setSubmittedMap(readSubmittedRecords());
      if (isPhase2) {
        setOpenFormId(null);
      } else {
        updateForm(contest.id, {
          submitting: false,
          error: null,
          statsPhaseTab: 'phase2',
          statsValues: {},
          lookedUpBaseline: data.entry?.baselineValues,
        });
      }
      await fetchContests();
    } catch (err: any) {
      updateForm(contest.id, {
        submitting: false,
        error: err?.message || 'Chyba při ukládání statistik.',
      });
      return;
    }

    updateForm(contest.id, { submitting: false, error: null });
  };

  const displayedContests = activeTab === 'current' ? currentContests : archivedContests;

  return (
    <div className="contest-hub-root">
      {/* Hero Header Card */}
      <section className="contest-hero-card">
        <div className="contest-hero-top-row">
          <span className="contest-private-pill">
            <Lock size={13} />
            <span>{settings.groupName || DEFAULT_SETTINGS.groupName}</span>
          </span>
          <button
            type="button"
            className="contest-refresh-btn"
            onClick={fetchContests}
            disabled={loading}
            title="Obnovit soutěže"
          >
            <RefreshCw size={14} className={loading ? 'contest-spin' : ''} />
            <span>Obnovit</span>
          </button>
        </div>

        <div className="contest-hero-heading">
          <div className="contest-hero-icon-wrap">
            <Trophy size={30} />
          </div>
          <div>
            <h1 className="tab-seo-title contest-hero-title">
              {settings.hubTitle || DEFAULT_SETTINGS.hubTitle}
            </h1>
            {settings.hubSubtitle && (
              <p className="tab-seo-description contest-hero-subtitle">
                {settings.hubSubtitle}
              </p>
            )}
          </div>
        </div>

        {settings.announcement && (
          <div className="contest-announcement-bar">
            <Megaphone size={16} />
            <span>{settings.announcement}</span>
          </div>
        )}

        <div className="contest-hero-footer">
          <div className="contest-tab-pills" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'current'}
              className={`contest-pill-btn ${activeTab === 'current' ? 'active' : ''}`}
              onClick={() => setActiveTab('current')}
            >
              <Sparkles size={15} />
              <span>Aktivní &amp; Nadcházející</span>
              <span className="contest-pill-count">{currentContests.length}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'archive'}
              className={`contest-pill-btn ${activeTab === 'archive' ? 'active' : ''}`}
              onClick={() => setActiveTab('archive')}
            >
              <Archive size={15} />
              <span>Archiv &amp; Výherci</span>
              <span className="contest-pill-count">{archivedContests.length}</span>
            </button>
          </div>

          {settings.communityUrl && (
            <a
              href={settings.communityUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contest-community-link"
            >
              <span>{settings.communityLabel || 'Otevřít skupinu'}</span>
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </section>

      {error && (
        <div className="contest-error-banner">
          <AlertCircle size={18} />
          <span>{error}</span>
          <button type="button" onClick={fetchContests} className="contest-retry-btn">
            Zkusit znovu
          </button>
        </div>
      )}

      {loading && contests.length === 0 ? (
        <div className="contest-grid">
          {[1, 2].map((n) => (
            <div key={n} className="contest-card contest-skeleton-card">
              <div className="contest-skeleton-media" />
              <div className="contest-skeleton-body">
                <div className="contest-skeleton-line wide" />
                <div className="contest-skeleton-line" />
                <div className="contest-skeleton-line short" />
              </div>
            </div>
          ))}
        </div>
      ) : displayedContests.length === 0 ? (
        <div className="contest-empty-card">
          <div className="contest-empty-icon">
            {activeTab === 'current' ? <Trophy size={40} /> : <Archive size={40} />}
          </div>
          <h2>
            {activeTab === 'current'
              ? 'Momentálně neprobíhá žádná soutěž'
              : 'Archiv ukončených soutěží je zatím prázdný'}
          </h2>
          <p>
            {activeTab === 'current'
              ? 'Jakmile organizátoři spustí novou soutěž nebo komunitní minihru, zobrazí se přesně tady.'
              : 'Jakmile skončí první soutěže a vyhlásíme výherce, najdeš zde jejich kompletní přehled.'}
          </p>
          {activeTab === 'current' && archivedContests.length > 0 && (
            <button
              type="button"
              className="contest-secondary-action"
              onClick={() => setActiveTab('archive')}
            >
              <Archive size={15} />
              <span>Zobrazit archiv · {archivedContests.length}</span>
            </button>
          )}
        </div>
      ) : (
        <div className="contest-grid">
          {displayedContests.map((contest) => {
            const motifImg = getContestMotifImageUrl(contest.motif);
            const isPokemonMotif = contest.motif?.mode === 'pokemon';
            const countdown = getCountdownLabel(contest.endDate, contest.startDate, contest.status);
            const savedRecord = submittedMap[contest.id];
            const form = getForm(contest.id);
            const isFormOpen = openFormId === contest.id;
            const enabledStatsMetrics = (contest.statsDeltaConfig?.metrics || []).filter(
              (m) => m.enabled
            );

            const nowMs = Date.now();
            const baselineClosed =
              contest.statsDeltaConfig?.baselineDeadline &&
              !isNaN(Date.parse(contest.statsDeltaConfig.baselineDeadline)) &&
              nowMs > Date.parse(contest.statsDeltaConfig.baselineDeadline);
            const finalNotOpenYet =
              contest.statsDeltaConfig?.finalOpenAt &&
              !isNaN(Date.parse(contest.statsDeltaConfig.finalOpenAt)) &&
              nowMs < Date.parse(contest.statsDeltaConfig.finalOpenAt);

            return (
              <article
                key={contest.id}
                id={`soutez-${contest.slug}`}
                className={`contest-card status-${contest.status} ${contest.pinned ? 'is-pinned' : ''}`}
              >
                {/* Visual Header / Motif Banner */}
                <div className={`contest-card-media ${isPokemonMotif ? 'mode-pokemon' : 'mode-image'}`}>
                  <div className="contest-media-badges">
                    <span className={`contest-status-badge ${contest.status}`}>
                      <span className="contest-status-dot" />
                      {contest.status === 'active'
                        ? 'Probíhá'
                        : contest.status === 'upcoming'
                          ? 'Brzy začne'
                          : 'Ukončeno'}
                    </span>

                    {contest.pinned && (
                      <span className="contest-pinned-badge">
                        <Sparkles size={12} />
                        <span>Hlavní soutěž</span>
                      </span>
                    )}

                    {contest.contestType === 'inventory_combo' && (
                      <span className="contest-game-badge">
                        <ScanLine size={12} />
                        <span>Inventářová štafeta</span>
                      </span>
                    )}

                    {contest.contestType === 'stats_delta' && (
                      <span className="contest-game-badge stats">
                        <BarChart3 size={12} />
                        <span>Výzva statistik</span>
                      </span>
                    )}

                    {contest.contestType === 'game_placeholder' && (
                      <span className="contest-game-badge">
                        <Gamepad2 size={12} />
                        <span>Minihra</span>
                      </span>
                    )}
                  </div>

                  {motifImg ? (
                    isPokemonMotif ? (
                      <div className="contest-pokemon-showcase">
                        <div className="contest-pokemon-glow" />
                        <img
                          src={motifImg}
                          alt={contest.motif.pokemonName || contest.title}
                          className="contest-pokemon-art"
                          loading="lazy"
                        />
                        {contest.motif.pokemonName && (
                          <span className="contest-pokemon-chip">
                            {contest.motif.shiny && <Sparkles size={12} className="shiny-icon" />}
                            <span>{contest.motif.pokemonName}</span>
                          </span>
                        )}
                      </div>
                    ) : (
                      <img
                        src={motifImg}
                        alt={contest.title}
                        className="contest-banner-img"
                        loading="lazy"
                      />
                    )
                  ) : (
                    <div className="contest-fallback-art">
                      <Trophy size={48} />
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="contest-card-body">
                  <div className="contest-card-title-block">
                    <h2 className="contest-card-title">{contest.title}</h2>
                    {contest.subtitle && (
                      <p className="contest-card-subtitle">{contest.subtitle}</p>
                    )}
                  </div>

                  {/* ── INTERACTIVE PARTICIPATION BLOCKS (Right under title!) ───── */}
                  {contest.status === 'active' && contest.registrationEnabled && (
                    <div className="contest-registration-block">
                      {/* Status Banner when player already submitted (completed or single-attempt) */}
                      {savedRecord &&
                        (contest.contestType !== 'stats_delta' ||
                          savedRecord.statsPhase === 'completed') && (
                          <div
                            className={`contest-submitted-banner status-${savedRecord.status}`}
                          >
                            {savedRecord.status === 'approved' ? (
                              <CheckCircle2 size={19} />
                            ) : savedRecord.status === 'pending_review' ? (
                              <Hourglass size={19} />
                            ) : (
                              <XCircle size={19} />
                            )}
                            <div>
                              <strong>
                                {savedRecord.status === 'approved'
                                  ? `${savedRecord.trainerName} – Splněno! Jsi ve slosování.`
                                  : savedRecord.status === 'pending_review'
                                    ? `${savedRecord.trainerName} – Odesláno ke kontrole adminem.`
                                    : `${savedRecord.trainerName} – Podmínka nebyla splněna.`}
                              </strong>
                              {savedRecord.statusReason && <span>{savedRecord.statusReason}</span>}
                              {savedRecord.matchedSequence &&
                                savedRecord.matchedSequence.length > 0 && (
                                  <span className="contest-seq-highlight">
                                    Ověřená řada: {savedRecord.matchedSequence.join(' → ')}
                                  </span>
                                )}
                              {savedRecord.deltas && enabledStatsMetrics.length > 0 && (
                                <div className="contest-delta-summary-pills">
                                  {enabledStatsMetrics.map((m) => {
                                    const d = savedRecord.deltas?.[m.id];
                                    const ok = savedRecord.metMetrics?.includes(m.id);
                                    return (
                                      <span
                                        key={m.id}
                                        className={`delta-pill ${ok ? 'ok' : 'fail'}`}
                                      >
                                        {cleanMetricLabel(m.label)}: +{d ?? 0} {m.unit}{' '}
                                        {ok ? '✓' : '✗'}
                                      </span>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                      {/* Template 1: INVENTORY COMBO FORM */}
                      {contest.contestType === 'inventory_combo' && !savedRecord && (
                        !isFormOpen ? (
                          <button
                            type="button"
                            className="contest-primary-cta"
                            onClick={() => setOpenFormId(contest.id)}
                          >
                            <ScanLine size={16} />
                            <span>Nahrát screenshot inventáře</span>
                          </button>
                        ) : (
                          <form
                            className="contest-entry-form"
                            onSubmit={(e) => handleInventoryComboSubmit(e, contest)}
                          >
                            <div className="contest-form-title">
                              Odevzdání – Inventářová štafeta
                            </div>
                            <p className="contest-form-hint">
                              Nahraj screenshot mřížky Pokémonů seřazené podle Recent
                              {contest.inventoryComboConfig?.requireAge0
                                ? ' s viditelným filtrem age0 v horní liště'
                                : ''}
                              . Každý trenér má pouze 1 pokus.
                            </p>

                            <div className="contest-field">
                              <label>Trenérské jméno v Pokémon GO *</label>
                              <input
                                type="text"
                                required
                                maxLength={40}
                                placeholder="Např. AshKetchumCZ"
                                value={form.trainerName}
                                onChange={(e) =>
                                  updateForm(contest.id, { trainerName: e.target.value })
                                }
                              />
                            </div>

                            {contest.requireContact && (
                              <div className="contest-field">
                                <label>{contest.contactPrompt || 'Kontakt *'}</label>
                                <input
                                  type="text"
                                  required
                                  maxLength={120}
                                  placeholder="Discord / Messenger..."
                                  value={form.contact}
                                  onChange={(e) =>
                                    updateForm(contest.id, { contact: e.target.value })
                                  }
                                />
                              </div>
                            )}

                            <div className="contest-field">
                              <label>Screenshot inventáře *</label>
                              <label className="contest-upload-dropzone">
                                <input
                                  type="file"
                                  accept="image/png,image/jpeg,image/webp"
                                  onChange={(e) => handleInventoryScreenshotPick(contest.id, e)}
                                  style={{ display: 'none' }}
                                />
                                {form.screenshotDataUrl ? (
                                  <img
                                    src={form.screenshotDataUrl}
                                    alt="Náhled screenshotu"
                                    className="contest-upload-preview"
                                  />
                                ) : (
                                  <div className="contest-upload-placeholder">
                                    <Upload size={22} />
                                    <span>Vybrat screenshot z telefonu / PC</span>
                                  </div>
                                )}
                              </label>
                            </div>

                            {form.error && (
                              <div className="contest-form-error">
                                <AlertCircle size={15} />
                                <span>{form.error}</span>
                              </div>
                            )}

                            <div className="contest-form-actions">
                              <button
                                type="submit"
                                className="contest-primary-cta"
                                disabled={form.submitting || !form.screenshotDataUrl}
                              >
                                <ScanLine size={15} />
                                <span>
                                  {form.submitting
                                    ? 'Probíhá OCR kontrola...'
                                    : 'Odeslat a zkontrolovat'}
                                </span>
                              </button>
                              <button
                                type="button"
                                className="contest-cancel-btn"
                                onClick={() => setOpenFormId(null)}
                                disabled={form.submitting}
                              >
                                Zrušit
                              </button>
                            </div>
                          </form>
                        )
                      )}

                      {/* Template 2: STATS DELTA 2-PHASE FORM (NO screenshots!) */}
                      {contest.contestType === 'stats_delta' &&
                        savedRecord?.statsPhase !== 'completed' && (
                          !isFormOpen ? (
                            <div className="contest-stats-cta-wrap">
                              {savedRecord?.statsPhase === 'baseline_only' && (
                                <div className="contest-submitted-banner status-pending_review">
                                  <Hourglass size={18} />
                                  <div>
                                    <strong>
                                      Start zapsán pro {savedRecord.trainerName}!
                                    </strong>
                                    <span>
                                      Až odehraješ svůj čas, zadej ve 2. fázi finální statistiky.
                                    </span>
                                  </div>
                                </div>
                              )}
                              <button
                                type="button"
                                className="contest-primary-cta"
                                onClick={() => setOpenFormId(contest.id)}
                              >
                                <BarChart3 size={16} />
                                <span>
                                  {savedRecord?.statsPhase === 'baseline_only'
                                    ? 'Zadat finální statistiky'
                                    : 'Zadat statistiky'}
                                </span>
                              </button>
                            </div>
                          ) : (
                            <form
                              className="contest-entry-form"
                              onSubmit={(e) => handleStatsSubmit(e, contest)}
                            >
                              <div className="contest-phase-tabs">
                                <button
                                  type="button"
                                  className={`contest-phase-tab ${
                                    form.statsPhaseTab === 'phase1' ? 'active' : ''
                                  }`}
                                  onClick={() =>
                                    updateForm(contest.id, {
                                      statsPhaseTab: 'phase1',
                                      error: null,
                                    })
                                  }
                                >
                                  1. Startovní stav
                                </button>
                                <button
                                  type="button"
                                  className={`contest-phase-tab ${
                                    form.statsPhaseTab === 'phase2' ? 'active' : ''
                                  }`}
                                  onClick={() =>
                                    updateForm(contest.id, {
                                      statsPhaseTab: 'phase2',
                                      error: null,
                                    })
                                  }
                                >
                                  2. Finální stav
                                </button>
                              </div>

                              <div className="contest-field">
                                <label>Trenérské jméno v Pokémon GO *</label>
                                <div className="contest-name-lookup-row">
                                  <input
                                    type="text"
                                    required
                                    maxLength={40}
                                    placeholder="Stejné jméno v obou fázích"
                                    value={form.trainerName}
                                    onChange={(e) =>
                                      updateForm(contest.id, { trainerName: e.target.value })
                                    }
                                  />
                                  {form.statsPhaseTab === 'phase2' && (
                                    <button
                                      type="button"
                                      className="contest-lookup-btn"
                                      onClick={() => handleLookupStatsBaseline(contest)}
                                      disabled={form.lookingUp}
                                    >
                                      <Search size={14} />
                                      <span>{form.lookingUp ? '...' : 'Načíst start'}</span>
                                    </button>
                                  )}
                                </div>
                              </div>

                              {form.statsPhaseTab === 'phase1' && baselineClosed && (
                                <div className="contest-form-error">
                                  <Clock size={15} />
                                  <span>
                                    Uzávěrka pro 1. fázi {formatCzDate(contest.statsDeltaConfig?.baselineDeadline)} již proběhla.
                                  </span>
                                </div>
                              )}

                              {form.statsPhaseTab === 'phase2' && finalNotOpenYet && (
                                <div className="contest-form-error">
                                  <Clock size={15} />
                                  <span>
                                    2. fáze se otevře až {formatCzDate(contest.statsDeltaConfig?.finalOpenAt)}.
                                  </span>
                                </div>
                              )}

                              {enabledStatsMetrics.map((metric) => {
                                const startVal = form.lookedUpBaseline?.[metric.id];
                                const rawInput = form.statsValues[metric.id] || '';
                                const parsedNum = Number(
                                  rawInput.replace(/\s+/g, '').replace(',', '.')
                                );
                                const liveDelta =
                                  form.statsPhaseTab === 'phase2' &&
                                  typeof startVal === 'number' &&
                                  rawInput.trim() !== '' &&
                                  Number.isFinite(parsedNum)
                                    ? Math.round((parsedNum - startVal) * 100) / 100
                                    : null;

                                return (
                                  <div key={metric.id} className="contest-field">
                                    <label className="contest-stat-label-row">
                                      <span>
                                        {cleanMetricLabel(metric.label)} · {metric.unit} *
                                      </span>
                                      {form.statsPhaseTab === 'phase2' &&
                                        typeof startVal === 'number' && (
                                          <span className="contest-start-hint">
                                            Start: {startVal} {metric.unit}
                                          </span>
                                        )}
                                    </label>
                                    <input
                                      type="text"
                                      inputMode="decimal"
                                      required
                                      placeholder={
                                        form.statsPhaseTab === 'phase1'
                                          ? `Aktuální hodnota v ${metric.unit}`
                                          : `Nová hodnota · cíl +${metric.threshold} ${metric.unit}`
                                      }
                                      value={rawInput}
                                      onChange={(e) =>
                                        updateForm(contest.id, {
                                          statsValues: {
                                            ...form.statsValues,
                                            [metric.id]: e.target.value,
                                          },
                                        })
                                      }
                                    />
                                    {liveDelta !== null && (
                                      <span
                                        className={`contest-live-delta ${
                                          liveDelta < 0
                                            ? 'neg'
                                            : liveDelta >= metric.threshold
                                              ? 'ok'
                                              : 'warn'
                                        }`}
                                      >
                                        {liveDelta < 0
                                          ? `Pozor: nižší než start: ${liveDelta} ${metric.unit}`
                                          : `Rozdíl: +${liveDelta} ${metric.unit} · cíl +${metric.threshold} ${metric.unit} ${liveDelta >= metric.threshold ? '✓' : ''}`}
                                      </span>
                                    )}
                                  </div>
                                );
                              })}

                              {form.statsPhaseTab === 'phase1' && contest.requireContact && (
                                <div className="contest-field">
                                  <label>{contest.contactPrompt || 'Kontakt *'}</label>
                                  <input
                                    type="text"
                                    required
                                    maxLength={120}
                                    placeholder="Discord / Messenger..."
                                    value={form.contact}
                                    onChange={(e) =>
                                      updateForm(contest.id, { contact: e.target.value })
                                    }
                                  />
                                </div>
                              )}

                              {form.error && (
                                <div className="contest-form-error">
                                  <AlertCircle size={15} />
                                  <span>{form.error}</span>
                                </div>
                              )}

                              <div className="contest-form-actions">
                                <button
                                  type="submit"
                                  className="contest-primary-cta"
                                  disabled={
                                    form.submitting ||
                                    Boolean(form.statsPhaseTab === 'phase1' && baselineClosed) ||
                                    Boolean(form.statsPhaseTab === 'phase2' && finalNotOpenYet)
                                  }
                                >
                                  <Send size={15} />
                                  <span>
                                    {form.submitting
                                      ? 'Ukládám...'
                                      : form.statsPhaseTab === 'phase1'
                                        ? 'Uložit startovní stav'
                                        : 'Odeslat a vyhodnotit'}
                                  </span>
                                </button>
                                <button
                                  type="button"
                                  className="contest-cancel-btn"
                                  onClick={() => setOpenFormId(null)}
                                  disabled={form.submitting}
                                >
                                  Zrušit
                                </button>
                              </div>
                            </form>
                          )
                        )}

                      {/* Classic Registration Form */}
                      {contest.contestType !== 'inventory_combo' &&
                        contest.contestType !== 'stats_delta' &&
                        !savedRecord && (
                          !isFormOpen ? (
                            <button
                              type="button"
                              className="contest-primary-cta"
                              onClick={() => setOpenFormId(contest.id)}
                            >
                              <Send size={16} />
                              <span>Zapojit se do soutěže</span>
                            </button>
                          ) : (
                            <form
                              className="contest-entry-form"
                              onSubmit={(e) => handleClassicSubmit(e, contest)}
                            >
                              <div className="contest-form-title">Přihláška do soutěže</div>
                              <div className="contest-field">
                                <label>Trenérské jméno v Pokémon GO *</label>
                                <input
                                  type="text"
                                  required
                                  maxLength={40}
                                  placeholder="Např. AshKetchumCZ"
                                  value={form.trainerName}
                                  onChange={(e) =>
                                    updateForm(contest.id, { trainerName: e.target.value })
                                  }
                                />
                              </div>

                              <div className="contest-field">
                                <label>Kód trenéra</label>
                                <input
                                  type="text"
                                  maxLength={16}
                                  placeholder="1234 5678 9012"
                                  value={form.trainerCode}
                                  onChange={(e) =>
                                    updateForm(contest.id, { trainerCode: e.target.value })
                                  }
                                />
                              </div>

                              {(contest.requireAnswer || contest.answerPrompt) && (
                                <div className="contest-field">
                                  <label>
                                    {contest.answerPrompt || 'Soutěžní odpověď / tip'}
                                    {contest.requireAnswer ? ' *' : ''}
                                  </label>
                                  <textarea
                                    rows={2}
                                    required={Boolean(contest.requireAnswer)}
                                    maxLength={400}
                                    placeholder="Napiš svou odpověď..."
                                    value={form.answer}
                                    onChange={(e) =>
                                      updateForm(contest.id, { answer: e.target.value })
                                    }
                                  />
                                </div>
                              )}

                              {(contest.requireContact || contest.contactPrompt) && (
                                <div className="contest-field">
                                  <label>
                                    {contest.contactPrompt || 'Kontakt – Discord / Messenger'}
                                    {contest.requireContact ? ' *' : ''}
                                  </label>
                                  <input
                                    type="text"
                                    required={Boolean(contest.requireContact)}
                                    maxLength={120}
                                    placeholder="Např. @nick na Discordu"
                                    value={form.contact}
                                    onChange={(e) =>
                                      updateForm(contest.id, { contact: e.target.value })
                                    }
                                  />
                                </div>
                              )}

                              {form.error && (
                                <div className="contest-form-error">
                                  <AlertCircle size={15} />
                                  <span>{form.error}</span>
                                </div>
                              )}

                              <div className="contest-form-actions">
                                <button
                                  type="submit"
                                  className="contest-primary-cta"
                                  disabled={form.submitting}
                                >
                                  <Send size={15} />
                                  <span>
                                    {form.submitting ? 'Odesílám...' : 'Odeslat přihlášku'}
                                  </span>
                                </button>
                                <button
                                  type="button"
                                  className="contest-cancel-btn"
                                  onClick={() => setOpenFormId(null)}
                                  disabled={form.submitting}
                                >
                                  Zrušit
                                </button>
                              </div>
                            </form>
                          )
                        )}
                    </div>
                  )}

                  {/* Schedule & Participants Meta Strip */}
                  <div className="contest-meta-strip">
                    {countdown && (
                      <span className="contest-meta-pill highlight">
                        <Clock size={13} />
                        <span>{countdown}</span>
                      </span>
                    )}
                    {contest.startDate && (
                      <span className="contest-meta-pill">
                        <Calendar size={13} />
                        <span>Od: {formatCzDate(contest.startDate)}</span>
                      </span>
                    )}
                    {contest.endDate && (
                      <span className="contest-meta-pill">
                        <Calendar size={13} />
                        <span>Do: {formatCzDate(contest.endDate)}</span>
                      </span>
                    )}
                    {contest.registrationEnabled && (
                      <span className="contest-meta-pill">
                        <ShieldCheck size={13} />
                        <span>
                          Ve slosování: {contest.qualifiedCount ?? contest.entryCount ?? 0}
                        </span>
                      </span>
                    )}
                  </div>

                  {contest.description && (
                    <div className="contest-description">
                      {contest.description.split('\n').map((line, idx) => (
                        <p key={idx}>{line}</p>
                      ))}
                    </div>
                  )}

                  {/* Template 1 Summary Strip: Inventory Combo Rules */}
                  {contest.contestType === 'inventory_combo' && contest.inventoryComboConfig && (
                    <div className="contest-info-box template-spec-box">
                      <div className="contest-info-box-title">
                        <ScanLine size={15} />
                        <span>Zadání Inventářové štafety</span>
                      </div>
                      <div className="contest-spec-pills">
                        <span className="contest-spec-pill accent">
                          {contest.inventoryComboConfig.ruleMode === 'alphabetical'
                            ? `Abecední postupka · ${contest.inventoryComboConfig.comboLength} po sobě`
                            : contest.inventoryComboConfig.ruleMode === 'word_cipher'
                              ? `Slovní šifra: ${contest.inventoryComboConfig.targetWord || 'POG'}`
                              : `Konkrétní Pokémoni: ${(contest.inventoryComboConfig.requiredPokemon || []).join(', ')}`}
                        </span>
                        {contest.inventoryComboConfig.requireAge0 && (
                          <span className="contest-spec-pill cyan">
                            Vyžadován filtr: age0
                          </span>
                        )}
                        <span className="contest-spec-pill">1 pokus na trenéra</span>
                      </div>
                    </div>
                  )}

                  {/* Template 2 Summary Strip: Stats Delta Thresholds */}
                  {contest.contestType === 'stats_delta' && contest.statsDeltaConfig && (
                    <div className="contest-info-box template-spec-box">
                      <div className="contest-info-box-title">
                        <BarChart3 size={15} />
                        <span>
                          Cílové rozdíly –{' '}
                          {contest.statsDeltaConfig.matchMode === 'min_count'
                            ? `splň alespoň ${contest.statsDeltaConfig.minMetricsRequired} z ${enabledStatsMetrics.length}`
                            : 'splň všechny'}
                        </span>
                      </div>
                      <div className="contest-stats-targets">
                        {enabledStatsMetrics.map((m) => (
                          <div key={m.id} className="contest-stat-target-pill">
                            <span>{cleanMetricLabel(m.label)}</span>
                            <strong>
                              +{m.threshold} {m.unit}
                            </strong>
                          </div>
                        ))}
                      </div>
                      <div className="contest-phase-dates">
                        {contest.statsDeltaConfig.baselineDeadline && (
                          <span>
                            1. fáze – start do: {formatCzDate(contest.statsDeltaConfig.baselineDeadline)}
                          </span>
                        )}
                        {contest.statsDeltaConfig.finalOpenAt && (
                          <span>
                            2. fáze – cíl od: {formatCzDate(contest.statsDeltaConfig.finalOpenAt)}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Prizes */}
                  {contest.prizes && contest.prizes.length > 0 && (
                    <div className="contest-info-box prizes-box">
                      <div className="contest-info-box-title">
                        <Gift size={15} />
                        <span>Odměny &amp; Ceny</span>
                      </div>
                      <ul className="contest-prizes-list">
                        {contest.prizes.map((prize, idx) => (
                          <li key={idx}>
                            <span className="prize-rank-pill">{idx + 1}.</span>
                            <span>{prize}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Rules */}
                  {contest.rules && contest.rules.length > 0 && (
                    <div className="contest-info-box rules-box">
                      <div className="contest-info-box-title">
                        <ScrollText size={15} />
                        <span>Pravidla soutěže</span>
                      </div>
                      <ul className="contest-rules-list">
                        {contest.rules.map((rule, idx) => (
                          <li key={idx}>{rule}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Optional Public Qualified Trainers List */}
                  {contest.showQualifiedList &&
                    contest.qualifiedTrainers &&
                    contest.qualifiedTrainers.length > 0 && (
                      <div className="contest-info-box qualified-box">
                        <div className="contest-info-box-title">
                          <Users size={15} />
                          <span>
                            Kvalifikovaní do slosování · {contest.qualifiedTrainers.length}
                          </span>
                        </div>
                        <div className="contest-qualified-chips">
                          {contest.qualifiedTrainers.map((name, idx) => (
                            <span key={idx} className="contest-qualified-chip">
                              <CheckCircle2 size={12} />
                              <span>{name}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Announced Winners Showcase */}
                  {contest.winners && contest.winners.length > 0 && (
                    <div className="contest-winners-box">
                      <div className="contest-winners-header">
                        <Award size={16} />
                        <span className="gold-hundo-text">Vyhlášení výherci</span>
                      </div>
                      <div className="contest-winners-list">
                        {contest.winners.map((winner, idx) => (
                          <div key={winner.id || idx} className="contest-winner-row">
                            <span className={`winner-medal place-${winner.place || idx + 1}`}>
                              #{winner.place || idx + 1}
                            </span>
                            <div className="winner-info">
                              <span className="winner-name">{winner.trainerName}</span>
                              {winner.prize && <span className="winner-prize">{winner.prize}</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {contest.externalUrl && (
                    <a
                      href={contest.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contest-external-btn"
                    >
                      <span>{contest.externalUrlLabel || 'Více informací / Odkaz'}</span>
                      <ExternalLink size={15} />
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
