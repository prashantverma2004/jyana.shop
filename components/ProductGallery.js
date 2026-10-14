"use client";

import { useEffect, useRef, useState } from "react";
import Crop from "./Crop";
import { ChevronLeft, ChevronRight } from "./Icons";

export default function ProductGallery({ product: p }) {
  const g = p.gallery;
  const [cur, setCur] = useState(0);
  const [shown, setShown] = useState(0);   // the view actually displayed (lags `cur` for the fade)
  const [fading, setFading] = useState(false);
  const stageRef = useRef(null);
  const imgRef = useRef(null);
  const touchX = useRef(null);
  const canHover = useRef(false);

  useEffect(() => {
    canHover.current = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  const show = (i) => {
    const next = (i + g.length) % g.length;
    setCur(next);
    setFading(true);
    setTimeout(() => { setShown(next); setFading(false); }, 220);
  };

  const onMove = (e) => {
    const img = imgRef.current;
    if (!canHover.current || !img || e.target.closest(".stage-nav")) return;
    const r = stageRef.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    stageRef.current.classList.add("zooming");
    img.style.transformOrigin = `${x}% ${y}%`;
    img.style.transform = `scale(${Math.max(1.8, g[shown].zoom * 1.5)})`;
  };
  const onLeave = () => {
    const img = imgRef.current;
    stageRef.current.classList.remove("zooming");
    if (img) { img.style.transformOrigin = ""; img.style.transform = ""; }
  };

  return (
    <div className="gallery">
      <div className="thumbs" role="tablist" aria-label="Product images">
        {g.map((v, i) => (
          <button key={i} className="thumb" role="tab" aria-selected={i === cur} aria-label={v.label} onClick={() => show(i)}>
            <Crop src={p.image} view={v} sizes="84px" />
          </button>
        ))}
      </div>
      <div
        className="stage"
        ref={stageRef}
        style={{ background: p.tone === "sage" ? "var(--sage-soft)" : "var(--cream)" }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) show(cur + (dx < 0 ? 1 : -1));
          touchX.current = null;
        }}
      >
        <Crop
          src={p.image}
          view={g[shown]}
          alt={`JYANA ${p.name} — ${g[shown].label}`}
          priority
          sizes="(max-width: 900px) 100vw, 55vw"
          imgRef={imgRef}
          className={fading ? "is-fading" : ""}
        />
        <button className="stage-nav prev" aria-label="Previous image" onClick={() => show(cur - 1)}><ChevronLeft /></button>
        <button className="stage-nav next" aria-label="Next image" onClick={() => show(cur + 1)}><ChevronRight /></button>
        <span className="stage-count">{cur + 1} / {g.length}</span>
      </div>
    </div>
  );
}
