import { useTranslation } from 'react-i18next'
import { IconCode } from '@tabler/icons-react'
import { skills } from '../data/content'

function LevelDots({ level, max }: { level: number; max: number }) {
  const full = Math.floor(level)
  const half = level % 1 !== 0
  return (
    <div className="flex gap-[3px] mt-1">
      {Array.from({ length: max }).map((_, i) => {
        let cls = 'w-2 h-2 border border-neon-yellow/30'
        if (i < full) cls += ' bg-neon-yellow'
        else if (i === full && half) cls += ' bg-neon-yellow/40'
        else cls += ' bg-transparent'
        return <div key={i} className={cls} />
      })}
    </div>
  )
}

export function Skills() {
  const { t } = useTranslation()
  return (
    <section id="skills" className="px-4 py-4">
      <div className="max-w-4xl mx-auto">
        <div className="backdrop-blur-xl bg-white/80 dark:bg-white/[0.03] border border-black/10 dark:border-white/10 p-6 md:p-8 transition-colors">
          <h2 className="text-lg md:text-xl font-bold mb-6 flex items-center gap-2">
            <IconCode size={22} className="text-neon-yellow" />
            <span className="text-gray-400">{'>'}{' '}</span>
            {t('skills.title')}
          </h2>
          <div className="flex flex-wrap gap-3">
            {skills.map(skill => (
              <div
                key={skill.name}
                className="px-3 py-2 border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/[0.02]"
              >
                <span className="text-xs text-gray-600 dark:text-gray-300">{skill.name}</span>
                <LevelDots level={skill.level} max={skill.max} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
