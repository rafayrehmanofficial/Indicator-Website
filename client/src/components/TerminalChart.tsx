/*
 * Style reminder — Terminal Monolith: graphite canvas, acid-green telemetry,
 * Terminal Amber focal accents, thin measurement lines, and restrained motion.
 */
import { useId } from "react";

const candles = [
  { x: 28, open: 132, close: 108, high: 94, low: 148, positive: true, delay: "0s" },
  { x: 54, open: 112, close: 126, high: 103, low: 140, positive: false, delay: "0.2s" },
  { x: 80, open: 128, close: 98, high: 84, low: 137, positive: true, delay: "0.4s" },
  { x: 106, open: 96, close: 76, high: 66, low: 112, positive: true, delay: "0.6s" },
  { x: 132, open: 78, close: 92, high: 64, low: 104, positive: false, delay: "0.8s" },
  { x: 158, open: 94, close: 68, high: 54, low: 104, positive: true, delay: "1s" },
  { x: 184, open: 70, close: 84, high: 60, low: 99, positive: false, delay: "1.2s" },
  { x: 210, open: 86, close: 58, high: 42, low: 98, positive: true, delay: "1.4s" },
  { x: 236, open: 60, close: 48, high: 36, low: 76, positive: true, delay: "1.6s" },
  { x: 262, open: 50, close: 64, high: 38, low: 74, positive: false, delay: "1.8s" },
  { x: 288, open: 66, close: 40, high: 28, low: 80, positive: true, delay: "2s" },
  { x: 314, open: 42, close: 54, high: 26, low: 68, positive: false, delay: "2.2s" },
];

export default function TerminalChart() {
  const chartId = useId();

  return (
    <div className="chart-shell" aria-label="Animated candlestick instrument preview">
      <div className="chart-toolbar">
        <span className="chart-toolbar-dot" />
        <span>MARKET / XAUUSD</span>
        <span className="chart-toolbar-muted">5M</span>
        <span className="chart-toolbar-live"><span className="live-dot" /> LIVE READ</span>
      </div>
      <svg className="terminal-chart" viewBox="0 0 360 190" role="img" aria-labelledby={`${chartId}-title ${chartId}-desc`}>
        <title id={`${chartId}-title`}>Billion $ Code animated market instrument</title>
        <desc id={`${chartId}-desc`}>A restrained candlestick sequence moves through a measured chart field.</desc>
        <defs>
          <linearGradient id={`${chartId}-glow`} x1="0" x2="1" y1="1" y2="0">
            <stop offset="0" stopColor="#8ee6b1" stopOpacity="0.03" />
            <stop offset="1" stopColor="#8ee6b1" stopOpacity="0.22" />
          </linearGradient>
          <filter id={`${chartId}-soft`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <g className="chart-grid">
          {[25, 60, 95, 130, 165].map((y) => <line key={`h-${y}`} x1="0" x2="360" y1={y} y2={y} />)}
          {[26, 86, 146, 206, 266, 326].map((x) => <line key={`v-${x}`} x1={x} x2={x} y1="10" y2="178" />)}
        </g>
        <path className="chart-trace-glow" d="M8 150 C 46 138, 62 156, 92 112 S 140 122, 166 104 S 204 120, 232 74 S 282 96, 350 30" fill="none" stroke={`url(#${chartId}-glow)`} strokeWidth="18" filter={`url(#${chartId}-soft)`} />
        <path className="chart-trace" d="M8 150 C 46 138, 62 156, 92 112 S 140 122, 166 104 S 204 120, 232 74 S 282 96, 350 30" fill="none" stroke="#8ee6b1" strokeWidth="1.2" strokeDasharray="3 5" />
        <line className="chart-level chart-level-amber" x1="0" x2="360" y1="74" y2="74" />
        <line className="chart-level chart-level-cyan" x1="0" x2="360" y1="142" y2="142" />
        <rect className="chart-range" x="224" y="38" width="82" height="110" rx="2" />
        {candles.map((candle) => (
          <g className={`chart-candle ${candle.positive ? "is-positive" : "is-negative"}`} key={candle.x} style={{ "--candle-delay": candle.delay } as React.CSSProperties}>
            <line x1={candle.x} x2={candle.x} y1={candle.high} y2={candle.low} />
            <rect x={candle.x - 4} y={Math.min(candle.open, candle.close)} width="8" height={Math.max(6, Math.abs(candle.open - candle.close))} rx="1" />
          </g>
        ))}
        <circle className="chart-cursor" cx="314" cy="54" r="3.5" />
        <circle className="chart-cursor-halo" cx="314" cy="54" r="9" />
      </svg>
      <div className="chart-footer">
        <span>RANGE // 80</span>
        <span className="chart-footer-value">STATUS <b>●</b> CLEAR</span>
      </div>
    </div>
  );
}
