import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { EventCard, type EventData } from '@/components/EventCard';
import { resolveImage } from '@/utils/imageResolver';
import type { Language } from '@/data/translations';
import { getSpecialEventDetails } from '@/data/specialEvents';
import { buildAlternates, getBreadcrumbLabel } from '@/utils/seoHelper';
import { buildEventIntelligence, localizeTypeName } from '@/utils/eventIntelligenceHelper';
import { apiFetch } from '@/config';

function extractLocalizedText(value: any, lang: Language): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object') {
    if (lang === 'ja' && value.ja) return value.ja;
    if (lang === 'cs' && value.cs) return value.cs;
    if (lang === 'ru' && value.ru) return value.ru;
    return value.en || value.cs || value.ja || '';
  }
  return String(value);
}

export const revalidate = 300;

function readJsonFileSafe(relFromBackend: string): any {
  try {
    const candidates = [
      path.join(process.cwd(), '..', 'backend', relFromBackend),
      path.join(process.cwd(), 'backend', relFromBackend),
    ];
    for (const filePath of candidates) {
      if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
      }
    }
  } catch {
    // ignore fs read errors
  }
  return null;
}

function getLocalCachedEvents(): EventData[] {
  const listCache = readJsonFileSafe('events_list_cache.json');
  const customCache = readJsonFileSafe('custom_events.json');
  const combined: EventData[] = [];
  const seen = new Set<string>();

  const addList = (arr: any) => {
    if (!Array.isArray(arr)) return;
    for (const item of arr) {
      const id = item?.eventID || item?.id;
      if (id && !seen.has(id)) {
        seen.add(id);
        combined.push({ ...item, eventID: id });
      }
    }
  };

  addList(customCache);
  addList(listCache);
  return combined;
}

function getLocalCachedEventDetails(slug: string): any {
  const perFile = readJsonFileSafe(path.join('.cache', `details_${slug}.json`));
  if (perFile) {
    return perFile.details || perFile;
  }
  const allDetails = readJsonFileSafe('event_details_cache.json');
  if (allDetails && allDetails[slug]) {
    return allDetails[slug].details || allDetails[slug];
  }
  return null;
}

