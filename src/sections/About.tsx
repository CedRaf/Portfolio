import { Section } from '../components/Section'
import { site } from '../data/site'
import { skills } from '../data/experience'

export function About() {
  return (
    <Section id="about" title="About">
      <p className="max-w-[62ch] leading-relaxed">{site.intro}</p>

      <ul className="mt-9 grid list-none grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-7 p-0">
        {skills.map((group) => (
          <li key={group.label}>
            <h3 className="mb-3 text-[15px] font-medium text-heading">
              {group.label}
            </h3>
            <ul className="flex list-none flex-wrap gap-2 p-0">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-muted px-2.5 py-1 font-mono text-[13px] text-heading"
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
