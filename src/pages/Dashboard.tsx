import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Clock3,
  Flame,
  Leaf,
  MessageCircleHeart,
  Sparkles,
  Sun,
} from "lucide-react";
import { Link } from "react-router";
import { useDemo } from "../state/DemoContext";
import { Mascot } from "../components/Mascot";
import { MealArt, ProductArt } from "../components/Illustrations";
import { PageTitle, ProgressRing, SectionHeading, TaskList } from "../components/UI";
import { TaskDialog } from "../components/TaskDialog";
import { consistentDays, getPlan, recommendedProducts } from "../utils/plan";
import { mealById } from "../utils/state";
import { formatDate, money } from "../utils/dates";
import type { TaskId } from "../types";

export function Dashboard() {
  const { state, dispatch, today } = useDemo();
  const [openTask, setOpenTask] = useState<TaskId | null>(null);
  const plan = getPlan(state, today);
  const recommendations = recommendedProducts(state.profile);
  const product = recommendations[0]!;
  return (
    <>
      <PageTitle
        eyebrow={`${formatDate(today, { weekday: "long", day: "numeric", month: "long" }).toUpperCase()} · YOUR FRESH START`}
        title={`Good morning, ${state.profile.name}.`}
        description="Your meals, movement and recovery, all in one place."
      >
        <Link className="button button-outline button-small" to="/app/personalize">
          <Sparkles size={15} />
          Personalize my plan
        </Link>
      </PageTitle>
      <section className="welcome-banner">
        <div>
          <span className="banner-eyebrow">
            <Sun size={17} /> YOUR PLAN IS READY
          </span>
          <h2>
            Your day,
            <br />
            <em>made easier.</em>
          </h2>
          <p>Choose one task, go at your pace, and build on it.</p>
          <Link className="button button-small" to="/app/plan">
            Open today’s plan
            <ArrowRight size={17} />
          </Link>
        </div>
        <div className="banner-art">
          <span className="banner-circle" />
          <Mascot />
          <span className="banner-spark">✳</span>
          <Leaf className="banner-leaf" size={45} strokeWidth={1} />
        </div>
        <div className="banner-streak">
          <Flame size={19} />
          <strong>{consistentDays(state, today)} days</strong>
          <span>consistency streak</span>
        </div>
      </section>
      <div className="dashboard-top-grid">
        <section className="card health-card">
          <SectionHeading title="Today’s health card" to="/app/plan" link="View plan" />
          <p className="card-description">
            Check a circle to complete a task. Select a task to see the details.
          </p>
          <div className="health-content">
            <div className="health-ring">
              <ProgressRing plan={plan} />
              <span>Your daily progress</span>
            </div>
            <TaskList
              plan={plan}
              onToggle={(taskId) => dispatch({ type: "TOGGLE", date: today, taskId })}
              onOpen={setOpenTask}
            />
          </div>
          <div className="health-note">
            <Leaf size={14} /> Three meals, one workout and a moment to wind down.
          </div>
        </section>
        <section className="card daily-product">
          <SectionHeading title="Optional product pick" to="/app/shop" link="Shop" />
          <div className="daily-product-body">
            <ProductArt product={product} />
            <div>
              <span className="eyebrow">PICKED FOR YOUR ROUTINE</span>
              <h3>{product.name}</h3>
              <p>{product.reason}</p>
              <Link className="text-link" to="/app/shop">
                View product
                <ArrowUpRight size={16} />
              </Link>
              <small>{money(product.price)} · Optional extra</small>
            </div>
          </div>
        </section>
      </div>
      <section className="meals-section">
        <SectionHeading title="Today’s meal ideas" to="/app/plan" link="View meals" />
        <div className="meal-grid">
          {plan.tasks
            .filter((task) => ["breakfast", "lunch", "dinner"].includes(task.id))
            .map((task) => {
              const meal = mealById(task.reference);
              return (
                <button className="meal-card" key={task.id} onClick={() => setOpenTask(task.id)}>
                  <div className="meal-card-art">
                    <MealArt meal={meal} />
                    <span className="meal-time">
                      <Clock3 size={12} />
                      {meal.minutes} min
                    </span>
                  </div>
                  <div className="meal-card-body">
                    <span className="eyebrow">{task.id}</span>
                    <div>
                      <h3>{meal.name}</h3>
                      <span className="round-arrow">
                        <ArrowUpRight size={16} />
                      </span>
                    </div>
                    <p>{meal.description}</p>
                  </div>
                </button>
              );
            })}
        </div>
      </section>
      <div className="dashboard-bottom-grid">
        <Link className="coach-nudge" to="/app/coach">
          <span className="feature-icon green">
            <MessageCircleHeart size={25} />
          </span>
          <div>
            <div className="eyebrow">IN YOUR CORNER</div>
            <h3>Need help with your plan?</h3>
            <p>Try a shorter workout, swap a meal or book a demo session.</p>
          </div>
          <ArrowUpRight size={22} />
        </Link>
        <Link className="progress-nudge" to="/app/progress">
          <div>
            <div className="eyebrow">LOOK HOW FAR YOU’VE COME</div>
            <h3>See how your week is going.</h3>
            <span className="text-link">
              See your progress
              <ArrowUpRight size={15} />
            </span>
          </div>
          <svg viewBox="0 0 130 70" aria-hidden="true">
            <path
              d="m4 62 20-13 20 6 20-27 20 9 20-23 20-8"
              fill="none"
              stroke="#528c6c"
              strokeWidth="3"
            />
            {[
              [4, 62],
              [24, 49],
              [44, 55],
              [64, 28],
              [84, 37],
              [104, 14],
              [124, 6],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="4" fill="#edf4e9" stroke="#528c6c" strokeWidth="2" />
            ))}
          </svg>
        </Link>
      </div>
      {openTask && <TaskDialog date={today} taskId={openTask} onClose={() => setOpenTask(null)} />}
    </>
  );
}
