import { useEffect, useState } from 'react'

/** Current time in the given IANA zone as "HH:MM", refreshed every 15 seconds. */
export function useLocalTime(timeZone: string) {
  const [time, setTime] = useState(() => format(timeZone))

  useEffect(() => {
    const id = window.setInterval(() => setTime(format(timeZone)), 15_000)
    return () => window.clearInterval(id)
  }, [timeZone])

  return time
}

function format(timeZone: string) {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone,
  }).format(new Date())
}
