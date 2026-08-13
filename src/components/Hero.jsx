import { useEffect, useState } from 'react'
import { Cursor } from './ui'
import Scramble from './Scramble'
import HeroLine from './HeroLine'
import { waLink, VERSION } from '../config'

const BOOT = [
  { t: 'mounting billion_$_code ' + VERSION, r: 'OK' },
  { t: 'verifying operator signatures', r: '13 / 13' },
  { t: 'access control', r: 'RESTRICTED', warn: true },
]

function useBoot() {
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const speed = reduce ? 2 : 9
  const [line, setLine] = useState(0)
  const [chars, setChars] = useState(0)
  useEffect(() => {
    if (line >= BOOT.length) return
    const text = BOOT[line].t
    if (chars < text.length) {
      const id = setTimeout(() => setChars((c) => c + 1), speed)
      return () => clearTimeout(id)
    }
    const id = setTimeout(() => {
      setLine((l) => l + 1)
      setChars(0)
    }, reduce ? 40 : 110)
    return () => clearTimeout(id)
  }, [line, chars, speed, reduce])
  return { line, chars, done: line >= BOOT.length }
}

export default function Hero() {
  const { line, chars, done } = useBoot()

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-16 pt-24"
    >
      <div className="grid-bg pointer-events-none absolute inset-0" />
      {/* the line, low band across the whole hero */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] opacity-70">
        <HeroLine />
      </div>
      {/* darken behind the type for legibility */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_30%_42%,rgba(5,7,6,0.92),transparent_70%)]" />

      <div className="shell relative">
        {/* boot status */}
        <div className="mb-8 max-w-[520px] font-display text-[11px] leading-[1.95] sm:text-[12px]">
          {BOOT.map((b, i) => {
            if (i > line) return null
            const typing = i === line
            const shown = typing ? b.t.slice(0, chars) : b.t
            return (
              <div key={b.t} className="flex flex-wrap items-baseline gap-x-2 text-mute">
                <span className="text-phosdim">›</span>
                <span>{shown}</span>
                {typing && chars < b.t.length ? (
                  <Cursor className="h-[0.9em] w-[0.5em]" />
                ) : (
                  <>
                    <span className="hidden flex-1 translate-y-[-3px] border-b border-dotted border-line2 sm:block" />
                    <span className={b.warn ? 'text-amber' : 'text-phos'}>[{b.r}]</span>
                  </>
                )}
              </div>
            )
          })}
        </div>

        {/* eyebrow */}
        <div
          className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-display text-[10px] uppercase tracking-[0.28em] text-mute sm:text-[11px]"
          style={{ opacity: done ? 1 : 0, transition: 'opacity 500ms ease-out' }}
        >
          <span className="text-phos">13 operators</span>
          <span className="text-line2">/</span>
          <span>1 signal</span>
          <span className="text-line2">/</span>
          <span>0 noise</span>
        </div>

        {/* headline */}
        <h1 className="font-grotesk font-bold uppercase leading-[0.86] tracking-[-0.04em] text-white">
          <span className="block text-[16vw] sm:text-[11vw] lg:text-[9.2vw]">
            {done ? <Scramble text="The line" /> : 'The line'}
          </span>
          <span className="block text-[16vw] sm:text-[11vw] lg:text-[9.2vw]">
            {done ? <Scramble text="prints " delay={260} /> : 'prints '}
            <span className="text-phos glow">
              {done ? <Scramble text="before" delay={520} /> : 'before'}
            </span>
          </span>
          <span className="block text-[16vw] sm:text-[11vw] lg:text-[9.2vw]">
            {done ? <Scramble text="the move." delay={820} /> : 'the move.'}
          </span>
        </h1>

        {/* subcopy + cta */}
        <div
          className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end"
          style={{ opacity: done ? 1 : 0, transition: 'opacity 700ms ease-out 900ms' }}
        >
          <p className="max-w-[46ch] text-[15px] leading-[1.75] text-txt/80 sm:text-[17px]">
            Thirteen traders spent four years teaching a chart to see what they see. You
            stop reading the market. You read one line — enter, stop, target — and close
            the laptop.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary px-8 py-4 text-[13px]"
            >
              Request access
              <span aria-hidden="true">→</span>
            </a>
            <a href="#engine" className="btn btn-ghost px-8 py-4 text-[13px]">
              Watch it work
            </a>
          </div>
        </div>

        <p
          className="mt-6 font-display text-[10.5px] uppercase tracking-[0.2em] text-mute"
          style={{ opacity: done ? 1 : 0, transition: 'opacity 700ms ease-out 1100ms' }}
        >
          Seats issued manually · Exness or XM only
        </p>
      </div>

      {/* scroll hint */}
      <div className="shell relative mt-14 hidden sm:block">
        <div className="flex items-center gap-3 font-display text-[10px] uppercase tracking-[0.24em] text-line2">
          <span className="h-px w-10 bg-line2" />
          scroll — engine below
        </div>
      </div>
    </section>
  )
}
