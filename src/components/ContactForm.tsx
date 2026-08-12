import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { CheckCircle2, Send } from 'lucide-react'
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
  const [attachmentError, setAttachmentError] = useState<string | null>(null)
  const [sentTo, setSentTo] = useState('')

  const sending = status === 'sending'

  function handleAttachmentChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0]
    setAttachmentError(
      file && file.size > MAX_ATTACHMENT_BYTES
        ? `That file is ${(file.size / 1024 / 1024).toFixed(1)} MB. The limit is 3 MB.`
        : null,
    )
  }

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

      setSentTo(String(data.get('email') ?? ''))
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

  if (status === 'success') {
    return (
      <div
        role="status"
        className="mx-auto mt-14 flex w-full max-w-[44rem] flex-col items-center gap-3 rounded-xl border border-heading/40 bg-muted px-8 py-12 text-center"
      >
        <CheckCircle2 className="size-7 text-accent" aria-hidden="true" />
        <p className="font-display text-2xl text-heading">Message sent</p>
        <p className="max-w-[48ch] leading-relaxed">
          Thanks for reaching out{sentTo ? ' — ' : '.'}
          {sentTo && <span className="text-heading">I&rsquo;ll reply to {sentTo}.</span>}
        </p>
        <button
          type="button"
          className={`${buttonBase} ${buttonVariants.default} mt-4`}
          onClick={() => {
            setSentTo('')
            setStatus('idle')
          }}
        >
          Send another
        </button>
      </div>
    )
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
          Subject <span className="normal-case tracking-normal">(optional)</span>
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
          Attachment <span className="normal-case tracking-normal">(optional)</span>
        </label>
        <input
          className={`${control} cursor-pointer file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-border file:px-4 file:py-1.5 file:text-sm file:text-heading`}
          id="contact-attachment"
          name="attachment"
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,.webp"
          aria-describedby="contact-attachment-hint"
          aria-invalid={attachmentError ? true : undefined}
          onChange={handleAttachmentChange}
          disabled={sending}
        />
        {attachmentError ? (
          <p className="text-xs text-heading" role="alert">
            {attachmentError}
          </p>
        ) : (
          <p className={hint} id="contact-attachment-hint">
            PDF, PNG, JPEG or WebP, up to 3&nbsp;MB.
          </p>
        )}
      </div>

      <div
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="contact-website">Leave this field empty</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      
      {status === 'error' && error && (
        <p
          role="alert"
          className="mt-6 rounded-lg border border-heading/40 bg-muted px-4 py-3 text-heading"
        >
          {error}
        </p>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          className={`${buttonBase} ${buttonVariants.primary} disabled:opacity-60`}
          type="submit"
          disabled={sending || attachmentError !== null}
        >
          <Send className="size-4" aria-hidden="true" />
          {sending ? 'Sending…' : 'Send message'}
        </button>
        {sending && (
          <p className={hint} role="status">
            Sending your message…
          </p>
        )}
      </div>
    </form>
  )
}
