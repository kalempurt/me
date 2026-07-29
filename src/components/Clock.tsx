import { useClock } from '../hooks/useClock'
import { IconClock } from '@tabler/icons-react'
import { personalInfo } from '../data/content'

export function Clock() {
  const time = useClock(personalInfo.defaultTimezone)
  return (
    <div className="flex items-center gap-2">
      <IconClock size={16} className="text-neon-yellow shrink-0" />
      <span className="font-mono tabular-nums text-sm">{time} MSK</span>
    </div>
  )
}
