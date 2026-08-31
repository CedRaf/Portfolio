import { MotionConfig } from 'motion/react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Footer } from './components/Footer'
import { FloatingResume } from './components/FloatingResume'
import { Experience } from './sections/Experience'
import { Projects } from './sections/Projects'
import { Contact } from './sections/Contact'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Header />

      <main id="main" className="grow">
        <Hero />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <Footer />

      <FloatingResume />
    </MotionConfig>
  )
}

export default App
