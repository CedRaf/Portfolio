import type { AnchorHTMLAttributes, ReactNode } from 'react'

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  variant?: 'default' | 'primary'
  children: ReactNode
}

const base =
  'inline-flex items-center gap-2 rounded-lg border px-4.5 py-2.5 text-base no-underline transition duration-200 hover:shadow-card'

const variants = {
  default: 'border-border bg-bg text-heading hover:border-accent/50',
  // Tint stays light: at /10 the accent-on-accent text fell to 4.49:1, just under AA.
  primary: 'border-accent/50 bg-accent/5 text-accent hover:border-accent',
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
    <a href={href} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </a>
  )
}
