import { useTranslation } from 'react-i18next'
import { IconLanguage } from '@tabler/icons-react'

interface Props {
  onChange: (lang: string) => void
}

export function LangSwitcher({ onChange }: Props) {
  const { i18n } = useTranslation()
  const next = i18n.language === 'ru' ? 'en' : 'ru'
  return (
    <button
      onClick={() => onChange(next)}
      className="flex items-center gap-1.5 px-2.5 py-1.5 border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 hover:border-neon-yellow/30 transition-all text-xs"
    >
      <IconLanguage size={16} className="text-neon-yellow" />
      <span className="uppercase font-medium">{next}</span>
    </button>
  )
}
