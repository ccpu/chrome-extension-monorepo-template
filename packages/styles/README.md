# @internal/styles

The shared Tailwind entry point: theme tokens, dark mode, base styles and the `@source` list of every file Tailwind scans.

- Import it once per app: `@import '@internal/styles';` in CSS, or `import '@internal/styles';` in TS.
- Reference it from CSS modules that use `@apply` or theme values: `@reference '@internal/styles';`.

`@source` paths are relative to `src/globals.css`. When you add an app or a package that renders Tailwind classes, add its path to the list.
