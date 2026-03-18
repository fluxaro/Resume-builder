import { useEffect } from 'react';

// Light-only mode — dark mode removed by design
export function useTheme() {
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('dark');
    root.classList.add('light');
    localStorage.setItem('theme', 'light');
  }, []);

  return { theme: 'light' as const, toggleTheme: () => {} };
}
