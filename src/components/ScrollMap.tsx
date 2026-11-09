import { useEffect, useRef } from 'react'
import type { KeyboardEvent, PointerEvent } from 'react'
import type { NavItem } from '../data/site'

const TICKS = 28

/**
 * Section nav as a minimap, after rauno.me: a ruler of hairline ticks with an
 * outlined tracker that slides along it as the page scrolls, and the current
 * section's name resolving in underneath. The links stay real anchors below.
 *
 * Scroll position is written straight to a CSS custom property on the nav
 * (once per animation frame) rather than through React state, so scrolling
 * never re-renders the header.
 *
 * The ruler is also a slider: click a point to glide there, drag the tracker
 * to scrub the page, or focus it and use the arrow, Page and Home/End keys.
 */

function scrollMax() {
  return document.documentElement.scrollHeight - window.innerHeight
}

function scrollToProgress(progress: number, glide: boolean) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({
    top: Math.min(1, Math.max(0, progress)) * scrollMax(),
    behavior: glide && !reduced ? 'smooth' : 'instant',
  })
}

const keySteps: Record<string, number> = {
  ArrowRight: 0.05,
  ArrowUp: 0.05,
  ArrowLeft: -0.05,
  ArrowDown: -0.05,
  PageDown: 0.2,
  PageUp: -0.2,
}
export function ScrollMap({
  items,
  active,
}: {
  items: readonly NavItem[]
  active: string | null
}) {
  const navRef = useRef<HTMLElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const drag = useRef<{ startX: number; moved: boolean } | null>(null)
  // Where the last key press was heading, so rapid presses add up instead of
  // each measuring from a page that is still mid-glide.
  const keyTarget = useRef<{ progress: number; at: number } | null>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = scrollMax()
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      navRef.current?.style.setProperty('--progress', String(progress))
      sliderRef.current?.setAttribute('aria-valuenow', String(Math.round(progress * 100)))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const current = items.find((item) => item.href.slice(1) === active)

  function progressAt(clientX: number) {
    const rect = sliderRef.current?.getBoundingClientRect()
    return rect && rect.width > 0 ? (clientX - rect.left) / rect.width : 0
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return
    event.currentTarget.setPointerCapture(event.pointerId)
    drag.current = { startX: event.clientX, moved: false }
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const state = drag.current
    if (!state) return
    if (!state.moved && Math.abs(event.clientX - state.startX) < 3) return
    state.moved = true
    event.currentTarget.dataset.dragging = 'true'
    scrollToProgress(progressAt(event.clientX), false)
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    const state = drag.current
    drag.current = null
    delete event.currentTarget.dataset.dragging
    // A press without a drag is a click: glide to that point instead of jumping.
    if (state && !state.moved) scrollToProgress(progressAt(event.clientX), true)
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const max = scrollMax()
    const recent = keyTarget.current && event.timeStamp - keyTarget.current.at < 700
    const now = recent && keyTarget.current ? keyTarget.current.progress : max > 0 ? window.scrollY / max : 0
    let target: number | null = null
    if (event.key in keySteps) target = now + keySteps[event.key]
    else if (event.key === 'Home') target = 0
    else if (event.key === 'End') target = 1
    if (target === null) return
    event.preventDefault()
    target = Math.min(1, Math.max(0, target))
    keyTarget.current = { progress: target, at: event.timeStamp }
    scrollToProgress(target, true)
  }

  return (
    <nav ref={navRef} aria-label="Sections" className="scroll-map-nav mt-10 hidden border-t border-border pt-6 lg:block">
      <div
        ref={sliderRef}
        role="slider"
        tabIndex={0}
        aria-label="Page position"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={0}
        aria-valuetext={current ? `${current.label} section` : 'Top of page'}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
        className="scroll-map-slider group -my-2.5 cursor-pointer touch-none rounded-md py-2.5 select-none"
      >
        <div className="scroll-map">
          <div className="flex justify-between">
            {Array.from({ length: TICKS }, (_, index) => (
              <span
                key={index}
                className="h-[1.125rem] w-px bg-control/60 transition-colors duration-200 group-hover:bg-control"
              />
            ))}
          </div>
          <span className="scroll-map-tracker" />
        </div>
      </div>

      {/* Rides under the tracker; remounts on change so it fades in afresh. */}
      <div aria-hidden="true" className="relative mt-2.5 h-5">
        <span key={current?.href ?? 'none'} className="scroll-map-label text-xs whitespace-nowrap text-subtle">
          {current?.label ?? ''}
        </span>
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
        {items.map((item) => {
          const isCurrent = item.href === current?.href
          return (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={isCurrent ? 'true' : undefined}
                className={`inline-flex h-10 items-center text-[0.9375rem] font-medium no-underline transition-colors duration-200 ${isCurrent ? 'text-heading' : 'text-subtle hover:text-heading'}`}
              >
                {item.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
