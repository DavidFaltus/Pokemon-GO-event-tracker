'use client';

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import {
  Gamepad2,
  BookOpen,
  Eye,
  Search,
  Flame,
  Trophy,
  Clock,
  Infinity as InfinityIcon,
  Calendar,
  Check,
  ExternalLink,
  RefreshCw,
  HelpCircle,
  Lock,
  Unlock,
  ArrowUp,
  ArrowDown,
  Flag,
  Sparkles,
  BarChart3,
  X,
  ArrowRight,
  Dices,
  Send,
  Users,
} from 'lucide-react';
import type { Language } from '../data/translations';
import { apiFetch } from '../config';
import { UnifiedTypeBadge, getTypeSvgUrl, TYPE_TRANSLATIONS, TYPE_COLORS } from '../utils/typeBadgeHelper';
import { useTheme } from '../context/ThemeContext';
import {
  POKEDLE_ALL,
  POKEDLE_BY_ID,
  POKEDLE_GO_POOL,
  COLOR_META,
  getPokedleLocalizedName,
  getDailyUtcDateKey,
  getDailyPuzzleNumber,
  getDailyTargetPokemon,
  pickRandomPokemon,
  evaluateClassicGuess,
  formatCountdownToUtcMidnight,
  getDefaultStorageState,
  loadPokedleStorage,
  savePokedleStorage,
  getPreviousUtcDateKey,
  getSilhouetteZoomScale,
  computeBetterThanPercentile,
  type PokedleMode,
  type PokedlePlayType,
  type PokedlePokemon,
  type PokedleStorageState,
  type PokedlePublicStats,
  type PokedleAttemptBucket,
} from '../utils/pokedleEngine';
import { PokedleSilhouetteCanvas } from './PokedleSilhouetteCanvas';
import './PokedleView.css';

interface PokedleViewProps {
  lang: Language;
}

type LoreMap = Record<string, { text: string; source: string }>;
const LORE_CACHE: Partial<Record<Language, LoreMap>> = {};
const QUICK_STARTER_IDS = [6, 25, 94, 448, 376]; // Charizard, Pikachu, Gengar, Lucario, Metagross
const SUBMITTED_STORAGE_KEY = 'pogo_pokedle_submitted_v1';
const ATTEMPT_BUCKETS: PokedleAttemptBucket[] = ['1', '2', '3', '4', '5', '6', '7+'];

function hasSubmittedDaily(dateKey: string, mode: PokedleMode): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const raw = localStorage.getItem(SUBMITTED_STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as Record<string, boolean>;
    return Boolean(parsed[`${dateKey}:${mode}`]);
  } catch {
    return false;
  }
}

function markSubmittedDaily(dateKey: string, mode: PokedleMode): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(SUBMITTED_STORAGE_KEY);
    const parsed: Record<string, boolean> = raw ? JSON.parse(raw) : {};
    parsed[`${dateKey}:${mode}`] = true;
    // Keep only the last 30 daily submissions to keep localStorage tiny
    const keys = Object.keys(parsed).sort();
    const trimmed: Record<string, boolean> = {};
    for (const k of keys.slice(-30)) {
      trimmed[k] = parsed[k];
    }
    localStorage.setItem(SUBMITTED_STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // Ignore storage quota errors
  }
}

const GEN_LABELS: Record<number, Record<Language, string>> = {
  1: { cs: 'Gen 1 (Kanto)', en: 'Gen 1 (Kanto)', ja: '第1世代 (カントー)', ru: 'Ген 1 (Канто)' },
  2: { cs: 'Gen 2 (Johto)', en: 'Gen 2 (Johto)', ja: '第2世代 (ジョウト)', ru: 'Ген 2 (Джото)' },
  3: { cs: 'Gen 3 (Hoenn)', en: 'Gen 3 (Hoenn)', ja: '第3世代 (ホウエン)', ru: 'Ген 3 (Хоэнн)' },
  4: { cs: 'Gen 4 (Sinnoh)', en: 'Gen 4 (Sinnoh)', ja: '第4世代 (シンオウ)', ru: 'Ген 4 (Синно)' },
  5: { cs: 'Gen 5 (Unova)', en: 'Gen 5 (Unova)', ja: '第5世代 (イッシュ)', ru: 'Ген 5 (Юнова)' },
  6: { cs: 'Gen 6 (Kalos)', en: 'Gen 6 (Kalos)', ja: '第6世代 (カロス)', ru: 'Ген 6 (Калос)' },
  7: { cs: 'Gen 7 (Alola)', en: 'Gen 7 (Alola)', ja: '第7世代 (アローラ)', ru: 'Ген 7 (Алола)' },
  8: { cs: 'Gen 8 (Galar)', en: 'Gen 8 (Galar)', ja: '第8世代 (ガラル)', ru: 'Ген 8 (Галар)' },
  9: { cs: 'Gen 9 (Paldea)', en: 'Gen 9 (Paldea)', ja: '第9世代 (パルデア)', ru: 'Ген 9 (Палдея)' },
};

const UI_TEXT: Record<
  Language,
  {
    subtitle: string;
    daily: string;
    endless: string;
    allGens: string;
    modeClassic: string;
    modeLore: string;
    modeSilhouette: string;
    helpBtn: string;
    helpTitle: string;
    helpIntro: string;
    helpClassicDesc: string;
    helpLoreDesc: string;
    helpSilhouetteDesc: string;
    firstGuessBadge: string;
    nextGuessBadge: (n: number) => string;
    firstGuessTitle: string;
    nextGuessTitle: string;
    guessBtn: string;
    quickStartLabel: string;
    randomStart: string;
    emptyGridHint: string;
    searchPlaceholder: string;
    noMatches: string;
    colPokemon: string;
    colType1: string;
    colType2: string;
    colGen: string;
    colEvo: string;
    colCp: string;
    colColor: string;
    typeNone: string;
    evoStage: string;
    legendExact: string;
    legendPartial: string;
    legendWrong: string;
    legendArrows: string;
    loreLoading: string;
    lorePrompt: string;
    silhouettePrompt: string;
    zoomLabel: string;
    hintGen: string;
    hintTypes: string;
    hintColorLetter: string;
    hintLocked: (n: number) => string;
    startsWith: string;
    giveUp: string;
    winTitle: string;
    giveUpTitle: string;
    attempts: (n: number) => string;
    copyResult: string;
    copied: string;
    downloadPng: string;
    downloading: string;
    openPokedex: string;
    nextDailyMode: string;
    playAgain: string;
    newPokemon: string;
    nextIn: string;
    streak: string;
    statsTitle: string;
    statCurrentStreak: string;
    statBestStreak: string;
    statTotalWins: string;
    close: string;
    alreadyGuessed: string;
    communityTodayLine: (won: number, winRate: number, avg: number) => string;
    betterThanPct: (pct: number) => string;
    communityStatsTitle: string;
    communityTotalWon: string;
    communityWinRate: string;
    communityAvgTries: string;
    communityDistribution: string;
  }
