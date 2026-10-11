import type { ReactNode } from 'react'

interface TodoProps {
  /** Where to edit, e.g. "src/content/projects.ts → hardware" */
  file: string
  children: ReactNode
}

/**
 * A visible reminder of missing content — rendered ONLY in development
 * (`npm run dev`). In the production build it renders nothing, so
 * placeholders are never published.
 */
export function Todo({ file, children }: TodoProps) {
  if (!import.meta.env.DEV) return null
  return (
    <div className="rounded-[2px] border border-dashed border-lime/50 bg-lime/[0.04] px-4 py-3 font-mono text-xs leading-relaxed [overflow-wrap:anywhere] text-lime/90">
      <span className="mr-2 font-semibold">TODO</span>
      {children}
      <span className="mt-1 block text-lime/60">↳ {file}</span>
    </div>
  )
}
