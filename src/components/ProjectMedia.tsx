import { Carousel } from './Carousel'
import { ImageZoom } from './ImageZoom'
import type { Media } from '../data/projects'

/**
 * The image at the top of a featured project: one image, or a carousel. Both
 * render at 2:1 so every project's panel opens at the same height.
 */
export function ProjectMedia({ media }: { media: Media }) {
  if (media.kind === 'carousel') return <Carousel label={media.label} slides={media.slides} />

  return (
    <ImageZoom shot={media.shot} className="aspect-[2/1] h-auto w-full object-cover object-top" />
  )
}
