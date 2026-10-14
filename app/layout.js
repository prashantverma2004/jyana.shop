import { Cormorant_Garamond, Jost } from "next/font/google";
import CartProvider from "@/components/CartProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";
import "./globals.css";

const jost = Jost({ subsets: ["latin"], variable: "--font-jost", display: "swap" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap"
});

export const metadata = {
  title: {
    default: "JYANA Personal Care — Made for everyday confidence",
    template: "%s | JYANA Personal Care"
  },
  description:
    "JYANA Personal Care: two considered roll-ons. The Underarm Roll On for all skin types, and Active Sweat Guard, a natural deodorant roll-on with potash alum, witch hazel and tea tree oil."
};

export const viewport = { themeColor: "#f7f3ec" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jost.variable} ${cormorant.variable}`} data-scroll-behavior="smooth">
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
        <RevealObserver />
      </body>
    </html>
  );
}
