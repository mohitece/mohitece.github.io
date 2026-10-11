import { ArrowUpRight, Check, Copy, Download } from 'lucide-react'
import { useEffect, useState } from 'react'
import { profile } from '../../content/profile'
import { withAccent } from '../../lib/accent'
import { asset } from '../../lib/cn'
import { Reveal } from '../ui/Reveal'
import { Todo } from '../ui/Todo'

export function Contact() {
  const { contact, links } = profile
  const [copied, setCopied] = useState(false)
  const mailto = `mailto:${links.email}?subject=${encodeURIComponent(contact.emailSubject)}`

  useEffect(() => {
    if (!copied) return
    const id = window.setTimeout(() => setCopied(false), 2200)
    return () => window.clearTimeout(id)
  }, [copied])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(links.email)
      setCopied(true)
    } catch {
      // Clipboard can be blocked (e.g. insecure context) — fall back to opening the mail app.
      window.location.href = mailto
    }
  }

  const channels = [
    { label: 'LinkedIn', value: `in/${links.linkedinHandle}`, href: links.linkedin },
    { label: 'GitHub', value: `@${links.githubHandle}`, href: links.github },
  ]

  return (
    <section aria-labelledby="contact-title" className="relative isolate overflow-hidden pt-28 pb-16 md:pt-40" id="contact">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute bottom-[-40%] left-1/2 h-[90vh] w-[110vw] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(200_255_46/0.08),transparent)]" />
      </div>

      <div className="container-x">
        <Reveal>
          <div className="flex items-baseline justify-between gap-6 border-t border-line pt-4">
            <p className="eyebrow flex items-baseline gap-3">
              <span className="text-lime">(06)</span>
              <span className="text-paper">Contact</span>
            </p>
            <p className="eyebrow hidden sm:block">Internships · Collaboration · Projects</p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h2 id="contact-title" className="display mt-12 md:mt-16">
            {contact.headline.map((line) => (
              <span key={line} className="block">
                {withAccent(line, contact.accent)}{' '}
              </span>
            ))}
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-12 gap-x-6 gap-y-12 md:mt-20">
          <Reveal className="col-span-12 lg:col-span-5">
            <p className="text-lg/relaxed text-mute md:text-xl/relaxed">{contact.body}</p>
          </Reveal>

          <Reveal delay={100} className="col-span-12 lg:col-span-6 lg:col-start-7">
            <p className="eyebrow">Email</p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
              <a
                href={mailto}
                className="group inline-flex min-w-0 items-center gap-3 text-[clamp(1.5rem,4.2vw,2.75rem)] leading-tight font-medium tracking-[-0.035em] break-all"
              >
                <span className="u-link [background-size:100%_1px] group-hover:text-lime">{links.email}</span>
                <ArrowUpRight
                  className="size-[0.8em] shrink-0 text-lime transition-transform duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1"
                  aria-hidden
                />
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="eyebrow flex min-h-11 items-center gap-2 border border-line px-3 text-paper transition-colors hover:border-line-strong"
              >
                {copied ? <Check className="size-3.5 text-lime" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
                {copied ? 'Copied' : 'Copy'}
              </button>
              <span className="sr-only" aria-live="polite">
                {copied ? 'Email address copied to clipboard' : ''}
              </span>
            </div>

            <ul className="mt-12 border-t border-line">
              {channels.map((c) => (
                <li key={c.label} className="border-b border-line">
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex min-h-16 items-center justify-between gap-4 py-4 transition-colors"
                  >
                    <span className="eyebrow w-24 shrink-0">{c.label}</span>
                    <span className="flex-1 text-lg font-medium tracking-[-0.02em] transition-colors group-hover:text-lime">{c.value}</span>
                    <ArrowUpRight className="size-5 text-mute transition-all duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-lime" aria-hidden />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
              {links.resume && (
                <li className="border-b border-line">
                  <a href={asset(links.resume)} download className="group flex min-h-16 items-center justify-between gap-4 py-4">
                    <span className="eyebrow w-24 shrink-0">Résumé</span>
                    <span className="flex-1 text-lg font-medium tracking-[-0.02em] transition-colors group-hover:text-lime">Download PDF</span>
                    <Download className="size-5 text-mute transition-colors group-hover:text-lime" aria-hidden />
                  </a>
                </li>
              )}
            </ul>
            {!links.resume && (
              <div className="mt-4">
                <Todo file="src/content/profile.ts → links.resume">Add public/resume.pdf and set links.resume to enable the download.</Todo>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
