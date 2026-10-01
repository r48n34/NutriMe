import type { DemoState, Profile } from "../types";
import { MEALS, PRODUCTS, WORKOUTS } from "../data/fixtures";
import { createSeedState } from "./state";
export const STORAGE_KEY = "nutrime-demo-v1";
const object = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === "object" && !Array.isArray(value);
const date = (value: unknown) =>
  typeof value === "string" &&
  /^\d{4}-\d{2}-\d{2}$/.test(value) &&
  !Number.isNaN(new Date(`${value}T12:00:00Z`).getTime());
const text = (value: unknown) => typeof value === "string";
export function validProfile(value: unknown): value is Profile {
  return (
    object(value) &&
    text(value.name) &&
    (value.name as string).trim().length > 0 &&
    ["energy", "consistency", "strength"].includes(value.goal as string) &&
    [10, 20, 30].includes(value.minutes as number) &&
    ["omnivore", "vegetarian", "dairy-free"].includes(value.diet as string) &&
    ["beginner", "regular"].includes(value.level as string) &&
    ["none", "bands", "dumbbells"].includes(value.equipment as string) &&
    [200, 500, 1000].includes(value.budget as number)
  );
}
const validCart = (items: unknown) =>
  Array.isArray(items) &&
  items.every(
    (item) =>
      object(item) &&
      PRODUCTS.some((product) => product.id === item.productId) &&
      Number.isInteger(item.quantity) &&
      (item.quantity as number) >= 1 &&
      (item.quantity as number) <= 9,
  );
export function validState(value: unknown): value is DemoState {
  if (
    !object(value) ||
    value.version !== 1 ||
    !validProfile(value.profile) ||
    !object(value.plans) ||
    !validCart(value.cart)
  )
    return false;
  const plansValid = Object.entries(value.plans).every(
    ([key, plan]) =>
      date(key) &&
      object(plan) &&
      plan.date === key &&
      Array.isArray(plan.tasks) &&
      plan.tasks.length === 5 &&
      new Set(plan.tasks.map((task) => object(task) && task.id)).size === 5 &&
      plan.tasks.every(
        (task) =>
          object(task) &&
          ["breakfast", "lunch", "dinner", "movement", "recovery"].includes(task.id as string) &&
          text(task.title) &&
          text(task.subtitle) &&
          typeof task.complete === "boolean" &&
          (task.id === "recovery" ||
            (task.id === "movement"
              ? WORKOUTS.some((workout) => workout.id === task.reference)
              : MEALS.some((meal) => meal.id === task.reference && meal.slot === task.id))),
      ),
  );
  return (
    plansValid &&
    Array.isArray(value.orders) &&
    value.orders.every(
      (order) =>
        object(order) &&
        text(order.id) &&
        date(order.date) &&
        validCart(order.items) &&
        typeof order.total === "number" &&
        Number.isFinite(order.total) &&
        order.total >= 0,
    ) &&
    Array.isArray(value.bookings) &&
    value.bookings.every(
      (booking) =>
        object(booking) &&
        text(booking.id) &&
        date(booking.date) &&
        text(booking.time) &&
        text(booking.coach),
    ) &&
    Array.isArray(value.messages) &&
    value.messages.every(
      (message) =>
        object(message) &&
        text(message.id) &&
        ["coach", "user"].includes(message.role as string) &&
        text(message.text),
    )
  );
}
export function readState(storage: Pick<Storage, "getItem"> | undefined, today: string): DemoState {
  try {
    const raw = storage?.getItem(STORAGE_KEY);
    if (raw) {
      const parsed: unknown = JSON.parse(raw);
      if (validState(parsed)) return parsed;
    }
  } catch {
    /* The local demo also works without browser storage. */
  }
  return createSeedState(today);
}
export function writeState(storage: Pick<Storage, "setItem"> | undefined, state: DemoState) {
  try {
    storage?.setItem(STORAGE_KEY, JSON.stringify(state));
    return !!storage;
  } catch {
    return false;
  }
}
