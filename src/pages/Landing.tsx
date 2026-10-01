import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Clock3,
  Dumbbell,
  Leaf,
  Moon,
  PackageCheck,
  Sparkles,
  Sprout,
  Utensils,
} from "lucide-react";
import { Link } from "react-router";
import { Mascot } from "../components/Mascot";
import { MealArt, MovementArt, ProductArt } from "../components/Illustrations";
import { Logo } from "../components/UI";
import { MEALS, PRODUCTS } from "../data/fixtures";
import { todayInHongKong } from "../utils/dates";

const copyrightYear = todayInHongKong().slice(0, 4);

export function Landing() {
  return (
    <div className="landing">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <Logo />
        <nav aria-label="Website navigation">
          <a href="#how">How it works</a>
          <a href="#daily">Your daily plan</a>
          <a href="#why">The NutriMe way</a>
        </nav>
        <Link className="button button-small button-outline" to="/app">
          Explore the app <ArrowUpRight size={17} />
        </Link>
      </header>
      <main id="main">
        <section className="landing-hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="tiny-leaf">
                <Sprout size={16} />
              </span>{" "}
              SMALL STEPS. REAL LIFE.
            </div>
            <h1>
              A healthier you.
              <br />A little <em>simpler.</em>
            </h1>
            <p>
              Good food, feel-good movement, and a moment to recharge. One personal plan that brings
              it all together—on your terms.
            </p>
            <div className="hero-actions">
              <Link className="button" to="/app">
                Find your everyday flow <ArrowUpRight size={19} />
              </Link>
              <a className="hero-secondary" href="#how">
                Get to know NutriMe <ArrowRight size={16} />
              </a>
            </div>
            <div className="hero-reassurance">
              <span>
                <Check size={14} /> Made for your real life
              </span>
              <span>
                <Check size={14} /> Start with a free demo
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-orbit" />
            <div className="hero-disc">
              <span className="orbit-caption">GROW AT YOUR OWN PACE</span>
              <Mascot className="hero-mascot" />
              <div className="mascot-caption">
                <span />
                Meet Me. Your everyday sidekick.
              </div>
            </div>
            <div className="floating-card breakfast-float">
              <div className="float-image">
                <MealArt meal={MEALS[0]!} />
              </div>
              <div>
                <span className="eyebrow">A GOOD START</span>
                <strong>Breakfast, sorted.</strong>
                <small>
                  <Clock3 size={12} /> 5 minutes. All the goodness.
                </small>
              </div>
              <span className="float-check">
                <Check size={16} />
              </span>
            </div>
            <div className="floating-card movement-float">
              <span className="feature-icon green">
                <Dumbbell size={23} />
              </span>
              <div>
                <span className="eyebrow">YOUR DAILY LITTLE WIN</span>
                <strong>Move a little. Feel a lot.</strong>
                <small>A 20-minute plan, just for you.</small>
              </div>
            </div>
            <span className="hero-spark spark-one">✳</span>
            <span className="hero-spark spark-two">✳</span>
            <Leaf className="hero-leaf" size={42} strokeWidth={1} />
          </div>
        </section>
        <section className="pillar-strip" aria-label="Four parts of your routine">
          <span>
            A little of everything.
            <br />
            <strong>A lot more balance.</strong>
          </span>
          <div>
            <Utensils size={21} />
            Good food
          </div>
          <div>
            <Dumbbell size={21} />
            Feel-good movement
          </div>
          <div>
            <Moon size={21} />
            Better rest
          </div>
          <div>
            <PackageCheck size={21} />
            Considered extras
          </div>
        </section>
        <section className="landing-section how-section" id="how">
          <div className="section-intro">
            <div className="eyebrow">LESS GUESSWORK. MORE LIVING.</div>
            <h2>
              Your everyday,
              <br />
              <em>made easier.</em>
            </h2>
            <p>
              You don’t need to change everything.
              <br />
              Just find the small things that work for you.
            </p>
          </div>
          <div className="step-grid">
            {[
              {
                n: "01",
                icon: Sparkles,
                title: "Start with you.",
                text: "Your goals, your schedule, your tastes. Tell us a little about your life.",
              },
              {
                n: "02",
                icon: CalendarIcon,
                title: "Find your rhythm.",
                text: "Meet your personal daily plan. Meals, movement and recovery, all in one place.",
              },
              {
                n: "03",
                icon: Sprout,
                title: "Keep growing.",
                text: "Tick off the little wins, get a gentle nudge, and make tomorrow a little easier.",
              },
            ].map(({ n, icon: Icon, title, text }) => (
              <div className="step-card" key={n}>
                <div className="step-top">
                  <span className="step-number">{n}</span>
                  <Icon size={27} strokeWidth={1.4} />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="landing-section daily-section" id="daily">
          <div className="center-intro">
            <div className="eyebrow">ONE PLAN. ALL OF YOU.</div>
            <h2>
              A good day is made of <em>little things.</em>
            </h2>
            <p>
              Bring the pieces of your wellbeing together, without making life more complicated.
            </p>
          </div>
          <div className="pillar-grid">
            <Link className="pillar-card" to="/app/plan">
              <div className="pillar-art">
                <MealArt meal={MEALS[6]!} />
              </div>
              <div className="pillar-card-content">
                <span className="eyebrow">
                  <Utensils size={13} /> NOURISH
                </span>
                <h3>Real food. Real life.</h3>
                <p>Meal ideas that fit your tastes, your time, and what feels good.</p>
                <span className="text-link">
                  Find your next favourite
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </Link>
            <Link className="pillar-card" to="/app/plan">
              <div className="pillar-art">
                <MovementArt />
              </div>
              <div className="pillar-card-content">
                <span className="eyebrow">
                  <Dumbbell size={13} /> MOVE
                </span>
                <h3>Your kind of active.</h3>
                <p>From a neighbourhood walk to a little strength at home.</p>
                <span className="text-link">
                  Move at your own pace
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </Link>
            <Link className="pillar-card rest-card" to="/app/plan">
              <div className="rest-art">
                <Moon size={70} strokeWidth={1} />
                <span className="rest-star star-a">✦</span>
                <span className="rest-star star-b">✧</span>
                <div className="rest-hill" />
                <span className="rest-star star-c">✧</span>
              </div>
              <div className="pillar-card-content">
                <span className="eyebrow">
                  <Moon size={13} /> RECHARGE
                </span>
                <h3>Room to slow down.</h3>
                <p>Simple wind-down rituals. Because rest belongs in the plan, too.</p>
                <span className="text-link">
                  Find a softer evening
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </Link>
            <Link className="pillar-card" to="/app/shop">
              <div className="pillar-art">
                <ProductArt product={PRODUCTS[3]!} />
              </div>
              <div className="pillar-card-content">
                <span className="eyebrow">
                  <PackageCheck size={13} /> SUPPORT
                </span>
                <h3>Only what fits you.</h3>
                <p>Thoughtful, optional extras that complement your everyday routine.</p>
                <span className="text-link">
                  Explore the good stuff
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </Link>
          </div>
        </section>
        <section className="landing-section why-section" id="why">
          <div className="why-visual">
            <Mascot pose="rest" />
            <span className="why-label">
              <Leaf size={16} /> Rooting for you, always.
            </span>
            <div className="why-circle" />
          </div>
          <div className="why-copy">
            <div className="eyebrow">THE NUTRIME WAY</div>
            <h2>
              More support.
              <br />
              <em>Less “should.”</em>
            </h2>
            <p>
              Wellbeing isn’t another thing to get perfect. It’s a routine that meets you where you
              are—whether that’s a busy day in Central or a quiet weekend at home.
            </p>
            <ul>
              <li>
                <Check size={16} /> Food and daily habits come first.
              </li>
              <li>
                <Check size={16} /> Your schedule and budget set the pace.
              </li>
              <li>
                <Check size={16} /> Progress is personal. Small wins count.
              </li>
            </ul>
            <Link className="text-link" to="/app/coach">
              Meet your everyday support
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </section>
        <section className="landing-cta">
          <span className="cta-spark">✳</span>
          <div className="eyebrow">LET’S START SOMETHING GOOD</div>
          <h2>
            Your next little win
            <br />
            starts <em>right here.</em>
          </h2>
          <p>Take a look around. Make the plan yours. Find your flow.</p>
          <Link className="button button-light" to="/app">
            Try the NutriMe demo
            <ArrowUpRight size={18} />
          </Link>
          <small>No sign-up. Just a little curiosity.</small>
          <Leaf className="cta-leaf" size={100} strokeWidth={0.6} />
        </section>
      </main>
      <footer className="site-footer">
        <div>
          <Logo />
          <p>A healthier you, made simpler.</p>
        </div>
        <div className="footer-links">
          <a href="#how">How it works</a>
          <Link to="/app">
            Explore the demo
            <ChevronRight size={13} />
          </Link>
          <span>Made with everyday Hong Kong in mind.</span>
        </div>
        <div className="footer-bottom">
          <span>© {copyrightYear} NutriMe · Concept demo</span>
          <span>Illustrative wellness content and products.</span>
        </div>
      </footer>
    </div>
  );
}

function CalendarIcon({ size = 27, strokeWidth = 1.4 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M7 2v6m10-6v6M3 11h18m-12 5 2 2 4-4" />
    </svg>
  );
}
