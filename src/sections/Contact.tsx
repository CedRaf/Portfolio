import { Download, Mail } from 'lucide-react'
import { Section } from '../components/Section'
import { Button } from '../components/Button'
import { site } from '../data/site'

export function Contact() {
  return (
    <Section id="contact" title="Contact" align="center">
      <p className="mx-auto max-w-[62ch] text-center font-display text-3xl leading-[1.25] text-heading lg:text-5xl">
        I&rsquo;m open to software development roles and collaboration.
      </p>
      <p className="mx-auto mt-6 max-w-[62ch] text-center leading-relaxed">
        The fastest way to reach me is via email.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Button href={`mailto:${site.email}`} variant="primary">
          <Mail className="size-4" aria-hidden="true" />
          {site.email}
        </Button>
        <Button href={site.resumeUrl} download type="application/pdf">
          <Download className="size-4" aria-hidden="true" />
          Download resume
        </Button>
      </div>
    </Section>
  )
}
