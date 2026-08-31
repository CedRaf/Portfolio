/**
 * The hover lift is 2px — enough to acknowledge the pointer, not enough to
 * read as an effect. `motion-safe:` rather than relying on the reduced-motion
 * block in index.css: that only shortens the transition, which would leave the
 * button jumping 2px instantly instead of not moving at all.
 */
export const buttonBase =
  'inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[15px] no-underline transition-[color,background-color,border-color,transform] duration-200 motion-safe:hover:-translate-y-0.5'

export const buttonVariants = {
  default: 'border-heading/40 bg-transparent text-heading hover:border-heading',
  primary:
    'border-accent bg-accent text-accent-fg hover:border-heading hover:bg-heading',
}
