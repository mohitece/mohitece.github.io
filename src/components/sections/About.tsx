import { profile } from '../../content/profile'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const facts = [
  { term: 'Studying', value: profile.degreeShort },
  { term: 'At', value: `${profile.schoolShort}, ${profile.universityShort}` },
  { term: 'Based in', value: profile.location },
  { term: 'Exploring', value: 'Python, DSA, data analytics' },
  { term: 'Also', value: 'Graphic design — IEEE & IETE' },
]

export function About() {
  const { about } = profile
  return (
    <section aria-labelledby="about-title" className="py-28 md:py-40" id="about">
      <div className="container-x">
        <SectionHeading index="01" label="About" id="about-title" aside="Engineer in training">
          Curious about what’s underneath.
        </SectionHeading>

        <div className="grid grid-cols-12 gap-x-6 gap-y-16">
          <div className="col-span-12 lg:col-span-7 lg:col-start-6 lg:row-start-1">
            <Reveal>
              <p className="lead text-paper">{about.lead}</p>
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-x-10">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 80} className={i === 2 ? 'md:col-span-2 md:max-w-[38rem]' : undefined}>
                  <p className="text-base/relaxed text-mute md:text-[1.0625rem]/relaxed">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="col-span-12 lg:col-span-4 lg:row-start-1">
            <dl className="border-t border-line">
              {facts.map((fact) => (
                <div key={fact.term} className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-line py-4">
                  <dt className="eyebrow pt-0.5">{fact.term}</dt>
                  <dd className="text-paper">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
