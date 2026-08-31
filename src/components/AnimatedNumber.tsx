import { useEffect, useRef } from 'react'
import {
  motion,
  useInView,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react'

const countSpring = { stiffness: 70, damping: 22, mass: 0.6 }

type AnimatedNumberProps = {
  value: number
}

/**
 * Counts up to `value` the first time it is scrolled into view.
 *
 * Used once, on the retrieval-performance figure — the only number on the site
 * that is a measured result rather than a date, so it is the only one where
 * arriving at the number carries meaning.
 *
 * The animating digits are hidden from assistive tech and the final value is
 * exposed as static text, so the sentence is never read mid-count.
 */
export function AnimatedNumber({ value }: AnimatedNumberProps) {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const count = useSpring(0, countSpring)
  const rounded = useTransform(count, (current) => Math.round(current))

  useEffect(() => {
    if (!inView) return
    if (reduceMotion) {
      count.jump(value)
      return
    }
    count.set(value)
  }, [count, inView, reduceMotion, value])

  return (
    <span
      ref={ref}
      className="inline-block tabular-nums"
      style={{ minWidth: `${String(value).length}ch` }}
    >
      <motion.span aria-hidden="true">{rounded}</motion.span>
      <span className="sr-only">{value}</span>
    </span>
  )
}
