# Chrome Extension Monorepo Template

A template for building Chrome extensions using a monorepo structure with TypeScript, Vite, and more.

## Getting Started

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Build the extension: `pnpm build`
4. Load the extension in Chrome from the `apps/chrome-extension/build` directory

## Structure

- `apps/chrome-extension/`: The main Chrome extension app
- `packages/`: Shared packages (ui, utils, tooling)
- `tooling/`: Configuration for linting, formatting, etc.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## Acknowledgments

This template was originally inspired by [@guocaoyi](https://github.com/guocaoyi)’s [create-chrome-ext](https://github.com/guocaoyi/create-chrome-ext), but has been significantly restructured and enhanced with a new architecture, Tailwind CSS v4 integration, and additional development tools.

It also incorporates [@Toumash](https://github.com/Toumash)’s [chrome-extension-tools](https://github.com/crxjs/chrome-extension-tools), which provides the Vite plugin used for Chrome Extension development.
