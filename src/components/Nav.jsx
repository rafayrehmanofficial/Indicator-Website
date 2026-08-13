import { useEffect, useState } from 'react'
import { waLink, VERSION } from '../config'

const LINKS = [
  { href: '#proof', label: 'Proof' },
  { href: '#method', label: 'Method' },
  { href: '#access', label: 'Access' },
  { href: '#seat', label: 'Seat' },
]

export default function Nav() {
  const [solid, setSolid] = useState(false)
  const [clock, setClock] = useState('--:--:--')

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString('en-GB', {
          timeZone: 'UTC',
          hour12: false,
        })
      )
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        solid ? 'border-line bg-ink/92 backdrop-blur-md' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="shell flex h-14 items-center justify-between gap-4">
        <a href="#top" className="group flex items-baseline gap-2.5">
          <span className="font-display text-[15px] font-extrabold tracking-[-0.03em] text-white">
            BILLION<span className="text-phos"> $ </span>CODE
          </span>
          <span className="hidden font-display text-[10px] tracking-label text-mute sm:inline">
            {VERSION}
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-display text-[11px] uppercase tracking-[0.2em] text-mute transition-colors hover:text-phos"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <span className="hidden items-center gap-2 font-display text-[10px] tracking-label text-mute lg:flex">
            <span className="h-1.5 w-1.5 bg-phos" />
            {clock} UTC
          </span>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-phosdim px-3.5 py-2 font-display text-[10px] font-bold uppercase tracking-[0.18em] text-phos transition-colors hover:bg-phos hover:text-ink sm:px-4"
          >
            Request access
          </a>
        </div>
      </div>
    </header>
  )
}
