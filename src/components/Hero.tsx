import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IconCake } from '@tabler/icons-react'
import { personalInfo } from '../data/content'
import { useAge } from '../hooks/useAge'
import { Clock } from './Clock'

export function Hero() {
  const { t, i18n } = useTranslation()
  const age = useAge(personalInfo.birthday)
  const [glitching, setGlitching] = useState(false)
  const [imgError, setImgError] = useState(false)

  const triggerGlitch = () => {
    if (glitching) return
    setGlitching(true)
    setTimeout(() => setGlitching(false), 500)
  }

  const locale = i18n.language === 'ru' ? 'ru-RU' : 'en-US'
  const birthdayFormatted = new Date(personalInfo.birthday).toLocaleDateString(locale, {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <section className="flex items-center justify-center px-4 pt-20 pb-4">
      <div className="max-w-4xl w-full backdrop-blur-xl bg-white/80 dark:bg-white/[0.03] border border-black/10 dark:border-white/10 p-6 md:p-10 transition-colors">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative shrink-0">
            <div className="w-32 h-32 md:w-40 md:h-40 overflow-hidden border-2 border-neon-yellow/50 animate-pulse-glow">
              {imgError ? (
                <div className="w-full h-full bg-light-bg dark:bg-dark-bg flex items-center justify-center text-4xl font-bold text-neon-yellow">
                  {personalInfo.name[0]}
                </div>
              ) : (
                <img
                  src={personalInfo.avatar}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              )}
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1
              className={`text-3xl md:text-5xl font-bold cursor-pointer inline-block ${glitching ? 'animate-glitch' : ''}`}
              onClick={triggerGlitch}
            >
              {personalInfo.name}
            </h1>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-500 mt-1 tracking-wide">
              {'/* '}{personalInfo.nicknames.join(', ')}{' */'}
            </p>
            <p className="mt-3 text-sm md:text-base text-gray-400 dark:text-gray-400 leading-relaxed">
              {t('bio')}
            </p>

            <div className="mt-4 space-y-1.5">
              <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-400 justify-center md:justify-start">
                <svg viewBox="0 0 3 2" className="w-4 h-[11px] shrink-0 border border-black/10 dark:border-white/10 -mt-[1px]">
                  <rect width="3" height=".667" fill="#fff"/>
                  <rect y=".667" width="3" height=".667" fill="#0039A6"/>
                  <rect y="1.334" width="3" height=".666" fill="#D52B1E"/>
                </svg>
                <span>{t('location')}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-400 justify-center md:justify-start">
                <IconCake size={16} className="text-neon-yellow shrink-0" />
                <span>{birthdayFormatted} ({t('age')}: {age})</span>
              </div>

              <div className="flex justify-center md:justify-start text-sm text-gray-400 dark:text-gray-400">
                <Clock />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
