import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { Section } from '../components/Section'
import { projects } from '../data/projects'

const cardLink =
  'inline-flex w-fit items-center gap-1.5 border-b border-transparent pb-0.5 text-[15px] text-accent no-underline transition-colors hover:border-accent'

export function Projects() {
  const reduceMotion = useReducedMotion()

  return (
    <Section id="projects" title="Projects">
      {/* Columns are capped rather than auto-fit: on an ultrawide monitor
          auto-fit produced six tracks for five projects. */}
      <ul className="grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2 xl:grid-cols-3">
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
            className="flex flex-col gap-4 rounded-xl border border-border bg-muted p-8 transition-colors duration-200 hover:border-heading/30"
          >
            <div className="flex flex-col gap-2">
              <h3 className="font-display text-2xl text-heading">
                {project.title}
              </h3>
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
        ))}
      </ul>
    </Section>
  )
}
