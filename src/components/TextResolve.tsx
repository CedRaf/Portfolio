import { motion, useReducedMotion } from 'motion/react'

type TextResolveProps = {
  text: string
  as?: 'h1' | 'h2' | 'p'
  id?: string
  className?: string
  delay?: number
}

/**
 * Word-by-word reveal that resolves from blurred to sharp.
 *
 * This is the page's one authored entrance. The thesis is scattered work
 * settling into order, so the name arrives out of focus and sharpens rather
 * than sliding up from below — a fade-and-rise is what every other portfolio
 * does, and the site already spent that move twice.
 *
 * Adapted from motion-primitives' `TextEffect`, rewritten for this codebase:
 * no `cn`/`clsx`, no `'use client'`, and reduced motion actually honoured
 * (the original has no handling at all, and the CSS reset in index.css does
 * not reach motion's JS-driven inline styles).
 */
export function TextResolve({
  text,
  as: Wrapper = 'h1',
  id,
  className = '',
  delay = 0,
}: TextResolveProps) {
  const reduceMotion = useReducedMotion()
  const words = text.split(' ')

  return (
    <Wrapper id={id} className={className}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          {index > 0 && ' '}
          <motion.span
            className="inline-block"
            initial={
              reduceMotion
                ? false
                : { opacity: 0, filter: 'blur(14px)', y: '0.1em' }
            }
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{
              duration: 0.75,
              delay: delay + index * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Wrapper>
  )
}
