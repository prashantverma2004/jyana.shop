import Link from "next/link";
import CheckoutView from "@/components/CheckoutView";

export const metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <div className="container">
      <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span aria-current="page">Checkout</span></nav>
      <h1 style={{ margin: "28px 0 clamp(32px,4vw,56px)" }}>Checkout</h1>
      <CheckoutView />
    </div>
  );
}
