import ContactForm from "@/components/ContactForm";
import { store } from "@/lib/store";

export const metadata = {
  title: "Contact",
  description: "Get in touch with JYANA Personal Care."
};

export default function ContactPage() {
  return (
    <section className="page-hero">
      <div className="container contact-grid">
        <div>
          <span className="eyebrow reveal">Contact</span>
          <h1 className="reveal" style={{ "--d": ".1s" }}>We&apos;d love to <em>hear from you</em>.</h1>
          <p className="lead reveal" style={{ "--d": ".2s" }}>Questions about an order, our roll-ons, or anything else — send us a note and we&apos;ll get back to you.</p>
          <div className="contact-cards reveal" style={{ "--d": ".3s" }}>
            <div><span>Email</span><a href={`mailto:${store.email}`}>{store.email}</a></div>
            {store.phone && <div><span>Phone</span><a href={`tel:${store.phone.replace(/\s/g, "")}`}>{store.phone}</a></div>}
            {store.instagram && <div><span>Instagram</span><a href={store.instagram} target="_blank" rel="noopener">Follow JYANA</a></div>}
            {store.address && <div><span>Address</span><p>{store.address}</p></div>}
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
