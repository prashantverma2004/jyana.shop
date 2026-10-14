"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./CartProvider";
import Crop from "./Crop";
import Logo from "./Logo";
import { Icon } from "./Icons";
import { announcements, productUrl, products } from "@/lib/store";

export default function Header() {
  const pathname = usePathname();
  const { count, bump, openCart } = useCart();
  const [ann, setAnn] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const countRef = useRef(null);

  // rotate announcements
  useEffect(() => {
    if (announcements.length < 2) return;
    const t = setInterval(() => setAnn((i) => (i + 1) % announcements.length), 4500);
    return () => clearInterval(t);
  }, []);

  // header border on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // mobile menu
  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", menuOpen);
    document.body.classList.toggle("no-scroll", menuOpen || document.documentElement.classList.contains("cart-open"));
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // cart count bump animation
  useEffect(() => {
    const el = countRef.current;
    if (!bump || !el) return;
    el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump");
  }, [bump]);

  const cur = (href) => (pathname === href ? "page" : undefined);

  return (
    <>
      <div className="announce" role="region" aria-label="Announcements">
        {announcements.map((a, i) => <span key={a} className={i === ann ? "on" : ""}>{a}</span>)}
      </div>
      <header className={`header${scrolled ? " scrolled" : ""}`}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center" }}>
            <button
              className="menu-toggle"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
            ><span /></button>
            <nav className="nav" aria-label="Primary">
              <Link href="/shop" aria-current={cur("/shop")}>Shop</Link>
              <Link href="/about" aria-current={cur("/about")}>About</Link>
              <Link href="/contact" aria-current={cur("/contact")}>Contact</Link>
            </nav>
          </div>
          <Logo />
          <div className="header-actions">
            <button className="cart-btn" onClick={openCart} aria-label="Open cart">
              <span className="hide-sm">Cart</span>
              <Icon name="bag" className="show-sm" width="20" height="20" />
              <span className="cart-count" ref={countRef}>{count}</span>
            </button>
          </div>
        </div>
      </header>
      <div className="mobile-menu" aria-hidden={!menuOpen} inert={!menuOpen ? true : undefined}>
        <nav aria-label="Mobile">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="mm-products">
          {products.map((p) => (
            <Link key={p.id} href={productUrl(p)}>
              <Crop src={p.image} view={p.gallery[1]} alt={p.name} sizes="50vw" />
              <span className="caps">{p.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
