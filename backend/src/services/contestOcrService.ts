import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { dataStore } from '../dataStore';

export type InventoryComboRuleMode = 'alphabetical' | 'word_cipher' | 'specific_pokemon';

export interface InventoryComboConfig {
  ruleMode: InventoryComboRuleMode;
  comboLength: number;
  targetWord?: string;
  requiredPokemon?: string[];
  requireAge0: boolean;
}

export interface OcrWordBox {
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface OcrExtractionResult {
  provider: 'google_vision' | 'tesseract' | 'none';
  rawText: string;
  orderedLines: string[];
  words?: OcrWordBox[];
  error?: string;
  visionCallsThisMonth: number;
  visionMonthlyLimit: number;
}

export interface InventoryComboEvaluation {
  status: 'approved' | 'pending_review' | 'rejected';
  reason: string;
  provider: 'google_vision' | 'tesseract' | 'none';
  detectedPokemon: string[];
  matchedSequence?: string[];
  matchedDirection?: 'forward' | 'reverse';
  age0Detected: boolean;
  rawTextSnippet?: string;
  checkedAt: string;
}

export interface OcrMonthlyUsage {
  month: string;
  visionCalls: number;
  visionLimit: number;
}

export const VISION_MONTHLY_FREE_CAP = 950;

// Cached Pokédex dictionary (normalized key -> display name)
let pokedexMapCache: Map<string, string> | null = null;
let pokedexEntriesCache: Array<{ key: string; display: string }> | null = null;

function normalizeAlpha(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

function formatSlugToDisplayName(slug: string): string {
  const special: Record<string, string> = {
    'mr-mime': 'Mr. Mime',
    'mime-jr': 'Mime Jr.',
    'mr-rime': 'Mr. Rime',
    'ho-oh': 'Ho-Oh',
    'porygon-z': 'Porygon-Z',
    'porygon2': 'Porygon2',
    'type-null': 'Type: Null',
    'jangmo-o': 'Jangmo-o',
    'hakamo-o': 'Hakamo-o',
    'kommo-o': 'Kommo-o',
    'farfetchd': "Farfetch'd",
    'sirfetchd': "Sirfetch'd",
    'flabebe': 'Flabébé',
  };
  if (special[slug]) return special[slug];
  return slug
    .split('-')
    .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : ''))
    .join(' ');
}

export function loadPokedexDictionary(): {
  map: Map<string, string>;
  entries: Array<{ key: string; display: string }>;
} {
  if (pokedexMapCache && pokedexEntriesCache) {
    return { map: pokedexMapCache, entries: pokedexEntriesCache };
  }

  const map = new Map<string, string>();
  const candidates = [
    path.resolve(__dirname, '../../data/pokedexMetaIndex.json'),
    path.resolve(process.cwd(), 'data/pokedexMetaIndex.json'),
    path.resolve(__dirname, '../../../frontend/src/data/pokedexCatalog.json'),
  ];

  for (const filePath of candidates) {
    if (!fs.existsSync(filePath)) continue;
    try {
      const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      if (Array.isArray(raw)) {
        for (const item of raw) {
          const en = item?.names?.en || item?.slug;
          const cs = item?.names?.cs;
          if (en) map.set(normalizeAlpha(en), en);
          if (cs) map.set(normalizeAlpha(cs), cs);
        }
      } else if (raw && typeof raw === 'object') {
        for (const key of Object.keys(raw)) {
          const display = formatSlugToDisplayName(key);
          const norm = normalizeAlpha(key);
          if (norm.length >= 3) {
            map.set(norm, display);
          }
        }
      }
      if (map.size > 100) break;
    } catch {
      // Try next candidate
    }
  }

  // Always include Nidoran variants & popular staples as safety net
  const extras = ['Nidoran', 'Pikachu', 'Bulbasaur', 'Charmander', 'Squirtle', 'Caterpie', 'Eevee', 'Pidgey', 'Oddish', 'Gengar'];
  for (const name of extras) {
    const k = normalizeAlpha(name);
    if (!map.has(k)) map.set(k, name);
  }

  pokedexMapCache = map;
  pokedexEntriesCache = Array.from(map.entries()).map(([key, display]) => ({ key, display }));
  return { map, entries: pokedexEntriesCache };
}

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > 2) return 99;
  const dp: number[] = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = dp[j];
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[j] = Math.min(dp[j] + 1, dp[j - 1] + 1, prev + cost);
      prev = tmp;
    }
  }
  return dp[b.length];
}

