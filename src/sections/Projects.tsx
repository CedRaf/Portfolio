import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { Section } from '../components/Section'
import { projects } from '../data/projects'
import type { Project } from '../data/projects'

const cardLink =
  'inline-flex w-fit items-center gap-1.5 border-b border-transparent pb-0.5 text-[15px] text-accent no-underline transition-colors hover:border-accent'

const card =
  'flex flex-col gap-4 rounded-xl border border-border bg-muted p-8 transition-[border-color,transform] duration-200 hover:border-heading/40 motion-safe:hover:-translate-y-1'

const label = 'text-xs font-medium uppercase tracking-[0.18em] text-fg'

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
      <div className="flex flex-col gap-2">
        <h3 className="font-display text-2xl text-heading">{project.title}</h3>
        <p className="font-mono text-xs uppercase tracking-[0.12em] whitespace-nowrap">
          {project.period}
        </p>
      </div>

      <p className="leading-relaxed">{project.description}</p>

      {project.highlights && (
        <ul className="flex list-disc flex-col gap-2 pl-5">
          {project.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      )}

      <ul className="flex list-none flex-wrap gap-2 p-0">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-border px-3 py-1 font-mono text-[13px] text-heading"
          >
            {tech}
          </li>
        ))}
      </ul>

      {(project.repoUrl || project.paperUrl) && (
        <div className="mt-auto flex flex-wrap items-center gap-5 pt-2">
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
          <p className={`${label} mb-5`}>Selected work</p>
          <ul className="mb-14 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2">
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
          <p className={`${label} mb-5`}>More projects</p>
          <ul className="grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2 xl:grid-cols-3">
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
