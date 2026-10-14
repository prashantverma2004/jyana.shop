"use client";

import { useEffect, useState } from "react";

export default function QtyStepper({ value, onChange, min = 1, max = 99, size = "" }) {
  const [text, setText] = useState(String(value));
  useEffect(() => setText(String(value)), [value]);

  const commit = (v) => {
    const n = Math.max(min, Math.min(max, Number.isFinite(v) ? v : min));
    setText(String(n));
    if (n !== value) onChange(n);
  };

  return (
    <div className={`qty ${size}`.trim()}>
      <button type="button" onClick={() => commit(value - 1)} aria-label="Decrease quantity">−</button>
      <input
        type="number" min={min} max={max} inputMode="numeric" aria-label="Quantity"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => commit(parseInt(text, 10))}
        onKeyDown={(e) => e.key === "Enter" && commit(parseInt(text, 10))}
      />
      <button type="button" onClick={() => commit(value + 1)} aria-label="Increase quantity">+</button>
    </div>
  );
}
