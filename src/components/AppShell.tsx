import {
  CalendarDays,
  ChartNoAxesCombined,
  ChevronRight,
  House,
  Leaf,
  MessageCircleHeart,
  ShoppingBag,
  Sparkles,
  UserRound,
} from "lucide-react";
import { NavLink, Outlet, Link } from "react-router";
import { Logo } from "./UI";
import { Mascot } from "./Mascot";
import { useDemo } from "../state/DemoContext";
import { formatDate } from "../utils/dates";

const navigation = [
  { to: "/app", label: "My day", icon: House },
  { to: "/app/plan", label: "My plan", icon: CalendarDays },
  { to: "/app/coach", label: "My coach", icon: MessageCircleHeart },
  { to: "/app/shop", label: "The good stuff", icon: ShoppingBag },
  { to: "/app/progress", label: "My progress", icon: ChartNoAxesCombined },
  { to: "/app/profile", label: "About me", icon: UserRound },
];
export function AppShell() {
  const { state, today, storageAvailable } = useDemo();
  return (
    <div className="app-shell">
      <a className="skip-link" href="#app-content">
        Skip to content
      </a>
      <aside className="sidebar">
        <Logo />
        <div className="sidebar-caption">YOUR EVERYDAY SPACE</div>
        <nav aria-label="App navigation">
          {navigation.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === "/app"}>
              <Icon size={20} strokeWidth={1.7} />
              {label}
              <ChevronRight className="nav-arrow" size={14} />
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-note">
          <Mascot pose="rest" />
          <span>
            Little steps.
            <br />
            <strong>Lovely possibilities.</strong>
          </span>
          <Link to="/app/personalize">
            Make it yours <Sparkles size={14} />
          </Link>
        </div>
        <Link to="/" className="back-site">
          <Leaf size={15} />
          Back to NutriMe
          <ChevronRight size={14} />
        </Link>
      </aside>
      <div className="app-area">
        <header className="app-header">
          <div className="mobile-logo">
            <Logo />
          </div>
          <span className="header-tagline">Your wellness, connected.</span>
          <div className="header-right">
            <span className="demo-tag">
              <span />
              Local demo
            </span>
            <span className="header-date">{formatDate(today)}</span>
            <Link className="avatar" to="/app/profile" aria-label="Open your profile">
              {state.profile.name.slice(0, 1).toUpperCase()}
            </Link>
          </div>
        </header>
        {!storageAvailable && (
          <div className="storage-notice" role="status">
            Browser storage is unavailable. Your demo works here, but changes won’t survive a
            reload.
          </div>
        )}
        <main id="app-content" className="app-content">
          <Outlet />
        </main>
        <footer className="app-footer">
          <span>
            <Leaf size={13} />A little better, every day.
          </span>
          <span>Illustrative wellness content · No real transactions</span>
        </footer>
      </div>
      <nav className="mobile-nav" aria-label="Mobile app navigation">
        {navigation
          .filter((item) => item.to !== "/app/progress")
          .map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === "/app"}>
              <Icon size={21} strokeWidth={1.7} />
              <span>
                {label === "The good stuff"
                  ? "Shop"
                  : label === "About me"
                    ? "Me"
                    : label.replace("My ", "")}
              </span>
            </NavLink>
          ))}
      </nav>
    </div>
  );
}
