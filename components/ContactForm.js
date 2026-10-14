"use client";

import { useState } from "react";
import { Arrow } from "./Icons";
import { store } from "@/lib/store";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const f = e.currentTarget;
    const subject = encodeURIComponent(`[JYANA] ${f.topic.value} — ${f.name.value}`);
    const body = encodeURIComponent(`${f.message.value}\n\n— ${f.name.value} (${f.email.value})`);
    // Opens the visitor's email app. Swap for Formspree / an API route if preferred.
    window.location.href = `mailto:${store.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <form className="reveal" style={{ "--d": ".2s" }} onSubmit={onSubmit}>
      <div className="field-row">
        <div className="field"><label htmlFor="c-name">Name</label><input id="c-name" name="name" required autoComplete="name" /></div>
        <div className="field"><label htmlFor="c-email">Email</label><input id="c-email" name="email" type="email" required autoComplete="email" /></div>
      </div>
      <div className="field">
        <label htmlFor="c-topic">Topic</label>
        <select id="c-topic" name="topic">
          <option>Product question</option>
          <option>My order</option>
          <option>Wholesale &amp; partnerships</option>
          <option>Something else</option>
        </select>
      </div>
      <div className="field"><label htmlFor="c-msg">Message</label><textarea id="c-msg" name="message" required /></div>
      <button className="btn" type="submit">Send message <Arrow /></button>
      <div className={`form-note${sent ? " ok" : ""}`} role="status">
        {sent && "Your email app should open with your message ready to send."}
      </div>
    </form>
  );
}
