import type { FormEvent } from 'react'
import { Send } from 'lucide-react'
import { buttonBase, buttonVariants } from './buttonStyles'

const field = 'flex flex-col gap-2'

const label = 'text-xs font-medium uppercase tracking-[0.18em] text-fg'

const control =
  'w-full rounded-lg border border-heading/40 bg-muted px-4 py-3 text-heading transition-colors duration-200 hover:border-heading/60 focus:border-heading/70'

const hint = 'text-xs text-fg'

export function ContactForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Layout only for now. Wiring this up means a third party receives visitor
    // data, which needs sign-off first — see CLAUDE.md §7.
    // TODO: POST to the chosen form endpoint once that decision is made.
    event.preventDefault()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-14 w-full max-w-[44rem] text-left"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div className={field}>
          <label className={label} htmlFor="contact-name">
            Name
          </label>
          <input
            className={control}
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
          />
        </div>

        <div className={field}>
          <label className={label} htmlFor="contact-email">
            Email
          </label>
          <input
            className={control}
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </div>
      </div>

      <div className={`${field} mt-6`}>
        <label className={label} htmlFor="contact-subject">
          Subject
        </label>
        <input
          className={control}
          id="contact-subject"
          name="subject"
          type="text"
        />
      </div>

      <div className={`${field} mt-6`}>
        <label className={label} htmlFor="contact-message">
          Message
        </label>
        <textarea
          className={`${control} resize-y`}
          id="contact-message"
          name="message"
          rows={6}
          required
        />
      </div>

      <div className={`${field} mt-6`}>
        <label className={label} htmlFor="contact-attachment">
          Attachment
        </label>
        <input
          className={`${control} cursor-pointer file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-border file:px-4 file:py-1.5 file:text-sm file:text-heading`}
          id="contact-attachment"
          name="attachment"
          type="file"
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
          aria-describedby="contact-attachment-hint"
        />
        <p className={hint} id="contact-attachment-hint">
          Optional. PDF, Word or image, up to 4&nbsp;MB.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          className={`${buttonBase} ${buttonVariants.primary}`}
          type="submit"
        >
          <Send className="size-4" aria-hidden="true" />
          Send message
        </button>
        <p className={hint}>Not wired up yet — submitting does nothing.</p>
      </div>
    </form>
  )
}
