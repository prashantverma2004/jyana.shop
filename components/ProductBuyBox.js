"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Crop from "./Crop";
import QtyStepper from "./QtyStepper";
import AddToCartButton from "./AddToCartButton";
import { useCart } from "./CartProvider";
import { money } from "@/lib/store";

export default function ProductBuyBox({ product: p }) {
  const [qty, setQty] = useState(1);
  const { add } = useCart();
  const router = useRouter();
  const addRef = useRef(null);
  const [sticky, setSticky] = useState(false);

  // Show the mobile buy bar once the main Add to cart button has scrolled away.
  useEffect(() => {
    const el = addRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([en]) => setSticky(!en.isIntersecting && en.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div>
        <span className="opt-label">Size</span>
        <div className="sizes"><span className="size-pill" aria-current="true">{p.size}</span></div>
        <span className="opt-label">Quantity</span>
        <div className="buy">
          <QtyStepper value={qty} onChange={setQty} size="lg" />
          <span ref={addRef} style={{ display: "contents" }}>
            <AddToCartButton id={p.id} qty={qty}>Add to cart — {money(p.price * qty)}</AddToCartButton>
          </span>
        </div>
        <button
          className="btn outline block"
          onClick={() => { add(p.id, qty, { silent: true }); router.push("/checkout"); }}
        >Buy now</button>
      </div>

      <div className={`sticky-buy${sticky ? " show" : ""}`}>
        <Crop src={p.image} view={p.gallery[1]} sizes="48px" />
        <div className="t"><b>{p.name}</b><span>{money(p.price)} · {p.size}</span></div>
        <AddToCartButton id={p.id} />
      </div>
    </>
  );
}
