import { Mail } from 'lucide-react'
import { GithubIcon } from './GithubIcon'
import { site, socials } from '../data/site'

export function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-4 px-5 py-7 text-[15px] lg:px-8">
      <p>
        © {new Date().getFullYear()} {site.shortName}
      </p>

      <ul className="flex list-none items-center gap-5 p-0">
        {socials.map((social) => (
          <li key={social.href}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 py-1 no-underline transition-colors hover:text-heading"
            >
              <GithubIcon className="size-4" />
              {social.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-1.5 py-1 no-underline transition-colors hover:text-heading"
          >
            <Mail className="size-4" aria-hidden="true" />
            Email
          </a>
        </li>
      </ul>
    </footer>
  )
}
