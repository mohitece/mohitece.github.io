import { ArrowDownRight } from 'lucide-react'
import type { CSSProperties } from 'react'
import { profile } from '../../content/profile'
import { withAccent } from '../../lib/accent'
import { asset } from '../../lib/cn'
import { SignalScope } from '../ui/SignalScope'

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties

export function Hero() {
  const { hero, portrait } = profile

  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-28 md:pt-32">
      {/* Atmosphere: a low lime glow from the top right. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-[30%] right-[-20%] h-[90vh] w-[80vw] bg-[radial-gradient(closest-side,rgb(200_255_46/0.09),transparent)]" />
      </div>

      <div className="container-x grid flex-1 grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-12 flex flex-col lg:col-span-8">
          <p className="eyebrow fade-in" style={delay(80)}>
            <span className="text-lime">●</span>
            <span className="ml-3 hidden sm:inline">{hero.eyebrow}</span>
            <span className="ml-3 sm:hidden">{hero.eyebrowShort}</span>
          </p>

          <h1 id="hero-title" className="display mt-7 md:mt-9">
            <span className="sr-only">{profile.name} — </span>
            {hero.headline.map((line, i) => (
              <span key={line} className="rise-line">
                <span style={delay(140 + i * 110)}>{withAccent(line, hero.accent)}</span>{' '}
              </span>
            ))}
          </h1>

          <div className="mt-10 max-w-[34rem] md:mt-14">
            <p className="fade-in text-lg/relaxed text-mute md:text-xl/relaxed" style={delay(420)}>
              {hero.intro}
            </p>
            <div className="fade-in mt-9 flex flex-wrap gap-x-10 gap-y-3" style={delay(520)}>
              <a href="#projects" className="cta text-lg font-medium">
                Explore My Work
                <ArrowDownRight className="cta-arrow size-5 text-lime" aria-hidden />
              </a>
              <a href="#contact" className="cta text-lg font-medium text-mute hover:text-paper">
                Get In Touch
                <ArrowDownRight className="cta-arrow size-5" aria-hidden />
              </a>
            </div>
          </div>
        </div>

        <figure className="fade-in col-span-12 sm:col-span-8 sm:col-start-3 md:col-span-6 md:col-start-4 lg:col-span-4 lg:col-start-9 lg:mt-3" style={delay(300)}>
          <div className="relative">
            <span className="reg -top-1.5 -left-1.5" />
            <span className="reg -top-1.5 -right-1.5" />
            <span className="reg -bottom-1.5 -left-1.5" />
            <span className="reg -right-1.5 -bottom-1.5" />
            <div className="overflow-hidden bg-ink-3">
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${asset(portrait.src480)} 480w, ${asset(portrait.src768)} 768w`}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 60vw, 92vw"
                />
                <img
                  src={asset(portrait.fallback)}
                  alt={portrait.alt}
                  width={portrait.width}
                  height={portrait.height}
                  fetchPriority="high"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover object-[50%_20%]"
                />
              </picture>
            </div>
          </div>
          <figcaption className="eyebrow mt-4 flex justify-between gap-4">
            <span>
              <span className="text-lime">Fig. 01</span> — {profile.name}
            </span>
            <span>
              {profile.degreeShort} / {profile.schoolShort}
            </span>
          </figcaption>
        </figure>
      </div>

      <div className="container-x fade-in mt-16 lg:mt-12" style={delay(650)}>
        <SignalScope />
      </div>

      <div className="container-x hidden items-end justify-between pt-12 pb-8 sm:flex">
        <a href="#about" className="group eyebrow flex items-center gap-4 hover:text-paper" aria-label="Scroll to About section">
          <span aria-hidden="true" className="scroll-cue relative block h-10 w-px overflow-hidden bg-line-strong" />
          Scroll
        </a>
        <p className="eyebrow hidden sm:block">{profile.degreeShort} — Portfolio</p>
      </div>
    </section>
  )
}
