export const PRICING_NOTE =
  "Proposed monthly plans. AI formulation, delivery, rewards and certified-nutritionist services are planned; subscriptions are not available yet.";

const MONTHLY_DELIVERY_FEATURES = [
  "Customised dispenser box with 30 individual daily tear-packs, delivered to your doorstep every month",
  "Each pack printed with your name, daily formula and a motivational health quote",
] as const;

export const PRICING_PLANS = [
  {
    name: "Free",
    price: 0,
    benefit: "Explore before subscribing.",
    summary: "Preference questionnaire · Habit-tracking demo",
    features: [
      "Explore the free concept demo",
      "Try the sample preference questionnaire",
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
    features: [
      "3-minute AI health assessment and personalised nutrient profile",
      ...MONTHLY_DELIVERY_FEATURES,
      "NutriTracker: daily intake tracking, habit rewards and 1-on-1 messaging with certified nutritionists",
    ],
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
      "Everything in Plus",
      ...MONTHLY_DELIVERY_FEATURES,
      "One 30-minute certified-nutritionist consultation each month",
      "Monthly goal and formula review",
      "Personal follow-up recommendations",
    ],
    action: "Preview support",
    to: "/app/coach",
    featured: false,
  },
] as const;

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
