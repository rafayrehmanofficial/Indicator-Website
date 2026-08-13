import { useEffect, useRef } from 'react'

const GLYPHS = '!<>-_\\/[]{}=+*^?#________01xX$§%&'

// Reveals text by resolving each character out of random glyphs.
// Fires once when scrolled into view. Falls back to plain text under reduced motion.
export default function Scramble({ text, className = '', as: Tag = 'span', delay = 0, speed = 1 }) {
  const ref = useRef(null)
  const fired = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      el.textContent = text
      return
    }

    let raf = 0
    let frame = 0
    let queue = []

    const build = () => {
      queue = []
      for (let i = 0; i < text.length; i++) {
        const start = Math.floor(Math.random() * 16) / speed
        const end = start + (10 + Math.floor(Math.random() * 18)) / speed
        queue.push({ to: text[i], start, end, ch: '' })
      }
      frame = 0
      tick()
    }

    const tick = () => {
      let out = ''
      let done = 0
      for (const q of queue) {
        if (frame >= q.end) {
          done++
          out += q.to
        } else if (frame >= q.start) {
          if (!q.ch || Math.random() < 0.3)
            q.ch = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          out += `<span style="color:#00FF9C;opacity:.7">${q.ch}</span>`
        } else {
          out += '<span style="opacity:0">' + (q.to === ' ' ? '&nbsp;' : q.to) + '</span>'
        }
      }
      el.innerHTML = out
      if (done < queue.length) {
        frame++
        raf = requestAnimationFrame(tick)
      } else {
        el.textContent = text
      }
    }

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting && !fired.current) {
            fired.current = true
            setTimeout(build, delay)
          }
        }),
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [text, delay, speed])

  return (
    <Tag ref={ref} className={className}>
      {text}
    </Tag>
  )
}
