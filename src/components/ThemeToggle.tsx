import { useState } from 'react'
import { Moon, Sun } from 'lucide-react'

type Theme = 'light' | 'dark'

/**
 * The page follows the OS until the visitor picks a side; the choice is kept
 * in localStorage and re-applied before first paint by the script in
 * index.html. Storage can be unavailable (private windows, blocked site
 * data), so every access is guarded and the toggle still works for the visit.
 */
function currentTheme(): Theme {
  const set = document.documentElement.dataset.theme
  if (set === 'light' || set === 'dark') return set
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(currentTheme)
  const next: Theme = theme === 'dark' ? 'light' : 'dark'

  function toggle() {
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('theme', next)
    } catch {
      // Not persisted; the switch still applies for this visit.
    }
    setTheme(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className="grid size-11 place-items-center rounded-lg text-subtle transition-colors hover:bg-surface hover:text-heading lg:size-10"
    >
      {theme === 'dark' ? (
        <Sun className="size-[1.125rem]" aria-hidden="true" />
      ) : (
        <Moon className="size-[1.125rem]" aria-hidden="true" />
      )}
    </button>
  )
}
