import { motion, useReducedMotion } from 'motion/react'
import { Mail } from 'lucide-react'
import { Button } from './Button'
import { ResumeDialog } from './ResumeDialog'
import { GithubIcon, LinkedInIcon } from './Icons'
import { site, socials, taglineSegments } from '../data/site'

/** GitHub · Email · LinkedIn, in the order the design shows them. */
const heroLinks = [
  { label: 'GitHub', href: socials[0].href, icon: GithubIcon },
  { label: 'Email', href: `mailto:${site.email}`, icon: Mail },
  { label: 'LinkedIn', href: socials[1].href, icon: LinkedInIcon },
]

export function Hero() {
  const reduceMotion = useReducedMotion()

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
      className="band py-16 sm:py-24 lg:py-36"
    >
      <div className="mx-auto flex w-full max-w-[110rem] flex-col items-start gap-12 lg:flex-row lg:items-center lg:justify-center lg:gap-28 2xl:gap-48">
        <motion.div {...rise(0)} className="shrink-0 lg:order-last">
          <img
            src="/images/profilepic.jpg"
            alt={`Portrait of ${site.shortName}`}
            width="320"
            height="320"
            className="size-36 rounded-full border border-border object-cover sm:size-44 lg:size-80"
          />
        </motion.div>

        <div className="flex-1 lg:max-w-[46rem]">
          <motion.h1
            {...rise(0)}
            id="hero-heading"
            className="font-display text-5xl leading-[1.12] tracking-[0.005em] text-heading sm:text-6xl lg:text-7xl"
          >
            {site.shortName}
          </motion.h1>

          <motion.p {...rise(0.08)} className="mt-4 text-lg text-heading">
            {site.subtitle}
          </motion.p>

          <motion.ul
            {...rise(0.14)}
            className="mt-5 flex list-none items-center gap-5 p-0"
          >
            {heroLinks.map((link) => {
              const Icon = link.icon
              const external = link.href.startsWith('http')
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="inline-flex items-center justify-center p-2.5 text-accent transition-colors hover:text-heading lg:p-0"
                  >
                    <Icon className="size-6" />
                    <span className="sr-only">{link.label}</span>
                  </a>
                </li>
              )
            })}
          </motion.ul>

          <motion.p
            {...rise(0.2)}
            className="mt-8 max-w-[52ch] text-lg leading-relaxed"
          >
            {taglineSegments.map((segment) =>
              segment.emphasis ? (
                <strong key={segment.text} className="font-semibold text-heading">
                  {segment.text}
                </strong>
              ) : (
                <span key={segment.text}>{segment.text}</span>
              ),
            )}
          </motion.p>

          <motion.div {...rise(0.28)} className="mt-9 flex flex-wrap gap-3">
            <Button href="#projects" variant="primary">
              View projects
            </Button>
            <ResumeDialog />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
