import { useState, useEffect, useCallback } from 'react';

const listeners = new Set<(isDark: boolean) => void>();

function getInitialTheme(): boolean {
  if (typeof window === 'undefined') return false;
  const saved = localStorage.getItem('adsc-theme');
  if (saved !== null) return saved === 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

let globalIsDark = getInitialTheme();

// Apply initial class on load
if (typeof window !== 'undefined') {
  if (globalIsDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

/**
 * Shared site-wide dark mode hook.
 * All components using useTheme() remain synchronously updated
 * when any component triggers toggleTheme().
 */
export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(globalIsDark);

  useEffect(() => {
    // Keep local state aligned with shared globalIsDark
    setIsDark(globalIsDark);

    const handler = (newIsDark: boolean) => {
      setIsDark(newIsDark);
    };

    listeners.add(handler);
    return () => {
      listeners.delete(handler);
    };
  }, []);

  const toggleTheme = useCallback(() => {
    globalIsDark = !globalIsDark;
    if (typeof window !== 'undefined') {
      if (globalIsDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('adsc-theme', globalIsDark ? 'dark' : 'light');
    }
    listeners.forEach((listener) => listener(globalIsDark));
  }, []);

  return { isDark, toggleTheme };
}
