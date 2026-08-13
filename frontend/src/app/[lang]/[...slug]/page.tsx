import App from '@/App';
import type { Language } from '@/data/translations';

export const revalidate = 300;

export async function generateStaticParams() {
  const languages: ('cs' | 'en' | 'ja' | 'ru')[] = ['cs', 'en', 'ja', 'ru'];
  const routes = ['events', 'raids', 'rocket', 'ditto', 'eggs', 'rankings', 'filter', 'settings'];

  const params: { lang: string; slug: string[] }[] = [];
  languages.forEach((lang) => {
    routes.forEach((route) => {
      params.push({ lang, slug: [route] });
    });
  });

  return params;
}

type TabType = 'events' | 'raid' | 'rocket' | 'ditto' | 'eggs' | 'ranking' | 'filter' | 'settings' | 'admin';

const getTabFromSlug = (slug?: string[]): TabType | undefined => {
  if (!slug || slug.length === 0) return undefined;
  const first = slug[0].toLowerCase();
  if (first === 'raids' || first === 'raid') return 'raid';
  if (first === 'rocket') return 'rocket';
  if (first === 'rankings' || first === 'ranking' || first === 'pokemon') return 'ranking';
  if (first === 'ditto') return 'ditto';
  if (first === 'eggs') return 'eggs';
  if (first === 'filter') return 'filter';
  if (first === 'settings') return 'settings';
  if (first === 'events') return 'events';
  return undefined;
};

interface PageProps {
  params: Promise<{ lang: string; slug?: string[] }>;
}

export default async function CatchAllLangPage({ params }: PageProps) {
  const unwrappedParams = await params;
  const rawLang = unwrappedParams.lang || 'en';
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(rawLang as Language) ? (rawLang as Language) : 'en';
  const tab = getTabFromSlug(unwrappedParams.slug);
  const pokemonSearch = unwrappedParams.slug && unwrappedParams.slug[0]?.toLowerCase() === 'pokemon' && unwrappedParams.slug[1]
    ? unwrappedParams.slug[1]
    : undefined;

  return <App initialLang={lang} initialTab={tab} initialPokemonSearch={pokemonSearch} />;
}
