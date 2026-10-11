import type { SkillGroup, SkillLevel } from './types'

/**
 * ─────────────────────────────────────────────────────────────
 *  SKILLS — be honest with the level; it builds trust.
 *
 *  project     → used in a completed project
 *  familiar    → used comfortably, outside of a project
 *  coursework  → studied formally in the B.Tech curriculum
 *  learning    → actively learning right now
 *  interest    → exploring / want to go deeper; no claim of experience
 *
 *  Promote an item (e.g. 'interest' → 'project') once you can point to work.
 * ─────────────────────────────────────────────────────────────
 */

export const skillLevels: Record<SkillLevel, { label: string; description: string }> = {
  project: { label: 'Project experience', description: 'Used in real project work' },
  familiar: { label: 'Familiar with', description: 'Comfortable using it' },
  coursework: { label: 'Coursework', description: 'Studied in the B.Tech curriculum' },
  learning: { label: 'Learning', description: 'Actively learning now' },
  interest: { label: 'Interest', description: 'Exploring — no claim of experience yet' },
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'programming',
    title: 'Programming',
    skills: [
      { name: 'Python', level: 'familiar', note: null },
      { name: 'Data Structures & Algorithms', level: 'learning', note: null },
    ],
  },
  {
    id: 'electronics',
    title: 'Electronics',
    skills: [
      // TODO: confirm these match the subjects you have studied so far.
      { name: 'Circuit Analysis', level: 'coursework', note: 'B.Tech ECE' },
      { name: 'Analog Electronics', level: 'coursework', note: 'B.Tech ECE' },
      { name: 'Communication Systems', level: 'coursework', note: 'Incl. analog communication' },
      // TODO: change to 'project' once the grass-cutter write-up confirms this.
      { name: 'Embedded Systems', level: 'interest', note: null },
      { name: 'Automation', level: 'interest', note: null },
    ],
  },
  {
    id: 'data',
    title: 'Data',
    skills: [
      // TODO: list specific tools (e.g. spreadsheets, SQL, Tableau, R) once confirmed.
      { name: 'Data Analytics', level: 'learning', note: null },
    ],
  },
  {
    id: 'creative',
    title: 'Creative',
    skills: [{ name: 'Graphic Design', level: 'project', note: 'Design work with IEEE & IETE' }],
  },
]
