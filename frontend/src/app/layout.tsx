import React from 'react';
import Script from 'next/script';
import '../index.css';
import '../App.css';
import './globals.css';
import type { Metadata, Viewport } from 'next';

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
    <html lang="en" data-theme="dark">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        {/* Google Fonts - non-blocking via print media trick (prevents render-blocking) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="style"
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap"
        />
        {/* media=print trick: loads font async, then switches to all when done */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap"
          rel="stylesheet"
          media="all"
        />
        <noscript>
          <link
            href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </noscript>
        <link rel="preconnect" href="https://raw.githubusercontent.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body>
        {/* Google Tag (gtag.js) - single library load for both analytics IDs */}
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
        {/* Google AdSense - lazyOnload strategy to prevent render-blocking on page load */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8800056915088711"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  );
}
