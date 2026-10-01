import { ArrowUpRight, Check } from "lucide-react";
import { Link } from "react-router";
import { PRICING_PLANS } from "../data/pricing";

export function PricingCards({ compact = false }: { compact?: boolean }) {
  return (
    <div className="pricing-grid">
      {PRICING_PLANS.map((plan) => (
        <article
          className={`pricing-card${plan.featured ? " pricing-featured" : ""}`}
          key={plan.name}
        >
          <div className="pricing-card-heading">
            <h3>{plan.name}</h3>
            {plan.featured && <span className="pricing-badge">For everyday consistency</span>}
          </div>
          <p className="pricing-benefit">{plan.benefit}</p>
          <p className="pricing-amount">
            <strong>HK${plan.price}</strong>
            <span>/ month</span>
          </p>
          {compact ? (
            <p className="pricing-summary">{plan.summary}</p>
          ) : (
            <ul className="pricing-features">
              {plan.features.map((feature) => (
                <li key={feature}>
                  <Check size={17} aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          )}
          <Link
            className={`button${plan.featured ? "" : " button-outline"}`}
            to={compact ? "/pricing" : plan.to}
          >
            {compact ? `Explore ${plan.name}` : plan.action}
            <ArrowUpRight size={17} />
          </Link>
        </article>
      ))}
    </div>
  );
}
