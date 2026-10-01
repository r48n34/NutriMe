import { AssessmentArt, DispenserArt, TrackerArt } from "../components/NutritionIllustrations";
import { ClipboardList, PackageCheck, Smartphone } from "lucide-react";

export const NUTRITION_STEPS = [
  {
    n: "01",
    icon: ClipboardList,
    title: "Tell us about you.",
    text: "A 3-minute intake covers diet, routines, stress and goals.",
  },
  {
    n: "02",
    icon: PackageCheck,
    title: "Receive your formula.",
    text: "Your personalised daily packs arrive every month.",
  },
  {
    n: "03",
    icon: Smartphone,
    title: "Build your daily habit.",
    text: "Check in, earn rewards and ask a nutritionist.",
  },
] as const;

export const NUTRITION_MODULES = [
  {
    title: "AI Health Assessment",
    label: "100% PERSONALISED",
    description: "Your diet, routine, stress and goals shape a personalised nutrient profile.",
    benefit: "A formula tailored to your lifestyle.",
    art: AssessmentArt,
    icon: ClipboardList,
  },
  {
    title: "Personalised Daily Packs",
    label: "LESS CLUTTER",
    description:
      "30 tear-packs with your name, daily formula and a motivational quote. Delivered monthly.",
    benefit: "One dispenser box replaces 4–6 bottles.",
    art: DispenserArt,
    icon: PackageCheck,
  },
  {
    title: "NutriTracker Companion",
    label: "A HABIT THAT FITS",
    description:
      "Track daily intake, earn habit rewards and message certified nutritionists 1-on-1.",
    benefit: "Daily support, wherever life takes you.",
    art: TrackerArt,
    icon: Smartphone,
  },
] as const;
