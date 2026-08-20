import type { ReactNode } from 'react'

/**
 * The accent-outlined pill used for tech stacks and skills. A plain <li>
 * because every chip on this site lives in a list.
 */
export function Chip({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-full border border-accent/70 px-3 py-1 font-mono text-[13px] leading-5 text-accent">
      {children}
    </li>
  )
}
