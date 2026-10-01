import { SEO_PAGES, SITE } from "../data/seo.ts";

export function normalizePath(path: string) {
  return path.split(/[?#]/, 1)[0].replace(/\/+$/, "") || "/";
}

export function getPageSeo(path: string) {
  const pathname = normalizePath(path);
  const page = SEO_PAGES[pathname];
  return {
    pathname,
    title: page?.title ?? "Page not found | NutriMe",
    description: page?.description ?? SITE.description,
    robots: page?.index ? "index, follow, max-image-preview:large" : "noindex, follow",
    canonical: page ? new URL(pathname, SITE.url).href : undefined,
    image: new URL(SITE.image, SITE.url).href,
  };
}

export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

export function getStructuredData(path: string) {
  if (normalizePath(path) !== "/") return undefined;
  const url = `${SITE.url}/`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${url}#organization`,
        name: SITE.name,
        url,
        logo: `${SITE.url}/icon-512.png`,
      },
      {
        "@type": "WebSite",
        "@id": `${url}#website`,
        url,
        name: SITE.name,
        alternateName: "nutrime",
        description: SITE.description,
        inLanguage: SITE.language,
        publisher: { "@id": `${url}#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: SEO_PAGES["/"].title,
        description: SITE.description,
        inLanguage: SITE.language,
        isPartOf: { "@id": `${url}#website` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE.url}${SITE.image}`,
          width: 1200,
          height: 630,
        },
      },
    ],
  };
}

// Shared by the HTML build and client navigation so previews and browser metadata agree.
export function renderSeoHead(path: string) {
  const page = getPageSeo(path);
  const meta = (attribute: "name" | "property", name: string, content: string) =>
    `<meta data-seo ${attribute}="${name}" content="${escapeHtml(content)}" />`;
  const tags = [
    `<title data-seo>${escapeHtml(page.title)}</title>`,
    meta("name", "description", page.description),
    meta("name", "robots", page.robots),
    meta("property", "og:type", "website"),
    meta("property", "og:site_name", SITE.name),
    meta("property", "og:locale", SITE.locale),
    meta("property", "og:title", page.title),
    meta("property", "og:description", page.description),
    meta("property", "og:image", page.image),
    meta("property", "og:image:secure_url", page.image),
    meta("property", "og:image:type", "image/png"),
    meta("property", "og:image:width", "1200"),
    meta("property", "og:image:height", "630"),
    meta("property", "og:image:alt", SITE.imageAlt),
    meta("name", "twitter:card", "summary_large_image"),
    meta("name", "twitter:title", page.title),
    meta("name", "twitter:description", page.description),
    meta("name", "twitter:image", page.image),
    meta("name", "twitter:image:alt", SITE.imageAlt),
  ];
  if (page.canonical) {
    tags.push(`<link data-seo rel="canonical" href="${escapeHtml(page.canonical)}" />`);
    tags.push(meta("property", "og:url", page.canonical));
  }
  const structuredData = getStructuredData(path);
  if (structuredData) {
    const json = JSON.stringify(structuredData).replace(/</g, "\\u003c");
    tags.push(`<script data-seo type="application/ld+json">${json}</script>`);
  }
  return tags.join("\n    ");
}

export function renderSitemap() {
  const pages = Object.entries(SEO_PAGES)
    .filter(([, page]) => page.index)
    .map(([path]) => `  <url><loc>${escapeHtml(new URL(path, SITE.url).href)}</loc></url>`);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.join("\n")}\n</urlset>\n`;
}

export function renderRobots() {
  // Crawlers must be allowed to read the app pages to see their noindex directives.
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`;
}
