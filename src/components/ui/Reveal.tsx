import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Stagger delay in milliseconds. */
  delay?: number
}

/** Fades + lifts its children in the first time they scroll into view. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-in')
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-in')
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={cn('reveal', className)} style={{ '--d': `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  )
}
