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

## Content and design extension — 9 September 2026

- Production compilation, TypeScript and the existing 20-page export validation pass after adding celebrations, accommodation, homegrown vegetables and recruitment.
- Additional export checks verify the four new content anchors in every locale, the accommodation URL, distinct recruitment and restaurant phone links, the supplied salary range, and the current 12:00–21:00 hours.
- The gallery contains 22 unique photographs in four groups: food (6), events (5), place (5) and garden (6). Original assets, translated alt text and short captions exist for every entry. Supplied collages use contained thumbnails.
- Reviewed all 20 newly supplied photographs and the recruitment poster. The poster's contact is 775 843 850; restaurant reservations remain +420 733 467 922. No pay period or gross/net salary claim was inferred.
- Source review confirms that gallery filtering and modal indexing use the same ordered list, category hashes open matching selections, and new content has responsive styles. This extension has not had a new browser interaction or visual test pass.

## SVG icons and aerial film — 9 September 2026

- Replaced text suns, menu arrows and close glyphs with decorative SVGs. Export checks verify the SVG suns in all four homepages and the absence of the replaced glyphs. Small icons have explicit dimensions and do not shrink; close buttons retain their 48px touch areas and translated labels.
- The supplied drone master is unchanged at 272,196,652 bytes. Both web copies are 91 seconds at 1.2×, silent H.264 Main/yuv420p/30fps with faststart. Full decoding and representative frame checks passed; 1080p is 20,262,834 bytes and 720p is 11,189,646 bytes.
- Production compilation, TypeScript and all 20-page export checks pass. Homepages include the localized film cover and no initial video element. The generated export excludes the large local master and includes both web copies.
- Source review covers activation-only loading, responsive source selection, native controls with playsInline, offscreen/hidden-tab pausing and retry/fallback behavior. Physical iPhone playback was not tested.
