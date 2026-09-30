import type { Plugin } from 'vite';
import { crx } from '@crxjs/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { getManifest } from './src/manifest';

/**
 * Load `public/theme-init.js` first in every built page, so the saved theme applies
 * before the first paint. Build only: in dev, CRXJS imports every page script as a
 * module through Vite, which cannot serve `public` files, so `ThemeProvider` applies
 * the theme once React mounts.
 */
function themeInitScript(): Plugin {
  return {
    name: 'theme-init-script',
    apply: 'build',
    transformIndexHtml: () => [
      { tag: 'script', attrs: { src: '/theme-init.js' }, injectTo: 'head-prepend' },
    ],
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    port: 4000,
    strictPort: true,
    hmr: {
      port: 4000,
    },
  },
  build: {
    emptyOutDir: true,
    outDir: 'build',
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/chunk-[hash].js',
      },
    },
  },
  plugins: [
    themeInitScript(),
    tailwindcss(),
    crx({
      manifest: getManifest(mode === 'development'),
      contentScripts: {
        injectCss: true,
      },
    }),
    react(),
  ],
  define: {
    __DEV__: mode === 'development',
    'process.env.NODE_ENV': JSON.stringify(mode),
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
}));
