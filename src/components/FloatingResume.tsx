import { Download } from 'lucide-react'
import { buttonBase, buttonVariants } from './buttonStyles'
import { site } from '../data/site'

/**
 * Page-level download CTA that stays with the reader as they scroll, rather
 * than sitting at the end of one section. Rendered last in the document so it
 * lands at the end of the tab order instead of interrupting the page.
 *
 * Icon-only below `sm:` — at full width it covered half a 375px viewport and
 * sat on top of the hero's own resume button.
 */
export function FloatingResume() {
  return (
    <a
      href={site.resumeUrl}
      download
      aria-label="Download resume"
      className={`${buttonBase} ${buttonVariants.primary} fixed right-5 bottom-5 z-30 shadow-card max-sm:size-11 max-sm:justify-center max-sm:px-0 lg:right-8 lg:bottom-8`}
    >
      <Download className="size-4" aria-hidden="true" />
      <span className="hidden sm:inline">Download resume</span>
    </a>
  )
}
