/**
 * Shared by the anchor `Button` and the résumé dialog's trigger `<button>`, so
 * a link and a button that sit side by side look identical. 44px tall on touch
 * widths, 40px from `lg:` where a pointer is likely.
 */
export const buttonBase =
  'inline-flex h-11 items-center justify-center gap-2 rounded-lg px-4 text-[0.9375rem] font-medium no-underline transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.97] lg:h-10'

export const buttonVariants = {
  primary: 'bg-highlight text-highlight-fg hover:bg-heading hover:text-bg',
  secondary:
    'border border-control text-heading hover:border-heading hover:bg-surface',
  /** For use on a highlight (yellow) fill, e.g. the Contact card. */
  inverse: 'bg-highlight-fg text-highlight hover:bg-highlight-fg/85',
}

export type ButtonVariant = keyof typeof buttonVariants
