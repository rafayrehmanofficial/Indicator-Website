import { useEffect, useRef, useState } from 'react'
import { Cursor } from './ui'

const BOOK = [
  { s: 'XAUUSD', px: 4356, dp: 2, pip: 0.1, range: [140, 460], w: 6 },
  { s: 'EURUSD', px: 1.0918, dp: 4, pip: 0.0001, range: [22, 74], w: 2 },
  { s: 'GBPJPY', px: 198.42, dp: 2, pip: 0.01, range: [30, 95], w: 2 },
  { s: 'USDJPY', px: 156.31, dp: 2, pip: 0.01, range: [24, 80], w: 2 },
  { s: 'US30', px: 41280, dp: 0, pip: 1, range: [60, 220], w: 1 },
]
const POOL = BOOK.flatMap((b) => Array(b.w).fill(b))

const clock = (offset = 0) =>
  new Date(Date.now() - offset * 1000).toLocaleTimeString('en-GB', {
    hour12: false,
    timeZone: 'UTC',
  })

const rnd = (a, b) => a + Math.random() * (b - a)
let uid = 0

function newSignal() {
  const b = POOL[Math.floor(Math.random() * POOL.length)]
  const dir = Math.random() > 0.44 ? 'LONG' : 'SHORT'
  const sign = dir === 'LONG' ? 1 : -1
  const rr = rnd(1.8, 3.4)
  const pips = Math.round(rnd(b.range[0], b.range[1]))
  const entry = b.px + b.px * rnd(-0.003, 0.003)
  const tDist = pips * b.pip
  const sDist = tDist / rr
  return {
    id: ++uid,
    kind: 'lock',
    dir,
    sym: b.s,
    dp: b.dp,
    entry,
    stop: entry - sign * sDist,
    target: entry + sign * tDist,
    rr,
    pips,
    time: clock(),
  }
}

const SCANS = [
  'sweeping 41 instruments for pressure',
  'session bias locked — london',
  'session bias locked — new york',
  'engine idle — no qualified setup',
  'volatility filter engaged',
  'reading order-flow imbalance',
]

function seed() {
  const rows = []
  for (let i = 0; i < 7; i++) {
    const sig = newSignal()
    sig.time = clock((7 - i) * 47)
    rows.push(sig)
    if (i % 2 === 1)
      rows.push({
        id: ++uid,
        kind: 'hit',
        sym: sig.sym,
        pips: sig.pips,
        time: clock((7 - i) * 47 - 22),
      })
  }
  return rows
}

export default function Tape() {
  const [rows, setRows] = useState(seed)
  const [pips, setPips] = useState(1240)
  const [wins, setWins] = useState(11)
  const [losses, setLosses] = useState(2)
  const openRef = useRef([])
  const boxRef = useRef(null)
  const [live, setLive] = useState(true)

  useEffect(() => {
    const el = boxRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      (e) => e.forEach((x) => setLive(x.isIntersecting)),
      { threshold: 0.05 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!live) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const gap = reduce ? 2600 : 1450

    const id = setInterval(() => {
      setRows((prev) => {
        const next = [...prev]
        const roll = Math.random()

        if (openRef.current.length && roll < 0.42) {
          const sig = openRef.current.shift()
          const won = Math.random() > 0.19
          if (won) {
            setPips((p) => p + sig.pips)
            setWins((w) => w + 1)
          } else {
            const loss = Math.round(sig.pips / sig.rr)
            setPips((p) => Math.max(0, p - loss))
            setLosses((l) => l + 1)
          }
          next.push({
            id: ++uid,
            kind: won ? 'hit' : 'stop',
            sym: sig.sym,
            pips: won ? sig.pips : -Math.round(sig.pips / sig.rr),
            time: clock(),
          })
        } else if (roll < 0.78) {
          const sig = newSignal()
          openRef.current.push(sig)
          next.push(sig)
        } else {
          next.push({
            id: ++uid,
            kind: 'scan',
            text: SCANS[Math.floor(Math.random() * SCANS.length)],
            time: clock(),
          })
        }
        return next.slice(-40)
      })
    }, gap)
    return () => clearInterval(id)
  }, [live])

  useEffect(() => {
    const el = boxRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [rows])

  return (
    <div className="frame">
      <div className="frame-bar flex-wrap gap-y-2">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-phos" />
          <span className="font-display text-[10.5px] uppercase tracking-[0.2em] text-txt">
            live tape
          </span>
        </div>
        <span className="hidden font-display text-[10.5px] tracking-[0.14em] text-mute sm:inline">
          billion_$_code — engine output
        </span>
        <div className="ml-auto flex items-center gap-4 font-display text-[10.5px] tracking-[0.12em] sm:gap-6">
          <span className="text-mute">
            W <span className="text-phos">{wins}</span> / L{' '}
            <span className="text-alert">{losses}</span>
          </span>
          <span className="text-mute">
            SESSION <span className="text-phos glow-soft">+{pips}</span> PIPS
          </span>
        </div>
      </div>

      <div
        ref={boxRef}
        className="log-scroll h-[300px] overflow-y-auto px-3 py-3 font-display text-[10.5px] leading-[2.05] sm:h-[360px] sm:px-5 sm:text-[12px]"
      >
        {rows.map((r) => (
          <Row key={r.id} r={r} />
        ))}
        <div className="flex items-center gap-2 text-mute">
          <span className="text-phosdim">›</span>
          <Cursor className="h-[0.85em] w-[0.5em]" />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-1 border-t border-line bg-panel2 px-3 py-2 font-display text-[10px] tracking-[0.14em] text-mute sm:px-5">
        <span>ENGINE: RUNNING</span>
        <span className="hidden sm:inline">LATENCY: 40MS</span>
        <span>REPAINT: OFF</span>
        <span className="ml-auto text-phosdim">
          illustrative output — not a live broker feed
        </span>
      </div>
    </div>
  )
}

function Row({ r }) {
  const base = 'flex flex-wrap items-baseline gap-x-2 sm:gap-x-4 animate-slideup'

  if (r.kind === 'scan')
    return (
      <div className={base + ' text-mute/70'}>
        <span className="text-line2">{r.time}</span>
        <span>· {r.text}</span>
      </div>
    )

  if (r.kind === 'hit')
    return (
      <div className={base + ' text-phos'}>
        <span className="text-line2">{r.time}</span>
        <span className="w-[62px] text-txt">{r.sym}</span>
        <span className="font-bold">TARGET HIT</span>
        <span className="glow-soft font-bold">+{r.pips} pips</span>
      </div>
    )

  if (r.kind === 'stop')
    return (
      <div className={base + ' text-alert/85'}>
        <span className="text-line2">{r.time}</span>
        <span className="w-[62px] text-txt">{r.sym}</span>
        <span>STOP TAKEN</span>
        <span>{r.pips} pips</span>
      </div>
    )

  return (
    <div className={base + ' text-txt/85'}>
      <span className="text-line2">{r.time}</span>
      <span className="w-[62px] text-white">{r.sym}</span>
      <span className={r.dir === 'LONG' ? 'text-phos' : 'text-amber'}>
        {r.dir === 'LONG' ? '▲' : '▼'} {r.dir}
      </span>
      <span className="text-mute">
        entry <span className="text-txt">{r.entry.toFixed(r.dp)}</span>
      </span>
      <span className="text-mute">
        stop <span className="text-txt">{r.stop.toFixed(r.dp)}</span>
      </span>
      <span className="text-mute">
        target <span className="text-txt">{r.target.toFixed(r.dp)}</span>
      </span>
      <span className="text-phosdim">rr {r.rr.toFixed(1)}</span>
    </div>
  )
}
