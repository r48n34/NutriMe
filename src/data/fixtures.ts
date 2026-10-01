import type { Meal, Product, Profile, Workout } from "../types";

export const DEFAULT_PROFILE: Profile = {
  name: "Alex",
  goal: "energy",
  minutes: 20,
  diet: "omnivore",
  level: "beginner",
  equipment: "none",
  budget: 500,
};

const allDiets = ["omnivore", "vegetarian", "dairy-free"] as const;
export const MEALS: Meal[] = [
  {
    id: "yogurt",
    name: "Berry good yogurt bowl",
    slot: "breakfast",
    diets: ["omnivore", "vegetarian"],
    minutes: 5,
    art: "yogurt",
    color: "#f0e4da",
    description: "A little crunch, a little sweetness. An easy start to your morning.",
    ingredients: ["Plain Greek yogurt", "A handful of berries", "Rolled oats", "Pumpkin seeds"],
    steps: [
      "Spoon yogurt into your favourite bowl.",
      "Top with berries, oats and a sprinkle of seeds.",
      "Enjoy slowly, with a glass of water.",
    ],
  },
  {
    id: "oats",
    name: "Banana overnight oats",
    slot: "breakfast",
    diets: [...allDiets],
    minutes: 5,
    art: "oats",
    color: "#f1ead8",
    description: "Make tomorrow morning easier with this cosy, plant-based bowl.",
    ingredients: ["Rolled oats", "Unsweetened oat milk", "Banana", "Chia seeds"],
    steps: [
      "Combine oats, oat milk and chia seeds.",
      "Leave covered in the fridge overnight.",
      "Add sliced banana before serving.",
    ],
  },
  {
    id: "congee",
    name: "Ginger & mushroom congee",
    slot: "breakfast",
    diets: [...allDiets],
    minutes: 25,
    art: "congee",
    color: "#e5eddb",
    description: "A familiar Hong Kong morning, with mushrooms and fresh ginger.",
    ingredients: ["Rice", "Mushrooms", "Fresh ginger", "Spring onion"],
    steps: [
      "Simmer rice in water until soft.",
      "Add sliced mushrooms and ginger.",
      "Finish with spring onion and serve warm.",
    ],
  },
  {
    id: "chicken-rice",
    name: "Ginger chicken rice bowl",
    slot: "lunch",
    diets: ["omnivore", "dairy-free"],
    minutes: 20,
    art: "chicken",
    color: "#e9eddc",
    description: "Your lunch break, reimagined. Ginger chicken, brown rice and plenty of greens.",
    ingredients: ["Chicken breast", "Brown rice", "Pak choi", "Ginger and light soy sauce"],
    steps: [
      "Cook rice according to the packet.",
      "Pan-cook sliced chicken with ginger until fully cooked.",
      "Steam pak choi and arrange everything in a bowl.",
    ],
  },
  {
    id: "tofu-rice",
    name: "Sesame tofu rice bowl",
    slot: "lunch",
    diets: [...allDiets],
    minutes: 15,
    art: "tofu",
    color: "#e1ebd7",
    description: "Golden tofu, crisp vegetables and a sesame finish.",
    ingredients: ["Firm tofu", "Brown rice", "Edamame and cucumber", "Sesame seeds"],
    steps: [
      "Pan-sear tofu until golden.",
      "Prepare rice and edamame.",
      "Assemble with cucumber and a sprinkle of sesame.",
    ],
  },
  {
    id: "lunch-noodles",
    name: "Rainbow soba salad",
    slot: "lunch",
    diets: [...allDiets],
    minutes: 15,
    art: "noodles",
    color: "#eae3d8",
    description: "A colourful lunch you can pack before heading to the office.",
    ingredients: ["Soba noodles", "Carrot and cucumber", "Edamame", "Lime and sesame dressing"],
    steps: [
      "Cook and rinse the noodles.",
      "Slice vegetables into thin strips.",
      "Toss together with edamame and dressing.",
    ],
  },
  {
    id: "salmon",
    name: "Salmon & garden greens",
    slot: "dinner",
    diets: ["omnivore", "dairy-free"],
    minutes: 25,
    art: "salmon",
    color: "#dce8dd",
    description: "A simple dinner worth coming home to. Salmon, greens and lemon.",
    ingredients: ["Salmon fillet", "Broccoli and leafy greens", "Sweet potato", "Lemon"],
    steps: [
      "Roast sweet potato pieces until tender.",
      "Bake salmon until fully cooked.",
      "Steam the greens and serve with a squeeze of lemon.",
    ],
  },
  {
    id: "dinner-tofu",
    name: "Five-colour tofu bowl",
    slot: "dinner",
    diets: [...allDiets],
    minutes: 20,
    art: "tofu",
    color: "#e8e8d6",
    description: "A satisfying plant-based bowl with plenty of colour.",
    ingredients: ["Tofu", "Quinoa", "Roasted pumpkin", "Spinach and cherry tomatoes"],
    steps: [
      "Cook quinoa and roast pumpkin.",
      "Pan-sear cubed tofu.",
      "Combine with spinach and tomatoes.",
    ],
  },
  {
    id: "dinner-noodles",
    name: "Mushroom noodle soup",
    slot: "dinner",
    diets: [...allDiets],
    minutes: 15,
    art: "noodles",
    color: "#eee5db",
    description: "A warm, comforting bowl for winding down after a busy day.",
    ingredients: ["Rice noodles", "Mushrooms", "Pak choi", "Vegetable broth"],
    steps: [
      "Bring vegetable broth to a simmer.",
      "Add mushrooms, noodles and pak choi.",
      "Serve when the noodles and vegetables are tender.",
    ],
  },
];

