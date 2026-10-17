import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RocketGuide } from '@/components/RocketGuide';
import type { Language } from '@/data/translations';
import { buildAlternates, getBreadcrumbLabel } from '@/utils/seoHelper';
import { API_BASE_URL } from '@/config';

export const revalidate = 3600;

export const ROCKET_LEADERS = ['giovanni', 'cliff', 'sierra', 'arlo', 'grunts'] as const;
export type RocketLeaderSlug = typeof ROCKET_LEADERS[number];

const LEADER_INFO: Record<RocketLeaderSlug, Record<Language, { name: string; title: string; desc: string; summary: string }>> = {
  giovanni: {
    cs: {
      name: 'Giovanni',
      title: 'Boss Giovanni Sestava & Nejlepší Counters | Pokémon GO',
      desc: 'Aktuální sestava a doporučení protihráči na Bosse Giovanniho v Pokémon GO. Jak snadno porazit Persian a Shadow Legendárního Pokémona.',
      summary: 'Giovanni začíná vždy s Persianem (slabost: Bojový typ jako Terrakion, Lucario nebo Machamp s rychlým nabíjením Cross Chop na spálení jeho 2 štítů). Ve 2. slotu nasazuje Kangaskhana, Rhyperiora nebo Nidokinga a ve 3. slotu aktuálního Shadow Legendárního Pokémona.',
    },
    en: {
      name: 'Giovanni',
      title: 'Giovanni Lineup & Best Counters Guide | Pokémon GO',
      desc: 'Current lineup, weakness guide, and top counters to defeat Team GO Rocket Boss Giovanni in Pokémon GO.',
      summary: 'Giovanni always leads with Persian (weak to Fighting-type attackers like Terrakion, Lucario, or Machamp using rapid Charged Moves to burn both of his shields). His second slot features Kangaskhan, Rhyperior, or Nidoking, followed by his current Shadow Legendary Pokémon in slot 3.',
    },
    ja: {
      name: 'サカキ',
      title: 'サカキの手持ちポケモンと対策・倒し方 | Pokémon GO',
      desc: 'Pokémon GO GOロケット団のボス・サカキの最新手持ちポケモンとおすすめ対策パーティ。',
      summary: 'サカキの1匹目は常にペルシアン（弱点：かくとうタイプのルカリオ、テラキオン、カイリキーでシールド2枚を素早く破壊）。2匹目はガルーラ・ドサイドン・ニドキング、3匹目にシャドウ伝説ポケモンが登場します。',
    },
    ru: {
      name: 'Джованни',
      title: 'Джованни - Состав и лучшие контр-покемоны | Pokémon GO',
      desc: 'Актуальный состав и гайд по победе над Боссом Джованни в Pokémon GO.',
      summary: 'Джованни всегда начинает бой с Персиана (уязвим к боевым покемонам: Лукарио, Терракион, Мачамп для быстрого снятия двух щитов). Во втором слоте — Кангасхан, Райпериор или Нидокинг, а в третьем — текущий теневой легендарный покемон.',
    },
  },
  cliff: {
    cs: {
      name: 'Cliff',
      title: 'Lídr Cliff Sestava & Nejlepší Counters | Pokémon GO',
      desc: 'Aktuální Pokémoni, slabosti a nejlepší counters na lídra Cliffa (Team GO Rocket) v Pokémon GO.',
      summary: 'Lídr Cliff vyžaduje Rocket Radar a používá oba štíty na první 2 Charged útoky. Využijte stun-lock efekt (2sekundová pauza po každém Charged útoku nebo střídání Pokémona) s rychlými bojovými, vodními či ledovými útočníky.',
    },
    en: {
      name: 'Cliff',
      title: 'Leader Cliff Lineup & Counters Guide | Pokémon GO',
      desc: 'Team GO Rocket Leader Cliff lineup, weaknesses, and top counters in Pokémon GO.',
      summary: 'Team GO Rocket Leader Cliff requires a Rocket Radar and always shields your first two Charged Moves. Exploit the 2-second stun lock after Charged Moves and switches using spammy Fighting, Water, or Ice attackers.',
    },
    ja: {
      name: 'クリフ',
      title: 'リーダー・クリフの手持ちと対策ポケモン | Pokémon GO',
      desc: 'Pokémon GO GOロケット団リーダー・クリフの対策とおすすめポケモン。',
      summary: 'リーダーのクリフは最初のゲージ技2回に必ずシールドを使用します。ゲージ技や交代後の硬直時間を活用して突破しましょう。',
    },
    ru: {
      name: 'Клифф',
      title: 'Лидер Клифф - Состав и контр-покемоны | Pokémon GO',
      desc: 'Гайд по победе над лидером Клиффом в Pokémon GO.',
      summary: 'Лидер Клифф использует щиты на первые две заряженные атаки. Используйте быстрых атакующих для снятия щитов и стан-лока.',
    },
  },
  sierra: {
    cs: {
      name: 'Sierra',
      title: 'Lídr Sierra Sestava & Nejlepší Counters | Pokémon GO',
      desc: 'Aktuální Pokémoni, slabosti a nejlepší counters na lídryni Sierru (Team GO Rocket) v Pokémon GO.',
      summary: 'Lídryně Sierra používá oba štíty hned na začátku zápasu. Nejlepší strategií je nasadit odolného leadera s rychlým Charged útokem (např. Lucario, Melmetal nebo Swampert) a získat 12km Strange Egg za vítězství.',
    },
    en: {
      name: 'Sierra',
      title: 'Leader Sierra Lineup & Counters Guide | Pokémon GO',
      desc: 'Team GO Rocket Leader Sierra lineup, weaknesses, and best battle counters in Pokémon GO.',
      summary: 'Team GO Rocket Leader Sierra shields the first two Charged Moves in battle. Lead with a fast-charging Pokémon like Lucario, Melmetal, or Swampert to burn her shields and claim a 12km Strange Egg.',
    },
    ja: {
      name: 'シエラ',
      title: 'リーダー・シエラの手持ちと対策ポケモン | Pokémon GO',
      desc: 'Pokémon GO GOロケット団リーダー・シエラの対策とおすすめポケモン。',
      summary: 'リーダーのシエラはシールドを2枚使用します。回転の速いゲージ技を持つルカリオやメルメタルでシールドを剥がすのが有効です。',
    },
    ru: {
      name: 'Сиерра',
      title: 'Лидер Сиерра - Состав и контр-покемоны | Pokémon GO',
      desc: 'Гайд по победе над лидером Сиеррой в Pokémon GO.',
      summary: 'Лидер Сиерра блокирует первые две заряженные атаки. Используйте Лукарио или Мелметала для быстрого снятия щитов.',
    },
  },
  arlo: {
    cs: {
      name: 'Arlo',
      title: 'Lídr Arlo Sestava & Nejlepší Counters | Pokémon GO',
      desc: 'Aktuální Pokémoni, slabosti a nejlepší counters na lídra Arla (Team GO Rocket) v Pokémon GO.',
      summary: 'Lídr Arlo je třetím z lídrů Team GO Rocket potřebných pro plnění Special Research na Super Rocket Radar. Porazte jeho 3 Pokémony pomocí rychlých ohnivých, kamenných a bojových counterů.',
    },
    en: {
      name: 'Arlo',
      title: 'Leader Arlo Lineup & Counters Guide | Pokémon GO',
      desc: 'Team GO Rocket Leader Arlo lineup, weaknesses, and top counters in Pokémon GO.',
      summary: 'Team GO Rocket Leader Arlo is one of the three leaders required for Super Rocket Radar Special Research. Use fast-charging Fire, Rock, and Fighting counters to break his two shields and defeat his lineup.',
    },
    ja: {
      name: 'アルロ',
      title: 'リーダー・アルロの手持ちと対策ポケモン | Pokémon GO',
      desc: 'Pokémon GO GOロケット団リーダー・アルロの対策とおすすめポケモン。',
      summary: 'リーダーのアルロはスーパーロケットレーダー入手リサーチで討伐が必要です。弱点を突ける高速アタッカーでシールドを削りましょう。',
    },
    ru: {
      name: 'Арло',
      title: 'Лидер Арло - Состав и контр-покемоны | Pokémon GO',
      desc: 'Гайд по победе над лидером Арло в Pokémon GO.',
      summary: 'Победа над лидером Арло необходима для получения Супер Радара Команды R. Используйте огненных, каменных и боевых покемонов.',
    },
  },
  grunts: {
    cs: {
      name: 'Rakeťáci (Grunts)',
      title: 'Team GO Rocket Grunts Hlášky & Sestavy | Pokémon GO',
      desc: 'Kompletní přehled hlášek řadových Rakeťáků, typů Pokémonů a Shadow odměn v Pokémon GO.',
      summary: 'Úvodní hláška (taunt) každého řadového Rakeťáka přesně prozrazuje typ jeho Pokémonů (např. „Coiled and ready to strike!“ = Jedový typ, „Winning is for winners“ = elitní Snorlax/Dragonite sestava). Řadoví Grunti nikdy nepoužívají štíty.',
    },
    en: {
      name: 'Rocket Grunts',
      title: 'Team GO Rocket Grunts Taunts & Lineups | Pokémon GO',
      desc: 'Complete guide to Team GO Rocket Grunt phrases, types, and encounter rewards in Pokémon GO.',
      summary: 'Every Team GO Rocket Grunt opening taunt reveals the elemental type of their lineup before battle (e.g., "Coiled and ready to strike!" = Poison, "Winning is for winners" = Snorlax/Dragonite). Grunts never use shields.',
    },
    ja: {
      name: 'したっぱ',
      title: 'GOロケット団したっぱのセリフと手持ち一覧 | Pokémon GO',
      desc: 'Pokémon GO GOロケット団したっぱのセリフ別タイプと対策一覧。',
      summary: 'GOロケット団のしたっぱはバトル前のセリフで手持ちポケモンのタイプが判別できます。したっぱはシールドを使用しません。',
    },
    ru: {
      name: 'Пехотинцы Команды R',
      title: 'Фразы и составы пехотинцев Команды R | Pokémon GO',
      desc: 'Полный список фраз и составов пехотинцев Команды R в Pokémon GO.',
      summary: 'Приветственная фраза пехотинца Команды R заранее указывает на тип его покемонов. Пехотинцы никогда не используют щиты.',
    },
  },
};

