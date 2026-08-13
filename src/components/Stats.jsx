import { STATS } from '../config'
import { useCountUp } from './ui'

function Stat({ value, suffix, label, note }) {
  const [ref, n] = useCountUp(value)
  return (
    <div ref={ref} className="bg-panel px-5 py-8 sm:px-7 sm:py-10">
      <div className="font-grotesk text-[46px] font-bold leading-none tracking-[-0.05em] text-white sm:text-[62px]">
        {n}
        <span className="text-phos">{suffix}</span>
      </div>
      <div className="mt-4 font-display text-[11px] uppercase tracking-[0.18em] text-txt">
        {label}
      </div>
      <div className="mt-1.5 font-display text-[10px] uppercase tracking-[0.16em] text-mute">
        {note}
      </div>
    </div>
  )
}

export default function Stats() {
  return (
    <section className="shell py-6 sm:py-10">
      <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => (
          <Stat key={s.label} {...s} />
        ))}
      </div>
      <p className="mt-4 font-display text-[10px] leading-relaxed tracking-[0.12em] text-mute">
        Figures are the desk's combined running average across live and forward-tested
        accounts. Your results depend on your execution, your broker and your risk.
      </p>
    </section>
  )
}
