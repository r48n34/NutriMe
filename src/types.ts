export type Diet = "omnivore" | "vegetarian" | "dairy-free";
export type Equipment = "none" | "bands" | "dumbbells";
export type Goal = "energy" | "consistency" | "strength";
export type MealSlot = "breakfast" | "lunch" | "dinner";
export type TaskId = MealSlot | "movement" | "recovery";

export interface Profile {
  name: string;
  goal: Goal;
  minutes: 10 | 20 | 30;
  diet: Diet;
  level: "beginner" | "regular";
  equipment: Equipment;
  budget: 200 | 500 | 1000;
}

export interface Meal {
  id: string;
  name: string;
  slot: MealSlot;
  diets: Diet[];
  minutes: number;
  description: string;
  ingredients: string[];
  steps: string[];
  art: "yogurt" | "congee" | "oats" | "salmon" | "chicken" | "tofu" | "noodles";
  color: string;
}

export interface Workout {
  id: string;
  name: string;
  minutes: number;
  level: Profile["level"];
  equipment: Equipment;
  description: string;
  steps: string[];
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  diets: Diet[];
  color: string;
  art: "bottle" | "bands" | "pack" | "tub";
  subtitle: string;
  description: string;
  reason: string;
}

export interface PlanTask {
  id: TaskId;
  title: string;
  subtitle: string;
  reference?: string;
  complete: boolean;
}

export interface DayPlan {
  date: string;
  tasks: PlanTask[];
}
export interface CartItem {
  productId: string;
  quantity: number;
}
export interface DemoOrder {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
}
export interface Booking {
  id: string;
  date: string;
  time: string;
  coach: string;
}
export interface CoachMessage {
  id: string;
  role: "coach" | "user";
  text: string;
}
export interface DemoState {
  version: 1;
  profile: Profile;
  plans: Record<string, DayPlan>;
  cart: CartItem[];
  orders: DemoOrder[];
  bookings: Booking[];
  messages: CoachMessage[];
}

export type DemoAction =
  | { type: "PROFILE"; profile: Profile; today: string }
  | { type: "TOGGLE"; date: string; taskId: TaskId }
  | { type: "MEAL"; date: string; slot: MealSlot; mealId: string }
  | { type: "WORKOUT"; date: string; workoutId: string }
  | { type: "CART"; productId: string; quantity: number }
  | { type: "CHECKOUT"; id: string; date: string }
  | { type: "BOOK"; booking: Booking }
  | { type: "MESSAGE"; messages: CoachMessage[] }
  | { type: "RESET"; today: string };
