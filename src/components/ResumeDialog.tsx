import { useId, useRef } from 'react'
import type { MouseEvent } from 'react'
import { Download, ExternalLink, FileText, X } from 'lucide-react'
import { buttonBase, buttonVariants } from './buttonStyles'
import type { ButtonVariant } from './buttonStyles'
import { site } from '../data/site'

const action =
  'inline-flex h-11 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-fg no-underline transition-colors hover:bg-surface hover:text-heading lg:h-9'

/**
 * The browser's own PDF viewer in a native modal dialog: Escape, focus trap
 * and focus return come for free. Mobile browsers often refuse to render a
 * PDF in an iframe, so Download and Open in new tab always stay visible.
 */
export function ResumeDialog({ variant = 'secondary' }: { variant?: ButtonVariant }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === dialogRef.current) dialogRef.current.close()
  }

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        className={`${buttonBase} ${buttonVariants[variant]}`}
        onClick={() => dialogRef.current?.showModal()}
      >
        <FileText className="size-4" aria-hidden="true" />
        View résumé
      </button>

      <dialog
        ref={dialogRef}
        onClick={handleBackdropClick}
        aria-labelledby={titleId}
        className="lightbox m-auto h-[90dvh] w-[min(64rem,94vw)] max-w-none rounded-xl border border-border bg-bg p-0 text-fg shadow-[0_24px_60px_-20px_rgb(0_0_0/0.45)] backdrop:bg-black/60"
      >
        <div className="flex h-full flex-col">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border py-2 pr-2 pl-5">
            <h2 id={titleId} className="font-semibold text-heading">
              Résumé
            </h2>

            <div className="flex items-center gap-0.5">
              <a className={action} href={site.resumeUrl} download>
                <Download className="size-4" aria-hidden="true" />
                Download
              </a>
              <a
                className={action}
                href={site.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="size-4" aria-hidden="true" />
                Open in new tab
              </a>
              <button
                type="button"
                className={`${action} w-11 justify-center px-0 lg:w-9`}
                onClick={() => dialogRef.current?.close()}
              >
                <X className="size-4" aria-hidden="true" />
                <span className="sr-only">Close résumé</span>
              </button>
            </div>
          </div>

          <iframe
            src={site.resumeUrl}
            title={`Résumé — ${site.shortName}`}
            loading="lazy"
            className="h-full w-full flex-1 bg-surface"
          />
        </div>
      </dialog>
    </>
  )
}