export function generateStaticParams() {
  const languages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const params: { lang: Language; leader: string }[] = [];

  languages.forEach((lang) => {
    ROCKET_LEADERS.forEach((leader) => {
      params.push({ lang, leader });
    });
  });

  return params;
}

interface PageProps {
  params: Promise<{ lang: Language; leader: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const unwrapped = await params;
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(unwrapped.lang as Language) ? (unwrapped.lang as Language) : 'cs';
  const leaderSlug = unwrapped.leader.toLowerCase() as RocketLeaderSlug;

  const info = LEADER_INFO[leaderSlug]?.[lang] || LEADER_INFO[leaderSlug]?.en;
  if (!info) {
    return {
      title: 'Leader Not Found | Pokémon GO Event Tracker',
      description: 'Leader not found.',
      robots: { index: false, follow: false },
    };
  }

  const canonicalUrl = `https://pogoevents.app/${lang}/rocket/${leaderSlug}`;

  return {
    title: info.title,
    description: info.desc,
    alternates: buildAlternates(lang, `/rocket/${leaderSlug}`, 'https://pogoevents.app/api/agent/rocket.md'),
    openGraph: {
      title: info.title,
      description: info.desc,
      url: canonicalUrl,
      images: [{ url: 'https://pogoevents.app/logo-banner.jpg', width: 1200, height: 630, alt: info.title }]
    }
  };
}

async function getInitialRocketData() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/rocket`, { next: { revalidate: 300 } });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {}
  return undefined;
}

export default async function RocketLeaderPage({ params }: PageProps) {
  const unwrapped = await params;
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(unwrapped.lang as Language) ? (unwrapped.lang as Language) : 'cs';
  const leaderSlug = unwrapped.leader.toLowerCase() as RocketLeaderSlug;

  const info = LEADER_INFO[leaderSlug]?.[lang] || LEADER_INFO[leaderSlug]?.en;
  if (!info) {
    notFound();
  }

  const canonicalUrl = `https://pogoevents.app/${lang}/rocket/${leaderSlug}`;
  const initialRocketData = await getInitialRocketData();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: info.title,
        description: info.desc,
        url: canonicalUrl,
        mainEntityOfPage: canonicalUrl,
        author: { '@type': 'Organization', name: 'PoGo Events Tracker', url: 'https://pogoevents.app' },
        publisher: {
          '@type': 'Organization',
          name: 'PoGo Events Tracker',
          logo: { '@type': 'ImageObject', url: 'https://pogoevents.app/logo-icon-1080.png' },
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: lang === 'cs' ? `Jak porazit ${info.name} v Pokémon GO?` : `How to defeat ${info.name} in Pokémon GO?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: info.summary,
            },
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: getBreadcrumbLabel('home', lang), item: `https://pogoevents.app/${lang}` },
          { '@type': 'ListItem', position: 2, name: getBreadcrumbLabel('rocket', lang), item: `https://pogoevents.app/${lang}/rocket` },
          { '@type': 'ListItem', position: 3, name: info.name, item: canonicalUrl }
        ]
      }
    ]
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
          padding: '16px 20px',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-card)',
        }}
      >
        <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 6px 0' }}>{info.title}</h2>
        <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{info.summary}</p>
      </article>
      <RocketGuide lang={lang} initialRocketData={initialRocketData} initialLeader={leaderSlug} />
    </>
  );
}
