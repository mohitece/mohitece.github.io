/** Monogram: an "M" drawn as a single pulse trace. Matches the favicon. */
export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="3" fill="var(--color-lime)" />
      <path
        d="M7 23.5V9.5l9 9 9-9v14"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="3.2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  )
}
