import type { AnchorHTMLAttributes, ReactNode } from 'react'

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  variant?: 'default' | 'primary'
  children: ReactNode
}

const base =
  'inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[15px] no-underline transition-colors duration-200'

const variants = {
  default: 'border-border bg-transparent text-heading hover:border-heading',
  // The one place the accent appears as a fill; accent-fg keeps text on it legible.
  primary:
    'border-accent bg-accent text-accent-fg hover:border-heading hover:bg-heading',
}

/** Every call to action on this site is a link, so this renders an anchor. */
export function Button({
  href,
  variant = 'default',
  children,
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <a
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  )
}
