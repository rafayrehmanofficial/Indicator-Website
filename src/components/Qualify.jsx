import { useEffect, useRef, useState } from 'react'
import { SectionHead } from './ui'
import { BROKERS, waLink } from '../config'

const CHECKS = [
  {
    id: 'CHECK 01',
    head: 'You trade with Exness or XM',
    body: "The line is only as good as the fill behind it. We tested it to death on these two and we support these two. If your broker is somewhere else, the tool will still draw — we just won't stand behind what happens next.",
  },
  {
    id: 'CHECK 02',
    head: "Your account is opened under the team's link",
    body: "This is what keeps the desk funded and what tells us who you are. No link, no seat — not because we're difficult, but because there is no version of this where we hand the code to a stranger.",
  },
]

function useSequentialTicks(count) {
  const ref = useRef(null)
  const [n, setN] = useState(0)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          obs.disconnect()
          let i = 0
          const id = setInterval(() => {
            i += 1
            setN(i)
            if (i >= count) clearInterval(id)
          }, 620)
        })
      },
      { threshold: 0.35 }
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [count])

  return [ref, n]
}

export default function Qualify() {
  const [ref, verified] = useSequentialTicks(CHECKS.length)

  return (
    <section id="access" className="shell py-16 sm:py-24">
      <SectionHead
        path="~/access/control"
        title="Access is granted, not sold"
        kicker="Two conditions. Both are non-negotiable, and one of them will disqualify most people reading this page. That is the point of having them."
      />

      <div ref={ref} className="grid gap-px border border-line bg-line lg:grid-cols-2">
        {CHECKS.map((c, i) => {
          const done = verified > i
          return (
            <div key={c.id} className="bg-panel p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center border font-display text-[12px] font-bold transition-all duration-300 ${
                    done
                      ? 'border-phos bg-phos text-ink'
                      : 'border-line2 text-line2'
                  }`}
                >
                  {done ? '✓' : ''}
                </span>
                <span className="label text-phos/70">{c.id}</span>
                <span className="h-px flex-1 bg-line" />
                <span
                  className={`font-display text-[10px] tracking-[0.16em] transition-colors duration-300 ${
                    done ? 'text-phos' : 'text-mute'
                  }`}
                >
                  {done ? 'PASSED' : 'PENDING'}
                </span>
              </div>

              <h3 className="mt-6 font-display text-[19px] font-bold uppercase leading-tight tracking-[-0.01em] text-white sm:text-[22px]">
                {c.head}
              </h3>
              <p className="mt-4 text-[13.5px] leading-[1.8] text-mute">{c.body}</p>
            </div>
          )
        })}
      </div>

      {/* broker links */}
      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
        <div className="frame p-6 sm:p-8">
          <p className="label mb-5 text-phos/60">Open the account here</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            {BROKERS.map((b) => (
              <a
                key={b.name}
                href={b.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-1 items-center justify-between border border-line2 px-5 py-4 transition-colors hover:border-phos"
              >
                <span>
                  <span className="block font-display text-[17px] font-bold tracking-[-0.01em] text-white">
                    {b.name}
                  </span>
                  <span className="mt-1 block font-display text-[9.5px] tracking-[0.18em] text-mute">
                    {b.tag}
                  </span>
                </span>
                <span className="font-display text-[13px] text-mute transition-colors group-hover:text-phos">
                  ↗
                </span>
              </a>
            ))}
          </div>
          <p className="mt-5 text-[12.5px] leading-relaxed text-mute">
            Already have an account with one of them? Message us before you do anything —
            there is usually a way to move it across, and it takes about five minutes.
          </p>
        </div>

        <div className="frame flex flex-col justify-between border-l-2 border-l-alert/50 p-6 sm:p-8">
          <div>
            <p className="label mb-4 text-alert/70">If you don't qualify</p>
            <p className="text-[13.5px] leading-[1.8] text-mute">
              Then today isn't your day, and we'd rather tell you that now than take
              thirty-five dollars off you and hope you don't notice. Nothing here is
              designed to be talked around.
            </p>
          </div>
          <a
            href={waLink('I want to check whether I qualify for Billion $ Code.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost mt-7 w-full"
          >
            Check if you qualify
          </a>
        </div>
      </div>
    </section>
  )
}
