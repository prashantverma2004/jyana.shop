/* Headline whose lines slide up in sequence when revealed.
   lines: array of strings or nodes. */
export default function SplitHeading({ as: Tag = "h1", className = "display", lines }) {
  return (
    <Tag className={className} data-split="">
      {lines.map((line, i) => (
        <span className="split-line" key={i}>
          <span style={i ? { "--d": `${i * 0.12}s` } : undefined}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
