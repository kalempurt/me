import { type ReactNode, useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  IconBrandTelegram,
  IconBrandGithub,
  IconBrandDiscord,
  IconBrandInstagram,
  IconBrandSpotify,
} from '@tabler/icons-react'
import { ThemeSwitcher } from './ThemeSwitcher'
import { LangSwitcher } from './LangSwitcher'
import { useScrambleSwitch } from '../hooks/useScrambleSwitch'
import { personalInfo } from '../data/content'

interface Props {
  children: ReactNode
  theme: 'dark' | 'light'
  onToggleTheme: () => void
  glitching: boolean
}

const socialLinks = [
  { icon: IconBrandTelegram, url: 'https://t.me/kalempurt' },
  { icon: IconBrandGithub, url: 'https://github.com/kalempurt' },
  { icon: IconBrandInstagram, url: 'https://www.instagram.com/kalempurt/' },
  { icon: IconBrandSpotify, url: 'https://open.spotify.com/user/31q453xs4z77fw2sa5suixc7hnz4' },
]

export function Layout({ children, theme, onToggleTheme, glitching }: Props) {
  const { t, i18n } = useTranslation()
  const mainRef = useRef<HTMLDivElement>(null!)
  const busyRef = useRef(false)
  const scramble = useScrambleSwitch()
  const [copied, setCopied] = useState(false)

  const handleDiscordCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.discordNick)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }, [])

  const handleLangChange = useCallback((nextLang: string) => {
    if (busyRef.current || !mainRef.current) return
    busyRef.current = true
    scramble.play(mainRef.current, (next) => {
      i18n.changeLanguage(nextLang).then(() => next())
    }, () => {
      busyRef.current = false
    })
  }, [i18n, scramble])

  return (
    <div className={`min-h-screen bg-light-bg dark:bg-dark-bg text-gray-800 dark:text-gray-200 transition-colors duration-300 bg-grid ${glitching ? 'glitch-active' : ''}`}>
      {glitching && <div className="glitch-overlay" />}
      <div className="scanlines" />

      <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between md:justify-end gap-3 px-4 py-2 md:py-0 md:top-4 md:right-4 md:left-auto md:bg-transparent md:backdrop-blur-none bg-light-bg/80 dark:bg-dark-bg/80 backdrop-blur-sm border-b border-black/5 dark:border-white/5 md:border-none">
        <div className="flex items-center gap-2 md:pr-3 md:border-r md:border-black/10 md:dark:border-white/10">
          {socialLinks.map(link => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-neon-yellow transition-colors"
            >
              <link.icon size={18} />
            </a>
          ))}
          <button
            onClick={handleDiscordCopy}
            className="text-gray-500 hover:text-neon-yellow transition-colors relative"
          >
            <IconBrandDiscord size={18} />
            <span className={`absolute top-full mt-1 left-1/2 -translate-x-1/2 text-[10px] text-neon-yellow whitespace-nowrap transition-opacity duration-200 ${copied ? 'opacity-100 animate-pulse-glow' : 'opacity-0 pointer-events-none'}`}>
              {t('copied')}
            </span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitcher theme={theme} onToggle={onToggleTheme} />
          <LangSwitcher onChange={handleLangChange} />
        </div>
      </div>

      <main>
        <div ref={mainRef}>{children}</div>
      </main>

      <footer className="text-center py-8 text-[11px] text-gray-500 border-t border-white/5">
        :)
      </footer>
    </div>
  )
}
