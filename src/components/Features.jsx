import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import Reveal from './Reveal'

const ITEMS = [
  ['3 campaign emails', 'Lineup launch, early bird reminder and waitlist welcome. Each one has a single clear goal and one main button.'],
  ['Works in Outlook', 'Written in MJML, which compiles to nested tables and Outlook conditional code. No broken columns in Outlook 2016 or 365.'],
  ['Dark mode ready', 'Custom dark styles for Apple Mail, iOS and Outlook.com, so text never turns invisible on a dark background.'],
  ['Mobile first', 'Columns stack under 480px, headlines shrink and every button is big enough to tap with a thumb.'],
  ['Personalised', 'Merge fields like {{first_name}} and {{city}} plug straight into Mailchimp, SendGrid or Salesforce Marketing Cloud.'],
  ['Safe to send', 'Every email has a preheader, an unsubscribe link, a postal address and stays under Gmail’s clipping limit.'],
]

export default function Features() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const line = useTransform(scrollYProgress, [0, 1], [0, 1])
  return (
    <section id="kit" ref={ref} className="scroll-mt-16 overflow-x-clip bg-white px-5 py-28 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-[1fr_1.3fr]">
        <div className="md:sticky md:top-28 md:self-start">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-cobalt">What's inside</p>
            <h2 className="mt-3 font-display text-5xl leading-none tracking-tight md:text-6xl">Built the way real email teams build.</h2>
            <p className="mt-5 max-w-sm text-lg text-ink-soft">Email is the hardest kind of HTML. No flexbox, no grid, and every inbox renders it differently.</p>
          </Reveal>
        </div>
        <div className="relative pl-10">
          <div className="absolute left-3 top-2 h-full w-1 rounded-full bg-mist" />
          <motion.div style={{ scaleY: line }} className="absolute left-3 top-2 h-full w-1 origin-top rounded-full bg-cobalt" />
          <ol className="space-y-12">
            {ITEMS.map(([t, d], i) => (
              <li key={t}><Reveal delay={0.05} x={30} y={0}>
                <div className="relative">
                  <span className="absolute -left-[2.35rem] top-1 grid h-7 w-7 place-items-center rounded-full border-4 border-white bg-lime text-[10px] font-black text-ink">{i + 1}</span>
                  <h3 className="font-display text-2xl md:text-3xl">{t}</h3>
                  <p className="mt-2 max-w-lg text-lg text-ink-soft">{d}</p>
                </div>
              </Reveal></li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
