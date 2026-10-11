import { Pause, Play } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const LIME = '#c8ff2e'
const PAPER = '237, 237, 230'
/** How far the waveform travels per second, as a fraction of the canvas width. */
const SPEED = 0.045
const MU_MAX = 1.5

/**
 * Hero visual: a live amplitude-modulation (AM) trace, drawn on canvas.
 *   s(t) = Ac · [1 + μ·cos(2π·fm·t)] · cos(2π·fc·t)
 * The sliders change the modulation index (μ) and the message frequency (fm).
 * Pushing μ past 1 shows over-modulation — the envelope folds through zero.
 *
 * Motion pauses off-screen, and starts paused for prefers-reduced-motion.
 */
export function SignalScope() {
  const figureRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawRef = useRef<() => void>(() => {})
  const tauRef = useRef(0)
  const paramsRef = useRef({ mu: 0.6, fm: 2 })

  const reduced = useReducedMotion()
  const [mu, setMu] = useState(0.6)
  const [fm, setFm] = useState(2)
  const [userPaused, setUserPaused] = useState<boolean | null>(null)
  const paused = userPaused ?? reduced
  const muId = useId()
  const fmId = useId()

  // Canvas setup, sizing and the draw routine.
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    let w = 0
    let h = 0

    const draw = () => {
      const { mu, fm } = paramsRef.current
      const tau = tauRef.current
      ctx.clearRect(0, 0, w, h)
      if (w === 0 || h === 0) return

      // Graticule
      const cols = 10
      const rows = 4
      ctx.lineWidth = 1
      ctx.setLineDash([])
      ctx.strokeStyle = `rgba(${PAPER}, 0.055)`
      ctx.beginPath()
      for (let i = 1; i < cols; i++) {
        const x = Math.round((w * i) / cols) + 0.5
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
      }
      for (let j = 1; j < rows; j++) {
        const y = Math.round((h * j) / rows) + 0.5
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
      }
      ctx.stroke()

      const mid = Math.round(h / 2) + 0.5
      ctx.strokeStyle = `rgba(${PAPER}, 0.14)`
      ctx.beginPath()
      ctx.moveTo(0, mid)
      ctx.lineTo(w, mid)
      const tick = w / (cols * 5)
      for (let x = tick; x < w; x += tick) {
        const px = Math.round(x) + 0.5
        ctx.moveTo(px, mid - 2.5)
        ctx.lineTo(px, mid + 2.5)
      }
      ctx.stroke()

      const fc = Math.max(16, Math.min(60, Math.round(w / 22)))
      const amp = (h / 2 - 6) / (1 + MU_MAX)
      const env = (x: number) => 1 + mu * Math.cos(2 * Math.PI * fm * (x / w - tau))

      // Envelope (dashed)
      ctx.setLineDash([2, 4])
      ctx.strokeStyle = `rgba(${PAPER}, 0.34)`
      ctx.beginPath()
      for (let x = 0; x <= w; x += 2) {
        const y = mid - amp * env(x)
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      for (let x = 0; x <= w; x += 2) {
        const y = mid + amp * env(x)
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
      ctx.setLineDash([])

      // Modulated carrier
      ctx.beginPath()
      for (let x = 0; x <= w; x += 0.75) {
        const t = x / w - tau
        const y = mid - amp * env(x) * Math.cos(2 * Math.PI * fc * t)
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.lineJoin = 'round'
      ctx.strokeStyle = 'rgba(200, 255, 46, 0.12)'
      ctx.lineWidth = 5
      ctx.stroke()
      ctx.strokeStyle = LIME
      ctx.lineWidth = 1.35
      ctx.stroke()
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw()
    }

    drawRef.current = draw
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()
    return () => ro.disconnect()
  }, [])

  // Redraw immediately when the controls change (matters while paused).
  useEffect(() => {
    paramsRef.current = { mu, fm }
    drawRef.current()
  }, [mu, fm])

  // Animation loop — only while playing and on screen.
  useEffect(() => {
    const figure = figureRef.current
    if (paused || !figure) return
    let raf = 0
    let last = 0

    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 64) / 1000 : 0
      last = now
      tauRef.current = (tauRef.current + dt * SPEED) % 1000
      drawRef.current()
      raf = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf)
      if (entry.isIntersecting) {
        last = 0
        raf = requestAnimationFrame(tick)
      }
    })
    observer.observe(figure)
    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [paused])

  const over = mu > 1

  return (
    <figure ref={figureRef} className="relative">
      <div className="flex items-center justify-between gap-4 border-t border-line py-3">
        <p className="eyebrow">
          <span className="text-lime">CH1</span>
          <span className="mx-2 text-dim">/</span>
          Amplitude modulation
        </p>
        <p className="hidden font-mono text-xs text-mute md:block" aria-hidden="true">
          s(t) = A<sub>c</sub>[1 + μ·cos 2πf<sub>m</sub>t]·cos 2πf<sub>c</sub>t
        </p>
      </div>

      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="block h-28 w-full [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] sm:h-32 lg:h-36"
      />

      <figcaption className="sr-only">
        Interactive illustration of amplitude modulation: a high-frequency carrier wave whose amplitude follows a
        slower message signal. Use the sliders to change the modulation index and the message frequency.
      </figcaption>

      <div className="grid grid-cols-[1fr_1fr_auto] items-center gap-x-5 border-b border-line sm:gap-x-8">
        <div className="flex min-w-0 items-center gap-3">
          <label htmlFor={muId} className="eyebrow shrink-0 normal-case">
            μ <output htmlFor={muId} className={over ? 'text-lime' : 'text-paper'}>{mu.toFixed(2)}</output>
          </label>
          <input
            id={muId}
            type="range"
            min={0}
            max={MU_MAX}
            step={0.05}
            value={mu}
            onChange={(e) => setMu(Number(e.target.value))}
            className="fader w-full min-w-0"
            aria-describedby={over ? `${muId}-note` : undefined}
          />
        </div>
        <div className="flex min-w-0 items-center gap-3">
          <label htmlFor={fmId} className="eyebrow shrink-0 normal-case">
            f<sub>m</sub> <output htmlFor={fmId} className="text-paper">{fm.toFixed(1)}</output>
          </label>
          <input
            id={fmId}
            type="range"
            min={0.5}
            max={5}
            step={0.5}
            value={fm}
            onChange={(e) => setFm(Number(e.target.value))}
            className="fader w-full min-w-0"
          />
        </div>
        <button
          type="button"
          onClick={() => setUserPaused(!paused)}
          className="-mr-2 grid size-11 place-items-center text-mute transition-colors hover:text-lime"
          aria-label={paused ? 'Play waveform animation' : 'Pause waveform animation'}
        >
          {paused ? <Play className="size-4" aria-hidden /> : <Pause className="size-4" aria-hidden />}
        </button>
      </div>
      <p
        id={`${muId}-note`}
        className={`absolute right-0 -bottom-7 font-mono text-[0.6875rem] text-lime transition-opacity duration-300 ${over ? 'opacity-100' : 'opacity-0'}`}
        aria-live="polite"
      >
        {over ? 'μ > 1 — over-modulated: the envelope folds through zero' : ''}
      </p>
    </figure>
  )
}
