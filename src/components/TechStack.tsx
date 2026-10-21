import { Chip } from './Chip'

export function TechStack({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex list-none flex-wrap gap-2 p-0">
      {items.map((tech) => (
        <Chip key={tech}>{tech}</Chip>
      ))}
    </ul>
  )
}
