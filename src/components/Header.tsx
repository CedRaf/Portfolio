import type { CSSProperties } from 'react'
import { Mail } from 'lucide-react'
import { Button } from './Button'
import { ResumeDialog } from './ResumeDialog'
import { ThemeToggle } from './ThemeToggle'
import { useActiveSection } from './useActiveSection'
import { ScrollMap } from './ScrollMap'
import { nav, site, socials, taglineSegments } from '../data/site'

const sectionIds = nav.map((item) => item.href.slice(1))

/**
 * Who Ced is and the two things a recruiter can do about it. On a phone this
 * is the first screen; from `lg:` it stays pinned beside the scrolling work,
 * so the actions never leave view.
 */
export function Header() {
  const active = useActiveSection(sectionIds)

  return (
    <header className="enter-stagger pt-8 pb-6 sm:pt-12 lg:sticky lg:top-0 lg:max-h-dvh lg:overflow-y-auto lg:py-14">
      <div className="flex items-start justify-between gap-4">
        <img
          src="/images/profilepic-240.webp"
          alt={`Portrait of ${site.shortName}`}
          width={240}
          height={240}
          fetchPriority="high"
          className="size-20 rounded-full object-cover ring-1 ring-border sm:size-24"
        />
        <ThemeToggle />
      </div>

      {/* Each letter fades in on its own; screen readers get the name once. */}
      <h1 className="no-enter mt-6 font-display text-[2.75rem] leading-[1.02] font-semibold tracking-[-0.025em] text-balance text-heading sm:text-5xl">
        <span className="sr-only">{site.shortName}</span>
        <span aria-hidden="true">
          {[...site.shortName].map((char, index) => (
            <span key={index} className="letter" style={{ '--i': index } as CSSProperties}>
              {char}
            </span>
          ))}
        </span>
      </h1>
      <p className="mt-3 text-lg font-medium text-heading">
        {site.role}
        <span className="block font-normal text-subtle sm:inline">
          <span className="hidden sm:inline"> · </span>
          {site.location}
        </span>
      </p>

      <p className="mt-5 max-w-[36ch] leading-relaxed text-pretty">
        {taglineSegments.map((segment) =>
          segment.emphasis ? (
            <strong key={segment.text} className="font-medium text-heading">
              {segment.text}
            </strong>
          ) : (
            segment.text
          ),
        )}
      </p>
      <p className="mt-3 text-sm text-subtle">PhilNITS certified · IEEE Xplore author</p>

      <div className="mt-7 flex flex-wrap items-center gap-3">
        <Button href={`mailto:${site.email}`} variant="primary">
          <Mail className="size-4" aria-hidden="true" />
          Email me
        </Button>
        <ResumeDialog />
        <ul className="flex items-center gap-1">
          {socials.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="grid size-11 place-items-center rounded-lg text-subtle transition-colors hover:bg-surface hover:text-heading lg:size-10"
              >
                <Icon className="size-5" />
              </a>
            </li>
          ))}
        </ul>
      </div>


      <ScrollMap items={nav} active={active} />
    </header>
  )
}
