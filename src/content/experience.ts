import type { Involvement } from './types'

/**
 * ─────────────────────────────────────────────────────────────
 *  EXPERIENCE & INVOLVEMENT
 *
 *  Fill in the exact role title, chapter, dates and responsibilities when
 *  you have them. Dates left as null are simply not shown — that's better
 *  than guessing.
 * ─────────────────────────────────────────────────────────────
 */

export const involvements: Involvement[] = [
  {
    org: 'IEEE',
    orgFull: 'Institute of Electrical and Electronics Engineers',
    chapter: null, // TODO: e.g. 'IEEE Student Branch, USICT'
    role: 'Graphic Designer', // TODO: confirm the official title
    start: null, // TODO: e.g. 'Sep 2024'
    end: null, // TODO: e.g. 'Present'
    summary: 'Graphic design work in association with IEEE.',
    responsibilities: [
      // TODO: e.g. 'Designed posters and social media creatives for technical events'
    ],
    work: [
      // TODO: e.g. { label: 'Event poster series', href: 'https://...' }
    ],
  },
  {
    org: 'IETE',
    orgFull: 'Institution of Electronics and Telecommunication Engineers',
    chapter: null, // TODO: e.g. 'IETE Students’ Forum, USICT'
    role: 'Graphic Designer', // TODO: confirm the official title
    start: null,
    end: null,
    summary: 'Graphic design work in association with IETE.',
    responsibilities: [],
    work: [],
  },
]
