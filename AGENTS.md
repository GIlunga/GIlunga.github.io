# Astro Micro — Gui's ML Blog

A minimal personal blog built with [Astro](https://astro.build/).

## Quick start

```bash
pnpm install
pnpm dev        # start dev server
pnpm build      # production build
```

## Structure

- `src/content/blog/` — blog posts (Markdown / MDX)
- `src/pages/` — site pages (home, individual posts)
- `src/components/` — reusable components (Header, Footer, etc.)
- `src/consts.ts` — site-wide constants (title, description)

## Notes

- TailwindCSS v4 for styling, Geist fonts for typography.
- Dark/light theme toggles in the header, respects OS preference by default.
- No comments, search, or RSS — kept intentionally minimal.
