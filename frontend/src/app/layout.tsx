import React from 'react';
import Script from 'next/script';
import { Outfit } from 'next/font/google';
import { NavigatorProvider } from '@/hooks/useAppNavigate';
import { ThemeProvider } from '@/context/ThemeContext';
import '../index.css';
import '../App.css';
import './globals.css';
import type { Metadata, Viewport } from 'next';

const outfit = Outfit({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'Pokémon GO Event Tracker - Live Události, Raid Bossi & Rakeťáci',
  description: 'Sledujte aktivní a nadcházející Pokémon GO události, raid bossy, sestavy Team GO Rocket, líhnutí z vajec a bonusy v reálném čase.',
  keywords: ['Pokémon GO', 'events', 'raid boss', 'Team GO Rocket', 'pogo guides', 'pogo tracker', 'pokemongo'],
  authors: [{ name: 'David Faltus', url: 'https://pogoevents.app/cs/about' }],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' }
    ],
    apple: '/favicon.svg',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0f1015',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" className={outfit.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="google-adsense-account" content="ca-pub-8800056915088711" />
        <link rel="describedby" href="/llms.txt" type="text/plain" title="LLM Context & Agent API" />
        <link rel="alternate" type="text/markdown" href="https://pogoevents.app/api/agent/events.md" title="Pokémon GO Live Events (Markdown)" />
        {/* Preconnect & DNS prefetch for image CDNs to accelerate LCP & asset downloads */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://raw.githubusercontent.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://img.pokemondb.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fastly.jsdelivr.net" />
        {/* Google Consent Mode v2 defaults for EEA/UK/CH prior to Google tags and IAB TCF v2.2 CMP */}
        <Script
          id="google-consent-mode-v2"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                analytics_storage: 'denied',
                region: ['AT','BE','BG','CH','CY','CZ','DE','DK','EE','ES','FI','FR','GB','GR','HR','HU','IE','IS','IT','LI','LT','LU','LV','MT','NL','NO','PL','PT','RO','SE','SI','SK'],
                wait_for_update: 1500
              });
              gtag('set', 'ads_data_redaction', true);
            `,
          }}
        />
        {/* Standard static Google AdSense tag in <head> for reliable site verification & Google GDPR CMP (IAB TCF v2.2) across all routes including root / and /privacy */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8800056915088711"
          crossOrigin="anonymous"
        />
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('pogo_tracker_theme');
                  if (saved === 'light') {
                    document.documentElement.setAttribute('data-theme', 'light');
                    document.documentElement.classList.add('light-mode');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={outfit.className} suppressHydrationWarning>
        {/* Google Tag (gtag.js) - lazyOnload loads analytics without competing for initial render */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-17PT93VMXQ"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-17PT93VMXQ');
            gtag('config', 'G-MKGYZSS7GK');
          `}
        </Script>

        <div id="root">
          <NavigatorProvider>
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </NavigatorProvider>
        </div>
      </body>
    </html>
  );
}