export async function generateStaticParams() {
  const languages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const slugSet = new Set<string>();

  const localEvents = getLocalCachedEvents();
  localEvents.forEach((e) => {
    if (e.eventID) slugSet.add(e.eventID);
  });

  try {
    const res = await apiFetch('/api/events', { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      const events: EventData[] = data.events || data || [];
      events.forEach((e) => {
        if (e.eventID) slugSet.add(e.eventID);
      });
    }
  } catch (e) {
    console.warn('generateStaticParams event fetch skipped:', e);
  }

  if (slugSet.size === 0) {
    slugSet.add('default-event');
  }

  const params: { lang: Language; slug: string }[] = [];
  languages.forEach((lang) => {
    slugSet.forEach((slug) => {
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

async function fetchEventsAndDetail(
  slug: string
): Promise<{ event: EventData | null; rawDetails: any; allEvents: EventData[] }> {
  const localEvents = getLocalCachedEvents();
  let allEvents: EventData[] = [...localEvents];
  let detail: EventData | null = localEvents.find((e) => e.eventID === slug) || null;
  let rawDetails: any = getLocalCachedEventDetails(slug);

  try {
    const resAll = await apiFetch('/api/events', { next: { revalidate: 300 } });
    if (resAll.ok) {
      const data = await resAll.json();
      const fetchedList: EventData[] = Array.isArray(data) ? data : data.events || [];
      if (fetchedList.length > 0) {
        const mergedMap = new Map<string, EventData>();
        localEvents.forEach((e) => mergedMap.set(e.eventID, e));
        fetchedList.forEach((e) => {
          if (e.eventID) mergedMap.set(e.eventID, { ...(mergedMap.get(e.eventID) || {}), ...e });
        });
        allEvents = Array.from(mergedMap.values());
        detail = mergedMap.get(slug) || detail;
      }
    }
  } catch {}

  try {
    const res = await apiFetch(`/api/events/${slug}`, { next: { revalidate: 300 } });
    if (res.ok) {
      const data = await res.json();
      const fetchedDetail = data.event || data;
      if (fetchedDetail && fetchedDetail.eventID) {
        detail = { ...(detail || {}), ...fetchedDetail };
      }
    }
  } catch {}

  if (!rawDetails) {
    try {
      const resDetails = await apiFetch(`/api/events/${slug}/details`, { next: { revalidate: 3600 } });
      if (resDetails.ok) {
        const dJson = await resDetails.json();
        rawDetails = dJson.details || dJson;
      }
    } catch {}
  }

  return { event: detail, rawDetails, allEvents };
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
    cs: `Kompletní strategický průvodce událostí ${title} v Pokémon GO (${event.start?.slice(0, 10) || ''} – ${event.end?.slice(0, 10) || ''}). Aktivní bonusy, divoké spawny, raid counters, 100% IV CP tabulka a doporučené Mega evoluce.`,
    en: `Complete strategy guide for ${title} in Pokémon GO (${event.start?.slice(0, 10) || ''} – ${event.end?.slice(0, 10) || ''}). Event schedule, active bonuses, raid boss counters, 100% IV CP chart, and wild spawns.`,
    ja: `Pokémon GO イベント「${title}」（${event.start?.slice(0, 10) || ''}〜${event.end?.slice(0, 10) || ''}）の完全攻略ガイド。ボーナス、野生出現ポケモン、レイド対策、100% IV CP早見表。`,
    ru: `Полный гайд по событию ${title} в Pokémon GO (${event.start?.slice(0, 10) || ''} – ${event.end?.slice(0, 10) || ''}). Расписание, бонусы, контр-покемоны для рейдов, 100% IV CP и спавны.`,
  };

  return {
    title: `${title} – Průvodce, Bonusy & Counters | Pokémon GO`,
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

  const { event, rawDetails, allEvents } = await fetchEventsAndDetail(slug);

  if (!event) {
    notFound();
  }

  const title = event.name;
  const canonicalUrl = `https://pogoevents.app/${validLang}/events/${slug}`;
  const bannerImage = resolveImage(event.image, event.eventType, event.name);
  const staticSpecial = getSpecialEventDetails(event.eventID, event.name);
  const mergedDetails = staticSpecial || rawDetails || {};

  const rawBonuses: any[] =
    (event as any).bonuses ||
    (event as any).extraData?.bonuses ||
    (event as any).extraData?.communityday?.bonuses ||
    mergedDetails?.bonuses ||
    [];
  const bonuses: string[] = rawBonuses
    .map((b) => (typeof b === 'string' ? b : extractLocalizedText(b?.text || b, validLang)))
    .filter(Boolean);

  const rawSpawns: any[] =
    (event as any).spawns ||
    (event as any).extraData?.spawns ||
    (event as any).extraData?.communityday?.spawns ||
    mergedDetails?.spawns ||
    [];
  const spawns: { name: string; canBeShiny?: boolean }[] = rawSpawns
    .map((s) =>
      typeof s === 'string'
        ? { name: s }
        : {
            name: extractLocalizedText(s?.name || s, validLang),
            canBeShiny: Boolean(s?.canBeShiny || s?.isShinyAvailable),
          }
    )
    .filter((s) => Boolean(s.name));

  const rawResearch: any[] = mergedDetails?.research || [];
  const researchTasks: { task: string; reward: string }[] = rawResearch
    .map((r) => ({
      task: extractLocalizedText(r?.task, validLang),
      reward: extractLocalizedText(r?.reward, validLang),
    }))
    .filter((r) => Boolean(r.task));

  const intel = buildEventIntelligence(event, mergedDetails, validLang);
  const isExpired = event.end ? new Date(event.end).getTime() < Date.now() : false;

  const relatedEvents = allEvents
    .filter((e) => e.eventID && e.eventID !== slug)
    .slice(0, 6);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Event',
        name: title,
        startDate: event.start,
        endDate: event.end,
        eventStatus: isExpired ? 'https://schema.org/EventCompleted' : 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
        location: {
          '@type': 'VirtualLocation',
          url: canonicalUrl,
        },
        image: [bannerImage],
        description: intel.editorialSections[0]?.paragraphs[0] || title,
        organizer: {
          '@type': 'Organization',
          name: 'Niantic',
          url: 'https://pokemongolive.com',
        },
      },
      {
        '@type': 'Article',
        headline: `${title} – Pokémon GO Strategy Guide & Counters`,
        description: intel.editorialSections[0]?.paragraphs[0] || title,
        url: canonicalUrl,
        author: { '@type': 'Organization', name: 'PoGo Events Editorial Team', url: 'https://pogoevents.app' },
        publisher: {
          '@type': 'Organization',
          name: 'PoGo Events Tracker',
          logo: { '@type': 'ImageObject', url: 'https://pogoevents.app/logo-icon-1080.png' },
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: intel.faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
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
    <div className="standalone-event-hub" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Top Breadcrumb & Back Navigation */}
      <nav
        aria-label="Breadcrumb"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        <Link
          href={`/${validLang}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '12px',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '0.86rem',
          }}
        >
          ← {validLang === 'cs' ? 'Zpět na živý kalendář událostí' : validLang === 'ja' ? 'イベントカレンダーへ戻る' : validLang === 'ru' ? 'Назад к календарю событий' : 'Back to Live Event Calendar'}
        </Link>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Link
            href={`/${validLang}/raids`}
            style={{
              padding: '8px 14px',
              borderRadius: '12px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              color: 'var(--cyan-accent)',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '0.82rem',
            }}
          >
            ⚔️ {validLang === 'cs' ? 'Aktuální Raid Bossi' : validLang === 'ja' ? '現在のレイドボス' : validLang === 'ru' ? 'Текущие Рейды' : 'Active Raid Bosses'}
          </Link>
          <Link
            href={`/${validLang}/guides`}
            style={{
              padding: '8px 14px',
              borderRadius: '12px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              color: 'var(--accent-color)',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '0.82rem',
            }}
          >
            📚 {validLang === 'cs' ? 'Strategické návody' : validLang === 'ja' ? '攻略ガイド一覧' : validLang === 'ru' ? 'Стратегические гайды' : 'Strategy Guides'}
          </Link>
        </div>
      </nav>

      {/* Hero Editorial Article Card */}
      <article
        className="seo-entity-summary card"
        style={{
          padding: '22px 24px',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-card)',
        }}
      >
        {isExpired && (
          <div
            style={{
              padding: '10px 14px',
              marginBottom: '16px',
              borderRadius: '12px',
              backgroundColor: 'rgba(245, 158, 11, 0.12)',
              border: '1px solid rgba(245, 158, 11, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '8px',
              fontSize: '0.86rem',
              color: '#fbbf24',
            }}
          >
            <span>
              ⏱️{' '}
              {validLang === 'cs'
                ? `Tato událost již skončila (${event.end?.slice(0, 10)}). Níže najdete archivovaný přehled bonusů, spawnů a statistik.`
                : validLang === 'ja'
                  ? `このイベントは終了しました（${event.end?.slice(0, 10)}）。以下はアーカイブされた攻略情報です。`
                  : validLang === 'ru'
                    ? `Это событие уже завершилось (${event.end?.slice(0, 10)}). Ниже представлен архивный разбор.`
                    : `This event has ended (${event.end?.slice(0, 10)}). Below is the archived strategy guide and boss breakdown.`}
            </span>
            <Link
              href={`/${validLang}`}
              style={{
                color: '#ffffff',
                backgroundColor: 'rgba(245, 158, 11, 0.25)',
                padding: '4px 10px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '0.82rem',
              }}
            >
              {validLang === 'cs' ? 'Zobrazit probíhající události →' : validLang === 'ja' ? '開催中のイベントを見る →' : validLang === 'ru' ? 'Текущие события →' : 'View active events →'}
            </Link>
          </div>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginBottom: '10px' }}>
          <span
            style={{
              padding: '4px 10px',
              borderRadius: '20px',
              background: 'var(--accent-gradient)',
              color: '#ffffff',
              fontSize: '0.75rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            {event.heading || event.eventType}
          </span>
          <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            📅 {event.start?.replace('T', ' ').slice(0, 16)} – {event.end?.replace('T', ' ').slice(0, 16)}
          </span>
        </div>

        <h1 style={{ fontSize: '1.6rem', fontWeight: 850, margin: '0 0 14px 0', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
          {title}
        </h1>

        {intel.editorialSections.map((sec, idx) => (
          <div key={idx} style={{ marginBottom: '16px' }}>
            <h2 style={{ fontSize: '1.12rem', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--text-primary)' }}>
              {sec.heading}
            </h2>
            {sec.paragraphs.map((p, pIdx) => (
              <p
                key={pIdx}
                style={{
                  margin: '0 0 10px 0',
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.65,
                }}
              >
                {p}
              </p>
            ))}
          </div>
        ))}

        {/* Confirmed Bonuses, Spawns & Field Research Summary */}
        {(bonuses.length > 0 || spawns.length > 0 || researchTasks.length > 0) && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '14px',
              marginTop: '16px',
              paddingTop: '16px',
              borderTop: '1px solid var(--border-color)',
              alignItems: 'start',
            }}
          >
            {bonuses.length > 0 && (
              <div
                style={{
                  padding: '14px 16px',
                  borderRadius: '14px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                }}
              >
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, margin: '0 0 8px 0', color: '#4ade80' }}>
                  🎁 {validLang === 'cs' ? 'Potvrzené herní bonusy' : validLang === 'ja' ? 'イベントボーナス' : validLang === 'ru' ? 'Активные бонусы' : 'Confirmed Event Bonuses'}
                </h3>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  {bonuses.map((b, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>{b}</li>
                  ))}
                </ul>
              </div>
            )}

            {spawns.length > 0 && (
              <div
                style={{
                  padding: '14px 16px',
                  borderRadius: '14px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                }}
              >
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--cyan-accent)' }}>
                  🌿 {validLang === 'cs' ? 'Divoké spawny a debuty' : validLang === 'ja' ? '野生出現ポケモン' : validLang === 'ru' ? 'Спавны в дикой природе' : 'Featured Wild Spawns'}
                </h3>
                <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {spawns.map((s) => `${s.name}${s.canBeShiny ? ' ✨' : ''}`).join(', ')}
                </p>
              </div>
            )}

            {researchTasks.length > 0 && (
              <div
                style={{
                  padding: '14px 16px',
                  borderRadius: '14px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                }}
              >
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, margin: '0 0 8px 0', color: '#facc15' }}>
                  📋 {validLang === 'cs' ? 'Field Research úkoly' : validLang === 'ja' ? 'フィールドリサーチ' : validLang === 'ru' ? 'Полевые квесты' : 'Event Field Research'}
                </h3>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {researchTasks.slice(0, 8).map((r, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>
                      <strong>{r.task}</strong> → {r.reward}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </article>

      {/* Raid & Max Battle Boss Counters Intelligence Section */}
      {intel.bossBreakdowns.length > 0 && (
        <section
          className="card"
          style={{
            padding: '22px 24px',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-card)',
          }}
        >
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 14px 0', color: 'var(--text-primary)' }}>
            ⚔️{' '}
            {validLang === 'cs'
              ? 'Rozbor Raid / Max Battle Bossů: Slabosti, 100% IV CP a Nejlepší Counters'
              : validLang === 'ja'
                ? 'レイド・マックスバトルボス対策：弱点・100% IV CP・最強カウンター'
                : validLang === 'ru'
                  ? 'Разбор боссов: уязвимости, 100% IV CP и лучшие контр-покемоны'
                  : 'Raid & Max Battle Boss Breakdown: Weaknesses, 100% IV CP & Top Counters'}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {intel.bossBreakdowns.map((boss) => (
              <div
                key={boss.dexId}
                style={{
                  padding: '16px 18px',
                  borderRadius: '14px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${boss.dexId}.png`}
                      alt={boss.localizedName}
                      width={56}
                      height={56}
                      style={{ objectFit: 'contain' }}
                    />
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>
                        <Link href={`/${validLang}/pokedex/${boss.slug}`} style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
                          {boss.localizedName} (#{boss.dexId})
                        </Link>
                      </h3>
                      <div style={{ fontSize: '0.83rem', color: 'var(--text-muted)' }}>
                        {validLang === 'cs' ? 'Typ:' : 'Type:'} <strong>{boss.localizedTypes.join(' / ')}</strong> •{' '}
                        {validLang === 'cs' ? 'Doporučený tým:' : 'Lobby size:'} <strong>{boss.recommendedTrainers}</strong>
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/${validLang}/pokedex/${boss.slug}`}
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: 'var(--cyan-accent)',
                      textDecoration: 'none',
                    }}
                  >
                    {validLang === 'cs' ? 'Otevřít v Pokédexu →' : 'View in Pokédex →'}
                  </Link>
                </div>

                <p style={{ margin: '0 0 12px 0', fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  <strong>{validLang === 'cs' ? 'Slabosti bosse:' : validLang === 'ja' ? '弱点タイプ:' : validLang === 'ru' ? 'Уязвимости:' : 'Boss Weaknesses:'}</strong>{' '}
                  {boss.weaknesses.join(', ')} |{' '}
                  <strong>100% IV Hundo (Lv 20):</strong> <span className="gold-hundo-text">{boss.cpLv20} CP</span> |{' '}
                  <strong>100% IV Weather Boost (Lv 25):</strong> <span className="gold-hundo-text">{boss.cpLv25} CP</span> |{' '}
                  <strong>Max CP (Lv 50):</strong> {boss.cpLv50} CP
                </p>

                {boss.counters.length > 0 && (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
                          <th style={{ padding: '6px 8px' }}>#</th>
                          <th style={{ padding: '6px 8px' }}>{validLang === 'cs' ? 'Doporučený Counter' : 'Top Counter'}</th>
                          <th style={{ padding: '6px 8px' }}>{validLang === 'cs' ? 'Rychlý útok (Fast)' : 'Fast Move'}</th>
                          <th style={{ padding: '6px 8px' }}>{validLang === 'cs' ? 'Nabíjecí útok (Charged)' : 'Charged Move'}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {boss.counters.map((c, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <td style={{ padding: '6px 8px', fontWeight: 700 }}>{idx + 1}</td>
                            <td style={{ padding: '6px 8px', fontWeight: 700 }}>
                              <Link href={`/${validLang}/pokedex/${c.slug}`} style={{ color: 'var(--cyan-accent)', textDecoration: 'none' }}>
                                {c.localizedName}
                              </Link>
                            </td>
                            <td style={{ padding: '6px 8px' }}>{c.fastMove}</td>
                            <td style={{ padding: '6px 8px' }}>{c.chargedMove}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Featured Pokémon Meta Profiles, Recommended Megas & Filter Strings */}
      {intel.spawnBreakdowns.length > 0 && (
        <section
          className="card"
          style={{
            padding: '22px 24px',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-card)',
          }}
        >
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 14px 0', color: 'var(--text-primary)' }}>
            🎯{' '}
            {validLang === 'cs'
              ? 'Hlavní Pokémoni události: PvE/PvP hodnocení, Mega bonusy a Vyhledávací filtry'
              : validLang === 'ja'
                ? '注目ポケモンのPvE/PvP評価・おすすめメガシンカ・検索文字列'
                : validLang === 'ru'
                  ? 'Ключевые покемоны события: оценка в PvE/PvP, Мега-бонусы и строки поиска'
                  : 'Featured Event Pokémon: PvE/PvP Meta Value, Mega Boosts & Search Strings'}
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '14px',
              alignItems: 'start',
            }}
          >
            {intel.spawnBreakdowns.map((sp) => (
              <div
                key={sp.dexId}
                style={{
                  padding: '16px',
                  borderRadius: '14px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${sp.dexId}.png`}
                    alt={sp.localizedName}
                    width={52}
                    height={52}
                    style={{ objectFit: 'contain' }}
                  />
                  <div>
                    <h3 style={{ fontSize: '1.02rem', fontWeight: 800, margin: 0 }}>
                      <Link href={`/${validLang}/pokedex/${sp.slug}`} style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
                        {sp.localizedName} (#{sp.dexId}) {sp.canBeShiny ? '✨' : ''}
                      </Link>
                    </h3>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {sp.localizedTypes.join(' / ')} • Max CP (Lv 50): <strong>{sp.cpLv50}</strong>
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.55, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div>
                    <strong>100% IV CP:</strong> Research (Lv 15) <strong>{sp.cpLv15} CP</strong> • Egg/Raid (Lv 20) <strong>{sp.cpLv20} CP</strong>
                  </div>
                  <div>
                    <strong>PvE Moveset:</strong> {sp.pveSummary}
                  </div>
                  <div>
                    <strong>PvP Meta:</strong> {sp.pvpSummary}
                  </div>
                  <div>
                    <strong>{validLang === 'cs' ? 'Doporučená Mega evoluce pro extra Candy:' : 'Best Mega for Bonus Candy:'}</strong>{' '}
                    <span style={{ color: 'var(--accent-color)', fontWeight: 700 }}>{sp.recommendedMegas.join(', ')}</span>
                  </div>
                  <div style={{ marginTop: '4px', padding: '8px 10px', borderRadius: '8px', backgroundColor: 'rgba(0,0,0,0.25)', fontFamily: 'monospace', fontSize: '0.78rem' }}>
                    <div><strong>100% IV (Hundo):</strong> {sp.hundoFilterString}</div>
                    <div><strong>PvP IV (GL/UL):</strong> {sp.pvpFilterString}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* GO Battle League Active Cup Meta Tier List */}
      {intel.gblBreakdowns.length > 0 && (
        <section
          className="card"
          style={{
            padding: '22px 24px',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-card)',
          }}
        >
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 14px 0', color: 'var(--text-primary)' }}>
            🏆{' '}
            {validLang === 'cs'
              ? 'Doporučené Meta Týmy a TOP Pokémoni pro aktivní GO Battle League rotaci'
              : validLang === 'ja'
                ? 'GOバトルリーグ対象リーグの環境トップポケモン＆おすすめ技'
                : validLang === 'ru'
                  ? 'Лучшие мета-покемоны для активной ротации GO Battle League'
                  : 'Top Meta Pokémon & Movesets for Active GO Battle League Rotation'}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', alignItems: 'start' }}>
            {intel.gblBreakdowns.map((lg) => (
              <div
                key={lg.leagueKey}
                style={{
                  padding: '16px',
                  borderRadius: '14px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                }}
              >
                <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: '0 0 10px 0', color: 'var(--cyan-accent)' }}>
                  {lg.leagueTitle}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {lg.topPicks.map((p) => (
                    <div
                      key={p.dexId}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px 10px',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        fontSize: '0.84rem',
                      }}
                    >
                      <div>
                        <strong>#{p.rank}</strong>{' '}
                        <Link href={`/${validLang}/pokedex/${p.slug}`} style={{ color: 'var(--text-primary)', fontWeight: 700, textDecoration: 'none' }}>
                          {p.localizedName}
                        </Link>
                        <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{p.moveset}</div>
                      </div>
                      <span style={{ fontWeight: 800, color: '#4ade80' }}>{p.score} pt</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Interactive Single-Event Infographic & Export Card */}
      <section aria-label="Interactive Event Infographic">
        <EventCard
          event={event}
          lang={validLang}
          defaultExpanded={true}
          useInline={true}
          priority={true}
          ssrSpecialDetails={mergedDetails}
          hideStandaloneLink={true}
        />
      </section>

      {/* Event FAQ Section */}
      {intel.faqs.length > 0 && (
        <section
          className="card"
          style={{
            padding: '22px 24px',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-card)',
          }}
        >
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 14px 0' }}>
            ❓{' '}
            {validLang === 'cs'
              ? `Často kladené otázky (FAQ) k události ${title}`
              : validLang === 'ja'
                ? `「${title}」に関するよくある質問 (FAQ)`
                : validLang === 'ru'
                  ? `Часто задаваемые вопросы (FAQ): ${title}`
                  : `Frequently Asked Questions (FAQ): ${title}`}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {intel.faqs.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  padding: '14px 16px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                }}
              >
                <h3 style={{ fontSize: '0.94rem', fontWeight: 800, margin: '0 0 6px 0', color: 'var(--text-primary)' }}>
                  {faq.question}
                </h3>
                <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Events Internal Navigation */}
      {relatedEvents.length > 0 && (
        <section
          className="card"
          style={{
            padding: '22px 24px',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-card)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
              🗓️{' '}
              {validLang === 'cs'
                ? 'Další probíhající a nadcházející události v Pokémon GO'
                : validLang === 'ja'
                  ? 'その他の開催中・今後のイベント'
                  : validLang === 'ru'
                    ? 'Другие текущие и предстоящие события'
                    : 'More Live & Upcoming Pokémon GO Events'}
            </h2>
            <Link href={`/${validLang}`} style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-color)', textDecoration: 'none' }}>
              {validLang === 'cs' ? 'Zobrazit kompletní kalendář →' : 'View Full Calendar →'}
            </Link>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '12px',
              alignItems: 'start',
            }}
          >
            {relatedEvents.map((rel) => (
              <Link
                key={rel.eventID}
                href={`/${validLang}/events/${rel.eventID}`}
                style={{
                  display: 'block',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--cyan-accent)', marginBottom: '4px' }}>
                  {rel.heading || rel.eventType} • {rel.start?.slice(0, 10)}
                </div>
                <div style={{ fontSize: '0.92rem', fontWeight: 750, color: 'var(--text-primary)' }}>{rel.name}</div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
