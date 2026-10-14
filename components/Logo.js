import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="logo" aria-label="JYANA Personal Care — home">
      <span className="logo-word">JYANA</span>
      <span className="logo-sub">Personal Care</span>
    </Link>
  );
}
