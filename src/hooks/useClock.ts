import { useState, useEffect } from 'react'

export function useClock(timezone: string) {
  const [time, setTime] = useState(() => formatTime(timezone))

  useEffect(() => {
    const id = setInterval(() => setTime(formatTime(timezone)), 1000)
    return () => clearInterval(id)
  }, [timezone])

  return time
}

function formatTime(tz: string) {
  const now = new Date()
  return now.toLocaleTimeString('ru-RU', { timeZone: tz, hourCycle: 'h23' })
}
