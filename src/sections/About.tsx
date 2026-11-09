import { Section } from '../components/Section'
import { site } from '../data/site'

export function About() {
  return (
    <Section id="about" title="About" hideTitle>
      <div className="enter-late flex max-w-[62ch] flex-col gap-4 text-base leading-relaxed text-pretty">
        <p>{site.intro}</p>
        <p>{site.now}</p>
      </div>
    </Section>
  )
}
