import { describe, expect, it } from "vitest";
import { SEO_PAGES, SITE } from "../data/seo";
import { renderHomepage } from "../prerender";
import { getPageSeo, getStructuredData, renderRobots, renderSeoHead, renderSitemap } from "./seo";

describe("search and sharing metadata", () => {
  it("indexes the public site and keeps sample personal screens out of search", () => {
    expect(getPageSeo("/").robots).toContain("index, follow");
    for (const path of Object.keys(SEO_PAGES).filter((path) => path !== "/")) {
      expect(getPageSeo(path).robots).toBe("noindex, follow");
    }
    expect(getPageSeo("/missing").robots).toBe("noindex, follow");
    expect(getPageSeo("/missing").canonical).toBeUndefined();
  });

  it("uses clean public canonical URLs regardless of tracking parameters or fragments", () => {
    expect(getPageSeo("/?utm_source=whatsapp#how").canonical).toBe(`${SITE.url}/`);
    expect(getPageSeo("/app/plan/?utm_source=discord#meals").canonical).toBe(
      `${SITE.url}/app/plan`,
    );
  });

  it("ships complete preview metadata without JavaScript and escapes titles in HTML", () => {
    const html = renderSeoHead("/");
    expect(html).toContain("movement &amp; wellbeing</title>");
    expect(html).toContain('property="og:site_name" content="NutriMe"');
    expect(html).toContain(`property="og:image" content="${SITE.url}/social-card.png"`);
    expect(html).toContain('property="og:image:type" content="image/png"');
    expect(html).toContain('property="og:image:width" content="1200"');
    expect(html).toContain('property="og:image:height" content="630"');
    expect(html).toContain('name="twitter:card" content="summary_large_image"');
    expect(renderSeoHead("/app/shop")).toContain("NutriMe&#39;s sample catalog");
  });

  it("identifies the actual website without advertising fake products or business details", () => {
    const data = getStructuredData("/")!;
    expect(data["@graph"].map((item) => item["@type"])).toEqual([
      "Organization",
      "WebSite",
      "WebPage",
    ]);
    expect(data["@graph"].every((item) => item.url === `${SITE.url}/`)).toBe(true);
    expect(getStructuredData("/app/profile")).toBeUndefined();
  });

  it("lists only indexable URLs while allowing crawlers to read noindex app pages", () => {
    expect(renderSitemap()).toContain(`<loc>${SITE.url}/</loc>`);
    expect(renderSitemap()).not.toContain("/app");
    expect(renderRobots()).toContain(`Sitemap: ${SITE.url}/sitemap.xml`);
    expect(renderRobots()).not.toContain("Disallow: /app");
  });

  it("makes the homepage headings and navigation readable before the client runs", () => {
    const html = renderHomepage();
    expect(html.match(/<h1>/g)).toHaveLength(1);
    expect(html).toContain("A healthier you.");
    expect(html).toContain('<main id="main">');
    expect(html).toContain('href="/app"');
    expect(html).not.toContain("Good morning, Alex");
  });
});
