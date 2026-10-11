import { useEffect, useLayoutEffect, useRef } from 'react'
import { Footer } from './components/layout/Footer'
import { Nav } from './components/layout/Nav'
import { profile } from './content/profile'
import { projects } from './content/projects'
import { scrollBeforeHashChange, useHashRoute, type Route } from './hooks/useHashRoute'
import { Home } from './pages/Home'
import { NotFound, ProjectPage } from './pages/ProjectPage'

const BASE_TITLE = `${profile.name} — ECE Student, USICT · GGSIPU`

export default function App() {
  const route = useHashRoute()
  const previous = useRef<Route | null>(null)
  const project = route.page === 'project' ? projects.find((p) => p.slug === route.slug) : undefined

  // Remember where the reader was on the home page before opening a project.
  const homeScroll = useRef<{ y: number; anchor: string | null } | null>(null)

  // Scroll + focus management between "pages" of the hash router.
  useLayoutEffect(() => {
    const prev = previous.current
    previous.current = route

    if (route.page === 'project') {
      if (prev?.page === 'home') homeScroll.current = { y: scrollBeforeHashChange, anchor: prev.anchor }
      window.scrollTo({ top: 0, behavior: 'instant' })
      document.getElementById('page-title')?.focus({ preventScroll: true })
      return
    }

    const target = route.anchor ? document.getElementById(route.anchor) : null
    if (!prev) {
      // Fresh load with #section: the section didn't exist when the browser handled the hash.
      target?.scrollIntoView({ behavior: 'instant', block: 'start' })
    } else if (prev.page === 'project') {
      // Back from a project: restore the old position if returning to the same place, else go to the anchor.
      const saved = homeScroll.current
      if (saved && saved.anchor === route.anchor) window.scrollTo({ top: saved.y, behavior: 'instant' })
      else if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' })
      else window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [route])

  useEffect(() => {
    document.title = route.page === 'project' ? `${project?.title ?? 'Not found'} — ${profile.name}` : BASE_TITLE
  }, [route, project])

  return (
    <div className="grain">
      <a
        href="#main"
        onClick={(e) => {
          e.preventDefault()
          document.getElementById('main')?.focus()
        }}
        className="eyebrow fixed top-3 left-3 z-[70] -translate-y-20 bg-lime px-4 py-3 text-ink transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <Nav onHome={route.page === 'home'} />
      <main id="main" tabIndex={-1} className="outline-none">
        {route.page === 'home' ? <Home /> : project ? <ProjectPage key={project.slug} project={project} /> : <NotFound />}
      </main>
      <Footer />
    </div>
  )
}
