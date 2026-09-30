'use client';

import type { ComponentProps } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export type ThemeProviderProps = ComponentProps<typeof NextThemesProvider>;

/**
 * Put the `dark` class on <html> for the selected theme, saved in `localStorage`
 * under `theme`, following the system theme until one is picked.
 *
 * Use it in app pages, not in content scripts: there `localStorage` and <html>
 * belong to the website.
 */
export function ThemeProvider(props: ThemeProviderProps) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem {...props} />
  );
}
