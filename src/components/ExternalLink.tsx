import { ArrowUpRight } from 'lucide-react'

/** `title` names the project for screen readers, so "View source" isn't ambiguous out of context. */
export function ExternalLink({ href, text, title }: { href: string; text: string; title: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex w-fit items-center gap-1.5 text-[15.75px] text-heading no-underline underline-offset-4 transition-colors hover:text-accent hover:underline"
    >
      {text}
      <span className="sr-only"> for {title}</span>
      <ArrowUpRight className="size-4" aria-hidden="true" />
    </a>
  )
}
