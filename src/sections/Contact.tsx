import { Section } from '../components/Section'
import { contactLinks, site } from '../data/site'

export function Contact() {
  return (
    <Section
      id="contact"
      labelledBy="contact-heading"
      className="border-t border-border"
    >
      <div className="mx-auto grid max-w-[75rem] gap-10 rounded-2xl bg-accent px-8 py-12 text-accent-fg lg:grid-cols-[auto_auto] lg:items-center lg:justify-center lg:gap-16 lg:px-16 lg:py-16 xl:gap-80">
        <div>
          <h2
            id="contact-heading"
            className="font-display text-4xl leading-tight lg:text-5xl"
          >
            {site.contactHeading}
          </h2>
          <p className="mt-6 max-w-[46ch] leading-relaxed">
            {site.contactBody}
          </p>
        </div>

        <ul className="flex list-none flex-col gap-2 p-0">
          {contactLinks.map((link) => {
            const Icon = link.icon
            const external = link.href.startsWith('http')
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className="inline-flex items-center gap-4 py-2.5 text-accent-fg no-underline underline-offset-4 transition-opacity hover:underline hover:opacity-80"
                >
                  <Icon className="size-5 shrink-0" />
                  <span className="break-all">{link.display}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </Section>
  )
}
