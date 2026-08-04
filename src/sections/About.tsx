import { Section } from '../components/Section'
import { site } from '../data/site'
import { skills } from '../data/experience'

export function About() {
  return (
    <Section id="about" title="About">
      <p className="max-w-[62ch] font-display text-2xl leading-[1.45] text-heading lg:text-3xl">
        {site.intro}
      </p>

      <ul className="mt-14 grid list-none grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-10 p-0">
        {skills.map((group) => (
          <li key={group.label}>
            <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.18em]">
              {group.label}
            </h3>
            <ul className="flex list-none flex-wrap gap-2 p-0">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-border bg-muted px-3 py-1 font-mono text-[13px] text-heading"
                >
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  )
}
