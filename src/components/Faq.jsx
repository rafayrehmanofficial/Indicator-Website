import { useState } from 'react'
import { SectionHead } from './ui'

const QA = [
  {
    q: 'Does it repaint?',
    a: "No. Once the band prints it is fixed. If a tool has ever moved on you after the close, you already know why we lead with this.",
  },
  {
    q: 'What can I trade with it?',
    a: 'It was built on gold and that is still where it is sharpest. It runs on any liquid pair, index or crypto with real volume behind it. Thin, exotic markets are not worth your time or ours.',
  },
  {
    q: 'Do I need experience?',
    a: "No, but you need to be able to follow an instruction without improving on it. The people who struggle are not the beginners. They're the ones who move their stop.",
  },
  {
    q: 'Why only Exness and XM?',
    a: 'Spread and fill quality decide whether a two-pip entry is a two-pip entry. We tested these two properly, we support these two, and the referral requirement is how the desk keeps the lights on without charging you three hundred a month.',
  },
  {
    q: 'I already have an account with one of them.',
    a: 'Message us before you open anything new. There is usually a clean way to bring an existing account under the team, and it takes about five minutes.',
  },
  {
    q: 'What timeframes?',
    a: 'One minute through four hours. Most of the desk lives on the five and fifteen minute charts during London and New York.',
  },
  {
    q: 'Is the mentorship real or is it a group chat?',
    a: 'It is a person. You send your chart, you get told what you did and what to do instead. That is the part most people are actually paying for.',
  },
  {
    q: 'Can I cancel?',
    a: 'Any month, no conversation required. Access ends when the month does.',
  },
]

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section className="shell py-16 sm:py-24">
      <SectionHead path="~/faq" title="Before you message us" />

      <div className="border-t border-line">
        {QA.map((item, i) => {
          const isOpen = open === i
          return (
            <div key={item.q} className="border-b border-line">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full items-baseline gap-4 py-5 text-left transition-colors hover:text-phos sm:gap-6 sm:py-6"
              >
                <span className="font-display text-[10px] tracking-[0.16em] text-phosdim">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex-1 font-grotesk text-[16px] font-bold uppercase tracking-[-0.005em] text-white sm:text-[18px]">
                  {item.q}
                </span>
                <span
                  className={`shrink-0 font-display text-[15px] text-phos transition-transform duration-300 ${
                    isOpen ? 'rotate-45' : ''
                  }`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
              <div
                className="grid transition-[grid-template-rows] duration-300 ease-out"
                style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
              >
                <div className="overflow-hidden">
                  <p className="max-w-[70ch] pb-6 pl-[34px] text-[13.5px] leading-[1.85] text-mute sm:pl-[48px]">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
