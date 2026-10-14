"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { CartLine, useCart } from "./CartProvider";
import { Arrow } from "./Icons";
import { money } from "@/lib/store";

const Field = ({ id, label, ...rest }) => (
  <div className="field"><label htmlFor={id}>{label}</label><input id={id} required {...rest} /></div>
);

export default function CheckoutView() {
  const { items, subtotal, setQty, loaded } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const noteRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: connect a payment provider (Shopify, Razorpay, Stripe…) and hand off `items` here.
    setSubmitted(true);
    setTimeout(() => noteRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
  };

  return (
    <div className="checkout-grid">
      <form onSubmit={onSubmit}>
        <span className="opt-label">Contact</span>
        <Field id="co-email" label="Email" type="email" autoComplete="email" />
        <Field id="co-phone" label="Phone" type="tel" autoComplete="tel" />
        <span className="opt-label" style={{ marginTop: 32 }}>Delivery</span>
        <div className="field-row">
          <Field id="co-fn" label="First name" autoComplete="given-name" />
          <Field id="co-ln" label="Last name" autoComplete="family-name" />
        </div>
        <Field id="co-addr" label="Address" autoComplete="street-address" />
        <div className="field-row">
          <Field id="co-city" label="City" autoComplete="address-level2" />
          <Field id="co-pin" label="PIN code" autoComplete="postal-code" inputMode="numeric" />
        </div>
        <Field id="co-state" label="State" autoComplete="address-level1" />
        <button className="btn block" type="submit" style={{ marginTop: 12 }}>Continue to payment <Arrow /></button>
        {submitted && (
          <div className="notice" ref={noteRef}>
            <b>Payments aren&apos;t connected yet.</b> This checkout is a front-end template. Connect a payment provider
            (Shopify, Razorpay, Stripe…) in <code>components/CheckoutView.js</code> to take live orders.
          </div>
        )}
      </form>

      <aside className="summary">
        <h3>Order summary</h3>
        {loaded && !items.length ? (
          <p className="small" style={{ margin: "18px 0" }}>Your bag is empty. <Link className="link" href="/shop">Shop the range</Link></p>
        ) : (
          items.map((l) => <CartLine key={l.id} line={l} setQty={setQty} compact />)
        )}
        <div className="summary-rows">
          <div><span>Subtotal</span><span>{money(subtotal)}</span></div>
          <div><span>Shipping</span><span className="small">Calculated at next step</span></div>
          <div className="total"><span>Total</span><strong>{money(subtotal)}</strong></div>
        </div>
      </aside>
    </div>
  );
}
