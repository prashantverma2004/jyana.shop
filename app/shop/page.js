import Link from "next/link";
import Crop from "@/components/Crop";
import AddToCartButton from "@/components/AddToCartButton";
import CompareTable from "@/components/CompareTable";
import SplitHeading from "@/components/SplitHeading";
import { Arrow, Icon } from "@/components/Icons";
import { money, productUrl, products } from "@/lib/store";

export const metadata = {
  title: "Shop",
  description: "Shop the JYANA range: Underarm Roll On for all skin types and Active Sweat Guard natural deodorant roll-on. 50 ml each."
};

export default function ShopPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow reveal">Shop</span>
          <SplitHeading lines={["The JYANA", <><em>range</em>.</>]} />
          <p className="lead reveal" style={{ "--d": ".25s" }}>Two roll-ons, each made for a clear purpose. Pick the one that fits your day — or keep both close.</p>
        </div>
      </section>

      <section style={{ paddingBottom: "clamp(64px,8vw,120px)" }}>
        <div className="container">
          {products.map((p, i) => (
            <div className={`shop-row${i % 2 ? " rev" : ""}`} key={p.id}>
              <Link href={productUrl(p)} className="shop-media reveal-img" style={{ background: "var(--cream)" }}>
                <Crop src={p.image} view={p.gallery[0]} alt={`JYANA ${p.name}`} priority={i === 0} />
              </Link>
              <div className="shop-info reveal">
                <span className="eyebrow plain">No. 0{i + 1}</span>
                <span className="sub" style={{ display: "block" }}>{p.subtitle}</span>
                <h2><Link href={productUrl(p)}>{p.name}</Link></h2>
                <span className="price">
                  {money(p.price)}{p.compareAt && <s>{money(p.compareAt)}</s>}{" "}
                  <span className="small" style={{ fontFamily: "var(--sans)" }}>· {p.size}</span>
                </span>
                <p>{p.description}</p>
                <ul>{p.benefits.map((x) => <li key={x.title}><Icon name={x.icon} />{x.title}</li>)}</ul>
                <div className="actions">
                  <AddToCartButton id={p.id} />
                  <Link className="link" href={productUrl(p)}>View product <Arrow /></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow reveal">Side by side</span>
              <h2 className="reveal" style={{ "--d": ".1s" }}>Find your <em>roll-on</em>.</h2>
            </div>
            <p className="lead reveal" style={{ "--d": ".2s" }}>Not sure which to choose? Here&apos;s how they compare.</p>
          </div>
          <CompareTable />
        </div>
      </section>
    </>
  );
}
