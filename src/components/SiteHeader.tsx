import { ArrowUpRight } from "lucide-react";
import { Link, NavLink } from "react-router";
import { Logo } from "./UI";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Logo />
      <nav aria-label="Website navigation">
        <NavLink to="/" end>
          Home
        </NavLink>
        <Link to="/#daily" className="site-feature-link">
          Benefits
        </Link>
        <NavLink to="/pricing">Pricing</NavLink>
      </nav>
      <Link className="button button-small button-outline" to="/app">
        Try demo <ArrowUpRight size={17} />
      </Link>
    </header>
  );
}
