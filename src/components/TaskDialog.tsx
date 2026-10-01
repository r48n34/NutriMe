import { useState } from "react";
import { Check, Clock3, Dumbbell, Moon, RefreshCw } from "lucide-react";
import { MealArt, MovementArt } from "./Illustrations";
import { Modal } from "./UI";
import { useDemo } from "../state/DemoContext";
import { useToast } from "../state/ToastContext";
import { compatibleMeals, compatibleWorkouts, getPlan } from "../utils/plan";
import { mealById, workoutById } from "../utils/state";
import type { MealSlot, TaskId } from "../types";

export function TaskDialog({
  date,
  taskId,
  onClose,
}: {
  date: string;
  taskId: TaskId;
  onClose: () => void;
}) {
  const { state, dispatch } = useDemo();
  const toast = useToast();
  const [showAlternatives, setShowAlternatives] = useState(false);
  const task = getPlan(state, date).tasks.find((item) => item.id === taskId)!;
  const isMeal = ["breakfast", "lunch", "dinner"].includes(taskId);
  const meal = isMeal ? mealById(task.reference) : undefined;
  const workout = taskId === "movement" ? workoutById(task.reference) : undefined;
  const alternatives = meal
    ? compatibleMeals(state.profile, taskId as MealSlot)
    : workout
      ? compatibleWorkouts(state.profile)
      : [];
  return (
    <Modal title={task.title} onClose={onClose}>
      {meal && (
        <div className="detail-art">
          <MealArt meal={meal} />
        </div>
      )}
      {workout && (
        <div className="detail-art">
          <MovementArt />
        </div>
      )}
      {taskId === "recovery" && (
        <div className="recovery-detail">
          <Moon size={64} strokeWidth={1} />
          <span>A moment that’s just for you.</span>
        </div>
      )}
      <div className="detail-meta">
        <span>
          {workout ? <Dumbbell size={15} /> : <Clock3 size={15} />}
          {task.subtitle}
        </span>
        <span className="badge">Your personal plan</span>
      </div>
      <p className="detail-description">
        {meal?.description ??
          workout?.description ??
          "A gentle end to a full day. Put your screens aside and make a little space to relax."}
      </p>
      {meal && (
        <>
          <h3>A few good ingredients</h3>
          <ul className="ingredient-list">
            {meal.ingredients.map((item) => (
              <li key={item}>
                <LeafDot />
                {item}
              </li>
            ))}
          </ul>
        </>
      )}
      <h3>{meal ? "Keep it simple" : workout ? "Your session" : "Your wind-down ritual"}</h3>
      <ol className="detail-steps">
        {(
          meal?.steps ??
          workout?.steps ?? [
            "Put your phone away for ten minutes.",
            "Dim the lights and find a comfortable seat.",
            "Take a few slow breaths or read something calming.",
            "Choose a bedtime that feels manageable tonight.",
          ]
        ).map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      {alternatives.length > 1 && (
        <>
          <button
            className="button button-outline button-full"
            onClick={() => setShowAlternatives(!showAlternatives)}
          >
            <RefreshCw size={16} />
            {showAlternatives
              ? "Keep browsing your plan"
              : meal
                ? "Fancy something different?"
                : "Try a different session"}
          </button>
          {showAlternatives && (
            <div className="alternative-list">
              {alternatives.map((item) => (
                <button
                  key={item.id}
                  disabled={item.id === task.reference}
                  onClick={() => {
                    if (meal)
                      dispatch({ type: "MEAL", date, slot: taskId as MealSlot, mealId: item.id });
                    else dispatch({ type: "WORKOUT", date, workoutId: item.id });
                    toast("A fresh option added to your plan.");
                    setShowAlternatives(false);
                  }}
                >
                  <span>
                    <strong>{item.name}</strong>
                    <small>{item.minutes} min</small>
                  </span>
                  {item.id === task.reference ? <Check size={17} /> : <RefreshCw size={15} />}
                </button>
              ))}
            </div>
          )}
        </>
      )}
      <button
        className="button button-full"
        onClick={() => {
          dispatch({ type: "TOGGLE", date, taskId });
          toast(task.complete ? "Task marked as unfinished." : "Another little win. Nicely done!");
          onClose();
        }}
      >
        <Check size={17} />
        {task.complete ? "Mark as unfinished" : "Mark as done"}
      </button>
      <p className="fine-print">
        Sample wellness content for the NutriMe demo. Follow your own needs and pace.
      </p>
    </Modal>
  );
}
function LeafDot() {
  return <span className="ingredient-dot" />;
}
