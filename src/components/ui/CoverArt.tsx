import type { CSSProperties } from 'react'
import type { Project } from '../../content/types'

const W = 640
const H = 400
const BASE = 336
const MAX_H = 248
const CUT = 0.34

/** Deterministic pseudo-random in [0, 1) so the art is identical on every load. */
function rand(i: number) {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

function makeBlades(width: number, count: number) {
  const x0 = 132
  const x1 = width - 40
  return Array.from({ length: count }, (_, i) => {
    const raw = 0.52 + 0.2 * Math.sin(i * 0.31) + 0.3 * (rand(i) - 0.35)
    const h = Math.min(1, Math.max(CUT + 0.12, raw))
    const lean = (rand(i + 97) - 0.5) * 16
    return { x: x0 + i * ((x1 - x0) / (count - 1)), h, lean }
  })
}

const VARIANTS = {
  card: { width: W, blades: makeBlades(W, 64) },
  wide: { width: 1120, blades: makeBlades(1120, 124) },
}

/**
 * Abstract grass: uneven blades that get trimmed to one height on hover/focus.
 * It is an illustration, not a picture of the actual build.
 */
function GrassArt({ wide }: { wide: boolean }) {
  const { width, blades } = wide ? VARIANTS.wide : VARIANTS.card
  const x0 = blades[0].x
  const x1 = blades[blades.length - 1].x
  const cutY = BASE - CUT * MAX_H
  return (
    <svg viewBox={`0 0 ${width} ${H}`} className="h-full w-full" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice">
      <line x1="0" x2={width} y1={BASE + 0.5} y2={BASE + 0.5} stroke="var(--color-line-strong)" />
      <line x1="24" x2={width - 24} y1={cutY} y2={cutY} stroke="var(--color-lime)" strokeOpacity="0.45" strokeDasharray="3 5" />
      <text className="cover-label" x="24" y={cutY - 10} fill="var(--color-mute)" fontFamily="var(--font-mono)" fontSize="11" letterSpacing="0.06em">
        H — CUT
      </text>
      <text className="cover-label" x="24" y={BASE - 10} fill="var(--color-dim)" fontFamily="var(--font-mono)" fontSize="11" letterSpacing="0.06em">
        GROUND
      </text>
      {blades.map((b, i) => {
        const top = BASE - b.h * MAX_H
        return (
          <path
            key={i}
            className={b.h > 0.72 ? 'blade blade--tall' : 'blade'}
            d={`M${b.x},${BASE} Q${b.x},${(BASE + top) / 2} ${(b.x + b.lean).toFixed(1)},${top.toFixed(1)}`}
            fill="none"
            stroke="var(--color-paper)"
            strokeOpacity={0.3 + b.h * 0.5}
            strokeWidth="1.75"
            strokeLinecap="round"
            style={{ '--i': wide ? i * 0.6 : i, '--s': CUT / b.h, transformOrigin: `${b.x}px ${BASE}px` } as CSSProperties}
          />
        )
      })}
      <line
        className="sweeper"
        x1={x0 - 12}
        x2={x0 - 12}
        y1="52"
        y2={BASE + 14}
        stroke="var(--color-lime)"
        strokeWidth="1.5"
        style={{ '--sweep': `${x1 - x0 + 24}px` } as CSSProperties}
      />
    </svg>
  )
}

/** Fallback cover for future projects: stacked sine traces. */
function SignalArt() {
  const paths = [0, 1, 2, 3, 4].map((k) => {
    let d = ''
    for (let x = 0; x <= W; x += 4) {
      const y = 80 + k * 60 + Math.sin((x / W) * Math.PI * (2 + k * 1.5)) * (18 - k * 2)
      d += `${x === 0 ? 'M' : 'L'}${x},${y.toFixed(1)}`
    }
    return d
  })
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice">
      {paths.map((d, k) => (
        <path key={k} d={d} fill="none" stroke={k === 2 ? 'var(--color-lime)' : 'var(--color-paper)'} strokeOpacity={k === 2 ? 1 : 0.35} strokeWidth="1.5" />
      ))}
    </svg>
  )
}

export function CoverArt({ cover, wide = false }: { cover: Project['cover']; wide?: boolean }) {
  return cover === 'grass' ? <GrassArt wide={wide} /> : <SignalArt />
}
