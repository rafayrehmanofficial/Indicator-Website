import { Reveal, SectionHead } from './ui'

const STEPS = [
  {
    n: '01',
    head: 'It watches',
    body: 'The code reads where money got trapped and where it has to come back. You never see the maths. You were never going to enjoy the maths.',
    op: 'scan(instruments) → pressure_map',
  },
  {
    n: '02',
    head: 'It marks',
    body: 'One band prints on your chart and then it stops moving. It does not shift, it does not repaint, it does not quietly redraw itself after the candle closes to look right.',
    op: 'emit(band) → locked',
  },
  {
    n: '03',
    head: 'You execute',
    body: 'Entry, stop and target arrive together. Your only remaining job is the hard one: taking the trade you said you would take.',
    op: 'entry · stop · target',
  },
]

const NAMES = [
  'K.A', 'M.R', 'S.T', 'J.L', 'A.B', 'D.N', 'R.H',
  'F.K', 'I.S', 'P.M', 'O.C', 'T.W', 'Z.Q',
]

export default function Method() {
  return (
    <section id="method" className="shell py-20 sm:py-28">
      <SectionHead
        path="~/engine/sequence"
        title="Three moves, in order"
        kicker="Everything the desk argued about for four years collapsed into this. It runs the same way every session, on every instrument, whether or not you are watching."
      />

      <ol className="grid gap-px border border-line bg-line lg:grid-cols-3">
        {STEPS.map((s, i) => (
          <li key={s.n} className="bg-panel">
            <Reveal delay={i * 110} className="h-full">
              <div className="flex h-full flex-col p-6 sm:p-8">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-[13px] font-bold tracking-[0.1em] text-phos">
                    {s.n}
                  </span>
                  <span className="h-px flex-1 bg-line" />
                </div>
                <h3 className="mt-6 font-display text-[22px] font-extrabold uppercase tracking-[-0.02em] text-white sm:text-[26px]">
                  {s.head}
                </h3>
                <p className="mt-4 flex-1 text-[13.5px] leading-[1.8] text-mute">{s.body}</p>
                <code className="mt-7 block border border-line bg-ink px-3 py-2.5 font-display text-[10.5px] tracking-[0.06em] text-phosdim">
                  <span className="text-phos">›</span> {s.op}
                </code>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>

      {/* thirteen signatures */}
      <Reveal className="mt-5">
        <div className="frame">
          <div className="frame-bar">
            <span className="font-display text-[10px] uppercase tracking-[0.2em] text-mute">
              operator signatures
            </span>
            <span className="ml-auto font-display text-[10px] tracking-[0.14em] text-phos">
              13 / 13 VERIFIED
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 p-5 sm:gap-2.5 sm:p-6">
            {NAMES.map((n, i) => (
              <span
                key={n}
                style={{ animationDelay: `${i * 55}ms` }}
                className="animate-slideup border border-line2 px-3 py-2 font-display text-[11px] tracking-[0.14em] text-txt/80"
              >
                {n}
                <span className="ml-2 text-phos">✓</span>
              </span>
            ))}
          </div>
          <p className="border-t border-line px-5 py-4 text-[13px] leading-relaxed text-mute sm:px-6">
            Thirteen people trading their own capital, in four countries, on desks that
            never agreed on anything except this. They stay anonymous for the same reason
            you would.
          </p>
        </div>
      </Reveal>
    </section>
  )
}
