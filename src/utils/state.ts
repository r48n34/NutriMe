import { DEFAULT_PROFILE, MEALS, PRODUCTS, WORKOUTS } from "../data/fixtures";
import type { DemoAction, DemoState } from "../types";
import { shiftDate } from "./dates";
import { cartTotal, compatibleMeals, compatibleWorkouts, generatePlan, getPlan } from "./plan";

const welcomeText = (name: string) =>
  `Hi ${name}! Small steps count. Pick a prompt below and let’s make your day a little easier.`;

export function createSeedState(today: string): DemoState {
  const plans: DemoState["plans"] = {};
  for (let day = -6; day <= 0; day++) {
    const date = shiftDate(today, day);
    const plan = generatePlan(date, DEFAULT_PROFILE);
    const done = day === 0 ? 2 : [3, 5, 4, 5, 4, 3][day + 6]!;
    plan.tasks = plan.tasks.map((task, index) => ({ ...task, complete: index < done }));
    plans[date] = plan;
  }
  return {
    version: 1,
    profile: { ...DEFAULT_PROFILE },
    plans,
    cart: [],
    orders: [],
    bookings: [],
    messages: [
      {
        id: "welcome",
        role: "coach",
        text: welcomeText(DEFAULT_PROFILE.name),
      },
    ],
  };
}

export function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case "PROFILE":
      return {
        ...state,
        profile: action.profile,
        messages: state.messages.map((message) =>
          message.id === "welcome"
            ? { ...message, text: welcomeText(action.profile.name) }
            : message,
        ),
        plans: {
          ...Object.fromEntries(
            Object.entries(state.plans).map(([date, plan]) => [
              date,
              date >= action.today ? generatePlan(date, action.profile) : plan,
            ]),
          ),
          [action.today]: generatePlan(action.today, action.profile),
        },
        cart: state.cart.filter((item) =>
          PRODUCTS.find((product) => product.id === item.productId)?.diets.includes(
            action.profile.diet,
          ),
        ),
      };
    case "TOGGLE": {
      const plan = getPlan(state, action.date);
      return {
        ...state,
        plans: {
          ...state.plans,
          [action.date]: {
            ...plan,
            tasks: plan.tasks.map((task) =>
              task.id === action.taskId ? { ...task, complete: !task.complete } : task,
            ),
          },
        },
      };
    }
    case "MEAL": {
      const meal = compatibleMeals(state.profile, action.slot).find(
        (item) => item.id === action.mealId,
      );
      if (!meal) return state;
      const plan = getPlan(state, action.date);
      return {
        ...state,
        plans: {
          ...state.plans,
          [action.date]: {
            ...plan,
            tasks: plan.tasks.map((task) =>
              task.id === action.slot
                ? {
                    ...task,
                    title: meal.name,
                    subtitle: `${action.slot[0]!.toUpperCase()}${action.slot.slice(1)} · ${meal.minutes} min`,
                    reference: meal.id,
                    complete: false,
                  }
                : task,
            ),
          },
        },
      };
    }
    case "WORKOUT": {
      const workout = compatibleWorkouts(state.profile).find(
        (item) => item.id === action.workoutId,
      );
      if (!workout) return state;
      const plan = getPlan(state, action.date);
      return {
        ...state,
        plans: {
          ...state.plans,
          [action.date]: {
            ...plan,
            tasks: plan.tasks.map((task) =>
              task.id === "movement"
                ? {
                    ...task,
                    title: workout.name,
                    subtitle: `${workout.minutes} min · ${workout.equipment === "none" ? "No equipment" : workout.equipment}`,
                    reference: workout.id,
                    complete: false,
                  }
                : task,
            ),
          },
        },
      };
    }
    case "CART": {
      const product = PRODUCTS.find((item) => item.id === action.productId);
      if (!product || !product.diets.includes(state.profile.diet)) return state;
      const cart = state.cart.filter((item) => item.productId !== action.productId);
      const quantity = Math.max(0, Math.min(9, Math.floor(action.quantity)));
      if (quantity) cart.push({ productId: action.productId, quantity });
      return { ...state, cart };
    }
    case "CHECKOUT":
      return state.cart.length
        ? {
            ...state,
            orders: [
              {
                id: action.id,
                date: action.date,
                items: state.cart.map((item) => ({ ...item })),
                total: cartTotal(state.cart),
              },
              ...state.orders,
            ],
            cart: [],
          }
        : state;
    case "BOOK":
      return state.bookings.some(
        (booking) => booking.date === action.booking.date && booking.time === action.booking.time,
      )
        ? state
        : { ...state, bookings: [...state.bookings, action.booking] };
    case "MESSAGE":
      return { ...state, messages: [...state.messages, ...action.messages].slice(-30) };
    case "RESET":
      return createSeedState(action.today);
    default:
      return state;
  }
}

export const mealById = (id?: string) => MEALS.find((meal) => meal.id === id)!;
export const workoutById = (id?: string) => WORKOUTS.find((workout) => workout.id === id)!;
