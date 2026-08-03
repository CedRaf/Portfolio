import { motion, useReducedMotion } from 'motion/react'
import { Download, MapPin } from 'lucide-react'
import { Button } from './Button'
import { site } from '../data/site'

export function Hero() {
  const reduceMotion = useReducedMotion()

  // Above the fold, so this plays on load rather than on scroll.
  const rise = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.6,
            delay,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        }

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="border-b border-border px-5 py-20 lg:px-8 lg:py-30"
    >
      <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
        {/* Left column: all your existing text content */}
        <div className="flex-1">
          <motion.p
            {...rise(0)}
            className="mb-3 flex items-center gap-1.5 text-[15px]"
          >
            <MapPin className="size-4" aria-hidden="true" />
            {site.location}
          </motion.p>

          <motion.h1
            {...rise(0.08)}
            id="hero-heading"
            className="mb-4 text-4xl font-medium tracking-tight text-heading lg:text-6xl"
          >
            {site.shortName}
          </motion.h1>

          <motion.p
            {...rise(0.16)}
            className="max-w-[54ch] text-lg leading-relaxed lg:text-xl"
          >
            {site.tagline}
          </motion.p>

          <motion.div {...rise(0.24)} className="mt-8 flex flex-wrap gap-3">
            <Button href="#projects" variant="primary">
              View projects
            </Button>
            <Button href={site.resumeUrl} download type="application/pdf">
              <Download className="size-4" aria-hidden="true" />
              Download resume
            </Button>
          </motion.div>
        </div>

        <motion.div {...rise(0.1)} className="shrink-0 lg:pr-10">
          <img
            src="/images/profilepic.jpg"
            alt={`Portrait of ${site.shortName}`}
            className="size-50 rounded-full object-cover lg:size-70"
          />
        </motion.div>
      </div>
    </section>
  )
}
