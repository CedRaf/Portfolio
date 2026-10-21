import { useRef } from 'react'
import type { MouseEvent } from 'react'
import { X } from 'lucide-react'
import type { Shot } from '../data/projects'

/**
 * An image that opens larger in a native modal `<dialog>`, the same approach as
 * `ResumeDialog`: the browser handles Escape, traps focus while it is open and
 * returns focus to the image afterwards. Clicking the dimmed backdrop closes it.
 *
 * The ring is pulled inside the image (`-outline-offset-4`) because these sit in
 * `overflow-hidden` frames that would clip the usual outside ring.
 */
export function ImageZoom({ shot, className }: { shot: Shot; className: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === dialogRef.current) dialogRef.current.close()
  }

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-label={`View larger: ${shot.alt}`}
        onClick={() => dialogRef.current?.showModal()}
        className="block w-full cursor-zoom-in focus-visible:-outline-offset-4"
      >
        <img
          src={shot.src}
          alt=""
          width={shot.width}
          height={shot.height}
          loading="lazy"
          className={className}
        />
      </button>

      <dialog
        ref={dialogRef}
        onClick={handleBackdropClick}
        aria-label={shot.alt}
        className="lightbox m-auto max-w-none overflow-visible bg-transparent p-0 backdrop:bg-black/80"
      >
        <div className="grid">
          <img
            src={shot.src}
            alt={shot.alt}
            width={shot.width}
            height={shot.height}
            className="h-auto max-h-[88dvh] w-auto max-w-[94vw] rounded-lg border border-heading/15 object-contain [grid-area:1/1]"
          />
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="z-10 m-3 grid size-11 place-items-center self-start justify-self-end rounded-full border border-heading/60 bg-bg/80 text-heading backdrop-blur-sm transition-colors [grid-area:1/1] hover:border-heading hover:text-accent lg:size-9"
          >
            <X className="size-4" aria-hidden="true" />
            <span className="sr-only">Close</span>
          </button>
        </div>
      </dialog>
    </>
  )
}
