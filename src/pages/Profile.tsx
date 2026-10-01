import { useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  ChevronRight,
  Leaf,
  RotateCcw,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router";
import { EmptyState, Modal, PageTitle } from "../components/UI";
import { useDemo } from "../state/DemoContext";
import { useToast } from "../state/ToastContext";
import { DIET_LABELS, EQUIPMENT_LABELS, GOAL_LABELS, PRODUCTS } from "../data/fixtures";
import { formatDate, money } from "../utils/dates";

export function Profile() {
  const { state, dispatch, today } = useDemo();
  const toast = useToast();
  const [resetOpen, setResetOpen] = useState(false);
  const preferences = [
    ["Your goal", GOAL_LABELS[state.profile.goal]],
    ["Daily movement", `${state.profile.minutes} minutes`],
    [
      "Your starting point",
      state.profile.level === "beginner" ? "Finding my feet" : "Already moving",
    ],
    ["Your equipment", EQUIPMENT_LABELS[state.profile.equipment]],
    ["Your food preferences", DIET_LABELS[state.profile.diet]],
    ["Monthly product budget", money(state.profile.budget)],
  ];
  return (
    <>
      <PageTitle
        title="Your profile."
        description="Manage your preferences and review your demo orders and appointments."
      />
      <section className="card profile-summary">
        <span className="profile-avatar">{state.profile.name.slice(0, 1).toUpperCase()}</span>
        <div>
          <span className="eyebrow">HELLO, EVERYDAY EXPLORER</span>
          <h2>{state.profile.name}</h2>
          <p>
            <Leaf size={14} /> Growing at your own pace · Hong Kong
          </p>
        </div>
        <Link className="button button-outline button-small" to="/app/personalize">
          <Sparkles size={15} />
          Update my preferences
        </Link>
      </section>
      <div className="profile-grid">
        <section className="card preference-card">
          <div className="section-heading">
            <h2>The things that make it yours.</h2>
            <Link className="text-link" to="/app/personalize">
              Edit
              <ArrowUpRight size={15} />
            </Link>
          </div>
          <dl>
            {preferences.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <div className="profile-local-note">
            <Leaf size={17} />
            <p>Your demo choices are saved only in this browser. No account needed.</p>
          </div>
        </section>
        <section className="card bookings-card">
          <div className="section-heading">
            <h2>
              <CalendarDays size={19} />A little time for you.
            </h2>
            <Link className="text-link" to="/app/coach">
              Book
              <ArrowUpRight size={15} />
            </Link>
          </div>
          {state.bookings.length ? (
            state.bookings.map((booking) => (
              <div className="booking-item" key={booking.id}>
                <span className="booking-calendar">
                  <strong>{formatDate(booking.date, { day: "numeric" })}</strong>
                  <small>{formatDate(booking.date, { month: "short" })}</small>
                </span>
                <div>
                  <strong>A conversation with {booking.coach}</strong>
                  <p>
                    {formatDate(booking.date, { weekday: "long" })} · {booking.time} HKT · 30 min
                  </p>
                  <span className="badge">Demo appointment</span>
                </div>
              </div>
            ))
          ) : (
            <EmptyState
              title="Room for a conversation."
              description="Explore a sample session with your demo wellness coach."
            >
              <Link className="text-link" to="/app/coach">
                Meet Jamie
                <ChevronRight size={15} />
              </Link>
            </EmptyState>
          )}
        </section>
      </div>
      <section className="card orders-card">
        <div className="section-heading">
          <h2>
            <ShoppingBag size={19} />
            Your little extras.
          </h2>
          <Link className="text-link" to="/app/shop">
            Explore the shop
            <ArrowUpRight size={15} />
          </Link>
        </div>
        {state.orders.length ? (
          <div className="order-list">
            {state.orders.map((order) => (
              <article className="order-item" key={order.id}>
                <div className="order-header">
                  <div>
                    <span className="eyebrow">
                      DEMO ORDER · {order.id.slice(0, 6).toUpperCase()}
                    </span>
                    <h3>
                      {formatDate(order.date, { day: "numeric", month: "long", year: "numeric" })}
                    </h3>
                  </div>
                  <strong>{money(order.total)}</strong>
                  <span className="badge">Demo complete</span>
                </div>
                <p>
                  {order.items
                    .map(
                      (item) =>
                        `${PRODUCTS.find((product) => product.id === item.productId)!.name} × ${item.quantity}`,
                    )
                    .join(" · ")}
                </p>
                <small>No payment taken. No shipment created.</small>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState
            title="Only what fits your routine."
            description="Your simulated orders will appear here after trying demo checkout."
          >
            <Link className="text-link" to="/app/shop">
              Find the good stuff
              <ChevronRight size={15} />
            </Link>
          </EmptyState>
        )}
      </section>
      <section className="reset-section">
        <div>
          <h3>A fresh start?</h3>
          <p>
            Reset your preferences, checklist, conversations, bag, demo orders and bookings to the
            sample experience.
          </p>
        </div>
        <button className="button button-outline button-small" onClick={() => setResetOpen(true)}>
          <RotateCcw size={15} />
          Reset demo
        </button>
      </section>
      {resetOpen && (
        <Modal title="Start fresh, at your own pace." onClose={() => setResetOpen(false)}>
          <p className="detail-description">
            This resets all demo changes in this browser and restores Alex’s sample profile, plan
            and progress history.
          </p>
          <button
            className="button button-full"
            onClick={() => {
              dispatch({ type: "RESET", today });
              setResetOpen(false);
              toast("A fresh little start. The sample demo is restored.");
            }}
          >
            <RotateCcw size={16} />
            Reset to the sample demo
          </button>
          <button className="button button-outline button-full" onClick={() => setResetOpen(false)}>
            Keep my little wins
          </button>
        </Modal>
      )}
    </>
  );
}
