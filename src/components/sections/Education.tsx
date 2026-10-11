import { ArrowUpRight } from 'lucide-react'
import { education, learning, learningStatusLabel } from '../../content/education'
import { cn } from '../../lib/cn'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { Todo } from '../ui/Todo'

export function Education() {
  return (
    <section aria-labelledby="education-title" className="py-28 md:py-40" id="education">
      <div className="container-x">
        <SectionHeading index="05" label="Education & learning" id="education-title" aside="Foundations">
          Foundations first.
        </SectionHeading>

        <div className="grid grid-cols-12 gap-x-6 gap-y-16">
          {/* Formal education */}
          <div className="col-span-12 lg:col-span-7">
            <h3 className="eyebrow text-paper">Degree</h3>
            <ol className="mt-6">
              {education.map((item) => (
                <li key={item.title} className="relative border-l border-line-strong pb-2 pl-8 md:pl-10">
                  <span aria-hidden="true" className="absolute top-2 -left-[5px] size-[9px] bg-lime" />
                  <Reveal>
                    <p className="eyebrow flex flex-wrap gap-x-3">
                      <span className="text-lime">{item.status}</span>
                      {item.period && <span>{item.period}</span>}
                    </p>
                    <p className="mt-4 text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.02] font-medium tracking-[-0.04em] text-balance">
                      {item.title}
                    </p>
                    <p className="mt-4 text-mute">
                      {item.institution}
                      {item.location && <span>, {item.location}</span>}
                    </p>
                    {item.details && <p className="mt-4 text-mute">{item.details}</p>}

                    {item.coursework.length > 0 && (
                      <div className="mt-10">
                        <p className="eyebrow">
                          Relevant coursework <span className="text-dim">— studied, distinct from project work</span>
                        </p>
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {item.coursework.map((c) => (
                            <li key={c} className="border border-line px-3 py-2 text-sm text-paper">
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="mt-6 space-y-2">
                      {!item.period && <Todo file="src/content/education.ts → period">Add your batch, e.g. “2023 — 2027”.</Todo>}
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>

          {/* Self-directed learning */}
          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <h3 className="eyebrow text-paper">Learning</h3>
            <ul className="mt-6 border-t border-line">
              {learning.map((item) => (
                <li key={item.title} className="border-b border-line py-6">
                  <Reveal>
                    <p className="eyebrow flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className={cn(
                          'size-2',
                          item.status === 'completed' && 'bg-lime',
                          item.status === 'in-progress' && 'border border-lime',
                          item.status === 'interested' && 'border border-dashed border-mute',
                        )}
                      />
                      <span className={item.status === 'completed' ? 'text-lime' : 'text-paper'}>{learningStatusLabel[item.status]}</span>
                    </p>
                    <p className="mt-4 text-xl leading-snug font-medium tracking-[-0.02em]">{item.title}</p>
                    <p className="mt-2 text-sm text-mute">{item.provider}</p>
                    {item.note && <p className="mt-3 text-sm text-mute">{item.note}</p>}
                    {item.status === 'completed' && item.credentialUrl && (
                      <a href={item.credentialUrl} target="_blank" rel="noreferrer" className="cta mt-4 text-sm font-medium">
                        View credential
                        <ArrowUpRight className="cta-arrow cta-arrow-ur size-4 text-lime" aria-hidden />
                      </a>
                    )}
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
