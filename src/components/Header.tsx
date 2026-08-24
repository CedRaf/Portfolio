import { nav } from '../data/site'

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-[#202020]/100 backdrop-blur-lg">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <div className="band flex items-center justify-end gap-6 py-4">
        <nav aria-label="Primary">
          <ul className="flex list-none items-center gap-5 p-0 lg:gap-10">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-block py-3 text-[15.75px] text-heading no-underline transition-colors hover:text-accent lg:py-1.5"
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
