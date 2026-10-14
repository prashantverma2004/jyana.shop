"use client";

import { useId, useState } from "react";

/* items: [{ q, a } | { q, content }]; `openIndex` starts that item open. */
export default function Accordion({ items, openIndex = -1, className = "" }) {
  const [open, setOpen] = useState(() => new Set(openIndex >= 0 ? [openIndex] : []));
  const uid = useId();
  const toggle = (i) => setOpen((s) => {
    const n = new Set(s);
    n.has(i) ? n.delete(i) : n.add(i);
    return n;
  });

  return (
    <div className={`acc ${className}`.trim()}>
      {items.map((it, i) => {
        const isOpen = open.has(i);
        const pid = `${uid}-${i}`;
        return (
          <div className={`acc-item${isOpen ? " open" : ""}`} key={it.q}>
            <button className="acc-btn" aria-expanded={isOpen} aria-controls={pid} onClick={() => toggle(i)}>
              {it.q}<span className="pm" aria-hidden="true" />
            </button>
            <div className="acc-panel" id={pid} role="region">
              <div><div className="inner">{it.content || <p>{it.a}</p>}</div></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
