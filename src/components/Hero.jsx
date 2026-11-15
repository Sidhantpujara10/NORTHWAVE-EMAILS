import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'motion/react'
import EmailThumb from './EmailThumb'
import { EMAILS, scrollToId } from '../lib'

// Pinned hero: three email cards start stacked, then fan out as you scroll.
export default function Hero() {
  const ref = useRef(null)
  const [spread, setSpread] = useState(300)
  useEffect(() => {
    const set = () => setSpread(window.innerWidth < 768 ? 90 : 300)
    set(); window.addEventListener('resize', set)
    return () => window.removeEventListener('resize', set)
  }, [])

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 26 })
  const xL = useTransform(p, [0, 0.6], [0, -spread])
  const xR = useTransform(p, [0, 0.6], [0, spread])
  const rL = useTransform(p, [0, 0.6], [-4, -10])
  const rR = useTransform(p, [0, 0.6], [4, 10])
  const yMid = useTransform(p, [0, 0.6], [0, -30])
  const yCards = useTransform(p, [0, 0.6], [0, -40])
  const headY = useTransform(p, [0, 0.5], [0, -80])
  const headOpacity = useTransform(p, [0.3, 0.6], [1, 0])
  const labelOpacity = useTransform(p, [0.55, 0.75], [0, 1])

  const words = ['Campaign emails', 'that survive', 'Outlook.']
  return (
    <section id="top" ref={ref} className="relative h-[230vh] bg-white">
      <div className="sticky top-0 flex h-screen flex-col items-center overflow-hidden pt-24">
        <motion.div style={{ y: headY, opacity: headOpacity }} className="px-5 text-center">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mx-auto inline-flex items-center gap-2 rounded-full bg-lime px-4 py-1.5 text-sm font-bold text-ink">
            <span className="h-2 w-2 rounded-full bg-cobalt" /> Northwave Festival 2027 · Email kit
          </motion.p>
          <h1 className="mt-5 font-display text-5xl leading-[0.95] tracking-tight md:text-7xl">
            {words.map((w, i) => (
              <span key={w} className="block overflow-hidden pb-[0.06em]">
                <motion.span className={`block ${i === 2 ? 'text-cobalt' : ''}`} initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}>{w}</motion.span>
              </span>
            ))}
          </h1>
        </motion.div>

        <motion.div style={{ y: yCards }} className="relative mt-8 h-[400px] w-[280px] md:mt-10">
          {[
            { e: EMAILS[0], x: xL, r: rL, z: 'z-10' },
            { e: EMAILS[2], x: xR, r: rR, z: 'z-10' },
            { e: EMAILS[1], y: yMid, z: 'z-20' },
          ].map(({ e, x, r, y, z }, i) => (
            <motion.div key={e.id} style={{ x, rotate: r, y }} initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.12, type: 'spring', bounce: 0.3 }} className={`absolute inset-0 ${z}`}>
              <EmailThumb email={e} className="shadow-[10px_10px_0_0_#2340F5]" />
              <motion.p style={{ opacity: labelOpacity }} className="mt-4 hidden text-center text-sm font-bold md:block">{e.name}</motion.p>
            </motion.div>
          ))}
        </motion.div>

        <motion.button style={{ opacity: labelOpacity }} onClick={() => scrollToId('preview')} className="relative z-30 mt-16 rounded-full bg-ink px-7 py-4 font-bold text-white hover:bg-cobalt">
          Open the live preview ↓
        </motion.button>
      </div>
    </section>
  )
}
