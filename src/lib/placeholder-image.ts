// Deterministic placeholder "product photo" so the catalog has visual variety
// without depending on an external image host or shipping binary assets.
// Real photos never made it into the archived dump (see README), so every
// product fixture points at one of these instead.

const PALETTE = [
  "#111111",
  "#3f3f46",
  "#7c2d12",
  "#14532d",
  "#1e3a8a",
  "#701a75",
  "#78350f",
  "#164e63",
];

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function placeholderPhoto(seed: string, label: string): string {
  const color = PALETTE[hashString(seed) % PALETTE.length];
  const initial = label.trim().charAt(0).toUpperCase() || "?";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
    <rect width="400" height="400" fill="${color}"/>
    <text x="200" y="230" font-family="Arial, sans-serif" font-size="160" fill="white" fill-opacity="0.85" text-anchor="middle">${initial}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
