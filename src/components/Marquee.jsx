import { useRef } from 'react'
import { motion, useScroll, useVelocity, useSpring, useTransform, useMotionValue, useAnimationFrame } from 'motion/react'

const wrap = (min, max, v) => { const r = max - min; return ((((v - min) % r) + r) % r) + min }

// Text band that speeds up with scroll velocity.
export default function Marquee({ items, baseVelocity = -2.5 }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const factor = useTransform(useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 }), [0, 1000], [0, 5], { clamp: false })
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`)
  const dir = useRef(1)
  useAnimationFrame((_, d) => {
    let move = dir.current * baseVelocity * (d / 1000)
    if (factor.get() < 0) dir.current = -1
    else if (factor.get() > 0) dir.current = 1
    move += dir.current * move * factor.get()
    baseX.set(baseX.get() + move)
  })
  const row = (
    <span className="flex shrink-0 items-center">
      {items.map((t) => (
        <span key={t} className="flex items-center">
          <span className="px-7 font-display text-3xl uppercase md:text-5xl">{t}</span>
          <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true"><path d="M3 14c3-5 6-5 9 0s6 5 9 0" stroke="#D4FF3A" strokeWidth="3" fill="none" strokeLinecap="round" /></svg>
        </span>
      ))}
    </span>
  )
  return (
    <div className="overflow-hidden bg-cobalt py-6 text-white" aria-hidden="true">
      <motion.div className="flex whitespace-nowrap" style={{ x }}>{row}{row}{row}{row}</motion.div>
    </div>
  )
}
