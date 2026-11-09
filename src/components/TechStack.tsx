import { Chip } from './Chip'

export function TechStack({ items }: { items: readonly string[] }) {
  return (
    <ul aria-label="Built with" className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li key={item}>
          <Chip>{item}</Chip>
        </li>
      ))}
    </ul>
  )
}
