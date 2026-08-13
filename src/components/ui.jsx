import { useEffect, useRef, useState } from 'react'

export const Cursor = ({ className = '' }) => (
  <span
    aria-hidden="true"
    className={`ml-0.5 inline-block h-[1em] w-[0.55em] translate-y-[0.12em] bg-phos animate-blink ${className}`}
  />
)

/** Left-margin section marker + title. `path` reads like a filesystem node. */
export const SectionHead = ({ path, title, kicker }) => (
  <div className="mb-10 sm:mb-14">
    <div className="flex items-center gap-3">
      <span className="text-phosdim">▚</span>
      <span className="label text-phos/70">{path}</span>
      <span className="h-px flex-1 bg-line" />
    </div>
    <h2 className="mt-5 font-display text-[26px] font-extrabold uppercase leading-[1.1] tracking-[-0.02em] text-white sm:text-[38px]">
      {title}
    </h2>
    {kicker && <p className="lead mt-4 max-w-[58ch]">{kicker}</p>}
  </div>
)

/** Counts up once the element scrolls into view. Respects reduced motion. */
export function useCountUp(target, duration = 1400) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)
  const done = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setValue(target)
      return
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting || done.current) return
          done.current = true
          const start = performance.now()
          const tick = (now) => {
            const t = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - t, 3)
            setValue(Math.round(target * eased))
            if (t < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        })
      },
      { threshold: 0.4 }
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [target, duration])

  return [ref, value]
}

/** Fades content up the first time it enters the viewport. */
export function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setShown(true)),
      { threshold: 0.15 }
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : 'translateY(14px)',
        transition: `opacity 620ms ease-out ${delay}ms, transform 620ms cubic-bezier(.2,.7,.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
