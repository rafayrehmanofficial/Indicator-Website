import { waLink, SOCIALS, VERSION } from '../config'
import { Cursor } from './ui'

export default function Footer() {
  const socials = SOCIALS.filter((s) => s.href)

  return (
    <>
      {/* closing call */}
      <section className="border-y border-line bg-panel">
        <div className="shell py-20 text-center sm:py-28">
          <p className="label text-phos/60">~/exit</p>
          <h2 className="mx-auto mt-6 max-w-[16ch] font-grotesk text-[38px] font-bold uppercase leading-[0.98] tracking-[-0.04em] text-white sm:text-[64px]">
            The chart was
            <span className="text-phos glow"> never </span>
            the hard part
          </h2>
          <p className="lead mx-auto mt-6 max-w-[52ch]">
            You already know that. Every month you spend deciding is another month of
            reading candles by hand while thirteen people read one line.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Request access
              <span aria-hidden="true">→</span>
            </a>
            <span className="font-display text-[10.5px] uppercase tracking-[0.16em] text-mute">
              replies in under an hour, most days
            </span>
          </div>
        </div>
      </section>

      <footer className="shell py-12 sm:py-16">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="font-display text-[15px] font-extrabold tracking-[-0.03em] text-white">
              BILLION<span className="text-phos"> $ </span>CODE
              <Cursor className="h-[0.8em] w-[0.45em]" />
            </div>
            <p className="mt-2 font-display text-[10px] tracking-[0.16em] text-mute">
              {VERSION} · BUILT BY THIRTEEN
            </p>
          </div>

          {socials.length > 0 && (
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-[10.5px] uppercase tracking-[0.18em] text-mute transition-colors hover:text-phos"
                >
                  {s.name}
                </a>
              ))}
            </nav>
          )}
        </div>

        <div className="mt-10 border-t border-line pt-7">
          <p className="label mb-4 text-mute">Risk notice</p>
          <p className="max-w-[95ch] text-[11.5px] leading-[1.9] text-mute/85">
            Trading CFDs, forex and leveraged products carries a high level of risk and
            can result in the loss of all of your capital. Billion $ Code is a technical
            analysis tool. It does not execute trades, guarantee outcomes or constitute
            financial advice, and nothing on this page is a recommendation to buy or sell
            any instrument. Figures shown, including average daily pips, are historical
            aggregates from the team's own accounts and are not a projection of your
            results. Past performance does not predict future performance. Only trade with
            money you can afford to lose, and seek independent advice if you are unsure.
          </p>

          <p className="label mb-3 mt-8 text-mute">Affiliate disclosure</p>
          <p className="max-w-[95ch] text-[11.5px] leading-[1.9] text-mute/85">
            We receive a commission from Exness and XM on accounts opened through our
            partner links. This is disclosed openly because it funds the desk and keeps
            the seat at thirty-five dollars. We are not affiliated with, endorsed by or
            operated by TradingView, Exness or XM.
          </p>

          <p className="mt-8 font-display text-[10px] tracking-[0.14em] text-line2">
            © {new Date().getFullYear()} BILLION $ CODE — ALL RIGHTS RESERVED
          </p>
        </div>
      </footer>
    </>
  )
}
