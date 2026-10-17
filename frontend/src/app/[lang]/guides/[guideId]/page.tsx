import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import App from '@/App';
import type { Language } from '@/data/translations';
import { GUIDES_DATA } from '@/data/guidesData';
import { buildAlternates, getBreadcrumbLabel } from '@/utils/seoHelper';

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

function getGuideMarkdownEndpoint(slug: string): string | undefined {
  if (slug === 'egg-hatching-guide') return 'https://pogoevents.app/api/agent/eggs.md';
  if (slug === 'field-research-tasks-guide') return 'https://pogoevents.app/api/agent/research.md';
  if (slug === 'rocket-leaders-giovanni-guide') return 'https://pogoevents.app/api/agent/rocket.md';
  if (slug === 'raid-battles-counter-guide') return 'https://pogoevents.app/api/agent/raids.md';
  return undefined;
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

  const ogImageUrl = guide.imageUrl
    ? (guide.imageUrl.startsWith('http') ? guide.imageUrl : `https://pogoevents.app${guide.imageUrl}`)
    : 'https://pogoevents.app/logo-banner.jpg';

  return {
    title: `${title} | Pokémon GO Guide`,
    description: subtitle,
    alternates: buildAlternates(lang, `/guides/${guide.slug}`, getGuideMarkdownEndpoint(guide.slug)),
    openGraph: {
      title: `${title} | Pokémon GO Guide`,
      description: subtitle,
      url: canonicalUrl,
      type: 'article',
      images: [
        {
          url: ogImageUrl,
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

  const faqItems = guide.sections.map(sec => ({
    '@type': 'Question',
    name: sec.heading[lang] || sec.heading.en,
    acceptedAnswer: {
      '@type': 'Answer',
      text: (sec.content[lang] || sec.content.en).replace(/\n/g, ' ') + 
        (sec.tips && sec.tips[lang] ? ' Tip: ' + sec.tips[lang].join(' ') : '')
    }
  }));

  const ogImageUrl = guide.imageUrl
    ? (guide.imageUrl.startsWith('http') ? guide.imageUrl : `https://pogoevents.app${guide.imageUrl}`)
    : 'https://pogoevents.app/logo-banner.jpg';

  const isoDate = guide.updatedAt ? `${guide.updatedAt}T12:00:00Z` : '2026-04-01T12:00:00Z';

  const jsonLdGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: title,
        description: guide.subtitle[lang] || guide.subtitle.en,
        image: ogImageUrl,
        url: canonicalUrl,
        datePublished: isoDate,
        dateModified: isoDate,
        inLanguage: lang,
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
            url: 'https://pogoevents.app/logo-icon-1080.png'
          }
        },
        mainEntityOfPage: canonicalUrl,
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqItems
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: getBreadcrumbLabel('home', lang),
            item: `https://pogoevents.app/${lang}`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: getBreadcrumbLabel('guides', lang),
            item: `https://pogoevents.app/${lang}/guides`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: title,
            item: canonicalUrl
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />
      <App initialLang={lang} initialTab="guides" initialArticleSlug={guideId} />
    </>
  );
}
