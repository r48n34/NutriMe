import { useState } from "react";
import { ChevronLeft, ChevronRight, Dumbbell, Moon, Sparkles, Utensils } from "lucide-react";
import { Link } from "react-router";
import { useDemo } from "../state/DemoContext";
import { MealArt, MovementArt } from "../components/Illustrations";
import { PageTitle, TaskCheck } from "../components/UI";
import { TaskDialog } from "../components/TaskDialog";
import { getPlan, completion } from "../utils/plan";
import { formatDate, shiftDate, weekDates } from "../utils/dates";
import { mealById } from "../utils/state";
import type { TaskId } from "../types";

export function Plan() {
  const { state, dispatch, today } = useDemo();
  const [selected, setSelected] = useState(today);
  const [week, setWeek] = useState(today);
  const [tab, setTab] = useState<"all" | "meals" | "movement" | "recovery">("all");
  const [openTask, setOpenTask] = useState<TaskId | null>(null);
  const plan = getPlan(state, selected);
  const dates = weekDates(week);
  const show = (id: TaskId) =>
    tab === "all" ||
    (tab === "meals" && ["breakfast", "lunch", "dinner"].includes(id)) ||
    tab === id;
  return (
    <>
      <PageTitle
        title="Find your everyday flow."
        description="A little structure. Plenty of room to make it yours."
      >
        <Link className="button button-outline button-small" to="/app/personalize">
          <Sparkles size={15} />
          Adjust my plan
        </Link>
      </PageTitle>
      <section className="card week-picker">
        <div className="week-heading">
          <h2>
            {formatDate(dates[0]!, { day: "numeric", month: "short" })} —{" "}
            {formatDate(dates[6]!, { day: "numeric", month: "short" })}
          </h2>
          <div>
            <button
              className="text-link"
              onClick={() => {
                setWeek(today);
                setSelected(today);
              }}
            >
              Today
            </button>
            <button
              className="icon-button"
              aria-label="Previous week"
              onClick={() => {
                const date = shiftDate(week, -7);
                setWeek(date);
                setSelected(weekDates(date)[0]!);
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              className="icon-button"
              aria-label="Next week"
              onClick={() => {
                const date = shiftDate(week, 7);
                setWeek(date);
                setSelected(weekDates(date)[0]!);
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <div className="week-days">
          {dates.map((date) => (
            <button
              key={date}
              className={date === selected ? "selected" : ""}
              aria-pressed={date === selected}
              aria-label={`View plan for ${formatDate(date)}`}
              onClick={() => setSelected(date)}
            >
              <span>{formatDate(date, { weekday: "short" })}</span>
              <strong>{formatDate(date, { day: "numeric" })}</strong>
              <i className={date === today ? "today-dot" : ""} />
            </button>
          ))}
        </div>
      </section>
      <div className="plan-toolbar">
        <div className="tabs" aria-label="Filter plan sections">
          {[
            { id: "all", label: "Your whole day", icon: Sparkles },
            { id: "meals", label: "Nourish", icon: Utensils },
            { id: "movement", label: "Move", icon: Dumbbell },
            { id: "recovery", label: "Recharge", icon: Moon },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              aria-pressed={tab === id}
              className={tab === id ? "active" : ""}
              onClick={() => setTab(id as typeof tab)}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>
        <span>
          {completion(plan)} of 5 little wins
          {selected !== today ? " · " + formatDate(selected) : " today"}
        </span>
      </div>
      <div className="plan-cards">
        {plan.tasks
          .filter((task) => show(task.id))
          .map((task) => {
            const isMeal = ["breakfast", "lunch", "dinner"].includes(task.id);
            return (
              <section
                className={`card plan-card ${task.complete ? "plan-complete" : ""}`}
                key={task.id}
              >
                <button
                  className="plan-card-art"
                  onClick={() => setOpenTask(task.id)}
                  aria-label={`View ${task.title}`}
                >
                  {isMeal ? (
                    <MealArt meal={mealById(task.reference)} />
                  ) : task.id === "movement" ? (
                    <MovementArt />
                  ) : (
                    <div className="recovery-art">
                      <Moon size={58} strokeWidth={1} />
                      <span>Take a little breath.</span>
                      <i>✧</i>
                    </div>
                  )}
                </button>
                <div className="plan-card-content">
                  <div className="plan-card-top">
                    <span className="eyebrow">
                      {isMeal
                        ? task.id
                        : task.id === "movement"
                          ? "FEEL-GOOD MOVEMENT"
                          : "A MOMENT TO RECHARGE"}
                    </span>
                    <TaskCheck
                      complete={task.complete}
                      label={task.id}
                      onClick={() => dispatch({ type: "TOGGLE", date: selected, taskId: task.id })}
                    />
                  </div>
                  <h2>{task.title}</h2>
                  <span className="plan-card-meta">{task.subtitle}</span>
                  <p>
                    {isMeal
                      ? mealById(task.reference).description
                      : task.id === "movement"
                        ? "A little movement to bring you back to yourself. Go at a pace that feels right."
                        : "Ten quiet minutes to leave the busy day behind. No screens, no rush."}
                  </p>
                  <button className="text-link" onClick={() => setOpenTask(task.id)}>
                    {isMeal
                      ? "See recipe & alternatives"
                      : task.id === "movement"
                        ? "View session & alternatives"
                        : "Your wind-down ritual"}
                    <ChevronRight size={16} />
                  </button>
                </div>
              </section>
            );
          })}
      </div>
      <p className="fine-print plan-note">
        Your plan adapts to your preferences. These are sample ideas for general wellbeing.
      </p>
      {openTask && (
        <TaskDialog date={selected} taskId={openTask} onClose={() => setOpenTask(null)} />
      )}
    </>
  );
}
