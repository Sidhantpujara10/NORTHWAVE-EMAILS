import { MotionConfig } from 'motion/react'
import { useLenis } from './lib'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Features from './components/Features'
import Viewer from './components/Viewer'
import CodeSection from './components/CodeSection'
import Footer from './components/Footer'

export default function App() {
  useLenis()
  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <main>
        <Hero />
        <Marquee items={['Gmail', 'Outlook', 'Apple Mail', 'Yahoo', 'Dark mode', 'Mobile', 'Images off']} />
        <Features />
        <Viewer />
        <CodeSection />
      </main>
      <Footer />
    </MotionConfig>
  )
}
