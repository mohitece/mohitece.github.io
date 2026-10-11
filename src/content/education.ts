import type { EducationItem, LearningItem, LearningStatus } from './types'

/**
 * ─────────────────────────────────────────────────────────────
 *  EDUCATION & LEARNING
 *  Change `status` here and it updates everywhere on the site.
 * ─────────────────────────────────────────────────────────────
 */

export const education: EducationItem[] = [
  {
    title: 'B.Tech, Electronics & Communication Engineering',
    institution: 'University School of Information, Communication & Technology (USICT), GGSIPU',
    location: 'New Delhi',
    period: null, // TODO: e.g. '2023 — 2027'
    status: 'Currently pursuing', // TODO: e.g. '3rd year — currently pursuing'
    // Subjects studied in the curriculum — NOT the same as project experience.
    // TODO: confirm and extend with the subjects you have completed.
    coursework: ['Circuit Analysis', 'Analog Electronics', 'Communication Systems'],
    details: null, // TODO (optional): CGPA, electives, etc. Only if you want them shown.
  },
]

export const learning: LearningItem[] = [
  {
    title: 'Google Data Analytics Professional Certificate',
    provider: 'Google',
    // 'interested' → 'in-progress' → 'completed'. Only mark completed when it is.
    status: 'interested',
    credentialUrl: null, // TODO: add the Coursera/Credly link once completed
    note: null,
  },
]

export const learningStatusLabel: Record<LearningStatus, string> = {
  interested: 'Learning interest',
  'in-progress': 'In progress',
  completed: 'Completed',
}
