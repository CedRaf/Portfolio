import { motion, useReducedMotion } from 'motion/react'
import { Mail } from 'lucide-react'
import { Button } from './Button'
import { ResumeDialog } from './ResumeDialog'
import { TextResolve } from './TextResolve'
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

  /**
   * Everything below the name arrives as one group rather than as five
   * separately delayed rises. The old ladder finished at ~880ms, which is a
   * long time to hold the primary CTA back for no meaning.
   */
  const group = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 14 },
        animate: { opacity: 1, y: 0 },
        transition: {
          duration: 0.45,
          delay: 0.22,
          ease: [0.16, 1, 0.3, 1] as const,
        },
      }

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="band py-16 sm:py-24 lg:py-36"
    >
      <div className="mx-auto flex w-full max-w-[110rem] flex-col items-start gap-12 lg:flex-row lg:items-center lg:justify-center lg:gap-28 2xl:gap-48">
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  scale: 1.06,
                  clipPath: 'circle(30% at 50% 50%)',
                }
          }
          animate={{ opacity: 1, scale: 1, clipPath: 'circle(75% at 50% 50%)' }}
          transition={{ duration: 0.85, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="shrink-0 lg:order-last"
        >
          <img
            src="/images/profilepic.jpg"
            alt={`Portrait of ${site.shortName}`}
            width="320"
            height="320"
            className="size-36 rounded-full border border-border object-cover sm:size-44 lg:size-80"
          />
        </motion.div>

        <div className="flex-1 lg:max-w-[46rem]">
          <TextResolve
            as="h1"
            id="hero-heading"
            text={site.shortName}
            delay={0.08}
            className="font-display text-5xl leading-[1.12] tracking-[0.005em] text-heading sm:text-6xl lg:text-7xl"
          />

          <motion.div {...group}>
            <p className="mt-4 text-lg text-heading">{site.subtitle}</p>

            <ul className="mt-5 flex list-none items-center gap-5 p-0">
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
                      className="inline-flex items-center justify-center p-2.5 text-accent transition-[color,transform] duration-200 hover:text-heading motion-safe:hover:-translate-y-0.5 lg:p-0"
                    >
                      <Icon className="size-6" />
                      <span className="sr-only">{link.label}</span>
                    </a>
                  </li>
                )
              })}
            </ul>

            <p className="mt-8 max-w-[52ch] text-lg leading-relaxed">
              {taglineSegments.map((segment) =>
                segment.emphasis ? (
                  <strong
                    key={segment.text}
                    className="font-semibold text-heading"
                  >
                    {segment.text}
                  </strong>
                ) : (
                  <span key={segment.text}>{segment.text}</span>
                ),
              )}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="#projects" variant="primary">
                View projects
              </Button>
              <ResumeDialog />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
