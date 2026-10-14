import Link from "next/link";
import Crop from "./Crop";
import AddToCartButton from "./AddToCartButton";
import { Arrow } from "./Icons";
import { money, productUrl } from "@/lib/store";

export default function ProductCard({ product: p, index }) {
  return (
    <article className="pcard reveal" style={{ "--d": `${index * 0.12}s` }}>
      <Link
        href={productUrl(p)}
        className="pcard-media reveal-img"
        aria-label={p.name}
        style={{ background: p.tone === "sage" ? "var(--sage-soft)" : "var(--cream)" }}
      >
        <span className="pcard-badge">No. 0{index + 1} · {p.size}</span>
        <Crop src={p.image} view={p.gallery[0]} alt={`JYANA ${p.name} — ${p.subtitle}`} />
        <Crop src={p.image} view={p.gallery[1]} className="alt" />
        <span className="pcard-quick">
          <AddToCartButton id={p.id} className="btn light block">Add to cart — {money(p.price)}</AddToCartButton>
        </span>
      </Link>
      <div className="pcard-body">
        <span className="pcard-sub">{p.subtitle}</span>
        <h3><Link href={productUrl(p)}>{p.name}</Link></h3>
        <span className="pcard-price price">{money(p.price)}{p.compareAt && <s>{money(p.compareAt)}</s>}</span>
        <p className="pcard-desc">{p.short}</p>
        <div className="pcard-actions">
          <AddToCartButton id={p.id} />
          <Link className="link" href={productUrl(p)}>Details <Arrow /></Link>
        </div>
      </div>
    </article>
  );
}
