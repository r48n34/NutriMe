import { useState } from "react";
import { ArrowUpRight, Check, Flame, Leaf, Sparkles, Target } from "lucide-react";
import { Link } from "react-router";
import { PageTitle, EmptyState } from "../components/UI";
import { Mascot } from "../components/Mascot";
import { useDemo } from "../state/DemoContext";
import { completion, consistentDays, getPlan } from "../utils/plan";
import { formatDate, shiftDate } from "../utils/dates";

export function Progress() {
  const { state, today } = useDemo();
  const [selected, setSelected] = useState(today);
  const dates = Array.from({ length: 7 }, (_, index) => shiftDate(today, index - 6));
  const counts = dates.map((date) => completion(getPlan(state, date)));
  const total = counts.reduce((sum, count) => sum + count, 0);
  const points = counts.map((count, index) => `${40 + index * 100},${174 - count * 27}`).join(" ");
  const completed = getPlan(state, selected).tasks.filter((task) => task.complete);
  return (
    <>
      <PageTitle
        title="Look at you, showing up."
        description="Progress isn’t always loud. Sometimes it’s five quiet minutes for yourself."
      />
      <div className="metric-grid">
        <div className="card metric-card">
          <span className="feature-icon">
            <Check size={22} />
          </span>
          <div>
            <span>This week’s little wins</span>
            <strong>
              {total}
              <small> / 35</small>
            </strong>
            <p>Every choice is a step forward.</p>
          </div>
        </div>
        <div className="card metric-card">
          <span className="feature-icon warm">
            <Flame size={22} />
          </span>
          <div>
            <span>Your consistency streak</span>
            <strong>
              {consistentDays(state, today)}
              <small> days</small>
            </strong>
            <p>Three or more wins make a steady day.</p>
          </div>
        </div>
        <div className="card metric-card">
          <span className="feature-icon lavender">
            <Target size={22} />
          </span>
          <div>
            <span>Daily plan completion</span>
            <strong>
              {Math.round((total / 35) * 100)}
              <small>%</small>
            </strong>
            <p>Across your last seven days.</p>
          </div>
        </div>
      </div>
      <section className="card progress-chart">
        <div className="section-heading">
          <div>
            <h2>Your week, in little wins.</h2>
            <p>Some days are fuller than others. They all belong.</p>
          </div>
          <span className="chart-legend">
            <i /> Daily tasks completed
          </span>
        </div>
        <div className="chart-wrap">
          <svg
            viewBox="0 0 700 215"
            role="img"
            aria-label={`Daily completion for the last seven days: ${dates.map((date, index) => `${formatDate(date)}: ${counts[index]} of 5`).join("; ")}`}
          >
            <defs>
              <linearGradient id="progress-fill" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor="#6a9b75" stopOpacity=".2" />
                <stop offset="1" stopColor="#6a9b75" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[1, 2, 3, 4, 5].map((value) => (
              <g key={value}>
                <line
                  x1="30"
                  y1={174 - value * 27}
                  x2="650"
                  y2={174 - value * 27}
                  stroke="#edf0e8"
                  strokeDasharray="4 6"
                />
                <text x="8" y={178 - value * 27} fill="#7a887d" fontSize="11">
                  {value}
                </text>
              </g>
            ))}
            <polygon points={`40,186 ${points} 640,186`} fill="url(#progress-fill)" />
            <polyline
              points={points}
              fill="none"
              stroke="#54856a"
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {counts.map((count, index) => (
              <g key={dates[index]}>
                <circle
                  cx={40 + index * 100}
                  cy={174 - count * 27}
                  r={dates[index] === selected ? 7 : 5}
                  fill={dates[index] === selected ? "#32674f" : "#f9fbf5"}
                  stroke="#54856a"
                  strokeWidth="2"
                />
                <text x={40 + index * 100} y="207" textAnchor="middle" fontSize="11" fill="#78867c">
                  {formatDate(dates[index]!, { weekday: "short" })}
                </text>
              </g>
            ))}
          </svg>
        </div>
        <div className="chart-footer">
          <span>
            <Sparkles size={14} /> Includes sample history. Your new wins update this chart.
          </span>
          <strong>
            {formatDate(dates[0]!, { day: "numeric", month: "short" })} –{" "}
            {formatDate(today, { day: "numeric", month: "short" })}
          </strong>
        </div>
      </section>
      <div className="progress-bottom-grid">
        <section className="card wins-history">
          <div className="section-heading">
            <h2>Good things you did.</h2>
            <Link className="text-link" to="/app/plan">
              Today’s plan
              <ArrowUpRight size={15} />
            </Link>
          </div>
          <div className="history-date-picker" aria-label="Select a day’s completed activities">
            {dates.map((date) => (
              <button
                key={date}
                aria-label={`Show completed activities for ${formatDate(date)}`}
                aria-pressed={selected === date}
                className={selected === date ? "selected" : ""}
                onClick={() => setSelected(date)}
              >
                <span>{formatDate(date, { weekday: "short" })}</span>
                <strong>{formatDate(date, { day: "numeric" })}</strong>
              </button>
            ))}
          </div>
          {completed.length ? (
            <div className="completed-list">
              {completed.map((task) => (
                <div key={task.id}>
                  <span>
                    <Check size={15} />
                  </span>
                  <div>
                    <strong>{task.title}</strong>
                    <small>{task.subtitle}</small>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="A fresh page."
              description="No completed tasks on this day yet. There’s room for a little win."
            />
          )}
        </section>
        <aside className="growth-note">
          <Mascot pose="rest" />
          <div className="eyebrow">
            <Leaf size={13} /> ROOTING FOR YOU
          </div>
          <h2>
            Slow growth
            <br />
            is <em>still growth.</em>
          </h2>
          <p>Focus on what you can keep doing. A good routine has room for real life.</p>
        </aside>
      </div>
    </>
  );
}
