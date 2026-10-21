import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { ProjectDetail } from './ProjectDetail'
import type { Featured, Shot } from '../data/projects'

const ease = [0.22, 1, 0.36, 1] as const

/** Experience's freelance entry links here; arriving on it selects the first client project. */
const clientHash = '#client-work'

function slug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}

/**
 * A project's first image. A `contain` slide (the thesis's IEEE strip) is shown
 * whole on a light ground like a document rather than cropped.
 */
function thumbnailOf(project: Featured): { shot: Shot; contain: boolean } {
  const { media } = project
  if (media.kind === 'single') return { shot: media.shot, contain: false }
  const [first] = media.slides
  return { shot: first, contain: first.contain ?? false }
}

function kindOf(project: Featured) {
  return project.kind === 'thesis' ? 'Thesis' : 'Client work'
}

/**
 * A thumbnail column on the left; the selected one runs a line across to a
 * rail, and that project's detail sits to the right of it. Built as the ARIA
 * tabs pattern — arrow keys move between projects and select as they go.
 *
 * Motion: the first time the selector scrolls into view, thumbnails arrive as
 * a list, the selected line draws, then its panel resolves from a blur — the
 * same "settling into focus" as the hero. Switching projects redraws the line
 * and resolves the new panel. Under reduced motion every duration is zero, so
 * the end state simply appears.
 *
 * Inactive panels stay mounted but `hidden`, so a carousel keeps its slide and
 * the thesis's counter runs once, not on every revisit.
 */
export function ProjectSelector({ projects }: { projects: readonly Featured[] }) {
  const reduceMotion = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const inView = useInView(rootRef, { once: true, margin: '-80px' })

  const clientIndex = projects.findIndex((project) => project.kind === 'client')
  const [active, setActive] = useState(() =>
    window.location.hash === clientHash && clientIndex !== -1 ? clientIndex : 0,
  )

  useEffect(() => {
    function onHashChange() {
      if (window.location.hash !== clientHash || clientIndex === -1) return
      setActive(clientIndex)
      // Drop the hash so the same link still fires next time it is clicked.
      history.replaceState(null, '', window.location.pathname + window.location.search)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [clientIndex])

  function duration(seconds: number) {
    return reduceMotion ? 0 : seconds
  }

  function select(index: number, moveFocus: boolean) {
    setActive(index)
    if (moveFocus) tabRefs.current[index]?.focus()
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const last = projects.length - 1
    const moves: Record<string, number> = {
      ArrowDown: active === last ? 0 : active + 1,
      ArrowRight: active === last ? 0 : active + 1,
      ArrowUp: active === 0 ? last : active - 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    }
    if (!(event.key in moves)) return
    event.preventDefault()
    select(moves[event.key], true)
  }

  return (
    <div
      ref={rootRef}
      id={clientHash.slice(1)}
      className="grid gap-10 lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-0"
    >
      <div
        role="tablist"
        aria-label="Selected projects"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="flex flex-col gap-3 lg:gap-6 lg:self-start lg:py-2"
      >
        {projects.map((project, index) => {
          const id = slug(project.title)
          const selected = index === active
          const { shot, contain } = thumbnailOf(project)

          return (
            <motion.div
              key={project.title}
              role="none"
              className="flex items-center"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: duration(0.45), delay: reduceMotion ? 0 : index * 0.06, ease }}
            >
              <button
                ref={(element) => {
                  tabRefs.current[index] = element
                }}
                type="button"
                role="tab"
                id={`tab-${id}`}
                aria-selected={selected}
                aria-controls={`panel-${id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(index, false)}
                className="group/tab flex min-h-11 w-full items-center gap-4 rounded-xl text-left lg:block lg:w-60 lg:shrink-0"
              >
                <span
                  className={`grid w-24 shrink-0 overflow-hidden rounded-lg border transition-colors duration-300 lg:w-full ${selected ? 'border-heading' : 'border-heading/20 group-hover/tab:border-heading/50'}`}
                >
                  <img
                    src={shot.src}
                    alt=""
                    width={shot.width}
                    height={shot.height}
                    loading="lazy"
                    className={`aspect-[16/10] h-full w-full transition-[filter] duration-300 [grid-area:1/1] ${contain ? 'bg-heading object-contain object-top p-2' : 'object-cover object-top'} ${selected ? '' : 'brightness-[.45] group-hover/tab:brightness-90'}`}
                  />
                  {/*
                    On desktop the name sits over the image; on phones it sits beside it.
                    z-10 because a dimmed image's `filter` lifts it into its own layer,
                    which otherwise paints over this caption.
                  */}
                  <span className="z-10 hidden self-end bg-bg/85 px-3 py-2 [grid-area:1/1] lg:block">
                    <span className="block font-mono text-[13.65px] leading-5">{kindOf(project)}</span>
                    <span className={`block leading-snug ${selected ? 'text-heading' : 'text-fg'}`}>
                      {project.title}
                    </span>
                  </span>
                </span>
                <span className="lg:hidden">
                  <span className="block font-mono text-[13.65px] leading-5">{kindOf(project)}</span>
                  <span className={`block leading-snug ${selected ? 'text-heading' : 'text-fg'}`}>
                    {project.title}
                  </span>
                </span>
              </button>

              <motion.span
                aria-hidden="true"
                className="hidden h-px flex-1 origin-left bg-heading/70 lg:block"
                initial={false}
                animate={{ scaleX: selected && inView ? 1 : 0 }}
                transition={{ duration: duration(0.5), ease, delay: selected && !reduceMotion ? 0.15 : 0 }}
              />
            </motion.div>
          )
        })}
      </div>

      <div className="lg:min-h-full lg:border-l lg:border-heading/20 lg:pl-12">
        {projects.map((project, index) => {
          const id = slug(project.title)
          const selected = index === active

          return (
            <motion.div
              key={project.title}
              role="tabpanel"
              id={`panel-${id}`}
              aria-labelledby={`tab-${id}`}
              tabIndex={0}
              hidden={!selected}
              initial={false}
              animate={
                selected && inView
                  ? { opacity: 1, filter: 'blur(0px)' }
                  : { opacity: 0, filter: 'blur(8px)' }
              }
              transition={{ duration: duration(0.4), ease, delay: selected && !reduceMotion ? 0.15 : 0 }}
            >
              <ProjectDetail project={project} />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
