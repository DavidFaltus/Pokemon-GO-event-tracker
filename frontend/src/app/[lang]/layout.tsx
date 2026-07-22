import React from 'react';

interface LanguageLayoutProps {
  children: React.ReactNode;
}

export default function LanguageLayout({ children }: LanguageLayoutProps) {
  return <>{children}</>;
}
