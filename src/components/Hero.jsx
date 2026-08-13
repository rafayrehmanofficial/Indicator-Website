import { useEffect, useMemo, useState } from 'react'
import { Cursor } from './ui'
import { waLink, VERSION } from '../config'

const BOOT = [
  { t: 'mounting billion_$_code ' + VERSION, r: 'OK' },
  { t: 'verifying operator signatures', r: '13 / 13' },
  { t: 'loading pressure map — XAUUSD, FX, indices', r: 'OK' },
  { t: 'calibrating entry / stop / target engine', r: 'OK' },
  { t: 'access control', r: 'RESTRICTED', warn: true },
]

function useBootSequence() {
  const reduce = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  )
  const [line, setLine] = useState(reduce ? BOOT.length : 0)
  const [chars, setChars] = useState(reduce ? 999 : 0)

  useEffect(() => {
    if (reduce) return
    if (line >= BOOT.length) return
    const text = BOOT[line].t
    if (chars < text.length) {
      const id = setTimeout(() => setChars((c) => c + 1), 11)
      return () => clearTimeout(id)
    }
    const id = setTimeout(() => {
      setLine((l) => l + 1)
      setChars(0)
    }, 130)
    return () => clearTimeout(id)
  }, [line, chars, reduce])

  return { line, chars, done: line >= BOOT.length }
}

export default function Hero() {
  const { line, chars, done } = useBootSequence()

  return (
    <section id="top" className="relative overflow-hidden pt-14">
      <div className="grid-bg pointer-events-none absolute inset-0" />

      <div className="shell relative pb-16 pt-14 sm:pb-24 sm:pt-24">
        {/* boot log */}
        <div className="mb-10 min-h-[132px] font-display text-[11px] leading-[1.9] sm:min-h-[150px] sm:text-[12.5px]">
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
                    <span
                      className={
                        b.warn ? 'text-amber' : 'text-phos'
                      }
                    >
                      [{b.r}]
                    </span>
                  </>
                )}
              </div>
            )
          })}
        </div>

        {/* headline */}
        <div
          className="max-w-[19ch] sm:max-w-[16ch]"
          style={{
            opacity: done ? 1 : 0,
            transform: done ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 700ms ease-out 120ms, transform 700ms cubic-bezier(.2,.7,.3,1) 120ms',
          }}
        >
          <h1 className="font-display text-[42px] font-extrabold uppercase leading-[0.93] tracking-[-0.045em] text-white sm:text-[76px] lg:text-[92px]">
            The line
            <br />
            prints
            <br />
            <span className="text-phos glow">before</span>
            <br />
            the move.
          </h1>
        </div>

        <div
          className="mt-9 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)] lg:items-end"
          style={{
            opacity: done ? 1 : 0,
            transition: 'opacity 700ms ease-out 380ms',
          }}
        >
          <div>
            <p className="lead max-w-[54ch]">
              Thirteen traders spent four years compressing what they see into one thing
              your chart can draw by itself. You don't read the market anymore. You read
              the line, you place the order, you close the laptop.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Request access
                <span aria-hidden="true">→</span>
              </a>
              <a href="#proof" className="btn btn-ghost">
                Watch it work
              </a>
            </div>

            <p className="mt-5 font-display text-[10.5px] uppercase tracking-[0.18em] text-mute">
              Seats are issued manually · Exness or XM only
            </p>
          </div>

          {/* margin note — reads like a man-page footer */}
          <aside className="border-l border-line pl-5 lg:pl-6">
            <p className="label mb-3 text-phos/60">Read before you ask</p>
            <p className="text-[13px] leading-[1.8] text-mute">
              This isn't a signal group and nobody is going to trade your account for
              you. You get the tool, the numbers it prints, and a human on the other end
              of the line when you get it wrong.
            </p>
          </aside>
        </div>
      </div>
    </section>
  )
}
