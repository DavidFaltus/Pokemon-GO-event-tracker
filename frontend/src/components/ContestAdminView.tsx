'use client';

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import QRCode from 'qrcode';
import {
  Lock,
  User,
  KeyRound,
  Eye,
  EyeOff,
  LogOut,
  Plus,
  Save,
  Trash2,
  Trophy,
  Users,
  QrCode,
  Settings,
  Sparkles,
  Image as ImageIcon,
  Upload,
  Dices,
  Download,
  Copy,
  Check,
  ExternalLink,
  Search,
  AlertCircle,
  CheckCircle2,
  Award,
  RefreshCw,
  Cloud,
  ScanLine,
  BarChart3,
  XCircle,
  Hourglass,
  X,
} from 'lucide-react';
import { apiFetch } from '../config';
import { POKEDEX_CATALOG } from '../data/pokedexCatalog';
import {
  type ContestItem,
  type ContestEntry,
  type ContestEntryStatus,
  type ContestHubSettings,
  type ContestStatus,
  type ContestType,
  type ContestWinner,
  type InventoryComboRuleMode,
  type AdminContestsStateResponse,
  type OcrMonthlyUsage,
  DEFAULT_STATS_METRICS,
  cleanMetricLabel,
  getContestMotifImageUrl,
} from '../types/contest';
import './ContestAdminView.css';

const TOKEN_STORAGE_KEY = 'pogo_contest_admin_token_v1';
const USERNAME_STORAGE_KEY = 'pogo_contest_admin_user_v1';

type AdminTab = 'contests' | 'entries' | 'qr' | 'settings';

