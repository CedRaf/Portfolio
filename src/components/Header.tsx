import { nav, site } from '../data/site'

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-bg/80 backdrop-blur-md">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <div className="flex items-center justify-between gap-6 px-5 py-3 lg:px-8">
        <a
          href="#top"
          className="font-medium tracking-tight text-heading no-underline"
        >
          <span className="sm:hidden">{site.initials}</span>
          <span className="hidden sm:inline">{site.shortName}</span>
        </a>

        <nav aria-label="Primary">
          <ul className="flex list-none gap-3 p-0 text-sm sm:text-[15px] lg:gap-5 lg:text-base">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="border-b border-transparent px-0.5 py-1 no-underline transition-colors hover:border-accent hover:text-heading"
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
