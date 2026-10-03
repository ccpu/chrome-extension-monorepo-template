/** @typedef {import("./app-config-public").AppConfig} AppConfig */

import { getSiteBaseUrl } from './public-urls.js';

// eslint-disable-next-line no-restricted-properties, node/prefer-global/process
const isDev = process.env.NODE_ENV === 'development';

const siteBaseUrl = getSiteBaseUrl();
const isLocalDevHost = /^(?:localhost|127(?:\.\d{1,3}){3})(?::\d+)?$/u.test(siteBaseUrl);
const siteProtocol = isDev && isLocalDevHost ? 'http' : 'https';
const siteUrl = `${siteProtocol}://${siteBaseUrl}`;

/**
 * Public app configuration shared by every app in the workspace.
 *
 * Keep it framework-agnostic: values here may be read by the Next.js site, a
 * browser extension or a build script alike. Framework-specific settings
 * (robots directives, icons, search-console verification) belong in the app
 * that uses them. This module ships in client bundles, so never add secrets
 * or server-only values here - those go in `server.env.js`.
 * @type {AppConfig}
 */
export const appConfig = {
  isDev,
  name: 'Chrome Extension Monorepo Template',
  description:
    'A modern Chrome extension template built with pnpm monorepo, Turbo, Vite, React, TypeScript, Tailwind CSS, and Vitest.',
  keywords: ['chrome-extension', 'react', 'typescript'],
  locale: 'en-US',
  siteUrl,
  siteBaseUrl,
  ogImage: `${siteUrl}/og.png`,
  security: {
    // Replace with a monitored mailto: URI if you use a dedicated security inbox.
    contact: `${siteUrl}/contact`,
  },
  author: {
    name: 'Author Name',
    email: 'Author Email',
    url: siteUrl,
  },
  theme: {
    enabled: true, // Set to false to disable theme switching
    defaultTheme: 'system', // 'light', 'dark', or 'system'
  },
};

export default appConfig;