const UI_NOISE_WORDS = new Set([
  'pokemon',
  'eggs',
  'tags',
  'search',
  'recent',
  'favorite',
  'number',
  'combat',
  'power',
  'name',
  'age0',
  'age',
  'party',
  'battle',
  'cp',
  'hp',
  'new',
  'all',
  'shiny',
  'shadow',
  'lucky',
  'purified',
  'evolve',
  'can',
  'see',
  'more',
  'show',
  'less',
]);

function matchTokenToPokedex(token: string): string | null {
  const norm = normalizeAlpha(token)
    .replace(/0/g, 'o')
    .replace(/1/g, 'l')
    .replace(/5/g, 's');
  const rawNorm = normalizeAlpha(token);

  if (rawNorm.length < 3 || /^\d+$/.test(rawNorm)) return null;
  if (UI_NOISE_WORDS.has(rawNorm)) return null;

  const { map, entries } = loadPokedexDictionary();
  const exact = map.get(rawNorm) || map.get(norm);
  if (exact) return exact;

  // Allow 1-character OCR typo tolerance ONLY for names >= 5 chars
  if (rawNorm.length >= 5) {
    let best: string | null = null;
    let bestDist = 2;
    for (const entry of entries) {
      if (Math.abs(entry.key.length - rawNorm.length) > 1) continue;
      // First letter must match for reliability in alphabetical/cipher contests
      if (entry.key[0] !== rawNorm[0] && entry.key[0] !== norm[0]) continue;
      const dist = Math.min(levenshtein(rawNorm, entry.key), levenshtein(norm, entry.key));
      if (dist < bestDist) {
        bestDist = dist;
        best = entry.display;
        if (dist === 1) break;
      }
    }
    return best;
  }

  return null;
}

function getCurrentMonthKey(): string {
  const now = new Date();
  return `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}`;
}

export async function getOcrMonthlyUsage(): Promise<OcrMonthlyUsage> {
  const month = getCurrentMonthKey();
  const key = `contest_ocr_usage_${month}`;
  const stored = await dataStore.get<{ count: number }>(key, { defaultValue: { count: 0 } });
  return {
    month,
    visionCalls: stored?.count || 0,
    visionLimit: VISION_MONTHLY_FREE_CAP,
  };
}

async function incrementVisionUsage(): Promise<number> {
  const month = getCurrentMonthKey();
  const key = `contest_ocr_usage_${month}`;
  const stored = await dataStore.get<{ count: number }>(key, {
    defaultValue: { count: 0 },
    forceCloud: true,
  });
  const nextCount = (stored?.count || 0) + 1;
  await dataStore.set(key, { count: nextCount, updatedAt: new Date().toISOString() });
  return nextCount;
}

async function getGcpMetadataAccessToken(): Promise<string | null> {
  // Only query GCP metadata server when running on Google Cloud Run / GCE
  if (!process.env.K_SERVICE && !process.env.GOOGLE_CLOUD_PROJECT) {
    return null;
  }
  try {
    const res = await axios.get(
      'http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token',
      {
        headers: { 'Metadata-Flavor': 'Google' },
        timeout: 2000,
      }
    );
    return res.data?.access_token || null;
  } catch {
    return null;
  }
}

function sortWordsInGridOrder(words: OcrWordBox[]): string[] {
  if (words.length === 0) return [];
  const heights = words.map((w) => w.height).filter((h) => h > 0).sort((a, b) => a - b);
  const medianHeight = heights.length > 0 ? heights[Math.floor(heights.length / 2)] : 24;
  const rowTolerance = Math.max(14, medianHeight * 0.85);

  const sortedByY = [...words].sort((a, b) => a.y - b.y);
  const rows: OcrWordBox[][] = [];

  for (const w of sortedByY) {
    const lastRow = rows[rows.length - 1];
    if (!lastRow) {
      rows.push([w]);
      continue;
    }
    const avgY = lastRow.reduce((sum, item) => sum + item.y, 0) / lastRow.length;
    if (Math.abs(w.y - avgY) <= rowTolerance) {
      lastRow.push(w);
    } else {
      rows.push([w]);
    }
  }

  return rows.map((row) =>
    row
      .sort((a, b) => a.x - b.x)
      .map((w) => w.text)
      .join(' ')
  );
}