> = {
  cs: {
    subtitle: 'Denní hádací hra pro trenéry Pokémon GO — 3 režimy každý den i nekonečný trénink.',
    daily: 'Denní výzva',
    endless: 'Nekonečný',
    allGens: 'Vše',
    modeClassic: 'Klasický',
    modeLore: 'Pokédex Hláška',
    modeSilhouette: 'Silueta',
    helpBtn: 'Nápověda',
    helpTitle: 'Nápověda & Pravidla PoGoDle',
    helpIntro: 'Každý den o půlnoci UTC se odemknou 3 nové hádanky z Pokémonů vydaných v Pokémon GO. V Nekonečném režimu (∞) můžeš trénovat bez omezení.',
    helpClassicDesc: 'Porovnává 6 atributů: Typ 1, Typ 2, Generaci (↑/↓), Fázi evoluce (1/2/3), Max CP na Lv50 (↑/↓) a Barvu.',
    helpLoreDesc: 'Uhádni Pokémona podle oficiálního českého Pokédex záznamu se skrytým jménem [???]. Postupně se odemykají 3 nápovědy.',
    helpSilhouetteDesc: 'Poznej Pokémona podle přiblížené siluety na plátně, která se s každým pokusem oddaluje.',
    firstGuessBadge: 'START • TIP #1',
    nextGuessBadge: (n) => `POKUS #${n}`,
    firstGuessTitle: 'Zadej svého úvodního Pokémona',
    nextGuessTitle: 'Kdo je hledaný Pokémon? Zadej další tip',
    guessBtn: 'Hádat',
    quickStartLabel: 'Nebo začni jedním kliknutím:',
    randomStart: 'Náhodný start',
    emptyGridHint: 'Zadej svůj první tip výše — zde se okamžitě porovná všech 6 atributů (Typ 1, Typ 2, Generace, Evoluce, Max CP a Barva).',
    searchPlaceholder: 'Napiš jméno Pokémona (např. Charizard) nebo #číslo...',
    noMatches: 'Žádný další Pokémon neodpovídá hledání.',
    colPokemon: 'Pokémon',
    colType1: 'Typ 1',
    colType2: 'Typ 2',
    colGen: 'Gen',
    colEvo: 'Evoluce',
    colCp: 'Max CP',
    colColor: 'Barva',
    typeNone: 'Žádný',
    evoStage: 'Fáze',
    legendExact: 'Přesná shoda',
    legendPartial: 'Prohozený typ',
    legendWrong: 'Vedle',
    legendArrows: 'Vyšší / Nižší hodnota',
    loreLoading: 'Načítám záznam z Pokédexu...',
    lorePrompt: 'Poznej Pokémona podle jeho oficiálního Pokédex záznamu:',
    silhouettePrompt: 'Kdo je ten Pokémon? S každým pokusem se silueta oddálí.',
    zoomLabel: 'Přiblížení',
    hintGen: 'Nápověda 1: Generace',
    hintTypes: 'Nápověda 2: Typy',
    hintColorLetter: 'Nápověda 3: Barva & první písmeno',
    hintLocked: (n) => `Odemkne se za ${n} ${n === 1 ? 'pokus' : n < 5 ? 'pokusy' : 'pokusů'}`,
    startsWith: 'Začíná na',
    giveUp: 'Vzdát se a odhalit',
    winTitle: 'Výborně! Uhodl jsi!',
    giveUpTitle: 'Hledaný Pokémon byl:',
    attempts: (n) => `${n} ${n === 1 ? 'pokus' : n < 5 ? 'pokusy' : 'pokusů'}`,
    copyResult: 'Kopírovat výsledek',
    copied: 'Zkopírováno!',
    downloadPng: 'Stáhnout PNG kartu',
    downloading: 'Generuji PNG...',
    openPokedex: 'Otevřít v Pokédexu',
    nextDailyMode: 'Další denní režim',
    playAgain: 'Další Pokémon',
    newPokemon: 'Nový Pokémon',
    nextIn: 'Další denní výzva za',
    streak: 'Série',
    statsTitle: 'Tvoje PoGoDle statistiky',
    statCurrentStreak: 'Aktuální série',
    statBestStreak: 'Nejlepší série',
    statTotalWins: 'Celkem výher',
    close: 'Zavřít',
    alreadyGuessed: 'Tipnuté pokusy',
    communityTodayLine: (won, winRate, avg) =>
      `Dnes uhodlo ${won} trenérů • Úspěšnost ${winRate} % • Průměr ${avg} pokusů`,
    betterThanPct: (pct) => `Lepší než ${pct} % hráčů!`,
    communityStatsTitle: 'Komunitní statistiky',
    communityTotalWon: 'Celkem uhodnuto',
    communityWinRate: 'Úspěšnost',
    communityAvgTries: 'Průměr pokusů',
    communityDistribution: 'Rozložení pokusů',
  },
  en: {
    subtitle: 'Daily Pokémon GO guessing game — 3 daily modes plus endless practice.',
    daily: 'Daily',
    endless: 'Endless',
    allGens: 'All',
    modeClassic: 'Classic',
    modeLore: 'Pokédex Entry',
    modeSilhouette: 'Silhouette',
    helpBtn: 'Help',
    helpTitle: 'PoGoDle Rules & Help',
    helpIntro: 'Three new puzzles unlock daily at 00:00 UTC from Pokémon released in Pokémon GO. Use Endless Mode (∞) for unlimited practice.',
    helpClassicDesc: 'Compares 6 attributes: Type 1, Type 2, Generation (↑/↓), Evolution Stage (1/2/3), Level 50 Max CP (↑/↓), and Color.',
    helpLoreDesc: 'Identify the Pokémon from its official Pokédex flavor text with masked names [???] and 3 progressive hints.',
    helpSilhouetteDesc: 'Guess the Pokémon from a zoomed-in canvas silhouette that zooms out after each miss.',
    firstGuessBadge: 'START • GUESS #1',
    nextGuessBadge: (n) => `GUESS #${n}`,
    firstGuessTitle: 'Enter your opening Pokémon guess',
    nextGuessTitle: 'Who is the mystery Pokémon? Enter your next guess',
    guessBtn: 'Guess',
    quickStartLabel: 'Or start with 1 click:',
    randomStart: 'Random Starter',
    emptyGridHint: 'Enter your first guess above — all 6 attributes (Type 1, Type 2, Generation, Stage, Max CP, and Color) will compare here.',
    searchPlaceholder: 'Type a Pokémon name (e.g. Charizard) or #number...',
    noMatches: 'No remaining Pokémon match your search.',
    colPokemon: 'Pokémon',
    colType1: 'Type 1',
    colType2: 'Type 2',
    colGen: 'Gen',
    colEvo: 'Stage',
    colCp: 'Max CP',
    colColor: 'Color',
    typeNone: 'None',
    evoStage: 'Stage',
    legendExact: 'Exact match',
    legendPartial: 'Swapped type',
    legendWrong: 'Miss',
    legendArrows: 'Target is higher / lower',
    loreLoading: 'Loading Pokédex entry...',
    lorePrompt: 'Guess the Pokémon from its official Pokédex description:',
    silhouettePrompt: "Who's that Pokémon? Each guess zooms out further.",
    zoomLabel: 'Zoom',
    hintGen: 'Hint 1: Generation',
    hintTypes: 'Hint 2: Types',
    hintColorLetter: 'Hint 3: Color & First Letter',
    hintLocked: (n) => `Unlocks in ${n} ${n === 1 ? 'guess' : 'guesses'}`,
    startsWith: 'Starts with',
    giveUp: 'Give up & reveal',
    winTitle: 'Awesome! You got it!',
    giveUpTitle: 'The mystery Pokémon was:',
    attempts: (n) => `${n} ${n === 1 ? 'try' : 'tries'}`,
    copyResult: 'Copy Result',
    copied: 'Copied!',
    downloadPng: 'Download PNG Card',
    downloading: 'Generating PNG...',
    openPokedex: 'Open in Pokédex',
    nextDailyMode: 'Next Daily Mode',
    playAgain: 'Next Pokémon',
    newPokemon: 'New Pokémon',
    nextIn: 'Next daily challenge in',
    streak: 'Streak',
    statsTitle: 'Your PoGoDle Stats',
    statCurrentStreak: 'Current Streak',
    statBestStreak: 'Best Streak',
    statTotalWins: 'Total Wins',
    close: 'Close',
    alreadyGuessed: 'Your guesses',
    communityTodayLine: (won, winRate, avg) =>
      `Solved by ${won} trainers today • ${winRate}% win rate • Avg ${avg} tries`,
    betterThanPct: (pct) => `Better than ${pct}% of players!`,
    communityStatsTitle: 'Community Stats',
    communityTotalWon: 'Total Solved',
    communityWinRate: 'Win Rate',
    communityAvgTries: 'Avg Tries',
    communityDistribution: 'Guess Distribution',
  },
  ja: {
    subtitle: 'Pokémon GOトレーナー向け毎日クイズ — 3つのデイリーモード＋エンドレス練習。',
    daily: 'デイリー挑戦',
    endless: 'エンドレス',
    allGens: '全て',
    modeClassic: 'クラシック',
    modeLore: '図鑑説明',
    modeSilhouette: 'シルエット',
    helpBtn: 'ヘルプ',
    helpTitle: 'PoGoDle の遊び方・ヘルプ',
    helpIntro: '毎日 UTC 0:00 に Pokémon GO 実装済みポケモンから3つの問題が更新されます。',
    helpClassicDesc: 'タイプ1・タイプ2・世代・進化段階・最大CP(PL50)・色の6項目を比較します。',
    helpLoreDesc: '名前が [???] で隠された公式図鑑説明文と3段階のヒントからポケモンを当てます。',
    helpSilhouetteDesc: '拡大されたシルエット（回答するたびにズームアウト）からポケモンを当てます。',
    firstGuessBadge: 'スタート • 1回目',
    nextGuessBadge: (n) => `${n}回目の予想`,
    firstGuessTitle: '最初のポケモンを入力してスタート！',
    nextGuessTitle: '次のポケモンを予想しよう',
    guessBtn: '回答する',
    quickStartLabel: 'ワンクリックで最初の予想：',
    randomStart: 'ランダム開始',
    emptyGridHint: '上のボックスから最初のポケモンを選ぶと、ここに6つの属性比較が表示されます。',
    searchPlaceholder: 'ポケモン名または図鑑番号を入力...',
    noMatches: '該当するポケモンが見つかりません。',
    colPokemon: 'ポケモン',
    colType1: 'タイプ1',
    colType2: 'タイプ2',
    colGen: '世代',
    colEvo: '進化段階',
    colCp: '最大CP',
    colColor: '色',
    typeNone: 'なし',
    evoStage: '段階',
    legendExact: '完全一致',
    legendPartial: 'タイプ逆転',
    legendWrong: '不一致',
    legendArrows: '正解は上 / 下',
    loreLoading: '図鑑説明を読み込み中...',
    lorePrompt: '公式のポケモン図鑑の説明文からポケモンを当てよう：',
    silhouettePrompt: 'だーれだ？予想するたびにズームアウトします。',
    zoomLabel: 'ズーム',
    hintGen: 'ヒント1：世代',
    hintTypes: 'ヒント2：タイプ',
    hintColorLetter: 'ヒント3：色と頭文字',
    hintLocked: (n) => `あと${n}回で解放`,
    startsWith: '最初の文字',
    giveUp: 'あきらめて答えを見る',
    winTitle: '正解！お見事！',
    giveUpTitle: '正解のポケモン：',
    attempts: (n) => `${n}回`,
    copyResult: '結果をコピー',
    copied: 'コピーしました！',
    downloadPng: 'PNGカードを保存',
    downloading: '作成中...',
    openPokedex: '図鑑で詳しく見る',
    nextDailyMode: '次のデイリーモード',
    playAgain: '次のポケモン',
    newPokemon: '新しいポケモン',
    nextIn: '次の更新まで',
    streak: '連続記録',
    statsTitle: 'PoGoDle 戦績',
    statCurrentStreak: '現在の連続記録',
    statBestStreak: '最高連続記録',
    statTotalWins: '累計正解数',
    close: '閉じる',
    alreadyGuessed: '回答履歴',
    communityTodayLine: (won, winRate, avg) =>
      `本日の正解者 ${won}人 • 正解率 ${winRate}% • 平均 ${avg}回`,
    betterThanPct: (pct) => `${pct}%のプレイヤーより好成績！`,
    communityStatsTitle: 'コミュニティ統計',
    communityTotalWon: '累計正解数',
    communityWinRate: '正解率',
    communityAvgTries: '平均回数',
    communityDistribution: '回答回数の分布',
  },
  ru: {
    subtitle: 'Ежедневная игра-угадайка для тренеров Pokémon GO — 3 режима каждый день и бесконечная тренировка.',
    daily: 'Дневной',
    endless: 'Бесконечный',
    allGens: 'Все',
    modeClassic: 'Классика',
    modeLore: 'Описание',
    modeSilhouette: 'Силуэт',
    helpBtn: 'Помощь',
    helpTitle: 'Правила и помощь PoGoDle',
    helpIntro: 'Каждый день в 00:00 UTC открываются 3 новые загадки из покемонов, доступных в Pokémon GO.',
    helpClassicDesc: 'Сравнивает 6 атрибутов: Тип 1, Тип 2, Поколение (↑/↓), Эволюцию (1/2/3), Макс CP (↑/↓) и Цвет.',
    helpLoreDesc: 'Угадайте покемона по официальному описанию Покедекса со скрытым именем [???] и 3 подсказками.',
    helpSilhouetteDesc: 'Угадайте покемона по приближенному силуэту, который отдаляется с каждой попыткой.',
    firstGuessBadge: 'СТАРТ • ПОПЫТКА #1',
    nextGuessBadge: (n) => `ПОПЫТКА #${n}`,
    firstGuessTitle: 'Введите первого покемона для старта',
    nextGuessTitle: 'Кто загаданный покемон? Введите следующую догадку',
    guessBtn: 'Угадать',
    quickStartLabel: 'Или начните в 1 клик:',
    randomStart: 'Случайный старт',
    emptyGridHint: 'Введите первого покемона выше — здесь сразу появится сравнение всех 6 параметров.',
    searchPlaceholder: 'Введите имя покемона или #номер...',
    noMatches: 'Подходящих покемонов не найдено.',
    colPokemon: 'Покемон',
    colType1: 'Тип 1',
    colType2: 'Тип 2',
    colGen: 'Ген',
    colEvo: 'Эвол.',
    colCp: 'Макс CP',
    colColor: 'Цвет',
    typeNone: 'Нет',
    evoStage: 'Стадия',
    legendExact: 'Точное совпадение',
    legendPartial: 'Другой слот типа',
    legendWrong: 'Мимо',
    legendArrows: 'Цель выше / ниже',
    loreLoading: 'Загрузка записи Покедекса...',
    lorePrompt: 'Угадай покемона по его официальному описанию из Покедекса:',
    silhouettePrompt: 'Кто этот покемон? С каждой попыткой силуэт отдаляется.',
    zoomLabel: 'Зум',
    hintGen: 'Подсказка 1: Поколение',
    hintTypes: 'Подсказка 2: Типы',
    hintColorLetter: 'Подсказка 3: Цвет и первая буква',
    hintLocked: (n) => `Откроется через ${n} поп.`,
    startsWith: 'Начинается на',
    giveUp: 'Сдаться и показать',
    winTitle: 'Отлично! Угадано!',
    giveUpTitle: 'Загаданный покемон:',
    attempts: (n) => `${n} поп.`,
    copyResult: 'Копировать результат',
    copied: 'Скопировано!',
    downloadPng: 'Скачать PNG-карту',
    downloading: 'Создание PNG...',
    openPokedex: 'Открыть в Покедексе',
    nextDailyMode: 'Следующий режим',
    playAgain: 'Следующий покемон',
    newPokemon: 'Новый покемон',
    nextIn: 'До следующего дня',
    streak: 'Серия',
    statsTitle: 'Статистика PoGoDle',
    statCurrentStreak: 'Текущая серия',
    statBestStreak: 'Лучшая серия',
    statTotalWins: 'Всего побед',
    close: 'Закрыть',
    alreadyGuessed: 'Ваши попытки',
    communityTodayLine: (won, winRate, avg) =>
      `Сегодня угадали ${won} трен. • Успех ${winRate}% • В среднем ${avg} поп.`,
    betterThanPct: (pct) => `Лучше, чем ${pct}% игроков!`,
    communityStatsTitle: 'Статистика сообщества',
    communityTotalWon: 'Всего угадано',
    communityWinRate: 'Успешность',
    communityAvgTries: 'Ср. попыток',
    communityDistribution: 'Распределение попыток',
  },
};

