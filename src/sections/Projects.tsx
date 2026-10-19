import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, ChevronDown, Lock } from 'lucide-react'
import { Section } from '../components/Section'
import { AnimatedNumber } from '../components/AnimatedNumber'
import { Chip } from '../components/Chip'
import { Spotlight } from '../components/Spotlight'
import { PipelineDiagram } from '../components/PipelineDiagram'
import { projects } from '../data/projects'
import type { Figure, Project } from '../data/projects'

type Thesis = Extract<Project, { kind: 'thesis' }>
type Client = Extract<Project, { kind: 'client' }>
type Personal = Extract<Project, { kind: 'personal' }>

const cardLink =
  'inline-flex w-fit items-center gap-1.5 text-[15.75px] text-heading no-underline underline-offset-4 transition-colors hover:text-accent hover:underline'

/**
 * `isolate` + `overflow-hidden` give the Spotlight a stacking context to sit
 * behind the card's text and a boundary to be clipped by.
 */
const card =
  'relative isolate flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-muted p-7 transition-[border-color,transform] duration-200 hover:border-heading/40 motion-safe:hover:-translate-y-1'

const groupHeading = 'mb-6 text-2xl text-heading lg:text-[29.4px]'
const projectTitle = 'font-display text-2xl leading-snug text-heading'
const label = 'font-mono text-[13.65px] leading-5'

/** The one list stagger on the site: each tier's items arrive as a list. */
function reveal(index: number, reduceMotion: boolean | null) {
  return {
    initial: reduceMotion ? false : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: {
      duration: 0.45,
      delay: reduceMotion ? 0 : index * 0.06,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }
}

function Stack({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex list-none flex-wrap gap-2 p-0">
      {items.map((tech) => (
        <Chip key={tech}>{tech}</Chip>
      ))}
    </ul>
  )
}

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

function ExternalLink({ href, text, title }: { href: string; text: string; title: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cardLink}>
      {text}
      <span className="sr-only"> for {title}</span>
      <ArrowUpRight className="size-4" aria-hidden="true" />
    </a>
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

function CaseStudy({ project, reduceMotion }: { project: Thesis; reduceMotion: boolean | null }) {
  return (
    <motion.li
      {...reveal(0, reduceMotion)}
      className={`${card} lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-x-16 lg:p-10`}
    >
      <Spotlight />

      <div className="flex flex-col gap-4">
        <p className={label}>Undergraduate thesis · {project.period}</p>
        <h4 className="font-display text-3xl leading-snug text-heading lg:text-4xl">
          {project.title}
        </h4>
        <Stack items={project.stack} />
        <p className="max-w-[62ch] leading-relaxed">{project.description}</p>
        <Bullets items={project.notes} />
        {/*
          Cropped to the title and authors on purpose: the listing's abstract
          states relative gains (63% / 31% / 12%) that differ from the
          résumé's before/after figures shown on this card.
        */}
        <a
          href={project.paperUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 block max-w-[40rem] overflow-hidden rounded-lg border border-heading/15 transition-[border-color] hover:border-heading/40"
        >
          <img
            src={project.paperImage.src}
            alt={project.paperImage.alt}
            width={1316}
            height={236}
            loading="lazy"
            className="h-auto w-full"
          />
        </a>
        <div className="mt-auto flex flex-wrap items-center gap-6 pt-3">
          <ExternalLink href={project.paperUrl} text="View paper" title={project.title} />
          <ExternalLink href={project.repoUrl} text="View source" title={project.title} />
        </div>
      </div>

      <ul className="mt-4 flex list-none flex-col p-0 lg:mt-0">
        {project.figures.map((figure) => (
          <li
            key={figure.label}
            className="border-t border-heading/15 py-5 first:border-t-0 first:pt-0 lg:first:border-t lg:first:pt-5"
          >
            <p className="font-display text-5xl leading-none text-heading">
              <FigureValue figure={figure} />
            </p>
            <p className="mt-2 text-[15.75px] leading-snug">{figure.label}</p>
          </li>
        ))}
      </ul>

      {/* Collapsed by default: the figures make the case, the diagram is for whoever wants the mechanism. */}
      <details className="group mt-4 border-t border-heading/15 pt-4 lg:col-span-2 lg:mt-10">
        <summary className="flex min-h-11 w-fit cursor-pointer list-none items-center gap-2 text-lg text-heading transition-colors hover:text-accent lg:min-h-0 [&::-webkit-details-marker]:hidden">
          How a question is answered
          <ChevronDown
            className="size-5 transition-transform duration-200 group-open:rotate-180"
            aria-hidden="true"
          />
        </summary>
        <div className="pt-6">
          <PipelineDiagram />
        </div>
      </details>
    </motion.li>
  )
}

function ClientCard({
  project,
  index,
  reduceMotion,
}: {
  project: Client
  index: number
  reduceMotion: boolean | null
}) {
  return (
    <motion.li {...reveal(index, reduceMotion)} className={card}>
      <Spotlight />

      <p className={label}>
        Client work{project.team && ' · Team'}
        {project.ongoing && ' · Ongoing'}
      </p>
      <div>
        <h4 className={projectTitle}>{project.title}</h4>
        <p className="mt-1 text-lg">{project.client}</p>
      </div>
      <Stack items={project.stack} />

      <div className="py-2">
        <p className="font-display text-5xl leading-none text-heading">{project.figure.text}</p>
        <p className="mt-2 text-[15.75px]">{project.figure.label}</p>
      </div>

      <p className="leading-relaxed">{project.description}</p>
      <p className="leading-relaxed">
        <span className="text-heading">My part:</span> {project.role}
      </p>
      <Bullets items={project.highlights} />

      <p className="mt-auto flex items-center gap-2 pt-3 text-[15.75px]">
        <Lock className="size-4" aria-hidden="true" />
        Private client codebase
      </p>
    </motion.li>
  )
}

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
      {...reveal(index, reduceMotion)}
      className="grid gap-4 border-b border-border py-7 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)_auto] lg:gap-12"
    >
      <div>
        <h4 className={projectTitle}>{project.title}</h4>
        <p className="mt-1 text-[15.75px]">{project.period}</p>
      </div>
      <div className="flex flex-col gap-4">
        <p className="max-w-[70ch] leading-relaxed">{project.description}</p>
        <Stack items={project.stack} />
      </div>
      <div className="flex min-h-11 items-center lg:min-h-0 lg:items-start">
        <ExternalLink href={project.repoUrl} text="View source" title={project.title} />
      </div>
    </motion.li>
  )
}

export function Projects() {
  const reduceMotion = useReducedMotion()

  const thesis = projects.filter((project) => project.kind === 'thesis')
  const client = projects.filter((project) => project.kind === 'client')
  const personal = projects.filter((project) => project.kind === 'personal')

  return (
    <Section id="projects" title="Projects">
      {thesis.length > 0 && (
        <>
          <h3 className={groupHeading}>Research</h3>
          <ul className="mb-16 flex list-none flex-col gap-5 p-0">
            {thesis.map((project) => (
              <CaseStudy key={project.title} project={project} reduceMotion={reduceMotion} />
            ))}
          </ul>
        </>
      )}

      {client.length > 0 && (
        <>
          <h3 id="client-work" className={groupHeading}>
            Client Work
          </h3>
          <ul className="mb-16 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-2">
            {client.map((project, index) => (
              <ClientCard
                key={project.title}
                project={project}
                index={index}
                reduceMotion={reduceMotion}
              />
            ))}
          </ul>
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
