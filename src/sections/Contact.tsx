import { Section } from '../components/Section'
import { ContactForm } from '../components/ContactForm'

export function Contact() {
  return (
    <Section id="contact" title="Contact" align="center">
      <p className="mx-auto max-w-[62ch] text-center font-display text-2xl leading-[1.35] text-heading lg:text-3xl">
        I&rsquo;m open to software development roles and collaboration.
      </p>
      <p className="mx-auto mt-6 max-w-[62ch] text-center leading-relaxed">
        Send me a message below and I&rsquo;ll reply by email, usually within a
        couple of days.
      </p>
      <ContactForm />
    </Section>
  )
}
