import { Section } from '../components/Section'
import { Chip } from '../components/Chip'
import { accomplishments, education, roles, skills } from '../data/experience'

const subhead =
  'mb-8 text-xl text-heading underline decoration-1 underline-offset-[6px] lg:text-[22px]'
const headRow = 'flex flex-wrap items-baseline justify-between gap-3'
const entryTitle = 'font-display text-2xl text-heading lg:text-3xl'
const meta = 'text-heading whitespace-nowrap'

/** Middot-marked list, matching the design's bullet style. */
function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-4 flex max-w-[86ch] list-none flex-col gap-1.5 p-0">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span aria-hidden="true">·</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="flex list-none flex-col gap-12 p-0">
        {roles.map((role) => (
          <li key={`${role.company}-${role.title}`}>
            <div className={headRow}>
              <h3 className={entryTitle}>{role.title}</h3>
              <p className={meta}>{role.period}</p>
            </div>
            <p className="mt-1.5 text-lg">{role.company}</p>
            <Bullets items={role.highlights} />
          </li>
        ))}
      </ol>

      <h3 className={`${subhead} mt-20`}>Education</h3>
      <ol className="flex list-none flex-col gap-12 p-0">
        {education.map((entry) => (
          <li key={entry.school}>
            <div className={headRow}>
              <h4 className={entryTitle}>{entry.credential}</h4>
              <p className={meta}>{entry.period}</p>
            </div>
            <p className="mt-1.5 text-lg">
              {entry.school} <span aria-hidden="true">|</span> {entry.location}
            </p>
            <Bullets items={entry.details} />
          </li>
        ))}
      </ol>

      <h3 className={`${subhead} mt-20`}>Skills</h3>
      <ul className="grid list-none grid-cols-1 gap-x-16 gap-y-10 p-0 lg:grid-cols-2">
        {skills.map((group) => (
          <li key={group.label}>
            <h4 className="mb-3">{group.label}</h4>
            <ul className="flex max-w-[28rem] list-none flex-wrap gap-2 p-0">
              {group.items.map((item) => (
                <Chip key={item}>{item}</Chip>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <h3 className={`${subhead} mt-20`}>Certifications &amp; Accomplishments</h3>
      <ul className="list-none columns-1 gap-x-16 p-0 sm:columns-2">
        {accomplishments.map((item) => (
          <li key={item.title} className="mb-6 break-inside-avoid">
            <p className="text-heading">{item.title}</p>
            <p className="mt-0.5">{item.date}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
