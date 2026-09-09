# Restaurace Sluneční Dvůr

Custom restaurant website built with Next.js 16 App Router, TypeScript, Tailwind CSS, Motion and next-intl. Czech is the default language; German, English and Slovak have complete authored translations.

## Development

Requires Node.js 22+ and pnpm.

```sh
pnpm install
node scripts/prepare-media.mjs
pnpm dev
```

Open `http://localhost:3000/cs/`.

```sh
pnpm typecheck
pnpm build
```

The production build is a portable static export in `out/`. Deploy that directory to a static host with directory-index support. `/` redirects to `/cs/`. No database, account, API key or server process is needed for the deployed site.

`pnpm start` serves the production export locally on port 3001, including byte-range support for video. Set `NEXT_PUBLIC_BASE_PATH` when previewing a build made for a subdirectory.

## GitHub Pages

Public source: https://github.com/solvialab/restauracia-slunecni-dvur

Website: https://solvialab.github.io/restauracia-slunecni-dvur/

`.github/workflows/deploy.yml` builds, validates and deploys the site on every push to `main`. GitHub Pages must use **GitHub Actions** as its publishing source. The workflow sets the canonical origin and `/restauracia-slunecni-dvur` base path; images, video, source-menu links, metadata and locale navigation all support this subdirectory. Do not set a custom domain in the workflow unless configuring the corresponding domain in Pages.

The footer credits **Solvia Lab s.r.o.** and opens https://solvialab.tech in a new tab. Gallery captions are short, while image alternative text remains descriptive for accessibility.

## Editing content

- `config/restaurant.ts`: phone, social profiles, address, opening hours, map links and canonical origin. Also contains the Gut Sonnenhof accommodation link and the separate recruitment phone, salary and `careers.enabled` flag. Set that flag to `false` and rebuild when the vacancy is filled. Set `NEXT_PUBLIC_SITE_URL` before building for a different domain.
- `content/translations/{cs,de,en,sk}.json`: navigation, page copy, metadata, accessibility labels and photo descriptions. Keep keys consistent across all four files.
- `content/menu/data.json`: 39 dishes transcribed from the two supplied menu photographs. Localized names/descriptions, categories, weights, prices, allergens and availability stay together. `null` allergens mean not specified in the source, not allergen-free. The unusual children's cheese allergen list is preserved exactly as supplied.
- `content/menu/index.ts`: category ordering, homepage selections and disabled daily offer. To publish a daily offer, supply all translations, actual dates and dishes, set `enabled: true`, then rebuild. Rebuild when offer content changes. Configured start and expiry dates are checked in the visitor’s browser in Europe/Prague time, including while the page remains open.
- `config/media.ts`: curated media, dimensions, manual focal points, video and gallery categories. Descriptions are in the translation files.

Source photographs and videos in `public/media/` are untouched. `scripts/prepare-media.mjs` creates WebP variants at six widths. A custom `next/image` loader selects these variants so image optimization works on a static host. Re-run preparation after adding photography; the build does this automatically. The evening-video poster is a frame extracted from the supplied clip. No generated or external stock photographs are used.

The supplied drone master `public/media/upravene.mp4` stays unchanged locally (272 MB) and is excluded from Git. The web uses silent 1080p and 720p H.264 copies, gently accelerated to 1.2× (91 seconds), plus a real frame at source 51 seconds as its poster. Both videos have `faststart` metadata and remain below the static host's per-file limit. `scripts/finalize-export.mjs` removes only the generated export's copy of the large master; always deploy the result of `pnpm build`. The smaller original-free Git checkout builds normally without the master or FFmpeg.

## Routes and interactions

Each of `/cs`, `/de`, `/en`, `/sk` contains a homepage, `/jidelnilistek`, `/galerie`, `/soukromi` and `/cookies`. Language selection preserves the current route and anchor. Canonical URLs, hreflang, OpenGraph, Twitter metadata, sitemap and restaurant JSON-LD are generated from centralized content.

The homepage presents family celebrations, birthdays and events, links to accommodation at Gut Sonnenhof, and connects the kitchen story to the restaurant's own vegetable garden. The recruitment section reproduces the supplied ad's salary and conditions as translated HTML; the full original poster remains available. The vacancy's contact is distinct from the restaurant reservation number.

The gallery arranges 22 curated photographs into four consistent groups: food, celebrations, courtyard/interior and homegrown produce. The `#food`, `#events`, `#place` and `#garden` anchors open the matching selection. Collage thumbnails preserve the complete supplied image. The native-modal lightbox supports arrows, Escape, touch swipes, adjacent-image preloading, scroll locking and focus restoration. The mobile menu uses a native modal focus trap. The branded opening animation appears once per tab and is disabled for reduced motion. Decorative suns, arrows and close controls use SVG instead of OS-dependent text glyphs.

The aerial film introduces the atmosphere section. It loads only after activation, selects the 720p version on viewports up to 900px, preserves the complete 16:9 frame and uses native controls with inline iPhone playback. It pauses offscreen or in a hidden tab, with retry and direct-file fallback on load failure. The terrace video also downloads only after the visitor starts it and pauses when it leaves view. Google Maps loads only after an explicit click. Contact and reservation actions use the supplied phone number and social links. There is no analytics or advertising integration.

## Content limitations

The supplied menu has no effective date and does not list allergens or portion sizes for every dish. Availability is therefore accompanied by a brief staff-confirmation note. Email, invented history, reviews, awards, capacity, delivery and unverified services are omitted. Verify menu changes with the restaurant before public use.

The initial Sites publication is a private preview. Its access can be changed separately when the restaurant is ready to publish publicly.
