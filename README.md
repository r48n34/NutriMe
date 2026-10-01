# NutriMe

**Your body, your formula — personalised nutrition delivered monthly.** A responsive public website for NutriMe's C2B (made-to-order) subscription concept, built with React, TypeScript and Vite. The public pages describe a 3-minute AI health assessment, personalised monthly daily tear-packs and the NutriTracker companion app. These services are planned; the connected wellness app remains an exploratory demo.

## Try it locally

Requires Node.js 22.12+ or a compatible newer release and pnpm.

```powershell
pnpm install
pnpm dev
```

Open `http://localhost:5173` for the website. Choose **Open app demo**, or open `http://localhost:5173/app` directly.

The sample profile is Alex: beginner, 20 minutes for movement, no equipment, omnivore and HK$500 monthly product budget. Six days of sample progress make the dashboard useful immediately.

## Take a little tour

1. Explore the website and meet Me, using the supplied mascot artwork.
2. Open the app’s daily health card and try completing a task.
3. Choose **Personalize my plan**. Change your goals, time, food preferences, equipment and budget.
4. Open **Daily plan** to browse the week, inspect recipes, swap compatible meals, try a different workout or follow the recovery ritual.
5. Open **Progress** to see the completion chart and daily activity history update.
6. Explore **Shop**, add a suitable product to your bag and try demo checkout. **View bag** takes you directly to your cart.
7. Visit **Coach**. Prompts can shorten today’s workout, swap lunch, review progress or suggest a wind-down. Try booking a sample session with Jamie.
8. Open **Profile** to review preferences, orders and bookings. Reload to verify your changes persist.
9. Choose **Reset demo** to restore the complete sample experience.

On mobile, bottom navigation provides Home, Plan, Coach, Shop and Profile. Progress is available from the daily dashboard. The checklist, product catalog and assessment stack vertically for comfortable reading on a phone.

## What the demo does

- Selects meals compatible with the chosen dietary preference.
- Selects workouts within the chosen time, fitness level and available equipment.
- Recommends a set of optional products whose combined sample price fits the monthly budget. The full catalog remains browsable, and incompatible dietary products cannot be added.
- Shows a budget notice when a user’s chosen cart exceeds the monthly preference.
- Updates daily completion, seven-day totals and consistency immediately. A consistent day means at least three of five tasks; an incomplete current day does not break the previous-day streak.
- Applying preferences refreshes today and any stored future plans, clearing their checklists. Earlier history is retained. Swapping a meal or workout clears only that task’s completion.
- Stores demo choices under `nutrime-demo-v1` in browser localStorage. Invalid data restores the sample demo; blocked or full storage shows a notice and keeps the current session usable.
- Uses Hong Kong dates and appointment times, HKD prices, bundled fonts, supplied mascot artwork and original SVG food, exercise and product illustrations.

Coaching is scripted, Jamie is fictional, and all products, prices, orders and appointments are illustrative. There is no backend, sign-in, API, payment processing or real delivery. Wellness content is a sample demonstration, not clinical assessment.

## Build and check

```powershell
pnpm lint
pnpm fmt
pnpm fmt:check
pnpm typecheck
pnpm test
pnpm build
pnpm preview
```

The build runs TypeScript checking followed by Vite’s production mode and outputs `dist/`. Preview serves the production build locally, normally at `http://localhost:4173`.

If pnpm is unavailable in a restricted Windows shell, installed commands can be run directly with `node_modules/.bin/<tool>.cmd` (for example `oxlint.cmd`, `oxfmt.cmd --check .`, `tsc.cmd -b`, and `vitest.cmd run`).

## Project structure

- `src/pages/`: website and app screens.
- `src/components/`: shared controls, modal, navigation, mascot image framing and illustrations.
- `src/assets/nutrime-mascot.png`: the supplied mascot sheet, copied unchanged.
- `src/data/`: curated meals, workouts, products and default profile.
- `src/utils/`: recommendation rules, state transitions, storage validation, coaching scripts, dates, totals and tests.
- `src/state/`: React providers and shared hooks.
- `src/styles/`: responsive website, app and feature layouts.

Routes are `/`, `/pricing`, `/app`, `/app/personalize`, `/app/plan`, `/app/shop`, `/app/coach`, `/app/progress` and `/app/profile`. The production build generates matching HTML files; the Vercel configuration and local preview server serve them at these URLs.

## Draft monthly pricing

The homepage lists all plan benefits and includes a grouped feature comparison table, and `/pricing` shows the full proposed plans: Free at HK$0, Plus at HK$238 and Pro at HK$438 per month. Both paid plans include a customised dispenser box containing 30 individual daily tear-packs, printed with the subscriber's name, daily formula and motivational health quotes, delivered to their doorstep every month. Plus includes the proposed AI assessment and NutriTracker intake tracking, habit rewards and certified-nutritionist messaging; Pro adds a monthly 30-minute nutritionist consultation and goal/formula review. Edit `src/data/pricing.ts` for the shared prices, benefits, features and FAQs, and `src/data/nutrition.ts` for the homepage product modules. All paid inclusions are proposals. Buttons preview existing demo features; no subscription or payment is created.

## Search and link previews

`src/data/seo.ts` is the shared source of the NutriMe name, public domain, descriptions and page titles. The canonical domain is `https://nutrime-zeta.vercel.app`; update `SITE.url` when moving to another domain, then rebuild.

- Each page includes a title, description, canonical URL, Open Graph tags and an X/Twitter large-image card. The public 1200 × 630 PNG is `public/social-card.png`, using the existing mascot and branding. These tags supply the name, description and image for Discord and WhatsApp link previews; the apps determine the final layout and may cache earlier previews.
- The homepage and pricing page are rendered to HTML during the build, so their headers, single H1s, section headings, navigation and content are available before JavaScript loads. React hydrates that content to preserve the interactive site.
- Website, webpage and organization JSON-LD identifies NutriMe without claiming a real store, medical service, reviews or social accounts.
- The build generates `dist/robots.txt`, `dist/sitemap.xml` and separate HTML heads for all seven demo routes. The sitemap includes the public homepage and pricing page. Demo screens use `noindex, follow`; robots.txt permits fetching them so crawlers can read that directive.
- `vercel.json` serves the pricing page and each demo route's own HTML, adds an app-level `X-Robots-Tag`, and normalizes trailing slashes. Keep those rewrites when deploying instead of rewriting every request to the homepage. On another host, serve `dist/pricing/index.html` for `/pricing` and the matching `dist/app/**/index.html` for each app route, and return 404 for unknown URLs.
- SVG, PNG and Apple touch icons keep the NutriMe display name and branding consistent in tabs and saved links.

The SVG share-card design is in `src/assets/social-card.svg`. To regenerate the PNGs, run `node scripts/generate-social-assets.mjs` with Sharp available, or pass an absolute path to an existing Sharp module as the first argument. Sharp is only an optional artwork tool; normal development and production builds use the included PNGs and do not need it.

The supplied mascot PNG is included directly. `src/data/mascot.ts` defines the waving and resting regions, and CSS frames those regions without altering the original image. The other supplied reference sheets are not shipped. Everything needed to render the site is bundled locally; no external content services are used.
