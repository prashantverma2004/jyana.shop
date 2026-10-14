import Link from "next/link";
import Crop from "@/components/Crop";
import SplitHeading from "@/components/SplitHeading";
import { Hills } from "@/components/Botanical";
import { Arrow } from "@/components/Icons";
import { products } from "@/lib/store";

export const metadata = {
  title: "About",
  description: "JYANA Personal Care makes two considered roll-ons for everyday freshness and confidence."
};

const VALUES = [
  ["Focus", "A small range, so each product gets our full attention — and choosing takes seconds."],
  ["Clarity", "We say what a product does and what's in it, plainly. If it isn't on the pack, we won't claim it here."],
  ["Everyday comfort", "Personal care should fit into real life — quick to use, comfortable to wear, easy to come back to."],
  ["Quiet design", "Soft ivory and sage, botanical line-work and calm, layered hills: packaging made to feel at home in your space."]
];

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow reveal">About JYANA</span>
          <SplitHeading lines={["Less, but", <><em>better</em> made.</>]} />
          <p className="lead reveal" style={{ "--d": ".25s" }}>JYANA Personal Care is a focused personal-care brand. We make two roll-ons — and we&apos;d rather do two things well than many things halfway.</p>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container about-split">
          <div className="media reveal-img"><Crop src={products[0].image} view={{ pos: "55% 50%" }} alt="JYANA Underarm Roll On carton and bottle" /></div>
          <div>
            <span className="eyebrow reveal">Our idea</span>
            <h2 className="reveal" style={{ "--d": ".1s" }}>Everyday care, <em>without the noise</em>.</h2>
            {/* TODO: replace with your own brand story */}
            <p className="reveal" style={{ "--d": ".2s", marginTop: 28 }}>The bathroom shelf has become crowded. Endless variants, long lists of claims, and packaging that shouts. JYANA started from the opposite direction: what does someone actually need to feel fresh and confident, every single day?</p>
            <p className="reveal" style={{ "--d": ".25s" }}>The answer was two roll-ons. An everyday essential made for all skin types, and a natural deodorant roll-on for active days. Each one is clear about what it does, and quietly beautiful enough to leave out on the shelf.</p>
            <Link href="/shop" className="btn reveal" style={{ "--d": ".3s", marginTop: 20 }}>Shop the range <Arrow /></Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow reveal">What guides us</span>
              <h2 className="reveal" style={{ "--d": ".1s" }}>Four simple <em>principles</em>.</h2>
            </div>
          </div>
          <div className="values reveal">
            {VALUES.map(([title, text], i) => (
              <div key={title}><span className="caps" style={{ color: "var(--olive)" }}>0{i + 1}</span><h3>{title}</h3><p>{text}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="statement" style={{ padding: "clamp(100px,13vw,180px) 0 clamp(140px,17vw,240px)" }}>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <SplitHeading as="h2" lines={["Made for", <em key="e">everyday</em>, "confidence."]} />
          <Link href="/shop" className="btn light reveal" style={{ "--d": ".3s", marginTop: 44 }}>Discover the roll-ons <Arrow /></Link>
        </div>
        <Hills base="#3d4336" />
      </section>
    </>
  );
}
