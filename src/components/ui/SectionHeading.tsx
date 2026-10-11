import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  index: string
  label: string
  /** Optional note on the right of the label row. */
  aside?: ReactNode
  id: string
  children: ReactNode
}

/** "(02) ──── Skills" label row + a large section title. */
export function SectionHeading({ index, label, aside, id, children }: SectionHeadingProps) {
  return (
    <header className="mb-14 md:mb-20">
      <Reveal>
        <div className="flex items-baseline justify-between gap-6 border-t border-line pt-4">
          <p className="eyebrow flex items-baseline gap-3">
            <span className="text-lime" aria-hidden="true">
              ({index})
            </span>
            <span className="text-paper">{label}</span>
          </p>
          {aside && <p className="eyebrow hidden text-right sm:block">{aside}</p>}
        </div>
      </Reveal>
      <Reveal delay={80}>
        <h2 id={id} className="title mt-8 max-w-[18ch] md:mt-10">
          {children}
        </h2>
      </Reveal>
    </header>
  )
}
