export const PRICING_NOTE =
  "Proposed monthly plans. AI formulation, delivery, rewards and certified-nutritionist services are planned; subscriptions are not available yet.";

const MONTHLY_DELIVERY_FEATURES = [
  "Customised dispenser box with 30 individual daily tear-packs, delivered to your doorstep every month",
  "Each pack printed with your name, daily formula and a motivational health quote",
] as const;

const PLUS_FEATURES = [
  "3-minute AI health assessment and personalised nutrient profile",
  ...MONTHLY_DELIVERY_FEATURES,
  "NutriTracker: daily intake tracking, habit rewards and 1-on-1 messaging with certified nutritionists",
] as const;

export const PRICING_PLANS = [
  {
    name: "Free",
    price: 0,
    benefit: "Explore before subscribing.",
    summary: "Preference questionnaire · Habit-tracking demo",
    features: [
      "Try the preference questionnaire",
      "Preview daily habit tracking",
      "No monthly dispenser-box delivery",
    ],
    action: "Try the free demo",
    to: "/app",
    featured: false,
  },
  {
    name: "Plus",
    price: 238,
    benefit: "Your personalised daily nutrition.",
    summary: "30 daily packs delivered monthly · NutriTracker access",
    features: PLUS_FEATURES,
    action: "Preview personalized plans",
    to: "/app/personalize",
    featured: true,
  },
  {
    name: "Pro",
    price: 438,
    benefit: "More personal nutritionist support.",
    summary: "30 daily packs delivered monthly · Nutritionist consultations",
    features: [
      ...PLUS_FEATURES,
      "One 30-minute certified-nutritionist consultation each month",
      "Monthly goal and formula review",
      "Personal follow-up recommendations",
    ],
    action: "Preview support",
    to: "/app/coach",
    featured: false,
  },
] as const;

type PlanName = (typeof PRICING_PLANS)[number]["name"];

type ComparisonFeature = {
  label: string;
  plans: Record<PlanName, boolean | string>;
};

export const PRICING_FEATURE_GROUPS: { title: string; features: ComparisonFeature[] }[] = [
  {
    title: "Getting started",
    features: [
      { label: "Preference questionnaire", plans: { Free: true, Plus: true, Pro: true } },
      { label: "Daily habit-tracking demo", plans: { Free: true, Plus: true, Pro: true } },
    ],
  },
  {
    title: "Personalised nutrition & monthly delivery",
    features: [
      { label: "3-minute AI health assessment", plans: { Free: false, Plus: true, Pro: true } },
      { label: "Personalised nutrient profile", plans: { Free: false, Plus: true, Pro: true } },
      { label: "Customised dispenser box", plans: { Free: false, Plus: true, Pro: true } },
      {
        label: "Individual daily tear-packs",
        plans: { Free: false, Plus: "30 per month", Pro: "30 per month" },
      },
      {
        label: "Your name & daily formula printed on every pack",
        plans: { Free: false, Plus: true, Pro: true },
      },
      {
        label: "Motivational health quotes on every pack",
        plans: { Free: false, Plus: true, Pro: true },
      },
      { label: "Monthly doorstep delivery", plans: { Free: false, Plus: true, Pro: true } },
    ],
  },
  {
    title: "NutriTracker & nutritionist support",
    features: [
      { label: "Daily intake tracking", plans: { Free: false, Plus: true, Pro: true } },
      { label: "Habit rewards", plans: { Free: false, Plus: true, Pro: true } },
      {
        label: "1-on-1 messaging with certified nutritionists",
        plans: { Free: false, Plus: true, Pro: true },
      },
      {
        label: "30-minute nutritionist consultation",
        plans: { Free: false, Plus: false, Pro: "1 per month" },
      },
      { label: "Monthly goal & formula review", plans: { Free: false, Plus: false, Pro: true } },
      {
        label: "Personal follow-up recommendations",
        plans: { Free: false, Plus: false, Pro: true },
      },
    ],
  },
];

export const PRICING_FAQS = [
  {
    question: "Can I subscribe now?",
    answer:
      "Not yet. This is a concept preview. AI formulation, deliveries, rewards and certified-nutritionist consultations are planned services.",
  },
  {
    question: "How would billing work?",
    answer:
      "Plus and Pro would be billed monthly in HKD. The proposed plans would let you cancel before your next renewal.",
  },
  {
    question: "What arrives each month?",
    answer:
      "Plus and Pro include one dispenser box with 30 daily tear-packs printed with your name, daily formula and motivational quotes. Doorstep delivery is included; other shop products are separate.",
  },
] as const;
