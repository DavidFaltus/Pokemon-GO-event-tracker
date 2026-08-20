import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import App from '@/App';
import type { Language } from '@/data/translations';
import { GUIDES_DATA } from '@/data/guidesData';

export const revalidate = 3600;

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
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(unwrappedParams.lang as Language) ? (unwrappedParams.lang as Language) : 'cs';
  const guideId = unwrappedParams.guideId;

  const guide = GUIDES_DATA.find((g) => g.slug === guideId);
  if (!guide) {
    return {
      title: 'Guide Not Found | Pokémon GO Event Tracker',
      description: 'Guide not found.',
      robots: { index: false, follow: false },
    };
  }

  const title = guide.title[lang] || guide.title.en;
  const subtitle = guide.subtitle[lang] || guide.subtitle.en;
  const canonicalUrl = `https://pogoevents.app/${lang}/guides/${guide.slug}`;

  return {
    title: `${title} | Pokémon GO Guide`,
    description: subtitle,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'cs': `https://pogoevents.app/cs/guides/${guide.slug}`,
        'en': `https://pogoevents.app/en/guides/${guide.slug}`,
        'ja': `https://pogoevents.app/ja/guides/${guide.slug}`,
        'ru': `https://pogoevents.app/ru/guides/${guide.slug}`,
      },
    },
    openGraph: {
      title: `${title} | Pokémon GO Guide`,
      description: subtitle,
      url: canonicalUrl,
      type: 'article',
      images: [
        {
          url: guide.imageUrl || 'https://pogoevents.app/logo-banner.jpg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

export default async function IndividualGuidePage({ params }: PageProps) {
  const unwrappedParams = await params;
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(unwrappedParams.lang as Language) ? (unwrappedParams.lang as Language) : 'cs';
  const guideId = unwrappedParams.guideId;

  const guide = GUIDES_DATA.find((g) => g.slug === guideId);
  if (!guide) {
    notFound();
  }

  const title = guide.title[lang] || guide.title.en;
  const canonicalUrl = `https://pogoevents.app/${lang}/guides/${guide.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: guide.subtitle[lang] || guide.subtitle.en,
    image: guide.imageUrl || 'https://pogoevents.app/logo-banner.jpg',
    url: canonicalUrl,
    author: {
      '@type': 'Organization',
      name: 'Pokémon GO Event Tracker',
      url: 'https://pogoevents.app'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Pokémon GO Event Tracker',
      logo: {
        '@type': 'ImageObject',
        url: 'https://pogoevents.app/logo-1080.png'
      }
    },
    mainEntityOfPage: canonicalUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <App initialLang={lang} initialTab="guides" initialArticleSlug={guideId} />
    </>
  );
}
