import { ArrowUpRight } from 'lucide-react'

/** `title` names the project for screen readers, so "Source" isn't ambiguous out of context. */
export function ExternalLink({ href, text, title }: { href: string; text: string; title: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex min-h-11 w-fit items-center gap-1 text-[0.9375rem] font-medium text-heading no-underline transition-colors hover:text-accent lg:min-h-0"
    >
      {text}
      <span className="sr-only"> for {title} (opens in a new tab)</span>
      <ArrowUpRight
        className="size-4 transition-transform duration-150 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
        aria-hidden="true"
      />
    </a>
  )
}
