import { Section } from '../components/Section'
import { ContactForm } from '../components/ContactForm'

export function Contact() {
  return (
    <Section id="contact" title="Contact" align="center">
      <p className="mx-auto max-w-[62ch] text-center font-display text-3xl leading-[1.25] text-heading lg:text-5xl">
        I&rsquo;m open to software development roles and collaboration.
      </p>
      <p className="mx-auto mt-6 max-w-[62ch] text-center leading-relaxed">
        The fastest way to reach me is via email.
      </p>
      <ContactForm />
    </Section>
  )
}
