import { notFound } from "next/navigation";
import Link from "next/link";
import Crop from "@/components/Crop";
import Accordion from "@/components/Accordion";
import AddToCartButton from "@/components/AddToCartButton";
import ProductGallery from "@/components/ProductGallery";
import ProductBuyBox from "@/components/ProductBuyBox";
import IngredientList from "@/components/IngredientList";
import { Arrow, Icon } from "@/components/Icons";
import { getProduct, money, otherProduct, productUrl, products } from "@/lib/store";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const p = getProduct(id);
  if (!p) return {};
  return { title: `${p.name} — ${p.subtitle}`, description: p.short };
}

const strong = { fontWeight: 450, color: "var(--ink)" };

export default async function ProductPage({ params }) {
  const { id } = await params;
  const p = getProduct(id);
  if (!p) notFound();
  const o = otherProduct(p.id);
  const idx = products.indexOf(p);

  const details = [
    { q: "Description", content: <p>{p.description}</p> },
    { q: "Key benefits", content: <ul>{p.benefits.map((b) => <li key={b.title}><b style={strong}>{b.title}</b> — {b.text}</li>)}</ul> },
    {
      q: "Ingredients",
      content: (
        <>
          {p.keyIngredients.length > 0 && <ul>{p.keyIngredients.map((k) => <li key={k.name}><b style={strong}>{k.name}</b> — {k.text}</li>)}</ul>}
          <p style={p.keyIngredients.length ? { marginTop: 14 } : undefined}>{p.ingredientsFull}</p>
        </>
      )
    },
    { q: "How to use", content: <ol>{p.howToUse.map((s) => <li key={s}>{s}</li>)}</ol> },
    { q: "Caution", content: <p>{p.caution}</p> }
  ];

  return (
    <>
      <div className="container">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>/</span><Link href="/shop">Shop</Link><span>/</span><span aria-current="page">{p.name}</span>
        </nav>
        <div className="pdp">
          <ProductGallery product={p} />
          <div className="pdp-info">
            <span className="eyebrow">No. 0{idx + 1} · JYANA Personal Care</span>
            <div className="pdp-sub">{p.subtitle}</div>
            <h1>{p.name}</h1>
            <p className="pdp-tagline">{p.tagline}</p>
            <div className="pdp-price price">{money(p.price)}{p.compareAt && <s>{money(p.compareAt)}</s>}</div>
            <p className="pdp-tax">Inclusive of all taxes</p>
            <p className="pdp-desc">{p.short}</p>
            <ProductBuyBox product={p} />
            <div className="pdp-points">
              {p.benefits.map((b) => <div key={b.title}><Icon name={b.icon} /><span>{b.title}</span></div>)}
            </div>
            <Accordion items={details} openIndex={0} />
          </div>
        </div>
      </div>

      <section className="section tight bg-cream">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow reveal">Key benefits</span>
              <h2 className="reveal" style={{ "--d": ".1s" }}>What it <em>does</em>.</h2>
            </div>
          </div>
          <div className="benefit-row">
            {p.benefits.map((b, i) => (
              <div className="benefit reveal" style={{ "--d": `${i * 0.08}s` }} key={b.title}>
                <div className="icon"><Icon name={b.icon} /></div><h4>{b.title}</h4><p>{b.text}</p>
              </div>
            ))}
            <div className="benefit reveal" style={{ "--d": ".24s" }}>
              <div className="icon"><Icon name="bottle" /></div><h4>{p.size}</h4><p>One size, roll-on bottle for easy, everyday application.</p>
            </div>
          </div>
        </div>
      </section>

      {p.keyIngredients.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="ingredients" style={{ marginTop: 0 }}>
              <div className="ingredients-media reveal-img" style={{ background: "var(--sage-soft)" }}>
                <Crop src={p.image} view={{ pos: "74% 50%", zoom: 1.15 }} alt={`JYANA ${p.name} bottle`} />
              </div>
              <div>
                <span className="eyebrow reveal">Ingredients</span>
                <h2 className="reveal" style={{ "--d": ".1s" }}>What&apos;s <em>inside</em>.</h2>
                <IngredientList items={p.keyIngredients} />
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section bg-sage-mist">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow reveal">How to use</span>
              <h2 className="reveal" style={{ "--d": ".1s" }}>A simple <em>ritual</em>.</h2>
            </div>
            <p className="lead reveal" style={{ "--d": ".2s" }}>Ten seconds, every morning.</p>
          </div>
          <div className="steps">
            {p.howToUse.map((s, i) => (
              <div className="step reveal" style={{ "--d": `${i * 0.08}s` }} key={s}><span className="n">0{i + 1}</span><p>{s}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="related">
            <Link href={productUrl(o)} className="related-media reveal-img" style={{ background: "var(--cream)" }}>
              <Crop src={o.image} view={o.gallery[0]} alt={`JYANA ${o.name}`} />
            </Link>
            <div className="reveal">
              <span className="eyebrow">Complete the pair</span>
              <div className="pdp-sub" style={{ marginTop: 6 }}>{o.subtitle}</div>
              <h2 style={{ margin: "10px 0 18px" }}><Link href={productUrl(o)}>{o.name}</Link></h2>
              <p className="lead" style={{ margin: "0 0 12px" }}>{o.short}</p>
              <div className="pdp-price" style={{ margin: "20px 0 32px" }}>
                {money(o.price)} <span className="small" style={{ fontFamily: "var(--sans)" }}>· {o.size}</span>
              </div>
              <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
                <AddToCartButton id={o.id} />
                <Link className="link" href={productUrl(o)}>View product <Arrow /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
