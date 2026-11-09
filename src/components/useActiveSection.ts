import { useEffect, useState } from 'react'

/**
 * Which section is in the middle of the viewport, for the nav's current-item
 * marker. An IntersectionObserver band across the middle third, so the marker
 * changes as a section takes over the reading position rather than the
 * moment its top edge appears.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-35% 0px -60% 0px' },
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}
