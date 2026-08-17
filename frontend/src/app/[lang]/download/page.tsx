import App from '@/App';
import type { Language } from '@/data/translations';

export const revalidate = 300;

export async function generateStaticParams() {
  const languages: ('cs' | 'en' | 'ja' | 'ru')[] = ['cs', 'en', 'ja', 'ru'];
  return languages.map(lang => ({ lang }));
}

interface DownloadPageProps {
  params: Promise<{ lang: string }>;
}

export default async function DownloadPage({ params }: DownloadPageProps) {
  const unwrappedParams = await params;
  const rawLang = unwrappedParams.lang || 'cs';
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(rawLang as Language) ? (rawLang as Language) : 'cs';

  return <App initialLang={lang} initialTab="download" />;
}
