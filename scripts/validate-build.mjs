import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
const locales = ["cs", "de", "en", "sk"];
const routes = ["", "jidelnilistek/", "galerie/", "soukromi/", "cookies/"];
let checked = 0;
const origin =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://slunecni-dvur.devstoresk.chatgpt.site";
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
for (const locale of locales) {
  for (const route of routes) {
    const html = fs.readFileSync(
      path.join("out", locale, route, "index.html"),
      "utf8",
    );
    assert(html.includes(`<html lang="${locale}"`), `${locale}/${route}: lang`);
    assert.equal(
      (html.match(/<h1[ >]/g) || []).length,
      1,
      `${locale}/${route}: one H1`,
    );
    assert(
      html.includes(`rel="canonical" href="${origin}/${locale}/${route}"`),
      `${locale}/${route}: canonical`,
    );
    for (const language of locales)
      assert(
        html.includes(`hrefLang="${language}"`),
        `${locale}/${route}: hreflang ${language}`,
      );
    assert(
      !html.includes("MISSING_MESSAGE"),
      `${locale}/${route}: translation`,
    );
    if (route === "jidelnilistek/")
      assert.equal(
        (html.match(/class="menu-row /g) || []).length,
        39,
        `${locale}: menu items`,
      );
    assert(
      html.includes("https://solvialab.tech"),
      `${locale}/${route}: creator credit`,
    );
    for (const match of html.matchAll(/(?:src|href)="(\/[^"?]+)"/g)) {
      if (!match[1].includes("/media/") && !match[1].includes("/_next/"))
        continue;
      assert(
        fs.existsSync(
          path.join("out", decodeURIComponent(match[1]).replace(base, "")),
        ),
        `Missing asset: ${match[1]}`,
      );
    }
    checked++;
  }
}
const schemaHtml = fs.readFileSync("out/cs/index.html", "utf8");
const schema = JSON.parse(
  schemaHtml.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1],
);
assert.equal(schema.telephone, "+420 733 467 922");
assert.equal(schema.openingHoursSpecification[0].dayOfWeek.length, 5);
const menu = JSON.parse(fs.readFileSync("content/menu/data.json", "utf8"));
assert.equal(new Set(menu.items.map((i) => i.id)).size, 39);
assert.deepEqual(
  menu.items.find((i) => i.id === "kids-breaded-cheese").allergens,
  [1, 3, 4, 7],
);
assert(menu.items.every((i) => i.price > 0 && locales.every((l) => i.name[l])));
for (const locale of locales) {
  const messages = JSON.parse(
    fs.readFileSync(`content/translations/${locale}.json`, "utf8"),
  );
  assert.equal(messages.menu.allergenLegend.length, 14);
}
console.log(
  `Validated ${checked} localized pages: metadata, hreflang, unique headings, local assets, 39 menu entries, supplied contact details and allergen data.`,
);
