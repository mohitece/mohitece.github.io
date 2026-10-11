/**
 * Shared content types. You normally won't need to edit this file —
 * edit the data files next to it instead (profile.ts, skills.ts, ...).
 *
 * Convention: a field set to `null` (or an empty array) means "not provided yet".
 * Empty fields are hidden on the live site, and shown as dashed TODO boxes
 * only while you run `npm run dev`, so you can see what is still missing.
 */

export interface Link {
  label: string
  href: string
}

/** Honest proficiency labels — no percentages, no star ratings. */
export type SkillLevel = 'project' | 'familiar' | 'coursework' | 'learning' | 'interest'

export interface Skill {
  name: string
  level: SkillLevel
  /** Short, factual context, e.g. "B.Tech ECE coursework". */
  note?: string | null
}

export interface SkillGroup {
  id: string
  title: string
  skills: Skill[]
}

export type ProjectStatus = 'completed' | 'in-progress' | 'documenting'

export interface ProjectMedia {
  /** Path inside /public, e.g. "images/projects/grass-cutter/prototype.webp" */
  src: string
  alt: string
  caption?: string
  kind: 'photo' | 'diagram' | 'screenshot'
}

export interface Project {
  /** Used in the URL: #/work/<slug> */
  slug: string
  title: string
  /** One-line description shown on the project card. */
  summary: string
  /** e.g. ["Automation", "Electronics"] */
  categories: string[]
  status: ProjectStatus
  /** e.g. "2025". Leave null rather than guessing. */
  year: string | null
  /** Team or individual? e.g. "Team project — 4 members" */
  context: string | null
  /** Your role in one line, e.g. "Circuit design & testing" */
  role: string | null
  /** Which cover illustration to draw on the card. */
  cover: 'grass' | 'signal'

  overview: string | null
  problem: string | null
  contribution: string[]
  hardware: { name: string; purpose?: string }[]
  technologies: string[]
  howItWorks: { title: string; description: string }[]
  challenges: { challenge: string; solution: string }[]
  media: ProjectMedia[]
  links: {
    repo: string | null
    demo: string | null
    report: string | null
  }
}

export interface Involvement {
  /** Short name shown large, e.g. "IEEE" */
  org: string
  orgFull: string
  /** e.g. "IEEE Student Branch, USICT" — only once confirmed */
  chapter: string | null
  role: string
  /** e.g. "Aug 2024". Omit (null) instead of guessing. */
  start: string | null
  /** e.g. "Present" or "May 2025" */
  end: string | null
  summary: string
  responsibilities: string[]
  /** Links to design work (Behance, Drive folder, Instagram post, ...) */
  work: Link[]
}

export type LearningStatus = 'interested' | 'in-progress' | 'completed'

export interface EducationItem {
  title: string
  institution: string
  location: string | null
  /** e.g. "2023 — 2027". Leave null rather than guessing. */
  period: string | null
  /** e.g. "Currently pursuing" or "3rd year" */
  status: string
  coursework: string[]
  details: string | null
}

export interface LearningItem {
  title: string
  provider: string
  status: LearningStatus
  /** Shown only when status is "completed". */
  credentialUrl: string | null
  note: string | null
}
