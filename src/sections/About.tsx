import { Section } from '../components/Section'
import { site } from '../data/site'
import { skills } from '../data/experience'

export function About() {
  return (
    <Section id="about" title="About">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-24">
        <p className="max-w-[62ch] font-display text-2xl leading-[1.45] text-heading lg:text-3xl">
          {site.intro}
        </p>

        <ul className="flex list-none flex-col gap-8 p-0">
          {skills.map((group) => (
            <li key={group.label}>
              <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.18em]">
                {group.label}
              </h3>
              <ul className="flex list-none flex-wrap gap-2 p-0">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border bg-muted px-3 py-1 font-mono text-[13.65px] text-heading"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
