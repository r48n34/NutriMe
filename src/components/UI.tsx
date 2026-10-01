import { useEffect, useId, useRef } from "react";
import type { ReactNode } from "react";
import { ArrowUpRight, Check, Leaf, X } from "lucide-react";
import { Link } from "react-router";
import type { DayPlan, TaskId } from "../types";
import { completion } from "../utils/plan";
import { trapDialogFocus } from "../utils/dialog";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link className="logo" to="/" aria-label="NutriMe home">
      <span className="logo-symbol">
        <Leaf size={22} strokeWidth={1.8} />
      </span>
      {!compact && (
        <span>
          nutri<span className="logo-me">me</span>
        </span>
      )}
    </Link>
  );
}
export function PageTitle({
  eyebrow = "YOUR NUTRIME PLAN",
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="page-title">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {children && <div className="page-title-action">{children}</div>}
    </div>
  );
}
export function SectionHeading({ title, link, to }: { title: string; link?: string; to?: string }) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      {to && (
        <Link className="text-link" to={to}>
          {link ?? "See more"}
          <ArrowUpRight size={15} />
        </Link>
      )}
    </div>
  );
}
export function ProgressRing({ plan, small = false }: { plan: DayPlan; small?: boolean }) {
  const done = completion(plan);
  return (
    <div
      className={`progress-ring ${small ? "small" : ""}`}
      role="img"
      aria-label={`${done} of ${plan.tasks.length} daily tasks completed`}
    >
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r="49" fill="none" stroke="#e8eee4" strokeWidth="9" />
        <circle
          cx="60"
          cy="60"
          r="49"
          fill="none"
          stroke="#438469"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={`${(done / plan.tasks.length) * 307.88} 307.88`}
          transform="rotate(-90 60 60)"
        />
      </svg>
      <div>
        <strong>
          {done}
          <span> / {plan.tasks.length}</span>
        </strong>
        <small>tasks done</small>
      </div>
    </div>
  );
}
export function TaskCheck({
  complete,
  label,
  onClick,
}: {
  complete: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className={`task-check ${complete ? "complete" : ""}`}
      aria-label={`Mark ${label} ${complete ? "incomplete" : "complete"}`}
      title={complete ? "Mark as unfinished" : "Mark as done"}
      aria-pressed={complete}
      onClick={onClick}
    >
      {complete && <Check size={15} />}
    </button>
  );
}
export function TaskList({
  plan,
  onToggle,
  onOpen,
}: {
  plan: DayPlan;
  onToggle: (id: TaskId) => void;
  onOpen: (id: TaskId) => void;
}) {
  return (
    <div className="task-list">
      {plan.tasks.map((task) => (
        <div className={`task-row ${task.complete ? "is-done" : ""}`} key={task.id}>
          <TaskCheck complete={task.complete} label={task.id} onClick={() => onToggle(task.id)} />
          <button
            className="task-text"
            aria-label={`View ${task.title}`}
            onClick={() => onOpen(task.id)}
          >
            <span className="task-copy">
              <strong>{task.title}</strong>
              <span>{task.subtitle}</span>
            </span>
            <span className="task-view-label" aria-hidden="true">
              View <ArrowUpRight size={15} />
            </span>
          </button>
        </div>
      ))}
    </div>
  );
}
export function Modal({
  title,
  onClose,
  children,
  wide = false,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const label = useId();
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const current = dialog.current;
    current?.showModal();
    document.body.classList.add("modal-open");
    return () => {
      current?.close();
      document.body.classList.remove("modal-open");
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className={`modal ${wide ? "wide" : ""}`}
      aria-labelledby={label}
      onKeyDown={trapDialogFocus}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const bounds = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom
          )
            onClose();
        }
      }}
    >
      <div className="modal-heading">
        <h2 id={label}>{title}</h2>
        <button className="icon-button" aria-label="Close dialog" onClick={onClose} autoFocus>
          <X size={21} />
        </button>
      </div>
      <div className="modal-content">{children}</div>
    </dialog>
  );
}
export function EmptyState({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="empty-state">
      <Leaf size={30} />
      <h3>{title}</h3>
      <p>{description}</p>
      {children}
    </div>
  );
}
