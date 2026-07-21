// Lightweight, dependency-free SVG charts for the admin dashboard.
// Rendered on the server — no client JS, fully brand-styled.

export function AreaChart({ data, labels }: { data: number[]; labels: string[] }) {
  const W = 720;
  const H = 240;
  const pad = { t: 16, r: 16, b: 30, l: 34 };
  const iw = W - pad.l - pad.r;
  const ih = H - pad.t - pad.b;
  const max = Math.max(1, ...data);
  const n = data.length;
  const px = (i: number) => pad.l + (n <= 1 ? iw / 2 : (i / (n - 1)) * iw);
  const py = (v: number) => pad.t + ih - (v / max) * ih;
  const pts = data.map((v, i) => `${px(i).toFixed(1)},${py(v).toFixed(1)}`);
  const line = pts.map((p, i) => (i ? "L" : "M") + p).join(" ");
  const area = `${line} L ${px(n - 1).toFixed(1)},${(pad.t + ih).toFixed(1)} L ${px(0).toFixed(1)},${(pad.t + ih).toFixed(1)} Z`;
  const grid = [0, 0.25, 0.5, 0.75, 1];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Enquiries over time">
      <defs>
        <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#123566" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#123566" stopOpacity="0" />
        </linearGradient>
      </defs>
      {grid.map((g, i) => {
        const y = pad.t + ih - g * ih;
        return <line key={i} x1={pad.l} y1={y} x2={W - pad.r} y2={y} stroke="#efeee9" strokeWidth={1} />;
      })}
      <text x={pad.l - 8} y={pad.t + 4} textAnchor="end" fontSize="11" fill="#6B6B6B">{max}</text>
      <text x={pad.l - 8} y={pad.t + ih + 4} textAnchor="end" fontSize="11" fill="#6B6B6B">0</text>
      <path d={area} fill="url(#areaFill)" />
      <path d={line} fill="none" stroke="#123566" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
      {data.map((v, i) => (
        <circle key={i} cx={px(i)} cy={py(v)} r={3.5} fill="#fff" stroke="#123566" strokeWidth={2} />
      ))}
      {labels.map((l, i) =>
        i % 2 === 0 || n <= 6 ? (
          <text key={i} x={px(i)} y={H - 8} textAnchor="middle" fontSize="11" fill="#6B6B6B">
            {l}
          </text>
        ) : null
      )}
    </svg>
  );
}

export function Donut({
  segments,
  total,
}: {
  segments: { label: string; value: number; color: string }[];
  total: number;
}) {
  const sum = segments.reduce((a, s) => a + s.value, 0);
  const r = 56;
  const cx = 70;
  const cy = 70;
  const sw = 16;
  const C = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row">
      <div className="relative h-36 w-36 shrink-0">
        <svg viewBox="0 0 140 140" className="h-36 w-36 -rotate-90">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#efeee9" strokeWidth={sw} />
          {sum > 0 &&
            segments.map((s, i) => {
              const len = (s.value / sum) * C;
              const el = (
                <circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="none"
                  stroke={s.color}
                  strokeWidth={sw}
                  strokeDasharray={`${len} ${C - len}`}
                  strokeDashoffset={-offset}
                />
              );
              offset += len;
              return el;
            })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold text-navy-900">{total}</span>
          <span className="text-xs text-muted">total</span>
        </div>
      </div>
      <ul className="w-full space-y-2">
        {segments.length === 0 ? (
          <li className="text-sm text-muted">No data yet</li>
        ) : (
          segments.map((s, i) => (
            <li key={i} className="flex items-center gap-2 text-sm">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
              <span className="text-ink">{s.label}</span>
              <span className="ml-auto font-medium text-navy-900">{s.value}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export function BarList({ items }: { items: { label: string; value: number; color?: string }[] }) {
  const max = Math.max(1, ...items.map((i) => i.value));
  if (items.length === 0) return <p className="text-sm text-muted">No data yet</p>;
  return (
    <div className="space-y-3.5">
      {items.map((it, i) => (
        <div key={i}>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="text-ink">{it.label}</span>
            <span className="font-medium text-navy-900">{it.value}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-sand-200">
            <div
              className="h-2 rounded-full"
              style={{ width: `${(it.value / max) * 100}%`, background: it.color ?? "#123566" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export const CHART_COLORS = ["#123566", "#C91F2C", "#3f65a0", "#1c437f", "#d63a47", "#7594bf"];
