import { site } from '../data/site'

export function Footer() {
  return (
    <footer className="border-t border-border py-10 text-sm text-subtle">
      <p>
        © {new Date().getFullYear()} {site.shortName}
      </p>
    </footer>
  )
}
