import { useEffect, useState } from 'react'
import { Cursor } from './ui'
import LiveChart from './LiveChart'
import { waLink, VERSION } from '../config'

const BOOT = [
  { t: 'mounting billion_$_code ' + VERSION, r: 'OK' },
  { t: 'verifying operator signatures', r: '13 / 13' },
  { t: 'loading pressure map — XAUUSD, FX, indices', r: 'OK' },
  { t: 'calibrating entry / stop / target engine', r: 'OK' },
  { t: 'access control', r: 'RESTRICTED', warn: true },
]

// The boot animation is the first thing people see — it runs for everyone.
// Reduced-motion users just get a faster type speed, not a frozen screen.
function useBoot() {
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const speed = reduce ? 3 : 11
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
    }, reduce ? 60 : 130)
    return () => clearTimeout(id)
  }, [line, chars, speed, reduce])

  return { line, chars, done: line >= BOOT.length }
}

export default function Hero() {
  const { line, chars, done } = useBoot()

  return (
    <section id="top" className="relative overflow-hidden pt-14">
      <div className="grid-bg pointer-events-none absolute inset-0" />

      <div className="shell relative pb-12 pt-10 sm:pb-16 sm:pt-16">
        {/* boot log */}
        <div className="mb-8 min-h-[124px] font-display text-[11px] leading-[1.9] sm:min-h-[142px] sm:text-[12.5px]">
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

        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
          {/* left: headline + copy + cta */}
          <div
            style={{
              opacity: done ? 1 : 0,
              transform: done ? 'translateY(0)' : 'translateY(16px)',
              transition:
                'opacity 700ms ease-out 100ms, transform 700ms cubic-bezier(.2,.7,.3,1) 100ms',
            }}
          >
            <h1 className="font-display text-[42px] font-extrabold uppercase leading-[0.93] tracking-[-0.045em] text-white sm:text-[64px] lg:text-[72px]">
              The line
              <br />
              prints{' '}
              <span className="text-phos glow">before</span>
              <br />
              the move.
            </h1>

            <p className="lead mt-7 max-w-[50ch]">
              Thirteen traders spent four years compressing what they see into one thing
              your chart can draw by itself. You don't read the market anymore. You read
              the line, you place the order, you close the laptop.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
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

          {/* right: the self-drawing chart */}
          <div
            style={{
              opacity: done ? 1 : 0,
              transform: done ? 'translateY(0)' : 'translateY(24px)',
              transition:
                'opacity 800ms ease-out 320ms, transform 800ms cubic-bezier(.2,.7,.3,1) 320ms',
            }}
          >
            <LiveChart />
            <p className="mt-3 border-l border-line pl-4 text-[12.5px] leading-[1.7] text-mute">
              This isn't a signal group and nobody trades your account for you. You get the
              tool, the numbers it prints, and a human on the line when you get it wrong.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
