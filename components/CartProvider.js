"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Crop from "./Crop";
import QtyStepper from "./QtyStepper";
import { Arrow, Close } from "./Icons";
import { getProduct, money, productUrl, products } from "@/lib/store";

const KEY = "jyana-cart-v1";
const CartContext = createContext(null);

export const useCart = () => useContext(CartContext);

const readStorage = () => {
  try {
    return (JSON.parse(localStorage.getItem(KEY)) || []).filter((l) => getProduct(l.id));
  } catch {
    return [];
  }
};

export default function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastOn, setToastOn] = useState(false);
  const [bump, setBump] = useState(0);
  const toastTimer = useRef();

  // Load after mount so server and client markup match.
  useEffect(() => {
    setItems(readStorage());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* storage blocked: keep in memory */ }
  }, [items, loaded]);

  useEffect(() => {
    document.documentElement.classList.toggle("cart-open", open);
    document.body.classList.toggle("no-scroll", open || document.documentElement.classList.contains("menu-open"));
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const showToast = useCallback((msg) => {
    setToastMsg(msg);
    setToastOn(true);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastOn(false), 3200);
  }, []);

  const openCart = useCallback(() => { setToastOn(false); setOpen(true); }, []);
  const closeCart = useCallback(() => setOpen(false), []);

  const add = useCallback((id, qty = 1, { openDrawer = false, silent = false } = {}) => {
    setItems((cur) => {
      const found = cur.find((l) => l.id === id);
      if (found) return cur.map((l) => (l.id === id ? { ...l, qty: Math.min(99, l.qty + qty) } : l));
      return [...cur, { id, qty }];
    });
    setBump((n) => n + 1);
    if (openDrawer) openCart();
    else if (!silent) showToast(`${getProduct(id).name} added to your bag`);
  }, [openCart, showToast]);

  const setQty = useCallback((id, qty) => {
    setItems((cur) => (qty <= 0 ? cur.filter((l) => l.id !== id) : cur.map((l) => (l.id === id ? { ...l, qty: Math.min(99, qty) } : l))));
  }, []);

  const count = items.reduce((n, l) => n + l.qty, 0);
  const subtotal = items.reduce((n, l) => n + getProduct(l.id).price * l.qty, 0);

  const value = { items, loaded, count, subtotal, bump, add, setQty, openCart, closeCart };

  return (
    <CartContext.Provider value={value}>
      {children}
      <div className="overlay" onClick={closeCart} />
      <CartDrawer />
      <div className={`toast${toastOn ? " show" : ""}`} role="status" aria-live="polite">
        <span>{toastMsg}</span>
        <button onClick={openCart}>View bag</button>
      </div>
    </CartContext.Provider>
  );
}

function CartDrawer() {
  const { items, subtotal, setQty, add, closeCart } = useCart();
  const missing = products.find((p) => !items.some((l) => l.id === p.id));

  return (
    <aside className="drawer" aria-label="Shopping bag">
      <div className="drawer-head">
        <h3>Your bag</h3>
        <button className="icon-btn" onClick={closeCart} aria-label="Close bag"><Close /></button>
      </div>

      <div className="drawer-body">
        {!items.length ? (
          <div className="empty">
            <h4>Your bag is empty</h4>
            <p>Start with one of our two roll-ons.</p>
            <div className="empty-picks">
              {products.map((p) => (
                <Link key={p.id} href={productUrl(p)} onClick={closeCart}>
                  <Crop src={p.image} view={p.gallery[1]} alt={p.name} sizes="200px" />
                  <b>{p.name}</b>
                  <span>{money(p.price)}</span>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <>
            {items.map((l) => <CartLine key={l.id} line={l} onNavigate={closeCart} setQty={setQty} />)}
            {missing && (
              <div className="upsell">
                <Crop src={missing.image} view={missing.gallery[1]} alt={missing.name} sizes="64px" />
                <p><b>{missing.name}</b>Complete the pair · {money(missing.price)}</p>
                <button onClick={() => add(missing.id, 1, { silent: true })}>Add</button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="drawer-foot">
        {!items.length ? (
          <Link className="btn block" href="/shop" onClick={closeCart}>Shop the range <Arrow /></Link>
        ) : (
          <>
            <div className="subtotal"><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
            <p className="small">Shipping and taxes calculated at checkout.</p>
            <Link className="btn block" href="/checkout" onClick={closeCart}>Checkout <Arrow /></Link>
          </>
        )}
      </div>
    </aside>
  );
}

export function CartLine({ line, setQty, onNavigate, compact = false }) {
  const p = getProduct(line.id);
  return (
    <div className="line">
      <Link href={productUrl(p)} onClick={onNavigate}>
        <Crop src={p.image} view={p.gallery[1]} alt={p.name} sizes="92px" />
      </Link>
      <div>
        <div className="line-top"><h4>{p.name}</h4><span>{money(p.price * line.qty)}</span></div>
        <div className="meta">{compact ? `${p.size} · Qty ${line.qty}` : `${p.subtitle} · ${p.size}`}</div>
        <div className="line-bottom">
          <QtyStepper value={line.qty} min={0} onChange={(v) => setQty(p.id, v)} />
          <button className="remove" onClick={() => setQty(p.id, 0)}>Remove</button>
        </div>
      </div>
    </div>
  );
}
