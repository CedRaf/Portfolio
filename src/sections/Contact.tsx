import { Download, Mail } from 'lucide-react'
import { Section } from '../components/Section'
import { Button } from '../components/Button'
import { site } from '../data/site'

export function Contact() {
  return (
    <Section id="contact" title="Contact">
      <p className="max-w-[62ch] font-display text-3xl leading-[1.25] text-heading lg:text-5xl">
        I&rsquo;m open to software development roles and collaboration.
      </p>
      <p className="mt-6 max-w-[62ch] leading-relaxed">
        The fastest way to reach me is via email.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
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
