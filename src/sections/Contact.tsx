import { ArrowUpRight } from 'lucide-react'
import { Section } from '../components/Section'
import { ResumeDialog } from '../components/ResumeDialog'
import { CopyEmail } from '../components/CopyEmail'
import { contactLinks, site } from '../data/site'

/**
 * The page's close, on the one full yellow surface: the same two actions as
 * the header, said once more. Focus rings switch to ink here, because the
 * usual yellow ring would vanish against the card in dark mode.
 */
export function Contact() {
  const [email, ...profiles] = contactLinks

  return (
    <Section id="contact" title={site.contactHeading}>
      <div className="rounded-2xl bg-highlight p-7 text-highlight-fg sm:p-10 [&_*:focus-visible]:outline-highlight-fg">
        <p className="max-w-[46ch] text-base leading-relaxed text-pretty text-highlight-fg/80">
          {site.contactBody}
        </p>

        <a
          href={email.href}
          className="mt-6 inline-block font-display text-[1.375rem] font-semibold tracking-[-0.02em] text-highlight-fg underline decoration-highlight-fg/35 decoration-2 underline-offset-[0.25em] transition-[text-decoration-color] hover:decoration-highlight-fg sm:text-3xl"
        >
          {/* Breaks after the @ on narrow screens, never mid-word. */}
          {email.display.split('@')[0]}@<wbr />
          {email.display.split('@')[1]}
        </a>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <CopyEmail email={site.email} />
          <ResumeDialog variant="inverse" />
        </div>

        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-1 border-t border-highlight-fg/15 pt-5">
          {profiles.map(({ label, href, display, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-medium text-highlight-fg no-underline"
              >
                <Icon className="size-4" />
                <span className="underline decoration-transparent underline-offset-4 transition-[text-decoration-color] group-hover:decoration-highlight-fg">
                  <span className="sr-only">{label}: </span>
                  {display}
                </span>
                <ArrowUpRight
                  className="size-4 transition-transform duration-150 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
