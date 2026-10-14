import Link from "next/link";
import Logo from "./Logo";
import { productUrl, products, store } from "@/lib/store";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-about">
            <Logo />
            <p>Two considered roll-ons for everyday freshness and confidence. Nothing more than you need.</p>
          </div>
          <div>
            <h5>Shop</h5>
            <ul>
              {products.map((p) => <li key={p.id}><Link href={productUrl(p)}>{p.name}</Link></li>)}
              <li><Link href="/shop">All products</Link></li>
            </ul>
          </div>
          <div>
            <h5>JYANA</h5>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h5>Get in touch</h5>
            <ul>
              <li><a href={`mailto:${store.email}`}>{store.email}</a></li>
              {store.phone && <li><a href={`tel:${store.phone.replace(/\s/g, "")}`}>{store.phone}</a></li>}
              {store.instagram && <li><a href={store.instagram} target="_blank" rel="noopener">Instagram</a></li>}
              {store.address && <li>{store.address}</li>}
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-word" aria-hidden="true">JYANA</div>
      <div className="container">
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} JYANA Personal Care. All rights reserved.</span>
          <span>Made for everyday confidence.</span>
        </div>
      </div>
    </footer>
  );
}
