import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { profile } from '../../content/profile'
import { projects, projectStatusLabel } from '../../content/projects'
import type { Project } from '../../content/types'
import { CoverArt } from '../ui/CoverArt'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function Projects() {
  return (
    <section aria-labelledby="projects-title" className="py-28 md:py-40" id="projects">
      <div className="container-x">
        <SectionHeading index="03" label="Projects" id="projects-title" aside="Selected work">
          Ideas, taken off the page.
        </SectionHeading>

        <ol className="flex flex-col gap-16 md:gap-24">
          {projects.map((project, i) => (
            <li key={project.slug}>
              <Reveal>
                <ProjectCard project={project} index={i} />
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-16 md:mt-24">
          <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-mute">More projects will be added here as they’re documented.</p>
            <a href={profile.links.github} target="_blank" rel="noreferrer" className="cta self-start font-medium sm:self-auto">
              Code on GitHub — @{profile.links.githubHandle}
              <ArrowUpRight className="cta-arrow cta-arrow-ur size-4 text-lime" aria-hidden />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const number = String(index + 1).padStart(2, '0')
  const href = `#/work/${project.slug}`
  return (
    <article className="cover-group group relative grid grid-cols-12 gap-x-6 gap-y-8">
      {/* Cover */}
      <div className="relative col-span-12 overflow-hidden border border-line bg-ink-2 transition-colors duration-500 group-hover:border-line-strong lg:col-span-7">
        <div className="aspect-[16/10]">
          <CoverArt cover={project.cover} />
        </div>
        <p className="eyebrow absolute top-4 left-4">P—{number}</p>
        <p className="eyebrow absolute top-4 right-4 text-dim">Illustration · not to scale</p>
        <p className="eyebrow absolute bottom-4 left-4 hidden text-dim [@media(hover:hover)]:block">Hover to trim</p>
      </div>

      {/* Text */}
      <div className="col-span-12 flex flex-col lg:col-span-5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="eyebrow inline-flex items-center gap-2 border border-line-strong px-2.5 py-1 text-paper">
            <span aria-hidden="true" className="size-1.5 bg-lime" />
            {projectStatusLabel[project.status]}
          </span>
          {project.year && <span className="eyebrow">{project.year}</span>}
        </div>

        <h3 className="mt-6 text-[clamp(2.25rem,4.6vw,4rem)] leading-[0.95] font-medium tracking-[-0.045em] text-balance">
          <a href={href} className="outline-none after:absolute after:inset-0 after:content-[''] focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-lime">
            {project.title}
          </a>
        </h3>

        <p className="mt-6 max-w-md text-base/relaxed text-mute md:text-lg/relaxed">{project.summary}</p>

        <ul className="mt-8 flex flex-wrap gap-2" aria-label="Categories">
          {project.categories.map((c) => (
            <li key={c} className="eyebrow border border-line px-2.5 py-1">
              {c}
            </li>
          ))}
        </ul>

        <span aria-hidden="true" className="cta mt-auto self-start pt-10 text-lg font-medium group-hover:[background-size:100%_1px,100%_1px]">
          View project
          <ArrowRight className="cta-arrow size-5 text-lime transition-transform duration-500 group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  )
}
