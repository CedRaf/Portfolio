import { Section } from '../components/Section'
import { accomplishments, education, roles } from '../data/experience'

const headRow = 'flex flex-wrap items-baseline justify-between gap-3'
const title = 'font-display text-2xl text-heading lg:text-3xl'
const meta = 'font-mono text-xs uppercase tracking-[0.12em] whitespace-nowrap'
const bullets = 'mt-4 flex max-w-[72ch] list-disc flex-col gap-2.5 pl-5'
const subhead = 'mt-20 mb-8 text-xs font-medium uppercase tracking-[0.18em]'

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="flex list-none flex-col gap-14 p-0">
        {roles.map((role) => (
          <li key={`${role.company}-${role.title}`}>
            <div className={headRow}>
              <h3 className={title}>{role.title}</h3>
              <p className={meta}>{role.period}</p>
            </div>
            <p className="mt-2 text-heading">{role.company}</p>
            <ul className={bullets}>
              {role.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <h3 className={subhead}>Education</h3>
      <ol className="flex list-none flex-col gap-14 p-0">
        {education.map((entry) => (
          <li key={entry.school}>
            <div className={headRow}>
              <h4 className={title}>{entry.credential}</h4>
              <p className={meta}>{entry.period}</p>
            </div>
            <p className="mt-2 text-heading">
              {entry.school} · {entry.location}
            </p>
            <ul className={bullets}>
              {entry.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <h3 className={subhead}>Certifications &amp; Accomplishments</h3>
      {/* Hairline rows, Griffin-style — the border does the dividing, not spacing. */}
      <ul className="flex list-none flex-col border-t border-border p-0">
        {accomplishments.map((item) => (
          <li
            key={item.title}
            className="flex flex-wrap justify-between gap-3 border-b border-border py-4"
          >
            <span className="text-heading">{item.title}</span>
            <span className={meta}>{item.date}</span>
          </li>
        ))}
      </ul>
    </Section>
  )
}
