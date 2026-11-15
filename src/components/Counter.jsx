import { useEffect, useRef } from 'react'
import { animate, useInView } from 'motion/react'
export default function Counter({ to }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => { if (ref.current) ref.current.textContent = Math.round(v) } })
    return () => c.stop()
  }, [inView, to])
  return <span ref={ref}>0</span>
}
