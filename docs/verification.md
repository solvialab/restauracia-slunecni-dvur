# Verification

Verified on 8 September 2026 against the production static export, including its GitHub Pages base path.

- Next.js production build and TypeScript checks pass.
- `scripts/validate-build.mjs` validates all 20 localized pages: language attributes, canonical URLs, reciprocal hreflang, one H1, local media/build assets, creator credit and full menu counts.
- All four complete menu routes render 39 dishes with the supplied prices and allergen data.
- Browser layout checks passed at 320, 390, 768 and 1440 pixels. The German reservation heading was adjusted after detecting overflow at 390 pixels.
- Language switching preserves the page and uses localized metadata and content. The custom selector supports keyboard arrows and Escape.
- Gallery filters return the correct image counts. The lightbox supports next/previous keyboard navigation, short visible captions, scroll locking, explicit Tab wrapping, Escape and focus restoration to the originating image.
- The mobile navigation supports Escape, focus restoration and a modal focus trap.
- Starting the silent video transfers keyboard focus to its controls. It pauses when scrolled outside view.
- Google Maps loads only after activation, receives focus, and shows the supplied restaurant location.
- Solvia Lab s.r.o. links to `https://solvialab.tech` with `target="_blank"` and `rel="noopener noreferrer"`.
- No broken loaded images or application console errors were observed in the tested production routes.

Touch-swipe handling and reduced-motion branches were reviewed in code. Physical iOS/Android testing and a measured Lighthouse score were not performed; no unmeasured score is claimed.

Menu source notes: original photos do not give an effective date or all portion/allergen information. Missing values remain absent; no prices or allergens were inferred. Source media remain untouched.
