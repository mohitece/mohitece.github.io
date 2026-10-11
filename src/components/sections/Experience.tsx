import { ArrowUpRight } from 'lucide-react'
import { involvements } from '../../content/experience'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { Todo } from '../ui/Todo'

export function Experience() {
  return (
    <section aria-labelledby="experience-title" className="py-28 md:py-40" id="experience">
      <div className="container-x">
        <SectionHeading index="04" label="Experience" id="experience-title" aside="Student involvement">
          Design, for engineers.
        </SectionHeading>

        <ol className="border-b border-line">
          {involvements.map((item, i) => {
            const dates = [item.start, item.end].filter(Boolean).join(' — ')
            return (
              <li key={item.org} className="group border-t border-line">
                <Reveal delay={i * 60} className="grid grid-cols-12 gap-x-6 gap-y-6 py-10 md:py-14">
                  <p
                    aria-hidden="true"
                    className="col-span-12 text-[clamp(4.5rem,13vw,10rem)] leading-[0.8] font-medium tracking-[-0.06em] text-paper/[0.14] transition-colors duration-700 ease-out-expo group-hover:text-lime md:col-span-5"
                  >
                    {item.org}
                  </p>

                  <div className="col-span-12 md:col-span-7 lg:col-span-6 lg:col-start-7">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                      <h3 className="text-2xl font-medium tracking-[-0.03em] md:text-3xl">
                        {item.role}
                        <span className="text-mute"> · {item.org}</span>
                      </h3>
                      {dates && <p className="eyebrow">{dates}</p>}
                    </div>
                    <p className="eyebrow mt-3">
                      {item.orgFull}
                      {item.chapter && <span className="text-paper"> — {item.chapter}</span>}
                    </p>
                    <p className="mt-6 text-base/relaxed text-mute md:text-lg/relaxed">{item.summary}</p>

                    {item.responsibilities.length > 0 && (
                      <ul className="mt-6 space-y-3">
                        {item.responsibilities.map((r) => (
                          <li key={r} className="flex gap-3 text-mute">
                            <span aria-hidden="true" className="mt-[0.6em] size-1 shrink-0 bg-lime" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    )}

                    {item.work.length > 0 && (
                      <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
                        {item.work.map((w) => (
                          <li key={w.href}>
                            <a href={w.href} target="_blank" rel="noreferrer" className="cta font-medium">
                              {w.label}
                              <ArrowUpRight className="cta-arrow cta-arrow-ur size-4 text-lime" aria-hidden />
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="mt-6 space-y-2">
                      {!dates && <Todo file="src/content/experience.ts → start / end">Add dates for {item.org} (or leave hidden).</Todo>}
                      {!item.chapter && <Todo file="src/content/experience.ts → chapter">Add the chapter, e.g. “{item.org} Student Branch, USICT”.</Todo>}
                      {item.responsibilities.length === 0 && (
                        <Todo file="src/content/experience.ts → responsibilities">List 2–4 things you designed or were responsible for.</Todo>
                      )}
                      {item.work.length === 0 && <Todo file="src/content/experience.ts → work">Link real design samples (Behance, Drive, Instagram).</Todo>}
                    </div>
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
