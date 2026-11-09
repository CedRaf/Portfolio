import { useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'

/**
 * Copies the address and morphs to a confirmation for two seconds: the copy
 * icon blurs out as the check resolves in. A live region announces the
 * result, so a screen reader hears "Copied" as well. If the clipboard is
 * unavailable (insecure context, denied permission) it says so instead.
 */
/**
 * Fallback for browsers or embedded views that refuse the async Clipboard
 * API: copy from a temporary off-screen textarea.
 */
function legacyCopy(text: string) {
  const field = document.createElement('textarea')
  field.value = text
  field.setAttribute('readonly', '')
  field.style.position = 'fixed'
  field.style.opacity = '0'
  document.body.append(field)
  field.select()
  try {
    return document.execCommand('copy')
  } catch {
    return false
  } finally {
    field.remove()
  }
}

export function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const timer = useRef<number | undefined>(undefined)

  async function copy() {
    window.clearTimeout(timer.current)
    try {
      await navigator.clipboard.writeText(email)
      setState('copied')
    } catch {
      setState(legacyCopy(email) ? 'copied' : 'failed')
    }
    timer.current = window.setTimeout(() => setState('idle'), 2000)
  }

  const copied = state === 'copied'
  const icon = 'col-start-1 row-start-1 size-4 transition-[opacity,filter,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]'

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-11 items-center gap-2 rounded-lg border border-highlight-fg/60 px-4 text-[0.9375rem] font-medium text-highlight-fg transition-[background-color,border-color,transform] duration-150 hover:border-highlight-fg hover:bg-highlight-fg/5 active:scale-[0.97] lg:h-10"
    >
      <span aria-hidden="true" className="grid">
        <Copy className={`${icon} ${copied ? 'scale-50 opacity-0 blur-sm' : 'scale-100 opacity-100 blur-none'}`} />
        <Check className={`${icon} ${copied ? 'scale-100 opacity-100 blur-none' : 'scale-50 opacity-0 blur-sm'}`} />
      </span>
      <span aria-live="polite">
        {state === 'copied' ? 'Copied' : state === 'failed' ? 'Copy failed' : 'Copy email'}
      </span>
    </button>
  )
}
