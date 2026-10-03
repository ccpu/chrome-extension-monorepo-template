# @internal/configs

Centralized, framework-agnostic configuration shared by every app in the workspace (the browser extension, build scripts).

Plain JavaScript with hand-written `.d.ts` files in `src/`, so build tools can import it without a compile step.

## Entry points

| Import                                | Purpose                                                               |
| ------------------------------------- | --------------------------------------------------------------------- |
| `@internal/configs`                   | `appConfig`: name, description, keywords, locale, URLs, author, theme |
| `@internal/configs/app-config-public` | The same `appConfig`, by its own entry point                          |
| `@internal/configs/public-urls`       | Site host per environment (`siteBaseUrls`, `getSiteBaseUrl`)          |

## Rules

- `appConfig` ships in client bundles: never put secrets in it.
- Keep framework-specific settings in the app that uses them.
- Point the template at your domain by editing `siteBaseUrls.prod` in `src/public-urls.js`.
- The Next.js Cloudflare template ships a larger version of this package (route manifest, env checks, server-only values). When both apps are in one workspace, those modules are added alongside these.
