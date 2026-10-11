import { useEffect, useState } from 'react'

/**
 * Tiny hash router — works on GitHub Pages without any server config.
 *   #/work/<slug>  → a project page
 *   anything else → the home page (plain "#about"-style anchors scroll to sections)
 */
export type Route = { page: 'home'; anchor: string | null } | { page: 'project'; slug: string }

export function parseHash(hash: string): Route {
  const match = hash.match(/^#\/work\/([\w-]+)\/?$/)
  if (match) return { page: 'project', slug: match[1] }
  const anchor = hash.startsWith('#') && hash.length > 1 && !hash.startsWith('#/') ? hash.slice(1) : null
  return { page: 'home', anchor }
}

/** Scroll position just before the latest hash change — used to restore the home page on "Back". */
export let scrollBeforeHashChange = 0

export function useHashRoute() {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash))

  useEffect(() => {
    const onHashChange = () => {
      scrollBeforeHashChange = window.scrollY
      setRoute(parseHash(window.location.hash))
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return route
}
