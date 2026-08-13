import { useEffect, useState } from 'react'
import { Reveal, SectionHead } from './ui'

const SHOTS = [
  {
    src: '/shots/shot-01.png',
    file: 'xauusd_5m_2026-08-13.png',
    caption: 'Entry, stop and target placed by the code. Closed at 2.0R.',
    tag: '+200 PIPS',
  },
  {
    src: '/shots/shot-02.png',
    file: 'xauusd_1m_2026-08-13.png',
    caption: 'Band printed at the low. The vertical came 40 minutes later.',
    tag: '+410 PIPS',
  },
  {
    src: '/shots/shot-03.png',
    file: 'xauusd_5m_london.png',
    caption: 'London open. One trade, held to the top of the range.',
    tag: '+300 PIPS',
  },
  {
    src: '/shots/shot-04.png',
    file: 'xauusd_5m_swing.png',
    caption: 'Overnight hold. The line never moved once it printed.',
    tag: '+600 PIPS',
  },
]

export default function Proof() {
  const [open, setOpen] = useState(null)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(null)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = open !== null ? 'hidden' : ''
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <section id="proof" className="shell py-16 sm:py-24">
      <SectionHead
        path="~/tape/archive"
        title="Screens from the desk"
        kicker="Not mockups and not backtests dressed up as history. These are charts pulled straight off the terminals of the people who built it."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {SHOTS.map((s, i) => (
          <Reveal key={s.src} delay={i * 90}>
            <figure className="frame group h-full">
              <div className="frame-bar">
                <span className="flex gap-1.5">
                  <span className="h-2 w-2 border border-line2" />
                  <span className="h-2 w-2 border border-line2" />
                  <span className="h-2 w-2 bg-phosdim" />
                </span>
                <span className="truncate font-display text-[10px] tracking-[0.14em] text-mute">
                  {s.file}
                </span>
                <span className="ml-auto font-display text-[10px] font-bold tracking-[0.12em] text-phos">
                  {s.tag}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setOpen(i)}
                className="relative block w-full overflow-hidden bg-black"
                aria-label={`Expand ${s.file}`}
              >
                <img
                  src={s.src}
                  alt={s.caption}
                  loading="lazy"
                  className="w-full opacity-90 transition duration-500 group-hover:scale-[1.015] group-hover:opacity-100"
                />
                <span className="absolute bottom-2.5 right-2.5 border border-line2 bg-ink/85 px-2.5 py-1 font-display text-[9.5px] uppercase tracking-[0.18em] text-mute transition-colors group-hover:text-phos">
                  Expand
                </span>
              </button>

              <figcaption className="border-t border-line px-4 py-3.5 text-[12.5px] leading-relaxed text-mute">
                {s.caption}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/96 p-4 sm:p-8"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <div className="frame-bar border border-line">
              <span className="font-display text-[10px] tracking-[0.14em] text-mute">
                {SHOTS[open].file}
              </span>
              <button
                onClick={() => setOpen(null)}
                className="ml-auto font-display text-[10px] uppercase tracking-[0.18em] text-mute hover:text-phos"
              >
                Close [esc]
              </button>
            </div>
            <img
              src={SHOTS[open].src}
              alt={SHOTS[open].caption}
              className="max-h-[76vh] w-full border-x border-b border-line bg-black object-contain"
            />
          </div>
        </div>
      )}
    </section>
  )
}
