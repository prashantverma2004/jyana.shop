"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "./CartProvider";

export default function AddToCartButton({ id, qty = 1, className = "btn", children = "Add to cart", ...rest }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <button
      type="button"
      className={`${className}${added ? " is-added" : ""}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        add(id, qty);
        setAdded(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setAdded(false), 1400);
      }}
      {...rest}
    >
      {added ? "Added" : children}
    </button>
  );
}
