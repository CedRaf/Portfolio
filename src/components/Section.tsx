import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type SectionProps = {
  id: string
  title: string
  children: ReactNode
}

/**
 * Landmark wrapper for every top-level page section.
 * `aria-labelledby` ties the region to its own heading for screen readers.
 */
export function Section({ id, title, children }: SectionProps) {
  const headingId = `${id}-heading`

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="band border-b border-border py-20 lg:py-32"
    >
      <Reveal>
        {/* Eyebrow stays monochrome — the accent is reserved for CTAs and links. */}
        <div className="mb-10 flex items-center gap-4">
          <h2
            id={headingId}
            className="text-xs font-medium uppercase tracking-[0.18em] text-fg"
          >
            {title}
          </h2>
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
        </div>
        {children}
      </Reveal>
    </section>
  )
}
