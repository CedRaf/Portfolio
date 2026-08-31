import { useEffect, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { nav } from '../data/site'

/** The hero is observed too, so scrolling back to the top clears the marker. */
const sectionIds = ['top', ...nav.map((item) => item.href.slice(1))]

/**
 * Tracks which section is under a narrow band across the middle of the
 * viewport. This is what the nav marker follows — on a long single-page scroll
 * the header is otherwise completely inert, and nothing tells the reader where
 * in the page they currently are.
 */
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length > 0) {
          setActive(visible[visible.length - 1].target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )

    for (const id of sectionIds) {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  return active
}

export function Header() {
  const reduceMotion = useReducedMotion()
  const active = useActiveSection()
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-[#202020]/100 backdrop-blur-lg">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <div className="band flex items-center justify-end gap-6 py-4">
        <nav aria-label="Primary">
          <ul className="flex list-none items-center gap-5 p-0 lg:gap-10">
            {nav.map((item) => {
              const isActive = active === item.href.slice(1)
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? 'location' : undefined}
                    className="relative inline-block py-3 text-[15.75px] text-heading no-underline transition-colors hover:text-accent lg:py-1.5"
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        aria-hidden="true"
                        transition={{
                          duration: reduceMotion ? 0 : 0.35,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="absolute inset-x-0 bottom-2 h-px bg-accent lg:bottom-0"
                      />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>

      {/* Scroll depth, drawn along the header's own bottom edge. */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: reduceMotion ? scrollYProgress : smoothProgress }}
        className="absolute inset-x-0 -bottom-px h-px origin-left bg-accent/60"
      />
    </header>
  )
}
