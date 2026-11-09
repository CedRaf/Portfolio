import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { buttonBase, buttonVariants } from './buttonStyles'
import type { ButtonVariant } from './buttonStyles'

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  variant?: ButtonVariant
  children: ReactNode
}

/** Calls to action that navigate are links, so this renders an anchor. */
export function Button({
  href,
  variant = 'secondary',
  children,
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <a href={href} className={`${buttonBase} ${buttonVariants[variant]} ${className}`} {...rest}>
      {children}
    </a>
  )
}
