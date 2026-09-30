// Apply the saved theme before the page paints. next-themes does this with an inline
// script, which the extension content security policy blocks. Keep the storage key,
// class, and 'system' default in sync with ThemeProvider.
(function applyTheme() {
  try {
    const theme = window.localStorage.getItem('theme') || 'system';
    const isDark =
      theme === 'dark' ||
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const root = document.documentElement;
    root.classList.add(isDark ? 'dark' : 'light');
    root.style.colorScheme = isDark ? 'dark' : 'light';
  } catch {
    // Storage can be unavailable; ThemeProvider applies the theme once React mounts.
  }
})();
