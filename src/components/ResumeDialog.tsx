import { useRef } from 'react'
import type { MouseEvent } from 'react'
import { Download, ExternalLink, FileText, X } from 'lucide-react'
import { buttonBase, buttonVariants } from './buttonStyles'
import { site } from '../data/site'

const action =
  'inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm no-underline transition-colors hover:text-heading'

export function ResumeDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === dialogRef.current) dialogRef.current.close()
  }

  return (
    <>
      <button
        type="button"
        className={`${buttonBase} ${buttonVariants.default}`}
        onClick={() => dialogRef.current?.showModal()}
      >
        <FileText className="size-4" aria-hidden="true" />
        View resume
      </button>

      <dialog
        ref={dialogRef}
        onClick={handleBackdropClick}
        aria-labelledby="resume-dialog-title"
        className="m-auto h-[90dvh] w-[min(64rem,92vw)] rounded-xl border border-border bg-bg p-0 text-fg backdrop:bg-black/70"
      >
        <div className="flex h-full flex-col">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3">
            <h2
              id="resume-dialog-title"
              className="font-display text-lg text-heading"
            >
              Resume
            </h2>

            <div className="flex items-center gap-1">
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
                className={`${action} ml-1`}
                onClick={() => dialogRef.current?.close()}
              >
                <X className="size-4" aria-hidden="true" />
                <span className="sr-only">Close resume</span>
              </button>
            </div>
          </div>

          <iframe
            src={site.resumeUrl}
            title={`Resume — ${site.shortName}`}
            className="h-full w-full flex-1 bg-muted"
          />
        </div>
      </dialog>
    </>
  )
}
