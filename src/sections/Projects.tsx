import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { Section } from '../components/Section'
import { AnimatedNumber } from '../components/AnimatedNumber'
import { Chip } from '../components/Chip'
import { Spotlight } from '../components/Spotlight'
import { projects } from '../data/projects'
import type { Project } from '../data/projects'

const cardLink =
  'inline-flex w-fit items-center gap-1.5 text-[15.75px] text-heading no-underline underline-offset-4 transition-colors hover:text-accent hover:underline'

/**
 * `isolate` + `overflow-hidden` give the Spotlight a stacking context to sit
 * behind the card's text and a boundary to be clipped by.
 */
const card =
  'relative isolate flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-muted p-7 transition-[border-color,transform] duration-200 hover:border-heading/40 motion-safe:hover:-translate-y-1'

const groupHeading = 'mb-6 text-2xl text-heading lg:text-[29.4px]'

function ProjectCard({
  project,
  index,
  reduceMotion,
}: {
  project: Project
  index: number
  reduceMotion: boolean | null
}) {
  return (
    <motion.li
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.45,
        delay: reduceMotion ? 0 : index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={card}
    >
      <Spotlight />

      <h3 className="font-display text-2xl leading-snug text-heading">
        {project.title}
      </h3>

      <ul className="flex list-none flex-wrap gap-2 p-0">
        {project.stack.map((tech) => (
          <Chip key={tech}>{tech}</Chip>
        ))}
      </ul>

      <p className="leading-relaxed">{project.description}</p>

      {project.highlights && (
        <ul className="flex list-none flex-col gap-1.5 p-0">
          {project.highlights.map((highlight) => (
            <li
              key={typeof highlight === 'string' ? highlight : highlight.prefix}
              className="flex gap-2.5"
            >
              <span aria-hidden="true">·</span>
              {typeof highlight === 'string' ? (
                <span>{highlight}</span>
              ) : (
                <span>
                  {highlight.prefix}
                  <AnimatedNumber value={highlight.value} />
                  {highlight.suffix}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}

      {(project.repoUrl || project.paperUrl) && (
        <div className="mt-auto flex flex-wrap items-center gap-6 pt-3">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cardLink}
            >
              View source
              <span className="sr-only"> for {project.title}</span>
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          )}

          {project.paperUrl && (
            <a
              href={project.paperUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cardLink}
            >
              View paper
              <span className="sr-only"> for {project.title}</span>
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          )}
        </div>
      )}
    </motion.li>
  )
}

export function Projects() {
  const reduceMotion = useReducedMotion()

  const featured = projects.filter((project) => project.featured)
  const rest = projects.filter((project) => !project.featured)

  return (
    <Section id="projects" title="Projects">
      {featured.length > 0 && (
        <>
          <h3 className={groupHeading}>Selected Work</h3>
          <ul className="mb-16 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-2">
            {featured.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                reduceMotion={reduceMotion}
              />
            ))}
          </ul>
        </>
      )}

      {rest.length > 0 && (
        <>
          <h3 className={groupHeading}>Other Projects</h3>
          <ul className="grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-2 xl:grid-cols-3">
            {rest.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                reduceMotion={reduceMotion}
              />
            ))}
          </ul>
        </>
      )}
    </Section>
  )
}
