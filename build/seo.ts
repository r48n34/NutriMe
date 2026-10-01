import react from "@vitejs/plugin-react";
import { createServer } from "vite";
import type { Plugin } from "vite";
import { SEO_PAGES } from "../src/data/seo.ts";
import { normalizePath, renderRobots, renderSeoHead, renderSitemap } from "../src/utils/seo.ts";

function withSeo(html: string, path: string) {
  return html.replace(
    /<!-- seo:start -->[\s\S]*?<!-- seo:end -->/,
    () => `<!-- seo:start -->\n    ${renderSeoHead(path)}\n    <!-- seo:end -->`,
  );
}

export function seoPlugin(): Plugin {
  let root: string;
  return {
    name: "nutrime-seo",
    enforce: "post",
    configResolved(config) {
      root = config.root;
    },
    transformIndexHtml(html, context) {
      return withSeo(html, context.originalUrl ?? "/");
    },
    configurePreviewServer(server) {
      // Match Vercel's rewrites when verifying direct link previews locally.
      server.middlewares.use((request, _response, next) => {
        const url = new URL(request.url ?? "/", "http://localhost");
        const pathname = normalizePath(url.pathname);
        if (pathname !== "/" && SEO_PAGES[pathname]) {
          request.url = `${pathname}/index.html${url.search}`;
        }
        next();
      });
    },
    async generateBundle(_options, bundle) {
      const index = bundle["index.html"];
      if (!index || index.type !== "asset" || typeof index.source !== "string") {
        throw new Error("SEO build requires an index.html asset.");
      }
      const html = index.source;
      // Social crawlers often do not run JavaScript. Emit a head for each direct app URL.
      for (const path of Object.keys(SEO_PAGES).filter((path) => path !== "/")) {
        this.emitFile({
          type: "asset",
          fileName: `${path.slice(1)}/index.html`,
          source: withSeo(html, path),
        });
      }
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: renderSitemap() });
      this.emitFile({ type: "asset", fileName: "robots.txt", source: renderRobots() });

      // Render the existing homepage, including its headings and links, for search crawlers.
      const server = await createServer({
        root,
        configFile: false,
        plugins: [react()],
        server: { middlewareMode: true, watch: null },
        appType: "custom",
      });
      try {
        const { renderHomepage } = await server.ssrLoadModule("/src/prerender.tsx");
        let homepage: string = renderHomepage();
        // The development SSR loader returns source asset URLs. Use their production filenames.
        for (const asset of Object.values(bundle)) {
          if (asset.type !== "asset") continue;
          for (const original of asset.originalFileNames) {
            homepage = homepage.replaceAll(
              `/${original.replace(/\\/g, "/")}`,
              `/${asset.fileName}`,
            );
          }
        }
        index.source = html.replace(
          '<div id="root"></div>',
          () => `<div id="root" data-prerendered>${homepage}</div>`,
        );
      } finally {
        await server.close();
      }
    },
  };
}
