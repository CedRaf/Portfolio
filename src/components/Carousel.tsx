import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ImageZoom } from './ImageZoom'
import type { Slide } from '../data/projects'

const control =
  'pointer-events-auto grid size-11 place-items-center rounded-full border border-heading/60 bg-bg/80 text-heading backdrop-blur-sm transition-colors hover:border-heading hover:text-accent lg:size-9'

/**
 * A manual carousel — no autoplay, so nothing moves unless the reader asks
 * (WCAG 2.2.2), and sections stay still per the motion rules.
 *
 * Slides are stacked in one grid cell and cross-fade with a plain CSS
 * transition, which the reduced-motion reset in `index.css` already covers.
 * Hidden slides are `inert`, and the slide area is a polite live region, so a
 * screen reader hears the new slide when a control is pressed.
 *
 * The arrows sit over the image in the same grid cell, not absolutely
 * positioned. When they show is decided by `.carousel-controls` in `index.css`.
 */
export function Carousel({ label, slides }: { label: string; slides: readonly Slide[] }) {
  const [active, setActive] = useState(0)
  const count = slides.length

  function step(by: number) {
    setActive((current) => (current + by + count) % count)
  }

  return (
    <div role="group" aria-roledescription="carousel" aria-label={label} className="group grid">
      <div className="grid [grid-area:1/1]" aria-live="polite">
        {slides.map((slide, index) => {
          const shown = index === active
          return (
            <div
              key={slide.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${count}: ${slide.name}`}
              inert={!shown}
              className={`[grid-area:1/1] transition-[opacity,visibility] duration-300 ${shown ? 'opacity-100' : 'invisible opacity-0'}`}
            >
              <ImageZoom
                shot={slide}
                className={`aspect-[2/1] h-auto w-full ${slide.contain ? 'bg-bg object-contain' : 'object-cover'}`}
              />
            </div>
          )
        })}
      </div>

      <div className="carousel-controls pointer-events-none z-10 flex items-center justify-between p-2 transition-opacity duration-200 [grid-area:1/1]">
        <button type="button" onClick={() => step(-1)} aria-label="Previous slide" className={control}>
          <ChevronLeft className="size-4" aria-hidden="true" />
        </button>
        <button type="button" onClick={() => step(1)} aria-label="Next slide" className={control}>
          <ChevronRight className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
