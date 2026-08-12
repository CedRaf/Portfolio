import { Download, Mail } from 'lucide-react'
import { site, socials } from '../data/site'

const link =
  'inline-flex items-center gap-2 py-3 no-underline transition-colors hover:text-heading lg:py-1'

export function Footer() {
  return (
    <footer className="band flex flex-wrap items-center justify-between gap-4 py-10 text-sm">
      <p>
        © {new Date().getFullYear()} {site.shortName}
      </p>

      <ul className="flex list-none flex-wrap items-center gap-x-6 gap-y-1 p-0">
        {socials.map((social) => {
          const Icon = social.icon
          return (
            <li key={social.href}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={link}
              >
                <Icon className="size-4" />
                {social.label}
              </a>
            </li>
          )
        })}
        <li>
          <a href={`mailto:${site.email}`} className={link}>
            <Mail className="size-4" aria-hidden="true" />
            Email
          </a>
        </li>
        {/* The hero's button now opens a viewer, so this is the direct download. */}
        <li>
          <a href={site.resumeUrl} download className={link}>
            <Download className="size-4" aria-hidden="true" />
            Download resume
          </a>
        </li>
      </ul>
    </footer>
  )
}