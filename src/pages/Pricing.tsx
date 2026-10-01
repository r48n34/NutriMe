import { PricingCards } from "../components/PricingCards";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { PRICING_FAQS, PRICING_NOTE } from "../data/pricing";

export function Pricing() {
  return (
    <div className="landing pricing-page">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <section className="landing-section pricing-section" aria-labelledby="pricing-title">
          <div className="center-intro pricing-intro">
            <div className="eyebrow">MONTHLY PLANS</div>
            <h1 id="pricing-title">
              Your formula. <em>Your plan.</em>
            </h1>
            <p>
              Plus and Pro deliver 30 personalised daily packs every month. Pro adds dedicated
              nutritionist support.
            </p>
          </div>
          <PricingCards />
          <p className="pricing-note">{PRICING_NOTE}</p>
        </section>
        <section className="landing-section pricing-faq" aria-labelledby="pricing-faq-title">
          <h2 id="pricing-faq-title">A few things to know.</h2>
          <div className="pricing-faq-grid">
            {PRICING_FAQS.map(({ question, answer }) => (
              <div key={question}>
                <h3>{question}</h3>
                <p>{answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
