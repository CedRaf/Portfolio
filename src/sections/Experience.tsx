import { Section } from '../components/Section'
import { accomplishments, education, roles } from '../data/experience'

const headRow = 'flex flex-wrap items-baseline justify-between gap-2'
const meta = 'font-mono text-sm whitespace-nowrap'
const bullets = 'mt-3.5 flex max-w-[72ch] list-disc flex-col gap-2 pl-5'

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="flex list-none flex-col gap-9 p-0">
        {roles.map((role) => (
          <li key={`${role.company}-${role.title}`}>
            <div className={headRow}>
              <h3 className="text-lg font-medium text-heading">{role.title}</h3>
              <p className={meta}>{role.period}</p>
            </div>
            <p className="mt-1">{role.company}</p>
            <ul className={bullets}>
              {role.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <h3 className="mt-12 mb-5 text-lg font-medium text-heading">Education</h3>
      <ol className="flex list-none flex-col gap-9 p-0">
        {education.map((entry) => (
          <li key={entry.school}>
            <div className={headRow}>
              <h4 className="text-lg font-medium text-heading">
                {entry.credential}
              </h4>
              <p className={meta}>{entry.period}</p>
            </div>
            <p className="mt-1">
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

      <h3 className="mt-12 mb-5 text-lg font-medium text-heading">
        Certifications &amp; Accomplishments
      </h3>
      <ul className="flex list-none flex-col p-0">
        {accomplishments.map((item) => (
          <li
            key={item.title}
            className="flex flex-wrap justify-between gap-3 border-b border-border py-3"
          >
            <span>{item.title}</span>
            <span className={meta}>{item.date}</span>
          </li>
        ))}
      </ul>
    </Section>
  )
}
