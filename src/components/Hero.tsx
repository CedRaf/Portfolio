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
      className="band border-b border-border py-24 lg:py-40"
    >
      <div className="flex flex-col items-start gap-14 lg:flex-row lg:items-center lg:justify-between lg:gap-20">
        <div className="flex-1">
          <motion.p
            {...rise(0)}
            className="mb-5 flex items-center gap-2 text-xs uppercase tracking-[0.18em]"
          >
            <MapPin className="size-3.5" aria-hidden="true" />
            {site.location}
          </motion.p>

          <motion.h1
            {...rise(0.08)}
            id="hero-heading"
            /* Serif display wants air: negative tracking and 1.05 leading read
               as cramped at this size, which flat sans headings tolerate. */
            className="font-display text-5xl leading-[1.12] tracking-[0.005em] text-heading sm:text-6xl lg:text-8xl"
          >
            {site.shortName}
          </motion.h1>

          <motion.p
            {...rise(0.16)}
            className="mt-7 max-w-[52ch] text-lg leading-relaxed lg:text-xl"
          >
            {site.tagline}
          </motion.p>

          <motion.div {...rise(0.24)} className="mt-10 flex flex-wrap gap-3">
            <Button href="#projects" variant="primary">
              View projects
            </Button>
            <Button href={site.resumeUrl} download type="application/pdf">
              <Download className="size-4" aria-hidden="true" />
              Download resume
            </Button>
          </motion.div>
        </div>

        <motion.div {...rise(0.1)} className="shrink-0">
          <img
            src="/images/profilepic.jpg"
            alt={`Portrait of ${site.shortName}`}
            width="288"
            height="288"
            className="size-52 rounded-full border border-border object-cover lg:size-72"
          />
        </motion.div>
      </div>
    </section>
  )
}
