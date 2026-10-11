import type { Project } from './types'

/**
 * ─────────────────────────────────────────────────────────────
 *  PROJECTS — newest or strongest first.
 *
 *  To add a project: copy the object below, change the slug, fill in what
 *  you can, and leave the rest as null / []. Empty sections stay hidden on
 *  the live site. Never add components or results you didn't actually use.
 *
 *  Images: put them in /public/images/projects/<slug>/ and reference them as
 *  'images/projects/<slug>/<file>.webp' in `media`.
 * ─────────────────────────────────────────────────────────────
 */

export const projects: Project[] = [
  {
    slug: 'automatic-grass-cutter',
    title: 'Automatic Grass Cutter',
    summary: 'An engineering project exploring how a routine manual task — cutting grass — can be handed over to an automated machine.',
    categories: ['Automation', 'Electronics'],
    // TODO: switch to 'completed' (or 'in-progress') once confirmed.
    status: 'documenting',
    year: null, // TODO: e.g. '2025'
    context: null, // TODO: e.g. 'Team project — 4 members' or 'Individual project'
    role: null, // TODO: e.g. 'Circuit design, wiring & testing'

    // TODO: replace with your own 2–3 sentence description once the details are confirmed.
    overview: 'An engineering project focused on automation — a machine designed to take over the routine, manual task of cutting grass.',
    problem: null, // TODO: what problem were you solving, and for whom?
    contribution: [
      // TODO: what did YOU do? e.g. 'Designed the motor-driver circuit'
    ],
    hardware: [
      // TODO: only components you actually used, e.g. { name: 'Arduino Uno', purpose: 'Main controller' }
    ],
    technologies: [
      // TODO: e.g. 'Arduino C++', 'Proteus', 'KiCad'
    ],
    howItWorks: [
      // TODO: 3–5 steps, e.g. { title: 'Sensing', description: '...' }
    ],
    challenges: [
      // TODO: e.g. { challenge: '...', solution: '...' }
    ],
    media: [
      // TODO: real photos / circuit diagrams of YOUR build only.
    ],
    links: {
      repo: null, // TODO: GitHub repository URL
      demo: null, // TODO: video / demo URL
      report: null, // TODO: project report PDF in /public, e.g. 'files/grass-cutter-report.pdf'
    },
    cover: 'grass',
  },
]

export const projectStatusLabel: Record<Project['status'], string> = {
  completed: 'Completed',
  'in-progress': 'In progress',
  documenting: 'Write-up in progress',
}
