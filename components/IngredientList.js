export default function IngredientList({ items }) {
  return (
    <div className="ing-list">
      {items.map((k, i) => (
        <div className="ing reveal" style={{ "--d": `${i * 0.1}s` }} key={k.name}>
          <span className="n">0{i + 1}</span>
          <div><h4>{k.name}</h4><p>{k.text}</p></div>
        </div>
      ))}
    </div>
  );
}
