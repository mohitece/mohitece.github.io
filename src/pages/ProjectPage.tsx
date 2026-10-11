import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { projects, projectStatusLabel } from '../content/projects'
import type { Project } from '../content/types'
import { asset, cn } from '../lib/cn'
import { CoverArt } from '../components/ui/CoverArt'
import { Reveal } from '../components/ui/Reveal'
import { Todo } from '../components/ui/Todo'

const FILE = 'src/content/projects.ts'

interface Block {
  id: string
  title: string
  filled: boolean
  todo: string
  body: () => ReactNode
}

export function ProjectPage({ project }: { project: Project }) {
  const index = projects.indexOf(project)
  const next = projects.length > 1 ? projects[(index + 1) % projects.length] : null
  const { links } = project

  const meta = [
    { label: 'Status', value: projectStatusLabel[project.status], key: 'status' },
    { label: 'Year', value: project.year, key: 'year' },
    { label: 'Context', value: project.context, key: 'context' },
    { label: 'My role', value: project.role, key: 'role' },
  ]

  const linkList = [
    links.repo && { label: 'Source code', href: links.repo },
    links.demo && { label: 'Demo', href: links.demo },
    links.report && { label: 'Project report', href: asset(links.report) },
  ].filter((l): l is { label: string; href: string } => Boolean(l))

  const blocks: Block[] = [
    {
      id: 'overview',
      title: 'Overview',
      filled: Boolean(project.overview),
      todo: 'Describe the project in 2–3 sentences.',
      body: () => <p className="lead text-paper">{project.overview}</p>,
    },
    {
      id: 'problem',
      title: 'The problem',
      filled: Boolean(project.problem),
      todo: 'What problem does it address, and for whom?',
      body: () => <p className="text-lg/relaxed text-mute">{project.problem}</p>,
    },
    {
      id: 'contribution',
      title: 'My contribution',
      filled: project.contribution.length > 0,
      todo: 'List what you personally did (design, wiring, code, testing…).',
      body: () => <Bullets items={project.contribution} />,
    },
    {
      id: 'hardware',
      title: 'Hardware',
      filled: project.hardware.length > 0,
      todo: 'List only the components you actually used, with their purpose.',
      body: () => (
        <dl className="border-t border-line">
          {project.hardware.map((h) => (
            <div key={h.name} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[minmax(0,16rem)_1fr] sm:gap-6">
              <dt className="font-medium">{h.name}</dt>
              <dd className="text-mute">{h.purpose}</dd>
            </div>
          ))}
        </dl>
      ),
    },
    {
      id: 'technologies',
      title: 'Technologies',
      filled: project.technologies.length > 0,
      todo: 'Languages, tools and software used (e.g. Arduino C++, Proteus).',
      body: () => (
        <ul className="flex flex-wrap gap-2">
          {project.technologies.map((t) => (
            <li key={t} className="border border-line px-3 py-2 text-sm">
              {t}
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: 'how-it-works',
      title: 'How it works',
      filled: project.howItWorks.length > 0,
      todo: 'Explain the system in 3–5 steps (input → processing → output).',
      body: () => (
        <ol className="grid gap-px bg-line sm:grid-cols-2">
          {project.howItWorks.map((step, i) => (
            <li key={step.title} className="bg-ink p-6">
              <p className="font-mono text-xs text-lime">{String(i + 1).padStart(2, '0')}</p>
              <p className="mt-4 text-xl font-medium tracking-[-0.02em]">{step.title}</p>
              <p className="mt-2 text-mute">{step.description}</p>
            </li>
          ))}
        </ol>
      ),
    },
    {
      id: 'challenges',
      title: 'Challenges & solutions',
      filled: project.challenges.length > 0,
      todo: 'What went wrong, and how you fixed it.',
      body: () => (
        <ul className="border-t border-line">
          {project.challenges.map((c) => (
            <li key={c.challenge} className="grid gap-3 border-b border-line py-6 md:grid-cols-2 md:gap-10">
              <p>
                <span className="eyebrow block">Challenge</span>
                <span className="mt-2 block">{c.challenge}</span>
              </p>
              <p>
                <span className="eyebrow block text-lime">Solution</span>
                <span className="mt-2 block text-mute">{c.solution}</span>
              </p>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: 'gallery',
      title: 'Images & diagrams',
      filled: project.media.length > 0,
      todo: 'Add real photos / circuit diagrams to public/images/projects/<slug>/.',
      body: () => (
        <div className="grid gap-6 sm:grid-cols-2">
          {project.media.map((m) => (
            <figure key={m.src}>
              <img src={asset(m.src)} alt={m.alt} loading="lazy" decoding="async" className="w-full border border-line bg-ink-2" />
              {m.caption && <figcaption className="eyebrow mt-3">{m.caption}</figcaption>}
            </figure>
          ))}
        </div>
      ),
    },
    {
      id: 'links',
      title: 'Links',
      filled: linkList.length > 0,
      todo: 'Add a GitHub repo, demo video or report in links.',
      body: () => (
        <ul className="flex flex-wrap gap-x-10 gap-y-3">
          {linkList.map((l) => (
            <li key={l.label}>
              <a href={l.href} target="_blank" rel="noreferrer" className="cta text-lg font-medium">
                {l.label}
                <ArrowUpRight className="cta-arrow cta-arrow-ur size-5 text-lime" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      ),
    },
  ]

  const visible = blocks.filter((b) => b.filled)
  const [trimmed, setTrimmed] = useState(false)

  return (
    <article className="pt-28 pb-24 md:pt-36" aria-labelledby="page-title">
      <div className="container-x">
        <a href="#projects" className="eyebrow group inline-flex min-h-11 items-center gap-2 hover:text-paper">
          <ArrowLeft className="size-3.5 transition-transform duration-500 ease-out-expo group-hover:-translate-x-1" aria-hidden />
          All projects
        </a>

        <p className="eyebrow fade-in mt-10">
          <span className="text-lime">P—{String(index + 1).padStart(2, '0')}</span>
          <span className="mx-3 text-dim">/</span>
          {project.categories.join(' · ')}
        </p>
        <h1 id="page-title" tabIndex={-1} className="display mt-6 max-w-[12ch] outline-none">
          <span className="rise-line">
            <span>{project.title}</span>
          </span>
        </h1>

        <dl className="fade-in mt-14 grid grid-cols-2 border-t border-line md:grid-cols-4" style={{ animationDelay: '200ms' }}>
          {meta.map((m) => (
            <div key={m.key} className={cn('border-b border-line py-5 pr-4', !m.value && !import.meta.env.DEV && 'hidden')}>
              <dt className="eyebrow">{m.label}</dt>
              <dd className="mt-2 text-paper">{m.value ?? <Todo file={`${FILE} → ${m.key}`}>Add {m.label.toLowerCase()}.</Todo>}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="container-x mt-12 md:mt-16">
        <div className={cn('cover-group relative overflow-hidden border border-line bg-ink-2', trimmed && 'cover-trimmed')}>
          <div className="aspect-[16/10] md:aspect-[2.8/1]">
            <CoverArt cover={project.cover} wide />
          </div>
          <p className="eyebrow absolute top-4 right-4 text-dim">Illustration · not to scale</p>
          <button
            type="button"
            className="eyebrow absolute top-2 left-4 min-h-11 px-0 text-paper [@media(hover:hover)]:hidden"
            aria-pressed={trimmed}
            onClick={() => setTrimmed((t) => !t)}
          >
            {trimmed ? 'Let it grow' : 'Tap to trim'}
          </button>
        </div>
      </div>

      <div className="container-x mt-20 grid grid-cols-12 gap-x-6 md:mt-28">
        {visible.length > 1 && (
          <nav aria-label="On this page" className="col-span-12 mb-12 lg:col-span-3 lg:mb-0">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow">On this page</p>
              <ol className="mt-4 flex flex-wrap gap-x-5 gap-y-1 lg:flex-col">
                {visible.map((b) => (
                  <li key={b.id}>
                    <a
                      href={`#/work/${project.slug}`}
                      onClick={(e) => {
                        e.preventDefault()
                        document.getElementById(`s-${b.id}`)?.scrollIntoView({ block: 'start' })
                      }}
                      className="u-link inline-flex min-h-9 items-center text-sm text-mute hover:text-paper"
                    >
                      {b.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
        )}

        <div className="col-span-12 flex flex-col gap-20 lg:col-span-8 lg:col-start-5 md:gap-24">
          {project.status === 'documenting' && (
            <Reveal>
              <div className="flex gap-4 border border-line-strong bg-ink-2 p-5 md:p-6">
                <span aria-hidden="true" className="pulse-dot mt-1.5 size-2 shrink-0 rounded-full bg-lime" />
                <p className="text-mute">
                  <span className="text-paper">This write-up is in progress.</span> Build details, hardware, photos and
                  lessons learned will be added here as they’re documented.
                </p>
              </div>
            </Reveal>
          )}

          {blocks.map((b) =>
            b.filled ? (
              <section key={b.id} id={`s-${b.id}`} aria-labelledby={`h-${b.id}`} className="scroll-mt-28">
                <Reveal>
                  <h2 id={`h-${b.id}`} className="eyebrow mb-6 border-t border-line pt-4 text-paper">
                    {b.title}
                  </h2>
                  {b.body()}
                </Reveal>
              </section>
            ) : (
              <Todo key={b.id} file={`${FILE} → ${b.id}`}>
                {b.title}: {b.todo}
              </Todo>
            ),
          )}
        </div>
      </div>

      <div className="container-x mt-28 md:mt-36">
        <div className="flex flex-col gap-6 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <a href="#projects" className="cta text-lg font-medium">
            <ArrowLeft className="size-5 text-lime" aria-hidden />
            Back to all work
          </a>
          {next ? (
            <a href={`#/work/${next.slug}`} className="cta text-lg font-medium">
              Next: {next.title}
              <ArrowRight className="cta-arrow size-5 text-lime" aria-hidden />
            </a>
          ) : (
            <a href="#contact" className="cta text-lg font-medium">
              Questions about this project? Get in touch
              <ArrowRight className="cta-arrow size-5 text-lime" aria-hidden />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item} className="flex gap-4 text-lg/relaxed text-mute">
          <span aria-hidden="true" className="mt-[0.7em] size-1.5 shrink-0 bg-lime" />
          {item}
        </li>
      ))}
    </ul>
  )
}

export function NotFound() {
  return (
    <div className="container-x flex min-h-[80svh] flex-col justify-center pt-28">
      <p className="eyebrow text-lime">404 — no signal</p>
      <h1 id="page-title" tabIndex={-1} className="title mt-6 outline-none">
        That project doesn’t exist (yet).
      </h1>
      <a href="#projects" className="cta mt-10 self-start text-lg font-medium">
        <ArrowLeft className="size-5 text-lime" aria-hidden />
        See all projects
      </a>
    </div>
  )
}
