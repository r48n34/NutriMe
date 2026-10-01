export const SITE = {
  name: "NutriMe",
  url: "https://nutrime-zeta.vercel.app",
  language: "en-HK",
  locale: "en_HK",
  description:
    "Your body, your formula. Discover NutriMe's personalised nutrition subscription concept: AI assessment, 30 daily tear-packs delivered monthly and NutriTracker support.",
  image: "/social-card.png",
  imageAlt: "NutriMe — Your body, your formula. Personalised nutrition delivered monthly.",
} as const;

export const SEO_PAGES: Record<string, { title: string; description: string; index: boolean }> = {
  "/": {
    title: "NutriMe — Personalised nutrition delivered monthly",
    description: SITE.description,
    index: true,
  },
  "/pricing": {
    title: "Free, Plus & Pro monthly plans | NutriMe pricing",
    description:
      "Compare NutriMe's proposed Free, Plus and Pro plans. Plus at HK$238 and Pro at HK$438 include personalised daily packs, monthly delivery and NutriTracker. Pro adds nutritionist consultations.",
    index: true,
  },
  "/app": {
    title: "My day | NutriMe demo",
    description:
      "Explore the NutriMe demo: a daily plan of meal ideas, movement and recovery, with little wins to tick off at your own pace.",
    index: false,
  },
  "/app/personalize": {
    title: "Make it yours | NutriMe demo",
    description:
      "Try personalizing your NutriMe demo plan around your goals, schedule, food preferences, equipment and budget.",
    index: false,
  },
  "/app/plan": {
    title: "My plan | NutriMe demo",
    description:
      "Browse a sample week of meals, manageable workouts and simple wind-down rituals. Explore a routine that fits your everyday life.",
    index: false,
  },
  "/app/shop": {
    title: "The good stuff | NutriMe demo",
    description:
      "Explore NutriMe's sample catalog of optional wellness extras, with illustrative Hong Kong dollar prices and a demo checkout.",
    index: false,
  },
  "/app/coach": {
    title: "My coach | NutriMe demo",
    description:
      "Try NutriMe's scripted wellness companion for everyday meal ideas, movement and rest, plus a sample coaching appointment.",
    index: false,
  },
  "/app/progress": {
    title: "My progress | NutriMe demo",
    description:
      "Explore sample daily activity and weekly progress in NutriMe. See how small steps can add up to a more consistent routine.",
    index: false,
  },
  "/app/profile": {
    title: "About me | NutriMe demo",
    description:
      "Explore the NutriMe demo profile, with personal preferences, sample orders and bookings saved only in your browser.",
    index: false,
  },
};
