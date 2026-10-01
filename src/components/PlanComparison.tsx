import { Check, Minus } from "lucide-react";
import { PRICING_FEATURE_GROUPS, PRICING_PLANS } from "../data/pricing";

export function PlanComparison() {
  return (
    <div className="plan-comparison" id="pricing-comparison">
      <div className="comparison-intro">
        <h3 id="plan-comparison-title">Compare every benefit.</h3>
        <p>See exactly what each monthly plan includes.</p>
      </div>
      <p className="comparison-scroll-hint" id="comparison-scroll-hint">
        Swipe or scroll sideways to compare all plans.
      </p>
      <div
        className="comparison-table-wrap"
        role="region"
        aria-labelledby="plan-comparison-title"
        aria-describedby="comparison-scroll-hint"
        tabIndex={0}
      >
        <table className="comparison-table">
          <caption className="sr-only">
            NutriMe monthly plan benefits: Free, Plus and Pro. Included and not included items refer
            to the proposed plans.
          </caption>
          <thead>
            <tr>
              <th scope="col" className="comparison-feature-heading">
                Plan benefits
              </th>
              {PRICING_PLANS.map((plan) => (
                <th
                  scope="col"
                  className={plan.featured ? "comparison-featured" : undefined}
                  key={plan.name}
                >
                  <span className="comparison-plan-name">{plan.name}</span>
                  <span className="comparison-plan-price">
                    HK${plan.price}
                    <small> / month</small>
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          {PRICING_FEATURE_GROUPS.map((group) => (
            <tbody key={group.title}>
              <tr className="comparison-group">
                <th scope="rowgroup" colSpan={4}>
                  <span>{group.title}</span>
                </th>
              </tr>
              {group.features.map((feature) => (
                <tr key={feature.label}>
                  <th scope="row">{feature.label}</th>
                  {PRICING_PLANS.map((plan) => {
                    const value = feature.plans[plan.name];
                    return (
                      <td
                        className={plan.featured ? "comparison-featured" : undefined}
                        key={plan.name}
                      >
                        {typeof value === "string" ? (
                          value
                        ) : (
                          <span className={`comparison-status${value ? " is-included" : ""}`}>
                            {value ? (
                              <Check size={18} aria-hidden="true" />
                            ) : (
                              <Minus size={18} aria-hidden="true" />
                            )}
                            <span>{value ? "Included" : "Not included"}</span>
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}