export const WORKOUTS: Workout[] = [
  ...([10, 20, 30] as const).flatMap((minutes) =>
    (["beginner", "regular"] as const).flatMap((level) =>
      (["none", "bands", "dumbbells"] as const).map((equipment) => ({
        id: `${level}-${equipment}-${minutes}`,
        minutes,
        level,
        equipment,
        name:
          equipment === "none"
            ? level === "beginner"
              ? "Your feel-good flow"
              : "Everyday strength flow"
            : equipment === "bands"
              ? "Small bands, big energy"
              : "At-home strength session",
        description: `${minutes} minutes, at your own pace. ${equipment === "none" ? "A little space is all you need." : `Bring your ${equipment} and a little motivation.`}`,
        steps: [
          "Warm up with gentle marching and shoulder circles.",
          equipment === "none"
            ? "Alternate comfortable squats, wall push-ups and standing reaches."
            : equipment === "bands"
              ? "Alternate light band rows, standing presses and comfortable squats."
              : "Alternate light dumbbell rows, presses and comfortable squats.",
          "Take breaks whenever you need them.",
          "Finish with easy walking and relaxed breathing.",
        ],
      })),
    ),
  ),
  ...([10, 20, 30] as const).map((minutes) => ({
    id: `walk-${minutes}`,
    name: "A little neighbourhood walk",
    minutes,
    level: "beginner" as const,
    equipment: "none" as const,
    description: "Step outside, find your pace, and notice something new along the way.",
    steps: [
      "Choose a familiar, comfortable route.",
      "Walk at a pace where you can still talk easily.",
      "Pause for water and return feeling refreshed.",
    ],
  })),
];

export const PRODUCTS: Product[] = [
  {
    id: "bottle",
    name: "Everyday water bottle",
    category: "ROUTINE ESSENTIAL",
    price: 128,
    diets: [...allDiets],
    color: "#deeee1",
    art: "bottle",
    subtitle: "600 ml · made to go with you",
    description:
      "A reusable stainless steel bottle with a comfortable carry loop. Keep a small daily habit close at hand.",
    reason: "A practical companion for your daily movement and meals.",
  },
  {
    id: "bands",
    name: "Move with Me bands",
    category: "MOVEMENT",
    price: 168,
    diets: [...allDiets],
    color: "#eee6d9",
    art: "bands",
    subtitle: "3 resistance levels · carry pouch",
    description:
      "Three lightweight resistance bands to make home movement a little easier to start.",
    reason: "Works with your resistance-band workout plan.",
  },
  {
    id: "plant-protein",
    name: "Plant-powered blend",
    category: "OPTIONAL NUTRITION",
    price: 248,
    diets: [...allDiets],
    color: "#e4ebd8",
    art: "tub",
    subtitle: "Pea & rice blend · vanilla · 400 g",
    description:
      "An illustrative plant-based protein product. Explore the sample ingredients and price as part of the shopping demo. Food comes first; additions are optional.",
    reason: "A plant-based, dairy-free option that fits your selected preferences.",
  },
  {
    id: "daily-pack",
    name: "Your daily essentials pack",
    category: "OPTIONAL DAILY PACK",
    price: 328,
    diets: ["omnivore"],
    color: "#e1eee7",
    art: "pack",
    subtitle: "30 sample sachets · one simple routine",
    description:
      "A fictional wellness pack used to demonstrate personalized shopping. Contents are illustrative and are not a supplement prescription.",
    reason: "An optional routine pack within your selected monthly budget.",
  },
];

export const GOAL_LABELS = {
  energy: "Feel more energised",
  consistency: "Build a steady routine",
  strength: "Feel a little stronger",
};
export const DIET_LABELS = {
  omnivore: "Everything in balance",
  vegetarian: "Vegetarian",
  "dairy-free": "Dairy-free",
};
export const EQUIPMENT_LABELS = {
  none: "Just me",
  bands: "Resistance bands",
  dumbbells: "Dumbbells",
};
