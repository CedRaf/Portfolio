import type { ReactNode } from 'react'

type SectionProps = {
  id: string
  title: string
  children: ReactNode
  /** Visually hidden heading, for a section whose content introduces itself. */
  hideTitle?: boolean
}

/**
 * On small screens the heading sticks to the top while its section scrolls
 * under it, so a reader deep in a long list still knows where they are. The
 * translucent canvas behind it keeps the label legible over passing content.
 */
export function Section({ id, title, children, hideTitle = false }: SectionProps) {
  const headingId = `${id}-heading`

  return (
    <section id={id} aria-labelledby={headingId} className="py-12 first:pt-4 lg:py-16 lg:first:pt-0">
      <h2
        id={headingId}
        className={
          hideTitle
            ? 'sr-only'
            : 'sticky top-0 z-20 -mx-6 mb-6 bg-bg/90 px-6 py-3.5 font-display text-2xl font-semibold tracking-[-0.015em] text-heading backdrop-blur-md sm:-mx-10 sm:px-10 lg:static lg:mx-0 lg:mb-8 lg:bg-transparent lg:p-0 lg:text-3xl lg:backdrop-blur-none'
        }
      >
        {title}
      </h2>
      {children}
    </section>
  )
}
