import { useEffect, useState } from 'react'

/** Returns the id of the section currently crossing the middle of the viewport. */
export function useScrollSpy(ids: readonly string[], enabled = true) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled) {
      setActive(null)
      return
    }
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -54% 0px' },
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids, enabled])

  return active
}
