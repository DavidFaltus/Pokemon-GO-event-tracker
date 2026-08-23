'use client';

import { useEffect } from 'react';
import { useAppNavigate } from '@/hooks/useAppNavigate';
import App from '@/App';
import type { Language } from '@/data/translations';

export default function Home() {
  const navigate = useAppNavigate();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('pogo_tracker_lang') as Language | null;
      const targetLang = (savedLang === 'cs' || savedLang === 'ja' || savedLang === 'ru' || savedLang === 'en') ? savedLang : 'en';
      const targetPath = `/${targetLang}`;
      if (window.location.pathname === '/' || window.location.pathname === '') {
        navigate.replace(targetPath);
      }
    }
  }, [navigate]);

  return <App initialLang="en" />;
}
