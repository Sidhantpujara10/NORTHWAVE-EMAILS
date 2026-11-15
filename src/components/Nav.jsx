import { useState } from 'react'
import { motion, useScroll, useSpring, useMotionValueEvent } from 'motion/react'
import Logo from './Logo'
import { scrollToId } from '../lib'

const links = [['kit', "What's inside"], ['preview', 'Live preview'], ['code', 'How it works']]

export default function Nav() {
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const [hidden, setHidden] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setHidden(y > (scrollY.getPrevious() ?? 0) && y > 200))

  return (
    <>
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-cobalt" />
      <motion.header animate={{ y: hidden ? '-110%' : 0 }} transition={{ duration: 0.35 }} className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-white/90 backdrop-blur">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8" aria-label="Main">
          <button onClick={() => scrollToId('top')} aria-label="Back to top"><Logo /></button>
          <ul className="hidden gap-1 md:flex">
            {links.map(([id, label]) => (
              <li key={id}><button onClick={() => scrollToId(id)} className="rounded-full px-4 py-2 text-sm font-semibold text-ink-soft transition-colors hover:bg-cobalt-soft hover:text-ink">{label}</button></li>
            ))}
          </ul>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={() => scrollToId('preview')} className="rounded-full bg-cobalt px-5 py-2.5 text-sm font-bold text-white hover:bg-ink">
            Try the preview
          </motion.button>
        </nav>
      </motion.header>
    </>
  )
}
