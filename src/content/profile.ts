/**
 * ─────────────────────────────────────────────────────────────
 *  PROFILE — your identity, links and the words on the page.
 *  Everything here is plain text: edit freely, then save.
 * ─────────────────────────────────────────────────────────────
 */

export const profile = {
  name: 'Mohit Kumar',
  firstName: 'Mohit',
  initials: 'MK',
  location: 'New Delhi, India',
  /** IANA time zone used for the live clock in the navigation bar. */
  timeZone: 'Asia/Kolkata',
  timeZoneLabel: 'IST',

  degree: 'B.Tech, Electronics & Communication Engineering',
  degreeShort: 'B.Tech ECE',
  school: 'University School of Information, Communication & Technology',
  schoolShort: 'USICT',
  university: 'Guru Gobind Singh Indraprastha University',
  universityShort: 'GGSIPU',

  /**
   * Availability badge in the navigation bar.
   * Leave as `null` until you are actually looking — then set e.g.
   * 'Open to internships — Summer 2027'. A lime pulse appears when set.
   */
  availability: null as string | null,

  links: {
    email: 'mohit.usict@gmail.com',
    github: 'https://github.com/mohitece',
    githubHandle: 'mohitece',
    linkedin: 'https://www.linkedin.com/in/mohitusict/',
    linkedinHandle: 'mohitusict',
    /**
     * TODO: drop your résumé into /public as "resume.pdf",
     * then change this to 'resume.pdf'. The download link appears automatically.
     */
    resume: null as string | null,
  },

  portrait: {
    // Files live in /public/images. Metadata (EXIF/GPS) has been stripped.
    src480: 'images/mohit-portrait-480.webp',
    src768: 'images/mohit-portrait-768.webp',
    fallback: 'images/mohit-portrait-768.jpg',
    width: 768,
    height: 1024,
    alt: 'Mohit Kumar, wearing a striped shirt, reading an open book in front of library shelves.',
  },

  hero: {
    eyebrow: 'Electronics & Communication Engineering — USICT, GGSIPU',
    eyebrowShort: 'B.Tech ECE — USICT, GGSIPU', // shown on phones
    // The headline is split into lines; the word in `accent` is set in italic lime.
    headline: ['From signal', 'to screen.'],
    accent: 'screen.',
    intro:
      "I'm Mohit — an ECE student who likes knowing how things work underneath: circuits, signals, and the code that makes hardware useful. I learn by building, and I bring a designer's eye to whatever I make.",
  },

  about: {
    lead: 'I want to understand technology from the ground up — and then build things with it that are actually useful.',
    paragraphs: [
      'I study Electronics & Communication Engineering at USICT, GGSIPU in New Delhi. The degree gives me the foundations — circuits, analog electronics and communication systems — and a habit of asking what is happening one layer below whatever I am looking at.',
      'Alongside coursework I explore programming with Python and data structures & algorithms, and I am drawn to the places where software meets hardware: embedded systems, automation, and making sense of data. My Automatic Grass Cutter project is one place where that curiosity turned into something physical.',
      'I also work as a graphic designer with IEEE and IETE. Design taught me that clarity is a feature — a lesson I try to carry into every circuit, script and interface I build. Right now I am focused on learning deeply, building consistently, and growing into an engineer people can rely on.',
    ],
  },

  contact: {
    headline: ['Let’s build', 'something useful.'],
    accent: 'useful.',
    body: 'I’m always glad to hear about internships, collaborations, student projects and technical opportunities — or just to talk shop about electronics and code. The quickest way to reach me is email.',
    emailSubject: 'Hello Mohit — from your portfolio',
  },
} as const
