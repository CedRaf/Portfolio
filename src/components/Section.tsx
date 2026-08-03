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
      className="border-b border-border px-5 py-14 lg:px-8 lg:py-22"
    >
      <Reveal>
        <h2
          id={headingId}
          className="mb-7 text-sm font-medium uppercase tracking-[0.1em] text-accent"
        >
          {title}
        </h2>
        {children}
      </Reveal>
    </section>
  )
}
