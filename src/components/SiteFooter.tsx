import { Link } from "react-router";
import { Logo } from "./UI";
import { todayInHongKong } from "../utils/dates";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <Logo />
        <p>Your body, your formula. Delivered monthly.</p>
      </div>
      <nav className="footer-links" aria-label="Footer navigation">
        <Link to="/#how">How it works</Link>
        <Link to="/pricing">Pricing</Link>
        <Link to="/app">Try demo</Link>
      </nav>
      <div className="footer-bottom">
        <span>© {todayInHongKong().slice(0, 4)} NutriMe · EC5001 2026/27 Serious Business</span>
      </div>
    </footer>
  );
}
