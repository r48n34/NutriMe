# NutriMe

**A healthier you, made simpler.** A responsive public website and connected wellness app demo for everyday Hong Kong life, built with React, TypeScript and Vite.

## Try it locally

Requires Node.js 22.12+ or a compatible newer release and pnpm.

```powershell
pnpm install
pnpm dev
```

Open `http://localhost:5173` for the website. Choose **Explore the app**, or open `http://localhost:5173/app` directly.

The sample profile is Alex: beginner, 20 minutes for movement, no equipment, omnivore and HK$500 monthly product budget. Six days of sample progress make the dashboard useful immediately.

## Take a little tour

1. Explore the website and meet the original SVG mascot, Me.
2. Open the app’s daily health card and try completing a task.
3. Choose **Make it more you**. Change your goals, time, food preferences, equipment and budget.
4. Open **My plan** to browse the week, inspect recipes, swap compatible meals, try a different workout or follow the recovery ritual.
5. Open **My progress** to see the completion chart and daily activity history update.
6. Explore **The good stuff**, add a suitable product to your bag and try demo checkout.
7. Visit **My coach**. Prompts can shorten today’s workout, swap lunch, review progress or suggest a wind-down. Try booking a sample session with Jamie.
8. Open **About me** to review preferences, orders and bookings. Reload to verify your changes persist.
9. Choose **Reset demo** to restore the complete sample experience.

On mobile, bottom navigation provides Day, Plan, Coach, Shop and Me. Progress is available from the daily dashboard.

## What the demo does

- Selects meals compatible with the chosen dietary preference.
- Selects workouts within the chosen time, fitness level and available equipment.
- Recommends a set of optional products whose combined sample price fits the monthly budget. The full catalog remains browsable, and incompatible dietary products cannot be added.
- Shows a budget notice when a user’s chosen cart exceeds the monthly preference.
- Updates daily completion, seven-day totals and consistency immediately. A consistent day means at least three of five tasks; an incomplete current day does not break the previous-day streak.
- Applying preferences refreshes today and any stored future plans, clearing their checklists. Earlier history is retained. Swapping a meal or workout clears only that task’s completion.
- Stores demo choices under `nutrime-demo-v1` in browser localStorage. Invalid data restores the sample demo; blocked or full storage shows a notice and keeps the current session usable.
- Uses Hong Kong dates and appointment times, HKD prices, bundled fonts and original code-based SVG illustrations.

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
- `src/components/`: shared controls, modal, navigation, original mascot and illustrations.
- `src/data/`: curated meals, workouts, products and default profile.
- `src/utils/`: recommendation rules, state transitions, storage validation, coaching scripts, dates, totals and tests.
- `src/state/`: React providers and shared hooks.
- `src/styles/`: responsive website, app and feature layouts.

Routes are `/`, `/app`, `/app/personalize`, `/app/plan`, `/app/shop`, `/app/coach`, `/app/progress` and `/app/profile`. A later static hosting setup should rewrite these SPA routes to `index.html`.

No supplied reference images are included in the runtime assets. Everything needed to render the site is bundled locally; no external content services are used.
