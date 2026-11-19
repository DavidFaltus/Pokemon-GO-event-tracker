import type { Metadata } from 'next';
import { PokedleView } from '@/components/PokedleView';
import type { Language } from '@/data/translations';
import { buildAlternates } from '@/utils/seoHelper';

export const revalidate = 3600;

export function generateStaticParams() {
  return [
    { lang: 'cs' },
    { lang: 'en' },
    { lang: 'ja' },
    { lang: 'ru' },
  ];
}

interface PokedlePageProps {
  params: Promise<{ lang: Language }>;
}

const META_BY_LANG: Record<
  Language,
  { title: string; description: string; keywords: string[] }
> = {
  cs: {
    title: 'PoGoDle – Denní Pokémon GO hádací hra (Klasický, Hláška, Silueta)',
    description:
      'Uhádni dnešního Pokémona ve 3 denních režimech PoGoDle: Klasický (Max CP, typy, generace, evoluce), Pokédex Hláška v češtině a Silueta. Obsahuje i nekonečný režim a sdílení výsledků.',
    keywords: [
      'pokedle',
      'pogodle',
      'pokedle česky',
      'pokemon hadaci hra',
      'pokemon go kviz',
      'denni pokemon hadanka',
      'kdo je ten pokemon',
    ],
  },
  en: {
    title: 'PoGoDle – Daily Pokémon GO Guessing Game (Classic, Pokédex Entry, Silhouette)',
    description:
      'Guess today’s mystery Pokémon in 3 daily PoGoDle modes: Classic (Max CP Lv50, types, generation, evolution stage, color), Official Pokédex Entry, and Silhouette, plus Endless mode.',
    keywords: [
      'pokedle',
      'pogodle',
      'pokemon go wordle',
      'daily pokemon guessing game',
      'whos that pokemon',
      'pokemon trivia',
    ],
  },
  ja: {
    title: 'PoGoDle – 毎日遊べるポケモンGO当てクイズ（クラシック・図鑑説明・シルエット）',
    description:
      'Pokémon GOの全ポケモンから毎日出題される3モード（クラシック・公式図鑑説明・シルエット）とエンドレス練習モードを無料でプレイ。最大CPやタイプを手がかりに正解を導き出そう。',
    keywords: [
      'pokedle',
      'pogodle',
      'ポケモン当てクイズ',
      'ポケモンGO クイズ',
      'シルエットクイズ',
      'ポケモン図鑑 クイズ',
    ],
  },
  ru: {
    title: 'PoGoDle – Ежедневная игра-угадайка Pokémon GO (Классика, Описание, Силуэт)',
    description:
      'Угадай покемона дня в 3 ежедневных режимах PoGoDle: Классика (Макс CP, типы, поколение, эволюция, цвет), Описание Покедекса на русском и Силуэт, плюс бесконечный режим.',
    keywords: [
      'pokedle',
      'pogodle',
      'угадай покемона',
      'покемон го викторина',
      'кто этот покемон',
    ],
  },
};

export async function generateMetadata({ params }: PokedlePageProps): Promise<Metadata> {
  const { lang } = await params;
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const validLang: Language = validLanguages.includes(lang) ? lang : 'cs';
  const meta = META_BY_LANG[validLang] || META_BY_LANG.en;
  const canonicalUrl = `https://pogoevents.app/${validLang}/pokedle`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: buildAlternates(validLang, '/pokedle'),
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonicalUrl,
      type: 'website',
      images: [
        {
          url: 'https://pogoevents.app/logo-banner.jpg',
          width: 1200,
          height: 630,
          alt: 'PoGoDle – Pokémon GO Daily Guessing Game',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: ['https://pogoevents.app/logo-banner.jpg'],
    },
  };
}

export default async function PokedlePage({ params }: PokedlePageProps) {
  const { lang } = await params;
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const validLang: Language = validLanguages.includes(lang) ? lang : 'cs';

  return <PokedleView lang={validLang} />;
}