function getArtworkUrl(dexId: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${dexId}.png`;
}

export const PokedleView: React.FC<PokedleViewProps> = ({ lang }) => {
  const ui = UI_TEXT[lang] || UI_TEXT.en;
  const { theme } = useTheme();
  const isLightMode = theme === 'light';

  const [playType, setPlayType] = useState<PokedlePlayType>('daily');
  const [mode, setMode] = useState<PokedleMode>('classic');
  const [endlessGen, setEndlessGen] = useState<number | 'all'>('all');

  // IMPORTANT: Initialize with deterministic SSR defaults so SSR HTML and initial client hydration match 100%
  const [dateKey, setDateKey] = useState<string>('2026-11-19');
  const [countdown, setCountdown] = useState<string>('--:--:--');
  const [storage, setStorage] = useState<PokedleStorageState>(() => getDefaultStorageState());

  // Endless mode state
  const [endlessTarget, setEndlessTarget] = useState<PokedlePokemon>(() => POKEDLE_GO_POOL[0]);
  const [endlessGuessIds, setEndlessGuessIds] = useState<number[]>([]);
  const [endlessWon, setEndlessWon] = useState(false);
  const [endlessGaveUp, setEndlessGaveUp] = useState(false);

  // Lazy-loaded masked lore map for active language
  const [loreMap, setLoreMap] = useState<LoreMap | null>(() => LORE_CACHE[lang] || null);
  const [loreLoading, setLoreLoading] = useState(false);

  // Search autocomplete state
  const [query, setQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState(0);
  const searchBoxRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Modal state
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  // Community analytics state (loaded post-hydration only; shown strictly when sample >= 10 wins)
  const [hydrated, setHydrated] = useState(false);
  const [communityStats, setCommunityStats] = useState<PokedlePublicStats | null>(null);
  const inFlightRecordsRef = useRef<Set<string>>(new Set());

  // Sync localStorage & midnight countdown strictly on client mount (post-hydration)
  useEffect(() => {
    const today = getDailyUtcDateKey();
    setDateKey(today);
    setStorage(loadPokedleStorage());
    setCountdown(formatCountdownToUtcMidnight());
    setEndlessTarget(pickRandomPokemon(POKEDLE_ALL));
    setHydrated(true);

    const timer = setInterval(() => {
      const now = new Date();
      const nowKey = getDailyUtcDateKey(now);
      setDateKey((prev) => (prev !== nowKey ? nowKey : prev));
      setCountdown(formatCountdownToUtcMidnight(now));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch public community stats after client hydration
  useEffect(() => {
    if (!hydrated) return;
    let cancelled = false;
    apiFetch(`/api/pokedle/stats?date=${encodeURIComponent(dateKey)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: PokedlePublicStats | null) => {
        if (!cancelled && data && typeof data.minSampleThreshold === 'number') {
          setCommunityStats(data);
        }
      })
      .catch(() => {
        // Silently ignore network/offline errors so game remains 100% playable offline
      });
    return () => {
      cancelled = true;
    };
  }, [hydrated, dateKey]);

  // Lazy-load masked Pokédex lore only when lore mode is active
  useEffect(() => {
    if (mode !== 'lore') return;
    if (LORE_CACHE[lang]) {
      setLoreMap(LORE_CACHE[lang]!);
      return;
    }
    let cancelled = false;
    setLoreLoading(true);
    fetch(`/data/pokedle/lore-${lang}.json`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: LoreMap | null) => {
        if (!cancelled && data) {
          LORE_CACHE[lang] = data;
          setLoreMap(data);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoreLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [mode, lang]);

  // Close dropdown on outside click
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const dayNumber = useMemo(() => getDailyPuzzleNumber(dateKey), [dateKey]);

  const endlessPool = useMemo(() => {
    if (endlessGen === 'all') return POKEDLE_ALL;
    return POKEDLE_ALL.filter((p) => p.gen === endlessGen);
  }, [endlessGen]);

  const activePool = playType === 'daily' ? POKEDLE_GO_POOL : endlessPool;

  const startNewEndlessRound = useCallback(
    (poolOverride?: PokedlePokemon[], prevId?: number) => {
      const pool = poolOverride || endlessPool;
      setEndlessTarget(pickRandomPokemon(pool, prevId));
      setEndlessGuessIds([]);
      setEndlessWon(false);
      setEndlessGaveUp(false);
      setQuery('');
      setDropdownOpen(false);
    },
    [endlessPool]
  );

  // Switch playType
  const handleSelectPlayType = (nextType: PokedlePlayType) => {
    setPlayType(nextType);
    setQuery('');
    setDropdownOpen(false);
    if (nextType === 'endless' && endlessGuessIds.length === 0 && !endlessWon && !endlessGaveUp) {
      setEndlessTarget(pickRandomPokemon(endlessPool));
    }
  };

  // Switch endless generation
  const handleSelectEndlessGen = (gen: number | 'all') => {
    setEndlessGen(gen);
    const nextPool = gen === 'all' ? POKEDLE_ALL : POKEDLE_ALL.filter((p) => p.gen === gen);
    startNewEndlessRound(nextPool);
  };

  // Active target & round state
  const target: PokedlePokemon = useMemo(() => {
    if (playType === 'endless') return endlessTarget;
    return getDailyTargetPokemon(dateKey, mode, POKEDLE_GO_POOL);
  }, [playType, endlessTarget, dateKey, mode]);

  const dailyModeState = storage.daily[dateKey]?.[mode];
  const guessIds = playType === 'daily' ? dailyModeState?.guessIds || [] : endlessGuessIds;
  const won = playType === 'daily' ? Boolean(dailyModeState?.won) : endlessWon;
  const gaveUp = playType === 'daily' ? Boolean(dailyModeState?.gaveUp) : endlessGaveUp;
  const isFinished = won || gaveUp;

  const guesses: PokedlePokemon[] = useMemo(
    () => guessIds.map((id) => POKEDLE_BY_ID[id]).filter(Boolean),
    [guessIds]
  );
  const guessedSet = useMemo(() => new Set(guessIds), [guessIds]);
  const wrongGuessCount = useMemo(
    () => guesses.filter((g) => g.id !== target.id).length,
    [guesses, target.id]
  );

  // Quick starters filtered by activePool
  const quickStarters = useMemo(() => {
    const poolSet = new Set(activePool.map((p) => p.id));
    const list = QUICK_STARTER_IDS.filter((id) => poolSet.has(id) && !guessedSet.has(id))
      .map((id) => POKEDLE_BY_ID[id])
      .filter(Boolean);
    if (list.length > 0) return list;
    return activePool.filter((p) => !guessedSet.has(p.id)).slice(0, 4);
  }, [activePool, guessedSet]);

  // Autocomplete candidates
  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const numMatch = q.replace(/^#/, '');
    const isNum = /^\d+$/.test(numMatch);

    const scored: Array<{ poke: PokedlePokemon; score: number }> = [];
    for (const p of activePool) {
      if (guessedSet.has(p.id)) continue;
      const locName = getPokedleLocalizedName(p, lang).toLowerCase();
      const enName = p.names.en.toLowerCase();
      const jaName = p.names.ja.toLowerCase();
      const ruName = p.names.ru.toLowerCase();

      if (isNum && String(p.id) === numMatch) {
        scored.push({ poke: p, score: 100 });
      } else if (locName.startsWith(q) || enName.startsWith(q)) {
        scored.push({ poke: p, score: 90 });
      } else if (jaName.startsWith(q) || ruName.startsWith(q)) {
        scored.push({ poke: p, score: 85 });
      } else if (
        locName.includes(q) ||
        enName.includes(q) ||
        jaName.includes(q) ||
        ruName.includes(q) ||
        (isNum && String(p.id).startsWith(numMatch))
      ) {
        scored.push({ poke: p, score: 50 });
      }
    }
    scored.sort((a, b) => b.score - a.score || a.poke.id - b.poke.id);
    return scored.slice(0, 8).map((s) => s.poke);
  }, [query, activePool, guessedSet, lang]);

  useEffect(() => {
    setHighlightIdx(0);
  }, [query]);

  // Record completed round to backend analytics (deduplicated per daily dateKey+mode)
  const recordCompletedRound = useCallback(
    (params: {
      roundDateKey: string;
      roundMode: PokedleMode;
      roundPlayType: PokedlePlayType;
      roundWon: boolean;
      finalGuessIds: number[];
      pokemonId: number;
    }) => {
      const { roundDateKey, roundMode, roundPlayType, roundWon, finalGuessIds, pokemonId } = params;
      if (finalGuessIds.length < 1) return;

      if (roundPlayType === 'daily') {
        const dedupKey = `${roundDateKey}:${roundMode}`;
        if (hasSubmittedDaily(roundDateKey, roundMode) || inFlightRecordsRef.current.has(dedupKey)) {
          return;
        }
        inFlightRecordsRef.current.add(dedupKey);
        markSubmittedDaily(roundDateKey, roundMode);
      }

      apiFetch('/api/pokedle/record', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dateKey: roundDateKey,
          mode: roundMode,
          playType: roundPlayType,
          won: roundWon,
          attempts: finalGuessIds.length,
          pokemonId,
          firstGuessId: finalGuessIds[0],
        }),
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((json: { success?: boolean; stats?: PokedlePublicStats } | null) => {
          if (json?.stats && typeof json.stats.minSampleThreshold === 'number') {
            setCommunityStats(json.stats);
          }
        })
        .catch(() => {
          // Silently ignore offline/network errors
        })
        .finally(() => {
          if (roundPlayType === 'daily') {
            inFlightRecordsRef.current.delete(`${roundDateKey}:${roundMode}`);
          }
        });
    },
    []
  );

  // Submit guess
  const submitGuess = useCallback(
    (poke: PokedlePokemon) => {
      if (isFinished || guessedSet.has(poke.id)) return;
      const isWin = poke.id === target.id;
      const finalGuessIds = [...guessIds, poke.id];
      setQuery('');
      setDropdownOpen(false);

      if (playType === 'endless') {
        setEndlessGuessIds(finalGuessIds);
        if (isWin) {
          setEndlessWon(true);
          recordCompletedRound({
            roundDateKey: dateKey,
            roundMode: mode,
            roundPlayType: 'endless',
            roundWon: true,
            finalGuessIds,
            pokemonId: target.id,
          });
        }
        return;
      }

      if (isWin) {
        recordCompletedRound({
          roundDateKey: dateKey,
          roundMode: mode,
          roundPlayType: 'daily',
          roundWon: true,
          finalGuessIds,
          pokemonId: target.id,
        });
      }

      setStorage((prev) => {
        const dayEntry = prev.daily[dateKey] || {};
        const prevMode = dayEntry[mode] || { guessIds: [], won: false, gaveUp: false };
        const nextMode = {
          guessIds: [...prevMode.guessIds, poke.id],
          won: prevMode.won || isWin,
          gaveUp: prevMode.gaveUp,
        };
        const nextStats = {
          ...prev.stats,
          winsByMode: { ...prev.stats.winsByMode },
        };

        if (isWin && !prevMode.won) {
          nextStats.totalWins += 1;
          nextStats.winsByMode[mode] = (nextStats.winsByMode[mode] || 0) + 1;
          const prevDate = getPreviousUtcDateKey(dateKey);
          if (nextStats.lastCompletedDate !== dateKey) {
            if (nextStats.lastCompletedDate === prevDate) {
              nextStats.currentStreak += 1;
            } else {
              nextStats.currentStreak = 1;
            }
            nextStats.maxStreak = Math.max(nextStats.maxStreak, nextStats.currentStreak);
            nextStats.lastCompletedDate = dateKey;
          }
        }

        const nextState: PokedleStorageState = {
          daily: {
            ...prev.daily,
            [dateKey]: {
              ...dayEntry,
              [mode]: nextMode,
            },
          },
          stats: nextStats,
        };
        savePokedleStorage(nextState);
        return nextState;
      });
    },
    [isFinished, guessedSet, guessIds, target.id, playType, dateKey, mode, recordCompletedRound]
  );

  const handleGuessButtonClick = () => {
    if (suggestions[highlightIdx]) {
      submitGuess(suggestions[highlightIdx]);
    } else if (suggestions[0]) {
      submitGuess(suggestions[0]);
    } else {
      searchInputRef.current?.focus();
    }
  };

  const handleGiveUp = () => {
    if (isFinished) return;
    if (guessIds.length > 0) {
      recordCompletedRound({
        roundDateKey: dateKey,
        roundMode: mode,
        roundPlayType: playType,
        roundWon: false,
        finalGuessIds: guessIds,
        pokemonId: target.id,
      });
    }
    if (playType === 'endless') {
      setEndlessGaveUp(true);
      return;
    }
    setStorage((prev) => {
      const dayEntry = prev.daily[dateKey] || {};
      const prevMode = dayEntry[mode] || { guessIds: [], won: false, gaveUp: false };
      const nextState: PokedleStorageState = {
        ...prev,
        daily: {
          ...prev.daily,
          [dateKey]: {
            ...dayEntry,
            [mode]: { ...prevMode, gaveUp: true },
          },
        },
      };
      savePokedleStorage(nextState);
      return nextState;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setDropdownOpen(true);
      setHighlightIdx((prev) => Math.min(prev + 1, Math.max(0, suggestions.length - 1)));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIdx((prev) => Math.max(0, prev - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (suggestions[highlightIdx]) {
        submitGuess(suggestions[highlightIdx]);
      }
    } else if (e.key === 'Escape') {
      setDropdownOpen(false);
    }
  };

  // Next uncompleted daily mode helper
  const nextUnsolvedDailyMode: PokedleMode | null = useMemo(() => {
    if (playType !== 'daily') return null;
    const order: PokedleMode[] = ['classic', 'lore', 'silhouette'];
    const dayData = storage.daily[dateKey] || {};
    return order.find((m) => m !== mode && !dayData[m]?.won && !dayData[m]?.gaveUp) || null;
  }, [playType, storage.daily, dateKey, mode]);

  const todayCompletion = storage.daily[dateKey] || {};
  const targetName = getPokedleLocalizedName(target, lang);
  const currentLore = loreMap?.[String(target.id)];
  const currentZoom = getSilhouetteZoomScale(wrongGuessCount, isFinished);

  // Public community stats — strictly gated on >= 10 guessed Pokémon (ready / globalReady)
  const todayModeStats =
    playType === 'daily' &&
    communityStats?.today?.[mode]?.ready &&
    (communityStats.today[mode]?.won ?? 0) >= 10
      ? communityStats.today[mode]
      : null;

  const victoryPercentile = useMemo(() => {
    if (!won || !communityStats) return null;
    const buckets =
      playType === 'daily' && communityStats.today?.[mode]?.ready
        ? communityStats.today[mode]!.attemptBuckets
        : communityStats.globalReady && communityStats.global
          ? communityStats.global.attemptBuckets
          : null;
    if (!buckets) return null;
    const pct = computeBetterThanPercentile(guesses.length, buckets);
    return pct !== null && pct > 0 ? pct : null;
  }, [won, communityStats, playType, mode, guesses.length]);

  const globalCommunity =
    communityStats?.globalReady && communityStats.global && communityStats.global.won >= 10
      ? communityStats.global
      : null;

  return (
    <div className="pokedle-container">
      {/* ─── Header & Controls Card ──────────────────────────────────────────── */}
      <header className="pokedle-header-card">
        <div className="pokedle-header-top">
          <div className="pokedle-brand-group">
            <span className="pokedle-brand-badge">
              <Gamepad2 size={15} />
              <span>PoGoDle {playType === 'daily' ? `#${dayNumber}` : '∞'}</span>
            </span>
            <h1 className="tab-seo-title pokedle-title">PoGoDle</h1>
          </div>

          <div className="pokedle-header-metrics">
            <div className="pokedle-metric-pill streak" title={ui.streak}>
              <Flame size={14} />
              <span>{storage.stats.currentStreak}</span>
            </div>
            {playType === 'daily' && (
              <div className="pokedle-metric-pill timer" title={ui.nextIn}>
                <Clock size={14} />
                <span>{countdown}</span>
              </div>
            )}
            <button
              type="button"
              className="pokedle-icon-btn"
              onClick={() => setShowStatsModal(true)}
              aria-label={ui.statsTitle}
              title={ui.statsTitle}
            >
              <BarChart3 size={16} />
            </button>
            <button
              type="button"
              className="pokedle-help-pill-btn"
              onClick={() => setShowHelpModal(true)}
              aria-label={ui.helpBtn}
              title={ui.helpBtn}
            >
              <HelpCircle size={15} />
              <span>{ui.helpBtn}</span>
            </button>
          </div>
        </div>

        <p className="tab-seo-description pokedle-subtitle">{ui.subtitle}</p>

        {/* Daily vs Endless Switcher */}
        <div className="pokedle-playtype-row">
          <div className="pokedle-segmented-toggle" role="tablist" aria-label="Game type">
            <button
              type="button"
              role="tab"
              aria-selected={playType === 'daily'}
              className={`pokedle-seg-btn ${playType === 'daily' ? 'active' : ''}`}
              onClick={() => handleSelectPlayType('daily')}
            >
              <Calendar size={14} />
              <span>{ui.daily}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={playType === 'endless'}
              className={`pokedle-seg-btn ${playType === 'endless' ? 'active' : ''}`}
              onClick={() => handleSelectPlayType('endless')}
            >
              <InfinityIcon size={14} />
              <span>{ui.endless}</span>
            </button>
          </div>

          {playType === 'endless' && (
            <div className="pokedle-endless-controls">
              <select
                className="pokedle-gen-select"
                aria-label={ui.colGen}
                value={endlessGen === 'all' ? 'all' : String(endlessGen)}
                onChange={(e) => {
                  const val = e.target.value;
                  handleSelectEndlessGen(val === 'all' ? 'all' : Number(val));
                }}
              >
                <option value="all">{ui.allGens}</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((g) => (
                  <option key={g} value={String(g)}>
                    Gen {g}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="pokedle-new-round-btn"
                onClick={() => startNewEndlessRound(endlessPool, target.id)}
                title={ui.newPokemon}
              >
                <RefreshCw size={14} />
                <span className="pokedle-new-round-label">{ui.newPokemon}</span>
              </button>
            </div>
          )}
        </div>

        {/* 3 Mode Tabs */}
        <div className="pokedle-mode-tabs" role="tablist" aria-label="PoGoDle modes">
          {(
            [
              { id: 'classic', label: ui.modeClassic, icon: <Trophy size={15} /> },
              { id: 'lore', label: ui.modeLore, icon: <BookOpen size={15} /> },
              { id: 'silhouette', label: ui.modeSilhouette, icon: <Eye size={15} /> },
            ] as const
          ).map((tab) => {
            const doneToday = playType === 'daily' && Boolean(todayCompletion[tab.id]?.won);
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={mode === tab.id}
                className={`pokedle-mode-tab ${mode === tab.id ? 'active' : ''} ${doneToday ? 'completed' : ''}`}
                onClick={() => {
                  setMode(tab.id);
                  setQuery('');
                  setDropdownOpen(false);
                  if (playType === 'endless') {
                    startNewEndlessRound(endlessPool, target.id);
                  }
                }}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {doneToday && <Check size={14} className="pokedle-tab-check" />}
              </button>
            );
          })}
        </div>

        {/* Community daily stats line (strictly shown only once >= 10 trainers solved today's mode) */}
        {todayModeStats && (
          <div className="pokedle-community-strip">
            <Users size={13} />
            <span>
              {ui.communityTodayLine(
                todayModeStats.won,
                todayModeStats.winRate,
                todayModeStats.avgAttempts
              )}
            </span>
          </div>
        )}
      </header>

      {/* ─── Mode-Specific Prompt Stage (Lore & Silhouette) ──────────────────── */}
      {mode === 'lore' && (
        <section className="pokedle-stage-card">
          <p className="pokedle-stage-prompt">{ui.lorePrompt}</p>
          <div className="pokedle-lore-quote-panel">
            {loreLoading && !currentLore ? (
              <p className="pokedle-lore-loading">{ui.loreLoading}</p>
            ) : (
              <>
                <blockquote className="pokedle-lore-text">
                  „{currentLore?.text || '...'}“
                </blockquote>
                {currentLore?.source && (
                  <span className="pokedle-lore-source">
                    <BookOpen size={12} />
                    <span>Pokédex • {currentLore.source}</span>
                  </span>
                )}
              </>
            )}
          </div>

          {/* 3 Progressive Hints */}
          <div className="pokedle-hints-grid">
            <div className={`pokedle-hint-box ${wrongGuessCount >= 2 || isFinished ? 'unlocked' : 'locked'}`}>
              <span className="pokedle-hint-label">
                {wrongGuessCount >= 2 || isFinished ? <Unlock size={13} /> : <Lock size={13} />}
                <span>{ui.hintGen}</span>
              </span>
              {wrongGuessCount >= 2 || isFinished ? (
                <strong className="pokedle-hint-value">{GEN_LABELS[target.gen]?.[lang]}</strong>
              ) : (
                <span className="pokedle-hint-lock-msg">{ui.hintLocked(2 - wrongGuessCount)}</span>
              )}
            </div>

            <div className={`pokedle-hint-box ${wrongGuessCount >= 4 || isFinished ? 'unlocked' : 'locked'}`}>
              <span className="pokedle-hint-label">
                {wrongGuessCount >= 4 || isFinished ? <Unlock size={13} /> : <Lock size={13} />}
                <span>{ui.hintTypes}</span>
              </span>
              {wrongGuessCount >= 4 || isFinished ? (
                <div className="pokedle-hint-types">
                  <UnifiedTypeBadge type={target.t1} lang={lang} size="sm" showIcon={true} />
                  {target.t2 && <UnifiedTypeBadge type={target.t2} lang={lang} size="sm" showIcon={true} />}
                </div>
              ) : (
                <span className="pokedle-hint-lock-msg">{ui.hintLocked(4 - wrongGuessCount)}</span>
              )}
            </div>

            <div className={`pokedle-hint-box ${wrongGuessCount >= 6 || isFinished ? 'unlocked' : 'locked'}`}>
              <span className="pokedle-hint-label">
                {wrongGuessCount >= 6 || isFinished ? <Unlock size={13} /> : <Lock size={13} />}
                <span>{ui.hintColorLetter}</span>
              </span>
              {wrongGuessCount >= 6 || isFinished ? (
                <strong className="pokedle-hint-value">
                  <span
                    className="pokedle-color-dot"
                    style={{ backgroundColor: COLOR_META[target.col]?.hex || '#94a3b8' }}
                  />
                  {COLOR_META[target.col]?.labels[lang]} • {ui.startsWith} „{targetName.charAt(0)}“
                </strong>
              ) : (
                <span className="pokedle-hint-lock-msg">{ui.hintLocked(6 - wrongGuessCount)}</span>
              )}
            </div>
          </div>
        </section>
      )}

      {mode === 'silhouette' && (
        <section className="pokedle-stage-card pokedle-silhouette-card">
          <div className="pokedle-silhouette-header-row">
            <p className="pokedle-stage-prompt">{ui.silhouettePrompt}</p>
            <span className="pokedle-zoom-pill">
              {ui.zoomLabel}: {currentZoom.toFixed(2)}×
            </span>
          </div>

          <PokedleSilhouetteCanvas
            dexId={target.id}
            slug={target.slug}
            wrongGuesses={wrongGuessCount}
            revealed={isFinished}
            isLightMode={isLightMode}
          />

          <div className="pokedle-hints-grid two-cols">
            <div className={`pokedle-hint-box ${wrongGuessCount >= 3 || isFinished ? 'unlocked' : 'locked'}`}>
              <span className="pokedle-hint-label">
                {wrongGuessCount >= 3 || isFinished ? <Unlock size={13} /> : <Lock size={13} />}
                <span>{ui.hintGen}</span>
              </span>
              {wrongGuessCount >= 3 || isFinished ? (
                <strong className="pokedle-hint-value">{GEN_LABELS[target.gen]?.[lang]}</strong>
              ) : (
                <span className="pokedle-hint-lock-msg">{ui.hintLocked(3 - wrongGuessCount)}</span>
              )}
            </div>

            <div className={`pokedle-hint-box ${wrongGuessCount >= 5 || isFinished ? 'unlocked' : 'locked'}`}>
              <span className="pokedle-hint-label">
                {wrongGuessCount >= 5 || isFinished ? <Unlock size={13} /> : <Lock size={13} />}
                <span>{ui.hintTypes}</span>
              </span>
              {wrongGuessCount >= 5 || isFinished ? (
                <div className="pokedle-hint-types">
                  <UnifiedTypeBadge type={target.t1} lang={lang} size="sm" showIcon={true} />
                  {target.t2 && <UnifiedTypeBadge type={target.t2} lang={lang} size="sm" showIcon={true} />}
                </div>
              ) : (
                <span className="pokedle-hint-lock-msg">{ui.hintLocked(5 - wrongGuessCount)}</span>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ─── Hero Guessing Card (High-Contrast Input + Quick Starters) ───────── */}
      {!isFinished && (
        <section className="pokedle-guess-hero-card" ref={searchBoxRef}>
          <div className="pokedle-guess-hero-top">
            <div className="pokedle-guess-title-group">
              <span className="pokedle-guess-step-badge">
                <Sparkles size={12} />
                <span>
                  {guesses.length === 0
                    ? ui.firstGuessBadge
                    : ui.nextGuessBadge(guesses.length + 1)}
                </span>
              </span>
              <h2 className="pokedle-guess-hero-heading">
                {guesses.length === 0 ? ui.firstGuessTitle : ui.nextGuessTitle}
              </h2>
            </div>

            {guesses.length >= 3 && (
              <button
                type="button"
                className="pokedle-giveup-btn"
                onClick={handleGiveUp}
                title={ui.giveUp}
              >
                <Flag size={13} />
                <span>{ui.giveUp}</span>
              </button>
            )}
          </div>

          <div className="pokedle-search-bar-row">
            <div className="pokedle-search-input-wrap">
              <Search size={19} className="pokedle-search-icon" />
              <input
                ref={searchInputRef}
                type="text"
                className="pokedle-search-input"
                placeholder={ui.searchPlaceholder}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setDropdownOpen(true);
                }}
                onFocus={() => setDropdownOpen(true)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                aria-label={ui.searchPlaceholder}
              />
              {query && (
                <button
                  type="button"
                  className="pokedle-clear-query-btn"
                  onClick={() => {
                    setQuery('');
                    searchInputRef.current?.focus();
                  }}
                  aria-label="Clear"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            <button
              type="button"
              className="pokedle-submit-guess-btn"
              onClick={handleGuessButtonClick}
            >
              <Send size={16} />
              <span>{ui.guessBtn}</span>
            </button>

            {dropdownOpen && query.trim().length > 0 && (
              <div className="pokedle-dropdown" role="listbox">
                {suggestions.length === 0 ? (
                  <div className="pokedle-dropdown-empty">{ui.noMatches}</div>
                ) : (
                  suggestions.map((p, idx) => (
                    <button
                      key={p.id}
                      type="button"
                      role="option"
                      aria-selected={idx === highlightIdx}
                      className={`pokedle-dropdown-item ${idx === highlightIdx ? 'highlighted' : ''}`}
                      onClick={() => submitGuess(p)}
                      onMouseEnter={() => setHighlightIdx(idx)}
                    >
                      <img
                        src={getArtworkUrl(p.id)}
                        alt={p.names.en}
                        className="pokedle-dropdown-sprite"
                        loading="lazy"
                      />
                      <div className="pokedle-dropdown-meta">
                        <span className="pokedle-dropdown-name">
                          {getPokedleLocalizedName(p, lang)}
                          <span className="pokedle-dropdown-num">#{p.id}</span>
                        </span>
                        {(lang === 'ja' || lang === 'ru') && (
                          <span className="pokedle-dropdown-sub">{p.names.en}</span>
                        )}
                      </div>
                      <div className="pokedle-dropdown-types">
                        {[p.t1, p.t2].filter(Boolean).map((tp) => {
                          const tStr = tp as string;
                          const tLabel = TYPE_TRANSLATIONS[tStr]?.[lang] || tStr;
                          const cfg = TYPE_COLORS[tStr] || TYPE_COLORS.Normal;
                          return (
                            <span
                              key={tStr}
                              className="pokedle-dropdown-type-icon-pill"
                              title={tLabel}
                              style={{ backgroundColor: cfg.bg, borderColor: cfg.border }}
                            >
                              <img
                                src={getTypeSvgUrl(tStr, isLightMode)}
                                alt={tLabel}
                                className="pokedle-dropdown-type-svg"
                              />
                            </span>
                          );
                        })}
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          {/* 1-Click Quick Starters before first guess */}
          {guesses.length === 0 && (
            <div className="pokedle-quick-starters-row">
              <span className="pokedle-quick-label">{ui.quickStartLabel}</span>
              <div className="pokedle-quick-chips">
                {quickStarters.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className="pokedle-quick-chip"
                    onClick={() => submitGuess(p)}
                  >
                    <img src={getArtworkUrl(p.id)} alt={p.names.en} className="pokedle-quick-img" />
                    <span>{getPokedleLocalizedName(p, lang)}</span>
                  </button>
                ))}
                <button
                  type="button"
                  className="pokedle-quick-chip random"
                  onClick={() => submitGuess(pickRandomPokemon(activePool))}
                >
                  <Dices size={15} />
                  <span>{ui.randomStart}</span>
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* ─── Victory / Reveal Card (Streamlined for Instant Next Round) ──────── */}
      {isFinished && (
        <section className={`pokedle-result-wrapper ${won ? 'won' : 'lost'} ${playType}`}>
          <div className="pokedle-share-card">
            <div className="pokedle-result-hero">
              <img
                src={getArtworkUrl(target.id)}
                alt={target.names.en}
                className="pokedle-result-sprite"
              />
              <div className="pokedle-result-info">
                <span className="pokedle-result-status">
                  {won ? ui.winTitle : ui.giveUpTitle}
                </span>
                <h2 className="pokedle-result-name">
                  {targetName} <span className="pokedle-result-dex">#{target.id}</span>
                </h2>
                <div className="pokedle-result-badges">
                  <UnifiedTypeBadge type={target.t1} lang={lang} size="xs" showIcon={true} />
                  {target.t2 && <UnifiedTypeBadge type={target.t2} lang={lang} size="xs" showIcon={true} />}
                  <span className="pokedle-result-cp">CP {target.cp}</span>
                  <span className="pokedle-result-tries">{ui.attempts(guesses.length)}</span>
                  {victoryPercentile !== null && (
                    <span className="pokedle-percentile-pill">
                      <Trophy size={11} />
                      <span>{ui.betterThanPct(victoryPercentile)}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="pokedle-result-actions">
            {playType === 'endless' && (
              <button
                type="button"
                className="pokedle-action-btn primary next-cta"
                onClick={() => startNewEndlessRound(endlessPool, target.id)}
              >
                <RefreshCw size={15} />
                <span>{ui.playAgain}</span>
              </button>
            )}

            {playType === 'daily' && nextUnsolvedDailyMode && (
              <button
                type="button"
                className="pokedle-action-btn primary next-cta"
                onClick={() => setMode(nextUnsolvedDailyMode)}
              >
                <span>{ui.nextDailyMode}</span>
                <ArrowRight size={15} />
              </button>
            )}

            <a
              href={`/${lang}/pokedex/${target.slug}`}
              className="pokedle-action-btn pokedex-bridge"
            >
              <ExternalLink size={14} />
              <span>{ui.openPokedex}</span>
            </a>
          </div>
        </section>
      )}

      {/* ─── Classic Mode 6-Column Guess Grid (Always visible in Classic mode) ─ */}
      {mode === 'classic' && (
        <section className="pokedle-grid-card">
          <div className="pokedle-grid-scroll">
            <div className="pokedle-grid-header">
              <span>{ui.colPokemon}</span>
              <span>{ui.colType1}</span>
              <span>{ui.colType2}</span>
              <span>{ui.colGen}</span>
              <span>{ui.colEvo}</span>
              <span>{ui.colCp}</span>
              <span>{ui.colColor}</span>
            </div>

            {guesses.length === 0 ? (
              <div className="pokedle-grid-empty-placeholder">
                <span>{ui.emptyGridHint}</span>
              </div>
            ) : (
              <div className="pokedle-grid-rows">
                {[...guesses].reverse().map((g) => {
                  const ev = evaluateClassicGuess(g, target);
                  const colMeta = COLOR_META[g.col];
                  const t1Label = TYPE_TRANSLATIONS[g.t1]?.[lang] || g.t1;
                  const t2Label = g.t2 ? (TYPE_TRANSLATIONS[g.t2]?.[lang] || g.t2) : ui.typeNone;
                  const colorLabel = colMeta?.labels[lang] || g.col;
                  const pokeLocName = getPokedleLocalizedName(g, lang);
                  return (
                    <div key={g.id} className="pokedle-grid-row">
                      <div className="pokedle-cell pokemon-cell" title={pokeLocName}>
                        <img
                          src={getArtworkUrl(g.id)}
                          alt={g.names.en}
                          className="pokedle-row-sprite"
                        />
                        <span className="pokedle-row-name">{pokeLocName}</span>
                      </div>

                      <div
                        className={`pokedle-cell type-icon-cell state-${ev.type1}`}
                        title={t1Label}
                        aria-label={t1Label}
                      >
                        <img
                          src={getTypeSvgUrl(g.t1, isLightMode)}
                          alt={t1Label}
                          className="pokedle-grid-type-icon"
                          onError={(e) => {
                            const img = e.currentTarget;
                            if (!img.src.includes('duiker101')) {
                              img.src = `https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${g.t1.toLowerCase()}.svg`;
                            }
                          }}
                        />
                      </div>

                      <div
                        className={`pokedle-cell type-icon-cell state-${ev.type2}`}
                        title={t2Label}
                        aria-label={t2Label}
                      >
                        {g.t2 ? (
                          <img
                            src={getTypeSvgUrl(g.t2, isLightMode)}
                            alt={t2Label}
                            className="pokedle-grid-type-icon"
                            onError={(e) => {
                              const img = e.currentTarget;
                              if (!img.src.includes('duiker101') && g.t2) {
                                img.src = `https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${g.t2.toLowerCase()}.svg`;
                              }
                            }}
                          />
                        ) : (
                          <span className="pokedle-type-none-dash">—</span>
                        )}
                      </div>

                      <div className={`pokedle-cell numeric-cell state-${ev.gen === 'exact' ? 'exact' : 'wrong'}`}>
                        <span>
                          <span className="pokedle-gen-prefix">Gen </span>
                          {g.gen}
                        </span>
                        {ev.gen === 'higher' && <ArrowUp size={13} className="pokedle-dir-arrow" />}
                        {ev.gen === 'lower' && <ArrowDown size={13} className="pokedle-dir-arrow" />}
                      </div>

                      <div className={`pokedle-cell numeric-cell state-${ev.evo === 'exact' ? 'exact' : 'wrong'}`}>
                        <span>{g.evo}</span>
                        {ev.evo === 'higher' && <ArrowUp size={13} className="pokedle-dir-arrow" />}
                        {ev.evo === 'lower' && <ArrowDown size={13} className="pokedle-dir-arrow" />}
                      </div>

                      <div className={`pokedle-cell cp-cell state-${ev.cp === 'exact' ? 'exact' : 'wrong'}`}>
                        <span>{g.cp}</span>
                        {ev.cp === 'higher' && <ArrowUp size={13} className="pokedle-dir-arrow" />}
                        {ev.cp === 'lower' && <ArrowDown size={13} className="pokedle-dir-arrow" />}
                      </div>

                      <div
                        className={`pokedle-cell color-cell state-${ev.col}`}
                        title={colorLabel}
                        aria-label={colorLabel}
                      >
                        <span
                          className="pokedle-color-dot"
                          style={{ backgroundColor: colMeta?.hex || '#94a3b8' }}
                        />
                        <span className="pokedle-color-label">{colorLabel}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="pokedle-legend">
            <span className="pokedle-legend-item">
              <i className="swatch exact" /> {ui.legendExact}
            </span>
            <span className="pokedle-legend-item">
              <i className="swatch partial" /> {ui.legendPartial}
            </span>
            <span className="pokedle-legend-item">
              <i className="swatch wrong" /> {ui.legendWrong}
            </span>
            <span className="pokedle-legend-item">
              <ArrowUp size={12} />/<ArrowDown size={12} /> {ui.legendArrows}
            </span>
          </div>
        </section>
      )}

      {/* ─── Lore & Silhouette Guess History Chips ───────────────────────────── */}
      {mode !== 'classic' && guesses.length > 0 && (
        <section className="pokedle-guesses-strip">
          <span className="pokedle-guesses-label">
            <HelpCircle size={13} />
            <span>
              {ui.alreadyGuessed} ({guesses.length}):
            </span>
          </span>
          <div className="pokedle-guess-chips">
            {[...guesses].reverse().map((g) => (
              <div
                key={g.id}
                className={`pokedle-guess-chip ${g.id === target.id ? 'correct' : 'wrong'}`}
              >
                <img src={getArtworkUrl(g.id)} alt={g.names.en} className="pokedle-chip-sprite" />
                <span>{getPokedleLocalizedName(g, lang)}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─── Help / Rules Modal ──────────────────────────────────────────────── */}
      {showHelpModal && (
        <div
          className="pokedle-modal-overlay"
          onClick={() => setShowHelpModal(false)}
          role="dialog"
          aria-modal="true"
          aria-label={ui.helpTitle}
        >
          <div className="pokedle-modal-card help-modal" onClick={(e) => e.stopPropagation()}>
            <div className="pokedle-modal-header">
              <h2>
                <HelpCircle size={18} />
                <span>{ui.helpTitle}</span>
              </h2>
              <button
                type="button"
                className="pokedle-modal-close"
                onClick={() => setShowHelpModal(false)}
                aria-label={ui.close}
              >
                <X size={18} />
              </button>
            </div>

            <p className="pokedle-help-intro">{ui.helpIntro}</p>

            <div className="pokedle-help-modes-list">
              <div className="pokedle-help-mode-item">
                <strong>
                  <Trophy size={14} /> {ui.modeClassic}
                </strong>
                <p>{ui.helpClassicDesc}</p>
              </div>
              <div className="pokedle-help-mode-item">
                <strong>
                  <BookOpen size={14} /> {ui.modeLore}
                </strong>
                <p>{ui.helpLoreDesc}</p>
              </div>
              <div className="pokedle-help-mode-item">
                <strong>
                  <Eye size={14} /> {ui.modeSilhouette}
                </strong>
                <p>{ui.helpSilhouetteDesc}</p>
              </div>
            </div>

            <div className="pokedle-legend modal-legend">
              <span className="pokedle-legend-item">
                <i className="swatch exact" /> {ui.legendExact}
              </span>
              <span className="pokedle-legend-item">
                <i className="swatch partial" /> {ui.legendPartial}
              </span>
              <span className="pokedle-legend-item">
                <i className="swatch wrong" /> {ui.legendWrong}
              </span>
              <span className="pokedle-legend-item">
                <ArrowUp size={12} />/<ArrowDown size={12} /> {ui.legendArrows}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ─── Stats Modal ─────────────────────────────────────────────────────── */}
      {showStatsModal && (
        <div
          className="pokedle-modal-overlay"
          onClick={() => setShowStatsModal(false)}
          role="dialog"
          aria-modal="true"
          aria-label={ui.statsTitle}
        >
          <div className="pokedle-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="pokedle-modal-header">
              <h2>
                <BarChart3 size={18} />
                <span>{ui.statsTitle}</span>
              </h2>
              <button
                type="button"
                className="pokedle-modal-close"
                onClick={() => setShowStatsModal(false)}
                aria-label={ui.close}
              >
                <X size={18} />
              </button>
            </div>

            <div className="pokedle-stats-grid">
              <div className="pokedle-stat-box">
                <strong>{storage.stats.currentStreak}</strong>
                <span>{ui.statCurrentStreak}</span>
              </div>
              <div className="pokedle-stat-box">
                <strong>{storage.stats.maxStreak}</strong>
                <span>{ui.statBestStreak}</span>
              </div>
              <div className="pokedle-stat-box">
                <strong>{storage.stats.totalWins}</strong>
                <span>{ui.statTotalWins}</span>
              </div>
            </div>

            <div className="pokedle-mode-breakdown">
              <div className="pokedle-mode-row">
                <span>{ui.modeClassic}</span>
                <strong>{storage.stats.winsByMode.classic || 0}</strong>
              </div>
              <div className="pokedle-mode-row">
                <span>{ui.modeLore}</span>
                <strong>{storage.stats.winsByMode.lore || 0}</strong>
              </div>
              <div className="pokedle-mode-row">
                <span>{ui.modeSilhouette}</span>
                <strong>{storage.stats.winsByMode.silhouette || 0}</strong>
              </div>
            </div>

            {globalCommunity && (
              <div className="pokedle-community-modal-section">
                <div className="pokedle-community-modal-title">
                  <Users size={15} />
                  <span>{ui.communityStatsTitle}</span>
                </div>

                <div className="pokedle-stats-grid">
                  <div className="pokedle-stat-box community">
                    <strong>{globalCommunity.won}</strong>
                    <span>{ui.communityTotalWon}</span>
                  </div>
                  <div className="pokedle-stat-box community">
                    <strong>{globalCommunity.winRate}%</strong>
                    <span>{ui.communityWinRate}</span>
                  </div>
                  <div className="pokedle-stat-box community">
                    <strong>{globalCommunity.avgAttempts}</strong>
                    <span>{ui.communityAvgTries}</span>
                  </div>
                </div>

                <div className="pokedle-community-histogram">
                  <span className="pokedle-histogram-heading">{ui.communityDistribution}</span>
                  {(() => {
                    const maxVal = Math.max(
                      1,
                      ...ATTEMPT_BUCKETS.map((b) => globalCommunity.attemptBuckets[b] || 0)
                    );
                    return ATTEMPT_BUCKETS.map((bucket) => {
                      const count = globalCommunity.attemptBuckets[bucket] || 0;
                      const pctWidth = Math.max(count > 0 ? 8 : 0, Math.round((count / maxVal) * 100));
                      return (
                        <div key={bucket} className="pokedle-hist-row">
                          <span className="pokedle-hist-label">{bucket}</span>
                          <div className="pokedle-hist-bar-track">
                            <div
                              className="pokedle-hist-bar-fill"
                              style={{ width: `${pctWidth}%` }}
                            />
                          </div>
                          <span className="pokedle-hist-count">{count}</span>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
