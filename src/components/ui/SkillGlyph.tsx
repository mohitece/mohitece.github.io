import type { SkillLevel } from '../../content/types'

/**
 * Datasheet-style symbols for each proficiency level — read at a glance,
 * and always paired with a text label (never colour or shape alone).
 */
export function SkillGlyph({ level, className = '' }: { level: SkillLevel; className?: string }) {
  const common = { className: `shrink-0 ${className}`, width: 12, height: 12, viewBox: '0 0 12 12', 'aria-hidden': true } as const
  switch (level) {
    case 'project':
      return (
        <svg {...common}>
          <rect x="1" y="1" width="10" height="10" fill="var(--color-lime)" />
        </svg>
      )
    case 'familiar':
      return (
        <svg {...common}>
          <rect x="1.5" y="1.5" width="9" height="9" fill="none" stroke="var(--color-paper)" />
          <path d="M1.5 10.5 10.5 1.5V10.5Z" fill="var(--color-paper)" />
        </svg>
      )
    case 'coursework':
      return (
        <svg {...common}>
          <rect x="1.5" y="1.5" width="9" height="9" fill="none" stroke="var(--color-paper)" />
          <path d="M1.5 6h9" stroke="var(--color-paper)" />
        </svg>
      )
    case 'learning':
      return (
        <svg {...common}>
          <rect x="1.5" y="1.5" width="9" height="9" fill="none" stroke="var(--color-paper)" />
        </svg>
      )
    case 'interest':
      return (
        <svg {...common}>
          <rect x="1.5" y="1.5" width="9" height="9" fill="none" stroke="var(--color-mute)" strokeDasharray="2 1.5" />
        </svg>
      )
  }
}
