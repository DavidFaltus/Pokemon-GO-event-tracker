import type { Metadata } from 'next';
import App from '@/App';
import type { Language } from '@/data/translations';
import { GUIDES_DATA } from '@/data/guidesData';

export const revalidate = 300;

export function generateStaticParams() {
  const languages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const params: { lang: Language; guideId: string }[] = [];

  languages.forEach((lang) => {
    GUIDES_DATA.forEach((guide) => {
      params.push({ lang, guideId: guide.slug });
    });
  });

  return params;
}

interface PageProps {
  params: Promise<{ lang: Language; guideId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const unwrappedParams = await params;
  const lang = unwrappedParams.lang || 'cs';
  const guideId = unwrappedParams.guideId;

  const guide = GUIDES_DATA.find((g) => g.slug === guideId);
  if (!guide) {
    return {
      title: 'Guide | PoGo Events',
      description: 'Pokémon GO Strategy Guide',
    };
  }

  const title = guide.title[lang] || guide.title.en;
  const subtitle = guide.subtitle[lang] || guide.subtitle.en;

  return {
    title: `${title} | PoGo Events Guide`,
    description: subtitle,
  };
}

export default async function IndividualGuidePage({ params }: PageProps) {
  const unwrappedParams = await params;
  const lang = unwrappedParams.lang || 'cs';
  const guideId = unwrappedParams.guideId;

  return <App initialLang={lang} initialTab="guides" initialArticleSlug={guideId} />;
}
