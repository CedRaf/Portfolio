import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { About } from './sections/About'
import { Projects } from './sections/Projects'
import { Experience } from './sections/Experience'
import { Contact } from './sections/Contact'

/**
 * Two columns from `lg:` — identity pinned on the left, the work scrolling on
 * the right — and one column below it, identity first.
 */
function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <div className="mx-auto max-w-[78rem] px-6 sm:px-10 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:px-16 xl:gap-24">
        <Header />

        <div className="lg:py-20">
          <main id="main" tabIndex={-1} className="outline-none">
            <About />
            <Projects />
            <Experience />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App
