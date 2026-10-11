import { useState, type ReactNode } from 'react'
import { skillGroups, skillLevels } from '../../content/skills'
import type { SkillLevel } from '../../content/types'
import { cn } from '../../lib/cn'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { SkillGlyph } from '../ui/SkillGlyph'

const allSkills = skillGroups.flatMap((g) => g.skills)
const levelsInUse = (Object.keys(skillLevels) as SkillLevel[]).filter((level) => allSkills.some((s) => s.level === level))

export function Skills() {
  const [filter, setFilter] = useState<SkillLevel | null>(null)

  return (
    <section aria-labelledby="skills-title" className="py-28 md:py-40" id="skills">
      <div className="container-x">
        <SectionHeading index="02" label="Skills" id="skills-title" aside="Honest labels, no percentages">
          What I know — and what I’m still learning.
        </SectionHeading>

        {/* Legend doubles as a filter. */}
        <Reveal>
          <div className="flex flex-col gap-5 border-y border-line py-5 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-md text-sm/relaxed text-mute">
              Each item says how I actually know it — from a project, from coursework, or because I’m learning it now.
              Select a label to filter.
            </p>
            <div role="group" aria-label="Filter skills by level" className="-mx-2 flex flex-wrap gap-1">
              <FilterButton active={filter === null} onClick={() => setFilter(null)}>
                All <span className="text-dim">{allSkills.length}</span>
              </FilterButton>
              {levelsInUse.map((level) => (
                <FilterButton key={level} active={filter === level} onClick={() => setFilter(filter === level ? null : level)}>
                  <SkillGlyph level={level} />
                  {skillLevels[level].label}
                  <span className="text-dim">{allSkills.filter((s) => s.level === level).length}</span>
                </FilterButton>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-x-6 gap-y-14 md:grid-cols-2 xl:grid-cols-4">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.id} delay={gi * 70}>
              <h3 className="flex items-baseline justify-between">
                <span className="eyebrow">
                  <span className="text-lime" aria-hidden="true">
                    {String(gi + 1).padStart(2, '0')}
                  </span>
                  <span className="ml-3 text-paper">{group.title}</span>
                </span>
              </h3>
              <ul className="mt-5 border-t border-line-strong">
                {group.skills.map((skill) => {
                  const dimmed = filter !== null && skill.level !== filter
                  return (
                    <li
                      key={skill.name}
                      className={cn(
                        'group border-b border-line py-5 transition-opacity duration-500',
                        dimmed ? 'opacity-25' : 'opacity-100',
                      )}
                    >
                      <p className="text-[1.375rem] leading-tight font-medium tracking-[-0.025em] transition-colors duration-300 group-hover:text-lime">
                        {skill.name}
                      </p>
                      <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="eyebrow flex items-center gap-2 text-paper">
                          <SkillGlyph level={skill.level} />
                          {skillLevels[skill.level].label}
                        </span>
                        {skill.note && <span className="text-sm text-dim">{skill.note}</span>}
                      </p>
                    </li>
                  )
                })}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function FilterButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'eyebrow flex min-h-11 items-center gap-2 border px-3 transition-colors duration-300',
        active ? 'border-line-strong bg-ink-3 text-paper' : 'border-transparent hover:text-paper',
      )}
    >
      {children}
    </button>
  )
}
