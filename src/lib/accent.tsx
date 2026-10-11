import type { ReactNode } from 'react'

/** Wraps the accent word of a headline line in the serif-italic lime style. */
export function withAccent(line: string, accent: string): ReactNode {
  const at = line.indexOf(accent)
  if (at === -1) return line
  return (
    <>
      {line.slice(0, at)}
      <em className="accent-word">{accent}</em>
      {line.slice(at + accent.length)}
    </>
  )
}
