import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { Section } from '../components/Section'
import { projects } from '../data/projects'

export function Projects() {
  const reduceMotion = useReducedMotion()

  return (
    <Section id="projects" title="Projects">
      <ul className="grid list-none grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-5 p-0">
        {projects.map((project, index) => (
          <motion.li
            key={project.title}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
              duration: 0.45,
              delay: reduceMotion ? 0 : index * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`flex flex-col gap-3 rounded-xl border p-6 transition duration-200 hover:border-accent/50 hover:shadow-card ${
              project.featured
                ? 'border-accent/50 bg-accent/5'
                : 'border-border'
            }`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-medium text-heading">
                {project.title}
              </h3>
              <p className="font-mono text-sm whitespace-nowrap">
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
                  className="rounded-full bg-muted px-2.5 py-1 font-mono text-[13px] text-heading"
                >
                  {tech}
                </li>
              ))}
            </ul>

            {(project.repoUrl || project.paperUrl) && (
              <div className="mt-auto flex flex-wrap items-center gap-4">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit items-center gap-1 border-b border-transparent pt-1 text-[15px] text-accent no-underline hover:border-accent"
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
                    className="inline-flex w-fit items-center gap-1 border-b border-transparent pt-1 text-[15px] text-accent no-underline hover:border-accent"
                  >
                    View paper
                    <span className="sr-only"> for {project.title}</span>
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                )}
              </div>
            )}
          </motion.li>
        ))}
      </ul>
    </Section>
  )
}
