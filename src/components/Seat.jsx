import { SectionHead } from './ui'
import { PRICE, CURRENCY, waLink } from '../config'

const INCLUDED = [
  'Billion $ Code on TradingView — invite only, tied to your username',
  'Entry, stop and target printed on every setup',
  'Direct line to the desk when a trade goes against you',
  'One-to-one mentorship on how to actually use it',
  'Every update the thirteen ship, for as long as you hold the seat',
]

const EXCLUDED = [
  'Copy trading or account management',
  'A promise about your results',
  'A discount for asking twice',
]

export default function Seat() {
  return (
    <section id="seat" className="shell py-20 sm:py-28">
      <SectionHead
        path="~/seat"
        title="One seat. One price."
        kicker="There is no starter tier, no pro tier and no lifetime deal waiting for you at the bottom of the page. Everyone pays the same and everyone gets the same."
      />

      <div className="frame">
        <div className="frame-bar">
          <span className="h-2 w-2 rounded-full bg-phos" />
          <span className="font-display text-[10px] uppercase tracking-[0.2em] text-txt">
            seat / monthly
          </span>
          <span className="ml-auto font-display text-[10px] tracking-[0.16em] text-mute">
            CANCEL ANY MONTH
          </span>
        </div>

        <div className="grid gap-px bg-line lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)]">
          {/* price */}
          <div className="flex flex-col justify-between bg-panel p-7 sm:p-9">
            <div>
              <div className="flex items-start gap-1">
                <span className="mt-2 font-display text-[26px] font-bold text-phos sm:mt-3 sm:text-[32px]">
                  {CURRENCY}
                </span>
                <span className="font-display text-[74px] font-extrabold leading-[0.85] tracking-[-0.055em] text-white sm:text-[96px]">
                  {PRICE}
                </span>
                <span className="mt-auto pb-3 font-display text-[13px] tracking-[0.14em] text-mute">
                  / month
                </span>
              </div>
              <p className="mt-6 text-[13.5px] leading-[1.8] text-mute">
                Less than one bad trade. Considerably less than the year you'd spend
                working this out on your own.
              </p>
            </div>

            <div className="mt-9">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full"
              >
                Request your seat
                <span aria-hidden="true">→</span>
              </a>
              <p className="mt-4 text-center font-display text-[9.5px] uppercase tracking-[0.16em] text-mute">
                Verified on WhatsApp · seats issued by hand
              </p>
            </div>
          </div>

          {/* contents */}
          <div className="bg-panel p-7 sm:p-9">
            <p className="label mb-6 text-phos/60">What lands in your account</p>
            <ul className="space-y-4">
              {INCLUDED.map((t) => (
                <li key={t} className="flex gap-3.5 text-[13.5px] leading-[1.7] text-txt/85">
                  <span className="mt-[3px] shrink-0 font-display text-[12px] text-phos">
                    ✓
                  </span>
                  {t}
                </li>
              ))}
            </ul>

            <p className="label mb-5 mt-9 text-mute">What it is not</p>
            <ul className="space-y-3">
              {EXCLUDED.map((t) => (
                <li key={t} className="flex gap-3.5 text-[13px] leading-[1.7] text-mute">
                  <span className="mt-[2px] shrink-0 font-display text-[12px] text-alert/70">
                    ✕
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
