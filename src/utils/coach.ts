import type { DemoAction, DemoState } from "../types";
import { compatibleMeals, completion, getPlan } from "./plan";
import { GOAL_LABELS } from "../data/fixtures";

export function coachResponse(
  text: string,
  state: DemoState,
  today: string,
): { text: string; action?: DemoAction } {
  const query = text.toLowerCase();
  if (/10|short|busy|time|lighter/.test(query))
    return {
      text: "A busy day still has room for a little movement. I’ve changed today’s session to a gentle 10-minute neighbourhood walk. Your overall preferences stay the same. Small steps count!",
      action: { type: "WORKOUT", date: today, workoutId: "walk-10" },
    };
  if (/lunch|meal|food|swap/.test(query)) {
    const current = getPlan(state, today).tasks.find((task) => task.id === "lunch")!;
    const alternative = compatibleMeals(state.profile, "lunch").find(
      (meal) => meal.id !== current.reference,
    )!;
    return {
      text: `Let’s try something fresh. I’ve added ${alternative.name.toLowerCase()} to today’s lunch. It fits your ${state.profile.diet} preferences and takes about ${alternative.minutes} minutes. You’ll find the recipe in your plan.`,
      action: { type: "MEAL", date: today, slot: "lunch", mealId: alternative.id },
    };
  }
  if (/progress|doing|win|routine|goal/.test(query))
    return {
      text: `You’ve completed ${completion(getPlan(state, today))} of 5 little wins today. Your goal is to ${GOAL_LABELS[state.profile.goal].toLowerCase()}. Keep choosing one manageable thing at a time—your progress page shows how those choices add up.`,
    };
  if (/sleep|rest|recover|wind/.test(query))
    return {
      text: "Try a gentle pause tonight: put your phone aside for ten minutes, dim the lights, and read or sit quietly. Your recovery ritual is waiting in your daily plan. Make it a moment that feels comfortable for you.",
    };
  return {
    text: "This coach is a scripted demo. I can help with a shorter workout, a different lunch, your progress, or an evening wind-down. Try one of the prompts below, or explore a sample coaching appointment.",
  };
}
