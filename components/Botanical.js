const LEAVES = [
  "M60.5 228C40 220 27 205 20 186c19 3 34 17 40.5 42Z",
  "M61.5 202C82 193 95 178 101 160c-19 4-33 18-39.5 42Z",
  "M62.5 172C44 165 32 151 27 134c17 3 30 16 35.5 38Z",
  "M64.5 146C83 138 94 124 99 108c-17 4-29 16-34.5 38Z",
  "M66.5 116C50 110 40 98 36 83c15 3 26 14 30.5 33Z",
  "M68.5 90C84 83 93 71 97 57c-15 3-25 14-28.5 33Z",
  "M70.5 60C57 55 49 45 46 33c13 3 21 12 24.5 27Z",
  "M72 30c9-5 14-12 16-21-9 3-14 10-16 21Z"
];
const RIBS = ["M60.5 228 30 196", "M61.5 202 92 170", "M62.5 172 35 143", "M64.5 146 91 117", "M66.5 116 43 91", "M68.5 90 90 65"];

/* Line-art sprig echoing the illustration on the JYANA cartons. */
export function Sprig({ className, leaves = 8, ribs = false }) {
  return (
    <svg className={className} viewBox="0 0 120 260" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <path d="M60 258C58 200 62 140 72 8" />
      {LEAVES.slice(0, leaves).map((d) => <path key={d} d={d} />)}
      {ribs && RIBS.map((d) => <path key={d} d={d} />)}
    </svg>
  );
}

/* Layered hills from the base of the packs. `base` is the colour of the next section. */
export function Hills({ base = "#f7f3ec" }) {
  return (
    <svg className="hills" viewBox="0 0 1440 200" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 120C180 60 320 50 480 96s300 70 460 20 330-90 500-40v124H0Z" fill="#fffdf9" fillOpacity=".14" />
      <path d="M0 150c160-50 330-70 520-24s340 54 520 6 260-50 400-26v94H0Z" fill="#fffdf9" fillOpacity=".2" />
      <path d="M0 176c220-36 420-40 640-10s420 30 560 4 180-20 240-14v44H0Z" fill={base} />
    </svg>
  );
}
