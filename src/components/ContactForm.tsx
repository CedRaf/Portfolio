import { useState } from 'react'
import type { FormEvent } from 'react'
import { Send } from 'lucide-react'
import { buttonBase, buttonVariants } from './buttonStyles'

const field = 'flex flex-col gap-2'

const label = 'text-xs font-medium uppercase tracking-[0.18em] text-fg'

const control =
  'w-full rounded-lg border border-heading/40 bg-muted px-4 py-3 text-heading transition-colors duration-200 hover:border-heading/60 focus:border-heading/70 disabled:opacity-60'

const hint = 'text-xs text-fg'

const MAX_ATTACHMENT_BYTES = 3 * 1024 * 1024

type Status = 'idle' | 'sending' | 'success' | 'error'

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = String(reader.result)
      resolve(result.slice(result.indexOf(',') + 1))
    }
    reader.onerror = () => reject(new Error('Could not read that attachment.'))
    reader.readAsDataURL(file)
  })
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  const sending = status === 'sending'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    setStatus('sending')
    setError(null)

    try {
      const file = data.get('attachment')
      let attachment
      if (file instanceof File && file.size > 0) {
        if (file.size > MAX_ATTACHMENT_BYTES) {
          throw new Error('That attachment is over 3 MB.')
        }
        attachment = {
          filename: file.name,
          type: file.type,
          base64: await fileToBase64(file),
        }
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          subject: data.get('subject'),
          message: data.get('message'),
          // Honeypot: the server treats a filled value as a bot.
          website: data.get('website'),
          attachment,
        }),
      })

      const payload = await response.json().catch(() => null)
      if (!response.ok) {
        throw new Error(payload?.error ?? 'Something went wrong. Please try again.')
      }

      form.reset()
      setStatus('success')
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : 'Something went wrong. Please try again.',
      )
      setStatus('error')
    }
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
            maxLength={100}
            required
            disabled={sending}
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
            disabled={sending}
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
          maxLength={150}
          disabled={sending}
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
          maxLength={5000}
          required
          disabled={sending}
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
          accept=".pdf,.png,.jpg,.jpeg,.webp"
          aria-describedby="contact-attachment-hint"
          disabled={sending}
        />
        <p className={hint} id="contact-attachment-hint">
          Optional. PDF, PNG, JPEG or WebP, up to 3&nbsp;MB.
        </p>
      </div>

      {/*Honeypot*/}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          className={`${buttonBase} ${buttonVariants.primary} disabled:opacity-60`}
          type="submit"
          disabled={sending}
        >
          <Send className="size-4" aria-hidden="true" />
          {sending ? 'Sending…' : 'Send message'}
        </button>

        <p className={hint} role="status" aria-live="polite">
          {status === 'success' && 'Thanks — your message is on its way.'}
          {status === 'error' && error}
        </p>
      </div>
    </form>
  )
}
