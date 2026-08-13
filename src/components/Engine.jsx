import LiveChart from './LiveChart'
import Tape from './Tape'
import { SectionHead, Reveal } from './ui'

export default function Engine() {
  return (
    <section id="engine" className="shell py-20 sm:py-28">
      <SectionHead
        path="~/engine/live"
        title="Watch it work"
        kicker="One workstation. The code reads pressure, prints the zone, and fires entry, stop and target — while the tape logs every position it opens and closes."
      />
      <Reveal>
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <LiveChart />
          <Tape />
        </div>
      </Reveal>
    </section>
  )
}
