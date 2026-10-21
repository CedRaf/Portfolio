import { Lock } from 'lucide-react'
import { AnimatedNumber } from './AnimatedNumber'
import { ProjectMedia } from './ProjectMedia'
import { ExternalLink } from './ExternalLink'
import { PipelineDiagram } from './PipelineDiagram'
import { TechStack } from './TechStack'
import type { Featured, Figure } from '../data/projects'

type Thesis = Extract<Featured, { kind: 'thesis' }>
type Client = Extract<Featured, { kind: 'client' }>

const label = 'font-mono text-[13.65px] leading-5'
const title = 'font-display text-3xl leading-snug text-heading lg:text-4xl'
const bigFigure = 'font-display text-5xl leading-none text-heading'
const mediaFrame = 'max-w-[48rem] overflow-hidden rounded-xl border border-heading/15'

function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex list-none flex-col gap-1.5 p-0">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span aria-hidden="true">·</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function FigureValue({ figure }: { figure: Figure }) {
  if ('text' in figure) return figure.text
  return (
    <>
      <AnimatedNumber value={figure.value} from={figure.from} />
      {figure.suffix}
    </>
  )
}

function ThesisDetail({ project }: { project: Thesis }) {
  return (
    <div className="flex flex-col gap-5">
      <div className={mediaFrame}>
        <ProjectMedia media={project.media} />
      </div>
      <p className={label}>Undergraduate thesis · {project.period}</p>
      <h4 className={title}>{project.title}</h4>
      <TechStack items={project.stack} />
      <p className="max-w-[62ch] leading-relaxed">{project.description}</p>

      <ul className="grid list-none gap-6 border-y border-heading/15 py-6 sm:grid-cols-3">
        {project.figures.map((figure) => (
          <li key={figure.label}>
            <p className={bigFigure}>
              <FigureValue figure={figure} />
            </p>
            <p className="mt-2 text-[15.75px] leading-snug">{figure.label}</p>
          </li>
        ))}
      </ul>

      <Bullets items={project.notes} />
      <div className="flex flex-wrap items-center gap-6">
        <ExternalLink href={project.paperUrl} text="View paper" title={project.title} />
        <ExternalLink href={project.repoUrl} text="View source" title={project.title} />
      </div>

      <section aria-labelledby="pipeline-heading" className="border-t border-heading/15 pt-6">
        <h5 id="pipeline-heading" className="mb-6 text-lg text-heading">
          How a question is answered
        </h5>
        <PipelineDiagram />
      </section>
    </div>
  )
}

function ClientDetail({ project }: { project: Client }) {
  return (
    <div className="flex flex-col gap-5">
      <div className={mediaFrame}>
        <ProjectMedia media={project.media} />
      </div>

      <p className={label}>
        Client work{project.team && ' · Team'}
        {project.ongoing && ' · Ongoing'}
      </p>
      <div>
        <h4 className={title}>{project.title}</h4>
        <p className="mt-1 text-lg">{project.client}</p>
      </div>
      <TechStack items={project.stack} />

      <div className="py-2">
        <p className={bigFigure}>{project.figure.text}</p>
        <p className="mt-2 text-[15.75px]">{project.figure.label}</p>
      </div>

      <p className="max-w-[62ch] leading-relaxed">{project.description}</p>
      <p className="max-w-[62ch] leading-relaxed">
        <span className="text-heading">My part:</span> {project.role}
      </p>
      <Bullets items={project.highlights} />

      <p className="flex items-center gap-2 text-[15.75px]">
        <Lock className="size-4" aria-hidden="true" />
        Private client codebase
      </p>
    </div>
  )
}

/** Everything about one featured project, shown in the selector's panel. */
export function ProjectDetail({ project }: { project: Featured }) {
  return project.kind === 'thesis' ? (
    <ThesisDetail project={project} />
  ) : (
    <ClientDetail project={project} />
  )
}
