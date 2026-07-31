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

interface PageProps {
  params: Promise<{ lang: string; slug?: string[] }>;
}

export default async function CatchAllLangPage({ params }: PageProps) {
  const unwrappedParams = await params;
  const rawLang = unwrappedParams.lang || 'en';
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(rawLang as Language) ? (rawLang as Language) : 'en';

  return <App initialLang={lang} />;
}
