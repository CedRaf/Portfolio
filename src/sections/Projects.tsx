import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Section } from '../components/Section'
import { ProjectRow } from '../components/ProjectRow'
import { projects } from '../data/projects'
import type { Featured, Project } from '../data/projects'

// Shipped systems lead; the thesis supports the claim rather than opening it.
const order: Record<Featured['kind'], number> = { client: 0, app: 1, thesis: 2 }
const featured = projects
  .filter((p): p is Featured => p.kind !== 'personal')
  .sort((a, b) => order[a.kind] - order[b.kind])
const others = projects.filter(
  (p): p is Extract<Project, { kind: 'personal' }> => p.kind === 'personal',
)

const firstClient = featured.find((p) => p.kind === 'client')?.title

/**
 * Featured work as an index of expandable rows, so all four outcomes fit in
 * one glance and detail is a click away; then the smaller personal projects
 * as plain rows. Every row starts collapsed. The first client project
 * carries `#client-work`, the Freelance role's link target, which opens it.
 */
export function Projects() {
  const [open, setOpen] = useState<ReadonlySet<string>>(() => new Set())

  function toggle(title: string) {
    setOpen((current) => {
      const next = new Set(current)
      if (next.has(title)) next.delete(title)
      else next.add(title)
      return next
    })
  }

  // The link may be followed when the hash is already #client-work, which
  // fires no hashchange, so clicks on it are watched too.
  useEffect(() => {
    if (!firstClient) return
    const reveal = () => setOpen((current) => new Set(current).add(firstClient))
    const onClick = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest('a[href="#client-work"]')) reveal()
    }
    const onHash = () => {
      if (location.hash === '#client-work') reveal()
    }
    onHash() // arriving with #client-work already in the URL
    document.addEventListener('click', onClick)
    window.addEventListener('hashchange', onHash)
    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('hashchange', onHash)
    }
  }, [])

  return (
    <Section id="projects" title="Projects">
      <ol className="focus-rows flex flex-col divide-y divide-border">
        {featured.map((project) => (
          <li
            key={project.title}
            id={project.title === firstClient ? 'client-work' : undefined}
            className="py-3 first:pt-0"
          >
            <ProjectRow
              project={project}
              open={open.has(project.title)}
              onToggle={() => toggle(project.title)}
            />
          </li>
        ))}
      </ol>

      <h3 className="mt-6 border-t border-border pt-10 text-base font-semibold text-heading lg:pt-12">
        Earlier projects
      </h3>
      <ul className="mt-4 flex flex-col">
        {others.map((project) => (
          <li key={project.title}>
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group -mx-4 grid gap-1.5 rounded-xl px-4 py-4 no-underline transition-colors hover:bg-surface sm:grid-cols-[1fr_auto] sm:gap-x-6"
            >
              <span className="inline-flex items-center gap-1 font-medium text-heading transition-colors group-hover:text-accent">
                {project.title}
                <span className="sr-only"> source (opens in a new tab)</span>
                <ArrowUpRight
                  className="size-4 transition-transform duration-150 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </span>
              <span className="text-sm text-subtle tabular-nums sm:row-start-1 sm:text-right">
                {project.period}
              </span>
              <span className="max-w-[62ch] text-[0.9375rem] leading-relaxed text-fg sm:col-span-2">
                {project.description}
              </span>
              <span className="text-sm text-subtle sm:col-span-2">{project.stack.join(' · ')}</span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  )
}
