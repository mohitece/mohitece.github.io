# Mohit Kumar — Portfolio

Personal portfolio of Mohit Kumar, B.Tech Electronics & Communication Engineering student at USICT, GGSIPU.

Built with React, TypeScript, Vite and Tailwind CSS. It is a static site with no backend, deployed to GitHub Pages.

---

## Run it locally

You need [Node.js](https://nodejs.org) 20.19 or newer.

```bash
npm install      # first time only
npm run dev      # http://localhost:5173 — shows TODO boxes for missing content
```

Other commands:

```bash
npm run build    # type-check + production build into /dist
npm run preview  # serve the production build at http://localhost:4173
```

## Editing your content

**All text lives in `src/content/`. You shouldn't need to touch any components.**

| File | What's in it |
| --- | --- |
| `profile.ts` | Name, links, email, availability badge, hero text, About text, contact text, résumé |
| `skills.ts` | Skills and their honest level (project / familiar / coursework / learning / interest) |
| `projects.ts` | Projects — overview, hardware, technologies, how it works, challenges, images, links |
| `experience.ts` | IEEE / IETE roles, dates, responsibilities, design-work links |
| `education.ts` | Degree, status, coursework, Google Data Analytics status |

Conventions:

- A field set to `null` or `[]` means "not provided yet". **Empty fields are hidden on the live site.**
- While running `npm run dev`, each missing field shows as a dashed lime **TODO** box naming the file to edit. These boxes are never included in the production build.
- Never add a component, result or claim you can't back up — the site is built to stay honest.

### Common tasks

- **Show "Open to internships"**: in `profile.ts`, set `availability: 'Open to internships — Summer 2027'`.
- **Add your résumé**: put `resume.pdf` in `public/`, then set `links.resume: 'resume.pdf'` in `profile.ts`.
- **Add project photos**: put images in `public/images/projects/automatic-grass-cutter/` and list them in `media` in `projects.ts`. Use `.webp` or `.jpg` around 1600px wide.
- **Add a project**: copy the object in `projects.ts`, give it a new `slug`, and fill in what you can. It gets a card and its own page at `#/work/<slug>`.
- **Mark the certificate complete**: in `education.ts`, set `status: 'completed'` and add `credentialUrl`.

## Deploying to GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds and publishes the site on every push to `main`.

1. Create a repository on GitHub. Naming it **`mohitece.github.io`** gives you the cleanest URL, `https://mohitece.github.io/`. Any other name, like `portfolio`, also works and is served at `https://mohitece.github.io/portfolio/`.
2. Push this folder to it:
   ```bash
   git remote add origin https://github.com/mohitece/mohitece.github.io.git
   git push -u origin main
   ```
3. On GitHub, open **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
4. Wait for the **Actions** tab to show a green check (about a minute). Your site is then live.

After that, every `git push` redeploys the site automatically.

> If you use a repository name other than `mohitece.github.io`, update the absolute URLs in `index.html` (`canonical`, `og:url`, `og:image`, `twitter:image`) so link previews work.

## Project structure

```
src/
  content/        ← edit these
  components/
    layout/       Nav, Footer
    sections/     Hero, About, Skills, Projects, Experience, Education, Contact
    ui/           SignalScope (hero waveform), CoverArt, Reveal, Todo, ...
  pages/          Home, ProjectPage
  hooks/          hash router, scroll-spy, reduced motion, local time
public/           images, favicon, social preview image
```

## Notes

- **Accessibility**: there's a skip link, visible focus states, and labelled controls. With `prefers-reduced-motion` turned on, animation is switched off and the waveform starts paused.
- **Privacy**: metadata (EXIF and location) was stripped from the portrait.
- **No contact form**: email uses a `mailto:` link plus a copy button. If you want a form later, use a service such as Formspree or Web3Forms. A static site can't send email by itself.
