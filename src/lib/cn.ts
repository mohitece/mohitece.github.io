/** Join class names, skipping falsy values. */
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

/** Resolve a path inside /public against the deployed base URL. */
export function asset(path: string) {
  if (/^(https?:|mailto:|#)/.test(path)) return path
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
