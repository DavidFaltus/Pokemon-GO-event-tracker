'use client';

import { createContext, useContext, useCallback, ReactElement, type ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import React from 'react';

interface AppNavigator {
  push: (path: string) => void;
  replace: (path: string) => void;
  pathname: string;
}

const NavigatorContext = createContext<AppNavigator | null>(null);

/**
 * Provider wrapping App in Next.js pages — bridges the Next.js App Router
 * with the custom SPA routing inside App.tsx.
 *
 * Uses next/navigation's useRouter so URL changes are properly reflected
 * in the address bar (Next.js intercepts raw pushState/replaceState).
 */
export function NavigatorProvider({ children }: { children: ReactNode }): ReactElement {
  const router = useRouter();
  const pathname = usePathname();

  const push = useCallback((path: string) => {
    router.push(path, { scroll: false });
  }, [router]);

  const replace = useCallback((path: string) => {
    router.replace(path, { scroll: false });
  }, [router]);

  return (
    <NavigatorContext.Provider value={{ push, replace, pathname }}>
      {children}
    </NavigatorContext.Provider>
  );
}

/**
 * Hook to access the navigation functions.
 * Falls back to window.history when not wrapped in NavigatorProvider
 * (e.g., Vite/Capacitor standalone builds).
 */
export function useAppNavigate(): AppNavigator {
  const ctx = useContext(NavigatorContext);
  if (ctx) return ctx;

  // Fallback for non-Next.js environments
  return {
    push: (path: string) => {
      if (typeof window !== 'undefined') window.history.pushState(null, '', path);
    },
    replace: (path: string) => {
      if (typeof window !== 'undefined') window.history.replaceState(null, '', path);
    },
    pathname: typeof window !== 'undefined' ? window.location.pathname : '/',
  };
}
