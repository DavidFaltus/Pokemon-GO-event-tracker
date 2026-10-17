import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import App from '@/App';
import { resolveImage } from '@/utils/imageResolver';
import type { EventData } from '@/components/EventCard';
import type { Language } from '@/data/translations';
import { buildAlternates, getBreadcrumbLabel } from '@/utils/seoHelper';
import { API_BASE_URL } from '@/config';

export const revalidate = 300;

export async function generateStaticParams() {
  const languages: Language[] = ['cs', 'en', 'ja', 'ru'];
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

  const params: { lang: Language; slug: string }[] = [];
  languages.forEach((lang) => {
    eventSlugs.forEach((slug) => {
      params.push({ lang, slug });
    });
  });

  return params;
}

interface EventPageProps {
  params: Promise<{
    lang: Language;
    slug: string;
  }>;
}

async function fetchEventsAndDetail(slug: string): Promise<{ event: EventData | null; allEvents: EventData[] }> {
  let allEvents: EventData[] = [];
  let detail: EventData | null = null;

  try {
    const resAll = await fetch(`${API_BASE_URL}/api/events`, {
      next: { revalidate: 300 },
    });
    if (resAll.ok) {
      const data = await resAll.json();
      allEvents = Array.isArray(data) ? data : data.events || [];
      detail = allEvents.find((e) => e.eventID === slug) || null;
    }
  } catch (err) {}

  try {
    const res = await fetch(`${API_BASE_URL}/api/events/${slug}`, {
      next: { revalidate: 300 },
    });
    if (res.ok) {
      const data = await res.json();
      const fetchedDetail = data.event || data;
      if (fetchedDetail && fetchedDetail.eventID) {
        detail = { ...(detail || {}), ...fetchedDetail };
      }
    }
  } catch (err) {}

  return { event: detail, allEvents };
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const validLang: Language = validLanguages.includes(lang as Language) ? (lang as Language) : 'cs';
  const { event } = await fetchEventsAndDetail(slug);

  if (!event) {
    return {
      title: 'Event Not Found | Pokémon GO Event Tracker',
      description: 'Event not found.',
      robots: { index: false, follow: false },
    };
  }

  const title = event.name;
  const canonicalUrl = `https://pogoevents.app/${validLang}/events/${slug}`;
  const bannerImage = resolveImage(event.image, event.eventType, event.name);

  const descByLang: Record<Language, string> = {
    cs: `Detail události ${title} v Pokémon GO (${event.start?.slice(0, 10) || ''} – ${event.end?.slice(0, 10) || ''}). Časy trvání, aktivní bonusy, raid bossové a výskyty v divočině.`,
    en: `Complete guide for ${title} in Pokémon GO (${event.start?.slice(0, 10) || ''} – ${event.end?.slice(0, 10) || ''}). Event schedule, active bonuses, raid bosses, and wild spawns.`,
    ja: `Pokémon GO イベント「${title}」（${event.start?.slice(0, 10) || ''}〜${event.end?.slice(0, 10) || ''}）の開催期間、ボーナス、野生出現ポケモン、レイドボス情報まとめ。`,
    ru: `Подробности события ${title} в Pokémon GO (${event.start?.slice(0, 10) || ''} – ${event.end?.slice(0, 10) || ''}). Расписание, бонусы, рейд-боссы и спавны в дикой природе.`,
  };

  return {
    title: `${title} | Pokémon GO Event Tracker`,
    description: descByLang[validLang] || descByLang.en,
    alternates: buildAlternates(validLang, `/events/${slug}`, `https://pogoevents.app/api/agent/events/${slug}.md`),
    openGraph: {
      title: `${title} | Pokémon GO Event Tracker`,
      description: descByLang[validLang] || descByLang.en,
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
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const validLang: Language = validLanguages.includes(lang as Language) ? (lang as Language) : 'en';

  const { event, allEvents } = await fetchEventsAndDetail(slug);

  if (!event) {
    notFound();
  }

  const title = event.name;
  const canonicalUrl = `https://pogoevents.app/${validLang}/events/${slug}`;
  const bannerImage = resolveImage(event.image, event.eventType, event.name);
  const bonuses: { text: string }[] = (event as any).bonuses || (event as any).extraData?.bonuses || [];
  const spawns: { name: string; canBeShiny?: boolean }[] = (event as any).spawns || (event as any).extraData?.spawns || [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Event',
        name: title,
        startDate: event.start,
        endDate: event.end,
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
        location: {
          '@type': 'VirtualLocation',
          url: canonicalUrl,
        },
        image: [bannerImage],
        description: `Pokémon GO event: ${title} (${event.start} to ${event.end})`,
        organizer: {
          '@type': 'Organization',
          name: 'Niantic',
          url: 'https://pokemongolive.com',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: getBreadcrumbLabel('home', validLang), item: `https://pogoevents.app/${validLang}` },
          { '@type': 'ListItem', position: 2, name: title, item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article
        className="seo-entity-summary card"
        style={{
          marginBottom: '18px',
          padding: '18px 20px',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-card)',
        }}
      >
        <h1 className="tab-seo-title" style={{ margin: '0 0 8px 0' }}>{title}</h1>
        <p className="tab-seo-description" style={{ margin: '0 0 12px 0' }}>
          <strong>{validLang === 'cs' ? 'Začátek:' : validLang === 'ja' ? '開始:' : validLang === 'ru' ? 'Начало:' : 'Start:'}</strong> {event.start}{' '}
          | <strong>{validLang === 'cs' ? 'Konec:' : validLang === 'ja' ? '終了:' : validLang === 'ru' ? 'Конец:' : 'End:'}</strong> {event.end}{' '}
          | <strong>{validLang === 'cs' ? 'Typ:' : validLang === 'ja' ? '種別:' : validLang === 'ru' ? 'Тип:' : 'Type:'}</strong> {event.eventType}
        </p>
        {bonuses.length > 0 && (
          <div style={{ marginBottom: '10px' }}>
            <h2 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 6px 0' }}>
              {validLang === 'cs' ? 'Aktivní bonusy' : validLang === 'ja' ? 'イベントボーナス' : validLang === 'ru' ? 'Активные бонусы' : 'Active Event Bonuses'}
            </h2>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
              {bonuses.map((b, i) => (
                <li key={i}>{b.text}</li>
              ))}
            </ul>
          </div>
        )}
        {spawns.length > 0 && (
          <div>
            <h2 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 6px 0' }}>
              {validLang === 'cs' ? 'Výskyty Pokémonů (Spawns)' : validLang === 'ja' ? '野生出現ポケモン' : validLang === 'ru' ? 'Спавны покемонов' : 'Featured Wild Spawns'}
            </h2>
            <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
              {spawns.map((s) => `${s.name}${s.canBeShiny ? ' ✨' : ''}`).join(', ')}
            </p>
          </div>
        )}
      </article>
      <App initialLang={validLang} initialEventId={slug} initialEvents={allEvents.length > 0 ? allEvents : [event]} />
    </>
  );
}
