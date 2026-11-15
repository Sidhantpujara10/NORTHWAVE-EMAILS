import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import Reveal from './Reveal'
import Counter from './Counter'
import { EMAILS } from '../lib'

const MJML = `<mj-section background-color="#2340F5">
  <mj-column width="62%">
    <mj-text mj-class="eyebrow" color="#D4FF3A">
      EARLY BIRD · ENDS FRIDAY
    </mj-text>
    <mj-text mj-class="display" color="#FFFFFF">
      3 day pass ₹2,499
    </mj-text>
  </mj-column>
  <mj-column width="38%">
    <mj-button href="{{ticket_url}}">
      Get tickets
    </mj-button>
  </mj-column>
</mj-section>`

const htmlLines = Math.round(EMAILS.reduce((a, e) => a + e.html.split('\n').length, 0) / EMAILS.length)

export default function CodeSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rotate = useTransform(scrollYProgress, [0, 1], [-6, 6])
  const y = useTransform(scrollYProgress, [0, 1], [80, -80])
  return (
    <section id="code" ref={ref} className="scroll-mt-16 overflow-hidden bg-white px-5 py-28 md:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-cobalt">How it works</p>
            <h2 className="mt-3 font-display text-5xl leading-none tracking-tight md:text-6xl">Write it short. Ship it bulletproof.</h2>
            <p className="mt-5 max-w-md text-lg text-ink-soft">Each email is written in MJML, then a Node build script compiles it into the nested table HTML that every inbox understands.</p>
          </Reveal>
          <div className="mt-10 grid grid-cols-3 gap-4">
            {[[MJML.split('\n').length, ' lines', 'of MJML for the block shown'], [htmlLines, ' lines', 'of HTML per compiled email'], [EMAILS.length, '', 'emails, one command']].map(([n, s, l], i) => (
              <Reveal key={l} delay={i * 0.1} className="rounded-2xl bg-mist p-5">
                <p className="font-display text-4xl text-cobalt"><Counter to={n} />{s && <span className="text-2xl">{s}</span>}</p>
                <p className="mt-1 text-sm font-semibold text-ink-soft">{l}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2} className="mt-8">
            <code className="inline-block rounded-xl bg-ink px-5 py-3 font-mono text-sm text-lime">$ npm run emails</code>
          </Reveal>
        </div>
        <motion.div style={{ rotate, y }} className="min-w-0 rounded-3xl bg-ink p-6 shadow-[14px_14px_0_0_#D4FF3A] md:p-8">
          <div className="mb-4 flex gap-2"><span className="h-3 w-3 rounded-full bg-lime" /><span className="h-3 w-3 rounded-full bg-cobalt" /><span className="h-3 w-3 rounded-full bg-white/30" /></div>
          <pre className="overflow-x-auto text-[13px] leading-relaxed text-white/90"><code>{MJML.split('\n').map((l, i) => (
            <span key={i} className="block"><span className="mr-4 inline-block w-5 select-none text-right text-white/30">{i + 1}</span>{colorize(l)}</span>
          ))}</code></pre>
        </motion.div>
      </div>
    </section>
  )
}

// Very small highlighter: tags in lime, attribute values in light blue.
function colorize(line) {
  return line.split(/(<\/?[\w-]+|"[^"]*"|\/?>)/g).map((part, i) =>
    /^<\/?[\w-]+$|^\/?>$/.test(part) ? <span key={i} className="text-lime">{part}</span>
      : /^"/.test(part) ? <span key={i} className="text-[#8C9BFF]">{part}</span>
      : part
  )
}
