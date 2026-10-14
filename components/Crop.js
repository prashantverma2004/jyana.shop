import Image from "next/image";

/* One photo, many views: the same product shot cropped and zoomed
   via --pos (focal point) and --zoom. */
export default function Crop({ src, view = {}, alt = "", className = "", style, priority = false, sizes = "(max-width: 900px) 100vw, 50vw", imgRef }) {
  return (
    <div
      className={`crop ${className}`.trim()}
      style={{ "--pos": view.pos || "50% 50%", "--zoom": view.zoom || 1, ...style }}
    >
      <Image ref={imgRef} src={src} alt={alt} fill sizes={sizes} {...(priority ? { preload: true, loading: "eager", fetchPriority: "high", quality: 85 } : {})} />
    </div>
  );
}
