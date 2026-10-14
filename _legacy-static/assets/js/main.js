/* =====================================================================
   JYANA — site behaviour
   Shared chrome (announcement, header, footer, cart drawer), the cart,
   and page renderers that read from assets/js/data.js.
   ===================================================================== */
(function () {
  "use strict";

  const D = window.JYANA;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const page = document.body.dataset.page || "";

  /* ---------- Helpers ---------- */
  const money = (n) => D.store.currency + Number(n).toLocaleString("en-IN");
  const getProduct = (id) => D.products.find((p) => p.id === id);
  const other = (id) => D.products.find((p) => p.id !== id);
  const productUrl = (p) => `product.html?id=${p.id}`;
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const crop = (src, v = {}, alt = "", cls = "", eager = false) =>
    `<div class="crop ${cls}" style="--pos:${v.pos || "50% 50%"};--zoom:${v.zoom || 1}">
       <img src="${src}" alt="${esc(alt)}" ${eager ? "" : 'loading="lazy"'} decoding="async">
     </div>`;

  const I = {
    drop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M12 3.5c3 4 6 7.4 6 10.8A6 6 0 0 1 6 14.3C6 10.9 9 7.5 12 3.5Z"/><path d="M9.2 14.6a2.9 2.9 0 0 0 2.6 2.6"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M5 19C5 10 10 5 19 5c0 9-5 14-14 14Z"/><path d="M5 19 14 10"/><path d="M9.5 14.5h3.5M11.8 12.2v-3"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M12 3.5 19 6v5.6c0 4.3-2.9 7.5-7 8.9-4.1-1.4-7-4.6-7-8.9V6l7-2.5Z"/><path d="m9 12 2.2 2.2L15.5 10"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"/></svg>',
    bottle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="8" y="2.5" width="8" height="6.5" rx="1"/><rect x="7" y="9" width="10" height="12.5" rx="1.5"/><path d="M10 14h4"/></svg>',
    arrow: '<svg class="arrow" width="16" height="10" viewBox="0 0 16 10" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M0 5h14.5M10.5 1l4 4-4 4"/></svg>',
    close: '<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M2 2l14 14M16 2 2 16"/></svg>',
    chevL: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M10 2 4 8l6 6"/></svg>',
    chevR: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2"><path d="m6 2 6 6-6 6"/></svg>'
  };
  window.JYANA_ICONS = I;

  /* ---------- Cart (localStorage) ---------- */
  const KEY = "jyana-cart-v1";
  const Cart = {
    read() {
      try { return (JSON.parse(localStorage.getItem(KEY)) || []).filter((l) => getProduct(l.id)); } catch (e) { return this._mem || []; }
    },
    write(items) {
      this._mem = items;
      try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) { /* storage blocked: keep in memory */ }
      renderCart();
    },
    add(id, qty = 1) {
      const items = this.read();
      const line = items.find((l) => l.id === id);
      if (line) line.qty = Math.min(99, line.qty + qty); else items.push({ id, qty });
      this.write(items);
    },
    set(id, qty) {
      let items = this.read();
      if (qty <= 0) items = items.filter((l) => l.id !== id);
      else items.forEach((l) => { if (l.id === id) l.qty = Math.min(99, qty); });
      this.write(items);
    },
    count() { return this.read().reduce((n, l) => n + l.qty, 0); },
    subtotal() { return this.read().reduce((n, l) => n + getProduct(l.id).price * l.qty, 0); }
  };
  window.JYANA_CART = Cart;

  /* ---------- Chrome ---------- */
  const logo = `<a href="index.html" class="logo" aria-label="JYANA Personal Care — home"><span class="logo-word">JYANA</span><span class="logo-sub">Personal Care</span></a>`;

  function renderChrome() {
    const header = $("#site-header");
    if (header) {
      const cur = (p) => (page === p ? 'aria-current="page"' : "");
      header.outerHTML = `
        <div class="announce" role="region" aria-label="Announcements">
          ${D.announcements.map((a, i) => `<span class="${i === 0 ? "on" : ""}">${esc(a)}</span>`).join("")}
        </div>
        <header class="header" id="header">
          <div class="container">
            <div style="display:flex;align-items:center">
              <button class="menu-toggle" aria-label="Open menu" aria-expanded="false" id="menuToggle"><span></span></button>
              <nav class="nav" aria-label="Primary">
                <a href="shop.html" ${cur("shop")}>Shop</a>
                <a href="about.html" ${cur("about")}>About</a>
                <a href="contact.html" ${cur("contact")}>Contact</a>
              </nav>
            </div>
            ${logo}
            <div class="header-actions">
              <button class="cart-btn" data-open-cart aria-label="Open cart">
                <span class="hide-sm">Cart</span>
                <svg class="show-sm" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M5 8h14l-1.2 12.5H6.2L5 8Z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/></svg>
                <span class="cart-count" id="cartCount">0</span>
              </button>
            </div>
          </div>
        </header>
        <div class="mobile-menu" id="mobileMenu" aria-hidden="true">
          <nav aria-label="Mobile">
            <a href="index.html">Home</a>
            <a href="shop.html">Shop</a>
            <a href="about.html">About</a>
            <a href="contact.html">Contact</a>
          </nav>
          <div class="mm-products">
            ${D.products.map((p) => `<a href="${productUrl(p)}">${crop(p.image, p.gallery[1], p.name)}<span class="caps">${esc(p.name)}</span></a>`).join("")}
          </div>
        </div>`;
    }

    const footer = $("#site-footer");
    if (footer) {
      const s = D.store;
      footer.outerHTML = `
        <footer class="footer">
          <div class="container">
            <div class="footer-top">
              <div class="footer-about">
                ${logo}
                <p>Two considered roll-ons for everyday freshness and confidence. Nothing more than you need.</p>
              </div>
              <div>
                <h5>Shop</h5>
                <ul>
                  ${D.products.map((p) => `<li><a href="${productUrl(p)}">${esc(p.name)}</a></li>`).join("")}
                  <li><a href="shop.html">All products</a></li>
                </ul>
              </div>
              <div>
                <h5>JYANA</h5>
                <ul>
                  <li><a href="about.html">About</a></li>
                  <li><a href="index.html#faq">FAQ</a></li>
                  <li><a href="contact.html">Contact</a></li>
                </ul>
              </div>
              <div>
                <h5>Get in touch</h5>
                <ul>
                  <li><a href="mailto:${esc(s.email)}">${esc(s.email)}</a></li>
                  ${s.phone ? `<li><a href="tel:${esc(s.phone.replace(/\s/g, ""))}">${esc(s.phone)}</a></li>` : ""}
                  ${s.instagram ? `<li><a href="${esc(s.instagram)}" target="_blank" rel="noopener">Instagram</a></li>` : ""}
                  ${s.address ? `<li>${esc(s.address)}</li>` : ""}
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-word" aria-hidden="true">JYANA</div>
          <div class="container">
            <div class="footer-bottom">
              <span>© ${new Date().getFullYear()} JYANA Personal Care. All rights reserved.</span>
              <span>Made for everyday confidence.</span>
            </div>
          </div>
        </footer>`;
    }

    document.body.insertAdjacentHTML("beforeend", `
      <div class="overlay" data-close-cart></div>
      <aside class="drawer" id="drawer" aria-label="Shopping bag" aria-hidden="true">
        <div class="drawer-head"><h3>Your bag</h3><button class="icon-btn" data-close-cart aria-label="Close bag">${I.close}</button></div>
        <div class="drawer-body" id="drawerBody"></div>
        <div class="drawer-foot" id="drawerFoot"></div>
      </aside>
      <div class="toast" id="toast" role="status" aria-live="polite"><span id="toastMsg"></span><button data-open-cart>View bag</button></div>`);
  }

  function renderCart() {
    const items = Cart.read();
    const count = Cart.count();
    const cc = $("#cartCount");
    if (cc) cc.textContent = count;

    const body = $("#drawerBody"), foot = $("#drawerFoot");
    if (!body) return;

    if (!items.length) {
      body.innerHTML = `
        <div class="empty">
          <h4>Your bag is empty</h4>
          <p>Start with one of our two roll-ons.</p>
          <div class="empty-picks">
            ${D.products.map((p) => `<a href="${productUrl(p)}">${crop(p.image, p.gallery[1], p.name)}<b>${esc(p.name)}</b><span>${money(p.price)}</span></a>`).join("")}
          </div>
        </div>`;
      foot.innerHTML = `<a class="btn block" href="shop.html">Shop the range ${I.arrow}</a>`;
    } else {
      body.innerHTML = items.map((l) => {
        const p = getProduct(l.id);
        return `
          <div class="line">
            <a href="${productUrl(p)}">${crop(p.image, p.gallery[1], p.name)}</a>
            <div>
              <div class="line-top"><h4>${esc(p.name)}</h4><span>${money(p.price * l.qty)}</span></div>
              <div class="meta">${esc(p.subtitle)} · ${esc(p.size)}</div>
              <div class="line-bottom">
                ${qtyHtml(l.qty, p.id)}
                <button class="remove" data-remove="${p.id}">Remove</button>
              </div>
            </div>
          </div>`;
      }).join("");

      const missing = D.products.find((p) => !items.some((l) => l.id === p.id));
      if (missing) {
        body.insertAdjacentHTML("beforeend", `
          <div class="upsell">
            ${crop(missing.image, missing.gallery[1], missing.name)}
            <p><b>${esc(missing.name)}</b>Complete the pair · ${money(missing.price)}</p>
            <button data-add="${missing.id}">Add</button>
          </div>`);
      }

      foot.innerHTML = `
        <div class="subtotal"><span>Subtotal</span><strong>${money(Cart.subtotal())}</strong></div>
        <p class="small">Shipping and taxes calculated at checkout.</p>
        <a class="btn block" href="checkout.html">Checkout ${I.arrow}</a>`;
    }
  }

  const qtyHtml = (q, id, cls = "") => `
    <div class="qty ${cls}" ${id ? `data-qty="${id}"` : ""}>
      <button type="button" data-step="-1" aria-label="Decrease quantity">−</button>
      <input type="number" min="1" max="99" value="${q}" aria-label="Quantity" inputmode="numeric">
      <button type="button" data-step="1" aria-label="Increase quantity">+</button>
    </div>`;

  const openCart = () => {
    document.documentElement.classList.add("cart-open");
    document.body.classList.add("no-scroll");
    $("#drawer").setAttribute("aria-hidden", "false");
    hideToast();
  };
  const closeCart = () => {
    document.documentElement.classList.remove("cart-open");
    document.body.classList.remove("no-scroll");
    $("#drawer").setAttribute("aria-hidden", "true");
  };

  let toastT;
  const toast = (msg) => {
    $("#toastMsg").textContent = msg;
    $("#toast").classList.add("show");
    clearTimeout(toastT);
    toastT = setTimeout(hideToast, 3200);
  };
  const hideToast = () => $("#toast") && $("#toast").classList.remove("show");

  function addToCart(id, qty = 1, btn, { open = false } = {}) {
    Cart.add(id, qty);
    const cc = $("#cartCount");
    cc.classList.remove("bump"); void cc.offsetWidth; cc.classList.add("bump");
    if (btn) {
      const html = btn.innerHTML;
      btn.classList.add("is-added");
      btn.innerHTML = "Added";
      setTimeout(() => { btn.classList.remove("is-added"); btn.innerHTML = html; }, 1400);
    }
    if (open) openCart(); else toast(`${getProduct(id).name} added to your bag`);
  }

  /* ---------- Global events ---------- */
  function bindGlobal() {
    document.addEventListener("click", (e) => {
      const t = e.target.closest("[data-open-cart],[data-close-cart],[data-add],[data-remove],[data-step],#menuToggle,.acc-btn");
      if (!t) return;

      if (t.matches("[data-open-cart]")) { e.preventDefault(); openCart(); }
      else if (t.matches("[data-close-cart]")) closeCart();
      else if (t.matches("[data-add]")) {
        e.preventDefault();
        const scope = t.closest("[data-buy-scope]");
        const qty = scope ? Math.max(1, parseInt($(".qty input", scope)?.value, 10) || 1) : 1;
        addToCart(t.dataset.add, qty, t.classList.contains("btn") ? t : null, { open: t.closest(".drawer") != null });
      }
      else if (t.matches("[data-remove]")) Cart.set(t.dataset.remove, 0);
      else if (t.matches("[data-step]")) {
        const box = t.closest(".qty"), input = $("input", box);
        const v = Math.max(box.dataset.qty ? 0 : 1, Math.min(99, (parseInt(input.value, 10) || 1) + Number(t.dataset.step)));
        input.value = v;
        if (box.dataset.qty) Cart.set(box.dataset.qty, v);
        syncCheckout();
      }
      else if (t.id === "menuToggle") {
        const open = document.documentElement.classList.toggle("menu-open");
        t.setAttribute("aria-expanded", open);
        t.setAttribute("aria-label", open ? "Close menu" : "Open menu");
        $("#mobileMenu").setAttribute("aria-hidden", !open);
        document.body.classList.toggle("no-scroll", open);
      }
      else if (t.matches(".acc-btn")) {
        const item = t.closest(".acc-item");
        const open = item.classList.toggle("open");
        t.setAttribute("aria-expanded", open);
      }
    });

    document.addEventListener("change", (e) => {
      const box = e.target.closest(".qty[data-qty]");
      if (box) { Cart.set(box.dataset.qty, Math.max(0, parseInt(e.target.value, 10) || 0)); syncCheckout(); }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeCart();
        if (document.documentElement.classList.contains("menu-open")) $("#menuToggle").click();
      }
    });

    // header border on scroll
    const header = $("#header");
    const onScroll = () => header && header.classList.toggle("scrolled", window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // announcement rotation
    const ann = $$(".announce span");
    if (ann.length > 1) {
      let i = 0;
      setInterval(() => { ann[i].classList.remove("on"); i = (i + 1) % ann.length; ann[i].classList.add("on"); }, 4500);
    }

    // newsletter forms (front-end only — connect your email provider here)
    $$("[data-newsletter]").forEach((f) => f.addEventListener("submit", (e) => {
      e.preventDefault();
      const note = $(".form-note", f.parentElement);
      const email = $("input", f).value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { note.textContent = "Please enter a valid email address."; note.classList.remove("ok"); return; }
      // TODO: send `email` to Mailchimp / Klaviyo / your backend here.
      note.textContent = "Thank you — you're on the list.";
      note.classList.add("ok");
      f.reset();
    }));
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    const els = $$(".reveal, .reveal-img, [data-split]");
    if (!("IntersectionObserver" in window)) { els.forEach((el) => el.classList.add("in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach((el) => io.observe(el));
  }

  /* ---------- Shared blocks ---------- */
  function productCard(p, i) {
    return `
      <article class="pcard reveal" style="--d:${i * 0.12}s">
        <a href="${productUrl(p)}" class="pcard-media reveal-img" aria-label="${esc(p.name)}" style="background:${p.tone === "sage" ? "var(--sage-soft)" : "var(--cream)"}">
          <span class="pcard-badge">No. 0${i + 1} · ${esc(p.size)}</span>
          ${crop(p.image, p.gallery[0], `JYANA ${p.name} — ${p.subtitle}`)}
          ${crop(p.image, p.gallery[1], "", "alt")}
          <span class="pcard-quick"><button class="btn light block" data-add="${p.id}">Add to cart — ${money(p.price)}</button></span>
        </a>
        <div class="pcard-body">
          <span class="pcard-sub">${esc(p.subtitle)}</span>
          <h3><a href="${productUrl(p)}">${esc(p.name)}</a></h3>
          <span class="pcard-price price">${money(p.price)}${p.compareAt ? `<s>${money(p.compareAt)}</s>` : ""}</span>
          <p class="pcard-desc">${esc(p.short)}</p>
          <div class="pcard-actions">
            <button class="btn" data-add="${p.id}">Add to cart</button>
            <a class="link" href="${productUrl(p)}">Details ${I.arrow}</a>
          </div>
        </div>
      </article>`;
  }

  function compareTable() {
    const [a, b] = D.products;
    const ing = (p) => p.keyIngredients.length ? p.keyIngredients.map((k) => k.name).join(", ") : "See pack for full list";
    const row = (label, fa, fb) => `<div class="compare-row"><span>${label}</span><span>${fa}</span><span>${fb}</span></div>`;
    return `
      <div class="compare reveal">
        <div class="compare-row head"><span>Compare</span><span>${esc(a.name)}</span><span>${esc(b.name)}</span></div>
        ${row("Made for", "Everyday use, all skin types", "Active days")}
        ${row("Type", esc(a.subtitle), esc(b.subtitle))}
        ${row("Focus", a.benefits.map((x) => esc(x.title)).join(" · "), b.benefits.slice(0, 2).map((x) => esc(x.title)).join(" · "))}
        ${row("Key ingredients", esc(ing(a)), esc(ing(b)))}
        ${row("Size", esc(a.size), esc(b.size))}
        ${row("Price", money(a.price), money(b.price))}
      </div>`;
  }

  function accordion(items, cls = "") {
    return `<div class="acc ${cls}">${items.map((it, i) => `
      <div class="acc-item${it.open ? " open" : ""}">
        <button class="acc-btn" aria-expanded="${!!it.open}" aria-controls="acc-${cls}-${i}">${esc(it.q)}<span class="pm" aria-hidden="true"></span></button>
        <div class="acc-panel" id="acc-${cls}-${i}" role="region"><div><div class="inner">${it.html || `<p>${esc(it.a)}</p>`}</div></div></div>
      </div>`).join("")}</div>`;
  }

  function reviewsHtml() {
    return D.reviews.map((r, i) => `
      <figure class="review reveal" style="--d:${i * 0.1}s;margin:0">
        ${r.placeholder ? '<span class="sample-tag">Sample</span>' : ""}
        <div class="q" aria-hidden="true">“</div>
        <blockquote>${esc(r.quote)}</blockquote>
        <footer><div><b>${esc(r.name)}</b><span>${esc(r.detail)}</span></div><span class="for">${esc(r.product)}</span></footer>
      </figure>`).join("");
  }

  /* ---------- Page: Home ---------- */
  function renderHome() {
    const [a, b] = D.products;
    $("#homeProducts").innerHTML = D.products.map(productCard).join("");
    $("#compare").innerHTML = compareTable();

    const benefits = [
      { icon: "drop", title: "Controls odour & sweat", text: "Helps you stay feeling fresh and dry through the day.", for: "Both roll-ons" },
      { icon: "leaf", title: "Gentle & skin friendly", text: "Made for all skin types, for everyday comfort.", for: a.name },
      { icon: "shield", title: "Fights odour-causing bacteria", text: "Works on odour where it starts.", for: b.name },
      { icon: "sun", title: "Long lasting freshness", text: "Confidence that keeps up with your day.", for: a.name }
    ];
    $("#benefits").innerHTML = benefits.map((x, i) => `
      <div class="benefit reveal" style="--d:${i * 0.08}s">
        <div class="icon">${I[x.icon]}</div>
        <h4>${esc(x.title)}</h4>
        <p>${esc(x.text)}</p>
        <span class="for">${esc(x.for)}</span>
      </div>`).join("");

    const withIng = D.products.find((p) => p.keyIngredients.length) || b;
    $("#ingName").textContent = withIng.name;
    $("#ingLink").href = productUrl(withIng);
    $("#ingList").innerHTML = withIng.keyIngredients.map((k, i) => `
      <div class="ing reveal" style="--d:${i * 0.1}s"><span class="n">0${i + 1}</span><div><h4>${esc(k.name)}</h4><p>${esc(k.text)}</p></div></div>`).join("");

    $("#reviews").innerHTML = reviewsHtml();
    $("#faqList").innerHTML = accordion(D.faq.map((f, i) => ({ ...f, open: i === 0 })), "faq");

    const tag = $("#heroTag");
    if (tag) { tag.href = productUrl(a); $("#heroTagPrice").textContent = `${a.size} · ${money(a.price)}`; }
  }

  /* ---------- Page: Shop ---------- */
  function renderShop() {
    $("#shopRows").innerHTML = D.products.map((p, i) => `
      <div class="shop-row ${i % 2 ? "rev" : ""}">
        <a href="${productUrl(p)}" class="shop-media reveal-img" style="background:var(--cream)">${crop(p.image, p.gallery[0], `JYANA ${p.name}`)}</a>
        <div class="shop-info reveal">
          <span class="eyebrow plain">No. 0${i + 1}</span>
          <span class="sub" style="display:block">${esc(p.subtitle)}</span>
          <h2><a href="${productUrl(p)}">${esc(p.name)}</a></h2>
          <span class="price">${money(p.price)}${p.compareAt ? `<s>${money(p.compareAt)}</s>` : ""} <span class="small" style="font-family:var(--sans)">· ${esc(p.size)}</span></span>
          <p>${esc(p.description)}</p>
          <ul>${p.benefits.map((x) => `<li>${I[x.icon] || I.leaf}${esc(x.title)}</li>`).join("")}</ul>
          <div class="actions">
            <button class="btn" data-add="${p.id}">Add to cart</button>
            <a class="link" href="${productUrl(p)}">View product ${I.arrow}</a>
          </div>
        </div>
      </div>`).join("");
    $("#compare").innerHTML = compareTable();
  }

  /* ---------- Page: Product ---------- */
  function renderProduct() {
    const id = new URLSearchParams(location.search).get("id");
    const p = getProduct(id) || D.products[0];
    const o = other(p.id);
    const idx = D.products.indexOf(p);
    document.title = `${p.name} — ${p.subtitle} | JYANA Personal Care`;
    const md = $('meta[name="description"]'); if (md) md.content = p.short;

    $("#crumbName").textContent = p.name;

    // Gallery
    const g = p.gallery;
    $("#gallery").innerHTML = `
      <div class="thumbs" role="tablist" aria-label="Product images">
        ${g.map((v, i) => `<button class="thumb" role="tab" aria-selected="${i === 0}" aria-label="${esc(v.label)}" data-i="${i}">${crop(p.image, v, "")}</button>`).join("")}
      </div>
      <div class="stage" id="stage" style="background:${p.tone === "sage" ? "var(--sage-soft)" : "var(--cream)"}">
        ${crop(p.image, g[0], `JYANA ${p.name} — ${g[0].label}`, "", true)}
        <button class="stage-nav prev" aria-label="Previous image">${I.chevL}</button>
        <button class="stage-nav next" aria-label="Next image">${I.chevR}</button>
        <span class="stage-count" id="stageCount">1 / ${g.length}</span>
      </div>`;
    initGallery(p);

    // Info
    const accItems = [
      { q: "Description", html: `<p>${esc(p.description)}</p>`, open: true },
      { q: "Key benefits", html: `<ul>${p.benefits.map((b) => `<li><b style="font-weight:450;color:var(--ink)">${esc(b.title)}</b> — ${esc(b.text)}</li>`).join("")}</ul>` },
      { q: "Ingredients", html: `${p.keyIngredients.length ? `<ul>${p.keyIngredients.map((k) => `<li><b style="font-weight:450;color:var(--ink)">${esc(k.name)}</b> — ${esc(k.text)}</li>`).join("")}</ul><p style="margin-top:14px">` : "<p>"}${esc(p.ingredientsFull)}</p>` },
      { q: "How to use", html: `<ol>${p.howToUse.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>` },
      { q: "Caution", html: `<p>${esc(p.caution)}</p>` }
    ];
    $("#pdpInfo").innerHTML = `
      <span class="eyebrow">No. 0${idx + 1} · JYANA Personal Care</span>
      <div class="pdp-sub">${esc(p.subtitle)}</div>
      <h1>${esc(p.name)}</h1>
      <p class="pdp-tagline">${esc(p.tagline)}</p>
      <div class="pdp-price price">${money(p.price)}${p.compareAt ? `<s>${money(p.compareAt)}</s>` : ""}</div>
      <p class="pdp-tax">Inclusive of all taxes</p>
      <p class="pdp-desc">${esc(p.short)}</p>
      <div data-buy-scope>
        <span class="opt-label">Size</span>
        <div class="sizes"><span class="size-pill" aria-current="true">${esc(p.size)}</span></div>
        <span class="opt-label">Quantity</span>
        <div class="buy">
          ${qtyHtml(1, null, "lg")}
          <button class="btn" data-add="${p.id}" id="mainAdd">Add to cart — ${money(p.price)}</button>
        </div>
        <button class="btn outline block" id="buyNow">Buy now</button>
      </div>
      <div class="pdp-points">
        ${p.benefits.map((b) => `<div>${I[b.icon] || I.leaf}<span>${esc(b.title)}</span></div>`).join("")}
      </div>
      ${accordion(accItems, "compact")}`;

    $("#buyNow").addEventListener("click", () => {
      const qty = Math.max(1, parseInt($("#pdpInfo .qty input").value, 10) || 1);
      Cart.add(p.id, qty);
      location.href = "checkout.html";
    });

    // Benefits band
    $("#pdpBenefits").innerHTML = p.benefits.map((b, i) => `
      <div class="benefit reveal" style="--d:${i * 0.08}s"><div class="icon">${I[b.icon] || I.leaf}</div><h4>${esc(b.title)}</h4><p>${esc(b.text)}</p></div>`).join("") +
      `<div class="benefit reveal" style="--d:.24s"><div class="icon">${I.bottle}</div><h4>${esc(p.size)}</h4><p>One size, roll-on bottle for easy, everyday application.</p></div>`;

    // Ingredients block (only if listed)
    const ingSec = $("#pdpIngredients");
    if (p.keyIngredients.length) {
      $("#pdpIngList").innerHTML = p.keyIngredients.map((k, i) => `
        <div class="ing reveal" style="--d:${i * 0.1}s"><span class="n">0${i + 1}</span><div><h4>${esc(k.name)}</h4><p>${esc(k.text)}</p></div></div>`).join("");
      $("#pdpIngMedia").innerHTML = crop(p.image, { pos: "74% 50%", zoom: 1.15 }, `JYANA ${p.name} bottle`);
    } else {
      ingSec.remove();
    }

    // How to use
    $("#pdpSteps").innerHTML = p.howToUse.map((s, i) => `
      <div class="step reveal" style="--d:${i * 0.08}s"><span class="n">0${i + 1}</span><p>${esc(s)}</p></div>`).join("");

    // Related
    $("#related").innerHTML = `
      <a href="${productUrl(o)}" class="related-media reveal-img" style="background:var(--cream)">${crop(o.image, o.gallery[0], `JYANA ${o.name}`)}</a>
      <div class="reveal">
        <span class="eyebrow">Complete the pair</span>
        <div class="pdp-sub" style="margin-top:6px">${esc(o.subtitle)}</div>
        <h2 style="margin:10px 0 18px"><a href="${productUrl(o)}">${esc(o.name)}</a></h2>
        <p class="lead" style="margin:0 0 12px">${esc(o.short)}</p>
        <div class="pdp-price" style="margin:20px 0 32px">${money(o.price)} <span class="small" style="font-family:var(--sans)">· ${esc(o.size)}</span></div>
        <div style="display:flex;gap:24px;align-items:center;flex-wrap:wrap">
          <button class="btn" data-add="${o.id}">Add to cart</button>
          <a class="link" href="${productUrl(o)}">View product ${I.arrow}</a>
        </div>
      </div>`;

    // Sticky mobile buy bar
    document.body.insertAdjacentHTML("beforeend", `
      <div class="sticky-buy" id="stickyBuy">
        ${crop(p.image, g[1], "")}
        <div class="t"><b>${esc(p.name)}</b><span>${money(p.price)} · ${esc(p.size)}</span></div>
        <button class="btn" data-add="${p.id}">Add to cart</button>
      </div>`);
    const mainAdd = $("#mainAdd"), sticky = $("#stickyBuy");
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([en]) => sticky.classList.toggle("show", !en.isIntersecting && en.boundingClientRect.top < 0)).observe(mainAdd);
    }
  }

  function initGallery(p) {
    const stage = $("#stage"), thumbs = $$(".thumb"), count = $("#stageCount");
    const view = $(".crop", stage), img = $("img", view);
    let cur = 0;
    const show = (i) => {
      cur = (i + p.gallery.length) % p.gallery.length;
      const v = p.gallery[cur];
      img.style.opacity = 0;
      setTimeout(() => {
        view.style.setProperty("--pos", v.pos);
        view.style.setProperty("--zoom", v.zoom);
        img.alt = `JYANA ${p.name} — ${v.label}`;
        img.style.opacity = 1;
      }, 220);
      thumbs.forEach((t, j) => t.setAttribute("aria-selected", j === cur));
      count.textContent = `${cur + 1} / ${p.gallery.length}`;
    };
    thumbs.forEach((t) => t.addEventListener("click", () => show(+t.dataset.i)));
    $(".stage-nav.prev", stage).addEventListener("click", (e) => { e.stopPropagation(); show(cur - 1); });
    $(".stage-nav.next", stage).addEventListener("click", (e) => { e.stopPropagation(); show(cur + 1); });

    // hover-zoom on fine pointers
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      stage.addEventListener("mousemove", (e) => {
        if (e.target.closest(".stage-nav")) return;
        const r = stage.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 100, y = ((e.clientY - r.top) / r.height) * 100;
        stage.classList.add("zooming");
        img.style.transformOrigin = `${x}% ${y}%`;
        img.style.transform = `scale(${Math.max(1.8, p.gallery[cur].zoom * 1.5)})`;
      });
      stage.addEventListener("mouseleave", () => {
        stage.classList.remove("zooming");
        img.style.transformOrigin = ""; img.style.transform = "";
      });
    }

    // swipe on touch
    let sx = null;
    stage.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener("touchend", (e) => {
      if (sx === null) return;
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 40) show(cur + (dx < 0 ? 1 : -1));
      sx = null;
    });
  }

  /* ---------- Page: Checkout ---------- */
  function syncCheckout() {
    if (page !== "checkout") return;
    const items = Cart.read();
    const list = $("#summaryList");
    if (!items.length) {
      list.innerHTML = `<p class="small" style="margin:18px 0">Your bag is empty. <a class="link" href="shop.html">Shop the range</a></p>`;
    } else {
      list.innerHTML = items.map((l) => {
        const p = getProduct(l.id);
        return `<div class="line">${crop(p.image, p.gallery[1], p.name)}<div>
          <div class="line-top"><h4>${esc(p.name)}</h4><span>${money(p.price * l.qty)}</span></div>
          <div class="meta">${esc(p.size)} · Qty ${l.qty}</div>
          <div class="line-bottom">${qtyHtml(l.qty, p.id)}<button class="remove" data-remove="${p.id}">Remove</button></div></div></div>`;
      }).join("");
    }
    $("#sumSubtotal").textContent = money(Cart.subtotal());
    $("#sumTotal").textContent = money(Cart.subtotal());
  }

  function renderCheckout() {
    syncCheckout();
    // re-sync whenever the cart changes from the drawer
    const orig = Cart.write.bind(Cart);
    Cart.write = (items) => { orig(items); syncCheckout(); };

    $("#checkoutForm").addEventListener("submit", (e) => {
      e.preventDefault();
      // TODO: connect a payment provider (Shopify Buy Button, Razorpay, Stripe…)
      // and hand off Cart.read() here.
      $("#checkoutNote").hidden = false;
      $("#checkoutNote").scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  /* ---------- Page: Contact ---------- */
  function renderContact() {
    const s = D.store;
    $("#contactCards").innerHTML = `
      <div><span>Email</span><a href="mailto:${esc(s.email)}">${esc(s.email)}</a></div>
      ${s.phone ? `<div><span>Phone</span><a href="tel:${esc(s.phone.replace(/\s/g, ""))}">${esc(s.phone)}</a></div>` : ""}
      ${s.instagram ? `<div><span>Instagram</span><a href="${esc(s.instagram)}" target="_blank" rel="noopener">Follow JYANA</a></div>` : ""}
      ${s.address ? `<div><span>Address</span><p>${esc(s.address)}</p></div>` : ""}`;
    $("#contactForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const f = e.target;
      const subject = encodeURIComponent(`[JYANA] ${f.topic.value} — ${f.name.value}`);
      const body = encodeURIComponent(`${f.message.value}\n\n— ${f.name.value} (${f.email.value})`);
      // Opens the visitor's email app. Swap for Formspree / your backend if preferred.
      location.href = `mailto:${s.email}?subject=${subject}&body=${body}`;
      $("#contactNote").textContent = "Your email app should open with your message ready to send.";
      $("#contactNote").classList.add("ok");
    });
  }

  /* ---------- Boot ---------- */
  renderChrome();
  renderCart();
  bindGlobal();
  ({ home: renderHome, shop: renderShop, product: renderProduct, checkout: renderCheckout, contact: renderContact }[page] || (() => {}))();
  initReveal();
})();
