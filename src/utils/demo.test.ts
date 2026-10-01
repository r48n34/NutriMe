import { describe, expect, it } from "vitest";
import { DEFAULT_PROFILE, MEALS, PRODUCTS, WORKOUTS } from "../data/fixtures";
import type { Profile } from "../types";
import { coachResponse } from "./coach";
import { shiftDate, todayInHongKong, weekDates } from "./dates";
import {
  cartTotal,
  compatibleMeals,
  compatibleWorkouts,
  completion,
  consistentDays,
  generatePlan,
  recommendedProducts,
} from "./plan";
import { createSeedState, demoReducer } from "./state";
import { readState, STORAGE_KEY, validState, writeState } from "./storage";

const today = "2026-10-01";
describe("personalized recommendations", () => {
  for (const diet of ["omnivore", "vegetarian", "dairy-free"] as const) {
    for (const minutes of [10, 20, 30] as const) {
      for (const equipment of ["none", "bands", "dumbbells"] as const) {
        for (const level of ["beginner", "regular"] as const) {
          it(`respects ${diet}, ${minutes} minutes, ${equipment} and ${level}`, () => {
            const profile: Profile = { ...DEFAULT_PROFILE, diet, minutes, equipment, level };
            const plan = generatePlan(today, profile);
            expect(plan.tasks).toHaveLength(5);
            for (const task of plan.tasks.slice(0, 3))
              expect(MEALS.find((meal) => meal.id === task.reference)!.diets).toContain(diet);
            const workout = WORKOUTS.find((workout) => workout.id === plan.tasks[3]!.reference)!;
            expect(workout.minutes).toBeLessThanOrEqual(minutes);
            expect(workout.equipment).toBe(equipment);
            expect(workout.level).toBe(level);
            expect(compatibleMeals(profile, "lunch").length).toBeGreaterThan(1);
            expect(
              compatibleWorkouts(profile).every(
                (item) =>
                  item.minutes <= minutes &&
                  (item.equipment === "none" || item.equipment === equipment) &&
                  (item.level === "beginner" || level === "regular"),
              ),
            ).toBe(true);
          });
        }
      }
    }
  }
  it("keeps combined recommendations within the chosen product budget and diet", () => {
    for (const diet of ["omnivore", "vegetarian", "dairy-free"] as const)
      for (const budget of [200, 500, 1000] as const) {
        const picks = recommendedProducts({ ...DEFAULT_PROFILE, diet, budget });
        expect(picks.length).toBeGreaterThan(0);
        expect(picks.every((product) => product.diets.includes(diet))).toBe(true);
        expect(picks.reduce((sum, product) => sum + product.price, 0)).toBeLessThanOrEqual(budget);
      }
  });
});
describe("connected demo state", () => {
  it("starts with sample history and updates completion on the same plan", () => {
    const seed = createSeedState(today);
    expect(completion(seed.plans[today]!)).toBe(2);
    expect(consistentDays(seed, today)).toBe(6);
    const state = demoReducer(seed, { type: "TOGGLE", date: today, taskId: "movement" });
    expect(completion(state.plans[today]!)).toBe(3);
    expect(consistentDays(state, today)).toBe(7);
    expect(completion(seed.plans[today]!)).toBe(2);
  });
  it("refreshes today, preserves earlier history and removes incompatible cart items", () => {
    const seed = createSeedState(today);
    seed.cart = [
      { productId: "daily-pack", quantity: 1 },
      { productId: "bottle", quantity: 2 },
    ];
    const tomorrow = shiftDate(today, 1);
    seed.plans[tomorrow] = generatePlan(tomorrow, DEFAULT_PROFILE);
    const profile: Profile = {
      ...DEFAULT_PROFILE,
      name: "Sam",
      diet: "vegetarian",
      minutes: 10,
      equipment: "bands",
    };
    const state = demoReducer(seed, { type: "PROFILE", profile, today });
    expect(state.profile).toEqual(profile);
    expect(completion(state.plans[today]!)).toBe(0);
    expect(state.plans[shiftDate(today, -1)]).toEqual(seed.plans[shiftDate(today, -1)]);
    expect(state.cart).toEqual([{ productId: "bottle", quantity: 2 }]);
    expect(state.plans[today]!.tasks[3]!.reference).toBe("beginner-bands-10");
    expect(state.plans[tomorrow]!.tasks[3]!.reference).toBe("beginner-bands-10");
  });
  it("rejects incompatible swaps and resets only the changed meal completion", () => {
    const seed = createSeedState(today);
    seed.profile.diet = "vegetarian";
    expect(
      demoReducer(seed, { type: "MEAL", date: today, slot: "lunch", mealId: "chicken-rice" }),
    ).toBe(seed);
    const changed = demoReducer(seed, {
      type: "MEAL",
      date: today,
      slot: "lunch",
      mealId: "tofu-rice",
    });
    expect(changed.plans[today]!.tasks[1]!.reference).toBe("tofu-rice");
    expect(changed.plans[today]!.tasks[1]!.complete).toBe(false);
    expect(changed.plans[today]!.tasks[0]).toEqual(seed.plans[today]!.tasks[0]);
    expect(
      demoReducer(seed, { type: "WORKOUT", date: today, workoutId: "regular-dumbbells-30" }),
    ).toBe(seed);
  });
  it("creates a snapshot order, clears the bag and ignores empty checkout", () => {
    let state = createSeedState(today);
    state = demoReducer(state, { type: "CART", productId: "bottle", quantity: 2 });
    state = demoReducer(state, { type: "CART", productId: "plant-protein", quantity: 1 });
    expect(cartTotal(state.cart)).toBe(504);
    state = demoReducer(state, { type: "CHECKOUT", id: "order-1", date: today });
    expect(state.cart).toEqual([]);
    expect(state.orders[0]!.total).toBe(504);
    expect(state.orders[0]!.items).toHaveLength(2);
    expect(demoReducer(state, { type: "CHECKOUT", id: "empty", date: today })).toBe(state);
  });
  it("caps cart quantities, removes zero items and rejects incompatible products", () => {
    let state = createSeedState(today);
    state.profile.diet = "vegetarian";
    expect(demoReducer(state, { type: "CART", productId: "daily-pack", quantity: 1 })).toBe(state);
    state = demoReducer(state, { type: "CART", productId: PRODUCTS[0]!.id, quantity: 15 });
    expect(state.cart[0]!.quantity).toBe(9);
    state = demoReducer(state, { type: "CART", productId: "bottle", quantity: 0 });
    expect(state.cart).toEqual([]);
  });
  it("avoids duplicate booking slots and restores all seed data on reset", () => {
    const booking = { id: "booking-1", date: shiftDate(today, 1), time: "12:30", coach: "Jamie" };
    let state = demoReducer(createSeedState(today), { type: "BOOK", booking });
    state = demoReducer(state, { type: "BOOK", booking: { ...booking, id: "booking-2" } });
    expect(state.bookings).toHaveLength(1);
    state = demoReducer(state, { type: "RESET", today });
    expect(state).toEqual(createSeedState(today));
  });
  it("applies scripted coach suggestions to the same daily plan", () => {
    const seed = createSeedState(today);
    const response = coachResponse("I only have 10 minutes.", seed, today);
    expect(response.action).toBeDefined();
    const updated = demoReducer(seed, response.action!);
    expect(updated.plans[today]!.tasks[3]!.reference).toBe("walk-10");
    expect(updated.profile.minutes).toBe(20);
    const mealResponse = coachResponse("Different lunch please", updated, today);
    expect(mealResponse.action?.type).toBe("MEAL");
    expect(coachResponse("Tell me a joke", updated, today).text).toContain("scripted demo");
  });
});
describe("storage and dates", () => {
  it("round-trips a complete persisted demo", () => {
    const state = createSeedState(today);
    let saved = "";
    expect(
      writeState(
        {
          setItem: (_key, value) => {
            saved = value;
          },
        },
        state,
      ),
    ).toBe(true);
    expect(readState({ getItem: (key) => (key === STORAGE_KEY ? saved : null) }, today)).toEqual(
      state,
    );
    expect(validState(state)).toBe(true);
  });
  it("recovers from invalid JSON, invalid references, outdated versions and unavailable storage", () => {
    const seed = createSeedState(today);
    for (const raw of [
      "{invalid",
      "{}",
      JSON.stringify({ ...seed, version: 2 }),
      JSON.stringify({ ...seed, profile: { ...seed.profile, minutes: 999 } }),
      JSON.stringify({ ...seed, cart: [{ productId: "unknown", quantity: 1 }] }),
    ])
      expect(readState({ getItem: () => raw }, today)).toEqual(seed);
    const broken = createSeedState(today);
    broken.plans[today]!.tasks[0]!.reference = "missing-meal";
    expect(validState(broken)).toBe(false);
    expect(
      readState(
        {
          getItem: () => {
            throw new Error("blocked");
          },
        },
        today,
      ),
    ).toEqual(seed);
    expect(
      writeState(
        {
          setItem: () => {
            throw new Error("quota");
          },
        },
        seed,
      ),
    ).toBe(false);
    expect(writeState(undefined, seed)).toBe(false);
  });
  it("uses Hong Kong midnight and Monday-based weeks across months", () => {
    expect(todayInHongKong(new Date("2026-09-30T17:00:00Z"))).toBe(today);
    expect(shiftDate(today, -1)).toBe("2026-09-30");
    expect(weekDates(today)).toEqual([
      "2026-09-28",
      "2026-09-29",
      "2026-09-30",
      "2026-10-01",
      "2026-10-02",
      "2026-10-03",
      "2026-10-04",
    ]);
  });
});
