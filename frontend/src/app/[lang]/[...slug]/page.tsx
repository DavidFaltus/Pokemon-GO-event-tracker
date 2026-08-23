import App from '@/App';
import type { Language } from '@/data/translations';
import { notFound } from 'next/navigation';

import type { Metadata } from 'next';

export const revalidate = 300;

export async function generateStaticParams() {
  const languages: ('cs' | 'en' | 'ja' | 'ru')[] = ['cs', 'en', 'ja', 'ru'];
  const routes = ['events', 'guides', 'raids', 'rocket', 'ditto', 'eggs', 'rankings', 'filter', 'settings', 'download', 'app'];

  const params: { lang: string; slug: string[] }[] = [];
  languages.forEach((lang) => {
    routes.forEach((route) => {
      params.push({ lang, slug: [route] });
    });
  });

  return params;
}

type TabType = 'events' | 'guides' | 'raid' | 'rocket' | 'ditto' | 'eggs' | 'ranking' | 'filter' | 'settings' | 'admin' | 'download' | '404';

const getTabFromSlug = (slug?: string[]): TabType => {
  if (!slug || slug.length === 0) return 'events';
  const first = slug[0].toLowerCase();
  if (first === 'events') return 'events';
  if (first === 'guides' || first === 'guide') return 'guides';
  if (first === 'raids' || first === 'raid') return 'raid';
  if (first === 'rocket') return 'rocket';
  if (first === 'rankings' || first === 'ranking' || first === 'pokemon') return 'ranking';
  if (first === 'ditto') return 'ditto';
  if (first === 'eggs' || first === 'egg') return 'eggs';
  if (first === 'filter') return 'filter';
  if (first === 'settings') return 'settings';
  if (first === 'download' || first === 'app' || first === 'apk') return 'download';
  if (first === 'admin') return 'admin';
  return '404';
};

interface PageProps {
  params: Promise<{ lang: string; slug?: string[] }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const unwrappedParams = await params;
  const rawLang = unwrappedParams.lang || 'cs';
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(rawLang as Language) ? (rawLang as Language) : 'cs';
  const first = unwrappedParams.slug?.[0]?.toLowerCase() || '';

  const canonicalUrl = first === 'events' || first === ''
    ? `https://pogoevents.app/${lang}`
    : `https://pogoevents.app/${lang}/${first}`;

  return {
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'cs': first === 'events' ? `https://pogoevents.app/cs` : `https://pogoevents.app/cs/${first}`,
        'en': first === 'events' ? `https://pogoevents.app/en` : `https://pogoevents.app/en/${first}`,
        'ja': first === 'events' ? `https://pogoevents.app/ja` : `https://pogoevents.app/ja/${first}`,
        'ru': first === 'events' ? `https://pogoevents.app/ru` : `https://pogoevents.app/ru/${first}`,
      },
    },
  };
}

export default async function CatchAllLangPage({ params }: PageProps) {
  const unwrappedParams = await params;
  const rawLang = unwrappedParams.lang || 'cs';
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  if (!validLanguages.includes(rawLang as Language)) {
    notFound();
  }
  const lang: Language = rawLang as Language;
  const tab = getTabFromSlug(unwrappedParams.slug);

  if (tab === '404') {
    notFound();
  }

  const pokemonSearch = unwrappedParams.slug && unwrappedParams.slug[0]?.toLowerCase() === 'pokemon' && unwrappedParams.slug[1]
    ? unwrappedParams.slug[1]
    : undefined;

  return <App initialLang={lang} initialTab={tab} initialPokemonSearch={pokemonSearch} />;
}
