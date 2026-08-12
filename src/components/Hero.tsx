import { motion, useReducedMotion } from 'motion/react'
import { MapPin } from 'lucide-react'
import { Button } from './Button'
import { ResumeDialog } from './ResumeDialog'
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
      <div className="mx-auto flex w-full max-w-[110rem] flex-col items-start gap-14 lg:flex-row lg:items-center lg:justify-center lg:gap-24 2xl:gap-48">
        <div className="flex-1 lg:max-w-[54rem]">
          <motion.h1
            {...rise(0)}
            id="hero-heading"
            className="font-display text-5xl leading-[1.12] tracking-[0.005em] text-heading sm:text-6xl lg:text-8xl"
          >
            {site.shortName}
          </motion.h1>

          <motion.p
            {...rise(0.08)}
            className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-lg text-heading"
          >
            {site.role}
            <span className="text-fg" aria-hidden="true">
              ·
            </span>
            <span className="inline-flex items-center gap-1.5 text-base text-fg">
              <MapPin className="size-4" aria-hidden="true" />
              {site.location}
            </span>
          </motion.p>

          <motion.p
            {...rise(0.16)}
            className="mt-6 max-w-[52ch] text-lg leading-relaxed lg:text-xl"
          >
            {site.tagline}
          </motion.p>

          <motion.div {...rise(0.24)} className="mt-10 flex flex-wrap gap-3">
            <Button href="#projects" variant="primary">
              View projects
            </Button>
            <ResumeDialog />
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
