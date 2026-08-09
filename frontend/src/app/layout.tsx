import React from 'react';
import Script from 'next/script';
import { Outfit } from 'next/font/google';
import { NavigatorProvider } from '@/hooks/useAppNavigate';
import '../index.css';
import '../App.css';
import './globals.css';
import '../components/RocketGuide.css';
import '../components/RaidView.css';
import '../components/EventCard.css';
import '../components/DittoEggsView.css';
import '../components/PokemonRankingsView.css';
import '../components/FilterGeneratorView.css';
import '../components/NotificationSettings.css';
import '../components/AdminPanelView.css';
import '../components/CalendarView.css';
import '../components/ActiveBonuses.css';
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
  keywords: ['Pokémon GO', 'events', 'raid boss', 'Team GO Rocket', 'leek duck', 'pogo tracker', 'pokemongo'],
  authors: [{ name: 'Pokémon GO Community' }],
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
    <html lang="en" data-theme="dark" className={outfit.variable}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        {/* Preconnect & DNS prefetch for image CDNs to accelerate LCP & asset downloads */}
        <link rel="preconnect" href="https://raw.githubusercontent.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://img.pokemondb.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://cdn.leekduck.com" />
      </head>
      <body className={outfit.className}>
        {/* Google Tag (gtag.js) - afterInteractive loads analytics early without blocking initial render */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-17PT93VMXQ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-17PT93VMXQ');
            gtag('config', 'G-MKGYZSS7GK');
          `}
        </Script>
        {/* Google AdSense - lazyOnload strategy to prevent render-blocking on page load */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8800056915088711"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
        <div id="root">
          <NavigatorProvider>
            {children}
          </NavigatorProvider>
        </div>
      </body>
    </html>
  );
}

