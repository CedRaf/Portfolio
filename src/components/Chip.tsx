/** A technology in a project's stack. */
export function Chip({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-chip px-2.5 py-1 text-xs leading-none font-medium text-chip-fg">
      {children}
    </span>
  )
}
