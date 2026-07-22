import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { resolveImage } from '@/utils/imageResolver';
import { EventCard, EventData } from '@/components/EventCard';
import { API_BASE_URL } from '@/config';

export const revalidate = 300;

export async function generateStaticParams() {
  const languages: ('cs' | 'en' | 'ja' | 'ru')[] = ['cs', 'en', 'ja', 'ru'];
  let eventSlugs: string[] = ['default-event'];

  try {
    const res = await fetch(`${API_BASE_URL}/api/events`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      const events: EventData[] = data.events || data || [];
      const fetchedSlugs = events.map((e) => e.eventID).filter(Boolean);
      if (fetchedSlugs.length > 0) eventSlugs = fetchedSlugs;
    }
  } catch (e) {
    console.warn('generateStaticParams event fetch skipped:', e);
  }

  const params: { lang: 'cs' | 'en' | 'ja' | 'ru'; slug: string }[] = [];
  languages.forEach((lang) => {
    eventSlugs.forEach((slug) => {
      params.push({ lang, slug });
    });
  });

  return params;
}

interface EventPageProps {
  params: Promise<{
    lang: 'cs' | 'en' | 'ja' | 'ru';
    slug: string;
  }>;
}

async function fetchEventDetails(slug: string): Promise<EventData | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/events/${slug}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.event || data;
  } catch (err) {
    console.error('Failed to fetch event details for ISR page:', err);
    return null;
  }
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const event = await fetchEventDetails(slug);

  if (!event) {
    return {
      title: 'Událost nenalezena | Pokémon GO Event Tracker',
    };
  }

  const title = event.name;
  const canonicalUrl = `https://pogoevents.app/${lang}/events/${slug}`;
  const bannerImage = resolveImage(event.image, event.eventType, event.name);

  return {
    title: `${title} | Pokémon GO Event Tracker`,
    description: `Detail události ${title} v Pokémon GO. Časy trvání, raid bossové, bonusy a výskyty v divočině.`,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'cs': `https://pogoevents.app/cs/events/${slug}`,
        'en': `https://pogoevents.app/en/events/${slug}`,
        'ja': `https://pogoevents.app/ja/events/${slug}`,
        'ru': `https://pogoevents.app/ru/events/${slug}`,
      },
    },
    openGraph: {
      title,
      description: `Detail události ${title} v Pokémon GO.`,
      url: canonicalUrl,
      images: [
        {
          url: bannerImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { lang, slug } = await params;
  const event = await fetchEventDetails(slug);

  if (!event) {
    notFound();
  }

  const title = event.name;
  const bannerImage = resolveImage(event.image, event.eventType, event.name);

  // Schema.org Event JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: title,
    startDate: event.start,
    endDate: event.end,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    location: {
      '@type': 'VirtualLocation',
      url: `https://pogoevents.app/${lang}/events/${slug}`,
    },
    image: [bannerImage],
    description: `Pokémon GO event: ${title}`,
    organizer: {
      '@type': 'Organization',
      name: 'Niantic',
      url: 'https://pokemongolive.com',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="event-detail-page-container" style={{ padding: '16px', maxWidth: '800px', margin: '0 auto' }}>
        <EventCard event={event} lang={lang as any} />
      </div>
    </>
  );
}
