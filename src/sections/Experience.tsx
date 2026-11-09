import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { Section } from '../components/Section'
import { accomplishments, education, roles, skills } from '../data/experience'

/** Date column beside content from `sm:` up; stacked above it on phones. */
const row = 'grid gap-x-8 gap-y-1.5 sm:grid-cols-[9.5rem_1fr]'
const date = 'pt-0.5 text-sm text-subtle tabular-nums'
const entryTitle = 'font-semibold leading-snug text-heading'

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-14 border-t border-border pt-10 lg:mt-16 lg:pt-12">
      <h3 className="mb-6 text-base font-semibold text-heading">{title}</h3>
      {children}
    </div>
  )
}

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="flex flex-col gap-10">
        {roles.map((role) => (
          <li key={role.title} className={row}>
            <p className={date}>{role.period}</p>
            <div className="flex flex-col gap-3">
              <h3 className={entryTitle}>
                {role.title}
                {role.company && (
                  <>
                    <span className="font-normal text-subtle"> at </span>
                    {role.company}
                  </>
                )}
              </h3>
              <ul className="flex max-w-[62ch] flex-col gap-2 text-[0.9375rem] leading-relaxed">
                {role.highlights.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.6875rem] size-1 shrink-0 rounded-full bg-control" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {role.link && (
                <a
                  href={role.link.href}
                  className="group inline-flex min-h-11 w-fit items-center gap-1.5 text-[0.9375rem] font-medium text-heading no-underline transition-colors hover:text-accent lg:min-h-0"
                >
                  {role.link.label}
                  <ArrowRight
                    className="size-4 transition-transform duration-150 motion-safe:group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              )}
            </div>
          </li>
        ))}
      </ol>

      <Group title="Education">
        <ol className="flex flex-col gap-8">
          {education.map((entry) => (
            <li key={entry.school} className={row}>
              <p className={date}>{entry.period}</p>
              <div className="flex flex-col gap-1.5">
                <h4 className={entryTitle}>{entry.credential}</h4>
                <p className="text-[0.9375rem]">
                  {entry.school}
                  <span className="text-subtle"> · {entry.location}</span>
                </p>
                <ul className="mt-1.5 flex flex-col gap-1 text-[0.9375rem] leading-relaxed">
                  {entry.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </Group>

      <Group title="Skills">
        <dl className="flex flex-col gap-5">
          {skills.map((group) => (
            <div key={group.label} className={row}>
              <dt className="pt-0.5 text-sm text-subtle">{group.label}</dt>
              <dd className="text-[0.9375rem] leading-relaxed text-heading">{group.items.join(', ')}</dd>
            </div>
          ))}
        </dl>
      </Group>

      <Group title="Certifications & activities">
        <ul className="flex flex-col gap-4">
          {accomplishments.map((item) => (
            <li key={item.title} className={row}>
              <p className={date}>{item.date}</p>
              <p className="text-[0.9375rem] leading-snug text-heading">{item.title}</p>
            </li>
          ))}
        </ul>
      </Group>
    </Section>
  )
}
