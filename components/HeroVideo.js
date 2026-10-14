"use client";

import { useEffect, useRef } from "react";

/* Full-screen hero video. React doesn't render the `muted` attribute into
   server HTML, so it's also set on the element here to guarantee autoplay. */
export default function HeroVideo({ src }) {
  const ref = useRef(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  return (
    <section className="hero" aria-label="JYANA Personal Care">
      <video
        ref={ref}
        className="hero-video"
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
    </section>
  );
}
