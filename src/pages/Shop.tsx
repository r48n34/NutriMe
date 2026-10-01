import { useState } from "react";
import { ArrowRight, Check, Leaf, Minus, Plus, ShoppingBag, Sparkles, X } from "lucide-react";
import { Link } from "react-router";
import { useDemo } from "../state/DemoContext";
import { useToast } from "../state/ToastContext";
import { EmptyState, Modal, PageTitle } from "../components/UI";
import { ProductArt } from "../components/Illustrations";
import { PRODUCTS } from "../data/fixtures";
import { cartTotal, recommendedProducts } from "../utils/plan";
import { money } from "../utils/dates";
import type { DemoOrder, Product } from "../types";

export function Shop() {
  const { state, dispatch, today } = useDemo();
  const toast = useToast();
  const [detail, setDetail] = useState<Product | null>(null);
  const [order, setOrder] = useState<DemoOrder | null>(null);
  const [filter, setFilter] = useState<"all" | "recommended">("all");
  const recommended = recommendedProducts(state.profile);
  const recommendedIds = new Set(recommended.map((product) => product.id));
  const total = cartTotal(state.cart);
  const quantity = (id: string) => state.cart.find((item) => item.productId === id)?.quantity ?? 0;
  const add = (product: Product) => {
    dispatch({ type: "CART", productId: product.id, quantity: quantity(product.id) + 1 });
    toast(`${product.name} added to your bag.`);
  };
  return (
    <>
      <PageTitle
        title="Products for your routine."
        description="Explore optional products, understand why they fit, and try demo checkout."
      >
        <a className="button button-outline button-small" href="#shopping-bag">
          <ShoppingBag size={17} />
          View bag · {state.cart.reduce((count, item) => count + item.quantity, 0)}
        </a>
      </PageTitle>
      <div className="shop-intro">
        <span className="feature-icon">
          <Leaf size={24} />
        </span>
        <div>
          <h2>Your plan comes first.</h2>
          <p>
            These optional picks complement your preferences and your {money(state.profile.budget)}{" "}
            monthly budget. All prices and products are illustrative.
          </p>
        </div>
        <Link className="text-link" to="/app/personalize">
          Change preferences
          <ArrowRight size={15} />
        </Link>
      </div>
      <div className="shop-layout">
        <div id="catalog">
          <div className="shop-toolbar">
            <div className="tabs">
              <button
                className={filter === "all" ? "active" : ""}
                aria-pressed={filter === "all"}
                onClick={() => setFilter("all")}
              >
                All products
              </button>
              <button
                className={filter === "recommended" ? "active" : ""}
                aria-pressed={filter === "recommended"}
                onClick={() => setFilter("recommended")}
              >
                <Sparkles size={15} />
                Picked for you
              </button>
            </div>
            <span>{filter === "all" ? PRODUCTS.length : recommended.length} little extras</span>
          </div>
          <div className="product-grid">
            {PRODUCTS.filter((product) => filter === "all" || recommendedIds.has(product.id)).map(
              (product) => {
                const compatible = product.diets.includes(state.profile.diet);
                return (
                  <article className="card product-card" key={product.id}>
                    <button
                      className="product-card-art"
                      onClick={() => setDetail(product)}
                      aria-label={`View ${product.name}`}
                    >
                      <ProductArt product={product} />
                      {recommendedIds.has(product.id) && (
                        <span className="product-badge">
                          <Sparkles size={12} />
                          For your plan
                        </span>
                      )}
                    </button>
                    <div className="product-card-content">
                      <span className="eyebrow">{product.category}</span>
                      <button className="product-title" onClick={() => setDetail(product)}>
                        <h2>{product.name}</h2>
                      </button>
                      <p>{product.subtitle}</p>
                      <div className="product-bottom">
                        <strong>{money(product.price)}</strong>
                        <button
                          className="button button-small"
                          disabled={!compatible || quantity(product.id) >= 9}
                          onClick={() => add(product)}
                        >
                          <Plus size={15} />
                          {!compatible
                            ? "Different preferences"
                            : quantity(product.id) >= 9
                              ? "Bag limit reached"
                              : "Add to bag"}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              },
            )}
          </div>
        </div>
        <aside id="shopping-bag" className="card shopping-bag">
          <div className="section-heading">
            <h2>
              <ShoppingBag size={19} />
              Your shopping bag
            </h2>
            <span className="bag-count">
              {state.cart.reduce((count, item) => count + item.quantity, 0)}
            </span>
          </div>
          {state.cart.length === 0 ? (
            <EmptyState
              title="Room for a little good."
              description="Find something that fits your routine and add it here."
            />
          ) : (
            <>
              <div className="cart-items">
                {state.cart.map((item) => {
                  const product = PRODUCTS.find((p) => p.id === item.productId)!;
                  return (
                    <div className="cart-item" key={item.productId}>
                      <div className="cart-art">
                        <ProductArt product={product} />
                      </div>
                      <div>
                        <strong>{product.name}</strong>
                        <span>{money(product.price)}</span>
                        <div className="quantity-control">
                          <button
                            aria-label={`Decrease ${product.name} quantity`}
                            onClick={() =>
                              dispatch({
                                type: "CART",
                                productId: product.id,
                                quantity: item.quantity - 1,
                              })
                            }
                          >
                            <Minus size={13} />
                          </button>
                          <span aria-label={`${product.name} quantity`}>{item.quantity}</span>
                          <button
                            aria-label={`Increase ${product.name} quantity`}
                            disabled={item.quantity >= 9}
                            onClick={() =>
                              dispatch({
                                type: "CART",
                                productId: product.id,
                                quantity: item.quantity + 1,
                              })
                            }
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      </div>
                      <button
                        className="remove-item"
                        aria-label={`Remove ${product.name}`}
                        onClick={() =>
                          dispatch({ type: "CART", productId: product.id, quantity: 0 })
                        }
                      >
                        <X size={14} />
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className="cart-totals">
                <span>
                  Subtotal<strong>{money(total)}</strong>
                </span>
                <span>
                  Delivery<strong>Included in demo</strong>
                </span>
                <span className="cart-total">
                  Your total<strong>{money(total)}</strong>
                </span>
              </div>
              {total > state.profile.budget && (
                <p className="budget-note">
                  Your bag is {money(total - state.profile.budget)} above your selected monthly
                  budget. You can adjust the items before checking out.
                </p>
              )}
              <button
                className="button button-full"
                onClick={() => {
                  const confirmation: DemoOrder = {
                    id: crypto.randomUUID(),
                    date: today,
                    items: state.cart.map((item) => ({ ...item })),
                    total,
                  };
                  dispatch({ type: "CHECKOUT", id: confirmation.id, date: today });
                  setOrder(confirmation);
                }}
              >
                Try demo checkout
                <ArrowRight size={17} />
              </button>
            </>
          )}
          <div className="bag-note">
            <Check size={14} />
            <span>
              Just a demo. No payment, no delivery.
              <br />
              Your sample order stays in your profile.
            </span>
          </div>
        </aside>
      </div>
      {detail && (
        <Modal title={detail.name} onClose={() => setDetail(null)}>
          <div className="detail-art product-detail-art">
            <ProductArt product={detail} />
          </div>
          <div className="detail-meta">
            <span className="eyebrow">{detail.category}</span>
            <strong>{money(detail.price)}</strong>
          </div>
          <p className="detail-description">{detail.description}</p>
          <div className="product-fit">
            <Sparkles size={19} />
            <div>
              <strong>
                {detail.diets.includes(state.profile.diet)
                  ? "A fit for your preferences"
                  : "A different fit"}
              </strong>
              <p>
                {detail.diets.includes(state.profile.diet)
                  ? detail.reason
                  : "This sample product does not match your selected dietary preferences. Explore the other options in your plan."}
              </p>
            </div>
          </div>
          <button
            className="button button-full"
            disabled={!detail.diets.includes(state.profile.diet) || quantity(detail.id) >= 9}
            onClick={() => {
              add(detail);
              setDetail(null);
            }}
          >
            <Plus size={17} />
            {quantity(detail.id) >= 9 ? "Bag limit reached" : "Add to my bag"}
          </button>
          <p className="fine-print">
            Fictional demo product · Illustrative HKD pricing · Optional support
          </p>
        </Modal>
      )}
      {order && (
        <Modal title="A little goodness, all sorted." onClose={() => setOrder(null)}>
          <div className="confirmation-icon">
            <Check size={37} />
          </div>
          <h3 className="confirmation-title">Your demo order is complete.</h3>
          <p className="detail-description">
            You’ve explored how your daily plan and shopping fit together. No payment was taken and
            nothing will be shipped.
          </p>
          <div className="confirmation-summary">
            {order.items.map((item) => (
              <div key={item.productId}>
                <span>
                  {PRODUCTS.find((product) => product.id === item.productId)!.name} ×{" "}
                  {item.quantity}
                </span>
                <strong>
                  {money(
                    PRODUCTS.find((product) => product.id === item.productId)!.price *
                      item.quantity,
                  )}
                </strong>
              </div>
            ))}
            <div>
              <strong>Demo total</strong>
              <strong>{money(order.total)}</strong>
            </div>
          </div>
          <Link className="button button-full" to="/app/profile" onClick={() => setOrder(null)}>
            View my demo order
            <ArrowRight size={16} />
          </Link>
        </Modal>
      )}
    </>
  );
}
