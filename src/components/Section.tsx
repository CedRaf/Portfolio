import type { ReactNode } from 'react'

/**
 * Either the section renders its own heading from `title`, or it points
 * `aria-labelledby` at a heading the caller supplies (Contact does this — its
 * "Let's Connect!" sits inside the accent card, so there is no heading row).
 */
type SectionProps = {
  id: string
  className?: string
  children: ReactNode
} & (
  | { title: string; labelledBy?: never }
  | { title?: never; labelledBy: string }
)

export function Section({
  id,
  title,
  labelledBy,
  className = '',
  children,
}: SectionProps) {
  const headingId = title ? `${id}-heading` : labelledBy

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`band py-20 lg:py-28 ${className}`}
    >
      <div className="mx-auto w-full max-w-[110rem]">
        {title && (
          <div className="mb-8 flex items-center gap-6">
            <h2
              id={headingId}
              className="font-display text-4xl leading-tight text-accent lg:text-5xl"
            >
              {title}
            </h2>
            <span className="h-px flex-1 bg-border" aria-hidden="true" />
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
