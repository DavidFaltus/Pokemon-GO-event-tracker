import React from 'react';
import { Metadata } from 'next';
import App from '@/App';

export const metadata: Metadata = {
  title: 'Admin Panel | Pokémon GO Event Tracker',
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <App initialLang="cs" initialTab="admin" />;
}
