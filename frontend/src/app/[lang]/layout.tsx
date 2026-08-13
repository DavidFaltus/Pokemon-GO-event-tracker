import React from 'react';
import type { Language } from '@/data/translations';
import { AppShell } from '@/components/AppShell';

interface LanguageLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function LanguageLayout({ children, params }: LanguageLayoutProps) {
  const unwrapped = await params;
  const rawLang = unwrapped.lang || 'en';
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(rawLang as Language) ? (rawLang as Language) : 'en';

  return <AppShell lang={lang}>{children}</AppShell>;
}
