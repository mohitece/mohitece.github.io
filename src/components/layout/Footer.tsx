import { ArrowUp } from 'lucide-react'
import { profile } from '../../content/profile'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="eyebrow">
          © {year} {profile.name}
          <span className="mx-2 text-dim">/</span>
          {profile.degreeShort}, {profile.schoolShort}
        </p>
        <ul className="eyebrow flex flex-wrap items-center gap-x-6 gap-y-1">
          <li>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="u-link flex h-11 items-center hover:text-paper">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={profile.links.github} target="_blank" rel="noreferrer" className="u-link flex h-11 items-center hover:text-paper">
              GitHub
            </a>
          </li>
          <li>
            <a href={`mailto:${profile.links.email}`} className="u-link flex h-11 items-center hover:text-paper">
              Email
            </a>
          </li>
          <li>
            <a href="#top" className="group flex h-11 items-center gap-2 text-paper">
              Back to top
              <ArrowUp className="size-3.5 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5" aria-hidden />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
