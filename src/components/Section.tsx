import type { ReactNode } from 'react'

type SectionProps = {
  id: string
  title: string
  align?: 'left' | 'center'
  children: ReactNode
}

/**
 * Landmark wrapper for every top-level page section.
 * `aria-labelledby` ties the region to its own heading for screen readers.
 */
export function Section({
  id,
  title,
  align = 'left',
  children,
}: SectionProps) {
  const headingId = `${id}-heading`

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="band border-b border-border py-20 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[110rem]">
        <div className="mb-10 flex items-center gap-5">
          {align === 'center' && (
            <span className="h-px flex-1 bg-border" aria-hidden="true" />
          )}
          <h2
            id={headingId}
            className="font-display text-3xl leading-tight text-heading lg:text-4xl"
          >
            {title}
          </h2>
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
        </div>
        {children}
      </div>
    </section>
  )
}
