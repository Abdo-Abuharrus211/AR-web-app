# AudioReaper Web App

Astro-based web app bridging PC music libraries and Spotify. **Currently under full overhaul** (Express.js → Astro).

## Development

```bash
cd reaper-reborn
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
npm run astro    # Run Astro CLI directly
```

## Project Structure

- `reaper-reborn/src/pages/` - Astro pages (index, about, 404)
- `reaper-reborn/src/components/` - Astro components (.astro files)
- `reaper-reborn/src/scripts/` - Client-side TypeScript/JS (fileIO, metadata, user auth)
- `reaper-reborn/src/layouts/` - Page layouts
- `reaper-reborn/src/styles/` - CSS stylesheets
- `reaper-reborn/src/assets/` - Static assets
- `reaper-reborn/public/` - Favicons and public static files

## Configuration

- `astro.config.mjs` - Astro config (currently minimal/default)
- `tsconfig.json` - Extends `astro/tsconfigs/strict`

## Task Tracking

See `TODO.md` (in project root) for current overhaul tasks including:
- Modal logic (privacy/terms)
- Client-side auth/session handling
- Responsive navbar/footer
- Color palette updates

## Notes

- TypeScript via `@ts-check` with strict mode
- No testing framework configured
- No linting/formatting tools currently set up
- OAuth2 integration (Spotify) handled via backend (separate service)
