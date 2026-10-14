import { money, products } from "@/lib/store";

const ingredients = (p) => (p.keyIngredients.length ? p.keyIngredients.map((k) => k.name).join(", ") : "See pack for full list");

export default function CompareTable() {
  const [a, b] = products;
  const rows = [
    ["Made for", "Everyday use, all skin types", "Active days"],
    ["Type", a.subtitle, b.subtitle],
    ["Focus", a.benefits.map((x) => x.title).join(" · "), b.benefits.slice(0, 2).map((x) => x.title).join(" · ")],
    ["Key ingredients", ingredients(a), ingredients(b)],
    ["Size", a.size, b.size],
    ["Price", money(a.price), money(b.price)]
  ];
  return (
    <div className="compare reveal">
      <div className="compare-row head"><span>Compare</span><span>{a.name}</span><span>{b.name}</span></div>
      {rows.map(([label, x, y]) => (
        <div className="compare-row" key={label}><span>{label}</span><span>{x}</span><span>{y}</span></div>
      ))}
    </div>
  );
}
