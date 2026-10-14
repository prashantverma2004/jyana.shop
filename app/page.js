import Link from "next/link";
import Crop from "@/components/Crop";
import ProductCard from "@/components/ProductCard";
import CompareTable from "@/components/CompareTable";
import NewsletterForm from "@/components/NewsletterForm";
import SplitHeading from "@/components/SplitHeading";
import HeroVideo from "@/components/HeroVideo";
import IngredientList from "@/components/IngredientList";
import { Sprig, Hills } from "@/components/Botanical";
import { Arrow, Icon } from "@/components/Icons";
import { productUrl, products } from "@/lib/store";

const MARQUEE = ["Made for everyday confidence", "Underarm Roll On", "For all skin types", "Active Sweat Guard", "Potash Alum", "Witch Hazel", "Tea Tree Oil", "50 ml"];

export default function HomePage() {
  const [a, b] = products;
  const withIng = products.find((p) => p.keyIngredients.length) || b;

  const benefits = [
    { icon: "drop", title: "Controls odour & sweat", text: "Helps you stay feeling fresh and dry through the day.", for: "Both roll-ons" },
    { icon: "leaf", title: "Gentle & skin friendly", text: "Made for all skin types, for everyday comfort.", for: a.name },
    { icon: "shield", title: "Fights odour-causing bacteria", text: "Works on odour where it starts.", for: b.name },
    { icon: "sun", title: "Long lasting freshness", text: "Confidence that keeps up with your day.", for: a.name }
  ];

  return (
    <>
      {/* Hero */}
      <HeroVideo src="/jyana-hero.mp4" />

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE].map((m, i) => <span key={i}>{m}</span>)}
        </div>
      </div>

      {/* Why JYANA */}
      <section className="section" id="why">
        <div className="container">
          <div className="intro-grid">
            <div>
              <span className="eyebrow reveal">Why JYANA</span>
              <h2 className="reveal" style={{ "--d": ".1s" }}>Personal care, <em>pared back</em> to what matters.</h2>
            </div>
            <div className="intro-body reveal" style={{ "--d": ".2s" }}>
              <p>The things you reach for every morning should be considered, honest and quietly beautiful. So instead of a crowded shelf of options, JYANA makes two.</p>
              <p>Each roll-on has one clear job and is made to do it well — so choosing is easy, and using it is easier.</p>
              <Link href="/about" className="link" style={{ marginTop: 12 }}>Our story <Arrow /></Link>
            </div>
          </div>
          <div className="pillars">
            <div className="pillar reveal"><span className="num">01</span><h3>A focused range</h3><p>Two roll-ons, each with a clear purpose. No clutter, no guesswork.</p></div>
            <div className="pillar reveal" style={{ "--d": ".1s" }}><span className="num">02</span><h3>Clear on what&apos;s inside</h3><p>Active Sweat Guard names its hero ingredients — potash alum, witch hazel and tea tree oil — right on the front of the pack.</p></div>
            <div className="pillar reveal" style={{ "--d": ".2s" }}><span className="num">03</span><h3>Made for every day</h3><p>Simple roll-on application in a 50 ml bottle, designed to slip into any routine.</p></div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section bg-cream" id="shop">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow reveal">The range</span>
              <h2 className="reveal" style={{ "--d": ".1s" }}>Two roll-ons.<br /><em>One</em> for every day.</h2>
            </div>
            <p className="lead reveal" style={{ "--d": ".2s" }}>Choose the everyday essential, the active-day guard — or keep both close.</p>
          </div>
          <div className="product-grid">
            {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>

          <div id="compare" style={{ marginTop: "clamp(80px,10vw,140px)", scrollMarginTop: 120 }}>
            <div className="section-head" style={{ marginBottom: 32 }}>
              <h3 className="reveal">Find your <em>roll-on</em></h3>
            </div>
            <CompareTable />
          </div>
        </div>
      </section>

      {/* Benefits & ingredients */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow reveal">What they do</span>
              <h2 className="reveal" style={{ "--d": ".1s" }}>Freshness, <em>considered</em>.</h2>
            </div>
            <p className="lead reveal" style={{ "--d": ".2s" }}>Every benefit here is taken from our packs — nothing added, nothing overstated.</p>
          </div>
          <div className="benefit-row">
            {benefits.map((x, i) => (
              <div className="benefit reveal" style={{ "--d": `${i * 0.08}s` }} key={x.title}>
                <div className="icon"><Icon name={x.icon} /></div>
                <h4>{x.title}</h4>
                <p>{x.text}</p>
                <span className="for">{x.for}</span>
              </div>
            ))}
          </div>

          <div className="ingredients">
            <div className="ingredients-media reveal-img">
              <Crop src={withIng.image} view={{ pos: "74% 50%", zoom: 1.15 }} style={{ background: "var(--sage-soft)" }}
                alt={`JYANA ${withIng.name} bottle listing its key ingredients`} />
              <Sprig className="botanical" ribs />
            </div>
            <div>
              <span className="eyebrow reveal">Inside the formula</span>
              <h2 className="reveal" style={{ "--d": ".1s" }}>Inside <em>{withIng.name}</em></h2>
              <p className="lead reveal" style={{ "--d": ".2s", marginTop: 20 }}>Three hero ingredients, named plainly on the front of the pack.</p>
              <IngredientList items={withIng.keyIngredients} />
              <Link className="link reveal" href={productUrl(withIng)} style={{ marginTop: 36 }}>Explore the product <Arrow /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className="statement" aria-label="Brand statement">
        <Sprig className="sprig l" />
        <Sprig className="sprig r" leaves={6} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <span className="eyebrow plain reveal">JYANA Personal Care</span>
          <SplitHeading as="h2" lines={["Made for", <em key="e">everyday</em>, "confidence."]} />
          <p className="reveal" style={{ "--d": ".3s" }}>From the first meeting to the last ride home — two roll-ons that help you feel fresh, so you can think about everything else.</p>
          <Link href="/shop" className="btn light reveal" style={{ "--d": ".4s" }}>Shop the range <Arrow /></Link>
        </div>
        <Hills base="#e4dacb" />
      </section>

      {/* Newsletter */}
      <section className="section bg-sand newsletter">
        <div className="container">
          <span className="eyebrow plain reveal">Stay in touch</span>
          <h2 className="reveal" style={{ "--d": ".1s" }}>Join the <em>JYANA</em> circle.</h2>
          <p className="reveal" style={{ "--d": ".2s" }}>Occasional notes on new arrivals and everyday care. No clutter — just like our range.</p>
          <div className="reveal" style={{ "--d": ".3s" }}><NewsletterForm /></div>
        </div>
      </section>
    </>
  );
}