async function runGoogleCloudVisionOcr(
  base64Content: string
): Promise<{ rawText: string; orderedLines: string[]; words: OcrWordBox[] } | null> {
  const apiKey = process.env.GOOGLE_CLOUD_VISION_API_KEY?.trim();
  const accessToken = apiKey ? null : await getGcpMetadataAccessToken();

  if (!apiKey && !accessToken) {
    return null;
  }

  const endpoint = apiKey
    ? `https://vision.googleapis.com/v1/images:annotate?key=${encodeURIComponent(apiKey)}`
    : 'https://vision.googleapis.com/v1/images:annotate';

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const response = await axios.post(
    endpoint,
    {
      requests: [
        {
          image: { content: base64Content },
          features: [{ type: 'TEXT_DETECTION' }],
        },
      ],
    },
    { headers, timeout: 12000 }
  );

  const first = response.data?.responses?.[0];
  if (first?.error) {
    throw new Error(first.error.message || 'Google Cloud Vision API error');
  }

  const annotations: any[] = first?.textAnnotations || [];
  if (annotations.length === 0) {
    return { rawText: '', orderedLines: [], words: [] };
  }

  const rawText: string = annotations[0]?.description || '';
  const words: OcrWordBox[] = annotations.slice(1).map((ann: any) => {
    const verts: Array<{ x?: number; y?: number }> = ann.boundingPoly?.vertices || [];
    const xs = verts.map((v) => v.x ?? 0);
    const ys = verts.map((v) => v.y ?? 0);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    return {
      text: String(ann.description || '').trim(),
      x: minX,
      y: minY,
      width: Math.max(1, maxX - minX),
      height: Math.max(1, maxY - minY),
    };
  });

  const orderedLines = sortWordsInGridOrder(words);
  return { rawText, orderedLines, words };
}

async function runTesseractFallbackOcr(
  imageBuffer: Buffer
): Promise<{ rawText: string; orderedLines: string[] }> {
  const tesseract = await import('tesseract.js');
  const result = await tesseract.recognize(imageBuffer, 'eng');
  const rawText = result?.data?.text || '';
  const orderedLines = rawText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  return { rawText, orderedLines };
}

export async function extractTextFromScreenshot(dataUrl: string): Promise<OcrExtractionResult> {
  const match = dataUrl.match(/^data:image\/(png|jpeg|jpg|webp|gif);base64,([A-Za-z0-9+/=]+)$/i);
  if (!match) {
    const usage = await getOcrMonthlyUsage();
    return {
      provider: 'none',
      rawText: '',
      orderedLines: [],
      error: 'Neplatný formát obrázku.',
      visionCallsThisMonth: usage.visionCalls,
      visionMonthlyLimit: usage.visionLimit,
    };
  }

  const base64Content = match[2];
  const usage = await getOcrMonthlyUsage();

  // 1. Primary: Google Cloud Vision API (if under 950/month free safety cap)
  if (usage.visionCalls < VISION_MONTHLY_FREE_CAP) {
    try {
      const visionRes = await runGoogleCloudVisionOcr(base64Content);
      if (visionRes) {
        const updatedCalls = await incrementVisionUsage();
        return {
          provider: 'google_vision',
          rawText: visionRes.rawText,
          orderedLines: visionRes.orderedLines,
          words: visionRes.words,
          visionCallsThisMonth: updatedCalls,
          visionMonthlyLimit: VISION_MONTHLY_FREE_CAP,
        };
      }
    } catch (err: any) {
      console.warn(
        `[ContestOCR] Google Cloud Vision unavailable/failed (${err?.message || err}), falling back to Tesseract.js`
      );
    }
  }

  // 2. Fallback: Tesseract.js local OCR
  try {
    const buffer = Buffer.from(base64Content, 'base64');
    const tessRes = await runTesseractFallbackOcr(buffer);
    return {
      provider: 'tesseract',
      rawText: tessRes.rawText,
      orderedLines: tessRes.orderedLines,
      visionCallsThisMonth: usage.visionCalls,
      visionMonthlyLimit: VISION_MONTHLY_FREE_CAP,
    };
  } catch (err: any) {
    console.error('[ContestOCR] Tesseract fallback failed:', err?.message || err);
    return {
      provider: 'none',
      rawText: '',
      orderedLines: [],
      error: err?.message || 'OCR se nepodařilo spustit.',
      visionCallsThisMonth: usage.visionCalls,
      visionMonthlyLimit: VISION_MONTHLY_FREE_CAP,
    };
  }
}

/**
 * Extracts valid Pokédex Pokémon names from ordered OCR lines in visual grid order.
 */
