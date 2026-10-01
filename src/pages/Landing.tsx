import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ClipboardList,
  Leaf,
  PackageCheck,
  Sprout,
} from "lucide-react";
import { Link } from "react-router";
import { Mascot } from "../components/Mascot";
import { DispenserArt } from "../components/NutritionIllustrations";
import { PricingCards } from "../components/PricingCards";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { VideoSection } from "../components/VideoSection";
import { NUTRITION_MODULES, NUTRITION_STEPS } from "../data/nutrition";
import { PRICING_NOTE } from "../data/pricing";

export function Landing() {
  return (
    <div className="landing nutrition-landing">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <section className="landing-hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="tiny-leaf">
                <Sprout size={16} />
              </span>{" "}
              PERSONALISED NUTRITION. MONTHLY DELIVERY.
            </div>
            <h1>
              Your body.
              <br />
              Your <em>formula.</em>
            </h1>
            <p>Personalised nutrition delivered monthly. 30 daily packs, made for you.</p>
            <div className="hero-actions">
              <Link className="button" to="/app">
                Try the free demo <ArrowUpRight size={19} />
              </Link>
              <a className="hero-secondary" href="#daily">
                See the benefits <ArrowRight size={16} />
              </a>
            </div>
            <div className="hero-reassurance">
              <span>
                <Check size={14} /> No sign-up or payment
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-orbit" />
            <div className="hero-disc">
              <Mascot className="hero-mascot" />
              <div className="mascot-caption">
                <span />
                Me, your wellness companion.
              </div>
            </div>
            <div className="floating-card breakfast-float">
              <div className="float-image">
                <DispenserArt />
              </div>
              <div>
                <strong>Your name. Your daily pack.</strong>
                <small>Ready for busy mornings or travel.</small>
              </div>
              <span className="float-check">
                <Check size={16} />
              </span>
            </div>
            <div className="floating-card movement-float">
              <span className="feature-icon green">
                <PackageCheck size={23} />
              </span>
              <div>
                <strong>One box. 30 daily packs.</strong>
                <small>Delivered to your door every month.</small>
              </div>
            </div>
            <span className="hero-spark spark-one">✳</span>
            <span className="hero-spark spark-two">✳</span>
            <Leaf className="hero-leaf" size={42} strokeWidth={1} />
          </div>
        </section>
        <section className="landing-section how-section" id="how">
          <div className="section-intro">
            <div className="eyebrow">MADE TO ORDER. DELIVERED MONTHLY.</div>
            <h2>
              Built around
              <br />
              <em>you.</em>
            </h2>
          </div>
          <div className="step-grid">
            {NUTRITION_STEPS.map(({ n, icon: Icon, title, text }) => (
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
            <div className="eyebrow">THREE PARTS. ONE DAILY HABIT.</div>
            <h2>
              Made for your life. <em>Easy every day.</em>
            </h2>
          </div>
          <div className="pillar-grid nutrition-modules">
            {NUTRITION_MODULES.map(
              ({ title, label, description, benefit, art: Art, icon: Icon }) => (
                <article className="pillar-card" key={title}>
                  <div className="pillar-art">
                    <Art />
                  </div>
                  <div className="pillar-card-content">
                    <span className="eyebrow">
                      <Icon size={13} /> {label}
                    </span>
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <p className="nutrition-benefit">
                      <Check size={15} aria-hidden="true" />
                      {benefit}
                    </p>
                  </div>
                </article>
              ),
            )}
          </div>
          <p className="pricing-note">
            Concept preview: AI formulation, delivery, rewards and certified-nutritionist services
            are planned.
          </p>
        </section>
        <VideoSection />
        <section
          className="landing-section pricing-section"
          id="pricing"
          aria-labelledby="home-pricing-title"
        >
          <div className="center-intro">
            <div className="eyebrow">MONTHLY PLANS</div>
            <h2 id="home-pricing-title">
              Your nutrition. <em>Your subscription.</em>
            </h2>
          </div>
          <PricingCards compact />
          <p className="pricing-note">{PRICING_NOTE}</p>
          <Link className="text-link pricing-details-link" to="/pricing">
            Compare all plans <ArrowRight size={16} />
          </Link>
        </section>
        <section className="landing-cta">
          <span className="cta-spark">✳</span>
          <h2>
            Your daily nutrition, <em>made personal.</em>
          </h2>
          <Link className="button button-light" to="/app/personalize">
            Explore the demo
            <ClipboardList size={18} />
          </Link>
          <small>No sign-up or payment.</small>
          <Leaf className="cta-leaf" size={100} strokeWidth={0.6} />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
