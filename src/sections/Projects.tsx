import { motion, useReducedMotion } from 'motion/react'
import { Section } from '../components/Section'
import { ExternalLink } from '../components/ExternalLink'
import { ProjectSelector } from '../components/ProjectSelector'
import { TechStack } from '../components/TechStack'
import { projects } from '../data/projects'
import type { Featured, Project } from '../data/projects'

type Personal = Extract<Project, { kind: 'personal' }>

// Module scope, so the selector receives a stable array across renders.
const featured = projects.filter((project): project is Featured => project.kind !== 'personal')
const personal = projects.filter((project): project is Personal => project.kind === 'personal')

const groupHeading = 'mb-6 text-2xl text-heading lg:text-[29.4px]'

function ProjectRow({
  project,
  index,
  reduceMotion,
}: {
  project: Personal
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
      className="grid gap-4 border-b border-border py-7 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)_auto] lg:gap-12"
    >
      <div>
        <h4 className="font-display text-2xl leading-snug text-heading">{project.title}</h4>
        <p className="mt-1 text-[15.75px]">{project.period}</p>
      </div>
      <div className="flex flex-col gap-4">
        <p className="max-w-[70ch] leading-relaxed">{project.description}</p>
        <TechStack items={project.stack} />
      </div>
      <div className="flex min-h-11 items-center lg:min-h-0 lg:items-start">
        <ExternalLink href={project.repoUrl} text="View source" title={project.title} />
      </div>
    </motion.li>
  )
}

export function Projects() {
  const reduceMotion = useReducedMotion()

  return (
    <Section id="projects" title="Projects">
      {featured.length > 0 && (
        <>
          <h3 className={groupHeading}>Selected Work</h3>
          <div className="mb-20">
            <ProjectSelector projects={featured} />
          </div>
        </>
      )}

      {personal.length > 0 && (
        <>
          <h3 className={groupHeading}>Other Projects</h3>
          <ul className="list-none border-t border-border p-0">
            {personal.map((project, index) => (
              <ProjectRow
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
