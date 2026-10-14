import Link from "next/link";
import { Arrow } from "@/components/Icons";

export default function NotFound() {
  return (
    <section className="page-hero">
      <div className="container">
        <span className="eyebrow">404</span>
        <h1>This page has <em>wandered off</em>.</h1>
        <p className="lead">The page you&apos;re looking for doesn&apos;t exist. Our two roll-ons are right where you left them.</p>
        <Link href="/shop" className="btn" style={{ marginTop: 32 }}>Shop the range <Arrow /></Link>
      </div>
    </section>
  );
}
