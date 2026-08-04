import { nav, site } from '../data/site'

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-bg/70 backdrop-blur-lg">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <div className="band flex items-center justify-between gap-6 py-4">
        <a
          href="#top"
          className="font-display text-lg text-heading no-underline lg:text-xl"
        >
          <span className="sm:hidden">{site.initials}</span>
          <span className="hidden sm:inline">{site.shortName}</span>
        </a>

        <nav aria-label="Primary">
          <ul className="flex list-none items-center gap-4 p-0 text-sm lg:gap-7">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  /* py keeps the tap target at/above the 24px AA minimum. */
                  className="inline-block py-1.5 no-underline transition-colors hover:text-heading"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
