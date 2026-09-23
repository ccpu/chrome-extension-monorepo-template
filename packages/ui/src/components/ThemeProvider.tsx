import React, { createContext, useEffect, useMemo, useState } from 'react';
import '@internal/tailwind/globals.css';

type Theme = string;

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/** Provides the persisted theme and applies it to the document root. */
export function ThemeProvider({
  children,
  defaultTheme = 'system',
}: {
  children: React.ReactNode;
  defaultTheme?: string;
}) {
  const [selectedTheme, setSelectedTheme] = useState<Theme>(() => {
    const savedTheme = window.localStorage.getItem('theme');
    return savedTheme !== null ? savedTheme : defaultTheme;
  });

  // Helper: get system theme
  const getSystemTheme = () => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  };

  // Set theme and persist
  const setTheme = (newTheme: Theme) => {
    setSelectedTheme(newTheme);
    window.localStorage.setItem('theme', newTheme);
  };

  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement;
    let appliedTheme = selectedTheme;
    if (selectedTheme === 'system') {
      appliedTheme = getSystemTheme();
    }
    if (appliedTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [selectedTheme]);

  // Listen for system theme changes if "system" is selected
  useEffect(() => {
    if (selectedTheme !== 'system') return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    function handler() {
      const root = window.document.documentElement;
      if (media.matches) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
    media.addEventListener('change', handler);
    // eslint-disable-next-line consistent-return
    return () => media.removeEventListener('change', handler);
  }, [selectedTheme]);

  return (
    <ThemeContext
      value={useMemo(() => ({ theme: selectedTheme, setTheme }), [selectedTheme])}
    >
      {children}
    </ThemeContext>
  );
}
