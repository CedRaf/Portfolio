import { site } from '../data/site'

export function Footer() {
  return (
    <footer className="band py-10">
      <div className="mx-auto w-full max-w-[110rem]">
        <p className="text-xs">
          © {new Date().getFullYear()} {site.shortName}
        </p>
      </div>
    </footer>
  )
}
