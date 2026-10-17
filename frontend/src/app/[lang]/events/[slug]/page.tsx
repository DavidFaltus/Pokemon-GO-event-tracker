import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import App from '@/App';
import { resolveImage } from '@/utils/imageResolver';
import type { EventData } from '@/components/EventCard';
import type { Language } from '@/data/translations';
import { getSpecialEventDetails } from '@/data/specialEvents';
import { buildAlternates, getBreadcrumbLabel } from '@/utils/seoHelper';
import { apiFetch } from '@/config';

function extractLocalizedText(value: any, lang: Language): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object') {
    if (lang === 'ja' && value.ja) return value.ja;
    if (lang === 'cs' && value.cs) return value.cs;
    return value.en || value.cs || value.ja || '';
  }
  return String(value);
}

export const revalidate = 300;

export async function generateStaticParams() {
  const languages: Language[] = ['cs', 'en', 'ja', 'ru'];
  let eventSlugs: string[] = ['default-event'];

  try {
    const res = await apiFetch('/api/events', { next: { revalidate: 3600 } });
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
    const resAll = await apiFetch('/api/events', {
      next: { revalidate: 300 },
    });
    if (resAll.ok) {
      const data = await resAll.json();
      allEvents = Array.isArray(data) ? data : data.events || [];
      detail = allEvents.find((e) => e.eventID === slug) || null;
    }
  } catch (err) {}

  try {
    const res = await apiFetch(`/api/events/${slug}`, {
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

function getEventEditorialStrategy(event: EventData, lang: Language): string {
  const type = (event.eventType || '').toLowerCase();
  const name = event.name || '';
  const lowerName = name.toLowerCase();

  if (type.includes('community-day') || lowerName.includes('community day')) {
    if (lang === 'cs') return `Community Day událost „${name}“ patří mezi nejvýznamnější akce v Pokémon GO s výrazně zvýšenou šancí na Shiny variantu (přibližně 1 z 25). Před začátkem si připravte dostatek Ultra Ballů, Pinap Berries, aktivujte Mega evoluci stejného typu pro extra Candy a XL Candy a nezapomeňte vyvinout hlavního Pokémona během akce pro získání exkluzivního Legacy útoku.`;
    if (lang === 'ja') return `コミュニティ・デイ「${name}」は、対象ポケモンの色違い確率が大幅にアップ（約1/25）する重要イベントです。開始前にハイパーボールやパイルのみを十分に確保し、同タイプのメガシンカを発動してアメとアメXLを効率よく集め、限定技（特別なわざ）の習得可能時間内に進化させましょう。`;
    if (lang === 'ru') return `День сообщества «${name}» — одно из главных событий в Pokémon GO с повышенным шансом встретить шайни-покемона (около 1 к 25). Заранее запаситесь Ультраболлами и ягодами Пинап, активируйте Мега-эволюцию того же типа для бонусных конфет XL и эволюционируйте покемона во время события, чтобы получить эксклюзивную атаку.`;
    return `The "${name}" Community Day features a heavily boosted Shiny rate (approximately 1 in 25) and exclusive event bonuses. Stock up on Ultra Balls and Pinap Berries ahead of time, activate a matching-type Mega Evolution to maximize Candy and Candy XL drops, and evolve the featured Pokémon during the event window to unlock its exclusive legacy move.`;
  }

  if (type.includes('spotlight') || lowerName.includes('spotlight')) {
    if (lang === 'cs') return `Pokémon Spotlight Hour „${name}“ probíhá každé úterý od 18:00 do 19:00 místního času. Během této hodiny zaplní mapu vybraný Pokémon a aktivuje se speciální hodinový bonus (např. 2× Stardust, 2× XP nebo 2× Candy za chytání či přenos). Pro maximální efektivitu zapněte Star Piece nebo Lucky Egg těsně před 18:00 a využijte funkci rychlého chytání.`;
    if (lang === 'ja') return `スポットライトアワー「${name}」は火曜日の18:00〜19:00に開催され、特定のポケモンが大量発生するとともに特別なボーナス（ほしのすな2倍、XP2倍、アメ2倍など）が適用されます。ほしのかけらやしあわせタマゴを併用して効率よく稼ぎましょう。`;
    if (lang === 'ru') return `Час покемона «${name}» проходит во вторник с 18:00 до 19:00 по местному времени. В течение этого часа выбранный покемон массово появляется на карте вместе со специальным бонусом (2× пыли, 2× опыта или 2× конфет). Используйте Star Piece или Lucky Egg для максимальной выгоды.`;
    return `The "${name}" Pokémon Spotlight Hour runs from 6:00 PM to 7:00 PM local time, flooding the map with the featured Pokémon alongside a dedicated 1-hour multiplier bonus (such as 2x Catch Stardust, 2x XP, or 2x Transfer Candy). Pop a Star Piece or Lucky Egg right at 6:00 PM to maximize your gains.`;
  }

  if (type.includes('raid') || lowerName.includes('raid')) {
    if (lang === 'cs') return `Raidová událost „${name}“ přináší zvýšený výskyt raid bossů v Gymech. Před vstupem do lobby zkontrolujte v naší sekci Raidů doporučené countery, 100% IV CP hodnoty (na úrovni 20 a 25 při Weather Boostu) a aktivujte v partě přátel funkci Party Power, která zdvojnásobuje poškození nabíjecích útoků.`;
    if (lang === 'ja') return `レイドイベント「${name}」では、対象のレイドボスがジムに多数出現します。挑戦前に弱点タイプや対策ポケモン、個体値100%（Hundo）のCPラインを確認し、フレンドとのチームコラボ（Party Power）を活用して効率よく討伐しましょう。`;
    if (lang === 'ru') return `Рейдовое событие «${name}» увеличивает количество рейд-боссов в гимах. Перед началом боя проверьте лучших контр-покемонов и таблицу 100% IV CP (20 и 25 уровни), а также используйте функцию Party Power с друзьями для удвоения урона заряженных атак.`;
    return `The "${name}" raid rotation and event brings featured bosses to Gyms. Check our Raid Counters guide for optimal Shadow and Mega attackers, verify the 100% IV Hundo CP thresholds (Level 20 and Level 25 Weather Boosted), and team up with friends using Party Power to double your Charged Attack damage.`;
  }

  if (lowerName.includes('hatch') || type.includes('egg')) {
    if (lang === 'cs') return `Líhnoucí událost „${name}“ výrazně zvyšuje šanci na vylíhnutí vybraného Pokémona (včetně Shiny verze) z 2km, 5km nebo 10km vajec a přináší bonusy pro zkrácení vzdálenosti inkubátorů. Před začátkem akce si uvolněte místo v inventáři vajec, abyste z PokéStopů sbírali pouze nová eventová vejce.`;
    if (lang === 'ja') return `タマゴ孵化イベント「${name}」では、特定のポケモンや色違いがタマゴから孵りやすくなり、孵化距離短縮などのボーナスが発生します。イベント開始前にタマゴ枠を空けておき、ポケストップから新しいイベントタマゴを入手しましょう。`;
    if (lang === 'ru') return `Событие вылупления «${name}» повышает шанс получить выбранного покемона (включая шайни) из яиц и сокращает дистанцию инкубации. Освободите слоты для яиц до начала события, чтобы собирать только новые ивентовые яйца с Покестопов.`;
    return `The "${name}" Hatch event boosts the hatch rate and Shiny odds of the featured Pokémon from Eggs alongside incubator distance bonuses. Clear your Egg storage prior to the event start so every PokéStop spin rewards fresh event Eggs.`;
  }

  if (lang === 'cs') return `Událost „${name}“ v Pokémon GO přináší časově omezené herní bonusy, tematické výskyty Pokémonů v divočině a speciální Field či Timed Research úkoly. Sledujte odpočet v reálném čase níže, abyste stihli dokončit všechny časově omezené výzkumy a využít aktivní bonusy před koncem akce.`;
  if (lang === 'ja') return `Pokémon GOのイベント「${name}」では、期間限定のボーナスや野生出現ポケモン、フィールドリサーチ・タイムチャレンジが登場します。終了日時までに限定タスクや報酬をすべて受け取りましょう。`;
  if (lang === 'ru') return `Событие «${name}» в Pokémon GO предлагает временные бонусы, тематические спавны в дикой природе и специальные полевые квесты. Следите за таймером ниже, чтобы успеть выполнить все временные исследования до окончания ивента.`;
  return `The "${name}" event in Pokémon GO introduces limited-time bonuses, themed wild spawns, and exclusive Field and Timed Research tasks. Track the live countdown timer below to complete all timed research steps and claim your rewards before the event concludes.`;
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
    cs: `Detail a strategický průvodce událostí ${title} v Pokémon GO (${event.start?.slice(0, 10) || ''} – ${event.end?.slice(0, 10) || ''}). Časy trvání, aktivní bonusy, raid bossové a výskyty v divočině.`,
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
  const specialDetails = getSpecialEventDetails(event.eventID, event.name);

  const rawBonuses: any[] = (event as any).bonuses || (event as any).extraData?.bonuses || (event as any).extraData?.communityday?.bonuses || specialDetails?.bonuses || [];
  const bonuses: string[] = rawBonuses
    .map((b) => (typeof b === 'string' ? b : extractLocalizedText(b?.text || b, validLang)))
    .filter(Boolean);

  const rawSpawns: any[] = (event as any).spawns || (event as any).extraData?.spawns || (event as any).extraData?.communityday?.spawns || specialDetails?.spawns || [];
  const spawns: { name: string; canBeShiny?: boolean }[] = rawSpawns
    .map((s) => (typeof s === 'string' ? { name: s } : { name: extractLocalizedText(s?.name || s, validLang), canBeShiny: s?.canBeShiny }))
    .filter((s) => Boolean(s.name));

  const strategyParagraph = getEventEditorialStrategy(event, validLang);

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
        description: strategyParagraph,
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
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 8px 0' }}>{title}</h2>
        <p className="tab-seo-description" style={{ margin: '0 0 10px 0' }}>
          <strong>{validLang === 'cs' ? 'Začátek:' : validLang === 'ja' ? '開始:' : validLang === 'ru' ? 'Начало:' : 'Start:'}</strong> {event.start}{' '}
          | <strong>{validLang === 'cs' ? 'Konec:' : validLang === 'ja' ? '終了:' : validLang === 'ru' ? 'Конец:' : 'End:'}</strong> {event.end}{' '}
          | <strong>{validLang === 'cs' ? 'Typ:' : validLang === 'ja' ? '種別:' : validLang === 'ru' ? 'Тип:' : 'Type:'}</strong> {event.eventType}
        </p>
        <p style={{ margin: '0 0 12px 0', fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
          {strategyParagraph}
        </p>
        {bonuses.length > 0 && (
          <div style={{ marginBottom: '10px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 6px 0' }}>
              {validLang === 'cs' ? 'Aktivní bonusy' : validLang === 'ja' ? 'イベントボーナス' : validLang === 'ru' ? 'Активные бонусы' : 'Active Event Bonuses'}
            </h3>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
              {bonuses.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        )}
        {spawns.length > 0 && (
          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 6px 0' }}>
              {validLang === 'cs' ? 'Výskyty Pokémonů (Spawns)' : validLang === 'ja' ? '野生出現ポケモン' : validLang === 'ru' ? 'Спавны покемонов' : 'Featured Wild Spawns'}
            </h3>
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