function toLocalDatetimeInput(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function isoToDatetimeLocal(iso?: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso.slice(0, 16);
  return toLocalDatetimeInput(d);
}

function createTemplateContest(template: 'registration' | 'inventory_combo' | 'stats_delta'): Partial<ContestItem> {
  const now = new Date();
  const in24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  if (template === 'inventory_combo') {
    return {
      title: 'Inventářová štafeta',
      subtitle: 'Chyť Pokémony podle pravidla a nahraj screenshot inventáře',
      description:
        'Chyť v divočině Pokémony podle zadaného pravidla, otevři inventář seřazený podle Recent, zapni filtr age0 a nahraj screenshot. OCR automaticky ověří tvůj pokus a zařadí tě do slosování.',
      rules: [
        'V horní vyhledávací liště inventáře musí být viditelný filtr age0.',
        'Pokémoni nesmí být přejmenovaní, kontroluje se oproti Pokédexu.',
        'Každý trenér má 1 pokus.',
      ],
      prizes: ['1. místo: ', '2. místo: '],
      status: 'draft',
      contestType: 'inventory_combo',
      startDate: toLocalDatetimeInput(now),
      endDate: toLocalDatetimeInput(nextWeek),
      registrationEnabled: true,
      showQualifiedList: false,
      motif: { mode: 'pokemon', pokemonDexId: 133, pokemonName: 'Eevee', shiny: true },
      inventoryComboConfig: {
        ruleMode: 'alphabetical',
        comboLength: 3,
        targetWord: 'POG',
        requiredPokemon: [],
        requireAge0: true,
      },
      winners: [],
      pinned: false,
    };
  }

  if (template === 'stats_delta') {
    return {
      title: 'Výzva statistik trenéra',
      subtitle: 'Zapiš startovní hodnoty, zahraj si a splň požadovaný rozdíl',
      description:
        'V 1. fázi zadej své startovní statistiky z profilu trenéra. Po otevření 2. fáze zadej pod stejným trenérským jménem aktualizované hodnoty. Pokud splníš požadovaný rozdíl, automaticky se zařadíš do slosování.',
      rules: [
        'V obou fázích zadej přesně stejné trenérské jméno.',
        'Po odevzdání 2. fáze se výsledek vyhodnotí a uzamkne.',
      ],
      prizes: ['1. místo: ', '2. místo: '],
      status: 'draft',
      contestType: 'stats_delta',
      startDate: toLocalDatetimeInput(in24h),
      endDate: toLocalDatetimeInput(nextWeek),
      registrationEnabled: true,
      showQualifiedList: false,
      motif: { mode: 'pokemon', pokemonDexId: 448, pokemonName: 'Lucario', shiny: false },
      statsDeltaConfig: {
        matchMode: 'all',
        minMetricsRequired: 2,
        metrics: DEFAULT_STATS_METRICS.map((m) => ({ ...m })),
      },
      winners: [],
      pinned: false,
    };
  }

  return {
    title: '',
    subtitle: '',
    description: '',
    rules: [''],
    prizes: [''],
    status: 'draft',
    contestType: 'registration',
    gameModule: null,
    startDate: toLocalDatetimeInput(now),
    endDate: toLocalDatetimeInput(nextWeek),
    registrationEnabled: true,
    requireAnswer: false,
    answerPrompt: '',
    requireContact: false,
    contactPrompt: '',
    externalUrl: '',
    externalUrlLabel: '',
    showQualifiedList: false,
    motif: {
      mode: 'pokemon',
      pokemonDexId: 25,
      pokemonName: 'Pikachu',
      shiny: false,
    },
    winners: [],
    pinned: false,
  };
}

function compressImageToDataUrl(file: File, maxWidth = 900, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Nepodařilo se načíst soubor.'));
    reader.onload = () => {
      const img = new window.Image();
      img.onerror = () => reject(new Error('Soubor není platný obrázek.'));
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
        const dataUrl = canvas.toDataURL('image/webp', quality);
        const finalUrl =
          dataUrl.startsWith('data:image/webp') && dataUrl.length < 550_000
            ? dataUrl
            : canvas.toDataURL('image/jpeg', 0.78);
        if (finalUrl.length > 580_000) {
          reject(new Error('Obrázek je příliš velký i po kompresi. Zkus prosím menší obrázek.'));
          return;
        }
        resolve(finalUrl);
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

export const ContestAdminView: React.FC = () => {
  // Auth state
  const [token, setToken] = useState<string>('');
  const [loggedInUser, setLoggedInUser] = useState<string>('');
  const [authChecking, setAuthChecking] = useState<boolean>(true);
  const [usernameInput, setUsernameInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState<boolean>(false);

  // Dashboard state
  const [activeTab, setActiveTab] = useState<AdminTab>('contests');
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [settings, setSettings] = useState<ContestHubSettings>({
    groupName: 'Lokální Pokémon GO komunita',
    hubTitle: 'Komunitní soutěže',
    hubSubtitle: '',
    announcement: '',
    communityUrl: '',
    communityLabel: '',
  });
  const [contests, setContests] = useState<ContestItem[]>([]);
  const [entries, setEntries] = useState<ContestEntry[]>([]);
  const [gcsStatus, setGcsStatus] = useState<AdminContestsStateResponse['gcsStatus']>();
  const [ocrUsage, setOcrUsage] = useState<OcrMonthlyUsage | undefined>();
  const [toast, setToast] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Contest editor state
  const [selectedId, setSelectedId] = useState<string | 'new' | null>(null);
  const [draft, setDraft] = useState<Partial<ContestItem>>(createTemplateContest('registration'));
  const [statusFilter, setStatusFilter] = useState<'all' | ContestStatus>('all');
  const [savingContest, setSavingContest] = useState<boolean>(false);
  const [pokemonQuery, setPokemonQuery] = useState<string>('');
  const [requiredPokeInput, setRequiredPokeInput] = useState<string>('');
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Custom metric adder & raw threshold inputs for Stats Delta (no browser number validation)
  const [thresholdInputs, setThresholdInputs] = useState<Record<string, string>>({});
  const [newMetricLabel, setNewMetricLabel] = useState<string>('');
  const [newMetricUnit, setNewMetricUnit] = useState<string>('ks');
  const [newMetricThreshold, setNewMetricThreshold] = useState<string>('5');
  const [newMetricDecimal, setNewMetricDecimal] = useState<boolean>(false);

  // Entries & Raffle state
  const [raffleContestId, setRaffleContestId] = useState<string>('');
  const [entrySearch, setEntrySearch] = useState<string>('');
  const [entryStatusFilter, setEntryStatusFilter] = useState<'all' | ContestEntryStatus>('all');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [manualTrainerName, setManualTrainerName] = useState<string>('');
  const [manualNote, setManualNote] = useState<string>('');
  const [drawCount, setDrawCount] = useState<number>(1);
  const [excludeExisting, setExcludeExisting] = useState<boolean>(true);
  const [drawing, setDrawing] = useState<boolean>(false);
  const [lastDrawn, setLastDrawn] = useState<ContestWinner[] | null>(null);

  // QR generator state
  const [qrBaseUrl, setQrBaseUrl] = useState<string>('https://pogoevents.app/cs/soutez');
  const [qrContestSlug, setQrContestSlug] = useState<string>('');
  const [qrPngUrl, setQrPngUrl] = useState<string>('');
  const [qrSvgMarkup, setQrSvgMarkup] = useState<string>('');
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);

  // Settings save state
  const [savingSettings, setSavingSettings] = useState<boolean>(false);

  const showToast = useCallback((type: 'success' | 'error', text: string) => {
    setToast({ type, text });
    setTimeout(() => {
      setToast((prev) => (prev?.text === text ? null : prev));
    }, 4500);
  }, []);

  const authHeaders = useCallback(
    (overrideToken?: string): Record<string, string> => ({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${overrideToken || token}`,
    }),
    [token]
  );

  const loadAdminState = useCallback(
    async (activeToken?: string) => {
      const t = activeToken || token;
      if (!t) return;
      setLoadingState(true);
      try {
        const res = await apiFetch('/api/contests/admin/state', {
          headers: { Authorization: `Bearer ${t}` },
        });
        if (res.status === 401 || res.status === 403) {
          sessionStorage.removeItem(TOKEN_STORAGE_KEY);
          setToken('');
          return;
        }
        if (!res.ok) throw new Error('Nepodařilo se načíst data administrace.');
        const data: AdminContestsStateResponse = await res.json();
        setSettings(data.settings);
        setContests(Array.isArray(data.contests) ? data.contests : []);
        setEntries(Array.isArray(data.entries) ? data.entries : []);
        setGcsStatus(data.gcsStatus);
        setOcrUsage(data.ocrUsage);
        if (!raffleContestId && data.contests.length > 0) {
          setRaffleContestId(data.contests[0].id);
        }
      } catch (err: any) {
        showToast('error', err?.message || 'Chyba při načítání dat.');
      } finally {
        setLoadingState(false);
      }
    },
    [token, raffleContestId, showToast]
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.location.origin && !window.location.origin.includes('localhost')) {
      setQrBaseUrl(`${window.location.origin}/cs/soutez`);
    }
    const saved = sessionStorage.getItem(TOKEN_STORAGE_KEY);
    const savedUser = sessionStorage.getItem(USERNAME_STORAGE_KEY) || 'admin';
    if (!saved) {
      setAuthChecking(false);
      return;
    }
    (async () => {
      try {
        const res = await apiFetch('/api/contests/admin/verify', {
          headers: { Authorization: `Bearer ${saved}` },
        });
        if (res.ok) {
          setToken(saved);
          setLoggedInUser(savedUser);
          await loadAdminState(saved);
        } else {
          sessionStorage.removeItem(TOKEN_STORAGE_KEY);
        }
      } catch {
        sessionStorage.removeItem(TOKEN_STORAGE_KEY);
      } finally {
        setAuthChecking(false);
      }
    })();
  }, []);

  const effectiveQrUrl = useMemo(() => {
    const cleanBase = qrBaseUrl.trim().replace(/\/+$/, '') || 'https://pogoevents.app/cs/soutez';
    return qrContestSlug ? `${cleanBase}#soutez-${qrContestSlug}` : cleanBase;
  }, [qrBaseUrl, qrContestSlug]);

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    (async () => {
      try {
        const [png, svg] = await Promise.all([
          QRCode.toDataURL(effectiveQrUrl, {
            width: 1024,
            margin: 2,
            color: { dark: '#0f1015', light: '#ffffff' },
            errorCorrectionLevel: 'H',
          }),
          QRCode.toString(effectiveQrUrl, {
            type: 'svg',
            margin: 2,
            color: { dark: '#0f1015', light: '#ffffff' },
            errorCorrectionLevel: 'H',
          }),
        ]);
        if (!cancelled) {
          setQrPngUrl(png);
          setQrSvgMarkup(svg);
        }
      } catch (err) {
        console.error('QR generation failed:', err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [effectiveQrUrl, token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoggingIn(true);
    try {
      const res = await apiFetch('/api/contests/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: usernameInput.trim(),
          password: passwordInput,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.token) {
        throw new Error(data.error || 'Neplatné přihlašovací údaje.');
      }
      sessionStorage.setItem(TOKEN_STORAGE_KEY, data.token);
      sessionStorage.setItem(USERNAME_STORAGE_KEY, data.username || usernameInput.trim());
      setToken(data.token);
      setLoggedInUser(data.username || usernameInput.trim());
      setPasswordInput('');
      await loadAdminState(data.token);
    } catch (err: any) {
      setLoginError(err?.message || 'Přihlášení se nezdařilo.');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await apiFetch('/api/contests/admin/logout', {
        method: 'POST',
        headers: authHeaders(),
      });
    } catch {}
    sessionStorage.removeItem(TOKEN_STORAGE_KEY);
    sessionStorage.removeItem(USERNAME_STORAGE_KEY);
    setToken('');
    setLoggedInUser('');
  };

  const selectContestForEdit = (contest: ContestItem) => {
    setSelectedId(contest.id);
    const metrics = contest.statsDeltaConfig
      ? contest.statsDeltaConfig.metrics.map((m) => ({ ...m }))
      : DEFAULT_STATS_METRICS.map((m) => ({ ...m }));
    setThresholdInputs(
      Object.fromEntries(metrics.map((m) => [m.id, String(m.threshold ?? '')]))
    );
    setDraft({
      ...contest,
      startDate: isoToDatetimeLocal(contest.startDate),
      endDate: isoToDatetimeLocal(contest.endDate),
      rules: contest.rules?.length ? [...contest.rules] : [''],
      prizes: contest.prizes?.length ? [...contest.prizes] : [''],
      winners: contest.winners ? contest.winners.map((w) => ({ ...w })) : [],
      motif: contest.motif
        ? { ...contest.motif }
        : { mode: 'pokemon', pokemonDexId: 25, pokemonName: 'Pikachu', shiny: false },
      inventoryComboConfig: contest.inventoryComboConfig
        ? { ...contest.inventoryComboConfig }
        : { ruleMode: 'alphabetical', comboLength: 3, targetWord: 'POG', requiredPokemon: [], requireAge0: true },
      statsDeltaConfig: contest.statsDeltaConfig
        ? {
            ...contest.statsDeltaConfig,
            baselineDeadline: undefined,
            finalOpenAt: undefined,
            metrics,
          }
        : {
            matchMode: 'all',
            minMetricsRequired: 2,
            metrics,
          },
    });
  };

  const startNewTemplate = (template: 'registration' | 'inventory_combo' | 'stats_delta') => {
    setSelectedId('new');
    const created = createTemplateContest(template);
    const metrics = created.statsDeltaConfig?.metrics || DEFAULT_STATS_METRICS;
    setThresholdInputs(
      Object.fromEntries(metrics.map((m) => [m.id, String(m.threshold ?? '')]))
    );
    setDraft(created);
  };

  const handleSaveContest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.title?.trim()) {
      showToast('error', 'Zadej název soutěže.');
      return;
    }
    setSavingContest(true);
    try {
      const statsCfg =
        draft.contestType === 'stats_delta' && draft.statsDeltaConfig
          ? {
              ...draft.statsDeltaConfig,
              baselineDeadline: undefined,
              finalOpenAt: undefined,
              metrics: draft.statsDeltaConfig.metrics.map((m) => {
                const rawStr = thresholdInputs[m.id];
                if (rawStr === undefined) return m;
                const parsed = Number(rawStr.replace(/\s+/g, '').replace(',', '.'));
                return {
                  ...m,
                  threshold: Number.isFinite(parsed) && parsed >= 0 ? parsed : m.threshold,
                };
              }),
            }
          : undefined;

      const payload = {
        ...draft,
        rules: (draft.rules || []).map((r) => r.trim()).filter(Boolean),
        prizes: (draft.prizes || []).map((p) => p.trim()).filter(Boolean),
        startDate: draft.startDate ? new Date(draft.startDate).toISOString() : undefined,
        endDate: draft.endDate ? new Date(draft.endDate).toISOString() : undefined,
        inventoryComboConfig:
          draft.contestType === 'inventory_combo' ? draft.inventoryComboConfig : undefined,
        statsDeltaConfig: statsCfg,
      };
      const isNew = selectedId === 'new' || !draft.id;
      const url = isNew
        ? '/api/contests/admin/contests'
        : `/api/contests/admin/contests/${encodeURIComponent(draft.id!)}`;
      const res = await apiFetch(url, {
        method: isNew ? 'POST' : 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Uložení soutěže selhalo.');
      await loadAdminState();
      if (data.contest) {
        selectContestForEdit(data.contest);
      }
      showToast('success', isNew ? 'Soutěž byla vytvořena!' : 'Změny soutěže byly uloženy.');
    } catch (err: any) {
      showToast('error', err?.message || 'Chyba při ukládání soutěže.');
    } finally {
      setSavingContest(false);
    }
  };

  const handleDeleteContest = async (id: string) => {
    if (!window.confirm('Opravdu chceš trvale smazat tuto soutěž včetně všech přihlášek?')) {
      return;
    }
    try {
      const res = await apiFetch(`/api/contests/admin/contests/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error('Smazání soutěže se nezdařilo.');
      if (selectedId === id) {
        setSelectedId(null);
      }
      await loadAdminState();
      showToast('success', 'Soutěž byla smazána.');
    } catch (err: any) {
      showToast('error', err?.message || 'Chyba při mazání.');
    }
  };

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const dataUrl = await compressImageToDataUrl(file);
      setDraft((prev) => ({
        ...prev,
        motif: { mode: 'image', imageUrl: dataUrl },
      }));
      showToast('success', 'Obrázek byl nahrán a zkomprimován.');
    } catch (err: any) {
      showToast('error', err?.message || 'Nahrání obrázku selhalo.');
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleAddCustomMetric = () => {
    const label = newMetricLabel.trim();
    const threshold = Number(newMetricThreshold.replace(/\s+/g, '').replace(',', '.'));
    if (!label || !Number.isFinite(threshold) || threshold < 0) {
      showToast('error', 'Zadej název vlastní statistiky a číselný cílový rozdíl.');
      return;
    }
    const id = `custom_${label
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .slice(0, 24)}_${Date.now().toString().slice(-3)}`;

    setThresholdInputs((prev) => ({ ...prev, [id]: newMetricThreshold.trim() || String(threshold) }));
    setDraft((prev) => {
      const cur = prev.statsDeltaConfig || {
        matchMode: 'all',
        minMetricsRequired: 1,
        metrics: DEFAULT_STATS_METRICS.map((m) => ({ ...m })),
      };
      return {
        ...prev,
        statsDeltaConfig: {
          ...cur,
          metrics: [
            ...cur.metrics,
            {
              id,
              label,
              unit: newMetricUnit.trim() || 'ks',
              enabled: true,
              threshold,
              allowDecimal: newMetricDecimal,
              isCustom: true,
            },
          ],
        },
      };
    });
    setNewMetricLabel('');
    setNewMetricUnit('ks');
    setNewMetricThreshold('5');
    setNewMetricDecimal(false);
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      const res = await apiFetch('/api/contests/admin/settings', {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(settings),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Uložení nastavení selhalo.');
      if (data.settings) setSettings(data.settings);
      showToast('success', 'Nastavení stránky soutěží bylo uloženo.');
    } catch (err: any) {
      showToast('error', err?.message || 'Chyba při ukládání nastavení.');
    } finally {
      setSavingSettings(false);
    }
  };

  const handleAddManualEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!raffleContestId || !manualTrainerName.trim()) return;
    try {
      const res = await apiFetch(
        `/api/contests/admin/contests/${encodeURIComponent(raffleContestId)}/entries`,
        {
          method: 'POST',
          headers: authHeaders(),
          body: JSON.stringify({
            trainerName: manualTrainerName.trim(),
            answer: manualNote.trim() || undefined,
          }),
        }
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Přidání účastníka selhalo.');
      setManualTrainerName('');
      setManualNote('');
      await loadAdminState();
      showToast('success', `Účastník „${data.entry?.trainerName}“ byl přidán jako schválený.`);
    } catch (err: any) {
      showToast('error', err?.message || 'Chyba při přidávání účastníka.');
    }
  };

  const handleOverrideEntryStatus = async (
    contestId: string,
    entryId: string,
    status: ContestEntryStatus
  ) => {
    try {
      const res = await apiFetch(
        `/api/contests/admin/contests/${encodeURIComponent(contestId)}/entries/${encodeURIComponent(entryId)}`,
        {
          method: 'PATCH',
          headers: authHeaders(),
          body: JSON.stringify({ status }),
        }
      );
      if (!res.ok) throw new Error('Změna stavu selhala.');
      await loadAdminState();
      showToast(
        'success',
        status === 'approved'
          ? 'Přihláška schválena do slosování.'
          : status === 'rejected'
            ? 'Přihláška vyřazena.'
            : 'Přihláška označena ke kontrole.'
      );
    } catch (err: any) {
      showToast('error', err?.message || 'Chyba při změně stavu.');
    }
  };

  const handleDeleteEntry = async (contestId: string, entryId: string) => {
    try {
      const res = await apiFetch(
        `/api/contests/admin/contests/${encodeURIComponent(contestId)}/entries/${encodeURIComponent(entryId)}`,
        {
          method: 'DELETE',
          headers: authHeaders(),
        }
      );
      if (!res.ok) throw new Error('Odstranění přihlášky selhalo.');
      await loadAdminState();
      showToast('success', 'Přihláška byla odstraněna.');
    } catch (err: any) {
      showToast('error', err?.message || 'Chyba při odstraňování.');
    }
  };

  const handleRunDraw = async (saveToWinners: boolean) => {
    if (!raffleContestId) return;
    setDrawing(true);
    setLastDrawn(null);
    try {
      const res = await apiFetch(
        `/api/contests/admin/contests/${encodeURIComponent(raffleContestId)}/draw`,
        {
          method: 'POST',
          headers: authHeaders(),
          body: JSON.stringify({
            count: drawCount,
            excludeExistingWinners: excludeExisting,
            saveToWinners,
          }),
        }
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Losování se nezdařilo.');
      setLastDrawn(data.drawn || []);
      if (saveToWinners) {
        await loadAdminState();
        showToast('success', `Vylosováno a zveřejněno ${data.drawn?.length || 0} výherců!`);
      } else {
        showToast('success', 'Zkušební losování proběhlo, výherci zatím nejsou uloženi.');
      }
    } catch (err: any) {
      showToast('error', err?.message || 'Chyba při losování.');
    } finally {
      setDrawing(false);
    }
  };

  const handleDownloadQrPng = () => {
    if (!qrPngUrl) return;
    const link = document.createElement('a');
    link.href = qrPngUrl;
    link.download = qrContestSlug ? `qr-soutez-${qrContestSlug}.png` : 'qr-soutez-pogo.png';
    link.click();
  };

  const handleDownloadQrSvg = () => {
    if (!qrSvgMarkup) return;
    const blob = new Blob([qrSvgMarkup], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = qrContestSlug ? `qr-soutez-${qrContestSlug}.svg` : 'qr-soutez-pogo.svg';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyQrUrl = async () => {
    try {
      await navigator.clipboard.writeText(effectiveQrUrl);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch {}
  };

  const handleExportEntriesCsv = () => {
    const contestEntries = entries.filter((e) => e.contestId === raffleContestId);
    const header = ['Trenér', 'Stav', 'Poznámka / Výsledek', 'Kontakt', 'Datum'];
    const rows = contestEntries.map((e) => [
      e.trainerName,
      e.status,
      e.statusReason || e.answer || '',
      e.contact || '',
      new Date(e.createdAt).toLocaleString('cs-CZ'),
    ]);
    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `prihlasky-${raffleContestId}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const pokemonSuggestions = useMemo(() => {
    const q = pokemonQuery.trim().toLowerCase();
    if (!q) return POKEDEX_CATALOG.slice(0, 12);
    return POKEDEX_CATALOG.filter(
      (p) =>
        p.names.en.toLowerCase().includes(q) ||
        p.names.cs.toLowerCase().includes(q) ||
        String(p.dexId) === q
    ).slice(0, 16);
  }, [pokemonQuery]);

  const filteredContests = useMemo(
    () =>
      statusFilter === 'all'
        ? contests
        : contests.filter((c) => c.status === statusFilter),
    [contests, statusFilter]
  );

  const selectedRaffleContest = useMemo(
    () => contests.find((c) => c.id === raffleContestId) || null,
    [contests, raffleContestId]
  );

  const contestAllEntries = useMemo(
    () => entries.filter((e) => e.contestId === raffleContestId),
    [entries, raffleContestId]
  );

  const approvedCount = useMemo(
    () => contestAllEntries.filter((e) => e.status === 'approved').length,
    [contestAllEntries]
  );

  const pendingCount = useMemo(
    () => contestAllEntries.filter((e) => e.status === 'pending_review').length,
    [contestAllEntries]
  );

  const filteredRaffleEntries = useMemo(() => {
    const q = entrySearch.trim().toLowerCase();
    return contestAllEntries
      .filter((e) => entryStatusFilter === 'all' || e.status === entryStatusFilter)
      .filter(
        (e) =>
          !q ||
          e.trainerName.toLowerCase().includes(q) ||
          (e.answer && e.answer.toLowerCase().includes(q)) ||
          (e.statusReason && e.statusReason.toLowerCase().includes(q)) ||
          (e.contact && e.contact.toLowerCase().includes(q))
      );
  }, [contestAllEntries, entryStatusFilter, entrySearch]);

  if (authChecking) {
    return (
      <div className="cadmin-login-wrap">
        <div className="cadmin-login-card">
          <RefreshCw size={28} className="cadmin-spin cadmin-login-icon" />
          <p>Ověřuji přihlášení...</p>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="cadmin-login-wrap">
        <div className="cadmin-login-card">
          <div className="cadmin-login-icon-badge">
            <Lock size={28} />
          </div>
          <h2>Administrace soutěží</h2>
          <p className="cadmin-login-sub">
            Přihlášení do soukromé správy lokálních soutěží <code>/cs/soutez/admin</code>
          </p>

          <form className="cadmin-login-form" onSubmit={handleLogin}>
            <div className="cadmin-input-group">
              <label htmlFor="contest-admin-user">Uživatelské jméno</label>
              <div className="cadmin-input-with-icon">
                <User size={16} />
                <input
                  id="contest-admin-user"
                  type="text"
                  autoComplete="username"
                  required
                  placeholder="Zadej přihlašovací jméno"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                />
              </div>
            </div>

            <div className="cadmin-input-group">
              <label htmlFor="contest-admin-pass">Heslo</label>
              <div className="cadmin-input-with-icon">
                <KeyRound size={16} />
                <input
                  id="contest-admin-pass"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  placeholder="Zadej heslo"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                />
                <button
                  type="button"
                  className="cadmin-eye-btn"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label="Zobrazit nebo skrýt heslo"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="cadmin-alert error">
                <AlertCircle size={16} />
                <span>{loginError}</span>
              </div>
            )}

            <button type="submit" className="cadmin-btn primary full" disabled={loggingIn}>
              <Lock size={16} />
              <span>{loggingIn ? 'Přihlašuji...' : 'Přihlásit se'}</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  const previewMotifUrl = getContestMotifImageUrl(draft.motif);

  return (
    <div className="cadmin-root">
      {/* Header */}
      <header className="cadmin-header">
        <div className="cadmin-header-left">
          <div className="cadmin-header-icon">
            <Trophy size={22} />
          </div>
          <div>
            <div className="cadmin-title-row">
              <h1>Správa soutěží</h1>
              <span className="cadmin-user-pill">@{loggedInUser}</span>
              {ocrUsage && (
                <span className="cadmin-ocr-pill" title="Měsíční využití Google Cloud Vision API – limit 950 za měsíc">
                  <ScanLine size={12} />
                  <span>
                    OCR Vision: {ocrUsage.visionCalls} / {ocrUsage.visionLimit}
                  </span>
                </span>
              )}
            </div>
            <p className="cadmin-header-sub">
              Konfigurace portálu <code>/cs/soutez</code> • {contests.length} soutěží •{' '}
              {entries.length} přihlášek
            </p>
          </div>
        </div>

        <div className="cadmin-header-actions">
          <a
            href="/cs/soutez"
            target="_blank"
            rel="noopener noreferrer"
            className="cadmin-btn secondary"
          >
            <ExternalLink size={15} />
            <span>Otevřít /cs/soutez</span>
          </a>
          <button
            type="button"
            className="cadmin-btn secondary"
            onClick={() => loadAdminState()}
            disabled={loadingState}
          >
            <RefreshCw size={15} className={loadingState ? 'cadmin-spin' : ''} />
            <span>Obnovit</span>
          </button>
          <button type="button" className="cadmin-btn danger-outline" onClick={handleLogout}>
            <LogOut size={15} />
            <span>Odhlásit</span>
          </button>
        </div>
      </header>

      {toast && (
        <div className={`cadmin-alert ${toast.type}`}>
          {toast.type === 'success' ? <CheckCircle2 size={17} /> : <AlertCircle size={17} />}
          <span>{toast.text}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <nav className="cadmin-tabs" aria-label="Sekce administrace">
        <button
          type="button"
          className={`cadmin-tab-btn ${activeTab === 'contests' ? 'active' : ''}`}
          onClick={() => setActiveTab('contests')}
        >
          <Trophy size={16} />
          <span>Soutěže · {contests.length}</span>
        </button>
        <button
          type="button"
          className={`cadmin-tab-btn ${activeTab === 'entries' ? 'active' : ''}`}
          onClick={() => setActiveTab('entries')}
        >
          <Dices size={16} />
          <span>Přihlášky &amp; Losování · {entries.length}</span>
        </button>
        <button
          type="button"
          className={`cadmin-tab-btn ${activeTab === 'qr' ? 'active' : ''}`}
          onClick={() => setActiveTab('qr')}
        >
          <QrCode size={16} />
          <span>QR Kód &amp; Sdílení</span>
        </button>
        <button
          type="button"
          className={`cadmin-tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <Settings size={16} />
          <span>Nastavení stránky</span>
        </button>
      </nav>

      {/* TAB 1: CONTESTS CRUD */}
      {activeTab === 'contests' && (
        <div className="cadmin-split-layout">
          <aside className="cadmin-sidebar">
            <div className="cadmin-template-btns">
              <button
                type="button"
                className="cadmin-btn primary full"
                onClick={() => startNewTemplate('inventory_combo')}
              >
                <ScanLine size={15} />
                <span>+ Inventářová štafeta</span>
              </button>
              <button
                type="button"
                className="cadmin-btn cyan full"
                onClick={() => startNewTemplate('stats_delta')}
              >
                <BarChart3 size={15} />
                <span>+ Statistiky trenéra</span>
              </button>
              <button
                type="button"
                className="cadmin-btn secondary full"
                onClick={() => startNewTemplate('registration')}
              >
                <Plus size={15} />
                <span>+ Klasická soutěž</span>
              </button>
            </div>

            <div className="cadmin-filter-pills">
              {(['all', 'active', 'upcoming', 'finished', 'draft'] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  className={`cadmin-mini-pill ${statusFilter === st ? 'active' : ''}`}
                  onClick={() => setStatusFilter(st)}
                >
                  {st === 'all'
                    ? 'Vše'
                    : st === 'active'
                      ? 'Aktivní'
                      : st === 'upcoming'
                        ? 'Brzy'
                        : st === 'finished'
                          ? 'Archiv'
                          : 'Koncept'}
                </button>
              ))}
            </div>

            <div className="cadmin-contest-list">
              {filteredContests.length === 0 ? (
                <div className="cadmin-empty-list">
                  Zatím tu není žádná soutěž. Vyber si šablonu nahoře.
                </div>
              ) : (
                filteredContests.map((c) => {
                  const totalC = entries.filter((e) => e.contestId === c.id).length;
                  const approvedC = entries.filter(
                    (e) => e.contestId === c.id && e.status === 'approved'
                  ).length;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      className={`cadmin-contest-item ${selectedId === c.id ? 'selected' : ''}`}
                      onClick={() => selectContestForEdit(c)}
                    >
                      <div className="cadmin-item-badges">
                        <span className={`cadmin-status-tag ${c.status}`}>
                          {c.status === 'active'
                            ? 'Aktivní'
                            : c.status === 'upcoming'
                              ? 'Nadcházející'
                              : c.status === 'finished'
                                ? 'Archiv'
                                : 'Koncept'}
                        </span>
                        {c.contestType === 'inventory_combo' && (
                          <span className="cadmin-type-tag">OCR</span>
                        )}
                        {c.contestType === 'stats_delta' && (
                          <span className="cadmin-type-tag stats">Statistiky</span>
                        )}
                        <span className="cadmin-count-tag">
                          <Users size={11} /> {approvedC}/{totalC}
                        </span>
                      </div>
                      <div className="cadmin-item-title">{c.title}</div>
                      {c.winners.length > 0 && (
                        <div className="cadmin-item-winners">
                          <Award size={12} /> {c.winners.length} výherců
                        </div>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </aside>

          {/* Visual Contest Editor */}
          <section className="cadmin-editor-panel">
            {!selectedId ? (
              <div className="cadmin-placeholder">
                <Trophy size={44} />
                <h3>Vyber soutěž k úpravě nebo založ ze šablony</h3>
                <p>
                  Můžeš založit <strong>Inventářovou štafetu</strong>,{' '}
                  <strong>Výzvu statistik trenéra</strong> nebo klasickou soutěž.
                </p>
                <div className="cadmin-placeholder-btns">
                  <button
                    type="button"
                    className="cadmin-btn primary"
                    onClick={() => startNewTemplate('inventory_combo')}
                  >
                    <ScanLine size={16} />
                    <span>Šablona: Inventářová štafeta</span>
                  </button>
                  <button
                    type="button"
                    className="cadmin-btn cyan"
                    onClick={() => startNewTemplate('stats_delta')}
                  >
                    <BarChart3 size={16} />
                    <span>Šablona: Statistiky trenéra</span>
                  </button>
                </div>
              </div>
            ) : (
              <form className="cadmin-form" onSubmit={handleSaveContest}>
                <div className="cadmin-form-header">
                  <h3>{selectedId === 'new' ? 'Nová soutěž' : 'Úprava soutěže'}</h3>
                  <div className="cadmin-form-header-actions">
                    {selectedId !== 'new' && draft.id && (
                      <button
                        type="button"
                        className="cadmin-btn danger-outline"
                        onClick={() => handleDeleteContest(draft.id!)}
                      >
                        <Trash2 size={15} />
                        <span>Smazat</span>
                      </button>
                    )}
                    <button type="submit" className="cadmin-btn success" disabled={savingContest}>
                      <Save size={15} />
                      <span>{savingContest ? 'Ukládám...' : 'Uložit soutěž'}</span>
                    </button>
                  </div>
                </div>

                {/* Basic Fields */}
                <div className="cadmin-grid-2">
                  <div className="cadmin-field span-2">
                    <label>Název soutěže *</label>
                    <input
                      type="text"
                      required
                      maxLength={120}
                      placeholder="Např. Inventářová štafeta – Abecední postupka"
                      value={draft.title || ''}
                      onChange={(e) => setDraft((p) => ({ ...p, title: e.target.value }))}
                    />
                  </div>

                  <div className="cadmin-field span-2">
                    <label>Krátký podtitul</label>
                    <input
                      type="text"
                      maxLength={180}
                      value={draft.subtitle || ''}
                      onChange={(e) => setDraft((p) => ({ ...p, subtitle: e.target.value }))}
                    />
                  </div>

                  <div className="cadmin-field">
                    <label>Stav soutěže</label>
                    <select
                      value={draft.status || 'draft'}
                      onChange={(e) =>
                        setDraft((p) => ({ ...p, status: e.target.value as ContestStatus }))
                      }
                    >
                      <option value="draft">Koncept – skrytá</option>
                      <option value="upcoming">Nadcházející</option>
                      <option value="active">Aktivní</option>
                      <option value="finished">Ukončená – archiv</option>
                    </select>
                  </div>

                  <div className="cadmin-field">
                    <label>Šablona / Typ soutěže</label>
                    <select
                      value={draft.contestType || 'registration'}
                      onChange={(e) => {
                        const nextType = e.target.value as ContestType;
                        if (nextType === 'stats_delta' && !draft.statsDeltaConfig) {
                          setThresholdInputs(
                            Object.fromEntries(
                              DEFAULT_STATS_METRICS.map((m) => [m.id, String(m.threshold)])
                            )
                          );
                        }
                        setDraft((p) => ({
                          ...p,
                          contestType: nextType,
                          registrationEnabled:
                            nextType === 'inventory_combo' || nextType === 'stats_delta'
                              ? true
                              : p.registrationEnabled,
                          inventoryComboConfig:
                            nextType === 'inventory_combo'
                              ? p.inventoryComboConfig || {
                                  ruleMode: 'alphabetical',
                                  comboLength: 3,
                                  targetWord: 'POG',
                                  requiredPokemon: [],
                                  requireAge0: true,
                                }
                              : p.inventoryComboConfig,
                          statsDeltaConfig:
                            nextType === 'stats_delta'
                              ? p.statsDeltaConfig || {
                                  matchMode: 'all',
                                  minMetricsRequired: 2,
                                  metrics: DEFAULT_STATS_METRICS.map((m) => ({ ...m })),
                                }
                              : p.statsDeltaConfig,
                        }));
                      }}
                    >
                      <option value="inventory_combo">Šablona 1: Inventářová štafeta</option>
                      <option value="stats_delta">Šablona 2: Statistiky trenéra</option>
                      <option value="registration">Klasická soutěž / přihláška</option>
                      <option value="info">Pouze informační oznámení</option>
                    </select>
                  </div>

                  <div className="cadmin-field">
                    <label>
                      {draft.contestType === 'stats_delta'
                        ? 'První fáze (do kdy zadat start)'
                        : 'Začátek soutěže'}
                    </label>
                    <input
                      type="datetime-local"
                      value={draft.startDate || ''}
                      onChange={(e) => setDraft((p) => ({ ...p, startDate: e.target.value }))}
                    />
                  </div>

                  <div className="cadmin-field">
                    <label>
                      {draft.contestType === 'stats_delta'
                        ? 'Druhá fáze (do kdy odeslat cíl)'
                        : 'Konec soutěže'}
                    </label>
                    <input
                      type="datetime-local"
                      value={draft.endDate || ''}
                      onChange={(e) => setDraft((p) => ({ ...p, endDate: e.target.value }))}
                    />
                  </div>

                  <div className="cadmin-field span-2">
                    <label>Popis soutěže</label>
                    <textarea
                      rows={3}
                      maxLength={3000}
                      value={draft.description || ''}
                      onChange={(e) => setDraft((p) => ({ ...p, description: e.target.value }))}
                    />
                  </div>

                  <label className="cadmin-checkbox">
                    <input
                      type="checkbox"
                      checked={Boolean(draft.pinned)}
                      onChange={(e) => setDraft((p) => ({ ...p, pinned: e.target.checked }))}
                    />
                    <span>Připnout jako hlavní soutěž nahoru</span>
                  </label>

                  <label className="cadmin-checkbox">
                    <input
                      type="checkbox"
                      checked={Boolean(draft.showQualifiedList)}
                      onChange={(e) =>
                        setDraft((p) => ({ ...p, showQualifiedList: e.target.checked }))
                      }
                    />
                    <span>Zobrazit na /cs/soutez seznam kvalifikovaných trenérů</span>
                  </label>
                </div>

                {/* ── TEMPLATE 1 CONFIG: INVENTORY COMBO ───────────────────────── */}
                {draft.contestType === 'inventory_combo' && (
                  <div className="cadmin-section-box template-box">
                    <div className="cadmin-section-title">
                      <ScanLine size={16} />
                      <span>Konfigurace: Inventářová štafeta</span>
                    </div>

                    <div className="cadmin-grid-2">
                      <div className="cadmin-field">
                        <label>Pravidlo posloupnosti v inventáři</label>
                        <select
                          value={draft.inventoryComboConfig?.ruleMode || 'alphabetical'}
                          onChange={(e) =>
                            setDraft((p) => ({
                              ...p,
                              inventoryComboConfig: {
                                ruleMode: e.target.value as InventoryComboRuleMode,
                                comboLength: p.inventoryComboConfig?.comboLength || 3,
                                targetWord: p.inventoryComboConfig?.targetWord || 'POG',
                                requiredPokemon: p.inventoryComboConfig?.requiredPokemon || [],
                                requireAge0: p.inventoryComboConfig?.requireAge0 ?? true,
                              },
                            }))
                          }
                        >
                          <option value="alphabetical">
                            Abecední postupka – např. Bulbasaur → Caterpie → Eevee
                          </option>
                          <option value="word_cipher">
                            Slovní šifra z počátečních písmen – např. P-O-G, S-R-A-Z
                          </option>
                          <option value="specific_pokemon">
                            Konkrétní seznam Pokémonů k nachytání
                          </option>
                        </select>
                      </div>

                      {draft.inventoryComboConfig?.ruleMode === 'alphabetical' && (
                        <div className="cadmin-field">
                          <label>Počet Pokémonů v abecední řadě</label>
                          <input
                            type="text"
                            inputMode="numeric"
                            value={draft.inventoryComboConfig?.comboLength ?? 3}
                            onChange={(e) =>
                              setDraft((p) => ({
                                ...p,
                                inventoryComboConfig: {
                                  ...(p.inventoryComboConfig || {
                                    ruleMode: 'alphabetical',
                                    comboLength: 3,
                                    requireAge0: true,
                                  }),
                                  comboLength: Number(e.target.value) || 3,
                                },
                              }))
                            }
                          />
                        </div>
                      )}

                      {draft.inventoryComboConfig?.ruleMode === 'word_cipher' && (
                        <div className="cadmin-field">
                          <label>Cílové slovo šifry bez diakritiky</label>
                          <input
                            type="text"
                            maxLength={10}
                            placeholder="Např. POG"
                            value={draft.inventoryComboConfig?.targetWord || ''}
                            onChange={(e) =>
                              setDraft((p) => ({
                                ...p,
                                inventoryComboConfig: {
                                  ...(p.inventoryComboConfig || {
                                    ruleMode: 'word_cipher',
                                    comboLength: 3,
                                    requireAge0: true,
                                  }),
                                  targetWord: e.target.value.toUpperCase(),
                                },
                              }))
                            }
                          />
                        </div>
                      )}
                    </div>

                    {draft.inventoryComboConfig?.ruleMode === 'specific_pokemon' && (
                      <div className="cadmin-field">
                        <label>Požadovaní Pokémoni</label>
                        <div className="cadmin-row-input">
                          <input
                            type="text"
                            placeholder="Např. Pikachu"
                            value={requiredPokeInput}
                            onChange={(e) => setRequiredPokeInput(e.target.value)}
                          />
                          <button
                            type="button"
                            className="cadmin-small-add"
                            onClick={() => {
                              const name = requiredPokeInput.trim();
                              if (!name) return;
                              setDraft((p) => ({
                                ...p,
                                inventoryComboConfig: {
                                  ...(p.inventoryComboConfig || {
                                    ruleMode: 'specific_pokemon',
                                    comboLength: 3,
                                    requireAge0: true,
                                  }),
                                  requiredPokemon: [
                                    ...(p.inventoryComboConfig?.requiredPokemon || []),
                                    name,
                                  ],
                                },
                              }));
                              setRequiredPokeInput('');
                            }}
                          >
                            <Plus size={13} /> Přidat
                          </button>
                        </div>
                        <div className="cadmin-poke-chips">
                          {(draft.inventoryComboConfig?.requiredPokemon || []).map((pName, idx) => (
                            <span key={idx} className="cadmin-req-poke-tag">
                              {pName}
                              <button
                                type="button"
                                onClick={() =>
                                  setDraft((p) => ({
                                    ...p,
                                    inventoryComboConfig: {
                                      ...p.inventoryComboConfig!,
                                      requiredPokemon: (
                                        p.inventoryComboConfig?.requiredPokemon || []
                                      ).filter((_, i) => i !== idx),
                                    },
                                  }))
                                }
                              >
                                <X size={12} />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <label className="cadmin-checkbox">
                      <input
                        type="checkbox"
                        checked={draft.inventoryComboConfig?.requireAge0 ?? true}
                        onChange={(e) =>
                          setDraft((p) => ({
                            ...p,
                            inventoryComboConfig: {
                              ...(p.inventoryComboConfig || {
                                ruleMode: 'alphabetical',
                                comboLength: 3,
                                requireAge0: true,
                              }),
                              requireAge0: e.target.checked,
                            },
                          }))
                        }
                      />
                      <span>Vyžadovat viditelný vyhledávací filtr „age0“ na screenshotu inventáře</span>
                    </label>
                  </div>
                )}

                {/* ── TEMPLATE 2 CONFIG: STATS DELTA ───────────────────────────── */}
                {draft.contestType === 'stats_delta' && draft.statsDeltaConfig && (
                  <div className="cadmin-section-box template-box stats-box">
                    <div className="cadmin-section-title">
                      <BarChart3 size={16} />
                      <span>Konfigurace: Statistiky trenéra</span>
                    </div>

                    <div className="cadmin-grid-2">
                      <div className="cadmin-field">
                        <label>Podmínka zařazení do slosování</label>
                        <select
                          value={draft.statsDeltaConfig.matchMode}
                          onChange={(e) =>
                            setDraft((p) => ({
                              ...p,
                              statsDeltaConfig: {
                                ...p.statsDeltaConfig!,
                                matchMode: e.target.value as 'all' | 'min_count',
                              },
                            }))
                          }
                        >
                          <option value="all">Splnit všechny zapnuté statistiky</option>
                          <option value="min_count">Splnit alespoň X ze zapnutých statistik</option>
                        </select>
                      </div>

                      {draft.statsDeltaConfig.matchMode === 'min_count' && (
                        <div className="cadmin-field">
                          <label>Minimální počet splněných statistik</label>
                          <input
                            type="text"
                            inputMode="numeric"
                            value={draft.statsDeltaConfig.minMetricsRequired ?? 1}
                            onChange={(e) =>
                              setDraft((p) => ({
                                ...p,
                                statsDeltaConfig: {
                                  ...p.statsDeltaConfig!,
                                  minMetricsRequired: Number(e.target.value) || 1,
                                },
                              }))
                            }
                          />
                        </div>
                      )}
                    </div>

                    {/* Metrics List */}
                    <div className="cadmin-metrics-list">
                      <label className="cadmin-sub-label">
                        Vyber sledované statistiky a požadovaný rozdíl:
                      </label>
                      {draft.statsDeltaConfig.metrics.map((metric, idx) => (
                        <div
                          key={metric.id}
                          className={`cadmin-metric-row ${metric.enabled ? 'enabled' : ''}`}
                        >
                          <label className="cadmin-checkbox-inline">
                            <input
                              type="checkbox"
                              checked={metric.enabled}
                              onChange={(e) => {
                                const next = [...draft.statsDeltaConfig!.metrics];
                                next[idx] = { ...metric, enabled: e.target.checked };
                                setDraft((p) => ({
                                  ...p,
                                  statsDeltaConfig: { ...p.statsDeltaConfig!, metrics: next },
                                }));
                              }}
                            />
                            <strong>{cleanMetricLabel(metric.label)}</strong>
                          </label>
                          <div className="cadmin-metric-threshold">
                            <span>Cíl +</span>
                            <input
                              type="text"
                              inputMode="decimal"
                              value={thresholdInputs[metric.id] ?? String(metric.threshold ?? '')}
                              onChange={(e) => {
                                const raw = e.target.value;
                                setThresholdInputs((prev) => ({ ...prev, [metric.id]: raw }));
                                const parsed = Number(raw.replace(/\s+/g, '').replace(',', '.'));
                                if (raw.trim() !== '' && Number.isFinite(parsed) && parsed >= 0) {
                                  const next = [...draft.statsDeltaConfig!.metrics];
                                  next[idx] = { ...metric, threshold: parsed };
                                  setDraft((p) => ({
                                    ...p,
                                    statsDeltaConfig: { ...p.statsDeltaConfig!, metrics: next },
                                  }));
                                }
                              }}
                            />
                            <span className="cadmin-metric-unit">{metric.unit}</span>
                            {metric.isCustom && (
                              <button
                                type="button"
                                className="cadmin-icon-remove"
                                onClick={() => {
                                  const next = draft.statsDeltaConfig!.metrics.filter(
                                    (_, i) => i !== idx
                                  );
                                  setDraft((p) => ({
                                    ...p,
                                    statsDeltaConfig: { ...p.statsDeltaConfig!, metrics: next },
                                  }));
                                }}
                                aria-label="Odebrat vlastní statistiku"
                              >
                                <Trash2 size={13} />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add Custom Metric */}
                    <div className="cadmin-custom-metric-adder">
                      <span className="cadmin-sub-label">Přidat vlastní statistiku:</span>
                      <div className="cadmin-custom-metric-grid">
                        <input
                          type="text"
                          placeholder="Název, např. Vylíhnutá vejce"
                          value={newMetricLabel}
                          onChange={(e) => setNewMetricLabel(e.target.value)}
                        />
                        <input
                          type="text"
                          placeholder="Jednotka, např. ks"
                          value={newMetricUnit}
                          onChange={(e) => setNewMetricUnit(e.target.value)}
                        />
                        <input
                          type="text"
                          inputMode="decimal"
                          placeholder="Cíl +"
                          value={newMetricThreshold}
                          onChange={(e) => setNewMetricThreshold(e.target.value)}
                        />
                        <button
                          type="button"
                          className="cadmin-small-add"
                          onClick={handleAddCustomMetric}
                        >
                          <Plus size={13} /> Přidat
                        </button>
                      </div>
                      <label className="cadmin-checkbox-inline">
                        <input
                          type="checkbox"
                          checked={newMetricDecimal}
                          onChange={(e) => setNewMetricDecimal(e.target.checked)}
                        />
                        <span>Povolit desetinná čísla</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Motif Selector */}
                <div className="cadmin-section-box">
                  <div className="cadmin-section-title">
                    <ImageIcon size={16} />
                    <span>Vizuální motiv soutěže</span>
                  </div>

                  <div className="cadmin-motif-toggle">
                    <button
                      type="button"
                      className={`cadmin-mini-pill ${draft.motif?.mode !== 'image' ? 'active' : ''}`}
                      onClick={() =>
                        setDraft((p) => ({
                          ...p,
                          motif: {
                            mode: 'pokemon',
                            pokemonDexId: p.motif?.pokemonDexId || 25,
                            pokemonName: p.motif?.pokemonName || 'Pikachu',
                            shiny: Boolean(p.motif?.shiny),
                          },
                        }))
                      }
                    >
                      <Sparkles size={13} />
                      <span>Vybrat Pokémona</span>
                    </button>
                    <button
                      type="button"
                      className={`cadmin-mini-pill ${draft.motif?.mode === 'image' ? 'active' : ''}`}
                      onClick={() =>
                        setDraft((p) => ({
                          ...p,
                          motif: {
                            mode: 'image',
                            imageUrl: p.motif?.imageUrl || '',
                          },
                        }))
                      }
                    >
                      <ImageIcon size={13} />
                      <span>Vlastní obrázek / Nahrát</span>
                    </button>
                  </div>

                  <div className="cadmin-motif-body">
                    <div className="cadmin-motif-preview">
                      {previewMotifUrl ? (
                        <img
                          src={previewMotifUrl}
                          alt="Náhled motivu"
                          className={
                            draft.motif?.mode === 'pokemon' ? 'preview-poke' : 'preview-banner'
                          }
                        />
                      ) : (
                        <Trophy size={32} />
                      )}
                    </div>

                    {draft.motif?.mode !== 'image' ? (
                      <div className="cadmin-motif-controls">
                        <div className="cadmin-search-wrap">
                          <Search size={14} />
                          <input
                            type="text"
                            placeholder="Hledat Pokémona podle jména nebo #Dex..."
                            value={pokemonQuery}
                            onChange={(e) => setPokemonQuery(e.target.value)}
                          />
                        </div>
                        <div className="cadmin-poke-chips">
                          {pokemonSuggestions.map((poke) => (
                            <button
                              key={poke.dexId}
                              type="button"
                              className={`cadmin-poke-chip ${
                                draft.motif?.pokemonDexId === poke.dexId ? 'active' : ''
                              }`}
                              onClick={() =>
                                setDraft((p) => ({
                                  ...p,
                                  motif: {
                                    mode: 'pokemon',
                                    pokemonDexId: poke.dexId,
                                    pokemonName: poke.names.cs || poke.names.en,
                                    shiny: Boolean(p.motif?.shiny),
                                  },
                                }))
                              }
                            >
                              <span>#{poke.dexId}</span> {poke.names.cs || poke.names.en}
                            </button>
                          ))}
                        </div>
                        <label className="cadmin-checkbox">
                          <input
                            type="checkbox"
                            checked={Boolean(draft.motif?.shiny)}
                            onChange={(e) =>
                              setDraft((p) => ({
                                ...p,
                                motif: {
                                  mode: 'pokemon',
                                  pokemonDexId: p.motif?.pokemonDexId || 25,
                                  pokemonName: p.motif?.pokemonName || 'Pikachu',
                                  shiny: e.target.checked,
                                },
                              }))
                            }
                          />
                          <span>✨ Zobrazit Shiny variantu Pokémona</span>
                        </label>
                      </div>
                    ) : (
                      <div className="cadmin-motif-controls">
                        <div className="cadmin-field">
                          <label>URL adresa obrázku</label>
                          <input
                            type="url"
                            placeholder="https://..."
                            value={
                              draft.motif?.imageUrl?.startsWith('data:')
                                ? ''
                                : draft.motif?.imageUrl || ''
                            }
                            onChange={(e) =>
                              setDraft((p) => ({
                                ...p,
                                motif: { mode: 'image', imageUrl: e.target.value },
                              }))
                            }
                          />
                        </div>
                        <div className="cadmin-upload-row">
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/png,image/jpeg,image/webp,image/gif"
                            onChange={handleImageFileUpload}
                            style={{ display: 'none' }}
                          />
                          <button
                            type="button"
                            className="cadmin-btn secondary"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploadingImage}
                          >
                            <Upload size={15} />
                            <span>
                              {uploadingImage ? 'Zpracovávám...' : 'Nahrát obrázek ze zařízení'}
                            </span>
                          </button>
                          {draft.motif?.imageUrl && (
                            <button
                              type="button"
                              className="cadmin-btn danger-outline"
                              onClick={() =>
                                setDraft((p) => ({
                                  ...p,
                                  motif: { mode: 'image', imageUrl: '' },
                                }))
                              }
                            >
                              Odstranit
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Prizes & Rules Lists */}
                <div className="cadmin-grid-2">
                  <div className="cadmin-section-box">
                    <div className="cadmin-section-header-row">
                      <span className="cadmin-section-title">Ceny / Odměny</span>
                      <button
                        type="button"
                        className="cadmin-small-add"
                        onClick={() =>
                          setDraft((p) => ({ ...p, prizes: [...(p.prizes || []), ''] }))
                        }
                      >
                        <Plus size={13} /> Přidat cenu
                      </button>
                    </div>
                    <div className="cadmin-list-inputs">
                      {(draft.prizes || []).map((prize, idx) => (
                        <div key={idx} className="cadmin-row-input">
                          <span className="cadmin-row-num">{idx + 1}.</span>
                          <input
                            type="text"
                            placeholder="Např. 500 PokéCoins"
                            value={prize}
                            onChange={(e) => {
                              const next = [...(draft.prizes || [])];
                              next[idx] = e.target.value;
                              setDraft((p) => ({ ...p, prizes: next }));
                            }}
                          />
                          <button
                            type="button"
                            className="cadmin-icon-remove"
                            onClick={() =>
                              setDraft((p) => ({
                                ...p,
                                prizes: (p.prizes || []).filter((_, i) => i !== idx),
                              }))
                            }
                            aria-label="Smazat cenu"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="cadmin-section-box">
                    <div className="cadmin-section-header-row">
                      <span className="cadmin-section-title">Pravidla soutěže</span>
                      <button
                        type="button"
                        className="cadmin-small-add"
                        onClick={() =>
                          setDraft((p) => ({ ...p, rules: [...(p.rules || []), ''] }))
                        }
                      >
                        <Plus size={13} /> Přidat pravidlo
                      </button>
                    </div>
                    <div className="cadmin-list-inputs">
                      {(draft.rules || []).map((rule, idx) => (
                        <div key={idx} className="cadmin-row-input">
                          <input
                            type="text"
                            placeholder="Pravidlo soutěže..."
                            value={rule}
                            onChange={(e) => {
                              const next = [...(draft.rules || [])];
                              next[idx] = e.target.value;
                              setDraft((p) => ({ ...p, rules: next }));
                            }}
                          />
                          <button
                            type="button"
                            className="cadmin-icon-remove"
                            onClick={() =>
                              setDraft((p) => ({
                                ...p,
                                rules: (p.rules || []).filter((_, i) => i !== idx),
                              }))
                            }
                            aria-label="Smazat pravidlo"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Classic Registration & External Link */}
                <div className="cadmin-section-box">
                  <div className="cadmin-section-title">Kontakt &amp; Externí odkaz</div>
                  {draft.contestType !== 'inventory_combo' &&
                    draft.contestType !== 'stats_delta' && (
                      <label className="cadmin-checkbox">
                        <input
                          type="checkbox"
                          checked={Boolean(draft.registrationEnabled)}
                          onChange={(e) =>
                            setDraft((p) => ({ ...p, registrationEnabled: e.target.checked }))
                          }
                        />
                        <span>Povolit přihlašování hráčů přímo na stránce /cs/soutez</span>
                      </label>
                    )}

                  <div className="cadmin-grid-2">
                    <div className="cadmin-field">
                      <label className="cadmin-checkbox-inline">
                        <input
                          type="checkbox"
                          checked={Boolean(draft.requireContact)}
                          onChange={(e) =>
                            setDraft((p) => ({ ...p, requireContact: e.target.checked }))
                          }
                        />
                        <span>Vyžadovat kontakt pro předání výhry</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Popisek kontaktu, např. Discord / Messenger"
                        value={draft.contactPrompt || ''}
                        onChange={(e) =>
                          setDraft((p) => ({ ...p, contactPrompt: e.target.value }))
                        }
                      />
                    </div>

                    <div className="cadmin-field">
                      <label>Externí odkaz – Discord, FB, Campfire</label>
                      <input
                        type="url"
                        placeholder="https://..."
                        value={draft.externalUrl || ''}
                        onChange={(e) => setDraft((p) => ({ ...p, externalUrl: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>

                {/* Published Winners Manager */}
                <div className="cadmin-section-box">
                  <div className="cadmin-section-header-row">
                    <span className="cadmin-section-title">
                      <Award size={16} /> Vyhlášení výherci · {(draft.winners || []).length}
                    </span>
                    <button
                      type="button"
                      className="cadmin-small-add"
                      onClick={() =>
                        setDraft((p) => ({
                          ...p,
                          winners: [
                            ...(p.winners || []),
                            {
                              id: `manual-${Date.now()}`,
                              trainerName: '',
                              prize: p.prizes?.[(p.winners || []).length] || '',
                              place: (p.winners || []).length + 1,
                              drawnAt: new Date().toISOString(),
                            },
                          ],
                        }))
                      }
                    >
                      <Plus size={13} /> Přidat výherce ručně
                    </button>
                  </div>

                  {(draft.winners || []).length === 0 ? (
                    <p className="cadmin-muted-note">
                      Zatím nebyl vyhlášen žádný výherce. Můžeš je přidat ručně tady nebo je
                      vylosovat v záložce „Přihlášky &amp; Losování“.
                    </p>
                  ) : (
                    <div className="cadmin-list-inputs">
                      {(draft.winners || []).map((w, idx) => (
                        <div key={w.id || idx} className="cadmin-winner-edit-row">
                          <input
                            type="number"
                            min={1}
                            max={100}
                            className="cadmin-place-input"
                            value={w.place || idx + 1}
                            onChange={(e) => {
                              const next = [...(draft.winners || [])];
                              next[idx] = { ...w, place: Number(e.target.value) || idx + 1 };
                              setDraft((p) => ({ ...p, winners: next }));
                            }}
                          />
                          <input
                            type="text"
                            placeholder="Jméno trenéra"
                            value={w.trainerName}
                            onChange={(e) => {
                              const next = [...(draft.winners || [])];
                              next[idx] = { ...w, trainerName: e.target.value };
                              setDraft((p) => ({ ...p, winners: next }));
                            }}
                          />
                          <input
                            type="text"
                            placeholder="Výhra"
                            value={w.prize || ''}
                            onChange={(e) => {
                              const next = [...(draft.winners || [])];
                              next[idx] = { ...w, prize: e.target.value };
                              setDraft((p) => ({ ...p, winners: next }));
                            }}
                          />
                          <button
                            type="button"
                            className="cadmin-icon-remove"
                            onClick={() =>
                              setDraft((p) => ({
                                ...p,
                                winners: (p.winners || []).filter((_, i) => i !== idx),
                              }))
                            }
                            aria-label="Odebrat výherce"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </form>
            )}
          </section>
        </div>
      )}

      {/* TAB 2: ENTRIES, VERIFICATION & RANDOM WINNER DRAW */}
      {activeTab === 'entries' && (
        <div className="cadmin-raffle-layout">
          <div className="cadmin-card">
            <div className="cadmin-raffle-top">
              <div className="cadmin-field" style={{ flex: 1 }}>
                <label>Vyber soutěž</label>
                <select
                  value={raffleContestId}
                  onChange={(e) => {
                    setRaffleContestId(e.target.value);
                    setLastDrawn(null);
                  }}
                >
                  {contests.length === 0 && <option value="">Žádná soutěž zatím neexistuje</option>}
                  {contests.map((c) => {
                    const tot = entries.filter((e) => e.contestId === c.id).length;
                    const app = entries.filter(
                      (e) => e.contestId === c.id && e.status === 'approved'
                    ).length;
                    return (
                      <option key={c.id} value={c.id}>
                        {c.title} · {app} schváleno / {tot} celkem
                      </option>
                    );
                  })}
                </select>
              </div>

              {selectedRaffleContest && contestAllEntries.length > 0 && (
                <button
                  type="button"
                  className="cadmin-btn secondary"
                  onClick={handleExportEntriesCsv}
                >
                  <Download size={15} />
                  <span>Export CSV</span>
                </button>
              )}
            </div>

            {selectedRaffleContest && (
              <>
                {/* Raffle Box */}
                <div className="cadmin-raffle-box">
                  <div className="cadmin-raffle-box-header">
                    <Dices size={20} />
                    <div>
                      <h3>Náhodné losování výherců</h3>
                      <p>
                        Losuje se výhradně ze <strong>{approvedCount} schválených</strong>{' '}
                        účastníků pomocí <code>crypto.randomInt</code>.
                        {pendingCount > 0 && ` Čeká na kontrolu: ${pendingCount}.`}
                      </p>
                    </div>
                  </div>

                  <div className="cadmin-raffle-controls">
                    <div className="cadmin-field">
                      <label>Počet losovaných výherců</label>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={drawCount}
                        onChange={(e) =>
                          setDrawCount(Math.max(1, Math.min(20, Number(e.target.value) || 1)))
                        }
                      />
                    </div>
                    <label className="cadmin-checkbox">
                      <input
                        type="checkbox"
                        checked={excludeExisting}
                        onChange={(e) => setExcludeExisting(e.target.checked)}
                      />
                      <span>
                        Vyloučit již vyhlášené výherce · {selectedRaffleContest.winners.length}
                      </span>
                    </label>
                  </div>

                  <div className="cadmin-raffle-actions">
                    <button
                      type="button"
                      className="cadmin-btn secondary"
                      disabled={drawing || approvedCount === 0}
                      onClick={() => handleRunDraw(false)}
                    >
                      <Dices size={16} />
                      <span>Vylosovat nanečisto</span>
                    </button>
                    <button
                      type="button"
                      className="cadmin-btn primary"
                      disabled={drawing || approvedCount === 0}
                      onClick={() => handleRunDraw(true)}
                    >
                      <Award size={16} />
                      <span>{drawing ? 'Losuji...' : 'Vylosovat a zveřejnit výherce'}</span>
                    </button>
                  </div>

                  {lastDrawn && lastDrawn.length > 0 && (
                    <div className="cadmin-drawn-result">
                      <div className="cadmin-drawn-title">
                        <Sparkles size={16} />
                        <span>Výsledek losování</span>
                      </div>
                      <div className="cadmin-drawn-list">
                        {lastDrawn.map((w) => (
                          <div key={w.id} className="cadmin-drawn-chip">
                            <span className="drawn-place">#{w.place}</span>
                            <strong>{w.trainerName}</strong>
                            {w.prize && <span className="drawn-prize">– {w.prize}</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Manual Add Entry */}
                <form className="cadmin-manual-entry-form" onSubmit={handleAddManualEntry}>
                  <input
                    type="text"
                    required
                    placeholder="Ručně přidat schváleného trenéra..."
                    value={manualTrainerName}
                    onChange={(e) => setManualTrainerName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Poznámka"
                    value={manualNote}
                    onChange={(e) => setManualNote(e.target.value)}
                  />
                  <button type="submit" className="cadmin-btn primary">
                    <Plus size={15} />
                    <span>Přidat</span>
                  </button>
                </form>

                {/* Entries Filter & Table */}
                <div className="cadmin-entries-header">
                  <div className="cadmin-filter-pills">
                    {(['all', 'approved', 'pending_review', 'rejected'] as const).map((st) => (
                      <button
                        key={st}
                        type="button"
                        className={`cadmin-mini-pill ${entryStatusFilter === st ? 'active' : ''}`}
                        onClick={() => setEntryStatusFilter(st)}
                      >
                        {st === 'all'
                          ? `Vše · ${contestAllEntries.length}`
                          : st === 'approved'
                            ? `Schváleno · ${approvedCount}`
                            : st === 'pending_review'
                              ? `Ke kontrole · ${pendingCount}`
                              : `Zamítnuto · ${contestAllEntries.filter((e) => e.status === 'rejected').length}`}
                      </button>
                    ))}
                  </div>
                  <div className="cadmin-search-wrap" style={{ maxWidth: '260px' }}>
                    <Search size={14} />
                    <input
                      type="text"
                      placeholder="Hledat trenéra..."
                      value={entrySearch}
                      onChange={(e) => setEntrySearch(e.target.value)}
                    />
                  </div>
                </div>

                {filteredRaffleEntries.length === 0 ? (
                  <div className="cadmin-empty-list">
                    Žádné přihlášky neodpovídají zvolenému filtru.
                  </div>
                ) : (
                  <div className="cadmin-entries-table-wrap">
                    <table className="cadmin-entries-table">
                      <thead>
                        <tr>
                          <th>Trenér</th>
                          <th>Stav</th>
                          <th>Detail ověření / Statistiky</th>
                          <th>Akce</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRaffleEntries.map((entry) => (
                          <tr key={entry.id}>
                            <td>
                              <div className="cadmin-entry-trainer">
                                <strong>{entry.trainerName}</strong>
                                {entry.addedByAdmin && (
                                  <span className="cadmin-mini-tag">admin</span>
                                )}
                                {entry.contact && (
                                  <span className="cadmin-entry-sub">{entry.contact}</span>
                                )}
                                <span className="cadmin-entry-sub">
                                  {new Date(entry.createdAt).toLocaleString('cs-CZ')}
                                </span>
                              </div>
                            </td>
                            <td>
                              <span className={`cadmin-entry-status ${entry.status}`}>
                                {entry.status === 'approved' ? (
                                  <>
                                    <CheckCircle2 size={13} /> Schváleno
                                  </>
                                ) : entry.status === 'pending_review' ? (
                                  <>
                                    <Hourglass size={13} /> Ke kontrole
                                  </>
                                ) : (
                                  <>
                                    <XCircle size={13} /> Zamítnuto
                                  </>
                                )}
                              </span>
                            </td>
                            <td>
                              <div className="cadmin-entry-detail">
                                {entry.statusReason && (
                                  <div className="cadmin-entry-reason">{entry.statusReason}</div>
                                )}
                                {entry.answer && (
                                  <div className="cadmin-entry-sub">Odpověď: {entry.answer}</div>
                                )}

                                {/* OCR details & clickable screenshot thumbnail */}
                                {entry.ocrResult && (
                                  <div className="cadmin-ocr-summary">
                                    <span className="cadmin-mini-tag">
                                      OCR: {entry.ocrResult.provider}
                                    </span>
                                    <span className="cadmin-mini-tag">
                                      age0: {entry.ocrResult.age0Detected ? 'ANO' : 'NE'}
                                    </span>
                                    {entry.ocrResult.detectedPokemon.length > 0 && (
                                      <span className="cadmin-entry-sub">
                                        Rozpoznáno:{' '}
                                        {entry.ocrResult.detectedPokemon.slice(0, 10).join(', ')}
                                      </span>
                                    )}
                                  </div>
                                )}

                                {entry.screenshotUrl && (
                                  <button
                                    type="button"
                                    className="cadmin-thumb-btn"
                                    onClick={() => setLightboxImage(entry.screenshotUrl!)}
                                  >
                                    <img
                                      src={entry.screenshotUrl}
                                      alt={`Screenshot ${entry.trainerName}`}
                                    />
                                    <span>Zvětšit screenshot</span>
                                  </button>
                                )}

                                {/* Stats Delta breakdown */}
                                {entry.baselineValues && selectedRaffleContest.statsDeltaConfig && (
                                  <div className="cadmin-stats-breakdown">
                                    {selectedRaffleContest.statsDeltaConfig.metrics
                                      .filter((m) => m.enabled)
                                      .map((m) => {
                                        const start = entry.baselineValues?.[m.id];
                                        const fin = entry.finalValues?.[m.id];
                                        const delta = entry.deltas?.[m.id];
                                        const ok = entry.metMetrics?.includes(m.id);
                                        return (
                                          <span
                                            key={m.id}
                                            className={`cadmin-stat-chip ${
                                              fin === undefined ? 'pending' : ok ? 'ok' : 'fail'
                                            }`}
                                          >
                                            {cleanMetricLabel(m.label)}: {start ?? '—'}
                                            {fin !== undefined
                                              ? ` → ${fin} · +${delta} ${m.unit}`
                                              : ' · čeká na 2. fázi'}
                                          </span>
                                        );
                                      })}
                                  </div>
                                )}
                              </div>
                            </td>
                            <td>
                              <div className="cadmin-row-actions">
                                {entry.status !== 'approved' && (
                                  <button
                                    type="button"
                                    className="cadmin-action-chip approve"
                                    onClick={() =>
                                      handleOverrideEntryStatus(
                                        entry.contestId,
                                        entry.id,
                                        'approved'
                                      )
                                    }
                                    title="Schválit do slosování"
                                  >
                                    <Check size={14} />
                                  </button>
                                )}
                                {entry.status !== 'rejected' && (
                                  <button
                                    type="button"
                                    className="cadmin-action-chip reject"
                                    onClick={() =>
                                      handleOverrideEntryStatus(
                                        entry.contestId,
                                        entry.id,
                                        'rejected'
                                      )
                                    }
                                    title="Vyřadit"
                                  >
                                    <X size={14} />
                                  </button>
                                )}
                                <button
                                  type="button"
                                  className="cadmin-icon-remove"
                                  onClick={() => handleDeleteEntry(entry.contestId, entry.id)}
                                  title="Smazat záznam"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: QR CODE GENERATOR */}
      {activeTab === 'qr' && (
        <div className="cadmin-qr-layout">
          <div className="cadmin-card cadmin-qr-config">
            <h3>Generátor QR kódu pro lokální skupinu</h3>
            <p className="cadmin-muted-note">
              Stránka <code>/cs/soutez</code> není nikde v navigaci ani ve vyhledávačích. Sdílej
              tento QR kód ve skupině nebo ho vytiskni na lokální Community Day / Raid sraz!
            </p>

            <div className="cadmin-field">
              <label>Cílová základní adresa</label>
              <input
                type="url"
                value={qrBaseUrl}
                onChange={(e) => setQrBaseUrl(e.target.value)}
              />
            </div>

            <div className="cadmin-field">
              <label>Cílit přímo na konkrétní soutěž</label>
              <select
                value={qrContestSlug}
                onChange={(e) => setQrContestSlug(e.target.value)}
              >
                <option value="">Celý přehled soutěží – /cs/soutez</option>
                {contests
                  .filter((c) => c.status !== 'draft')
                  .map((c) => (
                    <option key={c.id} value={c.slug}>
                      {c.title}
                    </option>
                  ))}
              </select>
            </div>

            <div className="cadmin-url-copy-box">
              <code>{effectiveQrUrl}</code>
              <button type="button" className="cadmin-btn secondary" onClick={handleCopyQrUrl}>
                {copiedUrl ? <Check size={15} /> : <Copy size={15} />}
                <span>{copiedUrl ? 'Zkopírováno!' : 'Kopírovat'}</span>
              </button>
            </div>

            <div className="cadmin-qr-download-row">
              <button
                type="button"
                className="cadmin-btn primary"
                onClick={handleDownloadQrPng}
                disabled={!qrPngUrl}
              >
                <Download size={16} />
                <span>Stáhnout PNG pro tisk</span>
              </button>
              <button
                type="button"
                className="cadmin-btn secondary"
                onClick={handleDownloadQrSvg}
                disabled={!qrSvgMarkup}
              >
                <Download size={16} />
                <span>Stáhnout vektorové SVG</span>
              </button>
            </div>
          </div>

          <div className="cadmin-card cadmin-qr-preview-card">
            <div className="cadmin-qr-frame">
              {qrPngUrl ? (
                <img src={qrPngUrl} alt="QR kód pro lokální soutěže" className="cadmin-qr-img" />
              ) : (
                <div className="cadmin-qr-loading">Generuji QR kód...</div>
              )}
            </div>
            <div className="cadmin-qr-caption">
              <strong>{settings.hubTitle || 'Komunitní soutěže'}</strong>
              <span>{settings.groupName}</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: HUB SETTINGS */}
      {activeTab === 'settings' && (
        <form className="cadmin-card cadmin-form" onSubmit={handleSaveSettings}>
          <div className="cadmin-form-header">
            <h3>Nastavení veřejné stránky /cs/soutez</h3>
            <button type="submit" className="cadmin-btn success" disabled={savingSettings}>
              <Save size={15} />
              <span>{savingSettings ? 'Ukládám...' : 'Uložit nastavení'}</span>
            </button>
          </div>

          <div className="cadmin-grid-2">
            <div className="cadmin-field">
              <label>Název lokální skupiny</label>
              <input
                type="text"
                maxLength={80}
                value={settings.groupName}
                onChange={(e) => setSettings((p) => ({ ...p, groupName: e.target.value }))}
              />
            </div>

            <div className="cadmin-field">
              <label>Hlavní nadpis stránky</label>
              <input
                type="text"
                maxLength={100}
                value={settings.hubTitle}
                onChange={(e) => setSettings((p) => ({ ...p, hubTitle: e.target.value }))}
              />
            </div>

            <div className="cadmin-field span-2">
              <label>Úvodní popis / podtitul</label>
              <textarea
                rows={2}
                maxLength={350}
                value={settings.hubSubtitle}
                onChange={(e) => setSettings((p) => ({ ...p, hubSubtitle: e.target.value }))}
              />
            </div>

            <div className="cadmin-field span-2">
              <label>Důležité oznámení / banner – nech prázdné pro skrytí</label>
              <input
                type="text"
                maxLength={400}
                placeholder="Např. Příští sraz proběhne v sobotu ve 14:00 v parku!"
                value={settings.announcement || ''}
                onChange={(e) => setSettings((p) => ({ ...p, announcement: e.target.value }))}
              />
            </div>

            <div className="cadmin-field">
              <label>Odkaz na komunitní chat – Discord / FB / Campfire</label>
              <input
                type="url"
                placeholder="https://..."
                value={settings.communityUrl || ''}
                onChange={(e) => setSettings((p) => ({ ...p, communityUrl: e.target.value }))}
              />
            </div>

            <div className="cadmin-field">
              <label>Popisek tlačítka odkazu</label>
              <input
                type="text"
                maxLength={60}
                placeholder="Např. Připojit se na Discord"
                value={settings.communityLabel || ''}
                onChange={(e) => setSettings((p) => ({ ...p, communityLabel: e.target.value }))}
              />
            </div>
          </div>

          {gcsStatus && (
            <div className="cadmin-gcs-strip">
              <Cloud size={15} />
              <span>
                Úložiště:{' '}
                <strong>
                  {gcsStatus.enabled
                    ? gcsStatus.connected
                      ? `Google Cloud Storage · ${gcsStatus.bucketName || 'připojeno'}`
                      : 'GCS povoleno · čeká na zápis'
                    : 'Lokální disková paměť'}
                </strong>
              </span>
            </div>
          )}
        </form>
      )}

      {/* Screenshot Lightbox Modal */}
      {lightboxImage && (
        <div
          className="cadmin-lightbox-backdrop"
          onClick={() => setLightboxImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="cadmin-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="cadmin-lightbox-close"
              onClick={() => setLightboxImage(null)}
              aria-label="Zavřít náhled"
            >
              <X size={20} />
            </button>
            <img src={lightboxImage} alt="Detail screenshotu" />
          </div>
        </div>
      )}
    </div>
  );
};
