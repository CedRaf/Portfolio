import { useEffect, useRef } from 'react'
import { motion, useReducedMotion, useSpring } from 'motion/react'

const positionSpring = { stiffness: 140, damping: 20, mass: 0.5 }
const fadeSpring = { stiffness: 200, damping: 30, mass: 0.4 }

/**
 * A soft light that trails the cursor across its parent element.
 *
 * Drop it inside a `relative overflow-hidden` container — it listens on its own
 * parent, so the consumer stays a plain element with no handlers to wire up.
 *
 * Adapted from motion-primitives' `Spotlight`. The tint is `--color-heading` at
 * 10%, not the accent: §9.4 spends the yellow on headings, chips and CTAs, and
 * a yellow wash across every card would read as a second accent rather than as
 * depth. Position is driven by transform only, so no gradient string is rebuilt
 * per frame.
 */
export function Spotlight() {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const x = useSpring(0, positionSpring)
  const y = useSpring(0, positionSpring)
  const opacity = useSpring(0, fadeSpring)

  useEffect(() => {
    if (reduceMotion) return
    if (!window.matchMedia('(hover: hover)').matches) return

    const parent = ref.current?.parentElement
    if (!parent) return

    // Arrow consts rather than function declarations: a hoisted declaration
    // does not see `parent` narrowed by the guard above.
    const offsetIn = (event: MouseEvent) => {
      const rect = parent.getBoundingClientRect()
      return { left: event.clientX - rect.left, top: event.clientY - rect.top }
    }

    const handleMove = (event: MouseEvent) => {
      const { left, top } = offsetIn(event)
      x.set(left)
      y.set(top)
    }

    const handleEnter = (event: MouseEvent) => {
      // Snap to the cursor before fading in, so the light does not sweep across
      // the card from wherever the previous hover left it.
      const { left, top } = offsetIn(event)
      x.jump(left)
      y.jump(top)
      opacity.set(1)
    }

    const handleLeave = () => {
      opacity.set(0)
    }

    parent.addEventListener('mousemove', handleMove)
    parent.addEventListener('mouseenter', handleEnter)
    parent.addEventListener('mouseleave', handleLeave)

    return () => {
      parent.removeEventListener('mousemove', handleMove)
      parent.removeEventListener('mouseenter', handleEnter)
      parent.removeEventListener('mouseleave', handleLeave)
    }
  }, [opacity, reduceMotion, x, y])

  return (
    <motion.span
      ref={ref}
      aria-hidden="true"
      style={{ x, y, opacity }}
      className="pointer-events-none absolute -top-40 -left-40 -z-10 size-80 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-heading)_10%,transparent)_0%,transparent_70%)]"
    />
  )
}
