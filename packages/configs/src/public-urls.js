// Port the Next.js dev/start server listens on (see apps/web/scripts/next.mjs).
export const DEV_SERVER_PORT = 3002;

/*
 * The site's host per environment, without a protocol. Every app in the
 * workspace (the Next.js site, a browser extension, scripts) derives its links
 * from here, so pointing the template at a real domain is a one-line change.
 */
export const siteBaseUrls = {
  dev: `localhost:${DEV_SERVER_PORT}`,
  prod: 'example.com',
};

// `process.env.NODE_ENV` is inlined by Next.js and Vite alike, so this stays
// safe to import from browser bundles.
// eslint-disable-next-line no-restricted-properties, node/prefer-global/process
const isDev = process.env.NODE_ENV === 'development';

export function getSiteBaseUrl() {
  return siteBaseUrls[isDev ? 'dev' : 'prod'];
}
