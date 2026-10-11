import { useEffect, useRef, useState } from 'react'
import { profile } from '../../content/profile'
import { useLocalTime } from '../../hooks/useLocalTime'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { cn } from '../../lib/cn'
import { LogoMark } from '../ui/Logo'

export const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
] as const

// The hero and Education aren't in the menu, but are observed so no link stays highlighted there.
const SPY_IDS = ['top', ...NAV_ITEMS.map((item) => item.id), 'education']

export function Nav({ onHome }: { onHome: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useScrollSpy(SPY_IDS, onHome)
  const time = useLocalTime(profile.timeZone)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Mobile menu: lock page scroll, close on Escape, keep focus inside, close on resize to desktop.
  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    root.style.overflow = 'hidden'
    panelRef.current?.querySelector<HTMLElement>('a')?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current || !toggleRef.current) return
      const focusables = [toggleRef.current, ...panelRef.current.querySelectorAll<HTMLElement>('a[href]')]
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    const mql = window.matchMedia('(min-width: 768px)')
    const onResize = () => mql.matches && setOpen(false)

    document.addEventListener('keydown', onKey)
    mql.addEventListener('change', onResize)
    return () => {
      root.style.overflow = ''
      document.removeEventListener('keydown', onKey)
      mql.removeEventListener('change', onResize)
    }
  }, [open])

  const close = () => setOpen(false)
  const available = profile.availability

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          'border-b transition-[background-color,border-color,backdrop-filter] duration-500',
          scrolled || open ? 'border-line bg-ink/80 backdrop-blur-xl' : 'border-transparent',
        )}
      >
        <nav aria-label="Primary" className="container-x flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
          <a href="#top" onClick={close} className="group -m-2 flex items-center gap-3 p-2" aria-label={`${profile.name} — back to top`}>
            <LogoMark className="size-7 transition-transform duration-500 ease-out-expo group-hover:rotate-[-8deg]" />
            <span className="text-[0.95rem] font-medium tracking-tight">{profile.name}</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? 'location' : undefined}
                  className={cn(
                    'group relative flex items-center gap-2 px-3 py-2 text-sm transition-colors duration-300',
                    active === item.id ? 'text-paper' : 'text-mute hover:text-paper',
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'size-1 bg-lime transition-transform duration-500 ease-out-expo',
                      active === item.id ? 'scale-100' : 'scale-0',
                    )}
                  />
                  <span className="u-link">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <p className="eyebrow hidden items-center gap-2.5 lg:flex">
            <span aria-hidden="true" className={cn('size-1.5 rounded-full', available ? 'pulse-dot bg-lime' : 'bg-mute')} />
            {available ? <span className="text-paper">{available}</span> : <span>New Delhi</span>}
            <span aria-hidden="true" className="text-dim">
              /
            </span>
            <span>
              <time>{time}</time> {profile.timeZoneLabel}
            </span>
          </p>

          <button
            ref={toggleRef}
            type="button"
            className="eyebrow -mr-3 flex h-11 items-center gap-3 px-3 text-paper md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span>{open ? 'Close' : 'Menu'}</span>
            <span aria-hidden="true" className="relative block h-2.5 w-5">
              <span className={cn('absolute left-0 h-px w-full bg-paper transition-transform duration-500 ease-out-expo', open ? 'top-1/2 rotate-45' : 'top-0')} />
              <span className={cn('absolute left-0 h-px w-full bg-paper transition-transform duration-500 ease-out-expo', open ? 'top-1/2 -rotate-45' : 'bottom-0')} />
            </span>
          </button>
        </nav>
      </div>

      {open && (
        <div
          ref={panelRef}
          id="mobile-menu"
          className="fade-in fixed inset-x-0 top-16 bottom-0 [animation-duration:0.5s] flex flex-col overflow-y-auto bg-ink md:hidden"
        >
          <ul className="container-x flex flex-col pt-6">
            {NAV_ITEMS.map((item, i) => (
              <li key={item.id} className="border-b border-line">
                <a
                  href={`#${item.id}`}
                  onClick={close}
                  className="flex items-baseline gap-4 py-4 text-[2.5rem] leading-none font-medium tracking-[-0.04em] active:text-lime"
                >
                  <span className="font-mono text-xs tracking-normal text-lime">0{i + 1}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="container-x mt-auto flex flex-col gap-4 pt-10 pb-10">
            <a href={`mailto:${profile.links.email}`} className="u-link self-start text-lg">
              {profile.links.email}
            </a>
            <div className="eyebrow flex gap-6">
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="flex h-11 items-center text-paper">
                LinkedIn ↗
              </a>
              <a href={profile.links.github} target="_blank" rel="noreferrer" className="flex h-11 items-center text-paper">
                GitHub ↗
              </a>
            </div>
            <p className="eyebrow">
              New Delhi / {time} {profile.timeZoneLabel}
            </p>
          </div>
        </div>
      )}
    </header>
  )
}
