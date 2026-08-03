import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Footer } from './components/Footer'
import { About } from './sections/About'
import { Experience } from './sections/Experience'
import { Projects } from './sections/Projects'
import { Contact } from './sections/Contact'

function App() {
  return (
    <>
      <Header />

      <main id="main" className="grow">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </>
  )
}

export default App
