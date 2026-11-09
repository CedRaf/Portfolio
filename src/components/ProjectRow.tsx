import { useId } from 'react'
import { ChevronDown, ChevronRight, Lock } from 'lucide-react'
import { ProjectMedia } from './ProjectMedia'
import { ExternalLink } from './ExternalLink'
import { PipelineDiagram } from './PipelineDiagram'
import { TechStack } from './TechStack'
import { Chip } from './Chip'
import type { Featured, Figure } from '../data/projects'

const prose = 'max-w-[62ch] leading-relaxed text-pretty'

function figureValue(figure: Figure) {
  return 'text' in figure ? figure.text : `${figure.value}${figure.suffix}`
}

/** The figure a project is summarised by in its collapsed row. */
function headline(project: Featured): Figure {
  return project.kind === 'thesis' ? project.figures[0] : project.figure
}

function meta(project: Featured) {
  switch (project.kind) {
    case 'thesis':
      return `Undergraduate thesis · ${project.period}`
    case 'client':
      return `Client work · ${project.client}${project.team ? ' · Team build' : ''}`
    case 'app':
      return `Personal project · ${project.period}`
  }
}

function thumbnail(project: Featured) {
  return project.media.kind === 'single' ? project.media.shot : project.media.slides[0]
}

/** Measured results: the number first, then what it measures. */
function Results({ figures }: { figures: readonly Figure[] }) {
  return (
    <dl className="grid gap-x-4 gap-y-2.5 border-y border-border py-4 sm:grid-cols-[auto_1fr]">
      {figures.map((figure) => (
        <div key={figure.label} className="contents">
          <dt className="font-semibold text-heading tabular-nums sm:text-right">{figureValue(figure)}</dt>
          <dd className="-mt-2 text-[0.9375rem] leading-snug sm:mt-0">{figure.label}</dd>
        </div>
      ))}
    </dl>
  )
}

function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex max-w-[62ch] flex-col gap-2 text-[0.9375rem] leading-relaxed">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className="mt-[0.6875rem] size-1 shrink-0 rounded-full bg-control" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function Detail({ project }: { project: Featured }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <ProjectMedia media={project.media} />
      </div>
      <p className={prose}>{project.description}</p>

      {project.kind === 'thesis' && (
        <>
          <Results figures={project.figures} />
          <Bullets items={project.notes} />
          <details className="disclosure rounded-xl border border-border">
            <summary className="flex min-h-11 cursor-pointer items-center gap-2 rounded-xl px-4 py-3 text-[0.9375rem] font-medium text-heading transition-colors hover:bg-surface">
              <ChevronRight
                className="disclosure-chevron size-4 text-subtle transition-transform duration-200"
                aria-hidden="true"
              />
              How a question is answered
            </summary>
            <div className="border-t border-border p-4 sm:p-5">
              <PipelineDiagram />
            </div>
          </details>
          <div className="flex flex-wrap items-center gap-x-6">
            <ExternalLink href={project.paperUrl} text="Paper on IEEE Xplore" title={project.title} />
            <ExternalLink href={project.repoUrl} text="Source" title={project.title} />
          </div>
        </>
      )}

      {project.kind === 'client' && (
        <>
          <p className={prose}>
            <strong className="font-medium text-heading">My part: </strong>
            {project.role}
          </p>
          <Bullets items={project.highlights} />
          <p className="flex items-center gap-2 text-sm text-subtle">
            <Lock className="size-3.5" aria-hidden="true" />
            Private client codebase
          </p>
        </>
      )}

      {project.kind === 'app' && (
        <>
          <Bullets items={project.highlights} />
          <div className="flex flex-wrap items-center gap-x-6">
            <ExternalLink href={project.demoUrl} text="Live demo" title={project.title} />
            <ExternalLink href={project.repoUrl} text="Source" title={project.title} />
          </div>
        </>
      )}
    </div>
  )
}

type ProjectRowProps = {
  project: Featured
  open: boolean
  onToggle: () => void
}

/**
 * One featured project as a scannable row (thumbnail, what it is, its
 * headline result, its stack) that expands in place to the full detail.
 *
 * The row is a disclosure button. The panel stays mounted while closed
 * (`inert`, collapsed to zero height) so a carousel keeps its slide, and it
 * opens with a grid-rows transition that reduced motion collapses.
 */
export function ProjectRow({ project, open, onToggle }: ProjectRowProps) {
  const panelId = useId()
  const thumb = thumbnail(project)
  const figure = headline(project)
  const live = project.kind === 'client' && project.ongoing

  return (
    <article aria-label={project.title}>
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="group -mx-3 grid w-[calc(100%+1.5rem)] grid-cols-[5.5rem_1fr] gap-x-4 rounded-xl p-3 text-left transition-colors hover:bg-surface sm:grid-cols-[9rem_1fr] sm:gap-x-5"
        >
          <span className="block self-start overflow-hidden rounded-lg border border-border bg-surface">
            <img
              src={thumb.src}
              alt=""
              width={thumb.width}
              height={thumb.height}
              loading="lazy"
              className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.04]"
            />
          </span>

          <span className="flex min-w-0 flex-col gap-1">
            <span className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-sm text-subtle">
              {meta(project)}
              {live && (
                <span className="inline-flex items-center gap-1.5 font-medium text-live">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-live" />
                  In use now
                </span>
              )}
            </span>

            <span className="flex items-start justify-between gap-3">
              <span className="font-display text-xl leading-snug font-semibold tracking-[-0.015em] text-heading sm:text-[1.375rem]">
                {project.title}
              </span>
              <span className="mt-0.5 hidden shrink-0 items-center gap-1 text-sm font-medium text-subtle transition-colors group-hover:text-heading sm:inline-flex">
                {open ? 'Close' : 'Details'}
                <ChevronDown
                  aria-hidden="true"
                  className={`size-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                />
              </span>
            </span>

            <span className="line-clamp-2 text-[0.9375rem] leading-snug">
              <span className="font-semibold text-heading tabular-nums">{figureValue(figure)}</span>{' '}
              {figure.label}
            </span>

            <span className="mt-1.5 hidden flex-wrap gap-1.5 sm:flex">
              {project.stack.map((item) => (
                <Chip key={item}>{item}</Chip>
              ))}
            </span>

            <span className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-subtle sm:hidden">
              {open ? 'Close' : 'Details'}
              <ChevronDown
                aria-hidden="true"
                className={`size-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
              />
            </span>
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-label={`${project.title} details`}
        inert={!open}
        className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="min-h-0 overflow-hidden">
          {/* The content resolves (fade + blur) a beat after the panel opens. */}
          <div
            className={`flex flex-col gap-5 pt-4 pb-6 transition-[opacity,filter] duration-300 ${open ? 'opacity-100 blur-none delay-100' : 'opacity-0 blur-sm'}`}
          >
            {/* The summary shows the stack from `sm:` up; phones get it here. */}
            <div className="sm:hidden">
              <TechStack items={project.stack} />
            </div>
            <Detail project={project} />
          </div>
        </div>
      </div>
    </article>
  )
}
