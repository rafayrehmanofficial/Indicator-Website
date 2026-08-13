import { useEffect, useState } from 'react'

const SEED = [
  { s: 'XAUUSD', p: 4356.2 },
  { s: 'EURUSD', p: 1.0918 },
  { s: 'GBPJPY', p: 198.42 },
  { s: 'USDJPY', p: 156.31 },
  { s: 'US30', p: 41280 },
  { s: 'BTCUSD', p: 68420 },
  { s: 'GBPUSD', p: 1.2764 },
  { s: 'NAS100', p: 19840 },
]

export default function Ticker() {
  const [rows, setRows] = useState(() =>
    SEED.map((x) => ({ ...x, prev: x.p }))
  )

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const id = setInterval(() => {
      setRows((prev) =>
        prev.map((x) => {
          const move = x.p * (Math.random() * 0.0016 - 0.0008)
          return { ...x, prev: x.p, p: x.p + move }
        })
      )
    }, 1600)
    return () => clearInterval(id)
  }, [])

  const fmt = (n) =>
    n >= 1000 ? Math.round(n).toLocaleString() : n.toFixed(n >= 100 ? 2 : 4)

  const Cell = ({ s, p, prev }) => {
    const up = p >= prev
    return (
      <span className="inline-flex items-center gap-2 px-5">
        <span className="text-txt/80">{s}</span>
        <span className="text-mute">{fmt(p)}</span>
        <span className={up ? 'text-phos' : 'text-alert'}>{up ? '▲' : '▼'}</span>
      </span>
    )
  }

  const track = [...rows, ...rows]

  return (
    <div className="overflow-hidden border-y border-line bg-panel2 py-2 font-display text-[11px] tracking-[0.08em]">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {track.map((x, i) => (
          <span key={i} className="flex items-center">
            <Cell {...x} />
            <span className="text-line2">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
