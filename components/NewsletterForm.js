"use client";

import { useState } from "react";
import { Arrow } from "./Icons";

export default function NewsletterForm() {
  const [note, setNote] = useState({ text: "", ok: false });

  const onSubmit = (e) => {
    e.preventDefault();
    const email = e.currentTarget.email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setNote({ text: "Please enter a valid email address.", ok: false });
      return;
    }
    // TODO: send `email` to Mailchimp / Klaviyo / your backend here.
    setNote({ text: "Thank you — you're on the list.", ok: true });
    e.currentTarget.reset();
  };

  return (
    <>
      <form className="nl-form" onSubmit={onSubmit} noValidate>
        <label htmlFor="nl-email" style={{ position: "absolute", left: -9999 }}>Email address</label>
        <input id="nl-email" type="email" name="email" placeholder="Your email address" autoComplete="email" required />
        <button type="submit">Subscribe <Arrow /></button>
      </form>
      <div className={`form-note${note.ok ? " ok" : ""}`} role="status">{note.text}</div>
    </>
  );
}
