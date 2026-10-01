import { MEALS, PRODUCTS, WORKOUTS } from "../data/fixtures";
import type { CartItem, DayPlan, DemoState, MealSlot, Profile } from "../types";
import { shiftDate } from "./dates";

export const compatibleMeals = (profile: Profile, slot: MealSlot) =>
  MEALS.filter((meal) => meal.slot === slot && meal.diets.includes(profile.diet));
export const compatibleWorkouts = (profile: Profile) =>
  WORKOUTS.filter(
    (workout) =>
      workout.minutes <= profile.minutes &&
      (workout.level === "beginner" || profile.level === "regular") &&
      (workout.equipment === "none" || workout.equipment === profile.equipment),
  );

export function generatePlan(date: string, profile: Profile): DayPlan {
  const offset = new Date(`${date}T12:00:00Z`).getUTCDate() % 3;
  const workout = WORKOUTS.find(
    (item) =>
      item.minutes === profile.minutes &&
      item.level === profile.level &&
      item.equipment === profile.equipment,
  )!;
  return {
    date,
    tasks: [
      ...(["breakfast", "lunch", "dinner"] as const).map((slot) => {
        const options = compatibleMeals(profile, slot);
        const meal = options[offset % options.length]!;
        return {
          id: slot,
          title: meal.name,
          subtitle: `${slot[0]!.toUpperCase()}${slot.slice(1)} · ${meal.minutes} min`,
          reference: meal.id,
          complete: false,
        };
      }),
      {
        id: "movement",
        title: workout.name,
        subtitle: `${workout.minutes} min · ${profile.equipment === "none" ? "No equipment" : profile.equipment}`,
        reference: workout.id,
        complete: false,
      },
      {
        id: "recovery",
        title: "A softer end to your day",
        subtitle: "10 min · Screen-free wind-down",
        complete: false,
      },
    ],
  };
}

export function recommendedProducts(profile: Profile) {
  let remaining = profile.budget;
  return PRODUCTS.filter(
    (product) =>
      product.diets.includes(profile.diet) &&
      (product.id !== "bands" || profile.equipment === "bands"),
  ).filter((product) => {
    if (product.price > remaining) return false;
    remaining -= product.price;
    return true;
  });
}
export const completion = (plan: DayPlan) => plan.tasks.filter((task) => task.complete).length;
export const cartTotal = (cart: CartItem[]) =>
  cart.reduce(
    (sum, item) =>
      sum + (PRODUCTS.find((product) => product.id === item.productId)?.price ?? 0) * item.quantity,
    0,
  );
export function consistentDays(state: DemoState, today: string) {
  let date =
    completion(state.plans[today] ?? generatePlan(today, state.profile)) >= 3
      ? today
      : shiftDate(today, -1);
  let count = 0;
  while (state.plans[date] && completion(state.plans[date]!) >= 3) {
    count++;
    date = shiftDate(date, -1);
  }
  return count;
}
export const getPlan = (state: DemoState, date: string) =>
  state.plans[date] ?? generatePlan(date, state.profile);
