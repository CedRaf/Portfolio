export const buttonBase =
  'inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[15px] no-underline transition-colors duration-200'

export const buttonVariants = {
  default: 'border-border bg-transparent text-heading hover:border-heading',
  // The one place the accent appears as a fill; accent-fg keeps text on it legible.
  primary:
    'border-accent bg-accent text-accent-fg hover:border-heading hover:bg-heading',
}
