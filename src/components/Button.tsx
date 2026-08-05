import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { buttonBase, buttonVariants } from './buttonStyles'

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  variant?: 'default' | 'primary'
  children: ReactNode
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
      className={`${buttonBase} ${buttonVariants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  )
}