export function extractPokemonNamesFromLines(orderedLines: string[]): string[] {
  const detected: string[] = [];

  for (const line of orderedLines) {
    // Strip CP labels like "CP 1234" or "CP1234" or standalone numbers
    const cleanedLine = line.replace(/\bCP\s*\d+\b/gi, ' ').replace(/\b\d+\b/g, ' ');
    const rawTokens = cleanedLine
      .split(/[\s|,;/\\•·]+/)
      .map((t) => t.replace(/^[^a-zA-ZÀ-ž]+|[^a-zA-ZÀ-ž0-9'.:-]+$/g, '').trim())
      .filter(Boolean);

    let i = 0;
    while (i < rawTokens.length) {
      // Check two-word Pokémon names first (e.g. "Mr. Mime", "Tapu Koko", "Ho-Oh")
      if (i + 1 < rawTokens.length) {
        const pair = `${rawTokens[i]} ${rawTokens[i + 1]}`;
        const pairMatch = matchTokenToPokedex(pair);
        if (pairMatch) {
          detected.push(pairMatch);
          i += 2;
          continue;
        }
      }
      const singleMatch = matchTokenToPokedex(rawTokens[i]);
      if (singleMatch) {
        detected.push(singleMatch);
      }
      i += 1;
    }
  }

  return detected;
}

export function detectAge0Filter(rawText: string, orderedLines: string[]): boolean {
  const topLines = orderedLines.slice(0, 6).join(' ');
  const combined = `${topLines}\n${rawText}`;
  // Match age0, age 0, age0-0, age0-1 (common OCR variations like ageO / age0)
  return /\bage\s*[0oO](?:\s*-\s*\d+)?\b/i.test(combined);
}

function getInitialLetter(pokemonName: string): string {
  const norm = normalizeAlpha(pokemonName);
  return norm ? norm[0].toUpperCase() : '';
}

function findAlphabeticalSubsequence(
  names: string[],
  length: number
): string[] | null {
  if (names.length < length || length < 2) return null;
  for (let start = 0; start <= names.length - length; start++) {
    const slice = names.slice(start, start + length);
    let ascending = true;
    for (let j = 1; j < slice.length; j++) {
      const prevL = getInitialLetter(slice[j - 1]);
      const currL = getInitialLetter(slice[j]);
      if (!prevL || !currL || currL <= prevL) {
        ascending = false;
        break;
      }
    }
    if (ascending) return slice;
  }
  return null;
}

function findWordCipherSubsequence(
  names: string[],
  targetWord: string
): string[] | null {
  const letters = normalizeAlpha(targetWord).toUpperCase().replace(/[^A-Z]/g, '');
  if (!letters || names.length < letters.length) return null;

  for (let start = 0; start <= names.length - letters.length; start++) {
    const slice = names.slice(start, start + letters.length);
    let matches = true;
    for (let j = 0; j < letters.length; j++) {
      if (getInitialLetter(slice[j]) !== letters[j]) {
        matches = false;
        break;
      }
    }
    if (matches) return slice;
  }
  return null;
}

/**
 * Pure evaluator (easily unit-tested without calling external OCR).
 */
export function evaluateInventoryComboFromOcr(
  ocr: Pick<OcrExtractionResult, 'provider' | 'rawText' | 'orderedLines' | 'error'>,
  config: InventoryComboConfig
): InventoryComboEvaluation {
  const checkedAt = new Date().toISOString();
  const rawTextSnippet = (ocr.rawText || '').trim().slice(0, 500) || undefined;
  const age0Detected = detectAge0Filter(ocr.rawText || '', ocr.orderedLines || []);
  const detectedPokemon = extractPokemonNamesFromLines(
    ocr.orderedLines && ocr.orderedLines.length > 0
      ? ocr.orderedLines
      : (ocr.rawText || '').split(/\r?\n/)
  );

  // If OCR failed completely or couldn't read enough Pokémon -> send to manual admin review
  const minRequiredCount =
    config.ruleMode === 'word_cipher'
      ? Math.max(2, normalizeAlpha(config.targetWord || '').length || 3)
      : config.ruleMode === 'specific_pokemon'
        ? Math.max(1, (config.requiredPokemon || []).filter(Boolean).length)
        : Math.max(2, config.comboLength || 3);

  if (ocr.provider === 'none' || detectedPokemon.length < minRequiredCount) {
    return {
      status: 'pending_review',
      reason:
        ocr.provider === 'none'
          ? 'OCR nebylo dostupné – screenshot čeká na ruční kontrolu adminem.'
          : `OCR rozpoznalo jen ${detectedPokemon.length} Pokémonů z požadovaných ${minRequiredCount} – odesláno k ruční kontrole adminem.`,
      provider: ocr.provider,
      detectedPokemon,
      age0Detected,
      rawTextSnippet,
      checkedAt,
    };
  }

  // Check optional age0 requirement
  if (config.requireAge0 && !age0Detected) {
    return {
      status: 'rejected',
      reason:
        'Na screenshotu nebyl rozpoznán požadovaný filtr „age0“ ve vyhledávací liště inventáře.',
      provider: ocr.provider,
      detectedPokemon,
      age0Detected,
      rawTextSnippet,
      checkedAt,
    };
  }

  // Evaluate sequence rule in BOTH directions (forward L->R and reverse chronological R->L)
  const reversed = [...detectedPokemon].reverse();

  if (config.ruleMode === 'alphabetical') {
    const len = Math.max(2, Math.min(8, Number(config.comboLength) || 3));
    const fwd = findAlphabeticalSubsequence(detectedPokemon, len);
    const rev = fwd ? null : findAlphabeticalSubsequence(reversed, len);
    const matched = fwd || rev;
    if (matched) {
      return {
        status: 'approved',
        reason: `Splněno! Nalezena abecední postupka: ${matched.join(' → ')}.`,
        provider: ocr.provider,
        detectedPokemon,
        matchedSequence: matched,
        matchedDirection: fwd ? 'forward' : 'reverse',
        age0Detected,
        rawTextSnippet,
        checkedAt,
      };
    }
    return {
      status: 'rejected',
      reason: `V rozpoznaných Pokémonech nebyla nalezena souvislá abecední postupka délky ${len}. Rozpoznáno: ${detectedPokemon.slice(0, 9).join(', ')}.`,
      provider: ocr.provider,
      detectedPokemon,
      age0Detected,
      rawTextSnippet,
      checkedAt,
    };
  }

  if (config.ruleMode === 'word_cipher') {
    const word = normalizeAlpha(config.targetWord || '').toUpperCase().replace(/[^A-Z]/g, '');
    if (!word) {
      return {
        status: 'pending_review',
        reason: 'V soutěži není nastaveno cílové slovo šifry – čeká na kontrolu adminem.',
        provider: ocr.provider,
        detectedPokemon,
        age0Detected,
        rawTextSnippet,
        checkedAt,
      };
    }
    const fwd = findWordCipherSubsequence(detectedPokemon, word);
    const rev = fwd ? null : findWordCipherSubsequence(reversed, word);
    const matched = fwd || rev;
    if (matched) {
      return {
        status: 'approved',
        reason: `Splněno! Šifra „${word}“ ověřena: ${matched.join(' → ')}.`,
        provider: ocr.provider,
        detectedPokemon,
        matchedSequence: matched,
        matchedDirection: fwd ? 'forward' : 'reverse',
        age0Detected,
        rawTextSnippet,
        checkedAt,
      };
    }
    return {
      status: 'rejected',
      reason: `V rozpoznaných Pokémonech nebyla nalezena souvislá řada tvořící slovo „${word}“. Rozpoznáno: ${detectedPokemon.slice(0, 9).join(', ')}.`,
      provider: ocr.provider,
      detectedPokemon,
      age0Detected,
      rawTextSnippet,
      checkedAt,
    };
  }

  // Mode: specific_pokemon
  const required = (config.requiredPokemon || []).map((p) => p.trim()).filter(Boolean);
  const detectedNormSet = new Set(detectedPokemon.map((p) => normalizeAlpha(p)));
  const matchedList: string[] = [];
  const missingList: string[] = [];

  for (const reqName of required) {
    const reqNorm = normalizeAlpha(reqName);
    if (detectedNormSet.has(reqNorm)) {
      matchedList.push(reqName);
    } else {
      missingList.push(reqName);
    }
  }

  if (missingList.length === 0 && required.length > 0) {
    return {
      status: 'approved',
      reason: `Splněno! Všichni požadovaní Pokémoni nalezeni: ${matchedList.join(', ')}.`,
      provider: ocr.provider,
      detectedPokemon,
      matchedSequence: matchedList,
      age0Detected,
      rawTextSnippet,
      checkedAt,
    };
  }

  return {
    status: 'rejected',
    reason: `Na screenshotu chybí požadovaní Pokémoni: ${missingList.join(', ')}.`,
    provider: ocr.provider,
    detectedPokemon,
    age0Detected,
    rawTextSnippet,
    checkedAt,
  };
}

export async function runInventoryComboVerification(
  screenshotDataUrl: string,
  config: InventoryComboConfig
): Promise<InventoryComboEvaluation> {
  const ocr = await extractTextFromScreenshot(screenshotDataUrl);
  return evaluateInventoryComboFromOcr(ocr, config);
}
